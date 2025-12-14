import React from 'react';
import { Heart, Shield, Zap, Skull, Activity, Droplets, Eye, Brain } from 'lucide-react';

/**
 * HealthBar Component
 * Visualizes HP with color transitions and shield overlay.
 * @param {number} current - Current HP
 * @param {number} max - Max HP
 * @param {number} temp - Temporary HP / Shield (optional)
 * @param {boolean} showValue - Whether to show text numbers (default true)
 */
export const HealthBar = ({ current, max, temp = 0, showValue = true, deathSaves = null }) => {
    const percentage = Math.min(100, Math.max(0, (current / max) * 100));

    // Dying State Render
    if (current <= 0 && deathSaves) {
        return (
            <div className="w-full select-none">
                {/* Header */}
                <div className="flex justify-between text-[10px] font-mono mb-1 text-rose-500 font-bold animate-pulse">
                    <span className="flex items-center gap-1">
                        <Skull size={10} /> {deathSaves.failures >= 3 ? "DEAD" : "DYING"}
                    </span>
                    <span>0/{max}</span>
                </div>

                {/* Death Save Trackers */}
                <div className="h-6 w-full bg-slate-900/50 rounded border border-rose-900/30 flex items-center justify-between px-2">
                    {/* Successes */}
                    <div className="flex gap-1" title="Successes">
                        {[...Array(3)].map((_, i) => (
                            <div key={`s-${i}`} className={`w-2 h-2 rounded-full border border-emerald-500/50 ${i < deathSaves.successes ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`} />
                        ))}
                    </div>

                    <span className="text-[9px] text-slate-600 font-bold">VS</span>

                    {/* Failures */}
                    <div className="flex gap-1" title="Failures">
                        {[...Array(3)].map((_, i) => (
                            <div key={`f-${i}`} className={`w-2 h-2 rounded-full border border-rose-500/50 ${i < deathSaves.failures ? 'bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Normal HP Logic
    let colorClass = "bg-emerald-500";
    if (percentage < 30) colorClass = "bg-rose-600 animate-pulse";
    else if (percentage < 60) colorClass = "bg-amber-500";

    return (
        <div className="w-full select-none">
            {/* Text Overlay */}
            {showValue && (
                <div className="flex justify-between text-[10px] font-mono mb-1 text-slate-400">
                    <span className="flex items-center gap-1">
                        <Heart size={10} className={percentage < 30 ? "text-rose-500" : "text-emerald-500"} />
                        HP
                    </span>
                    <span>
                        <span className={percentage < 30 ? "text-rose-400 font-bold" : "text-slate-300"}>{current}</span>
                        <span className="text-slate-600">/{max}</span>
                        {temp > 0 && <span className="text-cyan-400 ml-1">+{temp}</span>}
                    </span>
                </div>
            )}

            {/* Bar Container */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative shadow-inner border border-slate-700/50">
                {/* Main Health Bar */}
                <div
                    className={`h-full ${colorClass} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />

                {/* Temp HP / Shield Overlay (Cyan) */}
                {temp > 0 && (
                    <div
                        className="absolute top-0 left-0 h-full bg-cyan-400/50 border-r border-cyan-300 transition-all duration-300"
                        style={{ width: `${Math.min(100, (temp / max) * 100)}%` }}
                    />
                )}
            </div>
        </div>
    );
};

/**
 * XpBar Component
 * Visualizes XP progress.
 */
export const XpBar = ({ current, max, level }) => {
    const percentage = Math.min(100, Math.max(0, (current / max) * 100));

    return (
        <div className="w-full mt-1 select-none">
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-0.5">
                <span className="text-violet-400">LV {level}</span>
                <span>{current} / {max} XP</span>
            </div>
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                    className="h-full bg-violet-600 shadow-[0_0_5px_rgba(124,58,237,0.5)]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

/**
 * StatusBadges Component
 * Displays icons for active conditions.
 * @param {Array} conditions - Array of strings e.g., ["Poisoned", "Blessed"]
 */
export const StatusBadges = ({ conditions = [] }) => {
    if (!conditions || conditions.length === 0) return null;

    // Icon Mapping
    const getIcon = (cond) => {
        const c = cond.toLowerCase();
        if (c.includes('poison') || c.includes('中毒')) return <Droplets size={12} className="text-lime-400" />;
        if (c.includes('stun') || c.includes('暈眩')) return <Zap size={12} className="text-amber-400" />;
        if (c.includes('dead') || c.includes('死亡')) return <Skull size={12} className="text-slate-600" />;
        if (c.includes('unconscious') || c.includes('昏迷')) return <Skull size={12} className="text-stone-500" />;
        if (c.includes('injured') || c.includes('重傷')) return <Activity size={12} className="text-rose-500" />; // Novel mode
        if (c.includes('blind') || c.includes('致盲')) return <Eye size={12} className="text-slate-500" />;
        if (c.includes('charm') || c.includes('魅惑')) return <Heart size={12} className="text-pink-400" />;
        if (c.includes('fright') || c.includes('恐懼')) return <Activity size={12} className="text-violet-400" />;
        return <Brain size={12} className="text-sky-400" />; // Default magic/mental
    };

    return (
        <div className="flex flex-wrap gap-1 mt-1">
            {conditions.map((cond, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700 text-[9px] text-slate-300 uppercase tracking-tight">
                    {getIcon(cond)}
                    {cond}
                </div>
            ))}
        </div>
    );
};

/**
 * CombatStatCompact
 * Tiny grid for stats, useful for TRPG sidebar.
 */
export const CombatStatCompact = ({ stats }) => {
    if (!stats) return null;
    return (
        <div className="grid grid-cols-3 gap-y-0.5 gap-x-1 text-[9px] text-slate-500 font-mono mt-1 opacity-80">
            <span className={stats.str > 14 ? "text-amber-500 font-bold" : ""}>STR {stats.str}</span>
            <span className={stats.dex > 14 ? "text-amber-500 font-bold" : ""}>DEX {stats.dex}</span>
            <span className={stats.con > 14 ? "text-amber-500 font-bold" : ""}>CON {stats.con}</span>
            <span className={stats.int > 14 ? "text-amber-500 font-bold" : ""}>INT {stats.int}</span>
            <span className={stats.wis > 14 ? "text-amber-500 font-bold" : ""}>WIS {stats.wis}</span>
            <span className={stats.cha > 14 ? "text-amber-500 font-bold" : ""}>CHA {stats.cha}</span>
        </div>
    );
}
