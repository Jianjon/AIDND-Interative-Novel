// Equipment & Loot Catalog for AI D&D Interactive Novel (shared by Character Sheet & 3D Tactical Engine)

export const EQUIP_SLOTS = [
  { key: "weapon", label: "主手武器", icon: "⚔️" },
  { key: "armor", label: "護甲", icon: "🦺" },
  { key: "shield", label: "副手／盾牌", icon: "🛡️" },
  { key: "accessory", label: "飾品／魔法物品", icon: "💍" },
];

export const LOOT_EQUIPMENT_POOL = [
  // Common / Uncommon Weapons
  {
    id: "eq_fine_longsword",
    name: "精良長劍 +1",
    slot: "weapon",
    rarity: "uncommon",
    attackBonus: 1,
    damageBonus: 1,
    weaponName: "精良長劍 +1",
    desc: "鍛造精良的鋼鐵長劍，命中與傷害 +1。",
  },
  {
    id: "eq_hunter_bow",
    name: "獵手長弓 +1",
    slot: "weapon",
    rarity: "uncommon",
    attackBonus: 1,
    damageBonus: 1,
    weaponName: "獵手長弓 +1",
    desc: "弦力穩定的紫杉長弓，命中與傷害 +1。",
  },
  {
    id: "eq_arcane_staff",
    name: "秘法法杖 +1",
    slot: "weapon",
    rarity: "uncommon",
    attackBonus: 1,
    damageBonus: 1,
    weaponName: "秘法法杖 +1",
    desc: "鑲嵌奧術晶石的法杖，攻擊與法術傷害 +1。",
  },
  {
    id: "eq_cold_iron_axe",
    name: "寒鐵戰斧 +1",
    slot: "weapon",
    rarity: "uncommon",
    attackBonus: 1,
    damageBonus: 1,
    weaponName: "寒鐵戰斧 +1",
    desc: "對妖精與魔物格外致命的寒鐵戰斧，命中與傷害 +1。",
  },
  {
    id: "eq_runic_blade_2",
    name: "符文聖劍 +2",
    slot: "weapon",
    rarity: "rare",
    attackBonus: 2,
    damageBonus: 2,
    weaponName: "符文聖劍 +2",
    desc: "刻滿古代戰紋的利刃，命中與傷害 +2。",
  },
  // Armor & Shields
  {
    id: "eq_studded_leather_1",
    name: "強化鑲嵌皮甲 +1",
    slot: "armor",
    rarity: "uncommon",
    acBonus: 1,
    desc: "輕盈卻堅韌的秘製皮甲，防禦等級 AC +1。",
  },
  {
    id: "eq_mithral_breastplate",
    name: "秘銀胸甲 +1",
    slot: "armor",
    rarity: "uncommon",
    acBonus: 2,
    desc: "閃耀銀輝的輕量化胸甲，防禦等級 AC +2。",
  },
  {
    id: "eq_steel_plate_2",
    name: "精鋼重甲 +2",
    slot: "armor",
    rarity: "rare",
    acBonus: 3,
    desc: "王室衛隊規格的精鋼護甲，防禦等級 AC +3。",
  },
  {
    id: "eq_guard_shield",
    name: "守護圓盾",
    slot: "shield",
    rarity: "common",
    acBonus: 2,
    desc: "堅固的包鐵圓盾，防禦等級 AC +2。",
  },
  {
    id: "eq_ward_buckler_1",
    name: "哨衛秘盾 +1",
    slot: "shield",
    rarity: "uncommon",
    acBonus: 3,
    desc: "刻有防護印記的精鋼盾，防禦等級 AC +3。",
  },
  // Accessories / Magic Items
  {
    id: "eq_cloak_protection",
    name: "防護斗篷",
    slot: "accessory",
    rarity: "uncommon",
    acBonus: 1,
    desc: "織入防護絲線的披風，防禦等級 AC +1。",
  },
  {
    id: "eq_ring_protection",
    name: "防護戒指",
    slot: "accessory",
    rarity: "rare",
    acBonus: 1,
    attackBonus: 1,
    desc: "散發微光的銀戒，AC +1 且命中 +1。",
  },
  {
    id: "eq_gauntlets_might",
    name: "蠻力護手",
    slot: "accessory",
    rarity: "uncommon",
    damageBonus: 2,
    desc: "強化握力與揮擊威力的皮鋼護手，傷害 +2。",
  },
  {
    id: "eq_boots_striding",
    name: "疾行之靴",
    slot: "accessory",
    rarity: "uncommon",
    speedBonus: 1,
    desc: "步履如風的附魔長靴，移動力 +1 格（+5 呎）。",
  },
];

let uidSeq = 1;
export function createLootInstance(template) {
  uidSeq += 1;
  return {
    ...template,
    uid: `${template.id}_${Date.now().toString(36)}_${uidSeq}`,
  };
}

export function generateBattleLootDrops(summary) {
  if (!summary || summary.outcome !== "victory") return [];
  const tier = String(summary.suggestedLootTier || "uncommon").toLowerCase();
  const foeCount = Array.isArray(summary.defeatedFoes) ? summary.defeatedFoes.length : 0;
  if (foeCount <= 0 && !summary.totalXp) return [];

  const allowedRarities =
    tier === "rare" || tier === "very_rare"
      ? ["uncommon", "rare"]
      : ["common", "uncommon"];
  const candidates = LOOT_EQUIPMENT_POOL.filter((item) => allowedRarities.includes(item.rarity));
  if (candidates.length === 0) return [];

  const seedNum = Math.abs(
    (Number(summary.totalXp) || 50) +
      (Number(summary.rounds) || 1) * 17 +
      foeCount * 31
  );
  const first = candidates[seedNum % candidates.length];
  const drops = [createLootInstance(first)];

  // Boss / tough fight (3+ foes or rare tier) yields a second item from a different slot
  if (foeCount >= 3 || tier === "rare" || tier === "very_rare") {
    const altPool = candidates.filter((c) => c.slot !== first.slot);
    if (altPool.length > 0) {
      const second = altPool[(seedNum + 7) % altPool.length];
      drops.push(createLootInstance(second));
    }
  }
  return drops;
}

export function computeGearBonuses(equippedGear = {}) {
  let attackBonus = 0;
  let damageBonus = 0;
  let acBonus = 0;
  let speedBonus = 0;
  for (const slot of EQUIP_SLOTS) {
    const item = equippedGear?.[slot.key];
    if (!item) continue;
    attackBonus += Number(item.attackBonus) || 0;
    damageBonus += Number(item.damageBonus) || 0;
    acBonus += Number(item.acBonus) || 0;
    speedBonus += Number(item.speedBonus) || 0;
  }
  return { attackBonus, damageBonus, acBonus, speedBonus };
}

function applyGearDeltaToHero(hero, prevGear, nextGear) {
  const prevB = computeGearBonuses(prevGear);
  const nextB = computeGearBonuses(nextGear);
  const dAtk = nextB.attackBonus - prevB.attackBonus;
  const dDmg = nextB.damageBonus - prevB.damageBonus;
  const dAc = nextB.acBonus - prevB.acBonus;
  const dSpd = nextB.speedBonus - prevB.speedBonus;

  const baseWeapon = hero.baseWeaponName || hero.weapon;
  const equippedWeaponName = nextGear?.weapon?.weaponName || nextGear?.weapon?.name || null;

  return {
    ...hero,
    baseWeaponName: baseWeapon,
    equippedGear: nextGear,
    attackBonus: (Number(hero.attackBonus) || 0) + dAtk,
    damageBonus: (Number(hero.damageBonus) || 0) + dDmg,
    armor: Math.max(10, (Number(hero.armor) || 12) + dAc),
    speed: Math.max(4, (Number(hero.speed) || 6) + dSpd),
    weapon: equippedWeaponName || baseWeapon,
    shield: Boolean(nextGear?.shield) || Boolean(hero.baseShield ?? hero.shield),
    baseShield: hero.baseShield !== undefined ? hero.baseShield : Boolean(hero.shield),
  };
}

export function equipStashItemOnSession(session, itemUid, heroId) {
  if (!session || !itemUid || !heroId) return session;
  const stash = Array.isArray(session.lootStash) ? session.lootStash : [];
  const itemIdx = stash.findIndex((it) => it.uid === itemUid);
  if (itemIdx < 0) return session;
  const item = stash[itemIdx];
  const slotKey = item.slot || "accessory";

  let swappedOut = null;
  let didEquip = false;
  const nextHeroes = (session.heroes || []).map((h) => {
    if (h.id !== heroId) return h;
    const prevGear = { ...(h.equippedGear || {}) };
    swappedOut = prevGear[slotKey] || null;
    const nextGear = { ...prevGear, [slotKey]: item };
    didEquip = true;
    return applyGearDeltaToHero(h, prevGear, nextGear);
  });

  if (!didEquip) return session;
  const nextStash = stash.filter((it) => it.uid !== itemUid);
  if (swappedOut) nextStash.unshift(swappedOut);

  return {
    ...session,
    heroes: nextHeroes,
    lootStash: nextStash,
  };
}

export function unequipHeroSlotOnSession(session, heroId, slotKey) {
  if (!session || !heroId || !slotKey) return session;
  let removed = null;
  const nextHeroes = (session.heroes || []).map((h) => {
    if (h.id !== heroId) return h;
    const prevGear = { ...(h.equippedGear || {}) };
    if (!prevGear[slotKey]) return h;
    removed = prevGear[slotKey];
    const nextGear = { ...prevGear };
    delete nextGear[slotKey];
    return applyGearDeltaToHero(h, prevGear, nextGear);
  });
  if (!removed) return session;
  const nextStash = [removed, ...(Array.isArray(session.lootStash) ? session.lootStash : [])];
  return {
    ...session,
    heroes: nextHeroes,
    lootStash: nextStash,
  };
}
