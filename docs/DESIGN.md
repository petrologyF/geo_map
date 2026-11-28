# DESIGN

## 1. 画面一覧
単一ページ（`index.html`）上のフローティングパネル構成：

| パネル / 領域 | 目的 | 主な要素 | 遷移 / 状態 |
|---|---|---|---|
| **中央マップ (`#map`)** | 全画面地図表示 | Leaflet 地図、図郭枠、シームレス V2 タイル、巡検クラスタ/Stop マーカー | 720px 以下は `data-mobile-view` タブ切替 |
| **左ドロワー (`#left-drawer`)** | 図幅・巡検検索と絞り込み | 検索窓（`/`・`Ctrl+K`）、`[地質図 \| 巡検スポット]` タブ、地図種別・表示範囲内・詳細フィルタ、一覧 | 開閉トグル（初期状態は検索窓のみ展開） |
| **右インスペクタ (`#right-inspector` 等)** | 重ね合わせ管理・凡例閲覧 | 最大 4 図幅リスト（順序・透過度・ズーム・削除）、`[凡例]` 2.8倍ルーペ、`[断面図]`、`[詳細・PDF]` | 折りたたみ可能 |
| **右下地図コントロール** | レイヤー・環境設定 | 巡検 ON/OFF、現在地移動、背景地図 4 種、シームレス V2 透過度、テーマ（`d` キー）/言語（`JP`/`EN`）/リセット | ポップオーバー開閉 |
| **ヘルプモーダル** | キーボード操作案内 | ショートカット・矢印ナビゲーション説明 | `Esc` で閉じる |

## 2. 画面遷移図
```text
[地図メイン] ──(左ドロワー開)──▶ [地質図検索 / 巡検スポット一覧]
      │                                     │ (図幅/コース選択)
      └──(右インスペクタ開)──▶ [重ね合わせ管理 + 凡例/断面図/詳細PDF]
```

## 3. UI 方針
- **レイアウト**: 100vw x 100vh フルスクリーン地図＋フローティングパネル。モバイル（720px 以下）では `#mobile-nav-bar` で `[地図 | 検索・一覧 | 凡例・詳細]` を切替、ボトムシート表示に対応。
- **テーマ・多言語**: `Noto Sans JP` フォント、ライト/ダークモード（OS 同期＋`d` キー切替）、日英辞書（`js/i18n.js`）。
- **キーボード操作**: `/` または `Ctrl+K`（検索フォーカス）、`d`（ダークモード）、矢印キーナビゲーション、IME 入力中ガード対応、`Esc`（閉じる）。

## 4. API / データ取得インターフェース
静的配信のためバックエンド REST API は持たず、以下を `fetch` で取得する：
- `data/map_catalog.json`（統合カタログ 770 件）
- `data/map_index.geojson`（図郭ポリゴン 769 features）
- `data/field_trips.geojson`（巡検スポット 1257 features）
- 外部 API: 国土地理院 XYZ タイル、GSJ シームレス V2 API v1.2（XYZ タイル・地点地質照会）

## 5. データベース設計（静的ファイル構成）
- マスターデータは `data/providers/*.json`, `data/seeds/*.json`, `data/field_trips.csv`。
- 配信成果物は `scripts/build_geojson.py` が生成する `data/map_catalog.json`, `data/map_index.geojson`, `data/field_trips.geojson`。

## 6. 状態とバリデーション
- `scripts/schema.py` が `map_type`, `geometry_model`, `tile_type`, `scale_denominator > 0`, `published_year` (int or None), `bounds` (`-180<=W<E<=180`, `-90<=S<N<=90`), `http(s)://` URL, `FIELD_TRIP_ID_RE`, コース内カテゴリ一貫性を検証する。
- フロントエンドは `js/normalize.js` で URL・文字列を正規化・検証する。

## 7. 未確定事項
- なし。

---
- 最終更新日: 2026-11-28
- 更新理由: 画面構成・UI 方針・静的データ配信設計を整理し `docs/DESIGN.md` を新規作成。
