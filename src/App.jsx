import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Sword, Ghost, Map as MapIcon, Settings, Send, Sparkles, Camera,
    Heart, Shield, Wand2, Clock, Users, ChevronRight, Plus,
    X, Activity, Brain, PlayCircle, Scroll, Zap, Save, Image as ImageIcon, Bot, User, BookOpen, Skull, Music, Package, RefreshCw, Eye, PawPrint, Feather, Menu, Scale
} from 'lucide-react';
import { CharacterCreator } from './components/CharacterCreator';
import { ModuleDetailsModal } from './components/ModuleDetailsModal';
import JournalModal from './components/JournalModal';
import SaveLoadModal from './components/SaveLoadModal';
import DualDiceRoll from './components/DualDiceRoll'; // Import for animation
// --- CONSTANTS & HELPERS ---
const FLAVOR_ADJECTIVES = [
    "Savage", "Cruel", "Vicious", "Wild", "Grim", "Dark", "Fierce", "Bloodthirsty",
    "Cursed", "Ancient", "Rotting", "Shadowy", "Venomous", "Rabid", "Hollow",
    "Twisted", "Frenzied", "Wretched", "Lurking", "Silent", "Elite", "Veteran"
];

const getUniqueEnemyName = (baseName, existingRoster) => {
    // 1. Strip existing " A", " B", " 1", etc. from the AI's output
    // Regex: Ends with space + single letter or number, case insensitive
    const cleanBase = baseName.replace(/\s+[A-Z0-9]$/i, "").trim();

    const existingNames = new Set(existingRoster.map(c => c.name));

    // If the stripped name is unique (unlikely if multiple), use it.
    if (!existingNames.has(cleanBase)) return cleanBase;

    // Try Flavor Adjectives
    for (const adj of FLAVOR_ADJECTIVES) {
        const newName = `${adj} ${cleanBase}`;
        if (!existingNames.has(newName)) return newName;
    }

    // Fallback: Numbering
    let i = 2;
    while (true) {
        const newName = `${cleanBase} ${i}`;
        if (!existingNames.has(newName)) return newName;
        i++;
    }
};

import Toast from './components/Toast';
import SequentialLogRenderer from './components/SequentialLogRenderer';
import { HealthBar, StatusBadges, CombatStatCompact, XpBar } from './components/CombatHUD'; // Updated Import
import CharacterModal from './components/CharacterModal';
import CharacterCreationModal from './components/CharacterCreationModal';
import ActionModal from './components/ActionModal';
import SettingsModal from './components/SettingsModal';
import { generateAIPortrait, generateAIScene } from './utils/portrait-generator';
import { CharacterAgent } from './libs/CharacterAgent';
import { ErrorBoundary } from './libs/ErrorBoundary.jsx';
import LevelUpModal from './components/LevelUpModal';
import LocationBreadcrumbs from './components/LocationBreadcrumbs';
import PRESET_CHARACTERS from './data/preset_characters';
import { scaleCharacter } from './utils/characterScaling';
import GroupDecisionOptions from './components/GroupDecisionOptions'; // New Component

/* -------------------------------------------------------------------------- */
/* CONSTANTS & DATA (Traditional Chinese)      */
/* -------------------------------------------------------------------------- */

// Game Modes
const GAME_MODES = {
    NOVEL: 'novel',
    TRPG: 'trpg'
};

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";


// Constants moved to GameData.js
import {
    CLASS_DATA, RACES, EXOTIC_RACES, ALIGNMENTS,
    ARCHETYPES_CN, PERSONALITIES, EXOTIC_BACKGROUNDS,
    CN_FIRST_NAMES, CN_LAST_NAMES, APPEARANCE_TRAITS,
    BACKGROUND_STORIES, MODULES,
    EQUIPMENT_SETS, COMPANIONS, APPEARANCE_DESCRIPTIONS, RICH_BACKSTORIES,
    ITEM_DATABASE, STARTING_KITS
} from './libs/GameData';

// Agents
import { StoryAgent } from './agents/StoryAgent';
import { GameMasterAgent } from './agents/GameMasterAgent';
import { CartographerAgent } from './agents/CartographerAgent';
import { CharacterManagerAgent } from './agents/CharacterManagerAgent';
import { AudioManager } from './services/AudioManager';
import { getMemoryService } from './services/MemoryService';
import { getEncounterGuidelinesWithPersona } from './data/rules/encounter_balance';
import { getLootGuidelines } from './data/rules/loot_tables';
import { BACKGROUND_MAP } from './data/background_map';


/* -------------------------------------------------------------------------- */
/* UTILS & LOGIC                               */
/* -------------------------------------------------------------------------- */



const useLocalStorage = (key, initialValue) => {
    // ... (Code continues)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

/* Scenario Roster Component (Sidebar) */
const ScenarioRoster = ({ roster }) => {
    if (!roster || roster.length === 0) return null;

    return (
        <div className="mt-2 pt-4 border-t border-slate-700 mb-2 animate-in fade-in slide-in-from-right-4 duration-500">
            <h4 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-amber-500 mb-3 px-1 font-tome-header border-b border-amber-500/20 pb-1">
                <Users size={12} />
                <span>Scene Actors</span>
            </h4>

            <div className="space-y-3">
                {roster.map((actor, idx) => {
                    const isEnemy = actor.type === 'Enemy' || actor.type === 'Monster' || actor.type === 'Boss';
                    const isAlly = actor.type === 'Ally' || actor.type === 'Summon' || actor.type === 'Companion';

                    // Dark Tome Aesthetic
                    const borderColor = isAlly ? "border-emerald-500/30" : isEnemy ? "border-red-900/50" : "border-slate-700";
                    const bgColor = isAlly ? "bg-emerald-900/10" : isEnemy ? "bg-red-900/10" : "bg-slate-900/40";
                    const textColor = isEnemy ? "text-red-400" : isAlly ? "text-emerald-400" : "text-slate-300";
                    const barColor = isEnemy ? "bg-red-600" : isAlly ? "bg-emerald-500" : "bg-slate-500";
                    const icon = isEnemy ? <Sword size={12} /> : isAlly ? <PawPrint size={12} /> : <User size={12} />;

                    return (
                        <div key={`${actor.name}-${idx}`} className={`relative p-2 rounded border ${borderColor} ${bgColor} flex flex-col gap-1.5 transition-all group hover:bg-white/5`}>
                            {/* Header */}
                            <div className="flex justify-between items-center text-xs">
                                <span className={`font-bold font-tome-header ${textColor} flex items-center gap-1.5 text-sm`}>
                                    {icon}
                                    {actor.name}
                                </span>
                                <span className={`text-[9px] uppercase tracking-wider font-tome-body font-bold ${isAlly ? 'text-emerald-500' : 'text-slate-500'}`}>
                                    {isAlly ? 'Companion' : actor.type}
                                </span>
                            </div>

                            {/* HP Bar */}
                            {(actor.hp !== undefined && actor.maxHp > 0) && (
                                <div className="w-full h-2 bg-slate-800 border border-slate-700 mt-1 relative rounded-sm overflow-hidden">
                                    <div
                                        className={`h-full ${barColor} transition-all duration-500 relative`}
                                        style={{ width: `${Math.min(100, Math.max(0, (actor.hp / actor.maxHp) * 100))}%` }}>
                                        <div className="absolute inset-0 bg-white/10 opacity-30"></div>
                                    </div>
                                </div>
                            )}

                            {/* Stats Text */}
                            {(actor.hp !== undefined) && (
                                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5 font-bold">
                                    <span>{isEnemy ? 'Status: Unknown' : `HP: ${actor.hp}${actor.maxHp ? `/${actor.maxHp}` : ''}`}</span>
                                    {isAlly && <span className="text-emerald-500 flex items-center gap-1 cursor-pointer hover:underline"><Zap size={10} /> Command</span>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};



const CustomStoryModal = ({ isOpen, onClose, onGenerate, isGenerating }) => {
    const [prompt, setPrompt] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");

    if (!isOpen) return null;

    const handleSurprise = () => {
        const difficulties = ['beginner', 'intermediate', 'advanced'];
        const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];
        // Trigger generation directly
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

export default function InteractiveDND() {
    // State
    const [view, setView] = useState('home'); // home, modules, roster, game, mode_select
    const [gameMode, setGameMode] = useState(GAME_MODES.TRPG); // Default to TRPG
    const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
    const [showCustomStoryModal, setShowCustomStoryModal] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(420); // Default sidebar width (increased from ~380)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const isResizing = useRef(false);

    useEffect(() => {
        const handleWindowResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleWindowResize);

        const handleMouseMove = (e) => {
            if (!isResizing.current) return;
            const newWidth = window.innerWidth - e.clientX;
            // Min 300, Max 800
            if (newWidth > 300 && newWidth < 800) {
                setSidebarWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            if (isResizing.current) {
                isResizing.current = false;
                document.body.style.cursor = 'default';
                document.body.style.userSelect = 'auto';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // CUSTOM MODULES STATE
    const [customModules, setCustomModules] = useLocalStorage('dnd_custom_modules', []);



    // HOTFIX: Force TRPG Mode if stuck in Novel (User Request)
    useEffect(() => {
        const savedMode = localStorage.getItem('dnd_game_mode'); // If we saved this separately?
        // Actually, executeSave saves it in the save file.
        // We just want to ensure that if we load a game, we respect the user's desire for TRPG flow.
        // But for now, let's just force the default in the state above.
    }, []);
    const [questContext, setQuestContext] = useState(null); // { goal, worldInfo, urgentThreat }
    const [apiKey, setApiKey] = useLocalStorage('gemini_api_key', "AIzaSyDlbVAeyH1uKQn2EezjiRNK0LnngBx81zQ"); // Users must provide their own API key
    // Fallback to hardcoded key if state is empty, to prevent [400] API Key not found
    const sanitizedApiKey = apiKey?.trim() ? apiKey.trim() : "AIzaSyDlbVAeyH1uKQn2EezjiRNK0LnngBx81zQ";

    // Agent Initialization
    const storyAgent = useMemo(() => new StoryAgent(sanitizedApiKey), [sanitizedApiKey]);

    const handleCreateCustomModule = async (prompt, difficulty) => {
        // Use sandbox mode: No AI wait, instant module creation
        try {
            // Reset persistent memory for a clean start
            if (memoryService.current) memoryService.current.reset();

            const newModule = storyAgent.generateSandboxModule(prompt, difficulty);

            setCustomModules(prev => [...prev, newModule]);
            setShowCustomStoryModal(false);

            // Auto-select and start
            setSelectedModule(newModule);
            setLevel(newModule.startLevel || 3);
            setView('roster');

            setToast({ message: `「${newModule.title}」沙盒冒險已準備就緒！`, type: "success" });
        } catch (error) {
            console.error(error);
            setToast({ message: "創造世界失敗...", type: "error" });
        }
    };

    // Module Selection State
    const [selectedModule, setSelectedModule] = useState(null);
    const [currentAct, setCurrentAct] = useState(1); // Track current story act for plot navigation
    const [showModuleDetails, setShowModuleDetails] = useState(false);
    const [gameOptions, setGameOptions] = useState({
        pacing: 'normal',   // fast, normal, slow
        tone: 'normal',     // serious, mysterious, humorous
        difficulty: 'normal', // easy, normal, hard
        autoPlay: false     // if true, AI continues story automatically
    });

    // TOKEN TRACKING STATE
    const [tokenData, setTokenData] = useState(() => {
        const savedTotal = localStorage.getItem('dnd_total_token_usage');
        return {
            session: 0,
            lastTurn: 0,
            total: savedTotal ? parseInt(savedTotal, 10) : 0
        };
    });

    useEffect(() => {
        localStorage.setItem('dnd_total_token_usage', tokenData.total.toString());
    }, [tokenData.total]);

    const updateTokenCount = (usage) => {
        if (!usage) return;
        setTokenData(prev => ({
            ...prev,
            session: prev.session + (usage.totalTokenCount || 0),
            lastTurn: usage.totalTokenCount || 0,
            total: prev.total + (usage.totalTokenCount || 0)
        }));
    };

    const [roster, setRoster] = useState([]);
    const [scenarioRoster, setScenarioRoster] = useState([]); // Scene Actors (Enemies, NPCs)

    // Initial game state setupa into CharacterAgent instances
    // This ensures that even if data comes from localStorage (plain JSON), we have access to class methods.
    const agentRoster = React.useMemo(() => {
        if (!Array.isArray(roster)) {
            console.error("Roster is not an array, clearing...");
            return [];
        }
        return roster
            .filter(data => data && typeof data === 'object' && data.id) // Filter out bad entries
            .map(data => {
                try {
                    return new CharacterAgent(data);
                } catch (e) {
                    console.error("Failed to hydrate character:", data, e);
                    return null;
                }
            })
            .filter(Boolean); // Remove null entries from failed hydration
    }, [roster]);

    const [party, setParty] = useState([]); // Array of IDs
    const [gameState, setGameState] = useState({}); // { id: { hp, psych, inventory } }
    const [logs, setLogs] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPreGenerating, setIsPreGenerating] = useState(false); // Pre-generation loading state
    const [editingCharacter, setEditingCharacter] = useState(null); // For CharacterFormModal
    const [levelUpTarget, setLevelUpTarget] = useState(null);
    const [modalPos, setModalPos] = useState(null); // { top, left, width, direction } // Character Agent triggering level up
    const [viewingCharacter, setViewingCharacter] = useState(null); // For CharacterModal (View Only)
    const [pendingActions, setPendingActions] = useState({}); // { id: actionText }
    const [actionCache, setActionCache] = useState({}); // { id: { options: [] } }
    const [activeTab, setActiveTab] = useState('setup'); // setup, game, journal
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile Sidebar Toggle

    // Modals
    const [activeModalChar, setActiveModalChar] = useState(null); // CharacterAgent object (Details Modal)
    const [actionModalChar, setActionModalChar] = useState(null); // CharacterAgent object (Action Selection Modal)
    const [activeModalTab, setActiveModalTab] = useState('actions');
    const [showJournalModal, setShowJournalModal] = useState(false);
    const [showItemPicker, setShowItemPicker] = useState(false); // New: Item Picker State
    const [showCreator, setShowCreator] = useState(false);
    const [styleMode, setStyleMode] = useState(true); // Character dialogue styling mode
    const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false); // Portrait generation loading
    const [isAutoProcessing, setIsAutoProcessing] = useState(false); // AI Auto-Control processing state
    const [groupDecisionOptions, setGroupDecisionOptions] = useState([]); // Array of strings (options)
    // Quest Journal & Location
    const [questJournal, setQuestJournal] = useState([]); // [{ turn, event, details, timestamp }]
    // Agent System 2.0: Cross-Agent Signals
    const [worldSignals, setWorldSignals] = useState({
        threat_level: "None",
        pacing_signal: "Build-up",
        mechanical_opportunity: "None"
    });

    const [questLog, setQuestLog] = useState([]); // Array of strings (active quests)
    const [currentLocation, setCurrentLocation] = useState(['未知區域']); // Breadcrumb path array
    // Refs
    const logContainerRef = useRef(null);
    const lastLogRef = useRef(null);
    const scrollTrigger = useRef(null);
    const portraitInputRef = useRef(null); // Hidden file input for portrait upload
    const [showSaveLoadModal, setShowSaveLoadModal] = useState(null); // 'save' | 'load' | null
    const [toast, setToast] = useState(null); // { message, type }

    // Audio Manager (Memoized Singleton)
    const audioManager = useRef(new AudioManager());
    const characterManager = useMemo(() => new CharacterManagerAgent(apiKey), [apiKey]);
    const [isMuted, setIsMuted] = useState(audioManager.current.isMuted);

    // --- NEW SETTINGS STATE ---
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    // --- TURNING SYNC STATE ---
    const [pendingTurnUpdates, setPendingTurnUpdates] = useState(null);
    const [isNarrating, setIsNarrating] = useState(false);
    const [isNarrativeComplete, setIsNarrativeComplete] = useState(true);

    const [userSettings, setUserSettings] = useLocalStorage('dnd_user_settings', {
        theme: 'default',
        fontSize: 'text-base',
        lineHeight: 'leading-relaxed',
        masterVolume: 80,
        bgmVolume: 60,
        sfxVolume: 80,
        textSpeed: 30
    });
    const [isGeneratingScene, setIsGeneratingScene] = useState(false);
    const [sceneImage, setSceneImage] = useLocalStorage('dnd_scene_image', '');
    const [currentBgmKey, setCurrentBgmKey] = useState('default');

    // --- AUDIO SYNC EFFECT ---
    useEffect(() => {
        if (audioManager.current) {
            audioManager.current.setSettings({
                master: (userSettings.masterVolume ?? 100) / 100,
                bgm: (userSettings.bgmVolume ?? 80) / 100,
                sfx: (userSettings.sfxVolume ?? 100) / 100,
                muted: isMuted
            });
        }
    }, [userSettings.masterVolume, userSettings.bgmVolume, userSettings.sfxVolume, isMuted]);

    // --- SETTINGS HANDLERS ---
    const handleUpdateSettings = (key, value) => {
        setUserSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleGenerateScene = async () => {
        if (!apiKey) return showToast("請先設定 API Key", "error");

        setIsGeneratingScene(true);
        try {
            const loc = Array.isArray(currentLocation) ? currentLocation.join(" > ") : (currentLocation || "Unknown Location");

            // Get last 3 narrative logs for context
            const lastLogs = logs.slice(-3)
                .map(l => typeof l.content === 'string' ? l.content : "")
                .join("\n");

            const image = await generateAIScene(loc, lastLogs);

            if (image) {
                setSceneImage(image);
                setLogs(prev => [...prev, { type: 'image', content: image, location: loc }]);
                if (audioManager.current) audioManager.current.playSound('magic'); // Audio feedback
                showToast("場景生成成功！", "success");
            } else {
                showToast("場景生成失敗，請稍後再試。", "error");
            }
        } catch (e) {
            console.error("Scene Gen Error:", e);
            showToast("生成錯誤: " + e.message, "error");
        } finally {
            setIsGeneratingScene(false);
        }
    };

    // --- AI Auto-Control Logic ---
    const toggleControlMode = (charId) => {
        setRoster(prev => prev.map(c => {
            if (c.id === charId) {
                const currentMode = c.controlMode || 'manual';
                const newMode = currentMode === 'manual' ? 'auto' : 'manual';

                // CRITICAL: We must preserve the Class Prototype (methods like getCardData)
                // Using Object.create + Object.assign creates a proper clone with the same prototype
                const clone = Object.create(Object.getPrototypeOf(c));
                Object.assign(clone, c);
                clone.controlMode = newMode;
                return clone;
            }
            return c;
        }));
    };

    // Auto-Process Turn Effect
    useEffect(() => {
        const processAutoTurns = async () => {
            // Prevent auto-turns during prologue or generation
            const isPrologue = logs.length === 0;
            if (isPrologue || isGenerating || isPreGenerating || isAutoProcessing) return;
            if (gameMode !== GAME_MODES.TRPG) return;

            // Identify AUTO characters who need actions
            const autoChars = party
                .map(id => agentRoster.find(c => c.id === id))
                .filter(c => c && (c.controlMode === 'auto') && !pendingActions[c.id] && (gameState[c.id]?.hp > 0) && (gameState[c.id]?.status !== 'unconscious' && gameState[c.id]?.status !== 'dead'));

            if (autoChars.length === 0) return;

            // Wait a moment after turn start before auto-acting (UX pacing)
            // But we need to ensure we don't loop.
            // This effect depends on [logs, pendingActions].
            // If logs changed (new turn), and no pending actions...
            // Check if latest log is a 'turn_batch'. If so, we just finished a turn.
            // If latest log is 'trpg_narrative', it's a new round! Correct.

            const lastLog = logs[logs.length - 1];
            if (!lastLog || lastLog.type === 'turn_batch') return; // Don't act immediately after user options, wait for response.
            // Actually, after 'turn_batch' comes 'trpg_narrative' (AI response).
            // So if lastLog is 'turn_batch', we are waiting for AI response.
            // If lastLog is 'trpg_narrative', it means AI finished responding. user turn!

            setIsAutoProcessing(true);

            // Slight delay for "Thinking" UI
            await new Promise(r => setTimeout(r, 1000));

            const newActions = {};

            // Loop and select actions
            // We reuse actionCache if available, or just create basic ones?
            // Ideally we use CharacterManager.generateOptions, but that's complex to call here individually.
            // HOWEVER, line 953 already calls generateOptions for EVERYONE and sets actionCache!
            // So we just need to Pick from actionCache.

            for (const char of autoChars) {
                const cached = actionCache[char.id];
                if (cached && cached.options && cached.options.length > 0) {
                    // Selection Logic:
                    // If HP < 30%, prefer Instinct (A)
                    // Else prefer Professional (B) or Team (C) randomly
                    const hp = gameState[char.id]?.hp || 100;
                    const maxHp = gameState[char.id]?.maxHp || 100;
                    const hpPercent = (hp / maxHp) * 100;

                    let selectedOption;
                    if (hpPercent < 30) {
                        selectedOption = cached.options.find(o => o.type === 'instinct') || cached.options[0];
                    } else {
                        // 70% chance for Professional, 30% for Team
                        const roll = Math.random();
                        if (roll > 0.3) {
                            selectedOption = cached.options.find(o => o.type === 'professional') || cached.options[1] || cached.options[0];
                        } else {
                            selectedOption = cached.options.find(o => o.type === 'team') || cached.options[2] || cached.options[0];
                        }
                    }

                    if (selectedOption) {
                        newActions[char.id] = selectedOption.text;
                    }
                }
            }

            if (Object.keys(newActions).length > 0) {
                setPendingActions(prev => ({ ...prev, ...newActions }));
            }

            setIsAutoProcessing(false);
        };

        // Added `roster` to dependencies because `controlMode` is part of `roster` data.
        // `isPrologue` is commented out as it's not defined in the provided snippet.
        processAutoTurns();
    }, [logs, gameMode, actionCache, party, roster, gameState, isGenerating, isPreGenerating, isAutoProcessing, pendingActions]); // Dependencies need to be careful

    // Helpers
    // --- Roster Logic ---
    // Generate initial roster (12 Iconic Characters)
    const generateRoster = () => {
        // We now ignore localStorage 'dnd_roster' for initialization to ensure the 12 presets are available.
        // Custom characters are persisted separately if needed, OR we just trust the user
        // to Create New Char which appends to this list.

        console.log("Initializing Roster with 12 Preset Characters...");
        // Critical: Must convert raw JSON presets into CharacterAgent instances to ensure logic/methods work.
        return PRESET_CHARACTERS.map(data => new CharacterAgent(data));
    };



    // Handle portrait upload from file
    const handlePortraitUpload = (event, characterId) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Img = e.target.result;
            updateCharacterAvatar(characterId, base64Img);
        };
        reader.readAsDataURL(file);
    };

    // Update character avatar in roster and localStorage
    const updateCharacterAvatar = (characterId, newAvatarUrl) => {
        setRoster(prev => prev.map(char =>
            char.id === characterId
                ? { ...char, avatar: newAvatarUrl }
                : char
        ));
    };

    // State for AI-generated character details
    const [isGeneratingDetails, setIsGeneratingDetails] = useState(false);

    // AI-Generate rich character details using Gemini
    const generateCharacterDetails = async (characterAgent) => {
        if (!apiKey) {
            alert("請先輸入 API Key");
            return;
        }
        setIsGeneratingDetails(true);

        const prompt = `你是奇幻小說作家。請為以下 D&D 角色生成簡短的背景和描述。

角色：${characterAgent.name} (${characterAgent.race} ${characterAgent.class})
性格：${characterAgent.personality} | 陣營：${characterAgent.alignment}

請生成（繁體中文，內容要精簡）：

1. 【背景故事】(80-120字)：出身、重大轉折、冒險動機。
2. 【外觀】(40-60字)：外貌、穿著、特殊標記。
3. 【裝備】：3件重要裝備（名稱 - 簡短描述）
4. 【秘密】(一句話)：不為人知的秘密或弱點。

JSON格式回覆：
{
  "backstory": "背景...",
  "appearanceDesc": "外觀...",
  "equipment": ["裝備1", "裝備2", "裝備3"],
  "secret": "秘密..."
}`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.9, maxOutputTokens: 2048 }
                    })
                }
            );

            const data = await response.json();
            const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (textContent) {
                // Parse JSON from the response
                const jsonMatch = textContent.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    // Update character in roster with AI-generated content
                    setRoster(prev => prev.map(char =>
                        char.id === characterAgent.id
                            ? {
                                ...char,
                                backstory: parsed.backstory || char.backstory,
                                appearanceDesc: parsed.appearanceDesc || char.appearanceDesc,
                                equipment: parsed.equipment || char.equipment,
                                monologue: parsed.secret || parsed.monologue || ""
                            }
                            : char
                    ));
                    // Refresh the modal by re-fetching the updated agent
                    const updatedAgent = agentRoster.find(a => a.id === characterAgent.id);
                    if (updatedAgent) {
                        setActiveModalChar(null);
                        setTimeout(() => setActiveModalChar(updatedAgent), 100);
                    }
                }
            }
        } catch (e) {
            console.error("Character details generation failed:", e);
            alert("生成失敗：" + e.message);
        } finally {
            setIsGeneratingDetails(false);
        }
    };

    // Initialize roster if empty or invalid
    // --- INITIALIZATION & DATA MIGRATION ---
    useEffect(() => {
        // 1. Initialize Roster if empty
        if (!roster || roster.length === 0) {
            console.log("Initializing Roster with 12 Preset Characters...");
            setRoster(generateRoster());
            return;
        }

        // 2. Force Sync Preset Avatars (To fix legacy DiceBear issue persistently)
        // We check if any preset character in the current roster has an avatar that DOES NOT match the fresh import.
        const updatedRoster = roster.map(char => {
            if (char.id && char.id.startsWith('preset_')) {
                const freshPreset = PRESET_CHARACTERS.find(p => p.id === char.id);
                if (freshPreset && freshPreset.avatar && char.avatar !== freshPreset.avatar) {
                    // Update the avatar to the fresh import
                    console.log(`Updating Avatar for ${char.name}`);
                    return { ...char, avatar: freshPreset.avatar, avatarUrl: freshPreset.avatar };
                }
            }
            return char;
        });

        // If any changes were made, update state
        if (JSON.stringify(updatedRoster) !== JSON.stringify(roster)) {
            setRoster(updatedRoster);
            console.log("Roster Avatars Synced to Assets.");
        }

        // 3. Legacy / Localization Checks
        let shouldReset = false;
        let resetReason = "";

        // Check A: Legacy DiceBear Avatars in PRESETS (Custom chars are allowed to have them)
        // We only care if the *presets* are outdated.
        const presetBarbarian = roster.find(c => c.id === 'preset_barbarian');

        // Check B: English content in Presets
        const hasEnglishPresets = presetBarbarian && (presetBarbarian.race === 'Air Genasi' || presetBarbarian.race === 'Genasi' || presetBarbarian.class === 'Barbarian');

        // Check C: DiceBear in Presets
        const hasLegacyPresetAvatars = roster.some(c =>
            c.id &&
            c.id.startsWith('preset_') &&
            (
                (typeof c.avatar === 'string' && c.avatar.includes('dicebear')) ||
                (typeof c.avatarUrl === 'string' && c.avatarUrl.includes('dicebear'))
            )
        );

        // Check D: Missing Gold/Attributes in Presets
        const hasBrokenPresets = presetBarbarian && presetBarbarian.gold === undefined;

        if (hasEnglishPresets) { shouldReset = true; resetReason = "Localization Update (English detected)"; }
        else if (hasLegacyPresetAvatars) { shouldReset = true; resetReason = "Avatar Update (Legacy DiceBear detected in Presets)"; }
        else if (hasBrokenPresets) { shouldReset = true; resetReason = "Schema Update (Missing attributes)"; }
        else if (roster.some(c => c.id === 'error_char')) { shouldReset = true; resetReason = "Error Recovery"; }

        if (shouldReset) {
            console.log(`[System] Roster Reset Triggered: ${resetReason}`);

            // CRITICAL: Preserve Custom Characters!
            const customCharacters = roster.filter(c => c.id && !c.id.startsWith('preset_'));

            // Regenerate Presets
            const freshPresets = generateRoster();

            // Merge: New Custom + Fresh Presets (Custom usually go first or last? Let's keep existing order preference, put custom first)
            const newRoster = [...customCharacters, ...freshPresets];

            setRoster(newRoster);
            showToast("系統更新：已刷新預設角色資料 (自創角色已保留)", "info");
        }
    }, [roster, setRoster]);

    const [level, setLevel] = useState(3); // Default Level: 3 (Standard Adventurer Start)

    // Phase 2: AI Scene Visualization
    // Default: Dark Fantasy Placeholder
    const [showJournal, setShowJournal] = useState(false); // New: Journal Modal Toggle

    // --- Save & Load System (Multi-Slot) ---

    // Migration Logic: Run once on mount
    // --- Save & Load System (Multi-Slot) ---

    // Migration Logic: Run once on mount - OPTIONAL: We can keep this if we want to migrate old auto-saves to a slot?
    // For now, let's DISABLE migration to avoid confusion with the new manual system.
    // Or we migrate it to Slot 3 as a "Legacy Auto-Save"?
    useEffect(() => {
        const checkMigration = () => {
            // ... Logic disabled for strict manual save enforcement
        };
        // checkMigration();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleSave = (slotId) => {
        const timestamp = new Date().toLocaleString('zh-TW');

        // Prepare Data
        const saveData = {
            logs,
            party,
            roster: roster.map(c => c.getFullSheet ? c.getFullSheet() : c),
            scenarioRoster,
            gameState,
            questJournal,
            currentLocation,
            questLog,
            selectedModule,
            gameMode,
            apiKey,
            currentAct,
            savedAt: timestamp
        };

        // Save to specific slot key
        localStorage.setItem(`dnd_save_slot_${slotId}`, JSON.stringify(saveData));
        showToast(`遊戲進度已儲存至存檔 ${slotId}！`, "success");
        setShowSaveLoadModal(null);
    };

    const handleLoad = (slotId) => {
        const savedJson = localStorage.getItem(`dnd_save_slot_${slotId}`);
        if (!savedJson) {
            showToast("讀取失敗：該位置無存檔", "error");
            return;
        }

        try {
            const data = JSON.parse(savedJson);

            // 1. RESET TEMPORARY STATE
            setIsGenerating(false);
            setIsPreGenerating(false);
            setPendingActions({});
            setIsAutoProcessing(false);
            setActiveModalChar(null);
            setShowJournalModal(false);

            // 2. Restore State
            if (data.logs) setLogs(data.logs);
            if (data.party) setParty(data.party);
            if (data.roster) {
                // Re-hydrate characters
                // Note: We might want to clear existing roster first or just overwrite?
                const restoredRoster = data.roster.map(charData => new CharacterAgent(charData));
                setRoster(restoredRoster);
            }
            if (data.scenarioRoster) setScenarioRoster(data.scenarioRoster);
            if (data.gameState) setGameState(data.gameState);
            if (data.questLog) setQuestLog(data.questLog);
            if (data.questJournal) setQuestJournal(data.questJournal);

            if (data.currentLocation) { // New standard
                setCurrentLocation(data.currentLocation);
            } else if (data.location) { // Legacy compat
                if (Array.isArray(data.location)) setCurrentLocation(data.location);
                else setCurrentLocation([data.location]);
            }

            if (data.selectedModule) setSelectedModule(data.selectedModule);
            if (data.gameMode) setGameMode(data.gameMode);
            if (data.apiKey) setApiKey(data.apiKey);
            if (data.currentAct) setCurrentAct(data.currentAct);


            showToast("存檔讀取成功！", "success");
            setShowSaveLoadModal(null);

            // If we are pending a view switch, maybe force it?
            if (view !== 'game') setView('game');

        } catch (e) {
            console.error("Load failed", e);
            showToast("讀取存檔失敗: " + e.message, "error");
        }
    };

    // Auto-Save Effect
    // Auto-Save Effect - DISABLED
    useEffect(() => {
        // Disabled auto-save logic entirely.
    }, []);



    // Open Modals
    const saveGame = () => setShowSaveLoadModal('save');
    const loadGame = () => setShowSaveLoadModal('load');

    // --- Journal & Location Helpers ---
    const addJournalEntry = (event, details = "") => {
        const entry = {
            turn: logs.length + 1,
            event,
            details,
            timestamp: new Date().toLocaleString('zh-TW')
        };
        setQuestJournal(prev => [...prev, entry]);
    };

    const updateLocation = (newPath) => {
        // newPath can be a string (will replace last) or array (full path)
        if (Array.isArray(newPath)) {
            setCurrentLocation(newPath);
        } else {
            setCurrentLocation(prev => [...prev.slice(0, -1), newPath]);
        }
    };



    useEffect(() => {
        if (party.length > 0 && Object.keys(gameState).length === 0) {
            const initial = {};
            party.forEach(id => {
                const char = agentRoster.find(c => c.id === id);
                initial[id] = { hp: 100, psych: "正常", inventory: [] }; // Initial HP, psych, inventory
            });
            setGameState(initial);
        }
    }, [party, agentRoster, gameState]);

    // Track previous log length to detect new messages
    const prevLogsLength = useRef(0);

    useEffect(() => {
        if (logs.length > prevLogsLength.current) {
            // New message added: Scroll to the start of this new block
            if (lastLogRef.current) {
                lastLogRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            prevLogsLength.current = logs.length;
        }
    }, [logs]);

    // Highlight Dice Rolls parser
    // Highlight Dice Rolls parser & Block Renderer
    const renderTextWithDice = (text) => {
        if (typeof text !== 'string') return null;

        // 1. Header Detection (###)
        if (text.startsWith('###')) {
            return (
                <div className="my-6 pl-4 border-l-4 border-amber-500 bg-gradient-to-r from-amber-900/40 to-transparent py-3 rounded-r-lg">
                    <h3 className="text-amber-100 font-bold text-lg tracking-wide uppercase font-serif drop-shadow-md">
                        {text.replace(/#/g, '').trim()}
                    </h3>
                </div>
            );
        }

        // 1.5 Custom Bracket Headers 【...】
        if (text.startsWith('【') && text.includes('】')) {
            const content = text.replace(/[【】]/g, '').trim();
            // Default Style
            let borderColor = "border-slate-500";
            let textColor = "text-slate-200";
            let bgColor = "bg-slate-800/30";
            let icon = null;

            if (content.includes("行動") || content.includes("Action")) {
                borderColor = "border-amber-500";
                textColor = "text-amber-100";
                bgColor = "bg-amber-950/30";
                icon = "⚔️";
            } else if (content.includes("檢定") || content.includes("Check")) {
                borderColor = "border-cyan-500";
                textColor = "text-cyan-100";
                bgColor = "bg-cyan-950/30";
                icon = "🎲";
            } else if (content.includes("結果") || content.includes("Result")) {
                borderColor = "border-emerald-500";
                textColor = "text-emerald-100";
                bgColor = "bg-emerald-950/30";
                icon = "✨";
            } else if (content.includes("威脅") || content.includes("Threat") || content.includes("警告")) {
                borderColor = "border-rose-500";
                textColor = "text-rose-100";
                bgColor = "bg-rose-950/30 animate-pulse";
                icon = "⚠️";
            }

            return (
                <div className={`my-4 pl-3 pr-4 py-2 border-l-4 ${borderColor} ${bgColor} rounded-r flex items-center gap-2 font-bold font-serif tracking-wide shadow-sm`}>
                    {icon && <span className="opacity-80">{icon}</span>}
                    <span className={textColor}>{content}</span>
                </div>
            );
        }

        // 2. Dice Check Detection (Full Line)
        // Supports: [🎲 Check: D20(x) + y = z | DC n -> Result] AND Unbracketed: -> Check: ...
        const isBracketed = text.trim().startsWith('[🎲') && text.trim().endsWith(']');
        const isLegacyFormat = text.trim().startsWith('->') && text.includes('D20') && (text.includes('DC') || text.includes('AC'));

        if (isBracketed || isLegacyFormat) {
            let rawContent = text;
            if (isBracketed) rawContent = text.replace(/[\[\]]/g, '').replace('🎲', '').trim();
            if (isLegacyFormat) rawContent = text.replace(/^->/, '').trim();

            // Parse Components: "Stealth: D20(5) + 2 = 7 | DC 13"
            // Regex for values.
            // Match: Name, Base, Mod, Total, DC
            // Regex for values.
            // Match: Name, Base, Mod, Total, DC/AC
            const parseRegex = /([^:]+):\s*D20\((\d+)\)\s*(?:[+-]\s*(\d+))?\s*=\s*(\d+)\s*\|\s*(?:DC|AC)\s*(\d+)/i;
            const detailMatch = rawContent.match(parseRegex);

            // Fallback for simple "Total vs DC/AC" format
            const simpleRegex = /(\d+)\s*(?:vs|VS|對抗|\|)\s*(?:DC|AC|難度|防禦)[:\s]*(\d+)/i;
            const simpleMatch = rawContent.match(simpleRegex);

            // Determine Success/Failure from text or math
            const resultMatch = rawContent.match(/(SUCCESS|FAILURE|PASS|FAIL|成功|失敗)$/i);
            const resultStr = resultMatch ? resultMatch[1] : null;
            let isSuccess = false;

            if (resultStr) {
                isSuccess = ["SUCCESS", "PASS", "成功"].includes(resultStr.toUpperCase());
            } else if (simpleMatch) {
                isSuccess = parseInt(simpleMatch[1]) >= parseInt(simpleMatch[2]);
            }

            // Prepare Props for DualDiceRoll
            let playerRoll = { base: 10, mod: 0, total: 10 };
            let target = { dc: 10, label: 'DC' };
            let label = "Check";

            const isAttack = rawContent.includes('AC') || rawContent.includes('Attack') || rawContent.includes('攻擊');
            const targetLabel = isAttack ? 'AC' : 'DC';

            if (detailMatch) {
                label = detailMatch[1].trim();
                playerRoll = {
                    base: parseInt(detailMatch[2]),
                    mod: detailMatch[3] ? parseInt(detailMatch[3]) : 0,
                    total: parseInt(detailMatch[4])
                };
                target = { dc: parseInt(detailMatch[5]), label: targetLabel };
            } else if (simpleMatch) {
                playerRoll = { base: parseInt(simpleMatch[1]), mod: 0, total: parseInt(simpleMatch[1]) };
                target = { dc: parseInt(simpleMatch[2]), label: targetLabel };
            }

            return (
                <div className="my-4 mx-1">
                    <DualDiceRoll
                        playerRoll={playerRoll}
                        target={target}
                        result={isSuccess ? 'Success' : 'Failure'}
                        checkName={label}
                        autoPlay={true} // Force animation on mount
                    />
                </div>
            );
        }

        // 2.5 Damage Dice Detection (Full Line) - [傷害: 1d6+4 = 8] or [Damage: XdY+Z = N]
        if ((text.trim().startsWith('[傷害') || text.trim().toLowerCase().startsWith('[damage')) && text.trim().endsWith(']')) {
            const content = text.replace(/[\[\]]/g, '').trim();
            return (
                <div className="my-3 mx-1 px-4 py-2 bg-rose-950/50 border border-rose-500/40 rounded-lg flex items-center gap-3 group hover:border-rose-500/70 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-rose-900/40 flex items-center justify-center border border-rose-500/30 text-xl shrink-0">
                        ⚔️
                    </div>
                    <span className="text-rose-200 font-mono font-bold tracking-wide">
                        {content}
                    </span>
                </div>
            );
        }

        // 3. Inline Dice Detection (fallback) - also handles inline damage
        const parts = text.split(/(\[🎲[^\]]+\]|\[傷害[^\]]+\]|\[Damage[^\]]+\])/gi);
        return parts.map((part, i) => {
            if (part.startsWith('[🎲') && part.endsWith(']')) {
                return (
                    <span key={i} className="bg-slate-900 text-amber-300 font-mono font-bold px-2 py-1 rounded border border-amber-500/30 mx-1 inline-block text-sm shadow-sm">
                        {part.replace(/[\[\]]/g, '')}
                    </span>
                );
            }
            if ((part.startsWith('[傷害') || part.toLowerCase().startsWith('[damage')) && part.endsWith(']')) {
                return (
                    <span key={i} className="bg-rose-950/60 text-rose-300 font-mono font-bold px-2 py-1 rounded border border-rose-500/30 mx-1 inline-block text-sm shadow-sm">
                        ⚔️ {part.replace(/[\[\]]/g, '')}
                    </span>
                );
            }
            return part;
        });
    };

    // Old scroll logic removed to allow smart scrolling to new content start


    /* ------------------------------------------------------------------------ */
    /* API LOGIC (Turn-Based)                      */
    /* ------------------------------------------------------------------------ */

    // --- MULTI-AGENT ORCHESTRATION ---

    // Agents
    const gmAgent = useMemo(() => new GameMasterAgent(sanitizedApiKey), [sanitizedApiKey]);
    const mapAgent = useMemo(() => new CartographerAgent(sanitizedApiKey), [sanitizedApiKey]);
    const charAgent = useMemo(() => new CharacterManagerAgent(sanitizedApiKey), [sanitizedApiKey]);

    // Memory Service - Tiered memory for story coherence
    const memoryService = useRef(getMemoryService());

    // API Throttler - Prevents rapid consecutive API calls (429 protection)
    const lastApiCallTime = useRef(0);
    const MIN_API_INTERVAL = 1500; // Minimum 1.5 seconds between API calls

    const executeTurn = async (forcePrologue = false) => {
        if (!apiKey) {
            showToast("請先設定 API Key!", "error");
            return;
        }

        if (isGenerating) return;

        // Throttle check - wait if called too quickly
        const now = Date.now();
        const timeSinceLastCall = now - lastApiCallTime.current;
        if (timeSinceLastCall < MIN_API_INTERVAL && lastApiCallTime.current > 0) {
            const waitTime = MIN_API_INTERVAL - timeSinceLastCall;
            console.log(`[Throttle] Waiting ${waitTime}ms before API call...`);
            await new Promise(r => setTimeout(r, waitTime));
        }
        lastApiCallTime.current = Date.now();

        // Security / Validation
        if (!apiKey) {
            showToast("請先輸入有效的 API 金鑰才能開始遊戲！", "error");
            setIsSetup(false);
            return;
        }

        // Validations
        // Validations
        const hasActions = Object.keys(pendingActions).length > 0;
        const isPrologue = (forcePrologue || (logs.length === 0 && !hasActions));

        if (!isPrologue) {
            if (Object.keys(pendingActions).length === 0) {
                showToast("請至少為一名角色下達指令 (或輸入自定義行動)!", "warning");
                return;
            }
        }

        console.log("=== EXECUTE TURN START ===");
        console.log("Pending Actions:", pendingActions);
        console.log("Is Prologue:", isPrologue);

        setIsGenerating(true);
        // Clear old action cache to prevent stale options showing during generation
        // New options will be generated after narrative completes
        setActionCache({});
        // setPendingActions({}); // Don't clear yet, we need to process them

        try {
            // 0. Style Inputs (Character Manager)
            // If styleMode is ON, we rewrite the user inputs to be in character.
            // Result is stored in 'finalActions' map.
            const finalActions = {};
            const actionsToProcess = isPrologue ? {} : pendingActions;

            // Optimistic UI Log (We'll update this after styling)
            // But we can't show "Creating dialogue..." in the log easily without specialized type.
            // Let's just wait for styling to finish (should be fast with flash model).

            if (!isPrologue) {
                for (const [id, actionText] of Object.entries(actionsToProcess)) {
                    // Check if this is a companion action (format: charId_companion)
                    const isCompanionAction = id.endsWith('_companion');
                    const baseCharId = isCompanionAction ? id.replace('_companion', '') : id;

                    if (isCompanionAction) {
                        // Companion actions don't need dialogue styling, pass through directly
                        finalActions[id] = actionText;
                    } else if (styleMode) {
                        const char = agentRoster.find(c => c.id === baseCharId);
                        if (char) {
                            const styled = await charAgent.styleDialogue(char.name, char, actionText, logs.slice(-1)[0]?.content || "");
                            finalActions[id] = styled;
                        } else {
                            finalActions[id] = actionText;
                        }
                    } else {
                        finalActions[id] = actionText;
                    }
                }
            }

            // Clear pending actions now that we have processed them
            setPendingActions({});

            // Construct Narrative Context Input
            const userActionText = Object.entries(finalActions)
                .map(([id, action]) => {
                    // Handle companion action format (charId_companion)
                    if (id.endsWith('_companion')) {
                        const baseCharId = id.replace('_companion', '');
                        const owner = agentRoster.find(c => c.id === baseCharId);
                        const companionName = owner?.companion?.name || 'Companion';
                        return `${companionName}: ${action}`;
                    }
                    return `${agentRoster.find(c => c.id === id)?.name || id}: ${action}`;
                })
                .join("\n") || (forcePrologue ? "(Game Start - Prologue)" : "(No Action)");

            // Log the "Player Action" phase (using styled text)
            if (!isPrologue) {
                const actionLog = {
                    type: 'turn_batch',
                    content: {
                        turns: Object.entries(finalActions).map(([id, act]) => {
                            // Handle companion action format
                            if (id.endsWith('_companion')) {
                                const baseCharId = id.replace('_companion', '');
                                const owner = agentRoster.find(c => c.id === baseCharId);
                                return {
                                    speaker: owner?.companion?.name || 'Companion',
                                    action: act,
                                    isCompanion: true
                                };
                            }
                            return {
                                speaker: agentRoster.find(c => c.id === id)?.name || "Unknown",
                                action: act
                            };
                        })
                    }
                };
                setLogs(prev => [...prev, actionLog]);
            }

            // --- AGENT 1: STORYTELLER ---
            // Build memory context from tiered memory + recent logs
            const recentLogsText = logs.slice(-2).map(l => {
                if (typeof l.content === 'string') return l.content;
                if (l.type === 'trpg_turn') return l.dm_narration || "";
                if (l.content?.turns) return l.content.turns.map(t => t.narration).join(" ");
                return "";
            }).join("\n");

            // Combine memory service context with recent logs
            const memoryContext = memoryService.current.getContextForAI();
            const fullContext = memoryContext
                ? `${memoryContext}\n\n[最新發展]\n${recentLogsText}`
                : recentLogsText;

            const narrativeContext = {
                moduleTitle: selectedModule?.title || "Unknown Adventure",
                currentLocation: Array.isArray(currentLocation) ? currentLocation.join(" > ") : String(currentLocation),
                lastLog: fullContext,
                tone: gameOptions.tone,
                pacing: gameOptions.pacing,
                gmSignals: worldSignals, // Feed previous turn's signals to Story
                mode: gameMode, // 'novel' or 'trpg'
                party: party.map(id => agentRoster.find(c => c.id === id)?.name).filter(Boolean),
                // FAIRNESS: Inject detailed stats
                partyStats: party.map(id => {
                    const char = agentRoster.find(c => c.id === id);
                    if (!char) return "";
                    // Calculate Modifiers: (Score - 10) / 2
                    const getMod = (val) => {
                        const m = Math.floor((val - 10) / 2);
                        return m >= 0 ? `+${m}` : `${m}`;
                    };
                    const s = char.baseStats;
                    return `- ${char.name} (${char.race} ${char.class}): STR${getMod(s.str)} DEX${getMod(s.dex)} CON${getMod(s.con)} INT${getMod(s.int)} WIS${getMod(s.wis)} CHA${getMod(s.cha)}`;
                }).join('\n'),
                // PHASE 2 ENHANCEMENT: Combat-relevant stats for accurate narrative
                partyCombatInfo: party.map(id => {
                    const char = agentRoster.find(c => c.id === id);
                    if (!char) return "";
                    const actions = char.getActions ? char.getActions() : [];
                    const actionListStr = actions.map(a => `${a.name}(${a.hitBonus >= 0 ? '+' : ''}${a.hitBonus}, ${a.damage})`).join(', ') || 'Unarmed Strike';
                    return `- ${char.name}: AC ${char.ac || 10}, DC ${char.spellSaveDC || '-'}, Actions: [${actionListStr}]`;
                }).join('\n'),
                // CRITICAL: Inject Narrative Identity (Bio/Personality)
                partyProfiles: party.map(id => {
                    const char = agentRoster.find(c => c.id === id);
                    if (!char) return "";
                    return `
### ${char.name} (${char.race} ${char.class})
- **Personality**: ${char.personality || "Unknown"}
- **Appearance**: ${char.appearance || "Generic adventurer"}
- **Background**: ${char.bio ? char.bio.slice(0, 150) + "..." : "A mysterious traveler."}
`.trim();
                }).join('\n\n'),
                isPrologue: isPrologue,
                // MODULE PLOT NAVIGATION
                moduleId: selectedModule?.id || null,
                currentAct: currentAct,
                // ENCOUNTER BALANCE: Inject CR guidelines based on party level AND DM persona
                encounterGuidelines: (() => {
                    const partyChars = party.map(id => agentRoster.find(c => c.id === id)).filter(Boolean);
                    if (partyChars.length === 0) return '';
                    const avgLevel = Math.round(partyChars.reduce((sum, c) => sum + (c.level || 3), 0) / partyChars.length);
                    // Use gameOptions.tone for DM persona (guide/arbiter/ruthless in TRPG, relaxed/normal/grim in Novel)
                    return getEncounterGuidelinesWithPersona(avgLevel, partyChars.length, gameOptions.tone);
                })(),
                // DIFFICULTY TIER: Map level to tier for enemy behavior adjustment
                difficultyTier: (() => {
                    const partyChars = party.map(id => agentRoster.find(c => c.id === id)).filter(Boolean);
                    const avgLevel = partyChars.length > 0
                        ? Math.round(partyChars.reduce((sum, c) => sum + (c.level || 3), 0) / partyChars.length)
                        : 3;
                    if (avgLevel <= 4) return '初階 (Beginner)';
                    if (avgLevel <= 7) return '中階 (Intermediate)';
                    return '高階 (Advanced)';
                })(),
            };

            const narrativeResult = await storyAgent.generateNarrative(narrativeContext, userActionText);

            // Handle Token Usage (Supports both string and object return)
            let finalNarrative = "";
            if (typeof narrativeResult === 'object' && typeof narrativeResult.text === 'string') {
                finalNarrative = narrativeResult.text;
                if (narrativeResult.usage) {
                    const turnTokens = narrativeResult.usage.totalTokenCount || 0;
                    setTokenData(prev => ({
                        session: prev.session + turnTokens,
                        lastTurn: turnTokens,
                        total: prev.total + turnTokens
                    }));
                }
            } else if (typeof narrativeResult === 'string') {
                finalNarrative = narrativeResult;
            } else {
                console.warn("Unexpected Narrative Result:", narrativeResult);
                finalNarrative = "(Narrative generation returned empty or invalid data.)";
            }

            // --- AUTOMATED PLOT PROGRESSION ---
            const actMatch = finalNarrative.match(/\[\[ACT_UPDATE:\s*(.+?)\]\]/);
            if (actMatch) {
                const nextActVal = actMatch[1].trim();
                console.log("Act Update Triggered:", nextActVal);

                if (nextActVal === 'END') {
                    showToast("劇情已完結！", "info");
                } else {
                    const nextActNum = parseInt(nextActVal);
                    if (!isNaN(nextActNum) && nextActNum > currentAct) {
                        setCurrentAct(nextActNum);
                        showToast(`進入第 ${nextActNum} 幕`, "info");
                        setLogs(prev => [...prev, {
                            type: 'info',
                            content: `=== 第 ${nextActNum} 幕 ===`
                        }]);
                    }
                }
                // Strip tag
                finalNarrative = finalNarrative.replace(actMatch[0], '');
            }


            // --- PARSING & STATE UPDATES ---
            // The `finalNarrative` variable is already declared above, so we just reassign it here.
            // let finalNarrative = narrativeText; // This line is removed as finalNarrative is already defined
            let tempRoster = [...roster]; // Shared mutable roster for this turn
            let rosterDirty = false;
            let sceneDirty = false;
            let tempScenarioRoster = [...scenarioRoster];

            // --- MEMORY SYSTEM UPDATE ---
            // Add narrative to immediate memory
            memoryService.current.addTurn(finalNarrative);

            // Asynchronously update working memory and extract key events (non-blocking)
            (async () => {
                try {
                    const memoryResult = await mapAgent.generateMemorySummary({
                        narrative: finalNarrative,
                        existingKeyEvents: memoryService.current.longTerm,
                        currentSummary: memoryService.current.working
                    });

                    if (memoryResult.data) {
                        if (memoryResult.data.workingSummary) {
                            memoryService.current.updateWorkingSummary(memoryResult.data.workingSummary);
                        }
                        if (memoryResult.data.newKeyEvents?.length > 0) {
                            memoryService.current.addKeyEvents(memoryResult.data.newKeyEvents);
                            console.log('[Memory] New key events:', memoryResult.data.newKeyEvents);
                        }
                        if (memoryResult.data.characterUpdates) {
                            Object.entries(memoryResult.data.characterUpdates).forEach(([name, status]) => {
                                memoryService.current.updateCharacterState(name, status);
                            });
                        }
                        memoryService.current.save();
                    }
                } catch (e) {
                    console.warn('[Memory] Summary update failed:', e);
                }
            })();

            // --- LOOT SYSTEM ---
            const lootMatch = finalNarrative.match(/\[\[LOOT:\s*(.+?)\]\]/);
            if (lootMatch) {
                const itemName = lootMatch[1].trim();
                console.log(`[Game] Loot Received: ${itemName}`);
                showToast(`🎁 獲得戰利品: ${itemName}`, "success"); // Gold color implied by success or custom? Using success for now.

                // Add to Party Leader (first active member)
                const leaderId = party[0];
                if (leaderId) {
                    setGameState(prev => {
                        const targetState = prev[leaderId] || {};
                        const targetInv = targetState.inventory || { equipment: [], consumables: [], magicItems: [] };

                        // Simple add to 'equipment' for now, or determining type is hard.
                        // We'll add to 'magicItems' if it sounds magical, else 'equipment'.
                        // Heuristic: "Potion", "Scroll" -> Consumable. "Sword", "Armor" -> Equipment.
                        // Default to Equipment.
                        let type = 'equipment';
                        const lower = itemName.toLowerCase();
                        if (lower.includes('potion') || lower.includes('scroll') || lower.includes('藥水') || lower.includes('卷軸')) type = 'consumables';
                        else if (lower.includes('wand') || lower.includes('staff') || lower.includes('ring') || lower.includes('amulet')) type = 'magicItems';

                        return {
                            ...prev,
                            [leaderId]: {
                                ...targetState,
                                inventory: {
                                    ...targetInv,
                                    [type]: [...(targetInv[type] || []), itemName]
                                }
                            }
                        };
                    });
                }
                finalNarrative = finalNarrative.replace(lootMatch[0], '');
            }

            // --- AUDIO SYSTEM (BGM) ---
            const bgmMatch = finalNarrative.match(/\[\[BGM:\s*(.+?)\]\]/);
            if (bgmMatch) {
                const bgmKey = bgmMatch[1].trim().toLowerCase();
                audioManager.current.playBgm(bgmKey);
                setCurrentBgmKey(bgmKey);
                finalNarrative = finalNarrative.replace(bgmMatch[0], '');
            }

            // --- MERCHANT SYSTEM: PURCHASE ---
            // Format: [[購買: 角色名|物品名|價格]]
            const purchaseRegex = /\[\[購買:\s*([^|]+)\|([^|]+)\|(\d+)\]\]/g;
            for (const match of finalNarrative.matchAll(purchaseRegex)) {
                const [fullTag, charName, itemName, priceStr] = match;
                const price = parseInt(priceStr);
                const charIdx = tempRoster.findIndex(c => c.name.includes(charName.trim()));

                if (charIdx !== -1) {
                    const char = { ...tempRoster[charIdx] };
                    const currentGold = char.inventory?.gold ?? char.gold ?? 0;

                    if (currentGold >= price) {
                        // Deduct gold
                        if (char.inventory) {
                            char.inventory = { ...char.inventory, gold: currentGold - price };
                        } else {
                            char.gold = currentGold - price;
                        }
                        // Add item to consumables (simplified)
                        const inv = char.inventory || { equipment: [], consumables: [], magicItems: [] };
                        const lower = itemName.toLowerCase();
                        let type = 'equipment';
                        if (lower.includes('藥水') || lower.includes('卷軸') || lower.includes('口糧') || lower.includes('火把')) type = 'consumables';
                        inv[type] = [...(inv[type] || []), itemName.trim()];
                        char.inventory = inv;

                        tempRoster[charIdx] = char;
                        rosterDirty = true;
                        showToast(`🛒 ${char.name} 購買了 ${itemName.trim()} (-${price}金)`, "success");
                    } else {
                        showToast(`❌ ${char.name} 金幣不足 (需要 ${price}金，擁有 ${currentGold}金)`, "error");
                    }
                }
                finalNarrative = finalNarrative.replace(fullTag, '');
            }

            // --- MERCHANT SYSTEM: SELL ---
            // Format: [[出售: 角色名|物品名|價格]]
            const sellRegex = /\[\[出售:\s*([^|]+)\|([^|]+)\|(\d+)\]\]/g;
            for (const match of finalNarrative.matchAll(sellRegex)) {
                const [fullTag, charName, itemName, priceStr] = match;
                const price = parseInt(priceStr);
                const charIdx = tempRoster.findIndex(c => c.name.includes(charName.trim()));

                if (charIdx !== -1) {
                    const char = { ...tempRoster[charIdx] };
                    // Add gold
                    if (char.inventory) {
                        char.inventory = { ...char.inventory, gold: (char.inventory.gold ?? 0) + price };
                    } else {
                        char.gold = (char.gold ?? 0) + price;
                    }
                    // TODO: Remove item from inventory (complex, skip for now)
                    tempRoster[charIdx] = char;
                    rosterDirty = true;
                    showToast(`💰 ${char.name} 出售了 ${itemName.trim()} (+${price}金)`, "success");
                }
                finalNarrative = finalNarrative.replace(fullTag, '');
            }

            // --- GOLD CHANGE ---
            // Format: [[金幣: 角色名|金額]]
            const goldRegex = /\[\[金幣:\s*([^|]+)\|([+-]?\d+)\]\]/g;
            for (const match of finalNarrative.matchAll(goldRegex)) {
                const [fullTag, charName, amountStr] = match;
                const amount = parseInt(amountStr);
                const charIdx = tempRoster.findIndex(c => c.name.includes(charName.trim()));

                if (charIdx !== -1) {
                    const char = { ...tempRoster[charIdx] };
                    if (char.inventory) {
                        char.inventory = { ...char.inventory, gold: Math.max(0, (char.inventory.gold ?? 0) + amount) };
                    } else {
                        char.gold = Math.max(0, (char.gold ?? 0) + amount);
                    }
                    tempRoster[charIdx] = char;
                    rosterDirty = true;
                    showToast(`🪙 ${char.name} ${amount >= 0 ? '獲得' : '花費'} ${Math.abs(amount)}金`, amount >= 0 ? "success" : "info");
                }
                finalNarrative = finalNarrative.replace(fullTag, '');
            }

            // --- SHORT REST SYSTEM ---
            // Format: [[短休: 角色名]] or [[短休: 全隊]]
            const shortRestMatch = finalNarrative.match(/\[\[短休:\s*(.+?)\]\]/);
            if (shortRestMatch) {
                const target = shortRestMatch[1].trim();
                const isParty = target === '全隊' || target.toLowerCase() === 'all';

                const healChar = (char) => {
                    const level = char.level ?? 3;
                    const conMod = Math.floor(((char.stats?.con ?? char.baseStats?.con ?? 10) - 10) / 2);
                    // Short rest: Heal 1d8 + CON * level (simplified)
                    const healAmount = Math.floor((level * 4.5) + (conMod * level));
                    return {
                        ...char,
                        hp: Math.min(char.maxHp, char.hp + healAmount)
                    };
                };

                if (isParty) {
                    tempRoster = tempRoster.map(char => party.includes(char.id) ? healChar(char) : char);
                    showToast(`☕ 隊伍進行短休，恢復了部分生命值`, "success");
                } else {
                    const charIdx = tempRoster.findIndex(c => c.name.includes(target));
                    if (charIdx !== -1) {
                        tempRoster[charIdx] = healChar(tempRoster[charIdx]);
                        showToast(`☕ ${tempRoster[charIdx].name} 進行短休`, "success");
                    }
                }
                rosterDirty = true;
                finalNarrative = finalNarrative.replace(shortRestMatch[0], '');
            }

            // --- LONG REST SYSTEM ---
            // Format: [[長休: 角色名]] or [[長休: 全隊]]
            const longRestMatch = finalNarrative.match(/\[\[長休:\s*(.+?)\]\]/);
            if (longRestMatch) {
                const target = longRestMatch[1].trim();
                const isParty = target === '全隊' || target.toLowerCase() === 'all';

                const fullHealChar = (char) => {
                    // Long rest: Full HP, reset spell slots
                    return {
                        ...char,
                        hp: char.maxHp,
                        // Reset spell slots to max (based on level)
                        slots: char.maxSlots ? { ...char.maxSlots } : char.slots
                    };
                };

                if (isParty) {
                    tempRoster = tempRoster.map(char => party.includes(char.id) ? fullHealChar(char) : char);
                    showToast(`🏕️ 隊伍進行長休，完全恢復！`, "success");
                } else {
                    const charIdx = tempRoster.findIndex(c => c.name.includes(target));
                    if (charIdx !== -1) {
                        tempRoster[charIdx] = fullHealChar(tempRoster[charIdx]);
                        showToast(`🏕️ ${tempRoster[charIdx].name} 進行長休`, "success");
                    }
                }
                rosterDirty = true;
                finalNarrative = finalNarrative.replace(longRestMatch[0], '');
            }

            // --- RELATIONSHIP SYSTEM ---
            // Format: [[RELATIONSHIP: SourceName|TargetName|Amount|Reason]]
            const relRegex = /\[\[RELATIONSHIP:\s*([^|]+)\|\s*([^|]+)\|\s*([+-]?\d+)\|\s*([^\]]+)\]\]/g;
            for (const match of finalNarrative.matchAll(relRegex)) {
                const [fullTag, sourceName, targetName, amountStr, reason] = match;
                const change = parseInt(amountStr);

                // Find Agents
                const sourceIdx = tempRoster.findIndex(c => c.name.includes(sourceName.trim()));
                const targetIdx = tempRoster.findIndex(c => c.name.includes(targetName.trim()));

                if (sourceIdx !== -1 && targetIdx !== -1) {
                    const sourceChar = tempRoster[sourceIdx];
                    const targetChar = tempRoster[targetIdx];

                    // Hydrate to use method
                    const agent = new CharacterAgent(sourceChar);
                    agent.updateRelationship(targetChar.id, change, reason.trim());

                    // Save back to tempRoster (Instance UI)
                    tempRoster[sourceIdx] = { ...sourceChar, ...agent };
                    rosterDirty = true;

                    // SAVE TO GAMESTATE (Persistence)
                    setGameState(prev => {
                        const targetState = prev[sourceChar.id] || {};
                        const targetRels = targetState.relationships || {};
                        // Note: agent.relationships is the FULL object now.
                        // We can just overwrite it since we hydrated from consistent state?
                        // Wait, agent.relationships comes from sourceChar (from tempRoster), which comes from roster.
                        // If roster wasn't loaded from gameState, we risk overwriting.
                        // Safest: Use the agent's logic which is correct for THIS turn.
                        return {
                            ...prev,
                            [sourceChar.id]: {
                                ...targetState,
                                relationships: agent.relationships
                            }
                        };
                    });

                    // Notification
                    const relStatus = agent.relationships[targetChar.id]?.status || "Neutral";
                    const color = change > 0 ? "success" : "error";
                    showToast(`💞 關係變更: ${sourceChar.name} -> ${targetChar.name} (${change > 0 ? '+' : ''}${change}) [${relStatus}]`, color);
                    console.log(`[Game] Relationship: ${sourceChar.name} -> ${targetChar.name} (${change})`);
                }
                finalNarrative = finalNarrative.replace(fullTag, '');
            }

            // --- XP REWARD SYSTEM ---
            const xpMatch = finalNarrative.match(/\[\[REWARD_XP:\s*(\d+)\]\]/);
            if (xpMatch) {
                const amount = parseInt(xpMatch[1]);
                console.log(`[Game] XP Award: ${amount} to Party`);
                showToast(`✨ 獲得經驗值: ${amount}`, "info");

                // Add to ALL party members
                party.forEach(id => {
                    const idx = tempRoster.findIndex(c => c.id === id);
                    if (idx !== -1) {
                        const charData = tempRoster[idx];
                        // Hydrate to use method for calculation safety
                        const agent = new CharacterAgent(charData);
                        // Just add XP, don't auto-level (LevelUpModal does that)
                        agent.gainXp(amount);

                        tempRoster[idx] = agent.getFullSheet();
                        rosterDirty = true;
                    }
                });

                finalNarrative = finalNarrative.replace(xpMatch[0], '');
            }

            // --- NARRATIVE GROWTH (Noble Mode) ---
            const growthMatch = finalNarrative.match(/\[\[NARRATIVE_GROWTH:\s*(.+?)\]\]/);
            if (growthMatch) {
                const growthDesc = growthMatch[1];
                console.log(`[Game] Narrative Growth: ${growthDesc}`);
                showToast(`角色成長: ${growthDesc}`, "success");

                // Add to ALL party members (as it's usually a group milestone if generated by StoryAgent for now,
                // or we could parse specific names if the tag supported it, but current prompt implies generic)
                // Actually prompt said "Append tag".
                // Let's apply to all active party members for now.
                party.forEach(id => {
                    const idx = tempRoster.findIndex(c => c.id === id);
                    if (idx !== -1) {
                        const charData = tempRoster[idx];
                        const agent = new CharacterAgent(charData);
                        agent.addNarrativeGrowth(growthDesc);
                        tempRoster[idx] = agent.getFullSheet();
                        rosterDirty = true;
                    }
                });

                finalNarrative = finalNarrative.replace(growthMatch[0], '');
            }

            // --- BATTLE MECHANICS (HP & SCENE) ---

            // Initialize Deferred Payload Early
            const pendingPayload = {
                gameState: null,
                scenarioRoster: null,
                actionCache: null,
                roster: null,
            };
            const deferredStateChanges = {}; // Map<id, { hp, status, deathSaves }>

            // 1. HP Updates: [[HP: Name|Amount]] or [[HP: Name|Current/Max]]
            // Format 1: [[HP: Name|+5]] or [[HP: Name|-3]] (change amount)
            // Format 2: [[HP: Name|2/9]] (current/max HP)
            const hpRegex = /\[\[HP:\s*([^|]+)\|\s*([^\]]+)\]\]/g;

            for (const match of finalNarrative.matchAll(hpRegex)) {
                const targetName = match[1].trim();
                const hpValue = match[2].trim();

                // Determine if it's change format (+/-X) or current/max format (X/Y)
                let amount = 0;
                let absoluteHp = null;
                let maxHpUpdate = null;

                if (hpValue.includes('/')) {
                    // Format: current/max (e.g., "2/9")
                    const [current, max] = hpValue.split('/').map(s => parseInt(s.trim()));
                    absoluteHp = current;
                    maxHpUpdate = max;
                } else {
                    // Format: change amount (e.g., "+5" or "-3")
                    amount = parseInt(hpValue);
                }

                // Try Player Roster first
                const agentIdx = tempRoster.findIndex(c => c.name.includes(targetName) || targetName.includes(c.name));
                if (agentIdx !== -1) {
                    const charData = tempRoster[agentIdx];
                    const currentHp = charData.hp !== undefined ? charData.hp : 100;
                    const maxHp = maxHpUpdate || charData.maxHp || 100;

                    // Calculate new HP based on format
                    let newHp;
                    if (absoluteHp !== null) {
                        newHp = absoluteHp;
                    } else {
                        newHp = Math.min(maxHp, Math.max(0, currentHp + amount));
                    }

                    // --- DEATH & DYING LOGIC ---
                    let statusUpdate = {};
                    if (newHp <= 0) {
                        if (gameMode === GAME_MODES.TRPG) {
                            statusUpdate = { status: 'unconscious' };
                            deferredStateChanges[charData.id] = {
                                ...(deferredStateChanges[charData.id] || {}),
                                hp: 0,
                                status: 'unconscious',
                                deathSaves: (deferredStateChanges[charData.id]?.deathSaves || { successes: 0, failures: 0 })
                            };
                            showToast(`${charData.name} 已陷入昏迷！ (Unconscious)`, "error");
                        } else {
                            statusUpdate = { status: 'injured' };
                            showToast(`${charData.name} 受了重傷！ (Injured)`, "warning");
                        }
                    } else {
                        if (charData.status === 'unconscious' || charData.status === 'dead' || charData.status === 'injured') {
                            statusUpdate = { status: 'active', deathSaves: undefined };
                            deferredStateChanges[charData.id] = {
                                ...(deferredStateChanges[charData.id] || {}),
                                status: 'active',
                                hp: newHp,
                                deathSaves: null
                            };
                            showToast(`${charData.name} 恢復了意識！`, "success");
                        }
                    }

                    tempRoster[agentIdx] = {
                        ...charData,
                        hp: newHp,
                        ...(maxHpUpdate ? { maxHp: maxHpUpdate } : {}),
                        ...statusUpdate
                    };
                    rosterDirty = true;

                    deferredStateChanges[charData.id] = {
                        ...(deferredStateChanges[charData.id] || {}),
                        hp: newHp,
                        ...statusUpdate
                    };
                } else {
                    // Try Scenario Roster (enemies/NPCs)
                    const sceneIdx = tempScenarioRoster.findIndex(c => c.name.includes(targetName) || targetName.includes(c.name));
                    if (sceneIdx !== -1) {
                        const actor = tempScenarioRoster[sceneIdx];

                        let newHp;
                        let newMaxHp = maxHpUpdate || actor.maxHp || 100;

                        if (absoluteHp !== null) {
                            newHp = absoluteHp;
                        } else {
                            newHp = Math.min(newMaxHp, Math.max(0, (actor.hp || 0) + amount));
                        }

                        // Remove dead enemies from roster
                        if (newHp <= 0) {
                            console.log(`[HP Update] ${actor.name} defeated (HP 0), removing from Scene Actors`);
                            tempScenarioRoster.splice(sceneIdx, 1);
                            showToast(`💀 ${actor.name} 已被擊敗！`, "success");
                        } else {
                            tempScenarioRoster[sceneIdx] = { ...actor, hp: newHp, maxHp: newMaxHp };
                        }
                        sceneDirty = true;
                    }
                }
                finalNarrative = finalNarrative.replace(match[0], '');
            }

            // 1.5 Death Saving Throw Parsing (Strict Dice Format)
            // Format: [🎲 Death Save: D20(Roll) ...]
            const deathSaveRegex = /\[🎲\s*(?:Death|Save|瀕死|救)[^\]]*:\s*D20\((\d+)\)/gi;
            for (const match of finalNarrative.matchAll(deathSaveRegex)) {
                // Determine who made the save?
                // We rely on the context or just check who was active?
                // Actually the dice roll usually is generic.
                // BUT, in my simplified turn system, I only process ONE character's action at a time usually?
                // Or I can look for the character name nearby?
                // Let's assume the ACTIVE character (the one who acted) is the owner.
                // However, 'activeCharacter' generic variable isn't readily available in this scope easily without parsing text.
                // Improved Regex: Look for speaker in line? No.

                // Hack: We scan the roster for whoever is currently at <= 0 HP.
                // If multiple are down, this might be ambiguous if multiple rolls happen.
                // But usually 1 turn = 1 char action.

                const roll = parseInt(match[1]);
                // Find visible dying characters
                const dyingAgentIdx = tempRoster.findIndex(c => (c.hp <= 0 && (!c.deathSaves || c.deathSaves.failures < 3)));

                // If found, apply to the FIRST dying agent found. (Good enough for single player control usually)
                if (dyingAgentIdx !== -1) {
                    const agent = tempRoster[dyingAgentIdx];
                    let { successes = 0, failures = 0 } = agent.deathSaves || {};
                    let hp = agent.hp;
                    let msg = "";

                    if (roll === 20) {
                        hp = 1;
                        successes = 0;
                        failures = 0;
                        msg = "Critical Success! Regained Consciousness.";
                    } else if (roll === 1) {
                        failures += 2;
                        msg = "Critical Failure! Two failures.";
                    } else if (roll >= 10) {
                        successes += 1;
                        msg = "Success.";
                    } else {
                        failures += 1;
                        msg = "Failure.";
                    }

                    // Check State
                    if (failures >= 3) {
                        // DEAD
                        msg += " (DEAD)";
                    } else if (successes >= 3) {
                        // STABLE
                        hp = 0; // Remain at 0 but stable logic? 5e says 0 HP is stable?
                        // Actually stable means stop rolling but still 0.
                        // For simplicity, let's keep them at 0.
                        successes = 0; failures = 0; // Reset or keep? Reset usually ends loop.
                        msg += " (Stable)";
                    }

                    tempRoster[dyingAgentIdx] = {
                        ...agent,
                        hp,
                        deathSaves: { successes, failures }
                    };

                    // DEFERRED UPDATE:
                    deferredStateChanges[agent.id] = {
                        ...(deferredStateChanges[agent.id] || {}),
                        hp,
                        deathSaves: { successes, failures }
                    };

                    rosterDirty = true;
                    showToast(`${agent.name}: Death Save ${roll} -> ${msg}`, roll >= 10 ? "success" : "error");
                }
            }

            // 2. Scene Updates: [[SCENE_UPDATE: ...]] or [[場景更新: ...]]
            // Support multiple tags and both English/Chinese labels
            const sceneUpdateRegex = /\[\[(SCENE_UPDATE|場景更新):\s*(.+?)\]\]/g;
            const sceneMatches = [...finalNarrative.matchAll(sceneUpdateRegex)];

            for (const sceneMatch of sceneMatches) {
                const commands = sceneMatch[2];

                // Parse "Add(Name, HP, Type)" or "新增(Name, HP, Type)"
                const addRegex = /(?:Add|新增)\(([^,]+),\s*(\d+),\s*([^)]+)\)/g;
                for (const match of commands.matchAll(addRegex)) {
                    const [_, name, hp, type] = match;
                    const cleanName = name.trim();

                    // Skip if this is a party member (check by name - comprehensive matching)
                    const partyNames = tempRoster.filter(c => party.includes(c.id)).map(c => c.name);
                    const normalizedCleanName = cleanName.replace(/[·•．]/g, '').toLowerCase();
                    const isPartyMember = partyNames.some(pName => {
                        const normalizedPartyName = pName.replace(/[·•．]/g, '').toLowerCase();
                        const pNameFirst = pName.split(/[·•．\s]/)[0];
                        const cleanNameFirst = cleanName.split(/[·•．\s]/)[0];
                        return (
                            cleanName.includes(pNameFirst) ||
                            pName.includes(cleanNameFirst) ||
                            cleanName === pName ||
                            normalizedCleanName.includes(normalizedPartyName) ||
                            normalizedPartyName.includes(normalizedCleanName)
                        );
                    });
                    if (isPartyMember) {
                        console.log(`[SceneUpdate] Skipping party member: ${cleanName}`);
                        continue;
                    }

                    // Generate Unique Name
                    const uniqueName = getUniqueEnemyName(cleanName, tempScenarioRoster);

                    if (!tempScenarioRoster.some(c => c.name === uniqueName)) {
                        // Normalize Chinese types to English for consistent display
                        const rawType = type.trim();
                        let normalizedType = rawType;
                        if (rawType === '敵人') normalizedType = 'Enemy';
                        else if (rawType === '盟友') normalizedType = 'Ally';
                        else if (rawType === 'NPC' || rawType === '中立') normalizedType = 'NPC';

                        tempScenarioRoster.push({
                            name: uniqueName,
                            hp: parseInt(hp),
                            maxHp: parseInt(hp),
                            type: normalizedType,
                            id: `npc-${Date.now()}-${Math.random()}`
                        });
                        sceneDirty = true;
                    }

                }

                // Parse "Remove(Name)" or "移除(Name)"
                const removeRegex = /(?:Remove|移除)\(([^)]+)\)/g;
                for (const match of commands.matchAll(removeRegex)) {
                    const name = match[1].trim();
                    tempScenarioRoster = tempScenarioRoster.filter(c => !c.name.includes(name));
                    sceneDirty = true;
                }

                // Parse "Clear" or "清空"
                if (commands.includes("Clear") || commands.includes("清空")) {
                    tempScenarioRoster = [];
                    sceneDirty = true;
                }
            }

            // Remove all SCENE_UPDATE tags from narrative
            finalNarrative = finalNarrative.replace(sceneUpdateRegex, '');

            // 3. Group Decision: [[DECISION: OpA | OpB]]
            const decisionRegex = /\[\[DECISION:\s*(.+?)\]\]/;
            const decisionMatch = finalNarrative.match(decisionRegex);
            if (decisionMatch) {
                const rawOptions = decisionMatch[1].split('|').map(s => s.trim());
                if (rawOptions.length > 0) {
                    // Set for next render
                    setGroupDecisionOptions(rawOptions);
                }
                finalNarrative = finalNarrative.replace(decisionRegex, '');
            } else {
                setGroupDecisionOptions([]); // Clear if no decision this turn
            }

            // Batched Updates
            // -------------------------------------------------------------------------
            // 3. START NARRATIVE & PREPARE DEFERRED UPDATES
            // -------------------------------------------------------------------------
            setIsNarrating(true);
            setIsNarrativeComplete(false);

            // Handle different output formats
            const narrativeLog = gameMode === 'trpg'
                ? { type: 'trpg_narrative', content: finalNarrative }
                : { type: 'narrative', content: finalNarrative };
            setLogs(prev => [...prev, narrativeLog]);

            // Initialize Deferred Payload (Moved Up)


            const narrativeText = typeof narrativeResult === 'string'
                ? narrativeResult
                : narrativeResult.dm_narration || "";

            // --- AGENT 2: GAME MASTER (Mechanics) ---
            const gmContext = {
                narrative: narrativeText,
                level: gameOptions.startLevel || 1,
                partyStatus: party.map(id => ({
                    id,
                    name: agentRoster.find(c => c.id === id)?.name,
                    hp: gameState[id]?.hp
                })),
                moduleId: selectedModule?.id || null,
                currentAct: currentAct,
                // LOOT SYSTEM: Inject loot guidelines based on party level and classes
                lootGuidelines: (() => {
                    const partyChars = party.map(id => agentRoster.find(c => c.id === id)).filter(Boolean);
                    if (partyChars.length === 0) return '';
                    const avgLevel = Math.round(partyChars.reduce((sum, c) => sum + (c.level || 3), 0) / partyChars.length);
                    const partyClasses = partyChars.map(c => c.class);
                    return getLootGuidelines(avgLevel, partyClasses, 'combat');
                })(),
            };

            const { data: mechanicsData, usage: gmUsage } = await gmAgent.analyzeState(gmContext);
            if (gmUsage) updateTokenCount(gmUsage);

            const newSignals = mechanicsData.signals || { threat_level: "None", pacing_signal: "Build-up", mechanical_opportunity: "None" };
            setWorldSignals(newSignals);

            // --- AGENT 4 (PART 1): HP UPDATE (DEFERRED) ---
            if (mechanicsData.hp_updates) {
                const updates = mechanicsData.hp_updates;
                // Defer GameState Update
                // Defer GameState Update (Merging both Regex and Agent Updates)
                pendingPayload.gameState = (prev) => {
                    const nextState = { ...prev };

                    // 1. Apply Regex Updates first
                    Object.entries(deferredStateChanges).forEach(([id, changes]) => {
                        nextState[id] = { ...nextState[id], ...changes };
                        // Handle removal of deathSaves if undefined
                        if (changes.deathSaves === undefined && changes.status === 'active') {
                            const { deathSaves, ...rest } = nextState[id];
                            nextState[id] = rest;
                        }
                    });

                    // 2. Apply Agent Updates
                    Object.entries(updates).forEach(([name, change]) => {
                        const targetId = Object.keys(nextState).find(key => {
                            const charName = agentRoster.find(c => c.id === key)?.name;
                            return charName && (charName === name || charName.includes(name));
                        });

                        if (targetId && nextState[targetId]) {
                            let newHp = Math.max(0, Math.min(nextState[targetId].maxHp, nextState[targetId].hp + change));
                            nextState[targetId] = {
                                ...nextState[targetId],
                                hp: newHp,
                                status: newHp === 0 ? (gameMode === GAME_MODES.TRPG ? 'unconscious' : 'injured') : 'healthy'
                            };
                        }
                    });
                    return nextState;
                };

                // Defer Scenario Roster Update
                pendingPayload.scenarioRoster = tempScenarioRoster.map(actor => {
                    const updateEntry = Object.entries(updates).find(([name, change]) =>
                        actor.name === name || actor.name.includes(name) || name.includes(actor.name)
                    );
                    if (updateEntry) {
                        const change = updateEntry[1];
                        return { ...actor, hp: Math.max(0, (actor.hp || 0) + change) };
                    }
                    return actor;
                });
            } else if (sceneDirty) {
                // If no HP updates but scene added/removed, capture that
                pendingPayload.scenarioRoster = tempScenarioRoster;
            }

            // --- LOOT PROCESSING (DEFERRED) ---
            if (mechanicsData.loot && mechanicsData.loot.length > 0) {
                // We must use a separate tempRoster logic
                let lootRoster = [...agentRoster];
                let rosterChanged = false;
                const lootLogs = [];

                mechanicsData.loot.forEach(item => {
                    let targetChar = null;
                    if (item.isQuestItem) targetChar = lootRoster.find(c => c.id === party[0]);
                    else if (item.targetCharacter) targetChar = lootRoster.find(c => c.name.includes(item.targetCharacter));
                    else if (item.type === 'weapon' || item.type === 'armor') {
                        targetChar = lootRoster.find(c => {
                            if (item.type === 'armor' && item.name.includes('Plate') && (c.class === 'Paladin' || c.class === 'Fighter')) return true;
                            return false;
                        });
                    }
                    if (!targetChar) targetChar = lootRoster[Math.floor(Math.random() * lootRoster.length)];

                    if (targetChar) {
                        const charIndex = lootRoster.findIndex(c => c.id === targetChar.id);
                        if (charIndex !== -1) {
                            const updatedChar = { ...lootRoster[charIndex] };
                            updatedChar.inventory = [...(updatedChar.inventory || []), item.isQuestItem ? `★ ${item.name}` : item.name];
                            lootRoster[charIndex] = updatedChar;
                            rosterChanged = true;
                            lootLogs.push(`${updatedChar.name} received ${item.name}`);
                        }
                    }
                });

                if (rosterChanged) pendingPayload.roster = lootRoster;
                if (lootLogs.length > 0) {
                    setLogs(prev => [...prev, { type: 'system', content: `📦 **Loot**: ${lootLogs.join(', ')}` }]);
                }
            } else if (rosterDirty) {
                pendingPayload.roster = tempRoster;
            }

            // --- AGENT 3: CARTOGRAPHER ---
            const mapContext = {
                narrative: narrativeText, currentLocation,
                turnCount: logs.length + 1, signals: newSignals,
                moduleId: selectedModule?.id, currentAct
            };
            const { data: journalResult, usage: mapUsage } = await mapAgent.updateJournal(mapContext);
            if (mapUsage) updateTokenCount(mapUsage);

            const newMapLocation = journalResult.location && Array.isArray(journalResult.location) ? journalResult.location : currentLocation;
            if (journalResult.location) setCurrentLocation(journalResult.location); // Immediate Map Update (Header)

            // --- AGENT 4 (PART 2): OPTION GENERATION ---
            // IMPORTANT: Use finalNarrative (processed with battle summary) not raw narrativeText
            if (!isPrologue || forcePrologue) {
                setIsPreGenerating(true);
                const { results: nextOptions, usage: charUsage } = await charAgent.generateOptions(
                    agentRoster.filter(c => party.includes(c.id)),
                    { location: newMapLocation.join(" > "), time: "N/A" },
                    finalNarrative, // Use finalNarrative for complete context including battle summary
                    mechanicsData.hp_updates ? "Outcome processed" : "Nothing happened",
                    newSignals,
                    selectedModule?.id || null,
                    currentAct
                );
                if (charUsage) updateTokenCount(charUsage);

                // Option Processing & Dedup
                const processedOptions = [];
                const processedCharIds = new Set();

                nextOptions.forEach(opt => {
                    const charId = opt.characterId || opt.id;
                    const char = agentRoster.find(c => c.id == charId);
                    if (!char) return;

                    // Simple HP Check (Current State) - Approximation OK for options
                    const hp = gameState[char.id]?.hp ?? char.hp;
                    if (hp <= 0) {
                        // Allow CharacterManagerAgent's generated "Downed" options to pass through
                        // But also ensure "Death Saving Throw" is available as a mechanic fallback if not present
                        if (!processedCharIds.has(charId)) {
                            // Check if AI generated "Downed" options? It should have.
                            // But adding explicit Death Save is still good for mechanics.
                            // Let's MERGE them or PREPEND the mechanic action.
                            const deathSaveOption = {
                                id: `${charId}-death-save-mechanic`,
                                label: "💀 瀕死檢定 (Death Save)",
                                type: "action",
                                characterId: charId,
                                text: "makes a Death Saving Throw.",
                                monologue: "(瀕死掙扎...)"
                            };
                            // Start with AI options, but ensure death save is an option or the default if AI failed
                            // Actually, CharacterManagerAgent now generates "Downed" options.
                            // Let's just push the AI options. The AI prompt was updated to handle this.
                            // We don't need to force override unless AI failed.
                            processedOptions.push(opt);
                            processedCharIds.add(charId);
                        }
                    } else {
                        processedOptions.push(opt);
                    }
                });

                const optionsMap = {};
                processedOptions.forEach(opt => { if (opt.id) optionsMap[opt.id] = opt; });

                // DEFER ACTION CACHE
                pendingPayload.actionCache = optionsMap;

                // DEFER MONOLOGUES
                const monologues = {};
                processedOptions.forEach(opt => { if (opt.characterId && opt.monologue) monologues[opt.characterId] = opt.monologue; });

                if (Object.keys(monologues).length > 0) {
                    // Merge with existing roster pending update or create new
                    const baseRoster = pendingPayload.roster || agentRoster;
                    pendingPayload.roster = baseRoster.map(char => {
                        if (monologues[char.id]) return { ...char, innerMonologue: monologues[char.id] };
                        return char;
                    });
                }
            }

            // FINALIZE EXECUTE TURN
            setPendingTurnUpdates(pendingPayload);
            setIsPreGenerating(false);

        } catch (error) {
            console.error("Multi-Agent Error:", error);
            setLogs(prev => [...prev, { type: 'narrative', content: `(System Error: ${error.message})` }]);
            setIsPreGenerating(false);
            setIsNarrating(false);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleNarrativeComplete = () => {
        setIsNarrativeComplete(true);
        if (pendingTurnUpdates) {
            console.log("Applying Deferred Updates:", pendingTurnUpdates);
            if (pendingTurnUpdates.gameState) setGameState(pendingTurnUpdates.gameState);
            if (pendingTurnUpdates.scenarioRoster) setScenarioRoster(pendingTurnUpdates.scenarioRoster);
            if (pendingTurnUpdates.roster) setRoster(pendingTurnUpdates.roster);
            if (pendingTurnUpdates.actionCache) setActionCache(pendingTurnUpdates.actionCache);

            setPendingTurnUpdates(null);
            setIsNarrating(false);
        }
    };


    // --- INTRO GENERATION ---
    const generateIntro = () => {
        setLogs([]);
        setQuestJournal([]); // Clear quest journal for new game
        setScenarioRoster([]); // Clear existing enemies/NPCs
        setPendingActions({});
        if (memoryService.current) memoryService.current.reset(); // Reset persistent memory
        setTimeout(() => executeTurn(true), 100);
    };

    const startGame = () => {
        // 1. Reset Game State to Defaults for a clean start
        setLogs([]); // Clear previous story logs
        setQuestJournal([]); // Clear journal
        setQuestLog([]); // Clear active quests
        setCurrentLocation(selectedModule?.location || ["未知區域"]); // Reset location to module start or default
        setCurrentAct(1); // Reset Act
        setIsPreGenerating(false);
        setPendingActions({});
        if (memoryService.current) memoryService.current.reset(); // Reset persistent memory

        // 2. Initialize Character State
        const initialGameState = {};
        party.forEach(id => {
            const char = roster.find(c => c.id === id);
            if (!char) {
                console.warn(`[StartGame] Party member ID ${id} not found in Roster. Skipping.`);
                return;
            }

            // Safety check for class mapping
            const cleanClass = char.class ? char.class.split('/')[0].trim() : 'Fighter';
            // Start with base kit
            const baseKit = STARTING_KITS[char.class] || STARTING_KITS[cleanClass] || { equipment: [], consumables: [], magicItems: [] };

            // Clone the kit to avoid mutating the const
            const kit = {
                equipment: [...(baseKit.equipment || [])],
                consumables: [...(baseKit.consumables || [])],
                magicItems: [...(baseKit.magicItems || [])]
            };

            // Merge Kit into Character Data for scaling
            const charWithKit = {
                ...char,
                equipment: [...(char.equipment || []), ...kit.equipment],
                consumables: [...(char.consumables || []), ...kit.consumables],
                magicItems: [...(char.magicItems || []), ...kit.magicItems],
                gold: (char.gold || 0)
            };

            // SCALE CHARACTER TO START LEVEL
            const scaledChar = scaleCharacter(charWithKit, level);

            // We use CharacterAgent to calculate the correct MaxHP/Stats using the scaled data
            // ensure the agent has the updated properties
            const tempAgent = new CharacterAgent(scaledChar);
            const scaledMaxHp = tempAgent.maxHp;

            initialGameState[id] = {
                hp: scaledMaxHp,
                maxHp: scaledMaxHp,
                level: scaledChar.level, // Persist the chosen start level
                gold: scaledChar.gold,
                psych: "平穩",
                inventory: {
                    consumables: scaledChar.consumables || [],
                    magicItems: scaledChar.magicItems || [],
                    equipment: scaledChar.equipment || []
                },
                relationships: {}
            };
        });
        setGameState(initialGameState);

        // 3. Clear Scene Enemies
        setScenarioRoster([]);

        setView('game');
        generateIntro();
    };

    // --- REGENERATE OPTIONS HANDLER ---
    const handleRegenerateOptions = async (char) => {
        if (!char || !apiKey) return;

        setIsPreGenerating(true);
        showToast(`重新生成 ${char.name} 的行動選項...`, 'info');

        try {
            // Context from current state
            const currentC = Array.isArray(currentLocation) ? currentLocation.join(" > ") : String(currentLocation);
            const narrText = logs.slice(-3).map(l => typeof l.content === 'string' ? l.content : "").join("\n");

            const { results: newOptions, usage: charUsage } = await charAgent.generateOptions(
                [char], // Only for this char
                { location: currentC, time: "N/A" },
                narrText,
                "Regenerate Request",
                worldSignals,
                selectedModule?.id || null,
                currentAct
            );
            if (charUsage) updateTokenCount(charUsage);

            // Merge into cache
            setActionCache(prev => {
                const next = { ...prev };
                // Remove old options for this char (heuristic: id starts with char.id)
                Object.keys(next).forEach(k => {
                    if (k.startsWith(char.id)) delete next[k];
                });

                // Add new
                newOptions.forEach(opt => {
                    next[opt.id] = opt;
                });
                return next;
            });

            // Update Monologue if present
            if (newOptions.length > 0 && newOptions[0].monologue) {
                setRoster(prev => prev.map(c =>
                    c.id === char.id ? { ...c, innerMonologue: newOptions[0].monologue } : c
                ));
            }

            showToast("行動選項已更新", "success");

        } catch (e) {
            console.error("Regenerate Error:", e);
            showToast("生成失敗，請稍後再試", "error");
        } finally {
            setIsPreGenerating(false);
        }
    };


    // --- LEVEL UP HANDLER ---
    const handleLevelUpConfirm = (choice) => {
        if (!levelUpTarget) return;

        console.log(`[Level Up] ${levelUpTarget.name} chose`, choice);

        // 1. Apply changes to Agent
        const agent = levelUpTarget;
        agent.levelUp(choice); // Apply basic stats/feats

        // Apply Hardcoded Class Features
        // choice.features comes from the new hybrid planLevelUp in CharacterManagerAgent
        if (choice.features && Array.isArray(choice.features)) {
            choice.features.forEach(featName => {
                if (!agent.feats.includes(featName)) {
                    agent.feats.push(featName);
                }
            });
        }

        // 3. Update State
        setGameState(prev => ({
            ...prev,
            [levelUpTarget.id]: {
                ...prev[levelUpTarget.id],
                maxHp: agent.maxHp,
                hp: agent.hp // Heals on level up
            }
        }));

        // 4. Close Modal
        setLevelUpTarget(null);

        // 5. Toast
        const featureMsg = (choice.features && choice.features.length > 0) ? `獲得能力: ${choice.features.join(", ")}` : "";
        const asiMsg = choice.type === 'feat' ? `習得專長: ${choice.value}` : (choice.type === 'asi' ? '提升了屬性' : '');

        setLogs(prev => [...prev, {
            type: 'info',
            content: `${levelUpTarget.name} 升級到了 Level ${agent.level}! ${featureMsg} ${asiMsg}`
        }]);
    };

    /* ------------------------------------------------------------------------ */
    /* HOOKS & EFFECT                              */
    /* ------------------------------------------------------------------------ */

    const renderSetup = () => (
        <div className="flex flex-col items-center justify-center h-full p-8 space-y-12 animate-in fade-in duration-700 overflow-y-auto bg-[url('https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center box-border relative">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />

            <div className="relative z-10 text-center space-y-6">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-pulse">
                    <Ghost className="w-16 h-16 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                </div>
                <div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 drop-shadow-sm mb-2">
                        被遺忘的編年史
                    </h1>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto" />
                </div>
                <p className="text-slate-400 text-xl font-light tracking-wide">無限傳奇：專屬於你的奇幻冒險篇章</p>
            </div>

            <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl transition-all hover:border-amber-500/30">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                    Google Gemini API Key
                </label>
                <p className="text-slate-600 text-xs mb-3 ml-1">
                    免費取得：
                    <a
                        href="https://aistudio.google.com/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-500 underline ml-1"
                    >
                        aistudio.google.com/apikey ↗
                    </a>
                </p>
                <div className="flex gap-2 mb-4">
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="flex-1 bg-slate-950/50 border border-slate-700 text-amber-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-slate-700"
                        placeholder="貼上您的 API Key..."
                    />
                </div>
                {!apiKey && (
                    <div className="text-xs text-amber-600/80 bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mb-4">
                        💡 API Key 會安全儲存在您的瀏覽器中，不會傳送到任何伺服器。
                    </div>
                )}
                <button
                    onClick={() => apiKey && setView('modules')}
                    disabled={!apiKey}
                    className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-900/50 hover:-translate-y-0.5"
                >
                    <span className="flex items-center justify-center gap-2">
                        進入領域 <ChevronRight size={18} />
                    </span>
                </button>

                <button
                    onClick={loadGame}
                    className="w-full mt-3 bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-amber-500 font-medium py-3 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                >
                    讀取進度
                </button>
            </div>
        </div>
    );

    const renderModeSelect = () => (
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
                            // Reset tone to default for that mode to ensure UI consistency
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
                        {/* Options Swapper */}
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
                                icon: <Scale size={16} />, // Need to import Scale? Use Shield for now if Scale not available, or add import.
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

            {/* divider */}
            <div className="w-full border-t border-slate-800 mb-10 flex items-center justify-center">
                <span className="bg-[#0f172a] px-4 text-slate-500 text-xs font-bold uppercase tracking-widest -mt-2">READY TO START</span>
            </div>

            {/* 3. Launch Button (Unified) */}
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




    const renderModuleSelection = () => {
        const categories = [
            { id: 'beginner', title: "初階任務 (Beginner)", subtitle: "適合新手，開啟你的傳奇", startLevel: 3, color: "text-emerald-400", border: "border-emerald-500/30" },
            { id: 'intermediate', title: "中階任務 (Intermediate)", subtitle: "更致命的挑戰，更複雜的劇情", startLevel: 5, color: "text-amber-400", border: "border-amber-500/30" },
            { id: 'advanced', title: "高階任務 (Advanced)", "subtitle": "傳奇英雄的試煉，死亡如影隨形", startLevel: 8, color: "text-red-400", border: "border-red-500/30" },
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
                        // Merge built-in and custom modules
                        const catModules = [...MODULES, ...customModules].filter(m => m.category === cat.id);

                        // Always show 'Custom' category to allow creation, otherwise hide empty cats
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
                                    {/* Create New Card for Custom Category */}
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
                                                    {/* Category Symbol Replaces ID */}
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

    const renderRoster = () => (
        <div className="h-full flex flex-col p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-6 shrink-0 z-10">
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => setView('modules')}
                        className="text-slate-500 hover:text-slate-300 flex items-center gap-2 uppercase tracking-widest text-xs font-bold transition-colors mb-2"
                    >
                        <ChevronRight className="rotate-180" size={14} /> 回上一頁 (BACK)
                    </button>
                    <h2 className="text-3xl font-serif text-amber-500 tracking-wide drop-shadow-md">集結隊伍 <span className="text-lg text-slate-500 align-middle ml-2 font-sans">({party.length}/6)</span></h2>
                </div>
                <div className="flex items-center gap-4">
                    {/* START LEVEL: Default 3, UI removed as requested */}



                    {/* Reset Roster Button */}



                    <button
                        onClick={() => setView('mode_select')}
                        disabled={party.length === 0}
                        className="bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 px-8 py-2 rounded font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(217,119,6,0.5)] disabled:shadow-none hover:scale-105 active:scale-95"
                    >
                        <Sword size={20} /> 下一步：選擇模式
                    </button>
                </div>
            </div>

            {roster.length === 0 && (
                <div className="p-8 text-center text-red-500 font-bold border-2 border-red-500/50 rounded bg-red-900/10 backdrop-blur">
                    警告：角色名冊為空 (Roster is empty)
                </div>
            )}

            {/* Roster Grid - Text Only Mode */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 overflow-y-auto pb-24 pr-2">
                {/* Create New Character Card */}
                <div
                    onClick={() => setShowCreator(true)}
                    className="
                        min-h-[16rem] rounded border border-dashed border-slate-700 hover:border-amber-500
                        bg-slate-900/30 hover:bg-slate-800/50 cursor-pointer transition-all group flex flex-col items-center justify-center gap-3
                        backdrop-blur-sm
                    "
                >
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-amber-500/20 text-slate-600 group-hover:text-amber-500 transition-colors">
                        <Plus size={24} />
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest group-hover:text-amber-500">New Character</span>
                </div>

                {agentRoster.map((agent) => {
                    const isSelected = party.includes(agent.id);
                    const charData = agent.getCardData();
                    const stats = charData.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

                    return (
                        <div
                            key={agent.id}
                            onClick={() => {
                                if (isSelected) {
                                    setParty(prev => prev.filter(id => id !== agent.id));
                                } else {
                                    if (party.length < 6) {
                                        setParty(prev => [...prev, agent.id]);
                                    }
                                }
                            }}
                            className={`
                                relative p-4 rounded border cursor-pointer transition-all group flex flex-col justify-between min-h-[16rem]
                                hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md
                                ${isSelected
                                    ? 'bg-amber-950/20 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50'
                                    : 'bg-slate-900/40 border-slate-800 hover:border-amber-500/30 hover:bg-slate-800/60'}
                            `}
                        >
                            <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative shadow-inner group-hover:shadow-[0_0_15px_rgba(251,191,36,0.1)] transition-all">
                                <img
                                    src={charData.avatar || charData.avatarUrl || ''}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-normal opacity-90 group-hover:opacity-100"
                                    alt={charData.name}
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>

                                {/* Class Icon / Overlay? Optional */}
                            </div>

                            {/* Card Header & Controls */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className={`font-serif font-bold truncate text-base tracking-wide ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                                        {charData.name}
                                    </h4>

                                    {/* Settings & Auto Toggle */}
                                    <div className="flex items-center gap-2 relative z-20">
                                        <Settings
                                            size={14}
                                            className="text-slate-600 hover:text-amber-500 transition-colors cursor-pointer"
                                            onClick={(e) => { e.stopPropagation(); setActiveModalChar(agent); }}
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleControlMode(agent.id);
                                            }}
                                            className={`
                                                flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-all border shadow-sm
                                                ${agent.controlMode === 'auto'
                                                    ? 'bg-amber-900/80 text-amber-500 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)] hover:bg-amber-900'
                                                    : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'}
                                            `}
                                            title="點擊切換控制模式 (Click to Toggle AI)"
                                        >
                                            {agent.controlMode === 'auto' ? (
                                                <><Bot size={12} className="shrink-0" /> <span className="text-[9px] font-bold uppercase tracking-wider">Auto</span></>
                                            ) : (
                                                <><User size={12} className="shrink-0" /> <span className="text-[9px] font-bold uppercase tracking-wider">Manual</span></>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Race / Class - Bigger Font */}
                                <div className={`text-sm font-serif font-bold mb-3 truncate border-b border-slate-800/50 pb-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                                    {charData.race} <span className="text-amber-700 mx-1">/</span> {charData.class}
                                </div>
                            </div>

                            {/* --- CONDITIONAL UI: NOVEL vs TRPG --- */}
                            {gameMode === GAME_MODES.TRPG ? (
                                /* TRPG MODE: Full Tactical HUD */
                                <div className="mt-auto space-y-2">
                                    <HealthBar
                                        current={gameState[agent.id]?.hp ?? agent.hp}
                                        max={agent.maxHp || 100}
                                        temp={0}
                                        deathSaves={agent.deathSaves}
                                    />
                                    <XpBar current={agent.xp || 0} max={agent.maxXp || 1000} level={agent.level || 1} />

                                    {/* Level Up Button (TRPG Mode Only) */}
                                    {(agent.xp >= agent.maxXp) && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLevelUpTarget(agent);
                                            }}
                                            className="w-full py-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse mb-2"
                                        >
                                            Level Up Available!
                                        </button>
                                    )}

                                    {/* Strict Stats Grid */}
                                    <div className="grid grid-cols-4 gap-1 mb-2 bg-slate-950/50 rounded-lg p-1.5 border border-slate-800/50">
                                        {/* AC */}
                                        <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                            <span className="text-[9px] text-slate-500 font-bold uppercase">AC</span>
                                            <span className="text-sm font-bold text-slate-200">{charData.ac || 10}</span>
                                        </div>
                                        {/* HP */}
                                        <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                            <span className="text-[9px] text-slate-500 font-bold uppercase">HP</span>
                                            <span className="text-sm font-bold text-green-400">{charData.maxHp || 10}</span>
                                        </div>
                                        {/* DC */}
                                        <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                            <span className="text-[9px] text-slate-500 font-bold uppercase">DC</span>
                                            <span className="text-sm font-bold text-amber-400">{charData.spellSaveDC || '-'}</span>
                                        </div>
                                        {/* INIT */}
                                        <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                            <span className="text-[9px] text-slate-500 font-bold uppercase">INIT</span>
                                            <span className="text-sm font-bold text-blue-400">{agent.initiativeBonus >= 0 ? '+' : ''}{agent.initiativeBonus}</span>
                                        </div>
                                    </div>
                                    <StatusBadges conditions={gameState[agent.id]?.conditions || []} />
                                </div>
                            ) : (
                                /* NOVEL MODE: Minimalist / Immersive */
                                <div className="mt-1">
                                    {/* Hidden by default, maybe show a small mood text? */}
                                    {/* We intentionally keep this clean. */}
                                </div>
                            )}

                            {/* Stat Grid - Compact (Legacy Backup, remove if TRPG HUD works well) */}
                            {/* <div className="grid grid-cols-3 gap-y-1 gap-x-2 text-[9px] text-slate-400 font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                                <span className={stats.str > 14 ? "text-amber-500" : ""}>STR {stats.str}</span>
                                <span className={stats.dex > 14 ? "text-amber-500" : ""}>DEX {stats.dex}</span>
                                <span className={stats.con > 14 ? "text-amber-500" : ""}>CON {stats.con}</span>
                                <span className={stats.int > 14 ? "text-amber-500" : ""}>INT {stats.int}</span>
                                <span className={stats.wis > 14 ? "text-amber-500" : ""}>WIS {stats.wis}</span>
                                <span className={stats.cha > 14 ? "text-amber-500" : ""}>CHA {stats.cha}</span>
                            </div> */}

                            {/* Footer Cleaned Up (Settings removed from here) */}
                            <div className="hidden"></div>
                        </div>
                    );
                })}
            </div>

            {levelUpTarget && (
                <LevelUpModal
                    isOpen={!!levelUpTarget}
                    character={levelUpTarget}
                    narrativeHistory={storyLog}
                    agent={characterManager}
                    onClose={() => setLevelUpTarget(null)}
                    onConfirm={handleLevelUpConfirm}
                />
            )} {/* Render Character Creator Modal */}
            {showCreator && (
                <CharacterCreationModal
                    characterManager={characterManager}
                    onClose={() => setShowCreator(false)}
                    onConfirm={(newCharData) => {
                        // Create -> Add to Roster -> Auto Select
                        // const charAgent = new CharacterAgent(newCharData); // Not needed for simple state update?
                        // Update Roster logic
                        setRoster(prev => [newCharData, ...prev]);
                        // Auto-add to party if space exists
                        setParty(prev => prev.filter(p => p !== 'error_char').length < 6 ? [...prev, newCharData.id] : prev);

                        setShowCreator(false);
                        showToast(`角色 ${newCharData.name} 創建成功！`, "success");
                    }}
                />
            )}
        </div>
    );

    const renderGameInterface = () => {
        const aliveMembers = party.filter(id => (gameState[id]?.hp || 0) > 0);
        const pendingCount = Object.keys(pendingActions).length;
        const isRoundReady = pendingCount === aliveMembers.length && pendingCount > 0;

        return (
            <div
                className={`flex flex-col md:flex-row h-[100dvh] overflow-hidden font-serif relative transition-all duration-1000`}
                style={{
                    // Use parchment background from global body, but can adjust here if needed
                    // Setting background to transparent to let body texture show
                }}
            >
                {/* Optional: Scene Image as subtle overlay or just removed for cleaner book look?
                    For now, let's keep it very subtle if it exists, or remove it to strictly follow Tome style.
                    Let's remove the full screen bg image to focus on the text/parchment.
                */}

                {/* Left: Story Area */}
                <div id="game-left-panel" className={`flex-1 md:w-2/3 flex flex-col bg-transparent relative min-h-0 z-10 md:border-r-2 border-[#1a1a1a]/10`}>
                    {/* Header */}
                    <div className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-950/80 backdrop-blur-sm shrink-0 z-20">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-1.5 rounded border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors">
                                <Scroll size={18} onClick={() => setShowJournal(!showJournal)} className="cursor-pointer" />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 font-tome-header`}>
                                    {selectedModule?.title || "Unknown Adventure"}
                                    <span className="ml-2 px-1.5 py-0.5 rounded text-amber-500 border border-amber-500/20 font-tome-body font-bold">
                                        ACT {currentAct}
                                    </span>
                                </span>
                                <div className={`flex items-center gap-1 text-xs font-tome-body italic text-slate-500`}>
                                    <MapIcon size={12} className="text-amber-500" />
                                    <span>{Array.isArray(currentLocation) && currentLocation.length > 0 ? currentLocation.join(" › ") : "Unknown Location"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Journal Popover */}
                            {showJournal && (
                                <div className="absolute top-16 left-6 z-50 w-80 max-h-96 overflow-y-auto bg-slate-900 border border-amber-500/30 shadow-2xl rounded p-4 text-slate-200 animate-in fade-in slide-in-from-top-2">
                                    <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-3 border-b border-amber-500/20 pb-2 flex items-center justify-between font-tome-header">
                                        <span>Adventure Journal</span>
                                        <X size={14} className="cursor-pointer hover:text-amber-500" onClick={() => setShowJournal(false)} />
                                    </h3>
                                    <div className="space-y-3 font-tome-script text-lg leading-snug">
                                        {!Array.isArray(questJournal) || questJournal.length === 0 ? (
                                            <p className="text-sm italic opacity-50 text-center py-4">The pages are blank...</p>
                                        ) : (
                                            questJournal.map((entry, idx) => (
                                                <div key={idx} className="space-y-1 border-b border-slate-700 pb-2 last:border-0">
                                                    <div className="flex justify-between opacity-50 text-[10px] uppercase font-sans tracking-widest text-slate-400">
                                                        <span>Turn {entry.turn}</span>
                                                        <span>{entry.timestamp.split(' ')[1]}</span>
                                                    </div>
                                                    <p className="text-slate-300">{entry.details}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    const muted = audioManager.current.toggleMute();
                                    setIsMuted(muted);
                                }}
                                className={`
                                    w-8 h-8 flex items-center justify-center rounded-full border transition-all mr-2 shrink-0
                                    ${isMuted
                                        ? "text-slate-600 border-slate-700 hover:text-amber-500"
                                        : "text-amber-500 border-amber-500/30 hover:bg-amber-500/10"}
                                `}
                                title={isMuted ? "Unmute Music" : "Mute Music"}
                            >
                                <Music size={14} className={!isMuted ? "animate-pulse" : ""} />
                            </button>



                            <button onClick={saveGame} className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 rounded-sm border border-slate-700 hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center gap-2 font-tome-header">
                                <Save size={14} /> Save
                            </button>
                            <Settings size={20} className="text-slate-600 hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setShowSettingsModal(true)} />
                        </div>
                    </div>

                    {/* Logs */}
                    <div
                        ref={logContainerRef}
                        className={`flex-1 overflow-y-auto p-4 md:p-12 space-y-8 scroll-smooth overscroll-contain relative custom-scrollbar
                        text-slate-200 ${userSettings.fontSize} ${userSettings.lineHeight}
                        font-tome-body
                        `}
                    >
                        {/* --- BREADCRUMBS (Location) --- */}


                        {logs.map((log, idx) => (
                            <div key={idx} className={`animate-in fade-in slide-in-from-bottom-2 duration-700`}>
                                {/* Placeholder for now, I need to view code first */}
                                {log.type === 'trpg_narrative' ? (
                                    <SequentialLogRenderer
                                        content={log.content}
                                        roster={agentRoster}
                                        renderTextWithDice={renderTextWithDice}
                                        isNarrating={isNarrating}
                                        onComplete={() => {
                                            // Only handle complete for the LAST log
                                            if (idx === logs.length - 1) {
                                                handleNarrativeComplete();
                                            }
                                        }}
                                        instant={idx !== logs.length - 1} // Old logs should be instant
                                        textSpeed={userSettings.textSpeed}
                                        theme={userSettings.theme}
                                        fontSize={userSettings.fontSize}
                                        letterSpacing={userSettings.letterSpacing}
                                        lineHeight={userSettings.lineHeight}
                                    />
                                ) : log.type === 'narrative' ? (
                                    <div className="prose prose-invert prose-p:text-slate-300 prose-lg max-w-none">
                                        <div ref={idx === logs.length - 1 ? lastLogRef : null} className={`text-slate-200 text-xl leading-loose whitespace-pre-line font-tome-body tracking-wide`}>
                                            {renderTextWithDice(log.content)}
                                        </div>
                                    </div>


                                ) : log.type === 'image' ? (
                                    <div className="my-8 p-2 border-2 border-[#1a1a1a]/10 bg-white/50 shadow-sm relative group animate-in fade-in zoom-in-95 duration-1000 rotate-1 transform hover:rotate-0 transition-transform">
                                        <div className="overflow-hidden sepia-[.3] contrast-125 brightness-90 filter">
                                            <img src={log.content} alt="Scene Visualization" className="w-full h-auto max-h-[400px] object-cover mix-blend-multiply opacity-90" />
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-[#f4ecd8] px-2 py-1 border border-[#1a1a1a]/20 text-[10px] font-tome-header uppercase tracking-widest text-[#1a1a1a]">
                                            <span className="flex items-center gap-1">
                                                <ImageIcon size={10} /> {log.location || "Plate I"}
                                            </span>
                                        </div>
                                    </div>

                                ) : log.type === 'turn_batch' ? (
                                    <div className="space-y-6 mb-8">
                                        {/* Divider Logic */}
                                        {(() => {
                                            const roundCount = logs.slice(0, idx + 1).filter(l => l.type === 'turn_batch').length;

                                            return (
                                                <div className="flex items-center justify-center gap-4 py-8 opacity-60">
                                                    <div className="h-px bg-[#1a1a1a]/20 flex-1"></div>
                                                    <div className="px-3 py-1 border-y border-[#1a1a1a]/40 bg-transparent">
                                                        <span className="text-[#8a2323] font-tome-header text-sm font-bold uppercase tracking-[0.2em]">
                                                            Chapter {roundCount}
                                                        </span>
                                                    </div>
                                                    <div className="h-px bg-[#1a1a1a]/20 flex-1"></div>
                                                </div>
                                            );
                                        })()}

                                        {(Array.isArray(log.content) ? log.content : (log.content?.turns || [])).map((turn, tIdx) => {
                                            const speakerChar = agentRoster.find(c => (turn.speaker && c.name.includes(turn.speaker)) || (turn.speaker && turn.speaker.includes(c.name.split('·')[0])));

                                            // FILTER: Hide Party Member Action Blocks (as per user request 2025-12-12)
                                            // Only show DM Narrative and Enemy/NPC turns.
                                            if (speakerChar && party.includes(speakerChar.id)) {
                                                return null;
                                            }

                                            return gameMode === GAME_MODES.NOVEL ? (
                                                // NOVEL RENDERER - Pure text, minimal UI
                                                <div key={tIdx} className="relative pl-0">
                                                    {/* Speaker Name only if Dialogue */}
                                                    {/* Actually novel mode usually integrates speaker into text, but structured output keeps them separate. We'll simulate novel flow. */}

                                                    <div className="space-y-6 text-[#1a1a1a]">
                                                        {turn.narration && turn.narration.split('\n').map((para, pIdx) => (
                                                            para.trim() && <p key={`n-${pIdx}`} className="text-xl mb-6 leading-loose tracking-wide font-tome-body">{renderTextWithDice(para)}</p>
                                                        ))}
                                                        {turn.action && turn.action.split('\n').map((para, pIdx) => (
                                                            para.trim() && <p key={`a-${pIdx}`} className="text-lg italic opacity-80 mb-6 leading-loose pl-4 border-l-2 border-[#8a2323]/20">*{renderTextWithDice(para)}*</p>
                                                        ))}
                                                        {turn.dialogue && turn.dialogue.split('\n').map((para, pIdx) => (
                                                            para.trim() && <p key={`d-${pIdx}`} className="text-xl font-bold mb-6 leading-loose text-[#2c3e50]">
                                                                {turn.speaker && !turn.speaker.includes('DM') && !turn.speaker.includes('System') && <span className="text-[#8a2323] text-xs block mb-1 font-tome-header uppercase tracking-widest">{turn.speaker}</span>}
                                                                “{renderTextWithDice(para)}”
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                // LEFT BORDER CARD STYLE (Simplified for Ink)
                                                // ... (We'll simplify this to look like a book excerpt)
                                                <div key={tIdx} className="relative pl-4 border-l-4 border-[#1a1a1a]/10 py-2 mb-4 hover:border-[#8a2323]/40 transition-colors">
                                                    {/* Speaker Header */}
                                                    {turn.speaker && !turn.speaker.includes('DM') && (
                                                        <h4 className="font-tome-header font-bold text-sm text-[#8a2323] uppercase tracking-widest mb-2">
                                                            {turn.speaker}
                                                        </h4>
                                                    )}

                                                    {/* Narration */}
                                                    {turn.narration && turn.narration.split('\n').map((para, i) => para.trim() && (
                                                        <p key={`n-${i}`} className="mb-4 text-[#1a1a1a] leading-relaxed font-tome-body text-lg">{renderTextWithDice(para)}</p>
                                                    ))}

                                                    {/* Dialogue */}
                                                    {turn.dialogue && turn.dialogue.split('\n').map((para, i) => para.trim() && (
                                                        <p key={`d-${i}`} className="mb-4 text-[#2c3e50] font-bold font-tome-body text-lg pl-2">
                                                            “{renderTextWithDice(para)}”
                                                        </p>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                        <div ref={idx === logs.length - 1 ? lastLogRef : null} />
                                    </div>
                                ) : log.type === 'user' ? (
                                    <div className="flex items-center gap-2 text-[#8a2323] text-xs font-bold uppercase tracking-[0.2em] mt-8 mb-4 justify-center border-t border-[#8a2323]/20 pt-6">
                                        <span>{log.content}</span>
                                    </div>
                                ) : log.type === 'user-batch' ? (
                                    <div className="bg-[#1a1a1a]/5 border-l-2 border-[#1a1a1a] pl-4 py-3 pr-4 text-sm text-[#1a1a1a] font-mono whitespace-pre-line mb-6 italic">
                                        {log.content}
                                    </div>
                                ) : (
                                    <div className="text-center text-red-800 text-sm py-2 border-y border-red-900/10 bg-red-900/5">
                                        {log.content}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isGenerating && (
                            <div className="flex items-center justify-center gap-3 text-amber-500/80 italic text-sm py-8 animate-pulse font-serif">
                                <Sword size={20} className="animate-spin" /> Fates are weaving...
                            </div>
                        )}
                        <div ref={scrollTrigger} className="h-16" />
                    </div>

                    {/* Execution Button Overlay (When ready) */}
                    {pendingCount > 0 && !isGenerating && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-sm px-4">
                            <button
                                onClick={() => executeTurn(false)}
                                className={`
              w-full shadow-xl border-2 backdrop-blur-md py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-3 transition-all font-tome-header uppercase tracking-widest
              ${isRoundReady
                                        ? 'bg-[#8a2323] text-[#f4ecd8] border-[#8a2323] hover:bg-[#6e1c1c] scale-105 animate-pulse'
                                        : 'bg-[#f4ecd8] border-[#1a1a1a] text-[#1a1a1a] hover:bg-white'}
            `}
                            >
                                {isRoundReady ? (
                                    <><Sword size={22} /> Execute Turn ({pendingCount}/{aliveMembers.length})</>
                                ) : (
                                    <><Clock size={22} /> Awaiting Orders ({pendingCount}/{aliveMembers.length})</>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right/Bottom: Controls */}
                {/* Resize Handle (Desktop Only) */}
                <div
                    className="hidden md:flex w-1 h-auto cursor-col-resize hover:bg-amber-500/50 active:bg-amber-500 transition-colors z-30 flex-col justify-center items-center gap-1 group border-l border-slate-800"
                    onMouseDown={(e) => {
                        isResizing.current = true;
                        document.body.style.cursor = 'col-resize';
                        document.body.style.userSelect = 'none';
                    }}
                >
                    <div className="w-[2px] h-8 bg-slate-600 group-hover:bg-amber-400 rounded-full transition-colors"></div>
                </div>

                {/* Right/Bottom: Controls (Resizable) */}
                <div
                    className="h-[40%] md:h-auto bg-slate-900/80 backdrop-blur-md border-t border-slate-700 md:border-t-0 border-slate-700 flex flex-col shadow-2xl z-20 min-h-0 relative"
                    style={{ width: isMobile ? '100%' : sidebarWidth }}
                >

                    {/* Module Title Header */}
                    <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex flex-col gap-1 shrink-0">
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1 font-tome-header">
                            <BookOpen size={12} />
                            Active Module
                        </span>
                        <h2 className="text-lg font-tome-header font-bold text-slate-200 truncate leading-tight">
                            {selectedModule?.title || "Unknown Adventure"}
                        </h2>
                    </div>

                    <div className="p-4 border-b border-slate-700 bg-slate-900/50 text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between shrink-0 font-tome-header">
                        <span>{gameMode === GAME_MODES.NOVEL ? 'Novel Mode' : 'Tactical Mode'}</span>
                        {isPreGenerating && <span className="text-amber-500 animate-pulse flex items-center gap-1"><Brain size={14} /> Thinking...</span>}
                    </div>

                    {/* Unified Scrollable Roster Area (Party + Enemies) */}
                    <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500 ${groupDecisionOptions.length > 0 ? 'grayscale opacity-50 pointer-events-none' : ''}`}>
                        <div className="p-4 space-y-3">
                            {party.map((id, index) => {
                                const char = agentRoster.find(c => c.id === id);
                                if (!char) return null; // Safety check for missing/stale IDs

                                const state = gameState[id] || { hp: 100, psych: "正常" };
                                const isDead = state.hp <= 0;
                                const hasAction = !!pendingActions[id];

                                // Determine modal direction: Always Open DOWN (as requested, relying on scroll)
                                const modalDirection = 'down';

                                // Dark Tome Aesthetic Logic
                                const cardBorder = hasAction ? 'border-amber-500 shadow-md border-2' : 'border-slate-700 border hover:border-slate-500';
                                const cardBg = isDead ? 'opacity-50 grayscale bg-red-900/20' : hasAction ? 'bg-slate-800 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]' : 'bg-transparent';

                                return (
                                    <div
                                        key={id}
                                        onClick={() => {
                                            if (isDead || isGenerating || char.controlMode === 'auto' || groupDecisionOptions.length > 0) return;

                                            // Auto-generate options if missing
                                            const cached = actionCache[char.id];
                                            if (!cached || !cached.options || cached.options.length === 0) {
                                                handleRegenerateOptions(char);
                                            }

                                            setActionModalChar(char);
                                        }}
                                        className={`
                                            group relative p-3 rounded transition-all cursor-pointer flex flex-col gap-2
                                            ${cardBorder} ${cardBg}
                                        `}
                                    >
                                        {/* Card Header (Avatar + Info) */}
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-full border-2 border-[#1a1a1a] overflow-hidden shadow-sm sepia-[.3]">
                                                    <img
                                                        src={char.avatar || char.avatarUrl || ''}
                                                        className="w-full h-full object-cover mix-blend-multiply transform scale-[1.6] translate-y-4"
                                                        alt="avatar"
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                                </div>
                                                {hasAction && (
                                                    <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 rounded-full p-0.5 border-2 border-amber-600 z-10">
                                                        <PlayCircle size={14} fill="currentColor" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`font-tome-header font-bold truncate text-lg ${isDead ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{char.name}</span>
                                                    <div className="flex items-center gap-2 relative z-20">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                toggleControlMode(char.id);
                                                            }}
                                                            className={`
                                                                flex items-center gap-1.5 px-2 py-1 rounded-sm cursor-pointer transition-all border font-tome-body
                                                                ${char.controlMode === 'auto'
                                                                    ? 'bg-slate-700 text-white border-slate-600'
                                                                    : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'}
                                                            `}
                                                            title="Toggle Control Mode"
                                                        >
                                                            {char.controlMode === 'auto' ? <Bot size={10} className="shrink-0" /> : <User size={10} className="shrink-0" />}
                                                            <span className="text-[9px] font-bold uppercase tracking-wider">{char.controlMode === 'auto' ? 'Auto' : 'Manual'}</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setActiveModalChar(char);
                                                            }}
                                                            className="p-1 hover:bg-white/10 rounded-full border border-transparent hover:border-white/20 text-slate-500 hover:text-white transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye size={12} />
                                                        </button>
                                                        <span className="text-xs uppercase text-slate-500 font-bold tracking-wider font-tome-body">{char.class}</span>
                                                    </div>
                                                </div>
                                                {/* Rustic HP Bar (Dark Mode) */}
                                                <div className="w-full h-2 bg-slate-800 rounded-none overflow-hidden mb-2 border border-slate-700 relative">
                                                    <div
                                                        className={`h-full transition-all duration-500 relative ${state.hp / (state.maxHp || 100) < 0.3 ? 'bg-red-600' : 'bg-emerald-600'}`}
                                                        style={{ width: `${Math.min(100, Math.max(0, (state.hp / (state.maxHp || 100)) * 100))}%` }}
                                                    >
                                                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20"></div>
                                                    </div>
                                                </div>

                                                {/* Status / Action Preview */}
                                                <div className="flex justify-between text-xs text-slate-400 h-4 font-tome-body">
                                                    {hasAction ? (
                                                        <span className="text-amber-500 truncate italic font-serif flex items-center gap-1 font-bold">
                                                            <ChevronRight size={12} /> {pendingActions[id]}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span className="flex items-center gap-1 font-mono font-bold"><Heart size={10} className="text-red-500" /> {Math.round((state.hp / (state.maxHp || 100)) * 100)}%</span>
                                                            <span className="flex items-center gap-1"><Activity size={10} className="text-slate-400" /> {state.psych}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Companion Mini-Card (If Exists) */}
                                        {char.companion && (
                                            <div className="mx-2 mb-2 p-2 bg-[#1a1a1a]/40 rounded border border-slate-700/50 flex items-center gap-3 relative">
                                                <div className="absolute -top-3 left-6 w-[2px] h-3 bg-slate-700/50"></div>
                                                <div className="w-10 h-10 rounded-full border border-slate-600 overflow-hidden shrink-0 bg-slate-800">
                                                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                                                        <span className="text-[8px]">PET</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-bold text-slate-400 font-tome-header uppercase tracking-wider">{char.companion.name}</span>
                                                        <span className="text-[9px] text-slate-500 uppercase">{char.companion.type}</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                                        <div
                                                            className="h-full bg-amber-700"
                                                            style={{ width: `${Math.min(100, ((char.companion.hp || 1) / (char.companion.maxHp || 1)) * 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Dropdown (Desktop: Inline) */}
                                        <div className="hidden md:block w-full">
                                            {actionModalChar?.id === char.id && (
                                                <ActionModal
                                                    character={char}
                                                    actionCache={actionCache}
                                                    inventory={char.inventory || []}
                                                    direction={modalDirection}
                                                    onSelectAction={(charId, actionText) => {
                                                        const cleanText = actionText.replace(/^(Uses|使用)\s*/, '');
                                                        setPendingActions(prev => ({ ...prev, [charId]: actionText }));
                                                        setActionModalChar(null);
                                                        showToast(`已排程行動：${cleanText}`, "info");
                                                    }}
                                                    onStyleDialogue={async (c, rawText) => {
                                                        if (charAgent && styleMode) {
                                                            return await charAgent.styleDialogue(c.name, c, rawText, logs.slice(-1)[0]?.content || "");
                                                        }
                                                        return rawText;
                                                    }}
                                                    onRegenerateOptions={() => handleRegenerateOptions(char)}
                                                    onClose={(e) => {
                                                        if (e) e.stopPropagation();
                                                        setActionModalChar(null);
                                                    }}
                                                    isRegenerating={isPreGenerating}
                                                />
                                            )}
                                        </div>
                                    </div>

                                );
                            })}
                        </div>

                        {/* Scenario Roster (Active Enemies & NPCs) - Exclude Party Members */}
                        <ScenarioRoster roster={scenarioRoster.filter(r => {
                            // Filter out party members by ID
                            if (party.includes(r.id)) return false;

                            // Get party names from both roster and agentRoster for comprehensive matching
                            const partyChars = agentRoster.filter(c => party.includes(c.id));
                            const partyNames = partyChars.map(c => c.name);

                            // Normalize name for comparison (remove dots, lowercase)
                            const normalizedActorName = (r.name || '').replace(/[·•．\s]/g, '').toLowerCase();

                            // Check if this actor matches any party member
                            const isPartyMember = partyNames.some(pName => {
                                const normalizedPartyName = pName.replace(/[·•．\s]/g, '').toLowerCase();
                                const pNameFirst = pName.split(/[·•．\s]/)[0];
                                const actorNameFirst = (r.name || '').split(/[·•．\s]/)[0];
                                return (
                                    r.name === pName ||
                                    r.name.includes(pNameFirst) ||
                                    pName.includes(actorNameFirst) ||
                                    normalizedActorName.includes(normalizedPartyName) ||
                                    normalizedPartyName.includes(normalizedActorName)
                                );
                            });

                            return !isPartyMember;
                        })} />

                        {/* Journal Modal (Kept - triggered from top-left) */}
                        {
                            showJournalModal && (
                                <JournalModal
                                    journal={questJournal}
                                    onClose={() => setShowJournalModal(false)}
                                />
                            )
                        }

                        {/* Mobile Action Bottom Sheet Overlay */}
                        {
                            actionModalChar && (
                                <div className="md:hidden fixed inset-0 z-[60] flex flex-col justify-end bg-black/80 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={() => setActionModalChar(null)}>
                                    <div
                                        className="bg-slate-900 border-t border-amber-500/50 rounded-t-xl p-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl safe-pb"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <div className="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-3 sticky top-0 bg-slate-900 z-10">
                                            <div className="flex items-center gap-3">
                                                <img src={actionModalChar.avatar || actionModalChar.avatarUrl} className="w-8 h-8 rounded-full border border-slate-600" alt="" />
                                                <span className="font-tome-header font-bold text-amber-500 uppercase tracking-widest text-sm">{actionModalChar.name}</span>
                                            </div>
                                            <button onClick={() => setActionModalChar(null)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white border border-slate-700">
                                                <X size={18} />
                                            </button>
                                        </div>
                                        <div className="pb-8">
                                            <ActionModal
                                                character={actionModalChar}
                                                actionCache={actionCache}
                                                inventory={actionModalChar.inventory || []}
                                                direction="up" // Force UP direction logic if handled, though CSS flow will handle it
                                                onSelectAction={(charId, actionText) => {
                                                    setPendingActions(prev => ({ ...prev, [charId]: actionText }));
                                                    setActionModalChar(null);
                                                }}
                                                onStyleDialogue={async (c, rawText) => {
                                                    if (charAgent && styleMode) {
                                                        return await charAgent.styleDialogue(c.name, c, rawText, logs.slice(-1)[0]?.content || "");
                                                    }
                                                    return rawText;
                                                }}
                                                onRegenerateOptions={() => handleRegenerateOptions(actionModalChar)}
                                                onClose={(e) => {
                                                    if (e) e.stopPropagation();
                                                    // setActionModalChar(null); // Managed by wrapper
                                                }}
                                                isRegenerating={isPreGenerating}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Group Decision Options Overlay */}
                {
                    groupDecisionOptions.length > 0 && !isGenerating && !isNarrating && (
                        <GroupDecisionOptions
                            options={groupDecisionOptions}
                            onSelect={(option) => {
                                // Clear decision options
                                setGroupDecisionOptions([]);
                                // Set as a group action for all party members
                                const groupAction = `【團隊決策】${option}`;
                                // Execute turn with the selected group decision
                                executeTurn(false, groupAction);
                            }}
                        />
                    )
                }

            </div >
        );
    };

    // Handle Portrait Regeneration (AI)
    const handleRegeneratePortrait = async (char) => {
        if (!char) return;

        // Double check limit before calling API
        const currentCount = char.portraitGenCount || 0;
        if (!char.id.startsWith('preset_') && currentCount >= 3) {
            alert("Limit reached.");
            return;
        }

        try {
            // Show loading state implicitly or explicitly if UI supported it
            // For now, we'll just try to generate and update
            const newAvatarUrl = await generateAIPortrait(char);

            if (newAvatarUrl) {
                // Increment count
                const newCount = (char.id.startsWith('preset_') ? 0 : currentCount + 1);

                handleUpdatePortrait(char, {
                    avatar: newAvatarUrl,
                    avatarUrl: newAvatarUrl,
                    portraitGenCount: newCount
                });
            } else {
                alert("Failed to generate portrait. Please try again.");
            }
        } catch (error) {
            console.error("Portrait generation error:", error);
            alert("Error generating portrait: " + error.message);
        }
    };

    // Handle Custom Portrait Upload (Base64)
    const handleUpdatePortrait = (char, newInfo) => {
        if (!char) return;

        // Support both direct URL string or object update
        const updates = typeof newInfo === 'string' ? { avatar: newInfo, avatarUrl: newInfo } : newInfo;

        setGameState(prev => ({
            ...prev,
            [char.id]: {
                ...prev[char.id],
                ...updates
            }
        }));

        // Also update local roster state if needed for strict sync
        setRoster(prev => prev.map(a =>
            a.id === char.id ? { ...a, ...updates } : a
        ));
    };

    const getThemeClasses = () => {
        switch (userSettings.theme) {
            case 'light': return 'bg-[#f0f0f0] text-slate-900';
            case 'sepia': return 'bg-[#f4ecd8] text-[#433422]';
            case 'midnight': return 'bg-[#0f0f1a] text-[#aaccff]';
            default: return 'bg-slate-950 text-slate-100';
        }
    };

    return (
        <div className={`relative w-full min-h-screen font-serif overflow-hidden selection:bg-amber-500/20 ${getThemeClasses()}`}>
            {/* Dynamic Background Layer */}
            <div
                className="fixed inset-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
                style={{
                    backgroundImage: `url(/assets/background/${BACKGROUND_MAP[currentBgmKey] || BACKGROUND_MAP['default']})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4,
                    filter: 'grayscale(20%) sepia(10%) blur(1px)'
                }}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95 pointer-events-none" />

            {/* Audio Interaction Blocker/Banner if needed */}
            {!isMuted && audioManager.current && audioManager.current.context?.state === 'suspended' && (
                <div className="fixed top-0 left-0 w-full z-50 bg-amber-600/90 text-white text-center py-2 cursor-pointer hover:bg-amber-500 transition-colors"
                    onClick={() => {
                        audioManager.current.init();
                        audioManager.current.playBgm(currentBgmKey);
                    }}>
                    🎵 點擊此處開啟音效 (Click to Enable Audio)
                </div>
            )}
            {/* Legacy Modal (Removed) */}

            {/* Journal Modal - Removed inline, using component in renderGameInterface instead */}


            {/* Journal Modal - Removed inline, using component in renderGameInterface instead */}

            {/* Save/Load Modal */}
            <SaveLoadModal
                isOpen={!!showSaveLoadModal}
                mode={showSaveLoadModal} // 'save' or 'load'
                onClose={() => setShowSaveLoadModal(null)}
                onSave={handleSave}
                onLoad={handleLoad}
                onDelete={(slotId) => {
                    localStorage.removeItem(`dnd_save_slot_${slotId}`);
                    // Force re-render of modal? The modal manages its own "refresh" or checking localstorage?
                    // We probably need to pass a signal or just let the modal handle it internally if we refactor it.
                    showToast(`存檔 ${slotId} 已刪除`, "info");
                }}
            />

            {/* Character Detail Modal */}
            <CharacterModal
                isOpen={!!activeModalChar}
                character={activeModalChar}
                onClose={() => setActiveModalChar(null)}
                onGeneratePortrait={handleRegeneratePortrait}
                onUpdatePortrait={handleUpdatePortrait}
                isGenerating={isGeneratingPortrait}
            />

            {/* Settings Modal */}
            <SettingsModal
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
                settings={userSettings}
                onUpdateSettings={handleUpdateSettings}
                // onGenerateScene={handleGenerateScene} // Disabled for Token Optimization
                isGeneratingScene={isGeneratingScene}
                isMuted={isMuted}
                onToggleMute={() => {
                    const muted = audioManager.current.toggleMute();
                    setIsMuted(muted);
                }}
            />



            <LevelUpModal
                isOpen={!!levelUpTarget}
                character={levelUpTarget ? agentRoster.find(a => a.id === levelUpTarget.id) : null}
                narrativeHistory={logs}
                agent={characterManager}
                onConfirm={handleLevelUpConfirm}
                onClose={() => setLevelUpTarget(null)}
            />

            {/* Custom Story Creation Modal */}
            <CustomStoryModal
                isOpen={showCustomStoryModal}
                onClose={() => setShowCustomStoryModal(false)}
                onGenerate={handleCreateCustomModule}
                isGenerating={isGenerating}
            />


            {/* Main View Switching */}
            {view === 'home' && renderSetup()}
            {view === 'modules' && renderModuleSelection()}
            {view === 'mode_select' && renderModeSelect()}
            {view === 'roster' && renderRoster()}
            {
                view === 'game' && (
                    <ErrorBoundary>
                        {renderGameInterface()}
                    </ErrorBoundary>
                )
            }
        </div >
    );
}


