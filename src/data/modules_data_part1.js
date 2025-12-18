/**
 * Module Plot Data - Part 1 (Modules 1-10)
 * Detailed Act structures for Story Navigation
 */

export const MODULES_PART1 = {
    "hoard_of_dragon_queen": {
        id: "hoard_of_dragon_queen",
        title: "巨龍寶庫",
        titleEn: "Hoard of the Dragon Queen",
        levels: "1-8",
        startLevel: 3,
        synopsis: "龍巫教正在蒐集財寶以召喚龍后塔克西絲。冒險者必須追蹤這個陰謀，從被圍攻的小鎮到飛行的雲巨人城堡。",
        acts: [
            {
                act: 1,
                title: "綠巢之圍",
                titleEn: "Greenest in Flames",
                levelRange: "1-2",
                objective: "保護綠巢鎮居民免於龍與邪教徒的攻擊",
                keyEvents: ["藍龍蘭納西爾空襲", "拯救教堂難民", "對決半龍人戰士希恩瑟", "護送平民"],
                npcs: [
                    { name: "奈丘總督", role: "雇主", description: "綠巢鎮的領主，組織城鎮防禦", quest: "保護城鎮" },
                    { name: "卡斯特蘭鎮長", role: "軍事顧問", description: "守衛隊長，提供戰術支援" },
                    { name: "蘭納西爾", role: "藍龍", description: "空襲城鎮的成年藍龍，極度危險", cr: 16, behavior: "不會持續戰鬥" },
                    { name: "希恩瑟", role: "半龍人戰士", description: "龍巫教的冠軍戰士，挑戰者", cr: 4, combat: "單挑決鬥" },
                    { name: "雷歐辛·艾藍斯特", role: "臥底僧侶", description: "哈珀調查員，被俘後成為情報來源" }
                ],
                locations: [
                    { name: "綠巢鎮", description: "被圍攻的小型貿易城鎮" },
                    { name: "綠巢堡", description: "奈丘總督的據點，最後防線" },
                    { name: "查圖洛斯神殿", description: "需要救援的居民避難所" },
                    { name: "磨坊", description: "邪教徒的縱火目標" }
                ],
                encounters: ["狗頭人群 (8)", "邪教徒 (6)", "飛羽狗頭人", "蘭納西爾空襲", "希恩瑟決鬥"],
                treasures: ["邪教徒日誌", "龍巫教飾物"],
                endCondition: "成功保衛綠巢，獲得邪教情報",
                opening_text: "夕陽西下，你們正沿著草綠色的丘陵走向綠巢鎮（Greenest）。這本該是一個寧靜的傍晚，但地平線上升起的不是炊煙，而是滾滾黑煙。即便是距離數里之外，你們也能聽見驚恐的尖叫聲與野獸般的咆哮。突然，一個巨大的陰影遮蔽了夕陽——一隻藍龍在城鎮上空盤旋，隨後俯衝而下，噴吐出毀滅性的閃電。與此同時，一群穿著暗色長袍的邪教徒與狗頭人正在洗劫街道。你們站在山丘上，目睹了這一切的開始。綠巢鎮的命運，此刻掌握在你們手中。"
            },
            {
                act: 2,
                title: "邪教營地",
                titleEn: "Raiders' Camp",
                levelRange: "2-3",
                objective: "滲透龍巫教營地，調查他們的計劃",
                keyEvents: ["追蹤劫掠者", "營地潛行任務", "救出雷歐辛", "發現龍蛋孵化場"],
                npcs: [
                    { name: "佛魯蘭·蒙達斯", role: "營地指揮官", description: "龍巫教中階指揮，殘忍的女性狂熱者", cr: 3 },
                    { name: "朗德雷斯·考亞諾德", role: "紅袍法師", description: "來自塞爾的火元素法師，研究龍蛋", cr: 4 },
                    { name: "雷歐辛·艾藍斯特", role: "被俘僧侶", description: "被捕的哈珀臥底，急需救援", status: "被俘" }
                ],
                locations: [
                    { name: "劫掠者營地", description: "藏在岩石峽谷中的臨時營地" },
                    { name: "龍蛋洞穴", description: "培育黑龍蛋的秘密洞穴" },
                    { name: "囚犯帳篷", description: "關押雷歐辛的地方" }
                ],
                encounters: ["巡邏衛兵", "龍巫教祭司", "守護龍蛋的狗頭人"],
                treasures: ["邪教財寶清單", "龍蛋（可選毀滅）"],
                plot_hooks: ["財寶運送路線", "上級指揮雷茲米爾"],
                endCondition: "獲得邪教財寶運送目的地情報",
                opening_text: "劫掠者的蹤跡很容易追蹤——燒焦的腳印、丟棄的贓物、還有受害者的血跡。峽谷深處，一個巨大的營地映入眼簾。數百個帳篷散布在谷底，狗頭人、邪教徒，甚至一些龍人在其中巡邏。在營地中央，一個巨大的紫色帳篷格外醒目。而更深處的洞穴入口，似乎藏著某種秘密。如果你們要潛入，必須非常小心。"
            },
            {
                act: 3,
                title: "龍蛋孵化場",
                titleEn: "Dragon Hatchery",
                levelRange: "3-4",
                objective: "探索洞穴，決定龍蛋的命運",
                keyEvents: ["洞穴探索", "龍犬遭遇", "龍蛋抉擇", "朗德雷斯對決"],
                npcs: [
                    { name: "朗德雷斯·考亞諾德", role: "洞穴守護", description: "紅袍法師，守護龍蛋", cr: 4, spells: ["火球術", "護盾術"] }
                ],
                locations: [
                    { name: "真菌花園", description: "生長發光蘑菇的洞穴區" },
                    { name: "龍犬巢穴", description: "棲息著龍巫教馴養的龍犬" },
                    { name: "孵化室", description: "三顆黑龍蛋所在" }
                ],
                encounters: ["龍犬 (3)", "紫蟲幼蟲", "真菌陷阱", "朗德雷斯與衛兵"],
                moral_choices: [
                    { choice: "毀滅龍蛋", consequence: "阻止惡龍誕生" },
                    { choice: "偷走龍蛋", consequence: "可能的未來盟友或威脅" }
                ],
                treasures: ["法師書籍", "龍巫教典籍"],
                endCondition: "清除洞穴，處理龍蛋問題",
                opening_text: "營地撤離後，那個神秘的洞穴終於可以安全進入——至少表面上是這樣。洞穴入口寬敞而黑暗，空氣中瀰漫著硫磺與腐肉的氣味。據雷歐辛所說，邪教徒在這裡培育龍蛋，如果那些龍蛋孵化，將成為巨大的威脅。但洞穴中的守衛不會輕易放棄⋯"
            },
            {
                act: 4,
                title: "大篷車追蹤",
                titleEn: "On the Road",
                levelRange: "4-5",
                objective: "隨商隊北上，監視邪教徒的財寶運輸",
                keyEvents: ["喬裝潛入商隊", "途中遭遇與陰謀", "抵達博德之門", "深水城調查"],
                npcs: [
                    { name: "各色商人", role: "同路人", description: "可能的盟友或線人" },
                    { name: "邪教押運員", role: "監視目標", description: "偽裝的龍巫教成員" },
                    { name: "雷茲米爾", role: "幕後黑手", description: "黑半龍女性，龍巫教高階領袖", cr: 7, brief_appearance: true }
                ],
                locations: [
                    { name: "商隊路線", description: "從博德之門到深水城" },
                    { name: "途中旅店", description: "隨機遭遇發生地" },
                    { name: "深水城", description: "北方最大的城市" }
                ],
                encounters: ["強盜伏擊", "怪物襲擊", "邪教徒試探", "路途困難"],
                treasures: ["情報文件", "商隊報酬"],
                endCondition: "追蹤財寶至深水城",
                opening_text: "跟蹤邪教徒的最好方法就是加入他們的商隊——當然是偽裝身份。博德之門是劍灣最繁忙的商業中心，無數的貨物從這裡向北運輸。邪教徒的財寶就藏在其中某輛馬車中，而你們的任務就是找到它。這段旅程將穿越數百里的公路，途中充滿了危險與機遇。"
            },
            {
                act: 5,
                title: "建造邪惡",
                titleEn: "Construction Ahead",
                levelRange: "5-6",
                objective: "調查邪教徒在深水城北方的據點",
                keyEvents: ["卡納斯建築工地調查", "發現隧道工程", "揭露叛徒身份", "傳送門發現"],
                npcs: [
                    { name: "博格·斯托姆克洛夫", role: "叛徒", description: "獅盾商會會長，實為邪教臥底", secret: "龍巫教資助者" },
                    { name: "塔利斯·科維利翁", role: "邪教操作員", description: "半精靈女性，負責工地運作", cr: 5 }
                ],
                locations: [
                    { name: "卡納斯工地", description: "建造中的旅店，實為掩護" },
                    { name: "地下隧道", description: "通往傳送陣的秘密通道" },
                    { name: "傳送室", description: "連接雲巨人城堡的傳送門" }
                ],
                encounters: ["工地衛兵", "邪教魔法師", "石巨魔"],
                treasures: ["傳送鑰匙", "邪教計劃書"],
                endCondition: "確認雲巨人城堡為最終目的地",
                opening_text: "深水城以北，一個看似普通的建築工地引起了哈珀的注意。卡納斯旅店——表面上是一個普通的商業擴張，但為什麼獅盾商會的商人會秘密資助這個項目？為什麼邪教徒的馬車都停在這裡？工地之下，似乎隱藏著通往某個更大秘密的通道⋯"
            },
            {
                act: 6,
                title: "天空城堡",
                titleEn: "Castle in the Clouds",
                levelRange: "7-8",
                objective: "潛入飛行城堡，阻止財寶運往龍井",
                keyEvents: ["雲巨人協商", "城堡滲透", "對決雷茲米爾", "飛行城堡控制"],
                npcs: [
                    { name: "布萊格拉德", role: "雲巨人領主", description: "被邪教利用的雲巨人，可能被說服", alignment: "中立", negotiable: true },
                    { name: "雷茲米爾", role: "Boss", description: "黑半龍女性，龍巫教高階領袖，持有黑龍面具", cr: 7 },
                    { name: "龍巫教精銳", role: "敵人", description: "城堡中的邪教守軍", cr: 4 }
                ],
                locations: [
                    { name: "雲巨人飛行城堡", description: "由魔法驅動的浮空堡壘" },
                    { name: "寶藏室", description: "堆滿龍巫教掠奪財寶的房間" },
                    { name: "雷茲米爾密室", description: "黑半龍的私人房間" },
                    { name: "控制塔", description: "城堡飛行魔法的核心" }
                ],
                boss: { name: "雷茲米爾", cr: 7, type: "黑半龍", abilities: ["酸息吐息", "恐懼光環", "黑龍面具力量"], tactics: "利用城堡地形、召喚增援" },
                encounters: ["雲巨人僕人", "龍巫教衛兵", "雷茲米爾最終戰"],
                treasures: [
                    { name: "黑龍面具", type: "神器", description: "五龍面具之一" },
                    { name: "龍巫教寶藏", type: "財寶", description: "大量金幣與魔法物品" }
                ],
                endCondition: "阻止這批財寶，但發現更大陰謀——五龍面具與龍后召喚計畫",
                opening_text: "傳送門將你們送到了雲端之上。一座巨大的白色城堡在雲海中漂浮，這是雲巨人的傑作，如今被龍巫教徵用為運輸財寶的工具。城堡中的雲巨人領主布萊格拉德對這筆交易似乎不太滿意，或許可以說服他站在你們這一邊。然而，真正的威脅是雷茲米爾——黑半龍女性，五龍面具之一的持有者。這將是這場冒險中最危險的對決。"
            }
        ]
    },


    "curse_of_strahd": {
        id: "curse_of_strahd",
        title: "史特拉德的詛咒",
        titleEn: "Curse of Strahd",
        levels: "1-10",
        startLevel: 3,
        synopsis: "被困在被迷霧籠罩的巴洛維亞，冒險者必須收集三件聖物、尋找命定盟友，才能對抗不死吸血鬼領主史特拉德·馮·扎羅維奇。",
        setting: "哥德恐怖",
        acts: [
            {
                act: 1,
                title: "死亡之屋",
                titleEn: "Death House",
                levelRange: "1-3",
                objective: "逃離被怨靈佔據的古宅",
                keyEvents: ["探索迷霧莊園", "發現邪教歷史", "對決地窖怪物"],
                npcs: [
                    { name: "羅斯與索恩", role: "引路幽靈", description: "被謀殺的杜斯特家孩子，引誘冒險者進入", type: "幽靈" },
                    { name: "伊莉莎白·杜斯特", role: "怨靈", description: "家族女主人，邪教創始成員之一", cr: 4 },
                    { name: "無臉肉塊", role: "Boss", description: "地窖深處的活體邪惡，由邪教獻祭所創", cr: 5 }
                ],
                locations: [
                    { name: "杜斯特莊園", description: "四層磚造古宅，充滿詛咒" },
                    { name: "秘密地窖", description: "邪教獻祭場所，通往黑暗祭壇" },
                    { name: "閣樓密室", description: "關押孩子屍體的房間" }
                ],
                encounters: ["行走盔甲", "幽魂僕役", "邪教活屍", "無臉肉塊"],
                treasures: ["杜斯特家傳劍", "邪教日記"],
                endCondition: "逃出死亡之屋，進入巴洛維亞",
                opening_text: "不自然的濃霧突然吞噬了道路，讓你們迷失了方向。當迷霧稍散，你們發現自己站在一棟古老而陰森的四層磚房前，與周圍破敗的建築格格不入。兩個衣著得體但神情驚恐的孩子——羅斯瓦爾和索恩，站在鏽跡斑斑的鐵門後哭泣。'除了怪物！還有怪物！' 他們指著身後的房子尖叫著，乞求你們進去救救他們被困在地下室的嬰兒弟弟。大門在你們身後無風自如地關上，迷霧如同活物般逼近，唯一的出路似乎只有這棟被當地人稱為'死亡之屋'的宅邸。"
            },
            {
                act: 2,
                title: "塔羅卡預言",
                titleEn: "Tarokka Reading",
                levelRange: "3-4",
                objective: "尋找吉普賽預言師，獲得命運指引",
                keyEvents: ["巴洛維亞村探索", "瑪丹伊娃占卜", "聖物與盟友位置揭示"],
                npcs: [
                    { name: "伊蕾娜·科里亞娜", role: "關鍵NPC", description: "被史特拉德覬覦的貴族女子，塔提亞娜的轉世", protected: true },
                    { name: "伊斯馬克·科里亞諾維奇", role: "盟友", description: "伊蕾娜的哥哥，巴洛維亞村長之子" },
                    { name: "瑪丹伊娃", role: "預言師", description: "維斯塔尼的命運占卜師，揭示命運" },
                    { name: "杜納維奇牧師", role: "NPC", description: "巴洛維亞教堂的瘋狂牧師，兒子被轉化為吸血鬼" }
                ],
                locations: [
                    { name: "巴洛維亞村", description: "被死亡籠罩的第一個村莊" },
                    { name: "科里亞尼領主府", description: "伊蕾娜的家，父親剛過世" },
                    { name: "塔瑟池塘", description: "維斯塔尼營地，瑪丹伊娃所在" }
                ],
                tarokka_positions: ["太陽之劍位置", "托姆斯聖徽位置", "聖者遺骨位置", "命定盟友", "史特拉德位置"],
                encounters: ["巴洛維亞殭屍", "史特拉德狼群", "吸血鬼陷阱"],
                plot_hooks: ["護送伊蕾娜至安全處", "尋找三件聖物", "找到命定盟友"],
                endCondition: "獲得三件聖物與命定盟友的線索",
                opening_text: "逃出死亡之屋後，你們發現自己身處一片永恆薄霧籠罩的土地。這裡是巴洛維亞，一個被詛咒的半位面，沒有太陽，沒有希望。巴洛維亞村就在前方，破舊的建築散發著腐朽的氣息。村中央的教堂傳來瘋狂的尖叫聲，而不遠處的科里亞尼府邸上空盤旋著數隻烏鴉。據說維斯塔尼人知道如何離開這片土地——如果他們願意告訴你們的話。"
            },
            {
                act: 3,
                title: "瓦拉基鎮",
                titleEn: "Village of Vallaki",
                levelRange: "4-6",
                objective: "在瓦拉基鎮建立據點，蒐集情報與盟友",
                keyEvents: ["鎮長瓦加斯的瘋狂慶典", "聖安卓教堂的骨骸", "維斯塔尼營地"],
                npcs: [
                    { name: "巴倫·瓦伽斯", role: "鎮長", description: "堅持舉辦「快樂慶典」的瘋狂鎮長", alignment: "守序邪惡" },
                    { name: "菲歐娜·瓦赫特", role: "陰謀家", description: "想推翻鎮長的貴婦，實為魔鬼崇拜者" },
                    { name: "魯道夫·范·里希騰", role: "獵魔人", description: "傳奇吸血鬼獵人，可能是命定盟友之一", legendary: true },
                    { name: "烏蘇拉與達維安·馬提可夫", role: "旅店主人", description: "藍水旅店主人，秘密的鴉族成員" },
                    { name: "伊澤克·斯特拉茲尼", role: "惡棍", description: "鎮長的惡魔手臂護衛", cr: 5 }
                ],
                locations: [
                    { name: "瓦拉基鎮", description: "受保護的城鎮，由恐懼統治" },
                    { name: "藍水旅店", description: "鴉族秘密據點" },
                    { name: "聖安卓教堂", description: "隱藏聖者遺骨的可能地點" },
                    { name: "瓦加斯莊園", description: "鎮長府邸" },
                    { name: "維斯塔尼營地", description: "城鎮外的吉普賽營地" }
                ],
                encounters: ["鎮衛兵", "崇拜者惡棍", "伊澤克對決"],
                factions: ["鎮長勢力", "瓦赫特夫人勢力", "鴉族"],
                treasures: ["聖者遺骨 (可能)", "范·里希騰的日記"],
                endCondition: "獲得至少一件聖物線索",
                opening_text: "瓦拉基鎮（Vallaki）是巴洛維亞唯一看起來還有生機的城鎮。高大的木樁圍牆阻擋著外界的恐懼，但城內的氣氛同樣壓抑。五彩斑斕的旗幟掛滿了每條街道，宣告著即將到來的「快樂慶典」。鎮民們臉上掛著勉強的笑容——或許是因為不笑會被關進監獄。藍水旅店的主人向你們招手，低聲說有重要的事情要告訴你們。與此同時，你們注意到一個戴著面具的陌生人正在遠處觀察著你們。"
            },
            {
                act: 4,
                title: "聖物收集",
                titleEn: "Gathering the Artifacts",
                levelRange: "6-8",
                objective: "收集太陽之劍、聖徽與古書",
                keyEvents: ["琥珀神殿探索", "銀龍亞岡維斯托特", "貝雷茲村的瘋女"],
                npcs: [
                    { name: "亞岡維斯托特", role: "銀龍", description: "被史特拉德困在琥珀神殿的古老銀龍", legendary: true },
                    { name: "卡山德拉·馮·扎羅維奇", role: "吸血鬼", description: "史特拉德的吸血鬼新娘之一" },
                    { name: "巴芭·莉莎加", role: "女巫", description: "沼澤女巫，極度危險", cr: 10 },
                    { name: "琥珀寺暗力", role: "誘惑", description: "被封印的邪惡力量，會嘗試交易" }
                ],
                locations: [
                    { name: "琥珀神殿", description: "古老的邪惡封印地" },
                    { name: "亞岡維斯的巢穴", description: "銀龍的冰封洞穴" },
                    { name: "貝雷茲村", description: "被女巫控制的諷刺村莊" },
                    { name: "凱茲峰修道院", description: "廢棄的聖地" }
                ],
                artifacts: [
                    { name: "太陽之劍", description: "發光長劍，對吸血鬼造成致命傷害" },
                    { name: "托姆斯聖徽", description: "強大的神聖符印" },
                    { name: "聖者遺骨", description: "古代聖人的遺骨" }
                ],
                encounters: ["琥珀魔像", "吸血鬼生成物", "女巫的稻草人", "暗力誘惑"],
                endCondition: "收集三件對抗史特拉德的聖物",
                opening_text: "塔羅卡的預言指引著你們穿越這片被詛咒的土地。三件聖物散落在巴洛維亞各處：傳說中的太陽之劍、強大的托姆斯聖徽，以及古老聖者的遺骨。每一件都被危險守護著，每一處都充滿了死亡的陷阱。此外，你們還必須找到那位命定的盟友——塔羅卡預言將與你們並肩作戰對抗史特拉德的人。時間緊迫，因為史特拉德的耐心正在消失，他對伊蕾娜的執念越來越強烈。"
            },
            {
                act: 5,
                title: "鴉閣城堡",
                titleEn: "Castle Ravenloft",
                levelRange: "9-10",
                objective: "闘入城堡，終結史特拉德的詛咒",
                keyEvents: ["塔提亞娜的真相", "克列斯達維奇棺材", "與史特拉德的最終對決"],
                npcs: [
                    { name: "史特拉德·馮·扎羅維奇", role: "最終Boss", description: "巴洛維亞的吸血鬼領主，數百年的統治者", cr: 15, legendary: true, tactics: "利用城堡地形、召喚狼群、控制天氣" },
                    { name: "拉希德", role: "管家", description: "史特拉德的忠誠吸血鬼僕人", cr: 8 },
                    { name: "西隆·貝爾維尤", role: "吸血鬼會計", description: "城堡的財務管理者", cr: 5 }
                ],
                locations: [
                    { name: "鴉閣城堡", description: "史特拉德的堡壘，巴洛維亞的核心" },
                    { name: "克列斯達維奇墓穴", description: "史特拉德棺材所在" },
                    { name: "心臟塔", description: "城堡的神秘能量來源" },
                    { name: "塔提亞娜之墓", description: "史特拉德初戀的安息處" }
                ],
                boss: { name: "史特拉德·馮·扎羅維奇", cr: 15, type: "吸血鬼領主", abilities: ["壁行", "迷魅", "再生", "變形"], weaknesses: ["太陽之劍", "聖物", "流水", "木樁"] },
                encounters: ["吸血鬼生成物", "女巫隨從", "行走盔甲", "幽靈守衛", "史特拉德本人"],
                treasures: ["史特拉德的寶藏", "凡戴爾條約古書", "鴉閣城堡所有權"],
                endCondition: "擊敗史特拉德，逃離巴洛維亞",
                opening_text: "鴉閣城堡（Castle Ravenloft）在閃電中若隱若現，彷彿一頭沉睡的巨獸。你們手中握有三件聖物，身旁站著命定的盟友。這是最後的決戰。城堡的大門緩緩打開，彷彿在邀請你們進入。空氣中傳來一陣悅耳卻令人不安的管風琴聲。「我等你們很久了，」史特拉德的聲音不知從何處傳來，「歡迎來到我的家，讓我們開始最後的遊戲吧。」城堡裡迴盪著不知是哭泣還是笑聲的怪異音響。塔提亞娜的故事將在今晚劃下句點，而你們的命運也將在此決定。"
            }
        ]
    },


    "tomb_of_annihilation": {
        id: "tomb_of_annihilation",
        title: "湮滅之墓",
        titleEn: "Tomb of Annihilation",
        levels: "1-11",
        startLevel: 3,
        synopsis: "死亡詛咒正在吞噬曾被復活者的靈魂。冒險者必須穿越危險的楚爾特叢林，找到隱藏在失落城市奧穆中的詛咒源頭——靈魂吞噬者。",
        setting: "楚爾特叢林",
        acts: [
            {
                act: 1,
                title: "尼安扎羅港",
                titleEn: "Port Nyanzaru",
                levelRange: "1-2",
                objective: "抵達楚爾特，準備叢林探險",
                keyEvents: ["恐龍賽跑", "商業親王情報", "招募嚮導", "裝備採購"],
                npcs: [
                    { name: "席德拉·娜特巴", role: "雇主", description: "委託調查死亡詛咒的富商，隱藏動機" },
                    { name: "阿贊卡", role: "嚮導選項", description: "經驗豐富的女獵人，價格合理", guide_type: "廉價穩健" },
                    { name: "伊庫·達拉巴", role: "嚮導選項", description: "前奴隸獵人，知道危險地區", guide_type: "昂貴專業" },
                    { name: "商業親王們", role: "城市領袖", description: "七位統治尼安扎羅港的富商" }
                ],
                locations: [
                    { name: "尼安扎羅港", description: "楚爾特唯一的文明城市" },
                    { name: "恐龍賽場", description: "舉行恐龍賽跑的競技場" },
                    { name: "商人區", description: "購買叢林裝備的地方" }
                ],
                encounters: ["城市社交", "恐龍賽跑（可參與）", "街頭小偷"],
                treasures: ["叢林裝備", "地圖情報"],
                endCondition: "獲得奧穆古城方位與必要裝備",
                opening_text: "傳送的暈眩感剛退去，熱帶獨有的濕熱空氣便撲面而來。你們站在尼安扎羅港（Port Nyanzaru）的碼頭上，眼前是一座色彩斑斕的城市。巨大的恐龍——是的，恐龍——正被用作駝獸，甚至在街道上進行賽跑比賽。然而，即便在這個充滿生機的地方，'死亡詛咒'的陰影依然籠罩。你們的任務是尋找這個詛咒的源頭，傳聞它位於叢林深處失落的奧穆城。一位名叫席德拉的商人向你們揮手，似乎對你們這些冒險者很感興趣。"
            },
            {
                act: 2,
                title: "叢林深處",
                titleEn: "The Jungles of Chult",
                levelRange: "3-5",
                objective: "穿越危險叢林，尋找失落的奧穆城",
                keyEvents: ["六邊形探索", "不死生物叢林", "心火神殿", "弗拉斯荷達女妖"],
                npcs: [
                    { name: "嚮導（選擇的）", role: "同伴", description: "根據前一章選擇的嚮導" },
                    { name: "阿蒂斯·弗雷瓦蘭", role: "迷失者", description: "瘋狂的精靈巫師，知道奧穆位置", cr: 7 },
                    { name: "弗拉斯·荷達", role: "女妖領主", description: "統治不死軍團的強大女妖", cr: 12, enemy: true }
                ],
                locations: [
                    { name: "楚爾特叢林", description: "充滿恐龍和危險的史前叢林" },
                    { name: "心火神殿", description: "可獲得祝福的火山神殿" },
                    { name: "姆波查營地", description: "叢林中的安全補給點" },
                    { name: "弗拉斯荷達領地", description: "不死生物遊蕩的恐怖區域" }
                ],
                hex_exploration: true,
                encounters: ["恐龍群 (隨機)", "殭屍霸王龍", "巨型昆蟲", "不死軍團", "地精部落"],
                hazards: ["疾病", "毒蛇", "熱浪", "暴雨"],
                treasures: ["古代遺跡文物", "心火祝福"],
                endCondition: "發現奧穆古城入口",
                opening_text: "叢林比任何故事都更加兇險。樹冠遮蔽了天空，空氣潮濕得令人窒息。你們的嚮導警告說，這裡有恐龍、有不死生物、還有比這些更可怕的東西。每走一步都可能是陷阱，每一個聲音都可能是死亡的預告。你們的地圖只標記了大致的方向，具體的路線需要自己探索。在遠方的山脈盡頭，傳說中的奧穆城正等待著⋯"
            },
            {
                act: 3,
                title: "失落的奧穆",
                titleEn: "City of Omu",
                levelRange: "5-7",
                objective: "收集九宮之神神殿的方塊",
                keyEvents: ["九座神殿試煉", "元素人追擊", "蛇人袁提族", "拉斯·西的巢穴"],
                npcs: [
                    { name: "袁提族純血者", role: "敵人", description: "蛇人間諜，偽裝成人類" },
                    { name: "袁提族憎惡者", role: "Boss", description: "強大的蛇人戰士", cr: 7 },
                    { name: "拉斯·西", role: "紅巫師領袖", description: "也在尋找墓穴的塞爾法師", cr: 9 },
                    { name: "九宮之神", role: "神話生物", description: "被封印在方塊中的背叛者" }
                ],
                locations: [
                    { name: "奧穆古城", description: "被叢林吞噬的失落城市" },
                    { name: "九座神殿", description: "每座供奉一位背叛之神" },
                    { name: "袁提族巢穴", description: "蛇人的地下居所" },
                    { name: "紅巫師營地", description: "拉斯·西的據點" }
                ],
                puzzle_cubes: 9,
                encounters: ["袁提純血者 (偽裝)", "袁提憎惡者", "神殿守護者", "紅巫師部隊"],
                treasures: ["九宮方塊 x9", "神殿寶物"],
                endCondition: "收集九枚方塊，開啟墓穴",
                opening_text: "奧穆城（Omu）曾是楚爾特的首都，如今只剩下被藤蔓纏繞的廢墟。九座神殿散佈在城市各處，每一座都供奉著一位「九宮之神」——那些背叛了原主並被囚禁的邪惡實體。你們需要進入每一座神殿，通過試煉，獲取方塊。但你們不是唯一的尋寶者——袁提族（蛇人）已經佔據了這座城市，而一隊塞爾的紅巫師也在覬覦墓穴的力量。"
            },
            {
                act: 4,
                title: "蛇人深淵",
                titleEn: "Fane of the Night Serpent",
                levelRange: "7-8",
                objective: "滲透或對抗袁提族的神殿巢穴",
                keyEvents: ["地下神殿滲透", "蛇神顯現", "方塊爭奪", "逃離或征服"],
                npcs: [
                    { name: "芙恩瑞姆", role: "袁提族女王", description: "統治袁提族的強大惡魔", cr: 10 },
                    { name: "拉斯·尼西", role: "蛇神化身", description: "騙神的顯現", legendary: true }
                ],
                locations: [
                    { name: "夜蛇神殿", description: "袁提族的地下聖殿" },
                    { name: "獻祭室", description: "活人獻祭的恐怖場所" },
                    { name: "女王寶座", description: "芙恩瑞姆的權力中心" }
                ],
                encounters: ["袁提族衛兵", "蛇妖", "受控巨蛇", "芙恩瑞姆對決"],
                treasures: ["失落的方塊", "蛇神遺物"],
                endCondition: "獲得全部方塊，準備進入墓穴",
                opening_text: "最後幾枚方塊在袁提族手中。他們的神殿——夜蛇神殿——隱藏在奧穆城的地底深處。這是蛇人的核心據點，充滿了陷阱、守衛，以及更可怕的存在。滲透需要智慧與狡詐，正面進攻則需要極大的勇氣。無論選擇哪條路，這都將是進入墓穴前的最後一個障礙。"
            },
            {
                act: 5,
                title: "九神之墓",
                titleEn: "Tomb of the Nine Gods",
                levelRange: "9-10",
                objective: "探索阿塞瑞拉克的致命迷宮",
                keyEvents: ["死亡陷阱長廊", "九神試煉", "靈吸怪實驗室", "瓦爾因德拉對決"],
                npcs: [
                    { name: "瓦爾因德拉·陰影蔓", role: "墓穴守護", description: "阿塞瑞拉克的吸血鬼副手", cr: 12 },
                    { name: "靈吸怪", role: "實驗生物", description: "被困在墓穴中的心靈掠食者" },
                    { name: "九宮之神", role: "囚犯", description: "可能成為同伴的背叛之神" }
                ],
                locations: [
                    { name: "入口層", description: "充滿陷阱的迷宮" },
                    { name: "神殿層", description: "九宮之神的囚禁之所" },
                    { name: "靈吸怪巢穴", description: "恐怖的實驗區" },
                    { name: "核心層", description: "通往靈魂吞噬者的道路" }
                ],
                traps: ["萬刃走廊", "毒氣室", "傳送陷阱", "即死謎題"],
                encounters: ["墓穴守衛", "九神化身", "靈吸怪群", "瓦爾因德拉"],
                treasures: ["墓穴寶藏", "九神恩賜"],
                endCondition: "抵達靈魂吞噬者機器所在",
                opening_text: "九枚方塊發出共鳴，墓穴的大門緩緩開啟。這是阿塞瑞拉克的傑作——一座專為殺死冒險者而設計的終極迷宮。每一個房間都是陷阱，每一個走廊都是謎題。傳說進入這座墓穴的人，沒有一個走出來過。但你們沒有選擇，因為死亡詛咒的源頭就在最深處，數以萬計的靈魂正在被緩慢吞噬。"
            },
            {
                act: 6,
                title: "靈魂吞噬者",
                titleEn: "The Soulmonger",
                levelRange: "10-11",
                objective: "摧毀靈魂吞噬者，終結死亡詛咒",
                keyEvents: ["阿塔特羅帕胎兒", "機器核心", "阿塞瑞拉克現身", "時間賽跑"],
                npcs: [
                    { name: "阿塔特羅帕", role: "畸形神胎", description: "靈魂吞噬者的核心，正在孕育的死神", cr: 15 },
                    { name: "阿塞瑞拉克", role: "最終Boss", description: "創造靈魂吞噬者的半巫妖大法師", cr: 23, legendary: true }
                ],
                locations: [
                    { name: "靈魂吞噬者機器", description: "正在吞噬靈魂的巨大裝置" },
                    { name: "阿塔特羅帕搖籃", description: "死神胎兒的孕育處" }
                ],
                boss: { name: "阿塞瑞拉克", cr: 23, type: "半巫妖", abilities: ["時間停止", "願望術", "死亡一指"], tactics: "如果冒險者過於強大，他會選擇撤退", weakness: "可能不會全力對決" },
                encounters: ["阿塔特羅帕", "阿塞瑞拉克（可能）"],
                treasures: [
                    { name: "被困靈魂釋放", type: "任務獎勵", description: "結束死亡詛咒" },
                    { name: "墓穴寶藏", type: "財富", description: "數千年的累積" }
                ],
                endCondition: "摧毀機器，擊敗或逃離阿塞瑞拉克，結束詛咒",
                opening_text: "機器的脈動聲在整個房間迴盪，如同一顆邪惡的心臟。靈魂吞噬者——一個由骨骼與黑鐵構成的巨大裝置——正在不停地工作，吞噬著從世界各地流入的靈魂能量。在機器的中心，一個畸形的胎兒正在成長，它的眼睛已經睜開，凝視著你們。這是阿塔特羅帕，一個正在孕育的死神。而在陰影中，創造這一切的阿塞瑞拉克正在微笑。「終於有訪客了，」半巫妖的聲音如同墓穴中的回聲，「讓我看看你們值不值得我親自動手。」"
            }
        ]
    },


    "out_of_the_abyss": {
        id: "out_of_the_abyss",
        title: "逃離深淵",
        titleEn: "Out of the Abyss",
        levels: "1-15",
        startLevel: 3,
        synopsis: "卓爾精靈的俘虜逃入幽暗地域，卻發現深淵惡魔領主正在入侵這個地下世界。最終任務是挑起惡魔大戰，將他們逐回深淵。",
        setting: "幽暗地域",
        acts: [
            {
                act: 1,
                title: "囚徒",
                titleEn: "Prisoners of the Drow",
                levelRange: "1-3",
                objective: "從卓爾精靈監獄逃脫",
                keyEvents: ["維爾金維夫監獄", "NPC囚犯同盟", "獄卒腐敗", "伊薇拉追擊"],
                npcs: [
                    { name: "伊薇拉·米佐蕾", role: "追擊者", description: "維爾金維夫的卓爾女祭司，會持續追擊", cr: 8, enemy: true },
                    { name: "巴弗", role: "同伴選項", description: "友善的惡魔（夸西特），可成為間諜", companion: true },
                    { name: "黛瑞斯", role: "同伴選項", description: "卓爾精靈叛徒，知道地下道路", companion: true },
                    { name: "吉米特", role: "同伴選項", description: "深地侏儒逃犯，機智幽默", companion: true },
                    { name: "史圖吉", role: "同伴選項", description: "菌人牧師，神秘的蕈類生物", companion: true },
                    { name: "頂針閃電", role: "同伴選項", description: "深地侏儒瘋子，自稱國王", companion: true, quirk: "瘋狂" }
                ],
                locations: [
                    { name: "維爾金維夫", description: "卓爾精靈的前哨監獄" },
                    { name: "囚犯洞穴", description: "天然地牢" }
                ],
                encounters: ["卓爾獄卒", "巡邏衛士", "追擊部隊"],
                treasures: ["奪回的裝備", "獄卒物資"],
                madness_mechanic: true,
                endCondition: "成功越獄，進入幽暗地域",
                opening_text: "第一感覺是冰冷與堅硬的地面，接著是沈重的鐐銬聲。你們醒來時，發現自己被剝奪了所有裝備，關押在一個天然的地下洞穴牢房中。四周是無盡的幽暗地域（Underdark）。你們是卓爾精靈（Drow）的俘虜，註定要被運往魔索布萊城充當奴隸。在這個擠滿了各式各樣囚犯——矮人、地底侏儒、甚至一隻會說話的菌人——的牢籠裡，卓爾女祭司伊薇拉正在巡視。趁著警衛換班的空檔，這是你們唯一逃脫的機會。"
            },
            {
                act: 2,
                title: "黑暗漂流",
                titleEn: "Into Darkness",
                levelRange: "3-5",
                objective: "在幽暗地域中求生，尋找通往地表的道路",
                keyEvents: ["灰矮人城市格拉克斯圖", "狂暴深淵污染", "惡魔領主目擊", "瘋狂蔓延"],
                npcs: [
                    { name: "狄摩高根", role: "惡魔領主", description: "雙頭深淵王子，第一個目擊的惡魔領主", cr: 26, legendary: true, behavior: "破壞一切" },
                    { name: "錯誤之鉤", role: "灰矮人商人", description: "格拉克斯圖的交易者" },
                    { name: "追擊的卓爾", role: "敵人", description: "伊薇拉的部隊持續追蹤" }
                ],
                locations: [
                    { name: "幽暗地域", description: "廣闘的地下世界" },
                    { name: "格拉克斯圖", description: "灰矮人的貿易城市" },
                    { name: "黑暗湖", description: "可能遭遇惡魔的危險水域" }
                ],
                encounters: ["地下生態", "卓爾追兵", "惡魔污染生物", "狄摩高根現身"],
                hazards: ["飢餓", "疲勞", "瘋狂值累積", "資源匱乏"],
                endCondition: "抵達布林根斯通，找到上升路徑",
                opening_text: "逃出監獄只是開始。幽暗地域是一個黑暗無邊的世界，每一條隧道都可能通往死亡。你們的囚犯同伴提供了各種建議——布林根斯通是最近的安全城市，但路途遙遠且危險。更糟糕的是，追擊的卓爾不會輕易放棄。而在每一個角落，你們都感受到一股不祥的氣息。幽暗地域正在發生什麼可怕的事情。"
            },
            {
                act: 3,
                title: "重返光明",
                titleEn: "Return to the Light",
                levelRange: "6-7",
                objective: "抵達地表，向當局報告深淵入侵",
                keyEvents: ["銀月城警告", "哈珀斯與贊塔林", "惡魔領主資料蒐集", "盟友招募"],
                npcs: [
                    { name: "阿魯絲特拉·銀手", role: "領袖", description: "銀月城的女領主，組織對抗惡魔", legendary: true },
                    { name: "范·里希騰博士", role: "學者", description: "對惡魔有研究的專家" },
                    { name: "哈珀斯代表", role: "盟友", description: "秘密組織的成員" }
                ],
                locations: [
                    { name: "蓋茵達林", description: "地表出口" },
                    { name: "銀月城", description: "北方最重要的城市" }
                ],
                encounters: ["城市社交", "情報蒐集", "準備任務"],
                treasures: ["裝備升級", "任務物資", "盟軍支援"],
                endCondition: "獲得返回幽暗地域的任務",
                opening_text: "陽光從未如此美好。經過無盡的黑暗，地表的光芒讓你們幾乎失明。但慶祝的時間很短——你們帶回的消息震驚了所有人。惡魔領主正在入侵幽暗地域，如果不加阻止，他們將蔓延到地表世界。銀月城的女領主阿魯絲特拉召見了你們，她的表情異常嚴肅。「這不是一般的惡魔入侵，」她說，「深淵本身正在滲透進來。我們需要你們回去。」"
            },
            {
                act: 4,
                title: "再入深淵",
                titleEn: "Descending Again",
                levelRange: "8-11",
                objective: "帶著武器與盟友重返，收集對付惡魔領主的材料",
                keyEvents: ["灰矮人的抵抗", "菌人索維尼特", "靈吸怪城市蒐集", "慶格瑞姆對付"],
                npcs: [
                    { name: "慶格瑞姆", role: "惡魔領主", description: "層層統治的惡魔王子", cr: 23, legendary: true },
                    { name: "祖格莫伊", role: "惡魔領主", description: "菌人女王，腐敗的發源", cr: 23, legendary: true },
                    { name: "菌人王", role: "受害者", description: "被祖格莫伊控制的菌人領袖" }
                ],
                locations: [
                    { name: "尼維爾希姆", description: "菌人的王國" },
                    { name: "靈吸怪巢穴", description: "可獲得儀式情報的地方" },
                    { name: "灰矮人廢墟", description: "慶格瑞姆肆虐的地區" }
                ],
                encounters: ["惡魔大軍", "受控菌人", "靈吸怪", "各惡魔領主遭遇"],
                treasures: ["儀式組件", "惡魔弱點情報"],
                endCondition: "獲得讓惡魔領主自相殘殺的儀式",
                opening_text: "這一次，你們帶著武器、物資，還有盟軍的支持重返幽暗地域。地下世界比你們離開時更加混亂——惡魔領主們各自佔據了一片區域，他們的戰爭正在摧毀一切。但這也是機會。如果能收集到正確的材料，進行古老的儀式，就有可能讓這些惡魔領主互相殘殺，然後將倖存者驅逐回深淵。儀式需要來自每一個惡魔領主領地的關鍵物品。這將是最危險的任務。"
            },
            {
                act: 5,
                title: "惡魔大戰",
                titleEn: "The Demon Lords' War",
                levelRange: "12-14",
                objective: "在門佐貝拉贊進行儀式，讓惡魔領主互殘",
                keyEvents: ["卓爾內戰利用", "狄摩高根召喚", "惡魔領主決鬥", "存活者驅逐"],
                npcs: [
                    { name: "狄摩高根", role: "最終威脅", description: "雙頭王子，最強的惡魔領主", cr: 26, legendary: true },
                    { name: "奧克斯·葛羅姆夫", role: "卓爾領主", description: "門佐貝拉贊的統治者之一" },
                    { name: "各惡魔領主", role: "敵人", description: "被儀式吸引的惡魔領主們" }
                ],
                locations: [
                    { name: "門佐貝拉贊", description: "卓爾精靈的首都" },
                    { name: "儀式場所", description: "進行最終儀式的地點" }
                ],
                boss: { name: "狄摩高根", cr: 26, type: "惡魔領主", abilities: ["雙重行動", "瘋狂光環", "意志粉碎"], tactics: "讓惡魔領主互殺後對付削弱的倖存者" },
                encounters: ["惡魔大軍", "卓爾守軍", "惡魔領主大戰"],
                endCondition: "倖存的惡魔領主被削弱並驅逐",
                opening_text: "門佐貝拉贊——卓爾精靈的禁城——此刻正陷入混亂。惡魔入侵打破了卓爾社會的平衡，各家族互相廝殺，同時還要抵抗惡魔。這正是進行儀式的完美時機。當你們開始吟唱古老的驅逐咒語時，天空——或者說洞頂——開始震顚。一個接一個，惡魔領主被召喚到這個地點，被迫面對彼此。慶格瑞姆對上了祖格莫伊，奧庫斯對上了葛拉茲特⋯而最後，狄摩高根，那個雙頭王子，踏入了戰場。"
            },
            {
                act: 6,
                title: "深淵餘燼",
                titleEn: "Aftermath of the Abyss",
                levelRange: "14-15",
                objective: "清除殘餘威脅，確保深淵封印",
                keyEvents: ["殘餘惡魔清剿", "幽暗地域重建", "盟友命運", "最終封印"],
                npcs: [
                    { name: "倖存的同伴", role: "盟友", description: "一路走來的NPC們的結局" },
                    { name: "阿魯絲特拉·銀手", role: "獎賞者", description: "代表地表世界感謝英雄" }
                ],
                locations: [
                    { name: "戰場殘骸", description: "惡魔大戰後的廢墟" },
                    { name: "深淵裂隙", description: "需要封印的入口" }
                ],
                encounters: ["殘餘惡魔", "最終封印儀式"],
                treasures: [
                    { name: "惡魔領主遺物", type: "神器", description: "從戰場中獲取" },
                    { name: "英雄頭銜", type: "獎勵", description: "深淵守護者之名" }
                ],
                endCondition: "幽暗地域暫時恢復和平",
                opening_text: "戰爭結束了。惡魔領主們——或是被彼此消滅，或是被驅逐回深淵。門佐貝拉贊的廢墟在緩慢重建，灰矮人、深地侏儒、甚至一些卓爾精靈開始尋求新的平衡。你們的旅程從監獄的鏈銬開始，經歷了無盡的黑暗、瘋狂的邊緣，以及惡魔領主的恐怖。現在，終於結束了。一路上的同伴們——無論是友好的菌人史圖吉，還是瘋狂的頂針閃電——都有了他們各自的結局。而你們，深淵的征服者，將永遠被銘記。"
            }
        ]
    },


    "storm_kings_thunder": {
        id: "storm_kings_thunder",
        title: "風暴君王之雷霆",
        titleEn: "Storm King's Thunder",
        levels: "1-11",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "巨人襲擊",
                titleEn: "A Great Upheaval",
                levelRange: "1-5",
                objective: "親眼見證巨人對人類城鎮的襲擊",
                keyEvents: ["夜石鎮陷落", "哥布林入侵", "七蛇丘調查"],
                endCondition: "發現巨人階級制度崩潰",
                opening_text: "這原本只是一個簡單的送信任務，但當你們抵達夜石鎮（Nightstone）時，迎接你們的卻是一片死寂。城鎮的大門敞開，原本宏偉的防禦鐘樓如今只剩下一堆碎石，彷彿被某種巨大的力量從天而降砸毀。街道上空無一人，只有遠處傳來哥布林尖銳的竊笑聲與劫掠的聲音。居民們似乎都逃走了，留下一座空城與等待被解開的謎團。那個巨大的坑洞中，一塊黑色的方尖碑正散發著不安的氣息。"
            },
            {
                act: 2,
                title: "生存廢墟",
                titleEn: "Rune of the Storm",
                objective: "在巨人肆虐的北地生存並收集情報",
                keyEvents: ["崔波爾巨人襲擊", "雅爾塔巨人港", "哈珀斯情報網"],
                endCondition: "得知風暴巨人國王失蹤"
            },
            {
                act: 3,
                title: "神諭之眼",
                titleEn: "The Eye of the All-Father",
                objective: "尋找神諭獲得恢復秩序的方法",
                keyEvents: ["冰雪神殿探索", "赫卡頓殘影", "伊米爾詛咒"],
                endCondition: "獲得擊敗各派巨人領主的線索"
            },
            {
                act: 4,
                title: "巨人據點",
                titleEn: "Clash of the Titans",
                objective: "潛入巨人領主據點，削弱他們的力量",
                keyEvents: ["山丘巨人格魯德", "冰霜巨人斯托瓦德", "火焰巨人扎爾托"],
                endCondition: "獲得風暴巨人信任或擊敗威脅"
            },
            {
                act: 5,
                title: "風暴王庭",
                titleEn: "Storm King's Court",
                objective: "解救風暴巨人王，恢復巨人階級秩序",
                keyEvents: ["海洋王庭梅爾斯卓姆", "海妖斯拉克霍斯陰謀", "赫卡頓國王歸位"],
                endCondition: "巨人王回歸，秩序恢復"
            }
        ]
    },

    "descent_into_avernus": {
        id: "descent_into_avernus",
        title: "墜入阿佛納斯",
        titleEn: "Descent into Avernus",
        levels: "1-13",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "博德之門",
                titleEn: "A Tale of Two Cities",
                levelRange: "1-4",
                objective: "調查艾爾托瑞爾消失事件",
                keyEvents: ["火拳傭兵任務", "死亡三冠邪教", "地獄契約發現"],
                endCondition: "發現艾爾托瑞爾被拖入地獄",
                opening_text: "博德之門（Baldur's Gate），這座罪惡之都正陷入前所未有的恐慌。鄰近的聖城艾爾托瑞爾（Elturel）在一夜之間憑空消失，成千上萬的難民湧入城門。為了維持秩序，鐵王座的傭兵團'火拳'封鎖了城市，並強行徵召冒險者協助調查。你們被帶到了火拳指揮官佐奇面前，他懷疑這一切與崇拜死亡三神的邪教有關。如果不盡快查明真相，博德之門恐怕將是下一個消失的城市。"
            },
            {
                act: 2,
                title: "地獄入口",
                titleEn: "Through the Gate",
                objective: "進入阿佛納斯，尋找墜落之城",
                keyEvents: ["艾爾托瑞爾鏈鎖", "高天使盧迪斯", "地獄荒原初探"],
                endCondition: "進入阿佛納斯平原"
            },
            {
                act: 3,
                title: "血戰荒原",
                titleEn: "Avernus",
                objective: "駕駛地獄戰車，蒐集拯救城市的資訊",
                keyEvents: ["瘋乖求死者", "戰車升級改裝", "惡魔與魔鬼領地"],
                endCondition: "獲得扎瑞爾大天使墮落線索"
            },
            {
                act: 4,
                title: "救贖之路",
                titleEn: "Path to Redemption",
                objective: "尋找能讓扎瑞爾回心轉意的聖物",
                keyEvents: ["聖劍殘片", "盧迪斯的記憶", "扎瑞爾真實過去"],
                endCondition: "收集扎瑞爾救贖或毀滅的關鍵"
            },
            {
                act: 5,
                title: "扎瑞爾之塔",
                titleEn: "Zariel's Fall",
                objective: "面對墮落大天使，決定城市命運",
                keyEvents: ["魔鬼契約談判", "救贖或毀滅抉擇", "艾爾托瑞爾釋放"],
                endCondition: "拯救或毀滅艾爾托瑞爾"
            }
        ]
    },

    "rime_of_frostmaiden": {
        id: "rime_of_frostmaiden",
        title: "冰霜少女的憤怒",
        titleEn: "Rime of the Frostmaiden",
        levels: "1-12",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "永夜十鎮",
                titleEn: "Ten-Towns",
                levelRange: "1-4",
                objective: "在永夜籠罩的十鎮中調查異常事件",
                keyEvents: ["人祭傳統", "連環殺手追蹤", "凍湖怪物"],
                endCondition: "發現歐呂爾女神是永夜源頭",
                opening_text: "冰風之谷（Icewind Dale）已經兩年沒有見過太陽了。被稱為'冰霜少女'的歐呂爾女神降下了無盡的寒冬與永夜，將這片土地封鎖在冰雪之中。你們來到了十鎮之一的布林山德（Bryn Shander），刺骨的寒風如刀割般掠過。鎮民們竊竊私語，討論著即將到來的人祭儀式——為了平息女神的憤怒，他們必須獻上祭品。然而，除了寒冷，一種更深層的恐懼正在蔓延：連環殺手在黑暗中潛伏，湖底的怪物蠢蠢欲動。這是一個關於生存的故事。"
            },
            {
                act: 2,
                title: "冰原探索",
                titleEn: "Frozen Wilderness",
                objective: "探索冰風之谷的秘密與危險",
                keyEvents: ["冰霜巨人遺跡", "覺醒族亡靈", "凍原德魯伊"],
                endCondition: "得知灰矮人要塞位置"
            },
            {
                act: 3,
                title: "毀滅之光",
                titleEn: "Sunblight",
                objective: "阻止灰矮人啟動毀滅性武器",
                keyEvents: ["森布萊特要塞滲透", "查達克復仇計畫", "毀滅巨像追逐"],
                endCondition: "阻止（或未能阻止）巨像"
            },
            {
                act: 4,
                title: "冰川墓穴",
                titleEn: "Glacial Rift",
                objective: "尋找結束永夜的古代耐色瑞爾科技",
                keyEvents: ["冰川城市入口", "星界飛艇碎片", "時空裂縫"],
                endCondition: "發現浮空城遺跡位置"
            },
            {
                act: 5,
                title: "耐色瑞爾遺跡",
                titleEn: "Ythryn",
                objective: "進入墜落的浮空城，對抗冰霜女神",
                keyEvents: ["巫妖長老", "歐呂爾的挑戰", "解除永夜術式"],
                endCondition: "結束永夜，解放冰風之谷"
            }
        ]
    },

    "dragon_heist": {
        id: "dragon_heist",
        title: "深水城：龍之劫",
        titleEn: "Waterdeep: Dragon Heist",
        levels: "1-5",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "巨魔顱莊園",
                titleEn: "A Friend in Need",
                levelRange: "1-2",
                objective: "獲得酒館作為冒險據點",
                keyEvents: ["酒吧鬥毆救人", "沃洛贈送酒館", "莊園翻新"],
                endCondition: "獲得巨魔顱莊園所有權",
                opening_text: "這裡是深水城（Waterdeep），費倫大陸皇冠上的寶石。你們正坐在著名的'哈欠門酒館'（Yawning Portal）裡，這裡以那個通往地底迷宮的巨大天井聞名。著名作家沃洛（Volo）正熱情地向你們講述他的新書，並請求你們幫忙尋找他失蹤的朋友——弗恩。突然，一場酒吧鬥毆打斷了談話，一個巨大的食人魔從天井中爬了出來，身上掛著被吸血後的傷痕。歡迎來到深水城，這裡的機遇與危險一樣多。"
            },
            {
                act: 2,
                title: "火球術事件",
                titleEn: "Fireball",
                objective: "調查在酒館外發生的爆炸案",
                keyEvents: ["格諾姆爆炸", "石頭隱藏", "尼姆布萊特遺志"],
                endCondition: "發現格羅爾之石與寶藏線索"
            },
            {
                act: 3,
                title: "派系追逐",
                titleEn: "Faction Scramble",
                objective: "與四大勢力競爭格羅爾之石",
                keyEvents: ["黑網接觸", "贊塔林追蹤", "假面領主情報"],
                endCondition: "獲得石頭位置或被搶先"
            },
            {
                act: 4,
                title: "寶藏地窖",
                titleEn: "The Vault",
                objective: "搶先抵達寶藏地點，對抗主要反派",
                keyEvents: ["季節反派對決", "五十萬金龍幣", "假面領主介入"],
                endCondition: "獲得（或失去）寶藏"
            }
        ]
    },

    "princes_of_apocalypse": {
        id: "princes_of_apocalypse",
        title: "元素邪惡之王子",
        titleEn: "Princes of the Apocalypse",
        levels: "1-15",
        acts: [
            {
                act: 1,
                title: "失蹤調查",
                titleEn: "Missing Delegation",
                levelRange: "1-3",
                objective: "調查深水城代表團失蹤事件",
                keyEvents: ["紅拉奇鎮情報", "地表據點發現", "元素教徒襲擊"],
                endCondition: "發現四個元素邪教據點",
                opening_text: "紅拉奇鎮（Red Larch）是一個位於薩姆佈雷爾山的寧靜小鎮，但最近卻怪事頻傳。深水城派出的一支重要外交代表團在附近神秘失蹤，沒有留下任何痕跡。同時，奇怪的天氣現象——異常的狂風、地震與山火频繁發生。鎮長請求你們展開調查。在你們與鎮民交談時，一個驚恐的農夫衝進酒館，大喊著'會動的石頭'正在襲擊他的農場。這不僅僅是失蹤案，大地的力量似乎正在覺醒。"
            },
            {
                act: 2,
                title: "四處前哨",
                titleEn: "Four Keeps",
                objective: "清除元素邪教的地表前哨",
                keyEvents: ["羽門城堡（氣）", "石河修道院（土）", "緋紅之心（火）", "水之谷莊園（水）"],
                endCondition: "開闘通往地下神殿的通道"
            },
            {
                act: 3,
                title: "元素神殿",
                titleEn: "Temples of Elemental Evil",
                objective: "深入地下擊敗各元素先知",
                keyEvents: ["咆嘯之穴", "黑土神殿", "熾焰地牢", "溺水公館"],
                endCondition: "擊敗四位元素先知"
            },
            {
                act: 4,
                title: "元素節點",
                titleEn: "Elemental Nodes",
                objective: "關閉通往元素位面的傳送門",
                keyEvents: ["元素親王威脅", "節點儀式破壞", "最終淨化"],
                endCondition: "關閉所有元素通道，拯救世界"
            }
        ]
    },

    "shadow_dragon_queen": {
        id: "shadow_dragon_queen",
        title: "龍后之影",
        titleEn: "Shadow of the Dragon Queen",
        levels: "1-11",
        acts: [
            {
                act: 1,
                title: "暴風先兆",
                titleEn: "Storm's Approach",
                levelRange: "1-3",
                objective: "見證紅龍軍團入侵前兆",
                keyEvents: ["沃格勒村災禍", "龍人斥候", "卡拉曼徵召"],
                endCondition: "加入卡拉曼防禦軍",
                opening_text: "克萊恩世界（Krynn）已經平靜了數百年，直到今天。你們受邀來到偏遠的沃格勒村（Vogler）參加一年一度的翠鳥節，這是一場為了紀念戰勝水怪艾琳娜而舉辦的慶典，也是為了紀念一位剛過世的老朋友。村莊裡洋溢著歡樂的氣氛，但在這歡笑背後，遠方森林中傳來了不祥的行軍聲。龍騎兵的影子在樹梢間閃過，傳說中的紅龍軍團並非神話。當第一支燃燒的箭矢射入村莊廣場，慶典變成了戰場。"
            },
            {
                act: 2,
                title: "戰爭迷霧",
                titleEn: "Shadow of War",
                objective: "作為軍隊一員參與對抗龍軍",
                keyEvents: ["心堡城塔防禦", "野營保衛戰", "暗之女王信息"],
                endCondition: "發現敵軍飛行堡壘"
            },
            {
                act: 3,
                title: "城市圍城",
                titleEn: "City Under Siege",
                objective: "在卡拉曼圍城戰中尋找破局之法",
                keyEvents: ["地下逃亡通道", "叛徒揭露", "龍騎士計畫"],
                endCondition: "獲得突破圍城的方法"
            },
            {
                act: 4,
                title: "飛行堡壘",
                titleEn: "Sky Citadel",
                objective: "潛入並摧毀龍軍的空中要塞",
                keyEvents: ["龍背滲透", "堡壘核心", "對決軍團將領"],
                endCondition: "摧毀飛行堡壘，解卡拉曼之圍"
            }
        ]
    }
};

export default MODULES_PART1;
