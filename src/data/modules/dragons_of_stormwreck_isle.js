const dragons_of_stormwreck_isle = {
    id: "dragons_of_stormwreck_isle",
    title: "風暴 wreck 島之龍",
    titleEn: "Dragons of Stormwreck Isle",
    levels: "1-3",
    startLevel: 1,
    synopsis: "在一座充滿龍族傳說的島嶼上，古老的龍魂正在甦醒。冒險者將前往龍之息（Dragon's Rest）神廟，揭開藍龍與銅龍靈魂之間的恩怨。",
    chapters: 4,
    playTime: "10-15小時",
    acts: [
        {
            act: 1,
            title: "龍之息的守望",
            titleEn: "Dragon's Rest",
            levelRange: "1",
            objective: "抵達龍之息神廟，與萊拉尼長老交談",
            keyEvents: ["殭屍突襲", "神廟導覽", "萊拉尼的委託"],
            npcs: [
                { name: "萊拉尼", role: "祭司", description: "龍之息的領導者，一位睿智的紅龍裔長老", dialogue: "歡迎來到和平之地。但在這座島的陰影下，古老的仇恨正在萌芽。" },
                { name: "塔蘭", role: "武僧", description: "神廟的守護者，正在尋找內心的寧靜" }
            ],
            locations: [
                { name: "岩石海岸", description: "船隻靠岸的地方", boxedText: "一陣鹹澀的海風吹過，你們踏上了風暴 wreck 島。海浪拍打著崎嶇的礁石，不遠處可以看到一些古老的殘骸。前往神廟的山路蜿蜒而上，但在不遠處的沙灘上，一些蹣跚的身影正從水中爬出..." },
                { name: "龍之息神廟", description: "供奉巴哈姆特的寧靜之地", boxedText: "這是一座建在懸崖邊的白色石造神廟。空氣中瀰漫著薰香和海的味道。這裡的修士們忙碌而平靜，但長老萊拉尼的眼中卻帶著憂慮。" }
            ],
            transitions: "從混亂的海灘到達安寧的神廟：\n1. 擊退從沉船中爬出的殭屍（戰鬥）\n2. 攀爬陡峭的龍脊路徑（運動）\n3. 在神廟中進行冥想或情報蒐集（社交/宗教）",
            strategic_nodes: [
                {
                    id: "1-A",
                    title: "溺斃者的突襲",
                    situation: "剛靠岸時，幾隻帶著海草和腐肉氣味的殭屍突然發動攻擊。",
                    approaches: [
                        { type: "戰鬥", check: "AC 10", outcome: "迅速解決敵人，展現冒險者的實力" },
                        { type: "觀察", check: "DC 12", outcome: "發現殭屍體內藏著奇異的發光晶體，似乎與島上的魔力有關" }
                    ],
                    fail_forward: "被殭屍包圍，雖然擊退敵人但消耗了體力（每人受到 1d6 傷害），且萊拉尼必須親自出面救援。"
                }
            ],
            opening_text: "海浪拍打著你們租來的小船，風暴 wreck 島在迷霧中顯現。這是一座傳說中巨龍墜落的地方，據說龍的精華至今仍影響著這裡。你們的目標是「龍之息」，一座建立在青銅龍骸骨上的避難所。然而，當你們踏上沙灘時，海水似乎變得更暗了，一些不該存在的東西正在蠕動。"
        },
        {
            act: 2,
            title: "海草洞窟的陰影",
            titleEn: "Seagrow Caves",
            levelRange: "1-2",
            objective: "清理威脅神廟的真菌生物",
            keyEvents: ["蕈人部落", "真菌感染", "孢子陷阱"],
            npcs: [
                { name: "泰諾", role: "蕈人領袖", description: "一個巨大的紫色蕈人，試圖保護他的族人免受腐蝕" }
            ],
            locations: [
                { name: "海草洞窟入口", description: "潮濕且佈滿真菌的洞穴", boxedText: "洞穴內部充滿了螢光。繽紛的孢子像灰塵一樣在空氣中漂浮。你們可以聽到水滴落下的聲音，以及某種植物生長的咯吱聲。" }
            ],
            strategic_nodes: [
                {
                    id: "2-A",
                    title: "孢子迷霧",
                    situation: "洞窟內充滿了致幻孢子。",
                    approaches: [
                        { type: "體質過濾", check: "DC 13", outcome: "屏住呼吸快速通過" },
                        { type: "自然判斷", check: "DC 11", outcome: "識別安全的路徑或植物，引導隊伍穿過" }
                    ],
                    fail_forward: "吸入孢子，全體陷入短暫幻覺（劣勢），並意外跌入隱藏的深坑。"
                }
            ],
            endCondition: "安撫或消滅蕈王，消除孢子威脅",
            opening_text: "萊拉尼提到附近的洞窟傳出了奇怪的動靜，連神廟的菜園都開始枯萎。海草洞窟一向是和平蕈人的家園，但現在，那裡的色彩變得不再溫暖，而是帶著一種病態的紫黑色。你們穿過了潮汐區，踏入那片色彩斑斕的地下森林。"
        },
        {
            act: 3,
            title: "受詛咒的羅盤號 (The Cursed Compass)",
            titleEn: "The Cursed Compass",
            levelRange: "2",
            objective: "從沉船中取回重要的天文導航圖，並抵抗鳥妖的歌聲。",
            keyEvents: ["甲板遭遇戰", "對抗海妖之歌", "深海巨怪的陰影"],
            locations: [
                { name: "羅盤號殘骸", description: "擱淺在礁石上的古老帆船", boxedText: "這艘船像是一頭死去的巨獸被龍島的礁石撕裂。船帆破碎，船身傾斜，只有最堅固的船長室還掛在斷裂的船尾。海浪聲中夾雜著一種奇異的旋律，像是女人的歌聲。" }
            ],
            strategic_nodes: [
                {
                    id: "siren_song_challenge",
                    title: "死亡合唱",
                    situation: "三隻哈比鳥妖在桅杆上輪流歌唱，試圖誘惑隊友跳海。",
                    approaches: [
                        { type: "意志 (Wisdom)", check: "DC 14", outcome: "在腦海中默唸詩歌或祈禱，保持神智清醒" },
                        { type: "表演 (Performance)", check: "DC 15", outcome: "用更大聲、更難聽的歌聲打斷她們的共鳴節奏（吟遊詩人專屬）" },
                        { type: "物理", check: "AC 12", outcome: "用蠟或布條塞住耳朵（如果有準備）" }
                    ],
                    fail_forward: "一名隊員被迷惑，開始攻擊自己的隊友（被視為魅惑狀態），直到受到傷害為止。"
                }
            ],
            endCondition: "擊敗哈比領袖，取得羅盤文書，並在潮水上漲前離開。",
            opening_text: "在萊拉尼的指示下，你們尋找那艘被風暴擊碎的「羅盤號」。那艘船載著關於島上藍龍靈魂甦醒的真相。你們必須在漲潮淹沒殘骸前採取行動。然而，當你們踏上滑溜的甲板時，那甜美而致命的歌聲開始了。"
        },
        {
            act: 4,
            title: "天文台之戰 (The Observatory)",
            titleEn: "The Observatory",
            levelRange: "3",
            objective: "阻止藍龍幼龍碎片與守望者天文台結合，中斷召喚儀式。",
            keyEvents: ["破壞能量導管", "天文台巔峰", "與星火的決戰"],
            boss: {
                name: "星火 (Sparkrender)",
                cr: 3,
                type: "藍龍幼龍 (Blue Dragon Wyrmling)",
                tactics: "如果儀式未被破壞，他每回合會獲得 1d6 的雷電護盾。他會優先攻擊試圖關閉機關的人。",
                weakness: "破壞三座能量導管後，他會失去飛行能力並墜落到地面。"
            },
            locations: [
                { name: "守望者天文台", description: "島嶼頂端的古老建築", boxedText: "這座石造塔樓現在被紫色的閃電環繞。三座小型的能量導管發出刺耳的電流聲，將能量匯聚到塔頂。在光芒中心，幼藍龍星火正在狂笑，他的鱗片因充能而發出耀眼的藍光。" }
            ],
            strategic_nodes: [
                {
                    id: "ritual_sabotage",
                    title: "切斷充能",
                    situation: "星火正在從三座導管吸收能量，每座導管都能被物理或魔法破壞。",
                    approaches: [
                        { type: "力量", check: "AC 14", outcome: "擊碎水晶導管，引發小範圍爆炸 (1d6 雷傷) 但中斷充能" },
                        { type: "奧秘/盜賊工具", check: "DC 15", outcome: "逆轉能量流，使星火受到反噬傷害 (2d8 雷傷)" }
                    ],
                    fail_forward: "導管未被破壞，星火成功吸收能量，下一發吐息攻擊的傷害最大化 (Max Damage)。"
                }
            ],
            endCondition: "擊敗星火，恢復島嶼平衡",
            ending_text: "隨著最後一座導管崩塌，星火發出了不甘的怒吼，從空中墜落。紫色的閃電終於消散，海風重新吹拂過天文台。你們不僅解救了這座島嶼，也證明了自己是真正的屠龍英雄（雖然只是一隻幼龍）。",
            opening_text: "所有的線索都指向了最高峰的天文台。幼藍龍星火正在那裡進行最後的儀式。空氣中充滿了令人毛骨悚然的靜電，這是一場與時間的賽跑。你們必須在它完全吸收島嶼力量之前阻止它。"
        }
    ]
};

export default dragons_of_stormwreck_isle;
