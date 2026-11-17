"""産総研（GSJ）海陸シームレス地質図（沿岸域データセット）プロバイダアダプタ。"""

from scripts.providers.gsj_50k import build_polygon_geometry


def build_coastal_seamless_records() -> list[dict]:
    """沿岸域ごとの海陸シームレス地質図データセットを共通スキーマで返す。"""
    coastal_seeds = [
        {
            "local_id": "toyama_bay",
            "map_name_ja": "富山湾沿岸域 海陸シームレス地質図",
            "map_name_en": "Seamless Geological Map of Toyama Bay Coastal Zone",
            "scale_denominator": 200000,
            "published_year": 2021,
            "region": "富山県・石川県",
            "prefectures": ["富山県", "石川県"],
            "bounds": [136.85, 36.65, 137.65, 37.35],
            "center": [137.25, 37.00],
        },
        {
            "local_id": "ishikari_south",
            "map_name_ja": "石狩低地帯南部沿岸域 海陸シームレス地質図",
            "map_name_en": "Seamless Geological Map of Southern Ishikari Lowland Coastal Zone",
            "scale_denominator": 200000,
            "published_year": 2018,
            "region": "北海道",
            "prefectures": ["北海道"],
            "bounds": [141.15, 42.35, 142.05, 42.85],
            "center": [141.60, 42.60],
        },
        {
            "local_id": "fukuoka_coastal",
            "map_name_ja": "福岡沿岸域 海陸シームレス地質図",
            "map_name_en": "Seamless Geological Map of Fukuoka Coastal Zone",
            "scale_denominator": 200000,
            "published_year": 2016,
            "region": "福岡県",
            "prefectures": ["福岡県"],
            "bounds": [130.00, 33.45, 130.65, 33.95],
            "center": [130.325, 33.70],
        },
    ]

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
