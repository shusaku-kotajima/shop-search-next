# CLAUDE.md

## 全体ルール
- 確認メッセージは必ず日本語で表示すること
- コミットメッセージは日本語でOK

## プロジェクト概要
お店検索アプリ（ポートフォリオ）

## 技術スタック
- Next.js 16 (App Router)
- React 19
- microCMS（ヘッドレスCMS）
- Vercel（デプロイ）

## ディレクトリ構成
- `src/app` - ページ・APIルート
- `src/app/admin` - 管理画面
- `src/app/api` - APIルート
- `src/components` - コンポーネント
- `src/hooks` - カスタムフック
- `src/lib` - microCMSクライアント

## 環境変数
- `MICROCMS_SERVICE_DOMAIN` - microCMSサービスドメイン
- `MICROCMS_API_KEY` - microCMS APIキー
- `ADMIN_PASSWORD` - 管理画面パスワード

## 注意事項
- microCMSのAPIキーにはPOST/PATCH/DELETE権限が必要
- 管理画面は `/admin` でパスワード認証あり
