/**
 * Module Plot Data - Combined Index
 * Exports all module data for Story Navigation
 */

import MODULES_PART1 from './modules_data_part1.js';
import MODULES_PART2 from './modules_data_part2.js';
import MODULES_PART3 from './modules_data_part3.js';
import MODULES_PART4 from './modules_data_part4.js';
import MODULES_PART5 from './modules_data_part5.js';

// Combine all modules (Enhanced versions override basic versions)
export const ALL_MODULES = {
    ...MODULES_PART1,
    ...MODULES_PART2,
    // Part 3 enhanced modules
    storm_kings_thunder: MODULES_PART3.storm_kings_thunder_enhanced,
    descent_into_avernus: MODULES_PART3.descent_into_avernus_enhanced,
    rime_of_frostmaiden: MODULES_PART3.rime_of_frostmaiden_enhanced,
    dragon_heist: MODULES_PART3.dragon_heist_enhanced,
    // Part 4 enhanced modules
    princes_of_apocalypse: MODULES_PART4.princes_of_apocalypse_enhanced,
    shadow_dragon_queen: MODULES_PART4.shadow_dragon_queen_enhanced,
    keep_on_borderlands: MODULES_PART4.keep_on_borderlands_enhanced,
    tomb_of_horrors: MODULES_PART4.tomb_of_horrors_enhanced,
    // Part 5 enhanced modules
    red_hand_of_doom: MODULES_PART5.red_hand_of_doom_enhanced,
    against_the_giants: MODULES_PART5.against_the_giants_enhanced,
    white_plume_mountain: MODULES_PART5.white_plume_mountain_enhanced,
    expedition_barrier_peaks: MODULES_PART5.expedition_barrier_peaks_enhanced,
    isle_of_dread: MODULES_PART5.isle_of_dread_enhanced
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
 * @param {Object} moduleOverride - Optional direct module object (for sandbox modules)
 * @returns {string} - Formatted context string
 */
export function formatModuleContext(moduleId, currentAct, moduleOverride = null) {
    // Handle direct module object (for sandbox/custom modules)
    const module = moduleOverride || getModuleById(moduleId);
    if (!module) return "";

    // Sandbox mode: Use simplified freeform context
    if (module.sandbox) {
        return `
【沙盒冒險模式】
主題：${module.theme || module.title}
風格：史詩奇幻
冒險第 ${module.adventureDay || 1} 天

【沙盒規則】
1. 根據主題自由創造故事，無需遵循固定章節
2. 每次回應後提供 3-4 個玩家可選的行動方向
3. 玩家的選擇會影響故事走向
4. 自然地引入 NPC、地點、衝突
5. 讓故事有機發展，不要強制推進
        `.trim();
    }

    const act = getActInfo(moduleId, currentAct);
    if (!act) return `模組：${module.title}`;

    let context = `
【劇本資訊】
模組：${module.title} (${module.titleEn})
建議等級：${module.levels}
${module.synopsis ? `簡介：${module.synopsis}` : ''}
目前章節：第 ${act.act} 章 - ${act.title}
${act.levelRange ? `章節等級：${act.levelRange}` : ''}

【本章目標】
${act.objective}

【關鍵事件】
${act.keyEvents ? act.keyEvents.map(e => `- ${e}`).join('\n') : '無特定事件'}

【結束條件】
${act.endCondition}
`.trim();


    // Add NPCs if available (handle both object and string formats)
    if (act.npcs && act.npcs.length > 0) {
        const npcList = act.npcs.map(npc => {
            if (typeof npc === 'object') {
                return `${npc.name}（${npc.role}）：${npc.description}`;
            }
            return npc;
        }).join('\n');
        context += `\n\n【重要NPC】\n${npcList}`;
    }

    // Add locations if available
    if (act.locations && act.locations.length > 0) {
        const locationList = act.locations.map(loc => {
            if (typeof loc === 'object') {
                return `${loc.name}：${loc.description}`;
            }
            return loc;
        }).join('\n');
        context += `\n\n【地點】\n${locationList}`;
    }

    // Add boss info if available
    if (act.boss) {
        if (typeof act.boss === 'object') {
            context += `\n\n【本章BOSS】\n${act.boss.name} (CR ${act.boss.cr}) - ${act.boss.type}\n戰術：${act.boss.tactics || '無特定戰術'}`;
        } else {
            context += `\n\n【本章BOSS】\n${act.boss}`;
        }
    }

    // Add opening text if available
    if (act.opening_text) {
        context += `\n\n【開場場景】\n${act.opening_text}`;
    }

    return context;
}

export { MODULES_PART1, MODULES_PART2, MODULES_PART3, MODULES_PART4, MODULES_PART5 };
export default ALL_MODULES;
