import React, { useState, useEffect } from 'react';
import { X, Clock, Skull, Zap, BookOpen, Coffee, Sword } from 'lucide-react';

export function ModuleDetailsModal({ module, onClose, onStartGame }) {
    if (!module) return null;

    // Default State
    const [startLevel, setStartLevel] = useState(module.levels[0]);
    const [pacing, setPacing] = useState('fast'); // fast | slow
    const [tone, setTone] = useState('normal'); // relaxed | normal | grim

    // Reset when module changes
    useEffect(() => {
        setStartLevel(module.levels[0]);
        setPacing('fast');
        setTone('normal');
    }, [module]);

    const handleStart = () => {
        onStartGame(module, {
            startLevel,
            pacing,
            tone
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full flex flex-col max-h-[90vh] shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-gray-900">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                            {module.title}
                        </h2>
                        <div className="flex gap-2 flex-wrap">
                            {module.features.map((tag, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 text-xs border border-gray-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">

                    {/* Description */}
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {module.desc}
                        </p>
                        <div className="mt-3 pt-3 border-t border-gray-700/50">
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">劇本核心</h4>
                            <p className="text-gray-400 text-xs whitespace-pre-line">{module.plot}</p>
                        </div>
                    </div>

                    {/* Settings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* 1. Level Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Sword size={16} /> 起始等級
                            </label>
                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-2xl font-bold text-amber-500">Lv. {startLevel}</span>
                                    <span className="text-xs text-gray-500">建議範圍: {module.levels[0]} - {module.levels[1]}</span>
                                </div>
                                <input
                                    type="range"
                                    min={module.levels[0]}
                                    max={module.levels[1]}
                                    value={startLevel}
                                    onChange={(e) => setStartLevel(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                            </div>
                        </div>

                        {/* 2. Pacing Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Clock size={16} /> 故事節奏
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setPacing('fast')}
                                    className={`p-3 rounded-lg border text-left transition-all ${pacing === 'fast'
                                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                                        : 'bg-gray-800 border-gray-700 text-gray-500 hover:bg-gray-700'
                                        }`}
                                >
                                    <div className="font-bold text-sm mb-1 flex items-center gap-2"><Zap size={14} /> 緊湊</div>
                                    <div className="text-[10px] opacity-80">專注戰鬥與推進，略過瑣碎對話。</div>
                                </button>
                                <button
                                    onClick={() => setPacing('slow')}
                                    className={`p-3 rounded-lg border text-left transition-all ${pacing === 'slow'
                                        ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                                        : 'bg-gray-800 border-gray-700 text-gray-500 hover:bg-gray-700'
                                        }`}
                                >
                                    <div className="font-bold text-sm mb-1 flex items-center gap-2"><BookOpen size={14} /> 深度長篇</div>
                                    <div className="text-[10px] opacity-80">劇情長度約 1.5 倍。增加更多波折、支線與隨機遭遇。</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3. Tone Selection (Full Width) */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <BookOpen size={16} /> 敘事風格
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* Relaxed */}
                            <button
                                onClick={() => setTone('relaxed')}
                                className={`p-3 rounded-lg border text-left transition-all ${tone === 'relaxed'
                                    ? 'bg-green-500/20 border-green-500 text-green-200'
                                    : 'bg-gray-800 border-gray-700 text-gray-500 hover:bg-gray-700'
                                    }`}
                            >
                                <div className="font-bold text-sm mb-1 flex items-center gap-2"><Coffee size={14} /> 悠閒冒險</div>
                                <div className="text-[10px] opacity-80">日系輕小說風格。輕鬆有趣，隊友間會有搞笑互動。</div>
                            </button>

                            {/* Normal */}
                            <button
                                onClick={() => setTone('normal')}
                                className={`p-3 rounded-lg border text-left transition-all ${tone === 'normal'
                                    ? 'bg-blue-500/20 border-blue-500 text-blue-200'
                                    : 'bg-gray-800 border-gray-700 text-gray-500 hover:bg-gray-700'
                                    }`}
                            >
                                <div className="font-bold text-sm mb-1 flex items-center gap-2"><Sword size={14} /> 正統史詩</div>
                                <div className="text-[10px] opacity-80">R.A. 薩爾瓦多風格。嚴謹奇幻，英雄式的冒險旅程。</div>
                            </button>

                            {/* Grim */}
                            <button
                                onClick={() => setTone('grim')}
                                className={`p-3 rounded-lg border text-left transition-all ${tone === 'grim'
                                    ? 'bg-red-500/20 border-red-500 text-red-200'
                                    : 'bg-gray-800 border-gray-700 text-gray-500 hover:bg-gray-700'
                                    }`}
                            >
                                <div className="font-bold text-sm mb-1 flex items-center gap-2"><Skull size={14} /> 黑暗絕望</div>
                                <div className="text-[10px] opacity-80">克蘇魯/魂系風格。充滿危機感與恐怖氛圍，生存不易。</div>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800 bg-gray-900 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        取消
                    </button>
                    <button
                        onClick={handleStart}
                        className="px-8 py-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all"
                    >
                        <Sword size={20} />
                        開始冒險
                    </button>
                </div>
            </div>
        </div>
    );
}
