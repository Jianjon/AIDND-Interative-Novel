import { useEffect, useRef, useState } from "react";
import { MAP_COLS, MAP_ROWS } from "./voxelMapGenerator.js";

const ELEV_H = 0.42;

const COND_SHORT = {
  Prone: "🛌倒地",
  Rage: "🔥狂暴",
  Shielded: "🛡️護盾",
  Hidden: "🥷潛行",
  Dodging: "💨閃避",
  Blessed: "✨祝福",
  Hasted: "⚡加速",
  Paralyzed: "⚡麻痺",
  Stunned: "💫震懾",
  Restrained: "🕸️束縛",
  Unconscious: "😵昏迷",
  Poisoned: "☠️中毒",
  Blinded: "🕶️失明",
  Frightened: "😱恐懼",
  FaerieFire: "🌟妖火",
  Lit: "🕯️照明",
};

const COND_EMOJI = {
  Prone: "🛌",
  Rage: "🔥",
  Shielded: "🛡️",
  Hidden: "🥷",
  Dodging: "💨",
  Blessed: "✨",
  Hasted: "⚡",
  Paralyzed: "⚡",
  Stunned: "💫",
  Restrained: "🕸️",
  Unconscious: "😵",
  Poisoned: "☠️",
  Blinded: "🕶️",
  Frightened: "😱",
  FaerieFire: "🌟",
  Lit: "🕯️",
};

const BIOME_PALETTES = {
  cavern: { floor: "#485466", wall: "#313b4b", ledge: "#5f6c80", bridge: "#7c5a3c", water: "#1d5d7a" },
  river: { floor: "#435364", wall: "#2e3947", ledge: "#5b6a7c", bridge: "#7c5a3c", water: "#1b6a8a" },
  sanctum: { floor: "#474f66", wall: "#2e3447", ledge: "#606987", bridge: "#7b5e42", water: "#22537a" },
  grotto: { floor: "#4a5159", wall: "#31373d", ledge: "#636b75", bridge: "#6e5038", water: "#1d586b" },
  forest: { floor: "#36532c", wall: "#283622", ledge: "#4d6b3c", bridge: "#6b4f35", water: "#1c5b6e" },
  tavern: { floor: "#6b472b", wall: "#473123", ledge: "#835937", bridge: "#9c6d45", water: "#254e68" },
  ice: { floor: "#7ea1bd", wall: "#476985", ledge: "#9fc1db", bridge: "#64839c", water: "#1a4d75" },
  crypt: { floor: "#3c3b4a", wall: "#262532", ledge: "#555268", bridge: "#4d3c37", water: "#293f4d" },
  ship: { floor: "#7c5534", wall: "#4a301c", ledge: "#966a44", bridge: "#b07d4f", water: "#134e6f" },
  volcanic: { floor: "#3b2826", wall: "#241615", ledge: "#573732", bridge: "#4a4340", water: "#d9480f" },
  desert: { floor: "#c29b61", wall: "#8c6536", ledge: "#d6b47c", bridge: "#855e3b", water: "#2b7a78" },
  coral: { floor: "#3c7a78", wall: "#245257", ledge: "#5ea39d", bridge: "#856a4e", water: "#0ea5e9" },
  cliff: { floor: "#5b554e", wall: "#38342f", ledge: "#78716a", bridge: "#7c5a3c", water: "#1d5d7a" },
  castle: { floor: "#646b7a", wall: "#3c4252", ledge: "#8891a3", bridge: "#8a6240", water: "#25587a" },
  urban: { floor: "#525866", wall: "#373c47", ledge: "#784f3a", bridge: "#6e553b", water: "#234e69" },
  swamp: { floor: "#394a36", wall: "#243022", ledge: "#4d6144", bridge: "#5e4a34", water: "#365314" },
};

const LIGHTING_CONFIGS = {
  daylight: { bg: 0x3b5875, fogDensity: 0.011, hemiSky: 0xdbeafe, hemiGround: 0x3b4d3b, hemiInt: 1.25, dirColor: 0xfff8e7, dirInt: 1.35 },
  dusk: { bg: 0x2c1d2e, fogDensity: 0.015, hemiSky: 0xfdba74, hemiGround: 0x271c2b, hemiInt: 1.02, dirColor: 0xfb923c, dirInt: 1.18 },
  night: { bg: 0x0f1a33, fogDensity: 0.015, hemiSky: 0x93c5fd, hemiGround: 0x1e293b, hemiInt: 0.94, dirColor: 0xbae6fd, dirInt: 1.05 },
  underground: { bg: 0x111927, fogDensity: 0.015, hemiSky: 0xaec6e8, hemiGround: 0x243044, hemiInt: 1.08, dirColor: 0xfff4e0, dirInt: 1.25 },
  horror: { bg: 0x171022, fogDensity: 0.017, hemiSky: 0xa7f3d0, hemiGround: 0x24152e, hemiInt: 0.92, dirColor: 0xc4b5fd, dirInt: 0.98 },
};

const WEATHER_PARTICLE_CONFIGS = {
  rain: { color: 0x93c5fd, size: 0.22, opacity: 0.85, vx: -1.4, vy: -12.5, vz: 0.5, count: 360 },
  lightning_storm: { color: 0xbae6fd, size: 0.26, opacity: 0.92, vx: -2.6, vy: -15.5, vz: 0.9, count: 420, flash: true },
  snow: { color: 0xf8fafc, size: 0.25, opacity: 0.92, vx: 0.5, vy: -2.0, vz: 0.3, count: 320, sway: true },
  fog: { color: 0xcbd5e1, size: 0.65, opacity: 0.34, vx: 0.7, vy: 0.1, vz: 0.22, count: 180 },
  gale: { color: 0xe2e8f0, size: 0.22, opacity: 0.78, vx: 10.0, vy: -0.8, vz: 1.9, count: 320 },
  embers: { color: 0xf97316, size: 0.24, opacity: 0.95, vx: 0.45, vy: 2.1, vz: -0.25, count: 260, sway: true },
  spores: { color: 0x4ade80, size: 0.23, opacity: 0.9, vx: 0.3, vy: 0.65, vz: 0.28, count: 240, sway: true },
};

function makeProceduralTextures(THREE) {
  const buildCanvas = (size, drawFn) => {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const g = c.getContext("2d");
    drawFn(g, size);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
  };

  const makeBiomeSet = (pal, key) => ({
    floor: buildCanvas(64, (g, s) => {
      g.fillStyle = pal.floor;
      g.fillRect(0, 0, s, s);
      if (key === "ship" || key === "tavern") {
        // Wood planks + brass rivets
        for (let y = 0; y < s; y += 16) {
          g.fillStyle = y % 32 === 0 ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.12)";
          g.fillRect(0, y, s, 14);
          g.fillStyle = "rgba(15,10,5,0.45)";
          g.fillRect(0, y + 14, s, 2);
          g.fillStyle = "rgba(251,191,36,0.42)";
          g.fillRect(6, y + 6, 3, 3);
          g.fillRect(s - 9, y + 6, 3, 3);
        }
      } else if (key === "forest" || key === "swamp") {
        // Organic grass & moss tufts
        for (let i = 0; i < 42; i++) {
          g.fillStyle = i % 2 === 0 ? "rgba(134,239,172,0.16)" : "rgba(20,83,45,0.28)";
          g.fillRect((i * 23) % (s - 4), (i * 17) % (s - 6), 3, 6);
        }
      } else if (key === "ice") {
        // Ice crystal fracture veins
        g.strokeStyle = "rgba(224,242,254,0.42)";
        g.lineWidth = 1.5;
        g.beginPath();
        g.moveTo(4, 12); g.lineTo(28, 30); g.lineTo(54, 18);
        g.moveTo(18, 56); g.lineTo(40, 34); g.lineTo(60, 52);
        g.stroke();
      } else if (key === "volcanic") {
        // Basalt with glowing magma fissures
        g.strokeStyle = "rgba(249,115,22,0.52)";
        g.lineWidth = 1.5;
        g.beginPath();
        g.moveTo(6, 10); g.lineTo(26, 28); g.lineTo(48, 22);
        g.moveTo(14, 52); g.lineTo(34, 40); g.lineTo(58, 58);
        g.stroke();
      } else if (key === "desert") {
        // Wind-swept sand ripples
        g.strokeStyle = "rgba(254,243,199,0.22)";
        g.lineWidth = 2;
        for (let y = 10; y < s; y += 16) {
          g.beginPath();
          g.moveTo(0, y);
          g.quadraticCurveTo(s / 2, y - 5, s, y);
          g.stroke();
        }
      } else if (key === "castle" || key === "urban" || key === "crypt") {
        // Staggered stone/marble flagstones
        g.strokeStyle = "rgba(226,232,240,0.14)";
        g.lineWidth = 1.5;
        g.strokeRect(2, 2, s / 2 - 4, s / 2 - 4);
        g.strokeRect(s / 2 + 2, 2, s / 2 - 4, s / 2 - 4);
        g.strokeRect(2, s / 2 + 2, s - 4, s / 2 - 4);
      } else {
        for (let i = 0; i < 180; i++) {
          g.fillStyle = i % 3 === 0 ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.16)";
          g.fillRect((i * 19) % s, (i * 31) % s, 3, 3);
        }
      }
      g.strokeStyle = "rgba(255,255,255,0.12)";
      g.lineWidth = 1.5;
      g.strokeRect(1, 1, s - 2, s - 2);
    }),
    wall: buildCanvas(64, (g, s) => {
      g.fillStyle = pal.wall;
      g.fillRect(0, 0, s, s);
      for (let y = 0; y < s; y += 8) {
        g.fillStyle = y % 16 === 0 ? "rgba(15,23,42,0.28)" : "rgba(255,255,255,0.08)";
        g.fillRect(0, y, s, 4);
      }
      g.strokeStyle = "rgba(255,255,255,0.1)";
      g.lineWidth = 2;
      g.strokeRect(1, 1, s - 2, s - 2);
    }),
    ledge: buildCanvas(64, (g, s) => {
      g.fillStyle = pal.ledge;
      g.fillRect(0, 0, s, s);
      g.strokeStyle = "rgba(255,255,255,0.26)";
      g.lineWidth = 2;
      g.strokeRect(2, 2, s - 4, s - 4);
      g.strokeStyle = "rgba(15,23,42,0.35)";
      g.beginPath();
      g.moveTo(s / 2, 0);
      g.lineTo(s / 2, s);
      g.stroke();
    }),
    bridge: buildCanvas(64, (g, s) => {
      g.fillStyle = pal.bridge;
      g.fillRect(0, 0, s, s);
      g.fillStyle = "rgba(15,23,42,0.32)";
      for (let y = 0; y < s; y += 12) g.fillRect(0, y, s, 2);
      g.fillStyle = "#cbd5e1";
      g.fillRect(4, 4, 4, 4);
      g.fillRect(s - 8, 4, 4, 4);
    }),
    water: buildCanvas(64, (g, s) => {
      g.fillStyle = pal.water;
      g.fillRect(0, 0, s, s);
      g.fillStyle = key === "volcanic" ? "rgba(254,240,138,0.45)" : "rgba(186,230,253,0.35)";
      for (let i = 0; i < 10; i++) {
        g.fillRect((i * 13) % 46, (i * 9) % 58, 18, 3);
      }
    }),
  });

  const biomeCache = new Map();
  const getBiomeTextures = (paletteKey = "cavern") => {
    const key = BIOME_PALETTES[paletteKey] ? paletteKey : "cavern";
    if (!biomeCache.has(key)) {
      biomeCache.set(key, makeBiomeSet(BIOME_PALETTES[key], key));
    }
    return biomeCache.get(key);
  };

  return {
    getBiomeTextures,
    ...getBiomeTextures("cavern"),
    oil: buildCanvas(64, (g, s) => {
      g.fillStyle = "#1d1b27";
      g.fillRect(0, 0, s, s);
      g.fillStyle = "rgba(168,85,247,0.22)";
      g.fillStyle = "rgba(168,85,247,0.28)";
      g.beginPath();
      g.arc(s * 0.4, s * 0.5, 14, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(56,189,248,0.16)";
      g.fillStyle = "rgba(56,189,248,0.2)";
      g.beginPath();
      g.arc(s * 0.65, s * 0.35, 9, 0, Math.PI * 2);
      g.fill();
    }),
    grease: buildCanvas(64, (g, s) => {
      g.fillStyle = "#3b2c14";
      g.fillRect(0, 0, s, s);
      g.fillStyle = "rgba(217,119,6,0.34)";
      g.beginPath();
      g.arc(s * 0.38, s * 0.45, 16, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(253,224,71,0.26)";
      g.beginPath();
      g.arc(s * 0.62, s * 0.34, 7, 0, Math.PI * 2);
      g.fill();
    }),
    darkness: buildCanvas(64, (g, s) => {
      g.fillStyle = "#020308";
      g.fillRect(0, 0, s, s);
      g.fillStyle = "rgba(88,28,135,0.22)";
      g.beginPath();
      g.arc(s * 0.5, s * 0.5, 22, 0, Math.PI * 2);
      g.fill();
    }),
    difficult: buildCanvas(64, (g, s) => {
      g.fillStyle = "rgba(120,53,15,0.38)";
      g.fillRect(0, 0, s, s);
      g.strokeStyle = "rgba(245,158,11,0.35)";
      g.lineWidth = 2;
      for (let i = -s; i < s * 2; i += 14) {
        g.beginPath();
        g.moveTo(i, 0);
        g.lineTo(i + s, s);
        g.stroke();
      }
    }),
    fire: buildCanvas(64, (g, s) => {
      g.fillStyle = "#7c2d12";
      g.fillRect(0, 0, s, s);
      g.fillStyle = "#f97316";
      g.beginPath();
      g.arc(s / 2, s / 2, 18, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#fde047";
      g.beginPath();
      g.arc(s / 2, s / 2, 9, 0, Math.PI * 2);
      g.fill();
    }),
    elec: buildCanvas(64, (g, s) => {
      g.fillStyle = "#0e7490";
      g.fillRect(0, 0, s, s);
      g.strokeStyle = "#bae6fd";
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(6, 12);
      g.lineTo(28, 30);
      g.lineTo(20, 42);
      g.lineTo(54, 56);
      g.stroke();
    }),
    steam: buildCanvas(64, (g, s) => {
      g.fillStyle = "rgba(226,232,240,0.48)";
      g.beginPath();
      g.arc(24, 34, 18, 0, Math.PI * 2);
      g.arc(42, 26, 15, 0, Math.PI * 2);
      g.fill();
    }),
    ice: buildCanvas(64, (g, s) => {
      g.fillStyle = "rgba(186,230,253,0.72)";
      g.fillRect(0, 0, s, s);
      g.strokeStyle = "#f0f9ff";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(8, 12); g.lineTo(32, 32); g.lineTo(54, 14);
      g.moveTo(14, 52); g.lineTo(44, 36);
      g.stroke();
    }),
    poison: buildCanvas(64, (g, s) => {
      g.fillStyle = "rgba(22,101,52,0.72)";
      g.fillRect(0, 0, s, s);
      g.fillStyle = "rgba(74,222,128,0.55)";
      g.beginPath();
      g.arc(22, 24, 11, 0, Math.PI * 2);
      g.arc(44, 42, 9, 0, Math.PI * 2);
      g.fill();
    }),
  };
}

function makeFallbackBadgeTexture(THREE, label, side) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const g = c.getContext("2d");
  g.clearRect(0, 0, 128, 128);
  g.fillStyle = side === "hero" ? "#1e3a8a" : "#7f1d1d";
  g.strokeStyle = side === "hero" ? "#60a5fa" : "#f87171";
  g.lineWidth = 6;
  g.beginPath();
  g.roundRect(14, 14, 100, 100, 18);
  g.fill();
  g.stroke();
  g.fillStyle = "#f8fafc";
  g.font = "bold 40px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText((label || "?").slice(0, 2), 64, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function ThreeBattleCanvas({
  battle,
  activeUnitId,
  reachableMap,
  targetKeys,
  hoverTile,
  hoverForecast,
  rotation = 0,
  cutaway = true,
  recenterToken = 0,
  eventsBatch = [],
  onHoverTile,
  onClickTile,
  onRightClickTile,
  onActiveScreenPos,
  storyMode = false,
}) {
  const hostRef = useRef(null);
  const latestPropsRef = useRef({});
  const unitHudRefs = useRef(new Map());
  const resetPanRef = useRef(false);
  const stateRef = useRef({
    eventsQueue: [],
    floats: [],
    animatingUnits: new Map(),
    fxList: [],
    unitAnims: new Map(),
    camShake: { born: 0, ttl: 0, mag: 0 },
    processedBatchIds: new Set(),
  });
  const floatHadItemsRef = useRef(false);
  const [floatLabels, setFloatLabels] = useState([]);
  const [threeLoadError, setThreeLoadError] = useState(null);
  const [retryNonce, setRetryNonce] = useState(0);

  latestPropsRef.current = {
    battle,
    activeUnitId,
    reachableMap,
    targetKeys,
    hoverTile,
    hoverForecast,
    rotation,
    cutaway,
    onHoverTile,
    onClickTile,
    onRightClickTile,
    onActiveScreenPos,
    storyMode,
  };

  // Auto-recenter pan smoothly on turn change or manual recenter click
  useEffect(() => {
    resetPanRef.current = true;
  }, [activeUnitId, recenterToken]);

  // Enqueue newly emitted tactical combat events
  useEffect(() => {
    if (!eventsBatch || eventsBatch.length === 0) return;
    const s = stateRef.current;
    for (const ev of eventsBatch) {
      if (ev._uid && s.processedBatchIds.has(ev._uid)) continue;
      if (ev._uid) s.processedBatchIds.add(ev._uid);

      if (ev.type === "move" && ev.path?.length > 1) {
        s.animatingUnits.set(ev.unitId, {
          path: ev.path,
          stepIdx: 0,
          t: 0,
        });
      } else if (ev.type === "float" || ev.type === "bubble") {
        const isBubble = ev.type === "bubble";
        s.floats.push({
          id: `${Date.now()}_${Math.random()}`,
          isBubble,
          variant: ev.variant || null,
          side: ev.side || "hero",
          x: ev.x,
          y: ev.y,
          z: ev.z ?? 1,
          text: ev.text,
          color: ev.color || "#fde047",
          born: performance.now(),
          ttl: isBubble ? 2600 : ev.variant ? 1550 : 1300,
        });
      } else if (["fireball", "blast", "bolt", "strike", "heal", "buff", "teleport", "cone", "line"].includes(ev.type)) {
        s.fxList.push({
          ...ev,
          born: performance.now(),
          ttl: ev.type === "cone" || ev.type === "line" ? 560 : ev.type === "fireball" ? 450 : 380,
        });
      } else if (ev.type === "hit" && ev.unitId) {
        s.unitAnims.set(ev.unitId, {
          kind: "hit",
          born: performance.now(),
          ttl: ev.crit ? 420 : 320,
          crit: Boolean(ev.crit),
        });
        s.camShake = { born: performance.now(), ttl: ev.crit ? 260 : 150, mag: ev.crit ? 0.22 : 0.1 };
      } else if (ev.type === "miss" && ev.unitId) {
        s.unitAnims.set(ev.unitId, {
          kind: "miss",
          born: performance.now(),
          ttl: 300,
        });
      } else if (ev.type === "lunge" && ev.unitId) {
        s.unitAnims.set(ev.unitId, {
          kind: "lunge",
          born: performance.now(),
          ttl: 240,
          toX: ev.toX,
          toY: ev.toY,
        });
      }
    }
  }, [eventsBatch]);

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return undefined;

    let disposed = false;
    let rafId = 0;
    let renderer = null;
    let cleanupHandlers = null;

    const loadThreeWithRetry = async (attempts = 3) => {
      let lastErr = null;
      for (let i = 0; i < attempts; i++) {
        try {
          return await import("three");
        } catch (err) {
          lastErr = err;
          if (i < attempts - 1) await new Promise((r) => setTimeout(r, 450 * (i + 1)));
        }
      }
      throw lastErr;
    };

    setThreeLoadError(null);
    loadThreeWithRetry(3)
      .then((THREE) => {
      if (disposed || !container) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0b1019);
      scene.fog = new THREE.FogExp2(0x0b1019, 0.022);

      const width = container.clientWidth || 900;
      const height = container.clientHeight || 600;
      const aspect = width / height;
      let frustumHalf = 6.2;

      const camera = new THREE.OrthographicCamera(
        -frustumHalf * aspect,
        frustumHalf * aspect,
        frustumHalf,
        -frustumHalf,
        0.1,
        120
      );

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      // Lighting: cool cavern hemisphere + directional key shadow light + point lights
      const hemi = new THREE.HemisphereLight(0x9fb8d8, 0x182030, 0.9);
      scene.add(hemi);

      const dirLight = new THREE.DirectionalLight(0xfff4e0, 1.15);
      dirLight.position.set(16, 24, 14);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.set(2048, 2048);
      dirLight.shadow.camera.near = 2;
      dirLight.shadow.camera.far = 65;
      dirLight.shadow.camera.left = -14;
      dirLight.shadow.camera.right = 14;
      dirLight.shadow.camera.top = 14;
      dirLight.shadow.camera.bottom = -14;
      scene.add(dirLight);

      const textures = makeProceduralTextures(THREE);
      const texLoader = new THREE.TextureLoader();
      const loadedImageTextures = new Map();
      const textureCallbacks = new Map();
      const applyStandeeAspect = (card, standeeW, standeeH, img) => {
        if (!card || !img?.width || !img?.height) return;
        const natAspect = Math.max(0.45, Math.min(1.45, img.width / img.height));
        const baseScale = (standeeH * natAspect) / standeeW;
        card.userData.baseScaleX = baseScale;
        const sign = card.scale.x < 0 ? -1 : 1;
        card.scale.x = sign * baseScale;
      };
      const getImgTexture = (url, fallbackLabel, side, onReady) => {
        if (!url) return makeFallbackBadgeTexture(THREE, fallbackLabel, side);
        if (loadedImageTextures.has(url)) {
          const cached = loadedImageTextures.get(url);
          if (onReady) {
            if (cached.image?.width) onReady(cached.image);
            else {
              const list = textureCallbacks.get(url) || [];
              list.push(onReady);
              textureCallbacks.set(url, list);
            }
          }
          return cached;
        }
        if (onReady) textureCallbacks.set(url, [onReady]);
        const tex = texLoader.load(
          url,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.needsUpdate = true;
            const cbs = textureCallbacks.get(url) || [];
            textureCallbacks.delete(url);
            cbs.forEach((cb) => cb(t.image));
          },
          undefined,
          () => {
            textureCallbacks.delete(url);
            const fb = makeFallbackBadgeTexture(THREE, fallbackLabel, side);
            loadedImageTextures.set(url, fb);
          }
        );
        tex.colorSpace = THREE.SRGBColorSpace;
        loadedImageTextures.set(url, tex);
        return tex;
      };

      const worldGroup = new THREE.Group();
      scene.add(worldGroup);

      const tileGroup = new THREE.Group();
      const surfaceGroup = new THREE.Group();
      const propGroup = new THREE.Group();
      const unitGroup = new THREE.Group();
      const overlayGroup = new THREE.Group();
      const fxGroup = new THREE.Group();
      const lightGroup = new THREE.Group();
      const weatherGroup = new THREE.Group();
      const dropGroup = new THREE.Group();
      worldGroup.add(tileGroup, surfaceGroup, overlayGroup, propGroup, dropGroup, unitGroup, fxGroup, lightGroup, weatherGroup);
      const dropGeo = new THREE.OctahedronGeometry(0.18, 0);

      let weatherState = null;
      let activeDirBaseInt = 1.15;
      let nextFlashAt = 0;
      const applyEnvironmentAtmosphere = (lightingId = "underground", weatherId = "clear") => {
        const lCfg = LIGHTING_CONFIGS[lightingId] || LIGHTING_CONFIGS.underground;
        const wCfg = WEATHER_PARTICLE_CONFIGS[weatherId] || null;
        const fogMult = weatherId === "fog" ? 1.72 : weatherId === "lightning_storm" || weatherId === "rain" ? 1.25 : 1.0;

        scene.background.setHex(lCfg.bg);
        scene.fog = new THREE.FogExp2(lCfg.bg, Math.min(0.045, lCfg.fogDensity * fogMult));
        hemi.color.setHex(lCfg.hemiSky);
        hemi.groundColor.setHex(lCfg.hemiGround);
        hemi.intensity = weatherId === "lightning_storm" ? lCfg.hemiInt * 0.8 : lCfg.hemiInt;
        dirLight.color.setHex(lCfg.dirColor);
        activeDirBaseInt = weatherId === "lightning_storm" ? lCfg.dirInt * 0.72 : lCfg.dirInt;
        dirLight.intensity = activeDirBaseInt;

        weatherGroup.clear();
        if (weatherState?.geo) weatherState.geo.dispose();
        if (weatherState?.mat) weatherState.mat.dispose();
        weatherState = null;

        if (!wCfg) return;
        const positions = new Float32Array(wCfg.count * 3);
        const phases = new Float32Array(wCfg.count);
        for (let i = 0; i < wCfg.count; i++) {
          positions[i * 3] = -2 + Math.random() * (MAP_COLS + 4);
          positions[i * 3 + 1] = 0.2 + Math.random() * 8.8;
          positions[i * 3 + 2] = -2 + Math.random() * (MAP_ROWS + 4);
          phases[i] = Math.random() * Math.PI * 2;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
          color: wCfg.color,
          size: wCfg.size,
          transparent: true,
          opacity: wCfg.opacity,
          depthWrite: false,
        });
        const points = new THREE.Points(geo, mat);
        weatherGroup.add(points);
        weatherState = {
          cfg: wCfg,
          geo,
          mat,
          positions,
          phases,
          flash: Boolean(wCfg.flash),
        };
        nextFlashAt = performance.now() * 0.001 + 2.5;
      };

      const cx = (MAP_COLS - 1) / 2;
      const cz = (MAP_ROWS - 1) / 2;
      const camTarget = new THREE.Vector3(cx, 0.8, cz);
      const panOffset = new THREE.Vector3(0, 0, 0);
      let currentYaw = Math.PI / 4;

      const tileMeshes = [];
      const pickableTiles = [];
      const unitPickMeshes = [];
      const overlayTiles = new Map();
      const propVisuals = new Map();
      const unitVisuals = new Map();
      const pointLights = [];
      let builtScenarioKey = "";

      const cubeGeo = new THREE.BoxGeometry(0.98, 1, 0.98);
      const flatGeo = new THREE.PlaneGeometry(0.9, 0.9);
      const spikeGeo = new THREE.ConeGeometry(0.32, 0.95, 5);
      const crystalGeo = new THREE.OctahedronGeometry(0.24, 0);
      const buildingVisuals = [];
      const scenicBillboards = [];

      function rebuildMapMeshes(map) {
        tileGroup.clear();
        surfaceGroup.clear();
        overlayGroup.clear();
        propGroup.clear();
        lightGroup.clear();
        tileMeshes.length = 0;
        pickableTiles.length = 0;
        overlayTiles.clear();
        propVisuals.clear();
        pointLights.length = 0;
        buildingVisuals.length = 0;
        scenicBillboards.length = 0;

        applyEnvironmentAtmosphere(map.lighting, map.weather);
        const biomeTex = textures.getBiomeTextures(map.palette);
        const backdropTex = map.tabletopBackdrop ? getImgTexture(map.tabletopBackdrop, "tabletop_backdrop", "hero") : null;
        if (backdropTex) {
          backdropTex.colorSpace = THREE.SRGBColorSpace;
        }

        for (let y = 0; y < MAP_ROWS; y++) {
          for (let x = 0; x < MAP_COLS; x++) {
            const t = map.grid[y][x];
            if (t.type === "chasm") {
              const abyssMat = new THREE.MeshBasicMaterial({ color: 0x05070d });
              const abyss = new THREE.Mesh(cubeGeo, abyssMat);
              abyss.scale.set(1, 0.25, 1);
              abyss.position.set(x, -0.3, y);
              tileGroup.add(abyss);
              continue;
            }

            const tex =
              t.type === "wall"
                ? biomeTex.wall
                : t.type === "ledge"
                  ? biomeTex.ledge
                  : t.type === "bridge"
                    ? biomeTex.bridge
                    : t.type === "water"
                      ? biomeTex.water
                      : biomeTex.floor;

            const isWater = t.type === "water";
            const isIceBlock = map.palette === "ice" && (t.type === "wall" || t.type === "ledge");
            const isMagma = map.palette === "volcanic" && isWater;
            const isSwampWater = map.palette === "swamp" && isWater;

            const mat = new THREE.MeshStandardMaterial({
              map: tex,
              roughness: isWater ? 0.16 : isIceBlock ? 0.28 : 0.84,
              metalness: isWater ? 0.25 : 0.06,
              transparent: t.type === "wall" || isWater || isIceBlock,
              opacity: isWater ? 0.8 : isIceBlock ? 0.88 : 1,
              emissive: isMagma ? 0xea580c : isSwampWater ? 0x166534 : 0x000000,
              emissiveIntensity: isMagma ? 0.72 : isSwampWater ? 0.24 : 0,
            });
            const mesh = new THREE.Mesh(cubeGeo, mat);
            const hUnits = Math.max(0.4, t.type === "water" ? 0.45 : t.h * ELEV_H + 0.5);
            mesh.scale.set(1, hUnits, 1);
            mesh.position.set(x, hUnits / 2 - 0.5, y);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { x, y, fullScaleY: hUnits, tile: t };
            tileGroup.add(mesh);
            tileMeshes.push(mesh);
            if (t.type !== "wall") pickableTiles.push(mesh);

            // Surface + highlight quad hovering cleanly above tile top face
            const topY = t.type === "water" ? -0.04 : t.h * ELEV_H;

            // 2D Tabletop Backdrop UV Projection on each extruded 3D tile top
            if (backdropTex) {
              const uvGeo = new THREE.PlaneGeometry(0.98, 0.98);
              const u0 = x / MAP_COLS;
              const u1 = (x + 1) / MAP_COLS;
              const vTop = 1 - y / MAP_ROWS;
              const vBot = 1 - (y + 1) / MAP_ROWS;
              const uvAttr = uvGeo.attributes.uv;
              uvAttr.setXY(0, u0, vTop);
              uvAttr.setXY(1, u1, vTop);
              uvAttr.setXY(2, u0, vBot);
              uvAttr.setXY(3, u1, vBot);
              uvAttr.needsUpdate = true;
              const capMat = new THREE.MeshStandardMaterial({
                map: backdropTex,
                roughness: isWater ? 0.22 : 0.85,
                metalness: isWater ? 0.18 : 0.04,
                transparent: isWater,
                opacity: isWater ? 0.72 : 1,
              });
              const capMesh = new THREE.Mesh(uvGeo, capMat);
              capMesh.rotation.x = -Math.PI / 2;
              capMesh.position.set(x, topY + 0.003, y);
              capMesh.receiveShadow = true;
              tileGroup.add(capMesh);
            }

            // Dedicated persistent elemental surface quad (oil/fire/elec/steam)
            const surfMat = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0,
              depthWrite: false,
            });
            const surfMesh = new THREE.Mesh(flatGeo, surfMat);
            surfMesh.rotation.x = -Math.PI / 2;
            surfMesh.position.set(x, topY + 0.008, y);
            surfaceGroup.add(surfMesh);

            // Dedicated tactical highlight quad rendered above elemental surfaces
            const hiMat = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0,
              depthWrite: false,
            });
            const hiMesh = new THREE.Mesh(flatGeo, hiMat);
            hiMesh.rotation.x = -Math.PI / 2;
            hiMesh.position.set(x, topY + 0.025, y);
            overlayGroup.add(hiMesh);

            overlayTiles.set(`${x},${y}`, { surfMat, hiMat });

            if (t.type === "stalagmite") {
              const baseY = t.h * ELEV_H;
              if (map.palette === "forest") {
                // Stylized 3D tree
                const trunk = new THREE.Mesh(
                  new THREE.CylinderGeometry(0.14, 0.2, 0.7, 7),
                  new THREE.MeshStandardMaterial({ color: 0x5c3d24, roughness: 0.9 })
                );
                trunk.position.set(x, baseY + 0.35, y);
                trunk.castShadow = true;
                const crown = new THREE.Mesh(
                  new THREE.ConeGeometry(0.48, 1.05, 7),
                  new THREE.MeshStandardMaterial({ color: 0x2f6b32, roughness: 0.85 })
                );
                crown.position.set(x, baseY + 1.0, y);
                crown.castShadow = true;
                tileGroup.add(trunk, crown);
              } else if (map.palette === "swamp") {
                // Glowing fungal mushroom
                const stem = new THREE.Mesh(
                  new THREE.CylinderGeometry(0.12, 0.16, 0.55, 7),
                  new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.8 })
                );
                stem.position.set(x, baseY + 0.28, y);
                const cap = new THREE.Mesh(
                  new THREE.ConeGeometry(0.45, 0.36, 8),
                  new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.55, roughness: 0.4 })
                );
                cap.position.set(x, baseY + 0.68, y);
                tileGroup.add(stem, cap);
              } else if (map.palette === "castle" || map.palette === "crypt" || map.palette === "tavern" || map.palette === "urban") {
                // Carved stone/marble pillar
                const col = new THREE.Mesh(
                  new THREE.BoxGeometry(0.54, 1.25, 0.54),
                  new THREE.MeshStandardMaterial({ color: map.palette === "castle" ? 0x94a3b8 : 0x57534e, roughness: 0.72 })
                );
                col.position.set(x, baseY + 0.62, y);
                col.castShadow = true;
                tileGroup.add(col);
              } else if (map.palette === "ice") {
                // Translucent ice spire
                const spire = new THREE.Mesh(
                  crystalGeo,
                  new THREE.MeshStandardMaterial({ color: 0xbae6fd, emissive: 0x0284c7, emissiveIntensity: 0.35, transparent: true, opacity: 0.85, roughness: 0.2 })
                );
                spire.scale.set(1.4, 2.2, 1.4);
                spire.position.set(x, baseY + 0.55, y);
                tileGroup.add(spire);
              } else {
                const sm = new THREE.Mesh(
                  spikeGeo,
                  new THREE.MeshStandardMaterial({
                    color: map.palette === "volcanic" ? 0x292524 : 0x64748b,
                    emissive: map.palette === "volcanic" ? 0x9a3412 : 0x000000,
                    emissiveIntensity: map.palette === "volcanic" ? 0.3 : 0,
                    roughness: 0.9,
                  })
                );
                sm.position.set(x, baseY + 0.42, y);
                sm.castShadow = true;
                tileGroup.add(sm);
              }
            } else if (t.type === "brazier") {
              const fl = new THREE.Mesh(
                new THREE.DodecahedronGeometry(0.22, 0),
                new THREE.MeshBasicMaterial({ color: 0xfb923c })
              );
              fl.position.set(x, t.h * ELEV_H + 0.24, y);
              tileGroup.add(fl);
              const pl = new THREE.PointLight(0xff8c38, 2.8, 7.0);
              pl.position.set(x, t.h * ELEV_H + 0.85, y);
              lightGroup.add(pl);
              pointLights.push({ light: pl, base: 2.8, flicker: true, phase: x + y });
            } else if (t.type === "crystal") {
              const cr = new THREE.Mesh(
                crystalGeo,
                new THREE.MeshStandardMaterial({
                  color: 0x38bdf8,
                  emissive: 0x0ea5e9,
                  emissiveIntensity: 0.95,
                  roughness: 0.2,
                })
              );
              cr.position.set(x, t.h * ELEV_H + 0.3, y);
              tileGroup.add(cr);
              const pl = new THREE.PointLight(0x38bdf8, 2.2, 6.0);
              pl.position.set(x, t.h * ELEV_H + 0.7, y);
              lightGroup.add(pl);
              pointLights.push({ light: pl, base: 2.2, flicker: false, phase: x });
            } else if (t.type === "glow_mushroom") {
              const stem = new THREE.Mesh(
                new THREE.CylinderGeometry(0.06, 0.08, 0.22, 6),
                new THREE.MeshStandardMaterial({ color: 0xd1fae5, emissive: 0x10b981, emissiveIntensity: 0.4 })
              );
              stem.position.set(x, t.h * ELEV_H + 0.12, y);
              tileGroup.add(stem);
              const cap = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55),
                new THREE.MeshStandardMaterial({
                  color: 0x4ade80,
                  emissive: 0x22c55e,
                  emissiveIntensity: 1.0,
                  roughness: 0.3,
                })
              );
              cap.position.set(x, t.h * ELEV_H + 0.22, y);
              tileGroup.add(cap);
              const pl = new THREE.PointLight(0x4ade80, 2.1, 5.8);
              pl.position.set(x, t.h * ELEV_H + 0.65, y);
              lightGroup.add(pl);
              pointLights.push({ light: pl, base: 2.1, flicker: true, phase: x * 2 + y });
            }
          }
        }

        // Dual-State 2D Cutout Props (s0 -> s1 on destruction, auto-scaled by size/gridSize/aspect)
        for (const p of map.props || []) {
          const baseW = p.scaleW || 0.95;
          const baseH = p.scaleH || 0.95;
          const mat = new THREE.MeshStandardMaterial({
            map: null,
            transparent: true,
            alphaTest: 0.15,
            side: THREE.DoubleSide,
            roughness: 0.85,
          });
          const plane = new THREE.Mesh(new THREE.PlaneGeometry(baseW, baseH), mat);
          const applyPropAspect = (img, heightMult = 1) => {
            if (!img?.width || !img?.height) return;
            const natAspect = Math.max(0.45, Math.min(2.1, img.width / img.height));
            const sx = ((baseH * heightMult) * natAspect) / baseW;
            plane.scale.set(p.mirror ? -sx : sx, heightMult, 1);
            plane.userData.basePropScaleX = sx;
          };
          mat.map = getImgTexture(p.imgIntact, p.name, "foe", (img) => applyPropAspect(img, 1));
          const th = map.grid[p.y]?.[p.x]?.h ?? 1;
          plane.position.set(p.x, th * ELEV_H + baseH * 0.48, p.y);
          plane.castShadow = true;
          propGroup.add(plane);
          propVisuals.set(p.id, {
            mesh: plane,
            mat,
            prop: p,
            baseW,
            baseH,
            th,
            applyPropAspect,
            isBrokenRendered: false,
          });
          if (["altar", "arcane_well", "obelisk"].includes(p.kind) || /torch|brazier|fire|candle|crystal|mushroom/i.test(p.key || "")) {
            const pColor = /torch|brazier|fire|candle/i.test(p.key || "") ? 0xff8c38 : 0x38bdf8;
            const ppl = new THREE.PointLight(pColor, 1.8, 5.2);
            ppl.position.set(p.x, th * ELEV_H + 0.75, p.y);
            lightGroup.add(ppl);
            pointLights.push({ light: ppl, base: 1.8, flicker: true, phase: p.x + p.y });
          }
        }

        // Dense 2D HD-2D Decorative Scenery Props (non-blocking visual environment richness)
        for (const sp of map.scenicProps || []) {
          const sw = sp.scaleW || 0.75;
          const sh = sp.scaleH || 0.75;
          const smat = new THREE.MeshStandardMaterial({
            map: null,
            transparent: true,
            alphaTest: 0.15,
            side: THREE.DoubleSide,
            roughness: 0.85,
          });
          const sPlane = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), smat);
          smat.map = getImgTexture(sp.img, sp.name, "foe", (img) => {
            if (!img?.width || !img?.height) return;
            const natAspect = Math.max(0.45, Math.min(2.1, img.width / img.height));
            sPlane.scale.set((sh * natAspect) / sw, 1, 1);
          });
          const baseH = Number.isFinite(sp.h) ? sp.h : map.grid[Math.round(sp.y)]?.[Math.round(sp.x)]?.h ?? 1;
          sPlane.position.set(sp.x, baseH * ELEV_H + sh * 0.46, sp.y);
          sPlane.castShadow = true;
          propGroup.add(sPlane);
          scenicBillboards.push(sPlane);
        }

        // 3D Architectural Buildings (with auto-fading pitched roofs) & Harbor Cranes
        for (const b of map.buildings || []) {
          if (b.kind === "crane") {
            const baseY = (b.baseH || 2) * ELEV_H;
            const mastMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.86 });
            const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.19, 2.4, 8), mastMat);
            mast.position.set(b.x, baseY + 1.2, b.y);
            mast.castShadow = true;
            tileGroup.add(mast);

            const dx = (b.targetX ?? b.x - 3) - b.x;
            const dz = (b.targetY ?? b.y - 1) - b.y;
            const len = Math.hypot(dx, dz) || 3.5;
            const jib = new THREE.Mesh(new THREE.BoxGeometry(len, 0.14, 0.16), mastMat);
            jib.position.set(b.x + dx * 0.48, baseY + 2.25, b.y + dz * 0.48);
            jib.rotation.y = -Math.atan2(dz, dx);
            jib.rotation.z = 0.14;
            jib.castShadow = true;
            tileGroup.add(jib);

            const rope = new THREE.Mesh(
              new THREE.CylinderGeometry(0.025, 0.025, 1.85, 6),
              new THREE.MeshStandardMaterial({ color: 0xd6c7a9, roughness: 0.9 })
            );
            rope.position.set(b.x + dx * 0.88, baseY + 1.45, b.y + dz * 0.88);
            tileGroup.add(rope);
          } else if (b.kind === "house") {
            const w = b.x2 - b.x1 + 1;
            const d = b.y2 - b.y1 + 1;
            const cx = (b.x1 + b.x2) / 2;
            const cz = (b.y1 + b.y2) / 2;
            const wh = b.wallHeight || 1.65;
            if (b.solid) {
              const wallMat = new THREE.MeshStandardMaterial({
                color: b.wallColor || 0x7c583c,
                roughness: 0.88,
                metalness: 0.05,
              });
              const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(w - 0.08, wh, d - 0.08), wallMat);
              bodyMesh.position.set(cx, 1 * ELEV_H + wh / 2, cz);
              bodyMesh.castShadow = true;
              bodyMesh.receiveShadow = true;
              tileGroup.add(bodyMesh);
            }
            const roofGroup = new THREE.Group();
            const roofMat = new THREE.MeshStandardMaterial({
              color: b.roofColor || 0x3b4d63,
              transparent: !b.solid,
              opacity: b.solid ? 1.0 : 0.9,
              roughness: 0.78,
              side: THREE.DoubleSide,
            });
            const slopeGeo = new THREE.PlaneGeometry(w * 0.56 + 0.35, d + 0.35);
            const leftSlope = new THREE.Mesh(slopeGeo, roofMat);
            leftSlope.rotation.x = -Math.PI / 2;
            leftSlope.rotation.y = 0.38;
            leftSlope.position.set(cx - w * 0.25, 1 * ELEV_H + wh + 0.35, cz);
            leftSlope.castShadow = true;
            const rightSlope = new THREE.Mesh(slopeGeo, roofMat);
            rightSlope.rotation.x = -Math.PI / 2;
            rightSlope.rotation.y = -0.38;
            rightSlope.position.set(cx + w * 0.25, 1 * ELEV_H + wh + 0.35, cz);
            rightSlope.castShadow = true;
            roofGroup.add(leftSlope, rightSlope);
            tileGroup.add(roofGroup);
            if (!b.solid) {
              buildingVisuals.push({ b, roofMat, roofGroup });
            }
          }
        }

        // 1/2-width thin walls, parapets & half-blocks
        for (const hb of map.halfBlocks || []) {
          const baseH = (hb.h ?? map.grid[hb.y]?.[hb.x]?.h ?? 1) * ELEV_H;
          const bh = hb.height || 0.45;
          const hbMesh = new THREE.Mesh(
            new THREE.BoxGeometry(hb.w || 0.48, bh, hb.d || 0.48),
            new THREE.MeshStandardMaterial({
              color: hb.color || 0x94a3b8,
              roughness: 0.85,
              metalness: 0.06,
            })
          );
          hbMesh.position.set(hb.x + (hb.dx || 0), baseH + bh / 2, hb.y + (hb.dz || 0));
          hbMesh.castShadow = true;
          hbMesh.receiveShadow = true;
          tileGroup.add(hbMesh);
        }

        // Map Point Lights (torches, lanterns, harbor beacons)
        for (const ml of map.lights || []) {
          const pl = new THREE.PointLight(ml.color || 0xff9d47, ml.intensity || 2.0, ml.distance || 6.0);
          pl.position.set(ml.x, (ml.h || 1) * ELEV_H + 0.6, ml.y);
          lightGroup.add(pl);
          pointLights.push({ light: pl, base: ml.intensity || 2.0, flicker: true, phase: ml.x * 1.7 + ml.y });
        }
      }

      function rebuildUnitPickArray() {
        unitPickMeshes.length = 0;
        for (const vis of unitVisuals.values()) {
          unitPickMeshes.push(vis.card);
        }
      }

      function syncUnits(currentBattle) {
        const aliveIds = new Set();
        let pickDirty = false;
        for (const u of currentBattle.units) {
          if (u.dead || (u.side === "foe" && u.hp <= 0)) continue;
          aliveIds.add(u.id);
          if (!unitVisuals.has(u.id)) {
            const grp = new THREE.Group();
            const isLarge = u.footprint === 2;
            const ringRadius = isLarge ? 0.82 : u.sizeCategory === "small" || u.sizeCategory === "tiny" ? 0.33 : 0.4;
            const ring = new THREE.Mesh(
              new THREE.RingGeometry(ringRadius * 0.72, ringRadius, 32),
              new THREE.MeshBasicMaterial({
                color: u.isNpcAlly ? (u.allyRole === "vip" ? 0xf59e0b : 0x10b981) : u.side === "hero" ? 0x3b82f6 : 0xef4444,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.9,
              })
            );
            ring.rotation.x = -Math.PI / 2;
            ring.position.y = 0.03;
            grp.add(ring);

            const hScale = u.heightScale || (isLarge ? 1.62 : 1.0);
            const standeeH = 1.08 * hScale;
            const standeeW = 0.96 * hScale;
            const spMat = new THREE.MeshStandardMaterial({
              map: null,
              transparent: true,
              alphaTest: 0.12,
              side: THREE.DoubleSide,
              roughness: 0.75,
            });
            const card = new THREE.Mesh(new THREE.PlaneGeometry(standeeW, standeeH), spMat);
            card.position.y = standeeH * 0.48;
            card.castShadow = true;
            card.userData = { unitId: u.id };
            spMat.map = getImgTexture(u.avatar, u.name, u.side, (img) => {
              applyStandeeAspect(card, standeeW, standeeH, img);
            });
            grp.add(card);

            // Ground shadow disc for flying units
            let flyShadow = null;
            if (u.flies) {
              flyShadow = new THREE.Mesh(
                new THREE.CircleGeometry(ringRadius * 0.72, 20),
                new THREE.MeshBasicMaterial({ color: 0x020617, transparent: true, opacity: 0.5 })
              );
              flyShadow.rotation.x = -Math.PI / 2;
              flyShadow.position.y = 0.04;
              grp.add(flyShadow);
            }

            // Perched/Floating Familiar at the top-right corner of the owner's Token (occupies 0 grid cells)
            let familiarCard = null;
            let famMat = null;
            if (u.familiar) {
              const famSize = 0.46;
              famMat = new THREE.MeshStandardMaterial({
                map: null,
                transparent: true,
                alphaTest: 0.12,
                side: THREE.DoubleSide,
                roughness: 0.65,
                emissive: new THREE.Color(0x1e293b),
                emissiveIntensity: 0.35,
              });
              familiarCard = new THREE.Mesh(new THREE.PlaneGeometry(famSize, famSize), famMat);
              familiarCard.position.set(0.36, standeeH * 0.88, 0.08);
              famMat.map = getImgTexture(u.familiar.avatar, u.familiar.name, "hero", (img) => {
                applyStandeeAspect(familiarCard, famSize, famSize, img);
              });
              grp.add(familiarCard);
            }

            const offset = isLarge ? 0.5 : 0;
            const th = currentBattle.map.grid[u.y]?.[u.x]?.h ?? 1;
            grp.position.set(u.x + offset, th * ELEV_H, u.y + offset);
            unitGroup.add(grp);
            unitVisuals.set(u.id, { grp, card, ring, spMat, standeeH, flyShadow, familiarCard, famMat, unit: u });
            pickDirty = true;
          }
          unitVisuals.get(u.id).unit = u;
        }

        for (const [uid, vis] of unitVisuals.entries()) {
          if (!aliveIds.has(uid)) {
            unitGroup.remove(vis.grp);
            vis.spMat.dispose();
            vis.ring.geometry.dispose();
            vis.card.geometry.dispose();
            if (vis.famMat) vis.famMat.dispose();
            if (vis.familiarCard) vis.familiarCard.geometry.dispose();
            if (vis.flyShadow) vis.flyShadow.geometry.dispose();
            unitVisuals.delete(uid);
            pickDirty = true;
          }
        }
        if (pickDirty) rebuildUnitPickArray();
      }

      // Pointer Picking (Unit Standees first, then Tile Top-Face) & Rotation-Correct Pan
      const raycaster = new THREE.Raycaster();
      const pointerNdc = new THREE.Vector2();
      let pointerDownPos = null;
      let isPanning = false;
      let lastPanPos = null;

      const updatePointerNdc = (ev) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointerNdc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const pickGridUnderPointer = () => {
        raycaster.setFromCamera(pointerNdc, camera);
        const unitHits = raycaster.intersectObjects(unitPickMeshes, false);
        if (unitHits.length > 0) {
          const uid = unitHits[0].object.userData?.unitId;
          const curBattle = latestPropsRef.current.battle;
          const liveUnit = curBattle?.units?.find(
            (u) => u.id === uid && !u.dead && (u.side === "hero" || u.hp > 0)
          );
          if (liveUnit) {
            return { x: liveUnit.x, y: liveUnit.y, unitId: liveUnit.id };
          }
        }
        const hits = raycaster.intersectObjects(pickableTiles, false);
        if (hits.length === 0) return null;
        const ud = hits[0].object.userData;
        return { x: ud.x, y: ud.y };
      };

      let longPressTimer = null;
      let longPressFired = false;

      const clearLongPress = () => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      };

      const onPointerDown = (ev) => {
        longPressFired = false;
        clearLongPress();
        pointerDownPos = { x: ev.clientX, y: ev.clientY, button: ev.button, pointerType: ev.pointerType };
        if (ev.button === 2 || ev.button === 1 || (ev.pointerType === "touch" && ev.isPrimary)) {
          lastPanPos = { x: ev.clientX, y: ev.clientY };
          if (ev.button === 2 || ev.button === 1) isPanning = true;
        }
        if (ev.pointerType === "touch" && ev.isPrimary) {
          const sx = ev.clientX;
          const sy = ev.clientY;
          longPressTimer = setTimeout(() => {
            longPressTimer = null;
            if (!isPanning && pointerDownPos) {
              longPressFired = true;
              updatePointerNdc({ clientX: sx, clientY: sy });
              const hit = pickGridUnderPointer();
              if (hit) latestPropsRef.current.onRightClickTile?.(hit);
            }
          }, 440);
        }
      };

      const onPointerMove = (ev) => {
        if (pointerDownPos && Math.hypot(ev.clientX - pointerDownPos.x, ev.clientY - pointerDownPos.y) > 8) {
          clearLongPress();
        }
        if (
          !isPanning &&
          pointerDownPos?.pointerType === "touch" &&
          lastPanPos &&
          Math.hypot(ev.clientX - pointerDownPos.x, ev.clientY - pointerDownPos.y) > 10
        ) {
          isPanning = true;
        }
        if (isPanning && lastPanPos) {
          const dx = (ev.clientX - lastPanPos.x) * 0.016;
          const dy = (ev.clientY - lastPanPos.y) * 0.016;
          const rightX = Math.sin(currentYaw);
          const rightZ = -Math.cos(currentYaw);
          const fwdX = -Math.cos(currentYaw);
          const fwdZ = -Math.sin(currentYaw);
          panOffset.x -= dx * rightX - dy * fwdX;
          panOffset.z -= dx * rightZ - dy * fwdZ;
          panOffset.x = Math.max(-5.5, Math.min(5.5, panOffset.x));
          panOffset.z = Math.max(-5.5, Math.min(5.5, panOffset.z));
          lastPanPos = { x: ev.clientX, y: ev.clientY };
          return;
        }
        updatePointerNdc(ev);
        const hit = pickGridUnderPointer();
        latestPropsRef.current.onHoverTile?.(hit);
      };

      const onPointerUp = (ev) => {
        clearLongPress();
        if (isPanning) {
          isPanning = false;
          lastPanPos = null;
          if (ev.button === 2 && pointerDownPos && Math.hypot(ev.clientX - pointerDownPos.x, ev.clientY - pointerDownPos.y) < 6) {
            updatePointerNdc(ev);
            const hit = pickGridUnderPointer();
            if (hit) latestPropsRef.current.onRightClickTile?.(hit);
          }
          pointerDownPos = null;
          return;
        }
        if (longPressFired) {
          longPressFired = false;
          pointerDownPos = null;
          return;
        }
        if (ev.button === 0 && pointerDownPos) {
          const moveDist = Math.hypot(ev.clientX - pointerDownPos.x, ev.clientY - pointerDownPos.y);
          if (moveDist < 8) {
            updatePointerNdc(ev);
            const hit = pickGridUnderPointer();
            if (hit) latestPropsRef.current.onClickTile?.(hit);
          }
        }
        pointerDownPos = null;
      };

      const onWheel = (ev) => {
        ev.preventDefault();
        frustumHalf = Math.max(3.6, Math.min(10.5, frustumHalf + ev.deltaY * 0.004));
        const a = (container.clientWidth || 900) / (container.clientHeight || 600);
        camera.left = -frustumHalf * a;
        camera.right = frustumHalf * a;
        camera.top = frustumHalf;
        camera.bottom = -frustumHalf;
        camera.updateProjectionMatrix();
      };

      const onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 900;
        const h = container.clientHeight || 600;
        const a = w / h;
        camera.left = -frustumHalf * a;
        camera.right = frustumHalf * a;
        camera.top = frustumHalf;
        camera.bottom = -frustumHalf;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const preventCtx = (e) => e.preventDefault();
      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.addEventListener("pointermove", onPointerMove);
      renderer.domElement.addEventListener("pointerup", onPointerUp);
      renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
      renderer.domElement.addEventListener("contextmenu", preventCtx);
      window.addEventListener("resize", onResize);

      cleanupHandlers = () => {
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerup", onPointerUp);
        renderer.domElement.removeEventListener("wheel", onWheel);
        renderer.domElement.removeEventListener("contextmenu", preventCtx);
        window.removeEventListener("resize", onResize);
      };

      let lastTs = performance.now();

      function animate(now) {
        if (disposed) return;
        const dt = Math.min(0.05, (now - lastTs) / 1000);
        lastTs = now;
        const nowSec = now * 0.001;

        const {
          battle: curBattle,
          activeUnitId: actId,
          reachableMap: reachMap,
          targetKeys: tgtKeys,
          hoverTile: hovTile,
          hoverForecast: hovFc,
          rotation: rot,
          cutaway: cutOn,
        } = latestPropsRef.current;

        if (curBattle?.map) {
          const mapKey = `${curBattle.scenarioId}_${curBattle.seed}_${curBattle.map.lighting || ""}_${curBattle.map.weather || ""}`;
          if (builtScenarioKey !== mapKey) {
            builtScenarioKey = mapKey;
            rebuildMapMeshes(curBattle.map);
            unitVisuals.forEach((v) => unitGroup.remove(v.grp));
            unitVisuals.clear();
            unitPickMeshes.length = 0;
          }

          if (weatherState) {
            const { cfg, geo, positions, phases, flash } = weatherState;
            const count = cfg.count;
            for (let i = 0; i < count; i++) {
              const idx = i * 3;
              const swayX = cfg.sway ? Math.sin(nowSec * 1.8 + phases[i]) * 0.55 : 0;
              positions[idx] += (cfg.vx + swayX) * dt;
              positions[idx + 1] += cfg.vy * dt;
              positions[idx + 2] += cfg.vz * dt;
              if (positions[idx + 1] < 0.1) positions[idx + 1] = 8.8;
              else if (positions[idx + 1] > 9.0) positions[idx + 1] = 0.2;
              if (positions[idx] > MAP_COLS + 2) positions[idx] -= MAP_COLS + 4;
              else if (positions[idx] < -2) positions[idx] += MAP_COLS + 4;
              if (positions[idx + 2] > MAP_ROWS + 2) positions[idx + 2] -= MAP_ROWS + 4;
              else if (positions[idx + 2] < -2) positions[idx + 2] += MAP_ROWS + 4;
            }
            geo.attributes.position.needsUpdate = true;
            if (flash) {
              if (nowSec >= nextFlashAt) {
                dirLight.intensity = activeDirBaseInt * 2.8;
                nextFlashAt = nowSec + 3.5 + Math.random() * 4.5;
              } else {
                dirLight.intensity += (activeDirBaseInt - dirLight.intensity) * Math.min(1, dt * 8);
              }
            }
          }

          syncUnits(curBattle);

          // Camera smooth 4-way 90deg orbit + focus near center/active
          if (resetPanRef.current) {
            panOffset.set(0, 0, 0);
            resetPanRef.current = false;
          }

          // Smooth 4-way 90deg orbit + active focus
          const targetYaw = rot * (Math.PI / 2) + Math.PI / 4;
          let diffYaw = targetYaw - currentYaw;
          while (diffYaw > Math.PI) diffYaw -= Math.PI * 2;
          while (diffYaw < -Math.PI) diffYaw += Math.PI * 2;
          currentYaw += diffYaw * Math.min(1, dt * 8);

          const activeU = curBattle.units.find((u) => u.id === actId);
          const focusX = activeU ? cx * 0.65 + activeU.x * 0.35 : cx;
          const focusZ = activeU ? cz * 0.65 + activeU.y * 0.35 : cz;
          camTarget.lerp(
            new THREE.Vector3(focusX + panOffset.x, 0.7, focusZ + panOffset.z),
            Math.min(1, dt * 4.5)
          );

          const camDist = 22;
          camera.position.set(
            camTarget.x + Math.cos(currentYaw) * camDist,
            camTarget.y + camDist * 0.85,
            camTarget.z + Math.sin(currentYaw) * camDist
          );
          camera.lookAt(camTarget);

          // Flicker brazier lights
          for (const pl of pointLights) {
            if (pl.flicker) {
              pl.light.intensity = pl.base + Math.sin(nowSec * 9.5 + pl.phase) * 0.45;
            }
          }

          // Smart Front-Wall Cutaway along current camera yaw
          const camFwdX = Math.cos(currentYaw);
          const camFwdZ = Math.sin(currentYaw);
          const camRightX = -camFwdZ;
          const camRightZ = camFwdX;

          for (const mesh of tileMeshes) {
            const { x, y, fullScaleY, tile } = mesh.userData;
            if (tile.type !== "wall") continue;
            let shouldCut = false;
            if (cutOn) {
              const myDepth = x * camFwdX + y * camFwdZ;
              const myLat = x * camRightX + y * camRightZ;
              for (let cy = 0; cy < MAP_ROWS && !shouldCut; cy++) {
                for (let cx2 = 0; cx2 < MAP_COLS; cx2++) {
                  const t2 = curBattle.map.grid[cy][cx2];
                  if (t2.type === "wall") continue;
                  const d2 = cx2 * camFwdX + cy * camFwdZ;
                  const l2 = cx2 * camRightX + cy * camRightZ;
                  if (d2 < myDepth && d2 >= myDepth - 5.2 && Math.abs(l2 - myLat) <= 2.2) {
                    shouldCut = true;
                    break;
                  }
                }
              }
            }
            const targetScale = shouldCut ? 0.82 : fullScaleY;
            const targetOp = shouldCut ? 0.65 : 1;
            mesh.scale.y += (targetScale - mesh.scale.y) * Math.min(1, dt * 10);
            mesh.position.y = mesh.scale.y / 2 - 0.5;
            mesh.material.opacity += (targetOp - mesh.material.opacity) * Math.min(1, dt * 10);
          }

          // Render ground loot drops (potions / antidotes)
          dropGroup.clear();
          for (const dr of curBattle.map.drops || []) {
            const dth = curBattle.map.grid[dr.y]?.[dr.x]?.h ?? 1;
            const dMesh = new THREE.Mesh(
              dropGeo,
              new THREE.MeshStandardMaterial({
                color: dr.kind === "antidote" ? 0x34d399 : 0xfbbf24,
                emissive: dr.kind === "antidote" ? 0x059669 : 0xd97706,
                emissiveIntensity: 0.7,
                roughness: 0.25,
              })
            );
            dMesh.position.set(dr.x, dth * ELEV_H + 0.28 + Math.sin(nowSec * 4 + dr.x) * 0.06, dr.y);
            dMesh.rotation.y = nowSec * 2.2;
            dropGroup.add(dMesh);
          }

          // Update prop s0 -> s1 textures when broken
          for (const pv of propVisuals.values()) {
            if (pv.prop.broken && !pv.isBrokenRendered) {
              pv.isBrokenRendered = true;
              pv.mat.map = getImgTexture(pv.prop.imgBroken, pv.prop.name, "foe", (img) => {
                pv.applyPropAspect?.(img, 0.75);
              });
              pv.mat.needsUpdate = true;
              pv.mesh.scale.y = 0.75;
              pv.mesh.position.y = pv.th * ELEV_H + pv.baseH * 0.36;
            }
            pv.mesh.lookAt(camera.position.x, pv.mesh.position.y, camera.position.z);
            const basePropX = pv.mesh.userData?.basePropScaleX || Math.abs(pv.mesh.scale.x) || 1;
            const rotSteps = Math.round((currentYaw - 0.785) / (Math.PI / 2));
            const flipForYaw = Math.abs(rotSteps) % 2 === 1 ? !pv.prop.mirror : Boolean(pv.prop.mirror);
            pv.mesh.scale.x = flipForYaw ? -basePropX : basePropX;
          }

          // Upright-billboard scenic 2D props + auto-fade building roofs when heroes enter
          for (const sb of scenicBillboards) {
            sb.lookAt(camera.position.x, sb.position.y, camera.position.z);
          }
          for (const bv of buildingVisuals) {
            const heroInside = (curBattle.units || []).some(
              (u) =>
                u.side === "hero" &&
                !u.dead &&
                u.x >= bv.b.x1 &&
                u.x <= bv.b.x2 &&
                u.y >= bv.b.y1 &&
                u.y <= bv.b.y2
            );
            const targetOpacity = heroInside ? 0.14 : 0.9;
            bv.roofMat.opacity += (targetOpacity - bv.roofMat.opacity) * Math.min(1, dt * 8);
          }

          // Hover path & AoE highlights
          // Dual Quad Update: persistent elemental surfaces + tactical highlights on top
          const hoverKey = hovTile ? `${hovTile.x},${hovTile.y}` : "";
          const hoverPathSet = new Set();
          if (reachMap && reachMap.has(hoverKey)) {
            for (const p of reachMap.get(hoverKey).path) hoverPathSet.add(`${p.x},${p.y}`);
          }
          const aoeSet = new Set((hovFc?.aoeCells || []).map((c) => `${c.x},${c.y}`));

          for (const [k, ov] of overlayTiles.entries()) {
            const [tx, ty] = k.split(",").map(Number);
            const tile = curBattle.map.grid[ty]?.[tx];

            // Layer 1: Persistent elemental terrain surface
            if (tile?.surface === "darkness") {
              ov.surfMat.map = textures.darkness;
              ov.surfMat.opacity = 0.94;
            } else if (tile?.surface === "grease") {
              ov.surfMat.map = textures.grease;
              ov.surfMat.opacity = 0.85;
            } else if (tile?.surface === "fire") {
              ov.surfMat.map = textures.fire;
              ov.surfMat.opacity = 0.84;
            } else if (tile?.surface === "oil") {
              ov.surfMat.map = textures.oil;
              ov.surfMat.opacity = 0.82;
            } else if (tile?.surface === "electrified_water") {
              ov.surfMat.map = textures.elec;
              ov.surfMat.opacity = 0.84;
            } else if (tile?.surface === "steam_cloud") {
              ov.surfMat.map = textures.steam;
              ov.surfMat.opacity = 0.68;
            } else if (tile?.surface === "ice") {
              ov.surfMat.map = textures.ice;
              ov.surfMat.opacity = 0.82;
            } else if (tile?.surface === "poison") {
              ov.surfMat.map = textures.poison;
              ov.surfMat.opacity = 0.78;
            } else if (tile?.difficult || tile?.surface === "difficult") {
              ov.surfMat.map = textures.difficult;
              ov.surfMat.opacity = 0.58;
            } else {
              ov.surfMat.map = null;
              ov.surfMat.opacity = 0;
            }
            ov.surfMat.needsUpdate = true;

            // Layer 2: Interactive movement / target / AoE highlights
            if (aoeSet.has(k)) {
              ov.hiMat.color.setHex(0xf97316);
              ov.hiMat.opacity = 0.62;
            } else if (tgtKeys && tgtKeys.has(k)) {
              ov.hiMat.color.setHex(0xef4444);
              ov.hiMat.opacity = 0.48;
            } else if (hoverPathSet.has(k)) {
              ov.hiMat.color.setHex(0xfbbf24);
              ov.hiMat.opacity = 0.58;
            } else if (reachMap && reachMap.has(k)) {
              const info = reachMap.get(k);
              ov.hiMat.color.setHex(info.provokesOA ? 0xf59e0b : 0x38bdf8);
              ov.hiMat.opacity = info.provokesOA ? 0.38 : 0.34;
            } else if (k === hoverKey) {
              ov.hiMat.color.setHex(0xfde047);
              ov.hiMat.opacity = 0.4;
            } else {
              ov.hiMat.opacity = 0;
            }
            ov.hiMat.needsUpdate = true;
          }

          // Animate unit movement + project 60fps overhead unit HUD bars with zero React re-renders
          const wPx = container.clientWidth || 900;
          const hPx = container.clientHeight || 600;
          const anims = stateRef.current.animatingUnits;

          for (const [uid, vis] of unitVisuals.entries()) {
            const u = vis.unit;
            const offset = u.footprint === 2 ? 0.5 : 0;
            const isActive = u.id === actId;
            const isKo = u.hp === 0;

            vis.ring.material.color.setHex(
              isKo
                ? 0xfacc15
                : isActive
                  ? 0xfde047
                  : u.isNpcAlly
                    ? u.allyRole === "vip"
                      ? 0xf59e0b
                      : 0x10b981
                    : u.side === "hero"
                      ? 0x3b82f6
                      : 0xef4444
            );
            const isProne = Boolean(u.conditions?.Prone || u.conditions?.Unconscious || isKo);

            // Persistent 3D Aura & Status Ring (Paladin Aura, Bard Song, Rage, Shielded, Blessed, Poisoned)
            const auraColor =
              u.hp > 0 && !u.dead
                ? u.conditions?.Rage
                  ? 0xef4444
                  : u.conditions?.Shielded
                    ? 0x38bdf8
                    : u.isPaladin || u.conditions?.Blessed
                      ? 0xfde047
                      : u.activeSong
                        ? 0x34d399
                        : u.conditions?.Poisoned
                          ? 0x4ade80
                          : null
                : null;
            if (auraColor !== null) {
              const isPalOrBard = Boolean(u.isPaladin || (u.isBard && u.activeSong));
              if (!vis.auraRing) {
                const aGeo = new THREE.RingGeometry(0.45, 0.58, 28);
                const aMat = new THREE.MeshBasicMaterial({
                  color: auraColor,
                  side: THREE.DoubleSide,
                  transparent: true,
                  opacity: 0.52,
                });
                vis.auraRing = new THREE.Mesh(aGeo, aMat);
                vis.auraRing.rotation.x = -Math.PI / 2;
                vis.auraRing.position.y = 0.04;
                vis.grp.add(vis.auraRing);
              }
              vis.auraRing.visible = true;
              vis.auraRing.material.color.setHex(auraColor);
              const pulse = 1 + Math.sin(nowSec * 3.8 + u.x) * 0.09;
              vis.auraRing.scale.set(pulse, pulse, 1);
              vis.auraRing.material.opacity = 0.36 + 0.22 * (0.5 + 0.5 * Math.sin(nowSec * 4.5));

              // Wide tactical aura boundary ring for Paladin (2 cells) and Bard Song (3 cells)
              if (isPalOrBard) {
                const auraRadius = u.isBard && u.activeSong ? 3.15 : 2.18;
                if (!vis.wideAuraRing) {
                  const wGeo = new THREE.RingGeometry(auraRadius - 0.1, auraRadius, 48);
                  const wMat = new THREE.MeshBasicMaterial({
                    color: auraColor,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.24,
                  });
                  vis.wideAuraRing = new THREE.Mesh(wGeo, wMat);
                  vis.wideAuraRing.rotation.x = -Math.PI / 2;
                  vis.wideAuraRing.position.y = 0.03;
                  vis.grp.add(vis.wideAuraRing);
                }
                vis.wideAuraRing.visible = true;
                vis.wideAuraRing.material.color.setHex(auraColor);
                vis.wideAuraRing.material.opacity = 0.18 + 0.1 * (0.5 + 0.5 * Math.sin(nowSec * 3.0));
              } else if (vis.wideAuraRing) {
                vis.wideAuraRing.visible = false;
              }
            } else {
              if (vis.auraRing) vis.auraRing.visible = false;
              if (vis.wideAuraRing) vis.wideAuraRing.visible = false;
            }

            const isDarkMap = ["underground", "night", "horror"].includes(curBattle.map?.lighting);
            const wantsLit = Boolean(u.conditions?.Lit);
            const wantsDv = !wantsLit && isDarkMap && u.side === "hero" && Boolean(u.hasDarkvision);
            if ((wantsLit || wantsDv) && u.hp > 0 && !u.dead) {
              if (!vis.unitLight) {
                vis.unitLight = new THREE.PointLight(wantsLit ? 0xffe89e : 0xcbd5e1, wantsLit ? 3.1 : 1.45, wantsLit ? 7.8 : 5.6);
                vis.unitLight.position.set(0, 1.05, 0);
                vis.grp.add(vis.unitLight);
              } else {
                vis.unitLight.color.setHex(wantsLit ? 0xffe89e : 0xcbd5e1);
                vis.unitLight.intensity = wantsLit ? 3.1 : 1.45;
                vis.unitLight.distance = wantsLit ? 7.8 : 5.6;
              }
            } else if (vis.unitLight) {
              vis.grp.remove(vis.unitLight);
              vis.unitLight = null;
            }

            const mv = anims.get(uid);
            if (mv) {
              mv.t += dt * 2.4;
              if (mv.t >= 1) {
                mv.t = 0;
                mv.stepIdx += 1;
              }
              if (mv.stepIdx >= mv.path.length - 1) {
                const last = mv.path[mv.path.length - 1];
                const lh = curBattle.map.grid[last.y]?.[last.x]?.h ?? 1;
                vis.grp.position.set(last.x + offset, lh * ELEV_H, last.y + offset);
                anims.delete(uid);
              } else {
                const a = mv.path[mv.stepIdx];
                const b = mv.path[mv.stepIdx + 1];
                const za = (curBattle.map.grid[a.y]?.[a.x]?.h ?? 1) * ELEV_H;
                const zb = (curBattle.map.grid[b.y]?.[b.x]?.h ?? 1) * ELEV_H;
                const hop = Math.sin(mv.t * Math.PI) * 0.36;
                vis.grp.position.set(
                  a.x + (b.x - a.x) * mv.t + offset,
                  za + (zb - za) * mv.t + hop,
                  a.y + (b.y - a.y) * mv.t + offset
                );
              }
            } else {
              const th = curBattle.map.grid[u.y]?.[u.x]?.h ?? 1;
              const targetPos = new THREE.Vector3(u.x + offset, th * ELEV_H, u.y + offset);
              vis.grp.position.lerp(targetPos, Math.min(1, dt * 4.2));
            }

            // Apply hit recoil/flash, miss dodge sway, and attacker lunge animations
            const uAnim = stateRef.current.unitAnims.get(uid);
            const cardMat = vis.card?.material;
            if (uAnim) {
              const uAge = now - uAnim.born;
              if (uAge >= uAnim.ttl) {
                stateRef.current.unitAnims.delete(uid);
                vis.card.position.x = 0;
                vis.card.position.z = 0;
                vis.card.rotation.z = 0;
                if (cardMat && cardMat.color) cardMat.color.setHex(0xffffff);
              } else {
                const ap = uAge / uAnim.ttl;
                if (uAnim.kind === "hit") {
                  const shake = Math.sin(ap * Math.PI * 6) * 0.2 * (1 - ap);
                  const tilt = Math.sin(ap * Math.PI) * (uAnim.crit ? 0.28 : 0.18);
                  vis.card.position.x = shake;
                  vis.card.position.z = Math.sin(ap * Math.PI) * 0.16;
                  vis.card.rotation.z = tilt;
                  if (cardMat && cardMat.color) {
                    const flash = Math.sin(ap * Math.PI * 3) > 0;
                    cardMat.color.setHex(flash ? 0xff4d4d : 0xffffff);
                  }
                } else if (uAnim.kind === "miss") {
                  const sway = Math.sin(ap * Math.PI) * 0.28;
                  vis.card.position.x = sway;
                  vis.card.rotation.z = -sway * 0.6;
                  if (cardMat && cardMat.color) cardMat.color.setHex(0xffffff);
                } else if (uAnim.kind === "lunge") {
                  const dx = (uAnim.toX ?? u.x) - u.x;
                  const dy = (uAnim.toY ?? u.y) - u.y;
                  const dLen = Math.hypot(dx, dy) || 1;
                  const thrust = Math.sin(ap * Math.PI) * 0.36;
                  vis.card.position.x = (dx / dLen) * thrust;
                  vis.card.position.z = (dy / dLen) * thrust;
                  vis.card.rotation.z = 0;
                  if (cardMat && cardMat.color) cardMat.color.setHex(0xffffff);
                }
              }
            } else {
              if (vis.card) {
                vis.card.position.x = 0;
                vis.card.position.z = 0;
                vis.card.rotation.z = 0;
              }
              if (cardMat && cardMat.color) cardMat.color.setHex(0xffffff);
            }

            if (isProne) {
              // Billboard toward camera first so 360-deg orbit NEVER hides or edge-clips fallen units,
              // then tilt down & lean along directional knockdown vector above floor height.
              vis.card.lookAt(camera.position.x, vis.grp.position.y + 0.26, camera.position.z);
              const pdx = u.proneDir?.dx ?? (u.facingTarget ? Math.sign(u.facingTarget.x - u.x) : u.side === "hero" ? -1 : 1);
              const pdy = u.proneDir?.dy ?? (u.facingTarget ? Math.sign(u.facingTarget.y - u.y) : 0);
              const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
              const sideLean = pdx * camRight.x + pdy * camRight.z;
              vis.card.rotateX(-Math.PI / 2.75);
              vis.card.rotateZ(-sideLean * 0.55);
              vis.card.position.y = 0.24;
            } else {
              const flyOffset = u.flies ? 0.46 + Math.sin(nowSec * 3.8 + u.x) * 0.08 : Math.sin(nowSec * 3.2 + u.x) * 0.03;
              vis.card.lookAt(camera.position.x, vis.grp.position.y + vis.standeeH * 0.48 + (u.flies ? 0.46 : 0), camera.position.z);
              vis.card.position.y = vis.standeeH * 0.48 + flyOffset;

              // Dynamic screen-space horizontal mirroring so units always face their target/foes
              let fTarget = u.facingTarget;
              if (!fTarget) {
                let bestD = Infinity;
                for (const other of curBattle.units || []) {
                  if (other.side !== u.side && !other.dead && other.hp > 0) {
                    const d = Math.hypot(other.x - u.x, other.y - u.y);
                    if (d < bestD) {
                      bestD = d;
                      fTarget = { x: other.x, y: other.y };
                    }
                  }
                }
              }
              let wantRight = null;
              if (fTarget) {
                const uProj = new THREE.Vector3(vis.grp.position.x, vis.grp.position.y, vis.grp.position.z).project(camera);
                const tProj = new THREE.Vector3(fTarget.x, vis.grp.position.y, fTarget.y).project(camera);
                const dxNdc = tProj.x - uProj.x;
                if (Math.abs(dxNdc) > 0.012) {
                  wantRight = dxNdc > 0;
                  const nativeDir = u.nativeFacing || (u.side === "hero" ? "right" : "left");
                  const baseScale = vis.card.userData?.baseScaleX || Math.abs(vis.card.scale.x) || 1;
                  if (nativeDir === "front") {
                    vis.card.scale.x = baseScale;
                  } else {
                    const nativeRight = nativeDir === "right";
                    vis.card.scale.x = wantRight === nativeRight ? baseScale : -baseScale;
                  }
                }
              }

              // Perched/floating familiar at the top-right corner of the owner's Token
              if (vis.familiarCard && u.familiar) {
                const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
                const sideOff = 0.36;
                vis.familiarCard.position.set(
                  rightVec.x * sideOff,
                  vis.standeeH * 0.88 + Math.sin(nowSec * 4.4 + u.x) * 0.06,
                  rightVec.z * sideOff + 0.06
                );
                vis.familiarCard.lookAt(camera.position.x, vis.grp.position.y + vis.standeeH * 0.88, camera.position.z);
                if (wantRight !== null) {
                  const famNativeDir = u.familiar.nativeFacing || "right";
                  const famBase = vis.familiarCard.userData?.baseScaleX || Math.abs(vis.familiarCard.scale.x) || 1;
                  if (famNativeDir === "front") {
                    vis.familiarCard.scale.x = famBase;
                  } else {
                    const famNativeRight = famNativeDir === "right";
                    vis.familiarCard.scale.x = wantRight === famNativeRight ? famBase : -famBase;
                  }
                }
              }
            }

            const hudEl = unitHudRefs.current.get(uid);
            if (hudEl) {
              const hv = new THREE.Vector3(
                vis.grp.position.x,
                vis.grp.position.y + (isKo ? 0.45 : vis.standeeH + 0.14),
                vis.grp.position.z
              );
              hv.project(camera);
              const sx = (hv.x * 0.5 + 0.5) * wPx;
              const sy = (-hv.y * 0.5 + 0.5) * hPx;
              hudEl.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -100%)`;
              if (uid === actId && latestPropsRef.current.onActiveScreenPos) {
                const prevPos = stateRef.current.lastActiveScreenPos;
                if (
                  !prevPos ||
                  prevPos.id !== uid ||
                  Math.abs(sx - prevPos.x) > 8 ||
                  Math.abs(sy - prevPos.y) > 8 ||
                  Math.abs(wPx - prevPos.w) > 8
                ) {
                  const nextPos = { id: uid, x: Math.round(sx), y: Math.round(sy), w: wPx, h: hPx };
                  stateRef.current.lastActiveScreenPos = nextPos;
                  latestPropsRef.current.onActiveScreenPos(nextPos);
                }
              }
            }
          }

          // Project active 3D VFX spheres/blasts
          fxGroup.clear();
          const fxList = stateRef.current.fxList;
          for (let i = fxList.length - 1; i >= 0; i--) {
            const fx = fxList[i];
            const age = now - fx.born;
            if (age >= fx.ttl) {
              fxList.splice(i, 1);
              continue;
            }
            const p = age / fx.ttl;
            if ((fx.type === "cone" || fx.aoeShape === "cone") && fx.fromX !== undefined && fx.toX !== undefined) {
              const startVec = new THREE.Vector3(fx.fromX, (fx.fromZ ?? 1) * ELEV_H + 0.55, fx.fromY);
              const endVec = new THREE.Vector3(fx.toX, (fx.toZ ?? 1) * ELEV_H + 0.55, fx.toY);
              const dir = endVec.clone().sub(startVec);
              const dist = Math.max(2.2, Math.min(5.2, dir.length() || 3.2));
              if (dir.lengthSq() < 0.001) dir.set(1, 0, 0);
              dir.normalize();
              const reach = dist * (0.28 + 0.72 * Math.min(1, p * 1.45));
              const radius = reach * 0.58;
              const coneGeo = new THREE.ConeGeometry(radius, reach, 16, 1, true);
              // ConeGeometry tip is at +Y, base at -Y; rotate so tip is at caster (startVec) and opens outward along +dir
              const coneMat = new THREE.MeshBasicMaterial({
                color: fx.color || "#fb923c",
                transparent: true,
                opacity: 0.48 * (1 - p),
                side: THREE.DoubleSide,
                depthWrite: false,
              });
              const coneMesh = new THREE.Mesh(coneGeo, coneMat);
              coneMesh.position.copy(startVec).addScaledVector(dir, reach * 0.5);
              coneMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir);
              fxGroup.add(coneMesh);

              // Spray particles fanning out inside the cone
              const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
              for (let k = 0; k < 14; k++) {
                const frac = ((k % 5) + 1) / 5;
                const spread = ((k % 7) - 3) / 3.2;
                const travel = reach * (0.2 + 0.8 * Math.min(1, p * 1.3 + k * 0.03)) * frac;
                const pMesh = new THREE.Mesh(
                  new THREE.SphereGeometry(0.11 * (1 - p * 0.4), 6, 6),
                  new THREE.MeshBasicMaterial({
                    color: k % 2 === 0 ? fx.color || "#fb923c" : "#fef08a",
                    transparent: true,
                    opacity: 0.9 * (1 - p),
                  })
                );
                pMesh.position
                  .copy(startVec)
                  .addScaledVector(dir, travel)
                  .addScaledVector(perp, spread * (travel * 0.45));
                pMesh.position.y += Math.sin(p * Math.PI + k) * 0.12;
                fxGroup.add(pMesh);
              }
            } else if ((fx.type === "line" || fx.aoeShape === "line") && fx.fromX !== undefined && fx.toX !== undefined) {
              const startVec = new THREE.Vector3(fx.fromX, (fx.fromZ ?? 1) * ELEV_H + 0.55, fx.fromY);
              let farX = fx.toX;
              let farY = fx.toY;
              let farZ = fx.toZ ?? 1;
              if (Array.isArray(fx.aoeCells) && fx.aoeCells.length > 0) {
                let bestD = -1;
                for (const ac of fx.aoeCells) {
                  const d = Math.hypot(ac.x - fx.fromX, ac.y - fx.fromY);
                  if (d > bestD) {
                    bestD = d;
                    farX = ac.x;
                    farY = ac.y;
                    farZ = curBattle.map.grid[ac.y]?.[ac.x]?.h ?? farZ;
                  }
                }
              }
              const endVec = new THREE.Vector3(farX, farZ * ELEV_H + 0.55, farY);
              const dir = endVec.clone().sub(startVec);
              const len = Math.max(0.8, dir.length());
              if (dir.lengthSq() < 0.001) dir.set(1, 0, 0);
              const unitDir = dir.clone().normalize();
              const mid = startVec.clone().addScaledVector(unitDir, len * 0.5);

              // Outer glowing beam
              const outerMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(0.22 * (1 - p * 0.35), 0.22 * (1 - p * 0.35), len, 10, 1, true),
                new THREE.MeshBasicMaterial({
                  color: fx.color || "#38bdf8",
                  transparent: true,
                  opacity: 0.55 * (1 - p),
                  side: THREE.DoubleSide,
                  depthWrite: false,
                })
              );
              outerMesh.position.copy(mid);
              outerMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unitDir);
              fxGroup.add(outerMesh);

              // Inner bright core
              const coreMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.08, len, 8),
                new THREE.MeshBasicMaterial({
                  color: "#ffffff",
                  transparent: true,
                  opacity: 0.92 * (1 - p),
                })
              );
              coreMesh.position.copy(mid);
              coreMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unitDir);
              fxGroup.add(coreMesh);

              // Traveling energy pulse along the beam
              const pulse = new THREE.Mesh(
                new THREE.SphereGeometry(0.24, 10, 10),
                new THREE.MeshBasicMaterial({
                  color: fx.color || "#38bdf8",
                  transparent: true,
                  opacity: 0.95 * (1 - p * 0.5),
                })
              );
              pulse.position.copy(startVec).addScaledVector(unitDir, len * Math.min(1, p * 1.25));
              fxGroup.add(pulse);
            } else if ((fx.type === "heal" || fx.type === "buff") && fx.x !== undefined) {
              const hz = (curBattle.map.grid[fx.y]?.[fx.x]?.h ?? 1) * ELEV_H;
              const col = fx.color || (fx.type === "heal" ? "#4ade80" : "#fde047");
              const pillar = new THREE.Mesh(
                new THREE.CylinderGeometry(0.3 * (1 - p * 0.35), 0.38, 1.65 * (0.4 + p * 0.7), 14, 1, true),
                new THREE.MeshBasicMaterial({
                  color: col,
                  transparent: true,
                  opacity: 0.48 * (1 - p),
                  side: THREE.DoubleSide,
                })
              );
              pillar.position.set(fx.x, hz + 0.65 + p * 0.35, fx.y);
              fxGroup.add(pillar);
              const ring = new THREE.Mesh(
                new THREE.TorusGeometry(0.32 + p * 0.22, 0.04, 8, 22),
                new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.85 * (1 - p) })
              );
              ring.rotation.x = Math.PI / 2;
              ring.position.set(fx.x, hz + 0.15 + p * 1.15, fx.y);
              fxGroup.add(ring);
            } else if (fx.type === "strike" && fx.toX !== undefined) {
              const tz = (fx.toZ ?? 1) * ELEV_H + 0.6;
              const style = fx.weaponStyle || "slash";
              const col = fx.color || "#f87171";
              if (style === "bludgeon") {
                const smashRing = new THREE.Mesh(
                  new THREE.RingGeometry(0.16 + p * 0.55, 0.28 + p * 0.65, 22),
                  new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, transparent: true, opacity: 0.9 * (1 - p) })
                );
                smashRing.rotation.x = -Math.PI / 2;
                smashRing.position.set(fx.toX, (fx.toZ ?? 1) * ELEV_H + 0.1, fx.toY);
                fxGroup.add(smashRing);
              } else if (style === "pierce") {
                const startVec = new THREE.Vector3(fx.fromX, (fx.fromZ ?? 1) * ELEV_H + 0.55, fx.fromY);
                const endVec = new THREE.Vector3(fx.toX, tz, fx.toY);
                const dir = new THREE.Vector3().subVectors(endVec, startVec).normalize();
                const spear = new THREE.Mesh(
                  new THREE.ConeGeometry(0.11, 0.78, 8),
                  new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.95 * (1 - p * 0.6) })
                );
                spear.position.lerpVectors(startVec, endVec, Math.min(1, p * 1.35));
                spear.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
                fxGroup.add(spear);
              } else {
                // Sword crescent slash arc
                const arc = new THREE.Mesh(
                  new THREE.TorusGeometry(0.52, 0.055, 6, 18, Math.PI * 0.95),
                  new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.95 * (1 - p) })
                );
                arc.position.set(fx.toX, tz + 0.1, fx.toY);
                arc.rotation.set(0.45, currentYaw + p * 1.4, -0.6 + p * 2.2);
                fxGroup.add(arc);
              }
            } else if ((fx.type === "fireball" || fx.type === "bolt") && fx.toX !== undefined) {
              const dt = String(fx.dmgType || "").toLowerCase();
              const col = fx.color || "#fb923c";
              if (dt === "lightning") {
                const pts = [];
                const segs = 6;
                for (let s = 0; s <= segs; s++) {
                  const t = s / segs;
                  const jitter = s === 0 || s === segs ? 0 : (Math.sin(nowSec * 45 + s * 3.1) * 0.22);
                  pts.push(new THREE.Vector3(
                    fx.fromX + (fx.toX - fx.fromX) * t + jitter,
                    (fx.fromZ ?? 1) * ELEV_H + 0.65 + ((fx.toZ ?? 1) - (fx.fromZ ?? 1)) * ELEV_H * t + Math.abs(jitter) * 0.5,
                    fx.fromY + (fx.toY - fx.fromY) * t - jitter * 0.6
                  ));
                }
                const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
                fxGroup.add(new THREE.Line(lGeo, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 1 - p * 0.7 })));
              } else if (fx.type === "bolt" && !fx.isSpell) {
                // Physical arrow / crossbow bolt / throwing knife (no plain red dot!)
                const curPos = new THREE.Vector3(
                  fx.fromX + (fx.toX - fx.fromX) * p,
                  (fx.fromZ ?? 1) * ELEV_H + 0.55 + ((fx.toZ ?? 1) - (fx.fromZ ?? 1)) * ELEV_H * p + Math.sin(p * Math.PI) * 0.45,
                  fx.fromY + (fx.toY - fx.fromY) * p
                );
                const nextP = Math.min(1, p + 0.05);
                const nextPos = new THREE.Vector3(
                  fx.fromX + (fx.toX - fx.fromX) * nextP,
                  (fx.fromZ ?? 1) * ELEV_H + 0.55 + ((fx.toZ ?? 1) - (fx.fromZ ?? 1)) * ELEV_H * nextP + Math.sin(nextP * Math.PI) * 0.45,
                  fx.fromY + (fx.toY - fx.fromY) * nextP
                );
                const dir = new THREE.Vector3().subVectors(nextPos, curPos);
                if (dir.lengthSq() > 0.0001) dir.normalize();
                else dir.set(0, 0, 1);
                const arrowGrp = new THREE.Group();
                const shaft = new THREE.Mesh(
                  new THREE.CylinderGeometry(0.025, 0.025, 0.52, 6),
                  new THREE.MeshBasicMaterial({ color: "#e2e8f0" })
                );
                const tip = new THREE.Mesh(
                  new THREE.ConeGeometry(0.065, 0.16, 6),
                  new THREE.MeshBasicMaterial({ color: "#fbbf24" })
                );
                tip.position.y = 0.28;
                arrowGrp.add(shaft, tip);
                arrowGrp.position.copy(curPos);
                arrowGrp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
                fxGroup.add(arrowGrp);
              } else {
                // Magic spell orb + glowing halo ring
                const orbPos = new THREE.Vector3(
                  fx.fromX + (fx.toX - fx.fromX) * p,
                  (fx.fromZ ?? 1) * ELEV_H + 0.55 + ((fx.toZ ?? 1) - (fx.fromZ ?? 1)) * ELEV_H * p + Math.sin(p * Math.PI) * 0.65,
                  fx.fromY + (fx.toY - fx.fromY) * p
                );
                const orb = new THREE.Mesh(
                  dt === "cold" ? new THREE.OctahedronGeometry(0.22, 0) : new THREE.SphereGeometry(fx.type === "fireball" ? 0.3 : 0.17, 10, 10),
                  new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.95 * (1 - p * 0.35) })
                );
                orb.position.copy(orbPos);
                fxGroup.add(orb);
                const halo = new THREE.Mesh(
                  new THREE.TorusGeometry(0.28, 0.03, 6, 16),
                  new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.65 * (1 - p) })
                );
                halo.position.copy(orbPos);
                halo.rotation.set(nowSec * 6, nowSec * 4, 0);
                fxGroup.add(halo);
              }
              if (fx.type === "fireball" && p > 0.55) {
                const ep = (p - 0.55) / 0.45;
                const boom = new THREE.Mesh(
                  new THREE.SphereGeometry(0.45 + ep * 0.95, 12, 12),
                  new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.65 * (1 - ep) })
                );
                boom.position.set(fx.toX, (fx.toZ ?? 1) * ELEV_H + 0.4, fx.toY);
                fxGroup.add(boom);
              }
            }
            if (fx.aoeCells) {
              for (const ac of fx.aoeCells) {
                const ah = curBattle.map.grid[ac.y]?.[ac.x]?.h ?? 1;
                const blast = new THREE.Mesh(
                  flatGeo,
                  new THREE.MeshBasicMaterial({
                    color: fx.color || "#f97316",
                    transparent: true,
                    opacity: 0.7 * (1 - p),
                  })
                );
                blast.rotation.x = -Math.PI / 2;
                blast.position.set(ac.x, ah * ELEV_H + 0.08 + p * 0.25, ac.y);
                fxGroup.add(blast);
              }
            }
          }

          // Project floating damage / save labels into 2D screen overlay
          const nextFloats = [];
          for (let i = stateRef.current.floats.length - 1; i >= 0; i--) {
            const fl = stateRef.current.floats[i];
            const age = now - fl.born;
            if (age >= fl.ttl) {
              stateRef.current.floats.splice(i, 1);
              continue;
            }
            const p = age / fl.ttl;
            const rise = fl.isBubble ? 1.25 + p * 0.22 : 0.9 + p * 1.0;
            const vec = new THREE.Vector3(fl.x, fl.z * ELEV_H + rise, fl.y);
            vec.project(camera);
            nextFloats.push({
              id: fl.id,
              isBubble: Boolean(fl.isBubble),
              variant: fl.variant || null,
              side: fl.side,
              left: (vec.x * 0.5 + 0.5) * wPx,
              top: (-vec.y * 0.5 + 0.5) * hPx,
              text: fl.text,
              color: fl.color,
              opacity: fl.isBubble
                ? Math.max(0, p > 0.78 ? (1 - p) / 0.22 : 1)
                : Math.max(0, 1 - p * p),
            });
          }
          if (nextFloats.length > 0 || floatHadItemsRef.current) {
            floatHadItemsRef.current = nextFloats.length > 0;
            setFloatLabels(nextFloats);
          }
        }

        // Camera micro-shake on heavy hits / crits
        const cShake = stateRef.current.camShake;
        if (cShake && cShake.ttl > 0) {
          const cAge = now - cShake.born;
          if (cAge < cShake.ttl) {
            const decay = 1 - cAge / cShake.ttl;
            camera.position.x += (Math.random() - 0.5) * cShake.mag * decay;
            camera.position.y += (Math.random() - 0.5) * cShake.mag * decay;
          } else {
            cShake.ttl = 0;
          }
        }

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      }

      rafId = requestAnimationFrame(animate);
    })
      .catch((err) => {
        if (!disposed) {
          console.error("Failed to load Three.js 3D engine:", err);
          setThreeLoadError(err?.message || "3D 引擎模組載入失敗（可能是網路中斷或網站已更新）");
        }
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      if (cleanupHandlers) cleanupHandlers();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [retryNonce]);

  const livingUnits = (battle?.units || []).filter((u) => !u.dead && (u.side === "hero" || u.hp > 0));
  const hoveredUnitId =
    hoverTile && battle
      ? livingUnits.find((u) => {
          const fp = u.footprint || 1;
          return (
            hoverTile.x >= u.x &&
            hoverTile.x < u.x + fp &&
            hoverTile.y >= u.y &&
            hoverTile.y < u.y + fp
          );
        })?.id || null
      : null;

  return (
    <div className="tac3d-canvas-wrap">
      <div ref={hostRef} className="tac3d-webgl-host" />
      {threeLoadError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "rgba(9, 13, 22, 0.9)",
            color: "#f8fafc",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fbbf24" }}>⚠️ 3D 戰場模組載入失敗</div>
          <div style={{ fontSize: 12, color: "#cbd5e1", maxWidth: 420 }}>{threeLoadError}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="tac3d-btn is-primary" onClick={() => setRetryNonce((n) => n + 1)}>
              🔄 重試載入 3D 畫面
            </button>
            <button type="button" className="tac3d-btn" onClick={() => window.location.reload()}>
              ↻ 重新整理頁面
            </button>
          </div>
        </div>
      )}

      {/* Zero-Re-Render 60fps Overhead Mini HP & Status Bars (Minimalist: full nameplate on hover/active/alert) */}
      <div className="tac3d-unit-hud-layer" aria-hidden="true">
        {livingUnits.map((u) => {
          const hpPct = Math.max(0, Math.min(100, Math.round((u.hp / Math.max(1, u.maxHp)) * 100)));
          const conds = Object.keys(u.conditions || {});
          const isCur = u.id === activeUnitId;
          const isHov = u.id === hoveredUnitId;
          const showFull = storyMode || isCur || isHov || Boolean(u.telegraphing) || u.hp === 0;
          return (
            <div
              key={u.id}
              ref={(el) => {
                if (el) unitHudRefs.current.set(u.id, el);
                else unitHudRefs.current.delete(u.id);
              }}
              className={`tac3d-unit-hud is-${u.side}${isCur ? " is-active" : ""}${isHov ? " is-hovered" : ""}${showFull ? " is-expanded" : " is-compact"}${u.hp === 0 ? " is-ko" : ""}`}
            >
              {showFull && (
                <div className="tac3d-uh-top">
                  <span className="tac3d-uh-name">{storyMode && isCur && u.side === "hero" ? "👑 " : ""}{u.name.slice(0, 6)}</span>
                  {u.footprint === 2 && <span className="tac3d-uh-tag">2×2</span>}
                  {u.hp === 0 && <span className="tac3d-uh-tag is-ko">昏迷</span>}
                </div>
              )}
              {!storyMode && (
                <div className="tac3d-uh-bar">
                  <div className="tac3d-uh-fill" style={{ width: `${hpPct}%` }} />
                </div>
              )}
              {u.telegraphing && (
                <div className="tac3d-uh-conds">
                  <span style={{ background: "#b45309", color: "#fef3c7", borderColor: "#f59e0b" }}>⚠️蓄力重踏</span>
                </div>
              )}
              {conds.length > 0 && (
                <div className="tac3d-uh-conds">
                  {conds.slice(0, showFull ? 3 : 2).map((ck) => (
                    <span key={ck} title={COND_SHORT[ck] || ck}>
                      {showFull ? COND_SHORT[ck] || ck : COND_EMOJI[ck] || ck.slice(0, 2)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="tac3d-float-layer" aria-hidden="true">
        {floatLabels.map((fl) =>
          fl.isBubble ? (
            <div
              key={fl.id}
              className={`tac3d-speech-bubble is-${fl.side || "hero"}`}
              style={{
                left: `${fl.left}px`,
                top: `${fl.top}px`,
                opacity: fl.opacity,
              }}
            >
              {fl.text}
            </div>
          ) : (
            <span
              key={fl.id}
              className={`tac3d-float-text${fl.variant ? ` is-${fl.variant}` : ""}`}
              style={{
                left: `${fl.left}px`,
                top: `${fl.top}px`,
                color: fl.color,
                opacity: fl.opacity,
              }}
            >
              {fl.text}
            </span>
          )
        )}
      </div>
    </div>
  );
}
