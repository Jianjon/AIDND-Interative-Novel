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
                "接受鹽沼議會的委託（政治站隊）",
                "搜查宅邸，識破鬧鬼的假象",
                "遭遇間諜奈德 (Ned) 的背叛"
            ],
            endCondition: "玩家發現通往地下的祕密開關，並查明走私真相。",
            npcs: [
                {
                    name: "安德斯 (Anders Solmor)",
                    role: "年輕的保皇派議員",
                    description: "年輕而富有正義感的商人，代表皇室利益。他懷疑這一切與外部勢力有關。",
                    dialogue: "那棟房子一直是我家族的陰影。請查清楚，那裡真的有鬼，還是有人在利用恐懼？",
                    quest: "查清真相並回報給他（獲得皇室聲望）"
                },
                {
                    name: "蓋蘭 (Gellan Primewater)",
                    role: "傳統派議員 / 隱密富豪",
                    description: "穿著華麗的老練政客，代表本地漁民與商人的利益。",
                    dialogue: "小心點，年輕人。有些鬼魂最好讓它安息。如果你們發現了什麼...有趣的貨物，或許可以先跟我談談？",
                    quest: "掩蓋走私證據或將貨物私下交給他（獲得金幣與本地聲望）"
                },
                {
                    name: "奈德 (Ned Shakeshaft)",
                    role: "被綁架者 / 內奸",
                    description: "一個被綁在房子裡的男人，聲稱自己也是冒險者。其實是被雇來誤導你們的。",
                    secrets: "他會在關鍵時刻（比如 Boss 戰或觸發陷阱時）發動背刺。",
                    personality: "狡詐的騙子 (NE)"
                }
            ],
            locations: [
                {
                    name: "宅邸前廳",
                    description: "佈滿蛛絲與腐朽的傢俱。天花板搖搖欲墜，狂風在空蕩的走廊間呼嘯。",
                    boxedText: "門扉在你們推開時發出刺耳的摩擦聲。陰影在長長的走廊盡頭跳動，一陣冷風吹過，似乎有個低沈的聲音在耳邊低語：『離開這裡...』"
                },
                {
                    name: "二樓臥室",
                    description: "奈德被發現的地方",
                    boxedText: "這裡充滿了『魔法』造成的奇怪聲響。一個衣衫襤褸的男人正被綁在角落，大喊著『有鬼！有鬼啊！』但如果你們仔細看，繩結似乎綁得很鬆。"
                }
            ],
            strategic_nodes: [
                {
                    id: "ned_betrayal",
                    title: "奈德的謊言",
                    situation: "奈德試圖將你們引向一個危險的房間（充滿殺傷性黴菌）。",
                    approaches: [
                        { type: "洞察", check: "DC 14", outcome: "注意到他在經過陷阱時會下意識地繞開，識破他的身份" },
                        { type: "威嚇", check: "DC 16", outcome: "逼問他為什麼身上帶著盜賊工具，讓他崩潰招供" }
                    ],
                    fail_forward: "被奈德引入陷阱房間，觸發戰鬥，奈德趁亂偷襲後排法師（第一輪必定暴擊）。"
                }
            ]
        },
        {
            act: 2,
            title: "海鬼號的突襲 (The Sea Ghost)",
            levelRange: "2-3",
            objective: "潛入剛靠岸的走私船『海鬼號』，徹底瓦解走私網。",
            keyEvents: [
                "使用信號燈誘騙船隻靠岸",
                "潛入或突襲海鬼號",
                "發現蜥蜴人武器走私的陰謀"
            ],
            endCondition: "控制船隻，並發現龍巫教參與軍火交易的證據。",
            boss: {
                name: "希格斯船長 (Captain Sigurd)",
                cr: "2",
                type: "類人生物 (Humanoid / Pirate Captain)",
                tactics: "利用船上的纜繩擺蕩移動，並會踢落試圖登船的人。",
                dialogue: "哈！不知死活的陸地老鼠，把他們餵鯊魚！"
            },
            locations: [
                {
                    name: "秘密海穴",
                    description: "宅邸下方的天然洞穴，與大海相連。",
                    boxedText: "鹹濕的海風吹進了這處燈火通明的洞穴。你們看到幾名水手正將貨物搬上一艘停泊的小艇，準備運往外海的母船。"
                },
                {
                    name: "海鬼號甲板",
                    description: "滿載違禁品的雙桅帆船",
                    boxedText: "藉著夜色，你們靠近了這艘幽靈般的船。甲板上只有幾個昏昏欲睡的哨兵，而在貨倉裡，你們聽到了奇怪的嘶嘶聲——那是蜥蜴人的語言。"
                }
            ],
            strategic_nodes: [
                {
                    id: "boarding_strategy",
                    title: "登船計畫",
                    situation: "海鬼號停在近海，你們需要一個完美的突襲計畫。",
                    approaches: [
                        { type: "欺瞞/偽裝", check: "DC 15", outcome: "穿上走私者的衣服，打出正確的燈光信號，大搖大擺地上船" },
                        { type: "隱匿/游泳", check: "DC 13", outcome: "從船尾攀爬鎖鏈上船，在敵人反應過來前控制甲板" }
                    ],
                    fail_forward: "被哨兵發現，警鐘響起，船上的蜥蜴人戰士 (3名) 加入戰鬥，難度劇增。"
                },
                {
                    id: "lizardfolk_discovery",
                    title: "意外的乘客",
                    situation: "在貨倉中發現了購買武器的蜥蜴人使者。這是一個外交危機還是機會？",
                    approaches: [
                        { type: "語言/說服", check: "DC 16", outcome: "用龍語與蜥蜴人溝通，發現他們買武器是為了對抗薩胡吉人 (Sahuagin)，而非攻擊人類" },
                        { type: "戰鬥", check: "無", outcome: "殺死所有目擊者，獲得蜥蜴人王族的寶石（但會與蜥蜴人部落結仇）" }
                    ],
                    fail_forward: "語言不通引發誤會，蜥蜴人認為你們是來搶劫的，加入混戰。事後發現一份外交文書，顯示這是一場悲劇。"
                }
            ],
            treasures: ["海鬼號 (如果不燒掉的話)", "走私貨物 (絲綢與白蘭地)", "蜥蜴人的寶石支付款"],
            opening_text: "根據從鬼屋找到的信號代碼，走私船『海鬼號』今晚將會靠岸。這不僅是抓住罪犯的機會，更是一場關於財富與名聲的賭博。安德斯議員希望你們扣押船隻，而蓋蘭議員暗示希望能讓這艘船『消失』。此外，據說這艘船上還載著一批特殊的『乘客』。"
        }
    ]
};

export default saltmarsh;
