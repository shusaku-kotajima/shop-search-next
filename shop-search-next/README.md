# お店検索アプリ

気になるお店をキーワード・エリア・ジャンルでサクッと検索できるWebアプリです。

🔗 **[デモを見る](https://shop-search-next-11wv.vercel.app)**

---

## 使用技術

- **Next.js 16** (App Router)
- **React 19**
- **microCMS**（ヘッドレスCMS・店舗データ管理）
- **Vercel**（デプロイ）

---

## 機能

- キーワード・エリア・ジャンルでの絞り込み検索
- 店舗詳細ページ（動的ルーティング `/shops/[id]`）
- 検索条件をURLに同期（検索結果をURLで共有可能）

---

## 工夫した点

### API Routesによるデータ取得
Next.jsのAPI Routesで `/api/shops` エンドポイントを作成し、`fetch` / `async/await` で店舗データを取得しています。ローディング状態も管理しています。

### カスタムフックによるロジック分離
検索・フィルタリングのロジックを `useShopSearch` カスタムフックに切り出し、コンポーネントの責務を表示に限定しました。

### URLと検索条件の同期
`useSearchParams` / `useRouter` を使い、検索条件をURLクエリパラメータに反映。ブラウザの戻る/進むボタンや、URLの共有が可能です。

### Server / Client Componentの使い分け
Next.js App Routerの設計に沿い、`useState` や `useSearchParams` を使うコンポーネントには `"use client"` を明示しました。

---

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開く。