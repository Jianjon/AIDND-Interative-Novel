const potent_brew = {
    id: 27,
    title: "強力釀造 (A Most Potent Brew)",
    titleEn: "A Most Potent Brew",
    levels: "1-2",
    synopsis: "酒館老闆格羅金恩面遇到了一個大麻煩——地下室出現了冒火的巨型老鼠。這背後似乎隱藏著一個古老的魔法實驗室。",
    acts: [
        {
            act: 1,
            title: "地窖的火花 (The Spark in the Cellar)",
            levelRange: "1",
            objective: "清理酒館地窖中的便異巨鼠，並找出牠們會噴火的原因。",
            keyEvents: [
                "遭遇火焰巨鼠 (Giant Fire Rats)",
                "利用洩漏的酒桶製造環境陷阱",
                "發現被隱藏的煉金實驗室入口"
            ],
            endCondition: "玩家進入隱藏的實驗室入口。",
            npcs: [
                {
                    name: "格羅金恩 (Glowkindle)",
                    role: "酒館老闆 / 業餘煉金術士",
                    description: "一位紅鬍子的矮人，對他的酿酒設備比對生命還看重。他看起來有些心虛。",
                    dialogue: "你們一定要救救我的地窖！那些老鼠...呃，牠們可能喝了一點我正在實驗的『特製』辣味啤酒...好吧，是易爆藥水。",
                    secrets: "他試圖用魔法釀造出世界上最強烈的烈酒，結果意外製造出了煉金廢料，汙染了地下水源。",
                    interaction: "如果玩家答應保密，他會提供免費的『格羅金恩特釀』(回復 1d4 HP 但會宿醉)。"
                }
            ],
            locations: [
                {
                    name: "老闆的私人地窖",
                    description: "潮濕陰暗，堆滿了巨大的橡木酒桶。空氣中瀰漫著強烈的麥芽與硫磺味。",
                    boxedText: "當你們走下階梯，黑暗中亮起了幾對紅色的眼睛。這些不是普通的老鼠——牠們的皮毛上跳動著橘紅色的火花。一隻老鼠咬破了旁邊的酒桶，流出的液體瞬間被牠身上的熱度點燃！"
                }
            ],
            strategic_nodes: [
                {
                    id: "barrel_trap",
                    title: "酒桶戰術",
                    situation: "地窖裡堆滿了易燃的烈酒桶，這既是危險也是武器。",
                    approaches: [
                        { type: "力量", check: "DC 12", outcome: "推倒酒桶衝撞鼠群，造成範圍傷害並擊倒" },
                        { type: "遠程攻擊", check: "AC 10", outcome: "射破漏油的酒桶，製造一片燃燒區域阻擋老鼠進攻" }
                    ],
                    fail_forward: "酒桶破裂方向錯誤，烈酒流向隊伍，下回合該區域會起火，迫使隊伍移動。"
                },
                {
                    id: "finding_secret",
                    title: "熱源追蹤",
                    situation: "清理完老鼠後，你們發現牆壁的縫隙中透出不自然的熱氣與光芒。",
                    approaches: [
                        { type: "調查", check: "DC 12", outcome: "發現這面牆是假的，機關藏在一個空的酒瓶架後面" },
                        { type: "自然/奧秘", check: "DC 14", outcome: "判斷出這些變異源自更深處的強烈魔法輻射" }
                    ],
                    fail_forward: "花費較長時間暴力破牆，驚動了內部的守衛系統（下一場戰鬥敵人無法被突襲）。"
                }
            ],
            encounters: ["火焰巨鼠 (攻擊附帶 1d4 火傷)", "巨型蜈蚣"],
            treasures: ["格羅金恩的特釀", "少量金幣"]
        },
        {
            act: 2,
            title: "釀造大師的實驗室 (The Alchemist's Lab)",
            levelRange: "1-2",
            objective: "關閉失控的魔法酿酒裝置，恢復地下的安寧。",
            keyEvents: [
                "解開元素管道謎題",
                "對抗煉金魔像",
                "緊急關閉過載的反應爐"
            ],
            endCondition: "成功關閉機器並向格羅金恩回報。",
            locations: [
                {
                    name: "傳奇實驗室",
                    description: "充滿了閃爍的藍色水晶與複雜的銅管線。中央有一座巨大的銅製反應爐正在劇烈顫動。",
                    boxedText: "這是一個被遺忘的瘋狂實驗室。巨大的銅製蒸餾器佔據了房間中央，三根透明的管子分別輸送著紅色（火）、藍色（冰）和黃色（雷）的液體。一台看起來像是用酒桶和銅管拼湊成的機器人正守護著這裡，它的眼睛閃爍著不穩定的光芒。"
                }
            ],
            boss: {
                name: "釀造守衛 (Brew Guardian)",
                cr: "1",
                type: "構築體 (Construct)",
                tactics: "這台機器人會隨機切換『口味』模式：噴射火焰（錐形火傷）、急凍氣體（單體定身）或高壓啤酒（擊退）。",
                weakness: "如果玩家破壞了對應顏色的輸送管，它會失去該種攻擊模式。"
            },
            strategic_nodes: [
                {
                    id: "pipeline_puzzle",
                    title: "切斷供給",
                    situation: "反應爐依靠三色元素液體運作，切斷管線可以削弱 Boss。",
                    approaches: [
                        { type: "盜賊工具/靈巧", check: "DC 14", outcome: "精準地關閉閥門，使 Boss 無法使用特殊攻擊" },
                        { type: "力量", check: "AC 12", outcome: "直接砸斷管線，但洩漏的元素液體會造成範圍傷害與地形改變" }
                    ],
                    fail_forward: "管線破裂噴發，雖然切斷了 Boss 的供給，但全場充滿了隨機的魔法煙霧（每回合隨機效果）。"
                },
                {
                    id: "shutdown_sequence",
                    title: "緊急在過載前關閉",
                    situation: "戰鬥結束後，機器即將爆炸。",
                    approaches: [
                        { type: "智力/奧秘", check: "DC 13", outcome: "按照正確順序冷卻核心，安全關閉" },
                        { type: "敏捷/運動", check: "DC 10", outcome: "在爆炸前抱著戰利品全速撤離" }
                    ],
                    fail_forward: "機器發生小規模爆炸，每人受到 2d6 傷害，實驗室被毀，部分戰利品損壞。"
                }
            ],
            treasures: ["煉金術士的護目鏡 (+1 調查)", "一箱未標記的魔法藥水 (隨機效果)", "法術卷軸 (油膩術)"]
        }
    ]
};

export default potent_brew;
