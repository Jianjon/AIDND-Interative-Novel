
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIService } from "../services/AIService";
import { PersonaService } from "../services/PersonaService";
import { CLASS_BEHAVIORS } from "../data/classBehaviors";
import { formatModuleContext } from "../data/modules_data.js";
import { CHARACTER_MBTI, getInteractionPhrase } from "../data/mbtiCompatibility.js";
import { COMBAT_STYLES } from "../data/combatStyles.js";


export class CharacterManagerAgent {
    constructor(options = {}) {
        this.aiService = new AIService(options);
        this.personaService = new PersonaService();
    }

    async _generate(prompt, retries = 2, isJson = true) {
        try {
            // AIService handles retries internally, but we can pass maxRetries if we want strictly 2
            const result = await this.aiService.generate(prompt, {
                model: "gemini-2.0-flash",
                maxRetries: retries,
                isJson: isJson
            });

            return {
                text: result.text,
                usage: result.usage
            };
        } catch (error) {
            console.error("[CharacterManager] Generation Failed (Final):", error);
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

        const mbti = characterData.mbti || CHARACTER_MBTI[characterData.id] || "Unknown";
        const styleInstruction = this.personaService.getSpeechInstruction(personalityKey, contextType, mbti);

        const prompt = `
        You are the **Character Manager** (Dialogue Stylist).
        **CRITICAL: ALL TEXT OUTPUT MUST BE IN TRADITIONAL CHINESE (繁體中文 - 台灣正體). NO SIMPLIFIED CHINESE. NO ENGLISH.**
        **嚴格遵守：所有輸出內容必須使用繁體中文（台灣習慣）。絕對禁止出現簡體中文。**
        角色: ${characterName}
        種族: ${characterData.race || "人類"}
        職業: ${characterData.class}
        個性: ${characterData.personality}
        第一印象: ${characterData.firstImpression || "無"}
        行為習慣: ${JSON.stringify(characterData.habits || [])}
        偏見: ${JSON.stringify(characterData.prejudices || {})}
        喜好: ${JSON.stringify(characterData.preferences || {})}
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
            const result = await this._generate(prompt, 2, false); // isJson = false for dialogue
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
     * @param {Object} signals Pace/Threat signals
     * @param {String} moduleId Module ID
     * @param {Number} currentAct Act number
     * @param {Array} groupOptions Group options
     * @param {Array} activeEnemies List of alive enemies
     * @param {Boolean} forcePlotPush Mandatory story advancement flag
     * @returns {Promise<{results: Object, usage: Object}>} { results, usage }
     */
    async generateOptions(roster, worldState, lastNarrative, previousOutcome, signals = {}, moduleId = null, currentAct = 1, groupOptions = [], activeEnemies = [], forcePlotPush = false) {
        groupOptions = groupOptions || []; // Safety check for null
        console.log(`[CharacterManager] Generating Options for ${roster.length} chars (BATCHED)...`);

        const { threat_level, pacing_signal, mechanical_opportunity } = signals;
        const plotContext = moduleId ? formatModuleContext(moduleId, currentAct) : '';

        // Format Enemy List
        const enemyListStr = activeEnemies.length > 0
            ? activeEnemies.map(e => `- ${e.name} (HP: ${e.hp}/${e.maxHp})`).join('\n')
            : "None (Combat Ended or No Enemies)";

        // 1. Construct Batched Context
        const charSummaries = roster.map(c => {
            const cls = c.class;
            const behaviors = CLASS_BEHAVIORS[cls] || CLASS_BEHAVIORS["戰士"];
            const mbti = CHARACTER_MBTI[c.id] || c.mbti || "Unknown";
            const styleKey = c.decisionBias || "DEFAULT";
            const styleContext = COMBAT_STYLES[styleKey] || COMBAT_STYLES["DEFAULT"];

            // Filter impactful relationships
            const relations = c.relationships || {};
            const importantBonds = Object.entries(relations)
                .filter(([_, rel]) => rel.affinity >= 60 || rel.bondState === 'LOVER' || rel.bondState === 'BONDED')
                .map(([tid, rel]) => `${rel.targetName || tid}: ${rel.bondState} (${rel.affinity})`)
                .join(", ");

            // Analyze High Stats and Skills
            const stats = c.baseStats || {};
            const highStats = Object.entries(stats)
                .filter(([_, val]) => val >= 14)
                .map(([key, val]) => `${key.toUpperCase()}: ${val}`)
                .join(", ");
            const skills = Array.isArray(c.skills) ? c.skills.join(", ") : (c.skills || "None");

            return `
            - ID: ${c.id}
              Name: ${c.name} (${c.race} ${c.class})
              HP: ${c.hp || "Unknown"}
              Personality: ${c.personality}
              First Impression: ${c.firstImpression || "N/A"}
              Habits: ${JSON.stringify(c.habits || [])}
              Prejudices: ${JSON.stringify(c.prejudices || {})}
              Preferences: ${JSON.stringify(c.preferences || {})}
              MBTI: ${mbti}
              Tone Guidelines: ${this.personaService.getMBTIToneInstruction(mbti)}
              Combat Style: ${styleContext.name} (${styleContext.instruction || "Follow personality"})
              Bio: ${c.bio ? c.bio.substring(0, 150) + "..." : "Unknown"}
              Companion: ${c.companion ? JSON.stringify(c.companion) : "None"}
              Significant Bonds: ${importantBonds || "None"}
              Key Skills: ${skills}
              High Stats: ${highStats || "None"}
              Combat Weakness: ${JSON.stringify(c.combatWeakness || "None")}
              Behaviors: [Instinct: ${behaviors.instinct}, Professional: ${behaviors.professional}, Team: ${behaviors.team}]
              Available Consumables: ${(c.consumables && c.consumables.length > 0) ? c.consumables.join(', ') : 'None — do NOT suggest using items that don\'t exist'}
              Equipment: ${(c.equipment && c.equipment.length > 0) ? c.equipment.join(', ') : 'Standard gear'}
            `;
        }).join("\n");

        const groupOptionsSection = groupOptions.length > 0
            ? `=== GROUP DECISION (團隊抉策) ===
               The DM has proposed the following group paths. You MUST include these options as available actions for relevant characters:
               ${groupOptions.map((opt, i) => `Option ${i + 1}: ${opt}`).join("\n")}
               `
            : "";

        const isRegenerate = previousOutcome === "Regenerate Request";
        const regenerationInstruction = isRegenerate
            ? "**REGENERATE REQUEST**: 玩家不滿意之前的選項。請提供與之前完全不同的策略、目標或行動類型。避免重複相同的戰術。"
            : "";

        const prompt = `
        You are a D&D Character Perspective Engine.
        Generate action options for the SPECIFIED characters based on their INDIVIDUAL PERSPECTIVE.
        
        === CHARACTERS TO PROCESS (必須且僅限處理這些角色) ===
        ${charSummaries}

        **CRITICAL CONSTRAINTS (絕對指令)**:
        1. **IDENTITY MATCHING**: Generate options ONLY for the characters listed above by ID and Name.
        2. **NO HALLUCinations**: Do NOT generate options for "Thorin", "Bella", "Kalin" or ANY other names unless they appear in the [CHARACTERS TO PROCESS] list above.
        3. **STRICT LIMIT**: If the list above contains only 1 character, you MUST return an array of length 1. Do NOT include other party members from the story history.
        4. **ID CONSISTENCY**: Use the EXACT "ID" provided in the list (e.g., "preset_bard") as the "id" field in your JSON output.

        ${regenerationInstruction}

        === SCENE CONTEXT ===
        World State: ${JSON.stringify(worldState)}
        Threat Level: ${threat_level || "Unknown"}
        Pacing: ${pacing_signal || "Normal"}
        Story So Far: ${lastNarrative.slice(-2000)}
        Active Enemies: ${enemyListStr}
        ${plotContext ? `Plot Goal: ${plotContext}` : ''}

        ${groupOptionsSection}

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

        **3. EMOTIONAL STATE & MBTI**
        - 考慮角色在當下可能的情緒：緊張、恐懼、憤怒、興奮、困惑
        - 參考 MBTI 類型決定互動風格 (e.g. ESTP 衝動, ISTJ 謹慎, ENFP 熱情)
        - 有些角色可能會恐慌做出非理性的選擇
        - 有些角色可能會過度自信
        - 讓選項反映這些情緒與性格特質

        **4. COMBAT MANDATE (戰鬥指令 - IMPORTANT)**
        - **CHECK**: Look at "Active Enemies" above.
        - **IF ENEMIES EXIST (activeEnemies is NOT "None")**:
          - **Option A MUST** be a direct physical or magical attack against an enemy from the list.
          - **Option B MUST** be a tactical combat maneuver (Feat/Skill) against an enemy.
          - **Option C** can be support/environment.
          - **PROHIBITION**: Do NOT generate "Search corpses" or "Relax" options if enemies are still alive. You must FIGHT or FLEE.

        **4. CLASS-APPROPRIATE ACTIONS (職業相符)**
        - 牧師會關心隊友的傷勢
        - 吟遊詩人可能嘗試談判或嘲諷

        **5. COMBAT STYLE & CONFLICT (戰鬥風格與衝突)**
        - 如果角色的 [Combat Style] 與其 [Personality] 衝突（例如：膽小的角色被要求「全面進攻」）：
          1. **Monologue**: 必須表現出猶豫、為難、恐懼或被情勢所迫的心情。
          2. **Action Text**: 在括號內描述動作的遲疑或是心理負擔。例如：「(咬著牙，顫抖著向前跑) ...」
        - 如果風格相符：展現出得心應手、自信或狂熱。
        - **DEFAULT** 選項應始終反映角色的最基本本性。

        **6. COMBAT WEAKNESS (戰鬥弱點)**
        - 如果當前場景情境 (Scene Context) 觸發了角色的 [Combat Weakness] (例如：怕黑的角色在黑暗中，或是面對特定敵人)：
          1. **Priority**: 角色應優先選擇防禦、躲避、逃跑或排除該弱點源的行動。
          2. **Tone**: 選項的描述必須體現出該角色的心理陰影、焦慮或生理反應。
          2. **Tone**: 選項的描述必須體現出該角色的心理陰影、焦慮或生理反應。
          3. **Monologue**: 必須包含該弱點引發的具體負面自白（如「救命...我最討厭蟲子了...」）。

        **7. SPECIALIST INTERVENTION (專家干預 - 推進劇情)**
        - **檢測高難度阻礙**: 如果 Narrative 描述了某個需要特定能力的阻礙 (例如: "充滿古老符文的門" -> Arcana/Int, "巨大的岩石擋路" -> Athletics/Str, "隱秘的足跡" -> Survival/Wis)。
        - **主動回應**: 如果該角色擁有對應的 **Key Skills** 或 **High Stats**，**必須** 生成一個利用該專長的「主動解決問題」選項。
        - **堅持不懈 (Persistence)**: 如果之前的結果顯示挑戰尚未解決 (Previous Outcome !== Success)，該專家角色應繼續嘗試新的方法或更深入的檢定，直到問題解決。不要輕易放棄。
        - **描述**: 在選項中明確描述運用該能力的方式。例如：「[專家] 研究符文結構，試圖尋找破解法」或「[專家] 用肩膀頂住巨石，嘗試將其推開」。

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
        
        ${forcePlotPush || signals.stagnation_detected ? `
        **LOOP BREAKER (迴圈打破者 - 強制推進)**:
        - 當前劇情似乎陷入停滯或迴圈。
        - **任務**: 每個角色必須提供至少一個「打破現狀」的選項。
        - **方式**: 
          1. **主動聯絡/爭吵**: 與隊友發生激烈的對話、分歧或達成共識 (e.g. "我們不能再等了，[隊友名]，跟我來！")
          2. **冒險行動**: 不顧危險地衝向新地點、觸發機關、或向 NPC 發起挑戰。
          3. **環境破壞**: 燒掉擋路的門、炸開牆壁、或大聲呼喊引誘敵人出來。
        - **語氣**: 選項描述應展現出「焦躁」「果斷」或「靈光一閃」的特質。
        ` : ""}

        [VALID TARGETS / ALIVE ENEMIES]
        ${enemyListStr}
        
        ** TARGETING RULES **:
        1. **STRICTLY PROHIBITED**: Do NOT generate attack options against enemies NOT listed above.
        2. If "None", combat is over. Do NOT generate attack options. Focus on looting, resting, or moving.
        3. If an enemy name in narrative is NOT in this list, they are DEAD. Do not attack them.

        ${groupOptions.length > 0 ? `
        === GROUP OPTION SELECTION ===
        - 將提供的 GROUP DECISION 選項整合進角色的行動中。
        - 每個角色不一定要包含所有團隊選項，但整體而言，這些選項必須在隊伍中可見。
        - 團隊選項的文字應該反映角色的個性，例如：「[團隊方案1] 米洛點了點頭：這主意不錯，我帶路！」
        - **IMPORTANT**: For any option that corresponds to a GROUP DECISION, set "isGroup": true in the JSON.
        ` : ''}

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
        1. **MUST** generate a 4th option: "Option D" labeled \`[Companion Order]\`.
        2. **Format**: \`Option D (夥伴指令): 🐾 [Type] [Action]\`
        3. **Example**: \`🐾 [內心] 我需要支援... 指揮[夥伴名]攻擊敵人的弱點\`
        4. Companion actions should provide mechanical benefits (Help/Advantage) or independent attacks.
        5. **CRITICAL**: ID for this option MUST be \`\${character.id}_companion\`.

        === OUTPUT FORMAT ===
        For EACH character, generate:
        1. A short monologue (15-20 chars, 繁體中文) - 反映角色當下的想法
        2. 4 Action Options (A, B, C, D) - If NO companion, only 3 options (A, B, C):
           - **Option A (核心風格/高優先)**: (70% 機率) 反映角色最典型的戰鬥/行為風格。
             - 例如：和平主義者優先「防禦/治療/勸阻」；狂戰士優先「蠻力攻擊」。
             - 這是角色「最想做」的事，符合其 Bio 和 Class。
           - **Option B (策略變通/技能應用)**: 針對戰場優勢或特殊挑戰。
              - **MANDATORY SKILL/FEAT**: 此選項 **必須** 明確引用角色的 [Skills], [Feats], [Spells], 或 [Abilities] 中的 **一項具體能力**。
              - **禁止泛泛而論**: 不可只寫「攻擊敵人」或「施放法術」。必須寫出能力名稱。
              - **格式範例**:
                - ✓ 正確：「🪄 [策略] 施放 **護盾術 (Shield)** 抵擋這波攻擊！」
                - ✓ 正確：「👤 [狡詐] 使用 **靈巧閃避 (Cunning Action: Disengage)** 脫離戰鬥並重新定位」
                - ✓ 正確：「⚔️ [猛擊] 發動 **巨武大師 (Great Weapon Master)** -5命中換取+10傷害！」
                - ✗ 錯誤：「攻擊敵人」「施放法術」「使用技能」（太模糊）
              - **多樣性規則**: 若玩家選擇重新生成 (Regenerate)，此選項必須嘗試使用 *不同* 的技能或戰術。
           - **Option C (團隊協作/個性變體)**: 隨機選擇並整合以下元素:
             - 🤝 **Teamwork**: 明確描述如何與隊友配合 (e.g., "使用 [Help] 動作協助 [隊友名]", "為 [隊友名] 製造夾擊機會").
             - 💡 **Skill Check**: 主動提議進行檢定 (e.g., "我用 [Arcana] 分析這個法陣...", "我用 [Perception] 尋找掩體...").
             - 😤 **Roleplay**: 展現特定的 Habits, Prejudices, 或 Monologue.
             - ☠️ **Survival**: (HP < 30%) 尋求治療或撤退。
           - **Option D (夥伴指令)**: **ONLY IF** Character has a Companion.
             - 🐾 指揮夥伴進行偵查、協助、或攻擊。
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
        1. Return ONLY a JSON Array. No markdown formatting.
        2. **VERIFICATION**: You MUST verify that the \`id\` you use matches the \`name\` of the character provided in the input. Do NOT mix up characters.
        [
            {
                "id": "EXACT_ID_FROM_CONTEXT",
                "name": "CHARACTER_NAME_FOR_VERIFICATION",
                "monologue": "...",
                "options": [
                    { "type": "instinct", "emoji": "⚔️", "text": "⚔️ [內心想法] Option A Text...", "isGroup": false },
                    { "type": "strategic", "emoji": "🔍", "text": "🔍 [內心想法] Option B Text...", "isGroup": false },
                    { "type": "team", "emoji": "🤝", "text": "🤝 [內心想法] Option C Text...", "isGroup": true }
                ]
            },
            ...
        ]
        `;

        try {
            const result = await this._generate(prompt);
            let text = result.text;

            // Robust JSON Extraction
            const jsonStart = text.indexOf('[');
            const jsonEnd = text.lastIndexOf(']');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                text = text.substring(jsonStart, jsonEnd + 1);
            }

            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch (e) {
                console.warn("[CharacterManager] JSON Parse Failed, attempting cleanup...", text);
                // Last ditch effort: remove trailing commas
                text = text.replace(/,\s*\]/g, ']');
                parsed = JSON.parse(text);
            }

            // Validation & Fallback Map
            const validResults = parsed.map(item => {
                // Ensure ID matches a character in roster (Loose matching)
                let char = roster.find(c => String(c.id) == String(item.id));

                // Fallback: Try to match by name/alias if ID fails or is missing
                if (!char) {
                    // Try to find name in the item object if ID is missing
                    const possibleName = item.name || item.id || "";
                    if (!possibleName) return null;

                    char = roster.find(c => {
                        const nameLower = c.name.toLowerCase();
                        const targetLower = String(possibleName).toLowerCase().trim();
                        // Handle "(English Name)" format
                        const englishNameMatch = nameLower.match(/\((.*?)\)/);
                        const englishName = englishNameMatch ? englishNameMatch[1] : "";

                        return nameLower.includes(targetLower) || targetLower.includes(nameLower) || (englishName && targetLower.includes(englishName));
                    });
                }

                if (!char) {
                    // Fallback 2: Try to match by Race/Class
                    char = roster.find(c => {
                        const targetLower = String(item.id || item.name || "").toLowerCase();
                        const raceLower = (c.race || "").toLowerCase();
                        const classLower = (c.class || "").toLowerCase();
                        return targetLower.includes(raceLower) && targetLower.includes(classLower);
                    });
                }

                // Fallback 3: Index Matching
                if (!char && parsed.length === roster.length) {
                    const idx = parsed.indexOf(item);
                    if (idx !== -1 && idx < roster.length) {
                        char = roster[idx];
                        console.log(`[CharacterManager] ID Fallback: Matched by index ${idx}`);
                    }
                }

                if (!char) {
                    console.warn(`[CharacterManager] ID Mismatch: Generated '${item.id}'/'${item.name}' not found in roster`, roster.map(c => c.id));
                    return null;
                }

                // FORCE the correct ID
                item.id = char.id;

                // Ensure options exist
                if (!item.options || !Array.isArray(item.options) || item.options.length < 3) {
                    console.warn(`[CharacterManager] Malformed Options for ${item.id}`, item.options);
                    return {
                        id: item.id,
                        monologue: item.monologue || "...",
                        options: [
                            { type: "instinct", emoji: "🔍", text: "🔍 保持警惕，觀察四周" },
                            { type: "professional", emoji: "⚔️", text: "⚔️ 準備好武器，隨時應戰" },
                            { type: "team", emoji: "🤝", text: "🤝 掩護隊友，等待指令" }
                        ]
                    };
                }
                return item;
            }).filter(Boolean);

            // CRITICAL CHECK: Ensure we have options for ALL requested characters
            // If any are missing, generate defaults for them.
            // AND if they have companions, ensure Option D exists.
            const finalResults = [...validResults];
            roster.forEach(char => {
                let existingRes = finalResults.find(r => r.id === char.id);

                if (!existingRes) {
                    // Case 1: AI completely missed this character
                    console.warn(`[CharacterManager] Missing options for ${char.name}, generating default.`);
                    const defaultOptions = [
                        { type: "instinct", emoji: "🔍", text: "🔍 觀察局勢..." },
                        { type: "professional", emoji: "⚔️", text: "⚔️ 準備行動..." },
                        { type: "team", emoji: "🤝", text: "🤝 等待隊友..." }
                    ];

                    if (char.companion) {
                        defaultOptions.push({
                            type: "companion",
                            emoji: "🐾",
                            text: `🐾 [夥伴] 指揮 ${char.companion.name || "夥伴"} 協助作戰`,
                            id: `${char.id}_companion`
                        });
                    }

                    finalResults.push({
                        id: char.id,
                        monologue: "...",
                        options: defaultOptions
                    });
                } else {
                    // Case 2: AI returned options, but might have missed Companion Option
                    if (char.companion) {
                        const hasCompanionOpt = existingRes.options.some(opt =>
                            (opt.type && opt.type === 'companion') ||
                            (opt.text && (opt.text.includes('夥伴') || opt.text.includes(char.companion.name)))
                        );

                        if (!hasCompanionOpt) {
                            console.log(`[CharacterManager] Force-Injecting Option D for ${char.name}`);
                            existingRes.options.push({
                                type: "companion",
                                emoji: "🐾",
                                text: `🐾 [夥伴] 指揮 ${char.companion.name || "夥伴"} 協助作戰`,
                                id: `${char.id}_companion`
                            });
                        }
                    }
                }
            });


            return { results: finalResults, usage: result.usage };

        } catch (error) {
            console.error("[CharacterManager] Batch Generation Failed:", error);
            // Fallback: Return empty/basic options for all to prevent crash
            const fallbackResults = roster.map(c => {
                const opts = [
                    { type: "instinct", emoji: "🔍", text: "🔍 觀察局勢..." },
                    { type: "professional", emoji: "⚔️", text: "⚔️ 準備行動..." },
                    { type: "team", emoji: "🤝", text: "🤝 等待隊友..." }
                ];
                if (c.companion) {
                    opts.push({
                        type: "companion",
                        emoji: "🐾",
                        text: `🐾 [夥伴] 指揮 ${c.companion.name || "夥伴"} 協助作戰`
                    });
                }
                return {
                    id: c.id,
                    monologue: "...",
                    options: opts
                };
            });

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
        - **mbti**: MBTI 性格類型 (e.g. INFP, ENTJ)
        - **firstImpression**: 20-40 字的第一印象描述 (對方第一眼看到該角色的感覺)
        - **habits**: 2-3 個行為習慣 (陣列)
        - **prejudices**: 該角色對特定事物的偏見 (物件格式)
        - **preferences**: 喜好與厭惡 (物件: { likes: [], dislikes: [] })
        - **emotionalKeys**: 情緒觸發點 (物件: { joy: [], anger: [], weakness: "內心最脆弱的一面" })
        - **combatWeakness**: 戰鬥弱點 (物件: { triggers: [{type, target, description}], reaction: "觸發時的反應描述" })
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
        - **companion** (Optional): 
          - 若職業為 Ranger(遊俠), Druid(德魯伊), Artificer(奇械師), Warlock(邪術師 pact of chain), 或 Prompt 中明確提到有寵物/夥伴，**必須**生成此物件。
          - 否則留空或移除此欄位。
          - Format: { 
              "name": "夥伴名", 
              "type": "動物種類 (e.g. 狼, 梟熊, 機械狗)", 
              "hp": 20, "maxHp": 20, "ac": 13, 
              "attacks": [{ "name": "攻擊名", "hitBonus": 4, "damage": "1d6+2" }], 
              "abilities": ["特技1"], 
              "avatar": "Leave empty for AI to generate later" 
            }

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
            "mbti": "INTJ",
            "firstImpression": "第一印象描述...",
            "habits": ["習慣1", "習慣2"],
            "prejudices": { "對特定職業": "偏見描述" },
            "preferences": {
                "likes": ["喜歡1", "喜歡2"],
                "dislikes": ["討厭1", "討厭2"]
            },
            "emotionalKeys": {
                "joy": ["喜悅1"],
                "anger": ["憤怒1"],
                "weakness": "脆弱點"
            },
            "combatWeakness": {
                "triggers": [
                    { "type": "ENEMY_TYPE", "target": "目標", "description": "描述" }
                ],
                "reaction": "反應描述"
            },
            "bio": "背景故事...",
            "appearance": "English physical description...", 
            "inventory": {
                "equipment": ["武器", "防具", "背包"],
                "consumables": ["口糧 (1日) x5", "火把 x2", "治療藥水"],
                "magicItems": [],
                "gold": 10
            },
            "companion": {
                "name": "Name",
                "type": "Type",
                "hp": 20,
                "maxHp": 20,
                "ac": 13,
                "attacks": [],
                "abilities": [],
                "avatar": ""
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

            // GENERATE COMPANION AVATAR (If exists)
            if (data.companion) {
                // Heuristic for companion portrait prompt
                const compType = data.companion.type;
                const compName = data.companion.name;
                const compPrompt = `D&D fantasy creature portrait, ${compType}, cute but dangerous, ${compName}, american comic book style, high quality illustration`;
                const compEncoded = encodeURIComponent(compPrompt);
                const compSeed = (compName || "pet").split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 10000;
                data.companion.avatar = `https://image.pollinations.ai/prompt/${compEncoded}?width=512&height=512&seed=${compSeed}&nologo=true&model=flux`;
            }

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
