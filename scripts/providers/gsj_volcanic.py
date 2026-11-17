"""産総研（GSJ）火山地質図プロバイダアダプタ。"""

from scripts.providers.gsj_50k import build_polygon_geometry


def build_volcanic_records() -> list[dict]:
    """代表的な火山地質図（焼岳・御嶽山・富士山）の共通スキーマレコード群を返す。"""
    volcanic_seeds = [
        {
            "local_id": "v_yakedake",
            "map_name_ja": "焼岳火山地質図",
            "map_name_en": "Geological Map of Yakedake Volcano",
            "volcano_name_ja": "焼岳",
            "volcano_name_en": "Yakedake",
            "scale_denominator": 25000,
            "published_year": 2016,
            "authors_ja": ["及川 輝樹"],
            "authors_en": ["OIKAWA Teruki"],
            "region": "長野県・岐阜県",
            "prefectures": ["長野県", "岐阜県"],
            "bounds": [137.54, 36.18, 137.65, 36.27],
            "center": [137.595, 36.225],
            "catalog_url": "https://www.gsj.jp/Map/JP/volcano.html",
        },
        {
            "local_id": "v_ontake",
            "map_name_ja": "御嶽山火山地質図",
            "map_name_en": "Geological Map of Ontake Volcano",
            "volcano_name_ja": "御嶽山",
            "volcano_name_en": "Ontake",
            "scale_denominator": 50000,
            "published_year": 2016,
            "authors_ja": ["及川 輝樹", "石塚 吉浩", "竹内 晋吾", "松本 哲一"],
            "authors_en": ["OIKAWA Teruki", "ISHIZUKA Yoshihiro", "TAKEUCHI Shingo", "MATSUMOTO Akikazu"],
            "region": "長野県・岐阜県",
            "prefectures": ["長野県", "岐阜県"],
            "bounds": [137.38, 35.80, 137.60, 35.98],
            "center": [137.49, 35.89],
            "catalog_url": "https://www.gsj.jp/Map/JP/volcano.html",
        },
        {
            "local_id": "v_fuji",
            "map_name_ja": "富士火山地質図（第2版）",
            "map_name_en": "Geological Map of Fuji Volcano (2nd Edition)",
            "volcano_name_ja": "富士山",
            "volcano_name_en": "Fuji",
            "scale_denominator": 50000,
            "published_year": 2016,
            "authors_ja": ["高田 亮", "山元 孝広", "石塚 吉浩", "中野 俊"],
            "authors_en": ["TAKADA Akira", "YAMAMOTO Takahiro", "ISHIZUKA Yoshihiro", "NAKANO Shun"],
            "region": "山梨県・静岡県",
            "prefectures": ["山梨県", "静岡県"],
            "bounds": [138.58, 35.24, 138.92, 35.52],
            "center": [138.75, 35.38],
            "catalog_url": "https://www.gsj.jp/Map/JP/volcano.html",
        },
    ]

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
