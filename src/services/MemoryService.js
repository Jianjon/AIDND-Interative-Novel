/**
 * MemoryService.js
 * Manages tiered memory for story coherence.
 * 
 * Three Memory Layers:
 * 1. Immediate - Last 2 turns (full text)
 * 2. Working - Current chapter summary
 * 3. Long-Term - Key events list (persistent)
 */

const STORAGE_KEY = 'dnd_memory_state';
const MAX_IMMEDIATE_TURNS = 2;
const MAX_LONG_TERM_EVENTS = 20;

export class MemoryService {
    constructor() {
        this.immediate = [];      // Array of recent narrative strings
        this.working = "";        // Current chapter summary
        this.longTerm = [];       // Array of key event strings
        this.characterStates = {}; // { name: status }

        // Try to load persisted state
        this.load();
    }

    /**
     * Add a new turn's narrative to immediate memory
     * @param {string} narrative - Full narrative text
     */
    addTurn(narrative) {
        if (!narrative || typeof narrative !== 'string') return;

        // Trim to reasonable length per turn
        const trimmed = narrative.slice(0, 3000);
        this.immediate.push(trimmed);

        // Keep only last N turns
        while (this.immediate.length > MAX_IMMEDIATE_TURNS) {
            this.immediate.shift();
        }
    }

    /**
     * Update working memory (chapter summary)
     * @param {string} summary - AI-generated summary
     */
    updateWorkingSummary(summary) {
        if (summary && typeof summary === 'string') {
            this.working = summary.slice(0, 500);
        }
    }

    /**
     * Add a key event to long-term memory
     * @param {string} event - Key event description
     */
    addKeyEvent(event) {
        if (!event || typeof event !== 'string') return;

        // Avoid duplicates
        if (!this.longTerm.includes(event)) {
            this.longTerm.push(event);
        }

        // Keep under limit
        while (this.longTerm.length > MAX_LONG_TERM_EVENTS) {
            this.longTerm.shift();
        }
    }

    /**
     * Add multiple key events at once
     * @param {string[]} events - Array of key event descriptions
     */
    addKeyEvents(events) {
        if (!Array.isArray(events)) return;
        events.forEach(e => this.addKeyEvent(e));
    }

    /**
     * Update character state tracking
     * @param {string} name - Character name
     * @param {string} status - Current status description
     */
    updateCharacterState(name, status) {
        if (name && status) {
            this.characterStates[name] = status;
        }
    }

    /**
     * Get formatted context for AI consumption
     * @returns {string} Structured memory context
     */
    getContextForAI() {
        const sections = [];

        // Long-term memory (key events)
        if (this.longTerm.length > 0) {
            sections.push(`[長期記憶 - 關鍵事件]\n${this.longTerm.map((e, i) => `${i + 1}. ${e}`).join('\n')}`);
        }

        // Working memory (chapter summary)
        if (this.working) {
            sections.push(`[工作記憶 - 當前章節摘要]\n${this.working}`);
        }

        // Character states
        const charEntries = Object.entries(this.characterStates);
        if (charEntries.length > 0) {
            const charList = charEntries.map(([name, status]) => `- ${name}: ${status}`).join('\n');
            sections.push(`[角色狀態追蹤]\n${charList}`);
        }

        // Immediate memory (recent turns)
        if (this.immediate.length > 0) {
            sections.push(`[即時記憶 - 最近發生]\n${this.immediate.join('\n\n---\n\n')}`);
        }

        return sections.join('\n\n');
    }

    /**
     * Get statistics about memory usage
     * @returns {Object} Memory stats
     */
    getStats() {
        const contextLength = this.getContextForAI().length;
        return {
            immediateTurns: this.immediate.length,
            workingLength: this.working.length,
            longTermEvents: this.longTerm.length,
            characterCount: Object.keys(this.characterStates).length,
            totalContextChars: contextLength,
            estimatedTokens: Math.ceil(contextLength / 2) // Rough estimate
        };
    }

    /**
     * Save memory state to localStorage
     */
    save() {
        try {
            const state = {
                immediate: this.immediate,
                working: this.working,
                longTerm: this.longTerm,
                characterStates: this.characterStates,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            console.log('[MemoryService] State saved');
        } catch (e) {
            console.warn('[MemoryService] Failed to save:', e);
        }
    }

    /**
     * Load memory state from localStorage
     */
    load() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const state = JSON.parse(saved);
                this.immediate = state.immediate || [];
                this.working = state.working || "";
                this.longTerm = state.longTerm || [];
                this.characterStates = state.characterStates || {};
                console.log('[MemoryService] State loaded');
            }
        } catch (e) {
            console.warn('[MemoryService] Failed to load:', e);
        }
    }

    /**
     * Clear all memory (new game)
     */
    reset() {
        this.immediate = [];
        this.working = "";
        this.longTerm = [];
        this.characterStates = {};
        localStorage.removeItem(STORAGE_KEY);
        console.log('[MemoryService] Memory reset');
    }

    /**
     * Export memory for download/debugging
     * @returns {Object} Full memory state
     */
    export() {
        return {
            immediate: this.immediate,
            working: this.working,
            longTerm: this.longTerm,
            characterStates: this.characterStates,
            stats: this.getStats()
        };
    }
}

// Singleton instance
let memoryServiceInstance = null;

export const getMemoryService = () => {
    if (!memoryServiceInstance) {
        memoryServiceInstance = new MemoryService();
    }
    return memoryServiceInstance;
};

export default MemoryService;
