const rise_of_tiamat = {
    id: "rise_of_tiamat",
    title: "提亞馬特崛起",
    titleEn: "The Rise of Tiamat",
    levels: "8-15",
    startLevel: 8,
    synopsis: "龍教團的陰影已覆蓋整個費倫大陸。五頭后后提亞馬特即將降世。冒險者必須穿梭於各大勢力之間，在深水城議會建立聯盟，並在最後的龍井之戰中阻止邪神降臨。",
    chapters: 8,
    playTime: "50-70小時",
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
                { name: "議會大廳", description: "深水城的權力核心", boxedText: "大理石柱聳立，各大勢力的代表坐在圓桌旁：嚴正的矮人王、優雅的精靈使節、還有冷靜的法師領袖。空氣中充滿了爭論與不信任。然而，遠方傳來的「龍之鳴(Draakhorn)」低沈聲響，卻提醒著所有人時間不多了。" }
            ],
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "權力天平",
                    situation: "各方勢力各有盤算，你們必須爭取至少三個主要派系的支持。",
                    approaches: [
                        { type: "說服", check: "DC 16", outcome: "利用之前的英雄事蹟（如HotDQ的功勞）獲得騎士團與豎琴手的信任" },
                        { type: "威嚇", check: "DC 18", outcome: "展示龍教團的暴行證據，迫使猶豫的散塔林會加入同盟（暫時）" }
                    ],
                    fail_forward: "外交僵局，獲得的物資支援減少，且情報網效率降低。"
                }
            ],
            opening_text: "自從在「破天堡」挫敗了龍教團後，和平只是短暫的。「龍之鳴」的號角聲響徹大陸，那是戰爭的信號。深水城召開了緊急議會，你們作為英雄被邀請列席。房間裡坐滿了傳奇人物，但他們卻在爭吵。你們必須成為粘合劑，將這些破碎的盟友團結成一把利劍。"
        },
        {
            act: 2,
            title: "流冰之海",
            titleEn: "Sea of Moving Ice",
            levelRange: "9",
            objective: "前往最北方的冰海，尋找失蹤的奧術研究者與白龍龍語者",
            keyEvents: ["冰山滲透", "白龍「奧塞瑟托」遭遇戰", "營救馬卡斯"],
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
            opening_text: "議會的第一個任務是尋找馬卡斯——一位專門研究龍之鳴的提夫林學者。他最後一次出現是在流冰之海。那裡是白龍奧塞瑟托的領地。準備好禦寒衣物，這將是一場極地遠征。"
        },
        {
            act: 3,
            title: "迪德瑞斯之墓",
            titleEn: "The Tomb of Diderius",
            levelRange: "10",
            objective: "在撒比亞沙漠追捕失勢的白龍龍語者瓦拉姆",
            keyEvents: ["沙漠遺跡", "斯芬克斯的謎題", "蛇人的野心"],
            locations: [
                { name: "先知陵墓", description: "充滿預言魔法的古墓", boxedText: "沙漠的風沙幾乎掩埋了這座建築。巨大的石像守衛著入口。據說這裡的先知能看見未來，而瓦拉姆正是為此而來。" },
                { name: "圓形占卜池", description: "預言之地", boxedText: "池水清澈見底，但也充滿了危險的誘惑。任何注視它的人都可能迷失在幻象中。" }
            ],
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "斯芬克斯的謎題",
                    situation: "陵墓的守護者擋住了去路，她要求你們證明自己的智慧與價值。",
                    approaches: [
                        { type: "智力", check: "謎題解答", outcome: "正確回答關於『犧牲』與『命運』的謎題，獲得祝福" },
                        { type: "戰鬥", check: "Boss戰", outcome: "擊敗強大的雌性斯芬克斯，強行通過（獲得詛咒）" }
                    ],
                    fail_forward: "答錯謎題觸發陷阱，隊伍被傳送到充滿不死生物的地下層，必須殺回來。"
                }
            ],
            endCondition: "發現瓦拉姆已被蛇人俘虜，並奪回白龍面具（如果可能）",
            opening_text: "白龍龍語者瓦拉姆失去了一切。情報顯示他帶著最後的家當逃進了蛇丘的古墓。如果能抓住他，就能獲得關於龍教團內部的關鍵情報，甚至奪取傳說中的白龍面具。"
        },
        {
            act: 4,
            title: "迷霧森林",
            titleEn: "Neronvain",
            levelRange: "11",
            objective: "調查迷霧森林中的精靈村莊毀滅事件，揭露綠龍陰謀",
            keyEvents: ["精靈王子的背叛", "綠龍查爾雷格羅索", "森林游擊戰"],
            npcs: [
                { name: "尼隆韋恩", role: "背叛者", description: "被放逐的精靈王子，現在是綠龍龍語者", cr: 11 },
                { name: "查爾雷格羅索", role: "綠龍", description: "狡猾的古老綠龍，擅長伏擊", cr: 15 }
            ],
            locations: [
                { name: "迷霧森林", description: "終年迷霧籠罩的古老森林", boxedText: "這裡的霧氣厚重得彷彿實質。參天巨樹間，精靈的村落現在只剩下焦黑的廢墟。屍體上留有酸液腐蝕的痕跡。" },
                { name: "綠龍巢穴", description: "瀑布後的洞穴", boxedText: "隱藏在瀑布後面的，是一個充滿了毒氣與翡翠財寶的洞穴。尼隆韋恩正站在龍頭上，冷冷地看著你們。" }
            ],
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "王子的身份",
                    situation: "在交戰中，精靈議會代表認出了那個騎在龍背上的面具人竟是失蹤已久的王子。",
                    approaches: [
                        { type: "說服", check: "DC 20", outcome: "動搖王子的信念，讓他就在攻擊時遲疑（失去一輪動作）" },
                        { type: "激將", check: "嘲諷", outcome: "激怒他下來單挑，讓他離開龍的保護範圍" }
                    ],
                    fail_forward: "王子變得更加瘋狂，命令綠龍全力噴吐毒息，戰鬥進入狂暴階段。"
                }
            ],
            opening_text: "精靈議會帶來了令人不安的消息：迷霧森林裡的聚落正在被不明勢力消滅。倖存者描述了一條綠色的巨龍和一個精靈指揮官。你們深入森林，發現這不僅僅是屠殺，這是復仇。而被稱為尼隆韋恩的龍語者，似乎與精靈王室有著千絲萬縷的聯繫。"
        },
        {
            act: 5,
            title: "邪教的反擊",
            titleEn: "The Cult Strikes Back",
            levelRange: "12",
            objective: "在接二連三的刺殺中生存，並保護議會成員",
            keyEvents: ["街頭伏擊", "藍龍空中突襲", "查緝密使"],
            locations: [
                { name: "深水城", description: "被視為戰場的街道", boxedText: "你們已經成為了眼中釘。在市場、在旅館、甚至在議會大廳外，殺手隨時可能出現。" }
            ],
            strategic_nodes: [
                {
                    id: "5-A",
                    title: "絕望的刺殺",
                    situation: "龍教團意識到無法輕易殺死你們，於是將目標轉向了你們的盟友——深水城的領主。",
                    approaches: [
                        { type: "感知/洞察", check: "DC 18", outcome: "在毒酒被喝下前一秒打翻酒杯" },
                        { type: "反應", check: "擋刀", outcome: "用身體擋下致命的弩箭（受到重傷），但保住了同盟的團結" }
                    ],
                    fail_forward: "領主受重傷，同盟陷入混亂與互相指責，議會暫停運作。"
                }
            ],
            opening_text: "你們的行動太成功了，現在龍教團感到了恐懼。他們不再尋求秘密儀式，而是直接派出最強的殺手團。藍龍在城市上空盤旋，偽裝成乞丐的刺客手持淬毒匕首。這是一場在文明世界中的戰爭。"
        },
        {
            act: 6,
            title: "克桑若之塔",
            titleEn: "Xonthal's Tower",
            levelRange: "13",
            objective: "滲透巫妖克桑若的魔法高塔，奪取藍龍面具",
            keyEvents: ["魔法迷宮", "時空錯亂", "藍龍面具爭奪戰"],
            npcs: [
                { name: "伊斯坎德爾", role: "叛徒", description: "偷走藍龍面具並尋求庇護的龍教團成員" },
                { name: "藍龍萊諾諾", role: "守衛", description: "守護高塔的古藍龍" }
            ],
            locations: [
                { name: "魔法樹籬迷宮", description: "環繞高塔的防禦系統", boxedText: "這不是普通的迷宮。每一個轉角都可能通向完全不同的時空。上一刻是花園，下一秒可能是岩漿湖。日晷投下詭異的影子，如果不解開謎題，你們將永遠困在這裡。" },
                { name: "克桑若高塔", description: "巫妖的居所", boxedText: "高塔內部違反了物理法則。樓梯通向天花板，窗戶外是星空。伊斯坎德爾正躲在最頂層的密室裡，但他可能已經死了。" }
            ],
            strategic_nodes: [
                {
                    id: "6-A",
                    title: "迷宮的時間",
                    situation: "迷宮中的日晷顯示著錯誤的時間，這是解開路徑的鑰匙。",
                    approaches: [
                        { type: "智力", check: "調查/奧秘", outcome: "計算出影子的正確角度，打開通往塔底的傳送門" },
                        { type: "生存", check: "DC 20", outcome: "強行穿越帶刺的樹籬（受到大量魔法傷害），找到捷徑" }
                    ],
                    fail_forward: "在此地迷失了 1d4 天，到達時伊斯坎德爾已被其他龍教團追兵殺死，面具落入敵手（假面具）。"
                }
            ],
            opening_text: "一個千載難逢的機會：龍教團高層伊斯坎德爾叛變了，他偷走了至關重要的藍龍面具，並逃往了傳說中的克桑若之塔。這座塔被一個幾乎無解的魔法迷宮保護著。如果你們能率先穿過迷宮找到他，就能重創教團的計畫。或者是陷阱？"
        },
        {
            act: 7,
            title: "薩伊之行",
            titleEn: "Mission to Thay",
            levelRange: "14",
            objective: "與包括薩斯·塔姆在內的紅袍法師談判，爭取協助",
            keyEvents: ["死靈法術展示", "夢境審訊", "邪惡盟約"],
            locations: [
                { name: "薩伊", description: "死靈法師的國度", boxedText: "這裡的天空永遠是灰色的。在大地上行走的除了奴隸就是不死生物。紅袍法師們不僅僅是施法者，他們是這個國家的法律。" }
            ],
            strategic_nodes: [
                {
                    id: "7-A",
                    title: "與魔鬼共舞",
                    situation: "薩斯·塔姆要求你們在夢境中面對內心最深處的恐懼，以證明你們有資格與薩伊結盟。",
                    approaches: [
                        { type: "意志豁免", check: "DC 19", outcome: "戰勝恐懼，獲得紅袍法師的全力支持" },
                        { type: "欺詐", check: "表演", outcome: "偽裝出一副無所畏懼的樣子，雖然有些勉強，但騙過了不耐煩的巫妖" }
                    ],
                    fail_forward: "談判破裂，雖然你們活著離開了，但這意味著在最終決戰中，你們將面對更多的不死軍團。"
                }
            ],
            opening_text: "為了擊敗大邪惡，有時必須與小邪惡聯手。紅袍法師痛恨龍教團試圖召喚提亞馬特的行為（因為那會干擾他們的統治）。議會派遣你們前往恐怖的薩伊國度。這是一項外交任務，但在那裡，外交通常伴隨著靈魂的交易。"
        },
        {
            act: 8,
            title: "龍井之戰",
            titleEn: "The Well of Dragons",
            levelRange: "15",
            objective: "率領聯軍攻打教團總部，這是一場史詩級的終局之戰",
            keyEvents: ["三軍衝鋒", "空中龍戰", "五神殿戰鬥", "提亞馬特降臨"],
            boss: { name: "提亞馬特化身", cr: 30, type: "惡龍之神", abilities: ["五頭龍息", "神性再生", "多重行動"], tactics: "五個頭獨立行動，必須同時應對五種屬性的毀滅吐息" },
            locations: [
                { name: "龍井", description: "由死火山改造的祭壇", boxedText: "這裡聚集了成千上萬的邪教徒、魔鬼和巨龍。在巨大的火山口中央，五座神殿正在引導能量打開九層地獄的大門。天空中，金屬龍與彩色龍正在進行著殊死搏鬥。" },
                { name: "提亞馬特神殿", description: "召喚點", boxedText: "五個巨大的龍頭正在從虛空中擠出來。每一次呼吸都讓周圍的空氣燃燒或凍結。如果不立刻阻止儀式，費倫就完了。" }
            ],
            strategic_nodes: [
                {
                    id: "8-A",
                    title: "儀式的最後一刻",
                    situation: "西弗若斯（紅袍法師首領）正在引導主儀式，提亞馬特已經半個身體進入了物質界。",
                    approaches: [
                        { type: "專注破壞", check: "攻擊/法術", outcome: "集中火力擊殺西弗若斯，大幅削弱提亞馬特的力量" },
                        { type: "儀式逆轉", check: "奧秘 DC 25", outcome: "利用之前獲得的知識（如從薩伊或圖書館），逆轉儀式能量，將提亞馬特推回去" }
                    ],
                    fail_forward: "提亞馬特完全降臨（HP全滿，能力全開），這將是一場幾乎不可能獲勝的神話戰鬥。"
                }
            ],
            endCondition: "將提亞馬特逐回地獄，或戰死沙場",
            ending_text: "隨著最後一道咒語的落下，或者最後一劍的揮出，五頭龍后發出了震動世界的不甘咆哮。她的身軀在神聖的光芒中崩解，被吸回了九層地獄。龍井的火山熄滅了。硝煙散去，陽光重新照耀在滿目瘡痍的大地上。你們看著彼此，傷痕累累，但活著。世界被拯救了，而屬於你們的傳奇，才剛剛開始。",
            opening_text: "這是最後的集結。聯軍的營帳連綿數里。金屬龍在頭頂盤旋，矮人的戰鼓與精靈的號角交織在一起。龍井（Well of Dragons）——這個充滿骨骸的死火山，就是一切的終點。如果失敗，世界將被五色龍的暴政統治。沒有退路，沒有妥協。為了費倫，衝鋒！"
        }
    ]
};

export default rise_of_tiamat;
