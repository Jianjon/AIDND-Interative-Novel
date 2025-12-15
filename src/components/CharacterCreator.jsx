import React, { useState, useEffect } from 'react';
import {
    CLASS_DATA, ALIGNMENTS,
    ARCHETYPES_CN, PERSONALITIES
} from '../libs/GameData';
import { RACE_TRAITS } from '../data/rules/race_traits';
import { BACKGROUNDS } from '../data/rules/backgrounds';
import { X, Upload, Dice5, User, Shield, Zap, Book } from 'lucide-react';
import { CharacterAgent } from '../libs/CharacterAgent';

export const CharacterCreator = ({ onClose, onCreate }) => {
    // Basic Info
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Race & Subrace
    // Get list of races from our rules engine
    const RACE_OPTIONS = Object.keys(RACE_TRAITS);
    const [race, setRace] = useState(RACE_OPTIONS[0]);
    const [subrace, setSubrace] = useState('');

    const [alignment, setAlignment] = useState(ALIGNMENTS[0]);
    const [charClass, setCharClass] = useState(CLASS_DATA[0].name);
    const [archetype, setArchetype] = useState(ARCHETYPES_CN[0]);
    const [personality, setPersonality] = useState(PERSONALITIES[0]);

    // Background Selection
    const BG_OPTIONS = Object.keys(BACKGROUNDS);
    const [backgroundKey, setBackgroundKey] = useState(BG_OPTIONS[0]);
    const [backgroundStory, setBackgroundStory] = useState(''); // Custom story text

    // Stats (Auto-filled based on class + race)
    const [stats, setStats] = useState({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 });
    const [baseStats, setBaseStats] = useState({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }); // Before racial bonuses

    // Avatar
    const [avatarUrl, setAvatarUrl] = useState(null);

    // Initial Subrace Setup
    useEffect(() => {
        const raceData = RACE_TRAITS[race];
        if (raceData?.subraces) {
            setSubrace(Object.keys(raceData.subraces)[0]);
        } else {
            setSubrace('');
        }
    }, [race]);

    // Auto-Calculate Stats on Race/Class Change
    useEffect(() => {
        recalculateStats();
    }, [race, subrace, charClass]);

    const recalculateStats = () => {
        // 1. Base Stats (Standard Array logic or Class bias)
        const selectedClass = CLASS_DATA.find(c => c.name === charClass);
        const newBase = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

        if (selectedClass) {
            // Boost primary stat to 15, others 12/13/10/8
            newBase[selectedClass.baseStat] = 15;
            // Simple logic: make it playable but generic
            // In a real app we might let user use Point Buy. Here we apply a "Standard Array-ish" bias.
        }
        setBaseStats(newBase);

        // 2. Apply Racial Bonuses
        const raceData = RACE_TRAITS[race];
        let finalStats = { ...newBase };

        if (raceData) {
            // Main Race Stats
            Object.entries(raceData.stats || {}).forEach(([stat, val]) => {
                if (finalStats[stat] !== undefined) finalStats[stat] += val;
            });

            // Subrace Stats
            if (subrace && raceData.subraces && raceData.subraces[subrace]) {
                Object.entries(raceData.subraces[subrace].stats || {}).forEach(([stat, val]) => {
                    if (finalStats[stat] !== undefined) finalStats[stat] += val;
                });
            }
        }
        setStats(finalStats);
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const selectedClassInfo = CLASS_DATA.find(c => c.name === charClass) || CLASS_DATA[0];
        const bgData = BACKGROUNDS[backgroundKey];

        const newCharacterData = {
            id: `custom_${Date.now()}`,
            name: name || "Custom Hero",
            race: subrace ? `${race} (${subrace})` : race, // Store full race name
            alignment: alignment,
            class: charClass,
            archetype: archetype,
            avatar: avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&backgroundColor=b6e3f4`,

            // Fluff
            personality: personality,
            // Combined Background Info (Title + Custom Story)
            background: `${backgroundKey}. ${backgroundStory || bgData?.desc || ""}`,
            monologue: "I am ready to forge my own destiny.",

            // Stats
            level: 1,
            baseStats: stats, // Final Stats
            classFeature: selectedClassInfo.feature,
            fightingStyle: selectedClassInfo.style,

            // Lists
            feats: [], // Start with no feats usually (unless Human Variant, but simplified here)
            skills: [...(selectedClassInfo.skills || []), ...(bgData?.skills || [])], // Merge Class + Background Skills
            inventory: ["Adventurer's Pack", "Weapon", "50 GP"]
        };

        const newAgent = new CharacterAgent(newCharacterData);
        onCreate(newAgent);
        // onClose will be called by parent or we can call it here, but let's wait a tick to ensure state updates
        onClose();
    };

    const statInputs = Object.keys(stats).map(statKey => (
        <div key={statKey} className="flex flex-col items-center">
            <label className="text-xs uppercase font-bold text-slate-500 mb-1">{statKey}</label>
            <div className="w-12 h-10 bg-slate-900 border border-slate-700 rounded flex items-center justify-center text-amber-500 font-bold">
                {stats[statKey]}
            </div>
            {/* Show Modifier */}
            <span className="text-[10px] text-slate-600 mt-1">
                {Math.floor((stats[statKey] - 10) / 2) >= 0 ? "+" : ""}{Math.floor((stats[statKey] - 10) / 2)}
            </span>
        </div>
    ));

    return (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-800 w-full max-w-4xl rounded-xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                    <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2">
                        <User size={20} /> 創建新角色 (5E Rules)
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Visuals & Core Identity */}
                    <div className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-32 h-32 rounded-xl bg-slate-900 border-2 border-dashed border-slate-600 flex items-center justify-center overflow-hidden relative group">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={40} className="text-slate-600" />
                                )}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-white font-bold">Upload Image</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <p className="text-xs text-slate-500">點擊上傳頭像</p>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-1">角色姓名</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="輸入姓名..."
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none"
                            />
                        </div>

                        {/* Race Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-1">種族</label>
                                <select
                                    value={race}
                                    onChange={e => setRace(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none"
                                >
                                    {RACE_OPTIONS.map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Subrace (if available) */}
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-1">亞種 (Subrace)</label>
                                <select
                                    value={subrace}
                                    onChange={e => setSubrace(e.target.value)}
                                    disabled={!RACE_TRAITS[race]?.subraces}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none disabled:opacity-50"
                                >
                                    {!RACE_TRAITS[race]?.subraces && <option value="">無</option>}
                                    {RACE_TRAITS[race]?.subraces && Object.keys(RACE_TRAITS[race].subraces).map(sr => (
                                        <option key={sr} value={sr}>{sr}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Race Info Display */}
                        <div className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded border border-slate-700/50">
                            <p><strong>特性:</strong> {RACE_TRAITS[race]?.traits?.join(", ")}</p>
                            {subrace && RACE_TRAITS[race]?.subraces?.[subrace] && (
                                <p className="mt-1 text-amber-500"><strong>亞種特性:</strong> {RACE_TRAITS[race].subraces[subrace].traits?.join(", ")}</p>
                            )}
                        </div>

                        {/* Alignment */}
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-1">陣營</label>
                            <select
                                value={alignment}
                                onChange={e => setAlignment(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none"
                            >
                                {ALIGNMENTS.map(a => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right Column: Class & Stats */}
                    <div className="space-y-6">
                        {/* Class */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-1">職業</label>
                                <select
                                    value={charClass}
                                    onChange={e => setCharClass(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none"
                                >
                                    {CLASS_DATA.map(c => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-1">副職業</label>
                                <select
                                    value={archetype}
                                    onChange={e => setArchetype(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none"
                                >
                                    {ARCHETYPES_CN.map(a => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                            <label className="block text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
                                <Dice5 size={16} /> 屬性 (已含種族加值)
                            </label>
                            <div className="flex justify-between gap-1">
                                {statInputs}
                            </div>
                        </div>

                        {/* Background Selection */}
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-1">背景 (Background)</label>
                            <select
                                value={backgroundKey}
                                onChange={e => setBackgroundKey(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none mb-2"
                            >
                                {BG_OPTIONS.map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>

                            {/* Background Info */}
                            <div className="text-xs text-slate-400 mb-2">
                                <p><strong>技能:</strong> {BACKGROUNDS[backgroundKey].skills.join(", ")}</p>
                                <p>{BACKGROUNDS[backgroundKey].desc}</p>
                            </div>

                            <textarea
                                value={backgroundStory}
                                onChange={e => setBackgroundStory(e.target.value)}
                                placeholder="自定義角色故事 (選填)..."
                                className="w-full h-16 bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none resize-none text-sm"
                            />
                        </div>
                        {/* Personality */}
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-1">性格</label>
                            <select
                                value={personality}
                                onChange={e => setPersonality(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-amber-500 outline-none"
                            >
                                {PERSONALITIES.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-700 bg-slate-900/80 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-400 hover:text-white transition-colors font-bold"
                    >
                        取消
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Shield size={18} /> 建立角色
                    </button>
                </div>
            </div>
        </div>
    );
};
