
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PersonaService } from "../services/PersonaService";
import { CLASS_BEHAVIORS } from "../data/classBehaviors";
import { formatModuleContext } from "../data/modules_data.js";

export class CharacterManagerAgent {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.modelName = "gemini-2.0-flash-exp";
        this.personaService = new PersonaService();
    }

    async _generate(prompt) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[CharacterManager] API Error: ${response.status} - ${errorText}`);
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return {
                text: data.candidates[0].content.parts[0].text,
                usage: data.usageMetadata
            };
        } catch (error) {
            console.error("[CharacterManager] Generation Failed:", error);
            throw error;
        }
    }

    /**
     * Styles raw player input into character dialogue.
     * @returns {Promise<{text: string, usage: object}>} { text, usage }
     */
    async styleDialogue(characterName, characterData, rawInput, context = "") {
        console.log(`[CharacterManager] Styling dialogue for ${characterName}...`);

        const personalityKey = characterData.personality || "熱血衝動";
        // Infer context type from context string (simple heuristic for now)
        let contextType = "exploration";
        if (context.includes("Combat") || context.includes("Battle") || context.includes("Danger")) contextType = "battle";
        else if (context.includes("Fear") || context.includes("Terror")) contextType = "fear";
        else if (context.includes("Surprise")) contextType = "surprise";

        const styleInstruction = this.personaService.getSpeechInstruction(personalityKey, contextType);

        const prompt = `
        You are the **Character Manager** (Dialogue Stylist).
        **CRITICAL: ALL TEXT OUTPUT MUST BE IN TRADITIONAL CHINESE (繁體中文). NO ENGLISH.**. NO ENGLISH.**
        角色: ${characterName}
        種族: ${characterData.race || "人類"}
        職業: ${characterData.class}
        個性: ${characterData.personality}
        人際關係: ${JSON.stringify(characterData.relationships || {})}
        
        [個性指引]
        ${styleInstruction}
        
        [任務]
        將玩家輸入的指令轉化為一句簡短有力的「動作宣言」（20字以內）。
        1. 根據情境調整語氣：戰鬥時熱血、潛行時冷靜低語、社交時機智。
        2. **禁止** 所有角色都用相同的語氣詞（如「哈！」、「喝！」）開頭。請展現角色的獨特性。
        3. 只輸出對話內容，不需要冒號或引號。
        
        玩家輸入: "${rawInput}"
        當前情境: ${context}
        
        角色對話:
        `;

        try {
            const result = await this._generate(prompt);
            return { text: result.text.trim(), usage: result.usage };
        } catch (error) {
            console.error("Style Dialogue Error:", error);
            return { text: rawInput, usage: null }; // Fallback consistent format
        }
    }

    /**
     * Updates character internal state based on GM mechanics output.
     * @param {object} currentRoster 
     * @param {object} mechanicsData (hp_updates, psych_updates, rewards, etc.)
     * @returns {object} Updated roster state (conceptually) or just log/feedback
     */
    updateState(currentRoster, mechanicsData) {
        // This method effectively calculates the new state to be synchronized in App.jsx
        // In a clearer architecture, this Agent would hold state, but here it processes logic.

        const updates = {};

        // Process HP Updates
        if (mechanicsData.hp_updates) {
            Object.entries(mechanicsData.hp_updates).forEach(([id, change]) => {
                // Return structured updates for App to apply
                updates[id] = { hp_change: change };
            });
        }

        // Future: Process Inventory/Buffs here

        return updates;
    }

    /**
     * Generates A/B/C options for all characters.
     * @param {Array} roster The full character roster objects
     * @param {Object} worldState Location, time, etc.
     * @param {String} lastNarrative The story so far
     * @param {String} previousOutcome "Success" or "Fail" summary
     * @returns {Promise<{results: Object, usage: Object}>} { results, usage }
     */
    async generateOptions(roster, worldState, lastNarrative, previousOutcome, signals = {}, moduleId = null, currentAct = 1) {
        console.log(`[CharacterManager] Generating Options for ${roster.length} chars (BATCHED)...`);

        const { threat_level, pacing_signal, mechanical_opportunity } = signals;
        const plotContext = moduleId ? formatModuleContext(moduleId, currentAct) : '';

        // 1. Construct Batched Context
        const charSummaries = roster.map(c => {
            const cls = c.class;
            const behaviors = CLASS_BEHAVIORS[cls] || CLASS_BEHAVIORS["戰士"];
            return `
            - ID: ${c.id}
              Name: ${c.name} (${c.race} ${c.class})
              HP: ${c.hp || "Unknown"}
              Personality: ${c.personality}
              Bio: ${c.bio ? c.bio.substring(0, 150) + "..." : "Unknown"}
              Behaviors: [Instinct: ${behaviors.instinct}, Professional: ${behaviors.professional}, Team: ${behaviors.team}]
            `;
        }).join("\n");

        const prompt = `
        You are a D&D Tactics Engine.
        Generate tactical options for the following ${roster.length} characters based on the current situation.

        === SCENE CONTEXT ===
        World State: ${JSON.stringify(worldState)}
        Threat Level: ${threat_level || "Unknown"}
        Pacing: ${pacing_signal || "Normal"}
        Opportunity: ${mechanical_opportunity || "None"}
        Story So Far: ${lastNarrative.slice(-800)}
        ${plotContext ? `Plot Goal: ${plotContext}` : ''}

        === CHARACTERS ===
        ${charSummaries}

        === INSTRUCTIONS ===
        **CRITICAL: STRICT CONTEXT ADHERENCE (絕對情境連貫性)**
        1. **READ-ONLY TRUTH**: You must ONLY interact with entities explicitly mentioned in the "Story So Far" or "Scene Context".
        2. **IMMEDIATE REACTION PRIORITY (即時反應優先)**:
           - **IF A QUESTION IS ASKED**: You MUST answer it (or explicitly refuse). Do not ignore it. (e.g., "Answer the guard's question about identity.")
           - **IF THREATENED**: React to the weapon/spell. (e.g., "Raise hands," "Draw weapon," "Step back.")
           - **IF ATTACKED**: Defend or Counter-attack.
           - **DO NOT** perform long, reflective internal monologues about the past when a spear is at your throat. Focus on the **NOW**.

        3. **NO HALLUCINATIONS**: Do NOT assume enemies are present unless explicitly visible.
        4. **UNKNOWN THREATS**: If threat is vague, be cautious.

        **CRITICAL COMBAT RULE**:
        - IF 'Threat Level' is "High" OR enemies are attacking:
        - **Option A MUST BE A COMBAT ACTION** (Attack, Spell, Rage, Smite).
        - **Option B MUST BE A TACTICAL ACTION** (Dodge, Hide, Disengage, Flank).
        - **DO NOT** offer "Look around", "Investigate", or "Talk" as Option A during active combat. You will die.

        For EACH character, generate:
        1. A short monologue (15-20 chars, Traditional Chinese).
        2. 3 Action Options (A, B, C) with **Distinct Flavors**:
           - **Deep Roleplay**: MUST incorporate the character's **Bio** and **Personality** but **MUST ADDRESS THE IMMEDIATE SITUATION**.
           - **Review Character Sheet**: Use specific Spells/Feats from 'Character Summary'.
           - **Length**: Strict 80-100 characters per option. detailed, vivid, and immersive.
           - **Format**: MUST use "[Internal Monologue] Action Description" format.
           - **Language**: Traditional Chinese (繁體中文).

        3. **Option Categories**:
           - **Option A (Instant Reaction - Combat/Skill/Investigate/Social)**:
             - **DIRECT RESPONSE**: If spoken to, reply. If threatened, react.
             - IF COMBAT: specific Attack/Spell against VISIBLE enemy.
           - **Option B (Preparation/Tactical/Cautious)**:
             - De-escalate, Bluff, Ready Action, or Stealth. (e.g. "[冷靜...] 舉起雙手示弱，並試圖用言語安撫對方...")
           - **Option C (Personality/Roleplay Choice)**:
             - A unique action based on their specific personality (e.g., a Barbarian might growl, a Bard might flirt/lie, a Paladin might state their oath).

        **CRITICAL OUTPUT FORMAT:**
        Return ONLY a JSON Array. No markdown formatting.
        [
            {
                "id": "character_id",
                "monologue": "...",
                "options": [
                    { "type": "instinct", "text": "Option A Text..." },
                    { "type": "professional", "text": "Option B Text..." },
                    { "type": "team", "text": "Option C Text..." }
                ]
            },
            ...
        ]
        `;

        try {
            const result = await this._generate(prompt);
            let text = result.text;
            // Sanitization
            if (text.startsWith("```json")) text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
            else if (text.startsWith("```")) text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");

            const parsed = JSON.parse(text);

            // Validation & Fallback Map
            const validResults = parsed.map(item => {
                // Ensure ID matches a character in roster
                const char = roster.find(c => c.id === item.id);
                if (!char) return null;

                // Ensure options exist
                if (!item.options || !Array.isArray(item.options) || item.options.length < 3) {
                    // Quick fallback if AI malformed this entry
                    return {
                        id: item.id,
                        monologue: "...",
                        options: [
                            { type: "instinct", text: "保持警惕，觀察四周 (fallback)" },
                            { type: "professional", text: "準備好武器，隨時應戰 (fallback)" },
                            { type: "team", text: "掩護隊友，等待指令 (fallback)" }
                        ]
                    };
                }
                return item;
            }).filter(Boolean);

            return { results: validResults, usage: result.usage };

        } catch (error) {
            console.error("[CharacterManager] Batch Generation Failed:", error);
            // Fallback: Return empty/basic options for all to prevent crash
            const fallbackResults = roster.map(c => ({
                id: c.id,
                monologue: "...",
                options: [
                    { type: "instinct", text: "觀察局勢..." },
                    { type: "professional", text: "準備行動..." },
                    { type: "team", text: "等待隊友..." }
                ]
            }));
            return { results: fallbackResults, usage: null };
        }
    }

    /**
     * AI decides how a character should progress upon leveling up.
     * Uses hybrid approach: Hardcoded core rules + AI decision for Feats/ASIs.
     * @param {Object} character - The character data.
     * @param {Array} history - Logs or growth history.
     * @returns {Promise<Object>} { class: string, type: 'feat'|'asi', value: string|object, reason: string, features: string[] }
     */
    async planLevelUp(character, history = []) {
        console.log(`[CharacterManager] Planning Level Up for ${character.name}...`);

        // 1. Get Hardcoded Class Features
        const nextLevel = (character.level || 1) + 1;
        // Simple mapping from English/Chinese class names to our keys
        const classKeyMap = {
            "Fighter": "戰士", "戰士": "戰士",
            "Wizard": "法師", "法師": "法師",
            "Cleric": "牧師", "牧師": "牧師",
            "Rogue": "遊蕩者", "遊蕩者": "遊蕩者",
            "Barbarian": "野蠻人", "野蠻人": "野蠻人",
            "Bard": "吟遊詩人", "吟遊詩人": "吟遊詩人",
            "Druid": "德魯伊", "德魯伊": "德魯伊",
            "Monk": "武僧", "武僧": "武僧",
            "Paladin": "聖武士", "聖武士": "聖武士",
            "Ranger": "遊俠", "遊俠": "遊俠",
            "Sorcerer": "術士", "術士": "術士",
            "Warlock": "邪術師", "邪術師": "邪術師"
        };
        const key = classKeyMap[character.class.split('/')[0].trim()] || "戰士"; // Default to Fighter if unknown

        const progression = CLASS_PROGRESSION[key];
        const newFeatures = progression?.features[nextLevel] || [];

        // 2. AI Decision for Feats/ASIs (only if it's an ASI level)
        // Check if this level grants ASI
        const isAsiLevel = newFeatures.includes("Ability Score Improvement");

        if (!isAsiLevel) {
            // Standard Level Up (Just features)
            return {
                class: character.class,
                type: 'feature',
                value: newFeatures, // List of new features
                reason: `Level ${nextLevel} standard progression.`,
                features: newFeatures
            };
        }

        // 3. AI Decides ASI/Feat
        const recentEvents = history.slice(-10).map(h => typeof h === 'string' ? h : (h.content || JSON.stringify(h))).join("\n");

        const prompt = `
        You are an expert D&D Character Build Consultant.
        
        [CHARACTER PROFILE]
        Name: ${character.name}
        Class: ${character.class} (Level ${character.level} -> ${character.level + 1})
        Stats: STR ${character.baseStats.str}, DEX ${character.baseStats.dex}, CON ${character.baseStats.con}, INT ${character.baseStats.int}, WIS ${character.baseStats.wis}, CHA ${character.baseStats.cha}
        Existing Feats: ${(character.feats || []).join(', ') || "None"}
        Personality: ${character.personality}
        
        [RECENT HISTORY]
        ${recentEvents || "Just started the adventure."}

        [TASK]
        This level grants an **Ability Score Improvement (ASI)**.
        Decide whether to take a FEAT or improve STATS.

        1. **Improvement Choice**:
           - If primary stat < 18, prioritize ASI to increase modifier.
           - If primary stat >= 18, consider a FEAT that fits the narrative.
           - FEAT EXAMPLES: Sharpshooter, GWM, War Caster, Alert, Lucky, Sentinel.
           - ASI FORMAT: { "stat": 2 } or { "stat1": 1, "stat2": 1 }

        [OUTPUT FORMAT JSON]
        {
            "type": "feat" or "asi",
            "value": "Feat Name" OR { "str": 2 },
            "reason": "Brief explanation in Traditional Chinese (繁體中文). NO ENGLISH."
        }
        `;

        try {
            const result = await this._generate(prompt);
            const text = result.text;
            const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const aiDecision = JSON.parse(jsonStr);

            return {
                class: character.class,
                ...aiDecision,
                features: newFeatures // Still include class features if any coincidentally match
            };
        } catch (error) {
            console.error("Plan Level Up Error:", error);
            return {
                class: character.class,
                type: 'asi',
                value: { [character.baseStats.str > character.baseStats.dex ? 'str' : 'dex']: 2 },
                reason: "AI Failed, fallback to primary stat.",
                features: newFeatures
            };
        }
    }

    /**
     * Helper: Generates a style-consistent portrait URL using Pollinations.ai
     * Matches the visual style of existing assets (DnD Fantasy Art).
     * @param {object} data - Character data including name, race, class, gender, bio
     */
    generatePortraitUrl(data) {
        // Simple mapping for better prompt accuracy
        const raceMap = {
            "人類": "Human", "精靈": "Elf", "矮人": "Dwarf", "半身人": "Halfling",
            "龍裔": "Dragonborn", "提夫林": "Tiefling", "半獸人": "Orc", "侏儒": "Gnome",
            "卓爾": "Drow", "半精靈": "Half-Elf", "阿斯莫": "Aasimar", "機人": "Warforged"
        };
        const classMap = {
            "戰士": "Fighter", "法師": "Wizard", "牧師": "Cleric", "遊蕩者": "Rogue",
            "野蠻人": "Barbarian", "吟遊詩人": "Bard", "德魯伊": "Druid", "武僧": "Monk",
            "聖武士": "Paladin", "遊俠": "Ranger", "術士": "Sorcerer", "邪術師": "Warlock"
        };
        const genderMap = {
            "男": "Male", "女": "Female", "男性": "Male", "女性": "Female"
        };

        const enRace = raceMap[data.race] || data.race || "Fantasy Hero";
        const enClass = classMap[data.class] || data.class || "Adventurer";
        const enGender = genderMap[data.gender] || "Hero";

        // Construct a prompt that matches the "assets/characters" style:
        // Key elements: Western comic/cartoon style, thick outlines, flat colors
        const prompt = `${data.appearance || `${enRace} ${enClass}, ${enGender}, ${data.personality}`}, cartoon style, western comic book art, vibrantly colored, thick sharp outlines, flat coloring, detailed fantasy character concept, solid background, masterpiece, best quality, no text`;

        const encodedPrompt = encodeURIComponent(prompt);
        // Use a static seed based on name to ensure consistency if re-generated
        const seed = Math.floor(Math.random() * 10000);

        return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true&model=turbo`;
    }

    /**
     * Generates a complete character draft from a user prompt.
     * @param {string} userPrompt e.g., "A drunken monk seeking redemption"
     * @returns {Promise<object>} Character JSON object
     */
    async generateCharacterDraft(userPrompt) {
        console.log(`[CharacterFactory] Generating draft for: "${userPrompt}"`);

        const prompt = `
        You are a D&D 5e Character Generator.
        Context: Creating a new protagonist for an Interactive Novel.
        User Request: "${userPrompt}"

        [TASK]
        Generate a COMPLETE character JSON object in Traditional Chinese (繁體中文). NO ENGLISH in text fields.
        
        [REQUIREMENTS]
        - **Race/Class**: Use standard D&D 5e (or standard fantasy types).
        - **Stats**: Standard Point Buy array (15, 14, 13, 12, 10, 8) arranged suitably.
        - **Content**:
          - name: Creative Name (English nickname in parens e.g. "雷歐 (Leo)")
          - bio: 100-150 words backstory.
          - personality: Short trait description.
          - monologue: A short inner thought.
          - equipment: Appropriate starting gear.
          - spells: Appropriate Level 1 spells (if caster).
          - appearance: **Critical**. A detailed visual description in English.
        - **Format**: STRICT JSON.

        [APPEARANCE STYLE GUIDE - FEW SHOT EXAMPLES]
        You MUST follow this specific layout for the 'appearance' field:
         Format: [Physical Traits], [Equipment], [Expression/Pose], [Atmosphere/Aura]
        
        Example 1 (Barbarian):
        "Pale blue translucent skin, white hair floating as if underwater, glowing white eyes, muscular build, tribal tattoos, carrying a massive greataxe, gust of wind swirling around."
        
        Example 2 (Bard):
        "Small stature, large expressive eyes, pink messy hair with goggles, colorful motley clothes, playing a lute, mischievous grin, bright and vibrant colors."
        
        Example 3 (Cleric):
        "Stout dwarf, long braided grey beard with silver rings, heavy plate armor with holy symbol engraved, holding a warhammer, stern and pious expression, warm golden light aura."

        [OUTPUT FORMAT]
        {
            "name": "...",
            "race": "...",
            "class": "...",
            "gender": "...",
            "alignment": "...",
            "background": "...",
            "hp": 10, 
            "maxHp": 10,
            "baseStats": { "str": 10, "dex": 10, "con": 10, "int": 10, "wis": 10, "cha": 10 },
            "skills": ["Skill1", "Skill2"],
            "feats": ["Feat1"],
            "spells": [],
            "slots": { "1": 2 },
            "personality": "...",
            "monologue": "...",
            "bio": "...",
            "appearance": "...", 
            "inventory": {
                "equipment": ["Item1"],
                "consumables": ["Item2"],
                "magicItems": [],
                "gold": 10
            }
        }
        `;

        try {
            const result = await this._generate(prompt);
            const text = result.text;
            // Sanitize: Remove Markdown, remove comments //, remove trailing commas (simple attempt)
            let jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
            // Remove single line comments
            jsonStr = jsonStr.replace(/^\s*\/\/.*$/gm, "");
            // Remove trailing commas before closing brackets/braces
            jsonStr = jsonStr.replace(/,\s*([\]}])/g, '$1');

            const data = JSON.parse(jsonStr);

            // Post-processing: Add ID and Default Avatar
            data.id = `custom_${Date.now()}`;

            // GENERATE PORTRAIT
            data.avatar = this.generatePortraitUrl(data);
            data.avatarUrl = data.avatar; // Redundancy for safety

            return data;
        } catch (error) {
            console.error("Draft Generation Failed:", error); // Log raw text if possible would be better, but error object might not have it.
            throw new Error("Failed to generate character draft. (JSON Parse Error)");
        }
    }

    /**
     * Generates 3 unique "Protagonist Special Abilities" for the user to choose from.
     * @param {object} characterData 
     * @returns {Promise<Array>} List of 3 ability objects { name, desc, effect }
     */
    async generateProtagonistAbilities(characterData) {
        console.log(`[CharacterFactory] Generating abilities for: ${characterData.name}`);

        const prompt = `
        Context: The user is creating a MAIN CHARACTER (Protagonist) for a D&D novel.
        Character: ${characterData.name} (${characterData.race} ${characterData.class})
        Bio: ${characterData.bio}

        [TASK]
        Create 3 unique "Protagonist Special Abilities" (Cheat Skills / Unique Traits).
        These should be powerful, narrative-driving abilities that set them apart from NPCs.
        
        Examples:
        - "Time Rewind (Once per act)"
        - "Demon Arm (Massive damage but hurts self)"
        - "Spirit Vision (See ghosts/secrets)"

        [OUTPUT FORMAT JSON]
        [
            {
                "id": "ability_1",
                "name": "Ability Name (CN)",
                "description": "Flavor description in Traditional Chinese (繁體中文).",
                "effect": "Mechanical/Narrative effect summary in Traditional Chinese (繁體中文)."
            },
            ... (3 total)
        ]
        `;

        try {
            const result = await this._generate(prompt);
            const text = result.text;
            const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("Ability Generation Failed:", error);
            // Fallback
            return [
                { id: 'heroic_luck', name: '主角光環 (幸運)', description: '命運總是眷顧傻瓜與英雄。', effect: '每天可以重擲 3 次任意骰子。' },
                { id: 'hidden_potential', name: '潛能爆發', description: '絕境中往往能爆發出驚人的力量。', effect: 'HP 低於 50% 時，造成傷害 +2。' },
                { id: 'silver_tongue', name: '蠱惑人心', description: '或許是天賦，或許是某種魔法。', effect: '在所有社交檢定上獲得優勢。' }
            ];
        }
    }

}
