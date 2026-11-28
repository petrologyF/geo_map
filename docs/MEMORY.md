# MEMORY

## 1. プロジェクトの現状
- **現在のフェーズ**: 安定稼働・保守フェーズ
- **最後に完了したタスク**: `T-020`（`REVIEW_BUNDLE.md` 再生成および `test_audit_suite.py` 全 19 件パス確認）
- **次に着手するタスク**: なし（全テスト通過・保守待機）
- **ブロッカー**: なし

## 2. 重要な意思決定
| 日付 | 決定 | 理由 | 代替案 | 影響 |
|---|---|---|---|---|
| 2026-11-28 | 一時退避していた `REVIEW_BUNDLE.md` を `python -m scripts.build_review_bundle` で再生成し、自動生成物として維持（正本は `docs/`） | 既存テスト `test_review_bundle_exists_and_contains_sections` と Git pre-commit フックが生成物を検査しているため、生成パイプラインを残す方が変更範囲が小さく整合性を保てる | `REVIEW_BUNDLE.md` を完全廃止しテスト・生成スクリプトを削除 | 今後は `REVIEW_BUNDLE.md` を退避・削除せず、直接編集も禁止とする |

## 3. 既知の制約
- `data/field_trips.md` は巡検関連メモとして保持されており、ドキュメント整理の対象外（変更禁止）。
- `data/map_catalog.json`・`data/map_index.geojson`・`data/field_trips.geojson` は `scripts/build_geojson.py` による生成物であり直接編集禁止。
- `REVIEW_BUNDLE.md` は `scripts/build_review_bundle.py` による自動生成物であり直接編集禁止。仕様・設計・進捗の正本は `docs/` とし、更新時は `python -m scripts.build_review_bundle` で再生成する。

## 4. 既知の問題と対処
| 問題 | 原因 | 対処 | 再発防止策 |
|---|---|---|---|
| （解消済み）`test_review_bundle_exists_and_contains_sections` が `AssertionError` で失敗 | ドキュメント整理時に自動生成物 `REVIEW_BUNDLE.md` を `99_archive/` へ退避したため | `python -m scripts.build_review_bundle` で再生成し、全 19 テスト通過を確認 | 今後は自動生成物を退避しない。ドキュメント退避前にテスト・スクリプト・pre-commit からの参照を確認する |

## 5. Open Questions
| 質問 | 必要な決定者 | 未解決のまま禁止する作業 |
|---|---|---|
| （なし） | — | — |

## 6. 次回セッションへの引き継ぎ
- **次回最初に読むべきファイル**: `docs/MEMORY.md`, `docs/TASKS.md`
- **次回最初に実行する検証**: `python -B -m unittest discover -s tests -v`
- **次回最初に実装するタスク**: なし

---
- 最終更新日: 2026-11-28
- 更新理由: `REVIEW_BUNDLE.md` の再生成・テスト全件通過および「今後は生成物を退避しない」方針を記録。
