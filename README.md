# 5万分の1地質図幅検索 WebGIS

Leaflet.js (v1.9.4) と Vanilla JavaScript を用いて構築した、産業技術総合研究所（産総研）の5万分の1地質図幅を検索・閲覧するためのシングルページ WebGIS アプリケーションです。

## 主な機能

- **ベースマップ表示**: 国土地理院の淡色地図をフルスクリーン（`100vw × 100vh`）で表示し、右下にズームコントロール、左下にスケールバーを配置。
- **図郭ポリゴン描画**: `data/map_index.geojson` を非同期読み込みし、図郭インデックスを地図上に描画（ホバー時のハイライトおよび図幅名ツールチップ付き）。
- **即時フィルタリング**:
  - 図幅名または著者名による部分一致検索（`/` または `Ctrl+K` / `Cmd+K` で検索欄へフォーカス）。
  - 発行年（開始年〜終了年）による範囲絞り込み。
  - 絞り込み結果の図幅一覧リスト表示およびクリックでの自動ズーム連動。
- **WMSオーバーレイ & 属性ポップアップ**:
  - ポリゴン（またはリスト項目）をクリックすると、図幅名・発行年・著者のポップアップを表示すると同時に、該当図幅の WMS レイヤー（`geo_A`）を地図上に重ね合わせます。
  - 選択中WMSの **不透明度スライダー（0%〜100%）**・図幅へのズーム・オーバーレイ解除に対応。

## 技術スタック

- HTML5 / CSS3 / Vanilla JavaScript（フレームワーク不使用）
- [Leaflet.js v1.9.4](https://leafletjs.com/)
- Google Fonts（Noto Sans JP）

## ディレクトリ構成

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Pages 自動デプロイ用ワークフロー
├── css/
│   └── style.css              # Chrome風ミニマルUIスタイル
├── data/
│   └── map_index.sample.geojson # GeoJSONサンプル（本番では map_index.geojson を配置）
├── js/
│   └── app.js                 # 地図初期化・フィルタリング・WMS制御ロジック
├── .gitignore
├── index.html
├── LICENSE
└── README.md
```

## データ準備

アプリケーションは `data/map_index.geojson` を読み込みます。サンプルファイル [data/map_index.sample.geojson](data/map_index.sample.geojson) を参考に、以下のプロパティを持つ GeoJSON（`FeatureCollection`）を `data/map_index.geojson` として配置してください。

| プロパティ名 | 型 | 説明 |
| --- | --- | --- |
| `map_name` | String | 図幅名 |
| `published_year` | Number | 発行年 |
| `authors` | String | 著者名 |
| `wms_url` | String | 対象図幅の WMS エンドポイント URL（レイヤー名 `geo_A` を配信するもの） |

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

1. `data/map_index.geojson` をリポジトリに追加して `main` ブランチへプッシュします。
2. GitHub リポジトリの **Settings > Pages** を開き、**Source** で **GitHub Actions** を選択します。
3. ワークフロー完了後、公開 URL からアプリケーションにアクセスできます。

## 出典・ライセンス

- ベースマップ: [国土地理院 地理院タイル（淡色地図）](https://maps.gsi.go.jp/development/ichiran.html)
- ソフトウェアライセンス: [MIT License](LICENSE)（`LICENSE` 内の `<YOUR_NAME>` をご自身の名前に変更してください）
