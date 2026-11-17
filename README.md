# 5万分の1地質図幅検索 WebGIS

Leaflet.js (v1.9.4) と Vanilla JavaScript を用いて構築した、産業技術総合研究所（産総研）の5万分の1地質図幅を検索・閲覧するためのシングルページ WebGIS アプリケーションです。

## 主な機能

- **ベースマップ表示・切り替え**:
  - 初期表示は国土地理院の淡色地図をフルスクリーン（`100vw × 100vh`）で表示し、右下にズームコントロール、左下にスケールバーを配置。
  - 検索パネル内から **淡色地図 / 標準地図 / 航空写真（シームレス空中写真）** をワンクリックで切り替え可能。
- **図郭ポリゴン描画**: `data/map_index.geojson` を非同期読み込みし、図郭インデックスを地図上に描画（ホバー時のハイライトおよび図幅名・発行年ツールチップ付き）。
- **検索サジェスト & 即時フィルタリング**:
  - 検索欄への入力・フォーカス時に **図幅名・著者名のサジェスト候補（種別バッジ付き）** を表示（`↑`/`↓` キーで選択、`Enter` で確定、`Esc` で閉じる、`/` または `Ctrl+K` / `Cmd+K` で検索欄へフォーカス）。
  - 図幅名（日本語・英語）、著者名、図幅コード、都道府県名による部分一致検索と、発行年（開始年〜終了年）による範囲絞り込みに対応。
  - 絞り込み結果の図幅一覧リスト表示、および **表示中の全図幅へ戻る（全体表示）** ボタンを搭載。
- **XYZタイル優先オーバーレイ（WMSフォールバック対応）**:
  - 図幅クリック時に、**TileJSON / XYZタイル**（`tile.webp_template` / `tile.png_template`）が利用可能であれば `L.tileLayer()` で直接オーバーレイ表示します（WMSのみ提供の図幅は `L.tileLayer.wms()` に自動フォールバック）。
  - **不透明度スライダー（0%〜100%）**・図幅へのズーム・オーバーレイ解除に対応。
  - ポップアップに書誌情報（図幅名・発行年・著者・発行機関・地域）および詳細情報（GSJ Linked Data メタデータHTML）・説明書PDF・原図JPGへのリンクを表示。
- **右手フローティング地質凡例パネル**:
  - 画面右上に独立した凡例パネルを配置し、**現在画面内で最も広く表示されている図幅の凡例**を地図移動・ズームに合わせて自動で切り替えて表示（折りたたみ・別タブ拡大表示対応）。

## 技術スタック

- HTML5 / CSS3 / Vanilla JavaScript（フレームワーク不使用）
- [Leaflet.js v1.9.4](https://leafletjs.com/)
- Google Fonts（Noto Sans JP）
- Python 3（カタログ生成・ローカルサーバーランチャー）

## ディレクトリ構成

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml            # GitHub Pages 自動デプロイ用ワークフロー
├── css/
│   └── style.css                # Chrome風ミニマルUIスタイル
├── data/
│   ├── map_catalog.json         # GSJメタデータから生成した図幅カタログ
│   ├── map_index.geojson        # 図幅インデックス（槍ヶ岳周辺12図幅を収録）
│   └── map_index.sample.geojson # 推奨GeoJSONスキーマのサンプル
├── js/
│   └── app.js                   # 地図初期化・サジェスト・フィルタ・XYZ/WMS・凡例制御
├── scripts/
│   ├── build_map_catalog.py     # GSJメタデータ & TileJSON取得・GeoJSON生成スクリプト
│   └── serve.py                 # 空きポート自動検出・ブラウザ起動対応ローカルサーバー
├── .gitattributes
├── .gitignore
├── index.html
├── LICENSE
├── README.md
├── requirements.txt
└── start_app.bat                # Windows ワンクリック起動用ランチャー
```

## ローカルでの起動方法

### Windows（ワンクリック起動）
プロジェクト直下の [start_app.bat](start_app.bat) をダブルクリック（またはクリック）するだけで、ローカル HTTP サーバーが起動し、既定のブラウザで自動的にアプリが開きます（終了時は開いたコマンドウィンドウを閉じるか `Ctrl + C` を押してください）。

### コマンドラインから起動する場合
`fetch` API を使用して GeoJSON を読み込むため、ローカル HTTP サーバー経由でアクセスしてください（`file://` 直開きでは CORS 制約により動作しません）。

```bash
# 付属のランチャーを使う場合（自動で空きポート検出しブラウザを起動）
python scripts/serve.py

# 標準の http.server や npx を使う場合
python -m http.server 8000
# または
npx serve .
```

## 図幅データの追加・更新方法

`scripts/build_map_catalog.py` を使うと、GSJ Linked Data のメタデータ HTML と TileJSON から `map_catalog.json` および `map_index.geojson` を自動生成できます。

```bash
pip install -r requirements.txt

python scripts/build_map_catalog.py \
  --map-id 501 502 503 504 505 506 507 508 509 510 511 512 \
  --output data/map_catalog.json \
  --geojson-output data/map_index.geojson
```

## GitHub Pages での公開手順

本リポジトリには `.github/workflows/pages.yml` が含まれています。

1. `main` ブランチへプッシュします。
2. GitHub リポジトリの **Settings > Pages** を開き、**Source** で **GitHub Actions** を選択します。
3. ワークフロー完了後、公開 URL からアプリケーションにアクセスできます。

## 出典・ライセンス

- ベースマップ: [国土地理院 地理院タイル（淡色地図・標準地図・シームレス空中写真）](https://maps.gsi.go.jp/development/ichiran.html)
- 地質図データ・凡例: 産業技術総合研究所 地質調査総合センター（政府標準利用規約（第2.0版）準拠）
- ソフトウェアライセンス: [MIT License](LICENSE)（`LICENSE` 内の `<YOUR_NAME>` をご自身の名前に変更してください）
