import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Sword, Shield, Skull, Zap, X, Check } from 'lucide-react';

const DualDiceRoll = ({
    playerRoll = { base: 10, mod: 0, total: 10 },
    target = { dc: 10, label: 'DC' },
    result = 'Success', // 'Success' | 'Failure'
    checkName = 'Check',
    onComplete
}) => {
    const [phase, setPhase] = useState('rolling'); // rolling -> reveal_target -> outcome -> finished
    const [displayRoll, setDisplayRoll] = useState(1);
    const [showResultParams, setShowResultParams] = useState(false);

    // Rolling Animation for Player
    useEffect(() => {
        let interval;
        if (phase === 'rolling') {
            interval = setInterval(() => {
                setDisplayRoll(Math.floor(Math.random() * 20) + 1);
            }, 80);

            // Stop rolling after 1.0s
            setTimeout(() => {
                clearInterval(interval);
                setDisplayRoll(playerRoll.base);
                setPhase('reveal_target');
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [phase, playerRoll.base]);

    // Sequence Management
    useEffect(() => {
        if (phase === 'reveal_target') {
            // Show DC/Enemy Roll shortly after player roll stops
            const timer = setTimeout(() => {
                setPhase('outcome');
            }, 100);
            return () => clearTimeout(timer);
        }

        if (phase === 'outcome') {
            // Stamp the result
            const timer = setTimeout(() => {
                setShowResultParams(true);
                // Hold for a bit then finish
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 2000);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    const isSuccess = result.includes('成功') || result.includes('Success');
    const isCrit = playerRoll.base === 20;
    const isFail = playerRoll.base === 1;

    // Portal Target
    const targetEl = document.getElementById('game-left-panel') || document.body;

    return ReactDOM.createPortal(
        <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300 rounded-lg overflow-hidden">
            {/* Main Showdown Container */}
            <div className="relative w-full max-w-lg flex flex-col items-center p-4">

                {/* Title */}
                <div className="absolute -top-16 text-amber-500 font-serif font-bold text-2xl tracking-widest uppercase mb-8 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                    {checkName}
                </div>

                <div className="flex items-center justify-center gap-4 w-full">

                    {/* LEFT SIDE: PLAYER */}
                    <div className={`relative flex flex-col items-center transition-all duration-500 ${phase !== 'rolling' ? 'scale-105' : 'scale-100'}`}>
                        <div className="text-cyan-400 font-bold tracking-widest mb-2 uppercase text-xs">You</div>

                        {/* Dice Hexagon */}
                        <div className={`w-24 h-24 relative flex items-center justify-center mb-2 transition-transform duration-300 ${isCrit ? 'animate-bounce drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]' : ''}`}>
                            {/* Dice SVG or BG */}
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-800 fill-current drop-shadow-xl">
                                <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" stroke="currentColor" strokeWidth="2" className={isSuccess ? "text-cyan-500/50" : "text-slate-700"} />
                            </svg>

                            {/* Number */}
                            <span className={`relative z-10 font-bold text-4xl font-mono ${isCrit ? "text-cyan-300" : isFail ? "text-red-500" : "text-white"}`}>
                                {displayRoll}
                            </span>

                            {/* Natural 20/1 Indicator */}
                            {phase !== 'rolling' && isCrit && <div className="absolute -bottom-2 text-[10px] bg-cyan-500 text-black font-bold px-1.5 rounded shadow-lg animate-pulse whitespace-nowrap">CRIT</div>}
                            {phase !== 'rolling' && isFail && <div className="absolute -bottom-2 text-[10px] bg-red-600 text-white font-bold px-1.5 rounded shadow-lg whitespace-nowrap">FAIL</div>}
                        </div>

                        {/* Modifiers Calculation */}
                        <div className={`flex flex-col items-center space-y-0.5 transition-opacity duration-300 ${phase === 'rolling' ? 'opacity-50' : 'opacity-100'}`}>
                            <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                                <span>{playerRoll.base}</span>
                                <span>+</span>
                                <span>{playerRoll.mod}</span>
                            </div>
                            <div className="text-2xl font-bold text-cyan-400 leading-none">
                                = {playerRoll.total}
                            </div>
                        </div>
                    </div>

                    {/* VS BADGE */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-12 text-slate-700 opacity-50 font-black italic text-2xl">
                        VS
                    </div>

                    {/* RIGHT SIDE: TARGET (DC) */}
                    <div className={`relative flex flex-col items-center transition-all duration-500 ${phase === 'reveal_target' || phase === 'outcome' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                        <div className="text-rose-500 font-bold tracking-widest mb-2 uppercase text-xs">Target</div>

                        {/* Target Circle */}
                        <div className="w-24 h-24 relative flex items-center justify-center mb-2 border-4 border-rose-900/50 rounded-full bg-slate-900/80 shadow-[inset_0_0_20px_rgba(225,29,72,0.2)]">
                            {phase === 'rolling' ? (
                                <Skull size={32} className="text-rose-900/40 animate-pulse" />
                            ) : (
                                <span className="text-4xl font-bold text-rose-500 font-serif animate-in zoom-in duration-300">
                                    {target.dc}
                                </span>
                            )}
                            <div className="absolute -bottom-2 bg-rose-950 border border-rose-700 text-rose-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {target.label}
                            </div>
                        </div>

                        {/* Comparison Placeholder */}
                        <div className="h-8 flex items-center justify-center"></div>
                    </div>

                </div>

                {/* RESULT STAMP */}
                {phase === 'outcome' && (
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none`}>
                        <div className={`
                            border-[6px] border-double px-8 py-2 rounded-lg transform -rotate-12 
                            text-4xl font-black uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md
                            animate-in zoom-in fade-in duration-200 whitespace-nowrap
                            ${isSuccess
                                ? "border-cyan-500/80 text-cyan-400 bg-cyan-950/40 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
                                : "border-red-600/80 text-red-500 bg-red-950/40 shadow-[0_0_50px_rgba(220,38,38,0.4)]"
                            }
                        `}>
                            {isSuccess ? "SUCCESS" : "FAILURE"}
                        </div>
                    </div>
                )}

                {/* Close Hint */}
                {showResultParams && (
                    <div className="absolute -bottom-12 text-slate-500 text-[10px] animate-pulse">
                        Continuing...
                    </div>
                )}

            </div>
        </div>,
        targetEl
    );
};

export default DualDiceRoll;
