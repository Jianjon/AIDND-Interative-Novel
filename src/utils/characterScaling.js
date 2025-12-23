import { CLASS_PROGRESSION } from '../data/rules/class_progression.js';
import { SPELL_DATABASE } from '../data/rules/spells.js';

/**
 * Scale a character to a target level.
 * @param {Object} character - The character object to scale.
 * @param {number} targetLevel - The level to scale to (e.g., 3, 5, 8).
 * @returns {Object} - The scaled character object.
 */
export function scaleCharacter(character, targetLevel) {
    if (!targetLevel || (character.level && character.level >= targetLevel)) {
        return character;
    }

    // Create a deep copy to avoid mutating the original
    const newChar = JSON.parse(JSON.stringify(character));

    // Fallback for missing level
    if (!newChar.level) newChar.level = 1;

    const charClass = newChar.class;
    const progression = CLASS_PROGRESSION[charClass];

    if (!progression) {
        console.warn(`No progression rules found for class: ${charClass}`);
        return newChar;
    }

    // Calculate CON mod
    const con = newChar.baseStats.con || 10;
    const conMod = Math.floor((con - 10) / 2);
    const hitDie = progression.hitDie || 8;
    // Average hit die roll is (HitDie / 2) + 1
    const avgHpGain = Math.floor(hitDie / 2) + 1;

    // INITIALIZE HP IF MISSING (Standardize to Level 1 baseline)
    if (newChar.maxHp === undefined) {
        newChar.maxHp = hitDie + conMod;
        newChar.hp = newChar.maxHp;
    }

    // Scale from current level + 1 up to Target Level
    const currentLevel = newChar.level || 1;
    for (let lvl = currentLevel + 1; lvl <= targetLevel; lvl++) {
        // 1. Increase HP
        const hpGain = avgHpGain + conMod;
        newChar.maxHp += hpGain;
        newChar.hp = newChar.maxHp; // Heal to full

        const features = progression.features[lvl];
        if (features && features.length > 0) {
            features.forEach(feat => {
                // Check if this is a spell
                if (SPELL_DATABASE[feat]) {
                    if (!newChar.spells) newChar.spells = [];
                    if (!newChar.spells.includes(feat)) {
                        newChar.spells.push(feat);
                    }
                } else {
                    // It's a feat
                    if (!newChar.feats) newChar.feats = [];
                    if (!newChar.feats.includes(feat)) {
                        newChar.feats.push(feat);
                    }
                }
            });
        }

        // 3. Update Spell Slots (if applicable)
        if (progression.spellSlots && progression.spellSlots[lvl]) {
            newChar.slots = progression.spellSlots[lvl];
        }

        // 4. Scale Companion (if applicable)
        if (newChar.companion) {
            const comp = newChar.companion;
            // AC: +1 every 4 levels (at 4, 8, 12, 16)
            if (lvl % 4 === 0) comp.ac = (comp.ac || 10) + 1;

            // HP: Increase by 5 per character level (roughly)
            // Initial HP if missing
            if (comp.maxHp === undefined) {
                // Baseline: Start with something reasonable if not defined, or use character level
                comp.maxHp = (comp.maxHp || 20) + 5;
            } else {
                comp.maxHp += 5;
            }
            comp.hp = comp.maxHp;

            // Attacks: +1 hit bonus every 4 levels
            if (lvl % 4 === 0 && Array.isArray(comp.attacks)) {
                comp.attacks = comp.attacks.map(atk => ({
                    ...atk,
                    hitBonus: (atk.hitBonus || 0) + 1
                }));
            }
        }
    }

    // Update level to final target
    newChar.level = targetLevel;

    // Add extra items for higher levels
    // Add extra items for higher levels
    if (targetLevel >= 5) {
        // Gold
        if (typeof newChar.gold === 'number') newChar.gold += 500;
        else if (newChar.inventory && typeof newChar.inventory.gold === 'number') newChar.inventory.gold += 500;

        // Consumables
        if (Array.isArray(newChar.consumables)) newChar.consumables.push("強效治療藥水");
        else if (newChar.inventory && Array.isArray(newChar.inventory.consumables)) newChar.inventory.consumables.push("強效治療藥水");
    }
    if (targetLevel >= 8) {
        // Gold
        if (typeof newChar.gold === 'number') newChar.gold += 2000;
        else if (newChar.inventory && typeof newChar.inventory.gold === 'number') newChar.inventory.gold += 2000;

        // Consumables
        if (Array.isArray(newChar.consumables)) newChar.consumables.push("復活卷軸");
        else if (newChar.inventory && Array.isArray(newChar.inventory.consumables)) newChar.inventory.consumables.push("復活卷軸");
    }

    return newChar;
}
