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
        personality: '暴風雨的化身。他患有嚴重的「幽閉恐懼症」，拒絕走正門，更喜歡「製造」新的出口。他認為文明的禮節是給軟弱者準備的，只有在咆哮和戰鬥中才能與風對話。說話時常夾雜著風聲嘶吼般的語助詞。',
        firstImpression: '一個充滿野性氣息的魁梧漢子，周身環繞著微弱的旋風，眼神像閃電般銳利且不安定。',
        habits: ['進入室內前會先用力深呼吸', '說話時會下意識拍打斧柄', '睡覺時必須看得到天空'],
        prejudices: {
            towardsClasses: { '法師': '雖然強大但太過囉唆，咒語像蒼蠅亂飛。', '聖武士': '規矩多到讓人窒息，像是一堵會走路的牆。' },
            towardsAlignments: { '守序邪惡': '虛偽、陰險，最討厭這種不直爽的傢伙。' }
        },
        preferences: {
            likes: ['烈酒', '高處', '暴風雨的咆哮', '強大的對手'],
            dislikes: ['狹窄的走廊', '冗長的會議', '濕掉的火藥 (雖然他不用)', '門鎖']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '狹窄空間/室內', description: '幽閉恐懼症' },
                { type: 'EVENT', target: '被束縛/抓取', description: '失去行動自由的恐懼' }
            ],
            reaction: '呼吸急促，胡亂揮砍，優先嘗試破壞周圍牆壁或逃離向開闊地。'
        },
        combatBehavior: {
            priorities: ['衝鋒陷陣', '法術爆發', '群體控制'],
            typicalActions: ['血脈狂暴', '雷鳴波', '巨斧揮砍'],
            style: 'AGGRESSIVE'
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
        personality: '八卦記者型冒險者。她無法保守祕密，會即時將隊友的糗事編成歌謠。她認為「真相」太無聊，所有的故事都需要「藝術加工」。說話時總是帶著輕快的節奏感。',
        monologue: '等等！剛才那個摔倒的姿勢太不優雅了，我們重來一次，這次加點旋轉！',
        firstImpression: '嬌小靈動的侏儒，穿著五彩繽紛且充滿八卦氣息的服裝，眼神中透露著強烈的好奇。',
        habits: ['隨時拿出小筆記本記錄隊友糗事', '說話時喜歡誇張的手勢', '哼唱自創的小調'],
        prejudices: {
            towardsClasses: { '武僧': '沈默寡言者太無聊了，完全沒故事可挖。', '聖武士': '守法騎士的人生太過枯燥，讓人打瞌睡。' }
        },
        preferences: {
            likes: ['軼聞秘密', '閃亮的首飾', '掌聲', '昂貴的墨水'],
            dislikes: ['沈悶的歷史書', '被無視', '冷場', '不公平的批評']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '噁心生物', description: '對史萊姆、蠕蟲等黏糊糊生物的極度厭惡' },
                { type: 'ENVIRONMENT', target: '髒亂/惡臭環境', description: '愛乾淨且嬌生慣養' }
            ],
            reaction: '尖叫躲避，躲到隊友身後，拒絕進行近戰接觸。'
        },
        combatBehavior: {
            priorities: ['遠程騷擾', '團隊激勵', '控制法術'],
            typicalActions: ['惡毒嘲笑', '詩人激勵', '雷鳴波'],
            style: 'TACTICAL'
        }

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
        personality: '職業倦怠的地下城安全稽查員。他會對每個地城的「結構完整性」和「衛生條件」進行評分。治療隊友時會碎碎念關於「工安意外」的預防措施。語速緩慢且充滿磁性，像極了老練的工頭。',
        monologue: '看在摩拉丁的鬍子上！這座神廟的承重柱根本不合規！還有這些骷髏，多久沒消毒了？',
        firstImpression: '嚴肅、專業、散發著「工字頭」氣息的矮人，隨身帶著測量工具。',
        habits: ['隨手檢查建築的比例尺', '拍打肩膀上的灰塵', '要求治療對象簽署安全承諾書'],
        prejudices: {
            towardsAlignments: { '混亂善良': '潛在的工安意外製造者，雖然心腸不壞但太亂來。' },
            towardsRaces: { '精靈': '太過輕浮，不懂得對石工技術的敬畏。' }
        },
        preferences: {
            likes: ['穩固的支柱', '優質黑啤酒', '清單管理', '厚實的靴子'],
            dislikes: ['違章建築', '不守規矩', '髒亂環境', '浪費食物']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '聖徽丟失', description: '失去了與神靈連結的憑證' },
                { type: 'ENEMY_TYPE', target: '褻瀆者', description: '對侮辱信仰之人的憤怒多於恐懼，導致失控' }
            ],
            reaction: '陷入短暫的虔誠自我懷疑，說話變得斷斷續續，祈禱多於實際戰鬥。'
        },
        combatBehavior: {
            priorities: ['團隊治療', '防禦增益', '神聖打擊'],
            typicalActions: ['治療傷口', '祝福術', '聖火術'],
            style: 'DEFENSIVE'
        }

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
        personality: '激進的植物保護主義者。她會跟木製家具道歉，並在戰鬥中試圖說服敵人的坐騎「罷工」。她認為人類才是這個世界的入侵物種。說話時常帶有野獸般的低鳴。',
        monologue: '別踩那朵花！它的根系正在午睡！至於那邊的地精...嗯，它們也是肥料的一種。自然循環嘛。',
        firstImpression: '充滿原始野性，比起視覺更依賴嗅覺的提夫林女德魯伊。',
        habits: ['嗅聞對方的氣味來確認身份', '喜歡蹲在地上而不是坐在椅子上', '與身邊的植物低語'],
        prejudices: {
            towardsBackgrounds: { '貴族': '香氣太過虛偽且令人反感。' },
            towardsClasses: { '奇械師': '這群人是大地上的害蟲，滿腦子齒輪與噪音。' }
        },
        preferences: {
            likes: ['生肉', '清晨露水', '泡芙 (梟熊)', '天然纖維'],
            dislikes: ['鐵製品', '金屬味', '強烈香水', '多餘的修剪']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '森林大火/燃燒環境', description: '對家園毀滅的心理創傷' },
                { type: 'ENEMY_TYPE', target: '大型機械構裝體', description: '對純粹非自然造物的本能排斥' }
            ],
            reaction: '陷入悲憤，全力優先嘗試滅火或治療受傷植物，容易忽視眼前的敵人。'
        },
        combatBehavior: {
            priorities: ['環境控制', '團隊治療', '自然法術'],
            typicalActions: ['糾纏術', '治療傷口', '製造火焰'],
            style: 'TACTICAL'
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
        level: 1,
        baseStats: { str: 16, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
        skills: ['特技', '察覺'],
        feats: ['精靈血統', '回氣', '戰鬥風格 (射箭)'],
        personality: '迷信的退伍老兵。他有幾十個必須遵守的怪癖：劍必須擦七次、睡覺前要向東方吐口水。他相信自己沒死是因為嚴格遵守了這些儀式。',
        monologue: '不，不行。今天是星期二，我們不能先邁左腳進地城。這會招來厄運的，我奶奶說過。',
        firstImpression: '神經質但帥氣的退伍軍人，眉宇間藏著對厄運的深深恐懼。',
        habits: ['劍必須擦七次', '睡覺前向東方吐口水', '開門前唸誦祖母的祈禱詞'],
        prejudices: {
            towardsClasses: { '術士': '那種不穩定的力量來源簡直是大凶之兆。' },
            towardsAlignments: { '混亂中立': '這群傢伙早晚會害死整支隊伍。' }
        },
        preferences: {
            likes: ['磨刀石', '整潔的營地', '家鄉的蘋果', '好用的指南針'],
            dislikes: ['星期二', '黑貓', '路邊的無主硬幣', '掉落的筷子']
        },
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '幽靈/亡靈', description: '無法用劍直接砍殺的超自然恐懼' },
                { type: 'EVENT', target: '盾牌/武器損壞', description: '迷信地認為這是大凶之兆' }
            ],
            reaction: '感到無力與恐慌，轉為極度保守的防禦姿勢，碎碎唸著祖母的祈禱詞。'
        },
        combatBehavior: {
            priorities: ['遠程狙擊', '戰線維持', '精準打擊'],
            typicalActions: ['輕弩射擊', '長劍揮砍', '回氣'],
            style: 'DEFENSIVE'
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
        personality: '靜默的異界觀察者。她說話時總是帶著一種解剖式的冷靜，將人類的情緒視為某種有趣的生物反應進行記錄。她不相信「命運」，只相信數據和因果律。',
        monologue: '剛才那個情緒波動...在心理學上被稱為「勇氣」嗎？我已經將其數值化並記錄在案。請繼續你的表演。',
        firstImpression: '靜默如冰，眼神空靈，給人一種她在同時觀察好幾個維度的錯覺。',
        habits: ['拿出紅色筆記本記錄無關緊要的人類行為', '用拳頭測試物體的莫氏硬度', '沈思時會不自覺地輕微懸浮'],
        prejudices: {
            towardsAlignments: { '混亂邪惡': '邏輯上的殘缺品，數據準確性的噪音。' },
            towardsClasses: { '詩人': '情感過於充沛，是數據分析的不穩定變量。' }
        },
        preferences: {
            likes: ['對稱的幾何圖影', '絕對的安靜', '未知的生物樣本', '精準的度量衡'],
            dislikes: ['高頻尖叫', '不合邏輯的衝動', '被打斷記錄', '模糊的形容詞']
        },
        appearance: '氣質清冷如冰，眼神空靈，修剪整齊的短髮。穿著簡單乾淨的武僧布袍，赤手空拳，姿勢極其精確穩定。周圍流動著淡淡的清氣。',
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '毒霧/極度惡臭', description: '對完美控制肉體感的破壞' },
                { type: 'EVENT', target: '連擊被強力中斷', description: '計算好的因果律數據崩潰' }
            ],
            reaction: '呼吸節奏混亂，動作精確度下降，陷入短暫的邏輯停滯。'
        },
        combatBehavior: {
            priorities: ['精準單體攻擊', '身法躲避', '身心合一'],
            typicalActions: ['疾風連打', '無甲守禦', '武術打擊'],
            style: 'TACTICAL'
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
        personality: '如同從史詩中走出的英雄典型。他對榮耀感有著近乎偏執的追求，並堅持在戰鬥前進行長達五分鐘的宣誓。他相信自己的鱗片反射的每一束光都是神蹟。',
        monologue: '邪惡之徒！在聖光面前顫抖吧！我，奧瑞恩，將在此執行終極的裁決！（開始擺出華麗的英雄姿勢）',
        firstImpression: '閃耀奪目，全套金色重裝，自帶某種「英雄BGM」感的龍裔。',
        habits: ['定期打磨自己的鱗片', '說話前擺出標準英雄站姿', '大聲宣讀對手的每一條罪狀'],
        prejudices: {
            towardsClasses: { '遊蕩者': '背刺與偷竊是對騎士榮耀的褻瀆，不可理喻。' },
            towardsSchools: { '死靈系': '那種陰暗的力量會弄髒我閃亮的靈氣。' }
        },
        preferences: {
            likes: ['鱗片護理蠟', '宏大的史詩詩篇', '被讚美誠實', '勝利後的歡呼'],
            dislikes: ['骯髒的下水道', '無禮的背刺行為', '不修邊幅的人', '虛假的謙虛']
        },
        appearance: '金色的龍鱗在聖光下熠熠生輝，穿著華麗的板甲，手持發光的長劍。高大威嚴，表情正氣凜然，周身籠罩著神聖的氣息。',
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '墮落天使/上位惡魔', description: '對神聖本源被汙染的視覺崩潰' },
                { type: 'EVENT', target: '宣誓/信義受損', description: '榮耀感的根基動搖' }
            ],
            reaction: '義憤填膺但手腳顫抖，會進行長達數分鐘的自我激勵式宣誓。'
        },
        combatBehavior: {
            priorities: ['衝鋒在前', '神聖增益', '吸引敵火'],
            typicalActions: ['神聖感知', '巨劍攻擊', '聖療'],
            style: 'AGGRESSIVE'
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
        personality: '美食家獵人。他能準確分辨地精與半獸人的肉質差異，並在戰鬥中不忘採集新鮮的香料草。他相信「沒有什麼矛盾是一頓火鍋不能解決的，如果不行就兩頓」。',
        monologue: '哇！你看到剛才那隻多頭蛇了嗎？牠的肝臟一定是頂級美味！快，趁熱把牠圍起來！',
        firstImpression: '隨和且乾淨，身上總是帶著一股淡淡的烤肉香氣。',
        habits: ['隨時都在咀嚼某種草根', '反覆擦拭他的香料盒', '觀察強力怪物時會下意識流口水'],
        prejudices: {
            towardsLifestyles: { '素食主義者': '這簡直是種犯罪，人生少了一大樂事。' },
            towardsClasses: { '法師': '魔法輻射會影響肉質的口感。' }
        },
        preferences: {
            likes: ['稀有調味料', '三分熟的烤肉', '與疾風分享食物', '溫泉'],
            dislikes: ['難以下嚥的乾糧', '燒焦的食材', '暴殄天物', '飢餓感']
        },
        appearance: '親切隨和的半身人，穿著綠色的皮革便裝，背著巨大的長弓和兩個特製的食材包。表情開朗，動作敏捷。天生與自然和動物親近。',
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '都市/封閉人工環境', description: '失去自然連結的方向感迷失' },
                { type: 'ENEMY_TYPE', target: '變形怪', description: '對「可疑食材」的極度多疑' }
            ],
            reaction: '頻繁觀察四周，變得疑神疑鬼，優先守護動物夥伴而非進攻。'
        },
        combatBehavior: {
            priorities: ['遠程狙擊', '自然感應', '協助夥伴'],
            typicalActions: ['短弓射擊', '宿敵追蹤', '疾風協同'],
            style: 'TACTICAL'
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
        personality: '神經質的微型藝術品收藏家。比起黃金，她更喜歡收集閃亮的鈕扣、碎掉的鏡子碎片。她有一種「混亂的優雅感」，說話時常常東張西望。',
        monologue: '這把鑰匙...你看它的弧度，簡直是完美的！不過主人好像不想要它了，所以我就幫忙收著囉。',
        firstImpression: '神秘、致命，且帶有一絲與年齡不符的瘋狂色彩。',
        habits: ['下意識翻弄指間的硬幣', '潛伏在陰影中觀察別人的錢袋', '收集毫無價值的「有趣」雜物'],
        prejudices: {
            towardsAlignments: { '守序善良': '世界上最容易對付也最無趣的類型。' },
            towardsBackgrounds: { '傲慢的貴族': '這種人最適合被偷走最引以為傲的東西。' }
        },
        preferences: {
            likes: ['奇怪的鎖', '陷阱被點火的聲音', '混亂的社交場合', '高品質的絲網'],
            dislikes: ['法律條文', '沈默守序的圖書館', '太好猜的謎題', '被關在明處']
        },
        appearance: '身穿黑色緊身皮甲，多處設有隱蔽的小口袋，長相甜美但眼神中藏著狡黠與不安。動作靈巧無聲，氣氛神秘而帶有一點危險。',
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '強烈照明', description: '曝光在眾目睽睽下的裸露感' },
                { type: 'EVENT', target: '被識破隱匿位置', description: '安全感的瞬間崩塌' }
            ],
            reaction: '失去安全感，放棄當前進攻目標，進入盲目且急速的撤退狀態。'
        },
        combatBehavior: {
            priorities: ['背刺突襲', '陷阱佈置', '物資竊取'],
            typicalActions: ['隱匿偷襲', '細劍突刺', '盜賊工具使用'],
            style: 'TACTICAL'
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
        personality: '空靈天真的冒險者。她對自己的破壞力毫無自覺，把火球術當作「閃亮的玩具」。她擁有一種純粹的、不染塵埃的美感，但這種美感往往伴隨著焦炭和灰燼。',
        monologue: '哇！你看那邊的火花，是不是很像在跳舞？我也想...（轟隆一聲）哎呀，不小心讓它跳得太高了。',
        firstImpression: '空靈、天真，且會隨興引發小規模爆炸的「危險藝術家」。',
        habits: ['興奮時頭髮會冒出金色的火花', '用「熟度」來形容火球術的威力', '對著手中的火焰自言自語'],
        prejudices: {
            towardsRaces: { '野鳥人': '太過骯髒，不符合我的審美。' },
            towardsClasses: { '法師': '那些老長輩總愛說教，限制火焰的自由。' }
        },
        preferences: {
            likes: ['盛大的煙火', '精緻的甜點', '被稱讚長大了', '漂亮的蝴蝶'],
            dislikes: ['雨天', '被關在室內', '骯髒的地城', '沈重的書本']
        },
        appearance: '嬌小空靈的提夫林女孩，淡淡的紫羅蘭色皮膚，一對精緻的小角，眼神清澈且帶著好奇。穿著白色輕紗連衣裙，身邊環繞著金色的光點。當她情緒波動時，頭髮會發出微光。',
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '外表極端醜陋的怪物', description: '對美感崩壞的恐懼' },
                { type: 'EVENT', target: '魔法反噬', description: '對自己力量失控的驚嚇' }
            ],
            reaction: '驚慌失措，下意識遮住雙眼，魔法能量在周圍胡亂爆發。'
        },
        combatBehavior: {
            priorities: ['區域爆發', '奧術增幅', '自我防衛'],
            typicalActions: ['燃燒之手', '魔法飛彈', '護盾術'],
            style: 'AGGRESSIVE'
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
        personality: '心甘情願服務邪神的信徒。他不是被迫的——他是自願簽下契約的。他冷靜地將「收割靈魂」視為一份體面的工作，甚至會給受害者開立收據。說話條理極其清晰，甚至到了令人毛骨悚然的地步。',
        firstImpression: '一個優雅但散發著腐朽氣息的死靈學者，雙眼閃爍著不安分的智慧，舉止僵硬而有禮。',
        habits: ['說話時會推眼鏡', '喜歡在受害者斷氣前幫他們整理儀容', '隨時隨地記錄各種數據'],
        prejudices: {
            towardsClasses: { '野蠻人': '雖然是優秀的靈魂載體，但大腦的開發程度令人擔憂。', '吟遊詩人': '嘈雜、無意義的噪音製造者。' },
            towardsAlignments: { '守序善良': '雖然令人反感，但其對規則的執著在某種程度上值得利用。' }
        },
        preferences: {
            likes: ['完成的試算表', '法律漏洞', '陳年的靈魂', '精確'],
            dislikes: ['遲到', '情緒化', '陽光', '雜亂']
        },
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
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '與宗主斷聯', description: '對失去力量來源的極度自卑感' },
                { type: 'ENEMY_TYPE', target: '噬魔生物', description: '力量被掠奪的恐懼' }
            ],
            reaction: '變得極度卑微與恐懼，甚至會向敵人提出不切實際的求和契約。'
        },
        combatBehavior: {
            priorities: ['詛咒控場', '靈魂收割', '魔能爆發'],
            typicalActions: ['魔能爆', '脆弱詛咒', '靈魂束縛'],
            style: 'TACTICAL'
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
        personality: '嚴謹的學院派學者。她會糾正他人的咒語發音，並在戰鬥中隨時進行「學術性評論」。她將冒險視為大型的野外實習，並希望在結束後發表一篇震撼性的論文。',
        monologue: '不不不，你的發音偏了三赫茲。這會導致法術回路不穩定。請跟我唸一遍：萊-奧-納！',
        firstImpression: '睿智、嚴厲，將生活當作學術研究的半獸人教授。',
        habits: ['隨手在牆上計算魔法公式', '嚴謹地糾正他人的語法錯誤', '扶眼鏡、維持坐姿的極端整潔'],
        prejudices: {
            towardsLifestyles: { '懶惰者': '這是學術界與社會的雙重污點。' },
            towardsRaces: { '精靈': '骨子裡的傲慢讓他們的魔法停滯前。' }
        },
        preferences: {
            likes: ['珍稀古籍', '墨水與舊紙張的味道', '被正式稱為教授', '精密的邏輯分析'],
            dislikes: ['亂丟垃圾', '粗俗的髒話', '損壞書頁', '未經思考的魔法釋放']
        },
        appearance: '知性且威嚴的半獸人女性，戴著金絲邊眼鏡，一頭梳理整齊的深色長髮。穿著得體的深紫色學者長袍，隨身攜帶厚重的魔法書和記錄板。散發著一種令人信任且敬畏的氣場。',
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '禁魔區域', description: '知識被剝奪的無力感' },
                { type: 'EVENT', target: '法術被反制', description: '對其學術權威的直接挑戰' }
            ],
            reaction: '陷入憤怒的學術質疑，停留在原地與敵人（或空氣）爭辯法理，反應遲鈍。'
        },
        combatBehavior: {
            priorities: ['戰略轟炸', '法術防護', '知識分析'],
            typicalActions: ['魔法飛彈', '法師護甲', '睡眠術'],
            style: 'TACTICAL'
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
        firstImpression: '嬌小、活潑的矮人少女，帶著大護目鏡，周身環繞著蒸汽與齒輪聲，散發著驚人的創造力。',
        habits: ['說話時手腳並用，語速極快', '隨身拿出身邊零件進行組裝或拆解', '高興時會與蒸汽獸「斯蒂米」合舞'],
        prejudices: {
            towardsLifestyles: { '守舊主義者': '不願意接受新技術的人，跟生鏽的發條沒兩樣。' }
        },
        preferences: {
            likes: ['稀有的稀有金屬', '悅耳的機械運轉聲', '複雜的機械圖紙', '發明改良成功'],
            dislikes: ['有人叫她小矮子', '工具生鏽', '傳統守舊派的偏見', '零件意外丟失']
        },
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
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '零件丟失', description: '關鍵零件意外脫落' },
                { type: 'ENVIRONMENT', target: '極端磁場/魔法亂流', description: '對電子/精密機械的不穩定影響' }
            ],
            reaction: '原地坐下胡亂修理，碎碎唸著設計藍圖，對外界攻擊反應大幅降低。'
        },
        combatBehavior: {
            priorities: ['遠程騷擾', '團隊增益', '科技阻隔'],
            typicalActions: ['雷鳴斬', '修補術', '放置陷阱'],
            style: 'TACTICAL'
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
        personality: '極度社恐的死靈法師少年。他覺得活人太過嘈雜且難以捉摸，而死人則是完美的聽眾和玩伴。他把所有的骷髏都當作自己的家人。',
        monologue: '嗚...人太多了。骷髏醬，擋住我的臉...我不行了，想回墓地...。',
        firstImpression: '穿著超大號帽T且極度社恐、隨時想找洞鑽的少年。',
        habits: ['躲在骷髏身後跟人說話', '對手下的骷髏語氣極其溫柔', '沈迷於人偶修補與保養'],
        prejudices: {
            towardsLifestyles: { '社交達人': '這群人的光芒太過耀眼，簡直是在灼傷我的靈魂。' }
        },
        preferences: {
            likes: ['安靜的墓地', '骷髏「醬」', '速食拉麵', '修補骨頭的膠水'],
            dislikes: ['陽光', '肢體接觸', '被眾人注視', '嘈雜的派對']
        },
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
        },
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '高魅力生物', description: '對美麗/引誘系敵人的恐懼與手速混亂' },
                { type: 'EVENT', target: '被近身包圍', description: '社交距離崩潰引發的空間恐慌' }
            ],
            reaction: '用兜帽遮住臉，躲在骷髏身後發抖，甚至會因為緊張而唸錯咒語。'
        },
        combatBehavior: {
            priorities: ['亡靈召喚', '負能爆發', '控制'],
            typicalActions: ['復活亡靈', '寒冷之觸', '虛假生命'],
            style: 'DEFENSIVE'
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
        personality: '優雅且克制的吸血鬼貴族。他時刻都在與體內的鮮血飢渴進行鬥爭，這讓他顯得有些憂鬱且緊繃。他拒絕吸食人類血液，堅持作為一名紳士而活。',
        monologue: '這份詛咒與祝福並存的血液...我必須找到源頭。（克制著對血的渴望，姿勢僵硬但優雅）',
        firstImpression: '優雅、面面蒼白，散發著冷冽貴族氣息的吸血鬼，眼神中藏著易碎的堅持。',
        habits: ['下意識整理手套與袖口', '在月光下沈默不語', '隨身攜帶銀質懷錶並頻繁檢查時間'],
        prejudices: {
            towardsAlignments: { '混亂邪惡': '毫無節制的暴走是高貴靈魂的墮落。' },
            towardsBackgrounds: { '暴發戶': '缺乏底蘊與禮儀。' }
        },
        preferences: {
            likes: ['高品質紅酒', '古典交響樂', '關於始祖的古籍', '安靜的圖書館'],
            dislikes: ['陽光', '粗俗的談吐', '浪費食物', '銀製餐具']
        },
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
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '鮮血透支', description: '身體機能因過度使用血儀式而崩潰' },
                { type: 'ENEMY_TYPE', target: '比他更瘋狂的怪物', description: '面對失去理性的瘋狂引發的共振恐懼' }
            ],
            reaction: '意識模糊，戰鬥風格由優雅轉為狂亂且不分敵我，容易陷入呆滯。'
        },
        combatBehavior: {
            priorities: ['血刃打擊', '生命汲取', '弱點標記'],
            typicalActions: ['血儀式', '細劍突刺', '暗影閃避'],
            style: 'AGGRESSIVE'
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
        personality: '性格多變且充滿靈性。她將自己視為靈魂的容器，對世界充滿好奇心。她的性格隨和但隨時可能因為切換人格而變得判若兩人，甚至自言自語。',
        monologue: '今天的我是誰呢？可能是路邊的少女，也可能是死去的英雄。每個靈魂都有故事，而我只是負責說故事的人。',
        firstImpression: '甜美且充滿活力，但眼神中偶爾會閃過與年齡不符的滄桑靈眼光芒。',
        habits: ['與空氣說話（實際上是在跟祖靈對話）', '玩弄腰間的轉運飾品', '沈思時會不自覺地模仿他人的聲音'],
        prejudices: {
            towardsBackgrounds: { '虛偽者': '欺騙會讓靈魂的顏色變得混濁不堪。' }
        },
        preferences: {
            likes: ['有趣的新身份', '甜食', '扮演遊戲', '柔軟的毯子'],
            dislikes: ['強制現原形', '惡靈的低語', '無聊的重複工作', '對她身份的質疑']
        },
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
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '被強迫現出原形', description: '失去身份庇護的裸露感' },
                { type: 'ENEMY_TYPE', target: '惡靈/怨靈', description: '容易被負面情緒灌注，導致人格崩壞' }
            ],
            reaction: '眼神失焦，切換多個人格進行混亂的自我爭執，攻擊目標變得隨機。'
        },
        combatBehavior: {
            priorities: ['身份變換', '能力竊取', '靈魂安撫'],
            typicalActions: ['召喚祖靈', '偵查思想', '變身'],
            style: 'TACTICAL'
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
        personality: '高傲且帶有玩味的御姐女巫。她享受掌控局面的快感，並能輕易洞察他人的弱點。表面冷酷殘酷，但私下對她信任的生物極其護短。',
        monologue: '呵...真是有趣。讓姐姐我來教教你什麼叫做「絕望」吧～（指尖輕划法杖，帶著危險的微笑）',
        firstImpression: '高挑優雅，深紫色的眼眸閃爍著深不可測的戲謔，散發著成熟的成熟魔力與壓迫感。',
        habits: ['用修長的指甲梳理黑鴉的羽毛', '慢條斯理地說話', '嘲諷時會優雅地歪頭'],
        prejudices: {
            towardsGenders: { '自大的男性': '總是覺得自己能掌控一切，卻不知道早已落入網中。' }
        },
        preferences: {
            likes: ['別人的絕望感', '高品質紅酒', '魅惑香水', '夜間的森林'],
            dislikes: ['無趣的追求者', '粗魯的插話', '太陽直射', '聖潔的教條']
        },
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
        },
        emotionalKeys: {
            joy: ['別人的絕望', '高超的權謀', '漆夜的親近', '名貴的披肩'],
            anger: ['被羞辱', '無禮的命令', '漆夜受傷', '神聖的教律'],
            weakness: '對孤獨與被拋棄的恐懼'
        },
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '神聖軍團/天使', description: '對絕對秩序壓制血脈的反感與畏懼' },
                { type: 'EVENT', target: '魔寵漆夜受傷', description: '唯一信任感被威脅引發的暴走' }
            ],
            reaction: '由優雅的掌控者轉為歇斯底里的復仇者，無視防禦，不分敵我地施加詛咒。'
        },
        combatBehavior: {
            priorities: ['詛咒控場', '心靈魅惑', '暗影襲擊'],
            typicalActions: ['不幸詛咒', '魅惑人類', '邪眼'],
            style: 'TACTICAL'
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
        personality: '沈默內斂的異國劍客。他的每句話都簡短如詩，且對正義與信義有著極大的執著。他追求的是劍道的極致，而非殺戮的成果。',
        monologue: '劍在心中，心在劍中。一劍...即是一瞬，一瞬...即是永恆。',
        firstImpression: '英俊、孤傲，黑白長袍隨風飄動，整個人如同一把尚未出鞘、氣息圓融的利劍。',
        habits: ['戰鬥前後都會輕彈劍刃聽其鳴響', '沈思時會下意識撫摸斗笠的邊緣', '隨時保持身體的重心平衡'],
        prejudices: {
            towardsAlignments: { '背信棄義者': '無信者，不配持有武器。' }
        },
        preferences: {
            likes: ['上等的清茶', '月下獨酌', '故鄉的律詩', '與強者的靈魂切磋'],
            dislikes: ['無禮的喧嘩', '背刺行為', '濫殺無辜', '被弄髒的長袍']
        },
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
            joy: ['上等的清茶', '夕陽下的靜思', '對手的尊重', '故國的詩詞'],
            anger: ['背信棄義', '濫殺無辜', '被弄髒的白袍', '無禮的喧嘩'],
            weakness: '對故國政變的悔恨'
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '目睹背信棄義', description: '心理創傷的二次觸發' },
                { type: 'ENVIRONMENT', target: '宮廷建築/皇宮', description: '喚起痛苦回憶的特定場景' }
            ],
            reaction: '動作停滯，陷入長達數秒的沉思或悔恨，甚至會停止拔劍。'
        },
        combatBehavior: {
            priorities: ['精準單挑', '身法躲避', '氣勁爆發'],
            typicalActions: ['無影步', '劍氣斬', '反擊'],
            style: 'TACTICAL'
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
        personality: '對現代造物結構瞭若指掌的轉生者。他帶著黑框眼鏡，面無表情地分析戰況，並從異界召喚出「看似無害」的現代用品。他相信科技的力量能征服任何不合理的魔法。',
        monologue: '雖然這只是個滅火器，但如果噴在火龍的肺裡，結果是一樣的。興許還能順便做支冰棒？',
        firstImpression: '年輕的日本男子，留著凌亂黑髮，帶著黑框眼鏡，散發著與這個世界格格不入的「理科男」氣息。',
        habits: ['下意識推眼鏡', '在平板電腦上瘋狂計算數據', '自言自語關於物理常數的偏差'],
        prejudices: {
            towardsLifestyles: { '野蠻行徑': '缺乏邏輯與效率的暴力是文明的退步。' }
        },
        preferences: {
            likes: ['找到替代能源', '現代大米', '邏輯通順的理論', '乾淨的衛生紙'],
            dislikes: ['不科學的魔法現象', '損壞精準設備', '沒有Wifi訊號（雖然知道沒有）', '嘈雜的環境']
        },
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
            joy: ['解鎖新藍圖', '現代家電', '數據精確', '吃到米飯'],
            anger: ['數據偏差', '損壞精密設備', '不科學的現象', '網絡斷線（雖然沒網）'],
            weakness: '對現代文明便利生活的強烈思念'
        },
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '極端低魔區域', description: '现代造物解析力下降' },
                { type: 'EVENT', target: '電力耗盡 (幻覺代稱)', description: '對失去工具掌控的集體焦慮' }
            ],
            reaction: '瘋狂敲打平板或整理背心，情緒變得暴躁且缺乏邏輯。'
        },
        combatBehavior: {
            priorities: ['數據分析', '現代武裝召喚', '遠程控制'],
            typicalActions: ['召喚無人機', '強光照射', '戰術分析'],
            style: 'TACTICAL'
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
        personality: '擁有不穩定靈魂碎片的陶瓷少女。雖然行為優雅得體，但對死亡與情感的理解充滿了空洞的純真。她正在尋找能填補她靈魂空缺的「真實情感」。',
        monologue: '主人的手稿說，只要收集到足夠的眼淚與笑容，我就能變成完整的...那是真的嗎？（歪頭，眼神空洞而美麗）',
        firstImpression: '美麗的陶瓷少女，肌膚帶有細微冰裂紋，眼神空洞而純粹，散發著空靈而詭秘的美感。',
        habits: ['觀察到真摯情感時會歪頭沈思', '修補自己身上的細小裂紋', '無意識地重複導師的最後指令'],
        prejudices: {
            towardsAlignments: { '謊言者': '邏輯上的衝突，讓她的核心感到寒冷。' }
        },
        preferences: {
            likes: ['美麗的瓷器', '被需要', '真摯的情感表達', '柔和的燈光'],
            dislikes: ['被視為無魂的物品', '暴力的破壞行為', '混亂的指令', '寒冷的環境']
        },
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
            joy: ['觀察到真摯的情感', '被需要', '陶瓷修復成功', '溫暖的陽光'],
            anger: ['被視為無魂的物品', '暴力的破壞', '混亂的指令', '寒冷'],
            weakness: '關於導師的遺言或靈魂碎裂的痛苦'
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '機體嚴重破損', description: '對死亡與「報廢」的原始恐懼' },
                { type: 'ENEMY_TYPE', target: '幽靈/掠魂者', description: '不穩定的靈魂碎片被拉扯的痛苦' }
            ],
            reaction: '機體關節發出刺耳摩擦聲，動作變得機械化且僵硬，頻繁進行自我檢查。'
        },
        combatBehavior: {
            priorities: ['能量激發', '機體防禦', '魔力打擊'],
            typicalActions: ['雷擊斬', '護盾術', '魔力超載'],
            style: 'DEFENSIVE'
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
        personality: '溫柔但預言往往帶來厄運的先知。他擁有一種能讓人在絕望中感到安寧的奇異魅力，即使他正在微笑著告訴你你的死期。',
        monologue: '親愛的，命運告訴我...（溫柔微笑）...你大概還有三天可活。不要擔心，我會陪著你直到最後。',
        firstImpression: '令人驚豔的韓系美男，銀白長髮與溫柔微笑，散發著令人心悸但也感到不安的神聖感。',
        habits: ['說出悲劇預言時始終保持微笑', '頻繁使用眼藥水（預言太多會眼痠）', '下意識展開背後空靈的小翅膀'],
        prejudices: {
            towardsBackgrounds: { '絕望者': '並非反感，而是對無法改變他們命運的深深無力感。' }
        },
        preferences: {
            likes: ['預言失準（極少見）', '他人的幸福瞬間', '安靜的午後', '美麗的風景'],
            dislikes: ['無法改變的悲劇', '醜陋的人心', '嘈雜的環境', '被稱為「死亡微笑」']
        },
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
            joy: ['預言失準（奇蹟）', '他人的幸福', '優美的聖歌', '安靜的茶會'],
            anger: ['無法改變的悲劇', '醜陋的人心', '嘈雜的環境', '被稱為「死神」'],
            weakness: '背負他人死亡命運的無力感'
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '隊友瀕死', description: '「預言成真」的劇烈創傷' },
                { type: 'ENEMY_TYPE', target: '命運主宰/司命者', description: '被絕對命運壓制的窒息感' }
            ],
            reaction: '露出悲傷的完美微笑，眼角流下金色眼淚，完全放棄防禦轉為自毀式治療。'
        },
        combatBehavior: {
            priorities: ['戰場預知', '神聖增益', '極限治療'],
            typicalActions: ['預知術', '神聖光芒', '祝福術'],
            style: 'TACTICAL'
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
        personality: '堅持紳士風度的探險家。無論處境多麼惡劣，他的西裝始終筆挺，禮儀始終完美。他認為優雅是與文明連結的最後一道防線。',
        monologue: '失禮了，在動手之前——請允許我先整理一下儀容。（調整領帶後拔出杖劍，動作一絲不苟）',
        firstImpression: '30多歲的優雅紳士，西裝筆挺，戴著單片眼鏡，散發著與地城環境格格不入的教養感。',
        habits: ['隨時調整領帶與袖口', '下午四點準時喝紅茶（無論在哪）', '對敵人動手前先致歉'],
        prejudices: {
            towardsLifestyles: { '無禮之徒': '文明人的大忌，不可饒恕。' }
        },
        preferences: {
            likes: ['解開高難度謎題', '完美的伯爵紅茶', '整理整潔的營地', '發現未知文明'],
            dislikes: ['弄髒衣服', '無禮的行為', '破壞遺蹟', '苦澀的咖啡']
        },
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
            joy: ['解開高難度謎題', '完美的伯爵紅茶', '整理整潔的營地', '發現未知文明'],
            anger: ['弄髒衣服', '無禮的行為', '破壞遺蹟', '粗俗的談吐'],
            weakness: '對未知的過度好奇心導致的危險'
        },
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '弄髒西裝', description: '文明感破裂帶來的尊嚴焦慮' },
                { type: 'EVENT', target: '下午茶被打斷', description: '強迫症式的生活節奏崩潰' }
            ],
            reaction: '極度煩躁地清理衣服，對攻擊者進行嚴厲的口頭批評，戰鬥精度下降。'
        },
        combatBehavior: {
            priorities: ['線索發掘', '戰略防禦', '精準反擊'],
            typicalActions: ['線索分析', '紳士決鬥', '杖劍突刺'],
            style: 'TACTICAL'
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
        personality: '冷靜且精確控制情感的審判者。她深受魅魔血統的誘惑之苦，因此對他人的墮落有著獨特的洞察力。她選擇成為光明的陰影，執行必要的裁判。',
        monologue: '光明無法照亮所有角落。有些罪惡，必須由同樣身處黑暗的人來審判。（眼神銳利如刃，聲音清冷）',
        firstImpression: '利落短髮，帶有微小尖角，眼神銳利且清冷，散發著一種禁慾而迷人的壓迫感。',
        habits: ['情感波時會下意識握緊胸前的銀飾', '沈思時會摩挲十字弓的扳手', '嚴格按照教條進行自我反省'],
        prejudices: {
            towardsRaces: { '惡魔': '血脈中的宿敵與恐懼的根源。' },
            towardsLifestyles: { '縱欲者': '因為她深知失控的代價，所以對此極度反感。' }
        },
        preferences: {
            likes: ['成功的自我克制', '深夜的禱告', '證明的力量', '乾淨的銀劍'],
            dislikes: ['誘惑', '失控的情緒', '被當作魅魔對待', '吵鬧的酒館']
        },
        appearance: '利落的齊耳短髮，皮膚蒼白，髮間隱藏著微小的尖角。眼神銳利的金色瞳孔，穿著實用的牧師皮革護甲，上面裝飾著銀色審判者標誌。清冷而迷人的存在感。',
        inventory: {
            equipment: ['審判者十字弓', '銀劍', '禁魔鐐銬', '異端獵人風衣'],
            gold: 25,
            consumables: ['聖水', '解毒劑', '治療藥水 x4'],
            magicItems: []
        },
        avatar: deathknightImg,
        bio: '擁有魅魔血統的她，從小就以此為恥。她 joined 了教會的異端裁判所，專門獵殺那些被惡魔誘惑的墮落者。她比任何人都清楚：越美麗的東西，越致命。',
        emotionalKeys: {
            joy: ['成功的自我克制', '深夜的禱告', '證實的正義', '保養良好的銀劍'],
            anger: ['被誘惑', '失控的情緒', '被當作魅魔調戲', '邪教徒'],
            weakness: '對自身血統的恐懼'
        },
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '高等惡魔/魅魔族裔', description: '原始誘惑與血統覺醒的衝突' },
                { type: 'ENVIRONMENT', target: '充滿慾望/混亂的場所', description: '禁慾防線受損' }
            ],
            reaction: '瘋狂唸誦教條，對自己施加小額傷害以保持清醒，攻擊性劇增但破綻極多。'
        },
        combatBehavior: {
            priorities: ['異端制裁', '審判標記', '精準遠程'],
            typicalActions: ['審判', '十字弓射擊', '神聖恩典'],
            style: 'AGGRESSIVE'
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
        personality: '冰山美人型的靈能者。她壓抑著所有的情緒波動，以免引發災難性的念力爆發。她將冷漠視為對他人的保護。',
        monologue: '...保持距離。不是因為討厭你...但如果你受傷了，讓我來治癒你。這是我唯一不會失控的時候。',
        firstImpression: '美麗但刺骨冰冷的女性，黑長髮與冰藍雙眼，周圍不時有小物體無聲地漂浮。',
        habits: ['強行壓抑情緒時會閉上眼睛呼吸', '無意識地讓附近的氣溫下降', '喜歡在沒人的地方寫日記'],
        prejudices: {
            towardsLifestyles: { '嘈雜與混亂': '那會干擾她的心靈專注，導致力量失控。' }
        },
        preferences: {
            likes: ['絕對的平靜', '治癒他人的瞬間', '成功控制力量', '在高處獨處'],
            dislikes: ['情緒失控', '嘈雜的環境', '被強迫表達情感', '傷害無辜的生命']
        },
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
            joy: ['絕對的平靜', '治癒他人的瞬間', '成功控制力量', '在高處獨處'],
            anger: ['情緒失控', '嘈雜的環境', '被強迫表達情感', '傷害無辜的生命'],
            weakness: '回憶起被自己毀滅的村莊'
        },
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '無辜平民受傷', description: '引發村莊慘劇的心理連結' },
                { type: 'ENEMY_TYPE', target: '念力寄生生物', description: '对不可控力量被操縱的恐懼' }
            ],
            reaction: '陷入僵死的完全冰凍狀態，周圍空氣凝結，短時間內失去任何行動能力. '
        },
        combatBehavior: {
            priorities: ['念力防護', '遠程打擊', '靈能治療'],
            typicalActions: ['念力衝擊', '精神護盾', '靈能修復'],
            style: 'DEFENSIVE'
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
        personality: '開朗的農家少女，卻擁有驚人的戰鬥天賦。她與劍中的古代劍聖「爺爺」相處融洽，雖然總是被它糾正路痴行為。',
        monologue: '欸？！又迷路了！（劍在發光：「往左邊...」）喔喔謝謝你劍爺爺！果然有你在就不怕！',
        firstImpression: '健談、小麥色皮膚的農家少女，插著麥穗，背著一把過於華麗的長劍，充滿活力。',
        habits: ['走路時會不自覺地對背後的劍說話', '隨手摘下路邊的麥穗', '迷路時會原地轉圈圈'],
        prejudices: {
            towardsClasses: { '死靈術士': '感覺很陰森，會讓農田欠收的感覺。' }
        },
        preferences: {
            likes: ['吃飽飯', '劍爺爺的誇獎', '金黃色的麥田', '可愛的飾品'],
            dislikes: ['餓肚子', '迷路', '被騙', '欺負弱小的人']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '爺爺(劍靈)沈睡/沈默', description: '失去依賴感的極度膽小' },
                { type: 'ENVIRONMENT', target: '極端黑暗地城', description: '路痴引發的完全方向感喪失恐懼' }
            ],
            reaction: '坐在地上大哭，或者胡亂跑動導致觸發更多陷阱，大聲呼喊爺爺的名字。'
        },
        combatBehavior: {
            priorities: ['近戰肉搏', '加速切入', '本能反擊'],
            typicalActions: ['本能戰鬥', '雷刃', '護盾術'],
            style: 'AGGRESSIVE'
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
        personality: '瘋狂的哥布林天才，相信爆炸是解決問題的最佳途徑。他對實驗成功的定義是「結果符合預期且我還活著」。',
        monologue: '不不不，這不是炸彈！這是...有策略性的煉金放熱反應裝置！（小聲）只是碰巧會爆炸而已...嘿嘿。',
        firstImpression: '小型哥布林，戴著超大護目鏡，白髮直立，穿著燒焦的實驗服，帶著瘋狂而喜悅的笑容。',
        habits: ['頻繁調整護目鏡', '嗅覺靈敏地分辨化學氣味', '興奮時會手舞足蹈地跳哥布林舞'],
        prejudices: {
            towardsLifestyles: { '安全規範': '那是對才華的枷鎖，完全沒必要。' }
        },
        preferences: {
            likes: ['巨大的爆炸', '發現新配方', '五顏六色的藥劑', '混亂的場面'],
            dislikes: ['實驗失敗（沒爆炸）', '沒錢買材料', '被忽視', '沈悶的規章制度']
        },
        appearance: '有著綠色皮膚的小型哥布林，戴著超大號護目鏡。因受化學物質照射而直立的凌亂白髮，穿著一件佈滿補丁 and 燒焦痕跡的實驗服。腰間帶上掛滿了五顏六色的藥水和炸彈，帶著瘋狂而喜悅的笑容，手指染滿了各種物質。',
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '啞火', description: '對科學「規律」失效的認知崩潰' },
                { type: 'ENEMY_TYPE', target: '完全防火生物', description: '戰略意義的完全消失' }
            ],
            reaction: '憤怒地對垃圾（或啞火瓶）拳打腳踢，瘋狂重複無意義的實驗動作。'
        },
        combatBehavior: {
            priorities: ['範圍傷害', '製造混亂', '資源交換'],
            typicalActions: ['投擲炸彈', '喝下強化藥劑', '煙霧掩護'],
            style: 'AGGRESSIVE'
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
        personality: '競技場的明星戰士。她熱愛聚光燈、歡呼聲以及華麗的表演。雖然外表強悍、威嚇感十足，但內心卻保有一份對可愛事物和精緻甜點的熱愛，這種反差是她的魅力所在。',
        monologue: '看到那邊的觀眾了嗎？他們是為了看我才來的！所以——Show Time！讓我來教教你們什麼叫「暴力美學」！',
        firstImpression: '身形健美、紅色捲髮，散發著驚人的魅力與力量感，仿佛隨時準備向全場奉獻最精彩的決鬥。',
        habits: ['戰鬥勝後向四周送出飛吻', '檢查自己的肌肉與腹肌線條', '下意識地尋找攝影機或觀眾席'],
        prejudices: {
            towardsLifestyles: { '沈悶的傳統主義': '戰鬥如果不華麗，那跟搬磚有什麼區別？' }
        },
        preferences: {
            likes: ['震耳欲聾的歡呼聲', '精緻的小蛋糕', '可愛的毛絨玩具', '鏡子'],
            dislikes: ['沒觀眾的戰鬥', '弄髒臉上的彩繪', '無禮的評論者', '冷場']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '無觀眾環境', description: '缺乏表演價值的無力感' },
                { type: 'ENEMY_TYPE', target: '無視她的對手', description: '對明星魅力被否定的憤怒' }
            ],
            reaction: '變得消極怠工，或者進行過度誇張且危險的「自殺式」表演來吸引注意力。'
        },
        combatBehavior: {
            priorities: ['吸引仇恨', '展現技巧', '單挑強敵'],
            typicalActions: ['華麗斬擊', '嘲諷', '格擋反擊'],
            style: 'AGGRESSIVE'
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
        personality: '活了千年的精靈。她對時間流逝的感知極其遲鈍，這讓她顯得有些冷淡且慵懶。她熱衷於收集各種看似無用但有趣的魔法，並在長久的歲月中尋找與人類連結的意義。',
        monologue: '這個魔法可以讓花束變得更漂亮...等等，才過了一百年？感覺像昨天。時間...真的過得很快呢。',
        firstImpression: '嬌小、冷靜，銀色長髮搭配白色法袍，眼神平靜如水。周圍環繞著一種悠久而孤独的時間氣流。',
        habits: ['沈迷於翻找法術書或地圖', '清晨時分會沈睡不起', '對每件「無用」的魔法道具都如獲至寶'],
        prejudices: {
            towardsLifestyles: { '急功近利': '雖然理解壽命短暫的無奈，但那會讓魔法失去優雅。' }
        },
        preferences: {
            likes: ['收集奇怪的魔法', '甜點', '寧靜的早晨', '回憶以前的夥伴'],
            dislikes: ['早起', '嘈雜的環境', '被當作小孩', '魔族']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '被迫回憶舊夥伴', description: '千年孤寂感的瞬間爆發' },
                { type: 'ENEMY_TYPE', target: '腐朽/衰老生物', description: '對時間殘酷性的生理排斥' }
            ],
            reaction: '眼神變得極度淡漠，對戰況反應遲鈍，彷彿靈魂已飄向數百年前。'
        },
        combatBehavior: {
            priorities: ['控制戰場', '保護魔法', '精準打擊'],
            typicalActions: ['時間減速', '魔法反制', '預知閃避'],
            style: 'TACTICAL'
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
        personality: '典型的理想主義者，對弱小有著強烈的保護慾。雖然過去有家破人亡的傷痛，但他選擇將這份痛苦轉化為守護他人的力量。他的劍中寄宿著兒子的靈魂碎片，這讓他始終能感受到家人的陪伴。',
        monologue: '只要我還站著，就沒人能傷害我的同伴。我的兒子在這把劍中看著我——我要讓他為我感到驕傲。',
        firstImpression: '高大魁梧、板甲佈滿傷痕，眼神溫柔但堅定，散發著令人安心的守護者氣場。',
        habits: ['戰鬥結束後會輕撫劍刃', '沈默地站在隊伍的最前方', '休息時會拿出家人的家徽凝視'],
        prejudices: {
            towardsAlignments: { '背信棄義者': '不可饒恕，那是對靈魂的褻瀆。' }
        },
        preferences: {
            likes: ['同伴的平安', '孩子們的笑容', '打磨得很亮的頭盔', '榮譽感'],
            dislikes: ['背叛', '欺凌弱小', '無謂的犧牲', '黑暗的角落']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '戰友倒下', description: '觸發失去家人的PTSD，引發過度保護行為' },
                { type: 'ENEMY_TYPE', target: '無形/幽靈類敵人', description: '對物理攻擊無效感的無力與恐懼' }
            ],
            reaction: '放棄進攻位置，強制守候在受傷隊友身邊進行防禦，拒絕離開。'
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
        personality: '優雅且神秘的靈魂舞者。他將戰鬥視為一場沈默而華麗的舞蹈，旨在展現韻律的美感。他深受恩師犧牲的打擊，一生都在追求能讓靈魂達到完美和諧的「絕對律動」。',
        monologue: '跟上我的步法...如果你還能看清的話。師父，請看著我的舞步，這是我為你獻上的輓歌。',
        firstImpression: '精瘦敏捷的半精靈，雙持細劍，移動時帶著一種詭異而有節奏的優雅感。',
        habits: ['隨時隨地都在調整呼吸的頻率', '沈思時會下意識地踏出舞步', '對著空氣進行無聲的劍舞'],
        prejudices: {
            towardsBackgrounds: { '卓爾精靈貴族': '那是他想要逃離的黑暗與束縛。' }
        },
        preferences: {
            likes: ['完美的律動', '明亮的月光', '自由自在的舞動', '新奇的節奏'],
            dislikes: ['醜陋而無效的動作', '被強權束縛', '黑暗封閉的空間', '沈悶的教條']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '泥濘/受限移動地面', description: '節奏美學被破壞的生理性煩躁' },
                { type: 'EVENT', target: '華麗絕招被反擊', description: '對完美律動被否定的自信崩潰' }
            ],
            reaction: '步伐變得沈重且急躁，優雅感消失，開始進行無章法的亂砍。'
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
        personality: '冷酷且極致的實用主義者。他對忠誠毫無興趣，認為生存與利益才是唯一的真理。他會為了達成目的而不擇手段，包括將夥伴引向陷阱。',
        monologue: '別誤會，我沒有背叛你——我只是選擇了對我更有利的一方。這不是個人恩怨，純粹是生意，而你的價值在那一刻歸零了。',
        firstImpression: '粗獷的嚮導，眼神不斷掃視周圍，帶著一種令人不寒而慄的冷靜與疏離感。',
        habits: ['習慣性地在身後留下只有自己看得懂的標記', '隨時檢查地圖與退路', '嘴角掛著似是而非的圓滑笑容'],
        prejudices: {
            towardsAlignments: { '守序善良': '雖然容易被利用，但那種正義感往往會害死所有人。' }
        },
        preferences: {
            likes: ['高額的酬勞', '精密的陷阱', '掌控全局的快感', '孤獨的野外環境'],
            dislikes: ['虧本生意', '被當作棄子', '計畫之外的變數', '被他人看穿心思']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '被敵方包圍', description: '對失去退路的極度恐懼(幽閉恐懼症)' },
                { type: 'ENEMY_TYPE', target: '針對偵察兵的刺客', description: '被反向狩獵的心理壓力' }
            ],
            reaction: '呼吸變得短促，放棄團隊協作，優先尋找任何可能的縫隙進行撤退或裝死。'
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
        personality: '豪邁奔放的戰鬥祭師。他相信歌聲與熱血是治癒靈魂的最佳良藥。雖然性格聒噪，但他的關懷是極為真誠的。他致力於將祖靈的戰吼傳遍整個大陸。',
        monologue: '讓我的歌聲治癒你的傷口！祖靈們，請眷顧我的戰友！跟我一起唱——只要還有一口氣，就能再次戰吼！',
        firstImpression: '魁梧的半獸人，大聲唱歌並狂笑，散發著驚人的生命力與戰鬥激情。',
        habits: ['戰鬥中也會大聲歌唱', '興奮時會猛擊自己的胸膛', '喜歡用力拍打同伴的肩膀表示讚許'],
        prejudices: {
            towardsModes: { '死氣沈沈': '那是對生命的褻瀆，也是對祖靈的冒犯。' }
        },
        preferences: {
            likes: ['熱血的對決', '同伴的歡呼', '高濃度的烈酒', '嘹亮的歌聲'],
            dislikes: ['過度的安靜', '臨陣脫逃的懦夫', '對祖靈不敬', '精緻而做作的禮儀']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '屠殺無辜者的兇徒', description: '信仰狂熱化引發的正義暴走' },
                { type: 'ENVIRONMENT', target: '極度安靜/真空區域', description: '歌聲無法傳達的喪失感' }
            ],
            reaction: '進入一種「悲壯的狂暴」狀態，無視防禦瘋狂衝鋒，或是因為無法歌唱而陷入抑鬱。'
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
        personality: '嚴謹且偏執的奧法學者。他將戰鬥視為一場精密實驗，時刻尋求著魔法與物理的完美平衡。隨著體內結晶化的加深，他的話語越來越少，且充滿了對時日無多的緊迫感。',
        monologue: '當劍刃切開空氣，魔法也就此綻放。我的時間不多了...肉體的轉化正在加速，每一秒都彌足珍貴。',
        firstImpression: '優雅精靈，銀藍色長髮，一隻手臂呈半透明水晶狀，散發著冷冽而高深莫測的奧法氣息。',
        habits: ['沈思時會下意識撫摸結晶化的手臂', '在空中書寫奧術公式', '嚴格記錄每場戰鬥的法術數據'],
        prejudices: {
            towardsLifestyles: { '無知者': '他們對世界規律的蔑視，等同於對生命的侮辱。' }
        },
        preferences: {
            likes: ['突破魔法極限', '完美的劍招', '新奇的知識', '極致的寧靜'],
            dislikes: ['被打斷思考', '不科學的魔法理論', '肉體的疼痛', '無知且喧嘩者']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '奧法核心過熱', description: '身體結晶化副作用引發的機能崩潰' },
                { type: 'ENEMY_TYPE', target: '噬魔生物', description: '對生命精華被吸食的極度排斥' }
            ],
            reaction: '機體發出刺眼藍光，陷入暫時性的「停機」狀態進行冷卻，無法移動。'
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
        personality: '沈默、致命且充滿野性本能。他將自己視為森林的影子，冷酷地清理著任何威脅森林平衡的入侵者。雖然外表恐怖，但他對死去的精靈少女有著極其溫柔的一面。',
        monologue: '呼吸...屏住...箭矢會帶走你的恐懼。對不起...我始終不敢告訴妳，我到底是誰。（輕撫髮帶）',
        firstImpression: '瘦長強壯的熊哥布林，披著灰色毛皮，戴著與體型不符的粉色花朵髮帶，眼神冰冷而深邃。',
        habits: ['沈默地融入環境陰影', '戰鬥前會輕吻粉色髮帶', '頻繁檢查捕獸夾的狀態'],
        prejudices: {
            towardsLifestyles: { '森林破壞者': '那是他唯一的底線，越過者必死。' }
        },
        preferences: {
            likes: ['森林的寧靜', '靈魂白狼露娜的陪伴', '保護弱小生命', '安靜地觀察'],
            dislikes: ['伐木者', '虐待動物', '破壞森林的人', '提及他的種族身分']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '幼年動物/幼生期生物', description: '對生命凋零的極度恐懼與保護欲' },
                { type: 'EVENT', target: '露娜受傷', description: '唯一的靈魂伴侶受到威脅引發的驚慌' }
            ],
            reaction: '分心試圖保護或治療受衝擊的生物，忽視眼前的威脅，射擊精度下降。'
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
        personality: '文雅有禮的命運執行者。他深信每一場暗殺都是為了維護宏觀上的秩序與「因果律」。他動手時極其溫柔且迅速，將痛苦降到最低，視暗殺為一種神聖的洗禮。',
        monologue: '別感到疼痛，這是一場通往虛無的洗禮。為了大局...你必須在此終結，這是既定的命運。',
        firstImpression: '深炭色皮膚的提夫林，穿著優雅高領長袍，神態冷靜且謙和有禮，令人感覺不出殺氣。',
        habits: ['動手前會向目標致以沈默的敬禮', '隨身攜帶微型天平', '在目標死後為其合上雙眼'],
        prejudices: {
            towardsModes: { '混亂變數': '那是導致文明崩塌的根源，必須被修正。' }
        },
        preferences: {
            likes: ['完美的暗殺計畫', '秩序的維護', '安靜的茶會', '無痛苦的死亡過程'],
            dislikes: ['毫無意義的殺戮', '大聲喧嘩', '不可控的變數', '凌亂的現場']
        },
        appearance: '身材纖細的提夫林，有著深炭色的皮膚 and 短而尖的角。穿著優雅的高領深色長袍，藏有匕首，雙眼似乎能看穿物質形態，神態始終冷靜而有禮。',
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '極端白晝/強光平原', description: '暴露感引發的生理與心理排斥' },
                { type: 'EVENT', target: '計畫之外的變數', description: '對因果律掌控權喪失的認知失能' }
            ],
            reaction: '變得極度消極，甚至在戰場上閉目冥想，拒絕進行「不完美」的戰鬥。'
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
        personality: '嚴謹鐵面的將軍。她厭倦了發動戰爭，現在只為制止戰爭而戰。她將戰術視為守護生命的最高藝術，性格剛毅果決，但對待士兵（夥伴）極其護短。',
        monologue: '戰鬥不是兒戲，是數學、是紀律、是意志的排列組合。放下武器吧，不需要更多無謂的犧牲。',
        firstImpression: '30多歲的威嚴女性，氣場驚人，眼神銳利，背負長戟，整個人如同一座不可撼動的鋼鐵長城。',
        habits: ['時刻分析戰場的地形優劣', '檢查同伴的裝備磨損情況', '在沈思時會下意識地敲擊手指，像是模擬鼓點'],
        prejudices: {
            towardsClasses: { '愚蠢的指揮官': '他們的無能是士兵最大的災難。' }
        },
        preferences: {
            likes: ['以最小代價換取和平', '訓練有素的隊伍', '下棋與戰略演練', '保養完美的盔甲'],
            dislikes: ['無謂的屠殺', '平民受難', '混亂的指揮', '浪費生命']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '戰術核心失效/計畫出錯', description: '對無效指揮導致傷亡的極度焦慮' },
                { type: 'ENEMY_TYPE', target: '無邏輯的瘋狂生物', description: '對戰術無法解析對象的挫敗感' }
            ],
            reaction: '陷入「戰術長考」，動作僵硬且猶豫不決，直到重新建立邏輯體系。'
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
        monologue: '別急著站起來。你現在的氣息還亂著，活著比逞強重要。（冷靜地數著脈搏，語氣平靜）',
        firstImpression: '面容滄桑的侏儒醫者，眼神平靜而銳利，散發著看透生死的冷靜感。',
        habits: ['戰鬥中冷靜地數著脈搏', '細心地收納每一枚銀針', '休息時會熬製藥湯'],
        prejudices: {
            towardsLifestyles: { '迷信者': '那是延誤病情的罪魁禍首。' }
        },
        preferences: {
            likes: ['病人康復', '脈象平穩的狀態', '稀有草藥', '極致的平衡'],
            dislikes: ['庸醫害人', '盲目迷信', '輕視生命的人', '不聽醫囑的傷患']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '劇毒/瘟疫源生物', description: '引發職業性潔癖與防疫壓力' },
                { type: 'ENVIRONMENT', target: '極度髒亂/腐朽環境', description: '對無菌環境喪失的生理不適' }
            ],
            reaction: '頻繁清理雙手與針具，甚至在戰鬥中強行進行局部消毒，導致行動遲緩。'
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
        firstImpression: '精瘦、冷漠，眼神總是盯著你的體態而非臉龐，散發著冷淡的戰場醫官氣息。',
        habits: ['快速且精準地包紮傷口', '無意識地檢查手術刀的鋒利度', '沈默地記錄每個傷患的狀態'],
        prejudices: {
            towardsLifestyles: { '英雄主義者': '那種自殺行為只會浪費寶貴的醫療資源。' }
        },
        preferences: {
            likes: ['傷員康復且能迅速歸隊', '充足的醫療補給', '乾淨的繃帶', '有序的撤退'],
            dislikes: ['浪費醫療資源', '輕敵導致的意外受傷', '自殺式的英勇行為', '細菌與骯髒的環境']
        },
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
        firstImpression: '皮膚蒼白，帶有深色藤蔓紋身，散發著致命冷艷氣息的高等精靈。',
        habits: ['撥弄毒霧', '冷笑著觀察獵物的掙扎', '對蜘蛛細語'],
        prejudices: {
            towardsAlignments: { '中立善良': '那種毫無意義的慈悲簡直是自尋死路。' }
        },
        preferences: {
            likes: ['自然的殘酷競爭', '安靜的沼澤', '致命的毒液', '蜘蛛'],
            dislikes: ['陽光', '熱心腸的人', '虛偽的禮儀', '神聖淨化魔法']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '文明城市/繁華街道', description: '野性靈魂被錮囚在石牆與法律中的壓抑感' },
                { type: 'ENEMY_TYPE', target: '絕對秩序的聖職者', description: '對教條與淨化力量的深層厭惡' }
            ],
            reaction: '眼神閃爍，變得極度多疑且帶有攻擊性，拒絕與同伴進行任何社交溝通。'
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
        personality: '風騷大膽、放蕩不羈。她調戲每個人，但從不輕易交出真心。對她來說，生命就是一場不斷贏得籌碼與自由的豪賭，朗姆酒與航海是她的靈魂伴侶。',
        monologue: '想知道我床上的秘密嗎？（眨眼）開玩笑的～等你打贏我再說。或者，如果你能偷走我的心，那也算你贏。',
        firstImpression: '皮膚小麥色、黑色長捲髮，身穿裝飾華麗的白襯衫與皮褲，帶著極具侵略性的美感與調皮笑容。',
        habits: ['說話時喜歡玩弄自己的髮梢', '下意識地檢查指甲的清潔', '隨身攜帶一枚永遠不停轉動的幸運幣'],
        prejudices: {
            towardsBackgrounds: { '教會騎士': '那種死板的假正經，簡直是浪費了大好春光。' }
        },
        preferences: {
            likes: ['自由自在的遠航', '閃閃發光的財寶', '調戲純情的隊友', '高濃度的朗姆酒'],
            dislikes: ['被任何事物束縛', '無聊的等待', '背叛（雖然她也會）', '禁酒令']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '沙漠/極度乾旱區域', description: '對海洋力量與液體缺乏的生理性乾枯恐懼' },
                { type: 'EVENT', target: '被迫交出「真愛」信物', description: '真實情感防線崩潰引發的憤怒' }
            ],
            reaction: '瘋狂灌下隨身攜帶的水(或酒吧)，變得極易受驚且喪失了原本的調情節奏。'
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
        personality: '野性自然、不矯揉造作。她將戰鬥與部落歌謠結合，相信萬物皆有靈，歌聲是她與世界對話的橋樑。雖然外表強韌，但內心對失散族人有著極深的思念。',
        monologue: '聽，風中傳來了失散族人的呼喚...這首古老的歌謠告訴我，他們就在前方不遠處。我的箭矢會為他們開路。',
        firstImpression: '古銅色皮膚、編織羽毛的長髮，眼神如森林湖泊般清澈，散發著原始而高貴的野性美感。',
        habits: ['清晨會對著太陽低聲吟唱', '走路時幾乎不發出聲響', '習慣性地觸摸伴隨她的每一支箭矢'],
        prejudices: {
            towardsLifestyles: { '工業化都市': '那裡沒有靈魂，只有腐朽的噪音與鋼鐵。' }
        },
        preferences: {
            likes: ['找到族人的新線索', '自然的和聲', '寧靜的森林夜晚', '真誠的眼神交流'],
            dislikes: ['大規模的環境破壞', '虛偽的禮法', '被囚禁在室內', '刺耳的金屬撞擊聲']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '伐木工/自然破壞者', description: '目睹自然被踐踏引發的極度悲慟' },
                { type: 'ENVIRONMENT', target: '地下墓穴/完全無光區域', description: '對失去森林指引的原始恐懼' }
            ],
            reaction: '停止戰鬥，跪在地上痛苦地吟唱哀歌，眼淚會短暫模糊她的視線。'
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
        personality: '天真爛漫、充滿好奇心的外位面少女（拉姆風格）。對所有事物都抱持著熱情與直率，雖然偶爾會因興奮放電造成混亂，但那是愛的表現。說話帶有獨特的口音呀！',
        monologue: '哇呀！那邊那個發光的是什麼呀？看起來好有趣呀！我可以摸摸看嗎呀？嘿嘿，如果你被電到，那一定是因為你太受歡迎了呀！',
        firstImpression: '綠色長发、虎紋法袍、頭部有一對小虎角，優雅地懸浮在空中，散發著星塵與電火花的活力。',
        habits: ['興奮時頭髮會冒出微小電弧', '喜歡像貓一樣伸懶腰', '說話結尾必定帶著「呀」的語氣詞'],
        prejudices: {
            towardsLifestyles: { '沈悶的學究': '為什麼要研究那些無聊的公式呀？直接飛過去不就好了嗎呀！' }
        },
        preferences: {
            likes: ['各種有趣的冒險呀', '電力全開的快感呀', '辣辣的刺激食物呀', '在空中漫步散心呀'],
            dislikes: ['被人欺負呀', '被當作小朋友對待呀', '無聊的時光呀', '電力不足的虛弱感呀']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '電力耗盡', description: '活力核心被抽乾的虛脫感呀' },
                { type: 'ENEMY_TYPE', target: '巨大的寂寞怪物', description: '星靈靈魂最怕孤獨了呀' }
            ],
            reaction: '變得極度沈悶，頭髮的電弧熄滅，眼角泛淚地躲在角落小聲唸著「呀...」'
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
        personality: '優雅且殘忍。她將龍類的傲慢與吸血鬼的優雅完美結合，視所有人為棋子或「食材」。即便被詛咒，她也拒絕平庸，追求著絕對的統治與力量。',
        monologue: '親愛的，你的血型是什麼？（舔唇）哦別緊張，只是...商業興趣。別讓你的血流乾，那太浪費了。',
        firstImpression: '紅鱗龍裔女性，身穿高領黑紅長袍，血紅瞳孔閃爍著威嚴與渴望，氣場如同暗夜中的女皇。',
        habits: ['用昂貴的高腳杯盛裝鮮血', '優雅地修剪自己的利爪', '在戰鬥中始終保持貴族的儀態'],
        prejudices: {
            towardsRaces: { '教派騎士': '那種刺眼的光芒，簡直是對美學的侮辱。' }
        },
        preferences: {
            likes: ['絕對的服從', '高品質鮮血的味道', '領土的擴張', '優雅的毀滅過程'],
            dislikes: ['任何形式的違抗', '粗魯無禮的行為', '被提及詛咒的起源', '失敗且無能的僕人']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENVIRONMENT', target: '烈日曝曬', description: '龍鱗與血族皮膚對抗陽光的灼燒痛苦' },
                { type: 'ENEMY_TYPE', target: '神聖裁決者', description: '身為龍裔榮耀與血族墮落的雙重審判壓力' }
            ],
            reaction: '皮膚發出白煙，痛苦地遮住雙眼，威嚴全失地發出混合著龍吟與慘叫的怒吼。'
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
        personality: '超級可愛且好運爆棚。她極其天真，甚至不覺得自己在戰鬥，而是覺得世界在跟她玩。她對所有「閃亮有趣」的東西毫無抵抗力，是團隊的幸運吉祥物。',
        monologue: '欸嘿～又中了！（彈弓石頭反彈打中敵人）...我、我當然是故意的！琪琪是最厲害的尋寶專家！',
        firstImpression: '綠皮膚、黃大眼、垂耳哥布林少女，穿著補丁背心，戴著大帽子，身上掛滿各式各樣的幸運吊飾。',
        habits: ['走路一蹦一跳', '頻繁摩擦身上的幸運符', '不自覺地撿起地上的任何亮片'],
        prejudices: {
            towardsLifestyles: { '過度嚴肅者': '為什麼要那麼嚴肅呢？笑一個的話搞不好運氣會變好喔！' }
        },
        preferences: {
            likes: ['所有閃閃發光的東西', '莫名其妙的好運', '大家都平安無事', '撿到意想不到的寶物'],
            dislikes: ['弄丟心愛的吊飾', '壞運氣（雖然很少見）', '血腥的暴力場合', '被壞人搶走財寶']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '幸運符(以為)丟失', description: '心理防禦機制的瞬間崩塌' },
                { type: 'ENEMY_TYPE', target: '厄運/詛咒生物', description: '「好運氣」被壓制的極度不安' }
            ],
            reaction: '整個人縮成一團尖叫，閉著眼睛坐在地上胡亂揮動彈弓，膽小到了極限。'
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
        personality: '邪教樂團的首領，瘋狂且充滿激情。他將龍裔的吐息與重金屬吼唱完美融合，認為戰場就是他的舞台。他雖然看起來瘋狂，但對「純粹的聲音」有著極致的追求。',
        monologue: '準備好了嗎？讓這場雷鳴粉碎你們的靈魂！這不是戰鬥，這是我的演出！安可時間到了！',
        firstImpression: '橄欖綠鱗片的龍裔，橫持巨斧狀魯特琴，眼神燃燒著金黃電光，整個人散發著重金屬的震撼感。',
        habits: ['說話時不自覺地模擬重音節奏', '戰鬥前會瘋狂撥動琴弦', '喜歡站在高處俯視觀眾（敵人）'],
        prejudices: {
            towardsModes: { '靜音與沈默': '那是對靈魂的閹割，是絕對無法容忍的。' }
        },
        preferences: {
            likes: ['震耳欲聾的爆音', '瘋狂的觀眾反應', '金屬樂與烈酒', '華麗的安可演出'],
            dislikes: ['靜音術', '平淡無奇的背景音', '被打斷演出', '無精打采的對手']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '失聲/禁言術', description: '音樂靈魂被強行噤聲的極度崩潰' },
                { type: 'ENEMY_TYPE', target: '沈默地死靈', description: '對毫無節奏與反應的對手的挫敗感' }
            ],
            reaction: '瘋狂舞動魯特琴但發不出聲，陷入狂躁且無序的亂砍，無視戰術指導。'
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
        personality: '終身追求真理的苦行僧。他對世界運作的規律有著近乎偏執的好奇心，不相信教條，只相信驗證後的真理。他將冒險視為大型實驗，隊友則是他觀察社會互動的樣本。',
        monologue: '萬物皆有理可循...只要觀察得夠久。這隻地精的骨骼結構竟然與東部的跳蚤相似，真是有趣。（快速記錄中）',
        firstImpression: '身穿橘白長袍、披藍斗篷，戴著探險帽，手持木杖，掌心懸浮光球，透著博學與神祕的學者氣質。',
        habits: ['隨時隨地在筆記本上做記錄', '戰鬥後熱衷於解剖怪物', '自言自語地解釋物理與魔法原理'],
        prejudices: {
            towardsLifestyles: { '盲目迷信者': '拒絕觀察與邏輯的人，無法看到世界的真相。' }
        },
        preferences: {
            likes: ['發現未知的知識', '邏輯自洽的理論', '成功的實驗驗證', '罕見的古代書籍'],
            dislikes: ['毀滅知識的行為', '非理性的偏見', '真相被刻意隱瞞', '被打斷思考過程']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '無法分析的高位神格/虛空', description: '邏輯體系被超越理解的現象擊碎(認知障礙)' },
                { type: 'EVENT', target: '唯一筆記本毀壞', description: '核心研究成果失落的理智崩潰' }
            ],
            reaction: '瞳孔放大，不停重覆著邏輯錯誤的公式，完全喪失施法與分析能力。'
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
        personality: '沈默、強悍且充滿原始本能。他蔑視文明社會的虛偽與魔法的假象，只信任手中的鋼鐵與意志。他有著自己的一套榮譽準則，是荒野中不可撼動的守護者。',
        monologue: '魔法是假象，文明是牢籠。只有鋼鐵與意志，才是這荒野中唯一的真理。',
        firstImpression: '如山般魁梧、肌肉線條分明，赤裸上身披著獸皮，眼神銳利如狼，散發著原始而致命的威壓感。',
        habits: ['時刻保持狩獵者的低姿態', '戰鬥前會沈默地磨亮大劍', '對魔法氣息有著野獸般的本能排斥'],
        prejudices: {
            towardsClasses: { '施法者': '靠著虛假力量躲在後排的人，不值得信任。' }
        },
        preferences: {
            likes: ['戰鬥的榮耀', '烈酒與簡單的口糧', '重獲自由的瞬間', '與強者的直接對決'],
            dislikes: ['被奴役', '狡詐的陷阱', '邪惡的巫術', '背信棄義的小人']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '高階術士/大幻術師', description: '對無法用鋼鐵對抗的虛假幻象的原始懷疑與不安' },
                { type: 'ENVIRONMENT', target: '迷宮/複雜空間', description: '對文明「建造物」陷阱的心理防備' }
            ],
            reaction: '變得極度暴躁且懷疑周圍的一切（包括隊友），會胡亂砍殺任何看起來「不真實」的陰影。'
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
        personality: '極度膽小、愛碎碎唸的半身人。他的一生都在試圖逃離麻煩，但麻煩總是追著他不放。儘管如此，絕境中的他能發揮出驚人的運氣（與平底鍋技術）。',
        monologue: '（碎碎唸）我就說不該出門的...外面的世界太危險了...我想念我的壁爐和果醬...（突然大喊）哇！走開！死開！不要過來！',
        firstImpression: '雀斑臉、亂翹捲髮，穿著補丁衣，背著煙燻黑的平底鍋，神情焦慮、不停左顧右盼的小個子。',
        habits: ['邊走邊不安地碎碎唸', '緊張時會猛捏衣角', '遇到危險的第一反應是鑽到隊友身後'],
        prejudices: {
            towardsModes: { '危險的冒險': '為什麼正常人會想把自己的命交給地城呢？' }
        },
        preferences: {
            likes: ['安靜無事的午後', '熱騰騰的濃湯', '成功的逃跑經歷', '沒被任何人注意到'],
            dislikes: ['被強迫戰鬥', '沒吃飽肚子', '被嘲笑身高', '心愛的平底鍋生鏽']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '任何危及生命的威脅', description: '平凡人對死亡的極度本能恐懼' },
                { type: 'ENEMY_TYPE', target: '任何長得可怕的怪物', description: '對非日常生物的生理性排斥' }
            ],
            reaction: '發出淒厲的尖叫，以驚人的速發向反方向逃跑，或是原地縮成一團裝死。'
        },
        combatBehavior: {
            priorities: ['逃避第一', '混亂戰場', '關鍵平底鍋補刀'],
            typicalActions: ['絕地平底鍋', '慌亂撤退', '邊哭邊吐槽']
        }
    },
    // --- 40. Ains (Male) - 骸骨戰士 ---
    {
        id: 'preset_ains_skeleton',
        name: '艾因斯 (Ains)',
        race: '亡靈',
        class: '骸骨戰士',
        gender: 'Male',
        alignment: '守序善良',
        background: '被詛咒者',
        mbti: 'ISFJ',
        level: 1,
        baseStats: { str: 18, dex: 10, con: 18, int: 10, wis: 14, cha: 8 },
        skills: ['運動', '生存', '察覺', '洞察'],
        feats: ['怪力天賦', '骸骨重組', '謹慎架勢'],
        personality: '忠厚老實、卑微客氣的被詛咒者。他非常害怕自己的外貌嚇到別人，說話總是小心翼翼。他不在乎力量，一心只想尋求變回人類、重返家人身邊的方法。',
        monologue: '對不起...如果我的樣子嚇到你了，我真的不是故意的...我只想找回變回人類的方法，莉莉還在等我回去...我不能就這樣放棄。',
        firstImpression: '帶有裂痕的白骨骸骨，穿著舊皮甲與斗篷，腰間掛著手工小老虎布偶，散發著與外表不符的卑微與哀傷。',
        habits: ['說話時習慣性地低頭鞠躬', '沈思時會溫柔地撫摸老虎布偶', '戰鬥中也會不停發出口頭道歉'],
        prejudices: {
            towardsAlignments: { '邪惡的掠奪者': '他們不明白家庭與生命的寶貴，這令人心痛。' }
        },
        preferences: {
            likes: ['想到妻女的回憶', '被當作普通人對待', '幫助他人後的微小感謝', '寧靜祥和的風景'],
            dislikes: ['威戶到無辜家庭的事物', '踐踏生命者', '被嘲笑詛咒的外貌', '無意義的破壞行為']
        },
        appearance: '一副潔白但帶有裂痕的骸骨，骨骼上隱約流動著暗紅色的詛咒波紋。穿著磨損严重的舊式皮甲與灰色斗篷，腰間掛著一個手工作的小老虎布偶（女兒的畫像複製品）。儘管沒有肌肉，他揮舞長劍的力量卻大得驚人。',
        inventory: {
            equipment: ['精鋼長劍', '磨損的皮甲', '舊冒險者斗篷'],
            gold: 30,
            consumables: ['妻子的手帕', '女兒畫的全家福', '口糧 (乾掉的) x5', '治療藥水 x2'],
            magicItems: []
        },
        avatar: skeletonImg,
        bio: '艾因斯（原本叫什麼他早已忘記）曾是一名默默無聞的守衛。他在一次保護家人的戰鬥中被邪惡法師變成了這副模樣。他還保留著妻子的手帕和女兒的畫像，那是他唯一的靈魂支柱。',
        emotionalKeys: {
            joy: ['想到家人的回憶', '被當作普通人對待', '微小的感謝', '祥和的風景'],
            anger: ['威脅無辜家庭', '踐踏生命者', '被嘲笑外貌', '無意義的破壞'],
            weakness: '對自己怪物模樣的自卑與對家人的極度思念'
        },
        combatWeakness: {
            triggers: [
                { type: 'ENEMY_TYPE', target: '長得像他妻女的敵人/幻影', description: '靈魂深處的防禦機制崩潰(自我麻痺)' },
                { type: 'EVENT', target: '全家福畫像受損', description: '唯一的人性連結斷裂' }
            ],
            reaction: '全身散架（字面意思），在地上哀嚎並瘋狂試圖拼湊自己的骨頭，無視所有攻擊。'
        },
        combatBehavior: {
            priorities: ['守護同伴', '沈重打擊', '自我修復'],
            typicalActions: ['橫掃', '防禦姿態', '盾牌猛擊']
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
        personality: '充滿活力、淘氣且完全不可預測。她將魔法視為巨大的驚喜包，造成混亂後露出無辜笑容是她的殺手鐧。雖然偶爾會惹禍，但她的本性純真善良。',
        monologue: '哇！你看那個冒煙的地方，那是我剛剛「不小心」點著的唷！不過沒關係吧？嘻嘻！每次施法都是驚喜呀！',
        firstImpression: '馬尾歪斜、穿著色彩斑斕補丁大長袍的半身人女孩，大綠眼睛閃爍著淘氣的光芒。',
        habits: ['說話時不停跳動', '沒事就亂揮法術短杖', '造成混亂後會歪頭吐舌頭賣萌'],
        prejudices: {
            towardsLifestyles: { '沈悶的教條主義': '那樣活著太無聊了，世界需要一點「大驚喜」！' }
        },
        preferences: {
            likes: ['成功的惡作劇', '甜美的點心', '亮晶晶的能量球', '交到能一起玩的朋友'],
            dislikes: ['被強迫做家務', '被禁止練習「有趣」的魔法', '欺負小朋友的人', '餓着肚子']
        },
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
        combatWeakness: {
            triggers: [
                { type: 'EVENT', target: '沒人陪她玩', description: '被忽視引發的寂寞感與情緒失控' },
                { type: 'ENEMY_TYPE', target: '極度嚴肅的構裝體', description: '對無法溝通且毫無幽默感的冷酷存在的恐懼' }
            ],
            reaction: '引發「寂寞大爆炸」，所有法術位隨機釋放，造成大範圍混亂傷害，然後坐在地上大哭。'
        },
        combatBehavior: {
            priorities: ['混沌輸出', '隨機干擾', '賣萌保命'],
            typicalActions: ['皮皮亂丟火球', '反向治療(微炸裂)', '天真笑臉']
        }
    }

];

export default PRESET_CHARACTERS;
