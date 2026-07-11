import { httpsCallable } from 'firebase/functions';
import { functions, ensureAnonymousAuth } from '../firebase'; // Import initialized functions instance

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
        // AI Studio (user key) vs Vertex AI (Cloud Function) use different model name schemes
        this.GEMINI_MODEL_AI_STUDIO = "gemini-2.5-flash"; // AI Studio - active model
        this.GEMINI_MODEL = this.GEMINI_MODEL_AI_STUDIO; // default fallback
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
        const { isJson = false, maxRetries = 3, model = this.GEMINI_MODEL_AI_STUDIO } = options;

        const attempt = async (retryCount = 0) => {
            try {
                let text = "";
                let usage = {};

                if (this.mode === 'user' && this.apiKey) {
                    // --- MODE A: Client-side AI Studio (User API Key) ---
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

                    const generationConfig = {
                        temperature: 1,
                        maxOutputTokens: 8192,
                        response_mime_type: isJson ? "application/json" : "text/plain"
                    };
                    // Gemini 2.5 models spend output tokens on hidden "thinking" by default,
                    // which slows turns and can truncate long JSON. Disable it for gameplay.
                    if (model.startsWith('gemini-2.5')) {
                        generationConfig.thinkingConfig = { thinkingBudget: 0 };
                    }

                    const response = await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                contents: [{ parts: [{ text: prompt }] }],
                                generationConfig
                            }),
                            signal: controller.signal
                        }
                    ).finally(() => clearTimeout(timeoutId));

                    const data = await response.json();

                    if (data.error) {
                        const err = new Error(`AI Studio Error: ${data.error.message}`);
                        err.status = data.error.code || response.status;
                        throw err;
                    }

                    // Safety filter can block the whole prompt — no candidates returned
                    if (data.promptFeedback?.blockReason) {
                        throw new Error(`內容被安全過濾攔截 (${data.promptFeedback.blockReason})，請調整描述後重試`);
                    }

                    const candidate = data.candidates?.[0];
                    // Join ALL parts — 2.5 models may split output across multiple parts
                    text = (candidate?.content?.parts || [])
                        .map(p => p.text)
                        .filter(Boolean)
                        .join("");
                    usage = data.usageMetadata || {};

                    if (!text.trim()) {
                        // Empty output (safety stop, or the whole budget went to thinking) —
                        // surface as a retryable error instead of silently returning ""
                        const reason = candidate?.finishReason || 'EMPTY';
                        const err = new Error(`AI 回傳空內容 (${reason})`);
                        err.status = 503; // mark retryable
                        throw err;
                    }
                    if (candidate?.finishReason === 'MAX_TOKENS') {
                        console.warn('[AIService] Output truncated at MAX_TOKENS — JSON may be incomplete');
                    }
                } else {
                    // --- MODE B: Server-side Vertex AI (Guest Mode / Cloud Function) ---
                    // Sign in anonymously first — the Cloud Function rejects unauthenticated calls.
                    await ensureAnonymousAuth();
                    // NOTE: Do NOT pass model name - Cloud Function uses its own Vertex-compatible model
                    const result = await this.generateContentFn({
                        prompt: prompt
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
                const msg = error.message || '';
                const code = error.status ?? error.code; // HTTP status or Firebase HttpsError code

                // Rate limit (free-tier quota) — retry with a LONG backoff so the quota window resets
                const isRateLimited = code === 429 || code === 'resource-exhausted' ||
                    msg.includes('429') || /quota|exhausted|rate limit/i.test(msg);
                // Transient server-side failures — retry with a short backoff
                const isTransient = code === 500 || code === 503 || code === 'internal' || code === 'unavailable' ||
                    msg.includes('500') || msg.includes('503') ||
                    /Internal Server Error|overloaded|unavailable|回傳空內容/i.test(msg) ||
                    error.name === 'AbortError' ||           // 60s timeout
                    (error instanceof TypeError && /fetch|network/i.test(msg)); // network drop

                if (retryCount < maxRetries && (isRateLimited || isTransient)) {
                    // 429: wait 8s/16s/24s (free tier quotas are per-minute); others: 1.5s/3s/4.5s
                    const delay = (isRateLimited ? 8000 : 1500) * (retryCount + 1);
                    console.warn(`[AIService] ${isRateLimited ? 'Rate limited' : 'Transient error'}, retrying in ${delay / 1000}s (${retryCount + 1}/${maxRetries})...`, msg);
                    await new Promise(r => setTimeout(r, delay));
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
