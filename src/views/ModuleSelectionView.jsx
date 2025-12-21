import React from 'react';
import { Map as MapIcon, ChevronRight, Plus, Sword, Skull, Feather } from 'lucide-react';

const ModuleSelectionView = ({
    setView,
    customModules,
    setShowCustomStoryModal,
    setSelectedModule,
    setLevel,
    modules: MODULES // Pass as prop or import, but injecting as prop is cleaner for extraction
}) => {
    const categories = [
        { id: 'beginner', title: "初階任務 (Beginner)", subtitle: "適合新手，開啟你的傳奇", startLevel: 3, color: "text-emerald-400", border: "border-emerald-500/30" },
        { id: 'intermediate', title: "中階任務 (Intermediate)", subtitle: "更致命的挑戰，更複雜的劇情", startLevel: 5, color: "text-amber-400", border: "border-amber-500/30" },
        { id: 'advanced', title: "高階任務 (Advanced)", subtitle: "傳奇英雄的試煉，死亡如影隨形", startLevel: 8, color: "text-red-400", border: "border-red-500/30" },
        { id: 'custom', title: "自訂傳奇 (Custom)", subtitle: "由你與 AI 共同編織的獨特世界", startLevel: 3, color: "text-indigo-400", border: "border-indigo-500/30" }
    ];

    return (
        <div className="h-full flex flex-col p-4 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <MapIcon size={400} />
            </div>

            <div className="mb-8 shrink-0 relative z-10">
                <button
                    onClick={() => setView('home')}
                    className="text-slate-500 hover:text-slate-300 flex items-center gap-2 mb-6 uppercase tracking-widest text-xs font-bold transition-colors"
                >
                    <ChevronRight className="rotate-180" size={14} /> 回上一頁 (BACK)
                </button>
                <h2 className="text-4xl font-serif text-amber-500 mb-2 tracking-tight">選擇你的冒險</h2>
                <p className="text-slate-400">每一個模組都是通往混亂與榮耀的傳送門。</p>
            </div>

            <div className="overflow-y-auto pb-24 pr-2 relative z-10 space-y-12">
                {categories.map(cat => {
                    const catModules = [...MODULES, ...customModules].filter(m => m.category === cat.id);

                    if (catModules.length === 0 && cat.id !== 'custom') return null;

                    return (
                        <div key={cat.id}>
                            <div className="flex items-end gap-4 mb-6 border-b border-slate-800 pb-2">
                                <h3 className={`text-2xl font-serif font-bold ${cat.color} flex items-center gap-3`}>
                                    {cat.title}
                                </h3>
                                <span className="text-slate-500 text-sm font-mono mb-1">
                                    初始等級: <span className="text-white font-bold">Lv.{cat.startLevel}</span>
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cat.id === 'custom' && (
                                    <div
                                        onClick={() => setShowCustomStoryModal(true)}
                                        className={`
                                            relative bg-indigo-900/20 backdrop-blur-sm border border-dashed border-indigo-500/50
                                            hover:bg-indigo-900/40 p-6 rounded-xl cursor-pointer
                                            transition-all group duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)]
                                            flex flex-col items-center justify-center text-center gap-4 min-h-[200px]
                                        `}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                                            <Plus size={32} className="text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-indigo-300 font-serif mb-1">創造新冒險</h3>
                                            <p className="text-slate-500 text-sm">Create Custom Adventure</p>
                                        </div>
                                    </div>
                                )}

                                {catModules.map(mod => (
                                    <div
                                        key={mod.id}
                                        onClick={() => {
                                            setSelectedModule(mod);
                                            setLevel(mod.startLevel || 3);
                                            setView('roster');
                                        }}
                                        className={`
                                            relative bg-slate-900/40 backdrop-blur-sm border ${cat.border}
                                            hover:bg-slate-800/60 p-6 rounded-xl cursor-pointer
                                            transition-all group duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                                        `}
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-12 h-12 shrink-0 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:border-opacity-100 transition-colors`}>
                                                {cat.id === 'beginner' && <MapIcon className={`text-slate-500 group-hover:${cat.color}`} size={24} />}
                                                {cat.id === 'intermediate' && <Sword className={`text-slate-500 group-hover:${cat.color}`} size={24} />}
                                                {cat.id === 'advanced' && <Skull className={`text-slate-500 group-hover:${cat.color}`} size={24} />}
                                                {cat.id === 'custom' && <Feather className={`text-slate-500 group-hover:${cat.color}`} size={24} />}
                                            </div>
                                            <h3 className={`flex-1 text-xl font-bold text-slate-200 group-hover:${cat.color} font-serif leading-tight mt-1`}>
                                                {mod.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-3 group-hover:border-opacity-50 transition-colors line-clamp-3">
                                            {mod.desc}
                                        </p>

                                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <ChevronRight className={cat.color} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ModuleSelectionView;
