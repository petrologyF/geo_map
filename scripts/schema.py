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
