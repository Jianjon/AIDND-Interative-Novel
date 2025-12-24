import React, { useState } from 'react';
import { X, Type, Image as ImageIcon, Music, Monitor, Moon, Sun, Coffee, Eye, Volume2, VolumeX, Settings, Cpu, HardDrive } from 'lucide-react';

const SettingsModal = ({
    isOpen,
    onClose,
    settings,
    onUpdateSettings,
    onGenerateScene,
    isGeneratingScene,
    isMuted,
    onToggleMute,
    onClearCache
}) => {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState('audio');

    const themes = [
        { id: 'default', name: '暗黑模式 (Dark)', bg: 'bg-slate-950', text: 'text-slate-200', icon: Moon },
        { id: 'light', name: '明亮模式 (Light)', bg: 'bg-[#f0f0f0]', text: 'text-slate-900', icon: Sun },
        { id: 'sepia', name: '羊皮紙 (Sepia)', bg: 'bg-[#f4ecd8]', text: 'text-[#433422]', icon: Coffee },
        { id: 'midnight', name: '午夜藍 (Midnight)', bg: 'bg-[#0f0f1a]', text: 'text-[#aaccff]', icon: Eye },
    ];

    const fontSizes = [
        { id: 'text-sm', name: '小', label: 'A' },
        { id: 'text-base', name: '中', label: 'A' },
        { id: 'text-lg', name: '大', label: 'A' },
        { id: 'text-xl', name: '特大', label: 'A' },
    ];

    const tabs = [
        { id: 'audio', label: '音效設定', icon: Music },
        { id: 'display', label: '顯示設定', icon: Monitor },
        { id: 'general', label: '一般設定', icon: Settings },
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[70vh] md:h-auto animate-in fade-in zoom-in-95 duration-200">

                {/* Sidebar / Tabs */}
                <div className="w-full md:w-48 bg-slate-950/50 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                                ${activeTab === tab.id
                                    ? 'bg-amber-600 text-white shadow-md'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                            `}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
                        <h3 className="text-lg font-serif font-bold text-amber-500 flex items-center gap-2">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar bg-slate-900">

                        {/* === AUDIO SETTINGS === */}
                        {activeTab === 'audio' && (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-slate-300">主音量 (Master Volume)</label>
                                        <span className="text-xs text-amber-500 font-mono">{settings.masterVolume || 100}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={settings.masterVolume || 100}
                                        onChange={(e) => onUpdateSettings('masterVolume', parseInt(e.target.value))}
                                        className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />

                                    <div className="flex items-center justify-between pt-2">
                                        <label className="text-sm font-bold text-slate-300">背景音樂 (BGM)</label>
                                        <span className="text-xs text-amber-500 font-mono">{settings.bgmVolume || 80}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={settings.bgmVolume || 80}
                                        onChange={(e) => onUpdateSettings('bgmVolume', parseInt(e.target.value))}
                                        className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />

                                    <div className="flex items-center justify-between pt-2">
                                        <label className="text-sm font-bold text-slate-300">音效 (SFX)</label>
                                        <span className="text-xs text-amber-500 font-mono">{settings.sfxVolume || 100}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={settings.sfxVolume || 100}
                                        onChange={(e) => onUpdateSettings('sfxVolume', parseInt(e.target.value))}
                                        className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {isMuted ? <VolumeX className="text-red-500" /> : <Volume2 className="text-emerald-500" />}
                                        <span className="text-sm font-medium text-slate-300">靜音模式 (Mute All)</span>
                                    </div>
                                    <button
                                        onClick={onToggleMute}
                                        className={`
                                            px-4 py-2 rounded-lg text-xs font-bold transition-all border
                                            ${isMuted
                                                ? "bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30"
                                                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/30"}
                                        `}
                                    >
                                        {isMuted ? "已靜音" : "開啟中"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === DISPLAY SETTINGS === */}
                        {activeTab === 'display' && (
                            <div className="space-y-8">
                                <section className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Type size={14} /> 主題風格 (Theme)
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {themes.map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => onUpdateSettings('theme', t.id)}
                                                className={`
                                                    flex items-center gap-3 p-3 rounded-lg border transition-all text-left
                                                    ${settings.theme === t.id
                                                        ? 'border-amber-500 bg-amber-900/20 text-amber-500 ring-1 ring-amber-500/50'
                                                        : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-600 hover:bg-slate-800'}
                                                `}
                                            >
                                                <div className={`p-2 rounded-md ${t.bg} ${t.text} border border-black/10`}>
                                                    <t.icon size={14} />
                                                </div>
                                                <span className="text-xs font-bold">{t.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        字體大小 (Font Size)
                                    </h4>
                                    <div className="flex items-center bg-slate-950/50 p-1 rounded-lg border border-slate-800">
                                        {fontSizes.map((f, idx) => (
                                            <button
                                                key={f.id}
                                                onClick={() => onUpdateSettings('fontSize', f.id)}
                                                className={`
                                                    flex-1 py-2 rounded-md flex items-center justify-center transition-all font-serif
                                                    ${settings.fontSize === f.id
                                                        ? 'bg-amber-600 text-white shadow-sm'
                                                        : 'text-slate-500 hover:text-slate-300'}
                                                `}
                                                style={{ fontSize: idx === 0 ? '12px' : idx === 1 ? '14px' : idx === 2 ? '16px' : '18px' }}
                                            >
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        字距 (Letter Spacing)
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-400">緊密</span>
                                            <span className="text-xs text-amber-500 font-mono">{settings.letterSpacing || 0}px</span>
                                            <span className="text-xs text-slate-400">寬鬆</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="4" step="0.5"
                                            value={settings.letterSpacing || 0}
                                            onChange={(e) => onUpdateSettings('letterSpacing', parseFloat(e.target.value))}
                                            className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        行高 (Line Height)
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-400">緊密</span>
                                            <span className="text-xs text-amber-500 font-mono">{settings.lineHeight || 1.8}</span>
                                            <span className="text-xs text-slate-400">寬鬆</span>
                                        </div>
                                        <input
                                            type="range" min="1.4" max="2.4" step="0.1"
                                            value={settings.lineHeight || 1.8}
                                            onChange={(e) => onUpdateSettings('lineHeight', parseFloat(e.target.value))}
                                            className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </section>


                                <section className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <ImageIcon size={14} /> 場景生成 (Scene Visualization)
                                    </h4>
                                    <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800">
                                        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                            使用 AI 根據當前地點生成氛圍背景圖。這會消耗額外的運算資源。
                                        </p>
                                        <button
                                            onClick={onGenerateScene}
                                            disabled={isGeneratingScene}
                                            className={`
                                                w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 border transition-all text-sm
                                                ${isGeneratingScene
                                                    ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-wait'
                                                    : 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-500'}
                                            `}
                                        >
                                            {isGeneratingScene ? "繪製中 (Painting)..." : "重新生成場景圖 (Regenerate Art)"}
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* === GENERAL SETTINGS === */}
                        {activeTab === 'general' && (
                            <div className="space-y-8">
                                <section className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Cpu size={14} /> 系統效能 (System)
                                    </h4>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-slate-300">打字字速度 (Text Speed)</label>
                                            <span className="text-xs text-amber-500 font-mono">{settings.textSpeed || 30}ms</span>
                                        </div>
                                        <input
                                            type="range" min="10" max="250" step="10"
                                            value={settings.textSpeed || 30}
                                            onChange={(e) => onUpdateSettings('textSpeed', parseInt(e.target.value))}
                                            className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500">
                                            <span>最快 (Fast)</span>
                                            <span>數值越大越慢 (Higher is Slower)</span>
                                            <span>最慢 (Slow)</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800 flex items-center justify-between mt-4">
                                        <div>
                                            <div className="text-sm font-medium text-slate-300">AI 模型 (Model)</div>
                                            <div className="text-xs text-slate-500">Currently running on Gemini 2.0 Flash Exp</div>
                                        </div>
                                        <Cpu size={20} className="text-slate-600" />
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <HardDrive size={14} /> 資料管理 (Data)
                                    </h4>
                                    <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800">
                                        <button
                                            onClick={onClearCache}
                                            className="w-full py-2 rounded-lg border border-red-900/30 bg-red-900/10 text-red-400 hover:bg-red-900/20 text-xs font-bold transition-all"
                                        >
                                            清除快取資料 (Clear Cache)
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
