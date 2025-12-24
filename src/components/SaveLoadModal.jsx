import React, { useState, useEffect } from 'react';
import { Save, FolderOpen, Trash2, Clock, MapPin, User, ChevronRight, FileX } from 'lucide-react';

export default function SaveLoadModal({ isOpen, mode, onClose, onSave, onLoad, onDelete }) {
    const [slots, setSlots] = useState([
        { id: 1, label: "存檔 1 (Slot 1)", empty: true },
        { id: 2, label: "存檔 2 (Slot 2)", empty: true },
        { id: 3, label: "存檔 3 (Slot 3)", empty: true }
    ]);

    useEffect(() => {
        if (isOpen) {
            refreshSlots();
        }
    }, [isOpen]);

    const refreshSlots = () => {
        const newSlots = [1, 2, 3].map(id => {
            const saveKey = `dnd_save_slot_${id}`;
            const json = localStorage.getItem(saveKey);
            if (!json) {
                return { id, label: `存檔 ${id} (Slot ${id})`, empty: true };
            }
            try {
                const data = JSON.parse(json);
                return {
                    id,
                    label: `存檔 ${id} (Slot ${id})`,
                    empty: false,
                    timestamp: data.savedAt || "Unknown Time",
                    location: Array.isArray(data.currentLocation) ? data.currentLocation.join(' > ') : (data.currentLocation || "Unknown Location"),
                    partyInfo: data.party ? `${data.party.length} 英雄` : "Empty Party",
                    summary: data.selectedModule?.title || "Unknown Adventure",
                    act: data.currentAct ? `Act ${data.currentAct}` : ""
                };
            } catch (e) {
                console.error("Corrupt save slot", id, e);
                return { id, label: `存檔 ${id} (Slot ${id})`, empty: false, error: "Corrupted Data" };
            }
        });
        setSlots(newSlots);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-950 border border-amber-500/30 rounded-lg shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-5 border-b border-amber-500/20 bg-slate-900/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2">
                        {mode === 'save' ? <Save size={24} /> : <FolderOpen size={24} />}
                        {mode === 'save' ? '儲存進度 (Save Game)' : '讀取進度 (Load Game)'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded"
                    >
                        <FileX size={20} />
                    </button>
                </div>

                {/* Slots */}
                <div className="p-6 space-y-4">
                    {slots.map((slot) => (
                        <div
                            key={slot.id}
                            className={`
                                relative border rounded-xl overflow-hidden transition-all duration-200 group
                                ${slot.empty
                                    ? 'bg-slate-900/30 border-slate-800 border-dashed hover:border-slate-600'
                                    : 'bg-slate-900 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800'
                                }
                            `}
                        >
                            <div className="p-4 flex justify-between items-center">
                                {/* Left Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${slot.empty ? 'bg-slate-800 text-slate-600' : 'bg-amber-900/40 text-amber-500'}`}>
                                            {slot.id}
                                        </div>
                                        <h3 className={`font-bold ${slot.empty ? 'text-slate-600' : 'text-slate-200'}`}>
                                            {slot.empty ? "空存檔位置 (Empty Slot)" : slot.summary}
                                        </h3>
                                    </div>

                                    {!slot.empty && !slot.error && (
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400 ml-8">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={10} className="text-emerald-500/70" />
                                                <span>{slot.timestamp}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 truncate">
                                                <MapPin size={10} className="text-indigo-500/70" />
                                                <span className="truncate">{slot.location}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pl-4">
                                    {mode === 'save' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    if (slot.isAuto) return;
                                                    if (slot.empty || window.confirm(`確定要覆蓋【存檔 ${slot.id}】嗎？`)) {
                                                        onSave(slot.id);
                                                        refreshSlots(); // Optimistic refresh although parent usually closes modal
                                                    }
                                                }}
                                                disabled={slot.isAuto}
                                                className={`px-4 py-2 ${slot.isAuto ? 'bg-slate-800 text-slate-600 cursor-not-allowed border-slate-700' : 'bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-300 border-slate-700 hover:border-amber-500'} rounded text-xs font-bold transition-colors flex items-center gap-1.5 border`}
                                            >
                                                <Save size={14} />
                                                {slot.isAuto ? "自動" : (slot.empty ? "儲存" : "覆蓋")}
                                            </button>
                                            {!slot.empty && !slot.isAuto && (
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`確定要刪除【存檔 ${slot.id}】嗎？此操作無法復原！`)) {
                                                            onDelete(slot.id);
                                                            refreshSlots();
                                                        }
                                                    }}
                                                    className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors"
                                                    title="刪除"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        !slot.empty && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`確定要讀取【存檔 ${slot.id}】嗎？未損失的進度將會遺失。`)) {
                                                            onLoad(slot.id);
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-900 hover:text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                                                >
                                                    <ChevronRight size={14} />
                                                    讀取
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`確定要刪除【存檔 ${slot.id}】嗎？此操作無法復原！`)) {
                                                            onDelete(slot.id);
                                                            refreshSlots();
                                                        }
                                                    }}
                                                    className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors"
                                                    title="刪除"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
