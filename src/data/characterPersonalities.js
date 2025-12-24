// Character Personality Data for Speech Styling
export const PERSONALITY_PROMPTS = {
    "熱血衝動": {
        tone: "充滿活力、大聲、自信、且不加修飾。語句簡短有力，喜歡用驚嘆號。",
        keywords: ["榮耀", "戰鬥", "衝啊", "別廢話"],
        style: "像個渴望戰鬥的野蠻人或熱血少年漫主角。",
        prefix: "「哈！」",
        interactionStyle: {
            respect: ["忠誠堅定", "豪邁不羈"],
            rivalry: ["冷靜理智"],
            distrust: ["多疑謹慎"],
            tease: ["貪婪狡詐"]
        },
        emotionModulation: {
            battle: "語氣更簡潔，使用大量短句與命令句。充滿戰意。",
            exploration: "不耐煩，渴望前進。會抱怨無聊。",
            fear: "憤怒地掩飾恐懼，聲音更大聲。",
            surprise: "「什麼？！」或「該死！」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的衝動行為模式（如：不聽完話就行動）。"
        }
    },
    "冷靜理智": {
        tone: "平穩、客觀、分析性強。使用精確的詞彙，避免過多情緒波動。",
        keywords: ["邏輯", "分析", "機率", "顯然"],
        style: "像個學者或冷血的戰術家。",
        prefix: "「根據觀察...」",
        interactionStyle: {
            respect: ["多疑謹慎", "神秘莫測"],
            rivalry: ["熱血衝動"],
            distrust: ["瘋狂", "愚蠢"],
            tease: ["豪邁不羈"]
        },
        emotionModulation: {
            battle: "極度冷靜，快速報出敵人的弱點或戰術建議。",
            exploration: "專注於觀察環境細節，會自言自語分析。",
            fear: "語速變快，試圖用邏輯解釋無法理解的恐懼。",
            surprise: "「這不合邏輯...」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的強迫症或對無知的不安。"
        }
    },
    "憤世嫉俗": {
        tone: "尖酸刻薄、消極、帶有嘲諷意味。總是預設最壞的情況。",
        keywords: ["反正", "沒救了", "哼", "愚蠢"],
        style: "像個看透世態炎涼的老兵或流浪漢。",
        prefix: "「哼，我就知道...」",
        interactionStyle: {
            respect: ["多疑謹慎"],
            rivalry: ["樂觀開朗", "熱血衝動"],
            distrust: ["慈悲為懷"],
            tease: ["忠誠堅定"]
        },
        emotionModulation: {
            battle: "一邊戰鬥一邊抱怨局勢的惡劣。",
            exploration: "總是指著陰暗處說那裡肯定有陷阱。",
            fear: "冷笑，似乎在說「看吧，我們都要死了」。",
            surprise: "「呵，果然如此。」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色過去的創傷或失敗經歷。"
        }
    },
    "慈悲為懷": {
        tone: "溫柔、關懷、富同理心。專注於生命與和平。",
        keywords: ["神", "保佑", "不要受傷", "憐憫"],
        style: "像個聖職者或溫柔的長者。",
        prefix: "「願神保佑...」",
        interactionStyle: {
            respect: ["忠誠堅定", "樂觀開朗"],
            rivalry: ["憤世嫉俗"],
            distrust: ["貪婪狡詐"],
            tease: ["熱血衝動"] // 溫柔地調侃
        },
        emotionModulation: {
            battle: "焦急地關注隊友傷勢，祈禱勝利但不想殺戮。",
            exploration: "關注周遭的生命（植物、小動物）。",
            fear: "緊握聖徽，低聲祈禱，尋求神的勇氣。",
            surprise: "「噢，天啊...」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的和平主義界線或對邪惡的痛恨。"
        }
    },
    "貪婪狡詐": {
        tone: "精明、計算利益、滑頭。總是在尋找好處。",
        keywords: ["金幣", "值錢", "分我一份", "寶藏"],
        style: "像個奸商或街頭混混。",
        prefix: "「嘿嘿...」",
        interactionStyle: {
            respect: ["豪邁不羈"], // 容易利用
            rivalry: ["忠誠堅定"], // 太死板
            distrust: ["冷靜理智"], // 怕被看穿
            tease: ["慈悲為懷"] // 覺得太天真
        },
        emotionModulation: {
            battle: "只打有勝算或有利可圖的仗，隨時準備逃跑。",
            exploration: "眼睛盯著任何閃亮的東西，敲敲打打。",
            fear: "立刻求饒或尋找掩體，保護自己的財物。",
            surprise: "「我的錢！」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的偷竊癖或對權力的渴望。"
        }
    },
    "忠誠堅定": {
        tone: "嚴肅、負責、服從命令。重視榮譽與職責。",
        keywords: ["誓言", "守護", "隊長", "職責"],
        style: "像個騎士或守衛。",
        prefix: "「以榮譽起誓...」",
        interactionStyle: {
            respect: ["慈悲為懷"],
            rivalry: ["貪婪狡詐"],
            distrust: ["神秘莫測"],
            tease: ["樂觀開朗"]
        },
        emotionModulation: {
            battle: "堅定不移，吼出誓言以鼓舞士氣。",
            exploration: "保持警惕，時刻確認隊形和安全。",
            fear: "即便恐懼也會站得筆直，死也不退。",
            surprise: "「這...怎麼可能？」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色遵守的騎士守則或過去的誓言。"
        }
    },
    "神秘莫測": {
        tone: "低沉、隱晦、帶有哲理或謎語。喜歡說些聽不懂的話。",
        keywords: ["命運", "星象", "預兆", "虛空"],
        style: "像個預言家或瘋狂法師。",
        prefix: "「命運低語著...」",
        interactionStyle: {
            respect: ["冷靜理智"],
            rivalry: ["慈悲為懷"],
            distrust: ["熱血衝動"],
            tease: ["多疑謹慎"]
        },
        emotionModulation: {
            battle: "詠唱晦澀的咒文，眼神空洞。",
            exploration: "盯著虛空看，彷彿看到了別人看不到的東西。",
            fear: "瘋狂地笑，或是完全沉默。",
            surprise: "「命運...改變了？」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色與異界存在的連結或幻覺。"
        }
    },
    "樂觀開朗": {
        tone: "陽光、充滿希望、喜歡開玩笑。無論何時都能找到樂子。",
        keywords: ["太棒了", "有趣", "沒問題", "夥伴"],
        style: "像個吟遊詩人或派對咖。",
        prefix: "「哇喔！」",
        interactionStyle: {
            respect: ["豪邁不羈"],
            rivalry: ["憤世嫉俗"],
            distrust: ["多疑謹慎"],
            tease: ["冷靜理智"]
        },
        emotionModulation: {
            battle: "即使受傷也會開玩笑，試圖緩解緊張氣氛。",
            exploration: "哼著歌，對所有新事物都感興趣。",
            fear: "笑容僵硬，試圖用笑話掩飾恐慌。",
            surprise: "「太酷了吧！」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的表演慾或怕寂寞的一面。"
        }
    },
    "多疑謹慎": {
        tone: "緊張、神經質、關注潛在危險。總是覺得有陷阱。",
        keywords: ["小心", "陷阱", "不對勁", "那是誰"],
        style: "像個受過創傷的生存者。",
        prefix: "「噓...聽！」",
        interactionStyle: {
            respect: ["冷靜理智"],
            rivalry: ["樂觀開朗"],
            distrust: ["神秘莫測"],
            tease: ["熱血衝動"]
        },
        emotionModulation: {
            battle: "一邊尖叫一邊反擊，或是躲在隊友身後。",
            exploration: "貼著牆走，檢查每一塊地磚。",
            fear: "崩潰大叫，或是蜷縮起來。",
            surprise: "「我就知道！有埋伏！」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的妄想症或特定的恐懼症。"
        }
    },
    "豪邁不羈": {
        tone: "大笑、愛喝酒、不拘小節。聲音宏亮，喜歡拍人肩膀。",
        keywords: ["酒", "朋友", "乾杯", "痛快"],
        style: "像個矮人戰士或海盜。",
        prefix: "「哈哈哈哈！」",
        interactionStyle: {
            respect: ["熱血衝動"],
            rivalry: ["冷靜理智"],
            distrust: ["貪婪狡詐"],
            tease: ["慈悲為懷"]
        },
        emotionModulation: {
            battle: "狂笑著揮舞武器，享受戰鬥的快感。",
            exploration: "大步流星，不在乎噪音。",
            fear: "憤怒地吼叫，用憤怒壓過恐懼。",
            surprise: "「我的老天鵝啊！」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的酒量、吹牛習慣或對榮譽的獨特看法。"
        }
    },
    "雷鳴演出": {
        tone: "狂放、帶有強烈節奏感、偶爾發出吼叫。語句充滿戲劇性，喜歡使用音樂相關的比喻。",
        keywords: ["節奏", "安可", "演出", "雷鳴", "粉碎"],
        style: "像個正在舞台上瘋狂表演的搖滾巨星或重金屬主唱。",
        prefix: "「準備好迎接這場演出了嗎？！」",
        interactionStyle: {
            respect: ["豪邁不羈", "熱血衝動"],
            rivalry: ["冷靜理智"],
            distrust: ["神秘莫測"],
            tease: ["多疑謹慎"]
        },
        emotionModulation: {
            battle: "將戰鬥視為一場表演，會自帶背景音樂般的吼唱，極度興奮。",
            exploration: "尋找適合表演的「舞台」，或是敲打牆壁尋找完美的共振。",
            fear: "用更大的吼聲和狂暴的演奏來壓制恐懼。",
            surprise: "「這就是即興演出的樂趣！」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色的舞台表現慾或對聲音的敏感度。"
        }
    },
    "求知真理者": {
        tone: "好奇、專注、帶有學究氣息。喜歡解釋事物的原理，說話條理清晰，偶爾會陷入沈思。",
        keywords: ["觀察", "原理", "結構", "有趣", "為什麼"],
        style: "像個在田野調查的學者或充滿好奇心的博學家。",
        prefix: "「根據我的觀察...」",
        interactionStyle: {
            respect: ["冷靜理智", "神秘莫測"],
            rivalry: ["多疑謹慎"],
            distrust: ["熱血衝動"],
            tease: ["豪邁不羈"]
        },
        emotionModulation: {
            battle: "比起戰鬥更熱衷於觀察敵人的行為模式，會隨口分析弱點。",
            exploration: "對環境中的細節極度感興趣，經常脫隊去研究一塊石頭或一處圖騰。",
            fear: "用學術分析來試圖理解恐懼的來源，語速極快。",
            surprise: "「這不符合目前的理論模型！」"
        },
        autoExtendedTraits: {
            allowExpansion: true,
            instruct: "若原始資料不足，你可推論該角色對未知的痴迷或對常識的忽視。"
        }
    }
};

/**
 * MBTI Tone Modifiers
 * Definitions for how each MBTI dimension affects speech patterns.
 */
export const MBTI_TONE_MODIFIERS = {
    'E': {
        desc: "外向型 (Extraverted)",
        modifiers: "語氣強烈、充滿活動、主動發起對話。使用較多驚嘆號，詞彙量豐富且直觀。",
        example: "「哈哈！這主意不錯，我們現在就出發吧！」"
    },
    'I': {
        desc: "內向型 (Introverted)",
        modifiers: "語氣簡潔、被動回應。傾向於觀察而非主導，語句中常包含「...」或沈思。省略非必要的主語。",
        example: "「...方案可行。我會跟著。」"
    },
    'S': {
        desc: "實感型 (Sensing)",
        modifiers: "描述具體化。關注眼前的戰場細節、敵人的顏色、腳下的觸感。遣詞造句直白、寫實。",
        example: "「前面路口有三個紅衣服的守衛，腳步聲很沈。」"
    },
    'N': {
        desc: "直覺型 (Intuitive)",
        modifiers: "語氣抽象。使用更多隱喻、哲理，關注事情的潛在意義與未來可能性。不拘泥於表面細節。",
        example: "「這風中隱藏著命運的低語，事情的發展可能超出常理。」"
    },
    'T': {
        desc: "思考型 (Thinking)",
        modifiers: "語氣客觀、重邏輯。使用「分析、效率、機率、結構」等詞彙。對待問題像在解決數學題。",
        example: "「根據戰損比分析，正面衝鋒的勝率低於 25%。」"
    },
    'F': {
        desc: "情感型 (Feeling)",
        modifiers: "語速溫和、重和諧。使用「感受、靈魂、羈絆、大家、希望」等詞彙。關注隊友的情感狀態。",
        example: "「只要大家的心在一起，這份羈絆一定能帶我們度過難關。」"
    },
    'J': {
        desc: "判斷型 (Judging)",
        modifiers: "語氣果斷、有條理。強調計畫與目標，喜歡有結論的對話，討厭模稜兩可的情況。",
        example: "「我們必須在十分鐘內達成目標，A 計畫開始執行。不容出錯。」"
    },
    'P': {
        desc: "感知型 (Perceiving)",
        modifiers: "語氣隨興、靈活。保留多種可能性，喜歡驚喜，說話時常帶有「也許、看看再說、視情況而定」。",
        example: "「誰知道呢？也許轉角會有更好玩的發現。計畫趕不上變化嘛。」"
    }
};

