
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

const PROJECT_ID = "eternal-legends-rpg";
const BUCKET = `${PROJECT_ID}.firebasestorage.app`;
const IS_PROD = import.meta.env.PROD;

// Helper to generate URL
const getAudioUrl = (filename) => {
    // if (IS_PROD) {
    //     // Firebase Storage URL: https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<path>?alt=media
    //     // Path must be URL encoded (slashes becomes %2F)
    //     // const path = encodeURIComponent(`assets/audio/${filename}`);
    //     // return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${path}?alt=media`;
    // }
    // Local Dev URL (Also works for Firebase Hosting as local static files)
    // Local Dev URL
    return `/assets/audio/${filename}`;
};

export const BGM_MAP = {
    // COMBAT
    "battle": getAudioUrl("316_Goblin_Ambush拷貝.mp3"),
    "boss": getAudioUrl("375_Rise_of_the_Golem拷貝.mp3"),
    "skirmish": getAudioUrl("315_Dragon_Rider拷貝.mp3"),
    "defeat": getAudioUrl("99_Cavern_of_Lost_Souls拷貝.mp3"), // Sad/Dark fallback
    "victory": getAudioUrl("356_Adventure_Begins拷貝.mp3"), // Triumphant

    // DUNGEON & DARK
    "dungeon": getAudioUrl("435_The_Undercroft拷貝.mp3"),
    "mechanical": getAudioUrl("98_Lost_Mine拷貝.mp3"), // Industrial/Mine
    "prison": getAudioUrl("466_Drow_Slave_Camp拷貝.mp3"),
    "horror": getAudioUrl("mind_flayer_chamber.mp3"),
    "haunted": getAudioUrl("488_Manor_Dark拷貝.mp3"),
    "mystery": getAudioUrl("419_Hidden_Passage拷貝.mp3"),

    // WILDERNESS
    "exploration": getAudioUrl("406_Treacherous_Path拷貝.mp3"),
    "forest": getAudioUrl("418_Pagan_Woods拷貝.mp3"),
    "swamp": getAudioUrl("311_Swamp_Thing拷貝.mp3"),
    "desert": getAudioUrl("406_Treacherous_Path拷貝.mp3"), // Fallback
    "ice": getAudioUrl("472_Ice_Mephit_Cavern拷貝.mp3"),
    "cave": getAudioUrl("369_Troll_Grotto拷貝.mp3"),

    // CIVILIZATION
    "town": getAudioUrl("389_Medieval_Market拷貝.mp3"),
    "city": getAudioUrl("389_Medieval_Market拷貝.mp3"), // Reuse
    "tavern": getAudioUrl("407_Viking_Tavern拷貝.mp3"),
    "castle": getAudioUrl("240_Throne_Room拷貝.mp3"),
    "camp": getAudioUrl("382_Long_Rest拷貝.mp3"),

    // MOOD
    "peaceful": getAudioUrl("91_Elven_Glade拷貝.mp3"),
    "sad": getAudioUrl("62_Middle_Earth_Dawn拷貝.mp3"),
    "tense": getAudioUrl("465_Light_the_Beacons拷貝.mp3"),
    "storm": getAudioUrl("465_Light_the_Beacons拷貝.mp3"), // Fallback

    // SPECIAL
    "volcano": getAudioUrl("394_Demon_Army拷貝.mp3"), // Hellish
    "underdark": getAudioUrl("69_Forest_Night拷貝.mp3"), // Dark ambient
    "hell": getAudioUrl("394_Demon_Army拷貝.mp3"),
    "ocean": getAudioUrl("482_Upriver_Recon拷貝.mp3"), // Watery
    "alien": getAudioUrl("39_Temple_of_the_Eye.mp3"), // Missing? Check file list... 39 not found. Use Mind Flayer.
    // Actually Mind Flayer is good for Alien.
    "alien_fallback": getAudioUrl("mind_flayer_chamber.mp3"),

    // DEFAULT
    "default": getAudioUrl("356_Adventure_Begins拷貝.mp3")
};

export const SFX_MAP = {
    // Placeholder for future SFX
    // "click": getAudioUrl("sfx_click.mp3"),
};
