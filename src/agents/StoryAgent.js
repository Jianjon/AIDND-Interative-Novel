import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatModuleContext, getActInfo } from '../data/modules_data.js';


// LOCKED BY USER REQUEST (2025-12-10). DO NOT EDIT WITHOUT EXPLICIT PERMISSION.
// UPDATED 2025-12-15: Added encounter balance integration (user-approved)
/**
 * StoryAgent.js: The Narrator
 * Responsible for generating immersive prose and dialogue.
 * Strictly forbidden from handling game mechanics (HP, dice, inventory).
 */
export class StoryAgent {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });
    }

    /**
     * Generates the next segment of the story.
     * @param {Object} context - The current state context.
     * @param {string} context.moduleTitle - Current adventure module.
     * @param {string} context.currentLocation - Current location string.
     * @param {string} context.lastLog - The previous narrative log (for continuity).
     * @param {string} context.tone - 'relaxed', 'normal', or 'grim'.
     * @param {string} context.pacing - 'fast' or 'slow'.
     * @param {string} context.mode - 'novel' or 'trpg'.
     * @param {Array} context.party - Party member names for TRPG mode.
     * @param {string} context.encounterGuidelines - CR balance guidelines.
     * @param {string} userAction - The player's input action.
     * @returns {Promise<string|object>} The generated narrative text (Markdown) or structured TRPG turn.
     */
    async generateNarrative(context, userAction) {
        const { moduleTitle, currentLocation, lastLog, tone, pacing, gmSignals, mode = 'novel', party = [], isPrologue = false, moduleId = null, currentAct = 1, encounterGuidelines = '', difficultyTier = '初階 (Beginner)' } = context;

        // Generate module plot context if available
        const plotContext = moduleId ? formatModuleContext(moduleId, currentAct) : '';


        const TONE_PROMPTS = {
            // ========== NOVEL MODE (敘事模式) ==========
            // 重點: 故事品質、角色發展、文學性
            // 核心原則: 主角是故事的靈魂，不應輕易死亡

            relaxed: `STYLE: 輕小說風格 (Casual/Light Novel)
                ** 敘事重點 **: 幽默、角色互動、樂觀正向、熱血動漫般的冒險
                ** 死亡規則 **: 
                - 主角群體 **絕對不會死亡**
                - 危機時刻總有戲劇性逆轉 (友情爆發、隱藏力量覺醒、意外救援)
                - 失敗只會帶來暫時挫折，不會終結故事
                - 反派可能「戰敗」但很少真正死亡 (可能在後續回歸)
                ** 寫作風格 **:
                - 輕快的對話、角色吐槽、誇張的情緒表現
                - 「帥氣法則」優先於邏輯合理性
                - 避免沉重的死亡場景，保持輕鬆愉快的氛圍`,
            normal: `STYLE: 正統奇幻史詩 (Classic Epic Fantasy)
                ** 敘事重點 **: 史詩格局、優美文字、嚴肅但充滿驚奇
                ** 死亡規則 **:
                - 主角群在故事前期 **不會死亡**
                - 配角可能因劇情需要犧牲 (但要有意義、有尊嚴)
                - 主角若瀕死，會有戲劇性的生死關頭場景
                - 只有在故事高潮/結局附近，主角死亡才可能發生 (且必須壯烈)
                ** 寫作風格 **:
                - 平衡動作與描寫，英雄主義基調
                - 像托爾金、R.A. Salvatore 的經典奇幻
                - 死亡場景要有重量感和情感衝擊`,
            grim: `STYLE: 黑暗寫實 (Grimdark)
                ** 敘事重點 **: 壓抑、危險、勝利伴隨代價
                ** 死亡規則 **:
                - 主角群 **可能會死**，但死亡必須服務敘事
                - 死亡應該有預兆、有意義、有情感重量
                - 不會無謂地「隨機死亡」，而是因為決策後果
                - 倖存者會背負傷痕和心理創傷
                ** 寫作風格 **:
                - 參考《權力遊戲》、《黑暗靈魂》
                - 魔法令人畏懼、世界古老而無情
                - 勝利從不廉價，每一場勝利都有代價`,

            // TRPG Mode DM Styles
            guide: `DM PERSONA: 慈愛導師 (The Benevolent Guide)
                Main Goal: 確保隊伍能順利體驗完整故事。
                ** 第一角色不死規則 **:
                - 隊伍中的第一位角色 (隊長) 永遠不會真正死亡
                - 若 HP 降至 0，必須提供合理的戲劇性解釋 (盟友及時救援、敵人留活口、奇蹟恢復等)
                - 下一回合該角色會以少量 HP 回歸 (1d6+1 HP)
                - 其他隊員仍可正常死亡，但會盡量給予逃生機會
                ** 行為規則 **:
                - 敵人不會集火、不會攻擊倒地目標
                - 適時給予劇情提示，避免玩家卡關
                - 「失敗前進」: 失敗不會終結故事，而是帶來新的挑戰`,
            arbiter: `DM PERSONA: 公正裁判 (The Fair Arbiter)
                Main Goal: 中立公正的模擬，骰子決定一切。
                ** 公正規則 **:
                - 嚴格遵守 D&D 5e 規則，不會暗中修改結果
                - 智慧的戰術會獲得獎勵，錯誤決策會有代價
                - 世界會真實地回應玩家的選擇
                - 敵人會使用合理的戰術 (但不會刻意針對)
                ** 死亡規則 **:
                - 角色可以正常死亡 (HP 0 + 3 次死亡豁免失敗)
                - 提供公平的復活機會 (隊友救援、神廟、NPC 等)`,
            ruthless: `DM PERSONA: 冷酷無情 (The Ruthless Executioner)
                Main Goal: 極限挑戰，只有戰術卓越的玩家能生存。
                ** 致命規則 **:
                - 敵人使用最優策略 (集火弱者、補刀倒地目標、利用掩護)
                - 陷阱致命、資源稀缺、環境危險
                - 每場戰鬥都可能是 TPK (全滅)
                ** 玩家要求 **:
                - 必須使用戰術 (控場、集火、走位、資源管理)
                - 盲目衝鋒 = 死亡
                - 僅適合熟悉 D&D 戰術的玩家
                ** 獎勵 **:
                - 存活下來會獲得額外獎勵 (經驗值 +20%、稀有道具)`
        };

        const PACING_PROMPTS = {
            fast: "PACING: FAST. Focus on the main objective. Minimize travel time and minor encounters. Resolve conflicts quickly.",
            slow: "PACING: SLOW / EXTENDED. Aim for a 1.5x longer session. Introduce complications, sub-obstacles, and unexpected twists. Do not resolve the main conflict immediately. Force the players to work for their victory."
        };

        let modePrompt = "";

        if (mode === 'trpg') {
            // PROLOGUE: Trigger if isPrologue flag OR empty/trigger userAction
            const isOpeningScene = isPrologue || userAction.includes('Prologue') || userAction.trim() === '' || userAction.includes('開始') || userAction.includes('Start');
            if (isOpeningScene) {
                // Build explicit party list for stronger AI constraint
                const partyNameList = party.map(p => p.name || p).join('、');
                const firstName = party[0]?.name || '角色A';

                modePrompt = `
** THIS IS THE OPENING SCENE (序幕) - 必須包含完整結構 **

=== 角色限制 ===
只能使用以下角色：
${party.map(p => `- ${p.name || p} (${p.race || '?'} ${p.class || '?'})`).join('\n')}

=== 序幕結構 (四個區塊，使用【區塊標題】分隔) ===

【世界背景】
- 描述時代氛圍、地點環境
- 設定場景的光線、氣味、聲音
- 創造引人入勝的開場，讓讀者身臨其境

【任務交代】
- 誰派遣隊伍來？委託人是誰？
- 任務目標是什麼？
- 為什麼這個任務重要？有什麼風險？
- 提供足夠的背景讓玩家理解目標

【角色介紹】
- 必須介紹每一位角色：${partyNameList}
- 描述外觀、裝備、神態
- 展現他們的個性和職業特色
- 描述他們在場景中的位置和狀態

【當前情境】
- 隊伍現在面臨什麼處境？
- 營造緊張氣氛，讓玩家想要做出選擇
- 結束於一個關鍵時刻

=== 輸出格式範例 ===
【世界背景】
(引人入勝的世界描述...)

【任務交代】
(清楚的任務描述...)

【角色介紹】
(每位角色的專業介紹...)

【當前情境】
(目前的情境描述...)

=== 絕對禁止 ===
❌ 不要描述角色的具體戰鬥行動（如攻擊、施法）
❌ 不要在結尾給出「選項一/選項二」等選擇
❌ 不要使用 **粗體**、###、=== 等格式（【區塊標題】除外）
❌ 不要創造名單外的角色
❌ 不要省略任何角色的介紹
❌ **絕對禁止在結尾或任何地方標註字數或處理資訊 (例如：(138字)、[End])**

**OUTPUT**: 必須使用【區塊標題】分隔四個部分。
                `;

            } else {
                modePrompt = `
** THIS IS AN ACTIVE COMBAT / ACTION TURN (戰鬥回合) **
Player Actions: "${userAction}"

=== DM OPENING (DM 開場) ===
FIRST, describe the current scene/environment BEFORE resolving player actions.
- Set the atmosphere (lighting, sounds, tension)
- Describe enemy positions and their apparent state
- Create dramatic context for the actions about to unfold

=== PROTOCOL: SEQUENTIAL RESOLUTION (嚴格順序制) ===

    1. **先攻順序 (INITIATIVE)**:
       - **OUTPUT**: Provide a simple **TEXT LIST** of the turn order.
       - **CRITICAL**: Do **NOT** use [🎲] tags here. Do **NOT** roll dice for Initiative. Just list the order.
       - **FORMAT**: 「行動順序：角色名 (先攻值)」
       - *Example*: "行動順序：貝拉 (19), 澤拉 (15), K2 (12), 卡琳 (8), 哥布林群 (6)"

    2. **EXECUTION LOOP**: For EACH character in the calculated order:
       - **HEADER**: \`### [Character Name] (Initiative: X)\`
         - **CRITICAL**: You MUST use this header for every single character provided in the action list.
         - *Inside the Header*:
           - **Narrative**: Write a **Cinematic Paragraph** describing the character's action. Do NOT use bullet points like "- Action:" or "- Result:".
           - **Player Action**:
             - If the player entered an action, describe it.
             - **THEN** append the mechanic tag: \`[🎲 CheckName: D20(Roll) + Mod = Total | DC Target -> Result]\`
             - **THEN** describe the consequence.
             - *Format*: \`(Vivid Action Description) -> [🎲 Tag] -> (Result Description)\`
           - **Idle Player**:
             - If NO action is provided, describe the character hesitating or observing.
             - **IMMEDIATELY** trigger an enemy reaction: "Seeing [Name] hesitate, the [Enemy] lunges!"
             - *Reasoning*: Inactivity is dangerous.
           - **Enemy Turn**:
             - described purely in prose.
             - **NO TAP**: Do NOT use [🎲] tags for enemies. Use text like \`(Roll: 18)\`.

    3. **Difficulty Guidelines**:
       - Easy (Minion): AC 10-12, DC 10
       - Medium (Elite): AC 13-15, DC 13
       - Hard (Boss): AC 16-18, DC 16
       - **Lethality**: If "Ruthless" style, enemies WILL attack unconscious targets.

    4. **DIFFICULTY TIER BALANCE (重要)**:
       根據冒險等級調整敵人行為和傷害:
       
       **初階 (Beginner, Lv 1-4)**:
       - 敵人傷害 -30% (減少 1-3 點傷害)
       - 敵人不會集火同一目標
       - 敵人有時會犯錯 (攻擊錯誤目標、浪費行動)
       - 絕不攻擊倒地的玩家角色
       - 優先描述戲劇性場面而非致命效率
       
       **中階 (Intermediate, Lv 5-7)**:
       - 標準傷害和策略
       - 敵人會適時集火弱化的目標
       - 偶爾攻擊倒地目標 (僅限 Boss 或強敵)
       
       **高階 (Advanced, Lv 8+)**:
       - 敵人使用最優策略
       - 集火治療者和施法者
       - 會攻擊倒地目標確保擊殺
       - 使用環境和掩護

    5. **DM SUMMARY (📊 回合總結)**:
       - Use header: "### 📊 回合總結"
       - **STRUCTURED FORMAT** (MUST follow exactly):
         \`\`\`
         ### 📊 回合總結

         【🗡️ 傷害統計】
         - [攻擊者] → [目標] (X 傷害)
         - [攻擊者] → [目標] (X 傷害)

         【❤️ 隊伍狀態】
         ❤️ [角色名] HP [當前]/[最大] ([變化]) - [狀態]
         ❤️ [角色名] HP [當前]/[最大] - 正常

         【💀 敵方狀態】
         💀 [敵人名] HP 0/X → 已死亡 (移除)
         ⚠️ [敵人名] HP X/Y → 瀕死
         🔴 [敵人名] HP X/Y → 正常

         【📍 戰況摘要】
         (2-3句話描述戰鬥進展)
         \`\`\`
       - **INCLUDE HP CHANGES**: Mark HP changes like "(-5)" for damage, "(+10)" for healing.
       - **MARK DEAD ENEMIES**: Dead enemies MUST show "💀" and "(移除)".
       - **NO QUESTIONS**: End with status, not questions.

    6. **GROUP DECISION PHASE (團隊重大決策)**:
       - **CRITICAL CONDITION**: ONLY trigger this when the current narrative arc concludes and a MAJOR strategic divergence occurs.
       - **FREQUENCY**: Extremely Rare. Use this primarily for "Game Master to Player" questions (e.g. "Do you want to continue to Act 2?").
       - **WHEN TO USE**: 
         - Major Meta-Decisions (e.g., Change Act, Skip Time).
         - Irreversible Plot Branches (e.g., "Burn the Forest" vs "Save the Forest").
       - **WHEN TO AVOID**:
         - Standard gameplay choices.
         - Combat tactics.
         - Anytime characters can speak for themselves.
       - **PREFERENCE**: Always favor individual character autonomy. Let characters debate and decide in-character.
       - **SYNTAX**: \`[[DECISION: Option A | Option B | Option C]]\`
       - **PLACEMENT**: Must be the VERY LAST element of your response.
       - **Note**: Keep options short (under 10 chars each).

    7. **SECTION HEADERS (區塊格式)** - 使用中文區塊格式，不要用 Markdown:
       - DM 開場: "=== DM 開場 (DM OPENING) ==="
       - 角色介紹: "=== 角色介紹 ==="  
       - 角色回合: "【角色名】的回合" 或 "=== 角色名 的行動 ==="
       - 不要使用 ### 或 ** 等 Markdown 語法
       - 區塊之間自然過渡，不需要分隔線

    === CRITICAL RULES ===
    - Use D20 System (D&D 5e Rules).
    - ** FORMATTING **:
      - **NO MARKDOWN BOLD** - Do NOT use **text** syntax anywhere in output.
      - **NO ACTION OPTIONS** - Do NOT include "選擇一:", "選擇二:", "選項一:" etc. These are generated separately.
      - **NO # HEADERS** - Do NOT use # or ## as standalone lines.
      - **NO [[BGM:]] TAGS** - Do NOT include background music tags.
      - Use emoji indicators: ✅ 成功, ❌ 失敗, ⚠️ 瀕死, 💀 死亡
      - Use 【角色名】 format for character turn headers.
    - **DICE TAG FORMAT** (CRITICAL - Follow exactly):
      - Player Roll: \`[🎲 技能名: D20(骰值)+加值 = 總和 | DC 難度 -> ✅ 成功]\`
      - Attack Roll: \`[🎲 攻擊: D20(骰值)+加值 = 總和 | AC 防禦 -> ✅ 命中]\`
      - Example: \`[🎲 察覺: D20(15)+3 = 18 | DC 12 -> ✅ 成功]\`
    - **MATH ENFORCEMENT**:
      - IF (Roll + Mod) >= DC, RESULT "✅ 成功" or "✅ 命中".
      - IF (Roll + Mod) < DC, RESULT "❌ 失敗" or "❌ 未命中".
      - Natural 20 = "🌟 大成功!", Natural 1 = "💥 大失敗!"
    - **OUTPUT**: Return plain Traditional Chinese prose. NO ENGLISH. NO FORMATTING MARKERS.
    - **CRITICAL**: DO NOT WRAP YOUR RESPONSE IN \`\`\` CODE BLOCKS.
`;
            }
        } else {
            // Novel Mode
            modePrompt = `
                    ** NOVEL MODE - PURE STORYTELLING:**
                        - You are writing a chapter of a novel starring SPECIFIC CHARACTERS.
                        - ** PROTAGONISTS **: You MUST write from the perspective of the characters listed in [PARTY PROFILES].
                            - ** CRITICAL **: Do NOT invent new protagonists. If the party is "Bella, Thorin, Kalin", the story MUST be about them.
                            - Use their specific names, personalities, and backgrounds.
                        - ** ABSOLUTELY NO ** game mechanic tags [🎲], stats, or bracketed headers like 【Action】 or 【Threat】.
                        
                        - ** FORMATTING RULES **
                            - ** PROSE ONLY **: Integrate all actions, threats, and outcomes naturally into the descriptive text.
                                - Instead of \`【Action】 Tavian swings his sword\`, write \`Tavian lunged forward, his sword carving a silver arc through the air.\`
                            - ** DIALOGUE **: Weave widely. No name blocks.
                                - Example: "多恩低聲說道：「我們走吧。」"
                            - ** ENDINGS **: Do NOT end with a question like "What happens next?" or "What does the party do?". End with the scene's current state.

                        ** FEW-SHOT EXAMPLE (NOVEL MODE) **:
                        Context: Party is Elara (Mage) and Garrick (Fighter) entering a tomb.
                        Output: 
                        埃拉拉(Elara)舉起法杖，頂端的水晶散發出微弱的藍光，照亮了古老石牆上的苔蘚。「這裡的魔力流動很混亂，」她輕聲警告，眉頭緊鎖，「小心腳下，加里克(Garrick)。」
                        加里克冷哼一聲，緊握著手中的巨斧，沈重的腳步聲在寂靜的走廊中迴盪。「只要能砍得到的東西，我就不怕。」他雖然嘴上這麼說，但身體卻本能地擋在了法師身前，警惕地盯著黑暗深處。
                        突然，一陣陰冷的風從深處吹來，夾雜著腐朽的氣息。埃拉拉猛地倒吸一口氣：「有東西醒了。」
                                            
                                            `;
        }

        const systemPrompt = `
        You are the ** Storyteller ** (Narrative Agent) for an interactive D & D novel.
    Module: "${moduleTitle}"
Location: "${currentLocation}"

    ** CRITICAL: ALL OUTPUT MUST BE IN TRADITIONAL CHINESE(繁體中文) **
    ** CRITICAL: STRICTLY FOLLOW THE 【HEADER】 FORMATTING RULES. DO NOT USE BOLD MARKDOWN FOR HEADERS. **
    
    === 段落排版規則 ===
    - 每個主要段落之間用空行分隔，提升閱讀體驗
    - 場景描述、角色對話、行動敘述應分別成段
    - 避免大塊密集文字，讓內容有呼吸空間


        ${TONE_PROMPTS[tone] || TONE_PROMPTS.normal}
        ${PACING_PROMPTS[pacing] || PACING_PROMPTS.fast}
        
        ${modePrompt}
        
        === MULTI - AGENT NARRATIVE LOGIC ===
    1. Cross - Agent Awareness
2. Autonomous Scene Completion
3. Dramatic Consistency

[PREVIOUS CONTEXT]
        ${lastLog ? lastLog.slice(-8000) : "(Start of Adventure)"}

${plotContext ? `[MODULE PLOT GUIDE]\n${plotContext}\n` : ''}
[PARTY PROFILES]
${context.partyProfiles}

${encounterGuidelines ? `${encounterGuidelines}\n` : ''}
[DIFFICULTY TIER / 難度等級]
**當前難度: ${difficultyTier}** - 請按照上方「DIFFICULTY TIER BALANCE」規則調整敵人行為。


[PLAYER ACTION]
        ${userAction}
        ${isPrologue ? "(This is a Prologue generation trigger)" : "(This is an Active Turn)"}
        
        ** OUTPUT **: Write ONLY in Traditional Chinese.Pure narrative prose, no formatting markers, no JSON.
        
        === AUTOMATED PLOT PROGRESSION ===
        - You are responsible for advancing the story Acts (Move from Act ${currentAct} -> Act ${currentAct + 1}).
        - If the story reaches a major structural turning point (e.g. leaving the starting town, defeating a boss, solving the mystery), append a hidden tag at the VERY END.
        - SYNTAX: "[[ACT_UPDATE: ${currentAct + 1}]]" (or "[[ACT_UPDATE: END]]" if finished).
        - Only do this when the narrative justifies a distinct new chapter.

        === CHARACTER PROGRESSION REWARDS ===
        - If the player achieves a victory, solves a puzzle, or survives a danger, append a hidden reward tag at the VERY END.
        - **Novel Mode (Narrative Growth)**:
          - If the character accomplishes something significant (boss defeat, major realization), DESCRIBE their growth in the narrative text itself (e.g., "Garrick felt his blade become lighter, his movement sharper.").
          - THEN append: "[[NARRATIVE_GROWTH: <Short Description>]]" (e.g., "Learned the way of the sword", "Overcame fear of dragons").
          - Do NOT use game terms like "Level Up" or "XP" in the narrative text for Novel Mode.
        - **TRPG Mode**: "[[REWARD_XP: <Amount>]]" (e.g., "[[REWARD_XP: 500]]").
            - Minor encounter: 50-100 XP
            - Major encounter: 200-500 XP
            - Boss/Milestone: 1000+ XP
        - **Loot**: "[[LOOT: <Item Name>]]" (e.g., "[[LOOT: Ancient Key]]", "[[LOOT: 50 Gold Coins]]").

        === RELATIONSHIP UPDATES ===
        - When a meaningful interaction occurs between characters (positive or negative), append a hidden tag.
        - **Syntax**: "[[RELATIONSHIP: SourceName|TargetName|Amount|Reason]]"
        - **Amount**: Integer between -10 (Minor slight) and +10 (Major bond). Default +/- 2.
        - **Source/Target**: Use simple names (e.g., "Elara", "Garrick").
        - **Example**: "[[RELATIONSHIP: Elara|Garrick|+5|Saved her life]]"

        === AUDIO ATMOSPHERE (BGM) ===
        - Control the background music to match the current mood.
        - **Syntax**: "[[BGM: Key]]"
        - **Keys**: 'battle', 'exploration', 'tavern', 'dungeon', 'victory', 'mystery', 'sad'.
        - **Rule**: Only change it when the scene or mood shifts significantly.
        - **Example**: "[[BGM: battle]]" when combat starts.

        === BATTLE & SCENE MECHANICS (CRITICAL) ===
        - **HP UPDATES**: When ANY character (PC or NPC) takes damage or heals, append: "[[HP: Name|Amount]]" (e.g., "[[HP: Conan|-5]]", "[[HP: Healer|+10]]").
        - **場景管理 (SCENARIO MANAGEMENT)**: Track active NPCs and Enemies in the current scene.
            - **End of every turn/response**, append "[[場景更新: ...]]" if the roster changes or needs refreshing.
            - **格式**:
                - 新增: "新增(名稱, HP, 類型)" → 類型: 敵人/NPC/盟友
                - 移除: "移除(名稱)" → 死亡或離開時
                - 清空: "清空" → 換場景時
        
        === ENEMY NAMING CONVENTION (重要) ===
        - **禁止**: 使用字母編號 (A, B, C, D) 命名敵人
        - **正確做法**: 根據外觀、武器、特徵命名每個敵人
        - **命名範例**:
            - ❌ 錯誤: 哥布林A, 哥布林B, 哥布林C
            - ✓ 正確: 獨眼哥布林, 持矛哥布林, 矮胖哥布林
            - ❌ 錯誤: 骷髏兵1, 骷髏兵2
            - ✓ 正確: 持盾骷髏, 弓箭骷髏, 殘破骷髏
            - ❌ 錯誤: 強盜A
            - ✓ 正確: 刀疤強盜, 禿頭強盜, 高瘦強盜
        - **場景更新範例**: "[[場景更新: 新增(獨眼哥布林, 15, 敵人), 新增(持矛哥布林, 12, 敵人), 新增(哥布林薩滿, 25, 敵人)]]"
        - **HP 更新範例**: "[[HP: 獨眼哥布林|-8]]"

        === 商店與交易系統 (MERCHANT SYSTEM) ===
        當隊伍遇到商人或進入商店時:
        
        1. **商人 NPC**: 可將商人加入場景
           - 範例: "[[場景更新: 新增(老鋪商人莫里斯, 20, NPC)]]"
           
        2. **商品展示**: 在敘事中描述可購買的物品和價格
           - 範例: "莫里斯展示他的貨物：治療藥水 (50金)、鎖甲 (200金)、火把 x5 (1金)"
           
        3. **購買物品**: 當角色購買物品時
           - **語法**: "[[購買: 角色名|物品名|價格]]"
           - **範例**: "[[購買: 艾瑞克|治療藥水|50]]"
           - 這會自動扣除金幣並添加物品
           
        4. **出售物品**: 當角色出售物品時
           - **語法**: "[[出售: 角色名|物品名|價格]]"
           - **範例**: "[[出售: 貝拉|舊皮甲|15]]"
           
        5. **金幣變動**: 直接增減金幣
           - **語法**: "[[金幣: 角色名|金額]]" (正數增加，負數扣除)
           - **範例**: "[[金幣: 嵐|+100]]" (獲得 100 金)
           - **範例**: "[[金幣: 索林|-25]]" (花費 25 金)

        === 休息機制 (REST SYSTEM) ===
        當隊伍決定休息時，使用以下標籤:
        
        1. **短休 (Short Rest)** - 約 1 小時
           - **語法**: "[[短休: 角色名]]" 或 "[[短休: 全隊]]"
           - **效果**: 
             - 恢復 (等級 × Hit Die) HP (約 25-50% MaxHP)
             - 戰士恢復「回氣」能力
             - 邪術師恢復法術位
           - **敘事**: 描述隊伍休息的場景
           - **範例**: "[[短休: 全隊]]" + "隊伍在洞穴入口處稍作休息，包紮傷口..."
           
        2. **長休 (Long Rest)** - 約 8 小時
           - **語法**: "[[長休: 角色名]]" 或 "[[長休: 全隊]]"
           - **效果**:
             - 恢復全部 HP
             - 恢復全部法術位
             - 恢復每日能力
           - **敘事**: 描述過夜/紮營場景
           - **範例**: "[[長休: 全隊]]" + "夜幕降臨，隊伍在篝火旁入睡..."
           
        3. **休息中斷**: 如果休息被打斷 (遭遇襲擊)，則不產生任何恢復效果
           - 不附加休息標籤，直接進入戰鬥

        === STYLE & CONSTRAINTS ===
        - **Style**: ${TONE_PROMPTS[tone] || TONE_PROMPTS.normal}
        - **Pacing**: ${PACING_PROMPTS[pacing] || PACING_PROMPTS.fast}
        - **Negative Constraints**: 
           - NEVER use bullet points like "- Action:" or "- Result:".
           - NEVER use raw Technical JSON.
           - NEVER append word counts or bracketed metadata (e.g., "(138字)", "[End]").
           - ${mode === 'trpg' ? 'Strictly follow 5e rules found in system context.' : ''}
        `;

        try {
            const attemptGeneration = async (retryCount = 0) => {
                try {
                    const result = await this.model.generateContent(systemPrompt);
                    return result;
                } catch (e) {
                    if (retryCount < 1) {
                        console.warn("StoryAgent: 500 Error, retrying...", e);
                        await new Promise(r => setTimeout(r, 1000)); // Wait 1s
                        return attemptGeneration(retryCount + 1);
                    }
                    throw e;
                }
            };

            const result = await attemptGeneration();
            const response = result.response;
            let text = response.text();

            // Cleanup: Remove generic code block markers but KEEP the content if it's not JSON
            // Only remove ```json blocks explicitly. For general ``` blocks, just strip the markers, not content?
            // Actually, safer to just strip the markers:
            text = text.replace(/^```json/gm, "").replace(/^```/gm, "").trim();

            // For TRPG mode, return plain text (no JSON parsing) - NOW OBJECT
            return {
                text: text,
                usage: response.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0, totalTokenCount: 0 }
            };
        } catch (error) {
            console.error("StoryAgent Error:", error);
            return {
                text: "...\n\n(Narrative generation failed. The mists of the multiverse obscure your vision. Please try again.)",
                usage: { promptTokenCount: 0, candidatesTokenCount: 0, totalTokenCount: 0 }
            };
        }
    }
    /**
     * Generates a custom game module based on user prompt.
     * @param {string} userPrompt - User's idea or "SURPRISE_ME"
     * @param {string} difficulty - 'beginner' (Lv3), 'intermediate' (Lv5), 'advanced' (Lv8)
     * @returns {Promise<Object>} The generated module object.
     */
    async generateModuleFromPrompt(userPrompt, difficulty = 'beginner') {
        let startLevel = 3;
        let levels = "1-5";

        if (difficulty === 'intermediate') { startLevel = 5; levels = "5-10"; }
        if (difficulty === 'advanced') { startLevel = 8; levels = "8-15"; }

        const isSurprise = userPrompt === "SURPRISE_ME";
        const promptContext = isSurprise
            ? "Generate a completely random, creative, and unique D&D adventure idea."
            : `User Idea: "${userPrompt}". Expand this into a full adventure.`;

        const systemPrompt = `
        You are a D&D Module Designer. Your task is to generate a structured JSON game module.
        
        **INPUT CONTEXT**:
        - Difficulty: ${difficulty} (Start Level: ${startLevel})
        - Context: ${promptContext}
        
        **OUTPUT FORMAT (STRICT JSON)**:
        You must return a VALID JSON object matching this exact schema. Do not include markdown formatting (like \`\`\`json).
        
        {
          "id": "custom_${Date.now()}_${Math.floor(Math.random() * 1000)}", 
          "title": "Creative Title (Traditional Chinese)",
          "titleEn": "Creative Title (English)",
          "levels": "${levels}",
          "desc": "A compelling 2-3 sentence teaser description (Traditional Chinese).",
          "category": "custom",
          "startLevel": ${startLevel},
          "acts": [
            {
              "act": 1,
              "title": "Act 1 Title (Chinese)",
              "titleEn": "Act 1 Title (English)",
              "objective": "The main goal of this act (Chinese).",
              "keyEvents": ["Event 1", "Event 2", "Event 3"],
              "endCondition": "What must happen to finish this act (Chinese).",
              "boss": "Name of the boss or main threat (if any)."
            },
            {
              "act": 2,
              "title": "Act 2 Title",
              "titleEn": "Act 2 Title En",
              "objective": "Objective",
              "keyEvents": ["Event"],
              "endCondition": "Condition"
            },
            {
              "act": 3,
              "title": "Act 3 Title (Climax)",
              "titleEn": "Act 3 Title En",
              "objective": "Final Objective",
              "keyEvents": ["Event"],
              "endCondition": "Victory Condition"
            }
          ]
        }
        
        **CONTENT RULES**:
        1. **Language**: All descriptive text (title, desc, objectives, events) MUST be in **Traditional Chinese (繁體中文)**. TitleEn must be English.
        2. **Creativity**: Be specific. Name unique locations, artifacts, and villains. Avoid generic tropes.
        3. **Structure**: Generate exactly 3 Acts. Act 1 is setup, Act 2 is development, Act 3 is climax.
        4. **Style**: ${difficulty === 'grim' ? 'Dark, gritty, lethal.' : 'Heroic fantasy.'}
        `;

        try {
            const result = await this.model.generateContent(systemPrompt);
            const response = result.response;
            let text = response.text();

            // Clean markdown if present
            text = text.replace(/^```json/gm, "").replace(/^```/gm, "").trim();

            return JSON.parse(text);
        } catch (error) {
            console.error("StoryAgent Module Gen Error:", error);
            throw new Error("Failed to generate module. Please try again.");
        }
    }

    /**
     * Generates a lightweight sandbox module for dynamic/freeform play.
     * No pre-generated acts - story develops freely based on player choices.
     * @param {string} theme - User's adventure theme (e.g., "海盜冒險", "龍族戰爭")
     * @param {string} difficulty - 'beginner' (Lv3), 'intermediate' (Lv5), 'advanced' (Lv8)
     * @returns {Object} Minimal sandbox module object
     */
    generateSandboxModule(theme, difficulty = 'beginner') {
        let startLevel = 3;
        let levels = "1-5";

        if (difficulty === 'intermediate') { startLevel = 5; levels = "5-10"; }
        if (difficulty === 'advanced') { startLevel = 8; levels = "8-15"; }

        const isSurprise = theme === "SURPRISE_ME";
        const surpriseThemes = [
            "遠古龍族的復甦", "失落的精靈帝國", "深海利維坦的覺醒",
            "異界入侵的前兆", "亡靈大軍的進軍", "機械神的遺跡",
            "元素位面的崩潰", "時間旅行者的警告", "被遺忘的神祇"
        ];

        const finalTheme = isSurprise
            ? surpriseThemes[Math.floor(Math.random() * surpriseThemes.length)]
            : theme;

        return {
            id: `sandbox_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            title: finalTheme,
            titleEn: "Custom Sandbox Adventure",
            levels: levels,
            desc: `一場以「${finalTheme}」為主題的自由冒險。故事將根據你的選擇動態發展。`,
            category: "custom",
            startLevel: startLevel,
            sandbox: true,  // Mark as sandbox mode
            theme: finalTheme,
            tone: "epic",   // Default epic style
            adventureDay: 1, // Progress tracking
            // No acts array - story develops freely
            acts: [
                {
                    act: 1,
                    title: "序章",
                    titleEn: "Prologue",
                    objective: `探索「${finalTheme}」的世界，讓故事自由發展`,
                    keyEvents: ["自由探索", "角色互動", "世界發現"],
                    endCondition: "故事由你決定何時結束"
                }
            ]
        };
    }

    /**
     * Formats sandbox context for AI prompts (used instead of module context)
     * @param {Object} sandboxModule - The sandbox module object
     * @param {number} adventureDay - Current adventure day
     * @returns {string} Formatted context string
     */
    formatSandboxContext(sandboxModule, adventureDay = 1) {
        return `
【沙盒冒險模式】
主題：${sandboxModule.theme}
風格：史詩奇幻
冒險第 ${adventureDay} 天

【沙盒規則】
1. 根據主題自由創造故事，無需遵循固定章節
2. 每次回應後提供 3-4 個玩家可選的行動方向
3. 玩家的選擇會影響故事走向
4. 自然地引入 NPC、地點、衝突
5. 讓故事有機發展，不要強制推進
6. 適時推進冒險天數當發生重大事件或休息時
        `.trim();
    }
}
