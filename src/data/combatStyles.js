
export const COMBAT_STYLES = {
    "DEFAULT": {
        name: "本性模式 (預設)",
        desc: "完全按照角色的原生個性行動。這是最自然、效果最穩定的模式。",
        alignment: "all"
    },
    "AGGRESSIVE": {
        name: "全面進攻",
        desc: "不計代價地追求輸出，忽視防禦，優先攻擊敵方首領。",
        conflicts: ["多疑謹慎", "慈悲為懷"],
        synergy: ["熱血衝動", "雷鳴演出", "豪邁不羈"],
        instruction: "優先使用高傷害手段，忽視掩體，即便受傷也要推進。"
    },
    "DEFENSIVE": {
        name: "穩健防守",
        desc: "優先保命與保護隊友，利用掩體、閃避與防禦性法術。",
        conflicts: ["熱血衝動", "雷鳴演出"],
        synergy: ["多疑謹慎", "忠誠堅定", "冷靜理智"],
        instruction: "尋找掩體，優先使用閃避、格擋或防禦性技能，直到情勢安全。"
    },
    "TACTICAL": {
        name: "精準戰術",
        desc: "專注於控制戰場，利用弱點檢定、控制法術或環境要素。",
        conflicts: ["熱血衝動", "豪邁不羈"],
        synergy: ["冷靜理智", "神秘莫測", "多疑謹慎"],
        instruction: "優先進行調查/洞察，找到弱點後使用控制或精準打擊方案。"
    },
    "MERCIFUL": {
        name: "仁慈不殺",
        desc: "避免致命傷。使用非致命打擊、控制或對話來平息紛爭。",
        conflicts: ["憤世嫉俗", "雷鳴演出", "熱血衝動"],
        synergy: ["慈悲為懷", "樂觀開朗"],
        instruction: "優先嘗試對話或非致命性控制。只有在絕對必要時才進行低傷害攻擊。"
    }
};
