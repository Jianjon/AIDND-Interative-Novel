import React, { useState } from 'react';
import { X, Sword, Shield, Map as MapIcon, Ghost, Heart, Star, BookOpen, Scroll, Skull, Package, Sparkles, Settings, Save } from 'lucide-react';

/**
 * CharacterModal.jsx
 * 
 * Displays the full details of a character using the new Hybrid Agent architecture.
 * Shows strict derived stats (AC, DC) alongside narrative fluff.
 */
export default function CharacterModal({ character, onClose, onGeneratePortrait, onLevelUp, onUpdatePortrait, onUpdateCharacter, isGenerating }) {
    if (!character) return null;

    const [activeTab, setActiveTab] = useState('stats'); // stats, inventory, backstory
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isRefining, setIsRefining] = useState(false);

    // Use the new getFullSheet() if available, otherwise fallback
    const data = character.getFullSheet ? character.getFullSheet() : character;

    // Safe accessors for derived stats (using optional chaining for legacy fallback)
    const derived = data.derived || {};
    // Fix: Fallback to baseStats if stats is undefined (handling raw preset objects)
    const stats = data.stats || data.baseStats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const mods = data.modifiers || {};

    const getModString = (val) => {
        const m = Math.floor((val - 10) / 2);
        return m >= 0 ? `+${m}` : `${m}`;
    };

    // AI Refinement Handler
    const handleAiRefine = async (field) => {
        if (!character?.id) return;
        if (!process.env.VITE_GOOGLE_AI_KEY && !localStorage.getItem('gemini_api_key')) {
            alert('No API Key found');
            return;
        }

        // Check limits
        const currentRefines = character.aiRefineCount || 0;
        if (currentRefines >= 2) {
            alert("AI Refinement limit reached (Max 2 times per character).");
            return;
        }

        setIsRefining(true);
        try {
            const key = process.env.VITE_GOOGLE_AI_KEY || localStorage.getItem('gemini_api_key');
            // Simple direct call for now
            const prompt = `
            Context: D&D Character Creation.
            Refine the following ${field} text for a ${data.race} ${data.class} named ${data.name}.
            Make it more immersive, thematic, and consistent with D&D lore.
            Keep it under 100 words.
            Input Text: "${editData[field] || data[field] || ''}"
            Output (Traditional Chinese):
            `;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${key}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                }
            );
            const resJson = await response.json();
            const refinedText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;

            if (refinedText) {
                setEditData(prev => ({ ...prev, [field]: refinedText }));
                // Update limit tracking in local 'data' (and eventually persist)
                // Ideally we call onUpdateCharacter to increment distinct from editData
                if (onUpdateCharacter) {
                    onUpdateCharacter({
                        ...character,
                        aiRefineCount: (character.aiRefineCount || 0) + 1
                    });
                }
            }
        } catch (e) {
            console.error("Refine failed", e);
            alert("Refine failed");
        } finally {
            setIsRefining(false);
        }
    };

    const handleSave = () => {
        if (onUpdateCharacter) {
            // Pass back updated fields + potentially incremented refine count if we tracked it
            onUpdateCharacter({
                ...character,
                ...editData,
                // Note: refine count tracking needs to be handled carefully, maybe just increment on successful generate
            });
        }
        setIsEditing(false);
    };

    // Lightbox state
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Helper to check if avatar is AI generated (starts with data:image)
    const isGenerated = data.avatar && data.avatar.startsWith('data:');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">

            {/* Lightbox Overlay */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-8 cursor-zoom-out animate-in zoom-in-50 duration-200"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <img
                        src={data.avatar}
                        alt={data.name}
                        className="max-h-full max-w-full object-contain drop-shadow-2xl rounded-md"
                    />
                </div>
            )}

            <div className="bg-slate-900 border border-amber-900/50 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-slate-950/50 hover:bg-rose-900/80 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Left Column: Avatar & Core Identity */}
                <div className="w-full md:w-1/3 bg-slate-950 p-6 flex flex-col items-center border-r border-slate-800 overflow-y-auto">
                    <div className="relative group w-48 h-48 mb-6">
                        <img
                            src={data.avatar}
                            alt={data.name}
                            onClick={() => setIsLightboxOpen(true)}
                            className="w-full h-full object-cover rounded-full border-4 border-amber-900/30 shadow-lg group-hover:border-amber-500/50 transition-colors cursor-zoom-in hover:brightness-110"
                        />
                        {!character.id.startsWith('preset_') && (
                            <button
                                onClick={() => {
                                    const count = character.portraitGenCount || 0;
                                    if (count >= 3) {
                                        alert("Portrait generation limit reached (Max 3).");
                                        return;
                                    }
                                    const confirmGen = window.confirm(`Generate new AI portrait? (${3 - count} remaining)`);
                                    if (confirmGen) {
                                        onGeneratePortrait(character);
                                        // The count update should happen in parent, but we can optimistically expect it
                                    }
                                }}
                                disabled={isGenerating || (character.portraitGenCount || 0) >= 3}
                                className={`
                                        absolute bottom-2 right-2 p-2 rounded-full border shadow-lg transition-all z-20
                                        ${(character.portraitGenCount || 0) >= 3
                                        ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
                                        : 'bg-slate-900/80 text-amber-500 border-amber-500/50 hover:bg-amber-500 hover:text-slate-900'}
                                    `}
                                title={
                                    (character.portraitGenCount || 0) >= 3
                                        ? "Limit Reached"
                                        : `Generate AI Portrait (${3 - (character.portraitGenCount || 0)} left)`
                                }
                            >
                                {isGenerating ? (
                                    <div className="animate-spin h-4 w-4 border-2 border-amber-500 rounded-full border-t-transparent" />
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <Ghost size={16} />
                                        <span className="text-[10px] font-bold">{3 - (character.portraitGenCount || 0)}</span>
                                    </div>
                                )}
                            </button>
                        )}
                    </div>

                    <h2 className="text-2xl font-serif text-amber-500 font-bold text-center mb-1">{data.name}</h2>
                    <p className="text-slate-400 text-sm">{data.race} {data.class}</p>

                    {/* Level, Alignment, Background */}
                    <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
                        <span className="px-2 py-0.5 bg-amber-900/50 text-amber-400 text-xs rounded-full border border-amber-700/50 font-bold">
                            Lv.{data.level || character.level || 3}
                        </span>
                        {data.alignment && (
                            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">
                                {data.alignment}
                            </span>
                        )}
                    </div>
                    {data.background && (
                        <p className="text-slate-500 text-xs text-center mb-4">
                            背景: <span className="text-slate-400">{data.background}</span>
                        </p>
                    )}

                    {/* Vitals (Simplified) */}
                    <div className="w-full space-y-3 mb-6">
                        <div className="bg-slate-900/50 p-3 rounded border border-slate-800 flex flex-col justify-center gap-1">
                            <div className="flex justify-between w-full text-xs uppercase tracking-widest text-slate-500 mb-1">
                                <span>Health Status</span>
                                <span className={data.hp < data.maxHp * 0.3 ? "text-red-500 animate-pulse font-bold" : "text-green-500 font-bold"}>
                                    <span className="mr-2 text-slate-400 font-mono">({data.hp}/{data.maxHp})</span>
                                    {data.hp <= 0 ? "Unconscious" :
                                        data.hp < data.maxHp * 0.3 ? "Critical" :
                                            data.hp < data.maxHp * 0.6 ? "Wounded" : "Healthy"}
                                </span>
                            </div>
                            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                <div
                                    className={`h-full transition-all duration-500 ${data.hp < data.maxHp * 0.3 ? 'bg-red-600' :
                                        data.hp < data.maxHp * 0.6 ? 'bg-amber-500' : 'bg-green-500'
                                        }`}
                                    style={{ width: `${Math.min(100, Math.max(0, (data.hp / data.maxHp) * 100))}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Combat Stats (Strict) */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="bg-slate-900 p-2 rounded text-center border border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">AC</div>
                            <div className="text-lg font-bold text-slate-200">{character.ac || "10"}</div>
                        </div>
                        <div className="bg-slate-900 p-2 rounded text-center border border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">Init</div>
                            <div className="text-lg font-bold text-slate-200">{getModString(10 + (derived.initiative || 0)).replace('10', '')}</div>
                        </div>
                        <div className="bg-slate-900 p-2 rounded text-center border border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">Prof</div>
                            <div className="text-lg font-bold text-slate-200">+{derived.proficiency || 2}</div>
                        </div>
                        <div className="bg-slate-900 p-2 rounded text-center border border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">DC</div>
                            <div className="text-lg font-bold text-slate-200">{derived.spellDC || "-"}</div>
                        </div>
                    </div>
                </div >

                {/* Right Column: Details Tabs */}
                < div className="w-full md:w-2/3 flex flex-col bg-slate-900/95" >
                    {/* Tabs */}
                    < div className="flex border-b border-slate-800 bg-slate-950/50" >
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`flex-1 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'stats' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Attributes
                        </button>

                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`flex-1 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'inventory' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Inventory
                        </button>
                        <button
                            onClick={() => setActiveTab('backstory')}
                            className={`flex-1 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'backstory' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Story & Roleplay
                        </button>
                    </div >

                    {/* Content Area */}
                    < div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" >

                        {activeTab === 'stats' && (
                            <div className="space-y-6">
                                {/* Base Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(stats).map(([key, val]) => (
                                        <div key={key} className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col items-center">
                                            <span className="text-xs text-slate-500 uppercase font-bold">{key}</span>
                                            <span className="text-2xl font-serif text-slate-200">{val}</span>
                                            <span className="text-xs text-amber-600 font-mono">{getModString(val)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Skills & Feats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">Primary Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map(s => (
                                                <span key={s} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">
                                                    {s}
                                                </span>
                                            ))}
                                            {data.skills.length === 0 && <span className="text-slate-600 text-xs italic">No trained skills</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">Feats & Features</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[...(data.feats || []), ...(data.features || [])].map((f, i) => (
                                                <span key={i} className="px-2 py-1 bg-indigo-950/50 rounded text-xs text-indigo-300 border border-indigo-900/50">
                                                    {f}
                                                </span>
                                            ))}
                                            {(data.feats || []).length === 0 && <span className="text-slate-600 text-xs italic">No feats</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        }



                        {
                            activeTab === 'inventory' && (
                                <div className="space-y-6">
                                    {/* Gold Display */}
                                    {(data.inventory?.gold !== undefined || data.gold !== undefined) && (
                                        <div className="flex items-center gap-2 p-3 bg-amber-950/30 rounded-lg border border-amber-900/30">
                                            <span className="text-xl">🪙</span>
                                            <div>
                                                <div className="text-xs text-amber-600 uppercase font-bold">金幣</div>
                                                <div className="text-lg font-bold text-amber-400">{data.inventory?.gold ?? data.gold ?? 0} gp</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Full Inventory */}
                                    <div>
                                        <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1 flex items-center gap-2">
                                            <Package size={14} /> 背包
                                        </h4>
                                        <div className="space-y-4">
                                            {/* Helper to render list or empty */}
                                            {(Array.isArray(data.inventory) ?
                                                // Handle Legacy/Fallback Array
                                                <ul className="text-sm text-slate-300 space-y-1">
                                                    {data.inventory.map((item, i) => (
                                                        <li key={i} className="flex items-center gap-2 py-1 border-b border-slate-800/50 last:border-0">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                                            {typeof item === 'string' ? item : item.name}
                                                        </li>
                                                    ))}
                                                    {data.inventory.length === 0 && <span className="text-slate-600 text-xs italic">Empty</span>}
                                                </ul>
                                                :
                                                // Handle New Schema (Object)
                                                <>
                                                    {/* Equipment */}
                                                    <div>
                                                        <h5 className="text-xs text-slate-500 uppercase font-bold mb-1">⚔️ 裝備</h5>
                                                        <ul className="text-sm text-slate-300 space-y-1">
                                                            {data.inventory.equipment && data.inventory.equipment.length > 0 ? (
                                                                data.inventory.equipment.map((item, i) => (
                                                                    <li key={`eq-${i}`} className="flex items-center gap-2 py-1 border-b border-slate-800/50">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                                                        {typeof item === 'string' ? item : item.name}
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                <span className="text-slate-600 text-xs italic">無</span>
                                                            )}
                                                        </ul>
                                                    </div>

                                                    {/* Consumables */}
                                                    <div>
                                                        <h5 className="text-xs text-amber-500 uppercase font-bold mb-1 mt-2">🧪 消耗品</h5>
                                                        <ul className="text-sm text-slate-300 space-y-1">
                                                            {data.inventory.consumables && data.inventory.consumables.length > 0 ? (
                                                                data.inventory.consumables.map((item, i) => (
                                                                    <li key={`con-${i}`} className="flex items-center gap-2 py-1 border-b border-slate-800/50">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                                                        {typeof item === 'string' ? item : item.name}
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                <span className="text-slate-600 text-xs italic">無</span>
                                                            )}
                                                        </ul>
                                                    </div>

                                                    {/* Magic Items */}
                                                    <div>
                                                        <h5 className="text-xs text-purple-400 uppercase font-bold mb-1 mt-2">✨ 魔法物品</h5>
                                                        <ul className="text-sm text-slate-300 space-y-1">
                                                            {data.inventory.magicItems && data.inventory.magicItems.length > 0 ? (
                                                                data.inventory.magicItems.map((item, i) => (
                                                                    <li key={`mag-${i}`} className="flex items-center gap-2 py-1 border-b border-slate-800/50">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                                                        {typeof item === 'string' ? item : item.name}
                                                                    </li>
                                                                ))
                                                            ) : (
                                                                <span className="text-slate-600 text-xs italic">無</span>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'backstory' && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-green-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">Personality</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed italic">"{data.personality}"</p>
                                    </div>

                                    <div>
                                        <h4 className="text-purple-400 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">Secrets & Inner Monologue</h4>
                                        <p className="text-purple-300/80 text-sm leading-relaxed italic font-serif">
                                            "{data.monologue || "No inner thoughts revealed..."}"
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-green-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">Background Story</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                                            {data.bio || data.backstory || data.background || "No backstory recorded."}
                                        </p>
                                    </div>



                                    <div>
                                        <h4 className="text-green-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">Secrets & Inner Monologue</h4>
                                        <p className="text-slate-500 text-sm italic">
                                            {data.monologue}
                                        </p>
                                    </div>

                                    {/* Companion Section */}
                                    {data.companion && (
                                        <div>
                                            <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1 flex items-center gap-2">
                                                🐾 Companion
                                            </h4>
                                            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="w-12 h-12 rounded-xl bg-amber-900/50 flex items-center justify-center text-2xl overflow-hidden border border-amber-500/30">
                                                        {data.companion.avatar ? (
                                                            <img src={data.companion.avatar} alt={data.companion.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            data.companion.type?.includes('狼') || data.companion.type?.includes('Wolf') ? '🐺' :
                                                                data.companion.type?.includes('鷹') || data.companion.type?.includes('Hawk') ? '🦅' :
                                                                    data.companion.type?.includes('貓頭鷹') || data.companion.type?.includes('Owl') ? '🦉' :
                                                                        data.companion.type?.includes('蜘蛛') || data.companion.type?.includes('Spider') ? '🕷️' :
                                                                            data.companion.type?.includes('機') || data.companion.type?.includes('Robot') || data.companion.type?.includes('終端') ? '🤖' :
                                                                                data.companion.type?.includes('劍') || data.companion.type?.includes('Sword') ? '🗡️' :
                                                                                    data.companion.type?.includes('貓') || data.companion.type?.includes('Cat') ? '🐱' : '🐾'
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-amber-300 font-bold">{data.companion.name}</p>
                                                        <p className="text-amber-700 text-xs">{data.companion.type}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                                                    <div className="bg-slate-900/50 p-2 rounded">
                                                        <div className="text-xs text-slate-500">AC</div>
                                                        <div className="text-amber-400 font-bold">{data.companion.ac}</div>
                                                    </div>
                                                    <div className="bg-slate-900/50 p-2 rounded">
                                                        <div className="text-xs text-slate-500">HP</div>
                                                        <div className="text-green-400 font-bold">{data.companion.hp}/{data.companion.maxHp}</div>
                                                    </div>
                                                    <div className="bg-slate-900/50 p-2 rounded">
                                                        <div className="text-xs text-slate-500">Attack</div>
                                                        <div className="text-rose-400 font-bold text-xs">
                                                            {data.companion.attacks?.[0]?.name || 'Help'}
                                                        </div>
                                                    </div>
                                                </div>
                                                {data.companion.abilities && data.companion.abilities.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {data.companion.abilities.map((ability, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-amber-900/30 text-amber-500 text-xs rounded border border-amber-800/30">
                                                                {ability}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Growth History Section */}
                                    {data.growthHistory && data.growthHistory.length > 0 && (
                                        <div>
                                            <h4 className="text-cyan-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1 flex items-center gap-2">
                                                📈 Growth History
                                            </h4>
                                            <div className="space-y-2">
                                                {data.growthHistory.map((event, idx) => (
                                                    <div key={idx} className="bg-slate-800/30 p-3 rounded-lg border-l-2 border-cyan-600">
                                                        <p className="text-slate-300 text-sm">{event.description || event}</p>
                                                        {event.timestamp && (
                                                            <p className="text-slate-600 text-xs mt-1">{new Date(event.timestamp).toLocaleDateString()}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div >
    );
}
