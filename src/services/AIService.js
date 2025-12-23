import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase'; // Import initialized functions instance

/**
 * AIService: Centralized handler for all AI model interactions.
 * This service encapsulates the Gemini SDK and provides a unified interface
 * for the agents, making it easier to implement security proxies or
 * switch models in the future.
 */
export class AIService {
    constructor(options = {}) {
        this.apiKey = options.apiKey;
        this.mode = options.mode || 'guest'; // 'guest' or 'user'
        this.generateContentFn = httpsCallable(functions, 'generateContent');
        this.GEMINI_MODEL = "gemini-2.0-flash-exp";
    }

    /**
     * Generates content based on a string prompt.
     * @param {string} prompt 
     * @param {Object} options 
     * @param {boolean} options.isJson - Whether to force JSON output.
     * @param {number} options.maxRetries - Maximum number of retries for 500 errors.
     * @param {string} options.model - Optional model override
     * @returns {Promise<{text: string, usage: object}>}
     */
    async generate(prompt, options = {}) {
        const { isJson = false, maxRetries = 2, model = this.GEMINI_MODEL } = options;

        const attempt = async (retryCount = 0) => {
            try {
                let text = "";
                let usage = {};

                if (this.mode === 'user' && this.apiKey) {
                    // --- MODE A: Client-side AI Studio (User API Key) ---
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

                    const response = await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                contents: [{ parts: [{ text: prompt }] }],
                                generationConfig: {
                                    temperature: 1,
                                    maxOutputTokens: 8192,
                                    response_mime_type: isJson ? "application/json" : "text/plain"
                                }
                            }),
                            signal: controller.signal
                        }
                    ).finally(() => clearTimeout(timeoutId));

                    const data = await response.json();

                    if (data.error) {
                        throw new Error(`AI Studio Error: ${data.error.message}`);
                    }

                    text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                    usage = data.usageMetadata || {};
                } else {
                    // --- MODE B: Server-side Vertex AI (Guest Mode / Cloud Function) ---
                    const result = await this.generateContentFn({
                        prompt: prompt,
                        model: model
                    });

                    const data = result.data;
                    text = data.text;
                    usage = data.usage || {};
                }

                // Handle JSON parsing if requested (sometimes models don't follow mime_type perfectly)
                if (isJson) {
                    try {
                        // 1. Try to extract from markdown blocks
                        const match = text.match(/```json\n?([\s\S]*?)\n?```/) ||
                            text.match(/```\n?([\s\S]*?)\n?```/);
                        if (match) {
                            text = match[1];
                        }

                        // 2. Try to find the first '{' or '[' and the last '}' or ']'
                        // This handles cases where the model adds "Here is your JSON:" etc.
                        const startBrace = text.indexOf('{');
                        const startBracket = text.indexOf('[');
                        const start = (startBrace !== -1 && (startBracket === -1 || startBrace < startBracket)) ? startBrace : startBracket;

                        if (start !== -1) {
                            const endBrace = text.lastIndexOf('}');
                            const endBracket = text.lastIndexOf(']');
                            const end = Math.max(endBrace, endBracket);

                            if (end !== -1 && end > start) {
                                text = text.substring(start, end + 1);
                            }
                        }

                        // Validate and Parse
                        const parsed = JSON.parse(text);
                        // Store parsed object back as string if needed, or we just return it?
                        // Actually AIService.generate returns {text, usage}. 
                        // So we should return the stringified JSON or the object?
                        // Let's return the string, as agents expect to parse it themselves or use it as text.
                        // Wait, most agents do JSON.parse(result.text). So returning text is fine.
                    } catch (e) {
                        console.warn("[AIService] JSON extraction/parse failed:", e, "Original text:", text.substring(0, 100));
                        // If it fails, we keep the original text and hope the agent handles it or retries
                    }
                }

                return { text, usage };
            } catch (error) {
                // Retry logic for 500s
                const isRetryable = error.status === 500 || error.message?.includes('500') || error.message?.includes('Internal Server Error');
                if (retryCount < maxRetries && isRetryable) {
                    console.warn(`[AIService] ${this.mode === 'user' ? 'Client' : 'Guest'} 500 Error, retrying (${retryCount + 1}/${maxRetries})...`, error);
                    await new Promise(r => setTimeout(r, 1000 * (retryCount + 1)));
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
