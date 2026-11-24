const expedition_barrier_peaks = {
    id: "expedition_barrier_peaks",
    title: "屏障山脈的失落尖塔",
    titleEn: "The Lost Spire of Barrier Peaks",
    levels: "8-12",
    startLevel: 8,
    synopsis: "一座來自遠古魔法帝國（如耐色瑞爾）的浮空城墜毀在山脈中。冒險者將探索這座充滿魔法構裝體與失控奧術實驗的遺跡。",
    setting: "屏障山脈",
    acts: [
        {
            act: 1,
            title: "金屬與符文之門",
            titleEn: "Gates of Adamantine",
            levelRange: "8-9",
            objective: "進入被魔法封印的墜落尖塔",
            keyEvents: ["構裝體守衛", "奧術符文解謎", "古代防禦系統", "魔法瘟疫"],
            npcs: [
                { name: "考古學家", role: "NPC", description: "研究古代文字的學者" }
            ],
            locations: [
                { name: "尖塔裂口", description: "浮空城墜落造成的巨大撞擊坑", boxedText: "這不是普通的洞穴。眼前的金屬壁由精金鍛造，刻滿了發光的奧術符文。這是一座墜毀的古代浮空城。空氣中瀰漫著魔力過載的刺痛感。入口處的雕像並非死物，它們轉動著寶石般的眼睛，守護著千年前的秘密。" },
                { name: "前廳大堂", description: "古代法師接待外賓的地方", boxedText: "地面鋪著永不染塵的大理石。懸浮的光球依然在空中飄蕩，但許多已經閃爍不定。這裡躺著一些探險者的屍體，他們身上的裝備被某種力場撕裂了。" }
            ],
            transitions: "揭開古代魔法文明的面紗：\n1. 辨識並繞過門口的奧術警報結界（奧秘與解除魔法）\n2. 對抗依然在執行巡邏任務的發條守衛（戰鬥與弱點分析）\n3. 激活破損的傳送法陣以進入內部（智力與魔法灌注）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "發條魔像",
                    situation: "一個巨大的鐵魔像擋住了路，它的核心水晶已經破裂，處於狂暴狀態。",
                    approaches: [
                        { type: "修復", check: "工匠工具/修復術", outcome: "暫時穩定了魔像的邏輯迴路，它會讓開道路" },
                        { type: "破壞", check: "高傷害", outcome: "將其拆解，獲得核心水晶（可作為魔法炸彈）" }
                    ],
                    fail_forward: "魔像自爆，對全員造成力場傷害，並炸塌了走廊，必須尋找通風管繞路。"
                },
                {
                    id: "1-B",
                    title: "符文鎖",
                    situation: "一道大門上有七個顏色的寶石槽，必須按正確順序點亮。",
                    approaches: [
                        { type: "解讀", check: "歷史/語言", outcome: "閱讀牆上的古詩，推導出顏色對應的魔法學派順序" },
                        { type: "強擊", check: "叩擊術", outcome: "耗費法術位強行衝開門鎖" }
                    ],
                    fail_forward: "觸發陷阱，被傳送到一個充滿『反重力場』的房間，所有人飄在空中戰鬥。"
                }
            ],
            encounters: ["失控構裝體", "魔法元素", "奧術軟泥怪"],
            treasures: ["充能魔杖", "精金碎片", "符文鑰匙（低級）"],
            endCondition: "成功進入尖塔內部層",
            opening_text: "屏障山脈深處傳來奇異的藍光。傳說那是神明的居所，或是惡魔的巢穴。當你們抵達時，發現真相更為驚人——一座巨大的、由金屬和水晶構成的尖塔斜插在山體中。它是數千年前魔法帝國的遺產，一座墜落的浮空城。儘管歲月流逝，內部的魔法核心仍在運轉，等待著無知者的觸碰。"
        },
        {
            act: 2,
            title: "禁忌圖書館與工坊",
            titleEn: "The Arcane Halls",
            levelRange: "9-10",
            objective: "探索魔法工坊，獲取古代裝備",
            keyEvents: ["活體法術", "魔像鑄造廠", "附魔武器庫", "瘋狂的靈魂"],
            npcs: [
                { name: "塔靈（受損）", role: "系統", description: "尖塔的人工智能/魔法意識" },
                { name: "被困的幽靈大法師", role: "NPC", description: "渴望解脫的古代靈魂" }
            ],
            locations: [
                { name: "靜滯室", description: "古代法師的冬眠/封印地", boxedText: "水晶棺材中封印著古代的大法師，他們的面容栩栩如生。警告符文寫著：『切勿喚醒被虛空觸碰者』。" },
                { name: "魔像鑄造廠", description: "自動生產構裝體的地方", boxedText: "巨大的鐵砧自動錘打著燒紅的金屬。元素精靈被強制束縛在熔爐中提供動力。這裡不僅生產士兵，還生產僕人。" },
                { name: "附魔武器庫", description: "存放實驗性魔法武器的地方", boxedText: "這裡展示的武器與外界不同。有些劍刃由純粹的光芒構成（光劍？不，是陽炎劍），有些手套可以發射魔力飛彈。這是奧術與戰爭的完美結合。" }
            ],
            transitions: "掌握失落的奧術技藝：\n1. 與塔靈溝通，獲取進入武器庫的權限（說服與奧秘）\n2. 在鑄造廠與被束縛的火元素談判或戰鬥（語言與威嚇）\n3. 試用實驗性魔杖，小心過載爆炸（敏捷與幸運）",
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "瘋狂實驗體",
                    situation: "一個被魔法改造的奇美拉逃出了籠子，它身上融合了多種怪物的特徵。",
                    approaches: [
                        { type: "安撫", check: "動物馴養/自然", outcome: "意識到它很痛苦，施展治療術讓它平靜（避免戰鬥）" },
                        { type: "放逐", check: "放逐術", outcome: "將其送回原本的位面" }
                    ],
                    fail_forward: "奇美拉發出心靈尖嘯，全隊震懾（Stunned）一回合。"
                },
                {
                    id: "2-B",
                    title: "光輝戰甲",
                    situation: "一套由力場和秘銀構成的盔甲懸浮在展示櫃中（類似動力裝甲，但魔法版）。",
                    approaches: [
                        { type: "穿戴", check: "智力（奧秘知識）", outcome: "成功與盔甲同調，獲得護盾術與飛行能力" },
                        { type: "拆解", check: "工匠工具", outcome: "拆下核心的『飛行寶石』，鑲嵌在自己的裝備上" }
                    ],
                    fail_forward: "盔甲排斥使用者，釋放閃電衝擊，使用者受到電擊傷害並麻痺。"
                }
            ],
            encounters: ["活化咒語", "盾衛者", "奇美拉變異體"],
            treasures: ["陽炎劍（光劍風格）", "力場護盾護腕", "符文鑰匙（中級）"],
            endCondition: "獲得關鍵道具，前往核心層",
            opening_text: "尖塔的中層是魔法師們工作的地方。這裡沒有齒輪和蒸汽，只有無聲運轉的符文陣列。你們發現，這座城市墜落的原因是一場失控的實驗——他們試圖將異界生物的力量注入武器。現在，這些『活體武器』在走廊中遊蕩，尋找著新的主人，或者獵物。"
        },
        {
            act: 3,
            title: "破碎的核心",
            titleEn: "The Shattered Mythallar",
            levelRange: "10-12",
            objective: "穩定或摧毀魔法核心，阻止爆炸",
            keyEvents: ["虛空入侵", "核心異變", "最終抉擇", "逃離尖塔"],
            npcs: [
                { name: "虛空領主", role: "Boss", description: "從裂縫中鑽出的異界生物", cr: 12 },
                { name: "塔靈（完全體）", role: "系統", description: "試圖啟動自毀程序的守護者" }
            ],
            locations: [
                { name: "變異實驗室", description: "禁忌的研究室", boxedText: "這裡的空間是扭曲的。牆壁上有眼睛在眨動，書本長出了牙齒。這是接觸『遠土（Far Realm）』的後果。" },
                { name: "生態園區", description: "模擬不同位面環境的區域", boxedText: "一個房間是充滿岩漿的火元素位面，下一個是反重力的風元素位面。你們必須在位面間跳躍前進。" },
                { name: "密瑟能核（Mythallar）", description: "尖塔的動力源", boxedText: "一顆巨大的、如同微型太陽般的魔法球體懸浮在深淵之上。它裂開了一道縫隙，紫色的虛空能量正在洩漏。那個恐怖的生物——虛空領主，正在吸食核心的能量。" }
            ],
            boss: { name: "虛空領主", cr: 12, type: "異怪", abilities: ["心靈震爆", "現實扭曲", "觸手攻擊"], tactics: "利用扭曲的魔法環境戰鬥" },
            transitions: "直面魔法的代價，封印遠古災難：\n1. 利用實驗室的裝置製作『虛空禁錮』護符（奧秘與工具）\n2. 在生態園區利用環境傷害對付虛空生物（戰術與位面知識）\n3. 決定是修復核心讓尖塔重新升空，還是引爆它（道德抉擇）",
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "魔網撕裂",
                    situation: "核心周圍的魔法極度不穩定，施法會引發狂野魔法（Wild Magic）。",
                    approaches: [
                        { type: "控制", check: "施法屬性檢定", outcome: "專注壓制狂野波動，正常施法" },
                        { type: "利用", check: "無", outcome: "冒著變羊/爆炸的風險施法，法術效果翻倍" }
                    ],
                    fail_forward: "法術反噬，施法者失去一個最高環位的法術位。"
                },
                {
                    id: "3-B",
                    title: "最後的指令",
                    situation: "塔靈認定所有入侵者都是威脅，準備啟動『淨化協議』（毒氣/魔像圍攻）。",
                    approaches: [
                        { type: "智取", check: "智力/歷史", outcome: "說出古代密碼（如『Klaatu Barada Nikto』的變體），獲得塔靈控制權" },
                        { type: "強拆", check: "戰鬥", outcome: "摧毀控制水晶，塔靈沉默，但防禦系統也會無差別攻擊" }
                    ],
                    fail_forward: "控制失敗，重力系統失效，所有人進入失重戰鬥狀態。"
                }
            ],
            encounters: ["眼魔", "奪心魔", "虛空異怪", "最終Boss"],
            treasures: [
                { name: "密瑟能核碎片", type: "神器", description: "無限魔力的碎片" },
                { name: "大法師法袍", type: "裝備", description: "傳說級法師護甲" }
            ],
            endCondition: "解決虛空威脅，決定尖塔命運",
            opening_text: "核心區域是理智的邊緣。古人試圖從虛空中汲取力量，結果引狼入室。密瑟能核（Mythallar）不僅維持著尖塔的懸浮，也成了一道通往恐怖領域的門戶。虛空領主已經跨過了一半，如果不阻止它，整座山脈都將被吞噬。你們手中的武器在顫抖，不是因為恐懼，而是因為周圍魔力的共鳴。這是最後的戰鬥。"
        }
    ]
};

export default expedition_barrier_peaks;
