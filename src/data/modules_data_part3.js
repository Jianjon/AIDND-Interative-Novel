/**
 * Module Plot Data - Part 3 (Enhanced Modules)
 * Storm King's Thunder, Descent into Avernus, Rime of Frostmaiden, Dragon Heist
 */

export const MODULES_PART3 = {
    "storm_kings_thunder_enhanced": {
        id: "storm_kings_thunder",
        title: "風暴君王之雷霆",
        titleEn: "Storm King's Thunder",
        levels: "1-11",
        startLevel: 5,
        synopsis: "巨人階級制度崩潰，各派巨人領主開始襲擊人類定居點。冒險者必須找出背後的陰謀，恢復風暴巨人國王的統治。",
        setting: "劍灣北地",
        acts: [
            {
                act: 1,
                title: "巨人襲擊",
                titleEn: "A Great Upheaval",
                levelRange: "1-5",
                objective: "親眼見證巨人對人類城鎮的襲擊",
                keyEvents: ["夜石鎮陷落", "哥布林入侵", "七蛇丘調查", "巨人蹤跡"],
                npcs: [
                    { name: "莫拉克·烏維札", role: "受害者", description: "夜石鎮的女領主，被雲巨人綁架" },
                    { name: "洛斯·瓦頓恩", role: "牧師", description: "拉桑德的牧師，鎮上的精神支柱" },
                    { name: "凱拉", role: "間諜", description: "贊塔林的臥底商人" }
                ],
                locations: [
                    { name: "夜石鎮", description: "被雲巨人從天空投擲巨石摧毀的城鎮" },
                    { name: "七蛇丘", description: "神秘的蛇人遺跡" },
                    { name: "骨頭洞", description: "哥布林的圍攻來源" }
                ],
                encounters: ["哥布林突襲隊", "蝙蝠騎士", "山丘巨人 (可能)"],
                treasures: ["夜石 (黑色方尖碑)", "城鎮物資"],
                endCondition: "發現巨人階級制度崩潰",
                opening_text: "這原本只是一個簡單的送信任務，但當你們抵達夜石鎮（Nightstone）時，迎接你們的卻是一片死寂。城鎮的大門敞開，原本宏偉的防禦鐘樓如今只剩下一堆碎石，彷彿被某種巨大的力量從天而降砸毀。街道上空無一人，只有遠處傳來哥布林尖銳的竊笑聲與劫掠的聲音。居民們似乎都逃走了，留下一座空城與等待被解開的謎團。那個巨大的坑洞中，一塊黑色的方尖碑正散發著不安的氣息。"
            },
            {
                act: 2,
                title: "北地探索",
                titleEn: "Rune of the Storm",
                levelRange: "5-6",
                objective: "在巨人肆虐的北地生存並收集情報",
                keyEvents: ["崔波爾巨人襲擊", "雅爾塔巨人港", "哈珀斯情報網", "贊塔林暗盤"],
                npcs: [
                    { name: "贊德里爾", role: "哈珀斯間諜", description: "提供情報的秘密組織成員" },
                    { name: "赫林", role: "贊塔林代理", description: "黑網代理人，有自己的目的" },
                    { name: "各派巨人斥候", role: "敵人", description: "在北地遊蕩的巨人偵察隊" }
                ],
                locations: [
                    { name: "崔波爾", description: "多次被巨人襲擊的城鎮" },
                    { name: "雅爾塔", description: "冰凍北地的貿易港" },
                    { name: "布林斯達", description: "霜巨人出沒的危險區域" }
                ],
                encounters: ["山丘巨人掠奪隊", "霜巨人斥候", "火巨人工匠"],
                sandbox_exploration: true,
                endCondition: "得知風暴巨人國王失蹤",
                opening_text: "北地（The North）正在燃燒。巨人的襲擊不再是偶發事件，而是系統性的破壞。山丘巨人在鄉村劫掠食物，霜巨人在海岸線搶奪物資，而火巨人似乎在尋找某種古老的武器。各個城鎮都在尋求冒險者的幫助，而你們的名聲讓許多人向你們求援。哈珀斯與贊塔林都注意到了你們，並試圖將你們拉入他們的網絡。是時候選擇站在哪一邊了。"
            },
            {
                act: 3,
                title: "神諭之眼",
                titleEn: "The Eye of the All-Father",
                levelRange: "7-8",
                objective: "尋找神諭獲得恢復秩序的方法",
                keyEvents: ["冰雪神殿探索", "赫卡頓殘影", "安南神諭", "巨人歷史揭示"],
                npcs: [
                    { name: "哈斯尼亞", role: "風暴巨人同盟", description: "願意幫助的風暴巨人女兒", ally: true },
                    { name: "伊米爾的詛咒", role: "威脅", description: "被囚禁的遠古霜巨人精髓" },
                    { name: "安南", role: "巨人之神", description: "創造巨人的神祇，透過神諭溝通" }
                ],
                locations: [
                    { name: "眾父之眼", description: "巨人的古老神殿" },
                    { name: "冰封聖殿", description: "神諭所在的神聖之地" }
                ],
                encounters: ["冰霜衛士", "野蠻人守護者", "神殿陷阱"],
                treasures: ["神諭符文", "巨人遺物"],
                endCondition: "獲得擊敗各派巨人領主的線索",
                opening_text: "傳說中「眾父之眼」（Eye of the All-Father）是巨人的神聖遺跡，那裡保存著安南之神留下的神諭。據說神諭能揭示過去與未來，告訴凡人如何應對巨人的威脅。神殿位於霜脊山脈（Spine of the World）的深處，常年被冰雪覆蓋。風暴巨人哈斯尼亞願意帶領你們前往，但警告這段旅程將充滿危險。"
            },
            {
                act: 4,
                title: "巨人據點",
                titleEn: "Clash of the Titans",
                levelRange: "8-9",
                objective: "潛入巨人領主據點，削弱他們的力量",
                keyEvents: ["山丘巨人格魯德", "霜巨人斯托瓦德", "火巨人扎爾托", "獲取符文碎片"],
                npcs: [
                    { name: "格魯德", role: "山丘巨人酋長", description: "貪婪的山丘巨人領袖", cr: 9 },
                    { name: "斯托瓦德大雅爾", role: "霜巨人領主", description: "試圖重建古老帝國的野心家", cr: 14 },
                    { name: "扎爾托公爵", role: "火巨人領主", description: "尋找馮因德魯神器的鑄造大師", cr: 14 }
                ],
                locations: [
                    { name: "格魯德大廳", description: "山丘巨人的骯髒據點" },
                    { name: "冰風谷", description: "霜巨人的冰凍要塞" },
                    { name: "鐵渣要塞", description: "火巨人的巨型鍛造廠" }
                ],
                encounters: ["巨人護衛", "變巨獸", "各派巨人軍隊"],
                moral_choices: [
                    { choice: "一一擊敗巨人領主", consequence: "獲得最多符文碎片" },
                    { choice: "談判協議", consequence: "部分和平但無法獲得所有碎片" }
                ],
                treasures: ["符文碎片", "巨人寶藏"],
                endCondition: "獲得風暴巨人信任或擊敗威脅",
                opening_text: "安南的神諭很明確：要恢復秩序，必須從失衡的巨人領主手中奪取力量。山丘巨人的格魯德酋長、霜巨人的斯托瓦德大雅爾、火巨人的扎爾托公爵——他們各自懷抱野心，試圖打破巨人的傳統階級制度。神諭賜予你們符文碎片，每一塊都能用來對抗一個巨人領主。選擇你們的目標吧。"
            },
            {
                act: 5,
                title: "風暴王庭",
                titleEn: "Storm King's Court",
                levelRange: "10-11",
                objective: "解救風暴巨人王，恢復巨人階級秩序",
                keyEvents: ["海洋王庭梅爾斯卓姆", "海妖斯拉克霍斯陰謀", "赫卡頓國王歸位", "秩序恢復"],
                npcs: [
                    { name: "赫卡頓", role: "風暴巨人國王", description: "被囚禁的巨人之王，失去記憶", cr: 15 },
                    { name: "斯拉克霍斯", role: "海妖女王", description: "囚禁赫卡頓的幕後黑手", cr: 14 },
                    { name: "伊絲德", role: "風暴巨人公主", description: "赫卡頓的女兒，尋求父親下落" },
                    { name: "維特維德", role: "雲巨人", description: "可能的盟友" }
                ],
                locations: [
                    { name: "梅爾斯卓姆", description: "風暴巨人的海底王庭" },
                    { name: "斯拉克霍斯巢穴", description: "海妖的海底洞穴" }
                ],
                boss: { name: "斯拉克霍斯", cr: 14, type: "海妖女王", abilities: ["閃電風暴", "心靈控制", "海洋召喚"], tactics: "利用水下環境優勢" },
                encounters: ["海妖軍團", "受控巨人", "海洋怪物"],
                treasures: [
                    { name: "雷霆王冠", type: "神器", description: "風暴巨人國王的權力象徵" },
                    { name: "海底寶藏", type: "財富", description: "沉沒船隻的累積" }
                ],
                endCondition: "巨人王回歸，秩序恢復",
                opening_text: "風暴巨人國王赫卡頓（Hekaton）被囚禁在海洋深處，被海妖女王斯拉克霍斯控制。這就是巨人階級崩潰的真正原因——沒有風暴巨人的統治，其他巨人開始自行其是。公主伊絲德請求你們幫助尋找她的父親。前往海底王庭梅爾斯卓姆的旅程充滿危險，但這是恢復塵世巨人秩序的唯一方法。準備好潛入海洋深淵了嗎？"
            }
        ]
    },

    "descent_into_avernus_enhanced": {
        id: "descent_into_avernus",
        title: "墜入阿佛納斯",
        titleEn: "Descent into Avernus",
        levels: "1-13",
        startLevel: 5,
        synopsis: "聖城艾爾托瑞爾墜入地獄第一層。冒險者必須深入血戰荒原，駕駛地獄戰車，面對墮落大天使扎瑞爾，決定一座城市的命運。",
        setting: "博德之門與阿佛納斯",
        acts: [
            {
                act: 1,
                title: "博德之門",
                titleEn: "A Tale of Two Cities",
                levelRange: "1-4",
                objective: "調查艾爾托瑞爾消失事件",
                keyEvents: ["火拳傭兵任務", "死亡三冠邪教", "地獄契約發現", "盧迪斯過去"],
                npcs: [
                    { name: "佐奇", role: "雇主", description: "火拳傭兵團的指揮官", quest: "調查邪教" },
                    { name: "瑞維亞·瓦拉德莫", role: "祕密盟友", description: "隱藏身份的地獄騎士", secret: "盧迪斯的轉世" },
                    { name: "死亡三神領袖", role: "敵人", description: "崇拜死亡三神的邪教首領", cr: 5 }
                ],
                locations: [
                    { name: "博德之門", description: "充滿犯罪的大城市" },
                    { name: "火拳總部", description: "傭兵團的指揮中心" },
                    { name: "邪教藏身處", description: "下水道深處的秘密基地" }
                ],
                encounters: ["邪教徒", "不死生物", "下水道怪物"],
                treasures: ["邪教文件", "地獄契約副本"],
                endCondition: "發現艾爾托瑞爾被拖入地獄",
                opening_text: "博德之門（Baldur's Gate），這座罪惡之都正陷入前所未有的恐慌。鄰近的聖城艾爾托瑞爾（Elturel）在一夜之間憑空消失，成千上萬的難民湧入城門。為了維持秩序，鐵王座的傭兵團'火拳'封鎖了城市，並強行徵召冒險者協助調查。你們被帶到了火拳指揮官佐奇面前，他懷疑這一切與崇拜死亡三神的邪教有關。如果不盡快查明真相，博德之門恐怕將是下一個消失的城市。"
            },
            {
                act: 2,
                title: "地獄入口",
                titleEn: "Through the Gate",
                levelRange: "5-6",
                objective: "進入阿佛納斯，尋找墜落之城",
                keyEvents: ["艾爾托瑞爾鏈鎖", "高天使盧迪斯", "地獄荒原初探", "瑞維亞真身"],
                npcs: [
                    { name: "盧迪斯", role: "墮落天使", description: "曾經的高天使，簽下地獄契約", legendary: true },
                    { name: "艾爾托瑞爾難民", role: "被困者", description: "在地獄中掙扎求生的平民" },
                    { name: "低階魔鬼", role: "敵人/交易對象", description: "地獄的居民" }
                ],
                locations: [
                    { name: "艾爾托瑞爾廢墟", description: "被鎖鏈懸吊在地獄上空的聖城" },
                    { name: "阿佛納斯入口", description: "通往血戰荒原的第一步" }
                ],
                encounters: ["低階魔鬼", "惡魔劫掠隊", "受詛咒的亡魂"],
                treasures: ["地獄生存裝備", "盧迪斯的日記碎片"],
                endCondition: "進入阿佛納斯平原",
                opening_text: "傳送門將你們送入了一個完全不同的世界。這裡的天空是血紅色的，大地是焦黑的岩石與硫磺，空氣中瀰漫著燃燒與腐敗的氣息。這就是阿佛納斯（Avernus），九層地獄的第一層，永恆血戰的戰場。遠處的天際，一座城市被巨大的鏈鎖懸吊在虛空中，緩慢地向地獄深處下沉。那就是艾爾托瑞爾。你們還有時間，但不多了。"
            },
            {
                act: 3,
                title: "血戰荒原",
                titleEn: "Avernus",
                levelRange: "6-9",
                objective: "駕駛地獄戰車，蒐集拯救城市的資訊",
                keyEvents: ["瘋乖求死者", "戰車獲取與改裝", "惡魔與魔鬼交涉", "扎瑞爾線索"],
                npcs: [
                    { name: "瘋乖求死者", role: "NPC團隊", description: "願意幫助的地獄求死者群體" },
                    { name: "歐爾登鐵", role: "戰車商人", description: "販賣地獄戰車零件的惡魔" },
                    { name: "各派系代表", role: "交易對象", description: "魔鬼領主的使者" }
                ],
                locations: [
                    { name: "血戰荒原", description: "惡魔與魔鬼永恆交戰的廢土" },
                    { name: "求死者據點", description: "尋求解脫的靈魂聚集地" },
                    { name: "戰車殘骸場", description: "改裝地獄戰車的地方" }
                ],
                infernal_war_machines: true,
                encounters: ["惡魔巡邏隊", "魔鬼收稅官", "地獄風暴", "其他戰車隊伍"],
                treasures: ["靈魂硬幣", "戰車零件", "地獄武器"],
                endCondition: "獲得扎瑞爾大天使墮落線索",
                opening_text: "在阿佛納斯生存的唯一方法就是不要停下來。你們找到了一輛破舊但可用的地獄戰車——這種由惡魔靈魂驅動的載具是血戰荒原的必備工具。隨著引擎的咆哮，你們衝入了這片燃燒的大地。「瘋乖求死者」——一群尋求在地獄中終結存在的靈魂——願意幫助你們，但他們的代價是永恆的解脫。扎瑞爾，這片地獄的統治者，是拯救艾爾托瑞爾的關鍵。但她曾經是一位大天使⋯"
            },
            {
                act: 4,
                title: "救贖之路",
                titleEn: "Path to Redemption",
                levelRange: "9-11",
                objective: "尋找能讓扎瑞爾回心轉意的聖物",
                keyEvents: ["聖劍碎片", "盧迪斯的記憶", "扎瑞爾真實過去", "骸骨要塞"],
                npcs: [
                    { name: "耶爾", role: "獨角獸", description: "被困在地獄的天界生物，保管聖劍一部分", legendary: true },
                    { name: "阿克迪斯", role: "亡靈法師", description: "知道聖劍歷史的古老存在", cr: 12 },
                    { name: "提亞瑪特信徒", role: "敵人", description: "也在尋找聖劍的龍神崇拜者" }
                ],
                locations: [
                    { name: "骸骨要塞", description: "由骨骸構成的邪惡堡壘" },
                    { name: "碎片聖地", description: "聖劍碎片被藏匿的各處" }
                ],
                encounters: ["提亞瑪特使者", "地獄守護者", "記憶幻象"],
                treasures: [
                    { name: "聖劍碎片", type: "神器組件", description: "扎瑞爾曾經的武器" }
                ],
                endCondition: "收集扎瑞爾救贖或毀滅的關鍵",
                opening_text: "扎瑞爾曾經是天界最勇敢的戰士，帶領天軍對抗地獄入侵。但她犯了一個致命的錯誤——她太過深入地獄，最終被腐蝕並墮落。然而，傳說她曾擁有一把聖劍，象徵著她曾經的榮耀。如果能找到這把劍，喚醒扎瑞爾心中殘存的光明⋯也許有救贖的可能。聖劍被分成了多個碎片，散落在阿佛納斯各處。"
            },
            {
                act: 5,
                title: "扎瑞爾之塔",
                titleEn: "Zariel's Fall",
                levelRange: "11-13",
                objective: "面對墮落大天使，決定城市命運",
                keyEvents: ["魔鬼契約談判", "救贖或毀滅抉擇", "艾爾托瑞爾釋放", "扎瑞爾命運"],
                npcs: [
                    { name: "扎瑞爾", role: "最終Boss/救贖對象", description: "阿佛納斯的統治者，墮落大天使", cr: 26, legendary: true }
                ],
                locations: [
                    { name: "扎瑞爾之塔", description: "地獄執政官的堡壘" }
                ],
                boss: { name: "扎瑞爾", cr: 26, type: "墮落大天使", abilities: ["傳說行動", "火焰光環", "毀滅之劍"], tactics: "可被說服救贖或必須被擊敗" },
                moral_choices: [
                    { choice: "用聖劍救贖扎瑞爾", consequence: "扎瑞爾恢復大天使身份，釋放艾爾托瑞爾" },
                    { choice: "擊敗扎瑞爾", consequence: "強行打破契約，但可能有後果" },
                    { choice: "與扎瑞爾談判", consequence: "交出靈魂換取城市自由" }
                ],
                treasures: ["扎瑞爾的寶藏", "地獄契約解除"],
                endCondition: "拯救或毀滅艾爾托瑞爾",
                opening_text: "扎瑞爾的塔樓聳立在血紅的天空下，黑色的火焰從尖頂噴湧而出。這就是阿佛納斯的心臟，也是拯救艾爾托瑞爾的最後一站。你們手中握有聖劍的碎片（如果你們找到了的話），這可能是喚醒扎瑞爾內心光明的唯一機會。然而，墮落大天使並不會輕易放棄她的力量。「你們帶來了什麼給我？」扎瑞爾的聲音如同燃燒的劍刃，「是來談判的，還是來送死的？」這是決定一座城市命運的時刻。"
            }
        ]
    },

    "rime_of_frostmaiden_enhanced": {
        id: "rime_of_frostmaiden",
        title: "冰霜少女的憤怒",
        titleEn: "Rime of the Frostmaiden",
        levels: "1-12",
        startLevel: 3,
        synopsis: "冰霜女神歐呂爾降下無盡的永夜與寒冬。冒險者必須在十鎮求生，揭開冰封的遠古秘密，並挑戰女神本人。",
        setting: "冰風之谷",
        acts: [
            {
                act: 1,
                title: "永夜十鎮",
                titleEn: "Ten-Towns",
                levelRange: "1-4",
                objective: "在永夜籠罩的十鎮中調查異常事件",
                keyEvents: ["人祭傳統", "連環殺手追蹤", "凍湖怪物", "各鎮任務"],
                npcs: [
                    { name: "丹妮卡·西力斯特", role: "十鎮議長", description: "布林山德的領袖，試圖維持秩序" },
                    { name: "斯福德拉", role: "連環殺手", description: "在暗處獵殺的神秘兇手", cr: 5, enemy: true },
                    { name: "各鎮領袖", role: "任務提供者", description: "十個城鎮的不同領導者" }
                ],
                locations: [
                    { name: "布林山德", description: "十鎮中最大的城鎮" },
                    { name: "伊斯特哈文", description: "捕魚村莊，有古老的傳統" },
                    { name: "道格斯明爾", description: "礦業城鎮" }
                ],
                cold_survival: true,
                encounters: ["冰霜生物", "殭屍遊蕩", "凍湖怪物", "連環殺手"],
                treasures: ["求生物資", "鎮民感謝"],
                endCondition: "發現歐呂爾女神是永夜源頭",
                opening_text: "冰風之谷（Icewind Dale）已經兩年沒有見過太陽了。被稱為'冰霜少女'的歐呂爾女神降下了無盡的寒冬與永夜，將這片土地封鎖在冰雪之中。你們來到了十鎮之一的布林山德（Bryn Shander），刺骨的寒風如刀割般掠過。鎮民們竊竊私語，討論著即將到來的人祭儀式——為了平息女神的憤怒，他們必須獻上祭品。然而，除了寒冷，一種更深層的恐懼正在蔓延：連環殺手在黑暗中潛伏，湖底的怪物蠢蠢欲動。這是一個關於生存的故事。"
            },
            {
                act: 2,
                title: "冰原探索",
                titleEn: "Frozen Wilderness",
                levelRange: "4-6",
                objective: "探索冰風之谷的秘密與危險",
                keyEvents: ["冰霜巨人遺跡", "覺醒族亡靈", "凍原德魯伊", "歐呂爾考驗"],
                npcs: [
                    { name: "歐呂爾的僕從", role: "敵人", description: "冰霜女神的狂熱信徒", cr: 5 },
                    { name: "覺醒族亡靈", role: "敵人", description: "被詛咒的遠古部落", cr: 6 },
                    { name: "凍原德魯伊", role: "NPC", description: "知曉谷地秘密的自然守護者" }
                ],
                locations: [
                    { name: "冰風之谷荒野", description: "永恆寒冬的冰原" },
                    { name: "覺醒族墓穴", description: "被詛咒的遺跡" },
                    { name: "歐呂爾聖地", description: "女神的祭壇" }
                ],
                hazards: ["極寒", "暴風雪", "薄冰", "雪盲"],
                encounters: ["冰霜巨人殘黨", "覺醒族殭屍", "寒冷元素"],
                treasures: ["遠古遺物", "歐呂爾秘密"],
                endCondition: "得知灰矮人要塞位置",
                opening_text: "十鎮只是冰風之谷的入口。更深處，是無人敢涉足的冰原荒野。傳說冰霜巨人的遺跡埋藏在那裡，而覺醒族——一個被詛咒的遠古部落——據說仍在徘徊。凍原德魯伊警告你們：「歐呂爾的眼睛無處不在。你們越深入，她就越能感受到你們的存在。」然而，如果要理解這場永夜的真正意義，就必須繼續前進。"
            },
            {
                act: 3,
                title: "毀滅之光",
                titleEn: "Sunblight",
                levelRange: "6-8",
                objective: "阻止灰矮人啟動毀滅性武器",
                keyEvents: ["森布萊特要塞滲透", "查達克復仇計畫", "毀滅巨獸追逐", "時間賽跑"],
                npcs: [
                    { name: "查達克·森布萊特", role: "灰矮人領主", description: "瘋狂的灰矮人王，計劃用巨獸毀滅十鎮", cr: 9 },
                    { name: "毀滅巨獸", role: "武器", description: "由查達克創造的毀滅性機械巨龍", cr: 15 },
                    { name: "灰矮人工匠", role: "敵人", description: "森布萊特要塞的居民" }
                ],
                locations: [
                    { name: "森布萊特要塞", description: "灰矮人的地下堡壘" },
                    { name: "毀滅巨獸發射場", description: "機械龍啟動的地點" }
                ],
                encounters: ["灰矮人軍隊", "機械守衛", "查達克對決", "巨獸追逐"],
                treasures: ["灰矮人工藝品", "查達克寶藏"],
                moral_choices: [
                    { choice: "優先阻止巨獸", consequence: "十鎮安全但可能放走查達克" },
                    { choice: "優先擊敗查達克", consequence: "巨獸可能摧毀一個城鎮" }
                ],
                endCondition: "阻止（或未能阻止）巨獸",
                opening_text: "灰矮人並非只是在地底沉寂。在一個叫做森布萊特（Sunblight）的要塞中，瘋狂的灰矮人領主查達克正在計劃復仇。他創造了一個可怕的武器——毀滅巨獸，一個由黑鐵與龍火製成的機械巨龍，目標是將十鎮徹底從地圖上抹去。你們必須滲透這座要塞，阻止這場災難。然而，時間可能不站在你們這一邊⋯"
            },
            {
                act: 4,
                title: "冰川墓穴",
                titleEn: "Glacial Rift",
                levelRange: "8-10",
                objective: "尋找結束永夜的古代耐色瑞爾科技",
                keyEvents: ["冰川城市入口", "星界飛艇碎片", "時空裂縫", "耐色瑞爾遺跡"],
                npcs: [
                    { name: "瓦爾瑞斯", role: "巫妖長老", description: "耐色瑞爾法師的不死遺存", cr: 12 },
                    { name: "冰川精怪", role: "敵人", description: "守護遺跡的遠古生物" }
                ],
                locations: [
                    { name: "瑞格德冰川", description: "隱藏入口的巨大冰川" },
                    { name: "冰凍時空裂縫", description: "通往過去的窗口" },
                    { name: "飛艇殘骸", description: "耐色瑞爾飛行器的碎片" }
                ],
                encounters: ["冰川怪物", "時空異常", "遠古守衛"],
                treasures: ["耐色瑞爾魔法物品", "飛艇組件"],
                endCondition: "發現浮空城遺跡位置",
                opening_text: "傳說在冰風之谷的某處，埋藏著耐色瑞爾帝國的遺跡——一座墜落的浮空城市。那座城市可能藏有結束永夜的秘密。瑞格德冰川是最有可能的入口，但那裡被時間與冰雪封鎖了數千年。當你們挖掘穿過冰層時，發現了更驚人的東西：一艘星界飛艇的殘骸，以及一道通往過去的時空裂縫。"
            },
            {
                act: 5,
                title: "耐色瑞爾遺跡",
                titleEn: "Ythryn",
                levelRange: "10-12",
                objective: "進入墜落的浮空城，對抗冰霜女神",
                keyEvents: ["伊斯林探索", "巫妖長老覺醒", "歐呂爾的挑戰", "解除永夜術式"],
                npcs: [
                    { name: "歐呂爾", role: "最終Boss", description: "冰霜少女，寒冬女神", cr: 20, legendary: true },
                    { name: "耐色瑞爾巫妖", role: "Boss/盟友", description: "可能被說服幫助的遠古法師" }
                ],
                locations: [
                    { name: "伊斯林", description: "墜落的耐色瑞爾浮空城" },
                    { name: "大法師之塔", description: "城市的權力核心" },
                    { name: "歐呂爾聖殿", description: "女神顯現之處" }
                ],
                boss: { name: "歐呂爾", cr: 20, type: "冰霜女神", abilities: ["寒冰地獄", "永夜詛咒", "冰霜化身"], tactics: "有三種化身形態，每種必須分別擊敗", forms: 3 },
                encounters: ["遠古守護者", "耐色瑞爾陷阱", "歐呂爾三形態"],
                treasures: [
                    { name: "耐色瑞爾神器", type: "神器", description: "遠古魔法物品" },
                    { name: "永夜解除", type: "獎勵", description: "太陽重返冰風之谷" }
                ],
                endCondition: "結束永夜，解放冰風之谷",
                opening_text: "伊斯林（Ythryn）——一座墜落了三千年的耐色瑞爾浮空城——就埋藏在冰川深處。這座城市被時間凍結，保存著遠超當今世界的魔法奧秘。然而，歐呂爾——冰霜少女——已經察覺到了你們的存在。她不會輕易放棄她對這片土地的控制。「你們以為自己能挑戰永夜嗎？」她的聲音如同冰風呼嘯，「來吧，讓我看看你們的決心。」這是與女神本人的對決。"
            }
        ]
    },

    "dragon_heist_enhanced": {
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
                    { name: "哈欠門酒館", description: "著名的冒險者聚集地" },
                    { name: "贊塔林據點", description: "弗恩被關押處" },
                    { name: "巨魔顱莊園", description: "被贈送的破舊酒館" }
                ],
                encounters: ["哈欠門鬥毆", "贊塔林流氓", "酒館修繕"],
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
                    { name: "巨魔顱莊園前", description: "爆炸發生地" },
                    { name: "城市地下", description: "追蹤格諾姆機器人的路線" }
                ],
                encounters: ["爆炸現場調查", "地下追逐", "派系代理人"],
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
                    { name: "深水城各區", description: "追蹤線索穿越全城" },
                    { name: "派系據點", description: "各勢力的秘密基地" }
                ],
                factions: [
                    { name: "贊塔林", faction_type: "犯罪組織", goal: "控制寶藏" },
                    { name: "黑網", faction_type: "奴隸販子", goal: "販賣情報" },
                    { name: "薛梅斯卡", faction_type: "惡魔", goal: "收回債務" },
                    { name: "曼舒恩", faction_type: "法師", goal: "權力恢復" }
                ],
                encounters: ["派系衝突", "街頭追逐", "情報交易"],
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
                    { name: "寶藏金庫", description: "隱藏五十萬金幣的地下室" }
                ],
                boss: { name: "季節反派", cr: 7, type: "視季節而定", abilities: ["視反派而定"], tactics: "視反派而定" },
                encounters: ["金庫陷阱", "反派手下", "最終對決"],
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
    }
};

export default MODULES_PART3;

