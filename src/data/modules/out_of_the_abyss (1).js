const out_of_the_abyss = {
    id: "out_of_the_abyss",
    title: "逃離深淵",
    titleEn: "Out of the Abyss",
    levels: "1-15",
    startLevel: 3,
    synopsis: "卓爾精靈的俘虜逃入幽暗地域，卻發現深淵惡魔領主正在入侵這個地下世界。冒險者必須尋找古老的石之圖書館，啟動秩序引擎，最終挑起惡魔內戰。",
    setting: "幽暗地域",
    acts: [
        {
            act: 1,
            title: "囚徒",
            titleEn: "Prisoners of the Drow",
            levelRange: "1-3",
            objective: "從卓爾精靈監獄維爾金維夫逃脫",
            keyEvents: ["結識囚犯NPC", "伊薇拉的折磨", "利用惡魔入侵逃獄", "跳入暗湖"],
            npcs: [
                { name: "伊薇拉·米佐蕾", role: "典獄長", description: "殘酷的卓爾女祭司，視你們為私有財產", cr: 8, enemy: true },
                { name: "巴弗", role: "同伴", description: "一隻有點神經質的夸西特惡魔" },
                { name: "史圖吉", role: "同伴", description: "和平主義的菌人種子" },
                { name: "吉米特", role: "同伴", description: "深地侏儒賭徒" },
                { name: "布普多", role: "同伴", description: "瘋狂的迪洛矮人，認為自己是神" }
            ],
            locations: [
                { name: "維爾金維夫", description: "蜘蛛網中的監獄", boxedText: "這是一個懸掛在深淵之上的前哨站。沒有牆壁，只有欄杆。下方的黑暗深不見底。你們被剝奪了一切裝備，每天被迫在幾乎致命的環境中勞動。" },
                { name: "女祭司的祭壇", description: "獻祭蜘蛛女神的地方", boxedText: "這裡充滿了幹涸的血跡。伊薇拉喜歡在那裡『教導』不聽話的囚犯。她總是微笑著，那是比痛苦更可怕的東西。" }
            ],
            transitions: "這是一場與死神的賽跑，也是信任的遊戲：\n1. 策反不滿的男性卓爾衛兵（雖然他們同樣邪惡，但他們討厭女祭司）\n2. 在勞動中暗藏簡易武器（隱匿與巧手）\n3. 利用惡魔突襲的混亂跳崖（信仰之躍）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "瘋狂的獄友",
                    situation: "迪洛矮人布普多偷了一把小刀，他想殺了獸人王子，因為『神諭』這麼說。",
                    approaches: [
                        { type: "說服", check: "DC 14", outcome: "讓他相信獸人王子也是神諭的一部分（暫時）" },
                        { type: "搶奪", check: "力量", outcome: "奪走匕首，雖然他會恨你，但在越獄時這是唯一的武器" }
                    ],
                    fail_forward: "布普多大叫引來衛兵，你們不得不立刻發動越獄計劃，這比預想的早了很多。"
                },
                {
                    id: "1-B",
                    title: "蜘蛛的晚餐",
                    situation: "巨型蜘蛛正在將一名虛弱的囚犯拖上網。",
                    approaches: [
                        { type: "犧牲", check: "無", outcome: "保持安靜，讓他成為誘餌，換取更多的準備時間" },
                        { type: "救援", check: "戰鬥", outcome: "雖然救下了人，但伊薇拉注意到了你們的團結，加強了守衛" }
                    ],
                    fail_forward: "試圖救援失敗，囚犯慘死，全體隊員因目睹恐怖場景獲得一級壓力值。"
                }
            ],
            treasures: ["臨時武器", "被沒收的裝備"],
            opening_text: "幽暗地域（Underdark）沒有陽光，只有發光的真菌和永恆的恐懼。作為卓爾精靈的奴隸，你們的命運原本是在礦坑中累死，或是在祭壇上被獻祭給蜘蛛女神羅斯。維爾金維夫（Velkynvelve）監獄懸掛在高空，這裡是絕望的代名詞。但混亂是階梯——當惡魔的尖叫聲撕裂黑暗時，機會來了。"
        },
        {
            act: 2,
            title: "黑暗之城",
            titleEn: "Gracklstugh and the Darklake",
            levelRange: "3-5",
            objective: "穿越暗湖，在灰矮人城市格拉克斯圖尋求裝備與出路",
            keyEvents: ["暗湖航行", "雙頭巨人來襲", "紅龍鐵匠", "混亂的城市"],
            npcs: [
                { name: "狄摩高根", role: "惡魔領主", description: "雙頭王子，在暗湖現身", legendary: true },
                { name: "希柏·克羅", role: "紅龍", description: "格拉克斯圖的守護巨龍與鐵匠大師" }
            ],
            locations: [
                { name: "暗湖", description: "充滿危險的地下海", boxedText: "死寂的水面下隱藏著古老的恐怖。只有瘋子才會想橫渡這裡，而你們別無選擇。" },
                { name: "格拉克斯圖", description: "刀鋒之城", boxedText: "這是一座工業地獄。空氣中充滿了煤煙和硫磺味。灰矮人們在這裡鍛造最好的鋼鐵，但也鍛造著陰謀。近期，城市裡的瘋狂事件越來越多——有人看見雙頭的陰影。" }
            ],
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "紅龍的熔爐",
                    situation: "肥胖的紅龍希柏·克羅答應幫你們重鑄裝備，但他想要一些『特別的燃料』——活人。",
                    approaches: [
                        { type: "交易", check: "財寶", outcome: "用在路上撿到的珍稀寶石滿足他的貪婪" },
                        { type: "欺騙", check: "DC 18", outcome: "讓他相信你們是狄摩高根的使者，不敢怠慢" }
                    ],
                    fail_forward: "拒絕交易，被趕出熔爐區，只能使用劣質的灰矮人裝備（攻擊檢定-1）。"
                }
            ],
            treasures: ["灰矮人裝備", "黑曜石護符"],
            endCondition: "逃離逐漸陷入內戰的格拉克斯圖",
            opening_text: "逃出了監獄，卻進入了另一個地獄。暗湖（Darklake）的水冰冷刺骨，而岸邊的城市格拉克斯圖（Gracklstugh）也不歡迎外來者。這裡的灰矮人似乎被某種集體的瘋狂所感染。而在城市的陰影中，你們聽到了那個名字——狄摩高根。惡魔領主正在影響這片土地。"
        },
        {
            act: 3,
            title: "重返地表",
            titleEn: "Escape to the Surface",
            levelRange: "5-7",
            objective: "找到通往地表的隧道，向光輝世界警告",
            keyEvents: ["布林根斯通的幽靈", "地表突圍", "布魯諾王的召喚", "再次武裝"],
            npcs: [
                { name: "布魯諾·戰錘", role: "矮人王", description: "傳奇英雄，組織遠征軍" },
                { name: "阿魯絲特拉", role: "銀月女士", description: "提供魔法支援" }
            ],
            locations: [
                { name: "地表出口", description: "久違的陽光", boxedText: "當第一縷陽光刺痛你們的眼睛時，感覺像是一種灼燒。你們自由了，但你們知道這只是暫時的。身後的黑暗正在擴散。" },
                { name: "岡特格里姆", description: "矮人要塞", boxedText: "布魯諾王已經集結了軍隊。這裡不再是避難所，而是反擊的基地。" }
            ],
            transitions: "你們帶來了噩耗，但也帶來了希望：\n1. 在議會上展示惡魔存在的證據（說服各國領袖）\n2. 接受布魯諾王的特訓（獲得特長或技能升級）\n3. 招募一支敢死隊重返幽暗地域（領導力）",
            endCondition: "組建遠征隊，準備重返地底",
            opening_text: "你們做到了不可能的事：活著回到了地表。但這不是結局。你們腦海中的畫面——雙頭的惡魔、發瘋的城市、腐化的真菌——揮之不去。當你們站在各國領袖面前時，你們知道回家的路只有一條：殺回去。"
        },
        {
            act: 4,
            title: "石之圖書館",
            titleEn: "Gravenhollow",
            levelRange: "8-9",
            objective: "在傳說中的全知圖書館尋找驅逐惡魔的方法",
            keyEvents: ["尋找圖書館", "歷史的回聲", "預言幻象", "黑暗之心儀式"],
            npcs: [
                { name: "圖書管理員", role: "石巨人", description: "沈默的守護者，只用刻字交流" },
                { name: "惡魔領主的幻影", role: "過去/未來", description: "在圖書館中看到的關於惡魔起源的歷史" }
            ],
            locations: [
                { name: "格雷文霍洛 (Gravenhollow)", description: "石之圖書館", boxedText: "這座圖書館由活的石頭構成，記錄了自創世以來幽暗地域發生的一切。在這個時間流動異常的地方，你可以查閱過去，甚至窺視未來。但知識是有代價的——你的記憶可能會被替換。" },
                { name: "回聲大廳", description: "提問與解答", boxedText: "如果你問對了問題，石頭會告訴你答案。『如何殺死一個惡魔領主？』石頭回答：『你不能。但你可以讓它們殺死彼此。』" }
            ],
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "禁忌的知識",
                    situation: "你們查閱到了關於『黑暗之心』儀式的細節，但這段知識帶有強大的精神衝擊。",
                    approaches: [
                        { type: "智力豁免", check: "DC 18", outcome: "完美記住儀式步驟，獲得『惡魔剋星』知識優勢" },
                        { type: "分擔痛苦", check: "協作", outcome: "每人記住一部分，避免單人發瘋，但需要團隊配合才能執行儀式" }
                    ],
                    fail_forward: "雖然獲得了知識，但負責閱讀的角色獲得一個長期瘋狂症狀：『我相信自己正在變成惡魔』。"
                }
            ],
            treasures: ["儀式卷軸", "真名護符"],
            endCondition: "獲得黑暗之心儀式的詳細步驟",
            opening_text: "傳說中有一座圖書館，它不藏書，而是記錄歷史的回聲。格雷文霍洛（Gravenhollow）是石巨人的聖地。在這裡，你們不僅要尋找知識，還要對抗時間本身的侵蝕。為了擊敗神一般的惡魔領主，你們需要比劍更鋒利的東西——真理。"
        },
        {
            act: 5,
            title: "腐敗婚禮",
            titleEn: "The Fetid Wedding",
            levelRange: "10-11",
            objective: "阻止祖格莫伊與大軟泥怪的結合，獲取儀式材料",
            keyEvents: ["亞拉米柯斯花園", "菌人叛亂", "大軟泥怪入侵", "孢子女王對決"],
            npcs: [
                { name: "祖格莫伊", role: "惡魔領主", description: "真菌女王，意圖通過婚姻吞噬軟泥怪", cr: 23, legendary: true },
                { name: "朱比萊克斯", role: "惡魔領主", description: "無面之主，憤怒的大軟泥怪", cr: 23, legendary: true }
            ],
            locations: [
                { name: "亞拉米柯斯", description: "巨大的真菌森林", boxedText: "這美麗得令人作嘔。彩色的孢子雲在空中飄蕩，巨大的蘑菇像高塔一樣聳立。這是祖格莫伊的花園，也是婚禮的現場。無數被控制的生物正在忙碌地準備著這場褻瀆的儀式。" },
                { name: "婚禮大廳", description: "腐化核心", boxedText: "祖格莫伊穿著由白色黴菌編織的婚紗，等待著她的'新郎'——或者是午餐。如果這兩個惡魔領主結合，他們將創造出毀滅世界的瘟疫。" }
            ],
            transitions: "這不是來喝喜酒的，是來砸場子的：\n1. 利用火焰與解毒劑開路（資源消耗戰）\n2. 策反還未完全被控制的菌人（社交與自然）\n3. 引導朱比萊克斯發現這是一場騙局（讓惡魔互鬥）",
            strategic_nodes: [
                {
                    id: "5-A",
                    title: "新娘的獻禮",
                    situation: "偽裝被識破，祖格莫伊試圖用魅惑孢子控制隊伍中最意志薄弱的人成為伴郎（祭品）。",
                    approaches: [
                        { type: "意志豁免", check: "DC 20", outcome: "抵抗魅惑，並反過來利用心靈連結刺探她的弱點" },
                        { type: "物理打斷", check: "攻擊", outcome: "攻擊散布孢子的噴口，強制開始戰鬥" }
                    ],
                    fail_forward: "一名隊友被魅惑反水，直到受到半血以上的傷害才能清醒，戰鬥難度劇增。"
                }
            ],
            treasures: ["祖格莫伊的孢子囊（儀式材料）", "真菌共生體"],
            endCondition: "獲得儀式材料，並讓兩位惡魔領主兩敗俱傷",
            opening_text: "如果說有什麼比地獄更糟糕，那就是充滿愛意的地獄。真菌女王祖格莫伊要結婚了，她計劃吞噬無面之主朱比萊克斯以此進化。亞拉米柯斯（Araumycos）——這世界上最大的真菌生命體——正在為此歡呼。你們必須成為婚禮的毀滅者。帶上防毒面具，這場婚禮會很『熱鬧』。"
        },
        {
            act: 6,
            title: "秩序引擎",
            titleEn: "The Maze Engine",
            levelRange: "12-13",
            objective: "在迷宮中尋找秩序引擎，對抗獸王與牛頭人領主",
            keyEvents: ["無盡迷宮", "秩序引擎啟動", "耶諾古的獵殺", "巴aphomet的衝鋒"],
            npcs: [
                { name: "巴aphomet", role: "惡魔領主", description: "角魔領主，迷宮的主人", cr: 23, legendary: true },
                { name: "耶諾古", role: "惡魔領主", description: "豺狼人之王，無盡的飢餓", cr: 24, legendary: true },
                { name: "維澤蘭", role: "卓爾法師", description: "儀式的指導者，但也可能背叛" }
            ],
            locations: [
                { name: "秩序引擎", description: "巨大的半魔法機械", boxedText: "在這混亂的深淵中，居然存在這樣一台像鐘錶一樣精密的巨大機器。這是一把雙刃劍——它能修復現實，也能毀滅它。巨大的齒輪在岩漿上轉動，每一下撞擊都像是在敲響世界的喪鐘。" },
                { name: "紫蟲隧道", description: "巨大的地下高速公路", boxedText: "這裡的隧道是圓形的，因為它們是被巨大的紫蟲鑽出來的。這也是耶諾古軍隊的快速通道。" }
            ],
            maze_engine_mechanic: {
                effect: "每回合擲骰 d100 觸發隨機魔法效應：\n1-10: 時間倒流（全員回到上一回合狀態）\n11-20: 魔法物品充能\n21-30: 隨機傳送\n... 90-100: 召喚異界神侍協助",
                risk: "如果未能控制引擎 (智力 DC 20)，可能引發大爆炸。"
            },
            strategic_nodes: [
                {
                    id: "6-A",
                    title: "引擎的暴走",
                    situation: "正當你們試圖啟動引擎對付追來的巴aphomet時，引擎開始無差別發射能量波。",
                    approaches: [
                        { type: "奧秘調律", check: "DC 22", outcome: "成功引導能量波擊中巴aphomet，造成重創並將其擊退" },
                        { type: "蠻力破壞", check: "力量", outcome: "卡住齒輪強制停止，雖然失去了引擎的幫助，但也避免了全滅" }
                    ],
                    fail_forward: "引擎將所有人（包括惡魔領主）隨機傳送到迷宮的另一個角落，追逐戰變成了捉迷藏。"
                }
            ],
            treasures: ["巴aphomet的角（儀式材料）", "秩序護符"],
            endCondition: "獲得所需的最後材料，準備最終召喚",
            opening_text: "在深淵的最深處，秩序與混亂進行著最後的糾纏。秩序引擎（Maze Engine），這台古代遺物擁有改變現實的力量。它是你們對抗惡魔領主的王牌。但在迷宮中，牛頭人領主和豺狼人之王正在逼近。這裡是他們的領地。引擎的轟鳴聲掩蓋不了他們的腳步聲。準備好迎接衝擊了嗎？"
        },
        {
            act: 7,
            title: "惡魔皆死",
            titleEn: "Execute: The Dark Heart",
            levelRange: "14-15",
            objective: "在卓爾城市執行最終儀式，終結深淵入侵",
            keyEvents: ["召喚狄摩高根", "惡魔大逃殺", "最後的倖存者", "深淵封印"],
            npcs: [
                { name: "狄摩高根", role: "最終勝者", description: "通常是最後存活的最強惡魔領主", cr: 26, legendary: true },
                { name: "玩家團隊", role: "處刑人", description: "狀態全滿（因為英雄氣概）的最終決戰隊伍" }
            ],
            locations: [
                { name: "門佐貝拉贊廢墟", description: "最後的戰場", boxedText: "這座黑暗精靈的皇冠之珠已經變成了屠宰場。當你們放下儀式信標時，空間被撕裂了。不是一個，而是所有的惡魔領主都被強行拉到了這裡。這是歷代最強的角鬥場。" }
            ],
            boss_mechanic: "【漁翁得利】：玩家前幾回合主要是防禦和引導，看著惡魔領主們互相撕咬。当只剩下一位重傷的魔王時（通常是狄摩高根），真正的Boss戰才開始。",
            strategic_nodes: [
                {
                    id: "7-A",
                    title: "王者的隕落",
                    situation: "狄摩高根撕碎了最後的對手，滿身是傷地轉向你們，發出震天的咆哮。這是弒神的時刻。",
                    approaches: [
                        { type: "全力輸出", check: "戰鬥", outcome: "在它回覆體力前，傾瀉所有的法術位和能力" },
                        { type: "放逐儀式", check: "奧秘 (需持續專注)", outcome: "一邊戰鬥一邊維持儀式，將其強行拖回深淵" }
                    ],
                    fail_forward: "狄摩高根雖然被擊敗，但在消失前詛咒了隊伍，所有參與者將永遠被深淵凝視（但世界得救了）。"
                }
            ],
            endCondition: "惡魔領主全部被逐回深淵",
            treasures: ["幽暗地域的救世主", "傳奇裝備自選"],
            opening_text: "這是最後的賭局。所有的籌碼都已押上。儀式開始了，黑暗之心在跳動。空間破碎，那些不可一世的惡魔領主像被線牽著的木偶一樣被拉到了門佐貝拉贊。看著它們互相殘殺是一種恐懼的享受。但別忘了，當最後一個怪物站立時，它會尋找新的對手。那就是你們。拔劍吧，為了幽暗地域，為了地表，為了生存。"
        }
    ]
};

export default out_of_the_abyss;
