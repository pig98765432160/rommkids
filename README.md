# Anime & Game 匿名分享平台

這是一個為喜愛動漫與遊戲的用戶打造的匿名分享空間。使用者可以發表貼文、分享圖片、交流心情，平台風格可愛、日系，重視使用者隱私與自由。

---

## 🛠 使用技術

- **框架**：Next.js (使用 Page Router) + React 18
- **CSS**：Tailwind CSS 搭配 Material UI
- **後端**：Firebase Firestore
- **資料快取**：Node.js + Cron 定時快取
- **套件管理**：pnpm
- **程式語言**：JavaScript / TypeScript（如適用）
- **其他**：YouTube Data API v3

---

## 🚀 開發啟動方式

```bash
pnpm install       # 安裝套件
pnpm run dev       # 啟動本地開發伺服器
```

瀏覽器開啟 http://localhost:3000

---

### ⏰ 每日快取 YouTube 資料

為避免頻繁呼叫 API 而超過配額，我們每日自動快取 YouTube Live 的影片清單到 data/youtube.json 中。

#### 🛠 快取腳本位置

腳本位於：

```bash
scripts/fetchYoutube.js
```

#### 📦 快取結果存放位置

快取成功後，影片資料會儲存在：

```bash
data/youtube.json
```

#### 🧪 手動執行方式

若需手動執行快取腳本：

```bash
pnpm run fetch:youtube
```

需於 package.json 中加入以下指令（已加就可略過）：

```bash
{
  "scripts": {
    "fetch:youtube": "node scripts/fetchYoutube.js"
  }
}
```

---

#### ⚠️ 注意事項

若遇到 quotaExceeded，請勿短時間內重複執行 fetch，建議等待配額刷新或改用快取資料。
youtube.json 為快取檔案，請勿直接手動修改。

#### 📌 TODO & 待辦清單

- 用戶匿名帳號管理
- 貼文分類與推薦系統
- D3.js 小互動地圖（公會功能）
- UI 日系風格優化
