# 冬夜聖誕誌 · Noël 2026

一個以兩幅聖誕冬夜映像為核心的節慶互動網頁，結合飄雪畫布、Web Audio API 八音盒與壁爐聲景、聖誕倒數計時、可下載 PNG 的聖誕祝福賀卡牆，並已完成 GitHub Pages 自動化發佈配置。

## 主要功能

- **雙幅冬夜映像典藏 (Plate I & II)**：支援全螢幕燈箱檢視、放大細節與主題光感切換（燭光暖夜 / 霜雪清輝）。
- **互動飄雪畫布 (`SnowCanvas`)**：支援細雪、瑞雪紛飛、靜止三段切換，並響應滑鼠微風與 `prefers-reduced-motion`。
- **Web Audio API 節慶聲景**：無需外部音檔，即時合成溫暖八音盒旋律與壁爐柴火微響。
- **即時聖誕倒數**：以等寬數字 (`tabular-nums`) 倒數至聖誕夜。
- **聖誕祝福賀卡工坊**：可撰寫專屬祝福、選擇冬夜印記、直接匯出 PNG 賀卡圖檔並保存於瀏覽器 `localStorage`。

## 本機開發

```bash
npm install
npm run dev
```

## 發佈至 GitHub Pages

本專案已內建 `.github/workflows/deploy.yml` 與相對路徑打包設定 (`base: './'`)：

1. 在 GitHub 建立一個新的公開儲存庫（例如 `noel-2026`）。
2. 將本機程式碼推送至 `main` 分支：
   ```bash
   git remote add origin https://github.com/<你的帳號>/<你的儲存庫>.git
   git branch -M main
   git push -u origin main
   ```
3. 前往 GitHub 儲存庫的 **Settings → Pages**，將 **Source** 設為 **GitHub Actions**，等待約 1 分鐘即可瀏覽上線網頁。
