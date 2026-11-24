# 地質図検索 WebGIS

産業技術総合研究所（GSJ）の 5万分の1地質図幅（全 763 図幅）や 20万分の1日本シームレス地質図V2・火山地質図を検索・比較・閲覧できるシングルページ WebGIS アプリケーションです。

## 主な機能

- **フルスクリーン地図＋最小フローティング UI**:
  - **左（検索・一覧ドロワー）**: `[地質図 | 巡検スポット]` タブ切替に対応。地質図では略称対応サジェスト（表記ゆれ・複数語 AND 検索）、地図種別・表示範囲内トグル、詳細フィルター（発行年・縮尺・資料有無）、該当図幅一覧。巡検スポットでは年・コース・キーワード絞り込み、コース一覧→Stop一覧の階層表示。開閉トグルで格納可能。
  - **右下（地図コントロール）**: 巡検スポット 1 タッチ ON/OFF ボタン、現在地へ拡大移動ボタン、レイヤー設定（背景地図 白地図/淡色/標準/写真、図郭枠表示、20万分の1シームレス地質図 V2 API v1.2 XYZ タイル＋独立透過度＋地点地質照会）と環境設定（テーマ、言語 `JP`/`EN`、1回のスクロール量、地質図初期透過度、スケールバー・巡検ルート線表示、設定リセット）を集約（`localStorage` に保存）。
  - **右（レイヤー＆凡例インスペクタ）**: 最大 4 図幅の重ね合わせ管理（重ね順・個別透過度・ズーム・削除）と、`[凡例]` `[断面図]` `[詳細・PDF]` タブ（2.8倍ルーペ・シームレス地点地質サマリー対応）。地図を隠さず折りたたみ可能。
  - **日本地質学会「巡検スポット」レイヤー**: 広域表示時はピクセル距離ベースの自動クラスタリング（`Nコース` 集約ピル）＋LOD表示を行い、クリックで単一コースを展開（全 Stop フィット・破線ルート・コース基本情報カード＆「巡検案内書を開く」リンク常時表示・Stop ポップアップ内前後地点ナビゲーション）。
  - **URL パーマリンク（状態共有）**: 地図位置（`lat`, `lng`, `z`）、表示中オーバーレイ（`maps`）、シームレス V2（`seamless=1`）、展開中巡検コース（`trip`）を URL ハッシュへ自動同期し、リロード・共有時に復元。
- **ショートカット**: `/` または `Ctrl+K`（検索フォーカス）、`Esc`（サジェスト・ポップオーバー閉じ）

## 起動方法

`fetch` API を使用するため、ローカル HTTP サーバー経由で開いてください。

- **Windows**: [start_app.bat](start_app.bat) を実行
- **CLI**:
  ```bash
  python scripts/serve.py
  ```

## データ更新・テスト

```bash
pip install -r requirements.txt

# 5万分の1地質図幅（g050）を全件取得（リトライ・レート制御・差分スキップ対応）
python scripts/build_map_catalog.py --all --workers 12 --skip-existing

# 全プロバイダおよび巡検スポット CSV を正規化・検証し map_catalog.json / map_index.geojson / field_trips.geojson / REVIEW_BUNDLE.md を再生成
python scripts/build_geojson.py

# 全単体・監査テストを実行
python -m unittest discover -s tests -p "test_*.py"
```

### 巡検スポット（`data/field_trips.csv`）の更新方法

`data/field_trips.csv`（UTF-8・ヘッダー行あり）を編集したあと、`python scripts/build_geojson.py` と `python -m unittest discover -s tests -p "test_*.py"` を実行して `data/field_trips.geojson` を再生成してください。

- **ID 命名規則**: `大会年_巡検名略称_地点no._地点名略称`（例: `2026_能登半島_01_福浦灯台下`）
- **主なカラム**: `id`, `year`, `course_abbr`, `course_name`, `stop_no`, `stop_abbr`, `stop_name`, `lat`, `lon`, `guidebook_url`, `authors`, `description`

## 主要ファイル構成

```text
.
├── index.html                  # 画面構造（フルスクリーン地図＋ドロワー・インスペクタ・ポップオーバー）
├── css/style.css               # レイアウト・ライト/ダークテーマ・レスポンシブスタイル
├── js/                         # ネイティブ ES Modules（ビルド不要）
│   ├── main.js                 # エントリポイント・イベント登録・言語切替
│   ├── config.js               # アプリ設定定数・英語表記マッピング
│   ├── state.js                # 状態・DOMキャッシュ・localStorage永続化
│   ├── i18n.js                 # 日英UI辞書
│   ├── normalize.js            # 共通スキーマ正規化・文字列正規化・URL検証
│   ├── permalink.js            # URLハッシュ（#lat&lng&z&maps&seamless&trip）同期・復元
│   ├── map.js                  # Leaflet初期化・ベースマップ・現在地・テーマ・UI同期
│   ├── inspector.js            # 右インスペクタ・オーバーレイ管理・凡例ルーペ
│   ├── seamless.js             # 20万分の1シームレス地質図V2＋地点地質照会
│   ├── fieldTrips.js           # 巡検スポット（クラスタリング・LOD・前後ナビ・操作バー）
│   └── search.js               # 図幅検索・サジェスト・各種フィルタ
├── data/
│   ├── providers/              # プロバイダ別正規化 JSON（gsj_50k, gsj_seamless_200k 等）
│   ├── seeds/                  # 外部化シードJSON（gsj_volcanic, gsj_coastal_seamless）
│   ├── field_trips.csv         # 日本地質学会 巡検スポットマスター CSV
│   ├── field_trips.geojson     # 巡検スポット GeoJSON（build_geojson.py でコンパクト生成）
│   ├── map_catalog.json        # 統合カタログ（770件）
│   └── map_index.geojson       # 図郭ポリゴン GeoJSON（769 features）
├── scripts/
│   ├── providers/              # プロバイダ別アダプタ（common, gsj_50k, field_trips 等）
│   ├── build_map_catalog.py    # GSJ LD メタデータ・TileJSON 取得
│   ├── build_geojson.py        # 統合・スキーマ検証・GeoJSON 生成（--skip-bundle 対応）
│   ├── build_review_bundle.py  # REVIEW_BUNDLE.md 自動生成
│   ├── schema.py               # 共通・巡検スキーマ検証
│   └── serve.py                # ローカル開発サーバー
├── tests/
│   ├── test_audit_suite.py     # データ・スキーマ回帰テスト
│   └── test_build_map_catalog.py # 取得スクリプト・シード単体テスト
├── REVIEW_BUNDLE.md            # 主要コード・統計のレビュー用自動生成バンドル
└── start_app.bat               # Windows 起動ランチャー
```

## 出典・ライセンス

- **背景地図**: [国土地理院 地理院タイル（白地図・淡色・標準・写真）](https://maps.gsi.go.jp/development/ichiran.html)
- **地質図データ・凡例**: 産業技術総合研究所 地質調査総合センター（政府標準利用規約（第2.0版）準拠 / 20万分の1日本シームレス地質図V2: CC BY 4.0）
- **ソフトウェア**: [MIT License](LICENSE)
