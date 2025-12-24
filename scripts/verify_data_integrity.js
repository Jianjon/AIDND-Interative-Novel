
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock browser globals
global.window = {};
global.localStorage = { getItem: () => null, setItem: () => null };

// Helper to load ES modules that have non-JS imports (like images)
async function loadWithMocks(originalPath) {
    if (!fs.existsSync(originalPath)) {
        throw new Error(`File not found: ${originalPath}`);
    }

    let content = fs.readFileSync(originalPath, 'utf8');

    // 1. Replace image imports with dummy strings
    content = content.replace(
        /import\s+(\w+)\s+from\s+['"]([^'"]+\.(jpg|jpeg|png|webp|gif|svg))['"];?/gi,
        'const $1 = "MOCK_IMAGE_PATH";'
    );

    // 2. Also handle side-effect imports if any: import './styles.css';
    content = content.replace(
        /import\s+['"]([^'"]+\.(css|scss|less))['"];?/gi,
        '// Mocked CSS import'
    );

    // Write to a temp file in the SAME directory to preserve relative import paths
    const dir = path.dirname(originalPath);
    const tempFileName = `temp_${Date.now()}_${path.basename(originalPath)}`;
    const tempFilePath = path.join(dir, tempFileName);

    fs.writeFileSync(tempFilePath, content, 'utf8');

    try {
        const module = await import(tempFilePath);
        return { module, tempFilePath };
    } catch (err) {
        console.error(`Error loading mocked file ${tempFileName}:`, err);
        try { fs.unlinkSync(tempFilePath); } catch (e) { }
        throw err;
    }
}

async function runVerification() {
    console.log("🔍 Starting Data Integrity Check (v2)...");
    let errorCount = 0;
    let tempFiles = [];

    // 1. Verify Preset Characters
    try {
        const charPath = path.join(__dirname, '../src/data/preset_characters.js');
        const { module: charMod, tempFilePath } = await loadWithMocks(charPath);
        tempFiles.push(tempFilePath);

        const characters = charMod.default;

        console.log(`\nChecking ${characters.length} characters...`);
        const seenIds = new Set();

        characters.forEach((char, index) => {
            // Check ID Uniqueness
            if (!char.id) {
                console.error(`❌ Character at index ${index} missing 'id'. Name: ${char.name}`);
                errorCount++;
            } else if (seenIds.has(char.id)) {
                console.error(`❌ Duplicate Character ID found: '${char.id}' (Name: ${char.name})`);
                errorCount++;
            } else {
                seenIds.add(char.id);
            }

            // Check Essential Fields
            // Changed 'stats' to 'baseStats' based on schema observation
            const requiredfFields = ['name', 'class', 'baseStats', 'personality'];
            requiredfFields.forEach(field => {
                if (!char[field]) {
                    console.error(`❌ Character '${char.name}' (${char.id}) missing required field: '${field}'`);
                    errorCount++;
                }
            });

            // Warn if image is missing
            if (!char.avatar && !char.image) {
                console.warn(`⚠️ Character '${char.name}' has no avatar or image defined.`);
            }
        });

    } catch (err) {
        console.error("❌ Failed to verify preset_characters.js:", err.message);
        errorCount++;
    }

    // 2. Verify Modules
    try {
        const modDataPath = path.join(__dirname, '../src/data/modules_data.js');
        const { ALL_MODULES } = await import(modDataPath);

        const modules = Object.values(ALL_MODULES);
        console.log(`\nChecking ${modules.length} modules...`);

        modules.forEach(module => {
            if (!module.id) {
                console.error(`❌ Module '${module.title}' missing 'id'`);
                errorCount++;
            }
            if (!module.acts || !Array.isArray(module.acts)) {
                console.error(`❌ Module '${module.id}' missing 'acts' array`);
                errorCount++;
            } else {
                module.acts.forEach(act => {
                    if (!act.act || !act.title) {
                        console.error(`❌ Module '${module.id}' has malformed act structure.`);
                        errorCount++;
                    }
                    if (act.strategic_nodes && !Array.isArray(act.strategic_nodes)) {
                        console.error(`❌ Module '${module.id}' Act ${act.act}: strategic_nodes must be an array.`);
                        errorCount++;
                    }
                });
            }
        });

    } catch (err) {
        console.error("❌ Failed to load modules_data.js:", err.message);
        errorCount++;
    }

    // Cleanup Loop
    tempFiles.forEach(f => {
        try { fs.unlinkSync(f); } catch (e) { }
    });

    // Summary
    console.log(`\n----------------------------------------`);
    if (errorCount === 0) {
        console.log("✅ Data Integrity Check PASSED. No critical errors found.");
    } else {
        console.error(`🛑 Data Integrity Check FAILED with ${errorCount} errors.`);
        process.exit(1);
    }
}

runVerification();
