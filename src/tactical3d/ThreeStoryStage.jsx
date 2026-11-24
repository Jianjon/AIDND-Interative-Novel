import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./tactical3d.css";
import ThreeBattleCanvas from "./ThreeBattleCanvas.jsx";
import TacticalDiceModal from "./TacticalDiceModal.jsx";
import { mapStorySessionTo3DConfig } from "./storyBridge.js";
import {
  createBattleState,
  computeReachable3D,
  executePropInteract,
} from "./dnd5eRulesEngine.js";

function cloneExplorationBattle(b) {
  return {
    ...b,
    units: b.units.map((u) => ({ ...u, turn: { ...(u.turn || {}) } })),
    map: {
      ...b.map,
      props: (b.map?.props || []).map((p) => ({ ...p })),
      grid: (b.map?.grid || []).map((row) => row.map((cell) => ({ ...cell }))),
    },
  };
}

function findPathFromReach(reach, unit, tx, ty) {
  if (!reach) return null;
  const key = `${tx},${ty}`;
  if (!reach.has(key)) return null;
  const path = [];
  let curKey = key;
  const visited = new Set();
  while (curKey && !visited.has(curKey)) {
    visited.add(curKey);
    const [cx, cy] = curKey.split(",").map(Number);
    path.unshift({ x: cx, y: cy });
    const entry = reach.get(curKey);
    curKey = entry?.parent || null;
  }
  if (path.length === 0 || path[0].x !== unit.x || path[0].y !== unit.y) {
    path.unshift({ x: unit.x, y: unit.y });
  }
  return path;
}

export default function ThreeStoryStage({
  session,
  activeId = null,
  focusedHeroId = null,
  isPicking = false,
  turnKey = 1,
  speechBubble = null,
  onBubbleClick = null,
  onSelectUnit = null,
  onSelectProp = null,
  onPositionsChange = null,
  onExplorationLoot = null,
}) {
  const [rotation, setRotation] = useState(0);
  const [recenterToken, setRecenterToken] = useState(0);
  const [zoomCmd, setZoomCmd] = useState(null);
  const [hoverTile, setHoverTile] = useState(null);
  const [eventsBatch, setEventsBatch] = useState([]);
  const [leaderStoryId, setLeaderStoryId] = useState(null);
  const [activeScreenPos, setActiveScreenPos] = useState(null);
  const [activeDiceRoll, setActiveDiceRoll] = useState(null);
  const [localHint, setLocalHint] = useState("");
  const hintTimerRef = useRef(null);

  const showHint = useCallback((msg) => {
    if (!msg) return;
    setLocalHint(msg);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setLocalHint(""), 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  // Sync active controllable hero with the right sidebar's sequential hero picker (Hero 1 -> 2 -> 3 -> 4)
  useEffect(() => {
    if (focusedHeroId) {
      setLeaderStoryId(focusedHeroId);
    }
  }, [focusedHeroId]);

  const cfg = useMemo(() => {
    if (!session) return null;
    return mapStorySessionTo3DConfig(session);
  }, [
    session?.map,
    session?.node?.id,
    session?.turn,
    session?.sceneMood?.lighting,
    session?.sceneMood?.ambient,
    session?.heroes?.length,
    session?.cast?.length,
  ]);

  const [battle, setBattle] = useState(null);
  const mapKey = `${session?.map || "default"}_${session?.node?.id || "0"}`;

  useEffect(() => {
    if (!cfg) return;
    const isSurpriseAmbush = cfg.ambushMode === "foe_surprise";
    const created = createBattleState({
      scenarioId: cfg.scenarioId || "cave_ambush",
      seed: cfg.seed || 101,
      partyPresets: cfg.partyPresets,
      partyLevel: cfg.partyLevel || 3,
      foeIds: isSurpriseAmbush ? [] : cfg.foeIds,
      foeSpecs: isSurpriseAmbush ? [] : cfg.foeSpecs,
      allySpecs: cfg.allySpecs,
      weather: cfg.weather || "auto",
      lighting: cfg.lighting || "auto",
      blueprint: cfg.blueprint,
      ambushMode: "normal",
      allowZeroFoes: true,
    });
    const livingHeroes = (session?.heroes || []).filter((h) => h && !h.dead);
    let hIdx = 0;
    for (const u of created.units) {
      if (u.side === "hero" && livingHeroes[hIdx]) {
        u.storyId = livingHeroes[hIdx].id;
        hIdx++;
      } else if (u.side === "foe" && cfg.foeSpecs?.[0]) {
        const matched = cfg.foeSpecs.find((fs) => fs.name === u.name);
        if (matched?.storyCastId) u.storyId = matched.storyCastId;
      }
      u.turn = { ...(u.turn || {}), movementLeft: u.speedCells || 6, actionLeft: 1, bonusLeft: 1 };
    }
    setBattle(created);
    const firstHero = created.units.find((u) => u.side === "hero" && !u.dead);
    if (firstHero) setLeaderStoryId((prev) => focusedHeroId || prev || firstHero.storyId || firstHero.id);
  }, [mapKey]);

  // Refresh movement points at the start of each new planning turn (turnKey)
  useEffect(() => {
    setBattle((prev) => {
      if (!prev) return prev;
      const next = cloneExplorationBattle(prev);
      for (const u of next.units) {
        if (u.side === "hero" && !u.dead) {
          u.turn = { ...(u.turn || {}), movementLeft: u.speedCells || 6, actionLeft: 1, bonusLeft: 1 };
        }
      }
      return next;
    });
  }, [turnKey]);

  const leaderUnit = useMemo(() => {
    if (!battle) return null;
    return (
      battle.units.find((u) => u.side === "hero" && !u.dead && (u.storyId === leaderStoryId || u.id === leaderStoryId)) ||
      battle.units.find((u) => u.side === "hero" && !u.dead) ||
      null
    );
  }, [battle, leaderStoryId]);

  const speakerUnit = useMemo(() => {
    if (!battle) return leaderUnit;
    if (activeId) {
      const found = battle.units.find((u) => !u.dead && (u.storyId === activeId || u.id === activeId));
      if (found) return found;
    }
    return leaderUnit;
  }, [battle, activeId, leaderUnit]);

  // Report each hero's 3D coordinates + nearby props & NPCs/foes so AI generates context-aware next-turn options
  useEffect(() => {
    if (!battle) return;
    const propsList = (battle.map?.props || []).filter((p) => !p.broken);
    const castList = (battle.units || []).filter((u) => u.side !== "hero" && !u.dead && u.hp > 0);
    const summary = (battle.units || [])
      .filter((u) => u.side === "hero" && !u.dead)
      .map((u) => {
        const nearbyProps = propsList
          .map((p) => ({ name: p.name, skill: p.skillName || "巧手/運動", dc: p.dc || 10, dist: Math.max(Math.abs(u.x - p.x), Math.abs(u.y - p.y)) }))
          .filter((p) => p.dist <= 2);
        const nearbyCast = castList
          .map((c) => ({ name: c.name, dist: Math.max(Math.abs(u.x - c.x), Math.abs(u.y - c.y)) }))
          .filter((c) => c.dist <= 3);
        return {
          heroId: u.storyId || u.id,
          name: u.name,
          x: u.x,
          y: u.y,
          h: battle.map?.grid?.[u.y]?.[u.x]?.h ?? 1,
          passivePerception: 10 + (u.skillBonuses?.perception ?? u.mods?.wis ?? 0),
          passiveArcana: 10 + (u.skillBonuses?.arcana ?? u.mods?.int ?? 0),
          passiveReligion: 10 + (u.skillBonuses?.religion ?? u.mods?.wis ?? 0),
          nearbyProps,
          nearbyCast,
        };
      });
    if (typeof window !== "undefined") window.__aidndStage3dSummary = summary;
    if (onPositionsChange) onPositionsChange(summary);
  }, [battle, onPositionsChange]);

  // Show movement range (blue cells) for the currently focused hero when picking/moving
  const reachableMap = useMemo(() => {
    if (!battle || !leaderUnit || speechBubble) return null;
    if ((leaderUnit.turn?.movementLeft || 0) <= 0) return null;
    return computeReachable3D(battle, leaderUnit);
  }, [battle, leaderUnit, speechBubble]);

  const handleClickTile = useCallback(
    (pt) => {
      if (!battle || !pt) return;
      const { x, y } = pt;
      if (!Number.isInteger(x) || !Number.isInteger(y)) return;
      const clickedUnit = battle.units.find(
        (u) => !u.dead && x >= u.x && x < u.x + (u.footprint || 1) && y >= u.y && y < u.y + (u.footprint || 1)
      );
      if (clickedUnit) {
        if (clickedUnit.side === "hero") {
          setLeaderStoryId(clickedUnit.storyId || clickedUnit.id);
          showHint(`🦶 切換控制：${clickedUnit.name}（剩餘移動 ${clickedUnit.turn?.movementLeft ?? clickedUnit.speedCells ?? 6} 格）`);
        } else {
          if (onSelectUnit) onSelectUnit(clickedUnit);
          else showHint(`👁️ ${clickedUnit.name}（HP ${clickedUnit.hp}/${clickedUnit.maxHp}）`);
        }
        return;
      }

      const clickedProp = (battle.map?.props || []).find((p) => !p.broken && p.x === x && p.y === y);
      if (clickedProp) {
        if (leaderUnit) {
          const dist = Math.max(Math.abs(leaderUnit.x - clickedProp.x), Math.abs(leaderUnit.y - clickedProp.y));
          if (dist <= 1) {
            const next = cloneExplorationBattle(battle);
            const actor = next.units.find((u) => u.id === leaderUnit.id);
            if (actor) actor.turn = { ...(actor.turn || {}), actionLeft: 1, bonusLeft: 1 };
            const res = executePropInteract(next, leaderUnit.id, clickedProp.id);
            if (res.ok) {
              setBattle(next);
              const stamp = `${Date.now()}_${Math.random()}`;
              setEventsBatch((res.events || []).map((e, i) => ({ ...e, _uid: `${stamp}_${i}` })));
              const diceEv = (res.events || []).find((ev) => ev.type === "dice");
              if (diceEv) {
                setActiveDiceRoll({
                  ...diceEv,
                  actionSummary: `${leaderUnit.name} 靠近【${clickedProp.name}】並嘗試進行${diceEv.actionName || "技能檢定"}`,
                  outcomeText: res.success
                    ? `【檢定成功】${clickedProp.rewardDesc || "物件互動成功！"}`
                    : `【檢定失敗】${clickedProp.name} 暫時無法啟動，可再試一次。`,
                  confirmLabel: "✓ 確認結果（空白鍵 / 點擊）",
                });
              }
              if (res.chestLoot && onExplorationLoot) {
                onExplorationLoot(res.chestLoot, clickedProp, leaderUnit);
              }
              showHint(
                res.chestLoot
                  ? res.chestLoot.summaryText
                  : res.success
                    ? `✨ ${clickedProp.rewardDesc || "互動成功！"}`
                    : `🔍 ${clickedProp.name} 檢定未過`
              );
              return;
            }
          }
        }
        if (onSelectProp) onSelectProp(clickedProp);
        else showHint(`🔍 【${clickedProp.name}】(${clickedProp.skillName || "運動/巧手"} DC ${clickedProp.dc || 10}) — 走到相鄰格點擊即可檢定`);
        return;
      }

      if (!leaderUnit) return;
      const tile = battle.map?.grid?.[y]?.[x];
      if (!tile || !tile.walkable) return;

      const reach = computeReachable3D(battle, leaderUnit);
      const entry = reach.get(`${x},${y}`);
      const path = findPathFromReach(reach, leaderUnit, x, y);
      if (!entry || !path || path.length < 2) {
        showHint("超出此角色本輪移動範圍，或地形受阻");
        return;
      }

      const next = cloneExplorationBattle(battle);
      const nextLeader = next.units.find((u) => u.id === leaderUnit.id);
      if (!nextLeader) return;

      // Individual movement ONLY (只要分開走，不統一跟隨)
      nextLeader.x = x;
      nextLeader.y = y;
      nextLeader.turn.movementLeft = Math.max(0, (nextLeader.turn?.movementLeft ?? 6) - (entry.cost || 1));

      const stamp = `${Date.now()}_${Math.random()}`;
      setBattle(next);
      setEventsBatch([{ type: "move", unitId: nextLeader.id, path, _uid: `${stamp}_0` }]);
      showHint(`🦶 ${nextLeader.name} 已移動（剩 ${nextLeader.turn.movementLeft} 格）`);
    },
    [battle, leaderUnit, onSelectProp, onSelectUnit, showHint]
  );

  if (!battle) return null;

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden" }}>
      <ThreeBattleCanvas
        battle={battle}
        activeUnitId={speakerUnit?.id || leaderUnit?.id || null}
        reachableMap={reachableMap}
        targetKeys={null}
        hoverTile={hoverTile}
        hoverForecast={null}
        rotation={rotation}
        cutaway={true}
        recenterToken={recenterToken}
        zoomCmd={zoomCmd}
        eventsBatch={eventsBatch}
        onHoverTile={(x, y) => setHoverTile({ x, y })}
        onClickTile={handleClickTile}
        onActiveScreenPos={setActiveScreenPos}
        storyMode={true}
      />

      {/* Upright Screen-Space Projected Speech Bubble */}
      {speechBubble && activeScreenPos && (
        <div
          role="status"
          onClick={(e) => {
            e.stopPropagation();
            if (onBubbleClick) onBubbleClick();
          }}
          style={{
            position: "absolute",
            left: Math.max(150, Math.min((activeScreenPos.w || 900) - 150, activeScreenPos.x)),
            top: Math.max(64, activeScreenPos.y - 24),
            transform: "translate(-50%, -100%)",
            zIndex: 42,
            width: "clamp(220px, 28vw, 340px)",
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(9, 14, 22, 0.94)",
            border: `1.5px solid ${speechBubble.side === "foe" ? "rgba(248, 113, 113, 0.85)" : "rgba(240, 207, 122, 0.88)"}`,
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.85)",
            color: "#f8fafc",
            fontSize: 13.5,
            lineHeight: 1.55,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, fontSize: 11, color: "#fbbf24" }}>
            <strong>{speechBubble.name}</strong>
            <span>{speechBubble.totalPages > 1 ? `${speechBubble.page}/${speechBubble.totalPages} · ` : ""}點擊繼續 ▶</span>
          </div>
          <div>{speechBubble.text}</div>
        </div>
      )}

      {/* Unified 3D Polyhedral Dice Modal for exploration prop checks */}
      {activeDiceRoll && (
        <TacticalDiceModal
          roll={activeDiceRoll}
          onComplete={() => setActiveDiceRoll(null)}
        />
      )}

      {/* Compact Single View Capsule + Hero Movement Badge (top-left) */}
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 48,
          zIndex: 30,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          maxWidth: "calc(100% - 260px)",
          pointerEvents: "auto",
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div
          className="stage-pill-btn"
          style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: "2px 6px" }}
          role="group"
          aria-label="3D 視角控制"
        >
          <button
            type="button"
            style={{ background: "transparent", border: 0, color: "inherit", padding: "2px 5px", cursor: "pointer" }}
            onClick={() => setRotation((r) => (r + 1) % 4)}
            title="旋轉 45° 3D 舞台視角"
          >
            ↻
          </button>
          <span style={{ opacity: 0.3 }}>|</span>
          <button
            type="button"
            style={{ background: "transparent", border: 0, color: "inherit", padding: "2px 5px", cursor: "pointer" }}
            onClick={() => setRecenterToken((t) => t + 1)}
            title="重設鏡頭至舞台中央"
          >
            🎯
          </button>
          <span style={{ opacity: 0.3 }}>|</span>
          <button
            type="button"
            style={{ background: "transparent", border: 0, color: "inherit", padding: "2px 5px", cursor: "pointer", fontWeight: 700 }}
            onClick={() => setZoomCmd({ seq: Date.now() + Math.random(), delta: -0.9 })}
            title="放大 3D 舞台地圖"
          >
            ＋
          </button>
          <span style={{ opacity: 0.3 }}>|</span>
          <button
            type="button"
            style={{ background: "transparent", border: 0, color: "inherit", padding: "2px 5px", cursor: "pointer", fontWeight: 700 }}
            onClick={() => setZoomCmd({ seq: Date.now() + Math.random(), delta: 0.9 })}
            title="縮小 3D 舞台地圖"
          >
            －
          </button>
        </div>
        {leaderUnit && (
          <span
            className="stage-pill-btn"
            style={{ borderColor: "#38bdf8", color: "#e0f2fe", cursor: "default", padding: "3px 9px" }}
            title="藍格為可自由移動範圍；點擊角色切換操作，點擊藍格移動，點擊相鄰物件可互動"
          >
            🦶 {leaderUnit.name} · {leaderUnit.turn?.movementLeft ?? leaderUnit.speedCells ?? 6}格
          </span>
        )}
        {localHint && (
          <span
            className="stage-pill-btn"
            style={{ borderColor: "#fbbf24", color: "#fef3c7", background: "rgba(15, 23, 42, 0.94)" }}
          >
            {localHint}
          </span>
        )}
      </div>
    </div>
  );
}
