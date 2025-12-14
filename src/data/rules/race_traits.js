/**
 * D&D 5E Race Traits (SRD)
 * Defines racial bonuses, speed, and special traits.
 */

export const RACE_TRAITS = {
    "人類": {
        stats: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        speed: 30,
        size: "Medium",
        traits: ["Extra Language"]
    },
    "精靈": {
        stats: { dex: 2 },
        speed: 30,
        size: "Medium",
        traits: ["Darkvision (60ft)", "Keen Senses (Perception)", "Fey Ancestry", "Trance"],
        subraces: {
            "高等精靈": { stats: { int: 1 }, traits: ["Cantrip (Wizard)", "Extra Language"] },
            "木精靈": { stats: { wis: 1 }, traits: ["Fleet of Foot (35ft speed)", "Mask of the Wild"] },
            "黑暗精靈": { stats: { cha: 1 }, traits: ["Superior Darkvision (120ft)", "Sunlight Sensitivity", "Drow Magic"] }
        }
    },
    "矮人": {
        stats: { con: 2 },
        speed: 25,
        size: "Medium",
        traits: ["Darkvision (60ft)", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"],
        subraces: {
            "丘陵矮人": { stats: { wis: 1 }, traits: ["Dwarven Toughness (+1 HP/Level)"] },
            "山地矮人": { stats: { str: 2 }, traits: ["Dwarven Armor Training"] }
        }
    },
    "半身人": {
        stats: { dex: 2 },
        speed: 25,
        size: "Small",
        traits: ["Lucky", "Brave", "Halfling Nimbleness"],
        subraces: {
            "輕足半身人": { stats: { cha: 1 }, traits: ["Naturally Stealthy"] },
            "粗壯半身人": { stats: { con: 1 }, traits: ["Stout Resilience"] }
        }
    },
    "龍裔": {
        stats: { str: 2, cha: 1 },
        speed: 30,
        size: "Medium",
        traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"]
    },
    "提夫林": {
        stats: { cha: 2, int: 1 },
        speed: 30,
        size: "Medium",
        traits: ["Darkvision (60ft)", "Hellish Resistance (Fire)", "Infernal Legacy (Thaumaturgy, Hellish Rebuke, Darkness)"]
    },
    "侏儒": {
        stats: { int: 2 },
        speed: 25,
        size: "Small",
        traits: ["Darkvision (60ft)", "Gnome Cunning (Adv. on Int/Wis/Cha saves vs magic)"],
        subraces: {
            "森林侏儒": { stats: { dex: 1 }, traits: ["Natural Illusionist", "Speak with Small Beasts"] },
            "岩石侏儒": { stats: { con: 1 }, traits: ["Artificer's Lore", "Tinker"] }
        }
    },
    "半獸人": {
        stats: { str: 2, con: 1 },
        speed: 30,
        size: "Medium",
        traits: ["Darkvision (60ft)", "Menacing (Intimidation)", "Relentless Endurance", "Savage Attacks"]
    },
    "半精靈": {
        stats: { cha: 2, any1: 1, any2: 1 }, // Special handling needed for "any"
        speed: 30,
        size: "Medium",
        traits: ["Darkvision (60ft)", "Fey Ancestry", "Skill Versatility (2 Skills)"]
    }
};
