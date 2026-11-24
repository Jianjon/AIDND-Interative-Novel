import { M as MONSTER_DB, P as PRESET_HEROES } from "../artifactDeps.js";

const VALID_LIGHTINGS = new Set(["daylight", "dusk", "night", "underground", "horror"]);
const VALID_WEATHERS = new Set([
  "clear",
  "rain",
  "lightning_storm",
  "snow",
  "fog",
  "gale",
  "embers",
  "spores",
]);

export function inferScenarioIdFromSession(session) {
  const mapId = String(session?.map || "").toLowerCase();
  const raw = [
    mapId,
    session?.place?.name,
    session?.node?.title,
    session?.node?.situation,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Direct module map ID routing across all 98+ module scenes
  if (/airship_deck|cargo_ship|sky_platform|pirate_cove|harbour_fort|ship|boat|deck|船|甲板|飛空艇|海盜/.test(raw)) {
    return "ship_deck";
  }
  if (/volcanic_caves|lava_field|fire_sanctum|fiery_dragon_hall|infernal_altar|infernal_temple|forge_complex|dwarven_forge_room|volcanic|lava|infernal|forge|熔岩|火山|煉獄|熔爐|鍛造/.test(raw)) {
    return "volcanic_forge";
  }
  if (/sand_arena|sandstone_pass|desert_settlement|dry_road|desert|sand|oasis|荒漠|沙漠|沙丘|砂岩/.test(raw)) {
    return "desert_canyon";
  }
  if (/coral_shrine|coastal_beach|shore_ruins|waterfall_pool|harbour_town|coral|underwater|beach|shore|珊瑚|海灣|海灘|水下|沉沒|海底/.test(raw)) {
    return "coral_underwater";
  }
  if (/mountain_pass|ravine_bridge|rocky_camp|bone_den|dragon_cave|cliff|mountain|ravine|山道|懸崖|峭壁|斷崖|峽谷/.test(raw)) {
    return "mountain_cliff";
  }
  if (/royal_hall|sunlit_throne|banquet_manor|academy_library|blue_tower|round_arena|gold_chamber|treasure_store|chessboard|throne|castle|palace|academy|library|arena|王座|城堡|宮殿|高塔|圖書館|競技場|金庫/.test(raw)) {
    return "castle_throne";
  }
  if (/night_alley|slum_alleys|stone_streets|ruined_street|courtyard_market|village_square|day_rooftops|phandalin_town|village_courtyard|urban|alley|rooftop|market|street|暗巷|街區|屋頂|市集|城鎮/.test(raw)) {
    return "urban_alley";
  }
  if (/night_marsh|swamp_ruins|fungus_passages|underdark_ruins|worm_interior|swamp|marsh|bog|fungus|沼澤|泥濘|蘑菇|地底/.test(raw)) {
    return "swamp_ruins";
  }
  if (/wooden_tavern|small_inn|riverside_inn|tavern|inn|pub|酒館|旅店|驛站/.test(raw)) {
    return "tavern_brawl";
  }
  if (/ice_bridge|ice_chasm|ice_hunter_village|ice_sanctum|snow_harbor|snow_pass|snow_river|snow_town|frost|ice|snow|glacier|極地|冰|雪|寒霜/.test(raw)) {
    return "frost_citadel";
  }
  if (/burial_chambers|cross_tomb|crypt_hall|haunted_manor|lich_tomb|shadow_cathedral|tomb_passages|crypt|cemetery|grave|church|gothic|tomb|墓|教堂|幽魂|亡靈|大教堂/.test(raw)) {
    return "haunted_crypt";
  }
  if (/agatha_grove|bright_trail|glade_camp|grassy_crossroads|hedge_maze|luminous_garden|road_camp|waterfall_glade|woodland_cottage|woodland_lake|farmstead|forest|wood|jungle|camp|trail|森林|密林|樹林|營地|花園|林道/.test(raw)) {
    return "forest_ambush";
  }
  if (/broken_bridge|creek_outpost|river_bridge|river_camp|sewer_pool|ritual_sewer|river|bridge|water|stream|canal|sewer|河|橋|溪|水道/.test(raw)) {
    return "underground_river";
  }
  if (/arcane_cave|cragmaw_castle|redbrand_hideout|ruined_keep|thundertree_ruins|chasm|sanctum|altar|arcane|rift|深淵|聖殿|祭壇|裂隙/.test(raw)) {
    return "chasm_sanctum";
  }
  if (/bear_cavern|dark_dragon_den|green_lair|troll|grotto|lair|食人妖|巨魔|巢穴|獸穴/.test(raw)) {
    return "troll_grotto";
  }
  return "cave_ambush";
}

export function inferWeatherFromAmbient(ambient) {
  const list = Array.isArray(ambient) ? ambient : ambient ? [ambient] : [];
  const joined = list.join(" ").toLowerCase();
  if (!joined) return "auto";
  if (joined.includes("lightning") || joined.includes("storm") || joined.includes("雷")) return "lightning_storm";
  if (joined.includes("rain") || joined.includes("雨")) return "rain";
  if (joined.includes("snow") || joined.includes("雪")) return "snow";
  if (joined.includes("fog") || joined.includes("mist") || joined.includes("霧")) return "fog";
  if (joined.includes("gale") || joined.includes("wind") || joined.includes("風")) return "gale";
  if (joined.includes("ember") || joined.includes("fire") || joined.includes("ash") || joined.includes("燼")) return "embers";
  if (joined.includes("spore") || joined.includes("孢子")) return "spores";
  for (const w of list) {
    if (VALID_WEATHERS.has(w)) return w;
  }
  return "auto";
}

function matchMonsterTemplateId(foe) {
  const txt = `${foe?.templateId || ""} ${foe?.role || ""} ${foe?.name || ""}`.toLowerCase();
  if (foe?.templateId && MONSTER_DB[foe.templateId]) return foe.templateId;
  if (/wyvern|飛龍/.test(txt)) return "wyvern";
  if (/red_dragon|紅龍|巨龍|龍王|dragon/.test(txt)) return /幼|雛|wyrmling/.test(txt) ? "red_dragon_wyrmling" : "young_red_dragon";
  if (/imp|demon|devil|fiend|惡魔|魔鬼|煉獄/.test(txt)) return "imp";
  if (/vampire|吸血鬼/.test(txt)) return "vampire_spawn";
  if (/frost_giant|冰霜巨人|巨人/.test(txt)) return "frost_giant";
  if (/troll|巨魔|食人妖/.test(txt)) return "troll";
  if (/ogre|食人魔/.test(txt)) return "ogre";
  if (/archer|bow|弓/.test(txt)) return "goblin_archer";
  if (/goblin|哥布林/.test(txt)) return "goblin";
  if (/orc|獸人/.test(txt)) return "orc";
  if (/skeleton|骷髏/.test(txt)) return "skeleton";
  if (/zombie|殭屍|喪屍/.test(txt)) return "zombie";
  if (/wolf|狼/.test(txt)) return "wolf";
  if (/spider|蜘蛛/.test(txt)) return "giant_spider";
  if (/cultist|教徒|邪教/.test(txt)) return "cultist";
  if (/mage|wizard|法師|術士/.test(txt)) return "cult_fanatic";
  if (/bandit|thug|盜賊|強盜|土匪/.test(txt)) return "bandit";
  return "goblin";
}

function matchHeroPreset(hero, idx) {
  const roleTxt = `${hero?.className || ""} ${hero?.role || ""} ${hero?.name || ""}`.toLowerCase();
  let base =
    PRESET_HEROES.find((p) => p.id === hero?.sourceId || p.id === hero?.id) ||
    PRESET_HEROES.find((p) => roleTxt.includes((p.className || "").toLowerCase()));
  if (!base) {
    if (/rogue|thief|盜賊|遊蕩/.test(roleTxt)) base = PRESET_HEROES.find((p) => p.id === "preset_rogue");
    else if (/cleric|priest|牧師|神官/.test(roleTxt)) base = PRESET_HEROES.find((p) => p.id === "preset_cleric");
    else if (/wizard|mage|sorc|法師|術士/.test(roleTxt)) base = PRESET_HEROES.find((p) => p.id === "preset_wizard");
    else if (/barbarian|berserk|野蠻/.test(roleTxt)) base = PRESET_HEROES.find((p) => p.id === "preset_barbarian");
    else if (/paladin|knight|聖武|騎士/.test(roleTxt)) base = PRESET_HEROES.find((p) => p.id === "preset_paladin");
    else if (/ranger|archer|遊俠|弓/.test(roleTxt)) base = PRESET_HEROES.find((p) => p.id === "preset_ranger");
    else if (/bard|吟遊/.test(roleTxt)) base = PRESET_HEROES.find((p) => p.id === "preset_bard");
    else base = PRESET_HEROES[idx % PRESET_HEROES.length];
  }
  return {
    ...base,
    id: hero?.id || base.id,
    name: hero?.name || base.name,
    avatar: hero?.image || hero?.avatar || base.avatar,
    race: hero?.race || base.race,
    hpOverride: Number.isFinite(hero?.hp) ? hero.hp : undefined,
    maxHpOverride: Number.isFinite(hero?.maxHp) ? hero.maxHp : undefined,
    acOverride: Number.isFinite(hero?.ac) ? hero.ac : undefined,
  };
}

const VALID_HERO_FORMATIONS = new Set(["auto", "left", "bottom", "top", "center", "scattered", "split"]);
const VALID_FOE_FORMATIONS = new Set(["auto", "right", "top", "bottom", "surround", "flank", "ambush_behind", "scattered"]);

export function extractBlueprintFromText(rawText = "") {
  const txt = String(rawText || "").toLowerCase();
  if (!txt) return null;
  const features = [];
  let layout = "auto";
  if (/(兩艘|雙船|木板|跳板|接舷|另一艘船)/.test(txt)) layout = "twin_ships";
  else if (/(岸壁|峭壁|懸崖).*(海|浪|水)|(海|浪|水).*(岸壁|峭壁|懸崖)/.test(txt)) layout = "cliff_and_sea";

  if (/營火|篝火|火堆|campfire/.test(txt)) features.push("campfire");
  if (/貨車|馬車|車隊|wagon|cart/.test(txt)) features.push("wagon");
  if (/油桶|火油|炸藥|barrel|oil/.test(txt)) features.push("oil_barrels");
  if (/祭壇|神龕|altar/.test(txt)) features.push("altar");
  if (/晶體|水晶|crystal/.test(txt)) features.push("crystal");

  let heroFormation = "auto";
  if (/(從下方|南側|南邊|底下|入口爬上|登陸|岸邊登|從南面)/.test(txt)) heroFormation = "bottom";
  else if (/(從上方|北側|北邊|高處俯衝|跳下|從北面)/.test(txt)) heroFormation = "top";
  else if (/(分散|失散|各自|墜落|四散|混戰)/.test(txt)) heroFormation = "scattered";
  else if (/(中央|營火旁|紮營|圍坐在|大廳中央|被圍|四面楚歌)/.test(txt)) heroFormation = "center";
  else if (/(分頭|兩路|分組|各自包抄)/.test(txt)) heroFormation = "split";

  let foeFormation = "auto";
  if (/(四面|包圍|包抄|團團圍住|四方湧出|被圍)/.test(txt)) foeFormation = "surround";
  else if (/(兩翼|夾擊|左右包抄|前後夾擊)/.test(txt)) foeFormation = "flank";
  else if (/(背後|後方|偷襲|暗算|身後)/.test(txt)) foeFormation = "ambush_behind";
  else if (/(高處|上方|北側|居高臨下|懸崖上|城牆上)/.test(txt)) foeFormation = "top";
  else if (/(下方湧|南側湧|水面湧出|船底)/.test(txt)) foeFormation = "bottom";
  else if (/(埋伏在各處|四處|角落|潛伏|伏兵四起)/.test(txt)) foeFormation = "scattered";

  if (foeFormation === "surround" && heroFormation === "auto" && layout !== "twin_ships") {
    heroFormation = "center";
  }

  const foeWaves = /(援軍|增援|伏兵陸續|一波波|接連趕到)/.test(txt);

  if (
    layout === "auto" &&
    features.length === 0 &&
    heroFormation === "auto" &&
    foeFormation === "auto" &&
    !foeWaves
  ) {
    return null;
  }
  return { layout, features, heroFormation, foeFormation, foeWaves };
}

export async function adjudicateMapBlueprintWithAI(sampler, session) {
  const fallbackText = [
    session?.place?.name,
    session?.node?.title,
    session?.node?.situation,
    ...(Array.isArray(session?.log) ? session.log.slice(-3).map((l) => l.text) : []),
  ]
    .filter(Boolean)
    .join(" ");
  const localBp = extractBlueprintFromText(fallbackText);
  if (typeof sampler !== "function") return localBp;

  const prompt = `你是 D&D 3D 戰棋地圖建築師。請根據以下劇情現場描述，輸出簡潔的 3D 地形與雙方部署藍圖 JSON（只回傳 JSON，不要多餘文字）：
劇情：「${fallbackText.slice(0, 450)}」
欄位規格：
- layout: "auto" | "twin_ships"(兩艘船用木板相連) | "cliff_and_sea"(一邊岸壁一邊海水)
- features: 陣列，可選 ["campfire"(營火), "wagon"(貨車), "oil_barrels"(油桶), "altar"(祭壇), "crystal"(晶體)]
- heroFormation: "auto"(預設左側) | "bottom"(從下方進場) | "top"(從上方進場) | "center"(中央聚攏/紮營/被圍) | "scattered"(分散各處) | "split"(分兩組行動)
- foeFormation: "auto"(預設右側) | "top"(上方高處壓制) | "bottom"(下方進逼) | "surround"(四面包圍) | "flank"(兩翼夾擊) | "ambush_behind"(後方偷襲) | "scattered"(分散潛伏)
- foeWaves: boolean (劇情是否有伏兵/援軍陸續趕到)
- title: 12字內繁中戰場標題
- objectiveName: 10字內繁中戰場互動目標名稱`;

  try {
    const res = await sampler(prompt, { modelTier: "quick" });
    const match = String(res?.text || "").match(/\{[\s\S]*\}/);
    if (!match) return localBp;
    const parsed = JSON.parse(match[0]);
    return {
      layout: ["twin_ships", "cliff_and_sea"].includes(parsed.layout) ? parsed.layout : localBp?.layout || "auto",
      features: Array.isArray(parsed.features) ? parsed.features : localBp?.features || [],
      heroFormation: VALID_HERO_FORMATIONS.has(parsed.heroFormation) ? parsed.heroFormation : localBp?.heroFormation || "auto",
      foeFormation: VALID_FOE_FORMATIONS.has(parsed.foeFormation) ? parsed.foeFormation : localBp?.foeFormation || "auto",
      foeWaves: typeof parsed.foeWaves === "boolean" ? parsed.foeWaves : Boolean(localBp?.foeWaves),
      title: parsed.title || undefined,
      objectiveName: parsed.objectiveName || undefined,
    };
  } catch {
    return localBp;
  }
}

function inferInteractableRewardFromText(txt = "") {
  if (/火|炸|爆|燒|油|雷|擊碎|砸|重創|墜|塌|撞/.test(txt)) return "aoe_holy_burst";
  if (/速|飛|躍|蕩|先機|搶先|撤|突圍|閃/.test(txt)) return "haste_party";
  if (/護|療|救|釋放|鬆綁|士氣|激勵|清醒/.test(txt)) return "inspire_party";
  return "weaken_foes";
}

function inferInteractableKindFromText(txt = "", skill = "") {
  if (/油|酒|火藥|炸|爆|燃/.test(txt)) return "oil_barrel";
  if (/祭壇|神龕|聖|宗教|祈禱|淨化/.test(txt) || /宗教/.test(skill)) return "altar";
  if (/門|鎖|籠|柵|閥|閘|橋|繩|索|機關/.test(txt) || /巧手/.test(skill)) return "gate";
  if (/推|撞|石|柱|箱|車|桶|倒/.test(txt) || /運動/.test(skill)) return "boulder";
  return "crystal";
}

function inferActionLabelFromText(txt = "", skill = "") {
  if (/推|撞|推倒|掀翻/.test(txt)) return "推動";
  if (/炸|引爆|點燃|燒/.test(txt)) return "引爆";
  if (/撬|開鎖|打開|開啟|解鎖|釋放/.test(txt)) return "開啟";
  if (/拆|毀|破壞|砸|切斷|砍斷|射斷/.test(txt)) return "破壞";
  if (/潛|摸|躲|繞/.test(txt) || /隱匿/.test(skill)) return "潛行";
  if (/說服|威嚇|欺瞞|喝斥|交涉|談/.test(txt) || /說服|威嚇|欺瞞/.test(skill)) return "交涉";
  if (/奧秘|法陣|符文|施法|反制/.test(txt) || /奧秘/.test(skill)) return "破解";
  if (/宗教|祈|祝|淨化/.test(txt) || /宗教/.test(skill)) return "祝聖";
  return "利用";
}

function buildStoryInteractables(node) {
  const tacInters = Array.isArray(node?.tactical?.interactables) ? node.tactical.interactables : null;
  if (tacInters && tacInters.length > 0) {
    return tacInters.map((item) => {
      const skill = item.skillName || item.skill || "";
      const txt = `${item.name || ""} ${item.rewardDesc || ""}`;
      return {
        ...item,
        skill: skill || undefined,
        skillName: skill || undefined,
        actionLabel: item.actionLabel || inferActionLabelFromText(txt, skill),
        shovable: typeof item.shovable === "boolean" ? item.shovable : /推|撞|桶|柱|石|箱|車/.test(txt),
      };
    });
  }
  const approaches = Array.isArray(node?.approaches) ? node.approaches : [];
  const derived = [];
  for (const app of approaches) {
    const m = String(app?.check || "").match(/([^\s\d]+)\s*DC\s*(\d+)/i);
    if (!m) continue;
    const skill = m[1];
    const dc = Number(m[2]);
    const rawTitle = String(app?.type || "").replace(/[（(][^）)]*[）)]/g, "").trim();
    const shortName = rawTitle.length > 16 ? rawTitle.slice(0, 16) : rawTitle || `${skill}戰術互動`;
    const txt = `${app?.type || ""} ${app?.outcome || ""}`;
    derived.push({
      kind: inferInteractableKindFromText(txt, skill),
      name: shortName,
      skill,
      dc: Number.isFinite(dc) ? dc : 12,
      actionLabel: inferActionLabelFromText(txt, skill),
      shovable: /推|撞|推倒|掀翻|桶|石|柱|箱|車/.test(txt),
      rewardEffect: inferInteractableRewardFromText(txt),
      rewardDesc: app?.outcome || `${shortName}檢定成功，取得戰術優勢！`,
    });
    if (derived.length >= 2) break;
  }
  return derived.length > 0 ? derived : undefined;
}

export function mapStorySessionTo3DConfig(session) {
  if (!session) return null;
  const tac = session?.node?.tactical || null;
  const scenarioId = tac?.scenarioId || inferScenarioIdFromSession(session);
  const rawLighting = tac?.lighting || session?.sceneMood?.lighting;
  const lighting = VALID_LIGHTINGS.has(rawLighting) ? rawLighting : "auto";
  const weather = tac?.weather || inferWeatherFromAmbient(session?.sceneMood?.ambient);
  const ambushMode = ["normal", "hero_surprise", "foe_surprise"].includes(tac?.ambushMode) ? tac.ambushMode : "normal";
  const partyLevel = Math.max(1, Math.min(5, Number(session?.level) || 3));
  const textBlueprint = extractBlueprintFromText(
    [
      session?.place?.name,
      session?.node?.title,
      session?.node?.situation,
      ...(Array.isArray(session?.log) ? session.log.slice(-3).map((l) => l.text) : []),
    ]
      .filter(Boolean)
      .join(" ")
  );
  const blueprint =
    tac || textBlueprint
      ? {
          layout: tac?.layout || textBlueprint?.layout || "auto",
          features: Array.isArray(tac?.features) ? tac.features : textBlueprint?.features || [],
          heroFormation: VALID_HERO_FORMATIONS.has(tac?.heroFormation) ? tac.heroFormation : textBlueprint?.heroFormation || "auto",
          foeFormation: VALID_FOE_FORMATIONS.has(tac?.foeFormation) ? tac.foeFormation : textBlueprint?.foeFormation || "auto",
          foeWaves: typeof tac?.foeWaves === "boolean" ? tac.foeWaves : Boolean(textBlueprint?.foeWaves),
          objectiveName: tac?.objectiveName || textBlueprint?.objectiveName || undefined,
          interactables: buildStoryInteractables(session?.node),
          tabletopMapId: tac?.tabletopMap || session?.node?.map || undefined,
        }
      : null;

  const livingHeroes = (session?.heroes || []).filter((h) => h && !h.dead);
  const partyPresets = livingHeroes.slice(0, 5).map((h, idx) => matchHeroPreset(h, idx));

  const activeFoes = (session?.cast || []).filter(
    (c) =>
      c &&
      c.kind === "foe" &&
      c.present &&
      !["倒下", "投降", "逃走", "離開"].includes(c.status) &&
      (c.hp === undefined || c.hp > 0)
  );
  let foeIds = activeFoes.length > 0 ? activeFoes.slice(0, 6).map((f) => matchMonsterTemplateId(f)) : null;
  let foeSpecs = activeFoes.slice(0, 6).map((f) => ({
    storyCastId: f.id,
    catalogId: f.catalogId || f.templateId || undefined,
    name: f.name,
    hp: Number.isFinite(f.hp) ? f.hp : undefined,
    maxHp: Number.isFinite(f.maxHp) ? f.maxHp : undefined,
    avatar: f.image || f.avatar || f.spriteHint || undefined,
  }));
  if (foeIds === null && Array.isArray(session?.node?.foes) && session.node.foes.length > 0) {
    const expandedFoes = [];
    for (const entry of session.node.foes) {
      if (!Array.isArray(entry) || !entry[0]) continue;
      const tpl = String(entry[0]);
      const count = Math.max(1, Number(entry[1]) || 1);
      for (let i = 0; i < count && expandedFoes.length < 6; i++) {
        expandedFoes.push(tpl);
      }
      if (expandedFoes.length >= 6) break;
    }
    if (expandedFoes.length > 0) foeIds = expandedFoes;
  }
  if (Array.isArray(tac?.namedFoes) && tac.namedFoes.length > 0) {
    const existingNames = new Set(foeSpecs.map((f) => f.name));
    const extraNamed = tac.namedFoes.filter((nf) => nf?.name && !existingNames.has(nf.name));
    if (extraNamed.length > 0) {
      const extraIds = extraNamed.map((nf) => nf.template || "cult_fanatic");
      const extraSpecs = extraNamed.map((nf) => ({
        catalogId: nf.template || "cult_fanatic",
        name: nf.name,
        isBoss: Boolean(nf.isBoss),
      }));
      foeIds = foeIds ? [...extraIds, ...foeIds].slice(0, 6) : extraIds;
      foeSpecs = [...extraSpecs, ...foeSpecs].slice(0, 6);
    }
  }
  if (foeIds === null) {
    foeIds = [];
  }

  const situationTxt = `${session?.node?.title || ""} ${session?.node?.situation || ""}`;
  const activeAllies = (session?.cast || []).filter((c) => {
    if (!c || !c.present) return false;
    if (["倒下", "死亡", "逃走", "離開"].includes(c.status)) return false;
    if (c.hp !== undefined && c.hp <= 0) return false;
    if (c.kind === "ally") return true;
    if (c.kind === "npc") {
      return /護送|保護|隨行|同行|友軍|衛兵|商旅|領袖|協助|並肩|人質|受困/.test(
        `${c.role || ""} ${c.note || ""} ${c.status || ""} ${situationTxt}`
      );
    }
    return false;
  });
  const allySpecs = activeAllies.slice(0, 2).map((a) => {
    const roleTxt = `${a.role || ""} ${a.name || ""} ${a.note || ""}`;
    const isVip = /護送|被保護|保護|商旅|學者|村長|平民|人質|vip|受困/.test(roleTxt);
    return {
      storyCastId: a.id,
      name: a.name,
      className: a.role || (isVip ? "被保護人" : "友軍護衛"),
      allyRole: isVip ? "vip" : "combat",
      ranged: /弓|弩|法|牧|遊俠/.test(roleTxt),
      hp: Number.isFinite(a.hp) ? a.hp : undefined,
      maxHp: Number.isFinite(a.maxHp) ? a.maxHp : undefined,
      avatar: a.image || a.avatar || a.spriteHint || undefined,
    };
  });

  const mergedAllies =
    allySpecs.length > 0
      ? allySpecs
      : Array.isArray(tac?.allies)
        ? tac.allies.slice(0, 2).map((a) => ({
            name: a.name,
            className: a.className || (a.role === "vip" ? "被保護人" : "友軍護衛"),
            allyRole: a.role === "vip" ? "vip" : "combat",
            ranged: Boolean(a.ranged),
          }))
        : null;

  const buildPreBattleHintLine = () => {
    const bestHero = [...livingHeroes].sort((a, b) => {
      const wa = Math.floor(((a.attributes?.wis ?? 10) - 10) / 2);
      const wb = Math.floor(((b.attributes?.wis ?? 10) - 10) / 2);
      return wb - wa;
    })[0];
    const heroName = bestHero?.name ? String(bestHero.name).split(/[（(]/)[0].trim() : "隊伍";
    const wisMod = Math.floor((((bestHero?.attributes?.wis ?? 12) - 10) / 2));
    const passiveVal = 10 + Math.max(0, wisMod) + Math.max(2, Math.ceil((partyLevel || 3) / 4) + 1);
    const firstInter = blueprint?.interactables?.[0];
    if (firstInter?.name) {
      return `💡 戰前感知（${heroName} 取10被動察覺 ${passiveVal}）：注意到場上有【${firstInter.name}】（${firstInter.skill || "運動/巧手"} DC ${firstInter.dc || 12}），靠近互動可${firstInter.rewardDesc || "取得戰術優勢！"}`;
    }
    if (ambushMode === "foe_surprise") {
      return `💡 戰前感知（${heroName} 取10被動察覺 ${passiveVal}）：察覺兩側陰影與高地有伏兵氣息，開戰務必先穩住陣型！`;
    }
    if (tac?.namedFoes?.[0]?.name) {
      return `💡 戰前感知（${heroName} 取10被動察覺 ${passiveVal}）：鎖定強敵【${tac.namedFoes[0].name}】，善用方塊高低差與夾擊集中突破！`;
    }
    return `💡 戰前感知（${heroName} 取10被動察覺 ${passiveVal}）：留意周圍地形高低差與場地物件，先佔領有利位置再集火！`;
  };

  const preBattleHint = { speaker: "戰前感知提示", side: "hero", line: buildPreBattleHintLine() };
  const mergedScript = tac?.script
    ? {
        ...tac.script,
        opening: Array.isArray(tac.script.opening)
          ? [...tac.script.opening, preBattleHint]
          : [preBattleHint],
      }
    : {
        missionGoal: blueprint?.objectiveName || `擊敗敵軍，完成【${session?.node?.title || "戰鬥遭遇"}】`,
        opening: [preBattleHint],
      };

  return {
    scenarioId,
    weather,
    lighting,
    ambushMode,
    partyLevel,
    partyPresets: partyPresets.length > 0 ? partyPresets : null,
    foeIds,
    foeSpecs,
    allySpecs: mergedAllies,
    blueprint,
    presetScript: mergedScript,
    seed: ((Number(session?.turn) || 1) * 37 + 101) % 9999,
    placeName: session?.place?.name || session?.map || "當前劇情場景",
    storySummary: {
      nodeTitle: session?.node?.title || "",
      situation: session?.node?.situation || "",
      recentLogs: (Array.isArray(session?.log) ? session.log : [])
        .slice(-3)
        .map((l) => l?.text)
        .filter(Boolean),
    },
  };
}

export function applyBattleSummaryToSession(session, summary) {
  if (!session || !summary) return session;

  const statusById = new Map((summary.partyStatus || []).map((p) => [p.id, p]));
  const statusByName = new Map((summary.partyStatus || []).map((p) => [p.name, p]));

  const nextHeroes = (session.heroes || []).map((h) => {
    const st = statusById.get(h.id) || statusByName.get(h.name);
    if (!st) return h;
    return {
      ...h,
      hp: Math.max(0, Math.min(h.maxHp || st.maxHp || 999, st.hp)),
      dead: Boolean(st.dead),
    };
  });

  const defeatedNames = new Set((summary.defeatedFoes || []).map((f) => f.name));
  const capturedNames = new Set((summary.capturedFoes || []).map((f) => f.name));
  const surrenderedNames = new Set((summary.surrenderedFoes || []).map((f) => f.name));
  const allyByCastId = new Map((summary.allyStatus || []).filter((a) => a.storyCastId).map((a) => [a.storyCastId, a]));
  const allyByName = new Map((summary.allyStatus || []).map((a) => [a.name, a]));
  const nextCast = (session.cast || []).map((c) => {
    if (c.present && (c.kind === "ally" || c.kind === "npc")) {
      const al = allyByCastId.get(c.id) || allyByName.get(c.name);
      if (al) {
        return {
          ...c,
          hp: Math.max(0, Math.min(c.maxHp || al.maxHp || 999, al.hp)),
          status: al.dead ? "倒下" : al.allyRole === "vip" && summary.outcome === "victory" ? "安全脫險" : c.status,
        };
      }
    }
    if (c.kind !== "foe" || !c.present) return c;
    if (capturedNames.has(c.name)) return { ...c, hp: 1, status: "俘虜" };
    if (surrenderedNames.has(c.name)) return { ...c, hp: 0, status: "投降" };
    if (summary.outcome === "victory" || defeatedNames.has(c.name)) {
      return { ...c, hp: 0, status: "倒下" };
    }
    return c;
  });

  const outcomeLabel =
    summary.outcome === "victory"
      ? "大獲全勝"
      : summary.outcome === "retreat"
        ? "戰術撤退"
        : summary.outcome === "defeat"
          ? "全軍覆沒"
          : "戰鬥暫歇";
  const defeatedList = (summary.defeatedFoes || []).map((f) => f.name).join("、") || "無";
  const capturedList = (summary.capturedFoes || []).map((f) => f.name).join("、");
  const surrenderedList = (summary.surrenderedFoes || []).map((f) => f.name).join("、");
  const objList = (summary.completedObjectives || []).map((o) => o.name).join("、");
  const vipNote = summary.vipLost
    ? "⚠️ 護送目標在戰鬥中倒下"
    : summary.vipProtected
      ? "👑 成功護送保護目標安全存活"
      : "";
  const beatsNote = Array.isArray(summary.scriptBeats) && summary.scriptBeats.length > 0
    ? `關鍵對話：${summary.scriptBeats.slice(0, 3).join(" / ")}`
    : "";
  const extraNotes = [
    capturedList ? `俘虜：${capturedList}` : "",
    surrenderedList ? `投降：${surrenderedList}` : "",
    objList ? `達成戰場目標：${objList}` : "",
    vipNote,
    beatsNote,
  ]
    .filter(Boolean)
    .join("；");
  const summaryText = `⚔️【3D 戰棋結算｜${summary.scenarioName || "戰場"}】${outcomeLabel}（歷經 ${summary.rounds || 1} 輪）。擊倒：${defeatedList}（獲得 ${summary.totalXp || 0} XP）${extraNotes ? `；${extraNotes}` : ""}。`;

  const nextLog = [
    ...(Array.isArray(session.log) ? session.log : []),
    {
      id: `tac3d_${Date.now()}`,
      type: "system",
      turn: session.turn || 1,
      text: summaryText,
    },
  ];

  return {
    ...session,
    heroes: nextHeroes,
    cast: nextCast,
    log: nextLog,
    lastTacticalSummary: summary,
  };
}

export function buildFallbackBattleScript({ storyContext = null, battle = null } = {}) {
  const heroes = (battle?.units || []).filter((u) => u.side === "hero" && !u.isNpcAlly);
  const foes = (battle?.units || []).filter((u) => u.side === "foe");
  const leadHero = heroes[0]?.name || storyContext?.partyPresets?.[0]?.name || "我方隊長";
  const secondHero = heroes[1]?.name || storyContext?.partyPresets?.[1]?.name || leadHero;
  const leadFoe = foes[0]?.name || storyContext?.foeSpecs?.[0]?.name || "敵方頭目";
  const objProp = (battle?.map?.props || []).find((p) => p.interactable || p.isObjective);
  const objName = storyContext?.blueprint?.objectiveName || objProp?.name || "戰場關鍵目標";
  const placeName = storyContext?.placeName || battle?.map?.name || "戰場";
  const nodeTitle = storyContext?.storySummary?.nodeTitle || "";
  const sitSnippet = String(storyContext?.storySummary?.situation || "").replace(/\s+/g, " ").trim().slice(0, 38);

  const base = {
    missionGoal: objProp
      ? `擊退敵軍並處理【${objName}】`
      : nodeTitle
        ? `${nodeTitle}：制伏敵方勢力`
        : `制伏【${placeName}】的敵方勢力`,
    opening: [
      {
        speaker: leadHero,
        side: "hero",
        line: sitSnippet
          ? `${sitSnippet}……全體戒備，準備接戰！`
          : objProp
            ? `大家注意陣型！這場必須壓制敵人並掌控【${objName}】，別讓他們包抄！`
            : `全體戒備！就在「${placeName}」解決他們，彼此照應別落單！`,
      },
      {
        speaker: leadFoe,
        side: "foe",
        line: `哼，自投羅網的傢伙！把他們全部包圍起來，一個都別放走！`,
      },
    ],
    triggers: {
      foeHalfHp: {
        speaker: leadFoe,
        side: "foe",
        line: `該死……這群傢伙比想像中難纏！都給我全力壓上去！`,
      },
      heroDown: {
        speaker: secondHero,
        side: "hero",
        line: `撐住！馬上掩護倒下的同伴，別讓敵人補刀！`,
      },
      waveArrive: {
        speaker: leadFoe,
        side: "foe",
        line: `援軍到了！看你們這下還往哪裡逃！`,
      },
    },
    propLine: {
      speaker: secondHero,
      side: "hero",
      line: `【${objName}】已經處理妥當！趁現在擴大戰果！`,
    },
    ending: {
      victory: [
        {
          speaker: leadHero,
          side: "hero",
          line: `總算穩住局面了……大家檢查傷勢與戰利品，準備回到正題。`,
        },
      ],
      retreat: [
        {
          speaker: leadHero,
          side: "hero",
          line: `戰況不利，全隊依序撤離重整！`,
        },
      ],
      defeat: [
        {
          speaker: leadFoe,
          side: "foe",
          line: `不自量力的蠢貨……這場戰鬥是我們贏了。`,
        },
      ],
    },
  };
  const preset = storyContext?.presetScript;
  if (!preset) return base;
  return {
    missionGoal: preset.missionGoal || base.missionGoal,
    opening: Array.isArray(preset.opening) && preset.opening.length > 0 ? preset.opening : base.opening,
    triggers: {
      foeHalfHp: preset.triggers?.foeHalfHp || base.triggers.foeHalfHp,
      heroDown: preset.triggers?.heroDown || base.triggers.heroDown,
      waveArrive: preset.triggers?.waveArrive || base.triggers.waveArrive,
    },
    propLine: preset.propLine || base.propLine,
    ending: {
      victory: Array.isArray(preset.ending?.victory) && preset.ending.victory.length > 0 ? preset.ending.victory : base.ending.victory,
      retreat: Array.isArray(preset.ending?.retreat) && preset.ending.retreat.length > 0 ? preset.ending.retreat : base.ending.retreat,
      defeat: Array.isArray(preset.ending?.defeat) && preset.ending.defeat.length > 0 ? preset.ending.defeat : base.ending.defeat,
    },
  };
}

export async function adjudicateBattleScriptWithAI(sampler, { storyContext = null, battle = null } = {}) {
  const fallback = buildFallbackBattleScript({ storyContext, battle });
  const preset = storyContext?.presetScript;
  if (preset) {
    return {
      missionGoal: preset.missionGoal || fallback.missionGoal,
      opening: Array.isArray(preset.opening) && preset.opening.length > 0 ? preset.opening : fallback.opening,
      triggers: {
        foeHalfHp: preset.triggers?.foeHalfHp || fallback.triggers.foeHalfHp,
        heroDown: preset.triggers?.heroDown || fallback.triggers.heroDown,
        waveArrive: preset.triggers?.waveArrive || fallback.triggers.waveArrive,
      },
      propLine: preset.propLine || fallback.propLine,
      ending: {
        victory: Array.isArray(preset.ending?.victory) && preset.ending.victory.length > 0 ? preset.ending.victory : fallback.ending.victory,
        retreat: Array.isArray(preset.ending?.retreat) && preset.ending.retreat.length > 0 ? preset.ending.retreat : fallback.ending.retreat,
        defeat: Array.isArray(preset.ending?.defeat) && preset.ending.defeat.length > 0 ? preset.ending.defeat : fallback.ending.defeat,
      },
    };
  }
  if (typeof sampler !== "function") return fallback;

  const heroList = (battle?.units || [])
    .filter((u) => u.side === "hero" && !u.isNpcAlly)
    .map((h) => `${h.name}(${h.className})`)
    .join("、");
  const foeList = (battle?.units || [])
    .filter((u) => u.side === "foe")
    .map((f) => f.name)
    .slice(0, 4)
    .join("、");
  const objProp = (battle?.map?.props || []).find((p) => p.interactable || p.isObjective);
  const sitText = [
    storyContext?.placeName,
    storyContext?.storySummary?.nodeTitle,
    storyContext?.storySummary?.situation,
    ...(storyContext?.storySummary?.recentLogs || []),
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 480);

  const prompt = `你是 D&D 跑團劇本總監。請根據目前劇情與戰場配置，為即將開打的戰棋寫出簡短有力的角色宣言、敵人放話、戰中關鍵轉折台詞、互動物件台詞與戰後收尾台詞。
劇情背景：「${sitText || battle?.map?.name || "冒險戰場"}」
我方英雄：${heroList || "冒險者小隊"}
敵方單位：${foeList || "敵方伏兵"}
關鍵目標物件：${objProp?.name || storyContext?.blueprint?.objectiveName || "無"}
請只回傳嚴格 JSON（每句台詞 12～32 字，符合角色口吻）：
{
  "missionGoal": "18字內明確戰鬥目的",
  "opening": [
    {"speaker":"英雄名","side":"hero","line":"戰前宣言或交代目的"},
    {"speaker":"敵方名","side":"foe","line":"敵人開戰放話"}
  ],
  "triggers": {
    "foeHalfHp": {"speaker":"敵方名","side":"foe","line":"敵方頭目半血不甘放話"},
    "heroDown": {"speaker":"隊友名","side":"hero","line":"見隊友倒地的關切呼喊"},
    "waveArrive": {"speaker":"敵方名","side":"foe","line":"援軍登場時的喊話"}
  },
  "propLine": {"speaker":"英雄名","side":"hero","line":"成功互動/破壞關鍵物件後的台詞"},
  "ending": {
    "victory": [{"speaker":"英雄名","side":"hero","line":"勝利後收尾台詞"}],
    "retreat": [{"speaker":"英雄名","side":"hero","line":"撤退時台詞"}],
    "defeat": [{"speaker":"敵方名","side":"foe","line":"我方全滅時敵方台詞"}]
  }
}`;

  try {
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 4000));
    const res = await Promise.race([sampler(prompt, { modelTier: "quick" }), timeoutPromise]);
    const raw = String(res?.text || "");
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallback;
    const parsed = JSON.parse(match[0]);
    const cleanLine = (item, fb) =>
      item && typeof item.line === "string" && item.line.trim()
        ? { speaker: String(item.speaker || fb.speaker), side: item.side === "foe" ? "foe" : "hero", line: item.line.trim() }
        : fb;
    const cleanArr = (arr, fbArr) =>
      Array.isArray(arr) && arr.length > 0
        ? arr.slice(0, 3).map((x, idx) => cleanLine(x, fbArr[idx] || fbArr[0]))
        : fbArr;

    return {
      missionGoal: typeof parsed.missionGoal === "string" && parsed.missionGoal.trim() ? parsed.missionGoal.trim() : fallback.missionGoal,
      opening: cleanArr(parsed.opening, fallback.opening),
      triggers: {
        foeHalfHp: cleanLine(parsed.triggers?.foeHalfHp, fallback.triggers.foeHalfHp),
        heroDown: cleanLine(parsed.triggers?.heroDown, fallback.triggers.heroDown),
        waveArrive: cleanLine(parsed.triggers?.waveArrive, fallback.triggers.waveArrive),
      },
      propLine: cleanLine(parsed.propLine, fallback.propLine),
      ending: {
        victory: cleanArr(parsed.ending?.victory, fallback.ending.victory),
        retreat: cleanArr(parsed.ending?.retreat, fallback.ending.retreat),
        defeat: cleanArr(parsed.ending?.defeat, fallback.ending.defeat),
      },
    };
  } catch {
    return fallback;
  }
}

export async function adjudicateTacticalShoutWithAI(sampler, battle, actor, playerText) {
  if (typeof sampler !== "function" || !battle || !actor) return null;
  const foes = battle.units
    .filter((u) => u.side === "foe" && u.hp > 0)
    .map((f) => `${f.name}(HP ${f.hp}/${f.maxHp})`)
    .join("、");
  const prompt = `你是 D&D 5e 地下城主。戰場「${battle.map?.name || "戰場"}」第 ${battle.round} 輪，行動角色「${actor.name}（${actor.className}）」在戰鬥中喊話或嘗試創意行動：「${playerText}」。目前敵人：${foes || "無"}。請只回傳嚴格 JSON：{"success":true或false,"effectType":"frighten_foes|surrender_weak|inspire_party|ignite_area|knockdown_foe|none","narration":"40字內繁中戰場旁白"}`;
  try {
    const res = await sampler(prompt, { modelTier: "quick" });
    const raw = String(res?.text || "");
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    if (typeof parsed.success !== "boolean" || !parsed.narration) return null;
    return parsed;
  } catch {
    return null;
  }
}
