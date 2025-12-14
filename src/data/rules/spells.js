/**
 * D&D 5E Spell Database (SRD Subset)
 * Includes essential Cantrips, Leveled Spells, and Warlock Invocations.
 * This ensures the AI uses correct damage dice and rules.
 */

export const SPELL_DATABASE = {
    // === CANTRIPS (LVL 0) ===
    "Eldritch Blast": { level: 0, school: "Evocation", castTime: "1 Action", range: "120ft", components: "V, S", duration: "Instant", effect: "1d10 Force dmg. Beams increase at Lvl 5, 11, 17." },
    "Vicious Mockery": { level: 0, school: "Enchantment", castTime: "1 Action", range: "60ft", components: "V", duration: "Instant", effect: "1d4 Psychic dmg + Disadvantage on next attack (Wis Save)." },
    "Sacred Flame": { level: 0, school: "Evocation", castTime: "1 Action", range: "60ft", components: "V, S", duration: "Instant", effect: "1d8 Radiant dmg (Dex Save ignores cover)." },
    "Fire Bolt": { level: 0, school: "Evocation", castTime: "1 Action", range: "120ft", components: "V, S", duration: "Instant", effect: "1d10 Fire dmg." },
    "Mage Hand": { level: 0, school: "Conjuration", castTime: "1 Action", range: "30ft", components: "V, S", duration: "1 Min", effect: "Spectral floating hand manipulates objects." },
    "Guidance": { level: 0, school: "Divination", castTime: "1 Action", range: "Touch", components: "V, S", duration: "Concentration (1 Min)", effect: "+1d4 on one Ability Check." },
    "Shillelagh": { level: 0, school: "Transmutation", castTime: "Bonus Action", range: "Touch", components: "V, S, M", duration: "1 Min", effect: "Staff becomes magic, 1d8+Wis dmg." },

    // === LEVEL 1 ===
    "Cure Wounds": { level: 1, school: "Evocation", castTime: "1 Action", range: "Touch", components: "V, S", duration: "Instant", effect: "Heal 1d8 + Spell Mod." },
    "Healing Word": { level: 1, school: "Evocation", castTime: "Bonus Action", range: "60ft", components: "V", duration: "Instant", effect: "Heal 1d4 + Spell Mod." },
    "Magic Missile": { level: 1, school: "Evocation", castTime: "1 Action", range: "120ft", components: "V, S", duration: "Instant", effect: "3 darts, 1d4+1 Force dmg each. Auto-hit." },
    "Shield": { level: 1, school: "Abjuration", castTime: "Reaction", range: "Self", components: "V, S", duration: "1 Round", effect: "+5 AC until start of next turn. Nullifies Magic Missile." },
    "Guiding Bolt": { level: 1, school: "Evocation", castTime: "1 Action", range: "120ft", components: "V, S", duration: "1 Round", effect: "4d6 Radiant. Next attack on target has Advantage." },
    "Hex": { level: 1, school: "Enchantment", castTime: "Bonus Action", range: "90ft", components: "V, S, M", duration: "Concentration (1 Hr)", effect: "+1d6 Necrotic dmg on hit. Disadv on chosen Ability Check." },
    // Class Specific Iconic (Lvl 1)
    "Bless": { level: 1, school: "Enchantment", castTime: "1 Action", range: "30ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "+1d4 to Attack Rolls and Saves for 3 creatures." },
    "Bane": { level: 1, school: "Enchantment", castTime: "1 Action", range: "30ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "-1d4 to Attack Rolls and Saves for 3 creatures (Cha Save)." },
    "Hunter's Mark": { level: 1, school: "Divination", castTime: "Bonus Action", range: "90ft", components: "V", duration: "Concentration (1 Hr)", effect: "+1d6 dmg to target. Adv on Tracking." },
    "Faerie Fire": { level: 1, school: "Evocation", castTime: "1 Action", range: "60ft", components: "V", duration: "Concentration (1 Min)", effect: "Objects in 20ft cube glow. Adv on attacks vs them. No invisibility." },
    "Entangle": { level: 1, school: "Conjuration", castTime: "1 Action", range: "90ft", components: "V, S", duration: "Concentration (1 Min)", effect: "Restrain creatures in 20ft square (Str Save)." },
    "Dissonant Whispers": { level: 1, school: "Enchantment", castTime: "1 Action", range: "60ft", components: "V", duration: "Instant", effect: "3d6 Psychic dmg + Flee reaction (Wis Save half)." },

    // === LEVEL 2 ===
    "Misty Step": { level: 2, school: "Conjuration", castTime: "Bonus Action", range: "Self", components: "V", duration: "Instant", effect: "Teleport 30ft to visible spot." },
    "Hold Person": { level: 2, school: "Enchantment", castTime: "1 Action", range: "60ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "Humanoid Paralyzed (Wis Save)." },
    "Spiritual Weapon": { level: 2, school: "Evocation", castTime: "Bonus Action", range: "60ft", components: "V, S", duration: "1 Min", effect: "Spectral weapon 1d8 + Mod Force dmg. Bonus action to move/attack." },
    "Heat Metal": { level: 2, school: "Transmutation", castTime: "1 Action", range: "60ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "2d8 Fire dmg to creature holding metal object. Disadv on attacks/checks if held." },
    "Pass without Trace": { level: 2, school: "Abjuration", castTime: "1 Action", range: "Self", components: "V, S, M", duration: "Concentration (1 Hr)", effect: "+10 Stealth for group within 30ft." },
    "Moonbeam": { level: 2, school: "Evocation", castTime: "1 Action", range: "120ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "2d10 Radiant dmg in 5ft cylinder (Con Save). Shapechangers revert." },
    "Find Steed": { level: 2, school: "Conjuration", castTime: "10 Min", range: "30ft", components: "V, S", duration: "Instant", effect: "Summon a spirit mount (Warhorse, Elk, etc.)." },

    // === LEVEL 3 ===
    "Fireball": { level: 3, school: "Evocation", castTime: "1 Action", range: "150ft", components: "V, S, M", duration: "Instant", effect: "8d6 Fire dmg in 20ft radius (Dex Save half)." },
    "Revivify": { level: 3, school: "Necromancy", castTime: "1 Action", range: "Touch", components: "V, S, M (300g Diamond)", duration: "Instant", effect: "Revive creature dead < 1 min with 1 HP." },
    "Spirit Guardians": { level: 3, school: "Conjuration", castTime: "1 Action", range: "Self (15ft)", components: "V, S, M", duration: "Concentration (10 Min)", effect: "3d8 Radiant/Necrotic dmg per turn (Wis Save half). Difficult Terrain." },
    "Haste": { level: 3, school: "Transmutation", castTime: "1 Action", range: "30ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "+2 AC, Double Speed, Extra Action (Attack/Dash/Disengage/Hide/Use)." },
    "Counterspell": { level: 3, school: "Abjuration", castTime: "Reaction", range: "60ft", components: "S", duration: "Instant", effect: "Interrupt spell cast. Auto-fail Lvl 3 or lower. Check vs higher." },
    "Call Lightning": { level: 3, school: "Conjuration", castTime: "1 Action", range: "120ft", components: "V, S", duration: "Concentration (10 Min)", effect: "3d10 Lightning dmg in 5ft radius (Dex Save). Call down bold each turn." },
    "Aura of Vitality": { level: 3, school: "Evocation", castTime: "1 Action", range: "Self (30ft)", components: "V", duration: "Concentration (1 Min)", effect: "Bonus Action to heal 2d6 to one creature within aura." },

    // === LEVEL 4 ===
    "Polymorph": { level: 4, school: "Transmutation", castTime: "1 Action", range: "60ft", components: "V, S, M", duration: "Concentration (1 Hr)", effect: "Transform creature into Beast (CR <= Level/Rating)." },
    "Dimension Door": { level: 4, school: "Conjuration", castTime: "1 Action", range: "500ft", components: "V", duration: "Instant", effect: "Teleport self and one willing creature to spot within range." },
    "Wall of Fire": { level: 4, school: "Evocation", castTime: "1 Action", range: "120ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "5d8 Fire dmg (Dex save half). Blocks vision." },
    "Banishment": { level: 4, school: "Abjuration", castTime: "1 Action", range: "60ft", components: "V, S, M", duration: "Concentration (1 Min)", effect: "Banish target to harmless demiplane (Cha save)." },

    // === LEVEL 5 ===
    "Greater Restoration": { level: 5, school: "Abjuration", castTime: "1 Action", range: "Touch", components: "V, S, M", duration: "Instant", effect: "End Charm/Petrify/Curse/Stat Reduction/Max HP reduction." },
    "Cone of Cold": { level: 5, school: "Evocation", castTime: "1 Action", range: "Self (60ft Cone)", components: "V, S, M", duration: "Instant", effect: "8d8 Cold dmg (Con save half)." },
    "Mass Cure Wounds": { level: 5, school: "Evocation", castTime: "1 Action", range: "60ft", components: "V, S", duration: "Instant", effect: "Heal 3d8+Mod to 6 creatures in 30ft sphere." },
    "Raise Dead": { level: 5, school: "Necromancy", castTime: "1 Hour", range: "Touch", components: "V, S, M (500g Diamond)", duration: "Instant", effect: "Revive creature dead < 10 days. -4 penalty to rolls initially." },

    // === LEVEL 6 ===
    "Heal": { level: 6, school: "Evocation", castTime: "1 Action", range: "60ft", components: "V, S", duration: "Instant", effect: "Heal 70 HP. Cure Blind/Deaf/Disease." },
    "Disintegrate": { level: 6, school: "Transmutation", castTime: "1 Action", range: "60ft", components: "V, S, M", duration: "Instant", effect: "10d6+40 Force dmg (Dex save negates). Dusts target at 0 HP." },
    "Sunbeam": { level: 6, school: "Evocation", castTime: "1 Action", range: "Self (60ft Line)", components: "V, S, M", duration: "Concentration (1 Min)", effect: "6d8 Radiant dmg + Blinded (Con save half/negate each turn). Beam persists." },

    // === LEVEL 7 ===
    "Teleport": { level: 7, school: "Conjuration", castTime: "1 Action", range: "10ft", components: "V", duration: "Instant", effect: "Instantly transport 8 creatures to any known location (Mishap chance)." },
    "Fire Storm": { level: 7, school: "Evocation", castTime: "1 Action", range: "150ft", components: "V, S", duration: "Instant", effect: "7d10 Fire dmg in ten 10ft cubes (Dex save half)." },
    "Resurrection": { level: 7, school: "Necromancy", castTime: "1 Hour", range: "Touch", components: "V, S, M (1000g Diamond)", duration: "Instant", effect: "Revive creature dead < 100 years. Restores all parts." },

    // === LEVEL 8 ===
    "Sunburst": { level: 8, school: "Evocation", castTime: "1 Action", range: "150ft", components: "V, S, M", duration: "Instant", effect: "12d6 Radiant dmg + Blinded in 60ft radius (Con save)." },
    "Dominate Monster": { level: 8, school: "Enchantment", castTime: "1 Action", range: "60ft", components: "V, S", duration: "Concentration (1 Hour)", effect: "Control any creature (Wis save)." },
    "Power Word Stun": { level: 8, school: "Enchantment", castTime: "1 Action", range: "60ft", components: "V", duration: "Instant", effect: "Stun target with < 150 HP automatically." },

    // === LEVEL 9 ===
    "Wish": { level: 9, school: "Conjuration", castTime: "1 Action", range: "Self", components: "V", duration: "Instant", effect: "Alter reality. Duplicate any 8th lvl spell or create effect." },
    "Meteor Swarm": { level: 9, school: "Evocation", castTime: "1 Action", range: "1 Mile", components: "V, S", duration: "Instant", effect: "40d6 total dmg (20d6 Fire + 20d6 Bludgeoning) in four 40ft radii." },
    "Power Word Kill": { level: 9, school: "Enchantment", castTime: "1 Action", range: "60ft", components: "V", duration: "Instant", effect: "Instantly kill target with < 100 HP. No save." },
    "Time Stop": { level: 9, school: "Transmutation", castTime: "1 Action", range: "Self", components: "V", duration: "Instant", effect: "Take 1d4+1 turns in a row. Ends if you affect another creature." },

    // === FEATURES & ABILITIES ===
    "Stunning Strike": { level: 0, school: "Monk Feature", castTime: "Free", range: "Melee", duration: "1 Round", effect: "Spend 1 Ki. Con Save or Stunned until end of next turn." },
    "Divine Smite": { level: 0, school: "Paladin Feature", castTime: "Free", range: "Melee", duration: "Instant", effect: "Spend slot. 2d8 Radiant + 1d8 per level above 1st (+1d8 vs Undead/Fiend)." },
};

export const WARLOCK_INVOCATIONS = {
    "Agonizing Blast": { req: "Eldritch Blast", effect: "Add Cha Mod to Eldritch Blast damage." },
    "Armor of Shadows": { req: "None", effect: "Cast Mage Armor at will (Self only)." },
    "Beast Speech": { req: "None", effect: "Cast Speak with Animals at will." },
    "Book of Ancient Secrets": { req: "Pact of the Tome", effect: "Record rituals from any class." },
    "Devil's Sight": { req: "None", effect: "See in magical darkness up to 120ft." },
    "Eldritch Sight": { req: "None", effect: "Cast Detect Magic at will." },
    "Eyes of the Rune Keeper": { req: "None", effect: "Read all writing." },
    "Fiendish Vigor": { req: "None", effect: "Cast False Life on self at will (1st level)." },
    "Mask of Many Faces": { req: "None", effect: "Cast Disguise Self at will." },
    "Repelling Blast": { req: "Eldritch Blast", effect: "Eldritch Blast pushes target 10ft away." },
    "Thirsting Blade": { req: "5th Level, Pact of the Blade", effect: "Attack twice with Pact Weapon." }
};
