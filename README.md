# 地質図検索 WebGIS（マルチプロバイダ・共通スキーマ対応）

Leaflet.js (v1.9.4) と Vanilla JavaScript を用いて構築した、産業技術総合研究所（産総研）や北海道立総合研究機構（北海道総研）などの複数機関・複数縮尺・複数地図種別を統一的に検索・閲覧・比較できるシングルページ WebGIS アプリケーションです。

## 主な機能

- **3カラム・サイドバー UI（Chrome風ミニマルデザイン）**:
  - **左サイドバー**: 検索窓（サジェスト付き）、地図種別（第一階層）＆詳細フィルター（第二階層）、表示オプション、背景地図切替、表示中の地質図（最大4枚）、常時表示の該当図幅一覧（地図ポリゴンとの双方向ホバー連動、全体表示ボタン付き）。
  - **中央マップエリア**: フルハイトの Leaflet マップ（右下ズームコントロール、左下メートル法スケールバー）。
  - **右サイドバー（詳細情報 & 地質凡例）**: 現在オーバーレイ表示中の地質図のうち **画面内で最も広く表示されている図幅** の詳細情報と地質凡例を自動表示。
- **日本語 / 英語（`JP` / `EN`）切り替え**:
  - 左サイドバーヘッダーの `JP` / `EN` ボタンで、UI 表記・図幅名・火山名・著者名・サジェスト候補・検索対象・ホバーツールチップを一括で切り替え可能。
- **二階層フィルター & 検索サジェスト**:
  - **検索サジェスト**: 図幅名・火山名・著者名の候補を種別バッジ付きで表示（`↑`/`↓` で選択、`Enter` で確定、`Esc` で閉じる、`/` または `Ctrl+K` / `Cmd+K` で検索欄へフォーカス）。
  - **第一階層（地図種別 `map_type`）**: すべて / 地質図幅 / シームレス地質図 / 火山地質図。
  - **第二階層（折りたたみ詳細フィルター）**: 発行年デュアルレンジスライダー、縮尺・シリーズ、地域、著者、発行機関、資料有無（説明書PDF・凡例・原図JPG）。
  - **クイックオプション**: 「表示範囲内のみ（パン・ズーム連動）」「図郭枠を表示」「20万分の1 シームレス (全国WMS)」。
- **XYZ / WMS / Raster 統合表示 & 最大4図幅同時比較**:
  - `display.tile_type` に応じて `L.tileLayer()`（XYZ）、`L.tileLayer.wms()`（WMS）、`L.imageOverlay()`（Raster）を自動選択し、`maxNativeZoom` 対応により高倍率ズーム（15〜18）でもタイルが消えません。
  - 最大 **4図幅** まで同時に重ねて図幅境界付近を比較でき、不透明度スライダー（0%〜100%）で一括調整できます。
- **軽量版 PDF 優先 & 正方形凡例拡大鏡**:
  - 軽量版 PDF（`documents.light_pdf_url`）がある図幅は **「説明書を見る」** ボタンを軽量版へ向け、詳細版 PDF（`documents.full_pdf_url`）がある場合は別途 **「詳細版PDF」** ボタンを新規タブ（`target="_blank"`）で表示します。
  - 凡例画像にマウスを乗せると、角丸正方形（`180×180px`）の **2.5倍拡大鏡（ルーペ）** が追従表示されます。

## 共通スキーマとプロバイダ構成

すべての地質図データは `source` / `map` / `geometry` / `display` / `documents` からなる共通スキーマに正規化されます（[scripts/schema.py](scripts/schema.py) で必須属性を検証）。

| プロバイダID | 対象機関・シリーズ | `map_type` | `geometry_model` | `tile_type` |
| --- | --- | --- | --- | --- |
| `gsj_50k` | 産総研 5万分の1地質図幅（13図幅収録） | `geological_map_sheet` | `map_sheet` | `xyz` |
| `gsj_seamless_200k` | 産総研 20万分の1日本シームレス地質図V2 | `seamless_geological_map` | `continuous_polygon` | `wms` |
| `gsj_volcanic` | 産総研 火山地質図（焼岳・御嶽山・富士山） | `volcanic_geological_map` | `map_sheet` | `none` / `raster` |
| `gsj_coastal_seamless` | 産総研 海陸シームレス地質図（沿岸域3地域） | `seamless_geological_map` | `continuous_polygon` | `none` / `wms` |
| `hro_eeg` | 北海道立総合研究機構（GSJ重複排除アダプタ） | `geological_map_sheet` | `map_sheet` | 各種対応 |

## 技術スタック

- HTML5 / CSS3 / Vanilla JavaScript（フレームワーク不使用）
- [Leaflet.js v1.9.4](https://leafletjs.com/)
- Google Fonts（Noto Sans JP）
- Python 3（プロバイダ正規化・GeoJSON 生成・ローカルサーバーランチャー）

## ディレクトリ構成

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml                # GitHub Pages 自動デプロイ用ワークフロー
├── css/
│   └── style.css                    # 3カラムサイドバー・Chrome風ミニマルUIスタイル
├── data/
│   ├── providers/                   # プロバイダ別の正規化済みJSON
│   │   ├── gsj_50k.json
│   │   ├── gsj_seamless_200k.json
│   │   ├── gsj_volcanic.json
│   │   ├── gsj_coastal_seamless.json
│   │   └── hro_eeg.json
│   ├── map_catalog.json             # 統合カタログ（共通スキーマ・全20件）
│   ├── map_index.geojson            # 図郭ポリゴンGeoJSON（19 features）
│   └── map_index.sample.geojson     # 共通スキーマGeoJSONサンプル
├── js/
│   └── app.js                       # 地図・多言語・サジェスト・二階層フィルタ・凡例ルーペ制御
├── scripts/
│   ├── providers/                   # データソースごとの取得・正規化アダプタ
│   │   ├── gsj_50k.py
│   │   ├── gsj_seamless_200k.py
│   │   ├── gsj_volcanic.py
│   │   ├── gsj_coastal_seamless.py
│   │   └── hro_eeg.py
│   ├── schema.py                    # 共通スキーマ定数（map_type/geometry_model）と検証
│   ├── build_map_catalog.py         # GSJ LD HTML & TileJSON取得スクリプト
│   ├── build_geojson.py             # 全プロバイダ統合・検証・GeoJSON生成スクリプト
│   └── serve.py                     # 空きポート自動検出・ブラウザ起動対応ローカルサーバー
├── .gitattributes
├── .gitignore
├── index.html
├── LICENSE
├── README.md
├── requirements.txt
└── start_app.bat                    # Windows ワンクリック起動用ランチャー
```

## ローカルでの起動方法

### Windows（ワンクリック起動）
プロジェクト直下の [start_app.bat](start_app.bat) を実行するだけで、ローカル HTTP サーバーが起動し、既定のブラウザで自動的にアプリが開きます（終了時はコマンドウィンドウを閉じるか `Ctrl + C` を押してください）。

### コマンドラインから起動する場合
`fetch` API を使用するため、ローカル HTTP サーバー経由でアクセスしてください。

```bash
# 付属ランチャー（空きポート自動検出＋ブラウザ自動起動）
python scripts/serve.py

# または標準 http.server / npx
python -m http.server 8000
npx serve .
```

## データの追加・再生成手順

```bash
pip install -r requirements.txt

# 1. GSJ 5万分の1カタログを取得・更新する場合（例: 槍ヶ岳周辺12図幅 + 大河原）
python scripts/build_map_catalog.py \
  --series g050 \
  --map-id 501 502 503 504 505 506 507 508 509 510 511 512 1486 \
  --output data/map_catalog.json

# 2. 全プロバイダを共通スキーマへ正規化・検証し、data/providers/*.json と map_index.geojson を生成
python scripts/build_geojson.py
```

## GitHub Pages での公開手順

本リポジトリには [.github/workflows/pages.yml](.github/workflows/pages.yml) が含まれています。

1. `main` ブランチへプッシュします。
2. GitHub リポジトリの **Settings > Pages** を開き、**Source** で **GitHub Actions** を選択します。
3. ワークフロー完了後、公開 URL からアプリケーションにアクセスできます。

## 出典・ライセンス

- ベースマップ: [国土地理院 地理院タイル（淡色地図・標準地図・シームレス空中写真）](https://maps.gsi.go.jp/development/ichiran.html)
- 地質図データ・凡例: 産業技術総合研究所 地質調査総合センター（政府標準利用規約（第2.0版）準拠 / 20万分の1日本シームレス地質図V2: CC BY 4.0）
- ソフトウェアライセンス: [MIT License](LICENSE)（`LICENSE` 内の `<YOUR_NAME>` をご自身の名前に変更してください）
