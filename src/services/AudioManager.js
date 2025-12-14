import { BGM_MAP, SFX_MAP } from "../data/audio_assets";

/**
 * AudioManager
 * 
 * Manages background music playback with crossfading and persistent volume.
 */
export class AudioManager {
    constructor() {
        this.currentBgm = null; // HTMLAudioElement
        this.currentKey = null;

        // Volumes (0.0 - 1.0)
        this.masterVolume = 1.0;
        this.bgmVolume = 0.5;
        this.sfxVolume = 1.0;

        this.isMuted = false;

        // Restore volume from localStorage if available
        try {
            const savedVol = localStorage.getItem('dnd_audio_settings');
            if (savedVol) {
                const parsed = JSON.parse(savedVol);
                if (parsed.master !== undefined) this.masterVolume = parsed.master;
                if (parsed.bgm !== undefined) this.bgmVolume = parsed.bgm;
                if (parsed.sfx !== undefined) this.sfxVolume = parsed.sfx;
                if (parsed.muted !== undefined) this.isMuted = parsed.muted;
            } else {
                // Fallback to legacy single volume if needed
                const legacyVol = localStorage.getItem('dnd_bgm_volume');
                if (legacyVol !== null) this.bgmVolume = parseFloat(legacyVol);
            }
        } catch (e) {
            console.warn("AudioManager: Failed to restore settings", e);
        }
    }

    /**
     * Plays a sound effect (One-shot)
     */
    playSound(key) {
        if (this.isMuted || !key) return;

        const url = SFX_MAP[key];
        if (!url) return;

        const sfx = new Audio(url);
        // Effective volume = Master * SFX
        sfx.volume = Math.max(0, Math.min(1, this.masterVolume * this.sfxVolume));
        sfx.play().catch(e => console.warn("SFX Play Error:", e));
    }

    /**
     * Plays the BGM associated with the given key.
     * @param {string} key - Key from BGM_MAP (e.g., 'battle', 'tavern')
     */
    playBgm(key) {
        if (!key) return;

        // Resolve URL (fallback to default if key not found)
        const url = BGM_MAP[key] || BGM_MAP["default"];

        // If same track is already playing, do nothing
        if (this.currentKey === key && this.currentBgm && !this.currentBgm.paused) {
            return;
        }

        console.log(`[Audio] Switch BGM: ${key}`);

        // Fade out old track
        this.stopBgm();

        // Start new track
        this.currentKey = key;

        // Encode URL to handle spaces/special characters safely
        const safeUrl = encodeURI(url).replace(/#/g, '%23');

        this.currentBgm = new Audio(safeUrl);
        this.currentBgm.loop = true;
        this.currentBgm.volume = 0; // Start at 0 for fade-in

        // Advanced Error Handling
        this.currentBgm.play().catch(e => {
            console.error(`[Audio] Play Error for ${key}:`, e);
            console.error(`[Audio] URL was: ${safeUrl}`);
            // Check if it's a format issue
            if (e.name === 'NotSupportedError') {
                console.warn("Format not supported. Ensure using standard MP3/WAV.");
            }
        });

        // Apply global mute/volume settings
        this._applyVolume();

        // Fade In
        this._fadeIn(this.currentBgm);
    }

    /**
     * Stops the current BGM with a fade out.
     */
    stopBgm() {
        if (this.currentBgm) {
            const oldBgm = this.currentBgm;
            this.currentBgm = null;
            this.currentKey = null;
            this._fadeOut(oldBgm);
        }
    }

    /**
     * Update Volume Settings
     * @param {Object} settings { master, bgm, sfx, muted }
     */
    setSettings({ master, bgm, sfx, muted }) {
        if (master !== undefined) this.masterVolume = Math.max(0, Math.min(1, master));
        if (bgm !== undefined) this.bgmVolume = Math.max(0, Math.min(1, bgm));
        if (sfx !== undefined) this.sfxVolume = Math.max(0, Math.min(1, sfx));
        if (muted !== undefined) this.isMuted = !!muted;

        this._saveSettings();
        this._applyVolume();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this._saveSettings();
        this._applyVolume();
        return this.isMuted;
    }

    _saveSettings() {
        localStorage.setItem('dnd_audio_settings', JSON.stringify({
            master: this.masterVolume,
            bgm: this.bgmVolume,
            sfx: this.sfxVolume,
            muted: this.isMuted
        }));
    }

    _applyVolume() {
        if (!this.currentBgm) return;
        // Target volume is 0 if muted, else Master * BGM
        const effectiveVol = this.isMuted ? 0 : (this.masterVolume * this.bgmVolume);
        this.currentBgm.volume = Math.max(0, Math.min(1, effectiveVol));
    }

    _fadeIn(audio) {
        if (!audio) return;
        let vol = 0;
        const target = this.isMuted ? 0 : (this.masterVolume * this.bgmVolume);
        if (target <= 0.01) return; // No need to fade in silence

        audio.volume = 0;
        const interval = setInterval(() => {
            if (!audio || audio.paused) { // Audio deleted or stopped
                clearInterval(interval);
                return;
            }
            vol += 0.05;
            if (vol >= target) {
                vol = target;
                clearInterval(interval);
            }
            audio.volume = Math.min(1, vol);
        }, 100);
    }

    _fadeOut(audio) {
        if (!audio) return;
        let vol = audio.volume;
        const interval = setInterval(() => {
            vol -= 0.1;
            if (vol <= 0) {
                vol = 0;
                audio.pause();
                audio.remove(); // Cleanup
                clearInterval(interval);
            } else {
                audio.volume = vol;
            }
        }, 100);
    }
}
