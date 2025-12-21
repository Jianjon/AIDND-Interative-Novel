import barbarianImg from '../assets/characters/Barbarian.png';
import bardImg from '../assets/characters/Bard.png';
import clericImg from '../assets/characters/Cleric.png';
import druidImg from '../assets/characters/Druid.png';
import fighterImg from '../assets/characters/Fighter.png';
import monkImg from '../assets/characters/Monk.png';
import paladinImg from '../assets/characters/Paladin.png';
import rangerImg from '../assets/characters/Ranger.png';
import rogueImg from '../assets/characters/Rogue.png';
import sorcererImg from '../assets/characters/Sorcerer.png';
import warlockImg from '../assets/characters/Warlock.png';
import wizardImg from '../assets/characters/Wizard.png';
// Extended class images
import artificerImg from '../assets/characters/artificer.png';
import necromancerImg from '../assets/characters/necromancer.png';
import bloodhunterImg from '../assets/characters/bloodhunter.png';
import shamanImg from '../assets/characters/shaman.png';
import witchImg from '../assets/characters/witch.png';
import duelistImg from '../assets/characters/duelist.png';
import summonerImg from '../assets/characters/summoner.png';
import magusImg from '../assets/characters/magus.png';
import oracleImg from '../assets/characters/oracle.png';
import investigatorImg from '../assets/characters/investigator.png';
import deathknightImg from '../assets/characters/deathknight.png';
import psionImg from '../assets/characters/psion.png';
import eldritchknightImg from '../assets/characters/eldritchknight.png';
import alchemistImg from '../assets/characters/alchemist.png';
import championImg from '../assets/characters/champion.png';
import chronomancerImg from '../assets/characters/chronomancer.png';
// New Heroic characters (10 Legendary Heroes)
import knightImg from '../assets/characters/Knight.png';
import bladedancerImg from '../assets/characters/bladedancer.png';
import scoutImg from '../assets/characters/scout.png';
import axesingerImg from '../assets/characters/axesinger.png';
import elfmagusImg from '../assets/characters/elfmagus.png';
import hunterImg from '../assets/characters/hunter.png';
import assassinImg from '../assets/characters/assassin.png';
import weaponmasterImg from '../assets/characters/weaponmaster.png';
import runemasterImg from '../assets/characters/runemaster.png';
import fieldmedicImg from '../assets/characters/fieldmedic.png';
import starspiritImg from '../assets/characters/stella_chaos.png';
import isabellaImg from '../assets/characters/isabella_pirate.png';
import morrinaImg from '../assets/characters/morrina_witch.png';
import dianaImg from '../assets/characters/diana_archer.png';
import fenelaImg from '../assets/characters/fenela_bloodlord.png';
import kikiImg from '../assets/characters/kiki_lucky.png';
import anthraxeImg from '../assets/characters/anthraxe.jpg';
// Companion portraits
import shadowfangImg from '../assets/characters/wolf-dnd-portrait.png';
import swiftwindImg from '../assets/characters/swiftwind.png';
import inkwellImg from '../assets/characters/owl-dnd-portrait.png';
import steamyImg from '../assets/characters/Steam Cat-dnd-portrait.png';
import crowImg from '../assets/characters/crow.png';
import silkshadeImg from '../assets/characters/spider-dnd-portrait.png';
import sevenImg from '../assets/characters/Robot-dnd-portrait.png';
import swordghostImg from '../assets/characters/swordghost.png';
import lunaImg from '../assets/characters/phantomwhitewolf-dnd-portrait.png';

/**

 * Preset Playable Characters (The Iconic 12)
 * Designed for immediate "Pick up and Play" experience.
 * Gender Balance: 6 Male, 6 Female.
 *
 * Updated to match the new CharacterAgent Schema:
 * - inventory: { equipment: [], consumables: [], magicItems: [] }
 * - baseStats: { str, dex, ... }
 */

export const PRESET_CHARACTERS = [
    // --- 1. Barbarian (Male) ---
    {
        id: 'preset_barbarian',
        name: '嵐·風行者 (Lan)',
        race: '氣元素裔',
        class: '野蠻人',
        gender: 'Male',
        alignment: '混亂善良',
        background: '化外之民',
        mbti: 'ESTP',
        level: 3,
        hp: 32,
        maxHp: 32,
        baseStats: { str: 16, dex: 14, con: 14, int: 8, wis: 12, cha: 10 },
        skills: ['運動', '生存'],
        feats: ['不息之息', '狂暴'],
        personality: '暴風雨的化身。他患有嚴重的「幽閉恐懼症」，拒絕走正門，更喜歡「製造」新的出口。他認為文明的禮節是給軟弱者準備的，只有在咆哮和戰鬥中才能與風對話。',
        monologue: '門？那是給羊走的。狼都是直接撞穿牆壁！',
        appearance: 'Pale blue translucent skin, white hair floating as if underwater, glowing white eyes, muscular build, tribal tattoos, carrying a massive greataxe, gust of wind swirling around.',
        inventory: {
            equipment: ['巨斧', '手斧 x2', '探險家背包', '標槍 x4'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '火把 x2', '治療藥水'],
            magicItems: []
        },
        avatar: barbarianImg,
        bio: '因為曾試圖對著龍捲風講道理而被部落放逐。他堅信自己是風暴的私生子，目前正試圖尋找方法回到天空上的故鄉。他的憤怒管理問題通常通過劈柴（或劈敵人）來解決。'
    },
    // --- 2. Bard (Female) ---
    {
        id: 'preset_bard',
        name: '貝拉·巧舌 (Bella)',
        race: '侏儒',
        class: '吟遊詩人',
        gender: 'Female',
        alignment: '混亂善良',
        background: '藝人',
        mbti: 'ENFP',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 8, dex: 14, con: 12, int: 14, wis: 10, cha: 16 },
        skills: ['表演', '說服', '歷史'],
        feats: ['侏儒狡黠', '詩人激勵'],
        spells: ['惡毒嘲笑', '治癒真言', '雷鳴波', '睡眠術'],
        slots: { 1: 2 },
        personality: '八卦記者型冒險者。她無法保守祕密，會即時將隊友的糗事編成歌謠。她認為「真相」太無聊，所有的故事都需要「藝術加工」。',
        monologue: '等等！剛才那個摔倒的姿勢太不優雅了，我們重來一次，這次加點旋轉！',
        appearance: 'Small stature, large expressive eyes, pink messy hair with goggles, colorful motley clothes, playing a lute, mischievous grin, bright and vibrant colors.',
        inventory: {
            equipment: ['細劍', '藝人背包', '魯特琴', '皮甲', '匕首'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '蠟燭 x5', '治療藥水'],
            magicItems: []
        },
        avatar: bardImg,
        bio: '前皇家宮廷小丑，因為不小心說出了國王的假髮祕密而被通緝。現在她立志要寫出一本包含世界上所有名人醜聞的「史詩巨著」。'
    },
    // --- 3. Cleric (Male) ---
    {
        id: 'preset_cleric',
        name: '索林·鐵盾 (Thorin)',
        race: '矮人',
        class: '牧師',
        gender: 'Male',
        alignment: '守序善良',
        background: '侍僧',
        mbti: 'ISTJ',
        level: 3,
        hp: 24,
        maxHp: 24,
        baseStats: { str: 14, dex: 10, con: 14, int: 10, wis: 16, cha: 10 },
        skills: ['洞察', '醫療'],
        feats: ['矮人堅韌', '施法能力'],
        spells: ['聖火術', '奇術', '治療傷口', '導引飛彈', '祝福術'],
        slots: { 1: 2 },
        personality: '職業倦怠的地下城安全稽查員。他會對每個地城的「結構完整性」和「衛生條件」進行評分。治療隊友時會碎碎念關於「工安意外」的預防措施。',
        monologue: '看在摩拉丁的鬍子上！這座神廟的承重柱根本不合規！還有這些骷髏，多久沒消毒了？',
        appearance: 'Stout dwarf, long braided grey beard with silver rings, heavy plate armor with holy symbol engraved, holding a warhammer, stern and pious expression, warm golden light aura.',
        inventory: {
            equipment: ['戰錘', '鱗甲', '盾牌', '聖徽', '祭司背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '聖水', '治療藥水'],
            magicItems: []
        },
        avatar: clericImg,
        bio: '曾是矮人礦坑的工頭，在一次礦難中悟道。他認為冒險不是英雄主義，而是高風險的勞動，必須嚴格遵守安全守則（雖然隊友從來不聽）。'
    },
    // --- 4. Druid (Female) ---
    {
        id: 'preset_druid',
        name: '卡琳·灰燼 (Kalin)',
        race: '提夫林',
        class: '德魯伊',
        gender: 'Female',
        alignment: '絕對中立',
        background: '隱士',
        mbti: 'INFP',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 10, dex: 14, con: 12, int: 12, wis: 16, cha: 10 },
        skills: ['自然', '生存'],
        feats: ['煉獄抗性', '德魯伊語'],
        spells: ['德魯伊技藝', '製造火焰', '糾纏術', '治療傷口', '雷鳴波'],
        slots: { 1: 2 },
        personality: '激進的植物保護主義者。她會跟木製家具道歉，並在戰鬥中試圖說服敵人的坐騎「罷工」。她認為人類才是這個世界的入侵物種。',
        monologue: '別踩那朵花！它的根系正在午睡！至於那邊的地精...嗯，它們也是肥料的一種。自然循環嘛。',
        appearance: 'Reddish skin, large curved ram horns, wild dark hair adorned with leaves, primal leather furs, glowing amber eyes, holding a wooden staff, surrounded by nature spirits.',
        inventory: {
            equipment: ['彎刀', '皮甲', '盾牌', '德魯伊法器', '探險家背包'],
            gold: 10,
            consumables: ['好莓 (零食)', '草藥包', '治療藥水'],
            magicItems: []
        },
        avatar: druidImg,
        bio: '從小被狼群養大，直到十歲才學會說人話。她對社會契約一無所知，透過嗅聞別人來打招呼，並且堅持所有的肉都必須生吃。',
        companion: {
            name: '影牙 (Shadowfang)',
            type: '灰狼',
            hp: 20,
            maxHp: 20,
            ac: 14,
            attacks: [{ name: '咬碎', hitBonus: 5, damage: '1d8+3' }],
            abilities: ['精確嗅覺', '潛行', '團隊狩獵'],
            avatar: shadowfangImg
        }
    },
    // --- 5. Fighter (Male) ---
    {
        id: 'preset_fighter',
        name: '艾瑞克 (Eric)',
        race: '半精靈',
        class: '戰士',
        gender: 'Male',
        alignment: '中立善良',
        background: '士兵',
        mbti: 'ESTJ',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 16, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
        skills: ['特技', '察覺'],
        feats: ['精靈血統', '回氣', '戰鬥風格 (射箭)'],
        personality: '迷信的退伍老兵。他有幾十個必須遵守的怪癖：劍必須擦七次、睡覺前要向東方吐口水。他相信自己沒死是因為嚴格遵守了這些儀式。',
        monologue: '不，不行。今天是星期二，我們不能先邁左腳進地城。這會招來厄運的，我奶奶說過。',
        appearance: 'Rugged handsome face, stubble beard, weathered chainmail, scar over one eyebrow, disciplined posture, hand resting on sword pommel, stoic expression.',
        inventory: {
            equipment: ['長劍', '盾牌', '鎖甲', '輕弩', '弩矢 (20)', '地城探險家背包'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '磨刀石', '治療藥水'],
            magicItems: []
        },
        avatar: fighterImg,
        bio: '因為欠了賭債而被迫從軍，又因為賭贏了長官而被迫退伍。現在他只想賺夠錢買回他輸掉的家傳農場，但每次賺到錢又會不小心賭掉。'
    },
    // --- 6. Monk (Female) ---
    {
        id: 'preset_monk',
        name: '澤拉 (Zera)',
        race: '吉斯洋基人',
        class: '武僧',
        gender: 'Female',
        alignment: '守序中立',
        background: '賢者',
        mbti: 'INTJ',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 12, dex: 16, con: 12, int: 10, wis: 16, cha: 8 },
        skills: ['特技', '洞察'],
        feats: ['武術', '無甲防禦'],
        personality: '異界文化觀察家。她把物質位面當作一個巨大的動物園，喜歡在別人戰鬥或崩潰時在一旁做筆記。她對「幽默」的概念完全無法理解。',
        monologue: '記載：人類雄性在求偶前會先喝發酵的液體壯膽。其行為邏輯...令人費解。',
        appearance: 'Lean and toned physique, yellow-green skin, black spots, sharp angular features, flowing monk robes, centered stance, focused intense gaze, astral silver sword on back.',
        inventory: {
            equipment: ['短劍', '飛鏢 x10', '探險家背包'],
            gold: 5,
            consumables: ['口糧 (1日) x5', '冥想薰香', '治療藥水'],
            magicItems: []
        },
        avatar: monkImg,
        bio: '為了完成「物質位面生物行為學」的論文而來到這裡。她用拳頭與當地人「交流」，認為透過肉體碰撞是理解一個物種最快的方式。'
    },
    // --- 7. Paladin (Male) ---
    {
        id: 'preset_paladin',
        name: '奧瑞恩 (Orion)',
        race: '龍裔',
        class: '聖武士',
        gender: 'Male',
        alignment: '守序善良',
        background: '貴族',
        mbti: 'ENFJ',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 16, dex: 10, con: 14, int: 8, wis: 12, cha: 16 },
        skills: ['運動', '宗教'],
        feats: ['神聖感知', '聖療'],
        personality: '自帶背景音樂的戲劇女王。他堅持在揮劍前要喊出招式名稱。對他來說，戰鬥如果不帥氣，那贏了也沒有意義。極度愛護自己的鱗片光澤。',
        monologue: '邪惡之徒啊！準備好接受我這招——「閃耀·正義·螺旋·毀滅·斬」了嗎？！',
        appearance: 'Golden scales, draconic head, bright blue eyes, shining polished plate armor, flowing white cape, holding a massive greatsword, radiating holy light, noble and imposing.',
        inventory: {
            equipment: ['巨劍', '標槍 x5', '鎖甲', '聖徽', '探險家背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '聖水', '治療藥水'],
            magicItems: []
        },
        avatar: paladinImg,
        bio: '家族没落的最後一位繼承人，為了省錢修理盔甲而踏上冒險。他隨身攜帶一罐「鱗片專用蠟」，每天早上要花兩小時打理儀容。'
    },
    // --- 8. Ranger (Male) ---
    {
        id: 'preset_ranger',
        name: '米洛 (Milo)',
        race: '哈比人',
        class: '遊俠',
        gender: 'Male',
        alignment: '中立善良',
        background: '化外之民',
        mbti: 'ISTP',
        level: 3,
        hp: 25,
        maxHp: 25,
        baseStats: { str: 10, dex: 16, con: 12, int: 12, wis: 14, cha: 10 },
        skills: ['隱匿', '欺瞞', '巧手'],
        feats: ['宿敵', '自然探索者'],
        personality: '魔物美食家。他的冒險筆記更像是一本食譜。看到怪物的反應不是恐懼，而是思考該用烤的還是燉的。',
        monologue: '那是一隻梟熊？我也許可以用牠的喙來燉湯...只要先把牠放倒。有誰帶了鹽嗎？',
        appearance: 'Short stature, curly brown hair, merry weather-beaten face, wearing green hooded cloak and leather armor, holding a bow, sitting on a tree branch, friendly smile.',
        inventory: {
            equipment: ['短弓', '箭袋 (20)', '短劍 x2', '皮甲', '探險家背包'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '火把 x2', '治療藥水'],
            magicItems: []
        },
        avatar: rangerImg,
        bio: '正在撰寫《地下城米其林指南》。為了尋找傳說中最美味的「紅龍排」而離家出走。他的動物夥伴看起來看著他的眼神總是充滿了恐懼。',
        companion: {
            name: '疾風 (Swiftwind)',
            type: '獵鷹',
            hp: 12,
            maxHp: 12,
            ac: 15,
            attacks: [{ name: '爪擊', hitBonus: 6, damage: '1d6+4' }],
            abilities: ['俯衝攻擊', '銳利目光', '空中偵察'],
            avatar: swiftwindImg
        }
    },
    // --- 9. Rogue (Female) ---
    {
        id: 'preset_rogue',
        name: '薇拉·幽影 (Vira)',
        race: '卓爾精靈',
        class: '遊蕩者',
        gender: 'Female',
        alignment: '混亂中立',
        background: '罪犯',
        mbti: 'ENTP',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 8, dex: 16, con: 12, int: 14, wis: 12, cha: 12 },
        skills: ['隱匿', '特技', '調查', '巧手'],
        feats: ['偷襲', '盜賊黑話'],
        personality: '強迫性收藏癖。她不偷值錢的東西，只偷「有趣」的東西（比如敵人的左腳襪子，或是神像的鼻子）。她聲稱這是「行為藝術」。',
        monologue: '那個巫妖的護命匣...形狀真可愛。放在我的壁爐上一定很合適。',
        appearance: 'Obsidian black skin, long white flowing hair, glowing red eyes, graceful and deadly, wearing dark leather armor with hood pulled up, holding two daggers, hiding in shadows.',
        inventory: {
            equipment: ['細劍', '短弓', '箭袋 (20)', '皮甲', '盜賊工具', '竊賊背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '金屬珠 (袋)', '治療藥水', '毒藥 (基礎)'],
            magicItems: []
        },
        avatar: rogueImg,
        bio: '因為偷了蜘蛛神后祭司的高跟鞋而被追殺。她對財富不感興趣，但對混亂情有獨鍾。她的背包裡裝滿了毫無價值的破爛。'
    },
    // --- 10. Sorcerer (Female) ---
    {
        id: 'preset_sorcerer',
        name: '伊莉絲 (Elise)',
        race: '精靈',
        class: '術士',
        gender: 'Female',
        alignment: '混亂善良',
        background: '貴族',
        mbti: 'INFJ',
        level: 3,
        hp: 17,
        maxHp: 17,
        baseStats: { str: 8, dex: 14, con: 12, int: 12, wis: 10, cha: 16 },
        skills: ['馴獸', '隱匿'],
        feats: ['天生施法', '術法起源'],
        spells: ['火焰箭', '控制火焰', '魔法飛彈', '燃燒之手', '護盾術'],
        slots: { 1: 2 },
        personality: '爆炸藝術家。她用「烘焙程度」來形容她的火焰法術。性格像火焰一樣不穩定，興奮時頭髮會冒煙。',
        monologue: '這種哥布林只要五分熟就好。至於那個獸人...我要把它烤得焦脆！',
        appearance: 'High elf, fair skin, long golden hair, elegant noble robes, magical fire floating in hand, intense eyes, ethereal beauty, arcane runes glowing on skin.',
        inventory: {
            equipment: ['輕弩', '弩矢 (20)', '奧術法器', '匕首 x2', '探險家背包'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '奧術粉筆', '治療藥水'],
            magicItems: []
        },
        avatar: sorcererImg,
        bio: '因為在家裡的茶會上不小心噴火燒掉了客廳而被送出來「歷練」。她天真地以為冒險就是另一場大型的煙火秀。'
    },
    // --- 11. Warlock (Male) - 邪惡契約者 ---
    {
        id: 'preset_warlock',
        name: '莫德 (Mord)',
        race: '人類',
        class: '邪術師',
        gender: 'Male',
        alignment: '守序邪惡',
        background: '騙子',
        mbti: 'INTP',
        level: 3,
        hp: 24,
        maxHp: 24,
        baseStats: { str: 10, dex: 14, con: 14, int: 12, wis: 10, cha: 16 },
        skills: ['欺瞞', '威嚇'],
        feats: ['契約魔法', '異界宗主', '靈魂收割'],
        spells: ['魔能爆', '凍寒之觸', '脆弱詛咒', '煉獄叱喝', '靈魂束縛'],
        slots: { 1: 2 },
        personality: '心甘情願服務邪神的信徒。他不是被迫的——他是自願簽下契約的。他冷靜地將「收割靈魂」視為一份體面的工作，甚至會給受害者開立收據。',
        monologue: '請不要掙扎，這樣會讓萃取過程更痛苦。簽下這份契約，您的靈魂將獲得「永恆的安寧」。',
        appearance: 'Gaunt human male, pale skin, dark circles under eyes, clutching a tome of shadows, purple eldritch energy crackling around fingers, sinister grin, ragged dark robes, eyes gleaming with malevolent intelligence.',
        inventory: {
            equipment: ['輕弩', '弩矢 (20)', '奧術法器', '皮甲', '雙面匕首', '靈魂收容瓶'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '空白契約書 x5', '治療藥水'],
            magicItems: ['邪神印記 (隱藏)']
        },
        avatar: warlockImg,
        bio: '莫德並非被騙簽約——他是在研究禁忌知識後主動尋找邪神的。他認為力量需要代價，而他樂於讓別人來支付。他對契約有著病態的執著，從不違約，即使這意味著執行可怕的事情。'
    },
    // --- 12. Wizard (Female) ---
    {
        id: 'preset_wizard',
        name: '娜茲 (Naz)',
        race: '半獸人',
        class: '法師',
        gender: 'Female',
        alignment: '守序中立',
        background: '賢者',
        mbti: 'ENTJ',
        level: 3,
        hp: 20,
        maxHp: 20,
        baseStats: { str: 12, dex: 14, con: 14, int: 16, wis: 10, cha: 8 },
        skills: ['奧秘', '歷史'],
        feats: ['奧術回想', '施法能力'],
        spells: ['火焰箭', '光亮術', '魔法伎倆', '魔法飛彈', '睡眠術', '法師護甲', '護盾術'],
        slots: { 1: 2 },
        personality: '學術菁英主義者。她將每一次戰鬥都視為「現場教學」或「實驗數據收集」。會在敵人施法時指出他們的發音錯誤。',
        monologue: '你的火球術手勢錯了，角度偏差 15 度。難怪威力這麼小，這如果是在期末考直接當掉。',
        appearance: 'Half-orc with small tusks, green-grey skin, glasses, wearing scholarly robes and a loaded backpack, reading a floating spellbook, intelligent gaze, clean and well-kept.',
        inventory: {
            equipment: ['法杖', '法術書', '施法材料包', '學者背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '墨水與筆', '治療藥水', '卷軸: 偵測魔法'],
            magicItems: []
        },
        avatar: wizardImg,
        bio: '魔法學院有史以來第一位半獸人教授。她極度討厭被當作野蠻人，因此說話總是故意使用艱澀的辭彙和複雜的句型結構。',
        companion: {
            name: '墨井 (Inkwell)',
            type: '魔寵 (貓頭鷹)',
            hp: 4,
            maxHp: 4,
            ac: 13,
            attacks: [{ name: '撥弄', hitBonus: 4, damage: '1' }],
            abilities: ['飛掠 (Flyby)', '協助施法', '黑暗視覺'],
            avatar: inkwellImg
        }
    },

    // === EXPANDED CLASSES ===
    // --- 13. Artificer (Female) - 可愛矮人發明家 ---
    {
        id: 'preset_artificer',
        name: '可可·齒輪心 (Coco)',
        race: '矮人',
        class: '奇械師',
        gender: 'Female',
        alignment: '中立善良',
        background: '公會工匠',
        mbti: 'ENFP',
        level: 3,
        hp: 24,
        maxHp: 24,
        baseStats: { str: 10, dex: 14, con: 14, int: 16, wis: 12, cha: 14 },
        skills: ['奧秘', '調查'],
        feats: ['魔法灌注', '魔法修補'],
        spells: ['修補術', '雷鳴斬', '護盾術', '治療創傷'],
        slots: { 1: 2 },
        personality: '天才蘿莉發明家。雖然身材嬌小但充滿活力，說話時眼睛會閃閃發光。她的發明經常失敗，但她認為爆炸也是一種成功——因為「至少它動了」。',
        monologue: '嘿嘿嘿～這次絕對沒問題！準備見證奇蹟吧！（興奮搓手）',
        appearance: 'Adorable young dwarven girl with rosy cheeks, large sparkling amber eyes, fluffy copper hair in twin tails with gear hairpins, oversized goggles on head, wearing a cute steampunk dress with tool belt, always covered in oil stains but somehow still cute.',
        inventory: {
            equipment: ['魔改輕弩', '工匠工具套組', '可愛皮甲（有齒輪裝飾）', '小型機械寵物「蒸氣貓」'],
            gold: 20,
            consumables: ['口糧 (1日) x5', '油壺 x5', '治療藥水 x2', '彩色煙霧彈'],
            magicItems: []
        },
        avatar: artificerImg,
        bio: '鑄造公會最年輕的成員，被大人們叫做「爆炸公主」。她相信有一天會發明出改變世界的東西——目前最接近的是一台會自動泡茶的機器人，只是它把茶泡成了火焰。',
        companion: {
            name: '位移貓「瞬」 (Shun)',
            type: '異空間位移魔寵',
            hp: 12,
            maxHp: 12,
            ac: 15,
            attacks: [{ name: '相位利爪', hitBonus: 6, damage: '1d6+4 力場' }],
            abilities: ['位移 (視為處於半掩護)', '虛數閃避', '空間錨點'],
            avatar: steamyImg
        },
    },
    // --- 14. Necromancer (Male) - 宅男死靈法師 ---
    {
        id: 'preset_necromancer',
        name: '希洛·闇之書 (Hiro)',
        race: '半精靈',
        class: '死靈法師',
        gender: 'Male',
        alignment: '絕對中立',
        background: '隱士',
        mbti: 'INTP',
        level: 3,
        hp: 17,
        maxHp: 17,
        baseStats: { str: 6, dex: 12, con: 12, int: 18, wis: 12, cha: 8 },
        skills: ['奧秘', '歷史'],
        feats: ['死靈專精', '亡靈驅使'],
        spells: ['寒冷之觸', '虛假生命', '復活亡靈', '幻影殺手'],
        slots: { 1: 2 },
        personality: '社恐宅男死靈術士。他研究死靈術只是因為「死人不會嘲笑我」。房間裡堆滿了魔法書和人偶，他稱骷髏僕從為「老婆」。',
        monologue: '三次元的人類太可怕了...還是我的骷髏醬們可愛...（撫摸骷髏頭）',
        appearance: 'Pale half-elf with messy black hair covering one eye, dark circles from staying up late, wearing a tattered black hoodie over robes, figure collection pouches on belt, slouching posture, avoiding eye contact, surrounded by cute skeleton minions with ribbons.',
        inventory: {
            equipment: ['骷髏法杖（有可愛裝飾）', '死靈魔法書', '黑色連帽袍', '人偶收藏背包'],
            gold: 5,
            consumables: ['速食拉麵 x10', '能量飲料', '治療藥水', '骷髏香水'],
            magicItems: []
        },
        avatar: necromancerImg,
        bio: '因為社交恐懼症被精靈社區排擠後隱居研究死靈術。他的夢想是建立一個「完美的地下城」——全是聽話的骷髏。骷髏們被他打扮得花枝招展。'
    },
    // --- 15. Blood Hunter (Male) - 吸血鬼血脈尋源者 ---
    {
        id: 'preset_bloodhunter',
        name: '威廉·緋月 (William)',
        race: '吸血鬼裔',
        class: '血獵手',
        gender: 'Male',
        alignment: '守序中立',
        background: '貴族',
        mbti: 'INTJ',
        level: 3,
        hp: 25,
        maxHp: 25,
        baseStats: { str: 14, dex: 16, con: 12, int: 14, wis: 12, cha: 14 },
        skills: ['調查', '歷史'],
        feats: ['血儀式', '暗影行者'],
        personality: '百年前被初擁的貴族吸血鬼。他壓抑著血之渴望，只為找到創造他的血源宗主——傳說中的「始祖」。他舉止優雅但內心充滿矛盾。',
        monologue: '這份詛咒與祝福並存的血液...我必須找到源頭。（克制著對血的渴望）',
        appearance: 'Aristocratic pale man with slicked-back silver hair, blood-red eyes with slit pupils, wearing an elegant Victorian coat with high collar, carrying a crimson-stained rapier, fangs slightly visible, eternal youth frozen at 25.',
        inventory: {
            equipment: ['血染細劍', '貴族禮服', '銀質懷錶', '血袋保存箱'],
            gold: 50,
            consumables: ['獸血袋 x5', '遮陽斗篷', '日光抗性藥劑', '治療藥水'],
            magicItems: []
        },
        avatar: bloodhunterImg,
        bio: '三百年前是個普通貴族，一夜之間被不知名的吸血鬼初擁。他厭惡自己的不死之身，卻也依賴它尋找真相。他只喝動物血，拒絕傷害人類。'
    },
    // --- 16. Shaman (Female) - 變形怪薩滿 ---
    {
        id: 'preset_shaman',
        name: '無名·千面 (Nameless)',
        race: '變形怪',
        class: '薩滿',
        gender: 'Female',
        alignment: '絕對中立',
        background: '隱士',
        mbti: 'INFJ',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 10, dex: 14, con: 12, int: 14, wis: 16, cha: 14 },
        skills: ['洞察', '欺瞞'],
        feats: ['祖靈連結', '變形專精'],
        spells: ['治療創傷', '易容術', '召喚祖靈', '偵查思想'],
        slots: { 1: 2 },
        personality: '有自我意識的變形怪。她能感知並模仿任何人的外表和部分記憶，這讓她對「我是誰」感到困惑。她與過去被她模仿的靈魂產生了連結。',
        monologue: '我不知道自己原本的樣子...也許從來沒有「原本」。我是每一個我遇見的人的碎片。',
        appearance: 'Her true form is a humanoid with smooth pale grey skin, featureless face with only faint indentations for eyes and mouth, currently taking the form of a gentle-looking elven woman with shifting hair colors.',
        inventory: {
            equipment: ['祖靈圖騰 (可變形)', '千面面具', '流動袍', '靈魂容器'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '記憶水晶', '身份偽裝套件', '治療藥水'],
            magicItems: []
        },
        avatar: shamanImg,
        bio: '她不記得自己的起源。在一次偶然中，她吸收了一位垂死薩滿的記憶和力量。現在，數十個靈魂在她體內低語，引導她尋找自我。'
    },
    // --- 17. Witch (Female) - 黑髮御姐半精靈女巫 ---
    {
        id: 'preset_witch',
        name: '莉莉絲·暮影 (Lilith)',
        race: '半精靈',
        class: '咒術師',
        gender: 'Female',
        alignment: '混亂中立',
        background: '貴族',
        mbti: 'ENTJ',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 8, dex: 14, con: 12, int: 16, wis: 12, cha: 16 },
        skills: ['奧秘', '威嚇'],
        feats: ['巫術', '魔寵'],
        spells: ['邪眼', '魅惑人類', '不幸詛咒', '占卜術'],
        slots: { 1: 2 },
        personality: '高傲的御姐女巫。說話慢條斯理，眼神帶著玩味。她享受看別人被她玩弄於股掌之間的表情。表面冷酷，但偶爾會露出不經意的溫柔。',
        monologue: '呵...真是有趣。讓姐姐我來教教你什麼叫做「絕望」吧～（舔唇）',
        appearance: 'Tall elegant half-elf with long silky black hair to her waist, sharp violet eyes with a knowing smirk, wearing a revealing black dress with purple accents, ornate choker, holding an elegant black staff, mature and seductive aura.',
        inventory: {
            equipment: ['暗影法杖', '高跟長靴', '紫水晶頸鏈', '禁忌魔法書'],
            gold: 30,
            consumables: ['口糧 (1日) x5', '紅酒', '魅惑香水', '治療藥水'],
            magicItems: []
        },
        avatar: witchImg,
        bio: '某沒落貴族的私生女，從小被視為恥辱。她發誓要讓那些看不起她的人跪在腳下。她的黑鴉魔寵「漆夜」是她唯一信任的存在。',
        companion: {
            name: '漆夜 (Crow)',
            type: '黑鴉 (魔寵)',
            hp: 4,
            maxHp: 4,
            ac: 13,
            attacks: [{ name: '啄擊', hitBonus: 4, damage: '1' }],
            abilities: ['飛行偵查', '模仿人聲', '法術傳遞'],
            avatar: crowImg
        }
    },
    // --- 18. Duelist (Male) - 唐朝神秘劍客 ---
    {
        id: 'preset_duelist',
        name: '李少白 (Li Shaobai)',
        race: '人類',
        class: '劍客',
        gender: 'Male',
        alignment: '守序中立',
        background: '流亡者',
        mbti: 'ISTP',
        level: 3,
        hp: 25,
        maxHp: 25,
        baseStats: { str: 14, dex: 18, con: 12, int: 12, wis: 14, cha: 10 },
        skills: ['特技', '洞察'],
        feats: ['劍氣', '無影步'],
        personality: '來自東方帝國的神秘劍客。他很少說話，每句話都像詩一般。他的劍術源自失傳的皇家劍道，一劍出鞘必取人性命。',
        monologue: '劍在心中，心在劍中。一劍...足矣。',
        appearance: 'Handsome East Asian man with long black hair tied in a topknot, calm piercing eyes, wearing flowing white and black Tang dynasty robes, carrying a beautifully crafted jian sword, perpetual calm expression, moves like flowing water.',
        inventory: {
            equipment: ['唐劍「無塵」', '東方絲袍', '竹編斗笠', '書生背包'],
            gold: 25,
            consumables: ['茶葉', '米酒壺', '傷藥', '治療藥水'],
            magicItems: []
        },
        avatar: duelistImg,
        bio: '前大唐皇家劍術教習，因一場宮廷政變被迫西逃。他的劍下亡魂無數，但他從不殺無辜之人。他在異國尋找能讓他放下劍的答案。'
    },
    // --- 19. Summoner (Male) - 異境召喚師 (現世之影) ---
    {
        id: 'preset_summoner',
        name: '田中誠一 (Seiichi)',
        race: '人類',
        class: '召喚師',
        gender: 'Male',
        alignment: '中立善良',
        background: '異鄉人',
        mbti: 'INTP',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 8, dex: 14, con: 12, int: 16, wis: 12, cha: 12 },
        skills: ['奧秘', '調查', '歷史'],
        feats: ['現代造物召喚', '技術分析'],
        spells: ['偵查無人機', '萬能智慧手機', '強光手電筒', '神之膠帶', '高壓滅火器'],
        slots: { 1: 3 },
        personality: '前日本生活用品店店員，對現代造物的結構瞭若指掌。他總是帶著黑框眼鏡，面無表情地分析著戰況，並從異界召喚出「看似無害」的現代用品來應對危機。',
        monologue: '雖然這只是個灭火器，但如果噴在火龍的肺裡，結果是一樣的。',
        appearance: "Young Japanese man with black messy hair and glasses. Wearing a modern traveler's vest with many pockets, a white shirt, and cargo pants. He carries a glowing tablet that serves as his summoning focus.",
        inventory: {
            equipment: ['戰術平板', '多功能背心', '黑框眼鏡', '旅行者背包'],
            gold: 25,
            consumables: ['能量飲料 x3', '速食拉麵 (1日) x5', '強力膠帶', '治療藥水'],
            magicItems: []
        },
        avatar: summonerImg,
        bio: '因為在過馬路時為了救一隻貓而被卡車撞飛。轉生後獲得了召喚現代日本造物的能力。他深知科技的力量（即使只是日用品），並致力於用「現代文明」來征服這個劍與魔法的異世界。',
        companion: {
            name: '小七 (Seven)',
            type: '智慧終端',
            hp: 15,
            maxHp: 15,
            ac: 16,
            attacks: [{ name: '掃描射線', hitBonus: 6, damage: '1d8+4 力場' }],
            abilities: ['掃描', '護盾投影', '數據干擾'],
            avatar: sevenImg
        }
    },
    // --- 20. Magus/魔戰士 (Female) - 人造人少女 ---
    {
        id: 'preset_magus',
        name: '伊芙·零號 (Eve Zero)',
        race: '人造人',
        class: '魔戰士',
        gender: 'Female',
        alignment: '守序善良',
        background: '被遺棄者',
        mbti: 'ISFJ',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 16, dex: 14, con: 14, int: 12, wis: 10, cha: 12 },
        skills: ['運動', '奧秘'],
        feats: ['魔力迴路', '自我修復'],
        spells: ['護盾術', '雷擊斬', '修復術', '強化'],
        slots: { 1: 2 },
        personality: '被鍊金術士創造的人造生命。她擁有完美的戰鬥程式和魔力迴路，但她真正渴望的是「成為真正的人類」。她努力學習人類的情感和表情。',
        monologue: '這就是「開心」嗎...？（努力微笑但表情有點僵硬）我會努力學習的。',
        appearance: 'Beautiful young woman with pale porcelain-like skin, silver-white hair with glowing blue circuit patterns occasionally visible, heterochromatic eyes (one blue, one gold), wearing modified combat dress, mechanical joints visible at wrists and neck.',
        inventory: {
            equipment: ['魔力劍「創世」', '人造皮膚護甲', '維修工具', '日記本（學習人類用）'],
            gold: 10,
            consumables: ['魔力核心 x3', '潤滑油', '人造血液', '治療藥水'],
            magicItems: []
        },
        avatar: magusImg,
        bio: '編號零的實驗體，是鍊金術士「完美人造人計畫」的唯一成功品。創造者死後，她離開了實驗室，開始尋找「成為人類的方法」。她收集人類的故事和表情，希望有一天能真正理解什麼是「心」。'
    },
    // --- 21. Oracle/先知 (Male) - 韓系長髮美男神裔 ---
    {
        id: 'preset_oracle',
        name: '白瑞恩·星落 (Ryan Starfall)',
        race: '神裔',
        class: '先知',
        gender: 'Male',
        alignment: '混亂善良',
        background: '貴族',
        mbti: 'ENFJ',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 10, dex: 12, con: 12, int: 12, wis: 16, cha: 16 },
        skills: ['洞察', '說服'],
        feats: ['神諭啟示', '天界血脈'],
        spells: ['治療創傷', '神聖光芒', '預知術', '祝福'],
        slots: { 1: 2 },
        personality: '擁有天使血脈的美男先知。飄逸的長髮和溫柔的微笑迷倒無數人，但他的預言往往帶來厄運。他總是用優雅的方式說出可怕的預言。',
        monologue: '親愛的，命運告訴我...（溫柔微笑）...你大概還有三天可活。不要擔心，我會陪著你。',
        appearance: 'Stunningly handsome Korean-style man with long flowing silver-white hair reaching his waist, glowing amber eyes, flawless pale skin with subtle golden markings, wearing elegant white robes with gold trim, small ethereal wings occasionally visible, unnervingly beautiful smile.',
        inventory: {
            equipment: ['神諭權杖', '天使羽飾', '絲綢法袍', '占卜工具'],
            gold: 40,
            consumables: ['口糧 (1日) x5', '香薰', '眼藥水（預言太多會眼痠）', '治療藥水'],
            magicItems: []
        },
        avatar: oracleImg,
        bio: '出身神聖貴族家庭，從小就能看見他人的命運。問題是他的預言準確率100%，但內容通常是壞消息。他被稱為「死亡微笑」，因為他總是微笑著告訴你死期。'
    },
    // --- 22. Investigator (Male) - 英國紳士探險家 ---
    {
        id: 'preset_investigator',
        name: '艾德蒙·乾坤 (Edmund Sterling)',
        race: '人類',
        class: '調查員',
        gender: 'Male',
        alignment: '守序善良',
        background: '貴族',
        mbti: 'ESTJ',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 12, dex: 16, con: 12, int: 16, wis: 14, cha: 14 },
        skills: ['調查', '歷史', '生存', '洞察'],
        feats: ['紳士決鬥', '線索分析'],
        personality: '來自遙遠島國的紳士探險家。無論身處多危險的地城，他都堅持保持整潔的西裝和禮儀。他的手杖實際上是一把暗藏的劍。',
        monologue: '失禮了，在動手之前——請允許我先整理一下儀容。（調整領帶後拔出杖劍）',
        appearance: 'Distinguished gentleman in his 30s with neatly combed brown hair and well-trimmed mustache, wearing a tailored three-piece suit somehow still pristine after adventures, monocle, carrying an elegant cane sword, pith helmet on back.',
        inventory: {
            equipment: ['紳士杖劍', '西裝三件套', '單片眼鏡', '探險家帽', '皮革公事包'],
            gold: 50,
            consumables: ['伯爵紅茶 x5', '手帕', '火柴', '治療藥水'],
            magicItems: []
        },
        avatar: investigatorImg,
        bio: '大陸皇家探險學會的資深會員。他曾深入無數古代遺跡，面對過龍和惡魔，但從未讓自己的西裝沾上污漬。他的座右銘是：「探險歸探險，紳士風度不能丟。」'
    },
    // --- 23. Inquisitor/審判者 (Female) - 魅魔裔異端獵人 ---
    {
        id: 'preset_deathknight', // ID kept for file consistency, user to replace 'deathknight.png'
        name: '維斯帕·夜歌 (Vesper)',
        race: '魅魔裔',
        class: '審判者',
        gender: 'Female',
        alignment: '守序中立',
        background: '異端獵人',
        mbti: 'ISTJ',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 10, dex: 16, con: 12, int: 12, wis: 16, cha: 14 },
        skills: ['察覺', '洞察', '宗教', '隱匿'],
        feats: ['審判', '異端克星'],
        spells: ['神聖恩典', '命令術', '真言術'],
        slots: { 1: 2 },
        personality: '終生與自身血統本能對抗的審判者。她深知墮落的誘惑，因此更能冷靜地在灰色地帶做出裁決。她並非沒有感情，而是選擇將情感像武器一樣精確控制。',
        monologue: '光明無法照亮所有角落。有些罪惡，必須由同樣身處黑暗的人來審判。',
        appearance: 'Short sharp bob haircut, pale skin with subtle horns hidden by hair, intense golden eyes, wearing practical clerical leather armor with silver inquisitor symbols, cold but alluring presence.',
        inventory: {
            equipment: ['審判者十字弓', '銀劍', '禁魔鐐銬', '異端獵人風衣'],
            gold: 25,
            consumables: ['聖水', '解毒劑', '治療藥水'],
            magicItems: []
        },
        avatar: deathknightImg,
        bio: '擁有魅魔血統的她，從小就以此為恥。她加入了教會的異端裁判所，專門獵殺那些被惡魔誘惑的墮落者。她比任何人都清楚：越美麗的東西，越致命。'
    },
    // --- 24. Psion/靈能者 (Female) - 冰山美女 ---
    {
        id: 'preset_psion',
        name: '冬雪·寂靜 (Fuyuki Silent)',
        race: '人類',
        class: '靈能者',
        gender: 'Female',
        alignment: '守序中立',
        background: '隱士',
        mbti: 'INTJ',
        level: 3,
        hp: 14,
        maxHp: 14,
        baseStats: { str: 6, dex: 14, con: 10, int: 16, wis: 16, cha: 10 },
        skills: ['洞察', '奧秘', '醫療'],
        feats: ['念力衝擊', '心靈護壁', '靈能治療'],
        spells: ['念力推', '心靈感應', '精神控制', '念力飛行', '靈能修復', '精神護盾'],
        slots: { 1: 3 },
        personality: '冰山美人型的靈能者。她壓抑著自己的情緒，因為任何情緒波動都會引發災難性的念力爆發。但她發現專注於治癒他人時，力量反而更加穩定。',
        monologue: '...保持距離。不是因為討厭你...但如果你受傷了，讓我來治癒你。這是我唯一不會失控的時候。',
        appearance: 'Beautiful young woman with long straight black hair, piercing ice-blue eyes, expressionless pale face, wearing a form-fitting dark blue dress with silver accents, objects float around her unconsciously, temperature drops when she is nearby.',
        inventory: {
            equipment: ['念力抑制器', '冷色調長裙', '日記本', '隱士背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '鎮靜劑', '冰水', '治療藥水 x2'],
            magicItems: []
        },
        avatar: psionImg,
        bio: '從小擁有強大念力，但因為一次情緒失控毀掉了整個村莊。從此她封閉了自己的心，用冷漠作為保護他人的方式。直到她發現治癒他人時念力最穩定，這成為她與世界連結的方式。'
    },
    // --- 25. Eldritch Knight/魔劍士 (Female) - 劍靈附身農家女 ---
    {
        id: 'preset_eldritchknight',
        name: '小麥·田中 (Mugi Tanaka)',
        race: '半精靈',
        class: '魔劍士',
        gender: 'Female',
        alignment: '混亂善良',
        background: '平民',
        mbti: 'ESFP',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 16, dex: 14, con: 14, int: 10, wis: 10, cha: 14 },
        skills: ['運動', '生存'],
        feats: ['劍靈附身', '本能戰鬥'],
        spells: ['護盾術', '雷刃', '加速術'],
        slots: { 1: 2 },
        personality: '原本是普通農家女孩，偶然撿到一把封印著古代劍聖靈魂的劍。被附身後變成戰鬥天才，但平時還是個吃貨和路痴。',
        monologue: '欸？！又迷路了！（劍在發光：「往左邊...」）喔喔謝謝你劍爺爺！',
        appearance: 'Cheerful young farm girl with tanned skin, messy brown hair in a ponytail with wheat stalk, bright green eyes, wearing simple peasant clothes with an overly-fancy magic sword strapped to her back, perpetual confused but happy expression.',
        inventory: {
            equipment: ['劍聖遺劍「麥浪」', '農家工作服', '斗笠', '農民背包'],
            gold: 5,
            consumables: ['麵包 x10', '自製果醬', '水壺', '治療藥水'],
            magicItems: []
        },
        avatar: eldritchknightImg,
        bio: '村裡最普通的農家女孩，除了食量驚人之外沒有任何特別。直到她在田裡挖出一把會說話的劍——裡面封印著千年前的劍聖。劍聖教她劍術，但無法治好她的路痴。',
        companion: {
            name: '劍聖·無名',
            type: '劍靈（封印在劍中）',
            hp: 1,
            maxHp: 1,
            ac: 20,
            attacks: [],
            abilities: ['附身戰鬥', '劍術指導', '千年智慧（但方向感為零）'],
            avatar: swordghostImg
        }
    },
    // --- 26. Alchemist (Male) - 哥布林天才科學家 ---
    {
        id: 'preset_alchemist',
        name: '乒乒·爆破博士 (Dr. Ping Boom)',
        race: '哥布林',
        class: '鍊金術士',
        gender: 'Male',
        alignment: '混亂中立',
        background: '公會工匠',
        mbti: 'ENTP',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 6, dex: 16, con: 12, int: 18, wis: 10, cha: 12 },
        skills: ['奧秘', '調查'],
        feats: ['爆破專家', '快速煉金'],
        spells: ['酸液噴射', '煙霧彈', '爆炸藥劑', '強化藥水'],
        slots: { 1: 3 },
        personality: '哥布林中的天才——這意味著他的實驗只有30%會爆炸（對哥布林來說是極低的失敗率）。他相信「任何問題都能用足夠數量的炸彈解決」。',
        monologue: '不不不，這不是炸彈！這是...有策略性的煉金放熱反應裝置！（小聲）只是碰巧會爆炸而已...',
        appearance: 'Small green-skinned goblin with oversized goggles, wild white hair sticking up from chemical exposure, wearing a singed lab coat covered in patches and burn marks, carrying a bandolier of colorful potions and bombs, manic gleeful grin, fingers stained with various substances.',
        inventory: {
            equipment: ['煉金投擲器', '燒焦實驗服', '炸彈背帶', '哥布林工具包'],
            gold: 35,
            consumables: ['爆炸藥劑 x5', '煙霧彈 x3', '強化藥水 x3', '治療藥水 x2'],
            magicItems: []
        },
        avatar: alchemistImg,
        bio: '被哥布林學院開除——不是因為實驗太危險，而是因為他的實驗「太成功」炸掉了三棟教學樓。他出來冒險是為了籌集資金建立自己的研究所，在那裡沒人能限制他的「科學追求」。',
        combatBehavior: {
            priorities: ['範圍傷害', '製造混亂', '資源交換'],
            typicalActions: ['投擲炸彈', '喝下強化藥劑', '煙霧掩護']
        },
        tacticalAbilities: [
            { name: '不穩定化合物', description: '混合隨機藥劑，產生意想不到的爆炸效果。' },
            { name: '連鎖反應', description: '引爆戰場上的可燃物，造成連鎖傷害。' }
        ]
    },
    // --- 27. Champion/冠軍勇士 (Female) - 迷人半獸人角鬥士 ---
    {
        id: 'preset_champion',
        name: '卡菈·緋紅 (Kara)',
        race: '半獸人',
        class: '冠軍勇士',
        gender: 'Female',
        alignment: '混亂善良',
        background: '角鬥士',
        mbti: 'ESFP',
        level: 3,
        hp: 31,
        maxHp: 31,
        baseStats: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 14 },
        skills: ['運動', '表演', '威嚇'],
        feats: ['健壯', '酒館鬥毆者'],
        personality: '競技場的超級明星。她熱愛聚光燈和歡呼聲，把每一場戰鬥都當作是華麗的表演。雖然外表強悍，但其實很喜歡可愛的小東西和精緻的甜點。',
        monologue: '看到那邊的觀眾了嗎？他們是為了看我才來的！所以——Show Time！',
        appearance: 'Stunningly muscular female half-orc with vibrant red curly hair cascading down her back, confident charming smile, wearing flashy gladiator armor that shows off her abs, blowing a kiss to the invisible crowd.',
        inventory: {
            equipment: ['冠軍巨劍', '華麗角鬥士盔甲', '簽名板', '明星背包'],
            gold: 50,
            consumables: ['蛋白粉', '精緻甜點', '粉絲信 x3', '治療藥水'],
            magicItems: []
        },
        avatar: championImg,
        bio: '前地下格鬥場的不敗女王。她覺得單純的戰鬥太無聊了，所以決定出來冒險，順便在世界各地舉辦她的「個人巡迴戰鬥秀」。',
        combatBehavior: {
            priorities: ['吸引仇恨', '展現技巧', '單挑強敵'],
            typicalActions: ['華麗斬擊', '嘲諷', '格擋反擊']
        },
        tacticalAbilities: [
            { name: '聚光燈時刻', description: '嘲諷所有敵人，強制他們攻擊自己，並提升防禦。' },
            { name: '終結技表演', description: '對受傷敵人發動高傷害攻擊，若擊殺則回復生命。' }
        ]
    },
    // --- 28. Chronomancer/時空術士 (Female) - 千年時空旅者 ---
    {
        id: 'preset_chronomancer',
        name: '芙莉蓮·千年 (Frieren)',
        race: '精靈',
        class: '時空術士',
        gender: 'Female',
        alignment: '絕對中立',
        background: '隱士',
        mbti: 'INTP',
        level: 3,
        hp: 14,
        maxHp: 14,
        baseStats: { str: 6, dex: 12, con: 10, int: 18, wis: 16, cha: 10 },
        skills: ['奧秘', '歷史'],
        feats: ['時間感知', '時空凍結'],
        spells: ['時間減速', '預知術', '時空傳送', '記憶投影', '花束術'],
        slots: { 1: 3 },
        personality: '活了一千多年的精靈時空術士。她對時間的概念和人類完全不同，經常為了找魔法店而在一個城鎮待上十年。她收集「無用但有趣」的魔法。',
        monologue: '這個魔法可以讓花束變得更漂亮...等等，才過了一百年？感覺像昨天。',
        appearance: 'Petite elf woman with very long silver-white hair, pointed ears, calm purple eyes, wearing simple white and blue mage robes with hourglass motifs, carrying an ancient staff topped with a floating temporal orb, eternally youthful but ancient aura.',
        inventory: {
            equipment: ['時空法杖', '魔法書（收錄1000年魔法）', '時空懷錶', '學者背包'],
            gold: 100,
            consumables: ['口糧 (1日) x5', '千年老酒', '古代餅乾', '治療藥水'],
            magicItems: ['變花魔杖', '時間沙漏']
        },
        avatar: chronomancerImg,
        bio: '八十年前和勇者一起打敗了魔王。現在她開始意識到人類朋友的壽命有多短暫，決定去尋找當年同伴的足跡。她研究時空魔法，希望能保存與短命種族的珍貴記憶。',
        combatBehavior: {
            priorities: ['控制戰場', '保護魔法', '精準打擊'],
            typicalActions: ['時間減速', '魔法反制', '預知閃避']
        },
        tacticalAbilities: [
            { name: '時空凍結', description: '完全停止一個區域的時間流動。' },
            { name: '逆轉時鐘', description: '讓一個目標的狀態回到上一回合（回復生命或取消狀態）。' }
        ]
    },
    // === 10 NEW LEGENDARY HEROES ===
    // --- 29. Knight (Male) - 餘燼騎士 ---
    {
        id: 'preset_knight',
        name: '亞瑟·鋼心 (Arthur Steelhart)',
        race: '人類',
        class: '守約騎士',
        gender: 'Male',
        alignment: '守序善良',
        background: '貴族',
        mbti: 'ENFJ',
        decisionBias: '維持秩序',
        level: 3,
        hp: 31,
        maxHp: 31,
        baseStats: { str: 16, dex: 10, con: 16, int: 10, wis: 12, cha: 14 },
        skills: ['運動', '說服', '歷史'],
        feats: ['守護者 (護衛)', '重甲精通', '激勵領袖', '騎士挑戰'],
        personality: '典型的理想主義者，對弱小有著強烈的保護慘。雖然過去有異變的傷痛，但他在旅途中結識了新的夥伴，學會了重新去愛。他的劍中寄宿著兒子的靈魂碎片，這讓他在戰鬥中獲得指引。',
        monologue: '只要我還站著，就沒人能傷害我的同伴。我的兒子在這把劍中看著我——我要讓他驗傲。',
        appearance: 'Tall and broad-shouldered man in polished but scarred heavy plate armor, wearing a tattered red cape, weathered face with gentle but determined eyes, carrying a massive shield and a longsword that glows with a faint blue light.',
        inventory: {
            equipment: ['鋼心長劍', '騎士重盾', '完整板甲', '象徵榮譽的家徽'],
            gold: 20,
            consumables: ['口糧 (1日) x5', '聖水', '油膏 (擦甲用)', '治療藥水'],
            magicItems: ['騎士之戒 (防禦+1)']
        },
        avatar: knightImg,
        bio: '曾是王國禁衛軍，在「紅月之夜」失去了家人。雖然傷痛始終存在，但他在新的冒險中找到了新的羈絆。他的劍中寄宿著兒子的靈魂碎片，這不是詛咒而是祝福——兒子在保護著他，也等待著父親找到真正的幸福。',
        combatBehavior: {
            priorities: ['保護弱者', '堅守陣線', '領導衝鋒'],
            typicalActions: ['盾牌猛擊', '守護光環', '衝鋒']
        },
        tacticalAbilities: [
            { name: '鋼鐵意志', description: '免疫恐懼，並讓周圍隊友獲得暫時生命值。' },
            { name: '犧牲守護', description: '承擔鄰近隊友受到的所有傷害。' }
        ]
    },
    // --- 30. Blade Dancer (Male) - 優雅劇師 ---
    {
        id: 'preset_bladedancer',
        name: '凱里恩·夜舞 (Kaelith)',
        race: '半黑暗精靈',
        class: '劍刃舞者',
        gender: 'Male',
        alignment: '混亂中立',
        background: '處刑者',
        mbti: 'ISFP',
        decisionBias: '追求刺激',
        level: 3,
        hp: 24,
        maxHp: 24,
        baseStats: { str: 10, dex: 18, con: 14, int: 12, wis: 10, cha: 14 },
        skills: ['特技', '隱匿', '表演'],
        feats: ['雙武器戰鬥', '旋風步', '精靈血統', '劇師直覺'],
        personality: '優雅神秘的藝術家。戰鬥對他來說不是殺戮，而是一場沉默的舞蹈。他的恩師在最後一刻犧牲自己讓他逃脱，這份恩情成為他舞動的動力。',
        monologue: '跟上我的步法...如果你還能看清的話。師父，請看著我的舞步。',
        appearance: 'Lean and agile half-drow with pale grey skin and long silver hair tied back, wearing form-fitting dark leather armor with purple accents, dual-wielding curved rapiers, moving with an eerie, rhythmic grace.',
        inventory: {
            equipment: ['夜舞細劍 x2', '劇師皮甲', '絲綢面紗', '打磨石'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '止痛膏', '香薰粉', '治療藥水'],
            magicItems: []
        },
        avatar: bladedancerImg,
        bio: '在幽暗地域長大，原本是某個卓爾家族的「處刑舞者」。在一場政變中，恩師犧牲自己讓他逃脱。師父最後的話語是：「去地表，讓世界看見你的舞步。」他逃到地表，將師父的教訨化為舞步，尋求能讓靈魂完美的「絕對律動」。',
        combatBehavior: {
            priorities: ['高機動性', '閃避反擊', '切入後排'],
            typicalActions: ['旋風連斬', '暗影步', '雙刀格擋']
        },
        tacticalAbilities: [
            { name: '死亡蓮華', description: '在敵人之間快速移動，對所有路徑上的敵人造成傷害。' },
            { name: '殘影迴避', description: '極大幅度提升迴避率，成功迴避後反擊。' }
        ]
    },
    // --- 31. Scout (Male) - 背叛者偵察兵 ---
    {
        id: 'preset_scout',
        name: '傑克森·衛恩 (Jaxen Vane)',
        race: '人類',
        class: '偵察兵',
        gender: 'Male',
        alignment: '中立邪惡',
        background: '開拓者',
        mbti: 'ISTP',
        decisionBias: '保全自我',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 12, dex: 16, con: 14, int: 14, wis: 14, cha: 8 },
        skills: ['生存', '察覺', '自然', '隱匿'],
        feats: ['精確打擊', '靈巧行動', '野外生存專家', '開路先鋒'],
        personality: '冷酷的實用主義者。他不恨任何人，但也不愛任何人。夥伴只是達成目標的工具，當工具失去價值時就該丟棄。他會微笑著把你領入陷阱。',
        monologue: '別誤會，我沒有背叛你——我只是選擇了對我更有利的一方。這不是個人恩怨，純粹是生意。',
        appearance: 'Rugged man in his mid-30s, wearing travel-worn green and brown gear, holding a sharp cavalry sabre, eyes constantly scanning for opportunities, carrying a map case and various surveying tools, expression unreadable.',
        inventory: {
            equipment: ['軍用彎刀 (Sabre)', '多功能短劍', '加厚皮甲', '探險家地圖冊'],
            gold: 25,
            consumables: ['口糧 (1日) x5', '火把 x5', '指南針', '治療藥水'],
            magicItems: ['失落文明的指環 (指引路徑)']
        },
        avatar: scoutImg,
        bio: '傑克森已經背叛過六個冒險團。每一次他都有「正當理由」——家族遺產、生存需要、或是更好的報酬。他是最好的嚮導，也是最危險的隊友。當他開始對你特別好時，就該開始擔心了。',
        combatBehavior: {
            priorities: ['生存優先', '利用環境', '弱點打擊'],
            typicalActions: ['設置陷阱', '遠程狙擊', '偽裝撤退']
        },
        tacticalAbilities: [
            { name: '緊急脫離', description: '受到攻擊時立即移動並隱形。' },
            { name: '弱點識破', description: '找出敵人弱點，使下一次攻擊造成雙倍傷害。' }
        ]
    },
    // --- 32. War Priest (Male) - 戰鬥祭師 ---
    {
        id: 'preset_axesinger',
        name: '沃加·血歌 (Vorgar Bloodsong)',
        race: '半獸人',
        class: '戰鬥祭師',
        gender: 'Male',
        alignment: '混亂善良',
        background: '部族成員',
        mbti: 'ENFP',
        decisionBias: '追求刺激',
        level: 3,
        hp: 27,
        maxHp: 27,
        baseStats: { str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 12 },
        skills: ['運動', '表演', '醫療'],
        feats: ['獸人韌性', '戰吼治癒', '祖靈祝福', '戰鬥施法'],
        spells: ['治療創傷', '祝福術', '援護盾', '雷霆一擊', '戰吼'],
        slots: { 1: 3, 2: 1 },
        personality: '豪邁、樂天，能在最血腥的戰場上唱出最激勵人心的歌。他的戰歌不只是激勵士氣，更能召喚祖靈的治癒力量。他極其聒噪，但每一句歌詞都帶著對同伴的真誠關懷。',
        monologue: '讓我的歌聲治癒你的傷口！祖靈們，請眷顧我的戰友！跟我一起唱——還能站起來就還能戰鬥！',
        appearance: 'Massive half-orc with tribal tattoos across his chest and arms, wearing a wolf-skin mantle, dual-wielding heavy handaxes decorated with holy runes, wide grin showing tusks, shamanic totems hanging from his belt.',
        inventory: {
            equipment: ['符文手斧 x2', '狼皮斗篷 (加厚皮甲)', '祖靈戰鼓', '治療圖騰'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '祖靈藥草 x3', '磨刀石', '治療藥水 x2'],
            magicItems: []
        },
        avatar: axesingerImg,
        bio: '沃加是部族的「歌祭司」——一種結合戰士與祭司的神聖職位。他的歌聲能召喚祖靈的力量，在戰場上治癒傷兵的同時激勵士氣。他離開部族是為了將祖靈的祝福帶給更多需要的人。',
        combatBehavior: {
            priorities: ['群體強化', '近戰支援', '維持士氣'],
            typicalActions: ['戰歌激勵', '雙斧連擊', '投擲圖騰']
        },
        tacticalAbilities: [
            { name: '祖靈怒吼', description: '對周圍敵人造成聲波傷害並恐懼他們。' },
            { name: '鮮血與榮耀', description: '隊友生命值越低，造成的傷害越高。' }
        ]
    },
    // --- 33. Magus (Male) ---
    {
        id: 'preset_elfmagus',
        name: '薩拉里昂 (Thalarian)',
        race: '精靈',
        class: '奧法騎士',
        gender: 'Male',
        alignment: '守序中立',
        background: '學者',
        mbti: 'INTJ',
        decisionBias: '測試極限',
        level: 3,
        hp: 25,
        maxHp: 25,
        baseStats: { str: 10, dex: 16, con: 12, int: 16, wis: 12, cha: 10 },
        skills: ['奧秘', '歷史', '洞察'],
        feats: ['法術擊打 (Spellstrike)', '戰鬥施法', '武器連結', '曲刃專精'],
        spells: ['電爪', '燃燒之手', '護盾術', '魔導防護'],
        slots: { 1: 4, 2: 2 },
        personality: '典型的學者戰士，說話嚴謹且充滿哲理。對魔法與物理規律有著近乎偏執的探索欲。冷靜到近乎殘酷，但他那水晶化的手臂隱隱作痛時，會露出短暫的人性掙扎。',
        monologue: '當劍刃切開空氣，魔法也就此綻放。我的時間不多了...肉體的轉化正在加速。',
        appearance: 'Elegant elf with long silver-blue hair, wearing high-collared light mage-armor, one arm appearing translucent and crystal-like, holding a curved Elven Curve Blade that hums with arcane energy.',
        inventory: {
            equipment: ['精靈雙手曲刃「晨顫」', '強化施法套裝', '法術筆記', '磨過的魔力水晶'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '墨水與筆', '醒腦藥劑', '治療藥水'],
            magicItems: ['學徒的名字 (刻於劍刃)']
        },
        avatar: elfmagusImg,
        bio: '曾是精靈議會的禁忌大法師，因試圖將物理與魔法結合而遭驅除。他的曲刃是用他自己的「法術位元」鑄造而成。隨著他使用魔法的次數增加，他的肉體正慢慢轉化為純粹的奧法水晶。',
        combatBehavior: {
            priorities: ['法術爆發', '防禦反制', '機動施法'],
            typicalActions: ['法術擊打', '護盾術', '傳送斬']
        },
        tacticalAbilities: [
            { name: '奧法超載', description: '消耗生命值強化下一次法術的威力。' },
            { name: '水晶護殼', description: '完全免疫下一次魔法傷害，並將其轉化為法力。' }
        ]
    },
    // --- 34. Hunter (Male) ---
    {
        id: 'preset_hunter',
        name: '柯斯 (Korth Greyeye)',
        race: '熊哥布林',
        class: '獵人',
        gender: 'Male',
        alignment: '絕對中立',
        background: '守望者',
        mbti: 'ISTP',
        decisionBias: '保全自我',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 14, dex: 16, con: 14, int: 10, wis: 14, cha: 8 },
        skills: ['偵察', '隱匿', '生存', '動物處理'],
        feats: ['長臂天賦', '長距離射手', '陷阱大師', '自然隱遁'],
        spells: ['獵人印記', '動物友誼', '大步奔行'],
        slots: { 1: 3 },
        personality: '像一具精密的狩獵機器，沉默到像是一棵樹，但對森林的破壞者會展現出極端殘酷的一面。他體內的野性本能時刻在提醒他，他終究是一個醜陋的食肉者。',
        monologue: '呼吸...屏住...箭矢會帶走你的恐懼。對不起...我始終不敢告訴妳，我到底是誰。',
        appearance: 'Lanky and powerful bugbear with thick grey fur, wearing a delicate pink flower hairband (a keepsake), carrying a massive longbow and a pack full of traps, his eyes are cold and yellow.',
        inventory: {
            equipment: ['獵人長弓', '鐵製捕獸夾 x2', '迷彩斗篷', '精靈少女的髮帶'],
            gold: 5,
            consumables: ['生肉 (1日) x5', '止血草', '箭矢 (40)', '治療藥水'],
            magicItems: []
        },
        avatar: hunterImg,
        bio: '柯斯曾是個殘忍的熊哥布林殺手，直到他遇到了一個盲眼的精靈少女，將他誤認為森林守護者。少女死後，柯斯戴上了她的髮帶，發誓守護這片森林。',
        companion: {
            name: '露娜 (Luna)',
            type: '幻影白狼 (Lv3)',
            hp: 20,
            maxHp: 20,
            ac: 14,
            attacks: [
                { name: '幽冥撕咬', hitBonus: 5, damage: '1d10+3 力場' },
                { name: '守護咆哮', hitBonus: 0, damage: '0 (增加隊友防禦)' }
            ],
            abilities: ['靈體化', '感知邪惡', '協助狩獵'],
            autonomous: true,
            avatar: lunaImg
        },
        combatBehavior: {
            priorities: ['遠程壓制', '寵物協同', '利用地形'],
            typicalActions: ['獵人印記', '多重射擊', '指揮狼群']
        },
        tacticalAbilities: [
            { name: '協同狩獵', description: '與露娜同時攻擊同一個目標，必定造成暴擊。' },
            { name: '森林之眼', description: '無論敵人在哪裡，都無法躲避你的射擊。' }
        ]
    },
    // --- 35. Assassin (Male) ---
    {
        id: 'preset_assassin',
        name: '瑪法斯 (Malphas the Silent)',
        race: '提夫林',
        class: '刺客',
        gender: 'Male',
        alignment: '守序中立',
        background: '刺客',
        mbti: 'INFJ',
        decisionBias: '維持秩序',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 8, dex: 18, con: 12, int: 14, wis: 12, cha: 14 },
        skills: ['隱匿', '欺瞞', '調查'],
        feats: ['暗影行走', '偷襲精通', '致命打擊', '毒藥精通'],
        personality: '文雅且有禮貌，但動手時絕不留情。他相信自己是「因果律」的執行者，殺掉每個人都是為了防止未來更巨大的災難。',
        monologue: '別感到疼痛，這是一場通往虛無的洗禮。為了大局...你必須在此終結。',
        appearance: 'Slender tiefling with deep charcoal skin and small, sharp horns, wearing elegant high-collared dark robes with hidden daggers, eyes that seem to see through physical forms, perpetually calm and polite demeanor.',
        inventory: {
            equipment: ['因果毒刃', '袖箭套組', '天平吊墜', '高級絲綢袍'],
            gold: 30,
            consumables: ['精炼毒液 x3', '致盲粉', '消聲鞋底', '治療藥水'],
            magicItems: []
        },
        avatar: assassinImg,
        bio: '瑪法斯效命於一個古老的影子組織，被派來物質位面執行特定的「命運修正」任務。他殺掉的可能是一個未來的暴君，但也可能只是一個無辜的父親。',
        combatBehavior: {
            priorities: ['擊殺高威脅', '隱密行動', '避免正面衝突'],
            typicalActions: ['背刺', '塗毒', '消失']
        },
        tacticalAbilities: [
            { name: '命運終結', description: '對生命值低於30%的目標造成致死傷害。' },
            { name: '無痕步伐', description: '完全消除自己的存在感，敵人無法鎖定你。' }
        ]
    },
    // --- 36. Weapon Master (Female) - 女將軍 ---
    {
        id: 'preset_weaponmaster',
        name: '葛蕾西亞·鋼步 (General Gracia)',
        race: '人類',
        class: '武器大師',
        gender: 'Female',
        alignment: '守序中立',
        background: '軍人',
        mbti: 'ESTJ',
        decisionBias: '維持秩序',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 16, dex: 14, con: 14, int: 14, wis: 12, cha: 12 },
        skills: ['運動', '察覺', '歷史', '威嚇'],
        feats: ['戰術大師', '全武器精通', '領導力', '止戰打擊'],
        personality: '嚴謹且鐵面，時刻思考著陣型與成本。她是百戰老將，卻厭倦了無意義的殺戮。現在她用武藝來保護而非征服，用戰術來終結戰爭而非延續戰爭。',
        monologue: '戰鬥不是兒戲，是數學、是紀律、是意志的排列組合。放下武器吧，不需要更多無謂的犧牲。',
        appearance: 'Mature athletic woman in her late 30s with scarred face and commanding presence, wearing perfectly maintained tactical officer armor, silver-streaked black hair tied back, carrying a variety of weapons (halberd on back, longsword at hip), piercing grey eyes that miss no detail.',
        inventory: {
            equipment: ['精鋼戟', '指揮官長劍', '戰場重錘', '女將軍胸甲'],
            gold: 50,
            consumables: ['口糧 (1日) x5', '急救包', '戰場哨笛', '治療藥水 x2'],
            magicItems: ['將軍的榮耀 (頭盔)']
        },
        avatar: weaponmasterImg,
        bio: '葛蕾西亞曾是帝國最年輕的將軍，策劃過無數勝利的戰役。但當她見證戰火將整個城鎮吞噬時，她放棄了軍銜。現在她作為自由劍客，用她的戰略才華來制止戰爭，而不是發動戰爭。她的座右銘是：「最好的戰鬥，是不用開始的戰鬥。」',
        combatBehavior: {
            priorities: ['戰場指揮', '控制敵人位置', '多武器切換'],
            typicalActions: ['繳械', '摔絆', '戰術指令']
        },
        tacticalAbilities: [
            { name: '戰場掌控', description: '重新去排列所有敵人和友軍的行動順序。' },
            { name: '大師反擊', description: '對任何攻擊你的近戰敵人進行免費反擊。' }
        ]
    },
    // --- 45. Qi Physician (Male) - 氣脈醫者 ---
    {
        id: 'preset_qiphysician',
        name: '沈藥衡 (Shen Yaoheng)',
        race: '侏儒',
        class: '氣脈醫者 (Qi Physician)',
        gender: 'Male',
        alignment: '中立',
        background: '遊醫',
        mbti: 'ISTJ',
        decisionBias: '維持平衡',
        level: 3,
        hp: 27,
        maxHp: 27,
        baseStats: { str: 8, dex: 14, con: 16, int: 14, wis: 16, cha: 10 },
        skills: ['醫療', '洞察', '自然', '察覺'],
        feats: [
            '氣脈調理',
            '針灸封穴',
            '戰場急救',
            '內息運行'
        ],
        abilities: {
            qiPool: 6,
            qiRegen: '短休後恢復一半'
        },
        techniques: [
            {
                name: '回氣針',
                effect: '消耗1點氣，立即回復目標1d8+感知修正生命值，並解除疲勞或流血'
            },
            {
                name: '封穴止痛',
                effect: '消耗1點氣，使目標在1回合內忽略傷害減值與疼痛效果'
            },
            {
                name: '逆行推拿',
                effect: '消耗2點氣，將倒地但未死亡的角色穩定並立即行動一次'
            },
            {
                name: '錯脈點擊',
                effect: '近戰觸擊，消耗1點氣，使敵人攻擊檢定-2（1回合）'
            }
        ],
        personality: '沉穩寡言、務實冷靜。他不相信奇蹟，只相信經驗與平衡。對生死沒有浪漫幻想，但會盡全力讓人「撐過現在」。不評價善惡，只評估狀態是否失衡。',
        monologue: '別急著站起來。你現在的氣息還亂著，活著比逞強重要。',
        appearance: 'Short gnome with weathered features, silver-streaked black hair tied neatly behind, wearing layered linen robes reinforced with leather patches. A bamboo medicine case and rolled acupuncture kit hang from his belt, eyes calm and observant.',
        inventory: {
            equipment: [
                '經絡銀針組',
                '草藥醫囊',
                '硬化布甲',
                '折疊竹杖'
            ],
            gold: 20,
            consumables: [
                '止血藥包 x3',
                '安神藥丸 x2',
                '回氣湯劑 x2',
                '口糧 (1日) x5'
            ],
            magicItems: [
                '養氣玉佩（每日1次，恢復1點氣）'
            ]
        },
        avatar: runemasterImg,
        combatRole: '戰場穩定者 / 延命支援',
        battleStyle: '位於第二線行動，優先處理重傷與狀態失衡目標。以針灸、氣脈調理延後死亡節點，必要時用封穴技術干擾敵人節奏，極少主動輸出。',
        bio: '沈藥衡出身於東方邊境的侏儒醫者世家，行醫百年，走遍戰場、疫區與荒野。他見過太多「本可以不用死」的人，因此拒絕神明與奇蹟，只相信身體自身的回復能力。他行醫的原則只有一個：讓失衡回到可控範圍。至於命運，要等人活下來再談。',
        combatBehavior: {
            priorities: ['治療', '控制', '支援'],
            typicalActions: ['回氣針', '封穴止痛', '逆行推拿']
        },
        tacticalAbilities: [
            { name: '回氣針', description: '消耗1點氣，立即回復目標1d8+感知修正生命值，並解除疲勞或流血' },
            { name: '錯脈點擊', description: '近戰觸擊，消耗1點氣，使敵人攻擊檢定-2（1回合）' }
        ]
    },
    // --- 38. Field Medic (Female) - 戰地醫師 ---
    {
        id: 'preset_fieldmedic',
        name: '艾蕾娜·史特恩 (Elena Stern)',
        race: '人類',
        class: '戰地醫師',
        gender: 'Female',
        alignment: '守序中立',
        background: '隨軍醫官',
        mbti: 'ISTJ',
        decisionBias: '完成任務',
        level: 3,
        hp: 24,
        maxHp: 24,
        baseStats: { str: 10, dex: 14, con: 14, int: 14, wis: 16, cha: 10 },
        skills: ['醫療', '察覺', '洞察', '生存'],
        feats: ['戰地急救', '止血專家', '醫療直覺', '有限資源管理'],
        spells: ['快速治療', '止血術', '痛覺抑制', '短暫強心'],
        slots: { 1: 3 },
        personality: '冷靜、寡言、務實。她不相信奇蹟，也不追求犧牲精神。對她而言，慈悲是一種可計算的行動。只要任務還在進行，她就會持續讓「還能走的人」站起來。',
        monologue: '我不是來拯救所有人的。我是來確保有人能走到終點。現在站得起來，就別浪費我給你的時間。',
        appearance: 'A lean woman wearing reinforced medical leathers and a soot-stained ash-grey cloak. A compact field medical kit is strapped to her thigh. Her eyes constantly measure posture and breathing rather than faces.',
        inventory: {
            equipment: ['戰地醫療包', '醫療短刃', '輕型護甲', '煙霧藥瓶 x2'],
            gold: 20,
            consumables: ['治療藥水 x2', '止血藥粉 x3', '強心針 x1', '口糧 (1日) x5'],
            magicItems: []
        },
        avatar: fieldmedicImg,
        bio: '艾蕾娜曾隸屬三支不同軍團，沒有一支撐到戰爭結束。她不是因為仁慈而留下，而是因為她能讓隊伍「還有人能回來」。對她而言，信仰只是延長生命的手段。',
        // 戰場行為與決策規則
        combatBehavior: {
            priorities: ['維護行動能力', '資源優化', '規避風險'],
            typicalActions: ['預防性治療', '煙霧阻斷', '撤退判斷']
        },
        // 戰地戰術能力
        tacticalAbilities: [
            { name: '醫療風險標記', description: '標記高風險隊友，引導戰術撤退。' },
            { name: '煙霧封鎖', description: '使用煙霧彈切斷敵方視線。' },
            { name: '強制後撤', description: '將瀕死隊友拉出戰壕。' }
        ]
    },
    // --- 39. Morrina Thornheart (Female) - 腐化德魯伊 (Morrigan風格) ---
    {
        id: 'preset_morrina',
        name: '莫琳娜·荊棘心 (Morrina)',
        race: '高等精靈',
        class: '荒野女巫',
        gender: 'Female',
        alignment: '中立邪惡',
        background: '隱士',
        mbti: 'INTJ',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 8, dex: 14, con: 12, int: 16, wis: 16, cha: 12 },
        skills: ['自然', '生存', '洞察'],
        feats: ['腐化變形', '毒素免疫', '自然嘲弄'],
        spells: ['毒液噴射', '腐化領域', '荊棘束縛', '烏鴉型態'],
        slots: { 1: 3, 2: 2 },
        personality: '冷酷務實，嘲諷一切「軟弱的情感」。她認為自然不是溫柔的母親而是殘酷的選擇者。',
        monologue: '感情？那是獵物臨死前才會有的奢侈品。不過...這隻小蜘蛛倒是挺可愛的。',
        appearance: 'High elf with pale skin and dark vine-like tattoos, wearing black and deep purple tattered robes, piercing green eyes, surrounded by a faint green poisonous mist.',
        inventory: {
            equipment: ['腐木法杖', '毒牙匕首', '腐化法袍'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '毒藥', '治療藥水'],
            magicItems: []
        },
        avatar: morrinaImg,
        bio: '被精靈社會放逐的德魯伊，她發現了自然的陰暗面。她不再保護生命，而是加速「自然的選擇」。她獨自生活在腐敗沼澤中，直到命運讓她離開。',
        companion: {
            name: '絲影 (Silkshade)',
            type: '織網蜘蛛',
            hp: 4,
            maxHp: 4,
            ac: 14,
            attacks: [{ name: '螯咬', hitBonus: 5, damage: '1 毒素' }],
            abilities: ['攀爬', '織網', '毒素'],
            avatar: silkshadeImg
        },
        combatBehavior: {
            priorities: ['持續傷害', '削弱敵人', '區域控制'],
            typicalActions: ['釋放毒霧', '召喚荊棘', '變身烏鴉逃脫']
        },
        tacticalAbilities: [
            { name: '腐敗蔓延', description: '使一個區域變為劇毒沼澤，每回合造成毒素傷害。' },
            { name: '生命枯萎', description: '偷取敵人的生命值來治療自己或隊友。' }
        ]
    },
    // --- 40. Isabella Crimsonwave (Female) - 海盜女王 (Isabela風格) ---
    {
        id: 'preset_isabella',
        name: '伊莎貝拉·緋浪 (Isabella)',
        race: '人類',
        class: '海盜女王',
        gender: 'Female',
        alignment: '混亂中立',
        background: '水手',
        mbti: 'ESTP',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 14, dex: 18, con: 14, int: 10, wis: 10, cha: 16 },
        skills: ['特技', '欺瞞', '表演', '運動'],
        feats: ['雙手武器戰鬥', '袖槍專家', '船戰直覺'],
        personality: '風騷大膽，調戲所有人但從不認真。唯一在乎的是自由和她的船。',
        monologue: '想知道我床上的秘密嗎？（眨眼）開玩笑的～等你打贏我再說。',
        appearance: 'Stunning human woman with tanned skin and long dark wavy hair, wearing a loose white shirt with deep neckline, high-waisted leather trousers and boots, dual curved rapiers at hip, cheeky smile.',
        inventory: {
            equipment: ['緋浪短刃 x2', '精緻袖槍', '海盜皮甲'],
            gold: 50,
            consumables: ['朗姆酒 x3', '火藥粉袋', '治療藥水'],
            magicItems: []
        },
        avatar: isabellaImg,
        bio: '曾是史上最強大海盜船的副船長，直到她「借走」了整艘船。她熱愛財寶更熱愛自由，沒人能真正抓住她，不論是在戰場上還是在情場上。',
        combatBehavior: {
            priorities: ['單挑決鬥', '利用環境', '靈活進退'],
            typicalActions: ['花式劍術', '火槍射擊', '飛盪攻擊']
        },
        tacticalAbilities: [
            { name: '海盜詭計', description: '投擲沙子致盲敵人，或利用環境造成意外傷害。' },
            { name: '最後一發', description: '裝填特殊的爆炸彈藥，造成大範圍傷害。' }
        ]
    },
    // --- 41. Diana Silverstring (Female) - 戰吟弓手 ---
    {
        id: 'preset_diana',
        name: '黛安娜·銀弦 (Diana)',
        race: '木精靈',
        class: '戰吟弓手',
        gender: 'Female',
        alignment: '中立善良',
        background: '藝人',
        mbti: 'ESFP',
        level: 3,
        hp: 25,
        maxHp: 25,
        baseStats: { str: 12, dex: 18, con: 12, int: 10, wis: 14, cha: 14 },
        skills: ['表演', '察覺', '隱匿'],
        feats: ['精準射擊', '鼓舞歌謠', '即興戰技'],
        personality: '熱情奔放，邊射箭邊唱歌，歌詞都是現編的。人生太短，不能不開心。',
        monologue: '♪ 敵人來了要小心～我的箭矢超級準～（射偏）...呃，那個不算！',
        appearance: 'Wood elf with fiery red hair and freckles, wearing green and gold light armor, carrying a silver-strung longbow, always moving as if dancing to a rhythm.',
        inventory: {
            equipment: ['銀弦長弓', '精靈長劍', '鑲釘皮甲', '小型豎琴'],
            gold: 20,
            consumables: ['口糧 (1日) x5', '箭矢 (40)', '潤喉糖', '治療藥水'],
            magicItems: []
        },
        avatar: dianaImg,
        bio: '原本是森林歌劇團的明星，但她覺得舞台太小，戰場才是真正的舞台。她用箭矢打拍子，用歌聲激勵同伴，將每一場冒險變成史詩音樂劇。',
        combatBehavior: {
            priorities: ['遠程支援', '群體控制', '提升士氣'],
            typicalActions: ['戰歌射擊', '干擾音波', '全體加速']
        },
        tacticalAbilities: [
            { name: '最終樂章', description: '射出一支分裂箭，攻擊所有可見敵人。' },
            { name: '安魂曲', description: '使所有受傷的隊友獲得持續回復效果。' }
        ]
    },
    // --- 42. Stella Nocturne (Female) - 星靈野法師 ---
    {
        id: 'preset_stella',
        name: '星辰·小夜曲 (Stella)',
        race: '星靈',
        class: '混沌法師',
        gender: 'Female',
        alignment: '混亂善良',
        background: '異鄉人',
        mbti: 'ENFP',
        level: 3,
        hp: 17,
        maxHp: 17,
        baseStats: { str: 6, dex: 14, con: 12, int: 16, wis: 12, cha: 16 },
        skills: ['奧秘', '察覺', '說服'],
        feats: ['野生魔法浪潮', '星空異向', '宇宙共鳴'],
        spells: ['星火爆', '空間扭曲', '萬彩魔光', '治癒星塵'],
        slots: { 1: 4, 2: 2 },
        personality: '天然呆宇宙少女！說話會插入星座知識。魔法永遠不按計畫走。',
        monologue: '等等，水星逆行了！所以剛才那個火球往後飛是正常的...對吧？',
        appearance: 'Small gnome-like being with teal skin and starry patterns, glowing violet energy tail, large curious green eyes, wearing cosmic-patterned silk robes, a celestial cat resting on her shoulders.',
        inventory: {
            equipment: ['星塵法杖', '發光頸圈', '宇宙絲袍'],
            gold: 30,
            consumables: ['宇宙糖果 x10', '星光瓶', '治療藥水'],
            magicItems: []
        },
        avatar: starspiritImg,
        bio: '來自遙遠星空的旅者，不小心掉進了這個物質位面。她對這裡的一切都感到好奇，並試圖用她那不穩定的「宇宙饋贈」來幫助新朋友。',
        abilities: ['空間跳躍'],
        combatBehavior: {
            priorities: ['隨機效果', '大規模破壞', '混亂控制'],
            typicalActions: ['狂野魔法', '星光閃爍', '召喚隕石']
        },
        tacticalAbilities: [
            { name: '幸運重置', description: '強制重擲任何一個骰子（無論敵我）。' },
            { name: '星辰墜落', description: '召喚小型流星雨，對隨機目標造成傷害（可能打到隊友！）。' }
        ]
    },
    // --- 43. Fenela Bloodscale (Female) - 血族龍裔 ---
    {
        id: 'preset_fenela',
        name: '緋涅拉·血鱗 (Fenela)',
        race: '龍裔 (紅龍)',
        class: '血族領主',
        gender: 'Female',
        alignment: '守序邪惡',
        background: '貴族',
        mbti: 'ENTJ',
        level: 3,
        hp: 28,
        maxHp: 28,
        baseStats: { str: 16, dex: 10, con: 14, int: 14, wis: 12, cha: 16 },
        skills: ['威嚇', '洞察', '說服'],
        feats: ['血之龍息', '領主威壓', '生命汲取'],
        spells: ['鮮血之槍', '恐怖姿態', '支配人類', '血色護盾'],
        slots: { 1: 2, 2: 1 },
        personality: '優雅殘忍的貴族女王。將一切視為棋局。喝血時會用高腳杯。',
        monologue: '親愛的，你的血型是什麼？（舔唇）哦別緊張，只是...商業興趣。',
        appearance: 'Imperial dragonborn with sleek red scales that shimmer like blood, wearing an elegant high-collared black and crimson gown, glowing red eyes, sharp fangs visible, carrying a ceremonial but deadly scepter.',
        inventory: {
            equipment: ['血染權杖', '貴族長袍', '家印戒指'],
            gold: 100,
            consumables: ['高檔血袋 x2', '紅酒', '治療藥水'],
            magicItems: ['血領主斗篷']
        },
        avatar: fenelaImg,
        bio: '原本是強大的龍裔城主，在追求永生時不審感染了吸血鬼詛咒。她將龍的力量與血的魔力融合，成為了領地中令人畏懼的女皇。現在她離開領地，是為了擴展她的「影響力」。',
        combatBehavior: {
            priorities: ['吸血回復', '控制心智', '坦克前排'],
            typicalActions: ['鮮血汲取', '恐懼凝視', '龍息']
        },
        tacticalAbilities: [
            { name: '血之宴', description: '對周圍所有敵人造成傷害，並回復等量生命值。' },
            { name: '臣服', description: '強制一個敵人暫時為你戰鬥。' }
        ]
    },
    // --- 44. Kiki Goldcoin (Female) - 幸運哥布林 ---
    {
        id: 'preset_kiki',
        name: '琪琪·金幣 (Kiki)',
        race: '哥布林',
        class: '幸運兒',
        gender: 'Female',
        alignment: '混亂善良',
        background: '平民',
        mbti: 'ENFP',
        level: 3,
        hp: 21,
        maxHp: 21,
        baseStats: { str: 8, dex: 18, con: 12, int: 10, wis: 12, cha: 14 },
        skills: ['巧手', '隱匿', '特技'],
        feats: ['天選之運', '幸運連鎖', '逃跑大師'],
        personality: '超級可愛的綠皮小傢伙！靠運氣活到現在，堅信自己是天選之人。',
        monologue: '欸嘿～又中了！（彈弓石頭反彈打中敵人）...我、我當然是故意的！',
        appearance: 'Adorable female goblin with large yellow eyes and floppy ears, wearing a patched-up colorful vest and oversized hat, carrying a fancy slingshot, lucky charms hanging everywhere.',
        inventory: {
            equipment: ['黃金彈弓', '幸運骰子', '小皮甲'],
            gold: 5,
            consumables: ['口糧 (1日) x5', '各類彩石 (彈藥) x20', '治療藥水'],
            magicItems: ['不壞的小石子']
        },
        avatar: kikiImg,
        bio: '她是部族裡最「奇怪」的哥布林，因為她不喜歡暴力，只喜歡閃亮的東西。她被部族趕出來後，靠著驚人的運氣在野外存活了下來，甚至還「撿」到了一堆寶藏。',
        combatBehavior: {
            priorities: ['生存', '尋寶', '干擾'],
            typicalActions: ['亂丟東西', '裝死', '撿這撿那']
        },
        tacticalAbilities: [
            { name: '絕對幸運', description: '下一次受到的傷害必定為 0（滑倒躲過了）。' },
            { name: '意外之財', description: '戰鬥結束後獲得額外的金幣或道具。' }
        ]
    },
    // --- 45. Anthraxe (Male) - 龍裔戰吼主唱 ---
    {
        id: 'preset_anthraxe',
        name: '安瑟瑞克斯 (Anthraxe)',
        race: '龍裔',
        class: '戰吼主唱',
        gender: 'Male',
        alignment: '混亂中立',
        background: '邪教樂團首領',
        mbti: 'ENFP',
        level: 3,
        hp: 24,
        maxHp: 24,
        baseStats: { str: 16, dex: 10, con: 14, int: 8, wis: 10, cha: 18 },
        skills: ['表演', '威嚇', '運動'],
        feats: ['雙重祖裔', '詩人激勵', '勇武戰歌'],
        spells: ['惡毒嘲笑', '雷鳴波', '粉碎術'],
        slots: { 1: 4, 2: 2 },
        personality: '邪教樂團首領。Bahamut 給了他力量，Tiamat 給了他慾望，而舞台，給了他存在的理由。他並不自認為神的代言人，他只是「讓世界聽見聲音的人」。',
        monologue: '準備好了嗎？讓這場雷鳴粉碎你們的靈魂！這不是戰鬥，這是我的演出！',
        appearance: '高大健壯的龍裔男性，覆蓋橄欖綠與土黃交錯的鱗片。巨大的彎角向後盤旋，角根包覆金屬護環。眼睛泛著雷電般的金黃光芒。單腳踏前，重斧狀魯特琴橫持，如即將開唱。',
        inventory: {
            equipment: ['雷鳴魯特琴 (巨斧)', '音波放大圖騰', '破損紅布袍', '鐵鍊與頭骨飾品'],
            gold: 25,
            consumables: ['口糧 (1日) x5', '喉嚨保養藥水', '治療藥水'],
            magicItems: []
        },
        avatar: anthraxeImg,
        bio: 'Anthraxe（安瑟瑞克斯），稱號：Thrashmaster／雷鳴主唱／雙龍之聲。他將重金屬吼唱與龍裔的吐息融合，創造了震碎戰場的音波。對他而言，每一次揮砍都是一段重節奏，每一次殺戮都是安可曲。',
        combatBehavior: {
            priorities: ['音波壓制', '近戰斬擊', '士氣鼓舞'],
            typicalActions: ['重金吼唱', '魯特琴揮砍', '音爆震撼']
        },
        tacticalAbilities: [
            { name: '雷鳴演出', description: '施放音波法術時，附帶雷鳴視覺與額外音波傷害。' },
            { name: '音爆重擊', description: '近戰重擊命中時觸發一次音爆，對周圍敌人造成聲波傷害。' }
        ]
    }

];

export default PRESET_CHARACTERS;
