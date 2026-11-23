// Role-aware, personality-aware & creature-type-aware combat speech bubbles (0 AI tokens)
import { HERO_PERSONAL_BARKS } from "./heroBarkLines.js";

const HERO_BARKS = {
  martial: {
    attack: ["看招！", "正面接下這一擊！", "別想躲開！"],
    kill: ["解決一個！下一個是誰？", "防線往前推進！", "幹得漂亮，繼續上！"],
    crit: ["這一擊，正面吃下吧！", "破綻太明顯了！", "全力斬擊！"],
    heal_revive: ["撐住，別倒在這裡！", "我掩護你，快站起來！"],
    interact_ok: ["搞定了，繼續推進！", "機關已解開，大家跟上！"],
  },
  rogue: {
    attack: ["抓到破綻了。", "別回頭。", "速度決定勝負。"],
    kill: ["目標清除。", "安靜一點，倒下吧。", "比預期還順利。"],
    crit: ["背後空門大開。", "正中要害，安息吧。", "這一下很快。"],
    heal_revive: ["別睡了，還得靠你分擔火力呢。", "喝下去，別死在這裡。"],
    interact_ok: ["小菜一碟。", "鎖開了，好東西歸我們！"],
  },
  caster: {
    attack: ["魔力凝聚——發射！", "感受元素的怒火吧！", "座標鎖定！"],
    kill: ["能量消散，目標瓦解。", "計算無誤。", "這就是奧術的代價。"],
    crit: ["奧術共鳴——完美命中！", "見識元素之力吧！", "計算分毫不差！"],
    big_spell: ["法術詠唱完成，注意閃避！", "別站在火與油旁邊！", "讓這場戰鬥結束吧！"],
    heal_revive: ["以魔力縫合傷口，起身！", "不要放棄，光輝與你同在！"],
    interact_ok: ["封印已破除！", "魔力流動恢復正常了。"],
  },
  support: {
    attack: ["以聖光驅散黑暗！", "退後，邪惡之徒！"],
    kill: ["願你的靈魂獲得安息。", "正義站在我們這邊！"],
    crit: ["神聖懲戒！", "正義站在我們這邊！"],
    big_spell: ["聖光啊，照亮戰場！", "這首戰歌獻給諸位！"],
    heal_revive: ["醒來吧，你的戰鬥還沒結束！", "神恩護佑，傷痛退散！"],
    interact_ok: ["感謝神明庇佑，成功了！", "大家穩住，我們佔上風了！"],
  },
};

const NPC_ALLY_BARKS = {
  vip: {
    attack: ["我、我也會反擊的！", "別過來！"],
    low_hp: ["救命啊！護衛在哪裡！", "我撐不住了……誰來幫幫我！"],
    heal_revive: ["太感謝了！我差點以為沒命了！"],
    interact_ok: ["太好了，通路打開了！"],
  },
  guard: {
    attack: ["保護要人！列陣迎敵！", "休想越過防線！"],
    kill: ["一個敵人倒下了！維持陣型！", "這就是冒犯守衛的下場！"],
    crit: ["精準貫穿！為了城邦的榮耀！"],
    low_hp: ["防線吃緊……但我絕不後退！"],
  },
  companion: {
    attack: ["*低吼撲擊！*", "*展翅銳鳴突襲！*"],
    kill: ["*得意地甩頭低哮！*", "*振翅盤旋示威！*"],
    crit: ["*精準咬住要害！*"],
    low_hp: ["*發出焦急的嗚咽聲，靠向主人…*"],
  },
};

const FOE_BARKS = {
  animal: {
    attack: ["*齜牙猛撲！*", "*利爪揮舞！*"],
    crit: ["*猛烈撕咬！*", "*狂暴撲擊！*"],
    high_ground: ["*居高臨下低吼！*"],
    low_hp: ["*發出痛苦哀鳴…*", "*夾緊尾巴齜牙低哮！*"],
  },
  undead: {
    attack: ["*生者…血肉…*", "*冰冷鏽刃揮下…*"],
    crit: ["*喀啦！利爪撕裂！*", "*冰冷死氣襲來…*"],
    high_ground: ["*空洞眼窩鎖定獵物…*"],
    low_hp: ["*骨節碎裂卻仍不倒下…*", "*發出嘶啞腐朽低鳴…*"],
  },
  cultist: {
    attack: ["為了深淵之主，獻祭你們！", "異端必受懲罰！"],
    crit: ["黑暗降臨！！感受絕望吧！", "這就是主人的神蹟！"],
    big_spell: ["以禁忌之名——降臨吧！"],
    low_hp: ["不可能…主人明明答應賜予我們勝利…", "快退！儀式還不能中斷！"],
  },
  dragon: {
    attack: ["*龍翼掀起狂風，利爪橫掃！*", "*灼熱吐息在喉間翻騰…*"],
    crit: ["渺小的爬蟲，化為灰燼吧！！", "*震耳欲聾的龍吼撼動地面！*"],
    big_spell: ["感受太古龍威的憤怒吧！！"],
    low_hp: ["區區凡人竟敢傷及龍鱗……不可饒恕！！"],
  },
  minion: {
    attack: ["上啊！搶光他們的錢袋！", "老大說砍死他們有賞！", "別讓他們跑了！"],
    crit: ["嘿嘿，砍中了！", "老大你看，我打中啦！"],
    high_ground: ["高處歸我了，別想上來！", "看我在上面射穿你們！"],
    low_hp: ["別殺我！我投降還不行嗎！", "呃啊…老大救命啊！", "我們只是拿錢辦事的！"],
  },
  elite: {
    attack: ["結陣推進，碾碎這群冒險者！", "你們今天一個都別想走！"],
    crit: ["弱小的傢伙，再吃一記！", "這就是實力的差距！"],
    high_ground: ["佔據制高點，準備受死！"],
    low_hp: ["這點傷……還遠遠不夠！", "可惡，別小看我們！"],
  },
  boss: {
    attack: ["跪下吧，弱者們！", "你們的掙扎真是可笑！"],
    crit: ["渺小的蟲子，徹底粉碎吧！", "在絕對的力量面前顫抖吧！"],
    high_ground: ["俯視你們的掙扎真是可笑！"],
    low_hp: ["竟敢傷到我……不可饒恕！", "別以為這樣就結束了！"],
  },
};

export function classifySpeakerCategory(unit) {
  if (!unit) return "minion";
  if (unit.side === "hero") {
    if (unit.isCompanion) return "companion";
    if (unit.isNpcAlly) return unit.allyRole === "vip" ? "vip" : "guard";
    const cls = `${unit.className || ""} ${unit.role || ""}`.toLowerCase();
    if (/wizard|sorc|warlock|psion|chrono|法師|術士|邪術|靈能|時空|操念|秘術/.test(cls)) return "caster";
    if (/cleric|bard|druid|oracle|shaman|牧師|吟遊|德魯伊|先知|薩滿|戰地醫師|氣脈/.test(cls)) return "support";
    if (/rogue|ranger|assassin|hunter|scout|盜賊|遊蕩|遊俠|刺客|獵人|偵察|調查/.test(cls)) return "rogue";
    return "martial";
  }

  const tid = String(unit.templateId || "").toLowerCase();
  const cType = String(unit.className || "").toLowerCase();
  const name = String(unit.name || "").toLowerCase();
  const combined = `${tid} ${cType} ${name}`;

  if (/dragon|wyrm|wyvern|龍|飛龍/.test(combined)) return "dragon";
  if (/cult|acolyte|priest|necromancer|mage|warlock|邪教|祭司|法師|巫師|狂熱/.test(combined)) return "cultist";
  if (/beast|wolf|bear|spider|boar|rat|snake|bat|crocodile|toad|cat|狼|熊|蜘蛛|野豬|鼠|蛇|鱷/.test(combined)) {
    return "animal";
  }
  if (/undead|skeleton|zombie|ghoul|wight|ghost|lich|骷髏|殭屍|食屍鬼|屍妖|幽靈|巫妖/.test(combined)) {
    return "undead";
  }
  if (unit.footprint === 2 || (unit.cr || 0) >= 2 || /captain|boss|troll|ogre|owlbear|頭目|隊長|巨魔|食人魔|梟熊/.test(combined)) {
    return "boss";
  }
  if ((unit.cr || 0) >= 0.5 || /orc|hobgoblin|bugbear|獸人|熊地精|大地精/.test(combined)) {
    return "elite";
  }
  return "minion";
}

export function pickCombatBark(unit, triggerKey, rng = Math.random) {
  if (!unit) return null;
  const cat = classifySpeakerCategory(unit);

  if (unit.side === "hero") {
    if (cat === "vip" || cat === "guard" || cat === "companion") {
      const npcList = NPC_ALLY_BARKS[cat]?.[triggerKey] || NPC_ALLY_BARKS[cat]?.attack;
      if (npcList && npcList.length > 0) return npcList[Math.floor(rng() * npcList.length)];
      return null;
    }
    const presetKey = unit.presetId || (HERO_PERSONAL_BARKS[unit.id] ? unit.id : null);
    const personal = presetKey ? HERO_PERSONAL_BARKS[presetKey] : null;
    if (personal && personal.length > 0 && (triggerKey === "attack" || triggerKey === "kill" || rng() < 0.65)) {
      return personal[Math.floor(rng() * personal.length)];
    }
    const roleList = HERO_BARKS[cat]?.[triggerKey] || HERO_BARKS[cat]?.attack;
    if (roleList && roleList.length > 0) return roleList[Math.floor(rng() * roleList.length)];
    if (personal && personal.length > 0) return personal[Math.floor(rng() * personal.length)];
    return null;
  }

  const list = FOE_BARKS[cat]?.[triggerKey] || FOE_BARKS[cat]?.attack;
  if (!list || list.length === 0) return null;
  return list[Math.floor(rng() * list.length)];
}
