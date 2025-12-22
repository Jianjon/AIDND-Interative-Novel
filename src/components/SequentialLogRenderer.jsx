import React, { useState, useEffect, useMemo, useRef } from 'react';
import DualDiceRoll from './DualDiceRoll';
import { Sword, Shield, Zap, Skull, Crown, Ghost, User, Dices, ImageIcon } from 'lucide-react';
import { getSceneImage } from '../data/SceneImageMap';

const TypewriterText = ({ text, renderWithDice, speed = 20, onComplete, shouldAnimate = true }) => {
    const [displayedText, setDisplayedText] = useState(shouldAnimate ? '' : text);

    useEffect(() => {
        if (!shouldAnimate) {
            setDisplayedText(text);
            return;
        }

        let i = 0;
        setDisplayedText('');

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, shouldAnimate]);

    return (
        <div className="animate-in fade-in duration-300">
            {renderWithDice(displayedText)}
        </div>
    );
};

export default function SequentialLogRenderer({ content, roster = [], renderTextWithDice, onComplete, instant = false, textSpeed = 20, theme = 'default', fontSize = 'text-base', letterSpacing = 0, lineHeight = 1.8 }) {
    const [visibleIndex, setVisibleIndex] = useState(instant ? 99999 : 0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasStartedRoll, setHasStartedRoll] = useState(false);
    // Persist dice roll results across re-renders (key: unique dice id, value: { base, mod, total, result })
    const [diceResults, setDiceResults] = useState({});

    // THEME MAPPING (Moved to Function Scope)
    const THEME_STYLES = {
        default: {
            border: "border-slate-700",
            bg: "bg-slate-900/40",
            text: "text-slate-200",
            titleDefault: "text-slate-400"
        },
        light: {
            border: "border-slate-300",
            bg: "bg-white/60",
            text: "text-slate-800",
            titleDefault: "text-slate-600"
        },
        sepia: {
            border: "border-amber-700/30",
            bg: "bg-amber-100/30",
            text: "text-amber-900",
            titleDefault: "text-amber-800/70"
        },
        midnight: {
            border: "border-blue-900/50",
            bg: "bg-blue-950/30",
            text: "text-blue-200",
            titleDefault: "text-blue-400/70"
        }
    };
    const currentTheme = THEME_STYLES[theme] || THEME_STYLES.default;

    // Split Content into Chunks for Animation
    const items = useMemo(() => {
        if (!content) return [];

        const newItems = [];
        let diceCounter = 0;

        // 1. Split by Sections (###)
        const rawSections = content.split(/(?=###)/g);

        rawSections.forEach((sec) => {
            if (!sec.trim()) return;
            const lines = sec.trim().split('\n');
            const isHeader = lines[0].startsWith('###');
            const headerText = isHeader ? lines[0].replace(/###/g, '').trim() : "場景描述";
            const bodyLines = isHeader ? lines.slice(1) : lines;

            // Determine Style & Identity
            /* THEME MAPPING MOVED TO FUNCTION SCOPE */

            let borderColor = currentTheme.border;
            let bgColor = currentTheme.bg;
            let titleColor = currentTheme.titleDefault;
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
                    bgColor = theme === 'light' ? "bg-slate-200/50" : "bg-slate-900/60";
                    titleColor = theme === 'light' ? "text-slate-600" : "text-slate-300";
                    displayName = "Game Master";
                    controlMode = 'auto'; // DM is auto
                }
            }

            const sectionItems = [];

            bodyLines.forEach(line => {
                const trimmed = line.trim();
                if (!trimmed) return;

                // === CONTENT FILTERING RULES - Skip these lines ===
                // 1. Standalone # or ## markers
                if (/^#+$/.test(trimmed)) return;

                // 2. [[BGM: xxx]] tags
                if (trimmed.includes('[[BGM:') || trimmed.includes('[[BGM：')) return;

                // 3. Action choice options that should only appear in sidebar (選擇一/二/三 with **)
                if (trimmed.match(/^\*\*選擇[一二三四五]/) || trimmed.match(/^\*\*選項[一二三四五]/)) return;

                // 4. Technical markers that AI shouldn't output (but sometimes does)
                if (trimmed.startsWith('=== HEADER') || trimmed.startsWith('DM PERSONA:') ||
                    trimmed.startsWith('Location:') || trimmed.startsWith('Module:') ||
                    trimmed.startsWith('---') && trimmed.length < 5) return;

                // 5. Empty formatted lines like just "**" or "=="
                if (/^[\*\=\-\#]+$/.test(trimmed)) return;

                // 6. PART labels (PART 1:, PART 2:, etc.)
                if (trimmed.match(/^PART\s*\d+:/i) || trimmed.match(/^第[一二三四五六七八九十]+部分/)) return;

                // === NEW: Scene Illustration Tag Parsing ===
                // Format: [[SCENE:Forest]] or [[SCENE_ILLUSTRATION:Forest]]
                if (trimmed.includes('[[SCENE:') || trimmed.includes('[[SCENE_ILLUSTRATION:')) {
                    // DISABLED: Automatic Image Generation
                    /*
                    const sceneMatch = trimmed.match(/\[\[(?:SCENE|SCENE_ILLUSTRATION):(.+?)\]\]/i);
                    if (sceneMatch) {
                        const keyword = sceneMatch[1].trim();
                        const imgSrc = getSceneImage(keyword);

                        if (imgSrc) {
                            sectionItems.push({
                                type: 'illustration',
                                content: keyword,
                                data: { src: imgSrc, keyword },
                                index: -1
                            });
                        }
                    }
                    */
                    return; // Skip rendering the tag itself
                }

                // === NEW: Inline [[DICE:Name:Type:DC]] Tag Parsing ===
                // Check if this line contains [[DICE:...]] placeholders
                const dicePlaceholderRegex = /\[\[DICE:([^:]+):([^:]+):(\d+)\]\]/g;
                if (dicePlaceholderRegex.test(trimmed)) {
                    // Reset regex for actual matching
                    dicePlaceholderRegex.lastIndex = 0;

                    // Also extract outcome texts: [[成功:...]] [[失敗:...]]
                    const successOutcomeMatch = trimmed.match(/\[\[成功[:：]([^\]]+)\]\]/);
                    const failureOutcomeMatch = trimmed.match(/\[\[失敗[:：]([^\]]+)\]\]/);
                    const successOutcome = successOutcomeMatch ? successOutcomeMatch[1].trim() : null;
                    const failureOutcome = failureOutcomeMatch ? failureOutcomeMatch[1].trim() : null;

                    // Remove outcome tags from the line for processing
                    let processedLine = trimmed
                        .replace(/\[\[成功[:：][^\]]+\]\]/g, '')
                        .replace(/\[\[失敗[:：][^\]]+\]\]/g, '')
                        .trim();

                    // Split the line into segments: text, dice_pending, text, ...
                    let lastIndex = 0;
                    let match;
                    const segments = [];

                    while ((match = dicePlaceholderRegex.exec(processedLine)) !== null) {
                        // Add text before this match
                        if (match.index > lastIndex) {
                            const textBefore = processedLine.slice(lastIndex, match.index).replace(/\s*->\s*$/, '').trim();
                            if (textBefore) {
                                segments.push({ type: 'text', content: textBefore, index: -1 });
                            }
                        }

                        // Add dice_pending item with outcome texts
                        const characterName = match[1].trim();
                        const checkType = match[2].trim();
                        const targetDC = parseInt(match[3]);
                        const diceId = `dice_${diceCounter++}`;

                        segments.push({
                            type: 'dice_pending',
                            content: match[0],
                            data: {
                                diceId,
                                characterName,
                                checkType,
                                targetDC,
                                successOutcome,
                                failureOutcome
                            },
                            index: -1
                        });

                        lastIndex = match.index + match[0].length;
                    }

                    // Add remaining text after last match (but remove outcome tags)
                    if (lastIndex < processedLine.length) {
                        const textAfter = processedLine.slice(lastIndex).replace(/^\s*->\s*/, '').trim();
                        if (textAfter) {
                            segments.push({ type: 'text', content: textAfter, index: -1 });
                        }
                    }

                    // Add all segments to sectionItems
                    segments.forEach(seg => sectionItems.push(seg));
                    return; // Skip other parsing for this line
                }

                // Unified Dice Parsing (Bracketed + Legacy) - for pre-rolled results
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

                    // Extract Result String - Support emoji format (✅/❌) and legacy text
                    const emojiResultMatch = cleanText.match(/->.*?(✅|❌|🌟|💥)/);
                    const textResultMatch = cleanText.match(/->\s*(SUCCESS|FAILURE|PASS|FAIL|成功|失敗|命中|未命中)/i);
                    let resultStr = emojiResultMatch ? emojiResultMatch[1] : (textResultMatch ? textResultMatch[1] : "Unknown");
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
                    // Check for Turn Order / Initiative block
                } else if (trimmed.startsWith('行動順序') || trimmed.startsWith('Turn Order') || trimmed.includes('Initiative:')) {
                    // Parse initiative order: "行動順序：貝拉 (19), 澤拉 (15), K2 (12)"
                    const orderMatch = trimmed.match(/[：:]\s*(.+)$/);
                    if (orderMatch) {
                        const orderList = orderMatch[1].split(',').map(s => s.trim());
                        sectionItems.push({
                            type: 'initiative',
                            content: trimmed,
                            data: { order: orderList },
                            index: -1
                        });
                    } else {
                        sectionItems.push({ type: 'text', content: trimmed, index: -1 });
                    }
                    // Hide SCENE_UPDATE tags (already processed by App.jsx)
                } else if (trimmed.includes('[[SCENE_UPDATE') || trimmed.includes('[[場景更新')) {
                    // Skip - don't render these tags
                    return;
                    // === DM OPENING BLOCK ===
                } else if (trimmed.includes('DM OPENING') || trimmed.includes('DM 開場') || trimmed.startsWith('===') && trimmed.includes('DM')) {
                    sectionItems.push({
                        type: 'block_header',
                        variant: 'dm_opening',
                        content: trimmed.replace(/[=]/g, '').trim(),
                        index: -1
                    });
                    // === CHARACTER INTRODUCTION BLOCK ===
                } else if (trimmed.includes('角色介紹') || trimmed.includes('Character Introduction') || trimmed.includes('INTRODUCTION')) {
                    sectionItems.push({
                        type: 'block_header',
                        variant: 'character_intro',
                        content: trimmed.replace(/[=【】]/g, '').trim(),
                        index: -1
                    });
                    // === PROLOGUE SECTION BLOCKS (【世界背景】【任務交代】【當前情境】) ===
                } else if (trimmed.match(/^【(世界背景|任務交代|當前情境)】/)) {
                    const matchResult = trimmed.match(/^【(世界背景|任務交代|當前情境)】/);
                    const blockType = matchResult[1];
                    const variantMap = {
                        '世界背景': 'world_bg',
                        '任務交代': 'mission',
                        '當前情境': 'situation'
                    };
                    sectionItems.push({
                        type: 'block_header',
                        variant: variantMap[blockType] || 'world_bg',
                        content: blockType,
                        index: -1
                    });
                    // === CHARACTER ACTION BLOCK (e.g. "【嵐·風行者】") ===
                } else if (trimmed.match(/^【.*】/) || trimmed.match(/^\[.*\]的行動/) || trimmed.includes('的回合')) {
                    sectionItems.push({
                        type: 'block_header',
                        variant: 'character_action',
                        content: trimmed.replace(/[【】\[\]]/g, ''),
                        index: -1
                    });
                    // Damage Statistics Block
                } else if (trimmed.includes('傷害統計') || trimmed.includes('Damage')) {
                    sectionItems.push({
                        type: 'block_header',
                        variant: 'damage',
                        content: trimmed.replace(/[⚔️🗡️]/g, '').trim(),
                        index: -1
                    });
                    // Party Status Block
                } else if (trimmed.includes('隊伍狀態') || trimmed.includes('Party Status')) {
                    sectionItems.push({
                        type: 'block_header',
                        variant: 'party',
                        content: trimmed.replace(/[❤️💚]/g, '').trim(),
                        index: -1
                    });
                    // Enemy Status Block
                } else if (trimmed.includes('敵方狀態') || trimmed.includes('Enemy Status')) {
                    sectionItems.push({
                        type: 'block_header',
                        variant: 'enemy',
                        content: trimmed.replace(/[💀☠️]/g, '').trim(),
                        index: -1
                    });
                    // Status entry lines (❤️ or 🔴 prefixed)
                } else if (trimmed.startsWith('❤️') || trimmed.startsWith('🔴') || trimmed.startsWith('💚') || trimmed.startsWith('💀')) {
                    const isEnemy = trimmed.startsWith('🔴') || trimmed.startsWith('💀');
                    sectionItems.push({
                        type: 'status_entry',
                        variant: isEnemy ? 'enemy' : 'party',
                        content: trimmed.replace(/^[❤️🔴💚💀]\s*/, ''),
                        index: -1
                    });
                    // Damage entry lines (- prefixed attack descriptions)
                } else if (trimmed.startsWith('-') && trimmed.includes('→')) {
                    sectionItems.push({
                        type: 'damage_entry',
                        content: trimmed.replace(/^-\s*/, ''),
                        index: -1
                    });
                    // Enemy attack action "(攻擊X)" 
                } else if (trimmed.startsWith('(攻擊') || trimmed.startsWith('（攻擊')) {
                    sectionItems.push({
                        type: 'enemy_attack_action',
                        content: trimmed.replace(/[()（）]/g, ''),
                        index: -1
                    });
                    // Enemy roll result "(Roll: X vs Y)" or "(Roll: X)"
                } else if (trimmed.includes('(Roll:') || trimmed.includes('（Roll:')) {
                    // Parse: "(Roll: 4 vs 17) 未命中" or "(Roll: 13)"
                    const rollMatch = trimmed.match(/\(Roll:\s*(\d+)(?:\s*vs\s*(\d+))?\)\s*(.*)?/i);
                    if (rollMatch) {
                        const roll = parseInt(rollMatch[1]);
                        const target = rollMatch[2] ? parseInt(rollMatch[2]) : null;
                        const resultText = rollMatch[3] || '';
                        const isHit = target ? roll >= target : !resultText.includes('未命中') && !resultText.includes('失敗');
                        sectionItems.push({
                            type: 'enemy_roll',
                            content: trimmed,
                            data: { roll, target, resultText, isHit },
                            index: -1
                        });
                    } else {
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

        return newItems;
    }, [content, roster, theme]);

    // Use Ref to access latest items without triggering effect re-runs on streaming updates
    const itemsRef = useRef(items);
    useEffect(() => { itemsRef.current = items; }, [items]);

    // Playback Logic
    useEffect(() => {
        const currentItems = itemsRef.current;
        if (currentItems.length === 0) return;

        let totalSteps = 0;
        currentItems.forEach(sec => totalSteps += 1 + sec.children.length);

        if (visibleIndex >= totalSteps) {
            // Buffer delay before completion to let user read the last typed block
            const completionTimer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 1500);
            return () => clearTimeout(completionTimer);
        }

        if (isAnimating) return;

        let currentType = 'text';
        let contentLen = 20;

        let counter = 0;
        let found = false;

        for (let s of currentItems) {
            if (counter === visibleIndex) { currentType = 'header'; found = true; break; }
            counter++;
            for (let c of s.children) {
                if (counter === visibleIndex) {
                    currentType = c.type;
                    contentLen = c.content.length;
                    if (c.type === 'dice') {
                        setIsAnimating(true);
                        console.log("Dice visible for:", s.headerText, "Mode:", s.controlMode);
                        if (s.controlMode === 'auto') {
                            setHasStartedRoll(true);
                        }
                    }
                    // Also block on dice_pending - wait for user click
                    if (c.type === 'dice_pending') {
                        setIsAnimating(true);
                        console.log("Dice pending for:", c.data.characterName, "Check:", c.data.checkType);
                    }
                    found = true;
                    break;
                }
                counter++;
            }
            if (found) break;
        }

        // Block progression for both dice and dice_pending until animation completes
        if ((currentType === 'dice' || currentType === 'dice_pending') && isAnimating) return;

        let delay = 800;
        if (currentType === 'text') delay = Math.max(700, contentLen * 25);
        if (currentType === 'header') delay = 1200;
        // Quick delays for structured blocks - they don't need typewriter animation
        if (currentType === 'initiative') delay = 400;
        if (currentType === 'block_header') delay = 300;
        if (currentType === 'status_entry') delay = 200;
        if (currentType === 'damage_entry') delay = 200;
        if (currentType === 'enemy_attack_action') delay = 300;
        if (currentType === 'enemy_roll') delay = 400;

        const timer = setTimeout(() => {
            setVisibleIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timer);

    }, [visibleIndex, isAnimating, onComplete]); // Removed 'items' dependency to prevent stall during streaming

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
                        <div
                            className={`${theme === 'default' ? 'text-slate-200' : currentTheme.text} space-y-3 whitespace-pre-line font-serif ${fontSize} pl-1`}
                            style={{ letterSpacing: `${letterSpacing}px`, lineHeight: lineHeight }}
                        >
                            {sec.children.map((child, cIdx) => {
                                if (visibleIndex < child.index) return null;

                                // === NEW: Illustration Block ===
                                if (child.type === 'illustration') {
                                    return (
                                        <div key={cIdx} className="my-6 relative group overflow-hidden rounded-lg border-2 border-slate-700 shadow-2xl">
                                            <div className="absolute top-0 left-0 w-full h-full bg-slate-950 animate-pulse z-10" style={{ animationDuration: '2s', display: 'none' }}></div>
                                            <img
                                                src={child.data.src}
                                                alt={child.data.keyword}
                                                className="w-full h-auto object-cover grayscale sepia-[.2] contrast-125 hover:grayscale-0 hover:sepia-0 transition-all duration-1000"
                                            />
                                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-4 pt-12">
                                                <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-tome-header flex items-center gap-2">
                                                    <ImageIcon size={12} />
                                                    SCENE: {child.data.keyword}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }

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
                                            <div className={`w-2.5 h-2.5 rounded-full ${child.data.result.includes('成功') || child.data.result.includes('SUCCESS') ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-red-500 shadow-[0_0_8px_red]'}`} />
                                            <span className="font-bold text-slate-400">{child.data.name}:</span>
                                            <span>{child.data.total} <span className="text-slate-600 mx-1">vs</span> DC {child.data.dc}</span>
                                            <span className={`uppercase font-bold tracking-wider ml-2 ${child.data.result.includes('成功') || child.data.result.includes('SUCCESS') ? 'text-cyan-400' : 'text-rose-500'}`}>
                                                {child.data.result.includes('成功') || child.data.result.includes('SUCCESS') ? 'SUCCESS' : 'FAILURE'}
                                            </span>
                                        </div>
                                    );
                                }

                                // === NEW: dice_pending Type Rendering ===
                                if (child.type === 'dice_pending') {
                                    const { diceId, characterName, checkType, targetDC, successOutcome, failureOutcome } = child.data;
                                    const storedResult = diceResults[diceId];

                                    // If result already calculated, show static result or animation
                                    if (storedResult) {
                                        // Animation phase
                                        if (storedResult.animating) {
                                            return (
                                                <DualDiceRoll
                                                    key={cIdx}
                                                    checkName={`${characterName} ${checkType}`}
                                                    playerRoll={{ base: storedResult.base, mod: storedResult.mod, total: storedResult.total }}
                                                    target={{ dc: targetDC, label: 'DC' }}
                                                    result={storedResult.success ? 'SUCCESS' : 'FAILURE'}
                                                    onComplete={() => {
                                                        const hasOutcome = !!(storedResult.success ? successOutcome : failureOutcome);

                                                        setDiceResults(prev => ({
                                                            ...prev,
                                                            [diceId]: { ...prev[diceId], animating: false }
                                                        }));

                                                        // If we have outcome text, DON'T advance yet. wait for typewriter.
                                                        // If no outcome text, advance immediately.
                                                        if (!hasOutcome) {
                                                            handleAnimEnd();
                                                        }
                                                    }}
                                                    autoPlay={true}
                                                />
                                            );
                                        }

                                        // Static result display after animation - includes outcome text
                                        const isSuccess = storedResult.success;
                                        const outcomeText = isSuccess ? successOutcome : failureOutcome;

                                        return (
                                            <div key={cIdx} className="my-3 space-y-2">
                                                {/* Dice result row */}
                                                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-sm text-cyan-300 flex items-center gap-3 w-fit shadow-sm">
                                                    <div className={`w-2.5 h-2.5 rounded-full ${isSuccess ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-red-500 shadow-[0_0_8px_red]'}`} />
                                                    <span className="font-bold text-slate-400">{characterName} {checkType}:</span>
                                                    <span>D20({storedResult.base}){storedResult.mod !== 0 ? `+${storedResult.mod}` : ''} = {storedResult.total} <span className="text-slate-600 mx-1">vs</span> DC {targetDC}</span>
                                                    <span className={`uppercase font-bold tracking-wider ml-2 ${isSuccess ? 'text-cyan-400' : 'text-rose-500'}`}>
                                                        {isSuccess ? 'SUCCESS' : 'FAILURE'}
                                                    </span>
                                                </div>
                                                {/* Outcome description */}
                                                {outcomeText && (
                                                    <div className={`p-3 rounded-lg border-l-4 ${isSuccess ? 'bg-emerald-950/30 border-emerald-600 text-emerald-200' : 'bg-rose-950/30 border-rose-600 text-rose-200'} text-sm font-serif`}>
                                                        <TypewriterText
                                                            text={outcomeText}
                                                            renderWithDice={renderTextWithDice}
                                                            speed={30}
                                                            shouldAnimate={visibleIndex === child.index}
                                                            onComplete={() => {
                                                                if (visibleIndex === child.index) handleAnimEnd();
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    // Show Roll Dice button
                                    return (
                                        <button
                                            key={cIdx}
                                            onClick={() => {
                                                // Calculate dice result
                                                const base = Math.floor(Math.random() * 20) + 1;
                                                // Try to find modifier from roster
                                                const char = roster.find(r => (r.name || '').includes(characterName) || characterName.includes(r.name || ''));
                                                let mod = 0;
                                                if (char && char.baseStats) {
                                                    const checkLower = checkType.toLowerCase();
                                                    if (checkLower.includes('攻擊') || checkLower.includes('attack')) {
                                                        mod = Math.floor((char.baseStats.str - 10) / 2) + 2; // Simple attack bonus
                                                    } else if (checkLower.includes('法術') || checkLower.includes('spell')) {
                                                        mod = Math.floor((char.baseStats.int - 10) / 2) + 2;
                                                    } else if (checkLower.includes('敏捷') || checkLower.includes('dex')) {
                                                        mod = Math.floor((char.baseStats.dex - 10) / 2);
                                                    } else if (checkLower.includes('力量') || checkLower.includes('str')) {
                                                        mod = Math.floor((char.baseStats.str - 10) / 2);
                                                    } else {
                                                        mod = 2; // Default proficiency bonus
                                                    }
                                                }
                                                const total = base + mod;
                                                const success = base === 20 || (base !== 1 && total >= targetDC);

                                                // Store result and trigger animation
                                                setDiceResults(prev => ({
                                                    ...prev,
                                                    [diceId]: { base, mod, total, success, animating: true }
                                                }));
                                            }}
                                            className="my-3 px-6 py-3 bg-amber-600 hover:bg-amber-500 hover:scale-105 transition-all rounded-full flex items-center gap-3 font-bold text-slate-900 shadow-[0_0_15px_rgba(217,119,6,0.4)]"
                                        >
                                            <Dices size={24} />
                                            <span>🎲 {characterName} {checkType} (DC {targetDC}) - 點擊擲骰</span>
                                        </button>
                                    );
                                }

                                // Initiative / Turn Order Block Rendering
                                if (child.type === 'initiative') {
                                    return (
                                        <div key={cIdx} className="my-4 p-4 bg-amber-950/30 rounded-lg border border-amber-900/50 shadow-sm">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                                                <span className="text-amber-400 font-bold text-sm tracking-wide">行動順序</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {child.data.order.map((entry, i) => {
                                                    // Parse "角色名 (數值)" format
                                                    const match = entry.match(/^(.+?)\s*\((\d+)\)$/);
                                                    const name = match ? match[1] : entry;
                                                    const init = match ? match[2] : '?';
                                                    return (
                                                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/60 rounded border border-slate-700/50 text-sm">
                                                            <span className="text-slate-300 font-medium">{name}</span>
                                                            <span className="text-amber-500 font-mono font-bold">({init})</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                }

                                // Block Header Rendering (DM開場/角色介紹/傷害統計/隊伍狀態/敵方狀態)
                                if (child.type === 'block_header') {
                                    const variantStyles = {
                                        // Prologue Section Blocks
                                        world_bg: { bg: 'bg-indigo-950/50', border: 'border-indigo-600/70', dot: 'bg-indigo-500', text: 'text-indigo-200', icon: '🌍' },
                                        mission: { bg: 'bg-amber-950/50', border: 'border-amber-600/70', dot: 'bg-amber-500', text: 'text-amber-200', icon: '📋' },
                                        character_intro: { bg: 'bg-blue-950/50', border: 'border-blue-600/70', dot: 'bg-blue-500', text: 'text-blue-200', icon: '👤' },
                                        situation: { bg: 'bg-rose-950/50', border: 'border-rose-600/70', dot: 'bg-rose-500', text: 'text-rose-200', icon: '⚡' },
                                        // Combat/Turn Blocks
                                        dm_opening: { bg: 'bg-purple-950/40', border: 'border-purple-700/60', dot: 'bg-purple-500', text: 'text-purple-300', icon: '📜' },
                                        character_action: { bg: 'bg-emerald-950/40', border: 'border-emerald-700/60', dot: 'bg-emerald-500', text: 'text-emerald-300', icon: '⚔️' },
                                        damage: { bg: 'bg-orange-950/30', border: 'border-orange-800/50', dot: 'bg-orange-500', text: 'text-orange-400', icon: '⚔️' },
                                        party: { bg: 'bg-cyan-950/30', border: 'border-cyan-800/50', dot: 'bg-cyan-500', text: 'text-cyan-400', icon: '❤️' },
                                        enemy: { bg: 'bg-rose-950/30', border: 'border-rose-800/50', dot: 'bg-rose-500', text: 'text-rose-400', icon: '💀' }
                                    };
                                    const style = variantStyles[child.variant] || variantStyles.damage;
                                    return (
                                        <div key={cIdx} className={`mt-4 mb-2 px-4 py-2 ${style.bg} rounded-lg border-l-4 ${style.border}`}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{style.icon}</span>
                                                <span className={`${style.text} font-bold text-sm tracking-wide`}>{child.content}</span>
                                            </div>
                                        </div>
                                    );
                                }

                                // Status Entry Rendering (❤️ Name HP X/X - Status)
                                if (child.type === 'status_entry') {
                                    const isEnemy = child.variant === 'enemy';
                                    return (
                                        <div key={cIdx} className={`flex items-center gap-2 px-4 py-1.5 ${isEnemy ? 'text-rose-300' : 'text-cyan-300'} text-sm`}>
                                            <div className={`w-2 h-2 rounded-full ${isEnemy ? 'bg-rose-500' : 'bg-cyan-500'}`} />
                                            <span>{child.content}</span>
                                        </div>
                                    );
                                }

                                // Damage Entry Rendering (角色 → 目標 (傷害))
                                if (child.type === 'damage_entry') {
                                    return (
                                        <div key={cIdx} className="flex items-center gap-2 px-4 py-1.5 text-orange-200 text-sm">
                                            <span className="text-orange-500">→</span>
                                            <span>{child.content}</span>
                                        </div>
                                    );
                                }

                                // Enemy Attack Action Rendering (攻擊X，處於Y)
                                if (child.type === 'enemy_attack_action') {
                                    return (
                                        <div key={cIdx} className="my-2 px-4 py-2 bg-rose-950/20 rounded border-l-2 border-rose-700/50 text-rose-300 text-sm italic">
                                            <span className="text-rose-500 mr-2">⚔</span>
                                            {child.content}
                                        </div>
                                    );
                                }

                                // Enemy Roll Result Rendering (Roll: X vs Y)
                                if (child.type === 'enemy_roll') {
                                    const { roll, target, resultText, isHit } = child.data;
                                    return (
                                        <div key={cIdx} className="my-2 p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center gap-3 w-fit shadow-sm">
                                            <div className={`w-2.5 h-2.5 rounded-full ${isHit ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-slate-500'}`} />
                                            <span className="font-mono text-sm">
                                                <span className="text-slate-400">Roll:</span>
                                                <span className={`mx-1 font-bold ${isHit ? 'text-rose-400' : 'text-slate-300'}`}>{roll}</span>
                                                {target && (
                                                    <>
                                                        <span className="text-slate-600 mx-1">vs</span>
                                                        <span className="text-cyan-400">{target}</span>
                                                    </>
                                                )}
                                            </span>
                                            {resultText && (
                                                <span className={`text-sm ${isHit ? 'text-rose-400' : 'text-slate-500'}`}>
                                                    {resultText}
                                                </span>
                                            )}
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
                                    <div key={cIdx} className="mb-2">
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
