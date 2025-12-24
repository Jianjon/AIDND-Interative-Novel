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
            opening_text: "你們抵達這座被冰雪覆蓋的村莊時，正趕上一場肅穆的葬禮。村長埃羅·阿達圖爾正站在墓穴旁，為一位矮人探險家——烏爾貢·溫斯——致上最後的悼詞。村民們低聲啜泣，而在人群的邊緣，幾座形狀扭曲的『冰雕』顯得格外刺眼——那是被怪病奪走生命的可憐人。",
            keyEvents: [
                "參加烏爾貢的葬禮，接受村長埃羅的委託",
                "在烏爾貢的小屋 (Urgon's Cottage) 尋找線索",
                "在快樂矮人酒館 (The Jolly Dwarf) 質問圖爾吉"
            ],
            endCondition: "玩家從圖爾吉口中得知遺跡位置，或通過線索推斷出地點。",
            npcs: [
                {
                    name: "埃羅 (Elro Aldataur)",
                    role: "村長 / 退休遊俠",
                    description: "嚴肅的精靈官員，雖然年邁但依然散發著威嚴。他非常擔心村民的安危。",
                    personality: "責任感強的守護者 (ISTJ)。重視秩序與傳統，對威脅村民安全的任何事物都極度敏感。",
                    prejudices: {
                        "Chaotic": "對行為不可預測的人感到不信任，認為他們會帶來麻煩。",
                        "Necromancer": "極度厭惡死靈法術，認為這是對自然的褻瀆。",
                        "Warlock": "對與異界宗主簽訂契約的人抱持戒心。"
                    },
                    dialogue: "我們的人正在慢慢變成冰塊。如果這不是詛咒，那就是某種我們無法理解的邪惡魔法。請你們調查烏爾貢的家，他是一切的開始。"
                },
                {
                    name: "圖爾吉 (Tulgi Lutan)",
                    role: "矮人強盜 / 關鍵證人",
                    description: "曾經強壯的矮人女性，現在卻裹著厚厚的毛毯瑟瑟發抖。她的皮膚上泛著不自然的淡藍色霜痕。",
                    personality: "恐懼且多疑的倖存者 (ESTP)。為了生存不擇手段，但對妹妹有著絕對的忠誠。",
                    prejudices: {
                        "Lawful": "討厭滿口仁義道德的執法者或騎士，認為他們虛偽。",
                        "Paladin": "特別害怕聖武士，擔心被審判。",
                        "Rogue": "對同行會稍微放鬆警惕，除非對方看起來比她更狠。"
                    },
                    dialogue: "咳...我什麼都不知道...別靠近我！這是報應...是那座島的報應..."
                }
            ],
            locations: [
                {
                    name: "科羅納村墓園 (Funeral Scene)",
                    description: "寒風呼嘯的墓園，剛挖好的墳墓旁圍滿了悲傷的村民。",
                    boxedText: "當你們進入村莊時，迎接你們的不是熱情的笑容，而是令人窒息的沈默。幾個村民正對著中央的冰雕祈禱，那是他們昨天還在說笑的朋友。村長埃羅神色凝重地走向你們：『外來者，如果你們是來尋求冒險的，這裡只有死亡。但如果你們願意幫忙...或許我們還有希望。』"
                },
                {
                    name: "烏爾貢的小屋 (Urgon's Cottage)",
                    description: "受害者烏爾貢的家。屋內冷得像冰窖，傢俱上覆蓋著厚厚的白霜，壁爐裡的木炭早已凍結。",
                    boxedText: "推開門的瞬間，一股刺骨的寒氣撲面而來，比外面的暴風雪還要冷。這裡不像是一個有人居住的地方，更像是一個冰封的陵墓。桌上散落著幾張未完成的地圖。"
                },
                {
                    name: "快樂矮人酒館 (The Jolly Dwarf)",
                    description: "村裡唯一的溫暖之處，但空氣中瀰漫著恐懼而非歡樂。圖爾吉躲在角落的桌子下。",
                    boxedText: "酒館裡擠滿了避寒的村民，但沒有人說話，只有火爐燃燒的噼啪聲。老闆娘用擔憂的眼神示意你們看向角落——那裡坐著一個裹著厚重毛毯、不斷顫抖的身影。"
                }
            ],
            strategic_nodes: [
                {
                    id: "inspect_body",
                    title: "檢查冰封屍體 (Investigation)",
                    type: "action",
                    situation: "受害者的皮膚上覆蓋著一層淡藍色的晶體，這是『寒冬之疾』的末期症狀。",
                    approaches: [
                        { type: "醫藥 (Medicine)", check: 12, outcome: "你確認這不是普通的凍傷，而是某種魔法生化毒素，會從內部凍結血液。" },
                        { type: "奧法 (Arcana)", check: 14, outcome: "你辨認出這是古代艾歐里亞 (Aeor) 時期的魔法殘餘，是一種失控的生化武器。" }
                    ],
                    fail_forward: "雖然無法確定具體成因，但你們能感覺到這絕非自然疾病。"
                },
                {
                    id: "search_cottage",
                    title: "搜索烏爾貢的小屋 (Search)",
                    type: "investigation",
                    situation: "在雜亂的雜物中，尋找可能導致烏爾貢染病的原因。",
                    approaches: [
                        { type: "調查 (Investigation)", check: 13, outcome: "你在地板縫隙中發現了一個奇怪的藍色玻璃瓶 (Blue Glass Vial)。它雖然空了，但依然散發著驚人的寒氣。" },
                        { type: "感知 (Perception)", check: 11, outcome: "你注意到烏爾貢的揹包裡有一張標記著北方海灣的地圖，上面畫著一個紅色的骷髏頭。" }
                    ],
                    triggerEvent: "Finding_The_Vial"
                },
                {
                    id: "confront_tulgi",
                    title: "質問圖爾吉 (Social)",
                    type: "interaction",
                    situation: "圖爾吉顯然隱瞞了什麼，她恐懼的眼神在閃爍。",
                    approaches: [
                        { type: "威嚇 (Intimidation)", check: 14, outcome: "『我說！我說！我們去了一個叫薩斯地窖的遺跡...我們打碎了一些瓶子...』圖爾吉崩潰地大喊。" },
                        { type: "說服 (Persuasion)", check: 12, outcome: "『求求你們...救救我妹妹 Hulil...她病得比我更重。我們只是想找點值錢的東西...』" }
                    ],
                    triggerEvent: "Reveal_Salsvault"
                }
            ]
        },
        {
            act: 2,
            title: "寒冰洞穴 (Croaker Cave)",
            titleEn: "Croaker Cave",
            levelRange: "2",
            objective: "找到圖爾吉的妹妹 Hulil，獲取前往遺跡的地圖。",
            keyEvents: [
                "穿越被冰雪覆蓋的荒野",
                "潛入強盜藏身的寒冰洞穴",
                "與強盜首領 Hulil 談判或戰鬥"
            ],
            endCondition: "獲得前往薩斯地窖 (Salsvault) 的地圖與解藥線索。",
            npcs: [
                {
                    name: "胡莉爾 (Hulil Lutan)",
                    role: "強盜首領 / 病患",
                    description: "圖爾吉的妹妹，矮人狂戰士。她病得非常重，幾乎無法站立，但依然緊握著戰斧。她身邊總是跟著一隻被馴服的冰蟾蜍。",
                    personality: "絕望的暴徒 (CE)。被病痛折磨得失去了理智，只相信手中的武器。",
                    dialogue: "滾開！這是我的寶藏！這該死的藍色冰霜...它在燃燒我的血...但我不會死！我絕不會死！",
                    secrets: "她其實已經後悔去那個遺跡了，如果能治好她，她願意交出一切。",
                    combat: "雖然虛弱，但狂暴時傷害依然致命。"
                },
                {
                    name: "拉格林 (Raegrin)",
                    role: "忠誠的副官",
                    description: "沉默寡言的矮人戰士，是唯一還留在胡莉爾身邊的手下。",
                    dialogue: "退後。除非你們有治好她的辦法。",
                    prejudices: { "Cleric": "牧師...你們只會說空話，甚至救不了她。" }
                }
            ],
            locations: [
                {
                    name: "寒冰荒原",
                    description: "前往洞穴的危險路途",
                    boxedText: "離開村莊後，世界變成了一片白色。寒風像刀子一樣割在臉上。雪地裡潛伏著飢餓的白狼，而腳下的冰層隨時可能破裂。"
                },
                {
                    name: "呱呱洞穴 (Croaker Cave)",
                    description: "強盜的藏身處，因棲息著巨型冰蟾蜍而得名",
                    boxedText: "洞穴入口像是一張巨大的怪獸嘴巴，呼出白色的寒氣。地面上覆蓋著一層薄冰，非常濕滑。深處傳來『呱——呱——』的低沉迴聲，那是巨型冰蟾蜍的叫聲。"
                }
            ],
            strategic_nodes: [
                {
                    id: "cave_entry",
                    title: "濕滑的入口",
                    situation: "洞穴地面結滿了黑冰，且頂部倒掛著一群飢餓的冰鰩 (Ice Mephits)。",
                    approaches: [
                        { type: "敏捷/特技", check: "DC 14", outcome: "保持平衡快速通過，不驚動怪物" },
                        { type: "自然/生存", check: "DC 12", outcome: "發現冰鰩的偽裝，提前發動突襲" }
                    ],
                    fail_forward: "滑倒並發出巨大聲響，驚醒冰鰩 (3隻) 進入突襲輪戰鬥。"
                },
                {
                    id: "hulil_negotiation",
                    title: "絕望的對峙",
                    situation: "胡莉爾被逼到了絕境，她準備同歸於盡。",
                    approaches: [
                        { type: "說服", check: "DC 16", outcome: "讓她相信你們也是去尋找解藥的盟友（需承諾分那一半財寶）" },
                        { type: "醫藥", check: "DC 14", outcome: "暫時緩解她的痛苦，證明你們有能力救她" },
                        { type: "戰鬥", check: "擊敗胡莉爾", outcome: "從她身上搜出地圖" }
                    ],
                    fail_forward: "胡莉爾陷入瘋狂攻擊，直到被打暈。你們獲得了地圖，但失去了一個潛在的情報源。"
                }
            ],
            encounters: ["白狼群", "冰蟾蜍", "強盜殘黨"],
            treasures: ["薩斯地窖地圖", "被盜的商隊貨物", "+1 戰斧"],
            opening_text: "根據圖爾吉的供詞，她的妹妹胡莉爾帶著大部分贓物躲進了北邊的『呱呱洞穴』。那是一個充滿危險的天然冰洞。更糟糕的是，胡莉爾似乎病得更重，而絕望的人往往是最危險的。你們必須穿過這片白色的荒原，在暴風雪掩蓋一切蹤跡之前找到她。"
        },
        {
            act: 3,
            title: "艾歐里亞的遺跡 (The Salsvault Ruins)",
            titleEn: "Salsvault",
            levelRange: "3",
            objective: "深入危險的海灣暗礁，從古代實驗室中奪回解藥。",
            keyEvents: [
                "尋找遺跡入口",
                "與亡靈科學家費羅爾周旋",
                "取得解藥『佛里吉德之淚』(Frigid Woe Antidote)"
            ],
            endCondition: "取得解藥並返回科羅納村。",
            boss: {
                name: "費羅爾博士 (Dr. Ferol Sal)",
                cr: "2",
                type: "亡靈 (Undead / Wight Scientist)",
                tactics: "這名執迷於研究的亡靈科學家會操作實驗室的毒氣噴霧，並指揮剩餘的殭屍進行攻擊。他免疫毒素和寒冷。",
                dialogue: "受試者？太好了！我的樣本正好用完了...請站好，這個過程只會稍微...痛一下。"
            },
            npcs: [
                {
                    name: "費羅爾博士",
                    role: "瘋狂科學家",
                    description: "穿著破爛實驗袍的屍妖。他似乎保留了生前的智慧，但完全喪失了道德感。",
                    secrets: "他其實不知道自己已經死了，認為外面的世界依然是艾歐里亞帝國的時代。",
                    personality: "冷酷的學者 (LE)"
                }
            ],
            locations: [
                {
                    name: "薩斯地窖 (Salsvault)",
                    description: "半埋在冰川中的古代實驗室",
                    boxedText: "巨大的金屬門被凍在冰壁中，上面刻著早已失傳的艾歐里亞文字。當你們靠近時，門上的水晶發出忽明忽暗的紅光。"
                },
                {
                    name: "病毒培養室",
                    description: "充滿毒氣的房間",
                    boxedText: "房間中央擺放著巨大的培養槽，裡面翻滾著藍色的液體。地面上散落著幾具早已凍僵的屍體——那是之前的冒險者。"
                }
            ],
            strategic_nodes: [
                {
                    id: "ruin_puzzle",
                    title: "艾歐里亞的門鎖",
                    situation: "金屬大門需要密碼或特定的魔法頻率才能打開。",
                    approaches: [
                        { type: "奧秘/歷史", check: "DC 15", outcome: "回想起艾歐里亞的問候語，成功解鎖" },
                        { type: "盜賊工具", check: "DC 18", outcome: "強行破解古老的機械鎖" }
                    ],
                    fail_forward: "防禦系統啟動，召喚出兩具「生鏽的自動衛兵」(Animated Armor)，必須戰鬥才能進入。"
                },
                {
                    id: "ferol_confrontation",
                    title: "博士的實驗",
                    situation: "費羅爾博士邀請你們成為他的新實驗品。",
                    approaches: [
                        { type: "欺瞞/表演", check: "DC 16", outcome: "假裝成帝國視察員，命令他交出解藥成果" },
                        { type: "戰鬥", check: "消滅亡靈", outcome: "徹底淨化實驗室" }
                    ],
                    fail_forward: "博士釋放毒氣 (體質豁免 DC 13)，戰鬥在毒霧環境中開始。"
                }
            ],
            encounters: ["殭屍", "活化盔甲", "費羅爾博士"],
            treasures: ["寒冬之疾解藥 (20劑)", "魔法卷軸 (冰風暴)", "艾歐里亞遺物"],
            opening_text: "地圖指引你們來到了一處冰封的海灣。在那巨大的藍色冰壁之中，露出了金屬建築的一角——那就是薩斯地窖，古代艾歐里亞帝國的生化實驗室。寒冬之疾就是在這裡誕生的。而創造它的主人...或許還在裡面等待著。"
        }
    ]
};

export default frozen_sick;
