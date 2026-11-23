import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

async function main() {
  const vite = await createServer({
    root: resolve(process.cwd()),
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  });

  try {
    const mapMod = await vite.ssrLoadModule("/src/tactical3d/voxelMapGenerator.js");
    const rules = await vite.ssrLoadModule("/src/tactical3d/dnd5eRulesEngine.js");
    const bridge = await vite.ssrLoadModule("/src/tactical3d/storyBridge.js");
    const barks = await vite.ssrLoadModule("/src/tactical3d/combatBarkLines.js");
    const { default: Tactical3DArena } = await vite.ssrLoadModule("/src/tactical3d/Tactical3DArena.jsx");

    const {
      TACTICAL3D_SCENARIOS,
      PROP_TEMPLATES,
      WEATHER_PRESETS,
      LIGHTING_PRESETS,
      generateVoxelMap,
      applyElementalSurfaceReaction,
    } = mapMod;

    const {
      PRESET_HEROES,
      CREATURE_SPRITE_MAP,
      createBattleState,
      getActiveUnit,
      getUnitCells,
      getUnitAuraEffects,
      computeReachable3D,
      evaluateAttackModifiers,
      applyTypedDamage,
      applyKnockback,
      executeMove,
      executeWeaponAttack,
      executeSpellCast,
      executeStandardAction,
      executePropInteract,
      executePartyRetreat,
      executeSummonAlly,
      executeCureConditions,
      triggerDynamicTerrainEvent,
      applyShoutOrImprovAction,
      beginActiveTurn,
      decideEnemyTurn,
      endUnitTurn,
      exportBattleSummary,
    } = rules;

    // Test 1: Procedural 3D Map Generator (16 scenarios x 5 seeds = 80 maps)
    assert.equal(TACTICAL3D_SCENARIOS.length, 16, "Should have 16 tactical 3D scenarios covering all module biomes");
    assert.ok(WEATHER_PRESETS.length >= 9 && LIGHTING_PRESETS.length >= 6);
    assert.ok(Object.keys(PROP_TEMPLATES).length >= 348, "Should register all 333 Lego props + 15 named templates");
    for (const [mKey, mPath] of Object.entries(CREATURE_SPRITE_MAP)) {
      const full = resolve(process.cwd(), "public", mPath.replace(/^\//, ""));
      assert.ok(existsSync(full), `Missing creature/HD token sprite for ${mKey}: ${full}`);
    }
    for (const [pkey, pdef] of Object.entries(PROP_TEMPLATES)) {
      const s0Path = resolve(process.cwd(), "public", pdef.imgIntact.replace(/^\//, ""));
      const s1Path = resolve(process.cwd(), "public", pdef.imgBroken.replace(/^\//, ""));
      assert.ok(existsSync(s0Path), `Missing prop s0 image for ${pkey}: ${s0Path}`);
      assert.ok(existsSync(s1Path), `Missing prop s1 image for ${pkey}: ${s1Path}`);
      assert.ok(pdef.scaleW > 0 && pdef.scaleH > 0, `Missing scaleW/scaleH for ${pkey}`);
    }
    let mapCount = 0;
    for (const sc of TACTICAL3D_SCENARIOS) {
      for (let i = 0; i < 5; i++) {
        const map = generateVoxelMap(sc.id, 100 + i * 29, 3);
        assert.ok(map.wallCount > 45 || sc.id === "ship_deck", `${sc.id} wallCount expected >45, got ${map.wallCount}`);
        assert.ok(map.sizeLabel && map.sizeTier, `${sc.id} must include sizeTier & sizeLabel`);
        assert.ok(map.heroSpawns.length >= 5, `${sc.id} must support 5-hero party spawns`);
        assert.equal(map.connected, true, `${sc.id} seed ${map.seed} must be 100% BFS connected`);
        assert.ok(map.props.length >= 2, `${sc.id} should include dual-state props`);
        assert.ok(map.weather && map.lighting, `${sc.id} must resolve weather & lighting`);
        for (const p of map.props) {
          assert.ok(p.imgIntact.endsWith("_s0.png") && p.imgBroken.endsWith("_s1.png"));
        }
        if (["chasm_sanctum", "troll_grotto", "frost_citadel", "volcanic_forge", "swamp_ruins"].includes(sc.id)) {
          const bossPad = map.foeSpawns.find((s) => s.footprint === 2);
          assert.ok(bossPad, `${sc.id} must reserve a 2x2 large boss spawn pad`);
          for (let dy = 0; dy <= 1; dy++) {
            for (let dx = 0; dx <= 1; dx++) {
              assert.ok(
                map.grid[bossPad.y + dy][bossPad.x + dx].walkable,
                `${sc.id} 2x2 pad (${bossPad.x + dx},${bossPad.y + dy}) must be walkable`
              );
            }
          }
        }
        mapCount++;
      }
    }
    // Verify weather & lighting overrides + ranged modifiers
    const bClear = createBattleState({ scenarioId: "forest_ambush", seed: 101, weather: "clear", lighting: "daylight" });
    const bGale = createBattleState({ scenarioId: "forest_ambush", seed: 101, weather: "gale", lighting: "dusk" });
    const bFog = createBattleState({ scenarioId: "forest_ambush", seed: 101, weather: "fog", lighting: "horror" });
    assert.equal(bClear.map.weather, "clear");
    assert.equal(bGale.map.weather, "gale");
    assert.equal(bGale.map.lighting, "dusk");
    assert.equal(bFog.map.lighting, "horror");
    const h0 = bClear.units.find((u) => u.side === "hero");
    const f0 = bClear.units.find((u) => u.side === "foe");
    const modClear = evaluateAttackModifiers(bClear, h0, f0, { isRanged: true, isMelee: false });
    const modGale = evaluateAttackModifiers(bGale, bGale.units.find((u) => u.id === h0.id), bGale.units.find((u) => u.id === f0.id), { isRanged: true, isMelee: false });
    assert.equal(modGale.hitBonus, modClear.hitBonus - 2, "Gale must apply -2 ranged hit penalty");
    const modFog = evaluateAttackModifiers(bFog, bFog.units.find((u) => u.id === h0.id), bFog.units.find((u) => u.id === f0.id), { isRanged: true, isMelee: false });
    assert.equal(modFog.hitBonus, modClear.hitBonus - 1, "Fog must apply -1 ranged hit penalty at >3 cells");
    console.log(`PASS Test 1: ${mapCount} procedural 3D maps + ${Object.keys(PROP_TEMPLATES).length} dual-state props + weather/lighting rules verified`);

    // Test 2: Real Data Hydration across Lv 1/3/5 + Large 2x2 Monsters
    const testHeroIds = [
      "preset_fighter",
      "preset_rogue",
      "preset_cleric",
      "preset_wizard",
      "preset_barbarian",
      "preset_paladin",
    ];
    const selectedPresets = testHeroIds.map((id) => PRESET_HEROES.find((h) => h.id === id)).filter(Boolean);
    assert.equal(selectedPresets.length, 6);

    for (const lv of [1, 3, 5]) {
      const b = createBattleState({
        scenarioId: "troll_grotto",
        seed: 202,
        partyPresets: selectedPresets.slice(0, 4),
        partyLevel: lv,
        foeIds: ["goblin", "goblin_archer", "orc", "troll"],
      });
      const wiz = b.units.find((u) => u.id === "preset_wizard");
      assert.ok(wiz, "Wizard must hydrate");
      assert.ok((wiz.slots?.[1] || 0) >= 2, `Wizard Lv${lv} should have normalized L1 slots`);
      if (lv >= 5) {
        assert.ok((wiz.slots?.[3] || 0) >= 2, "Wizard Lv5 should have L3 Fireball slots");
        assert.ok(wiz.spells.some((s) => s.key === "Fireball"), "Wizard Lv5 should know Fireball");
      }
      const troll = b.units.find((u) => u.templateId === "troll");
      assert.equal(troll.footprint, 2, "Troll must have 2x2 footprint");
      assert.equal(getUnitCells(troll).length, 4);
      const gob = b.units.find((u) => u.templateId === "goblin");
      const orcU = b.units.find((u) => u.templateId === "orc");
      assert.ok(gob.heightScale < 0.85 && gob.sizeCategory === "small", "Goblin must be shorter Small size");
      assert.ok(orcU.heightScale > 1.0 && wiz.heightScale > 1.0, "Orc & Half-Orc must have taller stature");
    }
    const dwarfBardBattle = createBattleState({
      scenarioId: "cave_ambush",
      seed: 101,
      partyPresets: ["preset_cleric", "preset_ranger", "preset_fighter"]
        .map((id) => PRESET_HEROES.find((h) => h.id === id))
        .filter(Boolean),
      partyLevel: 3,
      foeIds: ["goblin"],
    });
    const dwarfU = dwarfBardBattle.units.find((u) => u.id === "preset_cleric");
    const halflingU = dwarfBardBattle.units.find((u) => u.id === "preset_ranger");
    const halfElfU = dwarfBardBattle.units.find((u) => u.id === "preset_fighter");
    assert.ok(halflingU.heightScale < dwarfU.heightScale && dwarfU.heightScale < halfElfU.heightScale, "Halfling < Dwarf < Medium height scale");
    console.log("PASS Test 2: Hero Lv1/3/5 slot normalization, race/size height scaling, and 2x2 Large monster hydration");

    // Test 3: Movement, No Wall Clipping, 2x2 Pathing & 1B Auto OA + Shield Reaction
    const bMove = createBattleState({
      scenarioId: "troll_grotto",
      seed: 101,
      partyPresets: selectedPresets.slice(0, 4),
      partyLevel: 5,
      foeIds: ["goblin", "ogre"],
    });
    const fighter = bMove.units.find((u) => u.id === "preset_fighter");
    const goblin = bMove.units.find((u) => u.templateId === "goblin");
    const ogre = bMove.units.find((u) => u.templateId === "ogre");

    // Put fighter adjacent to goblin so leaving triggers 1B Auto Opportunity Attack
    fighter.x = 6;
    fighter.y = 5;
    goblin.x = 7;
    goblin.y = 5;
    fighter.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };
    goblin.reactionLeft = 1;

    const reachF = computeReachable3D(bMove, fighter);
    for (const node of reachF.values()) {
      for (const step of node.path) {
        const t = bMove.map.grid[step.y][step.x];
        assert.ok(t.walkable, `Fighter path stepped into unwalkable cell (${step.x},${step.y})`);
      }
    }
    const mvRes = executeMove(bMove, fighter.id, 4, 5);
    assert.equal(mvRes.ok, true);
    assert.ok(mvRes.cost > 0 && fighter.turn.movementLeft < 6, "Split movement must deduct movementLeft");
    assert.equal(goblin.reactionLeft, 0, "Leaving melee reach without Disengage must trigger 1B Auto OA");
    assert.ok(bMove.logs.some((l) => l.includes("藉機攻擊")), "Combat log must record Opportunity Attack");

    // 2x2 Large monster pathfinding keeps all 4 cells valid
    const ogreReach = computeReachable3D(bMove, ogre, 4);
    assert.ok(ogreReach.size >= 4, "2x2 Ogre should compute multi-cell reachable positions");
    for (const node of ogreReach.values()) {
      for (let dy = 0; dy <= 1; dy++) {
        for (let dx = 0; dx <= 1; dx++) {
          assert.ok(bMove.map.grid[node.y + dy][node.x + dx].walkable);
        }
      }
    }

    // 1B Auto Shield Reaction test when narrow hit lands inside [effAc, effAc+4]
    const wizU = bMove.units.find((u) => u.id === "preset_wizard");
    wizU.x = 8;
    wizU.y = 5;
    goblin.x = 9;
    goblin.y = 5;
    wizU.hp = 30;
    wizU.reactionLeft = 1;
    wizU.slots[1] = 2;
    wizU.autoReactions.shield = true;
    const beforeSlots = wizU.slots[1];
    // Force rng so d20 roll hits in exact narrow window [effAc, effAc+4]
    const goblinAtkBonus = goblin.weapons[0].hitBonus;
    const preEval = rules.evaluateAttackModifiers(bMove, goblin, wizU, {
      isRanged: false,
      isMelee: true,
      hitBonusOverride: goblinAtkBonus,
    });
    const targetD20 = Math.max(2, Math.min(19, preEval.effAc - goblinAtkBonus + 1));
    bMove.rng = () => (targetD20 - 0.5) / 20;
    goblin.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };
    const beforeHp = wizU.hp;
    const shieldTestAtk = executeWeaponAttack(bMove, goblin.id, goblin.weapons[0].id, wizU.id);
    assert.equal(shieldTestAtk.ok, true, "Goblin weapon attack should execute");
    assert.equal(wizU.slots[1], beforeSlots - 1, "Auto-Shield must consume 1 spell slot");
    assert.equal(wizU.reactionLeft, 0, "Auto-Shield must spend reaction");
    assert.equal(wizU.hp, beforeHp, "Auto-Shield +5 AC must turn narrow hit into a miss");
    console.log("PASS Test 3: Split move, zero wall clipping, 2x2 pathing, and 1B Auto OA + Shield verified");

    // Test 4: 2A High Ground (+-2), Cover, Reach Weapon, Ranged-in-Melee & Resistances
    const bMod = createBattleState({
      scenarioId: "cave_ambush",
      seed: 101,
      partyPresets: selectedPresets.slice(0, 4),
      partyLevel: 3,
      foeIds: ["goblin", "goblin_archer"],
    });
    const rangerMod = bMod.units.find((u) => u.id === "preset_rogue");
    const highArcher = bMod.units.find((u) => u.templateId === "goblin_archer");
    const lowGob = bMod.units.find((u) => u.templateId === "goblin");
    // Put archer on h=3 ledge (12,2), lowGob on h=1 (12,5), rogue on h=1 (9,5)
    highArcher.x = 12;
    highArcher.y = 2;
    lowGob.x = 12;
    lowGob.y = 5;
    rangerMod.x = 9;
    rangerMod.y = 5;

    const highToLow = evaluateAttackModifiers(bMod, highArcher, rangerMod, { isRanged: true, isMelee: false, hitBonusOverride: 5 });
    assert.equal(highToLow.hitBonus, 7, "2A High Ground ΔH=+2 must grant +2 hit bonus");
    assert.equal(highToLow.rangeBonus, 2, "High ground must grant +2 ranged cells");

    const lowToHigh = evaluateAttackModifiers(bMod, rangerMod, highArcher, { isRanged: true, isMelee: false, hitBonusOverride: 5 });
    assert.equal(lowToHigh.hitBonus, 3, "2A Low-to-high ΔH=-2 must apply -2 hit penalty");

    // Ranged-in-Melee Disadvantage
    lowGob.x = 10;
    lowGob.y = 5;
    const adjRanged = evaluateAttackModifiers(bMod, rangerMod, highArcher, { isRanged: true, isMelee: false, hitBonusOverride: 5 });
    assert.equal(adjRanged.advState, "disadv", "Ranged attack while hostile adjacent must impose disadvantage");

    // Reach weapon strikes cleanly at Chebyshev distance 2
    // Reach weapon strikes cleanly at Chebyshev distance 2 + out-of-range attack preserves actionLeft
    const reachFighter = bMod.units.find((u) => u.id === "preset_fighter");
    reachFighter.x = 8;
    reachFighter.y = 5;
    reachFighter.weapons.push({ id: "halberd", name: "戟", isRanged: false, rangeCells: 2, reach: true, hitBonus: 99, damageDice: "1d10+3", damageType: "slashing" });
    reachFighter.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };

    const outOfRangeAtk = executeWeaponAttack(bMod, reachFighter.id, "halberd", highArcher.id);
    assert.equal(outOfRangeAtk.ok, false, "Out-of-range attack must fail cleanly");
    assert.equal(reachFighter.turn.actionLeft, 1, "Out-of-range attack must NOT burn actionLeft");

    const reachAtk = executeWeaponAttack(bMod, reachFighter.id, "halberd", lowGob.id);
    assert.equal(reachAtk.ok, true);
    assert.equal(reachAtk.result.hit, true, "Reach weapon must hit target 2 cells away");

    // Barbarian Rage +2 melee damage & halving slashing damage + Thunderwave excludes caster
    const barbMod = selectedPresets.find((h) => h.id === "preset_barbarian");
    const bRage = createBattleState({
      scenarioId: "cave_ambush",
      seed: 101,
      partyPresets: [barbMod],
      partyLevel: 3,
      foeIds: ["goblin"],
    });
    const barbU = bRage.units.find((u) => u.id === "preset_barbarian");
    const gobR = bRage.units.find((u) => u.templateId === "goblin");
    barbU.x = 5;
    barbU.y = 5;
    gobR.x = 6;
    gobR.y = 5;
    barbU.conditions.Rage = 5;
    const rageEval = evaluateAttackModifiers(bRage, barbU, gobR, { isMelee: true, isRanged: false });
    assert.equal(rageEval.dmgBonus, 2, "Barbarian Rage must add +2 melee damage");
    const rageFc = rules.computeCombatForecast(bRage, barbU.id, { kind: "weapon", weaponId: barbU.weapons[0].id }, gobR.x, gobR.y);
    assert.ok(rageFc.valid && rageFc.modifiers.some((m) => m.includes("狂暴")), "Forecast must display Rage bonus");

    // Thunderwave must NOT damage the caster
    barbU.hp = barbU.maxHp;
    barbU.slots[1] = 2;
    barbU.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };
    const beforeTwHp = barbU.hp;
    executeSpellCast(bRage, barbU.id, "Thunderwave", barbU.x, barbU.y, 1);
    assert.equal(barbU.hp, beforeTwHp, "Self-emanated Thunderwave must NOT damage caster");

    // Potion forecast check
    barbU.hp = 10;
    const potFc = rules.computeCombatForecast(bRage, barbU.id, { kind: "potion" }, barbU.x, barbU.y);
    assert.ok(potFc.valid && potFc.dmgMin >= 4, "Potion forecast should show healing range");

    // Resistance / Immunity / Vulnerability math
    assert.equal(applyTypedDamage({ damageImmunities: ["fire"] }, 20, "fire").finalDmg, 0);
    assert.equal(applyTypedDamage({ conditions: { Rage: 3 } }, 15, "slashing").finalDmg, 7);
    assert.equal(applyTypedDamage({ damageVulnerabilities: ["fire"] }, 12, "fire").finalDmg, 24);
    console.log("PASS Test 4: 2A High Ground +-2, Ranged-in-Melee, Reach=2, Rage+2, Self-AoE safety, Potion forecast & Resistance/Immunity verified");

    // Test 5: Death Saves, Revive, Elemental Surfaces, Dual-State Props & Knockback Fall
    const bSurv = createBattleState({
      scenarioId: "cave_ambush",
      seed: 101,
      partyPresets: selectedPresets.slice(0, 4),
      partyLevel: 5,
      foeIds: ["goblin", "orc"],
    });
    const koHero = bSurv.units.find((u) => u.id === "preset_rogue");
    const cleric = bSurv.units.find((u) => u.id === "preset_cleric");
    const orc = bSurv.units.find((u) => u.templateId === "orc");
    koHero.hp = 0;
    koHero.conditions.Unconscious = 99;
    koHero.conditions.Prone = 99;
    koHero.deathSaves = { success: 0, fail: 0, stabilized: false };

    bSurv.turnIndex = bSurv.initiativeOrder.indexOf(koHero.id);
    bSurv.rng = () => 0.65; // rolls d20 = 14 (>=10 success!)
    beginActiveTurn(bSurv);
    assert.equal(koHero.turn.autoSkip, true);
    assert.equal(koHero.deathSaves.success, 1, "Death save >=10 must record 1 success");

    // Cleric revives with Healing Word
    cleric.x = 3;
    cleric.y = 5;
    koHero.x = 4;
    koHero.y = 5;
    cleric.slots[1] = 2;
    cleric.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };
    const healRes = executeSpellCast(bSurv, cleric.id, "Healing Word", koHero.x, koHero.y, 1);
    assert.equal(healRes.ok, true);
    assert.ok(koHero.hp > 0 && !koHero.conditions.Unconscious, "Healing Word must revive 0 HP hero");

    // Elemental Surface Chains: Oil+Fire, Water+Lightning, Fire+Cold
    const oilChain = applyElementalSurfaceReaction(bSurv.map, 6, 7, "fire");
    assert.equal(oilChain.reaction, "oil_ignite");
    assert.equal(bSurv.map.grid[7][6].surface, "fire");

    const waterChain = applyElementalSurfaceReaction(bSurv.map, 9, 4, "lightning");
    assert.equal(waterChain.reaction, "water_shock");
    assert.equal(bSurv.map.grid[4][9].surface, "electrified_water");

    const steamChain = applyElementalSurfaceReaction(bSurv.map, 6, 7, "cold");
    assert.equal(steamChain.reaction, "steam_cloud");
    assert.equal(bSurv.map.grid[7][6].surface, "steam_cloud");

    // Fireball breaks dual-state barricade prop (6,4)
    const wizB = bSurv.units.find((u) => u.id === "preset_wizard");
    wizB.x = 5;
    wizB.y = 5;
    wizB.slots[3] = 2;
    wizB.turn = { actionLeft: 2, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };
    const propBefore = bSurv.map.props.find((p) => p.x === 6 && p.y === 4);
    assert.ok(propBefore && !propBefore.broken);
    executeSpellCast(bSurv, wizB.id, "Fireball", 6, 4, 3);
    executeSpellCast(bSurv, wizB.id, "Fireball", 6, 4, 3); // Ensure 2x casts exceed 14 prop HP
    assert.equal(propBefore.broken, true, "Fireball AoE must break dual-state prop");

    // Knockback off h=3 ledge onto h=1 deals fall dmg + Prone
    bSurv.map.grid[3][11] = { ...bSurv.map.grid[3][11], type: "floor", h: 1, walkable: true };
    orc.x = 11;
    orc.y = 2; // h=3 ledge
    orc.hp = 30;
    delete orc.conditions.Prone;
    const hpBeforeFall = orc.hp;
    applyKnockback(bSurv, orc, 0, 1, 1, []);
    assert.ok(orc.hp < hpBeforeFall, "Knockback drop ΔH>=2 must deal falling damage");
    assert.ok(orc.conditions.Prone > 0, "Falling from ledge must apply Prone condition");
    console.log("PASS Test 5: Death Saves, Healing Word revive, Oil/Water/Steam surface chains, Prop break & Knockback fall verified");

    // Test 6: Multi-Round Automated Simulation + Export Summary + SSR Render
    const bSim = createBattleState({
      scenarioId: "troll_grotto",
      seed: 303,
      partyPresets: selectedPresets.slice(0, 4),
      partyLevel: 3,
    });
    for (let step = 0; step < 12 && !bSim.ended; step++) {
      const act = getActiveUnit(bSim);
      if (!act) break;
      if (act.side === "foe") {
        decideEnemyTurn(bSim, act.id);
      } else {
        executeStandardAction(bSim, act.id, "dodge");
      }
      endUnitTurn(bSim);
    }
    const summary = exportBattleSummary(bSim);
    assert.equal(summary.engine, "tactical3d-dnd5e");
    assert.equal(summary.partyStatus.length, 4);
    assert.ok(Array.isArray(summary.recentLogs) && summary.recentLogs.length > 0);

    const ssrHtml = renderToStaticMarkup(React.createElement(Tactical3DArena, {}));
    assert.ok(ssrHtml.includes("地下洞穴伏擊通道"), "Tactical3DArena SSR setup screen must render scenarios");
    console.log("PASS Test 6: Automated combat loop, exportBattleSummary JSON & Tactical3DArena SSR verified");

    // Test 7: Story <-> 3D Tactical Bridge Round-Trip
    const mockSession = {
      stage: "scene",
      map: "tavern",
      place: { name: "黑橡木酒館" },
      level: 3,
      turn: 4,
      sceneMood: { lighting: "dusk", ambient: ["rain"] },
      heroes: [
        { id: "h_1", name: "艾德溫", className: "Rogue", hp: 17, maxHp: 24, dead: false },
        { id: "h_2", name: "索林", className: "Fighter", hp: 22, maxHp: 30, dead: false },
        { id: "h_3", name: "莉亞", className: "Cleric", hp: 20, maxHp: 20, dead: false },
        { id: "h_4", name: "凱爾", className: "Wizard", hp: 16, maxHp: 18, dead: false },
        { id: "h_5", name: "芬恩", className: "Bard", hp: 19, maxHp: 21, dead: false },
      ],
      cast: [
        { id: "f_1", kind: "foe", present: true, name: "酒館惡霸", role: "bandit", hp: 11, maxHp: 11, status: "敵對" },
        { id: "f_2", kind: "foe", present: true, name: "獨眼強盜頭目", role: "orc", hp: 19, maxHp: 19, status: "敵對" },
      ],
      log: [{ id: "l0", type: "narration", turn: 1, text: "酒館內突然爆發衝突。" }],
    };
    const cfg = bridge.mapStorySessionTo3DConfig(mockSession);
    assert.equal(cfg.scenarioId, "tavern_brawl");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "airship_deck" }), "ship_deck");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "volcanic_caves" }), "volcanic_forge");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "sand_arena" }), "desert_canyon");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "coral_shrine" }), "coral_underwater");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "mountain_pass" }), "mountain_cliff");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "royal_hall" }), "castle_throne");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "night_alley" }), "urban_alley");
    assert.equal(bridge.inferScenarioIdFromSession({ map: "swamp_ruins" }), "swamp_ruins");
    assert.equal(cfg.lighting, "dusk");
    assert.equal(cfg.weather, "rain");
    assert.equal(cfg.partyPresets.length, 5, "Story bridge must support 5-hero parties");
    assert.equal(cfg.foeIds.length, 2);

    const bStory = createBattleState(cfg);
    assert.equal(bStory.map.weather, "rain");
    assert.equal(bStory.map.lighting, "dusk");
    const hEd = bStory.units.find((u) => u.id === "h_1");
    assert.equal(hEd.hp, 17, "Story hero HP must carry into 3D battle");
    const fBoss = bStory.units.find((u) => u.name === "獨眼強盜頭目");
    assert.ok(fBoss && fBoss.hp === 19, "Story foe name & HP must carry into 3D battle");

    hEd.hp = 12;
    bStory.units.filter((u) => u.side === "foe").forEach((f) => { f.hp = 0; });
    bStory.outcome = "victory";
    const storySum = exportBattleSummary(bStory);
    const updatedSession = bridge.applyBattleSummaryToSession(mockSession, storySum);
    assert.equal(updatedSession.heroes.find((h) => h.id === "h_1").hp, 12, "3D battle HP must sync back to story");
    assert.ok(updatedSession.cast.every((c) => c.status === "倒下" && c.hp === 0), "Defeated foes must update in story cast");
    assert.equal(updatedSession.log.length, 2, "Battle chronicle must append to story log");
    console.log("PASS Test 7: Story <-> 3D Tactical Bridge round-trip verified");

    // Test 8: Interactive Objectives, Non-Lethal Capture, Shout/Improv & Retreat
    const bTrpg = createBattleState({ scenarioId: "cave_ambush", seed: 404, partyLevel: 3 });
    const objProp = bTrpg.map.props.find((p) => p.interactable);
    assert.ok(objProp, "Every scenario must include at least 1 interactable objective prop");
    const heroT = bTrpg.units.find((u) => u.side === "hero");
    heroT.x = objProp.x;
    heroT.y = Math.max(1, objProp.y - 1);
    heroT.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 1 };
    heroT.mods = { ...heroT.mods, dex: 20, str: 20, int: 20, wis: 20 }; // Guarantee skill check pass
    const interRes = executePropInteract(bTrpg, heroT.id, objProp.id);
    assert.equal(interRes.ok, true);
    assert.equal(interRes.success, true);
    assert.equal(objProp.completed, true, "Objective prop must mark completed on success");
    assert.ok(interRes.events.some((e) => e.type === "bubble"), "Prop interaction must emit hero speech bubble");
    assert.equal(barks.classifySpeakerCategory({ side: "foe", templateId: "wolf", className: "beast" }), "animal");
    assert.equal(barks.classifySpeakerCategory({ side: "foe", templateId: "skeleton", className: "undead" }), "undead");
    assert.equal(barks.classifySpeakerCategory({ side: "foe", templateId: "goblin", cr: 0.25 }), "minion");
    assert.equal(barks.classifySpeakerCategory({ side: "foe", templateId: "orc", cr: 0.5 }), "elite");
    assert.equal(barks.classifySpeakerCategory({ side: "foe", templateId: "troll", footprint: 2, cr: 5 }), "boss");

    const shoutRes = applyShoutOrImprovAction(bTrpg, heroT.id, "對哥布林喊再不投降就別怪我們無情", {
      success: true,
      effectType: "frighten_foes",
      narration: "你的威嚇令敵人膽寒！",
    });
    assert.equal(shoutRes.ok, true);
    assert.equal(shoutRes.success, true);

    bTrpg.nonLethal = true;
    const foeT = bTrpg.units.find((u) => u.side === "foe" && u.hp > 0);
    foeT.hp = 1;
    foeT.conditions.Paralyzed = 2;
    heroT.x = foeT.x;
    heroT.y = Math.max(1, foeT.y - 1);
    heroT.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 1 };
    const meleeWpn = heroT.weapons.find((w) => !w.isRanged) || heroT.weapons[0];
    meleeWpn.hitBonus = 25;
    meleeWpn.isRanged = false;
    const atkRes = executeWeaponAttack(bTrpg, heroT.id, meleeWpn.id, foeT.id);
    assert.equal(atkRes.ok, true, `Expected non-lethal attack ok, got ${atkRes.reason}`);
    assert.equal(foeT.captured, true, "Non-lethal blow must capture foe instead of killing");

    executePartyRetreat(bTrpg);
    assert.equal(bTrpg.ended, true);
    assert.equal(bTrpg.outcome, "retreat");
    const trpgSum = exportBattleSummary(bTrpg);
    assert.equal(trpgSum.completedObjectives.length, 1);
    assert.equal(trpgSum.capturedFoes.length, 1);
    console.log("PASS Test 8: Interactive Objectives, Non-Lethal Capture, Shout/Improv & Retreat verified");

    // Test 9: Ambush Surprise, Summoning, Dynamic Flood/Poison/Ice Persistent Hazards
    const bAmb = createBattleState({ scenarioId: "forest_ambush", seed: 505, partyLevel: 3, ambushMode: "foe_ambush" });
    const firstHeroAmb = bAmb.units.find((u) => u.side === "hero");
    assert.equal(firstHeroAmb.conditions.Surprised, 1, "Foe ambush must apply Surprised to heroes");

    const bSum = createBattleState({ scenarioId: "cave_ambush", seed: 606, partyLevel: 3 });
    const wizS = bSum.units.find((u) => u.id === "preset_wizard");
    wizS.slots[1] = 2;
    wizS.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };
    const sumRes = executeSummonAlly(bSum, wizS.id);
    assert.equal(sumRes.ok, true, "Wizard must summon spirit wolf ally");
    assert.ok(bSum.initiativeOrder.includes(sumRes.summon.id), "Summon must join initiativeOrder");

    triggerDynamicTerrainEvent(bSum, "flood");
    assert.equal(bSum.map.grid[5][6].type, "water", "Flood event must turn center band into water");
    triggerDynamicTerrainEvent(bSum, "poison_vent");
    assert.ok(bSum.map.grid.flat().some((t) => t.surface === "poison"), "Poison vent must spread persistent poison surface");
    const iceRx = applyElementalSurfaceReaction(bSum.map, 6, 5, "cold");
    assert.equal(iceRx.reaction, "water_freeze", "Cold on water must freeze surface into ice");
    console.log("PASS Test 9: Ambush Surprise, Summoning, Dynamic Flood/Poison/Ice Persistent Hazards verified");

    // Test 10: Flanking +2, Riposte Counterattack, Paladin Aura + Bardic Song, Passives (Power Attack / Crane Style)
    const auraHeroes = ["preset_paladin", "preset_bard", "preset_fighter", "preset_monk"]
      .map((id) => PRESET_HEROES.find((h) => h.id === id))
      .filter(Boolean);
    const bAura = createBattleState({ scenarioId: "cave_ambush", seed: 707, partyPresets: auraHeroes, partyLevel: 3 });
    const pal = bAura.units.find((u) => u.isPaladin);
    const brd = bAura.units.find((u) => u.isBard);
    const ftr = bAura.units.find((u) => u.isFighter);
    const mnk = bAura.units.find((u) => u.isMonk);
    const foeA = bAura.units.find((u) => u.side === "foe");
    pal.x = 5; pal.y = 5;
    brd.x = 5; brd.y = 6;
    ftr.x = 6; ftr.y = 5;
    mnk.x = 7; mnk.y = 6;
    foeA.x = 7; foeA.y = 5;
    const auraFx = getUnitAuraEffects(bAura, ftr);
    assert.equal(auraFx.saveBonus, 2, "Paladin aura within 2 cells must grant +2 save bonus");
    assert.equal(auraFx.hitBonus, 2, "Bard song of courage within 3 cells must grant +2 hit bonus");

    const modFlank = evaluateAttackModifiers(bAura, ftr, foeA, { isMelee: true, isRanged: false });
    assert.ok(modFlank.tags.includes("夾擊包抄 +2"), "Adjacent ally must trigger Flanking +2");

    ftr.stances.powerAttack = true;
    const modPower = evaluateAttackModifiers(bAura, ftr, foeA, { isMelee: true, isRanged: false });
    assert.equal(modPower.hitBonus, modFlank.hitBonus - 3, "Power Attack must apply -3 hit");
    assert.equal(modPower.dmgBonus, modFlank.dmgBonus + 6, "Power Attack must apply +6 dmg");

    const modCrane = evaluateAttackModifiers(bAura, foeA, mnk, { isMelee: true, isRanged: false });
    assert.ok(modCrane.tags.some((t) => t.includes("鶴形防禦")), "Monk Crane Style passive must add +2 AC");

    // Verify Bounded Accuracy cap (+4 max situational hit above base, excess -> +dmg) & Knockback telegraph interrupt
    ftr.conditions.Blessed = 2;
    const modCap = evaluateAttackModifiers(bAura, ftr, foeA, { isMelee: true, isRanged: false, hitBonusOverride: 5 });
    assert.ok(modCap.hitBonus <= 9, "Bounded accuracy must cap +hit bonus at base+4");
    assert.ok(modCap.dmgBonus >= 2, "Excess hit bonus must overflow into bonus damage");
    foeA.telegraphing = { kind: "shockwave", radius: 2, dmgDice: "3d6" };
    applyKnockback(bAura, foeA, 1, 0, 1, []);
    assert.equal(foeA.telegraphing, null, "Knockback must interrupt boss telegraphing");
    assert.ok(foeA.conditions.Stunned > 0, "Interrupted boss must become Stunned");
    console.log("PASS Test 10: Flanking +2, Riposte, Paladin Aura, Bardic Songs, Passives, Bounded Accuracy & Telegraph Interrupt verified");

    // Test 11: Antidote/Cure Conditions & Enemy Loot Drops + Auto-Pickup on Walk
    const bLoot = createBattleState({ scenarioId: "cave_ambush", seed: 808, partyLevel: 3, paceMode: "fast" });
    const ftrL = bLoot.units.find((u) => u.id === "preset_fighter");
    ftrL.conditions.Poisoned = 2;
    ftrL.conditions.Frightened = 2;
    ftrL.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 0 };
    const cureRes = executeCureConditions(bLoot, ftrL.id, ftrL.id, "antidote");
    assert.equal(cureRes.ok, true);
    assert.ok(!ftrL.conditions.Poisoned && !ftrL.conditions.Frightened, "Antidote must clear Poisoned & Frightened");

    // Place a loot drop adjacent to fighter and walk onto it
    const dropX = ftrL.x + 1;
    const dropY = ftrL.y;
    bLoot.map.grid[dropY][dropX].walkable = true;
    bLoot.map.grid[dropY][dropX].type = "floor";
    bLoot.map.drops.push({ id: "test_drop_1", x: dropX, y: dropY, kind: "antidote", name: "萬用解毒淨化劑" });
    const antBefore = ftrL.antidotes;
    const mvLoot = executeMove(bLoot, ftrL.id, dropX, dropY);
    assert.equal(mvLoot.ok, true);
    assert.equal(ftrL.antidotes, antBefore + 1, "Walking onto drop must auto-pickup antidote");
    assert.equal(bLoot.map.drops.length, 0, "Picked up drop must be removed from map");
    console.log("PASS Test 11: Antidote/Spell Cures & Enemy Loot Drop Auto-Pickup verified");

    // Verify AI/Story Blueprint Layouts (twin_ships, cliff_and_sea, wagon+campfire)
    const bpTwin = bridge.extractBlueprintFromText("海盜從另一艘船搭木板跳板攻過來！");
    assert.equal(bpTwin.layout, "twin_ships");
    const mTwin = generateVoxelMap("ship_deck", 909, 3, { blueprint: bpTwin });
    assert.equal(mTwin.connected, true, "twin_ships blueprint must be 100% BFS connected");
    assert.equal(mTwin.grid[4][7].type, "bridge", "twin_ships must build wooden plank across sea");

    const bpCliff = bridge.extractBlueprintFromText("一邊是高聳岸壁，另一邊是大海，路旁有貨車與營火。");
    assert.equal(bpCliff.layout, "cliff_and_sea");
    assert.ok(bpCliff.features.includes("wagon") && bpCliff.features.includes("campfire"));
    const mCliff = generateVoxelMap("mountain_cliff", 910, 3, { blueprint: bpCliff });
    assert.equal(mCliff.connected, true, "cliff_and_sea blueprint must be 100% BFS connected");
    assert.equal(mCliff.grid[9][5].type, "water", "cliff_and_sea south side must be sea");
    assert.ok(mCliff.props.some((p) => p.name === "商隊貨車"), "wagon feature must spawn 商隊貨車");

    // Verify 5-hero fast pace enemy scaling (>= 6 foes) and narrow-map 2x2 Large boss safety
    const b5Fast = createBattleState({
      scenarioId: "cave_ambush",
      seed: 911,
      partyPresets: selectedPresets.slice(0, 5),
      partyLevel: 3,
      paceMode: "fast",
    });
    assert.ok(b5Fast.units.filter((u) => u.side === "foe").length >= 6, "5-hero fast pace should spawn >=6 foes");
    const bNarrow = createBattleState({
      scenarioId: "tavern_brawl",
      seed: 912,
      partyPresets: selectedPresets.slice(0, 4),
      partyLevel: 3,
      foeIds: ["troll", "goblin"],
    });
    assert.ok(bNarrow.units.filter((u) => u.side === "foe").every((f) => f.footprint === 1), "Narrow small map must swap 2x2 boss for 1x1 elite");

    // Test 12: Story-driven Dynamic Hero & Foe Formations (bottom, scattered, surround, flank, ambush_behind, foeWaves)
    const bpBottom = bridge.extractBlueprintFromText("眾人從下方南側入口爬上來，敵軍從兩翼夾擊並有援軍陸續趕到！");
    assert.equal(bpBottom.heroFormation, "bottom");
    assert.equal(bpBottom.foeFormation, "flank");
    assert.equal(bpBottom.foeWaves, true);
    const bBottom = createBattleState({
      scenarioId: "cave_ambush",
      seed: 915,
      partyPresets: selectedPresets.slice(0, 4),
      blueprint: bpBottom,
    });
    assert.equal(bBottom.map.connected, true, "bottom + flank map must remain BFS connected");
    const bottomHeroes = bBottom.units.filter((u) => u.side === "hero");
    const avgHeroY = bottomHeroes.reduce((s, h) => s + h.y, 0) / bottomHeroes.length;
    assert.ok(avgHeroY >= 6.5, `bottom heroFormation should spawn heroes near bottom (avgY=${avgHeroY})`);
    const coordSetB = new Set(bBottom.units.map((u) => `${u.x},${u.y}`));
    assert.equal(coordSetB.size, bBottom.units.length, "Dynamic formations must not overlap any hero/foe");

    const bpSurround = bridge.extractBlueprintFromText("冒險者分散失散在廢墟中，四面八方遭到強盜團團包圍！");
    assert.equal(bpSurround.heroFormation, "scattered");
    assert.equal(bpSurround.foeFormation, "surround");
    const bSurround = createBattleState({
      scenarioId: "forest_ambush",
      seed: 916,
      partyPresets: selectedPresets.slice(0, 4),
      blueprint: bpSurround,
    });
    assert.equal(bSurround.map.connected, true, "scattered + surround map must remain BFS connected");
    const coordSetS = new Set(bSurround.units.map((u) => `${u.x},${u.y}`));
    assert.equal(coordSetS.size, bSurround.units.length, "Surround formation must not overlap any unit");
    console.log("PASS Test 12: Story-driven Dynamic Formations & Wave Hints verified");

    // Test 13: Allied NPCs, Protected VIPs, AI Ally Turns & Objective Overrides
    const mockEscortSession = {
      map: "forest_trail",
      place: { name: "林間商道" },
      node: { title: "商隊護送戰", situation: "敵軍從兩翼夾擊，必須保護商旅領袖安全！" },
      level: 3,
      turn: 4,
      heroes: [{ id: "h1", name: "卡爾", className: "戰士", hp: 28, maxHp: 28 }],
      cast: [
        { id: "vip_1", kind: "npc", name: "商旅領袖・艾德", role: "被保護人商旅", present: true, hp: 18, maxHp: 18 },
        { id: "ally_1", kind: "ally", name: "護衛凱爾", role: "商隊護衛", present: true, hp: 26, maxHp: 26 },
        { id: "foe_1", kind: "foe", name: "哥布林首領", role: "哥布林", present: true, hp: 14, maxHp: 14 },
      ],
    };
    const cfgEscort = bridge.mapStorySessionTo3DConfig(mockEscortSession);
    assert.equal(cfgEscort.allySpecs.length, 2, "Story bridge must extract VIP & Combat ally from cast");
    assert.equal(cfgEscort.allySpecs[0].allyRole, "vip");
    assert.equal(cfgEscort.allySpecs[1].allyRole, "combat");

    const bEscort = createBattleState({
      ...cfgEscort,
      blueprint: { ...(cfgEscort.blueprint || {}), objectiveOverride: "escort_vip" },
    });
    const vipUnit = bEscort.units.find((u) => u.isNpcAlly && u.allyRole === "vip");
    const guardUnit = bEscort.units.find((u) => u.isNpcAlly && u.allyRole === "combat");
    assert.ok(vipUnit && guardUnit, "createBattleState must spawn both VIP and combat ally");
    const escortProp = bEscort.map.props.find((p) => p.interactable);
    assert.equal(escortProp.objectiveType, "rescue", "objectiveOverride=escort_vip must set rescue objective");

    vipUnit.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 1 };
    const vipTurnRes = rules.decideAllyTurn(bEscort, vipUnit.id);
    assert.equal(vipTurnRes.battleEnded, false);

    guardUnit.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 6, attacksLeft: 1 };
    const guardTurnRes = rules.decideAllyTurn(bEscort, guardUnit.id);
    assert.ok(Array.isArray(guardTurnRes.events));

    // Mark foe defeated & verify summary + story writeback
    bEscort.units.filter((u) => u.side === "foe").forEach((f) => { f.hp = 0; });
    rules.checkBattleOutcome(bEscort);
    const escortSummary = rules.exportBattleSummary(bEscort);
    assert.equal(escortSummary.vipProtected, true, "Summary must record vipProtected when VIP survives");
    assert.equal(escortSummary.allyStatus.length, 2);
    const updatedEscortSession = bridge.applyBattleSummaryToSession(mockEscortSession, escortSummary);
    const updatedVip = updatedEscortSession.cast.find((c) => c.id === "vip_1");
    assert.equal(updatedVip.status, "安全脫險", "VIP survival must write back 安全脫險 to story cast");
    console.log("PASS Test 13: Allied NPCs, Protected VIPs, AI Ally Turns & Objective Overrides verified");

    // Test 14: Dragon Hunt, Demon Legion, Tower Defense, Chase & 3-Relic Collection Mechanics
    const bDragon = createBattleState({
      scenarioId: "volcanic_forge",
      seed: 930,
      partyLevel: 3,
      foeIds: ["young_red_dragon", "imp"],
      blueprint: { layout: "auto", features: ["altar"], objectiveOverride: "tower_defense", foeWaves: true },
    });
    const dragonUnit = bDragon.units.find((u) => u.templateId === "young_red_dragon");
    const impUnit = bDragon.units.find((u) => u.templateId === "imp");
    assert.ok(dragonUnit && impUnit, "Must hydrate young_red_dragon and imp");
    assert.ok(dragonUnit.maxHp <= 85, `Lv3 simulator dragon boss HP must scale to winnable range (got ${dragonUnit.maxHp})`);
    const towerProp = bDragon.map.props.find((p) => p.objectiveType === "tower_core");
    assert.ok(towerProp, "tower_defense must spawn tower_core prop");

    const bCollect = createBattleState({
      scenarioId: "swamp_ruins",
      seed: 931,
      partyLevel: 3,
      blueprint: { layout: "auto", features: [], objectiveOverride: "collect_relics" },
    });
    const collectProps = bCollect.map.props.filter((p) => p.objectiveType === "collect");
    assert.equal(collectProps.length, 3, "collect_relics must spawn 3 collectible relic props");
    console.log("PASS Test 14: Dragon/Demon Templates, Tower Defense & 3-Relic Collection verified");
    console.log("ALL 14 TACTICAL 3D ENGINE TESTS + BLUEPRINT TESTS PASSED");
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
