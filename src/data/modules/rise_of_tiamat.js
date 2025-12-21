const rise_of_tiamat = {
    id: "rise_of_tiamat",
    title: "提亞馬特崛起",
    titleEn: "The Rise of Tiamat",
    levels: "8-15",
    startLevel: 8,
    synopsis: "龍教團的陰影已覆蓋整個費倫大陸。五頭后后提亞馬特即將降世。冒險者必須穿梭於各大勢力之間，在深水城議會建立聯盟，並在最後的龍井之戰中阻止邪神降臨。",
    chapters: 6,
    playTime: "30-50小時",
    acts: [
        {
            act: 1,
            title: "深水城議會",
            titleEn: "Council of Waterdeep",
            levelRange: "8",
            objective: "團結劍灣的各方勢力，建立反龍教同盟",
            keyEvents: ["號角聲震天", "首場外交會議", "背叛者的陰影"],
            npcs: [
                { name: "萊瑞爾·銀手", role: "深水城公開領袖", description: "選民之一，試圖在政治僵局中找到出路", dialogue: "我們不能再單打獨鬥了。提亞馬特不是某個國家的威脅，她是整個世界的末日。" },
                { name: "歐諾羅斯大師", role: "豎琴手首領", description: "情報頭子，提供關於龍教團內部的消息" }
            ],
            locations: [
                { name: "議會大廳", description: "深水城的權力核心", boxedText: "大理石柱聳立，各大勢力的代表坐在圓桌旁：嚴正的矮人王、優雅的精靈使節、還有冷靜的法師領袖。空氣中充滿了爭論與不信任。然而，遠方傳來的「龍之鳴(Draakhorn)」低沉聲響，卻提醒著所有人時間不多了。" }
            ],
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "權力天平",
                    situation: "矮人族代表對其他勢力的猶豫感到憤怒，威脅要撤回支援。",
                    approaches: [
                        { type: "說服", check: "DC 16", outcome: "利用之前的英雄事蹟（如HotDQ的功勞）獲得他們的信任" },
                        { type: "洞察", check: "DC 14", outcome: "發現矮人王的真正擔憂是國內的礦坑安全，提出解決方案" }
                    ],
                    fail_forward: "外交僵局，矮人撤出首階段支援，後續任務難度提升（缺乏重裝步兵）。"
                }
            ],
            opening_text: "自從在「破天堡（Skyreach Castle）」挫敗了龍教團的初步計劃後，和平只是短暫的。現在，「龍之鳴」那足以震撼靈魂的號角聲在整個大陸迴盪，這意味著所有的巨龍都在響應召喚。你們受邀來到深水城，參加一場將決定世界命運的會議。劍灣的所有領袖都在看著你們，這群曾經直面過巨龍的英雄。"
        },
        {
            act: 2,
            title: "流冰之海",
            titleEn: "Sea of Moving Ice",
            levelRange: "9-10",
            objective: "前往最北方的冰海，尋找失蹤的奧術研究者與白龍龍語者",
            keyEvents: ["冰山滲透", "白龍「奧塞瑟托」遭遇戰", "冰中要塞探索"],
            locations: [
                { name: "冰之要塞", description: "浮動在海面上的巨大冰山堡壘", boxedText: "寒風刺骨，巨大的浮冰如同尖牙在海面交錯。在前方，一座由魔法塑造成型的冰山聳立，那是白龍的巢穴。無數的冰蟾蜍和被凍結的奴隸守衛著那裡。" }
            ],
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "寒冰吐息",
                    situation: "白龍奧塞瑟托從冰層下突襲你們的雪橇。",
                    approaches: [
                        { type: "反應/特技", check: "DC 15", outcome: "及時跳入力道較小的區域，避免被直接凍結" },
                        { type: "自然", check: "DC 13", outcome: "利用冰層的裂縫躲避吐息的直接衝擊" }
                    ],
                    fail_forward: "被凍成冰塊，雖然在同伴幫助下脫困，但暫時失去了所有感官（目盲/耳聾），戰鬥難度激增。"
                }
            ],
            endCondition: "擊敗或驅逐白龍，取得教團情報",
            opening_text: "深水城會議的第一項任務：前往遙遠的北境。龍教團正在收集關於召喚儀式的遠古知識，而唯一能阻止他們的學者失蹤在了「流冰之海」。你們搭乘著極地探險船，穿過巨型冰山，感受著此生未見的酷寒。在霜凍的霧氣中，一個巨大的銀白色身影正在空中盤旋。"
        },
        {
            act: 3,
            title: "邪教的反擊",
            titleEn: "The Cult Strikes Back",
            levelRange: "11",
            objective: "在暗殺行動中倖存，並保護議會重要成員",
            keyEvents: ["街頭伏擊", "藍龍空中突襲", "查緝密使"],
            locations: [
                { name: "深水城碼頭區", description: "混亂的街道", boxedText: "原本熱鬧的碼頭現在被一陣詭異的靜默籠罩。陰影中似乎有無數雙眼睛在注視。突然，一聲龍吼打破了寧靜，藍色的強酸雷電從屋頂噴湧而下！" }
            ],
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "斬首行動",
                    situation: "龍教團派出了精銳刺客和一頭年輕藍龍，目標是在公開場合處決冒險者。",
                    approaches: [
                        { type: "感知", check: "DC 15", outcome: "識破陷阱，在敵人動手前反將一軍" },
                        { type: "戰術", check: "AC/戰鬥", outcome: "建立防禦陣線，死守平民區" }
                    ],
                    fail_forward: "一名NPC議員被害，議會陷入恐慌，雖然你們擊退了敵人，但輿論對「同盟」產生了動搖。"
                }
            ],
            opening_text: "龍教團不會坐以待斃。當同盟正在緩慢成型時，敵人的反撲來得異常猛烈。這不再是荒野的游擊戰，而是在深水城心臟地帶燃起的戰火。你們意識到，教團已經視你們為眼中釘，一場針對英雄的「獵殺」已經展開。"
        },
        {
            act: 4,
            title: "迪德瑞斯之墓",
            titleEn: "The Tomb of Diderius",
            levelRange: "12",
            objective: "追蹤叛逃的龍語者瓦拉姆，奪回青銅龍法器",
            keyEvents: ["沙漠遺跡", "斯芬克斯的謎題", "蛇人的野心"],
            locations: [
                { name: "迪德瑞斯之墓", description: "沙漠中的古老先知陵墓", boxedText: "沙漠的風沙幾乎掩埋了這座壯觀的石造建築。巨大的石像守衛著入口，他們的眼神似乎能穿透肉體直視靈魂。在深處，一股腐朽的死亡氣息與強大的預言魔力交織在一起。" }
            ],
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "先知的遺言",
                    situation: "陵墓的守護者要求你們回答三個關於「犧牲」的謎題。",
                    approaches: [
                        { type: "歷史/宗教", check: "DC 17", outcome: "正確解讀古代先知的思想，和平獲得通行權與增益補給" },
                        { type: "洞察", check: "DC 15", outcome: "看穿這是一個心理測試，用坦誠的態度獲得認可" }
                    ],
                    fail_forward: "答錯謎題，觸發守護者石像，在一場惡戰後雖然通塔，但每人身上都背負了「先知的詛咒」（豁免減免）。"
                }
            ],
            endCondition: "在高塔中抓獲或殺死瓦拉姆",
            opening_text: "情報顯示，龍語者之一的瓦拉姆（Varram）因失去威望而逃入了一座沙漠中的古代陵墓。那裡藏有強大的預言工具，教團絕不能再次擁有它。頂著撒比亞沙漠（Serpents' Hills）的烈日，你們在沙塵中找到了那座被遺忘的先知之墓。"
        },
        {
            act: 5,
            title: "薩伊之行",
            titleEn: "Mission to Thay",
            levelRange: "13-14",
            objective: "與紅袍法師談判，爭取這股邪惡勢力的協助",
            keyEvents: ["死靈法術展示", "恐懼統治者的晚宴", "靈魂的博弈"],
            npcs: [
                { name: "薩斯·塔姆", role: "薩伊統治者", description: "強大的巫妖領袖，冷酷且追求絕對效率", dialogue: "提亞馬特不符合薩伊的利益。但要我們幫忙，你們必須證明自己的價值——用你們的靈魂，或是對手的人頭。" }
            ],
            locations: [
                { name: "恐懼堡壘", description: "薩伊的中心", boxedText: "這裡的建築是由生靈的骨骸與魔法鋼鐵鑄成。天空中永遠盤旋著食屍鬼與幽靈。在晚宴廳裡，死靈法師們用冰冷的眼神打量著你們，每一份食物都散發著誘人卻危險的氣息。" }
            ],
            strategic_nodes: [
                {
                    id: "5-A",
                    title: "死亡晚宴",
                    situation: "薩伊的高階領袖試圖在對話中用意念控制你們，測試你們的意志。",
                    approaches: [
                        { type: "意志豁免", check: "DC 18", outcome: "展現出鋼鐵般的意志，贏得這群邪惡法師的尊重" },
                        { type: "欺瞞/奧術", check: "DC 16", outcome: "利用虛假的幻覺或法術護盾瞞混過關，偽裝成被控制的樣子以蒐集情報" }
                    ],
                    fail_forward: "精神受到重創，被迫簽下了一份不平等條約，雖然獲得了援軍，但在最後一戰中薩伊法師可能會背叛。"
                }
            ],
            opening_text: "同盟現在面臨一個兩難的選擇：為了對抗龍教團，他們必須尋找邪惡的「薩伊（Thay）」合作。你們作為同盟的特使，踏入了那片充滿死靈與暴政的土地。這裡沒有正義，只有權力的交換。你們必須在地獄的邊緣跳舞，而不被火焰灼傷。"
        },
        {
            act: 6,
            title: "龍井之戰",
            titleEn: "The Well of Dragons",
            levelRange: "15",
            objective: "攻打教團總部，中斷召喚儀式，對決提亞馬特化身",
            keyEvents: ["三軍衝鋒", "五首龍后的祭壇", "終焉之戰"],
            boss: { name: "提亞馬特化身", cr: 20, type: "惡龍之神", abilities: ["五頭龍息", "驚懼神威", "傳奇抗性"], tactics: "每回合使用不同屬性的吐息，並利用神力改變戰場環境" },
            locations: [
                { name: "龍井之火山口", description: "最終儀式的場所", boxedText: "大地震顫，火山口噴發出的不是岩漿，而是純粹的邪惡能量。龍語者塞瑞恩站在高台上，五色巨龍圍繞著祭壇。隨著祭禮進入高潮，虛空裂開了，五個巨大的龍頭正從另一個位面緩慢鑽出。" }
            ],
            strategic_nodes: [
                {
                    id: "6-A",
                    title: "中斷儀式",
                    situation: "五個不同顏色的能量流正在維持裂隙。",
                    approaches: [
                        { type: "各種檢定", check: "DC 20", outcome: "每成功中斷一個，提亞馬特的化身就會獲得一項弱點（如失去該屬性吐息）" }
                    ],
                    fail_forward: "儀式完全成功，提亞馬特以完整形態降世，戰鬥變成幾乎不可能的自殺任務。"
                }
            ],
            endCondition: "擊敗提亞馬特化身或封印裂隙",
            ending_text: "隨著一聲響徹位面的哀嚎，五首龍后被重新拖回了九層地獄。裂隙在強光中閉合，龍井也陷入了死寂。費倫大陸免於覆滅。各國領袖向你們致敬，街道上的人們慶祝著和平的歸來。儘管巨龍的威脅將永遠存在，但這個時代的英雄已經留下了不可磨滅的傳奇。",
            opening_text: "旗幟在寒風中獵獵作響。在你們身後，是深水城、銀月城、矮人大廳以及甚至薩伊的聯軍。在你們前方，是龍教團最後的堡壘——龍井。這場長達一年的戰爭，所有的犧牲與奮鬥，都將在這最後的一天得出結果。拔出你們的劍，吟唱你們最後的咒語。衝鋒！"
        }
    ]
};

export default rise_of_tiamat;
