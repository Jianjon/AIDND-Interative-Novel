import React from 'react';
import {
    Scroll, Map as MapIcon, Save, Settings, Music, X, ImageIcon, Sword, Clock, ChevronRight, Brain, Bot, User, Eye, Heart, Activity, PlayCircle, BookOpen
} from 'lucide-react';
import SequentialLogRenderer from '../components/SequentialLogRenderer';
import ActionModal from '../components/ActionModal';
import ScenarioRoster from '../components/ScenarioRoster';
import TokenDisplay from '../components/TokenDisplay';
import JournalModal from '../components/JournalModal';
import GroupDecisionOptions from '../components/GroupDecisionOptions';

const GAME_MODES = {
    NOVEL: 'novel',
    TRPG: 'trpg'
};

const GameInterface = ({
    party,
    gameState,
    pendingActions,
    setPendingActions,
    selectedModule,
    currentAct,
    currentLocation,
    questJournal,
    isMuted,
    setIsMuted,
    audioManager,
    saveGame,
    setShowSettingsModal,
    logs,
    agentRoster,
    renderTextWithDice,
    isNarrating,
    handleNarrativeComplete,
    userSettings,
    lastLogRef,
    logContainerRef,
    isGenerating,
    executeTurn,
    sidebarWidth,
    isResizing,
    isMobile,
    isPreGenerating,
    actionCache,
    handleRegenerateOptions,
    setActionModalChar,
    actionModalChar,
    toggleControlMode,
    scenarioRoster,
    showJournalModal,
    setShowJournalModal,
    groupDecisionOptions,
    setGroupDecisionOptions,
    decisionVotes,
    setDecisionVotes,
    isLoadingVotes,
    roster,
    showJournal,
    setShowJournal,
    scrollTrigger,
    charAgent,
    styleMode,
    showToast,
    gameMode
}) => {
    const aliveMembers = party.filter(id => (gameState[id]?.hp || 0) > 0);
    const pendingCount = Object.keys(pendingActions).length;
    const isRoundReady = pendingCount === aliveMembers.length && pendingCount > 0;

    return (
        <div className="flex flex-col md:flex-row h-[100dvh] overflow-hidden font-serif relative transition-all duration-1000 bg-black">
            {/* Left: Story Area */}
            <div id="game-left-panel" className="flex-1 md:w-2/3 flex flex-col bg-transparent relative min-h-0 z-10 md:border-r-2 border-amber-900/20">
                <div className="h-16 border-b border-amber-900/30 flex items-center px-6 justify-between bg-obsidian backdrop-blur-md shrink-0 z-20">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-1.5 rounded border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors">
                            <Scroll size={18} onClick={() => setShowJournal(!showJournal)} className="cursor-pointer" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-tome-header">
                                {selectedModule?.title || "Unknown Adventure"}
                                <span className="ml-2 px-1.5 py-0.5 rounded text-amber-500 border border-amber-500/20 font-tome-body font-bold">
                                    ACT {currentAct}
                                </span>
                            </span>
                            <div className="flex items-center gap-1 text-xs font-tome-body italic text-slate-500">
                                <MapIcon size={12} className="text-amber-500" />
                                <span>{Array.isArray(currentLocation) && currentLocation.length > 0 ? currentLocation.join(" › ") : "Unknown Location"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
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
                            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all mr-2 shrink-0 ${isMuted ? "text-slate-600 border-slate-700 hover:text-amber-500" : "text-amber-500 border-amber-500/30 hover:bg-amber-500/10"}`}
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

                {/* Logs Area */}
                <div
                    ref={logContainerRef}
                    className={`flex-1 overflow-y-auto p-4 md:p-12 space-y-8 scroll-smooth overscroll-contain relative custom-scrollbar bg-parchment shadow-inner text-slate-900 ${userSettings.fontSize} ${userSettings.lineHeight} font-tome-body`}
                >
                    {logs.map((log, idx) => (
                        <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                            {log.type === 'trpg_narrative' ? (
                                <SequentialLogRenderer
                                    content={log.content}
                                    roster={agentRoster}
                                    renderTextWithDice={renderTextWithDice}
                                    isNarrating={isNarrating}
                                    onComplete={() => { if (idx === logs.length - 1) handleNarrativeComplete(); }}
                                    instant={idx !== logs.length - 1}
                                    textSpeed={userSettings.textSpeed}
                                    theme={userSettings.theme}
                                    fontSize={userSettings.fontSize}
                                    letterSpacing={userSettings.letterSpacing}
                                    lineHeight={userSettings.lineHeight}
                                />
                            ) : log.type === 'narrative' ? (
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <div ref={idx === logs.length - 1 ? lastLogRef : null} className="text-slate-200 text-xl leading-loose whitespace-pre-line font-tome-body tracking-wide">
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
                                    {(() => {
                                        const roundCount = logs.slice(0, idx + 1).filter(l => l.type === 'turn_batch').length;
                                        return (
                                            <div className="flex items-center justify-center gap-4 py-8 opacity-60">
                                                <div className="h-px bg-[#1a1a1a]/20 flex-1"></div>
                                                <div className="px-3 py-1 border-y border-[#1a1a1a]/40 bg-transparent">
                                                    <span className="text-[#8a2323] font-tome-header text-sm font-bold uppercase tracking-[0.2em]">Chapter {roundCount}</span>
                                                </div>
                                                <div className="h-px bg-[#1a1a1a]/20 flex-1"></div>
                                            </div>
                                        );
                                    })()}
                                    {(Array.isArray(log.content) ? log.content : (log.content?.turns || [])).map((turn, tIdx) => {
                                        const speakerChar = agentRoster.find(c => (turn.speaker && c.name.includes(turn.speaker)) || (turn.speaker && turn.speaker.includes(c.name.split('·')[0])));
                                        if (speakerChar && party.includes(speakerChar.id)) return null;

                                        return (
                                            <div key={tIdx} className="relative pl-4 border-l-4 border-[#1a1a1a]/10 py-2 mb-4 hover:border-[#8a2323]/40 transition-colors">
                                                {turn.speaker && !turn.speaker.includes('DM') && (
                                                    <h4 className="font-tome-header font-bold text-sm text-[#8a2323] uppercase tracking-widest mb-2">{turn.speaker}</h4>
                                                )}
                                                {turn.narration && turn.narration.split('\n').map((para, i) => para.trim() && (
                                                    <p key={`n-${i}`} className="mb-4 text-[#1a1a1a] leading-relaxed font-tome-body text-lg">{renderTextWithDice(para)}</p>
                                                ))}
                                                {turn.dialogue && turn.dialogue.split('\n').map((para, i) => para.trim() && (
                                                    <p key={`d-${i}`} className="mb-4 text-[#2c3e50] font-bold font-tome-body text-lg pl-2">“{renderTextWithDice(para)}”</p>
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
                            ) : (
                                <div className="text-center text-red-800 text-sm py-2 border-y border-red-900/10 bg-red-900/5">{log.content}</div>
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

                {/* Execution Button Overlay */}
                {pendingCount > 0 && !isGenerating && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-sm px-4">
                        <button
                            onClick={() => executeTurn(false)}
                            className={`w-full shadow-xl border-2 backdrop-blur-md py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-3 transition-all font-tome-header uppercase tracking-widest ${isRoundReady ? 'bg-[#8a2323] text-[#f4ecd8] border-[#8a2323] hover:bg-[#6e1c1c] scale-105 animate-pulse' : 'bg-[#f4ecd8] border-[#1a1a1a] text-[#1a1a1a] hover:bg-white'}`}
                        >
                            {isRoundReady ? <><Sword size={22} /> Execute Turn ({pendingCount}/{aliveMembers.length})</> : <><Clock size={22} /> Awaiting Orders ({pendingCount}/{aliveMembers.length})</>}
                        </button>
                    </div>
                )}
            </div>

            {/* Right: Controls Panel */}
            <div
                className="hidden md:flex w-1 h-auto cursor-col-resize hover:bg-amber-500/50 active:bg-amber-500 transition-colors z-30 flex-col justify-center items-center gap-1 group border-l border-slate-800"
                onMouseDown={(e) => {
                    isResizing.current = true;
                    document.body.style.cursor = 'col-resize';
                    document.body.style.userSelect = 'none';
                }}
            ><div className="w-[2px] h-8 bg-slate-600 group-hover:bg-amber-400 rounded-full transition-colors"></div></div>

            <div
                className="h-[40%] md:h-auto bg-obsidian border-t border-amber-900/30 md:border-t-0 flex flex-col shadow-2xl z-20 min-h-0 relative"
                style={{ width: isMobile ? '100%' : sidebarWidth }}
            >
                <div className="p-4 border-b border-amber-900/30 bg-black/40 flex flex-col gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1 font-tome-header">
                        <BookOpen size={12} /> Active Module
                    </span>
                    <h2 className="text-lg font-tome-header font-bold text-slate-200 truncate leading-tight">{selectedModule?.title || "Unknown Adventure"}</h2>
                </div>

                <div className="p-4 border-b border-slate-700 bg-slate-900/50 text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between shrink-0 font-tome-header">
                    <span>{gameMode === GAME_MODES.NOVEL ? 'Novel Mode' : 'Tactical Mode'}</span>
                    {isPreGenerating && <span className="text-amber-500 animate-pulse flex items-center gap-1"><Brain size={14} /> Thinking...</span>}
                </div>

                <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500 ${groupDecisionOptions.length > 0 ? 'grayscale opacity-50 pointer-events-none' : ''}`}>
                    <div className="p-4 space-y-3">
                        {party.map(id => {
                            const char = agentRoster.find(c => c.id === id);
                            if (!char) return null;
                            const state = gameState[id] || { hp: 100, psych: "正常" };
                            const isDead = state.hp <= 0;
                            const hasAction = !!pendingActions[id];
                            // Action ready: narrative finished, not generating, alive, manual mode, no action yet
                            const isActionReady = !isNarrating && !isGenerating && !isDead && !hasAction && char.controlMode !== 'auto';

                            return (
                                <div
                                    key={id}
                                    onClick={() => {
                                        if (isDead || isGenerating || char.controlMode === 'auto' || groupDecisionOptions.length > 0) return;
                                        if (!actionCache[char.id]?.options?.length) handleRegenerateOptions(char);
                                        setActionModalChar(char);
                                    }}
                                    className={`group relative p-3 rounded transition-all cursor-pointer flex flex-col gap-2 ${isActionReady ? 'action-ready-glow border-amber-500/50 border-2' : ''} ${hasAction ? 'border-amber-500 shadow-md border-2' : !isActionReady ? 'border-slate-700 border hover:border-slate-500' : ''} ${isDead ? 'opacity-50 grayscale bg-red-900/20' : hasAction ? 'bg-slate-800 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]' : 'bg-transparent'}`}
                                >
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full border-2 border-[#1a1a1a] overflow-hidden shadow-sm sepia-[.3]">
                                                <img src={char.avatar || char.avatarUrl || ''} className="w-full h-full object-cover mix-blend-multiply transform scale-[1.6] translate-y-4" alt="avatar" />
                                            </div>
                                            {hasAction && <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 rounded-full p-0.5 border-2 border-amber-600 z-10"><PlayCircle size={14} fill="currentColor" /></div>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`font-tome-header font-bold truncate text-lg ${isDead ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{char.name}</span>
                                                <div className="flex items-center gap-2 relative z-20">
                                                    <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleControlMode(char.id); }} className={`flex items-center gap-1.5 px-2 py-1 rounded-sm border ${char.controlMode === 'auto' ? 'bg-slate-700 text-white border-slate-600' : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'}`}>
                                                        {char.controlMode === 'auto' ? <Bot size={10} /> : <User size={10} />}
                                                        <span className="text-[9px] font-bold uppercase tracking-wider">{char.controlMode === 'auto' ? 'Auto' : 'Manual'}</span>
                                                    </button>
                                                    <button onClick={e => { e.preventDefault(); e.stopPropagation(); setActionModalChar(char); }} className="p-1 hover:bg-white/10 rounded-full text-slate-500 hover:text-white"><Eye size={12} /></button>
                                                </div>
                                            </div>
                                            <div className="w-full h-2 bg-slate-800 rounded-none overflow-hidden mb-2 border border-slate-700 relative">
                                                <div className={`h-full transition-all duration-500 ${state.hp / (state.maxHp || 100) < 0.3 ? 'bg-red-600' : 'bg-emerald-600'}`} style={{ width: `${Math.min(100, Math.max(0, (state.hp / (state.maxHp || 100)) * 100))}%` }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-400 h-4 items-center">
                                                {hasAction ? <span className="text-amber-500 truncate italic font-bold flex items-center gap-1"><ChevronRight size={12} /> {pendingActions[id]}</span> : <><span className="flex items-center gap-1"><Heart size={10} className="text-red-500" /> {Math.round((state.hp / (state.maxHp || 100)) * 100)}%</span><span className="flex items-center gap-1"><Activity size={10} /> {state.psych}</span></>}
                                            </div>
                                        </div>
                                    </div>
                                    {actionModalChar?.id === char.id && (
                                        <div className="hidden md:block w-full">
                                            <ActionModal
                                                character={char}
                                                actionCache={actionCache}
                                                inventory={char.inventory || []}
                                                direction="down"
                                                onSelectAction={(cid, text) => { setPendingActions(p => ({ ...p, [cid]: text })); setActionModalChar(null); showToast(`已排程：${text.slice(0, 30)}...`, "info"); }}
                                                onStyleDialogue={async (c, txt) => (charAgent && styleMode) ? await charAgent.styleDialogue(c.name, c, txt, logs.slice(-1)[0]?.content || "") : txt}
                                                onRegenerateOptions={() => handleRegenerateOptions(char)}
                                                onClose={e => { if (e) e.stopPropagation(); setActionModalChar(null); }}
                                                isRegenerating={isPreGenerating}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <ScenarioRoster roster={scenarioRoster.filter(r => !party.includes(r.id))} />
                    <div className="px-4 pb-10"><TokenDisplay /></div>
                </div>
            </div>

            {/* Group Decisions */}
            {groupDecisionOptions.length > 0 && !isGenerating && !isNarrating && (
                <GroupDecisionOptions
                    options={groupDecisionOptions}
                    votes={decisionVotes.votes}
                    majority={decisionVotes.majority}
                    voteCounts={decisionVotes.voteCounts}
                    roster={roster.filter(c => party.includes(c.id))}
                    isLoading={isLoadingVotes}
                    onSelect={option => { setGroupDecisionOptions([]); setDecisionVotes({ votes: [], majority: null, voteCounts: {} }); executeTurn(false, `【團隊決策】${option}`); }}
                />
            )}
        </div>
    );
};

export default GameInterface;
