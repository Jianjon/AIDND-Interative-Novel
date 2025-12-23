import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
    // We can leave this empty or minimal if we're only using Functions and relies on Hosting auto-config
    // But for local dev it's good to have at least projectId
    projectId: "aidnd-interactive-novel",
    // In a real deployed scenario, the SDK automatically picks up config from hosting
    // provided we load the SDK via /__/firebase/init.js script, BUT since we bundle,
    // we might need actual config if not relying on the dynamic script.
    // For standard Vite apps, providing minimal config is often safer.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Functions and get a reference to the service
const functions = getFunctions(app, 'us-central1');

// Connect to emulator if in dev mode AND explicitly requested (optional)
// if (location.hostname === "localhost") {
//   connectFunctionsEmulator(functions, "127.0.0.1", 5001);
// }

export { functions };
