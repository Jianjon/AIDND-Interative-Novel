const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");

// --- Simple per-user rate limiter (in-memory, per instance) ---
// Not a perfect distributed limiter, but stops a single UID from hammering
// this instance. Combine with Firebase console quotas for real protection.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_CALLS = 60;        // calls per window per user
const rateBuckets = new Map();           // uid -> [timestamps]
const FALLBACK_GEMINI_KEY = process.env.GEMINI_API_KEY || "";

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
    timeoutSeconds: 120,
}, async (request) => {
    // Allow both authenticated Firebase users and guest sessions (rate-limited by UID or IP)
    const forwarded = request.rawRequest?.headers?.["x-forwarded-for"];
    const ip = (typeof forwarded === "string" ? forwarded.split(",")[0].trim() : "") || request.rawRequest?.ip || "guest";
    const uid = request.auth?.uid || `ip:${ip}`;

    if (!checkRateLimit(uid)) {
        logger.warn("Rate limit exceeded", { uid });
        throw new HttpsError('resource-exhausted', "Too many requests. Please wait a minute and try again.");
    }

    const project = process.env.GCLOUD_PROJECT || 'aidnd-interactive-novel';
    const location = 'us-central1';
    const prompt = request.data?.prompt;
    const modelTier = request.data?.modelTier;
    const wantsJson = Boolean(request.data?.isJson) || String(prompt || '').includes('僅輸出 JSON');

    if (!prompt || typeof prompt !== 'string') {
        throw new HttpsError('invalid-argument', "Prompt is required");
    }

    // Guard against abuse: cap prompt size (normal game prompts stay well under this)
    if (prompt.length > 80000) {
        throw new HttpsError('invalid-argument', "Prompt too long");
    }

    // Primary: Gemini API on Cloud Run (cost-efficient GA 3.5 Flash-Lite)
    const geminiModel = modelTier === 'pro' ? 'gemini-3.5-flash' : 'gemini-3.5-flash-lite';
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${encodeURIComponent(FALLBACK_GEMINI_KEY)}`;
        const generationConfig = {
            maxOutputTokens: 16384,
            ...(wantsJson ? { responseMimeType: 'application/json' } : {}),
            ...(geminiModel === 'gemini-3.1-pro-preview' ? { thinkingConfig: { thinkingLevel: 'low' } } : {}),
        };
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: String(prompt) }] }],
                generationConfig,
            }),
        });
        if (res.ok) {
            const data = await res.json();
            const candidate = data.candidates?.[0];
            const text = (candidate?.content?.parts || []).map(p => p.text || '').join('');
            if (text.trim()) {
                return {
                    text,
                    truncated: candidate?.finishReason === 'MAX_TOKENS',
                    usage: data.usageMetadata || {},
                };
            }
        } else {
            const errBody = await res.text().catch(() => '');
            logger.warn("Primary Gemini API returned non-OK, falling back to Vertex AI", { status: res.status, errBody: errBody.slice(0, 200) });
        }
    } catch (primaryErr) {
        logger.warn("Primary Gemini API call failed, falling back to Vertex AI", { message: primaryErr.message });
    }

    // Fallback: Vertex AI in us-central1
    const { VertexAI } = require("@google-cloud/vertexai");
    const VERTEX_MODEL = 'gemini-2.5-flash';
    const vertex_ai = new VertexAI({ project: project, location: location });

    logger.info("Generate content request via Vertex AI fallback", {
        uid: uid,
        project: project,
        location: location,
        model: VERTEX_MODEL
    });

    try {
        const generativeModel = vertex_ai.getGenerativeModel({
            model: VERTEX_MODEL,
            generationConfig: {
                'maxOutputTokens': 8192,
                'temperature': 1,
                'topP': 0.95,
                ...(wantsJson ? { 'responseMimeType': 'application/json' } : {}),
            },
        });

        const result = await generativeModel.generateContent(prompt);
        const response = await result.response;

        if (!response.candidates || response.candidates.length === 0) {
            throw new HttpsError('not-found', "No candidates returned from AI model");
        }

        const candidate = response.candidates[0];
        const text = (candidate.content?.parts || []).map(p => p.text || '').join('');
        return {
            text: text,
            truncated: candidate.finishReason === 'MAX_TOKENS',
            usage: response.usageMetadata || {},
        };
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

// --- Cloud Save & Sync (Firestore `aidnd` database) ---
const { initializeApp: initAdminApp, getApps: getAdminApps } = require("firebase-admin/app");
const { getFirestore: getAdminFirestore } = require("firebase-admin/firestore");

let _aidndDb = null;
function getAidndDb() {
    if (_aidndDb) return _aidndDb;
    const adminApp = getAdminApps().length ? getAdminApps()[0] : initAdminApp();
    _aidndDb = getAdminFirestore(adminApp, "aidnd");
    try { _aidndDb.settings({ ignoreUndefinedProperties: true }); } catch { /* already configured */ }
    return _aidndDb;
}

function sanitizeCloudId(raw) {
    const clean = String(raw || "").trim().replace(/[^a-zA-Z0-9_.-]/g, "").slice(0, 64);
    if (!clean || clean.length < 2) {
        throw new HttpsError("invalid-argument", "Invalid cloudId (must be at least 2 characters: letters, numbers, -, _)");
    }
    return clean;
}

function cleanJson(val) {
    if (val === undefined) return null;
    return JSON.parse(JSON.stringify(val));
}

exports.cloudSync = onCall({
    cors: true,
    timeoutSeconds: 60,
}, async (request) => {
    const action = request.data?.action;
    const cloudId = sanitizeCloudId(request.data?.cloudId);
    const db = getAidndDb();
    const profileRef = db.collection("cloud_profiles").doc(cloudId);

    try {
        if (action === "loadAll") {
            const [autosaveSnap, settingsSnap, customsSnap, savesSnap] = await Promise.all([
                profileRef.collection("state").doc("autosave").get(),
                profileRef.collection("state").doc("settings").get(),
                profileRef.collection("state").doc("customModules").get(),
                profileRef.collection("saves").orderBy("at", "desc").get(),
            ]);
            const saves = [];
            savesSnap.forEach(doc => {
                const d = doc.data();
                if (d?.id && d?.session) saves.push(d);
            });
            return {
                ok: true,
                cloudId,
                autosave: autosaveSnap.exists ? (autosaveSnap.data()?.session || null) : null,
                settings: settingsSnap.exists ? (settingsSnap.data()?.settings || null) : null,
                customModules: customsSnap.exists ? (customsSnap.data()?.items || []) : [],
                saves,
            };
        }

        if (action === "saveAutosave") {
            const ref = profileRef.collection("state").doc("autosave");
            const session = request.data?.session;
            if (!session) {
                await ref.delete();
            } else {
                await ref.set({ session: cleanJson(session), updatedAt: new Date().toISOString() });
            }
            return { ok: true };
        }

        if (action === "saveSettings") {
            const ref = profileRef.collection("state").doc("settings");
            await ref.set({ settings: cleanJson(request.data?.settings || {}), updatedAt: new Date().toISOString() });
            return { ok: true };
        }

        if (action === "saveCustomModules") {
            const ref = profileRef.collection("state").doc("customModules");
            const items = Array.isArray(request.data?.customModules) ? cleanJson(request.data.customModules) : [];
            await ref.set({ items, updatedAt: new Date().toISOString() });
            return { ok: true };
        }

        if (action === "upsertSave") {
            const entry = cleanJson(request.data?.entry);
            if (!entry?.id || !entry?.session) {
                throw new HttpsError("invalid-argument", "Save entry requires id and session");
            }
            const saveId = sanitizeCloudId(entry.id);
            await profileRef.collection("saves").doc(saveId).set(entry);
            return { ok: true };
        }

        if (action === "deleteSave") {
            const saveId = sanitizeCloudId(request.data?.saveId);
            await profileRef.collection("saves").doc(saveId).delete();
            return { ok: true };
        }

        throw new HttpsError("invalid-argument", `Unknown action: ${action}`);
    } catch (err) {
        if (err instanceof HttpsError) throw err;
        logger.error("cloudSync failed", { action, cloudId, message: err.message });
        throw new HttpsError("internal", `Cloud sync error: ${err.message}`);
    }
});
