import React from 'react';
import { ChevronRight, BookOpen, Sword, Clock, Zap, Feather, Shield, Skull, Heart, Scale, Sparkles, User } from 'lucide-react';

const GAME_MODES = {
    NOVEL: 'novel',
    TRPG: 'trpg'
};

const ModeSelectView = ({ setView, setGameMode, setGameOptions, gameMode, gameOptions, startGame }) => (
    <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 overflow-y-auto relative">
        <button
            onClick={() => setView('roster')}
            className="absolute top-8 left-8 text-slate-500 hover:text-slate-300 flex items-center gap-2 uppercase tracking-widest text-xs font-bold transition-colors z-50"
        >
            <ChevronRight className="rotate-180" size={14} /> 回上一頁 (BACK)
        </button>

        <header className="text-center mb-8 mt-12">
            <h2 className="text-4xl font-serif text-amber-500 mb-2 tracking-wide font-tome-header">冒險篇章設定</h2>
            <p className="text-slate-400 font-serif italic text-lg opacity-80">定義你冒險的節奏與靈魂</p>
        </header>

        {/* 1. Mode Selection Tabs */}
        <div className="flex justify-center gap-4 mb-10 w-full max-w-2xl">
            {[
                { id: GAME_MODES.NOVEL, label: '純小說模式 (Novel)', icon: <BookOpen size={20} />, desc: '沉浸敘事，無數值介面' },
                { id: GAME_MODES.TRPG, label: '戰術跑團模式 (TRPG)', icon: <Sword size={20} />, desc: '完整規則，戰術與擲骰' }
            ].map(mode => (
                <button
                    key={mode.id}
                    onClick={() => {
                        setGameMode(mode.id);
                        setGameOptions(prev => ({
                            ...prev,
                            tone: mode.id === GAME_MODES.NOVEL ? 'normal' : 'arbiter'
                        }));
                    }}
                    className={`flex-1 p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 text-center group relative overflow-hidden
                        ${gameMode === mode.id
                            ? 'bg-amber-900/40 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                            : 'bg-slate-900/40 border-slate-700 hover:bg-slate-800 hover:border-slate-500'
                        }`}
                >
                    <div className={`p-3 rounded-full transaction-colors ${gameMode === mode.id ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
                        {mode.icon}
                    </div>
                    <div>
                        <div className={`font-bold font-tome-header text-lg uppercase tracking-widest ${gameMode === mode.id ? 'text-amber-100' : 'text-slate-300'}`}>
                            {mode.label}
                        </div>
                        <div className={`text-xs mt-1 ${gameMode === mode.id ? 'text-amber-200' : 'text-slate-500'}`}>
                            {mode.desc}
                        </div>
                    </div>
                    {gameMode === mode.id && <div className="absolute inset-0 bg-amber-500/5 pointer-events-none animate-pulse" />}
                </button>
            ))}
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* 2. Pacing Selection (Shared) */}
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700 backdrop-blur-sm relative overflow-hidden group hover:border-slate-600 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Clock size={120} />
                </div>

                <h3 className="text-xl font-bold text-amber-500 mb-6 flex items-center gap-3 font-tome-header border-b border-slate-700/50 pb-3">
                    <Clock size={20} />
                    <span>劇情節奏 (PACING)</span>
                </h3>

                <div className="space-y-3 relative z-10">
                    {[
                        {
                            id: 'fast',
                            label: '緊湊快節奏 (FAST)',
                            icon: <Zap size={16} />,
                            desc: '專注於推進劇情。省略瑣碎的旅行過程，場景切換迅速，體驗高張力的冒險節奏。適合想快速體驗故事的玩家。'
                        },
                        {
                            id: 'slow',
                            label: '沉浸式體驗 (DETAILED)',
                            icon: <BookOpen size={16} />,
                            desc: '細水長流。包含豐富的環境描寫、深度的世界觀設定與細膩的角色內心戲。適合喜歡慢慢品味故事的讀者。'
                        }
                    ].map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setGameOptions(prev => ({ ...prev, pacing: opt.id }))}
                            className={`w-full text-left p-4 rounded-lg border transition-all flex gap-4 group/btn
                                ${gameOptions.pacing === opt.id
                                    ? 'bg-amber-950/40 border-amber-500/50 ring-1 ring-amber-500/20'
                                    : 'bg-slate-950/30 border-slate-800 hover:bg-slate-800 hover:border-slate-600'
                                }`}
                        >
                            <div className={`shrink-0 mt-1 ${gameOptions.pacing === opt.id ? 'text-amber-400' : 'text-slate-500 group-hover/btn:text-slate-300'}`}>
                                {opt.icon}
                            </div>
                            <div>
                                <div className={`font-bold font-tome-header text-sm mb-1 uppercase tracking-wider ${gameOptions.pacing === opt.id ? 'text-amber-100' : 'text-slate-300'}`}>
                                    {opt.label}
                                </div>
                                <div className="text-xs text-slate-400 leading-relaxed font-serif opacity-80">
                                    {opt.desc}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Style Selection (Conditional) */}
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700 backdrop-blur-sm relative overflow-hidden group hover:border-slate-600 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    {gameMode === GAME_MODES.NOVEL ? <Feather size={120} /> : <User size={120} />}
                </div>

                <h3 className="text-xl font-bold text-amber-500 mb-6 flex items-center gap-3 font-tome-header border-b border-slate-700/50 pb-3">
                    {gameMode === GAME_MODES.NOVEL ? <Feather size={20} /> : <User size={20} />}
                    <span>
                        {gameMode === GAME_MODES.NOVEL ? '敘事風格 (NARRATIVE)' : 'GM 風格 (DM STYLE)'}
                    </span>
                </h3>

                <div className="space-y-3 relative z-10">
                    {(gameMode === GAME_MODES.NOVEL ? [
                        {
                            id: 'relaxed',
                            label: '輕小說風格 (CASUAL)',
                            icon: <Sparkles size={16} />,
                            desc: '幽默、角色導向、樂觀正向。強調透過對話展現個性，充滿英雄時刻而非硬派寫實。如同熱血動漫般的冒險體驗。'
                        },
                        {
                            id: 'normal',
                            label: '正統奇幻 (CLASSIC)',
                            icon: <Shield size={16} />,
                            desc: '黃金標準。史詩般的格局，優美的文字，嚴肅但充滿驚奇。平衡了寫實與幻想，旨在講述一段傳奇史詩。'
                        },
                        {
                            id: 'grim',
                            label: '黑暗寫實 (GRIMDARK)',
                            icon: <Skull size={16} />,
                            desc: '壓抑、危險且現實。勝利往往伴隨著代價，魔法令人畏懼，世界古老而無情。生存並非理所當然。'
                        }
                    ] : [
                        {
                            id: 'guide',
                            label: '慈愛導師 (GUIDE)',
                            icon: <Heart size={16} />,
                            desc: '偏重劇情體驗。GM 會適時提供引導與提示，在關鍵時刻可能會稍微放水，確保隊伍能順利體驗完整故事。'
                        },
                        {
                            id: 'arbiter',
                            label: '公正裁判 (ARBITER)',
                            icon: <Scale size={16} />,
                            desc: '嚴格執行 D&D 5e 規則。骰子決定一切，不做額外干涉。中立客觀，挑戰適中，考驗玩家的戰術與決策。'
                        },
                        {
                            id: 'ruthless',
                            label: '冷酷無情 (RUTHLESS)',
                            icon: <Skull size={16} />,
                            desc: '極限挑戰。敵人極具戰術智慧，會補刀與夾擊。世界充滿惡意，死亡是常態。適合尋求魂系難度的玩家。'
                        }
                    ]).map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setGameOptions(prev => ({ ...prev, tone: opt.id }))}
                            className={`w-full text-left p-4 rounded-lg border transition-all flex gap-4 group/btn
                                ${gameOptions.tone === opt.id
                                    ? 'bg-indigo-950/40 border-indigo-400/50 ring-1 ring-indigo-500/20'
                                    : 'bg-slate-950/30 border-slate-800 hover:bg-slate-800 hover:border-slate-600'
                                }`}
                        >
                            <div className={`shrink-0 mt-1 ${gameOptions.tone === opt.id ? 'text-indigo-400' : 'text-slate-500 group-hover/btn:text-slate-300'}`}>
                                {opt.icon}
                            </div>
                            <div>
                                <div className={`font-bold font-tome-header text-sm mb-1 uppercase tracking-wider ${gameOptions.tone === opt.id ? 'text-indigo-100' : 'text-slate-300'}`}>
                                    {opt.label}
                                </div>
                                <div className="text-xs text-slate-400 leading-relaxed font-serif opacity-80">
                                    {opt.desc}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="w-full border-t border-slate-800 mb-10 flex items-center justify-center">
            <span className="bg-[#0f172a] px-4 text-slate-500 text-xs font-bold uppercase tracking-widest -mt-2">READY TO START</span>
        </div>

        <div className="w-full max-w-md mx-auto">
            <button
                onClick={startGame}
                className="w-full group relative p-6 rounded-xl border border-slate-700 hover:border-amber-500/50 bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-500 hover:to-red-600 transition-all text-center overflow-hidden shadow-xl"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <h3 className="text-2xl font-bold font-tome-header text-white mb-1 flex items-center justify-center gap-3">
                    <Sword size={24} /> 開始冒險 (START ADVENTURE)
                </h3>
                <p className="text-amber-100/80 text-sm font-serif">
                    {gameMode === GAME_MODES.NOVEL ? '以純小說模式開始旅程' : '以戰術跑團模式開始旅程'}
                </p>
            </button>
        </div>
    </div>
);

export default ModeSelectView;
