# 2026-09-09 SEO修正

状態: 公開作業中。公開確認結果は追記予定。

Hostinger public_htmlが現行の公開元。GitHub mainは旧版で、HostingerのGit接続は未設定。ルート全体をデプロイしないこと。

## 変更

- enterprise DXの架空人物3名の紹介セクションを削除。
- 準備中の /systems/ を /dx/ に301転送。
- サイトマップから /systems/ を除き、Labemiru、AI Noise Guard、AWS、NHK、大成建設事例を追加。計34URL。
- 既存画像15点をWebPへ、動画1点を再圧縮。解像度を維持。原本は削除しない。
- TOPナビCTAのA/B実装を保持。

## 復旧

before以下の対象ファイルを同じ相対パスのpublic_htmlへ戻す。新規のoptimized画像は旧版から参照されないため残して問題ない。

## 公開手順

after/imgを先に配置し、HTTP200を確認してからafterのHTML・.htaccess・sitemap.xmlを配置する。

## 検証

HTMLの変更範囲、XML解析、画像内文字の目視を確認済み。公開後のHTTP・転送・A/B維持確認は追記する。速度や検索順位の改善量は未計測。
