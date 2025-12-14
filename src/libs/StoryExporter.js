/**
 * StoryExporter.js
 * Utility to convert game logs into a readable Markdown novel format.
 */

export class StoryExporter {
    static generateHTML(logs, metadata = {}) {
        const { title = "Adventure Log", date = new Date().toLocaleString(), partyInfo = "" } = metadata;

        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                @media print {
                    @page { margin: 2cm; }
                    body { font-size: 12pt; -webkit-print-color-adjust: exact; }
                    button { display: none; }
                }
                body {
                    font-family: "Georgia", "Times New Roman", serif;
                    line-height: 1.8;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px;
                    color: #1a1a1a;
                    background: #fff;
                }
                h1 { text-align: center; color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 20px; font-weight: normal; margin-bottom: 10px; }
                .meta { text-align: center; color: #666; font-style: italic; margin-bottom: 40px; font-size: 0.9em; }
                .narrative { margin-bottom: 24px; text-align: justify; }
                .narrative p { margin-bottom: 12px; }
                .action { 
                    margin: 20px 40px; 
                    padding: 15px 20px; 
                    background-color: #f8f9fa; 
                    border-left: 4px solid #cbd5e1;
                    font-family: ui-sans-serif, system-ui, sans-serif;
                    font-size: 0.9em;
                    color: #475569;
                    font-style: italic;
                }
                .dice { font-weight: bold; color: #d97706; }
                .chapter { 
                    font-size: 1.4em; 
                    font-weight: bold; 
                    margin-top: 40px; 
                    margin-bottom: 20px; 
                    color: #8e44ad; 
                    border-bottom: 1px dashed #e5e7eb;
                    padding-bottom: 10px;
                }
                strong { font-weight: 600; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="meta">
                <p>Date: ${date}</p>
                <p>Party: ${partyInfo}</p>
            </div>
            <div class="content">
        `;

        logs.forEach(log => {
            if (log.type === 'narrative' || log.type === 'trpg_narrative') {
                let text = typeof log.content === 'object' ? (log.content.public || JSON.stringify(log.content)) : log.content;

                // Format Headers
                // Replace ### Header with <div class="chapter">Header</div>
                text = text.replace(/^###\s*(.+)$/gm, '<div class="chapter">$1</div>');

                // Format Dice
                text = text.replace(/\[🎲(.*?)\]/g, '<span class="dice">[🎲$1]</span>');

                // Format Paragraphs (simple newline to br or p)
                // Split by double newline to form paragraphs
                const paragraphs = text.split(/\n\n+/);
                const formattedText = paragraphs.map(p => {
                    // Start of chapter div is self-contained.
                    if (p.includes('<div class="chapter">')) return p;
                    return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
                }).join('');

                html += `<div class="narrative">${formattedText}</div>`;

            } else if (log.type === 'turn_batch' || log.type === 'action') {
                let text = typeof log.content === 'object' ? JSON.stringify(log.content) : log.content;
                html += `<div class="action"><strong>Action:</strong> ${text}</div>`;
            }
        });

        html += `
            </div>
            <script>
                // Auto print when loaded
                window.onload = () => { 
                    setTimeout(() => {
                        window.print();
                    }, 500); 
                };
            </script>
        </body>
        </html>
        `;
        return html;
    }

    static print(content) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(content);
            printWindow.document.close();
        } else {
            alert("Pop-up blocked! Please allow pop-ups to print.");
        }
    }

    static generateMarkdown(logs, metadata = {}) {
        const { title = "AI D&D Adventure", date = new Date().toLocaleString(), partyInfo = "" } = metadata;

        let md = `# ${title}\n\n`;
        md += `**Date:** ${date}\n`;
        md += `**Party:** ${partyInfo}\n\n`;
        md += `---\n\n`;

        logs.forEach((log, index) => {
            // Handle different log types
            if (log.type === 'narrative' || log.type === 'trpg_narrative') {
                // AI Story Content
                let text = typeof log.content === 'object' ? (log.content.public || JSON.stringify(log.content)) : log.content;

                // Remove internal AI artifacts if any (e.g., regex leftovers)
                text = text.replace(/^###\s*/gm, '## '); // Convert AI headers to cleaner MD headers
                text = text.replace(/\[🎲.*?\]/g, (match) => `\n> *${match}*\n`); // Format dice checks as blockquotes

                md += `${text}\n\n`;

            } else if (log.type === 'turn_batch' || log.type === 'action') {
                // Player Action
                let text = typeof log.content === 'object' ? JSON.stringify(log.content) : log.content;

                // Format: Bold the action, maybe list item
                md += `> **Action:** ${text}\n\n`;

            } else if (log.type === 'info') {
                // System Info - maybe skip or use subtle formatting
                // md += `*System: ${log.content}*\n\n`;
            }
        });

        md += `\n---\n*Exported via AI D&D Interactive Novel Engine*`;
        return md;
    }

    static download(content, filename = "adventure_log.md") {
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
