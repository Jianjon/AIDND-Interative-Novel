const dragon_heist = {
    id: "dragon_heist",
    title: "深水城：龍之劫",
    titleEn: "Waterdeep: Dragon Heist",
    levels: "1-5",
    startLevel: 3,
    synopsis: "深水城的巷弄中隱藏著五十萬金龍幣的秘密。四大勢力競相追逐，而你們作為新晉酒館老闆，意外捲入了這場龍之劫。",
    setting: "深水城",
    seasonal_villains: true,
    acts: [
        {
            act: 1,
            title: "巨魔顱莊園",
            titleEn: "A Friend in Need",
            levelRange: "1-2",
            objective: "獲得酒館作為冒險據點",
            keyEvents: ["酒吧鬥毆救人", "沃洛贈送酒館", "莊園翻新", "鄰居認識"],
            npcs: [
                { name: "沃洛·格丁帕爾", role: "雇主", description: "著名作家，贈送酒館作為報酬", quest: "尋找失蹤的弗恩" },
                { name: "弗恩·斯塔爾", role: "被救者", description: "沃洛的朋友，被困在贊塔林據點" },
                { name: "杜爾南", role: "酒館老闆", description: "哈欠門酒館的主人，建議者" },
                { name: "蘭尼格·索恩", role: "鄰居", description: "酒館附近的木匠" }
            ],
            locations: [
                { name: "哈欠門酒館", description: "著名的冒險者聚集地", boxedText: "這是一個傳奇的地方。巨大的天井佔據了主廳的中央，那個通往地底迷宮的深坑散發著寒氣。冒險者們在此吹噓他們的英勇事蹟，而老杜爾南則默默地擦著酒杯，隨時準備用他的巨劍將爬上來的怪物砍回去。" },
                { name: "贊塔林據點", description: "弗恩被關押處", boxedText: "倉庫位於碼頭區的陰暗角落，空氣中瀰漫著鹹腥的海水味與腐爛的魚腥味。門上有黑蛇的記號——贊塔林會的標誌。裡面傳來拷問的聲音，聽起來像是肯庫人在模仿受害者的慘叫。" },
                { name: "巨魔顱莊園", description: "被贈送的破舊酒館", boxedText: "這棟四層樓的建築位於北區，曾經是一家輝煌的酒館。現在，窗戶破碎，招牌歪斜，屋裡佈滿了厚厚的灰塵與蜘蛛網。最重要的是，據說這裡鬧鬼——一隻名叫『利夫』的半精靈幽靈酒保依然堅守著崗位。" }
            ],
            encounters: ["哈欠門鬥毆", "贊塔林流氓", "酒館修繕"],
            transitions: "獲得這座破舊莊園是福也是禍，你們必須盡快讓它運轉起來：\n1. 向公會借款進行裝修（背負債務但速度快）\n2. 親自與幽靈利夫談判並動手修繕（省錢但耗時）\n3. 尋找投資人（可能捲入派系利益）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "尋找弗恩",
                    situation: "弗恩被關在贊塔林倉庫，守衛是危險的肯庫人與奪心魔的間諜。",
                    approaches: [
                        { type: "潛行", check: "DC 14", outcome: "從屋頂天窗潛入，避開守衛直接救人" },
                        { type: "交涉", check: "威嚇/欺瞞", outcome: "騙或者是嚇唬守衛，讓他們相信大部隊正在包圍這裡" }
                    ],
                    fail_forward: "雖然救出了弗恩，但被趕來的城市守衛誤認為是幫派分子，必須在法庭上證明清白（或者被沃洛保釋）。"
                },
                {
                    id: "1-B",
                    title: "巨魔顱的靈魂",
                    situation: "幽靈酒保利夫拒絕讓任何人接管他的酒館。",
                    approaches: [
                        { type: "服務", check: "無", outcome: "修復吧台並為他倒一杯酒，證明你們尊重傳統" },
                        { type: "驅魔", check: "宗教", outcome: "強行驅逐靈魂，雖然成功但酒館失去了特色" }
                    ],
                    fail_forward: "利夫雖然留下，但會經常製造小麻煩（打破杯子、移動傢俱），直到你們完成每週的營業額目標。"
                }
            ],
            treasures: ["酒館所有權", "初始經營資金"],
            endCondition: "獲得巨魔顱莊園所有權",
            opening_text: "這裡是深水城（Waterdeep），費倫大陸皇冠上的寶石。你們正坐在著名的'哈欠門酒館'（Yawning Portal）裡，這裡以那個通往地底迷宮的巨大天井聞名。著名作家沃洛（Volo）正熱情地向你們講述他的新書，並請求你們幫忙尋找他失蹤的朋友——弗恩。突然，一場酒吧鬥毆打斷了談話，一個巨大的食人魔從天井中爬了出來，身上掛著被吸血後的傷痕。歡迎來到深水城，這裡的機遇與危險一樣多。"
        },
        {
            act: 2,
            title: "火球術事件",
            titleEn: "Fireball",
            levelRange: "2-3",
            objective: "調查在酒館外發生的爆炸案",
            keyEvents: ["格諾姆爆炸", "石頭搜索", "尼姆布萊特遺志", "線索追蹤"],
            npcs: [
                { name: "達拉戈斯·尼姆布萊特", role: "受害者", description: "攜帶格羅爾之石的侏儒，死於爆炸" },
                { name: "巴納巴斯·布朗", role: "目擊者", description: "偶然目擊爆炸的市民" },
                { name: "城市守衛", role: "調查者", description: "深水城的執法力量" }
            ],
            locations: [
                { name: "巨魔顱莊園前", description: "爆炸發生地", boxedText: "這是一個災難現場。燒焦的鵝卵石街道上散落著幾具焦屍。空氣中充滿了硫磺與烤肉的惡臭。圍觀的群眾在竊竊私語，指著你們的酒館——這場爆炸顯然是衝著這裡（或者是某個路過的人）來的。" },
                { name: "城市地下", description: "追蹤格諾姆機器人的路線", boxedText: "深水城的下水道是一個迷宮。這裡不僅有污水，還有無數被遺忘的秘密。通過一個狹窄的維修通道，你們發現了一串細小的金屬腳印，通往深處。" }
            ],
            encounters: ["爆炸現場調查", "地下追逐", "派系代理人"],
            transitions: "爆炸案讓城市守衛高度警戒，你們的調查必須小心：\n1. 與沙爾文探長合作，分享線索（合法但受限）\n2. 獨立追蹤機器人（效率高但可能違法）\n3. 詢問死者（使用死者交談術獲取關鍵情報）",
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "爆炸案現場",
                    situation: "如果不在守衛清理現場前找到線索，真相將永遠石沉大海。",
                    approaches: [
                        { type: "調查", check: "DC 15", outcome: "在殘骸中發現一塊特殊的金屬碎片，屬於某個構造體" },
                        { type: "感知", check: "DC 14", outcome: "注意到一個可疑的身影在屋頂上觀察現場" }
                    ],
                    fail_forward: "錯過現場線索，被迫花費大量金幣去黑市購買情報，且引起了行兇者的注意（之後會有刺客襲擊）。"
                },
                {
                    id: "2-B",
                    title: "機器人的去向",
                    situation: "追蹤機器人進入了下水道，前方是未知的領域。",
                    approaches: [
                        { type: "生存/追蹤", check: "DC 13", outcome: "準確判斷出它的路線，避免繞路" },
                        { type: "奧秘", check: "DC 16", outcome: "感知到魔法構造體的能量波動" }
                    ],
                    fail_forward: "在下水道迷路，遭遇食腐獸或鼠群的攻擊，雖然最終找到目標但已消耗大量資源。"
                }
            ],
            treasures: ["格羅爾之石線索", "尼姆布萊特日記"],
            endCondition: "發現格羅爾之石與寶藏線索",
            opening_text: "一聲震耳欲聾的爆炸打破了深水城的寧靜。你們衝出酒館，看到街道上一片狼藉——一個火球術將整個街區炸得面目全非。在廢墟中，一個侏儒的屍體躺在那裡，他的手中似乎曾握著什麼重要的東西。城市守衛趕來封鎖現場，但你們注意到一個小型的格諾姆機器人正試圖帶著某樣東西逃離⋯"
        },
        {
            act: 3,
            title: "派系競爭",
            titleEn: "Faction Scramble",
            levelRange: "3-4",
            objective: "與四大勢力競爭格羅爾之石",
            keyEvents: ["派系接觸", "線索追蹤", "假面領主情報", "寶藏位置"],
            npcs: [
                { name: "隨季節變化的反派", role: "主要反派", description: "根據季節不同的主要敵人" },
                { name: "珍妮·沃特斯", role: "假面領主", description: "深水城的秘密統治者之一" },
                { name: "各派系代理人", role: "競爭者", description: "贊塔林、黑網、鳴響的笛子等" }
            ],
            locations: [
                { name: "深水城各區", description: "追蹤線索穿越全城", boxedText: "這場追逐戰帶領你們穿越了這座輝煌城市的所有角落。從貴族區的鍍金大門，到碼頭區的骯髒小巷。每一個轉角都可能隱藏著埋伏。屋頂上，神秘的人影在跳躍；如下水道裡，異怪在潛伏。" },
                { name: "派系據點", description: "各勢力的秘密基地", boxedText: "你們終於找到了敵人的老巢。這裡防備森嚴，不僅有武裝的守衛，還有看不見的魔法結界。空氣中充滿了緊張的氣氛，因為所有人都在等待同一個東西——格羅爾之石。" }
            ],
            factions: [
                { name: "贊塔林 (Zhentarim)", faction_type: "犯罪組織", goal: "控制寶藏", description: "只想發財的傭兵與刺客" },
                { name: "黑網 (Xanathar)", faction_type: "奴隸販子", goal: "販賣情報", description: "瘋狂眼魔領導的異怪集團" },
                { name: "布雷甘·達耶 (Bregan D'aerthe)", faction_type: "僱傭兵", goal: "樂趣與利潤", description: "魅力十足的卓爾精靈賈拉索" },
                { name: "卡薩蘭特家族 (Cassalanter)", faction_type: "貴族/邪教徒", goal: "償還靈魂債務", description: "崇拜魔鬼的絕望貴族" }
            ],
            encounters: ["派系衝突", "街頭追逐", "情報交易"],
            transitions: "格羅爾之石的三顆眼睛分散在不同人手中，你們必須：\n1. 策劃一場精密的搶劫（盜賊/吟遊詩人主場）\n2. 攔截敵對派系的運送隊伍（戰鬥主場）\n3. 與反派領主談判（或許他們願意分一杯羹？）",
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "午夜追逐",
                    situation: "拿著寶石的肯庫人正在屋頂上逃跑，而另一隊贊塔林刺客正在攔截。",
                    approaches: [
                        { type: "運動/特技", check: "DC 16", outcome: "在屋頂之間跳躍，搶先一步截住肯庫人" },
                        { type: "遠程攻擊", check: "敏捷", outcome: "精準地射傷他的腿，迫使他掉落街道" }
                    ],
                    fail_forward: "目標被敵對派系抓走，你們必須追蹤他們回到戒備森嚴的別墅，將潛入任務難度提升為地獄級。"
                },
                {
                    id: "3-B",
                    title: "面具舞會",
                    situation: "線索指向一場貴族舞會，只有拿到邀請函才能進入。",
                    approaches: [
                        { type: "社交/魅力", check: "DC 15", outcome: "混入舞會，在衣香鬢影中套出情報" },
                        { type: "偽裝", check: "易容工具", outcome: "假扮成服務生或樂師潛入後臺" }
                    ],
                    fail_forward: "被守衛識破身份趕出舞會（或引發騷動），只能在豪宅外的馬車上依然無獲，被迫綁架一名貴族來拷問情報。"
                }
            ],
            treasures: ["派系情報", "寶藏地圖碎片"],
            endCondition: "獲得石頭位置或被搶先",
            opening_text: "格羅爾之石——一把能打開深水城某處秘密金庫的鑰匙——如今下落不明。五十萬枚金龍幣的傳說吸引了所有人的注意。贊塔林、黑網、還有更危險的勢力都在追蹤這顆石頭。而你們，作為無意中捲入這場遊戲的新人，必須決定是站在哪一邊，還是獨自行動。深水城的街道從未如此危險。"
        },
        {
            act: 4,
            title: "寶藏地窖",
            titleEn: "The Vault",
            levelRange: "4-5",
            objective: "搶先抵達寶藏地點，對抗主要反派",
            keyEvents: ["金庫入口", "季節反派對決", "五十萬金龍幣", "假面領主介入"],
            npcs: [
                { name: "季節反派", role: "最終Boss", description: "根據季節不同：曼舒恩/珍妮/薛梅斯卡/贊塔林領主", cr: 7 },
                { name: "勒薩爾·內維林柏", role: "假面領主", description: "可能出面的深水城領主" }
            ],
            locations: [
                { name: "寶藏金庫", description: "隱藏五十萬金幣的地下室", boxedText: "這裡就是傳說中的金庫。高聳的精金大門上刻著矮人的符文。當大門緩緩打開，金色的光芒照亮了整個地下室——不是魔法，而是堆積如山的五十萬枚金龍幣反射的火光。但在金幣山的頂端，你們的對手已經在那裡等待了。" }
            ],
            boss: { name: "季節反派", cr: 7, type: "視季節而定", abilities: ["視反派而定"], tactics: "視反派而定" },
            encounters: ["金庫陷阱", "反派手下", "最終對決"],
            transitions: "面對這筆足以買下半個城市的巨款，你們的選擇將決定結局：\n1. 為了正義歸還給城市（獲得城市英雄稱號）\n2. 帶著錢逃之夭夭（成為全大陸通緝犯）\n3. 與反派殊死一搏（為了榮耀與生存）",
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "最後的談判",
                    situation: "主要反派（無論是賈拉索還是曼舒恩）提出了一個無法拒絕的條件：分享金幣。",
                    approaches: [
                        { type: "洞察", check: "DC 17", outcome: "看出他們其實在拖延時間，準備發動背刺" },
                        { type: "說服", check: "DC 20", outcome: "達成一個真正的休戰協議（僅限守序陣營反派）" }
                    ],
                    fail_forward: "談判破裂，反派發動突襲並獲得驚喜輪，戰鬥在金幣堆上爆發，每回合都有可能觸發金幣崩塌（敏捷豁免）。"
                },
                {
                    id: "4-B",
                    title: "黃金的代價",
                    situation: "金庫的守護靈——一條金龍（或者其幻影）甦醒了，它要求證明你們有資格擁有這些財富。",
                    approaches: [
                        { type: "歷史/宗教", check: "DC 15", outcome: "引用古代契約，證明這些金幣屬於深水城市民" },
                        { type: "戰鬥/欺騙", check: "無", outcome: "試圖騙過守護靈或強行奪取" }
                    ],
                    fail_forward: "守護靈啟動防禦系統，金庫開始注水或釋放毒氣，戰鬥變成了限時逃脫任務，能拿多少是多少。"
                }
            ],
            treasures: [
                { name: "五十萬金龍幣", type: "財寶", description: "可能的巨額獎勵" },
                { name: "政治影響力", type: "獎勵", description: "在深水城的地位" }
            ],
            moral_choices: [
                { choice: "獨吞寶藏", consequence: "成為深水城新富，但樹敵眾多" },
                { choice: "與假面領主分享", consequence: "獲得政治保護" },
                { choice: "歸還原主", consequence: "獲得道德聲譽" }
            ],
            endCondition: "獲得（或失去）寶藏",
            opening_text: "一切的線索都指向這裡——深水城地下的一個隱藏金庫，那裡存放著內維林柏家族消失的五十萬金龍幣。但你們不是唯一找到這裡的人。季節反派（根據你們遊玩的季節不同）已經帶著他們的手下到達。這是最後的競賽，勝者將獲得足以改變深水城權力平衡的財富。金庫的大門就在眼前，你們準備好了嗎？"
        }
    ]
};

export default dragon_heist;
