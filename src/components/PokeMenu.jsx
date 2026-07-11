import { Play, FastForward, Brain, MessageCircle } from 'lucide-react';

const PokeMenu = ({ isOpen, onClose, onAction, isGenerating }) => {
    if (!isOpen) return null;

    const options = [
        { id: 'continue', label: '繼續 (Continue)', icon: <Play size={16} />, desc: 'Force the story to proceed', color: 'text-emerald-400', border: 'border-emerald-500/30 hover:bg-emerald-500/10' },
        { id: 'plot_push', label: '強制推動 (Push Plot)', icon: <FastForward size={16} />, desc: 'Force a scene or act transition', color: 'text-rose-400', border: 'border-rose-500/30 hover:bg-rose-500/10' },
        { id: 'review', label: '檢視 (Review)', icon: <Brain size={16} />, desc: 'DM analyzes game state', color: 'text-amber-400', border: 'border-amber-500/30 hover:bg-amber-500/10' },
        { id: 'report', label: '回報 (Report)', icon: <MessageCircle size={16} />, desc: 'Discuss issues with DM', color: 'text-indigo-400', border: 'border-indigo-500/30 hover:bg-indigo-500/10' },
    ];

    return (
        <div className="absolute top-12 right-12 z-50 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 w-64 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">DM INTERACTION</div>
            <div className="space-y-2">
                {options.map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => {
                            onClose();
                            onAction(opt.id);
                        }}
                        disabled={isGenerating && opt.id !== 'continue' && opt.id !== 'report'} // Allow 'continue' to reset if generating
                        className={`w-full text-left p-2 rounded border ${opt.border} transition-colors flex items-start gap-3 group`}
                    >
                        <div className={`mt-0.5 ${opt.color} `}>{opt.icon}</div>
                        <div>
                            <div className={`text-sm font-bold ${opt.color} `}>{opt.label}</div>
                            <div className="text-[10px] text-slate-400 group-hover:text-slate-300">{opt.desc}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PokeMenu;
