import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { B as BGM_MAP, p as AudioManagerClass } from "../artifactDeps.js";
import { TACTICAL3D_SCENARIOS, WEATHER_PRESETS, LIGHTING_PRESETS } from "./voxelMapGenerator.js";
import {
  PRESET_HEROES,
  CONDITIONS,
  abilityMod,
  hydrateHeroUnit,
  createBattleState,
  getActiveUnit,
  getUnitAtCell,
  getUnitCells,
  getEffectiveSpeed,
  getUnitAuraEffects,
  computeReachable3D,
  computeCombatForecast,
  getSpellEffectiveRange,
  executeMove,
  executeStandUp,
  executeWeaponAttack,
  executeSpellCast,
  executeStandardAction,
  executeClassAbility,
  executePropInteract,
  executePartyRetreat,
  executeSummonAlly,
  executeCureConditions,
  applyShoutOrImprovAction,
  decideAllyTurn,
  decideEnemyTurn,
  endUnitTurn,
  exportBattleSummary,
} from "./dnd5eRulesEngine.js";
import { adjudicateTacticalShoutWithAI } from "./storyBridge.js";
import ThreeBattleCanvas from "./ThreeBattleCanvas.jsx";
import TacticalDiceModal from "./TacticalDiceModal.jsx";
import { playTacticalSfx } from "./combatSfx.js";
import "./tactical3d.css";

const DEFAULT_HERO_IDS = ["preset_fighter", "preset_rogue", "preset_cleric", "preset_wizard"];

const FOE_PACK_MAP = {
  auto: null,
  goblin_swarm: ["goblin", "goblin", "goblin_archer", "goblin_archer", "hobgoblin"],
  bandit_pirates: ["bandit", "bandit", "goblin_archer", "bandit_captain"],
  undead_horde: ["skeleton", "skeleton", "zombie", "zombie", "cult_fanatic"],
  cult_ritual: ["cultist", "cultist", "cult_fanatic", "orc", "goblin_archer"],
  giant_boss: ["troll", "orc", "goblin_archer", "goblin"],
  dragon_boss: ["young_red_dragon", "red_dragon_wyrmling", "cultist", "goblin_archer"],
  wyvern_pack: ["wyvern", "goblin_archer", "bandit", "bandit"],
  demon_legion: ["imp", "imp", "cult_fanatic", "cultist", "orc"],
  vampire_coven: ["vampire_spawn", "skeleton", "skeleton", "zombie", "cult_fanatic"],
  frost_siege: ["frost_giant", "wolf", "wolf", "orc", "goblin_archer"],
};

const ALLY_PACK_MAP = {
  none: null,
  vip: [{ name: "商旅領袖・艾德", allyRole: "vip", avatar: "/prototype-assets/lego-creatures-v1/noble_mayor.png" }],
  guard: [{ name: "精銳護衛・凱爾", allyRole: "combat", avatar: "/prototype-assets/lego-creatures-v1/halberd_palace_guard.png" }],
  vip_and_guard: [
    { name: "被保護人・艾德", allyRole: "vip", avatar: "/prototype-assets/lego-creatures-v1/noble_mayor.png" },
    { name: "隨行護衛・凱爾", allyRole: "combat", avatar: "/prototype-assets/lego-creatures-v1/halberd_palace_guard.png" },
  ],
};

const SIMULATOR_PRESETS = [
  { id: "custom", label: "🎛️ 自訂模擬條件", desc: "自由搭配以下所有地形、站位、敵軍、友軍與達成目的" },
  {
    id: "dragon_lair",
    label: "🐉 紅龍巢穴討伐戰（打龍｜巢穴＋高溫餘燼＋龍息）",
    desc: "直面青年紅龍與雛龍守護的火山巢穴，利用高地與淨化祭壇壓制龍族",
    config: {
      scenarioId: "volcanic_forge",
      weatherId: "embers",
      lightingId: "underground",
      ambushMode: "normal",
      blueprintHint: "altar_ritual",
      heroFormation: "bottom",
      foeFormation: "top",
      foePack: "dragon_boss",
      allyPack: "guard",
      objectivePreset: "destroy_altar",
      foeWaves: false,
    },
  },
  {
    id: "wyvern_cliff",
    label: "🦅 懸崖雙足飛龍突襲（打龍｜岸壁與海＋強風＋高處俯衝）",
    desc: "一邊是峭壁、一邊是大海的險道，飛龍自上方高處俯衝來襲",
    config: {
      scenarioId: "mountain_cliff",
      weatherId: "gale",
      lightingId: "dusk",
      ambushMode: "normal",
      blueprintHint: "cliff_and_sea",
      heroFormation: "bottom",
      foeFormation: "top",
      foePack: "wyvern_pack",
      allyPack: "none",
      objectivePreset: "auto",
      foeWaves: false,
    },
  },
  {
    id: "demon_altar",
    label: "😈 煉獄惡魔召喚陣（打惡魔｜小魔鬼＋狂熱法師＋援軍）",
    desc: "破壞邪能祭壇阻止惡魔大軍增援，敵人從後方偷襲與正面夾擊",
    config: {
      scenarioId: "chasm_sanctum",
      weatherId: "embers",
      lightingId: "horror",
      ambushMode: "hero_ambush",
      blueprintHint: "altar_ritual",
      heroFormation: "scattered",
      foeFormation: "ambush_behind",
      foePack: "demon_legion",
      allyPack: "guard",
      objectivePreset: "destroy_altar",
      foeWaves: true,
    },
  },
  {
    id: "vampire_crypt",
    label: "🧛 幽暗墓穴吸血鬼獵殺（打邪魔｜暗夜墓穴＋亡靈群）",
    desc: "在陰森墓室與棺槨掩體間獵殺吸血鬼衍體與骷髏大軍",
    config: {
      scenarioId: "haunted_crypt",
      weatherId: "fog",
      lightingId: "horror",
      ambushMode: "normal",
      blueprintHint: "altar_ritual",
      heroFormation: "left",
      foeFormation: "scattered",
      foePack: "vampire_coven",
      allyPack: "none",
      objectivePreset: "capture_leader",
      foeWaves: false,
    },
  },
  {
    id: "chase_alley",
    label: "🏃 暗巷極速追逐戰（追逐｜加速符文＋分散追擊逃敵）",
    desc: "啟動疾風加速符文提升全隊移動力，在錯綜街巷中攔截強盜頭目",
    config: {
      scenarioId: "urban_alley",
      weatherId: "rain",
      lightingId: "night",
      ambushMode: "hero_ambush",
      blueprintHint: "auto",
      heroFormation: "bottom",
      foeFormation: "top",
      foePack: "bandit_pirates",
      allyPack: "none",
      objectivePreset: "chase_target",
      foeWaves: false,
    },
  },
  {
    id: "bridge_pursuit",
    label: "🌉 地下河斷橋追擊奪寶（追逐＋收集｜秘寶回收）",
    desc: "跨越狹窄河橋追擊並搶回散落在戰場 3 處的失落秘寶",
    config: {
      scenarioId: "underground_river",
      weatherId: "fog",
      lightingId: "underground",
      ambushMode: "normal",
      blueprintHint: "auto",
      heroFormation: "left",
      foeFormation: "scattered",
      foePack: "goblin_swarm",
      allyPack: "none",
      objectivePreset: "collect_relics",
      foeWaves: false,
    },
  },
  {
    id: "escort_flank",
    label: "🛡️ 商隊護送遭兩翼夾擊（保護｜貨車＋被保護人＋伏兵）",
    desc: "從下方進場護送商旅領袖，敵人從南北兩翼夾擊並在第 2 輪增援",
    config: {
      scenarioId: "forest_ambush",
      weatherId: "auto",
      lightingId: "dusk",
      ambushMode: "normal",
      blueprintHint: "wagon_camp",
      heroFormation: "bottom",
      foeFormation: "flank",
      foePack: "goblin_swarm",
      allyPack: "vip_and_guard",
      objectivePreset: "escort_vip",
      foeWaves: true,
    },
  },
  {
    id: "vip_sanctum",
    label: "👑 王座廳死守護衛戰（保護｜中央受敵＋保護學者）",
    desc: "在王座廳中央保護重要人物抵擋四面湧入的刺客與邪教徒",
    config: {
      scenarioId: "castle_throne",
      weatherId: "clear",
      lightingId: "daylight",
      ambushMode: "normal",
      blueprintHint: "auto",
      heroFormation: "center",
      foeFormation: "surround",
      foePack: "cult_ritual",
      allyPack: "vip_and_guard",
      objectivePreset: "escort_vip",
      foeWaves: true,
    },
  },
  {
    id: "tower_defense_gate",
    label: "🏰 城防奧術塔防保衛戰（塔防｜充能雷電塔＋多波攻城）",
    desc: "守住中央奧術防禦塔並持續充能發射雷電光束，抵擋多波次伏兵",
    config: {
      scenarioId: "desert_canyon",
      weatherId: "gale",
      lightingId: "dusk",
      ambushMode: "normal",
      blueprintHint: "wagon_camp",
      heroFormation: "center",
      foeFormation: "flank",
      foePack: "goblin_swarm",
      allyPack: "guard",
      objectivePreset: "tower_defense",
      foeWaves: true,
    },
  },
  {
    id: "frost_siege",
    label: "❄️ 極地堡壘防禦戰（防禦｜暴風雪＋冰霜巨人＋守點）",
    desc: "在暴風雪與冰滑地面中死守堡壘防線，對抗冰霜巨人與狼群波次",
    config: {
      scenarioId: "frost_citadel",
      weatherId: "snow",
      lightingId: "dusk",
      ambushMode: "normal",
      blueprintHint: "auto",
      heroFormation: "top",
      foeFormation: "bottom",
      foePack: "frost_siege",
      allyPack: "guard",
      objectivePreset: "tower_defense",
      foeWaves: true,
    },
  },
  {
    id: "relic_collection",
    label: "💎 沼澤遺跡秘寶收集戰（收集｜3處能量晶石＋潛伏敵軍）",
    desc: "分散探索毒水與遺跡掩體，收集 3 處遺跡秘寶觸發全隊神聖強化",
    config: {
      scenarioId: "swamp_ruins",
      weatherId: "spores",
      lightingId: "dusk",
      ambushMode: "normal",
      blueprintHint: "auto",
      heroFormation: "split",
      foeFormation: "scattered",
      foePack: "undead_horde",
      allyPack: "none",
      objectivePreset: "collect_relics",
      foeWaves: false,
    },
  },
  {
    id: "ship_boarding",
    label: "🚢 雙船木板接舷海戰（海戰｜甲板＋木板＋油桶＋水手）",
    desc: "兩艘船以木板相連、強風天候、海盜群＋協助作戰水手",
    config: {
      scenarioId: "ship_deck",
      weatherId: "gale",
      lightingId: "dusk",
      ambushMode: "normal",
      blueprintHint: "twin_ships",
      heroFormation: "split",
      foeFormation: "right",
      foePack: "bandit_pirates",
      allyPack: "guard",
      objectivePreset: "disarm_alarm",
      foeWaves: false,
    },
  },
  {
    id: "camp_surround",
    label: "⭕ 夜營遭四面突襲（突襲｜營火＋中央聚攏＋四面包圍）",
    desc: "深夜在營火旁紮營遭敵軍四面包圍與首輪埋伏驚愕",
    config: {
      scenarioId: "cave_ambush",
      weatherId: "fog",
      lightingId: "night",
      ambushMode: "foe_ambush",
      blueprintHint: "wagon_camp",
      heroFormation: "center",
      foeFormation: "surround",
      foePack: "goblin_swarm",
      allyPack: "none",
      objectivePreset: "capture_leader",
      foeWaves: false,
    },
  },
];

function cloneBattleSnapshot(battle) {
  return { ...battle };
}

function chooseDefaultActionTab(unit) {
  if (!unit) return "weapons";
  const hasCastSlots = Object.values(unit.slots || {}).some((n) => n > 0);
  if (hasCastSlots && unit.spells?.length > 0 && /法師|術士|邪術|牧師|德魯伊|詩人/.test(unit.className || "")) {
    return "spells";
  }
  return "weapons";
}

export default function Tactical3DArena({ onExit, storyContext = null, onApplyToStory = null, sampler = null }) {
  const [scenarioId, setScenarioId] = useState(storyContext?.scenarioId || "cave_ambush");
  const [partyLevel, setPartyLevel] = useState(storyContext?.partyLevel || 3);
  const [seed, setSeed] = useState(storyContext?.seed || 101);
  const [weatherId, setWeatherId] = useState(storyContext?.weather || "auto");
  const [lightingId, setLightingId] = useState(storyContext?.lighting || "auto");
  const [ambushMode, setAmbushMode] = useState(storyContext?.ambushMode || "normal");
  const [paceMode, setPaceMode] = useState(storyContext?.paceMode || "fast");
  const [simPresetId, setSimPresetId] = useState("custom");
  const [blueprintHint, setBlueprintHint] = useState("auto");
  const [heroFormation, setHeroFormation] = useState(storyContext?.blueprint?.heroFormation || "auto");
  const [foeFormation, setFoeFormation] = useState(storyContext?.blueprint?.foeFormation || "auto");
  const [objectivePreset, setObjectivePreset] = useState("auto");
  const [foePack, setFoePack] = useState("auto");
  const [allyPack, setAllyPack] = useState("none");
  const [foeWaves, setFoeWaves] = useState(Boolean(storyContext?.blueprint?.foeWaves));

  const applySimulatorPreset = useCallback((presetId) => {
    setSimPresetId(presetId);
    const found = SIMULATOR_PRESETS.find((p) => p.id === presetId);
    if (!found || !found.config) return;
    const c = found.config;
    setScenarioId(c.scenarioId);
    setWeatherId(c.weatherId);
    setLightingId(c.lightingId);
    setAmbushMode(c.ambushMode);
    setBlueprintHint(c.blueprintHint);
    setHeroFormation(c.heroFormation);
    setFoeFormation(c.foeFormation);
    setFoePack(c.foePack);
    setAllyPack(c.allyPack);
    setObjectivePreset(c.objectivePreset);
    setFoeWaves(Boolean(c.foeWaves));
  }, []);
  const [pickedHeroIds, setPickedHeroIds] = useState(DEFAULT_HERO_IDS);
  const [heroSearch, setHeroSearch] = useState("");
  const [inspectHeroId, setInspectHeroId] = useState(null);

  const [battle, setBattle] = useState(null);
  const [actionMode, setActionMode] = useState({ kind: "move" });
  const [dockTab, setDockTab] = useState("weapons");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [activeScreenPos, setActiveScreenPos] = useState(null);
  const [upcastSlot, setUpcastSlot] = useState(null);
  const [useSmite, setUseSmite] = useState(false);
  const [hoverTile, setHoverTile] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [cutaway, setCutaway] = useState(true);
  const [recenterToken, setRecenterToken] = useState(0);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(() => (typeof window !== "undefined" ? window.innerWidth > 768 : true));
  const [unitCardOpen, setUnitCardOpen] = useState(() => (typeof window !== "undefined" ? window.innerWidth > 768 : true));
  const [soundOn, setSoundOn] = useState(false);
  const [eventsBatch, setEventsBatch] = useState([]);
  const [actionFeedback, setActionFeedback] = useState("");
  const [lastDiceRoll, setLastDiceRoll] = useState(null);
  const [diceQueue, setDiceQueue] = useState([]);
  const [diceAnimOn, setDiceAnimOn] = useState(true);
  const diceTimerRef = useRef(null);
  const handleDiceComplete = useCallback(() => {
    setDiceQueue((q) => q.slice(1));
  }, []);
  const [copiedJson, setCopiedJson] = useState(false);
  const [shoutOpen, setShoutOpen] = useState(false);
  const [shoutText, setShoutText] = useState("");
  const [shoutBusy, setShoutBusy] = useState(false);

  const audioRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  const showFeedback = useCallback((msg) => {
    if (!msg) return;
    setActionFeedback(msg);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setActionFeedback(""), 2600);
  }, []);

  useEffect(() => {
    import("three").catch(() => {});
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const filteredPresets = useMemo(() => {
    const q = heroSearch.trim().toLowerCase();
    if (!q) return PRESET_HEROES;
    return PRESET_HEROES.filter(
      (h) => h.name.toLowerCase().includes(q) || (h.class || "").toLowerCase().includes(q)
    );
  }, [heroSearch]);

  const hasBattle = battle !== null;
  const battleBgm = battle?.map?.bgm || "battle";

  useEffect(() => {
    if (!soundOn || !hasBattle) {
      if (audioRef.current) audioRef.current.stopBgm(true);
      return undefined;
    }
    if (!audioRef.current) audioRef.current = new AudioManagerClass();
    if (BGM_MAP[battleBgm]) audioRef.current.playBgm(battleBgm);
    return () => {
      if (audioRef.current) audioRef.current.stopBgm(true);
    };
  }, [soundOn, hasBattle, battleBgm]);

  const emitEvents = useCallback(
    (evList) => {
      if (!evList || evList.length === 0) return;
      const stamp = `${Date.now()}_${Math.random()}`;
      setEventsBatch(evList.map((e, i) => ({ ...e, _uid: `${stamp}_${i}` })));
      const diceEvents = evList.filter((e) => e.type === "dice" && e.side !== "enemy");
      if (diceEvents.length > 0) {
        const latestDice = diceEvents[diceEvents.length - 1];
        setLastDiceRoll(latestDice);
        if (diceTimerRef.current) clearTimeout(diceTimerRef.current);
        diceTimerRef.current = setTimeout(() => setLastDiceRoll(null), 4500);
        if (diceAnimOn) {
          setDiceQueue((q) => [...q, ...diceEvents.map((de, idx) => ({ ...de, _uid: `${stamp}_d_${idx}` }))]);
        }
      }
      if (soundOn) {
        const sfxEv = evList.find((e) =>
          ["strike", "bolt", "fireball", "blast", "cone", "line", "heal", "teleport", "bubble", "hit"].includes(e.type)
        );
        if (sfxEv) {
          const sfxKind =
            sfxEv.type === "cone"
              ? "blast"
              : sfxEv.type === "line"
                ? "bolt"
                : sfxEv.type === "hit"
                  ? "strike"
                  : sfxEv.type;
          playTacticalSfx(sfxKind, true);
        } else if (evList.some((e) => String(e.text || "").includes("拾獲"))) playTacticalSfx("pickup", true);
      }
    },
    [soundOn, diceAnimOn]
  );

  const startNewBattle = useCallback(
    (nextScenario = scenarioId, nextSeed = seed) => {
      const chosen =
        storyContext?.partyPresets && storyContext.partyPresets.length > 0
          ? storyContext.partyPresets
          : pickedHeroIds.map((id) => PRESET_HEROES.find((h) => h.id === id)).filter(Boolean);
      const manualBp =
        blueprintHint === "twin_ships"
          ? { layout: "twin_ships", features: ["oil_barrels"], title: "雙船木板接舷戰", heroFormation, foeFormation, foeWaves, objectiveOverride: objectivePreset }
          : blueprintHint === "cliff_and_sea"
            ? { layout: "cliff_and_sea", features: ["campfire"], title: "岸壁與海濱險道", heroFormation, foeFormation, foeWaves, objectiveOverride: objectivePreset }
            : blueprintHint === "wagon_camp"
              ? { layout: "auto", features: ["wagon", "campfire", "oil_barrels"], title: "貨車與營火營地", heroFormation, foeFormation, foeWaves, objectiveOverride: objectivePreset }
              : blueprintHint === "altar_ritual"
                ? { layout: "auto", features: ["altar", "crystal", "oil_barrels"], title: "儀式祭壇陣地", heroFormation, foeFormation, foeWaves, objectiveOverride: objectivePreset }
                : heroFormation !== "auto" || foeFormation !== "auto" || foeWaves || objectivePreset !== "auto"
                  ? { layout: "auto", features: [], heroFormation, foeFormation, foeWaves, objectiveOverride: objectivePreset }
                  : null;
      const mergedBlueprint = storyContext?.blueprint
        ? {
            ...storyContext.blueprint,
            heroFormation: heroFormation !== "auto" ? heroFormation : storyContext.blueprint.heroFormation || "auto",
            foeFormation: foeFormation !== "auto" ? foeFormation : storyContext.blueprint.foeFormation || "auto",
            foeWaves: foeWaves || Boolean(storyContext.blueprint.foeWaves),
            objectiveOverride: objectivePreset !== "auto" ? objectivePreset : storyContext.blueprint.objectiveOverride || "auto",
          }
        : manualBp;
      const chosenAllySpecs = storyContext?.allySpecs || ALLY_PACK_MAP[allyPack] || null;
      const chosenFoeIds = storyContext?.foeIds || FOE_PACK_MAP[foePack] || null;
      const created = createBattleState({
        scenarioId: nextScenario,
        seed: nextSeed,
        partyPresets: chosen.length > 0 ? chosen : null,
        partyLevel: storyContext?.partyLevel || partyLevel,
        foeIds: chosenFoeIds,
        foeSpecs: storyContext?.foeSpecs || null,
        allySpecs: chosenAllySpecs,
        weather: weatherId,
        lighting: lightingId,
        ambushMode,
        paceMode,
        blueprint: mergedBlueprint,
      });
      const first = getActiveUnit(created);
      setBattle(created);
      setActionMode({ kind: "move" });
      setDockTab(chooseDefaultActionTab(first));
      setUpcastSlot(null);
      setHoverTile(null);
      setEventsBatch([]);
      setActionFeedback("");
      setCopiedJson(false);
      setRecenterToken((t) => t + 1);
    },
    [allyPack, ambushMode, blueprintHint, foeFormation, foePack, foeWaves, heroFormation, lightingId, objectivePreset, paceMode, partyLevel, pickedHeroIds, scenarioId, seed, storyContext, weatherId]
  );

  const autoStartedRef = useRef(false);
  useEffect(() => {
    if (storyContext && !autoStartedRef.current && !battle) {
      autoStartedRef.current = true;
      startNewBattle(storyContext.scenarioId || scenarioId, storyContext.seed || seed);
    }
  }, [battle, scenarioId, seed, startNewBattle, storyContext]);

  const activeUnit = battle ? getActiveUnit(battle) : null;
  const battleRef = useRef(battle);
  battleRef.current = battle;

  const handleRightClickTile = useCallback(
    (pt) => {
      if (!battle || battle.ended || !activeUnit || activeUnit.side !== "hero" || activeUnit.turn?.autoSkip) return;
      if (pt && (pt.unitId === activeUnit.id || (pt.x === activeUnit.x && pt.y === activeUnit.y))) {
        setSideDrawerOpen((v) => !v);
        setPaletteOpen(false);
      }
    },
    [battle, activeUnit]
  );

  const handleEndHeroTurn = useCallback(() => {
    const curBattle = battleRef.current;
    if (!curBattle || curBattle.ended) return;
    const cur = getActiveUnit(curBattle);
    if (!cur || cur.side !== "hero") return;
    const next = cloneBattleSnapshot(curBattle);
    const res = endUnitTurn(next);
    emitEvents(res.events);
    const nextAct = getActiveUnit(next);
    setActionMode({ kind: "move" });
    setDockTab(chooseDefaultActionTab(nextAct));
    setUpcastSlot(null);
    setSideDrawerOpen(false);
    setBattle(next);
  }, [emitEvents]);

  useEffect(() => {
    const onKey = (ev) => {
      if (!hasBattle) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (ev.key === "q" || ev.key === "Q") setRotation((r) => (r + 3) % 4);
      if (ev.key === "e" || ev.key === "E") setRotation((r) => (r + 1) % 4);
      if (ev.key === "c" || ev.key === "C") setRecenterToken((t) => t + 1);
      if (ev.code === "Space") {
        ev.preventDefault();
        if (tag === "BUTTON") document.activeElement?.blur?.();
        handleEndHeroTurn();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasBattle, handleEndHeroTurn]);

  // Automatic turn runner for Enemy AI or Unconscious / Stunned / Surprised units
  const waitingDiceAnim = diceAnimOn && diceQueue.length > 0;
  const autoTurnKey =
    battle && !battle.ended && !waitingDiceAnim && activeUnit && (activeUnit.side === "foe" || activeUnit.turn?.autoSkip)
      ? `${battle.round}_${battle.turnIndex}_${activeUnit.id}_${Boolean(activeUnit.turn?.autoSkip)}`
      : "";

  useEffect(() => {
    if (!autoTurnKey) return undefined;
    const snap = battleRef.current;
    const curUnit = snap ? getActiveUnit(snap) : null;
    if (!snap || snap.ended || !curUnit) return undefined;
    if (curUnit.side !== "foe" && !curUnit.isNpcAlly && !curUnit.turn?.autoSkip) return undefined;

    const timer = setTimeout(() => {
      const latest = battleRef.current;
      const liveUnit = latest ? getActiveUnit(latest) : null;
      if (!latest || latest.ended || !liveUnit || liveUnit.id !== curUnit.id) return;
      const next = cloneBattleSnapshot(latest);
      let evs = [];
      if (liveUnit.side === "foe" && !liveUnit.turn?.autoSkip) {
        const res = decideEnemyTurn(next, liveUnit.id);
        evs = res.events || [];
      } else if (liveUnit.isNpcAlly && !liveUnit.turn?.autoSkip) {
        const res = decideAllyTurn(next, liveUnit.id);
        evs = res.events || [];
      }
      if (!next.ended) {
        const endRes = endUnitTurn(next);
        evs = [...evs, ...(endRes.events || [])];
      }
      emitEvents(evs);
      const nextAct = getActiveUnit(next);
      setActionMode({ kind: "move" });
      setDockTab(chooseDefaultActionTab(nextAct));
      setPaletteOpen(false);
      setSideDrawerOpen(false);
      setBattle(next);
    }, curUnit.side === "foe" || curUnit.isNpcAlly ? 560 : 850);

    return () => clearTimeout(timer);
  }, [autoTurnKey, emitEvents]);

  const reachableMap = useMemo(() => {
    if (!battle || battle.ended || !activeUnit || activeUnit.side !== "hero" || activeUnit.turn?.autoSkip) {
      return new Map();
    }
    if (actionMode.kind !== "move") return new Map();
    return computeReachable3D(battle, activeUnit);
  }, [battle, activeUnit, actionMode]);

  const targetKeys = useMemo(() => {
    const keys = new Set();
    if (!battle || battle.ended || !activeUnit || activeUnit.side !== "hero") return keys;
    if (actionMode.kind === "move") return keys;

    if (actionMode.kind === "weapon" || actionMode.kind === "shove" || actionMode.kind === "potion") {
      for (let y = 0; y < battle.map.rows; y++) {
        for (let x = 0; x < battle.map.cols; x++) {
          const fc = computeCombatForecast(battle, activeUnit.id, actionMode, x, y);
          if (fc.valid) {
            const tgt = getUnitAtCell(battle, x, y, actionMode.kind === "potion" ? null : activeUnit.id);
            if (tgt) {
              for (const c of getUnitCells(tgt)) keys.add(`${c.x},${c.y}`);
            } else {
              keys.add(`${x},${y}`);
            }
          }
        }
      }
      return keys;
    }

    if (actionMode.kind === "spell") {
      const sp = activeUnit.spells?.find((s) => s.key === actionMode.spellKey);
      if (!sp) return keys;
      const effRange = getSpellEffectiveRange(battle, activeUnit, sp);
      for (let y = 0; y < battle.map.rows; y++) {
        for (let x = 0; x < battle.map.cols; x++) {
          const dist = Math.max(Math.abs(x - activeUnit.x), Math.abs(y - activeUnit.y));
          if (dist > effRange) continue;
          const tile = battle.map.grid[y][x];
          if (tile.type === "wall") continue;
          if (sp.attackType === "heal" || sp.attackType === "buff") {
            const u = getUnitAtCell(battle, x, y);
            if (u && u.side === "hero" && !u.dead) keys.add(`${x},${y}`);
          } else if (sp.attackType === "teleport") {
            if (tile.walkable && !getUnitAtCell(battle, x, y)) keys.add(`${x},${y}`);
          } else if (sp.aoe) {
            keys.add(`${x},${y}`);
          } else {
            const u = getUnitAtCell(battle, x, y, activeUnit.id);
            if (u && u.side === "foe" && u.hp > 0) keys.add(`${x},${y}`);
          }
        }
      }
    }
    return keys;
  }, [battle, activeUnit, actionMode]);

  // BG3-style context hover forecast: hovering an enemy in move mode previews primary weapon attack!
  const hoverForecast = useMemo(() => {
    if (!battle || !activeUnit || !hoverTile || activeUnit.side !== "hero") return null;

    let forecastSpec = null;
    if (actionMode.kind === "move") {
      const hovUnit = getUnitAtCell(battle, hoverTile.x, hoverTile.y, activeUnit.id);
      const canAtk = (activeUnit.turn?.actionLeft || 0) > 0 || (activeUnit.turn?.attacksLeft || 0) > 0;
      if (hovUnit && hovUnit.side === "foe" && hovUnit.hp > 0 && canAtk && activeUnit.weapons?.length > 0) {
        forecastSpec = { kind: "weapon", weaponId: activeUnit.weapons[0].id, asBonus: false };
      } else {
        return null;
      }
    } else {
      forecastSpec = { ...actionMode, upcastLevel: upcastSlot };
    }

    return computeCombatForecast(battle, activeUnit.id, forecastSpec, hoverTile.x, hoverTile.y);
  }, [battle, activeUnit, actionMode, upcastSlot, hoverTile]);

  const handleClickTile = (pt) => {
    if (!battle || battle.ended || !activeUnit || activeUnit.side !== "hero" || activeUnit.turn?.autoSkip) return;
    const next = cloneBattleSnapshot(battle);
    const unit = getActiveUnit(next);
    if (!unit) return;

    if (actionMode.kind === "move") {
      // BG3-style smart click: clicking a living enemy while in move mode directly strikes with primary weapon
      const clickedEnemy = getUnitAtCell(next, pt.x, pt.y, unit.id);
      if (clickedEnemy && clickedEnemy.side === "foe" && clickedEnemy.hp > 0) {
        if (unit.weapons?.length > 0) {
          const res = executeWeaponAttack(next, unit.id, unit.weapons[0].id, clickedEnemy.id, { useSmite });
          if (res.ok) {
            emitEvents(res.events);
            setBattle(next);
          } else {
            showFeedback(res.reason);
          }
        }
        return;
      }

      // Clicking on the active hero's own tile resets to move mode and closes popovers
      if (pt.x === unit.x && pt.y === unit.y) {
        setActionMode({ kind: "move" });
        setSideDrawerOpen(false);
        setPaletteOpen(false);
        return;
      }

      const mv = executeMove(next, unit.id, pt.x, pt.y);
      if (mv.ok) {
        emitEvents(mv.events);
        setBattle(next);
        setSideDrawerOpen(false);
        setPaletteOpen(false);
      } else {
        showFeedback(mv.reason);
      }
      return;
    }

    if (actionMode.kind === "weapon") {
      const tgt = getUnitAtCell(next, pt.x, pt.y, unit.id);
      if (!tgt || tgt.side === unit.side) {
        showFeedback("請點擊射程內的敵方單位或立牌");
        return;
      }
      const res = executeWeaponAttack(next, unit.id, actionMode.weaponId, tgt.id, {
        asBonus: actionMode.asBonus,
        useSmite,
      });
      if (res.ok) {
        emitEvents(res.events);
        if ((unit.turn?.attacksLeft || 0) <= 0) setActionMode({ kind: "move" });
        setBattle(next);
      } else {
        showFeedback(res.reason);
      }
      return;
    }

    if (actionMode.kind === "shove") {
      const tgt = getUnitAtCell(next, pt.x, pt.y, unit.id);
      if (!tgt || tgt.side === unit.side) {
        showFeedback("相鄰 1 格內的敵人才能推擊");
        return;
      }
      const res = executeStandardAction(next, unit.id, "shove", tgt.id);
      if (res.ok) {
        emitEvents(res.events);
        setActionMode({ kind: "move" });
        setBattle(next);
      } else {
        showFeedback(res.reason);
      }
      return;
    }

    if (actionMode.kind === "potion") {
      const ally = getUnitAtCell(next, pt.x, pt.y) || unit;
      const res = executeStandardAction(next, unit.id, "potion", ally.id);
      if (res.ok) {
        emitEvents(res.events);
        setActionMode({ kind: "move" });
        setBattle(next);
      } else {
        showFeedback(res.reason);
      }
      return;
    }

    if (actionMode.kind === "spell") {
      const res = executeSpellCast(next, unit.id, actionMode.spellKey, pt.x, pt.y, upcastSlot);
      if (res.ok) {
        emitEvents(res.events);
        setActionMode({ kind: "move" });
        setUpcastSlot(null);
        setBattle(next);
      } else {
        showFeedback(res.reason);
      }
    }
  };

  const runQuickAction = (fn) => {
    if (!battle || battle.ended || !activeUnit || activeUnit.side !== "hero") return;
    const next = cloneBattleSnapshot(battle);
    const unit = getActiveUnit(next);
    if (!unit) return;
    const res = fn(next, unit);
    if (res?.ok !== false) {
      emitEvents(res?.events || []);
      setBattle(next);
    } else if (res?.reason) {
      showFeedback(res.reason);
    }
  };

  const handleSubmitShout = async (ev) => {
    ev.preventDefault();
    if (!battle || battle.ended || !activeUnit || shoutBusy) return;
    const text = shoutText.trim();
    if (!text) return;
    setShoutBusy(true);
    try {
      const aiAdj = await adjudicateTacticalShoutWithAI(sampler, battle, activeUnit, text);
      const next = cloneBattleSnapshot(battle);
      const res = applyShoutOrImprovAction(next, activeUnit.id, text, aiAdj);
      if (res.ok) {
        emitEvents(res.events || []);
        setBattle(next);
        setShoutText("");
        setShoutOpen(false);
      } else {
        showFeedback(res.reason);
      }
    } finally {
      setShoutBusy(false);
    }
  };

  const toggleHeroPick = (id) => {
    setPickedHeroIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((x) => x !== id) : prev;
      }
      if (prev.length >= 5) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const toggleReaction = (key) => {
    if (!battle || !activeUnit) return;
    const next = cloneBattleSnapshot(battle);
    const u = next.units.find((x) => x.id === activeUnit.id);
    if (u) {
      u.autoReactions = { ...u.autoReactions, [key]: !u.autoReactions?.[key] };
      setBattle(next);
    }
  };

  const toggleStance = (key) => {
    if (!battle || !activeUnit) return;
    const next = cloneBattleSnapshot(battle);
    const u = next.units.find((x) => x.id === activeUnit.id);
    if (u) {
      u.stances = { ...u.stances, [key]: !u.stances?.[key] };
      setBattle(next);
    }
  };

  const setBardSong = (songKey) => {
    if (!battle || !activeUnit) return;
    if (activeUnit.turn?.songSwitched) {
      showFeedback("本回合已切換過戰歌");
      return;
    }
    const next = cloneBattleSnapshot(battle);
    const u = next.units.find((x) => x.id === activeUnit.id);
    if (u) {
      u.activeSong = songKey;
      if (u.turn) u.turn.songSwitched = true;
      setBattle(next);
    }
  };

  // === Setup / Lobby View ===
  if (!battle) {
    return (
      <div className="tac3d-root">
        <div className="tac3d-setup-scroll">
          <header className="tac3d-setup-header">
            <div className="tac3d-setup-title">
              <h1>⚔️ 3D HD-2D 獨立戰棋實驗場（純程式 D&D 5e 驅動）</h1>
              <p>
                以 Three.js 建構 3D 地形貼圖與 2D 立牌戰場，整合專案現有 96 法術、60 怪物 AI、雙態破壞道具、死亡豁免、元素連鎖與 2×2 頭目。
              </p>
            </div>
            <div className="tac3d-top-controls">
              {onExit && (
                <button type="button" className="tac3d-btn" onClick={onExit}>
                  ← 返回跑團桌
                </button>
              )}
              <button type="button" className="tac3d-btn is-primary" onClick={() => startNewBattle()}>
                ⚔️ 開始 3D 戰棋實戰 →
              </button>
            </div>
          </header>

          <div className="tac3d-setup-grid">
            <section className="tac3d-panel">
              <h2>
                <span>1. 選擇 3D 戰場與等級</span>
                <button
                  type="button"
                  className="tac3d-btn"
                  onClick={() => setSeed((s) => s + 17)}
                >
                  🎲 種子 #{seed}
                </button>
              </h2>

              <div
                style={{
                  background: "rgba(30,41,59,0.7)",
                  border: "1px solid rgba(56,189,248,0.35)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 10,
                }}
              >
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#e0f2fe" }}>
                  <span style={{ fontWeight: 700 }}>🎬 劇情狀況一鍵模擬（套用整套劇本）</span>
                  <select
                    value={simPresetId}
                    onChange={(e) => applySimulatorPreset(e.target.value)}
                    style={{
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(56,189,248,0.45)",
                      borderRadius: 6,
                      color: "#f8fafc",
                      padding: "7px 10px",
                      fontSize: 12,
                    }}
                  >
                    {SIMULATOR_PRESETS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 5 }}>
                  {(SIMULATOR_PRESETS.find((p) => p.id === simPresetId)?.desc) || ""}
                </div>
              </div>

              {(() => {
                const activeSc = TACTICAL3D_SCENARIOS.find((s) => s.id === scenarioId) || TACTICAL3D_SCENARIOS[0];
                return (
                  <div className="tac3d-terrain-box">
                    <label style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 12, color: "#fef3c7" }}>
                      <span style={{ fontWeight: 700 }}>🗺️ 戰場地形地圖（單獨切換地形）</span>
                      <select
                        value={scenarioId}
                        onChange={(e) => {
                          setScenarioId(e.target.value);
                          setSimPresetId("custom");
                        }}
                        style={{
                          background: "rgba(15,23,42,0.95)",
                          border: "1px solid rgba(245,158,11,0.45)",
                          borderRadius: 6,
                          color: "#fef3c7",
                          padding: "7px 10px",
                          fontSize: 12,
                        }}
                      >
                        {TACTICAL3D_SCENARIOS.map((sc) => (
                          <option key={sc.id} value={sc.id}>
                            {sc.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {activeSc && (
                      <div className="tac3d-terrain-preview">
                        <div className="tac3d-scenario-sub">{activeSc.subtitle}</div>
                        <div className="tac3d-scenario-desc">{activeSc.desc}</div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="tac3d-tier-row">
                {[1, 3, 5].map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    className={`tac3d-pill-btn${partyLevel === lv ? " is-active" : ""}`}
                    onClick={() => setPartyLevel(lv)}
                  >
                    Lv {lv} {lv === 1 ? "(新手)" : lv === 3 ? "(標準戰術)" : "(3環法術＋多連擊)"}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#cbd5e1" }}>
                  <span>🌦 天氣與規則</span>
                  <select
                    value={weatherId}
                    onChange={(e) => setWeatherId(e.target.value)}
                    style={{
                      background: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(148,163,184,0.3)",
                      borderRadius: 6,
                      color: "#f8fafc",
                      padding: "6px 8px",
                      fontSize: 12,
                    }}
                  >
                    {WEATHER_PRESETS.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#cbd5e1" }}>
                  <span>🌗 時段光影</span>
                  <select
                    value={lightingId}
                    onChange={(e) => setLightingId(e.target.value)}
                    style={{
                      background: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(148,163,184,0.3)",
                      borderRadius: 6,
                      color: "#f8fafc",
                      padding: "6px 8px",
                      fontSize: 12,
                    }}
                  >
                    {LIGHTING_PRESETS.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
                {(WEATHER_PRESETS.find((w) => w.id === weatherId)?.rule) || "依戰場預設環境"}
              </div>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>🎭 開戰情勢（埋伏/偷襲）</span>
                <select
                  value={ambushMode}
                  onChange={(e) => setAmbushMode(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="normal">⚔️ 正面交鋒</option>
                  <option value="hero_ambush">🗡️ 我方偷襲（敵軍首輪驚愕）</option>
                  <option value="foe_ambush">⚠️ 敵方埋伏（我方首輪驚愕）</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>⚡ 戰棋節奏模式</span>
                <select
                  value={paceMode}
                  onChange={(e) => setPaceMode(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="fast">⚡ 快節奏爽戰（脆皮雜魚群＋擊殺追擊＋頭目蓄力）</option>
                  <option value="standard">⚔️ 標準 D&D 5e 數值</option>
                  <option value="hardcore">💀 硬核挑戰（敵血+20%／頭目AC+2）</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>📍 我方出生陣型</span>
                <select
                  value={heroFormation}
                  onChange={(e) => setHeroFormation(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="auto">依劇情／地圖預設（左側）</option>
                  <option value="bottom">⬇️ 從地圖下方進場</option>
                  <option value="top">⬆️ 從地圖上方進場</option>
                  <option value="center">🎯 中央聚攏（紮營／被圍）</option>
                  <option value="scattered">✨ 分散各地（混戰／失散）</option>
                  <option value="split">🔀 分兩組站位</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>👹 敵方出現位置</span>
                <select
                  value={foeFormation}
                  onChange={(e) => setFoeFormation(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="auto">依劇情／地圖預設（右側）</option>
                  <option value="surround">⭕ 四面包圍</option>
                  <option value="flank">↔️ 南北兩翼夾擊</option>
                  <option value="ambush_behind">🗡️ 後方偷襲＋正面牽制</option>
                  <option value="top">⬆️ 上方高處壓制</option>
                  <option value="bottom">⬇️ 下方進逼</option>
                  <option value="scattered">🌿 潛伏分散</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>📐 劇情地形藍圖</span>
                <select
                  value={blueprintHint}
                  onChange={(e) => setBlueprintHint(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="auto">🗺️ 依場景預設地形</option>
                  <option value="twin_ships">⛵ 兩艘船之間走木板跳板</option>
                  <option value="cliff_and_sea">🌊 一邊岸壁峭壁、一邊大海</option>
                  <option value="wagon_camp">🛒 貨車＋營火＋易燃油桶</option>
                  <option value="altar_ritual">🔮 邪能祭壇＋晶體＋油桶</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>🎯 戰場達成目的</span>
                <select
                  value={objectivePreset}
                  onChange={(e) => setObjectivePreset(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="auto">依地圖預設目標</option>
                  <option value="disarm_alarm">🚨 拆除警報（阻止第3輪援軍）</option>
                  <option value="escort_vip">👑 護送撤離（保護目標＋鼓舞全隊）</option>
                  <option value="tower_defense">🏰 塔防充能（防禦塔雷擊＋護盾）</option>
                  <option value="chase_target">🏃 疾風追逐（全隊移動 +3 追擊）</option>
                  <option value="collect_relics">💎 收集秘寶（收集 3 處觸發強化）</option>
                  <option value="capture_leader">⛓️ 鎮壓首領（削弱敵軍攻擊）</option>
                  <option value="destroy_altar">🔥 淨化祭壇（光耀爆發傷害）</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>👾 敵軍陣容組合</span>
                <select
                  value={foePack}
                  onChange={(e) => setFoePack(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="auto">依戰場與隊伍等級自動配置</option>
                  <option value="dragon_boss">🐉 紅龍討伐（青年紅龍＋紅龍雛龍）</option>
                  <option value="wyvern_pack">🦅 雙足飛龍突襲群</option>
                  <option value="demon_legion">😈 煉獄小魔鬼＋邪教法師軍團</option>
                  <option value="vampire_coven">🧛 吸血鬼衍體＋亡靈大軍</option>
                  <option value="frost_siege">❄️ 冰霜巨人＋極地狼群</option>
                  <option value="goblin_swarm">👺 哥布林伏擊群＋弓手</option>
                  <option value="bandit_pirates">🏴‍☠️ 強盜與海盜船員（含隊長）</option>
                  <option value="undead_horde">💀 骷髏與殭屍亡靈群</option>
                  <option value="cult_ritual">🕯️ 邪教徒與狂熱法師</option>
                  <option value="giant_boss">👹 2×2 大型巨魔頭目＋護衛</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8 }}>
                <span>🤝 戰場友軍／被保護人</span>
                <select
                  value={allyPack}
                  onChange={(e) => setAllyPack(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "5px 8px",
                    fontSize: 12,
                  }}
                >
                  <option value="none">無額外戰場 NPC</option>
                  <option value="vip">👑 1 名被保護人（商旅領袖・躲避掩護AI）</option>
                  <option value="guard">🛡️ 1 名協助作戰友軍（護衛長矛AI）</option>
                  <option value="vip_and_guard">👑 被保護人 ＋ 🛡️ 協助護衛（各 1 名）</option>
                </select>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#cbd5e1", marginTop: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={foeWaves}
                  onChange={(e) => setFoeWaves(e.target.checked)}
                />
                <span>📣 啟用第 2 輪劇情伏兵增援</span>
              </label>
            </section>

            <section className="tac3d-panel">
              <h2>
                <span>
                  2. 挑選參戰英雄（已選 {pickedHeroIds.length}/5 位）
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", marginLeft: 8 }}>
                    點肖像看角卡 · 點卡片選取
                  </span>
                </span>
                <input
                  type="search"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="搜尋職業或名字…"
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 6,
                    color: "#f8fafc",
                    padding: "4px 8px",
                    fontSize: 12,
                  }}
                />
              </h2>

              <div className="tac3d-roster-grid">
                {filteredPresets.map((hero) => {
                  const picked = pickedHeroIds.includes(hero.id);
                  return (
                    <div
                      key={hero.id}
                      role="button"
                      tabIndex={0}
                      className={`tac3d-hero-card${picked ? " is-picked" : ""}`}
                      onClick={() => toggleHeroPick(hero.id)}
                      onKeyDown={(e) => {
                        if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          toggleHeroPick(hero.id);
                        }
                      }}
                    >
                      <button
                        type="button"
                        className="tac3d-hero-portrait-btn"
                        title={`查看 ${hero.name} 角色卡`}
                        aria-label={`查看 ${hero.name} 角色卡`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectHeroId(hero.id);
                        }}
                      >
                        <img src={hero.avatar} alt={hero.name} />
                        <span className="tac3d-portrait-zoom" aria-hidden="true">🔍</span>
                      </button>
                      <div className="tac3d-hero-meta">
                        <div className="name">
                          {picked ? "✓ " : ""}
                          {hero.name.split(/[（(]/)[0]}
                        </div>
                        <div className="cls">{hero.class}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {(() => {
          const preset = inspectHeroId ? PRESET_HEROES.find((h) => h.id === inspectHeroId) : null;
          if (!preset) return null;
          const unit = hydrateHeroUnit(preset, partyLevel);
          const isPicked = pickedHeroIds.includes(preset.id);
          const statKeys = [
            ["str", "力量"],
            ["dex", "敏捷"],
            ["con", "體質"],
            ["int", "智力"],
            ["wis", "感知"],
            ["cha", "魅力"],
          ];
          const fmtMod = (v) => {
            const m = abilityMod(v);
            return m >= 0 ? `+${m}` : `${m}`;
          };
          return (
            <div
              className="tac3d-hero-sheet-backdrop"
              role="dialog"
              aria-modal="true"
              aria-label={`${preset.name} 角色卡`}
              onClick={() => setInspectHeroId(null)}
            >
              <div className="tac3d-hero-sheet-modal" onClick={(e) => e.stopPropagation()}>
                <div className="tac3d-sheet-header">
                  <img className="tac3d-sheet-avatar" src={preset.avatar} alt={preset.name} />
                  <div className="tac3d-sheet-title">
                    <div className="tac3d-sheet-name">{preset.name}</div>
                    <div className="tac3d-sheet-sub">
                      Lv {partyLevel} · {preset.race} · {preset.class}
                      {preset.alignment ? ` · ${preset.alignment}` : ""}
                      {preset.mbti ? ` · ${preset.mbti}` : ""}
                    </div>
                    {preset.organization && (
                      <div className="tac3d-sheet-org">{preset.organization}</div>
                    )}
                  </div>
                  <div className="tac3d-sheet-actions">
                    <button
                      type="button"
                      className={`tac3d-btn${isPicked ? "" : " is-primary"}`}
                      onClick={() => toggleHeroPick(preset.id)}
                    >
                      {isPicked ? "✓ 已選入（點擊移出）" : "+ 選入參戰隊伍"}
                    </button>
                    <button
                      type="button"
                      className="tac3d-btn"
                      onClick={() => setInspectHeroId(null)}
                      aria-label="關閉角色卡"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="tac3d-sheet-vitals">
                  <div className="tac3d-vital-pill"><span>❤️ HP</span><strong>{unit.maxHp}</strong></div>
                  <div className="tac3d-vital-pill"><span>🛡️ AC</span><strong>{unit.ac}</strong></div>
                  <div className="tac3d-vital-pill"><span>🦶 移動力</span><strong>{unit.speed} 格</strong></div>
                  <div className="tac3d-vital-pill"><span>⚔️ 連擊數</span><strong>{unit.extraAttacks || 1} 次</strong></div>
                  {preset.background && (
                    <div className="tac3d-vital-pill"><span>📜 背景</span><strong>{preset.background}</strong></div>
                  )}
                </div>

                <div className="tac3d-sheet-stats">
                  {statKeys.map(([k, label]) => {
                    const val = unit.stats?.[k] ?? preset.baseStats?.[k] ?? 10;
                    return (
                      <div key={k} className="tac3d-stat-box">
                        <div className="lbl">{label}</div>
                        <div className="val">{val}</div>
                        <div className="mod">{fmtMod(val)}</div>
                      </div>
                    );
                  })}
                </div>

                {preset.monologue && (
                  <blockquote className="tac3d-sheet-quote">「{preset.monologue}」</blockquote>
                )}

                <div className="tac3d-sheet-grid">
                  <div className="tac3d-sheet-block">
                    <h4>⚔️ 戰棋武器與攻擊</h4>
                    <ul>
                      {(unit.weapons || []).map((w) => (
                        <li key={w.id}>
                          <strong>{w.name}</strong>：命中 {w.hitBonus >= 0 ? `+${w.hitBonus}` : w.hitBonus} · 傷害 {w.damageDice} ({w.isRanged ? `遠程 ${w.rangeCells} 格` : w.reach ? "長柄 2 格" : "近戰"})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tac3d-sheet-block">
                    <h4>✨ 專長與技能</h4>
                    <div className="tac3d-tag-list">
                      {(preset.feats || []).map((f) => (
                        <span key={f} className="tac3d-tag is-feat">{f}</span>
                      ))}
                      {(preset.skills || []).map((s) => (
                        <span key={s} className="tac3d-tag">{s}</span>
                      ))}
                    </div>
                  </div>

                  {((unit.spells && unit.spells.length > 0) || (preset.spells && preset.spells.length > 0)) && (
                    <div className="tac3d-sheet-block">
                      <h4>🪄 法術清單</h4>
                      <div className="tac3d-tag-list">
                        {(unit.spells?.length ? unit.spells.map((s) => s.name || s.key) : preset.spells || []).map((sp) => (
                          <span key={sp} className="tac3d-tag is-spell">{sp}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {preset.inventory && (
                    <div className="tac3d-sheet-block">
                      <h4>🎒 裝備與消耗品</h4>
                      <div className="tac3d-sheet-text">
                        {(preset.inventory.equipment || []).join("、")}
                        {preset.inventory.consumables?.length ? `｜消耗品：${preset.inventory.consumables.join("、")}` : ""}
                      </div>
                    </div>
                  )}
                </div>

                {(preset.personality || preset.bio) && (
                  <div className="tac3d-sheet-block" style={{ marginTop: 10 }}>
                    <h4>📖 角色性格與背景</h4>
                    {preset.personality && <p className="tac3d-sheet-text">{preset.personality}</p>}
                    {preset.bio && <p className="tac3d-sheet-text" style={{ marginTop: 4, color: "#94a3b8" }}>{preset.bio}</p>}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  // === Active 3D Battle View ===
  const activeSpell = actionMode.kind === "spell" ? activeUnit?.spells?.find((s) => s.key === actionMode.spellKey) : null;
  const hoverTileObj = hoverTile ? battle.map.grid[hoverTile.y]?.[hoverTile.x] : null;
  const hoverUnitObj = hoverTile ? getUnitAtCell(battle, hoverTile.x, hoverTile.y) : null;
  const summaryJson = battle.ended ? exportBattleSummary(battle) : null;
  const readyToEndTurn =
    activeUnit?.side === "hero" &&
    (activeUnit.turn?.movementLeft || 0) === 0 &&
    (activeUnit.turn?.actionLeft || 0) === 0 &&
    (activeUnit.turn?.bonusLeft || 0) === 0 &&
    (activeUnit.turn?.attacksLeft || 0) === 0;

  return (
    <div className="tac3d-root">
      {/* Top Initiative Timeline & View Controls */}
      <header className="tac3d-top-bar">
        <div className="tac3d-init-strip">
          <span className="tac3d-pill" style={{ borderColor: "#f59e0b", color: "#fbbf24", fontWeight: 700 }}>
            第 {battle.round} 輪
          </span>
          {(() => {
            const wObj = WEATHER_PRESETS.find((w) => w.id === battle.map?.weather);
            const lObj = LIGHTING_PRESETS.find((l) => l.id === battle.map?.lighting);
            const objs = (battle.map?.props || []).filter((p) => p.interactable);
            const doneCount = objs.filter((p) => p.completed).length;
            return (
              <>
                <span
                  className="tac3d-pill"
                  style={{ borderColor: "rgba(148,163,184,0.35)", color: "#e2e8f0", fontSize: 11 }}
                  title={wObj?.desc || wObj?.rule || ""}
                >
                  {lObj?.label || battle.map?.lighting} · {wObj?.label || battle.map?.weather}
                </span>
                {objs.length > 0 && (
                  <span
                    className="tac3d-pill"
                    style={{
                      borderColor: doneCount === objs.length ? "#34d399" : "#38bdf8",
                      color: doneCount === objs.length ? "#6ee7b7" : "#7dd3fc",
                      fontSize: 11,
                    }}
                    title={objs.map((o) => `${o.name}(${o.skillName} DC${o.dc}): ${o.rewardDesc}`).join(" | ")}
                  >
                    🎯 {objs[0]?.name} ({doneCount}/{objs.length})
                  </span>
                )}
              </>
            );
          })()}
          {battle.initiativeOrder.map((uid) => {
            const u = battle.units.find((x) => x.id === uid);
            if (!u) return null;
            const isCur = activeUnit?.id === u.id;
            const isKo = u.dead || u.hp <= 0;
            return (
              <div
                key={uid}
                className={`tac3d-init-chip is-${u.side}${isCur ? " is-current" : ""}${isKo ? " is-ko" : ""}`}
                title={`先攻 ${battle.initiativeRolls[uid]} · ${u.name} (${u.hp}/${u.maxHp})`}
              >
                <img src={u.avatar} alt={u.name} />
                <span>{u.name.slice(0, 4)}</span>
                <span style={{ color: u.hp > 0 ? "#94a3b8" : "#f87171" }}>
                  {u.dead ? "亡" : u.hp === 0 ? "昏" : u.hp}
                </span>
              </div>
            );
          })}
        </div>

        <div className="tac3d-top-controls">
          <button type="button" className="tac3d-btn" onClick={() => setRotation((r) => (r + 3) % 4)} title="左轉 90° (Q)">
            ⟲ 90°
          </button>
          <button type="button" className="tac3d-btn" onClick={() => setRotation((r) => (r + 1) % 4)} title="右轉 90° (E)">
            ⟳ 90°
          </button>
          <button
            type="button"
            className="tac3d-btn"
            onClick={() => setRecenterToken((t) => t + 1)}
            title="視角置中至目前行動角色 (C)"
          >
            🎯 置中
          </button>
          <button
            type="button"
            className={`tac3d-btn${cutaway ? " is-on" : ""}`}
            onClick={() => setCutaway((c) => !c)}
          >
            👁 前牆透視
          </button>
          <button
            type="button"
            className={`tac3d-btn${soundOn ? " is-on" : ""}`}
            onClick={() => setSoundOn((s) => !s)}
          >
            {soundOn ? "🔊 音樂開" : "🔇 靜音"}
          </button>
          <button
            type="button"
            className={`tac3d-btn${diceAnimOn ? " is-on" : ""}`}
            onClick={() => {
              setDiceAnimOn((v) => !v);
              setDiceQueue([]);
            }}
            title="開啟或關閉 BG3 風格我方擲骰動畫"
          >
            {diceAnimOn ? "🎲 骰動畫開" : "🎲 骰動畫關"}
          </button>
          <button
            type="button"
            className={`tac3d-btn${rulesOpen ? " is-on" : ""}`}
            onClick={() => setRulesOpen((o) => !o)}
          >
            ? 規則
          </button>
          <button type="button" className="tac3d-btn" onClick={() => startNewBattle(scenarioId, seed + 5)}>
            🎲 新地形
          </button>
          <button
            type="button"
            className={`tac3d-btn${battle.nonLethal ? " is-on" : ""}`}
            onClick={() => {
              const next = cloneBattleSnapshot(battle);
              next.nonLethal = !next.nonLethal;
              setBattle(next);
            }}
            title="開啟後最後一擊改為擊暈俘虜（方便戰後審問）"
          >
            {battle.nonLethal ? "🥊 留活口：開" : "🥊 留活口"}
          </button>
          <button
            type="button"
            className="tac3d-btn"
            onClick={() => {
              const next = cloneBattleSnapshot(battle);
              executePartyRetreat(next);
              setBattle(next);
            }}
            title="掩護全隊戰術撤退並保留當前狀態"
          >
            🏃 撤退
          </button>
          <button type="button" className="tac3d-btn" onClick={() => setBattle(null)}>
            ⚙ 重選
          </button>
          {onApplyToStory && (
            <button
              type="button"
              className="tac3d-btn is-primary"
              onClick={() => onApplyToStory(exportBattleSummary(battle))}
              title="將目前 3D 戰鬥的 HP 與戰果寫回跑團劇情並返回"
            >
              📜 回寫劇情
            </button>
          )}
          {onExit && (
            <button type="button" className="tac3d-btn" onClick={onExit}>
              ✕ 離開
            </button>
          )}
        </div>
      </header>

      {/* Main 3D WebGL Viewport + Floating HUD */}
      <div className="tac3d-battle-stage">
        <ThreeBattleCanvas
          battle={battle}
          activeUnitId={activeUnit?.id || null}
          reachableMap={reachableMap}
          targetKeys={targetKeys}
          hoverTile={hoverTile}
          hoverForecast={hoverForecast?.valid ? hoverForecast : null}
          rotation={rotation}
          cutaway={cutaway}
          recenterToken={recenterToken}
          eventsBatch={eventsBatch}
          onHoverTile={setHoverTile}
          onClickTile={handleClickTile}
          onRightClickTile={handleRightClickTile}
          onActiveScreenPos={setActiveScreenPos}
        />

        {/* On-Demand Character Quick Menu (Right-Click / Touch Long-Press on active hero) */}
        {sideDrawerOpen &&
          !battle.ended &&
          activeUnit &&
          activeUnit.side === "hero" &&
          !activeUnit.turn?.autoSkip &&
          (() => {
            const vw = activeScreenPos?.w || 960;
            const vh = activeScreenPos?.h || 560;
            const ux = activeScreenPos?.x ?? vw * 0.45;
            const uy = activeScreenPos?.y ?? vh * 0.45;
            const drawerW = 224;
            const placeLeft = ux + 44 + drawerW > vw - 12 && ux - 44 - drawerW > 12;
            const leftPx = placeLeft
              ? Math.max(12, ux - 36 - drawerW)
              : Math.min(vw - drawerW - 12, Math.max(12, ux + 36));
            const topPx = Math.max(12, Math.min(vh - 280, uy - 48));

            const adjObjs = (battle.map?.props || [])
              .filter(
                (p) =>
                  !p.broken &&
                  !p.completed &&
                  Math.max(Math.abs(activeUnit.x - p.x), Math.abs(activeUnit.y - p.y)) <= 1
              )
              .slice(0, 2);
            const quickAb = (activeUnit.abilities || []).find((ab) => ab.usesLeft > 0);

            return (
              <aside
                className={`tac3d-side-drawer${placeLeft ? " is-left" : " is-right"}`}
                style={{ left: `${leftPx}px`, top: `${topPx}px` }}
                aria-label={`${activeUnit.name} 快捷選單`}
              >
                <div className="tac3d-drawer-head">
                  <div>
                    <div className="tac3d-drawer-name">{activeUnit.name}</div>
                    <div className="tac3d-drawer-res">
                      🟢{activeUnit.turn?.actionLeft || 0} · 🟠{activeUnit.turn?.bonusLeft || 0} · 🔵{activeUnit.turn?.movementLeft || 0}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="tac3d-btn"
                    style={{ padding: "2px 7px", fontSize: 11 }}
                    onClick={() => setSideDrawerOpen(false)}
                    aria-label="關閉快捷選單"
                  >
                    ✕
                  </button>
                </div>

                <div className="tac3d-drawer-body">
                  {(activeUnit.weapons || []).slice(0, 2).map((wpn) => (
                    <button
                      key={wpn.id}
                      type="button"
                      disabled={(activeUnit.turn?.actionLeft || 0) <= 0 && (activeUnit.turn?.attacksLeft || 0) <= 0}
                      className={`tac3d-btn${actionMode.kind === "weapon" && actionMode.weaponId === wpn.id ? " is-on" : ""}`}
                      onClick={() => {
                        setActionMode({ kind: "weapon", weaponId: wpn.id, asBonus: false });
                        setSideDrawerOpen(false);
                      }}
                    >
                      {wpn.isRanged ? "🏹" : wpn.isShieldBash ? "🛡️" : "⚔️"} {wpn.name}
                    </button>
                  ))}
                  {quickAb && (
                    <button
                      type="button"
                      disabled={
                        quickAb.actionType === "bonus"
                          ? (activeUnit.turn?.bonusLeft || 0) <= 0
                          : (activeUnit.turn?.actionLeft || 0) <= 0
                      }
                      className="tac3d-btn is-quick"
                      onClick={() => {
                        runQuickAction((b, u) => executeClassAbility(b, u.id, quickAb.id));
                        setSideDrawerOpen(false);
                      }}
                    >
                      {quickAb.actionType === "bonus" ? "🟠" : "⚡"} {quickAb.name}
                    </button>
                  )}
                  {adjObjs.map((obj) => (
                    <button
                      key={obj.id}
                      type="button"
                      className="tac3d-btn is-primary"
                      onClick={() => {
                        runQuickAction((b, u) => executePropInteract(b, u.id, obj.id));
                        setSideDrawerOpen(false);
                      }}
                    >
                      {obj.interactable ? "🔍" : "🖐"} {obj.actionLabel || "利用"}：{obj.name}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                    className="tac3d-btn"
                    onClick={() => {
                      runQuickAction((b, u) => executeStandardAction(b, u.id, "dodge"));
                      setSideDrawerOpen(false);
                    }}
                  >
                    🛡️ 閃避 (被攻劣勢)
                  </button>
                  <button
                    type="button"
                    className="tac3d-btn"
                    onClick={() => {
                      setShoutOpen(true);
                      setSideDrawerOpen(false);
                    }}
                  >
                    💬 喊話 / 創意行動
                  </button>
                </div>

                <div className="tac3d-drawer-foot">
                  <button type="button" className="tac3d-btn is-primary" style={{ width: "100%" }} onClick={handleEndHeroTurn}>
                    ⏭ 結束回合 (Space)
                  </button>
                </div>
              </aside>
            );
          })()}

        {/* Top-Center Active Turn Banner */}
        {activeUnit && !battle.ended && (
          <div className={`tac3d-turn-banner${activeUnit.side === "foe" ? " is-foe" : ""}`}>
            {activeUnit.side === "hero"
              ? `✨ 輪到 ${activeUnit.name}（移動 ${activeUnit.turn?.movementLeft || 0} 格 · 主動作 ${activeUnit.turn?.actionLeft || 0} · 附贈 ${activeUnit.turn?.bonusLeft || 0}）`
              : `🤖 ${activeUnit.name} 正在尋路與行動…`}
          </div>
        )}

        {/* Inline Action Feedback Toast */}
        {actionFeedback && <div className="tac3d-toast">⚠️ {actionFeedback}</div>}

        {/* BG3-Style Player-Facing Dice Roll Modal */}
        {diceAnimOn && diceQueue.length > 0 && (
          <TacticalDiceModal key={diceQueue[0]._uid} roll={diceQueue[0]} onComplete={handleDiceComplete} />
        )}

        {/* Classic-Style Live Dice Roll Breakdown Banner */}
        {lastDiceRoll && (!diceAnimOn || diceQueue.length === 0) && (
          <div
            className="tac3d-toast"
            style={{
              top: actionFeedback ? 72 : 40,
              background:
                lastDiceRoll.role === "enemy_attack"
                  ? "rgba(44, 13, 21, 0.94)"
                  : lastDiceRoll.hit
                    ? "rgba(15, 23, 42, 0.94)"
                    : "rgba(30, 41, 59, 0.94)",
              borderColor:
                lastDiceRoll.role === "enemy_attack"
                  ? lastDiceRoll.hit
                    ? "#f87171"
                    : "#38bdf8"
                  : lastDiceRoll.crit
                    ? "#fbbf24"
                    : lastDiceRoll.hit
                      ? "#34d399"
                      : "#94a3b8",
              color: "#f8fafc",
              maxWidth: "min(92vw, 680px)",
              fontWeight: 600,
              fontSize: 11,
              textAlign: "center",
            }}
          >
            <span style={{ color: lastDiceRoll.crit ? "#fde047" : lastDiceRoll.hit ? "#4ade80" : "#cbd5e1", fontWeight: 800 }}>
              🎲 {lastDiceRoll.actorName} 【{lastDiceRoll.actionName}】→ {lastDiceRoll.targetName}：
            </span>
            {lastDiceRoll.formula}{" "}
            <strong
              style={{
                color:
                  lastDiceRoll.role === "enemy_attack"
                    ? lastDiceRoll.hit
                      ? "#f87171"
                      : "#38bdf8"
                    : lastDiceRoll.crit && lastDiceRoll.hit
                      ? "#fde047"
                      : lastDiceRoll.hit
                        ? "#4ade80"
                        : "#f87171",
              }}
            >
              {lastDiceRoll.role === "enemy_attack"
                ? lastDiceRoll.hit
                  ? `🩸 命中我方 -${lastDiceRoll.dmg}`
                  : "💨 MISSING! (AC擋下)"
                : lastDiceRoll.role === "defense"
                ? lastDiceRoll.hit
                  ? "🛡️ 格擋成功！"
                  : `🩸 防禦突破 -${lastDiceRoll.dmg}`
                : lastDiceRoll.role === "heal"
                  ? `💚 恢復 +${lastDiceRoll.dmg}`
                  : lastDiceRoll.role === "damage"
                    ? `✨ 造成 -${lastDiceRoll.dmg}`
                    : lastDiceRoll.role === "check" || lastDiceRoll.role === "save"
                      ? lastDiceRoll.hit
                        ? "✅ 檢定成功！"
                        : "❌ 檢定失敗"
                      : lastDiceRoll.crit
                        ? `🔥 暴擊 -${lastDiceRoll.dmg}!`
                        : lastDiceRoll.hit
                          ? `💥 命中 -${lastDiceRoll.dmg}`
                          : "💨 未命中"}
            </strong>
          </div>
        )}

        {/* Toggleable Mechanics Quick-Reference Popover */}
        {rulesOpen && (
          <div className="tac3d-rules-popover">
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#fbbf24", marginBottom: 6 }}>
              <span>⚔️ 本局 3D 戰棋已啟用機制</span>
              <button type="button" className="tac3d-btn" style={{ padding: "1px 6px" }} onClick={() => setRulesOpen(false)}>
                ×
              </button>
            </div>
            <div>• <strong>行動經濟</strong>：1d20+DEX 先攻；移動可拆分；主動作／附贈／自動反應（藉機・護盾術）。</div>
            <div>• <strong>2A 高地與掩護</strong>：ΔH≥2 高打低 +2 命中且遠程 +2 格；石柱／路障半掩護 AC+2；貼身遠程劣勢。</div>
            <div>• <strong>元素連鎖與破壞</strong>：火點燃油窪爆燃、電擊通電水面、冰火生蒸氣迷霧；衝擊可炸碎場景掩體。</div>
            <div>• <strong>物理擊退與救援</strong>：推落高台/深淵造成墜落傷與倒地；0 HP 昏迷擲死亡豁免，治癒真言或藥水可就地喚醒；頭目採 2×2 佔格。</div>
            <div>• <strong>天氣環境規則</strong>：強風遠程 -2；濃霧遠距(&gt;3格) -1；餘燼火傷 +1；雷暴電傷 +1；降雨減弱火焰並加速熄滅。</div>
          </div>
        )}

        {/* Left Unit & 1B Auto Reaction Panel */}
        {activeUnit && (
          <aside className="tac3d-left-card">
            {(() => {
              const hovProp = hoverTile
                ? (battle.map?.props || []).find((p) => p.x === hoverTile.x && p.y === hoverTile.y)
                : null;
              if (!hovProp) return null;
              return (
                <div
                  style={{
                    marginBottom: 8,
                    padding: "7px 9px",
                    borderRadius: 8,
                    border: `1px solid ${hovProp.interactable ? "rgba(56,189,248,0.55)" : "rgba(251,191,36,0.45)"}`,
                    background: "rgba(15,23,42,0.92)",
                    fontSize: 11,
                    lineHeight: 1.45,
                  }}
                >
                  <div style={{ fontWeight: 700, color: hovProp.interactable ? "#7dd3fc" : "#fbbf24" }}>
                    {hovProp.interactable ? "🎯 " : "📦 "}
                    {hovProp.name}（{hovProp.broken ? "已破壞" : `HP ${hovProp.hp}/${hovProp.maxHp}`}）
                  </div>
                  <div style={{ color: "#cbd5e1", marginTop: 2 }}>
                    {hovProp.uses || "可互動／破壞的雙態戰場物件"}
                  </div>
                  {hovProp.interactable && !hovProp.completed && (
                    <div style={{ color: "#6ee7b7", marginTop: 2 }}>
                      🔍 {hovProp.actionLabel}（{hovProp.skillName} DC {hovProp.dc}）：{hovProp.rewardDesc}
                    </div>
                  )}
                  {!hovProp.broken && (
                    <div style={{ color: "#94a3b8", marginTop: 2 }}>
                      {hovProp.providesCover ? "半掩護 AC+2 · " : ""}
                      {hovProp.flammable ? "🔥 易燃 · " : ""}
                      走到旁 1 格內即可點擊利用
                    </div>
                  )}
                </div>
              );
            })()}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <img
                src={activeUnit.avatar}
                alt={activeUnit.name}
                style={{ width: 36, height: 36, borderRadius: 8, objectFit: "contain", background: "#0f172a", flexShrink: 0 }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {activeUnit.name}
                  {activeUnit.footprint === 2 ? " [2×2]" : ""}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{activeUnit.className}</div>
              </div>
              <button
                type="button"
                className="tac3d-btn"
                style={{ padding: "2px 6px", fontSize: 10 }}
                onClick={() => setUnitCardOpen((v) => !v)}
              >
                {unitCardOpen ? "收合" : "詳情"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: unitCardOpen ? 6 : 0 }}>
              <div className="tac3d-pill">❤️ {activeUnit.hp}/{activeUnit.maxHp}</div>
              <div className="tac3d-pill">
                🛡️ AC {activeUnit.ac + (activeUnit.conditions?.Shielded ? 5 : 0) + (activeUnit.stances?.craneStyle ? 2 : 0)}
              </div>
              <div className="tac3d-pill">👣 {activeUnit.speedCells}格</div>
              {unitCardOpen && activeUnit.hasDarkvision && (
                <div
                  className="tac3d-pill"
                  style={{ borderColor: "rgba(148,163,184,0.45)", color: "#cbd5e1" }}
                  title="黑暗視覺：不受地城／夜間微光命中懲罰，並在 3D 戰場自帶微光視野"
                >
                  👁️ 黑暗視覺
                </div>
              )}
              {unitCardOpen && activeUnit.conditions?.Lit && (
                <div className="tac3d-pill" style={{ borderColor: "rgba(250,204,21,0.55)", color: "#fef08a" }}>
                  🕯️ 光亮照明
                </div>
              )}
            </div>

            {unitCardOpen && (
              <>

            {(() => {
              const aura = getUnitAuraEffects(battle, activeUnit);
              if (aura.auraLabels.length === 0 && !(activeUnit.passives?.length > 0)) return null;
              return (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                  {aura.auraLabels.map((lbl) => (
                    <span key={lbl} className="tac3d-pill" style={{ borderColor: "#34d399", color: "#a7f3d0", fontSize: 10 }}>
                      {lbl}
                    </span>
                  ))}
                  {(activeUnit.passives || []).map((ps) => (
                    <span key={ps} className="tac3d-pill" style={{ borderColor: "#64748b", color: "#cbd5e1", fontSize: 10 }}>
                      {ps}
                    </span>
                  ))}
                </div>
              );
            })()}

            {activeUnit.concentration && (
              <div style={{ color: "#fde047", marginBottom: 6 }}>
                🔮 專注中：{activeUnit.concentration.name}
              </div>
            )}

            {Object.keys(activeUnit.conditions || {}).length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                {Object.keys(activeUnit.conditions).map((ck) => (
                  <span key={ck} className="tac3d-pill" style={{ borderColor: "#c084fc", color: "#e9d5ff" }}>
                    {CONDITIONS[ck]?.desc || ck}
                  </span>
                ))}
              </div>
            )}

            {activeUnit.hp === 0 && activeUnit.side === "hero" && (
              <div style={{ color: "#fca5a5", marginBottom: 6 }}>
                💀 死亡豁免：成功 {activeUnit.deathSaves.success}/3 · 失敗 {activeUnit.deathSaves.fail}/3
              </div>
            )}

            {activeUnit.side === "hero" && (
              <div style={{ borderTop: "1px solid rgba(148,163,184,0.2)", paddingTop: 6, marginTop: 4 }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>1B 自動反應開關（流暢不中斷）：</div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 3 }}>
                  <input
                    type="checkbox"
                    checked={!!activeUnit.autoReactions?.opportunityAttack}
                    onChange={() => toggleReaction("opportunityAttack")}
                  />
                  <span>自動觸發藉機攻擊</span>
                </label>
                {activeUnit.spells?.some((s) => s.key === "Shield") && (
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 3 }}>
                    <input
                      type="checkbox"
                      checked={!!activeUnit.autoReactions?.shield}
                      onChange={() => toggleReaction("shield")}
                    />
                    <span>被命中時法術護盾術 (+5 AC)</span>
                  </label>
                )}
                {(activeUnit.isFighter || activeUnit.isMonk || activeUnit.isPaladin) && (
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 3 }}>
                    <input
                      type="checkbox"
                      checked={!!activeUnit.autoReactions?.riposte}
                      onChange={() => toggleReaction("riposte")}
                    />
                    <span>⚡ 敵人揮空時自動反擊</span>
                  </label>
                )}
                {(activeUnit.isFighter || activeUnit.isPaladin || activeUnit.isBarbarian) && (
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 3 }}>
                    <input
                      type="checkbox"
                      checked={!!activeUnit.stances?.powerAttack}
                      onChange={() => toggleStance("powerAttack")}
                    />
                    <span>💪 猛力攻擊 (-3命中 / +6傷)</span>
                  </label>
                )}
                {(activeUnit.isRanger || activeUnit.sneakDice) && (
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 3 }}>
                    <input
                      type="checkbox"
                      checked={!!activeUnit.stances?.sharpshooter}
                      onChange={() => toggleStance("sharpshooter")}
                    />
                    <span>🎯 精密射擊 (-3命中 / +6傷)</span>
                  </label>
                )}
                {(activeUnit.isMonk || activeUnit.isFighter) && (
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", marginBottom: 3 }}>
                    <input
                      type="checkbox"
                      checked={!!activeUnit.stances?.craneStyle}
                      onChange={() => toggleStance("craneStyle")}
                    />
                    <span>🦢 鶴形防禦 (+2 AC)</span>
                  </label>
                )}
                {activeUnit.isBard && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                    {[
                      { k: "courage", l: "🎵勇氣+2命" },
                      { k: "valor", l: "🥁戰鼓+2傷" },
                      { k: "serenity", l: "🎻夜曲+2HP" },
                    ].map((sg) => (
                      <button
                        key={sg.k}
                        type="button"
                        className={`tac3d-btn${activeUnit.activeSong === sg.k ? " is-on" : ""}`}
                        style={{ padding: "2px 6px", fontSize: 10 }}
                        onClick={() => setBardSong(sg.k)}
                      >
                        {sg.l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
              </>
            )}
          </aside>
        )}

        {/* Right Forecast + Tile Info + Roll Log */}
        <aside className="tac3d-right-stack">
          {hoverTileObj && (
            <div className="tac3d-log-card">
              <div style={{ fontWeight: 700, color: "#bae6fd" }}>
                ({hoverTile.x},{hoverTile.y}) H={hoverTileObj.h}
                {hoverTileObj.cover ? " · 半掩護 AC+2" : ""}
                {hoverTileObj.surface && hoverTileObj.surface !== "none" ? ` · 地表:${hoverTileObj.surface}` : ""}
              </div>
              {hoverUnitObj && (
                <div style={{ color: "#fde047", marginTop: 2 }}>
                  {hoverUnitObj.name} — HP {hoverUnitObj.hp}/{hoverUnitObj.maxHp} · AC {hoverUnitObj.ac}
                </div>
              )}
            </div>
          )}

          {hoverForecast && (
            <div className="tac3d-forecast-card" style={{ borderColor: hoverForecast.valid ? "#f59e0b" : "#64748b" }}>
              {hoverForecast.valid ? (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: 4 }}>
                    <span>{hoverForecast.title}</span>
                    <span style={{ color: "#fbbf24" }}>{hoverForecast.hitPct}% 命中/生效</span>
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    【{hoverForecast.actionName}】預估：{hoverForecast.dmgMin}~{hoverForecast.dmgMax}（{hoverForecast.damageType}）
                  </div>
                  <div style={{ color: "#cbd5e1", fontSize: 11, lineHeight: 1.4 }}>
                    {hoverForecast.modifiers.length > 0 ? hoverForecast.modifiers.join(" · ") : "標準地形命中對決"}
                  </div>
                </>
              ) : (
                <div style={{ color: "#fca5a5" }}>⛔ {hoverForecast.reason}</div>
              )}
            </div>
          )}

          <div className="tac3d-log-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#fbbf24" }}>📜 D&D 5e 戰報紀錄</span>
              <button type="button" className="tac3d-btn" style={{ padding: "2px 6px" }} onClick={() => setLogOpen((o) => !o)}>
                {logOpen ? "收合" : "展開"}
              </button>
            </div>
            {logOpen && (
              <div className="tac3d-log-list">
                {battle.logs.slice(-12).map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Victory / Defeat Modal with AI Handoff Summary JSON */}
        {battle.ended && summaryJson && (
          <div className="tac3d-modal-backdrop">
            <div className="tac3d-modal-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h2 style={{ margin: 0, color: battle.outcome === "victory" ? "#fbbf24" : "#f87171", fontSize: 18 }}>
                  {battle.outcome === "victory" ? "⚔️ 戰鬥勝利（3D 戰棋結算完成）" : "💀 全軍覆沒"}
                </h2>
                <button
                  type="button"
                  className="tac3d-btn"
                  onClick={() => {
                    navigator.clipboard?.writeText(JSON.stringify(summaryJson, null, 2));
                    setCopiedJson(true);
                  }}
                >
                  {copiedJson ? "✓ 已複製 JSON" : "📋 複製戰果 JSON"}
                </button>
              </div>
              <p style={{ color: "#94a3b8", margin: "0 0 10px" }}>
                戰鬥全程由程式精算（0 AI Token）。此戰果 JSON 可直接回傳 AI DM 生成戰後劇情演出、經驗與戰利品（建議等級：{summaryJson.suggestedLootTier}，總計 {summaryJson.totalXp} XP）：
              </p>
              <pre className="tac3d-summary-pre">{JSON.stringify(summaryJson, null, 2)}</pre>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                <button type="button" className="tac3d-btn" onClick={() => setBattle(null)}>
                  切換地圖／隊伍
                </button>
                <button type="button" className="tac3d-btn" onClick={() => startNewBattle(scenarioId, seed + 19)}>
                  再戰一場
                </button>
                {onApplyToStory && (
                  <button
                    type="button"
                    className="tac3d-btn is-primary"
                    onClick={() => onApplyToStory(summaryJson, true)}
                  >
                    📜 回寫並請 AI 接續戰後劇情
                  </button>
                )}
                {onExit && !onApplyToStory && (
                  <button type="button" className="tac3d-btn" onClick={onExit}>
                    返回跑團桌
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Streamlined 4-Tab BG3 Action Dock */}
      {activeUnit && !battle.ended && (
        <footer className="tac3d-bottom-dock">
          {/* Contextual Adjacent Prop Interaction Pill Bar (only when standing next to usable prop) */}
          {activeUnit.side === "hero" &&
            (() => {
              const adjProps = (battle.map?.props || [])
                .filter(
                  (p) =>
                    !p.broken &&
                    !p.completed &&
                    Math.max(Math.abs(activeUnit.x - p.x), Math.abs(activeUnit.y - p.y)) <= 1
                )
                .slice(0, 2);
              if (adjProps.length === 0) return null;
              return (
                <div className="tac3d-context-prop-bar">
                  {adjProps.map((obj) => (
                    <button
                      key={obj.id}
                      type="button"
                      className={`tac3d-btn${obj.interactable ? " is-primary" : ""}`}
                      onClick={() => runQuickAction((b, u) => executePropInteract(b, u.id, obj.id))}
                      title={`${obj.skillName || "巧手/運動"} DC ${obj.dc || 10}｜${obj.rewardDesc || obj.uses || "利用場上物件取得戰術優勢"}`}
                    >
                      {obj.interactable ? "🔍" : "🖐"} {obj.actionLabel || "利用"}：{obj.name} (DC {obj.dc || 10})
                    </button>
                  ))}
                </div>
              );
            })()}

          <div className="tac3d-econ-row">
            <div className="tac3d-econ-pills">
              <span className="tac3d-pill" style={{ borderColor: activeUnit.turn?.actionLeft > 0 ? "#4ade80" : undefined }}>
                🟢 主動作 {activeUnit.turn?.actionLeft || 0}
              </span>
              <span className="tac3d-pill" style={{ borderColor: activeUnit.turn?.bonusLeft > 0 ? "#fb923c" : undefined }}>
                🟠 附贈 {activeUnit.turn?.bonusLeft || 0}
              </span>
              <span className="tac3d-pill" style={{ borderColor: "#38bdf8" }}>
                🔵 移動 {activeUnit.turn?.movementLeft || 0}/{getEffectiveSpeed(activeUnit)} 格
              </span>
              <span className="tac3d-pill" style={{ borderColor: activeUnit.reactionLeft > 0 ? "#c084fc" : undefined }}>
                🟣 反應 {activeUnit.reactionLeft || 0}
              </span>
              {Object.entries(activeUnit.slots || {}).map(([lv, cnt]) => (
                <span key={lv} className="tac3d-pill" style={{ borderColor: "#a78bfa", color: "#ddd6fe" }}>
                  {lv}環:{cnt}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="tac3d-desktop-hint" style={{ color: "#94a3b8" }}>
                右鍵角色快捷選單 · 右鍵拖曳平移 · Q/E 旋轉 · Space 結束
              </span>
              {activeUnit.side === "hero" && (
                <button
                  type="button"
                  className={`tac3d-btn is-primary${readyToEndTurn ? " is-ready-end" : ""}`}
                  onClick={handleEndHeroTurn}
                >
                  ⏭ 結束回合 (Space)
                </button>
              )}
            </div>
          </div>

          {activeUnit.side === "hero" ? (
            <div className="tac3d-dock-main">
              {/* Pinned Movement + Stand Up + Shout */}
              <div className="tac3d-actions-row">
                <button
                  type="button"
                  className={`tac3d-btn${actionMode.kind === "move" ? " is-on" : ""}`}
                  onClick={() => setActionMode({ kind: "move" })}
                >
                  👣 移動 ({activeUnit.turn?.movementLeft || 0})
                </button>
                {activeUnit.conditions?.Prone && (
                  <button
                    type="button"
                    className="tac3d-btn is-primary"
                    onClick={() => runQuickAction((b, u) => executeStandUp(b, u.id))}
                  >
                    🧍 起身 (-{Math.ceil(getEffectiveSpeed(activeUnit) / 2)}格)
                  </button>
                )}
                <button
                  type="button"
                  className={`tac3d-btn${shoutOpen ? " is-on" : ""}`}
                  onClick={() => setShoutOpen((v) => !v)}
                  title="戰場喊話談判、威嚇投降或創意環境行動"
                >
                  💬 喊話
                </button>
              </div>
              {shoutOpen && (
                <form
                  onSubmit={handleSubmitShout}
                  style={{ display: "flex", gap: 6, alignItems: "center", flex: "1 1 100%", marginTop: 4 }}
                >
                  <input
                    type="text"
                    value={shoutText}
                    onChange={(e) => setShoutText(e.target.value)}
                    placeholder="輸入喊話或創意行動（例如：對頭目喊投降、踢翻火盆燒敵人…）"
                    style={{
                      flex: 1,
                      background: "rgba(15,23,42,0.92)",
                      border: "1px solid rgba(56,189,248,0.45)",
                      borderRadius: 6,
                      color: "#f8fafc",
                      padding: "5px 9px",
                      fontSize: 12,
                    }}
                  />
                  <button type="submit" className="tac3d-btn is-primary" disabled={shoutBusy}>
                    {shoutBusy ? "判定中…" : "送出判定"}
                  </button>
                </form>
              )}

              {/* 4-Category Action Tabs + Quick Slots + Floating Palette */}
              {(() => {
                const uniqueSpells = [];
                const seenSp = new Set();
                for (const sp of activeUnit.spells || []) {
                  const k = sp.key || sp.name;
                  if (!seenSp.has(k)) {
                    seenSp.add(k);
                    uniqueSpells.push(sp);
                  }
                }
                const quickSpells = uniqueSpells.slice(0, 2);
                const primaryWpn = activeUnit.weapons?.[0];
                const togglePalette = (tab) => {
                  if (dockTab === tab && paletteOpen) setPaletteOpen(false);
                  else {
                    setDockTab(tab);
                    setPaletteOpen(true);
                  }
                };
                const spellGroups = [
                  { lvl: 0, label: "戲法 (無限)" },
                  { lvl: 1, label: `1 環 (剩 ${activeUnit.slots?.[1] || 0})` },
                  { lvl: 2, label: `2 環 (剩 ${activeUnit.slots?.[2] || 0})` },
                  { lvl: 3, label: `3 環 (剩 ${activeUnit.slots?.[3] || 0})` },
                ]
                  .map((g) => ({ ...g, items: uniqueSpells.filter((s) => (s.level || 0) === g.lvl) }))
                  .filter((g) => g.items.length > 0);

                return (
                  <>
                    {paletteOpen && (
                      <div className="tac3d-action-palette" role="dialog" aria-label="戰術動作選單">
                        <div className="tac3d-palette-head">
                          <span>
                            {dockTab === "weapons" && "⚔️ 武器與近戰攻擊"}
                            {dockTab === "spells" && `✨ 法術書（${uniqueSpells.length} 項）`}
                            {dockTab === "abilities" && "🌟 職業技能與藥水"}
                            {dockTab === "tactics" && "🛡️ 標準戰術與照明"}
                          </span>
                          <button
                            type="button"
                            className="tac3d-btn"
                            style={{ padding: "2px 8px", fontSize: 11 }}
                            onClick={() => setPaletteOpen(false)}
                          >
                            收合 ✕
                          </button>
                        </div>

                        {dockTab === "weapons" && (
                          <div className="tac3d-palette-grid">
                            {(activeUnit.weapons || []).map((wpn) => (
                              <button
                                key={wpn.id}
                                type="button"
                                disabled={(activeUnit.turn?.actionLeft || 0) <= 0 && (activeUnit.turn?.attacksLeft || 0) <= 0}
                                className={`tac3d-btn${actionMode.kind === "weapon" && actionMode.weaponId === wpn.id && !actionMode.asBonus ? " is-on" : ""}`}
                                onClick={() => {
                                  setActionMode({ kind: "weapon", weaponId: wpn.id, asBonus: false });
                                  setPaletteOpen(false);
                                }}
                              >
                                {wpn.isRanged ? "🏹" : wpn.reach ? "🔱" : "⚔️"} {wpn.name}
                              </button>
                            ))}
                            {activeUnit.turn?.bonusAttackUnlocked && activeUnit.turn?.bonusLeft > 0 && (
                              <button
                                type="button"
                                className={`tac3d-btn${actionMode.kind === "weapon" && actionMode.asBonus ? " is-on" : ""}`}
                                onClick={() => {
                                  setActionMode({
                                    kind: "weapon",
                                    weaponId: activeUnit.weapons.find((w) => w.light)?.id || activeUnit.weapons[0].id,
                                    asBonus: true,
                                  });
                                  setPaletteOpen(false);
                                }}
                              >
                                🟠 副手攻擊
                              </button>
                            )}
                            {activeUnit.isPaladin && (activeUnit.slots?.[1] || 0) > 0 && (
                              <label className="tac3d-pill" style={{ cursor: "pointer" }}>
                                <input type="checkbox" checked={useSmite} onChange={(e) => setUseSmite(e.target.checked)} />
                                <span>命中至聖斬(1環)</span>
                              </label>
                            )}
                            <button
                              type="button"
                              disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                              className={`tac3d-btn${actionMode.kind === "shove" ? " is-on" : ""}`}
                              onClick={() => {
                                setActionMode({ kind: "shove" });
                                setPaletteOpen(false);
                              }}
                            >
                              🖐 推擊
                            </button>
                          </div>
                        )}

                        {dockTab === "spells" && (
                          <div className="tac3d-spell-groups">
                            {spellGroups.length === 0 && (
                              <span style={{ color: "#94a3b8", fontSize: 12 }}>此職業無常備法術</span>
                            )}
                            {spellGroups.map((grp) => (
                              <div key={grp.lvl}>
                                <div className="tac3d-spell-group-lbl">{grp.label}</div>
                                <div className="tac3d-palette-grid">
                                  {grp.items.map((sp) => {
                                    const isBonusSp = sp.actionCost === "bonus_action";
                                    const blockedByBonusRule =
                                      sp.level > 0 &&
                                      ((isBonusSp && activeUnit.turn?.castLeveledAction) ||
                                        (!isBonusSp && activeUnit.turn?.castLeveledBonus));
                                    const noAct = isBonusSp
                                      ? (activeUnit.turn?.bonusLeft || 0) <= 0
                                      : (activeUnit.turn?.actionLeft || 0) <= 0;
                                    const noSlot =
                                      sp.level > 0 &&
                                      !Object.entries(activeUnit.slots || {}).some(([lv, cnt]) => Number(lv) >= sp.level && cnt > 0);
                                    const shapeTag =
                                      sp.aoe?.shape === "cone"
                                        ? "🔥扇形"
                                        : sp.aoe?.shape === "line"
                                          ? "⚡直線"
                                          : sp.aoe
                                            ? "💥範圍"
                                            : "";
                                    return (
                                      <button
                                        key={sp.key}
                                        type="button"
                                        disabled={noAct || noSlot || blockedByBonusRule || sp.actionCost === "reaction"}
                                        className={`tac3d-btn${actionMode.kind === "spell" && actionMode.spellKey === sp.key ? " is-on" : ""}`}
                                        title={sp.effect}
                                        onClick={() => {
                                          setUpcastSlot(sp.level || 0);
                                          setActionMode({ kind: "spell", spellKey: sp.key });
                                          setPaletteOpen(false);
                                        }}
                                      >
                                        {isBonusSp ? "🟠" : "🟢"} {sp.name} {shapeTag}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                            {activeSpell && activeSpell.level > 0 && (
                              <div className="tac3d-pill" style={{ borderColor: "#f59e0b", marginTop: 4 }}>
                                <span>升環：</span>
                                {Object.entries(activeUnit.slots || {})
                                  .filter(([lv, cnt]) => Number(lv) >= activeSpell.level && cnt > 0)
                                  .map(([lv]) => (
                                    <button
                                      key={lv}
                                      type="button"
                                      className={`tac3d-btn${upcastSlot === Number(lv) ? " is-primary" : ""}`}
                                      style={{ padding: "2px 6px" }}
                                      onClick={() => setUpcastSlot(Number(lv))}
                                    >
                                      {lv}環
                                    </button>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}

                        {dockTab === "abilities" && (
                          <div className="tac3d-palette-grid">
                            {(activeUnit.slots?.[1] || 0) > 0 && (
                              <button
                                type="button"
                                className="tac3d-btn"
                                disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                                onClick={() => {
                                  runQuickAction((b, u) => executeSummonAlly(b, u.id));
                                  setPaletteOpen(false);
                                }}
                                title="消耗 1 主動作與 1 環法術位，召喚靈體戰狼加入先攻序列"
                              >
                                🐺 召喚靈體戰友 (1環)
                              </button>
                            )}
                            {(activeUnit.antidotes || 0) > 0 && (
                              <button
                                type="button"
                                className="tac3d-btn"
                                disabled={(activeUnit.turn?.bonusLeft || 0) <= 0 && (activeUnit.turn?.actionLeft || 0) <= 0}
                                onClick={() => {
                                  runQuickAction((b, u) => {
                                    const hurtAlly =
                                      b.units.find(
                                        (a) =>
                                          a.side === "hero" &&
                                          !a.dead &&
                                          Math.max(Math.abs(a.x - u.x), Math.abs(a.y - u.y)) <= 1 &&
                                          (a.conditions?.Poisoned || a.conditions?.Paralyzed || a.conditions?.Blinded || a.conditions?.Frightened || a.conditions?.Stunned)
                                      ) || u;
                                    return executeCureConditions(b, u.id, hurtAlly.id, "antidote");
                                  });
                                  setPaletteOpen(false);
                                }}
                                title="解除自身或相鄰隊友的中毒／麻痺／失明／恐懼／震懾"
                              >
                                💊 解毒淨化劑 ({activeUnit.antidotes})
                              </button>
                            )}
                            {(activeUnit.isCleric || activeUnit.isPaladin || activeUnit.isBard) && (
                              <button
                                type="button"
                                className="tac3d-btn"
                                disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                                onClick={() => {
                                  runQuickAction((b, u) => {
                                    const hurtAlly =
                                      b.units.find(
                                        (a) =>
                                          a.side === "hero" &&
                                          !a.dead &&
                                          Math.max(Math.abs(a.x - u.x), Math.abs(a.y - u.y)) <= 3 &&
                                          (a.conditions?.Poisoned || a.conditions?.Paralyzed || a.conditions?.Blinded || a.conditions?.Frightened || a.conditions?.Stunned)
                                      ) || u;
                                    return executeCureConditions(b, u.id, hurtAlly.id, "spell");
                                  });
                                  setPaletteOpen(false);
                                }}
                                title="消耗主動作解除 3 格內隊友的所有異常狀態"
                              >
                                ✨ 復原淨化術
                              </button>
                            )}
                            {(Array.isArray(activeUnit.abilities) ? activeUnit.abilities : []).map((ab) => {
                              const isBonus = ab.actionCost === "swift" || ab.actionCost === "bonus_action";
                              const noAct = isBonus ? (activeUnit.turn?.bonusLeft || 0) <= 0 : (activeUnit.turn?.actionLeft || 0) <= 0;
                              return (
                                <button
                                  key={ab.id}
                                  type="button"
                                  disabled={noAct || ab.usesLeft <= 0 || ab.actionCost === "reaction" || ab.actionCost === "free_on_hit"}
                                  className="tac3d-btn"
                                  title={ab.desc}
                                  onClick={() => {
                                    runQuickAction((b, u) => executeClassAbility(b, u.id, ab.id));
                                    setPaletteOpen(false);
                                  }}
                                >
                                  🌟 {ab.name.split(/[（(]/)[0]}
                                  {ab.usesLeft < 99 ? ` (${ab.usesLeft})` : ""}
                                </button>
                              );
                            })}
                            {(Array.isArray(activeUnit.potions) ? activeUnit.potions : []).map((pot) => (
                              <button
                                key={pot.id}
                                type="button"
                                disabled={(activeUnit.turn?.actionLeft || 0) <= 0 || pot.qty <= 0}
                                className={`tac3d-btn${actionMode.kind === "potion" ? " is-on" : ""}`}
                                onClick={() => {
                                  setActionMode({ kind: "potion" });
                                  setPaletteOpen(false);
                                }}
                              >
                                🧪 {pot.name} ({pot.qty})
                              </button>
                            ))}
                            {(Array.isArray(activeUnit.abilities) ? activeUnit.abilities : []).length === 0 &&
                              (Array.isArray(activeUnit.potions) ? activeUnit.potions : []).length === 0 && (
                                <span style={{ color: "#94a3b8", fontSize: 12 }}>此單位目前無可用職能或藥水</span>
                              )}
                          </div>
                        )}

                        {dockTab === "tactics" && (
                          <div className="tac3d-palette-grid">
                            <button
                              type="button"
                              disabled={(activeUnit.turn?.bonusLeft || 0) <= 0 || Boolean(activeUnit.conditions?.Lit)}
                              className="tac3d-btn"
                              onClick={() => {
                                runQuickAction((b, u) => executeStandardAction(b, u.id, "torch", null, { asBonus: true }));
                                setPaletteOpen(false);
                              }}
                              title="消耗附贈動作點燃火把，照亮周圍 4 格黑暗區域（持續 10 輪）"
                            >
                              {activeUnit.conditions?.Lit ? "🕯️ 已照明" : "🔥 點亮火把 (附贈)"}
                            </button>
                            <button
                              type="button"
                              disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                              className="tac3d-btn"
                              onClick={() => {
                                runQuickAction((b, u) => executeStandardAction(b, u.id, "dash"));
                                setPaletteOpen(false);
                              }}
                            >
                              💨 衝刺 (移動加倍)
                            </button>
                            <button
                              type="button"
                              disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                              className="tac3d-btn"
                              onClick={() => {
                                runQuickAction((b, u) => executeStandardAction(b, u.id, "disengage"));
                                setPaletteOpen(false);
                              }}
                            >
                              🕊 脫離 (免藉機)
                            </button>
                            <button
                              type="button"
                              disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                              className="tac3d-btn"
                              onClick={() => {
                                runQuickAction((b, u) => executeStandardAction(b, u.id, "dodge"));
                                setPaletteOpen(false);
                              }}
                            >
                              🛡️ 閃避 (被攻劣勢)
                            </button>
                            <button
                              type="button"
                              disabled={(activeUnit.turn?.actionLeft || 0) <= 0}
                              className="tac3d-btn"
                              onClick={() => {
                                runQuickAction((b, u) => executeStandardAction(b, u.id, "hide"));
                                setPaletteOpen(false);
                              }}
                            >
                              🕶 潛行 (爭取優勢)
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="tac3d-dock-tabs" role="tablist">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={dockTab === "weapons" && paletteOpen}
                        className={`tac3d-tab-btn${dockTab === "weapons" && paletteOpen ? " is-active" : ""}`}
                        onClick={() => togglePalette("weapons")}
                      >
                        ⚔️ 武器/攻擊
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={dockTab === "spells" && paletteOpen}
                        className={`tac3d-tab-btn${dockTab === "spells" && paletteOpen ? " is-active" : ""}`}
                        onClick={() => togglePalette("spells")}
                      >
                        ✨ 法術 ({uniqueSpells.length})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={dockTab === "abilities" && paletteOpen}
                        className={`tac3d-tab-btn${dockTab === "abilities" && paletteOpen ? " is-active" : ""}`}
                        onClick={() => togglePalette("abilities")}
                      >
                        🌟 職能/藥水
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={dockTab === "tactics" && paletteOpen}
                        className={`tac3d-tab-btn${dockTab === "tactics" && paletteOpen ? " is-active" : ""}`}
                        onClick={() => togglePalette("tactics")}
                      >
                        🛡️ 戰術
                      </button>
                    </div>

                    <div className="tac3d-quick-slots">
                      {primaryWpn && (
                        <button
                          type="button"
                          disabled={(activeUnit.turn?.actionLeft || 0) <= 0 && (activeUnit.turn?.attacksLeft || 0) <= 0}
                          className={`tac3d-btn is-quick${actionMode.kind === "weapon" && actionMode.weaponId === primaryWpn.id && !actionMode.asBonus ? " is-on" : ""}`}
                          onClick={() => {
                            setActionMode({ kind: "weapon", weaponId: primaryWpn.id, asBonus: false });
                            setPaletteOpen(false);
                          }}
                          title="快捷主武器"
                        >
                          {primaryWpn.isRanged ? "🏹" : "⚔️"} {primaryWpn.name}
                        </button>
                      )}
                      {activeUnit.turn?.bonusAttackUnlocked && activeUnit.turn?.bonusLeft > 0 && (
                        <button
                          type="button"
                          className={`tac3d-btn is-quick${actionMode.kind === "weapon" && actionMode.asBonus ? " is-on" : ""}`}
                          onClick={() => {
                            setActionMode({
                              kind: "weapon",
                              weaponId: activeUnit.weapons.find((w) => !w.isRanged && w.light)?.id || activeUnit.weapons[0]?.id,
                              asBonus: true,
                            });
                            setPaletteOpen(false);
                          }}
                          title="雙持副手連擊（消耗附贈動作）"
                        >
                          🟠 副手連擊
                        </button>
                      )}
                      {quickSpells.map((sp) => {
                        const isBonusSp = sp.actionCost === "bonus_action";
                        const noAct = isBonusSp ? (activeUnit.turn?.bonusLeft || 0) <= 0 : (activeUnit.turn?.actionLeft || 0) <= 0;
                        const noSlot =
                          sp.level > 0 &&
                          !Object.entries(activeUnit.slots || {}).some(([lv, cnt]) => Number(lv) >= sp.level && cnt > 0);
                        return (
                          <button
                            key={sp.key}
                            type="button"
                            disabled={noAct || noSlot}
                            className={`tac3d-btn is-quick${actionMode.kind === "spell" && actionMode.spellKey === sp.key ? " is-on" : ""}`}
                            onClick={() => {
                              setUpcastSlot(sp.level || 0);
                              setActionMode({ kind: "spell", spellKey: sp.key });
                              setPaletteOpen(false);
                            }}
                            title={`快捷施法：${sp.name}`}
                          >
                            ✨ {sp.name}
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div style={{ color: "#fca5a5", fontSize: 13 }}>
              🤖 敵方行動中：{activeUnit.name} 正在根據地形與 AI 邏輯執行決策…
            </div>
          )}
        </footer>
      )}
    </div>
  );
}
