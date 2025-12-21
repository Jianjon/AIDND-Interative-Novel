/**
 * Module Plot Data - Combined Index
 * Exports all module data for Story Navigation
 */

import hoard_of_dragon_queen from './modules/hoard_of_dragon_queen.js';
import curse_of_strahd from './modules/curse_of_strahd.js';
import tomb_of_annihilation from './modules/tomb_of_annihilation.js';
import out_of_the_abyss from './modules/out_of_the_abyss.js';
import storm_kings_thunder from './modules/storm_kings_thunder.js';
import descent_into_avernus from './modules/descent_into_avernus.js';
import rime_of_frostmaiden from './modules/rime_of_frostmaiden.js';
import dragon_heist from './modules/dragon_heist.js';
import princes_of_apocalypse from './modules/princes_of_apocalypse.js';
import shadow_dragon_queen from './modules/shadow_dragon_queen.js';
import lost_mine_of_phandelver from './modules/lost_mine_of_phandelver.js';
import keep_on_borderlands from './modules/keep_on_borderlands.js';
import tomb_of_horrors from './modules/tomb_of_horrors.js';
import red_hand_of_doom from './modules/red_hand_of_doom.js';
import against_the_giants from './modules/against_the_giants.js';
import white_plume_mountain from './modules/white_plume_mountain.js';
import expedition_barrier_peaks from './modules/expedition_barrier_peaks.js';
import sunless_citadel from './modules/sunless_citadel.js';
import isle_of_dread from './modules/isle_of_dread.js';
import dragons_of_despair from './modules/dragons_of_despair.js';
import dragons_of_stormwreck_isle from './modules/dragons_of_stormwreck_isle.js';
import rise_of_tiamat from './modules/rise_of_tiamat.js';
import saltmarsh from './modules/saltmarsh.js';
import frozen_sick from './modules/frozen_sick.js';
import fallen_fortress from './modules/fallen_fortress.js';
import potent_brew from './modules/potent_brew.js';

// Combine all modules
export const ALL_MODULES = {
    hoard_of_dragon_queen,
    curse_of_strahd,
    tomb_of_annihilation,
    out_of_the_abyss,
    storm_kings_thunder,
    descent_into_avernus,
    rime_of_frostmaiden,
    dragon_heist,
    princes_of_apocalypse,
    shadow_dragon_queen,
    lost_mine_of_phandelver,
    keep_on_borderlands,
    tomb_of_horrors,
    red_hand_of_doom,
    against_the_giants,
    white_plume_mountain,
    expedition_barrier_peaks,
    sunless_citadel,
    isle_of_dread,
    dragons_of_despair,
    dragons_of_stormwreck_isle,
    rise_of_tiamat,
    saltmarsh,
    frozen_sick,
    fallen_fortress,
    potent_brew
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
    11: "lost_mine_of_phandelver",
    12: "keep_on_borderlands",
    13: "tomb_of_horrors",
    14: "red_hand_of_doom",
    15: "against_the_giants",
    16: "white_plume_mountain",
    17: "expedition_barrier_peaks",
    18: "sunless_citadel",
    19: "isle_of_dread",
    20: "dragons_of_despair",
    21: "dragons_of_stormwreck_isle",
    22: "rise_of_tiamat",
    23: "saltmarsh",
    24: "frozen_sick",
    25: "fallen_fortress",
    27: "potent_brew"
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


    // Add NPCs with Dialogue
    if (act.npcs && act.npcs.length > 0) {
        const npcList = act.npcs.map(npc => {
            if (typeof npc === 'object') {
                let desc = `${npc.name}（${npc.role}）：${npc.description}`;
                if (npc.dialogue) {
                    desc += `\n    - Key Dialogue: "${npc.dialogue}"`;
                }
                return desc;
            }
            return npc;
        }).join('\n');
        context += `\n\n【重要NPC (含關鍵台詞)】\n${npcList}`;
    }

    // Add locations with Boxed Text
    if (act.locations && act.locations.length > 0) {
        const locationList = act.locations.map(loc => {
            if (typeof loc === 'object') {
                let desc = `${loc.name}：${loc.description}`;
                if (loc.boxedText) {
                    desc += `\n    - Boxed Text (Read Aloud): "${loc.boxedText}"`;
                }
                return desc;
            }
            return loc;
        }).join('\n');
        context += `\n\n【地點細節 (包含朗讀文)】\n${locationList}`;
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
        context += `\n\n【開場場景 (Opening Scene)】\n${act.opening_text}`;
    }

    // Add transitions if available
    if (act.transitions) {
        context += `\n\n【場景轉場 (Transitions)】\n${act.transitions}`;
    }

    // Add strategic nodes (Logic Branches) if available
    if (act.strategic_nodes && act.strategic_nodes.length > 0) {
        const nodesList = act.strategic_nodes.map(node => {
            let desc = `[節點 ${node.id}] ${node.title}\n    - 情境: ${node.situation}`;

            if (node.approaches) {
                desc += `\n    - 可選策略:`;
                node.approaches.forEach(app => {
                    desc += `\n      * ${app.type} (檢定: ${app.check}): ${app.outcome}`;
                });
            }

            if (node.fail_forward) {
                desc += `\n    - 失敗推進 (Fail-Forward): ${node.fail_forward}`;
            }

            return desc;
        }).join('\n\n');
        context += `\n\n【關鍵邏輯節點 (Strategic Nodes)】\n請嚴格參照以下邏輯判定玩家行動後果，特別是失敗時的處理：\n${nodesList}`;
    }

    return context;
}

export default ALL_MODULES;
