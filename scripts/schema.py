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


def validate_common_record(record: dict) -> None:
    """共通スキーマの必須属性を検証する。"""
    m = record.get("map", {})
    disp = record.get("display", {})
    docs = record.get("documents", {})

    if m.get("map_type") not in MAP_TYPES:
        raise ValueError(f"不正な map_type: {m.get('map_type')}")
    if m.get("geometry_model") not in GEOMETRY_MODELS:
        raise ValueError(f"不正な geometry_model: {m.get('geometry_model')}")
    for key in ("scale_denominator",):
        if key not in m:
            raise ValueError(f"map.{key} がありません")
    for key in ("tile_type", "tile_url", "wms_url", "raster_image_url"):
        if key not in disp:
            raise ValueError(f"display.{key} がありません")
    for key in ("light_pdf_url", "full_pdf_url"):
        if key not in docs:
            raise ValueError(f"documents.{key} がありません")
