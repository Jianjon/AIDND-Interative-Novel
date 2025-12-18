/**
 * D&D 5E Skill Checks Reference
 * Provides DC tables and skill-attribute mappings for consistent AI judgments.
 */

// Standard Difficulty Classes (PHB p.174)
export const SKILL_DC_TABLE = {
    "Very Easy": 5,
    "Easy": 10,
    "Medium": 15,
    "Hard": 20,
    "Very Hard": 25,
    "Nearly Impossible": 30
};

// Skill DC Guidelines by Context
export const DC_GUIDELINES = {
    // Social
    "Persuade friendly NPC": 10,
    "Persuade neutral NPC": 15,
    "Persuade hostile NPC": 20,
    "Intimidate commoner": 10,
    "Intimidate veteran soldier": 15,
    "Bluff obvious lie": 20,
    "Bluff plausible lie": 15,

    // Exploration
    "Spot hidden door (obvious)": 10,
    "Spot hidden door (well-hidden)": 15,
    "Spot hidden door (magic/masterwork)": 20,
    "Track in soft ground": 10,
    "Track on hard surface": 15,
    "Track after rain": 20,
    "Climb easy surface": 10,
    "Climb rough wall": 15,
    "Climb sheer surface": 25,

    // Knowledge
    "Recall common knowledge": 10,
    "Recall specialized knowledge": 15,
    "Recall obscure knowledge": 20,
    "Recall legendary secrets": 25,

    // Combat-Adjacent
    "Hide in shadows": 15,
    "Hide in plain sight": 25,
    "Pick simple lock": 10,
    "Pick average lock": 15,
    "Pick complex lock": 20,
    "Disarm simple trap": 10,
    "Disarm complex trap": 20
};

// All 18 Skills with their governing Attribute
export const SKILL_ATTRIBUTES = {
    // STR-based
    "Athletics": "str",

    // DEX-based
    "Acrobatics": "dex",
    "Sleight of Hand": "dex",
    "Stealth": "dex",

    // INT-based
    "Arcana": "int",
    "History": "int",
    "Investigation": "int",
    "Nature": "int",
    "Religion": "int",

    // WIS-based
    "Animal Handling": "wis",
    "Insight": "wis",
    "Medicine": "wis",
    "Perception": "wis",
    "Survival": "wis",

    // CHA-based
    "Deception": "cha",
    "Intimidation": "cha",
    "Performance": "cha",
    "Persuasion": "cha"
};

// Passive Score = 10 + modifier (+ proficiency if proficient)
export const calculatePassive = (mod, profBonus = 0, advantage = false, disadvantage = false) => {
    let base = 10 + mod + profBonus;
    if (advantage) base += 5;
    if (disadvantage) base -= 5;
    return base;
};

// Contest Rules
export const CONTEST_RULES = {
    "Grapple": { attacker: "Athletics", defender: "Athletics or Acrobatics" },
    "Shove": { attacker: "Athletics", defender: "Athletics or Acrobatics" },
    "Hide": { attacker: "Stealth", defender: "Perception (Passive)" },
    "Detect Lie": { attacker: "Insight", defender: "Deception" },
    "Sneak Past": { attacker: "Stealth", defender: "Perception" }
};
