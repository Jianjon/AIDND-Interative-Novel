/**
 * Module Plot Data - Part 2 (Modules 11-20)
 * Detailed Act structures with per-act level recommendations
 */

export const MODULES_PART2 = {
    "lost_mine_phandelver": {
        id: "lost_mine_phandelver",
        title: "凡戴爾的失落礦坑",
        titleEn: "Lost Mine of Phandelver",
        levels: "1-5",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "地精伏擊",
                titleEn: "Goblin Arrows",
                levelRange: "1",
                objective: "護送補給馬車，追蹤被綁架的矮人雇主",
                keyEvents: ["三叉路口伏擊", "峭壁洞穴探索", "救出席達哈維特"],
                npcs: ["岡卓·岩探者", "席達·哈維特", "克拉爾格地精首領"],
                endCondition: "得知岡卓與地圖被押往螃蟹城堡",
                opening_text: "這已經是你們護送這輛牛車的第三天了。從絕冬城（Neverwinter）出發沿著至高路向南，轉入三豬小徑後，路況變得越來越糟。你們的雇主，矮人岡卓·岩探者與他的兄弟已經先行一步，據說他們發現了某個大秘密。牛車上載滿了去凡戴爾鎮（Phandalin）的補給品。就在這時，前方道路被兩匹死馬擋住了去路——馬身上插滿了黑羽箭。這不是意外，而是伏擊。樹叢中傳來了拉弓的聲音。"
            },
            {
                act: 2,
                title: "凡戴爾鎮",
                titleEn: "Phandalin",
                levelRange: "2",
                objective: "抵達城鎮，調查紅色烙印幫派威脅",
                keyEvents: ["酒館情報蒐集", "NPC互動與支線", "發現玻璃手杖真身"],
                npcs: ["海利亞·桑頓", "西藍諾", "托貝倫礦主"],
                locations: ["石丘旅店", "巴瑟羅莊園", "神祠"],
                endCondition: "擊敗紅色烙印，發現黑蜘蛛線索"
            },
            {
                act: 3,
                title: "蜘蛛之網",
                titleEn: "The Spider's Web",
                levelRange: "3",
                objective: "探索周邊地區，蒐集黑蜘蛛情報",
                keyEvents: ["老梟井調查", "女妖阿嘉莎", "雷嗚樹鎮綠龍"],
                locations: ["螃蟹城堡", "翠蛇山丘", "康尼貝利"],
                sideQuests: ["獸人營地清剿", "矮人遺跡探索", "亡靈法師威脅"],
                endCondition: "從螃蟹城堡獲得回音洞位置"
            },
            {
                act: 4,
                title: "回音洞",
                titleEn: "Wave Echo Cave",
                levelRange: "4-5",
                objective: "探索失落礦坑，對決黑蜘蛛尼薩爾",
                keyEvents: ["不死礦工", "鍛魂爐發現", "卓爾精靈對決"],
                boss: "尼薩爾·黑蜘蛛",
                treasures: ["鍛魂爐", "光輝碎片", "矮人遺產"],
                endCondition: "擊敗黑蜘蛛，掌控礦坑"
            }
        ]
    },

    "keep_on_borderlands": {
        id: "keep_on_borderlands",
        title: "邊境堡壘",
        titleEn: "The Keep on the Borderlands",
        levels: "1-4",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "抵達堡壘",
                titleEn: "Arrival at the Keep",
                levelRange: "1",
                objective: "熟悉堡壘環境，獲取情報與裝備",
                keyEvents: ["守衛盤問", "商人交易", "酒館傳聞"],
                npcs: ["城堡領主", "牧師吉爾伯特", "商人"],
                endCondition: "獲得渾沌洞窟情報",
                opening_text: "經過漫長的荒野跋涉，傳說中的'邊境堡壘'（Keep on the Borderlands）終於出現在眼前。這座灰色的石砌要塞坐落在高聳的懸崖邊，是文明世界對抗荒野渾沌的最後一道防線。守衛在吊橋上攔下了你們，審視著你們這群看起來風塵僕僕的冒險者。'報上名來，以及你們的目的！' 守衛隊長的聲音如金屬般生硬。堡壘內部雖然安全，但充滿了緊張的氣氛。傳聞附近的渾沌洞窟中聚集了大量怪物，而這座堡壘是你們唯一的避風港與補給站。"
            },
            {
                act: 2,
                title: "洞窟探索",
                titleEn: "Caves of Chaos",
                levelRange: "1-2",
                objective: "探索怪物聚集的洞窟系統",
                keyEvents: ["狗頭人洞穴", "地精部落", "獸人據點"],
                factions: ["狗頭人", "地精", "獸人", "食人魔"],
                endCondition: "清除多個洞窟威脅"
            },
            {
                act: 3,
                title: "邪惡現身",
                titleEn: "The Temple Revealed",
                levelRange: "2-3",
                objective: "發現怪物背後的邪惡神殿",
                keyEvents: ["邪教祭司發現", "活祭儀式阻止", "黑暗祭壇"],
                boss: "邪惡祭司",
                endCondition: "揭露邪惡崇拜核心"
            },
            {
                act: 4,
                title: "淨化邊境",
                titleEn: "Cleansing the Borderlands",
                levelRange: "3-4",
                objective: "徹底消滅渾沌洞窟威脅",
                keyEvents: ["洞窟內戰利用", "最終淨化", "和平恢復"],
                endCondition: "邊境安全，堡壘繁榮"
            }
        ]
    },

    "tomb_of_horrors": {
        id: "tomb_of_horrors",
        title: "恐怖之墓",
        titleEn: "Tomb of Horrors",
        levels: "10-14",
        startLevel: 10,
        difficulty: "極致死亡",
        acts: [
            {
                act: 1,
                title: "入口考驗",
                titleEn: "Finding the Entrance",
                levelRange: "10+",
                objective: "在多個虛假入口中找到真正通路",
                keyEvents: ["三個入口謎題", "第一批陷阱", "綠魔臉考驗"],
                warning: "錯誤選擇等於即死",
                endCondition: "進入墓穴主通道",
                opening_text: "你們站在荒涼的沼澤地中，眼前是一個低矮的平頂山丘。這就是傳說中大法師阿塞瑞拉克（Acererak）的最終安息地——恐怖之墓。無數英雄曾來到這裡，卻無一生還。經過仔細搜索，你們在山丘北坡的岩石與雜草下發現了三個分開的入口。每一個看起來都像是真正的墓穴入口，但直覺告訴你們，其中兩個是通往必死陷阱的誘餌。空氣中沒有任何聲音，沒有鳥鳴，沒有蟲叫，只有純粹的、壓抑的死亡氣息。"
            },
            {
                act: 2,
                title: "死亡長廊",
                titleEn: "Hall of Death",
                levelRange: "11+",
                objective: "通過充滿致命陷阱的走廊",
                keyEvents: ["毀滅球體", "性別轉換拱門", "陷坑地板"],
                traps: ["分子解構", "永久傳送", "靈魂囚禁"],
                endCondition: "抵達內部房間區"
            },
            {
                act: 3,
                title: "謎題墓室",
                titleEn: "Puzzle Chambers",
                levelRange: "12+",
                objective: "解開複雜謎題，獲取通往核心的鑰匙",
                keyEvents: ["王座謎題", "假寶藏室陷阱", "傳送迷宮"],
                endCondition: "找到通往最終墓室的方法"
            },
            {
                act: 4,
                title: "對決阿塞瑞拉克",
                titleEn: "Face the Demilich",
                levelRange: "13-14",
                objective: "面對史上最強半巫妖",
                keyEvents: ["虛假阿塞瑞拉克", "真身靈魂吞噬", "最終對決"],
                boss: "阿塞瑞拉克半巫妖",
                endCondition: "擊敗阿塞瑞拉克或全軍覆沒"
            }
        ]
    },

    "red_hand_of_doom": {
        id: "red_hand_of_doom",
        title: "毀滅之手",
        titleEn: "Red Hand of Doom",
        levels: "6-12",
        startLevel: 5,
        acts: [
            {
                act: 1,
                title: "發現入侵",
                titleEn: "The Witchwood",
                levelRange: "6",
                objective: "偶然發現紅手軍團入侵計畫",
                keyEvents: ["地精斥候遭遇", "軍團地圖獲取", "警告城鎮"],
                endCondition: "確認大軍即將到來",
                opening_text: "炎熱的午後，蟬鳴聲令人煩躁。你們正穿越人跡罕至的巫木林（Witchwood），這是一條前往布林多城（Brindol）的捷徑。突然，前方的林間空地上傳來了粗魯的交談聲與座狼的低吼。那是一群大地精（Hobgoblins），身穿統一的紅色戰甲，這不是普通的強盜，而是正規軍的裝束。他們似乎正在為某支大軍探路。在他們身邊的地上，一張巨大的侵略地圖被攤開，上面的紅色箭頭直指人類的領土。戰爭的陰雲已悄然籠罩。"
            },
            {
                act: 2,
                title: "拖延戰術",
                titleEn: "Buying Time",
                levelRange: "7-8",
                objective: "透過破壞行動爭取城市防禦時間",
                keyEvents: ["石橋爆破", "補給線切斷", "指揮官刺殺"],
                locations: ["黑尖路大橋", "紅手營地", "精靈森林"],
                endCondition: "成功延遲軍團進展"
            },
            {
                act: 3,
                title: "尋找盟友",
                titleEn: "Gathering Allies",
                levelRange: "8-9",
                objective: "說服矮人、精靈與雇傭兵加入防禦",
                keyEvents: ["矮人議會說服", "精靈呼援", "雇傭兵契約"],
                npcs: ["矮人王", "精靈領主", "傭兵團長"],
                endCondition: "組建防禦聯軍"
            },
            {
                act: 4,
                title: "龍巢突襲",
                titleEn: "Lair Assault",
                levelRange: "9-10",
                objective: "突襲紅龍阿茲爾之巢，消除空中威脅",
                keyEvents: ["龍巢潛入", "龍蛋處理", "阿茲爾對決"],
                boss: "阿茲爾紅龍",
                endCondition: "消除紅龍空中優勢"
            },
            {
                act: 5,
                title: "鬼門關之戰",
                titleEn: "Battle of Brindol",
                levelRange: "10-11",
                objective: "在布林多城指揮防禦戰",
                keyEvents: ["城牆保衛", "街道巷戰", "高火祭司對決"],
                boss: "亞茲卡姆高火祭司",
                endCondition: "擊退紅手軍團主力"
            },
            {
                act: 6,
                title: "追擊殲滅",
                titleEn: "Final Pursuit",
                levelRange: "11-12",
                objective: "追擊殘敵，摧毀紅手指揮核心",
                keyEvents: ["敗軍追擊", "傳送門破壞", "提馬特使者"],
                endCondition: "徹底瓦解紅手軍團"
            }
        ]
    },

    "against_the_giants": {
        id: "against_the_giants",
        title: "巨人討伐戰",
        titleEn: "Against the Giants",
        levels: "8-12",
        startLevel: 8,
        acts: [
            {
                act: 1,
                title: "山丘巨人酋長大廳",
                titleEn: "Steading of the Hill Giant Chief",
                levelRange: "11-12",
                objective: "滲透山丘巨人據點，揭露聯盟陰謀",
                keyEvents: ["狂歡派對潛入", "囚犯解救", "酋長諾斯納格"],
                boss: "諾斯納格酋長",
                endCondition: "發現冰霜巨人幕後線索",
                opening_text: "巨人的襲擊已經摧毀了無數村莊，領主們的忍耐到了極限。作為回應，你們被派遣執行一項斬首行動——直搗山丘巨人酋長諾斯納格（Nosnra）的老巢。這座巨大的木造要塞聳立在荒山上，裡面燈火通明，喧鬧聲震耳欲聾。看來 giants 正在舉行某種狂歡宴會。這是絕佳的潛入機會，但也是最危險的時刻。空氣中瀰漫著烤肉與劣質酒的味道，每一個守衛都比你們高大兩倍。只有智取，或者極致的暴力，才能揭開這場巨人暴亂背後的真相。"
            },
            {
                act: 2,
                title: "冰霜巨人裂谷",
                titleEn: "Glacial Rift of the Frost Giant Jarl",
                levelRange: "13-14",
                objective: "前往冰川，對抗更強大的冰霜巨人",
                keyEvents: ["冰川迷宮", "冬狼獸群", "雅爾對決"],
                boss: "格魯格尼爾雅爾",
                endCondition: "發現火焰巨人是最終幕後主使"
            },
            {
                act: 3,
                title: "火焰巨人國王大廳",
                titleEn: "Hall of the Fire Giant King",
                levelRange: "15-16",
                objective: "深入火山，揭露巨人聯盟的真正操控者",
                keyEvents: ["熔岩地道", "火蜥蜴騎兵", "卓爾間諜發現"],
                boss: "斯耐瑞國王",
                endCondition: "發現卓爾精靈幕後操縱"
            },
            {
                act: 4,
                title: "幽暗地域追擊",
                titleEn: "Into the Underdark",
                levelRange: "16-17",
                objective: "追擊卓爾精靈，終結巨人陰謀",
                keyEvents: ["卓爾前哨戰", "精靈貴族", "洛斯女祭司"],
                boss: "卓爾精靈女祭司",
                endCondition: "瓦解卓爾對巨人的操控"
            }
        ]
    },

    "white_plume_mountain": {
        id: "white_plume_mountain",
        title: "白羽山",
        titleEn: "White Plume Mountain",
        levels: "8-10",
        startLevel: 8,
        acts: [
            {
                act: 1,
                title: "挑戰書",
                titleEn: "Keraptis's Challenge",
                levelRange: "8",
                objective: "進入活火山，回應瘋狂法師的挑戰",
                keyEvents: ["挑戰信件", "火山入口", "三叉分路"],
                endCondition: "選擇追尋三把神器之一",
                opening_text: "一封嘲諷的信件，將你們引到了這座被稱為'白羽山'（White Plume Mountain）的活火山腳下。已經死去千年的瘋狂大法師克帕提斯（Keraptis）聲稱他偷走了三件舉世聞名的神器：'波浪'、'淹沒'與'黑雷'，並邀請'愚蠢的英雄們'來取回它們。火山錐口不斷噴出白色的羽狀蒸汽，周圍是一片死寂的荒原。你們站在火山口邊緣，向下望去，熱氣與硫磺味撲面而來。只有瘋子才會接受這個邀請，但為了那傳說中的神器，或許值得一試。"
            },
            {
                act: 2,
                title: "波浪之路",
                titleEn: "Path to Wave",
                levelRange: "8-9",
                objective: "闖過沸騰水道，獲取三叉戟波浪",
                keyEvents: ["沸騰泡泡地板", "巨蟹守衛", "海洋迷宮"],
                artifact: "波浪（三叉戟）",
                endCondition: "獲得波浪"
            },
            {
                act: 3,
                title: "淹沒之路",
                titleEn: "Path to Whelm",
                levelRange: "8-9",
                objective: "通過倒置迷宮，獲取戰錘淹沒",
                keyEvents: ["重力反轉", "矮人亡魂", "陷阱走廊"],
                artifact: "淹沒（戰錘）",
                endCondition: "獲得淹沒"
            },
            {
                act: 4,
                title: "黑雷之路",
                titleEn: "Path to Blackrazor",
                levelRange: "9-10",
                objective: "穿越黑暗深淵，獲取吸魂劍黑雷",
                keyEvents: ["懸崖跳躍", "吸血鬼對決", "黑暗意志"],
                artifact: "黑雷（長劍）",
                warning: "黑雷有自我意識，可能反噬",
                endCondition: "獲得黑雷"
            },
            {
                act: 5,
                title: "克帕提斯真身",
                titleEn: "Keraptis Revealed",
                levelRange: "10",
                objective: "面對瘋狂法師的最終考驗",
                keyEvents: ["神器抉擇", "克帕提斯分身", "逃離火山"],
                boss: "克帕提斯（或其分身）",
                endCondition: "帶著神器逃離"
            }
        ]
    },

    "expedition_barrier_peaks": {
        id: "expedition_barrier_peaks",
        title: "屏障峰遠征",
        titleEn: "Expedition to the Barrier Peaks",
        levels: "8-12",
        startLevel: 8,
        acts: [
            {
                act: 1,
                title: "異常調查",
                titleEn: "Into the Barrier Peaks",
                levelRange: "8",
                objective: "調查山區怪物襲擊的源頭",
                keyEvents: ["怪物標本", "金屬碎片", "飛船入口"],
                endCondition: "發現墜毀的外星飛船",
                opening_text: "大公爵的委託很簡單：調查屏障峰（Barrier Peaks）出現的奇怪怪物。然而，當你們攀登到高海拔區時，眼前的景象超出了所有人的認知。那不是城堡，也不是洞穴，而是一面巨大的、光滑的金屬牆壁，嵌入在山岩之中。它反射著陽光，沒有任何鏽跡或接縫。周圍散落著一些奇怪的生物屍體——有著觸手的豹子、只有一隻眼睛的怪鳥。在金屬牆壁的下方，有一個微微開啟的三角形入口，內部閃爍著詭異的藍光。"
            },
            {
                act: 2,
                title: "科技迷宮",
                titleEn: "The Ship's Interior",
                levelRange: "9-10",
                objective: "探索充滿未知科技的飛船",
                keyEvents: ["電子門鎖", "色卡權限系統", "自動防禦"],
                items: ["雷射槍", "力場護盾", "醫療注射器"],
                endCondition: "理解飛船基本運作"
            },
            {
                act: 3,
                title: "生態艙災變",
                titleEn: "Ecological Disaster",
                levelRange: "10-11",
                objective: "穿越失控的生態培養艙",
                keyEvents: ["變異生物", "植物覺醒", "外星獵食者"],
                endCondition: "抵達控制核心區"
            },
            {
                act: 4,
                title: "主腦對決",
                titleEn: "The Ship's Brain",
                levelRange: "11-12",
                objective: "對抗失控的飛船AI或變異船員",
                keyEvents: ["機器人軍團", "AI談判/對決", "飛船自毀"],
                boss: "瘋狂AI/變異指揮官",
                endCondition: "關閉威脅，帶走戰利品"
            }
        ]
    },

    "sunless_citadel": {
        id: "sunless_citadel",
        title: "無日衛城",
        titleEn: "The Sunless Citadel",
        levels: "1-3",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "深入裂隙",
                titleEn: "Into the Ravine",
                levelRange: "1",
                objective: "進入地底裂隙，尋找失蹤冒險隊",
                keyEvents: ["繩索下降", "狗頭人前哨", "派系發現"],
                npcs: ["梅波狗頭人", "失蹤冒險者線索"],
                endCondition: "發現狗頭人與地精對峙",
                opening_text: "奧克赫斯特鎮（Oakhurst）的傳聞引導你們來到了這條巨大的地裂。當地的牧羊人說，這裡就是無日衛城（Sunless Citadel）的入口——一座在遠古時期沈入地底的堡壘。之前有一隊來自這鎮上的年輕冒險者下去後就再也沒有回來。你們站在裂縫邊緣，一段古老的石階盤旋向下，消失在黑暗與霧氣中。石柱上雕刻著模糊不清的龍形浮雕。就在剛才，你們似乎聽到下方傳來了微弱的求救聲，或是陷阱觸發的聲音？"
            },
            {
                act: 2,
                title: "兩族之戰",
                titleEn: "Factions at War",
                levelRange: "1-2",
                objective: "在狗頭人與地精間周旋，蒐集情報",
                keyEvents: ["嫣龍卡爾科斯", "地精首領杜拉克", "談判或戰鬥"],
                factions: ["狗頭人部落", "地精部落"],
                endCondition: "獲得通往下層的方法"
            },
            {
                act: 3,
                title: "暮光林苑",
                titleEn: "The Twilight Grove",
                levelRange: "2-3",
                objective: "探索地底花園，揭開果實秘密",
                keyEvents: ["古爾薩斯樹", "針刺生物", "失蹤冒險者下落"],
                endCondition: "發現被控制的前冒險者"
            },
            {
                act: 4,
                title: "邪惡根源",
                titleEn: "The Gulthias Tree",
                levelRange: "3",
                objective: "摧毀古爾薩斯樹與墮落德魯伊",
                keyEvents: ["被控制冒險者對決", "德魯伊貝拉克", "樹木淨化"],
                boss: "貝拉克墮落德魯伊",
                endCondition: "摧毀邪樹，終結威脅"
            }
        ]
    },

    "isle_of_dread": {
        id: "isle_of_dread",
        title: "恐懼之島",
        titleEn: "The Isle of Dread",
        levels: "3-7",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "航向未知",
                titleEn: "Voyage to the Island",
                levelRange: "3",
                objective: "根據藏寶圖航行前往神秘島嶼",
                keyEvents: ["船員招募", "海上遭遇", "島嶼登陸"],
                endCondition: "抵達恐懼之島海岸",
                opening_text: "這張古老的海圖是你們從一個瘋瘋癲癲的水手那裡贏來的。它指向珍珠海南部一個未被標記的島嶼——恐懼之島（Isle of Dread）。經過數週的航行，雖然經歷了風暴與海怪的騷擾，那座島嶼終於出現在海平線上。巨大的峭壁、茂密的叢林，以及遠處升起的火山黑煙。當你們的小艇靠近沙灘時，你們看到了一道巨大的木製防護牆，似乎將整個半島與內陸隔絕開來。沙灘上有巨型蜥蜴留下的腳印，這裡顯然不是一個普通的熱帶天堂。"
            },
            {
                act: 2,
                title: "塔納羅阿村",
                titleEn: "The Village of Tanaroa",
                levelRange: "3-4",
                objective: "與原住民建立關係，蒐集島嶼情報",
                keyEvents: ["原住民首會", "防護牆秘密", "內陸傳說"],
                npcs: ["村長", "薩滿", "獵人嚮導"],
                endCondition: "獲得通往禁忌城市的線索"
            },
            {
                act: 3,
                title: "史前叢林",
                titleEn: "Prehistoric Jungle",
                levelRange: "4-5",
                objective: "穿越充滿恐龍的叢林",
                keyEvents: ["霸王龍遭遇", "翼龍群", "巨猿領地"],
                creatures: ["恐龍群", "部落蜥蜴人", "遺跡守衛"],
                endCondition: "抵達中央火山湖"
            },
            {
                act: 4,
                title: "禁忌城市",
                titleEn: "Forbidden City",
                levelRange: "5-6",
                objective: "探索火山湖中心的古城遺跡",
                keyEvents: ["考普魯奴隸", "古代寶藏", "心靈控制"],
                boss: "考普魯（心靈控制水生種）",
                endCondition: "擊敗考普魯，獲得財寶"
            },
            {
                act: 5,
                title: "安全歸航",
                titleEn: "Return Voyage",
                levelRange: "6-7",
                objective: "帶著戰利品安全返回",
                keyEvents: ["海盜追擊", "海怪遭遇", "凱旋歸來"],
                endCondition: "成功返回，成為傳奇"
            }
        ]
    },

    "dragons_of_despair": {
        id: "dragons_of_despair",
        title: "絕望之龍",
        titleEn: "Dragons of Despair",
        levels: "1-8",
        startLevel: 3,
        setting: "龍槍設定（Dragonlance）",
        acts: [
            {
                act: 1,
                title: "最後歸宿旅店",
                titleEn: "Inn of the Last Home",
                levelRange: "1-2",
                objective: "與舊友重聚，保護藍水晶杖持有者",
                keyEvents: ["五年之約", "金月與河風", "藍水晶杖"],
                npcs: ["坦尼斯", "史乘", "雷斯林", "卡拉蒙"],
                endCondition: "被龍人追擊，逃離索雷斯",
                opening_text: "五年了。按照約定，你們回到了樹城索雷斯（Solace）。那棵巨大的瓦倫木依然聳立，而在它的枝幹間，最後歸宿旅店（Inn of the Last Home）溫暖的燈光依然在召喚。你們推開沈重的橡木門，熟悉的氣味——烤馬鈴薯與艾爾酒——撲鼻而來。老朋友們已經到了：半精靈坦尼斯、陰沈的法師雷斯林與他強壯的哥哥卡拉蒙，以及總是快樂的坎德人泰索何夫。但今晚的氣氛有些不同，兩個陌生人——一對野蠻人情侶，正坐在角落，女子手中握著一根發出淡藍色光芒的水晶杖。而門外，身穿奇特盔甲的蜥蜴人士兵正在集結。",
                opening_text: "五年了。按照約定，你們回到了樹城索雷斯（Solace）。那棵巨大的瓦倫木依然聳立，而在它的枝幹間，最後歸宿旅店（Inn of the Last Home）溫暖的燈光依然在召喚。你們推開沈重的橡木門，熟悉的氣味——烤馬鈴薯與艾爾酒——撲鼻而來。老朋友們已經到了：半精靈坦尼斯、陰沈的法師雷斯林與他強壯的哥哥卡拉蒙，以及總是快樂的坎德人泰索何夫。但今晚的氣氛有些不同，兩個陌生人——一對野蠻人情侶，正坐在角落，女子手中握著一根發出淡藍色光芒的水晶杖。而門外，身穿奇特盔甲的蜥蜴人士兵正在集結。"
            },
            {
                act: 2,
                title: "黑暗追擊",
                titleEn: "Flight Through Darkness",
                levelRange: "2-3",
                objective: "在龍人追擊下穿越黑森林",
                keyEvents: ["索雷斯陷落", "精靈林求援", "半龍人遭遇"],
                endCondition: "抵達精靈避難所"
            },
            {
                act: 3,
                title: "精靈之道",
                titleEn: "Path of the Elves",
                levelRange: "3-4",
                objective: "獲得精靈幫助，尋找古神真相",
                keyEvents: ["精靈議會", "斐布和迷墊魔法船", "密斯塔尼亞線索"],
                endCondition: "得知藍水晶杖的神聖力量"
            },
            {
                act: 4,
                title: "扎卡拉廢墟",
                titleEn: "Xak Tsaroth",
                levelRange: "4-6",
                objective: "探索沉沒古城，蒐集古神證據",
                keyEvents: ["地下城探索", "龍人巢穴", "古代圖書館"],
                endCondition: "發現龍槍傳說"
            },
            {
                act: 5,
                title: "第一條龍",
                titleEn: "Facing Khisanth",
                levelRange: "6-7",
                objective: "面對第一條真正的惡龍",
                keyEvents: ["黑龍歐尼斯", "密斯塔尼亞圓盤", "真理之神顯現"],
                boss: "歐尼斯黑龍",
                endCondition: "帶著神聖圓盤逃離"
            },
            {
                act: 6,
                title: "希望曙光",
                titleEn: "Dawn of Hope",
                levelRange: "7-8",
                objective: "將古神歸來的證據帶給世界",
                keyEvents: ["密斯塔尼亞信仰重建", "牧師力量覺醒", "龍槍傳說開始"],
                endCondition: "開啟龍槍史詩序章"
            }
        ]
    }
};

export default MODULES_PART2;
