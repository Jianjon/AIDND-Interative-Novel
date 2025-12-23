import React from 'react';
import { Heart, Shield, Skull, Zap } from 'lucide-react';

/**
 * BondRadar Component
 * Visualizes the relationship affinity and bond state.
 * 
 * Props:
 * - affinity: number (-100 to 100)
 * - bondState: string (e.g., 'STRANGER', 'COMPANION', 'LOVER', 'ENEMY')
 * - history: Array (Recent interactions)
 */
export const BondRadar = ({ affinity = 0, bondState = 'STRANGER', history = [] }) => {

    // Normalize Affinity (0-100 for display, assuming 50 is neutral in UI terms, 
    // but input might be -100 to 100 or 0 to 100 based on Agent.
    // Agent uses 0-100 logic (50 neutral). 
    // Let's stick to 0-100.
    const normalized = Math.max(0, Math.min(100, affinity));

    // Color Logic
    const getColor = (val) => {
        if (val >= 80) return 'text-pink-500 stroke-pink-500'; // Lover/Devoted
        if (val >= 60) return 'text-green-500 stroke-green-500'; // Friendly
        if (val <= 20) return 'text-red-500 stroke-red-500'; // Hostile
        if (val <= 40) return 'text-orange-500 stroke-orange-500'; // Cold
        return 'text-gray-400 stroke-gray-400'; // Neutral
    };

    const getIcon = (state) => {
        switch (state) {
            case 'LOVER': return <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />;
            case 'CONFIDANT': return <Shield className="w-6 h-6 text-green-500" />;
            case 'COMPANION': return <Shield className="w-6 h-6 text-blue-400" />;
            case 'ENEMY': return <Skull className="w-6 h-6 text-red-600" />;
            case 'RIVAL': return <Zap className="w-6 h-6 text-yellow-500" />;
            default: return <div className="w-6 h-6 rounded-full border-2 border-gray-400" />;
        }
    };

    return (
        <div className="flex flex-col gap-2 p-2 bg-gray-900/50 rounded-lg border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bond Level</span>
                {getIcon(bondState)}
            </div>

            {/* Bar Label */}
            <div className="flex justify-between items-baseline">
                <span className={`text-lg font-bold ${getColor(normalized)}`}>
                    {bondState}
                </span>
                <span className="text-xs text-gray-500">{normalized}/100</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
                {/* Center Marker */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-600 z-10" />

                <div
                    className={`h-full transition-all duration-1000 ease-out ${normalized > 50 ? 'bg-gradient-to-r from-gray-500 to-pink-500' : 'bg-gradient-to-r from-red-500 to-gray-500'}`}
                    style={{ width: `${normalized}%` }}
                />
            </div>

            {/* History Ticker */}
            {history.length > 0 && (
                <div className="mt-2 space-y-1">
                    <div className="text-[10px] text-gray-500 uppercase">Recent Interactions</div>
                    {history.slice(-2).reverse().map((evt, idx) => (
                        <div key={idx} className="text-xs flex justify-between text-gray-400">
                            <span className="truncate max-w-[70%] text-gray-300">"{evt.reason}"</span>
                            <span className={evt.change > 0 ? "text-green-400 gap-1 flex" : "text-red-400 gap-1 flex"}>
                                {evt.change > 0 ? '+' : ''}{evt.change}
                                {evt.trigger && evt.trigger !== 'NONE' && (
                                    <span className="text-[9px] px-1 bg-gray-800 rounded border border-gray-600">
                                        {evt.trigger}
                                    </span>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
