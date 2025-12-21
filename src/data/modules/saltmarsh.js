const saltmarsh = {
    id: 23,
    title: "鹽沼的險惡祕密 (The Sinister Secret of Saltmarsh)",
    titleEn: "The Sinister Secret of Saltmarsh",
    levels: "1-3",
    synopsis: "鹽沼鎮邊緣那棟破舊且充滿神祕聲響的宅邸，傳聞有鬼魂出沒。但背後埋藏的真相遠比幽靈更為危險。",
    acts: [
        {
            act: 1,
            title: "鬼屋的背後 (The Haunted House)",
            levelRange: "1-2",
            objective: "進入廢棄宅邸，找出引發幽靈傳聞的真實原因。",
            keyEvents: [
                "搜查宅邸一樓，避開地板陷阱",
                "在二樓遭遇虛假的靈異現象",
                "發現通往地下室的隱藏通道"
            ],
            endCondition: "玩家發現通往地下的祕密開關。",
            npcs: [
                {
                    name: "安德斯 (Anders Solmor)",
                    role: "年輕議會成員",
                    description: "年輕而富有正義感的商人，提供這項調查委託。",
                    dialogue: "那棟房子一直是我家族的陰影。請查清楚，那裡真的有鬼，還是有人在利用恐懼？"
                }
            ],
            locations: [
                {
                    name: "宅邸前廳",
                    description: "佈滿蛛絲與腐朽的傢俱。天花板搖搖欲墜，狂風在空蕩的走廊間呼嘯。",
                    boxedText: "門扉在你們推開時發出刺耳的摩擦聲。陰影在長長的走廊盡頭跳動，一陣冷風吹過，似乎有個低沈的聲音在耳邊低語：『離開這裡...』"
                }
            ],
            strategic_nodes: [
                {
                    id: "trap_floor",
                    title: "腐朽的地板",
                    situation: "通往客廳的走廊地板看起來極不穩定。",
                    approaches: [
                        { type: "敏捷 (Acrobatics)", check: 13, outcome: "你輕巧地踏在支撐樑上，安全通過。" },
                        { type: "感知 (Perception)", check: 11, outcome: "你注意到受潮變色的木板，避開了脆弱區域。" }
                    ],
                    fail_forward: "如果你們掉下去了，雖然會造成輕微傷害，但會直接掉入地窖的一個儲藏室，提前發現線索。"
                }
            ]
        },
        {
            act: 2,
            title: "走私者的洞穴 (The Smugglers' Cave)",
            levelRange: "2-3",
            objective: "肅清宅邸地下的走私基地，捉拿首領桑巴雷。",
            keyEvents: [
                "在實驗室發現煉金術師的筆記",
                "在海蝕洞中遭遇走私者伏擊",
                "擊敗桑巴雷並回收非法物資"
            ],
            endCondition: "首領桑巴雷被擊敗或逃跑，走私活動停止。",
            boss: {
                name: "桑巴雷 (Sanbalet)",
                cr: "2",
                type: "類人生物 (Humanoid / Illusionist)",
                tactics: "他會優先使用隱形術或幻術來分散你們的注意力，然後從遠處發射魔法飛彈。"
            },
            locations: [
                {
                    name: "秘密海穴",
                    description: "宅邸下方的天然洞穴，與大海相連。幾艘划艇停靠在沙灘上，堆放著大量的桶裝貨物。",
                    boxedText: "鹹濕的海風吹進了這處燈火通明的洞穴。你們可以看到幾名全副武裝的男子正在搬運箱子，一名穿著華麗長袍的男子正對著一張海圖比劃著。"
                }
            ]
        }
    ]
};

export default saltmarsh;
