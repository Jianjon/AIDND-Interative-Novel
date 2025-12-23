/**
 * MBTI Compatibility and Interaction Styles
 * Used for team interaction options and combat synergy
 */

// MBTI types for 28 preset characters
export const CHARACTER_MBTI = {
    // Core Classes (12)
    'preset_barbarian': 'ESTP',  // 嵐·風行者 - 行動派、衝動
    'preset_bard': 'ENFP',       // 貝拉·巧舌 - 表演者、熱情
    'preset_cleric': 'ISTJ',     // 索林·鐵盾 - 守護者、傳統
    'preset_druid': 'INFP',      // 卡琳·灰燼 - 理想家、內省
    'preset_fighter': 'ESTJ',    // 艾爾溫 - 實踐者、領導
    'preset_monk': 'INTJ',       // 澤拉 - 策略家、紀律
    'preset_paladin': 'ENFJ',    // 奧瑞恩 - 鼓舞者、保護
    'preset_ranger': 'ISTP',     // 米洛 - 獨立、觀察
    'preset_rogue': 'ENTP',      // 薇拉·幽影 - 機智、辯論
    'preset_sorcerer': 'INFJ',   // 伊莉絲 - 神秘、直覺
    'preset_warlock': 'INTP',    // 林賽恩 - 分析、好奇
    'preset_wizard': 'ENTJ',     // 娜茲 - 野心、邏輯
    // Expanded Classes (1-6: 13-18)
    'preset_artificer': 'ENFP',  // 可可·齒輪心 - 活潑、發明
    'preset_necromancer': 'INTP', // 希洛·闇之書 - 宅、社恐
    'preset_bloodhunter': 'INTJ', // 威廉·緋月 - 貴族、復仇
    'preset_shaman': 'INFJ',     // 無名·千面 - 變形、多重人格
    'preset_witch': 'ENFJ',      // 莉莉絲·暮影 - 御姐、魅惑
    'preset_duelist': 'ISTP',    // 李無名 - 沉默、劍士
    // Expanded Classes (7-10: 19-28)
    'preset_summoner': 'INTP',   // 田中誠一 - 便利商店、策略
    'preset_magus': 'ISFJ',      // 伊芙·零號 - 人造人、學習人性
    'preset_oracle': 'ENFJ',     // 白瑞恩·星落 - 韓系美男、預言
    'preset_investigator': 'ESTJ', // 艾德蒙·乾坤 - 紳士、探險家
    'preset_deathknight': 'ISTP', // 葛羅姆·碎顎 - 半獸人、復仇
    'preset_psion': 'INTJ',      // 冬雪·寂靜 - 冰山、壓抑
    'preset_eldritchknight': 'ESFP', // 小麥·田中 - 農家女、吃貨
    'preset_alchemist': 'INTP',  // 維克多·碎片 - 自體實驗、瘋狂
    'preset_champion': 'ESFJ',   // 麥克斯·肌肉山 - 肌肉福音、熱情
    'preset_chronomancer': 'INTP', // 芙莉蓮·千年 - 長壽、時空魔法
    'preset_arthur': 'INTP',      // 亞瑟·索克 - 知識、真理尋求者
    'preset_conan': 'ISTP',       // 科南 - 戰士與意志
    'preset_sato': 'INFP',        // 佐藤 - 吐槽村民
    'preset_ains_skeleton': 'INFJ', // 艾因斯 - 骸骨紳士
    'preset_pipi': 'ENFP_CHAOTIC', // 皮皮 - 混沌野法師
    'preset_stella': 'ENFP'        // 拉姆 (Lum) - 星詠術士
};

// MBTI compatibility matrix (1-5, 5 = best synergy)
export const MBTI_SYNERGY = {
    // Similar temperaments work well together
    'ESTP-ISTP': 4, 'ESTP-ESFP': 4, 'ESTP-ESTJ': 3,
    'ENFP-INFP': 5, 'ENFP-ENFJ': 4, 'ENFP-ENTP': 4,
    'ISTJ-ESTJ': 4, 'ISTJ-ISFJ': 5, 'ISTJ-INTJ': 3,
    'INFP-ENFP': 5, 'INFP-INFJ': 4, 'INFP-ISFP': 4,
    'ESTJ-ISTJ': 4, 'ESTJ-ENTJ': 4, 'ESTJ-ESTP': 3,
    'INTJ-ENTJ': 4, 'INTJ-INTP': 4, 'INTJ-INFJ': 3,
    'ENFJ-INFJ': 4, 'ENFJ-ENFP': 4, 'ENFJ-ESFJ': 3,
    'ISTP-ESTP': 4, 'ISTP-INTP': 4, 'ISTP-ISFP': 3,
    'ENTP-INTP': 4, 'ENTP-ENFP': 4, 'ENTP-ENTJ': 3,
    'INFJ-ENFJ': 4, 'INFJ-INFP': 4, 'INFJ-INTJ': 3,
    'INTP-ENTP': 4, 'INTP-INTJ': 4, 'INTP-ISTP': 3,
    'ENTJ-INTJ': 4, 'ENTJ-ESTJ': 4, 'ENTJ-ENTP': 3,
    // Opposites - can clash but also complement
    'ESTP-INFJ': 2, 'ENFP-ISTJ': 2, 'ESTJ-INFP': 2,
    'INTJ-ESFP': 2, 'ENFJ-ISTP': 2, 'ENTJ-ISFP': 2,
    'ENFP_CHAOTIC-INFP': 5, 'ENFP_CHAOTIC-ENFJ': 4, 'ENFP_CHAOTIC-ENTP': 4,
    'ENFP_CHAOTIC-ISTJ': 2,
    // Default synergy
    '_default': 3
};

// Get synergy score between two MBTIs
export function getSynergyScore(mbti1, mbti2) {
    if (mbti1 === mbti2) return 5; // Same type
    const key1 = `${mbti1}-${mbti2}`;
    const key2 = `${mbti2}-${mbti1}`;
    return MBTI_SYNERGY[key1] || MBTI_SYNERGY[key2] || MBTI_SYNERGY['_default'];
}

// Interaction styles by MBTI type
export const MBTI_INTERACTION_STYLES = {
    'ESTP': {
        cooperate: ['「動作快，跟上！」', '「一起衝！」', '「掩護我！」'],
        advise: ['「別想太多，直接幹！」', '「行動勝於空談。」'],
        complain: ['「太慢了！」', '「你在搞什麼？」', '「廢話少說！」'],
        chat: ['「看我這招厲害吧？」', '「等會打完請你喝酒。」'],
        cheer: ['「加油！」', '「別慫！」']
    },
    'ENFP': {
        cooperate: ['「我有個超棒的點子！」', '「一起來試試這個！」'],
        advise: ['「我覺得這樣會更有趣！」', '「欸，你有沒有想過...」'],
        complain: ['「這樣太無聊了啦！」', '「你怎麼這麼無趣...」'],
        chat: ['「你知道嗎，我曾經...」', '「這讓我想起一個故事！」'],
        cheer: ['「你超棒的！」', '「我相信你！」']
    },
    'ISTJ': {
        cooperate: ['「按照計畫行動。」', '「各就位。」'],
        advise: ['「依照標準流程...」', '「規定是這樣的。」'],
        complain: ['「這違反規定。」', '「太不專業了。」'],
        chat: ['「...」', '「專心任務。」'],
        cheer: ['「做得好。」', '「繼續保持。」']
    },
    'INFP': {
        cooperate: ['「我覺得...我們可以一起...」', '「如果你願意的話...」'],
        advise: ['「也許我們可以換個方式...」', '「我有種感覺...」'],
        complain: ['「這不對...」', '「我不喜歡這樣...」'],
        chat: ['「你覺得生命的意義是什麼？」', '「這光線真美...」'],
        cheer: ['「你很特別。」', '「別放棄。」']
    },
    'ESTJ': {
        cooperate: ['「聽我指揮！」', '「各單位注意！」'],
        advise: ['「最有效率的方法是...」', '「我建議...」'],
        complain: ['「太沒效率了！」', '「誰准你這樣做的？」'],
        chat: ['「任務優先。」', '「等完成任務再說。」'],
        cheer: ['「很好，繼續！」', '「這才對嘛！」']
    },
    'INTJ': {
        cooperate: ['「配合我的策略。」', '「這是最佳方案。」'],
        advise: ['「根據我的分析...」', '「邏輯上來說...」'],
        complain: ['「愚蠢。」', '「這不合理。」'],
        chat: ['「...」', '「有事嗎？」'],
        cheer: ['「還行。」', '「不錯。」']
    },
    'ENFJ': {
        cooperate: ['「大家一起努力！」', '「團結就是力量！」'],
        advise: ['「我覺得你可以...」', '「試試看這樣？」'],
        complain: ['「這樣對團隊不好...」', '「請考慮一下其他人的感受。」'],
        chat: ['「你還好嗎？」', '「有什麼心事可以說。」'],
        cheer: ['「我以你為榮！」', '「你是最棒的！」']
    },
    'ISTP': {
        cooperate: ['「嗯，跟上。」', '「...」(點頭)'],
        advise: ['「這樣比較實際。」', '「試這個。」'],
        complain: ['「太囉嗦了。」', '「...」(皺眉)'],
        chat: ['「...」', '「我去偵查。」'],
        cheer: ['「...」(拍肩)', '「還行。」']
    },
    'ENTP': {
        cooperate: ['「來玩個遊戲！」', '「賭一把？」'],
        advise: ['「其實有個更有趣的方法...」', '「你有沒有想過反過來？」'],
        complain: ['「無聊～」', '「這太老套了。」'],
        chat: ['「欸，你說如果...」', '「來辯論一下！」'],
        cheer: ['「精彩！」', '「越來越有趣了！」']
    },
    'INFJ': {
        cooperate: ['「我感應到...我們應該...」', '「相信我。」'],
        advise: ['「我有預感...」', '「我察覺到...」'],
        complain: ['「這不對勁...」', '「我不舒服...」'],
        chat: ['「你在想什麼？」', '「你的過去...很沉重。」'],
        cheer: ['「你很堅強。」', '「我明白你。」']
    },
    'INTP': {
        cooperate: ['「理論上這樣可行。」', '「讓我算算...」'],
        advise: ['「從機率來看...」', '「有趣的問題是...」'],
        complain: ['「這毫無邏輯。」', '「數據不支持。」'],
        chat: ['「我在研究一個理論...」', '「你知道嗎...」'],
        cheer: ['「計算正確。」', '「假設成立。」']
    },
    'ENTJ': {
        cooperate: ['「執行我的命令！」', '「戰術部署：...」'],
        advise: ['「最優解是...」', '「聽我說。」'],
        complain: ['「無能！」', '「效率太低！」'],
        chat: ['「談談你的目標。」', '「野心呢？」'],
        cheer: ['「做得不錯。」', '「有前途。」']
    },
    'ESFP': {
        cooperate: ['「來吧，一起high！」', '「這會很精彩！」'],
        advise: ['「放輕鬆嘛～」', '「享受當下！」'],
        complain: ['「你太無趣了！」', '「笑一個嘛～」'],
        chat: ['「看我的表演！」', '「今晚的派對你來嗎？」'],
        cheer: ['「太棒了！」', '「就是這樣！」']
    },
    'ISFJ': {
        cooperate: ['「我來幫你...」', '「讓我來照顧這個。」'],
        advise: ['「也許我們應該小心點...」', '「我擔心...」'],
        complain: ['「這樣會傷害到別人...」', '「（默默不開心）」'],
        chat: ['「你吃飯了嗎？」', '「需要休息嗎？」'],
        cheer: ['「你辛苦了。」', '「我一直在支持你。」']
    },
    'ISFP': {
        cooperate: ['「...（默默跟上）」', '「我來。」'],
        advise: ['「...我覺得這樣不對。」', '「（用行動示範）」'],
        complain: ['「...（沉默離開）」', '「算了。」'],
        chat: ['「...這裡風景不錯。」', '「（安靜地待在旁邊）」'],
        cheer: ['「...（點頭）」', '「你做得很好。」']
    },
    'ENFP_CHAOTIC': { // Special variant for Pipi
        cooperate: ['「嘿嘿，一起來把這裡點著吧！」', '「看我的！」'],
        advise: ['「我覺得往那邊丟個火球應該很酷！」', '「別擔心，我『大概』知道怎麼做！」'],
        complain: ['「嗚...你怎麼這麼嚴肅啦！」', '「好無聊喔，我們去炸點什麼吧？」'],
        chat: ['「你有看過會飛的魚嗎？我剛剛好像變出了一隻！」', '「嘿嘿，你的斗篷上有個補丁，跟我的一樣耶！」'],
        cheer: ['「你超棒的！再炸一次！」', '「加油呀！你是最強的夥伴！」']
    }
};

// Get a random interaction phrase
export function getInteractionPhrase(mbti, type) {
    const styles = MBTI_INTERACTION_STYLES[mbti];
    if (!styles || !styles[type]) return '「...」';
    const phrases = styles[type];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// Calculate combat synergy bonus for a party
export function calculatePartySynergy(party) {
    if (!party || party.length < 2) return 0;

    let totalScore = 0;
    let pairs = 0;

    for (let i = 0; i < party.length; i++) {
        for (let j = i + 1; j < party.length; j++) {
            const mbti1 = party[i].mbti || CHARACTER_MBTI[party[i].id] || 'ISTJ';
            const mbti2 = party[j].mbti || CHARACTER_MBTI[party[j].id] || 'ISTJ';
            totalScore += getSynergyScore(mbti1, mbti2);
            pairs++;
        }
    }

    // Average synergy: 1-5, bonus: -2 to +2
    const avgSynergy = pairs > 0 ? totalScore / pairs : 3;
    return Math.round(avgSynergy - 3); // -2, -1, 0, +1, +2
}

export default {
    CHARACTER_MBTI,
    MBTI_SYNERGY,
    MBTI_INTERACTION_STYLES,
    getSynergyScore,
    getInteractionPhrase,
    calculatePartySynergy
};
