import { CharacterAgent } from '../libs/CharacterAgent';

export const useSaveSystem = ({
    roster,
    setRoster,
    logs,
    setLogs,
    gameState,
    setGameState,
    customModules,
    setCustomModules,
    relationships,
    setRelationships,
    questJournal,
    setQuestJournal,
    party,
    setParty,
    currentAct,
    setCurrentAct,
    selectedModule,
    setSelectedModule,
    gameOptions,
    setGameOptions,
    level,
    setLevel,
    sceneImage,
    setSceneImage,
    currentLocation,
    setCurrentLocation,
    scenarioRoster,
    setScenarioRoster,
    questLog,
    setQuestLog,
    unresolvedThreads,
    setUnresolvedThreads,
    activeForeshadowing,
    setActiveForeshadowing,
    worldSignals,
    setWorldSignals,
    npcRegistry,
    setNpcRegistry,
    showToast,
    memoryService
}) => {

    const checkMigration = () => {
        // ... (Migration logic if any)
        console.log("Migration check skipped for now per App.jsx logic.");
    };

    // Load Game Logic
    const handleLoad = (slotId) => {
        try {
            const key = `dnd_save_slot_${slotId}`;
            const savedData = localStorage.getItem(key);

            if (!savedData) {
                showToast(`Slot ${slotId} is empty!`, 'error');
                return false;
            }

            const saveData = JSON.parse(savedData);

            // Restore State
            if (saveData.roster) {
                // Re-hydrate Agents
                const hydratedRoster = saveData.roster.map(data => {
                    // Try to finding matching preset to restore Prototype methods if possible or just use data
                    //Ideally we just create new CharacterAgent(data)
                    return new CharacterAgent(data);
                });
                setRoster(hydratedRoster);
            }

            if (saveData.logs) setLogs(saveData.logs);
            if (saveData.gameState) setGameState(saveData.gameState);
            if (saveData.customModules) setCustomModules(saveData.customModules);
            if (saveData.relationships) setRelationships(saveData.relationships);
            if (saveData.questJournal) setQuestJournal(saveData.questJournal);
            if (saveData.party) setParty(saveData.party);
            if (saveData.currentAct !== undefined) setCurrentAct(saveData.currentAct);
            if (saveData.selectedModule) setSelectedModule(saveData.selectedModule);
            if (saveData.gameOptions) setGameOptions(saveData.gameOptions);
            if (saveData.level !== undefined) setLevel(saveData.level);
            if (saveData.sceneImage) setSceneImage(saveData.sceneImage);

            // World / plot continuity state
            if (saveData.currentLocation && setCurrentLocation) setCurrentLocation(saveData.currentLocation);
            if (saveData.scenarioRoster && setScenarioRoster) setScenarioRoster(saveData.scenarioRoster);
            if (saveData.questLog && setQuestLog) setQuestLog(saveData.questLog);
            if (saveData.unresolvedThreads && setUnresolvedThreads) setUnresolvedThreads(saveData.unresolvedThreads);
            if (saveData.activeForeshadowing && setActiveForeshadowing) setActiveForeshadowing(saveData.activeForeshadowing);
            if (saveData.worldSignals && setWorldSignals) setWorldSignals(saveData.worldSignals);
            if (saveData.npcRegistry && setNpcRegistry) setNpcRegistry(saveData.npcRegistry);

            // Restore Memory Service (AI story memory: summary + key events)
            if (saveData.memoryState && memoryService?.current?.restore) {
                memoryService.current.restore(saveData.memoryState);
            }

            showToast(`Game Loaded from Slot ${slotId}`, 'success');
            return true;
        } catch (e) {
            console.error("Load Failed:", e);
            showToast("Failed to load game.", 'error');
            return false;
        }
    };

    // Save Game Logic
    const handleSave = (slotId) => {
        try {
            const key = `dnd_save_slot_${slotId}`;
            const saveData = {
                timestamp: Date.now(),
                roster: roster, // CharacterAgents serialize themselves usually
                logs: logs,
                gameState: gameState,
                customModules: customModules,
                relationships: relationships,
                questJournal: questJournal,
                party: party,
                currentAct: currentAct,
                selectedModule: selectedModule,
                gameOptions: gameOptions,
                level: level,
                sceneImage: sceneImage,
                currentLocation: currentLocation,
                scenarioRoster: scenarioRoster,
                questLog: questLog,
                unresolvedThreads: unresolvedThreads,
                activeForeshadowing: activeForeshadowing,
                worldSignals: worldSignals,
                npcRegistry: npcRegistry,
                memoryState: memoryService?.current?.export ? memoryService.current.export() : null,
            };

            try {
                localStorage.setItem(key, JSON.stringify(saveData));
            } catch (quotaError) {
                // localStorage quota (~5MB) exceeded — base64 scene images are the usual
                // culprit. Retry once without image payloads rather than losing the save.
                console.warn("Save exceeded storage quota, retrying without images:", quotaError);
                const slimData = {
                    ...saveData,
                    sceneImage: null,
                    logs: (saveData.logs || []).filter(l => !(l.type === 'image' && typeof l.content === 'string' && l.content.startsWith('data:'))),
                };
                localStorage.setItem(key, JSON.stringify(slimData));
                showToast(`存檔空間不足，已略過場景圖片後完成儲存 (Slot ${slotId})`, 'warning');
                return true;
            }
            showToast(`Game Saved to Slot ${slotId}`, 'success');
            return true;
        } catch (e) {
            console.error("Save Failed:", e);
            showToast("Failed to save game.", 'error');
            return false;
        }
    };

    return {
        checkMigration,
        handleSave,
        handleLoad
    };
};
