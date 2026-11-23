import assert from "node:assert/strict";
import {
  isCombatActive,
  classifyPropTerrain,
  buildTacticalGrid,
  getUnitSpeedCells,
  computeReachableCells,
  hasLineOfSight,
  evaluateCover,
  getClassMoveProfile,
  getHeroMoveOptions,
  inferDefaultMoveIntent,
  planHeroMove,
  planFoeMove,
} from "../src/tactical/tacticalGridEngine.js";

function test(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (err) {
    console.error(`FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

test("isCombatActive returns false outside scene or without living present foes", () => {
  assert.equal(isCombatActive(null), false);
  assert.equal(isCombatActive({ stage: "travel", cast: [{ kind: "foe", present: true, status: "健在" }] }), false);
  assert.equal(
    isCombatActive({
      stage: "scene",
      cast: [
        { id: "npc1", kind: "npc", present: true, status: "健在" },
        { id: "foe1", kind: "foe", present: false, status: "健在" },
        { id: "foe2", kind: "foe", present: true, status: "倒下", hp: 0 },
      ],
    }),
    false,
  );
  assert.equal(
    isCombatActive({
      stage: "scene",
      cast: [{ id: "foe1", kind: "foe", present: true, status: "健在", hp: 12 }],
    }),
    true,
  );
});

test("classifyPropTerrain distinguishes intact vs broken/open states", () => {
  const intactBoulder = classifyPropTerrain({ kind: "boulder_cover", state: "intact", name: "巨石" });
  assert.equal(intactBoulder.impassable, true);
  assert.equal(intactBoulder.cover, true);
  assert.equal(intactBoulder.blocksLos, true);

  const shatteredBoulder = classifyPropTerrain({ kind: "boulder_cover", state: "shattered", name: "巨石" });
  assert.equal(shatteredBoulder.impassable, undefined);
  assert.equal(shatteredBoulder.difficult, true);
  assert.equal(shatteredBoulder.moveCost, 2);

  const closedGate = classifyPropTerrain({ kind: "iron_gate", state: "closed", name: "鐵柵門" });
  assert.equal(closedGate.impassable, true);
  const openGate = classifyPropTerrain({ kind: "iron_gate", state: "open", name: "鐵柵門" });
  assert.equal(openGate.passable, true);

  const activeFire = classifyPropTerrain({ kind: "fire_zone", state: "burning", name: "火場" });
  assert.equal(activeFire.hazard, true);
  assert.ok(activeFire.avoidPenalty >= 15);
});

test("buildTacticalGrid + computeReachableCells enforces walls, no corner cutting, difficult terrain, and hazard detour", () => {
  // 20x14 grid (squares=20, aspect=1.5 -> cw=5, ch=7.5)
  const props = [
    { id: "p_boulder", kind: "boulder_cover", state: "intact", size: "md", name: "巨石掩體" },
    { id: "p_rubble", kind: "difficult_rubble", state: "scattered", size: "md", name: "碎石泥濘" },
    { id: "p_fire", kind: "fire_zone", state: "burning", size: "md", name: "烈焰火場" },
    { id: "p_smoke", kind: "smoke_cloud", state: "dense", size: "md", name: "濃霧" },
  ];
  // Put boulder at cell (6,5) -> px=32.5, py=41.25; wallCheck blocks x=50..55, y=35..50
  const grid = buildTacticalGrid({
    mapId: "test_map",
    aspect: 1.5,
    squares: 20,
    wallCheckFn: (px, py) => px >= 49 && px <= 54 && py >= 28 && py <= 46,
    props,
    propSpots: {
      p_boulder: { x: 32.5, y: 41.2 }, // cell (6, 5)
      p_rubble: { x: 22.5, y: 41.2 },  // cell (4, 5)
      p_fire: { x: 42.5, y: 41.2 },    // cell (8, 5)
      p_smoke: { x: 17.5, y: 26.2 },   // cell (3, 3)
    },
  });

  const boulderCell = grid.getCell(6, 5);
  assert.equal(boulderCell.impassable, true);
  assert.equal(boulderCell.cover, true);
  assert.equal(grid.getCell(5, 5).adjacentCover, true);

  const rubbleCell = grid.getCell(4, 5);
  assert.equal(rubbleCell.difficult, true);
  assert.equal(rubbleCell.moveCost, 2);

  const smokeCell = grid.getCell(3, 3);
  assert.equal(smokeCell.concealment, true);

  // Start at (5,5), test no corner-cutting past boulder at (6,5) + wall at (10,5)?
  // Add an adjacent wall at (5,6) via wallCheck? Let's test direct corner-cut with a second grid.
  const cornerGrid = buildTacticalGrid({
    mapId: "corner",
    aspect: 1.5,
    squares: 20,
    // Block (6,5) and (5,6)
    wallCheckFn: (px, py) => (px >= 30 && px <= 35 && py >= 37.5 && py <= 45) || (px >= 25 && px <= 30 && py >= 45 && py <= 52.5),
  });
  const reachCorner = computeReachableCells(cornerGrid, { cx: 5, cy: 5 }, 2, new Map(), "hero");
  // Cell (6,6) cannot be reached in 1 diagonal step because (6,5) and (5,6) are walls!
  // Wait: it shouldn't even be reachable in 2 steps because (5,6) and (6,5) are blocked, blocking all paths through them.
  assert.equal(reachCorner.has("6,6"), false);

  // Test hazard detour: start at (7,5), target (9,5), fire is directly at (8,5)
  const reachDetour = computeReachableCells(grid, { cx: 7, cy: 5 }, 6, new Map(), "hero");
  const destNode = reachDetour.get("9,5");
  assert.ok(destNode);
  assert.equal(destNode.crossedHazard, false, "Path should detour around fire at (8,5)");
  assert.equal(destNode.path.some((p) => p.cx === 8 && p.cy === 5), false);

  // Test difficult terrain 2x cost: stepping into (4,5) from (5,5) costs 2
  const reachDiff = computeReachableCells(grid, { cx: 5, cy: 5 }, 3, new Map(), "hero");
  assert.equal(reachDiff.get("4,5").cost, 2);

  // Enemy occupied cell blocks entry; ally cell allows pass-through but canStop=false
  const occ = new Map([
    ["5,4", { id: "foe1", side: "foe" }],
    ["5,6", { id: "hero2", side: "hero" }],
  ]);
  const reachOcc = computeReachableCells(grid, { cx: 5, cy: 5 }, 4, occ, "hero");
  assert.equal(reachOcc.has("5,4"), false);
  assert.equal(reachOcc.get("5,6").canStop, false);
});

test("getUnitSpeedCells and LOS/cover evaluation work accurately", () => {
  assert.equal(getUnitSpeedCells({ role: "戰士", race: "人類" }, true), 6);
  assert.equal(getUnitSpeedCells({ role: "戰士", race: "矮人" }, true), 5);
  assert.equal(getUnitSpeedCells({ role: "武僧", level: 5 }, true), 8);
  assert.equal(getUnitSpeedCells({ role: "戰士", tableConditions: ["束縛"] }, true), 0);
  assert.equal(getUnitSpeedCells({ role: "戰士", tableConditions: ["倒地"] }, true), 3);

  const grid = buildTacticalGrid({
    mapId: "los",
    aspect: 1.5,
    squares: 20,
    props: [{ id: "b1", kind: "boulder_cover", state: "intact", size: "md", name: "巨石" }],
    propSpots: { b1: { x: 32.5, y: 41.2 } }, // cell (6,5)
  });
  assert.equal(hasLineOfSight(grid, { cx: 4, cy: 5 }, { cx: 8, cy: 5 }), false);
  assert.equal(hasLineOfSight(grid, { cx: 4, cy: 4 }, { cx: 8, cy: 4 }), true);
  assert.equal(evaluateCover(grid, { cx: 4, cy: 4 }, { cx: 6, cy: 4 }).halfCover, true);
});

test("planHeroMove covers approach/flank, retreat/cover, class moves, and manual pin", () => {
  const props = [
    { id: "p_barricade", kind: "barricade_log", state: "blocking", size: "md", name: "倒樹路障" },
    { id: "p_smoke", kind: "smoke_cloud", state: "dense", size: "md", name: "濃霧" },
  ];
  const grid = buildTacticalGrid({
    mapId: "combat_test",
    aspect: 1.5,
    squares: 20,
    props,
    propSpots: {
      p_barricade: { x: 32.5, y: 41.2 }, // (6,5)
      p_smoke: { x: 22.5, y: 26.2 },     // (4,3)
    },
  });

  const rogue = { id: "h1", name: "影刃", role: "遊蕩者", hp: 20, maxHp: 20, level: 3 };
  const fighter = { id: "h2", name: "鐵盾", role: "戰士", hp: 30, maxHp: 30, level: 3 };
  const mage = { id: "h3", name: "星紋", role: "法師", hp: 8, maxHp: 20, level: 3 };
  const goblin = { id: "f1", name: "哥布林", kind: "foe", present: true, status: "健在", hp: 14 };

  const unitPositions = {
    h1: grid.cellToPct(4, 5),
    h2: grid.cellToPct(7, 5),
    h3: grid.cellToPct(3, 5),
    f1: grid.cellToPct(8, 5),
  };

  assert.equal(getClassMoveProfile(rogue).kind, "stealth");
  assert.equal(getClassMoveProfile(fighter).kind, "guard");
  assert.equal(getClassMoveProfile(mage).kind, "vantage");

  // Fighter approaches goblin while h1 is? Let's put h1 at (9,5) for flanking test!
  const flankPositions = { ...unitPositions, h1: grid.cellToPct(9, 5), h2: grid.cellToPct(5, 5) };
  const pApproach = planHeroMove({
    grid,
    hero: fighter,
    moveIntent: "approach",
    actionChoice: { target: "f1", text: "揮劍斬向哥布林" },
    unitPositions: flankPositions,
    heroes: [rogue, fighter, mage],
    cast: [goblin],
    props,
  });
  assert.ok(pApproach.stepsUsed > 0);
  assert.equal(pApproach.toCell.cx, 7, "Fighter should detour around barricade at (6,5) and reach adjacent cell (7,5) flanking with h1 at (9,5)");
  assert.equal(pApproach.flanking, true);
  assert.equal(pApproach.modifiers.attackBonus, 2);
  assert.ok(pApproach.avoidedObstacles.includes("倒樹路障"));

  // Rogue stealth move should seek smoke cloud at (4,3)
  const pStealth = planHeroMove({
    grid,
    hero: rogue,
    moveIntent: "class_move",
    unitPositions,
    heroes: [rogue, fighter, mage],
    cast: [goblin],
    props,
  });
  assert.equal(pStealth.stealthReady, true);
  assert.equal(pStealth.modifiers.advantage, true);
  assert.equal(pStealth.toCell.cx, 4);
  assert.equal(pStealth.toCell.cy, 3);

  // Guard move protects low-HP mage
  const pGuard = planHeroMove({
    grid,
    hero: fighter,
    moveIntent: "class_move",
    unitPositions: { ...unitPositions, h2: grid.cellToPct(5, 4) },
    heroes: [rogue, fighter, mage],
    cast: [goblin],
    props,
  });
  assert.equal(pGuard.stance.guard, true);
  assert.equal(pGuard.guardingAllyId, "h3");
  assert.equal(pGuard.modifiers.guardAcBonus, 1);

  // Manual cell pin
  const pCustom = planHeroMove({
    grid,
    hero: mage,
    moveIntent: "custom",
    customTargetCell: { cx: 2, cy: 4 },
    unitPositions,
    heroes: [rogue, fighter, mage],
    cast: [goblin],
    props,
  });
  assert.equal(pCustom.mode, "custom");
  assert.equal(pCustom.toCell.cx, 2);
  assert.equal(pCustom.toCell.cy, 4);

  // getHeroMoveOptions returns 3 choices with dynamic plans
  const opts = getHeroMoveOptions(rogue, { heroes: [rogue, fighter, mage], cast: [goblin], props, options: {} }, { grid, unitPositions, propSpots: {} });
  assert.equal(opts.length, 3);
  assert.deepEqual(opts.map((o) => o.id), ["approach", "retreat", "class_move"]);

  assert.equal(inferDefaultMoveIntent(fighter, { target: "f1", text: "用長劍劈砍哥布林" }, { heroes: [fighter], cast: [goblin], props }), "approach");
  assert.equal(inferDefaultMoveIntent(mage, { target: "f1", text: "施放火球術" }, { heroes: [mage], cast: [goblin], props }), "hold");
});

test("planFoeMove syncs enemy movement around obstacles (melee approach vs ranged kite)", () => {
  const props = [{ id: "p_boulder", kind: "boulder_cover", state: "intact", size: "md", name: "巨石" }];
  const grid = buildTacticalGrid({
    mapId: "foe_test",
    aspect: 1.5,
    squares: 20,
    props,
    propSpots: { p_boulder: { x: 32.5, y: 41.2 } }, // (6,5)
  });

  const hero = { id: "h1", name: "騎士", role: "戰士", hp: 25, maxHp: 25 };
  const orc = { id: "f1", name: "半獸人", kind: "foe", present: true, status: "健在", hp: 18 };
  const archer = { id: "f2", name: "哥布林弓手", kind: "foe", present: true, status: "健在", hp: 10 };

  const unitPositions = {
    h1: grid.cellToPct(5, 5),
    f1: grid.cellToPct(8, 5),
    f2: grid.cellToPct(6, 4), // adjacent/near hero
  };

  // Melee foe must detour around boulder at (6,5) to reach hero at (5,5)
  const foeMelee = planFoeMove({
    grid,
    foe: orc,
    isRanged: false,
    preferredTargetId: "h1",
    unitPositions,
    heroes: [hero],
    cast: [orc, archer],
  });
  assert.ok(foeMelee.stepsUsed > 0);
  assert.equal(foeMelee.pathCells.some((p) => p.cx === 6 && p.cy === 5), false);
  assert.ok(Math.max(Math.abs(foeMelee.toCell.cx - 5), Math.abs(foeMelee.toCell.cy - 5)) <= 1);

  // Ranged foe adjacent to hero should step back while maintaining LOS
  const rangedPos = {
    h1: grid.cellToPct(5, 5),
    f2: grid.cellToPct(6, 4),
  };
  const foeRanged = planFoeMove({
    grid,
    foe: archer,
    isRanged: true,
    preferredTargetId: "h1",
    unitPositions: rangedPos,
    heroes: [hero],
    cast: [archer],
  });
  assert.ok(foeRanged.stepsUsed > 0);
  const newDist = Math.max(Math.abs(foeRanged.toCell.cx - 5), Math.abs(foeRanged.toCell.cy - 5));
  assert.ok(newDist >= 2, `Ranged foe should kite away from hero, got dist=${newDist}`);
  assert.equal(hasLineOfSight(grid, foeRanged.toCell, { cx: 5, cy: 5 }), true);
});
