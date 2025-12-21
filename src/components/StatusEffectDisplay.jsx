import React from 'react';
import { Skull, Zap, Shield, Eye, Heart, Wind, Flame, Snowflake, Moon, Sun, AlertTriangle } from 'lucide-react';

/**
 * StatusEffectDisplay.jsx
 * Displays active conditions/status effects on a character with duration tracking.
 */

const CONDITION_ICONS = {
    // Debuffs
    'Poisoned': { icon: Skull, color: 'text-green-400', bg: 'bg-green-900/50' },
    '中毒': { icon: Skull, color: 'text-green-400', bg: 'bg-green-900/50' },
    'Stunned': { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-900/50' },
    '昏迷': { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-900/50' },
    'Paralyzed': { icon: Snowflake, color: 'text-cyan-400', bg: 'bg-cyan-900/50' },
    '麻痺': { icon: Snowflake, color: 'text-cyan-400', bg: 'bg-cyan-900/50' },
    'Blinded': { icon: Eye, color: 'text-slate-400', bg: 'bg-slate-700/50' },
    '目盲': { icon: Eye, color: 'text-slate-400', bg: 'bg-slate-700/50' },
    'Frightened': { icon: AlertTriangle, color: 'text-purple-400', bg: 'bg-purple-900/50' },
    '恐懼': { icon: AlertTriangle, color: 'text-purple-400', bg: 'bg-purple-900/50' },
    'Prone': { icon: Wind, color: 'text-slate-400', bg: 'bg-slate-700/50' },
    '倒地': { icon: Wind, color: 'text-slate-400', bg: 'bg-slate-700/50' },
    'Restrained': { icon: Shield, color: 'text-orange-400', bg: 'bg-orange-900/50' },
    '束縛': { icon: Shield, color: 'text-orange-400', bg: 'bg-orange-900/50' },
    'Charmed': { icon: Heart, color: 'text-pink-400', bg: 'bg-pink-900/50' },
    '魅惑': { icon: Heart, color: 'text-pink-400', bg: 'bg-pink-900/50' },
    'Burning': { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-900/50' },
    '燃燒': { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-900/50' },

    // Buffs
    'Blessed': { icon: Sun, color: 'text-amber-300', bg: 'bg-amber-900/50' },
    '祝福': { icon: Sun, color: 'text-amber-300', bg: 'bg-amber-900/50' },
    'Hasted': { icon: Zap, color: 'text-blue-400', bg: 'bg-blue-900/50' },
    '加速': { icon: Zap, color: 'text-blue-400', bg: 'bg-blue-900/50' },
    'Invisible': { icon: Moon, color: 'text-indigo-300', bg: 'bg-indigo-900/50' },
    '隱形': { icon: Moon, color: 'text-indigo-300', bg: 'bg-indigo-900/50' },
    'Raging': { icon: Flame, color: 'text-red-500', bg: 'bg-red-900/50' },
    '狂暴': { icon: Flame, color: 'text-red-500', bg: 'bg-red-900/50' },
};

const DEFAULT_CONDITION = { icon: AlertTriangle, color: 'text-slate-400', bg: 'bg-slate-800/50' };

export default function StatusEffectDisplay({ conditions = [], compact = false }) {
    if (!conditions || conditions.length === 0) return null;

    return (
        <div className={`flex flex-wrap gap-1.5 ${compact ? '' : 'mt-2'}`}>
            {conditions.map((condition, idx) => {
                const conditionName = typeof condition === 'string' ? condition : condition.name;
                const duration = typeof condition === 'object' ? condition.duration : -1;
                const config = CONDITION_ICONS[conditionName] || DEFAULT_CONDITION;
                const IconComponent = config.icon;

                return (
                    <div
                        key={idx}
                        className={`
                            flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold
                            ${config.bg} ${config.color} border border-current/30
                            transition-all hover:scale-105
                        `}
                        title={`${conditionName}${duration > 0 ? ` (${duration} 回合)` : ''}`}
                    >
                        <IconComponent size={12} />
                        <span className="truncate max-w-[60px]">{conditionName}</span>
                        {duration > 0 && (
                            <span className="text-[10px] opacity-70 ml-0.5">
                                {duration}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
