import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatModuleContext, getActInfo } from '../data/modules_data.js';


// LOCKED BY USER REQUEST (2025-12-10). DO NOT EDIT WITHOUT EXPLICIT PERMISSION.
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
     * @param {string} userAction - The player's input action.
     * @returns {Promise<string|object>} The generated narrative text (Markdown) or structured TRPG turn.
     */
    async generateNarrative(context, userAction) {
        const { moduleTitle, currentLocation, lastLog, tone, pacing, gmSignals, mode = 'novel', party = [], isPrologue = false, moduleId = null, currentAct = 1 } = context;

        // Generate module plot context if available
        const plotContext = moduleId ? formatModuleContext(moduleId, currentAct) : '';

        const TONE_PROMPTS = {
            // Novel Mode Styles
            relaxed: "STYLE: Light Novel (Japanese UI). Fun, banter-heavy, focus on character interactions. Avoid heavy gore. Prioritize 'Rule of Cool'.",
            normal: "STYLE: Epic Fantasy (R.A. Salvatore). Balanced action and description. Heroic tone. Standard D&D atmosphere.",
            grim: "STYLE: Eldritch Horror / Dark Fantasy. Oppressive atmosphere, high tension, detailed descriptions of decay and danger. Consequences are severe.",

            // TRPG Mode DM Styles
            guide: "DM PERSONA: The Benevolent Guide. Main Goal: Narrative flow & Player success. Offer subtle hints if players are stuck. Lean towards 'Fail Forward' instead of hard failures. Enemies are challenging but not sadistic.",
            arbiter: "DM PERSONA: The Fair Arbiter. Main Goal: Neutral Simulation. Adhere exactly to dice results and logic. No fudging. Rewards smart tactics, punishes mistakes fairly. The world reacts realistically.",
            ruthless: "DM PERSONA: The Ruthless Executioner. Main Goal: Challenge & Survival. Enemies play optimally (focus fire, finish off downed targets). Traps are lethal. Resources are scarce. Death is around every corner. Expect high difficulty."
        };

        const PACING_PROMPTS = {
            fast: "PACING: FAST. Focus on the main objective. Minimize travel time and minor encounters. Resolve conflicts quickly.",
            slow: "PACING: SLOW / EXTENDED. Aim for a 1.5x longer session. Introduce complications, sub-obstacles, and unexpected twists. Do not resolve the main conflict immediately. Force the players to work for their victory."
        };

        let modePrompt = "";

        if (mode === 'trpg') {
            if (isPrologue || userAction.includes('Prologue')) {
                modePrompt = `
** THIS IS THE OPENING SCENE (序幕) **

=== DM OPENING NARRATION ===
This is pure DM storytelling. Setup the world and the immediate situation.

**REQUIREMENTS**:
1. **Rich Description**: Describe the lighting, smells, sounds, and atmosphere in high detail (Cinematic Style).
2. **Length**: Minimum 200 words. Make it immersive.
3. **Quest Hook**: Clearly establish *why* they are here and *what* makes this moment dangerous/important.

**CRITICAL RULES**:
- **STOP BEFORE ACTION**: You are setting the stage. Do NOT describe what the characters do next.
- **NO AUTO-PLAY**: Do NOT simulate the characters' reactions or first moves.
- **ENDING**: End with the immediate threat or situation clearly presented, inviting player input.

**OUTPUT**: Return plain Traditional Chinese text.
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

    1. **INITIATIVE (先攻)**:
       - **OUTPUT**: Provide a simple **TEXT LIST** of the turn order.
       - **CRITICAL**: Do **NOT** use [🎲] tags here. Do **NOT** roll dice for Initiative. Just list the order.
       - *Example*: "Turn Order: Bella (19), Zera (15), K2 (12), Kalin (8), Goblins (6)."

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

    5. **DM SUMMARY (回合總結)**:
       - Use header: "### 回合總結"
       - **Length**: Write a detailed summary (100-150 words).
       - **NO QUESTIONS**: Do not ask "What do you do next?". End with the current status.

    === CRITICAL RULES ===
    - Use D20 System (D&D 5e Rules).
    - ** FORMATTING **:
      - **PROSE ONLY** for the main description. No standard markdown lists.
      - Use \`### Character Name\` headers for turn separation.
    - **MATH ENFORCEMENT**:
      - IF (Roll + Mod) >= DC, RESULT "SUCCESS" (成功).
      - IF (Roll + Mod) < DC, RESULT "FAILURE" (失敗).
    - **OUTPUT**: Return plain Traditional Chinese text. NO ENGLISH.
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
        - **SCENARIO MANAGMENT**: Track active NPCs and Enemies in the current scene.
            - **End of every turn/response**, append "[[SCENE_UPDATE: ...]]" if the roster changes or needs refreshing.
            - **Syntax**:
                - Add/Update: "Add(Name, HP, Type)" -> Type is 'Enemy', 'NPC', 'Ally'. (e.g. "Add(Goblin A, 20, Enemy)")
                - Remove: "Remove(Name)" -> When they die or leave.
                - Clear: "Clear" -> When changing location entirely.
            - **Example**: "[[SCENE_UPDATE: Add(Goblin Shaman, 40, Enemy), Add(Captive Villager, 5, NPC)]]"
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
}
