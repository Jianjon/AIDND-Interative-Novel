/**
 * D&D 5E Item Database (SRD Subset)
 * Includes Weapons, Consumables, and Magic Items.
 */

export const WEAPON_DATABASE = {
    // === SIMPLE MELEE ===
    "Club": { dmg: "1d4 Bludgeoning", properties: ["Light"] },
    "Dagger": { dmg: "1d4 Piercing", properties: ["Finesse", "Light", "Thrown (20/60)"] },
    "Greatclub": { dmg: "1d8 Bludgeoning", properties: ["Two-Handed"] },
    "Handaxe": { dmg: "1d6 Slashing", properties: ["Light", "Thrown (20/60)"] },
    "Javelin": { dmg: "1d6 Piercing", properties: ["Thrown (30/120)"] },
    "Light Hammer": { dmg: "1d4 Bludgeoning", properties: ["Light", "Thrown (20/60)"] },
    "Mace": { dmg: "1d6 Bludgeoning", properties: [] },
    "Quarterstaff": { dmg: "1d6 Bludgeoning", properties: ["Versatile (1d8)"] },
    "Spear": { dmg: "1d6 Piercing", properties: ["Thrown (20/60)", "Versatile (1d8)"] },

    // === SIMPLE RANGED ===
    "Light Crossbow": { dmg: "1d8 Piercing", properties: ["Ammunition (80/320)", "Loading", "Two-Handed"] },
    "Shortbow": { dmg: "1d6 Piercing", properties: ["Ammunition (80/320)", "Two-Handed"] },

    // === MARTIAL MELEE ===
    "Battleaxe": { dmg: "1d8 Slashing", properties: ["Versatile (1d10)"] },
    "Greataxe": { dmg: "1d12 Slashing", properties: ["Heavy", "Two-Handed"] },
    "Greatsword": { dmg: "2d6 Slashing", properties: ["Heavy", "Two-Handed"] },
    "Halberd": { dmg: "1d10 Slashing", properties: ["Heavy", "Reach", "Two-Handed"] },
    "Longsword": { dmg: "1d8 Slashing", properties: ["Versatile (1d10)"] },
    "Maul": { dmg: "2d6 Bludgeoning", properties: ["Heavy", "Two-Handed"] },
    "Morningstar": { dmg: "1d8 Piercing", properties: [] },
    "Rapier": { dmg: "1d8 Piercing", properties: ["Finesse"] },
    "Scimitar": { dmg: "1d6 Slashing", properties: ["Finesse", "Light"] },
    "Shortsword": { dmg: "1d6 Piercing", properties: ["Finesse", "Light"] },
    "Trident": { dmg: "1d6 Piercing", properties: ["Thrown (20/60)", "Versatile (1d8)"] },
    "Warhammer": { dmg: "1d8 Bludgeoning", properties: ["Versatile (1d10)"] },

    // === MARTIAL RANGED ===
    "Hand Crossbow": { dmg: "1d6 Piercing", properties: ["Ammunition (30/120)", "Light", "Loading"] },
    "Heavy Crossbow": { dmg: "1d10 Piercing", properties: ["Ammunition (100/400)", "Heavy", "Loading", "Two-Handed"] },
    "Longbow": { dmg: "1d8 Piercing", properties: ["Ammunition (150/600)", "Heavy", "Two-Handed"] }
};

export const CONSUMABLES = {
    "Potion of Healing": { effect: "Heal 2d4+2 HP (Action to drink/administer)", cost: "50gp" },
    "Potion of Greater Healing": { effect: "Heal 4d4+4 HP", cost: "150gp" },
    "Potion of Superior Healing": { effect: "Heal 8d4+8 HP", cost: "450gp" },
    "Potion of Supreme Healing": { effect: "Heal 10d4+20 HP", cost: "1350gp" },
    "Potion of Invisibility": { effect: "Invisible for 1 hour (Concentration not required)", cost: "Rare" },
    "Potion of Speed": { effect: "Gain effects of Haste spell for 1 minute (No lethargy)", cost: "Very Rare" },
    "Scroll of Revivify": { effect: "Cast Revivify without slot (Material ignored)", cost: "Rare" }
};

export const MAGIC_ITEMS = {
    "Bag of Holding": { type: "Wondrous Item", effect: "Holds 500 lbs, weighs 15 lbs. Retrieve item as Action." },
    "Cloak of Protection": { type: "Wondrous Item", effect: "+1 AC and Saving Throws (Requires Attunement)." },
    "Boots of Elvenkind": { type: "Wondrous Item", effect: "Advantage on Stealth (Move silently)." },
    "Gauntlets of Ogre Power": { type: "Wondrous Item", effect: "Set Str to 19 (Requires Attunement)." },
    "Headband of Intellect": { type: "Wondrous Item", effect: "Set Int to 19 (Requires Attunement)." },
    "+1 Weapon": { type: "Weapon", effect: "+1 to Attack and Damage rolls. Magic damage." },
    "+2 Weapon": { type: "Weapon", effect: "+2 to Attack and Damage rolls." },
    "+3 Weapon": { type: "Weapon", effect: "+3 to Attack and Damage rolls." },
    "Flame Tongue": { type: "Weapon (Any Sword)", effect: "Bonus action to ignite. +2d6 Fire damage on hit. Sheds light." },
    "Vorpal Sword": { type: "Weapon (Slashing)", effect: "+3 Weapon. On Nat 20, decapitates enemy (if applicable) or deals 6d8 extra dmg." }
};
