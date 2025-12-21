const against_the_giants = {
    id: "against_the_giants",
    title: "對抗巨人",
    titleEn: "Against the Giants",
    levels: "8-14",
    startLevel: 8,
    synopsis: "經典的巨人三部曲。冒險者被派遣調查巨人襲擊事件，逐步深入山丘、霜與火巨人的據點，最終發現幕後黑手是卓爾精靈。",
    setting: "劍灣山區",
    acts: [
        {
            act: 1,
            title: "山丘巨人酋長",
            titleEn: "Steading of the Hill Giant Chief",
            levelRange: "8-9",
            objective: "突襲山丘巨人酋長的莊園",
            keyEvents: ["莊園滲透", "酋長對決", "霜巨人線索", "奴隸解救"],
            npcs: [
                { name: "諾斯納酋長", role: "Boss", description: "山丘巨人的肥胖領袖", cr: 9 },
                { name: "被俘的矮人", role: "被救者", description: "可以提供情報的俘虜" }
            ],
            locations: [
                { name: "山丘巨人莊園", description: "巨大粗糙的木製要塞", boxedText: "巨大的木門後傳來震耳欲聾的喧鬧聲。數十個身高過丈的山丘巨人正在狂飲爛醉，桌上堆滿了烤全牛和被打劫來的酒桶。空氣中充滿了令人作嘔的汗臭味和油脂味。這裡是野蠻的極致。" },
                { name: "奴隸牢籠", description: "俘虜關押處", boxedText: "這裡陰暗潮濕，關押著數十名人類、精靈和矮人俘虜。守衛是一群無聊的食人魔，他們正用骨頭殘渣挑逗飢餓的囚犯。" }
            ],
            transitions: "面對數量龐大的巨人軍團，正面硬拚是下策：\n1. 偽裝成巨人傭兵混入宴會（欺瞞與表演）\n2. 從廚房下水道潛入地牢發動起義（隱匿與領導力）\n3. 利用巨人醉酒的機會進行暗殺（刺殺與毒藥）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "巨人的宴會",
                    situation: "諾斯納酋長正在宴請他的部下，這是戰鬥力最強但警覺性最低的時刻。",
                    approaches: [
                        { type: "戰鬥", check: "戰術", outcome: "利用吊燈和桌子製造混亂，分割戰場逐個擊破" },
                        { type: "社交", check: "DC 16", outcome: "挑起巨人之間的內鬨，讓他們自相殘殺" }
                    ],
                    fail_forward: "被發現後，巨人吹響號角，全堡壘的敵人都會湧向大廳（極限生存模式）。"
                },
                {
                    id: "1-B",
                    title: "獸人奴隸",
                    situation: "一群被奴役的獸人正在搬運酒桶，他們眼中閃爍著對巨人的仇恨。",
                    approaches: [
                        { type: "交涉", check: "DC 14", outcome: "說服獸人反叛，獲得一支臨時的敢死隊" },
                        { type: "威嚇", check: "DC 12", outcome: "嚇跑他們，避免他們報警" }
                    ],
                    fail_forward: "獸人因恐懼而大聲尖叫，引來了附近的巨人巡邏隊。"
                }
            ],
            treasures: ["巨人寶藏", "霜巨人信件"],
            endCondition: "擊敗諾斯納，獲得霜巨人線索",
            opening_text: "山丘巨人的襲擊越來越頻繁。村莊被掠奪，商隊被毀滅。國王派遣你們找出原因並加以阻止。線索指向諾斯納酋長的莊園——一座建在荒野中的巨大木製要塞。莊園內有數十名山丘巨人，還有他們的狼群和食人魔僕從。這是一場危險的滲透任務。"
        },
        {
            act: 2,
            title: "霜巨人雅爾",
            titleEn: "Glacial Rift of the Frost Giant Jarl",
            levelRange: "9-11",
            objective: "深入冰川裂隙，擊敗霜巨人雅爾",
            keyEvents: ["冰川要塞", "雅爾對決", "火巨人線索", "白龍威脅"],
            npcs: [
                { name: "格魯格納姆雅爾", role: "Boss", description: "霜巨人的殘暴領袖", cr: 12 },
                { name: "白龍", role: "Boss", description: "居住在冰川中的古龍", cr: 13 }
            ],
            locations: [
                { name: "冰川裂谷", description: "充滿危險的自然環境", boxedText: "刺骨的寒風如同刀割。巨大的冰牆高聳入雲，形成了一道天然的防線。這裡不僅有巨人，還有白龍和雪怪在徘徊。每一步都需要與嚴寒抗爭。" },
                { name: "雅爾的宮殿", description: "冰霜巨人的要塞", boxedText: "這座宮殿完全由透明的寒冰雕刻而成，美麗而致命。巨人雅爾坐在冰封王座上，身邊臥著兩隻巨大的冬狼。這裡沒有喧鬧，只有冷酷的秩序。" }
            ],
            transitions: "在極寒環境中，環境本身就是敵人：\n1. 穿越不穩定的冰橋潛入宮殿後方（運動與平衡）\n2. 挑戰巨人勇士贏得見雅爾的資格（榮譽決鬥）\n3. 誘發雪崩掩埋外部守衛（自然知識）",
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "冰橋對決",
                    situation: "通往宮殿的唯一捷徑是一座狹窄的冰橋，兩名霜巨人守衛正把守著。",
                    approaches: [
                        { type: "推擊", check: "力量", outcome: "利用地形將巨人推下深淵（秒殺）" },
                        { type: "隱形", check: "法術", outcome: "在風雪的掩護下悄無聲息地通過" }
                    ],
                    fail_forward: "冰橋崩塌，雖然勉強抓住邊緣，但必須攀爬百尺冰壁才能到達對岸，且暴露行蹤。"
                },
                {
                    id: "2-B",
                    title: "白龍的巢穴",
                    situation: "一隻成年白龍正守護著霜巨人的寶庫，它是雅爾的盟友。",
                    approaches: [
                        { type: "屠龍", check: "高傷害", outcome: "快速擊殺白龍，獲得霜巨人的敬畏（或憤怒）" },
                        { type: "欺騙", check: "DC 18", outcome: "讓白龍相信巨人打算背叛它，使其倒戈" }
                    ],
                    fail_forward: "白龍飛上天空進行噴吐攻擊，同時呼喚巨人援軍。"
                }
            ],
            treasures: ["霜凍之錘", "白龍皮甲"],
            endCondition: "擊敗雅爾，獲得火巨人線索",
            opening_text: "山丘巨人只是棋子。真正的主謀是霜巨人——強大而殘忍的冰雪戰士。格魯格納姆雅爾的要塞位於一條巨大的冰川裂隙中，進入的唯一方法是穿越凍土荒原。裡面除了霜巨人，還有一條遠古的白龍正在守護著它們的寶藏。"
        },
        {
            act: 3,
            title: "火巨人國王",
            titleEn: "Hall of the Fire Giant King",
            levelRange: "11-13",
            objective: "攻入火巨人王斯納爾的地下宮殿",
            keyEvents: ["地下宮殿", "國王對決", "卓爾精靈發現", "地獄犬群"],
            npcs: [
                { name: "斯納爾國王", role: "Boss", description: "火巨人的傲慢統治者", cr: 14 },
                { name: "卓爾精靈大使", role: "幕後黑手", description: "操控巨人的真正主謀", cr: 10 }
            ],
            locations: [
                { name: "黑曜石大廳", description: "充滿岩漿和煙霧的鍛造廳", boxedText: "熱浪撲面而來，空氣中充滿了硫磺味。巨大的鐵砧聲如同雷鳴。火巨人鐵匠們正在鍛造巨大的攻城武器，紅色的岩漿河在腳下流淌。這裡是戰爭機器的工廠。" },
                { name: "史爾特爾神殿", description: "供奉巨人神祇的地方", boxedText: "一座巨大的火巨人神像聳立在熔岩湖中心。史尼爾德國王正站在神像前祈禱，他身穿全套精金板甲，手持燃燒巨劍。這是一場硬仗。" }
            ],
            transitions: "進入火巨人的堡壘如同進入煉獄：\n1. 偽裝成火焰使者通過守衛線（極高難度的欺瞞）\n2. 破壞冷卻系統引發岩漿氾濫（破壞與工藝）\n3. 直接斬首行動突襲史尼爾德國王（戰術突擊）",
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "戰爭機器",
                    situation: "火巨人製造了一台巨大的精金魔像，一旦啟動將無人能擋。",
                    approaches: [
                        { type: "解除", check: "DC 20", outcome: "拔除控制核心，使魔像癱瘓" },
                        { type: "控制", check: "奧秘", outcome: "重寫符文，讓魔像攻擊巨人" }
                    ],
                    fail_forward: "魔像啟動，成為戰鬥中的第三勢力，無差別攻擊所有人。"
                },
                {
                    id: "3-B",
                    title: "國王的怒火",
                    situation: "史尼爾德國王是所有巨人中最強大的戰士，他免疫火焰且力量無窮。",
                    approaches: [
                        { type: "弱點", check: "寒冷傷害", outcome: "針對火巨人的弱點進行屬性攻擊" },
                        { type: "繳械", check: "戰技", outcome: "設法奪走他的傳奇巨劍，大幅削弱其戰鬥力" }
                    ],
                    fail_forward: "國王進入狂暴狀態，每一擊都附帶爆炸效果，地形開始崩塌，戰鬥變為限時逃脫。"
                }
            ],
            treasures: ["精金裝備", "史爾特爾之劍", "卓爾精靈的信件（指向下個戰役）"],
            endCondition: "擊敗斯納爾，發現卓爾精靈陰謀",
            opening_text: "火巨人斯納爾國王是這一切的核心。他的地下宮殿建在活火山的心臟中，熔岩照亮了無數鑄造爐。然而，當你們深入宮殿時，發現了更驚人的真相——卓爾精靈的大使正在與國王密謀。巨人的襲擊只是更大計畫的一部分，幕後黑手是幽暗地域的卓爾精靈。"
        },
        {
            act: 4,
            title: "幽暗地域",
            titleEn: "Descent into the Depths",
            levelRange: "13-14",
            objective: "追蹤卓爾精靈至幽暗地域",
            keyEvents: ["地下追蹤", "卓爾精靈城市", "女祭司對決", "陰謀終結"],
            npcs: [
                { name: "卓爾女祭司", role: "最終Boss", description: "策劃巨人聯盟的幕後黑手", cr: 15 },
                { name: "卓爾精靈士兵", role: "敵人", description: "精銳的黑精靈戰士" }
            ],
            locations: [
                { name: "幽暗地域隧道", description: "通往卓爾城市的道路", boxedText: "隧道裡的寂靜比任何噪音都更可怕。發光的苔蘚投下詭異的陰影，遠處傳來滴水聲，或者那是蜘蛛的腳步聲？空氣中彌漫著一種古老而邪惡的霉味。" },
                { name: "卓爾精靈前哨", description: "黑精靈的據點", boxedText: "一座優雅而致命的地下建築群出現在眼前。黑曜石雕刻的塔樓與鐘乳石融為一體，紫色的魔法光芒在窗戶中閃爍。卓爾精靈的巡邏隊在陰影中無聲地移動。" }
            ],
            transitions: "追擊真正的幕後黑手，深入地底世界：\n1. 在無盡的隧道中追蹤卓爾精靈的痕跡（生存與追蹤）\n2. 抵抗羅絲女神的詛咒與蜘蛛的伏擊（感知與抗毒）\n3. 闖入前哨站直面女祭司的怒火（決戰）",
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "蜘蛛女皇的網",
                    situation: "隧道前方佈滿了巨大的蜘蛛網，一隻巨大的變種蜘蛛從上方垂下。",
                    approaches: [
                        { type: "火攻", check: "火焰傷害", outcome: "燒毀蛛網，逼退懼怕火焰的黑暗生物" },
                        { type: "隱匿", check: "DC 18", outcome: "像幽靈一樣穿過蛛網區，不驚動任何守衛" }
                    ],
                    fail_forward: "被蛛網纏住，蜘蛛群發動襲擊（中毒狀態），戰鬥開始時全員束縛。"
                },
                {
                    id: "4-B",
                    title: "女祭司的陰謀",
                    situation: "女祭司艾克拉芙納正在進行一個黑暗儀式，試圖召喚更強大的惡魔。",
                    approaches: [
                        { type: "中斷", check: "遠程攻擊", outcome: "打斷儀式專注，造成魔法反噬" },
                        { type: "反制", check: "反制法術", outcome: "阻止傳送門打開，將惡魔封印回去" }
                    ],
                    fail_forward: "儀式完成，一隻狂戰魔被召喚出來加入戰鬥，難度大幅提升。"
                }
            ],
            treasures: [
                { name: "卓爾精靈寶藏", type: "財富", description: "黑精靈的魔法物品" },
                { name: "王國英雄", type: "頭銜", description: "拯救領土的英雄" }
            ],
            endCondition: "終結卓爾陰謀，結束巨人威脅",
            opening_text: "火巨人宮殿中發現的秘密通道通往了幽暗地域。卓爾精靈女祭司是整個巨人聯盟的策劃者，她的目的是讓地表世界陷入混亂，為卓爾精靈的入侵鋪路。追蹤她進入無盡的黑暗，結束這場陰謀，是你們最後的任務。"
        }
    ]
};

export default against_the_giants;
