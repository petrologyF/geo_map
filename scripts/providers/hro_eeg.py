"""北海道立総合研究機構（エネルギー・環境・地質研究所）プロバイダアダプタ。"""

import re


def to_int_year(value) -> int | None:
    """発行年を安全に整数へ変換する。"""
    if isinstance(value, bool):
        return None
    if isinstance(value, int):
        return value
    if isinstance(value, str):
        match = re.search(r"\d{4}", value)
        if match:
            return int(match.group(0))
    return None


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
