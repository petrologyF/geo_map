# TASKS

> タスクの正本は Linear ([geo_map](https://linear.app/asahivault/project/geo-map-a2f918af3fa7))。この文書は仕様メモとして、フェーズと課題へのリンクのみを保持する。

## 現在の状態
- **現在のフェーズ**: 安定稼働・保守フェーズ（UI・パイプライン・テスト基盤実装済み）
- **次に実装するタスク**: なし（全バックログ完了）
- **ブロッカー**: なし

## フェーズ 0: 基盤・データパイプライン（完了）
- [x] T-000: GSJ 5万分の1・20万分の1シームレス・火山・HRO データ取得・正規化パイプライン構築
- [x] T-001: `scripts/schema.py` 厳格スキーマ検証・`tests/test_audit_suite.py` 整備
- [x] T-002: GitHub Pages デプロイワークフロー (`.github/workflows/pages.yml`) 構築

## フェーズ 1: WebGIS UI・巡検機能（完了）
- [x] T-010: フルスクリーン Leaflet UI・検索ドロワー・右インスペクタ（4図幅重ね合わせ・凡例ルーペ・断面図抽出）
- [x] T-011: 日本地質学会 巡検スポット（1257地点 / 165コース）クラスタリング・LOD・前後ナビ実装
- [x] T-012: URL パーマリンク・ダークモード・キーボードショートカット・日英ローカライズ・`state.js`/`dom.js` 分離
- [x] T-013: `/project-docs` 整備および `REVIEW_BUNDLE.md` アーカイブ

## フェーズ 2: 保守・整理（完了）
- [x] T-020: `REVIEW_BUNDLE.md` を `python -m scripts.build_review_bundle` で再生成し、自動生成物としての位置づけを `docs/ARCHITECTURE.md` / `docs/MEMORY.md` へ明記（`python -B -m unittest discover -s tests -v` 全 19 件パス確認）

## 完了定義
- [x] `python -B -m unittest discover -s tests -v` が全件パスする
- [x] ドキュメントが実装と一致している

---
- 最終更新日: 2026-11-28
- 更新理由: `REVIEW_BUNDLE.md` 再生成と全 19 テスト通過に伴い `T-020` および完了定義を更新。
