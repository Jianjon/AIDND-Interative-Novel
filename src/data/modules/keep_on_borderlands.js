const keep_on_borderlands = {
    id: "keep_on_borderlands",
    title: "邊境堡壘",
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
                { name: "邊境要塞", description: "文明世界的最後前哨", boxedText: "這座石頭堡壘是文明世界在這片蠻荒邊境的最後據點。城牆高聳，守衛森嚴。雖然這只是一個邊陲之地，但對於尋求財富和榮耀的冒險者來說，這裡是唯一的避風港。" },
                { name: "旅店", description: "冒險者聚集地", boxedText: "『綠龍旅店』裡總是煙霧繚繞，充滿了廉價麥酒和烤肉的氣味。冒險者們在這裡交換著關於『混沌洞窟』的傳聞，有人說那裡藏著古老的黃金，也有人說那裡只有死亡。" },
                { name: "鐵匠鋪", description: "購買裝備", boxedText: "鐵匠鋪的爐火晝夜不息。矮人鐵匠用懷疑的眼光打量著你們的新手裝備，『如果你們要去那些洞窟，』他咕噥著，『最好帶上一些真正能保命的東西。』" }
            ],
            transitions: "初來乍到，你們需要為冒險做準備：\n1. 在旅店打聽關於洞窟具體位置的情報（社交與花費）\n2. 向城主申請合法的探險許可（禮儀與說服）\n3. 在鐵匠鋪賒帳購買更好的裝備（信用與談判）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "情報收集",
                    situation: "旅店裡有個醉醺醺的老兵聲稱只有他知道『安全的』捷徑。",
                    approaches: [
                        { type: "社交", check: "DC 12", outcome: "請他喝酒，獲得一張標註了怪物領地分佈的粗糙地圖" },
                        { type: "洞察", check: "DC 14", outcome: "發現他在吹牛，但從不僅慎的言語中推斷出狗頭人陷阱的位置" }
                    ],
                    fail_forward: "被誤導獲得了錯誤情報，導致你們第一天進入洞窟時會直接撞上獸人巡邏隊的伏擊。"
                },
                {
                    id: "1-B",
                    title: "城主的許可",
                    situation: "守衛隊長要求你們證明自己不是麻煩製造者，否則禁止離開要塞。",
                    approaches: [
                        { type: "說服", check: "DC 13", outcome: "展示你們的秩序傾向，獲得通行證與少量補給" },
                        { type: "威嚇/戰鬥", check: "切磋", outcome: "與副隊長進行非致命決鬥，贏得他們的尊重" }
                    ],
                    fail_forward: "申請被拒，被迫像罪犯一樣從下水道或翻牆溜出要塞，聲望降低。"
                }
            ],
            treasures: ["要塞地圖", "初始物資"],
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
                { name: "哥布林洞穴", description: "最容易攻克的洞穴", boxedText: "這裡散發著腐爛垃圾的臭味。入口處掛著警告性的骨頭圖騰。哥布林們雖然弱小，但數量眾多，且極其狡猾，喜歡利用狹窄的地形進行伏擊。" },
                { name: "獸人巢穴", description: "更危險的洞穴", boxedText: "洞穴入口整齊而乾淨，顯示出軍事化的紀律。獸人戰士們在這裡磨利斧頭，他們的眼中燃燒著對戰鬥的渴望。牆上畫滿了征服與殺戮的壁畫。" },
                { name: "地精陷阱區", description: "充滿機關的區域", boxedText: "這個區域異常安靜，看似平平無奇的地面下可能隱藏著致命的尖刺坑。雖然沒有看到守衛，但你們總感覺有雙眼睛在黑暗中窺視著你們。" }
            ],
            transitions: "混沌洞窟的各個勢力並非鐵板一塊：\n1. 利用哥布林對獸人的恐懼挑撥離間（欺瞞與威嚇）\n2. 正面突破獸人的防線（純粹的戰鬥挑戰）\n3. 小心翼翼地拆除地精的陷阱網（敏捷與工具）",
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "怪物內鬥",
                    situation: "你們發現一隊哥布林正試圖偷襲獸人的糧倉。",
                    approaches: [
                        { type: "潛行", check: "DC 14", outcome: "暗中幫助哥布林成功，引發兩大部落的全面戰爭，坐收漁利" },
                        { type: "交涉", check: "獸人語", outcome: "向獸人告密，獲得獸人酋長的暫時互不侵犯條約" }
                    ],
                    fail_forward: "被雙方同時發現，哥布林和獸人暫時放下仇恨，聯手追殺你們（大逃殺模式）。"
                },
                {
                    id: "2-B",
                    title: "被俘的商人",
                    situation: "在這片區域的深處，傳來了人類的呼救聲。一個行商被綁在火刑架上。",
                    approaches: [
                        { type: "戰鬥", check: "突襲", outcome: "在點火前殺散守衛，救下商人" },
                        { type: "隱匿", check: "DC 15", outcome: "製造聲東擊西的騷亂，趁亂割斷繩索救人" }
                    ],
                    fail_forward: "商人受傷（失去一條腿），雖然救出但無法行走，護送他回城的難度大增。"
                }
            ],
            treasures: ["獸人軍旗", "哥布林私房錢", "商人的感謝金"],
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
                { name: "豺狼人營地", description: "野蠻的獸人營地", boxedText: "這裡充滿了瘋狂的笑聲和撕咬聲。滿地都是碎骨頭，空氣中瀰漫著血腥味。這些豺狼人似乎處在一種不自然的狂亂狀態，不僅僅是飢餓，更像是受到了某種黑暗儀式的刺激。" },
                { name: "蟲巢", description: "巨型昆蟲的巢穴", boxedText: "牆壁上覆蓋著粘稠的樹脂，巨大的多足生物在一旁爬行。這裡異常安靜，除了甲殼摩擦的聲音。如果不小心，你們可能會成為下一批幼蟲的養料。" },
                { name: "食人魔洞穴", description: "最危險的區域之一", boxedText: "一個巨大的身影擋住了去路。這隻食人魔穿著由冒險者盾牌拼湊成的盔甲。他的巢穴裡堆滿了金幣和不知名的魔法物品，顯然他已經『招待』過不少客人了。" }
            ],
            transitions: "愈深入洞窟，危險愈加致命：\n1. 穿越蟲巢以避開豺狼人的重兵把守（體質與生存）\n2. 挑戰食人魔以獲得通往神殿的鑰匙（BOSS戰）\n3. 偽裝成邪教徒混入深層區域（欺瞞與服裝）",
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "瘋狂的豺狼人",
                    situation: "豺狼人似乎在進行某種獻祭儀式，他們忽視了周圍的防禦。",
                    approaches: [
                        { type: "奧秘", check: "DC 14", outcome: "識別出這是與惡魔領主耶諾古有關的儀式，破壞祭壇可使他們陷入混亂" },
                        { type: "戰鬥", check: "範圍攻擊", outcome: "利用他們聚集的機會發動突襲，造成大量傷害" }
                    ],
                    fail_forward: "儀式完成，召喚出了一隻狂戰魔（Vrock），戰鬥難度激增，但擊敗後可獲得惡魔精華。"
                },
                {
                    id: "3-B",
                    title: "食人魔的寶藏",
                    situation: "食人魔正在睡覺，但他身邊放著一把發光的魔法劍。",
                    approaches: [
                        { type: "隱匿", check: "DC 16", outcome: "成功偷走魔法劍，大幅提升戰鬥力" },
                        { type: "戰鬥", check: "力量對抗", outcome: "堂堂正正地擊敗他，獲得所有寶藏與聲望" }
                    ],
                    fail_forward: "食人魔驚醒並發狂，他隨手抓起一隻哥布林投擲向你們（範圍傷害），戰鬥強制開始。"
                }
            ],
            treasures: ["食人魔寶藏", "更好的裝備", "神殿鑰匙"],
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
                { name: "邪教神殿", description: "洞窟深處的邪惡聖地", boxedText: "這裡不再是天然的洞穴，而是鋪設了黑色大理石的人造建築。紫色的火盆燃燒著，照亮了巨大的邪神雕像。空氣中充滿了壓抑的魔力波動，低沈的誦經聲讓人頭痛欲裂。" },
                { name: "祭壇室", description: "最終對決之處", boxedText: "大祭司站在血紅色的祭壇前，手舉獻祭匕首。在他的身後，一道不穩定的傳送門正在緩緩打開，透過它可以看到無盡的虛空與混沌。必須在他完成召喚前阻止這一切！" }
            ],
            boss: { name: "邪教大祭司", cr: 5, type: "邪惡牧師", abilities: ["邪惡祈禱", "召喚不死", "詛咒"], tactics: "召喚不死生物掩護自己" },
            transitions: "這是最後的決戰，決定邊境的命運：\n1. 直接衝擊祭壇打斷儀式（速度與勇氣）\n2. 潛行破壞週邊的法術維持水晶（策略與技巧）\n3. 說服被洗腦的守衛倒戈（極高難度的社交挑戰）",
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "儀式干擾",
                    situation: "大祭司正在引導能量，如果你們能破壞三個法力節點中的兩個，傳送門就會崩潰。",
                    approaches: [
                        { type: "奧秘/宗教", check: "DC 15", outcome: "精確定位節點弱點，用最小代價破壞它們" },
                        { type: "遠程攻擊", check: "AC 15", outcome: "射擊水晶節點，引發魔力爆炸（對敵我雙方造成傷害）" }
                    ],
                    fail_forward: "未能及時阻止，傳送門打開，一隻『混沌之子』（觸手怪）鑽了出來，成為第二階段的Boss。"
                },
                {
                    id: "4-B",
                    title: "大祭司的蠱惑",
                    situation: "大祭司試圖用力量和財富誘惑你們加入混沌。",
                    approaches: [
                        { type: "意志豁免", check: "DC 14", outcome: "堅定信念，不受蠱惑，獲得『勇氣光環』Buff" },
                        { type: "欺瞞", check: "DC 16", outcome: "假裝投降，走近後發動致命背刺" }
                    ],
                    fail_forward: "一名隊友（意志最低者）被短暫精神控制，轉身攻擊隊友一回合。"
                }
            ],
            encounters: ["邪教徒群", "骷髏守衛", "大祭司對決"],
            treasures: [
                { name: "邪神寶藏", type: "財富", description: "累積的獻祭品" },
                { name: "英雄聲望", type: "成就", description: "邊境要塞的英雄" }
            ],
            endCondition: "摧毀神殿，成為邊境英雄",
            opening_text: "所有的怪物都只是表象。在混沌洞窟的最深處，隱藏著一座邪惡的神殿——這裡供奉著一位被遺忘的混沌邪神，而邪教大祭司正是這一切的幕後黑手。他操控著洞窟中的怪物，計劃著更大的邪惡。如果不摧毀這座神殿，混沌將永遠威脅著邊境要塞。這是你們冒險生涯的第一場真正考驗。"
        }
    ]
};

export default keep_on_borderlands;
