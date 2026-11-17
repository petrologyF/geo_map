"""地質図共通スキーマの定数・バリデーション定義。"""

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
    m = record.get("map", {})
    disp = record.get("display", {})
    docs = record.get("documents", {})

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
        if key not in disp:
            raise ValueError(f"display.{key} がありません")

    tile_type = disp.get("tile_type")
    if tile_type not in TILE_TYPES:
        raise ValueError(f"不正な display.tile_type: {tile_type}")

    bounds = m.get("bounds")
    if bounds:
        if not is_valid_bounds(bounds):
            raise ValueError(f"不正な map.bounds（west < east, south < north が必要）: {bounds}")
    elif tile_type == "raster":
        raise ValueError("tile_type == 'raster' の場合は有効な map.bounds（4要素）が必須です")

    for key in ("light_pdf_url", "full_pdf_url"):
        if key not in docs:
            raise ValueError(f"documents.{key} がありません")
