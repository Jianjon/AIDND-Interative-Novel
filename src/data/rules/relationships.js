
import { getSynergyScore } from '../mbtiCompatibility';

// 0-100 Scale
export const RELATIONSHIP_TIERS = [
    { threshold: 90, id: 'bonded', label: "誓約之交 (Bonded)", icon: "💍", desc: "生死與共的羈絆" },
    { threshold: 70, id: 'trusted', label: "摯友 (Trusted)", icon: "🤝", desc: "值得信賴的夥伴" },
    { threshold: 50, id: 'friendly', label: "友好 (Friendly)", icon: "😊", desc: "愉快的合作關係" },
    { threshold: 30, id: 'neutral', label: "中立 (Neutral)", icon: "😐", desc: "單純的利益關係" },
    { threshold: 10, id: 'cold', label: "冷淡 (Cold)", icon: "😒", desc: "互不信任" },
    { threshold: 0, id: 'hostile', label: "敵對 (Hostile)", icon: "😡", desc: "水火不容" }
];

export function getRelationshipTier(value) {
    // Determine tier based on value (descending check)
    if (value >= 90) return RELATIONSHIP_TIERS[0];
    if (value >= 70) return RELATIONSHIP_TIERS[1];
    if (value >= 50) return RELATIONSHIP_TIERS[2];
    if (value >= 30) return RELATIONSHIP_TIERS[3];
    if (value >= 10) return RELATIONSHIP_TIERS[4];
    return RELATIONSHIP_TIERS[5];
}

// Alignment Compatibility Matrix
const ALIGNMENT_AXIS = {
    'LG': { l: 1, g: 1 }, 'NG': { l: 0, g: 1 }, 'CG': { l: -1, g: 1 },
    'LN': { l: 1, g: 0 }, 'TN': { l: 0, g: 0 }, 'CN': { l: -1, g: 0 },
    'LE': { l: 1, g: -1 }, 'NE': { l: 0, g: -1 }, 'CE': { l: -1, g: -1 }
};

// Map Chinese names to Keys
const ALIGNMENT_MAP = {
    '守序善良': 'LG', '中立善良': 'NG', '混亂善良': 'CG',
    '守序中立': 'LN', '絕對中立': 'TN', '混亂中立': 'CN',
    '守序邪惡': 'LE', '中立邪惡': 'NE', '混亂邪惡': 'CE',
    // English Fallback
    'Lawful Good': 'LG', 'Neutral Good': 'NG', 'Chaotic Good': 'CG',
    'Lawful Neutral': 'LN', 'True Neutral': 'TN', 'Chaotic Neutral': 'CN',
    'Lawful Evil': 'LE', 'Neutral Evil': 'NE', 'Chaotic Evil': 'CE'
};

export function calculateInitialAffinity(charA, charB) {
    let base = 50;

    // 1. Alignment Check
    const alignA = ALIGNMENT_MAP[charA.alignment] || 'TN';
    const alignB = ALIGNMENT_MAP[charB.alignment] || 'TN';
    const axisA = ALIGNMENT_AXIS[alignA] || ALIGNMENT_AXIS['TN'];
    const axisB = ALIGNMENT_AXIS[alignB] || ALIGNMENT_AXIS['TN'];

    // Calculate distance
    const distL = Math.abs(axisA.l - axisB.l); // 0, 1, or 2
    const distG = Math.abs(axisA.g - axisB.g); // 0, 1, or 2
    const totalDist = distL + distG; // Max 4 (LG vs CE)

    // Adjust Base
    // Distance 0 (Same): +10
    // Distance 1 (Adjacent): +5
    // Distance 2: 0
    // Distance 3: -5
    // Distance 4 (Opposite): -10
    if (totalDist === 0) base += 10;
    else if (totalDist === 1) base += 5;
    else if (totalDist === 3) base -= 5;
    else if (totalDist === 4) base -= 10;

    // 2. MBTI Synergy
    const mbtiA = charA.mbti || 'ISTJ';
    const mbtiB = charB.mbti || 'ISTJ';
    const synergy = getSynergyScore(mbtiA, mbtiB); // 1-5

    // Synergy 5: +10, 4: +5, 3: 0, 2: -5, 1: -10
    if (synergy === 5) base += 10;
    else if (synergy === 4) base += 5;
    else if (synergy === 2) base -= 5;
    else if (synergy === 1) base -= 10;

    // 3. Race Bias (Simple Examples)
    // Dwarf vs Elf
    const raceA = (charA.race || '').toLowerCase();
    const raceB = (charB.race || '').toLowerCase();

    const isDwarf = r => r.includes('dwarf') || r.includes('矮人');
    const isElf = r => r.includes('elf') || r.includes('精靈');

    if ((isDwarf(raceA) && isElf(raceB)) || (isDwarf(raceB) && isElf(raceA))) {
        base -= 5; // Traditional Rivalry
    }

    return Math.max(20, Math.min(80, base)); // Clamp start between 20-80
}
