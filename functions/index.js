const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const { VertexAI } = require("@google-cloud/vertexai");

// Initialize Vertex AI with Project ID and Location
// IMPORTANT: Please ensure this Project ID matches where your $1000 credits are located.
exports.generateContent = onCall({
    cors: true,
}, async (request) => {
    logger.info("Function 'generateContent' invoked");

    const project = process.env.GCLOUD_PROJECT || 'aidnd-interactive-novel';
    const location = 'us-central1';

    const vertex_ai = new VertexAI({ project: project, location: location });

    const prompt = request.data.prompt;

    // IMPORTANT: Vertex AI requires versioned model names (unversioned aliases return 404).
    // We NEVER use client-provided model names here — clients use AI Studio naming scheme.
    const VERTEX_MODEL = 'gemini-2.0-flash-lite-001';

    logger.info("Generate content request received", {
        project: project,
        location: location,
        model: VERTEX_MODEL
    });

    if (!prompt) {
        throw new HttpsError('invalid-argument', "Prompt is required");
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
        return { text: text };
    } catch (error) {
        logger.error("Vertex AI Generation Error", {
            message: error.message,
            stack: error.stack,
            project: project,
            model: VERTEX_MODEL
        });

        throw new HttpsError('internal', `AI Generation Failed: ${error.message}. Please ensure Vertex AI API is enabled in project ${project} and Service Account has access.`);
    }
});
