import React, { useState } from 'react';
import { X, Sword, Shield, Map as MapIcon, Ghost, Heart, Star, BookOpen, Scroll, Skull, Package, Sparkles, Settings, Save } from 'lucide-react';
import { BondRadar } from './BondRadar';

/**
 * CharacterModal.jsx
 * 
 * Displays the full details of a character using the new Hybrid Agent architecture.
 * Shows strict derived stats (AC, DC) alongside narrative fluff.
 */
export default function CharacterModal({ character, relationships, party, roster, onClose, onGeneratePortrait, onLevelUp, onUpdatePortrait, onUpdateCharacter, isGenerating }) {
    if (!character) return null;

    const [activeTab, setActiveTab] = useState('stats'); // stats, inventory, backstory, companion
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


        // Check limits
        const currentRefines = character.aiRefineCount || 0;
        if (currentRefines >= 2) {
            alert("AI Refinement limit reached (Max 2 times per character).");
            return;
        }

        setIsRefining(true);
        try {
            // Use AIService backed by Cloud Function
            const { AIService } = await import('../services/AIService'); // Dynamic import to avoid top-level issues if any
            const aiService = new AIService();

            const prompt = `
            Context: D&D Character Creation.
            Refine the following ${field} text for a ${data.race} ${data.class} named ${data.name}.
            Make it more immersive, thematic, and consistent with D&D lore.
            Keep it under 100 words.
            Input Text: "${editData[field] || data[field] || ''}"
            Output (Traditional Chinese):
            `;

            const result = await aiService.generate(prompt, {
                model: "gemini-2.0-flash-exp"
            });
            const refinedText = result.text;

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

    const handleStyleChange = (e) => {
        const styleKey = e.target.value;
        if (onUpdateCharacter) {
            onUpdateCharacter({
                ...character,
                decisionBias: styleKey
            });
        }
    };

    // Import COMBAT_STYLES dynamically or use a constant if preferred. 
    // Since this is a component, we'll assume it's available or imported.
    // I will add the import at the top in a separate chunk if needed, 
    // but for now I'll just fix the localized list to match the keys.
    const STYLES_LIST = [
        { value: 'DEFAULT', label: '本性模式 (預設) - 依據個人性格行動' },
        { value: 'AGGRESSIVE', label: '全面進攻 (Aggressive) - 優先傷害，忽視防禦' },
        { value: 'DEFENSIVE', label: '穩健防守 (Defensive) - 優先生存與保護' },
        { value: 'TACTICAL', label: '精準戰術 (Tactical) - 強調控場與弱點' },
        { value: 'MERCIFUL', label: '仁慈不殺 (Merciful) - 追求和平，非致命' },
    ];

    // Lightbox state
    // Lightbox state
    const [lightboxSrc, setLightboxSrc] = useState(null);

    // Helper to check if avatar is AI generated (starts with data:image)
    const isGenerated = data.avatar && data.avatar.startsWith('data:');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">

            {/* Lightbox Overlay */}
            {lightboxSrc && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-8 cursor-zoom-out animate-in zoom-in-50 duration-200"
                    onClick={() => setLightboxSrc(null)}
                >
                    <img
                        src={lightboxSrc}
                        alt="Zoomed Portrait"
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
                            onClick={() => setLightboxSrc(data.avatar)}
                            className="w-full h-full object-cover rounded-full border-4 border-amber-900/30 shadow-lg group-hover:border-amber-500/50 transition-colors cursor-zoom-in hover:brightness-110"
                        />
                        {!character.id.startsWith('preset_') && (
                            <button
                                onClick={() => {
                                    const count = character.portraitGenCount || 0;
                                    if (count >= 3) {
                                        alert("頭像生成已達上限 (最多 3 次)。");
                                        return;
                                    }
                                    const confirmGen = window.confirm(`是否生成新的 AI 頭像？(剩餘 ${3 - count} 次)`);
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
                                        ? "次數已滿"
                                        : `生成 AI 頭像 (剩餘 ${3 - (character.portraitGenCount || 0)} 次)`
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
                                <span>生命狀態 (Health)</span>
                                <span className={data.hp < data.maxHp * 0.3 ? "text-red-500 animate-pulse font-bold" : "text-green-500 font-bold"}>
                                    <span className="mr-2 text-slate-400 font-mono">({data.hp}/{data.maxHp})</span>
                                    {data.hp <= 0 ? "不省人事" :
                                        data.hp < data.maxHp * 0.3 ? "垂死邊緣" :
                                            data.hp < data.maxHp * 0.6 ? "負傷" : "健康"}
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
                            <div className="text-[10px] text-slate-500 uppercase">護甲等級 (AC)</div>
                            <div className="text-lg font-bold text-slate-200">{character.ac || "10"}</div>
                        </div>
                        <div className="bg-slate-900 p-2 rounded text-center border border-slate-800">
                            <div className="text-[10px] text-slate-500 uppercase">先攻 (Init)</div>
                            <div className="text-lg font-bold text-slate-200">{getModString(10 + (derived.initiative || 0)).replace('10', '')}</div>
                        </div>
                        <div className="bg-slate-900 p-2 rounded text-center border border-slate-800">
                            <div className="text-[10px] text-slate-500 uppercase">熟練 (Prof)</div>
                            <div className="text-lg font-bold text-slate-200">+{derived.proficiency || 2}</div>
                        </div>
                        <div className="bg-slate-900 p-2 rounded text-center border border-slate-800">
                            <div className="text-[10px] text-slate-500 uppercase">法術 DC</div>
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
                            className={`flex-1 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'stats' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            屬性能力
                        </button>
                        {(data.spells && data.spells.length > 0) && (
                            <button
                                onClick={() => setActiveTab('spells')}
                                className={`flex-1 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'spells' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                魔法奧秘
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`flex-1 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'inventory' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            冒險裝備
                        </button>

                        {/* Only show Relationships if we are in Game Mode (party context exists) */}
                        {(party && party.length > 0) && (
                            <button
                                onClick={() => setActiveTab('relationships')}
                                className={`flex-1 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'relationships' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                羈絆關係
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab('backstory')}
                            className={`flex-1 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'backstory' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            背景設定
                        </button>
                        {data.companion && (
                            <button
                                onClick={() => setActiveTab('companion')}
                                className={`flex-1 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'companion' ? 'text-amber-500 border-b-2 border-amber-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                夥伴
                            </button>
                        )}
                    </div >

                    {/* Content Area */}
                    < div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" >

                        {activeTab === 'stats' && (
                            <div className="space-y-6">
                                {/* Combat Style Selector */}
                                <div className="bg-slate-950 p-4 rounded border border-slate-800">
                                    <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 flex items-center gap-2">
                                        <Sword size={16} /> 戰鬥風格 (Combat Style)
                                    </h4>
                                    <div className="flex gap-2">
                                        <select
                                            value={data.decisionBias || 'DEFAULT'}
                                            onChange={handleStyleChange}
                                            className="w-full bg-slate-900 text-slate-200 text-sm p-2 rounded border border-slate-700 focus:border-amber-500 focus:outline-none"
                                        >
                                            {STYLES_LIST.map(style => (
                                                <option key={style.value} value={style.value}>{style.label}</option>
                                            ))}
                                            {data.decisionBias && !STYLES_LIST.some(s => s.value === data.decisionBias) && (
                                                <option value={data.decisionBias}>{data.decisionBias} (自定義)</option>
                                            )}
                                        </select>
                                    </div>
                                    <p className="text-slate-500 text-xs mt-2">
                                        * 此設定將影響角色在自動戰鬥與劇情決策中的傾向。
                                    </p>
                                </div>

                                {/* Base Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(stats).map(([key, val]) => (
                                        <div key={key} className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col items-center">
                                            <span className="text-[10px] text-slate-500 uppercase font-bold">
                                                {key === 'str' ? '力量 STR' :
                                                    key === 'dex' ? '敏捷 DEX' :
                                                        key === 'con' ? '體質 CON' :
                                                            key === 'int' ? '智力 INT' :
                                                                key === 'wis' ? '感知 WIS' :
                                                                    key === 'cha' ? '魅力 CHA' : key.toUpperCase()}
                                            </span>
                                            <span className="text-2xl font-serif text-slate-200">{val}</span>
                                            <span className="text-xs text-amber-600 font-mono">{getModString(val)}</span>
                                        </div>
                                    ))}
                                </div>

                                { /* Derived Stats: Senses Only (Saving Throws Removed as per request) */}
                                <div className="mt-6">
                                    <div className="bg-slate-950/50 p-4 rounded border border-slate-800">
                                        <h4 className="text-slate-400 text-xs font-bold uppercase mb-3 border-b border-slate-800 pb-1">感官與熟練 (Senses)</h4>
                                        <div className="space-y-3 text-sm text-slate-300">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex justify-between p-2 bg-slate-900/50 rounded border border-slate-800/50">
                                                    <span>被動感知 (Passive Perception):</span>
                                                    <span className="font-mono text-amber-500 font-bold">
                                                        {10 + Math.floor(((stats.wis || 10) - 10) / 2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between p-2 bg-slate-900/50 rounded border border-slate-800/50">
                                                    <span>黑暗視覺 (Darkvision):</span>
                                                    <span className="font-mono text-slate-400">
                                                        {['Elf', 'Drow', 'Tiefling', 'Dwarf', 'Orc', 'Gnome'].some(r => (data.race || '').includes(r)) ? '60 ft' : '無'}
                                                    </span>
                                                </div>
                                            </div>
                                            {data.languages && (
                                                <div className="pt-2 border-t border-slate-800/50 mt-2">
                                                    <span className="text-xs text-slate-500 block mb-1">語言 (Languages)</span>
                                                    <span className="text-sm font-serif italic text-slate-400">{data.languages.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Skills & Feats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">擅長技能 (Skills)</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map(s => (
                                                <span key={s} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700 shadow-sm">
                                                    {s}
                                                </span>
                                            ))}
                                            {data.skills.length === 0 && <span className="text-slate-600 text-xs italic">無訓練技能</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">專長與特性 (Feats)</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[...(data.feats || []), ...(data.features || [])].map((f, i) => (
                                                <span key={i} className="px-2 py-1 bg-indigo-950/50 rounded text-xs text-indigo-300 border border-indigo-900/50">
                                                    {f}
                                                </span>
                                            ))}
                                            {(data.feats || []).length === 0 && (data.features || []).length === 0 && <span className="text-slate-600 text-xs italic">無特殊專長</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'spells' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {/* Spell Slots Summary */}
                                {(data.slots || data.spellSlots) && (
                                    <div className="bg-indigo-950/20 p-4 rounded-lg border border-indigo-500/30">
                                        <h4 className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Sparkles size={14} /> 法術位狀態 (Spell Slots)
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {Object.entries(data.slots || data.spellSlots || {}).map(([level, count]) => (
                                                <div key={level} className="flex flex-col items-center bg-slate-950/50 px-3 py-2 rounded border border-indigo-900/30 min-w-[60px]">
                                                    <span className="text-[10px] text-indigo-500/70 font-bold uppercase">{level === '0' ? '戲法' : `${level} 環`}</span>
                                                    <span className="text-xl font-serif text-indigo-300">{count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-amber-500 text-sm font-bold uppercase mb-4 border-b border-slate-800 pb-1 flex items-center gap-2">
                                        <BookOpen size={16} /> 已準備法術 (Prepared Spells)
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {data.spells && data.spells.map((spell, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/40 rounded border border-slate-700/50 hover:border-indigo-500/30 transition-colors group">
                                                <div className="text-indigo-500 group-hover:text-indigo-400 transition-colors">
                                                    <Sparkles size={16} />
                                                </div>
                                                <span className="text-sm text-slate-200 font-medium">{spell}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {(!data.spells || data.spells.length === 0) && (
                                        <p className="text-slate-600 text-sm italic py-4">目前沒有法術資料。</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'inventory' && (
                            <div className="space-y-6">
                                {/* Gold Display */}
                                {(data.inventory?.gold !== undefined || data.gold !== undefined) && (
                                    <div className="flex items-center gap-2 p-3 bg-amber-950/30 rounded-lg border border-amber-900/30">
                                        <span className="text-xl">🪙</span>
                                        <div>
                                            <div className="text-xs text-amber-600 uppercase font-bold">目前資產</div>
                                            <div className="text-lg font-bold text-amber-400">{data.inventory?.gold ?? data.gold ?? 0} GP (金幣)</div>
                                        </div>
                                    </div>
                                )}

                                {/* Full Inventory */}
                                <div>
                                    <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1 flex items-center gap-2">
                                        <Package size={14} /> 行囊物品 (Inventory)
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
                                                {data.inventory.length === 0 && <span className="text-slate-600 text-xs italic">背包空空如也</span>}
                                            </ul>
                                            :
                                            // Handle New Schema (Object)
                                            <>
                                                {/* Equipment */}
                                                <div>
                                                    <h5 className="text-xs text-slate-500 uppercase font-bold mb-1">⚔️ 戰鬥裝備 (Equipment)</h5>
                                                    <ul className="text-sm text-slate-300 space-y-1">
                                                        {data.inventory.equipment && data.inventory.equipment.length > 0 ? (
                                                            data.inventory.equipment.map((item, i) => (
                                                                <li key={`eq-${i}`} className="flex items-center gap-2 py-1 border-b border-slate-800/50">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                                                    {typeof item === 'string' ? item : `${item.name}${item.quantity ? ` x${item.quantity}` : ''}`}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <span className="text-slate-600 text-xs italic">無裝備</span>
                                                        )}
                                                    </ul>
                                                </div>

                                                {/* Consumables */}
                                                <div>
                                                    <h5 className="text-xs text-amber-500 uppercase font-bold mb-1 mt-2">🧪 消耗品 (Consumables)</h5>
                                                    <ul className="text-sm text-slate-300 space-y-1">
                                                        {data.inventory.consumables && data.inventory.consumables.length > 0 ? (
                                                            data.inventory.consumables.map((item, i) => (
                                                                <li key={`con-${i}`} className="flex items-center gap-2 py-1 border-b border-slate-800/50">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                                                    {typeof item === 'string' ? item : `${item.name}${item.quantity ? ` x${item.quantity}` : ''}`}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <span className="text-slate-600 text-xs italic">無消耗品</span>
                                                        )}
                                                    </ul>
                                                </div>

                                                {/* Magic Items */}
                                                <div>
                                                    <h5 className="text-xs text-purple-400 uppercase font-bold mb-1 mt-2">✨ 魔法物品 (Magic Items)</h5>
                                                    <ul className="text-sm text-slate-300 space-y-1">
                                                        {data.inventory.magicItems && data.inventory.magicItems.length > 0 ? (
                                                            data.inventory.magicItems.map((item, i) => (
                                                                <li key={`mag-${i}`} className="flex items-center gap-2 py-1 border-b border-slate-800/50">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                                                    {typeof item === 'string' ? item : `${item.name}${item.quantity ? ` x${item.quantity}` : ''}`}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <span className="text-slate-600 text-xs italic">無特殊物品</span>
                                                        )}
                                                    </ul>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'relationships' && (
                            <div className="space-y-6">
                                {/* Teammate Relationships (Party Based) */}
                                {(() => {
                                    // 1. Determine list of targets (Teammates)
                                    // If 'party' prop is provided, use it. Otherwise fall back to keys in relationships (legacy/isolated view)
                                    let targets = [];

                                    if (party && Array.isArray(party) && party.length > 0) {
                                        // Filter out self
                                        targets = party.filter(id => id !== data.id);
                                    } else {
                                        // Fallback: Get all keys from data.relationships or relationships state
                                        const globalRels = (relationships && relationships[data.id]) ? Object.keys(relationships[data.id]) : [];
                                        const localRels = (data.relationships) ? Object.keys(data.relationships) : [];
                                        targets = [...new Set([...globalRels, ...localRels])];
                                    }

                                    if (targets.length === 0) {
                                        return (
                                            <div className="flex flex-col items-center justify-center p-12 text-slate-600 bg-slate-950/30 rounded-xl border border-slate-800 border-dashed">
                                                <Heart size={48} className="mb-4 opacity-20" />
                                                <p>目前沒有建立特殊的羈絆關係。</p>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4 px-2">
                                                <Heart className="text-pink-500" size={20} />
                                                <div>
                                                    <h4 className="text-pink-500 text-sm font-bold uppercase">羈絆關係網</h4>
                                                    <p className="text-slate-500 text-[10px]">對隊友的內心想法與評價</p>
                                                </div>
                                            </div>

                                            {targets.map((targetId) => {
                                                // Resolve Target Details
                                                const targetChar = roster ? roster.find(c => c.id === targetId) : null;
                                                const targetName = targetChar ? targetChar.name : (targetId.startsWith('preset_') ? targetId : 'Unknown');
                                                const targetAvatar = targetChar ? (targetChar.avatar || targetChar.avatarUrl) : null;

                                                // Resolve Relationship Data
                                                // Priority: Global State -> Local Preset -> Default
                                                // Note: relationships[data.id] might be undefined if no interactions yet
                                                let rel = { affinity: 0, bondState: 'STRANGER', thoughts: '...' };

                                                if (relationships && relationships[data.id] && relationships[data.id][targetId]) {
                                                    rel = { ...rel, ...relationships[data.id][targetId] };
                                                } else if (data.relationships && data.relationships[targetId]) {
                                                    rel = { ...rel, ...data.relationships[targetId] };
                                                }

                                                return (
                                                    <div key={targetId} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 hover:border-pink-900/50 transition-colors group">
                                                        <div className="flex items-start gap-4">
                                                            {/* Avatar */}
                                                            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden text-lg font-serif font-bold text-slate-600 relative">
                                                                {targetAvatar ? (
                                                                    <img src={targetAvatar} alt={targetName} className="w-full h-full object-cover opacity-80" />
                                                                ) : (
                                                                    <span>{targetName.charAt(0)}</span>
                                                                )}
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div className="flex flex-col">
                                                                        <h5 className="text-slate-200 font-bold text-sm truncate">{targetName}</h5>
                                                                        <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border self-start mt-1 ${rel.bondState === 'FRIEND' ? 'text-green-400 border-green-900/30 bg-green-900/10' :
                                                                            rel.bondState === 'RIVAL' ? 'text-orange-400 border-orange-900/30 bg-orange-900/10' :
                                                                                rel.bondState === 'ENEMY' ? 'text-red-400 border-red-900/30 bg-red-900/10' :
                                                                                    'text-slate-500 border-slate-800 bg-slate-900'
                                                                            }`}>
                                                                            {rel.bondState || 'STRANGER'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Thoughts - The Core Display */}
                                                                <div className="relative bg-[#1a1a1a]/60 p-3 rounded border border-slate-800/50">
                                                                    <span className="absolute -top-1.5 left-3 px-1 bg-slate-950 text-[10px] text-pink-500/50 uppercase font-bold tracking-widest">
                                                                        Impression
                                                                    </span>
                                                                    <p className="text-sm text-slate-400 italic leading-relaxed font-serif">
                                                                        "{rel.thoughts || '......'}"
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })()}
                            </div>
                        )}

                        {activeTab === 'backstory' && (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-green-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">性格特質 (Personality)</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed italic">"{data.personality}"</p>
                                </div>

                                {/* Relationship Radar moved to dedicated tab */}


                                <div>
                                    <h4 className="text-purple-400 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">秘密與內心獨白 (Secrets)</h4>
                                    <p className="text-purple-300/80 text-sm leading-relaxed italic font-serif">
                                        "{data.monologue || "尚未揭曉內心深處的想法..."}"
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-green-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1">生平故事 (Biographical Story)</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                                        {data.bio || data.backstory || data.background || "這名冒險者的過去隱藏在迷霧之中。"}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'companion' && data.companion && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {/* Companion Section */}
                                <div className="animate-in slide-in-from-bottom-2 duration-500">
                                    <h4 className="text-amber-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1 flex items-center gap-2">
                                        🐾 冒險夥伴 (Companion)
                                    </h4>
                                    <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-amber-900/50 flex items-center justify-center text-2xl overflow-hidden border border-amber-500/30 hover:border-amber-500 transition-colors cursor-zoom-in relative group">
                                                {data.companion.avatar ? (
                                                    <img
                                                        src={data.companion.avatar}
                                                        alt={data.companion.name}
                                                        className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                                                        onClick={() => setLightboxSrc(data.companion.avatar)}
                                                    />
                                                ) : (
                                                    '🐾'
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-amber-300 font-bold">{data.companion.name}</p>
                                                <p className="text-amber-700 text-xs">{data.companion.type}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-center mb-3">
                                            <div className="bg-slate-900/50 p-2 rounded">
                                                <div className="text-[10px] text-slate-500 uppercase">AC</div>
                                                <div className="text-amber-400 font-bold">{data.companion.ac}</div>
                                            </div>
                                            <div className="bg-slate-900/50 p-2 rounded">
                                                <div className="text-[10px] text-slate-500 uppercase">HP</div>
                                                <div className="text-green-400 font-bold">{data.companion.hp}/{data.companion.maxHp}</div>
                                            </div>
                                            <div className="bg-slate-900/50 p-2 rounded">
                                                <div className="text-[10px] text-slate-500 uppercase">攻擊</div>
                                                <div className="text-rose-400 font-bold text-xs truncate" title={data.companion.attacks?.[0]?.name}>
                                                    {data.companion.attacks?.[0]?.name || '特殊行動'}
                                                </div>
                                            </div>
                                        </div>
                                        {data.companion.abilities && data.companion.abilities.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {data.companion.abilities.map((ability, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-amber-900/30 text-amber-500 text-[10px] rounded border border-amber-800/30">
                                                        {ability}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Growth History Section */}
                                {data.growthHistory && data.growthHistory.length > 0 && (
                                    <div className="animate-in slide-in-from-bottom-2 duration-500">
                                        <h4 className="text-cyan-500 text-sm font-bold uppercase mb-2 border-b border-slate-800 pb-1 flex items-center gap-2">
                                            📈 成長歷程 (Growth)
                                        </h4>
                                        <div className="space-y-2">
                                            {data.growthHistory.map((event, idx) => (
                                                <div key={idx} className="bg-slate-800/30 p-3 rounded-lg border-l-2 border-cyan-600">
                                                    <p className="text-slate-300 text-sm">{event.description || event}</p>
                                                    {event.timestamp && (
                                                        <p className="text-[10px] text-slate-600 mt-1">{new Date(event.timestamp).toLocaleDateString()}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div >
    );
}
