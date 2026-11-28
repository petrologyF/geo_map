# ARCHITECTURE

## 1. システム概要
`geo_map` は静的 WebGIS フロントエンド（`index.html`, `css/style.css`, `js/*.js`）と Python データパイプライン（`scripts/`）の 2 層で構成される。ビルド工程を持たず、GitHub Pages（`.github/workflows/pages.yml`）または `scripts/serve.py` から静的配信され、ブラウザが `data/map_catalog.json`, `data/map_index.geojson`, `data/field_trips.geojson` を `fetch` で読み込んで Leaflet 地図上に描画する。Python パイプラインは GSJ/HRO のメタデータおよび `data/field_trips.csv` を取得・正規化し、`scripts/schema.py` による厳格検証を経て静的 JSON/GeoJSON を生成する。

## 2. 技術スタック
| 領域 | 採用技術 | 選定理由 | 代替案 | 採用しない理由 |
|---|---|---|---|---|
| フロントエンド | Vanilla HTML5 / CSS3 / ES Modules (`js/*.js`) | ビルド不要で GitHub Pages へそのまま配信できる | React / Vite | 静的配信と保守の単純さを優先するため |
| 地図描画 | Leaflet `1.9.4` (CDN) | 軽量で XYZ/WMS/ImageOverlay・GeoJSON 描画が容易 | MapLibre GL | 既存モジュール群が Leaflet API 前提で構築されているため |
| データパイプライン | Python 3 + `requests`, `beautifulsoup4` | スクレイピング・TileJSON 取得・JSON/GeoJSON 生成に適しているため | Node.js スクリプト | 既存の `scripts/providers/` 資産を活用するため |
| ホスティング | GitHub Pages + ローカル `scripts/serve.py` | 静的ファイルのみで無料公開・ローカル起動できる | バックエンドサーバー | 動的サーバー処理が不要なため |

## 3. ディレクトリ構成
```text
01_dev/geo_map/
├── docs/                           # 設計・運用ドキュメント (正本: 6文書)
├── REVIEW_BUNDLE.md                # 自動生成レビューバンドル（直接編集禁止）
├── index.html                      # アプリケーションシェル
├── css/style.css                   # ライト/ダーク・レスポンシブスタイル
├── js/                             # ES Modules (config, state, dom, i18n, normalize, permalink, map, inspector, seamless, fieldTrips, search, main)
├── data/
│   ├── providers/                  # プロバイダ別正規化 JSON (gsj_50k, gsj_seamless_200k, gsj_volcanic, gsj_coastal_seamless, hro_eeg)
│   ├── seeds/                      # 外部化シード JSON (gsj_volcanic, gsj_coastal_seamless)
│   ├── field_trips.csv             # 巡検スポットマスター CSV (1257地点 / 165コース)
│   ├── field_trips.geojson         # 生成済み巡検 GeoJSON
│   ├── field_trips.md              # 巡検関連メモ（※編集対象外）
│   ├── map_catalog.json            # 統合カタログ (770件)
│   └── map_index.geojson           # 図郭ポリゴン GeoJSON (769 features)
├── scripts/
│   ├── providers/                  # プロバイダ別アダプタ
│   ├── build_map_catalog.py        # GSJ 5万分の1メタデータ・TileJSON 取得
│   ├── build_geojson.py            # 統合・スキーマ検証・GeoJSON 生成
│   ├── build_review_bundle.py      # レビューバンドル生成スクリプト
│   ├── schema.py                   # 共通・巡検スキーマ検証
│   └── serve.py                    # ローカル HTTP サーバー
└── tests/
    ├── test_audit_suite.py         # データ・スキーマ回帰テスト
    └── test_build_map_catalog.py   # 取得・シード単体テスト
```

## 4. データフロー
1. **オフラインビルド（データ更新時）**: `build_map_catalog.py`（GSJ LD / TileJSON 取得）→ `scripts/providers/*.py` で共通スキーマへ正規化 → `build_geojson.py` が HRO 重複排除（`merge_without_duplicates`）・`validate_common_record()`・`validate_field_trip_record()` を実行し、`data/map_catalog.json`, `data/map_index.geojson`, `data/field_trips.geojson` を出力。
2. **ランタイム表示**: ブラウザ起動時に `main.js` が `data/*.json` / `*.geojson` を `fetch` し、`state.js` へ保持、URL ハッシュ（`permalink.js`）と `localStorage` 設定を復元して Leaflet（`map.js`）へ描画。
3. **外部タイル・照会**: 地理院タイル（背景）、GSJ シームレス V2 API v1.2（XYZ タイル＋地点クリック地質照会）、各図幅の XYZ/WMS/Raster/凡例画像をブラウザから直接参照。

## 5. データモデル
| エンティティ | 主要フィールド | 型 | 制約 | 関係 |
|---|---|---|---|---|
| **共通地質図レコード (`schema.py`)** | `source` (`provider_id`, `provider_name_ja`, `license`, `attribution`), `map` (`map_id`, `theme`, `map_type`, `geometry_model`, `scale_denominator`, `published_year`, `bounds`), `display` (`tile_type`, `tile_url`, `wms_url`, `raster_image_url`), `documents` (`light_pdf_url`, `full_pdf_url`, `legend_image_url`, `original_image_url`) | JSON dict | `map_type` 10種、`geometry_model` 5種、`tile_type` 4種、`bounds` は `[W,S,E,N]`、URL は `http(s)://` のみ、`map_id` 一意 | `map_catalog.json` と `map_index.geojson` の `properties` で共有 |
| **巡検スポット (`field_trips.csv`)** | `id`, `year`, `course_abbr`, `course_name`, `category`, `authors`, `stop_no`, `stop_abbr`, `stop_name`, `lat`, `lon`, `guidebook_url`, `description` | CSV / GeoJSON Point | `id` は `^\d{4}_[^_]+_\d+_[^_]+$`、`category` は 4 種（`volcano`, `basement`, `sedimentary`, `hazard_geo`）、同一コース内カテゴリ統一 | `field_trips.geojson` へ 1:1 変換 |

## 6. 外部サービス
| サービス | 用途 | 認証方式 | 失敗時の挙動 | レート制限・コスト上の注意 |
|---|---|---|---|---|
| 国土地理院タイル | 背景地図（白地図・淡色・標準・写真） | 不要 | タイル読込エラー表示 | 地理院利用規約順守 |
| 産総研 GSJ 地質図・シームレス V2 API | 地質図タイル・凡例・PDF・地点照会 | 不要 | エラーメッセージ表示 | 政府標準利用規約 2.0 / CC BY 4.0、`build_map_catalog.py` はレート制御付き |

## 7. 状態管理
- **クライアント状態 (`js/state.js`)**: 図幅カタログ・アクティブオーバーレイ（最大 4 件）・フィルタ・巡検選択状態・DOM キャッシュを保持。
- **永続化**: ユーザー設定は `localStorage`、共有状態は URL ハッシュ（`permalink.js`）に同期。

## 8. エラー処理とログ
- データ生成時は `schema.py` が不正値で即座に `ValueError` を送出して不正データ混入を防止する。
- UI エラーは `#status-message` (`role="alert"`) へ表示する。

## 9. 拡張性
- 新規地図プロバイダを追加する場合は `scripts/providers/` にアダプタを追加し、`validate_common_record()` を通すことでフロントエンド側の変更を最小限に抑えられる。

## 10. 自動生成ドキュメントの扱い
- `REVIEW_BUNDLE.md` は `scripts/build_review_bundle.py` による自動生成物である。
- 直接編集してはならない。
- 仕様・設計・進捗の正本は `docs/PRD.md`、`docs/ARCHITECTURE.md`、`docs/DESIGN.md`、`docs/TASKS.md` である。
- 再生成コマンド: `python -m scripts.build_review_bundle`

---
- 最終更新日: 2026-11-28
- 更新理由: `REVIEW_BUNDLE.md` の自動生成物としての位置づけと正本 `docs/` の役割を明記。
