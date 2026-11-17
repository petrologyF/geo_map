"""北海道立総合研究機構（エネルギー・環境・地質研究所）プロバイダアダプタ。"""

import re


def normalize_sheet_key(name: str) -> str:
    """重複判定用に図幅名からシリーズ接頭辞や括弧を取り除いたキーを返す。"""
    cleaned = re.sub(r"^.*?「([^」]+)」.*$", r"\1", name or "")
    cleaned = re.sub(r"[\s　]+", "", cleaned)
    return cleaned.lower()


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
            "scale_denominator": raw.get("scale_denominator", 50000),
            "series": raw.get("series", "5万分の1地質図幅（北海道）"),
            "published_year": raw.get("published_year"),
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
    """GSJカタログを優先し、重複する北海道総研レコードを除外して結合する。"""
    existing_keys = set()
    for rec in gsj_records:
        m = rec.get("map", {})
        key = (normalize_sheet_key(m.get("map_name_ja", "")), m.get("published_year"))
        existing_keys.add(key)

    merged = list(gsj_records)
    for rec in hro_records:
        m = rec.get("map", {})
        key = (normalize_sheet_key(m.get("map_name_ja", "")), m.get("published_year"))
        if key not in existing_keys:
            existing_keys.add(key)
            merged.append(rec)

    return merged
