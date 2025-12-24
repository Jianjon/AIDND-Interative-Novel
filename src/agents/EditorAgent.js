import { AIService } from "../services/AIService";

/**
 * EditorAgent: The Editor-in-Chief / Proofreader
 * Responsible for story consistency, handling corrections, and addressing user reports.
 * It ensures the narrative matches the mechanical state and vice-versa.
 */
export class EditorAgent {
  constructor(options = {}) {
    this.aiService = new AIService(options);
  }

  /**
   * Performs a consistency review of the game state and recent logs.
   * @param {Object} context - Game context including logs, roster, and quest journal.
   * @returns {Promise<Object>} Review results with potential corrections.
   */
  async performReview(context) {
    const { moduleTitle, logs, roster, currentAct, questJournal } = context;
    const lastLogs = logs.slice(-10).map(l => typeof l.content === 'string' ? l.content : JSON.stringify(l.content)).join("\n---\n");

    const systemPrompt = `
        You are the **Story Editor** for an interactive D&D novel. 
        **CRITICAL: ALL TEXT OUTPUT MUST BE IN TRADITIONAL CHINESE (繁體中文).**

        Your task is to analyze the recent narrative and the internal game state to identify inconsistencies.
        
        [INTERNAL STATE]
        Module: "${moduleTitle}" (Act ${currentAct})
        Party Roster: ${JSON.stringify(roster.map(c => ({ id: c.id, name: c.name, hp: c.hp, gold: c.gold, inventory: c.inventory })))}
        Quest Journal: ${JSON.stringify(questJournal)}

        [RECENT NARRATIVE LOGS]
        ${lastLogs}

        [TASKS]
        1. **Consistency Check**:
           - Do the character names and statuses in the text match the internal state?
           - Are there any logic "jumps" or contradictory events?
           - Is the current scene aligned with the location in the journal?
        2. **Formatting Check (CRITICAL)**:
           - In TRPG mode, every character block MUST start with "### Character Name".
           - In TRPG mode, every turn MUST end with "### 📊 回合總結".
           - If these are missing, flag it as a HIGH severity issue and provide a fix in editorial_instruction.
        3. **Correction List**:
           - If errors are found, list them clearly.
           - Propose "Retcons" or state updates to fix them.

        [OUTPUT FORMAT (JSON)]
        {
          "report": "A detailed summary of your findings (Traditional Chinese).",
          "isConsistent": true | false,
          "issues": [
            { "description": "What is wrong?", "severity": "low|medium|high" }
          ],
          "suggestedCorrections": {
            "state_updates": { "target_id": { "hp": 10, "gold": 50 } },
            "editorial_instruction": "A directive for the next StoryAgent generation to fix narrative flow."
          }
        }
        `;

    try {
      const result = await this.aiService.generate(systemPrompt, { isJson: true });
      return JSON.parse(result.text);
    } catch (error) {
      console.error("[EditorAgent] Review Error:", error);
      return { report: "無法完成檢核，時空亂流干擾中。", isConsistent: true, issues: [] };
    }
  }

  /**
   * Handles a direct report/complaint from the user.
   * @param {Object} context - Game context.
   * @param {string} userMessage - The user's specific concern.
   * @returns {Promise<Object>} Analysis and resolution.
   */
  async handleUserReport(context, userMessage) {
    const { moduleTitle, logs, roster } = context;
    const lastLogs = logs.slice(-5).map(l => typeof l.content === 'string' ? l.content : JSON.stringify(l.content)).join("\n");

    const systemPrompt = `
        You are the **Dungeon Master's Assistant (Editor)**.
        The player is reporting an issue or requesting a change to the story state.
        **CRITICAL: ALL TEXT OUTPUT MUST BE IN TRADITIONAL CHINESE (繁體中文).**

        [USER MESSAGE]
        "${userMessage}"

        [CURRENT CONTEXT]
        Module: "${moduleTitle}"
        Roster: ${JSON.stringify(roster.map(c => ({ id: c.id, name: c.name, hp: c.hp, inventory: c.inventory, gold: c.gold })))}
        Recent Narrative: ${lastLogs}

        [TASKS]
        1. **Evaluate Request**:
           - Is it a valid correction (e.g., "I should have 10 more gold from that chest")?
           - Is it a narrative retcon (e.g., "Fix: Ains is a Warrior, not a Gentleman")?
           - Is it an unfair request (e.g., "Give me 1000000 gold")?
        2. **Respond**:
           - Be polite and "Out of Character" (OOC).
           - Explain if the change is being applied or why it's denied.
        3. **Execute Logic**:
           - Provide the exact state modifications needed if the request is valid.

        [OUTPUT FORMAT (JSON)]
        {
          "response": "Your friendly response to the player (Traditional Chinese).",
          "approval": "approved | rejected | clarification",
          "state_changes": {
            "roster_updates": [
               { "id": "char_id", "updates": { "hp": 10, "gold": -5, "inventory_add": ["Item"] } }
            ],
            "instruction": "A specific instruction for next generation to respect this change."
          }
        }
        `;

    try {
      const result = await this.aiService.generate(systemPrompt, { isJson: true });
      return JSON.parse(result.text);
    } catch (error) {
      console.error("[EditorAgent] Report Error:", error);
      return { response: "抱歉，我現在無法處理這個請求。", approval: "rejected" };
    }
  }
}
