const shadow_dragon_queen = {
    id: "shadow_dragon_queen",
    title: "龍后之影",
    titleEn: "Shadow of the Dragon Queen",
    levels: "1-11",
    startLevel: 3,
    synopsis: "傳說中的龍槍戰爭再次點燃。紅龍軍團席捲克萊恩大陸。冒險者將從一個小村莊的保衛者，成長為對抗飛行堡壘的戰爭英雄。",
    playTime: "40-60小時",
    setting: "克萊恩世界（索拉姆尼亞）",
    acts: [
        {
            act: 1,
            title: "暴風先兆",
            titleEn: "The War Begins",
            levelRange: "1-3",
            objective: "在沃格勒村的慶典中倖存，並組織撤離",
            keyEvents: ["翠鳥節", "重演戰役", "龍人突襲", "大撤退"],
            npcs: [
                { name: "達拉瑪", role: "市長", description: "沃格勒的村長，猶豫不決" },
                { name: "貝克特", role: "老兵", description: "你的導師，前索拉姆尼亞輔助軍" },
                { name: "紅龍軍團先鋒", role: "敵人", description: "執行焦土政策的龍人部隊" }
            ],
            locations: [
                { name: "沃格勒村", description: "最後的和平", boxedText: "翠鳥節的彩帶還掛在樹上，但空氣中已經充滿了硝煙。這是你們的家，或者至少是你們暫時的避風港。但從森林邊緣湧出的黑甲士兵——龍人（Draconians），正在將這裡變成地獄。" },
                { name: "高崖渡口", description: "唯一的撤退路線", boxedText: "這是一個簡單的絞盤渡船。成百上千的村民擠在河岸上，恐懼的尖叫此起彼落。身後，村莊正在燃燒。你們必須守住這條線。" }
            ],
            transitions: "英雄是在火焰中誕生的：\n1. 在這場必敗的戰鬥中儘可能拖延時間（回合制防禦戰）\n2. 說服頑固的市長下達撤退命令（社交挑戰）\n3. 利用節慶剩下的煙火製造混亂（戰術欺騙）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "死亡斷後",
                    situation: "大部分村民已經上船，但還有一隊龍人正衝向受傷的貝克特。",
                    approaches: [
                        { type: "救援", check: "戰鬥", outcome: "衝入敵陣救出老兵，雖然受傷但保住了團隊的核心" },
                        { type: "遠程掩護", check: "敏捷 (弓弩/法術)", outcome: "精準射擊壓制敵人，爭取時間" }
                    ],
                    fail_forward: "貝克特為了掩護你們被俘（或戰死），將他的家傳寶劍扔給了你們。帶著悲痛，你們切斷了渡船的繩索。"
                }
            ],
            opening_text: "這本該是個歡樂的日子。沃格勒村正舉辦著一年一度的翠鳥節。你們在廣場上歡笑，參加釣魚比賽，觀看重演戰役。但現實的戰爭來得如此突然。當紅色的巨龍陰影遮蔽了太陽，當第一聲龍人的嘶吼打破寧靜，和平結束了。現在，重要的不是勝利，而是生存。"
        },
        {
            act: 2,
            title: "卡拉曼防線",
            titleEn: "Defense of Kalaman",
            levelRange: "3-4",
            objective: "加入卡拉曼軍隊，在圍城戰中證明自己",
            keyEvents: ["難民安置", "加入軍隊", "威爾漢的背叛", "第一次大規模會戰"],
            npcs: [
                { name: "威爾漢總督", role: "指揮官", description: "卡拉曼的軍事領袖，似乎隱藏著秘密" },
                { name: "卡拉曼騎士團", role: "盟友", description: "索拉姆尼亞騎士的殘部" }
            ],
            locations: [
                { name: "卡拉曼城", description: "北方的堡壘", boxedText: "高聳的城牆上插滿了旗幟。這裡是抵抗紅龍軍團的前線。難民營在城外蔓延。城內，軍隊正在緊急動員。你們不再是冒險者，你們是士兵。" },
                { name: "前線哨站", description: "危險的緩衝區", boxedText: "壕溝、拒馬、泥濘。這裡是絞肉機。龍軍的巡邏隊每天都在試探防線。" }
            ],
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "軍令如山",
                    situation: "一名上級軍官命令你們去修復一個暴露在龍息下的防禦塔，這幾乎是自殺任務。",
                    approaches: [
                        { type: "服從", check: "體質/敏捷", outcome: "冒死完成任務，獲得軍隊的尊敬與晉升" },
                        { type: "抗命", check: "說服 DC 15", outcome: "提出一個更好的戰術方案（如夜間潛入），雖然激怒了長官但被總督採納" }
                    ],
                    fail_forward: "任務失敗，防禦塔被毀，你們被降職到敢死隊，負責最危險的偵察任務。"
                }
            ],
            war_mechanics: true,
            treasures: ["軍階晉升", "制式裝備"],
            opening_text: "帶著沃格勒的倖存者，你們抵達了卡拉曼（Kalaman）。這座堡壘城市是北方最後的希望。你們被編入了軍隊，並很快發現，這場戰爭不僅僅是劍與盾的碰撞，更是情報與意志的較量。龍軍似乎總能預知你們的部署。有間諜在我們中間。"
        },
        {
            act: 3,
            title: "北方荒原",
            titleEn: "The Northern Wastes",
            levelRange: "5-6",
            objective: "深入敵後荒原，尋找龍軍力量的源頭",
            keyEvents: ["海難遺跡", "黑湖部落", "尋找迷失之城", "大荒原生存"],
            npcs: [
                { name: "達拉瑪（流亡者）", role: "嚮導", description: "熟悉荒原的法師（未來的大法師？）" },
                { name: "伊思特瓦爾", role: "龍軍將軍", description: "負責荒原行動的黑龍人", cr: 8 }
            ],
            locations: [
                { name: "北方荒原", description: "充滿危險的沼澤與峽谷", boxedText: "這裡的地形險惡，充滿了流沙與酸液池。古代的遺跡在泥沼中若隱若現。你們必須小心導航，錯走一步就是死亡。" },
                { name: "沉船與巨龍", description: "著名的地標", boxedText: "一艘巨大的古代戰艦殘骸卡在兩座山鋒之間。據說裡面藏著通往『迷失之城』的地圖。" }
            ],
            hex_exploration: true,
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "荒原的法則",
                    situation: "一隊哥布林騎兵包圍了你們，他們不是龍軍，是這裡的原住民。",
                    approaches: [
                        { type: "談判", check: "語言/交涉", outcome: "用食物換取和平，甚至獲得荒原的地圖" },
                        { type: "戰鬥", check: "騎戰", outcome: "在泥沼中與狼騎兵戰鬥，獲得他們的坐騎" }
                    ],
                    fail_forward: "這是一個陷阱，你們掉入了坑洞，必須在巨型蠍子到來前爬出去。"
                }
            ],
            treasures: ["古代地圖", "荒原生存裝備"],
            opening_text: "情報顯示，龍軍正在北方荒原尋找某樣東西——某樣能夠決定戰爭勝負的古代兵器。你們受命深入敵後。這裡沒有補給，沒有援軍。只有無盡的荒原、野蠻的部落，以及埋藏在泥土下的歷史。找到他們在找的東西，然後摧毀它。"
        },
        {
            act: 4,
            title: "迷失之城",
            titleEn: "City of Lost Names",
            levelRange: "7-8",
            objective: "在古城廢墟升空前，阻止龍軍的計畫",
            keyEvents: ["進入古城", "啟動閾限之塔", "與死亡騎士戰鬥", "城市升空"],
            npcs: [
                { name: "索思爵士", role: "死亡騎士", description: "傳奇的死亡騎士，龍后的盟友", cr: 18, legendary: true, dialogue: "如果你想要這座城市，就來拿吧。" },
                { name: "勒奧德克斯", role: "龍軍指揮官", description: "試圖控制城市的龍人" }
            ],
            locations: [
                { name: "迷失之城", description: "魔法懸浮的古代廢墟", boxedText: "這座城市違背重力地漂浮在巨坑之上。宏偉的尖塔、破碎的街道。這是魔法時代的輝煌遺產。龍軍正在拼命修復它的動力系統，試圖把它變成一座飛行堡壘。" },
                { name: "閾限之塔", description: "控制中樞", boxedText: "塔頂閃爍著不祥的紫光。索思爵士正站在那裡，注視著下面的螻蟻。" }
            ],
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "死亡騎士的凝視",
                    situation: "你們遭遇了索思爵士。他實在太強大了，正面對抗必死無疑。",
                    approaches: [
                        { type: "榮譽", check: "歷史/宗教", outcome: "喚起他作為索拉姆尼亞騎士的舊日記憶，讓他放你們一馬（暫時）" },
                        { type: "逃跑/機關", check: "特技/敏捷", outcome: "利用城市的崩塌地形與他周旋，直到逃入控制室" }
                    ],
                    fail_forward: "被索思一招擊潰（全員 1 HP），他嘲笑你們不值得他動手，並命令部下處決你們（進入逃脫戰）。"
                }
            ],
            endCondition: "未能阻止城市升空，但成功潛伏在城市內部",
            opening_text: "你們找到了它——迷失之城。一座能夠飛行的古代都市。這就是龍軍的終極武器。如果讓這座城市飛到卡拉曼上空，戰爭就結束了。你們必須滲透進去，在它完全啟動前破壞核心。但一個恐怖的身影擋在前方：索思爵士，傳說中的死亡騎士，玫瑰騎士團的墮落者。"
        },
        {
            act: 5,
            title: "天際決戰",
            titleEn: "The Sky Citadel",
            levelRange: "9-11",
            objective: "在萬米高空摧毀這座飛行要塞",
            keyEvents: ["破壞動力源", "龍背空戰", "最終決戰", "墜落求生"],
            npcs: [
                { name: "紅龍軍團高階督軍", role: "最終Boss", description: "駕馭紅龍的統帥", cr: 14 },
                { name: "紅龍奧卓斯", role: "Boss坐騎", description: "成年紅龍", cr: 17 }
            ],
            locations: [
                { name: "雲端之上", description: "戰場環境", boxedText: "這裡的空氣稀薄，寒冷入骨。下方是縮小的卡拉曼城。戰鬥在城市的邊緣、在龍背上、在搖搖欲墜的塔樓間進行。" },
                { name: "城市核心", description: "毀滅的中心", boxedText: "這是最後的決戰點。只要破壞這裡，城市就會墜毀。" }
            ],
            boss: { name: "督軍與紅龍", cr: 20, abilities: ["空中優勢", "噴火俯衝", "軍團召喚"], tactics: "利用飛行能力在空中風箏玩家，玩家需利用弩砲或飛行魔法反擊" },
            strategic_nodes: [
                {
                    id: "5-A",
                    title: "同歸於盡",
                    situation: "核心已經過載，城市開始墜落。督軍試圖騎龍逃跑。",
                    approaches: [
                        { type: "特技追擊", check: "DC 20", outcome: "跳上龍背，將督軍擊落，確保他與城市一起毀滅" },
                        { type: "緊急撤離", check: "羽落術/飛行坐騎", outcome: "召喚巨鷹或使用法術，在千鈞一髮之際帶著隊友跳出城市" }
                    ],
                    fail_forward: "城市墜毀在荒原上（而非卡拉曼），你們奇蹟般生還，但失去了大部分裝備，並在之後的搜救中被發現。"
                }
            ],
            endCondition: "摧毀飛行堡壘，拯救卡拉曼",
            treasures: ["卡拉曼英雄勳章", "龍槍（完整版）"],
            opening_text: "城市升空了。風在耳邊呼嘯。你們正站在一座飛行的毀滅武器上，腳下是數萬無辜的生命。卡拉曼的城牆在這一武器面前如同紙糊。沒有援軍，沒有退路。這就是結局。摧毀這座城市，或者陪它一起墜落。為了索拉姆尼亞！"
        }
    ]
};

export default shadow_dragon_queen;
