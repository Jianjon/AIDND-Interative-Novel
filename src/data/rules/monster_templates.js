/**
 * D&D 5E Monster Templates & Scaling Logic
 * Provides balanced stats based on Challenge Rating (CR) and Monster Type.
 */

// Base Stats by Challenge Rating (Simplified DMG Table)
const CR_TABLE = {
    "0": { ac: 11, hp: "1-6", atk: 3, dmg: "1d4", dc: 10, xp: 10 },
    "1/8": { ac: 11, hp: "7-35", atk: 3, dmg: "1d6", dc: 11, xp: 25 }, // Guard, Kobold
    "1/4": { ac: 12, hp: "15-50", atk: 4, dmg: "1d6+2", dc: 11, xp: 50 }, // Goblin, Skeleton
    "1/2": { ac: 13, hp: "50-70", atk: 4, dmg: "1d8+2", dc: 12, xp: 100 }, // Orc, Hobgoblin
    "1": { ac: 13, hp: "71-85", atk: 5, dmg: "1d10+3", dc: 12, xp: 200 }, // Bugbear, Dire Wolf
    "2": { ac: 14, hp: "86-100", atk: 5, dmg: "2d6+3", dc: 13, xp: 450 }, // Ogre, Bandit Captain
    "3": { ac: 14, hp: "101-115", atk: 5, dmg: "2d8+3", dc: 13, xp: 700 }, // Owlbear, Veteran
    "4": { ac: 15, hp: "116-130", atk: 6, dmg: "2d10+4", dc: 14, xp: 1100 }, // Red Dragon Wyrmling
    "5": { ac: 16, hp: "131-145", atk: 7, dmg: "3d8+4", dc: 15, xp: 1800 }, // Troll, Gladiator
    "6": { ac: 16, hp: "146-160", atk: 7, dmg: "3d10+4", dc: 15, xp: 2300 },
    "7": { ac: 16, hp: "161-175", atk: 7, dmg: "4d8+5", dc: 15, xp: 2900 },
    "8": { ac: 16, hp: "176-190", atk: 8, dmg: "4d10+5", dc: 16, xp: 3900 }, // Frost Giant
    "9": { ac: 17, hp: "191-205", atk: 8, dmg: "4d12+5", dc: 16, xp: 5000 },
    "10": { ac: 17, hp: "206-220", atk: 9, dmg: "5d10+5", dc: 17, xp: 5900 }, // Young Red Dragon
    "11": { ac: 17, hp: "220-250", atk: 9, dmg: "5d12+5", dc: 17, xp: 7200 },
    "12": { ac: 18, hp: "250-280", atk: 10, dmg: "6d10+6", dc: 18, xp: 8400 },
    "13": { ac: 18, hp: "280-310", atk: 10, dmg: "6d12+6", dc: 18, xp: 10000 }, // Adult Dragon Range
    "17": { ac: 19, hp: "310-400", atk: 12, dmg: "4d12+8", dc: 19, xp: 18000 }, // Adult Red Dragon
    "20": { ac: 20, hp: "400-600", atk: 14, dmg: "4d12+10", dc: 21, xp: 25000 }, // Ancient Dragon
};

// Type Modifiers
const TYPE_TEMPLATES = {
    "Goblinoid": {
        stats: { dex: 2 },
        traits: ["Nimble Escape (Bonus Action Hide/Disengage)"],
        flavor: "Sneaky, pack tactics."
    },
    "Undead": {
        stats: { con: 2, cha: -2 },
        traits: ["Undead Fortitude", "Poison Immunity", "Darkvision"],
        flavor: "Relentless, silent."
    },
    "Beast": {
        stats: { int: -4 },
        traits: ["Pack Tactics", "Keen Senses"],
        flavor: "Primal, instinctual."
    },
    "Dragon": {
        stats: { str: 4, con: 4, int: 2, cha: 2 },
        traits: ["Breath Weapon", "Flight", "Frightful Presence (High CR)"],
        flavor: "Majestic, terrifying, elemental."
    },
    "Construct": {
        stats: { con: 4, int: -4, cha: -4 },
        traits: ["Antimagic Susceptibility", "Immutable Form", "Poison Immunity"],
        flavor: "Artificial, geometric movement."
    },
    "Fiend": {
        stats: { cha: 2, int: 2 },
        traits: ["Magic Resistance", "Fire Resistance", "Telepathy"],
        flavor: "Sulfuric smell, malicious intent."
    }
};

/**
 * Generates monster stats based on CR and Type.
 * @param {string|number} cr - Challenge Rating (e.g. "1/4", 5)
 * @param {string} type - Monster type (e.g. "Goblinoid", "Undead")
 * @param {string} role - "Minion" (Low HP), "Standard", "Boss" (Max HP, Legendary Actions)
 * @returns {Object} Complete stat block
 */
export const getMonsterStats = (cr, type = "Humanoid", role = "Standard") => {
    const base = CR_TABLE[String(cr)] || CR_TABLE["1"]; // Default to CR 1
    const template = TYPE_TEMPLATES[type] || {};

    // Parse HP range "15-50"
    const [minHp, maxHp] = base.hp.split('-').map(Number);
    let finalHp = Math.floor((minHp + maxHp) / 2);

    if (role === "Minion") finalHp = minHp;
    if (role === "Boss") finalHp = maxHp;

    const stats = {
        name: `Generic ${type} (CR ${cr})`,
        cr: cr,
        type: type,
        ac: base.ac,
        hp: finalHp,
        maxHp: finalHp,
        atkMod: base.atk,
        damage: base.dmg,
        dc: base.dc,
        traits: template.traits || [],
        xp: base.xp
    };

    // Apply Boss Template
    if (role === "Boss") {
        stats.ac += 2;
        stats.hp = Math.floor(stats.hp * 1.5); // Boss Bonus HP
        stats.traits.push("Legendary Resistance (1/Day)");
        if (parseFloat(cr) >= 5) stats.traits.push("Legendary Actions");
    }

    return stats;
};
