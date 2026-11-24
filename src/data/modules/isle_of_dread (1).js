const isle_of_dread = {
    id: "isle_of_dread",
    title: "恐怖之島",
    titleEn: "Isle of Dread",
    levels: "3-7",
    startLevel: 3,
    synopsis: "探索一座充滿恐龍、原始部落和神秘遺跡的失落島嶼。經典的六邊形探索冒險。",
    setting: "失落的海洋島嶼",
    acts: [
        {
            act: 1,
            title: "航向未知",
            titleEn: "Voyage to the Unknown",
            levelRange: "3",
            objective: "獲得地圖並航向恐怖之島",
            keyEvents: ["地圖發現", "船隻準備", "航海冒險", "登陸"],
            npcs: [
                { name: "老水手", role: "地圖提供者", description: "擁有古老地圖的退休冒險家" },
                { name: "船長", role: "NPC", description: "帶領船隊的船長" }
            ],
            locations: [
                { name: "港口城市", description: "冒險的起點", boxedText: "喧鬧的碼頭充滿了海鷗的叫聲和鹽水的味道。老水手們在酒館裡吹噓著他們的冒險，而商人們則忙著裝卸貨物。在這裡，只要有金幣，你幾乎能買到任何東西——包括通往死亡的地圖。" },
                { name: "海洋", description: "通往島嶼的航程", boxedText: "一望無際的蔚藍大海，平靜的水面下隱藏著無數危機。巨大的陰影偶爾從船底遊過，遠處的風暴雲正在聚集。這是一趟沒有回頭路的旅程。" },
                { name: "塔納羅亞村", description: "島上的原住民村莊", boxedText: "巨大的木牆將村莊與叢林隔絕開來。村民們雖然對外來者保持警惕，但並非敵意。他們用鮮艷的羽毛和貝殼裝飾自己，崇拜著名為『守護者』的古老圖騰。" }
            ],
            transitions: "航向恐怖之島是一場與自然的博弈：\n1. 在風暴中掌舵以避免船隻觸礁（載具與力量）\n2. 與試圖登船的海盜進行接舷戰（海戰與戰術）\n3. 說服塔納羅亞村民讓你們登陸補給（社交與禮儀）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "風暴降臨",
                    situation: "突如其來的熱帶風暴席捲了海面，巨浪試圖將船隻吞沒。",
                    approaches: [
                        { type: "載具(水運)", check: "DC 14", outcome: "巧妙地駕駛船隻切入浪尖，最小化船體損傷" },
                        { type: "運動", check: "DC 12", outcome: "協助水手收帆並固定貨物，防止物資落海" }
                    ],
                    fail_forward: "船隻主桅桿受損，被迫緊急在島嶼的危險區域搶灘登陸（跳過安全港口劇情）。"
                },
                {
                    id: "1-B",
                    title: "海怪的觸鬚",
                    situation: "巨大的觸手從深海探出，纏住了船身。",
                    approaches: [
                        { type: "攻擊", check: "AC 13", outcome: "集中火力切斷觸手，擊退巨型章魚" },
                        { type: "自然", check: "DC 15", outcome: "利用船上的魚油引開海怪的注意力" }
                    ],
                    fail_forward: "海怪破壞了船舵，雖然擊退了它，但失去了精確導航能力，隨機漂流到島嶼某處。"
                }
            ],
            treasures: ["航海物資", "寶藏地圖（殘缺）"],
            endCondition: "抵達恐怖之島",
            opening_text: "一張古老的地圖落入了你們手中。它描繪了一座從未在任何海圖上出現過的島嶼——恐怖之島。地圖上標記著無數的寶藏位置，還有奇怪的符號：巨大的爬蟲、奇異的建築、以及一個被稱為「遠古者神殿」的地方。老水手警告你們：「那座島從沒有人活著離開過。」但財富的誘惑太大了。你們組織了一支探險隊，揚帆起航。"
        },
        {
            act: 2,
            title: "叢林狩獵 (The Jungle Hunt)",
            titleEn: "Jungle Exploration",
            levelRange: "4-5",
            objective: "六邊形探索島嶼，狩獵危險的巨獸以贏得塔納羅亞人的尊重。",
            keyEvents: ["霸王龍遭遇", "食人族的夜襲", "祖靈的試煉"],
            npcs: [
                { name: "塔納羅亞酋長", role: "盟友", description: "友好的原住民領袖，要求你們證明自己的力量" },
                { name: "拉卡拉", role: "獵手", description: "部落最強的恐龍獵人，可以成為嚮導", interaction: "如果你們在狩獵中勝過她，她會加入隊伍" },
                { name: "食人族", role: "敵人", description: "崇拜惡魔的敵對部落", cr: 2 }
            ],
            locations: [
                { name: "塔納羅亞", description: "原住民要塞", boxedText: "巨大的木牆上掛滿了恐龍的頭骨。村民們用敬畏的眼神看著你們，但直到你們展現出力量，他們才會真正接納你們。" },
                { name: "綠色地獄", description: "茂密的叢林深處", boxedText: "這裡的植物比人還高，每一片葉子下都可能藏著致命的毒蟲。遠處傳來了大地顫抖的聲音——那是雷龍的腳步聲。" }
            ],
            hex_exploration: true,
            strategic_nodes: [
                {
                    id: "dino_hunt_mechanic",
                    title: "巨獸狩獵",
                    situation: "你們發現了一隻暴龍 (T-Rex) 的足跡。這是贏得榮耀的機會，也是找死的行為。",
                    approaches: [
                        { type: "生存/陷阱", check: "DC 16", outcome: "挖掘落穴並用誘餌將暴龍引入，使其在戰鬥開始時受困 (束縛狀態)" },
                        { type: "隱匿/狙擊", check: "DC 18", outcome: "爬上高樹，在暴龍發現你們前進行一輪精準的射擊 (造成重創)" }
                    ],
                    fail_forward: "陷阱失效，暴龍發狂並鎖定了最脆弱的隊員（法師或遊蕩者），進入正面硬碰硬的戰鬥。"
                },
                {
                    id: "cannibal_raid",
                    title: "夜半鼓聲",
                    situation: "食人族部落在夜間包圍了你們的營地，而在黑暗中，無數吹箭正瞄準這裡。",
                    approaches: [
                        { type: "感知", check: "DC 14", outcome: "聽聲辨位，在第一波吹箭射出前踢翻篝火，製造混亂反擊" },
                        { type: "威嚇/表演", check: "DC 16", outcome: "模仿暴龍的吼聲（或使用幻術），嚇退迷信的食人族" }
                    ],
                    fail_forward: "隊伍中有人中毒 (麻痺狀態)，必須在保護傷員的同時擊退食人族的波狀攻擊。"
                }
            ],
            treasures: ["暴龍牙項鍊 (+2威嚇)", "遠古黃金雕像", "恐龍蛋 (可賣出高價)"],
            endCondition: "獲得足夠的狩獵榮耀，得到前往高原的嚮導",
            opening_text: "恐怖之島比地圖描繪的更加生機勃勃。要想在這裡生存，你們必須從獵物變成獵人。塔納羅亞的酋長告訴你們，只有最強壯的戰士才有資格知曉通往「遠古者神殿」的秘密路徑。叢林深處傳來了咆哮聲，那是給你們的挑戰書。"
        },
        {
            act: 3,
            title: "遠古者神殿",
            titleEn: "Temple of the Ancients",
            levelRange: "5-7",
            objective: "探索高原中央的神秘神殿",
            keyEvents: ["高原危險", "翼龍巢穴", "遠古者秘密", "最終寶藏"],
            npcs: [
                { name: "科皮魯人", role: "敵人", description: "守護神殿的變形生物", cr: 6 },
                { name: "遠古者遺骸", role: "謎題", description: "建造神殿的神秘種族" }
            ],
            locations: [
                { name: "中央高原", description: "島嶼最危險的區域", boxedText: "這裡的空氣稀薄而寒冷。高原上佈滿了奇異的黑曜石柱，它們在風中發出低沈的鳴響。翼龍在頭頂盤旋，尋找著任何移動的獵物。" },
                { name: "遠古者神殿", description: "神秘的遠古建築", boxedText: "這座神殿不屬於凡人的幾何學。非歐幾里得的角度讓人頭暈目眩。牆壁上刻滿了關於章魚頭生物奴役人類的壁畫——那就是傳說中的科皮魯人。" },
                { name: "寶藏室", description: "累積千年的財富", boxedText: "金幣堆積如山，但最珍貴的是那些用未知金屬鑄造的奇異機械裝置。這些遠古科技的價值遠超黃金。" }
            ],
            transitions: "揭開島嶼的終極秘密，面對遠古的恐懼：\n1. 抵抗神殿發出的持續精神干擾（意志豁免）\n2. 解開非歐幾里得幾何的空間謎題（智力與數學）\n3. 對抗具有心靈控制能力的科皮魯領主（意志與戰鬥）",
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "科皮魯的低語",
                    situation: "在這個充滿水的房間裡，你們聽到了腦海中的聲音：『服從遠古者，獲得永生。』",
                    approaches: [
                        { type: "意志豁免", check: "DC 14", outcome: "屏蔽心靈干擾，保持清醒的頭腦進行戰鬥" },
                        { type: "洞察", check: "DC 16", outcome: "發現聲音的源頭來自水下的共鳴水晶，破壞它可解除全場Debuff" }
                    ],
                    fail_forward: "一名隊員被暫時魅惑，試圖阻止隊友前進，必須在不殺死他的情況下制服他。"
                },
                {
                    id: "3-B",
                    title: "變形領主",
                    situation: "科皮魯領袖偽裝成一個受傷的冒險者，聲稱自己知道寶藏的秘密。",
                    approaches: [
                        { type: "洞察", check: "DC 18", outcome: "注意到他的傷口沒有流血，且眼神充滿惡意，識破偽裝並發動突襲" },
                        { type: "醫療", check: "接觸", outcome: "在治療時發現他的皮膚觸感像濕滑的魚鱗，觸發戰鬥但處於近身劣勢" }
                    ],
                    fail_forward: "被偷襲重傷（重擊傷害），戰鬥開始時全員處於驚恐狀態。"
                }
            ],
            encounters: ["翼龍群", "科皮魯守衛", "遠古陷阱"],
            treasures: [
                { name: "遠古者寶藏", type: "巨額財富", description: "千年累積" },
                { name: "異界知識", type: "成就", description: "發現外星文明的存在" }
            ],
            endCondition: "探索完神殿，帶著寶藏離開",
            opening_text: "中央高原是一個與世隔絕的世界。這裡的恐龍更加巨大，翼龍在天空盤旋，而最令人不安的是那些會變形的怪物——科皮魯人。他們守護著一座巨大的神殿，據說是由某種超越人類理解的「遠古者」建造的。神殿中充滿了陷阱與寶藏，以及關於這座島嶼真正起源的秘密。"
        }
    ]
};

export default isle_of_dread;
