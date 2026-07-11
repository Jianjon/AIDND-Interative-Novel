const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const { VertexAI } = require("@google-cloud/vertexai");

// --- Simple per-user rate limiter (in-memory, per instance) ---
// Not a perfect distributed limiter, but stops a single UID from hammering
// this instance. Combine with Firebase console quotas for real protection.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_CALLS = 20;        // calls per window per user
const rateBuckets = new Map();           // uid -> [timestamps]

const checkRateLimit = (uid) => {
    const now = Date.now();
    const bucket = (rateBuckets.get(uid) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (bucket.length >= RATE_LIMIT_MAX_CALLS) {
        return false;
    }
    bucket.push(now);
    rateBuckets.set(uid, bucket);
    // Opportunistic cleanup to avoid unbounded growth
    if (rateBuckets.size > 5000) {
        for (const [key, times] of rateBuckets) {
            if (times.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) rateBuckets.delete(key);
        }
    }
    return true;
};

// Initialize Vertex AI with Project ID and Location
// IMPORTANT: Please ensure this Project ID matches where your $1000 credits are located.
exports.generateContent = onCall({
    cors: true,
}, async (request) => {
    // --- AUTH GATE ---
    // Requires the "Anonymous" sign-in provider to be enabled in the Firebase
    // console (Authentication > Sign-in method) so guest clients can obtain a UID.
    if (!request.auth) {
        throw new HttpsError('unauthenticated', "Authentication required. Please reload the page and try again.");
    }
    const uid = request.auth.uid;

    if (!checkRateLimit(uid)) {
        logger.warn("Rate limit exceeded", { uid });
        throw new HttpsError('resource-exhausted', "Too many requests. Please wait a minute and try again.");
    }

    const project = process.env.GCLOUD_PROJECT || 'aidnd-interactive-novel';
    const location = 'us-central1';

    const vertex_ai = new VertexAI({ project: project, location: location });

    const prompt = request.data.prompt;

    // IMPORTANT: Vertex AI requires versioned model names (unversioned aliases return 404).
    // We NEVER use client-provided model names here — clients use AI Studio naming scheme.
    const VERTEX_MODEL = 'gemini-2.0-flash-lite-001';

    logger.info("Generate content request received", {
        uid: uid,
        project: project,
        location: location,
        model: VERTEX_MODEL
    });

    if (!prompt || typeof prompt !== 'string') {
        throw new HttpsError('invalid-argument', "Prompt is required");
    }

    // Guard against abuse: cap prompt size (normal game prompts stay well under this)
    if (prompt.length > 60000) {
        throw new HttpsError('invalid-argument', "Prompt too long");
    }

    try {
        const generativeModel = vertex_ai.getGenerativeModel({
            model: VERTEX_MODEL,
            generationConfig: {
                'maxOutputTokens': 8192,
                'temperature': 1,
                'topP': 0.95,
            },
        });

        const result = await generativeModel.generateContent(prompt);
        const response = await result.response;

        if (!response.candidates || response.candidates.length === 0) {
            throw new HttpsError('not-found', "No candidates returned from AI model");
        }

        const text = response.candidates[0].content.parts[0].text;
        return { text: text, usage: response.usageMetadata || {} };
    } catch (error) {
        logger.error("Vertex AI Generation Error", {
            message: error.message,
            stack: error.stack,
            project: project,
            model: VERTEX_MODEL
        });

        // Map upstream Vertex failures to proper codes so the client's retry/backoff
        // logic can distinguish rate limits (long wait) from transient errors (short wait)
        const msg = error.message || '';
        if (/429|quota|exhausted/i.test(msg)) {
            throw new HttpsError('resource-exhausted', 'AI 服務額度暫時用盡，請稍候再試。');
        }
        if (/503|overloaded|unavailable/i.test(msg)) {
            throw new HttpsError('unavailable', 'AI 模型暫時過載，請稍候再試。');
        }
        throw new HttpsError('internal', `AI Generation Failed: ${error.message}. Please ensure Vertex AI API is enabled in project ${project} and Service Account has access.`);
    }
});
