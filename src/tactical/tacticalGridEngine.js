// Tactical grid engine for combat-only 2.5D movement, obstacle/terrain awareness, and sync hero/foe choreography.

const DEAD_OR_GONE_FOE_STATUSES = new Set(["倒下", "投降", "逃走", "離開"]);
const IMMOBILIZING_CONDS_RE = /束縛|擒抱|麻痺|暈眩|石化|昏迷|時間靜止|定身/;
const SLOWING_CONDS_RE = /倒地|減速|泥濘|凍結/;

export function isCombatActive(session) {
  if (!session || session.stage !== "scene") return false;
  return (session.cast || []).some(
    (c) =>
      c &&
      c.kind === "foe" &&
      c.present &&
      !DEAD_OR_GONE_FOE_STATUSES.has(c.status) &&
      (c.hp === undefined || c.hp > 0),
  );
}

export function classifyPropTerrain(prop) {
  if (!prop || !prop.kind) {
    return { passable: true, moveCost: 1, avoidPenalty: 0, label: "" };
  }
  const kind = String(prop.kind);
  const state = String(prop.state || "");
  const name = prop.name || "";

  switch (kind) {
    case "boulder_cover":
      return state === "shattered"
        ? { difficult: true, moveCost: 2, avoidPenalty: 1, label: name || "崩裂碎石" }
        : { impassable: true, cover: true, blocksLos: true, label: name || "巨石掩體" };
    case "barricade_log":
      return state === "breached"
        ? { difficult: true, moveCost: 2, avoidPenalty: 1, label: name || "破開路障" }
        : { impassable: true, cover: true, blocksLos: false, label: name || "倒樹路障" };
    case "iron_gate":
      return state === "open"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name || "開啟鐵柵" }
        : { impassable: true, cover: true, blocksLos: false, label: name || "緊閉鐵柵" };
    case "chasm_pit":
      return state === "bridged"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name || "架橋裂縫" }
        : { impassable: true, hazard: true, cover: false, blocksLos: false, label: name || "深淵裂縫" };
    case "wooden_bridge":
      return state === "broken"
        ? { impassable: true, hazard: true, cover: false, blocksLos: false, label: name || "斷裂木橋" }
        : { passable: true, moveCost: 1, avoidPenalty: 0, label: name || "木橋" };
    case "covered_wagon":
    case "stone_sarcophagus":
    case "holy_statue":
    case "stone_well":
    case "iron_cage":
      return { impassable: true, cover: true, blocksLos: true, label: name };
    case "secret_bookshelf":
      return state === "open"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name }
        : { impassable: true, cover: true, blocksLos: true, label: name };
    case "wooden_crate":
      return { impassable: false, difficult: true, cover: true, moveCost: 2, avoidPenalty: 1, label: name || "木箱掩體" };
    case "difficult_rubble":
    case "rubble_pile":
      return state === "cleared"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name }
        : { difficult: true, moveCost: 2, avoidPenalty: 2, label: name || "碎石泥濘" };
    case "water_rapids":
      return {
        difficult: true,
        moveCost: 2,
        hazard: state === "surging",
        avoidPenalty: state === "surging" ? 10 : 3,
        label: name || "急流",
      };
    case "ice_slick":
      return {
        difficult: true,
        moveCost: 2,
        hazard: state === "cracked",
        avoidPenalty: state === "cracked" ? 12 : 4,
        label: name || "寒冰",
      };
    case "thorns_web":
      return state === "burned"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name }
        : { difficult: true, moveCost: 2, hazard: true, avoidPenalty: 12, label: name || "荊棘蛛網" };
    case "fire_zone":
      return state === "extinguished" || state === "out"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name }
        : { difficult: true, moveCost: 2, hazard: true, avoidPenalty: 20, label: name || "火場" };
    case "acid_lava_pool":
      return state === "cooled"
        ? { difficult: true, moveCost: 2, avoidPenalty: 2, label: name || "冷卻熔岩" }
        : { difficult: true, moveCost: 2, hazard: true, avoidPenalty: 24, label: name || "酸液岩漿" };
    case "bear_trap":
      return state === "snapped"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name }
        : { hazard: true, moveCost: 1, avoidPenalty: 16, label: name || "捕獸夾" };
    case "spike_trap":
      return state === "sprung"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name }
        : { hazard: true, moveCost: 1, avoidPenalty: 16, label: name || "刺針陷阱" };
    case "smoke_cloud":
      return state === "dispersed" || state === "clear"
        ? { passable: true, moveCost: 1, avoidPenalty: 0, label: name }
        : { concealment: true, stealthBonus: true, cover: true, moveCost: 1, avoidPenalty: 0, label: name || "濃霧" };
    case "oil_barrel":
    case "explosive_keg":
    case "ballista_turret":
    case "floor_lever":
    case "winch_mechanism":
    case "alarm_bell":
    case "healing_fountain":
    case "treasure_chest":
    case "arcane_portal":
    case "brazier_stand":
    case "blood_altar":
    case "rune_altar":
    case "mirror_pedestal":
    case "ancient_tome":
    case "supply_satchel":
    case "herb_patch":
    case "dock_rowboat":
    case "weapon_rack":
    case "pressure_plate":
    case "campfire":
      return {
        interactive: true,
        cover: ["ballista_turret", "arcane_portal", "blood_altar", "rune_altar", "healing_fountain"].includes(kind),
        moveCost: 1,
        avoidPenalty: kind === "campfire" ? 6 : 0,
        label: name,
      };
    default:
      return { passable: true, moveCost: 1, avoidPenalty: 0, label: name };
  }
}

function getPropRadiusCells(prop) {
  const size = String(prop?.size || "").toLowerCase();
  if (size === "xl" || size === "xxl" || size === "huge") return 1.15;
  if (size === "lg") return 0.75;
  return 0;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function roundPct(v) {
  return Math.round(v * 10) / 10;
}

export function buildTacticalGrid({
  mapId = "",
  aspect = 1.5,
  squares = 26,
  offset = [0, 0],
  wallCheckFn = null,
  props = [],
  propSpots = {},
} = {}) {
  const safeAspect = Number(aspect) > 0 ? Number(aspect) : 1.5;
  const safeSquares = Math.max(8, Math.min(60, Number(squares) || 26));
  const cw = 100 / safeSquares;
  const ch = cw * safeAspect;
  const offX = Array.isArray(offset) ? Number(offset[0]) || 0 : 0;
  const offY = Array.isArray(offset) ? Number(offset[1]) || 0 : 0;
  const x0 = offX * cw;
  const y0 = offY * ch;
  const cols = Math.max(8, Math.ceil((100 - x0) / cw));
  const rows = Math.max(6, Math.ceil((100 - y0) / ch));

  const pctToCell = (xPct, yPct) => ({
    cx: clamp(Math.floor(((Number(xPct) || 50) - x0) / cw), 0, cols - 1),
    cy: clamp(Math.floor(((Number(yPct) || 50) - y0) / ch), 0, rows - 1),
  });

  const cellToPct = (cx, cy) => [
    roundPct(clamp(x0 + (cx + 0.5) * cw, 3, 97)),
    roundPct(clamp(y0 + (cy + 0.5) * ch, 8, 95)),
  ];

  const cells = new Array(rows * cols);
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const [px, py] = cellToPct(cx, cy);
      const outOfBounds = px < 3 || px > 97 || py < 8 || py > 95;
      const isWall = outOfBounds || (typeof wallCheckFn === "function" ? !!wallCheckFn(px, py) : false);
      cells[cy * cols + cx] = {
        cx,
        cy,
        key: `${cx},${cy}`,
        px,
        py,
        wall: isWall,
        impassable: isWall,
        blocksLos: isWall,
        cover: isWall,
        adjacentCover: false,
        difficult: false,
        hazard: false,
        concealment: false,
        stealthBonus: false,
        interactive: false,
        moveCost: 1,
        avoidPenalty: 0,
        propLabels: [],
        coverLabels: [],
      };
    }
  }

  const getCell = (cx, cy) => {
    if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return null;
    return cells[cy * cols + cx];
  };

  const propsIndexed = {};
  for (const prop of props || []) {
    if (!prop || !prop.id) continue;
    const rawSpot = propSpots?.[prop.id];
    let px = null;
    let py = null;
    if (Array.isArray(rawSpot) && rawSpot.length >= 2) {
      px = Number(rawSpot[0]);
      py = Number(rawSpot[1]);
    } else if (rawSpot && Number.isFinite(Number(rawSpot.x)) && Number.isFinite(Number(rawSpot.y))) {
      px = Number(rawSpot.x);
      py = Number(rawSpot.y);
    }
    if (!Number.isFinite(px) || !Number.isFinite(py)) continue;

    const terrain = classifyPropTerrain(prop);
    const center = pctToCell(px, py);
    const radius = getPropRadiusCells(prop);
    propsIndexed[prop.id] = {
      prop,
      cell: center,
      pct: [px, py],
      terrain,
    };

    const span = Math.ceil(radius);
    for (let dy = -span; dy <= span; dy++) {
      for (let dx = -span; dx <= span; dx++) {
        if (Math.hypot(dx, dy) > radius + 0.05) continue;
        const cell = getCell(center.cx + dx, center.cy + dy);
        if (!cell) continue;
        if (terrain.label && !cell.propLabels.includes(terrain.label)) {
          cell.propLabels.push(terrain.label);
        }
        if (terrain.impassable) cell.impassable = true;
        if (terrain.blocksLos) cell.blocksLos = true;
        if (terrain.cover) cell.cover = true;
        if (terrain.difficult) cell.difficult = true;
        if (terrain.hazard) cell.hazard = true;
        if (terrain.concealment) cell.concealment = true;
        if (terrain.stealthBonus) cell.stealthBonus = true;
        if (terrain.interactive) cell.interactive = true;
        if (terrain.moveCost && terrain.moveCost > cell.moveCost) {
          cell.moveCost = terrain.moveCost;
        }
        if (terrain.avoidPenalty && terrain.avoidPenalty > cell.avoidPenalty) {
          cell.avoidPenalty = terrain.avoidPenalty;
        }
      }
    }
  }

  // Second pass: mark cells adjacent to walls or cover props
  const orthoDirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (const cell of cells) {
    if (cell.impassable) continue;
    for (const [dx, dy] of orthoDirs) {
      const nb = getCell(cell.cx + dx, cell.cy + dy);
      if (nb && (nb.wall || nb.cover)) {
        cell.adjacentCover = true;
        for (const lbl of nb.propLabels) {
          if (!cell.coverLabels.includes(lbl)) cell.coverLabels.push(lbl);
        }
      }
    }
  }

  return {
    mapId,
    aspect: safeAspect,
    squares: safeSquares,
    cw,
    ch,
    x0,
    y0,
    cols,
    rows,
    cells,
    propsIndexed,
    getCell,
    pctToCell,
    cellToPct,
  };
}

export function getUnitSpeedCells(unit, isHero = true) {
  if (!unit) return 6;
  const condList = [
    ...(Array.isArray(unit.tableConditions) ? unit.tableConditions : []),
    ...(Array.isArray(unit.conditions) ? unit.conditions : []),
  ];
  const condStr = condList.join(" ");
  if (IMMOBILIZING_CONDS_RE.test(condStr)) return 0;

  let base = Number.isFinite(unit.speedCells) && unit.speedCells > 0 ? Number(unit.speedCells) : 0;
  if (!base) {
    const info = `${unit.race || ""} ${unit.role || ""} ${unit.sourceProfile?.class || ""} ${unit.species || ""} ${unit.name || ""}`;
    if (/矮人|半身人|侏儒|dwarf|halfling|gnome/i.test(info)) {
      base = 5;
    } else if (/武僧|野蠻人|遊俠|偵察兵|劍刃舞者|狼|座狼|恐狼|豹|monk|barbarian|ranger|wolf/i.test(info)) {
      const lvl = Number(unit.level) || 1;
      base = /武僧|野蠻人/.test(info) && lvl >= 5 ? 8 : 7;
    } else {
      base = 6;
    }
  }

  if (isHero && (unit.hp <= 0 || unit.dead)) return 0;
  if (SLOWING_CONDS_RE.test(condStr)) {
    return Math.max(2, Math.floor(base / 2));
  }
  return base;
}

const DIRS_8 = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export function computeReachableCells(grid, startCell, maxSteps, occupiedByKey = new Map(), actorSide = "hero") {
  const result = new Map();
  if (!grid || !startCell) return result;
  const sKey = `${startCell.cx},${startCell.cy}`;
  const startNode = {
    cx: startCell.cx,
    cy: startCell.cy,
    key: sKey,
    cost: 0,
    diagCount: 0,
    hazardPenalty: 0,
    priority: 0,
    path: [{ cx: startCell.cx, cy: startCell.cy }],
    canStop: true,
    crossedTerrain: [],
    crossedHazard: false,
  };
  result.set(sKey, startNode);
  if (maxSteps <= 0) return result;

  const queue = [startNode];
  const bestPriority = new Map([[`${sKey}:0`, 0]]);
  const bestCost = new Map([[`${sKey}:0`, 0]]);

  while (queue.length > 0) {
    queue.sort((a, b) => a.priority - b.priority || a.cost - b.cost);
    const cur = queue.shift();
    const stateKey = `${cur.key}:${cur.diagCount % 2}`;
    if (
      bestPriority.has(stateKey) &&
      bestPriority.get(stateKey) < cur.priority &&
      bestCost.get(stateKey) <= cur.cost
    ) {
      continue;
    }

    for (const [dx, dy] of DIRS_8) {
      const nx = cur.cx + dx;
      const ny = cur.cy + dy;
      const nCell = grid.getCell(nx, ny);
      if (!nCell || nCell.impassable) continue;

      // No diagonal corner cutting across impassable walls/obstacles
      if (dx !== 0 && dy !== 0) {
        const c1 = grid.getCell(cur.cx + dx, cur.cy);
        const c2 = grid.getCell(cur.cx, cur.cy + dy);
        if (!c1 || !c2 || c1.impassable || c2.impassable) continue;
      }

      const nKey = nCell.key;
      const occ = occupiedByKey.get(nKey);
      if (occ && occ.side !== actorSide) continue; // Enemy blocks space

      const isDiag = dx !== 0 && dy !== 0;
      const nextDiag = cur.diagCount + (isDiag ? 1 : 0);
      const baseStep = isDiag && cur.diagCount % 2 === 1 ? 2 : 1;
      const terrainMul = nCell.moveCost || 1;
      const allyPassExtra = occ && occ.side === actorSide ? 1 : 0;
      const nextCost = cur.cost + baseStep * terrainMul + allyPassExtra;
      if (nextCost > maxSteps) continue;

      const stepHazard = nCell.avoidPenalty || 0;
      const nextHazardPenalty = cur.hazardPenalty + stepHazard;
      const nextPriority = nextCost + nextHazardPenalty;
      const nStateKey = `${nKey}:${nextDiag % 2}`;

      const prevP = bestPriority.get(nStateKey);
      const prevC = bestCost.get(nStateKey);
      if (prevP !== undefined && prevP <= nextPriority && prevC <= nextCost) {
        continue;
      }

      bestPriority.set(nStateKey, nextPriority);
      bestCost.set(nStateKey, nextCost);

      const crossedTerrain = [...cur.crossedTerrain];
      if ((nCell.difficult || nCell.hazard || nCell.concealment) && nCell.propLabels.length) {
        for (const lbl of nCell.propLabels) {
          if (!crossedTerrain.includes(lbl)) crossedTerrain.push(lbl);
        }
      }

      const canStop = !occ;
      const nextNode = {
        cx: nx,
        cy: ny,
        key: nKey,
        cost: nextCost,
        diagCount: nextDiag,
        hazardPenalty: nextHazardPenalty,
        priority: nextPriority,
        path: [...cur.path, { cx: nx, cy: ny }],
        canStop,
        crossedTerrain,
        crossedHazard: cur.crossedHazard || !!nCell.hazard,
      };
      queue.push(nextNode);

      const existing = result.get(nKey);
      if (
        !existing ||
        nextPriority < existing.priority ||
        (nextPriority === existing.priority && nextCost < existing.cost)
      ) {
        result.set(nKey, nextNode);
      }
    }
  }

  return result;
}

export function computeDistanceField(grid, targetCell, occupiedByKey = new Map(), actorSide = "hero") {
  const dist = new Map();
  if (!grid || !targetCell) return dist;

  // Seed from targetCell and its immediate passable neighbors if target itself is impassable/occupied
  const queue = [];
  const tCell = grid.getCell(targetCell.cx, targetCell.cy);
  if (tCell) {
    dist.set(tCell.key, 0);
    queue.push({ cx: tCell.cx, cy: tCell.cy, d: 0 });
  }

  while (queue.length > 0) {
    queue.sort((a, b) => a.d - b.d);
    const cur = queue.shift();
    for (const [dx, dy] of DIRS_8) {
      const nx = cur.cx + dx;
      const ny = cur.cy + dy;
      const nCell = grid.getCell(nx, ny);
      if (!nCell || nCell.impassable) continue;
      if (dx !== 0 && dy !== 0) {
        const c1 = grid.getCell(cur.cx + dx, cur.cy);
        const c2 = grid.getCell(cur.cx, cur.cy + dy);
        if (!c1 || !c2 || c1.impassable || c2.impassable) continue;
      }
      const occ = occupiedByKey.get(nCell.key);
      if (occ && occ.side !== actorSide && nCell.key !== tCell.key) continue;

      const step = (dx !== 0 && dy !== 0 ? 1.4 : 1) * (nCell.moveCost || 1) + (nCell.avoidPenalty ? nCell.avoidPenalty * 0.25 : 0);
      const nd = cur.d + step;
      if (!dist.has(nCell.key) || dist.get(nCell.key) > nd) {
        dist.set(nCell.key, nd);
        queue.push({ cx: nx, cy: ny, d: nd });
      }
    }
  }
  return dist;
}

export function hasLineOfSight(grid, fromCell, toCell) {
  if (!grid || !fromCell || !toCell) return true;
  let x0 = fromCell.cx;
  let y0 = fromCell.cy;
  const x1 = toCell.cx;
  const y1 = toCell.cy;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    if ((x0 !== fromCell.cx || y0 !== fromCell.cy) && (x0 !== x1 || y0 !== y1)) {
      const cell = grid.getCell(x0, y0);
      if (cell && (cell.wall || cell.blocksLos)) return false;
    }
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
  return true;
}

export function evaluateCover(grid, fromCell, toCell) {
  if (!grid || !fromCell || !toCell) return { blocked: false, halfCover: false };
  const clearLos = hasLineOfSight(grid, fromCell, toCell);
  if (!clearLos) return { blocked: true, halfCover: true };
  const targetCell = grid.getCell(toCell.cx, toCell.cy);
  if (targetCell && (targetCell.adjacentCover || targetCell.concealment)) {
    return { blocked: false, halfCover: true };
  }
  return { blocked: false, halfCover: false };
}

function isHeroRangedFocused(hero) {
  const info = `${hero?.role || ""} ${hero?.sourceProfile?.class || ""} ${hero?.weapon || ""}`;
  return /法師|術士|邪術|死靈|時空|靈能|召喚|混沌|弓|弩|咒術|牧師|吟遊|先知/.test(info);
}

export function getClassMoveProfile(hero) {
  const clsStr = `${hero?.role || ""} ${hero?.sourceProfile?.class || ""} ${hero?.name || ""} ${(hero?.sourceFeats || []).join(" ")}`;
  if (/遊蕩|盜賊|刺客|遊俠|偵察|幸運|血獵|潛行|暗影/.test(clsStr)) {
    return {
      kind: "stealth",
      icon: "🕶️",
      shortLabel: "潛行",
      label: "潛行／躲藏",
      desc: "移往掩體或濃霧暗處躲藏，爭取攻擊優勢並降低仇恨",
    };
  }
  if (/戰士|聖武士|野蠻人|騎士|冠軍|血族|魔劍|奧法騎士|盾/.test(clsStr)) {
    return {
      kind: "guard",
      icon: "🛡️",
      shortLabel: "護衛",
      label: "前壓卡位／護衛",
      desc: "搶佔敵我之間的關鍵格擋線，掩護身後隊友（隊友 AC +1）",
    };
  }
  if (/法師|術士|邪術|死靈|時空|靈能|召喚|混沌|弓手|咒術/.test(clsStr)) {
    return {
      kind: "vantage",
      icon: "🎯",
      shortLabel: "掩體",
      label: "搶佔掩體／射角",
      desc: "移至巨石或路障等掩體旁並保持射線暢通（半掩護 AC +2）",
    };
  }
  if (/牧師|德魯伊|吟遊|主唱|薩滿|先知|鍊金|醫療/.test(clsStr)) {
    return {
      kind: "support",
      icon: "✨",
      shortLabel: "支援",
      label: "靠攏支援站位",
      desc: "繞開險地靠攏受傷隊友或隊伍核心，穩固支援與治療範圍",
    };
  }
  if (/武僧|劍客|劍刃|海盜|魔戰|調查|奇械/.test(clsStr)) {
    return {
      kind: "flank",
      icon: "💨",
      shortLabel: "繞側",
      label: "側翼繞背／切角",
      desc: "沿障礙物側面切入敵人側翼或關鍵物件，製造夾擊破綻",
    };
  }
  return isHeroRangedFocused(hero)
    ? {
        kind: "vantage",
        icon: "🎯",
        shortLabel: "掩體",
        label: "搶佔掩體／射角",
        desc: "移至掩體旁並保持對敵射線暢通（半掩護 AC +2）",
      }
    : {
        kind: "flank",
        icon: "💨",
        shortLabel: "繞側",
        label: "側翼繞背／切角",
        desc: "繞開障礙切入敵人側翼，製造夾擊破綻",
      };
}

function getLivingFoes(cast) {
  return (cast || []).filter(
    (c) => c && c.kind === "foe" && c.present && !DEAD_OR_GONE_FOE_STATUSES.has(c.status) && (c.hp === undefined || c.hp > 0),
  );
}

function getLivingHeroes(heroes) {
  return (heroes || []).filter((h) => h && !h.dead && h.hp > 0);
}

function cellChebDist(a, b) {
  return Math.max(Math.abs(a.cx - b.cx), Math.abs(a.cy - b.cy));
}

function buildOccupiedMap(grid, unitPositions, heroes, cast, excludeId) {
  const map = new Map();
  for (const h of getLivingHeroes(heroes)) {
    if (h.id === excludeId) continue;
    const pos = unitPositions?.[h.id];
    if (!Array.isArray(pos)) continue;
    const c = grid.pctToCell(pos[0], pos[1]);
    map.set(`${c.cx},${c.cy}`, { id: h.id, side: "hero" });
  }
  for (const cUnit of cast || []) {
    if (!cUnit || cUnit.id === excludeId || !cUnit.present || DEAD_OR_GONE_FOE_STATUSES.has(cUnit.status)) continue;
    if (cUnit.hp !== undefined && cUnit.hp <= 0) continue;
    const pos = unitPositions?.[cUnit.id];
    if (!Array.isArray(pos)) continue;
    const c = grid.pctToCell(pos[0], pos[1]);
    map.set(`${c.cx},${c.cy}`, {
      id: cUnit.id,
      side: cUnit.kind === "foe" ? "foe" : "hero",
    });
  }
  return map;
}

function isFlankingPosition(cell, targetCell, alliesCells) {
  if (!cell || !targetCell || cellChebDist(cell, targetCell) > 1) return false;
  const vx = cell.cx - targetCell.cx;
  const vy = cell.cy - targetCell.cy;
  const vLen = Math.hypot(vx, vy) || 1;
  for (const ally of alliesCells) {
    if (cellChebDist(ally, targetCell) > 1) continue;
    const ax = ally.cx - targetCell.cx;
    const ay = ally.cy - targetCell.cy;
    const aLen = Math.hypot(ax, ay) || 1;
    const dot = (vx * ax + vy * ay) / (vLen * aLen);
    if (dot <= -0.35) return true;
  }
  return false;
}

function detectAvoidedObstacles(grid, fromCell, toCell, pathCells) {
  if (!grid || !fromCell || !toCell || !pathCells || pathCells.length <= 2) return [];
  const avoided = [];
  const midLabels = new Set();
  const steps = Math.max(2, cellChebDist(fromCell, toCell) * 2);
  let sawStraightBlock = false;
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const cx = Math.round(fromCell.cx + (toCell.cx - fromCell.cx) * t);
    const cy = Math.round(fromCell.cy + (toCell.cy - fromCell.cy) * t);
    const c = grid.getCell(cx, cy);
    if (c && (c.impassable || c.hazard)) {
      sawStraightBlock = true;
      for (const lbl of c.propLabels) midLabels.add(lbl);
      if (c.wall && c.propLabels.length === 0) midLabels.add("牆壁障礙");
    }
  }
  if (!sawStraightBlock) {
    // Also check if path bent around an adjacent hazard/impassable tile
    const cheb = cellChebDist(fromCell, toCell);
    if (pathCells.length - 1 > cheb) {
      for (const p of pathCells) {
        for (const [dx, dy] of DIRS_8) {
          const nb = grid.getCell(p.cx + dx, p.cy + dy);
          if (nb && (nb.impassable || nb.hazard)) {
            for (const lbl of nb.propLabels) midLabels.add(lbl);
          }
        }
      }
    }
  }
  for (const lbl of midLabels) avoided.push(lbl);
  return avoided.slice(0, 2);
}

function deriveZone(actorSide, minFoeDist, stayedPut, subKind) {
  if (actorSide === "hero") {
    if (minFoeDist <= 2) return "貼身";
    if (subKind === "retreat" || subKind === "vantage" || subKind === "stealth" || stayedPut) return "隊伍";
    return "隊伍";
  }
  if (minFoeDist <= 2) return "貼身";
  if (minFoeDist <= 7) return "近處";
  return "遠處";
}

function buildPlanOutput({
  grid,
  actorId,
  actorName,
  side,
  mode,
  subKind,
  label,
  fromCell,
  chosenNode,
  maxSteps,
  targetId = null,
  targetName = "",
  targetKind = null,
  flanking = false,
  guardingAlly = null,
  foeCells = [],
  outOfMeleeRange = false,
  immobilized = false,
}) {
  const pathCells = chosenNode?.path?.length ? chosenNode.path : [{ cx: fromCell.cx, cy: fromCell.cy }];
  const toCell = pathCells[pathCells.length - 1];
  const fromPct = grid.cellToPct(fromCell.cx, fromCell.cy);
  const toPct = grid.cellToPct(toCell.cx, toCell.cy);
  const pathPcts = pathCells.map((p) => grid.cellToPct(p.cx, p.cy));
  const destCellObj = grid.getCell(toCell.cx, toCell.cy);
  const stepsUsed = chosenNode?.cost || 0;
  const stayedPut = toCell.cx === fromCell.cx && toCell.cy === fromCell.cy;

  const hasCover = !!(destCellObj?.adjacentCover || destCellObj?.cover);
  const inConcealment = !!destCellObj?.concealment;
  const minFoeDist = foeCells.length ? Math.min(...foeCells.map((f) => cellChebDist(toCell, f))) : 6;
  const stealthReady = subKind === "stealth" && (inConcealment || hasCover || minFoeDist >= 3);
  const guardingAllyId = guardingAlly?.id || null;
  const guardingAllyName = guardingAlly ? String(guardingAlly.name || "").split(/[（(]/)[0].trim() : "";

  const crossedTerrain = chosenNode?.crossedTerrain || [];
  const avoidedObstacles = detectAvoidedObstacles(grid, fromCell, toCell, pathCells);
  const newZone = deriveZone(side, minFoeDist, stayedPut, subKind);

  const stance = {
    stealth: stealthReady,
    cover: hasCover && (subKind === "vantage" || subKind === "retreat" || subKind === "stealth" || (side === "foe" && hasCover)),
    guard: !!guardingAllyId,
    guardTarget: guardingAllyId,
    flanking: !!flanking,
  };

  const modifiers = {
    attackBonus: flanking ? 2 : 0,
    advantage: stealthReady,
    acBonus: stance.cover ? 2 : stance.guard ? 1 : 0,
    guardAllyId: guardingAllyId,
    guardAcBonus: guardingAllyId ? 1 : 0,
  };

  const shortTarget = targetName ? String(targetName).split(/[（(]/)[0].trim() : "";
  const shortActor = actorName ? String(actorName).split(/[（(]/)[0].trim() : "";
  const obstacleNote = avoidedObstacles.length
    ? `繞過${avoidedObstacles.join("、")}`
    : crossedTerrain.length
      ? `穿過${crossedTerrain.join("、")}`
      : "";

  const tags = [];
  if (stepsUsed > 0) tags.push(`移動 ${stepsUsed} 格`);
  if (flanking) tags.push("形成夾擊 命中+2");
  if (stealthReady) tags.push("潛行隱蔽 攻擊優勢");
  if (stance.cover) tags.push("半掩護 AC+2");
  if (guardingAllyName) tags.push(`護衛${guardingAllyName}`);
  if (outOfMeleeRange) tags.push("距近戰目標尚差距離");
  const tagText = tags.length ? `（${tags.join("・")}）` : "";

  let actionPhrase = "";
  if (immobilized) {
    actionPhrase = `${shortActor || "角色"}受狀態限制無法移動`;
  } else if (mode === "custom") {
    actionPhrase = `${obstacleNote ? obstacleNote : ""}移往指定戰術格`;
  } else if (subKind === "approach") {
    actionPhrase = stayedPut
      ? `已在${shortTarget || "目標"}近旁穩住站位`
      : `${obstacleNote}逼近${shortTarget || "目標"}`;
  } else if (subKind === "retreat") {
    actionPhrase = stayedPut
      ? `維持與敵方距離戒備`
      : `${obstacleNote}拉開與敵人的距離`;
  } else if (subKind === "stealth") {
    actionPhrase = inConcealment
      ? `${obstacleNote}潛入濃霧暗處`
      : hasCover
        ? `${obstacleNote}潛行隱蔽至掩體後方`
        : `${obstacleNote}壓低身形潛行拉開`;
  } else if (subKind === "guard") {
    actionPhrase = guardingAllyName
      ? `${obstacleNote}前壓卡位擋在${guardingAllyName}身前`
      : `${obstacleNote}前壓搶佔前線防線`;
  } else if (subKind === "vantage") {
    actionPhrase = hasCover
      ? `${obstacleNote}搶佔掩體旁並鎖定射線`
      : `${obstacleNote}調整至理想射擊角度`;
  } else if (subKind === "support") {
    actionPhrase = shortTarget
      ? `${obstacleNote}靠攏${shortTarget}以便支援`
      : `${obstacleNote}向隊伍核心靠攏支援`;
  } else if (subKind === "flank") {
    actionPhrase = `${obstacleNote}側翼切入${shortTarget ? `${shortTarget}旁` : "戰場側角"}`;
  } else {
    actionPhrase = stayedPut ? "原地保持陣型" : `${obstacleNote}移動調整位置`;
  }

  return {
    actorId,
    side,
    mode,
    subKind,
    label,
    fromCell: { cx: fromCell.cx, cy: fromCell.cy },
    toCell: { cx: toCell.cx, cy: toCell.cy },
    fromPct,
    toPct,
    pathCells,
    pathPcts,
    stepsUsed,
    maxSteps,
    targetId,
    targetName: shortTarget,
    targetKind,
    crossedTerrain,
    avoidedObstacles,
    flanking,
    hasCover,
    inConcealment,
    stealthReady,
    guardingAllyId,
    guardingAllyName,
    outOfMeleeRange,
    immobilized,
    newZone,
    stance,
    modifiers,
    summaryText: `${actionPhrase}${tagText}`,
  };
}

function resolveHeroApproachTarget({ grid, startCell, actionChoice, unitPositions, foes, props, propSpots }) {
  if (actionChoice?.target) {
    const foe = foes.find((f) => f.id === actionChoice.target);
    if (foe && unitPositions?.[foe.id]) {
      const p = unitPositions[foe.id];
      return { id: foe.id, name: foe.name, kind: "foe", cell: grid.pctToCell(p[0], p[1]) };
    }
  }
  const actText = String(actionChoice?.text || "");
  if (actText) {
    const matchedProp = (props || []).find((pr) => pr?.name && actText.includes(pr.name));
    if (matchedProp && grid.propsIndexed?.[matchedProp.id]) {
      return {
        id: matchedProp.id,
        name: matchedProp.name,
        kind: "prop",
        cell: grid.propsIndexed[matchedProp.id].cell,
      };
    }
    const matchedFoe = foes.find((f) => {
      const short = String(f.name || "").split(/[（(·・\s]/)[0].trim();
      return short && actText.includes(short);
    });
    if (matchedFoe && unitPositions?.[matchedFoe.id]) {
      const p = unitPositions[matchedFoe.id];
      return { id: matchedFoe.id, name: matchedFoe.name, kind: "foe", cell: grid.pctToCell(p[0], p[1]) };
    }
  }
  // Nearest active foe
  let bestFoe = null;
  let bestDist = Infinity;
  for (const f of foes) {
    const p = unitPositions?.[f.id];
    if (!Array.isArray(p)) continue;
    const c = grid.pctToCell(p[0], p[1]);
    const d = cellChebDist(startCell, c);
    if (d < bestDist) {
      bestDist = d;
      bestFoe = { id: f.id, name: f.name, kind: "foe", cell: c };
    }
  }
  if (bestFoe) return bestFoe;
  // Fallback to first interactive prop
  const firstProp = (props || []).find((pr) => grid.propsIndexed?.[pr.id]);
  if (firstProp) {
    return {
      id: firstProp.id,
      name: firstProp.name,
      kind: "prop",
      cell: grid.propsIndexed[firstProp.id].cell,
    };
  }
  return null;
}

export function inferDefaultMoveIntent(hero, actionChoice, session) {
  if (!hero) return "hold";
  const text = String(actionChoice?.text || "");
  const skill = actionChoice?.skill || "";
  const useRef = String(actionChoice?.use || "");
  if (/潛行|躲藏|埋伏|偷襲|隱匿/.test(text) || skill === "stealth") return "class_move";
  if (/撤退|後退|拉開|保持距離|閃避/.test(text)) return "retreat";

  const props = session?.props || [];
  if (text && props.some((pr) => pr?.name && text.includes(pr.name))) return "approach";

  const foes = getLivingHeroes(session?.heroes || []).length ? getLivingFoes(session?.cast || []) : [];
  if (actionChoice?.target && foes.some((f) => f.id === actionChoice.target)) {
    const rangedWords = /弓|弩|射|法術|飛刀|飛鏢|投擲|火球|閃電|治療|護盾|祝福|偵測|察覺|洞察|說服|威嚇/;
    if (!rangedWords.test(text) && !/spell|wand|scroll/.test(useRef)) {
      return "approach";
    }
  }
  if (/衝上前|貼近|揮砍|劈砍|猛擊|突刺|撲向|肉搏|格鬥|近戰/.test(text)) return "approach";
  return "hold";
}

export function planHeroMove({
  grid,
  hero,
  moveIntent = "hold",
  customTargetCell = null,
  actionChoice = null,
  unitPositions = {},
  heroes = [],
  cast = [],
  props = [],
  propSpots = {},
} = {}) {
  if (!grid || !hero) return null;
  const pos = unitPositions?.[hero.id] || [40, 60];
  const startCell = grid.pctToCell(pos[0], pos[1]);
  const maxSteps = getUnitSpeedCells(hero, true);
  const occupiedByKey = buildOccupiedMap(grid, unitPositions, heroes, cast, hero.id);
  const reachable = computeReachableCells(grid, startCell, maxSteps, occupiedByKey, "hero");

  const foes = getLivingFoes(cast);
  const foeCells = foes
    .map((f) => {
      const p = unitPositions?.[f.id];
      return Array.isArray(p) ? { id: f.id, ...grid.pctToCell(p[0], p[1]) } : null;
    })
    .filter(Boolean);

  const allies = getLivingHeroes(heroes).filter((h) => h.id !== hero.id);
  const allyCells = allies
    .map((h) => {
      const p = unitPositions?.[h.id];
      return Array.isArray(p) ? { id: h.id, hero: h, ...grid.pctToCell(p[0], p[1]) } : null;
    })
    .filter(Boolean);

  const profile = getClassMoveProfile(hero);

  if (maxSteps === 0) {
    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: moveIntent,
      subKind: moveIntent === "class_move" ? profile.kind : moveIntent,
      label: "無法移動",
      fromCell: startCell,
      chosenNode: reachable.get(`${startCell.cx},${startCell.cy}`),
      maxSteps: 0,
      foeCells,
      immobilized: true,
    });
  }

  // Custom clicked cell override
  if (customTargetCell && Number.isFinite(customTargetCell.cx) && Number.isFinite(customTargetCell.cy)) {
    const cKey = `${customTargetCell.cx},${customTargetCell.cy}`;
    const node = reachable.get(cKey);
    if (node && node.canStop) {
      const adjTarget = foes.find((f) => {
        const p = unitPositions?.[f.id];
        return Array.isArray(p) && cellChebDist(node, grid.pctToCell(p[0], p[1])) <= 1;
      });
      const adjTargetCell = adjTarget ? grid.pctToCell(unitPositions[adjTarget.id][0], unitPositions[adjTarget.id][1]) : null;
      const flanking = !!(adjTargetCell && isFlankingPosition(node, adjTargetCell, allyCells));
      return buildPlanOutput({
        grid,
        actorId: hero.id,
        actorName: hero.name,
        side: "hero",
        mode: "custom",
        subKind: moveIntent === "class_move" ? profile.kind : moveIntent,
        label: "指定落點",
        fromCell: startCell,
        chosenNode: node,
        maxSteps,
        targetId: adjTarget?.id || null,
        targetName: adjTarget?.name || "",
        targetKind: adjTarget ? "foe" : null,
        flanking,
        foeCells,
      });
    }
  }

  if (moveIntent === "hold" || !moveIntent) {
    const stayNode = reachable.get(`${startCell.cx},${startCell.cy}`);
    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: "hold",
      subKind: "hold",
      label: "原地待命",
      fromCell: startCell,
      chosenNode: stayNode,
      maxSteps,
      foeCells,
    });
  }

  const stoppableNodes = [...reachable.values()].filter((n) => n.canStop);
  const subKind = moveIntent === "class_move" ? profile.kind : moveIntent;
  const moveLabel = moveIntent === "approach" ? "接近目標" : moveIntent === "retreat" ? "拉開距離" : profile.label;

  if (subKind === "approach") {
    const tgt = resolveHeroApproachTarget({ grid, startCell, actionChoice, unitPositions, foes, props, propSpots });
    if (!tgt) {
      return buildPlanOutput({
        grid,
        actorId: hero.id,
        actorName: hero.name,
        side: "hero",
        mode: "approach",
        subKind: "approach",
        label: moveLabel,
        fromCell: startCell,
        chosenNode: reachable.get(`${startCell.cx},${startCell.cy}`),
        maxSteps,
        foeCells,
      });
    }
    const distField = computeDistanceField(grid, tgt.cell, occupiedByKey, "hero");
    let bestNode = stoppableNodes[0];
    let bestScore = -Infinity;
    let bestFlank = false;

    for (const node of stoppableNodes) {
      const gCell = grid.getCell(node.cx, node.cy);
      const gridDist = distField.get(node.key);
      const cheb = cellChebDist(node, tgt.cell);
      const effectiveDist = gridDist !== undefined ? gridDist : cheb * 1.5 + 10;
      const adjacent = cheb === 1;
      const flank = tgt.kind === "foe" && isFlankingPosition(node, tgt.cell, allyCells);
      let score = -effectiveDist * 14;
      if (adjacent) score += 35;
      if (flank) score += 20;
      if (gCell?.adjacentCover) score += 5;
      if (node.crossedHazard) score -= 28;
      if (gCell?.hazard) score -= 35;
      score -= node.cost * 0.4;
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
        bestFlank = flank;
      }
    }

    const finalDist = bestNode ? cellChebDist(bestNode, tgt.cell) : 99;
    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: "approach",
      subKind: "approach",
      label: moveLabel,
      fromCell: startCell,
      chosenNode: bestNode,
      maxSteps,
      targetId: tgt.id,
      targetName: tgt.name,
      targetKind: tgt.kind,
      flanking: bestFlank,
      foeCells,
      outOfMeleeRange: tgt.kind === "foe" && finalDist > 1,
    });
  }

  if (subKind === "retreat") {
    const primaryFoe = resolveHeroApproachTarget({ grid, startCell, actionChoice, unitPositions, foes, props, propSpots });
    let bestNode = stoppableNodes[0];
    let bestScore = -Infinity;

    for (const node of stoppableNodes) {
      const gCell = grid.getCell(node.cx, node.cy);
      const minFoeDist = foeCells.length ? Math.min(...foeCells.map((f) => cellChebDist(node, f))) : 6;
      const clampedDist = Math.min(8, minFoeDist);
      const los = primaryFoe && primaryFoe.kind === "foe" ? hasLineOfSight(grid, node, primaryFoe.cell) : true;
      let score = clampedDist * 11;
      if (minFoeDist <= 1) score -= 28;
      if (gCell?.adjacentCover) score += 14;
      if (gCell?.concealment) score += 10;
      if (los) score += 9;
      if (node.crossedHazard) score -= 26;
      if (gCell?.hazard) score -= 40;
      // Prefer moderate movement over unnecessary zig-zags
      score -= node.cost * 0.3;
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }

    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: "retreat",
      subKind: "retreat",
      label: moveLabel,
      fromCell: startCell,
      chosenNode: bestNode,
      maxSteps,
      targetId: primaryFoe?.id || null,
      targetName: primaryFoe?.name || "",
      targetKind: primaryFoe?.kind || null,
      foeCells,
    });
  }

  // Class-specific moves
  const primaryFoe = resolveHeroApproachTarget({ grid, startCell, actionChoice, unitPositions, foes, props, propSpots });
  if (subKind === "stealth") {
    let bestNode = stoppableNodes[0];
    let bestScore = -Infinity;
    for (const node of stoppableNodes) {
      const gCell = grid.getCell(node.cx, node.cy);
      const minFoeDist = foeCells.length ? Math.min(...foeCells.map((f) => cellChebDist(node, f))) : 5;
      let score = 0;
      if (gCell?.concealment) score += 38;
      if (gCell?.adjacentCover) score += 24;
      if (minFoeDist >= 3) score += 15;
      else if (minFoeDist <= 1) score -= 32;
      if (node.crossedHazard) score -= 24;
      if (gCell?.hazard) score -= 40;
      score -= node.cost * 0.25;
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }
    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: "class_move",
      subKind: "stealth",
      label: moveLabel,
      fromCell: startCell,
      chosenNode: bestNode,
      maxSteps,
      targetId: primaryFoe?.id || null,
      targetName: primaryFoe?.name || "",
      targetKind: primaryFoe?.kind || null,
      foeCells,
    });
  }

  if (subKind === "guard") {
    // Guard the lowest HP or ranged ally against the nearest foe
    const guarded = [...allyCells].sort((a, b) => {
      const scoreA = (a.hero.hp / Math.max(1, a.hero.maxHp)) - (isHeroRangedFocused(a.hero) ? 0.35 : 0);
      const scoreB = (b.hero.hp / Math.max(1, b.hero.maxHp)) - (isHeroRangedFocused(b.hero) ? 0.35 : 0);
      return scoreA - scoreB;
    })[0];
    const threatFoe = foeCells.length
      ? [...foeCells].sort((a, b) => {
          const da = guarded ? cellChebDist(a, guarded) : cellChebDist(a, startCell);
          const db = guarded ? cellChebDist(b, guarded) : cellChebDist(b, startCell);
          return da - db;
        })[0]
      : null;

    let bestNode = stoppableNodes[0];
    let bestScore = -Infinity;
    for (const node of stoppableNodes) {
      const gCell = grid.getCell(node.cx, node.cy);
      let score = 0;
      if (threatFoe && guarded) {
        const midX = (threatFoe.cx + guarded.cx) / 2;
        const midY = (threatFoe.cy + guarded.cy) / 2;
        score -= Math.hypot(node.cx - midX, node.cy - midY) * 10;
        if (cellChebDist(node, threatFoe) <= 1) score += 22;
        if (cellChebDist(node, guarded) <= 2) score += 14;
      } else if (threatFoe) {
        score -= cellChebDist(node, threatFoe) * 10;
      }
      if (gCell?.adjacentCover) score += 6;
      if (node.crossedHazard) score -= 22;
      if (gCell?.hazard) score -= 35;
      score -= node.cost * 0.25;
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }
    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: "class_move",
      subKind: "guard",
      label: moveLabel,
      fromCell: startCell,
      chosenNode: bestNode,
      maxSteps,
      targetId: threatFoe?.id || null,
      guardingAlly: guarded?.hero || null,
      foeCells,
    });
  }

  if (subKind === "vantage") {
    let bestNode = stoppableNodes[0];
    let bestScore = -Infinity;
    for (const node of stoppableNodes) {
      const gCell = grid.getCell(node.cx, node.cy);
      const minFoeDist = foeCells.length ? Math.min(...foeCells.map((f) => cellChebDist(node, f))) : 5;
      const los = primaryFoe && primaryFoe.kind === "foe" ? hasLineOfSight(grid, node, primaryFoe.cell) : true;
      let score = 0;
      if (gCell?.adjacentCover) score += 28;
      if (los) score += 22;
      if (minFoeDist >= 4 && minFoeDist <= 9) score += 14;
      else if (minFoeDist <= 1) score -= 25;
      if (node.crossedHazard) score -= 24;
      if (gCell?.hazard) score -= 38;
      score -= node.cost * 0.3;
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }
    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: "class_move",
      subKind: "vantage",
      label: moveLabel,
      fromCell: startCell,
      chosenNode: bestNode,
      maxSteps,
      targetId: primaryFoe?.id || null,
      targetName: primaryFoe?.name || "",
      targetKind: primaryFoe?.kind || null,
      foeCells,
    });
  }

  if (subKind === "support") {
    const hurtAlly = [...allyCells].sort((a, b) => a.hero.hp / Math.max(1, a.hero.maxHp) - b.hero.hp / Math.max(1, b.hero.maxHp))[0];
    let bestNode = stoppableNodes[0];
    let bestScore = -Infinity;
    for (const node of stoppableNodes) {
      const gCell = grid.getCell(node.cx, node.cy);
      const minFoeDist = foeCells.length ? Math.min(...foeCells.map((f) => cellChebDist(node, f))) : 5;
      let score = 0;
      if (hurtAlly) {
        const dAlly = cellChebDist(node, hurtAlly);
        score -= dAlly * 9;
        if (dAlly <= 2) score += 22;
      }
      if (minFoeDist >= 3) score += 14;
      else if (minFoeDist <= 1) score -= 20;
      if (gCell?.adjacentCover) score += 10;
      if (node.crossedHazard) score -= 24;
      if (gCell?.hazard) score -= 38;
      score -= node.cost * 0.3;
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }
    return buildPlanOutput({
      grid,
      actorId: hero.id,
      actorName: hero.name,
      side: "hero",
      mode: "class_move",
      subKind: "support",
      label: moveLabel,
      fromCell: startCell,
      chosenNode: bestNode,
      maxSteps,
      targetId: hurtAlly?.id || null,
      targetName: hurtAlly?.hero?.name || "",
      targetKind: hurtAlly ? "hero" : null,
      foeCells,
    });
  }

  // Default: flank
  const tgt = primaryFoe;
  const distField = tgt ? computeDistanceField(grid, tgt.cell, occupiedByKey, "hero") : new Map();
  let bestNode = stoppableNodes[0];
  let bestScore = -Infinity;
  let bestFlank = false;
  for (const node of stoppableNodes) {
    const gCell = grid.getCell(node.cx, node.cy);
    const dTgt = tgt ? (distField.get(node.key) ?? cellChebDist(node, tgt.cell) * 1.5) : 0;
    const adj = tgt ? cellChebDist(node, tgt.cell) === 1 : false;
    const flank = !!(tgt && tgt.kind === "foe" && isFlankingPosition(node, tgt.cell, allyCells));
    let score = -dTgt * 12;
    if (adj) score += 26;
    if (flank) score += 36;
    if (gCell?.adjacentCover) score += 8;
    if (node.crossedHazard) score -= 24;
    if (gCell?.hazard) score -= 35;
    score -= node.cost * 0.3;
    if (score > bestScore) {
      bestScore = score;
      bestNode = node;
      bestFlank = flank;
    }
  }
  return buildPlanOutput({
    grid,
    actorId: hero.id,
    actorName: hero.name,
    side: "hero",
    mode: "class_move",
    subKind: "flank",
    label: moveLabel,
    fromCell: startCell,
    chosenNode: bestNode,
    maxSteps,
    targetId: tgt?.id || null,
    targetName: tgt?.name || "",
    targetKind: tgt?.kind || null,
    flanking: bestFlank,
    foeCells,
  });
}

export function getHeroMoveOptions(hero, session, tacCtx, currentPick = null) {
  const profile = getClassMoveProfile(hero);
  if (!tacCtx?.grid || !hero) {
    return [
      { id: "approach", icon: "⚔️", shortLabel: "接近", label: "接近目標", desc: "繞開障礙逼近目標" },
      { id: "retreat", icon: "↩️", shortLabel: "拉開", label: "遠離／保持距離", desc: "退至安全距離或掩體後方" },
      { id: "class_move", icon: profile.icon, shortLabel: profile.shortLabel, label: profile.label, desc: profile.desc },
    ];
  }

  const actionChoice = (() => {
    const opts = session?.options?.[hero.id]?.list || [];
    if (currentPick?.option) return opts.find((o) => o.id === currentPick.option) || null;
    if (currentPick?.text) return { text: currentPick.text };
    return null;
  })();

  const common = {
    grid: tacCtx.grid,
    hero,
    actionChoice,
    unitPositions: tacCtx.unitPositions,
    heroes: session?.heroes || [],
    cast: session?.cast || [],
    props: session?.props || [],
    propSpots: tacCtx.propSpots || {},
  };

  const pApproach = planHeroMove({ ...common, moveIntent: "approach" });
  const pRetreat = planHeroMove({ ...common, moveIntent: "retreat" });
  const pClass = planHeroMove({ ...common, moveIntent: "class_move" });

  return [
    {
      id: "approach",
      icon: "⚔️",
      shortLabel: "接近目標",
      label: "接近敵人／物件",
      desc: pApproach?.summaryText || "繞開地形障礙逼近目標",
      plan: pApproach,
    },
    {
      id: "retreat",
      icon: "↩️",
      shortLabel: "拉開距離",
      label: "遠離／保持距離",
      desc: pRetreat?.summaryText || "退至掩體旁並拉開距離",
      plan: pRetreat,
    },
    {
      id: "class_move",
      icon: profile.icon,
      shortLabel: profile.shortLabel,
      label: profile.label,
      desc: pClass?.summaryText || profile.desc,
      plan: pClass,
    },
  ];
}

export function planFoeMove({
  grid,
  foe,
  isRanged = false,
  preferredTargetId = null,
  unitPositions = {},
  heroes = [],
  cast = [],
  stances = {},
} = {}) {
  if (!grid || !foe) return null;
  const pos = unitPositions?.[foe.id];
  if (!Array.isArray(pos)) return null;
  const startCell = grid.pctToCell(pos[0], pos[1]);
  const maxSteps = getUnitSpeedCells(foe, false);
  const occupiedByKey = buildOccupiedMap(grid, unitPositions, heroes, cast, foe.id);
  const reachable = computeReachableCells(grid, startCell, maxSteps, occupiedByKey, "foe");

  const livingHeroes = getLivingHeroes(heroes);
  if (!livingHeroes.length) return null;

  const heroTargets = livingHeroes
    .map((h) => {
      const p = unitPositions?.[h.id];
      if (!Array.isArray(p)) return null;
      const cell = grid.pctToCell(p[0], p[1]);
      return { hero: h, cell, dist: cellChebDist(startCell, cell), stealth: !!stances?.[h.id]?.stealth };
    })
    .filter(Boolean);

  if (!heroTargets.length) return null;

  let chosenTarget =
    (preferredTargetId && heroTargets.find((t) => t.hero.id === preferredTargetId && !t.stealth)) ||
    [...heroTargets].sort((a, b) => (a.stealth ? 3 : 0) - (b.stealth ? 3 : 0) + (a.dist - b.dist))[0];

  if (maxSteps === 0) {
    return buildPlanOutput({
      grid,
      actorId: foe.id,
      actorName: foe.name,
      side: "foe",
      mode: "hold",
      subKind: "hold",
      label: "無法移動",
      fromCell: startCell,
      chosenNode: reachable.get(`${startCell.cx},${startCell.cy}`),
      maxSteps: 0,
      targetId: chosenTarget.hero.id,
      targetName: chosenTarget.hero.name,
      targetKind: "hero",
      foeCells: heroTargets.map((t) => t.cell),
      immobilized: true,
    });
  }

  const otherFoeCells = getLivingFoes(cast)
    .filter((f) => f.id !== foe.id)
    .map((f) => {
      const p = unitPositions?.[f.id];
      return Array.isArray(p) ? grid.pctToCell(p[0], p[1]) : null;
    })
    .filter(Boolean);

  const stoppableNodes = [...reachable.values()].filter((n) => n.canStop);

  if (isRanged) {
    let bestNode = stoppableNodes[0];
    let bestScore = -Infinity;
    for (const node of stoppableNodes) {
      const gCell = grid.getCell(node.cx, node.cy);
      const minHeroDist = Math.min(...heroTargets.map((t) => cellChebDist(node, t.cell)));
      const los = hasLineOfSight(grid, node, chosenTarget.cell);
      let score = 0;
      if (los) score += 26;
      if (minHeroDist <= 1) score -= 35;
      else if (minHeroDist >= 3 && minHeroDist <= 8) score += 16;
      if (gCell?.adjacentCover) score += 14;
      if (node.crossedHazard) score -= 24;
      if (gCell?.hazard) score -= 38;
      score -= node.cost * 0.35;
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }
    const stayHere = bestNode.cx === startCell.cx && bestNode.cy === startCell.cy;
    return buildPlanOutput({
      grid,
      actorId: foe.id,
      actorName: foe.name,
      side: "foe",
      mode: stayHere ? "hold" : "retreat",
      subKind: stayHere ? "hold" : "retreat",
      label: stayHere ? "維持射擊位" : "拉開射擊",
      fromCell: startCell,
      chosenNode: bestNode,
      maxSteps,
      targetId: chosenTarget.hero.id,
      targetName: chosenTarget.hero.name,
      targetKind: "hero",
      foeCells: heroTargets.map((t) => t.cell),
    });
  }

  // Melee foe: navigate around obstacles toward chosen hero, preferring flanking
  const distField = computeDistanceField(grid, chosenTarget.cell, occupiedByKey, "foe");
  let bestNode = stoppableNodes[0];
  let bestScore = -Infinity;
  let bestFlank = false;
  for (const node of stoppableNodes) {
    const gCell = grid.getCell(node.cx, node.cy);
    const gridDist = distField.get(node.key);
    const cheb = cellChebDist(node, chosenTarget.cell);
    const effectiveDist = gridDist !== undefined ? gridDist : cheb * 1.5 + 10;
    const flank = isFlankingPosition(node, chosenTarget.cell, otherFoeCells);
    let score = -effectiveDist * 14;
    if (cheb === 1) score += 35;
    if (flank) score += 18;
    if (gCell?.adjacentCover) score += 4;
    if (node.crossedHazard) score -= 24;
    if (gCell?.hazard) score -= 36;
    score -= node.cost * 0.35;
    if (score > bestScore) {
      bestScore = score;
      bestNode = node;
      bestFlank = flank;
    }
  }

  return buildPlanOutput({
    grid,
    actorId: foe.id,
    actorName: foe.name,
    side: "foe",
    mode: "approach",
    subKind: "approach",
    label: "逼近接戰",
    fromCell: startCell,
    chosenNode: bestNode,
    maxSteps,
    targetId: chosenTarget.hero.id,
    targetName: chosenTarget.hero.name,
    targetKind: "hero",
    flanking: bestFlank,
    foeCells: heroTargets.map((t) => t.cell),
  });
}
