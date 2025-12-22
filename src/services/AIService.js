import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * AIService: Centralized handler for all AI model interactions.
 * This service encapsulates the Gemini SDK and provides a unified interface
 * for the agents, making it easier to implement security proxies or
 * switch models in the future.
 */
export class AIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });
    }

    /**
     * Generates content based on a string prompt.
     * @param {string} prompt 
     * @param {Object} options 
     * @param {boolean} options.isJson - Whether to force JSON output.
     * @param {number} options.maxRetries - Maximum number of retries for 500 errors.
     * @returns {Promise<{text: string, usage: object}>}
     */
    async generate(prompt, options = {}) {
        const { isJson = false, maxRetries = 1 } = options;

        const attempt = async (retryCount = 0) => {
            try {
                // Configure request - default maxOutputTokens to prevent truncation
                const generationConfig = {
                    maxOutputTokens: 16000,  // Ensure long narratives aren't cut off
                    ...(isJson && { responseMimeType: "application/json" })
                };

                const result = await this.model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig
                });

                const response = await result.response;

                // Debug logging for truncation diagnosis
                const candidates = response.candidates || [];
                const finishReason = candidates[0]?.finishReason;
                const outputTokens = response.usageMetadata?.candidatesTokenCount || 0;

                if (finishReason && finishReason !== 'STOP') {
                    console.warn(`[AIService] Non-STOP finishReason: ${finishReason}`);
                }
                if (finishReason === 'MAX_TOKENS') {
                    console.error(`[AIService] ⚠️ RESPONSE TRUNCATED! Hit MAX_TOKENS limit. Output: ${outputTokens} tokens`);
                }
                console.log(`[AIService] Response: ${outputTokens} tokens, finishReason: ${finishReason}`);

                return {
                    text: response.text(),
                    usage: response.usageMetadata || {}
                };
            } catch (error) {
                // Handle 500 Internal Server Error with retries
                if (retryCount < maxRetries && (error.status === 500 || error.message?.includes('500'))) {
                    console.warn(`[AIService] 500 Error, retrying (${retryCount + 1}/${maxRetries})...`, error);
                    await new Promise(r => setTimeout(r, 1000));
                    return attempt(retryCount + 1);
                }
                console.error("[AIService] Generation Error:", error);
                throw error;
            }
        };

        return attempt();
    }

    /**
     * Future-proof: Can add methods for chat sessions, streaming, or embeddings here.
     */
}
