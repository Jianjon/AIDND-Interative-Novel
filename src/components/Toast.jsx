import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const TOAST_TYPES = {
    success: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-900/20 border-emerald-500/30" },
    error: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-900/20 border-red-500/30" },
    info: { icon: Info, color: "text-blue-400", bg: "bg-blue-900/20 border-blue-500/30" }
};

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const style = TOAST_TYPES[type] || TOAST_TYPES.info;
    const Icon = style.icon;

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-xl animate-in slide-in-from-top-4 fade-in duration-300 ${style.bg} ${style.color}`}>
            <Icon size={20} />
            <span className="font-medium text-sm text-slate-100">{message}</span>
            <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity ml-2">
                <X size={16} />
            </button>
        </div>
    );
}
