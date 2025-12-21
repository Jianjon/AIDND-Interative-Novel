import React, { useMemo } from 'react';
import { Sword, Shield, Zap, Skull, Crown, Ghost, User, Book } from 'lucide-react';

export default function ArchiveReader({ logs, party = [], fontSize = 'text-base', theme = 'sepia' }) {

    const THEMES = {
        default: 'bg-slate-900/50 text-slate-200 border-slate-700',
        sepia: 'bg-[#f4ecd8] text-[#433422] border-amber-900/20',
        midnight: 'bg-slate-950 text-blue-200 border-blue-900/30'
    };

    const currentTheme = THEMES[theme] || THEMES.default;

    const sections = useMemo(() => {
        if (!logs || !Array.isArray(logs)) return [];

        return logs.map((log) => {
            // Very similar cleaning logic to SequentialLogRenderer but optimized for static display
            const content = typeof log.content === 'string' ? log.content : '';
            if (!content.trim()) return null;

            // Split into blocks by speaker
            const blocks = content.split(/(?=###)/g).map(block => {
                if (!block.trim()) return null;
                const lines = block.trim().split('\n');
                const isHeader = lines[0].startsWith('###');
                const headerText = isHeader ? lines[0].replace(/###/g, '').trim() : "劇情情境";
                const bodyLines = isHeader ? lines.slice(1) : lines;

                // Find Actor
                const actor = party.find(p => p.name && (headerText.includes(p.name) || p.name.includes(headerText)));

                return {
                    actor,
                    headerText,
                    body: bodyLines.filter(l => {
                        const t = l.trim();
                        return t && !t.includes('[[BGM:') && !t.match(/^\*\*選擇[一二三]/);
                    })
                };
            }).filter(Boolean);

            return { id: log.id, blocks };
        }).filter(Boolean);
    }, [logs, party]);

    return (
        <div className={`p-6 md:p-12 space-y-12 max-w-4xl mx-auto font-serif leading-relaxed ${fontSize}`}>
            {sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${sIdx * 100}ms` }}>
                    {section.blocks.map((block, bIdx) => (
                        <div key={bIdx} className={`relative pl-8 border-l-2 ${block.actor ? 'border-amber-500/40' : 'border-slate-500/20'}`}>
                            {block.headerText && (
                                <div className="flex items-center gap-3 mb-2 opacity-60">
                                    {block.actor?.avatar && <img src={block.actor.avatar} className="w-5 h-5 rounded-full" alt="" />}
                                    <span className="text-xs font-bold uppercase tracking-widest">{block.headerText}</span>
                                </div>
                            )}
                            <div className="space-y-4">
                                {block.body.map((line, lIdx) => {
                                    // Clean dice tags into text for reading
                                    const cleanLine = line
                                        .replace(/\[\[DICE:([^:]+):([^:]+):(\d+)\]\]/g, ' ($1 進行了 $2 判定)')
                                        .replace(/\[\[成功[:：]([^\]]+)\]\]/g, ' - $1')
                                        .replace(/\[\[失敗[:：]([^\]]+)\]\]/g, ' - $1')
                                        .replace(/D20\((\d+)\)\s*(?:[+-]\s*(\d+))?\s*=\s*(\d+)\s*\|\s*(?:DC|AC)\s*(\d+)/gi, (m, b, mo, t, d) => `(擲骰: ${t} / 難度: ${d})`);

                                    return (
                                        <p key={lIdx} className="indent-4 md:indent-8 first:indent-0">
                                            {cleanLine}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {/* Chapter Separator? */}
                    {sIdx < sections.length - 1 && (
                        <div className="flex justify-center py-4">
                            <div className="flex gap-2 text-slate-400 opacity-20">
                                <Book size={16} />
                                <Book size={16} />
                                <Book size={16} />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {sections.length === 0 && (
                <div className="text-center py-32 text-slate-500 italic">
                    <p>這本史詩尚未被撰寫...</p>
                </div>
            )}
        </div>
    );
}
