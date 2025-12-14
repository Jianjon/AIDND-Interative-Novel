/**
 * D&D 5E Conditions & Status Effects
 * Crucial for determining Advantage/Disadvantage and Action limitations.
 */

export const CONDITIONS = {
    "Blinded": {
        desc: "看不見東西",
        effects: [
            "Fail checks requiring sight.",
            "Attacks against you have Advantage.",
            "Your attacks have Disadvantage."
        ]
    },
    "Charmed": {
        desc: "被魅惑",
        effects: [
            "Cannot attack charmer.",
            "Charmer has Advantage on social checks vs you."
        ]
    },
    "Deafened": {
        desc: "耳聾",
        effects: [
            "Fail checks requiring hearing."
        ]
    },
    "Frightened": {
        desc: "恐慌",
        effects: [
            "Disadvantage on Checks/Attacks while source is visible.",
            "Cannot move closer to source."
        ]
    },
    "Grappled": {
        desc: "被擒抱",
        effects: [
            "Speed becomes 0.",
            "Ends if grappler incapacitated or forced movement breaks range."
        ]
    },
    "Incapacitated": {
        desc: "癱瘓 (無行動)",
        effects: [
            "Cannot take Actions or Reactions."
        ]
    },
    "Invisible": {
        desc: "隱形",
        effects: [
            "Cannot be seen (heavily obscured).",
            "Attacks against you have Disadvantage.",
            "Your attacks have Advantage."
        ]
    },
    "Paralyzed": {
        desc: "麻痺",
        effects: [
            "Incapacitated (No actions).",
            "Can't move or speak.",
            "Fail Str/Dex saves.",
            "Attacks vs you have Advantage.",
            "Melee hits vs you are AUTO CRITS."
        ]
    },
    "Petrified": {
        desc: "石化",
        effects: [
            "Turned to stone (Incapacitated).",
            "Resistance to all damage.",
            "Immune to Poison/Disease."
        ]
    },
    "Poisoned": {
        desc: "中毒",
        effects: [
            "Disadvantage on Attack Rolls and Ability Checks."
        ]
    },
    "Prone": {
        desc: "倒地",
        effects: [
            "Crawl only (half speed).",
            "Your attacks have Disadvantage.",
            "Attacks vs you within 5ft have Advantage (Ranged usually Disadvantage)."
        ]
    },
    "Restrained": {
        desc: "被束縛",
        effects: [
            "Speed 0.",
            "Attacks vs you have Advantage.",
            "Your attacks have Disadvantage.",
            "Disadvantage on Dex Saves."
        ]
    },
    "Stunned": {
        desc: "震懾",
        effects: [
            "Incapacitated.",
            "Can't move, speak falteringly.",
            "Fail Str/Dex saves.",
            "Attacks vs you have Advantage."
        ]
    },
    "Unconscious": {
        desc: "失去意識",
        effects: [
            "Incapacitated, Prone, drops held items.",
            "Fail Str/Dex saves.",
            "Attacks vs you have Advantage.",
            "Melee hits vs you are AUTO CRITS."
        ]
    },
    "Exhaustion": {
        desc: "力竭",
        levels: {
            1: "Disadvantage on Ability Checks",
            2: "Speed halved",
            3: "Disadvantage on Attacks/Saves",
            4: "HP Max halved",
            5: "Speed 0",
            6: "Death"
        }
    }
};
