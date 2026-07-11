import  { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, RefreshCw, Send } from 'lucide-react';

const DMChatModal = ({ isOpen, onClose, onSend, isGenerating }) => {
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-indigo-500/50 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20} /></button>
                <h2 className="text-lg font-bold font-tome-header text-indigo-400 mb-4 flex items-center gap-2">
                    <MessageCircle size={18} /> DM Communication Channel
                </h2>
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Report a bug, inconsistent logic, or discuss the game..."
                    className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-indigo-500 outline-none resize-none mb-4"
                    disabled={isGenerating}
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm">Cancel</button>
                    <button
                        onClick={handleSend}
                        disabled={isGenerating || !input.trim()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 font-bold disabled:opacity-50"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
                        Send Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DMChatModal;
