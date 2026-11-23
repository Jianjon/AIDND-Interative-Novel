import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

function parseStoneBridgeMask(sourceText) {
  const match = sourceText.match(
    /stone_bridge:\s*\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*"([^"]+)"\s*,?\s*\]/
  );
  assert.ok(match, "Could not locate stone_bridge bitmask tuple in src/ArtifactGame.jsx");
  const w = Number(match[1]);
  const h = Number(match[2]);
  const b64 = match[4];
  const bytes = Buffer.from(b64, "base64");
  const cols = 48;
  const rows = 32;
  const isBlockedPct = (px, py) => {
    const col = Math.max(0, Math.min(cols - 1, Math.floor((px / 100) * cols)));
    const row = Math.max(0, Math.min(rows - 1, Math.floor((py / 100) * rows)));
    const idx = row * cols + col;
    return Boolean((bytes[idx >> 3] >> (7 - (idx & 7))) & 1);
  };
  return { w, h, bytes, isBlockedPct };
}

function findNearestWalkablePct(isBlockedPct, startPx, startPy) {
  if (!isBlockedPct(startPx, startPy)) return [startPx, startPy];
  for (let r = 1; r <= 12; r++) {
    for (let dy = -r; dy <= r; dy += 2) {
      for (let dx = -r; dx <= r; dx += 2) {
        const px = Math.max(6, Math.min(94, startPx + dx));
        const py = Math.max(8, Math.min(92, startPy + dy));
        if (!isBlockedPct(px, py)) return [px, py];
      }
    }
  }
  throw new Error(`No walkable point found near [${startPx}, ${startPy}]`);
}

async function main() {
  const rootDir = resolve(process.cwd());
  const vite = await createServer({
    root: rootDir,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const engine = await vite.ssrLoadModule("/src/tactical/tacticalGridEngine.js");
    const { TacticalGridOverlay } = await vite.ssrLoadModule("/src/tactical/TacticalGridOverlay.jsx");
    const { HeroMoveSelector } = await vite.ssrLoadModule("/src/tactical/HeroMoveSelector.jsx");

    const {
      isCombatActive,
      buildTacticalGrid,
      computeReachableCells,
      getHeroMoveOptions,
      planHeroMove,
      planFoeMove,
    } = engine;

    // 1. Non-combat Option A gating: TacticalGridOverlay with isCombat=false renders ""
    assert.equal(isCombatActive({ stage: "cover", cast: [] }), false);
    assert.equal(isCombatActive({ stage: "scene", cast: [] }), false);
    assert.equal(
      isCombatActive({
        stage: "scene",
        cast: [{ id: "f", kind: "foe", present: true, hp: 12 }],
      }),
      true
    );
    const nonCombatMarkup = renderToStaticMarkup(
      React.createElement(TacticalGridOverlay, {
        isCombat: false,
        grid: buildTacticalGrid({ mapId: "test_explore" }),
        phaseMode: "picking",
      })
    );
    assert.equal(nonCombatMarkup, "", "Non-combat overlay must render empty string");
    console.log("PASS Test 1: Non-combat Option A gating & TacticalGridOverlay renders empty markup");

    // 2. Combat 2.5D grid rendering with terrain props, walls, reachable cells, previewPaths, pinnedCell
    const combatProps = [
      { id: "prop_boulder", kind: "boulder_cover", name: "花崗巨岩" },
      { id: "prop_fire", kind: "fire_zone", name: "燃燒火盆" },
      { id: "prop_smoke", kind: "smoke_cloud", name: "濃煙帷幕" },
      { id: "prop_rubble", kind: "difficult_rubble", name: "碎石瓦礫" },
    ];
    const propSpots = {
      prop_boulder: [45, 50],
      prop_fire: [52, 62],
      prop_smoke: [36, 36],
      prop_rubble: [62, 42],
    };
    const combatGrid = buildTacticalGrid({
      mapId: "test_arena",
      squares: 26,
      aspect: 1.5,
      wallCheckFn: (px, py) => px < 8 || px > 92 || py < 8 || py > 92,
      props: combatProps,
      propSpots,
    });

    assert.ok(
      combatGrid.cells.some((c) => c.impassable && c.cover),
      "Expected boulder_cover cell flags (impassable + cover)"
    );
    assert.ok(
      combatGrid.cells.some((c) => c.hazard),
      "Expected fire_zone cell flag (hazard)"
    );
    assert.ok(
      combatGrid.cells.some((c) => c.concealment && c.stealthBonus),
      "Expected smoke_cloud cell flags (concealment + stealthBonus)"
    );
    assert.ok(
      combatGrid.cells.some((c) => c.difficult && !c.hazard),
      "Expected difficult_rubble cell flag (difficult)"
    );

    const startCell = combatGrid.pctToCell(26, 52);
    const reachableMap = computeReachableCells(combatGrid, startCell, 6, new Map(), "hero");
    const pinnedNode = Array.from(reachableMap.values()).find((n) => n.canStop && n.cost >= 1);
    assert.ok(pinnedNode, "Expected at least one reachable cell to pin");

    const heroPreviewPlan = planHeroMove({
      grid: combatGrid,
      hero: { id: "h_fighter", name: "艾連", role: "戰士", speed: 30, hp: 28 },
      moveIntent: "approach",
      unitPositions: { h_fighter: [26, 52], foe_orc: [70, 52] },
      heroes: [{ id: "h_fighter", name: "艾連", role: "戰士", speed: 30, hp: 28 }],
      cast: [{ id: "foe_orc", name: "半獸人", present: true, kind: "foe", hp: 22, role: "戰士" }],
      props: combatProps,
      propSpots,
    });
    assert.ok(heroPreviewPlan.pathPcts.length >= 2, "Hero preview plan should produce a path");

    const combatPickingMarkup = renderToStaticMarkup(
      React.createElement(TacticalGridOverlay, {
        isCombat: true,
        grid: combatGrid,
        hasPaintedGrid: true,
        phaseMode: "picking",
        focusedHeroId: "h_fighter",
        reachableMap,
        previewPaths: [{ heroId: "h_fighter", plan: heroPreviewPlan, isFocused: true }],
        pinnedCell: { cx: pinnedNode.cx, cy: pinnedNode.cy },
        onPickCell: () => {},
      })
    );
    assert.ok(combatPickingMarkup.length > 0, "Combat picking overlay should render SVG/grid markup");
    assert.ok(
      combatPickingMarkup.includes("tactical-grid-overlay has-painted-grid"),
      "Combat overlay should include has-painted-grid class"
    );
    for (const expectedCls of [
      "tac-cell is-impassable",
      "tac-cell is-hazard",
      "tac-cell is-difficult",
      "tac-cell is-concealment",
      "tac-cell is-reachable",
      "is-pinned",
      "tac-path-line",
      "tac-dest-ring",
    ]) {
      assert.ok(
        combatPickingMarkup.includes(expectedCls),
        `Combat picking SVG should include "${expectedCls}"`
      );
    }
    console.log("PASS Test 2: Combat 2.5D grid, terrain zones, reachable cells & pinnedCell SSR render");

    // 3. Playback trail rendering for hero (is-active-playback) and foe (tac-path-foe, tac-dest-ring is-foe)
    const heroPlaybackMarkup = renderToStaticMarkup(
      React.createElement(TacticalGridOverlay, {
        isCombat: true,
        grid: combatGrid,
        phaseMode: "moving",
        activePlaybackMove: heroPreviewPlan,
      })
    );
    assert.ok(
      heroPlaybackMarkup.includes("is-active-playback"),
      "Hero playback trail must include is-active-playback"
    );

    const foePlan = planFoeMove({
      grid: combatGrid,
      foe: { id: "foe_orc", name: "半獸人", role: "戰士", kind: "foe", present: true, hp: 22 },
      isRanged: false,
      preferredTargetId: "h_fighter",
      unitPositions: { h_fighter: [26, 52], foe_orc: [70, 52] },
      heroes: [{ id: "h_fighter", name: "艾連", role: "戰士", speed: 30, hp: 28 }],
      cast: [{ id: "foe_orc", name: "半獸人", present: true, kind: "foe", hp: 22, role: "戰士" }],
      stances: {},
    });
    assert.ok(foePlan.pathPcts.length >= 2, "Foe playback test requires multi-step path");
    const foePlaybackMarkup = renderToStaticMarkup(
      React.createElement(TacticalGridOverlay, {
        isCombat: true,
        grid: combatGrid,
        phaseMode: "moving",
        activePlaybackMove: foePlan,
      })
    );
    assert.ok(
      foePlaybackMarkup.includes("tac-path-foe"),
      "Foe playback trail must include tac-path-foe"
    );
    assert.ok(
      foePlaybackMarkup.includes("tac-dest-ring is-foe"),
      "Foe playback destination must include tac-dest-ring is-foe"
    );
    console.log("PASS Test 3: Playback trails render hero is-active-playback and foe tac-path-foe / tac-dest-ring is-foe");

    // 4. HeroMoveSelector SSR rendering across 5 classes + customMoveCell
    const classCases = [
      { id: "c1", name: "卡爾", role: "戰士", expectedLabel: "護衛" },
      { id: "c2", name: "莉亞", role: "盜賊", expectedLabel: "潛行" },
      { id: "c3", name: "賽琳", role: "法師", expectedLabel: "掩體" },
      { id: "c4", name: "奧丁", role: "牧師", expectedLabel: "支援" },
      { id: "c5", name: "雷恩", role: "武僧", expectedLabel: "繞側" },
    ];
    for (const tc of classCases) {
      const heroObj = { id: tc.id, name: tc.name, role: tc.role, speed: 30, hp: 24 };
      const simPos = {
        [tc.id]: [24, 54],
        other_ally: [28, 60],
        foe_a: [68, 52],
      };
      const allyObj = { id: "other_ally", name: "隊友", role: "牧師", hp: 10, maxHp: 24 };
      const foeObj = { id: "foe_a", name: "強盜", present: true, kind: "foe", hp: 18 };
      const sessionObj = {
        stage: "scene",
        heroes: [heroObj, allyObj],
        cast: [foeObj],
        props: combatProps,
        options: {},
      };
      const opts = getHeroMoveOptions(heroObj, sessionObj, {
        isCombat: true,
        grid: combatGrid,
        unitPositions: simPos,
        propSpots,
      });
      assert.equal(opts.length, 3, `Class ${tc.role} should produce 3 move options`);
      const selectorHtml = renderToStaticMarkup(
        React.createElement(HeroMoveSelector, {
          hero: heroObj,
          moveOptions: opts,
          currentMove: "class_move",
          customMoveCell: tc.id === "c1" ? { cx: 8, cy: 7 } : null,
          activePlan: opts[2]?.plan || null,
          onSelectMove: () => {},
          onClearCustomCell: () => {},
        })
      );
      assert.ok(
        selectorHtml.includes(tc.expectedLabel),
        `HeroMoveSelector for ${tc.role} should render "${tc.expectedLabel}"`
      );
      if (tc.id === "c1") {
        assert.ok(selectorHtml.includes("指定格"), "customMoveCell should render 指定格");
        assert.ok(selectorHtml.includes("清除指定 ×"), "customMoveCell should render 清除指定 ×");
      }
    }
    console.log("PASS Test 4: HeroMoveSelector renders all 5 class moves and customMoveCell controls");

    // 5. 2-round synchronized combat simulation (3 heroes + 2 foes + terrain obstacles)
    const simHeroes = [
      { id: "h1", name: "鐵衛", role: "戰士", speed: 30, hp: 32 },
      { id: "h2", name: "夜影", role: "盜賊", speed: 35, hp: 22 },
      { id: "h3", name: "星詠", role: "法師", speed: 30, hp: 18 },
    ];
    const simCast = [
      { id: "f1", name: "獸人狂戰士", role: "戰士", present: true, kind: "foe", hp: 30 },
      { id: "f2", name: "哥布林弓手", role: "弓手", present: true, kind: "foe", hp: 16 },
    ];
    let simPositions = {
      h1: [22, 54],
      h2: [24, 38],
      h3: [16, 66],
      f1: [74, 52],
      f2: [82, 36],
    };
    let simStances = {};

    const heroRoundIntents = [
      { h1: "approach", h2: "class_move", h3: "retreat" },
      { h1: "class_move", h2: "approach", h3: "class_move" },
    ];

    for (let round = 0; round < 2; round++) {
      const intents = heroRoundIntents[round];
      for (const hero of simHeroes) {
        const plan = planHeroMove({
          grid: combatGrid,
          hero,
          moveIntent: intents[hero.id],
          unitPositions: simPositions,
          heroes: simHeroes,
          cast: simCast,
          props: combatProps,
          propSpots,
        });
        assert.ok(Array.isArray(plan.toPct) && plan.toPct.length === 2, "toPct must be 2-element array");
        assert.ok(
          Number.isFinite(plan.toPct[0]) &&
            Number.isFinite(plan.toPct[1]) &&
            plan.toPct[0] >= 0 &&
            plan.toPct[0] <= 100 &&
            plan.toPct[1] >= 0 &&
            plan.toPct[1] <= 100,
          `Finite bounded toPct failed for ${hero.id} round ${round + 1}`
        );
        for (const c of plan.pathCells) {
          const gridCell = combatGrid.getCell(c.cx, c.cy);
          assert.ok(gridCell && !gridCell.impassable, `Hero ${hero.id} path stepped onto impassable cell`);
        }
        assert.ok(
          typeof plan.summaryText === "string" && plan.summaryText.trim().length > 0,
          `Hero ${hero.id} summaryText must be non-empty`
        );
        simPositions = { ...simPositions, [hero.id]: plan.toPct };
        if (plan.stance) simStances = { ...simStances, [hero.id]: plan.stance };
      }

      for (const foe of simCast) {
        const isRanged = foe.id === "f2";
        const foeMove = planFoeMove({
          grid: combatGrid,
          foe,
          isRanged,
          unitPositions: simPositions,
          heroes: simHeroes,
          cast: simCast,
          stances: simStances,
        });
        assert.ok(Array.isArray(foeMove.toPct) && foeMove.toPct.length === 2);
        assert.ok(
          Number.isFinite(foeMove.toPct[0]) &&
            Number.isFinite(foeMove.toPct[1]) &&
            foeMove.toPct[0] >= 0 &&
            foeMove.toPct[0] <= 100 &&
            foeMove.toPct[1] >= 0 &&
            foeMove.toPct[1] <= 100,
          `Finite bounded toPct failed for ${foe.id} round ${round + 1}`
        );
        for (const c of foeMove.pathCells) {
          const gridCell = combatGrid.getCell(c.cx, c.cy);
          assert.ok(gridCell && !gridCell.impassable, `Foe ${foe.id} path stepped onto impassable cell`);
        }
        assert.ok(
          typeof foeMove.summaryText === "string" && foeMove.summaryText.trim().length > 0,
          `Foe ${foe.id} summaryText must be non-empty`
        );
        simPositions = { ...simPositions, [foe.id]: foeMove.toPct };
      }

      const occupiedCells = new Map();
      for (const [uid, pct] of Object.entries(simPositions)) {
        const c = combatGrid.pctToCell(pct[0], pct[1]);
        const key = `${c.cx},${c.cy}`;
        assert.ok(
          !occupiedCells.has(key),
          `Round ${round + 1} cell collision at ${key} between ${occupiedCells.get(key)} and ${uid}`
        );
        occupiedCells.set(key, uid);
      }
    }
    console.log("PASS Test 5: 2-round synchronized combat simulation (no overlap, valid paths, non-empty summaries)");

    // 6. Real stone_bridge 48x32 bitmask parsed from src/ArtifactGame.jsx
    const artifactSource = readFileSync(resolve(rootDir, "src/ArtifactGame.jsx"), "utf8");
    const { w, h, isBlockedPct } = parseStoneBridgeMask(artifactSource);
    const bridgeGrid = buildTacticalGrid({
      mapId: "stone_bridge",
      squares: 24,
      aspect: w / h,
      wallCheckFn: (px, py) => isBlockedPct(px, py),
      props: [],
      propSpots: {},
    });

    const walkableCount = bridgeGrid.cells.filter((c) => !c.impassable).length;
    const blockedCount = bridgeGrid.cells.length - walkableCount;
    assert.ok(walkableCount > 20 && blockedCount > 20, "stone_bridge should mix walkable and blocked cells");

    const heroStart = findNearestWalkablePct(isBlockedPct, 22, 62);
    const foeStart = findNearestWalkablePct(isBlockedPct, 72, 42);
    const bridgeHeroes = [{ id: "bh1", name: "守橋騎士", role: "戰士", speed: 30, hp: 30 }];
    const bridgeCast = [{ id: "bf1", name: "橋賊首領", role: "戰士", present: true, kind: "foe", hp: 24 }];
    const bridgePos = { bh1: heroStart, bf1: foeStart };

    const bridgeHeroPlan = planHeroMove({
      grid: bridgeGrid,
      hero: bridgeHeroes[0],
      moveIntent: "approach",
      unitPositions: bridgePos,
      heroes: bridgeHeroes,
      cast: bridgeCast,
    });
    for (const c of bridgeHeroPlan.pathCells) {
      const gCell = bridgeGrid.getCell(c.cx, c.cy);
      assert.ok(gCell && !gCell.impassable, `Hero stepped into blocked stone_bridge cell (${c.cx},${c.cy})`);
      assert.equal(
        isBlockedPct(gCell.px, gCell.py),
        false,
        `Hero path cell center [${gCell.px}, ${gCell.py}] is masked blocked`
      );
    }
    const bridgeHeroEnd = bridgeGrid.getCell(bridgeHeroPlan.toCell.cx, bridgeHeroPlan.toCell.cy);
    assert.ok(bridgeHeroEnd && !bridgeHeroEnd.impassable && !isBlockedPct(bridgeHeroPlan.toPct[0], bridgeHeroPlan.toPct[1]));

    const bridgeFoePlan = planFoeMove({
      grid: bridgeGrid,
      foe: bridgeCast[0],
      isRanged: false,
      preferredTargetId: "bh1",
      unitPositions: { bh1: bridgeHeroPlan.toPct, bf1: foeStart },
      heroes: bridgeHeroes,
      cast: bridgeCast,
      stances: {},
    });
    for (const c of bridgeFoePlan.pathCells) {
      const gCell = bridgeGrid.getCell(c.cx, c.cy);
      assert.ok(gCell && !gCell.impassable, `Foe stepped into blocked stone_bridge cell (${c.cx},${c.cy})`);
      assert.equal(
        isBlockedPct(gCell.px, gCell.py),
        false,
        `Foe path cell center [${gCell.px}, ${gCell.py}] is masked blocked`
      );
    }
    const bridgeFoeEnd = bridgeGrid.getCell(bridgeFoePlan.toCell.cx, bridgeFoePlan.toCell.cy);
    assert.ok(bridgeFoeEnd && !bridgeFoeEnd.impassable && !isBlockedPct(bridgeFoePlan.toPct[0], bridgeFoePlan.toPct[1]));

    console.log(
      `PASS Test 6: Real stone_bridge 48x32 bitmask (${walkableCount} passable / ${blockedCount} blocked) strictly respected`
    );
    console.log("ALL 6 TACTICAL E2E & SSR TESTS PASSED");
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
