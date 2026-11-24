import { LEGO_PROPS_CATALOG } from "./legoPropsCatalog.js";
import { TABLETOP_MAPS_CATALOG, TABLETOP_MAP_ALIASES } from "./tabletopMapsCatalog.js";
import { THEMED_PROPS_BY_CATEGORY } from "./themedPropsCatalog.js";

export const MAP_COLS = 16;
export const MAP_ROWS = 12;

export const WEATHER_PRESETS = [
  { id: "auto", label: "依場景預設", desc: "使用該戰場預設天氣" },
  { id: "clear", label: "☀️ 晴朗", desc: "視野清晰，無額外環境修正" },
  { id: "rain", label: "🌧️ 下雨", desc: "雨幕飄落；水窪易感電、火面較快熄滅" },
  { id: "lightning_storm", label: "⛈️ 雷暴閃電", desc: "狂風暴雨閃電交加；閃電傷害額外導電 +1" },
  { id: "snow", label: "❄️ 飄雪", desc: "雪花紛飛，寒霜氛圍" },
  { id: "fog", label: "🌫️ 濃霧", desc: "距離 > 3 格遠程命中 -1" },
  { id: "gale", label: "🌪️ 巨風", desc: "強風幹擾箭矢，所有遠程命中 -2" },
  { id: "embers", label: "🔥 火星餘燼", desc: "熾熱餘燼飄飛，火焰傷害 +1" },
  { id: "spores", label: "🍄 幽光孢子", desc: "地下洞窟螢光孢子緩緩飄浮" },
];

export const LIGHTING_PRESETS = [
  { id: "auto", label: "依場景預設" },
  { id: "daylight", label: "☀️ 日間" },
  { id: "dusk", label: "🌆 黃昏暮色" },
  { id: "night", label: "🌙 深夜月色" },
  { id: "underground", label: "🪨 地底洞窟" },
  { id: "horror", label: "🕯️ 恐怖陰森" },
];

export const TACTICAL3D_SCENARIOS = [
  {
    id: "cave_ambush",
    name: "地下洞穴伏擊通道",
    subtitle: "雙側高牆狹道 × 哥布林高台埋伏",
    bgm: "battle",
    palette: "cavern",
    defaultLighting: "underground",
    defaultWeather: "spores",
    defaultFoes: ["goblin", "goblin_archer", "orc", "goblin"],
    desc: "蜿蜒 2～3 格寬的地下洞穴通道，兩側皆為高聳岩壁，中段埋伏點設有鐘乳石掩體、火盆與高地狙擊石台。",
  },
  {
    id: "underground_river",
    name: "地下暗河石橋",
    subtitle: "淺水感電地形 × 雙岸石階對峙",
    bgm: "cave",
    palette: "river",
    defaultLighting: "underground",
    defaultWeather: "rain",
    defaultFoes: ["goblin_archer", "hobgoblin", "acolyte", "gnoll"],
    desc: "幽暗地下河橫貫洞窟（涉水消耗 2 格且可被閃電通電），中央架設狹窄石橋，對岸弓手踞守高台。",
  },
  {
    id: "chasm_sanctum",
    name: "深淵裂縫地下神殿",
    subtitle: "分叉側翼石徑 × 擊退墜落深淵",
    bgm: "dungeon",
    palette: "sanctum",
    defaultLighting: "horror",
    defaultWeather: "embers",
    defaultFoes: ["skeleton", "cultist", "acolyte", "cellar_spider_queen"],
    desc: "被深淵裂縫切開的地下神殿（推落深淵觸發墜落重傷），高地祭壇與暗側翼通道並存，適合展現立體走位。",
  },
  {
    id: "troll_grotto",
    name: "巨魔巢穴決戰（2×2頭目）",
    subtitle: "2×2 大型體型頭目 × 油面爆燃陷阱",
    bgm: "boss",
    palette: "grotto",
    defaultLighting: "underground",
    defaultWeather: "spores",
    defaultFoesByTier: {
      low: ["goblin", "goblin_archer", "orc", "ogre"],
      high: ["hobgoblin", "goblin_archer", "orc", "troll"],
    },
    defaultFoes: ["goblin", "goblin_archer", "orc", "ogre"],
    desc: "寬闊的岩窟大廳，兩側高牆壓陣，油窪與淺水交錯，鎮守其中的巨型食人魔／巨魔佔據真實 2×2 格足跡。",
  },
  {
    id: "forest_ambush",
    name: "密林驛道伏擊戰",
    subtitle: "林間木牆小徑 × 高地巨岩 × 營地路障",
    bgm: "battle",
    palette: "forest",
    defaultLighting: "dusk",
    defaultWeather: "rain",
    defaultFoes: ["goblin", "goblin_archer", "wolf", "bugbear"],
    desc: "林蔭遮蔽的泥濘山道，兩側密林形成天然側翼牆垣，林中營火、油窪與木石路障交織出典型戶外遭遇戰。",
  },
  {
    id: "tavern_brawl",
    name: "橡木桶酒館混戰",
    subtitle: "室內木板大廳 × 挑高樓台 × 可砸碎桌椅",
    bgm: "tavern",
    palette: "tavern",
    defaultLighting: "daylight",
    defaultWeather: "clear",
    defaultFoes: ["bandit", "bandit_marksman", "cultist", "bandit_captain"],
    desc: "熱鬧喧囂的雙層木造酒館，中央壁爐與滿地打翻的油脂／酒漬危機四伏，木桌椅與貨攤皆可作為掩體或被砸碎。",
  },
  {
    id: "frost_citadel",
    name: "極北冰霜要塞（2×2頭目）",
    subtitle: "雪原冰階 × 寒霜通道 × 巨獸鎮守",
    bgm: "boss",
    palette: "ice",
    defaultLighting: "night",
    defaultWeather: "snow",
    defaultFoesByTier: {
      low: ["kobold", "goblin_archer", "wolf", "ogre"],
      high: ["hobgoblin", "goblin_archer", "dire_wolf", "owlbear"],
    },
    defaultFoes: ["kobold", "goblin_archer", "wolf", "owlbear"],
    desc: "暴雪籠罩的北方冰岩要塞，冰河水溝與極地冰霜設施構成多層高低差，末尾鎮守著 2×2 巨大冰原猛獸。",
  },
  {
    id: "haunted_crypt",
    name: "幽魂古墓聖堂",
    subtitle: "哥德石廳 × 濃霧掩蔽 × 亡靈祭壇",
    bgm: "dungeon",
    palette: "crypt",
    defaultLighting: "horror",
    defaultWeather: "fog",
    defaultFoes: ["skeleton", "zombie", "ghoul", "wight"],
    desc: "霧氣瀰漫的陰森古墓殿堂，教堂長椅、墓穴掩體與血族祭壇林立，亡靈大軍自高台與暗影廊道合圍而來。",
  },
  {
    id: "ship_deck",
    name: "海盜船／飛空艇甲板",
    subtitle: "木造甲板 × 四面深水／高空 × 奪回船舵",
    bgm: "combat",
    palette: "ship",
    defaultLighting: "dusk",
    defaultWeather: "gale",
    defaultFoes: ["bandit", "bandit_marksman", "orc", "bandit_captain"],
    desc: "顛簸的木質船艦甲板，兩側為深水／高空墜落區，中央桅杆高台與船艙木箱構成搶點攻防。",
  },
  {
    id: "volcanic_forge",
    name: "熔岩鍛造場／煉獄神殿",
    subtitle: "黑曜石橋 × 熾熱餘燼 × 熔岩池",
    bgm: "boss",
    palette: "volcanic",
    defaultLighting: "underground",
    defaultWeather: "embers",
    defaultFoes: ["kobold", "cultist", "cult_fanatic", "ogre"],
    desc: "火星四濺的矮人熔爐與煉獄祭壇，火焰傷害全面提升，窄橋與鍛造高台考驗擊退控場。",
  },
  {
    id: "desert_canyon",
    name: "荒漠峽谷與沙丘競技場",
    subtitle: "烈日黃沙 × 風化岩崖 × 綠洲水池",
    bgm: "combat",
    palette: "desert",
    defaultLighting: "daylight",
    defaultWeather: "clear",
    defaultFoes: ["gnoll", "bandit_marksman", "wolf", "orc"],
    desc: "熾熱荒漠中的砂岩峽谷與競技沙場，兩側沙岩高地與中央綠洲水池成為遠近交鋒焦點。",
  },
  {
    id: "coral_underwater",
    name: "珊瑚海灣／沉沒神殿",
    subtitle: "潮汐淺灘 × 珊瑚礁高台 × 感電危機",
    bgm: "explore",
    palette: "coral",
    defaultLighting: "daylight",
    defaultWeather: "rain",
    defaultFoes: ["goblin", "goblin_archer", "giant_spider", "ghoul"],
    desc: "海浪拍打的海岸珊瑚神殿遺跡，大面積淺水區與高起珊瑚礁岩交錯，閃電系法術能引發連鎖感電。",
  },
  {
    id: "mountain_cliff",
    name: "險峻山道與斷崖吊橋",
    subtitle: "3層峭壁高地 × 萬丈深淵 × 強風吹襲",
    bgm: "combat",
    palette: "cliff",
    defaultLighting: "dusk",
    defaultWeather: "gale",
    defaultFoes: ["goblin_archer", "hobgoblin", "wolf", "orc"],
    desc: "一側是陡峭山壁、另一側直面萬丈深淵的高山險道，強風干擾遠程射擊，擊退推落即刻重創。",
  },
  {
    id: "castle_throne",
    name: "王座大廳與奧術高塔",
    subtitle: "大理石廊柱 × 高台王座 × 室內決戰",
    bgm: "boss",
    palette: "castle",
    defaultLighting: "daylight",
    defaultWeather: "clear",
    defaultFoes: ["cultist", "hobgoblin", "cult_fanatic", "bandit_captain"],
    desc: "莊嚴的城堡王座廳與高塔書庫，對稱大理石柱提供掩護，高階王座台階帶來居高臨下壓制。",
  },
  {
    id: "urban_alley",
    name: "城鎮暗巷與屋頂追逐",
    subtitle: "石板街道 × 兩側屋頂高台 × 市集攤位",
    bgm: "combat",
    palette: "urban",
    defaultLighting: "night",
    defaultWeather: "rain",
    defaultFoes: ["bandit", "bandit_marksman", "goblin", "bandit_captain"],
    desc: "夜雨中的城鎮暗巷與市集廣場，賊與弓手可搶佔屋頂高台狙擊，街道貨攤可搜刮補給或當掩體。",
  },
  {
    id: "swamp_ruins",
    name: "幽暗沼澤與蘑菇地底",
    subtitle: "毒沼淺灘 × 腐木棧道 × 幽光孢子",
    bgm: "dungeon",
    palette: "swamp",
    defaultLighting: "horror",
    defaultWeather: "spores",
    defaultFoes: ["zombie", "giant_spider", "ghoul", "troll"],
    desc: "孢子飄散的陰暗沼澤廢墟，泥濘水窪減緩行進，必須沿著木造棧道與乾燥石台推進。",
  },
];

export const PROP_TEMPLATES = {
  barricade: {
    kind: "barricade",
    name: "木石路障掩體",
    hp: 14,
    blocksMove: true,
    providesCover: true,
    flammable: true,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_032_01_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_032_01_s1.png",
  },
  camp_chest: {
    kind: "crate",
    name: "野營補給箱櫃",
    hp: 12,
    blocksMove: true,
    providesCover: true,
    flammable: true,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_031_01_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_031_01_s1.png",
  },
  jungle_barricade: {
    kind: "barricade",
    name: "岩藤防禦路障",
    hp: 16,
    blocksMove: true,
    providesCover: true,
    flammable: true,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_061_02_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_061_02_s1.png",
  },
  jungle_altar: {
    kind: "altar",
    name: "密林封印祭壇",
    hp: 20,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_064_02_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_064_02_s1.png",
  },
  tavern_table: {
    kind: "furniture",
    name: "酒館長木桌椅",
    hp: 10,
    blocksMove: true,
    providesCover: true,
    flammable: true,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_006_02_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_006_02_s1.png",
  },
  tavern_board: {
    kind: "furniture",
    name: "酒館任務公告欄",
    hp: 10,
    blocksMove: true,
    providesCover: true,
    flammable: true,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_006_01_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_006_01_s1.png",
  },
  market_stall: {
    kind: "crate",
    name: "木造補給貨攤",
    hp: 12,
    blocksMove: true,
    providesCover: true,
    flammable: true,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_006_03_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_006_03_s1.png",
  },
  ice_barricade: {
    kind: "barricade",
    name: "極地冰霜掩體",
    hp: 18,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_077_01_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_077_01_s1.png",
  },
  ice_chest: {
    kind: "crate",
    name: "冰封儲藏箱櫃",
    hp: 14,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_076_01_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_076_01_s1.png",
  },
  crypt_barricade: {
    kind: "barricade",
    name: "幽魂墓穴石障",
    hp: 18,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_092_01_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_092_01_s1.png",
  },
  church_pew: {
    kind: "furniture",
    name: "教堂木質長椅",
    hp: 12,
    blocksMove: true,
    providesCover: true,
    flammable: true,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_001_01_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_001_01_s1.png",
  },
  gothic_altar: {
    kind: "altar",
    name: "血族古堡祭壇",
    hp: 22,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_094_02_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_094_02_s1.png",
  },
  rune_well: {
    kind: "arcane_well",
    name: "符文魔井",
    hp: 18,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_002_02_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_002_02_s1.png",
  },
  obelisk: {
    kind: "obelisk",
    name: "遠古符文方尖碑",
    hp: 20,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_005_02_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_005_02_s1.png",
  },
  altar: {
    kind: "altar",
    name: "封印祭壇神龕",
    hp: 20,
    blocksMove: true,
    providesCover: true,
    flammable: false,
    imgIntact: "/prototype-assets/lego-props-v2/components/prop_009_02_s0.png",
    imgBroken: "/prototype-assets/lego-props-v2/components/prop_009_02_s1.png",
  },
};

export const PROP_SIZE_SPEC = {
  "sm|1x1": { scaleW: 0.72, scaleH: 0.72, hp: 8 },
  "md|1x1": { scaleW: 0.96, scaleH: 0.96, hp: 12 },
  "lg|1x1": { scaleW: 1.05, scaleH: 1.24, hp: 16 },
  "md|1x2": { scaleW: 1.05, scaleH: 1.22, hp: 15 },
  "lg|1x2": { scaleW: 1.18, scaleH: 1.42, hp: 18 },
  "lg|2x1": { scaleW: 1.38, scaleH: 1.18, hp: 18 },
  "xl|2x2": { scaleW: 1.65, scaleH: 1.72, hp: 26 },
};

export const SCENARIO_PROP_CATEGORIES = {
  cave_ambush: ["camp", "dungeon", "siege"],
  underground_river: ["dungeon", "arcane", "camp"],
  chasm_sanctum: ["arcane", "dungeon", "alchemy"],
  troll_grotto: ["dungeon", "siege", "nature", "camp"],
  forest_ambush: ["nature", "camp", "town"],
  tavern_brawl: ["tavern", "town", "market", "craft"],
  frost_citadel: ["ice", "siege", "arcane"],
  haunted_crypt: ["cemetery", "gothic", "church", "arcane"],
  ship_deck: ["siege", "camp", "town"],
  volcanic_forge: ["dungeon", "craft", "siege", "arcane"],
  desert_canyon: ["desert", "camp", "siege"],
  coral_underwater: ["nature", "arcane", "desert"],
  mountain_cliff: ["camp", "nature", "siege"],
  castle_throne: ["church", "arcane", "gothic", "town"],
  urban_alley: ["town", "market", "tavern", "craft"],
  swamp_ruins: ["nature", "cemetery", "dungeon", "alchemy"],
};

export const SCENARIO_OBJECTIVE_PRESETS = {
  cave_ambush: {
    templateKey: "camp_chest",
    name: "受困旅人鐵籠箱",
    objectiveType: "rescue",
    actionLabel: "撬鎖救援",
    skillName: "巧手",
    skillStat: "dex",
    dc: 12,
    rewardEffect: "heal_party",
    rewardDesc: "救出受困者並鼓舞全隊（全隊 +6 HP 並獲得祝福術）",
  },
  underground_river: {
    templateKey: "rune_well",
    name: "古代水閘符文井",
    objectiveType: "activate",
    actionLabel: "啟動機關",
    skillName: "運動",
    skillStat: "str",
    dc: 12,
    rewardEffect: "shockwave",
    rewardDesc: "啟動水閘震波（敵方全體受 2d6 傷害並震懾）",
  },
  chasm_sanctum: {
    templateKey: "altar",
    name: "充能封印祭壇",
    objectiveType: "dispel",
    actionLabel: "解除封印",
    skillName: "奧秘",
    skillStat: "int",
    dc: 13,
    rewardEffect: "weaken_foes",
    rewardDesc: "瓦解祭壇護盾（敵方受 2d6 輻射反噬＋妖火標記）",
  },
  troll_grotto: {
    templateKey: "camp_chest",
    name: "戰利品補給箱",
    objectiveType: "loot",
    actionLabel: "搜刮補給",
    skillName: "巧手",
    skillStat: "dex",
    dc: 11,
    rewardEffect: "grant_potion",
    rewardDesc: "取得強效治療藥水 +1 與火焰油瓶",
  },
  forest_ambush: {
    templateKey: "jungle_altar",
    name: "密林德魯伊石碑",
    objectiveType: "dispel",
    actionLabel: "喚醒靈脈",
    skillName: "自然/奧秘",
    skillStat: "wis",
    dc: 12,
    rewardEffect: "heal_party",
    rewardDesc: "喚醒林地庇佑（全隊 +6 HP 並獲得祝福術）",
  },
  tavern_brawl: {
    templateKey: "tavern_board",
    name: "酒館懸賞與秘密暗格",
    objectiveType: "loot",
    actionLabel: "開啟暗格",
    skillName: "巧手",
    skillStat: "dex",
    dc: 11,
    rewardEffect: "grant_potion",
    rewardDesc: "搜出私藏治療藥水 +1 與點火烈酒",
  },
  frost_citadel: {
    templateKey: "ice_chest",
    name: "冰封符文核心",
    objectiveType: "activate",
    actionLabel: "破壞核心",
    skillName: "運動",
    skillStat: "str",
    dc: 12,
    rewardEffect: "shockwave",
    rewardDesc: "引爆寒霜震波（敵方受 2d6 冰傷並破防）",
  },
  haunted_crypt: {
    templateKey: "gothic_altar",
    name: "亡靈召喚祭壇",
    objectiveType: "dispel",
    actionLabel: "淨化祭壇",
    skillName: "宗教/奧秘",
    skillStat: "int",
    dc: 13,
    rewardEffect: "weaken_foes",
    rewardDesc: "淨化邪能（敵方全體受 2d6 光耀反噬＋妖火標記）",
  },
  ship_deck: {
    templateKey: "barricade",
    name: "船長室補給與船舵機關",
    objectiveType: "activate",
    actionLabel: "奪回船舵",
    skillName: "運動/巧手",
    skillStat: "dex",
    dc: 12,
    rewardEffect: "heal_party",
    rewardDesc: "穩住船身鼓舞士氣（全隊 +6 HP 並獲得祝福術）",
  },
  volcanic_forge: {
    templateKey: "altar",
    name: "地脈熔爐壓閥",
    objectiveType: "activate",
    actionLabel: "開啟熔閥",
    skillName: "運動",
    skillStat: "str",
    dc: 12,
    rewardEffect: "shockwave",
    rewardDesc: "釋放高溫氣浪（敵方全體受 2d6 傷害並倒地）",
  },
  desert_canyon: {
    templateKey: "camp_chest",
    name: "商隊遺留補給箱",
    objectiveType: "loot",
    actionLabel: "撬開補給",
    skillName: "巧手",
    skillStat: "dex",
    dc: 11,
    rewardEffect: "grant_potion",
    rewardDesc: "搜出治療藥水 +1 與易燃火油",
  },
  coral_underwater: {
    templateKey: "rune_well",
    name: "潮汐海神祭壇",
    objectiveType: "dispel",
    actionLabel: "祈喚潮汐",
    skillName: "自然/奧秘",
    skillStat: "wis",
    dc: 12,
    rewardEffect: "weaken_foes",
    rewardDesc: "引動水壓反噬（敵方全體受 2d6 傷害＋妖火標記）",
  },
  mountain_cliff: {
    templateKey: "barricade",
    name: "崖邊落石機關",
    objectiveType: "activate",
    actionLabel: "推落巨岩",
    skillName: "運動",
    skillStat: "str",
    dc: 12,
    rewardEffect: "shockwave",
    rewardDesc: "引發小型崩石（敵方全體受 2d6 傷害並倒地）",
  },
  castle_throne: {
    templateKey: "gothic_altar",
    name: "王室結界法陣",
    objectiveType: "dispel",
    actionLabel: "解除法陣",
    skillName: "奧秘",
    skillStat: "int",
    dc: 13,
    rewardEffect: "weaken_foes",
    rewardDesc: "破除防禦法陣（敵方全體受 2d6 反噬＋妖火標記）",
  },
  urban_alley: {
    templateKey: "market_stall",
    name: "煉金師街頭貨攤",
    objectiveType: "loot",
    actionLabel: "搜刮藥櫃",
    skillName: "巧手",
    skillStat: "dex",
    dc: 11,
    rewardEffect: "grant_potion",
    rewardDesc: "取得治療藥水 +1 與街頭燃燒油瓶",
  },
  swamp_ruins: {
    templateKey: "jungle_altar",
    name: "腐沼淨化圖騰",
    objectiveType: "dispel",
    actionLabel: "淨化毒霧",
    skillName: "自然/醫療",
    skillStat: "wis",
    dc: 12,
    rewardEffect: "heal_party",
    rewardDesc: "驅散沼氣（全隊 +6 HP 並獲得祝福術）",
  },
};

const imgMetaByUrl = new Map();
for (const item of LEGO_PROPS_CATALOG) {
  const sizeKey = `${item.size || "md"}|${item.gridSize || "1x1"}`;
  const spec = PROP_SIZE_SPEC[sizeKey] || PROP_SIZE_SPEC["md|1x1"];
  imgMetaByUrl.set(item.imgIntact, { size: item.size, gridSize: item.gridSize, ...spec });
  if (!PROP_TEMPLATES[item.id]) {
    const flammable = ["camp", "tavern", "market", "town", "nature", "craft", "church"].includes(item.category);
    PROP_TEMPLATES[item.id] = {
      kind: item.category || "prop",
      name: item.name,
      hp: spec.hp,
      blocksMove: true,
      providesCover: true,
      flammable,
      size: item.size || "md",
      gridSize: item.gridSize || "1x1",
      scaleW: spec.scaleW,
      scaleH: spec.scaleH,
      uses: item.uses || "",
      imgIntact: item.imgIntact,
      imgBroken: item.imgBroken,
    };
  }
}

for (const tpl of Object.values(PROP_TEMPLATES)) {
  if (!tpl.scaleH) {
    const meta = imgMetaByUrl.get(tpl.imgIntact) || { size: "md", gridSize: "1x1", ...PROP_SIZE_SPEC["md|1x1"] };
    tpl.size = meta.size;
    tpl.gridSize = meta.gridSize;
    tpl.scaleW = meta.scaleW;
    tpl.scaleH = meta.scaleH;
  }
}

function hasOpenClearanceAround(grid, x, y, reservedSet) {
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx;
    const ny = y + dy;
    if (!inMapBounds(nx, ny)) return false;
    if (!isBaseTileWalkable(grid[ny][nx])) return false;
    if (reservedSet.has(`${nx},${ny}`)) return false;
  }
  return true;
}

export function pickScenarioPropKey(rng, scenarioId, grid, x, y, reservedSet = new Set()) {
  const cats = SCENARIO_PROP_CATEGORIES[scenarioId] || ["dungeon", "camp"];
  const allowLarge = hasOpenClearanceAround(grid, x, y, reservedSet);
  const pool = LEGO_PROPS_CATALOG.filter((it) => {
    if (!cats.includes(it.category)) return false;
    if (!allowLarge && (it.gridSize !== "1x1" || it.size === "xl" || it.size === "lg")) return false;
    return true;
  });
  if (pool.length === 0) return "barricade";
  return pool[Math.floor(rng() * pool.length)].id;
}

export function mulberry32(seed) {
  let a = (Number(seed) >>> 0) || 1;
  return function nextRand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function inMapBounds(x, y) {
  return x >= 0 && y >= 0 && x < MAP_COLS && y < MAP_ROWS;
}

export function isBaseTileWalkable(tile) {
  if (!tile) return false;
  return tile.type !== "wall" && tile.type !== "stalagmite" && tile.type !== "chasm";
}

function makeProp(templateKey, id, x, y) {
  const tpl = PROP_TEMPLATES[templateKey] || PROP_TEMPLATES.barricade;
  return {
    id,
    kind: tpl.kind,
    name: tpl.name,
    x,
    y,
    hp: tpl.hp,
    maxHp: tpl.hp,
    broken: false,
    blocksMove: tpl.blocksMove,
    providesCover: tpl.providesCover,
    flammable: tpl.flammable,
    size: tpl.size || "md",
    gridSize: tpl.gridSize || "1x1",
    scaleW: tpl.scaleW || 0.96,
    scaleH: tpl.scaleH || 0.96,
    uses: tpl.uses || (tpl.providesCover ? "提供半掩護 AC+2，可擊碎或近身利用" : "場地互動物件"),
    imgIntact: tpl.imgIntact,
    imgBroken: tpl.imgBroken,
  };
}

function createPropLookup(props) {
  const map = new Map();
  for (const p of props || []) {
    if (!p.broken && p.blocksMove) {
      map.set(`${p.x},${p.y}`, p);
    }
  }
  return map;
}

function resolveDynamicFormations(grid, props, heroSpawns, foeSpawns, bp, rng) {
  const heroForm = bp?.heroFormation || "auto";
  const foeForm = bp?.foeFormation || "auto";
  if ((heroForm === "auto" || heroForm === "left") && (foeForm === "auto" || foeForm === "right")) {
    return { heroSpawns, foeSpawns };
  }

  const propMap = createPropLookup(props);
  const safeCells = [];
  for (let y = 1; y < MAP_ROWS - 1; y++) {
    for (let x = 1; x < MAP_COLS - 1; x++) {
      const t = grid[y]?.[x];
      if (!isBaseTileWalkable(t)) continue;
      if (t.type === "water" || t.surface === "water" || t.surface === "fire" || t.surface === "lava") continue;
      if (propMap.has(`${x},${y}`)) continue;
      safeCells.push({ x, y, h: t.h || 1 });
    }
  }
  if (safeCells.length < 8) return { heroSpawns, foeSpawns };

  const pickByScore = (pool, count, scoreFn, minDist = 1, excludeSet = new Set(), existing = []) => {
    const picked = [...existing];
    const used = new Set(excludeSet);
    for (const p of picked) used.add(`${p.x},${p.y}`);
    const ranked = [...pool]
      .filter((c) => !used.has(`${c.x},${c.y}`))
      .sort((a, b) => scoreFn(b) - scoreFn(a) + (rng() - 0.5) * 0.4);

    for (const c of ranked) {
      if (picked.length >= count) break;
      if (minDist > 1 && picked.some((p) => Math.abs(p.x - c.x) + Math.abs(p.y - c.y) < minDist)) continue;
      picked.push({ x: c.x, y: c.y });
      used.add(`${c.x},${c.y}`);
    }
    for (const c of ranked) {
      if (picked.length >= count) break;
      if (used.has(`${c.x},${c.y}`)) continue;
      picked.push({ x: c.x, y: c.y });
      used.add(`${c.x},${c.y}`);
    }
    return picked;
  };

  let nextHeroSpawns = heroSpawns;
  const cx = (MAP_COLS - 1) / 2;
  const cy = (MAP_ROWS - 1) / 2;

  if (heroForm === "bottom") {
    nextHeroSpawns = pickByScore(safeCells, 7, (c) => c.y * 3 - Math.abs(c.x - cx) * 0.6);
  } else if (heroForm === "top") {
    nextHeroSpawns = pickByScore(safeCells, 7, (c) => (MAP_ROWS - 1 - c.y) * 3 - Math.abs(c.x - cx) * 0.6);
  } else if (heroForm === "center") {
    nextHeroSpawns = pickByScore(safeCells, 7, (c) => -(Math.abs(c.x - cx) * 1.4 + Math.abs(c.y - cy) * 1.4));
  } else if (heroForm === "scattered") {
    nextHeroSpawns = pickByScore(safeCells, 7, (c) => -(c.surface === "oil" || c.surface === "poison" ? 3 : 0), 3);
  } else if (heroForm === "split") {
    const leftGroup = pickByScore(safeCells, 4, (c) => (MAP_COLS - c.x) * 1.5 - Math.abs(c.y - cy));
    const usedL = new Set(leftGroup.map((p) => `${p.x},${p.y}`));
    const rightGroup = pickByScore(safeCells, 7, (c) => c.x * 1.5 - Math.abs(c.y - cy), 1, usedL, leftGroup);
    nextHeroSpawns = rightGroup;
  }

  const heroSet = new Set(nextHeroSpawns.map((s) => `${s.x},${s.y}`));
  const farFromHeroes = (c, minD = 3) =>
    nextHeroSpawns.every((h) => Math.abs(h.x - c.x) + Math.abs(h.y - c.y) >= minD);

  const foePoolStrict = safeCells.filter((c) => !heroSet.has(`${c.x},${c.y}`) && farFromHeroes(c, 3));
  const foePool = foePoolStrict.length >= 6 ? foePoolStrict : safeCells.filter((c) => !heroSet.has(`${c.x},${c.y}`) && farFromHeroes(c, 2));
  const activeFoePool = foePool.length >= 4 ? foePool : safeCells.filter((c) => !heroSet.has(`${c.x},${c.y}`));

  let nextFoeSpawns = foeSpawns;
  if (foeForm === "top") {
    nextFoeSpawns = pickByScore(activeFoePool, 6, (c) => (MAP_ROWS - 1 - c.y) * 3 + c.h * 1.5);
  } else if (foeForm === "bottom") {
    nextFoeSpawns = pickByScore(activeFoePool, 6, (c) => c.y * 3 + c.h * 1.2);
  } else if (foeForm === "surround") {
    const hcx = nextHeroSpawns.reduce((s, h) => s + h.x, 0) / Math.max(1, nextHeroSpawns.length);
    const hcy = nextHeroSpawns.reduce((s, h) => s + h.y, 0) / Math.max(1, nextHeroSpawns.length);
    const sectors = [
      (c) => c.x < hcx && c.y <= hcy,
      (c) => c.x >= hcx && c.y <= hcy,
      (c) => c.x < hcx && c.y > hcy,
      (c) => c.x >= hcx && c.y > hcy,
    ];
    const picked = [];
    const used = new Set(heroSet);
    for (const pred of sectors) {
      const cand = activeFoePool
        .filter((c) => !used.has(`${c.x},${c.y}`) && pred(c))
        .sort((a, b) => (Math.abs(b.x - hcx) + Math.abs(b.y - hcy)) * 0.5 + b.h - ((Math.abs(a.x - hcx) + Math.abs(a.y - hcy)) * 0.5 + a.h));
      if (cand[0]) {
        picked.push({ x: cand[0].x, y: cand[0].y });
        used.add(`${cand[0].x},${cand[0].y}`);
      }
    }
    nextFoeSpawns = pickByScore(activeFoePool, 6, (c) => Math.abs(c.x - hcx) + Math.abs(c.y - hcy), 2, used, picked);
  } else if (foeForm === "flank") {
    const north = pickByScore(activeFoePool, 3, (c) => (MAP_ROWS - 1 - c.y) * 3 + c.h);
    const usedN = new Set([...heroSet, ...north.map((p) => `${p.x},${p.y}`)]);
    nextFoeSpawns = pickByScore(activeFoePool, 6, (c) => c.y * 3 + c.h, 1, usedN, north);
  } else if (foeForm === "ambush_behind") {
    const hcx = nextHeroSpawns.reduce((s, h) => s + h.x, 0) / Math.max(1, nextHeroSpawns.length);
    const behindDir = hcx <= cx ? -1 : 1;
    const behind = pickByScore(activeFoePool, 2, (c) => behindDir * (c.x - hcx) * 2.5 - Math.abs(c.y - cy) * 0.4);
    const usedB = new Set([...heroSet, ...behind.map((p) => `${p.x},${p.y}`)]);
    nextFoeSpawns = pickByScore(activeFoePool, 6, (c) => -behindDir * (c.x - hcx) * 1.5, 1, usedB, behind);
  } else if (foeForm === "scattered") {
    nextFoeSpawns = pickByScore(activeFoePool, 6, (c) => c.h * 0.8, 4);
  }

  // Preserve 2x2 Large monster clearance if any original foeSpawn had footprint === 2
  if (foeForm !== "auto" && foeForm !== "right" && foeSpawns.some((s) => s.footprint === 2) && nextFoeSpawns.length > 0) {
    const lastIdx = nextFoeSpawns.length - 1;
    const target = nextFoeSpawns[lastIdx];
    const canFit2x2 =
      inMapBounds(target.x + 1, target.y + 1) &&
      !heroSet.has(`${target.x + 1},${target.y}`) &&
      !heroSet.has(`${target.x},${target.y + 1}`) &&
      !heroSet.has(`${target.x + 1},${target.y + 1}`);
    if (canFit2x2) {
      nextFoeSpawns[lastIdx] = { ...target, footprint: 2 };
    }
  }

  return { heroSpawns: nextHeroSpawns, foeSpawns: nextFoeSpawns };
}

export function checkMapConnectivity(grid, heroSpawns, foeSpawns, props = []) {
  const propMap = createPropLookup(props);
  const start = heroSpawns[0];
  const visited = new Set();
  const queue = [start];
  visited.add(`${start.x},${start.y}`);

  while (queue.length > 0) {
    const cur = queue.shift();
    const curTile = grid[cur.y]?.[cur.x];
    if (!isBaseTileWalkable(curTile) || propMap.has(`${cur.x},${cur.y}`)) continue;

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      if (!inMapBounds(nx, ny)) continue;
      const key = `${nx},${ny}`;
      if (visited.has(key)) continue;
      const nxt = grid[ny][nx];
      if (!isBaseTileWalkable(nxt) || propMap.has(key)) continue;
      if (Math.abs(nxt.h - curTile.h) > 1) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny });
    }
  }

  const allTargets = [...heroSpawns, ...foeSpawns];
  const connected = allTargets.every((sp) => visited.has(`${sp.x},${sp.y}`));
  return {
    connected,
    reachableCount: visited.size,
    visited,
  };
}

function carveRampPath(grid, fromPt, toPt, props) {
  let cx = fromPt.x;
  let cy = fromPt.y;
  let prevH = grid[cy][cx].h;
  const blockedProps = new Map((props || []).map((p) => [`${p.x},${p.y}`, p]));

  while (cx !== toPt.x || cy !== toPt.y) {
    if (cx !== toPt.x) cx += cx < toPt.x ? 1 : -1;
    else if (cy !== toPt.y) cy += cy < toPt.y ? 1 : -1;
    const tile = grid[cy][cx];
    if (!isBaseTileWalkable(tile)) {
      tile.type = "floor";
      tile.h = prevH;
      tile.surface = "none";
    }
    const blockingProp = blockedProps.get(`${cx},${cy}`);
    if (blockingProp) {
      blockingProp.blocksMove = false;
      blockingProp.broken = true;
    }
    const diff = tile.h - prevH;
    if (Math.abs(diff) > 1) {
      tile.h = prevH + Math.sign(diff);
      if (tile.h >= 3) tile.type = "ledge";
      else if (tile.type === "water" && tile.h >= 1) tile.type = "floor";
    }
    prevH = tile.h;
  }
}

export function refreshMapDerivedFlags(grid, props = []) {
  const intactProps = (props || []).filter((p) => !p.broken);
  const blockingPropMap = new Map();
  for (const p of intactProps) {
    if (p.blocksMove) blockingPropMap.set(`${p.x},${p.y}`, p);
  }

  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      const tile = grid[y][x];
      const prop = blockingPropMap.get(`${x},${y}`);
      tile.walkable = isBaseTileWalkable(tile) && !prop;
      tile.blocksLos = tile.type === "wall" || tile.type === "stalagmite" || !!(prop && prop.providesCover);
      tile.cover = false;

      if (!tile.walkable) continue;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        if (!inMapBounds(nx, ny)) continue;
        const nt = grid[ny][nx];
        const np = blockingPropMap.get(`${nx},${ny}`);
        if (nt.type === "stalagmite" || (np && np.providesCover)) {
          tile.cover = true;
          break;
        }
      }
    }
  }
}

function ensureFlat2x2Pad(grid, originX, originY, h = 1, props = []) {
  for (let dy = 0; dy <= 1; dy++) {
    for (let dx = 0; dx <= 1; dx++) {
      const x = originX + dx;
      const y = originY + dy;
      if (!inMapBounds(x, y)) continue;
      const tile = grid[y][x];
      tile.type = "floor";
      tile.h = h;
      tile.surface = "none";
      const propIdx = props.findIndex((p) => p.x === x && p.y === y);
      if (propIdx !== -1) props.splice(propIdx, 1);
    }
  }
}

export function generateVoxelMap(scenarioId = "cave_ambush", seed = 101, partyLevel = 3, envOverrides = {}) {
  const scenario =
    TACTICAL3D_SCENARIOS.find((s) => s.id === scenarioId) || TACTICAL3D_SCENARIOS[0];
  const rng = mulberry32(seed);

  const grid = Array.from({ length: MAP_ROWS }, (_, y) =>
    Array.from({ length: MAP_COLS }, (_, x) => ({
      x,
      y,
      type: "wall",
      h: 4 + ((Math.floor(rng() * 3) + x + y) % 3),
      surface: "none",
      surfaceRounds: 0,
      walkable: false,
      cover: false,
      blocksLos: true,
    }))
  );

  const setTile = (x, y, type = "floor", h = 1, surface = "none") => {
    if (!inMapBounds(x, y)) return;
    const t = grid[y][x];
    t.type = type;
    t.h = h;
    t.surface = surface;
  };

  let heroSpawns = [
    { x: 2, y: 5 },
    { x: 2, y: 6 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
  ];
  let foeSpawns = [
    { x: 10, y: 5 },
    { x: 12, y: 2 },
    { x: 12, y: 6 },
    { x: 13, y: 5 },
  ];
  const props = [];
  const bp = envOverrides?.blueprint || null;
  let tabletopBackdrop = null;
  let buildings = null;
  let scenicProps = null;
  let mapLights = null;
  let halfBlocks = null;
  const isProceduralScenario = TACTICAL3D_SCENARIOS.some((s) => s.id === scenarioId);
  const rawTabletopId = bp?.tabletopMapId || (!isProceduralScenario && TABLETOP_MAPS_CATALOG[scenarioId] ? scenarioId : null);
  const tabletopId = rawTabletopId ? TABLETOP_MAP_ALIASES[rawTabletopId] || rawTabletopId : null;
  const tabletopEntry = tabletopId ? TABLETOP_MAPS_CATALOG[tabletopId] || TABLETOP_MAPS_CATALOG[rawTabletopId] : null;

  if (tabletopId === "harbour_fort" && bp?.layout !== "twin_ships") {
    // 1:1 3D HD-2D voxel terrain layout of harbour_fort (using unified 3D voxel textures)
    for (let y = 0; y < MAP_ROWS; y++) {
      for (let x = 0; x < MAP_COLS; x++) {
        setTile(x, y, "floor", 1, "none");
      }
    }
    // Harbor water basins (top-left & top-center)
    for (let y = 0; y <= 4; y++) {
      for (let x = 1; x <= 4; x++) setTile(x, y, "water", 0, "water");
    }
    for (let y = 0; y <= 2; y++) {
      for (let x = 6; x <= 8; x++) setTile(x, y, "water", 0, "water");
      for (let x = 10; x <= 13; x++) setTile(x, y, "water", 0, "water");
    }
    // Wooden piers / jetties (h=1 bridges)
    for (let y = 0; y <= 5; y++) setTile(0, y, "bridge", 1, "none");
    for (let y = 0; y <= 3; y++) {
      setTile(5, y, "bridge", 1, "none");
      setTile(9, y, "bridge", 1, "none");
      setTile(14, y, "bridge", 1, "none");
      setTile(15, y, "bridge", 1, "none");
    }
    // Dockside wooden boardwalk (left-mid)
    for (let y = 5; y <= 7; y++) {
      for (let x = 0; x <= 5; x++) setTile(x, y, "floor", 1, "none");
    }
    // Raised stone quay terrace (h=2) + stairs
    for (let y = 3; y <= 5; y++) {
      for (let x = 6; x <= 9; x++) setTile(x, y, "ledge", 2, "none");
    }
    setTile(12, 3, "ledge", 1.5, "none"); // Quay steps
    // Harbor Warehouse walls (x:10..13, y:5..10) with west doorway at (10,7)
    for (let y = 5; y <= 10; y++) {
      for (let x = 10; x <= 13; x++) {
        const isBorder = x === 10 || x === 13 || y === 5 || y === 10;
        if (isBorder && !(x === 10 && y === 7)) {
          setTile(x, y, "wall", 3, "none");
        } else {
          setTile(x, y, "floor", 1, "none");
        }
      }
    }
    // Bastion Watchhouse (x:0..3, y:9..11) with north doorway at (2,9)
    for (let y = 9; y <= 11; y++) {
      for (let x = 0; x <= 3; x++) {
        const isBorder = x === 0 || x === 3 || y === 9 || y === 11;
        if (isBorder && !(x === 2 && y === 9)) {
          setTile(x, y, "wall", 3, "none");
        } else {
          setTile(x, y, "floor", 1, "none");
        }
      }
    }
    // Interactive tactical props on piers, quay & warehouse
    props.push(
      makeProp("oil_barrel", "hf_oil_pier", 5, 4),
      makeProp("crate", "hf_crate_quay", 8, 5),
      makeProp("crate", "hf_crate_road", 6, 8),
      makeProp("barricade", "hf_barricade_west", 4, 7),
      makeProp("chest", "hf_chest_warehouse", 12, 8)
    );
    // Dense 2D HD-2D decorative scenery components (non-blocking visual richness)
    scenicProps = [
      { id: "sc_pier_crate_1", name: "碼頭貨箱", x: 0.1, y: 1.5, img: "/prototype-assets/lego-props-v2/components/prop_009_03_s0.png", scaleW: 0.72, scaleH: 0.72, h: 1 },
      { id: "sc_pier_crate_2", name: "碼頭木桶", x: 5.1, y: 1.6, img: "/prototype-assets/lego-props-v2/components/prop_011_01_s0.png", scaleW: 0.68, scaleH: 0.68, h: 1 },
      { id: "sc_pier_crate_3", name: "棧橋補給箱", x: 9.1, y: 1.4, img: "/prototype-assets/lego-props-v2/components/prop_014_03_s0.png", scaleW: 0.7, scaleH: 0.7, h: 1 },
      { id: "sc_pier_crate_4", name: "東側泊位木箱", x: 14.3, y: 1.8, img: "/prototype-assets/lego-props-v2/components/prop_016_01_s0.png", scaleW: 0.75, scaleH: 0.75, h: 1 },
      { id: "sc_quay_banner_1", name: "港口藍旗", x: 6.1, y: 5.4, img: "/prototype-assets/lego-props-v2/components/prop_003_02_s0.png", scaleW: 0.7, scaleH: 0.95, h: 2 },
      { id: "sc_quay_banner_2", name: "石堡旗幟", x: 6.1, y: 8.6, img: "/prototype-assets/lego-props-v2/components/prop_003_02_s0.png", scaleW: 0.7, scaleH: 0.95, h: 1 },
      { id: "sc_warehouse_table", name: "倉屋工作台", x: 11.5, y: 6.3, img: "/prototype-assets/lego-props-v2/components/prop_006_02_s0.png", scaleW: 0.9, scaleH: 0.85, h: 1 },
      { id: "sc_warehouse_goods", name: "倉屋囤貨", x: 12.1, y: 9.1, img: "/prototype-assets/lego-props-v2/components/prop_019_03_s0.png", scaleW: 0.8, scaleH: 0.8, h: 1 },
      { id: "sc_bastion_table", name: "哨所桌椅", x: 1.4, y: 10.2, img: "/prototype-assets/lego-props-v2/components/prop_006_02_s0.png", scaleW: 0.85, scaleH: 0.8, h: 1 },
      { id: "sc_road_lantern_1", name: "碼頭火把", x: 7.2, y: 6.2, img: "/prototype-assets/lego-props-v2/components/prop_002_01_s0.png", scaleW: 0.6, scaleH: 0.85, h: 1 },
      { id: "sc_road_lantern_2", name: "倉屋門燈", x: 9.7, y: 6.4, img: "/prototype-assets/lego-props-v2/components/prop_002_01_s0.png", scaleW: 0.6, scaleH: 0.85, h: 1 },
      { id: "sc_quay_lantern", name: "石台燈柱", x: 9.2, y: 3.3, img: "/prototype-assets/lego-props-v2/components/prop_002_01_s0.png", scaleW: 0.6, scaleH: 0.85, h: 2 },
      { id: "sc_dock_chest", name: "棧橋工具箱", x: 1.5, y: 6.3, img: "/prototype-assets/lego-props-v2/components/prop_021_01_s0.png", scaleW: 0.72, scaleH: 0.72, h: 1 },
      { id: "sc_east_dock_barrel", name: "漁獲木桶", x: 14.5, y: 4.2, img: "/prototype-assets/lego-props-v2/components/prop_024_03_s0.png", scaleW: 0.72, scaleH: 0.72, h: 1 },
    ];
    // 3D Architectural Buildings (15ft = 3-unit tall solid exterior cubes) & Harbor Crane
    buildings = [
      {
        id: "hf_warehouse",
        kind: "house",
        solid: true,
        name: "港邊倉屋",
        x1: 10,
        y1: 5,
        x2: 13,
        y2: 10,
        wallHeight: 1.65,
        roofColor: 0x3b4d63,
        wallColor: 0x7c583c,
      },
      {
        id: "hf_bastion",
        kind: "house",
        solid: true,
        name: "港邊石堡哨所",
        x1: 0,
        y1: 9,
        x2: 3,
        y2: 11,
        wallHeight: 1.65,
        roofColor: 0x475569,
        wallColor: 0x64748b,
      },
      {
        id: "hf_crane",
        kind: "crane",
        name: "港口木吊臂",
        x: 7,
        y: 4,
        baseH: 2,
        targetX: 3.2,
        targetY: 3.3,
      },
    ];
    // 1/2-width thin parapets, pier posts & dockside half-blocks
    halfBlocks = [
      { x: 6, y: 3, h: 2, w: 0.96, d: 0.24, dx: 0, dz: -0.36, height: 0.42, color: 0xcbd5e1 },
      { x: 8, y: 3, h: 2, w: 0.96, d: 0.24, dx: 0, dz: -0.36, height: 0.42, color: 0xcbd5e1 },
      { x: 9, y: 3, h: 2, w: 0.96, d: 0.24, dx: 0, dz: -0.36, height: 0.42, color: 0xcbd5e1 },
      { x: 6, y: 4, h: 2, w: 0.24, d: 0.96, dx: -0.36, dz: 0, height: 0.42, color: 0xcbd5e1 },
      { x: 6, y: 5, h: 2, w: 0.24, d: 0.96, dx: -0.36, dz: 0, height: 0.42, color: 0xcbd5e1 },
      { x: 0, y: 5, h: 1, w: 0.46, d: 0.46, dx: -0.25, dz: -0.25, height: 0.55, color: 0x7c583c },
      { x: 5, y: 3, h: 1, w: 0.46, d: 0.46, dx: 0.25, dz: 0.25, height: 0.55, color: 0x7c583c },
      { x: 9, y: 3, h: 1, w: 0.46, d: 0.46, dx: -0.25, dz: 0.25, height: 0.55, color: 0x7c583c },
    ];
    mapLights = [
      { x: 7.2, y: 6.2, h: 1.4, color: 0xff9d47, intensity: 2.2, distance: 6.5 },
      { x: 9.7, y: 6.4, h: 1.4, color: 0xff9d47, intensity: 2.1, distance: 6.0 },
      { x: 9.2, y: 3.3, h: 1.9, color: 0xfbbf24, intensity: 2.0, distance: 6.0 },
      { x: 2.0, y: 8.6, h: 1.4, color: 0x38bdf8, intensity: 1.5, distance: 5.5 },
    ];
    heroSpawns = [
      { x: 7, y: 9 },
      { x: 8, y: 9 },
      { x: 9, y: 9 },
      { x: 7, y: 10 },
      { x: 8, y: 10 },
    ];
    foeSpawns = [
      { x: 0, y: 4 },
      { x: 5, y: 2 },
      { x: 9, y: 2 },
      { x: 3, y: 6 },
      { x: 14, y: 2 },
      { x: 7, y: 4 },
    ];
  } else if (tabletopEntry && bp?.layout !== "twin_ships") {
    // Universal 80% Skeleton Converter: tabletop layout -> unified 3D voxel + 15ft solid buildings + 1/2-width walls
    const isWaterBiome = /harbour|ship|pier|river|sewer|marsh|lake|sea|bridge|island|swamp|dock|cove/i.test(
      tabletopEntry.id
    );

    let maskAt = () => 0;
    if (tabletopEntry.bitmask && typeof atob === "function") {
      try {
        const raw = atob(tabletopEntry.bitmask);
        const bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
        maskAt = (mx, my) => {
          const idx = my * 48 + mx;
          return (bytes[idx >> 3] >> (7 - (idx & 7))) & 1;
        };
      } catch {
        maskAt = () => 0;
      }
    }

    for (let y = 0; y < MAP_ROWS; y++) {
      for (let x = 0; x < MAP_COLS; x++) {
        let hits = 0;
        for (let sy = 0; sy < 2; sy++) {
          for (let sx = 0; sx < 3; sx++) {
            const mx = Math.min(47, Math.floor((x / MAP_COLS) * 48) + sx);
            const my = Math.min(31, Math.floor((y / MAP_ROWS) * 32) + sy);
            if (maskAt(mx, my)) hits++;
          }
        }
        if (hits >= 4) {
          setTile(x, y, isWaterBiome ? "water" : "wall", isWaterBiome ? 0 : 3, isWaterBiome ? "water" : "none");
        } else {
          setTile(x, y, "floor", 1, "none");
        }
      }
    }

    const blocks = tabletopEntry.ground?.block || [];
    buildings = [];
    halfBlocks = [];
    blocks.forEach((rect, idx) => {
      if (!Array.isArray(rect) || rect.length < 4) return;
      const [x1p, y1p, x2p, y2p] = rect;
      const bx1 = Math.max(0, Math.min(MAP_COLS - 1, Math.floor((x1p / 100) * MAP_COLS)));
      const by1 = Math.max(0, Math.min(MAP_ROWS - 1, Math.floor((y1p / 100) * MAP_ROWS)));
      const bx2 = Math.max(bx1, Math.min(MAP_COLS - 1, Math.ceil((x2p / 100) * MAP_COLS) - 1));
      const by2 = Math.max(by1, Math.min(MAP_ROWS - 1, Math.ceil((y2p / 100) * MAP_ROWS) - 1));
      const bw = bx2 - bx1 + 1;
      const bd = by2 - by1 + 1;
      if (bw <= 1 && bd <= 1) {
        halfBlocks.push({
          x: bx1,
          y: by1,
          h: 1,
          w: 0.48,
          d: 0.48,
          dx: 0,
          dz: 0,
          height: 0.85,
          color: 0x64748b,
        });
        return;
      }
      for (let py = by1; py <= by2; py++) {
        for (let px = bx1; px <= bx2; px++) {
          setTile(px, py, "wall", 3, "none");
        }
      }
      buildings.push({
        id: `${tabletopEntry.id}_bldg_${idx}`,
        kind: "house",
        solid: true,
        name: "建築量體",
        x1: bx1,
        y1: by1,
        x2: bx2,
        y2: by2,
        wallHeight: 1.65,
        roofColor: idx % 2 === 0 ? 0x3b4d63 : 0x574c41,
        wallColor: 0x64748b,
      });
    });

    for (const rect of tabletopEntry.ground?.clear || []) {
      if (!Array.isArray(rect) || rect.length < 4) continue;
      const [x1p, y1p, x2p, y2p] = rect;
      const cx1 = Math.max(0, Math.floor((x1p / 100) * MAP_COLS));
      const cy1 = Math.max(0, Math.floor((y1p / 100) * MAP_ROWS));
      const cx2 = Math.min(MAP_COLS - 1, Math.ceil((x2p / 100) * MAP_COLS) - 1);
      const cy2 = Math.min(MAP_ROWS - 1, Math.ceil((y2p / 100) * MAP_ROWS) - 1);
      for (let py = cy1; py <= cy2; py++) {
        for (let px = cx1; px <= cx2; px++) {
          setTile(px, py, "floor", 1, "none");
        }
      }
    }

    for (let y = 1; y < MAP_ROWS - 1; y++) {
      for (let x = 1; x < MAP_COLS - 1; x++) {
        if (grid[y][x].type !== "floor") continue;
        if (grid[y - 1]?.[x]?.type === "wall" && (x + y) % 3 === 0) {
          halfBlocks.push({ x, y, h: 1, w: 0.96, d: 0.22, dx: 0, dz: -0.38, height: 0.45, color: 0x94a3b8 });
        }
      }
    }

    const spotCells = (tabletopEntry.spots || [])
      .map((sp) => ({
        label: String(sp[0] || ""),
        x: Math.max(1, Math.min(MAP_COLS - 2, Math.round((sp[1] / 100) * (MAP_COLS - 1)))),
        y: Math.max(1, Math.min(MAP_ROWS - 2, Math.round((sp[2] / 100) * (MAP_ROWS - 1)))),
      }))
      .filter((s) => grid[s.y]?.[s.x]?.type === "floor");

    const entrySpot = spotCells.find((s) => /入口|門|南|下/.test(s.label)) || spotCells[0] || { x: 4, y: 9 };
    const deepSpot = spotCells.find((s) => /深處|中央|台|祭壇/.test(s.label)) || spotCells[spotCells.length - 1] || { x: 11, y: 3 };

    const collectNearbyFloor = (cx, cy, count) => {
      const out = [];
      for (let r = 0; r <= 5 && out.length < count; r++) {
        for (let dy = -r; dy <= r && out.length < count; dy++) {
          for (let dx = -r; dx <= r && out.length < count; dx++) {
            const tx = cx + dx;
            const ty = cy + dy;
            if (!inMapBounds(tx, ty)) continue;
            if (grid[ty][tx].type === "floor" && !out.some((o) => o.x === tx && o.y === ty)) {
              out.push({ x: tx, y: ty });
            }
          }
        }
      }
      return out;
    };

    const hCand = collectNearbyFloor(entrySpot.x, entrySpot.y, 5);
    if (hCand.length >= 4) heroSpawns = hCand;
    const fCand = collectNearbyFloor(deepSpot.x, deepSpot.y, 6).filter(
      (c) => !heroSpawns.some((h) => h.x === c.x && h.y === c.y)
    );
    if (fCand.length >= 4) foeSpawns = fCand;
  } else if (bp?.layout === "twin_ships") {
    // Two ships on open ocean connected by twin wooden boarding planks
    for (let y = 0; y < MAP_ROWS; y++) {
      for (let x = 0; x < MAP_COLS; x++) {
        setTile(x, y, "water", 0, "water");
      }
    }
    for (let y = 2; y <= 9; y++) {
      for (let x = 1; x <= 5; x++) setTile(x, y, x === 1 ? "ledge" : "bridge", x === 1 ? 2 : 1);
      for (let x = 10; x <= 14; x++) setTile(x, y, x === 14 ? "ledge" : "bridge", x === 14 ? 2 : 1);
    }
    // Twin wooden boarding planks across the sea
    for (let x = 6; x <= 9; x++) {
      setTile(x, 4, "bridge", 1);
      setTile(x, 7, "bridge", 1);
    }
    props.push(makeProp("barricade", "prop_ts_1", 4, 5));
    props.push(makeProp("camp_chest", "prop_ts_2", 11, 5));
    heroSpawns = [{ x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 }, { x: 3, y: 5 }];
    foeSpawns = [{ x: 11, y: 4 }, { x: 11, y: 7 }, { x: 12, y: 5 }, { x: 13, y: 6 }];
  } else if (bp?.layout === "cliff_and_sea") {
    // North cliff wall (h=3), middle coastal road (h=1-2), south open sea (h=0)
    for (let y = 0; y < MAP_ROWS; y++) {
      for (let x = 0; x < MAP_COLS; x++) {
        if (y >= 8) setTile(x, y, "water", 0, "water");
        else if (y >= 1 && y <= 2 && x >= 1 && x <= 14) setTile(x, y, "ledge", 3);
        else if (y === 3 && x >= 1 && x <= 14) setTile(x, y, "floor", 2);
        else if (y >= 4 && y <= 7 && x >= 1 && x <= 14) setTile(x, y, "floor", 1);
      }
    }
    props.push(makeProp("barricade", "prop_cs_1", 6, 5));
    props.push(makeProp("camp_chest", "prop_cs_2", 10, 6));
    heroSpawns = [{ x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 3, y: 5 }];
    foeSpawns = [{ x: 10, y: 3 }, { x: 11, y: 5 }, { x: 12, y: 6 }, { x: 13, y: 4 }];
  } else if (scenario.id === "cave_ambush") {
    const jitter = rng() > 0.5 ? 1 : 0;
    // West entrance corridor flanked on top & bottom by high cavern rock walls
    for (let x = 1; x <= 5; x++) {
      setTile(x, 5, "floor", 1);
      setTile(x, 6, "floor", 1);
      if (x === 4 || (jitter && x === 3)) setTile(x, 7, "floor", 1);
    }
    // Mid cavern ambush widening with cover & oil trap
    for (let x = 6; x <= 10; x++) {
      for (let y = 4; y <= 7; y++) {
        setTile(x, y, "floor", 1);
      }
      if (x >= 7 && x <= 10) setTile(x, 3, "floor", 2);
    }
    // Elevated goblin archer ledge connected by ramps
    setTile(10, 2, "floor", 2);
    setTile(11, 2, "ledge", 3);
    setTile(12, 2, "ledge", 3);
    setTile(13, 2, "ledge", 3);
    setTile(12, 3, "floor", 2);
    setTile(13, 3, "floor", 2);

    // East cavern pocket
    for (let x = 10; x <= 14; x++) {
      setTile(x, 4, "floor", 1);
      setTile(x, 5, "floor", 1);
      setTile(x, 6, "floor", 1);
    }

    // Terrain features: stalagmites, brazier, crystal, oil patch
    setTile(7, 5, "stalagmite", 3);
    setTile(8, 6, "brazier", 1, "fire");
    setTile(5, 4, "crystal", 1);
    setTile(6, 7, "floor", 1, "oil");
    setTile(7, 7, "floor", 1, "oil");
    setTile(9, 4, "floor", 1, "water");

    props.push(makeProp("barricade", "prop_bar_1", 6, 4));
    props.push(makeProp("barricade", "prop_bar_2", 10, 6));

    heroSpawns = [
      { x: 2, y: 5 },
      { x: 2, y: 6 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
    ];
    foeSpawns = [
      { x: 9, y: 5 },
      { x: 12, y: 2 },
      { x: 12, y: 5 },
      { x: 13, y: 6 },
    ];
  } else if (scenario.id === "underground_river") {
    // River channel across x = 7..8
    for (let y = 2; y <= 9; y++) {
      setTile(7, y, "water", 0, "water");
      setTile(8, y, "water", 0, "water");
    }
    // West bank corridor
    for (let x = 1; x <= 6; x++) {
      setTile(x, 5, "floor", 1);
      setTile(x, 6, "floor", 1);
      if (x >= 4) {
        setTile(x, 4, "floor", 1);
        setTile(x, 7, "floor", 1);
      }
    }
    // Central stone bridge (h=1) spanning water
    setTile(7, 5, "bridge", 1, "none");
    setTile(8, 5, "bridge", 1, "none");
    // Secondary rocky ford at y=8
    setTile(6, 8, "floor", 1);
    setTile(7, 8, "water", 0, "water");
    setTile(8, 8, "water", 0, "water");
    setTile(9, 8, "floor", 1);

    // East bank with stepped terrace + high ground
    for (let x = 9; x <= 14; x++) {
      for (let y = 4; y <= 7; y++) {
        setTile(x, y, "floor", 1);
      }
      if (x >= 10 && x <= 13) setTile(x, 3, "floor", 2);
    }
    setTile(12, 2, "ledge", 3);
    setTile(13, 2, "ledge", 3);
    setTile(14, 2, "ledge", 3);
    setTile(13, 3, "floor", 2);

    setTile(5, 4, "stalagmite", 3);
    setTile(10, 6, "stalagmite", 3);
    setTile(6, 4, "crystal", 1);
    setTile(11, 4, "brazier", 1, "fire");
    if (rng() > 0.35) setTile(10, 7, "floor", 1, "oil");

    props.push(makeProp("jungle_barricade", "prop_riv_1", 9, 5));
    props.push(makeProp("rune_well", "prop_riv_2", 12, 7));

    heroSpawns = [
      { x: 3, y: 5 },
      { x: 3, y: 6 },
      { x: 2, y: 5 },
      { x: 2, y: 6 },
    ];
    foeSpawns = [
      { x: 13, y: 2 },
      { x: 10, y: 5 },
      { x: 12, y: 5 },
      { x: 11, y: 7 },
    ];
  } else if (scenario.id === "chasm_sanctum") {
    // West entry corridor
    for (let x = 1; x <= 4; x++) {
      setTile(x, 5, "floor", 1);
      setTile(x, 6, "floor", 1);
    }
    // Central abyssal chasm (x = 5..8, y = 5..6)
    for (let x = 5; x <= 8; x++) {
      setTile(x, 5, "chasm", 0);
      setTile(x, 6, "chasm", 0);
    }
    // Upper stone walkway + sanctum ridge
    setTile(4, 4, "floor", 1);
    setTile(5, 3, "floor", 2);
    setTile(5, 4, "floor", 2);
    setTile(6, 3, "floor", 2);
    setTile(7, 3, "ledge", 3);
    setTile(8, 3, "ledge", 3);
    setTile(9, 3, "floor", 2);
    setTile(9, 4, "floor", 2);
    // Lower stone flank route
    for (let x = 4; x <= 9; x++) {
      setTile(x, 7, "floor", 1);
      setTile(x, 8, "floor", 1);
    }
    setTile(6, 8, "brazier", 1, "fire");
    setTile(5, 7, "floor", 1, "oil");
    setTile(4, 3, "crystal", 1);

    // East sanctum clearing (supports 2x2 spider queen!)
    for (let x = 9; x <= 14; x++) {
      for (let y = 4; y <= 7; y++) {
        setTile(x, y, "floor", 1);
      }
    }
    ensureFlat2x2Pad(grid, 11, 4, 1, props);

    setTile(10, 7, "crystal", 1);
    props.push(makeProp("obelisk", "prop_ch_1", 10, 4));
    props.push(makeProp("altar", "prop_ch_2", 14, 5));

    heroSpawns = [
      { x: 2, y: 5 },
      { x: 2, y: 6 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
    ];
    foeSpawns = [
      { x: 9, y: 7 },
      { x: 8, y: 3 },
      { x: 10, y: 6 },
      { x: 11, y: 4, footprint: 2 },
    ];
  } else if (scenario.id === "forest_ambush") {
    // Winding dirt road flanked by dense trees (wall) + raised rocky hillside on north
    for (let x = 1; x <= 14; x++) {
      const roadY = x < 6 ? 6 : x < 11 ? 5 : 4;
      for (let dy = -1; dy <= 1; dy++) setTile(x, roadY + dy, "floor", 1);
      if (x >= 4 && x <= 11) setTile(x, roadY - 2, "floor", 2);
    }
    setTile(7, 2, "ledge", 3);
    setTile(8, 2, "ledge", 3);
    setTile(9, 2, "ledge", 3);
    setTile(8, 3, "floor", 2);
    // Small stream crossing & camp oil trap
    setTile(5, 7, "water", 0, "water");
    setTile(6, 7, "water", 0, "water");
    setTile(9, 5, "brazier", 1, "fire");
    setTile(10, 5, "floor", 1, "oil");
    setTile(10, 6, "floor", 1, "oil");
    setTile(6, 4, "stalagmite", 3);

    props.push(makeProp("jungle_barricade", "prop_for_1", 7, 5));
    props.push(makeProp("camp_chest", "prop_for_2", 11, 3));
    props.push(makeProp("jungle_altar", "prop_for_3", 13, 5));

    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 6 }, { x: 1, y: 7 }];
    foeSpawns = [{ x: 9, y: 6 }, { x: 8, y: 2 }, { x: 12, y: 4 }, { x: 13, y: 4 }];
  } else if (scenario.id === "tavern_brawl") {
    // Open tavern hall (x=2..13, y=3..8) with raised mezzanine gallery on east & north
    for (let x = 2; x <= 13; x++) {
      for (let y = 3; y <= 8; y++) setTile(x, y, "floor", 1);
    }
    // Raised stage / mezzanine + stairs
    for (let x = 11; x <= 13; x++) {
      for (let y = 3; y <= 5; y++) setTile(x, y, "ledge", 3);
    }
    setTile(10, 4, "floor", 2);
    setTile(10, 5, "floor", 2);
    setTile(11, 6, "floor", 2);

    // Hearth fire + spilled ale/oil
    setTile(6, 3, "brazier", 1, "fire");
    setTile(7, 5, "floor", 1, "oil");
    setTile(8, 5, "floor", 1, "oil");
    setTile(5, 7, "water", 0, "water");

    props.push(makeProp("tavern_table", "prop_tav_1", 5, 5));
    props.push(makeProp("tavern_table", "prop_tav_2", 8, 6));
    props.push(makeProp("tavern_board", "prop_tav_3", 3, 3));
    props.push(makeProp("market_stall", "prop_tav_4", 9, 7));

    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 6 }];
    foeSpawns = [{ x: 9, y: 5 }, { x: 12, y: 3 }, { x: 9, y: 8 }, { x: 11, y: 7 }];
  } else if (scenario.id === "frost_citadel") {
    // Frozen approach + icy bridge + 2x2 beast courtyard
    for (let x = 1; x <= 5; x++) {
      setTile(x, 5, "floor", 1);
      setTile(x, 6, "floor", 1);
    }
    for (let y = 2; y <= 9; y++) {
      setTile(6, y, "water", 0, "water");
    }
    setTile(6, 5, "bridge", 1, "none");
    setTile(6, 6, "bridge", 1, "none");
    for (let x = 7; x <= 14; x++) {
      for (let y = 3; y <= 8; y++) setTile(x, y, "floor", 1);
    }
    setTile(9, 2, "floor", 2);
    setTile(10, 2, "ledge", 3);
    setTile(11, 2, "ledge", 3);
    setTile(10, 3, "floor", 2);
    setTile(8, 7, "stalagmite", 3);
    setTile(9, 4, "crystal", 1);
    setTile(13, 3, "brazier", 1, "fire");

    ensureFlat2x2Pad(grid, 11, 5, 1, props);
    props.push(makeProp("ice_barricade", "prop_ice_1", 8, 5));
    props.push(makeProp("ice_chest", "prop_ice_2", 10, 7));

    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 6 }];
    foeSpawns = [{ x: 9, y: 5 }, { x: 10, y: 2 }, { x: 9, y: 7 }, { x: 11, y: 5, footprint: 2 }];
  } else if (scenario.id === "haunted_crypt") {
    // Gothic nave with twin side aisles & elevated blood altar dais
    for (let x = 1; x <= 4; x++) {
      setTile(x, 5, "floor", 1);
      setTile(x, 6, "floor", 1);
    }
    for (let x = 5; x <= 13; x++) {
      for (let y = 3; y <= 8; y++) setTile(x, y, "floor", 1);
    }
    // Chasm crypt pits & raised altar dais
    setTile(7, 3, "chasm", 0);
    setTile(7, 8, "chasm", 0);
    setTile(12, 4, "floor", 2);
    setTile(12, 7, "floor", 2);
    setTile(13, 5, "ledge", 3);
    setTile(13, 6, "ledge", 3);
    setTile(12, 5, "floor", 2);
    setTile(12, 6, "floor", 2);
    setTile(6, 4, "brazier", 1, "fire");
    setTile(6, 7, "brazier", 1, "fire");
    setTile(9, 5, "floor", 1, "oil");

    props.push(makeProp("church_pew", "prop_cr_1", 5, 5));
    props.push(makeProp("church_pew", "prop_cr_2", 5, 6));
    props.push(makeProp("crypt_barricade", "prop_cr_3", 9, 4));
    props.push(makeProp("gothic_altar", "prop_cr_4", 13, 5));

    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 6 }];
    foeSpawns = [{ x: 8, y: 5 }, { x: 10, y: 7 }, { x: 12, y: 4 }, { x: 13, y: 6 }];
  } else if (scenario.id === "ship_deck") {
    // Ship/Airship deck: entire 16x12 perimeter is open sea water underneath/around the wooden hull
    for (let y = 0; y < MAP_ROWS; y++) {
      for (let x = 0; x < MAP_COLS; x++) {
        setTile(x, y, "water", 0, "water");
      }
    }
    for (let y = 3; y <= 8; y++) {
      for (let x = 2; x <= 13; x++) {
        setTile(x, y, "bridge", 1);
      }
    }
    // Raised stern & pointed bow
    for (let y = 4; y <= 7; y++) {
      setTile(1, y, "ledge", 2);
      setTile(2, y, "bridge", 2);
      setTile(13, y, "ledge", 2);
      setTile(14, y, "ledge", 2);
    }
    // Central mast high ground
    setTile(7, 5, "ledge", 3);
    setTile(8, 5, "ledge", 3);
    setTile(7, 6, "floor", 2);
    setTile(8, 6, "floor", 2);
    setTile(6, 4, "brazier", 1, "fire");
    setTile(9, 7, "floor", 1, "oil");
    props.push(makeProp("barricade", "prop_ship_1", 5, 5));
    props.push(makeProp("camp_chest", "prop_ship_2", 11, 6));
    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 4 }];
    foeSpawns = [{ x: 9, y: 5 }, { x: 11, y: 4 }, { x: 12, y: 7 }, { x: 13, y: 5 }];
  } else if (scenario.id === "volcanic_forge") {
    // Volcanic forge / Infernal temple: obsidian bridges over magma chasms + anvil high ground
    for (let y = 2; y <= 9; y++) {
      for (let x = 1; x <= 14; x++) {
        if (x <= 4 || x >= 11) setTile(x, y, "floor", 1);
        else setTile(x, y, "chasm", 0);
      }
    }
    for (let x = 5; x <= 10; x++) {
      setTile(x, 3, "bridge", 1);
      setTile(x, 6, "bridge", 1);
      setTile(x, 8, "bridge", 1);
    }
    setTile(7, 5, "ledge", 2);
    setTile(8, 5, "ledge", 2);
    setTile(7, 6, "floor", 2);
    setTile(8, 6, "floor", 2);
    setTile(6, 3, "brazier", 1, "fire");
    setTile(11, 5, "brazier", 1, "fire");
    setTile(9, 6, "floor", 2, "oil");
    ensureFlat2x2Pad(grid, 11, 5, 1, props);
    props.push(makeProp("barricade", "prop_vf_1", 4, 6));
    props.push(makeProp("altar", "prop_vf_2", 12, 3));
    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 6 }];
    foeSpawns = [{ x: 8, y: 6 }, { x: 10, y: 3 }, { x: 12, y: 8 }, { x: 11, y: 5, footprint: 2 }];
  } else if (scenario.id === "desert_canyon") {
    // Sandstone canyon & oasis pool + flanking dunes
    for (let y = 2; y <= 9; y++) {
      for (let x = 1; x <= 14; x++) {
        setTile(x, y, "floor", 1);
      }
    }
    for (let x = 4; x <= 11; x++) {
      setTile(x, 2, "ledge", 3);
      setTile(x, 9, "ledge", 3);
    }
    setTile(5, 3, "floor", 2);
    setTile(10, 3, "floor", 2);
    setTile(5, 8, "floor", 2);
    setTile(10, 8, "floor", 2);
    setTile(7, 5, "water", 0, "water");
    setTile(8, 5, "water", 0, "water");
    setTile(8, 6, "water", 0, "water");
    setTile(11, 5, "brazier", 1, "fire");
    props.push(makeProp("camp_chest", "prop_dc_1", 6, 4));
    props.push(makeProp("barricade", "prop_dc_2", 10, 6));
    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 6 }];
    foeSpawns = [{ x: 9, y: 3 }, { x: 9, y: 8 }, { x: 12, y: 5 }, { x: 13, y: 6 }];
  } else if (scenario.id === "coral_underwater") {
    // Coastal bay / sunken coral temple: shallow tide water + coral reef ledges
    for (let y = 2; y <= 9; y++) {
      for (let x = 1; x <= 14; x++) {
        const isEdge = y <= 3 || y >= 8;
        setTile(x, y, isEdge ? "floor" : (x + y) % 3 === 0 ? "water" : "floor", isEdge ? 2 : 1, isEdge ? "none" : (x + y) % 3 === 0 ? "water" : "none");
      }
    }
    setTile(7, 4, "ledge", 3);
    setTile(8, 4, "ledge", 3);
    setTile(7, 7, "crystal", 1);
    setTile(10, 5, "crystal", 1);
    props.push(makeProp("rune_well", "prop_cu_1", 6, 5));
    props.push(makeProp("jungle_altar", "prop_cu_2", 11, 4));
    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 6 }];
    foeSpawns = [{ x: 9, y: 4 }, { x: 10, y: 7 }, { x: 12, y: 5 }, { x: 13, y: 6 }];
  } else if (scenario.id === "mountain_cliff") {
    // Mountain cliffside: north high ridge (h=3), south abyssal drop, narrow plank bridges
    for (let y = 2; y <= 8; y++) {
      for (let x = 1; x <= 14; x++) {
        if (y >= 7) setTile(x, y, "chasm", 0);
        else if (y <= 3) setTile(x, y, "ledge", 3);
        else setTile(x, y, "floor", 2);
      }
    }
    setTile(6, 7, "bridge", 2);
    setTile(7, 7, "bridge", 2);
    setTile(8, 7, "floor", 2);
    setTile(9, 7, "bridge", 2);
    setTile(7, 4, "brazier", 2, "fire");
    setTile(10, 5, "floor", 2, "oil");
    props.push(makeProp("barricade", "prop_mc_1", 5, 5));
    props.push(makeProp("obelisk", "prop_mc_2", 11, 4));
    heroSpawns = [{ x: 2, y: 4 }, { x: 2, y: 5 }, { x: 1, y: 4 }, { x: 1, y: 5 }];
    foeSpawns = [{ x: 8, y: 3 }, { x: 10, y: 4 }, { x: 12, y: 5 }, { x: 13, y: 4 }];
  } else if (scenario.id === "castle_throne") {
    // Grand throne hall / academy / arena: symmetric pillars + elevated dais
    for (let y = 2; y <= 9; y++) {
      for (let x = 1; x <= 14; x++) {
        setTile(x, y, x >= 11 ? "ledge" : "floor", x >= 11 ? 2 : 1);
      }
    }
    setTile(13, 5, "ledge", 3);
    setTile(13, 6, "ledge", 3);
    setTile(5, 3, "stalagmite", 3);
    setTile(5, 8, "stalagmite", 3);
    setTile(9, 3, "stalagmite", 3);
    setTile(9, 8, "stalagmite", 3);
    setTile(7, 4, "brazier", 1, "fire");
    setTile(7, 7, "brazier", 1, "fire");
    props.push(makeProp("church_pew", "prop_ct_1", 4, 5));
    props.push(makeProp("gothic_altar", "prop_ct_2", 11, 5));
    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 6 }];
    foeSpawns = [{ x: 8, y: 5 }, { x: 10, y: 4 }, { x: 10, y: 7 }, { x: 12, y: 5 }];
  } else if (scenario.id === "urban_alley") {
    // City street & rooftop perches + market stalls
    for (let y = 2; y <= 9; y++) {
      for (let x = 1; x <= 14; x++) {
        setTile(x, y, "floor", 1);
      }
    }
    for (let x = 4; x <= 7; x++) setTile(x, 2, "ledge", 3);
    for (let x = 9; x <= 12; x++) setTile(x, 9, "ledge", 3);
    setTile(6, 3, "floor", 2);
    setTile(10, 8, "floor", 2);
    setTile(8, 5, "floor", 1, "oil");
    setTile(8, 6, "water", 0, "water");
    props.push(makeProp("market_stall", "prop_ua_1", 5, 6));
    props.push(makeProp("tavern_table", "prop_ua_2", 10, 4));
    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 6 }];
    foeSpawns = [{ x: 7, y: 2 }, { x: 9, y: 5 }, { x: 11, y: 8 }, { x: 13, y: 5 }];
  } else if (scenario.id === "swamp_ruins") {
    // Murky marsh & fungal underdark: bog water + timber boardwalks
    for (let y = 2; y <= 9; y++) {
      for (let x = 1; x <= 14; x++) {
        const isBog = (x >= 4 && x <= 11) && (y === 4 || y === 7);
        setTile(x, y, isBog ? "water" : "floor", isBog ? 0 : 1, isBog ? "water" : "none");
      }
    }
    setTile(6, 4, "bridge", 1);
    setTile(10, 7, "bridge", 1);
    setTile(8, 5, "ledge", 2);
    setTile(9, 5, "ledge", 2);
    setTile(7, 3, "crystal", 1);
    ensureFlat2x2Pad(grid, 11, 5, 1, props);
    props.push(makeProp("jungle_barricade", "prop_sr_1", 5, 5));
    props.push(makeProp("jungle_altar", "prop_sr_2", 10, 3));
    heroSpawns = [{ x: 2, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 6 }];
    foeSpawns = [{ x: 8, y: 5 }, { x: 9, y: 8 }, { x: 11, y: 5, footprint: 2 }, { x: 13, y: 3 }];
  } else {
    // troll_grotto: Grand cavern chamber + twin side high-ground ledges + 2x2 boss arena
    for (let x = 1; x <= 4; x++) {
      setTile(x, 5, "floor", 1);
      setTile(x, 6, "floor", 1);
    }
    for (let x = 5; x <= 14; x++) {
      for (let y = 3; y <= 8; y++) {
        setTile(x, y, "floor", 1);
      }
    }
    // North & south high ledges
    setTile(7, 2, "floor", 2);
    setTile(8, 2, "ledge", 3);
    setTile(9, 2, "ledge", 3);
    setTile(10, 2, "floor", 2);
    setTile(9, 3, "floor", 2);

    setTile(8, 9, "floor", 2);
    setTile(9, 9, "ledge", 3);
    setTile(10, 9, "floor", 2);
    setTile(9, 8, "floor", 2);

    // Tactical elemental pockets & stalagmites
    setTile(6, 4, "stalagmite", 3);
    setTile(6, 7, "stalagmite", 3);
    setTile(7, 5, "brazier", 1, "fire");
    setTile(8, 5, "floor", 1, "oil");
    setTile(8, 6, "floor", 1, "oil");
    setTile(7, 7, "water", 0, "water");
    setTile(8, 7, "water", 0, "water");
    setTile(5, 4, "crystal", 1);
    setTile(13, 3, "brazier", 1, "fire");

    ensureFlat2x2Pad(grid, 11, 5, 1, props);
    props.push(makeProp("barricade", "prop_tg_1", 5, 6));
    props.push(makeProp("barricade", "prop_tg_2", 10, 4));

    heroSpawns = [
      { x: 2, y: 5 },
      { x: 2, y: 6 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
    ];
    foeSpawns = [
      { x: 9, y: 5 },
      { x: 9, y: 2 },
      { x: 10, y: 7 },
      { x: 11, y: 5, footprint: 2 },
    ];
  }

  // Guarantee at least 7 walkable hero-side spawn tiles (up to 5 heroes + 2 allied NPCs/VIPs)
  if (heroSpawns.length < 7) {
    const heroSet = new Set(heroSpawns.map((s) => `${s.x},${s.y}`));
    for (const base of [...heroSpawns]) {
      if (heroSpawns.length >= 7) break;
      for (const [dx, dy] of [[1, 0], [0, -1], [0, 1], [-1, 0]]) {
        const nx = base.x + dx;
        const ny = base.y + dy;
        if (!inMapBounds(nx, ny) || nx >= 5 || heroSet.has(`${nx},${ny}`)) continue;
        const t = grid[ny][nx];
        if (t.type !== "chasm" && t.type !== "water") {
          if (!isBaseTileWalkable(t)) setTile(nx, ny, "floor", 1);
          heroSpawns.push({ x: nx, y: ny });
          heroSet.add(`${nx},${ny}`);
          break;
        }
      }
    }
  }

  // Guarantee at least 6 walkable foe spawn tiles for 5-hero / multi-minion encounters
  if (foeSpawns.length < 6) {
    const foeSet = new Set(foeSpawns.map((s) => `${s.x},${s.y}`));
    for (const base of [...foeSpawns]) {
      if (foeSpawns.length >= 6) break;
      for (const [dx, dy] of [[-1, 0], [0, -1], [0, 1], [1, 0]]) {
        const nx = base.x + dx;
        const ny = base.y + dy;
        if (!inMapBounds(nx, ny) || nx <= 6 || foeSet.has(`${nx},${ny}`)) continue;
        const t = grid[ny][nx];
        if (t.type !== "chasm" && t.type !== "water") {
          if (!isBaseTileWalkable(t)) setTile(nx, ny, "floor", 1);
          foeSpawns.push({ x: nx, y: ny });
          foeSet.add(`${nx},${ny}`);
          break;
        }
      }
    }
  }

  // Apply story-driven dynamic hero & foe formations (bottom, top, center, scattered, surround, flank, ambush_behind)
  const resolvedForm = resolveDynamicFormations(grid, props, heroSpawns, foeSpawns, bp, rng);
  heroSpawns = resolvedForm.heroSpawns;
  foeSpawns = resolvedForm.foeSpawns;

  // Ensure hero/foe spawn tiles stay clean & walkable
  const reserved = new Set();
  for (const sp of heroSpawns) {
    reserved.add(`${sp.x},${sp.y}`);
    if (!isBaseTileWalkable(grid[sp.y][sp.x])) {
      setTile(sp.x, sp.y, "floor", 1);
    }
  }
  for (const sp of foeSpawns) {
    if (sp.footprint === 2) {
      for (let dy = 0; dy <= 1; dy++) {
        for (let dx = 0; dx <= 1; dx++) reserved.add(`${sp.x + dx},${sp.y + dy}`);
      }
      ensureFlat2x2Pad(grid, sp.x, sp.y, grid[sp.y]?.[sp.x]?.h ?? 1, props);
    } else {
      reserved.add(`${sp.x},${sp.y}`);
      if (!isBaseTileWalkable(grid[sp.y][sp.x])) {
        setTile(sp.x, sp.y, "floor", 1);
      }
    }
  }

  // Scatter 2 biome-matched dual-state Lego props (auto-sized to available tile clearance)
  const existingPropCells = new Set(props.map((p) => `${p.x},${p.y}`));
  const candidates = [];
  for (let y = 2; y <= MAP_ROWS - 3; y++) {
    for (let x = 3; x <= MAP_COLS - 4; x++) {
      const k = `${x},${y}`;
      const t = grid[y][x];
      if (!reserved.has(k) && !existingPropCells.has(k) && t.type === "floor" && t.surface === "none") {
        candidates.push({ x, y });
      }
    }
  }
  let extraAdded = 0;
  for (let tries = 0; tries < 18 && extraAdded < 2 && candidates.length > 0; tries++) {
    const idx = Math.floor(rng() * candidates.length);
    const cell = candidates.splice(idx, 1)[0];
    const pKey = pickScenarioPropKey(rng, scenario.id, grid, cell.x, cell.y, reserved);
    const candidateProp = makeProp(pKey, `prop_bio_${scenario.id}_${extraAdded}`, cell.x, cell.y);
    props.push(candidateProp);
    const testBfs = checkMapConnectivity(grid, heroSpawns, foeSpawns, props);
    if (!testBfs.connected) {
      props.pop();
    } else {
      existingPropCells.add(`${cell.x},${cell.y}`);
      extraAdded++;
    }
  }

  // Ensure 1 scenario-specific interactive tabletop objective prop exists
  const objSpec = SCENARIO_OBJECTIVE_PRESETS[scenario.id] || SCENARIO_OBJECTIVE_PRESETS.cave_ambush;
  const objCell = candidates.find((c) => !existingPropCells.has(`${c.x},${c.y}`)) || { x: 6, y: 5 };
  if (objSpec) {
    const objProp = makeProp(objSpec.templateKey, `prop_obj_${scenario.id}`, objCell.x, objCell.y);
    objProp.name = objSpec.name;
    objProp.interactable = true;
    objProp.objectiveType = objSpec.objectiveType;
    objProp.actionLabel = objSpec.actionLabel;
    objProp.skillName = objSpec.skillName;
    objProp.skillStat = objSpec.skillStat;
    objProp.dc = objSpec.dc;
    objProp.rewardEffect = objSpec.rewardEffect;
    objProp.rewardDesc = objSpec.rewardDesc;
    objProp.completed = false;
    props.push(objProp);
    const objBfs = checkMapConnectivity(grid, heroSpawns, foeSpawns, props);
    if (!objBfs.connected) {
      props.pop();
      // Attach objective metadata to first existing non-broken prop so objective is always reachable
      const fallbackProp = props[0];
      if (fallbackProp) {
        Object.assign(fallbackProp, {
          name: objSpec.name,
          interactable: true,
          objectiveType: objSpec.objectiveType,
          actionLabel: objSpec.actionLabel,
          skillName: objSpec.skillName,
          skillStat: objSpec.skillStat,
          dc: objSpec.dc,
          rewardEffect: objSpec.rewardEffect,
          rewardDesc: objSpec.rewardDesc,
          completed: false,
        });
      }
    }
  }

  let bfs = checkMapConnectivity(grid, heroSpawns, foeSpawns, props);
  if (!bfs.connected) {
    for (const target of [...heroSpawns.slice(1), ...foeSpawns]) {
      if (!bfs.visited.has(`${target.x},${target.y}`)) {
        carveRampPath(grid, heroSpawns[0], target, props);
      }
    }
    bfs = checkMapConnectivity(grid, heroSpawns, foeSpawns, props);
  }

  refreshMapDerivedFlags(grid, props);

  let wallCount = 0;
  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      if (grid[y][x].type === "wall") wallCount++;
    }
  }

  const baseFoes = scenario.defaultFoesByTier
    ? partyLevel >= 4
      ? scenario.defaultFoesByTier.high
      : scenario.defaultFoesByTier.low
    : scenario.defaultFoes;

  // Dynamic encounter scaling by partyLevel across ALL scenarios (Lv1: lighter, Lv3: standard, Lv5: tougher elite/boss)
  const defaultFoes =
    partyLevel <= 1
      ? baseFoes.slice(0, 3).map((id) => (id === "troll" ? "orc" : id === "ogre" ? "hobgoblin" : id))
      : partyLevel >= 5
        ? [...baseFoes.map((id) => (id === "goblin" ? "hobgoblin" : id === "bandit" ? "orc" : id)), "cult_fanatic"]
        : baseFoes;

  const sizeTier =
    ["tavern_brawl", "urban_alley", "underground_river"].includes(scenario.id)
      ? "small"
      : ["troll_grotto", "castle_throne", "desert_canyon", "ship_deck"].includes(scenario.id)
        ? "large"
        : "medium";
  const sizeLabel = sizeTier === "small" ? "小型緊湊" : sizeTier === "large" ? "大型開闊" : "中型標準";

  const weather =
    envOverrides?.weather && envOverrides.weather !== "auto"
      ? envOverrides.weather
      : scenario.defaultWeather || "clear";
  const lighting =
    envOverrides?.lighting && envOverrides.lighting !== "auto"
      ? envOverrides.lighting
      : scenario.defaultLighting || "underground";

  if (bp?.objectiveOverride && bp.objectiveOverride !== "auto") {
    const objP = props.find((p) => p.interactable);
    const OVERRIDE_OBJ_MAP = {
      disarm_alarm: {
        name: "警報信號裝置",
        objectiveType: "alarm",
        actionLabel: "拆除警報",
        skillName: "巧手",
        skillStat: "dex",
        dc: 12,
        rewardEffect: "stop_reinforcements",
        rewardDesc: "阻止敵軍第 3 輪援軍",
      },
      escort_vip: {
        name: "安全撤離信標",
        objectiveType: "rescue",
        actionLabel: "開啟撤離點",
        skillName: "求生",
        skillStat: "wis",
        dc: 11,
        rewardEffect: "inspire_party",
        rewardDesc: "全隊與護送目標獲得臨時HP與鼓舞",
      },
      capture_leader: {
        name: "懸賞壓制符印",
        objectiveType: "debuff",
        actionLabel: "啟動壓制",
        skillName: "威嚇",
        skillStat: "cha",
        dc: 12,
        rewardEffect: "weaken_foes",
        rewardDesc: "震懾敵軍，全敵攻擊 -2",
      },
      destroy_altar: {
        name: "邪能儀式祭壇",
        objectiveType: "destructible",
        actionLabel: "淨化祭壇",
        skillName: "奧秘",
        skillStat: "int",
        dc: 13,
        rewardEffect: "aoe_holy_burst",
        rewardDesc: "淨化爆發，對週遭敵軍造成光耀傷害",
      },
      tower_defense: {
        name: "城防奧術防禦塔",
        objectiveType: "tower_core",
        actionLabel: "充能砲塔",
        skillName: "奧秘",
        skillStat: "int",
        dc: 11,
        rewardEffect: "tower_zap",
        rewardDesc: "防禦塔發射雷電擊中最近敵人（2d8）並回復護盾",
      },
      chase_target: {
        name: "疾風加速符文",
        objectiveType: "chase",
        actionLabel: "啟動加速",
        skillName: "運動",
        skillStat: "str",
        dc: 10,
        rewardEffect: "haste_party",
        rewardDesc: "全隊本輪移動力 +3 格，全力追擊目標",
      },
      collect_relics: {
        name: "失落遺跡秘寶 (1/3)",
        objectiveType: "collect",
        actionLabel: "收集秘寶",
        skillName: "調查",
        skillStat: "int",
        dc: 10,
        rewardEffect: "collect_progress",
        rewardDesc: "收集 3 處秘寶獲得全隊攻擊 +2 與 10 臨時HP",
      },
    };
    const ov = OVERRIDE_OBJ_MAP[bp.objectiveOverride];
    if (objP && ov) Object.assign(objP, ov);

    // For collect_relics, spawn 2 additional collectible relic props across the map
    if (bp.objectiveOverride === "collect_relics") {
      const extraSpots = [
        { x: 5, y: 2 },
        { x: 11, y: 9 },
        { x: 9, y: 3 },
        { x: 4, y: 8 },
      ];
      let addedRelics = 0;
      for (const spot of extraSpots) {
        if (addedRelics >= 2) break;
        const t = grid[spot.y]?.[spot.x];
        if (!t || !isBaseTileWalkable(t) || props.some((p) => p.x === spot.x && p.y === spot.y)) continue;
        const relic = makeProp("crystal", `prop_relic_${addedRelics + 2}`, spot.x, spot.y);
        Object.assign(relic, {
          name: `失落遺跡秘寶 (${addedRelics + 2}/3)`,
          interactable: true,
          objectiveType: "collect",
          actionLabel: "收集秘寶",
          skillName: "調查",
          skillStat: "int",
          dc: 10,
          rewardEffect: "collect_progress",
          rewardDesc: "收集 3 處秘寶獲得全隊強化",
          completed: false,
        });
        props.push(relic);
        addedRelics++;
      }
    }
  }
  if (bp?.objectiveName) {
    const objP = props.find((p) => p.interactable);
    if (objP) objP.name = bp.objectiveName;
  }
  if (Array.isArray(bp?.features)) {
    const feats = new Set(bp.features);
    const spawnCells = new Set([
      ...heroSpawns.map((s) => `${s.x},${s.y}`),
      ...foeSpawns.map((s) => `${s.x},${s.y}`),
    ]);
    if (feats.has("campfire") && isBaseTileWalkable(grid[5]?.[7]) && !spawnCells.has("7,5")) {
      setTile(7, 5, "brazier", grid[5][7].h || 1, "fire");
    }
    if (feats.has("wagon") && isBaseTileWalkable(grid[6]?.[5]) && !spawnCells.has("5,6") && !props.some((p) => p.x === 5 && p.y === 6)) {
      const wg = makeProp("market_stall", "prop_bp_wagon", 5, 6);
      wg.name = "商隊貨車";
      props.push(wg);
    }
    if (feats.has("oil_barrels") && isBaseTileWalkable(grid[5]?.[8])) {
      grid[5][8].surface = "oil";
    }
    if (feats.has("crystal") && isBaseTileWalkable(grid[4]?.[8]) && !spawnCells.has("8,4")) {
      setTile(8, 4, "crystal", grid[4][8].h || 1);
    }
    if (feats.has("altar") && isBaseTileWalkable(grid[4]?.[10]) && !spawnCells.has("10,4") && !props.some((p) => p.x === 10 && p.y === 4)) {
      props.push(makeProp("altar", "prop_bp_altar", 10, 4));
    }
    refreshMapDerivedFlags(grid, props);
  }

  // Enrich map with 2 deterministic theme-matched dual-state props from the 333-item LEGO_PROPS_MANIFEST
  const scenTxt = `${scenario.id} ${scenario.name || ""} ${scenario.subtitle || ""}`.toLowerCase();
  const themeCats =
    /church|cathedral|temple|chapel|abbey|教堂|聖殿|修道/.test(scenTxt)
      ? ["church", "gothic"]
      : /tavern|inn|pub|market|guild|plaza|酒館|市集|公會/.test(scenTxt)
        ? ["tavern", "market", "town"]
        : /crypt|grave|cemetery|barrow|tomb|墓|陵|亡靈/.test(scenTxt)
          ? ["cemetery", "gothic", "dungeon"]
          : /ice|snow|glacier|frost|frozen|雪|冰|霜/.test(scenTxt)
            ? ["ice", "camp"]
            : /desert|oasis|dune|canyon|沙|綠洲|峽谷/.test(scenTxt)
              ? ["desert", "camp"]
              : /forest|woods|grove|swamp|marsh|林|沼|森/.test(scenTxt)
                ? ["nature", "camp"]
                : /tower|arcane|wizard|lab|library|observatory|法師|奧術|書庫|祭壇/.test(scenTxt)
                  ? ["arcane", "alchemy"]
                  : /castle|fort|bastion|gate|arena|siege|堡|城|要塞|競技/.test(scenTxt)
                    ? ["siege", "craft", "town"]
                    : /cave|dungeon|mine|underdark|ruin|洞|地城|礦|遺跡/.test(scenTxt)
                      ? ["dungeon", "arcane"]
                      : ["town", "camp"];
  const themePool = themeCats.flatMap((c) => THEMED_PROPS_BY_CATEGORY[c] || []);
  if (themePool.length > 0) {
    const busySet = new Set([
      ...heroSpawns.map((s) => `${s.x},${s.y}`),
      ...foeSpawns.map((s) => `${s.x},${s.y}`),
      ...props.map((p) => `${p.x},${p.y}`),
    ]);
    const decoSpots = [
      [3, 2], [12, 2], [4, 9], [11, 9], [6, 2], [9, 9],
    ].filter(([dx, dy]) => isBaseTileWalkable(grid[dy]?.[dx]) && !busySet.has(`${dx},${dy}`));
    let placedTheme = 0;
    for (const [dx, dy] of decoSpots) {
      if (placedTheme >= 2) break;
      const chosen = themePool[Math.floor(rng() * themePool.length)];
      if (!chosen) continue;
      const isFlammable = /木|桶|桌|椅|布|帳|書|草|hay|wood|crate|barrel|tent|book/i.test(`${chosen.name} ${chosen.uses}`);
      props.push({
        id: `prop_theme_${placedTheme}_${dx}_${dy}`,
        key: chosen.id,
        kind: /箱|寶|chest/i.test(chosen.name) ? "chest" : "decor",
        name: chosen.name,
        x: dx,
        y: dy,
        blocksMove: false,
        blocksSight: false,
        cover: 1,
        hp: 16,
        maxHp: 16,
        broken: false,
        flammable: isFlammable,
        imgIntact: chosen.s0,
        imgBroken: chosen.s1,
        scaleW: 0.72,
        scaleH: 0.72,
      });
      busySet.add(`${dx},${dy}`);
      placedTheme++;
    }
    if (placedTheme > 0) refreshMapDerivedFlags(grid, props);
  }

  // Auto-align 45-degree isometric props (doors, gates, barricades, pews, stalls, chests) to nearby walls
  for (const p of props) {
    if (typeof p.mirror === "boolean") continue;
    const hasWallN = grid[p.y - 1]?.[p.x]?.type === "wall";
    const hasWallS = grid[p.y + 1]?.[p.x]?.type === "wall";
    const hasWallW = grid[p.y]?.[p.x - 1]?.type === "wall";
    const hasWallE = grid[p.y]?.[p.x + 1]?.type === "wall";
    if ((hasWallW || hasWallE) && !(hasWallN || hasWallS)) {
      p.mirror = true;
    } else if (!(hasWallN || hasWallS) && p.x >= Math.floor(MAP_COLS / 2) && /barricade|pew|stall|chest|door|gate|board/i.test(`${p.key || ""} ${p.name || ""}`)) {
      p.mirror = true;
    } else {
      p.mirror = false;
    }
  }

  const EXIT_LABEL_BY_SCENARIO = {
    tavern_brawl: "酒館階梯出口",
    ship_deck: "船舷跳板出口",
    volcanic_forge: "鍛造通道出口",
    haunted_crypt: "墓室石門出口",
    urban_alley: "街區巷口",
    castle_throne: "殿堂大門出口",
    forest_ambush: "林間小徑出口",
    underground_river: "暗河石橋出口",
    swamp_ruins: "沼澤遺跡出口",
    desert_canyon: "峽谷隘口",
    frost_citadel: "冰堡通道出口",
    coral_underwater: "珊瑚海灣出口",
    mountain_cliff: "山道出口",
    chasm_sanctum: "裂隙聖殿出口",
    troll_grotto: "洞穴出口",
    cave_ambush: "洞窟出口",
  };
  let exitCell = null;
  {
    const start = heroSpawns[0] || { x: Math.floor(MAP_COLS / 2), y: MAP_ROWS - 2 };
    const blockedSet = new Set([
      ...heroSpawns.map((s) => `${s.x},${s.y}`),
      ...foeSpawns.map((s) => `${s.x},${s.y}`),
      ...props.filter((p) => !p.broken).map((p) => `${p.x},${p.y}`),
    ]);
    const visited = new Set([`${start.x},${start.y}`]);
    const queue = [{ x: start.x, y: start.y, d: 0 }];
    const candidates = [];
    while (queue.length > 0) {
      const cur = queue.shift();
      const key = `${cur.x},${cur.y}`;
      const cell = grid[cur.y]?.[cur.x];
      if (cell?.walkable && !cell.blocksMove && !blockedSet.has(key)) {
        const isEdge =
          cur.x <= 2 || cur.x >= MAP_COLS - 3 || cur.y <= 2 || cur.y >= MAP_ROWS - 3;
        const score = cur.d + (isEdge ? 4 : 0) + (cur.y <= 3 ? 2 : 0);
        candidates.push({ x: cur.x, y: cur.y, score });
      }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cur.x + dx;
        const ny = cur.y + dy;
        const nk = `${nx},${ny}`;
        if (nx < 0 || nx >= MAP_COLS || ny < 0 || ny >= MAP_ROWS || visited.has(nk)) continue;
        const nc = grid[ny]?.[nx];
        if (!nc || !nc.walkable || nc.blocksMove) continue;
        visited.add(nk);
        queue.push({ x: nx, y: ny, d: cur.d + 1 });
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    const chosenExit = candidates[0] || foeSpawns[0] || { x: Math.floor(MAP_COLS / 2), y: 2 };
    exitCell = {
      x: chosenExit.x,
      y: chosenExit.y,
      label: EXIT_LABEL_BY_SCENARIO[scenario.id] || "區域出口",
    };
  }

  return {
    scenarioId: scenario.id,
    name: bp?.title || scenario.name,
    subtitle: scenario.subtitle,
    heroFormation: bp?.heroFormation || "auto",
    foeFormation: bp?.foeFormation || "auto",
    foeWaves: Boolean(bp?.foeWaves),
    sizeTier,
    sizeLabel,
    bgm: scenario.bgm,
    palette: scenario.palette,
    weather,
    lighting,
    seed,
    cols: MAP_COLS,
    rows: MAP_ROWS,
    grid,
    props,
    heroSpawns,
    foeSpawns,
    exitCell,
    defaultFoes,
    wallCount,
    connected: bfs.connected,
    reachableCount: bfs.reachableCount,
    ...(tabletopBackdrop ? { tabletopBackdrop } : {}),
    ...(buildings ? { buildings } : {}),
    ...(scenicProps ? { scenicProps } : {}),
    ...(mapLights ? { lights: mapLights } : {}),
    ...(halfBlocks ? { halfBlocks } : {}),
  };
}

export function getSurfaceMoveCost(tile) {
  if (!tile) return 99;
  if (
    tile.difficult ||
    tile.type === "water" ||
    tile.surface === "water" ||
    tile.surface === "oil" ||
    tile.surface === "grease" ||
    tile.surface === "ice" ||
    tile.surface === "poison" ||
    tile.surface === "difficult"
  ) {
    return 2;
  }
  return 1;
}

/**
 * Resolves BG3-style elemental ground surface chains when elemental damage or spells land.
 */
export function applyElementalSurfaceReaction(map, originX, originY, damageType, createSurface = null) {
  const grid = map?.grid;
  if (!grid || !inMapBounds(originX, originY)) {
    return { reaction: null, cells: [] };
  }

  const dmgLower = String(damageType || "").toLowerCase();
  const touched = [];
  let reaction = null;

  const floodConvert = (fromSurfaceSet, toSurface, rounds = 3) => {
    const queue = [{ x: originX, y: originY }];
    const seen = new Set([`${originX},${originY}`]);
    while (queue.length > 0 && touched.length < 20) {
      const cur = queue.shift();
      const tile = grid[cur.y][cur.x];
      if (!isBaseTileWalkable(tile)) continue;
      if (fromSurfaceSet.has(tile.surface) || (fromSurfaceSet.has("type_water") && tile.type === "water")) {
        tile.surface = toSurface;
        tile.surfaceRounds = rounds;
        touched.push({ x: cur.x, y: cur.y });
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const nx = cur.x + dx;
          const ny = cur.y + dy;
          if (!inMapBounds(nx, ny)) continue;
          const k = `${nx},${ny}`;
          if (!seen.has(k)) {
            seen.add(k);
            queue.push({ x: nx, y: ny });
          }
        }
      }
    }
  };

  const centerTile = grid[originY][originX];
  const isOilOrGrease = (s) => s === "oil" || s === "grease";
  const hasOilNearby =
    isOilOrGrease(centerTile?.surface) ||
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].some(([dx, dy]) => inMapBounds(originX + dx, originY + dy) && isOilOrGrease(grid[originY + dy][originX + dx].surface));

  const hasWaterHere = centerTile && (centerTile.surface === "water" || centerTile.type === "water");
  const hasFireHere = centerTile && (centerTile.surface === "fire" || centerTile.type === "brazier");

  if (dmgLower === "fire" && hasOilNearby) {
    // Seed BFS from any touching oil/grease tile
    for (const [dx, dy] of [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const tx = originX + dx;
      const ty = originY + dy;
      if (inMapBounds(tx, ty) && isOilOrGrease(grid[ty][tx].surface)) {
        floodConvert(new Set(["oil", "grease"]), "fire", 3);
      }
    }
    reaction = "oil_ignite";
    return {
      reaction,
      label: "🔥 油面爆燃",
      cells: touched,
      extraDice: "2d4",
      extraType: "fire",
    };
  }

  if ((dmgLower === "lightning" || dmgLower === "thunder") && hasWaterHere) {
    floodConvert(new Set(["water", "type_water"]), "electrified_water", 2);
    reaction = "water_shock";
    return {
      reaction,
      label: "⚡ 水面通電",
      cells: touched,
      extraDice: "1d6",
      extraType: "lightning",
      condition: "Stunned",
      saveAbility: "con",
      saveDc: 12,
    };
  }

  if (dmgLower === "cold" && hasFireHere) {
    floodConvert(new Set(["fire"]), "steam_cloud", 3);
    reaction = "steam_cloud";
    return {
      reaction,
      label: "💨 冰火蒸氣迷霧（提供掩蔽）",
      cells: touched,
    };
  }

  if (dmgLower === "fire" && hasWaterHere) {
    floodConvert(new Set(["water", "type_water"]), "steam_cloud", 2);
    reaction = "steam_cloud";
    return {
      reaction,
      label: "💨 灼熱蒸氣迷霧（提供掩蔽）",
      cells: touched,
    };
  }

  if (dmgLower === "cold" && hasWaterHere) {
    floodConvert(new Set(["water", "type_water"]), "ice", 3);
    reaction = "water_freeze";
    return {
      reaction,
      label: "❄️ 水面結冰（滑倒檢定）",
      cells: touched,
    };
  }

  if ((dmgLower === "poison" || dmgLower === "acid") && isBaseTileWalkable(centerTile)) {
    centerTile.surface = "poison";
    centerTile.surfaceRounds = 3;
    touched.push({ x: originX, y: originY });
    return {
      reaction: "poison_cloud",
      label: "☠️ 劇毒霧氣（持續毒傷）",
      cells: touched,
    };
  }

  if (createSurface && isBaseTileWalkable(centerTile) && centerTile.type !== "water") {
    centerTile.surface = createSurface;
    centerTile.surfaceRounds = 3;
    touched.push({ x: originX, y: originY });
  }

  return { reaction, cells: touched };
}
