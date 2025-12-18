/**
 * D&D 5E Encounter Balance System
 * Based on DMG Chapter 3: Creating Adventures
 * Provides XP budgets and CR recommendations for balanced encounters.
 */

// XP Thresholds per Character by Level (DMG p.82)
const XP_THRESHOLDS = {
    1: { Easy: 25, Medium: 50, Hard: 75, Deadly: 100 },
    2: { Easy: 50, Medium: 100, Hard: 150, Deadly: 200 },
    3: { Easy: 75, Medium: 150, Hard: 225, Deadly: 400 },
    4: { Easy: 125, Medium: 250, Hard: 375, Deadly: 500 },
    5: { Easy: 250, Medium: 500, Hard: 750, Deadly: 1100 },
    6: { Easy: 300, Medium: 600, Hard: 900, Deadly: 1400 },
    7: { Easy: 350, Medium: 750, Hard: 1100, Deadly: 1700 },
    8: { Easy: 450, Medium: 900, Hard: 1400, Deadly: 2100 },
    9: { Easy: 550, Medium: 1100, Hard: 1600, Deadly: 2400 },
    10: { Easy: 600, Medium: 1200, Hard: 1900, Deadly: 2800 },
    11: { Easy: 800, Medium: 1600, Hard: 2400, Deadly: 3600 },
    12: { Easy: 1000, Medium: 2000, Hard: 3000, Deadly: 4500 },
    13: { Easy: 1100, Medium: 2200, Hard: 3400, Deadly: 5100 },
    14: { Easy: 1250, Medium: 2500, Hard: 3800, Deadly: 5700 },
    15: { Easy: 1400, Medium: 2800, Hard: 4300, Deadly: 6400 },
    16: { Easy: 1600, Medium: 3200, Hard: 4800, Deadly: 7200 },
    17: { Easy: 2000, Medium: 3900, Hard: 5900, Deadly: 8800 },
    18: { Easy: 2100, Medium: 4200, Hard: 6300, Deadly: 9500 },
    19: { Easy: 2400, Medium: 4900, Hard: 7300, Deadly: 10900 },
    20: { Easy: 2800, Medium: 5700, Hard: 8500, Deadly: 12700 }
};

// XP by Challenge Rating (DMG p.275)
const CR_XP = {
    "0": 10, "1/8": 25, "1/4": 50, "1/2": 100,
    "1": 200, "2": 450, "3": 700, "4": 1100, "5": 1800,
    "6": 2300, "7": 2900, "8": 3900, "9": 5000, "10": 5900,
    "11": 7200, "12": 8400, "13": 10000, "14": 11500, "15": 13000,
    "16": 15000, "17": 18000, "18": 20000, "19": 22000, "20": 25000
};

// Multipliers for multiple monsters (DMG p.83)
const MONSTER_MULTIPLIERS = [
    { count: 1, multiplier: 1 },
    { count: 2, multiplier: 1.5 },
    { count: 3, multiplier: 2 },
    { count: 7, multiplier: 2.5 },
    { count: 11, multiplier: 3 },
    { count: 15, multiplier: 4 }
];

/**
 * Get the XP budget for an encounter
 * @param {number} partyLevel - Average party level
 * @param {number} partySize - Number of party members
 * @param {string} difficulty - 'Easy', 'Medium', 'Hard', or 'Deadly'
 * @returns {number} Total XP budget
 */
export const getEncounterBudget = (partyLevel, partySize, difficulty = 'Medium') => {
    const level = Math.max(1, Math.min(20, Math.floor(partyLevel)));
    const thresholds = XP_THRESHOLDS[level] || XP_THRESHOLDS[1];
    return thresholds[difficulty] * partySize;
};

/**
 * Get the multiplier for a number of monsters
 * @param {number} monsterCount - Number of monsters in encounter
 * @returns {number} Multiplier to apply to total monster XP
 */
export const getMonsterMultiplier = (monsterCount) => {
    for (let i = MONSTER_MULTIPLIERS.length - 1; i >= 0; i--) {
        if (monsterCount >= MONSTER_MULTIPLIERS[i].count) {
            return MONSTER_MULTIPLIERS[i].multiplier;
        }
    }
    return 1;
};

/**
 * Get recommended CR range for party
 * @param {number} partyLevel - Average party level
 * @param {number} partySize - Number of party members
 * @returns {Object} Recommended CR ranges for different enemy types
 */
export const getRecommendedCR = (partyLevel, partySize) => {
    const level = Math.max(1, Math.min(20, partyLevel));

    // Core formula: Boss CR ≈ Party Level, Minions CR ≈ Level/4
    const recommendations = {
        minion: { min: Math.max(0, level - 3), max: Math.max(1, Math.floor(level / 2)) },
        standard: { min: Math.max(1, Math.floor(level / 2)), max: level },
        elite: { min: level, max: level + 1 },
        boss: { min: level, max: level + 2 },
        maxAllowed: level + 3, // Absolute maximum CR
        notes: []
    };

    // Party size adjustments
    if (partySize <= 3) {
        recommendations.boss.max = level; // Smaller parties, weaker bosses
        recommendations.notes.push("小隊伍：Boss CR 不應超過隊伍等級");
    } else if (partySize >= 6) {
        recommendations.boss.max = level + 3; // Larger parties can handle more
        recommendations.notes.push("大隊伍：可應對更強的敵人");
    }

    return recommendations;
};

/**
 * Generate encounter composition for AI
 * @param {number} partyLevel - Average party level 
 * @param {number} partySize - Number of party members
 * @param {string} difficulty - Encounter difficulty
 * @returns {string} Formatted encounter guidelines for AI prompt injection
 */
export const getEncounterGuidelines = (partyLevel, partySize, difficulty = 'Medium') => {
    const budget = getEncounterBudget(partyLevel, partySize, difficulty);
    const cr = getRecommendedCR(partyLevel, partySize);

    return `
[遭遇戰平衡指南]
隊伍等級: ${partyLevel} | 人數: ${partySize} | 難度: ${difficulty}
XP 預算: ${budget} XP

適合 CR 範圍:
- 雜兵 (Minion): CR ${cr.minion.min}-${cr.minion.max} (群體出現)
- 標準敵人: CR ${cr.standard.min}-${cr.standard.max}
- 精英敵人: CR ${cr.elite.min}-${cr.elite.max}
- Boss: CR ${cr.boss.min}-${cr.boss.max}

❌ 禁止: CR 超過 ${cr.maxAllowed} 的敵人
❌ 禁止: 成年龍、遠古龍等史詩級怪物 (除非隊伍等級 10+)
✅ 建議: 多個弱敵 + 1個精英，而非單一超強敵人
✅ Boss 戰: 1 Boss (CR ${cr.boss.min}) + 2-4 雜兵 (CR ${cr.minion.max})
${cr.notes.join('\n')}
`.trim();
};

/**
 * Validate an encounter composition
 * @param {Array} enemies - Array of {cr: number|string, count: number}
 * @param {number} partyLevel - Average party level
 * @param {number} partySize - Number of party members
 * @returns {Object} Validation result with warnings
 */
export const validateEncounter = (enemies, partyLevel, partySize) => {
    let totalXP = 0;
    let monsterCount = 0;
    const warnings = [];
    const cr = getRecommendedCR(partyLevel, partySize);

    enemies.forEach(e => {
        const xp = CR_XP[String(e.cr)] || 0;
        totalXP += xp * (e.count || 1);
        monsterCount += e.count || 1;

        // Check for overpowered enemies
        const numCR = parseFloat(e.cr);
        if (numCR > cr.maxAllowed) {
            warnings.push(`⚠️ CR ${e.cr} 敵人對等級 ${partyLevel} 隊伍過強`);
        }
    });

    const adjustedXP = Math.floor(totalXP * getMonsterMultiplier(monsterCount));
    const budgets = {
        easy: getEncounterBudget(partyLevel, partySize, 'Easy'),
        medium: getEncounterBudget(partyLevel, partySize, 'Medium'),
        hard: getEncounterBudget(partyLevel, partySize, 'Hard'),
        deadly: getEncounterBudget(partyLevel, partySize, 'Deadly')
    };

    let difficulty = 'Easy';
    if (adjustedXP >= budgets.deadly) difficulty = 'Deadly';
    else if (adjustedXP >= budgets.hard) difficulty = 'Hard';
    else if (adjustedXP >= budgets.medium) difficulty = 'Medium';

    return {
        totalXP,
        adjustedXP,
        monsterCount,
        difficulty,
        isBalanced: adjustedXP <= budgets.hard && warnings.length === 0,
        warnings,
        budgets
    };
};

// ============================================================
// DM PERSONA INTEGRATION
// ============================================================

/**
 * Map DM persona to encounter difficulty
 * @param {string} tone - DM persona: 'guide', 'arbiter', 'ruthless'
 * @returns {string} Difficulty level: 'Easy', 'Medium', 'Hard', 'Deadly'
 */
export const getDifficultyFromDMPersona = (tone) => {
    const mapping = {
        // TRPG DM Personas
        guide: 'Easy',      // 友善 DM - 容易遭遇
        arbiter: 'Medium',  // 公平 DM - 標準遭遇
        ruthless: 'Deadly', // 嚴苛 DM - 致命遭遇
        // Novel Mode Tones (fallback)
        relaxed: 'Easy',
        normal: 'Medium',
        grim: 'Hard'
    };
    return mapping[tone] || 'Medium';
};

/**
 * Get death protection rules based on DM persona
 * @param {string} tone - DM persona
 * @returns {string} Death handling rules for AI
 */
export const getDeathProtectionRules = (tone) => {
    const rules = {
        guide: `
[死亡保護規則 - 友善 DM]
- ❌ 敵人不會攻擊倒地 (0 HP) 的角色
- ✅ 若全隊即將滅團，安排戲劇性撤退機會
- ✅ 失敗 = 遭遇挫折，而非角色死亡
- ✅ NPC 可能在危急時刻出現幫助`,
        arbiter: `
[死亡規則 - 公平 DM]
- ⚠️ 依照骰子結果和戰術邏輯判定
- ⚠️ 倒地角色需進行死亡豁免 (Death Saves)
- ⚠️ 敵人不會刻意補刀，除非戰術上合理
- ⚠️ 如玩家決策導致死亡，公平執行`,
        ruthless: `
[死亡規則 - 嚴苛 DM]
- ⚠️ 智慧型敵人會攻擊倒地目標 (自動重擊 = 2次失敗)
- ⚠️ 資源稀缺，復活法術罕見
- ⚠️ 角色死亡是真實可能的結局
- ⚠️ 敵人使用最佳戰術 (集火、控制、分割)`
    };
    return rules[tone] || rules.arbiter;
};

/**
 * Get complete encounter guidelines with DM persona
 * @param {number} partyLevel - Average party level 
 * @param {number} partySize - Number of party members
 * @param {string} tone - DM persona (guide/arbiter/ruthless)
 * @returns {string} Complete encounter guidelines including death rules
 */
export const getEncounterGuidelinesWithPersona = (partyLevel, partySize, tone) => {
    const difficulty = getDifficultyFromDMPersona(tone);
    const baseGuidelines = getEncounterGuidelines(partyLevel, partySize, difficulty);
    const deathRules = getDeathProtectionRules(tone);

    return `${baseGuidelines}
${deathRules}`.trim();
};

// Export CR_XP for reference
export { CR_XP, XP_THRESHOLDS };

