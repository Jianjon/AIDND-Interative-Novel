import DualDiceRoll from './DualDiceRoll';

const TextWithDiceRenderer = ({ text }) => {
    if (typeof text !== 'string') return null;

    // 1. Header Detection (###)
    if (text.startsWith('###')) {
        return (
            <div className="my-6 pl-4 border-l-4 border-amber-500 bg-gradient-to-r from-amber-900/40 to-transparent py-3 rounded-r-lg">
                <h3 className="text-amber-100 font-bold text-lg tracking-wide uppercase font-serif drop-shadow-md">
                    {text.replace(/#/g, '').trim()}
                </h3>
            </div>
        );
    }

    // 1.5 Custom Bracket Headers 【...】
    if (text.startsWith('【') && text.includes('】')) {
        const content = text.replace(/[【】]/g, '').trim();
        // Default Style
        let borderColor = "border-slate-500";
        let textColor = "text-slate-200";
        let bgColor = "bg-slate-800/30";
        let icon = null;

        if (content.includes("行動") || content.includes("Action")) {
            borderColor = "border-amber-500";
            textColor = "text-amber-100";
            bgColor = "bg-amber-950/30";
            icon = "⚔️";
        } else if (content.includes("檢定") || content.includes("Check")) {
            borderColor = "border-cyan-500";
            textColor = "text-cyan-100";
            bgColor = "bg-cyan-950/30";
            icon = "🎲";
        } else if (content.includes("結果") || content.includes("Result")) {
            borderColor = "border-emerald-500";
            textColor = "text-emerald-100";
            bgColor = "bg-emerald-950/30";
            icon = "✨";
        } else if (content.includes("威脅") || content.includes("Threat") || content.includes("警告")) {
            borderColor = "border-rose-500";
            textColor = "text-rose-100";
            bgColor = "bg-rose-950/30 animate-pulse";
            icon = "⚠️";
        }

        return (
            <div className={`my-4 pl-3 pr-4 py-2 border-l-4 ${borderColor} ${bgColor} rounded-r flex items-center gap-2 font-bold font-serif tracking-wide shadow-sm`}>
                {icon && <span className="opacity-80">{icon}</span>}
                <span className={textColor}>{content}</span>
            </div>
        );
    }

    // 2. Dice Check Detection (Full Line)
    // Supports: [🎲 Check: D20(x) + y = z | DC n -> Result] AND Unbracketed: -> Check: ...
    const isBracketed = text.trim().startsWith('[🎲') && text.trim().endsWith(']');
    const isLegacyFormat = text.trim().startsWith('->') && text.includes('D20') && (text.includes('DC') || text.includes('AC'));

    if (isBracketed || isLegacyFormat) {
        let rawContent = text;
        if (isBracketed) rawContent = text.replace(/[[\]]/g, '').replace('🎲', '').trim();
        if (isLegacyFormat) rawContent = text.replace(/^->/, '').trim();

        // Parse Components: "Stealth: D20(5) + 2 = 7 | DC 13"
        const parseRegex = /([^:]+):\s*D20\((\d+)\)\s*(?:[+-]\s*(\d+))?\s*=\s*(\d+)\s*\|\s*(?:DC|AC)\s*(\d+)/i;
        const detailMatch = rawContent.match(parseRegex);

        // Fallback for simple "Total vs DC/AC" format
        const simpleRegex = /(\d+)\s*(?:vs|VS|對抗|\|)\s*(?:DC|AC|難度|防禦)[:\s]*(\d+)/i;
        const simpleMatch = rawContent.match(simpleRegex);

        // Determine Success/Failure from text or math
        const resultMatch = rawContent.match(/(SUCCESS|FAILURE|PASS|FAIL|成功|失敗)$/i);
        const resultStr = resultMatch ? resultMatch[1] : null;
        let isSuccess = false;

        if (resultStr) {
            isSuccess = ["SUCCESS", "PASS", "成功"].includes(resultStr.toUpperCase());
        } else if (simpleMatch) {
            isSuccess = parseInt(simpleMatch[1]) >= parseInt(simpleMatch[2]);
        }

        // Prepare Props for DualDiceRoll
        let playerRoll = { base: 10, mod: 0, total: 10 };
        let target = { dc: 10, label: 'DC' };
        let label = "Check";

        if (detailMatch) {
            label = detailMatch[1].trim();
            playerRoll = {
                base: parseInt(detailMatch[2]),
                mod: parseInt(detailMatch[3] || 0),
                total: parseInt(detailMatch[4])
            };
            target.dc = parseInt(detailMatch[5]);
        } else if (simpleMatch) {
            playerRoll.total = parseInt(simpleMatch[1]);
            target.dc = parseInt(simpleMatch[2]);
            if (rawContent.includes('AC')) target.label = 'AC';
        }

        return (
            <div className="my-2">
                <DualDiceRoll
                    playerRoll={playerRoll}
                    dmRoll={null} // We only show player roll vs static DC usually in this log
                    target={target}
                    label={label}
                    isSuccess={isSuccess}
                    show={true}
                />
            </div>
        );
    }

    // Default: Return text as string (will be wrapped by parent p or div)
    return text;
};

export default TextWithDiceRenderer;
