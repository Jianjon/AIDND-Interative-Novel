/**
 * Module Plot Data - Combined Index
 * Exports all module data for Story Navigation
 */

import MODULES_PART1 from './modules_data_part1.js';
import MODULES_PART2 from './modules_data_part2.js';

// Combine all modules
export const ALL_MODULES = {
    ...MODULES_PART1,
    ...MODULES_PART2
};

/**
 * Mapping from GameData.js numeric IDs to modules_data string keys
 * This bridges the gap without modifying GameData.js
 */
const NUMERIC_ID_MAP = {
    1: "hoard_of_dragon_queen",
    2: "curse_of_strahd",
    3: "tomb_of_annihilation",
    4: "out_of_the_abyss",
    5: "storm_kings_thunder",
    6: "descent_into_avernus",
    7: "rime_of_frostmaiden",
    8: "dragon_heist",
    9: "princes_of_apocalypse",
    10: "shadow_dragon_queen",
    11: "lost_mine_phandelver",
    12: "keep_on_borderlands",
    13: "tomb_of_horrors",
    14: "red_hand_of_doom",
    15: "against_the_giants",
    16: "white_plume_mountain",
    17: "expedition_barrier_peaks",
    18: "sunless_citadel",
    19: "isle_of_dread",
    20: "dragons_of_despair"
};

/**
 * Get module by ID (supports both numeric and string IDs)
 * @param {string|number} moduleId - The module identifier (numeric or string)
 * @returns {Object|null} - Module data or null
 */
export function getModuleById(moduleId) {
    // Handle numeric IDs from GameData.js
    if (typeof moduleId === 'number') {
        const stringKey = NUMERIC_ID_MAP[moduleId];
        return stringKey ? ALL_MODULES[stringKey] : null;
    }
    // Handle string IDs directly
    return ALL_MODULES[moduleId] || null;
}

/**
 * Get current act info for a module
 * @param {string|number} moduleId - The module identifier
 * @param {number} actNumber - Current act (1-indexed)
 * @returns {Object|null} - Act data or null
 */
export function getActInfo(moduleId, actNumber) {
    const module = getModuleById(moduleId); // Use getModuleById for numeric ID support
    if (!module || !module.acts) return null;
    return module.acts.find(a => a.act === actNumber) || null;
}

/**
 * Get objective text for current act
 * @param {string|number} moduleId 
 * @param {number} actNumber 
 * @returns {string} - Objective string for prompt injection
 */
export function getCurrentObjective(moduleId, actNumber) {
    const act = getActInfo(moduleId, actNumber);
    if (!act) return "繼續探索與冒險";
    return `【${act.title}】目標：${act.objective}`;
}

/**
 * Format module context for AI prompt
 * @param {string|number} moduleId 
 * @param {number} currentAct 
 * @returns {string} - Formatted context string
 */
export function formatModuleContext(moduleId, currentAct) {
    const module = getModuleById(moduleId); // Use getModuleById for numeric ID support
    if (!module) return "";

    const act = getActInfo(moduleId, currentAct);
    if (!act) return `模組：${module.title}`;

    let context = `
【劇本資訊】
模組：${module.title} (${module.titleEn})
建議等級：${module.levels}
目前章節：第 ${act.act} 章 - ${act.title}
${act.levelRange ? `章節等級：${act.levelRange}` : ''}

【本章目標】
${act.objective}

【關鍵事件】
${act.keyEvents ? act.keyEvents.map(e => `- ${e}`).join('\n') : '無特定事件'}

【結束條件】
${act.endCondition}
`.trim();

    // Add NPCs if available
    if (act.npcs && act.npcs.length > 0) {
        context += `\n\n【重要NPC】\n${act.npcs.join('、')}`;
    }

    // Add boss info if available
    if (act.boss) {
        context += `\n\n【本章BOSS】\n${act.boss}`;
    }

    return context;
}

export { MODULES_PART1, MODULES_PART2 };
export default ALL_MODULES;
