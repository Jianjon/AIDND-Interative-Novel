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
        hp: 15,
        maxHp: 15,
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
        hp: 9,
        maxHp: 9,
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
        hp: 11,
        maxHp: 11,
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
        hp: 9,
        maxHp: 9,
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
        hp: 12,
        maxHp: 12,
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
        hp: 9,
        maxHp: 9,
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
        hp: 12,
        maxHp: 12,
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
        hp: 11,
        maxHp: 11,
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
        hp: 9,
        maxHp: 9,
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
        hp: 7,
        maxHp: 7,
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
        hp: 10,
        maxHp: 10,
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
        hp: 8,
        maxHp: 8,
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
    }
];

export default PRESET_CHARACTERS;
