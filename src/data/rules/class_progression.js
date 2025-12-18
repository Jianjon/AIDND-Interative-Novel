/**
 * D&D 5E Class Progression Rules (SRD)
 * Includes Level 1-20 progression for: Fighter, Wizard, Cleric, Rogue
 */

export const CLASS_PROGRESSION = {
    "戰士": {
        hitDie: 10,
        primaryStat: "str", // Or Dex
        saves: ["str", "con"],
        features: {
            1: ["Fighting Style", "Second Wind"],
            2: ["Action Surge"],
            3: ["Martial Archetype"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack (1)"],
            6: ["Ability Score Improvement"],
            7: ["Martial Archetype Feature"],
            8: ["Ability Score Improvement"],
            9: ["Indomitable (1)"],
            10: ["Martial Archetype Feature"],
            11: ["Extra Attack (2)"],
            12: ["Ability Score Improvement"],
            13: ["Indomitable (2)"],
            14: ["Ability Score Improvement"],
            15: ["Martial Archetype Feature"],
            16: ["Ability Score Improvement"],
            17: ["Action Surge (2)", "Indomitable (3)"],
            18: ["Martial Archetype Feature"],
            19: ["Ability Score Improvement"],
            20: ["Extra Attack (3)"]
        }
    },
    "法師": {
        hitDie: 6,
        primaryStat: "int",
        saves: ["int", "wis"],
        features: {
            1: ["Arcane Recovery", "Spellcasting"],
            2: ["Arcane Tradition"],
            3: [], // 2nd Level Spells
            4: ["Ability Score Improvement"],
            5: [], // 3rd Level Spells
            6: ["Arcane Tradition Feature"],
            7: [], // 4th Level Spells
            8: ["Ability Score Improvement"],
            9: [], // 5th Level Spells
            10: ["Arcane Tradition Feature"],
            11: [], // 6th Level Spells
            12: ["Ability Score Improvement"],
            13: [], // 7th Level Spells
            14: ["Arcane Tradition Feature"],
            15: [], // 8th Level Spells
            16: ["Ability Score Improvement"],
            17: [], // 9th Level Spells
            18: ["Spell Mastery"],
            19: ["Ability Score Improvement"],
            20: ["Signature Spells"]
        },
        spellSlots: {
            // Level: [Can, 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th]
            1: [3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
            6: [4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
            7: [4, 4, 3, 3, 1, 0, 0, 0, 0, 0],
            8: [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
            9: [4, 4, 3, 3, 3, 1, 0, 0, 0, 0],
            10: [5, 4, 3, 3, 3, 2, 0, 0, 0, 0],
            11: [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            12: [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            13: [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            14: [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            15: [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            16: [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            17: [5, 4, 3, 3, 3, 2, 1, 1, 1, 1],
            18: [5, 4, 3, 3, 3, 3, 1, 1, 1, 1],
            19: [5, 4, 3, 3, 3, 3, 2, 1, 1, 1],
            20: [5, 4, 3, 3, 3, 3, 2, 2, 1, 1]
        }
    },
    "牧師": {
        hitDie: 8,
        primaryStat: "wis",
        saves: ["wis", "cha"],
        features: {
            1: ["Divine Domain", "Spellcasting"],
            2: ["Channel Divinity (1)", "Divine Domain Feature"],
            3: [],
            4: ["Ability Score Improvement"],
            5: ["Destroy Undead (CR 1/2)"],
            6: ["Channel Divinity (2)", "Divine Domain Feature"],
            7: [],
            8: ["Ability Score Improvement", "Destroy Undead (CR 1)", "Divine Domain Feature"],
            9: [],
            10: ["Divine Intervention"],
            11: ["Destroy Undead (CR 2)"],
            12: ["Ability Score Improvement"],
            13: [],
            14: ["Destroy Undead (CR 3)"],
            15: [],
            16: ["Ability Score Improvement"],
            17: ["Destroy Undead (CR 4)", "Divine Domain Feature"],
            18: ["Channel Divinity (3)"],
            19: ["Ability Score Improvement"],
            20: ["Divine Intervention Improvement"]
        },
        spellSlots: {
            // Same as Wizard usually
            1: [3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
            6: [4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
            7: [4, 4, 3, 3, 1, 0, 0, 0, 0, 0],
            8: [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
            9: [4, 4, 3, 3, 3, 1, 0, 0, 0, 0],
            10: [5, 4, 3, 3, 3, 2, 0, 0, 0, 0],
            11: [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            12: [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            13: [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            14: [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            15: [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            16: [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            17: [5, 4, 3, 3, 3, 2, 1, 1, 1, 1],
            18: [5, 4, 3, 3, 3, 3, 1, 1, 1, 1],
            19: [5, 4, 3, 3, 3, 3, 2, 1, 1, 1],
            20: [5, 4, 3, 3, 3, 3, 2, 2, 1, 1]
        }
    },
    "遊蕩者": {
        hitDie: 8,
        primaryStat: "dex",
        saves: ["dex", "int"],
        features: {
            1: ["Sneak Attack (1d6)", "Thieves' Cant", "Expertise"],
            2: ["Cunning Action"],
            3: ["Roguish Archetype", "Sneak Attack (2d6)"],
            4: ["Ability Score Improvement"],
            5: ["Uncanny Dodge", "Sneak Attack (3d6)"],
            6: ["Expertise"],
            7: ["Evasion", "Sneak Attack (4d6)"],
            8: ["Ability Score Improvement"],
            9: ["Roguish Archetype Feature", "Sneak Attack (5d6)"],
            10: ["Ability Score Improvement"],
            11: ["Reliable Talent", "Sneak Attack (6d6)"],
            12: ["Ability Score Improvement"],
            13: ["Roguish Archetype Feature", "Sneak Attack (7d6)"],
            14: ["Blindsense"],
            15: ["Slippery Mind", "Sneak Attack (8d6)"],
            16: ["Ability Score Improvement"],
            17: ["Roguish Archetype Feature", "Sneak Attack (9d6)"],
            18: ["Elusive"],
            19: ["Ability Score Improvement", "Sneak Attack (10d6)"],
            20: ["Stroke of Luck"]
        }
    },
    "野蠻人": {
        hitDie: 12,
        primaryStat: "str",
        saves: ["str", "con"],
        features: {
            1: ["Rage", "Unarmored Defense"],
            2: ["Reckless Attack", "Danger Sense"],
            3: ["Primal Path"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack", "Fast Movement"],
            6: ["Path Feature"],
            7: ["Feral Instinct"],
            8: ["Ability Score Improvement"],
            9: ["Brutal Critical (1 die)"],
            10: ["Path Feature"],
            11: ["Relentless Rage"],
            12: ["Ability Score Improvement"],
            13: ["Brutal Critical (2 dice)"],
            14: ["Path Feature"],
            15: ["Persistent Rage"],
            16: ["Ability Score Improvement"],
            17: ["Brutal Critical (3 dice)"],
            18: ["Indomitable Might"],
            19: ["Ability Score Improvement"],
            20: ["Primal Champion"]
        }
    },
    "吟遊詩人": {
        hitDie: 8,
        primaryStat: "cha",
        saves: ["dex", "cha"],
        features: {
            1: ["Spellcasting", "Bardic Inspiration (d6)"],
            2: ["Jack of All Trades", "Song of Rest (d6)"],
            3: ["Bard College", "Expertise"],
            4: ["Ability Score Improvement"],
            5: ["Bardic Inspiration (d8)", "Font of Inspiration"],
            6: ["Countercharm", "Bard College Feature"],
            7: [],
            8: ["Ability Score Improvement"],
            9: ["Song of Rest (d8)"],
            10: ["Bardic Inspiration (d10)", "Expertise", "Magical Secrets"],
            11: [],
            12: ["Ability Score Improvement"],
            13: ["Song of Rest (d10)"],
            14: ["Magical Secrets", "Bard College Feature"],
            15: ["Bardic Inspiration (d12)"],
            16: ["Ability Score Improvement"],
            17: ["Song of Rest (d12)"],
            18: ["Magical Secrets"],
            19: ["Ability Score Improvement"],
            20: ["Superior Inspiration"]
        },
        spellSlots: {
            // Full Caster
            1: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [3, 4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
            6: [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
            7: [3, 4, 3, 3, 1, 0, 0, 0, 0, 0],
            8: [3, 4, 3, 3, 2, 0, 0, 0, 0, 0],
            9: [3, 4, 3, 3, 3, 1, 0, 0, 0, 0],
            10: [4, 4, 3, 3, 3, 2, 0, 0, 0, 0],
            11: [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            12: [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            13: [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            14: [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            15: [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            16: [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            17: [4, 4, 3, 3, 3, 2, 1, 1, 1, 1],
            18: [4, 4, 3, 3, 3, 3, 1, 1, 1, 1],
            19: [4, 4, 3, 3, 3, 3, 2, 1, 1, 1],
            20: [4, 4, 3, 3, 3, 3, 2, 2, 1, 1]
        }
    },
    "德魯伊": {
        hitDie: 8,
        primaryStat: "wis",
        saves: ["int", "wis"],
        features: {
            1: ["Druidic", "Spellcasting"],
            2: ["Wild Shape", "Druid Circle"],
            3: [],
            4: ["Ability Score Improvement", "Wild Shape Improvement"],
            5: [],
            6: ["Druid Circle Feature"],
            7: [],
            8: ["Ability Score Improvement", "Wild Shape Improvement"],
            9: [],
            10: ["Druid Circle Feature"],
            11: [],
            12: ["Ability Score Improvement"],
            13: [],
            14: ["Druid Circle Feature"],
            15: [],
            16: ["Ability Score Improvement"],
            17: [],
            18: ["Timeless Body", "Beast Spells"],
            19: ["Ability Score Improvement"],
            20: ["Archdruid"]
        },
        spellSlots: {
            // Full Caster
            1: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [3, 4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
            6: [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
            7: [3, 4, 3, 3, 1, 0, 0, 0, 0, 0],
            8: [3, 4, 3, 3, 2, 0, 0, 0, 0, 0],
            9: [3, 4, 3, 3, 3, 1, 0, 0, 0, 0],
            10: [4, 4, 3, 3, 3, 2, 0, 0, 0, 0],
            11: [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            12: [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
            13: [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            14: [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
            15: [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            16: [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
            17: [4, 4, 3, 3, 3, 2, 1, 1, 1, 1],
            18: [4, 4, 3, 3, 3, 3, 1, 1, 1, 1],
            19: [4, 4, 3, 3, 3, 3, 2, 1, 1, 1],
            20: [4, 4, 3, 3, 3, 3, 2, 2, 1, 1]
        }
    },
    "武僧": {
        hitDie: 8,
        primaryStat: "dex",
        secondaryStat: "wis",
        saves: ["str", "dex"],
        features: {
            1: ["Unarmored Defense", "Martial Arts"],
            2: ["Ki", "Unarmored Movement"],
            3: ["Monastic Tradition", "Deflect Missiles"],
            4: ["Ability Score Improvement", "Slow Fall"],
            5: ["Extra Attack", "Stunning Strike"],
            6: ["Ki-Empowered Strikes", "Monastic Tradition Feature"],
            7: ["Evasion", "Stillness of Mind"],
            8: ["Ability Score Improvement"],
            9: ["Unarmored Movement Limit Improvement"],
            10: ["Purity of Body"],
            11: ["Monastic Tradition Feature"],
            12: ["Ability Score Improvement"],
            13: ["Tongue of the Sun and Moon"],
            14: ["Diamond Soul"],
            15: ["Timeless Body"],
            16: ["Ability Score Improvement"],
            17: ["Monastic Tradition Feature"],
            18: ["Empty Body"],
            19: ["Ability Score Improvement"],
            20: ["Perfect Self"]
        }
    },
    "聖武士": {
        hitDie: 10,
        primaryStat: "str",
        secondaryStat: "cha",
        saves: ["wis", "cha"],
        features: {
            1: ["Divine Sense", "Lay on Hands"],
            2: ["Fighting Style", "Spellcasting", "Divine Smite"],
            3: ["Divine Health", "Sacred Oath"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
            6: ["Aura of Protection"],
            7: ["Sacred Oath Feature"],
            8: ["Ability Score Improvement"],
            9: [],
            10: ["Aura of Courage"],
            11: ["Improved Divine Smite"],
            12: ["Ability Score Improvement"],
            13: [],
            14: ["Cleansing Touch"],
            15: ["Sacred Oath Feature"],
            16: ["Ability Score Improvement"],
            17: [],
            18: ["Aura Improvements"],
            19: ["Ability Score Improvement"],
            20: ["Sacred Oath Feature"]
        },
        spellSlots: {
            // Half Caster
            1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
            6: [4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
            7: [4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
            8: [4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
            9: [4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
            10: [5, 4, 3, 2, 0, 0, 0, 0, 0, 0],
            11: [5, 4, 3, 3, 0, 0, 0, 0, 0, 0],
            12: [5, 4, 3, 3, 0, 0, 0, 0, 0, 0],
            13: [5, 4, 3, 3, 1, 0, 0, 0, 0, 0],
            14: [5, 4, 3, 3, 1, 0, 0, 0, 0, 0],
            15: [5, 4, 3, 3, 2, 0, 0, 0, 0, 0],
            16: [5, 4, 3, 3, 2, 0, 0, 0, 0, 0],
            17: [5, 4, 3, 3, 3, 1, 0, 0, 0, 0],
            18: [5, 4, 3, 3, 3, 1, 0, 0, 0, 0],
            19: [5, 4, 3, 3, 3, 2, 0, 0, 0, 0],
            20: [5, 4, 3, 3, 3, 2, 0, 0, 0, 0]
        }
    },
    "遊俠": {
        hitDie: 10,
        primaryStat: "dex",
        secondaryStat: "wis",
        saves: ["str", "dex"],
        features: {
            1: ["Favored Enemy", "Natural Explorer"],
            2: ["Fighting Style", "Spellcasting"],
            3: ["Ranger Archetype", "Primeval Awareness"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
            6: ["Favored Enemy Improvement", "Natural Explorer Improvement"],
            7: ["Ranger Archetype Feature"],
            8: ["Ability Score Improvement", "Land's Stride"],
            9: [],
            10: ["Natural Explorer Improvement", "Hide in Plain Sight"],
            11: ["Ranger Archetype Feature"],
            12: ["Ability Score Improvement"],
            13: [],
            14: ["Favored Enemy Improvement", "Vanish"],
            15: ["Ranger Archetype Feature"],
            16: ["Ability Score Improvement"],
            17: [],
            18: ["Feral Senses"],
            19: ["Ability Score Improvement"],
            20: ["Foe Slayer"]
        },
        spellSlots: {
            // Half Caster (Same as Paladin)
            2: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
            // ... (pattern continues similar to Paladin)
            20: [5, 4, 3, 3, 3, 2, 0, 0, 0, 0]
        }
    },
    "術士": {
        hitDie: 6,
        primaryStat: "cha",
        saves: ["con", "cha"],
        features: {
            1: ["Spellcasting", "Sorcerous Origin"],
            2: ["Font of Magic"],
            3: ["Metamagic"],
            4: ["Ability Score Improvement"],
            5: [],
            6: ["Sorcerous Origin Feature"],
            7: [],
            8: ["Ability Score Improvement"],
            9: [],
            10: ["Metamagic"],
            11: [],
            12: ["Ability Score Improvement"],
            13: [],
            14: ["Sorcerous Origin Feature"],
            15: [],
            16: ["Ability Score Improvement"],
            17: ["Metamagic"],
            18: ["Sorcerous Origin Feature"],
            19: ["Ability Score Improvement"],
            20: ["Sorcerous Restoration"]
        },
        spellSlots: {
            // Full Caster (Same as Wizard)
            1: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            // ... same as Wizard
            20: [5, 4, 3, 3, 3, 3, 2, 2, 1, 1]
        }
    },
    "邪術師": {
        hitDie: 8,
        primaryStat: "cha",
        saves: ["wis", "cha"],
        features: {
            1: ["Otherworldly Patron", "Pact Magic"],
            2: ["Eldritch Invocations"],
            3: ["Pact Boon"],
            4: ["Ability Score Improvement"],
            5: [],
            6: ["Otherworldly Patron Feature"],
            7: [],
            8: ["Ability Score Improvement"],
            9: [],
            10: ["Otherworldly Patron Feature"],
            11: ["Mystic Arcanum (6th level)"],
            12: ["Ability Score Improvement"],
            13: ["Mystic Arcanum (7th level)"],
            14: ["Otherworldly Patron Feature"],
            15: ["Mystic Arcanum (8th level)"],
            16: ["Ability Score Improvement"],
            17: ["Mystic Arcanum (9th level)"],
            18: [],
            19: ["Ability Score Improvement"],
            20: ["Eldritch Master"]
        }
    },
    "奇械師": {
        hitDie: 8,
        primaryStat: "int",
        conStat: "con",
        saves: ["con", "int"],
        features: {
            1: ["Magical Tinkering", "Spellcasting"],
            2: ["Infuse Item (2)"],
            3: ["Artificer Specialist", "The Right Tool for the Job"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack or Potent Cantrip"],
            6: ["Infuse Item (3)", "Tool Expertise"],
            7: ["Flash of Genius"],
            8: ["Ability Score Improvement"],
            9: ["Specialist Feature"],
            10: ["Magic Item Adept"],
            11: ["Spell-Refueling Ring"],
            12: ["Ability Score Improvement"],
            14: ["Magic Item Savant"],
            15: ["Specialist Feature"],
            16: ["Ability Score Improvement"],
            18: ["Magic Item Master"],
            19: ["Ability Score Improvement"],
            20: ["Soul of Artifice"]
        },
        spellSlots: {
            1: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [2, 4, 2, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    "死靈法師": {
        hitDie: 6,
        primaryStat: "int",
        saves: ["int", "wis"],
        features: {
            1: ["Necromancy Savant", "Grim Harvest"],
            2: ["Undead Thralls"],
            4: ["Ability Score Improvement"],
            6: ["Inured to Undeath"],
            8: ["Ability Score Improvement"]
        },
        spellSlots: {
            1: [3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [3, 4, 2, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    "血獵手": {
        hitDie: 10,
        primaryStat: "dex",
        secondaryStat: "int",
        saves: ["dex", "int"],
        features: {
            1: ["Hunter's Bane", "Crimson Rite"],
            2: ["Blood Curses (1)"],
            3: ["Blood Hunter Order"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
            6: ["Blood Curses (2)", "Brand of Castigation"],
            7: ["Order Feature"],
            8: ["Ability Score Improvement"]
        }
    },
    "薩滿": {
        hitDie: 8,
        primaryStat: "wis",
        saves: ["int", "wis"],
        features: {
            1: ["Spirit Bond", "Spellcasting"],
            2: ["Totemic Call"],
            3: ["Spirit Journey"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack (Spirit)"],
            6: ["Spirit Journey Feature"],
            8: ["Ability Score Improvement"]
        }
    },
    "女巫": {
        hitDie: 8,
        primaryStat: "cha",
        saves: ["wis", "cha"],
        features: {
            1: ["Hexes", "Spellcasting", "Familiar"],
            2: ["Witch's Brew"],
            3: ["Coven Initiation"],
            4: ["Ability Score Improvement"],
            6: ["Coven Feature"],
            8: ["Ability Score Improvement"]
        }
    },
    "劍客": {
        hitDie: 10,
        primaryStat: "dex",
        saves: ["str", "dex"],
        features: {
            1: ["Fighting Style", "Exotic Weapon Training"],
            2: ["Evasion (Partial)"],
            3: ["Sword Saint Path"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
            6: ["Defensive Flourish"],
            7: ["Path Feature"],
            8: ["Ability Score Improvement"]
        }
    },
    "召喚師": {
        hitDie: 8,
        primaryStat: "int",
        saves: ["int", "cha"],
        features: {
            1: ["Modern Summoning", "Spellcasting"],
            2: ["Item Bond"],
            3: ["Convenience Store Inventory"],
            4: ["Ability Score Improvement"],
            5: ["Advanced Blueprint"],
            6: ["Summoning Expert"],
            8: ["Ability Score Improvement"]
        }
    },
    "魔戰士": {
        hitDie: 10,
        primaryStat: "str",
        secondaryStat: "int",
        saves: ["con", "int"],
        features: {
            1: ["Spell Combat", "Spellstrike"],
            2: ["Magus Arcana"],
            3: ["Spell Recall"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
            6: ["Magus Arcana"],
            7: ["Knowledge Pool"],
            8: ["Ability Score Improvement"]
        }
    },
    "先知": {
        hitDie: 8,
        primaryStat: "cha",
        saves: ["wis", "cha"],
        features: {
            1: ["Oracle's Curse", "Mystery", "Spellcasting"],
            2: ["Revelation"],
            4: ["Ability Score Improvement"],
            6: ["Revelation"],
            8: ["Ability Score Improvement"]
        }
    },
    "調查員": {
        hitDie: 8,
        primaryStat: "int",
        saves: ["dex", "int"],
        features: {
            1: ["Inspiration", "Trapfinding"],
            2: ["Investigative Talent"],
            3: ["Keen Recollection"],
            4: ["Ability Score Improvement"],
            5: ["Inspiration (d8)"],
            6: ["Investigative Talent"],
            8: ["Ability Score Improvement"]
        }
    },
    "審判者": {
        hitDie: 8,
        primaryStat: "wis",
        secondaryStat: "cha",
        saves: ["wis", "cha"],
        features: {
            1: ["Judgment (1/day)", "Stern Gaze"],
            2: ["Cunning Initiative", "Detect Alignment"],
            3: ["Solo Tactics"],
            4: ["Ability Score Improvement"],
            5: ["Bane", "Judgment (2/day)"],
            6: ["Teamwork Feat"],
            8: ["Ability Score Improvement", "Judgment (3/day)"]
        }
    },
    "靈能者": {
        hitDie: 6,
        primaryStat: "int",
        saves: ["int", "wis"],
        features: {
            1: ["Psionic Talent", "Telepathy"],
            2: ["Psionic Disciplines (2)"],
            3: ["Psionic Focus"],
            4: ["Ability Score Improvement"],
            5: ["Mental Force"],
            6: ["Psionic Disciplines (3)"],
            8: ["Ability Score Improvement"]
        }
    },
    "魔劍士": {
        hitDie: 10,
        primaryStat: "str",
        secondaryStat: "int",
        saves: ["str", "con"],
        features: {
            1: ["Fighting Style", "Second Wind"],
            2: ["Action Surge"],
            3: ["Weapon Bond", "Spellcasting"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
            6: ["Ability Score Improvement"],
            7: ["War Magic"],
            8: ["Ability Score Improvement"]
        }
    },
    "鍊金術士": {
        hitDie: 8,
        primaryStat: "int",
        saves: ["con", "int"],
        features: {
            1: ["Experimental Elixir", "Magical Tinkering"],
            2: ["Infuse Item (2)"],
            3: ["Alchemist Specialist"],
            4: ["Ability Score Improvement"],
            5: ["Alchemical Savant"],
            6: ["Infuse Item (3)"],
            7: ["Flash of Genius"],
            8: ["Ability Score Improvement"]
        }
    },
    "冠軍勇士": {
        hitDie: 10,
        primaryStat: "str",
        saves: ["str", "con"],
        features: {
            1: ["Fighting Style", "Second Wind"],
            2: ["Action Surge"],
            3: ["Improved Critical"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
            6: ["Ability Score Improvement"],
            7: ["Remarkable Athlete"],
            8: ["Ability Score Improvement"]
        }
    },
    "時空術士": {
        hitDie: 6,
        primaryStat: "int",
        saves: ["int", "wis"],
        features: {
            1: ["Temporal Awareness", "Chronal Shift"],
            2: ["Convergent Future"],
            4: ["Ability Score Improvement"],
            6: ["Momentary Stasis"],
            8: ["Ability Score Improvement"]
        }
    }
};

/**
 * Gets the XP required for the next level.
 * @param {number} level - Current Level
 * @returns {number} XP needed for next level
 */
export const getXpForNextLevel = (level) => {
    const xpTable = {
        1: 300,
        2: 900,
        3: 2700,
        4: 6500,
        5: 14000,
        6: 23000,
        7: 34000,
        8: 48000,
        9: 64000,
        10: 85000,
        11: 100000,
        12: 120000,
        13: 140000,
        14: 165000,
        15: 195000,
        16: 225000,
        17: 265000,
        18: 305000,
        19: 355000,
        20: 355000 // Cap
    };
    return xpTable[level] || 300;
};
