# 冒險劇本創作與 3D 戰棋規格規範（Module Authoring Standard）

## 核心規定（強制要求）
凡新增或擴充任何冒險劇本（`src/data/modules/*.js`），只要 `strategic_nodes[]` 中的節點屬於**戰鬥或高潮遭遇（即具有 `foes` 或 `!node.calm` 的 Boss／機關戰節點）**，**一律必須順手加上 `tactical` 區塊**，以確保從劇情模式進入 3D 戰棋時能精準還原地形、站位、互動 DC、頭目／VIP 與專屬台詞。

---

## `node.tactical` 標準欄位說明

```js
{
  id: "3-B1",
  site: "black_iron_forge",
  map: "forge_complex",
  title: "熔爐前的對決：畸變達倫",
  tactical: {
    scenarioId: "black_iron_forge",        // 精準對應 voxelMapGenerator.js 的 80 張 3D 地圖 ID
    layout: "auto",                        // 選填："auto" | "twin_ships" | "cliff_and_sea"
    heroFormation: "bottom",               // "auto" | "bottom" | "top" | "center" | "scattered" | "split"
    foeFormation: "top",                   // "auto" | "top" | "bottom" | "surround" | "flank" | "ambush_behind" | "scattered"
    ambushMode: "normal",                  // "normal" | "hero_surprise" | "foe_surprise"
    foeWaves: false,                       // boolean：第 2 輪是否觸發劇情伏兵／增援
    weather: "clear",                      // 選填："clear" | "rain" | "fog" | "snow" | "lightning_storm"
    lighting: "dim",                       // 選填："bright" | "dim" | "dark"
    objectiveName: "斬斷達倫後頸黑鐵母釘", // 戰場上方目標提示
    namedFoes: [                           // 選填：將敵人升級為命名頭目／精英
      { template: "cult_fanatic", name: "畸變達倫·萊桑德", isBoss: true }
    ],
    allies: [                              // 選填：指定參戰友軍或需護送的 VIP
      { name: "受困探員", role: "vip" }     // role: "vip" | "combat"
    ],
    interactables: [                       // 選填：指定劇情相關雙態互動物件、技能檢定與 DC（對應 approaches 或場景機關）
      {
        kind: "crystal",                   // "crystal" | "oil_barrel" | "altar" | "gate" | "boulder"
        name: "熔爐高壓導管",
        skill: "奧秘",                     // 檢定技能："運動" | "特技" | "巧手" | "隱匿" | "奧秘" | "宗教" | "察覺" | "說服" | "威嚇" | "醫療" | "調查"
        dc: 13,
        actionLabel: "破壞",               // 選填：按鈕動詞（如 "推動" / "撬開" / "引爆" / "破壞" / "破解"）
        shovable: false,                   // 選填：若為可推動重物/油桶/石柱可設 true
        rewardEffect: "weaken_foes",       // "weaken_foes" | "inspire_party" | "aoe_holy_burst" | "haste_party"
        rewardDesc: "導管破裂噴出高溫蒸氣，灼裂達倫的黑鐵接縫！"
      }
    ],
    script: {                              // 預寫戰棋對話腳本（免去戰前 AI 延遲，直接觸發）
      missionGoal: "擊敗畸變大工頭達倫，奪回黃銅圓筒密函",
      opening: [
        { speaker: "畸變達倫·萊桑德", side: "foe", line: "血肉太過脆弱了……看看這身黑鐵賜予我的神力吧！" },
        { speaker: "我方隊長", side: "hero", line: "鎖定他後頸那枚半尺黑鐵母釘！別被逼近鐵水池！" }
      ],
      triggers: {
        foeHalfHp: { speaker: "畸變達倫·萊桑德", side: "foe", line: "不可能……區區凡人竟敢傷到黑鐵神殿的鑄件？！" },
        heroDown: { speaker: "我方隊員", side: "hero", line: "撐住！馬上掩護倒下的同伴！" },
        waveArrive: { speaker: "敵方增援", side: "foe", line: "援軍到了，包圍他們！" }
      },
      propLine: { speaker: "我方隊員", side: "hero", line: "熔爐管道炸裂了！他的黑鐵裝甲出現裂縫，趁現在！" },
      ending: {
        victory: [{ speaker: "我方隊長", side: "hero", line: "達倫倒下了……快收好那只沾血的黃銅圓筒，地底要塌了！" }],
        retreat: [{ speaker: "我方隊長", side: "hero", line: "先撤出熔爐大廳重整！" }],
        defeat: [{ speaker: "畸變達倫·萊桑德", side: "foe", line: "黑鐵神殿不歡迎失敗者。" }]
      }
    }
  },
  situation: "..."
}
```

---

## 檢查清單（Checklist）
1. 每個有 `foes` 的高潮／Boss 節點是否已填寫 `tactical.scenarioId` 與雙方 `heroFormation` / `foeFormation`？
2. 若劇情描述「遭埋伏 / 偷襲」，是否已設定 `ambushMode: "foe_surprise"`（或我方奇襲 `"hero_surprise"`）？
3. 關鍵 Boss 是否已透過 `namedFoes` 命名並標記 `isBoss: true`？
4. 護送人物或人質是否已透過 `allies` 標記 `role: "vip"`？
5. 場景關鍵機關（水閘、祭壇、油桶、引信等）是否已填入 `interactables` 與 `dc`？
6. 是否已填寫 `script`（至少包含 `missionGoal` 與 `opening`，Boss 戰建議補齊 `triggers.foeHalfHp` 與 `ending.victory`）？
7. 寫完後是否已執行 `node scripts/verify_tactical3d.mjs` 與 `npm run build` 驗證通過？
