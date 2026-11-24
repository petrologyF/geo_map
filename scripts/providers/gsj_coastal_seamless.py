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
