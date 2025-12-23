const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const { VertexAI } = require("@google-cloud/vertexai");

// Initialize Vertex AI with Project ID and Location
// IMPORTANT: Please ensure this Project ID matches where your $1000 credits are located.
exports.generateContent = onCall({
    cors: true,
    // secrets: ["AIDND_2"] // Commented out to debug INTERNAL error
}, async (request) => {
    logger.info("Function 'generateContent' invoked");

    // FALLBACK: Hardcoded for immediate stability
    const project = 'gen-lang-client-0763353608';
    const location = 'us-central1';

    // Initialize Vertex AI
    const vertex_ai = new VertexAI({ project: project, location: location });

    const prompt = request.data.prompt;
    const modelName = request.data.model;

    const defaultModelName = 'gemini-2.0-flash-exp';
    const getModel = (name) => {
        return vertex_ai.getGenerativeModel({
            model: name || defaultModelName,
            generationConfig: {
                'maxOutputTokens': 8192,
                'temperature': 1,
                'topP': 0.95,
            },
        });
    };

    logger.info("Generate content request received", {
        project: project,
        location: location,
        model: modelName || defaultModelName
    });

    if (!prompt) {
        throw new HttpsError('invalid-argument', "Prompt is required");
    }

    try {
        const generativeModel = getModel(modelName);
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
            model: modelName || defaultModelName
        });

        // Use HttpsError to send detailed message to client
        throw new HttpsError('internal', `AI Generation Failed: ${error.message}. Please ensure Vertex AI API is enabled in project ${project} and Service Account has access.`);
    }
});
