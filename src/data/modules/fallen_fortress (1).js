const fallen_fortress = {
    id: 25,
    title: "殞落地堡的領主 (Master of the Fallen Fortress)",
    titleEn: "Master of the Fallen Fortress",
    levels: "1-2",
    synopsis: "矗立在奧泰里海岸上的斜塔『殞落地堡』最近發生了劇烈震動。你們必須進入這座隨時可能崩塌的建築，解救受困的探險者。",
    acts: [
        {
            act: 1,
            title: "搖搖欲墜的塔樓 (The Shaking Tower)",
            levelRange: "1",
            objective: "垂直向上探索堡壘的各個樓層，克服崩塌的風險與守護怪獸。",
            keyEvents: [
                "利用繩索或攀爬技巧跨越毀損的樓梯",
                "遭遇趕來掠奪的競爭對手",
                "在時限內救援受困者"
            ],
            endCondition: "玩家抵達堡壘第四層的觀星平臺。",
            mechanics: "【崩塌倒數】每經過 10 分鐘（或 2 個事件），塔樓會劇烈震動，所有玩家需進行敏捷豁免，失敗則被落石擊中 (1d6) 或跌倒。",
            npcs: [
                {
                    name: "芬布里克 (Fimbrik)",
                    role: "受困的矮人學者",
                    description: "年邁的學者，被落石困在二樓，正焦急地大喊救命。",
                    dialogue: "別管我的書了！先把我拉出去！這座塔快要撐不住了！"
                },
                {
                    name: "「紅狼」巴爾古斯",
                    role: "競爭對手隊長",
                    description: "一名粗魯的半獸人戰士，帶領著一隊傭兵。他們不在乎救人，只想搶在塔倒前搜刮寶物。",
                    dialogue: "滾開！這裡的東西都是我們的！想活命就別擋路！",
                    personality: "貪婪且魯莽 (NE)"
                }
            ],
            locations: [
                {
                    name: "傾斜的大廳",
                    description: "整個房間向右傾斜了 15 度，地板被海水與泥沙覆蓋，家具散落一地。",
                    boxedText: "地堡內部的空氣潮濕且充滿塵土味。每隔幾分鐘，牆壁就會發出令人不安的格格聲，彷彿這座龐然大物正試圖在沙灘上尋找更舒服的姿勢。"
                },
                {
                    name: "二樓圖書室",
                    description: "曾經的知識殿堂，現在大半已崩塌",
                    boxedText: "書架像骨牌一樣倒塌，壓住了幾具屍體——看起來是剛死不久的。你們聽到了金屬碰撞聲，似乎有人捷足先登了。"
                }
            ],
            strategic_nodes: [
                {
                    id: "rival_encounter",
                    title: "狹路相逢",
                    situation: "在狹窄的樓梯間，你們遇到了巴爾古斯的隊伍。他們正試圖撬開一個寶箱。",
                    approaches: [
                        { type: "威嚇/說服", check: "DC 14", outcome: "指出塔樓即將倒塌，提議暫時停戰各自搜索" },
                        { type: "戰鬥", check: "戰術優勢", outcome: "在狹窄地形利用長兵器或推撞將敵人推下樓梯" }
                    ],
                    fail_forward: "談判破裂，雙方在搖晃的樓梯上混戰。戰鬥聲引發了新的震動，部分樓梯崩落，雙方都被迫分開尋找新路。"
                },
                {
                    id: "exterior_climb",
                    title: "繞道外部",
                    situation: "通往三樓的階梯完全斷裂了。",
                    approaches: [
                        { type: "力量 (Athletics)", check: 14, outcome: "你強有力的手臂拉著夥伴們翻上了破損的地板。" },
                        { type: "敏捷 (Acrobatics)", check: 12, outcome: "你利用塔外的凸起石塊，輕靈地繞過了斷裂處。" }
                    ],
                    fail_forward: "如果你們失敗並跌落，雖然會損失一些體力，但會發現一條隱藏在瓦礫下的通風道，同樣能登頂。"
                }
            ]
        },
        {
            act: 2,
            title: "地堡的領主 (The Master of the Tower)",
            levelRange: "1-2",
            objective: "擊敗佔據塔頂的穴居人首領，並安全撤離所有生還者。",
            keyEvents: [
                "在狂風大作的露台上作戰",
                "對抗首領的寵物幼龍",
                "在塔樓最終崩塌前跳海逃生"
            ],
            endCondition: "擊敗首領並成功下塔，地堡徹底沉沒。",
            boss: {
                name: "塔格 (Taug)",
                cr: "1",
                type: "類人生物 (Humanoid / Troglodyte Leader)",
                tactics: "塔格會發出難聞的惡臭來削弱近戰者 (體質豁免)，並試圖將靠近邊緣的玩家推下去。他騎著一隻白色的幼龍。",
                special: "如果戰鬥超過 5 輪，塔樓會開始崩解，每輪都必須進行敏捷豁免。"
            },
            locations: [
                {
                    name: "斷裂的觀星平臺",
                    description: "塔樓的頂端，可以俯瞰整片海岸。這裡沒有牆壁，只有呼嘯的山風與翻滾的浪花。",
                    boxedText: "這就是一切的終點。穴居人首領正揮舞著鏽跡斑斑的巨斧，對著被捆綁的「紅狼」巴爾古斯（如果他之前活下來了）發出吼叫。在牠身後的殘破屋簷上，一隻幼小的翼龍正張開雙翼，準備撲向你們。"
                }
            ],
            strategic_nodes: [
                {
                    id: "boss_environment",
                    title: "利用地形",
                    situation: "觀星台邊緣支離破碎，塔格站在不穩定的石板上。",
                    approaches: [
                        { type: "力量/推撞", check: "對抗檢定", outcome: "將塔格推向脆弱的邊緣，讓他失去平衡甚至跌落" },
                        { type: "遠程/破壞", check: "AC 12", outcome: "射斷支撐幼龍棲木的繩索，讓幼龍受驚飛走或壓住塔格" }
                    ],
                    fail_forward: "嘗試破壞地形失敗，反而讓自己站立的區域崩塌，你掛在懸崖邊緣，需要隊友救援。"
                },
                {
                    id: "final_escape",
                    title: "信仰之躍",
                    situation: "擊敗Boss後，塔樓終於發出了最後的哀鳴，開始向海面傾倒。",
                    approaches: [
                        { type: "敏捷/特技", check: "DC 10", outcome: "在塔樓倒塌的瞬間跳入深水區，安全撤離" },
                        { type: "法術/羽落術", check: "自動成功", outcome: "優雅地飄落，還順手接住了芬布里克遺落的古書" }
                    ],
                    fail_forward: "跳躍時機稍晚，被瓦礫擊中 (2d6 傷害) 墜海，雖然存活但所有重甲和重物都必須丟棄以免溺水。"
                }
            ],
            treasures: ["塔格的元素戰斧 (+1, 每10次攻擊造成額外雷鳴傷害)", "芬布里克的感謝信 (可換取魔法捲軸)", "紅狼的傭兵徽章"]
        }
    ]
};

export default fallen_fortress;
