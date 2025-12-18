/**
 * D&D 5E Action Economy Rules
 * Defines what can be done during a turn to prevent AI from allowing too many actions.
 */

// Core Turn Structure
export const TURN_STRUCTURE = {
    movement: "Up to your Speed (can be split before/after actions)",
    action: "1 per turn (Attack, Cast Spell, Dash, etc.)",
    bonusAction: "1 per turn (if you have a feature that grants one)",
    reaction: "1 per round (triggers outside your turn)",
    freeAction: "1 object interaction + brief speech",
    notes: [
        "You can voluntarily give up any of these",
        "Extra Attack is part of the Attack action, not separate actions",
        "Bonus actions must come from a specific feature (not free)"
    ]
};

// Standard Actions (PHB p.192)
export const STANDARD_ACTIONS = {
    "Attack": {
        desc: "攻擊",
        details: "Make melee or ranged attack(s). Extra Attack feature grants additional attacks within this action.",
        example: "Fighter with Extra Attack: 2 attacks (not 2 actions)"
    },
    "Cast a Spell": {
        desc: "施法",
        details: "Cast a spell with casting time of 1 action.",
        notes: "If you cast a bonus action spell, you can only cast cantrips with your action."
    },
    "Dash": {
        desc: "衝刺",
        details: "Gain extra movement equal to your Speed for this turn.",
        example: "Speed 30ft → Move 60ft total this turn"
    },
    "Disengage": {
        desc: "脫離",
        details: "Your movement doesn't provoke opportunity attacks for rest of turn."
    },
    "Dodge": {
        desc: "閃避",
        details: "Attacks against you have Disadvantage. Dex saves have Advantage. Lost if incapacitated or Speed 0."
    },
    "Help": {
        desc: "幫助",
        details: "Give ally Advantage on next ability check or attack roll (within 5ft of target)."
    },
    "Hide": {
        desc: "躲藏",
        details: "Make Stealth check. Must be unseen/in cover. If succeed, attacks have Advantage and target can't target you with spells requiring sight."
    },
    "Ready": {
        desc: "準備",
        details: "Prepare an action to trigger later. Uses your Reaction when triggered. Spells held require Concentration."
    },
    "Search": {
        desc: "搜索",
        details: "Make Perception or Investigation check to find something."
    },
    "Use an Object": {
        desc: "使用物品",
        details: "Interact with an object that requires action (drink potion, activate magic item)."
    }
};

// Bonus Actions (Must have a feature that grants it)
export const BONUS_ACTIONS = {
    "Off-hand Attack (Two-Weapon Fighting)": {
        prereq: "Attacked with light melee weapon",
        effect: "Attack with different light weapon in other hand. No ability mod to damage (unless negative or have Fighting Style)."
    },
    "Cunning Action (Rogue)": {
        prereq: "Rogue class feature",
        effect: "Dash, Disengage, or Hide as bonus action."
    },
    "Step of the Wind (Monk)": {
        prereq: "Monk class feature, 1 Ki",
        effect: "Dash or Disengage as bonus action, jump distance doubled."
    },
    "Rage (Barbarian)": {
        prereq: "Barbarian class feature",
        effect: "Enter rage. Gain resistance to B/P/S, bonus damage, advantage on Str checks/saves."
    },
    "Bonus Action Spells": {
        prereq: "Spell with casting time of 1 bonus action",
        effect: "Cast the spell. Cannot cast non-cantrip with action this turn."
    },
    "Command Companion (Ranger)": {
        prereq: "Beast Master feature",
        effect: "Direct your beast companion to take action."
    }
};

// Reactions (1 per round, not per turn)
export const REACTIONS = {
    "Opportunity Attack": {
        trigger: "Hostile creature you can see moves out of your reach",
        effect: "Make one melee attack against them. Uses your reaction.",
        notes: "Doesn't trigger if target Disengages or teleports"
    },
    "Ready Action Trigger": {
        trigger: "Your specified trigger occurs",
        effect: "Take your readied action (or lose it)"
    },
    "Shield (Spell)": {
        trigger: "You are hit by an attack or targeted by Magic Missile",
        effect: "+5 AC until start of next turn, including against triggering attack"
    },
    "Counterspell": {
        trigger: "See a creature within 60ft casting a spell",
        effect: "Attempt to interrupt the spell"
    }
};

// Free Actions / Object Interactions (1 per turn without using action)
export const FREE_INTERACTIONS = [
    "Draw or sheathe ONE weapon",
    "Open or close a door",
    "Pick up a dropped item",
    "Retrieve stored object",
    "Hand item to ally",
    "Speak a few sentences",
    "Drop an item (no cost)",
    "Let go of a grapple (no cost)"
];

// Common Errors to Avoid
export const ACTION_ECONOMY_ERRORS = [
    "❌ Taking multiple Attack actions (Extra Attack is within ONE Attack action)",
    "❌ Using bonus action without a feature that grants it",
    "❌ Casting two non-cantrip spells in one turn",
    "❌ Taking two reactions before your next turn",
    "❌ Moving more than Speed without Dash",
    "❌ Drawing/sheathing multiple weapons without action",
    "❌ Bonus action spell + action spell (action must be cantrip only)"
];
