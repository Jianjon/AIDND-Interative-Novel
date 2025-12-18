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
        synopsis: "一場簡單的護送任務演變成對抗神秘「黑蜘蛛」的冒險，最終揭開失落礦坑「回音洞」的秘密。",
        acts: [
            {
                act: 1,
                title: "地精伏擊",
                titleEn: "Goblin Arrows",
                levelRange: "1",
                objective: "護送補給馬車，追蹤被綁架的矮人雇主",
                keyEvents: ["三叉路口伏擊", "峭壁洞穴探索", "救出席達·哈維特"],
                npcs: [
                    { name: "岡卓·岩探者", role: "雇主", description: "矮人探險家，發現了失落礦坑的位置，被地精綁架", status: "被俘虜" },
                    { name: "席達·哈維特", role: "人質", description: "岡卓的人類夥伴，被關押在峭壁洞穴", status: "可救援" },
                    { name: "克拉爾格", role: "敵人首領", description: "大地精首領，統領峭壁洞穴的地精部落", cr: 1 },
                    { name: "耶米克", role: "頭目", description: "克拉爾格的副手，看守席達的地精", cr: "1/2" }
                ],
                locations: ["三叉路口伏擊點", "峭壁洞穴", "地精橋梁"],
                encounters: ["地精斥候伏擊 (4 地精)", "狼穴 (3 狼)", "洪水陷阱", "克拉爾格對決"],
                treasures: ["岡卓的地圖碎片", "獅盾商會標記的補給"],
                endCondition: "得知岡卓與地圖被押往螃蟹城堡",
                opening_text: "這已經是你們護送這輛牛車的第三天了。從絕冬城（Neverwinter）出發沿著至高路向南，轉入三豬小徑後，路況變得越來越糟。你們的雇主，矮人岡卓·岩探者與他的兄弟已經先行一步，據說他們發現了某個大秘密。牛車上載滿了去凡戴爾鎮（Phandalin）的補給品。就在這時，前方道路被兩匹死馬擋住了去路——馬身上插滿了黑羽箭。這不是意外，而是伏擊。樹叢中傳來了拉弓的聲音。"
            },
            {
                act: 2,
                title: "凡戴爾鎮",
                titleEn: "Phandalin",
                levelRange: "2",
                objective: "抵達城鎮，調查紅色烙印幫派威脅",
                keyEvents: ["酒館情報蒐集", "NPC互動與支線", "紅色烙印藏身處突襲"],
                npcs: [
                    { name: "海利亞·桑頓", role: "酒館老闆", description: "石丘旅店女主人，提供情報與休息", quest: "調查紅色烙印" },
                    { name: "西藍諾·阿爾布萊克", role: "退休冒險者", description: "前冒險者，現為農夫，提供戰鬥建議" },
                    { name: "托貝倫·斯通丘", role: "礦主", description: "本地礦主，願意雇傭冒險者清除獸人", quest: "獸人營地清剿" },
                    { name: "達倫·埃德馬", role: "果園主", description: "蘋果園主人，女兒失蹤", quest: "尋找失蹤者" },
                    { name: "哈莉亞·桑維特", role: "商人", description: "礦工交易所負責人，私下與黑蜘蛛有聯繫", secret: "黑蜘蛛密探" },
                    { name: "玻璃手杖/艾諾", role: "Boss", description: "紅色烙印幫派首領，真身是人類惡棍", cr: 2 }
                ],
                locations: [
                    { name: "石丘旅店", description: "鎮上唯一的旅店，情報中心" },
                    { name: "巴瑟羅莊園", description: "廢棄的莊園地窖是紅色烙印的藏身處" },
                    { name: "神祠", description: "供奉幸運女神提摩拉的小神殿" },
                    { name: "獅盾商會", description: "商會據點，會獎賞找回補給的冒險者" }
                ],
                encounters: ["紅色烙印流氓 (4)", "諾薩怪 (地窖)", "玻璃手杖對決", "骷髏守衛"],
                sideQuests: [
                    { name: "獸人問題", giver: "托貝倫", reward: "100gp" },
                    { name: "失蹤者", giver: "達倫", reward: "情報" },
                    { name: "女妖的智識", giver: "昆列弗修女", reward: "魔法物品線索" }
                ],
                treasures: ["玻璃手杖的法杖", "紅色烙印金庫"],
                endCondition: "擊敗紅色烙印，發現黑蜘蛛線索",
                opening_text: "凡戴爾鎮（Phandalin）比你們想像的更小。這座採礦小鎮曾經繁榮，但現在只剩下不到五十棟建築。當你們的牛車駛入鎮中心時，幾個穿著猩紅色斗篷的惡棍正在騷擾一個商販。他們自稱「紅色烙印」，顯然是這鎮上的惡霸勢力。鎮民們對他們敢怒不敢言。石丘旅店的女主人海利亞向你們招手，似乎有話要說。"
            },
            {
                act: 3,
                title: "蜘蛛之網",
                titleEn: "The Spider's Web",
                levelRange: "3",
                objective: "探索周邊地區，蒐集黑蜘蛛情報",
                keyEvents: ["老梟井調查", "女妖阿嘉莎", "雷嗚樹鎮綠龍"],
                npcs: [
                    { name: "阿嘉莎", role: "女妖", description: "死去數百年的精靈預言家，可被說服提供情報", interaction: "談判/贈禮" },
                    { name: "文卓納", role: "綠龍", description: "年輕綠龍，佔據了雷鳴樹鎮的德魯伊小屋", cr: 8, interaction: "戰鬥/外交" },
                    { name: "雷德布蘭", role: "亡靈法師", description: "隱居在老梟井的邪惡法師", cr: 2 },
                    { name: "岡卓·岩探者", role: "囚犯", description: "在螃蟹城堡被發現，但可能已移交黑蜘蛛", status: "需救援" },
                    { name: "塔隆王", role: "大地精王", description: "螃蟹城堡的大地精統治者", cr: 3 }
                ],
                locations: [
                    { name: "螃蟹城堡", description: "廢棄城堡，現為大地精與地精據點" },
                    { name: "翠蛇山丘", description: "阿嘉莎女妖的居所所在" },
                    { name: "老梟井", description: "廢棄的瞭望塔，亡靈法師藏身處" },
                    { name: "雷嗚樹鎮", description: "被綠龍佔據的廢棄小鎮" },
                    { name: "康尼貝利", description: "小村莊，有獸人襲擊問題" }
                ],
                encounters: ["地精巡邏隊", "大地精衛兵", "食屍鬼", "骷髏與殭屍", "綠龍文卓納"],
                sideQuests: [
                    { name: "博維的書籍", giver: "昆列弗修女", location: "雷嗚樹鎮" },
                    { name: "女妖的答案", giver: "昆列弗修女", location: "翠蛇山丘" },
                    { name: "獸人營地", giver: "哈莉亞", location: "沃文丘陵" }
                ],
                treasures: ["古老的德魯伊藥草", "博維的魔法典籍", "龍的寶藏"],
                plot_hooks: ["黑蜘蛛的身份：卓爾精靈尼薩爾", "回音洞的位置線索", "鍛魂爐傳說"],
                endCondition: "從螃蟹城堡或其他線索獲得回音洞位置",
                opening_text: "紅色烙印的威脅已經被清除，但真正的幕後黑手仍然逍遙法外。從玻璃手杖的信件和鎮民的情報中，你們拼湊出幾個重要地點：螃蟹城堡可能關押著岡卓，老梟井有邪惡的存在，而翠蛇山丘住著一個知曉古老秘密的女妖。此外，雷嗚樹鎮據說被某種可怕的生物佔據。這些線索都可能指向那個被稱為「黑蜘蛛」的神秘人物，以及傳說中的失落礦坑——回音洞。"
            },
            {
                act: 4,
                title: "回音洞",
                titleEn: "Wave Echo Cave",
                levelRange: "4-5",
                objective: "探索失落礦坑，對決黑蜘蛛尼薩爾",
                keyEvents: ["不死礦工", "鍛魂爐發現", "卓爾精靈對決"],
                npcs: [
                    { name: "尼薩爾·黑蜘蛛", role: "最終Boss", description: "卓爾精靈法師，企圖控制鍛魂爐的力量", cr: 4, spells: ["魔法飛彈", "法術護盾", "蛛網術"] },
                    { name: "莫麥克", role: "火焰骷髏", description: "守護鍛魂爐的亡靈法師", cr: 4 },
                    { name: "岡卓·岩探者", role: "人質", description: "被黑蜘蛛囚禁，知道鍛魂爐的祕密", status: "需救援" },
                    { name: "努德羅", role: "敵人", description: "尼薩爾的卓爾精靈副手", cr: 2 }
                ],
                locations: [
                    { name: "入口隧道", description: "礦坑入口，有不死生物巡邏" },
                    { name: "採礦區", description: "舊採礦通道，現為殭屍與骷髏的巢穴" },
                    { name: "星光湖", description: "地下湖泊，水面反射著磷光苔蘚的光芒" },
                    { name: "鍛魂爐", description: "古代矮人的魔法熔爐，可強化武器" },
                    { name: "黑蜘蛛密室", description: "尼薩爾的指揮室，有巨蜘蛛守護" }
                ],
                encounters: ["殭屍礦工 (8)", "食屍鬼 (3)", "巨蜘蛛 (4)", "火焰骷髏莫麥克", "黑蜘蛛與蜘蛛群"],
                boss: { name: "尼薩爾·黑蜘蛛", cr: 4, type: "卓爾精靈法師", tactics: "召喚蜘蛛、使用蛛網術控場、魔法飛彈輸出" },
                treasures: [
                    { name: "鍛魂爐", type: "傳奇物品", description: "可以強化魔法武器的古代熔爐" },
                    { name: "光輝碎片", type: "魔法物品", description: "+1 長劍，對不死生物造成額外傷害" },
                    { name: "蜘蛛法杖", type: "魔法物品", description: "每天可施放蛛網術", source: "黑蜘蛛" }
                ],
                endCondition: "擊敗黑蜘蛛，掌控礦坑，救出岡卓",
                opening_text: "經過漫長的追尋，你們終於站在了回音洞（Wave Echo Cave）的入口前。這座失落了五百年的矮人礦坑，曾是凡戴爾契約的核心——人類與矮人共同經營的魔法鍛造中心。然而獸人入侵摧毀了一切，礦坑的位置也成為失落的秘密。空氣中瀰漫著海水般的濕氣，遠處傳來有節奏的隆隆聲，如同海浪拍打岩石——這就是「回音洞」之名的由來。隧道深處閃爍著詭異的綠光，那是磷光苔蘚還是某種更危險的東西？黑蜘蛛就在裡面，而你們是唯一能阻止他的人。"
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
        synopsis: "一座遠古墜入地下的堡壘，藏著被邪惡之樹控制的恐怖秘密。狗頭人與地精的派系戰爭中，失蹤的冒險者等待救援。",
        acts: [
            {
                act: 1,
                title: "深入裂隙",
                titleEn: "Into the Ravine",
                levelRange: "1",
                objective: "進入地底裂隙，尋找失蹤冒險隊",
                keyEvents: ["繩索下降", "石階陷阱", "狗頭人前哨", "第一個派系"],
                npcs: [
                    { name: "考濟溫夫人", role: "雇主", description: "奧克赫斯特的貴婦，僱傭冒險者尋找她失蹤的孩子們——塔利恩與莎莉" },
                    { name: "塔利恩·休克洛夫特", role: "失蹤者", description: "考濟溫夫人的兒子，戰士", status: "失蹤" },
                    { name: "莎莉·休克洛夫特", role: "失蹤者", description: "考濟溫夫人的女兒，遊俠", status: "失蹤" },
                    { name: "布拉福德·休克洛夫特爵士", role: "失蹤者", description: "聖騎士，與休克洛夫特兄妹一同前往", status: "失蹤" }
                ],
                locations: [
                    { name: "奧克赫斯特鎮", description: "位於裂隙附近的寧靜小鎮" },
                    { name: "裂隙入口", description: "深達數百尺的地裂" },
                    { name: "古老石階", description: "刻有龍紋的盤旋階梯" }
                ],
                encounters: ["巨型老鼠 (4)", "陷阱石階", "狗頭人哨兵"],
                treasures: ["古老的龍祭符文", "失蹤者的物品碎片"],
                endCondition: "發現狗頭人與地精對峙",
                opening_text: "奧克赫斯特鎮（Oakhurst）的傳聞引導你們來到了這條巨大的地裂。當地的牧羊人說，這裡就是無日衛城（Sunless Citadel）的入口——一座在遠古時期沈入地底的堡壘。之前有一隊來自這鎮上的年輕冒險者下去後就再也沒有回來。你們站在裂縫邊緣，一段古老的石階盤旋向下，消失在黑暗與霧氣中。石柱上雕刻著模糊不清的龍形浮雕。就在剛才，你們似乎聽到下方傳來了微弱的求救聲，或是陷阱觸發的聲音？"
            },
            {
                act: 2,
                title: "狗頭人王國",
                titleEn: "Kingdom of the Kobolds",
                levelRange: "1-2",
                objective: "與狗頭人建立關係，了解城堡派系",
                keyEvents: ["梅波的任務", "失蹤的嫣龍", "狗頭人據點探索"],
                npcs: [
                    { name: "梅波", role: "狗頭人盟友", description: "負責照顧嫣龍卡爾科斯的狗頭人，可成為同伴", companion: true, personality: "膽小忠誠" },
                    { name: "尤絲卓女王", role: "狗頭人領袖", description: "狗頭人部落的女王，希望奪回嫣龍", quest: "找回卡爾科斯" },
                    { name: "卡爾科斯", role: "嫣龍", description: "被地精偷走的白色嫣龍，狗頭人的寵物/圖騰", cr: 1, status: "被俘" }
                ],
                locations: [
                    { name: "狗頭人大廳", description: "狗頭人的主要居住區" },
                    { name: "龍祭壇", description: "供奉龍神的古老祭壇" },
                    { name: "女王寶座室", description: "尤絲卓的權力中心" }
                ],
                encounters: ["地精偵察兵", "陷阱走廊 (鐘聲警報)"],
                factions: [
                    { name: "狗頭人部落", alignment: "守序邪惡", attitude: "可談判", goal: "取回嫣龍" }
                ],
                treasures: ["龍鱗護符", "狗頭人工藝品"],
                endCondition: "接受奪回嫣龍任務，或選擇武力通過",
                opening_text: "古老的城堡現在是兩個種族的戰場。在較上層的區域，你們遇到了狗頭人——這些小型的類龍生物崇拜著某種「龍」。一隻孤單的狗頭人蜷縮在角落哭泣。「梅波不好，」他嗚咽著，「梅波讓壞地精偷走了卡爾科斯。女王會很生氣的⋯」這似乎是一個機會。如果你們能幫助狗頭人找回他們珍貴的寵物，或許他們會讓你們安全通過。"
            },
            {
                act: 3,
                title: "地精領地",
                titleEn: "Goblin Territory",
                levelRange: "2",
                objective: "對抗地精首領杜拉克，救出嫣龍",
                keyEvents: ["地精巢穴滲透", "杜拉克對決", "卡爾科斯救援", "發現更深通道"],
                npcs: [
                    { name: "杜拉克", role: "地精首領", description: "野蠻的大地精，統領城堡的地精部落", cr: 2, combat_style: "兇猛直接" },
                    { name: "葛倫達", role: "地精薩滿", description: "杜拉克的顧問，與暮光林苑有聯繫", cr: 1 },
                    { name: "厄薩克", role: "大地精精銳", description: "杜拉克的副手", cr: 1 }
                ],
                locations: [
                    { name: "地精大廳", description: "地精的主要活動區" },
                    { name: "杜拉克寶座室", description: "堆滿戰利品的野蠻寶座" },
                    { name: "嫣龍囚室", description: "關押卡爾科斯的冰冷房間" }
                ],
                encounters: ["地精戰士 (6)", "地精弓箭手 (4)", "大地精衛兵 (2)", "杜拉克對決"],
                treasures: ["杜拉克的戰利品", "地精寶藏", "蘋果種子"],
                plot_hooks: ["地精提到「下面的樹」", "薩滿臣服於某個「大師」"],
                endCondition: "擊敗杜拉克，發現通往更深層的秘密通道",
                opening_text: "地精的領地比狗頭人更加混亂，也更加危險。牆壁上塗滿了粗糙的塗鴉，空氣中瀰漫著腐肉的臭味。地精首領杜拉克（Durnn）將被偷來的嫣龍當作戰利品，卻完全不知道如何馴服這頭野獸。但真正讓你們不安的是地精薩滿低語的話：「樹大師會讓我們變強⋯下面的果實會讓一切改變⋯」城堡的秘密，似乎藏在更深的地方。"
            },
            {
                act: 4,
                title: "暮光林苑",
                titleEn: "The Twilight Grove",
                levelRange: "2-3",
                objective: "探索地底花園，揭開邪惡之樹的秘密",
                keyEvents: ["地底森林", "針刺生物", "失蹤冒險者發現", "古爾薩斯樹真相"],
                npcs: [
                    { name: "塔利恩（被控制）", role: "敵人", description: "被古爾薩斯樹控制的戰士，現為樹木奴僕", cr: 1, status: "可救/可殺" },
                    { name: "莎莉（被控制）", role: "敵人", description: "被控制的遊俠，皮膚帶有樹皮紋理", cr: 1, status: "可救/可殺" },
                    { name: "布拉福德爵士（被控制）", role: "敵人", description: "墮落的聖騎士，成為貝拉克的護衛", cr: 2, status: "可救/可殺" }
                ],
                locations: [
                    { name: "暮光林苑", description: "地底的奇異森林，永遠處於黃昏" },
                    { name: "古爾薩斯樹", description: "吸血鬼灰燼中長出的邪惡巨樹" },
                    { name: "德魯伊營地", description: "貝拉克的研究與休息區" }
                ],
                encounters: ["針刺生物 (6)", "樹木奴僕 (4)", "被控制的冒險者"],
                treasures: ["治療蘋果 (稀有)", "毒蘋果 (危險)", "失蹤者遺物"],
                plot_hooks: ["貝拉克的真正計畫", "樹木的起源", "救贖的可能"],
                endCondition: "發現古爾薩斯樹與墮落德魯伊貝拉克",
                opening_text: "你們走入了一片不可能存在的森林。在地底數百尺深處，一片奇異的樹林沐浴在永恆的黃昏中——那光芒來自覆蓋洞頂的發光苔蘚。然而這裡的植物都帶著一種病態的扭曲，樹幹彷彿在無聲地尖叫。森林中央，一棵巨大的黑色樹木聳立著，它的樹幹如同凝固的血液。「那是古爾薩斯樹，」一個聲音說，「美麗，不是嗎？」你們回頭，看見三個曾經是人類的生物，他們的皮膚已經長出了樹皮⋯"
            },
            {
                act: 5,
                title: "邪惡根源",
                titleEn: "Root of Evil",
                levelRange: "3",
                objective: "對抗墮落德魯伊貝拉克，摧毀古爾薩斯樹",
                keyEvents: ["貝拉克對決", "被控制者救贖抉擇", "樹木毀滅或淨化"],
                npcs: [
                    { name: "貝拉克", role: "最終Boss", description: "墮落的德魯伊，崇拜古爾薩斯樹的力量，計劃用樹木控制更多生命", cr: 3, spells: ["糾纏術", "召喚自然盟友", "治療創傷"] }
                ],
                locations: [
                    { name: "樹心密室", description: "古爾薩斯樹的核心區域" },
                    { name: "吸血鬼墓穴", description: "樹木誕生之處" }
                ],
                boss: { name: "貝拉克", cr: 3, type: "墮落德魯伊", abilities: ["糾纏術", "召喚針刺生物", "木質皮膚"], minions: ["針刺生物 x4", "樹木奴僕 x2"], tactics: "利用地形纏繞敵人，召喚援軍" },
                encounters: ["貝拉克與隨從", "樹木反擊", "最終對決"],
                moral_choices: [
                    { choice: "殺死被控制的冒險者", consequence: "簡單但失去救援機會" },
                    { choice: "嘗試淨化", consequence: "困難但可救回" },
                    { choice: "毀滅古爾薩斯樹", consequence: "結束威脅但樹木詛咒擴散" },
                    { choice: "淨化古爾薩斯樹", consequence: "困難但創造治療之樹" }
                ],
                treasures: [
                    { name: "古爾薩斯樹幹碎片", type: "魔法材料", description: "可製作強大魔法物品" },
                    { name: "貝拉克的法杖", type: "魔法物品", description: "自然系法術增幅" },
                    { name: "治療蘋果 (年產)", type: "神器", description: "若淨化成功，每年一顆" }
                ],
                endCondition: "擊敗貝拉克，決定古爾薩斯樹的命運",
                ending_text: "古爾薩斯樹的命運現在掌握在你們手中。毀滅它，威脅將結束，但那邪惡的種子可能已經擴散。淨化它，或許能創造奇蹟，但需要真正的信仰與犧牲。無論你們選擇什麼，無日衛城的秘密終於被揭開。那些被控制的冒險者——如果他們還能被稱為人的話——的命運也等待著你們的決定。有些傷痕是永遠無法癒合的。",
                opening_text: "貝拉克（Belak）站在古爾薩斯樹的根部，如同一個瘋狂的牧師在祭壇前佈道。這個曾經的德魯伊現在已經半人半樹，藤蔓從他的皮膚中長出。「你們來晚了，」他的聲音如同風穿過枯葉，「樹已經覺醒了。它的孩子們很快就會佈滿這片土地。」在他身後，那棵黑色的巨樹開始顫動，無數的樹枝如同觸手般伸展開來。這是最後的對決。"
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
        synopsis: "克萊恩世界陷入龍軍入侵的黑暗時代。一群舊友意外發現失落的真神信物，踏上對抗龍后塔克西絲的史詩征途。",
        acts: [
            {
                act: 1,
                title: "最後歸宿旅店",
                titleEn: "Inn of the Last Home",
                levelRange: "1-2",
                objective: "與舊友重聚，保護藍水晶杖持有者",
                keyEvents: ["五年之約", "金月與河風", "藍水晶杖發現", "龍人襲擊"],
                npcs: [
                    { name: "坦尼斯·半精靈", role: "領袖", description: "隊伍的天然領導者，半精靈血統讓他左右為難", class: "戰士", personality: "優柔寡斷但有擔當" },
                    { name: "雷斯林·馬哲理", role: "法師", description: "體弱多病的黑袍法師，擁有詛咒的沙漏瞳孔，能看穿萬物滅亡", class: "法師", secret: "極度渴望力量" },
                    { name: "卡拉蒙·馬哲理", role: "戰士", description: "雷斯林的雙胞胎哥哥，單純善良的壯漢，誓死保護弟弟", class: "戰士" },
                    { name: "史乘", role: "騎士", description: "懷著恥辱離開家族的索蘭尼亞騎士", class: "聖騎士", quest: "恢復騎士團榮譽" },
                    { name: "金月", role: "祭司", description: "奎鬆尼部落的公主，藍水晶杖的持有者，密斯塔尼亞選中的使者", class: "牧師" },
                    { name: "河風", role: "野蠻人", description: "金月的戀人與守護者，沉默寡言的草原戰士", class: "野蠻人" },
                    { name: "泰索何夫·柏乎特", role: "小偷", description: "快樂的坎德人，口袋裡總有意外的寶物", class: "遊蕩者", personality: "無畏且話多" },
                    { name: "弗林特·火爐", role: "老兵", description: "坦尼斯的老友，脾氣暴躁的矮人戰士", class: "戰士" }
                ],
                locations: [
                    { name: "索雷斯樹城", description: "建在巨大瓦倫木上的城鎮" },
                    { name: "最後歸宿旅店", description: "歐提克經營的溫暖酒館" },
                    { name: "水晶礦湖", description: "金月獲得杖子的神聖之地" }
                ],
                encounters: ["龍人斥候", "嗥狼騎兵", "龍人搜索隊"],
                treasures: ["藍水晶杖 (神器)", "古老的密斯塔尼亞符文"],
                endCondition: "被龍人追擊，逃離索雷斯",
                opening_text: "五年了。按照約定，你們回到了樹城索雷斯（Solace）。那棵巨大的瓦倫木依然聳立，而在它的枝幹間，最後歸宿旅店（Inn of the Last Home）溫暖的燈光依然在召喚。你們推開沈重的橡木門，熟悉的氣味——烤馬鈴薯與艾爾酒——撲鼻而來。老朋友們已經到了：半精靈坦尼斯、陰沈的法師雷斯林與他強壯的哥哥卡拉蒙，以及總是快樂的坎德人泰索何夫。但今晚的氣氛有些不同，兩個陌生人——一對野蠻人情侶，正坐在角落，女子手中握著一根發出淡藍色光芒的水晶杖。而門外，身穿奇特盔甲的蜥蜴人士兵正在集結。"
            },
            {
                act: 2,
                title: "黑暗追擊",
                titleEn: "Flight Through Darkness",
                levelRange: "2-3",
                objective: "在龍人追擊下穿越黑森林",
                keyEvents: ["索雷斯陷落", "奴隸大隊", "黑森林秘徑", "半龍人遭遇"],
                npcs: [
                    { name: "費維林·蘇恩斯塔", role: "龍軍指揮", description: "追擊隊的龍人指揮官", cr: 4 },
                    { name: "逃難村民", role: "被保護者", description: "索雷斯難民" }
                ],
                locations: [
                    { name: "黑森林", description: "古老的精靈森林，現已被黑暗籠罩" },
                    { name: "奴隸營地", description: "龍軍押送奴隸的中繼站" }
                ],
                encounters: ["龍人巡邏隊 (6)", "嗥狼獸 (4)", "半龍人戰士", "龍騎兵偵察"],
                plot_hooks: ["精靈領地的傳言", "藍水晶杖顯示治癒力量"],
                endCondition: "抵達精靈邊境",
                opening_text: "索雷斯燃燒著。龍人的火焰吞噬了那些瓦倫木上的房屋，居民們的尖叫與龍的咆哮交織在一起。你們帶著那根閃耀藍光的水晶杖，消失在黑森林的陰影中。精靈的領土就在前方——如果精靈還在那裡的話。身後的追兵越來越近，龍人的嗥狼能嗅出任何氣息。這是一場與時間的賽跑。"
            },
            {
                act: 3,
                title: "精靈林之謎",
                titleEn: "Mysteries of Qualinesti",
                levelRange: "3-4",
                objective: "獲得精靈幫助，了解藍水晶杖的真相",
                keyEvents: ["精靈議會", "勞拉娜的秘密", "斐布和迷墊魔法船", "密斯塔尼亞線索"],
                npcs: [
                    { name: "勞拉娜蘿莎麗安", role: "公主", description: "奎林內斯提的精靈公主，暗戀坦尼斯", love_interest: "坦尼斯" },
                    { name: "吉爾薩納斯", role: "精靈王子", description: "勞拉娜的哥哥，對半精靈充滿偏見" },
                    { name: "議員索洛斯提安", role: "發言者", description: "精靈議會的領袖" },
                    { name: "斐布和迷墊", role: "地精發明家", description: "瘋狂地精兄弟，發明了飛船" }
                ],
                locations: [
                    { name: "奎林內斯提", description: "西精靈的森林王國" },
                    { name: "塔爾洛斯塔", description: "議會之塔" },
                    { name: "發明屋", description: "地精兄弟的瘋狂工坊" }
                ],
                encounters: ["精靈守衛誤會", "龍軍間諜", "機械故障"],
                treasures: ["精靈寶劍", "星航地圖"],
                plot_hooks: ["扎卡拉斯的傳說", "古神消失的真相"],
                endCondition: "得知藍水晶杖可能來自密斯塔尼亞，必須前往扎卡拉斯",
                opening_text: "奎林內斯提（Qualinesti）——精靈的故鄉——比傳說中更為璀璨。陽光穿透樹冠灑落，整座森林彷彿在唱歌。然而精靈們的目光冷淡而警惕，尤其是對坦尼斯，這個帶著半精靈血統的訪客。議會大廳中，精靈們激烈地爭論著：是幫助這群逃亡者，還是將他們交給龍軍以換取和平？就在此時，一位金髮的精靈少女推開了大門。「坦尼斯，」她喊道，眼中閃爍著複雜的情感，「你終於回來了。」"
            },
            {
                act: 4,
                title: "扎卡拉斯之旅",
                titleEn: "Journey to Xak Tsaroth",
                levelRange: "4-5",
                objective: "穿越危險荒野前往失落之城",
                keyEvents: ["草原遭遇", "可怕沼澤", "龍人前哨", "古城入口"],
                npcs: [
                    { name: "奎鬆尼獵人", role: "嚮導", description: "草原部落的倖存者" },
                    { name: "沼澤怪物", role: "敵人", description: "遠古的沼澤守護者" }
                ],
                locations: [
                    { name: "阿巴納西尼亞草原", description: "金月的故鄉" },
                    { name: "詛咒沼澤", description: "瘴氣瀰漫的危險地帶" },
                    { name: "扎卡拉斯入口", description: "沉沒古城的殘骸" }
                ],
                encounters: ["沼澤精怪", "龍人伏擊", "巨型蜘蛛", "亡靈巡邏"],
                endCondition: "抵達扎卡拉斯城遺跡",
                opening_text: "精靈的記錄指向一個名字：扎卡拉斯（Xak Tsaroth）。這座曾經輝煌的城市在大災變中沉入地下，如今只剩下沼澤中的廢墟。傳說古神的證據就埋藏在那裡。你們的旅程穿越了金月的故鄉——阿巴納西尼亞草原，那裡如今只剩下被燒毀的村莊。接著是詛咒沼澤，瘴氣遮蔽了太陽，每一步都可能是陷阱。終於，當你們撥開最後一片腐臭的蘆葦時，一座巨大的、半沉於水中的城市輪廓出現在眼前。"
            },
            {
                act: 5,
                title: "沉沒之城",
                titleEn: "City Beneath the Swamp",
                levelRange: "5-6",
                objective: "探索扎卡拉斯地下城，尋找古神證據",
                keyEvents: ["地下城探索", "高古人文明遺跡", "龍人巢穴", "古代圖書館"],
                npcs: [
                    { name: "博普", role: "古爾利精靈", description: "膽小但好心的地底精靈，願意做嚮導" },
                    { name: "大龍人祭司", role: "敵人", description: "守護古城的龍人宗教領袖", cr: 6 }
                ],
                locations: [
                    { name: "沉沒大殿", description: "傾斜的古代神殿" },
                    { name: "龍人孵化場", description: "龍蛋培育的恐怖場所" },
                    { name: "密斯塔尼亞神殿", description: "失落女神最後的聖地" }
                ],
                encounters: ["龍人衛兵 (10)", "巨型蜥蜴", "亡靈守護者", "龍人祭司"],
                treasures: ["高古人文物", "神殿記錄卷軸"],
                plot_hooks: ["歐尼斯黑龍的存在", "密斯塔尼亞圓盤的線索"],
                endCondition: "發現神殿深處有龍的存在",
                opening_text: "扎卡拉斯（Xak Tsaroth）是一座死城，但並非沒有生命。龍人在這裡築巢，他們的尖嘯聲在傾斜的走廊中迴盪。你們小心翼翼地深入這座沉沒的城市，發現它遠比想像的更加宏偉——也更加危險。牆壁上的浮雕講述著古神的故事，尤其是密斯塔尼亞，治癒女神，藍水晶杖的創造者。但一個可怕的消息傳來：城市最深處，一條黑龍正在等待。"
            },
            {
                act: 6,
                title: "黑龍之巢",
                titleEn: "Lair of Khisanth",
                levelRange: "6-7",
                objective: "對抗黑龍歐尼斯，取得密斯塔尼亞圓盤",
                keyEvents: ["龍巢潛入", "寶藏誘惑", "歐尼斯對決", "圓盤真相"],
                npcs: [
                    { name: "歐尼斯", role: "黑龍", description: "守護密斯塔尼亞圓盤的古老黑龍", cr: 10, type: "成年黑龍" }
                ],
                locations: [
                    { name: "龍巢殿堂", description: "充滿腐蝕池的黑龍老巢" },
                    { name: "圓盤密室", description: "隱藏神聖遺物的秘密房間" }
                ],
                boss: { name: "歐尼斯", cr: 10, type: "成年黑龍", abilities: ["酸息吐息", "恐懼光環", "黑暗視覺"], tactics: "利用水域優勢、酸池陷阱", weakness: "藍水晶杖的神聖光芒" },
                encounters: ["龍人精銳", "酸池陷阱", "歐尼斯本體"],
                treasures: [
                    { name: "密斯塔尼亞圓盤", type: "神器", description: "記載真神教義的白金圓盤" },
                    { name: "龍的寶藏", type: "財寶", description: "歐尼斯數百年累積的財富" }
                ],
                endCondition: "擊敗或逃離黑龍，帶著圓盤離開",
                opening_text: "歐尼斯（Khisanth）——黑暗之翼。這條古老的黑龍盤踞在扎卡拉斯最深處的殿堂，守護著圓盤已有數百年。她的鱗片如同凝固的夜空，她的呼吸帶著腐蝕一切的酸液。「愚蠢的凡人，」龍的聲音在殿堂中轟鳴，「你們以為可以奪走我的寶藏？」這是你們第一次真正面對龍槍世界的真正恐怖——一條真龍。而金月手中的藍水晶杖，開始發出前所未有的光芒。"
            },
            {
                act: 7,
                title: "真神歸來",
                titleEn: "Return of the True Gods",
                levelRange: "7-8",
                objective: "解讀圓盤，重建真神信仰",
                keyEvents: ["圓盤解讀", "密斯塔尼亞顯現", "牧師力量覺醒", "龍信使來臨"],
                npcs: [
                    { name: "密斯塔尼亞", role: "女神", description: "治癒與復興之神，透過金月顯現" },
                    { name: "龍信使", role: "使者", description: "銀龍派來的神秘使者" }
                ],
                locations: [
                    { name: "避難所", description: "暫時的安全藏身處" },
                    { name: "古老神殿遺跡", description: "進行儀式的地點" }
                ],
                encounters: ["龍軍追擊", "信仰考驗"],
                treasures: ["牧師聖力復原", "神聖祝福"],
                plot_hooks: ["龍槍傳說", "銀臂騎士預言", "其他真神的蹤跡"],
                endCondition: "密斯塔尼亞信仰重建，獲得對抗龍軍的希望",
                opening_text: "圓盤上的文字是古老的高古人語，但當金月將藍水晶杖放在上面時，文字開始發光，變成了每個人都能理解的語言。這是真神教義——真正的神祇，而非偽神。密斯塔尼亞，治癒之神，並沒有遺棄克萊恩，是人類遺棄了她。金月跪在圓盤前，淚流滿面。而在那一刻，整個房間被柔和的藍光籠罩，一個女性的聲音如同銀鈴般響起：「我的孩子們，我始終在這裡。」"
            },
            {
                act: 8,
                title: "希望曙光",
                titleEn: "Dawn of the Dragonlance",
                levelRange: "8",
                objective: "將真相帶給世界，開啟龍槍戰爭序章",
                keyEvents: ["難民救援", "抵抗軍成立", "銀龍盟約", "龍槍傳說揭示"],
                npcs: [
                    { name: "席維拉", role: "銀龍", description: "偽裝成人類的古老銀龍", legendary: true },
                    { name: "維瑞尼斯領主", role: "龍軍統帥", description: "紅龍軍團的高階領主", enemy: true }
                ],
                locations: [
                    { name: "拜斯難民營", description: "流亡者的聚集地" },
                    { name: "索蘭尼亞殘部", description: "騎士團的秘密據點" }
                ],
                encounters: ["龍軍主力", "紅龍偵察"],
                treasures: ["龍槍設計圖", "銀龍之證"],
                endCondition: "開啟龍槍史詩的序章，戰爭正式開始",
                ending_text: "這只是開始。密斯塔尼亞的歸來點燃了希望的火種，但龍軍的力量依然強大。塔克西絲的五色龍軍正在集結，龍后本人即將從深淵中甦醒。然而，傳說中的武器——龍槍——的秘密已經被發現。索蘭尼亞騎士團，精靈王國，矮人要塞，以及所有自由民族必須團結起來。第一條真正的龍槍即將問世。而你們，將成為這個時代的英雄。龍槍編年史，正式開始。",
                opening_text: "密斯塔尼亞的信仰正在復興，但戰爭的陰雲依然籠罩著克萊恩。龍軍已經控制了大陸的大部分地區，只有少數地方仍在抵抗。你們帶著真神歸來的消息，穿越敵佔區，尋找那些仍願意戰鬥的人。在一處隱蔽的山谷中，你們遇到了一位神秘的女子，她的眼睛是銀色的，舉止之間帶著不屬於凡人的威嚴。「我等你們很久了，」她說，「是時候談談龍槍的事了。」"
            }
        ]
    }
};

export default MODULES_PART2;
