/**
 * ArchiveService.js
 * Manages the persistent storage of completed adventure stories.
 */

const ARCHIVE_KEY = 'dnd_adventure_archive';

export const ArchiveService = {
    /**
     * Get all archived adventures
     * @returns {Array} List of archived adventure objects
     */
    getArchive: () => {
        try {
            const saved = localStorage.getItem(ARCHIVE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('[ArchiveService] Failed to load archive:', e);
            return [];
        }
    },

    /**
     * Add a new adventure to the archive
     * @param {Object} adventure - The adventure data to save
     */
    addToArchive: (adventure) => {
        try {
            const archive = ArchiveService.getArchive();

            // Generate metadata if not provided
            const entry = {
                id: adventure.id || `adv_${Date.now()}`,
                title: adventure.title || '未命名的冒險',
                moduleName: adventure.moduleName || '未知模組',
                date: adventure.date || new Date().toLocaleDateString(),
                party: adventure.party || [],
                logs: adventure.logs || [],
                summary: adventure.summary || '',
                stats: adventure.stats || {},
                savedAt: new Date().toISOString()
            };

            archive.unshift(entry); // Newest first

            // Limit archive size to prevent storage issues (~50 stories)
            if (archive.length > 50) {
                archive.pop();
            }

            localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive));
            return true;
        } catch (e) {
            console.error('[ArchiveService] Failed to add to archive:', e);
            return false;
        }
    },

    /**
     * Delete an adventure by ID
     * @param {string} id - The adventure ID
     */
    deleteFromArchive: (id) => {
        try {
            const archive = ArchiveService.getArchive();
            const filtered = archive.filter(a => a.id !== id);
            localStorage.setItem(ARCHIVE_KEY, JSON.stringify(filtered));
            return true;
        } catch (e) {
            console.error('[ArchiveService] Failed to delete from archive:', e);
            return false;
        }
    },

    /**
     * Clear all archives
     */
    clearArchive: () => {
        localStorage.removeItem(ARCHIVE_KEY);
    },

    /**
     * Export archive as a JSON file
     */
    exportArchive: () => {
        const data = ArchiveService.getArchive();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `dnd_adventure_archive_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};

export default ArchiveService;
