
import { CLASS_PROGRESSION, getXpForNextLevel } from '../data/rules/class_progression';
import { RACE_TRAITS } from '../data/rules/race_traits';
import { WEAPON_DATABASE, CONSUMABLES, MAGIC_ITEMS } from '../data/rules/items';

/**
 * 🔒 STABLE CORE: CHARACTER LOGIC AGENT
 * This file implements the core D&D 5e rules engine for characters.
 * It handles stats, inventory, AC calculations, and modifiers.
 * 
 * DO NOT MODIFY WITHOUT EXPLICIT USER APPROVAL.
 * Any changes here will affect the foundational mechanics of the game.
 */

/**
 * CharacterAgent.js (Hybrid Architecture)
 * 
 * The "Body" of the character.
 * Handles deterministic calculations (AC, Attacks, Saves) based on 5E Rules.
 * AI ("The Brain") should query this agent for layout, not hallucinate stats.
 */
export class CharacterAgent {
    constructor(data) {
        // Core Identity
        this.id = data.id;
        this.name = data.name || "Unknown Hero";
        this.race = data.race || "Human"; // e.g., "Human" or "Elf (High Elf)"
        this.alignment = data.alignment || "Neutral";
        this.class = data.class || "Commoner"; // e.g., "Fighter"
        this.archetype = data.archetype || "Adventurer";
        this.controlMode = data.controlMode || 'manual';

        // Stats & Mechanics (Private Source of Truth)
        this.level = data.level || 1;
        this.baseStats = data.baseStats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
        this.classFeature = data.classFeature || "None";
        this.fightingStyle = data.fightingStyle || "Standard";

        // Lists
        // Ensure feats is an array. If empty, we can potentially populate defaults based on class/race in the future.
        // For now, respect provided data or default to empty array.
        this.feats = this._ensureArray(data.feats);
        this.skills = this._ensureArray(data.skills);
        // Lists - Handle structured or flat inventory
        if (data.inventory && !Array.isArray(data.inventory) && typeof data.inventory === 'object') {
            // Flatten structured inventory from preset
            this.inventory = [
                ...(data.inventory.equipment || []),
                ...(data.inventory.consumables || []),
                ...(data.inventory.magicItems || [])
            ];
            this.consumables = this._ensureArray(data.inventory.consumables);
            this.magicItems = this._ensureArray(data.inventory.magicItems);
            // Capture gold from structured inventory or top-level
            this.gold = data.gold !== undefined ? data.gold : (data.inventory.gold || 0);

            // Also explicitly set equipment references if needed, though usually inventory covers possession
            if (!data.equipment || data.equipment.length === 0) {
                this.equipment = data.inventory.equipment || [];
            } else {
                this.equipment = this._ensureArray(data.equipment);
            }
        } else {
            this.inventory = data.inventory ? this._ensureArray(data.inventory) : [];
            this.equipment = this._ensureArray(data.equipment);
            this.consumables = data.consumables ? this._ensureArray(data.consumables) : [];
            this.gold = data.gold || 0;
            // Fallback: If flattened inventory, we can't easily distinguish without a DB check, 
            // but new presets use structured data so this covers the user request.
        }

        // Spells & Magic (Critical Fix: Was missing!)
        this.spells = this._ensureArray(data.spells);
        this.slots = data.slots || {};

        // Dynamic State (Mutable via API)
        this.maxHp = this._calculateMaxHp(); // Enforce rule calculation
        this.hp = data.hp !== undefined ? data.hp : this.maxHp;
        this.xp = data.xp || 0;
        this.maxXp = this._calculateNextLevelXp();

        // Conditions & Death Saves
        this.conditions = data.conditions || []; // e.g. ["Prone", "Poisoned"]
        this.deathSaves = data.deathSaves || { successes: 0, failures: 0 };
        this.psych = data.psych || "正常";

        // Narrative Fluff
        this.personality = data.personality || "Stoic";
        this.background = data.background || "Mysterious";
        this.monologue = data.monologue || data.innerMonologue || "Ready.";
        this.bio = data.bio || "";
        this.avatarUrl = data.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${this.name}123&backgroundColor=b6e3f4`;

        // History
        this.growthHistory = data.growthHistory || [];

        // Companion System (Phase 3)
        // { name, type, hp, maxHp, ac, attacks: [{ name, hitBonus, damage }] }
        this.companion = data.companion || null;
    }

    /**
     * Gain XP Calculation
     * @param {number} amount 
     */
    // Relationship Management
    // Narrative Growth Tracking
    addNarrativeGrowth(text) {
        // This stores "memories" or "growth points" from the story.
        if (!this.narrativeHistory) this.narrativeHistory = [];
        this.narrativeHistory.push({
            timestamp: Date.now(),
            summary: text
        });
    }

    updateRelationship(targetName, value) {
        // Simple stub for now, or actual logic if needed.
        // In the future, this could track affinity with other characters/NPCs.
        if (!this.relationships) this.relationships = {};
        this.relationships[targetName] = (this.relationships[targetName] || 0) + value;
    }

    gainXp(amount) {
        this.xp = (this.xp || 0) + amount;
        // We do not auto-level here, as that requires UI choices.
        // We just track the number.
        return this.xp;
    }

    // ==========================================
    // 🧠 DERIVED STATS (The "Hard Code")
    // ==========================================

    /**
     * Proficiency Bonus based on Level (5e Table)
     */
    get proficiencyBonus() {
        return Math.floor((this.level - 1) / 4) + 2;
    }

    /**
     * Ability Modifiers (e.g., 16 STR -> +3)
     */
    get modifiers() {
        const mods = {};
        for (const [stat, value] of Object.entries(this.baseStats)) {
            mods[stat] = Math.floor((value - 10) / 2);
        }
        return mods;
    }

    /**
     * Armor Class (AC) Calculation
     * Considers Armor, Shield, Dex, and Unarmored Defense (Monk/Barbarian)
     */
    get ac() {
        let baseAC = 10 + this.modifiers.dex;
        let hasShield = this.equipment.some(i => i.includes("Shield"));

        // TODO: specific armor parsing from inventory if we had armor data
        // For now, simple class logic overrides
        if (this.class.includes("Monk")) {
            baseAC = 10 + this.modifiers.dex + this.modifiers.wis; // Unarmored Defense
        } else if (this.class.includes("Barbarian")) {
            baseAC = 10 + this.modifiers.dex + this.modifiers.con; // Unarmored Defense
        } else if (this.class.includes("Fighter") || this.class.includes("Paladin")) {
            baseAC = 16; // Heavy Armor assumption for simplicity
        }

        return baseAC + (hasShield ? 2 : 0);
    }

    /**
     * Passive Perception (10 + Wis Mod + Prof if skilled)
     */
    get passivePerception() {
        let prof = this.skills.includes("Perception") ? this.proficiencyBonus : 0;
        return 10 + this.modifiers.wis + prof;
    }

    /**
     * Spell Save DC
     * 8 + Prof + Casting Mod
     */
    get spellSaveDC() {
        const castingStat = this._getCastingStat();
        if (!castingStat) return null;
        return 8 + this.proficiencyBonus + this.modifiers[castingStat];
    }

    /**
     * Spell Attack Modifier
     * Prof + Casting Mod
     */
    get spellAttackMod() {
        const castingStat = this._getCastingStat();
        if (!castingStat) return null;
        return this.proficiencyBonus + this.modifiers[castingStat];
    }

    /**
     * Initiative
     * Dex Mod + Feat Bonuses (Alert)
     */
    get initiativeBonus() {
        let bonus = this.modifiers.dex;
        if (this.feats.includes("Alert")) bonus += 5;
        return bonus;
    }

    // ==========================================
    // ⚔️ COMBAT CALCULATIONS
    // ==========================================

    /**
     * Returns a list of available attacks with calculated numbers.
     * AI should use this to describe the action, not invent numbers.
     */
    getActions() {
        const actions = [];
        const prof = this.proficiencyBonus;
        const mods = this.modifiers;

        this.inventory.forEach(item => {
            // Check if item is a weapon in our database
            // Simple string matching for now (e.g. "Longsword +1")
            const itemStr = typeof item === 'string' ? item : (item.name || "");
            if (!itemStr) return;

            const baseName = Object.keys(WEAPON_DATABASE).find(k => itemStr.includes(k));
            if (baseName) {
                const weaponData = WEAPON_DATABASE[baseName];
                const isFinesse = weaponData.properties.includes("Finesse");
                const isRanged = weaponData.properties.some(p => p.startsWith("Ammunition") || p.startsWith("Thrown")); // Simplified

                // Stat Selection
                let useStat = 'str';
                if (isRanged) useStat = 'dex';
                if (isFinesse && mods.dex > mods.str) useStat = 'dex';

                const hitBonus = mods[useStat] + prof; // Assume proficiency
                const damageDesc = `${weaponData.dmg} + ${mods[useStat]}`;

                actions.push({
                    type: "WEAPON_ATTACK",
                    name: item,
                    hitBonus: hitBonus,
                    damage: damageDesc, // e.g. "1d8 Slashing + 3"
                    range: isRanged ? "Ranged" : "Melee"
                });
            }
        });

        // Cantrips / Spells (Simplified)
        if (this._getCastingStat()) {
            actions.push({
                type: "SPELL_ATTACK",
                name: "Cantrip (Fire Bolt / Eldritch Blast)",
                hitBonus: this.spellAttackMod,
                damage: `Based on Level`
            });
        }

        return actions;
    }

    // ==========================================
    // 🛠️ INTERNAL HELPERS
    // ==========================================

    _getCastingStat() {
        if (this.class.includes("Wizard") || this.class.includes("Rogue") || this.class.includes("法師") || this.class.includes("盜賊") || this.class.includes("遊蕩者") || this.class.includes("奇物師") || this.class.includes("鍊金術士") || this.class.includes("調查員") || this.class.includes("女巫")) return "int"; // Arcane Trickster / Int based
        if (this.class.includes("Cleric") || this.class.includes("Druid") || this.class.includes("Ranger") || this.class.includes("Monk") || this.class.includes("牧師") || this.class.includes("德魯伊") || this.class.includes("遊俠") || this.class.includes("武僧")) return "wis";
        if (this.class.includes("Paladin") || this.class.includes("Bard") || this.class.includes("Sorcerer") || this.class.includes("Warlock") || this.class.includes("聖武士") || this.class.includes("吟遊詩人") || this.class.includes("術士") || this.class.includes("邪術師") || this.class.includes("召喚師") || this.class.includes("先知")) return "cha";
        return null;
    }

    _calculateMaxHp() {
        const conMod = Math.floor(((this.baseStats.con || 10) - 10) / 2);

        // Map English class names to Chinese keys in CLASS_PROGRESSION
        const CLASS_MAP = {
            "Fighter": "戰士", "Wizard": "法師", "Cleric": "牧師", "Rogue": "遊蕩者",
            "Barbarian": "野蠻人", "Bard": "吟遊詩人", "Druid": "德魯伊",
            "Monk": "武僧", "Paladin": "聖武士", "Ranger": "遊俠",
            "Sorcerer": "術士", "Warlock": "邪術師"
        };

        // Attempt to find class key
        let hitDie = 8; // Default
        const className = this.class;

        // 0. Direct Chinese Match (New Priority)
        if (CLASS_PROGRESSION[className]) {
            hitDie = CLASS_PROGRESSION[className].hitDie;
        }
        // 1. Direct English Match
        else if (CLASS_MAP[className]) {
            hitDie = CLASS_PROGRESSION[CLASS_MAP[className]].hitDie;
        }
        // 2. Partial Match (English)
        else {
            const foundKey = Object.keys(CLASS_MAP).find(k => className.includes(k));
            if (foundKey) {
                hitDie = CLASS_PROGRESSION[CLASS_MAP[foundKey]].hitDie;
            }
            // 3. Partial Match (Chinese Logic - check values of map)
            else {
                const foundCN = Object.values(CLASS_MAP).find(k => className.includes(k));
                if (foundCN && CLASS_PROGRESSION[foundCN]) {
                    hitDie = CLASS_PROGRESSION[foundCN].hitDie;
                }
            }
        }

        // Level 1: Max Die + Mod
        // Subsequent: Avg (Die/2 + 1) + Mod
        return (hitDie + conMod) + ((this.level - 1) * (Math.floor(hitDie / 2) + 1 + conMod));
    }

    _calculateNextLevelXp() {
        return getXpForNextLevel(this.level);
    }

    _ensureArray(input) {
        if (!input) return [];
        if (Array.isArray(input)) return input;
        if (typeof input === 'string' && input.includes(',')) return input.split(',').map(s => s.trim());
        return [input];
    }

    // ==========================================
    // 📤 DATA EXPORT
    // ==========================================

    getCardData() {
        return {
            id: this.id,
            name: this.name,
            race: this.race,
            class: this.class,
            level: this.level,
            hp: this.hp,
            maxHp: this.maxHp,
            ac: this.ac, // Computational
            avatar: this.avatarUrl,
            psych: this.psych,
            pendingAction: this.pendingAction
        };
    }

    getFullSheet() {
        return {
            ...this.getCardData(),
            stats: this.baseStats,
            modifiers: this.modifiers,
            skills: this.skills,
            feats: this.feats,
            inventory: this.inventory,
            derived: {
                proficiency: this.proficiencyBonus,
                initiative: this.initiativeBonus,
                passivePerception: this.passivePerception,
                spellDC: this.spellSaveDC
            },
            actions: this.getActions(),
            companion: this.companion,
            growthHistory: this.growthHistory,
            // Narrative Fields
            personality: this.personality,
            monologue: this.monologue,
            background: this.background,
            bio: this.bio
        };
    }
}
