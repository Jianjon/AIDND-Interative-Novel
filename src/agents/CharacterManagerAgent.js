
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

    async _generate(prompt, retries = 2) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }]
                        }),
                        signal: controller.signal
                    }
                );

                clearTimeout(timeoutId);

                if (!response.ok) {
                    if (response.status >= 500 && attempt < retries) {
                        console.warn(`[CharacterManager] API 500 Error, Retrying (${attempt + 1}/${retries})...`);
                        await new Promise(r => setTimeout(r, 1000 * (attempt + 1))); // Linear backoff
                        continue;
                    }
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
                clearTimeout(timeoutId);
                const isTimeout = error.name === 'AbortError';

                if ((isTimeout || error.message.includes('Failed to fetch')) && attempt < retries) {
                    console.warn(`[CharacterManager] Network/Timeout Error, Retrying (${attempt + 1}/${retries})...`);
                    await new Promise(r => setTimeout(r, 2000));
                    continue;
                }

                console.error("[CharacterManager] Generation Failed (Final):", error);
                throw error;
            }
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

        const isRegenerate = previousOutcome === "Regenerate Request";
        const regenerationInstruction = isRegenerate
            ? "**REGENERATE REQUEST**: 玩家不滿意之前的選項。請提供與之前完全不同的策略、目標或行動類型。避免重複相同的戰術。"
            : "";

        const prompt = `
        You are a D&D Character Perspective Engine.
        Generate action options for ${roster.length} characters based on their INDIVIDUAL PERSPECTIVE.

        ${regenerationInstruction}

        === SCENE CONTEXT ===
        World State: ${JSON.stringify(worldState)}
        Threat Level: ${threat_level || "Unknown"}
        Pacing: ${pacing_signal || "Normal"}
        Story So Far: ${lastNarrative.slice(-2000)}
        ${plotContext ? `Plot Goal: ${plotContext}` : ''}

        === CHARACTERS ===
        ${charSummaries}

        === CRITICAL: CHARACTER PERSPECTIVE RULES (角色視角規則) ===
        
        **1. LIMITED KNOWLEDGE (有限認知)**
        - 角色只知道他們親眼看到或親耳聽到的事情
        - 角色不知道敵人的名字，除非敵人自我介紹過或有人告訴他們
        - 用描述性稱呼敵人：「那個持刀的男人」「前方的生物」「那群襲擊者」
        - ❌ 禁止：「攻擊獨眼哥布林」（角色不知道名字）
        - ✓ 正確：「攻擊那個獨眼的矮小生物」

        **2. PERSONALITY-DRIVEN ACTIONS (個性驅動)**
        - 每個角色的選項必須反映他們的 personality 和 bio
        - 膽小的角色可能想要躲避或逃跑
        - 貪婪的角色可能優先考慮財物
        - 正義的角色會保護弱者
        - 自私的角色會優先保護自己
        - 不是每個人都是英雄！

        **3. EMOTIONAL STATE (情緒狀態)**
        - 考慮角色在當下可能的情緒：緊張、恐懼、憤怒、興奮、困惑
        - 有些角色可能會恐慌做出非理性的選擇
        - 有些角色可能會過度自信
        - 讓選項反映這些情緒

        **4. CLASS-APPROPRIATE ACTIONS (職業相符)**
        - 戰士傾向直接戰鬥
        - 遊蕩者傾向隱匿或偷襲
        - 法師需要考慮施法距離和法術位
        - 牧師會關心隊友的傷勢
        - 吟遊詩人可能嘗試談判或嘲諷

        *** 特殊狀態規則：瀕死 (DOWNED / UNCONSCIOUS) ***
        如果角色 HP = 0 或狀態為 Unconscious/Downed：
        - ❌ 禁止物理行動 (攻擊、移動、使用物品)
        - ✅ 允許：
          1. **艱難開口 (Dialogue)**: 留下遺言、鼓勵隊友、求救 (非常虛弱的語氣)
          2. **心理活動 (Mental)**: 走馬燈、回憶、恐懼、祈禱
          3. **微弱掙扎**: 試圖抓握東西、看向某處
        - 必須生成 3 個瀕死選項 (Dialogue/Mental/Struggle)

        === IMMEDIATE SITUATION ===
        - **STEP 1**: 找到「Story So Far」的最後一段
        - **STEP 2**: 判斷角色此刻面對的具體情況
        - **STEP 3**: 從該角色的視角生成反應

        === PROGRESSION LOGIC (劇情推進邏輯) - CRITICAL ===
        **判斷當前障礙狀態**:
        - 若 narrative 顯示陷阱已解除/敵人已死亡/謎題已解開 -> **必須** 提供推進劇情 (移動/搜刮/進入下一區) 的選項。
        - **禁止** 針對「已解決」的威脅生成重複行動 (例如: 陷阱已解除，就不要再有「解除陷阱」的選項)。
        - 若玩家因某些原因卡關 (無效行動多次)，提供一個明確 **High Context Hint** 的選項 (例如：「仔細觀察周圍，發現...」)。


        === RESOURCE AWARENESS (資源意識) ===
        **重要**: 法術位和特殊能力是有限的！
        - 法師/術士/邪術師: 法術位珍貴，不要隨便浪費
        - 德魯伊: 野性形態次數有限
        - 野蠻人: 狂暴次數有限
        - 聖騎士: 聖療次數有限
        
        **選項優先順序 (由高到低)**:
        1. 先考慮：觀察、對話、環境互動、技能檢定 (無消耗)
        2. 然後是：簡單武器攻擊、戒心防備 (無消耗)
        3. 最後才是：法術、特殊能力 (有消耗 - 只在危急或必要時)
        
        ❌ 錯誤範例: 開場就「放火球術！」「召喚動物！」
        ✓ 正確範例: 「觀察敵人的弱點」「嘲諷敵人注意我」「找掩體躲避」

        === COMPANION SYNERGY (夥伴協同) ===
        If the character has a 'companion' or 'pet' in their data:
        1. **MUST** generate 1-2 additional options labeled \`[Synergy]\` (Option D/E).
        2. **Format**: \`🤝[協同] [Character Action] +[Companion Action]\`
        3. **Example**: \`🤝[協同] 我用劍格擋，夜語(烏鴉)啄擊敵人的眼睛\`
        4. Companion actions should complement the master (distraction, flanking, scouting).

        === OUTPUT FORMAT ===
        For EACH character, generate:
        1. A short monologue (15-20 chars, 繁體中文) - 反映角色當下的想法
        2. 3 Action Options (A, B, C):
           - **Option A (本能反應)**: 根據職業本能 - 優先無消耗行動
           - **Option B (策略選項)**: 更謹慎或策略性 - 環境/社交/技能檢定
           - **Option C (團隊/個性)**: 隨機選擇以下之一:
             - 🤝 合作：「和 [隊友名] 配合...」
             - 💡 建議：「對 [隊友名] 喊道：我覺得...」
             - 😤 抱怨：「對 [隊友] 表達不滿...」
             - 💬 閒聊：和隊友說些輕鬆的話
             - 🎭 個性行動：完全基於角色獨特個性
             - ☠️ 瀕死 (僅限 HP<=0): 「(虛弱地) ...」 或 「(內心) 我不想死...」
            - **Emoji Categories (必須在 text 開頭加入適合的 Emoji)**:
              - ⚔️ (近戰攻擊/打擊)
              - 🏹 (遠程攻擊/射擊)
              - 🪄 (施法/奧術能量)
              - 🔱 (神聖力量/祈禱/引導)
              - 🛡️ (防禦/保護/掩護)
              - 👤 (潛行/隱匿/暗殺)
              - 🎒 (使用道具/消耗品)
              - 🧪 (藥劑/鍊金/劇毒)
              - 💬 (說話/外交/威脅)
              - 🎭 (表演/欺騙/嘲諷)
              - 🔍 (調查/搜尋/洞察)
              - 🌿 (自然互動/生存/動物)
              - 🏃 (移動/撤退/閃避)
              - 🛠️ (工具/機關/拆解)
              - 🤝 (協助/配合隊友)
              - 💖 (治療隊友/支援)
              - 🩹 (自我治療/包紮)
              - 🆘 (危急/求救/急需治療)
              - 🩸 (血腥/狂暴/犧牲)
              - 🕯️ (儀式/宗教/博學)
              - 💀 (死亡/恐懼/死靈)
            - **Length**: 80-100 characters per option
            - **Format**: MUST use "[Emoji] [內心想法] 具體行動" format
            - **Language**: Traditional Chinese (繁體中文)

        **ENEMY NAMING RULE**:
        - 使用描述性稱呼：「那個手持長矛的傢伙」「最靠近的敵人」「看起來像首領的那個」
        - 只有在故事中明確提到敵人名字時才能使用名字

        **CRITICAL OUTPUT FORMAT:**
        Return ONLY a JSON Array. No markdown formatting.
        [
            {
                "id": "character_id",
                "monologue": "...",
                "options": [
                    { "type": "instinct", "emoji": "⚔️", "text": "⚔️ [內心想法] Option A Text..." },
                    { "type": "strategic", "emoji": "🔍", "text": "🔍 [內心想法] Option B Text..." },
                    { "type": "team", "emoji": "🤝", "text": "🤝 [內心想法] Option C Text..." }
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
                            { type: "instinct", emoji: "🔍", text: "🔍 保持警惕，觀察四周 (fallback)" },
                            { type: "professional", emoji: "⚔️", text: "⚔️ 準備好武器，隨時應戰 (fallback)" },
                            { type: "team", emoji: "🤝", text: "🤝 掩護隊友，等待指令 (fallback)" }
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
                    { type: "instinct", emoji: "🔍", text: "🔍 觀察局勢..." },
                    { type: "professional", emoji: "⚔️", text: "⚔️ 準備行動..." },
                    { type: "team", emoji: "🤝", text: "🤝 等待隊友..." }
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
 * Matches the visual style of existing 12 preset character assets.
 * CRITICAL: Keep prompt style consistent with portrait-generator.js
 * @param {object} data - Character data including name, race, class, gender, bio
 */
    generatePortraitUrl(data) {
        // Simple mapping for better prompt accuracy
        const raceMap = {
            "人類": "Human", "精靈": "Elf", "矮人": "Dwarf", "半身人": "Halfling",
            "龍裔": "Dragonborn", "提夫林": "Tiefling", "半獸人": "Half-Orc", "侏儒": "Gnome",
            "卓爾": "Drow", "半精靈": "Half-Elf", "阿斯莫": "Aasimar", "機人": "Warforged",
            "哥布林": "Goblin", "吸血鬼": "Vampire", "貓人": "Tabaxi", "吉斯洋基人": "Githyanki"
        };
        const classMap = {
            "戰士": "Fighter", "法師": "Wizard", "牧師": "Cleric", "遊蕩者": "Rogue",
            "野蠻人": "Barbarian", "吟遊詩人": "Bard", "德魯伊": "Druid", "武僧": "Monk",
            "聖武士": "Paladin", "遊俠": "Ranger", "術士": "Sorcerer", "邪術師": "Warlock",
            "奇械師": "Artificer", "死靈法師": "Necromancer", "魔劍士": "Spellblade"
        };
        const genderMap = {
            "男": "Male", "女": "Female", "男性": "Male", "女性": "Female"
        };

        // Racial visual hints for consistency
        const racialHints = {
            'Elf': 'pointed ears, angular features, no facial hair',
            'Drow': 'dark grey skin, white hair, pointed ears',
            'Tiefling': 'large curved horns, tail, unusual skin color',
            'Dragonborn': 'draconic head, snout, scales, no hair',
            'Dwarf': 'stout, muscular, braided hair or beard',
            'Half-Orc': 'grayish skin, visible tusks, muscular',
            'Aasimar': 'glowing skin, divine aura, beautiful features',
            'Githyanki': 'yellow-green skin, gaunt features'
        };

        const enRace = raceMap[data.race] || data.race || "Fantasy Hero";
        const enClass = classMap[data.class] || data.class || "Adventurer";
        const enGender = genderMap[data.gender] || "Hero";
        const raceHint = racialHints[enRace] || "";

        // Use appearance if available, otherwise generate from data
        const appearance = data.appearance || `${enGender} ${enRace} ${enClass}, ${data.personality || "heroic adventurer"}`;

        // American comic book style with D&D elements + quality keywords
        const prompt = `Dungeons and Dragons character portrait, American comic book art style, Marvel DC comics illustration, western superhero comic coloring, cell shaded, thick black outlines, flat bold colors, no gradients, no anime, ${enGender} ${enRace} ${enClass}, ${appearance}, ${raceHint}, heroic pose, fantasy medieval setting background, dramatic clouds, vibrant saturated colors, professional tabletop RPG art, D&D 5e official art style, Pathfinder illustration, three-quarter body shot, showing head to knees, high quality, highly detailed, sharp lines, clean artwork, professional illustration, 4k resolution`;

        const encodedPrompt = encodeURIComponent(prompt);
        // Use character name hash for consistent seed (same character = same image)
        const nameHash = (data.name || "hero").split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        const seed = nameHash % 10000;

        return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
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
        Generate a COMPLETE character JSON object in Traditional Chinese (繁體中文). NO ENGLISH in text fields (except appearance).
        
        [REQUIREMENTS - 必須全部填寫]
        - **Race/Class**: Use standard D&D 5e (or standard fantasy types).
        - **Stats**: Standard Point Buy array (15, 14, 13, 12, 10, 8) arranged suitably for the class.
        
        [FIELD REQUIREMENTS - 每個欄位必須按規範填寫]
    - **name**: 西方奇幻風格名字 (中文音譯) e.g. "艾瑞克·鐵心 (Eric Ironheart)", "莉雅·月影 (Lyra Moonshadow)", "索爾·雷霆 (Thor Thunder)"
      - 使用西方奇幻名字，不要使用東方名字
      - 名字可以包含姓氏或綽號
      - 中文部分為音譯或意譯
        - **race**: 標準 D&D 種族 (人類/精靈/矮人/半精靈/半獸人/龍裔/提夫林/侏儒/哈比人)
        - **class**: 標準 D&D 職業 (戰士/法師/牧師/遊蕩者/野蠻人/吟遊詩人/德魯伊/武僧/聖武士/遊俠/術士/邪術師)
        - **gender**: Male 或 Female
        - **alignment**: 九宮陣營 (守序善良/中立善良/混亂善良/守序中立/絕對中立/混亂中立/守序邪惡/中立邪惡/混亂邪惡)
        - **background**: D&D 背景 (侍僧/罪犯/藝人/民俗英雄/公會工匠/隱士/貴族/化外之民/賢者/士兵/流浪兒/騙子)
        - **hp/maxHp**: 根據職業 Hit Die 計算 (野蠻人 d12=15, 戰士/聖武士/遊俠 d10=12, 其他武職 d8=11, 施法者 d6=9)
        - **skills**: 2-4 個訓練技能 (中文)
        - **feats**: 1-2 個專長或職業特性 (中文)
        - **spells**: 施法者必須包含 3-5 個 1 環法術 (中文名稱)，非施法者留空陣列
        - **slots**: 施法者必須包含 { "1": 2 }，非施法者留空
        - **personality**: 50-80 字個性描述
        - **monologue**: 1-2 句內心獨白
        - **bio**: 100-150 字背景故事
        - **appearance**: **CRITICAL** English visual description (for portrait generation)
        
        [INVENTORY REQUIREMENTS - 裝備必須匹配職業]
        - **equipment**: 
          - 武器 (戰士/野蠻人: 巨劍/巨斧, 法師: 法杖, 遊俠: 長弓+短劍, 盜賊: 細劍+短弓)
          - 防具 (輕甲/皮甲/鎖甲/鱗甲 根據職業)
          - 背包 (探險家背包/施法材料包/盜賊工具 等)
        - **consumables**: 口糧 x5, 火把 x2, 治療藥水
        - **magicItems**: 初始角色留空 []
        - **gold**: 10-15 金幣

        [APPEARANCE STYLE GUIDE - ENGLISH ONLY]
        Format: [Physical Traits], [Equipment], [Expression/Pose], [Atmosphere/Aura]
        
        Example (Barbarian):
        "Pale blue translucent skin, white hair floating as if underwater, glowing white eyes, muscular build, tribal tattoos, carrying a massive greataxe, gust of wind swirling around."

        [OUTPUT FORMAT - 嚴格 JSON]
        {
            "name": "中文名 (English)",
            "race": "種族",
            "class": "職業",
            "gender": "Male/Female",
            "alignment": "陣營",
            "background": "背景",
            "hp": 12, 
            "maxHp": 12,
            "baseStats": { "str": 15, "dex": 14, "con": 13, "int": 12, "wis": 10, "cha": 8 },
            "skills": ["技能1", "技能2"],
            "feats": ["專長1"],
            "spells": ["法術1", "法術2"],
            "slots": { "1": 2 },
            "personality": "個性描述...",
            "monologue": "內心獨白...",
            "bio": "背景故事...",
            "appearance": "English physical description...", 
            "inventory": {
                "equipment": ["武器", "防具", "背包"],
                "consumables": ["口糧 (1日) x5", "火把 x2", "治療藥水"],
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
        - "時間倒流 (每幕一次)"
        - "魔人之臂 (高傷害但傷害自身)"
        - "靈視 (可見幽靈與秘密)"

        [CRITICAL OUTPUT RULES]
        - ALL OUTPUT MUST BE IN TRADITIONAL CHINESE (繁體中文) ONLY!
        - DO NOT include any pinyin romanization (e.g., NO "Yīngxióng", NO "Jùběn")
        - DO NOT include English translations in parentheses
        - Names and descriptions should be purely in Chinese characters

        [OUTPUT FORMAT JSON]
        [
            {
                "id": "ability_1",
                "name": "能力名稱",
                "description": "純繁體中文的敘述描述。",
                "effect": "純繁體中文的機制效果描述。"
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
