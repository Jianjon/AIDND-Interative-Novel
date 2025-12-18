/**
 * Module Plot Data - Part 5 (Enhanced Classic Modules)
 * Red Hand of Doom, Against the Giants, White Plume Mountain, Expedition Barrier Peaks, Isle of Dread
 */

export const MODULES_PART5 = {
    "red_hand_of_doom_enhanced": {
        id: "red_hand_of_doom",
        title: "毀滅的紅手",
        titleEn: "Red Hand of Doom",
        levels: "5-12",
        startLevel: 5,
        synopsis: "一支由龍人和地精組成的無敵軍團正在進軍，他們的目標是征服整個王國。冒險者必須阻止這場滅世之戰。",
        setting: "艾爾西爾谷地",
        acts: [
            {
                act: 1,
                title: "血色黎明",
                titleEn: "Blood Dawn",
                levelRange: "5-6",
                objective: "發現紅手軍團的入侵計畫",
                keyEvents: ["磨刀峽路伏擊", "德勒林渡口威脅", "斥候隊擊敗", "骸骨城情報"],
                npcs: [
                    { name: "庫爾斯克", role: "情報提供者", description: "抓獲的龍人軍官" },
                    { name: "亞札大人", role: "最終Boss", description: "紅手軍團的龍人領袖", cr: 15, legendary: true },
                    { name: "德勒林渡口鎮長", role: "NPC", description: "需要警告的城鎮領袖" }
                ],
                locations: [
                    { name: "磨刀峽路", description: "最初的伏擊地點" },
                    { name: "德勒林渡口", description: "第一個可能被攻擊的城鎮" },
                    { name: "骸骨城", description: "紅手軍團總部" }
                ],
                encounters: ["龍人斥候隊", "地精狼騎兵", "巨魔雇傭兵"],
                treasures: ["軍事情報", "龍人寶物"],
                endCondition: "揭露紅手軍團的規模與意圖",
                opening_text: "你們正行經偏僻的磨刀峽路，準備前往德勒林渡口辦事。然而，道路上的緊張氣息讓所有人警覺起來。當你們轉過一個彎道時，伏擊開始了——一隊龍人士兵從岩石後衝出，咆哮著攻擊。這些並非普通的掠奪者，他們訓練有素，紀律嚴明，每個人的盔甲上都繪有相同的標誌：一隻紅色的巨手。當你們擊敗他們後，審問俘虜揭示了可怕的真相——一支數萬人的軍團正在進軍，而這只是先頭部隊。"
            },
            {
                act: 2,
                title: "谷地危機",
                titleEn: "The Vale in Peril",
                levelRange: "6-8",
                objective: "爭取時間，準備防禦",
                keyEvents: ["德勒林渡口撤離", "精靈盟友尋求", "黑刃山巨人", "外交任務"],
                npcs: [
                    { name: "精靈領主", role: "盟友", description: "可能提供援軍的森林精靈" },
                    { name: "巨人酋長", role: "敵人/潛在盟友", description: "可能被說服不加入紅手" }
                ],
                locations: [
                    { name: "艾爾西爾谷地各城鎮", description: "需要警告的定居點" },
                    { name: "精靈林地", description: "尋求盟友的地點" },
                    { name: "黑刃山", description: "巨人的領地" }
                ],
                war_mechanics: true,
                encounters: ["龍人突擊隊", "巨人對抗/談判", "軍團先鋒"],
                treasures: ["盟軍承諾", "戰略物資"],
                endCondition: "準備防禦，軍團接近",
                opening_text: "時間不多了。紅手軍團正以驚人的速度推進，而艾爾西爾谷地的城鎮毫無準備。德勒林渡口必須撤離或防禦，精靈們可能願意幫助但需要說服，而巨人們⋯也許可以被收買讓他們保持中立。你們作為谷地為數不多知道真相的人，必須分頭行動，爭取每一絲時間與每一個盟友。"
            },
            {
                act: 3,
                title: "布林多城圍城",
                titleEn: "The Siege of Brindol",
                levelRange: "8-10",
                objective: "在圍城戰中削弱敵軍",
                keyEvents: ["城牆防禦", "敵軍將領暗殺", "巨龍來襲", "突破包圍"],
                npcs: [
                    { name: "紅手五指將軍", role: "敵將", description: "亞札大人的副將們", cr: 10 },
                    { name: "成年紅龍", role: "Boss", description: "軍團的龍族盟友", cr: 17 }
                ],
                locations: [
                    { name: "布林多城", description: "谷地的首府，最後防線" },
                    { name: "城牆", description: "防禦戰的主戰場" },
                    { name: "敵軍營地", description: "暗殺任務的目標" }
                ],
                encounters: ["龍人攻城隊", "五指將軍對決", "紅龍突襲"],
                treasures: ["戰利品", "將領裝備"],
                endCondition: "削弱軍團核心力量",
                opening_text: "紅手軍團抵達了布林多城下。數萬龍人、地精、巨魔和其他怪物圍成了一道無法穿越的包圍圈。城內的守軍雖然因為你們的努力得到了增援，但依然寡不敵眾。唯一的勝利方式是斬首行動——擊敗軍團的核心將領，讓這支軍隊陷入混亂。首先是五指將軍，然後是⋯那條紅龍。"
            },
            {
                act: 4,
                title: "骸骨城決戰",
                titleEn: "The Fall of the Red Hand",
                levelRange: "10-12",
                objective: "進攻骸骨城，終結亞札大人",
                keyEvents: ["龍軍反攻", "骸骨城潛入", "亞札大人對決", "軍團瓦解"],
                npcs: [
                    { name: "亞札大人", role: "最終Boss", description: "半龍戰爭領袖", cr: 15 },
                    { name: "提亞瑪特化身", role: "威脅", description: "可能被召喚的龍神" }
                ],
                locations: [
                    { name: "骸骨城", description: "紅手軍團的總部" },
                    { name: "祭壇室", description: "亞札大人試圖召喚提亞瑪特的地方" }
                ],
                boss: { name: "亞札大人", cr: 15, type: "半龍戰士", abilities: ["龍息", "戰術大師", "恐懼光環"], tactics: "如果失敗會試圖召喚提亞瑪特化身" },
                encounters: ["骸骨城守軍", "亞札大人衛隊", "最終對決"],
                treasures: [
                    { name: "紅手寶藏", type: "財富", description: "軍團掠奪的財富" },
                    { name: "谷地救星", type: "頭銜", description: "艾爾西爾的英雄" }
                ],
                endCondition: "擊敗亞札大人，瓦解紅手軍團",
                opening_text: "圍城被打破了，但紅手軍團並未被消滅。他們撤回了骸骨城，亞札大人在那裡準備著最後一搏——他計劃召喚龍神提亞瑪特的化身，讓整個世界陷入毀滅。這是終極一戰，必須在他完成儀式之前攻入骸骨城，斬殺亞札大人。艾爾西爾谷地的命運就掌握在你們手中。"
            }
        ]
    },

    "against_the_giants_enhanced": {
        id: "against_the_giants",
        title: "對抗巨人",
        titleEn: "Against the Giants",
        levels: "8-14",
        startLevel: 8,
        synopsis: "經典的巨人三部曲。冒險者被派遣調查巨人襲擊事件，逐步深入山丘、霜與火巨人的據點，最終發現幕後黑手是卓爾精靈。",
        setting: "劍灣山區",
        acts: [
            {
                act: 1,
                title: "山丘巨人酋長",
                titleEn: "Steading of the Hill Giant Chief",
                levelRange: "8-9",
                objective: "突襲山丘巨人酋長的莊園",
                keyEvents: ["莊園滲透", "酋長對決", "霜巨人線索", "奴隸解救"],
                npcs: [
                    { name: "諾斯納酋長", role: "Boss", description: "山丘巨人的肥胖領袖", cr: 9 },
                    { name: "被俘的矮人", role: "被救者", description: "可以提供情報的俘虜" }
                ],
                locations: [
                    { name: "山丘巨人莊園", description: "巨大粗糙的木製要塞" },
                    { name: "奴隸牢籠", description: "俘虜關押處" }
                ],
                encounters: ["山丘巨人群", "狼群", "食人魔衛兵"],
                treasures: ["巨人寶藏", "霜巨人信件"],
                endCondition: "擊敗諾斯納，獲得霜巨人線索",
                opening_text: "山丘巨人的襲擊越來越頻繁。村莊被掠奪，商隊被毀滅。國王派遣你們找出原因並加以阻止。線索指向諾斯納酋長的莊園——一座建在荒野中的巨大木製要塞。莊園內有數十名山丘巨人，還有他們的狼群和食人魔僕從。這是一場危險的滲透任務。"
            },
            {
                act: 2,
                title: "霜巨人雅爾",
                titleEn: "Glacial Rift of the Frost Giant Jarl",
                levelRange: "9-11",
                objective: "深入冰川裂隙，擊敗霜巨人雅爾",
                keyEvents: ["冰川要塞", "雅爾對決", "火巨人線索", "白龍威脅"],
                npcs: [
                    { name: "格魯格納姆雅爾", role: "Boss", description: "霜巨人的殘暴領袖", cr: 12 },
                    { name: "白龍", role: "Boss", description: "居住在冰川中的古龍", cr: 13 }
                ],
                locations: [
                    { name: "冰川裂隙", description: "霜巨人的冰凍要塞" },
                    { name: "白龍巢穴", description: "古龍的冰洞" }
                ],
                encounters: ["霜巨人衛兵", "冬狼", "白龍", "冰元素"],
                treasures: ["霜巨人寶藏", "火巨人信件", "龍寶"],
                endCondition: "擊敗雅爾，獲得火巨人線索",
                opening_text: "山丘巨人只是棋子。真正的主謀是霜巨人——強大而殘忍的冰雪戰士。格魯格納姆雅爾的要塞位於一條巨大的冰川裂隙中，進入的唯一方法是穿越凍土荒原。裡面除了霜巨人，還有一條遠古的白龍正在守護著它們的寶藏。"
            },
            {
                act: 3,
                title: "火巨人國王",
                titleEn: "Hall of the Fire Giant King",
                levelRange: "11-13",
                objective: "攻入火巨人王斯納爾的地下宮殿",
                keyEvents: ["地下宮殿", "國王對決", "卓爾精靈發現", "地獄犬群"],
                npcs: [
                    { name: "斯納爾國王", role: "Boss", description: "火巨人的傲慢統治者", cr: 14 },
                    { name: "卓爾精靈大使", role: "幕後黑手", description: "操控巨人的真正主謀", cr: 10 }
                ],
                locations: [
                    { name: "火山宮殿", description: "火巨人的地下堡壘" },
                    { name: "鑄造廠", description: "巨人的武器製造中心" },
                    { name: "卓爾精靈密室", description: "發現幕後黑手的地方" }
                ],
                encounters: ["火巨人戰士", "地獄犬群", "斯納爾國王", "阿澤精靈"],
                treasures: ["火巨人寶藏", "卓爾精靈情報"],
                endCondition: "擊敗斯納爾，發現卓爾精靈陰謀",
                opening_text: "火巨人斯納爾國王是這一切的核心。他的地下宮殿建在活火山的心臟中，熔岩照亮了無數鑄造爐。然而，當你們深入宮殿時，發現了更驚人的真相——卓爾精靈的大使正在與國王密謀。巨人的襲擊只是更大計畫的一部分，幕後黑手是幽暗地域的卓爾精靈。"
            },
            {
                act: 4,
                title: "幽暗地域",
                titleEn: "Descent into the Depths",
                levelRange: "13-14",
                objective: "追蹤卓爾精靈至幽暗地域",
                keyEvents: ["地下追蹤", "卓爾精靈城市", "女祭司對決", "陰謀終結"],
                npcs: [
                    { name: "卓爾女祭司", role: "最終Boss", description: "策劃巨人聯盟的幕後黑手", cr: 15 },
                    { name: "卓爾精靈士兵", role: "敵人", description: "精銳的黑精靈戰士" }
                ],
                locations: [
                    { name: "幽暗地域隧道", description: "通往卓爾城市的道路" },
                    { name: "卓爾精靈前哨", description: "黑精靈的據點" }
                ],
                boss: { name: "卓爾女祭司", cr: 15, type: "卓爾牧師", abilities: ["黑暗魔法", "蜘蛛召喚", "羅絲祝福"], tactics: "利用黑暗和魔法優勢" },
                encounters: ["卓爾巡邏隊", "巨型蜘蛛", "女祭司與護衛"],
                treasures: [
                    { name: "卓爾精靈寶藏", type: "財富", description: "黑精靈的魔法物品" },
                    { name: "王國英雄", type: "頭銜", description: "拯救領土的英雄" }
                ],
                endCondition: "終結卓爾陰謀，結束巨人威脅",
                opening_text: "火巨人宮殿中發現的秘密通道通往了幽暗地域。卓爾精靈女祭司是整個巨人聯盟的策劃者，她的目的是讓地表世界陷入混亂，為卓爾精靈的入侵鋪路。追蹤她進入無盡的黑暗，結束這場陰謀，是你們最後的任務。"
            }
        ]
    },

    "white_plume_mountain_enhanced": {
        id: "white_plume_mountain",
        title: "白羽山",
        titleEn: "White Plume Mountain",
        levels: "7-10",
        startLevel: 7,
        synopsis: "瘋狂巫師克拉普杜克綁架了三件傳說武器。冒險者必須穿越他設計的詭異地牢，奪回武器。",
        setting: "白羽火山",
        acts: [
            {
                act: 1,
                title: "山中入口",
                titleEn: "Into the Mountain",
                levelRange: "7",
                objective: "進入白羽山，開始尋找傳說武器",
                keyEvents: ["地熱噴泉入口", "三路選擇", "謎題地牢開始"],
                npcs: [
                    { name: "克拉普杜克", role: "最終Boss", description: "創造這座地牢的瘋狂巫師", cr: 14, legendary: true }
                ],
                locations: [
                    { name: "白羽山入口", description: "火山中的地牢入口" },
                    { name: "三路分岔", description: "通往三件武器的分岔點" }
                ],
                encounters: ["地牢守衛", "謎題陷阱"],
                treasures: ["地牢線索"],
                endCondition: "選擇第一個武器路線",
                opening_text: "白羽山以其冒著白煙的山頂聞名，但真正的秘密隱藏在山的內部。瘋狂巫師克拉普杜克在這裡建造了一座獨特的地牢，並綁架了三件傳說武器——黑暗刃、波濤鬥士、鍛就命運。他向世界發出了嘲諷的邀請：「如果你們有本事，就來拿回它們吧！」你們接受了挑戰。"
            },
            {
                act: 2,
                title: "波濤鬥士",
                titleEn: "Wave",
                levelRange: "7-8",
                objective: "解開謎題，奪回三叉戟波濤鬥士",
                keyEvents: ["沸騰泡泡房間", "巨型螃蟹", "水下迷宮", "海神祭壇"],
                npcs: [
                    { name: "波濤鬥士守護者", role: "Boss", description: "守護三叉戟的巨型生物", cr: 8 }
                ],
                locations: [
                    { name: "沸騰氣泡通道", description: "必須穿越的地熱區" },
                    { name: "巨螃蟹巢穴", description: "守護者的領地" },
                    { name: "海神祭壇", description: "波濤鬥士安放處" }
                ],
                encounters: ["沸騰水陷阱", "巨螃蟹群", "水元素"],
                treasures: ["波濤鬥士（智慧三叉戟）"],
                endCondition: "獲得波濤鬥士",
                opening_text: "第一條路線通往水的領域。沸騰的氣泡從地下湧出，巨型螃蟹守護著通道。在這條路的盡頭，傳說中的三叉戟「波濤鬥士」正在海神的祭壇上等待。它是一把有著自己意志的智慧武器，只服從信奉海神的戰士。"
            },
            {
                act: 3,
                title: "黑暗刃",
                titleEn: "Blackrazor",
                levelRange: "8-9",
                objective: "擊敗守護者，奪回邪惡之劍黑暗刃",
                keyEvents: ["倒轉重力走廊", "吸血鬼巢穴", "鏡面迷宮", "黑暗神殿"],
                npcs: [
                    { name: "吸血鬼守護者", role: "Boss", description: "守護黑劍的不死生物", cr: 10 }
                ],
                locations: [
                    { name: "倒轉重力區", description: "物理規則被扭曲的區域" },
                    { name: "吸血鬼巢穴", description: "不死守護者的住所" },
                    { name: "黑暗神殿", description: "黑暗刃安放處" }
                ],
                encounters: ["重力陷阱", "吸血鬼與僕從", "暗影生物"],
                treasures: ["黑暗刃（吞噬靈魂之劍）"],
                endCondition: "獲得黑暗刃",
                opening_text: "第二條路線通往黑暗的深處。走廊的重力被倒轉，天花板成了地板。更深處，一個吸血鬼守護著「黑暗刃」——這把邪惡的劍渴望吞噬生命的靈魂。它是最強大的武器，但也是最危險的。"
            },
            {
                act: 4,
                title: "鍛就命運與克拉普杜克",
                titleEn: "Whelm and Keraptis",
                levelRange: "9-10",
                objective: "擊敗巨人獲得鍛就命運，對抗克拉普杜克",
                keyEvents: ["矮人陵墓", "巨人守護者", "克拉普杜克對決", "逃離地牢"],
                npcs: [
                    { name: "巨人守護者", role: "Boss", description: "守護戰錘的巨人", cr: 9 },
                    { name: "克拉普杜克", role: "最終Boss", description: "瘋狂巫師（可能是分身）", cr: 14 }
                ],
                locations: [
                    { name: "矮人陵墓", description: "古老的矮人墓地" },
                    { name: "鍛就命運祭壇", description: "戰錘安放處" },
                    { name: "克拉普杜克密室", description: "巫師的巢穴" }
                ],
                boss: { name: "克拉普杜克", cr: 14, type: "瘋狂巫師", abilities: ["傳送", "精神控制", "分身術"], tactics: "可能不是真身，會逃跑" },
                encounters: ["矮人亡魂", "巨人對決", "克拉普杜克"],
                treasures: [
                    { name: "鍛就命運（戰錘）", type: "神器", description: "矮人族的傳說武器" },
                    { name: "三件武器全收", type: "成就", description: "完成不可能的任務" }
                ],
                endCondition: "收集三件武器，逃離或擊敗克拉普杜克",
                opening_text: "最後一條路線通往大地的深處。古老的矮人陵墓守護著「鍛就命運」——一把傳說中屬於矮人英雄的戰錘。但克拉普杜克不會讓你們輕易離開。當你們收集完三件武器時，這位瘋狂巫師現身了。「你們證明了自己的能力，」他說，「現在證明你們能逃出這裡。」"
            }
        ]
    },

    "expedition_barrier_peaks_enhanced": {
        id: "expedition_barrier_peaks",
        title: "屏障山脈探險",
        titleEn: "Expedition to the Barrier Peaks",
        levels: "8-12",
        startLevel: 8,
        synopsis: "奇幻與科幻的碰撞。冒險者探索一艘墜落的外星飛船，面對被遺忘的科技與逃脫的外星生物。",
        setting: "屏障山脈",
        acts: [
            {
                act: 1,
                title: "神秘金屬洞穴",
                titleEn: "The Metal Cave",
                levelRange: "8-9",
                objective: "探索神秘的「金屬洞穴」",
                keyEvents: ["怪物來源調查", "金屬牆壁", "奇異屍體", "門鎖解密"],
                npcs: [
                    { name: "當地向導", role: "NPC", description: "指引方向但不敢深入" }
                ],
                locations: [
                    { name: "屏障山脈入口", description: "飛船的外部破損處" },
                    { name: "第一層艙室", description: "飛船的入口區域" }
                ],
                encounters: ["逃脫的外星生物", "機器人守衛"],
                treasures: ["奇異裝置（高科技物品）"],
                endCondition: "意識到這是某種「飛船」",
                opening_text: "屏障山脈一直是危險的地方，但最近從那裡出現的怪物更加奇怪——有些有太多的腳，有些會噴射奇怪的光線。調查的任務落在了你們頭上。當你們攀登山脈時，發現了傳說中的「金屬洞穴」——但這不是洞穴，牆壁是平滑的金屬，空氣中瀰漫著一種刺鼻的氣味。你們進入了一艘墜落的外星飛船，只是還不知道。"
            },
            {
                act: 2,
                title: "飛船上層",
                titleEn: "Upper Decks",
                levelRange: "9-10",
                objective: "探索飛船的上層區域，理解這個地方",
                keyEvents: ["休眠艙", "機器人工廠", "武器庫", "電腦終端"],
                npcs: [
                    { name: "損壞的機器人", role: "威脅", description: "故障的自動守衛" },
                    { name: "倖存的外星人", role: "NPC", description: "可能存在的冬眠倖存者" }
                ],
                locations: [
                    { name: "休眠區", description: "船員的冬眠艙室" },
                    { name: "機器人工廠", description: "產生機器人威脅的地方" },
                    { name: "武器庫", description: "高科技武器儲藏處" }
                ],
                encounters: ["機器人群", "逃脫的實驗體", "電子陷阱"],
                treasures: ["雷射槍", "能量盾", "高科技裝備"],
                endCondition: "取得足夠的高科技裝備進入下層",
                opening_text: "這座「地牢」與任何你們見過的都不一樣。牆壁會發光，門會自己打開（或不開），而守衛是某種金屬製成的生物。你們開始理解這是某種「飛行器」的殘骸——一艘來自星際的飛船。船上的武器庫藏有令人難以置信的寶物：會射出光線的金屬棒，可以產生能量護盾的手環。這些東西的使用方法是個謎，但值得研究。"
            },
            {
                act: 3,
                title: "飛船下層與動力核心",
                titleEn: "Lower Decks and Power Core",
                levelRange: "10-12",
                objective: "探索飛船核心區域，解決怪物源頭",
                keyEvents: ["實驗室恐怖", "動物園生物", "動力核心", "逃離或封印"],
                npcs: [
                    { name: "逃脫的外星猛獸", role: "Boss", description: "最危險的外星生物", cr: 12 },
                    { name: "飛船AI（損壞）", role: "系統", description: "可能提供資訊的電腦" }
                ],
                locations: [
                    { name: "實驗室", description: "進行外星研究的區域" },
                    { name: "動物園區", description: "收集外星生物的地方" },
                    { name: "動力核心", description: "飛船的心臟" }
                ],
                boss: { name: "外星猛獸", cr: 12, type: "外星生物", abilities: ["酸液噴射", "再生", "心靈感應"], tactics: "極度危險的掠食者" },
                encounters: ["各種外星生物", "故障設備", "最終猛獸"],
                treasures: [
                    { name: "大量高科技物品", type: "寶藏", description: "來自星際的奇異裝置" },
                    { name: "外星知識", type: "成就", description: "理解了星際存在" }
                ],
                endCondition: "封印或摧毀飛船威脅",
                opening_text: "飛船的下層是真正的噩夢。這裡曾是某種「動物園」——收集各種外星生物用於研究。現在，在數千年的時間和飛船墜毀的影響下，這些生物逃了出來並繁殖。最危險的一隻正在動力核心區域築巢。你們必須解決它，要麼殺死它，要麼找到方法永久封印這艘飛船。"
            }
        ]
    },

    "isle_of_dread_enhanced": {
        id: "isle_of_dread",
        title: "恐怖之島",
        titleEn: "Isle of Dread",
        levels: "3-7",
        startLevel: 3,
        synopsis: "探索一座充滿恐龍、原始部落和神秘遺跡的失落島嶼。經典的六邊形探索冒險。",
        setting: "失落的海洋島嶼",
        acts: [
            {
                act: 1,
                title: "航向未知",
                titleEn: "Voyage to the Unknown",
                levelRange: "3",
                objective: "獲得地圖並航向恐怖之島",
                keyEvents: ["地圖發現", "船隻準備", "航海冒險", "登陸"],
                npcs: [
                    { name: "老水手", role: "地圖提供者", description: "擁有古老地圖的退休冒險家" },
                    { name: "船長", role: "NPC", description: "帶領船隊的船長" }
                ],
                locations: [
                    { name: "港口城市", description: "冒險的起點" },
                    { name: "海洋", description: "通往島嶼的航程" },
                    { name: "塔納羅亞村", description: "島上的原住民村莊" }
                ],
                encounters: ["海上風暴", "海怪", "海盜"],
                treasures: ["航海物資", "寶藏地圖"],
                endCondition: "抵達恐怖之島",
                opening_text: "一張古老的地圖落入了你們手中。它描繪了一座從未在任何海圖上出現過的島嶼——恐怖之島。地圖上標記著無數的寶藏位置，還有奇怪的符號：巨大的爬蟲、奇異的建築、以及一個被稱為「遠古者神殿」的地方。老水手警告你們：「那座島從沒有人活著離開過。」但財富的誘惑太大了。你們組織了一支探險隊，揚帆起航。"
            },
            {
                act: 2,
                title: "叢林探索",
                titleEn: "Jungle Exploration",
                levelRange: "4-5",
                objective: "六邊形探索島嶼，尋找遺跡",
                keyEvents: ["恐龍遭遇", "部落接觸", "神秘遺跡", "寶藏洞穴"],
                npcs: [
                    { name: "塔納羅亞酋長", role: "盟友", description: "友好的原住民領袖" },
                    { name: "食人族", role: "敵人", description: "敵對的島上部落" }
                ],
                locations: [
                    { name: "恐怖之島各區", description: "六邊形探索區域" },
                    { name: "塔納羅亞", description: "友好部落的村莊" },
                    { name: "叢林遺跡", description: "散落的古代建築" }
                ],
                hex_exploration: true,
                encounters: ["恐龍群", "食人族", "叢林猛獸", "古代陷阱"],
                treasures: ["遠古黃金", "部落贈禮"],
                endCondition: "發現高原通道",
                opening_text: "恐怖之島比地圖描繪的更加危險。叢林中游蕩著史前巨獸——恐龍，真正的恐龍。友好的塔納羅亞部落提供了庇護，但警告你們遠離島嶼中央的高原。「那裡住著惡魔，」酋長說，「以及比惡魔更古老的東西。」作為真正的冒險者，你們當然要去看看。"
            },
            {
                act: 3,
                title: "遠古者神殿",
                titleEn: "Temple of the Ancients",
                levelRange: "5-7",
                objective: "探索高原中央的神秘神殿",
                keyEvents: ["高原危險", "翼龍巢穴", "遠古者秘密", "最終寶藏"],
                npcs: [
                    { name: "科皮魯人", role: "敵人", description: "守護神殿的變形生物", cr: 6 },
                    { name: "遠古者遺骸", role: "謎題", description: "建造神殿的神秘種族" }
                ],
                locations: [
                    { name: "中央高原", description: "島嶼最危險的區域" },
                    { name: "遠古者神殿", description: "神秘的遠古建築" },
                    { name: "寶藏室", description: "累積千年的財富" }
                ],
                boss: { name: "科皮魯領袖", cr: 8, type: "變形怪物", abilities: ["變形", "心靈控制", "武器精通"], tactics: "偽裝成盟友再突襲" },
                encounters: ["翼龍群", "科皮魯守衛", "遠古陷阱"],
                treasures: [
                    { name: "遠古者寶藏", type: "巨額財富", description: "千年累積" },
                    { name: "異界知識", type: "成就", description: "發現外星文明的存在" }
                ],
                endCondition: "探索完神殿，帶著寶藏離開",
                opening_text: "中央高原是一個與世隔絕的世界。這裡的恐龍更加巨大，翼龍在天空盤旋，而最令人不安的是那些會變形的怪物——科皮魯人。他們守護著一座巨大的神殿，據說是由某種超越人類理解的「遠古者」建造的。神殿中充滿了陷阱與寶藏，以及關於這座島嶼真正起源的秘密。"
            }
        ]
    }
};

export default MODULES_PART5;
