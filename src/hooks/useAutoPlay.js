import { useEffect } from 'react';

// --- AI Auto-Control Logic ---
export const useAutoPlay = ({
    logs,
    isGenerating,
    isPreGenerating,
    isAutoProcessing,
    setIsAutoProcessing,
    isNarrativeComplete,
    gameMode,
    GAME_MODES,
    party,
    agentRoster,
    gameState,
    pendingActions,
    setPendingActions,
    actionCache,
    setRoster
}) => {


    const toggleControlMode = (charId) => {
        setRoster(prev => prev.map(c => {
            if (c.id === charId) {
                const currentMode = c.controlMode || 'manual';
                const newMode = currentMode === 'manual' ? 'auto' : 'manual';

                // CRITICAL: Preserve Class Prototype
                const clone = Object.create(Object.getPrototypeOf(c));
                Object.assign(clone, c);
                clone.controlMode = newMode;
                return clone;
            }
            return c;
        }));
    };

    // Auto-Process Turn Effect
    useEffect(() => {
        const processAutoTurns = async () => {
            // Prevent auto-turns during prologue or generation
            const isPrologue = logs.length === 0;
            if (isPrologue || isGenerating || isPreGenerating || isAutoProcessing || !isNarrativeComplete) return;
            if (gameMode !== GAME_MODES.TRPG) return;

            // Identify AUTO characters who need actions
            const autoChars = party
                .map(id => agentRoster.find(c => c.id === id))
                .filter(c => c && (c.controlMode === 'auto') && !pendingActions[c.id] && (gameState[c.id]?.hp > 0) && (gameState[c.id]?.status !== 'unconscious' && gameState[c.id]?.status !== 'dead'));

            if (autoChars.length === 0) return;

            const lastLog = logs[logs.length - 1];
            if (!lastLog || lastLog.type === 'turn_batch') return; // Don't act immediately after user options, wait for response.
            // If lastLog is 'trpg_narrative', it means AI finished responding. user turn!

            setIsAutoProcessing(true);

            // Slight delay for "Thinking" UI
            await new Promise(r => setTimeout(r, 1000));

            const newActions = {};

            for (const char of autoChars) {
                const cached = actionCache[char.id];
                if (cached && cached.options && cached.options.length > 0) {
                    // Selection Logic:
                    // If HP < 30%, prefer Instinct (A)
                    // Else prefer Professional (B) or Team (C) randomly
                    const hp = gameState[char.id]?.hp || 100;
                    const maxHp = gameState[char.id]?.maxHp || 100;
                    const hpPercent = (hp / maxHp) * 100;

                    let selectedOption;
                    if (hpPercent < 30) {
                        selectedOption = cached.options.find(o => o.type === 'instinct') || cached.options[0];
                    } else {
                        // 70% chance for Professional, 30% for Team
                        const roll = Math.random();
                        if (roll > 0.3) {
                            selectedOption = cached.options.find(o => o.type === 'professional') || cached.options[1] || cached.options[0];
                        } else {
                            selectedOption = cached.options.find(o => o.type === 'team') || cached.options[2] || cached.options[0];
                        }
                    }

                    if (selectedOption) {
                        newActions[char.id] = selectedOption.text;
                    }
                }
            }

            if (Object.keys(newActions).length > 0) {
                setPendingActions(prev => ({ ...prev, ...newActions }));
            }

            setIsAutoProcessing(false);
        };

        processAutoTurns();
    }, [
        logs,
        isGenerating,
        isPreGenerating,
        isAutoProcessing,
        isNarrativeComplete,
        gameMode,
        GAME_MODES,
        party,
        agentRoster,
        gameState,
        pendingActions,
        setPendingActions,
        actionCache,
        setIsAutoProcessing
    ]);

    return {
        toggleControlMode
    };
};
