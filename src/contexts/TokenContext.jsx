import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const TokenContext = createContext({
    usageCtx: { total: 0, session: 0, history: [] },
    addUsage: (usage, source) => { }
});

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
    // Load initial total from localStorage
    const [usageCtx, setUsageCtx] = useState(() => {
        try {
            const saved = localStorage.getItem('dnd_token_usage');
            const parsed = saved ? JSON.parse(saved) : { total: 0 };
            return {
                total: parsed.total || 0,
                session: 0,
                history: [] // We don't persist history to keep localStorage light
            };
        } catch (e) {
            return { total: 0, session: 0, history: [] };
        }
    });

    // Save total to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem('dnd_token_usage', JSON.stringify({ total: usageCtx.total }));
        } catch (e) {
            // Ignore storage errors
        }
    }, [usageCtx.total]);

    const addUsage = (usage, source = 'Unknown') => {
        if (!usage) return;

        // Gemini API Usage Schema: { promptTokenCount, candidatesTokenCount, totalTokenCount }
        // Or sometimes generic: { inputTokens, outputTokens }

        let validUsage = null;

        if (usage.totalTokenCount !== undefined) {
            validUsage = {
                input: usage.promptTokenCount || 0,
                output: usage.candidatesTokenCount || 0,
                total: usage.totalTokenCount || 0
            };
        } else if (usage.totalTokens !== undefined) {
            validUsage = {
                input: usage.prompt_tokens || usage.inputTokens || 0,
                output: usage.completion_tokens || usage.outputTokens || 0,
                total: usage.totalTokens || 0
            };
        }

        if (!validUsage || validUsage.total === 0) return;

        setUsageCtx(prev => ({
            total: prev.total + validUsage.total,
            session: prev.session + validUsage.total,
            // Keep last 50 history items for debug/display
            history: [
                {
                    timestamp: new Date().toISOString(),
                    source,
                    ...validUsage
                },
                ...prev.history
            ].slice(0, 50)
        }));
    };

    return (
        <TokenContext.Provider value={{ usageCtx, addUsage }}>
            {children}
        </TokenContext.Provider>
    );
};
