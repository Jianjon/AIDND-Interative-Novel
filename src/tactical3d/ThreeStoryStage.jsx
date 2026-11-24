import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./tactical3d.css";
import ThreeBattleCanvas from "./ThreeBattleCanvas.jsx";
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

function findPath3D(battle, unit, tx, ty) {
  const reach = computeReachable3D(battle, { ...unit, turn: { ...(unit.turn || {}), movementLeft: 28 } });
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
  speechBubble = null,
  onBubbleClick = null,
  onSelectUnit = null,
  onSelectProp = null,
}) {
  const [rotation, setRotation] = useState(0);
  const [recenterToken, setRecenterToken] = useState(0);
  const [hoverTile, setHoverTile] = useState(null);
  const [eventsBatch, setEventsBatch] = useState([]);
  const [leaderStoryId, setLeaderStoryId] = useState(null);
  const [activeScreenPos, setActiveScreenPos] = useState(null);
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
    const created = createBattleState({
      scenarioId: cfg.scenarioId || "cave_ambush",
      seed: 101 + ((session?.turn || 1) % 7) * 17,
      partyPresets: cfg.partyPresets,
      partyLevel: cfg.partyLevel || 3,
      foeIds: cfg.foeIds,
      foeSpecs: cfg.foeSpecs,
      allySpecs: cfg.allySpecs,
      weather: cfg.weather || "auto",
      lighting: cfg.lighting || "auto",
      blueprint: cfg.blueprint,
      ambushMode: "normal",
    });
    // Tag heroes with original story hero IDs so Theater activeId maps 1:1
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
      u.turn = { ...(u.turn || {}), movementLeft: 28, actionLeft: 1, bonusLeft: 1 };
    }
    setBattle(created);
    const firstHero = created.units.find((u) => u.side === "hero" && !u.dead);
    if (firstHero) setLeaderStoryId((prev) => prev || firstHero.storyId || firstHero.id);
  }, [mapKey]);

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

  const handleClickTile = useCallback(
    (x, y) => {
      if (!battle) return;
      const clickedUnit = battle.units.find(
        (u) => !u.dead && x >= u.x && x < u.x + (u.footprint || 1) && y >= u.y && y < u.y + (u.footprint || 1)
      );
      if (clickedUnit) {
        if (clickedUnit.side === "hero") {
          setLeaderStoryId(clickedUnit.storyId || clickedUnit.id);
          showHint(`👑 切換領隊：${clickedUnit.name}`);
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
            if (actor) actor.turn = { actionLeft: 1, bonusLeft: 1, movementLeft: 28 };
            const res = executePropInteract(next, leaderUnit.id, clickedProp.id);
            if (res.ok) {
              setBattle(next);
              const stamp = `${Date.now()}_${Math.random()}`;
              setEventsBatch((res.events || []).map((e, i) => ({ ...e, _uid: `${stamp}_${i}` })));
              showHint(res.success ? `✨ ${clickedProp.rewardDesc || "互動成功！"}` : `🔍 ${clickedProp.name} 檢定未過，可再試一次`);
              return;
            }
          }
        }
        if (onSelectProp) onSelectProp(clickedProp);
        else showHint(`🔍 【${clickedProp.name}】(${clickedProp.skillName || "運動/巧手"} DC ${clickedProp.dc || 10}) — 走近至相鄰格點擊即可檢定`);
        return;
      }

      if (!leaderUnit) return;
      const tile = battle.map?.grid?.[y]?.[x];
      if (!tile || !tile.walkable) return;

      const path = findPath3D(battle, leaderUnit, x, y);
      if (!path || path.length < 2) {
        showHint("無法到達該方塊");
        return;
      }

      const next = cloneExplorationBattle(battle);
      const nextLeader = next.units.find((u) => u.id === leaderUnit.id);
      if (!nextLeader) return;

      const prevTrail = [{ x: nextLeader.x, y: nextLeader.y }, ...path.slice(1, -1)].reverse();
      nextLeader.x = x;
      nextLeader.y = y;

      const evs = [{ type: "move", unitId: nextLeader.id, path }];

      // Auto-follow party members 1-2 steps behind leader (0 AI)
      const followers = next.units.filter((u) => u.side === "hero" && !u.dead && u.id !== nextLeader.id);
      const occupied = new Set([`${x},${y}`]);
      followers.forEach((f, idx) => {
        const candidate = prevTrail[idx] || prevTrail[prevTrail.length - 1];
        if (!candidate) return;
        const cKey = `${candidate.x},${candidate.y}`;
        if (!occupied.has(cKey) && next.map?.grid?.[candidate.y]?.[candidate.x]?.walkable) {
          const fPath = findPath3D(next, f, candidate.x, candidate.y);
          if (fPath && fPath.length >= 2) {
            occupied.add(cKey);
            f.x = candidate.x;
            f.y = candidate.y;
            evs.push({ type: "move", unitId: f.id, path: fPath });
          }
        }
      });

      const stamp = `${Date.now()}_${Math.random()}`;
      setBattle(next);
      setEventsBatch(evs.map((e, i) => ({ ...e, _uid: `${stamp}_${i}` })));
    },
    [battle, leaderUnit, onSelectProp, onSelectUnit, showHint]
  );

  if (!battle) return null;

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden" }}>
      <ThreeBattleCanvas
        battle={battle}
        activeUnitId={speakerUnit?.id || leaderUnit?.id || null}
        reachableMap={null}
        targetKeys={null}
        hoverTile={hoverTile}
        hoverForecast={null}
        rotation={rotation}
        cutaway={true}
        recenterToken={recenterToken}
        eventsBatch={eventsBatch}
        onHoverTile={(x, y) => setHoverTile({ x, y })}
        onClickTile={handleClickTile}
        onActiveScreenPos={setActiveScreenPos}
        storyMode={true}
      />

      {/* Upright Screen-Space Projected Speech Bubble (never tilted 45 deg) */}
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
            {speechBubble.totalPages > 1 && (
              <span>{speechBubble.page}/{speechBubble.totalPages}</span>
            )}
          </div>
          <div>{speechBubble.text}</div>
        </div>
      )}

      {/* Lightweight 3D Story Stage Controls */}
      <div
        style={{
          position: "absolute",
          left: 12,
          bottom: 12,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 6,
          pointerEvents: "auto",
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="stage-pill-btn"
          onClick={() => setRotation((r) => (r + 1) % 4)}
          title="旋轉 45° 3D 舞台視角"
        >
          ↻ 旋轉視角
        </button>
        <button
          type="button"
          className="stage-pill-btn"
          onClick={() => setRecenterToken((t) => t + 1)}
          title="重設鏡頭至舞台中央"
        >
          🎯 置中
        </button>
        {leaderUnit && (
          <span
            className="stage-pill-btn"
            style={{ cursor: "default", opacity: 0.92 }}
            title="點擊地板自由移動（0 AI 延遲）；點擊隊友可切換領隊"
          >
            👑 {leaderUnit.name} · 點方塊移動
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
