// Character Class Behavior Data for Action Generation
// Defines behaviors for generating options (A/B/C) with level-based progression
// Level Tiers: Beginner (1-5), Intermediate (5-10), Advanced (8-15)

export const CLASS_BEHAVIORS = {
    // === D&D 5E CORE CLASSES ===
    "戰士": {
        instinct: "遇到敵人就想衝鋒，用最強的力量壓制對手。偏好正面對決。",
        professional: "評估戰場地形，尋找掩體、卡住路口，或保護後排。使用戰技控制戰局。",
        team: "吸引敵人火力，大喊嘲諷，讓遊蕩者有背刺機會，或為法師爭取時間。",
        combatStyle: "力與技的結合。精通各種武器，適應性強。",
        signatureMoves: ["行動如潮 (Action Surge)", "第二風 (Second Wind)", "戰技運用"],
        roleInParty: "前線坦克/輸出",
        levelBehaviors: {
            beginner: { tactics: "基礎攻防，學習站位。使用簡單武器連擊。", abilities: ["第二風", "戰鬥風格"], threats: "小心被包圍，HP 不足以硬扛" },
            intermediate: { tactics: "善用行動如潮爆發傷害，多次攻擊切換目標。", abilities: ["行動如潮", "額外攻擊", "戰技"], threats: "注意法術攻擊，尋找掩體" },
            advanced: { tactics: "傳奇戰士，每回合多次攻擊，靈活運用各種戰技組合。", abilities: ["不屈意志", "高等戰技", "3次攻擊"], threats: "面對傳奇生物需要團隊配合" }
        }
    },
    "法師": {
        instinct: "看到密集敵人就想丟火球術。對未知魔法物品充滿好奇。",
        professional: "分析敵人的弱點屬性，選擇最有效的控制或傷害法術。保留法術位。",
        team: "施放加速術、變巨術給戰士，或使用蛛網術分割戰場。",
        combatStyle: "遠距離施法，保持安全距離。準備時間越長，威力越大。",
        signatureMoves: ["火球術", "法術反制", "傳送術"],
        roleInParty: "控場/爆發輸出",
        levelBehaviors: {
            beginner: { tactics: "謹慎使用有限法術位，戲法為主。保護自己。", abilities: ["魔法飛彈", "護盾術", "睡眠術"], threats: "HP 極低，絕對避免近戰" },
            intermediate: { tactics: "火球術清場，蛛網術控制。開始使用高環法術。", abilities: ["火球術", "飛行術", "法術反制"], threats: "注意反魔法區域與沉默術" },
            advanced: { tactics: "重塑戰場，時停傳送，幾乎無所不能。", abilities: ["時間停止", "流星爆", "傳送術", "許願術"], threats: "傳奇法師對決需要策略" }
        }
    },
    "盜賊": {
        instinct: "看到落單的敵人就想偷襲。看到寶箱就手癢。",
        professional: "利用隱匿尋找敵人的視野死角，專攻要害。檢查陷阱。",
        team: "配合隊友的攻擊進行夾擊 (Flanking)，或在戰鬥中偷偷對敵人下毒/偷取物品。",
        combatStyle: "隱匿與精準。一擊致命，絕不戀戰。",
        signatureMoves: ["偷襲 (Sneak Attack)", "閃避動作", "詭計動作"],
        roleInParty: "斥候/爆發傷害",
        levelBehaviors: {
            beginner: { tactics: "尋找夾擊位置，偷襲骰數有限但仍有用。", abilities: ["1d6 偷襲", "詭計動作", "盜賊狡詐"], threats: "被發現後很脆弱" },
            intermediate: { tactics: "靈活使用詭計動作，視情況隱藏或脫離。", abilities: ["3d6+ 偷襲", "不可思議閃避", "專家"], threats: "AOE 法術難以閃避" },
            advanced: { tactics: "幾乎保證偷襲成功，難以被命中，完美刺客。", abilities: ["10d6 偷襲", "閃避本能", "盲視"], threats: "真視術會暴露位置" }
        }
    },
    "遊蕩者": {
        instinct: "看到落單的敵人就想偷襲。看到寶箱就手癢。",
        professional: "利用隱匿尋找敵人的視野死角，專攻要害。檢查陷阱。",
        team: "配合隊友的攻擊進行夾擊 (Flanking)，或在戰鬥中偷偷對敵人下毒/偷取物品。",
        combatStyle: "隱匿與精準。一擊致命，絕不戀戰。",
        signatureMoves: ["偷襲 (Sneak Attack)", "閃避動作", "詭計動作"],
        roleInParty: "斥候/爆發傷害",
        levelBehaviors: {
            beginner: { tactics: "尋找夾擊位置，偷襲骰數有限但仍有用。", abilities: ["1d6 偷襲", "詭計動作", "盜賊狡詐"], threats: "被發現後很脆弱" },
            intermediate: { tactics: "靈活使用詭計動作，視情況隱藏或脫離。", abilities: ["3d6+ 偷襲", "不可思議閃避", "專家"], threats: "AOE 法術難以閃避" },
            advanced: { tactics: "幾乎保證偷襲成功，難以被命中，完美刺客。", abilities: ["10d6 偷襲", "閃避本能", "盲視"], threats: "真視術會暴露位置" }
        }
    },
    "牧師": {
        instinct: "看到隊友受傷就想治療。對不死生物極度厭惡。",
        professional: "施放祝福術 (Bless) 或護盾，預防傷害優於治療。驅散魔法。",
        team: "站在戰線後方維持隊伍血線，或上前線充當副坦，用光耀傷害支援。",
        combatStyle: "神性力量的引導者。平衡攻守，可攻可守。",
        signatureMoves: ["治療創傷", "神聖火焰", "精神守護"],
        roleInParty: "治療/支援",
        levelBehaviors: {
            beginner: { tactics: "保留法術位給治療，祝福術提升隊伍命中。", abilities: ["治療創傷", "祝福術", "聖域術"], threats: "法術位有限，謹慎使用" },
            intermediate: { tactics: "精神守護大幅提升生存力，開始使用攻擊法術。", abilities: ["精神守護", "驅散魔法", "復活術"], threats: "需要專注的法術會被打斷" },
            advanced: { tactics: "神聖化身，強大的治療與傷害輸出。", abilities: ["神聖干涉", "群體治療", "真實復活"], threats: "高階不死生物有抗性" }
        }
    },
    "聖武士": {
        instinct: "絕不後退，誓死守護榮譽。單挑強敵。",
        professional: "利用盾牌與重甲構築防線，使用挑戰 (Challenge) 技能鎖定敵人。",
        team: "與隊友並肩作戰，提供鄰近盟友防禦加成 (Aura)，或治療受傷的同伴 (Lay on Hands)。",
        combatStyle: "神聖誓約的戰士。鏗鏘有力，光輝萬丈。",
        signatureMoves: ["神聖懲擊 (Divine Smite)", "聖療術", "守護光環"],
        roleInParty: "前線坦克/輔助治療",
        levelBehaviors: {
            beginner: { tactics: "聖療術保命，神懲打高價值目標。", abilities: ["神聖懲擊", "聖療術", "神聖感知"], threats: "法術位消耗快" },
            intermediate: { tactics: "光環保護隊友，額外攻擊配合神懲爆發。", abilities: ["守護光環", "額外攻擊", "淨化邪惡"], threats: "邪惡生物會優先攻擊" },
            advanced: { tactics: "傳奇聖武士，免疫控制效果，神懲傷害驚人。", abilities: ["淨化之觸", "復仇天使", "神聖光輝"], threats: "對付魔王需要智慧" }
        }
    },
    "冠軍勇士": {
        instinct: "絕不後退，誓死守護榮譽。單挑強敵。",
        professional: "利用盾牌與重甲構築防線，使用挑戰 (Challenge) 技能鎖定敵人。",
        team: "與隊友並肩作戰，提供鄰近盟友防禦加成 (Aura)，或治療受傷的同伴 (Lay on Hands)。",
        combatStyle: "神聖誓約的戰士。鏗鏘有力，光輝萬丈。",
        signatureMoves: ["神聖懲擊 (Divine Smite)", "聖療術", "守護光環"],
        roleInParty: "前線坦克/輔助治療",
        levelBehaviors: {
            beginner: { tactics: "聖療術保命，神懲打高價值目標。", abilities: ["神聖懲擊", "聖療術", "神聖感知"], threats: "法術位消耗快" },
            intermediate: { tactics: "光環保護隊友，額外攻擊配合神懲爆發。", abilities: ["守護光環", "額外攻擊", "淨化邪惡"], threats: "邪惡生物會優先攻擊" },
            advanced: { tactics: "傳奇聖武士，免疫控制效果，神懲傷害驚人。", abilities: ["淨化之觸", "復仇天使", "神聖光輝"], threats: "對付魔王需要智慧" }
        }
    },
    "遊俠": {
        instinct: "標記獵物，然後射爆它。對自然環境極為敏感。",
        professional: "尋找高地進行狙擊，利用自然環境設伏。使用法術輔助追蹤。",
        team: "集火隊友攻擊的目標，或利用召喚生物/動物夥伴騷擾敵人後排。",
        combatStyle: "荒野的獵人。追蹤、伏擊、一擊斃命。",
        signatureMoves: ["獵人印記", "荊棘術", "動物夥伴"],
        roleInParty: "遠程輸出/斥候",
        levelBehaviors: {
            beginner: { tactics: "獵人印記追蹤目標，保持距離射擊。", abilities: ["獵人印記", "自然探險", "宿敵"], threats: "近戰能力較弱" },
            intermediate: { tactics: "額外攻擊配合獵人印記，召喚動物夥伴。", abilities: ["額外攻擊", "動物夥伴", "穿越植被"], threats: "動物夥伴可能被殺" },
            advanced: { tactics: "完美獵人，追蹤無處逃，傷害爆發驚人。", abilities: ["消失蹤跡", "野性感知", "殺手本能"], threats: "面對飛行目標需要策略" }
        }
    },
    "武僧": {
        instinct: "利用高機動性快速接近，打完就跑。接住飛來的箭矢。",
        professional: "使用震懾拳控制高威脅目標 (如敵方施法者)。利用地形奔跑。",
        team: "衝入敵陣打亂陣型，將敵人推向戰士的攻擊範圍。",
        combatStyle: "身體即是武器。流水般的動作，迅雷不及掩耳。",
        signatureMoves: ["疾風連擊", "震懾拳", "迴避飛彈"],
        roleInParty: "機動打擊/控場",
        levelBehaviors: {
            beginner: { tactics: "疾風連擊增加輸出，注意氣點消耗。", abilities: ["疾風連擊", "迴避飛彈", "患難步"], threats: "氣點有限" },
            intermediate: { tactics: "震懾拳控制施法者，飛簷走壁穿越戰場。", abilities: ["震懾拳", "緩落術", "疾行"], threats: "控制效果可能被豁免" },
            advanced: { tactics: "空手擊敗巨龍，免疫疾病毒素，近乎完美。", abilities: ["空寂之身", "鑽石之魂", "顫掌"], threats: "傳奇抗性的敵人" }
        }
    },
    "吟遊詩人": {
        instinct: "用言語嘲諷敵人，或試圖用魅力解決戰鬥。",
        professional: "施放控制法術 (如睡眠術、狂笑術)，控制戰場節奏。",
        team: "給予隊友吟遊詩人激勵骰 (Inspiration)，增強他們的下一次攻擊或檢定。",
        combatStyle: "魔力化為音符。激勵盟友，瓦解敵人。",
        signatureMoves: ["激勵骰", "惡言咒罵", "睡眠術"],
        roleInParty: "支援/控場",
        levelBehaviors: {
            beginner: { tactics: "激勵骰給主要輸出，控制法術保護隊友。", abilities: ["激勵骰", "治療創傷", "睡眠術"], threats: "戰鬥能力較弱" },
            intermediate: { tactics: "萬事通偷學其他職業法術，多功能支援。", abilities: ["魔法秘密", "反魅惑", "恐懼術"], threats: "成為優先目標" },
            advanced: { tactics: "傳奇詩人，激勵骰恢復，法術無所不能。", abilities: ["高等激勵", "力場籠", "控制心靈"], threats: "需要隊友保護" }
        }
    },
    "德魯伊": {
        instinct: "變成野獸撕碎敵人，或召喚閃電。",
        professional: "利用植物滋長或糾纏術改變地形，限制敵人移動。",
        team: "召喚自然盟友充當肉盾，或變成巨鷹載著隊友移動。",
        combatStyle: "自然的化身。可以是巨熊，可以是風暴。",
        signatureMoves: ["野性變形", "召喚閃電", "糾纏術"],
        roleInParty: "多功能/坦克（變形時）",
        levelBehaviors: {
            beginner: { tactics: "變形成狼或熊增加生存力，糾纏術控場。", abilities: ["野性變形 (CR 1/4)", "糾纏術", "治療創傷"], threats: "變形後無法施法" },
            intermediate: { tactics: "變形成更強的野獸，召喚閃電持續輸出。", abilities: ["野性變形 (CR 1)", "召喚閃電", "癒合術"], threats: "變形HP耗盡後脆弱" },
            advanced: { tactics: "元素變形，無限變形，自然之力。", abilities: ["元素變形", "無限變形", "形體融合"], threats: "反魔法區域非常危險" }
        }
    },
    "術士": {
        instinct: "不管三七二十一，把法術位傾瀉出去。魔力暴走。",
        professional: "利用超魔專長 (Metamagic) 修改法術效果 (如成倍、瞬發)，追求最大爆發。",
        team: "使用雙重法術同時強化兩名隊友，或用範圍法術清場。",
        combatStyle: "血脈中流淌魔力。瞬發與暴走，天賦異稀。",
        signatureMoves: ["超魔專長", "混沌箭", "龍息術"],
        roleInParty: "爆發輸出",
        levelBehaviors: {
            beginner: { tactics: "天賦法術謹慎使用，法術點恢復法術位。", abilities: ["超魔: 精微", "法術點", "血脈能力"], threats: "法術知識有限" },
            intermediate: { tactics: "雙重施法、強效法術爆發傷害。", abilities: ["超魔: 強效", "雙重施法", "火球術"], threats: "法術點消耗快" },
            advanced: { tactics: "血脈覺醒，幾乎無限法術，主宰戰場。", abilities: ["法術恢復", "龍翼飛行", "流星爆"], threats: "反魔法與沉默" }
        }
    },
    "邪術師": {
        instinct: "召喚恩主的力量，不惜代價摧毀敵人。",
        professional: "利用魔能爆 (Eldritch Blast) 配合法術效果，持續輸出。",
        team: "用詛咒削弱強敵，讓隊友更容易擊殺。召喚恩主給予的法術。",
        combatStyle: "與禁忌力量簽訂契約。詭異、神秘、強大。",
        signatureMoves: ["魔能爆", "妖術詛咒", "飢餓深淵"],
        roleInParty: "持續輸出/控場",
        levelBehaviors: {
            beginner: { tactics: "魔能爆配合咒法持續輸出，短休恢復法術位。", abilities: ["魔能爆", "妖術詛咒", "恩主贈禮"], threats: "法術位只有 1-2 個" },
            intermediate: { tactics: "魔能爆多射線，配合咒法效果驚人。", abilities: ["多射線魔能爆", "飢渴深淵", "幻影步"], threats: "恩主可能有要求" },
            advanced: { tactics: "與恩主融合，幾乎無限魔能爆，控制戰場。", abilities: ["秘法大師", "黑暗先知", "生命虹吸"], threats: "恩主的最終代價" }
        }
    },
    "野蠻人": {
        instinct: "憤怒！撕碎一切擋路的東西！",
        professional: "進入狂暴狀態獲得傷害抗性，衝鋒最強的敵人。",
        team: "吸引所有敵人的攻擊，用魯莽攻擊換取隊友的安全。",
        combatStyle: "原始的狂暴。痛覺麻痺，力大無窮。",
        signatureMoves: ["狂暴 (Rage)", "魯莽攻擊", "危機感知"],
        roleInParty: "前線坦克/輸出",
        levelBehaviors: {
            beginner: { tactics: "狂暴衝鋒，物理傷害減半，瘋狂輸出。", abilities: ["狂暴", "魯莽攻擊", "危機感知"], threats: "狂暴次數有限" },
            intermediate: { tactics: "圖騰之力提供額外能力，無情暴擊。", abilities: ["圖騰之力", "額外攻擊", "野性直覺"], threats: "魔法傷害無減免" },
            advanced: { tactics: "原始之力，無盡狂暴，幾乎殺不死。", abilities: ["堅韌狂暴", "原始冠軍", "30 STR"], threats: "智力型敵人會迴避" }
        }
    },

    // === EXPANDED CLASSES ===
    "鍊金術士": {
        instinct: "想知道這瓶藥水丟出去會發生什麼爆炸。",
        professional: "根據敵人弱點調配特定的炸彈或毒藥。分發藥劑。",
        team: "將藥水灌入隊友口中，或製造煙霧彈掩護隊伍撤退。",
        combatStyle: "化學與魔法的融合。爆炸、毒藥、變異藥劑。",
        signatureMoves: ["炸彈投擲", "突變藥劑", "快速煉金"],
        roleInParty: "遠程輸出/支援",
        levelBehaviors: {
            beginner: { tactics: "炸彈為主要輸出，分發基礎藥劑。", abilities: ["炸彈 1d6", "治療藥劑", "毒素"], threats: "炸彈可能傷到隊友" },
            intermediate: { tactics: "特殊炸彈效果，突變藥劑強化自己。", abilities: ["冰霜/酸液炸彈", "突變藥劑", "快速飲藥"], threats: "材料消耗快" },
            advanced: { tactics: "大師級煉金術，任意調配，化學主宰。", abilities: ["大煉金", "真知藥劑", "哲學家之石"], threats: "稀有材料難以獲得" }
        }
    },
    "死靈法師": {
        instinct: "看到屍體就想把它們變成僕從。死亡是新的開始。",
        professional: "維持不死軍團的數量和控制，利用亡靈吸收傷害。",
        team: "讓骷髏戰士保護隊友，或使用負能量削弱敵人。",
        combatStyle: "死亡的主宰。亡靈軍團的指揮官。",
        signatureMoves: ["復活亡靈", "負能量爆發", "靈魂竊取"],
        roleInParty: "召喚坦克/控場",
        levelBehaviors: {
            beginner: { tactics: "維持 2-3 個骷髏，讓它們吸收傷害。", abilities: ["復活亡靈", "寒冷之觸", "虛假生命"], threats: "亡靈可能失控" },
            intermediate: { tactics: "創造更強的亡靈，開始使用靈魂法術。", abilities: ["製造亡靈", "吸血鬼之觸", "恐懼術"], threats: "神聖力量是剋星" },
            advanced: { tactics: "亡靈大軍，操控死亡本身。", abilities: ["大死靈術", "靈魂囚籠", "死亡之軀"], threats: "善良陣營可能敵視" }
        }
    },
    "血獵手": {
        instinct: "聞到血腥味就興奮。獵物已經暴露行蹤。",
        professional: "獻血強化攻擊，追蹤受傷的敵人。利用詛咒血脈。",
        team: "標記最危險的敵人，讓全隊集火。承受傷害換取輸出。",
        combatStyle: "以血為代價。獵殺邪惡與異常。",
        signatureMoves: ["血之詛咒", "獵血儀式", "暗血武器"],
        roleInParty: "輸出/追蹤",
        levelBehaviors: {
            beginner: { tactics: "血儀式附魔武器，追蹤受傷目標。", abilities: ["血儀式", "獵人視野", "詛咒: 束縛"], threats: "自傷機制有風險" },
            intermediate: { tactics: "多重詛咒削弱敵人，暗血爆發。", abilities: ["進階詛咒", "暗血爆發", "異常感知"], threats: "血量管理困難" },
            advanced: { tactics: "血脈覺醒，獵殺任何邪惡。", abilities: ["血脈覺醒", "精通詛咒", "暗獵者"], threats: "黑暗力量的誘惑" }
        }
    },
    "魔劍士": {
        instinct: "劍光與魔光同時綻放，一劍斬斷一切。",
        professional: "結合劍術與魔法，每次揮擊都附帶元素傷害。",
        team: "作為靈活的前線戰士，可攻可守。",
        combatStyle: "魔力灌注於劍。物理與魔法的完美結合。",
        signatureMoves: ["元素劍刃", "魔力爆發", "劍氣釋放"],
        roleInParty: "前線/爆發輸出",
        levelBehaviors: {
            beginner: { tactics: "法術打擊附魔攻擊，保持法術位。", abilities: ["法術打擊", "戰鬥施法", "護盾術"], threats: "近戰中施法困難" },
            intermediate: { tactics: "額外攻擊配合法術打擊爆發驚人。", abilities: ["額外攻擊", "元素武器", "魔法反擊"], threats: "法術位消耗快" },
            advanced: { tactics: "劍魔合一，每次攻擊都是法術。", abilities: ["劍魂共鳴", "瞬發施法", "元素大師"], threats: "反魔法是剋星" }
        }
    },
    "薩滿": {
        instinct: "傾聽祖靈的低語，它們總是知道該怎麼做。",
        professional: "召喚祖靈協助戰鬥，施放自然與靈魂法術。",
        team: "為隊友提供靈魂護盾，或讓祖靈攻擊敵人。",
        combatStyle: "靈魂與自然的橋樑。祖先的力量永遠同在。",
        signatureMoves: ["祖靈召喚", "圖騰之力", "靈魂行者"],
        roleInParty: "支援/召喚",
        levelBehaviors: {
            beginner: { tactics: "召喚小型祖靈輔助，使用自然法術。", abilities: ["小型祖靈", "治療之風", "自然感知"], threats: "祖靈可能有自己的意志" },
            intermediate: { tactics: "圖騰強化隊伍，召喚戰鬥祖靈。", abilities: ["戰鬥圖騰", "靈魂連結", "自然之怒"], threats: "維持召喚消耗專注" },
            advanced: { tactics: "與祖靈完全融合，靈魂行走。", abilities: ["大祖靈", "靈魂行者", "自然主宰"], threats: "精神攻擊特別有效" }
        }
    },
    "靈能者": {
        instinct: "用念力推開敵人，因為動手太麻煩了。",
        professional: "使用心靈感應偵測敵意，精神攻擊無視護甲。",
        team: "建立心靈連結進行無聲交流，或用念力保護隊友。",
        combatStyle: "心靈即武器。思想的力量超越肉體。",
        signatureMoves: ["念力衝擊", "心靈護壁", "精神控制"],
        roleInParty: "控場/輸出",
        levelBehaviors: {
            beginner: { tactics: "念力推擊敵人，心靈感應偵查。", abilities: ["念力推", "心靈感應", "精神抗性"], threats: "心靈免疫的生物" },
            intermediate: { tactics: "精神控制敵人，念力場保護。", abilities: ["精神控制", "念力場", "心靈爆發"], threats: "智力高的敵人難以控制" },
            advanced: { tactics: "心靈主宰，念力無所不能。", abilities: ["心靈支配", "念力飛行", "精神毀滅"], threats: "反靈能生物" }
        }
    },
    "死亡騎士": {
        instinct: "無情地踐踏敵人，死亡只是開始。",
        professional: "使用詛咒與負能量削弱敵人，召喚亡靈坐騎。",
        team: "作為恐怖的前線存在，讓敵人望風而逃。",
        combatStyle: "墮落的聖武士。黑暗誓約的執行者。",
        signatureMoves: ["墮落懲擊", "亡靈坐騎", "恐懼光環"],
        roleInParty: "前線坦克/恐懼控場",
        levelBehaviors: {
            beginner: { tactics: "墮落懲擊附加負能量，恐懼低級敵人。", abilities: ["墮落懲擊", "恐懼術", "黑暗視覺"], threats: "神聖力量是剋星" },
            intermediate: { tactics: "召喚亡靈坐騎，恐懼光環控場。", abilities: ["亡靈坐騎", "恐懼光環", "負能量打擊"], threats: "善良陣營會優先攻擊" },
            advanced: { tactics: "死亡領主，統御亡靈軍團。", abilities: ["死亡領域", "不死軍團", "靈魂收割"], threats: "救贖的可能性" }
        }
    },
    "奇械師": {
        instinct: "用自己發明的奇怪裝置解決問題，不在乎是否穩定。",
        professional: "為隊伍的裝備注入魔力 (Infusions)，如+1武器或防具。",
        team: "部署魔法炮台 (Turret) 提供火力支援或臨時護盾。",
        combatStyle: "機械與魔法的混血。發明、改造、突破極限。",
        signatureMoves: ["魔法灌注", "炮台部署", "鋼鐵守衛"],
        roleInParty: "支援/多功能",
        levelBehaviors: {
            beginner: { tactics: "灌注強化裝備，小型炮台支援。", abilities: ["基礎灌注", "小型炮台", "修理術"], threats: "裝置可能故障" },
            intermediate: { tactics: "進階灌注，機械僕從協助。", abilities: ["機械僕從", "進階灌注", "法術儲存物"], threats: "魔法干擾影響裝置" },
            advanced: { tactics: "鋼鐵守衛保護隊伍，靈魂灌注。", abilities: ["鋼鐵守衛", "靈魂灌注", "法術大師"], threats: "反魔法區會癱瘓所有裝置" }
        }
    },
    "奇物師": {
        instinct: "用自己發明的奇怪裝置解決問題，不在乎是否穩定。",
        professional: "為隊伍的裝備注入魔力 (Infusions)，如+1武器或防具。",
        team: "部署魔法炮台 (Turret) 提供火力支援或臨時護盾。",
        combatStyle: "機械與魔法的混血。發明、改造、突破極限。",
        signatureMoves: ["魔法灌注", "炮台部署", "鋼鐵守衛"],
        roleInParty: "支援/多功能",
        levelBehaviors: {
            beginner: { tactics: "灌注強化裝備，小型炮台支援。", abilities: ["基礎灌注", "小型炮台", "修理術"], threats: "裝置可能故障" },
            intermediate: { tactics: "進階灌注，機械僕從協助。", abilities: ["機械僕從", "進階灌注", "法術儲存物"], threats: "魔法干擾影響裝置" },
            advanced: { tactics: "鋼鐵守衛保護隊伍，靈魂灌注。", abilities: ["鋼鐵守衛", "靈魂灌注", "法術大師"], threats: "反魔法區會癱瘓所有裝置" }
        }
    },
    "調查員": {
        instinct: "戰鬥中還在觀察敵人的攻擊模式。這不是單純的揮劍。",
        professional: "使用「戰鬥分析」找出敵人的破綻，造成精準傷害。",
        team: "大聲指出敵人的弱點，讓全隊獲得攻擊優勢。",
        combatStyle: "觀察與推理。每一劍都有目的。",
        signatureMoves: ["戰鬥分析", "靈感檢定", "精準打擊"],
        roleInParty: "輔助/精準輸出",
        levelBehaviors: {
            beginner: { tactics: "觀察敵人模式，找出破綻。", abilities: ["線索分析", "靈感激發", "精準打擊"], threats: "戰鬥力不足" },
            intermediate: { tactics: "快速推理，即時應對。", abilities: ["快速分析", "多重靈感", "弱點暴露"], threats: "需要時間觀察" },
            advanced: { tactics: "瞬間看穿一切，完美策略。", abilities: ["完美推理", "預知行動", "致命弱點"], threats: "混亂戰場難以分析" }
        }
    },
    "劍客": {
        instinct: "炫耀華麗的劍術，即使多餘的動作也沒關係。",
        professional: "利用佯攻 (Feint) 使對手失去平衡，然後反擊。",
        team: "引誘敵人攻擊自己，然後利用高閃避讓敵人露出破綻給隊友。",
        combatStyle: "優雅與致命。每一劍都是藝術。",
        signatureMoves: ["精準揮擊", "敏捷閃避", "優雅終結"],
        roleInParty: "靈巧輸出/閃避坦",
        levelBehaviors: {
            beginner: { tactics: "利用敏捷閃避攻擊，尋找反擊機會。", abilities: ["佯攻", "敏捷守備", "精準一擊"], threats: "重甲敵人難以穿透" },
            intermediate: { tactics: "連續閃避反擊，華麗連擊。", abilities: ["連續反擊", "優雅終結", "鋼鐵之舞"], threats: "多個敵人難以應對" },
            advanced: { tactics: "劍舞大師，無人能觸及。", abilities: ["完美閃避", "劍舞", "一擊必殺"], threats: "範圍攻擊無法閃避" }
        }
    },
    "先知": {
        instinct: "被神諭或詛咒驅使，行動常人無法理解。",
        professional: "預知敵人的行動，提前施放反制法術。",
        team: "建立生命連結 (Life Link)，分擔隊友的傷害，充當痛苦吸收者。",
        combatStyle: "命運的代言人。祝福與詛咒並存於一身。",
        signatureMoves: ["命運啟示", "生命連結", "神諭法術"],
        roleInParty: "支援/治療",
        levelBehaviors: {
            beginner: { tactics: "神諭給予的法術，承受詛咒的代價。", abilities: ["神諭啟示", "治療術", "詛咒承擔"], threats: "詛咒的負面效果" },
            intermediate: { tactics: "更強的啟示，生命連結保護隊友。", abilities: ["進階啟示", "生命連結", "命運預視"], threats: "承擔傷害可能導致倒下" },
            advanced: { tactics: "神的代言人，命運在手中。", abilities: ["神諭完成", "命運主宰", "終極啟示"], threats: "神的意志難以違抗" }
        }
    },
    "女巫": {
        instinct: "咯咯笑著對敵人下咒，享受他們的痛苦。",
        professional: "使用睡眠、不幸 (Misfortune) 等詛咒削弱敵人戰力。",
        team: "利用魔寵進行偵查或傳遞接觸法術，削弱Boss級敵人。",
        combatStyle: "巫術與詛咒。黑暗中低語的力量。",
        signatureMoves: ["詛咒 (Hex)", "睡眠巫術", "魔寵傳術"],
        roleInParty: "控場/削弱",
        levelBehaviors: {
            beginner: { tactics: "使用巫術削弱敵人，魔寵偵查。", abilities: ["邪眼", "催眠巫術", "魔寵"], threats: "直接戰鬥能力弱" },
            intermediate: { tactics: "多重詛咒疊加，魔寵傳遞法術。", abilities: ["不幸詛咒", "飛行巫術", "法術傳遞"], threats: "詛咒可能被驅散" },
            advanced: { tactics: "巫術大師，詛咒毀滅一切。", abilities: ["永恆詛咒", "巫術女王", "死亡凝視"], threats: "被詛咒的反噬" }
        }
    },
    "魔戰士": {
        instinct: "劍與魔法同時使用，追求華麗的連擊。",
        professional: "將接觸法術 (如電爪) 附在武器上攻擊，爆發高。",
        team: "衝入前線分擔壓力，同時具備物理與魔法輸出。",
        combatStyle: "劍即是杖，杖即是劍。物魔合一。",
        signatureMoves: ["法術打擊", "戰鬥施法", "劍術精通"],
        roleInParty: "前線/爆發輸出",
        levelBehaviors: {
            beginner: { tactics: "法術打擊附魔攻擊，保持法術位。", abilities: ["法術打擊", "戰鬥施法", "護盾術"], threats: "近戰中施法困難" },
            intermediate: { tactics: "額外攻擊配合法術打擊爆發驚人。", abilities: ["額外攻擊", "元素武器", "魔法反擊"], threats: "法術位消耗快" },
            advanced: { tactics: "劍魔合一，每次攻擊都是法術。", abilities: ["劍魂共鳴", "瞬發施法", "元素大師"], threats: "反魔法是剋星" }
        }
    },
    "召喚師": {
        instinct: "躲在後面，讓幻靈 (Eidolon) 上去打。",
        professional: "精確指揮幻靈的行動與進化型態，配合戰局。",
        team: "讓幻靈保護脆弱的隊友，自己施放輔助法術。",
        combatStyle: "幻靈即延伸。主人與召喚物的完美配合。",
        signatureMoves: ["幻靈召喚", "生命共享", "進化塑型"],
        roleInParty: "召喚物坦克/輔助",
        levelBehaviors: {
            beginner: { tactics: "幻靈作為前線，自己保持距離。", abilities: ["基礎幻靈", "生命連結", "召喚術"], threats: "幻靈死亡後脆弱" },
            intermediate: { tactics: "進化幻靈能力，共享感知。", abilities: ["進化幻靈", "共享感知", "強化召喚"], threats: "專注於幻靈消耗心力" },
            advanced: { tactics: "完美融合，幻靈成為分身。", abilities: ["合一形態", "終極進化", "雙重意識"], threats: "分離時的脆弱瞬間" }
        }
    },
    "時空術士": {
        instinct: "用時間魔法解決問題，但經常算錯時間差。對收集奇怪魔法有執念。",
        professional: "預見敵人的行動，在關鍵時刻凍結或減速時間。",
        team: "為隊友爭取時間，或加速隊友的行動。分享數百年累積的知識。",
        combatStyle: "時間的掌控者。千年智慧，從容不迫。",
        signatureMoves: ["時間減速", "預知術", "時空傳送"],
        roleInParty: "控場/支援",
        levelBehaviors: {
            beginner: { tactics: "使用預知避開危險，時間減速保護自己。", abilities: ["預知術", "時間減速", "記憶投影"], threats: "時間魔法消耗大" },
            intermediate: { tactics: "時間凍結控制敵人，時空傳送靈活移動。", abilities: ["時間凍結", "時空傳送", "加速術"], threats: "時間悖論可能發生" },
            advanced: { tactics: "主宰時間流，幾乎無所不能。", abilities: ["時間停止", "記憶回溯", "時空主宰"], threats: "時間守護者的注視" }
        }
    }
};

/**
 * Fallback behavior for unknown/custom classes with level tiers
 */
export const UNKNOWN_CLASS_FALLBACK = {
    instinct: "依據職業本能行動，發揮與生俱來的天賦。",
    professional: "運用專業訓練，冷靜分析局勢後做出最佳判斷。",
    team: "觀察隊友的需求，配合團隊發揮最大效益。",
    combatStyle: "獨特的戰鬥風格。隨機應變，創造機會。",
    signatureMoves: ["職業特技", "獨門絕活", "應變能力"],
    roleInParty: "根據特長靈活調整",
    levelBehaviors: {
        beginner: { tactics: "學習基礎技能，謹慎探索能力邊界。", abilities: ["基礎技能", "職業能力", "求生本能"], threats: "經驗不足，需要隊友支援" },
        intermediate: { tactics: "技能熟練，開始展現獨特風格。", abilities: ["進階技能", "專長運用", "戰術配合"], threats: "面對強敵需要策略" },
        advanced: { tactics: "大師級表現，職業能力登峰造極。", abilities: ["大師技能", "終極能力", "傳奇技巧"], threats: "傳奇級挑戰需要團隊" }
    }
};

/**
 * Get class behavior with level tier, with fallback for unknown classes
 * @param {string} className - The class name (Chinese)
 * @param {string} levelTier - 'beginner' (1-5), 'intermediate' (5-10), 'advanced' (8-15)
 * @returns {object} - Class behavior object with level-specific info
 */
export function getClassBehavior(className, levelTier = 'beginner') {
    let behavior;

    // Direct match
    if (CLASS_BEHAVIORS[className]) {
        behavior = CLASS_BEHAVIORS[className];
    } else {
        // Try partial match
        for (const [key, value] of Object.entries(CLASS_BEHAVIORS)) {
            if (className.includes(key) || key.includes(className)) {
                behavior = { ...value, _matchedFrom: key };
                break;
            }
        }
    }

    // Use fallback if no match found
    if (!behavior) {
        behavior = {
            ...UNKNOWN_CLASS_FALLBACK,
            _isUnknown: true,
            _originalClass: className,
            instinct: `作為${className}，依據職業本能行動。`,
            professional: `運用${className}的專業訓練做出判斷。`,
            team: `以${className}的能力配合團隊。`
        };
    }

    // Extract level-specific behavior
    const levelInfo = behavior.levelBehaviors?.[levelTier] || behavior.levelBehaviors?.beginner || {};

    return {
        ...behavior,
        currentLevel: {
            tier: levelTier,
            ...levelInfo
        }
    };
}

/**
 * Level tier definitions
 */
export const LEVEL_TIERS = {
    beginner: { name: "初階", levels: "1-5", description: "冒險者的起點，學習基礎技能" },
    intermediate: { name: "中階", levels: "5-10", description: "經驗豐富，開始展現職業特色" },
    advanced: { name: "高階", levels: "8-15", description: "傳奇人物，能力登峰造極" }
};

export default CLASS_BEHAVIORS;
