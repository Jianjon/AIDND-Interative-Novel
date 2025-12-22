
/**
 * Audio Assets Configuration
 * 
 * Maps logical keys to audio URLs.
 * Automatically switches between local paths (Dev) and Firebase Storage (Prod).
 * 
 * [INSTRUCTIONS FOR DEPLOYMENT]
 * 1. Upload the contents of `public/assets/audio/` to your Firebase Storage bucket.
 * 2. Ensure they are in a folder named `assets/audio/`.
 * 3. Make sure the files are public/readable.
 */

const PROJECT_ID = "aidnd-interactive-novel";
const BUCKET = `${PROJECT_ID}.firebasestorage.app`;
const IS_PROD = import.meta.env.PROD;

// Helper to generate URL
const getAudioUrl = (filename) => {
    // FORCE LOCAL: The user prefers bundling audio in the Docker image logic
    // rather than dealing with external Firebase Storage uploads right now.
    // This ensures audio works immediately upon deployment.
    // if (IS_PROD) { ... } // Disabled for Docker bundling

    // Local Dev / Docker Container URL
    // Nginx serves /assets/ from the container's static files.
    return `/assets/audio/${filename}`;
};

export const BGM_MAP = {
    // COMBAT
    "battle": getAudioUrl("316_Goblin_Ambush.mp3"),
    "boss": getAudioUrl("375_Rise_of_the_Golem.mp3"),
    "skirmish": getAudioUrl("315_Dragon_Rider.mp3"),
    "defeat": getAudioUrl("99_Cavern_of_Lost_Souls.mp3"), // Sad/Dark fallback
    "victory": getAudioUrl("356_Adventure_Begins.mp3"), // Triumphant

    // DUNGEON & DARK
    "dungeon": getAudioUrl("435_The_Undercroft.mp3"),
    "mechanical": getAudioUrl("98_Lost_Mine.mp3"), // Industrial/Mine
    "prison": getAudioUrl("466_Drow_Slave_Camp.mp3"),
    "horror": getAudioUrl("mind_flayer_chamber.mp3"),
    "haunted": getAudioUrl("488_Manor_Dark.mp3"),
    "mystery": getAudioUrl("419_Hidden_Passage.mp3"),

    // WILDERNESS
    "exploration": getAudioUrl("406_Treacherous_Path.mp3"),
    "forest": getAudioUrl("418_Pagan_Woods.mp3"),
    "swamp": getAudioUrl("311_Swamp_Thing.mp3"),
    "desert": getAudioUrl("406_Treacherous_Path.mp3"), // Fallback
    "ice": getAudioUrl("472_Ice_Mephit_Cavern.mp3"),
    "cave": getAudioUrl("369_Troll_Grotto.mp3"),

    // CIVILIZATION
    "town": getAudioUrl("389_Medieval_Market.mp3"),
    "city": getAudioUrl("389_Medieval_Market.mp3"), // Reuse
    "tavern": getAudioUrl("407_Viking_Tavern.mp3"),
    "castle": getAudioUrl("240_Throne_Room.mp3"),
    "camp": getAudioUrl("382_Long_Rest.mp3"),

    // MOOD
    "peaceful": getAudioUrl("91_Elven_Glade.mp3"),
    "sad": getAudioUrl("62_Middle_Earth_Dawn.mp3"),
    "tense": getAudioUrl("465_Light_the_Beacons.mp3"),
    "storm": getAudioUrl("465_Light_the_Beacons.mp3"), // Fallback

    // SPECIAL
    "volcano": getAudioUrl("394_Demon_Army.mp3"), // Hellish
    "underdark": getAudioUrl("69_Forest_Night.mp3"), // Dark ambient
    "hell": getAudioUrl("394_Demon_Army.mp3"),
    "ocean": getAudioUrl("482_Upriver_Recon.mp3"), // Watery
    "alien": getAudioUrl("39_Temple_of_the_Eye.mp3"), // Keep checking if this exists, but removing suffix for consistency
    "alien_fallback": getAudioUrl("mind_flayer_chamber.mp3"),

    // DEFAULT
    "default": getAudioUrl("356_Adventure_Begins.mp3")
};

export const SFX_MAP = {
    // Placeholder for future SFX
    // "click": getAudioUrl("sfx_click.mp3"),
};
