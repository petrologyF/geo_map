# RULES

## 1. 最優先ルール
- `data/map_catalog.json`, `data/map_index.geojson`, `data/field_trips.geojson` は直接手編集せず、必ずプロバイダ/CSV 更新後に `scripts/build_geojson.py` で再生成する。
- `data/field_trips.md` は本プロジェクトの自動生成対象外であり、無断で変更・削除しない。
- `scripts/schema.py` のバリデーションを緩めてデータを通さない。
- 既存の単体・監査テストを壊さない。
- 不明な仕様は推測で実装せず、`docs/MEMORY.md` の `Open Questions` に記録する。

## 2. コーディング規約
- **文字コード・改行**: UTF-8（BOM なし）・LF（`\n`）。
- **フロントエンド**: ES Modules (`import`/`export`) を使用し、ビルドツール・外部 JS 依存を増やさない。DOM 操作時は `js/normalize.js` のサニタイズ/URL 検証を通す。
- **Python**: `scripts/schema.py` の共通バリデーションを再利用し、URL は `is_valid_http_url()` で `http`/`https` のみ許可する。
- **巡検 ID 命名規則**: `YYYY_コース略称_地点番号_地点略称`（例: `2026_能登半島_01_福浦灯台下`）。

## 3. Git・ブランチ運用
- **コミットメッセージ**: Conventional Commits 形式（`feat(ui):`, `fix(pipeline):`, `docs:` 等）。
- **プッシュ運用**: 明示的な指示がない限り自動 `git push` は行わない。

## 4. テスト規約
- **単体・監査テスト**: `tests/test_audit_suite.py`（全データ・CSV/GeoJSON 同期・HRO 重複排除）および `tests/test_build_map_catalog.py`（取得・抽出ロジック）。
- **実行タイミング**: `scripts/`・`data/`・`js/` のスキーマ関連変更後は必ず実行する。

## 5. 検証コマンド
```bash
cd C:\Users\climb\Documents\workspace\01_dev\geo_map
python -B -m unittest discover -s tests -v
# ローカル動作確認
python scripts/serve.py
```

## 6. 変更後の報告形式
- 変更したファイル / 実装内容 / 実行した検証コマンドと結果 / 残課題 / 懸念点 / 次に推奨する作業

---
- 最終更新日: 2026-11-28
- 更新理由: データ再生成原則・命名規則・検証コマンドを整理し `docs/RULES.md` を新規作成。
