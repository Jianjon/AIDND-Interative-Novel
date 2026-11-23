# 原型像素素材

- 素材包：Tiny Dungeon 1.0
- 作者：Kenney
- 原作者頁面：https://kenney.nl/assets/tiny-dungeon
- 下載日期：2026-11-12（Asia/Taipei）
- 授權：CC0 1.0 Universal；完整原包授權保留在 `kenney-tiny-dungeon/License.txt`。
- 檔案由 Kenney 官方下載流程取得，未從第三方重新製作或混入不同授權的素材。
- 原作者頁面標示 16×16、CC0；包內包含 132 張 16×16 靜態 PNG、packed/spaced atlas 和預覽圖。
- `contact-sheet.png` 是將包內靜態 PNG 以最近鄰放大並標上原檔編號，供開發者挑選。
- 作者不要求署名，仍在本原型保留 Kenney 出處。

## 程式整合

`assets.json` 提供每個推薦用途的相對 URL；可以直接將 `assets.warrior.url` 等傳給 Phaser 的 `load.image`。
Packed atlas 為 192×176，12 欄×11 列，每格 16×16、無間距，frame index 與 `tile_XXXX.png` 數字一致。
請以 `pixelArt: true` 或 nearest-neighbor 縮放。角色/怪物是單張靜態圖；移動、攻擊可由 Phaser tween、閃光、武器或粒子演出。

原包沒有明確的老鼠 sprite；本原型可選史萊姆/蜘蛛作怪物，若必須使用巨鼠則另備自製圖或另選授權已確認的素材。
