import React from 'react';
import { Scroll, X } from 'lucide-react';

export default function JournalModal({ journal, onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900/95 w-full max-w-2xl max-h-[80vh] rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-800/50 flex items-center justify-between bg-slate-950/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-900/20 rounded-lg border border-amber-500/30 text-amber-500">
                            <Scroll size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-serif text-amber-500 font-bold">冒險日誌</h3>
                            <p className="text-slate-500 text-xs">{journal?.length || 0} 條記錄</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-amber-500 transition-colors p-2 hover:bg-slate-800/50 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {/* Journal Entries */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {!Array.isArray(journal) || journal.length === 0 ? (
                        <div className="text-center py-16 text-slate-600 italic">
                            <Scroll size={32} className="mx-auto mb-4 opacity-30" />
                            <p>日誌空空如也...</p>
                            <p className="text-xs mt-2">開始冒險後，重要事件會自動記錄在這裡。</p>
                        </div>
                    ) : (
                        journal.slice().reverse().map((entry, idx) => (
                            <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-amber-500 font-bold text-sm">回合 {entry.turn}</span>
                                    <span className="text-slate-600 text-[10px]">{entry.timestamp}</span>
                                </div>
                                <div className="text-slate-200 text-sm font-serif">{entry.event}</div>
                                {entry.details && (
                                    <div className="text-slate-500 text-xs mt-2 italic">
                                        {typeof entry.details === 'object' ? entry.details.public || JSON.stringify(entry.details) : entry.details}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
