import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * SpellSlotDisplay.jsx
 * Displays spell slot usage for a spellcaster character.
 * Shows filled/empty dots for each spell level.
 */

const SLOT_COLORS = {
    1: 'bg-blue-500',
    2: 'bg-indigo-500',
    3: 'bg-purple-500',
    4: 'bg-pink-500',
    5: 'bg-rose-500',
    6: 'bg-orange-500',
    7: 'bg-amber-500',
    8: 'bg-yellow-500',
    9: 'bg-emerald-400',
};

export default function SpellSlotDisplay({ slots = {}, usedSlots = {}, compact = false }) {
    // Filter out levels with 0 slots
    const activeLevels = Object.keys(slots)
        .map(k => parseInt(k))
        .filter(level => slots[level] > 0)
        .sort((a, b) => a - b);

    if (activeLevels.length === 0) return null;

    return (
        <div className={`${compact ? 'flex gap-2 flex-wrap' : 'space-y-1.5'}`}>
            {!compact && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    <Sparkles size={12} className="text-purple-400" />
                    <span>法術位</span>
                </div>
            )}
            {activeLevels.map(level => {
                const max = slots[level];
                const used = usedSlots[level] || 0;
                const available = Math.max(0, max - used);
                const color = SLOT_COLORS[level] || 'bg-slate-500';

                return (
                    <div key={level} className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-bold w-4 text-right">
                            {level}環
                        </span>
                        <div className="flex gap-0.5">
                            {Array.from({ length: max }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`
                                        w-2.5 h-2.5 rounded-full border transition-all
                                        ${i < available
                                            ? `${color} border-white/30 shadow-sm shadow-current`
                                            : 'bg-slate-800 border-slate-700'
                                        }
                                    `}
                                    title={i < available ? '可用' : '已消耗'}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
