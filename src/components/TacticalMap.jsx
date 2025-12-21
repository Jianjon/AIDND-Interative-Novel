import React from 'react';
import { Shield, Crosshair, Eye } from 'lucide-react';

/**
 * TacticalMap.jsx
 * Simple three-zone tactical positioning visualization.
 * Zones: Front (Melee) | Mid (Flexible) | Back (Ranged/Casters)
 */

const ZONE_CONFIG = {
    front: {
        label: '前排',
        icon: Shield,
        color: 'border-red-500/50 bg-red-950/30',
        description: '近戰區 - 容易被攻擊'
    },
    mid: {
        label: '中排',
        icon: Crosshair,
        color: 'border-amber-500/50 bg-amber-950/30',
        description: '靈活區 - 可支援前後'
    },
    back: {
        label: '後排',
        icon: Eye,
        color: 'border-blue-500/50 bg-blue-950/30',
        description: '遠程區 - 較安全'
    }
};

export default function TacticalMap({
    characters = [],
    positions = {},
    onPositionChange,
    readOnly = false
}) {
    const zones = ['front', 'mid', 'back'];

    const getCharactersInZone = (zone) => {
        return characters.filter(char => {
            const pos = positions[char.id] || char.position || 'mid';
            return pos === zone;
        });
    };

    const handleDrop = (e, zone) => {
        if (readOnly) return;
        e.preventDefault();
        const charId = e.dataTransfer.getData('charId');
        if (charId && onPositionChange) {
            onPositionChange(charId, zone);
        }
    };

    const handleDragOver = (e) => {
        if (!readOnly) e.preventDefault();
    };

    const handleDragStart = (e, charId) => {
        if (readOnly) return;
        e.dataTransfer.setData('charId', charId);
    };

    return (
        <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-3">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Crosshair size={12} className="text-amber-400" />
                戰術位置
            </div>

            <div className="grid grid-cols-3 gap-2">
                {zones.map(zone => {
                    const config = ZONE_CONFIG[zone];
                    const charsInZone = getCharactersInZone(zone);
                    const IconComponent = config.icon;

                    return (
                        <div
                            key={zone}
                            className={`
                                rounded-lg border-2 p-2 min-h-[80px] transition-all
                                ${config.color}
                                ${!readOnly ? 'hover:border-opacity-100 cursor-pointer' : ''}
                            `}
                            onDrop={(e) => handleDrop(e, zone)}
                            onDragOver={handleDragOver}
                            title={config.description}
                        >
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase mb-1.5">
                                <IconComponent size={10} />
                                {config.label}
                            </div>

                            <div className="flex flex-wrap gap-1">
                                {charsInZone.map(char => (
                                    <div
                                        key={char.id}
                                        draggable={!readOnly}
                                        onDragStart={(e) => handleDragStart(e, char.id)}
                                        className={`
                                            w-8 h-8 rounded-full overflow-hidden border-2 border-slate-600
                                            ${!readOnly ? 'cursor-grab active:cursor-grabbing hover:border-amber-500' : ''}
                                            transition-all hover:scale-110 hover:z-10
                                        `}
                                        title={char.name}
                                    >
                                        <img
                                            src={char.avatar || char.avatarUrl}
                                            alt={char.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    </div>
                                ))}
                                {charsInZone.length === 0 && (
                                    <div className="text-[10px] text-slate-600 italic">空</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
