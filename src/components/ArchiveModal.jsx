import React, { useState, useEffect } from 'react';
import { X, Book, Trash2, Calendar, Users, ChevronRight, Download, ArrowLeft } from 'lucide-react';
import { ArchiveService } from '../services/ArchiveService';
import ArchiveReader from './ArchiveReader';

export default function ArchiveModal({ isOpen, onClose }) {
    const [adventures, setAdventures] = useState([]);
    const [selectedAdventure, setSelectedAdventure] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'read'

    useEffect(() => {
        if (isOpen) {
            setAdventures(ArchiveService.getArchive());
            setSelectedAdventure(null);
            setViewMode('list');
        }
    }, [isOpen]);

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (window.confirm('確定要永久刪除這段冒險回憶嗎？')) {
            ArchiveService.deleteFromArchive(id);
            setAdventures(ArchiveService.getArchive());
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/50 sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    {viewMode === 'read' ? (
                        <button
                            onClick={() => setViewMode('list')}
                            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                    ) : (
                        <div className="p-3 bg-amber-900/20 rounded-xl border border-amber-500/30 text-amber-500">
                            <Book size={24} />
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl font-serif text-amber-500 font-bold tracking-tight">
                            {viewMode === 'read' ? selectedAdventure.title : '冒險圖書館 (The Chronicle Library)'}
                        </h2>
                        <p className="text-slate-500 text-xs">
                            {viewMode === 'read' ? selectedAdventure.moduleName : `共有 ${adventures.length} 篇被遺忘的史詩`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {viewMode === 'list' && adventures.length > 0 && (
                        <button
                            onClick={ArchiveService.exportArchive}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
                        >
                            <Download size={16} /> 匯出全部
                        </button>
                    )}
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-2">
                        <X size={28} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                {viewMode === 'list' ? (
                    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {adventures.length === 0 ? (
                            <div className="col-span-full py-32 text-center space-y-4 opacity-40">
                                <Book size={64} className="mx-auto" />
                                <p className="text-xl font-serif italic">架上空空如也。去創造一段傳奇吧。</p>
                            </div>
                        ) : (
                            adventures.map(adv => (
                                <div
                                    key={adv.id}
                                    onClick={() => {
                                        setSelectedAdventure(adv);
                                        setViewMode('read');
                                    }}
                                    className="group relative bg-slate-900/40 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:bg-slate-800/60 hover:-translate-y-1 shadow-lg overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Book size={100} />
                                    </div>

                                    <div className="relative z-10 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <span className="px-2 py-0.5 bg-amber-900/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded border border-amber-500/20">
                                                {adv.moduleName}
                                            </span>
                                            <button
                                                onClick={(e) => handleDelete(adv.id, e)}
                                                className="text-slate-600 hover:text-rose-500 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-2">
                                            {adv.title}
                                        </h3>

                                        <div className="flex flex-col gap-2 text-slate-500 text-xs font-mono">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} /> {adv.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users size={14} /> {adv.party.map(p => p.name).join(', ')}
                                            </div>
                                        </div>

                                        <div className="pt-2 flex items-center gap-1 text-amber-600 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                            翻開史詩 <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="min-h-full bg-[#f4ecd8] text-[#433422] selection:bg-amber-500/30">
                        <div className="max-w-4xl mx-auto py-16 px-8 text-center border-b border-amber-900/10 mb-8">
                            <h1 className="text-5xl font-serif font-bold mb-4">{selectedAdventure.title}</h1>
                            <div className="flex justify-center items-center gap-6 text-sm italic opacity-70">
                                <span>之於 {selectedAdventure.moduleName}</span>
                                <span>•</span>
                                <span>{selectedAdventure.date} 編撰</span>
                            </div>
                            <div className="mt-8 flex justify-center gap-4">
                                {selectedAdventure.party.map((p, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <img src={p.avatar} className="w-12 h-12 rounded-full border-2 border-amber-900/20" alt="" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <ArchiveReader
                            logs={selectedAdventure.logs}
                            party={selectedAdventure.party}
                            theme="sepia"
                        />
                        <div className="max-w-4xl mx-auto py-32 text-center">
                            <div className="h-px bg-amber-900/10 mb-8" />
                            <p className="font-serif italic opacity-40">—— 全編完 ——</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
