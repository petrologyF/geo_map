# 地質図検索 WebGIS

産業技術総合研究所（GSJ）の 5万分の1地質図幅（全 763 図幅）や 20万分の1日本シームレス地質図V2・火山地質図を検索・比較・閲覧できるシングルページ WebGIS アプリケーションです。

## 主な機能

- **フルスクリーン地図＋最小フローティング UI**:
  - **左（検索・一覧ドロワー）**: 略称対応サジェスト（表記ゆれ・複数語 AND 検索）、地図種別・表示範囲内トグル、詳細フィルター（発行年・縮尺・資料有無）、該当図幅一覧。開閉トグルで格納可能。
  - **右下（地図コントロール）**: レイヤー設定（背景地図 白地図/淡色/標準/写真、図郭枠表示、20万分の1シームレス地質図 V2 API v1.2 XYZ タイル＋独立透過度＋地点地質照会）と環境設定（テーマ、言語 `JP`/`EN`、設定リセット）をポップオーバーに集約（`localStorage` に保存）。
  - **右（レイヤー＆凡例インスペクタ）**: 最大 4 図幅の重ね合わせ管理（重ね順・個別透過度・ズーム・削除）と、`[凡例]` `[断面図]` `[詳細・PDF]` タブ（2.8倍ルーペ・シームレス地点地質サマリー対応）。地図を隠さず折りたたみ可能。
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

# 5万分の1地質図幅（g050）を全件取得
python scripts/build_map_catalog.py --all --workers 12

# 全プロバイダを正規化・検証し map_catalog.json / map_index.geojson を再生成
python scripts/build_geojson.py

# スキーマ・データ監査テスト
python -m unittest tests/test_audit_suite.py
```

## 主要ファイル構成

```text
.
├── index.html                  # 画面構造（フルスクリーン地図＋ドロワー・インスペクタ・ポップオーバー）
├── css/style.css               # レイアウト・ライト/ダークテーマ・レスポンシブスタイル
├── js/app.js                   # 地図制御・検索・フィルター・凡例・設定管理
├── data/
│   ├── providers/              # プロバイダ別正規化 JSON（gsj_50k 等）
│   ├── map_catalog.json        # 統合カタログ（770件）
│   └── map_index.geojson       # 図郭ポリゴン GeoJSON（769 features）
├── scripts/
│   ├── providers/              # プロバイダ別アダプタ
│   ├── build_map_catalog.py    # GSJ LD メタデータ・TileJSON 取得
│   ├── build_geojson.py        # 統合・スキーマ検証・GeoJSON 生成
│   ├── schema.py               # 共通スキーマ検証
│   └── serve.py                # ローカル開発サーバー
├── tests/test_audit_suite.py   # データ・スキーマ回帰テスト
└── start_app.bat               # Windows 起動ランチャー
```

## 出典・ライセンス

- **背景地図**: [国土地理院 地理院タイル（白地図・淡色・標準・写真）](https://maps.gsi.go.jp/development/ichiran.html)
- **地質図データ・凡例**: 産業技術総合研究所 地質調査総合センター（政府標準利用規約（第2.0版）準拠 / 20万分の1日本シームレス地質図V2: CC BY 4.0）
- **ソフトウェア**: [MIT License](LICENSE)
