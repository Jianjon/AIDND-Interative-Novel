const potent_brew = {
    id: 27,
    title: "強力釀造 (A Most Potent Brew)",
    titleEn: "A Most Potent Brew",
    levels: "1-2",
    synopsis: "酒館老闆格羅金恩面遇到了一個大麻煩——地下室出現了冒火的巨型老鼠。這背後似乎隱藏著一個古老的魔法實驗室。",
    acts: [
        {
            act: 1,
            title: "地窖清理 (The Infested Cellar)",
            levelRange: "1",
            objective: "清理酒館地窖中的巨型老鼠，並找出牠們變異的原因。",
            keyEvents: [
                "解決三隻變異的巨型老鼠",
                "發現地窖牆壁上的隱藏裂縫",
                "進入被遺忘的地下實驗室"
            ],
            endCondition: "玩家進入隱藏的實驗室入口。",
            npcs: [
                {
                    name: "格羅金恩 (Glowkindle)",
                    role: "酒館老闆",
                    description: "一位紅鬍子的矮人，對他的酿酒設備比對生命還看重。",
                    dialogue: "你們一定要救救我的地窖！那些老鼠不僅在咬穀物，牠們的毛竟然還在冒火！"
                }
            ],
            locations: [
                {
                    name: "老闆的私人地窖",
                    description: "潮濕陰暗，堆滿了巨大的橡木酒桶。空氣中瀰漫著強烈的麥芽與硫磺味。",
                    boxedText: "當你們走下吱吱作響的木質階梯時，黑暗中亮起了幾對紅色的眼睛。伴隨著絲絲聲，幾隻體型如狗的老鼠從陰影中竄出，牠們身上不時閃爍著細小的火花。"
                }
            ],
            strategic_nodes: [
                {
                    id: "finding_secret",
                    title: "發現暗門",
                    situation: "清理完老鼠後，牆壁的一處裂縫露出了不尋常的金屬光澤。",
                    approaches: [
                        { type: "感知 (Perception)", check: 10, outcome: "你發現裂縫後面是一個古老的圓環把手。" },
                        { type: "調查 (Investigation)", check: 12, outcome: "你意識到這面牆其實是後來加蓋的，後面隱藏著一座實驗室。" }
                    ],
                    fail_forward: "如果你們花費更長時間尋找，也能找到把手，但可能會引來更多老鼠。"
                }
            ]
        },
        {
            act: 2,
            title: "法師的實驗室 (The Wizard's Laboratory)",
            levelRange: "1-2",
            objective: "關閉失控的魔法酿酒裝置，恢復地下的安寧。",
            keyEvents: [
                "破解魔法水晶謎題",
                "擊敗守護實驗室的自動機台",
                "關閉壓力過載的機械"
            ],
            endCondition: "成功關閉機器並向格羅金恩回報。",
            locations: [
                {
                    name: "傳奇實驗室",
                    description: "充滿了閃爍的藍色水晶與複雜的銅管線。中央有一座巨大的銅製反應爐正在劇烈顫動。",
                    boxedText: "這座實驗室被塵土封印了數十年。幾盞魔法燈在你們進入時自動亮起，照亮了一台正在拼命運作的巨大機器。齒輪摩擦的聲音震耳欲聾，紫色的能量在管線間閃爍。"
                }
            ],
            boss: {
                name: "發狂的自動守衛 (Clockwork Guardian)",
                cr: "1/2",
                type: "構築體 (Construct)",
                tactics: "這台小型的發條機器會不斷發出刺耳的警報，並使用噴火口攻擊靠近的入侵者。"
            }
        }
    ]
};

export default potent_brew;
