import React, { useState } from 'react';
import { X, Feather, Sparkles, RefreshCw, Wand2 } from 'lucide-react';

const CustomStoryModal = ({ isOpen, onClose, onGenerate, isGenerating }) => {
    const [prompt, setPrompt] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");

    if (!isOpen) return null;

    const handleSurprise = () => {
        const difficulties = ['beginner', 'intermediate', 'advanced'];
        const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];
        onGenerate("SURPRISE_ME", randomDiff);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-amber-500/30 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold font-tome-header text-amber-500 mb-2 flex items-center gap-2">
                    <Feather size={24} /> 自訂傳奇冒險
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                    輸入你的構想，AI 將為你編織一個獨一無二的冒險劇本。
                </p>

                {/* Input Area */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">冒險難度 (Difficulty)</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'beginner', label: '初階 (Lv 3)' },
                                { id: 'intermediate', label: '中階 (Lv 5)' },
                                { id: 'advanced', label: '高階 (Lv 8)' }
                            ].map(bf => (
                                <button
                                    key={bf.id}
                                    onClick={() => setDifficulty(bf.id)}
                                    className={`
                                        py-2 px-1 rounded border text-xs font-bold transition-all
                                        ${difficulty === bf.id
                                            ? 'bg-amber-900/60 border-amber-500 text-amber-100'
                                            : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500'}
                                    `}
                                >
                                    {bf.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                            冒險大綱 (Story Idea) <span className="text-slate-600 font-normal normal-case float-right">{prompt.length}/1000</span>
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value.slice(0, 1000))}
                            placeholder="例如：一座被發條地精控制的地下城，裡面藏著傳說中的時間寶石..."
                            className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder:text-slate-700 focus:border-amber-500 outline-none resize-none transition-colors"
                            disabled={isGenerating}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSurprise}
                        disabled={isGenerating}
                        className="flex-1 bg-indigo-900/50 hover:bg-indigo-800/50 border border-indigo-500/30 text-indigo-300 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group"
                    >
                        <Sparkles size={18} className="group-hover:text-indigo-100" />
                        給我驚喜 (Surprise Me)
                    </button>
                    <button
                        onClick={() => onGenerate(prompt, difficulty)}
                        disabled={isGenerating || !prompt.trim()}
                        className="flex-[2] bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw className="animate-spin" size={18} />
                                建構世界中...
                            </>
                        ) : (
                            <>
                                <Wand2 size={18} />
                                生成冒險劇本
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomStoryModal;
