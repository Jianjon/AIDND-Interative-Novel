export const FLAVOR_ADJECTIVES = [
    "Savage", "Cruel", "Vicious", "Wild", "Grim", "Dark", "Fierce", "Bloodthirsty",
    "Cursed", "Ancient", "Rotting", "Shadowy", "Venomous", "Rabid", "Hollow",
    "Twisted", "Frenzied", "Wretched", "Lurking", "Silent", "Elite", "Veteran"
];

export const getUniqueEnemyName = (baseName, existingRoster) => {
    // 1. Strip existing " A", " B", " 1", etc. from the AI's output
    const cleanBase = baseName.replace(/\s+[A-Z0-9]$/i, "").trim();

    const existingNames = new Set(existingRoster.map(c => c.name));

    // If the stripped name is unique (unlikely if multiple), use it.
    if (!existingNames.has(cleanBase)) return cleanBase;

    // Try Flavor Adjectives
    for (const adj of FLAVOR_ADJECTIVES) {
        const newName = `${adj} ${cleanBase}`;
        if (!existingNames.has(newName)) return newName;
    }

    // Fallback: Numbering
    let i = 2;
    while (true) {
        const newName = `${cleanBase} ${i}`;
        if (!existingNames.has(newName)) return newName;
        i++;
    }
};
