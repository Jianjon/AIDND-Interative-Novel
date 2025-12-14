import React, { useState, useEffect } from 'react';
import { X, Sparkles, User, Sword, Shield, Zap, BookOpen, Dice5, RefreshCw } from 'lucide-react';
import { CHARACTER_PROMPTS } from '../data/character_prompts';

/**
 * CharacterCreationModal.jsx
 * 
 * Multi-step wizard for AI-driven character creation.
 * Flow:
 * 1. Concept Input (User types prompt)
 * 2. Drafting (AI Generates JSON)
 * 3. Awakening (User selects Special Ability)
 * 4. Finalize (Add to Roster)
 */
export default function CharacterCreationModal({ onClose, onConfirm, characterManager }) {
    const [step, setStep] = useState('concept'); // concept, generating, selection
    const [prompt, setPrompt] = useState('');
    const [draft, setDraft] = useState(null);
    const [abilities, setAbilities] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [suggestedPrompts, setSuggestedPrompts] = useState([]);

    // --- NEW: Structured Inputs State ---
    const [charName, setCharName] = useState('');
    const [charGender, setCharGender] = useState('');
    const [charRace, setCharRace] = useState(''); // Default empty = "Random"
    const [charClass, setCharClass] = useState(''); // Default empty = "Random"
    const [charAlignment, setCharAlignment] = useState('');

    const RACES = [
        // Core
        "Human (人類)", "Elf (精靈)", "Dwarf (矮人)", "Halfling (半身人)",
        "Dragonborn (龍裔)", "Tiefling (提夫林)", "Half-Orc (半獸人)", "Gnome (侏儒)",
        "Half-Elf (半精靈)", "Drow (卓爾)",
        // Exotic / Monster
        "Aasimar (阿斯莫)", "Warforged (機人)", "Mind Flayer (奪心魔)", "Duergar (灰矮人)",
        "Goblin (哥布林)", "Vampire (吸血鬼)", "Kenku (肯庫)", "Tabaxi (貓人)",
        "Githyanki (吉斯洋基人)", "Changeling (變形者)"
    ];

    const CLASSES = [
        // Core
        "Fighter (戰士)", "Wizard (法師)", "Cleric (牧師)", "Rogue (遊蕩者)",
        "Barbarian (野蠻人)", "Bard (吟遊詩人)", "Druid (德魯伊)", "Monk (武僧)",
        "Paladin (聖武士)", "Ranger (遊俠)", "Sorcerer (術士)", "Warlock (邪術師)",
        // Expanded
        "Artificer (奇械師)", "Blood Hunter (血獵手)", "Necromancer (死靈法師)",
        "Alchemist (煉金術士)", "Spellblade (魔劍士)", "Psionic (靈能者)",
        "Death Knight (死亡騎士)", "Shaman (薩滿)"
    ];

    const ALIGNMENTS = [
        "Lawful Good (守序善良)", "Neutral Good (中立善良)", "Chaotic Good (混亂善良)",
        "Lawful Neutral (守序中立)", "True Neutral (絕對中立)", "Chaotic Neutral (混亂中立)",
        "Lawful Evil (守序邪惡)", "Neutral Evil (中立邪惡)", "Chaotic Evil (混亂邪惡)"
    ];

    useEffect(() => {
        handleShufflePrompts();
    }, []);

    const handleShufflePrompts = () => {
        const shuffled = [...CHARACTER_PROMPTS].sort(() => 0.5 - Math.random());
        setSuggestedPrompts(shuffled.slice(0, 5));
    };

    const handleGenerate = async () => {
        // Validation: require at least a prompt OR some structured input
        const hasInput = prompt.trim() || charName || charRace || charClass;
        if (!hasInput) return;

        setStep('generating');
        setLoadingMessage('正在編織命運的絲線...');

        // Construct Composite Prompt
        let compositePrompt = "";

        let constraints = [];
        if (charName) constraints.push(`Name: ${charName}`);
        if (charGender) constraints.push(`Gender: ${charGender}`);
        if (charRace) constraints.push(`Race: ${charRace.split(' ')[0]}`); // Take English part
        if (charClass) constraints.push(`Class: ${charClass.split(' ')[0]}`); // Take English part
        if (charAlignment) constraints.push(`Alignment: ${charAlignment.split(' (')[0]}`);

        if (constraints.length > 0) {
            compositePrompt += `[Hard Constraints]\n${constraints.join('\n')}\n\n`;
        }

        if (prompt.trim()) {
            compositePrompt += `[Character Description]\n${prompt}`;
        } else {
            compositePrompt += `[Character Description]\nCreate a unique character fitting the above constraints.`;
        }

        try {
            // 1. Generate Draft
            const charDraft = await characterManager.generateCharacterDraft(compositePrompt);
            setDraft(charDraft);

            setLoadingMessage('正在喚醒潛在的主角光環...');

            // 2. Generate Special Abilities
            const specialAbilities = await characterManager.generateProtagonistAbilities(charDraft);
            setAbilities(specialAbilities);

            setStep('selection');
        } catch (error) {
            console.error("Creation failed", error);
            alert("創造失敗，命運之神似乎在打盹。請重試。");
            setStep('concept');
        }
    };

    const handleFinalize = () => {
        if (!draft || !selectedAbility) return;

        // Merge selected ability into character features/feats
        const finalCharacter = {
            ...draft,
            feats: [...(draft.feats || []), selectedAbility.name],
            // Store full ability detail in a special property for tooltip display later
            specialAbility: selectedAbility
        };

        onConfirm(finalCharacter);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-slate-950 border border-amber-500/30 w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">

                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-950 to-amber-900/10 pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-indigo-900/50 z-10 bg-slate-950/50 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-amber-400 animate-pulse" />
                        <h2 className="text-2xl font-serif text-slate-100 font-bold tracking-wider">
                            {step === 'concept' && "喚醒靈魂 (Concept)"}
                            {step === 'generating' && "命運編織中 (Weaving)..."}
                            {step === 'selection' && "選擇你的天賦 (Awakening)"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 z-10 flex flex-col items-center">

                    {/* STEP 1: CONCEPT INPUT */}
                    {step === 'concept' && (
                        <div className="w-full max-w-3xl space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-500">

                            <div className="text-center mb-6">
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 mb-2">
                                    你想成為什麼樣的英雄？
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    填寫基本資料，或直接輸入描述，AI 將為你生成完整的 D&D 角色卡。
                                </p>
                            </div>

                            {/* Structured Inputs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">

                                {/* Name */}
                                <div className="space-y-1">
                                    <label className="text-xs text-indigo-300 font-bold uppercase tracking-wider">姓名 (Name)</label>
                                    <input
                                        type="text"
                                        value={charName}
                                        onChange={(e) => setCharName(e.target.value)}
                                        placeholder="自填或留空隨機"
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                                    />
                                </div>

                                {/* Gender */}
                                <div className="space-y-1">
                                    <label className="text-xs text-indigo-300 font-bold uppercase tracking-wider">性別 (Gender)</label>
                                    <select
                                        value={charGender}
                                        onChange={(e) => setCharGender(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                                    >
                                        <option value="">隨機 (Random)</option>
                                        <option value="Male">男 (Male)</option>
                                        <option value="Female">女 (Female)</option>
                                        <option value="Non-binary">非二元 (Non-binary)</option>
                                        <option value="Other">其他 (Other)</option>
                                    </select>
                                </div>

                                {/* Alignment */}
                                <div className="space-y-1">
                                    <label className="text-xs text-indigo-300 font-bold uppercase tracking-wider">陣營 (Alignment)</label>
                                    <select
                                        value={charAlignment}
                                        onChange={(e) => setCharAlignment(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                                    >
                                        <option value="">隨機 (Random)</option>
                                        {ALIGNMENTS.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>

                                {/* Race */}
                                <div className="space-y-1 md:col-span-1 lg:col-span-1">
                                    <label className="text-xs text-indigo-300 font-bold uppercase tracking-wider">種族 (Race)</label>
                                    <select
                                        value={charRace}
                                        onChange={(e) => setCharRace(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                                    >
                                        <option value="">隨機 (Random)</option>
                                        {RACES.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>

                                {/* Class */}
                                <div className="space-y-1 md:col-span-2 lg:col-span-2">
                                    <label className="text-xs text-indigo-300 font-bold uppercase tracking-wider">職業 (Class)</label>
                                    <select
                                        value={charClass}
                                        onChange={(e) => setCharClass(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm"
                                    >
                                        <option value="">隨機 (Random)</option>
                                        {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                            </div>

                            <div className="relative">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 block ml-1">詳細描述 / 背景故事 (Description)</label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="例如：一個為了尋找失散妹妹而和惡魔簽訂契約的聖武士，手持斷劍，性格陰鬱但善良... (若上方已選職業種族，此處可補充細節)"
                                    className="w-full h-32 bg-slate-900/50 border border-indigo-500/30 focus:border-amber-500 rounded-xl p-4 text-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all resize-none shadow-inner"
                                />
                                <div className="absolute bottom-4 right-4 text-xs text-slate-600">
                                    {prompt.length} chars
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={!prompt.trim() && !charRace && !charClass && !charName}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-900/50 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <Dice5 size={24} className={loadingMessage ? "animate-spin-slow" : ""} />
                                開始生成 (Generate Character)
                            </button>

                            <div className="flex flex-col items-center gap-3 mt-8 w-full max-w-4xl">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Sparkles size={14} className="text-amber-500" />
                                    <span>試試看 (靈感骰子)：</span>
                                    <button
                                        onClick={handleShufflePrompts}
                                        className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-amber-400 transition-colors bg-slate-900 border border-slate-700"
                                        title="換一批靈感"
                                    >
                                        <RefreshCw size={14} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {suggestedPrompts.map((p, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setPrompt(p.prompt)}
                                            className="text-xs bg-slate-900/80 px-4 py-2 rounded-full text-indigo-300 hover:text-white hover:bg-indigo-900 border border-indigo-900/50 hover:border-indigo-500 transition-all shadow-sm"
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: LOADING */}
                    {step === 'generating' && (
                        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="text-amber-400 animate-pulse" size={48} />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-slate-200 mb-2">{loadingMessage}</h3>
                                <p className="text-slate-500 animate-pulse">AI 正在計算屬性、撰寫故事、賦予靈魂...</p>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: SELECTION & REVIEW */}
                    {step === 'selection' && draft && (
                        <div className="w-full h-full flex flex-col md:flex-row gap-8 animate-in slide-in-from-right-10 fade-in duration-500">

                            {/* Left: Character Preview */}
                            <div className="w-full md:w-1/3 bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col gap-4 overflow-y-auto">
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500/30 mb-4 shadow-lg">
                                        <img src={draft.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-amber-500 text-center">{draft.name}</h3>
                                    <p className="text-slate-400">{draft.race} {draft.class}</p>
                                </div>

                                <div className="space-y-4 text-sm text-slate-300">
                                    <div className="bg-slate-950 p-3 rounded">
                                        <span className="text-indigo-400 font-bold block mb-1">背景故事</span>
                                        {draft.bio}
                                    </div>
                                    <div className="bg-slate-950 p-3 rounded">
                                        <span className="text-purple-400 font-bold block mb-1">性格與獨白</span>
                                        <p className="italic text-slate-400">"{draft.monologue}"</p>
                                        <p className="mt-2 text-xs text-slate-500">{draft.personality}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                            <div className="text-slate-500">STR</div>
                                            <div className="text-slate-200 font-bold">{draft.baseStats.str}</div>
                                        </div>
                                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                            <div className="text-slate-500">DEX</div>
                                            <div className="text-slate-200 font-bold">{draft.baseStats.dex}</div>
                                        </div>
                                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                            <div className="text-slate-500">INT</div>
                                            <div className="text-slate-200 font-bold">{draft.baseStats.int}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Ability Selection */}
                            <div className="w-full md:w-2/3 flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                        選擇你的「主角光環」
                                    </h3>
                                    <p className="text-slate-400">
                                        每個傳奇英雄都有一個與眾不同的天賦。請從以下三個由 AI 根據你的故事生成的獨特能力中選擇一個。
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 flex-1 overflow-y-auto pr-2">
                                    {abilities.map((ability) => (
                                        <div
                                            key={ability.id}
                                            onClick={() => setSelectedAbility(ability)}
                                            className={`
                                                relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group
                                                ${selectedAbility?.id === ability.id
                                                    ? 'bg-indigo-900/30 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] transform scale-[1.02]'
                                                    : 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800'}
                                            `}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className={`text-xl font-bold ${selectedAbility?.id === ability.id ? 'text-amber-400' : 'text-slate-200'}`}>
                                                    {ability.name}
                                                </h4>
                                                {selectedAbility?.id === ability.id && <Zap className="text-amber-500 animate-pulse" />}
                                            </div>
                                            <p className="text-slate-400 text-sm mb-3 italic">"{ability.description}"</p>
                                            <div className="bg-slate-950/50 p-3 rounded text-sm text-indigo-200 border border-indigo-900/30">
                                                <span className="font-bold text-indigo-400 text-xs uppercase tracking-wider block mb-1">Effect</span>
                                                {ability.effect}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-end gap-4 pt-4 border-t border-slate-800">
                                    <button
                                        onClick={() => setStep('concept')}
                                        className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                                    >
                                        放棄重來
                                    </button>
                                    <button
                                        onClick={handleFinalize}
                                        disabled={!selectedAbility}
                                        className="px-8 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg shadow-lg hover:shadow-amber-900/50 transition-all flex items-center gap-2"
                                    >
                                        <Sword size={20} />
                                        確認創建角色 (Start Game)
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
