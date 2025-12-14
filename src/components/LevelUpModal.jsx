import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Zap, BookOpen, Crown, ChevronRight, Check, Brain, Loader2, ArrowRight } from 'lucide-react';
import { FEATS_DATA } from '../libs/GameData';

export default function LevelUpModal({ isOpen, character, narrativeHistory, agent, onConfirm, onClose }) {
    const [mode, setMode] = useState('ai'); // 'ai' or 'manual'
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [aiPlan, setAiPlan] = useState(null);

    // Manual States
    const [choiceType, setChoiceType] = useState(null); // 'asi' or 'feat'
    const [selectedFeat, setSelectedFeat] = useState(null);
    const [selectedStats, setSelectedStats] = useState({});

    // Reset state on open
    useEffect(() => {
        if (isOpen && character) {
            setMode('ai');
            analyzeProgression();
        }
    }, [isOpen, character]);

    const analyzeProgression = async () => {
        if (!agent) {
            setMode('manual');
            setIsAnalyzing(false);
            return;
        }

        setIsAnalyzing(true);
        try {
            // Simulate delay for effect + API call
            const plan = await agent.planLevelUp(character, narrativeHistory || []);
            setAiPlan(plan);
        } catch (e) {
            console.error("AI Planning Failed", e);
            setMode('manual'); // Fallback
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (!isOpen || !character) return null;

    const nextLevel = character.level + 1;
    const isAbilityTier = [4, 8, 12, 16, 19].includes(nextLevel);

    // --- Render: Loading ---
    if (mode === 'ai' && isAnalyzing) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in">
                <div className="text-center">
                    <Loader2 size={64} className="text-amber-500 animate-spin mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Consulting the Dungeon Master...</h2>
                    <p className="text-slate-400">Analyzing {character.name}'s journey to determine their path.</p>
                </div>
            </div>
        );
    }

    // --- Render: AI Proposal ---
    if (mode === 'ai' && aiPlan) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in">
                <div className="bg-slate-900 border border-amber-500/50 rounded-xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                        <Brain size={200} />
                    </div>

                    <div className="text-center mb-6 relative z-10">
                        <Crown size={48} className="text-amber-500 mx-auto mb-2" />
                        <h2 className="text-2xl font-bold text-white">Path of Destiny Revealed</h2>
                        <p className="text-slate-400">Level {character.level} <ArrowRight className="inline mx-1" size={14} /> {nextLevel}</p>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {/* Class Change Proposal */}
                        <div className="bg-slate-800/80 p-4 rounded border-l-4 border-amber-500">
                            <h3 className="text-slate-300 font-bold text-sm uppercase mb-1">Class Progression</h3>
                            <p className="text-xl font-bold text-white">{aiPlan.class}</p>
                            {aiPlan.class !== character.class && (
                                <p className="text-sm text-yellow-400 mt-1 italic">
                                    Multiclass / Shift: {aiPlan.multiclass_reason}
                                </p>
                            )}
                        </div>

                        {/* Feature/ASI Proposal */}
                        {isAbilityTier && (
                            <div className="bg-slate-800/80 p-4 rounded border-l-4 border-cyan-500">
                                <h3 className="text-slate-300 font-bold text-sm uppercase mb-1">New Capability</h3>
                                <div className="flex items-center gap-2">
                                    {aiPlan.type === 'feat' ? <Sparkles className="text-cyan-400" size={20} /> : <Zap className="text-cyan-400" size={20} />}
                                    <span className="text-lg font-bold text-white">
                                        {aiPlan.type === 'feat' ? `Feat: ${aiPlan.value}` : `Stats: ${JSON.stringify(aiPlan.value).replace(/["{}]/g, '').replace(':', ' +')}`}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 mt-2 italic">"{aiPlan.reason}"</p>
                            </div>
                        )}

                        {/* Standard HP Gain */}
                        <div className="bg-slate-800/80 p-3 rounded flex justify-between items-center opacity-75">
                            <span className="text-slate-400 text-sm">HP Increase</span>
                            <span className="text-emerald-400 font-bold">+ {5 + Math.floor(((character.baseStats.con || 10) - 10) / 2)}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8 relative z-10">
                        <button
                            onClick={() => setMode('manual')}
                            className="flex-1 py-3 border border-slate-600 hover:bg-slate-800 text-slate-300 rounded transition"
                        >
                            Override (Manual)
                        </button>
                        <button
                            onClick={() => onConfirm(aiPlan)}
                            className="flex-[2] py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded shadow-lg shadow-amber-900/20 transition flex justify-center items-center gap-2"
                        >
                            <Check /> Accept Destiny
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Render: Manual Mode (Original) ---

    // Check tiers again for Manual Mode
    if (!isAbilityTier) {
        // Simple manual generic
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                <div className="bg-slate-900 border border-amber-500/50 rounded-xl shadow-2xl max-w-md w-full p-6 text-center">
                    <Crown size={48} className="text-amber-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-amber-500 mb-2">Level Up!</h2>
                    <p className="text-slate-300 mb-6">Level {nextLevel}</p>
                    <p className="text-emerald-400 font-bold mb-4">+ {5 + Math.floor(((character.baseStats.con || 10) - 10) / 2)} HP</p>
                    <button onClick={() => onConfirm(null)} className="w-full py-3 bg-amber-600 text-white font-bold rounded">Continue</button>
                </div>
            </div>
        );
    }

    // Manual Selection Helpers
    const handleStatToggle = (stat) => {
        if (Object.keys(selectedStats).length === 0) { setSelectedStats({ [stat]: 1 }); return; }
        if (selectedStats[stat]) { const n = { ...selectedStats }; delete n[stat]; setSelectedStats(n); return; }
        const k = Object.keys(selectedStats);
        if (k.length === 1 && selectedStats[k[0]] === 1) { setSelectedStats({ ...selectedStats, [stat]: 1 }); return; }
        if (k.length === 1 && k[0] === stat && selectedStats[stat] === 1) { setSelectedStats({ [stat]: 2 }); return; }
    };

    const confirmEnabled = () => {
        if (choiceType === 'feat') return !!selectedFeat;
        if (choiceType === 'asi') {
            const total = Object.values(selectedStats).reduce((a, b) => a + b, 0);
            return total === 2;
        }
        return false;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-amber-500/50 rounded-xl shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-slate-950 flex justify-between items-center shrink-0">
                    <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-3"><Crown size={24} /> Manual Level Up (Lvl {nextLevel})</h2>
                    <button onClick={() => setMode('ai')} className="text-xs text-amber-500 underline">Switch to AI Plan</button>
                </div>
                <div className="flex-1 overflow-hidden flex divide-x divide-white/10">
                    <div className="w-1/3 p-6 space-y-4 bg-slate-900 overflow-y-auto">
                        <button onClick={() => { setChoiceType('asi'); setSelectedFeat(null); }} className={`w-full p-4 rounded-lg border-2 text-left ${choiceType === 'asi' ? 'border-amber-500 bg-amber-900/20' : 'border-slate-700'}`}>
                            <div className="flex items-center gap-3 mb-2"><Zap size={20} /> <span className="font-bold">ASI</span></div>
                        </button>
                        <button onClick={() => { setChoiceType('feat'); setSelectedStats({}); }} className={`w-full p-4 rounded-lg border-2 text-left ${choiceType === 'feat' ? 'border-amber-500 bg-amber-900/20' : 'border-slate-700'}`}>
                            <div className="flex items-center gap-3 mb-2"><Sparkles size={20} /> <span className="font-bold">Feat</span></div>
                        </button>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto bg-slate-950/50">
                        {choiceType === 'asi' && (
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(character.baseStats).map(([stat, val]) => {
                                    const bonus = selectedStats[stat] || 0;
                                    return (
                                        <div key={stat} onClick={() => handleStatToggle(stat)} className={`p-4 rounded border cursor-pointer ${bonus > 0 ? 'bg-amber-900/30 border-amber-500' : 'bg-slate-800 border-slate-700'}`}>
                                            <span className="uppercase font-bold text-slate-300">{stat} {val + bonus} {bonus > 0 && `(+${bonus})`}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {choiceType === 'feat' && (
                            <div className="space-y-3">
                                {FEATS_DATA.map(feat => (
                                    <button key={feat.id} onClick={() => !character.feats.includes(feat.id) && setSelectedFeat(feat.id)} disabled={character.feats.includes(feat.id)} className={`w-full p-4 rounded border text-left ${selectedFeat === feat.id ? 'bg-amber-900/30 border-amber-500' : 'bg-slate-800 border-slate-700'}`}>
                                        <div className="font-bold">{feat.name}</div>
                                        <div className="text-sm text-slate-400">{feat.description}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-6 border-t border-white/10 bg-slate-950 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-slate-400">Cancel</button>
                    <button onClick={() => onConfirm(choiceType === 'feat' ? { type: 'feat', value: selectedFeat } : { type: 'asi', value: selectedStats })} disabled={!confirmEnabled()} className="px-6 py-2 bg-amber-600 text-white font-bold rounded shadow-lg disabled:opacity-50">Confirm</button>
                </div>
            </div>
        </div>
    );
}
