import React from 'react';
import { Ghost, ChevronRight } from 'lucide-react';

const SetupView = ({ apiKey, setApiKey, setView, loadGame }) => (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-12 animate-in fade-in duration-700 overflow-y-auto bg-slate-950 bg-obsidian bg-cover bg-center box-border relative">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative z-10 text-center space-y-6">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-pulse">
                <Ghost className="w-16 h-16 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            </div>
            <div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 drop-shadow-sm mb-2">
                    被遺忘的編年史
                </h1>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto" />
            </div>
            <p className="text-slate-400 text-xl font-light tracking-wide">無限傳奇：專屬於你的奇幻冒險篇章</p>
        </div>

        <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl transition-all hover:border-amber-500/30">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                Google Gemini API Key
            </label>
            <p className="text-slate-600 text-xs mb-3 ml-1">
                免費取得：
                <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-500 underline ml-1"
                >
                    aistudio.google.com/apikey ↗
                </a>
            </p>
            <div className="flex gap-2 mb-4">
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 bg-slate-950/50 border border-slate-700 text-amber-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="貼上您的 API Key..."
                />
            </div>
            {!apiKey && (
                <div className="text-xs text-amber-600/80 bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mb-4">
                    💡 API Key 會安全儲存在您的瀏覽器中，不會傳送到任何伺服器。
                </div>
            )}
            <button
                onClick={() => apiKey && setView('modules')}
                disabled={!apiKey}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-900/50 hover:-translate-y-0.5"
            >
                <span className="flex items-center justify-center gap-2">
                    進入領域 <ChevronRight size={18} />
                </span>
            </button>

            <button
                onClick={loadGame}
                className="w-full mt-3 bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-amber-500 font-medium py-3 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            >
                讀取進度
            </button>
        </div>
    </div>
);

export default SetupView;
