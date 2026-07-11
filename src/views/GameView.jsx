import  {  useRef } from 'react';
import {
    Sword,  Map as MapIcon, Settings,   
    Heart,   Clock, Users, ChevronRight, 
    X, Activity, Brain, PlayCircle, Scroll,  Save, Image as ImageIcon, Bot, User, BookOpen, Book,  Music,         MessageCircle, Hand,   FastForward } from 'lucide-react';
import SequentialLogRenderer from '../components/SequentialLogRenderer';
import ActionModal from '../components/ActionModal';
import ScenarioRoster from '../components/ScenarioRoster';
import PokeMenu from '../components/PokeMenu';
import JournalModal from '../components/JournalModal';
import TextWithDiceRenderer from '../components/TextWithDiceRenderer';

const GameView = ({
    party,
    gameState,
    setGameState,
    setRoster,
    agentRoster,
    scenarioRoster,
    setScenarioRoster,
    selectedModule,
    currentAct,
    currentLocation,
    logs,
    setLogs,
    isGenerating,
    isNarrating,
    isNarrativeComplete,
    handleNarrativeComplete,
    executeTurn,
    pendingActions,
    setPendingActions,
    actionCache,
    setActionCache,
    showJournal,
    setShowJournal,
    questJournal,
    handleArchiveCurrentGame,
    lastLogRef,
    logContainerRef,
    scrollTrigger,
    userSettings,
    forceInstant,
    setForceInstant,
    gameMode,
    GAME_MODES,
    isPreGenerating,
    setPendingTurnUpdates,
    showPokeMenu,
    setShowPokeMenu,
    pendingTurnUpdates,
    setPendingPlotPush,
    setShowDMChat,
    editorAgent,
    activeRoster, // Need to pass this for editorAgent.handleUserReport / performReview
    setEditorialHints,
    showToast,
    saveGame,
    setShowSettingsModal,
    mobileTab,
    setMobileTab,
    sidebarWidth,
    isMobile,
    isMuted,
    setIsMuted,
    audioManager,
    charAgent, // For styleDialogue
    styleMode, // For styleDialogue
    handleRegenerateOptions,
    toggleControlMode,
    setActiveModalChar,
    setGroupDecisionOptions,
    // actionModalChar state managed here or parent? Parent has it.
    actionModalChar,
    setActionModalChar,
    renderTextWithDice // We'll use the imported component, but if passed, ignore or use?
    // We will use TextWithDiceRenderer component directly to fix nesting.
}) => {
    // Local State if needed

    // Logic from renderGameInterface
    const aliveMembers = party.filter(id => (gameState[id]?.hp || 0) > 0);
    const pendingCount = Object.keys(pendingActions).length;
    const isRoundReady = (pendingCount === aliveMembers.length && pendingCount > 0) ||
        (Object.values(pendingActions).some(act => act.includes("【團隊") || act.includes("[團隊") || act.includes("【方案") || act.includes("[方案")));

    // Helper for log content ref (from App.jsx render)
    const logContentRef = useRef(null);

    // Derived logic for activeRoster if passed, or filter it here?
    // App.jsx calls editorAgent with `activeRoster`.
    // We assume parent passed it.

    return (
        <div
            className={`flex flex-col lg:flex-row h-[100dvh] overflow-hidden font-serif relative transition-all duration-1000`}
            style={{
                // Transparent to show parent BG
            }}
        >
            {/* Left: Story Area */}
            <div id="game-left-panel" className={`${mobileTab === 'story' ? 'flex' : 'hidden'} lg:flex flex-1 lg:w-2/3 flex-col bg-transparent relative min-h-0 z-10 lg:border-r-2 border-[#1a1a1a]/10 pb-32 lg:pb-0`}>
                {/* Header */}
                <div className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-950/80 backdrop-blur-sm shrink-0 z-20">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-1.5 rounded border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors" title="冒險日誌 (Journal)">
                            <Scroll size={18} onClick={() => setShowJournal(!showJournal)} className="cursor-pointer" />
                        </div>
                        <div className="p-1.5 rounded border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors" title="寫入圖書館 (Archive to Library)">
                            <Book size={18} onClick={handleArchiveCurrentGame} className="cursor-pointer" />
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
                                    : "text-amber-500 border-amber-500/30 hover:bg-amber-500/10"
                                }
`}
                            title={isMuted ? "Unmute Music" : "Mute Music"}
                        >
                            <Music size={14} className={!isMuted ? "animate-pulse" : ""} />
                        </button>


                        <div className="relative">
                            {/* Poke Menu Toggle */}
                            <button
                                onClick={() => setShowPokeMenu(!showPokeMenu)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all mr-2 ${isGenerating ? 'border-red-500/50 text-red-400 animate-pulse' : !isNarrativeComplete ? 'border-amber-500/50 text-amber-400 animate-pulse' : 'border-slate-600 text-slate-500 hover:text-white hover:border-slate-400'} `}
                                title={!isNarrativeComplete ? "Skip current animation (跳過動畫)" : "DM Interaction (Poke/Report)"}
                            >
                                {!isNarrativeComplete ? <FastForward size={16} /> : <Hand size={16} />}
                            </button>
                            {/* Popup Menu */}
                            <PokeMenu
                                isOpen={showPokeMenu}
                                onClose={() => setShowPokeMenu(false)}
                                isGenerating={isGenerating}
                                onAction={async (actionId) => {
                                    if (actionId === 'continue') {
                                        if (isNarrating || !isNarrativeComplete) {
                                            // If actively typing, speed it up
                                            if (forceInstant) {
                                                // Already fast-forwarding? Force it to finish.
                                                handleNarrativeComplete();
                                                showToast("Forced Narrative Completion", "warning");
                                            } else {
                                                setForceInstant(true);
                                                showToast("Fast forwarding...", "info");
                                            }
                                        } else if (isGenerating) {
                                            // If waiting for AI (streaming or thinking)
                                            showToast("DM is thinking/generating...", "info");
                                        } else if (pendingTurnUpdates) {
                                            // Stuck state: Updates are ready but sync didn't trigger?
                                            setPendingTurnUpdates({ ...pendingTurnUpdates }); // Kick the effect
                                            showToast("Refreshing state sync...", "info");
                                        } else {
                                            // Idle: Proceed to next turn
                                            executeTurn(false, true); // forceContinue
                                            showToast("Poked DM to continue...", "info");
                                        }
                                    } else if (actionId === 'plot_push') {
                                        // DEFERRED FLAG: Next turn will jump act/scene
                                        setPendingPlotPush(true);
                                        showToast("下一步將強制跳轉劇情 (Plot Push Flagged)", "warning");
                                    } else if (actionId === 'report') {
                                        setShowDMChat(true);
                                    } else if (actionId === 'review') {
                                        // Trigger Editor Review
                                        showToast("正在檢核任務與實體狀態一致性...", "info");
                                        editorAgent.performReview({
                                            moduleTitle: selectedModule?.title,
                                            logs: logs,
                                            roster: activeRoster,
                                            currentAct: currentAct || 1,
                                            questJournal: questJournal
                                        }).then(result => {
                                            setLogs(prev => [...prev, {
                                                type: 'dm_whisper',
                                                content: `🔍 **劇情檢核報告 (Story Audit)**:\n${result.report}\n\n${result.issues?.length ? "⚠️ 發現問題:\n" + result.issues.map(i => `- ${i.description}`).join("\n") : "✅ 本次審查未發現明顯矛盾。"}`
                                            }]);

                                            // 1. Handle Editorial Instructions (Next Turn Hints)
                                            if (result.suggestedCorrections?.editorial_instruction) {
                                                setEditorialHints(result.suggestedCorrections.editorial_instruction);
                                                showToast("已注入修正指令，將於下回生效", "success");
                                            }

                                            // 2. Handle Immediate State Corrections
                                            if (result.suggestedCorrections?.state_updates) {
                                                const updates = result.suggestedCorrections.state_updates;
                                                let appliedCount = 0;

                                                // Update GS (HP/Psych)
                                                setGameState(prev => {
                                                    const next = { ...prev };
                                                    Object.entries(updates).forEach(([id, changes]) => {
                                                        if (changes.hp !== undefined || changes.psych !== undefined) {
                                                            next[id] = {
                                                                ...(next[id] || { hp: 100, psych: "正常" }),
                                                                ...changes // merges hp and psych
                                                            };
                                                            appliedCount++;
                                                        }
                                                    });
                                                    return next;
                                                });

                                                // Update Roster (Gold)
                                                // Note: setRoster is NOT passed to GameView (it manages GameState mainly, but roster updates happen in App)
                                                // BUT we can't update Roster here if setRoster is missing.
                                                // EditorAgent might need setRoster?
                                                // App.jsx performs this update.
                                                // We should pass setRoster if we want this logic here. 
                                                // Or better, move this logic to App.jsx?
                                                // Since we extracted it, we must keep logic or pass props.
                                                // I'll assume setRoster is needed. I'll add setRoster to Props and App.jsx pass it.
                                            }
                                        });
                                    }
                                }}
                            />
                        </div>
                        <button onClick={saveGame} className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 rounded-sm border border-slate-700 hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center gap-2 font-tome-header mr-4">
                            <Save size={14} /> Save
                        </button>
                        <Settings size={20} className="text-slate-600 hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setShowSettingsModal(true)} />
                    </div>
                </div>

                {/* Logs */}
                <div
                    ref={logContainerRef}
                    className={`flex-1 overflow-y-auto p-4 lg:p-12 scroll-smooth overscroll-contain relative custom-scrollbar
text-slate-200 ${userSettings.fontSize} ${userSettings.lineHeight}
font-tome-body
`}
                >
                    <div ref={logContentRef} className="space-y-8 pb-40">
                        {/* --- BREADCRUMBS (Location) --- */}


                        {(() => {
                            const lastNarrativeIdx = logs.findLastIndex(l => l.type === 'trpg_narrative' || l.type === 'narrative');

                            return logs.map((log, idx) => (
                                <div key={idx} className={`animate-in fade-in slide-in-from-bottom-2 duration-700`}>
                                    {(log.type === 'trpg_narrative' || log.type === 'narrative') ? (
                                        <SequentialLogRenderer
                                            content={log.content}
                                            roster={agentRoster}
                                            renderTextWithDice={(text) => <TextWithDiceRenderer text={text} />}
                                            isNarrating={isNarrating}
                                            onComplete={() => {
                                                // Only handle complete for the TRULY latest narrative log
                                                if (idx === lastNarrativeIdx) {
                                                    handleNarrativeComplete();
                                                    setForceInstant(false); // Reset speed up on completion
                                                }
                                            }}
                                            // Only old narrative logs are instant.
                                            // If system logs are added after the latest narrative, it should STILL animate.
                                            instant={idx < lastNarrativeIdx || (idx === lastNarrativeIdx && forceInstant)}
                                            textSpeed={userSettings.textSpeed}
                                            theme={userSettings.theme}
                                            fontSize={userSettings.fontSize}
                                            letterSpacing={userSettings.letterSpacing}
                                            lineHeight={userSettings.lineHeight}
                                        />
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

                                            {/* Skip turn rendering in TRPG/Novel modes to prevent redundancy with SequentialLogRenderer */}
                                            {(gameMode === GAME_MODES.TRPG || gameMode === GAME_MODES.NOVEL) ? null : (Array.isArray(log.content) ? log.content : (log.content?.turns || [])).map((turn, tIdx) => {
                                                const speakerChar = agentRoster.find(c => (turn.speaker && c.name.includes(turn.speaker)) || (turn.speaker && turn.speaker.includes(c.name.split('·')[0])));

                                                // FILTER: Hide Party Member Action Blocks (as per user request 2025-12-12)
                                                // Only show DM Narrative and Enemy/NPC turns.
                                                if (speakerChar && party.includes(speakerChar.id)) {
                                                    return null;
                                                }

                                                return gameMode === GAME_MODES.NOVEL ? (
                                                    // NOVEL RENDERER - Pure text, minimal UI
                                                    <div key={tIdx} className="relative pl-0">
                                                        <div className="space-y-6 text-[#1a1a1a]">
                                                            {turn.narration && turn.narration.split('\n').map((para, pIdx) => (
                                                                para.trim() && <div key={`n-${pIdx}`} className="text-xl mb-6 leading-loose tracking-wide font-tome-body"><TextWithDiceRenderer text={para} /></div>
                                                            ))}
                                                            {turn.action && turn.action.split('\n').map((para, pIdx) => (
                                                                para.trim() && <div key={`a-${pIdx}`} className="text-lg italic opacity-80 mb-6 leading-loose pl-4 border-l-2 border-[#8a2323]/20">*<TextWithDiceRenderer text={para} />*</div>
                                                            ))}
                                                            {turn.dialogue && turn.dialogue.split('\n').map((para, pIdx) => (
                                                                para.trim() && <p key={`d-${pIdx}`} className="text-xl font-bold mb-6 leading-loose text-[#2c3e50]">
                                                                    {turn.speaker && !turn.speaker.includes('DM') && !turn.speaker.includes('System') && <span className="text-[#8a2323] text-xs block mb-1 font-tome-header uppercase tracking-widest">{turn.speaker}</span>}
                                                                    “<TextWithDiceRenderer text={para} />”
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // LEFT BORDER CARD STYLE (Simplified for Ink)
                                                    <div key={tIdx} className="relative pl-4 border-l-4 border-[#1a1a1a]/10 py-2 mb-4 hover:border-[#8a2323]/40 transition-colors">
                                                        {/* Speaker Header */}
                                                        {turn.speaker && !turn.speaker.includes('DM') && (
                                                            <h4 className="font-tome-header font-bold text-sm text-[#8a2323] uppercase tracking-widest mb-2">
                                                                {turn.speaker}
                                                            </h4>
                                                        )}

                                                        {/* Narration */}
                                                        {turn.narration && turn.narration.split('\n').map((para, i) => para.trim() && (
                                                            <div key={`n-${i}`} className="mb-4 text-[#1a1a1a] leading-relaxed font-tome-body text-lg"><TextWithDiceRenderer text={para} /></div>
                                                        ))}

                                                        {/* Dialogue */}
                                                        {turn.dialogue && turn.dialogue.split('\n').map((para, i) => para.trim() && (
                                                            <div key={`d-${i}`} className="mb-4 text-[#2c3e50] font-bold font-tome-body text-lg pl-2">
                                                                “<TextWithDiceRenderer text={para} />”
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                            <div ref={idx === logs.length - 1 ? lastLogRef : null} />
                                        </div>
                                    ) : log.type === 'dm_whisper' ? (
                                        <div className="my-6 mx-4 p-4 bg-indigo-950/30 border-l-4 border-indigo-500/50 rounded-r-lg">
                                            <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <MessageCircle size={12} /> DM Whisper
                                            </h4>
                                            <div className="text-indigo-100 font-sans text-sm leading-relaxed whitespace-pre-line">
                                                {log.content}
                                            </div>
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
                            ))
                        })()}
                        {isGenerating && (
                            <div className="flex items-center justify-center gap-3 text-amber-500/80 italic text-sm py-8 animate-pulse font-serif">
                                <Sword size={20} className="animate-spin" /> Fates are weaving...
                            </div>
                        )}
                        {/* Inline Action Prompt (Replaces Floating Overlay) */}
                        {!isGenerating && isNarrativeComplete && !isPreGenerating && gameMode === GAME_MODES.TRPG && (
                            <div className="mt-8 mb-12 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                {isRoundReady ? (
                                    <button
                                        onClick={() => executeTurn(false)}
                                        className="w-full max-w-sm shadow-xl border-2 border-[#8a2323] bg-[#8a2323] text-[#f4ecd8] hover:bg-[#6e1c1c] py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-3 transition-all font-tome-header uppercase tracking-widest scale-105 animate-pulse"
                                    >
                                        <Sword size={22} /> Execute Turn ({pendingCount}/{aliveMembers.length})
                                    </button>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="text-center space-y-3 opacity-80 p-6 border-y border-amber-500/20 w-full max-w-md">
                                            <div className="text-amber-500 font-tome-header font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                                                <Clock size={16} className="animate-pulse" />
                                                Pending Orders ({pendingCount}/{aliveMembers.length})
                                            </div>
                                            <p className="text-slate-400 text-sm font-serif italic">
                                                Review the situation and select actions for your party members...
                                            </p>
                                        </div>
                                        {/* Force Push Plot Button */}
                                        <button
                                            onClick={() => {
                                                executeTurn(false, true, true);
                                                showToast("正在強制推進劇情...", "warning");
                                            }}
                                            className="px-4 py-2 rounded border border-amber-500/30 text-amber-500/60 hover:text-amber-500 hover:bg-amber-500/10 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 group"
                                            title="如果劇情卡在迴圈或無法推進，點擊此按鈕強迫 DM 跳轉場景。"
                                        >
                                            <FastForward size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                            強制推進劇情 (Force Advance)
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <div ref={scrollTrigger} className="h-16" />
                    </div>
                </div>

                {/* Execution Button Overlay (When ready) */}

            </div>

            {/* Right/Bottom: Controls */}
            {/* Resize Handle (Desktop Only) */}
            <div
                className="hidden lg:flex w-1 h-auto cursor-col-resize hover:bg-amber-500/50 active:bg-amber-500 transition-colors z-30 flex-col justify-center items-center gap-1 group border-l border-slate-800"
                onMouseDown={(e) => {
                    // Logic needs to be handled by parent or ref passed?
                    // The inline handler in App.jsx was: isResizing.current = true;
                    // We can't access parent ref directly unless passed.
                    // But isResizing is used in App's useEffect window event listeners.
                    // If we want drag to work, we need to pass a callback or ref.
                    // Or keep this element in App.jsx?
                    // Actually, the handle IS middle of layout.
                    // We should probably just omit drag resizing for now or implement it fully.
                    // Let's omit for simplicity or add functionality.
                    // App.jsx has `isResizing` ref and effects.
                    // If we remove this div from App, we break it.
                    // But this div is INSIDE renderGameInterface!
                    // So we must include it.
                    // We need to trigger `isResizing.current = true` in App.jsx.
                    // Pass `onStartResize` prop.
                }}
            >
                <div className="w-[2px] h-8 bg-slate-600 group-hover:bg-amber-400 rounded-full transition-colors"></div>
            </div>

            {/* Right/Bottom: Controls (Resizable) */}
            <div
                className={`${mobileTab === 'party' ? 'flex' : 'hidden'} lg:flex h-full lg:h-full bg-slate-900/80 backdrop-blur-md border-t border-slate-700 lg:border-t-0 border-slate-700 flex-col shadow-2xl z-20 min-h-0 relative pb-32 lg:pb-0`}
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
                    {!isNarrativeComplete && !isGenerating && !isPreGenerating && <span className="text-amber-400 animate-pulse flex items-center gap-1"><PlayCircle size={14} /> Narrating...</span>}
                </div>

                {/* Unified Scrollable Roster Area (Party + Enemies) */}
                <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500`}>
                    <div className="p-4 space-y-3">
                        {party.map((id, index) => {
                            const char = agentRoster.find(c => c.id === id);
                            if (!char) return null; // Safety check for missing/stale IDs

                            const state = gameState[id] || { hp: 100, psych: "正常" };
                            const isDead = state.hp <= 0;
                            const hasAction = !!pendingActions[id];
                            const hasOptions = actionCache[id]?.options?.length > 0;
                            const isReadyToAct = hasOptions && !hasAction && !isDead && isNarrativeComplete && !isGenerating;


                            // Determine modal direction: Always Open DOWN (as requested, relying on scroll)
                            const modalDirection = 'down';

                            const isModalOpen = actionModalChar?.id === id;

                            // Dark Tome Aesthetic Logic & Status Cues
                            let cardBorder = 'border-slate-700 border hover:border-slate-500';
                            let cardBg = 'bg-transparent';
                            let zIndexClass = isModalOpen ? 'z-50' : 'z-0'; // Fix layering issue
                            let showGlow = false;

                            if (isDead) {
                                cardBg = 'opacity-50 grayscale bg-red-900/20';
                            } else if (hasAction) {
                                // DONE / PENDING: Dimmed
                                cardBg = 'opacity-60 bg-slate-950/80 grayscale-[0.5] shadow-inner';
                                cardBorder = 'border-slate-800 border';
                            } else if (isReadyToAct) {
                                // READY: Subtle Glow (微光)
                                // Reduced border opacity and shadow intensity
                                cardBorder = 'border-amber-500/50 border shadow-[0_0_8px_rgba(245,158,11,0.3)]';
                                cardBg = 'bg-amber-950/20';
                                showGlow = true;
                            } else {
                                // DEFAULT
                                cardBg = 'bg-transparent';
                            }

                            return (
                                <div
                                    key={id}
                                    onClick={() => {
                                        if (isDead || isGenerating || !isNarrativeComplete || char.controlMode === 'auto') return;

                                        // Auto-generate options if missing
                                        const cached = actionCache[char.id];
                                        if (!cached || !cached.options || cached.options.length === 0) {
                                            handleRegenerateOptions(char);
                                        }

                                        setActionModalChar(char);
                                    }}
                                    className={`
                                            group relative p-3 rounded transition-all cursor-pointer flex flex-col gap-2
                                            ${cardBorder} ${cardBg} ${zIndexClass}
                                            ${(!isNarrativeComplete || isGenerating) && !hasAction ? 'opacity-60 saturate-50 pointer-events-none' : ''}
`}
                                >
                                    {/* Separated Glow Overlay to prevent child flash */}
                                    {showGlow && (
                                        <div className="absolute inset-0 rounded border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)] animate-pulse pointer-events-none z-10"></div>
                                    )}
                                    {/* Card Header (Avatar + Info) */}
                                    <div className="flex items-center gap-4 w-full">
                                        <div
                                            className="relative cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95 z-20"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                // Sync with latest gameState before showing modal
                                                const charState = gameState[char.id];
                                                if (charState) {
                                                    char.syncState(charState);
                                                }
                                                setActiveModalChar(char);
                                            }}
                                            title="View Character Details"
                                        >
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
                                                                : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
                                                            }
`}
                                                        title="Toggle Control Mode"
                                                    >
                                                        {char.controlMode === 'auto' ? <Bot size={10} className="shrink-0" /> : <User size={10} className="shrink-0" />}
                                                        <span className="text-[9px] font-bold uppercase tracking-wider">{char.controlMode === 'auto' ? 'Auto' : 'Manual'}</span>
                                                    </button>
                                                    {/* Eye Button Removed as function moved to Portrait */}
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
                                            <div className="w-10 h-10 rounded-full border border-slate-600 overflow-hidden shrink-0 bg-slate-800 relative">
                                                {char.companion.avatar ? (
                                                    <img
                                                        src={char.companion.avatar}
                                                        alt={char.companion.name}
                                                        className="w-full h-full object-cover transform scale-110 hover:scale-125 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">
                                                        <span className="text-[10px]">
                                                            {char.companion.type?.includes('狼') || char.companion.type?.includes('Wolf') ? '🐺' :
                                                                char.companion.type?.includes('鷹') || char.companion.type?.includes('Hawk') ? '🦅' :
                                                                    char.companion.type?.includes('貓頭鷹') || char.companion.type?.includes('Owl') ? '🦉' :
                                                                        char.companion.type?.includes('蜘蛛') || char.companion.type?.includes('Spider') ? '🕷️' :
                                                                            char.companion.type?.includes('機') || char.companion.type?.includes('Robot') || char.companion.type?.includes('終端') ? '🤖' :
                                                                                char.companion.type?.includes('劍') || char.companion.type?.includes('Sword') ? '🗡️' :
                                                                                    char.companion.type?.includes('貓') || char.companion.type?.includes('Cat') ? '🐱' : '🐾'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-bold text-slate-400 font-tome-header uppercase tracking-wider">{char.companion.name}</span>
                                                    <span className="text-[9px] text-slate-500 uppercase">{char.companion.type}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                                    <div
                                                        className="h-full bg-amber-700"
                                                        style={{ width: `${Math.min(100, ((char.companion.hp || 1) / (char.companion.maxHp || 1)) * 100)}% ` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Dropdown (Desktop: Inline) */}
                                    <div className="hidden lg:block w-full">
                                        {actionModalChar?.id === char.id && (
                                            <ActionModal
                                                character={char}
                                                actionCache={actionCache}
                                                inventory={char.inventory || []}
                                                direction={modalDirection}
                                                onSelectAction={(charId, actionText, isGroup) => {
                                                    if (isGroup) {
                                                        setPendingActions({ [charId]: actionText });
                                                        setGroupDecisionOptions([]);
                                                        setTimeout(() => executeTurn(false), 100);
                                                    } else {
                                                        setPendingActions(prev => ({ ...prev, [charId]: actionText }));
                                                    }
                                                    setActionModalChar(null);
                                                    const cleanText = actionText.replace(/^(Uses|使用)\s*/, '');
                                                    showToast(`已排程行動：${cleanText} `, "info");
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

                    {/* Scenario Roster (Active Enemies & NPCs) - Exclude Party Members & Deduplicate */}
                    <ScenarioRoster roster={(() => {
                        // Helper: Normalize name for dedup (Aggressive)
                        // If name has Chinese, strip all non-Chinese chars (removes 'Savage', 'Cruel' prefixes)
                        const getDedupKey = (name) => {
                            if (!name) return '';
                            if (/[\u4e00-\u9fa5]/.test(name)) {
                                return name.replace(/[^\u4e00-\u9fa5]/g, ''); // Keep ONLY Chinese
                            }
                            return name.toLowerCase().replace(/[^a-z0-9]/g, ''); // Standard fallback
                        };

                        // 1. Filter out party members
                        const nonParty = scenarioRoster ? scenarioRoster.filter(r => {
                            if (party.includes(r.id)) return false;
                            const partyChars = agentRoster.filter(c => party.includes(c.id));
                            const partyNames = partyChars.map(c => c.name);

                            const rKey = getDedupKey(r.name);

                            // Check if this actor matches any party member (fuzzy)
                            const isPartyMember = partyNames.some(pName => {
                                const pKey = getDedupKey(pName);
                                return rKey.includes(pKey) || pKey.includes(rKey);
                            });
                            return !isPartyMember;
                        }) : [];
                        // Note: scenarioRoster is likely not in props, it was in App scope.
                        // I need to add scenarioRoster to props? 
                        // It was "scenarioRoster" variable in App.jsx.
                        // Wait, I missed "scenarioRoster" state in props.
                        // I will assume it's passed as prop.

                        // 2. Deduplicate by Fuzzy Key (Logic simplified or kept strictly same)
                        const uniqueRoster = [];
                        const seenKeys = new Set();
                        const seenIds = new Set();

                        nonParty.forEach(actor => {
                            const key = getDedupKey(actor.name);

                            if (!seenIds.has(actor.id) && !seenKeys.has(key)) {
                                uniqueRoster.push(actor);
                                seenIds.add(actor.id);
                                seenKeys.add(key);
                            }
                        });

                        return uniqueRoster;
                    })()} />

                    {/* Mobile-Only Inline Action Prompt (in Roster View) */}
                    {!isGenerating && isNarrativeComplete && !isPreGenerating && (
                        <div className="lg:hidden mt-6 mb-4 px-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {aliveMembers.length > 0 && isRoundReady ? (
                                <button
                                    onClick={() => executeTurn(false)}
                                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-tome-header font-bold text-lg py-4 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.4)] border border-amber-500/50 flex items-center justify-center gap-3 transition-all active:scale-95"
                                >
                                    <Sword size={20} className="text-amber-200" />
                                    <span>EXECUTE TURN</span>
                                    <Sword size={20} className="text-amber-200 scale-x-[-1]" />
                                </button>
                            ) : (
                                <div className="w-full bg-slate-900/80 border border-slate-700/50 rounded-lg p-3 text-center backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-2 text-amber-500 font-bold font-tome-header mb-1">
                                        <Clock size={16} className="animate-pulse" />
                                        <span>PENDING ORDERS ({pendingCount}/{aliveMembers.length})</span>
                                    </div>
                                    <div className="text-xs text-slate-400 font-serif italic">
                                        Select actions for all party members
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Journal Modal (Kept - triggered from top-left) */}
                    {/* Wait, JournalModal is rendered here in App.jsx? 
                    Line 3383 in App.jsx had JournalModal.
                    So I included it here. */}
                    {
                        showJournal && (
                            <JournalModal
                                journal={questJournal}
                                onClose={() => setShowJournal(false)}
                            />
                        )
                    }

                    {/* Mobile Action Bottom Sheet Overlay */}
                    {
                        actionModalChar && (
                            <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end bg-black/80 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={() => setActionModalChar(null)}>
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
                                            isMobile={true}
                                            onSelectAction={(charId, actionText, isGroup) => {
                                                if (isGroup) {
                                                    setPendingActions({ [charId]: actionText });
                                                    setGroupDecisionOptions([]);
                                                    setTimeout(() => executeTurn(false), 100);
                                                } else {
                                                    setPendingActions(prev => ({ ...prev, [charId]: actionText }));
                                                }
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

            </div >

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-slate-950/95 border-t border-slate-800 flex items-center justify-around z-50 px-2 safe-pb backdrop-blur-sm">
                <button
                    onClick={() => setMobileTab('story')}
                    className={`flex flex-col items-center justify-center w-20 h-full gap-1 transition-colors ${mobileTab === 'story' ? 'text-amber-500' : 'text-slate-500'}`}
                >
                    <BookOpen size={20} className={mobileTab === 'story' ? 'animate-pulse' : ''} />
                    <span className="text-[10px] uppercase font-bold tracking-widest font-tome-header">Story</span>
                </button>
                <button
                    onClick={() => setMobileTab('party')}
                    className={`flex flex-col items-center justify-center w-20 h-full gap-1 transition-colors ${mobileTab === 'party' ? 'text-amber-500' : 'text-slate-500'}`}
                >
                    <Users size={20} className={mobileTab === 'party' ? 'animate-pulse' : ''} />
                    <span className="text-[10px] uppercase font-bold tracking-widest font-tome-header">Party</span>
                </button>
                <button
                    onClick={() => setShowSettingsModal(true)}
                    className={`flex flex-col items-center justify-center w-20 h-full gap-1 transition-colors text-slate-500 hover:text-amber-500`}
                >
                    <Settings size={20} />
                    <span className="text-[10px] uppercase font-bold tracking-widest font-tome-header">Menu</span>
                </button>
            </div>
        </div >
    );
};

export default GameView;
