# REVIEW_BUNDLE — 地質図検索 WebGIS レビュー用バンドル

> 自動生成日時: `2026-11-29 00:21:04`（`scripts/build_review_bundle.py` / `scripts/build_geojson.py` / Git pre-commit により自動更新）

## 1. プロジェクト概要・データ統計

産業技術総合研究所（GSJ）の地質図幅・20万分の1シームレス地質図V2・火山地質図および日本地質学会の年次大会「巡検スポット」を統合閲覧できるシングルページ WebGIS アプリケーションです。

- **地質図カタログ (`data/map_catalog.json`)**: 770 件
- **図郭 GeoJSON (`data/map_index.geojson`)**: 769 features
- **巡検スポット CSV (`data/field_trips.csv`)**: 1257 地点（165 コース）
- **巡検スポット GeoJSON (`data/field_trips.geojson`)**: 1257 features

## 2. 日本地質学会 巡検コース一覧

| 年 | コース略称 | 巡検正式名称 | 地点数 | 著者 | 案内書 URL |
|---|---|---|---:|---|---|
| 2026 | 飛騨帯 | 飛騨帯の変成岩と深成岩：東アジア大陸縁における地殻進化 | 6 | 水上 知行, 三上 航大, 沢田 輝 | [Link](https://doi.org/10.5575/geosoc.2026.0012) |
| 2026 | 能登半島地震 | 令和6年能登半島地震に伴う海岸隆起と地表変状 | 5 | 立石 良, 安江 健一, ジェンキンズ ロバート | [Link](https://doi.org/10.5575/geosoc.2026.0013) |
| 2026 | 能登半島 | 日本海拡大期を跨ぐ能登半島火山活動の変遷 | 10 | 海野 進, 田村 明弘, 森下 知晃 | [Link](https://doi.org/10.5575/geosoc.2026.0019) |
| 2026 | 弥陀ヶ原火山 | 弥陀ヶ原火山 | 8 | 石﨑 泰男, 亀谷 伸子, 中村 文哉, 増渕 佳子 | [Link](https://doi.org/10.5575/geosoc.2026.0011) |
| 2026 | 大桑層 | 下部第四系大桑層に見られる堆積シーケンスと貝化石群集の周期的変化 | 3 | 北村 晃寿 | [Link](https://doi.org/10.5575/geosoc.2026.0020) |
| 2025 | 黒瀬川帯 | 九州中部の黒瀬川帯にみられるシルル紀から石炭紀の化石群 | 3 | 田中 源吾 | [Link](https://doi.org/10.5575/geosoc.2025.0010) |
| 2025 | 阿蘇火山 | 阿蘇火山の地質：カルデラ形成噴火と後カルデラ活動 | 6 | 宮縁 育夫, 星住 英夫 | [Link](https://doi.org/10.5575/geosoc.2025.0029) |
| 2025 | 長崎変成岩 | 長崎変成岩西彼杵ユニット中の蛇紋岩メランジュ：超高圧変成岩を含む雪浦メランジュとヒスイ輝石岩を産する三重メランジュ | 16 | 西山 忠男, 森 康, 重野 未来, 森部 陽介, 西 右京 | [Link](https://doi.org/10.5575/geosoc.2025.0018) |
| 2025 | 秩父帯 | 九州東部に分布する秩父帯のジュラ紀付加体:ペルム紀〜三畳紀のパンサラッサ海古海洋環境変動 | 9 | 尾上 哲治, 武藤 俊, 冨松 由希 | [Link](https://doi.org/10.5575/geosoc.2025.0011) |
| 2025 | 熊本地震 | 2016年熊本地震と布田川断層，地震地質災害 | 7 | 鳥井 真之, 奥野 充, 遠田 晋次 | [Link](https://doi.org/10.5575/geosoc.2025.0026) |
| 2025 | 御船層群 | 御船層群と御船町恐竜博物館 | 4 | 池上 直樹 | [Link](https://doi.org/10.5575/geosoc.2025.0025) |
| 2025 | 姫浦層群 | 天草上島および宇土半島に分布する上部白亜系姫浦層群の堆積相－海底扇状地の堆積プロセス－ | 6 | 成瀬 元, 小松 俊文 | [Link](https://doi.org/10.5575/geosoc.2025.0027) |
| 2025 | 北部九州バソリス | 白亜紀北部九州バソリス：高マグネシウム閃緑岩の産状と深成岩類のマグマ供給システム | 6 | 江島 圭祐 | [Link](https://doi.org/10.5575/geosoc.2025.0024) |
| 2024 | 鳥海山 | 火山噴火と自然、文化との関わり–鳥海山・飛島ジオパーク | 8 | 大野 希一 | [Link](https://doi.org/10.5575/geosoc.2024.0024) |
| 2024 | 阿武隈山地東縁 | 阿武隈山地東縁を探る：南部北上帯の高圧型片岩類と横ずれ剪断帯のフィールドガイド | 5 | 辻森 樹, 武藤 潤, 横山 裕晃, 志関 弘平 | [Link](https://doi.org/10.5575/geosoc.2024.0022) |
| 2024 | 蔵王鉱山 | 蔵王火山西部蔵王沢上流部，蔵王鉱山跡地周辺の火山・鉱床地質：かつて存在した火山熱水系の痕跡 | 4 | 井村 匠 | [Link](https://doi.org/10.5575/geosoc.2024.0016) |
| 2024 | 蔵王火山 | 蔵王火山山頂エリア | 5 | 伴 雅雄, 北川 桐香 | [Link](https://doi.org/10.5575/geosoc.2024.0019) |
| 2024 | 松島湾 | 松島湾地域の地質と地形－日本海拡大から現在までの東北日本前弧域の地質・地形の発達－ | 8 | 髙嶋 礼詩 | [Link](https://doi.org/10.5575/geosoc.2024.0017) |
| 2024 | 月山 | 月山周辺の地形･地質災害と変動地形 | 10 | 八木 浩司 | [Link](https://doi.org/10.5575/geosoc.2024.0020) |
| 2024 | 山形県南西部 | 山形県南西部の中新統と令和4年8月豪雨災害 | 6 | 星 博幸, 本山 功 | [Link](https://doi.org/10.5575/geosoc.2024.0018) |
| 2023 | 琵琶湖西岸 | 琵琶湖西岸に分布する後期白亜紀花崗岩体と岩脈類 | 8 | 多賀 優, 貴治 康夫, 杉井 完治 | [Link](https://doi.org/10.5575/geosoc.2023.0019) |
| 2023 | 瀬戸内区中新統 | 瀬戸内区中新統：鮎河層群と綴喜層群 | 5 | 入月 俊明, 栗原 行人 | [Link](https://doi.org/10.5575/geosoc.2023.0003) |
| 2023 | 淀川 | 淀川の氾濫と河川改修 | 7 | 三田村 宗樹 | [Link](https://doi.org/10.5575/geosoc.2023.0007) |
| 2023 | 丹波-篠山 | 丹波-篠山地域の超丹波帯の岩相と丹波帯の遠洋深海相のPT境界 | 7 | 菅森 義晃, 桑原 希世子, 竹村 静夫 | [Link](https://doi.org/10.5575/geosoc.2023.0020) |
| 2023 | チバニアン | チバニアンGSSPサイトと陸化した前弧海盆上総層群の層序 | 4 | 岡田 誠, 羽田 裕貴 | [Link](https://doi.org/10.5575/geosoc.2022.0060) |
| 2022 | 関東山地御荷鉾 | 関東山地東縁部の御荷鉾緑色岩類と北部秩父帯柏木ユニットの海洋性岩石およびクリッペ説の検証 | 6 | 原 英俊, 冨永 紘平 | [Link](https://doi.org/10.5575/geosoc.2022.0016) |
| 2022 | 銚子テフラ | 千葉県東部，銚子周辺地域の鮮新-更新世テフラと銚子ジオパーク | 9 | 植木 岳雪, 田村 糸子, 岩本 直哉 | [Link](https://doi.org/10.5575/geosoc.2022.0032) |
| 2022 | 房総半島東部 | 房総半島東部，上総層群下部に記録された前弧テクトニクスと海底地すべり | 4 | 宇都宮 正志, 大坪 誠 | [Link](https://doi.org/10.5575/geosoc.2022.0025) |
| 2022 | 御坂巨摩黒鉱鉱床 | 御坂・巨摩山地の黒鉱鉱床：衝突した伊豆弧の海底熱水鉱床 | 8 | 浦辺 徹郎, 伊藤 谷生, 藤本 光一郎 | [Link](https://doi.org/10.5575/geosoc.2022.0045) |
| 2022 | 伊豆大島火山 | 伊豆大島火山：玄武岩質火山でみる噴火史とジオパーク | 10 | 鈴木 毅彦, 臼井 里佳 | [Link](https://doi.org/10.5575/geosoc.2022.0031) |
| 2022 | 下仁田ジオパーク | 多様な地質環境が生み出した下仁田の文化：下仁田ジオパークみどころめぐり | 10 | 関谷 友彦, 保科 裕 | [Link](https://doi.org/10.5575/geosoc.2022.0044) |
| 2022 | 三浦半島上総層群 | 三浦半島北部の上総層群の地質と冷湧水性化学合成化石群集 | 11 | 野崎 篤, 宇都宮 正志 | [Link](https://doi.org/10.5575/geosoc.2022.0030) |
| 2022 | ジオパーク秩父 | ジオパーク秩父のジオ多様性 | 8 | 高木 秀雄, 吉田 健一 | [Link](https://doi.org/10.5575/geosoc.2022.0010) |
| 2021 | 舟伏山美濃帯 | 舟伏山地域の美濃帯海洋性岩石の層序と年代 | 6 | 佐野 弘好, 山縣 毅 | [Link](https://doi.org/10.5575/geosoc.2020.0013) |
| 2021 | 紀伊半島四万十三波川 | 紀伊半島中央部の四万十帯と三波川帯の地質トラバース | 9 | 志村 侑亮, 常盤 哲也, 竹内 誠 | [Link](https://doi.org/10.5575/geosoc.2020.0019) |
| 2021 | 瀬戸層群陶土 | 中新統～更新統瀬戸層群の陸成層と陶土 | 3 | 葉田野 希, 吉田 孝紀, 笹尾 英嗣 | [Link](https://doi.org/10.5575/geosoc.2020.0028) |
| 2021 | 揖斐川春日 | 岐阜県西部・揖斐川町春日地域の火成岩と接触変成岩 | 4 | 榎並 正樹, 纐纈 佑衣, 加藤 丈典, 壷井 基裕, 丹羽 健文 | [Link](https://doi.org/10.5575/geosoc.2021.0010) |
| 2021 | 師崎層群 | 中新統師崎層群の球状炭酸塩コンクリーションと深海性動物群化石 | 3 | 村宮 悠介, 氏原 温, 大路 樹生, 吉田 英一 | [Link](https://doi.org/10.5575/geosoc.2020.0017) |
| 2021 | 名古屋城石垣 | 名古屋城石垣に使われている石材の岩石種 | 9 | 西本 昌司, 木村 有作 | [Link](https://doi.org/10.5575/geosoc.2020.0018) |
| 2021 | 古琵琶湖動物群 | 古琵琶湖層群の鮮新世動物群 | 6 | 松岡 敬二, 井上 恵介, 川瀬 基弘 | [Link](https://doi.org/10.5575/geosoc.2020.0020) |
| 2019 | 美祢豊浦層群 | 山口県西部に分布する三畳系美祢層群とジュラ系豊浦層群の層序と化石群 | 1 | 前田 晴良, 大山 望 | [Link](https://doi.org/10.5575/geosoc.2019.0020) |
| 2019 | 秋吉石灰岩カルスト | 石炭－ペルム系秋吉石灰岩の堆積作用とカルスト化作用 | 12 | 藤川 将之, 中澤 努, 上野 勝美 | [Link](https://doi.org/10.5575/geosoc.2019.0024) |
| 2019 | 秋吉台鉱山 | 秋吉台石灰石鉱山（住友セメント秋芳鉱山）と宇部沖の山Coal Centerの見学 | 7 | 千々和 一豊, 播磨 雄太, 岡藤 考 | [Link](https://doi.org/10.5575/geosoc.2019.0028) |
| 2019 | 津和野花崗岩 | 津和野地域の古原生代花崗岩類と高塩濃度深部流体 | 10 | 木村 光佑, 早坂 康隆, 田中 和広, 村上 裕晃 | [Link](https://doi.org/10.5575/geosoc.2019.0027) |
| 2019 | 山口白亜紀カルデラ | 山口県中央部の後期白亜紀カルデラ群の地質：吉部，山口，生雲，佐々並カルデラ | 8 | 今岡 照喜, 井川 寿之, 岸 司, 木村 元, 大中 翔平, 西川 裕輔, 小室 裕明 | [Link](https://doi.org/10.5575/geosoc.2019.0019) |
| 2019 | 山口北西部地すべり | 山口県北西部における地すべりの地質と防災対策 | 5 | 河内 義文, 久永 喜代志, 金折 裕司, 森山 亮一 | [Link](https://doi.org/10.5575/geosoc.2019.0038) |
| 2019 | 山口出雲活断層 | 山口-出雲地震帯西部に沿って新たに発見された活断層系 | 5 | 金折 裕司, 相山 光太郎 | [Link](https://doi.org/10.5575/geosoc.2019.0006) |
| 2018 | 蝦夷層群OAE | 蝦夷層群下部～中部に記録された白亜紀中頃の温暖化と古環境変動 | 6 | 高嶋 礼詩, 佐野 晋一, 林 圭一 | [Link](https://doi.org/10.5575/geosoc.2018.0014) |
| 2018 | 神居古潭帯 | 神居古潭帯のテクトニクス：白亜紀の沈み込みチャネルから前弧海盆堆積物まで | 10 | 竹下 徹, 平島 崇男, 植田 勇人, 岡本 あゆみ, 木下 周祐, 辛 ウォンジ, 幸田 龍星, 安藤 瑞帆, 中山 貴仁 | [Link](https://doi.org/10.5575/geosoc.2018.0041) |
| 2018 | 石狩低地帯テフラ | 南西北海道，石狩低地帯におけるテフラ層序学：支笏-洞爺火山地域の噴火履歴 | 6 | 中川 光弘, 宮坂 瑞穂, 三浦 大助, 上澤 真平 | [Link](https://doi.org/10.5575/geosoc.2018.0038) |
| 2018 | 日高海岸中新統 | 北海道日高海岸地域の中部～上部中新統前縁盆地埋積物の堆積システムと石油地質 | 8 | 加瀬 善洋, 川上 源太郎, 高野 修 | [Link](https://doi.org/10.5575/geosoc.2018.0043) |
| 2018 | 日高変成帯南部 | 日高変成帯南部の日高深成変成岩類 | 6 | 高橋 浩, 志村 俊昭, 加藤 聡美 | [Link](https://doi.org/10.5575/geosoc.2018.0025) |
| 2018 | 小樽石材 | 小樽の地質と石材 | 7 | 仁科 健二, 松田 義章, 松枝 大治, 竹内 勝治, 大鐘 卓哉, 菅原 慶郎, 高見 雅三, 北嶋 徹 | [Link](https://doi.org/10.5575/geosoc.2018.0073) |
| 2018 | 千島海溝津波痕跡 | 千島海溝沿岸域において認められる超巨大地震津波痕跡群と広域地殻変動 | 9 | 七山 太, 渡辺 和明, 重野 聖之, 石井 正之, 石渡 一人, 猪熊 樹人 | [Link](https://doi.org/10.5575/geosoc.2018.0013) |
| 2017 | 関川岩石鉱物 | 関川の岩石鉱物 | 4 | 皆川 鉄雄, 佐野 栄 | [Link](https://doi.org/10.5575/geosoc.2017.0025) |
| 2017 | 松山瀬戸内火山岩 | 松山市周辺の瀬戸内火山岩類－高Mg安山岩から珪長質岩まで－ | 9 | 新正 裕尚, 齊藤 哲 | [Link](https://doi.org/10.5575/geosoc.2017.0048) |
| 2017 | 岩国柳井領家帯 | 岩国-柳井地域の領家帯：島弧地殻における花崗岩質マグマの生成と流体の挙動 | 4 | 寺林 優, 山本 啓司, 亀井 淳志 | [Link](https://doi.org/10.5575/geosoc.2017.0050) |
| 2017 | 四国西部中央構造線 | 四国西部の中央構造線断層帯の地形と地質 | 8 | 池田 倫治, 後藤 秀昭, 堤 浩之 | [Link](https://doi.org/10.5575/geosoc.2017.0036) |
| 2017 | 四国西予ジオパーク | 黒瀬川構造帯の模式地と四国西部の秩父帯を巡る：四国西予ジオパーク | 7 | 村田 明広, 髙橋 司 | [Link](https://doi.org/10.5575/geosoc.2017.0043) |
| 2017 | 久万三崎層群 | 久万層群と三崎層群：日本海拡大期の西南日本弧前弧中新統が記録するもの | 9 | 奈良 正和, 楠橋 直, 岡本 隆, 今井 悟 | [Link](https://doi.org/10.5575/geosoc.2017.0035) |
| 2017 | 三波川帯トラバース | 三波川帯トラバース：最浅部変成岩から最深部超苦鉄質岩まで | 10 | 青矢 睦月, 水上 知行, 遠藤 俊祐 | [Link](https://doi.org/10.5575/geosoc.2017.0038) |
| 2016 | 関東山地秩父帯北帯 | 関東山地秩父帯北帯の地質 | 13 | 久田 健一郎, 冨永 紘平, 関根 一昭, 松岡 喜久次, 加藤 潔 | [Link](https://doi.org/10.5575/geosoc.2016.0026) |
| 2016 | 関東山地北縁部 | 関東山地北縁部の低角度構造境界 | 14 | 高木 秀雄, 新井 宏嘉, 宮下 敦 | [Link](https://doi.org/10.5575/geosoc.2016.0028) |
| 2016 | 関東南部上総層群 | 関東平野南部における上総層群のテフロクロノロジー | 5 | 鈴木 毅彦, 白井 正明, 福嶋 徹 | [Link](https://doi.org/10.5575/geosoc.2016.0029) |
| 2016 | 葉山嶺岡帯 | 葉山-嶺岡帯トラバース | 12 | 高橋 直樹, 柴田 健一郎, 平田 大二, 新井田 秀一 | [Link](https://doi.org/10.5575/geosoc.2016.0035) |
| 2016 | 群馬吾妻火山岩 | 群馬県吾妻地域における中期中新世以降の火山岩類と変質 | 9 | 中村 庄八, 藤本 光一郎, 中山 俊雄, 方違 重治 | [Link](https://doi.org/10.5575/geosoc.2016.0037) |
| 2016 | 房総南部関東地震 | 房総半島南部沿岸の海岸段丘と津波堆積物に記録された関東地震の履歴 | 6 | 宍倉 正展, 鎌滝 孝信, 藤原 治 | [Link](https://doi.org/10.5575/geosoc.2016.0031) |
| 2016 | 房総南部付加体 | 付加型沈み込み帯浅部の地質構造：房総半島南部付加体-被覆層システム | 8 | 山本 由弦, 千代延 俊, 神谷 奈々, 濱田 洋平, 斎藤 実篤 | [Link](https://doi.org/10.5575/geosoc.2016.0057) |
| 2016 | 富士山麓防災 | 富士山山麓を巡る：火山地質から防災を考える | 10 | 山元 孝広, 高田 亮, 吉本 充宏, 千葉 達朗, 荒井 健一, 細根 清治 | [Link](https://doi.org/10.5575/geosoc.2016.0036) |
| 2016 | 千葉市旧海岸線 | 千葉市の昔の海岸線を歩く | 7 | 米澤 正弘 | [Link](https://doi.org/10.5575/geosoc.2016.0038) |
| 2016 | 伊豆白浜層群 | 伊豆半島南部の新第三系白浜層群に見られる浅海底火山活動と堆積・造構過程との相互作用 | 8 | 狩野 謙一, 伊藤 谷生 | [Link](https://doi.org/10.5575/geosoc.2016.0039) |
| 2016 | 丹沢山地 | 丹沢山地の地質：伊豆衝突帯のジオダイナミクス | 10 | 石川 正弘, 谷 健一郎, 桑谷 立, 金丸 龍夫, 小林 健太 | [Link](https://doi.org/10.5575/geosoc.2016.0030) |
| 2015 | 鹿島槍爺ヶ岳カルデラ | 北アルプス鹿島槍ヶ岳-爺ヶ岳に露出する，直立した第四紀陥没カルデラ−黒部川花崗岩コンプレックス：短縮テクトニクスによる傾動山脈隆起の典型例 | 5 | 原山 智 | [Link](https://doi.org/10.5575/geosoc.2015.0027) |
| 2015 | 長野盆地西縁断層 | 長野盆地西縁の変動地形と活断層 | 6 | 杉戸 信彦, 廣内 大助, 塩野 敏昭 | [Link](https://doi.org/10.5575/geosoc.2015.0013) |
| 2015 | 蓮華変成岩 | 蓮華変成岩類と中生代陸成層 | 10 | 竹内 誠, 竹之内 耕, 常盤 哲也 | [Link](https://doi.org/10.5575/geosoc.2015.0018) |
| 2015 | 戸隠地質化石館 | 戸隠地域の新第三系−第四系と戸隠地質化石博物館 | 6 | 田辺 智隆 | [Link](https://doi.org/10.5575/geosoc.2015.0026) |
| 2015 | 四阿火山 | 四阿火山：成層火山体の開析地形とその利用 | 7 | 竹下 欣宏, 西来 邦章, 富樫 均 | [Link](https://doi.org/10.5575/geosoc.2015.0016) |
| 2015 | 和田峠黒曜岩 | 和田峠黒曜岩と石器 | 4 | 牧野 州明, 高橋 康, 中村 由克, 向井 理史, 法橋 陽美, 津金 達郎 | [Link](https://doi.org/10.5575/geosoc.2015.0019) |
| 2015 | 北部フォッサマグナ | 北部フォッサマグナ新第三系の斜面前進過程と堆積シーケンス | 7 | 関 めぐみ, 保柳 康一 | [Link](https://doi.org/10.5575/geosoc.2015.0025) |
| 2015 | 上高地槍穂高 | 上高地盆地の地形形成史と第四紀槍・穂高カルデラ-滝谷花崗閃緑岩コンプレックス | 9 | 原山 智 | [Link](https://doi.org/10.5575/geosoc.2015.0032) |
| 2014 | 鹿児島リフト第四系 | 南九州，鹿児島リフトの第四系 | 5 | 内村 公大, 鹿野 和彦, 大木 公彦 | [Link](https://doi.org/10.5575/geosoc.2014.0017) |
| 2014 | 霧島ジオパーク | 霧島ジオパークと2011 年霧島山新燃岳噴火 | 5 | 井村 隆介, 石川 徹 | [Link](https://doi.org/10.5575/geosoc.2014.0024) |
| 2014 | 甑島姫浦層群 | 甑島列島に分布する上部白亜系姫浦層群の層序と化石および堆積環境 | 7 | 小松 俊文, 三宅 優佳, 真鍋 真, 平山 廉, 籔本 美孝, 對比地 孝亘 | [Link](https://doi.org/10.5575/geosoc.2014.0011) |
| 2014 | 桜島火山 | 桜島火山 | 7 | 小林 哲夫, 佐々木 寿 | [Link](https://doi.org/10.5575/geosoc.2014.0020) |
| 2014 | 東海相模古地震津波 | Traces of paleo-earthquakes and tsunamis along the eastern Nankai Trough and Sagami Trough, Pacific coast of central Japan | 14 | Osamu Fujiwara | [Link](https://doi.org/10.5575/geosoc.2014.0012) |
| 2014 | 日南海岸堆積相 | 日南海岸沿いの深海堆積相と重力流堆積物 | 6 | 石原 与四郎, 髙清水 康博, 松本 弾, 宮田 雄一郎 | [Link](https://doi.org/10.5575/geosoc.2014.0018) |
| 2014 | 屋久島地質 | 世界遺産の島・屋久島の地質と成り立ち | 12 | 安間 了, 山本 由弦, 下司 信夫, 七山 太, 中川 正二郎 | [Link](https://doi.org/10.5575/geosoc.2014.0026) |
| 2014 | 九州西部ジュラ付加体 | 九州西部に分布するジュラ紀付加体と海溝斜面堆積物 | 6 | 尾上 哲治, 西園 幸久 | [Link](https://doi.org/10.5575/geosoc.2014.0014) |
| 2014 | 九州中西部変成岩 | 九州中西部地域の変成岩類：黒瀬川構造帯・肥後変成帯・木山変成岩 | 6 | 小山内 康人, 中野 伸彦, 吉本 紋, 亀井 淳志 | [Link](https://doi.org/10.5575/geosoc.2014.0010) |
| 2013 | 阿武隈東縁花崗岩 | 阿武隈山地東縁の石炭紀および白亜紀アダカイト質花崗岩類 | 6 | 土谷 信高, 大友 幸子, 武田 朋代, 佐々木 惇, 阿部 真里恵 | [Link](https://doi.org/10.5575/geosoc.2013.0033) |
| 2013 | 蔵王火山 | 蔵王火山 | 6 | 伴 雅雄 | [Link](https://doi.org/10.5575/geosoc.2013.0017) |
| 2013 | 相馬中村層群 | 中部ジュラ系～下部白亜系相馬中村層群の層序と化石 | 8 | 竹谷 陽二郎, 遅沢 壮一 | [Link](https://doi.org/10.5575/geosoc.2013.0034) |
| 2013 | 岩手宮城内陸地震 | カルデラ縁辺などのリストリック正断層が再動した岩手・宮城内陸地震（M6.9）の地表地震逆断層 | 10 | 遅沢 壮一, 布原 啓史 | [Link](https://doi.org/10.5575/geosoc.2013.0021) |
| 2013 | 宮古久慈層群 | 岩手県に分布する白亜系宮古層群および久慈層群の浅海～非海成堆積物と後期白亜紀陸生脊椎動物群 | 8 | 梅津 慶太, 平山 廉, 薗田 哲平, 高嶋 礼詩 | [Link](https://doi.org/10.5575/geosoc.2013.0027) |
| 2013 | 南部北上長坂歌津 | 南部北上帯長坂地域の先シルル紀基盤岩類・中部～上部古生界と歌津-志津川地域のペルム系～ジュラ系（付：ペルム系燐酸塩岩の産状） | 15 | 永広 昌之, 森清 寿郎 | [Link](https://doi.org/10.5575/geosoc.2013.0016) |
| 2013 | 北鹿黒鉱鉱床 | 北鹿地域における黒鉱鉱床と背弧海盆火山活動 | 7 | 山田 亮一, 吉田 武義 | [Link](https://doi.org/10.5575/geosoc.2013.0018) |
| 2013 | 仙台津波堆積物 | 2011年東北地方太平洋沖地震津波と869年貞観地震津波の浸水域と堆積物 | 8 | 菅原 大助, 箕浦 幸治 | [Link](https://doi.org/10.5575/geosoc.2013.0029) |
| 2013 | 仙台南西部中新統 | 仙台南西部に分布する東北日本太平洋側標準層序としての中・上部中新統および鮮新統 | 4 | 藤原 治, 鈴木 紀毅, 林 広樹, 入月 俊明 | [Link](https://doi.org/10.5575/geosoc.2013.0032) |
| 2013 | 仙台の大地 | 仙台の大地の成り立ちを知る | 6 | 宮本 毅, 蟹澤 聰史, 石渡 明, 根本 潤 | [Link](https://doi.org/10.5575/geosoc.2013.0037) |
| 2012 | 青山高原領家帯 | 領家帯青山高原地域の変成岩類および花崗岩類 | 7 | 河上 哲生, 西岡 芳晴 | [Link](https://doi.org/10.5575/geosoc.2012.0033) |
| 2012 | 紀州美山層メランジュ | 紀州白亜系四万十帯美山層のメランジュ変形構造と温度圧力履歴 | 3 | 橋本 善孝 | [Link](https://doi.org/10.5575/geosoc.2012.0032) |
| 2012 | 紀伊西部秩父黒瀬川 | 紀伊半島西部の秩父帯・黒瀬川帯 | 9 | 八尾 昭 | [Link](https://doi.org/10.5575/geosoc.2012.0038) |
| 2012 | 川西猪名川超丹波 | 兵庫県南東部，川西−猪名川地域の超丹波帯と丹波帯 | 7 | 菅森 義晃, 小泉 奈緒子, 竹村 静夫 | [Link](https://doi.org/10.5575/geosoc.2012.0036) |
| 2012 | 山陰海岸ジオパーク | 山陰海岸におけるジオパーク活動−大地と暮らしのかかわり− | 10 | 先山 徹, 松原 典孝, 三田村 宗樹 | [Link](https://doi.org/10.5575/geosoc.2012.0054) |
| 2012 | 室生火砕流 | 中新世の室生火砕流堆積物 | 3 | 佐藤 隆春, 中条 武司, 和田 穣隆, 鈴木 桂子 | [Link](https://doi.org/10.5575/geosoc.2012.0039) |
| 2012 | 大阪津波碑 | 大阪の津波碑と地盤沈下対策 | 6 | 三田村 宗樹 | [Link](https://doi.org/10.5575/geosoc.2012.0034) |
| 2012 | 和泉山脈中央構造線 | 和泉山脈西端部：和泉層群と中央構造線 | 5 | 宮田 隆夫, 安 鉉善, 猪川 千晶 | [Link](https://doi.org/10.5575/geosoc.2012.0053) |
| 2012 | 古琵琶湖鮮新更新統 | 古琵琶湖層群における新・旧鮮新−更新統の境界 | 4 | 里口 保文, 山川 千代美, 高橋 啓一 | [Link](https://doi.org/10.5575/geosoc.2012.0035) |
| 2011 | 鬼怒川テフラ | 鬼怒川低地帯の第四紀テフラ層序—火山噴火史と平野の形成史— | 13 | 鈴木 毅彦 | [Link](https://doi.org/10.5575/geosoc.117.S121) |
| 2011 | 筑波山深成変成岩 | 筑波山周辺の深成岩と変成岩 | 7 | 高橋 裕平, 宮崎 一博, 西岡 芳晴 | [Link](https://doi.org/10.5575/geosoc.117.S21) |
| 2011 | 磐梯吾妻安達太良 | 磐梯・吾妻・安達太良：活火山ランクBの三火山 | 10 | 長谷川 健, 藤縄 明彦, 伊藤 太久 | [Link](https://doi.org/10.5575/geosoc.117.S33) |
| 2011 | 棚倉断層 | 棚倉断層の新第三紀テクトニクスと火山活動・堆積作用 | 13 | 天野 一男, 松原 典孝, 及川 敦美, 滝本 春南, 細井 淳 | [Link](https://doi.org/10.5575/geosoc.117.S69) |
| 2011 | 栃木荒川層群大谷 | 栃木の新第三系：荒川層群中部の層序と化石および大谷地域の応用地質学 | 5 | 松居 誠一郎, 山本 高司, 柏村 勇二, 布川 嘉英, 青島 睦治 | [Link](https://doi.org/10.5575/geosoc.117.S89) |
| 2011 | 日立カンブリア系 | 日本最古の地層—日立のカンブリア系変成古生層 | 19 | 田切 美智雄, 廣井 美邦, 足立 達朗 | [Link](https://doi.org/10.5575/geosoc.117.S1) |
| 2011 | 常陸台地下総層群 | 常陸台地の第四系下総層群の層序と堆積システムの時空変化 | 6 | 大井 信三, 横山 芳春 | [Link](https://doi.org/10.5575/geosoc.117.S103) |
| 2011 | 常磐白亜系新第三系 | 常磐地域の白亜系から新第三系と前弧盆堆積作用 | 12 | 安藤 寿男, 柳沢 幸夫, 小松原 純子 | [Link](https://doi.org/10.5575/geosoc.117.S49) |
| 2011 | 地層はぎ取り | 地層を見る・はぎ取る・作る | 4 | 伊藤 孝, 植木 岳雪, 中野 英之, 小尾 靖, 牧野 泰彦 | [Link](https://doi.org/10.5575/geosoc.117.S153) |
| 2011 | 伊豆地塊北端部 | 伊豆地塊北端部，伊豆衝突帯の地質構造 | 7 | 小田原 啓, 林 広樹, 井崎 雄介, 染野 誠, 伊藤 谷生 | [Link](https://doi.org/10.5575/geosoc.117.S135) |
| 2010 | 黒部川温泉花崗岩 | 黒部川沿いの高温泉と第四紀黒部川花崗岩 | 6 | 原山 智, 高橋 正明, 宿輪 隆太, 板谷 徹丸, 八木 公史 | [Link](https://doi.org/10.5575/geosoc.116.S63) |
| 2010 | 飛騨変成帯発達史 | 年代学から見た飛騨変成作用から日本海誕生を経て今日に至るまでの包括的構造発達史 | 9 | 椚座 圭太郎, 清水 正明, 大藤 茂 | [Link](https://doi.org/10.5575/geosoc.116.S83) |
| 2010 | 跡津川断層系 | 跡津川断層系の変動地形と断層露頭 | 12 | 竹内 章, 道家 涼介, ハス バートル | [Link](https://doi.org/10.5575/geosoc.116.S21) |
| 2010 | 糸魚川ヒスイ探訪 | 糸魚川ジオパーク ヒスイ探訪ジオツアー：謎多きヒスイを多角的に楽しもう | 9 | 宮島 宏 | [Link](https://doi.org/10.5575/geosoc.116.S143) |
| 2010 | 糸魚川ジオパーク | 糸魚川ジオパークの地質巡り | 10 | 竹内 誠, 竹之内 耕, 中澤 努 | [Link](https://doi.org/10.5575/geosoc.116.S123) |
| 2010 | 立山火山 | 立山火山 | 11 | 中野 俊, 奥野 充, 菊川 茂 | [Link](https://doi.org/10.5575/geosoc.116.S37) |
| 2010 | 焼岳火山群 | 焼岳火山群の大規模ラハール堆積物と火砕流堆積物 | 7 | 及川 輝樹, 石崎 泰男, 片岡 香子 | [Link](https://doi.org/10.5575/geosoc.116.S49) |
| 2010 | 富山手取層群 | 富山県に分布する上部ジュラ～下部白亜系手取層群の海成層と恐竜足跡化石 | 6 | 平澤 聡, 柏木 健司, 藤田 将人 | [Link](https://doi.org/10.5575/geosoc.116.S103) |
| 2010 | 富山北陸層群テフラ | 富山積成盆地，北陸層群の広域テフラと第四紀テクトニクス | 10 | 田村 糸子, 山崎 晴雄, 中村 洋介 | [Link](https://doi.org/10.5575/geosoc.116.S1) |
| 2009 | 秋吉石灰岩古環境 | 秋吉石灰岩から読み取る石炭・ペルム紀の古環境変動－美祢市（旧秋芳町）秋吉台科学博物館創立50周年記念巡検－ | 7 | 佐野 弘好, 杦山 哲男, 長井 孝一, 上野 勝美, 中澤 努, 藤川 将之 | [Link](https://doi.org/10.5575/geosoc.115.S71) |
| 2009 | 牟岐メランジュ | 四万十帯牟岐メランジュにみる沈み込み帯地震発生帯の変形と流体移動 | 6 | 山口 飛鳥, 柴田 伊廣, 氏家 恒太郎, 木村 学 | [Link](https://doi.org/10.5575/geosoc.115.S21) |
| 2009 | 成羽層群地すべり | 成羽層群の炭層地すべり群－岩相と地史を反映したその構造特性 | 10 | 横田 修一郎, 田中 元, 山田 琢哉 | [Link](https://doi.org/10.5575/geosoc.115.S109) |
| 2009 | 岡山東部舞鶴超丹波 | 岡山県東部周辺の舞鶴帯と超丹波帯 | 7 | 竹村 静夫, 菅森 義晃, 鈴木 茂之 | [Link](https://doi.org/10.5575/geosoc.115.S123) |
| 2009 | 小豆島花崗岩 | 香川県小豆島の花崗岩のラミネーションシーティングと小豆島石を訪ねて | 7 | 藤田 勝代, 横山 俊治 | [Link](https://doi.org/10.5575/geosoc.115.S89) |
| 2009 | 小豆島火山岩 | 小豆島の瀬戸内火山岩類：水中火山活動とサヌキトイド | 6 | 巽 好幸, 谷 健一郎, 川畑 博 | [Link](https://doi.org/10.5575/geosoc.115.S15) |
| 2009 | 大山大根島火山 | 大山・大根島：山陰地方中部の対照的な第四紀火山 | 10 | 沢田 順弘, 門脇 和也, 藤代 祥子, 今井 雅浩, 兵頭 政幸 | [Link](https://doi.org/10.5575/geosoc.115.S51) |
| 2009 | 四国中央三波川帯 | 四国中央部三波川変成帯のテクトニクス | 5 | 岡本 和明, 青木 一勝, 丸山 茂徳 | [Link](https://doi.org/10.5575/geosoc.115.S37) |
| 2009 | 吉備高原山砂利層 | 岡山市周辺の吉備高原に分布する古第三系「山砂利層」と海成中新統 | 8 | 鈴木 茂之, 松原 尚志, 松浦 浩久, 檀原 徹, 岩野 英樹 | [Link](https://doi.org/10.5575/geosoc.115.S139) |
| 2008 | 鳥海火山 | 鳥海火山 | 9 | 林 信太郎, 山元 正継 | [Link](https://doi.org/10.5575/geosoc.114.S87) |
| 2008 | 秋田珪藻土鉱床 | 秋田県の珪藻土，パーライト，ゼオライト鉱床 | 6 | 村上 英樹, 村木 克行, 野口 泰彦, 鈴木 清貴 | [Link](https://doi.org/10.5575/geosoc.114.S111) |
| 2008 | 男鹿能代第四系 | 男鹿半島－能代地域の地形と第四系 | 14 | 白石 建雄, 白井 正明, 西川 治, 鈴木 隼人, 古橋 恭子, 星 多恵子 | [Link](https://doi.org/10.5575/geosoc.114.S33) |
| 2008 | 男鹿半島火山岩相 | 男鹿半島の火山岩相：始新世～前期中新世火山岩と戸賀火山 | 6 | 大口 健志, 鹿野 和彦, 小林 紀彦, 佐藤 雄大, 小笠原 憲四郎 | [Link](https://doi.org/10.5575/geosoc.114.S17) |
| 2008 | 根田茂帯 | 北上山地前期石炭紀付加体「根田茂帯」の構成岩相と根田茂帯・南部北上帯境界 | 12 | 内野 隆之, 川村 信人, 川村 寿郎 | [Link](https://doi.org/10.5575/geosoc.114.S141) |
| 2008 | 小安秋の宮地熱 | 秋田県南部小安・秋の宮地域の地熱地質 | 8 | 高島 勲, 越谷 信 | [Link](https://doi.org/10.5575/geosoc.114.S97) |
| 2008 | 小坂元山黒鉱鉱床 | 小坂元山黒鉱鉱床の海底熱水鉱化作用と背弧海盆～島弧の火山活動の特徴 | 7 | 水田 敏夫, 石山 大三 | [Link](https://doi.org/10.5575/geosoc.114.S181) |
| 2008 | 安家久慈付加体 | 安家－久慈地域の北部北上帯ジュラ紀付加体 | 12 | 永広 昌之, 山北 聡, 高橋 聡, 鈴木 紀毅 | [Link](https://doi.org/10.5575/geosoc.114.S121) |
| 2008 | 地学教育男鹿半島 | 地学教育の素材としての男鹿半島 | 12 | 藤本 幸雄, 林 信太郎, 渡部 晟, 栗山 知士, 西村 隆, 渡部 均, 阿部 雅彦, 小田嶋 博 | [Link](https://doi.org/10.5575/geosoc.114.S51) |
| 2008 | 北上山地アダカイト | 北上山地に分布する古第三紀アダカイト質流紋岩～高Mg安山岩と前期白亜紀アダカイト質累帯深成岩体 | 8 | 土谷 信高, 西岡 芳晴, 小岩 修平, 大槻 奈緒子 | [Link](https://doi.org/10.5575/geosoc.114.S159) |
| 2008 | 出羽丘陵変形構造 | 出羽丘陵新第三系に発達する変形構造 | 5 | 西川 治, 奥平 敬元, 吉田 昌幸, 白石 建雄 | [Link](https://doi.org/10.5575/geosoc.114.S75) |
| 2007 | 神居古潭変成岩 | 深部付加体としての神居古潭変成岩類の原岩層序・付加プロセス・変形変成作用および流体－岩石相互作用 | 7 | 榊原 正幸, 安元 和己, 池田 倫治, 太田 努 | [Link](https://doi.org/10.5575/geosoc.113.S103) |
| 2007 | 日高衝突帯下部地殻 | 日高衝突帯下部地殻の岩石構成と変形運動 | 11 | 小山内 康人, 大和田 正明, 豊島 剛志 | [Link](https://doi.org/10.5575/geosoc.113.S29) |
| 2007 | 日高前弧海山沈み込み | 海山沈み込みに伴う前弧域の発達過程と固体物質循環 | 13 | 植田 勇人 | [Link](https://doi.org/10.5575/geosoc.113.S137) |
| 2007 | 手稲山天狗岳 | 鮮新世溶岩台地縁辺の地すべり地形：手稲山山体崩壊と天狗岳地すべり | 7 | 宮坂 省吾, 山崎 茜, 岡村 聡, 英 弘, 石井 正之, 小板橋 重一 | [Link](https://doi.org/10.5575/geosoc.113.S19) |
| 2007 | 忍路積丹岩盤崩壊 | 忍路・積丹半島の水底火山活動と岩盤崩壊 | 9 | 岡村 聡, 永田 秀尚 | [Link](https://doi.org/10.5575/geosoc.113.S93) |
| 2007 | 幌満かんらん岩体 | 幌満かんらん岩体の層状構造とその起源 | 11 | 新井田 清信, 高澤 栄一 | [Link](https://doi.org/10.5575/geosoc.113.S167) |
| 2007 | 幌延地域発達史 | 北海道北部,幌延地域における後期鮮新世以降の古地理と地質構造発達史 | 7 | 新里 忠史, 舟木 泰智, 安江 健一 | [Link](https://doi.org/10.5575/geosoc.113.S119) |
| 2007 | 夕張石炭形成 | 地質学のふるさと夕張：石炭形成とその前後の時代の地層 | 8 | 保柳 康一, 川上 源太郎, 宮坂 省吾 | [Link](https://doi.org/10.5575/geosoc.113.S205) |
| 2007 | 夕張三笠蝦夷層群 | 蝦夷前弧堆積盆の海陸断面堆積相変化と海洋無酸素事変層準：夕張～三笠 | 8 | 安藤 寿男, 栗原 憲一, 高橋 賢一 | [Link](https://doi.org/10.5575/geosoc.113.S185) |
| 2007 | 十勝平野更新統 | 十勝平野の下部更新統の堆積相と水理地質 | 7 | 高清水 康博, 岡 孝雄 | [Link](https://doi.org/10.5575/geosoc.113.S65) |
| 2007 | 北海道駒ヶ岳火山 | 北海道駒ヶ岳火山の噴火履歴 | 7 | 吉本 充宏, 宝田 晋治, 高橋 良 | [Link](https://doi.org/10.5575/geosoc.113.S81) |
| 2007 | 北海道中央活断層 | 北海道中央部の活断層と大規模地すべり地形 | 9 | 田近 淳, 小板橋 重一, 大津 直, 廣瀬 亘, 川井 武志 | [Link](https://doi.org/10.5575/geosoc.113.S51) |
| 2006 | 高知西部四万十帯 | 沈み込みプレート境界地震発生帯破壊変形と流体移動：高知県西部白亜系四万十帯，興津，久礼，横浪メランジュ | 4 | 坂口 有人, 橋本 善孝, 向吉 秀樹, 横田 崇輔, 高木 美恵, 菊池 岳人 | [Link](https://doi.org/10.5575/geosoc.112.S71) |
| 2006 | 室戸菜生コンプレックス | 室戸岬，菜生コンプレックスのメランジェと岩脈 | 9 | 遅沢 壮一 | [Link](https://doi.org/10.5575/geosoc.112.S41) |
| 2006 | 室戸岬ハンレイ岩 | 室戸岬ハンレイ岩―マグマ分化プロセスの野外での検証 | 5 | 星出 隆志, 小畑 正明, 吉村 康隆 | [Link](https://doi.org/10.5575/geosoc.112.S55) |
| 2006 | 室戸半島地震隆起 | 室戸半島の第四紀地殻変動と地震隆起 | 4 | 前杢 英明 | [Link](https://doi.org/10.5575/geosoc.112.S17) |
| 2006 | 土佐山田美良布 | 高知県土佐山田・美良布地域の白亜系とジュラ系白亜系境界 | 7 | 香西 武, 石田 啓祐, 近藤 康生 | [Link](https://doi.org/10.5575/geosoc.112.S89) |
| 2006 | 唐の浜層群 | 鮮新統唐の浜層群の層序と化石 | 4 | 岩井 雅夫, 近藤 康生, 菊池 直樹, 尾田 太良 | [Link](https://doi.org/10.5575/geosoc.112.S27) |

## 3. ファイル一覧

| ファイル | 行数 | サイズ (bytes) |
|---|---:|---:|
| `.github/workflows/pages.yml` | 37 | 706 |
| `css/style.css` | 2820 | 61180 |
| `data/field_trips.csv` | 1258 | 568352 |
| `data/field_trips.md` | 57 | 4832 |
| `docs/ARCHITECTURE.md` | 78 | 7662 |
| `docs/DESIGN.md` | 46 | 3616 |
| `docs/MEMORY.md` | 36 | 2711 |
| `docs/PRD.md` | 72 | 6372 |
| `docs/RULES.md` | 37 | 2275 |
| `docs/TASKS.md` | 30 | 2029 |
| `index.html` | 551 | 30367 |
| `js/config.js` | 118 | 4019 |
| `js/dom.js` | 65 | 2089 |
| `js/fieldTrips.js` | 1221 | 43301 |
| `js/i18n.js` | 318 | 13413 |
| `js/inspector.js` | 1013 | 34472 |
| `js/main.js` | 628 | 20212 |
| `js/map.js` | 498 | 15212 |
| `js/normalize.js` | 369 | 14345 |
| `js/permalink.js` | 129 | 3249 |
| `js/seamless.js` | 239 | 7550 |
| `js/search.js` | 934 | 30675 |
| `js/state.js` | 291 | 13490 |
| `LICENSE` | 21 | 1068 |
| `README.md` | 90 | 7378 |
| `requirements.txt` | 2 | 40 |
| `scripts/build_geojson.py` | 172 | 6621 |
| `scripts/build_map_catalog.py` | 653 | 24109 |
| `scripts/build_review_bundle.py` | 229 | 9371 |
| `scripts/providers/__init__.py` | 1 | 82 |
| `scripts/providers/common.py` | 16 | 434 |
| `scripts/providers/field_trips.py` | 131 | 4810 |
| `scripts/providers/gsj_50k.py` | 115 | 4938 |
| `scripts/providers/gsj_coastal_seamless.py` | 73 | 3574 |
| `scripts/providers/gsj_seamless_200k.py` | 65 | 3004 |
| `scripts/providers/gsj_volcanic.py` | 75 | 3387 |
| `scripts/providers/hro_eeg.py` | 157 | 6958 |
| `scripts/schema.py` | 186 | 8342 |
| `scripts/serve.py` | 61 | 1867 |
| `start_app.bat` | 50 | 1031 |
| `tests/test_audit_suite.py` | 249 | 12097 |
| `tests/test_build_map_catalog.py` | 98 | 4293 |

## 4. 直近の Git コミット

- `b7a8c13 docs(tasks): link TASKS.md to Linear issues (Linear is the task source of truth)`
- `d87cd56 style(ui): apply unslop-ui typography, parity, and aria-pressed fixes`
- `224f37d chore: initialize project-docs, update REVIEW_BUNDLE, and refine UI`
- `8c358b5 feat: add application state management and DOM element caching`
- `a4cfa8f feat(catalog): enhance metadata extraction in build_map_catalog`
- `9e3d7c1 feat(ui): add detail close button, auto-fit, and EN localization`
- `89a2589 fix(pipeline): enforce strict schema validation and audit tests`
- `963d58b fix(ui): resolve IME guard, bounds check, and image 404 edge cases`

## 5. フロントエンド主要ファイル（全文）

### `index.html`（全 551 行）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>地質図検索 WebGIS | 産総研</title>

  <!-- Google Fonts: Noto Sans JP -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">

  <!-- Leaflet.js v1.9.4 CSS -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  >

  <!-- Application CSS -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="app-layout" data-mobile-view="map">
    <!-- モバイル用パネル切替バー（720px以下で表示） -->
    <nav id="mobile-nav-bar" class="mobile-nav-bar" aria-label="表示パネル切り替え">
      <button type="button" class="mobile-nav-btn is-active" data-mobile-view="map" data-i18n="mobileTabMap" aria-pressed="true">地図</button>
      <button type="button" class="mobile-nav-btn" data-mobile-view="search" data-i18n="mobileTabSearch" aria-pressed="false">検索・一覧</button>
      <button type="button" id="mobile-legend-tab" class="mobile-nav-btn" data-mobile-view="legend" data-i18n="mobileTabLegend" aria-pressed="false" hidden>凡例・詳細</button>
    </nav>

    <!-- 中央マップエリア（フルスクリーン 100vw x 100vh） -->
    <main class="map-container">
      <div id="map" tabindex="0" aria-label="地質図幅検索マップ"></div>
    </main>

    <!-- 左：格納可能な検索・一覧ドロワー（幅 320px、初期状態は検索窓のみ） -->
    <aside id="left-drawer" class="floating-panel left-drawer is-collapsed" aria-label="図幅検索・一覧">
      <div class="search-bar-header">
        <div class="search-autocomplete">
          <div class="search-field">
            <span class="search-icon" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="search"
              id="search-input"
              class="text-input"
              placeholder="図幅・火山・著者・地域を検索"
              data-i18n-placeholder="searchPlaceholder"
              data-i18n-aria-label="searchPlaceholder"
              autocomplete="off"
              aria-label="図幅・火山・著者・地域を検索"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-expanded="false"
            >
            <kbd class="shortcut-hint" title="検索にフォーカス (/)">/</kbd>
          </div>
          <ul id="search-suggestions" class="search-suggestions" role="listbox"></ul>
        </div>
        <button
          type="button"
          id="toggle-left-drawer-btn"
          class="icon-button subtle drawer-toggle-btn"
          title="検索・一覧パネルを開く"
          aria-label="検索・一覧パネルを開閉"
          aria-expanded="false"
          aria-controls="left-drawer-body"
        >
          <svg class="drawer-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          <span id="drawer-filter-dot" class="drawer-filter-dot" hidden aria-hidden="true"></span>
        </button>
      </div>

      <!-- エラー通知用（ドロワー格納時も表示） -->
      <p id="status-message" class="status-message" role="alert" hidden></p>

      <div id="left-drawer-wrap" class="drawer-body-wrap" inert>
        <div id="left-drawer-body" class="drawer-body">
        <!-- ドロワー表示モード切替（地質図 / 巡検スポット） -->
        <div id="drawer-mode-tabs" class="segmented-control drawer-mode-tabs" role="tablist" aria-label="表示コンテンツ切り替え">
          <button type="button" id="drawer-tab-maps" class="segmented-btn is-active" data-drawer-mode="maps" data-i18n="drawerTabMaps" role="tab" aria-selected="true">地質図</button>
          <button type="button" id="drawer-tab-trips" class="segmented-btn" data-drawer-mode="trips" data-i18n="drawerTabTrips" role="tab" aria-selected="false">巡検スポット</button>
        </div>

        <div id="drawer-maps-pane" class="drawer-mode-pane">
        <!-- 地図種別 + 表示範囲内のみ -->
        <div class="filter-group">
          <div class="filter-label-row">
            <span id="map-type-label" class="filter-label" data-i18n="mapTypeLabel">地図種別</span>
            <label class="toggle-chip-label is-compact">
              <input type="checkbox" id="viewport-only-toggle" class="toggle-checkbox">
              <span id="viewport-only-label" data-i18n="viewportOnlyLabel">表示範囲内のみ</span>
            </label>
          </div>
          <div id="map-type-chips" class="decade-chips" role="group" aria-label="地図種別フィルタ"></div>
        </div>

        <!-- 折りたたみ式詳細フィルター（発行年・縮尺・資料有無の3項目） -->
        <section class="filter-accordion" aria-label="詳細フィルター">
          <div class="filter-accordion-header">
            <button
              type="button"
              id="toggle-filters-btn"
              class="filter-accordion-toggle"
              aria-expanded="false"
              aria-controls="filter-panel-body"
            >
              <span class="filter-toggle-title-group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span id="filter-accordion-label" data-i18n="filterAccordionLabel">詳細フィルター</span>
                <span id="active-filter-badge" class="active-filter-badge" hidden>0</span>
              </span>
              <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button type="button" id="reset-filters" class="text-button" title="検索条件をリセット" data-i18n="reset">
              リセット
            </button>
          </div>

          <div id="filter-panel-wrap" class="filter-panel-wrap" inert>
            <div id="filter-panel-body" class="filter-panel-body">
            <!-- 発行年（5年刻みデュアルレンジスライダー） -->
            <div class="filter-group">
              <div class="filter-label-row">
                <span id="decade-label" class="filter-label" data-i18n="decadeLabel">発行年</span>
                <span id="year-range-display" class="year-range-display"></span>
              </div>
              <div class="dual-range-container">
                <div class="dual-range-track-bg"></div>
                <div id="year-range-track" class="dual-range-track-active"></div>
                <div id="year-range-ticks" class="year-range-ticks" aria-hidden="true"></div>
                <input type="range" id="year-range-min" class="dual-range-input" step="5" aria-label="開始年">
                <input type="range" id="year-range-max" class="dual-range-input" step="5" aria-label="終了年">
              </div>
              <div id="year-range-labels" class="year-range-labels" aria-hidden="true"></div>
            </div>

            <!-- 縮尺 -->
            <div class="filter-group">
              <span id="scale-filter-label" class="filter-label" data-i18n="scaleFilterLabel">縮尺・シリーズ</span>
              <div id="scale-chips" class="decade-chips" role="group" aria-label="縮尺フィルタ"></div>
            </div>

              <!-- 資料有無（PDF / 凡例 / 原図） -->
              <div class="filter-group">
                <span id="other-filter-label" class="filter-label" data-i18n="otherFilterLabel">資料有無</span>
                <div id="other-chips" class="decade-chips" role="group" aria-label="資料有無フィルタ"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 該当図幅一覧 -->
        <div class="result-list-section">
          <div class="result-list-header">
            <span id="result-list-label" class="filter-label" data-i18n="resultListLabel">該当図幅一覧</span>
            <div class="result-list-header-actions">
              <span id="result-count" class="result-badge" aria-live="polite">読込中...</span>
              <button
                type="button"
                id="fit-all-btn"
                class="icon-button subtle"
                title="絞り込み中の全図幅にズーム"
                aria-label="絞り込み中の全図幅にズーム"
                data-i18n-title="fitAllTitle"
                data-i18n-aria-label="fitAllTitle"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                </svg>
              </button>
            </div>
          </div>
          <ul id="result-list" class="result-list"></ul>
        </div>
        </div>

        <!-- 巡検スポット専用ペイン -->
        <div id="drawer-trips-pane" class="drawer-mode-pane drawer-trips-pane" hidden>
          <div class="filter-group">
            <span id="drawer-trip-filter-label" class="filter-label" data-i18n="drawerTripFilterLabel">開催年・巡検コース</span>
            <div class="drawer-trip-filters">
              <select id="drawer-trip-year-filter" class="field-trip-select" aria-label="巡検開催年フィルタ">
                <option value="all">すべての年</option>
              </select>
              <select id="drawer-trip-course-filter" class="field-trip-select" aria-label="巡検コースフィルタ">
                <option value="all">すべてのコース</option>
              </select>
            </div>
            <div class="field-trip-category-filter">
              <span id="drawer-trip-category-label" class="filter-sub-label" data-i18n="fieldTripCategoryFilterLabel">テーマ別色分け・絞り込み</span>
              <div id="drawer-trip-category-chips" class="decade-chips field-trip-category-chips" role="group" aria-label="巡検テーマ別絞り込み"></div>
            </div>
            <input
              type="search"
              id="drawer-trip-search"
              class="drawer-trip-search"
              placeholder="コース名・著者・地点名で絞り込み"
              data-i18n-placeholder="drawerTripSearchPlaceholder"
              data-i18n-aria-label="drawerTripSearchPlaceholder"
              autocomplete="off"
              aria-label="コース名・著者・地点名で絞り込み"
            >
          </div>

          <div id="field-trip-course-card" class="field-trip-course-card" hidden></div>

          <div class="result-list-section">
            <div class="result-list-header">
              <span id="field-trip-list-label" class="filter-label" data-i18n="fieldTripListLabel">巡検地点一覧</span>
              <div class="result-list-header-actions">
                <span id="field-trip-count" class="result-badge" aria-live="polite">0 件</span>
                <button
                  type="button"
                  id="toggle-expand-trips-btn"
                  class="text-button field-trip-expand-toggle-btn"
                  title="地図上の巡検地点を展開・折りたたみ"
                >
                  展開
                </button>
                <button
                  type="button"
                  id="fit-field-trips-btn"
                  class="icon-button subtle"
                  title="表示中の巡検地点にズーム"
                  aria-label="表示中の巡検地点にズーム"
                  data-i18n-title="fitFieldTripsTitle"
                  data-i18n-aria-label="fitFieldTripsTitle"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <ul id="field-trip-list" class="result-list"></ul>
          </div>
        </div>
        </div>
      </div>
    </aside>

    <!-- 右：格納可能なレイヤー＆凡例インスペクタ（幅 340px） -->
    <aside id="right-inspector" class="floating-panel right-inspector" aria-label="表示中の地質図・凡例・詳細" inert>
      <div class="inspector-header">
        <div class="inspector-title-group">
          <span id="wms-status-dot" class="wms-dot" aria-hidden="true"></span>
          <h2 id="active-wms-name" class="inspector-title">表示中の地質図</h2>
        </div>
        <div class="inspector-header-actions">
          <button
            type="button"
            id="clear-wms-btn"
            class="text-button"
            title="表示中の地質図をすべて閉じる"
            aria-label="表示中の地質図をすべて閉じる"
            data-i18n="clearAll"
            hidden
          >
            すべて閉じる
          </button>
          <button
            type="button"
            id="collapse-right-btn"
            class="icon-button subtle"
            title="パネルを折りたたむ"
            aria-label="パネルを折りたたむ"
            data-i18n-title="collapseRightTitle"
            data-i18n-aria-label="collapseRightTitle"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- 上部：表示中レイヤー一覧（最大4図幅、コンパクト行） -->
      <div id="active-overlays-section" class="active-overlays-section" hidden>
        <ul id="active-overlay-list" class="active-overlay-list"></ul>
      </div>

      <!-- 下部：タブ切替エリア（凡例 / 断面図 / 詳細・PDF） -->
      <div id="inspector-detail-section" class="inspector-detail-section">
        <div class="inspector-tabs-bar">
          <div id="visual-mode-tabs" class="segmented-control" role="tablist" aria-label="インスペクタ表示切り替え">
            <button type="button" id="tab-legend-btn" class="segmented-btn is-active" data-inspector-tab="legend" role="tab" aria-selected="true">凡例</button>
            <button type="button" id="tab-section-btn" class="segmented-btn" data-inspector-tab="section" role="tab" aria-selected="false" hidden>断面図</button>
            <button type="button" id="tab-detail-btn" class="segmented-btn" data-inspector-tab="detail" role="tab" aria-selected="false">詳細・PDF</button>
          </div>
          <a
            id="legend-open-link"
            class="legend-external-link"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            title="新しいタブで拡大表示"
            data-i18n="legendOpen"
          >
            拡大
          </a>
        </div>

        <!-- タブ1・2: 凡例 / 断面図 -->
        <div id="inspector-visual-pane" class="inspector-pane">
          <div class="inspector-target-bar">
            <span id="legend-map-name" class="legend-map-name"></span>
          </div>
          <div id="seamless-point-card" class="seamless-point-card" hidden></div>
          <div id="seamless-guide-card" class="seamless-guide-card" hidden></div>
          <div id="section-chips" class="section-chips" hidden></div>
          <div class="legend-sidebar-body">
            <div id="legend-zoom-wrapper" class="legend-zoom-wrapper">
              <img id="legend-image" class="legend-image" src="" alt="地質図凡例">
              <div id="legend-lens-indicator" class="legend-lens-indicator" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        <!-- タブ3: 詳細・PDF -->
        <div id="inspector-detail-pane" class="inspector-pane inspector-detail-pane" hidden>
          <div class="dominant-info-header-block">
            <h3 id="dominant-info-title" class="legend-panel-title"></h3>
            <p id="dominant-info-subtitle" class="dominant-info-subtitle" hidden></p>
          </div>
          <dl id="dominant-info-meta" class="dominant-info-meta"></dl>
          <div id="dominant-info-links" class="dominant-info-links"></div>
        </div>
      </div>
    </aside>

    <!-- 右インスペクタ再展開タブ（格納時のみ表示） -->
    <button
      type="button"
      id="reopen-right-btn"
      class="reopen-right-tab"
      title="凡例・詳細パネルを開く"
      aria-label="凡例・詳細パネルを開く"
      data-i18n-title="reopenRightTitle"
      data-i18n-aria-label="reopenRightTitle"
      inert
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <span id="reopen-right-label" data-i18n="reopenRightLabel">凡例</span>
    </button>

    <!-- 展開中の巡検コース基本情報カード（地図下部中央・常に表示） -->
    <div id="field-trip-active-bar" class="field-trip-active-bar" hidden>
      <div class="field-trip-active-info">
        <div class="field-trip-active-meta">
          <span id="field-trip-active-badge" class="field-trip-active-badge"></span>
          <span id="field-trip-active-count" class="field-trip-active-count"></span>
        </div>
        <div id="field-trip-active-label" class="field-trip-active-label"></div>
        <div id="field-trip-active-authors" class="field-trip-active-authors" hidden></div>
      </div>
      <div id="field-trip-stop-nav" class="field-trip-stop-nav" hidden>
        <button type="button" id="field-trip-prev-stop-btn" class="field-trip-stop-nav-btn">← 前へ</button>
        <div class="field-trip-stop-nav-center">
          <div id="field-trip-current-stop-label" class="field-trip-current-stop-label"></div>
          <div id="field-trip-current-stop-desc" class="field-trip-current-stop-desc"></div>
        </div>
        <button type="button" id="field-trip-next-stop-btn" class="field-trip-stop-nav-btn">次へ →</button>
      </div>
      <div class="field-trip-active-actions">
        <button type="button" id="field-trip-bar-overlay-btn" class="field-trip-bar-btn is-overlay" hidden>地質図を重ねる</button>
        <a id="field-trip-bar-guidebook-btn" class="field-trip-bar-btn is-guidebook" href="#" target="_blank" rel="noopener noreferrer" hidden>案内書を開く</a>
        <button type="button" id="field-trip-bar-fit-btn" class="field-trip-bar-btn" title="このコースの全地点が画面に収まるように表示">全体表示</button>
        <button type="button" id="field-trip-bar-collapse-btn" class="field-trip-bar-btn is-collapse">格納</button>
      </div>
    </div>

    <!-- 右下：地図コントロール（巡検ON/OFF / 現在地 / レイヤー / 環境設定） -->
    <div id="map-bottom-right-controls" class="map-bottom-right-controls">
      <button
        type="button"
        id="field-trips-fab-btn"
        class="map-fab-btn is-field-trip-active"
        title="地質学会 巡検スポット表示切り替え"
        aria-label="地質学会 巡検スポット表示切り替え"
        data-i18n-title="fieldTripsLabel"
        data-i18n-aria-label="fieldTripsLabel"
        aria-pressed="true"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </button>

      <button
        type="button"
        id="locate-me-btn"
        class="map-fab-btn"
        title="現在地へ拡大移動"
        aria-label="現在地へ拡大移動"
        data-i18n-title="locateBtnTitle"
        data-i18n-aria-label="locateBtnTitle"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path>
          <circle cx="12" cy="12" r="7"></circle>
        </svg>
      </button>

      <!-- レイヤーポップオーバー -->
      <div class="popover-anchor">
        <div id="layers-popover" class="map-popover" role="dialog" aria-label="レイヤー設定" inert>
          <div class="popover-section">
            <span id="basemap-label" class="filter-label" data-i18n="basemapLabel">背景地図</span>
            <div class="segmented-control basemap-segmented" role="group" aria-label="背景地図の切り替え">
              <button type="button" class="segmented-btn is-active" data-basemap="blank" data-i18n="basemapBlank" aria-pressed="true">白地図</button>
              <button type="button" class="segmented-btn" data-basemap="pale" data-i18n="basemapPale" aria-pressed="false">淡色</button>
              <button type="button" class="segmented-btn" data-basemap="std" data-i18n="basemapStd" aria-pressed="false">標準</button>
              <button type="button" class="segmented-btn" data-basemap="photo" data-i18n="basemapPhoto" aria-pressed="false">写真</button>
            </div>
          </div>
          <div class="popover-section">
            <label class="popover-switch-row">
              <span id="show-index-label" data-i18n="showIndexLabel">図郭枠を表示</span>
              <input type="checkbox" id="show-index-toggle" class="toggle-checkbox" checked>
            </label>
            <label class="popover-switch-row">
              <span id="seamless-200k-label" data-i18n="seamless200kLabel">20万分の1 シームレス地質図 V2</span>
              <input type="checkbox" id="seamless-200k-toggle" class="toggle-checkbox">
            </label>
            <div id="seamless-opacity-row" class="seamless-opacity-row" hidden>
              <label for="seamless-opacity" id="seamless-opacity-label" class="wms-opacity-label" data-i18n="seamlessOpacityLabel">シームレス透過度</label>
              <input type="range" id="seamless-opacity" class="range-slider" min="0" max="100" value="65" aria-label="シームレス透過度">
              <span id="seamless-opacity-value" class="wms-opacity-value">65%</span>
            </div>
            <label id="seamless-query-row" class="popover-switch-row seamless-sub-row" hidden>
              <span id="seamless-query-label" data-i18n="seamlessQueryLabel">地点の地質を調べる</span>
              <input type="checkbox" id="seamless-query-toggle" class="toggle-checkbox">
            </label>
          </div>
        </div>
        <button
          type="button"
          id="layers-popover-btn"
          class="map-fab-btn"
          title="背景地図・レイヤー"
          aria-label="背景地図・レイヤー設定を開く"
          data-i18n-title="layersBtnTitle"
          data-i18n-aria-label="layersBtnTitle"
          aria-expanded="false"
          aria-controls="layers-popover"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </button>
      </div>

      <!-- 環境設定ポップオーバー -->
      <div class="popover-anchor">
        <div id="prefs-popover" class="map-popover" role="dialog" aria-label="環境設定" inert>
          <div class="popover-section">
            <span id="prefs-theme-label" class="filter-label" data-i18n="prefsThemeLabel">テーマ</span>
            <div class="segmented-control" role="group" aria-label="テーマ">
              <button type="button" class="segmented-btn is-active" data-theme-choice="light" data-i18n="prefsThemeLight" aria-pressed="true">ライト</button>
              <button type="button" class="segmented-btn" data-theme-choice="dark" data-i18n="prefsThemeDark" aria-pressed="false">ダーク</button>
            </div>
          </div>
          <div class="popover-section">
            <span id="prefs-lang-label" class="filter-label" data-i18n="prefsLangLabel">表示言語</span>
            <div class="segmented-control lang-switch" role="group" aria-label="表示言語の切り替え">
              <button type="button" class="segmented-btn is-active" data-lang="ja" aria-pressed="true">日本語</button>
              <button type="button" class="segmented-btn" data-lang="en" aria-pressed="false">English</button>
            </div>
          </div>
          <div class="popover-section">
            <span id="prefs-map-behavior-label" class="filter-label" data-i18n="prefsMapBehaviorLabel">地図操作・表示</span>
            <div class="prefs-slider-group">
              <div class="prefs-slider-header">
                <label for="wheel-zoom-speed" id="wheel-zoom-speed-label" class="wms-opacity-label" data-i18n="wheelZoomSpeedLabel">1回のスクロール量</label>
                <span id="wheel-zoom-speed-value" class="wms-opacity-value">1.0x</span>
              </div>
              <input type="range" id="wheel-zoom-speed" class="range-slider" min="0.4" max="2.5" step="0.1" value="1.0" aria-label="1回のスクロール量">
            </div>
            <div class="prefs-slider-group">
              <div class="prefs-slider-header">
                <label for="default-overlay-opacity" id="default-overlay-opacity-label" class="wms-opacity-label" data-i18n="defaultOverlayOpacityLabel">地質図の初期透過度</label>
                <span id="default-overlay-opacity-value" class="wms-opacity-value">85%</span>
              </div>
              <input type="range" id="default-overlay-opacity" class="range-slider" min="10" max="100" step="5" value="85" aria-label="地質図の初期透過度">
            </div>
            <label class="popover-switch-row">
              <span id="show-scale-label" data-i18n="showScaleLabel">スケールバーを表示</span>
              <input type="checkbox" id="show-scale-toggle" class="toggle-checkbox" checked>
            </label>
            <label class="popover-switch-row">
              <span id="show-trip-route-label" data-i18n="showTripRouteLabel">巡検ルート線を表示</span>
              <input type="checkbox" id="show-trip-route-toggle" class="toggle-checkbox" checked>
            </label>
          </div>
          <div class="popover-footer">
            <button type="button" id="reset-settings-btn" class="text-button" data-i18n="prefsResetLabel">初期設定に戻す</button>
          </div>
        </div>
        <button
          type="button"
          id="prefs-popover-btn"
          class="map-fab-btn"
          title="環境設定"
          aria-label="環境設定を開く"
          data-i18n-title="prefsBtnTitle"
          data-i18n-aria-label="prefsBtnTitle"
          aria-expanded="false"
          aria-controls="prefs-popover"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- 凡例拡大鏡ルーペ（clipping 回避のため body 直下） -->
  <div id="legend-loupe" class="legend-loupe" aria-hidden="true"></div>

  <!-- Leaflet.js v1.9.4 JS -->
  <script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""
  ></script>

  <!-- Application JS (ES Modules) -->
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

### `css/style.css`（全 2820 行）

```css
/* ==========================================================================
   Base & Theme Tokens
   ========================================================================== */
:root {
  --font-sans: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --color-bg: #f6f8fa;
  --color-panel-bg: rgba(255, 255, 255, 0.96);
  --color-surface: #ffffff;
  --color-surface-hover: #eaeef2;
  --color-border: #d0d7de;
  --color-border-focus: #0969da;
  --color-primary: #0969da;
  --color-primary-soft: rgba(9, 105, 218, 0.10);
  --color-text: #1f2328;
  --color-text-secondary: #656d76;
  --color-danger: #cf222e;
  --color-divider: #eaeef2;
  --shadow-floating: 0 4px 14px rgba(31, 35, 40, 0.14), 0 1px 3px rgba(31, 35, 40, 0.08);
  --shadow-control: 0 2px 6px rgba(31, 35, 40, 0.12);
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-pill: 4px;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --control-h: 2rem;
  --ease-fluid: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 160ms;
  --dur-normal: 260ms;
}

html[data-theme="dark"] {
  --color-bg: #0d1117;
  --color-panel-bg: rgba(22, 27, 34, 0.96);
  --color-surface: #161b22;
  --color-surface-hover: #21262d;
  --color-border: #30363d;
  --color-border-focus: #2f81f7;
  --color-primary: #2f81f7;
  --color-primary-soft: rgba(47, 129, 247, 0.16);
  --color-text: #e6edf3;
  --color-text-secondary: #8b949e;
  --color-danger: #f85149;
  --color-divider: #21262d;
  --shadow-floating: 0 6px 18px rgba(0, 0, 0, 0.45), 0 1px 4px rgba(0, 0, 0, 0.3);
  --shadow-control: 0 2px 6px rgba(0, 0, 0, 0.4);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #bdc1c6;
  border-radius: var(--radius-pill);
  border: 2px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background: #9aa0a6;
  border: 2px solid transparent;
  background-clip: content-box;
}

/* ==========================================================================
   Fullscreen Map Layout + Floating Panels
   ========================================================================== */
.app-layout {
  --left-panel-offset: 0px;
  --right-panel-offset: 0px;
  --right-controls-offset: var(--right-panel-offset);
  position: relative;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.app-layout.has-left-drawer {
  --left-panel-offset: 332px;
}

.app-layout.has-right-inspector {
  --right-panel-offset: 352px;
}

.map-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
  background-color: #f1f3f4;
}

html[data-theme="dark"] #map {
  background-color: #17181a;
}

.floating-panel {
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: var(--color-panel-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-floating);
  overflow: hidden;
}

.floating-panel[hidden] {
  display: none;
}

/* Left Drawer (320px) */
.left-drawer {
  top: 12px;
  left: 12px;
  max-height: calc(100vh - 64px);
  max-height: calc(100dvh - 64px);
  width: 320px;
  overflow: visible;
}

.drawer-body-wrap {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition: grid-template-rows var(--dur-normal) var(--ease-fluid), opacity var(--dur-fast) ease;
  min-height: 0;
  flex: 1;
}

.drawer-body-wrap > .drawer-body {
  min-height: 0;
  overflow-y: auto;
}

.left-drawer.is-collapsed .drawer-body-wrap {
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  flex: 0;
}

.left-drawer.is-collapsed .drawer-chevron {
  transform: rotate(180deg);
}

/* Right Inspector (340px) */
.right-inspector {
  top: 12px;
  right: 12px;
  bottom: 12px;
  width: 340px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate3d(calc(100% + 24px), 0, 0);
  will-change: transform, opacity;
  transition: transform var(--dur-normal) var(--ease-fluid), opacity var(--dur-normal) var(--ease-fluid), visibility 0s linear var(--dur-normal);
}

.right-inspector.is-compact {
  bottom: auto;
  max-height: calc(100vh - 24px);
}

.right-inspector.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate3d(0, 0, 0);
  transition: transform var(--dur-normal) var(--ease-fluid), opacity var(--dur-normal) var(--ease-fluid), visibility 0s linear 0s;
}

/* ==========================================================================
   Left Drawer: Search Bar & Body
   ========================================================================== */
.search-bar-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 10px;
  border-bottom: 1px solid var(--color-divider);
  flex-shrink: 0;
}

.left-drawer.is-collapsed .search-bar-header {
  border-bottom: none;
}

.search-autocomplete {
  position: relative;
  flex: 1;
  min-width: 0;
}

.search-field {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  display: inline-flex;
  color: var(--color-text-secondary);
  pointer-events: none;
}

.shortcut-hint {
  position: absolute;
  right: 8px;
  padding: 1px 5px;
  border-radius: 4px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.text-input:focus + .shortcut-hint,
.text-input:not(:placeholder-shown) + .shortcut-hint {
  opacity: 0;
}

.text-input {
  width: 100%;
  height: 36px;
  padding: 0 34px 0 32px;
  font-family: inherit;
  font-size: 13px;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.text-input::placeholder {
  color: #80868b;
}

.text-input:hover {
  background-color: var(--color-bg);
}

.text-input:focus {
  background-color: var(--color-bg);
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 2px var(--color-primary-soft);
}

.text-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 14px;
  width: 14px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23656d76' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E");
  background-size: contain;
}

html[data-theme="dark"] .text-input::-webkit-search-cancel-button {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E");
}

.drawer-chevron {
  transition: transform 0.18s ease;
}

.drawer-toggle-btn {
  position: relative;
}

.drawer-filter-dot {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-primary);
  border: 1.5px solid var(--color-bg);
}

.left-drawer:not(.is-collapsed) .drawer-filter-dot,
.drawer-filter-dot[hidden] {
  display: none;
}

.drawer-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 12px 12px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

/* Search Suggestions */
.search-suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: -30px;
  z-index: 1050;
  margin: 0;
  padding: 4px;
  list-style: none;
  max-height: 260px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-floating);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate3d(0, 6px, 0) scale(0.97);
  transform-origin: top left;
  will-change: transform, opacity;
  transition: opacity var(--dur-fast) var(--ease-fluid), transform var(--dur-fast) var(--ease-fluid), visibility 0s linear var(--dur-fast);
}

.search-suggestions.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1);
  transition: opacity var(--dur-fast) var(--ease-fluid), transform var(--dur-fast) var(--ease-fluid), visibility 0s linear 0s;
}

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  color: var(--color-text);
  transition: background-color 0.1s ease;
}

.suggestion-item:hover,
.suggestion-item.is-active {
  background-color: var(--color-surface-hover);
}

.suggestion-group-header {
  padding: 6px 10px 3px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--color-text-secondary);
  user-select: none;
}

.suggestion-group-header:not(:first-child) {
  margin-top: 4px;
  border-top: 1px solid var(--color-divider);
  padding-top: 7px;
}

.suggestion-text {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggestion-highlight {
  background-color: rgba(26, 115, 232, 0.16);
  color: inherit;
  font-weight: 700;
  border-radius: 2px;
  padding: 0 1px;
}

html[data-theme="dark"] .suggestion-highlight {
  background-color: rgba(138, 180, 248, 0.28);
}

.suggestion-badge {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 500;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
}

.suggestion-badge.is-map {
  background-color: #e8f0fe;
  color: #1967d2;
}

.suggestion-badge.is-author {
  background-color: #fef7e0;
  color: #b06000;
}

.suggestion-badge.is-volcano {
  background-color: #fce8e6;
  color: #c5221f;
}

.suggestion-badge.is-region {
  background-color: #e6f4ea;
  color: #137333;
}

html[data-theme="dark"] .suggestion-badge.is-map {
  background-color: rgba(138, 180, 248, 0.18);
  color: #8ab4f8;
}

html[data-theme="dark"] .suggestion-badge.is-author {
  background-color: rgba(253, 214, 99, 0.18);
  color: #fdd663;
}

html[data-theme="dark"] .suggestion-badge.is-volcano {
  background-color: rgba(242, 139, 130, 0.2);
  color: #f28b82;
}

html[data-theme="dark"] .suggestion-badge.is-region {
  background-color: rgba(129, 201, 149, 0.18);
  color: #81c995;
}

/* ==========================================================================
   Filters & Chips
   ========================================================================== */
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.toggle-chip-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.12s ease, border-color 0.12s ease, color 0.12s ease;
}

.toggle-chip-label:hover {
  background-color: var(--color-surface-hover);
}

.toggle-chip-label:has(.toggle-checkbox:checked) {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.toggle-checkbox {
  margin: 0;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.filter-accordion {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  overflow: hidden;
  flex-shrink: 0;
}

.filter-accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 5px 8px;
}

.filter-accordion-toggle {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 4px 6px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.12s ease;
}

.filter-accordion-toggle:hover {
  background-color: var(--color-surface-hover);
}

.filter-toggle-title-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.filter-toggle-title-group svg {
  color: var(--color-primary);
}

.active-filter-badge {
  font-variant-numeric: tabular-nums;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--radius-pill);
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

.active-filter-badge[hidden] {
  display: none;
}

.accordion-chevron {
  color: var(--color-text-secondary);
  transition: transform 0.18s ease;
}

.filter-accordion-toggle[aria-expanded="true"] .accordion-chevron {
  transform: rotate(180deg);
}

.filter-panel-wrap {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: grid-template-rows var(--dur-normal) var(--ease-fluid), opacity var(--dur-fast) ease, visibility 0s linear var(--dur-normal);
}

.filter-panel-wrap.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: grid-template-rows var(--dur-normal) var(--ease-fluid), opacity var(--dur-fast) ease, visibility 0s linear 0s;
}

.filter-panel-wrap > .filter-panel-body {
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
  border-top: 0 solid var(--color-border);
  background-color: var(--color-bg);
  transition: padding var(--dur-normal) var(--ease-fluid);
}

.filter-panel-wrap.is-open > .filter-panel-body {
  padding: 8px 10px 10px;
  border-top-width: 1px;
}

.year-range-display {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}

.dual-range-container {
  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
}

.dual-range-track-bg {
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: var(--radius-pill);
  background-color: var(--color-border);
}

.dual-range-track-active {
  position: absolute;
  height: 4px;
  border-radius: var(--radius-pill);
  background-color: var(--color-primary);
}

.dual-range-input {
  position: absolute;
  left: 0;
  width: 100%;
  margin: 0;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
  z-index: 3;
}

.year-range-ticks {
  position: absolute;
  left: 7px;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  height: 10px;
  pointer-events: none;
  z-index: 2;
}

.year-tick-dot {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-border);
  transform: translate(-50%, -50%);
  transition: background-color 0.12s ease;
}

.year-tick-dot.is-major {
  width: 6px;
  height: 6px;
}

.year-tick-dot.is-in-range {
  background-color: var(--color-primary);
}

.year-range-labels {
  position: relative;
  height: 14px;
  margin-left: 7px;
  margin-right: 7px;
  font-size: 12px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.year-tick-label {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  white-space: nowrap;
}

.dual-range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: grab;
  pointer-events: auto;
}

.dual-range-input::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: grab;
  pointer-events: auto;
}

.decade-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.decade-chip {
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.12s ease, border-color 0.12s ease, color 0.12s ease;
}

.decade-chip:hover {
  background-color: var(--color-surface-hover);
}

.decade-chip.is-selected {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 600;
}

/* ==========================================================================
   Buttons & Segmented Controls
   ========================================================================== */
.text-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--control-h);
  padding: 0 8px;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.15s ease;
}

.text-button:hover {
  background-color: var(--color-primary-soft);
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--control-h);
  height: var(--control-h);
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.icon-button:hover {
  background-color: var(--color-primary-soft);
}

.icon-button.subtle {
  color: var(--color-text-secondary);
}

.icon-button.subtle:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text);
}

.icon-button.is-close:hover {
  background-color: rgba(217, 48, 37, 0.14);
  color: var(--color-danger);
}

.icon-button:disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.segmented-control {
  display: inline-flex;
  padding: 2px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.segmented-btn {
  padding: 3px 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.segmented-btn:hover {
  color: var(--color-text);
}

.segmented-btn.is-active {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.segmented-btn[hidden] {
  display: none;
}

/* ==========================================================================
   Result List & Status Message
   ========================================================================== */
.status-message {
  margin: 0 10px 8px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  background-color: #fce8e6;
  color: var(--color-danger);
  font-size: 12px;
  line-height: 1.4;
}

.status-message[hidden] {
  display: none;
}

html[data-theme="dark"] .status-message {
  background-color: rgba(242, 139, 130, 0.16);
}

.result-list-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid var(--color-divider);
  padding-top: 8px;
  min-width: 0;
}

.result-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.result-list-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.result-badge {
  font-variant-numeric: tabular-nums;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--color-border);
}

.result-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.result-list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.12s ease;
}

.result-list-item:hover {
  background-color: var(--color-surface-hover);
}

.result-list-item.is-selected {
  background-color: var(--color-primary-soft);
}

.result-item-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.result-item-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-list-item.is-selected .result-item-name {
  color: var(--color-primary);
  font-weight: 600;
}

.result-item-author {
  font-size: 12px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-item-year {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.result-list-note {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* ==========================================================================
   Right Inspector (Active Overlays + Tabs: Legend / Sections / Detail)
   ========================================================================== */
.inspector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-divider);
  flex-shrink: 0;
}

.inspector-title-group {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.inspector-title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.inspector-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.wms-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-primary);
  flex-shrink: 0;
}

.wms-dot.is-loading {
  animation: pulse 1.1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

.active-overlays-section {
  padding: 8px 10px;
  border-bottom: 1px solid var(--color-divider);
  background-color: var(--color-surface);
  max-height: 205px;
  overflow-y: auto;
  flex-shrink: 0;
}

.active-overlays-section.is-single {
  padding: 6px 8px;
}

.active-overlays-section.is-single .active-overlay-item {
  padding: 4px 7px;
  gap: 3px;
}

.active-overlays-section.is-single .active-overlay-label {
  font-size: 12px;
}

.active-overlays-section[hidden] {
  display: none;
}

.active-overlay-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.active-overlay-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px 8px;
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  transition: border-color 0.12s ease, background-color 0.12s ease;
}

.active-overlay-item.is-inspecting {
  border-color: var(--color-primary);
  background-color: var(--color-primary-soft);
}

.active-overlay-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.active-overlay-label {
  min-width: 0;
  flex: 1;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.active-overlay-label:hover {
  color: var(--color-primary);
}

.overlay-pin-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 5px;
  border-radius: var(--radius-pill);
  background-color: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  cursor: pointer;
}

.active-overlay-btns {
  display: flex;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
}

.overlay-item-opacity {
  display: flex;
  align-items: center;
  gap: 6px;
}

.overlay-item-opacity-val {
  min-width: 30px;
  text-align: right;
  font-size: 12px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.range-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-border);
  border-radius: var(--radius-pill);
  outline: none;
  cursor: pointer;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

.range-slider::-moz-range-thumb {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Inspector Lower Tabs & Panes */
.inspector-detail-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.inspector-tabs-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-divider);
  flex-shrink: 0;
}

.legend-external-link {
  display: inline-flex;
  align-items: center;
  height: var(--control-h);
  padding: 0 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary);
  text-decoration: none;
  flex-shrink: 0;
}

.legend-external-link:hover {
  background-color: var(--color-primary-soft);
}

.legend-external-link[hidden] {
  display: none;
}

.inspector-pane {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.inspector-pane[hidden] {
  display: none;
}

.inspector-target-bar {
  padding: 6px 12px 2px;
  flex-shrink: 0;
}

.legend-map-name {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.section-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 6px 12px 2px;
  flex-shrink: 0;
}

.section-chips[hidden] {
  display: none;
}

.legend-sidebar-body {
  flex: 1;
  min-height: 0;
  padding: 8px 12px 12px;
  overflow-y: auto;
}

.legend-zoom-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: zoom-in;
}

.legend-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: #ffffff;
}

.legend-image[hidden] {
  display: none;
}

.legend-lens-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 78px;
  height: 78px;
  border: 1.5px solid var(--color-primary);
  background-color: rgba(26, 115, 232, 0.14);
  border-radius: 4px;
  pointer-events: none;
  will-change: transform, opacity;
  opacity: 0;
  visibility: hidden;
  transition: opacity 120ms ease;
  z-index: 5;
}

.legend-lens-indicator.is-visible {
  opacity: 1;
  visibility: visible;
}

.legend-loupe {
  position: fixed;
  left: 0;
  top: 0;
  width: 220px;
  height: 220px;
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-primary);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
  background-color: #ffffff;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 3000;
  will-change: transform, opacity;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-9999px, -9999px, 0) scale(0.94);
  transition: opacity 120ms ease, visibility 0s linear 120ms;
}

.legend-loupe.is-visible {
  opacity: 1;
  visibility: visible;
  transition: opacity 120ms ease, visibility 0s linear 0s;
}

@media (hover: none), (max-width: 960px) {
  .legend-loupe,
  .legend-lens-indicator {
    display: none !important;
  }
}

/* Detail & PDF Tab */
.inspector-detail-pane {
  padding: 12px;
  overflow-y: auto;
  gap: 10px;
}

.legend-panel-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
}

.dominant-info-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.dominant-info-subtitle[hidden] {
  display: none;
}

.dominant-info-meta {
  margin: 0;
  display: grid;
  grid-template-columns: 78px 1fr;
  gap: 5px 8px;
  font-size: 12px;
}

.dominant-info-meta dt {
  color: var(--color-text-secondary);
  font-weight: 600;
}

.dominant-info-meta dd {
  margin: 0;
  color: var(--color-text);
  word-break: break-word;
}

.dominant-info-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
}

.dominant-info-link {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.dominant-info-link:hover {
  background-color: var(--color-primary-soft);
}

/* Reopen Right Inspector Tab */
.reopen-right-tab {
  position: absolute;
  top: 16px;
  right: 12px;
  z-index: 1000;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 11px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  box-shadow: var(--shadow-control);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate3d(16px, 0, 0);
  transition: transform var(--dur-normal) var(--ease-fluid), opacity var(--dur-fast) ease, background-color 120ms ease, visibility 0s linear var(--dur-normal);
}

.reopen-right-tab.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate3d(0, 0, 0);
  transition: transform var(--dur-normal) var(--ease-fluid), opacity var(--dur-fast) ease, background-color 120ms ease, visibility 0s linear 0s;
}

.reopen-right-tab:hover {
  background-color: var(--color-surface-hover);
}

/* ==========================================================================
   Bottom-Right Map Controls & Popovers
   ========================================================================== */
.leaflet-bottom.leaflet-right {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  align-items: flex-end;
  row-gap: 4px;
  column-gap: 8px;
  right: 0;
  max-width: calc(100vw - var(--right-controls-offset) - 16px);
  padding: 0 12px 6px 0;
  transform: translate3d(calc(var(--right-controls-offset) * -1), 0, 0);
  will-change: transform;
  transition: transform var(--dur-normal) var(--ease-fluid);
}

.leaflet-bottom.leaflet-right .leaflet-control-attribution {
  order: 1;
  flex: 0 0 100%;
  margin: 0 !important;
  text-align: right;
  float: none;
  clear: none;
}

.map-bottom-right-controls {
  order: 2;
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin: 0 !important;
  float: none !important;
  clear: none !important;
}

.leaflet-bottom.leaflet-right .leaflet-control-zoom {
  order: 3;
  margin: 0 !important;
  float: none !important;
  clear: none !important;
}

.popover-anchor {
  position: relative;
}

.map-fab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-control);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.map-fab-btn:hover,
.map-fab-btn[aria-expanded="true"] {
  background-color: var(--color-surface-hover);
  color: var(--color-primary);
}

.map-popover {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  width: 268px;
  max-height: calc(100vh - 110px);
  max-height: calc(100dvh - 110px);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-panel-bg);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-floating);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1030;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate3d(0, 6px, 0) scale(0.97);
  transform-origin: bottom right;
  will-change: transform, opacity;
  transition: opacity var(--dur-fast) var(--ease-fluid), transform var(--dur-fast) var(--ease-fluid), visibility 0s linear var(--dur-fast);
}

.map-popover.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1);
  transition: opacity var(--dur-fast) var(--ease-fluid), transform var(--dur-fast) var(--ease-fluid), visibility 0s linear 0s;
}

.popover-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.popover-section + .popover-section {
  padding-top: 8px;
  border-top: 1px solid var(--color-divider);
}

.basemap-segmented {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.popover-switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text);
  cursor: pointer;
}

.seamless-opacity-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 4px;
}

.seamless-opacity-row[hidden],
.seamless-sub-row[hidden] {
  display: none;
}

.seamless-sub-row {
  padding-left: 10px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* Seamless Point Geology Card & Popup */
.seamless-point-card {
  margin: 6px 12px 2px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  font-size: 12px;
  flex-shrink: 0;
}

.seamless-point-card[hidden] {
  display: none;
}

.seamless-geology-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.seamless-swatch {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.22);
  flex-shrink: 0;
}

.seamless-symbol {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  background-color: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text);
}

.seamless-coords {
  margin-left: auto;
  font-size: 12px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.seamless-geology-meta {
  margin: 0;
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 3px 6px;
  font-size: 12px;
  line-height: 1.4;
}

.seamless-geology-meta dt {
  color: var(--color-text-secondary);
  font-weight: 600;
}

.seamless-geology-meta dd {
  margin: 0;
  color: var(--color-text);
  word-break: break-word;
}

.seamless-popup-status {
  font-size: 12px;
  color: var(--color-text-secondary);
  padding: 2px 0;
}

.seamless-leaflet-popup .leaflet-popup-content-wrapper {
  background-color: var(--color-panel-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-floating);
}

.seamless-leaflet-popup .leaflet-popup-tip {
  background-color: var(--color-panel-bg);
}

.seamless-leaflet-popup .leaflet-popup-content {
  margin: 10px 12px;
  min-width: 210px;
}

.map-query-cursor {
  cursor: crosshair !important;
}

.wms-opacity-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.wms-opacity-value {
  min-width: 32px;
  text-align: right;
  font-size: 12px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.popover-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
  border-top: 1px solid var(--color-divider);
}

.prefs-slider-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.prefs-slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

/* ==========================================================================
   Leaflet UI Overrides & Dark Mode
   ========================================================================== */
.leaflet-control-zoom {
  border: none !important;
  border-radius: var(--radius-md) !important;
  box-shadow: var(--shadow-control) !important;
  overflow: hidden;
}

.leaflet-control-zoom a {
  width: 34px !important;
  height: 34px !important;
  line-height: 34px !important;
  color: var(--color-text-secondary) !important;
  background-color: var(--color-bg) !important;
  border-bottom: 1px solid var(--color-border) !important;
  font-weight: 500;
}

.leaflet-control-zoom a:last-child {
  border-bottom: none !important;
}

.leaflet-control-zoom a:hover {
  background-color: var(--color-surface-hover) !important;
  color: var(--color-text) !important;
}

.leaflet-control-scale-line {
  font-family: var(--font-sans) !important;
  font-size: 11px !important;
  color: var(--color-text) !important;
  background: var(--color-bg) !important;
  border-color: var(--color-text-secondary) !important;
}

.leaflet-tooltip.map-hover-tooltip {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-control);
  padding: 4px 8px;
}

.leaflet-control-attribution {
  font-family: var(--font-sans) !important;
  font-size: 11px !important;
  background: var(--color-bg) !important;
  color: var(--color-text-secondary) !important;
}

html[data-theme="dark"] .leaflet-control-attribution a {
  color: var(--color-primary) !important;
}

/* ==========================================================================
   Responsive & Mobile Bottom-Sheet Layout
   ========================================================================== */
.mobile-nav-bar {
  display: none;
}

.decade-chip:active,
.segmented-btn:active,
.map-fab-btn:active,
.icon-button:active,
.text-button:active,
.result-list-item:active {
  transform: scale(0.97);
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ==========================================================================
   Field Trips Layer (日本地質学会 巡検スポット)
   ========================================================================== */
.drawer-mode-tabs {
  flex-shrink: 0;
}

.drawer-mode-pane {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.drawer-mode-pane[hidden] {
  display: none;
}

.drawer-trips-pane {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.drawer-trip-filters {
  display: flex;
  gap: 6px;
}

.drawer-trip-search {
  width: 100%;
  height: var(--control-h);
  margin-top: 6px;
  padding: 0 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 12px;
}

.drawer-trip-search:focus {
  border-color: var(--color-border-focus);
  background-color: var(--color-bg);
}

.field-trip-back-btn {
  align-self: flex-start;
  padding: 2px 0;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.field-trip-back-btn:hover {
  text-decoration: underline;
}

[data-trip-category="volcano"] {
  --trip-color: #fecdd3;
  --trip-color-dark: #fda4af;
  --trip-pill-text: #9f1239;
  --trip-tint: rgba(253, 164, 175, 0.22);
  --trip-accent: #be123c;
  --trip-accent-dark: #fda4af;
  --trip-tint-dark: rgba(253, 164, 175, 0.20);
  --trip-shadow: rgba(244, 63, 94, 0.22);
}

[data-trip-category="basement"] {
  --trip-color: #bbf7d0;
  --trip-color-dark: #86efac;
  --trip-pill-text: #166534;
  --trip-tint: rgba(134, 239, 172, 0.22);
  --trip-accent: #15803d;
  --trip-accent-dark: #86efac;
  --trip-tint-dark: rgba(134, 239, 172, 0.20);
  --trip-shadow: rgba(34, 197, 94, 0.22);
}

[data-trip-category="sedimentary"] {
  --trip-color: #bfdbfe;
  --trip-color-dark: #93c5fd;
  --trip-pill-text: #1e40af;
  --trip-tint: rgba(147, 197, 253, 0.24);
  --trip-accent: #1d4ed8;
  --trip-accent-dark: #93c5fd;
  --trip-tint-dark: rgba(147, 197, 253, 0.20);
  --trip-shadow: rgba(59, 130, 246, 0.22);
}

[data-trip-category="hazard_geo"] {
  --trip-color: #e2e8f0;
  --trip-color-dark: #cbd5e1;
  --trip-pill-text: #334155;
  --trip-tint: rgba(203, 213, 225, 0.28);
  --trip-accent: #475569;
  --trip-accent-dark: #cbd5e1;
  --trip-tint-dark: rgba(203, 213, 225, 0.20);
  --trip-shadow: rgba(100, 116, 139, 0.22);
}

.field-trip-category-filter {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-sub-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.field-trip-category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.decade-chip.field-trip-category-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.decade-chip.field-trip-category-chip.is-active {
  background-color: var(--trip-tint);
  border-color: var(--trip-accent);
  color: var(--trip-accent);
  font-weight: 600;
}

html[data-theme="dark"] .decade-chip.field-trip-category-chip.is-active {
  background-color: var(--trip-tint-dark);
  border-color: var(--trip-accent-dark);
  color: var(--trip-accent-dark);
}

.field-trip-category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--trip-color, var(--color-primary));
  flex-shrink: 0;
}

.field-trip-course-pill-badge {
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 5px;
  background-color: var(--trip-tint, var(--color-primary-soft));
  color: var(--trip-accent, var(--color-primary));
  font-size: 12px;
  font-weight: 700;
}

html[data-theme="dark"] .field-trip-course-pill-badge {
  background-color: var(--trip-tint-dark, var(--color-primary-soft));
  color: var(--trip-accent-dark, var(--color-primary));
}

.field-trip-course-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--trip-color, var(--color-border-focus));
}

.field-trip-course-card[hidden] {
  display: none;
}

.field-trip-course-card-meta {
  font-size: 12px;
  font-weight: 600;
  color: var(--trip-accent, var(--color-primary));
}

html[data-theme="dark"] .field-trip-course-card-meta {
  color: var(--trip-accent-dark, var(--color-primary));
}

.field-trip-course-card-title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
}

.field-trip-list-item-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.field-trip-list-badge {
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 22px;
  padding: 0 5px;
  border-radius: 6px;
  background-color: var(--trip-color, var(--color-primary));
  color: var(--trip-pill-text, #ffffff);
  font-size: 12px;
  font-weight: 700;
}

.field-trip-list-text {
  min-width: 0;
  flex: 1;
}

.field-trip-list-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.field-trip-list-sub {
  font-size: 12px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.field-trip-course-cluster-icon {
  background: transparent;
  border: none;
}

.field-trip-course-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: var(--radius-md);
  background-color: var(--trip-color, var(--color-primary));
  color: var(--trip-pill-text, #ffffff);
  border: 1.5px solid #ffffff;
  box-shadow: var(--shadow-control);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease;
}

.field-trip-course-cluster-icon:hover .field-trip-course-pill {
  border-color: var(--trip-accent, var(--color-primary));
  box-shadow: var(--shadow-floating);
}

.field-trip-course-pill-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--radius-sm);
  background-color: rgba(255, 255, 255, 0.55);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.field-trip-select {
  flex: 1;
  min-width: 0;
  height: var(--control-h);
  padding: 0 8px;
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.field-trip-select:hover {
  border-color: var(--color-border-focus);
}

.field-trip-marker-icon {
  background: transparent;
  border: none;
}

.field-trip-pin {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background-color: var(--trip-color, var(--color-primary));
  border: 2px solid #ffffff;
  box-shadow: var(--shadow-control);
  transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease;
}

.field-trip-marker-icon:hover .field-trip-pin {
  border-color: var(--trip-accent, var(--color-primary));
  box-shadow: var(--shadow-floating);
}

.field-trip-pin.is-active {
  border-color: var(--color-text);
  box-shadow: var(--shadow-floating);
}

.field-trip-pin-num {
  font-variant-numeric: tabular-nums;
  transform: rotate(45deg);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: var(--trip-pill-text, #ffffff);
  letter-spacing: -0.02em;
}

.field-trip-leaflet-popup .leaflet-popup-content-wrapper {
  background-color: var(--color-panel-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-floating);
}

.field-trip-leaflet-popup .leaflet-popup-tip {
  background-color: var(--color-panel-bg);
}

.field-trip-leaflet-popup .leaflet-popup-content {
  margin: 12px 14px;
  width: min(280px, calc(100vw - 64px)) !important;
  font-family: var(--font-sans);
  line-height: 1.45;
}

.field-trip-guidebook-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 7px 12px;
  border-radius: 7px;
  background-color: var(--color-primary);
  color: #ffffff !important;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity var(--dur-fast) ease, transform var(--dur-fast) ease;
}

html[data-theme="dark"] .field-trip-guidebook-btn {
  color: #0d1117 !important;
}

.field-trip-guidebook-btn:hover {
  opacity: 0.9;
}

.field-trip-guidebook-btn:active {
  transform: scale(0.98);
}

.field-trip-no-guidebook {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.suggestion-badge.is-field-trip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: var(--trip-tint, var(--color-primary-soft));
  color: var(--trip-accent, var(--color-primary));
}

.suggestion-badge.is-field-trip[data-trip-category]::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--trip-color);
  flex-shrink: 0;
}

html[data-theme="dark"] .suggestion-badge.is-field-trip {
  background-color: var(--trip-tint-dark, var(--color-primary-soft));
  color: var(--trip-accent-dark, var(--color-primary));
}

.map-fab-btn.is-locating {
  color: var(--color-primary);
  animation: locate-pulse 1.2s ease-in-out infinite;
}

.map-fab-btn.is-field-trip-active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

.map-fab-btn.is-field-trip-active:hover {
  opacity: 0.9;
}

html[data-theme="dark"] .map-fab-btn.is-field-trip-active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #0d1117;
}

@keyframes locate-pulse {
  0%, 100% {
    box-shadow: var(--shadow-control);
  }
  50% {
    box-shadow: 0 0 0 5px var(--color-primary-soft), var(--shadow-control);
  }
}

.user-location-marker {
  background: transparent;
  border: none;
}

.user-location-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #1a73e8;
  border: 3px solid #ffffff;
  box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.28), 0 2px 6px rgba(0, 0, 0, 0.35);
}

.field-trip-expand-toggle-btn {
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 600;
}

.field-trip-course-actions {
  display: flex;
  gap: 6px;
  margin-top: 2px;
}

.field-trip-course-actions .field-trip-guidebook-btn {
  flex: 1;
}

.field-trip-course-toggle-btn {
  padding: 6px 10px;
  border-radius: 7px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color var(--dur-fast) ease, border-color var(--dur-fast) ease;
}

.field-trip-course-toggle-btn:hover {
  background-color: var(--color-surface-hover);
  border-color: var(--color-border-focus);
}

.field-trip-active-bar {
  position: absolute;
  left: calc(var(--left-panel-offset) + (100vw - var(--left-panel-offset) - var(--right-panel-offset)) / 2);
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 1005;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 14px;
  border-radius: var(--radius-lg);
  background-color: var(--color-panel-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-floating);
  width: min(430px, calc(100vw - var(--left-panel-offset) - var(--right-panel-offset) - 210px));
  min-width: 280px;
  transition: left var(--dur-normal) var(--ease-fluid), width var(--dur-normal) var(--ease-fluid);
}

.field-trip-active-bar[hidden] {
  display: none;
}

.field-trip-active-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.field-trip-active-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.field-trip-active-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--trip-accent, var(--color-primary));
}

html[data-theme="dark"] .field-trip-active-badge {
  color: var(--trip-accent-dark, var(--color-primary));
}

.field-trip-active-count {
  font-size: 12px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.field-trip-active-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.field-trip-active-authors {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.35;
}

.field-trip-active-authors[hidden] {
  display: none;
}

.field-trip-stop-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.field-trip-stop-nav[hidden] {
  display: none;
}

.field-trip-stop-nav-btn {
  flex-shrink: 0;
  width: 68px;
  padding: 5px 6px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  transition: background-color var(--dur-fast) ease, opacity var(--dur-fast) ease;
}

.field-trip-stop-nav-btn:hover:not(:disabled) {
  background-color: var(--color-surface-hover);
  border-color: var(--color-border-focus);
}

.field-trip-stop-nav-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.field-trip-stop-nav-center {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-trip-current-stop-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text);
}

.field-trip-current-stop-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.35;
  height: calc(12px * 1.35 * 2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.field-trip-active-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.field-trip-bar-btn {
  padding: 5px 9px;
  border-radius: 7px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color var(--dur-fast) ease, opacity var(--dur-fast) ease;
}

.field-trip-bar-btn:hover {
  background-color: var(--color-surface-hover);
}

.field-trip-bar-btn.is-overlay {
  background-color: var(--color-primary-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.field-trip-bar-btn.is-overlay:hover {
  background-color: var(--color-primary);
  color: #ffffff;
}

html[data-theme="dark"] .field-trip-bar-btn.is-overlay:hover {
  color: #0d1117;
}

.field-trip-bar-btn.is-overlay[hidden] {
  display: none;
}

.field-trip-bar-btn.is-guidebook {
  flex: 1;
  text-align: center;
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

html[data-theme="dark"] .field-trip-bar-btn.is-guidebook {
  color: #0d1117;
}

.field-trip-bar-btn.is-guidebook:hover {
  background-color: var(--color-primary);
  opacity: 0.9;
}

.field-trip-bar-btn.is-guidebook[hidden] {
  display: none;
}

.field-trip-cluster-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: var(--radius-md);
  background-color: var(--trip-color, #cbd5e1);
  color: var(--trip-pill-text, #1e293b);
  border: 2px solid #ffffff;
  box-shadow: var(--shadow-control);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease;
}

.field-trip-course-cluster-icon:hover .field-trip-cluster-pill {
  border-color: var(--trip-accent, var(--color-primary));
  box-shadow: var(--shadow-floating);
}

.field-trip-cluster-popup-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
  max-height: 240px;
  overflow-y: auto;
}

.field-trip-cluster-popup-name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.field-trip-cluster-popup-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-secondary);
  margin-bottom: 2px;
}

.field-trip-cluster-popup-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.field-trip-cluster-popup-btn:hover {
  background-color: var(--color-surface-hover);
  border-color: var(--color-border-focus);
}

.seamless-guide-card {
  margin: 8px 12px 12px;
  padding: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.seamless-guide-card[hidden] {
  display: none;
}

.seamless-guide-text {
  margin: 0;
  font-size: 12px;
  color: var(--color-text);
  line-height: 1.55;
}

.seamless-guide-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.field-trip-bar-btn.is-collapse {
  background-color: var(--trip-tint, var(--color-primary-soft));
  border-color: var(--trip-accent, var(--color-border-focus));
  color: var(--trip-accent, var(--color-primary));
}

html[data-theme="dark"] .field-trip-bar-btn.is-collapse {
  background-color: var(--trip-tint-dark, var(--color-primary-soft));
  border-color: var(--trip-accent-dark, var(--color-border-focus));
  color: var(--trip-accent-dark, var(--color-primary));
}

@media (max-height: 540px) {
  .field-trip-active-bar {
    padding: 7px 10px;
    gap: 5px;
  }

  .field-trip-active-authors,
  .field-trip-current-stop-desc {
    display: none !important;
  }
}

@media (max-width: 960px) {
  .app-layout.has-left-drawer {
    --left-panel-offset: 292px;
  }
  .app-layout.has-right-inspector {
    --right-panel-offset: 302px;
  }
  .left-drawer {
    width: 280px;
  }
  .right-inspector {
    width: 290px;
  }
}

@media (min-width: 721px) and (max-width: 1024px) {
  .field-trip-active-bar {
    left: calc(var(--left-panel-offset) + 12px);
    transform: none;
  }
}

@media (max-width: 720px) {
  .app-layout.has-left-drawer,
  .app-layout.has-right-inspector {
    --left-panel-offset: 0px;
    --right-panel-offset: 0px;
  }

  .mobile-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1200;
    height: 44px;
    padding: 4px 8px;
    display: flex;
    gap: 6px;
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
  }

  .mobile-nav-btn {
    flex: 1;
    border: none;
    border-radius: 6px;
    background: transparent;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .mobile-nav-btn[hidden] {
    display: none;
  }

  .mobile-nav-btn.is-active {
    background-color: var(--color-primary-soft);
    color: var(--color-primary);
  }

  .map-container {
    top: 44px;
    height: calc(100vh - 44px);
    height: calc(100dvh - 44px);
  }

  .left-drawer,
  .right-inspector {
    display: none;
    top: 52px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    width: auto;
    z-index: 1100;
  }

  .app-layout[data-mobile-view="search"] .left-drawer {
    display: flex;
  }

  .app-layout[data-mobile-view="search"] .left-drawer.is-collapsed .drawer-body-wrap {
    grid-template-rows: 1fr;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    flex: 1;
  }

  .app-layout[data-mobile-view="search"] .left-drawer.is-collapsed .drawer-body {
    display: flex;
  }

  .app-layout[data-mobile-view="legend"] .right-inspector.is-open {
    display: flex;
  }

  .app-layout[data-mobile-view="legend"] .right-inspector.is-compact {
    bottom: auto;
    max-height: calc(100vh - 60px);
  }

  .reopen-right-tab {
    display: none !important;
  }

  .leaflet-bottom.leaflet-right {
    padding-right: 8px;
    padding-bottom: 6px;
  }

  .map-popover {
    width: min(268px, calc(100vw - 24px));
  }

  .field-trip-active-bar {
    left: 8px;
    right: 8px;
    width: auto;
    min-width: 0;
    transform: none;
    bottom: 96px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### `js/config.js`（全 118 行）

```javascript
/**
 * アプリケーション設定定数・地域/提供機関英語マッピング
 */
export const CONFIG = {
  GEOJSON_URL: 'data/map_index.geojson',
  FIELD_TRIPS_GEOJSON_URL: 'data/field_trips.geojson',
  SEAMLESS_PROVIDER_URL: 'data/providers/gsj_seamless_200k.json',
  SEAMLESS_LEGEND_API_URL: 'https://gbank.gsj.jp/seamless/v2/api/1.2/legend.json',
  BASEMAPS: {
    blank: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（白地図）</a>',
      maxNativeZoom: 14,
      maxZoom: 18
    },
    pale: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（淡色）</a>',
      maxZoom: 18
    },
    std: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（標準）</a>',
      maxZoom: 18
    },
    photo: {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル（航空写真）</a>',
      maxZoom: 18
    }
  },
  GSJ_ATTRIBUTION: '産業技術総合研究所 地質調査総合センター',
  INITIAL_CENTER: [36.5, 138.0],
  INITIAL_ZOOM: 5.5,
  MIN_ZOOM: 2,
  MAX_ZOOM: 18,
  MAX_LIST_ITEMS: 100,
  MAX_SUGGESTIONS: 10,
  MAX_OVERLAYS: 4,
  LOUPE_ZOOM: 2.8,
  DEFAULT_OVERLAY_OPACITY: 0.85,
  DEFAULT_SEAMLESS_OPACITY: 0.65,
  SETTINGS_STORAGE_KEY: 'geomap_settings_v1',
  DEFAULT_SETTINGS: {
    basemap: 'blank',
    showIndexFrames: true,
    showFieldTrips: true,
    fieldTripYear: 'all',
    fieldTripCourse: 'all',
    fieldTripCategories: [],
    viewportOnly: false,
    seamless200k: false,
    seamlessOpacity: 0.65,
    seamlessQueryPriority: false,
    overlayOpacity: 0.85,
    wheelZoomSpeed: 1.0,
    showScaleBar: true,
    showFieldTripRoute: true,
    theme: '',
    lang: 'ja'
  },
  WMS_OPTIONS: {
    layers: 'geo_A',
    transparent: true,
    format: 'image/png',
    version: '1.1.1'
  },
  POLYGON_STYLE: {
    default: {
      color: '#1557b0',
      weight: 1.8,
      opacity: 0.85,
      fillColor: '#1a73e8',
      fillOpacity: 0.08
    },
    hover: {
      color: '#0d47a1',
      weight: 2.6,
      opacity: 0.98,
      fillColor: '#1a73e8',
      fillOpacity: 0.2
    },
    selected: {
      color: '#0b57d0',
      weight: 3,
      opacity: 1,
      fillColor: '#1a73e8',
      fillOpacity: 0.14
    }
  }
};

export const REGION_EN_MAP = {
  '北海道': 'Hokkaido',
  '富山県': 'Toyama',
  '石川県': 'Ishikawa',
  '長野県': 'Nagano',
  '岐阜県': 'Gifu',
  '山梨県': 'Yamanashi',
  '静岡県': 'Shizuoka',
  '福岡県': 'Fukuoka',
  '宮城県': 'Miyagi',
  '全国': 'Nationwide'
};

export const PROVIDER_EN_MAP = {
  '産業技術総合研究所 地質調査総合センター': 'Geological Survey of Japan, AIST',
  '北海道立総合研究機構 エネルギー・環境・地質研究所': 'Geological Survey of Hokkaido, HRO'
};

export const FIELD_TRIP_CATEGORIES = {
  volcano: { color: '#fecdd3', darkColor: '#fda4af', accentDark: '#fda4af', routeColor: '#fb7185' },
  basement: { color: '#bbf7d0', darkColor: '#86efac', accentDark: '#86efac', routeColor: '#4ade80' },
  sedimentary: { color: '#bfdbfe', darkColor: '#93c5fd', accentDark: '#93c5fd', routeColor: '#60a5fa' },
  hazard_geo: { color: '#e2e8f0', darkColor: '#cbd5e1', accentDark: '#cbd5e1', routeColor: '#94a3b8' }
};

export const FIELD_TRIP_CATEGORY_KEYS = Object.keys(FIELD_TRIP_CATEGORIES);
```

### `js/dom.js`（全 65 行）

```javascript
/**
 * 共通 DOM 生成・巡検キーユーティリティ
 */

/**
 * HTML 要素を属性・イベントリスナー・子要素付きで簡潔に生成する
 */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  if (attrs && typeof attrs === 'object') {
    Object.entries(attrs).forEach(([key, val]) => {
      if (val === null || val === undefined || val === false) {
        return;
      }
      if (key === 'className' || key === 'class') {
        node.className = String(val);
      } else if (key === 'dataset' && typeof val === 'object') {
        Object.entries(val).forEach(([dKey, dVal]) => {
          if (dVal !== null && dVal !== undefined && dVal !== '') {
            node.dataset[dKey] = String(dVal);
          }
        });
      } else if (key === 'style' && typeof val === 'object') {
        Object.assign(node.style, val);
      } else if (key.startsWith('on') && typeof val === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), val);
      } else if (key === 'textContent') {
        node.textContent = String(val);
      } else if (val === true) {
        node.setAttribute(key, '');
        if (key in node) {
          node[key] = true;
        }
      } else if (key.startsWith('aria-') || key === 'role') {
        node.setAttribute(key, String(val));
      } else if (key in node && key !== 'list') {
        node[key] = val;
      } else {
        node.setAttribute(key, String(val));
      }
    });
  }

  const appendChild = (child) => {
    if (child === null || child === undefined || child === false) {
      return;
    }
    if (Array.isArray(child)) {
      child.forEach(appendChild);
    } else if (child instanceof Node) {
      node.appendChild(child);
    } else {
      node.appendChild(document.createTextNode(String(child)));
    }
  };
  children.forEach(appendChild);
  return node;
}

/**
 * 巡検コースの一意キー（YYYY_コース略称）を返す
 */
export function getCourseKey(props) {
  return `${props?.year || ''}_${props?.course_abbr || ''}`;
}
```

### `js/fieldTrips.js`（全 1221 行）

```javascript
import { CONFIG, FIELD_TRIP_CATEGORIES, FIELD_TRIP_CATEGORY_KEYS } from './config.js';
import { el, getCourseKey } from './dom.js';
import { t } from './i18n.js';
import { addOverlayForItem } from './inspector.js';
import { getMapFitPadding, switchMobileView, syncSettingsUI } from './map.js';
import { getItemBounds, isSafeUrl, normalizeSearchText } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { saveSettings, state, dom } from './state.js';

function populateSelectOptions(selectEl, options, allLabel, currentValue) {
  if (!selectEl) {
    return;
  }
  selectEl.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = allLabel;
  selectEl.appendChild(allOpt);
  options.forEach(({ value, label }) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = label;
    selectEl.appendChild(opt);
  });
  selectEl.value = currentValue;
}

/**
 * 巡検テーマカテゴリ絞り込みチップ（凡例兼用）を描画する
 */
export function renderFieldTripCategoryChips() {
  if (!dom.drawerTripCategoryChips) {
    return;
  }
  const dict = t();
  const labels = dict.fieldTripCategories || {};
  dom.drawerTripCategoryChips.innerHTML = '';

  FIELD_TRIP_CATEGORY_KEYS.forEach((key) => {
    const isActive = state.selectedFieldTripCategories.has(key);
    const btn = el('button', {
      type: 'button',
      className: `decade-chip field-trip-category-chip${isActive ? ' is-active' : ''}`,
      dataset: { tripCategory: key },
      'aria-pressed': String(isActive),
      onClick: () => {
        if (state.selectedFieldTripCategories.has(key)) {
          state.selectedFieldTripCategories.delete(key);
        } else {
          state.selectedFieldTripCategories.add(key);
        }
        state.settings.fieldTripCategories = Array.from(state.selectedFieldTripCategories);
        saveSettings();
        renderFieldTripCategoryChips();
        populateFieldTripFilters();
        renderFieldTripMarkers();
        renderFieldTripList();
        schedulePermalinkSync();
      }
    },
      el('span', { className: 'field-trip-category-dot', 'aria-hidden': 'true' }),
      el('span', {}, labels[key] || key)
    );
    dom.drawerTripCategoryChips.appendChild(btn);
  });
}

/**
 * 現在の年・コース・カテゴリ・キーワード絞り込みに合致する巡検スポット一覧を返す
 */
export function getFilteredFieldTripItems() {
  const tokens = normalizeSearchText((state.fieldTripQuery || '').trim()).split(/\s+/).filter(Boolean);
  return state.fieldTripItems.filter(({ props, normalizedSearchText }) => {
    if (
      state.selectedFieldTripCategories.size > 0 &&
      !state.selectedFieldTripCategories.has(props.category)
    ) {
      return false;
    }
    if (state.fieldTripYear !== 'all' && String(props.year) !== state.fieldTripYear) {
      return false;
    }
    if (state.fieldTripCourse !== 'all' && props.course_abbr !== state.fieldTripCourse) {
      return false;
    }
    if (tokens.length > 0) {
      const haystack = normalizedSearchText || normalizeSearchText(
        `${props.id || ''} ${props.year || ''} ${props.course_abbr || ''} ${props.course_name || ''} ${props.authors || ''} ${props.stop_abbr || ''} ${props.stop_name || ''} ${props.description || ''}`
      );
      if (!tokens.every((tok) => haystack.includes(tok))) {
        return false;
      }
    }
    return true;
  });
}

/**
 * 巡検フィルタ（年・コース）の選択肢を更新する（年に連動してコースを絞り込む）
 */
export function populateFieldTripFilters() {
  const dict = t();
  const categoryItems = state.selectedFieldTripCategories.size > 0
    ? state.fieldTripItems.filter((it) => state.selectedFieldTripCategories.has(it.props.category))
    : state.fieldTripItems;

  const years = Array.from(new Set(categoryItems.map((it) => String(it.props.year)).filter(Boolean)))
    .sort((a, b) => Number(b) - Number(a));
  if (!years.includes(state.fieldTripYear)) {
    state.fieldTripYear = 'all';
    state.settings.fieldTripYear = 'all';
  }
  const yearOpts = years.map((y) => ({ value: y, label: `${y}${dict.fieldTripYearSuffix}` }));
  populateSelectOptions(dom.drawerTripYearFilter, yearOpts, dict.fieldTripAllYears, state.fieldTripYear);

  const courses = Array.from(
    new Set(
      categoryItems
        .filter((it) => state.fieldTripYear === 'all' || String(it.props.year) === state.fieldTripYear)
        .map((it) => it.props.course_abbr)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'ja'));
  if (!courses.includes(state.fieldTripCourse)) {
    state.fieldTripCourse = 'all';
    state.settings.fieldTripCourse = 'all';
  }
  const courseOpts = courses.map((c) => ({ value: c, label: c }));
  populateSelectOptions(dom.drawerTripCourseFilter, courseOpts, dict.fieldTripAllCourses, state.fieldTripCourse);
}

/**
 * 現在 1 コースのみ展開中のソート済み巡検スポット配列を返す（それ以外は空配列）
 */
export function getExpandedCourseStops() {
  const filtered = getFilteredFieldTripItems();
  const activeCourseKeys = Array.from(new Set(
    filtered.map((it) => getCourseKey(it.props))
  )).filter((key) => state.expandedFieldTripCourses.has(key));

  if (activeCourseKeys.length !== 1) {
    return [];
  }
  const key = activeCourseKeys[0];
  return filtered
    .filter((it) => getCourseKey(it.props) === key)
    .sort((a, b) =>
      String(a.props.stop_no || '').localeCompare(String(b.props.stop_no || ''), undefined, { numeric: true })
    );
}

/**
 * 展開中の巡検コースで前後（delta = -1 / +1）の地点へ移動する
 */
export function stepFieldTripStop(delta) {
  const sorted = getExpandedCourseStops();
  if (sorted.length <= 1) {
    return false;
  }
  let idx = sorted.findIndex((it) => it.props.id === state.selectedFieldTripId);
  if (idx < 0) {
    idx = 0;
  }
  const nextIdx = ((idx + delta) % sorted.length + sorted.length) % sorted.length;
  focusFieldTripSpot(sorted[nextIdx]);
  return true;
}

/**
 * 指定座標を包含する 5万分の1地質図幅（geological_map_sheet かつオーバーレイ可能）を検索する
 */
export function findSheetMapForLatLng(latlng) {
  if (!latlng || !Array.isArray(state.allItems) || state.allItems.length === 0) {
    return null;
  }
  let bestItem = null;
  let bestArea = Infinity;
  for (let i = 0; i < state.allItems.length; i += 1) {
    const item = state.allItems[i];
    const meta = item && item.meta;
    if (!meta || meta.mapType !== 'geological_map_sheet' || !meta.overlayType) {
      continue;
    }
    const bounds = getItemBounds(item);
    if (!bounds || !bounds.isValid() || !bounds.contains(latlng)) {
      continue;
    }
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const area = Math.abs((ne.lat - sw.lat) * (ne.lng - sw.lng));
    if (area < bestArea) {
      bestArea = area;
      bestItem = item;
    }
  }
  return bestItem;
}

/**
 * 指定 Stop 配列から現在選択中（または先頭）の Stop に対応する重ね合わせ候補図幅を返す
 */
function getOverlayCandidateForStops(stops) {
  if (!Array.isArray(stops) || stops.length === 0) {
    return null;
  }
  const current = stops.find((it) => it.props.id === state.selectedFieldTripId) || stops[0];
  return current ? findSheetMapForLatLng(current.latlng) : null;
}

/**
 * 展開中の現在地点（未選択時はコース代表座標）を包含する地質図を重ねる
 */
export function overlayGeoMapAtCurrentSpot() {
  const matched = getOverlayCandidateForStops(getExpandedCourseStops());
  if (matched) {
    addOverlayForItem(matched);
  }
}

/**
 * 選択中の Stop ピンへ .is-active クラスと zIndexOffset を同期する
 */
export function syncActiveFieldTripMarkerHighlight() {
  state.fieldTripItems.forEach((item) => {
    if (!item.marker) {
      return;
    }
    const isSelected = Boolean(state.selectedFieldTripId && item.props.id === state.selectedFieldTripId);
    if (typeof item.marker.setZIndexOffset === 'function') {
      item.marker.setZIndexOffset(isSelected ? 500 : 0);
    }
    const el = typeof item.marker.getElement === 'function' ? item.marker.getElement() : null;
    if (el) {
      const pin = el.querySelector('.field-trip-pin');
      if (pin) {
        pin.classList.toggle('is-active', isSelected);
      }
    }
  });
}

/**
 * 地図下部中央の展開中コース操作バー＆ドロワー展開ボタンを同期する
 */
export function syncFieldTripActiveBar() {
  const dict = t();
  const filtered = getFilteredFieldTripItems();
  const activeCourseKeys = Array.from(new Set(
    filtered.map((it) => getCourseKey(it.props))
  )).filter((key) => state.expandedFieldTripCourses.has(key));

  if (dom.toggleExpandTripsBtn) {
    const allExpanded = filtered.length > 0 && activeCourseKeys.length > 0;
    dom.toggleExpandTripsBtn.textContent = allExpanded ? dict.fieldTripCollapse : dict.fieldTripExpand;
  }

  if (!dom.fieldTripActiveBar) {
    return;
  }
  if (!state.showFieldTrips || activeCourseKeys.length === 0) {
    delete dom.fieldTripActiveBar.dataset.tripCategory;
    if (dom.fieldTripStopNav) {
      dom.fieldTripStopNav.hidden = true;
    }
    dom.fieldTripActiveBar.hidden = true;
    syncActiveFieldTripMarkerHighlight();
    return;
  }

  if (activeCourseKeys.length === 1) {
    const sorted = getExpandedCourseStops();
    const sample = sorted[0] ? sorted[0].props : {};
    if (sample.category) {
      dom.fieldTripActiveBar.dataset.tripCategory = sample.category;
    } else {
      delete dom.fieldTripActiveBar.dataset.tripCategory;
    }
    if (dom.fieldTripActiveBadge) {
      dom.fieldTripActiveBadge.textContent = `${sample.year || ''}${dict.fieldTripYearSuffix} ・ ${sample.course_abbr || ''}`.trim();
    }
    if (dom.fieldTripActiveCount) {
      dom.fieldTripActiveCount.textContent = dict.fieldTripCount(sorted.length);
    }
    if (dom.fieldTripActiveLabel) {
      dom.fieldTripActiveLabel.textContent = sample.course_name || sample.course_abbr || '';
    }
    if (dom.fieldTripActiveAuthors) {
      if (sample.authors) {
        dom.fieldTripActiveAuthors.textContent = `${dict.authorsLabel}: ${sample.authors}`;
        dom.fieldTripActiveAuthors.hidden = false;
      } else {
        dom.fieldTripActiveAuthors.hidden = true;
      }
    }
    if (dom.fieldTripBarOverlayBtn) {
      const matchedMap = getOverlayCandidateForStops(sorted);
      if (matchedMap) {
        dom.fieldTripBarOverlayBtn.textContent = dict.fieldTripOverlayMapHere;
        dom.fieldTripBarOverlayBtn.hidden = false;
      } else {
        dom.fieldTripBarOverlayBtn.hidden = true;
      }
    }
    if (dom.fieldTripBarGuidebookBtn) {
      if (isSafeUrl(sample.guidebook_url)) {
        dom.fieldTripBarGuidebookBtn.href = sample.guidebook_url;
        dom.fieldTripBarGuidebookBtn.textContent = dict.fieldTripOpenGuidebook;
        dom.fieldTripBarGuidebookBtn.hidden = false;
      } else {
        dom.fieldTripBarGuidebookBtn.hidden = true;
      }
    }

    if (dom.fieldTripStopNav && sorted.length > 0) {
      let currentIndex = sorted.findIndex((it) => it.props.id === state.selectedFieldTripId);
      if (currentIndex < 0) {
        currentIndex = 0;
        state.selectedFieldTripId = sorted[0].props.id || null;
      }
      const currentSpot = sorted[currentIndex];
      const sp = currentSpot.props;
      const canCycle = sorted.length > 1;
      if (dom.fieldTripPrevStopBtn) {
        dom.fieldTripPrevStopBtn.textContent = `← ${dict.fieldTripPrevStop}`;
        dom.fieldTripPrevStopBtn.disabled = !canCycle;
      }
      if (dom.fieldTripNextStopBtn) {
        dom.fieldTripNextStopBtn.textContent = `${dict.fieldTripNextStop} →`;
        dom.fieldTripNextStopBtn.disabled = !canCycle;
      }
      if (dom.fieldTripCurrentStopLabel) {
        const stopNoLabel = sp.stop_no || String(currentIndex + 1);
        const rawStopName = sp.stop_name || sp.stop_abbr || '';
        const cleanStopName = rawStopName.replace(/^Stop\s*\d+\s*[:：\-—]\s*/i, '');
        dom.fieldTripCurrentStopLabel.textContent =
          `${stopNoLabel} / ${sorted.length} : ${cleanStopName}`.trim();
      }
      if (dom.fieldTripCurrentStopDesc) {
        dom.fieldTripCurrentStopDesc.textContent = sp.description || '';
        dom.fieldTripCurrentStopDesc.hidden = false;
      }
      dom.fieldTripStopNav.hidden = false;
    }
  } else {
    const totalStops = filtered.filter((it) =>
      activeCourseKeys.includes(getCourseKey(it.props))
    ).length;
    if (dom.fieldTripActiveBadge) {
      dom.fieldTripActiveBadge.textContent = dict.fieldTripCoursesActive(activeCourseKeys.length);
    }
    if (dom.fieldTripActiveCount) {
      dom.fieldTripActiveCount.textContent = dict.fieldTripCount(totalStops);
    }
    if (dom.fieldTripActiveLabel) {
      dom.fieldTripActiveLabel.textContent = dict.fieldTripsLabel;
    }
    if (dom.fieldTripActiveAuthors) {
      dom.fieldTripActiveAuthors.hidden = true;
    }
    if (dom.fieldTripBarOverlayBtn) {
      dom.fieldTripBarOverlayBtn.hidden = true;
    }
    if (dom.fieldTripBarGuidebookBtn) {
      dom.fieldTripBarGuidebookBtn.hidden = true;
    }
    if (dom.fieldTripStopNav) {
      dom.fieldTripStopNav.hidden = true;
    }
    delete dom.fieldTripActiveBar.dataset.tripCategory;
  }
  if (dom.fieldTripBarFitBtn) {
    dom.fieldTripBarFitBtn.textContent = dict.fieldTripBarFit;
  }
  if (dom.fieldTripBarCollapseBtn) {
    dom.fieldTripBarCollapseBtn.textContent = dict.fieldTripCollapse;
  }
  dom.fieldTripActiveBar.hidden = false;
  syncActiveFieldTripMarkerHighlight();
}

function createStarIconSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '11');
  svg.setAttribute('height', '11');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  poly.setAttribute('points', '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2');
  svg.appendChild(poly);
  return svg;
}

function createFieldTripMarker(props, latlng) {
  const pinEl = el('div', { className: 'field-trip-pin', dataset: { tripCategory: props.category } },
    el('span', { className: 'field-trip-pin-num' }, props.stop_no || createStarIconSvg())
  );

  const icon = L.divIcon({
    className: 'field-trip-marker-icon',
    html: pinEl.outerHTML,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
  });
  const marker = L.marker(latlng, { icon, pane: 'fieldTripsPane', keyboard: true });
  const tooltipText = `${props.year || ''} ${props.course_abbr || ''} ${props.stop_no ? `#${props.stop_no}` : ''} ${props.stop_abbr || props.stop_name || ''}`.trim();
  marker.bindTooltip(tooltipText, { direction: 'top', offset: [0, -24] });
  marker.on('add', () => {
    const isSelected = Boolean(state.selectedFieldTripId && props.id === state.selectedFieldTripId);
    marker.setZIndexOffset(isSelected ? 500 : 0);
    const el = marker.getElement();
    if (el) {
      const pin = el.querySelector('.field-trip-pin');
      if (pin) {
        pin.classList.toggle('is-active', isSelected);
      }
    }
  });
  marker.on('click', () => {
    state.selectedFieldTripId = props.id || null;
    syncFieldTripActiveBar();
    renderFieldTripList();
  });
  return marker;
}

/**
 * 巡検スポットの Leaflet マーカーを遅延生成してキャッシュする
 */
export function ensureFieldTripMarker(ftItem) {
  if (!ftItem) {
    return null;
  }
  if (!ftItem.marker) {
    ftItem.marker = createFieldTripMarker(ftItem.props, ftItem.latlng);
  }
  return ftItem.marker;
}

function addExpandedCourseMarkers(sorted) {
  const coordGroups = new Map();
  sorted.forEach((item) => {
    const key = `${item.latlng.lat.toFixed(6)},${item.latlng.lng.toFixed(6)}`;
    if (!coordGroups.has(key)) {
      coordGroups.set(key, []);
    }
    coordGroups.get(key).push(item);
  });

  coordGroups.forEach((group) => {
    if (group.length === 1 || !state.map) {
      group.forEach((item) => {
        const marker = ensureFieldTripMarker(item);
        marker.setLatLng(item.latlng);
        marker.addTo(state.fieldTripsLayerGroup);
      });
      return;
    }

    const baseLatLng = group[0].latlng;
    const basePoint = state.map.latLngToLayerPoint(baseLatLng);
    const radius = group.length === 2 ? 18 : 22 + group.length * 2;
    const sampleCat = group[0] && group[0].props ? group[0].props.category : '';
    const routeColor = (FIELD_TRIP_CATEGORIES[sampleCat] && FIELD_TRIP_CATEGORIES[sampleCat].routeColor) || '#d97706';

    L.circleMarker(baseLatLng, {
      pane: 'fieldTripsPane',
      radius: 3.5,
      color: routeColor,
      fillColor: '#ffffff',
      fillOpacity: 1,
      weight: 1.5
    }).addTo(state.fieldTripsLayerGroup);

    group.forEach((item, idx) => {
      const angle = group.length === 2
        ? (idx === 0 ? Math.PI : 0)
        : (2 * Math.PI * idx) / group.length - Math.PI / 2;
      const offsetPoint = L.point(
        basePoint.x + Math.cos(angle) * radius,
        basePoint.y + Math.sin(angle) * radius
      );
      const offsetLatLng = state.map.layerPointToLatLng(offsetPoint);

      L.polyline([baseLatLng, offsetLatLng], {
        pane: 'fieldTripsPane',
        color: routeColor,
        weight: 1.5,
        opacity: 0.7
      }).addTo(state.fieldTripsLayerGroup);

      const marker = ensureFieldTripMarker(item);
      marker.setLatLng(offsetLatLng);
      marker.addTo(state.fieldTripsLayerGroup);
    });
  });
}

/**
 * 展開コースのルート破線と Stop マーカーを地図へ描画する
 */
function renderExpandedCourseOnMap(items) {
  const sorted = [...items].sort((a, b) =>
    String(a.props.stop_no || '').localeCompare(String(b.props.stop_no || ''), undefined, { numeric: true })
  );
  if (state.showFieldTripRoute && sorted.length >= 2) {
    const sampleCat = sorted[0] && sorted[0].props ? sorted[0].props.category : '';
    const routeColor = (FIELD_TRIP_CATEGORIES[sampleCat] && FIELD_TRIP_CATEGORIES[sampleCat].routeColor) || '#d97706';
    L.polyline(sorted.map((it) => it.latlng), {
      pane: 'fieldTripsPane',
      color: routeColor,
      weight: 2.5,
      opacity: 0.78,
      dashArray: '5, 6'
    }).addTo(state.fieldTripsLayerGroup);
  }
  addExpandedCourseMarkers(sorted);
}

/**
 * 未展開コース配列を画面座標グリッドバケット（108×34px）で O(K) クラスタリングする
 */
function clusterCourseEntries(courseEntries, map) {
  if (!map) {
    return courseEntries.map((entry) => ({ courses: [entry], latlng: entry.latlng, point: entry.point }));
  }
  const CELL_W = 108;
  const CELL_H = 34;
  const grid = new Map();
  const clusters = [];

  courseEntries.forEach((entry) => {
    if (!entry.point) {
      clusters.push({ courses: [entry], latlng: entry.latlng, point: null });
      return;
    }
    const cx = Math.floor(entry.point.x / CELL_W);
    const cy = Math.floor(entry.point.y / CELL_H);
    let matched = null;

    for (let gx = cx - 1; gx <= cx + 1 && !matched; gx += 1) {
      for (let gy = cy - 1; gy <= cy + 1 && !matched; gy += 1) {
        const bucket = grid.get(`${gx},${gy}`);
        if (!bucket) {
          continue;
        }
        for (let k = 0; k < bucket.length; k += 1) {
          const cl = bucket[k];
          if (Math.abs(cl.point.x - entry.point.x) < CELL_W && Math.abs(cl.point.y - entry.point.y) < CELL_H) {
            matched = cl;
            break;
          }
        }
      }
    }

    if (matched) {
      const oldKey = `${Math.floor(matched.point.x / CELL_W)},${Math.floor(matched.point.y / CELL_H)}`;
      matched.courses.push(entry);
      const total = matched.courses.length;
      const avgLat = matched.courses.reduce((s, c) => s + c.latlng.lat, 0) / total;
      const avgLng = matched.courses.reduce((s, c) => s + c.latlng.lng, 0) / total;
      matched.latlng = L.latLng(avgLat, avgLng);
      matched.point = map.latLngToContainerPoint(matched.latlng);
      const newKey = `${Math.floor(matched.point.x / CELL_W)},${Math.floor(matched.point.y / CELL_H)}`;
      if (newKey !== oldKey) {
        const oldBucket = grid.get(oldKey);
        if (oldBucket) {
          const idx = oldBucket.indexOf(matched);
          if (idx >= 0) {
            oldBucket.splice(idx, 1);
          }
        }
        if (!grid.has(newKey)) {
          grid.set(newKey, []);
        }
        grid.get(newKey).push(matched);
      }
    } else {
      const cl = { courses: [entry], latlng: entry.latlng, point: entry.point };
      clusters.push(cl);
      const cellKey = `${cx},${cy}`;
      if (!grid.has(cellKey)) {
        grid.set(cellKey, []);
      }
      grid.get(cellKey).push(cl);
    }
  });
  return clusters;
}

/**
 * 指定した巡検コースを展開し、フィルタ・設定・UI・地図表示を同期する
 */
function activateFieldTripCourse(courseKey, sample = null, { fitItems = null, maxZoom = 16 } = {}) {
  if (sample) {
    if (state.fieldTripYear !== 'all') {
      state.fieldTripYear = String(sample.year || 'all');
      state.settings.fieldTripYear = state.fieldTripYear;
    }
    state.fieldTripCourse = sample.course_abbr || 'all';
    state.settings.fieldTripCourse = state.fieldTripCourse;
  }
  state.expandedFieldTripCourses.clear();
  state.expandedFieldTripCourses.add(courseKey);
  if (sample) {
    populateFieldTripFilters();
  }
  saveSettings();
  syncSettingsUI();
  renderFieldTripMarkers();
  renderFieldTripList();
  schedulePermalinkSync();

  if (Array.isArray(fitItems) && fitItems.length > 0 && state.map) {
    const bounds = L.latLngBounds(fitItems.map((it) => it.latlng));
    const fitPad = getMapFitPadding();
    state.map.fitBounds(bounds, {
      paddingTopLeft: [Math.max(fitPad.paddingTopLeft[0], 40), 40],
      paddingBottomRight: [Math.max(fitPad.paddingBottomRight[0], 40), Math.max(fitPad.paddingBottomRight[1], 40)],
      maxZoom,
      animate: true
    });
  } else {
    fitExpandedFieldTrips();
  }
}

/**
 * 単独ピルおよび複数コース集約クラスタピルを地図へ描画する
 */
function renderUnexpandedClusters(clusters, isCompactLod) {
  const dict = t();
  const selectAndExpandCourse = (courseKey, items, sample) => {
    activateFieldTripCourse(courseKey, sample, { fitItems: items, maxZoom: 16 });
  };

  clusters.forEach((cluster) => {
    if (cluster.courses.length === 1) {
      const { courseKey, items, latlng } = cluster.courses[0];
      const sample = items[0].props;
      const pillLabel = isCompactLod
        ? (sample.course_abbr || String(sample.year || '')).trim()
        : `${sample.year || ''} ${sample.course_abbr || ''}`.trim();
      const pillEl = el('div', { className: 'field-trip-course-pill', dataset: { tripCategory: sample.category } },
        el('span', {}, pillLabel),
        el('span', { className: 'field-trip-course-pill-count' }, String(items.length))
      );

      const clusterIcon = L.divIcon({
        className: 'field-trip-course-cluster-icon',
        html: pillEl.outerHTML,
        iconSize: [0, 0]
      });
      const clusterMarker = L.marker(latlng, { icon: clusterIcon, pane: 'fieldTripsPane', keyboard: true });
      clusterMarker.bindTooltip(`${sample.year || ''}${dict.fieldTripYearSuffix} ${sample.course_name || sample.course_abbr || ''}`.trim(), {
        direction: 'top',
        offset: [0, -18]
      });
      clusterMarker.on('click', () => selectAndExpandCourse(courseKey, items, sample));
      clusterMarker.addTo(state.fieldTripsLayerGroup);
      return;
    }

    const clusterCategories = new Set(
      cluster.courses.map((c) => (c.items[0] && c.items[0].props ? c.items[0].props.category : '')).filter(Boolean)
    );
    const pillEl = el('div', {
      className: 'field-trip-cluster-pill',
      dataset: { tripCategory: clusterCategories.size === 1 ? Array.from(clusterCategories)[0] : '' }
    }, dict.fieldTripClusterCourses(cluster.courses.length));

    const clusterIcon = L.divIcon({
      className: 'field-trip-course-cluster-icon',
      html: pillEl.outerHTML,
      iconSize: [0, 0]
    });
    const clusterMarker = L.marker(cluster.latlng, { icon: clusterIcon, pane: 'fieldTripsPane', keyboard: true });
    const courseNames = cluster.courses.map((c) => {
      const s = c.items[0].props;
      return `${s.year || ''} ${s.course_abbr || ''}`.trim();
    });
    clusterMarker.bindTooltip(courseNames.join(' / '), { direction: 'top', offset: [0, -18] });
    clusterMarker.on('click', () => {
      if (!state.map) {
        return;
      }
      const allLatLngs = cluster.courses.flatMap((c) => c.items.map((it) => it.latlng));
      const bounds = L.latLngBounds(allLatLngs);
      const canZoomMore = state.map.getZoom() < Math.min(13, state.map.getMaxZoom() - 1);
      const spanLat = bounds.getNorth() - bounds.getSouth();
      const spanLng = bounds.getEast() - bounds.getWest();
      if (canZoomMore && (spanLat > 0.02 || spanLng > 0.02)) {
        state.map.fitBounds(bounds, { ...getMapFitPadding(), maxZoom: 14, animate: true });
        return;
      }

      const wrap = el('div', { className: 'field-trip-cluster-popup-list' },
        el('div', { className: 'field-trip-cluster-popup-title' }, dict.fieldTripClusterSelectTitle),
        ...cluster.courses.map(({ courseKey, items }) => {
          const s = items[0].props;
          return el('button', {
            type: 'button',
            className: 'field-trip-cluster-popup-btn',
            dataset: { tripCategory: s.category },
            onClick: () => {
              state.map.closePopup();
              selectAndExpandCourse(courseKey, items, s);
            }
          },
            el('span', { className: 'field-trip-cluster-popup-name' },
              el('span', { className: 'field-trip-category-dot', 'aria-hidden': 'true' }),
              el('span', {}, `${s.year || ''} ${s.course_abbr || ''}`.trim())
            ),
            el('span', {}, dict.fieldTripCount(items.length))
          );
        })
      );

      L.popup({ className: 'field-trip-leaflet-popup', maxWidth: 280 })
        .setLatLng(cluster.latlng)
        .setContent(wrap)
        .openOn(state.map);
    });
    clusterMarker.addTo(state.fieldTripsLayerGroup);
  });
}

/**
 * 絞り込み条件・展開状態に応じて巡検スポットマーカーを描画する
 */
export function renderFieldTripMarkers() {
  if (!state.fieldTripsLayerGroup) {
    return;
  }
  state.fieldTripsLayerGroup.clearLayers();
  const filtered = getFilteredFieldTripItems();
  if (filtered.length === 0) {
    syncFieldTripActiveBar();
    return;
  }

  const courseGroups = new Map();
  filtered.forEach((item) => {
    const key = getCourseKey(item.props);
    if (!courseGroups.has(key)) {
      courseGroups.set(key, []);
    }
    courseGroups.get(key).push(item);
  });

  const hasAnyExpanded = Array.from(courseGroups.keys()).some((k) => state.expandedFieldTripCourses.has(k));
  if (hasAnyExpanded) {
    courseGroups.forEach((items, courseKey) => {
      if (state.expandedFieldTripCourses.has(courseKey)) {
        renderExpandedCourseOnMap(items);
      }
    });
    syncFieldTripActiveBar();
    return;
  }

  const zoom = state.map ? state.map.getZoom() : CONFIG.INITIAL_ZOOM;
  const isCompactLod = zoom < 7;
  const courseEntries = [];
  courseGroups.forEach((items, courseKey) => {
    const avgLat = items.reduce((s, it) => s + it.latlng.lat, 0) / items.length;
    const avgLng = items.reduce((s, it) => s + it.latlng.lng, 0) / items.length;
    const latlng = L.latLng(avgLat, avgLng);
    const point = state.map ? state.map.latLngToContainerPoint(latlng) : null;
    courseEntries.push({ courseKey, items, latlng, point });
  });

  const clusters = clusterCourseEntries(courseEntries, state.map);
  renderUnexpandedClusters(clusters, isCompactLod);
  syncFieldTripActiveBar();
}

/**
 * 展開中の巡検コースの全地点へズームする（他の未展開コースは開かない）
 */
export function fitExpandedFieldTrips() {
  if (!state.map) {
    return;
  }
  const filtered = getFilteredFieldTripItems();
  const expandedItems = filtered.filter((it) =>
    state.expandedFieldTripCourses.has(getCourseKey(it.props))
  );
  const targetItems = expandedItems.length > 0 ? expandedItems : filtered;
  if (targetItems.length === 0) {
    return;
  }
  const bounds = L.latLngBounds(targetItems.map((it) => it.latlng));
  const fitPad = getMapFitPadding();
  state.map.fitBounds(bounds, {
    paddingTopLeft: [Math.max(fitPad.paddingTopLeft[0], 40), 40],
    paddingBottomRight: [Math.max(fitPad.paddingBottomRight[0], 40), Math.max(fitPad.paddingBottomRight[1], 40)],
    maxZoom: 16,
    animate: true
  });
}

/**
 * 絞り込み中の巡検スポット全体へズームする
 */
export function fitFilteredFieldTrips() {
  if (!state.map) {
    return;
  }
  const filtered = getFilteredFieldTripItems();
  if (filtered.length === 0) {
    return;
  }
  const uniqueKeys = new Set(filtered.map((it) => getCourseKey(it.props)));
  if (uniqueKeys.size === 1) {
    state.expandedFieldTripCourses.clear();
    state.expandedFieldTripCourses.add(Array.from(uniqueKeys)[0]);
    renderFieldTripMarkers();
    renderFieldTripList();
    schedulePermalinkSync();
  }
  if (!state.showFieldTrips) {
    setFieldTripsVisible(true);
  }
  const bounds = L.latLngBounds(filtered.map((it) => it.latlng));
  state.map.fitBounds(bounds, { ...getMapFitPadding(), maxZoom: 12, animate: true });
  if (window.innerWidth <= 720) {
    switchMobileView('map');
  }
}

/**
 * 巡検スポットレイヤーの表示/非表示を切り替える
 */
export function setFieldTripsVisible(visible) {
  state.showFieldTrips = Boolean(visible);
  state.settings.showFieldTrips = state.showFieldTrips;
  if (!state.showFieldTrips) {
    if (state.map) {
      state.map.closePopup();
    }
    state.expandedFieldTripCourses.clear();
    if (state.fieldTripCourse !== 'all') {
      state.fieldTripCourse = 'all';
      state.settings.fieldTripCourse = 'all';
      populateFieldTripFilters();
    }
    renderFieldTripMarkers();
    renderFieldTripList();
    schedulePermalinkSync();
  }
  saveSettings();
  syncSettingsUI();

  if (!state.map || !state.fieldTripsLayerGroup) {
    return;
  }
  if (state.showFieldTrips) {
    if (!state.map.hasLayer(state.fieldTripsLayerGroup)) {
      state.fieldTripsLayerGroup.addTo(state.map);
    }
  } else if (state.map.hasLayer(state.fieldTripsLayerGroup)) {
    state.map.removeLayer(state.fieldTripsLayerGroup);
  }
  syncFieldTripActiveBar();
}

/**
 * 絞り込み中の巡検コース（先頭1コースのみ）を展開して画面全体にフィットする
 */
export function expandAllFieldTrips() {
  const filtered = getFilteredFieldTripItems();
  if (filtered.length === 0) {
    return;
  }
  if (!state.showFieldTrips) {
    setFieldTripsVisible(true);
  }
  const first = filtered[0];
  activateFieldTripCourse(getCourseKey(first.props));
}

/**
 * 展開中の巡検コースをすべて折りたたみ、コースピル表示に戻す
 */
export function collapseAllFieldTrips() {
  if (state.map) {
    state.map.closePopup();
  }
  state.expandedFieldTripCourses.clear();
  if (state.fieldTripCourse !== 'all') {
    state.fieldTripCourse = 'all';
    state.settings.fieldTripCourse = 'all';
    populateFieldTripFilters();
    syncSettingsUI();
  }
  renderFieldTripMarkers();
  renderFieldTripList();
  schedulePermalinkSync();
}

/**
 * 年・コースフィルタ変更時の共通ハンドラ
 */
export function updateFieldTripFilter(yearValue, courseValue) {
  state.fieldTripYear = yearValue || 'all';
  state.fieldTripCourse = courseValue || 'all';
  if (state.fieldTripCourse === 'all') {
    state.expandedFieldTripCourses.clear();
  }
  populateFieldTripFilters();
  state.settings.fieldTripYear = state.fieldTripYear;
  state.settings.fieldTripCourse = state.fieldTripCourse;
  saveSettings();
  syncSettingsUI();
  renderFieldTripMarkers();
  renderFieldTripList();
  schedulePermalinkSync();
}

/**
 * 指定した巡検スポットへズームしてポップアップを開く
 */
export function focusFieldTripSpot(ftItem) {
  if (!ftItem || !state.map) {
    return;
  }
  if (!state.showFieldTrips) {
    setFieldTripsVisible(true);
  }
  if (
    state.selectedFieldTripCategories.size > 0 &&
    ftItem.props.category &&
    !state.selectedFieldTripCategories.has(ftItem.props.category)
  ) {
    state.selectedFieldTripCategories.add(ftItem.props.category);
    state.settings.fieldTripCategories = Array.from(state.selectedFieldTripCategories);
    renderFieldTripCategoryChips();
  }
  if (state.fieldTripYear !== 'all' && String(ftItem.props.year) !== state.fieldTripYear) {
    state.fieldTripYear = 'all';
    state.settings.fieldTripYear = 'all';
  }
  if (state.fieldTripCourse !== 'all' && ftItem.props.course_abbr !== state.fieldTripCourse) {
    state.fieldTripCourse = 'all';
    state.settings.fieldTripCourse = 'all';
  }
  const courseKey = getCourseKey(ftItem.props);
  state.expandedFieldTripCourses.clear();
  state.expandedFieldTripCourses.add(courseKey);
  state.selectedFieldTripId = ftItem.props.id || null;
  populateFieldTripFilters();
  renderFieldTripMarkers();
  saveSettings();
  syncSettingsUI();
  renderFieldTripList();
  schedulePermalinkSync();

  const marker = ensureFieldTripMarker(ftItem);
  const targetZoom = Math.max(state.map.getZoom(), 14);
  const targetLatLng = (marker && typeof marker.getLatLng === 'function')
    ? marker.getLatLng()
    : ftItem.latlng;
  const alreadyCentered =
    state.map.getZoom() === targetZoom && state.map.getCenter().equals(targetLatLng, 1e-5);
  if (!alreadyCentered) {
    state.map.setView(targetLatLng, targetZoom, { animate: true });
  }
  if (window.innerWidth <= 720) {
    switchMobileView('map');
  }
}

/**
 * 左ドロワー内の巡検スポット一覧・コースカードを更新する
 */
export function renderFieldTripList() {
  if (!dom.fieldTripList) {
    return;
  }
  const dict = t();
  const filtered = getFilteredFieldTripItems();

  if (state.fieldTripCourse === 'all') {
    if (dom.fieldTripListLabel) {
      dom.fieldTripListLabel.textContent = dict.fieldTripCourseListLabel;
    }
    if (dom.fieldTripCourseCard) {
      dom.fieldTripCourseCard.hidden = true;
    }

    const courseMap = new Map();
    filtered.forEach((it) => {
      const key = getCourseKey(it.props);
      if (!courseMap.has(key)) {
        courseMap.set(key, []);
      }
      courseMap.get(key).push(it);
    });

    if (dom.fieldTripCount) {
      dom.fieldTripCount.textContent = dict.fieldTripCoursesCount(courseMap.size);
    }

    dom.fieldTripList.innerHTML = '';
    if (courseMap.size === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'result-list-note';
      emptyLi.textContent = dict.fieldTripEmpty;
      dom.fieldTripList.appendChild(emptyLi);
      return;
    }

    const fragment = document.createDocumentFragment();
    courseMap.forEach((items, courseKey) => {
      const sample = items[0].props;
      const isCourseExpanded = state.expandedFieldTripCourses.has(courseKey);
      const btn = el('button', {
        type: 'button',
        className: `result-list-item${isCourseExpanded ? ' is-selected' : ''}`,
        'aria-pressed': String(isCourseExpanded),
        onClick: () => {
          activateFieldTripCourse(courseKey, sample);
        }
      },
        el('div', { className: 'field-trip-list-item-row', dataset: { tripCategory: sample.category } },
          el('span', { className: 'field-trip-course-pill-badge' }, String(sample.year || '')),
          el('div', { className: 'field-trip-list-text' },
            el('div', { className: 'field-trip-list-title' }, `${sample.course_abbr || ''} (${items.length}${dict.fieldTripStopsSuffix})`),
            el('div', { className: 'field-trip-list-sub' }, sample.course_name || '')
          )
        )
      );
      fragment.appendChild(el('li', {}, btn));
    });
    dom.fieldTripList.appendChild(fragment);
    return;
  }

  if (dom.fieldTripListLabel) {
    dom.fieldTripListLabel.textContent = dict.fieldTripListLabel;
  }
  if (dom.fieldTripCount) {
    dom.fieldTripCount.textContent = dict.fieldTripCount(filtered.length);
  }

  if (dom.fieldTripCourseCard) {
    if (filtered.length > 0) {
      const sample = filtered[0].props;
      dom.fieldTripCourseCard.innerHTML = '';
      if (sample.category) {
        dom.fieldTripCourseCard.dataset.tripCategory = sample.category;
      } else {
        delete dom.fieldTripCourseCard.dataset.tripCategory;
      }

      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'field-trip-back-btn';
      backBtn.textContent = dict.fieldTripBackToCourses;
      backBtn.addEventListener('click', () => {
        updateFieldTripFilter(state.fieldTripYear, 'all');
      });
      dom.fieldTripCourseCard.appendChild(backBtn);

      const metaEl = document.createElement('div');
      metaEl.className = 'field-trip-course-card-meta';
      metaEl.textContent = `${sample.year}${dict.fieldTripYearSuffix} ・ ${sample.course_abbr}`;
      const titleEl = document.createElement('h3');
      titleEl.className = 'field-trip-course-card-title';
      titleEl.textContent = sample.course_name || sample.course_abbr;
      dom.fieldTripCourseCard.append(metaEl, titleEl);

      if (sample.authors) {
        const authorsEl = document.createElement('div');
        authorsEl.className = 'field-trip-active-authors';
        authorsEl.textContent = `${dict.authorsLabel}: ${sample.authors}`;
        dom.fieldTripCourseCard.appendChild(authorsEl);
      }

      const courseKey = getCourseKey(sample);
      const isCourseExpanded = state.expandedFieldTripCourses.has(courseKey);
      const courseActions = document.createElement('div');
      courseActions.className = 'field-trip-course-actions';

      if (isSafeUrl(sample.guidebook_url)) {
        const link = document.createElement('a');
        link.className = 'field-trip-guidebook-btn';
        link.href = sample.guidebook_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = dict.fieldTripOpenGuidebook;
        courseActions.appendChild(link);
      }

      const matchedMap = getOverlayCandidateForStops(filtered);
      if (matchedMap) {
        const overlayBtn = document.createElement('button');
        overlayBtn.type = 'button';
        overlayBtn.className = 'field-trip-course-toggle-btn field-trip-course-overlay-btn';
        overlayBtn.textContent = dict.fieldTripOverlayMapHere;
        overlayBtn.addEventListener('click', () => {
          addOverlayForItem(matchedMap);
        });
        courseActions.appendChild(overlayBtn);
      }

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'field-trip-course-toggle-btn';
      toggleBtn.textContent = isCourseExpanded ? dict.fieldTripCollapseMap : dict.fieldTripExpandMap;
      toggleBtn.addEventListener('click', () => {
        if (state.expandedFieldTripCourses.has(courseKey)) {
          collapseAllFieldTrips();
        } else {
          expandAllFieldTrips();
        }
      });
      courseActions.appendChild(toggleBtn);
      dom.fieldTripCourseCard.appendChild(courseActions);
      dom.fieldTripCourseCard.hidden = false;
    } else {
      dom.fieldTripCourseCard.hidden = true;
    }
  }

  dom.fieldTripList.innerHTML = '';
  if (filtered.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'result-list-note';
    emptyLi.textContent = dict.fieldTripEmpty;
    dom.fieldTripList.appendChild(emptyLi);
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach((ftItem) => {
    const { props } = ftItem;
    const isSelected = Boolean(state.selectedFieldTripId && state.selectedFieldTripId === props.id);
    const btn = el('button', {
      type: 'button',
      className: `result-list-item${isSelected ? ' is-selected' : ''}`,
      'aria-pressed': String(isSelected),
      onClick: () => focusFieldTripSpot(ftItem)
    },
      el('div', { className: 'field-trip-list-item-row', dataset: { tripCategory: props.category } },
        el('span', { className: 'field-trip-list-badge' }, props.stop_no || createStarIconSvg()),
        el('div', { className: 'field-trip-list-text' },
          el('div', { className: 'field-trip-list-title' }, props.stop_name || props.stop_abbr || ''),
          el('div', { className: 'field-trip-list-sub' }, props.description || `${props.year} ${props.course_abbr}`)
        )
      )
    );
    fragment.appendChild(el('li', {}, btn));
  });
  dom.fieldTripList.appendChild(fragment);
}

/**
 * 左ドロワーの表示モード（地質図 / 巡検スポット）を切り替える
 */
export function switchDrawerMode(mode) {
  if (mode !== 'maps' && mode !== 'trips') {
    return;
  }
  state.drawerMode = mode;
  if (dom.drawerTabMaps) {
    const isMaps = mode === 'maps';
    dom.drawerTabMaps.classList.toggle('is-active', isMaps);
    dom.drawerTabMaps.setAttribute('aria-selected', String(isMaps));
  }
  if (dom.drawerTabTrips) {
    const isTrips = mode === 'trips';
    dom.drawerTabTrips.classList.toggle('is-active', isTrips);
    dom.drawerTabTrips.setAttribute('aria-selected', String(isTrips));
  }
  if (dom.drawerMapsPane) {
    dom.drawerMapsPane.hidden = mode !== 'maps';
  }
  if (dom.drawerTripsPane) {
    dom.drawerTripsPane.hidden = mode !== 'trips';
  }
  if (mode === 'trips') {
    renderFieldTripList();
  }
}

/**
 * 巡検スポット GeoJSON を読み込む
 */
export async function fetchFieldTrips({ onLoaded } = {}) {
  try {
    const response = await fetch(CONFIG.FIELD_TRIPS_GEOJSON_URL, { cache: 'no-cache' });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    const features = Array.isArray(data && data.features) ? data.features : [];
    state.fieldTripItems = features
      .filter((f) => f && f.geometry && f.geometry.type === 'Point' && Array.isArray(f.geometry.coordinates))
      .map((f) => {
        const [lon, lat] = f.geometry.coordinates;
        const props = f.properties || {};
        const latlng = L.latLng(lat, lon);
        const normalizedSearchText = normalizeSearchText(
          `${props.id || ''} ${props.year || ''} ${props.course_abbr || ''} ${props.course_name || ''} ${props.authors || ''} ${props.stop_no || ''} ${props.stop_abbr || ''} ${props.stop_name || ''} ${props.description || ''}`
        );
        return { props, latlng, marker: null, normalizedSearchText };
      });

    populateFieldTripFilters();
    renderFieldTripMarkers();
    renderFieldTripList();
    if (typeof onLoaded === 'function') {
      onLoaded();
    }
  } catch {
    // ignore optional field trips load failure
  }
}
```

### `js/i18n.js`（全 318 行）

```javascript
import { state } from './state.js';

/**
 * UIテキスト多言語辞書
 */
export const I18N = {
  ja: {
    searchPlaceholder: '図幅・火山・著者・地域を検索',
    mapTypeLabel: '地図種別',
    mapTypeAll: 'すべて',
    mapTypes: {
      geological_map_sheet: '地質図幅',
      seamless_geological_map: 'シームレス地質図',
      volcanic_geological_map: '火山地質図',
      marine_geological_map: '海洋地質図',
      active_fault_strip_map: '活断層図',
      large_pyroclastic_flow_map: '大規模火砕流分布図',
      hydrogeological_map: '水文地質図',
      geophysical_map: '地球物理図',
      geochemical_map: '地球化学図',
      resource_map: '鉱物・エネルギー資源図'
    },
    viewportOnlyLabel: '表示範囲内のみ',
    showIndexLabel: '図郭枠を表示',
    seamless200kLabel: '20万分の1 シームレス地質図 V2',
    seamlessOpacityLabel: 'シームレス透過度',
    seamlessQueryLabel: '地点の地質を調べる',
    seamlessLoading: '地質情報を取得中...',
    seamlessNoData: 'この地点の地質データはありません（海域・範囲外）',
    seamlessFetchError: '地質情報の取得に失敗しました。',
    seamlessGroupLabel: '大区分',
    seamlessAgeLabel: '時代',
    seamlessLithologyLabel: '岩相',
    filterAccordionLabel: '詳細フィルター',
    decadeLabel: '発行年',
    scaleFilterLabel: '縮尺・シリーズ',
    otherFilterLabel: '資料有無',
    flagPdf: '説明書PDFあり',
    flagLegend: '凡例あり',
    flagOriginal: '原図JPGあり',
    reset: 'リセット',
    basemapLabel: '背景地図',
    basemapBlank: '白地図',
    basemapPale: '淡色',
    basemapStd: '標準',
    basemapPhoto: '写真',
    activeMapsTitle: (n, max) => (n > 0 ? `表示中の地質図 (${n}/${max})` : '図幅インスペクタ'),
    clearAll: 'すべて閉じる',
    resultListLabel: '該当図幅一覧',
    resultCount: (v, t) => `${v} / ${t} 件`,
    noMatch: '条件に一致する図幅がありません',
    moreItems: (n) => `ほか ${n} 件（検索で絞り込めます）`,
    badgeMap: '図幅',
    badgeVolcano: '火山',
    badgeAuthor: '著者',
    badgeRegion: '地域',
    suggestionGroupMaps: '図幅・火山',
    suggestionGroupRegions: '地域',
    suggestionGroupAuthors: '著者',
    pinnedLabel: '固定',
    unpinTitle: '固定を解除して自動追従に戻す',
    mapTypeFieldLabel: '種別',
    volcanoLabel: '火山名',
    yearLabel: '発行年',
    yearSuffix: '年',
    yearUnknown: '不明',
    scaleLabel: '縮尺',
    authorsLabel: '著者',
    publisherLabel: '発行',
    providerLabel: '提供機関',
    regionLabel: '地域',
    linkDetail: '詳細情報',
    linkPdf: '説明書を見る',
    linkFullPdf: '詳細版PDF',
    linkOriginal: '原図JPG',
    tabLegend: '凡例',
    tabSections: '断面図',
    tabDetail: '詳細・PDF',
    legendOpen: '拡大',
    legendNone: '凡例画像なし',
    unknownAuthor: '不明',
    moveUpTitle: '前面へ移動',
    moveDownTitle: '背面へ移動',
    zoomTitle: 'この図幅にズーム',
    closeTitle: 'この地質図を閉じる',
    fitAllTitle: '絞り込み中の全図幅にズーム',
    collapseRightTitle: 'パネルを折りたたむ',
    reopenRightLabel: '凡例',
    reopenRightTitle: '凡例・詳細パネルを開く',
    toggleDrawerCollapse: '検索・一覧パネルを閉じる',
    toggleDrawerExpand: '検索・一覧パネルを開く',
    layersBtnTitle: '背景地図・レイヤー',
    prefsBtnTitle: '環境設定',
    prefsThemeLabel: 'テーマ',
    prefsThemeLight: 'ライト',
    prefsThemeDark: 'ダーク',
    prefsLangLabel: '表示言語',
    prefsMapBehaviorLabel: '地図操作・表示',
    wheelZoomSpeedLabel: '1回のスクロール量',
    defaultOverlayOpacityLabel: '地質図の初期透過度',
    showScaleLabel: 'スケールバーを表示',
    showTripRouteLabel: '巡検ルート線を表示',
    prefsResetLabel: '初期設定に戻す',
    mobileTabMap: '地図',
    mobileTabSearch: '検索・一覧',
    mobileTabLegend: '凡例・詳細',
    loadErrorCount: '読込エラー',
    loadErrorMessage: '図幅データの読み込みに失敗しました。',
    tileErrorMessage: (name) => `「${name}」の地質図タイルを取得できませんでした。`,
    seamlessMissingMessage: '20万分の1シームレス地質図の設定が読み込まれていません。',
    seamlessTileErrorMessage: '20万分の1シームレス地質図タイルを取得できませんでした（サーバーメンテナンス中または通信エラー）。',
    seamlessGuideText: '地図上の任意の地点をクリックすると、その地点の地質・時代・岩相を照会できます。',
    seamlessViewerLink: '産総研シームレスV2 ビューア',
    seamlessLegendPageLink: '公式解説・凡例ページ',
    fieldTripClusterCourses: (n) => `${n}コース`,
    fieldTripClusterSelectTitle: 'コースを選択して展開',
    fieldTripsLabel: '地質学会 巡検スポット',
    fieldTripAllYears: 'すべての年',
    fieldTripAllCourses: 'すべてのコース',
    fieldTripYearSuffix: '年',
    fieldTripStopPrefix: 'No.',
    fieldTripOpenGuidebook: '案内書を開く',
    fieldTripNoGuidebook: '案内書リンク未登録',
    badgeFieldTrip: '巡検',
    suggestionGroupFieldTrips: '巡検スポット',
    drawerTabMaps: '地質図',
    drawerTabTrips: '巡検スポット',
    drawerTripFilterLabel: '開催年・巡検コース',
    fieldTripCategoryFilterLabel: 'テーマ別色分け・絞り込み',
    fieldTripCategories: {
      volcano: '火山・火成活動',
      basement: '変成・構造帯',
      sedimentary: '堆積・層序・古生物',
      hazard_geo: '災害・資源・ジオパーク・第四紀・地形'
    },
    fieldTripListLabel: '巡検地点一覧',
    fieldTripCourseListLabel: '巡検コース一覧',
    fieldTripCount: (n) => `${n} 地点`,
    fieldTripCoursesCount: (n) => `${n} コース`,
    fieldTripBackToCourses: '← コース一覧に戻る',
    drawerTripSearchPlaceholder: 'コース名・著者・地点名で絞り込み',
    fieldTripEmpty: '該当する巡検地点がありません',
    fitFieldTripsTitle: '表示中の巡検地点にズーム',
    fieldTripExpand: '展開',
    fieldTripCollapse: '格納',
    fieldTripExpandMap: '地図に展開',
    fieldTripCollapseMap: '格納',
    fieldTripBarFit: '全体表示',
    fieldTripOverlayMapHere: '地質図を重ねる',
    fieldTripPrevStop: '前へ',
    fieldTripNextStop: '次へ',
    fieldTripStopsSuffix: '地点',
    fieldTripCoursesActive: (n) => `${n}コース展開中`,
    locateBtnTitle: '現在地へ拡大移動',
    locateUnsupported: 'このブラウザは現在地取得に対応していません。',
    locateDenied: '位置情報の利用が許可されていません。ブラウザの設定をご確認ください。',
    locateFailed: '現在地を取得できませんでした。'
  },
  en: {
    searchPlaceholder: 'Search map, volcano, author, or region',
    mapTypeLabel: 'Map Type',
    mapTypeAll: 'All',
    mapTypes: {
      geological_map_sheet: 'Geological Map Sheet',
      seamless_geological_map: 'Seamless Geological Map',
      volcanic_geological_map: 'Volcanic Geological Map',
      marine_geological_map: 'Marine Geological Map',
      active_fault_strip_map: 'Active Fault Map',
      large_pyroclastic_flow_map: 'Pyroclastic Flow Map',
      hydrogeological_map: 'Hydrogeological Map',
      geophysical_map: 'Geophysical Map',
      geochemical_map: 'Geochemical Map',
      resource_map: 'Resource Map'
    },
    viewportOnlyLabel: 'In map view only',
    showIndexLabel: 'Show map frames',
    seamless200kLabel: '1:200K Seamless GeoMap V2',
    seamlessOpacityLabel: 'Seamless opacity',
    seamlessQueryLabel: 'Inspect point geology',
    seamlessLoading: 'Loading geology...',
    seamlessNoData: 'No geological data at this point',
    seamlessFetchError: 'Failed to fetch point geology.',
    seamlessGroupLabel: 'Group',
    seamlessAgeLabel: 'Age',
    seamlessLithologyLabel: 'Lithology',
    filterAccordionLabel: 'Filters',
    decadeLabel: 'Published Year',
    scaleFilterLabel: 'Scale / Series',
    otherFilterLabel: 'Resources',
    flagPdf: 'Has PDF',
    flagLegend: 'Has Legend',
    flagOriginal: 'Has Original JPG',
    reset: 'Reset',
    basemapLabel: 'Basemap',
    basemapBlank: 'Blank',
    basemapPale: 'Pale',
    basemapStd: 'Std',
    basemapPhoto: 'Photo',
    activeMapsTitle: (n, max) => (n > 0 ? `Active Maps (${n}/${max})` : 'Map Inspector'),
    clearAll: 'Clear all',
    resultListLabel: 'Matching Maps',
    resultCount: (v, t) => `${v} / ${t} maps`,
    noMatch: 'No matching maps found',
    moreItems: (n) => `${n} more (refine search)`,
    badgeMap: 'Map',
    badgeVolcano: 'Volcano',
    badgeAuthor: 'Author',
    badgeRegion: 'Region',
    suggestionGroupMaps: 'Maps & Volcanoes',
    suggestionGroupRegions: 'Regions',
    suggestionGroupAuthors: 'Authors',
    pinnedLabel: 'Pin',
    unpinTitle: 'Unpin (resume auto-follow)',
    mapTypeFieldLabel: 'Type',
    volcanoLabel: 'Volcano',
    yearLabel: 'Year',
    yearSuffix: '',
    yearUnknown: 'Unknown',
    scaleLabel: 'Scale',
    authorsLabel: 'Authors',
    publisherLabel: 'Publisher',
    providerLabel: 'Provider',
    regionLabel: 'Region',
    linkDetail: 'Details',
    linkPdf: 'View Manual',
    linkFullPdf: 'Full PDF',
    linkOriginal: 'Original JPG',
    tabLegend: 'Legend',
    tabSections: 'Sections',
    tabDetail: 'Details & PDF',
    legendOpen: 'Open',
    legendNone: 'No legend image',
    unknownAuthor: 'Unknown',
    moveUpTitle: 'Bring forward',
    moveDownTitle: 'Send backward',
    zoomTitle: 'Zoom to map',
    closeTitle: 'Close overlay',
    fitAllTitle: 'Fit all matching maps',
    collapseRightTitle: 'Collapse panel',
    reopenRightLabel: 'Legend',
    reopenRightTitle: 'Open legend & details panel',
    toggleDrawerCollapse: 'Collapse search panel',
    toggleDrawerExpand: 'Expand search panel',
    layersBtnTitle: 'Basemap & Layers',
    prefsBtnTitle: 'Preferences',
    prefsThemeLabel: 'Theme',
    prefsThemeLight: 'Light',
    prefsThemeDark: 'Dark',
    prefsLangLabel: 'Language',
    prefsMapBehaviorLabel: 'Map & Display',
    wheelZoomSpeedLabel: 'Scroll zoom speed',
    defaultOverlayOpacityLabel: 'Default map opacity',
    showScaleLabel: 'Show scale bar',
    showTripRouteLabel: 'Show field trip route',
    prefsResetLabel: 'Reset to defaults',
    mobileTabMap: 'Map',
    mobileTabSearch: 'Search',
    mobileTabLegend: 'Legend',
    loadErrorCount: 'Load Error',
    loadErrorMessage: 'Failed to load geological map index data.',
    tileErrorMessage: (name) => `Failed to load geological map tiles for "${name}".`,
    seamlessMissingMessage: '1:200K Seamless WMS configuration is not loaded.',
    seamlessTileErrorMessage: 'Failed to load 1:200K Seamless GeoMap V2 tiles (server maintenance or network error).',
    seamlessGuideText: 'Click anywhere on the map to inspect the geology, age, and lithology at that point.',
    seamlessViewerLink: 'GSJ Seamless V2 Viewer',
    seamlessLegendPageLink: 'Official Guide & Legend',
    fieldTripClusterCourses: (n) => `${n} courses`,
    fieldTripClusterSelectTitle: 'Select a course to expand',
    fieldTripsLabel: 'JGS Field Trip Spots',
    fieldTripAllYears: 'All years',
    fieldTripAllCourses: 'All courses',
    fieldTripYearSuffix: '',
    fieldTripStopPrefix: 'Stop',
    fieldTripOpenGuidebook: 'Guidebook',
    fieldTripNoGuidebook: 'Guidebook link unavailable',
    badgeFieldTrip: 'Trip',
    suggestionGroupFieldTrips: 'Field Trips',
    drawerTabMaps: 'Maps',
    drawerTabTrips: 'Field Trips',
    drawerTripFilterLabel: 'Year & Course',
    fieldTripCategoryFilterLabel: 'Theme Filter',
    fieldTripCategories: {
      volcano: 'Volcano & Igneous',
      basement: 'Metamorphic & Tectonics',
      sedimentary: 'Sedimentary & Fossils',
      hazard_geo: 'Hazard, Resource, Geo & Quaternary'
    },
    fieldTripListLabel: 'Field Trip Stops',
    fieldTripCourseListLabel: 'Field Trip Courses',
    fieldTripCount: (n) => `${n} stops`,
    fieldTripCoursesCount: (n) => `${n} courses`,
    fieldTripBackToCourses: '← Back to courses',
    drawerTripSearchPlaceholder: 'Filter by course, author, or stop',
    fieldTripEmpty: 'No matching field trip stops',
    fitFieldTripsTitle: 'Zoom to field trip stops',
    fieldTripExpand: 'Expand',
    fieldTripCollapse: 'Collapse',
    fieldTripExpandMap: 'Expand on map',
    fieldTripCollapseMap: 'Collapse',
    fieldTripBarFit: 'Fit all',
    fieldTripOverlayMapHere: 'Overlay GeoMap',
    fieldTripPrevStop: 'Prev',
    fieldTripNextStop: 'Next',
    fieldTripStopsSuffix: 'stops',
    fieldTripCoursesActive: (n) => `${n} courses expanded`,
    locateBtnTitle: 'Zoom to my location',
    locateUnsupported: 'Geolocation is not supported by this browser.',
    locateDenied: 'Location permission was denied.',
    locateFailed: 'Failed to get your current location.'
  }
};

/**
 * 現在の言語に対応するUI辞書を返す
 */
export function t() {
  return I18N[state.lang] || I18N.ja;
}
```

### `js/inspector.js`（全 1013 行）

```javascript
import { CONFIG } from './config.js';
import { el } from './dom.js';
import { t } from './i18n.js';
import { getMapFitPadding, setLeftDrawerCollapsed, setStatusMessage, switchMobileView, syncSettingsUI } from './map.js';
import { computeIntersectionArea, getItemBounds, getLocalizedMeta, styleByScale } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { debouncedSaveSettings, saveSettings, state, dom } from './state.js';

const loupeCache = {
  rafId: 0,
  lastClientX: 0,
  lastClientY: 0,
  legendRect: null,
  inspectorRect: null,
  activeSrc: ''
};

/**
 * 凡例・断面図画像とインスペクタの矩形を計測してキャッシュする
 */
export function refreshLoupeRects() {
  if (dom.legendImage && !dom.legendImage.hidden) {
    loupeCache.legendRect = dom.legendImage.getBoundingClientRect();
  } else {
    loupeCache.legendRect = null;
  }
  if (dom.rightInspector && dom.rightInspector.classList.contains('is-open')) {
    loupeCache.inspectorRect = dom.rightInspector.getBoundingClientRect();
  } else {
    loupeCache.inspectorRect = null;
  }
}

/**
 * 凡例ルーペを非表示にする
 */
export function hideLegendLoupe() {
  if (loupeCache.rafId) {
    cancelAnimationFrame(loupeCache.rafId);
    loupeCache.rafId = 0;
  }
  if (dom.legendLoupe) {
    dom.legendLoupe.classList.remove('is-visible');
  }
  if (dom.legendLensIndicator) {
    dom.legendLensIndicator.classList.remove('is-visible');
  }
}

function resetLoupeImageCache() {
  loupeCache.activeSrc = '';
  if (dom.legendLoupe) {
    dom.legendLoupe.style.backgroundImage = '';
  }
}

function renderLoupeFrame() {
  loupeCache.rafId = 0;
  if (dom.legendImage.hidden || !dom.legendImage.src || !dom.legendImage.complete || dom.legendImage.naturalWidth === 0) {
    hideLegendLoupe();
    return;
  }

  const rect = loupeCache.legendRect || dom.legendImage.getBoundingClientRect();
  loupeCache.legendRect = rect;
  if (!rect || rect.width === 0 || rect.height === 0) {
    hideLegendLoupe();
    return;
  }

  const x = loupeCache.lastClientX - rect.left;
  const y = loupeCache.lastClientY - rect.top;

  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    hideLegendLoupe();
    return;
  }

  const zoom = CONFIG.LOUPE_ZOOM;
  const size = 220;
  const half = size / 2;
  const margin = 12;

  let loupeCenterX;
  if (window.innerWidth > 720 && dom.rightInspector.classList.contains('is-open')) {
    const inspectorRect = loupeCache.inspectorRect || dom.rightInspector.getBoundingClientRect();
    loupeCache.inspectorRect = inspectorRect;
    loupeCenterX = Math.max(margin + half, inspectorRect.left - 12 - half);
  } else {
    loupeCenterX = Math.min(window.innerWidth - margin - half, Math.max(margin + half, loupeCache.lastClientX));
  }
  const loupeCenterY = Math.min(window.innerHeight - margin - half, Math.max(margin + half, loupeCache.lastClientY));

  if (loupeCache.activeSrc !== dom.legendImage.src) {
    loupeCache.activeSrc = dom.legendImage.src;
    dom.legendLoupe.style.backgroundImage = `url("${dom.legendImage.src}")`;
  }
  dom.legendLoupe.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
  dom.legendLoupe.style.backgroundPosition = `${-(x * zoom - half)}px ${-(y * zoom - half)}px`;
  dom.legendLoupe.style.transform = `translate3d(${loupeCenterX - half}px, ${loupeCenterY - half}px, 0) scale(1)`;
  dom.legendLoupe.classList.add('is-visible');

  if (dom.legendLensIndicator) {
    const lensSize = size / zoom;
    const lensHalf = lensSize / 2;
    dom.legendLensIndicator.style.width = `${lensSize}px`;
    dom.legendLensIndicator.style.height = `${lensSize}px`;
    dom.legendLensIndicator.style.transform = `translate3d(${x - lensHalf}px, ${y - lensHalf}px, 0)`;
    dom.legendLensIndicator.classList.add('is-visible');
  }
}

/**
 * 凡例・断面図画像上のマウス位置に応じて rAF でルーペ更新をスケジュールする
 */
export function updateLegendLoupe(event) {
  loupeCache.lastClientX = event.clientX;
  loupeCache.lastClientY = event.clientY;
  if (!loupeCache.rafId) {
    loupeCache.rafId = requestAnimationFrame(renderLoupeFrame);
  }
}

export function onLegendImageError() {
  hideLegendLoupe();
  dom.legendImage.hidden = true;
  resetLoupeImageCache();
  dom.legendOpenLink.hidden = true;
  dom.legendMapName.textContent = t().legendNone;
}

/**
 * シームレス V2 地点照会結果の DOM ノードを構築する
 */
export function buildSeamlessGeologyNode(record) {
  const dict = t();
  const root = document.createElement('div');
  root.className = 'seamless-geology-card';

  if (!record || record.status === 'loading') {
    const status = document.createElement('div');
    status.className = 'seamless-popup-status';
    status.textContent = dict.seamlessLoading;
    root.appendChild(status);
    return root;
  }

  if (record.status === 'error') {
    const status = document.createElement('div');
    status.className = 'seamless-popup-status';
    status.textContent = dict.seamlessFetchError;
    root.appendChild(status);
    return root;
  }

  const data = record.data || {};
  const isEn = state.lang === 'en';

  if (!data || !data.symbol) {
    const status = document.createElement('div');
    status.className = 'seamless-popup-status';
    status.textContent = dict.seamlessNoData;
    root.appendChild(status);
    return root;
  }

  const header = document.createElement('div');
  header.className = 'seamless-geology-header';

  const swatch = document.createElement('span');
  swatch.className = 'seamless-swatch';
  const hasRgb =
    data.r !== undefined && data.r !== null && data.r !== '' &&
    data.g !== undefined && data.g !== null && data.g !== '' &&
    data.b !== undefined && data.b !== null && data.b !== '' &&
    Number.isFinite(Number(data.r)) &&
    Number.isFinite(Number(data.g)) &&
    Number.isFinite(Number(data.b));
  if (hasRgb) {
    swatch.style.backgroundColor = `rgb(${Number(data.r)}, ${Number(data.g)}, ${Number(data.b)})`;
  } else {
    const rawColor = String(data.color || '').replace(/^#/, '');
    if (/^[0-9a-fA-F]{3,8}$/.test(rawColor)) {
      swatch.style.backgroundColor = `#${rawColor}`;
    }
  }

  const symbolEl = document.createElement('span');
  symbolEl.className = 'seamless-symbol';
  symbolEl.textContent = data.symbol;

  const coordsEl = document.createElement('span');
  coordsEl.className = 'seamless-coords';
  coordsEl.textContent = `${record.lat.toFixed(4)}, ${record.lng.toFixed(4)}`;

  header.append(swatch, symbolEl, coordsEl);
  root.appendChild(header);

  const metaList = document.createElement('dl');
  metaList.className = 'seamless-geology-meta';
  const rows = [
    [dict.seamlessGroupLabel, isEn ? (data.group_en || data.group_ja) : (data.group_ja || data.group_en)],
    [dict.seamlessAgeLabel, isEn ? (data.formationAge_en || data.formationAge_ja) : (data.formationAge_ja || data.formationAge_en)],
    [dict.seamlessLithologyLabel, isEn ? (data.lithology_en || data.lithology_ja) : (data.lithology_ja || data.lithology_en)]
  ].filter(([, v]) => Boolean(v));

  rows.forEach(([k, v]) => {
    const dt = document.createElement('dt');
    dt.textContent = k;
    const dd = document.createElement('dd');
    dd.textContent = v;
    metaList.append(dt, dd);
  });

  if (rows.length > 0) {
    root.appendChild(metaList);
  }

  return root;
}

/**
 * 右インスペクタ内のシームレス地点サマリーカードを更新する
 */
export function renderSeamlessPointCard() {
  if (!dom.seamlessPointCard) {
    return;
  }
  const showCard = Boolean(state.seamlessLayer && state.lastSeamlessPoint && state.inspectedItem === state.seamlessVirtualItem);
  if (!showCard) {
    dom.seamlessPointCard.hidden = true;
    dom.seamlessPointCard.innerHTML = '';
    return;
  }
  dom.seamlessPointCard.innerHTML = '';
  dom.seamlessPointCard.appendChild(buildSeamlessGeologyNode(state.lastSeamlessPoint));
  dom.seamlessPointCard.hidden = false;
}

/**
 * 右インスペクタと再展開タブの表示状態を同期する
 */
export function syncRightInspectorVisibility() {
  const hasContent = Boolean(state.inspectedItem) || state.activeOverlays.length > 0;
  if (!hasContent) {
    hideLegendLoupe();
    dom.rightInspector.classList.remove('is-open');
    dom.rightInspector.inert = true;
    dom.reopenRightBtn.classList.remove('is-open');
    dom.reopenRightBtn.inert = true;
    dom.mobileLegendTab.hidden = true;
    dom.appLayout.classList.remove('has-right-inspector');
    if (dom.appLayout.dataset.mobileView === 'legend') {
      switchMobileView('map');
    }
    return;
  }

  dom.mobileLegendTab.hidden = false;
  if (state.isRightInspectorCollapsed) {
    dom.rightInspector.classList.remove('is-open');
    dom.rightInspector.inert = true;
    dom.reopenRightBtn.classList.add('is-open');
    dom.reopenRightBtn.inert = false;
    dom.appLayout.classList.remove('has-right-inspector');
  } else {
    dom.rightInspector.classList.add('is-open');
    dom.rightInspector.inert = false;
    dom.reopenRightBtn.classList.remove('is-open');
    dom.reopenRightBtn.inert = true;
    dom.appLayout.classList.add('has-right-inspector');
    if (window.innerWidth > 720 && window.innerWidth < 1100 && !state.isLeftDrawerCollapsed) {
      setLeftDrawerCollapsed(true);
    }
  }
}

/**
 * 右インスペクタの折りたたみ状態を切り替える
 */
export function setRightInspectorCollapsed(collapsed) {
  state.isRightInspectorCollapsed = Boolean(collapsed);
  if (state.isRightInspectorCollapsed) {
    hideLegendLoupe();
  }
  renderSeamlessPointCard();
  syncRightInspectorVisibility();
}

/**
 * 共通スキーマの display 設定から Leaflet レイヤーを生成する
 */
export function createGeologicalLayer(meta, layerBounds = null, zIndex = 300, customOpacity = null) {
  if (!meta.overlayType || !meta.overlayUrl) {
    return null;
  }

  const commonOptions = {
    opacity: typeof customOpacity === 'number' ? customOpacity : state.overlayOpacity,
    attribution: meta.attribution,
    zIndex,
    updateWhenZooming: false,
    updateWhenIdle: false,
    keepBuffer: 6,
    ...(layerBounds && layerBounds.isValid() ? { bounds: layerBounds } : {})
  };

  if (meta.overlayType === 'xyz') {
    return L.tileLayer(meta.overlayUrl, {
      ...commonOptions,
      minZoom: CONFIG.MIN_ZOOM,
      maxNativeZoom: meta.zoomMax,
      maxZoom: CONFIG.MAX_ZOOM,
      errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    });
  }

  if (meta.overlayType === 'wms') {
    return L.tileLayer.wms(meta.overlayUrl, {
      ...CONFIG.WMS_OPTIONS,
      layers: meta.wmsLayers || CONFIG.WMS_OPTIONS.layers,
      ...commonOptions,
      minZoom: CONFIG.MIN_ZOOM,
      maxNativeZoom: meta.zoomMax,
      maxZoom: CONFIG.MAX_ZOOM
    });
  }

  if (meta.overlayType === 'raster' && meta.rasterImageUrl && layerBounds && layerBounds.isValid()) {
    return L.imageOverlay(meta.rasterImageUrl, layerBounds, {
      opacity: commonOptions.opacity,
      attribution: meta.attribution,
      zIndex
    });
  }

  return null;
}

/**
 * オーバーレイ中の図幅かどうかを判定する
 */
export function isItemOverlayed(item) {
  return state.activeOverlays.some((entry) => entry.item === item) || state.selectedItem === item;
}

/**
 * リスト上の選択状態クラスを同期する
 */
export function syncSelectedListItem() {
  const buttons = dom.resultList.querySelectorAll('.result-list-item');
  buttons.forEach((btn, idx) => {
    const targetItem = state.filteredItems[idx];
    btn.classList.toggle('is-selected', isItemOverlayed(targetItem));
  });
}

/**
 * 選択中の図幅の範囲へマップをズームする
 */
export function zoomToMapItem(item) {
  const bounds = getItemBounds(item);
  if (bounds && bounds.isValid() && state.map) {
    state.map.stop();
    const pad = getMapFitPadding();
    state.map.flyToBounds(bounds, {
      ...pad,
      maxZoom: item.meta.zoomMax || CONFIG.MAX_ZOOM,
      duration: 0.65,
      easeLinearity: 0.25
    });
  }
}

function syncOverlayZIndices() {
  state.activeOverlays.forEach((entry, idx) => {
    if (entry.layer && typeof entry.layer.setZIndex === 'function') {
      entry.layer.setZIndex(300 + idx);
    }
  });
}

/**
 * 削除後などにフォールバックとなるインスペクタ表示対象を返す
 */
export function getFallbackInspectorItem() {
  if (state.activeOverlays.length > 0) {
    return state.activeOverlays[state.activeOverlays.length - 1].item;
  }
  if (state.seamlessLayer && state.seamlessVirtualItem) {
    return state.seamlessVirtualItem;
  }
  return null;
}

/**
 * インスペクタ下部の表示（凡例/断面図 または 詳細・PDF）を更新する
 */
export function renderInspectorDetail(item, forceUpdate = false) {
  const dict = t();

  if (!item) {
    state.inspectedItem = null;
    hideLegendLoupe();
    dom.dominantInfoTitle.textContent = '';
    dom.dominantInfoSubtitle.textContent = '';
    dom.dominantInfoSubtitle.hidden = true;
    dom.dominantInfoMeta.innerHTML = '';
    dom.dominantInfoLinks.innerHTML = '';
    dom.legendMapName.textContent = '';
    dom.legendImage.removeAttribute('src');
    resetLoupeImageCache();
    dom.legendOpenLink.href = '#';
    if (dom.seamlessGuideCard) {
      dom.seamlessGuideCard.hidden = true;
      dom.seamlessGuideCard.innerHTML = '';
    }
    dom.rightInspector.classList.remove('is-compact');
    renderSeamlessPointCard();
    syncRightInspectorVisibility();
    return;
  }

  const { meta } = item;
  const loc = getLocalizedMeta(meta);
  const isNewItem = state.inspectedItem !== item;
  state.inspectedItem = item;

  if (!forceUpdate && isNewItem) {
    state.activeSectionIndex = 0;
    if (state.inspectorTab === 'section' && meta.sectionImages.length === 0) {
      state.inspectorTab = 'legend';
    }
    if (state.inspectorTab === 'legend' && !meta.legendImageUrl && meta.sectionImages.length > 0) {
      state.inspectorTab = 'section';
    }
  }

  const { activeTab, hasSections } = syncInspectorTabs(meta);
  renderInspectorMetadata(meta, loc);
  renderInspectorVisualContent(item, meta, loc, activeTab, hasSections);
  renderSeamlessPointCard();
  syncRightInspectorVisibility();
}

function syncInspectorTabs(meta) {
  const dict = t();
  const hasSections = meta.sectionImages.length > 0;
  if (state.inspectorTab === 'section' && !hasSections) {
    state.inspectorTab = 'legend';
  }

  dom.tabLegendBtn.textContent = dict.tabLegend;
  dom.tabSectionBtn.textContent = hasSections ? `${dict.tabSections} (${meta.sectionImages.length})` : dict.tabSections;
  dom.tabSectionBtn.hidden = !hasSections;
  dom.tabDetailBtn.textContent = dict.tabDetail;

  const activeTab = state.inspectorTab;
  [
    [dom.tabLegendBtn, 'legend'],
    [dom.tabSectionBtn, 'section'],
    [dom.tabDetailBtn, 'detail']
  ].forEach(([btn, tabName]) => {
    const isActive = activeTab === tabName;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  return { activeTab, hasSections };
}

function renderInspectorMetadata(meta, loc) {
  const dict = t();
  dom.dominantInfoTitle.textContent = loc.title;
  dom.dominantInfoSubtitle.textContent = loc.subtitle || '';
  dom.dominantInfoSubtitle.hidden = !loc.subtitle;

  const yearText = meta.publishedYear != null ? `${meta.publishedYear}${dict.yearSuffix}` : dict.yearUnknown;
  const typeLabel = dict.mapTypes[meta.mapType] || meta.mapType;
  const volcanoName = state.lang === 'en'
    ? (meta.volcanoNameEn || meta.volcanoNameJa)
    : (meta.volcanoNameJa || meta.volcanoNameEn);
  const metaEntries = [
    [dict.mapTypeFieldLabel, typeLabel],
    ...(volcanoName ? [[dict.volcanoLabel, volcanoName]] : []),
    [dict.yearLabel, yearText],
    [dict.scaleLabel, meta.scale],
    [dict.authorsLabel, loc.authors],
    [dict.providerLabel, loc.providerName],
    [dict.publisherLabel, loc.publisher],
    [dict.regionLabel, loc.region]
  ].filter(([, value]) => Boolean(value));

  dom.dominantInfoMeta.innerHTML = '';
  metaEntries.forEach(([label, value]) => {
    dom.dominantInfoMeta.append(el('dt', {}, label), el('dd', {}, value));
  });

  dom.dominantInfoLinks.innerHTML = '';
  [
    [dict.linkDetail, meta.detailUrl],
    [dict.linkPdf, meta.preferredPdf],
    [dict.linkFullPdf, meta.fullPdfUrl !== meta.preferredPdf ? meta.fullPdfUrl : ''],
    [dict.linkOriginal, meta.originalImageUrl]
  ].forEach(([label, url]) => {
    if (url) {
      dom.dominantInfoLinks.appendChild(
        el('a', { className: 'dominant-info-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, label)
      );
    }
  });
}

function renderInspectorVisualContent(item, meta, loc, activeTab, hasSections) {
  const dict = t();
  hideLegendLoupe();
  if (dom.seamlessGuideCard) {
    dom.seamlessGuideCard.hidden = true;
    dom.seamlessGuideCard.innerHTML = '';
  }
  if (activeTab === 'detail') {
    dom.inspectorVisualPane.hidden = true;
    dom.inspectorDetailPane.hidden = false;
    dom.legendOpenLink.hidden = true;
    dom.rightInspector.classList.remove('is-compact');
    return;
  }

  dom.inspectorVisualPane.hidden = false;
  dom.inspectorDetailPane.hidden = true;

  if (activeTab === 'section' && hasSections) {
    dom.sectionChips.innerHTML = '';
    const fragment = document.createDocumentFragment();
    meta.sectionImages.forEach((sec, idx) => {
      fragment.appendChild(
        el('button', {
          type: 'button',
          className: idx === state.activeSectionIndex ? 'decade-chip is-selected' : 'decade-chip',
          'aria-pressed': String(idx === state.activeSectionIndex),
          onClick: () => {
            state.activeSectionIndex = idx;
            renderInspectorDetail(item, true);
          }
        }, sec.label)
      );
    });
    dom.sectionChips.appendChild(fragment);
    dom.sectionChips.hidden = false;

    const currentSec = meta.sectionImages[state.activeSectionIndex] || meta.sectionImages[0];
    dom.legendMapName.textContent = `${loc.title} (${currentSec.label})`;
    dom.legendImage.src = currentSec.url;
    dom.legendImage.alt = `${loc.title} ${currentSec.label}`;
    dom.legendImage.hidden = false;
    dom.legendOpenLink.href = currentSec.url;
    dom.legendOpenLink.hidden = false;
    dom.rightInspector.classList.remove('is-compact');
    return;
  }

  dom.sectionChips.hidden = true;
  dom.sectionChips.innerHTML = '';
  dom.legendMapName.textContent = loc.title;
  if (meta.legendImageUrl) {
    dom.legendImage.src = meta.legendImageUrl;
    dom.legendImage.alt = `${loc.title} ${dict.tabLegend}`;
    dom.legendImage.hidden = false;
    dom.legendOpenLink.href = meta.legendImageUrl;
    dom.legendOpenLink.hidden = false;
    dom.rightInspector.classList.remove('is-compact');
    return;
  }

  dom.legendImage.removeAttribute('src');
  resetLoupeImageCache();
  dom.legendImage.hidden = true;
  dom.legendOpenLink.href = '#';
  dom.legendOpenLink.hidden = true;

  if ((meta.mapType === 'seamless_geological_map' || item === state.seamlessVirtualItem) && dom.seamlessGuideCard) {
    dom.legendMapName.textContent = loc.title;
    dom.seamlessGuideCard.appendChild(el('p', { className: 'seamless-guide-text' }, dict.seamlessGuideText));
    const guideLinks = el('div', { className: 'seamless-guide-links' });
    [
      [dict.seamlessViewerLink, meta.viewerUrl],
      [dict.seamlessLegendPageLink, meta.catalogUrl]
    ].forEach(([label, url]) => {
      if (url) {
        guideLinks.appendChild(
          el('a', { className: 'dominant-info-link', href: url, target: '_blank', rel: 'noopener noreferrer' }, label)
        );
      }
    });
    if (guideLinks.childElementCount > 0) {
      dom.seamlessGuideCard.appendChild(guideLinks);
    }
    dom.seamlessGuideCard.hidden = false;
  } else {
    dom.legendMapName.textContent = `${loc.title} — ${dict.legendNone}`;
  }
  dom.rightInspector.classList.toggle('is-compact', state.activeOverlays.length === 0);
}

/**
 * 右インスペクタのタブ（凡例 / 断面図 / 詳細・PDF）を切り替える
 */
export function switchInspectorTab(tab) {
  hideLegendLoupe();
  state.inspectorTab = tab;
  if (state.inspectedItem) {
    renderInspectorDetail(state.inspectedItem, true);
  }
}

/**
 * 表示範囲と交差面積が最大のオーバーレイを自動選択する
 */
export function updateAutoInspectedItem() {
  if (!state.map) {
    return;
  }
  const viewBounds = state.map.getBounds();
  const prevPinned = state.pinnedInspectItem;

  if (state.pinnedInspectItem) {
    const stillActive = state.activeOverlays.some((e) => e.item === state.pinnedInspectItem)
      || state.selectedItem === state.pinnedInspectItem;
    const pinArea = stillActive ? computeIntersectionArea(viewBounds, getItemBounds(state.pinnedInspectItem)) : 0;
    if (stillActive && pinArea > 0) {
      return;
    }
    state.pinnedInspectItem = null;
  }

  let bestItem = null;
  let bestArea = 0;
  state.activeOverlays.forEach((entry) => {
    const area = computeIntersectionArea(viewBounds, getItemBounds(entry.item));
    if (area > bestArea) {
      bestArea = area;
      bestItem = entry.item;
    }
  });

  const pinChanged = prevPinned !== state.pinnedInspectItem;
  if (bestItem && bestItem !== state.inspectedItem) {
    renderInspectorDetail(bestItem);
    renderActiveOverlayList();
  } else if (!bestItem && state.activeOverlays.length === 0 && state.seamlessLayer && state.seamlessVirtualItem && !state.inspectedItem) {
    renderInspectorDetail(state.seamlessVirtualItem);
  } else if (pinChanged) {
    renderActiveOverlayList();
  }
}

function moveOverlayOrder(index, delta) {
  const targetIndex = index + delta;
  if (targetIndex < 0 || targetIndex >= state.activeOverlays.length) {
    return;
  }
  const [moved] = state.activeOverlays.splice(index, 1);
  state.activeOverlays.splice(targetIndex, 0, moved);
  syncOverlayZIndices();
  renderActiveOverlayList();
  schedulePermalinkSync();
}

/**
 * 右インスペクタ上部の「表示中の地質図（最大4件）」コンパクトリストを描画する
 */
export function renderActiveOverlayList() {
  const dict = t();
  dom.activeOverlayList.innerHTML = '';
  if (state.activeOverlays.length === 0 && state.seamlessLayer && state.seamlessMeta && state.inspectedItem === state.seamlessVirtualItem) {
    dom.activeWmsName.textContent = getLocalizedMeta(state.seamlessMeta).shortTitle;
  } else {
    dom.activeWmsName.textContent = dict.activeMapsTitle(state.activeOverlays.length, CONFIG.MAX_OVERLAYS);
  }

  if (state.activeOverlays.length === 0) {
    dom.activeOverlaysSection.classList.remove('is-single');
    dom.activeOverlaysSection.hidden = true;
    dom.clearWmsBtn.hidden = true;
    return;
  }

  dom.activeOverlaysSection.classList.toggle('is-single', state.activeOverlays.length === 1);
  dom.activeOverlaysSection.hidden = false;
  dom.clearWmsBtn.hidden = false;
  const showOrderButtons = state.activeOverlays.length >= 2;
  const fragment = document.createDocumentFragment();

  for (let i = state.activeOverlays.length - 1; i >= 0; i -= 1) {
    const entry = state.activeOverlays[i];
    const { item, layer } = entry;
    const { meta } = item;
    const loc = getLocalizedMeta(meta);
    const li = document.createElement('li');
    li.className = 'active-overlay-item';
    if (state.inspectedItem === item) {
      li.classList.add('is-inspecting');
    }

    const topRow = document.createElement('div');
    topRow.className = 'active-overlay-top';

    const label = document.createElement('span');
    label.className = 'active-overlay-label';
    label.textContent = loc.title;
    label.title = loc.title;
    label.addEventListener('click', () => {
      state.selectedItem = item;
      state.pinnedInspectItem = item;
      renderInspectorDetail(item);
      renderActiveOverlayList();
      syncSelectedListItem();
    });

    const btns = document.createElement('div');
    btns.className = 'active-overlay-btns';

    if (state.pinnedInspectItem === item) {
      const pinBadge = document.createElement('button');
      pinBadge.type = 'button';
      pinBadge.className = 'overlay-pin-badge';
      pinBadge.textContent = dict.pinnedLabel;
      pinBadge.title = dict.unpinTitle;
      pinBadge.setAttribute('aria-label', dict.unpinTitle);
      pinBadge.addEventListener('click', (event) => {
        event.stopPropagation();
        state.pinnedInspectItem = null;
        updateAutoInspectedItem();
      });
      btns.appendChild(pinBadge);
    }

    if (showOrderButtons) {
      const upBtn = document.createElement('button');
      upBtn.type = 'button';
      upBtn.className = 'icon-button';
      upBtn.title = dict.moveUpTitle;
      upBtn.disabled = i === state.activeOverlays.length - 1;
      upBtn.setAttribute('aria-label', `${loc.title} ${dict.moveUpTitle}`);
      upBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      upBtn.addEventListener('click', () => moveOverlayOrder(i, 1));

      const downBtn = document.createElement('button');
      downBtn.type = 'button';
      downBtn.className = 'icon-button';
      downBtn.title = dict.moveDownTitle;
      downBtn.disabled = i === 0;
      downBtn.setAttribute('aria-label', `${loc.title} ${dict.moveDownTitle}`);
      downBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      downBtn.addEventListener('click', () => moveOverlayOrder(i, -1));

      btns.append(upBtn, downBtn);
    }

    const zoomBtn = document.createElement('button');
    zoomBtn.type = 'button';
    zoomBtn.className = 'icon-button';
    zoomBtn.title = dict.zoomTitle;
    zoomBtn.setAttribute('aria-label', `${loc.title} ${dict.zoomTitle}`);
    zoomBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
    zoomBtn.addEventListener('click', () => {
      state.selectedItem = item;
      state.pinnedInspectItem = item;
      renderInspectorDetail(item);
      renderActiveOverlayList();
      zoomToMapItem(item);
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'icon-button is-close';
    removeBtn.title = dict.closeTitle;
    removeBtn.setAttribute('aria-label', `${loc.title} ${dict.closeTitle}`);
    removeBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    removeBtn.addEventListener('click', () => removeOverlayByItem(item));

    btns.append(zoomBtn, removeBtn);
    topRow.append(label, btns);

    const opacityRow = document.createElement('div');
    opacityRow.className = 'overlay-item-opacity';
    const currentPct = Math.round((entry.opacity ?? state.overlayOpacity) * 100);

    const itemSlider = document.createElement('input');
    itemSlider.type = 'range';
    itemSlider.className = 'range-slider';
    itemSlider.min = '0';
    itemSlider.max = '100';
    itemSlider.value = String(currentPct);
    itemSlider.setAttribute('aria-label', `${loc.title} opacity`);

    const itemVal = document.createElement('span');
    itemVal.className = 'overlay-item-opacity-val';
    itemVal.textContent = `${currentPct}%`;

    itemSlider.addEventListener('input', () => {
      const pct = Number(itemSlider.value);
      const nextOpacity = pct / 100;
      entry.opacity = nextOpacity;
      state.overlayOpacity = nextOpacity;
      state.settings.overlayOpacity = nextOpacity;
      itemVal.textContent = `${pct}%`;
      if (layer && typeof layer.setOpacity === 'function') {
        layer.setOpacity(nextOpacity);
      }
      debouncedSaveSettings();
    });
    itemSlider.addEventListener('change', () => {
      saveSettings();
      syncSettingsUI();
    });

    opacityRow.append(itemSlider, itemVal);
    li.append(topRow, opacityRow);
    fragment.appendChild(li);
  }

  dom.activeOverlayList.appendChild(fragment);
}

/**
 * 指定された図幅のオーバーレイを解除する
 */
export function removeOverlayByItem(item) {
  const idx = state.activeOverlays.findIndex((entry) => entry.item === item);
  if (idx === -1) {
    return;
  }

  const [removed] = state.activeOverlays.splice(idx, 1);
  if (removed.isLoading) {
    state.loadingLayerCount = Math.max(0, state.loadingLayerCount - 1);
    if (state.loadingLayerCount === 0) {
      dom.wmsStatusDot.classList.remove('is-loading');
    }
  }
  if (state.map && removed.layer) {
    if (typeof removed.layer.off === 'function') {
      removed.layer.off();
    }
    state.map.removeLayer(removed.layer);
  }
  if (removed.item.layer) {
    removed.item.layer.setStyle(styleByScale(removed.item.meta.scaleDenominator, removed.item.meta.mapType));
  }

  if (state.pinnedInspectItem === item) {
    state.pinnedInspectItem = null;
  }
  if (state.selectedItem === item) {
    state.selectedItem = state.activeOverlays.length > 0
      ? state.activeOverlays[state.activeOverlays.length - 1].item
      : null;
  }
  if (state.inspectedItem === item) {
    state.inspectedItem = getFallbackInspectorItem();
  }

  syncOverlayZIndices();
  renderActiveOverlayList();
  syncSelectedListItem();
  renderInspectorDetail(state.inspectedItem);
  updateAutoInspectedItem();
  setStatusMessage('');
  schedulePermalinkSync();
}

/**
 * すべての地質図オーバーレイを閉じる
 */
export function clearAllOverlays() {
  state.activeOverlays.forEach(({ item, layer }) => {
    if (state.map && layer) {
      if (typeof layer.off === 'function') {
        layer.off();
      }
      state.map.removeLayer(layer);
    }
    if (item.layer) {
      item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
    }
  });
  state.activeOverlays = [];
  state.loadingLayerCount = 0;
  dom.wmsStatusDot.classList.remove('is-loading');

  if (state.selectedItem && state.selectedItem.layer) {
    state.selectedItem.layer.setStyle(styleByScale(state.selectedItem.meta.scaleDenominator, state.selectedItem.meta.mapType));
  }
  state.selectedItem = null;
  state.pinnedInspectItem = null;
  state.inspectedItem = getFallbackInspectorItem();

  renderActiveOverlayList();
  syncSelectedListItem();
  renderInspectorDetail(state.inspectedItem);
  setStatusMessage('');
  schedulePermalinkSync();
}

/**
 * 図幅を選択し、オーバーレイ追加（最大4図幅）または詳細・凡例表示を行う
 */
export function addOverlayForItem(item) {
  const { meta } = item;
  const prevSelected = state.selectedItem;
  state.selectedItem = item;
  state.pinnedInspectItem = null;
  state.isRightInspectorCollapsed = false;

  if (prevSelected && prevSelected !== item && !state.activeOverlays.some((e) => e.item === prevSelected)) {
    if (prevSelected.layer) {
      prevSelected.layer.setStyle(styleByScale(prevSelected.meta.scaleDenominator, prevSelected.meta.mapType));
    }
  }

  const existing = state.activeOverlays.find((entry) => entry.item === item);
  if (existing) {
    if (existing.layer && typeof existing.layer.bringToFront === 'function') {
      existing.layer.bringToFront();
    }
    state.activeOverlays.push(...state.activeOverlays.splice(state.activeOverlays.indexOf(existing), 1));
    syncOverlayZIndices();
    renderInspectorDetail(item);
    renderActiveOverlayList();
    syncSelectedListItem();
    schedulePermalinkSync();
    return;
  }

  const layerBounds = getItemBounds(item);
  const overlayLayer = createGeologicalLayer(meta, layerBounds, 300);

  setStatusMessage('');

  if (!overlayLayer) {
    if (prevSelected === item && dom.rightInspector.classList.contains('is-open') && !state.isRightInspectorCollapsed) {
      if (item.layer) {
        item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
      }
      if (state.pinnedInspectItem === item) {
        state.pinnedInspectItem = null;
      }
      state.selectedItem = null;
      state.inspectedItem = getFallbackInspectorItem();
      syncSelectedListItem();
      renderInspectorDetail(state.inspectedItem);
      return;
    }
    if (item.layer) {
      item.layer.setStyle(CONFIG.POLYGON_STYLE.selected);
    }
    syncSelectedListItem();
    renderInspectorDetail(item, true);
    return;
  }

  if (state.activeOverlays.length >= CONFIG.MAX_OVERLAYS) {
    removeOverlayByItem(state.activeOverlays[0].item);
  }

  const overlayEntry = { item, layer: overlayLayer, isLoading: false, opacity: state.overlayOpacity };
  let loadedTileCount = 0;
  let errorTileCount = 0;

  overlayLayer.on('loading', () => {
    loadedTileCount = 0;
    errorTileCount = 0;
    if (!overlayEntry.isLoading) {
      overlayEntry.isLoading = true;
      state.loadingLayerCount += 1;
    }
    dom.wmsStatusDot.classList.add('is-loading');
  });

  overlayLayer.on('tileload', () => {
    loadedTileCount += 1;
  });

  overlayLayer.on('tileerror', () => {
    errorTileCount += 1;
  });

  overlayLayer.on('load', () => {
    if (overlayEntry.isLoading) {
      overlayEntry.isLoading = false;
      state.loadingLayerCount = Math.max(0, state.loadingLayerCount - 1);
    }
    if (state.loadingLayerCount === 0) {
      dom.wmsStatusDot.classList.remove('is-loading');
    }
    if (loadedTileCount === 0 && errorTileCount > 0) {
      const loc = getLocalizedMeta(meta);
      setStatusMessage(t().tileErrorMessage(loc.shortTitle));
    }
  });

  overlayLayer.addTo(state.map);
  state.activeOverlays.push(overlayEntry);
  syncOverlayZIndices();
  if (item.layer) {
    item.layer.setStyle(CONFIG.POLYGON_STYLE.selected);
  }

  renderInspectorDetail(item, true);
  renderActiveOverlayList();
  syncSelectedListItem();
  schedulePermalinkSync();
}
```

### `js/main.js`（全 628 行）

```javascript
import { CONFIG } from './config.js';
import { getCourseKey } from './dom.js';
import {
  collapseAllFieldTrips,
  expandAllFieldTrips,
  fetchFieldTrips,
  fitExpandedFieldTrips,
  fitFilteredFieldTrips,
  getFilteredFieldTripItems,
  overlayGeoMapAtCurrentSpot,
  populateFieldTripFilters,
  renderFieldTripCategoryChips,
  renderFieldTripList,
  renderFieldTripMarkers,
  setFieldTripsVisible,
  stepFieldTripStop,
  switchDrawerMode,
  syncFieldTripActiveBar,
  updateFieldTripFilter
} from './fieldTrips.js';
import { I18N, t } from './i18n.js';
import {
  addOverlayForItem,
  buildSeamlessGeologyNode,
  clearAllOverlays,
  hideLegendLoupe,
  onLegendImageError,
  refreshLoupeRects,
  renderActiveOverlayList,
  renderInspectorDetail,
  renderSeamlessPointCard,
  setRightInspectorCollapsed,
  switchInspectorTab,
  updateAutoInspectedItem,
  updateLegendLoupe
} from './inspector.js';
import {
  applyScaleBarVisibility,
  applyTheme,
  closeAllPopovers,
  fitAllVisibleItems,
  initMap,
  initTheme,
  locateCurrentPosition,
  setLeftDrawerCollapsed,
  setStatusMessage,
  switchBasemap,
  switchMobileView,
  syncSettingsUI,
  togglePopover
} from './map.js';
import { buildTooltipText, getLocalizedMeta } from './normalize.js';
import { parsePermalinkHash, schedulePermalinkSync } from './permalink.js';
import {
  applyFilters,
  buildSuggestionPool,
  handleSearchKeydown,
  handleYearSliderInput,
  hideSuggestions,
  renderGeoJsonFeatures,
  renderMapTypeChips,
  renderOtherChips,
  renderScaleChips,
  renderSuggestions,
  resetFilters,
  toggleFiltersPanel,
  updateYearSliderUI
} from './search.js';
import {
  handleSeamlessOpacityChange,
  loadSeamlessProvider,
  querySeamlessPointGeology,
  toggleSeamless200k
} from './seamless.js';
import { debouncedSaveSettings, dom, loadSettings, saveSettings, state } from './state.js';

function toggleIndexFrames() {
  state.showIndexFrames = dom.showIndexToggle.checked;
  state.settings.showIndexFrames = state.showIndexFrames;
  saveSettings();
  syncSettingsUI();

  if (!state.map || !state.indexLayerGroup) {
    return;
  }
  if (state.showIndexFrames) {
    if (!state.map.hasLayer(state.indexLayerGroup)) {
      state.indexLayerGroup.addTo(state.map);
    }
  } else if (state.map.hasLayer(state.indexLayerGroup)) {
    state.map.removeLayer(state.indexLayerGroup);
  }
}

function resetAllSettings() {
  state.settings = { ...CONFIG.DEFAULT_SETTINGS };
  state.showIndexFrames = state.settings.showIndexFrames;
  state.showFieldTrips = state.settings.showFieldTrips;
  state.showScaleBar = state.settings.showScaleBar;
  state.showFieldTripRoute = state.settings.showFieldTripRoute;
  state.wheelZoomSpeed = state.settings.wheelZoomSpeed;
  state.fieldTripYear = state.settings.fieldTripYear;
  state.fieldTripCourse = state.settings.fieldTripCourse;
  state.selectedFieldTripCategories.clear();
  state.settings.fieldTripCategories = [];
  state.viewportOnly = state.settings.viewportOnly;
  state.overlayOpacity = state.settings.overlayOpacity;
  state.seamlessOpacity = state.settings.seamlessOpacity;
  state.seamlessQueryPriority = state.settings.seamlessQueryPriority;

  if (state.map) {
    state.map.options.wheelPxPerZoomLevel = Math.round(100 / state.wheelZoomSpeed);
  }
  applyScaleBarVisibility();

  if (dom.showIndexToggle) {
    dom.showIndexToggle.checked = state.showIndexFrames;
    toggleIndexFrames();
  }
  setFieldTripsVisible(state.showFieldTrips);
  renderFieldTripCategoryChips();
  populateFieldTripFilters();
  renderFieldTripMarkers();
  renderFieldTripList();
  if (dom.viewportOnlyToggle) {
    dom.viewportOnlyToggle.checked = state.viewportOnly;
    applyFilters();
  }
  if (dom.seamless200kToggle) {
    dom.seamless200kToggle.checked = state.settings.seamless200k;
    toggleSeamless200k();
  }

  switchBasemap(CONFIG.DEFAULT_SETTINGS.basemap);
  applyTheme('light', { persist: true });
  if (state.lang !== CONFIG.DEFAULT_SETTINGS.lang) {
    switchLanguage(CONFIG.DEFAULT_SETTINGS.lang);
  }
  saveSettings();
  syncSettingsUI();
}

function getPopoverPairs() {
  return [
    [dom.layersPopoverBtn, dom.layersPopover],
    [dom.prefsPopoverBtn, dom.prefsPopover]
  ].filter(([btn, pop]) => btn && pop);
}

function bindDebouncedSearchInput(inputEl, onApply, delayMs = 100, { onInput } = {}) {
  if (!inputEl) {
    return;
  }
  let timer = null;
  inputEl.addEventListener('input', (event) => {
    if (event.isComposing) {
      return;
    }
    if (typeof onInput === 'function') {
      onInput();
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      onApply();
    }, delayMs);
  });
  inputEl.addEventListener('compositionend', () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (typeof onInput === 'function') {
      onInput();
    }
    onApply();
  });
}

function handleGlobalKeydown(event) {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  const activeEl = document.activeElement;
  const isInputFocused = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl?.tagName);
  const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

  if (event.key === 'Escape') {
    if (getPopoverPairs().some(([, pop]) => pop.classList.contains('is-open'))) {
      event.preventDefault();
      closeAllPopovers();
      return;
    }
    if (isInputFocused) {
      activeEl.blur();
      hideSuggestions();
    }
    return;
  }

  if ((event.key === '/' && !isInputFocused && !hasModifier) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
    event.preventDefault();
    closeAllPopovers();
    dom.searchInput.focus();
    dom.searchInput.select();
    return;
  }

  if (!isInputFocused && !hasModifier && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    const moved = stepFieldTripStop(event.key === 'ArrowLeft' ? -1 : 1);
    if (moved) {
      event.preventDefault();
    }
  }
}

function applyDeclarativeI18n(dict) {
  document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria-label]').forEach((node) => {
    const { i18n, i18nPlaceholder, i18nTitle, i18nAriaLabel } = node.dataset;
    if (i18n && dict[i18n] !== undefined) {
      node.textContent = dict[i18n];
    }
    if (i18nPlaceholder && dict[i18nPlaceholder] !== undefined) {
      node.placeholder = dict[i18nPlaceholder];
    }
    if (i18nTitle && dict[i18nTitle] !== undefined) {
      node.title = dict[i18nTitle];
    }
    if (i18nAriaLabel && dict[i18nAriaLabel] !== undefined) {
      node.setAttribute('aria-label', dict[i18nAriaLabel]);
    }
  });
}

function switchLanguage(lang) {
  if (!I18N[lang] || state.lang === lang) {
    return;
  }

  state.lang = lang;
  state.settings.lang = lang;
  saveSettings();
  document.documentElement.lang = lang;
  const dict = t();

  applyDeclarativeI18n(dict);
  renderFieldTripCategoryChips();
  populateFieldTripFilters();
  renderFieldTripMarkers();
  renderFieldTripList();
  syncFieldTripActiveBar();
  setLeftDrawerCollapsed(state.isLeftDrawerCollapsed);

  state.allItems.forEach((item) => {
    item.cachedLoc = getLocalizedMeta(item.meta);
    if (typeof item.layer.setTooltipContent === 'function') {
      item.layer.setTooltipContent(buildTooltipText(item.meta));
    }
  });

  hideSuggestions();
  renderMapTypeChips();
  updateYearSliderUI();
  renderScaleChips();
  renderOtherChips();
  buildSuggestionPool();
  applyFilters();
  renderActiveOverlayList();
  if (state.inspectedItem) {
    renderInspectorDetail(state.inspectedItem, true);
  }
  if (state.lastSeamlessPoint && state.seamlessPopup && state.seamlessPopup.isOpen()) {
    state.seamlessPopup.setContent(buildSeamlessGeologyNode(state.lastSeamlessPoint));
  }
  renderSeamlessPointCard();
  syncSettingsUI();
}

function bindSearchEvents() {
  bindDebouncedSearchInput(dom.searchInput, applyFilters, 100, { onInput: renderSuggestions });
  dom.searchInput.addEventListener('focus', renderSuggestions);
  dom.searchInput.addEventListener('blur', hideSuggestions);
  dom.searchInput.addEventListener('keydown', handleSearchKeydown);

  dom.toggleLeftDrawerBtn.addEventListener('click', () => {
    setLeftDrawerCollapsed(!state.isLeftDrawerCollapsed);
  });
  if (dom.drawerTabMaps) {
    dom.drawerTabMaps.addEventListener('click', () => switchDrawerMode('maps'));
  }
  if (dom.drawerTabTrips) {
    dom.drawerTabTrips.addEventListener('click', () => switchDrawerMode('trips'));
  }
}

function bindFilterEvents() {
  dom.viewportOnlyToggle.addEventListener('change', () => {
    state.viewportOnly = dom.viewportOnlyToggle.checked;
    state.settings.viewportOnly = state.viewportOnly;
    saveSettings();
    syncSettingsUI();
    applyFilters();
  });
  dom.yearRangeMin.addEventListener('input', () => handleYearSliderInput('min'));
  dom.yearRangeMax.addEventListener('input', () => handleYearSliderInput('max'));
  dom.toggleFiltersBtn.addEventListener('click', toggleFiltersPanel);
  dom.resetFiltersBtn.addEventListener('click', () => {
    hideSuggestions();
    resetFilters();
  });
  dom.fitAllBtn.addEventListener('click', fitAllVisibleItems);
}

function bindFieldTripEvents() {
  if (dom.fieldTripsFabBtn) {
    dom.fieldTripsFabBtn.addEventListener('click', () => {
      setFieldTripsVisible(!state.showFieldTrips);
    });
  }
  if (dom.drawerTripYearFilter) {
    dom.drawerTripYearFilter.addEventListener('change', () => {
      updateFieldTripFilter(dom.drawerTripYearFilter.value, state.fieldTripCourse);
    });
  }
  if (dom.drawerTripCourseFilter) {
    dom.drawerTripCourseFilter.addEventListener('change', () => {
      updateFieldTripFilter(state.fieldTripYear, dom.drawerTripCourseFilter.value);
    });
  }
  if (dom.drawerTripSearch) {
    bindDebouncedSearchInput(dom.drawerTripSearch, () => {
      state.fieldTripQuery = dom.drawerTripSearch.value || '';
      renderFieldTripMarkers();
      renderFieldTripList();
    });
  }
  if (dom.fitFieldTripsBtn) {
    dom.fitFieldTripsBtn.addEventListener('click', fitFilteredFieldTrips);
  }
  if (dom.toggleExpandTripsBtn) {
    dom.toggleExpandTripsBtn.addEventListener('click', () => {
      const filtered = getFilteredFieldTripItems();
      const hasExpanded = filtered.some((it) => state.expandedFieldTripCourses.has(getCourseKey(it.props)));
      if (hasExpanded) {
        collapseAllFieldTrips();
      } else {
        expandAllFieldTrips();
      }
    });
  }
  if (dom.fieldTripBarFitBtn) {
    dom.fieldTripBarFitBtn.addEventListener('click', fitExpandedFieldTrips);
  }
  if (dom.fieldTripBarCollapseBtn) {
    dom.fieldTripBarCollapseBtn.addEventListener('click', collapseAllFieldTrips);
  }
  if (dom.fieldTripBarOverlayBtn) {
    dom.fieldTripBarOverlayBtn.addEventListener('click', overlayGeoMapAtCurrentSpot);
  }
  if (dom.fieldTripPrevStopBtn) {
    dom.fieldTripPrevStopBtn.addEventListener('click', () => stepFieldTripStop(-1));
  }
  if (dom.fieldTripNextStopBtn) {
    dom.fieldTripNextStopBtn.addEventListener('click', () => stepFieldTripStop(1));
  }
}

function bindInspectorEvents() {
  dom.clearWmsBtn.addEventListener('click', clearAllOverlays);
  dom.collapseRightBtn.addEventListener('click', () => setRightInspectorCollapsed(true));
  dom.reopenRightBtn.addEventListener('click', () => setRightInspectorCollapsed(false));

  dom.legendZoomWrapper.addEventListener('mouseenter', (event) => {
    refreshLoupeRects();
    updateLegendLoupe(event);
  });
  dom.legendZoomWrapper.addEventListener('mousemove', updateLegendLoupe);
  dom.legendZoomWrapper.addEventListener('mouseleave', hideLegendLoupe);
  dom.legendImage.addEventListener('error', onLegendImageError);
  dom.rightInspector.addEventListener('scroll', () => {
    hideLegendLoupe();
    refreshLoupeRects();
  }, { capture: true, passive: true });

  [dom.tabLegendBtn, dom.tabSectionBtn, dom.tabDetailBtn].forEach((btn) => {
    btn.addEventListener('click', () => {
      switchInspectorTab(btn.dataset.inspectorTab);
    });
  });
}

function bindMapControlEvents() {
  dom.showIndexToggle.addEventListener('change', toggleIndexFrames);
  if (dom.locateMeBtn) {
    dom.locateMeBtn.addEventListener('click', locateCurrentPosition);
  }
  if (dom.wheelZoomSpeedSlider) {
    dom.wheelZoomSpeedSlider.addEventListener('input', () => {
      const speed = Math.min(2.5, Math.max(0.4, Number(dom.wheelZoomSpeedSlider.value) || 1.0));
      state.wheelZoomSpeed = speed;
      state.settings.wheelZoomSpeed = speed;
      if (dom.wheelZoomSpeedValue) {
        dom.wheelZoomSpeedValue.textContent = `${speed.toFixed(1)}x`;
      }
      if (state.map) {
        state.map.options.wheelPxPerZoomLevel = Math.round(100 / speed);
      }
      debouncedSaveSettings();
    });
    dom.wheelZoomSpeedSlider.addEventListener('change', saveSettings);
  }
  if (dom.defaultOverlayOpacitySlider) {
    dom.defaultOverlayOpacitySlider.addEventListener('input', () => {
      const pct = Math.min(100, Math.max(10, Number(dom.defaultOverlayOpacitySlider.value) || 85));
      const opacity = pct / 100;
      state.overlayOpacity = opacity;
      state.settings.overlayOpacity = opacity;
      if (dom.defaultOverlayOpacityValue) {
        dom.defaultOverlayOpacityValue.textContent = `${pct}%`;
      }
      debouncedSaveSettings();
    });
    dom.defaultOverlayOpacitySlider.addEventListener('change', saveSettings);
  }
  if (dom.showScaleToggle) {
    dom.showScaleToggle.addEventListener('change', () => {
      state.showScaleBar = dom.showScaleToggle.checked;
      state.settings.showScaleBar = state.showScaleBar;
      applyScaleBarVisibility();
      saveSettings();
    });
  }
  if (dom.showTripRouteToggle) {
    dom.showTripRouteToggle.addEventListener('change', () => {
      state.showFieldTripRoute = dom.showTripRouteToggle.checked;
      state.settings.showFieldTripRoute = state.showFieldTripRoute;
      renderFieldTripMarkers();
      saveSettings();
    });
  }
  dom.seamless200kToggle.addEventListener('change', toggleSeamless200k);
  dom.seamlessOpacitySlider.addEventListener('input', handleSeamlessOpacityChange);
  dom.seamlessOpacitySlider.addEventListener('change', saveSettings);
  if (dom.seamlessQueryToggle) {
    dom.seamlessQueryToggle.addEventListener('change', () => {
      state.seamlessQueryPriority = dom.seamlessQueryToggle.checked;
      state.settings.seamlessQueryPriority = state.seamlessQueryPriority;
      saveSettings();
      syncSettingsUI();
    });
  }

  let resizeTimer = null;
  let lastWasMobile = window.innerWidth <= 720;
  window.addEventListener('resize', () => {
    hideLegendLoupe();
    refreshLoupeRects();
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      const isNowMobile = window.innerWidth <= 720;
      if (isNowMobile !== lastWasMobile) {
        lastWasMobile = isNowMobile;
        setLeftDrawerCollapsed(state.isLeftDrawerCollapsed);
      }
      if (state.map) {
        state.map.invalidateSize({ animate: false, pan: false });
      }
      if (state.fieldTripItems.length > 0) {
        renderFieldTripMarkers();
      }
    }, 150);
  }, { passive: true });
}

function initEventListeners() {
  bindSearchEvents();
  bindFilterEvents();
  bindFieldTripEvents();
  bindInspectorEvents();
  bindMapControlEvents();

  const popoverPairs = getPopoverPairs();
  popoverPairs.forEach(([btn, pop]) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      togglePopover(btn, pop);
    });
  });

  document.addEventListener('click', (event) => {
    const insidePopover = popoverPairs.some(([btn, pop]) => pop.contains(event.target) || btn.contains(event.target));
    if (!insidePopover) {
      closeAllPopovers();
    }
  });

  dom.basemapButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchBasemap(btn.dataset.basemap));
  });

  dom.themeChoiceButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeChoice, { persist: true }));
  });

  dom.langButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });

  dom.resetSettingsBtn.addEventListener('click', resetAllSettings);

  dom.mobileNavButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchMobileView(btn.dataset.mobileView));
  });

  document.addEventListener('keydown', handleGlobalKeydown);
}

async function fetchMapIndex(url) {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(t().loadErrorMessage);
  }
  return response.json();
}

async function init() {
  const permalink = parsePermalinkHash();
  loadSettings();
  initTheme();
  syncSettingsUI();
  setLeftDrawerCollapsed(true);
  switchMobileView('map');

  state.map = initMap({
    onMoveEnd: () => {
      if (state.viewportOnly) {
        applyFilters();
      }
      updateAutoInspectedItem();
    },
    onZoomEnd: () => {
      if (state.fieldTripItems.length > 0) {
        renderFieldTripMarkers();
      }
    },
    onMapClick: (event) => {
      if (state.seamlessLayer && event && event.latlng) {
        querySeamlessPointGeology(event.latlng);
      }
    },
    onPopupClose: (event) => {
      if (event && event.popup === state.seamlessPopup) {
        if (state.seamlessPointMarker && state.map) {
          state.map.removeLayer(state.seamlessPointMarker);
        }
        state.seamlessPointMarker = null;
        state.seamlessPopup = null;
      }
    }
  });

  if (permalink && permalink.hasView) {
    state.permalinkRestoredView = true;
    state.map.setView([permalink.lat, permalink.lng], permalink.z, { animate: false });
  }

  initEventListeners();
  renderFieldTripCategoryChips();
  if (state.settings.lang && state.settings.lang !== state.lang) {
    switchLanguage(state.settings.lang);
  }

  const seamlessPromise = loadSeamlessProvider({ forceEnable: Boolean(permalink && permalink.seamless) });
  const fieldTripsPromise = fetchFieldTrips({
    onLoaded: () => {
      buildSuggestionPool();
      if (permalink && permalink.trip) {
        const exists = state.fieldTripItems.some(
          (it) => getCourseKey(it.props) === permalink.trip
        );
        if (exists) {
          if (!state.showFieldTrips) {
            setFieldTripsVisible(true);
          }
          state.expandedFieldTripCourses.clear();
          state.expandedFieldTripCourses.add(permalink.trip);
          renderFieldTripMarkers();
          renderFieldTripList();
          if (!state.permalinkRestoredView) {
            fitExpandedFieldTrips();
          }
        }
      }
    }
  });

  try {
    const geojsonData = await fetchMapIndex(CONFIG.GEOJSON_URL);
    renderGeoJsonFeatures(geojsonData, {
      skipInitialFit: state.permalinkRestoredView || Boolean(permalink && permalink.trip)
    });

    if (permalink && permalink.maps.length > 0) {
      permalink.maps.forEach((mapId) => {
        const match = state.allItems.find((it) => String(it.meta.mapId) === String(mapId));
        if (match) {
          addOverlayForItem(match);
        }
      });
    }
  } catch {
    dom.resultCount.textContent = t().loadErrorCount;
    setStatusMessage(t().loadErrorMessage);
  }

  await Promise.allSettled([seamlessPromise, fieldTripsPromise]);
  if (permalink && permalink.hasView) {
    state.map.setView([permalink.lat, permalink.lng], permalink.z, { animate: false });
  }
  schedulePermalinkSync();
}

document.addEventListener('DOMContentLoaded', init);
```

### `js/map.js`（全 498 行）

```javascript
import { CONFIG } from './config.js';
import { t } from './i18n.js';
import { getItemBounds } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { saveSettings, state, dom } from './state.js';

/**
 * ステータスメッセージを表示/非表示にする
 */
export function setStatusMessage(message) {
  if (!dom.statusMessage) {
    return;
  }
  if (!message) {
    dom.statusMessage.textContent = '';
    dom.statusMessage.hidden = true;
  } else {
    dom.statusMessage.textContent = message;
    dom.statusMessage.hidden = false;
  }
}

/**
 * 件数バッジを更新する
 */
export function updateResultCount(visibleCount, totalCount) {
  if (dom.resultCount) {
    dom.resultCount.textContent = t().resultCount(visibleCount, totalCount);
  }
}

/**
 * 各種設定コントロールの表示状態を state.settings と同期する
 */
export function syncSettingsUI() {
  const s = state.settings;
  if (dom.showIndexToggle) {
    dom.showIndexToggle.checked = Boolean(state.showIndexFrames);
  }
  if (dom.fieldTripsFabBtn) {
    const isOn = Boolean(state.showFieldTrips);
    dom.fieldTripsFabBtn.classList.toggle('is-field-trip-active', isOn);
    dom.fieldTripsFabBtn.setAttribute('aria-pressed', String(isOn));
  }
  if (dom.drawerTripYearFilter) {
    dom.drawerTripYearFilter.value = state.fieldTripYear;
  }
  if (dom.drawerTripCourseFilter) {
    dom.drawerTripCourseFilter.value = state.fieldTripCourse;
  }
  if (dom.viewportOnlyToggle) {
    dom.viewportOnlyToggle.checked = Boolean(state.viewportOnly);
  }
  if (dom.seamless200kToggle) {
    dom.seamless200kToggle.checked = Boolean(s.seamless200k);
  }
  const seamlessPct = Math.round(state.seamlessOpacity * 100);
  if (dom.seamlessOpacitySlider) {
    dom.seamlessOpacitySlider.value = String(seamlessPct);
  }
  if (dom.seamlessOpacityValue) {
    dom.seamlessOpacityValue.textContent = `${seamlessPct}%`;
  }
  if (dom.seamlessOpacityRow) {
    dom.seamlessOpacityRow.hidden = !Boolean(s.seamless200k);
  }
  if (dom.seamlessQueryRow) {
    dom.seamlessQueryRow.hidden = !Boolean(s.seamless200k);
  }
  if (dom.seamlessQueryToggle) {
    dom.seamlessQueryToggle.checked = Boolean(state.seamlessQueryPriority);
  }
  if (dom.mapEl) {
    dom.mapEl.classList.toggle('map-query-cursor', Boolean(s.seamless200k && state.seamlessQueryPriority));
  }
  dom.basemapButtons.forEach((btn) => {
    const isActive = btn.dataset.basemap === state.activeBasemapKey;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  dom.themeChoiceButtons.forEach((btn) => {
    const isActive = btn.dataset.themeChoice === state.theme;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  dom.langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === state.lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  if (dom.wheelZoomSpeedSlider) {
    dom.wheelZoomSpeedSlider.value = String(state.wheelZoomSpeed);
  }
  if (dom.wheelZoomSpeedValue) {
    dom.wheelZoomSpeedValue.textContent = `${state.wheelZoomSpeed.toFixed(1)}x`;
  }
  const overlayPct = Math.round(state.overlayOpacity * 100);
  if (dom.defaultOverlayOpacitySlider) {
    dom.defaultOverlayOpacitySlider.value = String(overlayPct);
  }
  if (dom.defaultOverlayOpacityValue) {
    dom.defaultOverlayOpacityValue.textContent = `${overlayPct}%`;
  }
  if (dom.showScaleToggle) {
    dom.showScaleToggle.checked = Boolean(state.showScaleBar);
  }
  if (dom.showTripRouteToggle) {
    dom.showTripRouteToggle.checked = Boolean(state.showFieldTripRoute);
  }
}

/**
 * ベースマップ（背景地図）を切り替える
 */
export function switchBasemap(key) {
  if (!CONFIG.BASEMAPS[key] || !state.map) {
    return;
  }

  if (state.activeBaseLayer) {
    state.map.removeLayer(state.activeBaseLayer);
  }

  const def = CONFIG.BASEMAPS[key];
  state.activeBaseLayer = L.tileLayer(def.url, {
    attribution: def.attribution,
    maxNativeZoom: def.maxNativeZoom || def.maxZoom || CONFIG.MAX_ZOOM,
    maxZoom: def.maxZoom || CONFIG.MAX_ZOOM,
    keepBuffer: 4,
    zIndex: 1
  });

  state.activeBaseLayer.addTo(state.map);
  state.activeBaseLayer.bringToBack();
  state.activeBasemapKey = key;
  state.settings.basemap = key;
  saveSettings();
  syncSettingsUI();
}

/**
 * ドロワー・インスペクタ・下部ドックの実測サイズを考慮した fitBounds 用パディングを返す
 */
export function getMapFitPadding() {
  const isMobile = window.innerWidth <= 720;
  let leftPad = 24;
  let rightPad = 24;
  let topPad = isMobile ? 60 : 24;
  let bottomPad = isMobile ? 64 : 24;

  if (!isMobile) {
    if (dom.leftDrawer && !dom.leftDrawer.classList.contains('is-collapsed')) {
      const rect = dom.leftDrawer.getBoundingClientRect();
      if (rect.width > 0) {
        leftPad = Math.max(leftPad, Math.round(rect.right + 16));
      }
    }
    if (dom.rightInspector && dom.rightInspector.classList.contains('is-open')) {
      const rect = dom.rightInspector.getBoundingClientRect();
      if (rect.width > 0) {
        rightPad = Math.max(rightPad, Math.round(window.innerWidth - rect.left + 16));
      }
    }
  }

  if (dom.fieldTripActiveBar && !dom.fieldTripActiveBar.hidden) {
    const barRect = dom.fieldTripActiveBar.getBoundingClientRect();
    if (barRect.height > 0) {
      bottomPad = Math.max(bottomPad, Math.round(window.innerHeight - barRect.top + 16));
    }
  }

  return {
    paddingTopLeft: [leftPad, topPad],
    paddingBottomRight: [rightPad, bottomPad]
  };
}

/**
 * 指定されたアイテム群の全体が収まるよう地図をフィットする
 */
export function fitBoundsForItems(items, { animate = true } = {}) {
  if (!state.map || !items || items.length === 0) {
    return;
  }
  let merged = null;
  items.forEach((item) => {
    const b = getItemBounds(item);
    if (b && b.isValid()) {
      merged = merged ? merged.extend(b) : L.latLngBounds(b.getSouthWest(), b.getNorthEast());
    }
  });
  if (merged && merged.isValid()) {
    state.map.stop();
    const pad = getMapFitPadding();
    if (animate) {
      state.map.flyToBounds(merged, { ...pad, maxZoom: 11, duration: 0.65 });
    } else {
      state.map.fitBounds(merged, { ...pad, maxZoom: 11, animate: false });
    }
  }
}

/**
 * 絞り込み中の全図幅にズームする
 */
export function fitAllVisibleItems(options = {}) {
  const targets = state.filteredItems.filter((it) => it.meta.geometryModel !== 'continuous_polygon');
  fitBoundsForItems(targets.length > 0 ? targets : state.filteredItems, options);
}

/**
 * スケールバー（縮尺）の表示/非表示を地図に反映する
 */
export function applyScaleBarVisibility() {
  if (!state.map || !state.scaleControl) {
    return;
  }
  if (state.showScaleBar) {
    if (!state.scaleControl._map) {
      state.scaleControl.addTo(state.map);
    }
  } else if (state.scaleControl._map) {
    state.scaleControl.remove();
  }
}

/**
 * モバイル表示時のアクティブパネルを切り替える
 */
export function switchMobileView(view) {
  dom.appLayout.dataset.mobileView = view;
  dom.mobileNavButtons.forEach((btn) => {
    const isActive = btn.dataset.mobileView === view;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  if (dom.leftDrawerWrap) {
    const isMobileSearch = window.innerWidth <= 720 && view === 'search';
    dom.leftDrawerWrap.inert = state.isLeftDrawerCollapsed && !isMobileSearch;
  }
  if (view === 'map' && state.map) {
    setTimeout(() => state.map.invalidateSize({ animate: false, pan: false }), 50);
  }
}

/**
 * 左検索・一覧ドロワーの折りたたみ状態を切り替える
 */
export function setLeftDrawerCollapsed(collapsed) {
  state.isLeftDrawerCollapsed = Boolean(collapsed);
  dom.leftDrawer.classList.toggle('is-collapsed', state.isLeftDrawerCollapsed);
  if (dom.appLayout) {
    dom.appLayout.classList.toggle('has-left-drawer', !state.isLeftDrawerCollapsed);
  }
  if (!state.isLeftDrawerCollapsed && window.innerWidth > 720 && window.innerWidth < 1100) {
    if (dom.rightInspector && dom.rightInspector.classList.contains('is-open')) {
      state.isRightInspectorCollapsed = true;
      dom.rightInspector.classList.remove('is-open');
      dom.rightInspector.inert = true;
      dom.appLayout.classList.remove('has-right-inspector');
      if (dom.reopenRightBtn) {
        dom.reopenRightBtn.classList.add('is-open');
        dom.reopenRightBtn.inert = false;
      }
    }
  }
  if (dom.leftDrawerWrap) {
    const isMobileSearch = window.innerWidth <= 720 && dom.appLayout.dataset.mobileView === 'search';
    dom.leftDrawerWrap.inert = state.isLeftDrawerCollapsed && !isMobileSearch;
  }
  dom.toggleLeftDrawerBtn.setAttribute('aria-expanded', String(!state.isLeftDrawerCollapsed));
  const title = state.isLeftDrawerCollapsed ? t().toggleDrawerExpand : t().toggleDrawerCollapse;
  dom.toggleLeftDrawerBtn.title = title;
  dom.toggleLeftDrawerBtn.setAttribute('aria-label', title);
}

/**
 * すべてのマップポップオーバー（レイヤー設定・環境設定）を閉じる
 */
export function closeAllPopovers() {
  [
    [dom.layersPopoverBtn, dom.layersPopover],
    [dom.prefsPopoverBtn, dom.prefsPopover]
  ].forEach(([btn, popover]) => {
    if (popover) {
      popover.classList.remove('is-open');
      popover.inert = true;
    }
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 指定ポップオーバーの開閉を切り替える
 */
export function togglePopover(btn, popover) {
  if (!btn || !popover) {
    return;
  }
  const willOpen = !popover.classList.contains('is-open');
  closeAllPopovers();
  if (willOpen) {
    popover.classList.add('is-open');
    popover.inert = false;
    btn.setAttribute('aria-expanded', 'true');
  }
}

/**
 * テーマ（light / dark）を適用し、必要に応じて保存する
 */
export function applyTheme(theme, { persist = false } = {}) {
  const next = theme === 'dark' ? 'dark' : 'light';
  state.theme = next;
  if (next === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  if (persist) {
    state.settings.theme = next;
    saveSettings();
  }
  syncSettingsUI();
}

/**
 * 保存済み設定または OS 設定から初期テーマを決定する
 */
export function initTheme() {
  const saved = state.settings.theme;
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

/**
 * ブラウザの Geolocation API で現在地を取得し、拡大移動する
 */
export function locateCurrentPosition() {
  const dict = t();
  if (!navigator.geolocation) {
    setStatusMessage(dict.locateUnsupported);
    return;
  }
  if (!state.map) {
    return;
  }

  setStatusMessage('');
  if (dom.locateMeBtn) {
    dom.locateMeBtn.classList.add('is-locating');
    dom.locateMeBtn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (dom.locateMeBtn) {
        dom.locateMeBtn.classList.remove('is-locating');
        dom.locateMeBtn.disabled = false;
      }
      const { latitude, longitude, accuracy } = pos.coords;
      const latlng = L.latLng(latitude, longitude);

      if (state.userLocationLayerGroup) {
        state.userLocationLayerGroup.clearLayers();
        if (Number.isFinite(accuracy) && accuracy > 0) {
          L.circle(latlng, {
            radius: accuracy,
            color: '#1a73e8',
            weight: 1,
            opacity: 0.45,
            fillColor: '#1a73e8',
            fillOpacity: 0.12,
            interactive: false
          }).addTo(state.userLocationLayerGroup);
        }
        const dotIcon = L.divIcon({
          className: 'user-location-marker',
          html: '<div class="user-location-dot"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        L.marker(latlng, { icon: dotIcon, interactive: false, pane: 'fieldTripsPane' }).addTo(state.userLocationLayerGroup);
      }

      const targetZoom = Math.max(state.map.getZoom(), 14);
      state.map.flyTo(latlng, targetZoom, { duration: 0.9 });
    },
    (err) => {
      if (dom.locateMeBtn) {
        dom.locateMeBtn.classList.remove('is-locating');
        dom.locateMeBtn.disabled = false;
      }
      if (err && err.code === 1) {
        setStatusMessage(dict.locateDenied);
      } else {
        setStatusMessage(dict.locateFailed);
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

/**
 * Leaflet マップを初期化する
 */
export function initMap({ onMoveEnd, onZoomEnd, onMapClick, onPopupClose } = {}) {
  const canvasRenderer = L.canvas({ padding: 0.8, tolerance: 4 });
  const map = L.map('map', {
    center: CONFIG.INITIAL_CENTER,
    zoom: CONFIG.INITIAL_ZOOM,
    minZoom: CONFIG.MIN_ZOOM,
    maxZoom: CONFIG.MAX_ZOOM,
    zoomControl: false,
    preferCanvas: true,
    renderer: canvasRenderer,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: Math.round(100 / (state.wheelZoomSpeed || 1.0)),
    wheelDebounceTime: 16,
    inertia: true,
    inertiaDeceleration: 2200,
    inertiaMaxSpeed: 2200,
    easeLinearity: 0.2,
    zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true
  });

  state.map = map;
  switchBasemap(state.settings.basemap);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  if (dom.mapBottomRightControls) {
    const BottomRightToolbar = L.Control.extend({
      options: { position: 'bottomright' },
      onAdd: () => {
        L.DomEvent.disableClickPropagation(dom.mapBottomRightControls);
        L.DomEvent.disableScrollPropagation(dom.mapBottomRightControls);
        return dom.mapBottomRightControls;
      }
    });
    new BottomRightToolbar().addTo(map);
  }
  state.scaleControl = L.control.scale({ imperial: false, position: 'bottomleft' });
  if (state.showScaleBar) {
    state.scaleControl.addTo(map);
  }

  state.indexLayerGroup = L.layerGroup();
  if (state.showIndexFrames) {
    state.indexLayerGroup.addTo(map);
  }

  const fieldTripsPane = map.createPane('fieldTripsPane');
  fieldTripsPane.style.zIndex = '650';
  state.fieldTripsLayerGroup = L.layerGroup();
  if (state.showFieldTrips) {
    state.fieldTripsLayerGroup.addTo(map);
  }

  state.userLocationLayerGroup = L.layerGroup().addTo(map);

  map.on('moveend', () => {
    schedulePermalinkSync();
    if (typeof onMoveEnd === 'function') {
      onMoveEnd();
    }
  });

  map.on('zoomend', () => {
    if (typeof onZoomEnd === 'function') {
      onZoomEnd();
    }
  });

  map.on('click', (event) => {
    if (typeof onMapClick === 'function') {
      onMapClick(event);
    }
  });

  map.on('popupclose', (event) => {
    if (typeof onPopupClose === 'function') {
      onPopupClose(event);
    }
  });

  return map;
}
```

### `js/normalize.js`（全 369 行）

```javascript
import { CONFIG, PROVIDER_EN_MAP, REGION_EN_MAP } from './config.js';
import { t } from './i18n.js';
import { state } from './state.js';

/**
 * URLが安全なスキーム（http/https）であるか検証する
 */
export function isSafeUrl(url) {
  if (typeof url !== 'string' || !url.trim()) {
    return false;
  }
  try {
    const parsed = new URL(url, window.location.href);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * 共通スキーマ（source/map/display/documents）および従来スキーマの両方を統一フォーマットに正規化する
 */
export function normalizeProperties(props = {}) {
  const src = props.source || {};
  const m = props.map || props;
  const disp = props.display || {};
  const docs = props.documents || {};

  const providerId = src.provider_id || 'gsj_50k';
  const providerNameJa = src.provider_name_ja || '';

  const mapNameJa = m.map_name_ja || m.map_name || m.map_name_en || '名称不明';
  const mapNameEn = m.map_name_en || m.map_name_ja || m.map_name || 'Untitled';
  const authorsJaList = Array.isArray(m.authors_ja)
    ? m.authors_ja.map((a) => String(a).trim()).filter(Boolean)
    : (Array.isArray(m.authors)
      ? m.authors.map((a) => String(a).trim()).filter(Boolean)
      : (typeof m.authors === 'string' && m.authors.trim()
        ? m.authors.split(/[・,、]/).map((a) => a.trim()).filter(Boolean)
        : []));
  const authorsEnList = Array.isArray(m.authors_en)
    ? m.authors_en.map((a) => String(a).trim()).filter(Boolean)
    : [];

  const authorsJa = authorsJaList.join('・');
  const authorsEn = authorsEnList.join(', ');

  const prefectures = Array.isArray(m.prefectures) && m.prefectures.length > 0
    ? m.prefectures.join('・')
    : (m.region || '');
  const regionList = Array.isArray(m.prefectures) && m.prefectures.length > 0
    ? m.prefectures.map((r) => String(r).trim()).filter(Boolean)
    : (typeof m.region === 'string' && m.region.trim()
      ? m.region.split(/[・,、]/).map((r) => r.trim()).filter(Boolean)
      : []);

  const tile = props.tile || {};
  const xyzUrl = disp.tile_type === 'xyz'
    ? (disp.tile_url || '')
    : (tile.webp_template || tile.png_template || tile.xyz_template || '');
  const canUseXyz = (disp.tile_type === 'xyz' || props.is_tile_available !== false) && isSafeUrl(xyzUrl);

  const wmsUrl = disp.tile_type === 'wms' ? (disp.wms_url || '') : (props.wms_url || '');
  const wmsLayers = disp.wms_layers || CONFIG.WMS_OPTIONS.layers;
  const canUseWms = !canUseXyz && (disp.tile_type === 'wms' || props.is_wms_available !== false) && isSafeUrl(wmsUrl);

  const rasterImageUrl = [disp.raster_image_url, docs.original_image_url, props.original_image_url].find((u) => isSafeUrl(u)) || '';
  const canUseRaster = !canUseXyz && !canUseWms && disp.tile_type === 'raster' && Boolean(rasterImageUrl);

  const overlayType = canUseXyz ? 'xyz' : (canUseWms ? 'wms' : (canUseRaster ? 'raster' : null));
  const overlayUrl = canUseXyz ? xyzUrl : (canUseWms ? wmsUrl : (canUseRaster ? rasterImageUrl : ''));

  const zoom = m.zoom || {};
  const zoomMin = typeof zoom.min === 'number'
    ? zoom.min
    : (typeof tile.min_zoom === 'number' ? tile.min_zoom : CONFIG.MIN_ZOOM);
  const zoomMax = typeof zoom.max === 'number'
    ? zoom.max
    : (typeof tile.max_zoom === 'number' ? tile.max_zoom : CONFIG.MAX_ZOOM);

  const rawBounds = Array.isArray(m.bounds) && m.bounds.length === 4
    ? m.bounds
    : (Array.isArray(tile.bounds) && tile.bounds.length === 4 ? tile.bounds : null);

  const attribution = src.attribution || props.license?.attribution || CONFIG.GSJ_ATTRIBUTION;
  const downloads = props.downloads || {};
  const downloadEntries = Object.entries(downloads).filter(([, url]) => isSafeUrl(url));
  const lightPdfEntry = downloadEntries.find(([key, url]) =>
    /light|軽量|low/i.test(key) || /_D-L\.pdf(?:$|\?)|_(?:l|light|low)\.pdf(?:$|\?)/i.test(url)
  );
  const normalPdfEntry = downloadEntries.find(([key, url]) =>
    /^pdf$/i.test(key) || (/\.pdf(?:$|\?)/i.test(url) && !/_D-L\.pdf(?:$|\?)|_(?:l|light|low)\.pdf(?:$|\?)/i.test(url))
  );

  const desc = props.description || {};
  const lightPdfUrl = [docs.light_pdf_url, desc.light_pdf_url, lightPdfEntry?.[1], downloads.pdf_light].find((u) => isSafeUrl(u)) || '';
  const fullPdfUrl = [docs.full_pdf_url, desc.full_pdf_url, downloads.pdf, downloads.PDF, normalPdfEntry?.[1]].find((u) => isSafeUrl(u)) || '';
  const preferredPdf = [docs.preferred_pdf, desc.preferred_pdf, lightPdfUrl, fullPdfUrl].find((u) => isSafeUrl(u)) || '';

  const mapCode = m.map_code || m.layer_name || '';
  const scaleDenominator = typeof m.scale_denominator === 'number' ? m.scale_denominator : null;
  const scaleMatch = String(m.series_en || m.series_ja || m.series || mapNameEn || mapNameJa).match(/1\s*:\s*[\d,]+/);
  let scale = m.scale || (scaleDenominator ? `1:${scaleDenominator.toLocaleString('en-US')}` : (scaleMatch ? scaleMatch[0].replace(/\s+/g, '') : ''));
  if (!scale) {
    if (/^G50/i.test(mapCode) || /5万分の1/.test(mapNameJa)) scale = '1:50,000';
    else if (/^G200/i.test(mapCode) || /20万分の1/.test(mapNameJa)) scale = '1:200,000';
    else if (/^G75/i.test(mapCode) || /7\.5万分の1/.test(mapNameJa)) scale = '1:75,000';
    else if (/^G500/i.test(mapCode) || /50万分の1/.test(mapNameJa)) scale = '1:500,000';
    else if (/^G1000/i.test(mapCode) || /100万分の1/.test(mapNameJa)) scale = '1:1,000,000';
    else scale = m.series_ja || m.series_en || m.series || '';
  }
  const mapId = m.map_id ?? null;
  const localId = m.local_id ?? mapId;
  const fallbackMetadataUrl = (localId != null && /^\d+$/.test(String(localId)))
    ? `https://gbank.gsj.jp/ld/resource/publication/map/g050/map${String(localId).padStart(5, '0')}.html`
    : '';
  const detailUrl = [
    props.related_resources?.metadata_url,
    props.metadata_url,
    fallbackMetadataUrl,
    props.related_resources?.publication_uri,
    props.related_resources?.catalog_url
  ].find((url) => isSafeUrl(url)) || '';

  const mapType = m.map_type || 'geological_map_sheet';
  const theme = m.theme || 'geology';
  const geometryModel = m.geometry_model || 'map_sheet';
  const volcanoNameJa = m.volcano_name_ja || '';
  const volcanoNameEn = m.volcano_name_en || '';

  const legendImageUrl = [docs.legend_image_url, props.legend_image_url].find((u) => isSafeUrl(u)) || '';
  const originalImageUrl = [docs.original_image_url, props.original_image_url, disp.raster_image_url].find((u) => isSafeUrl(u)) || '';
  const rawSections = Array.isArray(docs.section_images)
    ? docs.section_images
    : (Array.isArray(props.section_images) ? props.section_images : []);
  const sectionImages = rawSections
    .filter((s) => s && isSafeUrl(s.url))
    .map((s, idx) => ({ label: s.label || `Section ${idx + 1}`, url: s.url }));

  const searchTokensJa = [mapNameJa, volcanoNameJa, authorsJa, mapCode, prefectures, scale, providerNameJa].join(' ').toLowerCase();
  const searchTokensEn = [mapNameEn, volcanoNameEn, authorsEn, mapCode, prefectures, scale, providerNameJa].join(' ').toLowerCase();

  return {
    providerId,
    providerNameJa,
    mapId,
    localId,
    mapCode,
    mapType,
    theme,
    geometryModel,
    volcanoNameJa,
    volcanoNameEn,
    scaleDenominator: scaleDenominator || (scale === '1:50,000' ? 50000 : (scale === '1:200,000' ? 200000 : null)),
    scale,
    mapNameJa,
    mapNameEn,
    authorsJa,
    authorsEn,
    authorsJaList,
    authorsEnList,
    publishedYear: m.published_year ?? null,
    publisherJa: m.publisher_ja || m.publisher || m.publisher_en || '',
    publisherEn: m.publisher_en || m.publisher || m.publisher_ja || '',
    prefectures,
    regionList,
    bounds: rawBounds,
    zoomMin,
    zoomMax,
    overlayType,
    overlayUrl,
    wmsLayers,
    rasterImageUrl,
    defaultOpacity: typeof disp.opacity === 'number' ? disp.opacity : CONFIG.DEFAULT_OVERLAY_OPACITY,
    attribution,
    legendImageUrl,
    originalImageUrl,
    sectionImages,
    detailUrl,
    viewerUrl: isSafeUrl(props.related_resources?.viewer_url) ? props.related_resources.viewer_url : '',
    catalogUrl: isSafeUrl(props.related_resources?.catalog_url) ? props.related_resources.catalog_url : '',
    lightPdfUrl,
    fullPdfUrl,
    preferredPdf,
    pdfUrl: preferredPdf,
    searchTokensJa,
    searchTokensEn
  };
}

/**
 * 地図種別と縮尺分母に応じた図郭ポリゴンのデフォルトスタイルを返す
 */
export function styleByScale(scaleDenominator, mapType = 'geological_map_sheet') {
  if (mapType === 'volcanic_geological_map') {
    return { ...CONFIG.POLYGON_STYLE.default, color: '#d93025', fillColor: '#d93025' };
  }
  if (mapType === 'seamless_geological_map' || scaleDenominator === 200000) {
    return { ...CONFIG.POLYGON_STYLE.default, color: '#00796b', fillColor: '#00796b' };
  }
  if (scaleDenominator && scaleDenominator !== 50000) {
    return { ...CONFIG.POLYGON_STYLE.default, color: '#5e35b1', fillColor: '#5e35b1' };
  }
  return CONFIG.POLYGON_STYLE.default;
}

/**
 * 検索用の文字列正規化（NFKC正規化・小文字化・カタカナ→ひらがな統一）
 */
export function normalizeSearchText(text) {
  if (!text) {
    return '';
  }
  return String(text)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

/**
 * 縮尺を短縮表記（例: 1/5万 / 英語: 1:50k）へ変換する
 */
export function formatScaleAbbrev(scaleDenominator, scale, isEn = false) {
  let denom = Number(scaleDenominator);
  if (!(denom > 0) && scale && /^1:\d/.test(scale)) {
    denom = Number(scale.replace(/^1:/, '').replace(/,/g, ''));
  }
  if (!(denom > 0)) {
    return '';
  }
  if (isEn) {
    if (denom >= 1000000) {
      const m = denom / 1000000;
      return `1:${Number.isInteger(m) ? m : m.toFixed(1)}M`;
    }
    if (denom >= 1000) {
      const k = denom / 1000;
      return `1:${Number.isInteger(k) ? k : k.toFixed(1)}k`;
    }
    return `1:${denom}`;
  }
  if (denom >= 10000) {
    const man = denom / 10000;
    return `1/${Number.isInteger(man) ? man : man.toFixed(1)}万`;
  }
  return `1/${denom.toLocaleString('en-US')}`;
}

/**
 * シリーズ接頭辞や「図幅」「地域の地質」を除いた中核地名を抽出する
 */
export function extractCoreMapName(rawTitle) {
  if (!rawTitle) {
    return '';
  }
  const bracketMatch = rawTitle.match(/「([^」]+)」/);
  if (bracketMatch) {
    return bracketMatch[1].trim();
  }
  return rawTitle
    .replace(/^(?:[\d.]+万分の1地質図幅|地域地質研究報告|火山地質図)\s*/, '')
    .replace(/(?:地域の地質|図幅).*$/, '')
    .trim() || rawTitle;
}

/**
 * サジェスト等で使うコンパクトな図幅名（例: 槍ヶ岳 (1/5万)）を生成する
 */
export function formatShortMapTitle(rawTitle, scaleDenominator, scale, mapType, isEn = false) {
  const core = extractCoreMapName(rawTitle);
  const scaleTag = formatScaleAbbrev(scaleDenominator, scale, isEn);
  if (mapType === 'volcanic_geological_map') {
    const cleanVolcano = core.replace(/火山地質図.*$/, '').trim() || core;
    return scaleTag ? `${cleanVolcano} (${scaleTag})` : cleanVolcano;
  }
  return scaleTag ? `${core} (${scaleTag})` : core;
}

/**
 * 現在の表示言語に応じたメタデータ表示用フィールドを返す
 */
export function getLocalizedMeta(meta) {
  const isEn = state.lang === 'en';
  const rawTitle = isEn ? meta.mapNameEn : meta.mapNameJa;
  const title = rawTitle;
  const subtitle = isEn
    ? (meta.mapNameJa !== meta.mapNameEn ? meta.mapNameJa : '')
    : (meta.mapNameEn && meta.mapNameEn !== meta.mapNameJa ? meta.mapNameEn : '');
  const coreTitle = extractCoreMapName(rawTitle);
  const shortTitle = formatShortMapTitle(rawTitle, meta.scaleDenominator, meta.scale, meta.mapType, isEn);
  const authors = isEn
    ? (meta.authorsEn || meta.authorsJa || t().unknownAuthor)
    : (meta.authorsJa || meta.authorsEn || t().unknownAuthor);
  const authorList = isEn
    ? (meta.authorsEnList.length > 0 ? meta.authorsEnList : meta.authorsJaList)
    : (meta.authorsJaList.length > 0 ? meta.authorsJaList : meta.authorsEnList);
  const publisher = isEn
    ? (meta.publisherEn || meta.publisherJa || '')
    : (meta.publisherJa || meta.publisherEn || '');
  const regionList = isEn
    ? meta.regionList.map((r) => REGION_EN_MAP[r] || r)
    : meta.regionList;
  const region = isEn
    ? regionList.join(', ')
    : (meta.prefectures || meta.regionList.join('・'));
  const providerName = isEn
    ? (PROVIDER_EN_MAP[meta.providerNameJa] || meta.providerNameJa)
    : meta.providerNameJa;
  const searchTokens = normalizeSearchText(
    `${meta.searchTokensJa} ${meta.searchTokensEn} ${regionList.join(' ')} ${providerName} ${coreTitle}`
  );

  return {
    title,
    subtitle,
    coreTitle,
    shortTitle,
    authors,
    authorList,
    publisher,
    region,
    regionList,
    providerName,
    searchTokens
  };
}

/**
 * ホバーツールチップ文字列を構築する
 */
export function buildTooltipText(meta) {
  const loc = getLocalizedMeta(meta);
  const year = meta.publishedYear != null ? ` (${meta.publishedYear}${t().yearSuffix})` : '';
  return `${loc.title}${year}`;
}

/**
 * アイテムの Leaflet LatLngBounds を取得する
 */
export function getItemBounds(item) {
  if (!item) {
    return null;
  }
  if (item.layer && typeof item.layer.getBounds === 'function') {
    return item.layer.getBounds();
  }
  if (Array.isArray(item.meta?.bounds) && item.meta.bounds.length === 4) {
    const [w, s, e, n] = item.meta.bounds;
    return L.latLngBounds([s, w], [n, e]);
  }
  return null;
}

/**
 * 2つの LatLngBounds の交差面積（度^2）を計算する
 */
export function computeIntersectionArea(boundsA, boundsB) {
  if (!boundsA || !boundsB || !boundsA.intersects(boundsB)) {
    return 0;
  }
  const west = Math.max(boundsA.getWest(), boundsB.getWest());
  const east = Math.min(boundsA.getEast(), boundsB.getEast());
  const south = Math.max(boundsA.getSouth(), boundsB.getSouth());
  const north = Math.min(boundsA.getNorth(), boundsB.getNorth());
  if (east <= west || north <= south) {
    return 0;
  }
  return (east - west) * (north - south);
}
```

### `js/permalink.js`（全 129 行）

```javascript
import { CONFIG } from './config.js';
import { state } from './state.js';

let permalinkSyncTimer = null;

/**
 * URL ハッシュ（#lat=...&lng=...&z=...&maps=...&seamless=1&trip=...）を安全にパースする
 */
export function parsePermalinkHash(hashStr = window.location.hash) {
  const raw = (hashStr || '').replace(/^#/, '').trim();
  if (!raw) {
    return null;
  }
  const params = new URLSearchParams(raw);
  const result = {
    hasView: false,
    lat: null,
    lng: null,
    z: null,
    maps: [],
    seamless: false,
    trip: ''
  };

  const lat = Number(params.get('lat'));
  const lng = Number(params.get('lng'));
  const z = Number(params.get('z'));
  if (
    params.has('lat') &&
    params.has('lng') &&
    params.has('z') &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Number.isFinite(z) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    z >= CONFIG.MIN_ZOOM &&
    z <= CONFIG.MAX_ZOOM
  ) {
    result.hasView = true;
    result.lat = lat;
    result.lng = lng;
    result.z = z;
  }

  const mapsRaw = params.get('maps');
  if (mapsRaw) {
    result.maps = mapsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, CONFIG.MAX_OVERLAYS);
  }

  const seamlessRaw = params.get('seamless');
  result.seamless = seamlessRaw === '1' || seamlessRaw === 'true';

  const tripRaw = params.get('trip');
  if (tripRaw && tripRaw.trim()) {
    result.trip = tripRaw.trim();
  }

  const hasAny = result.hasView || result.maps.length > 0 || result.seamless || Boolean(result.trip);
  return hasAny ? result : null;
}

/**
 * 現在の地図・オーバーレイ・シームレス・展開中巡検コースを URL ハッシュへ反映する
 */
export function syncPermalinkNow() {
  if (permalinkSyncTimer) {
    clearTimeout(permalinkSyncTimer);
    permalinkSyncTimer = null;
  }
  if (!state.map) {
    return;
  }

  const params = new URLSearchParams();
  const center = state.map.getCenter();
  const zoom = state.map.getZoom();
  if (center && Number.isFinite(center.lat) && Number.isFinite(center.lng) && Number.isFinite(zoom)) {
    params.set('lat', center.lat.toFixed(4));
    params.set('lng', center.lng.toFixed(4));
    params.set('z', String(Math.round(zoom * 100) / 100));
  }

  const mapIds = state.activeOverlays
    .map((entry) => entry?.item?.meta?.mapId)
    .filter(Boolean);
  if (mapIds.length > 0) {
    params.set('maps', mapIds.join(','));
  }

  if (state.seamlessLayer) {
    params.set('seamless', '1');
  }

  if (state.expandedFieldTripCourses.size > 0) {
    const firstCourse = Array.from(state.expandedFieldTripCourses)[0];
    if (firstCourse) {
      params.set('trip', firstCourse);
    }
  }

  const nextHash = `#${params.toString()}`;
  if (window.location.hash !== nextHash) {
    try {
      history.replaceState(null, '', nextHash);
    } catch {
      // ignore history errors
    }
  }
}

/**
 * URL ハッシュ同期をデバウンス付きでスケジュールする
 */
export function schedulePermalinkSync() {
  if (permalinkSyncTimer) {
    clearTimeout(permalinkSyncTimer);
  }
  permalinkSyncTimer = setTimeout(() => {
    permalinkSyncTimer = null;
    syncPermalinkNow();
  }, 250);
}
```

### `js/seamless.js`（全 239 行）

```javascript
import { CONFIG } from './config.js';
import { t } from './i18n.js';
import {
  buildSeamlessGeologyNode,
  createGeologicalLayer,
  getFallbackInspectorItem,
  renderActiveOverlayList,
  renderInspectorDetail,
  renderSeamlessPointCard
} from './inspector.js';
import { setStatusMessage, syncSettingsUI } from './map.js';
import { normalizeProperties } from './normalize.js';
import { schedulePermalinkSync } from './permalink.js';
import { debouncedSaveSettings, saveSettings, state, dom } from './state.js';

/**
 * シームレス地質図の地点マーカー・ポップアップ・進行中リクエストを片付ける
 */
export function clearSeamlessPointUI() {
  if (state.seamlessAbortController) {
    state.seamlessAbortController.abort();
    state.seamlessAbortController = null;
  }
  if (state.map && state.seamlessPopup) {
    state.map.closePopup(state.seamlessPopup);
    state.seamlessPopup = null;
  }
  if (state.map && state.seamlessPointMarker) {
    state.map.removeLayer(state.seamlessPointMarker);
    state.seamlessPointMarker = null;
  }
  state.lastSeamlessPoint = null;
  renderSeamlessPointCard();
}

/**
 * 20万分の1シームレス地質図 V2 API で指定座標の地質情報を照会し、ポップアップ＋右インスペクタに反映する
 */
export async function querySeamlessPointGeology(latlng) {
  if (!state.map || !state.seamlessLayer || !latlng) {
    return;
  }
  const lat = Number(latlng.lat);
  const lng = Number(latlng.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return;
  }

  if (state.seamlessAbortController) {
    state.seamlessAbortController.abort();
    state.seamlessAbortController = null;
  }

  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;

  if (!state.seamlessPointMarker) {
    state.seamlessPointMarker = L.circleMarker([lat, lng], {
      radius: 7,
      color: '#ffffff',
      weight: 2.5,
      fillColor: '#00796b',
      fillOpacity: 1,
      interactive: false
    }).addTo(state.map);
  } else {
    state.seamlessPointMarker.setLatLng([lat, lng]);
  }

  if (!state.seamlessPopup) {
    state.seamlessPopup = L.popup({
      className: 'seamless-leaflet-popup',
      maxWidth: 280,
      autoPanPadding: [24, 24]
    });
  }

  const showResult = (record) => {
    state.lastSeamlessPoint = record;
    if (state.seamlessPopup && state.map) {
      state.seamlessPopup
        .setLatLng([lat, lng])
        .setContent(buildSeamlessGeologyNode(record))
        .openOn(state.map);
    }
    renderSeamlessPointCard();
  };

  if (state.seamlessPointCache.has(cacheKey)) {
    showResult({ status: 'ok', lat, lng, data: state.seamlessPointCache.get(cacheKey) });
    return;
  }

  showResult({ status: 'loading', lat, lng, data: null });

  const controller = new AbortController();
  state.seamlessAbortController = controller;

  try {
    const url = `${CONFIG.SEAMLESS_LEGEND_API_URL}?point=${lat.toFixed(6)},${lng.toFixed(6)}`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const text = await response.text();
    const data = text.trim() ? JSON.parse(text) : {};
    if (state.seamlessPointCache.size >= 200) {
      const oldestKey = state.seamlessPointCache.keys().next().value;
      state.seamlessPointCache.delete(oldestKey);
    }
    state.seamlessPointCache.set(cacheKey, data);
    if (state.seamlessAbortController === controller) {
      state.seamlessAbortController = null;
      showResult({ status: 'ok', lat, lng, data });
    }
  } catch (error) {
    if (error && error.name === 'AbortError') {
      return;
    }
    console.warn('Seamless V2 legend query failed:', error);
    if (state.seamlessAbortController === controller) {
      state.seamlessAbortController = null;
      showResult({ status: 'error', lat, lng, data: null });
    }
  }
}

/**
 * 20万分の1日本シームレス地質図 V2 の表示/非表示を切り替える
 */
export function toggleSeamless200k() {
  const enabled = dom.seamless200kToggle.checked;
  state.settings.seamless200k = enabled;
  saveSettings();
  syncSettingsUI();

  if (!state.map) {
    return;
  }

  if (!enabled) {
    clearSeamlessPointUI();
    if (state.seamlessLayer) {
      if (typeof state.seamlessLayer.off === 'function') {
        state.seamlessLayer.off();
      }
      state.map.removeLayer(state.seamlessLayer);
      state.seamlessLayer = null;
    }
    if (state.inspectedItem === state.seamlessVirtualItem) {
      state.inspectedItem = getFallbackInspectorItem();
    }
    renderInspectorDetail(state.inspectedItem);
    schedulePermalinkSync();
    return;
  }

  if (!state.seamlessMeta) {
    dom.seamless200kToggle.checked = false;
    state.settings.seamless200k = false;
    saveSettings();
    syncSettingsUI();
    setStatusMessage(t().seamlessMissingMessage);
    return;
  }

  if (!state.seamlessLayer) {
    state.seamlessLayer = createGeologicalLayer(state.seamlessMeta, null, 200, state.seamlessOpacity);
    if (state.seamlessLayer) {
      let seamlessLoadedCount = 0;
      let seamlessErrorCount = 0;
      state.seamlessLayer.on('loading', () => {
        seamlessLoadedCount = 0;
        seamlessErrorCount = 0;
      });
      state.seamlessLayer.on('tileload', () => {
        seamlessLoadedCount += 1;
      });
      state.seamlessLayer.on('tileerror', () => {
        seamlessErrorCount += 1;
      });
      state.seamlessLayer.on('load', () => {
        if (seamlessLoadedCount === 0 && seamlessErrorCount > 0) {
          console.warn('Seamless V2 tile load failed:', state.seamlessMeta.overlayUrl);
          setStatusMessage(t().seamlessTileErrorMessage);
        }
      });
      state.seamlessLayer.addTo(state.map);
    }
  }
  if (!state.inspectedItem && state.seamlessVirtualItem) {
    // オーバーレイが0件のときは自動で全高パネルを開かず、再展開タブから開ける状態にする
    if (state.activeOverlays.length === 0) {
      state.isRightInspectorCollapsed = true;
    }
    renderInspectorDetail(state.seamlessVirtualItem);
    renderActiveOverlayList();
  }
  schedulePermalinkSync();
}

/**
 * シームレス地質図V2の透過度スライダー操作を反映する
 */
export function handleSeamlessOpacityChange() {
  const pct = Number(dom.seamlessOpacitySlider.value);
  const opacity = Math.min(1, Math.max(0, pct / 100));
  state.seamlessOpacity = opacity;
  state.settings.seamlessOpacity = opacity;
  if (dom.seamlessOpacityValue) {
    dom.seamlessOpacityValue.textContent = `${pct}%`;
  }
  if (state.seamlessLayer && typeof state.seamlessLayer.setOpacity === 'function') {
    state.seamlessLayer.setOpacity(opacity);
  }
  debouncedSaveSettings();
}

/**
 * 20万分の1シームレス地質図プロバイダ設定を読み込む
 */
export async function loadSeamlessProvider({ forceEnable = false } = {}) {
  try {
    const response = await fetch(CONFIG.SEAMLESS_PROVIDER_URL, { cache: 'no-cache' });
    if (!response.ok) {
      return;
    }
    const records = await response.json();
    if (Array.isArray(records) && records.length > 0) {
      state.seamlessMeta = normalizeProperties(records[0]);
      state.seamlessVirtualItem = { layer: null, meta: state.seamlessMeta };
      if ((forceEnable || state.settings.seamless200k) && dom.seamless200kToggle) {
        dom.seamless200kToggle.checked = true;
        toggleSeamless200k();
      }
    }
  } catch {
    // ignore optional seamless config failure
  }
}
```

### `js/search.js`（全 934 行）

```javascript
import { CONFIG } from './config.js';
import { el } from './dom.js';
import { focusFieldTripSpot } from './fieldTrips.js';
import { t } from './i18n.js';
import { addOverlayForItem, isItemOverlayed, zoomToMapItem } from './inspector.js';
import { fitAllVisibleItems, setLeftDrawerCollapsed, syncSettingsUI, updateResultCount } from './map.js';
import {
  buildTooltipText,
  computeIntersectionArea,
  extractCoreMapName,
  getItemBounds,
  getLocalizedMeta,
  normalizeProperties,
  normalizeSearchText,
  styleByScale
} from './normalize.js';
import { querySeamlessPointGeology } from './seamless.js';
import { dom, saveSettings, state } from './state.js';

let yearFilterTimer = null;

/**
 * 絞り込み結果リストを描画する
 */
export function renderResultList() {
  const dict = t();
  dom.resultList.innerHTML = '';

  if (state.hoveredListItem) {
    const prev = state.hoveredListItem;
    state.hoveredListItem = null;
    if (!isItemOverlayed(prev) && prev.layer) {
      prev.layer.setStyle(styleByScale(prev.meta.scaleDenominator, prev.meta.mapType));
    }
  }

  const fragment = document.createDocumentFragment();
  const displayItems = state.filteredItems.slice(0, CONFIG.MAX_LIST_ITEMS);

  displayItems.forEach((item) => {
    const { meta } = item;
    const loc = item.cachedLoc || getLocalizedMeta(meta);
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    const isSelected = isItemOverlayed(item);
    button.className = 'result-list-item';
    if (isSelected) {
      button.classList.add('is-selected');
    }
    button.setAttribute('aria-pressed', String(isSelected));

    const mainSpan = document.createElement('span');
    mainSpan.className = 'result-item-main';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'result-item-name';
    nameSpan.textContent = loc.title;

    const authorSpan = document.createElement('span');
    authorSpan.className = 'result-item-author';
    authorSpan.textContent = loc.authors;

    mainSpan.append(nameSpan, authorSpan);

    const yearSpan = document.createElement('span');
    yearSpan.className = 'result-item-year';
    yearSpan.textContent = meta.publishedYear != null ? `${meta.publishedYear}` : '';

    button.append(mainSpan, yearSpan);
    const highlightItem = () => {
      if (state.hoveredListItem && state.hoveredListItem !== item && !isItemOverlayed(state.hoveredListItem) && state.hoveredListItem.layer) {
        state.hoveredListItem.layer.setStyle(styleByScale(state.hoveredListItem.meta.scaleDenominator, state.hoveredListItem.meta.mapType));
      }
      state.hoveredListItem = item;
      if (!isItemOverlayed(item) && state.showIndexFrames) {
        item.layer.setStyle(CONFIG.POLYGON_STYLE.hover);
      }
    };
    const unhighlightItem = () => {
      if (state.hoveredListItem === item) {
        state.hoveredListItem = null;
      }
      if (!isItemOverlayed(item) && state.showIndexFrames) {
        item.layer.setStyle(styleByScale(item.meta.scaleDenominator, item.meta.mapType));
      }
    };

    button.addEventListener('mouseenter', highlightItem);
    button.addEventListener('mouseleave', unhighlightItem);
    button.addEventListener('focus', highlightItem);
    button.addEventListener('blur', unhighlightItem);
    button.addEventListener('click', () => {
      addOverlayForItem(item);
      zoomToMapItem(item);
    });

    li.appendChild(button);
    fragment.appendChild(li);
  });

  if (state.filteredItems.length > CONFIG.MAX_LIST_ITEMS) {
    const noteLi = document.createElement('li');
    noteLi.className = 'result-list-note';
    noteLi.textContent = dict.moreItems(state.filteredItems.length - CONFIG.MAX_LIST_ITEMS);
    fragment.appendChild(noteLi);
  } else if (state.filteredItems.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'result-list-note';
    emptyLi.textContent = dict.noMatch;
    fragment.appendChild(emptyLi);
  }

  dom.resultList.appendChild(fragment);
}

/**
 * 適用中の詳細フィルター件数バッジを更新する
 */
export function updateActiveFilterBadge() {
  const { minBound, maxBound, currentMin, currentMax } = state.yearRange;
  let count = 0;
  if (currentMin > minBound || currentMax < maxBound) {
    count += 1;
  }
  count += state.selectedScales.size;
  count += state.selectedResourceFlags.size;

  dom.activeFilterBadge.textContent = String(count);
  dom.activeFilterBadge.hidden = count === 0;
}

/**
 * 検索文字列・地図範囲・発行年・縮尺・資料有無に基づき即時フィルタリングする
 */
export function applyFilters() {
  const queryTokens = normalizeSearchText(dom.searchInput.value.trim()).split(/\s+/).filter(Boolean);
  const { minBound, maxBound, currentMin, currentMax } = state.yearRange;
  const hasMapTypeFilter = state.selectedMapType !== 'all';
  const hasYearFilter = currentMin > minBound || currentMax < maxBound;
  const hasScaleFilter = state.selectedScales.size > 0;
  const hasFlagFilter = state.selectedResourceFlags.size > 0;
  const viewBounds = state.viewportOnly && state.map ? state.map.getBounds() : null;
  const nextFiltered = [];

  state.allItems.forEach((item) => {
    const { layer, meta } = item;
    const loc = item.cachedLoc || getLocalizedMeta(meta);
    const year = Number(meta.publishedYear);
    const hasValidYear = meta.publishedYear !== null && !Number.isNaN(year);

    const matchesMapType = !hasMapTypeFilter || meta.mapType === state.selectedMapType;
    const matchesText = queryTokens.length === 0 || queryTokens.every((tok) => loc.searchTokens.includes(tok));
    const matchesYear = !hasYearFilter || (hasValidYear && year >= currentMin && year <= currentMax);
    const matchesScale = !hasScaleFilter || state.selectedScales.has(meta.scale);
    const matchesViewport = !viewBounds || computeIntersectionArea(viewBounds, getItemBounds(item)) > 0;

    let matchesFlags = true;
    if (hasFlagFilter) {
      if (state.selectedResourceFlags.has('pdf') && !meta.pdfUrl) {
        matchesFlags = false;
      }
      if (state.selectedResourceFlags.has('legend') && !meta.legendImageUrl) {
        matchesFlags = false;
      }
      if (state.selectedResourceFlags.has('original') && !meta.originalImageUrl) {
        matchesFlags = false;
      }
    }

    const isVisible =
      matchesMapType &&
      matchesText &&
      matchesYear &&
      matchesScale &&
      matchesFlags &&
      matchesViewport;

    if (isVisible) {
      if (!state.indexLayerGroup.hasLayer(layer)) {
        state.indexLayerGroup.addLayer(layer);
      }
      nextFiltered.push(item);
    } else if (state.indexLayerGroup.hasLayer(layer)) {
      state.indexLayerGroup.removeLayer(layer);
    }
  });

  state.filteredItems = nextFiltered;
  if (dom.fitAllBtn) {
    dom.fitAllBtn.disabled = nextFiltered.length === 0;
  }
  if (dom.drawerFilterDot) {
    const hasNarrowing =
      queryTokens.length > 0 ||
      state.viewportOnly ||
      hasYearFilter ||
      hasScaleFilter ||
      hasFlagFilter ||
      (state.selectedMapType !== 'all' && state.selectedMapType !== 'geological_map_sheet');
    dom.drawerFilterDot.hidden = !hasNarrowing;
  }
  updateActiveFilterBadge();
  updateResultCount(nextFiltered.length, state.allItems.length);
  renderResultList();
}

export function renderScaleChips() {
  dom.scaleChips.innerHTML = '';
  const scalesSet = new Set();
  state.allItems.forEach(({ meta }) => {
    if (meta.scale) {
      scalesSet.add(meta.scale);
    }
  });

  const sortedScales = [...scalesSet].sort((a, b) => {
    const numA = parseInt(a.replace(/[^\d]/g, ''), 10) || Number.MAX_SAFE_INTEGER;
    const numB = parseInt(b.replace(/[^\d]/g, ''), 10) || Number.MAX_SAFE_INTEGER;
    return numA - numB || a.localeCompare(b, state.lang);
  });

  const fragment = document.createDocumentFragment();
  sortedScales.forEach((scale) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isSelected = state.selectedScales.has(scale);
    btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
    btn.textContent = scale;
    btn.setAttribute('aria-pressed', String(isSelected));

    btn.addEventListener('click', () => {
      if (state.selectedScales.has(scale)) {
        state.selectedScales.delete(scale);
        btn.classList.remove('is-selected');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        state.selectedScales.add(scale);
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');
      }
      applyFilters();
    });

    fragment.appendChild(btn);
  });

  dom.scaleChips.appendChild(fragment);
}

export function renderMapTypeChips() {
  const dict = t();
  dom.mapTypeChips.innerHTML = '';

  const typesSet = new Set();
  state.allItems.forEach(({ meta }) => {
    if (meta.mapType) {
      typesSet.add(meta.mapType);
    }
  });

  const entries = [
    ['all', dict.mapTypeAll],
    ...[...typesSet].map((typeKey) => [typeKey, dict.mapTypes[typeKey] || typeKey])
  ];

  if (state.selectedMapType !== 'all' && !typesSet.has(state.selectedMapType)) {
    state.selectedMapType = 'all';
  }

  const fragment = document.createDocumentFragment();
  entries.forEach(([typeKey, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isSelected = state.selectedMapType === typeKey;
    btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
    btn.textContent = label;
    btn.dataset.mapType = typeKey;
    btn.setAttribute('aria-pressed', String(isSelected));

    btn.addEventListener('click', () => {
      const changed = state.selectedMapType !== typeKey;
      if (changed) {
        state.selectedMapType = typeKey;
        state.selectedScales.clear();
        renderScaleChips();
      }
      dom.mapTypeChips.querySelectorAll('.decade-chip').forEach((c) => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
      applyFilters();
    });

    fragment.appendChild(btn);
  });

  dom.mapTypeChips.appendChild(fragment);
}

export function renderOtherChips() {
  const dict = t();
  dom.otherChips.innerHTML = '';

  const flagDefs = [
    ['pdf', dict.flagPdf],
    ['legend', dict.flagLegend],
    ['original', dict.flagOriginal]
  ];

  const fragment = document.createDocumentFragment();
  flagDefs.forEach(([flagKey, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isSelected = state.selectedResourceFlags.has(flagKey);
    btn.className = isSelected ? 'decade-chip is-selected' : 'decade-chip';
    btn.textContent = label;
    btn.setAttribute('aria-pressed', String(isSelected));

    btn.addEventListener('click', () => {
      if (state.selectedResourceFlags.has(flagKey)) {
        state.selectedResourceFlags.delete(flagKey);
        btn.classList.remove('is-selected');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        state.selectedResourceFlags.add(flagKey);
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');
      }
      applyFilters();
    });

    fragment.appendChild(btn);
  });

  dom.otherChips.appendChild(fragment);
}

function renderYearTicks() {
  const { minBound, maxBound } = state.yearRange;
  const span = Math.max(5, maxBound - minBound);

  if (dom.yearRangeTicks) {
    dom.yearRangeTicks.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let y = minBound; y <= maxBound; y += 5) {
      const dot = document.createElement('span');
      dot.className = 'year-tick-dot';
      if (y % 20 === 0) {
        dot.classList.add('is-major');
      }
      dot.dataset.year = String(y);
      dot.style.left = `${((y - minBound) / span) * 100}%`;
      frag.appendChild(dot);
    }
    dom.yearRangeTicks.appendChild(frag);
  }

  if (dom.yearRangeLabels) {
    dom.yearRangeLabels.innerHTML = '';
    for (let y = minBound; y <= maxBound; y += 5) {
      if (y % 20 !== 0) {
        continue;
      }
      const spanEl = document.createElement('span');
      spanEl.className = 'year-tick-label';
      spanEl.textContent = String(y);
      spanEl.style.left = `${((y - minBound) / span) * 100}%`;
      dom.yearRangeLabels.appendChild(spanEl);
    }
  }
}

export function updateYearSliderUI() {
  const { minBound, maxBound, dataMaxYear, currentMin, currentMax } = state.yearRange;
  const suffix = t().yearSuffix;
  const displayMax = currentMax >= maxBound ? dataMaxYear : currentMax;
  dom.yearRangeDisplay.textContent = `${currentMin}${suffix} 〜 ${displayMax}${suffix}`;

  const span = Math.max(1, maxBound - minBound);
  const leftPct = ((currentMin - minBound) / span) * 100;
  const rightPct = ((currentMax - minBound) / span) * 100;
  dom.yearRangeTrack.style.left = `${leftPct}%`;
  dom.yearRangeTrack.style.width = `${Math.max(0, rightPct - leftPct)}%`;

  if (dom.yearRangeTicks) {
    dom.yearRangeTicks.querySelectorAll('.year-tick-dot').forEach((dot) => {
      const y = Number(dot.dataset.year);
      dot.classList.toggle('is-in-range', y >= currentMin && y <= currentMax);
    });
  }

  if (currentMin >= maxBound - 5) {
    dom.yearRangeMin.style.zIndex = '4';
    dom.yearRangeMax.style.zIndex = '3';
  } else {
    dom.yearRangeMin.style.zIndex = '3';
    dom.yearRangeMax.style.zIndex = '4';
  }
}

export function initYearSlider() {
  const years = state.allItems
    .map((item) => Number(item.meta.publishedYear))
    .filter((y) => !Number.isNaN(y) && y > 0);

  const rawMin = years.length > 0 ? Math.min(...years) : 1950;
  const rawMax = years.length > 0 ? Math.max(...years) : 2026;
  const minYear = Math.floor(rawMin / 5) * 5;
  const maxYear = Math.ceil(rawMax / 5) * 5;

  state.yearRange = {
    minBound: minYear,
    maxBound: maxYear,
    dataMaxYear: rawMax,
    currentMin: minYear,
    currentMax: maxYear
  };

  dom.yearRangeMin.min = String(minYear);
  dom.yearRangeMin.max = String(maxYear);
  dom.yearRangeMin.step = '5';
  dom.yearRangeMin.value = String(minYear);

  dom.yearRangeMax.min = String(minYear);
  dom.yearRangeMax.max = String(maxYear);
  dom.yearRangeMax.step = '5';
  dom.yearRangeMax.value = String(maxYear);

  renderYearTicks();
  updateYearSliderUI();
}

export function handleYearSliderInput(changedHandle) {
  let minVal = Number(dom.yearRangeMin.value);
  let maxVal = Number(dom.yearRangeMax.value);

  if (changedHandle === 'min' && minVal > maxVal) {
    minVal = maxVal;
    dom.yearRangeMin.value = String(minVal);
  } else if (changedHandle === 'max' && maxVal < minVal) {
    maxVal = minVal;
    dom.yearRangeMax.value = String(maxVal);
  }

  state.yearRange.currentMin = minVal;
  state.yearRange.currentMax = maxVal;
  updateYearSliderUI();
  if (yearFilterTimer) {
    clearTimeout(yearFilterTimer);
  }
  yearFilterTimer = setTimeout(() => {
    yearFilterTimer = null;
    applyFilters();
  }, 70);
}

export function toggleFiltersPanel() {
  const isExpanded = dom.toggleFiltersBtn.getAttribute('aria-expanded') === 'true';
  const nextExpanded = !isExpanded;
  dom.toggleFiltersBtn.setAttribute('aria-expanded', String(nextExpanded));
  if (dom.filterPanelWrap) {
    dom.filterPanelWrap.classList.toggle('is-open', nextExpanded);
    dom.filterPanelWrap.inert = !nextExpanded;
  }
}

export function resetFilters() {
  dom.searchInput.value = '';
  state.selectedMapType = 'all';
  renderMapTypeChips();
  state.selectedScales.clear();
  state.selectedResourceFlags.clear();
  state.yearRange.currentMin = state.yearRange.minBound;
  state.yearRange.currentMax = state.yearRange.maxBound;
  dom.yearRangeMin.value = String(state.yearRange.minBound);
  dom.yearRangeMax.value = String(state.yearRange.maxBound);
  updateYearSliderUI();
  renderScaleChips();
  renderOtherChips();
  state.viewportOnly = false;
  state.settings.viewportOnly = false;
  saveSettings();
  syncSettingsUI();
  applyFilters();
}

export function buildSuggestionPool() {
  const dict = t();
  const pool = [];
  const seenKeys = new Set();

  state.allItems.forEach((item) => {
    const { meta } = item;
    const loc = item.cachedLoc || getLocalizedMeta(meta);
    const mapKey = `map:${meta.mapId || `${loc.title}_${meta.scale}_${meta.publishedYear}`}`;
    const suffix = meta.publishedYear ? ` (${meta.publishedYear})` : '';

    if (!seenKeys.has(mapKey)) {
      seenKeys.add(mapKey);
      const coreJa = extractCoreMapName(meta.mapNameJa);
      const coreEn = extractCoreMapName(meta.mapNameEn);
      pool.push({
        type: 'map',
        label: `${loc.shortTitle}${suffix}`,
        filterValue: loc.coreTitle || loc.title,
        badge: dict.badgeMap,
        coreNormalized: normalizeSearchText(loc.coreTitle || loc.title),
        primaryText: normalizeSearchText([loc.coreTitle, loc.shortTitle, loc.title, coreJa, coreEn].filter(Boolean).join(' ')),
        searchText: loc.searchTokens,
        item
      });
    }

    const volcanoName = state.lang === 'en'
      ? (meta.volcanoNameEn || meta.volcanoNameJa)
      : (meta.volcanoNameJa || meta.volcanoNameEn);
    if (volcanoName) {
      const volcanoKey = `volcano:${meta.mapId || `${volcanoName}_${meta.scale}_${meta.publishedYear}`}`;
      if (!seenKeys.has(volcanoKey)) {
        seenKeys.add(volcanoKey);
        pool.push({
          type: 'volcano',
          label: `${volcanoName}${suffix}`,
          filterValue: volcanoName,
          badge: dict.badgeVolcano,
          coreNormalized: normalizeSearchText(volcanoName),
          primaryText: normalizeSearchText(`${meta.volcanoNameJa} ${meta.volcanoNameEn}`),
          searchText: normalizeSearchText(`${meta.volcanoNameJa} ${meta.volcanoNameEn} ${meta.publishedYear || ''}`),
          item
        });
      }
    }

    loc.authorList.forEach((author) => {
      const authorKey = `author:${author}`;
      if (!seenKeys.has(authorKey)) {
        seenKeys.add(authorKey);
        const normAuthor = normalizeSearchText(author);
        pool.push({
          type: 'author',
          label: author,
          filterValue: author,
          badge: dict.badgeAuthor,
          coreNormalized: normAuthor,
          primaryText: normAuthor,
          searchText: normAuthor,
          item: null
        });
      }
    });

    loc.regionList.forEach((region) => {
      const regionKey = `region:${region}`;
      if (!seenKeys.has(regionKey)) {
        seenKeys.add(regionKey);
        const normRegion = normalizeSearchText(region);
        pool.push({
          type: 'region',
          label: region,
          filterValue: region,
          badge: dict.badgeRegion,
          coreNormalized: normRegion,
          primaryText: normRegion,
          searchText: normRegion,
          item: null
        });
      }
    });
  });

  state.fieldTripItems.forEach((ftItem) => {
    const { props, normalizedSearchText } = ftItem;
    const ftKey = `field_trip:${props.id}`;
    if (!seenKeys.has(ftKey)) {
      seenKeys.add(ftKey);
      const label = `${props.stop_name} (${props.year} ${props.course_abbr})`;
      pool.push({
        type: 'field_trip',
        category: props.category || '',
        label,
        filterValue: props.stop_name,
        badge: dict.badgeFieldTrip,
        coreNormalized: normalizeSearchText(`${props.stop_name} ${props.stop_abbr}`),
        primaryText: normalizeSearchText(`${props.stop_name} ${props.stop_abbr} ${props.course_abbr} ${props.course_name}`),
        searchText: normalizedSearchText || normalizeSearchText(
          `${props.id} ${props.year} ${props.course_abbr} ${props.course_name} ${props.authors || ''} ${props.stop_no} ${props.stop_abbr} ${props.stop_name} ${props.description}`
        ),
        item: ftItem
      });
    }
  });

  state.suggestionPool = pool;
}

export function hideSuggestions() {
  dom.searchSuggestions.classList.remove('is-open');
  dom.searchInput.setAttribute('aria-expanded', 'false');
  state.currentSuggestions = [];
  state.activeSuggestionIndex = -1;
}

export function selectSuggestion(suggestion) {
  if (!suggestion) {
    return;
  }

  dom.searchInput.value = suggestion.filterValue || suggestion.label;
  hideSuggestions();
  applyFilters();

  if ((suggestion.type === 'map' || suggestion.type === 'volcano') && suggestion.item) {
    if (!state.filteredItems.includes(suggestion.item)) {
      state.selectedMapType = suggestion.item.meta.mapType || 'all';
      renderMapTypeChips();
      state.selectedScales.clear();
      state.selectedResourceFlags.clear();
      state.yearRange.currentMin = state.yearRange.minBound;
      state.yearRange.currentMax = state.yearRange.maxBound;
      dom.yearRangeMin.value = String(state.yearRange.minBound);
      dom.yearRangeMax.value = String(state.yearRange.maxBound);
      updateYearSliderUI();
      renderScaleChips();
      renderOtherChips();
      applyFilters();
    }
    addOverlayForItem(suggestion.item);
    zoomToMapItem(suggestion.item);
  } else if (suggestion.type === 'field_trip' && suggestion.item) {
    focusFieldTripSpot(suggestion.item);
  } else {
    if (state.isLeftDrawerCollapsed) {
      setLeftDrawerCollapsed(false);
    }
    fitAllVisibleItems();
  }
}

function buildHighlightedLabel(label, rawTokens) {
  const frag = document.createDocumentFragment();
  if (!rawTokens || rawTokens.length === 0) {
    frag.appendChild(document.createTextNode(label));
    return frag;
  }

  const escaped = rawTokens
    .filter(Boolean)
    .map((tok) => tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escaped.length === 0) {
    frag.appendChild(document.createTextNode(label));
    return frag;
  }

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  let lastIdx = 0;
  let match;
  while ((match = regex.exec(label)) !== null) {
    if (match.index > lastIdx) {
      frag.appendChild(document.createTextNode(label.slice(lastIdx, match.index)));
    }
    const mark = document.createElement('mark');
    mark.className = 'suggestion-highlight';
    mark.textContent = match[0];
    frag.appendChild(mark);
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < label.length) {
    frag.appendChild(document.createTextNode(label.slice(lastIdx)));
  }
  return frag;
}

function scoreSuggestion(entry, tokens) {
  if (!tokens.every((tok) => entry.searchText.includes(tok))) {
    return -1;
  }
  let score = 0;
  const firstToken = tokens[0];
  if (entry.coreNormalized === firstToken) {
    score += 100;
  } else if (entry.coreNormalized.startsWith(firstToken)) {
    score += 70;
  } else if (entry.primaryText.includes(firstToken)) {
    score += 40;
  } else {
    score += 15;
  }

  if (entry.type === 'map' || entry.type === 'volcano') {
    score += 8;
  } else if (entry.type === 'region') {
    score += 4;
  }
  return score;
}

function updateActiveSuggestionHighlight() {
  const items = dom.searchSuggestions.querySelectorAll('.suggestion-item');
  items.forEach((li, idx) => {
    const isActive = idx === state.activeSuggestionIndex;
    li.classList.toggle('is-active', isActive);
    li.setAttribute('aria-selected', String(isActive));
    if (isActive) {
      li.scrollIntoView({ block: 'nearest' });
    }
  });
}

export function renderSuggestions() {
  const rawQuery = dom.searchInput.value.trim();
  const rawTokens = rawQuery.split(/[\s\u3000]+/).filter(Boolean);
  const normTokens = normalizeSearchText(rawQuery).split(/\s+/).filter(Boolean);

  if (normTokens.length === 0) {
    hideSuggestions();
    return;
  }

  const dict = t();
  const mapMatches = [];
  const fieldTripMatches = [];
  const regionMatches = [];
  const authorMatches = [];

  for (const entry of state.suggestionPool) {
    const matchScore = scoreSuggestion(entry, normTokens);
    if (matchScore < 0) {
      continue;
    }
    const scored = { ...entry, matchScore };
    if (entry.type === 'map' || entry.type === 'volcano') {
      mapMatches.push(scored);
    } else if (entry.type === 'field_trip') {
      fieldTripMatches.push(scored);
    } else if (entry.type === 'region') {
      regionMatches.push(scored);
    } else if (entry.type === 'author') {
      authorMatches.push(scored);
    }
  }

  const sortFn = (a, b) => b.matchScore - a.matchScore || a.label.localeCompare(b.label, state.lang);
  mapMatches.sort(sortFn);
  fieldTripMatches.sort(sortFn);
  regionMatches.sort(sortFn);
  authorMatches.sort(sortFn);

  const groups = [
    { title: dict.suggestionGroupMaps, items: mapMatches.slice(0, 5) },
    { title: dict.suggestionGroupFieldTrips, items: fieldTripMatches.slice(0, 4) },
    { title: dict.suggestionGroupRegions, items: regionMatches.slice(0, 3) },
    { title: dict.suggestionGroupAuthors, items: authorMatches.slice(0, 3) }
  ].filter((g) => g.items.length > 0);

  if (groups.length === 0) {
    hideSuggestions();
    return;
  }

  const flatItems = [];
  dom.searchSuggestions.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const badgeClassMap = {
    map: 'is-map',
    volcano: 'is-volcano',
    field_trip: 'is-field-trip',
    region: 'is-region',
    author: 'is-author'
  };

  groups.forEach((group) => {
    fragment.appendChild(
      el('li', { className: 'suggestion-group-header', role: 'presentation' }, group.title)
    );

    group.items.forEach((entry) => {
      const itemIndex = flatItems.length;
      flatItems.push(entry);

      const badgeClass = badgeClassMap[entry.type] || 'is-author';
      const badgeDataset = entry.type === 'field_trip' && entry.category ? { tripCategory: entry.category } : {};
      const li = el('li', {
        className: 'suggestion-item',
        role: 'option',
        'aria-selected': 'false',
        onMousedown: (event) => {
          event.preventDefault();
          selectSuggestion(entry);
        },
        onMousemove: () => {
          state.activeSuggestionIndex = itemIndex;
          updateActiveSuggestionHighlight();
        }
      },
        el('span', { className: 'suggestion-text' }, buildHighlightedLabel(entry.label, rawTokens)),
        el('span', { className: `suggestion-badge ${badgeClass}`, dataset: badgeDataset }, entry.badge)
      );
      fragment.appendChild(li);
    });
  });

  state.currentSuggestions = flatItems;
  state.activeSuggestionIndex = -1;
  dom.searchSuggestions.appendChild(fragment);
  dom.searchSuggestions.classList.add('is-open');
  dom.searchInput.setAttribute('aria-expanded', 'true');
}

export function handleSearchKeydown(event) {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  const hasSuggestions = dom.searchSuggestions.classList.contains('is-open') && state.currentSuggestions.length > 0;

  if (event.key === 'ArrowDown' && hasSuggestions) {
    event.preventDefault();
    state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % state.currentSuggestions.length;
    updateActiveSuggestionHighlight();
  } else if (event.key === 'ArrowUp' && hasSuggestions) {
    event.preventDefault();
    state.activeSuggestionIndex =
      (state.activeSuggestionIndex - 1 + state.currentSuggestions.length) % state.currentSuggestions.length;
    updateActiveSuggestionHighlight();
  } else if (event.key === 'Enter') {
    if (hasSuggestions && state.activeSuggestionIndex >= 0) {
      event.preventDefault();
      selectSuggestion(state.currentSuggestions[state.activeSuggestionIndex]);
    } else {
      hideSuggestions();
      applyFilters();
    }
  } else if (event.key === 'Escape' && hasSuggestions) {
    event.preventDefault();
    event.stopPropagation();
    hideSuggestions();
  }
}

function getFeatureBboxArea(feature) {
  const b = feature?.properties?.map?.bounds || feature?.properties?.tile?.bounds;
  if (Array.isArray(b) && b.length === 4) {
    return Math.abs((Number(b[2]) - Number(b[0])) * (Number(b[3]) - Number(b[1])));
  }
  const ring = feature?.geometry?.coordinates?.[0];
  if (Array.isArray(ring) && ring.length > 0) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    ring.forEach(([x, y]) => {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });
    return Math.abs((maxX - minX) * (maxY - minY));
  }
  return 0;
}

/**
 * GeoJSONデータからポリゴンレイヤー群を生成してマップに描画する
 */
export function renderGeoJsonFeatures(geojsonData, { skipInitialFit = false } = {}) {
  const sortedGeoJson = geojsonData && Array.isArray(geojsonData.features)
    ? {
      ...geojsonData,
      features: [...geojsonData.features].sort((a, b) => getFeatureBboxArea(b) - getFeatureBboxArea(a))
    }
    : geojsonData;

  L.geoJSON(sortedGeoJson, {
    style: (feature) => styleByScale(
      feature?.properties?.map?.scale_denominator ?? null,
      feature?.properties?.map?.map_type ?? 'geological_map_sheet'
    ),
    onEachFeature: (feature, layer) => {
      const meta = normalizeProperties(feature.properties);
      const item = { layer, meta, cachedLoc: getLocalizedMeta(meta) };

      layer.bindTooltip(buildTooltipText(meta), {
        sticky: true,
        direction: 'top',
        offset: [0, -6],
        className: 'map-hover-tooltip'
      });

      layer.on('mouseover', () => {
        if (!isItemOverlayed(item)) {
          layer.setStyle(CONFIG.POLYGON_STYLE.hover);
        }
      });

      layer.on('mouseout', () => {
        if (!isItemOverlayed(item)) {
          layer.setStyle(styleByScale(meta.scaleDenominator, meta.mapType));
        }
      });

      layer.on('click', (event) => {
        L.DomEvent.stopPropagation(event);
        if (state.seamlessLayer && state.seamlessQueryPriority && event.latlng) {
          querySeamlessPointGeology(event.latlng);
          return;
        }
        addOverlayForItem(item);
      });

      state.allItems.push(item);
      state.indexLayerGroup.addLayer(layer);
    }
  });

  state.filteredItems = [...state.allItems];

  if (state.allItems.some(({ meta }) => meta.mapType === 'geological_map_sheet')) {
    state.selectedMapType = 'geological_map_sheet';
  }

  renderMapTypeChips();
  initYearSlider();
  renderScaleChips();
  renderOtherChips();
  buildSuggestionPool();
  applyFilters();
  if (!skipInitialFit) {
    if (state.map) {
      const initialZoom = window.innerWidth <= 720 ? 5.0 : 5.75;
      state.map.setView(CONFIG.INITIAL_CENTER, initialZoom, { animate: false });
    } else {
      fitAllVisibleItems({ animate: false });
    }
  }
}
```

### `js/state.js`（全 291 行）

```javascript
import { CONFIG, FIELD_TRIP_CATEGORY_KEYS } from './config.js';

/**
 * アプリケーション状態
 */
export const state = {
  lang: 'ja',
  theme: 'light',
  map: null,
  activeBaseLayer: null,
  activeBasemapKey: 'blank',
  indexLayerGroup: null,
  allItems: [],
  filteredItems: [],
  yearRange: {
    minBound: 1950,
    maxBound: 2026,
    dataMaxYear: 2026,
    currentMin: 1950,
    currentMax: 2026
  },
  selectedMapType: 'all',
  selectedScales: new Set(),
  selectedResourceFlags: new Set(),
  viewportOnly: false,
  showIndexFrames: true,
  showFieldTrips: true,
  fieldTripsLayerGroup: null,
  fieldTripItems: [],
  expandedFieldTripCourses: new Set(),
  fieldTripYear: 'all',
  fieldTripCourse: 'all',
  fieldTripQuery: '',
  selectedFieldTripCategories: new Set(),
  drawerMode: 'maps',
  selectedFieldTripId: null,
  userLocationLayerGroup: null,
  scaleControl: null,
  wheelZoomSpeed: 1.0,
  showScaleBar: true,
  showFieldTripRoute: true,
  isLeftDrawerCollapsed: true,
  isRightInspectorCollapsed: false,
  hoveredListItem: null,
  activeOverlays: [],
  selectedItem: null,
  inspectedItem: null,
  pinnedInspectItem: null,
  seamlessLayer: null,
  seamlessMeta: null,
  seamlessVirtualItem: null,
  seamlessOpacity: CONFIG.DEFAULT_SEAMLESS_OPACITY,
  seamlessQueryPriority: false,
  seamlessPointMarker: null,
  seamlessPopup: null,
  seamlessAbortController: null,
  seamlessPointCache: new Map(),
  lastSeamlessPoint: null,
  loadingLayerCount: 0,
  suggestionPool: [],
  currentSuggestions: [],
  activeSuggestionIndex: -1,
  inspectorTab: 'legend',
  activeSectionIndex: 0,
  overlayOpacity: CONFIG.DEFAULT_OVERLAY_OPACITY,
  settings: { ...CONFIG.DEFAULT_SETTINGS },
  permalinkRestoredView: false
};

/**
 * DOM要素のキャッシュ
 */
export const dom = {
  appLayout: document.querySelector('.app-layout'),
  mapEl: document.getElementById('map'),
  mobileNavButtons: document.querySelectorAll('.mobile-nav-btn[data-mobile-view]'),
  mobileLegendTab: document.getElementById('mobile-legend-tab'),
  leftDrawer: document.getElementById('left-drawer'),
  leftDrawerWrap: document.getElementById('left-drawer-wrap'),
  leftDrawerBody: document.getElementById('left-drawer-body'),
  toggleLeftDrawerBtn: document.getElementById('toggle-left-drawer-btn'),
  drawerFilterDot: document.getElementById('drawer-filter-dot'),
  searchInput: document.getElementById('search-input'),
  searchSuggestions: document.getElementById('search-suggestions'),
  mapTypeLabel: document.getElementById('map-type-label'),
  mapTypeChips: document.getElementById('map-type-chips'),
  viewportOnlyToggle: document.getElementById('viewport-only-toggle'),
  viewportOnlyLabel: document.getElementById('viewport-only-label'),
  toggleFiltersBtn: document.getElementById('toggle-filters-btn'),
  filterAccordionLabel: document.getElementById('filter-accordion-label'),
  activeFilterBadge: document.getElementById('active-filter-badge'),
  filterPanelWrap: document.getElementById('filter-panel-wrap'),
  filterPanelBody: document.getElementById('filter-panel-body'),
  decadeLabel: document.getElementById('decade-label'),
  yearRangeDisplay: document.getElementById('year-range-display'),
  yearRangeTrack: document.getElementById('year-range-track'),
  yearRangeMin: document.getElementById('year-range-min'),
  yearRangeMax: document.getElementById('year-range-max'),
  yearRangeTicks: document.getElementById('year-range-ticks'),
  yearRangeLabels: document.getElementById('year-range-labels'),
  scaleFilterLabel: document.getElementById('scale-filter-label'),
  scaleChips: document.getElementById('scale-chips'),
  otherFilterLabel: document.getElementById('other-filter-label'),
  otherChips: document.getElementById('other-chips'),
  resetFiltersBtn: document.getElementById('reset-filters'),
  statusMessage: document.getElementById('status-message'),
  resultListLabel: document.getElementById('result-list-label'),
  resultCount: document.getElementById('result-count'),
  fitAllBtn: document.getElementById('fit-all-btn'),
  resultList: document.getElementById('result-list'),
  rightInspector: document.getElementById('right-inspector'),
  wmsStatusDot: document.getElementById('wms-status-dot'),
  activeWmsName: document.getElementById('active-wms-name'),
  clearWmsBtn: document.getElementById('clear-wms-btn'),
  collapseRightBtn: document.getElementById('collapse-right-btn'),
  reopenRightBtn: document.getElementById('reopen-right-btn'),
  reopenRightLabel: document.getElementById('reopen-right-label'),
  activeOverlaysSection: document.getElementById('active-overlays-section'),
  activeOverlayList: document.getElementById('active-overlay-list'),
  tabLegendBtn: document.getElementById('tab-legend-btn'),
  tabSectionBtn: document.getElementById('tab-section-btn'),
  tabDetailBtn: document.getElementById('tab-detail-btn'),
  legendOpenLink: document.getElementById('legend-open-link'),
  inspectorVisualPane: document.getElementById('inspector-visual-pane'),
  inspectorDetailPane: document.getElementById('inspector-detail-pane'),
  legendMapName: document.getElementById('legend-map-name'),
  seamlessPointCard: document.getElementById('seamless-point-card'),
  seamlessGuideCard: document.getElementById('seamless-guide-card'),
  sectionChips: document.getElementById('section-chips'),
  legendZoomWrapper: document.getElementById('legend-zoom-wrapper'),
  legendImage: document.getElementById('legend-image'),
  legendLensIndicator: document.getElementById('legend-lens-indicator'),
  legendLoupe: document.getElementById('legend-loupe'),
  mapBottomRightControls: document.getElementById('map-bottom-right-controls'),
  dominantInfoTitle: document.getElementById('dominant-info-title'),
  dominantInfoSubtitle: document.getElementById('dominant-info-subtitle'),
  dominantInfoMeta: document.getElementById('dominant-info-meta'),
  dominantInfoLinks: document.getElementById('dominant-info-links'),
  layersPopoverBtn: document.getElementById('layers-popover-btn'),
  layersPopover: document.getElementById('layers-popover'),
  basemapLabel: document.getElementById('basemap-label'),
  basemapButtons: document.querySelectorAll('.segmented-btn[data-basemap]'),
  showIndexToggle: document.getElementById('show-index-toggle'),
  showIndexLabel: document.getElementById('show-index-label'),
  seamless200kToggle: document.getElementById('seamless-200k-toggle'),
  seamless200kLabel: document.getElementById('seamless-200k-label'),
  seamlessOpacityRow: document.getElementById('seamless-opacity-row'),
  seamlessOpacityLabel: document.getElementById('seamless-opacity-label'),
  seamlessOpacitySlider: document.getElementById('seamless-opacity'),
  seamlessOpacityValue: document.getElementById('seamless-opacity-value'),
  seamlessQueryRow: document.getElementById('seamless-query-row'),
  seamlessQueryLabel: document.getElementById('seamless-query-label'),
  seamlessQueryToggle: document.getElementById('seamless-query-toggle'),
  drawerTabMaps: document.getElementById('drawer-tab-maps'),
  drawerTabTrips: document.getElementById('drawer-tab-trips'),
  drawerMapsPane: document.getElementById('drawer-maps-pane'),
  drawerTripsPane: document.getElementById('drawer-trips-pane'),
  drawerTripFilterLabel: document.getElementById('drawer-trip-filter-label'),
  drawerTripYearFilter: document.getElementById('drawer-trip-year-filter'),
  drawerTripCourseFilter: document.getElementById('drawer-trip-course-filter'),
  drawerTripCategoryLabel: document.getElementById('drawer-trip-category-label'),
  drawerTripCategoryChips: document.getElementById('drawer-trip-category-chips'),
  drawerTripSearch: document.getElementById('drawer-trip-search'),
  fieldTripCourseCard: document.getElementById('field-trip-course-card'),
  fieldTripListLabel: document.getElementById('field-trip-list-label'),
  fieldTripCount: document.getElementById('field-trip-count'),
  toggleExpandTripsBtn: document.getElementById('toggle-expand-trips-btn'),
  fitFieldTripsBtn: document.getElementById('fit-field-trips-btn'),
  fieldTripList: document.getElementById('field-trip-list'),
  fieldTripActiveBar: document.getElementById('field-trip-active-bar'),
  fieldTripActiveBadge: document.getElementById('field-trip-active-badge'),
  fieldTripActiveCount: document.getElementById('field-trip-active-count'),
  fieldTripActiveLabel: document.getElementById('field-trip-active-label'),
  fieldTripActiveAuthors: document.getElementById('field-trip-active-authors'),
  fieldTripStopNav: document.getElementById('field-trip-stop-nav'),
  fieldTripPrevStopBtn: document.getElementById('field-trip-prev-stop-btn'),
  fieldTripNextStopBtn: document.getElementById('field-trip-next-stop-btn'),
  fieldTripCurrentStopLabel: document.getElementById('field-trip-current-stop-label'),
  fieldTripCurrentStopDesc: document.getElementById('field-trip-current-stop-desc'),
  fieldTripBarOverlayBtn: document.getElementById('field-trip-bar-overlay-btn'),
  fieldTripBarGuidebookBtn: document.getElementById('field-trip-bar-guidebook-btn'),
  fieldTripBarFitBtn: document.getElementById('field-trip-bar-fit-btn'),
  fieldTripBarCollapseBtn: document.getElementById('field-trip-bar-collapse-btn'),
  fieldTripsFabBtn: document.getElementById('field-trips-fab-btn'),
  locateMeBtn: document.getElementById('locate-me-btn'),
  prefsPopoverBtn: document.getElementById('prefs-popover-btn'),
  prefsPopover: document.getElementById('prefs-popover'),
  prefsThemeLabel: document.getElementById('prefs-theme-label'),
  themeChoiceButtons: document.querySelectorAll('.segmented-btn[data-theme-choice]'),
  prefsLangLabel: document.getElementById('prefs-lang-label'),
  langButtons: document.querySelectorAll('.segmented-btn[data-lang]'),
  prefsMapBehaviorLabel: document.getElementById('prefs-map-behavior-label'),
  wheelZoomSpeedLabel: document.getElementById('wheel-zoom-speed-label'),
  wheelZoomSpeedSlider: document.getElementById('wheel-zoom-speed'),
  wheelZoomSpeedValue: document.getElementById('wheel-zoom-speed-value'),
  defaultOverlayOpacityLabel: document.getElementById('default-overlay-opacity-label'),
  defaultOverlayOpacitySlider: document.getElementById('default-overlay-opacity'),
  defaultOverlayOpacityValue: document.getElementById('default-overlay-opacity-value'),
  showScaleLabel: document.getElementById('show-scale-label'),
  showScaleToggle: document.getElementById('show-scale-toggle'),
  showTripRouteLabel: document.getElementById('show-trip-route-label'),
  showTripRouteToggle: document.getElementById('show-trip-route-toggle'),
  resetSettingsBtn: document.getElementById('reset-settings-btn')
};

let settingsSaveTimer = null;

/**
 * 設定を localStorage へ保存する
 */
export function saveSettings() {
  if (settingsSaveTimer) {
    clearTimeout(settingsSaveTimer);
    settingsSaveTimer = null;
  }
  try {
    localStorage.setItem(CONFIG.SETTINGS_STORAGE_KEY, JSON.stringify(state.settings));
  } catch {
    // ignore storage errors
  }
}

/**
 * 設定を localStorage へ遅延保存する
 */
export function debouncedSaveSettings() {
  if (settingsSaveTimer) {
    clearTimeout(settingsSaveTimer);
  }
  settingsSaveTimer = setTimeout(() => {
    settingsSaveTimer = null;
    saveSettings();
  }, 150);
}

/**
 * localStorage から設定を読み込む
 */
export function loadSettings() {
  let parsed = null;
  try {
    const raw = localStorage.getItem(CONFIG.SETTINGS_STORAGE_KEY);
    if (raw) {
      parsed = JSON.parse(raw);
    }
  } catch {
    parsed = null;
  }

  const merged = {
    ...CONFIG.DEFAULT_SETTINGS,
    ...(parsed && typeof parsed === 'object' ? parsed : {})
  };
  if (!CONFIG.BASEMAPS[merged.basemap]) {
    merged.basemap = CONFIG.DEFAULT_SETTINGS.basemap;
  }
  const opacity = Number(merged.overlayOpacity);
  merged.overlayOpacity = Number.isFinite(opacity)
    ? Math.min(1, Math.max(0, opacity))
    : CONFIG.DEFAULT_SETTINGS.overlayOpacity;
  const seamlessOpacity = Number(merged.seamlessOpacity);
  merged.seamlessOpacity = Number.isFinite(seamlessOpacity)
    ? Math.min(1, Math.max(0, seamlessOpacity))
    : CONFIG.DEFAULT_SETTINGS.seamlessOpacity;
  const wheelSpeed = Number(merged.wheelZoomSpeed);
  merged.wheelZoomSpeed = Number.isFinite(wheelSpeed)
    ? Math.min(2.5, Math.max(0.4, Math.round(wheelSpeed * 10) / 10))
    : CONFIG.DEFAULT_SETTINGS.wheelZoomSpeed;

  // 年・コースの絞り込みは一時的な検索状態とし、再読み込み時に1コースのみへ固定されないよう復元しない
  merged.fieldTripYear = 'all';
  merged.fieldTripCourse = 'all';

  state.settings = merged;
  state.showIndexFrames = Boolean(merged.showIndexFrames);
  state.showFieldTrips = Boolean(merged.showFieldTrips);
  state.showScaleBar = merged.showScaleBar !== false;
  state.showFieldTripRoute = merged.showFieldTripRoute !== false;
  state.wheelZoomSpeed = merged.wheelZoomSpeed;
  state.fieldTripYear = 'all';
  state.fieldTripCourse = 'all';
  const validCategories = Array.isArray(merged.fieldTripCategories)
    ? merged.fieldTripCategories.filter((cat) => FIELD_TRIP_CATEGORY_KEYS.includes(cat))
    : [];
  state.selectedFieldTripCategories = new Set(validCategories);
  merged.fieldTripCategories = Array.from(state.selectedFieldTripCategories);
  state.viewportOnly = Boolean(merged.viewportOnly);
  state.overlayOpacity = merged.overlayOpacity;
  state.seamlessOpacity = merged.seamlessOpacity;
  state.seamlessQueryPriority = Boolean(merged.seamlessQueryPriority);
}
```

## 6. データ取得・変換パイプライン・検証・テスト

### `scripts/build_map_catalog.py`（全 653 行）

```python
#!/usr/bin/env python3
"""
GSJ 5万分の1地質図幅のメタデータから Leaflet 用 map_catalog.json（および任意の GeoJSON）を生成する。

使用例:
    python scripts/build_map_catalog.py --map-id 507 --output data/map_catalog.json

    python scripts/build_map_catalog.py --map-id 507 508 509 --output data/map_catalog.json --geojson-output data/map_index.geojson
"""

import argparse
import json
import logging
import re
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

BASE_URL = "https://gbank.gsj.jp/ld/resource/publication/map/{series}/map{map_id}.html"
USER_AGENT = "GeologicalMapWebGIS/0.1 (research use)"
logger = logging.getLogger(__name__)

_THREAD_LOCAL = threading.local()


class RateLimiter:
    """複数ワーカー間で共有するスレッドセーフなレートリミッター。"""

    def __init__(self, delay_sec: float) -> None:
        self.delay_sec = max(0.0, float(delay_sec))
        self._lock = threading.Lock()
        self._next_allowed = 0.0

    def wait(self) -> None:
        if self.delay_sec <= 0:
            return
        with self._lock:
            now = time.monotonic()
            if now < self._next_allowed:
                sleep_for = self._next_allowed - now
                self._next_allowed = self._next_allowed + self.delay_sec
            else:
                sleep_for = 0.0
                self._next_allowed = now + self.delay_sec
        if sleep_for > 0:
            time.sleep(sleep_for)


def create_retry_session() -> requests.Session:
    """429/5xx リトライ付きの requests.Session を生成する。"""
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    retry = Retry(
        total=3,
        backoff_factor=0.5,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["HEAD", "GET"],
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session


def get_http_session() -> requests.Session:
    """スレッドごとの Session を再利用する。"""
    session = getattr(_THREAD_LOCAL, "session", None)
    if session is None:
        session = create_retry_session()
        _THREAD_LOCAL.session = session
    return session


def fetch_text(url: str, session: requests.Session | None = None) -> str:
    """指定URLからHTMLテキストを取得する。"""
    sess = session or get_http_session()
    response = sess.get(url, timeout=30)
    response.raise_for_status()
    response.encoding = response.apparent_encoding or "utf-8"
    return response.text


def fetch_json(url: str, session: requests.Session | None = None) -> dict:
    """指定URLからJSONを取得する。"""
    sess = session or get_http_session()
    response = sess.get(url, timeout=30)
    response.raise_for_status()
    return response.json()


def clean_text(value) -> str:
    """BeautifulSoup要素から余分な空白を除いたテキストを抽出する。"""
    if value is None:
        return ""
    return re.sub(r"\s+", " ", value.get_text(" ", strip=True)).strip()


def find_table_row(table, key: str):
    """表内の左側セルが key と一致する行の残りセルを返す。"""
    for row in table.find_all("tr"):
        cells = row.find_all(["th", "td"])
        if len(cells) >= 2 and clean_text(cells[0]) == key:
            return cells[1:]
    return None


def extract_tilejson_url(metadata_url: str, soup: BeautifulSoup) -> str | None:
    """HTML内の表から TileJSON URL を抽出する。"""
    for table in soup.find_all("table"):
        cells = find_table_row(table, "TileJSON")
        if cells:
            link = cells[0].find("a", href=True)
            if link:
                return urljoin(metadata_url, link["href"])

            text = clean_text(cells[0])
            match = re.search(r"https?://\S+\.json", text)
            if match:
                return match.group(0)

    return None


def extract_download_links(metadata_url: str, soup: BeautifulSoup) -> dict[str, str]:
    """ダウンロード表（最内テーブル）から各種フォーマットのリンクを抽出する。"""
    downloads: dict[str, str] = {}
    download_table = None

    for table in soup.find_all("table"):
        if table.find("table"):
            continue
        if find_table_row(table, "PDF"):
            download_table = table
            break

    if not download_table:
        return downloads

    for row in download_table.find_all("tr"):
        cells = row.find_all(["th", "td"])
        if len(cells) < 3:
            continue

        label = clean_text(cells[0])
        link = cells[2].find("a", href=True)

        if label and link:
            url = urljoin(metadata_url, link["href"])
            downloads.setdefault(label, url)
            if "軽量" in label or "light" in label.lower() or re.search(r"_(?:l|light|low)\.pdf$", url, re.I):
                downloads.setdefault("pdf_light", url)

    return downloads


def extract_original_image_url(metadata_url: str, soup: BeautifulSoup) -> str:
    """ページ内の原図JPG（*_org_*.jpg）URLを抽出する。"""
    for link in soup.find_all("a", href=True):
        href = urljoin(metadata_url, link["href"])
        if re.search(r"_org_\d+\.jpe?g$", href, re.I):
            return href
    return ""


def extract_section_images(metadata_url: str, soup: BeautifulSoup) -> list[dict[str, str]]:
    """ページ内の断面図JPG（*_section_*.jpg）とラベルのリストを抽出する。"""
    sections: list[dict[str, str]] = []
    seen_urls: set[str] = set()

    for link in soup.find_all("a", href=True):
        href = urljoin(metadata_url, link["href"])
        if not re.search(r"_section_\d+\.jpe?g$", href, re.I) or href in seen_urls:
            continue
        seen_urls.add(href)

        label = ""
        row = link.find_parent("tr")
        if row:
            first_cell = row.find(["th", "td"])
            if first_cell:
                cell_text = clean_text(first_cell)
                match = re.search(r"Section:\s*([A-Za-z0-9'\-]+)", cell_text, re.I)
                if match:
                    label = match.group(1)

        if not label:
            label = f"断面図{len(sections) + 1}"

        sections.append({"label": label, "url": href})

    return sections


def check_url_exists(url: str, session: requests.Session | None = None) -> bool:
    """HEADリクエストでURLが存在するか（HTTP 200系）確認する。"""
    try:
        sess = session or get_http_session()
        response = sess.head(
            url,
            allow_redirects=True,
            timeout=5,
        )
        return response.status_code == 200
    except Exception:
        return False


def build_description_metadata(downloads: dict[str, str]) -> dict[str, str]:
    """downloads辞書から description (light_pdf_url / full_pdf_url / preferred_pdf) を構築する。"""
    light_pdf_url = downloads.get("pdf_light", "")
    full_pdf_url = ""

    for key, url in downloads.items():
        if key == "pdf_light":
            continue
        is_pdf_entry = key.upper() == "PDF" or url.lower().endswith(".pdf")
        if not is_pdf_entry:
            continue
        if "軽量" in key or "light" in key.lower() or re.search(r"_D-L\.pdf$|_(?:l|light|low)\.pdf$", url, re.I):
            if not light_pdf_url:
                light_pdf_url = url
        elif not full_pdf_url:
            full_pdf_url = url

    # _D.pdf がある場合に _D-L.pdf（軽量版）の存在も確認する
    if full_pdf_url and not light_pdf_url and re.search(r"_D\.pdf$", full_pdf_url, re.I):
        candidate_light = re.sub(r"_D\.pdf$", "_D-L.pdf", full_pdf_url, flags=re.I)
        if check_url_exists(candidate_light):
            light_pdf_url = candidate_light
            downloads["pdf_light"] = candidate_light

    preferred_pdf = light_pdf_url or full_pdf_url
    return {
        "light_pdf_url": light_pdf_url,
        "full_pdf_url": full_pdf_url,
        "preferred_pdf": preferred_pdf,
    }


def extract_related_links(metadata_url: str, soup: BeautifulSoup) -> dict[str, str]:
    """関連リソース（文献・シリーズ・Viewer）のリンクを抽出する。"""
    related: dict[str, str] = {}

    for table in soup.find_all("table"):
        for row in table.find_all("tr"):
            cells = row.find_all(["th", "td"])
            if len(cells) < 3:
                continue

            category = clean_text(cells[0])
            link = cells[-1].find("a", href=True)
            if not link:
                continue

            url = urljoin(metadata_url, link["href"])

            if category == "文献":
                related["literature_uri"] = url
            elif category == "出版物シリーズ":
                related["series_uri"] = url
            elif category == "Viewer":
                related["viewer_url"] = url

    return related


def extract_japanese_metadata(catalog_url: str) -> dict:
    """GSJ日本語カタログページから図幅名・著者名・発行者（日本語）を抽出する。"""
    result = {
        "map_name_ja": "",
        "authors_ja": [],
        "publisher_ja": "",
        "series_ja": "",
    }
    if not catalog_url:
        return result

    try:
        html = fetch_text(catalog_url)
        soup = BeautifulSoup(html, "html.parser")
    except Exception as exc:
        logger.warning("日本語カタログページの取得に失敗しました: %s (%s)", catalog_url, exc)
        return result

    kv: dict[str, str] = {}
    for row in soup.find_all("tr"):
        cells = row.find_all(["th", "td"])
        if len(cells) >= 2:
            key = re.sub(r"\s+", "", clean_text(cells[0]))
            val = clean_text(cells[1])
            if key and val and key not in kv:
                kv[key] = val

    raw_title = kv.get("図名", "")
    series_ja = kv.get("シリーズ名", "")
    if raw_title:
        # 例: "槍ヶ岳　YARIGATAKE" -> 日本語名部分を抽出
        ja_part = re.sub(r"[\s　]+[A-Za-z0-9'\-\s,()]+$", "", raw_title).strip()
        map_title = ja_part or raw_title
        result["map_name_ja"] = f"{series_ja}「{map_title}」" if series_ja else map_title

    raw_authors = kv.get("著者", "")
    if raw_authors:
        cleaned_raw = re.sub(r"^[\s　]*[（(](.+)[）)][\s　]*$", r"\1", raw_authors.strip())
        authors = [
            re.sub(r"[\s　]+", " ", a).strip(" ()（）")
            if ("(" in a) != (")" in a) or ("（" in a) != ("）" in a)
            else re.sub(r"[\s　]+", " ", a).strip()
            for a in re.split(r"[・,、]", cleaned_raw)
            if a.strip()
        ]
        result["authors_ja"] = [a for a in authors if a]

    result["publisher_ja"] = kv.get("発行者", "")
    result["series_ja"] = series_ja
    return result


def infer_scale(series_code: str, series_en: str) -> str:
    """シリーズコードまたは英語シリーズ名から縮尺表記を推定する。"""
    match = re.search(r"1\s*:\s*[\d,]+", series_en or "")
    if match:
        return re.sub(r"\s+", "", match.group(0))
    code_map = {
        "g050": "1:50,000",
        "g075": "1:75,000",
        "g200": "1:200,000",
        "g500": "1:500,000",
        "g1000": "1:1,000,000",
    }
    return code_map.get(series_code.lower(), series_code)


def build_record(metadata_url: str, series_code: str = "g050") -> dict:
    """メタデータHTMLとTileJSONを取得し、カタログレコード辞書を構築する。"""
    metadata_html = fetch_text(metadata_url)
    soup = BeautifulSoup(metadata_html, "html.parser")

    tilejson_url = extract_tilejson_url(metadata_url, soup)
    if not tilejson_url:
        raise ValueError(f"TileJSON URL が見つかりません: {metadata_url}")

    tilejson = fetch_json(tilejson_url)
    properties = tilejson.get("properties", {})

    map_id = properties.get("map_id")
    layer_name = properties.get("layer_name")

    if not map_id or not layer_name:
        raise ValueError(f"TileJSON に map_id / layer_name がありません: {tilejson_url}")

    main_table = soup.find("table")
    if main_table is None:
        raise ValueError(f"メタデータ表が見つかりません: {metadata_url}")

    def row_value(key: str) -> str:
        cells = find_table_row(main_table, key)
        return clean_text(cells[0]) if cells else ""

    map_name_en = row_value("Map name")
    series_en = row_value("Series")
    authors_en = [
        author.strip()
        for author in row_value("Author").split(",")
        if author.strip()
    ]
    published_year = row_value("Publish year")
    publisher_en = row_value("Publisher")
    volume = row_value("Tribute")

    tiles = tilejson.get("tiles", [])
    webp_template = tiles[0] if tiles else ""

    alternate = properties.get("alternate_tile_templates", {})
    png_templates = alternate.get("png", [])
    xyz_templates = alternate.get("xyz", [])
    tms_templates = alternate.get("tms", [])

    png_template = png_templates[0]["template"] if png_templates else ""
    xyz_template = xyz_templates[0]["template"] if xyz_templates else ""
    tms_template = tms_templates[0]["template"] if tms_templates else ""

    bounds = tilejson.get("bounds", [])
    center = tilejson.get("center", [])

    center_lon = center[0] if len(center) > 0 else None
    center_lat = center[1] if len(center) > 1 else None
    default_zoom = center[2] if len(center) > 2 else 11

    downloads = extract_download_links(metadata_url, soup)
    description = build_description_metadata(downloads)
    related = extract_related_links(metadata_url, soup)
    catalog_url = properties.get("map_catalogue_url", "")
    ja_meta = extract_japanese_metadata(catalog_url)

    return {
        "map_id": map_id,
        "layer_name": layer_name,
        "scale": infer_scale(series_code, series_en),
        "map_name_ja": ja_meta["map_name_ja"],
        "map_name_en": map_name_en,
        "series_ja": ja_meta["series_ja"],
        "series_en": series_en,
        "authors_ja": ja_meta["authors_ja"],
        "authors_en": authors_en,
        "published_year": int(published_year) if published_year.isdigit() else published_year,
        "publisher_ja": ja_meta["publisher_ja"],
        "publisher_en": publisher_en,
        "volume": volume,
        "metadata_url": metadata_url,
        "tilejson_url": tilejson_url,
        "tile": {
            "type": "xyz",
            "scheme": tilejson.get("scheme", "xyz"),
            "webp_template": webp_template,
            "png_template": png_template,
            "xyz_template": xyz_template,
            "tms_template": tms_template,
            "min_zoom": tilejson.get("minzoom"),
            "max_zoom": tilejson.get("maxzoom"),
            "bounds": bounds,
            "center": [center_lon, center_lat],
            "default_zoom": default_zoom,
        },
        "legend_image_url": tilejson.get("legend", ""),
        "original_image_url": extract_original_image_url(metadata_url, soup),
        "section_images": extract_section_images(metadata_url, soup),
        "description": description,
        "downloads": downloads,
        "related_resources": {
            "publication_uri": properties.get("map_uri", metadata_url),
            "literature_uri": related.get("literature_uri", ""),
            "series_uri": related.get("series_uri", ""),
            "viewer_url": related.get("viewer_url", ""),
            "catalog_url": properties.get("map_catalogue_url", ""),
        },
        "license": {
            "name": "政府標準利用規約（第2.0版）準拠",
            "attribution": "産業技術総合研究所 地質調査総合センター",
            "source_url": "https://www.gsj.jp/license/license.html",
        },
        "is_tile_available": bool(webp_template or png_template or xyz_template),
        "is_wms_available": False,
    }


def record_to_geojson_feature(record: dict) -> dict | None:
    """カタログレコードの tile.bounds から GeoJSON Feature を生成する。"""
    bounds = record.get("tile", {}).get("bounds", [])
    if not isinstance(bounds, list) or len(bounds) != 4:
        return None

    west, south, east, north = bounds
    return {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [west, south],
                    [east, south],
                    [east, north],
                    [west, north],
                    [west, south],
                ]
            ],
        },
        "properties": record,
    }


def discover_series_map_ids(series: str) -> list[str]:
    """GSJ LD のシリーズ一覧ページからすべての map_id を抽出する。"""
    index_url = f"https://gbank.gsj.jp/ld/resource/publication/map/{series}/"
    html = fetch_text(index_url)
    ids = set(re.findall(rf"/{re.escape(series)}/map(\d+)", html))
    return sorted(ids, key=lambda x: int(x))


def main() -> None:
    parser = argparse.ArgumentParser(
        description="GSJ 5万分の1地質図幅のメタデータから Leaflet 用 map_catalog.json を生成する"
    )
    parser.add_argument(
        "--map-id",
        nargs="+",
        default=[],
        help="GSJ の map_id（例: 507 または 00507）",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="指定シリーズ一覧ページから全図幅の map_id を自動取得して収集する",
    )
    parser.add_argument(
        "--series",
        default="g050",
        help="GSJ のシリーズコード（例: g050=5万分の1, g200=20万分の1, g075=7.5万分の1）",
    )
    parser.add_argument(
        "--output",
        default="data/providers/gsj_50k_raw.json",
        help="出力する生のGSJ 5万分の1 JSONファイルのパス（既定: data/providers/gsj_50k_raw.json）",
    )
    parser.add_argument(
        "--geojson-output",
        default="",
        help="任意: bounds から図郭ポリゴンを生成して出力する GeoJSON ファイルのパス",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.2,
        help="複数図幅取得時のリクエスト間隔（秒）",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=8,
        help="並列取得のワーカー数（既定: 8）",
    )
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        help="既存の --output JSON に含まれる map_id の取得をスキップする",
    )
    parser.add_argument(
        "--error-log",
        default="",
        help="任意: 取得失敗URLとエラー詳細を保存する JSON ファイルパス",
    )
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

    target_ids: list[str] = list(args.map_id)
    if args.all:
        discovered = discover_series_map_ids(args.series)
        print(f"シリーズ {args.series} から {len(discovered)} 件の map_id を検出しました。")
        seen = set(target_ids)
        for mid in discovered:
            if mid not in seen:
                target_ids.append(mid)
                seen.add(mid)

    if not target_ids:
        parser.error("--map-id または --all のいずれかを指定してください。")

    output_path = Path(args.output)
    existing_records: list[dict] = []
    existing_ids: set[str] = set()
    if args.skip_existing and output_path.exists():
        try:
            existing_records = json.loads(output_path.read_text(encoding="utf-8"))
            existing_ids = {str(r.get("map_id")).zfill(5) for r in existing_records if r.get("map_id") is not None}
            before_count = len(target_ids)
            target_ids = [mid for mid in target_ids if str(mid).strip().zfill(5) not in existing_ids]
            print(f"--skip-existing: 既存 {len(existing_ids)} 件をスキップ（残り {len(target_ids)} / {before_count} 件）")
        except Exception as exc:
            logger.warning("既存ファイルの読み込みに失敗したため全件取得します: %s (%s)", output_path, exc)

    rate_limiter = RateLimiter(args.delay)

    def fetch_one(index: int, raw_map_id: str) -> tuple[int, str, dict | None, str]:
        padded_id = str(raw_map_id).strip().zfill(5)
        metadata_url = BASE_URL.format(series=args.series, map_id=padded_id)
        rate_limiter.wait()
        try:
            record = build_record(metadata_url, args.series)
            return index, metadata_url, record, ""
        except Exception as error:
            return index, metadata_url, None, str(error)

    indexed_records: list[tuple[int, dict]] = []
    errors: list[tuple[str, str]] = []

    if args.workers > 1:
        with ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = [
                executor.submit(fetch_one, idx, mid)
                for idx, mid in enumerate(target_ids)
            ]
            done_count = 0
            for future in as_completed(futures):
                idx, url, record, err = future.result()
                done_count += 1
                if record is not None:
                    indexed_records.append((idx, record))
                    if done_count % 50 == 0 or done_count == len(target_ids):
                        print(f"進捗: {done_count}/{len(target_ids)} (成功: {len(indexed_records)}, スキップ/エラー: {len(errors)})")
                else:
                    errors.append((url, err))
    else:
        for idx, mid in enumerate(target_ids):
            _, url, record, err = fetch_one(idx, mid)
            if record is not None:
                indexed_records.append((idx, record))
                print(f"  OK ({len(indexed_records)}): {record['map_name_en'] or record['layer_name']}")
            else:
                errors.append((url, err))
                print(f"  ERROR: {url} -> {err}")

    indexed_records.sort(key=lambda item: item[0])
    new_records: list[dict] = [rec for _, rec in indexed_records]
    records: list[dict] = existing_records + new_records

    if errors:
        print(f"スキップ/エラー件数: {len(errors)} 件（先頭5件）:")
        for url, err in errors[:5]:
            print(f"  - {url}: {err}")
        if args.error_log:
            err_path = Path(args.error_log)
            err_path.parent.mkdir(parents=True, exist_ok=True)
            err_payload = [{"url": url, "error": err} for url, err in errors]
            err_path.write_text(json.dumps(err_payload, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"エラーログを保存しました: {err_path}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(records, file, ensure_ascii=False, indent=2)

    print(f"保存しました: {output_path}")

    if args.geojson_output:
        features = [
            feature
            for feature in (record_to_geojson_feature(rec) for rec in records)
            if feature is not None
        ]
        geojson_path = Path(args.geojson_output)
        geojson_path.parent.mkdir(parents=True, exist_ok=True)
        with geojson_path.open("w", encoding="utf-8") as file:
            json.dump(
                {"type": "FeatureCollection", "features": features},
                file,
                ensure_ascii=False,
                indent=2,
            )
        print(f"GeoJSON を保存しました: {geojson_path}")

    print(f"取得成功: {len(records)} 件 / 対象: {len(target_ids)} 件")


if __name__ == "__main__":
    main()
```

### `scripts/build_geojson.py`（全 172 行）

```python
#!/usr/bin/env python3
"""
プロバイダごとのデータを「地図種別・主題・空間モデル」を含む共通スキーマへ正規化し、
data/providers/*.json・data/map_catalog.json・data/map_index.geojson を出力する。
"""

import argparse
import json
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.build_review_bundle import build_review_bundle  # noqa: E402
from scripts.providers.field_trips import build_field_trips_geojson  # noqa: E402
from scripts.providers.gsj_50k import normalize_gsj_50k  # noqa: E402
from scripts.providers.gsj_coastal_seamless import build_coastal_seamless_records  # noqa: E402
from scripts.providers.gsj_seamless_200k import build_seamless_200k_record  # noqa: E402
from scripts.providers.gsj_volcanic import build_volcanic_records  # noqa: E402
from scripts.providers.hro_eeg import merge_without_duplicates, normalize_hro_eeg  # noqa: E402
from scripts.schema import validate_common_record  # noqa: E402


def is_common_schema(record: dict) -> bool:
    """レコードがすでに共通スキーマ形式か判定する。"""
    return isinstance(record.get("source"), dict) and isinstance(record.get("map"), dict)


def ensure_gsj_50k_schema(rec: dict) -> dict:
    """既存の共通スキーマ gsj_50k レコードに map_type / theme / geometry_model / raster_image_url を補完する。"""
    if not is_common_schema(rec):
        return normalize_gsj_50k(rec)

    rec["map"].setdefault("map_type", "geological_map_sheet")
    rec["map"].setdefault("theme", "geology")
    rec["map"].setdefault("geometry_model", "map_sheet")
    rec.setdefault("display", {}).setdefault(
        "raster_image_url",
        rec.get("documents", {}).get("original_image_url", ""),
    )
    return rec


def validate_unique_map_ids(records: list[dict]) -> None:
    """統合後の全レコードで map.map_id が一意であることを検証する。"""
    seen_ids: set[str] = set()
    for rec in records:
        map_id = rec.get("map", {}).get("map_id", "")
        if map_id in seen_ids:
            raise ValueError(f"重複した map.map_id が検出されました: {map_id}")
        seen_ids.add(map_id)


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="地質図・巡検データ統合 & GeoJSON 生成")
    parser.add_argument("--skip-bundle", action="store_true", help="REVIEW_BUNDLE.md の自動更新をスキップする")
    args = parser.parse_args(argv)

    data_dir = PROJECT_ROOT / "data"
    providers_dir = data_dir / "providers"
    providers_dir.mkdir(parents=True, exist_ok=True)

    gsj_50k_raw_path = providers_dir / "gsj_50k_raw.json"
    gsj_50k_path = providers_dir / "gsj_50k.json"
    catalog_path = data_dir / "map_catalog.json"

    if gsj_50k_raw_path.exists():
        gsj_raw = json.loads(gsj_50k_raw_path.read_text(encoding="utf-8"))
    elif gsj_50k_path.exists():
        gsj_raw = json.loads(gsj_50k_path.read_text(encoding="utf-8"))
    else:
        gsj_raw = []

    gsj_50k_records = [
        ensure_gsj_50k_schema(rec)
        for rec in gsj_raw
        if not is_common_schema(rec) or rec["source"].get("provider_id") == "gsj_50k"
    ]

    seamless_records = [build_seamless_200k_record()]
    volcanic_records = build_volcanic_records()
    coastal_records = build_coastal_seamless_records()

    hro_raw_path = providers_dir / "hro_eeg_raw.json"
    hro_records = []
    if hro_raw_path.exists():
        hro_raw = json.loads(hro_raw_path.read_text(encoding="utf-8"))
        hro_records = [
            rec if is_common_schema(rec) else normalize_hro_eeg(rec)
            for rec in hro_raw
        ]

    # 全レコードの共通スキーマ必須属性を検証
    all_records = (
        seamless_records
        + merge_without_duplicates(gsj_50k_records, hro_records)
        + volcanic_records
        + coastal_records
    )
    for rec in all_records:
        validate_common_record(rec)
    validate_unique_map_ids(all_records)

    # プロバイダ別JSONを書き出し
    (providers_dir / "gsj_50k.json").write_text(
        json.dumps(gsj_50k_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "gsj_seamless_200k.json").write_text(
        json.dumps(seamless_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "gsj_volcanic.json").write_text(
        json.dumps(volcanic_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "gsj_coastal_seamless.json").write_text(
        json.dumps(coastal_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "hro_eeg.json").write_text(
        json.dumps(hro_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    catalog_path.write_text(
        json.dumps(all_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # 図郭ポリゴンを持つ図幅のみ GeoJSON FeatureCollection として書き出し
    features = []
    for rec in all_records:
        geom = rec.get("geometry")
        if not geom:
            continue
        props = {k: v for k, v in rec.items() if k != "geometry"}
        features.append(
            {
                "type": "Feature",
                "geometry": geom,
                "properties": props,
            }
        )

    geojson_path = data_dir / "map_index.geojson"
    geojson_path.write_text(
        json.dumps({"type": "FeatureCollection", "features": features}, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )

    field_trips_csv_path = data_dir / "field_trips.csv"
    field_trips_geojson_path = data_dir / "field_trips.geojson"
    field_trip_records = []
    if field_trips_csv_path.exists():
        field_trip_records = build_field_trips_geojson(field_trips_csv_path, field_trips_geojson_path)

    print(f"gsj_50k: {len(gsj_50k_records)} 件")
    print(f"gsj_seamless_200k: {len(seamless_records)} 件")
    print(f"gsj_volcanic: {len(volcanic_records)} 件")
    print(f"gsj_coastal_seamless: {len(coastal_records)} 件")
    print(f"hro_eeg: {len(hro_records)} 件")
    print(f"field_trips: {len(field_trip_records)} 件")
    print(f"出力完了: {catalog_path} ({len(all_records)} 件), {geojson_path} ({len(features)} features)")
    if not args.skip_bundle:
        bundle_path = build_review_bundle()
        print(f"REVIEW_BUNDLE 更新: {bundle_path}")


if __name__ == "__main__":
    main()
```

### `scripts/schema.py`（全 186 行）

```python
"""地質図共通スキーマの定数・バリデーション定義。"""

import re
from urllib.parse import urlparse

FIELD_TRIP_ID_RE = re.compile(r"^\d{4}_[^_]+_\d+_[^_]+$")
FIELD_TRIP_CATEGORIES = ("volcano", "basement", "sedimentary", "hazard_geo")

MAP_TYPES = (
    "geological_map_sheet",
    "seamless_geological_map",
    "volcanic_geological_map",
    "marine_geological_map",
    "active_fault_strip_map",
    "large_pyroclastic_flow_map",
    "hydrogeological_map",
    "geophysical_map",
    "geochemical_map",
    "resource_map",
)

GEOMETRY_MODELS = (
    "map_sheet",
    "continuous_polygon",
    "linear_feature",
    "point_feature",
    "raster_only",
)

TILE_TYPES = (
    "xyz",
    "wms",
    "raster",
    "none",
)


def is_valid_bounds(bounds) -> bool:
    """bounds が [west, south, east, north] の有効な矩形か検証する。"""
    if not isinstance(bounds, list) or len(bounds) != 4:
        return False
    if not all(isinstance(v, (int, float)) and not isinstance(v, bool) for v in bounds):
        return False
    west, south, east, north = bounds
    return -180.0 <= west < east <= 180.0 and -90.0 <= south < north <= 90.0


def validate_common_record(record: dict) -> None:
    """共通スキーマの必須属性・型・座標整合性を検証する。"""
    src = record.get("source")
    m = record.get("map")
    disp = record.get("display")
    docs = record.get("documents")

    if not isinstance(src, dict) or not isinstance(m, dict) or not isinstance(disp, dict) or not isinstance(docs, dict):
        raise ValueError("source / map / display / documents はすべて辞書である必要があります")

    for src_key in ("provider_id", "provider_name_ja", "license", "attribution"):
        val = src.get(src_key)
        if not isinstance(val, str) or not val.strip():
            raise ValueError(f"source.{src_key} が未設定または空文字です")

    for map_key in ("map_id", "theme"):
        val = m.get(map_key)
        if not isinstance(val, str) or not val.strip():
            raise ValueError(f"map.{map_key} が未設定または空文字です")

    if m.get("map_type") not in MAP_TYPES:
        raise ValueError(f"不正な map_type: {m.get('map_type')}")
    if m.get("geometry_model") not in GEOMETRY_MODELS:
        raise ValueError(f"不正な geometry_model: {m.get('geometry_model')}")

    scale_den = m.get("scale_denominator")
    if not isinstance(scale_den, int) or isinstance(scale_den, bool) or scale_den <= 0:
        raise ValueError(f"不正な map.scale_denominator: {scale_den}")

    pub_year = m.get("published_year")
    if pub_year is not None and (not isinstance(pub_year, int) or isinstance(pub_year, bool)):
        raise ValueError(f"不正な map.published_year（int または None のみ許容）: {pub_year}")

    for key in ("tile_type", "tile_url", "wms_url", "raster_image_url"):
        if key not in disp or not isinstance(disp.get(key), str):
            raise ValueError(f"display.{key} がないか文字列ではありません")

    tile_type = disp.get("tile_type")
    if tile_type not in TILE_TYPES:
        raise ValueError(f"不正な display.tile_type: {tile_type}")

    if tile_type == "xyz" and not disp.get("tile_url", "").strip():
        raise ValueError("tile_type == 'xyz' の場合は display.tile_url が必須です")
    if tile_type == "wms" and not disp.get("wms_url", "").strip():
        raise ValueError("tile_type == 'wms' の場合は display.wms_url が必須です")
    if tile_type == "raster" and not disp.get("raster_image_url", "").strip():
        raise ValueError("tile_type == 'raster' の場合は display.raster_image_url が必須です")

    bounds = m.get("bounds")
    if bounds:
        if not is_valid_bounds(bounds):
            raise ValueError(f"不正な map.bounds（west < east, south < north が必要）: {bounds}")
    elif tile_type == "raster":
        raise ValueError("tile_type == 'raster' の場合は有効な map.bounds（4要素）が必須です")

    for key in ("light_pdf_url", "full_pdf_url"):
        if key not in docs or not isinstance(docs.get(key), str):
            raise ValueError(f"documents.{key} がないか文字列ではありません")

    for section_name, section, url_keys in (
        ("display", disp, ("tile_url", "wms_url", "raster_image_url")),
        ("documents", docs, ("light_pdf_url", "full_pdf_url", "legend_image_url", "original_image_url")),
    ):
        for key in url_keys:
            val = section.get(key, "")
            if val is None or val == "":
                continue
            if not isinstance(val, str) or (val.strip() and not is_valid_http_url(val)):
                raise ValueError(f"{section_name}.{key} が有効な http/https URL ではありません: {val}")


def is_valid_http_url(url: str) -> bool:
    """http または https スキームの有効な URL か検証する。"""
    if not isinstance(url, str) or not url.strip():
        return False
    parsed = urlparse(url.strip())
    return parsed.scheme in ("http", "https") and bool(parsed.netloc)


def validate_field_trip_record(record: dict) -> None:
    """巡検スポットレコードの必須属性・ID形式・座標範囲・URL形式を検証する。"""
    if not isinstance(record, dict):
        raise ValueError("巡検レコードは辞書である必要があります")

    required_str_fields = ("id", "course_abbr", "course_name", "stop_no", "stop_abbr", "stop_name")
    for field in required_str_fields:
        val = record.get(field)
        if not isinstance(val, str) or not val.strip():
            raise ValueError(f"field_trip.{field} が未設定または空文字です")

    trip_id = record["id"].strip()
    if not FIELD_TRIP_ID_RE.match(trip_id):
        raise ValueError(
            f"field_trip.id が命名規則（YYYY_巡検名略称_地点no._地点名略称）に一致しません: {trip_id}"
        )

    year = record.get("year")
    if not isinstance(year, int) or isinstance(year, bool) or not (1000 <= year <= 9999):
        raise ValueError(f"field_trip.year は西暦4桁の整数である必要があります: {year}")

    id_parts = trip_id.split("_", 3)
    id_year, id_course, id_stop_no, _id_stop_abbr = id_parts
    if int(id_year) != year:
        raise ValueError(f"field_trip.id の年（{id_year}）が year（{year}）と一致しません: {trip_id}")
    if id_course != record["course_abbr"].strip():
        raise ValueError(
            f"field_trip.id のコース略称（{id_course}）が course_abbr（{record['course_abbr']}）と一致しません: {trip_id}"
        )
    if id_stop_no != record["stop_no"].strip():
        raise ValueError(
            f"field_trip.id の地点番号（{id_stop_no}）が stop_no（{record['stop_no']}）と一致しません: {trip_id}"
        )

    lat = record.get("lat")
    lon = record.get("lon")
    if not isinstance(lat, (int, float)) or isinstance(lat, bool) or not (-90.0 <= float(lat) <= 90.0):
        raise ValueError(f"field_trip.lat が有効範囲（-90〜90）外です: {lat}")
    if not isinstance(lon, (int, float)) or isinstance(lon, bool) or not (-180.0 <= float(lon) <= 180.0):
        raise ValueError(f"field_trip.lon が有効範囲（-180〜180）外です: {lon}")

    guidebook_url = record.get("guidebook_url", "")
    if not isinstance(guidebook_url, str):
        raise ValueError("field_trip.guidebook_url は文字列である必要があります")
    if guidebook_url.strip() and not is_valid_http_url(guidebook_url):
        raise ValueError(f"field_trip.guidebook_url が有効な http/https URL ではありません: {guidebook_url}")

    description = record.get("description", "")
    if not isinstance(description, str):
        raise ValueError("field_trip.description は文字列である必要があります")

    authors = record.get("authors", "")
    if not isinstance(authors, str):
        raise ValueError("field_trip.authors は文字列である必要があります")

    category = record.get("category")
    if not isinstance(category, str) or category.strip() not in FIELD_TRIP_CATEGORIES:
        raise ValueError(
            f"field_trip.category が不正です（許可値: {FIELD_TRIP_CATEGORIES}）: {category!r}"
        )
```

### `scripts/providers/field_trips.py`（全 131 行）

```python
"""日本地質学会 巡検スポット（CSV -> GeoJSON）変換・検証アダプタ。"""

import csv
import json
from pathlib import Path

from scripts.schema import validate_field_trip_record

REQUIRED_CSV_COLUMNS = (
    "id",
    "year",
    "course_abbr",
    "course_name",
    "category",
    "stop_no",
    "stop_abbr",
    "stop_name",
    "lat",
    "lon",
    "guidebook_url",
    "authors",
    "description",
)


def parse_field_trip_row(row: dict, row_num: int) -> dict:
    """CSV の1行を正規化し、型変換した巡検レコード辞書を返す。"""
    raw_year = (row.get("year") or "").strip()
    try:
        year = int(raw_year)
    except ValueError as exc:
        raise ValueError(f"行 {row_num}: year を整数に変換できません: {raw_year!r}") from exc

    raw_lat = (row.get("lat") or "").strip()
    raw_lon = (row.get("lon") or "").strip()
    try:
        lat = float(raw_lat)
        lon = float(raw_lon)
    except ValueError as exc:
        raise ValueError(f"行 {row_num}: lat/lon を数値に変換できません: lat={raw_lat!r}, lon={raw_lon!r}") from exc

    record = {
        "id": (row.get("id") or "").strip(),
        "year": year,
        "course_abbr": (row.get("course_abbr") or "").strip(),
        "course_name": (row.get("course_name") or "").strip(),
        "category": (row.get("category") or "").strip(),
        "stop_no": (row.get("stop_no") or "").strip(),
        "stop_abbr": (row.get("stop_abbr") or "").strip(),
        "stop_name": (row.get("stop_name") or "").strip(),
        "lat": lat,
        "lon": lon,
        "guidebook_url": (row.get("guidebook_url") or "").strip(),
        "authors": (row.get("authors") or "").strip(),
        "description": (row.get("description") or "").strip(),
    }
    validate_field_trip_record(record)
    return record


def load_field_trips_csv(csv_path: Path) -> list[dict]:
    """field_trips.csv を読み込み、全件スキーマ検証・重複チェックして返す。"""
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV ファイルが見つかりません: {csv_path}")

    records: list[dict] = []
    seen_ids: set[str] = set()
    course_categories: dict[tuple[int, str], str] = {}

    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            raise ValueError(f"CSV にヘッダー行がありません: {csv_path}")

        missing_cols = [col for col in REQUIRED_CSV_COLUMNS if col not in reader.fieldnames]
        if missing_cols:
            raise ValueError(f"CSV に必須カラムが不足しています: {missing_cols}")

        for row_num, row in enumerate(reader, start=2):
            if not any((v or "").strip() for v in row.values()):
                continue
            record = parse_field_trip_row(row, row_num)
            if record["id"] in seen_ids:
                raise ValueError(f"行 {row_num}: 巡検 ID が重複しています: {record['id']}")
            course_key = (record["year"], record["course_abbr"])
            prev_cat = course_categories.get(course_key)
            if prev_cat is not None and prev_cat != record["category"]:
                raise ValueError(
                    f"行 {row_num}: 同一コース（{course_key[0]}_{course_key[1]}）内で category が一致しません: {prev_cat} != {record['category']}"
                )
            course_categories[course_key] = record["category"]
            seen_ids.add(record["id"])
            records.append(record)

    return records


def build_field_trips_geojson(csv_path: Path, geojson_path: Path) -> list[dict]:
    """CSV を検証し GeoJSON FeatureCollection として書き出す。"""
    records = load_field_trips_csv(csv_path)
    features = []
    for rec in records:
        props = {
            "id": rec["id"],
            "year": rec["year"],
            "course_abbr": rec["course_abbr"],
            "course_name": rec["course_name"],
            "category": rec["category"],
            "stop_no": rec["stop_no"],
            "stop_abbr": rec["stop_abbr"],
            "stop_name": rec["stop_name"],
            "guidebook_url": rec["guidebook_url"],
            "authors": rec["authors"],
            "description": rec["description"],
        }
        features.append(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [rec["lon"], rec["lat"]],
                },
                "properties": props,
            }
        )

    geojson_path.write_text(
        json.dumps({"type": "FeatureCollection", "features": features}, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    return records
```

### `scripts/providers/gsj_50k.py`（全 115 行）

```python
"""産総研（GSJ）5万分の1地質図幅プロバイダアダプタ。"""

import re

from scripts.providers.common import to_int_year


def clean_author_name(name: str) -> str:
    """著者名から分割時に残った不対の括弧などを除去する。"""
    cleaned = re.sub(r"[\s　]+", " ", str(name or "")).strip()
    if not cleaned:
        return ""
    if (cleaned.startswith("(") and ")" not in cleaned) or (cleaned.startswith("（") and "）" not in cleaned):
        cleaned = cleaned[1:].strip()
    if (cleaned.endswith(")") and "(" not in cleaned) or (cleaned.endswith("）") and "（" not in cleaned):
        cleaned = cleaned[:-1].strip()
    if (cleaned.startswith("(") and cleaned.endswith(")")) or (cleaned.startswith("（") and cleaned.endswith("）")):
        inner = cleaned[1:-1].strip()
        if inner:
            cleaned = inner
    return cleaned


def build_polygon_geometry(bounds: list[float]) -> dict | None:
    """bounds [west, south, east, north] から GeoJSON Polygon を生成する。"""
    if not isinstance(bounds, list) or len(bounds) != 4:
        return None
    west, south, east, north = bounds
    return {
        "type": "Polygon",
        "coordinates": [
            [
                [west, south],
                [east, south],
                [east, north],
                [west, north],
                [west, south],
            ]
        ],
    }


def normalize_gsj_50k(raw: dict) -> dict:
    """GSJ 5万分の1カタログレコードを共通スキーマへ正規化する。"""
    tile = raw.get("tile", {})
    desc = raw.get("description", {})
    downloads = raw.get("downloads", {})
    related = raw.get("related_resources", {})
    license_info = raw.get("license", {})

    local_id = str(raw.get("map_id", ""))
    bounds = tile.get("bounds", raw.get("bounds", []))
    center = tile.get("center", raw.get("center", []))
    tile_url = tile.get("webp_template") or tile.get("png_template") or tile.get("xyz_template") or ""

    return {
        "source": {
            "provider_id": "gsj_50k",
            "provider_name_ja": "産業技術総合研究所 地質調査総合センター",
            "provider_url": "https://www.gsj.jp/",
            "license": license_info.get("name", "政府標準利用規約（第2.0版）準拠"),
            "attribution": license_info.get("attribution", "産業技術総合研究所 地質調査総合センター"),
        },
        "map": {
            "map_id": f"gsj_50k_{local_id}",
            "local_id": local_id,
            "layer_name": raw.get("layer_name", ""),
            "map_name_ja": raw.get("map_name_ja", ""),
            "map_name_en": raw.get("map_name_en", ""),
            "map_type": "geological_map_sheet",
            "theme": "geology",
            "geometry_model": "map_sheet",
            "scale_denominator": 50000,
            "series": raw.get("series_ja") or raw.get("series_en") or "地域地質研究報告（5万分の1地質図幅）",
            "published_year": to_int_year(raw.get("published_year")),
            "authors": [a for a in (clean_author_name(x) for x in (raw.get("authors_ja") or raw.get("authors_en") or [])) if a],
            "authors_ja": [a for a in (clean_author_name(x) for x in (raw.get("authors_ja") or [])) if a],
            "authors_en": [a for a in (clean_author_name(x) for x in (raw.get("authors_en") or [])) if a],
            "publisher": raw.get("publisher_ja") or raw.get("publisher_en") or "",
            "publisher_ja": raw.get("publisher_ja") or "",
            "publisher_en": raw.get("publisher_en") or "",
            "region": raw.get("region", ""),
            "prefectures": raw.get("prefectures", []),
            "bounds": bounds,
            "center": center,
            "zoom": {
                "min": tile.get("min_zoom", 2),
                "max": tile.get("max_zoom", 14),
                "default": tile.get("default_zoom", 11),
            },
        },
        "geometry": build_polygon_geometry(bounds),
        "display": {
            "tile_type": "xyz" if tile_url else "none",
            "tile_url": tile_url,
            "wms_url": "",
            "wms_layers": "",
            "raster_image_url": raw.get("original_image_url", ""),
            "opacity": 0.85,
        },
        "documents": {
            "light_pdf_url": desc.get("light_pdf_url", ""),
            "full_pdf_url": desc.get("full_pdf_url", ""),
            "preferred_pdf": desc.get("preferred_pdf", ""),
            "legend_image_url": raw.get("legend_image_url", ""),
            "original_image_url": raw.get("original_image_url", ""),
            "section_images": raw.get("section_images", []),
        },
        "downloads": downloads,
        "related_resources": {
            **related,
            "metadata_url": raw.get("metadata_url", ""),
            "tilejson_url": raw.get("tilejson_url", ""),
        },
    }
```

### `scripts/providers/gsj_seamless_200k.py`（全 65 行）

```python
"""産総研（GSJ）20万分の1日本シームレス地質図V2 プロバイダアダプタ。"""


def build_seamless_200k_record() -> dict:
    """20万分の1日本シームレス地質図V2（Web API v1.2 XYZタイル）の共通スキーマレコードを返す。"""
    return {
        "source": {
            "provider_id": "gsj_seamless_200k",
            "provider_name_ja": "産業技術総合研究所 地質調査総合センター",
            "provider_url": "https://gbank.gsj.jp/seamless/",
            "license": "CC BY 4.0（産総研 地質調査総合センター）",
            "attribution": '<a href="https://gbank.gsj.jp/seamless/" target="_blank" rel="noopener noreferrer">産総研 地質調査総合センター「20万分の1日本シームレス地質図V2」(CC BY 4.0)</a>',
        },
        "map": {
            "map_id": "gsj_seamless_200k_jp",
            "local_id": "seamless_v2",
            "layer_name": "glfs",
            "map_name_ja": "20万分の1日本シームレス地質図V2",
            "map_name_en": "Seamless Digital Geological Map of Japan (1:200,000) V2",
            "map_type": "seamless_geological_map",
            "theme": "geology",
            "geometry_model": "continuous_polygon",
            "scale_denominator": 200000,
            "series": "20万分の1日本シームレス地質図",
            "published_year": 2023,
            "authors": ["産業技術総合研究所 地質調査総合センター"],
            "authors_ja": ["産業技術総合研究所 地質調査総合センター"],
            "authors_en": ["Geological Survey of Japan, AIST"],
            "publisher": "産業技術総合研究所 地質調査総合センター",
            "publisher_ja": "産業技術総合研究所 地質調査総合センター",
            "publisher_en": "Geological Survey of Japan, AIST",
            "region": "全国",
            "prefectures": [],
            "bounds": [122.0, 20.0, 154.0, 46.0],
            "center": [138.0, 36.0],
            "zoom": {
                "min": 2,
                "max": 13,
                "default": 6,
            },
        },
        "geometry": None,
        "display": {
            "tile_type": "xyz",
            "tile_url": "https://gbank.gsj.jp/seamless/v2/api/1.2/tiles/{z}/{y}/{x}.png",
            "wms_url": "",
            "wms_layers": "",
            "raster_image_url": "",
            "opacity": 0.65,
        },
        "documents": {
            "light_pdf_url": "",
            "full_pdf_url": "",
            "preferred_pdf": "",
            "legend_image_url": "",
            "original_image_url": "",
            "section_images": [],
        },
        "downloads": {},
        "related_resources": {
            "catalog_url": "https://gbank.gsj.jp/seamless/use.html",
            "viewer_url": "https://gbank.gsj.jp/seamless/v2/viewer/",
            "legend_api_url": "https://gbank.gsj.jp/seamless/v2/api/1.2/legend.json",
        },
    }
```

### `scripts/providers/gsj_volcanic.py`（全 75 行）

```python
"""産総研（GSJ）火山地質図プロバイダアダプタ。"""

import json
from pathlib import Path

from scripts.providers.gsj_50k import build_polygon_geometry

SEED_PATH = Path(__file__).resolve().parent.parent.parent / "data" / "seeds" / "gsj_volcanic.json"


def build_volcanic_records(seed_path: Path = SEED_PATH) -> list[dict]:
    """代表的な火山地質図の共通スキーマレコード群をシードJSONから構築して返す。"""
    volcanic_seeds = json.loads(seed_path.read_text(encoding="utf-8"))

    records = []
    for seed in volcanic_seeds:
        records.append(
            {
                "source": {
                    "provider_id": "gsj_volcanic",
                    "provider_name_ja": "産業技術総合研究所 地質調査総合センター",
                    "provider_url": "https://www.gsj.jp/Map/JP/volcano.html",
                    "license": "政府標準利用規約（第2.0版）準拠",
                    "attribution": "産業技術総合研究所 地質調査総合センター（火山地質図）",
                },
                "map": {
                    "map_id": f"gsj_volcanic_{seed['local_id']}",
                    "local_id": seed["local_id"],
                    "layer_name": "",
                    "map_name_ja": seed["map_name_ja"],
                    "map_name_en": seed["map_name_en"],
                    "volcano_name_ja": seed["volcano_name_ja"],
                    "volcano_name_en": seed["volcano_name_en"],
                    "map_type": "volcanic_geological_map",
                    "theme": "volcano",
                    "geometry_model": "map_sheet",
                    "scale_denominator": seed["scale_denominator"],
                    "series": "火山地質図",
                    "published_year": seed["published_year"],
                    "authors": seed["authors_ja"],
                    "authors_ja": seed["authors_ja"],
                    "authors_en": seed["authors_en"],
                    "publisher": "産業技術総合研究所 地質調査総合センター",
                    "publisher_ja": "産業技術総合研究所 地質調査総合センター",
                    "publisher_en": "Geological Survey of Japan, AIST",
                    "region": seed["region"],
                    "prefectures": seed["prefectures"],
                    "bounds": seed["bounds"],
                    "center": seed["center"],
                    "zoom": {"min": 6, "max": 14, "default": 11},
                },
                "geometry": build_polygon_geometry(seed["bounds"]),
                "display": {
                    "tile_type": "none",
                    "tile_url": "",
                    "wms_url": "",
                    "wms_layers": "",
                    "raster_image_url": "",
                    "opacity": 0.85,
                },
                "documents": {
                    "light_pdf_url": "",
                    "full_pdf_url": "",
                    "preferred_pdf": "",
                    "legend_image_url": "",
                    "original_image_url": "",
                    "section_images": [],
                },
                "downloads": {},
                "related_resources": {
                    "catalog_url": seed["catalog_url"],
                },
            }
        )
    return records
```

### `scripts/providers/gsj_coastal_seamless.py`（全 73 行）

```python
"""産総研（GSJ）海陸シームレス地質図（沿岸域データセット）プロバイダアダプタ。"""

import json
from pathlib import Path

from scripts.providers.gsj_50k import build_polygon_geometry

SEED_PATH = Path(__file__).resolve().parent.parent.parent / "data" / "seeds" / "gsj_coastal_seamless.json"


def build_coastal_seamless_records(seed_path: Path = SEED_PATH) -> list[dict]:
    """沿岸域ごとの海陸シームレス地質図データセットをシードJSONから構築して返す。"""
    coastal_seeds = json.loads(seed_path.read_text(encoding="utf-8"))

    records = []
    for seed in coastal_seeds:
        records.append(
            {
                "source": {
                    "provider_id": "gsj_coastal_seamless",
                    "provider_name_ja": "産業技術総合研究所 地質調査総合センター",
                    "provider_url": "https://www.gsj.jp/researches/project/coastal-geology/results/index.html",
                    "license": "政府標準利用規約（第2.0版）準拠",
                    "attribution": "産業技術総合研究所 地質調査総合センター（海陸シームレス地質図）",
                },
                "map": {
                    "map_id": f"gsj_coastal_{seed['local_id']}",
                    "local_id": seed["local_id"],
                    "layer_name": "",
                    "map_name_ja": seed["map_name_ja"],
                    "map_name_en": seed["map_name_en"],
                    "map_type": "seamless_geological_map",
                    "theme": "coastal_seamless",
                    "geometry_model": "continuous_polygon",
                    "scale_denominator": seed["scale_denominator"],
                    "series": "海陸シームレス地質図",
                    "published_year": seed["published_year"],
                    "authors": ["産業技術総合研究所 地質調査総合センター"],
                    "authors_ja": ["産業技術総合研究所 地質調査総合センター"],
                    "authors_en": ["Geological Survey of Japan, AIST"],
                    "publisher": "産業技術総合研究所 地質調査総合センター",
                    "publisher_ja": "産業技術総合研究所 地質調査総合センター",
                    "publisher_en": "Geological Survey of Japan, AIST",
                    "region": seed["region"],
                    "prefectures": seed["prefectures"],
                    "bounds": seed["bounds"],
                    "center": seed["center"],
                    "zoom": {"min": 6, "max": 14, "default": 10},
                },
                "geometry": build_polygon_geometry(seed["bounds"]),
                "display": {
                    "tile_type": "none",
                    "tile_url": "",
                    "wms_url": "",
                    "wms_layers": "",
                    "raster_image_url": "",
                    "opacity": 0.80,
                },
                "documents": {
                    "light_pdf_url": "",
                    "full_pdf_url": "",
                    "preferred_pdf": "",
                    "legend_image_url": "",
                    "original_image_url": "",
                    "section_images": [],
                },
                "downloads": {},
                "related_resources": {
                    "catalog_url": "https://www.gsj.jp/researches/project/coastal-geology/results/index.html",
                },
            }
        )
    return records
```

### `scripts/providers/hro_eeg.py`（全 157 行）

```python
"""北海道立総合研究機構（エネルギー・環境・地質研究所）プロバイダアダプタ。"""

import re

from scripts.providers.common import to_int_year


def normalize_sheet_key(name: str) -> str:
    """重複判定用に図幅名からシリーズ接頭辞・括弧・中黒・ハイフン・空白を除去したキーを返す。"""
    cleaned = re.sub(r"^.*?「([^」]+)」.*$", r"\1", name or "")
    cleaned = re.sub(r"[\s　・･\-－ー()（）]+", "", cleaned)
    return cleaned.lower()


def is_similar_sheet_name(name_a: str, name_b: str) -> bool:
    """図幅名の表記ゆれ（例:「恵庭」と「恵庭岳」）を考慮して類似判定する。"""
    key_a = normalize_sheet_key(name_a)
    key_b = normalize_sheet_key(name_b)
    if not key_a or not key_b:
        return False
    if key_a == key_b:
        return True
    shorter, longer = sorted((key_a, key_b), key=len)
    if not longer.startswith(shorter):
        return False
    suffix = longer[len(shorter):]
    return suffix in ("岳", "山", "地方", "地域", "周辺")


def is_same_spatial_sheet(bounds_a, bounds_b, threshold_deg: float = 0.05) -> bool:
    """2つの bounds [west, south, east, north] の中心点距離が閾値以内か判定する。"""
    if not (isinstance(bounds_a, list) and len(bounds_a) == 4):
        return False
    if not (isinstance(bounds_b, list) and len(bounds_b) == 4):
        return False
    if not all(isinstance(v, (int, float)) and not isinstance(v, bool) for v in bounds_a):
        return False
    if not all(isinstance(v, (int, float)) and not isinstance(v, bool) for v in bounds_b):
        return False

    lon_a = (bounds_a[0] + bounds_a[2]) / 2.0
    lat_a = (bounds_a[1] + bounds_a[3]) / 2.0
    lon_b = (bounds_b[0] + bounds_b[2]) / 2.0
    lat_b = (bounds_b[1] + bounds_b[3]) / 2.0

    return abs(lon_a - lon_b) < threshold_deg and abs(lat_a - lat_b) < threshold_deg


def is_duplicate_record(gsj_rec: dict, hro_rec: dict) -> bool:
    """GSJレコードとHROレコードが同一図幅（空間・識別子・名称/発行年）か判定する。"""
    gm = gsj_rec.get("map", {})
    hm = hro_rec.get("map", {})

    # 1. 図幅番号・layer_name / local_id の一致
    g_layer = (gm.get("layer_name") or "").lower()
    h_layer = (hm.get("layer_name") or "").lower()
    if g_layer and h_layer and g_layer == h_layer:
        return True

    g_year = to_int_year(gm.get("published_year"))
    h_year = to_int_year(hm.get("published_year"))
    year_close = (g_year is not None and h_year is not None and abs(g_year - h_year) <= 2)

    # 2. 図幅名（表記ゆれ吸収）+ 発行年（±2年以内、または片方不明）
    same_name = is_similar_sheet_name(gm.get("map_name_ja", ""), hm.get("map_name_ja", ""))
    if same_name and (year_close or g_year is None or h_year is None):
        return True

    # 3. 空間的中心点の一致 + (発行年±2年以内 または 名称類似)
    #    ただし縮尺が大きく異なる場合（例: 1:50,000 と 1:200,000）は重複とみなさない
    g_scale = gm.get("scale_denominator")
    h_scale = hm.get("scale_denominator")
    if (
        isinstance(g_scale, int)
        and isinstance(h_scale, int)
        and g_scale > 0
        and h_scale > 0
        and max(g_scale, h_scale) / min(g_scale, h_scale) > 1.5
    ):
        return False

    same_space = is_same_spatial_sheet(gm.get("bounds"), hm.get("bounds"))
    if same_space and (year_close or same_name):
        return True

    return False


def normalize_hro_eeg(raw: dict) -> dict:
    """北海道総研の図幅レコードを共通スキーマへ正規化する。"""
    local_id = str(raw.get("local_id") or raw.get("map_id") or "")
    pdf_url = raw.get("pdf_url", "")
    light_pdf_url = raw.get("light_pdf_url", "")

    return {
        "source": {
            "provider_id": "hro_eeg",
            "provider_name_ja": "北海道立総合研究機構 エネルギー・環境・地質研究所",
            "provider_url": "https://www.hro.or.jp/industrial/research/eeg/development/datamap.html",
            "license": raw.get("license", "北海道立総合研究機構 利用規約準拠"),
            "attribution": "北海道立総合研究機構 エネルギー・環境・地質研究所",
        },
        "map": {
            "map_id": f"hro_eeg_{local_id}",
            "local_id": local_id,
            "layer_name": raw.get("layer_name", ""),
            "map_name_ja": raw.get("map_name_ja", ""),
            "map_name_en": raw.get("map_name_en", ""),
            "map_type": raw.get("map_type", "geological_map_sheet"),
            "theme": raw.get("theme", "geology"),
            "geometry_model": raw.get("geometry_model", "map_sheet"),
            "scale_denominator": int(raw.get("scale_denominator", 50000)),
            "series": raw.get("series", "5万分の1地質図幅（北海道）"),
            "published_year": to_int_year(raw.get("published_year")),
            "authors": raw.get("authors", []),
            "authors_ja": raw.get("authors", []),
            "authors_en": raw.get("authors_en", []),
            "publisher": raw.get("publisher", "北海道立地下資源調査所"),
            "publisher_ja": raw.get("publisher", "北海道立地下資源調査所"),
            "publisher_en": "",
            "region": raw.get("region", "北海道"),
            "prefectures": raw.get("prefectures", ["北海道"]),
            "bounds": raw.get("bounds", []),
            "center": raw.get("center", []),
            "zoom": raw.get("zoom", {"min": 4, "max": 14, "default": 11}),
        },
        "geometry": raw.get("geometry"),
        "display": {
            "tile_type": raw.get("tile_type", "none"),
            "tile_url": raw.get("tile_url", ""),
            "wms_url": raw.get("wms_url", ""),
            "wms_layers": raw.get("wms_layers", ""),
            "raster_image_url": raw.get("raster_image_url", ""),
            "opacity": 0.85,
        },
        "documents": {
            "light_pdf_url": light_pdf_url,
            "full_pdf_url": pdf_url,
            "preferred_pdf": light_pdf_url or pdf_url,
            "legend_image_url": raw.get("legend_image_url", ""),
            "original_image_url": raw.get("original_image_url", ""),
            "section_images": [],
        },
        "downloads": raw.get("downloads", {}),
        "related_resources": raw.get("related_resources", {}),
    }


def merge_without_duplicates(gsj_records: list[dict], hro_records: list[dict]) -> list[dict]:
    """GSJカタログを優先し、空間・識別子・名称/発行年で重複する北海道総研レコードを除外して結合する。"""
    merged = list(gsj_records)
    for hro_rec in hro_records:
        if any(is_duplicate_record(existing_rec, hro_rec) for existing_rec in merged):
            continue
        merged.append(hro_rec)

    return merged
```

### `tests/test_audit_suite.py`（全 249 行）

```python
#!/usr/bin/env python3
"""
Step 3: プロジェクト全体の監査・回帰テストスイート（Python データパイプライン & スキーマ整合性）。
"""

import csv
import json
import sys
import tempfile
import unittest
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.build_geojson import validate_unique_map_ids  # noqa: E402
from scripts.providers.field_trips import build_field_trips_geojson, load_field_trips_csv  # noqa: E402
from scripts.providers.gsj_50k import normalize_gsj_50k  # noqa: E402
from scripts.providers.hro_eeg import (  # noqa: E402
    is_duplicate_record,
    is_same_spatial_sheet,
    is_similar_sheet_name,
    merge_without_duplicates,
    normalize_hro_eeg,
)
from scripts.schema import validate_common_record, validate_field_trip_record  # noqa: E402


class TestSchemaAndProviders(unittest.TestCase):
    def setUp(self) -> None:
        self.catalog_path = PROJECT_ROOT / "data" / "map_catalog.json"
        self.geojson_path = PROJECT_ROOT / "data" / "map_index.geojson"
        self.catalog = json.loads(self.catalog_path.read_text(encoding="utf-8"))
        self.geojson = json.loads(self.geojson_path.read_text(encoding="utf-8"))

    def test_existing_data_passes_strict_validation(self) -> None:
        """既存の map_catalog.json と map_index.geojson の全件が厳格スキーマ検証を通過すること。"""
        self.assertGreaterEqual(len(self.catalog), 770)
        self.assertGreaterEqual(len(self.geojson["features"]), 769)
        for rec in self.catalog:
            validate_common_record(rec)
        for feat in self.geojson["features"]:
            validate_common_record(feat["properties"])

    def test_schema_rejects_missing_source_or_map_id(self) -> None:
        """source.provider_id や map.map_id が欠損しているレコードを拒否すること。"""
        base = json.loads(json.dumps(self.catalog[0]))
        base["source"]["provider_id"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(base)

        base2 = json.loads(json.dumps(self.catalog[0]))
        base2["map"]["map_id"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(base2)

    def test_schema_rejects_empty_url_when_tile_type_requires_it(self) -> None:
        """tile_type が xyz/wms/raster のとき対応するURLが空なら拒否すること。"""
        xyz_rec = json.loads(json.dumps(self.catalog[1]))
        xyz_rec["display"]["tile_type"] = "xyz"
        xyz_rec["display"]["tile_url"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(xyz_rec)

        wms_rec = json.loads(json.dumps(self.catalog[0]))
        wms_rec["display"]["tile_type"] = "wms"
        wms_rec["display"]["wms_url"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(wms_rec)

    def test_hro_similar_name_does_not_false_positive_distinct_places(self) -> None:
        """「大町」と「大町温泉」、「福岡」と「福岡西部」のような別図幅を誤って同一視しないこと。"""
        self.assertTrue(is_similar_sheet_name("5万分の1地質図幅「恵庭」", "恵庭岳"))
        self.assertFalse(is_similar_sheet_name("大町", "大町温泉"))
        self.assertFalse(is_similar_sheet_name("福岡", "福岡西部"))

    def test_hro_spatial_sheet_handles_malformed_bounds(self) -> None:
        """bounds に None や不正値が含まれていてもクラッシュせず False を返すこと。"""
        self.assertFalse(is_same_spatial_sheet([None, 36.0, 138.0, 36.5], [137.5, 36.0, 138.0, 36.5]))
        self.assertFalse(is_same_spatial_sheet(["a", "b", "c", "d"], [137.5, 36.0, 138.0, 36.5]))

    def test_hro_deduplicates_internal_hro_duplicates(self) -> None:
        """HROレコード同士の重複も排除されること。"""
        h1 = normalize_hro_eeg({"local_id": "101", "map_name_ja": "恵庭", "published_year": 1980, "bounds": [141.2, 42.8, 141.5, 43.0]})
        h2 = normalize_hro_eeg({"local_id": "101_dup", "map_name_ja": "恵庭岳", "published_year": "1981", "bounds": [141.2, 42.8, 141.5, 43.0]})
        merged = merge_without_duplicates([], [h1, h2])
        self.assertEqual(len(merged), 1)

    def test_gsj_50k_normalizes_string_year(self) -> None:
        """normalize_gsj_50k が文字列の published_year を int に正規化すること。"""
        raw = {
            "map_id": 999,
            "layer_name": "G50_test",
            "map_name_ja": "テスト",
            "published_year": "1995年",
            "bounds": [137.0, 36.0, 137.25, 36.16],
        }
        norm = normalize_gsj_50k(raw)
        self.assertEqual(norm["map"]["published_year"], 1995)
        validate_common_record(norm)

    def test_schema_rejects_invalid_http_urls_and_duplicate_map_ids(self) -> None:
        """非空URLが http/https 以外の場合や、重複 map_id を拒否すること。"""
        rec = json.loads(json.dumps(self.catalog[1]))
        rec["documents"]["light_pdf_url"] = "javascript:alert(1)"
        with self.assertRaises(ValueError):
            validate_common_record(rec)

        rec_a = json.loads(json.dumps(self.catalog[0]))
        rec_b = json.loads(json.dumps(self.catalog[0]))
        with self.assertRaises(ValueError):
            validate_unique_map_ids([rec_a, rec_b])

    def test_hro_does_not_mark_different_scale_as_duplicate(self) -> None:
        """縮尺が大きく異なるレコードは空間的に近くても重複とみなさないこと。"""
        gsj = normalize_gsj_50k({
            "map_id": 100,
            "layer_name": "G50_test",
            "map_name_ja": "恵庭",
            "published_year": 1980,
            "bounds": [141.2, 42.8, 141.5, 43.0],
        })
        hro_200k = normalize_hro_eeg({
            "local_id": "200k_1",
            "map_name_ja": "札幌",
            "published_year": 1980,
            "scale_denominator": 200000,
            "bounds": [141.2, 42.8, 141.5, 43.0],
        })
        self.assertFalse(is_duplicate_record(gsj, hro_200k))


class TestFieldTrips(unittest.TestCase):
    def setUp(self) -> None:
        self.csv_path = PROJECT_ROOT / "data" / "field_trips.csv"
        self.geojson_path = PROJECT_ROOT / "data" / "field_trips.geojson"

    def test_field_trips_csv_and_geojson_are_valid_and_in_sync(self) -> None:
        """data/field_trips.csv と data/field_trips.geojson がスキーマ検証を通過し件数・IDが一致すること。"""
        self.assertTrue(self.csv_path.exists())
        self.assertTrue(self.geojson_path.exists())

        records = load_field_trips_csv(self.csv_path)
        self.assertGreaterEqual(len(records), 4)

        geojson = json.loads(self.geojson_path.read_text(encoding="utf-8"))
        self.assertEqual(geojson.get("type"), "FeatureCollection")
        features = geojson.get("features", [])
        self.assertEqual(len(features), len(records))

        for rec, feat in zip(records, features):
            self.assertEqual(feat.get("type"), "Feature")
            geom = feat.get("geometry", {})
            self.assertEqual(geom.get("type"), "Point")
            self.assertEqual(geom.get("coordinates"), [rec["lon"], rec["lat"]])
            props = feat.get("properties", {})
            self.assertEqual(props.get("id"), rec["id"])
            validate_field_trip_record({**props, "lat": geom["coordinates"][1], "lon": geom["coordinates"][0]})

    def test_field_trip_validation_rejects_invalid_records(self) -> None:
        """不正な ID・緯度経度・URL を拒否すること。"""
        valid = {
            "id": "2025_松本盆地_01_城山公園",
            "year": 2025,
            "course_abbr": "松本盆地",
            "course_name": "松本盆地東縁断層帯と第四系",
            "category": "hazard_geo",
            "stop_no": "01",
            "stop_abbr": "城山公園",
            "stop_name": "Stop 1: 城山公園露頭",
            "lat": 36.2456,
            "lon": 137.9682,
            "guidebook_url": "https://example.com/guide.pdf",
            "description": "テスト",
        }
        validate_field_trip_record(valid)

        bad_cat = {**valid, "category": "unknown_category"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_cat)

        bad_id = {**valid, "id": "invalid-id"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_id)

        bad_lat = {**valid, "lat": 95.0}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_lat)

        bad_lon = {**valid, "lon": 185.0}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_lon)

        bad_url = {**valid, "guidebook_url": "javascript:alert(1)"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_url)

        empty_url = {**valid, "guidebook_url": ""}
        validate_field_trip_record(empty_url)

        mismatch_year = {**valid, "year": 2024}
        with self.assertRaises(ValueError):
            validate_field_trip_record(mismatch_year)

        mismatch_course = {**valid, "course_abbr": "別コース"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(mismatch_course)

        mismatch_stop = {**valid, "stop_no": "02"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(mismatch_stop)

    def test_field_trip_csv_rejects_duplicate_ids(self) -> None:
        """重複 ID を含む CSV を拒否すること。"""
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp_csv = Path(tmpdir) / "dup.csv"
            tmp_geojson = Path(tmpdir) / "dup.geojson"
            with tmp_csv.open("w", encoding="utf-8", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(["id", "year", "course_abbr", "course_name", "category", "authors", "stop_no", "stop_abbr", "stop_name", "lat", "lon", "guidebook_url", "description"])
                writer.writerow(["2025_A_01_X", "2025", "A", "Course A", "volcano", "Author A", "01", "X", "Stop X", "36.0", "138.0", "", ""])
                writer.writerow(["2025_A_01_X", "2025", "A", "Course A", "volcano", "Author A", "01", "X", "Stop X", "36.1", "138.1", "", ""])
            with self.assertRaisesRegex(ValueError, "重複"):
                build_field_trips_geojson(tmp_csv, tmp_geojson)

    def test_field_trip_csv_rejects_inconsistent_course_category(self) -> None:
        """同一コース内で異なる category が混在する CSV を拒否すること。"""
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp_csv = Path(tmpdir) / "mixed.csv"
            tmp_geojson = Path(tmpdir) / "mixed.geojson"
            with tmp_csv.open("w", encoding="utf-8", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(["id", "year", "course_abbr", "course_name", "category", "authors", "stop_no", "stop_abbr", "stop_name", "lat", "lon", "guidebook_url", "description"])
                writer.writerow(["2025_A_01_X", "2025", "A", "Course A", "volcano", "Author A", "01", "X", "Stop X", "36.0", "138.0", "", ""])
                writer.writerow(["2025_A_02_Y", "2025", "A", "Course A", "basement", "Author A", "02", "Y", "Stop Y", "36.1", "138.1", "", ""])
            with self.assertRaisesRegex(ValueError, "category"):
                build_field_trips_geojson(tmp_csv, tmp_geojson)

    def test_review_bundle_exists_and_contains_sections(self) -> None:
        """REVIEW_BUNDLE.md が存在し、主要セクションを含むこと。"""
        bundle_path = PROJECT_ROOT / "REVIEW_BUNDLE.md"
        self.assertTrue(bundle_path.exists())
        content = bundle_path.read_text(encoding="utf-8")
        self.assertIn("REVIEW_BUNDLE", content)
        self.assertIn("巡検コース一覧", content)


if __name__ == "__main__":
    unittest.main()
```

## 7. データ仕様・実データ抜粋

### `data/field_trips.csv`（先頭 30 行 / 全 1258 行）

```csv
id,year,course_abbr,course_name,category,stop_no,stop_abbr,stop_name,lat,lon,guidebook_url,authors,description
2026_能登半島_01_福浦灯台下,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,01,福浦灯台下,Stop 1: 福浦灯台下,37.077697,136.718903,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",別所岳安山岩類；水底岩屑なだれ堆積物
2026_能登半島_02_厳門北,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,02,厳門北,Stop 2: 厳門北,37.096868,136.728095,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",別所岳安山岩類；安山岩ブロック溶岩と玄武岩集塊岩
2026_能登半島_03_厳門南,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,03,厳門南,Stop 3: 厳門南,37.094522,136.7264,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",別所岳安山岩類；降下軽石堆積物と安山岩ブロック溶岩
2026_能登半島_04_西海千ノ浦,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,04,西海千ノ浦,Stop 4: 西海千ノ浦,37.139675,136.681753,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",別所岳安山岩類；水底火砕流堆積物
2026_能登半島_05_鹿頭三ノ岩,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,05,鹿頭三ノ岩,Stop 5: 鹿頭三ノ岩・黒崎,37.191237,136.67951,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",飛騨変成岩類；片麻岩
2026_能登半島_06_義経の舟隠し,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,06,義経の舟隠し,Stop 6: 義経の舟隠し,37.20677,136.680463,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",別所岳安山岩類；アア溶岩とベースサージ堆積物
2026_能登半島_07_門前クリーンパーク,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,07,門前クリーンパーク,Stop 7: 深谷・門前クリーンパーク,37.21835,136.7018,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",黒崎火山岩類；石灰質砂岩に貫入する岩脈群
2026_能登半島_08_門前剱地黒崎,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,08,門前剱地黒崎,Stop 8: 門前剱地黒崎,37.221245,136.695827,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",黒崎火山岩類；安山岩水底ブロック溶岩流と火口跡
2026_能登半島_09_イボ岩,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,09,イボ岩,Stop 9: イボ岩,37.252357,136.717703,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",合鹿層・神和住層・馬緤層相当層；月長石デイサイトイグニンブライト
2026_能登半島_10_石休場,2026,能登半島,日本海拡大期を跨ぐ能登半島火山活動の変遷,volcano,10,石休場,Stop 10: 石休場,37.36252,136.935225,https://doi.org/10.5575/geosoc.2026.0019,"海野 進, 田村 明弘, 森下 知晃",高洲山層；高 Mg 安山岩溶岩
2026_飛騨帯_01_黒雲母－角閃石片麻岩,2026,飛騨帯,飛騨帯の変成岩と深成岩：東アジア大陸縁における地殻進化,basement,01,黒雲母－角閃石片麻岩,Stop 1: 黒雲母－角閃石片麻岩と花崗岩脈,36.439167,137.216667,https://doi.org/10.5575/geosoc.2026.0012,"水上 知行, 三上 航大, 沢田 輝",飛騨変成岩類：黒雲母－角閃石片麻岩と花崗岩脈の観察
2026_飛騨帯_02_船津オバケダイク,2026,飛騨帯,飛騨帯の変成岩と深成岩：東アジア大陸縁における地殻進化,basement,02,船津オバケダイク,Stop 2: 船津の花崗岩とマフィック貫入岩”オバケダイク”,36.328139,137.300444,https://doi.org/10.5575/geosoc.2026.0012,"水上 知行, 三上 航大, 沢田 輝",飛騨深成岩類：船津の花崗岩とマフィック貫入岩”オバケダイク”の観察
2026_飛騨帯_03_神岡鉱山資料館,2026,飛騨帯,飛騨帯の変成岩と深成岩：東アジア大陸縁における地殻進化,basement,03,神岡鉱山資料館,Stop 3: 神岡鉱山資料館,36.3295,137.302333,https://doi.org/10.5575/geosoc.2026.0012,"水上 知行, 三上 航大, 沢田 輝",飛騨帯と神岡鉱山：鉱山資料館の見学
2026_飛騨帯_04_船津シア・ゾーン,2026,飛騨帯,飛騨帯の変成岩と深成岩：東アジア大陸縁における地殻進化,basement,04,船津シア・ゾーン,Stop 4: 船津シア・ゾーン,36.334722,137.298889,https://doi.org/10.5575/geosoc.2026.0012,"水上 知行, 三上 航大, 沢田 輝",飛騨深成岩類と船津シア・ゾーン：眼球花崗岩と非変形花崗岩脈の観察
2026_飛騨帯_05_吉ケ原,2026,飛騨帯,飛騨帯の変成岩と深成岩：東アジア大陸縁における地殻進化,basement,05,吉ケ原,Stop 5: 吉ケ原,36.358333,137.28875,https://doi.org/10.5575/geosoc.2026.0012,"水上 知行, 三上 航大, 沢田 輝",飛騨変成岩類：吉ケ原の伊西岩ミグマタイトおよびスカルンの観察
2026_飛騨帯_06_神岡町二ツ屋,2026,飛騨帯,飛騨帯の変成岩と深成岩：東アジア大陸縁における地殻進化,basement,06,神岡町二ツ屋,Stop 6: 神岡町二ツ屋,36.376111,137.276667,https://doi.org/10.5575/geosoc.2026.0012,"水上 知行, 三上 航大, 沢田 輝",飛騨変成岩類：神岡町二ツ屋のマグネシア質スカルン（石灰質変成岩）の観察
2026_大桑層_01_大桑貝殻橋,2026,大桑層,下部第四系大桑層に見られる堆積シーケンスと貝化石群集の周期的変化,sedimentary,01,大桑貝殻橋,Stop 1: 大桑貝殻橋,36.528333,136.681111,https://doi.org/10.5575/geosoc.2026.0020,北村 晃寿,大桑貝殻橋
2026_大桑層_02_大桑層中部の堆積シーケンス2,2026,大桑層,下部第四系大桑層に見られる堆積シーケンスと貝化石群集の周期的変化,sedimentary,02,大桑層中部の堆積シーケンス 2,Stop 2: 大桑層中部の堆積シーケンス 2,36.530278,136.683611,https://doi.org/10.5575/geosoc.2026.0020,北村 晃寿,大桑層中部の堆積シーケンス 2
2026_大桑層_03_大桑層上部の堆積シーケンスIV,2026,大桑層,下部第四系大桑層に見られる堆積シーケンスと貝化石群集の周期的変化,sedimentary,03,大桑層上部の堆積シーケンス IV,Stop 3: 大桑層上部の堆積シーケンス IV,36.534722,136.680278,https://doi.org/10.5575/geosoc.2026.0020,北村 晃寿,大桑層上部の堆積シーケンス IV
2026_能登半島地震_01_志賀町富来牛下,2026,能登半島地震,令和6年能登半島地震に伴う海岸隆起と地表変状,hazard_geo,01,志賀町富来牛下,Stop 1: 志賀町富来牛下（巌門）,37.09415,136.72715,https://doi.org/10.5575/geosoc.2026.0013,"立石 良, 安江 健一, ジェンキンズ ロバート",志賀町富来牛下：巌門の海食地形
2026_能登半島地震_02_輪島市門前町剱地,2026,能登半島地震,令和6年能登半島地震に伴う海岸隆起と地表変状,hazard_geo,02,輪島市門前町剱地,Stop 2: 輪島市門前町剱地（琴ヶ浜）,37.224931,136.703161,https://doi.org/10.5575/geosoc.2026.0013,"立石 良, 安江 健一, ジェンキンズ ロバート",輪島市門前町剱地：琴ヶ浜の柱状節理
2026_能登半島地震_03_輪島市門前町黒島町,2026,能登半島地震,令和6年能登半島地震に伴う海岸隆起と地表変状,hazard_geo,03,輪島市門前町黒島町,Stop 3: 輪島市門前町黒島町,37.282519,136.733981,https://doi.org/10.5575/geosoc.2026.0013,"立石 良, 安江 健一, ジェンキンズ ロバート",輪島市門前町黒島町：黒島周辺の隆起海岸
2026_能登半島地震_04_輪島市門前町鹿磯,2026,能登半島地震,令和6年能登半島地震に伴う海岸隆起と地表変状,hazard_geo,04,輪島市門前町鹿磯,Stop 4: 輪島市門前町鹿磯,37.294731,136.726531,https://doi.org/10.5575/geosoc.2026.0013,"立石 良, 安江 健一, ジェンキンズ ロバート",輪島市門前町鹿磯：鹿磯の隆起海岸と道下層
2026_能登半島地震_05_輪島市門前町吉浦,2026,能登半島地震,令和6年能登半島地震に伴う海岸隆起と地表変状,hazard_geo,05,輪島市門前町吉浦,Stop 5: 輪島市門前町吉浦,37.337619,136.739131,https://doi.org/10.5575/geosoc.2026.0013,"立石 良, 安江 健一, ジェンキンズ ロバート",輪島市門前町吉浦：吉浦～五十洲の隆起海岸
2026_弥陀ヶ原火山_01_ライオンズの森,2026,弥陀ヶ原火山,弥陀ヶ原火山,volcano,01,ライオンズの森,Stop 1: ライオンズの森,36.590556,137.420833,https://doi.org/10.5575/geosoc.2026.0011,"石﨑 泰男, 亀谷 伸子, 中村 文哉, 増渕 佳子",ライオンズの森：芦峅寺火砕流堆積物
2026_弥陀ヶ原火山_02_称名滝展望台,2026,弥陀ヶ原火山,弥陀ヶ原火山,volcano,02,称名滝展望台,Stop 2: 称名滝展望台,36.579444,137.508333,https://doi.org/10.5575/geosoc.2026.0011,"石﨑 泰男, 亀谷 伸子, 中村 文哉, 増渕 佳子",称名滝展望台：第 2 期活動の大規模火砕流堆積物
2026_弥陀ヶ原火山_03_ミクリガ池展望台,2026,弥陀ヶ原火山,弥陀ヶ原火山,volcano,03,ミクリガ池展望台,Stop 3: ミクリガ池展望台,36.581389,137.596111,https://doi.org/10.5575/geosoc.2026.0011,"石﨑 泰男, 亀谷 伸子, 中村 文哉, 増渕 佳子",ミクリガ池展望台：第 4 期の水蒸気噴火で形成された火口群
2026_弥陀ヶ原火山_04_室堂山登山道,2026,弥陀ヶ原火山,弥陀ヶ原火山,volcano,04,室堂山登山道,Stop 4: 室堂山登山道,36.57,137.6,https://doi.org/10.5575/geosoc.2026.0011,"石﨑 泰男, 亀谷 伸子, 中村 文哉, 増渕 佳子",室堂山登山道：玉殿溶岩
2026_弥陀ヶ原火山_05_室堂山展望台,2026,弥陀ヶ原火山,弥陀ヶ原火山,volcano,05,室堂山展望台,Stop 5: 室堂山展望台,36.568056,137.600556,https://doi.org/10.5575/geosoc.2026.0011,"石﨑 泰男, 亀谷 伸子, 中村 文哉, 増渕 佳子",室堂山展望台：五色ヶ原と立山カルデラ
```

### `data/map_catalog.json`（先頭 40 行 / 全 96013 行）

```json
[
  {
    "source": {
      "provider_id": "gsj_seamless_200k",
      "provider_name_ja": "産業技術総合研究所 地質調査総合センター",
      "provider_url": "https://gbank.gsj.jp/seamless/",
      "license": "CC BY 4.0（産総研 地質調査総合センター）",
      "attribution": "<a href=\"https://gbank.gsj.jp/seamless/\" target=\"_blank\" rel=\"noopener noreferrer\">産総研 地質調査総合センター「20万分の1日本シームレス地質図V2」(CC BY 4.0)</a>"
    },
    "map": {
      "map_id": "gsj_seamless_200k_jp",
      "local_id": "seamless_v2",
      "layer_name": "glfs",
      "map_name_ja": "20万分の1日本シームレス地質図V2",
      "map_name_en": "Seamless Digital Geological Map of Japan (1:200,000) V2",
      "map_type": "seamless_geological_map",
      "theme": "geology",
      "geometry_model": "continuous_polygon",
      "scale_denominator": 200000,
      "series": "20万分の1日本シームレス地質図",
      "published_year": 2023,
      "authors": [
        "産業技術総合研究所 地質調査総合センター"
      ],
      "authors_ja": [
        "産業技術総合研究所 地質調査総合センター"
      ],
      "authors_en": [
        "Geological Survey of Japan, AIST"
      ],
      "publisher": "産業技術総合研究所 地質調査総合センター",
      "publisher_ja": "産業技術総合研究所 地質調査総合センター",
      "publisher_en": "Geological Survey of Japan, AIST",
      "region": "全国",
      "prefectures": [],
      "bounds": [
        122.0,
        20.0,
        154.0,
        46.0
```
