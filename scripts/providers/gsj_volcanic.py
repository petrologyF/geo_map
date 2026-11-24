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
