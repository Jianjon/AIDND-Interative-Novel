const white_plume_mountain = {
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
                { name: "白羽山入口", description: "火山中的地牢入口", boxedText: "這不是一座普通的山。山頂持續噴出的白煙像是一根巨大的羽毛。入口處沒有守衛，只有一塊刻著謎語的石碑：『智慧是開門的鑰匙，貪婪是墳墓的泥土。』" },
                { name: "三路分岔", description: "通往三件武器的分岔點", boxedText: "你們來到了一個巨大的地下大廳。面前有三條通道：一條充滿了水的聲音，一條漆黑無光，一條刻滿了矮人符文。克拉普杜克的聲音在空中迴盪：『三個選擇，三種死亡，或者是三種榮耀？』" }
            ],
            transitions: "面對瘋狂法師的挑戰，解開第一道謎題：\n1. 解開石身人面像的謎語以通過大門（智力與謎題）\n2. 穿越隱形的力場迷宮（感知與探索）\n3. 對抗守門的魔法魔像（奧秘與戰鬥）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "斯芬克斯的謎題",
                    situation: "一隻巨大的且無聊的斯芬克斯擋住了去路，牠不想打架，只想玩腦筋急轉彎。",
                    approaches: [
                        { type: "解謎", check: "智力", outcome: "正確回答三個謎題，斯芬克斯給予你們地牢的地圖碎片" },
                        { type: "戰鬥", check: "高輸出", outcome: "打敗這個傳奇生物，但牠死前會詛咒隊伍（下次檢定劣勢）" }
                    ],
                    fail_forward: "回答錯誤，斯芬克斯將隊伍傳送到地牢的隨機位置，打亂了部署。"
                },
                {
                    id: "1-B",
                    title: "泥漿陷阱",
                    situation: "看似平坦的地板其實是偽裝的泥漿怪，一旦踏入就會被吞噬。",
                    approaches: [
                        { type: "檢測", check: "調查 DC 15", outcome: "發現地板的微小波動，繞過陷阱" },
                        { type: "誘餌", check: "生存", outcome: "扔出肉塊引誘泥漿怪現身，然後遠程解決" }
                    ],
                    fail_forward: "一名隊員被吞入泥漿，必須在3回合內將其救出（窒息傷害），否則裝備會被腐蝕。"
                }
            ],
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
                { name: "沸騰氣泡通道", description: "必須穿越的地熱區", boxedText: "通道的地板是架在沸騰泥漿上的不穩定金屬網。熱氣蒸騰，視線模糊。每走一步，金屬網都在哀鳴，下方是足以煮熟巨人的高溫。" },
                { name: "巨螃蟹巢穴", description: "守護者的領地", boxedText: "一個巨大的地下湖泊，水面平靜得詭異。突然，水面炸開，一隻房子大小的螃蟹舉起鉗子。它的甲殼上刻著魔法符文，這是克拉普杜克的寵物。" },
                { name: "海神祭壇", description: "波濤鬥士安放處", boxedText: "波濤鬥士（Wave）懸浮在祭壇上，發出悅耳的海浪聲。三叉戟上雕刻著海豚和魚群。當你靠近時，感受到一股強烈的悲傷——它在思念海洋。" }
            ],
            transitions: "在沸騰與深水之間，奪取第一件神器：\n1. 在搖搖欲墜的金屬網上與敵人戰鬥（平衡與雜技）\n2. 潛入水下迷宮尋找通往祭壇的密道（游泳與閉氣）\n3. 與擁有高智商的三叉戟進行心靈溝通（魅力與宗教）",
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "旋轉的圓柱",
                    situation: "通往祭壇的路是一個巨大的旋轉圓柱體，表面塗滿了油脂，下方是火坑。",
                    approaches: [
                        { type: "技巧", check: "雜技 DC 18", outcome: "像松鼠一樣在旋轉中保持平衡，衝過對岸" },
                        { type: "魔法", check: "飛行/傳送", outcome: "無視地形機制，直接飛越障礙（如果還有法術位）" }
                    ],
                    fail_forward: "滑落圓柱，掉入下方的火坑（火焰傷害），雖然爬了上來但狼狽不堪。"
                },
                {
                    id: "2-B",
                    title: "巨蟹的殼",
                    situation: "守護巨蟹不僅體型巨大，而且對魔法免疫，物理防禦極高。",
                    approaches: [
                        { type: "弱點", check: "洞察/自然", outcome: "發現它的眼柄是弱點，集中攻擊造成暴擊" },
                        { type: "環境", check: "智力", outcome: "利用地熱噴泉，引誘巨蟹被高溫蒸汽噴射煮熟" }
                    ],
                    fail_forward: "巨蟹的鉗子夾住了一名隊員，如果不在下一回合造成足夠傷害，該隊員將被腰斬（瀕死）。"
                }
            ],
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
                { name: "倒轉重力區", description: "物理規則被扭曲的區域", boxedText: "當你跨過門檻時，世界顛倒了。你站在『天花板』上，看著下方的深淵（那是原本的天空）。如果掉下去，你會一直下墜，直到窒息。這裡是物理學的噩夢。" },
                { name: "吸血鬼巢穴", description: "不死守護者的住所", boxedText: "這裡充滿了奢華的棺材和古老的掛毯。空氣中只有腐敗的香水味。吸血鬼Ctenmiir坐在他的王座上，手裡玩弄著一把漆黑如夜的劍——黑暗刃（Blackrazor）。" },
                { name: "黑暗神殿", description: "黑暗刃安放處", boxedText: "黑暗這裡是有實體的，光線無法穿透。黑暗刃在劍鞘中震動，你感覺到它如飢似渴。它在渴望靈魂。" }
            ],
            transitions: "在顛倒的世界中，奪取最危險的魔劍：\n1. 適應倒轉的重力進行立體戰鬥（敏捷與適應）\n2. 尋找並摧毀吸血鬼隱藏的棺材（調查與宗教）\n3. 抵抗黑暗刃的誘惑，保持理智（意志與魅力）",
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "鏡中世界",
                    situation: "房間裡充滿了鏡子，每個鏡子裡都反射出你的影子，但其中一個影子正對你冷笑。",
                    approaches: [
                        { type: "打破", check: "範圍攻擊", outcome: "打碎所有鏡子，雖受輕傷但消除了幻象" },
                        { type: "辨識", check: "感知/洞察", outcome: "找出唯一的真身，一擊必殺" }
                    ],
                    fail_forward: "影子實體化，變成與隊伍一模一樣的複製人（擁有相同技能），展開鏡像對決。"
                },
                {
                    id: "3-B",
                    title: "黑暗刃的低語",
                    situation: "擊敗吸血鬼後，黑暗刃掉在地上。離它最近的人聽到了承諾力量的低語。",
                    approaches: [
                        { type: "意志", check: "感知豁免 DC 17", outcome: "抵抗誘惑，將劍收入特殊的鉛製劍鞘" },
                        { type: "接受", check: "無", outcome: "拿起劍，獲得強大力量但性格轉變為混亂中立（直到詛咒解除）" }
                    ],
                    fail_forward: "劍控制了角色，攻擊最近的隊友來『餵食』自己。"
                }
            ],
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
                { name: "矮人陵墓", description: "古老的矮人墓地", boxedText: "這裡是榮耀的矮人戰士長眠之地。但克拉普杜克褻瀆了這裡，將戰士的屍體變成了守衛。鍛就命運（Whelm）就被供奉在最後的石棺上。" },
                { name: "鍛就命運祭壇", description: "戰錘安放處", boxedText: "戰錘靜靜地躺在那裡，表面沒有一絲灰塵。它散發著堅定與頑固的氣息。這把武器憎恨地精和巨人，如果你不是矮人，它可能會覺得你不夠格。" },
                { name: "克拉普杜克密室", description: "巫師的巢穴", boxedText: "你們終於見到了幕後黑手。克拉普杜克漂浮在空中，身邊環繞著奧術符文。他看著你們手中的三件神器，露出了滿意的笑容。『實驗結束，現在交出數據。』" }
            ],
            transitions: "最終的考驗，逃離這個瘋狂的實驗室：\n1. 證明自己有資格揮舞矮人神器（體質與歷史）\n2. 識破克拉普杜克的真身與幻象（奧秘與洞察）\n3. 在地牢崩塌前殺出一條血路（全員衝刺）",
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "巨人的保齡球",
                    situation: "一個巨大的走廊，盡頭是一個正在投擲石球的巨人。你們就是保齡球瓶。",
                    approaches: [
                        { type: "衝刺", check: "敏捷/運動", outcome: "在石球間隙中衝刺，滑壘到達巨人腳下" },
                        { type: "護盾", check: "防護法術", outcome: "張開力場牆，硬抗石球的撞擊" }
                    ],
                    fail_forward: "被石球擊中，雖然沒死但被壓扁（移動速度減半），並被推回起點。"
                },
                {
                    id: "4-B",
                    title: "巫師的合約",
                    situation: "克拉普杜克提出一個交易：交出神器，他可以給你們無盡的財富和安全離開的保證。",
                    approaches: [
                        { type: "戰鬥", check: "主動權", outcome: "拒絕交易，直接開戰（Boss戰開始）" },
                        { type: "欺騙", check: "欺瞞 DC 20", outcome: "假裝同意，趁他放鬆警惕時發動偷襲（首輪必定暴擊）" }
                    ],
                    fail_forward: "猶豫不決，克拉普杜克趁機施展『群體暗示術』，迫使意志薄弱者交出武器。"
                }
            ],
            treasures: [
                { name: "鍛就命運（戰錘）", type: "神器", description: "矮人族的傳說武器" },
                { name: "三件武器全收", type: "成就", description: "完成不可能的任務" }
            ],
            opening_text: "最後一條路線通往大地的深處。古老的矮人陵墓守護著「鍛就命運」——一把傳說中屬於矮人英雄的戰錘。但克拉普杜克不會讓你們輕易離開。當你們收集完三件武器時，這位瘋狂巫師現身了。「你們證明了自己的能力，」他說，「現在證明你們能逃出這裡。」"
        }
    ]
};

export default white_plume_mountain;
