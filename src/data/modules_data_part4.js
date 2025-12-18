/**
 * Module Plot Data - Part 4 (Enhanced Modules)
 * Princes of Apocalypse, Shadow of the Dragon Queen, Classic Modules
 */

export const MODULES_PART4 = {
    "princes_of_apocalypse_enhanced": {
        id: "princes_of_apocalypse",
        title: "元素邪惡之王子",
        titleEn: "Princes of the Apocalypse",
        levels: "1-15",
        startLevel: 3,
        synopsis: "四個元素邪教試圖召喚元素邪惡親王，將世界變成混沌的煉獄。冒險者必須深入地下神殿，阻止末日降臨。",
        setting: "劍灣地區（薩姆佈雷爾山）",
        acts: [
            {
                act: 1,
                title: "失蹤調查",
                titleEn: "Missing Delegation",
                levelRange: "1-3",
                objective: "調查深水城代表團失蹤事件",
                keyEvents: ["紅拉奇鎮情報", "地表據點發現", "元素教徒襲擊", "四元素邪教"],
                npcs: [
                    { name: "哈蒙恩・霍克", role: "失蹤者", description: "代表團領袖，被囚禁在地下" },
                    { name: "紅拉奇鎮長", role: "任務提供者", description: "請求調查的當地領袖" },
                    { name: "元素邪教斥候", role: "敵人", description: "在地表活動的邪教徒" }
                ],
                locations: [
                    { name: "紅拉奇鎮", description: "調查的起點，平靜的鄉村城鎮" },
                    { name: "石河修道院（地表）", description: "可疑的據點之一" },
                    { name: "羽門城堡（地表）", description: "可疑的據點之一" }
                ],
                encounters: ["會動的石頭", "邪教斥候", "元素生物"],
                treasures: ["代表團線索", "元素符號"],
                endCondition: "發現四個元素邪教據點",
                opening_text: "紅拉奇鎮（Red Larch）是一個位於薩姆佈雷爾山的寧靜小鎮，但最近卻怪事頻傳。深水城派出的一支重要外交代表團在附近神秘失蹤，沒有留下任何痕跡。同時，奇怪的天氣現象——異常的狂風、地震與山火频繁發生。鎮長請求你們展開調查。在你們與鎮民交談時，一個驚恐的農夫衝進酒館，大喊著'會動的石頭'正在襲擊他的農場。這不僅僅是失蹤案，大地的力量似乎正在覺醒。"
            },
            {
                act: 2,
                title: "四處前哨",
                titleEn: "Four Keeps",
                levelRange: "3-6",
                objective: "清除元素邪教的地表前哨",
                keyEvents: ["羽門城堡（氣）", "石河修道院（土）", "緋紅之心（火）", "水之谷莊園（水）"],
                npcs: [
                    { name: "風之先知艾洛", role: "邪教首領", description: "統領氣之邪教的狂信者", cr: 7 },
                    { name: "土之先知馬洛斯", role: "邪教首領", description: "統領土之邪教的石人", cr: 7 },
                    { name: "火之先知凡林", role: "邪教首領", description: "統領火之邪教的狂熱者", cr: 7 },
                    { name: "水之先知嘉兒", role: "邪教首領", description: "統領水之邪教的溺水者", cr: 7 }
                ],
                locations: [
                    { name: "羽門城堡", description: "咆嘯邪教的氣之據點" },
                    { name: "石河修道院", description: "黑土邪教的土之據點" },
                    { name: "緋紅之心", description: "永焰邪教的火之據點" },
                    { name: "水之谷莊園", description: "毀滅浪潮邪教的水之據點" }
                ],
                four_elements: true,
                encounters: ["氣元素生物", "土元素生物", "火元素生物", "水元素生物"],
                treasures: ["元素武器", "邪教寶物"],
                endCondition: "開啟通往地下神殿的通道",
                opening_text: "四個元素邪教各自佔據了一座地表據點。羽門城堡被咆嘯邪教控制，狂風在塔樓間呼嘯；石河修道院是黑土邪教的巢穴，石像活了過來；緋紅之心是永焰邪教的火焰聖殿；水之谷莊園則被毀滅浪潮邪教淹沒。每一座據點都通往更深的地下神殿。選擇你們的目標，開始淨化這片土地吧。"
            },
            {
                act: 3,
                title: "元素神殿",
                titleEn: "Temples of Elemental Evil",
                levelRange: "6-10",
                objective: "深入地下擊敗各元素先知",
                keyEvents: ["咆嘯之穴", "黑土神殿", "熾焰地牢", "溺水公館", "先知對決"],
                npcs: [
                    { name: "風之先知艾洛（強化）", role: "神殿Boss", description: "在真正神殿中的先知", cr: 10 },
                    { name: "土之先知馬洛斯（強化）", role: "神殿Boss", description: "在真正神殿中的先知", cr: 10 },
                    { name: "火之先知凡林（強化）", role: "神殿Boss", description: "在真正神殿中的先知", cr: 10 },
                    { name: "水之先知嘉兒（強化）", role: "神殿Boss", description: "在真正神殿中的先知", cr: 10 }
                ],
                locations: [
                    { name: "咆嘯之穴", description: "氣元素神殿" },
                    { name: "黑土神殿", description: "土元素神殿" },
                    { name: "熾焰地牢", description: "火元素神殿" },
                    { name: "溺水公館", description: "水元素神殿" }
                ],
                encounters: ["元素精魄", "邪教護衛", "先知對決"],
                treasures: ["元素神器", "先知武器"],
                endCondition: "擊敗四位元素先知",
                opening_text: "地表據點只是冰山一角。真正的元素神殿深藏在地下，互相連接成一個巨大的迷宮。咆嘯之穴充滿了狂暴的風暴，黑土神殿是會移動的石頭迷宮，熾焰地牢燃燒著永恆之火，溺水公館則是無盡的水下噩夢。每一座神殿的深處，元素先知們正在進行召喚儀式。如果不阻止他們，元素親王將會降臨世間。"
            },
            {
                act: 4,
                title: "元素節點",
                titleEn: "Elemental Nodes",
                levelRange: "10-15",
                objective: "關閉通往元素位面的傳送門",
                keyEvents: ["元素親王威脅", "節點儀式破壞", "最終淨化", "元素混沌"],
                npcs: [
                    { name: "燕-C-賓", role: "氣元素親王", description: "絕對邪惡的氣元素王子", cr: 18, legendary: true },
                    { name: "歐格勒摩", role: "土元素親王", description: "絕對邪惡的土元素王子", cr: 18, legendary: true },
                    { name: "伊米克斯", role: "火元素親王", description: "絕對邪惡的火元素王子", cr: 18, legendary: true },
                    { name: "歐萊弗斯", role: "水元素親王", description: "絕對邪惡的水元素王子", cr: 18, legendary: true }
                ],
                locations: [
                    { name: "元素混沌之門", description: "四元素交匯之處" },
                    { name: "各元素節點", description: "通往元素位面的傳送門" }
                ],
                boss: { name: "元素親王（最強者）", cr: 18, type: "元素親王", abilities: ["位面力量", "元素風暴", "召喚軍團"], tactics: "根據冒險者削弱的元素決定最終敵人" },
                encounters: ["元素大軍", "親王顯現", "位面崩潰"],
                treasures: [
                    { name: "元素邪惡的終結", type: "成就", description: "拯救世界" },
                    { name: "元素遺物", type: "神器", description: "強大的元素武器" }
                ],
                endCondition: "關閉所有元素通道，拯救世界",
                opening_text: "先知們的死亡並沒有阻止召喚。元素節點已經開啟，通往四個元素邪惡位面的傳送門正在穩定化。如果不在親王們完全顯現之前關閉這些節點，克萊恩的物質世界將會被純粹的元素混沌撕裂。你們必須進入節點本身，在元素親王的老巢中破壞召喚儀式。這是終極的挑戰，成功則世界得救，失敗則一切歸於虛無。"
            }
        ]
    },

    "shadow_dragon_queen_enhanced": {
        id: "shadow_dragon_queen",
        title: "龍后之影",
        titleEn: "Shadow of the Dragon Queen",
        levels: "1-11",
        startLevel: 3,
        synopsis: "紅龍軍團入侵克萊恩。冒險者從無名之輩成長為戰爭英雄，最終潛入飛行堡壘摧毀敵軍。",
        setting: "克萊恩世界（索拉姆尼亞）",
        acts: [
            {
                act: 1,
                title: "暴風先兆",
                titleEn: "Storm's Approach",
                levelRange: "1-3",
                objective: "見證紅龍軍團入侵前兆",
                keyEvents: ["沃格勒村災禍", "龍人斥候", "卡拉曼徵召", "翠鳥節屠殺"],
                npcs: [
                    { name: "貝克特", role: "老兵", description: "沃格勒村的退休軍人，指導者" },
                    { name: "希莉", role: "商人", description: "村莊裡的朋友" },
                    { name: "龍人斥候", role: "敵人", description: "紅龍軍團的先頭部隊", cr: 2 }
                ],
                locations: [
                    { name: "沃格勒村", description: "被襲擊的偏遠村莊" },
                    { name: "翠鳥節廣場", description: "慶典轉為戰場" },
                    { name: "通往卡拉曼的道路", description: "逃離的路途" }
                ],
                encounters: ["龍人斥候", "村莊防禦戰", "逃離追兵"],
                treasures: ["倖存者感謝", "老兵遺贈"],
                endCondition: "加入卡拉曼防禦軍",
                opening_text: "克萊恩世界（Krynn）已經平靜了數百年，直到今天。你們受邀來到偏遠的沃格勒村（Vogler）參加一年一度的翠鳥節，這是一場為了紀念戰勝水怪艾琳娜而舉辦的慶典，也是為了紀念一位剛過世的老朋友。村莊裡洋溢著歡樂的氣氛，但在這歡笑背後，遠方森林中傳來了不祥的行軍聲。龍騎兵的影子在樹梢間閃過，傳說中的紅龍軍團並非神話。當第一支燃燒的箭矢射入村莊廣場，慶典變成了戰場。"
            },
            {
                act: 2,
                title: "戰爭迷霧",
                titleEn: "Shadow of War",
                levelRange: "3-5",
                objective: "作為軍隊一員參與對抗龍軍",
                keyEvents: ["心堡城塔防禦", "野營保衛戰", "暗之女王信息", "軍隊結盟"],
                npcs: [
                    { name: "貝克特（統帥）", role: "指揮官", description: "帶領抵抗的老將軍" },
                    { name: "索拉姆尼亞騎士", role: "盟友", description: "可能的騎士團援軍" },
                    { name: "紅龍軍團將領", role: "敵人", description: "指揮入侵的龍人將軍", cr: 8 }
                ],
                locations: [
                    { name: "心堡城塔", description: "防禦要塞" },
                    { name: "野營", description: "流動的軍隊駐地" },
                    { name: "戰場", description: "與龍軍交鋒之處" }
                ],
                war_mechanics: true,
                encounters: ["龍人軍隊", "龍騎兵空襲", "間諜揭露"],
                treasures: ["軍功勳章", "戰利品"],
                endCondition: "發現敵軍飛行堡壘",
                opening_text: "卡拉曼的軍隊正在集結，而你們已經成為其中的一員。紅龍軍團的進攻比任何人預想的都要兇猛——他們不只有龍人士兵，還有真正的龍。心堡城塔成為了抵抗的核心，但每一次勝利都伴隨著更大的損失。在一次偵察中，你們發現了敵人最可怕的秘密武器：一座飛行堡壘，正在天空中緩緩逼近。如果不摧毀它，卡拉曼將淪陷。"
            },
            {
                act: 3,
                title: "城市圍城",
                titleEn: "City Under Siege",
                levelRange: "5-8",
                objective: "在卡拉曼圍城戰中尋找破局之法",
                keyEvents: ["地下逃亡通道", "叛徒揭露", "龍騎士計畫", "突圍作戰"],
                npcs: [
                    { name: "叛徒（NPC）", role: "叛徒", description: "軍中的間諜，需要揭露" },
                    { name: "卡拉曼市長", role: "領袖", description: "圍城中的城市領袖" },
                    { name: "古老龍騎士遺產", role: "傳說", description: "可能的反擊力量" }
                ],
                locations: [
                    { name: "卡拉曼城", description: "被圍困的城市" },
                    { name: "地下通道", description: "可能的逃離路線" },
                    { name: "龍騎士廢墟", description: "可能的秘密武器所在" }
                ],
                encounters: ["城牆防禦", "間諜追蹤", "突圍戰鬥"],
                treasures: ["龍騎士遺物", "突圍物資"],
                endCondition: "獲得突破圍城的方法",
                opening_text: "卡拉曼被圍困了。城牆外是無盡的龍人軍隊，天空中是飛行堡壘的陰影。糧食日漸減少，士氣開始動搖。更糟糕的是，軍中似乎有間諜——重要的軍事情報不斷洩露。你們必須揭露叛徒，同時尋找一條出路。傳說中，古老的龍騎士曾經擁有對抗龍的力量⋯如果能找到他們的遺產，也許還有希望。"
            },
            {
                act: 4,
                title: "飛行堡壘",
                titleEn: "Sky Citadel",
                levelRange: "8-11",
                objective: "潛入並摧毀龍軍的空中要塞",
                keyEvents: ["龍背滲透", "堡壘核心", "對決軍團將領", "堡壘墜毀"],
                npcs: [
                    { name: "卡納斯", role: "飛行堡壘指揮官", description: "最強大的龍人將軍", cr: 12 },
                    { name: "暗之女王使者", role: "幕後黑手", description: "塔克西絲的代言人", cr: 15, legendary: true }
                ],
                locations: [
                    { name: "飛行堡壘外部", description: "需要龍背才能到達" },
                    { name: "堡壘內部", description: "龍軍的核心指揮部" },
                    { name: "動力核心", description: "摧毀堡壘的關鍵" }
                ],
                boss: { name: "卡納斯", cr: 12, type: "龍人將軍", abilities: ["龍息", "戰士技巧", "召喚龍人"], tactics: "指揮手下圍攻" },
                encounters: ["龍人精銳", "飛龍騎士", "卡納斯對決"],
                treasures: [
                    { name: "戰爭結束", type: "成就", description: "解除卡拉曼之圍" },
                    { name: "龍騎士傳承", type: "頭銜", description: "新一代的龍騎士" }
                ],
                endCondition: "摧毀飛行堡壘，解卡拉曼之圍",
                opening_text: "唯一的方法就是直搗黃龍。飛行堡壘懸浮在雲層之上，似乎無法觸及。但你們找到了方法——乘坐龍背，從天空進入這座要塞。這是一場有去無回的任務：潛入堡壘核心，摧毀動力源，讓這座鋼鐵巨獸墜落。卡納斯將軍正在等著你們，而暗之女王塔克西絲的意志籠罩著這一切。這是克萊恩世界的命運之戰。"
            }
        ]
    },

    "keep_on_borderlands_enhanced": {
        id: "keep_on_borderlands",
        title: "邊境要塞",
        titleEn: "Keep on the Borderlands",
        levels: "1-5",
        startLevel: 1,
        synopsis: "經典的老派冒險。冒險者在邊境要塞尋找工作，探索附近的混沌洞窟，清除各種怪物巢穴。",
        setting: "劍灣邊境（名字不詳的要塞）",
        acts: [
            {
                act: 1,
                title: "要塞抵達",
                titleEn: "Arriving at the Keep",
                levelRange: "1",
                objective: "在邊境要塞建立據點，蒐集情報",
                keyEvents: ["要塞探索", "商人與鐵匠", "混沌洞窟傳聞", "首次任務"],
                npcs: [
                    { name: "城主", role: "要塞領袖", description: "管理要塞的騎士" },
                    { name: "旅店老闆", role: "情報來源", description: "知道許多傳言" },
                    { name: "牧師", role: "治療者", description: "提供治療服務" }
                ],
                locations: [
                    { name: "邊境要塞", description: "文明世界的最後前哨" },
                    { name: "旅店", description: "冒險者聚集地" },
                    { name: "鐵匠鋪", description: "購買裝備" }
                ],
                encounters: ["社交探索", "小型任務"],
                treasures: ["初始裝備", "任務報酬"],
                endCondition: "獲得混沌洞窟的位置",
                opening_text: "你們經過數天的旅程，終於抵達了邊境要塞。這座石頭堡壘是文明世界在這片蠻荒邊境的最後據點。城牆高聳，守衛森嚴，但城內卻充滿了生機——商人叫賣著貨物，鐵匠的錘聲不絕於耳。然而，酒館裡的人們壓低聲音談論著'混沌洞窟'——那是一個據說居住著各種怪物的危險地點。對於尋求財富和榮耀的冒險者來說，那裡也許是個開始的好地方。"
            },
            {
                act: 2,
                title: "洞窟外圍",
                titleEn: "Caves of Chaos - Outer",
                levelRange: "1-2",
                objective: "探索混沌洞窟的外圍洞穴",
                keyEvents: ["哥布林洞穴", "獸人巢穴", "地精陷阱", "初次戰利品"],
                npcs: [
                    { name: "哥布林酋長", role: "敵人", description: "哥布林洞穴的領袖", cr: 1 },
                    { name: "獸人戰士長", role: "敵人", description: "獸人巢穴的領袖", cr: 2 },
                    { name: "被俘的商人", role: "被救者", description: "可能發現的俘虜" }
                ],
                locations: [
                    { name: "哥布林洞穴", description: "最容易攻克的洞穴" },
                    { name: "獸人巢穴", description: "更危險的洞穴" },
                    { name: "地精陷阱區", description: "充滿機關的區域" }
                ],
                encounters: ["哥布林群", "獸人巡邏", "陷阱"],
                treasures: ["怪物寶藏", "俘虜獎賞"],
                endCondition: "清除至少兩個外圍洞穴",
                opening_text: "混沌洞窟是一個由數十個洞穴組成的峽谷，每個洞穴都被不同的怪物佔據。哥布林的尖叫聲從最近的洞口傳來，獸人的戰鼓在深處迴響。這些生物並非和平共處——它們互相敵對，這可能是你們可以利用的弱點。選擇你們的第一個目標，開始清掃這片混沌之地吧。"
            },
            {
                act: 3,
                title: "洞窟深處",
                titleEn: "Caves of Chaos - Deep",
                levelRange: "2-4",
                objective: "探索混沌洞窟的深層洞穴",
                keyEvents: ["豺狼人營地", "蟲巢", "食人魔巢穴", "神秘邪教"],
                npcs: [
                    { name: "豺狼人領袖", role: "敵人", description: "凶殘的豺狼人首領", cr: 3 },
                    { name: "食人魔", role: "Boss", description: "洞窟中最強的生物之一", cr: 4 },
                    { name: "邪教牧師", role: "幕後威脅", description: "在最深處操控一切的人", cr: 4 }
                ],
                locations: [
                    { name: "豺狼人營地", description: "野蠻的獸人營地" },
                    { name: "蟲巢", description: "巨型昆蟲的巢穴" },
                    { name: "食人魔洞穴", description: "最危險的區域之一" }
                ],
                encounters: ["豺狼人群", "巨型蟲類", "食人魔對決"],
                treasures: ["食人魔寶藏", "更好的裝備"],
                endCondition: "發現邪教神殿的存在",
                opening_text: "外圍洞穴只是開始。更深處隱藏著更可怕的存在——豺狼人的營地充滿了屍骨的惡臭，蟲巢爬滿了令人作嘔的巨型昆蟲，而食人魔的咆哮聲讓大地震顫。但最令人不安的是，你們在探索中發現了一些邪惡的符號，暗示著這些怪物背後有更黑暗的力量在操控。"
            },
            {
                act: 4,
                title: "邪神神殿",
                titleEn: "Temple of Evil Chaos",
                levelRange: "4-5",
                objective: "摧毀混沌洞窟深處的邪惡神殿",
                keyEvents: ["邪教徒大廳", "不死生物守衛", "邪神祭壇", "最終淨化"],
                npcs: [
                    { name: "邪教大祭司", role: "最終Boss", description: "崇拜混沌邪神的首領", cr: 5 },
                    { name: "邪神化身", role: "威脅", description: "可能被召喚的邪惡存在" }
                ],
                locations: [
                    { name: "邪教神殿", description: "洞窟深處的邪惡聖地" },
                    { name: "祭壇室", description: "最終對決之處" }
                ],
                boss: { name: "邪教大祭司", cr: 5, type: "邪惡牧師", abilities: ["邪惡祈禱", "召喚不死", "詛咒"], tactics: "召喚不死生物掩護自己" },
                encounters: ["邪教徒群", "骷髏守衛", "大祭司對決"],
                treasures: [
                    { name: "邪神寶藏", type: "財富", description: "累積的獻祭品" },
                    { name: "英雄聲望", type: "成就", description: "邊境要塞的英雄" }
                ],
                endCondition: "摧毀神殿，成為邊境英雄",
                opening_text: "所有的怪物都只是表象。在混沌洞窟的最深處，隱藏著一座邪惡的神殿——這裡供奉著一位被遺忘的混沌邪神，而邪教大祭司正是這一切的幕後黑手。他操控著洞窟中的怪物，計劃著更大的邪惡。如果不摧毀這座神殿，混沌將永遠威脅著邊境要塞。這是你們冒險生涯的第一場真正考驗。"
            }
        ]
    },

    "tomb_of_horrors_enhanced": {
        id: "tomb_of_horrors",
        title: "恐怖之墓",
        titleEn: "Tomb of Horrors",
        levels: "10-14",
        startLevel: 10,
        synopsis: "傳奇的致命地城。半巫妖阿塞瑞拉克設計了這座完美的殺人陷阱，無數冒險者在此殞落。只有最聰明、最謹慎的人才能生還。",
        setting: "任意沼澤/荒野",
        acts: [
            {
                act: 1,
                title: "墓穴入口",
                titleEn: "The Entrance",
                levelRange: "10",
                objective: "找到並進入恐怖之墓的真正入口",
                keyEvents: ["虛假入口", "致命陷阱", "真正通道發現", "骷髏走廊"],
                npcs: [
                    { name: "幻影指引", role: "謎題", description: "可能的虛假幫助" }
                ],
                locations: [
                    { name: "地表墳丘", description: "墓穴的入口區域" },
                    { name: "虛假入口", description: "死亡陷阱" },
                    { name: "骷髏走廊", description: "真正的入口" }
                ],
                traps: ["崩塌天花板", "毒氣通道", "即死落穴"],
                encounters: ["陷阱", "幻象"],
                treasures: ["無（這只是開始）"],
                endCondition: "成功進入墓穴內部",
                opening_text: "恐怖之墓（Tomb of Horrors）——沒有冒險者不知道這個名字，也沒有冒險者不為之顫抖。半巫妖阿塞瑞拉克據說將他畢生的財富和最邪惡的陷阱都埋藏在這座墓穴中。無數人進入，沒有人出來。墓穴的位置長期是個謎，但你們找到了——一座低矮的土丘，上面刻滿了詭異的符文。有好幾個看似入口的洞穴，但只有一個是真的。選錯了，就是死亡。"
            },
            {
                act: 2,
                title: "陷阱走廊",
                titleEn: "The Corridors",
                levelRange: "10-12",
                objective: "穿越充滿致命陷阱的走廊",
                keyEvents: ["球坑走廊", "變形之門", "虛假寶庫", "綠臉惡魔"],
                traps: ["sphere of annihilation（湮滅球）", "傳送陷阱", "性別轉換之門", "永久石化"],
                npcs: [
                    { name: "綠臉惡魔入口", role: "陷阱", description: "微笑的惡魔臉，張開的嘴是湮滅球" }
                ],
                locations: [
                    { name: "球坑走廊", description: "滾石陷阱的走廊" },
                    { name: "變形之門通道", description: "會改變你的通道" },
                    { name: "虛假寶庫", description: "看起來像寶藏的陷阱" }
                ],
                encounters: ["陷阱", "謎題", "幻象"],
                treasures: ["虛假寶物（可能是陷阱）"],
                endCondition: "抵達內部祭堂區域",
                opening_text: "進入墓穴只是噩夢的開始。每一條走廊、每一扇門、每一個地磚都可能是陷阱。滾動的球坑無聲無息地追趕入侵者，看似普通的拱門會永久改變你的身體，而那個微笑的綠臉惡魔——它張開的嘴就是通往虛無的入口。阿塞瑞拉克設計這座墓穴只有一個目的：殺死冒險者。"
            },
            {
                act: 3,
                title: "內部聖殿",
                titleEn: "The Inner Temple",
                levelRange: "12-14",
                objective: "解開阿塞瑞拉克真正墓室的謎題",
                keyEvents: ["虛假巫妖戰", "鏡子迷宮", "棺材謎題", "靈魂寶石"],
                npcs: [
                    { name: "虛假阿塞瑞拉克", role: "Boss", description: "看似最終Boss的假貨", cr: 13 },
                    { name: "阿塞瑞拉克", role: "最終Boss", description: "真正的半巫妖", cr: 23, legendary: true }
                ],
                locations: [
                    { name: "虛假墓室", description: "假的最終房間" },
                    { name: "鏡子迷宮", description: "令人困惑的通道" },
                    { name: "真正墓室", description: "阿塞瑞拉克所在" }
                ],
                traps: ["假巫妖陷阱", "鏡面傳送", "靈魂抽取"],
                boss: { name: "阿塞瑞拉克", cr: 23, type: "半巫妖", abilities: ["心靈控制", "靈魂吞噬", "時間停止"], tactics: "玩弄入侵者，讓他們絕望" },
                encounters: ["虛假巫妖", "迷宮謎題", "阿塞瑞拉克（可選）"],
                treasures: [
                    { name: "阿塞瑞拉克的寶藏", type: "巨額財富", description: "如果你能活著拿走的話" },
                    { name: "傳奇聲望", type: "成就", description: "征服恐怖之墓" }
                ],
                endCondition: "摧毀或逃離阿塞瑞拉克",
                opening_text: "一個華麗的墓室，一具巫妖的殘骸躺在棺材中。這就是阿塞瑞拉克嗎？戰鬥異常激烈，但當你們以為勝利時⋯你們發現這只是一個假貨。真正的阿塞瑞拉克在更深處，在一個通過複雜謎題才能到達的隱藏墓室中。而他，已經等待了很久很久。「終於有人走到這裡了，」他的笑聲在黑暗中迴盪，「我開始以為我太過謹慎了。」"
            }
        ]
    }
};

export default MODULES_PART4;
