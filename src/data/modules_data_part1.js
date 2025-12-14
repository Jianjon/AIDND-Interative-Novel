/**
 * Module Plot Data - Part 1 (Modules 1-10)
 * Detailed Act structures for Story Navigation
 */

export const MODULES_PART1 = {
    "hoard_of_dragon_queen": {
        id: "hoard_of_dragon_queen",
        title: "巨龍寶庫",
        titleEn: "Hoard of the Dragon Queen",
        levels: "1-8",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "綠巢之圍",
                titleEn: "Greenest in Flames",
                levelRange: "1-2",
                objective: "保護綠巢鎮居民免於龍與邪教徒的攻擊",
                keyEvents: ["藍龍蘭納西爾空襲", "拯救教堂難民", "對決半龍人戰士希恩瑟"],
                endCondition: "成功保衛綠巢，獲得邪教情報",
                opening_text: "夕陽西下，你們正沿著草綠色的丘陵走向綠巢鎮（Greenest）。這本該是一個寧靜的傍晚，但地平線上升起的不是炊煙，而是滾滾黑煙。即便是距離數里之外，你們也能聽見驚恐的尖叫聲與野獸般的咆哮。突然，一個巨大的陰影遮蔽了夕陽——一隻藍龍在城鎮上空盤旋，隨後俯衝而下，噴吐出毀滅性的閃電。與此同時，一群穿著暗色長袍的邪教徒與狗頭人正在洗劫街道。你們站在山丘上，目睹了這一切的開始。綠巢鎮的命運，此刻掌握在你們手中。"
            },
            {
                act: 2,
                title: "邪教營地",
                titleEn: "Raiders' Camp",
                levelRange: "2-3",
                objective: "滲透龍巫教營地，調查他們的計劃",
                keyEvents: ["追蹤劫掠者", "營地潛行任務", "發現龍蛋孵化場"],
                endCondition: "獲得邪教財寶運送目的地情報"
            },
            {
                act: 3,
                title: "大篷車追蹤",
                titleEn: "On the Road",
                objective: "隨商隊北上，監視邪教徒的財寶運輸",
                keyEvents: ["喬裝潛入商隊", "途中遭遇與陰謀", "抵達博德之門"],
                endCondition: "追蹤財寶至深水城"
            },
            {
                act: 4,
                title: "建造邪惡",
                titleEn: "Construction Ahead",
                objective: "調查邪教徒在深水城北方的據點",
                keyEvents: ["卡納斯建築工地調查", "發現隧道工程", "揭露叛徒身份"],
                endCondition: "確認雲巨人城堡為最終目的地"
            },
            {
                act: 5,
                title: "天空城堡",
                titleEn: "Castle in the Clouds",
                objective: "潛入飛行城堡，阻止財寶運往龍井",
                keyEvents: ["雲巨人布萊格拉德協商", "城堡內部探索", "對決雷茲米爾領主"],
                endCondition: "阻止這批財寶，但發現更大陰謀"
            }
        ]
    },

    "curse_of_strahd": {
        id: "curse_of_strahd",
        title: "史特拉德的詛咒",
        titleEn: "Curse of Strahd",
        levels: "1-10",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "死亡之屋",
                titleEn: "Death House",
                levelRange: "1-3",
                objective: "逃離被怨靈佔據的古宅",
                keyEvents: ["探索迷霧莊園", "發現邪教歷史", "對決地窖怪物"],
                endCondition: "逃出死亡之屋，進入巴洛維亞",
                opening_text: "不自然的濃霧突然吞噬了道路，讓你們迷失了方向。當迷霧稍散，你們發現自己站在一棟古老而陰森的四層磚房前，與周圍破敗的建築格格不入。兩個衣著得體但神情驚恐的孩子——羅斯瓦爾和索恩，站在鏽跡斑斑的鐵門後哭泣。'除了怪物！還有怪物！' 他們指著身後的房子尖叫著，乞求你們進去救救他們被困在地下室的嬰兒弟弟。大門在你們身後無風自如地關上，迷霧如同活物般逼近，唯一的出路似乎只有這棟被當地人稱為'死亡之屋'的宅邸。"
            },
            {
                act: 2,
                title: "塔羅卡預言",
                titleEn: "Tarokka Reading",
                objective: "尋找吉普賽預言師，獲得命運指引",
                keyEvents: ["巴洛維亞村探索", "瑪丹伊娃占卜", "聖物與盟友位置揭示"],
                endCondition: "獲得三件聖物與命定盟友的線索"
            },
            {
                act: 3,
                title: "瓦拉基鎮",
                titleEn: "Village of Vallaki",
                objective: "在瓦拉基鎮建立據點，蒐集情報與盟友",
                keyEvents: ["鎮長瓦加斯的瘋狂慶典", "聖安卓教堂的骨骸", "維斯塔尼營地"],
                endCondition: "獲得至少一件聖物線索"
            },
            {
                act: 4,
                title: "聖物收集",
                titleEn: "Gathering the Artifacts",
                objective: "收集太陽之劍、聖徽與古書",
                keyEvents: ["琥珀神殿探索", "銀龍亞岡維斯托特", "貝雷茲村的瘋女"],
                endCondition: "收集三件對抗史特拉德的聖物"
            },
            {
                act: 5,
                title: "鴉閣城堡",
                titleEn: "Castle Ravenloft",
                objective: "闖入城堡，終結史特拉德的詛咒",
                keyEvents: ["塔提亞娜的真相", "克列斯達維奇棺材", "與史特拉德的最終對決"],
                endCondition: "擊敗史特拉德，逃離巴洛維亞"
            }
        ]
    },

    "tomb_of_annihilation": {
        id: "tomb_of_annihilation",
        title: "湮滅之墓",
        titleEn: "Tomb of Annihilation",
        levels: "1-11",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "尼安扎羅港",
                titleEn: "Port Nyanzaru",
                levelRange: "1",
                objective: "抵達楚爾特，準備叢林探險",
                keyEvents: ["恐龍賽跑", "商業親王情報", "招募嚮導"],
                endCondition: "獲得奧穆古城方位與必要裝備",
                opening_text: "傳送的暈眩感剛退去，熱帶獨有的濕熱空氣便撲面而來。你們站在尼安扎羅港（Port Nyanzaru）的碼頭上，眼前是一座色彩斑斕的城市。巨大的恐龍——是的，恐龍——正被用作駝獸，甚至在街道上進行賽跑比賽。然而，即便在這個充滿生機的地方，'死亡詛咒'的陰影依然籠罩。你們的任務是尋找這個詛咒的源頭，傳聞它位於叢林深處失落的奧穆城。一位名叫席德拉的商人向你們揮手，似乎對你們這些冒險者很感興趣。"
            },
            {
                act: 2,
                title: "叢林深處",
                titleEn: "The Jungles of Chult",
                objective: "穿越危險叢林，尋找失落的奧穆城",
                keyEvents: ["不死生物叢林", "心火神殿", "弗拉斯荷達女妖"],
                endCondition: "發現奧穆古城入口"
            },
            {
                act: 3,
                title: "失落的奧穆",
                titleEn: "City of Omu",
                objective: "收集九宮之神神殿的方塊",
                keyEvents: ["元素人追擊", "蛇人袁提族", "九座神殿試煉"],
                endCondition: "收集九枚方塊，開啟墓穴"
            },
            {
                act: 4,
                title: "九神之墓",
                titleEn: "Tomb of the Nine Gods",
                objective: "探索阿塞瑞拉克的致命迷宮",
                keyEvents: ["死亡陷阱長廊", "九神守護者", "靈吸怪實驗室"],
                endCondition: "抵達靈魂吞噬者所在"
            },
            {
                act: 5,
                title: "靈魂吞噬者",
                titleEn: "The Soulmonger",
                objective: "摧毀靈魂吞噬者，終結死亡詛咒",
                keyEvents: ["阿塔特羅帕胎兒", "阿塞瑞拉克現身", "時間賽跑"],
                endCondition: "摧毀機器，結束詛咒"
            }
        ]
    },

    "out_of_the_abyss": {
        id: "out_of_the_abyss",
        title: "逃離深淵",
        titleEn: "Out of the Abyss",
        levels: "1-15",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "囚徒",
                titleEn: "Prisoners of the Drow",
                levelRange: "1-3",
                objective: "從卓爾精靈監獄逃脫",
                keyEvents: ["維爾金維夫監獄", "NPC囚犯同盟", "伊薇拉追擊"],
                endCondition: "成功越獄，進入幽暗地域",
                opening_text: "第一感覺是冰冷與堅硬的地面，接著是沈重的鐐銬聲。你們醒來時，發現自己被剝奪了所有裝備，關押在一個天然的地下洞穴牢房中。四周是無盡的幽暗地域（Underdark）。你們是卓爾精靈（Drow）的俘虜，註定要被運往魔索布萊城充當奴隸。在這個擠滿了各式各樣囚犯——矮人、地底侏儒、甚至一隻會說話的菌人——的牢籠裡，卓爾女祭司伊薇拉正在巡視。趁著警衛換班的空檔，這是你們唯一逃脫的機會。"
            },
            {
                act: 2,
                title: "黑暗漂流",
                titleEn: "Into Darkness",
                objective: "在幽暗地域中求生，尋找通往地表的道路",
                keyEvents: ["灰矮人城市格拉克斯圖", "狂暴深淵污染", "惡魔領主目擊"],
                endCondition: "抵達布林根斯通，找到上升路徑"
            },
            {
                act: 3,
                title: "重返光明",
                titleEn: "Return to the Light",
                objective: "抵達地表，向當局報告深淵入侵",
                keyEvents: ["銀月城警告", "哈珀斯與贊塔林", "惡魔領主資料蒐集"],
                endCondition: "獲得返回幽暗地域的任務"
            },
            {
                act: 4,
                title: "再入深淵",
                titleEn: "Descending Again",
                objective: "帶著武器與盟友重返，收集惡魔領主對付材料",
                keyEvents: ["灰矮人的抵抗", "菌人索維尼特", "靈吸怪城市蒐集"],
                endCondition: "獲得讓惡魔領主自相殘殺的儀式"
            },
            {
                act: 5,
                title: "惡魔大戰",
                titleEn: "The Demon Lords' War",
                objective: "在門佐貝拉贊進行儀式，讓惡魔領主互殘",
                keyEvents: ["卓爾內戰利用", "狄摩高根召喚", "惡魔領主決鬥"],
                endCondition: "倖存的惡魔領主被削弱並驅逐"
            }
        ]
    },

    "storm_kings_thunder": {
        id: "storm_kings_thunder",
        title: "風暴君王之雷霆",
        titleEn: "Storm King's Thunder",
        levels: "1-11",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "巨人襲擊",
                titleEn: "A Great Upheaval",
                levelRange: "1-5",
                objective: "親眼見證巨人對人類城鎮的襲擊",
                keyEvents: ["夜石鎮陷落", "哥布林入侵", "七蛇丘調查"],
                endCondition: "發現巨人階級制度崩潰",
                opening_text: "這原本只是一個簡單的送信任務，但當你們抵達夜石鎮（Nightstone）時，迎接你們的卻是一片死寂。城鎮的大門敞開，原本宏偉的防禦鐘樓如今只剩下一堆碎石，彷彿被某種巨大的力量從天而降砸毀。街道上空無一人，只有遠處傳來哥布林尖銳的竊笑聲與劫掠的聲音。居民們似乎都逃走了，留下一座空城與等待被解開的謎團。那個巨大的坑洞中，一塊黑色的方尖碑正散發著不安的氣息。"
            },
            {
                act: 2,
                title: "生存廢墟",
                titleEn: "Rune of the Storm",
                objective: "在巨人肆虐的北地生存並收集情報",
                keyEvents: ["崔波爾巨人襲擊", "雅爾塔巨人港", "哈珀斯情報網"],
                endCondition: "得知風暴巨人國王失蹤"
            },
            {
                act: 3,
                title: "神諭之眼",
                titleEn: "The Eye of the All-Father",
                objective: "尋找神諭獲得恢復秩序的方法",
                keyEvents: ["冰雪神殿探索", "赫卡頓殘影", "伊米爾詛咒"],
                endCondition: "獲得擊敗各派巨人領主的線索"
            },
            {
                act: 4,
                title: "巨人據點",
                titleEn: "Clash of the Titans",
                objective: "潛入巨人領主據點，削弱他們的力量",
                keyEvents: ["山丘巨人格魯德", "冰霜巨人斯托瓦德", "火焰巨人扎爾托"],
                endCondition: "獲得風暴巨人信任或擊敗威脅"
            },
            {
                act: 5,
                title: "風暴王庭",
                titleEn: "Storm King's Court",
                objective: "解救風暴巨人王，恢復巨人階級秩序",
                keyEvents: ["海洋王庭梅爾斯卓姆", "海妖斯拉克霍斯陰謀", "赫卡頓國王歸位"],
                endCondition: "巨人王回歸，秩序恢復"
            }
        ]
    },

    "descent_into_avernus": {
        id: "descent_into_avernus",
        title: "墜入阿佛納斯",
        titleEn: "Descent into Avernus",
        levels: "1-13",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "博德之門",
                titleEn: "A Tale of Two Cities",
                levelRange: "1-4",
                objective: "調查艾爾托瑞爾消失事件",
                keyEvents: ["火拳傭兵任務", "死亡三冠邪教", "地獄契約發現"],
                endCondition: "發現艾爾托瑞爾被拖入地獄",
                opening_text: "博德之門（Baldur's Gate），這座罪惡之都正陷入前所未有的恐慌。鄰近的聖城艾爾托瑞爾（Elturel）在一夜之間憑空消失，成千上萬的難民湧入城門。為了維持秩序，鐵王座的傭兵團'火拳'封鎖了城市，並強行徵召冒險者協助調查。你們被帶到了火拳指揮官佐奇面前，他懷疑這一切與崇拜死亡三神的邪教有關。如果不盡快查明真相，博德之門恐怕將是下一個消失的城市。"
            },
            {
                act: 2,
                title: "地獄入口",
                titleEn: "Through the Gate",
                objective: "進入阿佛納斯，尋找墜落之城",
                keyEvents: ["艾爾托瑞爾鏈鎖", "高天使盧迪斯", "地獄荒原初探"],
                endCondition: "進入阿佛納斯平原"
            },
            {
                act: 3,
                title: "血戰荒原",
                titleEn: "Avernus",
                objective: "駕駛地獄戰車，蒐集拯救城市的資訊",
                keyEvents: ["瘋乖求死者", "戰車升級改裝", "惡魔與魔鬼領地"],
                endCondition: "獲得扎瑞爾大天使墮落線索"
            },
            {
                act: 4,
                title: "救贖之路",
                titleEn: "Path to Redemption",
                objective: "尋找能讓扎瑞爾回心轉意的聖物",
                keyEvents: ["聖劍殘片", "盧迪斯的記憶", "扎瑞爾真實過去"],
                endCondition: "收集扎瑞爾救贖或毀滅的關鍵"
            },
            {
                act: 5,
                title: "扎瑞爾之塔",
                titleEn: "Zariel's Fall",
                objective: "面對墮落大天使，決定城市命運",
                keyEvents: ["魔鬼契約談判", "救贖或毀滅抉擇", "艾爾托瑞爾釋放"],
                endCondition: "拯救或毀滅艾爾托瑞爾"
            }
        ]
    },

    "rime_of_frostmaiden": {
        id: "rime_of_frostmaiden",
        title: "冰霜少女的憤怒",
        titleEn: "Rime of the Frostmaiden",
        levels: "1-12",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "永夜十鎮",
                titleEn: "Ten-Towns",
                levelRange: "1-4",
                objective: "在永夜籠罩的十鎮中調查異常事件",
                keyEvents: ["人祭傳統", "連環殺手追蹤", "凍湖怪物"],
                endCondition: "發現歐呂爾女神是永夜源頭",
                opening_text: "冰風之谷（Icewind Dale）已經兩年沒有見過太陽了。被稱為'冰霜少女'的歐呂爾女神降下了無盡的寒冬與永夜，將這片土地封鎖在冰雪之中。你們來到了十鎮之一的布林山德（Bryn Shander），刺骨的寒風如刀割般掠過。鎮民們竊竊私語，討論著即將到來的人祭儀式——為了平息女神的憤怒，他們必須獻上祭品。然而，除了寒冷，一種更深層的恐懼正在蔓延：連環殺手在黑暗中潛伏，湖底的怪物蠢蠢欲動。這是一個關於生存的故事。"
            },
            {
                act: 2,
                title: "冰原探索",
                titleEn: "Frozen Wilderness",
                objective: "探索冰風之谷的秘密與危險",
                keyEvents: ["冰霜巨人遺跡", "覺醒族亡靈", "凍原德魯伊"],
                endCondition: "得知灰矮人要塞位置"
            },
            {
                act: 3,
                title: "毀滅之光",
                titleEn: "Sunblight",
                objective: "阻止灰矮人啟動毀滅性武器",
                keyEvents: ["森布萊特要塞滲透", "查達克復仇計畫", "毀滅巨像追逐"],
                endCondition: "阻止（或未能阻止）巨像"
            },
            {
                act: 4,
                title: "冰川墓穴",
                titleEn: "Glacial Rift",
                objective: "尋找結束永夜的古代耐色瑞爾科技",
                keyEvents: ["冰川城市入口", "星界飛艇碎片", "時空裂縫"],
                endCondition: "發現浮空城遺跡位置"
            },
            {
                act: 5,
                title: "耐色瑞爾遺跡",
                titleEn: "Ythryn",
                objective: "進入墜落的浮空城，對抗冰霜女神",
                keyEvents: ["巫妖長老", "歐呂爾的挑戰", "解除永夜術式"],
                endCondition: "結束永夜，解放冰風之谷"
            }
        ]
    },

    "dragon_heist": {
        id: "dragon_heist",
        title: "深水城：龍之劫",
        titleEn: "Waterdeep: Dragon Heist",
        levels: "1-5",
        startLevel: 3,
        acts: [
            {
                act: 1,
                title: "巨魔顱莊園",
                titleEn: "A Friend in Need",
                levelRange: "1-2",
                objective: "獲得酒館作為冒險據點",
                keyEvents: ["酒吧鬥毆救人", "沃洛贈送酒館", "莊園翻新"],
                endCondition: "獲得巨魔顱莊園所有權",
                opening_text: "這裡是深水城（Waterdeep），費倫大陸皇冠上的寶石。你們正坐在著名的'哈欠門酒館'（Yawning Portal）裡，這裡以那個通往地底迷宮的巨大天井聞名。著名作家沃洛（Volo）正熱情地向你們講述他的新書，並請求你們幫忙尋找他失蹤的朋友——弗恩。突然，一場酒吧鬥毆打斷了談話，一個巨大的食人魔從天井中爬了出來，身上掛著被吸血後的傷痕。歡迎來到深水城，這裡的機遇與危險一樣多。"
            },
            {
                act: 2,
                title: "火球術事件",
                titleEn: "Fireball",
                objective: "調查在酒館外發生的爆炸案",
                keyEvents: ["格諾姆爆炸", "石頭隱藏", "尼姆布萊特遺志"],
                endCondition: "發現格羅爾之石與寶藏線索"
            },
            {
                act: 3,
                title: "派系追逐",
                titleEn: "Faction Scramble",
                objective: "與四大勢力競爭格羅爾之石",
                keyEvents: ["黑網接觸", "贊塔林追蹤", "假面領主情報"],
                endCondition: "獲得石頭位置或被搶先"
            },
            {
                act: 4,
                title: "寶藏地窖",
                titleEn: "The Vault",
                objective: "搶先抵達寶藏地點，對抗主要反派",
                keyEvents: ["季節反派對決", "五十萬金龍幣", "假面領主介入"],
                endCondition: "獲得（或失去）寶藏"
            }
        ]
    },

    "princes_of_apocalypse": {
        id: "princes_of_apocalypse",
        title: "元素邪惡之王子",
        titleEn: "Princes of the Apocalypse",
        levels: "1-15",
        acts: [
            {
                act: 1,
                title: "失蹤調查",
                titleEn: "Missing Delegation",
                levelRange: "1-3",
                objective: "調查深水城代表團失蹤事件",
                keyEvents: ["紅拉奇鎮情報", "地表據點發現", "元素教徒襲擊"],
                endCondition: "發現四個元素邪教據點",
                opening_text: "紅拉奇鎮（Red Larch）是一個位於薩姆佈雷爾山的寧靜小鎮，但最近卻怪事頻傳。深水城派出的一支重要外交代表團在附近神秘失蹤，沒有留下任何痕跡。同時，奇怪的天氣現象——異常的狂風、地震與山火频繁發生。鎮長請求你們展開調查。在你們與鎮民交談時，一個驚恐的農夫衝進酒館，大喊著'會動的石頭'正在襲擊他的農場。這不僅僅是失蹤案，大地的力量似乎正在覺醒。"
            },
            {
                act: 2,
                title: "四處前哨",
                titleEn: "Four Keeps",
                objective: "清除元素邪教的地表前哨",
                keyEvents: ["羽門城堡（氣）", "石河修道院（土）", "緋紅之心（火）", "水之谷莊園（水）"],
                endCondition: "開闘通往地下神殿的通道"
            },
            {
                act: 3,
                title: "元素神殿",
                titleEn: "Temples of Elemental Evil",
                objective: "深入地下擊敗各元素先知",
                keyEvents: ["咆嘯之穴", "黑土神殿", "熾焰地牢", "溺水公館"],
                endCondition: "擊敗四位元素先知"
            },
            {
                act: 4,
                title: "元素節點",
                titleEn: "Elemental Nodes",
                objective: "關閉通往元素位面的傳送門",
                keyEvents: ["元素親王威脅", "節點儀式破壞", "最終淨化"],
                endCondition: "關閉所有元素通道，拯救世界"
            }
        ]
    },

    "shadow_dragon_queen": {
        id: "shadow_dragon_queen",
        title: "龍后之影",
        titleEn: "Shadow of the Dragon Queen",
        levels: "1-11",
        acts: [
            {
                act: 1,
                title: "暴風先兆",
                titleEn: "Storm's Approach",
                levelRange: "1-3",
                objective: "見證紅龍軍團入侵前兆",
                keyEvents: ["沃格勒村災禍", "龍人斥候", "卡拉曼徵召"],
                endCondition: "加入卡拉曼防禦軍",
                opening_text: "克萊恩世界（Krynn）已經平靜了數百年，直到今天。你們受邀來到偏遠的沃格勒村（Vogler）參加一年一度的翠鳥節，這是一場為了紀念戰勝水怪艾琳娜而舉辦的慶典，也是為了紀念一位剛過世的老朋友。村莊裡洋溢著歡樂的氣氛，但在這歡笑背後，遠方森林中傳來了不祥的行軍聲。龍騎兵的影子在樹梢間閃過，傳說中的紅龍軍團並非神話。當第一支燃燒的箭矢射入村莊廣場，慶典變成了戰場。"
            },
            {
                act: 2,
                title: "戰爭迷霧",
                titleEn: "Shadow of War",
                objective: "作為軍隊一員參與對抗龍軍",
                keyEvents: ["心堡城塔防禦", "野營保衛戰", "暗之女王信息"],
                endCondition: "發現敵軍飛行堡壘"
            },
            {
                act: 3,
                title: "城市圍城",
                titleEn: "City Under Siege",
                objective: "在卡拉曼圍城戰中尋找破局之法",
                keyEvents: ["地下逃亡通道", "叛徒揭露", "龍騎士計畫"],
                endCondition: "獲得突破圍城的方法"
            },
            {
                act: 4,
                title: "飛行堡壘",
                titleEn: "Sky Citadel",
                objective: "潛入並摧毀龍軍的空中要塞",
                keyEvents: ["龍背滲透", "堡壘核心", "對決軍團將領"],
                endCondition: "摧毀飛行堡壘，解卡拉曼之圍"
            }
        ]
    }
};

export default MODULES_PART1;
