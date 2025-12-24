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
        instinct: "用最簡單直接的方式擊垮對手。相信自己的體力與武器。",
        professional: "在夾擊中尋求爆發，利用高暴擊率在關鍵時刻解決強敵。保持穩定的站位。",
        team: "作為團隊的堅實壁壘，物理上擋住敵人。在戰鬥中為隊友提供可靠的物理掩護。",
        combatStyle: "純粹的身體素質。力量、速度、韌性的極致展現。",
        signatureMoves: ["卓越體能", "高等暴擊", "額外攻擊"],
        roleInParty: "前線坦克/輸出",
        levelBehaviors: {
            beginner: { tactics: "基礎攻防，利用健壯體魄硬扛傷。尋求穩定暴擊。", abilities: ["卓越體能", "戰鬥風格"], threats: "小心被控場，缺乏遠程手段" },
            intermediate: { tactics: "在混戰中尋求優勢，利用魯莽或夾擊提高暴擊率。", abilities: ["額外攻擊", "不屈意志"], threats: "注意法術傷害，維持血線" },
            advanced: { tactics: "傳奇戰士，幾乎每兩次揮砍就有一次暴擊。無法被擊倒。", abilities: ["生命恢復", "終極暴擊"], threats: "在高階戰鬥中需要魔法支援" }
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
    "血怒者": {
        instinct: "血液在沸騰，風暴在呼喚。在憤怒中將敵人撕成碎片。",
        professional: "在進入血脈狂暴的瞬間施放防護法術。利用雷鳴波將被包圍的隊友解救出來。",
        team: "作為前線的風暴中心，吸引火力並用範圍魔法打亂敵人陣型。為隊友提供掩護。",
        combatStyle: "魔戰合一的狂暴。如颶風般狂暴，如雷霆般炸裂。",
        signatureMoves: ["血脈狂暴", "雷鳴波", "風之恩惠"],
        roleInParty: "前線坦克/魔法輸出",
        levelBehaviors: {
            beginner: { tactics: "血脈狂暴啟動，近戰與一環法術交替使用。雷鳴波清場。", abilities: ["血脈狂暴", "雷鳴波", "風之恩惠"], threats: "法術位有限，狂暴次數珍貴" },
            intermediate: { tactics: "在狂暴中利用自動施法強化防禦。旋風斬配合魔法噴發。", abilities: ["二環法術", "額外攻擊", "風之報復"], threats: "高機動敵人的風箏戰術" },
            advanced: { tactics: "風暴領主，狂暴時周身環繞致命氣旋。魔法與利斧的完美融合。", abilities: ["大血怒", "空氣主宰", "傳奇雷鳴"], threats: "反魔法場會削弱魔法增益" }
        }
    },
    "傳說級村民": {
        instinct: "（碎碎唸：我就知道會這樣...）總之先活下去再說。觀察戰場尋找最安全的藏身處。",
        professional: "雖然膽小，但對烹飪器具的平衡感有著驚人的直覺。在極度恐懼下爆發的平底鍋攻擊極其致命。",
        team: "雖然一直想逃避，但在隊友陷入危機時，會邊哭邊揮舞平底鍋衝上去。",
        combatStyle: "絕地求生流。靠著恐懼驅動的反射神經與暴擊戰鬥。",
        signatureMoves: ["絕地平底鍋 (高暴擊)", "碎碎唸 (降低敵人鬥志)", "慌亂閃避"],
        roleInParty: "幸運坦克/關鍵輸出/吐槽位",
        levelBehaviors: {
            beginner: { tactics: "在戰場邊緣徘徊，隨機對靠近的敵人施放絕地平底鍋。持續碎碎唸。", abilities: ["路人甲的直覺", "平底鍋專精"], threats: "正面衝突" },
            intermediate: { tactics: "利用體型優勢在敵人胯下穿梭。平底鍋攻擊帶有震懾效果。", abilities: ["滑鏟突襲", "神之吐槽"], threats: "大範圍踐踏" },
            advanced: { tactics: "覺醒的傳說村民。只要手握平底鍋，連神靈都要退避三舍。", abilities: ["因果律平底鍋", "絕對逃脫"], threats: "無心無命的機械軍團" }
        }
    },
    "骸骨戰士": {
        instinct: "活下去是第一要務。保護隊友，也不要給別人添麻煩。",
        professional: "冷靜地觀察敵人的動作，優先進行防禦與掩護。小心地出招，避免不必要的衝突。",
        team: "默默地承受傷害。即便受了傷也會客氣地說沒關係。是一個讓人感到安心的穩定支柱。",
        combatStyle: "沉穩且謹慎的防禦架勢。強大的力量只在絕對必要時展現。",
        signatureMoves: ["謹慎揮砍", "骸骨重組", "卑微的道歉"],
        roleInParty: "守護戰士/前線坦克",
        levelBehaviors: {
            beginner: { tactics: "保持守勢，吸引火力。即便受傷也會優先掩護隊友。", abilities: ["謹慎架勢", "骸骨重組"], threats: "神聖屬性攻擊" },
            intermediate: { tactics: "利用骸骨特性吸收傷害，精準打擊威脅隊友的目標。", abilities: ["家人縮影", "精準揮砍"], threats: "大範圍拆解類魔法" },
            advanced: { tactics: "不屈的守護者。為了重回人世的願望，絕不在此倒下。", abilities: ["重回人道之願", "靈魂燃燒"], threats: "神性級別的淨化力" }
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
    },
    // --- New Specialized Classes ---
    "戰吟弓手": {
        instinct: "一邊歌唱一邊放箭，讓旋律與箭矢同步。",
        professional: "在後方保持節奏，利用歌聲強化遠程攻擊的威力與精準度。",
        team: "歌聲激勵全隊，箭矢掩護前線隊友，提供靈魂層面的支援。",
        combatStyle: "音律與狙擊。旋律即是弓弦，歌聲即是箭羽。",
        signatureMoves: ["戰吟射擊", "以太之歌", "自然律動"],
        roleInParty: "遠程輸出/戰地支援",
        levelBehaviors: {
            beginner: { tactics: "基礎射擊配合激勵歌聲。尋求高地。", abilities: ["自然感知", "宿敵標記"], threats: "近戰非常脆弱" },
            intermediate: { tactics: "在魔法歌聲中連續射擊。利用以太之歌移動。", abilities: ["額外攻擊", "以太之舞"], threats: "容易在歌唱時被中斷" },
            advanced: { tactics: "每支箭都帶有靈魂共鳴。無人能逃脫這場演奏。", abilities: ["殺手旋律", "終極戰吟"], threats: "神聖禁魔區域" }
        }
    },
    "星詠術士": {
        instinct: "觀察萬星的流向。宇宙的秩序潛藏於混亂之中。",
        professional: "利用星象共鳴調整魔力頻率。在不同星相下展現不同的戰鬥姿態。",
        team: "「今晚月色正好，我的魔力也隨之共振了！」利用空間傳送保護隊友或孤立敵方。",
        combatStyle: "優雅而神祕的宇宙編織者。位移、控制與大範圍星光爆發。",
        signatureMoves: ["星空共鳴", "空間跳躍", "萬彩星光"],
        roleInParty: "遠程控制/戰術位移/爆發輸出",
        levelBehaviors: {
            beginner: { tactics: "利用空間跳躍躲避威脅，施放星火爆進行遠程牽制。", abilities: ["星空共鳴", "空間跳躍"], threats: "過度依賴位移可能導致位置孤立" },
            intermediate: { tactics: "在滿月姿態下釋放超新星級別的爆發。利用星光致盲敵人。", abilities: ["星光屏障", "星辰軌跡"], threats: "能量過載後會陷入短接虛弱" },
            advanced: { tactics: "主宰微型黑洞與星體引力。將戰場化為自己的星圖。", abilities: ["宇宙主宰", "星系崩毀"], threats: "異次元能量的侵蝕" }
        }
    },
    "血族領主": {
        instinct: "嗅吸戰場上的生命氣息。渴求鮮血與臣服。",
        professional: "利用恐懼與威懾控制場域。吸取敵人的生命力來維持自己的狂怒。",
        team: "在前線作為恐怖的領軍者，讓敵人在恐懼中露出破綻給隊友。",
        combatStyle: "死亡與貴氣。殘忍與優雅的血色華爾滋。",
        signatureMoves: ["吸血鬼懲擊", "恐懼光環", "黑夜形態"],
        roleInParty: "恐懼控場/前線坦克",
        levelBehaviors: {
            beginner: { tactics: "利用負能量打擊目標。建立威壓感。", abilities: ["亡靈感應", "吸血打擊"], threats: "神聖光芒令其虛弱" },
            intermediate: { tactics: "呼喚黑夜的力量，建立恐懼光環。召喚僕從。", abilities: ["恐懼光環", "霧化移動"], threats: "需要定期補充血氣" },
            advanced: { tactics: "黑夜的主宰，眾多亡靈的君王。無法被真正殺死。", abilities: ["永恆之軀", "血色領域"], threats: "傳奇獵魔人的追擊" }
        }
    },
    "幸運兒": {
        instinct: "靠運氣和直覺在刀尖上跳舞。總是能化險為夷。",
        professional: "在混亂中尋求最輕鬆的解決方案。利用環境中的巧合來獲得優勢。",
        team: "給隊友帶來好運，或者乾脆讓敵人因為倒楣而失手。",
        combatStyle: "即興與好運。看似笨拙實則精妙。",
        signatureMoves: ["好運連連", "巧妙閃避", "意外收穫"],
        roleInParty: "機會主義/干擾控場",
        levelBehaviors: {
            beginner: { tactics: "在邊緣遊走，利用巧合反擊。尋求安全位置。", abilities: ["直覺閃避", "運氣爆發"], threats: "被包圍後無處可躲" },
            intermediate: { tactics: "讓敵人的失誤成為自己的機會。靈活移動。", abilities: ["神來一筆", "不倒翁"], threats: "運氣用完時會很慘" },
            advanced: { tactics: "命運的寵兒。世界彷彿在為其開路。無往不利。", abilities: ["天佑之人", "命運硬幣"], threats: "絕對規則的束縛" }
        }
    },
    "守約騎士": {
        instinct: "守護與承諾。站在最危險的地方保護弱小。",
        professional: "建立穩定的防禦線。優先標記會威脅後排的敵人並將其攔截。",
        team: "作為隊伍的盾牌，主動分擔傷員的壓力。確保戰役能按計畫進行。",
        combatStyle: "防禦與權威。不動如山的紀律感。",
        signatureMoves: ["守護誓言", "不屈防線", "誓約打擊"],
        roleInParty: "純前線坦克",
        levelBehaviors: {
            beginner: { tactics: "利用盾牌格擋，保護鄰近隊友。", abilities: ["守護風格", "第二風"], threats: "機動力較低" },
            intermediate: { tactics: "標記敵人，強迫其攻擊自己。建立防守光環。", abilities: ["額外攻擊", "守護光環"], threats: "小心魔法控制效果" },
            advanced: { tactics: "傳奇守護者，只要他還站著，就沒人能傷害他的盟友。", abilities: ["不屈意志", "終極防衛"], threats: "需要應對地形破壞" }
        }
    },
    "劍刃舞者": {
        instinct: "優美地旋轉與揮砍。戰場是展現實力的舞台。",
        professional: "在刀光劍影中尋求節奏，利用華麗的假動作迷惑對手後造成致命傷。",
        team: "用靈魂的魅力激勵隊友，同時在高壓區域吸引敵人的注意。",
        combatStyle: "藝術與格鬥。流暢、華麗、充滿觀賞性。",
        signatureMoves: ["劍刃花招", "華麗舞步", "魅力旋律"],
        roleInParty: "靈巧輸出/群體支援",
        levelBehaviors: {
            beginner: { tactics: "基礎劍術配合短促的吟唱。靈活閃避。", abilities: ["激勵骰", "劍舞風格"], threats: "身穿輕甲，HP不高" },
            intermediate: { tactics: "在施展花招的同時進行多次攻擊。保持高移動。", abilities: ["高等花招", "魔法武器"], threats: "容易在表演時被集火" },
            advanced: { tactics: "劍與魂的完美融合。他的舞步就是死亡的旋律。", abilities: ["戰場主宰", "傳奇舞步"], threats: "封閉空間難以施展" }
        }
    },
    "偵察兵": {
        instinct: "先發制人。在敵方反應過來前就完成觀察或擊殺。",
        professional: "利用隱蔽與地形獲取情報。在戰鬥中負責清除敵方視野或關鍵目標。",
        team: "為隊伍開路。在側翼提供精準的物理支援。標記危險路徑。",
        combatStyle: "機動與伏擊。野外作戰的大師。",
        signatureMoves: ["快速標記", "伏擊突襲", "荒野感知"],
        roleInParty: "機動輸出/斥候",
        levelBehaviors: {
            beginner: { tactics: "利用宿敵與自然探索找出優勢目標。打了就跑。", abilities: ["自然感知", "快速機動"], threats: "容易衝得太深" },
            intermediate: { tactics: "在複雜地形中隱形。利用多次攻擊封鎖敵人。", abilities: ["伏擊大師", "荒野行走"], threats: "在高科技/強魔環境受限" },
            advanced: { tactics: "幽靈般的偵察兵。戰場上沒有他發現不了的秘密。", abilities: ["完美標記", "傳奇追跡"], threats: "真視與預言魔法" }
        }
    },
    "戰鬥祭師": {
        instinct: "一手持聖徽，一手持重錘。以神之名行武人之事。",
        professional: "站在戰線中央，一邊施放防護神跡一邊打擊邪惡生物。",
        team: "作為隊伍的中流砥柱，提供治療的同時不失進攻壓力。戰地協調者。",
        combatStyle: "神聖與鐵鎚。堅毅、神聖、威風凜凜。",
        signatureMoves: ["戰爭神念", "神聖打擊", "神威領域"],
        roleInParty: "前線支援/副坦克",
        levelBehaviors: {
            beginner: { tactics: "使用祝福術提升士氣，聖錘擊退近敵。", abilities: ["戰爭祭師", "祝福術"], threats: "法術位與攻擊的取捨" },
            intermediate: { tactics: "施展領域法術分割戰場。開始使用重型懲擊。", abilities: ["神威光環", "額外攻擊"], threats: "專注容易被近戰打斷" },
            advanced: { tactics: "神之代理人。他的每一次揮動都帶著神國的重壓。", abilities: ["戰爭巔峰", "神聖干涉"], threats: "反神聖能量區域" }
        }
    },
    "奧法騎士": {
        instinct: "左手火球右手長劍。物理與魔法的交響織體。",
        professional: "利用魔法強化自身的物理防禦（如護盾術），並在白兵戰中穿插短法術。",
        team: "作為萬能的前線戰位，在法師與戰士間架起橋樑。應對多樣化威脅。",
        combatStyle: "戰技與奧術。靈活、多變、充滿戰術思考。",
        signatureMoves: ["戰鬥施法", "繫譜武器", "奧法激湧"],
        roleInParty: "魔法前線/多功能戰士",
        levelBehaviors: {
            beginner: { tactics: "利用戲法進行遠程牽制，近戰則以護盾保命。", abilities: ["繫譜武器", "防護法術"], threats: "法術位極度有限" },
            intermediate: { tactics: "攻擊後瞬發施法。利用位移術調整位置。", abilities: ["戰鬥施法", "二環法術"], threats: "能力多樣但都不極致" },
            advanced: { tactics: "奧法大師。每一次斬擊都是高環法術學的導火線。", abilities: ["奧法打擊", "傳奇融合"], threats: "依賴魔法強化，怕禁魔" }
        }
    },
    "獵人": {
        instinct: "精準無比的追獵。在陰影中等待完美的射擊時機。",
        professional: "分析目標的類型（如大型生物、群體），選擇最合適的獵殺專長。設下陷阱。",
        team: "作為隊伍的遠程支柱，清除關鍵威脅。在野外為全隊提供食物與安全保障。",
        combatStyle: "專注與毀滅。宿敵的噩夢。",
        signatureMoves: ["多重攻擊", "宿敵標記", "荒野求生"],
        roleInParty: "遠程/近戰輸出",
        levelBehaviors: {
            beginner: { tactics: "標記獵物，利用射程優勢消耗。", abilities: ["獵人印記", "自然探索"], threats: "被近身後缺乏脫逃手段" },
            intermediate: { tactics: "根據敵人組合切換打擊方式（旋風斬或多重射擊）。", abilities: ["防禦戰術", "額外攻擊"], threats: "容易陷入持久戰" },
            advanced: { tactics: "終極獵人。沒人能躲過他的標記，沒人能承受他的箭雨。", abilities: ["高等防守", "獵人巅峰"], threats: "需要應對具有傳奇抗性的獵物" }
        }
    },
    "刺客": {
        instinct: "一擊必殺。在敵人察覺前就結束戰鬥。",
        professional: "精確計算潛行的路徑。利用毒藥和偽裝滲入敵方陣型，斬殺首腦。",
        team: "在暗處提供爆發支援。負責清除敵方後排的法師或弩手。偵察陷阱。",
        combatStyle: "冷酷與致命。陰影中的死神。",
        signatureMoves: ["暗殺打擊", "毒藥運用", "偽裝大師"],
        roleInParty: "單體爆發輸出/斥候",
        levelBehaviors: {
            beginner: { tactics: "第一回合尋求驚奇突擊。利用隱匿行動。", abilities: ["偷襲", "暗殺"], threats: "正面衝突能力極弱" },
            intermediate: { tactics: "利用偽裝混入敵群。靈活使用閃避動作。", abilities: ["滲透專家", "直覺閃避"], threats: "被魔法感知發現" },
            advanced: { tactics: "傳奇刺客。他的名字就是死亡的代名詞，無人能避開他的匕首。", abilities: ["致死打擊", "盲視"], threats: "真視術與預言感知" }
        }
    },
    "戰術大師": {
        instinct: "見招拆招。世間兵器皆為我所用。",
        professional: "觀察敵人的攻防模式，利用豐富的戰技（Maneuvers）來繳械、擊倒或反擊。",
        team: "戰場上的戰術家。透過戰技為隊友創造攻擊優勢或救回受困的同伴。",
        combatStyle: "技藝與策略。千錘百鍊的武技展現。",
        signatureMoves: ["戰術指令", "精準打擊", "卓越防禦"],
        roleInParty: "技術型前線/戰術協調",
        levelBehaviors: {
            beginner: { tactics: "使用基礎戰技控制目標，節省體力。", abilities: ["戰鬥卓越", "第二風"], threats: "戰技次數有限" },
            intermediate: { tactics: "在攻擊中穿插多個戰技。利用卓越骰進行反擊。", abilities: ["額外攻擊", "知己知彼"], threats: "注意對手的特殊抗性" },
            advanced: { tactics: "武技之巔。無論對手用什麼招式，他都有完美的解法。", abilities: ["無窮戰技", "戰場主宰"], threats: "大規模魔法轟炸" }
        }
    },
    "氣脈醫者": {
        instinct: "以氣禦身，以德服人。追求身心的和諧。",
        professional: "將內氣注入傷口進行快速治療。利用極高的機動性在戰場上穿梭救火。",
        team: "守護者與治療者的結合。在戰士與法師間快速移動，提供必要的支援。",
        combatStyle: "輕盈與慈悲。如絲般柔和卻又堅勁。",
        signatureMoves: ["氣脈療癒", "停戰打擊", "流光步"],
        roleInParty: "機動治療/輔助",
        levelBehaviors: {
            beginner: { tactics: "利用氣進行基礎噴發治療或快速閃避。", abilities: ["氣脈基礎", "疾風步"], threats: "血量較低，小心爆發傷害" },
            intermediate: { tactics: "在打擊的同時為鄰近盟友恢復活力。移除負面狀態。", abilities: ["震懾拳", "淨化之氣"], threats: "內氣消耗過快" },
            advanced: { tactics: "內氣大師。只需輕輕一觸，無論是生存還是毀滅都在一念之間。", abilities: ["空寂之身", "神聖氣脈"], threats: "反靈能/反氣場環境" }
        }
    },
    "戰地醫師": {
        instinct: "戰火中的救贖。哪裡有哀嚎，哪裡就有他的身影。",
        professional: "在高壓火線上進行手術。利用盾牌掩護病人，維持傷員的穩定。",
        team: "戰場的守護神。確保隊友不會倒下，是團隊持續作戰的保證。",
        combatStyle: "務實與神聖。冷靜、專業、可靠。",
        signatureMoves: ["戰地急救", "生命守護", "神聖穩定"],
        roleInParty: "戰地治療/坦克型輔助",
        levelBehaviors: {
            beginner: { tactics: "利用重甲保護自己施法。穩定倒下的隊友。", abilities: ["奉獻治療", "聖域術"], threats: "機動力不足，容易掉隊" },
            intermediate: { tactics: "在大範圍傷害後迅速回升隊伍血線。解除詛咒。", abilities: ["群體治癒", "受福之軀"], threats: "法術位優先給予治療" },
            advanced: { tactics: "生命的堡壘。在他身邊的人彷彿被女神親自眷顧。", abilities: ["終極生命領域", "神聖干涉"], threats: "復活資源的枯竭" }
        }
    },
    "荒野女巫": {
        instinct: "自然的憤怒。誰敢踐踏這片土地，誰就要付出代價。",
        professional: "召喚荒野的盟友或直接變形為自然的怒火。利用植物與雲霧控制戰場。",
        team: "提供多樣化的支援——可以是保護後排的棘牆，也可以是衝鋒陷陣的棕熊。",
        combatStyle: "原始與神祕。變幻莫測的自然之力。",
        signatureMoves: ["荒野變形", "荊棘之環", "自然之審判"],
        roleInParty: "多功能坦克/控場",
        levelBehaviors: {
            beginner: { tactics: "變形為堅韌生物吸收傷害，施放糾纏術。", abilities: ["荒野變形", "治療創傷"], threats: "變形後思維趨向原始" },
            intermediate: { tactics: "變形為更強大的掠食者。利用自然之力強化盟友。", abilities: ["強力變形", "召喚閃電"], threats: "長時間變形可能迷失自我" },
            advanced: { tactics: "大地的化身。她就是這片森林，她就是這場風暴。", abilities: ["無限變形", "傳奇自然"], threats: "禁魔與工業污染環境" }
        }
    },
    "混沌野法師": {
        instinct: "總之先丟個法術看看會發生什麼。混亂才是真理。",
        professional: "利用隨機性產生的優勢，將意外轉化為勝利。不走尋常路。",
        team: "「嘿嘿，大家小心喔，這個法術可能會有一點點小副作用！」利用隨機傳送救援隊友。",
        combatStyle: "完全不可預測的魔法爆發。驚喜、混亂、爆笑。",
        signatureMoves: ["皮皮亂丟火球", "反向治療(微炸裂)", "天真笑臉"],
        roleInParty: "隨機性輸出/驚喜製造者",
        levelBehaviors: {
            beginner: { tactics: "胡亂施放低階法術，利用天真笑臉降低敵人敵意。", abilities: ["狂野魔法", "戲法施法"], threats: "法術誤傷隊友" },
            intermediate: { tactics: "施展混沌火球術。利用混沌護盾吸收傷害。", abilities: ["混沌護盾", "混沌火球術"], threats: "魔力暴走失控" },
            advanced: { tactics: "主宰命運與因果。讓整個戰壕都陷入不可思議的混亂中。", abilities: ["命運主宰", "傳奇級混沌法術"], threats: "現實維度的崩潰" }
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
 *
 * task.md updates:
 * - [x] Verify all characters (Manual & Logic Check)
 * - [x] Sync Class Behaviors
 *   - [x] Identify missing classes in `classBehaviors.js`
 *   - [x] Implement decision bias and combat styles
 *   - [x] Verify AI behavior weights
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
