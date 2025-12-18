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
        // Companion: Wolf Animal Companion
        companion: {
            name: '影牙 (Shadowfang)',
            type: '狼',
            hp: 11,
            maxHp: 11,
            ac: 13,
            attacks: [
                { name: '撕咬', hitBonus: 4, damage: '2d4+2 穿刺' }
            ],
            abilities: ['聯手戰術', '敏銳聽覺/嗅覺']
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
        hp: 25,
        maxHp: 25,
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
        // Companion: Hawk Animal Companion
        companion: {
            name: '疾風 (Swiftwind)',
            type: '獵鷹',
            hp: 4,
            maxHp: 4,
            ac: 13,
            attacks: [
                { name: '利爪', hitBonus: 5, damage: '1 揮砍' }
            ],
            abilities: ['飛掠', '敏銳視力', '協助行動']
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
    // --- 11. Warlock (Male) ---
    {
        id: 'preset_warlock',
        name: '莫德 (Mord)',
        race: '人類',
        class: '邪術師',
        gender: 'Male',
        alignment: '混亂中立',
        background: '騙子',
        mbti: 'INTP',
        hp: 24,
        maxHp: 24,
        baseStats: { str: 10, dex: 14, con: 14, int: 12, wis: 10, cha: 16 },
        skills: ['欺瞞', '威嚇'],
        feats: ['契約魔法', '異界宗主'],
        spells: ['魔能爆', '凍寒之觸', '脆弱詛咒', '煉獄叱喝'],
        slots: { 1: 1 },
        personality: '被邪神壓榨的社畜。他的宗主是一個微觀管理者，隨時會在他腦中開會、要求週報。他冒險只是為了達到這個月的「靈魂業績」KPI。',
        monologue: '抱歉，暫停一下，老闆打來了。是的，大人...下個季度一定提升兩成的獻祭率...好的...',
        appearance: 'Gaunt human male, pale skin, dark circles under eyes, clutching a tome of shadows, purple eldritch energy crackling around fingers, sinister grin, ragged dark robes.',
        inventory: {
            equipment: ['輕弩', '弩矢 (20)', '奧術法器', '皮甲', '雙面匕首', '學者背包'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '羊皮紙', '治療藥水'],
            magicItems: []
        },
        avatar: warlockImg,
        bio: '在一次酒醉後簽下了看不懂的契約，醒來發現自己成了一位克蘇魯實習生。他每天都在擔心被裁員（字面意義上的裁成兩半）。'
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
        // Companion: Owl Familiar
        companion: {
            name: '墨井 (Inkwell)',
            type: '貓頭鷹 (魔寵)',
            hp: 1,
            maxHp: 1,
            ac: 11,
            attacks: [],
            abilities: ['飛掠', '敏銳聽覺/視覺', '協助行動 (下次攻擊優勢)']
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
            name: '蒸氣貓 (Steamy)',
            type: '機械寵物',
            hp: 5,
            maxHp: 5,
            ac: 13,
            attacks: [{ name: '蒸氣噴射', hitBonus: 3, damage: '1d4 火焰' }],
            abilities: ['火焰抗性', '工具輔助', '可愛外表']
        }
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
        hp: 18,
        maxHp: 18,
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
        hp: 26,
        maxHp: 26,
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
        hp: 20,
        maxHp: 20,
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
        class: '女巫',
        gender: 'Female',
        alignment: '混亂中立',
        background: '貴族',
        mbti: 'ENTJ',
        hp: 19,
        maxHp: 19,
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
            hp: 2,
            maxHp: 2,
            ac: 12,
            attacks: [],
            abilities: ['飛行偵查', '模仿人聲', '法術傳遞']
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
        hp: 26,
        maxHp: 26,
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
        hp: 18,
        maxHp: 18,
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
            type: '召喚物（智慧終端）',
            hp: 10,
            maxHp: 10,
            ac: 14,
            attacks: [{ name: '微弱電擊', hitBonus: 4, damage: '1d4 雷鳴' }],
            abilities: ['戰術掃描', '即時翻譯', '投影地圖']
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
        hp: 24,
        maxHp: 24,
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
        hp: 20,
        maxHp: 20,
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
        hp: 20,
        maxHp: 20,
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
        hp: 24,
        maxHp: 24,
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
        hp: 16,
        maxHp: 16,
        baseStats: { str: 6, dex: 14, con: 10, int: 16, wis: 16, cha: 10 },
        skills: ['洞察', '奧秘'],
        feats: ['念力衝擊', '心靈護壁'],
        spells: ['念力推', '心靈感應', '精神控制', '念力飛行'],
        slots: { 1: 2 },
        personality: '冰山美人型的靈能者。她壓抑著自己的情緒，因為任何情緒波動都會引發災難性的念力爆發。她看起來冷漠，實際上只是害怕傷害他人。',
        monologue: '...保持距離。不是因為討厭你...是因為靠太近，你可能會受傷。',
        appearance: 'Beautiful young woman with long straight black hair, piercing ice-blue eyes, expressionless pale face, wearing a form-fitting dark blue dress with silver accents, objects float around her unconsciously, temperature drops when she is nearby.',
        inventory: {
            equipment: ['念力抑制器', '冷色調長裙', '日記本', '隱士背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '鎮靜劑', '冰水', '治療藥水'],
            magicItems: []
        },
        avatar: psionImg,
        bio: '從小擁有強大念力，但因為一次情緒失控毀掉了整個村莊。從此她封閉了自己的心，用冷漠作為保護他人的方式。她尋找控制力量的方法，希望有一天能正常地微笑。'
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
        hp: 26,
        maxHp: 26,
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
            abilities: ['附身戰鬥', '劍術指導', '千年智慧（但方向感為零）']
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
        hp: 18,
        maxHp: 18,
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
        bio: '被哥布林學院開除——不是因為實驗太危險，而是因為他的實驗「太成功」炸掉了三棟教學樓。他出來冒險是為了籌集資金建立自己的研究所，在那裡沒人能限制他的「科學追求」。'
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
        hp: 36,
        maxHp: 36,
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
        bio: '前地下格鬥場的不敗女王。她覺得單純的戰鬥太無聊了，所以決定出來冒險，順便在世界各地舉辦她的「個人巡迴戰鬥秀」。'
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
        hp: 16,
        maxHp: 16,
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
        bio: '八十年前和勇者一起打敗了魔王。現在她開始意識到人類朋友的壽命有多短暫，決定去尋找當年同伴的足跡。她研究時空魔法，希望能保存與短命種族的珍貴記憶。'
    }
];

export default PRESET_CHARACTERS;
