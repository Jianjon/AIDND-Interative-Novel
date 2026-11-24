---
trigger: glob
globs: src/data/modules/*.js
---

# 冒險劇本 `tactical` 區塊強制規範

當新增或修改 `src/data/modules/*.js` 內的冒險劇本時：
1. 凡是 `strategic_nodes[]` 中包含 `foes` 的戰鬥或高潮／Boss／機關戰節點（`!node.calm`），**必須順手加上 `tactical` 區塊**。
2. 完整欄位與範例請參照 `docs/MODULE_AUTHORING_STANDARD.md`：
   - 必填：`scenarioId`、`heroFormation`、`foeFormation`、`ambushMode`、`objectiveName`、`script`（含 `missionGoal` 與 `opening`）。
   - 視劇情選填：`foeWaves`、`layout`、`weather`、`lighting`、`namedFoes`、`allies`、`interactables`、`script.triggers`、`script.propLine`、`script.ending`。
3. 修改劇本後，務必確認可正常 `import` 並通過 `node scripts/verify_tactical3d.mjs` 與 `npm run build`。
