/**
 * D&D 5E Enhanced Loot Tables
 * Provides structured loot generation guidelines for AI.
 * Includes quest items, magic items, class-specific gear, and rarity tiers.
 */

// ============================================================
// RARITY TIERS (DMG p.135)
// ============================================================

export const RARITY_TIERS = {
    common: {
        name: "Common",
        nameCN: "普通",
        probability: 0.60,
        minLevel: 1,
        goldValue: "50-100 gp"
    },
    uncommon: {
        name: "Uncommon",
        nameCN: "少見",
        probability: 0.25,
        minLevel: 3,
        goldValue: "101-500 gp"
    },
    rare: {
        name: "Rare",
        nameCN: "稀有",
        probability: 0.10,
        minLevel: 5,
        goldValue: "501-5000 gp"
    },
    veryRare: {
        name: "Very Rare",
        nameCN: "非常稀有",
        probability: 0.04,
        minLevel: 11,
        goldValue: "5001-50000 gp"
    },
    legendary: {
        name: "Legendary",
        nameCN: "傳說",
        probability: 0.01,
        minLevel: 17,
        goldValue: "50000+ gp"
    }
};

// ============================================================
// CLASS-SPECIFIC ITEM CATEGORIES
// ============================================================

export const CLASS_ITEM_PREFERENCES = {
    // Martial Classes (Heavy armor, melee)
    "戰士": { armor: "Heavy", weapons: ["Longsword", "Greatsword", "Shield"], focus: null },
    "野蠻人": { armor: "Medium", weapons: ["Greataxe", "Maul"], focus: null },
    "聖騎士": { armor: "Heavy", weapons: ["Longsword", "Shield", "Halberd"], focus: "Holy Symbol" },

    // Dexterity Classes (Light armor, finesse)
    "遊蕩者": { armor: "Light", weapons: ["Rapier", "Shortsword", "Hand Crossbow"], focus: "Thieves' Tools" },
    "遊俠": { armor: "Medium", weapons: ["Longbow", "Shortsword"], focus: null },
    "武僧": { armor: "None", weapons: ["Quarterstaff", "Shortsword"], focus: null },

    // Arcane Casters (Robes, staves)
    "法師": { armor: "None", weapons: ["Quarterstaff", "Dagger"], focus: "Arcane Focus" },
    "術士": { armor: "None", weapons: ["Dagger", "Light Crossbow"], focus: "Arcane Focus" },
    "邪術師": { armor: "Light", weapons: ["Dagger", "Quarterstaff"], focus: "Arcane Focus" },

    // Divine Casters (Medium armor, symbols)
    "牧師": { armor: "Medium", weapons: ["Mace", "Shield"], focus: "Holy Symbol" },
    "德魯伊": { armor: "Medium", weapons: ["Scimitar", "Quarterstaff"], focus: "Druidic Focus" },

    // Hybrid
    "吟遊詩人": { armor: "Light", weapons: ["Rapier", "Shortsword"], focus: "Musical Instrument" }
};

// ============================================================
// MAGIC ITEMS BY RARITY
// ============================================================

export const MAGIC_ITEMS_BY_RARITY = {
    common: [
        { name: "治療藥水", type: "consumable", effect: "恢復 2d4+2 HP" },
        { name: "光亮石", type: "wondrous", effect: "作為動作發出 30 呎亮光" },
        { name: "無盡水壺", type: "wondrous", effect: "可持續倒出清水" }
    ],
    uncommon: [
        { name: "+1 武器", type: "weapon", effect: "+1 攻擊和傷害" },
        { name: "+1 護甲", type: "armor", effect: "+1 AC (不計入基礎)" },
        { name: "抗性披風", type: "wondrous", effect: "+1 AC 和豁免" },
        { name: "精靈之靴", type: "wondrous", effect: "隱匿優勢" },
        { name: "巨人力氣護手", type: "wondrous", effect: "力量變為 19" },
        { name: "治療權杖", type: "wondrous", effect: "10 發，每發恢復 1d6+4" }
    ],
    rare: [
        { name: "+2 武器", type: "weapon", effect: "+2 攻擊和傷害" },
        { name: "+2 護甲", type: "armor", effect: "+2 AC" },
        { name: "火舌劍", type: "weapon", effect: "額外 2d6 火焰傷害" },
        { name: "飛行掃帚", type: "wondrous", effect: "飛行速度 50 呎" },
        { name: "隱形斗篷", type: "wondrous", effect: "隱形 1 小時" },
        { name: "復活捲軸", type: "consumable", effect: "施放復活術" }
    ],
    veryRare: [
        { name: "+3 武器", type: "weapon", effect: "+3 攻擊和傷害" },
        { name: "+3 護甲", type: "armor", effect: "+3 AC" },
        { name: "傳送戒指", type: "wondrous", effect: "3 發傳送術" },
        { name: "抗魔盾", type: "shield", effect: "+2 AC，法術豁免優勢" }
    ],
    legendary: [
        { name: "聖復仇者", type: "weapon", effect: "+3，對邪惡生物額外 2d10 光輝傷害" },
        { name: "斬首劍", type: "weapon", effect: "+3，20 時斬首或 6d8 額外傷害" },
        { name: "祝願戒指", type: "wondrous", effect: "3 次祈願術" }
    ]
};

// ============================================================
// QUEST ITEM TEMPLATES
// ============================================================

export const QUEST_ITEM_TEMPLATES = [
    { name: "神秘地圖", type: "quest", hint: "標記著隱藏地點" },
    { name: "古老鑰匙", type: "quest", hint: "打開某處封印的門" },
    { name: "密封信件", type: "quest", hint: "來自重要人物" },
    { name: "破碎護符", type: "quest", hint: "需要找到另一半" },
    { name: "神諭水晶", type: "quest", hint: "似乎在回應某種呼喚" },
    { name: "血染日記", type: "quest", hint: "記載著可怕的秘密" },
    { name: "家傳信物", type: "quest", hint: "某人遺失的珍貴物品" },
    { name: "魔法印記", type: "quest", hint: "可作為通行證" }
];

// ============================================================
// LOOT GUIDELINES GENERATOR
// ============================================================

/**
 * Get loot generation guidelines for AI
 * @param {number} partyLevel - Average party level
 * @param {Array} partyClasses - Array of class names in Chinese
 * @param {string} encounterType - 'combat', 'exploration', 'boss'
 * @returns {string} Formatted loot guidelines for AI prompt
 */
export const getLootGuidelines = (partyLevel, partyClasses = [], encounterType = 'combat') => {
    // Determine available rarities based on level
    const availableRarities = Object.entries(RARITY_TIERS)
        .filter(([_, tier]) => partyLevel >= tier.minLevel)
        .map(([key, tier]) => `${tier.nameCN} (${Math.round(tier.probability * 100)}%)`)
        .join(', ');

    // Get class-appropriate item hints
    const classHints = partyClasses
        .map(cls => {
            const prefs = CLASS_ITEM_PREFERENCES[cls];
            if (!prefs) return null;
            return `- ${cls}: ${prefs.weapons.slice(0, 2).join('/')}`;
        })
        .filter(Boolean)
        .join('\n');

    // Encounter type modifiers
    const dropRates = {
        combat: { magic: 15, quest: 5, gold: 80 },
        exploration: { magic: 5, quest: 25, gold: 70 },
        boss: { magic: 50, quest: 30, gold: 100 }
    };
    const rates = dropRates[encounterType] || dropRates.combat;

    return `
[戰利品生成指南]
隊伍等級: ${partyLevel} | 遭遇類型: ${encounterType}

可用稀有度: ${availableRarities}

掉落機率參考:
- 金幣/消耗品: ${rates.gold}%
- 魔法道具: ${rates.magic}%
- 任務道具: ${rates.quest}% (劇情相關時)

職業適合道具:
${classHints || '- (依據隊伍組成判斷)'}

注意事項:
❌ 禁止: 等級 ${partyLevel} 隊伍獲得 ${partyLevel < 5 ? '稀有+' : partyLevel < 11 ? '非常稀有+' : '傳說級'} 道具
✅ 優先: 任務相關道具 > 職業適合道具 > 通用道具
✅ Boss 戰: 必定掉落有價值物品
`.trim();
};

/**
 * Get rarity tier appropriate for party level
 * @param {number} partyLevel 
 * @returns {string} Maximum rarity key
 */
export const getMaxRarityForLevel = (partyLevel) => {
    if (partyLevel >= 17) return 'legendary';
    if (partyLevel >= 11) return 'veryRare';
    if (partyLevel >= 5) return 'rare';
    if (partyLevel >= 3) return 'uncommon';
    return 'common';
};
