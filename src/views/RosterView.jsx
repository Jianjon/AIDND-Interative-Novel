import React from 'react';
import { ChevronRight, Sword, Plus, Trash2, Settings, Bot, User, Heart } from 'lucide-react';
import { HealthBar, XpBar, StatusBadges } from '../components/CombatHUD';
import StatusEffectDisplay from '../components/StatusEffectDisplay';
import SpellSlotDisplay from '../components/SpellSlotDisplay';
import LevelUpModal from '../components/LevelUpModal';
import CharacterCreationModal from '../components/CharacterCreationModal';

const GAME_MODES = {
    NOVEL: 'novel',
    TRPG: 'trpg'
};

const RosterView = ({
    setView,
    party,
    setParty,
    setShowCreator,
    agentRoster,
    handleDeleteCharacter,
    toggleControlMode,
    gameState,
    levelUpTarget,
    setLevelUpTarget,
    storyLog,
    charAgent,
    handleLevelUpConfirm,
    setRoster,
    showToast,
    gameMode,
    roster,
    setActiveModalChar,
    showCreator
}) => (
    <div className="h-full flex flex-col p-4 overflow-hidden bg-obsidian bg-cover relative">
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 overflow-y-auto pb-24 pr-2">
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
                            {!agent.id.startsWith('preset_') && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCharacter(agent.id);
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-950/80 text-red-400 rounded-full hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm border border-red-500/30"
                                    title="刪除角色 (Delete Character)"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                            <img
                                src={charData.avatar || charData.avatarUrl || ''}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-normal opacity-90 group-hover:opacity-100"
                                alt={charData.name}
                                onError={(e) => e.target.style.display = 'none'}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h4 className={`font-serif font-bold truncate text-base tracking-wide ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                                    {charData.name}
                                </h4>

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

                            <div className={`text-sm font-serif font-bold mb-3 truncate border-b border-slate-800/50 pb-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                                {charData.race} <span className="text-amber-700 mx-1">/</span> {charData.class}
                            </div>
                        </div>

                        {gameMode === GAME_MODES.TRPG ? (
                            <div className="mt-auto space-y-2">
                                <HealthBar
                                    current={gameState[agent.id]?.hp ?? agent.hp}
                                    max={agent.maxHp || 100}
                                    temp={0}
                                    deathSaves={agent.deathSaves}
                                />
                                <XpBar current={agent.xp || 0} max={agent.maxXp || 1000} level={agent.level || 1} />
                                <StatusEffectDisplay conditions={charData.conditions || []} compact={true} />
                                {(charData.slots && Object.keys(charData.slots).length > 0) && (
                                    <SpellSlotDisplay slots={charData.slots} usedSlots={charData.usedSlots || {}} compact={true} />
                                )}
                                {charData.concentratingOn && (
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-900/40 border border-purple-500/30 rounded text-xs text-purple-300 font-bold">
                                        <span className="animate-pulse">🔮</span>
                                        <span className="truncate">專注: {charData.concentratingOn.spell}</span>
                                    </div>
                                )}
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
                                <div className="grid grid-cols-4 gap-1 mb-2 bg-slate-950/50 rounded-lg p-1.5 border border-slate-800/50">
                                    <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                        <span className="text-[9px] text-slate-500 font-bold uppercase">AC</span>
                                        <span className="text-sm font-bold text-slate-200">{charData.ac || 10}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                        <span className="text-[9px] text-slate-500 font-bold uppercase">HP</span>
                                        <span className="text-sm font-bold text-green-400">{charData.maxHp || 10}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                        <span className="text-[9px] text-slate-500 font-bold uppercase">DC</span>
                                        <span className="text-sm font-bold text-amber-400">{charData.spellSaveDC || '-'}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-1 rounded bg-slate-900 border border-slate-800">
                                        <span className="text-[9px] text-slate-500 font-bold uppercase">INIT</span>
                                        <span className="text-sm font-bold text-blue-400">{agent.initiativeBonus >= 0 ? '+' : ''}{agent.initiativeBonus}</span>
                                    </div>
                                </div>
                                <StatusBadges conditions={gameState[agent.id]?.conditions || []} />
                            </div>
                        ) : (
                            <div className="mt-1"></div>
                        )}
                    </div>
                );
            })}
        </div>

        {levelUpTarget && (
            <LevelUpModal
                isOpen={!!levelUpTarget}
                character={levelUpTarget}
                narrativeHistory={storyLog}
                agent={charAgent}
                onClose={() => setLevelUpTarget(null)}
                onConfirm={handleLevelUpConfirm}
            />
        )}
        {showCreator && (
            <CharacterCreationModal
                characterManager={charAgent}
                onClose={() => setShowCreator(false)}
                onConfirm={(newCharData) => {
                    const serializedData = newCharData.getFullSheet ? newCharData.getFullSheet() : newCharData;
                    try {
                        const customCharsJson = localStorage.getItem('dnd_custom_characters');
                        const customChars = customCharsJson ? JSON.parse(customCharsJson) : [];
                        const updatedCustomChars = [...customChars.filter(c => c.id !== serializedData.id), serializedData];
                        localStorage.setItem('dnd_custom_characters', JSON.stringify(updatedCustomChars));
                    } catch (e) {
                        console.error("Failed to save custom character", e);
                    }
                    setRoster(prev => [newCharData, ...prev]);
                    setParty(prev => prev.filter(p => p !== 'error_char').length < 6 ? [...prev, newCharData.id] : prev);
                    setShowCreator(false);
                    showToast(`角色 ${newCharData.name} 創建成功！`, "success");
                }}
            />
        )}
    </div>
);

export default RosterView;
