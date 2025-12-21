const frozen_sick = {
    id: 24,
    title: "寒冬之疾 (Frozen Sick)",
    titleEn: "Frozen Sick",
    levels: "1-3",
    synopsis: "科羅納村爆發了一種神祕疾病，受害者會完全變成冰雕。你們必須在疫情擴散前找到傳說中的古老解藥。",
    acts: [
        {
            act: 1,
            title: "冰冷的調查 (The Cold Investigation)",
            levelRange: "1",
            objective: "在科羅納村尋找神祕病源的線索，並查出第一位受害者的死因。",
            keyEvents: [
                "拜訪村長埃羅，瞭解病情進展",
                "在小屋中檢查受害者的遺物",
                "與矮人尋寶者談判，獲取遺跡位置"
            ],
            endCondition: "玩家確定病源來自北方的冰雪島嶼並準備啟程。",
            npcs: [
                {
                    name: "埃羅 (Elro Aldataur)",
                    role: "村長 / 退休探險家",
                    description: "嚴肅的精靈官員，雖然年邁但依然散發著威嚴。",
                    dialogue: "我們的人正在慢慢變成冰塊。如果這不是詛咒，那就是某種我們無法理解的邪惡魔法。"
                }
            ],
            locations: [
                {
                    name: "科羅納村廣塲",
                    description: "街道被白雪覆蓋，中央鐘樓旁站著幾尊神情驚恐的『冰雕』。",
                    boxedText: "當你們進入村莊時，迎接你們的不是熱情的笑容，而是令人窒息的沈默。幾個村民正對著中央的冰雕祈禱，那是他們昨天還在說笑的朋友。"
                }
            ],
            strategic_nodes: [
                {
                    id: "inspect_body",
                    title: "檢查冰封屍體",
                    situation: "受害者的皮膚上覆蓋著一層淡藍色的晶體。",
                    approaches: [
                        { type: "醫藥 (Medicine)", check: 12, outcome: "你確認這不是普通的凍傷，而是某種魔法生化毒素。" },
                        { type: "奧法 (Arcana)", check: 14, outcome: "你辨認出這是古代艾歐里亞 (Aeor) 時期的魔法殘餘。" }
                    ],
                    fail_forward: "如果你們失敗了，雖然無法得知具體來源，但依然能從屍體口袋裡的殘留藥劑瓶找到線索。"
                }
            ]
        },
        {
            act: 2,
            title: "艾歐里亞的遺跡 (The Salsvault Ruins)",
            levelRange: "2-3",
            objective: "深入危險的海灣暗礁，從古代實驗室中奪回解藥。",
            keyEvents: [
                "穿越暴風雪覆蓋的荒野",
                "避開實驗室中的自動防禦陷阱",
                "在控制室與腐化的守護者對決"
            ],
            endCondition: "取得解藥並返回科羅納村。",
            boss: {
                name: "費羅爾博士 (Dr. Ferol Sal)",
                cr: "2",
                type: "亡靈 (Undead / Wight Scientist)",
                tactics: "這名執迷於研究的亡靈科學家會操作實驗室的毒氣噴霧，並指揮剩餘的殭屍進行攻擊。"
            },
            locations: [
                {
                    name: "薩斯地窖 (Salsvault)",
                    description: "隱藏在冰川深處的魔法實驗室，充滿了漂浮的發光水晶與破碎的培養槽。",
                    boxedText: "冰層在這裡裂開，露出了鋼鐵與水晶構成的牆壁。一陣陣低沈的蜂鳴聲在地底下迴盪，那是沉睡了千年的防禦系統正在重新啟動。"
                }
            ]
        }
    ]
};

export default frozen_sick;
