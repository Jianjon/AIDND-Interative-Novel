import React from 'react';
import { Users, Sword, PawPrint, User, Zap } from 'lucide-react';

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

export default ScenarioRoster;
