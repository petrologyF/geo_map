"""産総研（GSJ）5万分の1地質図幅プロバイダアダプタ。"""


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
            "published_year": raw.get("published_year"),
            "authors": raw.get("authors_ja") or raw.get("authors_en") or [],
            "authors_ja": raw.get("authors_ja") or [],
            "authors_en": raw.get("authors_en") or [],
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
