import React, { useState } from 'react';
import { useToken } from '../contexts/TokenContext';
import { ChevronUp, ChevronDown, Activity, Database, Zap } from 'lucide-react';

export default function TokenDisplay() {
    const { usageCtx } = useToken();
    const [isExpanded, setIsExpanded] = useState(false);

    if (usageCtx.total === 0) return null;

    return (
        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500 font-mono">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex justify-between items-center hover:text-amber-500 transition-colors mb-2 group"
            >
                <div className="flex items-center gap-2">
                    <Activity size={14} className="group-hover:animate-pulse" />
                    <span className="font-bold tracking-wider">TOKEN USAGE</span>
                </div>
                {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><Database size={12} /> Total</span>
                    <span className="text-slate-300">{usageCtx.total.toLocaleString()}</span>
                </div>

                {isExpanded && (
                    <div className="animate-in slide-in-from-top-2 duration-200">
                        <div className="flex justify-between items-center mb-3">
                            <span className="flex items-center gap-1.5"><Zap size={12} /> Session</span>
                            <span className="text-emerald-400">{usageCtx.session.toLocaleString()}</span>
                        </div>

                        {/* Recent History Mini-Chart */}
                        <div className="space-y-1.5 border-t border-slate-800/50 pt-2">
                            <div className="text-[10px] uppercase text-slate-600 font-bold mb-1">Recent Activity</div>
                            {usageCtx.history.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center opacity-70">
                                    <span className="truncate max-w-[120px]" title={item.timestamp}>{item.source}</span>
                                    <span className="text-slate-400">+{item.total.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
