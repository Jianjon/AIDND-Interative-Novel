import React, { useEffect, useState } from 'react';

const DiceRollAnimation = ({ targetValue, onComplete }) => {
    const [displayValue, setDisplayValue] = useState(1);
    const [isRolling, setIsRolling] = useState(true);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Fast random rolling effect
        const rollInterval = setInterval(() => {
            setDisplayValue(Math.floor(Math.random() * 20) + 1);
            setRotation({
                x: Math.random() * 360,
                y: Math.random() * 360
            });
        }, 50);

        // Stop rolling and land on target
        const stopTimeout = setTimeout(() => {
            clearInterval(rollInterval);
            setIsRolling(false);
            setDisplayValue(targetValue);
            setRotation({ x: 0, y: 0 }); // Reset rotation or set to specific face if doing 3D

            // Brief pause before notifying completion
            setTimeout(onComplete, 800);
        }, 1500);

        return () => {
            clearInterval(rollInterval);
            clearTimeout(stopTimeout);
        };
    }, [targetValue, onComplete]);

    return (
        <div className="flex items-center justify-center py-6 animate-in fade-in zoom-in duration-300">
            <div className={`relative w-24 h-24 flex items-center justify-center transition-all duration-500 ease-out transform ${isRolling ? 'scale-110' : 'scale-100'}`}>
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-amber-500/20 rounded-full blur-xl transition-opacity ${isRolling ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />

                {/* Dice Body */}
                <div
                    className={`
                        w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-950 
                        border-2 ${isRolling ? 'border-amber-400/50' : 'border-amber-500'} 
                        rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)]
                        flex items-center justify-center relative overflow-hidden
                        transition-all duration-300
                    `}
                    style={{
                        transform: `rotate(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        transition: isRolling ? 'none' : 'transform 0.5s ease-out'
                    }}
                >
                    {/* Inner texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

                    {/* Number */}
                    <span className={`
                        font-serif font-bold text-4xl 
                        ${isRolling ? 'text-slate-400 blur-[1px]' : 'text-amber-400 scale-125'}
                        transition-all duration-300
                    `}>
                        {displayValue}
                    </span>

                    {/* Critical Hit/Miss indicators */}
                    {!isRolling && targetValue == 20 && (
                        <div className="absolute inset-0 border-4 border-amber-400/50 rounded-xl animate-ping" />
                    )}
                    {!isRolling && targetValue == 1 && (
                        <div className="absolute inset-0 border-4 border-red-500/50 rounded-xl animate-pulse" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiceRollAnimation;
