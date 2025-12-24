
import { PERSONALITY_PROMPTS, MBTI_TONE_MODIFIERS } from "../data/characterPersonalities";

/**
 * PersonaService
 * 
 * Provides centralized logic for character personality management.
 * Handles:
 * 1. Base Tone Retrieval
 * 2. Contextual Emotion Modulation (Battle, Exploration, etc.)
 * 3. Interaction Style Logic (Rivalry, Respect, Dislike)
 * 4. Auto-Expansion Instructions for AI
 */
export class PersonaService {
    constructor() {
        this.personaDB = PERSONALITY_PROMPTS;
    }

    /**
     * Gets the full speech instruction for a character in a specific context.
     * @param {string} personality - Key from PERSONALITY_PROMPTS (e.g., "熱血衝動")
     * @param {string} contextType - "battle", "exploration", "fear", "surprise", "social"
     * @param {string} mbti - MBTI type (e.g., "ESTP")
     * @returns {string} The constructed prompt string
     */
    getSpeechInstruction(personality, contextType = "social", mbti = null) {
        const p = this.personaDB[personality] || this.personaDB["熱血衝動"];

        let instruction = `
        [Tone]: ${p.tone}
        [Style]: ${p.style}
        [Prefix]: "${p.prefix}"
        `;

        // Apply MBTI Tone Modulation
        if (mbti) {
            instruction += `
        [MBTI Tone Adjustments (${mbti})]:
        ${this.getMBTIToneInstruction(mbti)}
            `;
        }

        // Apply Context Modulation
        if (p.emotionModulation && p.emotionModulation[contextType]) {
            instruction += `
        [Situation: ${contextType.toUpperCase()}]
        [Modulation]: ${p.emotionModulation[contextType]}
            `;
        }

        // Apply Auto-Expansion Rule
        if (p.autoExtendedTraits && p.autoExtendedTraits.allowExpansion) {
            instruction += `
        [AI Expansion]: ${p.autoExtendedTraits.instruct}
            `;
        }

        return instruction;
    }

    /**
     * Gets the interaction dynamic between two personalities.
     * @param {string} sourcePersonality - The speaker
     * @param {string} targetPersonality - The listener
     * @returns {string} Description of the dynamic (e.g., "Rivalry", "Respect", "Neutral")
     */
    getInteractionDynamic(sourcePersonality, targetPersonality) {
        const p = this.personaDB[sourcePersonality];
        if (!p || !p.interactionStyle) return "Neutral";

        if (p.interactionStyle.respect?.includes(targetPersonality)) return "Respect";
        if (p.interactionStyle.rivalry?.includes(targetPersonality)) return "Rivalry";
        if (p.interactionStyle.distrust?.includes(targetPersonality)) return "Distrust";
        if (p.interactionStyle.tease?.includes(targetPersonality)) return "Tease";

        return "Neutral";
    }

    /**
     * Constructs a tone instruction string based on MBTI dimensions.
     * @param {string} mbti 
     */
    getMBTIToneInstruction(mbti) {
        if (!mbti) return "";
        let result = "";
        const dimensions = mbti.substring(0, 4).toUpperCase().split(""); // Handle "ENFP_CHAOTIC" -> ["E","N","F","P"]

        dimensions.forEach(dim => {
            const mod = MBTI_TONE_MODIFIERS[dim];
            if (mod) {
                result += `- ${mod.desc}: ${mod.modifiers}\n`;
            }
        });

        return result;
    }

    /**
     * Helper to get random prefix
     */
    getPrefix(personality) {
        return this.personaDB[personality]?.prefix || "";
    }
}
