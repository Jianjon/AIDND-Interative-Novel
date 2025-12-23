export const BOND_STATES = {
    STRANGER: 'STRANGER',       // 0-30
    COMPANION: 'COMPANION',     // 31-60
    CONFIDANT: 'CONFIDANT',     // 61-80 (Needs Joy Event)
    LOVER: 'LOVER',             // 81-100 (Needs Weakness Event)
    SHAKEN: 'SHAKEN',           // Special: Low Affinity + Protected Weakness
    HEARTBROKEN: 'HEARTBROKEN', // Special: High Affinity + Major Betrayal
    ENEMY: 'ENEMY'              // < -50
};

export const EMOTIONAL_TRIGGERS = {
    JOY: { type: 'JOY', score: 10, label: 'Joy' },
    ANGER: { type: 'ANGER', score: -10, label: 'Anger' },
    WEAKNESS: { type: 'WEAKNESS', score: 20, label: 'Deep Connection' },
    AGREEMENT: { type: 'AGREEMENT', score: 1, label: 'Agreement' },
    DISAGREEMENT: { type: 'DISAGREEMENT', score: -1, label: 'Disagreement' },
    NONE: { type: 'NONE', score: 0, label: 'Neutral' }
};

export class AffinityManagerAgent {
    constructor() {
        this.systemInstruction = `
        You are the Affinity Manager. Your job is to analyze the player's action and determine if it triggers any specific emotional keys (Joy, Anger, Weakness) for the active characters.
        
        Output JSON only:
        {
            "characterId": "influenced_character_id",
            "triggerType": "JOY" | "ANGER" | "WEAKNESS" | "NONE",
            "reason": "Brief explanation of why this key was triggered based on the action.",
            "narrativeCue": "A short, descriptive sentence describing the character's emotional reaction (e.g., 'Eyes lighting up', 'Clenching fists')."
        }
        `;
    }

    /**
     * Analyzes the interaction to find emotional triggers.
     * In a real implementation with LLM capability, this would call the LLM.
     * For this structure, we'll simulate the logic or prepare prompt data.
     * 
     * @param {string} playerAction - The text of what the player did.
     * @param {object} character - The character object with emotionalKeys.
     * @returns {object} Analysis result.
     */
    analyzeInteraction(playerAction, character) {
        // This function is intended to be used by the CloudAIService to construct the prompt.
        // It returns the context needed for the LLM to make the decision.
        return {
            characterName: character.name,
            emotionalKeys: character.emotionalKeys
        };
    }

    /**
     * Calculates the new affinity score and bond state.
     * 
     * @param {object} currentRelation - Current relationship object.
     * @param {string} triggerType - JOY, ANGER, WEAKNESS.
     * @returns {object} Updated relationship object.
     */
    updateRelationship(currentRelation, triggerType, changeOverride = null, allowRomance = true, newThoughts = null) {
        let newAffinity = currentRelation.affinity || 0;
        let bondState = currentRelation.bondState || BOND_STATES.STRANGER;
        let flags = currentRelation.flags || { hasSeenWeakness: false, isHeartbroken: false };
        let history = currentRelation.history || [];

        // 1. Score Calculation
        let change = 0;

        // Priority: Explicit Override > Trigger Default
        if (changeOverride !== null && changeOverride !== undefined && !isNaN(changeOverride)) {
            change = changeOverride;
        } else {
            switch (triggerType) {
                case 'JOY':
                    change = 10;
                    if (bondState === BOND_STATES.SHAKEN) change *= 2;
                    break;
                case 'ANGER':
                    change = -10;
                    break;
                case 'WEAKNESS':
                    change = 20;
                    break;
                case 'AGREEMENT':
                    change = 1;
                    break;
                case 'DISAGREEMENT':
                    change = -1;
                    break;
                default:
                    change = 0;
                    break;
            }
        }

        // Apply Logic Triggers (Side Effects of specific keys regardless of score)
        if (triggerType === 'WEAKNESS') {
            flags.hasSeenWeakness = true;
            if (newAffinity < 20) {
                bondState = BOND_STATES.SHAKEN;
            }
        }
        if (triggerType === 'ANGER' && newAffinity > 80) {
            // Check for heartbreak risk?
        }

        newAffinity = Math.max(-100, Math.min(100, newAffinity + change));

        // 2. State Transition Logic
        if (!flags.isHeartbroken) {
            if (newAffinity > 80 && flags.hasSeenWeakness && allowRomance) {
                bondState = BOND_STATES.LOVER;
            } else if (newAffinity > 60) {
                bondState = BOND_STATES.CONFIDANT;
            } else if (newAffinity > 30) {
                bondState = BOND_STATES.COMPANION;
            } else if (bondState !== BOND_STATES.SHAKEN) { // Don't reset Shaken automatically
                bondState = BOND_STATES.STRANGER;
            }

            // Downgrade if Romance forbidden but somehow acquired (or retroactively applied)
            if (bondState === BOND_STATES.LOVER && !allowRomance) {
                bondState = BOND_STATES.CONFIDANT;
            }
        }

        // 3. Update History
        if (change !== 0 || triggerType !== 'NONE') {
            history.push({
                type: triggerType,
                scoreChange: change,
                timestamp: Date.now()
            });
        }

        return {
            ...currentRelation, // Preserve other props (targetName, etc.)
            affinity: newAffinity,
            bondState,
            flags,
            history,
            thoughts: newThoughts || currentRelation.thoughts // Update thoughts if provided
        };
    }
}

export default new AffinityManagerAgent();
