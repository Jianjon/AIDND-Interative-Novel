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
            title: "受詛咒的羅盤號",
            titleEn: "The Cursed Compass",
            levelRange: "2",
            objective: "從沉船中取回重要的文書",
            keyEvents: ["甲板遭遇戰", "船長室密碼", "哈比人的尖叫"],
            locations: [
                { name: "羅盤號殘骸", description: "擱淺在礁石上的古老帆船", boxedText: "這艘船像是一頭死去的巨獸被龍島的礁石撕裂。船帆破碎，船身傾斜。幾隻哈比鳥妖在桅杆上盤旋，發出刺耳的嘲笑聲。" }
            ],
            strategic_nodes: [
                {
                    id: "3-A",
                    title: "哈比的歌聲",
                    situation: "鳥妖開始歌唱，試圖誘惑隊友跳入深海。",
                    approaches: [
                        { type: "意志抵抗", check: "DC 12", outcome: "保持清醒，並發動反擊" },
                        { type: "噪音干擾", check: "工具檢定", outcome: "利用破碎的修船工具製造噪音，打破歌聲的法術" }
                    ],
                    fail_forward: "一名隊員被迷惑跳海，雖然被救起但損失了一部分裝備。"
                }
            ],
            endCondition: "擊敗哈比領袖，取得羅盤文書",
            opening_text: "在萊拉尼的指示下，你們尋找那艘被風暴擊碎的「羅盤號」。那艘船載著關於島上藍龍靈魂甦醒的真相。海霧濃厚，只有偶爾閃過的閃電能照出那具巨大的木製骨骸。鳥妖的歌聲穿透海霧，讓你們的腳步變得沉重。"
        },
        {
            act: 4,
            title: "天文台之戰",
            titleEn: "The Observatory",
            levelRange: "3",
            objective: "阻止藍龍幼龍碎片與守望者天文台結合",
            keyEvents: ["閃電門鎖", "天文台巔峰", "最終對決"],
            boss: { name: "星火 (Sparkrender)", cr: 3, type: "藍龍幼龍", tactics: "頻繁使用閃電吐息，並在石柱間飛行移動" },
            locations: [
                { name: "守望者天文台", description: "島嶼頂端的古老建築", boxedText: "這座石造塔樓現在被紫色的閃電環繞。在塔頂，一個巨大的透鏡正對準天空，彙聚著不自然的魔力。幼藍龍星火正在那裡狂笑，準備重現那場古老的浩劫。" }
            ],
            strategic_nodes: [
                {
                    id: "4-A",
                    title: "閃電屏障",
                    situation: "通往塔頂的路徑被強力電網封鎖。",
                    approaches: [
                        { type: "奧術破解", check: "DC 14", outcome: "關閉魔力流動，安全通過" },
                        { type: "強行突破", check: "DC 16", outcome: "忍受電擊代價（2d8 傷害）強行闖入" }
                    ],
                    fail_forward: "電網爆炸，隊伍被迫從外牆攀爬，雖然進入塔內但陷入了體力疲勞。"
                }
            ],
            endCondition: "擊敗星火，恢復島嶼平衡",
            ending_text: "隨著星火的潰敗，天文台的紫色閃電也隨之熄滅。海霧散去，陽光重新照亮了風暴 wreck 島。萊拉尼長老在神廟迎接你們，眼神中充滿了欣慰。「古老的靈魂終於可以安息了，」她輕聲說道。你們在島上贏得了龍之友的稱號，新的旅程正等待著你們。",
            opening_text: "所有的線索都指向了最高峰的天文台。幼藍龍星火正在在那裡進行儀式，企圖吸收隕落龍族的精華。隨著你們接近巔峰，空氣中靜電劈啪作響，沉重的雷鳴似乎在告誡凡人退卻。但你們手握正義，踏上了最後的階梯。"
        }
    ]
};

export default dragons_of_stormwreck_isle;
