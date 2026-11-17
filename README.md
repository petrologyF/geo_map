# 5万分の1地質図幅検索 WebGIS

Leaflet.js (v1.9.4) と Vanilla JavaScript を用いて構築した、産業技術総合研究所（産総研）の5万分の1地質図幅を検索・閲覧するためのシングルページ WebGIS アプリケーションです。

## 主な機能

- **ベースマップ表示**: 国土地理院の淡色地図をフルスクリーン（`100vw × 100vh`）で表示し、右下にズームコントロール、左下にスケールバーを配置。
- **図郭ポリゴン描画**: `data/map_index.geojson` を非同期読み込みし、図郭インデックスを地図上に描画（ホバー時のハイライトおよび図幅名ツールチップ付き）。
- **即時フィルタリング**:
  - 図幅名（日本語・英語）、著者名、図幅コード、都道府県名による部分一致検索（`/` または `Ctrl+K` / `Cmd+K` で検索欄へフォーカス）。
  - 発行年（開始年〜終了年）による範囲絞り込み。
  - 絞り込み結果の図幅一覧リスト表示およびクリックでの自動ズーム連動。
- **XYZタイル優先オーバーレイ（WMSフォールバック対応） & 凡例表示**:
  - 図幅クリック時に、**TileJSON / XYZタイル**（`tile.webp_template` / `tile.png_template`）が利用可能であれば `L.tileLayer()` で直接オーバーレイ表示します（WMSのみ提供の図幅は `L.tileLayer.wms()` に自動フォールバック）。
  - 選択中図幅の **地質凡例画像（`legend_image_url`）** をサイドパネル内にプレビュー表示（折りたたみ・別タブ拡大対応）。
  - **不透明度スライダー（0%〜100%）**・図幅へのズーム・オーバーレイ解除に対応。
  - ポップアップに書誌情報（図幅名・発行年・著者・発行機関・地域）および詳細情報・説明書PDF・原図JPGへのリンクを表示。

## 技術スタック

- HTML5 / CSS3 / Vanilla JavaScript（フレームワーク不使用）
- [Leaflet.js v1.9.4](https://leafletjs.com/)
- Google Fonts（Noto Sans JP）

## ディレクトリ構成

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml            # GitHub Pages 自動デプロイ用ワークフロー
├── css/
│   └── style.css                # Chrome風ミニマルUIスタイル
├── data/
│   ├── map_index.geojson        # 図幅インデックス（初期データとして「槍ヶ岳」図幅を収録）
│   └── map_index.sample.geojson # 推奨GeoJSONスキーマのサンプル
├── js/
│   └── app.js                   # 地図初期化・フィルタリング・XYZ/WMS・凡例制御
├── .gitignore
├── index.html
├── LICENSE
└── README.md
```

## データ仕様

アプリケーションは `data/map_index.geojson` を読み込みます。推奨スキーマでは `properties` に以下の情報を格納します（従来の `map_name` / `authors` / `wms_url` 形式との後方互換も維持しています）。

- `map_id` / `map_code`: 図幅IDおよびコード（例: `507`, `"G50_10_037yarigatake"`）
- `map_name_ja` / `map_name_en`: 図幅名（日本語・英語）
- `authors_ja` / `authors_en`: 著者配列
- `published_year`: 発行年
- `bounds` / `zoom`: 表示範囲 `[west, south, east, north]` およびズーム範囲 `{ min, max, default }`
- `tile`: `{ webp_template, png_template, tilejson_url, ... }`（XYZタイル情報）
- `legend_image_url` / `original_image_url` / `downloads` / `related_resources`: 凡例・原図・PDF・カタログリンク
- `is_tile_available` / `is_wms_available`: タイル / WMS 利用可否フラグ

## ローカルでの起動方法

`fetch` API を使用して GeoJSON を読み込むため、ローカル HTTP サーバー経由でアクセスしてください（`file://` 直開きでは CORS 制約により動作しません）。

```bash
# Python 3 を使用する場合
python -m http.server 8000

# Node.js (npx) を使用する場合
npx serve .
```

起動後、ブラウザで `http://localhost:8000` を開きます。

## GitHub Pages での公開手順

本リポジトリには `.github/workflows/pages.yml` が含まれています。

1. 必要に応じて `data/map_index.geojson` に図幅を追加して `main` ブランチへプッシュします。
2. GitHub リポジトリの **Settings > Pages** を開き、**Source** で **GitHub Actions** を選択します。
3. ワークフロー完了後、公開 URL からアプリケーションにアクセスできます。

## 出典・ライセンス

- ベースマップ: [国土地理院 地理院タイル（淡色地図）](https://maps.gsi.go.jp/development/ichiran.html)
- 地質図データ・凡例: 産業技術総合研究所 地質調査総合センター（政府標準利用規約（第2.0版）準拠）
- ソフトウェアライセンス: [MIT License](LICENSE)（`LICENSE` 内の `<YOUR_NAME>` をご自身の名前に変更してください）
