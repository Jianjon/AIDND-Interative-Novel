
import { CLASS_PROGRESSION } from '../data/rules/class_progression.js';

/**
 * Scale a character to a target level.
 * @param {Object} character - The character object to scale.
 * @param {number} targetLevel - The level to scale to (e.g., 3, 5, 8).
 * @returns {Object} - The scaled character object.
 */
export function scaleCharacter(character, targetLevel) {
    if (!targetLevel || targetLevel <= 1) return character;

    // Create a deep copy to avoid mutating the original
    const newChar = JSON.parse(JSON.stringify(character));
    const charClass = newChar.class;
    const progression = CLASS_PROGRESSION[charClass];

    if (!progression) {
        console.warn(`No progression rules found for class: ${charClass}`);
        return newChar;
    }

    // Calculate CON mod
    const con = newChar.baseStats.con;
    const conMod = Math.floor((con - 10) / 2);
    const hitDieAcross = progression.hitDie;
    // Average hit die roll is (HitDie / 2) + 1
    const avgHpGain = (hitDieAcross / 2) + 1;

    // Scale from Level 2 up to Target Level
    for (let lvl = 2; lvl <= targetLevel; lvl++) {
        // 1. Increase HP
        const hpGain = avgHpGain + conMod;
        newChar.maxHp += hpGain;
        newChar.hp = newChar.maxHp; // Heal to full

        // 2. Add Class Features
        const features = progression.features[lvl];
        if (features && features.length > 0) {
            newChar.feats.push(...features);
        }

        // 3. Update Spell Slots (if applicable)
        if (progression.spellSlots) {
            newChar.slots = progression.spellSlots[lvl];
        }
    }

    // Add extra items for higher levels
    if (targetLevel >= 5) {
        newChar.inventory.gold += 500;
        newChar.inventory.consumables.push("強效治療藥水");
    }
    if (targetLevel >= 8) {
        newChar.inventory.gold += 2000;
        newChar.inventory.consumables.push("復活卷軸");
    }

    console.log(`Scaled ${newChar.name} to Lv${targetLevel} (HP: ${newChar.hp})`);
    return newChar;
}
