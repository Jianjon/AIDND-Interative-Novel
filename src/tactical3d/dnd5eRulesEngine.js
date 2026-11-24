import {
  S as SPELL_DB,
  M as MONSTER_DB,
  A as ITEM_DB,
  C as CLASS_DB,
  P as PRESET_HEROES,
  a as lookupSpell,
  f as lookupClass,
  g as getSignatureAbilities,
  m as scaleCharacter,
  n as CONSUMABLES_DB,
  r as lookupItem,
} from "../artifactDeps.js";
import { CONDITIONS } from "../data/rules/conditions.js";
import { getLootGuidelines } from "../data/rules/loot_tables.js";
import { rollChestLootD100 } from "./equipmentCatalog.js";
import { pickCombatBark } from "./combatBarkLines.js";
import { CREATURE_TOKENS_CATALOG } from "./creatureTokensCatalog.js";
import { TOKEN_FACING_MAP } from "./tokenFacingMap.js";
import {
  MAP_COLS,
  MAP_ROWS,
  inMapBounds,
  generateVoxelMap,
  refreshMapDerivedFlags,
  getSurfaceMoveCost,
  applyElementalSurfaceReaction,
} from "./voxelMapGenerator.js";

export { PRESET_HEROES, CONDITIONS };

export const CREATURE_SPRITE_MAP = {
  goblin: "/prototype-assets/lego-creatures-v1/goblin.png",
  goblin_archer: "/prototype-assets/lego-creatures-v1/goblin_scout.png",
  goblin_boss: "/prototype-assets/lego-creatures-v1/goblin_warchief.png",
  orc: "/prototype-assets/lego-creatures-v1/orc.png",
  orc_warlord: "/prototype-assets/lego-creatures-v1/armored_orc_warlord.png",
  hobgoblin: "/prototype-assets/lego-creatures-v1/hobgoblin.png",
  bugbear: "/prototype-assets/lego-creatures-v1/bugbear.png",
  gnoll: "/prototype-assets/lego-creatures-v1/gnoll.png",
  kobold: "/prototype-assets/lego-creatures-v1/kobold.png",
  skeleton: "/prototype-assets/lego-creatures-v1/skeleton.png",
  zombie: "/prototype-assets/lego-creatures-v1/zombie.png",
  ghoul: "/prototype-assets/lego-creatures-v1/ghoul.png",
  wight: "/prototype-assets/lego-creatures-v1/night_king_wight.png",
  wraith: "/prototype-assets/lego-creatures-v1/void_shadow_wraith.png",
  ghost: "/prototype-assets/lego-creatures-v1/ghost.png",
  banshee: "/prototype-assets/lego-creatures-v1/banshee_green_specter.png",
  mummy: "/prototype-assets/lego-creatures-v1/mummy_guardian.png",
  lich: "/prototype-assets/lego-creatures-v1/ancient_skeletal_lich.png",
  vampire_spawn: "/prototype-assets/lego-creatures-v1/crimson_wing_vampire.png",
  vampire_lord: "/prototype-assets/lego-creatures-v1/vampire_lord.png",
  cultist: "/prototype-assets/lego-creatures-v1/skull_mask_cultist.png",
  cult_fanatic: "/prototype-assets/lego-creatures-v1/crimson_cult_high_priest.png",
  acolyte: "/prototype-assets/lego-creatures-v1/academy_mage_apprentice.png",
  bandit: "/prototype-assets/lego-creatures-v1/bandit_raider.png",
  bandit_marksman: "/prototype-assets/lego-creatures-v1/bandit_marksman.png",
  bandit_captain: "/prototype-assets/lego-creatures-v1/pirate_captain_jack.png",
  wolf: "/prototype-assets/lego-creatures-v1/wolf_guard.png",
  dire_wolf: "/prototype-assets/lego-creatures-v1/dire_worg_mount.png",
  boar: "/prototype-assets/lego-creatures-v1/boar.png",
  brown_bear: "/prototype-assets/lego-creatures-v1/brown_bear.png",
  polar_bear: "/prototype-assets/lego-creatures-v1/polar_bear.png",
  giant_spider: "/prototype-assets/lego-creatures-v1/cellar_spider_queen.png",
  cellar_spider_queen: "/prototype-assets/lego-creatures-v1/cellar_spider_queen.png",
  ogre: "/prototype-assets/lego-creatures-v1/giant_green_ogre.png",
  troll: "/prototype-assets/lego-creatures-v1/giant_cave_troll.png",
  frost_giant: "/prototype-assets/lego-creatures-v1/frost_giant.png",
  owlbear: "/prototype-assets/lego-creatures-v1/owlbear.png",
  giant_rat: "/prototype-assets/lego-creatures-v1/giant_rat.png",
  snake: "/prototype-assets/lego-creatures-v1/snake.png",
  imp: "/prototype-assets/lego-creatures-v1/crimson_imp_gremlin.png",
  demon: "/prototype-assets/lego-creatures-v1/purple_wing_abyss_demon.png",
  balrog: "/prototype-assets/lego-creatures-v1/balrog_fire_demon.png",
  gargoyle: "/prototype-assets/lego-creatures-v1/gargoyle_stone.png",
  wyvern: "/prototype-assets/lego-creatures-v1/wyvern.png",
  young_red_dragon: "/prototype-assets/lego-creatures-v1/red_dragon.png",
  red_dragon_wyrmling: "/prototype-assets/lego-creatures-v1/red_wyrmling.png",
  black_dragon: "/prototype-assets/lego-creatures-v1/black_dragon.png",
  blue_dragon: "/prototype-assets/lego-creatures-v1/blue_dragon.png",
  mimic: "/prototype-assets/lego-creatures-v1/mimic.png",
  gelatinous_cube: "/prototype-assets/lego-creatures-v1/gelatinous_cube.png",
  fire_elemental: "/prototype-assets/lego-creatures-v1/fire_elemental.png",
  water_elemental: "/prototype-assets/lego-creatures-v1/water_elemental.png",
  frost_elemental: "/prototype-assets/lego-creatures-v1/frost_elemental.png",
  stone_golem: "/prototype-assets/lego-creatures-v1/stone_golem.png",
  harpy: "/prototype-assets/lego-creatures-v1/harpy_dark_matron.png",
  minotaur: "/prototype-assets/lego-creatures-v1/clockwork_minotaur.png",
  yeti: "/prototype-assets/lego-creatures-v1/yeti_abominable.png",
  treant: "/prototype-assets/lego-creatures-v1/ancient_treant.png",
  tiefling: "/prototype-assets/lego-token-fixes-v1/143-tiefling_advocate.png",
  assassin: "/prototype-assets/lego-token-fixes-v1/144-shadowblade_duelist.png",
};

const DMG_LABEL = {
  slashing: "揮砍",
  piercing: "穿刺",
  bludgeoning: "鈍擊",
  fire: "火焰",
  cold: "冷凍",
  lightning: "閃電",
  thunder: "雷鳴",
  radiant: "光耀",
  necrotic: "黯蝕",
  force: "力場",
  psychic: "心靈",
  acid: "強酸",
  poison: "毒素",
};

const TOKEN_BY_ID = new Map();
const TOKEN_BY_NAME = new Map();
for (const tk of CREATURE_TOKENS_CATALOG) {
  if (tk?.id && tk?.image) TOKEN_BY_ID.set(String(tk.id).toLowerCase(), tk.image);
  if (tk?.name && tk?.image) TOKEN_BY_NAME.set(String(tk.name).trim(), tk.image);
}

function inferNativeFacing(avatarUrl, side = "hero") {
  const raw = String(avatarUrl || "").split(/[?#]/)[0].trim();
  if (raw) {
    const norm = raw.startsWith("/") ? raw : `/${raw}`;
    if (TOKEN_FACING_MAP[norm]) return TOKEN_FACING_MAP[norm];
    if (TOKEN_FACING_MAP[raw]) return TOKEN_FACING_MAP[raw];
  }
  return side === "foe" ? "left" : "right";
}

export function normalizeTokenPath(raw) {
  if (typeof raw !== "string") return null;
  const s = raw.trim();
  if (!s) return null;
  if (s.startsWith("prototype-assets/")) return `/${s}`;
  if (s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://")) return s;
  return null;
}

const LEGACY_HUMANOID_AVATAR_POOLS = {
  martial: [
    "/prototype-assets/lego-character-avatars/frame-64.png",
    "/prototype-assets/lego-character-avatars/frame-68.png",
    "/prototype-assets/lego-character-avatars/frame-69.png",
    "/prototype-assets/lego-character-avatars/frame-71.png",
    "/prototype-assets/lego-character-avatars/frame-83.png",
    "/prototype-assets/lego-character-avatars/frame-85.png",
    "/prototype-assets/lego-character-avatars/frame-86.png",
    "/prototype-assets/lego-character-avatars/frame-101.png",
    "/prototype-assets/lego-character-avatars/frame-111.png",
    "/prototype-assets/lego-module-tokens-v1/module_northern_axe.png",
    "/prototype-assets/lego-module-tokens-v1/module_gnome_captain.png",
  ],
  stealth: [
    "/prototype-assets/lego-character-avatars/frame-70.png",
    "/prototype-assets/lego-character-avatars/frame-72.png",
    "/prototype-assets/lego-character-avatars/frame-73.png",
    "/prototype-assets/lego-character-avatars/frame-84.png",
    "/prototype-assets/lego-character-avatars/frame-87.png",
    "/prototype-assets/lego-character-avatars/frame-89.png",
    "/prototype-assets/lego-character-avatars/frame-104.png",
    "/prototype-assets/lego-character-avatars/frame-118.png",
    "/prototype-assets/lego-character-avatars/frame-120.png",
    "/prototype-assets/lego-module-tokens-v1/module_blind_monk.png",
    "/prototype-assets/lego-module-tokens-v1/module_burned_broker.png",
  ],
  caster: [
    "/prototype-assets/lego-character-avatars/frame-74.png",
    "/prototype-assets/lego-character-avatars/frame-75.png",
    "/prototype-assets/lego-character-avatars/frame-76.png",
    "/prototype-assets/lego-character-avatars/frame-88.png",
    "/prototype-assets/lego-character-avatars/frame-91.png",
    "/prototype-assets/lego-character-avatars/frame-93.png",
    "/prototype-assets/lego-character-avatars/frame-94.png",
    "/prototype-assets/lego-character-avatars/frame-96.png",
    "/prototype-assets/lego-character-avatars/frame-99.png",
    "/prototype-assets/lego-character-avatars/frame-106.png",
    "/prototype-assets/lego-character-avatars/frame-107.png",
    "/prototype-assets/lego-character-avatars/frame-108.png",
    "/prototype-assets/lego-character-avatars/frame-110.png",
    "/prototype-assets/lego-module-tokens-v1/module_cult_mage.png",
    "/prototype-assets/lego-module-tokens-v1/module_ice_priest.png",
    "/prototype-assets/lego-module-tokens-v1/module_derro_alchemist.png",
    "/prototype-assets/lego-module-tokens-v1/module_gnome_cleric.png",
    "/prototype-assets/lego-module-tokens-v1/module_priestess.png",
  ],
  npc: [
    "/prototype-assets/lego-character-avatars/frame-65.png",
    "/prototype-assets/lego-character-avatars/frame-66.png",
    "/prototype-assets/lego-character-avatars/frame-67.png",
    "/prototype-assets/lego-character-avatars/frame-77.png",
    "/prototype-assets/lego-character-avatars/frame-78.png",
    "/prototype-assets/lego-character-avatars/frame-79.png",
    "/prototype-assets/lego-character-avatars/frame-80.png",
    "/prototype-assets/lego-character-avatars/frame-92.png",
    "/prototype-assets/lego-character-avatars/frame-95.png",
    "/prototype-assets/lego-character-avatars/frame-97.png",
    "/prototype-assets/lego-character-avatars/frame-100.png",
    "/prototype-assets/lego-character-avatars/frame-102.png",
    "/prototype-assets/lego-character-avatars/frame-103.png",
    "/prototype-assets/lego-character-avatars/frame-109.png",
    "/prototype-assets/lego-module-tokens-v1/module_scribe.png",
    "/prototype-assets/lego-module-tokens-v1/module_innkeeper.png",
    "/prototype-assets/lego-module-tokens-v1/module_noblewoman.png",
    "/prototype-assets/lego-module-tokens-v1/module_herbalist.png",
    "/prototype-assets/lego-module-tokens-v1/module_tailor.png",
    "/prototype-assets/lego-module-tokens-v1/module_carpenter.png",
    "/prototype-assets/lego-module-tokens-v1/module_elf_sage.png",
    "/prototype-assets/lego-module-tokens-v1/module_elf_scholar.png",
    "/prototype-assets/lego-module-tokens-v1/module_dwarf_sage.png",
    "/prototype-assets/lego-module-tokens-v1/module_dwarf_miner.png",
    "/prototype-assets/lego-module-tokens-v1/module_halfling_scholar.png",
    "/prototype-assets/lego-module-tokens-v1/module_gnome_artificer.png",
    "/prototype-assets/lego-module-tokens-v1/module_dragonborn_elder.png",
    "/prototype-assets/lego-module-tokens-v1/module_wheelchair_sage.png",
    "/prototype-assets/lego-module-tokens-v1/module_jester.png",
    "/prototype-assets/lego-module-tokens-v1/module_young_scribe.png",
  ],
};

function pickLegacyHumanoidAvatar(poolKey, seedStr = "") {
  const pool = LEGACY_HUMANOID_AVATAR_POOLS[poolKey] || LEGACY_HUMANOID_AVATAR_POOLS.npc;
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

export function resolveMonsterSprite(monsterId, nameHint = "") {
  if (CREATURE_SPRITE_MAP[monsterId]) return CREATURE_SPRITE_MAP[monsterId];
  const idLower = String(monsterId || "").toLowerCase();
  if (TOKEN_BY_ID.has(idLower)) return TOKEN_BY_ID.get(idLower);
  const cleanName = String(nameHint || "").replace(/\s*#\d+.*$/, "").trim();
  if (cleanName && TOKEN_BY_NAME.has(cleanName)) return TOKEN_BY_NAME.get(cleanName);
  if (cleanName) {
    const partial = CREATURE_TOKENS_CATALOG.find(
      (tk) => tk.name && (cleanName.includes(tk.name) || tk.name.includes(cleanName))
    );
    if (partial) return partial.image;
  }
  const idTokens = idLower.split(/[^a-z0-9]+/).filter((w) => w.length >= 3);
  if (idTokens.length > 0) {
    const matched = CREATURE_TOKENS_CATALOG.find((tk) =>
      idTokens.every((tok) => tk.id.toLowerCase().includes(tok))
    );
    if (matched) return matched.image;
  }
  if (/tiamat/.test(idLower) || /提亞馬特/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_tiamat.png";
  if (/demogorgon/.test(idLower) || /狄摩高根/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_demogorgon.png";
  if (/purple_worm/.test(idLower) || /紫蟲/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_purple_worm.png";
  if (/green_dragon/.test(idLower) || /綠龍/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_green_dragon.png";
  if (/froghemoth/.test(idLower) || /巨蛙怪/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_froghemoth.png";
  if (/myconid/.test(idLower) || /蕈人/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_myconid.png";
  if (/nothic/.test(idLower) || /諾希克/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_nothic.png";
  if (/hollyphant/.test(idLower) || /聖象/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_hollyphant.png";
  if (/drow_priestess/.test(idLower) || /卓爾女祭司|卓爾祭司/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_drow_priestess.png";
  if (/sahuagin/.test(idLower) || /沙華魚人/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_reuse_sahuagin.png";
  if (/storm_giant/.test(idLower) || /風暴巨人/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_storm_giant.png";
  if (/gnoll/.test(idLower) || /豺狼人/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_gnoll_flail.png";
  if (/fire_beetle/.test(idLower) || /火甲蟲/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_fire_beetle.png";
  if (/white_stag/.test(idLower) || /白鹿/.test(cleanName)) return "/prototype-assets/lego-module-tokens-v1/module_white_stag.png";
  if (/dragon|wyrm/.test(idLower)) return "/prototype-assets/lego-creatures-v1/red_dragon.png";
  if (/wyvern/.test(idLower)) return "/prototype-assets/lego-creatures-v1/wyvern.png";
  if (/imp|quasit|gremlin/.test(idLower)) return "/prototype-assets/lego-creatures-v1/crimson_imp_gremlin.png";
  if (/demon|devil|fiend/.test(idLower)) return "/prototype-assets/lego-creatures-v1/purple_wing_abyss_demon.png";
  if (/vampire/.test(idLower)) return "/prototype-assets/lego-creatures-v1/crimson_wing_vampire.png";
  if (/frost_giant/.test(idLower)) return "/prototype-assets/lego-creatures-v1/frost_giant.png";
  if (/giant|ogre/.test(idLower)) return "/prototype-assets/lego-creatures-v1/giant_green_ogre.png";
  if (/troll/.test(idLower)) return "/prototype-assets/lego-creatures-v1/giant_cave_troll.png";
  if (/skeleton/.test(idLower)) return "/prototype-assets/lego-creatures-v1/skeleton.png";
  if (/zombie/.test(idLower)) return "/prototype-assets/lego-creatures-v1/zombie.png";
  if (/lich/.test(idLower)) return "/prototype-assets/lego-creatures-v1/ancient_skeletal_lich.png";
  if (/cult|warlock|necromancer|acolyte/.test(idLower) || /邪教|術士|死靈|祭司/.test(cleanName)) return pickLegacyHumanoidAvatar("caster", idLower + cleanName);
  if (/mage|wizard|sorcerer|witch|cleric|priest/.test(idLower) || /法師|巫師|牧師|學者/.test(cleanName)) return pickLegacyHumanoidAvatar("caster", idLower + cleanName);
  if (/assassin|rogue|spy|scout|ranger|archer/.test(idLower) || /刺客|盜賊|斥候|遊俠|弓/.test(cleanName)) return pickLegacyHumanoidAvatar("stealth", idLower + cleanName);
  if (/bandit|pirate|thug|guard|knight|soldier|warrior|mercenary|fighter|barbarian|champion/.test(idLower) || /強盜|海盜|衛兵|騎士|士兵|傭兵|戰士|狂戰/.test(cleanName)) return pickLegacyHumanoidAvatar("martial", idLower + cleanName);
  if (/orc/.test(idLower)) return "/prototype-assets/lego-creatures-v1/orc.png";
  if (/wolf|worg/.test(idLower)) return "/prototype-assets/lego-creatures-v1/wolf_guard.png";
  if (/spider/.test(idLower)) return "/prototype-assets/lego-creatures-v1/cellar_spider_queen.png";
  if (/npc|vip|merchant|noble|villager|citizen|bard|ally/.test(idLower) || /商|領袖|平民|貴族|護衛|友軍/.test(cleanName)) return pickLegacyHumanoidAvatar("npc", idLower + cleanName);
  return "/prototype-assets/lego-creatures-v1/goblin_sword_grunt.png";
}

export function abilityMod(score) {
  return Math.floor(((Number(score) || 10) - 10) / 2);
}

export function createBattleRng(seed = 101) {
  let state = (Number(seed) >>> 0) || 1;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function rollDie(rng, sides) {
  return Math.floor(rng() * sides) + 1;
}

export function parseDiceSpec(expr) {
  if (!expr) return { count: 1, sides: 4, flat: 0 };
  const s = String(expr).trim().replace(/\s+/g, "");
  const m = s.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (m) {
    return {
      count: Number(m[1]) || 1,
      sides: Number(m[2]) || 4,
      flat: Number(m[3]) || 0,
    };
  }
  const num = Number(s);
  if (Number.isFinite(num)) return { count: 0, sides: 0, flat: num };
  return { count: 1, sides: 4, flat: 0 };
}

export function rollDiceExpr(rng, expr, crit = false) {
  const { count, sides, flat } = parseDiceSpec(expr);
  const diceCount = crit ? count * 2 : count;
  let total = flat;
  const rolls = [];
  for (let i = 0; i < diceCount; i++) {
    const r = rollDie(rng, sides);
    rolls.push(r);
    total += r;
  }
  return { total: Math.max(0, total), rolls, sides, flat };
}

export function diceMinMax(expr, bonusFlat = 0) {
  const { count, sides, flat } = parseDiceSpec(expr);
  return {
    min: Math.max(0, count + flat + bonusFlat),
    max: Math.max(0, count * sides + flat + bonusFlat),
  };
}

function normalizeSlotsMap(rawSlots) {
  const out = {};
  if (Array.isArray(rawSlots)) {
    for (let lvl = 1; lvl < rawSlots.length; lvl++) {
      const n = Number(rawSlots[lvl]) || 0;
      if (n > 0) out[lvl] = n;
    }
    return out;
  }
  if (rawSlots && typeof rawSlots === "object") {
    for (const [k, v] of Object.entries(rawSlots)) {
      const lvl = Number(k);
      const n = Number(v) || 0;
      if (lvl >= 1 && n > 0) out[lvl] = n;
    }
  }
  return out;
}

function cleanItemText(raw) {
  return String(raw || "")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*[x×]\s*\d+/gi, "")
    .replace(/^.*·/, "")
    .trim();
}

function parseQuantity(raw) {
  const m = String(raw || "").match(/[x×]\s*(\d+)/i);
  return m ? Number(m[1]) || 1 : 1;
}

function resolveItemRecord(rawName) {
  const trimmed = String(rawName || "").trim();
  const candidates = [trimmed, cleanItemText(trimmed)];
  const paren = trimmed.match(/\(([^)]+)\)/);
  if (paren) candidates.push(paren[1].trim());

  for (const c of candidates) {
    if (!c) continue;
    const hit = lookupItem(c);
    if (hit?.item) return hit.item;
    if (ITEM_DB[c]) return ITEM_DB[c];
    const lower = c.toLowerCase();
    for (const it of Object.values(ITEM_DB)) {
      if (
        it.id === lower ||
        it.name === c ||
        it.nameEn?.toLowerCase() === lower ||
        (it.aliases || []).some((al) => al.toLowerCase() === lower || c.includes(al))
      ) {
        return it;
      }
    }
  }
  return null;
}

function resolveSpellRecord(rawName) {
  if (!rawName) return null;
  if (SPELL_DB[rawName]) {
    return { key: rawName, ...SPELL_DB[rawName] };
  }
  const found = lookupSpell(rawName);
  if (found && found.key && SPELL_DB[found.key]) {
    return { key: found.key, ...SPELL_DB[found.key] };
  }
  const lower = String(rawName).toLowerCase();
  for (const [k, sp] of Object.entries(SPELL_DB)) {
    if (k.toLowerCase() === lower || sp.name === rawName) {
      return { key: k, ...sp };
    }
  }
  return null;
}

function getHeroMods(stats) {
  return {
    str: abilityMod(stats?.str ?? 10),
    dex: abilityMod(stats?.dex ?? 10),
    con: abilityMod(stats?.con ?? 10),
    int: abilityMod(stats?.int ?? 10),
    wis: abilityMod(stats?.wis ?? 10),
    cha: abilityMod(stats?.cha ?? 10),
  };
}

export function hydrateHeroUnit(preset, level = 3, spawn = { x: 1, y: 5 }) {
  const scaled = scaleCharacter(preset, level);
  const classDef = lookupClass(scaled.class) || CLASS_DB[scaled.class] || {};
  const stats = { ...(scaled.baseStats || { str: 12, dex: 12, con: 12, int: 12, wis: 12, cha: 12 }) };
  const mods = getHeroMods(stats);
  const profBonus = Math.ceil((Number(level) || 1) / 4) + 1;

  const hitDie = classDef.hitDie || 8;
  const conSafe = Math.max(0, mods.con);
  const maxHp =
    scaled.maxHp !== undefined
      ? Math.max(14, scaled.maxHp)
      : Math.max(14, hitDie + 6 + conSafe + (level - 1) * (Math.floor(hitDie / 2) + 2 + conSafe));

  const isKineticist = /操念使|kineticist/i.test(scaled.class || "") || scaled.id === "preset_stella";
  const isPureDualMelee = scaled.id === "preset_rogue" || scaled.id === "preset_bladedancer" || scaled.id === "preset_axesinger";
  const equipNames = [
    ...(scaled.inventory?.equipment || []),
    ...(isKineticist || isPureDualMelee ? [] : classDef.startingKit?.equipment || []),
  ];
  const magicIds = new Set(scaled.magicItems || scaled.inventory?.magicItems || []);
  const armorPlus = magicIds.has("armor_plus_2") ? 2 : magicIds.has("armor_plus_1") ? 1 : 0;
  const weaponPlus = magicIds.has("weapon_plus_2") ? 2 : magicIds.has("weapon_plus_1") ? 1 : 0;

  let bestArmorAc = null;
  let hasShield = false;
  const weapons = [];
  const seenWeaponIds = new Set();

  for (const rawEq of equipNames) {
    const qty = parseQuantity(rawEq);
    const rec = resolveItemRecord(rawEq);
    if (rec) {
      if (rec.armorCategory === "shield" || /塔盾|圓盾|重盾|盾牌|shield/i.test(rawEq)) {
        hasShield = true;
      } else if (rec.baseAC !== undefined) {
        const capDex = rec.maxDexBonus !== null && rec.maxDexBonus !== undefined ? Math.min(mods.dex, rec.maxDexBonus) : mods.dex;
        const calcAc = rec.baseAC + capDex;
        if (bestArmorAc === null || calcAc > bestArmorAc) bestArmorAc = calcAc;
      } else if (rec.damageDice && !seenWeaponIds.has(rec.id)) {
        seenWeaponIds.add(rec.id);
        const isRanged = /ranged/i.test(rec.category || "");
        const useDex = isRanged || (rec.finesse && mods.dex > mods.str);
        const atkStat = useDex ? "dex" : "str";
        const atkMod = mods[atkStat] + profBonus + weaponPlus + 2;
        const dmgFlat = Math.max(0, mods[atkStat]) + weaponPlus;
        const customDisplayName = String(rawEq || "").replace(/\s*x\d+\s*$/i, "").split(/[（(]/)[0].trim();
        weapons.push({
          id: rec.id,
          name: customDisplayName || rec.name,
          isRanged,
          rangeCells: isRanged ? Math.max(4, Math.min(12, Math.floor((rec.rangeCells || 12) / 1.5))) : rec.reach ? 2 : 1,
          reach: !!rec.reach,
          light: !!rec.light,
          finesse: !!rec.finesse,
          damageDice: `${rec.damageDice}${dmgFlat >= 0 ? `+${dmgFlat}` : dmgFlat}`,
          damageType: rec.damageType || "slashing",
          hitBonus: atkMod,
          qty,
        });
      }
      continue;
    }

    // Fallback for custom/flavored equipment names in preset_characters.js
    const eqTxt = String(rawEq || "");
    if (/塔盾|圓盾|重盾|盾牌|shield/i.test(eqTxt)) {
      hasShield = true;
      continue;
    }
    if (/護胸|絲袍|札甲|輕甲|皮甲|法袍|大衣|風衣|胸甲/i.test(eqTxt) && bestArmorAc === null) {
      bestArmorAc = (/絲袍|札甲|輕甲|大衣/.test(eqTxt) ? 13 : 12) + Math.min(2, mods.dex);
      continue;
    }
    const cleanEqName = eqTxt.split(/[（(]/)[0].trim();
    const customId = `custom_${cleanEqName}`;
    if (seenWeaponIds.has(customId)) continue;
    let customSpec = null;
    if (/彈弓|sling|火念彈/i.test(eqTxt)) {
      customSpec = { isRanged: true, rangeCells: 6, finesse: true, dice: "1d6", type: "bludgeoning" };
    } else if (/袖槍|火槍|手槍|pistol|gun/i.test(eqTxt)) {
      customSpec = { isRanged: true, rangeCells: 6, finesse: true, dice: "1d10", type: "piercing" };
    } else if (/銀針|飛鏢|dart|needle/i.test(eqTxt)) {
      customSpec = { isRanged: true, rangeCells: 5, finesse: true, dice: "1d6", type: "piercing" };
    } else if (/試劑瓶|煉金藥箱|藥劑|炸彈|flask|bomb/i.test(eqTxt)) {
      customSpec = { isRanged: true, rangeCells: 6, finesse: true, dice: "1d8", type: "acid" };
    } else if (/弓|弩|bow|crossbow/i.test(eqTxt)) {
      customSpec = { isRanged: true, rangeCells: 8, finesse: true, dice: "1d8", type: "piercing" };
    } else if (/斬矛|fauchard|長矛|戟|halberd|glaive|pike/i.test(eqTxt)) {
      customSpec = { isRanged: false, rangeCells: 2, reach: true, dice: "1d10", type: "slashing" };
    } else if (/法杖|短杖|木杖|竹杖|權杖|圖騰|手杖|staff|rod|totem/i.test(eqTxt)) {
      const isFinesseStaff = /手杖/.test(eqTxt);
      customSpec = { isRanged: false, rangeCells: 1, finesse: isFinesseStaff, dice: "1d6", type: isFinesseStaff ? "piercing" : "bludgeoning" };
    } else if (/拳甲|cestus/i.test(eqTxt)) {
      customSpec = { isRanged: false, rangeCells: 1, finesse: true, light: true, dice: "1d6", type: "bludgeoning" };
    } else if (/平底鍋|pan/i.test(eqTxt)) {
      customSpec = { isRanged: false, rangeCells: 1, finesse: false, dice: "1d8", type: "bludgeoning" };
    } else if (/手術刀|細劍|杖劍|曲刃|唐劍|彎刀|幻刃|短劍|長劍|巨劍|短刃|毒刃|匕首|雙刀|雙劍|劍|sword|rapier|blade|sabre|scalpel|dagger/i.test(eqTxt)) {
      const isHeavy = /巨劍|雙手/.test(eqTxt);
      const isLightBlade = /短劍|匕首|短刃|毒刃|曲刃|彎刀|手術刀|雙刀|dagger|shortsword|scimitar|scalpel/i.test(eqTxt);
      const isDagger = /匕首|短刃|毒刃|手術刀|dagger|scalpel/i.test(eqTxt);
      customSpec = {
        isRanged: false,
        rangeCells: 1,
        finesse: !isHeavy,
        light: isLightBlade,
        dice: isHeavy ? "2d6" : isDagger ? "1d4" : isLightBlade ? "1d6" : "1d8",
        type: isDagger || /細劍|rapier/.test(eqTxt) ? "piercing" : "slashing",
      };
    } else if (/巨斧|戰斧|手斧|axe/i.test(eqTxt)) {
      const isThrown = /手斧|投擲/.test(eqTxt);
      customSpec = { isRanged: isThrown, rangeCells: isThrown ? 4 : 1, light: isThrown, dice: isThrown ? "1d6" : "1d12", type: "slashing" };
    } else if (/重錘|戰錘|連枷|flail|hammer|mace/i.test(eqTxt)) {
      customSpec = { isRanged: false, rangeCells: 1, dice: "1d8", type: "bludgeoning" };
    } else if (/念力抑制器|火印|護腕|石板/i.test(eqTxt)) {
      customSpec = { isRanged: true, rangeCells: 6, finesse: true, dice: "1d8", type: /火印/.test(eqTxt) ? "fire" : "force" };
    }
    if (customSpec) {
      seenWeaponIds.add(customId);
      const useDex = customSpec.isRanged || (customSpec.finesse && mods.dex > mods.str);
      const atkStat = useDex ? "dex" : "str";
      const atkMod = mods[atkStat] + profBonus + weaponPlus + 2;
      const dmgFlat = Math.max(0, mods[atkStat]) + weaponPlus;
      weapons.push({
        id: customId,
        name: cleanEqName || "隨身武器",
        isRanged: customSpec.isRanged,
        rangeCells: customSpec.rangeCells,
        reach: !!customSpec.reach,
        light: !!customSpec.light,
        finesse: !!customSpec.finesse,
        damageDice: `${customSpec.dice}${dmgFlat >= 0 ? `+${dmgFlat}` : dmgFlat}`,
        damageType: customSpec.type,
        hitBonus: atkMod,
        qty,
      });
    }
  }

  const featBlob = `${(scaled.feats || []).join(" ")} ${scaled.class || ""}`;
  const hasShieldBonusAc = /塔盾|盾牌專攻|石板結界|心劍身法|靈能護壁|天佑者/.test(featBlob) ? 1 : 0;

  let baseUnarmored = 10 + mods.dex;
  if (/武僧|monk/i.test(scaled.class || "")) baseUnarmored = 10 + mods.dex + mods.wis;
  if (/野蠻|血怒|barbarian/i.test(scaled.class || "")) baseUnarmored = 10 + mods.dex + mods.con;
  const ac = Math.max(baseUnarmored, bestArmorAc ?? 10) + (hasShield ? 2 : 0) + armorPlus + hasShieldBonusAc;

  if (weapons.length === 0) {
    const isCasterClass = /法師|術士|邪術|死靈|牧師|德魯伊|薩滿|先知|咒術|博學|混沌|召喚|秘術/i.test(scaled.class || "");
    weapons.push({
      id: isCasterClass ? "arcane_staff" : "unarmed",
      name: isCasterClass ? "奧術法杖" : /武僧|monk|拳師/i.test(scaled.class || "") ? "武術連打" : "隨身短刃",
      isRanged: false,
      rangeCells: 1,
      reach: false,
      light: true,
      finesse: true,
      damageDice: `${/武僧|monk|拳師/i.test(scaled.class || "") ? "1d6" : "1d6"}+${Math.max(mods.str, mods.dex)}`,
      damageType: isCasterClass || /武僧|monk|拳師/i.test(scaled.class || "") ? "bludgeoning" : "slashing",
      hitBonus: Math.max(mods.str, mods.dex) + profBonus + 1,
      qty: 1,
    });
  }

  let extraAttacks = 1;
  for (const lv of classDef.extraAttackLevels || []) {
    if (level >= lv) extraAttacks++;
  }
  if (level >= 3 && /戰士|聖武|野蠻|武僧|遊俠|拳師|劍客|武士|殺手|fighter|paladin|barbarian|monk|ranger|brawler|slayer/i.test(scaled.class || "")) {
    extraAttacks = Math.max(extraAttacks, 2);
  }
  // Kineticists channel infinite elemental blasts as their primary ranged attack instead of physical weapons
  if (isKineticist && !weapons.some((w) => /念擊|電擊|blast/i.test(w.name))) {
    const isAir = /氣念|電擊|拉姆|stella|lum/i.test(`${scaled.id || ""} ${scaled.class || ""} ${(scaled.spells || []).join(" ")}`);
    const isFire = /火念|燼司|fire/i.test(`${scaled.id || ""} ${scaled.class || ""}`);
    const kinMod = Math.max(mods.con, mods.dex, mods.cha);
    weapons.unshift({
      id: isAir ? "kinetic_electric_blast" : isFire ? "kinetic_fire_blast" : "kinetic_blast",
      name: isAir ? "電擊衝擊" : isFire ? "烈焰念擊" : "念力衝擊",
      isRanged: true,
      rangeCells: 7,
      reach: false,
      light: false,
      finesse: true,
      damageDice: `${level >= 5 ? "2d8" : "1d10"}+${Math.max(1, kinMod)}`,
      damageType: isAir ? "lightning" : isFire ? "fire" : "force",
      hitBonus: kinMod + profBonus + 2,
      qty: 99,
    });
  }

  // Alchemists & investigators / field medics carry throwable alchemical flasks / bombs
  if (/鍊金|alchemist/i.test(scaled.class || "") && !weapons.some((w) => /炸彈|試劑/.test(w.name))) {
    weapons.unshift({
      id: "alchemist_bomb_throw",
      name: "科研爆破彈",
      isRanged: true,
      isBomb: true,
      rangeCells: 6,
      reach: false,
      light: false,
      finesse: true,
      damageDice: `2d6+${Math.max(mods.int, mods.dex)}`,
      damageType: "fire",
      hitBonus: Math.max(mods.int, mods.dex) + profBonus + 2,
      qty: 99,
    });
  } else if ((scaled.id === "preset_investigator" || /戰地醫師|調查員/.test(scaled.class || "")) && !weapons.some((w) => w.isRanged)) {
    weapons.push({
      id: "alchemist_vial_throw",
      name: "投擲強酸藥劑",
      isRanged: true,
      rangeCells: 5,
      reach: false,
      light: true,
      finesse: true,
      damageDice: `1d8+${Math.max(mods.int, mods.dex)}`,
      damageType: "acid",
      hitBonus: Math.max(mods.int, mods.dex) + profBonus + 2,
      qty: 99,
    });
  }

  const isHybridDual =
    scaled.id === "preset_investigator" ||
    scaled.id === "preset_isabella" ||
    scaled.id === "preset_deathknight" ||
    scaled.id === "preset_qiphysician" ||
    scaled.id === "preset_fieldmedic" ||
    scaled.id === "preset_scout" ||
    /海盜|審判|調查|戰地醫師|氣脈醫者/i.test(scaled.class || "");
  const isDualWielder =
    weapons.some((w) => !w.isRanged && (w.qty >= 2 || /雙/.test(w.name))) ||
    weapons.filter((w) => !w.isRanged && w.light).length >= 2 ||
    /雙持|雙刃|雙刀|雙斧|雙劍|劍刃舞者|戰鬥祭師/i.test(`${scaled.class || ""} ${(scaled.feats || []).join(" ")}`) ||
    scaled.id === "preset_rogue" ||
    scaled.id === "preset_bladedancer" ||
    scaled.id === "preset_axesinger" ||
    scaled.id === "preset_isabella" ||
    scaled.id === "preset_liefeng";

  const preferMelee =
    !isHybridDual &&
    (isDualWielder ||
      /戰士|聖武|神諭|野蠻|血怒|武僧|騎士|劍客|拳師|骸骨|殺手|武士|魔劍|血獵|幻刃|戰術大師|fighter|paladin|omdura|barbarian|monk|knight|champion|bloodhunter|brawler|slayer/i.test(
        scaled.class || ""
      ));
  const preferRanged =
    !isHybridDual &&
    /遊俠|遊蕩|弓手|神射手|槍手|火槍|幸運|鍊金|操念|術士|邪術|ranger|rogue|archer|alchemist|kineticist|sorcerer|warlock/i.test(
      scaled.class || ""
    );
  const meleeWpns = weapons.filter((w) => !w.isRanged);
  const rangedWpns = weapons.filter((w) => w.isRanged);
  let specializedWeapons = [...weapons];
  if (preferMelee && meleeWpns.length > 0) specializedWeapons = meleeWpns;
  else if (preferRanged && rangedWpns.length > 0) specializedWeapons = rangedWpns;
  specializedWeapons.sort((a, b) => (b.hitBonus || 0) - (a.hitBonus || 0));
  weapons.length = 0;
  weapons.push(...specializedWeapons);

  // Any hero carrying a shield can also choose Shield Bash (盾擊)
  if (hasShield && !weapons.some((w) => w.isShieldBash)) {
    const bashFlat = Math.max(1, mods.str);
    weapons.push({
      id: "shield_bash",
      name: "盾擊",
      isRanged: false,
      isShieldBash: true,
      rangeCells: 1,
      reach: false,
      light: false,
      finesse: false,
      damageDice: `1d4+${bashFlat}`,
      damageType: "bludgeoning",
      hitBonus: mods.str + profBonus + 1,
      qty: 1,
    });
  }

  const rawSpells = [...new Set([...(scaled.spells || [])])];
  const spells = [];
  for (const spName of rawSpells) {
    const rec = resolveSpellRecord(spName);
    if (rec && rec.mechanics) {
      spells.push({
        key: rec.key,
        name: rec.name || rec.key,
        level: rec.level || 0,
        duration: rec.duration || "Instant",
        concentration: /concentration|專注/i.test(rec.duration || ""),
        effect: rec.effect || "",
        ...rec.mechanics,
      });
    }
  }

  // Ensure casters keep iconic tactical combat spells if missing from preset string
  if (classDef.casterType === "full" && !spells.some((s) => s.key === "Fire Bolt" || s.key === "Sacred Flame" || s.key === "Eldritch Blast")) {
    const cantrip = classDef.spellcastingAbility === "wis" ? resolveSpellRecord("Sacred Flame") : resolveSpellRecord("Fire Bolt");
    if (cantrip) {
      spells.unshift({ key: cantrip.key, name: cantrip.name, level: 0, duration: cantrip.duration, concentration: false, effect: cantrip.effect, ...cantrip.mechanics });
    }
  }

  const maxSlots = normalizeSlotsMap(scaled.slots);
  const slots = { ...maxSlots };

  const castAbility = classDef.spellcastingAbility || (mods.int >= mods.wis ? "int" : "wis");
  const spellAtkBonus = profBonus + mods[castAbility] + 2;
  const spellSaveDc = 8 + profBonus + mods[castAbility] + 2;

  const signatureAbilities = (getSignatureAbilities(scaled.class, level) || []).map((ab) => ({
    ...ab,
    usesLeft: ab.recharge === "turn" ? 99 : ab.mechanics?.healPool ? 1 : ab.resourceId === "ki" ? level : 1,
  }));

  // Custom beyond-D&D active abilities derived from character feats
  if (/陷阱大師/i.test(featBlob) && !signatureAbilities.some((a) => a.id === "trap_master")) {
    signatureAbilities.push({
      id: "trap_master",
      name: "🪤 捕獸夾陷阱",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "消耗附贈動作對 3 格內敵人佈置彈簧捕獸夾，造成 1d8 穿刺並束縛 1 輪",
    });
  }
  if (/研判|研究目標|契約漏洞/i.test(featBlob) && !signatureAbilities.some((a) => a.id === "studied_target")) {
    signatureAbilities.push({
      id: "studied_target",
      name: "🔍 弱點研判",
      actionCost: "bonus_action",
      usesLeft: 3,
      desc: "消耗附贈動作鎖定敵人破綻，本回合攻擊命中 +2 且額外造成 +1d6 精準傷害",
    });
  }
  if (/生命鏈接|引導正能量|安魂潮音/i.test(featBlob) && !signatureAbilities.some((a) => a.id === "life_channel")) {
    signatureAbilities.push({
      id: "life_channel",
      name: "✨ 生命共鳴",
      actionCost: "action",
      usesLeft: 2,
      desc: "消耗主動作釋放聖光／潮音共鳴，為 3 格內所有友方回復 1d8+3 HP",
    });
  }
  if (/奈米過載|劍氣|念力衝擊|心刃打擊|遠程火念彈|焚罪火印|血儀式/i.test(featBlob) && !signatureAbilities.some((a) => a.id === "arcane_burst")) {
    signatureAbilities.push({
      id: "arcane_burst",
      name: "⚡ 奧義爆發",
      actionCost: "action",
      usesLeft: 2,
      desc: "消耗主動作釋放角色專屬超凡奧義，對 4 格內敵人造成 2d8+等級 爆發傷害",
    });
  }
  if (/劍靈附身|魔劍護主/i.test(featBlob) || scaled.id === "preset_eldritchknight") {
    signatureAbilities.push({
      id: "kensei_flurry",
      name: "⚔️ 劍聖連斬",
      actionCost: "action",
      usesLeft: 2,
      desc: "劍靈附身連斬相鄰敵人 2 次，每次附帶 +1d4 雷鳴傷害",
    });
  }
  if (/戰吼治癒/i.test(featBlob) || scaled.id === "preset_axesinger") {
    signatureAbilities.push({
      id: "warcry_heal",
      name: "📣 戰吼治癒",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "消耗附贈動作發出榮譽戰吼，為 3 格內全體友軍回復 1d6+3 HP 並獲得祝福",
    });
  }
  if (/血之龍息/i.test(featBlob) || scaled.id === "preset_fenela") {
    signatureAbilities.push({
      id: "blood_breath",
      name: "🩸 血之龍息",
      actionCost: "action",
      usesLeft: 2,
      desc: "噴射血紅龍息對 3 格內所有敵人造成 3d6 黯蝕傷害，並吸取一半傷害為自身回血",
    });
  }
  if (scaled.id === "preset_assassin" || /致命打擊/i.test(featBlob)) {
    signatureAbilities.push({
      id: "fatal_verdict",
      name: "⚖️ 因果處決",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "消耗附贈動作鎖定目標死期，本回合下次攻擊必具優勢且 17–20 暴擊",
    });
  }
  if (scaled.id === "preset_alchemist" || /科研炸彈/i.test(featBlob)) {
    signatureAbilities.push({
      id: "alchemist_bomb",
      name: "💣 混亂科研炸彈",
      actionCost: "action",
      usesLeft: 3,
      desc: "投擲高爆煉金炸彈，對 6 格內目標與周圍 1 格敵人造成 2d8+3 火焰傷害",
    });
  }
  if (/戰場急救|戰地煉金|針灸封穴/i.test(featBlob) || scaled.id === "preset_fieldmedic" || scaled.id === "preset_qiphysician") {
    signatureAbilities.push({
      id: "field_triage",
      name: "🩺 戰地脈衝急救",
      actionCost: "bonus_action",
      usesLeft: 3,
      desc: "消耗附贈動作為 4 格內最傷友軍回復 1d8+4 HP 並解除異常狀態",
    });
  }
  if (/戰術大師|萬博學識|領導力/i.test(featBlob) || scaled.id === "preset_weaponmaster" || scaled.id === "preset_aldous") {
    signatureAbilities.push({
      id: "tactical_command",
      name: "🚩 戰術指揮光環",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "消耗附贈動作號令全隊，4 格內所有友軍獲得祝福（命中+1d4）與極速+2格移動",
    });
  }
  if (/薩滿|咒術|命運宗派|能力掠奪/i.test(featBlob) || scaled.id === "preset_shaman" || scaled.id === "preset_witch" || scaled.id === "preset_morrina") {
    signatureAbilities.push({
      id: "hex_curse",
      name: "🧿 厄運詛咒",
      actionCost: "bonus_action",
      usesLeft: 3,
      desc: "消耗附贈動作對 5 格內敵人降下詛咒，使其暈眩威懾並受到 1d6 黯蝕傷",
    });
  }
  if (/吟遊|bard/i.test(scaled.class || "")) {
    signatureAbilities.push({
      id: "bardic_inspire",
      name: "🎵 詩人激勵",
      actionCost: "bonus_action",
      usesLeft: 3,
      desc: "消耗附贈動作激勵 4 格內所有友軍獲得祝福（+1d4 命中）與 +2 臨時士氣回血",
    });
  }
  if (/連鎖電弧|超載導引/i.test(featBlob) || scaled.id === "preset_stella") {
    signatureAbilities.push({
      id: "chain_lightning_arc",
      name: "⚡ 連鎖電弧",
      actionCost: "action",
      usesLeft: 2,
      desc: "釋放高壓電弧彈跳至多 3 名 6 格內敵人，造成 1d8+3 閃電傷害",
    });
  }
  if (/混沌野魔法|天真無邪/i.test(featBlob) || scaled.id === "preset_pipi") {
    signatureAbilities.push({
      id: "wild_magic_surge",
      name: "🎲 混沌野魔法湧動",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "引發混沌魔潮：隨機治癒自身 1d6+2 HP 並對 5 格內敵人射出奧術飛彈",
    });
  }
  if (/石板結界|遺物迴響|法器護盾/i.test(featBlob) || scaled.id === "preset_earth_carver") {
    signatureAbilities.push({
      id: "earth_ward",
      name: "🪨 石板結界護盾",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "喚起岩晶石板護盾：獲得 +6 臨時護盾與祝福，並震傷相鄰敵人",
    });
  }
  if (/騎士挑戰|保鑣|守護者/i.test(featBlob)) {
    signatureAbilities.push({
      id: "knight_challenge",
      name: "🛡️ 騎士挑戰",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "挑戰 4 格內敵人並舉盾護衛，自身獲得祝福與 AC+2 狀態",
    });
  }
  if (/時空凍結|時間感知/i.test(featBlob) || scaled.id === "preset_chronomancer") {
    signatureAbilities.push({
      id: "time_freeze",
      name: "⏳ 時空凝滯",
      actionCost: "bonus_action",
      usesLeft: 1,
      desc: "操縱時間流速：立即獲得額外 1 個主動作與 +2 格移動力",
    });
  }
  if (/法術擊打|Spellstrike/i.test(featBlob) || scaled.id === "preset_elfmagus") {
    signatureAbilities.push({
      id: "spellstrike",
      name: "✨ 奧術劍擊",
      actionCost: "action",
      usesLeft: 2,
      desc: "將奧術灌注劍刃斬擊相鄰敵人，造成武器傷害並附加 2d6 力場爆破",
    });
  }
  if (/暗影步|無影步|暗影行走/i.test(featBlob)) {
    signatureAbilities.push({
      id: "shadow_step",
      name: "🌑 暗影瞬步",
      actionCost: "bonus_action",
      usesLeft: 2,
      desc: "化為暗影疾行 +3 格（免藉機攻擊），且本回合下次攻擊取優勢",
    });
  }

  const potions = [];
  for (const rawCons of scaled.inventory?.consumables || []) {
    const clean = cleanItemText(rawCons);
    const qty = parseQuantity(rawCons);
    const rec = resolveItemRecord(clean);
    if (rec && CONSUMABLES_DB[rec.id]) {
      potions.push({ id: rec.id, name: rec.name, qty, effect: rec.effect });
    } else if (/治療藥水/.test(clean)) {
      potions.push({ id: "potion_healing", name: clean, qty, effect: { type: "heal", dice: "2d4+2" } });
    }
  }
  if (potions.length === 0) {
    potions.push({ id: "potion_healing", name: "治療藥水", qty: 2, effect: { type: "heal", dice: "2d4+2" } });
  }

  const isRogue = /遊蕩|盜賊|刺客|assassin/i.test(scaled.class || "");
  const isMonk = /武僧|monk/i.test(scaled.class || "");
  const isPaladin = /聖武|神諭|paladin|omdura/i.test(scaled.class || "");
  const isBarbarian = /野蠻|血怒|barbarian/i.test(scaled.class || "");
  const isFighter = /戰士|魔劍|fighter/i.test(scaled.class || "");
  const isRanger = /遊俠|獵人|ranger|hunter/i.test(scaled.class || "");
  const isBard = /吟遊|bard/i.test(scaled.class || "");
  const isLifeSteal = /生命汲取|血族領主/i.test(featBlob) || scaled.id === "preset_fenela";
  const isPoisonMaster = /毒藥精通|因果毒刃/i.test(featBlob) || scaled.id === "preset_assassin";
  const isLongShot = /長距離射手|長臂天賦/i.test(featBlob) || scaled.id === "preset_hunter";
  const isDualAxe = /戰鬥祭師/i.test(scaled.class || "") || scaled.id === "preset_axesinger";
  const isSwordSpirit = /劍靈護主|本能戰鬥/i.test(featBlob) || scaled.id === "preset_eldritchknight";
  const hasAlert = (scaled.feats || []).some((ft) => /警覺|Alert/i.test(ft)) || isSwordSpirit;
  const visProfile = resolveUnitVisualProfile({ race: scaled.race, name: scaled.name, footprint: 1 });

  const passives = [];
  if (isRogue) passives.push(`偷襲(+${Math.ceil(level / 2) + (scaled.id === "preset_assassin" ? 1 : 0)}d6)`);
  if (isMonk) passives.push("鶴形拳(AC+2)");
  if (isPaladin) passives.push("守護靈光(2格豁免+2)");
  if (isBard) passives.push("戰歌光環(3格Buff)");
  if (isFighter || isPaladin || isBarbarian) passives.push("猛力攻擊(-3/+6)");
  if (isRanger || isRogue) passives.push("精密射擊(-3/+6)");
  if (isFighter || isMonk || isPaladin || isSwordSpirit) passives.push("破綻反擊(反應)");
  if (isLifeSteal) passives.push("生命汲取(吸血50%)");
  if (isPoisonMaster) passives.push("因果劇毒(+1d6毒)");
  if (isLongShot) passives.push("超視距狙擊(射程+4/命中+2)");
  if (isDualAxe) passives.push("雙斧狂歌(副手連擊)");
  else if (isDualWielder) passives.push("雙持連擊(副手附贈)");
  if (isSwordSpirit) passives.push("劍靈護主(AC+2)");

  const featResistances = [];
  if (/元素抗性\s*\(火焰\)|煉獄抗性/i.test(featBlob)) featResistances.push("fire");
  if (/天界抗性/i.test(featBlob)) featResistances.push("radiant", "necrotic");
  if (/毒素免疫/i.test(featBlob)) featResistances.push("poison");
  if (featResistances.length > 0) passives.push(`抗性(${featResistances.map((r) => DMG_LABEL[r] || r).join("/")})`);

  const featHpBonus = /矮人堅韌|岩石堅韌|健壯/i.test(featBlob) ? 4 : 0;
  const featAcBonus = /重甲精通|塔盾擅長|法器護盾|鶴翼招架/i.test(featBlob) ? 1 : 0;
  const featSpeedBonus = (/無影步|旋風步|逃跑大師|開路先鋒/i.test(featBlob) ? 1 : 0) + (Number(scaled.gearBonuses?.speedBonus) || 0);
  const featInitBonus = /狡黠先攻|時間感知|野性直覺/i.test(featBlob) ? 3 : 0;
  const featHitBonus = /巨武器大師|精準射擊|精確打擊|戰鬥風格|全武器精通/i.test(featBlob) ? 1 : 0;
  if (featHpBonus) passives.push(`堅韌(+${featHpBonus}HP)`);
  if (featAcBonus) passives.push(`護甲專精(AC+${featAcBonus})`);
  if (featSpeedBonus) passives.push(`疾行(+${featSpeedBonus}格)`);
  if (featInitBonus) passives.push(`先攻(+${featInitBonus})`);
  if (featHitBonus) passives.push(`武器專精(命中+${featHitBonus})`);

  const gearB = scaled.gearBonuses || {};
  const gearAtk = Number(gearB.attackBonus) || 0;
  const gearDmg = Number(gearB.damageBonus) || 0;
  const gearAc = Number(gearB.acBonus) || 0;
  const gearSpd = Number(gearB.speedBonus) || 0;

  if (featHitBonus > 0 || gearAtk > 0 || gearDmg > 0) {
    for (const w of weapons) {
      w.hitBonus = (w.hitBonus || 0) + featHitBonus + gearAtk;
      if (gearDmg > 0 && w.damageDice) {
        w.damageDice = w.damageDice.replace(/([+-]\d+)?$/, (m) => {
          const cur = m ? parseInt(m, 10) : 0;
          const next = cur + gearDmg;
          return next >= 0 ? `+${next}` : `${next}`;
        });
      }
    }
  }
  if (scaled.equippedWeaponItem) {
    const wItem = scaled.equippedWeaponItem;
    const spec = wItem.weaponSpec || {};
    const isRanged = Boolean(spec.isRanged);
    const useDex = isRanged || (spec.finesse && mods.dex > mods.str);
    const atkStat = useDex ? "dex" : "str";
    const wHit = mods[atkStat] + profBonus + weaponPlus + featHitBonus + gearAtk + 2;
    const wDmgFlat = Math.max(0, mods[atkStat]) + weaponPlus + gearDmg;
    const baseDice = spec.damageDice || "1d8";
    const wId = wItem.id || `gear_${wItem.name}`;
    if (!weapons.some((w) => w.id === wId)) {
      weapons.unshift({
        id: wId,
        name: wItem.weaponName || wItem.name,
        isRanged,
        rangeCells: spec.rangeCells || (isRanged ? 6 : 1),
        reach: Boolean(spec.reach),
        light: Boolean(spec.light),
        finesse: Boolean(spec.finesse),
        damageDice: `${baseDice}${wDmgFlat >= 0 ? `+${wDmgFlat}` : wDmgFlat}`,
        damageType: spec.damageType || "slashing",
        hitBonus: wHit,
        qty: 1,
      });
    }
  } else if (scaled.equippedWeaponName && weapons[0] && !weapons[0].isShieldBash) {
    weapons[0].name = scaled.equippedWeaponName;
  }

  const hasEvasion50 = /50%\s*閃避|幻影身法|路人甲的直覺/i.test(featBlob);
  const regenPerTurn = /骸骨重組/i.test(featBlob) ? 2 : 0;
  const flatDr = /堅韌體魄|吸收\s*2\s*點傷害/i.test(featBlob) ? 2 : /石板結界|鋼鐵構造/i.test(featBlob) ? 1 : 0;
  const counter50 = /野蠻反擊|鶴反藉機/i.test(featBlob);
  const critThreshold = /平底鍋專精|弱點研判重擊|致命打擊/i.test(featBlob) || scaled.id === "preset_assassin" ? 18 : 20;
  const luckyReroll = /天選之運|幸運連鎖|天佑者/i.test(featBlob);
  const wildMagic = /混沌野魔法|升環暴走/i.test(featBlob);
  const stormRage = /風暴血怒|狂暴施法/i.test(featBlob);
  const finalAc = ac + (isSwordSpirit ? 2 : 0) + featAcBonus + gearAc;
  const finalMaxHp = maxHp + (/獸人韌性/i.test(featBlob) ? 6 : 0) + featHpBonus;
  if (isLongShot) {
    for (const w of weapons) {
      if (w.isRanged) {
        w.rangeCells += 4;
        w.hitBonus += 2;
      }
    }
  }

  if (hasEvasion50) passives.push("常駐50%閃避");
  if (regenPerTurn > 0) passives.push(`再生(+${regenPerTurn}/輪)`);
  if (flatDr > 0) passives.push(`減傷(-${flatDr})`);
  if (counter50) passives.push("受擊反擊");
  if (critThreshold < 20) passives.push(`暴擊(${critThreshold}-20)`);
  if (luckyReroll) passives.push("幸運重擲");
  if (wildMagic) passives.push("混沌野魔法");
  if (stormRage) passives.push("風暴雷怒");

  const raceText = `${scaled.race || ""} ${(scaled.feats || []).join(" ")}`.toLowerCase();
  const hasDarkvision = /精靈|卓爾|矮人|侏儒|提夫林|半獸人|吸血鬼|元素裔|elf|drow|dwarf|gnome|tiefling|orc|vampire|genasi|darkvision|黑暗視覺/.test(
    raceText
  );

  // Level-scaled Skill Table (proficiency + expertise)
  const rawSkillTxt = (Array.isArray(preset?.skills) ? preset.skills : []).join(" ").toLowerCase();
  const clsLower = String(scaled.class || "").toLowerCase();
  const skillProfs = [];
  if (isFighter || isBarbarian || isPaladin || isRanger || isMonk || /運動|athletics/.test(rawSkillTxt)) skillProfs.push("athletics");
  if (isRogue || isMonk || isBard || isRanger || /特技|體操|acrobatics/.test(rawSkillTxt)) skillProfs.push("acrobatics");
  if (isRogue || isRanger || /隱匿|stealth/.test(rawSkillTxt)) skillProfs.push("stealth");
  if (isRogue || isBard || /巧手|盜賊|sleight/.test(rawSkillTxt)) skillProfs.push("sleight");
  if (/法師|術士|邪術師|調查員|念襲|wizard|sorcerer|warlock|investigator|psychic|kinetic/.test(clsLower) || /奧秘|arcana/.test(rawSkillTxt)) skillProfs.push("arcana");
  if (/牧師|神官|聖武|cleric|paladin|oracle/.test(clsLower) || /宗教|religion/.test(rawSkillTxt)) skillProfs.push("religion");
  if (isRanger || isRogue || isFighter || /察覺|perception/.test(rawSkillTxt)) skillProfs.push("perception");
  if (isBard || isPaladin || isFighter || /說服|威嚇|交際|persuasion|intimidation/.test(rawSkillTxt)) skillProfs.push("persuasion");

  const skillExpertise = new Set();
  if (isRogue) {
    skillExpertise.add("acrobatics");
    skillExpertise.add("stealth");
    skillExpertise.add("sleight");
  }
  if (isBard) {
    skillExpertise.add("acrobatics");
    skillExpertise.add("persuasion");
  }
  if (isBarbarian || isFighter) {
    if (level >= 3) skillExpertise.add("athletics");
  }

  const calcSkill = (key, statKey) => {
    const hasProf = skillProfs.includes(key);
    const mult = skillExpertise.has(key) ? 2 : hasProf ? 1 : 0;
    return (mods[statKey] ?? 0) + mult * profBonus;
  };
  const skillBonuses = {
    athletics: calcSkill("athletics", "str"),
    acrobatics: calcSkill("acrobatics", "dex"),
    stealth: calcSkill("stealth", "dex"),
    sleight: calcSkill("sleight", "dex"),
    arcana: calcSkill("arcana", "int"),
    religion: calcSkill("religion", "wis"),
    perception: calcSkill("perception", "wis"),
    persuasion: calcSkill("persuasion", "cha"),
  };

  return {
    id: scaled.id,
    name: scaled.name.split(/[（(]/)[0].trim(),
    fullName: scaled.name,
    presetId: preset?.id || scaled?.id || null,
    race: scaled.race || "",
    hasDarkvision,
    skillProfs,
    skillBonuses,
    hasEvasion50,
    regenPerTurn,
    flatDr,
    counter50,
    critThreshold,
    luckyReroll,
    wildMagic,
    stormRage,
    className: scaled.class,
    sizeCategory: visProfile.sizeCategory,
    heightScale: visProfile.heightScale,
    level,
    side: "hero",
    avatar: scaled.avatar || "/prototype-assets/lego-token-fixes-v1/68-fighter.png",
    nativeFacing: inferNativeFacing(scaled.avatar, "hero"),
    facingTarget: null,
    x: spawn.x,
    y: spawn.y,
    footprint: 1,
    hp: finalMaxHp,
    maxHp: finalMaxHp,
    ac: finalAc,
    speedCells: (classDef.speedCells || 6) + featSpeedBonus,
    initiativeBonus: featInitBonus,
    resistances: [...new Set(featResistances)],
    stats,
    mods,
    profBonus,
    saves: classDef.saves || [],
    weapons,
    extraAttacks,
    spells,
    slots,
    maxSlots,
    spellAtkBonus,
    spellSaveDc,
    abilities: signatureAbilities,
    potions,
    antidotes: 1,
    sneakDice: isRogue ? `${Math.ceil(level / 2) + (scaled.id === "preset_assassin" ? 1 : 0)}d6` : null,
    isMonk,
    isPaladin,
    isBarbarian,
    isFighter,
    isRanger,
    isBard,
    isLifeSteal,
    isPoisonMaster,
    isDualAxe,
    isDualWielder,
    isSwordSpirit,
    isCleric: /牧師|神官|德魯伊|cleric|druid/i.test(scaled.class || ""),
    passives,
    stances: {
      powerAttack: false,
      craneStyle: isMonk,
      sharpshooter: false,
    },
    activeSong: isBard ? "courage" : null,
    flies: false,
    initiativeBonus: mods.dex + (hasAlert ? 5 : 0),
    damageResistances: [],
    damageImmunities: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    conditions: {},
    concentration: null,
    deathSaves: { success: 0, fail: 0, stabilized: false },
    dead: false,
    autoReactions: {
      opportunityAttack: true,
      shield: spells.some((s) => s.key === "Shield"),
      riposte: isFighter || isMonk || isPaladin || counter50,
    },
    turn: null,
    reactionLeft: 1,
  };
}

function resolveUnitVisualProfile(entity = {}) {
  const explicit = String(entity.size || "").toLowerCase();
  if (explicit === "tiny") return { sizeCategory: "tiny", heightScale: 0.55 };
  if (explicit === "large" || entity.footprint === 2) return { sizeCategory: "large", heightScale: 1.62 };
  if (explicit === "huge" || explicit === "gargantuan") return { sizeCategory: explicit, heightScale: 1.85 };
  if (explicit === "small") return { sizeCategory: "small", heightScale: 0.78 };
  const text = `${entity.race || ""} ${entity.name || ""} ${entity.id || ""}`.toLowerCase();
  if (/半身人|侏儒|狗頭人|哥布林|halfling|gnome|kobold|goblin/.test(text) && !/熊地精|大地精|bugbear|hobgoblin/.test(text)) {
    return { sizeCategory: "small", heightScale: 0.78 };
  }
  if (/矮人|灰矮人|dwarf|duergar/.test(text)) return { sizeCategory: "medium", heightScale: 0.86 };
  if (/熊地精|大地精|半獸人|獸人|龍裔|歌利亞|bugbear|hobgoblin|half-orc|orc|dragonborn|goliath/.test(text)) {
    return { sizeCategory: "medium", heightScale: 1.07 };
  }
  return { sizeCategory: "medium", heightScale: 1.0 };
}

export function hydrateMonsterUnit(monsterId, idx, spawn = { x: 10, y: 5 }, partyLevel = 3) {
  const m = MONSTER_DB[monsterId] || MONSTER_DB.goblin;
  const stats = m.stats || { str: 10, dex: 12, con: 10, int: 8, wis: 10, cha: 8 };
  const mods = getHeroMods(stats);
  const footprint = m.size === "large" || m.size === "huge" ? 2 : 1;
  const lvlHitBonus = partyLevel >= 5 ? 1 : 0;

  const actions = (m.actions || []).map((act) => ({
    id: act.id,
    name: act.name,
    isRanged: act.attackType === "ranged_weapon" || act.attackType === "ranged_spell",
    rangeCells:
      act.attackType === "ranged_weapon" || act.attackType === "ranged_spell"
        ? Math.max(4, Math.min(12, Math.floor((act.rangeCells || 10) / 1.5)))
        : Math.max(1, act.rangeCells || 1),
    reach: (act.rangeCells || 1) > 1 && act.attackType === "melee_weapon",
    hitBonus: Math.max(2, (act.hitBonus ?? 4) - (partyLevel <= 3 ? 2 : 1)),
    damageDice: act.damage?.[0]?.dice || "1d6+2",
    damageType: act.damage?.[0]?.type || "slashing",
    extraDamage: act.damage?.[1] || null,
  }));

  const traitsLower = (m.traits || []).join(" ").toLowerCase();
  const extraSpells = [];
  if (m.aiBehavior === "support_caster" || m.id === "acolyte") {
    const rec = resolveSpellRecord("Sacred Flame");
    const recHeal = resolveSpellRecord("Healing Word");
    if (rec) extraSpells.push({ key: rec.key, name: rec.name, level: 0, ...rec.mechanics });
    if (recHeal) extraSpells.push({ key: recHeal.key, name: recHeal.name, level: 1, ...recHeal.mechanics });
  }

  const visProfile = resolveUnitVisualProfile({ id: m.id, name: m.name, size: m.size, footprint });

  const tunedHp =
    m.id === "troll"
      ? Math.min(m.hp, 54)
      : m.id === "ogre"
        ? Math.min(m.hp, 42)
        : (m.crNumeric || 0) >= 4
          ? Math.min(m.hp, 42 + partyLevel * 12)
          : m.hp;
  return {
    id: `${m.id}_${idx}`,
    templateId: m.id,
    name: idx > 0 ? `${m.name} #${idx + 1}` : m.name,
    className: m.type,
    sizeCategory: visProfile.sizeCategory,
    heightScale: visProfile.heightScale,
    cr: m.cr,
    xp: m.xp || 50,
    side: "foe",
    avatar: resolveMonsterSprite(m.id, m.name),
    x: spawn.x,
    y: spawn.y,
    footprint,
    hp: tunedHp,
    maxHp: tunedHp,
    ac: Math.max(9, (m.ac || 12) - 3),
    speedCells: m.speedCells || 6,
    stats,
    mods,
    profBonus: 2,
    saves: Object.keys(m.saves || {}),
    saveOverrides: m.saves || {},
    weapons: actions,
    extraAttacks: m.multiattack || 1,
    spells: extraSpells,
    slots: m.id === "acolyte" ? { 1: 2 } : {},
    maxSlots: m.id === "acolyte" ? { 1: 2 } : {},
    spellAtkBonus: 4,
    spellSaveDc: 12,
    abilities: [],
    potions: [],
    traits: m.traits || [],
    aiBehavior: m.aiBehavior || "melee_rusher",
    nimbleEscape: /nimble escape/.test(traitsLower),
    packTactics: /pack tactics/.test(traitsLower),
    regenerates: /regeneration/.test(traitsLower),
    regenBlocked: false,
    flies: !!(m.speed && m.speed.fly > 0) || /wyvern|dragon|wyrm|imp|harpy|gargoyle|ghost|wraith|banshee|bat|eagle|hawk|owl/i.test(`${m.id} ${m.name}`),
    nativeFacing: inferNativeFacing(resolveMonsterSprite(m.id, m.name), "foe"),
    facingTarget: null,
    initiativeBonus: mods.dex,
    damageResistances: (m.damageResistances || []).map((x) => x.toLowerCase()),
    damageImmunities: (m.damageImmunities || []).map((x) => x.toLowerCase()),
    damageVulnerabilities: (m.damageVulnerabilities || []).map((x) => x.toLowerCase()),
    conditionImmunities: m.conditionImmunities || [],
    conditions: {},
    concentration: null,
    deathSaves: { success: 0, fail: 0, stabilized: false },
    dead: false,
    autoReactions: { opportunityAttack: true, shield: false },
    turn: null,
    reactionLeft: 1,
  };
}

export function getUnitCells(unit, overrideX = unit?.x, overrideY = unit?.y) {
  const fp = unit?.footprint || 1;
  const cells = [];
  for (let dy = 0; dy < fp; dy++) {
    for (let dx = 0; dx < fp; dx++) {
      cells.push({ x: overrideX + dx, y: overrideY + dy });
    }
  }
  return cells;
}

export function unitGridDistance(unitA, unitB, ax = unitA.x, ay = unitA.y) {
  const cellsA = getUnitCells(unitA, ax, ay);
  const cellsB = getUnitCells(unitB);
  let best = 999;
  for (const a of cellsA) {
    for (const b of cellsB) {
      const cheb = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
      if (cheb < best) best = cheb;
    }
  }
  return best;
}

export function cellToUnitDistance(cx, cy, unit) {
  let best = 999;
  for (const uc of getUnitCells(unit)) {
    const cheb = Math.max(Math.abs(cx - uc.x), Math.abs(cy - uc.y));
    if (cheb < best) best = cheb;
  }
  return best;
}

export function getUnitBaseH(battle, unit) {
  let maxH = 0;
  for (const c of getUnitCells(unit)) {
    const h = battle.map.grid[c.y]?.[c.x]?.h ?? 1;
    if (h > maxH) maxH = h;
  }
  return maxH;
}

export function getUnitAtCell(battle, x, y, excludeId = null) {
  for (const u of battle.units) {
    if (u.id === excludeId || u.dead) continue;
    if (u.side === "foe" && u.hp <= 0) continue;
    for (const c of getUnitCells(u)) {
      if (c.x === x && c.y === y) return u;
    }
  }
  return null;
}

function canFootprintStandAt(battle, unit, ox, oy, ignoreAllies = true) {
  const fp = unit.footprint || 1;
  const grid = battle.map.grid;
  let refH = null;
  for (let dy = 0; dy < fp; dy++) {
    for (let dx = 0; dx < fp; dx++) {
      const cx = ox + dx;
      const cy = oy + dy;
      if (!inMapBounds(cx, cy)) return false;
      const tile = grid[cy][cx];
      if (!tile.walkable && !(unit.flies && tile.type === "chasm")) return false;
      if (refH === null) refH = tile.h;
      else if (fp > 1 && Math.abs(tile.h - refH) > 1) return false;
      const occ = getUnitAtCell(battle, cx, cy, unit.id);
      if (occ) {
        if (!ignoreAllies || occ.side !== unit.side) return false;
      }
    }
  }
  return true;
}

function isStepLegal(battle, unit, x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  if (dx === 0 && dy === 0) return false;
  if (!canFootprintStandAt(battle, unit, x1, y1, true)) return false;

  const grid = battle.map.grid;
  const h0 = grid[y0][x0].h;
  const h1 = grid[y1][x1].h;
  const maxClimbDiff = unit.skillProfs?.includes("athletics") ? 2 : 1;
  if (!unit.flies && Math.abs(h1 - h0) > maxClimbDiff) return false;

  // Prevent diagonal corner cutting through blocked orthogonal cells
  if (dx !== 0 && dy !== 0) {
    const ortho1 = grid[y0][x0 + dx];
    const ortho2 = grid[y0 + dy][x0];
    if (!ortho1?.walkable || !ortho2?.walkable) return false;
    if (!unit.flies && (Math.abs(ortho1.h - h0) > maxClimbDiff || Math.abs(ortho2.h - h0) > maxClimbDiff)) return false;
  }
  return true;
}

export function getEffectiveSpeed(unit) {
  if (!unit || unit.dead) return 0;
  if (unit.conditions?.Unconscious || unit.conditions?.Paralyzed || unit.conditions?.Stunned || unit.conditions?.Grappled || unit.conditions?.Restrained) {
    return 0;
  }
  let sp = unit.speedCells || 6;
  if (unit.conditions?.Hasted) sp *= 2;
  if (unit.conditions?.Slowed) sp = Math.max(1, Math.floor(sp / 2));
  return sp;
}

export function beginActiveTurn(battle) {
  const unit = getActiveUnit(battle);
  const events = [];
  if (!unit) return { events, battleEnded: checkBattleOutcome(battle) };

  unit.reactionLeft = 1;
  const effSpeed = getEffectiveSpeed(unit);
  unit.turn = {
    actionLeft: unit.conditions?.Hasted ? 2 : 1,
    bonusLeft: 1,
    movementLeft: effSpeed,
    attacksLeft: 0,
    attackActionUsed: false,
    disengaged: false,
    dashed: false,
    dodging: false,
    hidden: !!unit.conditions?.Hidden,
    castLeveledBonus: false,
    castLeveledAction: false,
    bonusAttackUnlocked: Boolean(unit.isDualAxe || unit.isDualWielder),
    autoSkip: false,
  };

  // Clear start-of-turn temporary stances
  if (unit.conditions?.Dodging) delete unit.conditions.Dodging;
  if (unit.conditions?.Shielded) delete unit.conditions.Shielded;

  // Troll regeneration unless burned by fire/acid
  if (unit.regenerates && unit.hp > 0 && unit.hp < unit.maxHp) {
    if (unit.regenBlocked) {
      unit.regenBlocked = false;
      events.push({ type: "log", text: `${unit.name} 因火焰／強酸傷害本輪無法再生。` });
    } else {
      const heal = Math.min(10, unit.maxHp - unit.hp);
      unit.hp += heal;
      events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit), text: `+${heal} 再生`, color: "#4ade80" });
    }
  }
  if (unit.regenPerTurn > 0 && unit.hp > 0 && unit.hp < unit.maxHp && !unit.dead) {
    const heal = Math.min(unit.regenPerTurn, unit.maxHp - unit.hp);
    unit.hp += heal;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 0.95, text: `🦴 +${heal} 重組`, color: "#86efac" });
  }

  // Hero Death Saving Throw check if unconscious at 0 HP
  if (unit.side === "hero" && unit.hp === 0 && unit.conditions?.Unconscious && !unit.dead) {
    unit.turn.autoSkip = true;
    unit.turn.movementLeft = 0;
    unit.turn.actionLeft = 0;
    unit.turn.bonusLeft = 0;

    if (!unit.deathSaves.stabilized) {
      const roll = rollDie(battle.rng, 20);
      if (roll === 20) {
        unit.hp = 1;
        delete unit.conditions.Unconscious;
        unit.deathSaves = { success: 0, fail: 0, stabilized: false };
        unit.turn.autoSkip = false;
        unit.turn.movementLeft = effSpeed;
        unit.turn.actionLeft = 1;
        unit.turn.bonusLeft = 1;
        events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit), text: "d20=20 奇蹟甦醒！", color: "#fde047" });
        battle.logs.push(`✨ ${unit.name} 死亡豁免擲出 20，回復 1 HP 甦醒！`);
      } else if (roll === 1) {
        unit.deathSaves.fail += 2;
        events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit), text: "💀 d20=1 雙倍失敗", color: "#ef4444" });
        battle.logs.push(`💀 ${unit.name} 死亡豁免大失敗（失敗 ${unit.deathSaves.fail}/3）。`);
      } else if (roll >= 10) {
        unit.deathSaves.success += 1;
        events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit), text: `💛 d20=${roll} 成功(${unit.deathSaves.success}/3)`, color: "#86efac" });
        battle.logs.push(`💛 ${unit.name} 死亡豁免成功（${unit.deathSaves.success}/3）。`);
      } else {
        unit.deathSaves.fail += 1;
        events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit), text: `☠️ d20=${roll} 失敗(${unit.deathSaves.fail}/3)`, color: "#f87171" });
        battle.logs.push(`☠️ ${unit.name} 死亡豁免失敗（${unit.deathSaves.fail}/3）。`);
      }

      if (unit.deathSaves.fail >= 3) {
        unit.dead = true;
        delete unit.conditions.Unconscious;
        events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit), text: "陣亡！", color: "#ef4444" });
        battle.logs.push(`🪦 ${unit.name} 傷重不治陣亡。`);
      } else if (unit.deathSaves.success >= 3) {
        unit.deathSaves.stabilized = true;
        battle.logs.push(`🩺 ${unit.name} 生命跡象已穩定。`);
      }
    } else {
      battle.logs.push(`🩺 ${unit.name} 處於昏迷穩定狀態。`);
    }
  } else if (unit.conditions?.Surprised) {
    delete unit.conditions.Surprised;
    unit.turn.autoSkip = true;
    unit.turn.movementLeft = 0;
    unit.turn.actionLeft = 0;
    unit.turn.bonusLeft = 0;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.1, text: "😱 遭偷襲驚愕!", color: "#f59e0b" });
    battle.logs.push(`😱 ${unit.name} 因遭到偷襲驚愕，本輪無法行動！`);
  } else if (unit.conditions?.Paralyzed || unit.conditions?.Stunned || (unit.hp > 0 && unit.conditions?.Unconscious)) {
    unit.turn.autoSkip = true;
    unit.turn.movementLeft = 0;
    unit.turn.actionLeft = 0;
    unit.turn.bonusLeft = 0;
    const isSleep = Boolean(unit.conditions?.Unconscious);
    events.push({
      type: "float",
      x: unit.x,
      y: unit.y,
      z: getUnitBaseH(battle, unit) + 1.1,
      text: isSleep ? "💤 沉睡中" : "⛔ 無法行動",
      color: "#c084fc",
    });
    battle.logs.push(isSleep ? `😴 ${unit.name} 仍在沉睡中，本輪無法行動。` : `⛔ ${unit.name} 處於控制狀態，無法行動。`);
  }

  if (unit.hp > 0 && !unit.dead && !unit.turn.autoSkip) {
    if (unit.telegraphing) {
      const tg = unit.telegraphing;
      unit.telegraphing = null;
      const shockDmg = rollDiceExpr(battle.rng, tg.dmgDice || "3d6").total;
      events.push({ type: "blast", x: unit.x, y: unit.y, color: "#f97316" });
      events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.5, text: "💥 蓄力震波爆發!", color: "#ef4444" });
      battle.logs.push(`💥 ${unit.name} 完成蓄力並釋放毀滅震波（對周圍 ${tg.radius || 2} 格造成 ${shockDmg} 傷害）！`);
      for (const h of battle.units) {
        if (h.side === "hero" && !h.dead && h.hp > 0 && unitGridDistance(unit, h) <= (tg.radius || 2)) {
          applyDamageToUnit(battle, h, shockDmg, "bludgeoning", false, events);
        }
      }
    }
    const aura = getUnitAuraEffects(battle, unit);
    if (aura.regenHp > 0 && unit.hp < unit.maxHp) {
      const hGain = Math.min(aura.regenHp, unit.maxHp - unit.hp);
      unit.hp += hGain;
      events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: `🎵 +${hGain} 小夜曲`, color: "#86efac" });
    }
    triggerTileHazardOnEnter(battle, unit, events);
  }

  return { events, battleEnded: checkBattleOutcome(battle) };
}

export function hydrateAllyUnit(spec = {}, idx = 0, spawn = { x: 2, y: 4 }, partyLevel = 3) {
  const allyRole = spec?.allyRole === "vip" ? "vip" : "combat";
  const isVip = allyRole === "vip";
  const maxHp = Number.isFinite(spec?.maxHp)
    ? Math.max(1, spec.maxHp)
    : isVip
      ? 16 + partyLevel * 3
      : 24 + partyLevel * 6;
  const hp = Number.isFinite(spec?.hp) ? Math.max(1, Math.min(maxHp, spec.hp)) : maxHp;
  const ac = Number.isFinite(spec?.ac) ? Math.max(8, spec.ac) : isVip ? 12 : 15;
  const weapon = isVip
    ? { id: "vip_dagger", name: "防身短匕", damageDice: "1d4+1", damageType: "piercing", rangeCells: 1, isRanged: false, hitBonus: 3 }
    : spec?.ranged
      ? { id: "ally_bow", name: "精銳短弓", damageDice: "1d6+3", damageType: "piercing", rangeCells: 7, isRanged: true, hitBonus: 5 + Math.floor(partyLevel / 2) }
      : { id: "ally_spear", name: "守衛長矛", damageDice: "1d8+3", damageType: "piercing", rangeCells: 1, isRanged: false, hitBonus: 5 + Math.floor(partyLevel / 2) };

  const defaultAllyAvatar = isVip
    ? pickLegacyHumanoidAvatar("npc", `${spec?.name || "vip"}_${idx}`)
    : pickLegacyHumanoidAvatar("martial", `${spec?.name || "guard"}_${idx}`);
  const resolvedAvatar =
    normalizeTokenPath(spec?.avatar) ||
    (spec?.name ? resolveMonsterSprite(spec.catalogId || spec.id, spec.name) : null) ||
    defaultAllyAvatar;

  return {
    id: spec?.id || `ally_npc_${idx}_${Date.now()}`,
    storyCastId: spec?.storyCastId || null,
    side: "hero",
    isNpcAlly: true,
    allyRole,
    teamTint: isVip ? "#f59e0b" : "#10b981",
    name: spec?.name || (isVip ? "被保護人・商旅領袖" : `友軍護衛 ${idx + 1}`),
    className: spec?.className || (isVip ? "被保護人" : "友軍護衛"),
    race: spec?.race || "人類",
    size: "medium",
    footprint: 1,
    level: partyLevel,
    avatar: resolvedAvatar,
    nativeFacing: inferNativeFacing(resolvedAvatar, "hero"),
    facingTarget: null,
    x: spawn.x,
    y: spawn.y,
    facing: 0,
    hp,
    maxHp,
    tempHp: 0,
    ac,
    speedCells: 6,
    stats: { str: 13, dex: 13, con: 12, int: 10, wis: 12, cha: 11 },
    mods: { str: 1, dex: 1, con: 1, int: 0, wis: 1, cha: 0 },
    initiativeBonus: 1,
    initBonus: 1,
    weapons: [weapon],
    spells: [],
    slots: {},
    maxSlots: {},
    potions: isVip ? [] : [{ id: "potion_healing", name: "治療藥水", qty: 1, effect: { type: "heal", dice: "2d4+2" } }],
    antidotes: 0,
    conditions: {},
    deathSaves: { success: 0, fail: 0, stabilized: false },
    dead: false,
    concentrating: null,
    turn: null,
  };
}

export function createBattleState({
  scenarioId = "cave_ambush",
  seed = 101,
  partyPresets = null,
  partyLevel = 3,
  foeIds = null,
  foeSpecs = null,
  allySpecs = null,
  weather = "auto",
  lighting = "auto",
  blueprint = null,
  ambushMode = "normal",
  paceMode = "fast",
  allowZeroFoes = false,
} = {}) {
  const map = generateVoxelMap(scenarioId, seed, partyLevel, { weather, lighting, blueprint });
  map.drops = [];
  if (Array.isArray(blueprint?.interactables) && blueprint.interactables.length > 0) {
    const usedPropCoords = new Set((map.props || []).map((p) => `${p.x},${p.y}`));
    const spawnCoords = new Set([...(map.heroSpawns || []), ...(map.foeSpawns || [])].map((s) => `${s.x},${s.y}`));
    blueprint.interactables.slice(0, 3).forEach((item, idx) => {
      if (!item?.name) return;
      const existing = (map.props || []).find((p) => p.interactable && !p.completed && (p.kind === item.kind || idx === 0));
      if (existing) {
        existing.name = item.name;
        if (Number.isFinite(item.dc)) existing.dc = item.dc;
        if (item.skill || item.skillName) existing.skillName = item.skillName || item.skill;
        if (item.skillStat) existing.skillStat = item.skillStat;
        if (item.actionLabel) existing.actionLabel = item.actionLabel;
        if (typeof item.shovable === "boolean") existing.shovable = item.shovable;
        if (Number.isFinite(item.pushDc)) existing.pushDc = item.pushDc;
        if (item.rewardEffect) existing.rewardEffect = item.rewardEffect;
        if (item.rewardDesc) existing.rewardDesc = item.rewardDesc;
        existing.isObjective = true;
        return;
      }
      const cx = Math.floor(MAP_COLS / 2) + (idx - 1) * 2;
      const cy = Math.floor(MAP_ROWS / 2) + (idx % 2 === 0 ? 0 : 1);
      for (let r = 0; r <= 4; r++) {
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            const px = cx + dx;
            const py = cy + dy;
            const tile = map.grid?.[py]?.[px];
            const k = `${px},${py}`;
            if (tile && tile.walkable && !usedPropCoords.has(k) && !spawnCoords.has(k)) {
              usedPropCoords.add(k);
              map.props.push({
                id: `story_prop_${idx}_${px}_${py}`,
                kind: item.kind || "crystal",
                name: item.name,
                x: px,
                y: py,
                h: tile.h || 0.5,
                walkable: false,
                blocksSight: false,
                cover: "half",
                hp: 15,
                maxHp: 15,
                broken: false,
                interactable: true,
                isObjective: true,
                dc: Number.isFinite(item.dc) ? item.dc : 12,
                skillName: item.skillName || item.skill || undefined,
                skillStat: item.skillStat || undefined,
                actionLabel: item.actionLabel || undefined,
                shovable: Boolean(item.shovable),
                pushDc: Number.isFinite(item.pushDc) ? item.pushDc : undefined,
                rewardEffect: item.rewardEffect || "inspire_party",
                rewardDesc: item.rewardDesc || "戰術目標達成！",
              });
              return;
            }
          }
        }
      }
    });
  }
  const chosenPresets =
    Array.isArray(partyPresets) && partyPresets.length > 0
      ? partyPresets
      : ["preset_fighter", "preset_rogue", "preset_cleric", "preset_wizard"]
          .map((pid) => PRESET_HEROES.find((h) => h.id === pid))
          .filter(Boolean);

  const chosenFoes = Array.isArray(foeIds) && (foeIds.length > 0 || allowZeroFoes) ? foeIds : map.defaultFoes;
  const rng = createBattleRng(seed);

  const units = [];
  const heroBatch = chosenPresets.slice(0, 5);
  heroBatch.forEach((preset, idx) => {
    const sp = map.heroSpawns[idx] || map.heroSpawns[idx % map.heroSpawns.length];
    const hu = hydrateHeroUnit(preset, partyLevel, sp);
    if (paceMode === "fast" || paceMode === "standard") {
      hu.maxHp = Math.round(hu.maxHp * 1.25);
      hu.hp = hu.maxHp;
    }
    if (Number.isFinite(preset?.maxHpOverride)) hu.maxHp = Math.max(1, preset.maxHpOverride);
    if (Number.isFinite(preset?.hpOverride)) hu.hp = Math.max(0, Math.min(hu.maxHp, preset.hpOverride));
    if (Number.isFinite(preset?.acOverride)) hu.ac = Math.max(8, preset.acOverride);
    units.push(hu);
  });

  // Auto-spawn each hero's animal companion / construct, or attach shoulder/flying familiar to owner!
  const compOccupied = new Set(units.map((u) => `${u.x},${u.y}`));
  heroBatch.forEach((preset, idx) => {
    if (!preset?.companion) return;
    const owner = units[idx];
    const comp = preset.companion;
    const compName = String(comp.name || "夥伴").split(/[（(]/)[0].trim();
    const compTypeStr = `${comp.name || ""} ${comp.type || ""}`;
    const compFlies = /蝴蝶|貓頭鷹|黑鴉|烏鴉|獵鷹|鷹|鳥|owl|crow|butterfly|falcon|hawk|eagle|fey|飛/i.test(compTypeStr);
    const compImg =
      normalizeTokenPath(comp.avatar) ||
      resolveMonsterSprite(compName, compTypeStr);
    const isShoulderFamiliar = /魔寵|使魔|蝴蝶|貓頭鷹|黑鴉|烏鴉|獵鷹|劍靈|familiar|owl|crow|butterfly|falcon|hawk|spirit/i.test(
      compTypeStr
    );

    if (isShoulderFamiliar) {
      owner.familiar = {
        name: compName,
        type: comp.type || "魔寵",
        avatar: compImg,
        flies: compFlies || /劍靈/.test(compTypeStr),
        nativeFacing: inferNativeFacing(compImg, "hero"),
      };
      // Familiar Passives: permanent bonuses to owner + master-familiar synergy ability
      owner.spellAtkBonus = (owner.spellAtkBonus || 0) + 1;
      for (const w of owner.weapons || []) w.hitBonus = (w.hitBonus || 0) + 1;
      owner.initiativeBonus = (owner.initiativeBonus || 0) + 2;

      let famPassiveLabel = `魔寵協助:${compName}(命中+1/先攻+2)`;
      let famAbility = {
        id: "fam_help_strike",
        name: `${compName}·使魔擾敵`,
        actionType: "bonus",
        usesLeft: 2,
        desc: `指揮 ${compName} 干擾 4 格內敵人，本回合下次攻擊取優勢並附加 +1d4 傷害。`,
      };

      if (/墨井|inkwell/i.test(compTypeStr)) {
        owner.ac = (owner.ac || 12) + 1;
        famPassiveLabel = `魔寵:${compName}(命中+1/先攻+2/AC+1)`;
        famAbility = {
          id: "fam_inkwell_amplify",
          name: "墨井共鳴·奧術增幅",
          actionType: "bonus",
          usesLeft: 2,
          desc: "與墨井魔寵共鳴，本回合下次攻擊或法術命中 +3、取優勢並附加 +1d6 力場傷害。",
        };
      } else if (/格蕾絲|蝴蝶|grace|butterfly/i.test(compTypeStr)) {
        famPassiveLabel = `魔寵:${compName}(命中+1/先攻+2/光輝守護)`;
        famAbility = {
          id: "fam_grace_radiance",
          name: "格蕾絲·光輝鱗粉",
          actionType: "bonus",
          usesLeft: 2,
          desc: "格蕾絲灑下金色鱗粉：治療 4 格內最傷友軍 1d6+3 HP 並賦予祝福，同時使 3 格內敵人目盲 1 回合。",
        };
      } else if (/漆夜|crow/i.test(compTypeStr)) {
        famPassiveLabel = `魔寵:${compName}(命中+1/先攻+2/高空索敵)`;
        famAbility = {
          id: "fam_crow_hex",
          name: "漆夜視界·黑鴉厄運",
          actionType: "bonus",
          usesLeft: 2,
          desc: "漆夜俯衝鎖定 6 格內敵人，本回合下次攻擊取優勢並額外造成 +1d6 黯蝕傷害。",
        };
      } else if (/夜羽|nightfeather/i.test(compTypeStr)) {
        famPassiveLabel = `魔寵:${compName}(命中+1/先攻+2/傳法厄運)`;
        famAbility = {
          id: "fam_nightfeather_curse",
          name: "夜羽傳法·荊棘詛咒",
          actionType: "bonus",
          usesLeft: 2,
          desc: "透過夜羽遠距傳遞詛咒至 7 格內敵人，造成 1d8 黯蝕傷害並使其下次攻擊吃劣勢。",
        };
      } else if (/劍聖|劍靈|無名/.test(compTypeStr)) {
        owner.ac = (owner.ac || 14) + 1;
        famPassiveLabel = `魔劍:${compName}(命中+1/AC+1/先攻+2)`;
        famAbility = {
          id: "fam_kensei_resonance",
          name: "劍靈共鳴·魔劍護主",
          actionType: "bonus",
          usesLeft: 2,
          desc: "喚醒劍聖劍靈：本回合下次斬擊必取優勢且額外 +1d8 力場傷害，並賦予自身護盾效果。",
        };
      }

      owner.passives = [...(owner.passives || []), famPassiveLabel];
      owner.abilities = [...(owner.abilities || []), famAbility];
      return;
    }

    let csp = null;
    for (let r = 1; r <= 3 && !csp; r++) {
      for (const [dx, dy] of [[0, -r], [0, r], [-r, 0], [-r, -r], [-r, r], [r, -r], [r, r], [r, 0]]) {
        const nx = owner.x + dx;
        const ny = owner.y + dy;
        const t = map.grid[ny]?.[nx];
        if (t?.walkable && !compOccupied.has(`${nx},${ny}`)) {
          csp = { x: nx, y: ny };
          break;
        }
      }
    }
    if (!csp) return;
    compOccupied.add(`${csp.x},${csp.y}`);
    const compAtk = comp.attacks?.[0] || {};
    const compMaxHp = Math.max(16, 12 + partyLevel * 5);
    const compPassives = ["與主協同(主人2格內命中+2/傷+1d4)"];
    const compAbilities = [];
    if (/獅鷲|雷翼|griffon/i.test(compTypeStr)) {
      compPassives.push("極北狂風(衝鋒撲擊)");
      compAbilities.push(
        { id: "comp_pounce", name: "猛獸撲擊", actionType: "action", usesLeft: 2, desc: "蓄力撲擊 2 格內敵人，造成 2d6+3 傷害並擊倒（倒地）。" },
        { id: "comp_guard", name: "雷翼護主", actionType: "bonus", usesLeft: 2, desc: "振翅掩護主人與 2 格內友軍，賦予祝福與 1d4+2 臨時振奮。" }
      );
    } else if (/狼|露娜|掠影|wolf/i.test(compTypeStr)) {
      compPassives.push(/幻影|露娜/.test(compTypeStr) ? "幻影閃避(免藉機)" : "狼群夾擊(絆倒)");
      compAbilities.push(
        { id: "comp_blink", name: "幻影閃襲", actionType: "action", usesLeft: 2, desc: "突襲 2 格內敵人（取優勢）造成 1d8+3 傷害並絆倒目標。" },
        { id: "comp_guard", name: "狼嚎激勵", actionType: "bonus", usesLeft: 2, desc: "為主人與 3 格內友軍鼓舞士氣（祝福+回氣）。" }
      );
    } else if (/梟熊|泡芙|owlbear/i.test(compTypeStr)) {
      compPassives.push("巨熊護主(堅韌+3)");
      compAbilities.push(
        { id: "comp_pounce", name: "重掌拍飛", actionType: "action", usesLeft: 2, desc: "重擊近戰敵人造成 2d6+3 鈍擊傷害並擊倒目標。" },
        { id: "comp_guard", name: "絨毛護盾", actionType: "bonus", usesLeft: 2, desc: "挺身掩護主人，使主人與自己恢復 1d6+2 HP 並獲得祝福。" }
      );
    } else if (/蒸汽|斯蒂米|steam|construct/i.test(compTypeStr)) {
      compPassives.push("蒸氣裝甲(穩固)");
      compAbilities.push(
        { id: "comp_steam", name: "過載蒸氣噴射", actionType: "action", usesLeft: 2, desc: "朝 2 格內敵群噴射高壓蒸氣，造成 2d6 火焰傷害。" },
        { id: "comp_guard", name: "緊急修補", actionType: "bonus", usesLeft: 2, desc: "為自己或 2 格內友軍緊急維修恢復 1d6+3 HP。" }
      );
    } else if (/鷹|疾風|falcon|hawk/i.test(compTypeStr)) {
      compPassives.push("鷹眼索敵(飛行)");
      compAbilities.push(
        { id: "comp_mark", name: "高空俯衝標記", actionType: "action", usesLeft: 2, desc: "俯衝啄擊 3 格內敵人造成 1d8+2 傷害並使其目盲。" },
        { id: "comp_guard", name: "疾風預警", actionType: "bonus", usesLeft: 2, desc: "鳴啼預警，賦予主人與 3 格內友軍祝福。" }
      );
    } else {
      compAbilities.push(
        { id: "comp_pounce", name: "協同猛擊", actionType: "action", usesLeft: 2, desc: "奮力突擊敵人造成 1d8+3 傷害並有高機率擊倒。" },
        { id: "comp_guard", name: "護主咆哮", actionType: "bonus", usesLeft: 2, desc: "鼓舞主人與身邊友軍恢復少量體力並獲得祝福。" }
      );
    }

    units.push({
      id: `comp_${owner.id}`,
      ownerId: owner.id,
      side: "hero",
      isNpcAlly: true,
      isCompanion: true,
      allyRole: "combat",
      name: `${compName}`,
      className: comp.type || "動物夥伴",
      race: "夥伴",
      sizeCategory: "small",
      heightScale: 0.78,
      footprint: 1,
      level: partyLevel,
      avatar: compImg,
      nativeFacing: inferNativeFacing(compImg, "hero"),
      facingTarget: null,
      flies: compFlies,
      x: csp.x,
      y: csp.y,
      hp: compMaxHp,
      maxHp: compMaxHp,
      ac: comp.ac || 13,
      speedCells: 7,
      stats: { str: 12, dex: 15, con: 12, int: 8, wis: 12, cha: 10 },
      mods: { str: 1, dex: 2, con: 1, int: -1, wis: 1, cha: 0 },
      profBonus: 2,
      initiativeBonus: 2,
      weapons: [
        {
          id: "comp_atk",
          name: compAtk.name || "協同突擊",
          isRanged: false,
          rangeCells: 1,
          reach: false,
          damageDice: compAtk.damage?.match(/\d+d\d+(?:[+-]\d+)?/)?.[0] || "1d6+2",
          damageType: /光耀/.test(compAtk.damage || "") ? "radiant" : /穿刺|咬/.test(compAtk.name || "") ? "piercing" : "slashing",
          hitBonus: (compAtk.hitBonus ?? 4) + 1,
        },
      ],
      spells: [],
      slots: {},
      maxSlots: {},
      abilities: compAbilities,
      passives: compPassives,
      potions: [],
      antidotes: 0,
      conditions: {},
      deathSaves: { success: 0, fail: 0, stabilized: false },
      dead: false,
      autoReactions: { opportunityAttack: true },
      turn: null,
      reactionLeft: 1,
    });
  });

  // Spawn up to 2 Allied NPCs / Protected VIPs alongside the party
  if (Array.isArray(allySpecs) && allySpecs.length > 0) {
    const occupied = new Set(units.map((u) => `${u.x},${u.y}`));
    allySpecs.slice(0, 2).forEach((spec, idx) => {
      let sp = map.heroSpawns.find((s) => !occupied.has(`${s.x},${s.y}`));
      if (!sp) {
        const base = map.heroSpawns[0] || { x: 2, y: 5 };
        for (let r = 1; r <= 4 && !sp; r++) {
          for (let dy = -r; dy <= r && !sp; dy++) {
            for (let dx = -r; dx <= r && !sp; dx++) {
              const nx = base.x + dx;
              const ny = base.y + dy;
              const t = map.grid[ny]?.[nx];
              if (t?.walkable && !occupied.has(`${nx},${ny}`)) sp = { x: nx, y: ny };
            }
          }
        }
      }
      if (sp) {
        occupied.add(`${sp.x},${sp.y}`);
        units.push(hydrateAllyUnit(spec, idx, sp, partyLevel));
      }
    });
  }

  const largeSlot = map.foeSpawns.find((s) => s.footprint === 2);
  const smallSlots = map.foeSpawns.filter((s) => s.footprint !== 2);
  let smallCursor = 0;
  let usedLarge = false;

  const narrowMap = map.sizeTier === "small" || blueprint?.layout === "twin_ships";
  chosenFoes.forEach((rawFid, idx) => {
    let fid = rawFid;
    let tmpl = MONSTER_DB[fid] || MONSTER_DB.goblin;
    let isLarge = tmpl.size === "large" || tmpl.size === "huge";
    if (narrowMap && isLarge) {
      fid = fid === "troll" ? "bandit_captain" : "hobgoblin";
      tmpl = MONSTER_DB[fid] || MONSTER_DB.hobgoblin;
      isLarge = false;
    }
    let sp;
    if (isLarge && largeSlot && !usedLarge) {
      sp = largeSlot;
      usedLarge = true;
    } else if (smallCursor < smallSlots.length) {
      sp = smallSlots[smallCursor++];
    } else {
      sp = map.foeSpawns[idx % map.foeSpawns.length];
    }
    const fu = hydrateMonsterUnit(fid, idx, sp, partyLevel);
    if (partyLevel >= 5) {
      fu.maxHp = Math.round(fu.maxHp * 1.25);
      fu.hp = fu.maxHp;
    }
    const spec = Array.isArray(foeSpecs) ? foeSpecs[idx] : null;
    if (spec) {
      if (spec.name) fu.name = spec.name;
      if (Number.isFinite(spec.maxHp)) fu.maxHp = Math.max(1, spec.maxHp);
      if (Number.isFinite(spec.hp)) fu.hp = Math.max(1, Math.min(fu.maxHp, spec.hp));
      const normAvatar = normalizeTokenPath(spec.avatar);
      if (normAvatar) fu.avatar = normAvatar;
      else if (spec.name || spec.catalogId) fu.avatar = resolveMonsterSprite(spec.catalogId || fid, spec.name);
    } else if (paceMode === "fast") {
      if ((fu.cr || 0.5) < 1 && fu.footprint === 1) {
        // True D&D 4e Minion-inspired fast pace: 1-2 hits to clear (6-8 HP at Lv1, 9-13 HP at Lv3+)
        fu.hp = partyLevel <= 2 ? Math.max(5, Math.min(8, Math.round(fu.hp * 0.4))) : Math.max(8, Math.min(13, Math.round(fu.hp * 0.5)));
        fu.maxHp = fu.hp;
        fu.isMinion = true;
        fu.multiattack = 1;
        for (const w of fu.weapons || []) {
          w.hitBonus = Math.min(w.hitBonus ?? 3, partyLevel <= 2 ? 3 : 4);
        }
      } else {
        fu.hp = Math.max(15, Math.round(fu.hp * 0.65));
        fu.maxHp = fu.hp;
        if (partyLevel <= 2) {
          fu.multiattack = 1;
          for (const w of fu.weapons || []) w.hitBonus = Math.min(w.hitBonus ?? 3, 4);
        }
      }
    } else if (paceMode === "hardcore") {
      fu.ac += 2;
      fu.maxHp = Math.round(fu.maxHp * 1.2);
      fu.hp = fu.maxHp;
      if (fu.footprint === 2 || (fu.cr || 0) >= 2) fu.ac += 2;
    }
    units.push(fu);
  });

  if (paceMode === "fast" && !Array.isArray(foeSpecs)) {
    const targetFoeCount = Math.max(4, Math.min(6, chosenPresets.length + 2));
    const safeMinionId =
      chosenFoes.find((id) => {
        const m = MONSTER_DB[id];
        return m && (m.cr || 0.5) < 1 && m.size !== "large" && m.size !== "huge";
      }) || "goblin";
    let curFoeCount = chosenFoes.length;
    while (curFoeCount < targetFoeCount && smallCursor < smallSlots.length) {
      const extraMinion = hydrateMonsterUnit(safeMinionId, curFoeCount, smallSlots[smallCursor++], partyLevel);
      extraMinion.hp = partyLevel <= 2 ? Math.max(5, Math.min(8, Math.round(extraMinion.hp * 0.4))) : Math.max(8, Math.min(12, Math.round(extraMinion.hp * 0.5)));
      extraMinion.maxHp = extraMinion.hp;
      extraMinion.isMinion = true;
      extraMinion.multiattack = 1;
      for (const w of extraMinion.weapons || []) {
        w.hitBonus = Math.min(w.hitBonus ?? 3, partyLevel <= 2 ? 3 : 4);
      }
      units.push(extraMinion);
      curFoeCount++;
    }
  }

  // Standard D&D 5e Initiative: 1d20 + DEX mod (+ Alert bonus)
  const initiativeEntries = units.map((u) => {
    const r = rollDie(rng, 20);
    return {
      id: u.id,
      roll: r,
      bonus: u.initiativeBonus,
      total: r + u.initiativeBonus,
      dex: u.stats?.dex ?? 10,
      isHero: u.side === "hero",
    };
  });
  initiativeEntries.sort((a, b) => {
    if (b.total !== a.total) return b.total - a.total;
    if (b.dex !== a.dex) return b.dex - a.dex;
    return Number(b.isHero) - Number(a.isHero);
  });

  const battle = {
    scenarioId: map.scenarioId,
    seed,
    partyLevel,
    map,
    units,
    initiativeOrder: initiativeEntries.map((x) => x.id),
    initiativeRolls: Object.fromEntries(initiativeEntries.map((x) => [x.id, x.total])),
    turnIndex: 0,
    round: 1,
    ended: false,
    outcome: null, // "victory" | "defeat" | "retreat"
    nonLethal: false,
    ambushMode,
    reinforcementsTriggered: false,
    storyEvents: [],
    rng,
    logs: [
      `⚔️ 開戰！【${map.name}】擲先攻完畢：${initiativeEntries.map((e) => `${units.find((u) => u.id === e.id)?.name}(${e.total})`).join(" → ")}`,
    ],
  };

  if (ambushMode === "foe_ambush") {
    units.filter((u) => u.side === "hero").forEach((h) => { h.conditions.Surprised = 1; });
    units.filter((u) => u.side === "foe").forEach((f) => { f.conditions.Hidden = 1; });
    battle.logs.push("⚠️ 【敵方埋伏突襲】我方全體首輪驚愕，敵軍獲得潛行優勢！");
  } else if (ambushMode === "hero_ambush") {
    units.filter((u) => u.side === "foe").forEach((f) => { f.conditions.Surprised = 1; });
    units.filter((u) => u.side === "hero").forEach((h) => { h.conditions.Hidden = 1; });
    battle.logs.push("🗡️ 【我方成功偷襲】我方獲得潛行優勢，敵軍首輪驚愕！");
  }

  beginActiveTurn(battle);
  return battle;
}

export function getActiveUnit(battle) {
  if (!battle || battle.ended) return null;
  const uid = battle.initiativeOrder[battle.turnIndex];
  return battle.units.find((u) => u.id === uid && !u.dead && (u.side === "hero" || u.hp > 0)) || null;
}

export function checkBattleOutcome(battle) {
  const playerHeroes = battle.units.filter((u) => u.side === "hero" && !u.isNpcAlly);
  const heroPool = playerHeroes.length > 0 ? playerHeroes : battle.units.filter((u) => u.side === "hero");
  const anyHeroCanFight = heroPool.some((u) => !u.dead && u.hp > 0);
  const anyHeroAliveOrUnconscious = heroPool.some((u) => !u.dead);
  const anyFoeAlive = battle.units.some((u) => u.side === "foe" && u.hp > 0);

  if (!anyFoeAlive) {
    battle.ended = true;
    battle.outcome = "victory";
    return true;
  }
  if (!anyHeroCanFight || !anyHeroAliveOrUnconscious) {
    battle.ended = true;
    battle.outcome = "defeat";
    return true;
  }
  return false;
}

function getAdjacentHostiles(battle, unit, fromX = unit.x, fromY = unit.y) {
  return battle.units.filter((other) => {
    if (other.id === unit.id || other.side === unit.side || other.dead || other.hp <= 0) return false;
    if (other.conditions?.Unconscious || other.conditions?.Paralyzed || other.conditions?.Stunned) return false;
    const reach = Math.max(1, ...(other.weapons || []).map((w) => (w.isRanged ? 1 : w.rangeCells || 1)));
    return unitGridDistance(unit, other, fromX, fromY) <= reach;
  });
}

export function computeReachable3D(battle, unit, budgetOverride = null) {
  if (!battle || !unit || unit.dead || (unit.side === "hero" && unit.hp === 0)) {
    return new Map();
  }
  const budget = budgetOverride !== null ? budgetOverride : unit.turn?.movementLeft ?? getEffectiveSpeed(unit);
  if (budget <= 0) return new Map();

  const dist = new Map();
  const parent = new Map();
  const startKey = `${unit.x},${unit.y}`;
  dist.set(startKey, 0);
  const pq = [{ x: unit.x, y: unit.y, cost: 0 }];

  const hostileWatchers = unit.turn?.disengaged ? [] : getAdjacentHostiles(battle, unit);

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost);
    const cur = pq.shift();
    const curKey = `${cur.x},${cur.y}`;
    if (cur.cost > (dist.get(curKey) ?? 999)) continue;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = cur.x + dx;
        const ny = cur.y + dy;
        if (!isStepLegal(battle, unit, cur.x, cur.y, nx, ny)) continue;

        const targetTile = battle.map.grid[ny][nx];
        const curTile = battle.map.grid[cur.y][cur.x];
        const hDiff = Math.abs((targetTile.h ?? 1) - (curTile.h ?? 1));
        let moveCost = unit.flies ? 1 : getSurfaceMoveCost(targetTile);
        if (!unit.flies) {
          const isWater = targetTile.type === "water" || targetTile.surface === "water";
          const isDiffGround = Boolean(
            targetTile.difficult || targetTile.surface === "difficult" || targetTile.surface === "grease" || targetTile.surface === "ice"
          );
          // Athletics enables swimming without slowdown and climbing 2-step ledges
          if (isWater && unit.skillProfs?.includes("athletics")) moveCost = 1;
          // Acrobatics lets nimble units vault across difficult terrain at normal cost
          if (isDiffGround && unit.skillProfs?.includes("acrobatics")) moveCost = 1;
          if (hDiff >= 2) moveCost = Math.max(2, moveCost + 1);
        }
        const nextCost = cur.cost + moveCost;
        if (nextCost > budget) continue;

        const nKey = `${nx},${ny}`;
        if (nextCost < (dist.get(nKey) ?? 999)) {
          dist.set(nKey, nextCost);
          parent.set(nKey, curKey);
          pq.push({ x: nx, y: ny, cost: nextCost });
        }
      }
    }
  }

  const out = new Map();
  for (const [key, cost] of dist.entries()) {
    const [tx, ty] = key.split(",").map(Number);
    if (!canFootprintStandAt(battle, unit, tx, ty, false)) continue;
    const path = [];
    let cursor = key;
    while (cursor) {
      const [px, py] = cursor.split(",").map(Number);
      path.unshift({ x: px, y: py });
      cursor = parent.get(cursor);
    }
    const provokesOA =
      hostileWatchers.length > 0 &&
      path.length > 1 &&
      hostileWatchers.some((enemy) => {
        const reach = Math.max(1, ...(enemy.weapons || []).map((w) => (w.isRanged ? 1 : w.rangeCells || 1)));
        return path.slice(1).some((step) => unitGridDistance(unit, enemy, step.x, step.y) > reach);
      });

    out.set(key, { x: tx, y: ty, cost, path, provokesOA });
  }
  return out;
}

export function evaluateLineOfSight(battle, attacker, targetX, targetY) {
  const ax = attacker.x + (attacker.footprint === 2 ? 0.5 : 0);
  const ay = attacker.y + (attacker.footprint === 2 ? 0.5 : 0);
  const aH = getUnitBaseH(battle, attacker) + 1.4;
  const dTile = battle.map.grid[targetY]?.[targetX];
  const dH = (dTile?.h ?? 1) + 1.0;

  const dx = targetX - ax;
  const dy = targetY - ay;
  const steps = Math.max(4, Math.ceil(Math.hypot(dx, dy) * 3));
  let coverScore = 0;

  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const sx = Math.round(ax + dx * t);
    const sy = Math.round(ay + dy * t);
    if (!inMapBounds(sx, sy)) continue;
    if ((sx === Math.round(ax) && sy === Math.round(ay)) || (sx === targetX && sy === targetY)) continue;

    const rayZ = aH + (dH - aH) * t;
    const midTile = battle.map.grid[sy][sx];
    const hasIntactProp = (battle.map.props || []).some((p) => !p.broken && p.x === sx && p.y === sy && p.providesCover);
    const midH = midTile.type === "wall" ? midTile.h + 0.5 : midTile.type === "stalagmite" || hasIntactProp ? midTile.h + 1.1 : midTile.h;

    if ((midTile.type === "wall" || midTile.type === "stalagmite") && midH > rayZ + 1.1) {
      return { blocked: true, cover: "total", coverAc: 0, coverSaveBonus: 0 };
    }
    if (midTile.type === "stalagmite" || hasIntactProp || midTile.surface === "steam_cloud") {
      coverScore = Math.max(coverScore, 2);
    } else if (getUnitAtCell(battle, sx, sy, attacker.id)) {
      coverScore = Math.max(coverScore, 2);
    }
  }

  if (dTile?.cover) coverScore = Math.max(coverScore, 2);
  if (coverScore >= 5) return { blocked: false, cover: "three_quarters", coverAc: 5, coverSaveBonus: 5 };
  if (coverScore >= 2) return { blocked: false, cover: "half", coverAc: 2, coverSaveBonus: 2 };
  return { blocked: false, cover: "none", coverAc: 0, coverSaveBonus: 0 };
}

function resolveBestTargetLos(battle, attacker, defender) {
  const cells = getUnitCells(defender);
  let best = { blocked: true, cover: "total", coverAc: 0, coverSaveBonus: 0 };
  for (const c of cells) {
    const res = evaluateLineOfSight(battle, attacker, c.x, c.y);
    if (!res.blocked) {
      if (best.blocked || res.coverAc < best.coverAc) best = res;
    }
  }
  return best;
}

export function getUnitAuraEffects(battle, unit) {
  const out = { saveBonus: 0, fearImmune: false, hitBonus: 0, dmgBonus: 0, regenHp: 0, hitTags: [], dmgTags: [], auraLabels: [] };
  if (!battle?.units || !unit || unit.dead || unit.hp <= 0) return out;

  for (const ally of battle.units) {
    if (ally.side !== unit.side || ally.dead || ally.hp <= 0) continue;
    const dist = unitGridDistance(unit, ally);
    if (ally.isPaladin && dist <= 2) {
      out.saveBonus = Math.max(out.saveBonus, 2);
      out.fearImmune = true;
      if (!out.auraLabels.includes("🛡️ 守護靈光(豁免+2)")) out.auraLabels.push("🛡️ 守護靈光(豁免+2)");
    }
    if (ally.isBard && ally.activeSong && dist <= 3) {
      if (ally.activeSong === "courage" && !out.hitTags.includes("🎵 勇氣戰歌 +2命中")) {
        out.hitBonus += 2;
        out.hitTags.push("🎵 勇氣戰歌 +2命中");
        out.auraLabels.push("🎵 勇氣戰歌(+2命中)");
      } else if (ally.activeSong === "valor" && !out.dmgTags.includes("🥁 狂熱戰鼓 +2傷")) {
        out.dmgBonus += 2;
        out.dmgTags.push("🥁 狂熱戰鼓 +2傷");
        out.auraLabels.push("🥁 狂熱戰鼓(+2傷)");
      } else if (ally.activeSong === "serenity") {
        out.regenHp = Math.max(out.regenHp, 2);
        if (!out.auraLabels.includes("🎻 治癒小夜曲(+2HP)")) out.auraLabels.push("🎻 治癒小夜曲(+2HP)");
      }
    }
  }
  return out;
}

function isCellIlluminated(battle, x, y) {
  const light = battle?.map?.lighting;
  if (light !== "underground" && light !== "night" && light !== "horror") return true;
  for (const u of battle.units || []) {
    if (u.hp > 0 && !u.dead && u.conditions?.Lit && Math.max(Math.abs(u.x - x), Math.abs(u.y - y)) <= 4) {
      return true;
    }
  }
  const grid = battle?.map?.grid;
  if (grid) {
    for (let dy = -3; dy <= 3; dy++) {
      for (let dx = -3; dx <= 3; dx++) {
        const t = grid[y + dy]?.[x + dx];
        if (!t) continue;
        if (t.type === "brazier" || t.type === "crystal" || t.type === "glow_mushroom" || t.surface === "fire") {
          return true;
        }
      }
    }
  }
  return false;
}

export function evaluateAttackModifiers(battle, attacker, defender, { isRanged = false, isMelee = true, ignoreCover = false, hitBonusOverride = null } = {}) {
  const aH = getUnitBaseH(battle, attacker);
  const dH = getUnitBaseH(battle, defender);
  const los = ignoreCover ? { blocked: false, cover: "none", coverAc: 0, coverSaveBonus: 0 } : resolveBestTargetLos(battle, attacker, defender);

  let hitBonus = hitBonusOverride !== null ? hitBonusOverride : attacker.weapons?.[0]?.hitBonus ?? 5;
  let dmgBonus = 0;
  let advCount = 0;
  let disadvCount = 0;
  const tags = [];

  // 2A: BG3 High Ground +-2
  const diffH = aH - dH;
  if (diffH >= 2) {
    hitBonus += 2;
    tags.push("高地優勢 +2");
  } else if (diffH <= -2) {
    hitBonus -= 2;
    tags.push("低打高 -2");
  }

  // Cover AC bonus + Crane Style passive stance
  const shieldAc = defender.conditions?.Shielded ? 5 : 0;
  const craneAc = defender.stances?.craneStyle ? 2 : 0;
  const effAc = defender.ac + los.coverAc + shieldAc + craneAc;
  if (los.cover === "half") tags.push("半掩護 AC+2");
  if (los.cover === "three_quarters") tags.push("3/4掩護 AC+5");
  if (shieldAc > 0) tags.push("護盾術 AC+5");
  if (craneAc > 0) tags.push("🦢 鶴形防禦 AC+2");

  // Supplement 4: Ranged-in-Melee Disadvantage
  if (isRanged && getAdjacentHostiles(battle, attacker).length > 0) {
    disadvCount++;
    tags.push("貼身遠程劣勢");
  }

  // Defender conditions
  if (defender.conditions?.Prone) {
    if (isMelee && unitGridDistance(attacker, defender) <= 2) {
      advCount++;
      tags.push("對倒地近戰優勢");
    } else if (isRanged) {
      disadvCount++;
      tags.push("對倒地遠程劣勢");
    }
  }
  if (defender.conditions?.Paralyzed || defender.conditions?.Unconscious) {
    advCount++;
    tags.push("目標麻痺/昏迷(優勢+近戰必暴)");
  } else if (defender.conditions?.Stunned || defender.conditions?.Restrained || defender.conditions?.Blinded || defender.conditions?.FaerieFire) {
    advCount++;
    tags.push("控場優勢");
  }
  if (defender.conditions?.Dodging || defender.conditions?.Invisible) {
    disadvCount++;
    tags.push("目標閃避/隱形(劣勢)");
  }

  // Steam cloud concealment
  const defTile = battle.map.grid[defender.y]?.[defender.x];
  if (defTile?.surface === "steam_cloud" && unitGridDistance(attacker, defender) > 1) {
    disadvCount++;
    tags.push("蒸氣迷霧劣勢");
  }

  // Attacker conditions
  if (attacker.conditions?.Hidden || attacker.conditions?.Invisible || attacker.conditions?.Reckless) {
    advCount++;
    tags.push(attacker.conditions?.Reckless ? "魯莽優勢" : "隱匿偷襲優勢");
  }
  if (attacker.conditions?.Poisoned || attacker.conditions?.Frightened || attacker.conditions?.Blinded) {
    disadvCount++;
    tags.push("負面狀態劣勢");
  }
  if (attacker.conditions?.Blessed) {
    hitBonus += 2;
    tags.push("祝福術 +1d4");
  }
  if (attacker.conditions?.Rage && isMelee) {
    dmgBonus += 2;
    tags.push("狂暴 +2傷");
  }

  // Bounded Accuracy cap: situational +hit bonuses above baseHit cap at +4; excess turns into +1 dmg
  const baseHitVal = hitBonusOverride !== null ? hitBonusOverride : attacker.weapons?.[0]?.hitBonus ?? 5;
  const maxAllowedHit = baseHitVal + 4;
  if (hitBonus > maxAllowedHit) {
    const overflow = hitBonus - maxAllowedHit;
    hitBonus = maxAllowedHit;
    dmgBonus += overflow;
    tags.push(`命中上限+4(溢位+${overflow}傷)`);
  }

  // Flanking (+2 melee hit when another ally is adjacent to defender)
  if (isMelee && unitGridDistance(attacker, defender) <= 2) {
    const flanked = battle.units.some(
      (ally) => ally.id !== attacker.id && ally.side === attacker.side && !ally.dead && ally.hp > 0 && unitGridDistance(ally, defender) <= 2
    );
    if (flanked) {
      hitBonus += 2;
      tags.push("夾擊包抄 +2");
    }
  }

  // Passive Stances: Power Attack / Sharpshooter
  if (isMelee && attacker.stances?.powerAttack) {
    hitBonus -= 3;
    dmgBonus += 6;
    tags.push("💪 猛力攻擊 (-3/+6)");
  } else if (isRanged && attacker.stances?.sharpshooter) {
    hitBonus -= 3;
    dmgBonus += 6;
    tags.push("🎯 精密射擊 (-3/+6)");
  }

  // Team Auras & Bardic Songs
  const auraFx = getUnitAuraEffects(battle, attacker);
  if (auraFx.hitBonus > 0) {
    hitBonus += auraFx.hitBonus;
    tags.push(...auraFx.hitTags);
  }
  if (auraFx.dmgBonus > 0) {
    dmgBonus += auraFx.dmgBonus;
    tags.push(...auraFx.dmgTags);
  }

  // Weather combat modifiers
  const weather = battle.map?.weather;
  if (isRanged && weather === "gale") {
    hitBonus -= 2;
    tags.push("強風遠程 -2");
  } else if (isRanged && weather === "fog" && unitGridDistance(attacker, defender) > 3) {
    hitBonus -= 1;
    tags.push("濃霧遠距 -1");
  }

  const isDarkMap = ["underground", "night", "horror"].includes(battle.map?.lighting);
  if (isDarkMap && !attacker.hasDarkvision && !attacker.conditions?.Lit && !isCellIlluminated(battle, defender.x, defender.y)) {
    hitBonus -= 1;
    tags.push("昏暗微光 -1");
  }

  const advState = advCount > 0 && disadvCount === 0 ? "adv" : disadvCount > 0 && advCount === 0 ? "disadv" : "normal";
  const isMeleeAutoCrit = !!(isMelee && unitGridDistance(attacker, defender) <= 2 && (defender.conditions?.Paralyzed || defender.conditions?.Unconscious));

  return {
    blocked: los.blocked,
    cover: los.cover,
    effAc,
    hitBonus,
    dmgBonus,
    advState,
    isMeleeAutoCrit,
    rangeBonus: isRanged && diffH >= 2 ? 2 : 0,
    tags,
  };
}

function computeD20HitProb(needed, advState) {
  const baseSuccess = Math.max(1, Math.min(19, 21 - needed)) / 20;
  if (advState === "adv") return Math.round((1 - (1 - baseSuccess) ** 2) * 100);
  if (advState === "disadv") return Math.round(baseSuccess ** 2 * 100);
  return Math.round(baseSuccess * 100);
}

export function applyTypedDamage(target, rawDmg, damageType, _isCrit = false) {
  const dt = String(damageType || "bludgeoning").toLowerCase();
  if ((target.damageImmunities || []).includes(dt)) {
    return { finalDmg: 0, note: "免疫" };
  }
  const hasRageResist = !!target.conditions?.Rage && ["bludgeoning", "piercing", "slashing"].includes(dt);
  let amt = rawDmg;
  let note = "";
  if ((target.damageResistances || []).includes(dt) || hasRageResist) {
    amt = Math.floor(amt / 2);
    note = "抗性減半";
  } else if ((target.damageVulnerabilities || []).includes(dt)) {
    amt = amt * 2;
    note = "弱點雙倍";
  }
  if ((target.flatDr || 0) > 0 && amt > 0) {
    amt = Math.max(1, amt - target.flatDr);
    note = note ? `${note}/減傷-${target.flatDr}` : `減傷-${target.flatDr}`;
  }
  return { finalDmg: amt, note };
}

function addHeroConsumable(unit, kind = "potion") {
  if (!unit) return;
  if (kind === "antidote") {
    unit.antidotes = (unit.antidotes || 0) + 1;
    return;
  }
  if (!Array.isArray(unit.potions)) unit.potions = [];
  if (unit.potions.length > 0) {
    unit.potions[0].qty = (unit.potions[0].qty || 0) + 1;
  } else {
    unit.potions.push({ id: "potion_healing", name: "治療藥水", qty: 1, effect: { type: "heal", dice: "2d4+2" } });
  }
}

function spawnEnemyLootDrop(battle, target, events) {
  if (!battle?.map || !target || target.side !== "foe" || target.isSummon) return;
  if (!Array.isArray(battle.map.drops)) battle.map.drops = [];
  const isEliteOrBoss = target.footprint === 2 || (target.cr || 0) >= 1;
  if (!isEliteOrBoss && rollDie(battle.rng, 2) === 1) return; // 50% for minions, 100% for elites/bosses
  const kind = rollDie(battle.rng, 2) === 1 ? "antidote" : "potion";
  const name = kind === "antidote" ? "萬用解毒淨化劑" : "治療藥水";
  battle.map.drops.push({
    id: `drop_${target.id}_${battle.map.drops.length}`,
    x: target.x,
    y: target.y,
    kind,
    name,
  });
  events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.65, text: `🎁 掉落：${name}`, color: "#fde047" });
}

function triggerBattleScriptLine(battle, key, speakerUnitOverride = null, events = []) {
  const script = battle?.battleScript;
  if (!script || !events) return;
  if (!battle._scriptFired) battle._scriptFired = {};
  if (battle._scriptFired[key]) return;

  const entry = key === "propLine" ? script.propLine : script.triggers?.[key];
  if (!entry || !entry.line) return;
  battle._scriptFired[key] = true;

  const speaker = speakerUnitOverride?.name || entry.speaker || "隊伍";
  const side = speakerUnitOverride?.side || (entry.side === "foe" ? "foe" : "hero");
  const unit =
    speakerUnitOverride ||
    battle.units.find((u) => !u.dead && u.hp > 0 && u.name === speaker) ||
    battle.units.find((u) => !u.dead && u.hp > 0 && u.side === side);

  events.push({ type: "dialogue", key, speaker, side, line: entry.line });
  if (unit) {
    events.push({
      type: "bubble",
      unitId: unit.id,
      x: unit.x,
      y: unit.y,
      z: getUnitBaseH(battle, unit) + 1.55,
      text: entry.line,
      side,
      priority: 3,
      durationMs: 3800,
    });
  }
  if (!battle._scriptBeats) battle._scriptBeats = [];
  battle._scriptBeats.push(`${speaker}：「${entry.line}」`);
  battle.logs.push(`💬 ${speaker}：「${entry.line}」`);
}

function emitSpeechBubble(battle, unit, triggerKey, events) {
  if (!battle || !unit || !events || unit.dead || (unit.hp <= 0 && triggerKey !== "low_hp")) return;
  if (triggerKey === "low_hp" && unit._lowHpBarked) return;

  const curRound = battle.round || 1;
  if (battle._barkRound !== curRound) {
    battle._barkRound = curRound;
    battle._barkCount = 0;
  }
  // Cap total bubbles per round (max 2) and per-unit cooldown (>= 2 rounds) so combat stays lively, never spammy
  if ((battle._barkCount || 0) >= 2 && triggerKey !== "low_hp") return;
  if (triggerKey !== "low_hp" && unit._lastBarkRound && curRound - unit._lastBarkRound < 2) return;

  const rng = battle.rng || Math.random;
  const chance =
    triggerKey === "low_hp"
      ? 1.0
      : triggerKey === "crit" || triggerKey === "heal_revive" || triggerKey === "interact_ok"
        ? 0.8
        : triggerKey === "big_spell" || triggerKey === "kill"
          ? 0.52
          : 0.28;
  if (rng() > chance) return;

  const text = pickCombatBark(unit, triggerKey, rng);
  if (!text) return;
  if (triggerKey === "low_hp") unit._lowHpBarked = true;
  unit._lastBarkRound = curRound;
  battle._barkCount = (battle._barkCount || 0) + 1;
  events.push({
    type: "bubble",
    unitId: unit.id,
    side: unit.side,
    x: unit.x,
    y: unit.y,
    z: getUnitBaseH(battle, unit) + (unit.heightScale || 1) * 1.15,
    text,
  });
}

function applyDamageToUnit(battle, target, rawDmg, damageType, isCrit = false, events = []) {
  const weather = battle.map?.weather;
  const dtLower = String(damageType || "").toLowerCase();
  let adjRawDmg = rawDmg;
  if (weather === "embers" && dtLower === "fire" && adjRawDmg > 0) adjRawDmg += 1;
  else if (weather === "lightning_storm" && dtLower === "lightning" && adjRawDmg > 0) adjRawDmg += 1;

  // Elemental Surface Combo Bonus: Oil + Fire or Water + Lightning -> +1d6 combo damage!
  const surfAt = battle?.map?.grid?.[target.y]?.[target.x]?.surface;
  if (adjRawDmg > 0 && ((surfAt === "oil" && dtLower === "fire") || ((surfAt === "water" || surfAt === "electrified_water") && dtLower === "lightning"))) {
    const comboBonus = rollDie(battle.rng, 6);
    adjRawDmg += comboBonus;
    events.push({
      type: "float",
      x: target.x,
      y: target.y,
      z: getUnitBaseH(battle, target) + 1.5,
      text: surfAt === "oil" ? `🔥 油火連爆 +${comboBonus}!` : `⚡ 感電連鎖 +${comboBonus}!`,
      color: surfAt === "oil" ? "#fb923c" : "#38bdf8",
    });
  }
  else if (weather === "rain" && dtLower === "fire" && adjRawDmg > 1) adjRawDmg -= 1;

  const { finalDmg, note } = applyTypedDamage(target, adjRawDmg, damageType, isCrit);
  if (target.regenerates && (String(damageType).toLowerCase() === "fire" || String(damageType).toLowerCase() === "acid") && finalDmg > 0) {
    target.regenBlocked = true;
  }

  if (finalDmg > 0) {
    // Damage at 0 HP counts as death save failure
    if (target.side === "hero" && target.hp === 0 && target.conditions?.Unconscious && !target.dead) {
      const fails = isCrit ? 2 : 1;
      target.deathSaves.fail += fails;
      events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target), text: `☠️ 受創失敗+${fails}`, color: "#ef4444" });
      if (target.deathSaves.fail >= 3) {
        target.dead = true;
        delete target.conditions.Unconscious;
        battle.logs.push(`🪦 ${target.name} 在昏迷中受到致命打擊，陣亡！`);
      }
    } else {
      const wasSleeping = target.hp > 0 && Boolean(target.conditions?.Unconscious);
      target.hp = Math.max(0, target.hp - finalDmg);
      if (wasSleeping && target.hp > 0) {
        delete target.conditions.Unconscious;
        battle.logs.push(`💢 ${target.name} 受到傷害驚醒！`);
      }
      const dtName = DMG_LABEL[String(damageType).toLowerCase()] || damageType;
      const badge = isCrit ? "暴擊!" : note ? `(${note})` : "";
      events.push({
        type: "hit",
        unitId: target.id,
        dmg: finalDmg,
        crit: isCrit,
        damageType: dtLower,
      });
      events.push({
        type: "float",
        x: target.x,
        y: target.y,
        z: getUnitBaseH(battle, target) + 1.15,
        text: isCrit ? `🔥 CRIT! -${finalDmg} ${dtName}` : `💥 HIT! -${finalDmg} ${dtName}${badge}`,
        color: isCrit ? "#fbbf24" : "#f87171",
        variant: isCrit ? "crit" : "hit",
      });

      // Concentration check
      if (target.concentration && target.hp > 0) {
        const dc = Math.max(10, Math.floor(finalDmg / 2));
        const conSave = rollDie(battle.rng, 20) + (target.mods?.con ?? 0) + (target.saves?.includes("con") ? target.profBonus : 0);
        if (conSave < dc) {
          const lostSpell = target.concentration.name;
          clearConcentration(battle, target);
          battle.logs.push(`💫 ${target.name} 專注檢定 ${conSave} < DC ${dc}，「${lostSpell}」中斷！`);
          events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.5, text: "專注中斷!", color: "#f59e0b" });
        }
      }

      if (target.hp > 0 && target.side === "foe" && target.hp <= Math.ceil(target.maxHp * 0.35)) {
        emitSpeechBubble(battle, target, "low_hp", events);
      }
      if (target.hp > 0 && target.side === "foe" && target.hp <= Math.ceil(target.maxHp * 0.5)) {
        triggerBattleScriptLine(battle, "foeHalfHp", target, events);
      }

      if (target.hp === 0) {
        clearConcentration(battle, target);
        if (target.side === "hero") {
          target.conditions.Unconscious = 99;
          target.conditions.Prone = 99;
          target.deathSaves = { success: 0, fail: 0, stabilized: false };
          events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.4, text: "倒地瀕死！", color: "#fb923c" });
          battle.logs.push(`🩸 ${target.name} HP 歸 0 昏迷瀕死！（需隊友急救或擲死亡豁免）`);
          triggerBattleScriptLine(battle, "heroDown", null, events);
        } else if (battle.nonLethal) {
          target.captured = true;
          target.conditions.Unconscious = 99;
          target.conditions.Prone = 99;
          events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.4, text: "🥊 擊暈俘虜!", color: "#38bdf8" });
          battle.logs.push(`🥊 【留活口】${target.name} 被擊暈俘虜（可戰後審問）！`);
          spawnEnemyLootDrop(battle, target, events);
        } else {
          events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.4, text: "擊倒!", color: "#f87171" });
          battle.logs.push(`☠️ ${target.name} 被擊倒！`);
          spawnEnemyLootDrop(battle, target, events);
        }
      }
    }
  } else if (note === "免疫") {
    events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.0, text: "免疫 IMMUNE", color: "#cbd5e1" });
  }

  return finalDmg;
}

function clearConcentration(battle, caster) {
  if (!caster?.concentration) return;
  const { targetId, conditionKey } = caster.concentration;
  if (targetId && conditionKey) {
    const t = battle.units.find((u) => u.id === targetId);
    if (t && t.conditions?.[conditionKey]) delete t.conditions[conditionKey];
  }
  caster.concentration = null;
}

function triggerPropDualStateEvent(battle, prop, actor, events = []) {
  if (!prop?.triggerEffect || prop._triggerFired) return;
  prop._triggerFired = true;
  const eff = prop.triggerEffect;
  const heroes = battle.units.filter((u) => u.side === "hero" && !u.dead);
  const foes = battle.units.filter((u) => u.side === "foe" && u.hp > 0);

  if (eff === "open_gate") {
    for (const lp of battle.map.props || []) {
      if (lp.id === prop.linkedPropId || (lp.id !== prop.id && Math.max(Math.abs(lp.x - prop.x), Math.abs(lp.y - prop.y)) <= 2 && /門|gate|door|柵/i.test(lp.name || ""))) {
        lp.broken = true;
        lp.completed = true;
        lp.blocksMove = false;
      }
    }
    for (const h of heroes) {
      if (h.conditions?.Restrained && Math.max(Math.abs(h.x - prop.x), Math.abs(h.y - prop.y)) <= 3) {
        delete h.conditions.Restrained;
      }
    }
    refreshMapDerivedFlags(battle.map.grid, battle.map.props);
    events.push({ type: "float", x: prop.x, y: prop.y, z: 1.6, text: "🚪 機關開啟通道!", color: "#34d399" });
    battle.logs.push(`🚪 【雙態機關觸發】${prop.name} 開啟了封鎖的通道！`);
  } else if (eff === "flood_water" || eff === "ignite_oil") {
    const surf = eff === "flood_water" ? "water" : "fire";
    const cells = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = prop.x + dx;
        const ny = prop.y + dy;
        const t = battle.map.grid[ny]?.[nx];
        if (t?.walkable) {
          t.surface = surf;
          cells.push({ x: nx, y: ny });
        }
      }
    }
    events.push({ type: "surface_chain", reaction: eff, cells });
    battle.logs.push(`${eff === "flood_water" ? "🌊" : "🔥"} 【雙態機關觸發】${prop.name} 釋放出${eff === "flood_water" ? "洪水" : "烈焰"}覆蓋周圍地形！`);
  } else if (eff === "alarm_suppress") {
    battle.foeWaves = false;
    for (const f of foes) {
      if (Math.max(Math.abs(f.x - prop.x), Math.abs(f.y - prop.y)) <= 3) {
        f.conditions.Stunned = Math.max(f.conditions.Stunned || 0, 1);
      }
    }
    events.push({ type: "float", x: prop.x, y: prop.y, z: 1.6, text: "🔔 援軍中斷!", color: "#fbbf24" });
    battle.logs.push(`🔔 【雙態機關觸發】${prop.name} 破壞了敵軍警戒訊號並震懾周圍敵人！`);
  } else if (eff === "arcane_overcharge") {
    for (const h of heroes) {
      if (h.slots && h.maxSlots?.[1]) {
        h.slots[1] = Math.min(h.maxSlots[1], (h.slots[1] || 0) + 1);
      }
      h.conditions.Blessed = Math.max(h.conditions.Blessed || 0, 2);
    }
    events.push({ type: "float", x: prop.x, y: prop.y, z: 1.6, text: "🔮 奧術充能!", color: "#c084fc" });
    battle.logs.push(`🔮 【雙態機關觸發】${prop.name} 釋放奧術能量，為我方回復 1 環法術位並賦予祝福！`);
  }
}

function damagePropsInArea(battle, cells, dmg, events) {
  let brokenAny = false;
  for (const c of cells) {
    for (const p of battle.map.props || []) {
      if (!p.broken && p.x === c.x && p.y === c.y) {
        p.hp = Math.max(0, p.hp - dmg);
        if (p.hp === 0) {
          p.broken = true;
          p.blocksMove = false;
          brokenAny = true;
          events.push({ type: "prop_break", propId: p.id, x: p.x, y: p.y });
          events.push({ type: "float", x: p.x, y: p.y, z: battle.map.grid[p.y][p.x].h + 0.8, text: `💥 ${p.name}碎裂`, color: "#fdba74" });
          battle.logs.push(`💥 ${p.name} 在衝擊中被摧毀（已切換破損狀態）！`);
          triggerPropDualStateEvent(battle, p, null, events);
        }
      }
    }
  }
  if (brokenAny) refreshMapDerivedFlags(battle.map.grid, battle.map.props);
}

function tryAutoShieldReaction(battle, defender, rollTotal, effAc, isMagicMissile = false, events = []) {
  if (!defender || defender.dead || defender.hp <= 0) return false;
  if (defender.reactionLeft <= 0 || !defender.autoReactions?.shield) return false;
  const hasShield = defender.spells?.some((s) => s.key === "Shield");
  if (!hasShield) return false;

  const slotLvl = [1, 2, 3, 4, 5].find((lv) => (defender.slots?.[lv] || 0) > 0);
  if (!slotLvl) return false;

  if (!isMagicMissile && (rollTotal < effAc || rollTotal >= effAc + 5)) {
    return false;
  }

  defender.slots[slotLvl] -= 1;
  defender.reactionLeft = 0;
  defender.conditions.Shielded = 1;
  events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.3, text: "🛡️ 自動護盾術 AC+5!", color: "#60a5fa" });
  battle.logs.push(`🛡️ ${defender.name} 自動消耗 ${slotLvl} 環與反應施放【護盾術】！`);
  return true;
}

function setUnitProne(unit, fromX = null, fromY = null) {
  if (!unit) return;
  unit.conditions.Prone = 99;
  if (fromX !== null && fromY !== null && (fromX !== unit.x || fromY !== unit.y)) {
    unit.proneDir = { dx: Math.sign(unit.x - fromX), dy: Math.sign(unit.y - fromY) };
  } else if (unit.facingTarget) {
    unit.proneDir = {
      dx: Math.sign((unit.facingTarget.x ?? unit.x) - unit.x),
      dy: Math.sign((unit.facingTarget.y ?? unit.y) - unit.y),
    };
  }
}

export function applyKnockback(battle, target, dirX, dirY, pushCells, events = []) {
  if (target?.telegraphing) {
    target.telegraphing = null;
    target.conditions.Stunned = Math.max(target.conditions.Stunned || 0, 1);
    events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.5, text: "💥 蓄力打斷!", color: "#38bdf8" });
    battle.logs.push(`💥 ${target.name} 被擊退打斷蓄力，陷入震懾狀態！`);
  }
  const sx = Math.sign(dirX);
  const sy = Math.sign(dirY);
  if ((sx === 0 && sy === 0) || pushCells <= 0) return;

  for (let step = 0; step < pushCells; step++) {
    if (target.hp <= 0 || target.dead) break;
    const oldH = getUnitBaseH(battle, target);
    const nx = target.x + sx;
    const ny = target.y + sy;

    if (!inMapBounds(nx, ny)) {
      const slamDmg = rollDiceExpr(battle.rng, "1d6").total;
      battle.logs.push(`🧱 ${target.name} 被擊退撞上岩壁，受 ${slamDmg} 點鈍擊傷！`);
      applyDamageToUnit(battle, target, slamDmg, "bludgeoning", false, events);
      break;
    }

    const tile = battle.map.grid[ny][nx];
    const hitProp = (battle.map.props || []).find((p) => !p.broken && p.x === nx && p.y === ny && p.blocksMove);
    if (tile.type === "wall" || tile.type === "stalagmite" || hitProp) {
      const slamDmg = rollDiceExpr(battle.rng, "1d6").total;
      battle.logs.push(`🧱 ${target.name} 被擊退撞擊障礙，受 ${slamDmg} 點鈍擊傷！`);
      applyDamageToUnit(battle, target, slamDmg, "bludgeoning", false, events);
      if (hitProp) damagePropsInArea(battle, [{ x: nx, y: ny }], slamDmg, events);
      break;
    }

    if (tile.type === "chasm") {
      const chasmDmg = rollDiceExpr(battle.rng, "2d6").total;
      target.conditions.Prone = 99;
      battle.logs.push(`🕳️ ${target.name} 被推入深淵裂縫，重摔回岸緣受 ${chasmDmg} 點傷害並倒地！`);
      applyDamageToUnit(battle, target, chasmDmg, "bludgeoning", false, events);
      break;
    }

    if (!canFootprintStandAt(battle, target, nx, ny, false)) break;

    const fromPos = { x: target.x, y: target.y };
    target.x = nx;
    target.y = ny;
    events.push({ type: "move", unitId: target.id, path: [fromPos, { x: nx, y: ny }] });

    const newH = getUnitBaseH(battle, target);
    const drop = oldH - newH;
    if (drop >= 2) {
      const fallDice = `${Math.max(1, Math.floor(drop / 2))}d6`;
      const fallDmg = rollDiceExpr(battle.rng, fallDice).total;
      target.conditions.Prone = 99;
      battle.logs.push(`⬇️ ${target.name} 從高台墜落（落差 ${drop} 階），受 ${fallDmg} 點墜落傷並倒地！`);
      applyDamageToUnit(battle, target, fallDmg, "bludgeoning", false, events);
    }

    triggerTileHazardOnEnter(battle, target, events);
  }
}

function triggerTileHazardOnEnter(battle, unit, events) {
  if (!unit || unit.hp <= 0 || unit.dead || unit.flies) return;
  for (const c of getUnitCells(unit)) {
    const t = battle.map.grid[c.y]?.[c.x];
    if (!t) continue;
    if (t.surface === "fire" || t.type === "brazier") {
      const fd = rollDiceExpr(battle.rng, "1d6").total;
      battle.logs.push(`🔥 ${unit.name} 踏入火焰，受 ${fd} 點火焰傷害。`);
      applyDamageToUnit(battle, unit, fd, "fire", false, events);
      break;
    }
    if (t.surface === "electrified_water") {
      const ld = rollDiceExpr(battle.rng, "1d4").total;
      battle.logs.push(`⚡ ${unit.name} 踏入通電水面，受 ${ld} 點閃電傷害。`);
      applyDamageToUnit(battle, unit, ld, "lightning", false, events);
      break;
    }
    if (t.surface === "poison") {
      const pd = rollDiceExpr(battle.rng, "1d6").total;
      const conSave = rollDie(battle.rng, 20) + (unit.mods?.con ?? 0);
      if (conSave < 12) unit.conditions.Poisoned = Math.max(unit.conditions.Poisoned || 0, 2);
      battle.logs.push(`☠️ ${unit.name} 身處劇毒霧氣，受 ${pd} 點毒素傷害${conSave < 12 ? "並中毒！" : "。"}`);
      applyDamageToUnit(battle, unit, pd, "poison", false, events);
      break;
    }
    if (t.surface === "ice" && !unit.conditions?.Prone) {
      const acroBonus = Math.max(unit.mods?.dex ?? 0, unit.skillBonuses?.acrobatics ?? -99);
      const dexSave = rollDie(battle.rng, 20) + acroBonus;
      if (dexSave < 11) {
        setUnitProne(unit);
        events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: "❄️ 滑倒!", color: "#bae6fd" });
        battle.logs.push(`❄️ ${unit.name} 在冰面滑倒（特技/DEX豁免 ${dexSave} < DC 11）！`);
      }
      break;
    }
    if (t.surface === "grease" && !unit.conditions?.Prone) {
      const acroBonus = Math.max(unit.mods?.dex ?? 0, unit.skillBonuses?.acrobatics ?? -99);
      const dexSave = rollDie(battle.rng, 20) + acroBonus;
      if (dexSave < 12) {
        setUnitProne(unit);
        events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: "🛢️ 油膩滑倒!", color: "#f59e0b" });
        battle.logs.push(`🛢️ ${unit.name} 踩入油膩術範圍滑倒（特技/DEX豁免 ${dexSave} < DC 12）！`);
      }
      break;
    }
  }
}

export function executeMove(battle, unitId, destX, destY) {
  const unit = battle.units.find((u) => u.id === unitId);
  const events = [];
  if (!unit || unit.dead || (unit.side === "hero" && unit.hp === 0)) {
    return { ok: false, reason: "單位無法移動", events, battleEnded: false };
  }
  const reachMap = computeReachable3D(battle, unit);
  const entry = reachMap.get(`${destX},${destY}`);
  if (!entry) {
    return { ok: false, reason: "目標格超出移動力或受地形阻擋", events, battleEnded: false };
  }

  // 1B Automatic Opportunity Attacks when leaving hostile reach without Disengage
  if (!unit.turn?.disengaged && entry.path.length > 1) {
    const startAdjacent = getAdjacentHostiles(battle, unit, unit.x, unit.y);
    for (const enemy of startAdjacent) {
      if (enemy.reactionLeft <= 0 || !enemy.autoReactions?.opportunityAttack) continue;
      if (unit.abilities?.some((ab) => ab.mechanics?.preventsOpportunityAttacks && ab.usesLeft === 0)) continue;
      const reach = Math.max(1, ...(enemy.weapons || []).map((w) => (w.isRanged ? 1 : w.rangeCells || 1)));
      const leavesReach = entry.path.slice(1).some((step) => unitGridDistance(unit, enemy, step.x, step.y) > reach);
      if (!leavesReach) continue;

      enemy.reactionLeft = 0;
      const wpn = enemy.weapons?.find((w) => !w.isRanged) || enemy.weapons?.[0];
      if (wpn) {
        const oaRes = resolveAttackInternal(battle, enemy, unit, wpn, { isOa: true }, events);
        battle.logs.push(`⚡ 【藉機攻擊】${enemy.name} 攔截 ${unit.name}（${oaRes.summary}）`);
        if (unit.hp === 0 || unit.dead) {
          return { ok: true, interrupted: true, events, battleEnded: checkBattleOutcome(battle) };
        }
      }
    }
  }

  unit.x = destX;
  unit.y = destY;
  if (unit.turn) {
    unit.turn.movementLeft = Math.max(0, unit.turn.movementLeft - entry.cost);
  }
  if (destX !== unit.x || destY !== unit.y) {
    unit.facingTarget = { x: destX + (destX - unit.x), y: destY + (destY - unit.y) };
  }
  events.push({ type: "move", unitId: unit.id, path: entry.path });
  if (unit.side === "hero" && Array.isArray(battle.map.drops) && battle.map.drops.length > 0) {
    const stepSet = new Set(entry.path.map((p) => `${p.x},${p.y}`));
    for (let i = battle.map.drops.length - 1; i >= 0; i--) {
      const dr = battle.map.drops[i];
      if (stepSet.has(`${dr.x},${dr.y}`)) {
        battle.map.drops.splice(i, 1);
        if (dr.keyId || dr.kind === "key" || /鑰匙|key/i.test(dr.name || "")) {
          battle.partyKeys = battle.partyKeys || [];
          const kId = dr.keyId || dr.name || "prison_key";
          if (!battle.partyKeys.includes(kId)) battle.partyKeys.push(kId);
          events.push({ type: "float", x: dr.x, y: dr.y, z: getUnitBaseH(battle, unit) + 1.35, text: `🗝️ 拾獲 ${dr.name || "鑰匙"}!`, color: "#fbbf24" });
          battle.logs.push(`🗝️ ${unit.name} 撿起關鍵鑰匙【${dr.name || kId}】！`);
        } else {
          addHeroConsumable(unit, dr.kind);
          events.push({ type: "float", x: dr.x, y: dr.y, z: getUnitBaseH(battle, unit) + 1.25, text: `🎁 拾獲 ${dr.name}+1`, color: "#4ade80" });
          battle.logs.push(`🎁 ${unit.name} 撿起敵人掉落的【${dr.name}】！`);
        }
      }
    }
  }
  triggerTileHazardOnEnter(battle, unit, events);

  return {
    ok: true,
    cost: entry.cost,
    path: entry.path,
    events,
    battleEnded: checkBattleOutcome(battle),
  };
}

export function executeStandUp(battle, unitId) {
  const unit = battle.units.find((u) => u.id === unitId);
  const events = [];
  if (!unit || !unit.conditions?.Prone || !unit.turn) {
    return { ok: false, reason: "目前未倒地", events, battleEnded: false };
  }
  const cost = Math.ceil(getEffectiveSpeed(unit) / 2);
  if (unit.turn.movementLeft < cost) {
    return { ok: false, reason: "剩餘移動力不足以起身", events, battleEnded: false };
  }
  unit.turn.movementLeft -= cost;
  delete unit.conditions.Prone;
  events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: "起身!", color: "#93c5fd" });
  battle.logs.push(`🧍 ${unit.name} 消耗一半移動力（${cost} 格）起身。`);
  return { ok: true, events, battleEnded: false };
}

function getSpellAreaCells(battle, caster, spell, targetX, targetY) {
  const shape = spell.aoe?.shape;
  const size = Math.max(1, spell.aoe?.sizeCells || 1);
  const cells = [];

  if (!shape) {
    if (inMapBounds(targetX, targetY)) cells.push({ x: targetX, y: targetY });
    return cells;
  }

  if (shape === "radius") {
    const r = Math.min(3, Math.max(1, Math.round(size / 2)));
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.hypot(dx, dy) > r + 0.35) continue;
        const cx = targetX + dx;
        const cy = targetY + dy;
        if (inMapBounds(cx, cy) && battle.map.grid[cy][cx].type !== "wall") cells.push({ x: cx, y: cy });
      }
    }
  } else if (shape === "cube") {
    const half = Math.floor(size / 2);
    for (let dy = -half; dy <= half; dy++) {
      for (let dx = -half; dx <= half; dx++) {
        const cx = targetX + dx;
        const cy = targetY + dy;
        if (inMapBounds(cx, cy) && battle.map.grid[cy][cx].type !== "wall") cells.push({ x: cx, y: cy });
      }
    }
  } else {
    // cone or line along direction from caster
    const dirX = Math.sign(targetX - caster.x);
    const dirY = Math.sign(targetY - caster.y);
    const len = Math.min(5, Math.max(2, size));
    for (let step = 1; step <= len; step++) {
      const cx = caster.x + dirX * step;
      const cy = caster.y + dirY * step;
      if (inMapBounds(cx, cy) && battle.map.grid[cy][cx].type !== "wall") cells.push({ x: cx, y: cy });
      if (shape === "cone" && step >= 2) {
        const p1x = cx - dirY;
        const p1y = cy + dirX;
        const p2x = cx + dirY;
        const p2y = cy - dirX;
        if (inMapBounds(p1x, p1y) && battle.map.grid[p1y][p1x].type !== "wall") cells.push({ x: p1x, y: p1y });
        if (inMapBounds(p2x, p2y) && battle.map.grid[p2y][p2x].type !== "wall") cells.push({ x: p2x, y: p2y });
      }
    }
  }
  return cells;
}

export function getSpellEffectiveRange(battle, caster, spell) {
  const raw = spell?.rangeCells ?? 6;
  const scaled = raw === 0 ? 0 : Math.max(1, Math.min(10, raw >= 12 ? Math.round(raw / 2.5) : raw));
  const cH = getUnitBaseH(battle, caster);
  if (scaled > 1 && cH >= 3) return scaled + 2;
  return scaled;
}

export function computeCombatForecast(battle, attackerId, spec, targetX, targetY) {
  const attacker = battle.units.find((u) => u.id === attackerId);
  if (!attacker) return { valid: false, reason: "找不到行動者" };

  if (spec.kind === "weapon") {
    const wpn = attacker.weapons.find((w) => w.id === spec.weaponId) || attacker.weapons[0];
    const target = getUnitAtCell(battle, targetX, targetY, attacker.id);
    if (!target || target.side === attacker.side || target.hp <= 0) {
      return { valid: false, reason: "請選擇射程內敵人" };
    }
    const baseRange = wpn.rangeCells || 1;
    const modsEval = evaluateAttackModifiers(battle, attacker, target, {
      isRanged: wpn.isRanged,
      isMelee: !wpn.isRanged,
      hitBonusOverride: wpn.hitBonus,
    });
    const effRange = baseRange + modsEval.rangeBonus;
    const dist = unitGridDistance(attacker, target);
    if (wpn.reach && dist < 2) return { valid: false, reason: "長柄武器僅能攻擊 10 呎外（無法攻擊相鄰 5 呎目標）" };
    if (dist > effRange) return { valid: false, reason: `超出射程（${dist} > ${effRange} 格）` };
    if (modsEval.blocked) return { valid: false, reason: "視線被岩壁/高障礙阻擋" };

    const { min, max } = diceMinMax(wpn.damageDice, modsEval.dmgBonus);
    const needed = modsEval.effAc - modsEval.hitBonus;
    const hitPct = computeD20HitProb(needed, modsEval.advState);
    const dmgRes = applyTypedDamage(target, Math.round((min + max) / 2), wpn.damageType);
    const resNotes = [...modsEval.tags];
    if (dmgRes.note) resNotes.push(dmgRes.note);
    if (attacker.sneakDice) resNotes.push(`可觸發偷襲 +${attacker.sneakDice}`);

    return {
      valid: true,
      title: `${attacker.name} ➔ ${target.name}`,
      actionName: wpn.name,
      hitPct,
      effAc: modsEval.effAc,
      dmgMin: min,
      dmgMax: max,
      damageType: DMG_LABEL[wpn.damageType] || wpn.damageType,
      modifiers: resNotes,
      affectedTargets: [target.id],
      aoeCells: [{ x: targetX, y: targetY }],
    };
  }

  if (spec.kind === "shove") {
    const target = getUnitAtCell(battle, targetX, targetY, attacker.id);
    if (!target || target.side === attacker.side || unitGridDistance(attacker, target) > 1) {
      return { valid: false, reason: "須相鄰 1 格內敵人才能推擊" };
    }
    const aStr = (attacker.mods?.str ?? 0) + (attacker.profBonus || 2);
    const dAth = Math.max(target.mods?.str ?? 0, target.mods?.dex ?? 0);
    const winPct = Math.max(25, Math.min(85, 50 + (aStr - dAth) * 5));
    const dx = Math.sign(target.x - attacker.x);
    const dy = Math.sign(target.y - attacker.y);
    const pushTile = inMapBounds(target.x + dx, target.y + dy) ? battle.map.grid[target.y + dy][target.x + dx] : null;
    const mods = [];
    if (!pushTile || pushTile.type === "wall" || pushTile.type === "stalagmite") mods.push("撞牆鈍擊 +1d6");
    else if (pushTile.type === "chasm") mods.push("推落深淵 +2d6＆倒地!");
    else if (getUnitBaseH(battle, target) - pushTile.h >= 2) mods.push("推落高台墜落傷＆倒地!");
    else mods.push("擊退 1 格");

    return {
      valid: true,
      title: `${attacker.name} 推擊 ${target.name}`,
      actionName: "力量推擊 (Shove)",
      hitPct: winPct,
      dmgMin: 0,
      dmgMax: 6,
      damageType: "位移控制",
      modifiers: mods,
      affectedTargets: [target.id],
      aoeCells: [{ x: targetX, y: targetY }],
    };
  }

  if (spec.kind === "spell") {
    const spell = attacker.spells?.find((s) => s.key === spec.spellKey);
    if (!spell) return { valid: false, reason: "尚未學會此法術" };
    const effRange = getSpellEffectiveRange(battle, attacker, spell);
    const dist = Math.max(Math.abs(targetX - attacker.x), Math.abs(targetY - attacker.y));
    if (dist > effRange) return { valid: false, reason: `超出法術射程（${dist} > ${effRange} 格）` };

    if (spell.attackType === "teleport") {
      const t = battle.map.grid[targetY]?.[targetX];
      if (!t?.walkable || getUnitAtCell(battle, targetX, targetY)) return { valid: false, reason: "無法傳送至此格" };
      return {
        valid: true,
        title: `${attacker.name} 瞬移`,
        actionName: spell.name,
        hitPct: 100,
        dmgMin: 0,
        dmgMax: 0,
        damageType: "空間傳送",
        modifiers: ["不觸發藉機攻擊"],
        affectedTargets: [],
        aoeCells: [{ x: targetX, y: targetY }],
      };
    }

    if (spell.attackType === "heal") {
      const ally = getUnitAtCell(battle, targetX, targetY);
      if (!ally || ally.side !== attacker.side || ally.dead) return { valid: false, reason: "請點選需要治療的友方單位" };
      const modBonus = spell.addSpellMod ? Math.max(1, (attacker.spellAtkBonus || 4) - attacker.profBonus) : 0;
      const { min, max } = diceMinMax(spell.healDice || "1d4", modBonus);
      return {
        valid: true,
        title: `${attacker.name} ➔ ${ally.name}`,
        actionName: spell.name,
        hitPct: 100,
        dmgMin: min,
        dmgMax: max,
        damageType: "生命恢復",
        modifiers: ally.hp === 0 ? ["喚醒瀕死倒地隊友!"] : ["穩定回復"],
        affectedTargets: [ally.id],
        aoeCells: [{ x: targetX, y: targetY }],
      };
    }

    const aoeCells = getSpellAreaCells(battle, attacker, spell, targetX, targetY);
    const hitUnits = new Set();
    for (const c of aoeCells) {
      const u = getUnitAtCell(battle, c.x, c.y);
      if (u && u.hp > 0) hitUnits.add(u);
    }

    const upDelta = Math.max(0, (spec.upcastLevel || spell.level) - (spell.level || 0));
    const dmgExpr = spell.damageDice || "1d8";
    const baseRange = diceMinMax(dmgExpr);
    const upRange = upDelta > 0 && spell.upcastDice ? diceMinMax(spell.upcastDice) : { min: 0, max: 0 };
    const totalMin = baseRange.min + upRange.min * upDelta;
    const totalMax = baseRange.max + upRange.max * upDelta;

    const targetList = [...hitUnits];
    const primary = targetList.find((u) => u.side !== attacker.side) || targetList[0];
    let hitPct = 100;
    const mods = [];
    if (spell.attackType === "ranged_spell" || spell.attackType === "melee_spell") {
      if (!primary) return { valid: false, reason: "請瞄準敵人" };
      const ev = evaluateAttackModifiers(battle, attacker, primary, {
        isRanged: spell.attackType === "ranged_spell",
        isMelee: spell.attackType === "melee_spell",
        hitBonusOverride: attacker.spellAtkBonus,
      });
      if (ev.blocked) return { valid: false, reason: "視線受阻" };
      hitPct = computeD20HitProb(ev.effAc - ev.hitBonus, ev.advState);
      mods.push(...ev.tags);
    } else if (spell.saveAbility) {
      mods.push(`${spell.saveAbility.toUpperCase()} 豁免 DC ${attacker.spellSaveDc}${spell.halfOnSave ? " (半傷)" : ""}`);
      hitPct = 75;
    }

    if (spell.pushCells) mods.push(`強制擊退 ${spell.pushCells} 格`);
    const surfTile = battle.map.grid[targetY]?.[targetX];
    if (String(spell.damageType).toLowerCase() === "fire" && surfTile?.surface === "oil") mods.push("⚡ 連鎖：引燃油面爆燃!");
    if (String(spell.damageType).toLowerCase() === "lightning" && (surfTile?.type === "water" || surfTile?.surface === "water")) mods.push("⚡ 連鎖：水面全面通電!");

    return {
      valid: true,
      title: `${spell.name}${upDelta > 0 ? ` (${spec.upcastLevel}環)` : ""}`,
      actionName: `命中 ${targetList.length} 名單位`,
      hitPct,
      dmgMin: totalMin,
      dmgMax: totalMax,
      damageType: DMG_LABEL[String(spell.damageType || "").toLowerCase()] || "法術",
      modifiers: mods,
      affectedTargets: targetList.map((u) => u.id),
      aoeCells,
    };
  }

  if (spec.kind === "potion") {
    const ally = getUnitAtCell(battle, targetX, targetY);
    if (!ally || ally.side !== attacker.side || ally.dead) {
      return { valid: false, reason: "請選擇自己或相鄰 1 格內友方單位" };
    }
    if (unitGridDistance(attacker, ally) > 1) {
      return { valid: false, reason: "隊友不在相鄰 1 格內" };
    }
    const pot = attacker.potions?.find((p) => p.qty > 0);
    if (!pot) return { valid: false, reason: "已無治療藥水" };
    const { min, max } = diceMinMax(pot.effect?.dice || "2d4+2");
    return {
      valid: true,
      title: `${attacker.name} ➔ ${ally.name}`,
      actionName: pot.name,
      hitPct: 100,
      dmgMin: min,
      dmgMax: max,
      damageType: "治療恢復",
      modifiers: ally.hp === 0 ? ["喚醒瀕死倒地隊友！"] : ["立即恢復生命"],
      affectedTargets: [ally.id],
      aoeCells: [{ x: targetX, y: targetY }],
    };
  }

  return { valid: false, reason: "未知動作" };
}

function resolveAttackInternal(battle, attacker, defender, wpn, opts = {}, events = []) {
  const ev = evaluateAttackModifiers(battle, attacker, defender, {
    isRanged: wpn.isRanged,
    isMelee: !wpn.isRanged,
    hitBonusOverride: wpn.hitBonus,
  });
  if (ev.blocked && !opts.isOa) {
    return { ok: false, hit: false, summary: "視線被遮擋" };
  }

  const r1 = rollDie(battle.rng, 20);
  const famBuff = attacker.turn?.familiarBuff;
  const effectiveAdv = (attacker.turn?.verdictReady || famBuff?.adv) ? "adv" : ev.advState;
  const r2 = effectiveAdv !== "normal" ? rollDie(battle.rng, 20) : r1;
  let rawD20 = effectiveAdv === "adv" ? Math.max(r1, r2) : effectiveAdv === "disadv" ? Math.min(r1, r2) : r1;
  if (attacker.luckyReroll && rawD20 <= 3) {
    const reroll = rollDie(battle.rng, 20);
    if (reroll > rawD20) rawD20 = reroll;
  }
  const studiedBonus = attacker.turn?.studiedBonus ? 2 : 0;
  const ownerUnit = attacker.isCompanion && attacker.ownerId
    ? battle.units.find((u) => u.id === attacker.ownerId && !u.dead && u.hp > 0)
    : null;
  const compSynergyHit = ownerUnit && unitGridDistance(attacker, ownerUnit) <= 2 ? 2 : 0;
  const famHit = famBuff?.hitBonus || 0;
  const totalHitBonus = ev.hitBonus + studiedBonus + compSynergyHit + famHit;
  const rollTotal = rawD20 + totalHitBonus;

  const baseWpnHit = wpn.hitBonus ?? 4;
  const advTag = effectiveAdv === "adv" ? `優勢[${r1},${r2}]` : effectiveAdv === "disadv" ? `劣勢[${r1},${r2}]` : "";
  const diceParts = [
    `1d20(${rawD20}${advTag ? ` ${advTag}` : ""})`,
    `基礎(${baseWpnHit >= 0 ? "+" : ""}${baseWpnHit})`,
    ...(ev.modifiers || []),
    ...(studiedBonus ? ["研判+2"] : []),
    ...(compSynergyHit ? ["主僕協同+2"] : []),
    ...(famHit ? [`魔寵+${famHit}`] : []),
  ];
  const diceFormula = `${diceParts.join(" + ")} = ${rollTotal} vs AC ${ev.effAc}`;

  const critMin = attacker.turn?.verdictReady ? 17 : attacker.critThreshold || 20;
  if (attacker.turn?.verdictReady) attacker.turn.verdictReady = false;
  let isCrit = rawD20 >= critMin || ev.isMeleeAutoCrit;
  let effAc = ev.effAc;
  let hit = rawD20 !== 1 && (isCrit || rollTotal >= effAc);

  if (hit && defender.hasEvasion50 && rollDie(battle.rng, 2) === 1) {
    hit = false;
    events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.35, text: "💨 50%閃避!", color: "#38bdf8" });
    battle.logs.push(`💨 ${defender.name} 發動【常駐 50% 閃避】，閃開了 ${attacker.name} 的攻擊！`);
  }

  if (hit && !isCrit && tryAutoShieldReaction(battle, defender, rollTotal, effAc, false, events)) {
    effAc += 5;
    hit = rollTotal >= effAc;
  }

  attacker.facingTarget = { x: defender.x, y: defender.y };
  events.push({
    type: "lunge",
    unitId: attacker.id,
    toX: defender.x,
    toY: defender.y,
  });
  const wpnStyle = wpn.isRanged
    ? "ranged"
    : wpn.isShieldBash || wpn.damageType === "bludgeoning"
      ? "bludgeon"
      : wpn.damageType === "piercing" || wpn.reach
        ? "pierce"
        : "slash";
  events.push({
    type: wpn.isRanged ? "bolt" : "strike",
    isSpell: Boolean(wpn.isSpell),
    weaponStyle: wpnStyle,
    dmgType: wpn.damageType || "slashing",
    fromX: attacker.x,
    fromY: attacker.y,
    fromZ: getUnitBaseH(battle, attacker),
    toX: defender.x,
    toY: defender.y,
    toZ: getUnitBaseH(battle, defender),
    color: wpn.isRanged ? "#fbbf24" : wpnStyle === "bludgeon" ? "#fb923c" : wpnStyle === "pierce" ? "#38bdf8" : "#f87171",
  });

  if (!hit) {
    events.push({
      type: "miss",
      unitId: defender.id,
      fromX: attacker.x,
      fromY: attacker.y,
    });
    events.push({
      type: "float",
      x: defender.x,
      y: defender.y,
      z: getUnitBaseH(battle, defender) + 1.15,
      text: "💨 MISSING!",
      color: "#cbd5e1",
      variant: "miss",
    });
    if (
      !wpn.isRanged &&
      !opts.isRiposte &&
      !opts.isOa &&
      defender.hp > 0 &&
      !defender.dead &&
      (defender.reactionLeft || 0) > 0 &&
      defender.autoReactions?.riposte &&
      unitGridDistance(defender, attacker) <= 2
    ) {
      const counterWpn = defender.weapons?.find((w) => !w.isRanged) || defender.weapons?.[0];
      if (counterWpn) {
        defender.reactionLeft -= 1;
        events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.45, text: "⚡ 破綻反擊!", color: "#38bdf8" });
        const ripRes = resolveAttackInternal(battle, defender, attacker, counterWpn, { isRiposte: true }, events);
        battle.logs.push(`⚡ 【破綻反擊】${defender.name} 閃過攻擊並立即反擊 ${attacker.name}（${ripRes.summary}）`);
      }
    }
    if (attacker.side === "hero") {
      events.push({
        type: "dice",
        side: "hero",
        role: "attack",
        actorName: attacker.name,
        targetName: defender.name,
        actionName: wpn.name,
        d20: rawD20,
        advState: effectiveAdv,
        rolls: effectiveAdv !== "normal" ? [r1, r2] : [rawD20],
        modTotal: totalHitBonus,
        modifiers: diceParts.slice(1),
        total: rollTotal,
        targetValue: effAc,
        targetLabel: "AC",
        formula: `${diceParts.join(" · ")} = ${rollTotal} vs AC ${effAc}`,
        hit: false,
        crit: false,
      });
    } else if (defender.side === "hero") {
      events.push({
        type: "dice",
        side: "foe",
        role: "enemy_attack",
        actorName: attacker.name,
        targetName: defender.name,
        actionName: wpn.name,
        d20: rawD20,
        advState: effectiveAdv,
        rolls: effectiveAdv !== "normal" ? [r1, r2] : [rawD20],
        modTotal: totalHitBonus,
        modifiers: diceParts.slice(1),
        total: rollTotal,
        targetValue: effAc,
        targetLabel: "我方 AC",
        formula: `${diceParts.join(" · ")} = ${rollTotal} vs 我方 AC ${effAc}`,
        hit: false,
        crit: false,
      });
    }
    return { ok: true, hit: false, dmg: 0, summary: `🎲 ${diceParts.join(" · ")} = ${rollTotal} 未命中 AC ${effAc}` };
  }

  // Sneak Attack (once per turn when adv OR ally adjacent to defender)
  const allyFlanking = battle.units.some(
    (ally) => ally.id !== attacker.id && ally.side === attacker.side && !ally.dead && ally.hp > 0 && unitGridDistance(ally, defender) <= 1
  );
  const dmgExpr = wpn.damageDice || "1d6";
  const baseDmgRoll = rollDiceExpr(battle.rng, dmgExpr, isCrit);
  let rawDmg = baseDmgRoll.total + ev.dmgBonus;
  const dmgDice = baseDmgRoll.rolls.map((v) => ({ sides: baseDmgRoll.sides, value: v, tag: `d${baseDmgRoll.sides}` }));
  const bonusTags = [];

  if (attacker.sneakDice && !attacker.turn?.sneakUsed && (ev.advState === "adv" || allyFlanking)) {
    const sneakRoll = rollDiceExpr(battle.rng, attacker.sneakDice, isCrit);
    rawDmg += sneakRoll.total;
    for (const v of sneakRoll.rolls) dmgDice.push({ sides: sneakRoll.sides, value: v, tag: "偷襲" });
    if (attacker.turn) attacker.turn.sneakUsed = true;
    bonusTags.push(`偷襲+${sneakRoll.total}`);
  }
  if (attacker.turn?.studiedBonus) {
    const stRoll = rollDiceExpr(battle.rng, "1d6", isCrit);
    rawDmg += stRoll.total;
    for (const v of stRoll.rolls) dmgDice.push({ sides: stRoll.sides, value: v, tag: "研判" });
    attacker.turn.studiedBonus = false;
    bonusTags.push(`弱點研判+${stRoll.total}`);
  }
  if (compSynergyHit > 0) {
    const synDmg = rollDie(battle.rng, 4);
    rawDmg += synDmg;
    dmgDice.push({ sides: 4, value: synDmg, tag: "協同" });
    bonusTags.push(`主僕協同+${synDmg}`);
  }
  if (attacker.turn?.familiarBuff) {
    const fb = attacker.turn.familiarBuff;
    const fRoll = rollDiceExpr(battle.rng, fb.dmgDice || "1d4", isCrit);
    rawDmg += fRoll.total;
    for (const v of fRoll.rolls) dmgDice.push({ sides: fRoll.sides, value: v, tag: "魔寵" });
    bonusTags.push(`${fb.label || "魔寵協力"}+${fRoll.total}`);
    attacker.turn.familiarBuff = null;
  }
  if (attacker.stormRage && attacker.conditions?.Rage && !wpn.isRanged) {
    const stormDmg = rollDie(battle.rng, 4);
    rawDmg += stormDmg;
    bonusTags.push(`風暴雷怒+${stormDmg}`);
  }
  if (wpn.isShieldBash && defender.hp > 0 && rollDie(battle.rng, 2) === 1) {
    defender.conditions.Prone = 99;
    events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.35, text: "🛡️ 盾擊倒地!", color: "#fbbf24" });
    bonusTags.push("盾擊倒地");
  }

  // Optional Divine Smite on hit for Paladins when spending Lv1 slot
  if (opts.useSmite && attacker.isPaladin && (attacker.slots?.[1] || 0) > 0) {
    attacker.slots[1] -= 1;
    const extraVsUndead = /undead|fiend/i.test(defender.className || "");
    const smiteDmg = rollDiceExpr(battle.rng, extraVsUndead ? "3d8" : "2d8", isCrit).total;
    bonusTags.push(`至聖斬+${smiteDmg}`);
    applyDamageToUnit(battle, defender, smiteDmg, "radiant", isCrit, events);
  }

  const dealt = applyDamageToUnit(battle, defender, rawDmg, wpn.damageType || "slashing", isCrit, events);
  if (dealt > 0 && wpn.isBomb) {
    const splashTargets = battle.units.filter(
      (u) => u.id !== defender.id && u.side !== attacker.side && u.hp > 0 && unitGridDistance(defender, u) <= 1
    );
    for (const st of splashTargets) {
      const sDmg = rollDie(battle.rng, 6) + 2;
      applyDamageToUnit(battle, st, sDmg, "fire", false, events);
    }
    if (splashTargets.length > 0) bonusTags.push(`爆破濺射x${splashTargets.length}`);
  }
  if (dealt > 0 && attacker.isPoisonMaster && defender.hp > 0) {
    const pDmg = rollDie(battle.rng, 6);
    applyDamageToUnit(battle, defender, pDmg, "poison", false, events);
    defender.conditions.Poisoned = Math.max(defender.conditions.Poisoned || 0, 2);
    bonusTags.push(`劇毒+${pDmg}`);
  }
  if (dealt > 0 && attacker.isLifeSteal && attacker.hp < attacker.maxHp) {
    const leech = Math.max(1, Math.floor(dealt / 2));
    attacker.hp = Math.min(attacker.maxHp, attacker.hp + leech);
    events.push({ type: "float", x: attacker.x, y: attacker.y, z: getUnitBaseH(battle, attacker) + 1.2, text: `🩸 +${leech}`, color: "#4ade80" });
  }
  if (isCrit) emitSpeechBubble(battle, attacker, "crit", events);
  else if (defender.hp <= 0) emitSpeechBubble(battle, attacker, "kill", events);
  else emitSpeechBubble(battle, attacker, "attack", events);

  // Killing-Blow Momentum: slaying a foe grants +2 movement cells once per turn
  if (defender.hp <= 0 && attacker.side === "hero" && attacker.turn && !attacker.turn.momentumUsed) {
    attacker.turn.momentumUsed = true;
    attacker.turn.movementLeft = (attacker.turn.movementLeft || 0) + 2;
    events.push({ type: "float", x: attacker.x, y: attacker.y, z: getUnitBaseH(battle, attacker) + 1.35, text: "⚡ 斬敵氣勢 +2移動", color: "#38bdf8" });
  }

  // Enemy signature status effects on hit (Spider Poison, Ghoul Paralysis, Wolf Knockdown, Horror Frighten)
  if (dealt > 0 && defender.hp > 0 && !defender.dead && attacker.side === "foe") {
    const tid = String(attacker.templateId || "").toLowerCase();
    const aura = getUnitAuraEffects(battle, defender);
    const saveBonus = aura.saveBonus || 0;
    if (/spider|snake|centipede|scorpion/.test(tid)) {
      const save = rollDie(battle.rng, 20) + (defender.mods?.con ?? 0) + saveBonus;
      if (save < 11) {
        defender.conditions.Poisoned = Math.max(defender.conditions.Poisoned || 0, 2);
        events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.35, text: "☠️ 中毒!", color: "#4ade80" });
        battle.logs.push(`☠️ ${defender.name} 體質豁免 ${save} < DC 11，陷入【中毒】！`);
      }
    } else if (/ghoul|wight/.test(tid)) {
      const save = rollDie(battle.rng, 20) + (defender.mods?.con ?? 0) + saveBonus;
      if (save < 11) {
        defender.conditions.Paralyzed = Math.max(defender.conditions.Paralyzed || 0, 1);
        events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.35, text: "⚡ 麻痺!", color: "#facc15" });
        battle.logs.push(`⚡ ${defender.name} 體質豁免 ${save} < DC 11，陷入【麻痺】1 輪！`);
      }
    } else if (/wolf|boar/.test(tid)) {
      const save = rollDie(battle.rng, 20) + (defender.mods?.str ?? 0) + saveBonus;
      if (save < 11) {
        defender.conditions.Prone = 99;
        events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.35, text: "🐺 撲倒!", color: "#fb923c" });
        battle.logs.push(`🐺 ${defender.name} 被撲倒在地（消耗半移動力即可起身）！`);
      }
    } else if (/cult_fanatic|ghost/.test(tid) && !aura.fearImmune) {
      const save = rollDie(battle.rng, 20) + (defender.mods?.wis ?? 0) + saveBonus;
      if (save < 11) {
        defender.conditions.Frightened = Math.max(defender.conditions.Frightened || 0, 2);
        events.push({ type: "float", x: defender.x, y: defender.y, z: getUnitBaseH(battle, defender) + 1.35, text: "😱 恐慌!", color: "#c084fc" });
        battle.logs.push(`😱 ${defender.name} 意志豁免 ${save} < DC 11，陷入【恐慌】！`);
      }
    }
  }

  // Momentum: hero killing a foe gains +2 movement (once per turn)
  if (defender.hp <= 0 && attacker.side === "hero" && attacker.turn && !attacker.turn.momentumUsed) {
    attacker.turn.momentumUsed = true;
    attacker.turn.movementLeft += 2;
    events.push({ type: "float", x: attacker.x, y: attacker.y, z: getUnitBaseH(battle, attacker) + 1.25, text: "🔥 乘勝追擊 +2格", color: "#fbbf24" });
    battle.logs.push(`🔥 ${attacker.name} 擊倒目標，乘勝追擊獲得 +2 格移動力！`);
  }

  // Off-hand sneak breaks stealth
  if (attacker.conditions?.Hidden) delete attacker.conditions.Hidden;

  const dmgFormulaStr = `${dmgExpr}${ev.dmgBonus ? (ev.dmgBonus > 0 ? `+${ev.dmgBonus}` : ev.dmgBonus) : ""}${bonusTags.length ? ` (${bonusTags.join(", ")})` : ""}`;
  if (attacker.side === "hero") {
    events.push({
      type: "dice",
      side: "hero",
      role: "attack",
      actorName: attacker.name,
      targetName: defender.name,
      actionName: wpn.name,
      d20: rawD20,
      advState: effectiveAdv,
      rolls: effectiveAdv !== "normal" ? [r1, r2] : [rawD20],
      modTotal: totalHitBonus,
      modifiers: diceParts.slice(1),
      total: rollTotal,
      targetValue: effAc,
      targetLabel: "AC",
      formula: `${diceParts.join(" · ")} = ${rollTotal} vs AC ${effAc}`,
      hit: true,
      crit: isCrit,
      dmg: dealt,
      dmgFormula: dmgFormulaStr,
      dmgDice,
    });
  } else if (defender.side === "hero") {
    events.push({
      type: "dice",
      side: "foe",
      role: "enemy_attack",
      actorName: attacker.name,
      targetName: defender.name,
      actionName: wpn.name,
      d20: rawD20,
      advState: effectiveAdv,
      rolls: effectiveAdv !== "normal" ? [r1, r2] : [rawD20],
      modTotal: totalHitBonus,
      modifiers: diceParts.slice(1),
      total: rollTotal,
      targetValue: effAc,
      targetLabel: "我方 AC",
      formula: `${diceParts.join(" · ")} = ${rollTotal} vs 我方 AC ${effAc}`,
      hit: true,
      crit: isCrit,
      dmg: dealt,
      dmgFormula: dmgFormulaStr,
      dmgDice,
    });
  }

  return {
    ok: true,
    hit: true,
    isCrit,
    dmg: dealt,
    summary: `🎲 ${diceParts.join(" · ")} = ${rollTotal} vs AC ${effAc} 命中！造成 ${dealt} 傷${bonusTags.length ? ` (${bonusTags.join(",")})` : ""}`,
  };
}

export function executeWeaponAttack(battle, attackerId, weaponId, targetId, opts = {}) {
  const attacker = battle.units.find((u) => u.id === attackerId);
  const target = battle.units.find((u) => u.id === targetId);
  const events = [];
  if (!attacker || !target || attacker.dead || target.hp <= 0) {
    return { ok: false, reason: "目標無效", events, battleEnded: false };
  }
  const wpn = attacker.weapons.find((w) => w.id === weaponId) || attacker.weapons[0];
  const preEval = evaluateAttackModifiers(battle, attacker, target, {
    isRanged: wpn.isRanged,
    isMelee: !wpn.isRanged,
    hitBonusOverride: wpn.hitBonus,
  });
  const effRange = (wpn.rangeCells || 1) + preEval.rangeBonus;
  const dist = unitGridDistance(attacker, target);
  if (wpn.reach && dist < 2) {
    return { ok: false, reason: "長柄武器僅能攻擊 10 呎（2 格）目標，無法攻擊相鄰 5 呎！", events, battleEnded: false };
  }
  if (dist > effRange) {
    return { ok: false, reason: `目標超出武器射程（${dist} > ${effRange} 格）`, events, battleEnded: false };
  }
  if (preEval.blocked) {
    return { ok: false, reason: "視線被岩壁或高障礙阻擋", events, battleEnded: false };
  }

  const isBonusOffhand = opts.asBonus === true;
  if (isBonusOffhand) {
    if (!attacker.turn || attacker.turn.bonusLeft <= 0 || !attacker.turn.bonusAttackUnlocked) {
      return { ok: false, reason: "目前無法執行副手攻擊", events, battleEnded: false };
    }
    attacker.turn.bonusLeft -= 1;
    attacker.turn.bonusAttackUnlocked = false;
  } else {
    if (!attacker.turn) return { ok: false, reason: "非此單位回合", events, battleEnded: false };
    if (attacker.turn.attacksLeft <= 0) {
      if (attacker.turn.actionLeft <= 0) return { ok: false, reason: "本回合已無主動作", events, battleEnded: false };
      attacker.turn.actionLeft -= 1;
      attacker.turn.attacksLeft = attacker.extraAttacks || 1;
      attacker.turn.attackActionUsed = true;
    }
    attacker.turn.attacksLeft -= 1;
    if (
      wpn.light &&
      !wpn.isRanged &&
      attacker.weapons.some((w) => !w.isRanged && w.light && (w.id !== wpn.id || w.qty >= 2))
    ) {
      attacker.turn.bonusAttackUnlocked = true;
    }
  }

  const res = resolveAttackInternal(battle, attacker, target, wpn, opts, events);
  battle.logs.push(`⚔️ ${attacker.name} 以【${wpn.name}】攻擊 ${target.name}：${res.summary}`);
  return {
    ok: res.ok,
    result: res,
    events,
    battleEnded: checkBattleOutcome(battle),
  };
}

export function executeSpellCast(battle, casterId, spellKey, targetX, targetY, upcastLevel = null) {
  const caster = battle.units.find((u) => u.id === casterId);
  const spell = caster?.spells?.find((s) => s.key === spellKey);
  const events = [];
  if (!caster || !spell || !caster.turn) {
    return { ok: false, reason: "無法施法", events, battleEnded: false };
  }

  const isBonus = spell.actionCost === "bonus_action";
  const slotLvl = upcastLevel && upcastLevel >= spell.level ? upcastLevel : spell.level;

  if (isBonus) {
    if (caster.turn.bonusLeft <= 0) return { ok: false, reason: "已無附贈動作", events, battleEnded: false };
    if (slotLvl > 0 && caster.turn.castLeveledAction) return { ok: false, reason: "本回合已施放耗環主法術", events, battleEnded: false };
  } else {
    if (caster.turn.actionLeft <= 0) return { ok: false, reason: "已無主動作", events, battleEnded: false };
    if (slotLvl > 0 && caster.turn.castLeveledBonus) return { ok: false, reason: "本回合已施放附贈耗環法術，主動作僅限戲法", events, battleEnded: false };
  }

  if (slotLvl > 0) {
    if ((caster.slots?.[slotLvl] || 0) <= 0) return { ok: false, reason: `缺少 ${slotLvl} 環法術位`, events, battleEnded: false };
  }

  const effRange = getSpellEffectiveRange(battle, caster, spell);
  const dist = Math.max(Math.abs(targetX - caster.x), Math.abs(targetY - caster.y));
  if (dist > effRange) return { ok: false, reason: "目標超出法術射程", events, battleEnded: false };

  // Commit resource spend
  if (isBonus) {
    caster.turn.bonusLeft -= 1;
    if (slotLvl > 0) caster.turn.castLeveledBonus = true;
  } else {
    caster.turn.actionLeft -= 1;
    if (slotLvl > 0) caster.turn.castLeveledAction = true;
  }
  if (slotLvl > 0) caster.slots[slotLvl] -= 1;

  if (spell.concentration) {
    clearConcentration(battle, caster);
  }

  const upDelta = Math.max(0, slotLvl - (spell.level || 0));

  // Teleport spells (e.g. Misty Step)
  if (spell.attackType === "teleport") {
    const t = battle.map.grid[targetY]?.[targetX];
    if (!t?.walkable || getUnitAtCell(battle, targetX, targetY)) {
      if (isBonus) {
        caster.turn.bonusLeft += 1;
        if (slotLvl > 0) caster.turn.castLeveledBonus = false;
      } else {
        caster.turn.actionLeft += 1;
        if (slotLvl > 0) caster.turn.castLeveledAction = false;
      }
      if (slotLvl > 0) caster.slots[slotLvl] += 1;
      return { ok: false, reason: "傳送目標格不可站立", events, battleEnded: false };
    }
    caster.x = targetX;
    caster.y = targetY;
    events.push({ type: "teleport", unitId: caster.id, x: targetX, y: targetY });
    events.push({ type: "float", x: targetX, y: targetY, z: t.h + 1.2, text: `✨ ${spell.name}`, color: "#a78bfa" });
    battle.logs.push(`🌀 ${caster.name} 施放【${spell.name}】瞬移至 (${targetX},${targetY})！`);
    return { ok: true, events, battleEnded: false };
  }

  // Healing spells (Cure Wounds / Healing Word -> wakes unconscious 0 HP allies!)
  if (spell.attackType === "heal") {
    const ally = getUnitAtCell(battle, targetX, targetY) || caster;
    const modBonus = spell.addSpellMod ? Math.max(1, caster.spellAtkBonus - caster.profBonus) : 0;
    const baseHealRoll = rollDiceExpr(battle.rng, spell.healDice || "1d4");
    let healTotal = baseHealRoll.total + modBonus;
    const healDice = baseHealRoll.rolls.map((v) => ({ sides: baseHealRoll.sides, value: v, tag: `d${baseHealRoll.sides}` }));
    if (upDelta > 0 && spell.upcastDice) {
      for (let i = 0; i < upDelta; i++) {
        const upRoll = rollDiceExpr(battle.rng, spell.upcastDice);
        healTotal += upRoll.total;
        for (const v of upRoll.rolls) healDice.push({ sides: upRoll.sides, value: v, tag: "升環" });
      }
    }
    if (caster.side === "hero") {
      events.push({
        type: "dice",
        side: "hero",
        role: "heal",
        actorName: caster.name,
        targetName: ally.name,
        actionName: spell.name,
        dmgDice: healDice,
        modTotal: modBonus,
        total: healTotal,
        hit: true,
        dmg: healTotal,
        dmgFormula: `${spell.healDice || "1d4"}${modBonus ? `+${modBonus}` : ""}`,
        formula: `${healDice.map((d) => `d${d.sides}(${d.value})`).join(" + ")}${modBonus ? ` + ${modBonus}` : ""} = 恢復 ${healTotal} HP`,
      });
    }
    const wasUnconscious = ally.hp === 0 && !ally.dead;
    ally.hp = Math.min(ally.maxHp, ally.hp + healTotal);
    if (wasUnconscious && ally.hp > 0) {
      delete ally.conditions.Unconscious;
      ally.deathSaves = { success: 0, fail: 0, stabilized: false };
    }
    events.push({ type: "heal", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) });
    events.push({
      type: "float",
      x: ally.x,
      y: ally.y,
      z: getUnitBaseH(battle, ally) + 1.2,
      text: `+${healTotal}${wasUnconscious ? " 甦醒!" : ""}`,
      color: "#4ade80",
    });
    battle.logs.push(`💚 ${caster.name} 施放【${spell.name}】為 ${ally.name} 恢復 ${healTotal} HP${wasUnconscious ? " 並救醒倒地狀態" : ""}！`);
    return { ok: true, events, battleEnded: checkBattleOutcome(battle) };
  }

  // Light spell (光亮術) -> grants 10 rounds of bright illumination
  if (spell.key === "Light" || spell.name === "光亮術") {
    const ally = getUnitAtCell(battle, targetX, targetY) || caster;
    ally.conditions.Lit = 10;
    events.push({ type: "float", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) + 1.2, text: "🕯️ 光亮術!", color: "#fef08a" });
    battle.logs.push(`🕯️ ${caster.name} 對 ${ally.name} 施放【光亮術】，照亮周圍 4 格戰場！`);
    return { ok: true, events, battleEnded: false };
  }

  // Buff spells (Bless / Haste / Mirror Image / Heroic Buff)
  if (spell.attackType === "buff") {
    const ally = getUnitAtCell(battle, targetX, targetY) || caster;
    const key = spell.key === "Haste" ? "Hasted" : "Blessed";
    ally.conditions[key] = 3;
    if (spell.concentration) caster.concentration = { spellKey: spell.key, name: spell.name, targetId: ally.id, conditionKey: key };
    events.push({ type: "buff", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally), color: "#fde047" });
    events.push({ type: "float", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) + 1.2, text: `✨ ${spell.name}`, color: "#fde047" });
    battle.logs.push(`✨ ${caster.name} 對 ${ally.name} 施放【${spell.name}】！`);
    return { ok: true, events, battleEnded: false };
  }

  // Attack / Auto-hit / Save AoE / Control spells
  const aoeCells = getSpellAreaCells(battle, caster, spell, targetX, targetY);
  const targets = [];
  const seenIds = new Set();
  for (const c of aoeCells) {
    const u = getUnitAtCell(battle, c.x, c.y);
    if (u && u.hp > 0 && !seenIds.has(u.id)) {
      if (u.id === caster.id && spell.attackType !== "heal" && spell.attackType !== "buff") {
        continue;
      }
      if (spell.aoe || u.side !== caster.side) {
        seenIds.add(u.id);
        targets.push(u);
      }
    }
  }

  if (targetX !== caster.x || targetY !== caster.y) {
    caster.facingTarget = { x: targetX, y: targetY };
  }
  const dmgType = String(spell.damageType || "force").toLowerCase();
  const isFire = dmgType === "fire";
  const aoeShape = spell.aoe?.shape || null;
  const isLineBeam =
    aoeShape === "line" ||
    ["Lightning Bolt", "Blood Lance", "Guiding Bolt", "Eldritch Blast", "Ray of Frost"].includes(spell.key);
  const vfxType =
    aoeShape === "cone"
      ? "cone"
      : isLineBeam
        ? "line"
        : isFire
          ? "fireball"
          : spell.aoe
            ? "blast"
            : "bolt";
  events.push({
    type: vfxType,
    aoeShape,
    dmgType,
    fromX: caster.x,
    fromY: caster.y,
    fromZ: getUnitBaseH(battle, caster),
    toX: targetX,
    toY: targetY,
    toZ: battle.map.grid[targetY]?.[targetX]?.h ?? 1,
    aoeCells,
    color:
      dmgType === "lightning" || dmgType === "thunder"
        ? "#38bdf8"
        : dmgType === "cold"
          ? "#67e8f9"
          : dmgType === "acid" || dmgType === "poison"
            ? "#84cc16"
            : dmgType === "necrotic"
              ? "#a855f7"
              : dmgType === "psychic"
                ? "#ec4899"
                : dmgType === "radiant"
                  ? "#fde047"
                  : isFire
                    ? "#fb923c"
                    : "#a78bfa",
  });

  // Darkness / Grease surface spells
  const isDarknessSpell = spell.key === "Darkness" || /黑暗術/.test(spell.name || "");
  const isGreaseSpell = spell.key === "Grease" || /油膩術/.test(spell.name || "");
  if (isDarknessSpell) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const cx = targetX + dx;
        const cy = targetY + dy;
        const tile = battle.map.grid[cy]?.[cx];
        if (tile && tile.type !== "wall") {
          tile.surface = "darkness";
          tile.surfaceRounds = 3;
          const u = getUnitAtCell(battle, cx, cy);
          if (u && u.hp > 0 && !u.conditions?.Lit) {
            u.conditions.Blinded = Math.max(u.conditions.Blinded || 0, 2);
          }
        }
      }
    }
    events.push({ type: "blast", x: targetX, y: targetY, color: "#1e1b4b", aoeCells: [] });
    battle.logs.push(`🌑 ${caster.name} 施放【${spell.name || "黑暗術"}】，3×3 空間陷入伸手不見五指的漆黑！`);
    return { ok: true, events, battleEnded: false };
  }
  if (isGreaseSpell) {
    const greaseCells = [];
    for (let dy = 0; dy <= 1; dy++) {
      for (let dx = 0; dx <= 1; dx++) {
        const cx = targetX + dx;
        const cy = targetY + dy;
        const tile = battle.map.grid[cy]?.[cx];
        if (tile && tile.type !== "wall") {
          tile.surface = "grease";
          tile.surfaceRounds = 3;
          greaseCells.push({ x: cx, y: cy });
          const u = getUnitAtCell(battle, cx, cy);
          if (u && u.hp > 0 && !u.flies && !u.conditions?.Prone) {
            const dexSave = rollDie(battle.rng, 20) + (u.mods?.dex ?? 0);
            if (dexSave < (caster.spellSaveDc || 13)) {
              setUnitProne(u, caster.x, caster.y);
              events.push({ type: "float", x: u.x, y: u.y, z: getUnitBaseH(battle, u) + 1.1, text: "🛢️ 滑倒!", color: "#f59e0b" });
              battle.logs.push(`🛢️ ${u.name} 敏捷豁免 ${dexSave} < DC ${caster.spellSaveDc || 13}，在油膩術中重摔倒地！`);
            }
          }
        }
      }
    }
    events.push({ type: "blast", x: targetX, y: targetY, color: "#d97706", aoeCells: greaseCells });
    battle.logs.push(`🛢️ ${caster.name} 施放【${spell.name || "油膩術"}】，覆蓋 2×2 滑溜困難地面！`);
    return { ok: true, events, battleEnded: false };
  }

  // Trigger Elemental Surface Chain Reactions + Surface creation
  const createSurf = spell.key === "Grease" ? "grease" : isFire && spell.aoe ? "fire" : null;
  const surfRes = applyElementalSurfaceReaction(battle.map, targetX, targetY, dmgType, createSurf);
  if (surfRes.reaction) {
    battle.logs.push(`🌪️ 元素連鎖：【${surfRes.label}】引爆周邊 ${surfRes.cells.length} 格地形！`);
    events.push({ type: "surface_chain", reaction: surfRes.reaction, cells: surfRes.cells });
  }

  // Damage dual-state props caught in AoE
  if (spell.damageDice) {
    damagePropsInArea(battle, aoeCells, 10, events);
  }

  // HP-pool control spells (e.g. Sleep: 5d8 + 2d8 per upcast level)
  if (spell.hpPoolDice) {
    let pool = rollDiceExpr(battle.rng, spell.hpPoolDice).total;
    for (let i = 0; i < upDelta; i++) pool += rollDiceExpr(battle.rng, "2d8").total;
    let remaining = pool;
    const condKey = spell.appliesCondition || "Unconscious";
    const sorted = [...targets]
      .filter((t) => !(t.conditionImmunities || []).includes(condKey))
      .sort((a, b) => a.hp - b.hp);
    const affected = [];
    for (const target of sorted) {
      if (target.hp > 0 && target.hp <= remaining) {
        remaining -= target.hp;
        target.conditions[condKey] = 3;
        affected.push(target.name);
        events.push({
          type: "float",
          x: target.x,
          y: target.y,
          z: getUnitBaseH(battle, target) + 1.4,
          text: "💤 沉睡!",
          color: "#c084fc",
        });
      }
    }
    battle.logs.push(
      affected.length > 0
        ? `😴 ${caster.name} 施放【${spell.name}】（生命值池 ${pool}），使 ${affected.join("、")} 陷入沉睡！`
        : `😴 ${caster.name} 施放【${spell.name}】（生命值池 ${pool}），但目標生命值過高未受影響。`
    );
    return { ok: true, events, battleEnded: checkBattleOutcome(battle) };
  }

  for (const target of targets) {
    if (spell.attackType === "auto_hit") {
      // Magic Missile can be nullified by Shield
      if (tryAutoShieldReaction(battle, target, 99, target.ac, true, events)) {
        battle.logs.push(`🛡️ ${target.name} 以【護盾術】完全抵消【${spell.name}】！`);
        continue;
      }
      const baseAutoRoll = rollDiceExpr(battle.rng, spell.damageDice || "3d4+3");
      const autoDice = baseAutoRoll.rolls.map((v) => ({ sides: baseAutoRoll.sides, value: v, tag: `d${baseAutoRoll.sides}` }));
      let dmg = baseAutoRoll.total;
      let flatBonus = baseAutoRoll.flat || 0;
      for (let i = 0; i < upDelta; i++) {
        const upAuto = rollDiceExpr(battle.rng, "1d4+1");
        dmg += upAuto.total;
        flatBonus += upAuto.flat || 0;
        for (const v of upAuto.rolls) autoDice.push({ sides: upAuto.sides, value: v, tag: "升環" });
      }
      applyDamageToUnit(battle, target, dmg, dmgType, false, events);
      if (caster.side === "hero") {
        events.push({
          type: "dice",
          side: "hero",
          role: "damage",
          actorName: caster.name,
          targetName: target.name,
          actionName: spell.name,
          dmgDice: autoDice,
          modTotal: flatBonus,
          total: dmg,
          hit: true,
          dmg,
          dmgFormula: `${spell.damageDice || "3d4+3"}${upDelta > 0 ? `+${upDelta}d4+${upDelta}` : ""}`,
          formula: `${autoDice.map((d) => `d${d.sides}(${d.value})`).join(" + ")}${flatBonus ? ` + ${flatBonus}` : ""} = ${dmg} 傷`,
        });
      }
      battle.logs.push(`✨ ${caster.name} 【${spell.name}】自動命中 ${target.name} 造成 ${dmg} 傷！`);
    } else if (spell.attackType === "ranged_spell" || spell.attackType === "melee_spell") {
      const spWeapon = {
        id: spell.key,
        name: spell.name,
        isSpell: true,
        isRanged: spell.attackType === "ranged_spell",
        hitBonus: caster.spellAtkBonus,
        damageDice: `${spell.damageDice || "1d10"}${upDelta > 0 && spell.upcastDice ? `+${upDelta}d8` : ""}`,
        damageType: dmgType,
      };
      const res = resolveAttackInternal(battle, caster, target, spWeapon, {}, events);
      battle.logs.push(`🔮 ${caster.name} 施放【${spell.name}】攻擊 ${target.name}：${res.summary}`);
    } else {
      // Save-based AoE or Control
      const saveKey = String(spell.saveAbility || "dex").toLowerCase();
      const saveMod = (target.saveOverrides?.[saveKey] !== undefined ? target.saveOverrides[saveKey] : target.mods?.[saveKey] ?? 0) + (target.saves?.includes(saveKey) ? target.profBonus : 0);
      const los = spell.key === "Sacred Flame" ? { coverSaveBonus: 0 } : resolveBestTargetLos(battle, caster, target);
      const saveD20 = rollDie(battle.rng, 20);
      const totalSaveMod = saveMod + (saveKey === "dex" ? los.coverSaveBonus : 0);
      const saveRoll = saveD20 + totalSaveMod;
      const saved = saveRoll >= caster.spellSaveDc;
      if (target.side === "hero") {
        events.push({
          type: "dice",
          side: "hero",
          role: "save",
          actorName: target.name,
          targetName: caster.name,
          actionName: `${saveKey.toUpperCase()} 豁免 (${spell.name})`,
          d20: saveD20,
          advState: "normal",
          rolls: [saveD20],
          modTotal: totalSaveMod,
          modifiers: [
            `${saveKey.toUpperCase()}豁免 (${saveMod >= 0 ? "+" : ""}${saveMod})`,
            ...(saveKey === "dex" && los.coverSaveBonus > 0 ? [`掩體+${los.coverSaveBonus}`] : []),
          ],
          total: saveRoll,
          targetValue: caster.spellSaveDc,
          targetLabel: "DC",
          formula: `1d20(${saveD20}) + ${totalSaveMod >= 0 ? `+${totalSaveMod}` : totalSaveMod} = ${saveRoll} vs DC ${caster.spellSaveDc}`,
          hit: saved,
          crit: saveD20 === 20,
        });
      }

      if (spell.damageDice) {
        let total = rollDiceExpr(battle.rng, spell.damageDice).total;
        if (upDelta > 0 && spell.upcastDice) {
          for (let i = 0; i < upDelta; i++) total += rollDiceExpr(battle.rng, spell.upcastDice).total;
        }
        if (surfRes.extraDice && surfRes.cells.some((c) => c.x === target.x && c.y === target.y)) {
          total += rollDiceExpr(battle.rng, surfRes.extraDice).total;
        }
        const dmg = saved ? (spell.halfOnSave ? Math.floor(total / 2) : 0) : total;
        applyDamageToUnit(battle, target, dmg, dmgType, false, events);
        battle.logs.push(`🔥 ${target.name} ${saveKey.toUpperCase()}豁免 ${saveRoll} vs DC ${caster.spellSaveDc}（${saved ? "成功" : "失敗"}），受 ${dmg} 傷！`);
      }

      if (!saved && spell.appliesCondition && !(target.conditionImmunities || []).includes(spell.appliesCondition)) {
        target.conditions[spell.appliesCondition] = 2;
        if (spell.concentration) {
          caster.concentration = { spellKey: spell.key, name: spell.name, targetId: target.id, conditionKey: spell.appliesCondition };
        }
        events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.4, text: spell.appliesCondition, color: "#c084fc" });
        battle.logs.push(`🌀 ${target.name} 陷入狀態：${CONDITIONS[spell.appliesCondition]?.desc || spell.appliesCondition}！`);
      }

      if (spell.pushCells && (!saved || spell.halfOnSave)) {
        applyKnockback(battle, target, target.x - caster.x, target.y - caster.y, spell.pushCells, events);
      }
    }
  }

  return { ok: true, events, battleEnded: checkBattleOutcome(battle) };
}

export function executeStandardAction(battle, unitId, kind, targetId = null, opts = {}) {
  const unit = battle.units.find((u) => u.id === unitId);
  const events = [];
  if (!unit || !unit.turn) return { ok: false, reason: "無法動作", events, battleEnded: false };

  const asBonus = opts.asBonus === true;
  if (asBonus) {
    if (unit.turn.bonusLeft <= 0) return { ok: false, reason: "無附贈動作", events, battleEnded: false };
    unit.turn.bonusLeft -= 1;
  } else {
    if (unit.turn.actionLeft <= 0) return { ok: false, reason: "無主動作", events, battleEnded: false };
    unit.turn.actionLeft -= 1;
  }

  if (kind === "dash") {
    const bonusMove = getEffectiveSpeed(unit);
    unit.turn.movementLeft += bonusMove;
    unit.turn.dashed = true;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: `💨 衝刺 +${bonusMove}格`, color: "#38bdf8" });
    battle.logs.push(`💨 ${unit.name} 執行【衝刺】，移動力 +${bonusMove} 格！`);
  } else if (kind === "disengage") {
    unit.turn.disengaged = true;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: "🕊️ 脫離(免藉機)", color: "#a7f3d0" });
    battle.logs.push(`🕊️ ${unit.name} 執行【脫離】，本回合移動不觸發藉機攻擊。`);
  } else if (kind === "dodge") {
    unit.conditions.Dodging = 1;
    unit.turn.dodging = true;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: "🛡️ 閃避姿勢", color: "#93c5fd" });
    battle.logs.push(`🛡️ ${unit.name} 進入【閃避】姿勢，敵方攻擊皆具劣勢。`);
  } else if (kind === "hide") {
    const stealthBonus = Math.max(unit.skillBonuses?.stealth ?? -99, (unit.mods?.dex ?? 0) + unit.profBonus);
    const roll = rollDie(battle.rng, 20) + stealthBonus;
    if (roll >= 11) {
      unit.conditions.Hidden = 2;
      unit.turn.hidden = true;
      events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: `🕶️ 潛行成功 (${roll})`, color: "#94a3b8" });
      battle.logs.push(`🕶️ ${unit.name} 隱匿檢定 ${roll}，獲得下次攻擊優勢！`);
    } else {
      events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.0, text: `潛行失敗 (${roll})`, color: "#fca5a5" });
    }
  } else if (kind === "shove") {
    const athBonus = Math.max(unit.skillBonuses?.athletics ?? -99, (unit.mods?.str ?? 0) + unit.profBonus);
    const targetProp = opts.propId
      ? (battle.map.props || []).find((p) => p.id === opts.propId && !p.broken)
      : (battle.map.props || []).find((p) => p.id === targetId && !p.broken);
    if (targetProp) {
      if (Math.max(Math.abs(targetProp.x - unit.x), Math.abs(targetProp.y - unit.y)) > 1) {
        if (asBonus) unit.turn.bonusLeft += 1;
        else unit.turn.actionLeft += 1;
        return { ok: false, reason: "須貼近物件才能推動", events, battleEnded: false };
      }
      const d20 = rollDie(battle.rng, 20);
      const total = d20 + athBonus;
      const dc = Number.isFinite(targetProp.pushDc)
        ? targetProp.pushDc
        : targetProp.shovable && Number.isFinite(targetProp.dc)
        ? targetProp.dc
        : 10;
      if (unit.side === "hero") {
        events.push({
          type: "dice",
          side: "hero",
          role: "check",
          actorName: unit.name,
          targetName: targetProp.name,
          actionName: "運動推物",
          d20,
          advState: "normal",
          rolls: [d20],
          modTotal: athBonus,
          modifiers: [`運動 (+${athBonus})`],
          total,
          targetValue: dc,
          targetLabel: "DC",
          formula: `1d20(${d20}) + 運動(+${athBonus}) = ${total} vs DC ${dc}`,
          hit: total >= dc,
          crit: d20 === 20,
        });
      }
      if (total < dc) {
        events.push({ type: "float", x: targetProp.x, y: targetProp.y, z: 1.4, text: `推不動 (${total}/${dc})`, color: "#fca5a5" });
        battle.logs.push(`💪 ${unit.name} 嘗試推動【${targetProp.name}】（運動 ${total} < DC ${dc}），未推動。`);
        return { ok: true, events, battleEnded: false };
      }
      const dx = Math.sign(targetProp.x - unit.x);
      const dy = Math.sign(targetProp.y - unit.y);
      const steps = total >= 16 ? 2 : 1;
      for (let s = 0; s < steps; s++) {
        const nx = targetProp.x + dx;
        const ny = targetProp.y + dy;
        const nTile = battle.map.grid[ny]?.[nx];
        if (!nTile || nTile.type === "wall") break;
        const hitUnit = getUnitAtCell(battle, nx, ny);
        targetProp.x = nx;
        targetProp.y = ny;
        if (hitUnit) {
          const smashDmg = rollDiceExpr(battle.rng, "1d6").total + Math.max(1, unit.mods?.str ?? 1);
          applyDamageToUnit(battle, hitUnit, smashDmg, "bludgeoning", false, events);
          setUnitProne(hitUnit, unit.x, unit.y);
          events.push({ type: "float", x: nx, y: ny, z: 1.4, text: `💥 物件撞擊 -${smashDmg}!`, color: "#fb923c" });
          battle.logs.push(`💪 ${unit.name} 將【${targetProp.name}】推撞向 ${hitUnit.name}，造成 ${smashDmg} 點鈍擊傷並將其撞倒！`);
          if (targetProp.flammable) {
            nTile.surface = "oil";
            nTile.surfaceRounds = 3;
          }
          break;
        }
      }
      events.push({ type: "float", x: targetProp.x, y: targetProp.y, z: 1.3, text: "💪 推動!", color: "#38bdf8" });
      battle.logs.push(`💪 ${unit.name}（運動 ${total}）成功將【${targetProp.name}】推開至 (${targetProp.x},${targetProp.y})！`);
      return { ok: true, events, battleEnded: checkBattleOutcome(battle) };
    }

    const target = battle.units.find((u) => u.id === targetId);
    if (!target || unitGridDistance(unit, target) > 1) {
      if (asBonus) unit.turn.bonusLeft += 1;
      else unit.turn.actionLeft += 1;
      return { ok: false, reason: "須貼近敵人才能推擊", events, battleEnded: false };
    }
    const aRoll = rollDie(battle.rng, 20) + athBonus;
    const dRoll = rollDie(battle.rng, 20) + Math.max(target.skillBonuses?.athletics ?? target.mods?.str ?? 0, target.skillBonuses?.acrobatics ?? target.mods?.dex ?? 0);
    if (aRoll >= dRoll) {
      battle.logs.push(`💥 ${unit.name} 運動推擊 ${target.name}（${aRoll} vs ${dRoll}）成功！`);
      applyKnockback(battle, target, target.x - unit.x, target.y - unit.y, 1, events);
    } else {
      events.push({ type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.0, text: `頂住 (${dRoll}>${aRoll})`, color: "#cbd5e1" });
      battle.logs.push(`🛡️ ${target.name} 頂住了 ${unit.name} 的推擊（${dRoll} vs ${aRoll}）。`);
    }
  } else if (kind === "potion") {
    const pot = unit.potions?.find((p) => p.qty > 0);
    if (!pot) {
      unit.turn.actionLeft += 1;
      return { ok: false, reason: "已無治療藥水", events, battleEnded: false };
    }
    const ally = (targetId && battle.units.find((u) => u.id === targetId)) || unit;
    if (unitGridDistance(unit, ally) > 1) {
      unit.turn.actionLeft += 1;
      return { ok: false, reason: "隊友不在相鄰 1 格內", events, battleEnded: false };
    }
    pot.qty -= 1;
    const heal = rollDiceExpr(battle.rng, pot.effect?.dice || "2d4+2").total;
    const wasKo = ally.hp === 0 && !ally.dead;
    ally.hp = Math.min(ally.maxHp, ally.hp + heal);
    if (wasKo && ally.hp > 0) {
      delete ally.conditions.Unconscious;
      ally.deathSaves = { success: 0, fail: 0, stabilized: false };
    }
    events.push({ type: "heal", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally), color: "#34d399" });
    events.push({ type: "float", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) + 1.2, text: `🧪 +${heal}${wasKo ? " 救醒!" : ""}`, color: "#4ade80" });
    battle.logs.push(`🧪 ${unit.name} 為 ${ally.name} 使用【${pot.name}】，回復 ${heal} HP！`);
  } else if (kind === "torch") {
    unit.conditions.Lit = 10;
    events.push({ type: "buff", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit), color: "#fbbf24" });
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.2, text: "🔥 點亮火把!", color: "#fbbf24" });
    battle.logs.push(`🔥 ${unit.name} 點亮火把，照亮周圍 4 格黑暗區域！`);
  }

  return { ok: true, events, battleEnded: checkBattleOutcome(battle) };
}

export function executeClassAbility(battle, unitId, abilityId, targetId = null) {
  const unit = battle.units.find((u) => u.id === unitId);
  const ab = unit?.abilities?.find((a) => a.id === abilityId);
  const events = [];
  if (!unit || !ab || !unit.turn || ab.usesLeft <= 0) {
    return { ok: false, reason: "職業技能次數已盡", events, battleEnded: false };
  }

  const isBonus = ab.actionCost === "swift" || ab.actionCost === "bonus_action";
  if (isBonus) {
    if (unit.turn.bonusLeft <= 0) return { ok: false, reason: "已無附贈動作", events, battleEnded: false };
    unit.turn.bonusLeft -= 1;
  } else {
    if (unit.turn.actionLeft <= 0) return { ok: false, reason: "已無主動作", events, battleEnded: false };
    unit.turn.actionLeft -= 1;
  }
  if (ab.usesLeft < 99) ab.usesLeft -= 1;

  if (ab.id === "second_wind") {
    const heal = rollDie(battle.rng, 10) + (unit.level || 1);
    unit.hp = Math.min(unit.maxHp, unit.hp + heal);
    events.push({ type: "heal", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) });
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.2, text: `💪 回氣 +${heal}`, color: "#4ade80" });
    battle.logs.push(`💪 ${unit.name} 發動【回氣】，恢復 ${heal} HP！`);
  } else if (ab.id === "action_surge") {
    unit.turn.actionLeft += 1;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.2, text: "⚡ 動作如潮 +1動", color: "#fbbf24" });
    battle.logs.push(`⚡ ${unit.name} 發動【動作如潮】，獲得額外 1 個主動作！`);
  } else if (ab.id === "rage") {
    unit.conditions.Rage = 5;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.2, text: "🔥 狂暴！物抗減半", color: "#ef4444" });
    battle.logs.push(`🔥 ${unit.name} 進入【狂暴】，物理傷害減半且近戰獲得加成！`);
  } else if (ab.id === "lay_on_hands") {
    const ally = (targetId && battle.units.find((u) => u.id === targetId)) || unit;
    const pool = Math.min(ab.mechanics?.healPool || unit.level * 5, ally.maxHp - ally.hp || 10);
    const wasKo = ally.hp === 0 && !ally.dead;
    ally.hp = Math.min(ally.maxHp, ally.hp + pool);
    if (wasKo && ally.hp > 0) {
      delete ally.conditions.Unconscious;
      ally.deathSaves = { success: 0, fail: 0, stabilized: false };
    }
    events.push({ type: "heal", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) });
    events.push({ type: "float", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) + 1.2, text: `✨ 聖療 +${pool}`, color: "#fde047" });
    battle.logs.push(`✨ ${unit.name} 使用【聖療術】恢復 ${ally.name} ${pool} HP！`);
  } else if (ab.id === "flurry_of_blows") {
    const enemy = (targetId && battle.units.find((u) => u.id === targetId)) || getAdjacentHostiles(battle, unit)[0];
    if (enemy) {
      const wpn = { id: "flurry", name: "疾風連擊", isRanged: false, hitBonus: unit.weapons[0]?.hitBonus || 5, damageDice: "1d6+3", damageType: "bludgeoning" };
      const r1 = resolveAttackInternal(battle, unit, enemy, wpn, {}, events);
      const r2 = enemy.hp > 0 ? resolveAttackInternal(battle, unit, enemy, wpn, {}, events) : { summary: "目標已倒下" };
      battle.logs.push(`👊 ${unit.name} 發動【疾風連擊】x2：1.${r1.summary}；2.${r2.summary}`);
    }
  } else if (ab.id === "channel_divinity_radiance") {
    const cells = getSpellAreaCells(battle, unit, { aoe: { shape: "radius", sizeCells: 3 } }, unit.x, unit.y);
    for (const f of battle.units.filter((u) => u.side !== unit.side && u.hp > 0 && cellToUnitDistance(unit.x, unit.y, u) <= 3)) {
      const dmg = rollDiceExpr(battle.rng, ab.mechanics?.damageDice || "2d10+5").total;
      applyDamageToUnit(battle, f, dmg, "radiant", false, events);
    }
    events.push({ type: "blast", aoeCells: cells, color: "#fde047" });
    battle.logs.push(`☀️ ${unit.name} 引導神力【破曉審判】橫掃周圍敵人！`);
  } else if (ab.id === "cunning_action") {
    unit.turn.disengaged = true;
    unit.turn.movementLeft += 2;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.1, text: "💨 靈巧脫離+2格", color: "#38bdf8" });
    battle.logs.push(`💨 ${unit.name} 施展【靈巧動作】免藉機並靈活調整站位。`);
  } else if (ab.id === "trap_master") {
    const foe =
      (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) ||
      battle.units.find((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 3);
    if (foe) {
      const dmg = rollDie(battle.rng, 8) + 2;
      applyDamageToUnit(battle, foe, dmg, "piercing", false, events);
      foe.conditions.Restrained = 2;
      events.push({ type: "float", x: foe.x, y: foe.y, z: getUnitBaseH(battle, foe) + 1.3, text: "🪤 踩中陷阱!", color: "#f59e0b" });
      battle.logs.push(`🪤 ${unit.name} 拋出捕獸夾命中 ${foe.name}，造成 ${dmg} 穿刺傷害並束縛！`);
    } else {
      battle.logs.push(`🪤 ${unit.name} 在身邊佈下警戒陷阱。`);
    }
  } else if (ab.id === "studied_target") {
    unit.turn.studiedBonus = true;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.2, text: "🔍 弱點鎖定 +2/+1d6", color: "#38bdf8" });
    battle.logs.push(`🔍 ${unit.name} 發動【弱點研判】，本回合下次攻擊命中 +2 並附帶 +1d6 精準傷害！`);
  } else if (ab.id === "life_channel") {
    const allies = battle.units.filter((u) => u.side === unit.side && !u.dead && unitGridDistance(unit, u) <= 3);
    let totalHeal = 0;
    for (const al of allies) {
      const h = rollDie(battle.rng, 8) + 3;
      const wasKo = al.hp === 0 && !al.dead;
      al.hp = Math.min(al.maxHp, al.hp + h);
      if (wasKo && al.hp > 0) delete al.conditions.Unconscious;
      totalHeal += h;
      events.push({ type: "heal", x: al.x, y: al.y, z: getUnitBaseH(battle, al) });
      events.push({ type: "float", x: al.x, y: al.y, z: getUnitBaseH(battle, al) + 1.2, text: `✨ +${h}`, color: "#4ade80" });
    }
    battle.logs.push(`✨ ${unit.name} 釋放【生命共鳴】，為 3 格內 ${allies.length} 名友軍總計回復 ${totalHeal} HP！`);
  } else if (ab.id === "arcane_burst") {
    const foe =
      (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) ||
      battle.units.find((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 4);
    if (foe) {
      const dmg = rollDiceExpr(battle.rng, "2d8").total + (unit.level || 1) + 2;
      applyDamageToUnit(battle, foe, dmg, "force", false, events);
      events.push({ type: "bolt", fromX: unit.x, fromY: unit.y, fromZ: getUnitBaseH(battle, unit), toX: foe.x, toY: foe.y, toZ: getUnitBaseH(battle, foe), color: "#a78bfa" });
      battle.logs.push(`⚡ ${unit.name} 釋放【奧義爆發】轟擊 ${foe.name}，造成 ${dmg} 傷害！`);
    }
  } else if (ab.id === "kensei_flurry") {
    const enemy = (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) || getAdjacentHostiles(battle, unit)[0];
    if (enemy) {
      const wpn = {
        id: "kensei_flurry",
        name: "劍聖連斬",
        isRanged: false,
        hitBonus: (unit.weapons[0]?.hitBonus || 6) + 1,
        damageDice: "1d8+4",
        damageType: "slashing",
      };
      const r1 = resolveAttackInternal(battle, unit, enemy, wpn, {}, events);
      const r2 = enemy.hp > 0 ? resolveAttackInternal(battle, unit, enemy, wpn, {}, events) : { summary: "目標已倒下" };
      battle.logs.push(`⚔️ ${unit.name} 喚醒劍靈發動【劍聖連斬】x2：1.${r1.summary}；2.${r2.summary}`);
    }
  } else if (ab.id === "warcry_heal") {
    const allies = battle.units.filter((u) => u.side === unit.side && !u.dead && unitGridDistance(unit, u) <= 3);
    let totalHeal = 0;
    for (const al of allies) {
      const h = rollDie(battle.rng, 6) + 3;
      al.hp = Math.min(al.maxHp, al.hp + h);
      al.conditions.Blessed = Math.max(al.conditions.Blessed || 0, 2);
      totalHeal += h;
      events.push({ type: "heal", x: al.x, y: al.y, z: getUnitBaseH(battle, al) });
      events.push({ type: "float", x: al.x, y: al.y, z: getUnitBaseH(battle, al) + 1.2, text: `📣 +${h} 戰吼`, color: "#fde047" });
    }
    battle.logs.push(`📣 ${unit.name} 發出【戰吼治癒】，3 格內 ${allies.length} 名友軍回復總計 ${totalHeal} HP 並獲得祝福！`);
  } else if (ab.id === "blood_breath") {
    const foes = battle.units.filter((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 3);
    let drained = 0;
    for (const f of foes) {
      const dmg = rollDiceExpr(battle.rng, "3d6").total + 2;
      const d = applyDamageToUnit(battle, f, dmg, "necrotic", false, events);
      drained += d;
    }
    if (drained > 0) {
      const heal = Math.max(2, Math.floor(drained / 2));
      unit.hp = Math.min(unit.maxHp, unit.hp + heal);
      events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.2, text: `🩸 吸血 +${heal}`, color: "#4ade80" });
    }
    events.push({ type: "cone", fromX: unit.x, fromY: unit.y, fromZ: getUnitBaseH(battle, unit), toX: foes[0]?.x ?? unit.x + 2, toY: foes[0]?.y ?? unit.y, color: "#dc2626" });
    battle.logs.push(`🩸 ${unit.name} 噴吐【血之龍息】橫掃 ${foes.length} 名敵軍（共 ${drained} 傷），並吸取生命！`);
  } else if (ab.id === "fatal_verdict") {
    unit.turn.verdictReady = true;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.2, text: "⚖️ 死期已定!", color: "#f87171" });
    battle.logs.push(`⚖️ ${unit.name} 估算敵人命格發動【因果處決】，本回合下次攻擊必具優勢且 17–20 暴擊！`);
  } else if (ab.id === "alchemist_bomb") {
    const foes = battle.units.filter((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 6);
    const mainFoe = (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) || foes[0];
    if (mainFoe) {
      const splashFoes = battle.units.filter((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(mainFoe, u) <= 1);
      for (const sf of splashFoes) {
        const dmg = rollDiceExpr(battle.rng, "2d8").total + 3;
        applyDamageToUnit(battle, sf, dmg, "fire", false, events);
      }
      events.push({
        type: "fireball",
        fromX: unit.x,
        fromY: unit.y,
        fromZ: getUnitBaseH(battle, unit),
        toX: mainFoe.x,
        toY: mainFoe.y,
        toZ: getUnitBaseH(battle, mainFoe),
        aoeCells: splashFoes.map((sf) => ({ x: sf.x, y: sf.y })),
        color: "#f97316",
      });
      battle.logs.push(`💣 ${unit.name} 投擲【混亂科研炸彈】轟擊 ${mainFoe.name}（波及 ${splashFoes.length} 名敵軍）！`);
    }
  } else if (ab.id === "chain_lightning_arc") {
    const foes = battle.units
      .filter((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 6)
      .sort((a, b) => unitGridDistance(unit, a) - unitGridDistance(unit, b))
      .slice(0, 3);
    for (const f of foes) {
      const dmg = rollDie(battle.rng, 8) + 3;
      applyDamageToUnit(battle, f, dmg, "lightning", false, events);
      events.push({ type: "bolt", dmgType: "lightning", fromX: unit.x, fromY: unit.y, fromZ: getUnitBaseH(battle, unit), toX: f.x, toY: f.y, toZ: getUnitBaseH(battle, f), color: "#38bdf8" });
    }
    battle.logs.push(`⚡ ${unit.name} 釋放【連鎖電弧】，彈跳電擊 ${foes.length} 名敵人！`);
  } else if (ab.id === "wild_magic_surge") {
    const h = rollDie(battle.rng, 6) + 2;
    unit.hp = Math.min(unit.maxHp, unit.hp + h);
    unit.conditions.Blessed = Math.max(unit.conditions.Blessed || 0, 2);
    events.push({ type: "heal", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) });
    const foe = battle.units.find((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 5);
    if (foe) {
      const dmg = rollDie(battle.rng, 6) + 2;
      applyDamageToUnit(battle, foe, dmg, "force", false, events);
      events.push({ type: "bolt", dmgType: "force", fromX: unit.x, fromY: unit.y, fromZ: getUnitBaseH(battle, unit), toX: foe.x, toY: foe.y, toZ: getUnitBaseH(battle, foe), color: "#ec4899" });
    }
    battle.logs.push(`🎲 ${unit.name} 引發【混沌野魔法湧動】，回復 ${h} HP 並射出隨機魔彈！`);
  } else if (ab.id === "earth_ward") {
    unit.tempHp = Math.max(unit.tempHp || 0, 6);
    unit.conditions.Blessed = Math.max(unit.conditions.Blessed || 0, 2);
    const adj = getAdjacentHostiles(battle, unit);
    for (const f of adj) {
      applyDamageToUnit(battle, f, rollDie(battle.rng, 6) + 1, "bludgeoning", false, events);
    }
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.25, text: "🪨 石板結界 +6護盾", color: "#fbbf24" });
    battle.logs.push(`🪨 ${unit.name} 喚起【石板結界護盾】，獲得 6 臨時護盾並震傷周圍敵人！`);
  } else if (ab.id === "knight_challenge") {
    unit.conditions.Shielded = Math.max(unit.conditions.Shielded || 0, 1);
    unit.conditions.Blessed = Math.max(unit.conditions.Blessed || 0, 2);
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.25, text: "🛡️ 騎士挑戰!", color: "#fde047" });
    battle.logs.push(`🛡️ ${unit.name} 發起【騎士挑戰】，舉盾護衛並獲得祝福與防禦強化！`);
  } else if (ab.id === "time_freeze") {
    unit.turn.actionLeft += 1;
    unit.turn.movementLeft += 2;
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.3, text: "⏳ 時空凝滯 +1主動作!", color: "#38bdf8" });
    battle.logs.push(`⏳ ${unit.name} 啟動【時空凝滯】，獲得額外 1 個主動作與 +2 格移動力！`);
  } else if (ab.id === "spellstrike") {
    const enemy = (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) || getAdjacentHostiles(battle, unit)[0];
    if (enemy) {
      const wpn = unit.weapons?.[0] || { id: "spellstrike", name: "奧術劍擊", isRanged: false, hitBonus: 6, damageDice: "1d8+3", damageType: "slashing" };
      const r1 = resolveAttackInternal(battle, unit, enemy, wpn, {}, events);
      if (enemy.hp > 0) {
        const arc = rollDie(battle.rng, 6) + rollDie(battle.rng, 6);
        applyDamageToUnit(battle, enemy, arc, "force", false, events);
      }
      battle.logs.push(`✨ ${unit.name} 發動【奧術劍擊】斬擊 ${enemy.name}（${r1.summary}）並引爆力場！`);
    }
  } else if (ab.id === "shadow_step") {
    unit.turn.disengaged = true;
    unit.turn.movementLeft += 3;
    unit.turn.familiarBuff = { adv: true, hitBonus: 2, dmgDice: "1d6", label: "暗影突襲" };
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.25, text: "🌑 暗影瞬步 +3格", color: "#c084fc" });
    battle.logs.push(`🌑 ${unit.name} 發動【暗影瞬步】，疾行 +3 格免藉機且下次攻擊取優勢！`);
  } else if (ab.id === "field_triage") {
    const allies = battle.units
      .filter((u) => u.side === unit.side && !u.dead && unitGridDistance(unit, u) <= 4)
      .sort((a, b) => a.hp / Math.max(1, a.maxHp) - b.hp / Math.max(1, b.maxHp));
    const hurt = allies[0] || unit;
    const h = rollDie(battle.rng, 8) + 4;
    hurt.hp = Math.min(hurt.maxHp, hurt.hp + h);
    delete hurt.conditions.Unconscious;
    delete hurt.conditions.Poisoned;
    delete hurt.conditions.Paralyzed;
    events.push({ type: "heal", x: hurt.x, y: hurt.y, z: getUnitBaseH(battle, hurt) });
    events.push({ type: "float", x: hurt.x, y: hurt.y, z: getUnitBaseH(battle, hurt) + 1.2, text: `🩺 +${h} 急救`, color: "#4ade80" });
    battle.logs.push(`🩺 ${unit.name} 施展【戰地脈衝急救】為 ${hurt.name} 回復 ${h} HP 並淨化異常！`);
  } else if (ab.id === "comp_pounce" || ab.id === "comp_blink") {
    const reach = ab.id === "comp_blink" ? 3 : 2;
    const foe =
      (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) ||
      battle.units.find((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= reach);
    if (foe) {
      const dmg = rollDiceExpr(battle.rng, ab.id === "comp_blink" ? "1d8+3" : "2d6+3").total;
      applyDamageToUnit(battle, foe, dmg, "slashing", false, events);
      foe.conditions.Prone = 99;
      events.push({ type: "float", x: foe.x, y: foe.y, z: getUnitBaseH(battle, foe) + 1.3, text: `🐾 ${ab.name} -${dmg} 倒地!`, color: "#fbbf24" });
      battle.logs.push(`🐾 ${unit.name} 發動【${ab.name}】撲擊 ${foe.name}，造成 ${dmg} 傷害並使其倒地！`);
    } else {
      battle.logs.push(`🐾 ${unit.name} 蓄勢待發，但附近沒有目標。`);
    }
  } else if (ab.id === "comp_guard") {
    const allies = battle.units.filter((u) => u.side === unit.side && !u.dead && unitGridDistance(unit, u) <= 3);
    for (const al of allies) {
      const h = rollDie(battle.rng, 6) + 2;
      al.hp = Math.min(al.maxHp, al.hp + h);
      al.conditions.Blessed = Math.max(al.conditions.Blessed || 0, 2);
      events.push({ type: "heal", x: al.x, y: al.y, z: getUnitBaseH(battle, al) });
      events.push({ type: "float", x: al.x, y: al.y, z: getUnitBaseH(battle, al) + 1.2, text: `🛡️ 協防 +${h}`, color: "#4ade80" });
    }
    battle.logs.push(`🐾 ${unit.name} 發動【${ab.name}】，掩護 ${allies.length} 名友軍並賦予祝福！`);
  } else if (ab.id === "comp_steam") {
    const foes = battle.units.filter((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 2);
    for (const f of foes) {
      const dmg = rollDiceExpr(battle.rng, "2d6").total + 2;
      applyDamageToUnit(battle, f, dmg, "fire", false, events);
    }
    events.push({ type: "blast", aoeCells: foes.map((f) => ({ x: f.x, y: f.y })), color: "#f97316" });
    battle.logs.push(`💨 ${unit.name} 噴射【過載蒸氣】，灼傷 ${foes.length} 名敵軍！`);
  } else if (ab.id === "comp_mark") {
    const foe =
      (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) ||
      battle.units.find((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 4);
    if (foe) {
      const dmg = rollDiceExpr(battle.rng, "1d8+2").total;
      applyDamageToUnit(battle, foe, dmg, "piercing", false, events);
      foe.conditions.Blinded = 1;
      events.push({ type: "float", x: foe.x, y: foe.y, z: getUnitBaseH(battle, foe) + 1.3, text: "🦅 俯衝致盲!", color: "#38bdf8" });
      battle.logs.push(`🦅 ${unit.name} 發動【高空俯衝標記】命中 ${foe.name}（-${dmg}）並使其目盲！`);
    }
  } else if (ab.id === "fam_inkwell_amplify" || ab.id === "fam_crow_hex" || ab.id === "fam_kensei_resonance" || ab.id === "fam_help_strike") {
    const cfg =
      ab.id === "fam_inkwell_amplify"
        ? { adv: true, hitBonus: 3, dmgDice: "1d6", label: "墨井奧術" }
        : ab.id === "fam_crow_hex"
          ? { adv: true, hitBonus: 2, dmgDice: "1d6", label: "漆夜厄運" }
          : ab.id === "fam_kensei_resonance"
            ? { adv: true, hitBonus: 2, dmgDice: "1d8", label: "劍靈共鳴" }
            : { adv: true, hitBonus: 1, dmgDice: "1d4", label: "使魔擾敵" };
    unit.turn.familiarBuff = cfg;
    if (ab.id === "fam_kensei_resonance") {
      unit.conditions.Shielded = Math.max(unit.conditions.Shielded || 0, 1);
    }
    events.push({ type: "float", x: unit.x, y: unit.y, z: getUnitBaseH(battle, unit) + 1.35, text: `✨ ${cfg.label}!`, color: "#c084fc" });
    battle.logs.push(`✨ ${unit.name} 與魔寵協作發動【${ab.name}】，下次攻擊獲得優勢與額外強化！`);
  } else if (ab.id === "fam_grace_radiance") {
    const allies = battle.units
      .filter((u) => u.side === unit.side && !u.dead && unitGridDistance(unit, u) <= 4)
      .sort((a, b) => a.hp / Math.max(1, a.maxHp) - b.hp / Math.max(1, b.maxHp));
    const ally = allies[0] || unit;
    const h = rollDie(battle.rng, 6) + 3;
    ally.hp = Math.min(ally.maxHp, ally.hp + h);
    ally.conditions.Blessed = Math.max(ally.conditions.Blessed || 0, 2);
    events.push({ type: "heal", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) });
    events.push({ type: "float", x: ally.x, y: ally.y, z: getUnitBaseH(battle, ally) + 1.25, text: `🦋 光輝 +${h}`, color: "#fde047" });
    const foe = battle.units.find((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 3);
    if (foe) foe.conditions.Blinded = 1;
    battle.logs.push(`🦋 ${unit.name} 的格蕾絲灑下【光輝鱗粉】，治癒 ${ally.name} ${h} HP 並祝福${foe ? `，同時致盲 ${foe.name}` : ""}！`);
  } else if (ab.id === "fam_nightfeather_curse") {
    const foe =
      (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) ||
      battle.units.find((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 7);
    if (foe) {
      const dmg = rollDie(battle.rng, 8) + 2;
      applyDamageToUnit(battle, foe, dmg, "necrotic", false, events);
      foe.conditions.Hexed = 2;
      events.push({ type: "bolt", fromX: unit.x, fromY: unit.y, fromZ: getUnitBaseH(battle, unit), toX: foe.x, toY: foe.y, toZ: getUnitBaseH(battle, foe), color: "#a855f7" });
      battle.logs.push(`🪶 ${unit.name} 透過夜羽傳遞【荊棘詛咒】命中 ${foe.name}，造成 ${dmg} 黯蝕傷害！`);
    }
  } else if (ab.id === "tactical_command") {
    const allies = battle.units.filter((u) => u.side === unit.side && !u.dead && unitGridDistance(unit, u) <= 4);
    for (const al of allies) {
      al.conditions.Blessed = Math.max(al.conditions.Blessed || 0, 2);
      if (al.turn) al.turn.movementLeft += 2;
      events.push({ type: "float", x: al.x, y: al.y, z: getUnitBaseH(battle, al) + 1.15, text: "🚩 戰術指揮!", color: "#fbbf24" });
    }
    battle.logs.push(`🚩 ${unit.name} 發動【戰術指揮光環】，${allies.length} 名友軍獲得祝福（命中+1d4）！`);
  } else if (ab.id === "hex_curse") {
    const foes = battle.units.filter((u) => u.side !== unit.side && u.hp > 0 && unitGridDistance(unit, u) <= 5);
    const foe = (targetId && battle.units.find((u) => u.id === targetId && u.hp > 0)) || foes[0];
    if (foe) {
      const dmg = rollDie(battle.rng, 6) + 2;
      applyDamageToUnit(battle, foe, dmg, "necrotic", false, events);
      foe.conditions.Frightened = Math.max(foe.conditions.Frightened || 0, 2);
      events.push({ type: "float", x: foe.x, y: foe.y, z: getUnitBaseH(battle, foe) + 1.25, text: "🧿 厄運纏身!", color: "#c084fc" });
      battle.logs.push(`🧿 ${unit.name} 對 ${foe.name} 降下【厄運詛咒】，造成 ${dmg} 黯蝕傷並陷入恐慌！`);
    }
  } else if (ab.id === "bardic_inspire") {
    const allies = battle.units.filter((u) => u.side === unit.side && !u.dead && unitGridDistance(unit, u) <= 4);
    for (const al of allies) {
      al.conditions.Blessed = Math.max(al.conditions.Blessed || 0, 2);
      al.hp = Math.min(al.maxHp, al.hp + 2);
      events.push({ type: "float", x: al.x, y: al.y, z: getUnitBaseH(battle, al) + 1.15, text: "🎵 激勵+2!", color: "#fde047" });
    }
    battle.logs.push(`🎵 ${unit.name} 奏響【詩人激勵】，為 ${allies.length} 名友軍賦予祝福並振奮士氣！`);
  }

  return { ok: true, events, battleEnded: checkBattleOutcome(battle) };
}

export function endUnitTurn(battle) {
  if (!battle || battle.ended || checkBattleOutcome(battle)) {
    return { events: [], battleEnded: true };
  }
  const roundEvents = [];
  const prev = getActiveUnit(battle);
  if (prev) {
    prev.turn = null;
    for (const [ck, val] of Object.entries(prev.conditions || {})) {
      if (typeof val === "number" && val < 90) {
        if (val <= 1) delete prev.conditions[ck];
        else prev.conditions[ck] = val - 1;
      }
    }
  }

  const len = battle.initiativeOrder.length;
  const startIdx = battle.turnIndex;
  let wrappedRound = false;
  for (let hop = 1; hop <= len; hop++) {
    const nextIdx = (startIdx + hop) % len;
    if (!wrappedRound && startIdx + hop >= len) {
      wrappedRound = true;
      battle.round += 1;
      // Decay timed map surfaces
      for (let y = 0; y < MAP_ROWS; y++) {
        for (let x = 0; x < MAP_COLS; x++) {
          const t = battle.map.grid[y][x];
          if (t.surfaceRounds > 0) {
            const decay = (battle.map?.weather === "rain" || battle.map?.weather === "lightning_storm") && t.surface === "fire" ? 2 : 1;
            t.surfaceRounds = Math.max(0, t.surfaceRounds - decay);
            if (t.surfaceRounds === 0) {
              t.surface = t.type === "water" ? "water" : t.type === "brazier" ? "fire" : "none";
            }
          }
        }
      }
      // Round 2 Story Wave Reinforcements (when story blueprint indicates incoming reinforcements)
      if (battle.round === 2 && battle.map?.foeWaves && !battle.waveReinforcementsTriggered) {
        battle.waveReinforcementsTriggered = true;
        const livingFoes = battle.units.filter((u) => u.side === "foe" && u.hp > 0);
        if (livingFoes.length > 0 && livingFoes.length < 6) {
          const sp = battle.map.foeSpawns.find((s) => s.footprint !== 2 && !getUnitAtCell(battle, s.x, s.y));
          if (sp) {
            const rf = hydrateMonsterUnit(battle.map.defaultFoes?.[0] || "goblin", battle.units.length, sp, battle.partyLevel || 3);
            rf.name = `${rf.name}(伏兵)`;
            battle.units.push(rf);
            battle.initiativeOrder.push(rf.id);
            battle.initiativeRolls[rf.id] = 11;
            battle.logs.push(`📣 劇情伏兵現身！敵方【${rf.name}】從戰場邊緣加入戰鬥！`);
            triggerBattleScriptLine(battle, "waveArrive", rf, roundEvents);
          }
        }
      }
      // Round 3 Reinforcements if alarm/objective prop is still active
      if (battle.round === 3 && !battle.reinforcementsTriggered) {
        const hasPendingObj = (battle.map.props || []).some((p) => p.interactable && !p.completed);
        const livingFoes = battle.units.filter((u) => u.side === "foe" && u.hp > 0);
        if (hasPendingObj && livingFoes.length > 0 && livingFoes.length < 6) {
          battle.reinforcementsTriggered = true;
          const sp = battle.map.foeSpawns.find((s) => s.footprint !== 2 && !getUnitAtCell(battle, s.x, s.y));
          if (sp) {
            const rf = hydrateMonsterUnit(battle.map.defaultFoes?.[0] || "goblin", battle.units.length, sp);
            rf.name = `${rf.name}(增援)`;
            battle.units.push(rf);
            battle.initiativeOrder.push(rf.id);
            battle.initiativeRolls[rf.id] = 10;
            battle.logs.push(`🚨 第 3 輪警報未除！敵方增援【${rf.name}】趕到戰場！`);
          }
        }
      }
    }
    const candidate = battle.units.find((u) => u.id === battle.initiativeOrder[nextIdx]);
    if (candidate && !candidate.dead && (candidate.side === "hero" || candidate.hp > 0)) {
      battle.turnIndex = nextIdx;
      const turnInfo = beginActiveTurn(battle);
      return { ...turnInfo, events: [...roundEvents, ...(turnInfo.events || [])] };
    }
  }

  return { events: roundEvents, battleEnded: checkBattleOutcome(battle) };
}

export function decideAllyTurn(battle, allyId) {
  const ally = battle.units.find((u) => u.id === allyId);
  const events = [];
  if (!ally || ally.dead || ally.hp <= 0 || ally.turn?.autoSkip || ally.conditions?.Unconscious || ally.conditions?.Paralyzed || ally.conditions?.Stunned) {
    return { events, battleEnded: checkBattleOutcome(battle) };
  }

  const foes = battle.units.filter((u) => u.side === "foe" && u.hp > 0);
  if (foes.length === 0) return { events, battleEnded: checkBattleOutcome(battle) };

  const playerHeroes = battle.units.filter((u) => u.side === "hero" && !u.isNpcAlly && !u.dead && u.hp > 0);

  if (ally.allyRole === "vip") {
    // VIP Escort AI: evade enemies, seek cover & stay near player heroes
    const reachable = computeReachable3D(battle, ally);
    let bestCell = null;
    let bestScore = -9999;
    const minFoeDist = (cx, cy) =>
      Math.min(...foes.map((f) => Math.abs(f.x - cx) + Math.abs(f.y - cy)));
    const curSafety = minFoeDist(ally.x, ally.y);

    for (const [, step] of reachable.entries()) {
      const fd = minFoeDist(step.x, step.y);
      const tile = battle.map.grid[step.y]?.[step.x];
      const coverBonus = tile?.cover ? 2.5 : 0;
      const heroNearBonus =
        playerHeroes.length > 0
          ? Math.max(0, 4 - Math.min(...playerHeroes.map((h) => Math.abs(h.x - step.x) + Math.abs(h.y - step.y)))) * 0.6
          : 0;
      const hazardPenalty = tile?.surface === "fire" || tile?.surface === "poison" ? -12 : 0;
      const score = fd * 1.8 + coverBonus + heroNearBonus + hazardPenalty;
      if (score > bestScore) {
        bestScore = score;
        bestCell = step;
      }
    }
    if (bestCell && (bestCell.x !== ally.x || bestCell.y !== ally.y) && bestScore > curSafety * 1.8 + 0.5) {
      const mv = executeMove(battle, ally.id, bestCell.x, bestCell.y);
      if (mv.events) events.push(...mv.events);
    }
    battle.logs.push(`👑 護送目標【${ally.name}】尋找掩護並保持警戒。`);
    events.push({ type: "float", x: ally.x, y: ally.y, z: 1.3, text: "🛡️ 躲避掩護", color: "#f59e0b" });
    return { events, battleEnded: checkBattleOutcome(battle) };
  }

  // Combat Ally AI: drink potion if badly wounded, otherwise move & attack nearest foe
  const hasPot = Array.isArray(ally.potions) && ally.potions.some((p) => p.qty > 0);
  if (ally.hp < ally.maxHp * 0.4 && hasPot && ally.turn.actionLeft > 0) {
    const pot = executeStandardAction(battle, ally.id, "potion", ally.id);
    if (pot.ok && pot.events) events.push(...pot.events);
  }

  const weapon = ally.weapons?.[0];
  if (!weapon) return { events, battleEnded: checkBattleOutcome(battle) };

  const target = [...foes].sort(
    (a, b) => unitGridDistance(ally, a) - unitGridDistance(ally, b) || a.hp - b.hp
  )[0];
  if (target && unitGridDistance(ally, target) > (weapon.rangeCells || 1) && ally.turn.movementLeft > 0) {
    const reachable = computeReachable3D(battle, ally);
    let bestStep = null;
    let bestScore = -9999;
    for (const [, step] of reachable.entries()) {
      const d = Math.abs(step.x - target.x) + Math.abs(step.y - target.y);
      const inRange = d <= (weapon.rangeCells || 1) ? 10 : 0;
      const score = inRange - d;
      if (score > bestScore) {
        bestScore = score;
        bestStep = step;
      }
    }
    if (bestStep) {
      const mv = executeMove(battle, ally.id, bestStep.x, bestStep.y);
      if (mv.events) events.push(...mv.events);
    }
  }

  if (ally.turn.actionLeft > 0 && target && target.hp > 0 && unitGridDistance(ally, target) <= (weapon.rangeCells || 1)) {
    const atk = executeWeaponAttack(battle, ally.id, weapon, target.x, target.y);
    if (atk.events) events.push(...atk.events);
  }

  return { events, battleEnded: checkBattleOutcome(battle) };
}

export function decideEnemyTurn(battle, enemyId) {
  const foe = battle.units.find((u) => u.id === enemyId);
  const events = [];
  if (!foe || foe.dead || foe.hp <= 0 || foe.turn?.autoSkip || foe.conditions?.Unconscious || foe.conditions?.Paralyzed || foe.conditions?.Stunned) {
    return { events, battleEnded: checkBattleOutcome(battle) };
  }

  const heroes = battle.units.filter((u) => u.side === "hero" && !u.dead && u.hp > 0);
  if (heroes.length === 0) return { events, battleEnded: checkBattleOutcome(battle) };

  const reachMap = computeReachable3D(battle, foe);
  const isRangedRole = /ranged|caster/.test(foe.aiBehavior || "");
  const rangedWpn = foe.weapons?.find((w) => w.isRanged);
  const meleeWpn = foe.weapons?.find((w) => !w.isRanged) || foe.weapons?.[0];

  let bestScore = -9999;
  let bestSpot = { x: foe.x, y: foe.y, path: [{ x: foe.x, y: foe.y }] };
  let bestTarget = null;
  let bestWpn = meleeWpn;

  for (const node of reachMap.values()) {
    const tile = battle.map.grid[node.y][node.x];
    let posScore = 0;
    if (tile.surface === "fire" || tile.type === "brazier") posScore -= 40;
    if (tile.surface === "electrified_water") posScore -= 30;
    if (tile.cover) posScore += 8;
    if (isRangedRole && tile.h >= 3) posScore += 28;

    for (const hero of heroes) {
      const dist = unitGridDistance(foe, hero, node.x, node.y);
      let wpn = meleeWpn;
      if (isRangedRole && rangedWpn && dist > 1) wpn = rangedWpn;
      if (!wpn && rangedWpn) wpn = rangedWpn;

      const reach = (wpn?.rangeCells || 1) + (wpn?.isRanged && tile.h - getUnitBaseH(battle, hero) >= 2 ? 2 : 0);
      const canHit = dist <= reach;
      let tScore = canHit ? 65 + (35 - hero.hp) * 0.4 : Math.max(0, 35 - dist * 4);
      if (!isRangedRole && canHit) {
        const allyEngaged = battle.units.some(
          (a) => a.id !== foe.id && a.side === "foe" && a.hp > 0 && unitGridDistance(a, hero) <= 2
        );
        if (allyEngaged) tScore += 18; // Active flanking coordination
      }
      if (isRangedRole && dist <= 1) tScore -= 24;
      if (foe.aiBehavior === "support_caster" && tile.cover) tScore += 10;

      const total = posScore + tScore;
      if (total > bestScore) {
        bestScore = total;
        bestSpot = node;
        bestTarget = canHit ? hero : null;
        bestWpn = wpn;
      }
    }
  }

  // Nimble Escape for goblins moving away from melee
  if (foe.nimbleEscape && getAdjacentHostiles(battle, foe).length > 0 && bestSpot.path.length > 1) {
    executeStandardAction(battle, foe.id, "disengage", null, { asBonus: true });
  }

  if (bestSpot.x !== foe.x || bestSpot.y !== foe.y) {
    const mv = executeMove(battle, foe.id, bestSpot.x, bestSpot.y);
    events.push(...mv.events);
    if ((battle.map.grid[foe.y]?.[foe.x]?.h ?? 1) >= 3) {
      emitSpeechBubble(battle, foe, "high_ground", events);
    }
  }

  // Aggressive gap-closer Dash if melee foe still has no target in range
  if (foe.hp > 0 && !bestTarget && !isRangedRole && (foe.turn?.actionLeft || 0) > 0) {
    const dashRes = executeStandardAction(battle, foe.id, "dash");
    if (dashRes.ok) {
      events.push(...(dashRes.events || []));
      const reach2 = computeReachable3D(battle, foe);
      let closestNode = null;
      let minDist = 999;
      for (const node of reach2.values()) {
        for (const h of heroes) {
          const d = unitGridDistance(foe, h, node.x, node.y);
          if (d < minDist) {
            minDist = d;
            closestNode = node;
          }
        }
      }
      if (closestNode && (closestNode.x !== foe.x || closestNode.y !== foe.y)) {
        const mv2 = executeMove(battle, foe.id, closestNode.x, closestNode.y);
        events.push(...mv2.events);
      }
    }
  }

  if (foe.hp > 0 && bestTarget && bestTarget.hp > 0 && bestWpn) {
    // Support caster heals hurt ally first if needed
    const hurtFoe = foe.aiBehavior === "support_caster" && foe.spells?.some((s) => s.key === "Healing Word") && (foe.slots?.[1] || 0) > 0
      ? battle.units.find((u) => u.side === "foe" && u.hp > 0 && u.hp <= u.maxHp * 0.5)
      : null;

    if (hurtFoe) {
      const healRes = executeSpellCast(battle, foe.id, "Healing Word", hurtFoe.x, hurtFoe.y, 1);
      events.push(...healRes.events);
    }

    const swings = foe.extraAttacks || 1;
    for (let s = 0; s < swings; s++) {
      const curTarget = bestTarget.hp > 0 ? bestTarget : heroes.find((h) => h.hp > 0 && unitGridDistance(foe, h) <= (bestWpn.rangeCells || 1));
      if (!curTarget || foe.hp <= 0) break;
      const atkRes = resolveAttackInternal(battle, foe, curTarget, bestWpn, {}, events);
      battle.logs.push(`👹 ${foe.name} 使用【${bestWpn.name}】攻擊 ${curTarget.name}：${atkRes.summary}`);
      if (checkBattleOutcome(battle)) break;
    }
  }

  // Boss / Elite Telegraphing on even rounds (Into the Breach style)
  if (
    foe.hp > 0 &&
    !foe.telegraphing &&
    !foe.conditions?.Stunned &&
    (foe.footprint === 2 || (foe.cr || 0) >= 2) &&
    battle.round % 2 === 0
  ) {
    foe.telegraphing = { kind: "shockwave", radius: 2, dmgDice: "3d6" };
    events.push({ type: "float", x: foe.x, y: foe.y, z: getUnitBaseH(battle, foe) + 1.45, text: "⚠️ 蓄力：下輪重踏!", color: "#f97316" });
    battle.logs.push(`⚠️ 【危險預告】${foe.name} 正在蓄力，下回合將對周圍 2 格發動毀滅震波（可用推擊／擊退打斷）！`);
  }

  return { events, battleEnded: checkBattleOutcome(battle) };
}

export function executePropInteract(battle, actorId, propId) {
  const actor = battle.units.find((u) => u.id === actorId);
  const prop = (battle.map.props || []).find((p) => p.id === propId);
  if (!actor || actor.side !== "hero" || actor.hp <= 0) return { ok: false, reason: "無法互動" };
  if (!prop || prop.broken || prop.completed) return { ok: false, reason: "物件已損毀或已完成互動" };
  const dist = Math.max(Math.abs(actor.x - prop.x), Math.abs(actor.y - prop.y));
  if (dist > 1) return { ok: false, reason: "須先移動至物件旁 1 格內" };

  const isRogue = /rogue|盜賊|遊蕩/i.test(actor.className || "");
  const hasRequiredKey =
    !prop.requiresKey ||
    (battle.partyKeys || []).includes(prop.requiresKey) ||
    (actor.equipment || []).some((it) => String(it).includes(prop.requiresKey));

  if (prop.requiresKey && !hasRequiredKey && !isRogue) {
    return {
      ok: false,
      reason: `🔒 需要【${prop.keyLabel || prop.requiresKey}】才能開啟（或由盜賊強行撬鎖）`,
    };
  }

  if (isRogue && (actor.turn?.bonusLeft || 0) > 0) {
    actor.turn.bonusLeft -= 1;
  } else if ((actor.turn?.actionLeft || 0) > 0) {
    actor.turn.actionLeft -= 1;
  } else {
    return { ok: false, reason: "本回合已無可用主動作" };
  }

  // Stat-appropriate skill routing based on story skill or prop type
  const resolveSkillSpec = () => {
    const explicit = String(prop.skillName || prop.skill || "").trim();
    const explicitLower = explicit.toLowerCase();
    if (explicit) {
      if (/運動|athletics|力量|\bstr\b/.test(explicitLower)) return { statKey: "str", skillKey: "athletics", skillLabel: explicit };
      if (/特技|雜技|體操|acrobatics/.test(explicitLower)) return { statKey: "dex", skillKey: "acrobatics", skillLabel: explicit };
      if (/隱匿|潛行|stealth/.test(explicitLower)) return { statKey: "dex", skillKey: "stealth", skillLabel: explicit };
      if (/巧手|開鎖|拆除|sleight|\bdex\b|敏捷/.test(explicitLower)) return { statKey: "dex", skillKey: "sleight", skillLabel: explicit };
      if (/奧秘|arcana|調查|歷史|自然|戰術|智力|\bint\b/.test(explicitLower)) return { statKey: "int", skillKey: "arcana", skillLabel: explicit };
      if (/宗教|religion/.test(explicitLower)) return { statKey: "wis", skillKey: "religion", skillLabel: explicit };
      if (/察覺|洞悉|洞察|生存|求生|醫療|醫藥|馴獸|動物|perception|insight|survival|medicine|\bwis\b|感知/.test(explicitLower)) {
        return { statKey: "wis", skillKey: "perception", skillLabel: explicit };
      }
      if (/說服|威嚇|欺瞞|表演|交涉|persuasion|intimidation|deception|\bcha\b|魅力/.test(explicitLower)) {
        return { statKey: "cha", skillKey: "persuasion", skillLabel: explicit };
      }
    }
    if (prop.skillStat) {
      const fallbackMap = {
        str: { skillKey: "athletics", skillLabel: "運動" },
        dex: { skillKey: "sleight", skillLabel: "巧手" },
        int: { skillKey: "arcana", skillLabel: "奧秘" },
        wis: { skillKey: "religion", skillLabel: "宗教" },
        cha: { skillKey: "persuasion", skillLabel: "說服" },
      };
      const entry = fallbackMap[prop.skillStat] || fallbackMap.str;
      return { statKey: prop.skillStat, skillKey: entry.skillKey, skillLabel: explicit || entry.skillLabel };
    }
    const pDesc = `${prop.kind || ""} ${prop.name || ""}`;
    if (/arcane|well|obelisk|rune|魔|符文|奧術/.test(pDesc)) return { statKey: "int", skillKey: "arcana", skillLabel: "奧秘" };
    if (/altar|shrine|organ|pew|祭壇|神龕|聖歌/.test(pDesc)) return { statKey: "wis", skillKey: "religion", skillLabel: "宗教" };
    if (prop.flammable || /chest|door|gate|lock|trap|箱|門|柵|鎖/.test(pDesc)) return { statKey: "dex", skillKey: "sleight", skillLabel: "巧手" };
    return { statKey: "str", skillKey: "athletics", skillLabel: "運動" };
  };
  const { statKey, skillKey: mappedSkill, skillLabel } = resolveSkillSpec();
  const rawStatBonus = (actor.mods?.[statKey] ?? 1) + (actor.profBonus || 2);
  const bonus = mappedSkill && actor.skillBonuses?.[mappedSkill] !== undefined
    ? Math.max(actor.skillBonuses[mappedSkill], rawStatBonus)
    : rawStatBonus;
  const d20 = rollDie(battle.rng, 20);
  const total = d20 + bonus;
  const dc = prop.requiresKey && !hasRequiredKey ? Math.max(15, prop.dc || 15) : prop.dc || 10;
  const events = [];
  if (actor.side === "hero" && !(prop.requiresKey && hasRequiredKey)) {
    events.push({
      type: "dice",
      side: "hero",
      role: "check",
      actorName: actor.name,
      targetName: prop.name,
      actionName: `${skillLabel}檢定`,
      d20,
      advState: "normal",
      rolls: [d20],
      modTotal: bonus,
      modifiers: [`${skillLabel} (${bonus >= 0 ? "+" : ""}${bonus})`],
      total,
      targetValue: dc,
      targetLabel: "DC",
      formula: `1d20(${d20}) + ${skillLabel}(+${bonus}) = ${total} vs DC ${dc}`,
      hit: total >= dc,
      crit: d20 === 20 || total >= dc + 5,
    });
  }

  if (!(prop.requiresKey && hasRequiredKey) && total < dc) {
    if (d20 === 1) {
      const chip = rollDie(battle.rng, 4);
      actor.hp = Math.max(1, actor.hp - chip);
      events.push({ type: "float", x: prop.x, y: prop.y, z: 1.5, text: `💥 大失敗! 觸發反彈 -${chip}`, color: "#ef4444" });
      battle.logs.push(`💥 ${actor.name} 操作【${prop.name}】大失敗 (1)！遭到機關反震 ${chip} 點傷害！`);
    } else if (total >= dc - 3) {
      prop.hp = Math.max(1, (prop.hp || 15) - 6);
      events.push({ type: "float", x: prop.x, y: prop.y, z: 1.5, text: `差一點 (${total}/${dc}) 物件鬆動`, color: "#fbbf24" });
      battle.logs.push(`🔍 ${actor.name} 對【${prop.name}】${skillLabel}檢定 ${total} < DC ${dc}，雖未完全成功但已使物件鬆動（耐久 -6）！`);
    } else {
      events.push({ type: "float", x: prop.x, y: prop.y, z: 1.5, text: `檢定失敗 (${total}/${dc})`, color: "#f59e0b" });
      battle.logs.push(`🔍 ${actor.name} 對【${prop.name}】進行${skillLabel}檢定：${d20}+${bonus}=${total} < DC ${dc}，暫未成功。`);
    }
    return { ok: true, success: false, events };
  }

  const isCritSuccess = d20 === 20 || total >= dc + 5;
  if (isCritSuccess && actor.turn) {
    actor.turn.movementLeft = (actor.turn.movementLeft || 0) + 2;
    actor.tempHp = Math.max(actor.tempHp || 0, 4);
    battle.logs.push(`🌟 【大成功】${actor.name} 俐落掌控【${prop.name}】，額外獲得 +2 移動與 4 臨時護盾！`);
  }

  if (prop.requiresKey && hasRequiredKey) {
    battle.logs.push(`🗝️ ${actor.name} 使用【${prop.keyLabel || prop.requiresKey}】直接開啟了【${prop.name}】！`);
  }

  prop.completed = true;
  prop.broken = true;
  prop.blocksMove = false;
  refreshMapDerivedFlags(battle.map.grid, battle.map.props);
  events.push({ type: "flash", x: prop.x, y: prop.y, color: "#34d399" });
  events.push({ type: "float", x: prop.x, y: prop.y, z: 1.6, text: `✓ ${prop.actionLabel || "利用成功"}!`, color: "#34d399" });
  triggerPropDualStateEvent(battle, prop, actor, events);

  const heroes = battle.units.filter((u) => u.side === "hero" && !u.dead);
  const foes = battle.units.filter((u) => u.side === "foe" && u.hp > 0);

  let chestLoot = null;
  if (prop.rewardEffect === "heal_party") {
    for (const h of heroes) {
      if (h.hp === 0 && h.conditions?.Unconscious) {
        delete h.conditions.Unconscious;
        delete h.conditions.Prone;
      }
      h.hp = Math.min(h.maxHp, h.hp + 6);
      h.conditions.Blessed = Math.max(h.conditions.Blessed || 0, 2);
    }
  } else if (prop.rewardEffect === "weaken_foes") {
    for (const f of foes) {
      const dmg = rollDie(battle.rng, 6) + rollDie(battle.rng, 6);
      f.conditions.FaerieFire = Math.max(f.conditions.FaerieFire || 0, 3);
      applyDamageToUnit(battle, f, dmg, "radiant", false, events);
    }
  } else if (prop.rewardEffect === "shockwave") {
    for (const f of foes) {
      const dmg = rollDie(battle.rng, 6) + rollDie(battle.rng, 6);
      f.conditions.Prone = Math.max(f.conditions.Prone || 0, 1);
      applyDamageToUnit(battle, f, dmg, "cold", false, events);
    }
  } else if (prop.rewardEffect === "grant_potion") {
    addHeroConsumable(actor, "potion");
    addHeroConsumable(actor, "antidote");
    battle.map.grid[prop.y][prop.x].surface = "oil";
  } else if (prop.rewardEffect === "tower_zap") {
    const nearest = [...foes].sort((a, b) => unitGridDistance(prop, a) - unitGridDistance(prop, b))[0];
    if (nearest) {
      const dmg = rollDie(battle.rng, 8) + rollDie(battle.rng, 8) + 2;
      applyDamageToUnit(battle, nearest, dmg, "lightning", false, events);
      events.push({ type: "bolt", fromX: prop.x, fromY: prop.y, toX: nearest.x, toY: nearest.y, color: "#38bdf8" });
      battle.logs.push(`⚡ 防禦塔充能完成！向【${nearest.name}】射出 ${dmg} 點雷電光束！`);
    }
    for (const h of heroes) h.tempHp = Math.max(h.tempHp || 0, 5);
  } else if (prop.rewardEffect === "haste_party") {
    for (const h of heroes) {
      h.speedBonus = Math.max(h.speedBonus || 0, 3);
      if (h.turn) h.turn.movementLeft += 3;
    }
    battle.logs.push(`🏃 疾風加速符文啟動！全隊移動力 +3 格，全力追擊！`);
  } else if (prop.rewardEffect === "collect_progress") {
    battle.collectedRelics = (battle.collectedRelics || 0) + 1;
    actor.tempHp = Math.max(actor.tempHp || 0, 6);
    if (battle.collectedRelics >= 3) {
      for (const h of heroes) {
        h.tempHp = Math.max(h.tempHp || 0, 10);
        h.conditions.Blessed = Math.max(h.conditions.Blessed || 0, 4);
      }
      battle.logs.push(`💎 秘寶收集全數達成（3/3）！全隊獲得祝福與 10 點臨時 HP！`);
    } else {
      battle.logs.push(`💎 成功收集遺跡秘寶（${battle.collectedRelics}/3）！`);
    }
  } else if (prop.rewardEffect === "inspire_party") {
    for (const h of heroes) {
      h.tempHp = Math.max(h.tempHp || 0, 8);
      h.conditions.Blessed = Math.max(h.conditions.Blessed || 0, 3);
    }
  } else if (prop.rewardEffect === "aoe_holy_burst") {
    for (const f of foes) {
      const dmg = rollDie(battle.rng, 8) + rollDie(battle.rng, 6);
      applyDamageToUnit(battle, f, dmg, "radiant", false, events);
    }
  } else {
    // Generic prop tactical interaction (cover/loot/oil)
    const propMetaTxt = `${prop.kind || ""} ${prop.templateKey || ""} ${prop.key || ""} ${prop.name || ""}`;
    const isModuleExclusiveProp = Boolean(prop.isObjective || prop.requiresKey || prop.isQuestProp || prop.moduleExclusive);
    const isTreasureChest =
      !isModuleExclusiveProp &&
      (prop.kind === "chest" || /chest|寶箱|密箱|補給箱|藏寶/i.test(propMetaTxt));
    const chestRollsSoFar = battle.chestLootRollCount || 0;

    if (isTreasureChest && chestRollsSoFar < 2) {
      battle.chestLootRollCount = chestRollsSoFar + 1;
      chestLoot = rollChestLootD100(battle.rng);
      if (chestLoot.potions) addHeroConsumable(actor, "potion");
      if (chestLoot.antidotes) addHeroConsumable(actor, "antidote");
      if (chestLoot.item) {
        battle.chestLootItems = [...(battle.chestLootItems || []), chestLoot.item];
      }
      const diceEv = events.find((ev) => ev.type === "dice");
      if (diceEv) {
        diceEv.dmgDice = [
          { sides: 10, value: chestLoot.tens * 10, tag: "十位 d10" },
          { sides: 10, value: chestLoot.ones, tag: "個位 d10" },
        ];
        diceEv.dmgSummary = chestLoot.summaryText;
      }
      events.push({
        type: "float",
        x: prop.x,
        y: prop.y,
        z: 1.9,
        text: chestLoot.item ? `🎲 d100=${chestLoot.d100} 得【${chestLoot.item.name}】!` : `🎲 d100=${chestLoot.d100} 搜獲補給!`,
        color: chestLoot.item ? "#fbbf24" : "#34d399",
      });
      battle.logs.push(`🎁 ${actor.name} 打開【${prop.name}】擲出 d100=${chestLoot.d100}：${chestLoot.summaryText}`);
    } else if (prop.kind === "crate" || /箱|櫃|貨箱/i.test(propMetaTxt)) {
      addHeroConsumable(actor, "potion");
      battle.logs.push(`🧪 ${actor.name} 從【${prop.name}】搜出治療藥水 +1。`);
    } else if (prop.flammable) {
      battle.map.grid[prop.y][prop.x].surface = "oil";
      battle.logs.push(`🛢️ ${actor.name} 推倒【${prop.name}】，地面灑落易燃油漬（可用火焰引爆）！`);
    } else {
      actor.conditions.Blessed = Math.max(actor.conditions.Blessed || 0, 1);
      battle.logs.push(`🛡️ ${actor.name} 巧妙利用【${prop.name}】建立戰術優勢（祝福 1 輪）！`);
    }
  }

  battle.logs.push(`🎯 ${actor.name} 【${skillLabel}】檢定 ${total} ≥ DC ${dc}，成功互動【${prop.name}】！${prop.rewardDesc || ""}`);
  if (prop.isObjective || prop.interactable) {
    triggerBattleScriptLine(battle, "propLine", actor, events);
  }
  emitSpeechBubble(battle, actor, "interact_ok", events);
  checkBattleOutcome(battle);
  return { ok: true, success: true, chestLoot, events };
}

export function executePartyRetreat(battle) {
  if (!battle || battle.ended) return { ok: false, reason: "戰鬥已結束" };
  battle.ended = true;
  battle.outcome = "retreat";
  battle.logs.push("🏃 隊伍掩護彼此成功脫離戰場，戰術撤退並保留當前狀態返回跑團桌。");
  return { ok: true, events: [] };
}

export function applyShoutOrImprovAction(battle, actorId, text, aiResult = null) {
  const actor = battle.units.find((u) => u.id === actorId) || getActiveUnit(battle);
  if (!actor || battle.ended) return { ok: false, reason: "無法執行喊話或創意行動" };
  if (actor.turn?.shoutUsed) return { ok: false, reason: "本回合已執行過喊話／創意行動" };
  const cleanText = String(text || "").trim();
  if (!cleanText) return { ok: false, reason: "請輸入喊話或創意行動內容" };
  if (actor.turn) actor.turn.shoutUsed = true;

  const events = [];
  const livingFoes = battle.units.filter((u) => u.side === "foe" && u.hp > 0);
  const livingHeroes = battle.units.filter((u) => u.side === "hero" && u.hp > 0 && !u.dead);

  let effectType = aiResult?.effectType || null;
  let narration = aiResult?.narration || "";
  let success = aiResult?.success;

  if (!aiResult) {
    // Local D&D 5e adjudication when no AI API key is configured
    let statKey = "cha";
    let skillLabel = "威嚇/說服";
    let candidateEffect = "frighten_foes";
    if (/火|燒|燈|油|爆|桶/.test(cleanText)) {
      statKey = "dex";
      skillLabel = "巧手/特技";
      candidateEffect = "ignite_area";
    } else if (/推|撞|絆|砍斷|砸|拉/.test(cleanText)) {
      statKey = "str";
      skillLabel = "運動";
      candidateEffect = "knockdown_foe";
    } else if (/鼓舞|加油|重整|掩護|聖光|戰吼/.test(cleanText)) {
      statKey = "cha";
      skillLabel = "說服/領導";
      candidateEffect = "inspire_party";
    }
    const skillMap = { str: "athletics", dex: "sleight", int: "arcana", wis: "religion" };
  const mappedSkill = skillMap[statKey];
  const rawStatBonus = (actor.mods?.[statKey] ?? 1) + (actor.profBonus || 2);
  const bonus = mappedSkill && actor.skillBonuses?.[mappedSkill] !== undefined
    ? Math.max(actor.skillBonuses[mappedSkill], rawStatBonus)
    : rawStatBonus;
    const d20 = rollDie(battle.rng, 20);
    const total = d20 + bonus;
    const dc = 12;
    success = total >= dc;
    if (actor.side === "hero") {
      events.push({
        type: "dice",
        side: "hero",
        role: "check",
        actorName: actor.name,
        targetName: "戰場目標",
        actionName: `${skillLabel}喊話`,
        d20,
        advState: "normal",
        rolls: [d20],
        modTotal: bonus,
        modifiers: [`${skillLabel} (${bonus >= 0 ? "+" : ""}${bonus})`],
        total,
        targetValue: dc,
        targetLabel: "DC",
        formula: `1d20(${d20}) + ${skillLabel}(+${bonus}) = ${total} vs DC ${dc}`,
        hit: success,
        crit: d20 === 20,
      });
    }
    effectType = success ? candidateEffect : "none";
    narration = success
      ? `🎲 ${actor.name}【${skillLabel}】${d20}+${bonus}=${total} ≥ DC ${dc}，行動奏效！「${cleanText}」`
      : `🎲 ${actor.name}【${skillLabel}】${d20}+${bonus}=${total} < DC ${dc}，敵人未被動搖。`;
  }

  if (success && effectType === "surrender_weak") {
    const targetFoe = livingFoes.find((f) => (f.cr || 0.5) < 2 && f.hp <= Math.ceil(f.maxHp * 0.6)) || livingFoes[0];
    if (targetFoe) {
      targetFoe.surrendered = true;
      targetFoe.captured = true;
      targetFoe.hp = 0;
      events.push({ type: "float", x: targetFoe.x, y: targetFoe.y, z: 1.5, text: "🏳️ 投降!", color: "#38bdf8" });
    }
  } else if (success && effectType === "frighten_foes") {
    for (const f of livingFoes) {
      if ((f.cr || 0.5) < 1 && f.hp <= Math.ceil(f.maxHp * 0.35)) {
        f.surrendered = true;
        f.captured = true;
        f.hp = 0;
        events.push({ type: "float", x: f.x, y: f.y, z: 1.5, text: "🏳️ 潰散投降!", color: "#38bdf8" });
      } else {
        f.conditions.Frightened = Math.max(f.conditions.Frightened || 0, 2);
        events.push({ type: "float", x: f.x, y: f.y, z: 1.4, text: "😱 恐懼!", color: "#f59e0b" });
      }
    }
  } else if (success && effectType === "inspire_party") {
    for (const h of livingHeroes) {
      h.conditions.Blessed = Math.max(h.conditions.Blessed || 0, 2);
      events.push({ type: "float", x: h.x, y: h.y, z: 1.4, text: "✨ 鼓舞祝福!", color: "#34d399" });
    }
  } else if (success && effectType === "ignite_area" && livingFoes[0]) {
    const tf = livingFoes[0];
    battle.map.grid[tf.y][tf.x].surface = "fire";
    battle.map.grid[tf.y][tf.x].surfaceRounds = 2;
    const dmg = rollDie(battle.rng, 6) + rollDie(battle.rng, 6);
    applyDamageToUnit(battle, tf, dmg, "fire", false, events);
  } else if (success && effectType === "knockdown_foe" && livingFoes[0]) {
    const tf = livingFoes[0];
    tf.conditions.Prone = Math.max(tf.conditions.Prone || 0, 1);
    const dmg = rollDie(battle.rng, 8) + (actor.mods?.str ?? 2);
    applyDamageToUnit(battle, tf, Math.max(2, dmg), "bludgeoning", false, events);
  }

  battle.logs.push(`💬 ${narration}`);
  checkBattleOutcome(battle);
  return { ok: true, success: Boolean(success), effectType, narration, events };
}

export function executeSummonAlly(battle, casterId) {
  const caster = battle.units.find((u) => u.id === casterId);
  if (!caster || caster.side !== "hero" || caster.hp <= 0) return { ok: false, reason: "無法召喚" };
  if ((caster.turn?.actionLeft || 0) <= 0) return { ok: false, reason: "本回合已無主動作" };
  if ((caster.slots?.[1] || 0) <= 0) return { ok: false, reason: "需要 1 環法術位才能召喚靈體戰友" };

  let spawnCell = null;
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1], [2, 0], [0, -2]]) {
    const nx = caster.x + dx;
    const ny = caster.y + dy;
    if (!inMapBounds(nx, ny)) continue;
    const t = battle.map.grid[ny]?.[nx];
    if (t?.walkable && !getUnitAtCell(battle, nx, ny)) {
      spawnCell = { x: nx, y: ny };
      break;
    }
  }
  if (!spawnCell) return { ok: false, reason: "周圍無空地可召喚" };

  caster.turn.actionLeft -= 1;
  caster.slots[1] -= 1;
  const sumId = `summon_${caster.id}_${battle.units.length}`;
  const wolf = {
    id: sumId,
    name: `${caster.name.slice(0, 3)}的靈體戰狼`,
    className: "Summon",
    side: "hero",
    isSummon: true,
    sizeCategory: "medium",
    heightScale: 0.85,
    footprint: 1,
    x: spawnCell.x,
    y: spawnCell.y,
    hp: 14,
    maxHp: 14,
    ac: 13,
    speedCells: 7,
    profBonus: 2,
    initiativeBonus: 2,
    mods: { str: 2, dex: 2, con: 1, int: -2, wis: 1, cha: -1 },
    saves: [],
    conditions: {},
    resistances: [],
    immunities: ["poison"],
    vulnerabilities: [],
    weapons: [
      { id: "spirit_bite", name: "靈體噬咬", isRanged: false, rangeCells: 1, hitBonus: 5, damageDice: "1d8+2", damageType: "force" },
    ],
    spells: [],
    abilities: [],
    slots: {},
    potions: [],
    avatar: "/prototype-assets/lego-token-fixes-v1/ranger.png",
    reactionLeft: 1,
    autoReactions: { oa: true, shield: false },
    dead: false,
  };
  battle.units.push(wolf);
  const cIdx = battle.initiativeOrder.indexOf(caster.id);
  const insertAt = cIdx >= 0 ? cIdx + 1 : battle.initiativeOrder.length;
  battle.initiativeOrder.splice(insertAt, 0, wolf.id);
  if (insertAt <= battle.turnIndex) battle.turnIndex += 1;
  battle.initiativeRolls[wolf.id] = battle.initiativeRolls[caster.id] || 12;

  const events = [
    { type: "teleport", x: spawnCell.x, y: spawnCell.y, color: "#38bdf8" },
    { type: "float", x: spawnCell.x, y: spawnCell.y, z: 1.4, text: "🐺 靈體召喚!", color: "#38bdf8" },
  ];
  battle.logs.push(`🐺 ${caster.name} 消耗 1 環法術位召喚【${wolf.name}】加入戰鬥序列！`);
  return { ok: true, summon: wolf, events };
}

export function triggerDynamicTerrainEvent(battle, kind = "flood") {
  const events = [];
  if (!battle?.map?.grid) return { ok: false, events };
  if (kind === "flood") {
    for (let y = 5; y <= 6; y++) {
      for (let x = 4; x <= 11; x++) {
        const t = battle.map.grid[y]?.[x];
        if (!t || !t.walkable) continue;
        if (t.surface === "fire") {
          t.surface = "steam_cloud";
          t.surfaceRounds = 2;
        } else {
          t.type = "water";
          t.surface = "water";
          t.surfaceRounds = 3;
        }
      }
    }
    for (const u of battle.units) {
      if (!u.dead && u.hp > 0 && u.y >= 5 && u.y <= 6 && u.x >= 4 && u.x <= 11) {
        applyKnockback(battle, u, 1, 0, 1, events);
      }
    }
    battle.logs.push("🌊 【動態地形：洪水暴漲】中央地帶化為急流並沖退站立角色！");
    return { ok: true, events };
  }
  if (kind === "poison_vent") {
    for (let y = 4; y <= 7; y++) {
      for (let x = 6; x <= 9; x++) {
        const t = battle.map.grid[y]?.[x];
        if (t && t.walkable) {
          t.surface = "poison";
          t.surfaceRounds = 3;
        }
      }
    }
    battle.logs.push("☠️ 【動態地形：毒氣噴發】中央區域瀰漫劇毒霧氣！");
    return { ok: true, events };
  }
  return { ok: false, events };
}

export function executeCureConditions(battle, actorId, targetId = actorId, mode = "antidote") {
  const actor = battle.units.find((u) => u.id === actorId);
  const target = battle.units.find((u) => u.id === targetId) || actor;
  if (!actor || !target || actor.side !== "hero" || target.side !== "hero" || actor.hp <= 0 || target.dead) {
    return { ok: false, reason: "無效的淨化目標" };
  }
  const dist = unitGridDistance(actor, target);
  if (mode === "antidote") {
    if ((actor.antidotes || 0) <= 0) return { ok: false, reason: "已無萬用解毒淨化劑" };
    if (dist > 1) return { ok: false, reason: "須站在隊友旁 1 格內才能餵服解藥" };
    if ((actor.turn?.bonusLeft || 0) > 0) actor.turn.bonusLeft -= 1;
    else if ((actor.turn?.actionLeft || 0) > 0) actor.turn.actionLeft -= 1;
    else return { ok: false, reason: "本回合已無可用動作" };
    actor.antidotes -= 1;
  } else {
    if (!actor.isCleric && !actor.isPaladin && !actor.isBard) {
      return { ok: false, reason: "僅牧師／聖武士／吟遊詩人可施放復原淨化術" };
    }
    if (dist > 3) return { ok: false, reason: "目標超出淨化術 3 格射程" };
    if ((actor.turn?.actionLeft || 0) <= 0) return { ok: false, reason: "本回合已無主動作" };
    actor.turn.actionLeft -= 1;
  }

  const curable = ["Poisoned", "Blinded", "Deafened", "Frightened", "Paralyzed", "Stunned", "Restrained", "Charmed"];
  const cured = [];
  for (const ck of curable) {
    if (target.conditions?.[ck]) {
      delete target.conditions[ck];
      cured.push(ck);
    }
  }
  const events = [
    { type: "heal", x: target.x, y: target.y, z: getUnitBaseH(battle, target) },
    { type: "float", x: target.x, y: target.y, z: getUnitBaseH(battle, target) + 1.35, text: "💊 異常淨化!", color: "#34d399" },
  ];
  battle.logs.push(
    `💊 ${actor.name} 使用【${mode === "antidote" ? "萬用解毒淨化劑" : "復原淨化術"}】為 ${target.name} 解除異常狀態${cured.length ? `（${cured.join("、")}）` : ""}！`
  );
  return { ok: true, cured, events };
}

export function exportBattleSummary(battle) {
  const heroes = battle.units.filter((u) => u.side === "hero" && !u.isNpcAlly);
  const allies = battle.units.filter((u) => u.side === "hero" && u.isNpcAlly);
  const foes = battle.units.filter((u) => u.side === "foe");
  const lootGuide = getLootGuidelines(
    battle.partyLevel || 3,
    heroes.map((h) => h.className),
    "combat"
  );
  const completedObjectives = (battle.map.props || [])
    .filter((p) => p.interactable && p.completed)
    .map((p) => ({ id: p.id, name: p.name, objectiveType: p.objectiveType, rewardDesc: p.rewardDesc }));

  const vipUnits = allies.filter((a) => a.allyRole === "vip");
  const vipProtected = vipUnits.length > 0 && vipUnits.every((v) => !v.dead && v.hp > 0);
  const vipLost = vipUnits.some((v) => v.dead || v.hp <= 0);

  return {
    engine: "tactical3d-dnd5e",
    scenarioId: battle.scenarioId,
    scenarioName: battle.map.name,
    outcome: battle.outcome || "ongoing",
    rounds: battle.round,
    partyStatus: heroes.map((h) => ({
      id: h.id,
      name: h.name,
      hp: h.hp,
      maxHp: h.maxHp,
      dead: h.dead,
      slotsRemaining: h.slots,
    })),
    allyStatus: allies.map((a) => ({
      id: a.id,
      storyCastId: a.storyCastId || null,
      name: a.name,
      allyRole: a.allyRole,
      hp: a.hp,
      maxHp: a.maxHp,
      dead: a.dead || a.hp <= 0,
    })),
    vipProtected,
    vipLost,
    defeatedFoes: foes.filter((f) => f.hp <= 0 && !f.captured && !f.surrendered).map((f) => ({ id: f.templateId, name: f.name, xp: f.xp })),
    capturedFoes: foes.filter((f) => f.captured && !f.surrendered).map((f) => ({ id: f.templateId, name: f.name, xp: f.xp })),
    surrenderedFoes: foes.filter((f) => f.surrendered).map((f) => ({ id: f.templateId, name: f.name, xp: f.xp })),
    completedObjectives,
    totalXp: foes.filter((f) => f.hp <= 0).reduce((acc, f) => acc + (f.xp || 50), 0),
    suggestedLootTier: lootGuide?.maxRarity || "uncommon",
    chestLootItems: battle.chestLootItems || [],
    scriptBeats: battle._scriptBeats || [],
    recentLogs: battle.logs.slice(-8),
  };
}
