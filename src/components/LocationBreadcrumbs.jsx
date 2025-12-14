
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

/**
 * LocationBreadcrumbs
 * Displays the current location hierarchy with breadcrumb style
 * 
 * @param {Object} props
 * @param {Array<string>} props.path - Array of location names, e.g., ["Barovia", "Village", "Tavern"]
 * @param {boolean} props.isDark - Toggle dark mode styles (default true for game)
 */
export default function LocationBreadcrumbs({ path = [], isDark = true }) {
    if (!path || path.length === 0) return null;

    return (
        <div className={`flex items-center gap-2 overflow-x-auto py-2 px-1 ${isDark ? 'text-slate-300' : 'text-slate-700'} font-serif tracking-wide`}>
            {/* Icon */}
            <div className={`p-1.5 rounded-full ${isDark ? 'bg-amber-900/30 text-amber-500' : 'bg-amber-100 text-amber-700'} shrink-0`}>
                <Navigation size={14} />
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-sm whitespace-nowrap">
                {path.map((loc, idx) => (
                    <React.Fragment key={idx}>
                        {idx > 0 && (
                            <span className="text-slate-600 mx-0.5">/</span>
                        )}
                        <span className={`
                            ${idx === path.length - 1
                                ? (isDark ? 'text-amber-200 font-bold border-b border-amber-500/30' : 'text-amber-800 font-bold')
                                : (isDark ? 'text-slate-400 hover:text-slate-200 transition-colors' : 'text-slate-500')} 
                        `}>
                            {loc}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            {/* End Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse ml-2" />
        </div>
    );
}
