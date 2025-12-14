/**
 * 🔒 STABLE CORE: IMAGE PROMPT & GENERATION
 * This file contains the finalized logic for:
 * 1. "Nano Banana" (Gemini 2.5 Flash) priority generation.
 * 2. Pathfinder: Kingmaker art style prompts.
 * 3. Robust fallback chain (Gemini -> Imagen -> Pollinations).
 * 
 * DO NOT MODIFY THIS LOGIC WITHOUT EXPLICIT USER APPROVAL.
 * The prompt engineering here is tuned for specific aesthetic results.
 */

const raceToEnglish = {
    '人類': 'Human',
    '精靈': 'Elf',
    '矮人': 'Dwarf',
    '半身人': 'Halfling',
    '侏儒': 'Gnome',
    '哥布林': 'Goblin',
    '獸人': 'Orc',
    '艾羽人': 'Mwangi Human',
    '天狗': 'Tengu',
    '巨人裔': 'Giant-kin',
    '龍裔': 'Dragon-kin',
    'Nephilim 人類': 'Nephilim',
    '提夫林': 'Tiefling',
    '半精靈': 'Half-Elf',
    '亞斯莫': 'Aasimar',
    '龍裔': 'Dragonborn',
    '卓爾精靈': 'Drow (Dark Elf)',
    '黑暗精靈': 'Drow (Dark Elf)',
    '吉斯洋基人': 'Githyanki',
    '氣元素裔': 'Air Genasi (Sylph)',
    '哈比人': 'Halfling',
    '半獸人': 'Half-Orc',
    '木精靈': 'Wood Elf',
    '高等精靈': 'High Elf'
};

const classToEnglishMap = {
    "戰士": "Fighter",
    "法師": "Wizard",
    "盜賊": "Rogue",
    "牧師": "Cleric",
    "冠軍勇士": "Champion",
    "遊俠": "Ranger",
    "武僧": "Monk",
    "吟遊詩人": "Bard",
    "德魯伊": "Druid",
    "術士": "Sorcerer",
    "鍊金術士": "Alchemist",
    "調查員": "Investigator",
    "劍客": "Swashbuckler",
    "先知": "Oracle",
    "女巫": "Witch",
    "魔戰士": "Magus",
    "召喚師": "Summoner",
    "奇物師": "Inventor",
    "遊戲大師": "Dungeon Master"
};

const classToEnglish = (chineseClass) => {
    return classToEnglishMap[chineseClass] || chineseClass;
};

const getApiKey = () => {
    return import.meta.env.VITE_GOOGLE_AI_KEY || localStorage.getItem('gemini_api_key');
};

export const generateAIPortrait = async (character) => {
    try {
        const apiKey = getApiKey();
        if (!apiKey) {
            throw new Error("API Key not found");
        }

        // Use English for the image generation prompt for better results
        let englishClass = classToEnglish(character.class);

        const race = character.race;
        const englishRace = race ? (raceToEnglish[race] || race) : '';
        const gender = character.gender;
        const genderStr = gender ? (gender === '男' ? 'Male' : (gender === '女' ? 'Female' : '')) : '';
        const nameForPrompt = character.name;

        // Improved logic: Use the detailed appearance if available
        // Improved logic: specific details
        let descriptionForPrompt = "";
        if (character.appearance && character.appearance !== 'N/A') {
            descriptionForPrompt = character.appearance;
        } else {
            descriptionForPrompt = character.description || "";
        }

        const personality = character.personality || "Heroic";
        const feats = (character.feats || []).join(", ");
        const background = character.background || "";



        // D&D Specific Racial Visual Hints (Strict Enforcements)
        const racialVisualHints = {
            'Elf': 'clean shaven, smooth face, pointed ears, angular features, elegant, no facial hair',
            'Wood Elf': 'clean shaven, smooth face, pointed ears, natural markings, angular features, no facial hair',
            'High Elf': 'clean shaven, smooth face, pointed ears, elegant, arcane aura, no facial hair',
            'Drow (Dark Elf)': 'obsidian or dark grey skin, white hair, pointed ears, clean shaven, no facial hair',
            'Air Genasi (Sylph)': 'pale blue or white skin, breezy wind-tossed hair, human-like ears, NO horns, NO animal features',
            'Tiefling': 'large curved horns on forehead, tail, red or unusal skin color, sharp teeth',
            'Dragonborn': 'draconic head, snout, scales, no hair, reptilian eyes',
            'Dwarf': gender === '男' ? 'long braided beard, stout, muscular' : 'stout, muscular, braided hair',
            'Half-Orc': 'grayish skin, visible tusks, muscular build',
            'Gnome': 'small stature, eccentric appearance, large expressive eyes',
            'Halfling': 'small stature, hairy feet, young face',
            'Aasimar': 'metallic or glowing skin, halo or divine aura, beautiful features',
            'Githyanki': 'yellow-green skin, gaunt features, small nose, pointed ears',
            'Earth Genasi (Oread)': 'rocky skin texture, crystal-like hair, solid build',
            'Fire Genasi (Ifrit)': 'red or coal-black skin, flaming hair, glowing eyes',
            'Water Genasi (Undine)': 'blue or turquoise skin, wet hair, fin-like ears'
        };

        const raceHints = racialVisualHints[englishRace] || "";
        const negativePrompts = englishRace.includes('Elf') ? 'beard, facial hair, stubble'
            : englishRace.includes('Genasi') ? 'horns, demon wings, fur'
                : englishRace.includes('Human') ? 'elf ears, horns'
                    : '';

        const poses = [
            "dynamic action pose, mid-combat",
            "casting a spell, glowing magical energy",
            "standing confidently, arms crossed",
            "looking into the distance, wind blowing hair",
            "inspecting a weapon or artifact",
            "stealthy crouching pose, ready to strike",
            "reading a scroll or book",
            "praying or meditating",
            "drinking from a tankard",
            "pointing forward, commanding"
        ];
        const randomPose = poses[Math.floor(Math.random() * poses.length)];

        // Prioritize the class and race + specific details
        // Prioritize the class and race + specific details
        const prompt = `character portrait of ${nameForPrompt}, ${genderStr} ${englishRace} ${englishClass}.
        ${descriptionForPrompt}
        Style: cartoon style, western comic book art, vibrantly colored, thick sharp outlines, flat coloring, detailed fantasy character concept, solid background, masterpiece, best quality, no text.
        Atmosphere: Heroic, dynamic, expressive.
        Features: Clear and distinctive face, expressive ${personality} look.
        Race Details: ${raceHints}.
        
        Negative Constraint: (Do NOT include: ${negativePrompts}, 3d render, photorealistic, blurry, low resolution, distorted face, realism, grainy)
        Composition: ${randomPose}, upper body portrait, neutral background.`;

        console.log("Generating portrait with prompt:", prompt);

        // Priority 1: Gemini 2.5 Flash (Nano Banana)
        try {
            console.log("Attempting generation with gemini-2.5-flash-preview-09-2025 (Nano Banana)...");
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `${prompt} \n\n(Generate a high quality image based on this description)` }] }],
                        generationConfig: {
                            responseMimeType: "image/jpeg"
                        }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
                if (inlineData && inlineData.data) {
                    return `data:${inlineData.mimeType || 'image/jpeg'};base64,${inlineData.data}`;
                }
            }
            console.warn("Gemini 2.5 Flash failed or returned no image. Falling back...");
        } catch (e) {
            console.warn("Gemini 2.5 Flash error:", e);
        }

        // Priority 2: Imagen 4.0
        try {
            console.log("Attempting generation with imagen-4.0-generate-001...");
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        instances: [{ prompt: prompt }],
                        parameters: { sampleCount: 1, aspectRatio: '3:4' }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.predictions?.[0]?.bytesBase64Encoded) {
                    return `data:image/jpeg;base64,${data.predictions[0].bytesBase64Encoded}`;
                }
            }
            console.warn("Imagen 4.0 failed. Falling back...");
        } catch (e) {
            console.warn("Imagen 4.0 error:", e);
        }

        // Priority 3: Imagen 3.0
        try {
            console.log("Attempting generation with imagen-3.0-generate-001...");
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        instances: [{ prompt: prompt }],
                        parameters: { sampleCount: 1, aspectRatio: '3:4' }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.predictions?.[0]?.bytesBase64Encoded) {
                    return `data:image/jpeg;base64,${data.predictions[0].bytesBase64Encoded}`;
                }
            }
        } catch (e) {
            console.warn("Imagen 3.0 error:", e);
        }

        // Final Fallback: Pollinations.ai
        console.warn("All Google APIs failed. Falling back to Pollinations.ai...");
        try {
            // Clean prompt for URL: remove newlines, extra spaces
            const smoothPrompt = prompt.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
            // Optional: You could strip non-ASCII here if Chinese causes issues, but Flux usually handles it okay. 
            // Let's at least clear the newlines which break URLs often.

            const promptEncoded = encodeURIComponent(smoothPrompt);
            const randomSeed = Math.floor(Math.random() * 1000000);
            return `https://image.pollinations.ai/prompt/${promptEncoded}?width=512&height=768&nologo=true&model=flux&seed=${randomSeed}`;
        } catch (e) {
            console.error("Pollinations fallback failed", e);
            throw new Error("All image generation methods failed.");
        }
    } catch (e) {
        // This outer catch block will catch errors from the entire sequence if no fallback succeeds.
        console.error("Final fallback failed or initial API key error:", e);
        throw e;
    }
};

export const generateAIScene = async (locationName, contextLogs = "") => {
    try {
        const apiKey = getApiKey();
        if (!apiKey) {
            throw new Error("API Key not found");
        }

        const prompt = `Fantasy landscape art, digital painting style, cinematic lighting, highly detailed "Pathfinder: Kingmaker" aesthetic.
Subject: ${locationName}
Context: ${contextLogs.slice(0, 300)}
Mood: Atmospheric, dramatic, immersive, 8k resolution, concept art.
No text, no UI overlay.`;

        console.log("Generating Scene for:", locationName);

        // Priority 1: Gemini 2.5 Flash (Nano Banana)
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: `Generate a fantasy landscape image: ${prompt}` }]
                        }],
                        generationConfig: {
                            responseModalities: ["IMAGE"]
                        }
                    })
                }
            );

            const data = await response.json();
            const parts = data.candidates?.[0]?.content?.parts || [];
            const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));

            if (imagePart?.inlineData?.data) {
                return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
            }
        } catch (e) {
            console.warn("Gemini Scene Gen failed:", e);
        }

        // Priority 2: Imagen 4.0
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        instances: [{ prompt: prompt }],
                        parameters: { sampleCount: 1, aspectRatio: '16:9' } // Wide for scenes
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.predictions?.[0]?.bytesBase64Encoded) {
                    return `data:image/jpeg;base64,${data.predictions[0].bytesBase64Encoded}`;
                }
            }
        } catch (e) {
            console.warn("Imagen 4 Scene Gen failed:", e);
        }

        // Fallback: Pollinations
        try {
            const smoothPrompt = prompt.replace(/[\r\n]+/g, " ").trim();
            const promptEncoded = encodeURIComponent(smoothPrompt);
            const randomSeed = Math.floor(Math.random() * 1000000);
            return `https://image.pollinations.ai/prompt/${promptEncoded}?width=1024&height=576&nologo=true&model=flux&seed=${randomSeed}`;
        } catch (e) {
            console.error("Pollinations fallback failed", e);
            return null;
        }

    } catch (e) {
        console.error("Scene generation failed completely:", e);
        return null;
    }
};

