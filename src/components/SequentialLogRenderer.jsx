import React, { useState, useEffect } from 'react';
import DualDiceRoll from './DualDiceRoll';
import { Sword, Shield, Zap, Skull, Crown, Ghost, User, Dices } from 'lucide-react';

const TypewriterText = ({ text, renderWithDice, speed = 20 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayedText(''); // Reset on text change

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    // If fully typed or unmounted, just show full (handled by React state update, but good to be robust)
    // Actually, `renderWithDice` expects a string.
    // If we pass partial string, `renderWithDice` might break if it tries to parse "[Damage..."
    // Wait, `renderTextWithDice` parses blocks like "###" or "[Dice]".
    // If we type character by character, the parsing might flicker or break.
    // BETTER APPROACH: 
    // Just type the raw text if no dice codes. 
    // IF dice codes exist, Typewriter might be risky for the "Dice Block".
    // But `renderTextWithDice` handles plain string too.
    // Lets assume we only typewriter PLAIN text parts?
    // The Input `text` here comes from `child.content` which is usually a line.

    return (
        <div className="animate-in fade-in duration-300">
            {renderWithDice(displayedText)}
        </div>
    );
};

export default function SequentialLogRenderer({ content, roster = [], renderTextWithDice, onComplete, instant = false, textSpeed = 20 }) {
    const [items, setItems] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(instant ? 99999 : 0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasStartedRoll, setHasStartedRoll] = useState(false);

    // Parse content into linear list of renderable items with styles
    useEffect(() => {
        if (!content) return;

        const newItems = [];

        // 1. Split by Sections (###)
        const rawSections = content.split(/(?=###)/g);

        rawSections.forEach((sec) => {
            if (!sec.trim()) return;
            const lines = sec.trim().split('\n');
            const isHeader = lines[0].startsWith('###');
            const headerText = isHeader ? lines[0].replace(/###/g, '').trim() : "場景描述";
            const bodyLines = isHeader ? lines.slice(1) : lines;

            // Determine Style & Identity
            let borderColor = "border-slate-700";
            let bgColor = "bg-slate-900/40";
            let titleColor = "text-slate-400";
            let icon = <Ghost size={20} className="text-slate-500" />;
            let avatarUrl = null;
            let displayName = headerText;
            let controlMode = 'manual';

            if (isHeader) {
                // Check if it's a known character
                // Check if it's a known character (Fuzzy Match / Smart)
                const character = roster.find(c => {
                    const cleanHeader = headerText.trim();
                    const cleanName = c.name.replace(/\s*\(.*?\)/, '').trim(); // Remove (English)
                    // Check exact inclusions both ways, plus the "clean" name match
                    return cleanHeader.includes(c.name) ||
                        c.name.includes(cleanHeader) ||
                        cleanHeader.includes(cleanName);
                });

                if (character) {
                    // PLAYER CHARACTER
                    avatarUrl = character.avatarUrl;
                    displayName = character.name; // Use exact name from roster
                    controlMode = character.controlMode || 'manual';

                    const pIdx = roster.indexOf(character);
                    if (pIdx === 0) {
                        borderColor = "border-violet-500 shadow-[inset_4px_0_0_0_#8b5cf6]";
                        bgColor = "bg-violet-950/10";
                        titleColor = "text-violet-400";
                        icon = <Sword size={20} className="text-violet-400" />;
                    } else if (pIdx === 1) {
                        borderColor = "border-cyan-500 shadow-[inset_4px_0_0_0_#06b6d4]";
                        bgColor = "bg-cyan-950/10";
                        titleColor = "text-cyan-400";
                        icon = <Crown size={20} className="text-cyan-400" />;
                    } else if (pIdx === 2) {
                        borderColor = "border-emerald-500 shadow-[inset_4px_0_0_0_#10b981]";
                        bgColor = "bg-emerald-950/10";
                        titleColor = "text-emerald-400";
                        icon = <Shield size={20} className="text-emerald-400" />;
                    } else {
                        borderColor = "border-amber-500 shadow-[inset_4px_0_0_0_#f59e0b]";
                        bgColor = "bg-amber-950/10";
                        titleColor = "text-amber-400";
                        icon = <Zap size={20} className="text-amber-500" />;
                    }
                } else if (headerText.toLowerCase().includes("enemy") || headerText.includes("敵") || headerText.includes("Zombie") || headerText.includes("活屍") || headerText.includes("Kobold") || headerText.includes("Creature")) {
                    // ENEMY
                    borderColor = "border-rose-600 shadow-[inset_4px_0_0_0_#e11d48]";
                    bgColor = "bg-rose-950/10";
                    titleColor = "text-rose-400";
                    icon = <Skull size={20} className="text-rose-500" />;
                    displayName = headerText; // Keep full text for enemies usually
                    controlMode = 'auto'; // Enemies are always auto
                } else if (headerText.includes("DM") || headerText.includes("GM") || headerText.includes("Game Master")) {
                    // DM Explicit
                    borderColor = "border-slate-500 shadow-[inset_4px_0_0_0_#64748b]";
                    bgColor = "bg-slate-900/60";
                    titleColor = "text-slate-300";
                    displayName = "Game Master";
                    controlMode = 'auto'; // DM is auto
                }
            }

            const sectionItems = [];

            bodyLines.forEach(line => {
                const trimmed = line.trim();
                if (!trimmed) return;

                // Unified Dice Parsing (Bracketed + Legacy)
                const isBracketed = trimmed.startsWith('[🎲') && trimmed.endsWith(']');
                const isLegacy = trimmed.startsWith('->') && trimmed.includes('D20') && (trimmed.includes('DC') || trimmed.includes('AC'));

                if (isBracketed || isLegacy) {
                    let cleanText = trimmed;
                    if (isBracketed) cleanText = trimmed.replace(/[\[\]]/g, '').replace('🎲', '').trim();
                    if (isLegacy) cleanText = trimmed.replace(/^->/, '').trim();

                    // Regex: Name, Base, Mod, Total, Target(DC/AC)
                    const diceRegex = /([^:]+):\s*D20\((\d+)\)\s*(?:[+-]\s*(\d+))?\s*=\s*(\d+)\s*\|\s*(?:DC|AC)\s*(\d+)/i;
                    const match = cleanText.match(diceRegex);

                    // Fallback for simple format
                    const simpleRegex = /(\d+)\s*(?:vs|VS|對抗|\|)\s*(?:DC|AC|難度|防禦)[:\s]*(\d+)/i;
                    const simpleMatch = cleanText.match(simpleRegex);

                    const isAttack = cleanText.includes('AC') || cleanText.includes('Attack') || cleanText.includes('攻擊');
                    const targetLabel = isAttack ? 'AC' : 'DC';

                    // Extract Result String (manually or from text start/end?)
                    // The legacy text often ends with "-> Success".
                    const resultMatch = cleanText.match(/->\s*(SUCCESS|FAILURE|PASS|FAIL|成功|失敗)/i);
                    let resultStr = resultMatch ? resultMatch[1] : (isBracketed ? cleanText.split('->').pop().trim() : "Unknown");
                    // If still unknown/messy, default logic below will fix it.

                    if (match) {
                        const d20Base = parseInt(match[2]);
                        const modVal = match[3] ? parseInt(match[3]) : 0;
                        const total = parseInt(match[4]);
                        const dc = parseInt(match[5]);

                        // Determine Result
                        let calculatedResult = "Unknown";
                        if (d20Base === 20) calculatedResult = "CRITICAL SUCCESS";
                        else if (d20Base === 1) calculatedResult = "CRITICAL FAILURE";
                        else {
                            if (total >= dc) calculatedResult = "SUCCESS";
                            else calculatedResult = "FAILURE";
                        }

                        sectionItems.push({
                            type: 'dice',
                            content: trimmed,
                            data: {
                                name: match[1].trim(),
                                base: d20Base,
                                mod: modVal,
                                total: total,
                                dc: dc,
                                label: targetLabel,
                                result: calculatedResult
                            },
                            index: -1
                        });
                    } else if (simpleMatch) {
                        // Fallback Logic
                        const val1 = parseInt(simpleMatch[1]);
                        const val2 = parseInt(simpleMatch[2]);
                        sectionItems.push({
                            type: 'dice',
                            content: trimmed,
                            data: {
                                name: "Check",
                                base: val1, // Rough approximation
                                mod: 0,
                                total: val1,
                                dc: val2,
                                label: targetLabel,
                                result: val1 >= val2 ? "SUCCESS" : "FAILURE"
                            },
                            index: -1
                        });
                    } else {
                        // Failed to parse details, fallback to text
                        sectionItems.push({ type: 'text', content: trimmed, index: -1 });
                    }
                } else {
                    sectionItems.push({ type: 'text', content: trimmed, index: -1 });
                }
            });

            // Add to main list
            newItems.push({
                type: 'section',
                headerText: displayName,
                isHeader,
                borderColor,
                bgColor,
                titleColor,
                icon,
                avatarUrl, // New Prop
                controlMode, // Store Mode
                children: sectionItems
            });
        });

        // Assign global indices
        let gIdx = 0;
        newItems.forEach(sec => {
            sec.startIndex = gIdx;
            gIdx++;
            sec.children.forEach(child => {
                child.index = gIdx;
                gIdx++;
            });
        });

        setItems(newItems);
    }, [content, roster]);

    // Playback Logic
    useEffect(() => {
        if (items.length === 0) return;

        let totalSteps = 0;
        items.forEach(sec => totalSteps += 1 + sec.children.length);

        if (visibleIndex >= totalSteps) {
            if (onComplete) onComplete();
            return;
        }

        if (isAnimating) return;

        let currentType = 'text';
        let contentLen = 20;

        let counter = 0;
        let found = false;

        for (let s of items) {
            if (counter === visibleIndex) { currentType = 'header'; found = true; break; }
            counter++;
            for (let c of s.children) {
                if (counter === visibleIndex) {
                    currentType = c.type;
                    contentLen = c.content.length;
                    if (c.type === 'dice') {
                        setIsAnimating(true);
                        // Auto-start roll if character is managed by AI (auto)
                        console.log("Dice visible for:", s.headerText, "Mode:", s.controlMode);
                        if (s.controlMode === 'auto') {
                            setHasStartedRoll(true);
                        }
                    }
                    found = true;
                    break;
                }
                counter++;
            }
            if (found) break;
        }

        if (currentType === 'dice' && isAnimating) return;

        let delay = 800;
        if (currentType === 'text') delay = Math.max(700, contentLen * 25);
        if (currentType === 'header') delay = 1200;

        const timer = setTimeout(() => {
            setVisibleIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timer);

    }, [visibleIndex, items, isAnimating, onComplete]);

    const handleAnimEnd = () => {
        setIsAnimating(false);
        setHasStartedRoll(false);
        setVisibleIndex(prev => prev + 1);
    };

    if (items.length === 0) return null;

    let totalSteps = 0;
    items.forEach(sec => totalSteps += 1 + sec.children.length);

    return (
        <div className="space-y-6">
            {items.map((sec, sIdx) => {
                if (visibleIndex < sec.startIndex) return null;

                return (
                    // Updated Container Styling for Cleaner Look
                    <div key={sIdx} className={`rounded-r-xl border-l-4 ${sec.borderColor.split(' ')[0]} ${sec.bgColor} py-4 px-6 relative animate-in slide-in-from-left-2 duration-500 shadow-md`}>
                        {sec.isHeader && (
                            <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-3">
                                {/* Portrait / Icon Area */}
                                <div className="shrink-0 relative">
                                    {sec.avatarUrl ? (
                                        <div className={`w-10 h-10 rounded-full border-2 p-0.5 ${sec.titleColor.replace('text', 'border')} overflow-hidden bg-slate-900`}>
                                            <img src={sec.avatarUrl} alt="avatar" className="w-full h-full object-cover rounded-full" />
                                        </div>
                                    ) : (
                                        <div className={`w-10 h-10 rounded-full border-2 ${sec.titleColor.replace('text', 'border')} bg-slate-900 flex items-center justify-center`}>
                                            {sec.icon}
                                        </div>
                                    )}
                                </div>

                                {/* Name & Info */}
                                <div className="flex flex-col">
                                    <h4 className={`font-serif font-bold ${sec.titleColor} text-lg tracking-wide leading-none`}>
                                        {sec.headerText.replace(/[\(\[\)\]]/g, ' ')}
                                    </h4>
                                    {/* Action Status (Optional, can add later) */}
                                </div>
                            </div>
                        )}
                        <div className="text-slate-200 leading-relaxed space-y-2 whitespace-pre-line font-serif text-lg pl-1">
                            {sec.children.map((child, cIdx) => {
                                if (visibleIndex < child.index) return null;

                                if (child.type === 'dice') {
                                    if (visibleIndex === child.index && isAnimating) {
                                        // Allow animation for ALL characters (Auto/Enemy included)
                                        // if (sec.controlMode === 'auto') { ... } // REMOVED SKIP LOGIC

                                        if (!hasStartedRoll && sec.controlMode !== 'auto') {
                                            return (
                                                <button
                                                    key={cIdx}
                                                    onClick={() => setHasStartedRoll(true)}
                                                    className="my-3 px-6 py-3 bg-amber-600 hover:bg-amber-500 hover:scale-105 transition-all rounded-full flex items-center gap-3 font-bold text-slate-900 shadow-[0_0_15px_rgba(217,119,6,0.4)]"
                                                >
                                                    <Dices size={24} />
                                                    <span>點擊擲骰 (Roll Dice)</span>
                                                </button>
                                            );
                                        }

                                        return (
                                            <DualDiceRoll
                                                key={cIdx}
                                                checkName={child.data.name}
                                                playerRoll={{ base: child.data.base, mod: child.data.mod, total: child.data.total }}
                                                target={{ dc: child.data.dc, label: child.data.label || 'DC' }}
                                                result={child.data.result}
                                                onComplete={handleAnimEnd}
                                                autoPlay={sec.controlMode === 'auto'}
                                            />
                                        );
                                    }
                                    return (
                                        <div key={cIdx} className="my-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-sm text-cyan-300 flex items-center gap-3 w-fit shadow-sm">
                                            <div className={`w-2.5 h-2.5 rounded-full ${child.data.result.includes('成功') ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-red-500 shadow-[0_0_8px_red]'}`} />
                                            <span className="font-bold text-slate-400">{child.data.name}:</span>
                                            <span>{child.data.total} <span className="text-slate-600 mx-1">vs</span> DC {child.data.dc}</span>
                                            <span className={`uppercase font-bold tracking-wider ml-2 ${child.data.result.includes('成功') ? 'text-cyan-400' : 'text-rose-500'}`}>
                                                {child.data.result.includes('成功') ? 'SUCCESS' : 'FAILURE'}
                                            </span>
                                        </div>
                                    );
                                }



                                // Only use Typewriter if it's the CURRENTLY revealing item to reduce churn on old items
                                // Actually, old items should stay fully visible.
                                // If we re-render Typewriter with full text, it might re-type?
                                // No, Typewriter resets only on text change.
                                // But if visibleIndex changes, this component re-renders.
                                // We should only use Typewriter for the item at `visibleIndex`.
                                // For items < visibleIndex, just show text.

                                // Use Typewriter for the active item, static for completed items
                                if (visibleIndex === child.index && !instant) {
                                    return (
                                        <div key={cIdx} className="mb-2">
                                            <TypewriterText
                                                text={child.content}
                                                renderWithDice={renderTextWithDice}
                                                speed={textSpeed}
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={cIdx} className="animate-in fade-in slide-in-from-bottom-1 duration-700 fill-mode-backwards">
                                        {renderTextWithDice(child.content)}
                                    </div>
                                );
                            })}
                        </div>
                        {visibleIndex >= sec.startIndex && visibleIndex < totalSteps && !isAnimating && (
                            <span className="inline-block w-2 h-4 bg-amber-500/50 animate-pulse ml-2">_</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
