# 多人連線功能 — 完整開發規劃書

> **給執行本計畫的 AI 模型**:這份文件由前一輪的深度程式碼審查產出,包含你需要的所有架構知識、實作規格、驗收標準與已知地雷。請完整讀完本文件再動手。
>
> - **基準 commit**: `20c6ee3` (Honor pre-game settings, fix start level, add real ending flow)
> - **開工前必做**: `git log --oneline -1` 確認基準;`npx vite build` 與 `npx eslint src` 確認起點是綠的(目前 lint 剩約 60 個無害的 unused-vars 警告,不要求歸零,但**不可新增** no-undef / rules-of-hooks 類錯誤)。
> - **工作守則**:
>   1. 單機模式必須完整保留——所有多人功能藏在「房間模式」旗標後,沒進房間時行為與現在 100% 相同。
>   2. 每完成一個 Phase 就 commit,commit message 用英文、附中文摘要。
>   3. 不要順手重構無關程式碼(App.jsx 有 3300 行,歷史包袱多,只動本計畫指定的整合點)。
>   4. 每個 Phase 結束跑「驗收檢核」章節的測試腳本(用兩個瀏覽器視窗:一般+無痕)。
>   5. 遇到與本文件描述不符的程式碼(可能有人後續改過),以現況為準並在 commit message 註明差異。

---

## 0. 目標與範圍

把現有的單機 AI D&D 互動小說改造成**支援 2-6 人的線上協作跑團**:

- 每位玩家控制隊伍中的一個角色;沒人認領的角色由 AI 代打(現有 `controlMode: 'auto'` 機制)。
- 所有人即時看到同一份敘事流。
- 回合制:全員下完指令 → 執行回合 → 廣播結果。
- **Phase 0**: 觀戰模式(別人能即時看你玩)— 驗證同步管道。
- **Phase 1**: 房主制多人(房主的瀏覽器跑 AI,用房主的 API key)— 完整多人體驗。
- **Phase 2**(選做): 伺服器權威(Cloud Function 跑 AI)— 公開營運才需要。

**不在範圍內**:語音/聊天室、配對系統、排行榜、跨房間好友。

---

## 1. 現有架構速覽(必讀,省去考古時間)

### 1.1 技術棧與檔案地圖

- React 18 + Vite,無路由(單一 `App.jsx` 用 `view` state 切畫面:`home → modules → roster → mode_select → game`)。
- **`src/App.jsx`(~3300 行)**:所有遊戲狀態與回合邏輯的家。核心是 `executeTurn()`(約 880 行起,長達 1500+ 行),依序呼叫多個 AI 代理。
- `src/views/`:`HomeView / ModuleSelectView / RosterView / ModeSelectView / GameView` — 純顯示元件,狀態全部由 App.jsx 下放 props。
- `src/agents/`:`StoryAgent`(敘事)、`GameMasterAgent`(機制結算/信號)、`CartographerAgent`(地圖/日誌/記憶摘要)、`CharacterManagerAgent`(行動選項/對話潤飾)、`EditorAgent`(一致性檢核/DM悄悄話)、`AffinityManagerAgent`(好感)。
- `src/services/AIService.js`:統一的 Gemini 呼叫層。已有 429/503/逾時重試、空回應偵測、`thinkingBudget: 0`。**user 模式**用玩家 API key 直打 AI Studio;**guest 模式**走 Cloud Function(`functions/index.js`,需匿名登入,有限流)。
- `src/services/MemoryService.js`:三層記憶(immediate/working/longTerm),**單例**,鏡射到 localStorage `dnd_memory_state`,有 `export()/restore()`。
- `src/hooks/useSaveSystem.js`:存檔/讀檔(localStorage 槽位),已包含完整世界狀態 + AI 記憶。**這份存檔資料結構就是「房間 state 文件」的現成藍圖。**
- `src/hooks/useLocalStorage.js`:functional update 已修正為以 React 最新狀態解析。
- `src/libs/CharacterAgent.js`:角色規則引擎。**注意:實例含方法,不可直接序列化**;既有模式是存 plain object、用 `new CharacterAgent(data)` 重建(見 `useSaveSystem.handleLoad` 與 App.jsx `agentRoster` useMemo)。個性欄位透過 `NARRATIVE_PASSTHROUGH_FIELDS` 保留。
- `src/firebase.js`:已初始化 app + functions + **anonymous auth**(`ensureAnonymousAuth()`)。**尚未引入 Firestore。**

### 1.2 回合資料流(多人化的核心知識)

```
玩家對每個角色下指令 → pendingActions { charId: text }
  ↓ 全員就緒(isRoundReady:pendingActions 數 == 存活隊員數,或含團隊指令)
executeTurn():
  1. isExecuting ref 上鎖(檢查後立刻同步上鎖 — 已修 TOCTOU)
  2. styleDialogue 潤飾指令(失敗自動退回原文)
  3. StoryAgent.generateNarrative(narrativeContext) → finalNarrative
  4. 解析敘事標籤:[[HP:]] [[金幣:]] [[ACT_UPDATE:]] [[NODE_COMPLETE:]] [[LOOT:]] 等
     → 更新 tempRoster / deferredStateChanges / questJournal / currentAct
  5. narrativeLog 追加進 logs(SequentialLogRenderer 開始打字動畫)
  6. GameMasterAgent.analyzeState → mechanicsData(hp_updates/loot/signals)
  7. CartographerAgent.updateJournal → 地點/任務/記憶摘要
  8. CharacterManagerAgent.generateOptions → 下一回合選項(actionCache)
  9. 所有變更打包進 pendingTurnUpdates(延遲套用)
  ↓ 敘事動畫播完(isNarrativeComplete)
useEffect [isNarrativeComplete, pendingTurnUpdates](App.jsx ~430 行):
  一次性套用 gameState / scenarioRoster / roster / actionCache,清空 pendingActions
```

**多人化的關鍵洞察**:
- `pendingActions` 天然是「一人一格」→ 各玩家寫自己角色那格。
- `controlMode: 'auto'`(`useAutoPlay.js`)→ 未認領/斷線角色自動由 AI 代打,**零成本實現斷線寬容**。
- `pendingTurnUpdates` 延遲套用機制 → 鏡射到 Firestore 的時機必須在**套用之後**(見 §5.3)。
- 終章機制:玩家選「完成冒險」→ `isEpilogueTurn` → 終章敘事 + 自動歸檔,不再產生選項。

### 1.3 已知地雷(前輪修過的 bug,多人版會再遇到)

| 地雷 | 教訓 | 多人版對策 |
|---|---|---|
| executeTurn 曾有 TOCTOU 競態(檢查與上鎖間隔著 await)導致回合跑兩次 | 鎖必須在任何 await 之前同步取得 | 跨客戶端版本改用 **Firestore transaction** 搶回合執行權(§6) |
| AI 回傳字串數字 → HP 變 NaN | 所有 AI 產出的數值都要 `Number()` + NaN guard | server phase 沿用同樣防護 |
| useLocalStorage 過期閉包 | 房間模式的狀態**繞過 localStorage**,以 Firestore 為準 | §5.2 |
| gameState 預覽 seeding 曾覆蓋 startGame 的完整狀態 | 房間模式下該 effect(App.jsx `view !== 'game'` 那個)对 guest 也要停用 | §5.4 整合點 7 |
| logs 可能含 base64 場景圖(數 MB) | Firestore 單文件上限 1MB | image 類 log **不同步**(§4.4) |
| tone 值域曾對不上(dark/humorous/pulpy/murderhobo 是 UI id) | 房間 meta 存的 gameOptions 原樣傳遞即可,alias 已在 StoryAgent/encounter_balance 處理 | — |
| MemoryService 是單例 + localStorage 鏡射 | 房間模式:host 每回合把 `export()` 寫進房間 state;guest 不使用本地記憶 | §5.3 |

---

## 2. Firebase 前置作業(需要人工在 Console 操作)

執行模型無法操作 Console,**開工前請使用者完成**:

1. **啟用 Cloud Firestore**:Firebase Console → Build → Firestore Database → 建立資料庫 → production mode → 區域建議 `asia-east1`(台灣)。
2. **啟用 Anonymous Auth**:Authentication → Sign-in method → 匿名 → 啟用。(訪客模式本來就需要,可能已完成。)
3. (Phase 2 才需要)App Check + reCAPTCHA v3 site key。
4. 部署時:`firebase deploy --only firestore:rules,hosting`(functions 有改才加 `functions`)。

程式端配置:
- `src/firebase.js` 加 `import { getFirestore } from 'firebase/firestore'; export const db = getFirestore(app);`
- `firebase.json` 加 `"firestore": { "rules": "firestore.rules", "indexes": "firestore.indexes.json" }`。

費用備忘:Firestore 免費層 50K reads / 20K writes / 天。四人一場 50 回合約消耗 <2K writes、<10K reads(含監聽),餘裕極大。**主要成本仍是 AI 生成**(房主的 key 或 Vertex 額度)。

---

## 3. Firestore 資料模型

```
codes/{roomCode}                    ← 6 碼房號查表(A-Z 去 I/O + 2-9)
  roomId: string
  createdAt: timestamp

rooms/{roomId}
  ── meta(欄位直接放在 room 文件上)──
  roomCode: string
  hostUid: string
  status: 'lobby' | 'playing' | 'ended'
  turnNo: number                    ← 目前回合序號,從 0 開始
  moduleId: string
  moduleSnapshot: object|null       ← 自訂模組才需要(官方模組用 id 查本地資料)
  gameMode: 'trpg' | 'novel'
  gameOptions: { pacing, tone }     ← 原樣存 UI id,alias 由消費端處理
  startLevel: number
  executing: null | { turnNo, byUid, startedAt: timestamp }   ← 回合執行鎖
  hostLastSeen: timestamp
  createdAt / updatedAt: timestamp

rooms/{roomId}/players/{uid}
  nickname: string
  role: 'host' | 'player' | 'spectator'
  characterId: string | null        ← 認領的角色(preset id 或自訂角色 id)
  ready: boolean                    ← lobby 用
  lastSeen: timestamp               ← 30 秒心跳;>90 秒視為離線
  joinedAt: timestamp

rooms/{roomId}/state/current        ← 單一文件,host 每回合覆寫
  gameState: object                 ← { charId: { hp, maxHp, psych, inventory, ... } }
  scenarioRoster: array             ← plain objects(敵人/NPC)
  roster: array                     ← 角色 plain sheets(getFullSheet() 產物;guest 端 new CharacterAgent() 重建)
  party: array<charId>
  currentAct: number
  currentLocation: array<string>
  worldSignals: object
  questJournal: array
  unresolvedThreads / activeForeshadowing / npcRegistry / completedNodes
  memoryState: object               ← memoryService.export()
  actionCache: object               ← 下一回合的選項(各玩家只顯示自己角色的)
  updatedAt: timestamp
  ※ 結構刻意等同 useSaveSystem 的存檔格式 — 複用 handleLoad 的還原邏輯

rooms/{roomId}/turns/{turnNo}/actions/{uid}
  charId: string                    ← 必須等於 players/{uid}.characterId(rules 強制)
  text: string
  submittedAt: timestamp

rooms/{roomId}/logs/{seq}           ← seq 用零填充字串 "000001",append-only
  type: 'trpg_narrative'|'narrative'|'turn_batch'|'dm_whisper'|'user'|'info'
  content: string|object            ← image 類型不寫入(見 §4.4)
  turnNo: number
  createdAt: timestamp

rooms/{roomId}/whispers/{autoId}    ← DM 悄悄話(私人)
  uid: string
  question / answer: string
  createdAt: timestamp
```

### 設計理由(執行模型不要改動這些決定)

- **logs 用子集合逐條寫**而非陣列:避開 1MB 文件上限與每秒 1 次的單文件寫入限制;guest 端用 `orderBy(seq)` + `onSnapshot` 增量接收。
- **state 用單一文件覆寫**:回合制下整包狀態一起變,拆太細反而有一致性問題;整包大小估 <300KB(角色表 6 人 + 記憶),安全範圍。若實測超標,把 `roster` 拆成 `state/roster` 第二個文件。
- **actions 以 uid 為文件 id**:天然防止一人重複提交,rules 可強制「只能寫自己的」。
- **不用 Realtime Database**:回合制用 Firestore onSnapshot 延遲(<1s)完全夠;在線狀態用 lastSeen 心跳。

---

## 4. Security Rules(`firestore.rules`,完整可用版)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() { return request.auth != null; }
    function isMember(roomId) {
      return exists(/databases/$(database)/documents/rooms/$(roomId)/players/$(request.auth.uid));
    }
    function isHost(roomId) {
      return get(/databases/$(database)/documents/rooms/$(roomId)).data.hostUid == request.auth.uid;
    }

    match /codes/{code} {
      allow read: if signedIn();
      allow create: if signedIn() && request.resource.data.keys().hasOnly(['roomId','createdAt']);
      allow update, delete: if false;
    }

    match /rooms/{roomId} {
      allow read: if signedIn() && isMember(roomId);
      allow create: if signedIn() && request.resource.data.hostUid == request.auth.uid;
      allow update: if signedIn() && isHost(roomId);
      allow delete: if false;

      match /players/{uid} {
        allow read: if signedIn() && isMember(roomId);
        // 加入房間:只能建立自己的文件;lobby 狀態才可加入
        allow create: if signedIn() && request.auth.uid == uid
          && get(/databases/$(database)/documents/rooms/$(roomId)).data.status == 'lobby';
        // 自己更新自己(心跳/ready/認領);host 可更新任何人(踢人/改 controlMode)
        allow update: if signedIn() && (request.auth.uid == uid || isHost(roomId));
        allow delete: if signedIn() && (request.auth.uid == uid || isHost(roomId));
      }

      match /state/{docId} {
        allow read: if signedIn() && isMember(roomId);
        allow write: if signedIn() && isHost(roomId);   // Phase 1:只有 host 寫
      }

      match /turns/{turnNo}/actions/{uid} {
        allow read: if signedIn() && isMember(roomId);
        allow create, update: if signedIn() && request.auth.uid == uid
          && request.resource.data.charId ==
             get(/databases/$(database)/documents/rooms/$(roomId)/players/$(uid)).data.characterId;
        allow delete: if signedIn() && (request.auth.uid == uid || isHost(roomId));
      }

      match /logs/{seq} {
        allow read: if signedIn() && isMember(roomId);
        allow create: if signedIn() && isHost(roomId);
        allow update, delete: if false;                 // append-only
      }

      match /whispers/{id} {
        allow read: if signedIn() && (resource.data.uid == request.auth.uid || isHost(roomId));
        allow create: if signedIn() && isMember(roomId)
          && request.resource.data.uid == request.auth.uid;
        allow update: if signedIn() && isHost(roomId);  // host 寫回 answer
        allow delete: if false;
      }
    }
  }
}
```

**已知限制(接受)**:`isMember` 每條規則一次 `exists()` 讀取,計費可接受;房號猜測攻擊靠 6 碼空間(約 10 億)+ 房間生命週期短緩解,Phase 2 再加 App Check。

### 4.4 log 同步的內容規則

- `image` 類 log(base64 場景圖)**不寫入 Firestore**(超過 1MB 限制)。guest 看不到場景圖——Phase 1 接受;之後可改存 Firebase Storage 放 URL。
- `dm_whisper` 類 log 不進共享 logs,走 `whispers` 子集合(私人)。
- `content` 為物件的 `turn_batch` 原樣存(它是 JSON-safe 的 plain object)。

---

## 5. 同步層設計(Phase 1 核心)

### 5.1 新檔案

```
src/services/RoomSyncService.js   ← 所有 Firestore 讀寫,無 React 依賴
src/hooks/useRoomSync.js          ← React 整合層(訂閱 → 呼叫 App 的 setters)
src/views/LobbyView.jsx           ← 房間大廳(建房/加入/認領/ready)
src/components/RoomBadge.jsx      ← 遊戲中顯示房號 + 成員在線狀態的小徽章
firestore.rules
firestore.indexes.json            ← 初期空:{"indexes":[],"fieldOverrides":[]}
```

### 5.2 RoomSyncService API(簽名規格)

```js
// 全部回傳 Promise;錯誤往上拋,由呼叫端 toast
createRoom({ nickname, moduleId, moduleSnapshot, gameMode, gameOptions, startLevel })
  → { roomId, roomCode }            // 產生房號、寫 codes/ 映射、建立 host player 文件
joinRoomByCode(roomCode, nickname)  → { roomId, role }   // 查 codes → 建立 player 文件
claimCharacter(roomId, characterId) // transaction:檢查該角色未被他人認領
setReady(roomId, ready)
startGame(roomId)                   // host only:status → 'playing'
submitAction(roomId, turnNo, charId, text)
acquireTurnLock(roomId, turnNo)     // transaction:executing == null 或 stale(>120s)才成功
releaseTurnLock(roomId)
appendLogs(roomId, entries)         // 批次寫,seq 由 state.current 讀到的計數器 + 批內遞增
writeState(roomId, statePayload)    // 覆寫 state/current(host 專用)
subscribeRoom(roomId, { onMeta, onPlayers, onState, onLogs, onActions })  → unsubscribe
heartbeat(roomId)                   // 每 30s 更新 players/{uid}.lastSeen(host 另更新 hostLastSeen)
leaveRoom(roomId)
```

實作要點:
- 所有寫入用 `serverTimestamp()`。
- `subscribeRoom` 的 `onLogs` 必須支援**增量**(用 `query(logsRef, orderBy('__name__'), startAfter(lastSeq))`),初次進房拉全量。
- 匿名 uid 清 cookie 會變:`players` 文件以 uid 為鍵,重進房 = 新玩家,舊的靠心跳過期;host 需有「移除離線玩家」按鈕。

### 5.3 兩種客戶端角色的行為

**HOST(執行者)**:
- 遊戲照現有單機流程跑(React state 為準)。
- 新增 `useRoomSync` 的鏡射職責,**時機掛在 `pendingTurnUpdates` 套用完成的 effect 之後**(App.jsx ~430 行那個 race-fix effect):一回合結束時做一次批次寫入 → `appendLogs(本回合新增的 log)` + `writeState(整包狀態)` + `meta.turnNo++`。不要每個 setState 都寫 Firestore(浪費且順序難保證)。
- 監聽 `turns/{turnNo}/actions/*`:收到的行動合併進 `pendingActions`(`setPendingActions(prev => ({...prev, [charId]: text}))`)。
- 執行回合前:`acquireTurnLock` 成功才呼叫 `executeTurn`;結束(finally)`releaseTurnLock`。**本地的 `isExecuting` ref 保留**,兩層鎖並存。
- 回合中 memoryService 照常運作;`writeState` 時帶 `memoryService.current.export()`。

**GUEST(觀看+提交者)**:
- 進房後以 `state/current` 還原本地狀態——**直接複用 `useSaveSystem.handleLoad` 的還原邏輯**(抽成共用函式 `applySaveData(saveData, setters)`,存檔與房間同步共用)。
- `onLogs` 增量 → `setLogs(prev => [...prev, entry])`。
- `onState` → 套用整包(同上)。
- **禁用**:`executeTurn`(guard:`if (room && !isHost) return;`)、存檔寫入、gameState 預覽 seeding effect、useAutoPlay(host 才跑)。
- 行動提交:玩家點選項時,呼叫 `submitAction` 而非 `setPendingActions`;UI 上自己的角色卡照常,**其他玩家認領的角色卡唯讀**(顯示認領者暱稱 + 是否已下令)。
- guest 的 `pendingActions` 由 host 鏡射回來的 state 驅動顯示(或監聽 actions 子集合自行彙總,擇一,建議後者:延遲更低)。

### 5.4 App.jsx 整合點清單(最小侵入)

1. 新 state:`const [room, setRoom] = useState(null); // { roomId, roomCode, role: 'host'|'player'|'spectator', myCharacterId }`
2. `HomeView` 加第三個入口「多人房間」→ `LobbyView`。
3. `LobbyView` 完成後:host 走現有 `startGame()`(照常初始化)+ `writeState` 初始包 + status→playing;guest 監聽到 playing → 還原 state → `setView('game')`。
4. `executeTurn` 開頭加 guard(guest 直接 return)+ host 的 turnLock(在 `isExecuting.current = true` 之後、throttle 之前)。
5. `GameView`:角色卡點擊 handler 加「不是我的角色就唯讀」;`isRoundReady` 對 host 不變(pendingActions 已被 actions 合併餵滿)。
6. 行動提交分流:`ActionModal` 的 `onSelectAction` 在房間模式且非 host 時走 `submitAction`。
7. 停用清單(房間模式的 guest):預覽 seeding effect、useAutoPlay、useSaveSystem 自動行為、`handleArchiveCurrentGame`(host 終章時代表全房執行)。
8. `DMChatModal` / whisper:房間模式改寫 `whispers` 集合;host 端監聽並由 EditorAgent 回答後寫回 `answer`。(Phase 1 可先做成「僅 host 可用悄悄話」,標註 TODO。)

---

## 6. 回合執行權(必讀 — 對應已修過的競態 bug)

```js
// acquireTurnLock 的 transaction 邏輯
await runTransaction(db, async (tx) => {
  const roomSnap = await tx.get(roomRef);
  const { executing, turnNo } = roomSnap.data();
  const stale = executing && (Date.now() - executing.startedAt.toMillis() > 120_000);
  if (executing && !stale) throw new Error('TURN_LOCKED');
  if (turnNo !== expectedTurnNo) throw new Error('TURN_MISMATCH');   // 防重複執行同一回合
  tx.update(roomRef, { executing: { turnNo, byUid: myUid, startedAt: serverTimestamp() } });
});
```

- 鎖含 `turnNo`:即使兩個 host 分頁同時搶,同一回合只會執行一次。
- 120 秒 stale 釋放:host 執行中斷線,鎖不會永久卡死(AI 一回合最長約 60-90s)。
- 回合完成的原子性:`writeState` + `meta.turnNo++` + `executing: null` 用同一個 `writeBatch` 提交。
- **host 轉移(Phase 1 簡化版)**:host 離線 >90s 時,其他玩家看到「房主離線」橫幅 + 「接手主持」按鈕(需要自己的 API key);點擊 → transaction 改 `hostUid`。不做自動轉移(有搶佔風險)。

---

## 7. UI/UX 規格

### 7.1 LobbyView(新畫面)

```
┌────────────────────────────────────────┐
│  多人冒險大廳            房號: KX7M2P  │
│  ────────────────────────────────────  │
│  [建立房間]  暱稱:____  (host 之後照常走模組/隊伍/模式選擇)
│  [加入房間]  房號:____ 暱稱:____
│  ────────────────────────────────────  │
│  成員列表:
│   👑 Jon(房主)      ✅ 已認領 嵐·風行者   ● 在線
│   🎮 小明            ⏳ 選擇角色中...      ● 在線
│   👁 路人甲(旁觀)                        ○ 離線 45s
│  ────────────────────────────────────  │
│  角色認領區:隊伍 6 格,已認領顯示玩家暱稱徽章,
│             未認領顯示「AI 代打」;點擊認領(transaction 防搶)
│  [開始冒險](host 專屬,至少 1 人認領即可點)
└────────────────────────────────────────┘
```

- 房主流程:建房 → 照常選模組/隊伍/模式(現有畫面,頂部多一條「房間 KX7M2P|等待玩家」橫幅)→ 大廳確認 → 開始。
- 加入者流程:輸房號+暱稱 → 直接進大廳 → 認領角色 → 等 host 開始。
- 房號顯示要大、可一鍵複製。

### 7.2 遊戲中(GameView 增量)

- 頂欄加 `RoomBadge`:房號 + 成員頭像點(綠=在線/灰=離線)+ 本回合下令進度「2/3」。
- 角色卡:認領者暱稱小徽章;不是自己的卡半透明、不可點;已下令顯示 ✅(不顯示指令內容,保留驚喜——host 端例外,host 看得到全部)。
- 別人下令時的即時感:監聽 actions 子集合,有新文件就即時打勾 + 輕微音效(用現有 AudioManager.playSound)。
- 斷線橫幅:「小明 已離線,嵐·風行者 暫由 AI 代打」(host 把該角色 controlMode 切 auto;回線後自動切回)。
- 旁觀者:隱藏整個行動側欄,只有故事流 + 隊伍狀態。

### 7.3 錯誤與邊界狀態文案

| 情境 | 呈現 |
|---|---|
| 房號不存在 | 「找不到這個房間,請確認房號」 |
| 房間已開始(status=playing)想加入 | 以旁觀者身分加入 + toast 說明 |
| 角色被搶先認領 | toast「這個角色剛被認領,選別的吧」+ 即時刷新 |
| 回合執行中(鎖被持有) | 執行鈕 disabled + 「DM 正在敘事…」 |
| host 離線 | 橫幅 + 接手按鈕(§6) |
| 自己被踢 | 導回首頁 + toast |

---

## 8. 分階段實作計畫與驗收檢核

### Phase 0 — 同步觀戰(估 0.5-1 天)

**任務**:
1. `firebase.js` 加 Firestore 初始化。
2. `firestore.rules` + `firebase.json` 配置(§4 全文)。
3. `RoomSyncService` 最小版:`createRoom / joinRoomByCode / appendLogs / subscribeRoom(onLogs) / heartbeat`。
4. host:遊戲中新增「開啟觀戰」按鈕(SettingsModal 內)→ 建房 → 顯示房號;之後每回合把新增 narrative log 鏡射上去(掛在 pendingTurnUpdates 套用 effect)。
5. guest:首頁「加入觀戰」→ 輸房號 → 唯讀故事流頁面(複用 SequentialLogRenderer,instant 模式)。

**驗收(兩瀏覽器:一般+無痕)**:
- [ ] A 開觀戰、B 憑房號加入,B 在 3 秒內看到 A 已有的全部敘事。
- [ ] A 執行新回合,B 端敘事在回合完成後 3 秒內出現,內容一字不差。
- [ ] B 重新整理頁面後能恢復(全量拉取)。
- [ ] A 不開觀戰時,單機流程與 commit `20c6ee3` 行為完全一致(不建任何 Firestore 連線)。
- [ ] 兩端 console 無錯誤;`npx vite build` 通過;eslint 無新增嚴重錯誤。
- [ ] Firestore Console 確認:logs 文件數 = 敘事條數,無 image 類 log。

### Phase 1 — 房主制多人(估 3-5 天)

**任務分解(建議依序 commit)**:
1. `LobbyView` + 建房/加入/暱稱/成員列表/心跳。
2. 角色認領(transaction)+ ready 流程 + host 開始遊戲(初始 state 上傳)。
3. guest 端狀態還原(抽出 `applySaveData` 共用函式)+ logs/state 訂閱。
4. 行動提交分流 + host 合併 actions → pendingActions + 下令進度 UI。
5. 回合鎖(§6)+ host 執行 → 批次回寫(logs + state + turnNo)。
6. 斷線處理(lastSeen → AUTO 切換)+ host 轉移按鈕 + 旁觀者模式。
7. 終章/歸檔的多人行為:host 歸檔,guest 看到「冒險完結」畫面。

**驗收腳本(手動,兩瀏覽器 + 第三個無痕當旁觀)**:
- [ ] 建房 → 加入 → 認領:B 認領後 A 的大廳即時顯示;兩人搶同一角色只有一人成功。
- [ ] 開局:A 按開始後,B 在 5 秒內進入遊戲畫面,序幕動畫正常播放。
- [ ] 回合:A、B 各自為自己的角色下令,雙方都看到「2/2」;A 端自動/手動執行;結果兩端一致(HP、地點、敘事)。
- [ ] 權限:B 嘗試點 A 的角色卡 → 唯讀;用 Firestore Console 手動以 B 的 uid 寫別人的 action → 被 rules 拒絕。
- [ ] 未認領角色由 AI 代打(useAutoPlay 在 host 端補指令)。
- [ ] 斷線:關掉 B 的分頁 → 90 秒內 A 看到離線標記、B 的角色轉 AUTO → B 重開網址+房號重進 → 恢復控制。
- [ ] 回合鎖:A 開兩個分頁同時執行 → 只跑一次(第二個拿到 TURN_LOCKED)。
- [ ] host 中斷:A 執行回合中強制關閉 → 120 秒後 B 可接手主持(輸入自己的 key)。
- [ ] 終章:玩到 adventure_ended(或用短模組「強力釀造」)→ 終章敘事兩端同步 → 圖書館有完整歸檔。
- [ ] 回歸:不進房間的單機流程完整無恙(開局/存讀檔/終章)。
- [ ] `npx vite build` + eslint 通過;Firestore 用量在 Console 檢查一場遊戲 <5K writes。

**Rules 自動化測試(建議但非必須)**:`npm i -D @firebase/rules-unit-testing`,用 `firebase emulators:start --only firestore` 跑最小測試:非成員讀房間被拒、寫他人 action 被拒、guest 寫 state 被拒。放 `tests/firestore-rules.test.js`,在計畫文件同 commit 提供 `npm script`。

### Phase 2 — 伺服器權威(選做,估 1-2 週,另立計畫)

僅列方向,**不要在 Phase 1 完成前開工**:
- 把 §1.2 管線抽成與 React 無關的純函式庫(`src/engine/`),輸入 `{state, actions, module}`、輸出 `{newState, logs}`——這是最大的重構,先寫快照測試(現有回合的輸入輸出錄製回放)再搬。
- Cloud Function `executeTurnServer`(onCall):讀房間 → 跑管線(Vertex)→ 寫回。rules 把 state/logs 寫入權改成僅 service account。
- 加 App Check、每房每分鐘回合數上限、房間 24 小時 TTL 清理(scheduled function)。

---

## 9. 交付物清單(Phase 1 完成時應存在)

- [ ] `firestore.rules`、`firestore.indexes.json`、`firebase.json`(firestore 段)
- [ ] `src/services/RoomSyncService.js`(含 JSDoc)
- [ ] `src/hooks/useRoomSync.js`
- [ ] `src/views/LobbyView.jsx`、`src/components/RoomBadge.jsx`
- [ ] `src/utils/applySaveData.js`(useSaveSystem 與房間同步共用)
- [ ] App.jsx 整合(§5.4 的 8 個點,每個點加 `// [ROOM]` 註解方便日後搜尋)
- [ ] `docs/MULTIPLAYER_PLAN.md` 更新:每個 Phase 完成後把驗收清單打勾、記錄偏離本計畫的決策
- [ ] 各 Phase 一個 commit,訊息附驗收結果摘要

---

## 10. 快速自檢(執行模型每次收工前)

1. `npx vite build` → 必須綠。
2. `npx eslint src` → 不得新增 `no-undef` / `react-hooks/rules-of-hooks` / `no-dupe-keys`。
3. 單機冒煙:首頁 → 選模組 → 隊伍 → 開局 → 一回合 → 存檔 → 讀檔,console 零錯誤。
4. 多人冒煙:§8 對應 Phase 的驗收腳本。
5. `git status` 乾淨、commit 訊息完整。
