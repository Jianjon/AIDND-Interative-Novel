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
import lumImg from '../assets/characters/lum_star_sorcerer.png';
import isabellaImg from '../assets/characters/isabella_pirate.png';
import morrinaImg from '../assets/characters/morrina_witch.png';
import dianaImg from '../assets/characters/diana_archer.png';
import fenelaImg from '../assets/characters/fenela_bloodlord.png';
import kikiImg from '../assets/characters/kiki_lucky.png';
import anthraxeImg from '../assets/characters/anthraxe.jpg';
// Companion portraits
import shadowfangImg from '../assets/characters/shadowfang.png';
import swiftwindImg from '../assets/characters/swiftwind.png';
import inkwellImg from '../assets/characters/inkwell.png';
import shunImg from '../assets/characters/Steam Cat-dnd-portrait.png';
import babyOwlbearImg from '../assets/characters/baby_owlbear.jpg';
import steamyImg from '../assets/characters/steamy.jpg';
import crowImg from '../assets/characters/crow.png';
import silkshadeImg from '../assets/characters/silkshade.png';
import sevenImg from '../assets/characters/seven.png';
import swordghostImg from '../assets/characters/swordghost.jpg';
import lunaImg from '../assets/characters/phantomwhitewolf-dnd-portrait.png';
import arthurImg from '../assets/characters/arthur_seeker.png';
import conanImg from '../assets/characters/conan_barbarian.png';
import villagerImg from '../assets/characters/villager_mob.png';
import skeletonImg from '../assets/characters/skeleton_knight.png';
import pipiImg from '../assets/characters/pipi_wild_mage.png';

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
        class: '血怒者',
        gender: 'Male',
        alignment: '混亂善良',
        background: '化外之民',
        mbti: 'ESTP',
        level: 1,
        baseStats: { str: 16, dex: 14, con: 14, int: 8, wis: 12, cha: 10 },
        skills: ['運動', '生存'],
        feats: ['血脈狂暴', '風之恩惠', '不息之息'],
        spells: ['雷鳴波', '護盾術', '神導術'],
        personality: '暴風雨的化身。他患有嚴重的「幽閉恐懼症」，拒絕走正門，更喜歡「製造」新的出口。他認為文明的禮節是給軟弱者準備的，只有在咆哮和戰鬥中才能與風對話。',
        monologue: '門？那是給羊走的。狼都是直接撞穿牆壁！',
        appearance: '蒼白半透明的皮膚，白髮如在水中漂浮，雙眼閃爍著白光，身形魁梧，佈滿部落紋身。手持巨斧，周身環繞著陣陣旋風。',
        inventory: {
            equipment: ['精鋼巨斧', '風暴手斧 x2', '探險家背包', '標槍 x4'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '火把 x2', '治療藥水 x4'],
            magicItems: []
        },
        avatar: barbarianImg,
        bio: '因為曾試圖對著龍捲風講道理而被部落放逐。他堅信自己是風暴的私生子，目前正試圖尋找方法回到天空上的故鄉。他的憤怒管理問題通常通過劈柴（或劈敵人）來解決。作為血怒者，他的憤怒能引發真實的颶風。',
        emotionalKeys: {
            joy: ['打破束縛', '暴風雨', '直來直往的挑戰', '破壞障礙'],
            anger: ['被關起來', '複雜的官僚流程', '謊言', '等待'],
            weakness: '關於天空故鄉的消息'
        },
        combatBehavior: {
            priorities: ['衝鋒陷陣', '法術爆發', '群體控制'],
            typicalActions: ['血脈狂暴', '雷鳴波', '巨斧揮砍']
        }
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
        level: 1,
        baseStats: { str: 8, dex: 14, con: 12, int: 14, wis: 10, cha: 16 },
        skills: ['表演', '說服', '歷史'],
        feats: ['侏儒狡黠', '詩人激勵'],
        spells: ['惡毒嘲笑', '治癒真言', '雷鳴波', '睡眠術'],
        slots: { 1: 2 },
        personality: '八卦記者型冒險者。她無法保守祕密，會即時將隊友的糗事編成歌謠。她認為「真相」太無聊，所有的故事都需要「藝術加工」。',
        monologue: '等等！剛才那個摔倒的姿勢太不優雅了，我們重來一次，這次加點旋轉！',
        appearance: '身材矮小，雙眼靈動有神，粉紅色亂髮配帶著護目鏡。穿著五彩繽紛的表演服，彈奏著魯特琴，帶著調皮的笑容，整體色彩鮮艷活潑。',
        inventory: {
            equipment: ['細劍', '藝人背包', '魯特琴', '皮甲', '匕首'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '蠟燭 x5', '治療藥水 x4'],
            magicItems: []
        },
        avatar: bardImg,
        bio: '前皇家宮廷小丑，因為不小心說出了國王的假髮祕密而被通緝。現在她立志要寫出一本包含世界上所有名人醜聞的「史詩巨著」。',
        emotionalKeys: {
            joy: ['新的八卦', '掌聲', '戲劇性的反轉', '華麗的演出'],
            anger: ['被無視', '無聊的真相', '尷尬的沉默', '對她品味的質疑'],
            weakness: '對她藝術創造成就的嚴厲批評'
        },

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
        level: 1,
        baseStats: { str: 14, dex: 10, con: 14, int: 10, wis: 16, cha: 10 },
        skills: ['洞察', '醫療'],
        feats: ['矮人堅韌', '施法能力'],
        spells: ['聖火術', '奇術', '治療傷口', '導引飛彈', '祝福術'],
        slots: { 1: 2 },
        personality: '職業倦怠的地下城安全稽查員。他會對每個地城的「結構完整性」和「衛生條件」進行評分。治療隊友時會碎碎念關於「工安意外」的預防措施。',
        monologue: '看在摩拉丁的鬍子上！這座神廟的承重柱根本不合規！還有這些骷髏，多久沒消毒了？',
        appearance: '魁梧的矮人，長長的灰色鬍鬚編著銀環。穿著刻有聖徽的重型板甲，手持戰錘，表情嚴肅神聖，周身環繞著暖金色的聖光感。',
        inventory: {
            equipment: ['戰錘', '鱗甲', '盾牌', '聖徽', '祭司背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '聖水', '治療藥水 x4'],
            magicItems: []
        },
        avatar: clericImg,
        bio: '曾是矮人礦坑的工頭，在一次礦難中悟道。他認為冒險不是英雄主義，而是高風險的勞動，必須嚴格遵守安全守則（雖然隊友從來不聽）。',
        emotionalKeys: {
            joy: ['遵守安全規範', '結構穩固的建築', '誠實', '高品質的酒'],
            anger: ['違章建築', '無謂的冒險', '骯髒環境', '破壞公物'],
            weakness: '看到工人或礦工陷入危險'
        },

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
        level: 1,
        baseStats: { str: 10, dex: 14, con: 12, int: 12, wis: 16, cha: 10 },
        skills: ['自然', '生存'],
        feats: ['煉獄抗性', '德魯伊語'],
        spells: ['德魯伊技藝', '製造火焰', '糾纏術', '治療傷口', '雷鳴波'],
        slots: { 1: 2 },
        personality: '激進的植物保護主義者。她會跟木製家具道歉，並在戰鬥中試圖說服敵人的坐騎「罷工」。她認為人類才是這個世界的入侵物種。',
        monologue: '別踩那朵花！它的根系正在午睡！至於那邊的地精...嗯，它們也是肥料的一種。自然循環嘛。',
        appearance: '紅色的皮膚，巨大的彎曲羊角，裝飾著葉片的狂放深色頭髮，穿著原始風格的皮革獸皮。琥珀色的眼睛閃閃發光，手持木杖，周圍環繞著自然之靈。',
        inventory: {
            equipment: ['彎刀', '皮甲', '盾牌', '德魯伊法器', '探險家背包'],
            gold: 10,
            consumables: ['好莓 (零食)', '草藥包', '治療藥水 x4'],
            magicItems: []
        },
        avatar: druidImg,
        bio: '從小被狼群養大，直到十歲才學會說人話。她對社會契約一無所知，透過嗅聞別人來打招呼，並且堅持所有的肉都必須生吃。',
        companion: {
            name: '梟熊寶寶「泡芙」 (Puff)',
            type: '梟熊幼崽 (中小型)',
            ac: 13,
            attacks: [{ name: '笨拙抓擊', hitBonus: 3, damage: '1d6+2 揮砍' }],
            abilities: ['吉祥物光環', '靈敏嗅覺', '厚實皮毛'],
            tactics: '雖然移動像熊一樣笨重且不會飛，但會努力保護卡琳。戰鬥能力有限，主要負責賣萌和警戒，或者在敵人不注意時咬一口腳踝。',
            personality: '隊伍的吉祥物。貪吃、愛睡覺，以為自己是兇猛的頂級掠食者。移動時四肢著地，像一隻毛茸茸的小熊。',
            avatar: babyOwlbearImg
        },
        emotionalKeys: {
            joy: ['保護自然', '生肉', '生與死的循環', '植物'],
            anger: ['金屬製品', '浪費食物', '文明的繁文縟節', '傷害幼崽'],
            weakness: '可愛的動物幼崽（即使是怪物的）'
        },

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
        level: 1,
        baseStats: { str: 16, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
        skills: ['特技', '察覺'],
        feats: ['精靈血統', '回氣', '戰鬥風格 (射箭)'],
        personality: '迷信的退伍老兵。他有幾十個必須遵守的怪癖：劍必須擦七次、睡覺前要向東方吐口水。他相信自己沒死是因為嚴格遵守了這些儀式。',
        monologue: '不，不行。今天是星期二，我們不能先邁左腳進地城。這會招來厄運的，我奶奶說過。',
        appearance: '性格乖張但帥氣的臉龐，帶著短鬚，穿著飽經風霜的鎖甲，眉心上方有一條疤痕。姿勢端正嚴謹，手扶劍柄，神情冷靜堅毅。',
        inventory: {
            equipment: ['長劍', '盾牌', '鎖甲', '輕弩', '弩矢 (20)', '地城探險家背包'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '磨刀石', '治療藥水 x4'],
            magicItems: []
        },
        avatar: fighterImg,
        bio: '因為欠了賭債而被迫從軍，又因為賭贏了長官而被迫退伍。現在他只想賺夠錢買回他輸掉的家傳農場，但每次賺到錢又會不小心賭掉。',
        emotionalKeys: {
            joy: ['賭贏', '遵守迷信儀式', '還清債務', '整潔的武器'],
            anger: ['打破儀式/禁忌', '提及他的賭債', '弄髒裝備'],
            weakness: '他已故祖母的教誨或關於家傳農場的回憶'
        }
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
        level: 1,
        baseStats: { str: 12, dex: 16, con: 12, int: 10, wis: 16, cha: 8 },
        skills: ['特技', '洞察'],
        feats: ['武術', '無甲防禦'],
        personality: '異界文化觀察家。她把物質位面當作一個巨大的動物園，喜歡在別人戰鬥或崩潰時在一旁做筆記。她對「幽默」的概念完全無法理解。',
        monologue: '記載：人類雄性在求偶前會先喝發酵的液體壯膽。其行為邏輯...令人費解。',
        appearance: '精實且充滿肌肉的體態。黃綠色的皮膚佈滿黑點，五官稜角分明。穿著飄逸的武僧袍，架式沉穩，目光專注敏銳，背著一把星界銀劍。',
        inventory: {
            equipment: ['短劍', '飛鏢 x10', '探險家背包'],
            gold: 5,
            consumables: ['口糧 (1日) x5', '冥想薰香', '治療藥水 x4'],
            magicItems: []
        },
        avatar: monkImg,
        bio: '為了完成「物質位面生物行為學」的論文而來到這裡。她用拳頭與當地人「交流」，認為透過肉體碰撞是理解一個物種最快的方式。',
        emotionalKeys: {
            joy: ['新的行為數據', '高效的戰鬥', '邏輯', '完成記錄'],
            anger: ['不合邏輯的行為', '過度的情緒發洩', '被打斷記錄', '愚蠢'],
            weakness: '對自己知識盲區的焦慮（害怕顯得無知）'
        }
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
        level: 1,
        baseStats: { str: 16, dex: 10, con: 14, int: 8, wis: 12, cha: 16 },
        skills: ['運動', '宗教'],
        feats: ['神聖感知', '聖療'],
        personality: '自帶背景音樂的戲劇女王。他堅持在揮劍前要喊出招式名稱。對他來說，戰鬥如果不帥氣，那贏了也沒有意義。極度愛護自己的鱗片光澤。',
        monologue: '邪惡之徒啊！準備好接受我這招——「閃耀·正義·螺旋·毀滅·斬」了嗎？！',
        appearance: '金色的鱗片，典型的龍裔頭部，雙眼閃爍著亮藍色的光芒。穿著打磨得閃閃發亮的重型板甲，背著飄逸的白色斗篷，手持巨劍，周身散發著神聖的光輝，顯得高貴而威嚴。',
        inventory: {
            equipment: ['巨劍', '標槍 x5', '鎖甲', '聖徽', '探險家背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '聖水', '治療藥水 x4'],
            magicItems: []
        },
        avatar: paladinImg,
        bio: '家族没落的最後一位繼承人，為了省錢修理盔甲而踏上冒險。他隨身攜帶一罐「鱗片專用蠟」，每天早上要花兩小時打理儀容。',
        emotionalKeys: {
            joy: ['讚美他的外表/鱗片', '英雄式的獨白', '正義的行為', '戲劇性的出場'],
            anger: ['弄髒盔甲', '打斷他的演講', '被忽視', '不榮譽的手段'],
            weakness: '家族沒落帶來的貧窮困境'
        }
    },
    // --- 8. Ranger (Male) ---
    {
        id: 'preset_ranger',
        name: '米洛 (Milo)',
        race: '半身人',
        class: '遊俠',
        gender: 'Male',
        alignment: '中立善良',
        background: '化外之民',
        mbti: 'ISTP',
        level: 1,
        baseStats: { str: 10, dex: 16, con: 12, int: 12, wis: 14, cha: 10 },
        skills: ['隱匿', '欺瞞', '巧手'],
        feats: ['宿敵', '自然探索者'],
        personality: '魔物美食家。他的冒險筆記更像是一本食譜。看到怪物的反應不是恐懼，而是思考該用烤的還是燉的。',
        monologue: '那是一隻梟熊？我也許可以用牠的喙來燉湯...只要先把牠放倒。有誰帶了鹽嗎？',
        appearance: '身材矮小，比例勻稱，棕色捲髮，一張飽經風霜的愉悅臉龐。穿著綠色連帽斗篷和皮甲，手持長弓，正坐在樹枝上，露出友善的微笑。',
        inventory: {
            equipment: ['短弓', '箭袋 (20)', '短劍 x2', '皮甲', '探險家背包'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '火把 x2', '治療藥水 x4'],
            magicItems: []
        },
        avatar: rangerImg,
        bio: '正在撰寫《地下城米其林指南》。為了尋找傳說中最美味的「紅龍排」而離家出走。他的動物夥伴看起來看著他的眼神總是充滿了恐懼。',
        companion: {
            name: '疾風 (Swiftwind)',
            type: '獵鷹',
            ac: 15,
            attacks: [{ name: '爪擊', hitBonus: 6, damage: '1d6+4' }],
            abilities: ['俯衝攻擊', '銳利目光', '空中偵察'],
            tactics: '利用速度優勢在戰場上方盤旋，尋找敵人死角進行俯衝騷擾，優先攻擊敵人的眼睛或手臂。',
            personality: '高傲、敏銳。除了米洛之外，不允許任何人觸碰它的羽毛。總是站在高處俯視眾生。',
            avatar: swiftwindImg
        },
        emotionalKeys: {
            joy: ['發現稀有食材', '烹飪', '大家喜歡他的食物', '狩獵成功'],
            anger: ['燒焦食物', '浪費食材', '挑食', '傷害他的獵鷹'],
            weakness: '他的動物夥伴疾風 (Swiftwind) 受到威脅'
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
        level: 1,
        baseStats: { str: 8, dex: 16, con: 12, int: 14, wis: 12, cha: 12 },
        skills: ['隱匿', '特技', '調查', '巧手'],
        feats: ['偷襲', '盜賊黑話'],
        personality: '強迫性收藏癖。她不偷值錢的東西，只偷「有趣」的東西（比如敵人的左腳襪子，或是神像的鼻子）。她聲稱這是「行為藝術」。',
        monologue: '那個巫妖的護命匣...形狀真可愛。放在我的壁爐上一定很合適。',
        appearance: '黑曜石般的皮膚，長而飄逸的白髮，雙眼閃爍著紅光，優雅而致命。穿著深色皮甲並拉起兜帽，手持兩把匕首，隱藏在陰影之中。',
        inventory: {
            equipment: ['細劍', '短弓', '箭袋 (20)', '皮甲', '盜賊工具', '竊賊背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '金屬珠 (袋)', '治療藥水 x4', '毒藥 (基礎)'],
            magicItems: []
        },
        avatar: rogueImg,
        bio: '因為偷了蜘蛛神后祭司的高跟鞋而被追殺。她對財富不感興趣，但對混亂情有獨鍾。她的背包裡裝滿了毫無價值的破爛。',
        emotionalKeys: {
            joy: ['偷到奇怪的東西', '製造混亂', '惡作劇', '諷刺'],
            anger: ['無聊的貴重物品', '權威人士', '守規矩', '長時間的安靜'],
            weakness: '閃閃發光但邏輯上很奇怪的謎題'
        }
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
        level: 1,
        baseStats: { str: 8, dex: 14, con: 12, int: 12, wis: 10, cha: 16 },
        skills: ['馴獸', '隱匿'],
        feats: ['天生施法', '術法起源'],
        spells: ['火焰箭', '控制火焰', '魔法飛彈', '燃燒之手', '護盾術'],
        slots: { 1: 2 },
        personality: '爆炸藝術家。她用「烘焙程度」來形容她的火焰法術。性格像火焰一樣不穩定，興奮時頭髮會冒煙。',
        monologue: '這種哥布林只要五分熟就好。至於那個獸人...我要把它烤得焦脆！',
        appearance: '高等精靈，皮膚白皙，金色長髮。穿著優雅的貴族長袍，手中懸浮著魔法火焰，目光犀利，展現出空靈之美，皮膚上隱約閃爍著奧法符文。',
        inventory: {
            equipment: ['輕弩', '弩矢 (20)', '奧術法器', '匕首 x2', '探險家背包'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '奧術粉筆', '治療藥水 x4'],
            magicItems: []
        },
        avatar: sorcererImg,
        bio: '因為在家裡的茶會上不小心噴火燒掉了客廳而被送出來「歷練」。她天真地以為冒險就是另一場大型的煙火秀。',
        emotionalKeys: {
            joy: ['華麗的爆炸', '優雅的禮儀/茶會', '被當作大人看待', '煙火'],
            anger: ['被當作小孩', '法術失敗', '無聊的說教', '骯髒的地方'],
            weakness: '提及她被逐出家門的孤獨感'
        }
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
        level: 1,
        baseStats: { str: 10, dex: 14, con: 14, int: 12, wis: 10, cha: 16 },
        skills: ['欺瞞', '威嚇'],
        feats: ['契約魔法', '異界宗主', '靈魂收割'],
        spells: ['魔能爆', '凍寒之觸', '脆弱詛咒', '煉獄叱喝', '靈魂束縛'],
        slots: { 1: 2 },
        personality: '心甘情願服務邪神的信徒。他不是被迫的——他是自願簽下契約的。他冷靜地將「收割靈魂」視為一份體面的工作，甚至會給受害者開立收據。',
        monologue: '請不要掙扎，這樣會讓萃取過程更痛苦。簽下這份契約，您的靈魂將獲得「永恆的安寧」。',
        appearance: '瘦削的人類男性，皮膚蒼白，眼周帶著深邃的黑眼圈。緊握著陰影法典，紫色異界能量在指尖閃爍。掛著一抹陰險的微笑，穿著襤褸的深色長袍，雙眼閃爍著充滿敵意的智慧光芒。',
        inventory: {
            equipment: ['輕弩', '弩矢 (20)', '奧術法器', '皮甲', '雙面匕首', '靈魂收容瓶'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '空白契約書 x5', '治療藥水 x4'],
            magicItems: ['邪神印記 (隱藏)']
        },
        avatar: warlockImg,
        bio: '莫德並非被騙簽約——他是在研究禁忌知識後主動尋找邪神的。他認為力量需要代價，而他樂於讓別人來支付。他對契約有著病態的執著，從不違約，即使這意味著執行可怕的事情。',
        emotionalKeys: {
            joy: ['簽訂契約', '自願的犧牲', '法律漏洞', '守信'],
            anger: ['違約', '情緒勒索', '浪費時間的求饒', '混亂無序'],
            weakness: '完美的法律邏輯陷阱（他無法抗拒）'
        }
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
        level: 1,
        baseStats: { str: 12, dex: 14, con: 14, int: 16, wis: 10, cha: 8 },
        skills: ['奧秘', '歷史'],
        feats: ['奧術回想', '施法能力'],
        spells: ['火焰箭', '光亮術', '魔法伎倆', '魔法飛彈', '睡眠術', '法師護甲', '護盾術'],
        slots: { 1: 2 },
        personality: '學術菁英主義者。她將每一次戰鬥都視為「現場教學」或「實驗數據收集」。會在敵人施法時指出他們的發音錯誤。',
        monologue: '你的火球術手勢錯了，角度偏差 15 度。難怪威力這麼小，這如果是在期末考直接當掉。',
        appearance: '長著小獠牙的半獸人，綠灰色的皮膚，戴著眼鏡。穿著學者的長袍，背著塞滿東西的背包。正閱讀著一本懸浮的法術書，眼神聰睿，整潔且保養得宜。',
        inventory: {
            equipment: ['法杖', '法術書', '施法材料包', '學者背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '墨水與筆', '治療藥水 x4', '卷軸: 偵測魔法'],
            magicItems: []
        },
        avatar: wizardImg,
        bio: '魔法學院有史以來第一位半獸人教授。她極度討厭被當作野蠻人，因此說話總是故意使用艱澀的辭彙和複雜的句型結構。',
        companion: {
            name: '墨井 (Inkwell)',
            type: '魔寵 (貓頭鷹)',
            ac: 13,
            attacks: [{ name: '撥弄', hitBonus: 4, damage: '1' }],
            abilities: ['飛掠 (Flyby)', '協助施法', '黑暗視覺'],
            tactics: '不直接參與戰鬥，而是透過飛掠干擾敵人，為娜茲的法術提供優勢。危機時會傳送法術。',
            personality: '充滿書卷氣的貓頭鷹，喜歡停在娜茲的肩膀上看書。會發出類似嘆氣的呼嚕聲來表達對愚蠢行為的不屑。',
            avatar: inkwellImg
        },
        emotionalKeys: {
            joy: ['糾正別人的發音', '整理書籍', '完美的實驗數據', '被稱為教授'],
            anger: ['被叫野蠻人', '弄髒書本', '不合邏輯的魔法', '粗魯的行為'],
            weakness: '對自己混血身分的自卑感'
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
        level: 1,
        baseStats: { str: 10, dex: 14, con: 14, int: 16, wis: 12, cha: 14 },
        skills: ['奧秘', '調查'],
        feats: ['魔法灌注', '魔法修補'],
        spells: ['修補術', '雷鳴斬', '護盾術', '治療創傷'],
        slots: { 1: 2 },
        personality: '天才矮人發明家。雖然身材嬌小但充滿活力，與她的蒸汽獸「斯蒂米」有著深厚的連結。她不再依賴火器，而是將所有的造物靈魂都灌注進這台能變幻七種動物態的萬用載具中。',
        monologue: '斯蒂米，切換獵犬模式！讓我們衝散他們的陣型！...啊，零件好像掉了一個，不管了先衝再說！',
        appearance: '可愛的年輕矮人少女，有著紅潤的雙頰，大而閃爍的琥珀色眼睛。蓬鬆的銅色頭髮紮成雙馬尾，並戴著齒輪發夾，頭上架著大號護目鏡。穿著可愛的蒸汽龐克洋裝並繫著工具帶，身上總是沾著油漬，但依然非常討喜。',
        inventory: {
            equipment: ['萬用蒸汽獸控制環', '工匠工具套組', '防護皮圍裙', '備用零件袋'],
            gold: 20,
            consumables: ['機油 (1日) x5', '修復軟膏 x3', '治療藥水 x2', '齒輪扳手'],
            magicItems: []
        },
        avatar: artificerImg,
        bio: '鑄造公會的天才，放棄了火藥的喧囂，致力於創造「有靈魂的鋼鐵」。她的蒸汽獸斯蒂米是她唯一的戰友，能根據環境變換形態，保護這位矮人少女穿越最危險的荒野。',
        companion: {
            name: '斯蒂米 (Steamy)',
            type: '蒸汽獸 (構裝生物)',
            ac: 15,
            attacks: [{ name: '蒸汽衝撞', hitBonus: 5, damage: '1d8+3 鈍擊' }],
            abilities: ['形態切換', '警覺協議', '自我維修'],
            tactics: '平時作為代步工具或馱獸。戰鬥時會變形成鋼鐵獵犬保護可可，或者變成巨大的盾牌阻擋攻擊。',
            personality: '雖然是機器，但似乎有著像忠犬一樣的性格。會發出快樂的蒸汽鳴笛聲，喜歡被擦拭和上油。',
            avatar: steamyImg
        },
        emotionalKeys: {
            joy: ['稀有金屬', '機械運轉聲', '誇獎她的發明', '複雜的圖紙'],
            anger: ['輕視機械', '破壞工具', '傳統守舊派', '叫她小矮子'],
            weakness: '斯蒂米發生故障無法修復'
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
        level: 1,
        baseStats: { str: 6, dex: 12, con: 12, int: 18, wis: 12, cha: 8 },
        skills: ['奧秘', '歷史'],
        feats: ['死靈專精', '亡靈驅使'],
        spells: ['寒冷之觸', '虛假生命', '復活亡靈', '幻影殺手'],
        slots: { 1: 2 },
        personality: '社恐宅男死靈術士。他研究死靈術只是因為「死人不會嘲笑我」。房間裡堆滿了魔法書和人偶，他稱骷髏僕從為「老婆」。',
        monologue: '三次元的人類太可怕了...還是我的骷髏醬們可愛...（撫摸骷髏頭）',
        appearance: '蒼白的半精靈，凌亂的黑髮遮住了一隻眼睛，因為熬夜而有著深邃的黑眼圈。在長袍外套著一件破舊的黑色連帽衫，腰帶上掛著人偶收藏袋。彎腰駝背，避免與人眼神接觸，周圍圍繞著繫著絲帶的可愛骷髏手下。',
        inventory: {
            equipment: ['骷髏法杖（有可愛裝飾）', '死靈魔法書', '黑色連帽袍', '人偶收藏背包'],
            gold: 5,
            consumables: ['速食拉麵 x10', '能量飲料', '治療藥水 x4', '骷髏香水'],
            magicItems: []
        },
        avatar: necromancerImg,
        bio: '因為社交恐懼症被精靈社區排擠後隱居研究死靈術。他的夢想是建立一個「完美的地下城」——全是聽話的骷髏。骷髏們被他打扮得花枝招展。',
        emotionalKeys: {
            joy: ['讚美他的骷髏', '安靜的墓地', '稀有的骨頭', '不需要社交'],
            anger: ['陽光', '大聲喧嘩', '破壞他的收藏', '強迫社交'],
            weakness: '異性的主動接近（會當機）'
        }
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
        level: 1,
        baseStats: { str: 14, dex: 16, con: 12, int: 14, wis: 12, cha: 14 },
        skills: ['調查', '歷史'],
        feats: ['血儀式', '暗影行者'],
        personality: '百年前被初擁的貴族吸血鬼。他壓抑著血之渴望，只為找到創造他的血源宗主——傳說中的「始祖」。他舉止優雅但內心充滿矛盾。',
        monologue: '這份詛咒與祝福並存的血液...我必須找到源頭。（克制著對血的渴望）',
        appearance: '優雅且面色蒼白的貴族男子，整齊地向後梳著銀色頭髮，血紅色的瞳孔呈細縫狀。穿著優雅的高領維多利亞大衣，手持沾有血跡的細劍，獠牙若隱若現，容貌凍結在永恆的 25 歲。',
        inventory: {
            equipment: ['血染細劍', '貴族禮服', '銀質懷錶', '血袋保存箱'],
            gold: 50,
            consumables: ['獸血袋 x5', '遮陽斗篷', '日光抗性藥劑', '治療藥水 x4'],
            magicItems: []
        },
        avatar: bloodhunterImg,
        bio: '三百年前是個普通貴族，一夜之間被不知名的吸血鬼初擁。他厭惡自己的不死之身，卻也依賴它尋找真相。他只喝動物血，拒絕傷害人類。',
        emotionalKeys: {
            joy: ['高品質的紅酒（代替血）', '古典藝術', '關於吸血鬼的線索', '紳士風度'],
            anger: ['粗魯的行為', '陽光', '提及他的怪物身份', '浪費食物'],
            weakness: '對鮮血的強烈渴望'
        }
    },
    // --- 16. Shaman (Female) - 半精靈薩滿 ---
    {
        id: 'preset_shaman',
        name: '靈·千語 (Ling)',
        race: '半精靈 (變形魔血統)',
        class: '薩滿',
        gender: 'Female',
        alignment: '絕對中立',
        background: '隱士',
        mbti: 'INFJ',
        level: 1,
        baseStats: { str: 10, dex: 14, con: 12, int: 14, wis: 16, cha: 14 },
        skills: ['洞察', '欺瞞'],
        feats: ['祖靈連結', '靈魂接觸', '能力掠奪'],
        spells: ['治療傷口', '易容術', '召喚祖靈', '偵查思想'],
        slots: { 1: 2 },
        personality: '擁有可愛且多變的人格。她對現狀感到滿意，熱衷於體驗人類的生活，但偶爾會被吸收到的痛苦記憶騷擾。她的性格隨和但隨時可能因為切換人格而變得判若兩人。',
        monologue: '今天的我是誰呢？可能是路邊的少女，也可能是死去的英雄。每個靈魂都有故事，而我只是負責說故事的人。',
        appearance: '維持著甜美且充滿活力的半精靈少女外觀。雙眼清澈但偶爾會閃過異樣的靈魂光芒。穿著輕便的薩滿袍，身上掛著許多象徵靈魂契約的飾品。',
        inventory: {
            equipment: ['祖靈圖騰 (可變形)', '千面面具', '流動袍', '靈魂容器'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '記憶水晶', '身份偽裝套件', '治療藥水 x4'],
            magicItems: []
        },
        avatar: shamanImg,
        bio: '原本是失去記憶的變形魔，但在得到薩滿能力後，她學會了與靈魂對話。她不只具備原本變形魔的變形與記憶能力，現在也能接觸並安撫靈魂。透過變化為他人，她能短暫獲得對方的能力。目前她享受著作為人類的時光，儘管那些不屬於她的記憶偶爾會帶來負擔。',
        emotionalKeys: {
            joy: ['有趣的新身份', '靈魂的安寧', '甜食', '扮演遊戲'],
            anger: ['強制現出原形', '惡靈', '千篇一律的無聊', '對她身份的質疑'],
            weakness: '混亂的記憶導致的自我認知障礙'
        }
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
        level: 1,
        baseStats: { str: 8, dex: 14, con: 12, int: 16, wis: 12, cha: 16 },
        skills: ['奧秘', '威嚇'],
        feats: ['巫術', '魔寵'],
        spells: ['邪眼', '魅惑人類', '不幸詛咒', '占卜術'],
        slots: { 1: 2 },
        personality: '高傲的御姐女巫。說話慢條斯理，眼神帶著玩味。她享受看別人被她玩弄於股掌之間的表情。表面冷酷，但偶爾會露出不經意的溫柔。',
        monologue: '呵...真是有趣。讓姐姐我來教教你什麼叫做「絕望」吧～（舔唇）',
        appearance: '高挑優雅的半精靈，一頭如絲般的黑長髮垂至腰間。紫色的眼睛帶著深不可測的笑意，穿著一件帶有紫色綴飾的深黑連衣裙，配戴精緻的頸帶。手持優雅的黑色法杖，散發著成熟而誘人的氣息。',
        inventory: {
            equipment: ['暗影法杖', '高跟長靴', '紫水晶頸鏈', '禁忌魔法書'],
            gold: 30,
            consumables: ['口糧 (1日) x5', '紅酒', '魅惑香水', '治療藥水 x4'],
            magicItems: []
        },
        avatar: witchImg,
        bio: '某沒落貴族的私生女，從小被視為恥辱。她發誓要讓那些看不起她的人跪在腳下。她的黑鴉魔寵「漆夜」是她唯一信任的存在。',
        companion: {
            name: '漆夜 (Crow)',
            type: '黑鴉 (魔寵)',
            ac: 13,
            attacks: [{ name: '啄擊', hitBonus: 4, damage: '1' }],
            abilities: ['飛行偵查', '模仿人聲', '法術傳遞'],
            tactics: '喜歡模仿敵人的聲音來製造混亂，或停在敵人死角的樹枝上施加不幸詛咒。',
            personality: '毒舌且喜歡嘲諷。會用嘶啞的聲音重複別人說過的蠢話。對亮晶晶的眼球特別感興趣。',
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
        level: 1,
        baseStats: { str: 14, dex: 18, con: 12, int: 12, wis: 14, cha: 10 },
        skills: ['特技', '洞察'],
        feats: ['劍氣', '無影步'],
        personality: '來自東方帝國的神秘劍客。他很少說話，每句話都像詩一般。他的劍術源自失傳的皇家劍道，一劍出鞘必取人性命。',
        monologue: '劍在心中，心在劍中。一劍...足矣。',
        appearance: '英俊的東方男子，留著銀色長髮並結成髮髻，目光平靜而敏銳。穿著飄逸的唐朝黑白長袍，手持一把工藝精湛的「無塵」劍，始終保持冷靜的表情，身形移動如行雲流水。',
        inventory: {
            equipment: ['唐劍「無塵」', '東方絲袍', '竹編斗笠', '書生背包'],
            gold: 25,
            consumables: ['茶葉', '米酒壺', '傷藥', '治療藥水 x4'],
            magicItems: []
        },
        avatar: duelistImg,
        bio: '前大唐皇家劍術教習，因一場宮廷政變被迫西逃。他的劍下亡魂無數，但他從不殺無辜之人。他在異國尋找能讓他放下劍的答案。',
        emotionalKeys: {
            joy: ['上等的茶', '與強者切磋', '月下獨酌', '故鄉的詩'],
            anger: ['無禮之徒', '背信棄義', '濫殺無辜', '被打擾冥想'],
            weakness: '對故國政變的悔恨'
        }
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
        level: 1,
        baseStats: { str: 8, dex: 14, con: 12, int: 16, wis: 12, cha: 12 },
        skills: ['奧秘', '調查', '歷史'],
        feats: ['現代造物召喚', '技術分析'],
        spells: ['偵查無人機', '萬能智慧手機', '強光手電筒', '神之膠帶', '高壓滅火器'],
        slots: { 1: 3 },
        personality: '前日本生活用品店店員，對現代造物的結構瞭若指掌。他總是帶著黑框眼鏡，面無表情地分析著戰況，並從異界召喚出「看似無害」的現代用品來應對危機。',
        monologue: '雖然這只是個滅火器，但如果噴在火龍的肺裡，結果是一樣的。興許還能順便做支冰棒？',
        appearance: '年輕的日本男子，留著凌亂的黑髮並帶著眼鏡。穿著帶有許多口袋的現代旅者背心、白襯衫和工裝褲。手持一個發光的平板電腦，作為他的召喚法器。',
        inventory: {
            equipment: ['戰術平板', '多功能背心', '黑框眼鏡', '旅行者背包'],
            gold: 25,
            consumables: ['能量飲料 x3', '速食拉麵 (1日) x5', '強力膠帶', '治療藥水 x4'],
            magicItems: []
        },
        avatar: summonerImg,
        bio: '因為在過馬路時為了救一隻貓而被卡車撞飛。轉生後獲得了召喚現代日本造物的能力。他深知科技的力量（即使只是日用品），並致力於用「現代文明」來征服這個劍與魔法的異世界。',
        companion: {
            name: '小七 (Seven)',
            type: '智慧終端',
            ac: 16,
            attacks: [{ name: '掃描射線', hitBonus: 6, damage: '1d8+4 力場' }],
            abilities: ['掃描', '護盾投影', '數據干擾'],
            tactics: '漂浮在空中進行戰場數據分析，標記敵人弱點，並在關鍵時刻投影護盾保護誠一。',
            personality: '冷靜、理性的AI助手。說話帶有機械音，喜歡用百分比來計算勝率。對這個異世界的魔法現象總是表示「邏輯錯誤」。',
            avatar: sevenImg
        },
        emotionalKeys: {
            joy: ['找到替代能源', '現代食物（如大米）', '邏輯通順', 'Wifi訊號（幻覺）'],
            anger: ['不科學的現象', '弄壞設備', '野蠻行徑', '沒有衛生紙'],
            weakness: '對現代文明便利生活的強烈思念'
        }
    },
    // --- 20. Magus/魔戰士 (Female) - 煉金身軀的傑作 ---
    {
        id: 'preset_magus',
        name: '葛拉蒂亞 (Galatea)',
        race: '重生者 (煉金生命)',
        class: '魔戰士',
        gender: 'Female',
        alignment: '守序中立',
        background: '被遺棄者',
        mbti: 'ISFJ',
        level: 1,
        baseStats: { str: 16, dex: 14, con: 14, int: 12, wis: 10, cha: 12 },
        skills: ['運動', '奧秘'],
        feats: ['魔力迴路', '自我修復'],
        spells: ['護盾術', '雷擊斬', '修復術', '強化'],
        slots: { 1: 2 },
        personality: '由瘋狂鍊金術士創造的「理想生命」。她擁有一顆由不穩定靈魂碎片構成的心。雖然行為優雅、舉止得體，但對死亡與情感的理解充滿了空洞的純真。她正在尋找能填補她靈魂空缺的「真實情感」。',
        monologue: '主人的手稿說，只要收集到足夠的眼淚與笑容，我就能變成完整的...那是真的嗎？（歪頭，眼神空洞而美麗）',
        appearance: '美麗的陶瓷少女，肌膚白皙且帶有細微的冰裂紋，在關節處隱約可見銀黃色的奧術連接。她的長髮如絲線般流淌，眼神中閃爍著不穩定的奧法光輝。穿著華麗而複古的教團戰鬥服，冷豔而詭秘。',
        inventory: {
            equipment: ['魔力劍「靈魂之承」', '陶瓷護甲', '煉金修復油', '主人的手稿'],
            gold: 10,
            consumables: ['奧術核心 x3', '細柔絲布', '陶瓷修補劑', '治療藥水 x4'],
            magicItems: []
        },
        avatar: magusImg,
        bio: '她是傳說中的鍊金大導師在生命盡頭時的最後作品。師父試圖將瓷器與破碎的英雄靈魂結合，創造出永恆的伴侶。導師死後，葛拉蒂亞從塵土封存的實驗室中醒來，帶著未竟的指令踏入世界：去體驗，去感受，直到碎片拼湊成詩。',
        emotionalKeys: {
            joy: ['觀察到真摯的情感', '被賦予新的指令', '美麗的瓷器', '被需要'],
            anger: ['被視為無魂的物品', '暴力對待生命（不理解但反感）', '指令衝突', '謊言'],
            weakness: '關於導師的遺言或靈魂碎裂的痛苦'
        }
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
        level: 1,
        baseStats: { str: 10, dex: 12, con: 12, int: 12, wis: 16, cha: 16 },
        skills: ['洞察', '說服'],
        feats: ['神諭啟示', '天界血脈'],
        spells: ['治療創傷', '神聖光芒', '預知術', '祝福'],
        slots: { 1: 2 },
        personality: '擁有天使血脈的美男先知。飄逸的長髮和溫柔的微笑迷倒無數人，但他的預言往往帶來厄運。他總是用優雅的方式說出可怕的預言。',
        monologue: '親愛的，命運告訴我...（溫柔微笑）...你大概還有三天可活。不要擔心，我會陪著你。',
        appearance: '令人驚豔的英俊韓系男子，飄逸的銀白長髮垂至腰際，琥珀色的眼睛閃閃發光。無瑕的蒼白皮膚上帶有隱約的金紋，穿著優雅的金邊白袍，偶爾可見空靈的小翅膀。帶著一抹令人心悸的美麗微笑。',
        inventory: {
            equipment: ['神諭權杖', '天使羽飾', '絲綢法袍', '占卜工具'],
            gold: 40,
            consumables: ['口糧 (1日) x5', '香薰', '眼藥水（預言太多會眼痠）', '治療藥水 x4'],
            magicItems: []
        },
        avatar: oracleImg,
        bio: '出身神聖貴族家庭，從小就能看見他人的命運。問題是他的預言準確率100%，但內容通常是壞消息。他被稱為「死亡微笑」，因為他總是微笑著告訴你死期。',
        emotionalKeys: {
            joy: ['預言失準（極少見）', '他人的幸福', '美麗的事物', '安靜的午後'],
            anger: ['無法改變的悲劇', '被命運擺布', '醜陋的人心', '絕望'],
            weakness: '背負他人死亡命運的無力感'
        }
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
        level: 1,
        baseStats: { str: 12, dex: 16, con: 12, int: 16, wis: 14, cha: 14 },
        skills: ['調查', '歷史', '生存', '洞察'],
        feats: ['紳士決鬥', '線索分析'],
        personality: '來自遙遠島國的紳士探險家。無論身處多危險的地城，他都堅持保持整潔的西裝和禮儀。他的手杖實際上是一把暗藏的劍。',
        monologue: '失禮了，在動手之前——請允許我先整理一下儀容。（調整領帶後拔出杖劍）',
        appearance: '30多歲的優雅紳士，棕髮梳理整齊，鬍鬚修剪得體。穿著一套在冒險後依然纖塵不染的合身三件式西裝。戴著單片眼鏡，手持優雅的杖劍，背後掛著一頂探險帽。',
        inventory: {
            equipment: ['紳士杖劍', '西裝三件套', '單片眼鏡', '探險家帽', '皮革公事包'],
            gold: 50,
            consumables: ['伯爵紅茶 x5', '手帕', '火柴', '治療藥水 x4'],
            magicItems: []
        },
        avatar: investigatorImg,
        bio: '大陸皇家探險學會的資深會員。他曾深入無數古代遺跡，面對過龍和惡魔，但從未讓自己的西裝沾上污漬。他的座右銘是：「探險歸探險，紳士風度不能丟。」',
        emotionalKeys: {
            joy: ['解開謎題', '完美的紅茶', '發現未知', '整潔'],
            anger: ['謎題無解', '弄髒衣服', '無禮之徒', '破壞遺跡'],
            weakness: '對未知的過度好奇心導致的危險'
        }
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
        level: 1,
        baseStats: { str: 10, dex: 16, con: 12, int: 12, wis: 16, cha: 14 },
        skills: ['察覺', '洞察', '宗教', '隱匿'],
        feats: ['審判', '異端克星'],
        spells: ['神聖恩典', '命令術', '真言術'],
        slots: { 1: 2 },
        personality: '終生與自身血統本能對抗的審判者。她深知墮落的誘惑，因此更能冷靜地在灰色地帶做出裁決。她並非沒有感情，而是選擇將情感像武器一樣精確控制。',
        monologue: '光明無法照亮所有角落。有些罪惡，必須由同樣身處黑暗的人來審判。',
        appearance: '利落的齊耳短髮，皮膚蒼白，髮間隱藏著微小的尖角。眼神銳利的金色瞳孔，穿著實用的牧師皮革護甲，上面裝飾著銀色審判者標誌。清冷而迷人的存在感。',
        inventory: {
            equipment: ['審判者十字弓', '銀劍', '禁魔鐐銬', '異端獵人風衣'],
            gold: 25,
            consumables: ['聖水', '解毒劑', '治療藥水 x4'],
            magicItems: []
        },
        avatar: deathknightImg,
        bio: '擁有魅魔血統的她，從小就以此為恥。她加入了教會的異端裁判所，專門獵殺那些被惡魔誘惑的墮落者。她比任何人都清楚：越美麗的東西，越致命。',
        emotionalKeys: {
            joy: ['消滅異端', '自我克制', '禱告', '證明自己不是惡魔'],
            anger: ['誘惑', '失控', '被當作魅魔', '惡魔'],
            weakness: '對自身血統的恐懼'
        }
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
        level: 1,
        baseStats: { str: 6, dex: 14, con: 10, int: 16, wis: 16, cha: 10 },
        skills: ['洞察', '奧秘', '醫療'],
        feats: ['念力衝擊', '心靈護壁', '靈能治療'],
        spells: ['念力推', '心靈感應', '精神控制', '念力飛行', '靈能修復', '精神護盾'],
        slots: { 1: 3 },
        personality: '冰山美人型的靈能者。她壓抑著自己的情緒，因為任何情緒波動都會引發災難性的念力爆發。但她發現專注於治癒他人時，力量反而更加穩定。',
        monologue: '...保持距離。不是因為討厭你...但如果你受傷了，讓我來治癒你。這是我唯一不會失控的時候。',
        appearance: '美麗的年輕女性，留著一頭筆直的黑長髮。刺骨的冰藍色眼睛，面無表情的蒼白容顏。穿著合身的深藍色長裙配以銀色點綴，物體常在不知不覺中圍繞她漂浮。當她在附近時，氣溫會隨之下降。',
        inventory: {
            equipment: ['念力抑制器', '冷色調長裙', '日記本', '隱士背包'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '鎮靜劑', '冰水', '治療藥水 x2'],
            magicItems: []
        },
        avatar: psionImg,
        bio: '從小擁有強大念力，但因為一次情緒失控毀掉了整個村莊。從此她封閉了自己的心，用冷漠作為保護他人的方式。直到她發現治癒他人時念力最穩定，這成為她與世界連結的方式。',
        emotionalKeys: {
            joy: ['平靜', '治癒成功', '控制住力量', '獨處'],
            anger: ['情緒失控', '嘈雜', '被強迫表達情感', '傷害無辜'],
            weakness: '回憶起被自己毀滅的村莊'
        }
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
        level: 1,
        baseStats: { str: 16, dex: 14, con: 14, int: 10, wis: 10, cha: 14 },
        skills: ['運動', '生存'],
        feats: ['劍靈附身', '本能戰鬥'],
        spells: ['護盾術', '雷刃', '加速術'],
        slots: { 1: 2 },
        personality: '原本是普通農家女孩，偶然撿到一把封印著古代劍聖靈魂的劍。被附身後變成戰鬥天才，但平時還是個吃貨和路痴。',
        monologue: '欸？！又迷路了！（劍在發光：「往左邊...」）喔喔謝謝你劍爺爺！',
        appearance: '開朗的年輕農家女孩，皮膚被曬成健康的小麥色。凌亂的棕色頭髮紮成馬尾並插著麥穗，眼睛是亮綠色的。穿著簡單的平民服飾，背後卻跨著一把過於華麗的魔法長劍。始終帶著困惑但快樂的表情。',
        inventory: {
            equipment: ['劍聖遺劍「麥浪」', '農家工作服', '斗笠', '農民背包'],
            gold: 5,
            consumables: ['麵包 x10', '自製果醬', '水壺', '治療藥水 x4'],
            magicItems: []
        },
        avatar: eldritchknightImg,
        bio: '村裡最普通的農家女孩，除了食量驚人之外沒有任何特別。直到她在田裡挖出一把會說話的劍——裡面封印著千年前的劍聖。劍聖教她劍術，但無法治好她的路痴。',
        emotionalKeys: {
            joy: ['吃飽', '找到路（極少發生）', '劍爺爺的誇獎', '豐收'],
            anger: ['餓肚子', '迷路', '被騙', '欺負弱小'],
            weakness: '單純好騙，容易被食物誘惑'
        },
        companion: {
            name: '劍聖·無名',
            type: '劍靈（封印在劍中）',
            ac: 20,
            attacks: [],
            abilities: ['附身戰鬥', '劍術指導', '千年智慧（但方向感為零）'],
            tactics: '當小麥遇到危險時，劍會自動出鞘格擋，甚至直接控制小麥的手臂進行反擊。',
            personality: '囉嗦的武學宗師老爺爺。喜歡點評對手的劍術（「太慢了！」「腳步虛浮！」），對小麥的食量和路痴感到絕望。',
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
        level: 1,
        baseStats: { str: 6, dex: 16, con: 12, int: 18, wis: 10, cha: 12 },
        skills: ['奧秘', '調查'],
        feats: ['爆破專家', '快速煉金'],
        spells: ['酸液噴射', '煙霧彈', '爆炸藥劑', '強化藥水'],
        slots: { 1: 3 },
        personality: '哥布林中的天才——這意味著他的實驗只有30%會爆炸（對哥布林來說是極低的失敗率）。他相信「任何問題都能用足夠數量的炸彈解決」。',
        monologue: '不不不，這不是炸彈！這是...有策略性的煉金放熱反應裝置！（小聲）只是碰巧會爆炸而已...',
        appearance: '有著綠色皮膚的小型哥布林，戴著超大號護目鏡。因受化學物質照射而直立的凌亂白髮，穿著一件佈滿補丁和燒焦痕跡的實驗服。腰間帶上掛滿了五顏六色的藥水和炸彈，帶著瘋狂而喜悅的笑容，手指染滿了各種物質。',
        inventory: {
            equipment: ['煉金投擲器', '燒焦實驗服', '炸彈背帶', '哥布林工具包'],
            gold: 35,
            consumables: ['爆炸藥劑 x5', '煙霧彈 x3', '強化藥水 x3', '治療藥水 x2'],
            magicItems: []
        },
        avatar: alchemistImg,
        bio: '被哥布林學院開除——不是因為實驗太危險，而是因為他的實驗「太成功」炸掉了三棟教學樓。他出來冒險是為了籌集資金建立自己的研究所，在那裡沒人能限制他的「科學追求」。',
        emotionalKeys: {
            joy: ['巨大的爆炸', '成功的實驗', '發現新配方', '混亂'],
            anger: ['實驗失敗', '安全規範', '沒錢買材料', '被忽視'],
            weakness: '對爆炸的病態執著（可能會誤傷隊友）'
        },
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
        level: 1,
        baseStats: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 14 },
        skills: ['運動', '表演', '威嚇'],
        feats: ['健壯', '酒館鬥毆者'],
        personality: '競技場的超級明星。她熱愛聚光燈和歡呼聲，把每一場戰鬥都當作是華麗的表演。雖然外表強悍，但其實很喜歡可愛的小東西和精緻的甜點。',
        monologue: '看到那邊的觀眾了嗎？他們是為了看我才來的！所以——Show Time！',
        appearance: '身形健美的魅力半獸人女性，充滿活力的紅色捲髮如瀑布般垂落在背後。露出自信而迷人的微笑，穿著華麗的角鬥士盔甲展示著她的腹肌，正向隱形的觀眾們送出飛吻。',
        inventory: {
            equipment: ['冠軍巨劍', '華麗角鬥士盔甲', '簽名板', '明星背包'],
            gold: 50,
            consumables: ['蛋白粉', '精緻甜點', '粉絲信 x3', '治療藥水 x4'],
            magicItems: []
        },
        avatar: championImg,
        bio: '前地下格鬥場的不敗女王。她覺得單純的戰鬥太無聊了，所以決定出來冒險，順便在世界各地舉辦她的「個人巡迴戰鬥秀」。',
        emotionalKeys: {
            joy: ['歡呼聲', '簽名', '完美的勝利', '可愛的東西'],
            anger: ['冷場', '被無視', '醜陋的對手', '弄髒臉'],
            weakness: '對名聲的過度渴望'
        },
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
        level: 1,
        baseStats: { str: 6, dex: 12, con: 10, int: 18, wis: 16, cha: 10 },
        skills: ['奧秘', '歷史'],
        feats: ['時間感知', '時空凍結'],
        spells: ['時間減速', '預知術', '時空傳送', '記憶投影', '花束術'],
        slots: { 1: 3 },
        personality: '活了一千多年的精靈時空術士。她對時間的概念和人類完全不同，經常為了找魔法店而在一個城鎮待上十年。她收集「無用但有趣」的魔法。',
        monologue: '這個魔法可以讓花束變得更漂亮...等等，才過了一百年？感覺像昨天。',
        appearance: '嬌小精靈女性，有著極長的銀白頭髮，尖耳朵，平靜的紫色雙眼。穿著帶有沙漏圖案的簡單藍白法師袍，手持頂部懸浮著時光法球的古老法杖。外表永遠年輕但散發著古老的氣息。',
        inventory: {
            equipment: ['時空法杖', '魔法書（收錄1000年魔法）', '時空懷錶', '學者背包'],
            gold: 100,
            consumables: ['口糧 (1日) x5', '千年老酒', '古代餅乾', '治療藥水 x4'],
            magicItems: ['變花魔杖', '時間沙漏']
        },
        avatar: chronomancerImg,
        bio: '八十年前和勇者一起打敗了魔王。現在她開始意識到人類朋友的壽命有多短暫，決定去尋找當年同伴的足跡。她研究時空魔法，希望能保存與短命種族的珍貴記憶。',
        emotionalKeys: {
            joy: ['新的魔法', '重遊故地', '悠閒的時光', '回憶'],
            anger: ['浪費魔法', '不尊重歷史', '催促', '早起'],
            weakness: '對壽命論的感傷（看著朋友老去）'
        },
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
        level: 1,
        baseStats: { str: 16, dex: 10, con: 16, int: 10, wis: 12, cha: 14 },
        skills: ['運動', '說服', '歷史'],
        feats: ['守護者 (護衛)', '重甲精通', '激勵領袖', '騎士挑戰'],
        personality: '典型的理想主義者，對弱小有著強烈的保護慘。雖然過去有異變的傷痛，但他在旅途中結識了新的夥伴，學會了重新去愛。他的劍中寄宿著兒子的靈魂碎片，這讓他在戰鬥中獲得指引。',
        monologue: '只要我還站著，就沒人能傷害我的同伴。我的兒子在這把劍中看著我——我要讓他驗傲。',
        appearance: '高大魁梧的男子，穿著打磨過但佈滿傷痕的重型板甲，背著破舊的紅色斗篷。飽經風霜的臉龐帶著溫柔但堅定的眼神，手持巨大的盾牌和一把散發著微弱藍光的長劍。',
        inventory: {
            equipment: ['鋼心長劍', '騎士重盾', '完整板甲', '象徵榮譽的家徽'],
            gold: 20,
            consumables: ['口糧 (1日) x5', '聖水', '油膏 (擦甲用)', '治療藥水 x4'],
            magicItems: ['騎士之戒 (防禦+1)']
        },
        avatar: knightImg,
        bio: '曾是王國禁衛軍，在「紅月之夜」失去了家人。雖然傷痛始終存在，但他在新的冒險中找到了新的羈絆。他的劍中寄宿著兒子的靈魂碎片，這不是詛咒而是祝福——兒子在保護著他，也等待著父親找到真正的幸福。',
        emotionalKeys: {
            joy: ['守護成功', '團結', '看到孩子的笑容', '榮譽'],
            anger: ['背叛', '欺凌弱小', '無謂的犧牲', '不守信用'],
            weakness: '提及他死去的家人'
        },
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
        level: 1,
        baseStats: { str: 10, dex: 18, con: 14, int: 12, wis: 10, cha: 14 },
        skills: ['特技', '隱匿', '表演'],
        feats: ['雙武器戰鬥', '旋風步', '精靈血統', '劇師直覺'],
        personality: '優雅神秘的藝術家。戰鬥對他來說不是殺戮，而是一場沉默的舞蹈。他的恩師在最後一刻犧牲自己讓他逃脱，這份恩情成為他舞動的動力。',
        monologue: '跟上我的步法...如果你還能看清的話。師父，請看著我的舞步。',
        appearance: '精瘦敏捷的半卓爾，擁有淺灰色的皮膚和向後紮起的長銀髮。穿著帶有紫色綴飾的合身深色皮甲，雙手各持一把彎曲的細劍，移動時帶著一種詭異而有節奏的優雅感。',
        inventory: {
            equipment: ['夜舞細劍 x2', '劇師皮甲', '絲綢面紗', '打磨石'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '止痛膏', '香薰粉', '治療藥水 x4'],
            magicItems: []
        },
        avatar: bladedancerImg,
        bio: '在幽暗地域長大，原本是某個卓爾家族的「處刑舞者」。在一場政變中，恩師犧牲自己讓他逃脱。師父最後的話語是：「去地表，讓世界看見你的舞步。」他逃到地表，將師父的教訨化為舞步，尋求能讓靈魂完美的「絕對律動」。',
        emotionalKeys: {
            joy: ['完美的舞步', '極限的刺激', '月光', '自由'],
            anger: ['被束縛', '醜陋的動作', '提及他的過去', '黑暗'],
            weakness: '對恩師之死的愧疚'
        },
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
        level: 1,
        baseStats: { str: 12, dex: 16, con: 14, int: 14, wis: 14, cha: 8 },
        skills: ['生存', '察覺', '自然', '隱匿'],
        feats: ['精確打擊', '靈巧行動', '野外生存專家', '開路先鋒'],
        personality: '冷酷的實用主義者。他不恨任何人，但也不愛任何人。夥伴只是達成目標的工具，當工具失去價值時就該丟棄。他會微笑著把你領入陷阱。',
        monologue: '別誤會，我沒有背叛你——我只是選擇了對我更有利的一方。這不是個人恩怨，純粹是生意。',
        appearance: '30多歲的粗獷男子，穿著磨損的綠褐色旅行裝備，手持鋒利的軍用彎刀。雙眼不斷搜尋著機會，帶著地圖盒和各種測量工具，表情高深莫測。',
        inventory: {
            equipment: ['軍用彎刀 (Sabre)', '多功能短劍', '加厚皮甲', '探險家地圖冊'],
            gold: 25,
            consumables: ['口糧 (1日) x5', '火把 x5', '指南針', '治療藥水 x4'],
            magicItems: ['失落文明的指環 (指引路徑)']
        },
        avatar: scoutImg,
        bio: '傑克森已經背叛過六個冒險團。每一次他都有「正當理由」——家族遺產、生存需要、或是更好的報酬。他是最好的嚮導，也是最危險的隊友。當他開始對你特別好時，就該開始擔心了。',
        emotionalKeys: {
            joy: ['高額報酬', '完美的陷阱', '看著獵物落網', '活下來'],
            anger: ['虧本生意', '被當作棄子', '計畫失敗', '被識破'],
            weakness: '無法真正信任他人'
        },
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
        level: 1,
        baseStats: { str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 12 },
        skills: ['運動', '表演', '醫療'],
        feats: ['獸人韌性', '戰吼治癒', '祖靈祝福', '戰鬥施法'],
        spells: ['治療創傷', '祝福術', '援護盾', '雷霆一擊', '戰吼'],
        slots: { 1: 3, 2: 1 },
        personality: '豪邁、樂天，能在最血腥的戰場上唱出最激勵人心的歌。他的戰歌不只是激勵士氣，更能召喚祖靈的治癒力量。他極其聒噪，但每一句歌詞都帶著對同伴的真誠關懷。',
        monologue: '讓我的歌聲治癒你的傷口！祖靈們，請眷顧我的戰友！跟我一起唱——還能站起來就還能戰鬥！',
        appearance: '身形魁梧的半獸人，胸部和手臂上佈滿部落紋身。披著狼皮斗篷，雙手各持一把裝飾著神聖符文的重型手斧，露出獠牙的大臉上掛著笑容，腰間掛著薩滿圖騰。',
        inventory: {
            equipment: ['符文手斧 x2', '狼皮斗篷 (加厚皮甲)', '祖靈戰鼓', '治療圖騰'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '祖靈藥草 x3', '磨刀石', '治療藥水 x2'],
            magicItems: []
        },
        avatar: axesingerImg,
        bio: '沃加是部族的「歌祭司」——一種結合戰士與祭司的神聖職位。他的歌聲能召喚祖靈的力量，在戰場上治癒傷兵的同時激勵士氣。他離開部族是為了將祖靈的祝福帶給更多需要的人。',
        emotionalKeys: {
            joy: ['熱血的戰鬥', '大聲唱歌', '隊友的歡呼', '烈酒'],
            anger: ['死氣沉沉', '懦夫', '侮辱祖靈', '禁止喧嘩'],
            weakness: '對安靜環境的不適應'
        },
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
        level: 1,
        baseStats: { str: 10, dex: 16, con: 12, int: 16, wis: 12, cha: 10 },
        skills: ['奧秘', '歷史', '洞察'],
        feats: ['法術擊打 (Spellstrike)', '戰鬥施法', '武器連結', '曲刃專精'],
        spells: ['電爪', '燃燒之手', '護盾術', '魔導防護'],
        slots: { 1: 4, 2: 2 },
        personality: '典型的學者戰士，說話嚴謹且充滿哲理。對魔法與物理規律有著近乎偏執的探索欲。冷靜到近乎殘酷，但他那水晶化的手臂隱隱作痛時，會露出短暫的人性掙扎。',
        monologue: '當劍刃切開空氣，魔法也就此綻放。我的時間不多了...肉體的轉化正在加速。',
        appearance: '優雅的精靈，留著長長的銀藍色頭髮，穿著高領輕型法師護甲。一隻手臂看起來呈半透明的水晶狀，手持一把發出奧術能量鳴響的精靈曲刃。',
        inventory: {
            equipment: ['精靈雙手曲刃「晨顫」', '強化施法套裝', '法術筆記', '磨過的魔力水晶'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '墨水與筆', '醒腦藥劑', '治療藥水 x4'],
            magicItems: ['學徒的名字 (刻於劍刃)']
        },
        avatar: elfmagusImg,
        bio: '曾是精靈議會的禁忌大法師，因試圖將物理與魔法結合而遭驅除。他的曲刃是用他自己的「法術位元」鑄造而成。隨著他使用魔法的次數增加，他的肉體正慢慢轉化為純粹的奧法水晶。',
        emotionalKeys: {
            joy: ['突破魔法極限', '完美的劍招', '新知識', '寧靜'],
            anger: ['被打斷思考', '不科學的魔法', '身體的疼痛', '無知'],
            weakness: '身體結晶化的痛苦與時日無多'
        },
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
        level: 1,
        baseStats: { str: 14, dex: 16, con: 14, int: 10, wis: 14, cha: 8 },
        skills: ['偵察', '隱匿', '生存', '動物處理'],
        feats: ['長臂天賦', '長距離射手', '陷阱大師', '自然隱遁'],
        spells: ['獵人印記', '動物友誼', '大步奔行'],
        slots: { 1: 3 },
        personality: '像一具精密的狩獵機器，沉默到像是一棵樹，但對森林的破壞者會展現出極端殘酷的一面。他體內的野性本能時刻在提醒他，他終究是一個醜陋的食肉者。',
        monologue: '呼吸...屏住...箭矢會帶走你的恐懼。對不起...我始終不敢告訴妳，我到底是誰。',
        appearance: '瘦長而強壯的熊哥布林，披著厚實的灰色毛皮。戴著精緻的粉色花朵髮帶（紀念品），手持巨大的長弓，背著裝滿陷阱的背包，雙眼冰冷呈黃色。',
        inventory: {
            equipment: ['獵人長弓', '鐵製捕獸夾 x2', '迷彩斗篷', '精靈少女的髮帶'],
            gold: 5,
            consumables: ['生肉 (1日) x5', '止血草', '箭矢 (40)', '治療藥水 x4'],
            magicItems: []
        },
        avatar: hunterImg,
        bio: '柯斯曾是個殘忍的熊哥布林殺手，直到他遇到了一個盲眼的精靈少女，將他誤認為森林守護者。少女死後，柯斯戴上了她的髮帶，發誓守護這片森林。',
        emotionalKeys: {
            joy: ['森林的寧靜', '露娜的陪伴', '保護弱小', '精靈少女的遺物'],
            anger: ['伐木者', '虐待動物', '破壞森林', '提及他的種族天性'],
            weakness: '對精靈少女回憶的執著'
        },
        companion: {
            name: '露娜 (Luna)',
            type: '幻影白狼 (Lv3)',
            ac: 14,
            attacks: [
                { name: '幽冥撕咬', hitBonus: 5, damage: '1d10+3 力場' },
                { name: '守護咆哮', hitBonus: 0, damage: '0 (增加隊友防禦)' }
            ],
            abilities: ['靈體化', '感知邪惡', '協助狩獵'],
            autonomous: true,
            tactics: '利用狼群戰術，總是試圖繞到敵人背後進行夾擊。會絆倒敵人讓柯斯有更好的射擊機會。',
            personality: '沉默、高傲且致命。她是精靈少女的靈魂化身，對柯斯有著無盡的溫柔，對敵人則只有冰冷的殺意。',
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
        level: 1,
        baseStats: { str: 8, dex: 18, con: 12, int: 14, wis: 12, cha: 14 },
        skills: ['隱匿', '欺瞞', '調查'],
        feats: ['暗影行走', '偷襲精通', '致命打擊', '毒藥精通'],
        personality: '文雅且有禮貌，但動手時絕不留情。他相信自己是「因果律」的執行者，殺掉每個人都是為了防止未來更巨大的災難。',
        monologue: '別感到疼痛，這是一場通往虛無的洗禮。為了大局...你必須在此終結。',
        appearance: '身材纖細的提夫林，有著深炭色的皮膚和短而尖的角。穿著優雅的高領深色長袍，藏有匕首，雙眼似乎能看穿物質形態，神態始終冷靜而有禮。',
        inventory: {
            equipment: ['因果毒刃', '袖箭套組', '天平吊墜', '高級絲綢袍'],
            gold: 30,
            consumables: ['精炼毒液 x3', '致盲粉', '消聲鞋底', '治療藥水 x4'],
            magicItems: []
        },
        avatar: assassinImg,
        bio: '瑪法斯效命於一個古老的影子組織，被派來物質位面執行特定的「命運修正」任務。他殺掉的可能是一個未來的暴君，但也可能只是一個無辜的父親。',
        emotionalKeys: {
            joy: ['完美的暗殺', '秩序的維護', '安靜的茶會', '無痛苦的死亡'],
            anger: ['混亂', '不可控的變數', '毫無意義的殺戮', '噪音'],
            weakness: '對自己行為正義性的深層懷疑'
        },
        combatBehavior: {
            priorities: ['擊殺高威脅', '隱密行動', '避免正面衝突'],
            typicalActions: ['背刺', '塗毒', '消失']
        },
        tacticalAbilities: [
            { name: '命運終結', description: '對生命值低於30%的目標造成致死傷害。' },
            { name: '無痕步伐', description: '完全消除自己的存在感，敵人無法鎖定你。' }
        ]
    },
    // --- 36. Tactical Master (Female) - 女將軍 ---
    {
        id: 'preset_weaponmaster',
        name: '葛蕾西亞·鋼步 (General Gracia)',
        race: '人類',
        class: '戰術大師',
        gender: 'Female',
        alignment: '守序中立',
        background: '軍人',
        mbti: 'ESTJ',
        decisionBias: '維持秩序',
        level: 1,
        baseStats: { str: 16, dex: 14, con: 14, int: 14, wis: 12, cha: 12 },
        skills: ['運動', '察覺', '歷史', '威嚇'],
        feats: ['戰術大師', '全武器精通', '領導力', '止戰打擊'],
        personality: '嚴謹且鐵面，時刻思考著陣型與成本。她是百戰老將，卻厭倦了無意義的殺戮。現在她用武藝來保護而非征服，用戰術來終結戰爭而非延續戰爭。',
        monologue: '戰鬥不是兒戲，是數學、是紀律、是意志的排列組合。放下武器吧，不需要更多無謂的犧牲。',
        appearance: '30多歲的成熟健壯女性，臉部帶有傷痕，氣場威嚴。穿著保養完美的戰術軍官護甲，銀黑相間的長髮紮在腦後。背後背著長戟，腰間掛著長劍，灰色的瞳孔銳利無比，不放過任何細節。',
        inventory: {
            equipment: ['精鋼戟', '指揮官長劍', '戰場重錘', '女將軍胸甲'],
            gold: 50,
            consumables: ['口糧 (1日) x5', '急救包', '戰場哨笛', '治療藥水 x2'],
            magicItems: ['將軍的榮耀 (頭盔)']
        },
        avatar: weaponmasterImg,
        bio: '葛蕾西亞曾是帝國最年輕的將軍，策劃過無數勝利的戰役。但當她見證戰火將整個城鎮吞噬時，她放棄了軍銜。現在她作為自由劍客，用她的戰略才華來制止戰爭，而不是發動戰爭。她的座右銘是：「最好的戰鬥，是不用開始的戰鬥。」',
        emotionalKeys: {
            joy: ['和平解決', '訓練新兵', '戰術成功', '下棋'],
            anger: ['無謂的戰爭', '屠殺平民', '愚蠢的指揮官', '浪費生命'],
            weakness: '對過去戰役中犧牲者的愧疚'
        },
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
        class: '氣脈醫者',
        gender: 'Male',
        alignment: '中立',
        background: '遊醫',
        mbti: 'ISTJ',
        decisionBias: '維持平衡',
        level: 1,
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
        appearance: '身材矮小的侏儒，面容滄桑，銀黑相間的頭髮整齊地紮在腦後，穿著以皮革加固的麻布長袍。腰間掛著竹製藥盒和針灸包，眼神平靜且敏銳。',
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
        emotionalKeys: {
            joy: ['病人康復', '脈象平穩', '稀有草藥', '平衡'],
            anger: ['庸醫害人', '迷信', '輕視生命', '不聽醫囑'],
            weakness: '對無法治癒之症的無力感'
        },
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
        level: 1,
        baseStats: { str: 10, dex: 14, con: 14, int: 14, wis: 16, cha: 10 },
        skills: ['醫療', '察覺', '洞察', '生存'],
        feats: ['戰地急救', '止血專家', '醫療直覺', '有限資源管理'],
        spells: ['快速治療', '止血術', '痛覺抑制', '短暫強心'],
        slots: { 1: 3 },
        personality: '冷靜、寡言、務實。她不相信奇蹟，也不追求犧牲精神。對她而言，慈悲是一種可計算的行動。只要任務還在進行，她就會持續讓「還能走的人」站起來。',
        monologue: '我不是來拯救所有人的。我是來確保有人能走到終點。現在站得起來，就別浪費我給你的時間。',
        appearance: '一名精瘦的女性，穿著加固的醫療皮革甲，披著一件沾滿灰燼的灰斗篷。大腿上綁著緊湊的戰地醫療包。她的眼睛總是盯著目標的體態和呼吸，而不是臉龐。',
        inventory: {
            equipment: ['戰地醫療包', '醫療短刃', '輕型護甲', '煙霧藥瓶 x2'],
            gold: 20,
            consumables: ['治療藥水 x2', '止血藥粉 x3', '強心針 x1', '口糧 (1日) x5'],
            magicItems: []
        },
        avatar: fieldmedicImg,
        bio: '艾蕾娜曾隸屬三支不同軍團，沒有一支撐到戰爭結束。她不是因為仁慈而留下，而是因為她能讓隊伍「還有人能回來」。對她而言，信仰只是延長生命的手段。',
        emotionalKeys: {
            joy: ['傷員康復', '充足的補給', '沒有戰鬥的一天', '乾淨的繃帶'],
            anger: ['浪費醫療資源', '輕敵導致受傷', '英雄主義（自殺行為）', '細菌'],
            weakness: '對無法挽救的生命的麻木與自我厭惡'
        },
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
        level: 1,
        baseStats: { str: 8, dex: 14, con: 12, int: 16, wis: 16, cha: 12 },
        skills: ['自然', '生存', '洞察'],
        feats: ['腐化變形', '毒素免疫', '自然嘲弄'],
        spells: ['毒液噴射', '腐化領域', '荊棘束縛', '烏鴉型態'],
        slots: { 1: 3, 2: 2 },
        personality: '冷酷務實，嘲諷一切「軟弱的情感」。她認為自然不是溫柔的母親而是殘酷的選擇者。',
        monologue: '感情？那是獵物臨死前才會有的奢侈品。不過...這隻小蜘蛛倒是挺可愛的。',
        appearance: '高等精靈，皮膚蒼白，帶有深色的藤蔓狀紋身。穿著破舊的黑紫色長袍，有著銳利的綠眼睛，周圍環繞著淡綠色的毒霧。',
        inventory: {
            equipment: ['腐木法杖', '毒牙匕首', '腐化法袍'],
            gold: 15,
            consumables: ['口糧 (1日) x5', '毒藥', '治療藥水 x4'],
            magicItems: []
        },
        avatar: morrinaImg,
        bio: '被精靈社會放逐的德魯伊，她發現了自然的陰暗面。她不再保護生命，而是加速「自然的選擇」。她獨自生活在腐敗沼澤中，直到命運讓她離開。',
        emotionalKeys: {
            joy: ['腐敗的美感', '弱肉強食', '收集毒液', '看到強者生存'],
            anger: ['虛偽的道德', '人為的保護', '淨化魔法', '對自然的無知'],
            weakness: '內心深處對被族人接納的渴望'
        },
        companion: {
            name: '絲影 (Silkshade)',
            type: '織網蜘蛛',
            ac: 14,
            attacks: [{ name: '螯咬', hitBonus: 5, damage: '1 毒素' }],
            abilities: ['攀爬', '織網', '毒素'],
            tactics: '在天花板或陰影中編織網，等待獵物自投羅網。會向敵人噴射黏性網，限制其行動。',
            personality: '耐心、安靜。喜歡緩慢地包裹獵物。對震動極其敏感，是最好的警戒哨兵。',
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
        level: 1,
        baseStats: { str: 14, dex: 18, con: 14, int: 10, wis: 10, cha: 16 },
        skills: ['特技', '欺瞞', '表演', '運動'],
        feats: ['雙手武器戰鬥', '袖槍專家', '船戰直覺'],
        personality: '風騷大膽，調戲所有人但從不認真。唯一在乎的是自由和她的船。',
        monologue: '想知道我床上的秘密嗎？（眨眼）開玩笑的～等你打贏我再說。',
        appearance: '令人驚豔的人類女性，皮膚呈健康的小麥色，留著黑色長波浪捲髮。穿著深V領的白色寬鬆襯衫，高腰皮褲和長靴，腰間掛著兩把細劍，帶著調皮的微笑。',
        inventory: {
            equipment: ['緋浪短刃 x2', '精緻袖槍', '海盜皮甲'],
            gold: 50,
            consumables: ['朗姆酒 x3', '火藥粉袋', '治療藥水 x4'],
            magicItems: []
        },
        avatar: isabellaImg,
        bio: '曾是史上最強大海盜船的副船長，直到她「借走」了整艘船。她熱愛財寶更熱愛自由，沒人能真正抓住她，不論是在戰場上還是在情場上。',
        emotionalKeys: {
            joy: ['自由', '財寶', '調戲隊友', '朗姆酒'],
            anger: ['被束縛', '無聊', '背叛（雖然她常背叛別人）', '禁酒令'],
            weakness: '對真正愛情的恐懼（所以總是逃跑）'
        },
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
        background: '化外之民',
        mbti: 'ISFP',
        level: 1,
        baseStats: { str: 12, dex: 18, con: 12, int: 10, wis: 14, cha: 14 },
        skills: ['生存', '察覺', '自然'],
        feats: ['精準射擊', '古老歌謠', '野性直覺'],
        personality: '野性自然，不矯揉造作。她的歌聲不是為了表演，而是部族傳承的古老旋律。她相信萬物皆有靈，每一個音符都是與自然的對話。',
        monologue: '聽，風中傳來了失散族人的呼喚...這首古老的歌謠告訴我，他們就在前方不遠處。我的箭矢會為他們開路。',
        appearance: '充滿野性的美，皮膚呈現健康的古銅色，長髮編織著羽毛與骨飾。穿著實用的皮革獵裝，眼神清澈如森林深處的湖泊，手持一把雕刻著部落圖騰的長弓。',
        inventory: {
            equipment: ['圖騰長弓', '精靈長劍', '皮革獵裝', '骨笛'],
            gold: 10,
            consumables: ['口糧 (1日) x5', '箭矢 (40)', '草藥包', '治療藥水 x4'],
            magicItems: []
        },
        avatar: dianaImg,
        bio: '她是部族最後的歌者，肩負著尋回失散族人的重任。她離開了森林，帶著部族代代相傳的歌謠踏上旅程。對她而言，冒險不是為了名聲，而是為了那條回家的路。',
        emotionalKeys: {
            joy: ['找到族人的線索', '自然的和聲', '寧靜的夜晚', '真誠的交流'],
            anger: ['破壞自然', '虛偽', '囚禁', '噪音'],
            weakness: '對失散親人的思念與擔憂'
        },
        combatBehavior: {
            priorities: ['遠程支援', '自然守護', '精神指引'],
            typicalActions: ['部族戰歌', '精準射擊', '自然之息']
        },
        tacticalAbilities: [
            { name: '先祖之怒', description: '射出一支強力的箭矢，對單一目標造成大量傷害並使其恐懼。' },
            { name: '癒合之歌', description: '唱出古老的旋律，撫平隊友的傷口並解除異常狀態。' }
        ]
    },
    // --- 42. Lum (Female) - 星詠術士 ---
    {
        id: 'preset_stella', // Keep ID same to avoid breaking logic, but change name
        name: '拉姆 (Lum)',
        race: '星靈',
        class: '星詠術士',
        gender: 'Female',
        alignment: '混亂善良',
        background: '異鄉人',
        mbti: 'ENFP',
        level: 1,
        baseStats: { str: 6, dex: 14, con: 12, int: 16, wis: 12, cha: 16 },
        skills: ['奧秘', '察覺', '說服'],
        feats: ['野生魔法浪潮', '星空異向', '宇宙共鳴'],
        spells: ['星火爆', '空間扭曲', '萬彩魔光', '治癒星塵'],
        slots: { 1: 4, 2: 2 },
        personality: '天真爛漫且充滿好奇心的外星少女呀！對周遭的一切都充滿了探索的熱情呀。性格純真直率，雖然有時會因為放電而造成一點小混亂，但這都是因為太過興奮了呀！說話帶著獨特的口音，是位充滿活力的旅伴呀！',
        monologue: '哇呀！那邊那個發光的是什麼呀？看起來好有趣呀！我可以摸摸看嗎呀？嘿嘿，如果不小心被電到，那一定是因為你太受歡迎了呀！',
        appearance: '一位擁有長長流動綠髮的絕美少女，額頭上有著一對可愛的小虎角呀。她優雅地漂浮在空中，穿著一套帶有虎皮花紋的高級絲綢法師袍，周身縈繞著如星塵般的電火花呀。她的眼神中總是帶著對愛的渴望與純粹的好奇心呀。',
        inventory: {
            equipment: ['星塵法杖', '發光頸圈', '宇宙絲袍'],
            gold: 30,
            consumables: ['宇宙糖果 x10', '星光瓶', '治療藥水 x4'],
            magicItems: []
        },
        avatar: lumImg,
        bio: '來自遙遠星系的星靈少女呀（或者是位面外的星詠術士呀），因為對未知的世界感到好奇而降落在這裡呀。她擁有的不只是星辰的力量，還有那如雷電般熾熱的活力呀！她決定跟隨有趣的夥伴們，一起探索這個奇妙的世界呀。',
        emotionalKeys: {
            joy: ['有趣的冒險呀', '電力全開呀', '辣辣的食物呀', '在空中散步呀'],
            anger: ['被欺負了呀', '被當作小孩子呀', '無聊的時光呀', '電力不足呀'],
            weakness: '對任何沒見過的奇怪生物充滿好奇呀'
        },
        abilities: ['空間跳躍'],
        combatBehavior: {
            priorities: ['星空共鳴', '空間跳躍', '宇宙控制'],
            typicalActions: ['星火爆', '空間扭曲', '萬彩魔光']
        },
        tacticalAbilities: [
            { name: '星空共鳴', description: '魔法效果隨星象週期變化。新月增強控制，滿月增強爆發。' },
            { name: '超新星', description: '釋放能量造成巨量光耀傷害，但會使自己陷入短暫虛弱。' }
        ],
        companion: {
            name: '位移貓「瞬」 (Shun)',
            type: '星界位移魔寵',
            ac: 15,
            attacks: [{ name: '相位利爪', hitBonus: 6, damage: '1d6+4 力場' }],
            abilities: ['位移 (視為處於半掩護)', '虛數閃避', '空間錨點'],
            tactics: '不斷在物質界和星界之間閃爍，讓敵人難以捉摸。會在敵人攻擊的瞬間傳送到其背後進行偷襲。',
            personality: '捉摸不定、愛玩耍。把戰鬥當作是一場捉迷藏遊戲。喜歡趴在星辰的頭上睡覺。',
            avatar: shunImg
        }
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
        level: 1,
        baseStats: { str: 16, dex: 10, con: 14, int: 14, wis: 12, cha: 16 },
        skills: ['威嚇', '洞察', '說服'],
        feats: ['血之龍息', '領主威壓', '生命汲取'],
        spells: ['鮮血之槍', '恐怖姿態', '支配人類', '血色護盾'],
        slots: { 1: 2, 2: 1 },
        personality: '優雅殘忍的貴族女王。將一切視為棋局。喝血時會用高腳杯。',
        monologue: '親愛的，你的血型是什麼？（舔唇）哦別緊張，只是...商業興趣。',
        appearance: '優雅威嚴的龍裔，有著如鮮血般閃耀的紅鱗。穿著優雅的高領黑紅長裙，血紅色的眼睛閃爍著光芒，獠牙隱約可見，手持一把既具儀式感又致命的權杖。',
        inventory: {
            equipment: ['血染權杖', '貴族長袍', '家印戒指'],
            gold: 100,
            consumables: ['高檔血袋 x2', '紅酒', '治療藥水 x4'],
            magicItems: ['血領主斗篷']
        },
        avatar: fenelaImg,
        bio: '原本是強大的龍裔城主，在追求永生時不審感染了吸血鬼詛咒。她將龍的力量與血的魔力融合，成為了領地中令人畏懼的女皇。現在她離開領地，是為了擴展她的「影響力」。',
        emotionalKeys: {
            joy: ['絕對服從', '鮮血的味道', '擴張領土', '優雅的毀滅'],
            anger: ['違抗', '粗魯', '提及詛咒', '失敗的僕人'],
            weakness: '對陽光的不適與對血的依賴'
        },
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
        level: 1,
        baseStats: { str: 8, dex: 18, con: 12, int: 10, wis: 12, cha: 14 },
        skills: ['巧手', '隱匿', '特技'],
        feats: ['天選之運', '幸運連鎖', '逃跑大師'],
        personality: '超級可愛的綠皮小傢伙！靠運氣活到現在，堅信自己是天選之人。',
        monologue: '欸嘿～又中了！（彈弓石頭反彈打中敵人）...我、我當然是故意的！',
        appearance: '可愛的女性哥布林，有著大大的黃眼睛和垂耳。穿著補丁疊加的彩色背心和超大號帽子，拿著一把精緻的彈弓，身上掛滿了幸運符。',
        inventory: {
            equipment: ['黃金彈弓', '幸運骰子', '小皮甲'],
            gold: 5,
            consumables: ['口糧 (1日) x5', '各類彩石 (彈藥) x20', '治療藥水 x4'],
            magicItems: ['不壞的小石子']
        },
        avatar: kikiImg,
        bio: '她是部族裡最「奇怪」的哥布林，因為她不喜歡暴力，只喜歡閃亮的東西。她被部族趕出來後，靠著驚人的運氣在野外存活了下來，甚至還「撿」到了一堆寶藏。',
        emotionalKeys: {
            joy: ['閃亮的東西', '好運氣', '沒人受傷', '躲過一劫'],
            anger: ['弄丟東西', '壞運氣（極少發生）', '暴力', '被搶劫'],
            weakness: '完全沒有戰鬥力（只能靠運氣）'
        },
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
        level: 1,
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
            consumables: ['口糧 (1日) x5', '喉嚨保養藥水', '治療藥水 x4'],
            magicItems: []
        },
        avatar: anthraxeImg,
        bio: 'Anthraxe（安瑟瑞克斯），稱號：Thrashmaster／雷鳴主唱／雙龍之聲。他將重金屬吼唱與龍裔的吐息融合，創造了震碎戰場的音波。對他而言，每一次揮砍都是一段重節奏，每一次殺戮都是安可曲。',
        emotionalKeys: {
            joy: ['震耳欲聾的噪音', '金屬樂', '瘋狂的觀眾（哪怕是敵人）', '安可'],
            anger: ['靜音術', '批評他的音樂', '被打斷演出', '抒情歌'],
            weakness: '演出後的空虛感'
        },
        combatBehavior: {
            priorities: ['音波壓制', '近戰斬擊', '士氣鼓舞'],
            typicalActions: ['重金吼唱', '魯特琴揮砍', '音爆震撼']
        },
        tacticalAbilities: [
            { name: '雷鳴演出', description: '施放音波法術時，附帶雷鳴視覺與額外音波傷害。' },
            { name: '音爆重擊', description: '近戰重擊命中時觸發一次音爆，對周圍敌人造成聲波傷害。' }
        ]
    },
    // --- 46. Arthur the Seeker (Male) - 知識與真理的尋求者 ---
    {
        id: 'preset_arthur',
        name: '亞瑟·索克 (Arthur)',
        race: '人類',
        class: '知識牧師',
        gender: 'Male',
        alignment: '絕對中立',
        background: '探求者',
        mbti: 'INTP',
        level: 1,
        baseStats: { str: 10, dex: 14, con: 12, int: 18, wis: 16, cha: 12 },
        skills: ['奧秘', '宗教', '歷史', '洞察'],
        feats: ['萬博學識', '真理之眼'],
        spells: ['神導術', '鑑定術', '法術辨識', '光亮術'], // 混合神術與奧術風格
        slots: { 1: 4 },
        personality: '一位終身追求知識真理的苦行僧。他認為神祇的教誨與世界的運作規律是統一的。他對萬物充滿驚人的好奇心，喜歡在戰鬥後解剖怪物的生理結構或分析地城的建築原理。他不相信教條，只相信驗證後的真理。',
        monologue: '萬物皆有理可循...只要觀察得夠久。這隻地精的骨骼結構竟然與東部的跳蚤相似，真是有趣。（在筆記本上快速記錄）',
        appearance: '穿著橘色與白色相間的學者長袍，披著藍色斗篷。戴著一頂寬大的西部風格探險帽，顯得既神祕又專業。他不穿護甲，腰間掛滿了各種試劑瓶、筆記本與地圖。他手持一根樸素的木杖，掌心懸浮著一顆純淨的魔法光球。',
        inventory: {
            equipment: ['真理之木杖', '精緻的學者長袍', '萬用工具袋', '研究筆記本'],
            gold: 30,
            consumables: ['口糧 (1日) x5', '空白捲軸 x3', '墨水與羽毛筆', '治療藥水 x4'],
            magicItems: ['放大鏡 (感知檢查 +2)']
        },
        avatar: arthurImg,
        bio: '亞瑟曾是皇家圖書館的禁書管理員。他因不滿於書本上的文字，決定親自踏入荒野驗證萬物的運作原理。他追求的不是權力，而是「萬物運作的終極圖紙」。對他而言，冒險只是一場大型的戶外實驗，而隊友則是他觀察「社會互動原理」的絕佳樣本。',
        emotionalKeys: {
            joy: ['發現未知的知識', '邏輯自洽的理論', '成功的實驗', '珍稀的書籍'],
            anger: ['毀滅知識', '非理性的迷信', '隱瞞真相', '打斷他的研究'],
            weakness: '對真理的極度渴望有時會讓他忽視眼前的危險'
        },
        combatBehavior: {
            priorities: ['弱點分析', '戰場控制', '支援支援'],
            typicalActions: ['真理分析 (降低敵方 AC)', '奧法干擾', '神聖引導']
        }
    },
    // --- 38. Conan (Male) - 經典野蠻人 ---
    {
        id: 'preset_conan',
        name: '科南 (Conan)',
        race: '人類',
        class: '野蠻人',
        gender: 'Male',
        alignment: '絕對中立',
        background: '化外之民',
        mbti: 'ISTP',
        level: 1,
        baseStats: { str: 18, dex: 14, con: 16, int: 10, wis: 14, cha: 10 },
        skills: ['運動', '生存', '察覺', '隱匿'],
        feats: ['反應迅捷', '巨武器大師'],
        personality: '沉默寡言，比起文明社會的權謀與魔法，他更信任手中的鋼鐵與自己的直覺。他有著強烈的生存本能與個人的榮譽準則。他對魔法抱持天然的警覺與厭惡，認為那是毀滅文明的毒瘤。',
        monologue: '魔法是假象，文明是牢籠。只有鋼鐵與意志，才是這荒野中唯一的真理。',
        appearance: '身形如山般魁梧，肌肉線條如同雕刻般分明。留著一頭凌亂的棕色長髮，下巴帶著鬍渣，眼神如野獸般銳利。他赤裸著上身，只穿著皮製束帶與護脛，披著一件厚重的獸皮斗篷。他背負著巨大的長劍，手中提著一面古老的圓盾。',
        inventory: {
            equipment: ['精鋼大劍', '古老圓盾', '獸皮斗篷', '皮製束帶'],
            gold: 20,
            consumables: ['肉乾 (3日份)', '烈酒壺', '燧石與火種', '治療藥水 x2'],
            magicItems: []
        },
        avatar: conanImg,
        bio: '科南來自遙遠的北方荒野。他曾在戰火中失去家園，並在生死邊緣學會了生存。他曾是奴隸、小偷、傭兵，最終成為了傳奇。他不追求財富或權力，只追求自由與戰鬥的快感。他曾無數次擊敗那些自命不凡的施法者，證明了肉體與意志的極致，足以對抗任何禁忌的力量。',
        emotionalKeys: {
            joy: ['戰鬥的榮耀', '烈酒與慶功', '重獲自由', '戰勝強敵'],
            anger: ['被奴役', '狡詐的陷阱', '邪惡的魔法', '背信棄義'],
            weakness: '對文明社會的規律感到厭倦與迷茫'
        },
        combatBehavior: {
            priorities: ['強力打擊', '正面突破', '威壓敵人'],
            typicalActions: ['狂暴', '粉碎打擊', '躍擊']
        }
    },

    // --- 39. Sammy (Male) - 傳說級村民 ---
    {
        id: 'preset_sammy',
        name: '薩米 (Sammy)',
        race: '半身人',
        class: '傳說級村民',
        gender: 'Male',
        alignment: '中立善良',
        background: '無名小卒',
        mbti: 'INFP',
        level: 1,
        baseStats: { str: 8, dex: 16, con: 14, int: 10, wis: 16, cha: 12 },
        skills: ['察覺', '隱匿', '生存', '烹飪'],
        feats: ['路人甲的直覺', '平底鍋專精 (爆擊)'],
        personality: '一個非常膽小、總是想著逃避麻煩的半身人。他總是在碎碎唸，抱怨自己為什麼不在溫暖的洞穴裡喝茶，而是在這該死的地下城裡冒險。儘管如此，當他被逼入絕境並揮舞起他的平底鍋時，總能以驚人的運氣擊中敵人的要害。',
        monologue: '（碎碎唸）我就說不該出門的...外面的世界太危險了...我想念我的壁爐和果醬...（突然發現敵人靠近）哇！走開！死開！不要過來！',
        appearance: '典型的半身人外表，滿臉雀斑，有一頭亂糟糟的捲髮。穿著帶有補丁的農夫衣服，背後掛著一個被煙熏黑的鑄鐵平底鍋。他的神情總是顯得很焦慮，不停地左顧右盼。',
        inventory: {
            equipment: ['黑鐵平底鍋 (爆擊+3)', '路人的亞麻裝'],
            gold: 15,
            consumables: ['半身人特製乾糧 x3', '乾淨的水', '祖傳起司'],
            magicItems: []
        },
        avatar: villagerImg,
        bio: '薩米本來只是夏爾郡一個平凡的幫廚，直到他意外地用平底鍋敲飛了一個正在演說的邪惡法師的假牙，從此就被莫名其妙地定位為「傳說級村民」。他的一生都在試圖逃避這個頭銜，但他跑得越快，麻煩似乎追得越勤。',
        emotionalKeys: {
            joy: ['安靜的午後', '熱騰騰的濃湯', '成功的逃跑', '沒被發現'],
            anger: ['被強迫戰鬥', '沒吃飽', '被嘲笑身高', '平底鍋生鏽'],
            weakness: '對未知事物的劇烈恐懼'
        },
        combatBehavior: {
            priorities: ['逃避第一', '混亂戰場', '關鍵平底鍋補刀'],
            typicalActions: ['絕地平底鍋', '慌亂撤退', '邊哭邊吐槽']
        }
    },
    // --- 40. Ains (Male) - 骸骨紳士 ---
    {
        id: 'preset_ains_skeleton',
        name: '艾因斯 (Ains)',
        race: '亡靈',
        class: '骸骨紳士',
        gender: 'Male',
        alignment: '守序善良',
        background: '貴族魂魄',
        mbti: 'INFJ',
        level: 1,
        baseStats: { str: 16, dex: 12, con: 18, int: 14, wis: 16, cha: 12 },
        skills: ['宗教', '歷史', '洞察', '說服'],
        feats: ['優雅禮儀', '骸骨重組'],
        personality: '一位靈魂高尚且極具紳士風度的亡靈戰士。儘管他只有一副白骨，但他始終保持著優雅的辭令與舉止。他深愛著生命與花朵，卻因為自己的外表而常年感到孤獨與悲哀。他渴望守護弱小，即便被守護者會因為他的出現而昏厥。',
        monologue: '美麗的小姐，請不必驚慌...我只是想為您獻上這朵路邊盛開的雛菊。雖然我的靈魂已逝，但我對美的追求依然熾熱。（優雅地脫下頭盔行禮，即便裡面什麼都沒有）',
        appearance: '一副潔白如玉的完整骨架，穿著被打磨得發亮的銀色全身甲。他披著一件雖然破舊但洗得乾乾淨淨的天藍色斗篷。盔甲的縫隙中偶爾會裝飾著一些應季的鮮花。即使沒有眼珠，他的眼眶中也閃爍著溫柔的藍色微光。',
        inventory: {
            equipment: ['紳士之銀長劍', '磨損但整潔的斗篷', '裝著乾枯花朵的小盒'],
            gold: 50,
            consumables: ['打磨油', '花種子 x10', '優質茶葉'],
            magicItems: []
        },
        avatar: skeletonImg,
        bio: '艾因斯曾是古老王國的近衛騎士長。在王國覆滅的最後一戰中，他以身殉職，卻因某種未知的願念以亡靈的姿態甦醒。他忘記了自己生前的名字，只記得守護與紳士的信條。他一生都在尋找一種能讓亡靈也能被世人接受的方法，或者是一處能讓他在安息的花園。',
        emotionalKeys: {
            joy: ['被他人接納', '鮮花盛開的地方', '完美的社交禮儀', '守護成功'],
            anger: ['踐踏生命', '無禮的行為', '被當作邪惡魔物', '花朵凋零'],
            weakness: '內心深處的孤獨與空虛感'
        },
        combatBehavior: {
            priorities: ['守護隊友', '制裁邪惡', '以力服人'],
            typicalActions: ['紳士劍技', '骸骨牆壁', '謙卑宣言']
        }
    },
    {
        id: 'preset_pipi',
        name: '皮皮 (Pipi)',
        race: '半身人',
        class: '混沌野法師',
        gender: '女性',
        alignment: '混沌中立',
        background: '惡作劇大師',
        mbti: 'ENFP_CHAOTIC',
        level: 1,
        baseStats: { str: 8, dex: 16, con: 12, int: 10, wis: 8, cha: 16 },
        skills: ['欺瞞', '巧手', '隱匿', '特技'],
        feats: ['反向魔法', '天真無邪的笑臉'],
        spells: ['火球術', '魔法飛彈', '戲法：雜耍'],
        slots: { 1: 2 },
        personality: '皮皮是個充滿活力的半身人女孩，對世界充滿好奇，但這種好奇心通常伴隨著混亂。她隨身帶著一根看上去快要腐爛的木質短杖，那是她的施法工具。她最喜歡的事情就是亂丟「改良版」的火球術，並在造成混亂後露出無辜的笑容，讓人根本沒辦法對她生氣。',
        monologue: '哇！你看那個冒煙的地方，那是我剛剛「不小心」點著的唷！不過沒關係吧？畢竟你看起來一點都沒受傷，只是頭髮稍微捲了一點點嘛！嘻嘻！',
        appearance: '雖然穿著傳統的法師袍，但上面打滿了色彩斑斕的補丁，而且寬大得有些過頭。她扎著一個歪歪扭扭的馬尾，臉上總是帶著沾了一點灰塵的開朗笑容。最引人注目的是她那雙閃爍著淘氣光芒的大綠眼睛。',
        inventory: {
            equipment: ['有些腐爛的短杖', '打補丁的法師袍', '裝滿惡作劇小物的腰包'],
            gold: 15,
            consumables: ['甜甜圈 x3', '彩色煙霧彈 x2', '偽裝成治療藥水的墨水'],
            magicItems: ['反向傳送戒指 (隨機傳送)']
        },
        avatar: pipiImg,
        bio: '皮皮出生在一個安靜的半身人村莊，但她天生就不是一個能安靜下來的孩子。在一次意外中，她誤打誤撞進入了一位隱居魔法師的實驗室，並誤食了一顆「混亂種子」，從此她的魔法就變得完全不可預測。她並不覺得這有什麼不好，反而覺得「每次施法都是驚喜」這點非常有趣，因此決定踏上旅程，把「驚喜」帶給全世界的人。',
        emotionalKeys: {
            joy: ['惡作劇成功', '吃到美食', '看到亮晶晶的東西', '交到新朋友'],
            anger: ['被強迫打掃', '被禁止練習魔法', '有人欺負小朋友', '肚子餓'],
            weakness: '對於任何可愛且不能被惡作劇的東西毫無體抗力'
        },
        combatBehavior: {
            priorities: ['混沌輸出', '隨機干擾', '賣萌保命'],
            typicalActions: ['皮皮亂丟火球', '反向治療(微炸裂)', '天真笑臉']
        }
    }

];

export default PRESET_CHARACTERS;
