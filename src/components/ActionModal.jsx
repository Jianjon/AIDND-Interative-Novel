import React, { useState } from 'react';
import { X, Sword, Sparkles, Package, Zap, Send, RefreshCw, Terminal, ChevronDown, Eye, Scroll, Feather } from 'lucide-react';

/**
 * ActionModal.jsx (Dark Tome Style)
 * 
 * Pops open "below" or "near" the character card.
 * Content:
 * 1. Mindset (Monologue)
 * 2. 3 AI Options
 * 3. Custom (Input OR Item)
 */
export default function ActionModal({
    character,
    actionCache,
    inventory = [],
    onSelectAction,
    onRegenerateOptions,
    onStyleDialogue,
    onClose,
    isRegenerating = false,
    direction = 'down' // 'down' (default) or 'up' (for bottom items)
}) {
    const [customInput, setCustomInput] = useState('');
    const [isStyling, setIsStyling] = useState(false);
    const [manualMode, setManualMode] = useState('custom'); // 'custom' | 'item'

    if (!character) return null;

    const charOptions = actionCache[character.id] || { options: [], monologue: '' };
    const options = charOptions.options || [];
    const monologue = charOptions.monologue || '';
    const hp = character.hp ?? 0; // Use direct prop as App.jsx passes updated character object
    const isDowned = hp <= 0;

    // Handle option selection
    const handleSelectOption = (option) => {
        const text = typeof option === 'object' ? option.text : option;
        const isGroup = typeof option === 'object' ? !!option.isGroup : false;
        onSelectAction(character.id, text, isGroup);
        onClose();
    };

    // Handle custom action
    const handleCustomSubmit = async () => {
        if (!customInput.trim()) return;
        setIsStyling(true);
        try {
            const { text: styledText } = await onStyleDialogue(character, customInput);
            onSelectAction(character.id, styledText);
            onClose();
        } catch (error) {
            console.error("Styling failed:", error);
            onSelectAction(character.id, customInput);
            onClose();
        } finally {
            setIsStyling(false);
        }
    };

    // Helper: partial check for readable items
    const isReadable = (itemName) => {
        const name = itemName.toLowerCase();
        return name.includes('book') || name.includes('letter') || name.includes('scroll') || name.includes('note') || name.includes('journal') ||
            name.includes('書') || name.includes('信') || name.includes('卷軸') || name.includes('文件') || name.includes('筆記') || name.includes('日記') || name.includes('圖');
    };

    const positionClasses = direction === 'up'
        ? "bottom-full mb-2 slide-in-from-bottom-2 origin-bottom"
        : "top-full mt-2 slide-in-from-top-2 origin-top";

    // Dark Tome Aesthetic Classes
    // Dark Tome Aesthetic Classes
    // If Downed, use Red/Black theme
    const containerClasses = isDowned
        ? "bg-red-950/95 border border-red-500/50 shadow-[0_10px_40px_rgba(255,0,0,0.2)] backdrop-blur-md"
        : "bg-slate-900/95 border border-amber-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md";

    const headerClasses = isDowned
        ? "bg-red-900/40 border-b border-red-500/30"
        : "bg-slate-950/50 border-b border-white/5";

    const accentColor = isDowned ? "text-red-500" : "text-amber-500";
    const accentHover = isDowned ? "hover:text-red-400" : "hover:text-amber-400";
    const textPrimary = isDowned ? "text-red-100" : "text-slate-200";
    const textSecondary = isDowned ? "text-red-400/80" : "text-slate-400";

    return (
        <div className={`absolute left-0 z-50 w-[400px] rounded-lg flex flex-col overflow-hidden animate-in fade-in ${positionClasses} ${containerClasses} font-serif`}>

            {/* 1. Header & Mindset */}
            <div className={`${headerClasses} p-3 relative`}>
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                    <X size={16} />
                </button>

                <h3 className={`${accentColor} font-bold text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-tome-header`}>
                    <Feather size={12} fill="currentColor" /> {character.name}'s Turn {isDowned && <span className="text-red-500 animate-pulse font-extrabold ml-2">[濒死 - DOWNED]</span>}
                </h3>

                {monologue ? (
                    <p className="text-indigo-200/90 text-sm italic border-l-2 border-indigo-500/50 pl-3 py-1 bg-indigo-500/10 rounded-r font-tome-script leading-relaxed">
                        "{monologue}"
                    </p>
                ) : (
                    <p className={`${textSecondary} text-xs italic`}>Considering options...</p>
                )}
            </div>

            <div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">

                {/* 2. AI Options */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center mb-1 pb-1 border-b border-white/5">
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${textSecondary} font-tome-header`}>Suggested Actions</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); onRegenerateOptions(character.id); }}
                            disabled={isRegenerating}
                            className={`text-[10px] ${accentColor} ${accentHover} flex items-center gap-1 disabled:opacity-50 font-tome-header uppercase tracking-wider`}
                        >
                            <RefreshCw size={10} className={isRegenerating ? 'animate-spin' : ''} />
                            Regenerate
                        </button>
                    </div>

                    {options.length > 0 ? (
                        <div className="space-y-3">
                            {options.map((option, idx) => {
                                const isObj = typeof option === 'object';
                                let txt = isObj ? option.text : option;
                                const emoji = isObj ? option.emoji : null;

                                // If we have a separate emoji field, try to strip it from the start of the text to avoid duplication
                                if (emoji && txt.startsWith(emoji)) {
                                    txt = txt.substring(emoji.length).trim();
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); handleSelectOption(isObj ? option.text : option); }}
                                        className="w-full text-left p-3 rounded border border-white/5 bg-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all text-sm group flex items-start gap-3 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-white/5 group-hover:bg-amber-500"></div>
                                        <div className="flex flex-col items-center min-w-[1.5rem] mt-0.5">
                                            {/* Labels removed, using emojis only */}
                                            {emoji && <span className="text-xl leading-none">{emoji}</span>}
                                        </div>
                                        <span className={`${textPrimary} leading-relaxed font-tome-body group-hover:text-white flex-1`}>{txt}</span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={`text-center py-4 border border-dashed border-white/10 rounded ${textSecondary} text-xs italic`}>
                            {isRegenerating ? 'Consulting the Fates...' : 'No suggestions available.'}
                        </div>
                    )}
                </div>

                {/* 3. Manual / Item Toggle */}
                <div className="pt-2 border-t border-white/10">
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); setManualMode('custom'); }}
                            className={`flex-1 py-1.5 text-xs font-bold uppercase rounded border transition-colors flex items-center justify-center gap-2 font-tome-header tracking-wider
                                ${manualMode === 'custom'
                                    ? 'bg-blue-900/30 text-blue-400 border-blue-500/50'
                                    : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300'}
                            `}
                        >
                            <Feather size={12} /> Free Action
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setManualMode('item'); }}
                            className={`flex-1 py-1.5 text-xs font-bold uppercase rounded border transition-colors flex items-center justify-center gap-2 font-tome-header tracking-wider
                                ${manualMode === 'item'
                                    ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/50'
                                    : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300'}
                            `}
                        >
                            <Package size={12} /> Items ({inventory.length})
                        </button>
                    </div>

                    {manualMode === 'custom' ? (
                        <div className="space-y-3 relative">
                            <textarea
                                onClick={(e) => e.stopPropagation()}
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                placeholder="Describe your action..."
                                className="w-full h-24 bg-slate-950 border border-slate-800 rounded p-3 text-sm text-slate-200 focus:border-amber-500/50 focus:outline-none resize-none font-tome-body italic shadow-inner placeholder:text-slate-600"
                            />
                            {/* Send Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleCustomSubmit(); }}
                                disabled={!customInput.trim() || isStyling}
                                className={`
                                    absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all
                                    ${!customInput.trim() || isStyling
                                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                        : 'bg-amber-600 text-white hover:bg-amber-500 active:scale-95'}
                                `}
                                title="Execute Action"
                            >
                                {isStyling ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} className="ml-0.5 mt-0.5" />}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto pr-1">
                            {inventory.length === 0 ? (
                                <p className={`text-xs ${textSecondary} text-center py-4 italic`}>No items in satchel.</p>
                            ) : (
                                inventory.map((item, idx) => {
                                    const itemName = typeof item === 'string' ? item : item.name;
                                    const readable = isReadable(itemName);

                                    return (
                                        <div
                                            key={idx}
                                            className="px-3 py-2 bg-white/5 border border-white/5 rounded flex items-center justify-between group hover:border-amber-500/30 hover:bg-white/10 transition-colors"
                                        >
                                            <span className="text-xs text-slate-300 truncate mr-2 font-tome-body font-bold group-hover:text-white">
                                                {itemName}
                                            </span>

                                            <div className="flex items-center gap-1">
                                                {/* Inspect Button - Only for Readable */}
                                                {readable && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); onSelectAction(character.id, `仔細觀察並閱讀了 "${itemName}"`); onClose(); }}
                                                        className="p-1 hover:bg-sky-500/20 text-slate-500 hover:text-sky-400 rounded-full transition-colors"
                                                        title="Read"
                                                    >
                                                        <Eye size={12} />
                                                    </button>
                                                )}

                                                {/* Use Button */}
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onSelectAction(character.id, `使用 ${itemName}`); onClose(); }}
                                                    className="px-2 py-0.5 bg-slate-800 hover:bg-emerald-600 text-[10px] text-slate-400 hover:text-white rounded uppercase tracking-wider font-tome-header transition-colors"
                                                >
                                                    使用
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
