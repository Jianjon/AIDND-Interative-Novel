const fallen_fortress = {
    id: 25,
    title: "殞落地堡的領主 (Master of the Fallen Fortress)",
    titleEn: "Master of the Fallen Fortress",
    levels: "1-2",
    synopsis: "矗立在奧泰里海岸上的斜塔『殞落地堡』最近發生了劇烈震動。你們必須進入這座隨時可能崩塌的建築，解救受困的探險者。",
    acts: [
        {
            act: 1,
            title: "地堡攀爬 (Tower Ascent)",
            levelRange: "1",
            objective: "垂直向上探索堡壘的各個樓層，克服崩塌的風險與守護怪獸。",
            keyEvents: [
                "利用繩索或攀爬技巧跨越毀損的樓梯",
                "解決中層的巨型青蛙群",
                "發現受困在岩石間的半身人牧師"
            ],
            endCondition: "玩家抵達堡壘第四層的觀星平臺。",
            npcs: [
                {
                    name: "芬布里克 (Fimbrik)",
                    role: "受困的矮人學者",
                    description: "年邁的學者，被落石困在二樓，正焦急地大喊救命。",
                    dialogue: "別管我的書了！先把我拉出去！這座塔快要撐不住了！"
                }
            ],
            locations: [
                {
                    name: "傾斜的大廳",
                    description: "整個房間向右傾斜了 15 度，地板被海水與泥沙覆蓋，家具散落一地。",
                    boxedText: "地堡內部的空氣潮濕且充滿塵土味。每隔幾分鐘，牆壁就會發出令人不安的格格聲，彷彿這座龐然大物正試圖在沙灘上尋找更舒服的姿勢。"
                }
            ],
            strategic_nodes: [
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
                tactics: "塔格會發出難聞的惡臭來削弱近戰者，並指揮他的幼龍坐騎進行俯衝攻擊。"
            },
            locations: [
                {
                    name: "斷裂的觀星平臺",
                    description: "塔樓的頂端，可以俯瞰整片海岸。這裡沒有牆壁，只有呼嘯的山風與翻滾的浪花。",
                    boxedText: "這就是一切的終點。穴居人首領正揮舞著鏽跡斑斑的巨斧，對著昏迷的囚犯發出吼叫。在牠身後的殘破屋簷上，一隻幼小的翼龍正張開雙翼，準備撲向你們。"
                }
            ]
        }
    ]
};

export default fallen_fortress;
