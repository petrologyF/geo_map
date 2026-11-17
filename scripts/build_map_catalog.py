#!/usr/bin/env python3
"""
GSJ 5万分の1地質図幅のメタデータから Leaflet 用 map_catalog.json（および任意の GeoJSON）を生成する。

使用例:
    python scripts/build_map_catalog.py --map-id 507 --output data/map_catalog.json

    python scripts/build_map_catalog.py --map-id 507 508 509 --output data/map_catalog.json --geojson-output data/map_index.geojson
"""

import argparse
import json
import re
import time
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://gbank.gsj.jp/ld/resource/publication/map/{series}/map{map_id}.html"
USER_AGENT = "GeologicalMapWebGIS/0.1 (research use)"


def fetch_text(url: str) -> str:
    """指定URLからHTMLテキストを取得する。"""
    response = requests.get(
        url,
        headers={"User-Agent": USER_AGENT},
        timeout=30,
    )
    response.raise_for_status()
    response.encoding = response.apparent_encoding or "utf-8"
    return response.text


def fetch_json(url: str) -> dict:
    """指定URLからJSONを取得する。"""
    response = requests.get(
        url,
        headers={"User-Agent": USER_AGENT},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def clean_text(value) -> str:
    """BeautifulSoup要素から余分な空白を除いたテキストを抽出する。"""
    if value is None:
        return ""
    return re.sub(r"\s+", " ", value.get_text(" ", strip=True)).strip()


def find_table_row(table, key: str):
    """表内の左側セルが key と一致する行の残りセルを返す。"""
    for row in table.find_all("tr"):
        cells = row.find_all(["th", "td"])
        if len(cells) >= 2 and clean_text(cells[0]) == key:
            return cells[1:]
    return None


def extract_tilejson_url(metadata_url: str, soup: BeautifulSoup) -> str | None:
    """HTML内の表から TileJSON URL を抽出する。"""
    for table in soup.find_all("table"):
        cells = find_table_row(table, "TileJSON")
        if cells:
            link = cells[0].find("a", href=True)
            if link:
                return urljoin(metadata_url, link["href"])

            text = clean_text(cells[0])
            match = re.search(r"https?://\S+\.json", text)
            if match:
                return match.group(0)

    return None


def extract_download_links(metadata_url: str, soup: BeautifulSoup) -> dict[str, str]:
    """ダウンロード表（最内テーブル）から各種フォーマットのリンクを抽出する。"""
    downloads: dict[str, str] = {}
    download_table = None

    for table in soup.find_all("table"):
        if table.find("table"):
            continue
        if find_table_row(table, "PDF"):
            download_table = table
            break

    if not download_table:
        return downloads

    for row in download_table.find_all("tr"):
        cells = row.find_all(["th", "td"])
        if len(cells) < 3:
            continue

        label = clean_text(cells[0])
        link = cells[2].find("a", href=True)

        if label and link:
            url = urljoin(metadata_url, link["href"])
            downloads.setdefault(label, url)
            if "軽量" in label or "light" in label.lower() or re.search(r"_(?:l|light|low)\.pdf$", url, re.I):
                downloads.setdefault("pdf_light", url)

    return downloads


def extract_original_image_url(metadata_url: str, soup: BeautifulSoup) -> str:
    """ページ内の原図JPG（*_org_*.jpg）URLを抽出する。"""
    for link in soup.find_all("a", href=True):
        href = urljoin(metadata_url, link["href"])
        if re.search(r"_org_\d+\.jpe?g$", href, re.I):
            return href
    return ""


def extract_related_links(metadata_url: str, soup: BeautifulSoup) -> dict[str, str]:
    """関連リソース（文献・シリーズ・Viewer）のリンクを抽出する。"""
    related: dict[str, str] = {}

    for table in soup.find_all("table"):
        for row in table.find_all("tr"):
            cells = row.find_all(["th", "td"])
            if len(cells) < 3:
                continue

            category = clean_text(cells[0])
            link = cells[-1].find("a", href=True)
            if not link:
                continue

            url = urljoin(metadata_url, link["href"])

            if category == "文献":
                related["literature_uri"] = url
            elif category == "出版物シリーズ":
                related["series_uri"] = url
            elif category == "Viewer":
                related["viewer_url"] = url

    return related


def extract_japanese_metadata(catalog_url: str) -> dict:
    """GSJ日本語カタログページから図幅名・著者名・発行者（日本語）を抽出する。"""
    result = {
        "map_name_ja": "",
        "authors_ja": [],
        "publisher_ja": "",
        "series_ja": "",
    }
    if not catalog_url:
        return result

    try:
        html = fetch_text(catalog_url)
        soup = BeautifulSoup(html, "html.parser")
    except Exception:
        return result

    kv: dict[str, str] = {}
    for row in soup.find_all("tr"):
        cells = row.find_all(["th", "td"])
        if len(cells) >= 2:
            key = re.sub(r"\s+", "", clean_text(cells[0]))
            val = clean_text(cells[1])
            if key and val and key not in kv:
                kv[key] = val

    raw_title = kv.get("図名", "")
    series_ja = kv.get("シリーズ名", "")
    if raw_title:
        # 例: "槍ヶ岳　YARIGATAKE" -> 日本語名部分を抽出
        ja_part = re.sub(r"[\s　]+[A-Za-z0-9'\-\s,()]+$", "", raw_title).strip()
        map_title = ja_part or raw_title
        result["map_name_ja"] = f"{series_ja}「{map_title}」" if series_ja else map_title

    raw_authors = kv.get("著者", "")
    if raw_authors:
        authors = [
            re.sub(r"[\s　]+", " ", a).strip()
            for a in re.split(r"[・,、]", raw_authors)
            if a.strip()
        ]
        result["authors_ja"] = authors

    result["publisher_ja"] = kv.get("発行者", "")
    result["series_ja"] = series_ja
    return result


def infer_scale(series_code: str, series_en: str) -> str:
    """シリーズコードまたは英語シリーズ名から縮尺表記を推定する。"""
    match = re.search(r"1\s*:\s*[\d,]+", series_en or "")
    if match:
        return re.sub(r"\s+", "", match.group(0))
    code_map = {
        "g050": "1:50,000",
        "g075": "1:75,000",
        "g200": "1:200,000",
        "g500": "1:500,000",
        "g1000": "1:1,000,000",
    }
    return code_map.get(series_code.lower(), series_code)


def build_record(metadata_url: str, series_code: str = "g050") -> dict:
    """メタデータHTMLとTileJSONを取得し、カタログレコード辞書を構築する。"""
    metadata_html = fetch_text(metadata_url)
    soup = BeautifulSoup(metadata_html, "html.parser")

    tilejson_url = extract_tilejson_url(metadata_url, soup)
    if not tilejson_url:
        raise ValueError(f"TileJSON URL が見つかりません: {metadata_url}")

    tilejson = fetch_json(tilejson_url)
    properties = tilejson.get("properties", {})

    map_id = properties.get("map_id")
    layer_name = properties.get("layer_name")

    if not map_id or not layer_name:
        raise ValueError(f"TileJSON に map_id / layer_name がありません: {tilejson_url}")

    main_table = soup.find("table")
    if main_table is None:
        raise ValueError(f"メタデータ表が見つかりません: {metadata_url}")

    def row_value(key: str) -> str:
        cells = find_table_row(main_table, key)
        return clean_text(cells[0]) if cells else ""

    map_name_en = row_value("Map name")
    series_en = row_value("Series")
    authors_en = [
        author.strip()
        for author in row_value("Author").split(",")
        if author.strip()
    ]
    published_year = row_value("Publish year")
    publisher_en = row_value("Publisher")
    volume = row_value("Tribute")

    tiles = tilejson.get("tiles", [])
    webp_template = tiles[0] if tiles else ""

    alternate = properties.get("alternate_tile_templates", {})
    png_templates = alternate.get("png", [])
    xyz_templates = alternate.get("xyz", [])
    tms_templates = alternate.get("tms", [])

    png_template = png_templates[0]["template"] if png_templates else ""
    xyz_template = xyz_templates[0]["template"] if xyz_templates else ""
    tms_template = tms_templates[0]["template"] if tms_templates else ""

    bounds = tilejson.get("bounds", [])
    center = tilejson.get("center", [])

    center_lon = center[0] if len(center) > 0 else None
    center_lat = center[1] if len(center) > 1 else None
    default_zoom = center[2] if len(center) > 2 else 11

    downloads = extract_download_links(metadata_url, soup)
    related = extract_related_links(metadata_url, soup)
    catalog_url = properties.get("map_catalogue_url", "")
    ja_meta = extract_japanese_metadata(catalog_url)

    return {
        "map_id": map_id,
        "layer_name": layer_name,
        "scale": infer_scale(series_code, series_en),
        "map_name_ja": ja_meta["map_name_ja"],
        "map_name_en": map_name_en,
        "series_ja": ja_meta["series_ja"],
        "series_en": series_en,
        "authors_ja": ja_meta["authors_ja"],
        "authors_en": authors_en,
        "published_year": int(published_year) if published_year.isdigit() else published_year,
        "publisher_ja": ja_meta["publisher_ja"],
        "publisher_en": publisher_en,
        "volume": volume,
        "metadata_url": metadata_url,
        "tilejson_url": tilejson_url,
        "tile": {
            "type": "xyz",
            "scheme": tilejson.get("scheme", "xyz"),
            "webp_template": webp_template,
            "png_template": png_template,
            "xyz_template": xyz_template,
            "tms_template": tms_template,
            "min_zoom": tilejson.get("minzoom"),
            "max_zoom": tilejson.get("maxzoom"),
            "bounds": bounds,
            "center": [center_lon, center_lat],
            "default_zoom": default_zoom,
        },
        "legend_image_url": tilejson.get("legend", ""),
        "original_image_url": extract_original_image_url(metadata_url, soup),
        "section_images": [],
        "downloads": downloads,
        "related_resources": {
            "publication_uri": properties.get("map_uri", metadata_url),
            "literature_uri": related.get("literature_uri", ""),
            "series_uri": related.get("series_uri", ""),
            "viewer_url": related.get("viewer_url", ""),
            "catalog_url": properties.get("map_catalogue_url", ""),
        },
        "license": {
            "name": "政府標準利用規約（第2.0版）準拠",
            "attribution": "産業技術総合研究所 地質調査総合センター",
            "source_url": "https://www.gsj.jp/license/license.html",
        },
        "is_tile_available": bool(webp_template or png_template or xyz_template),
        "is_wms_available": False,
    }


def record_to_geojson_feature(record: dict) -> dict | None:
    """カタログレコードの tile.bounds から GeoJSON Feature を生成する。"""
    bounds = record.get("tile", {}).get("bounds", [])
    if not isinstance(bounds, list) or len(bounds) != 4:
        return None

    west, south, east, north = bounds
    return {
        "type": "Feature",
        "geometry": {
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
        },
        "properties": record,
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="GSJ 5万分の1地質図幅のメタデータから Leaflet 用 map_catalog.json を生成する"
    )
    parser.add_argument(
        "--map-id",
        nargs="+",
        required=True,
        help="GSJ の map_id（例: 507 または 00507）",
    )
    parser.add_argument(
        "--series",
        default="g050",
        help="GSJ のシリーズコード（例: g050=5万分の1, g200=20万分の1, g075=7.5万分の1）",
    )
    parser.add_argument(
        "--output",
        default="data/map_catalog.json",
        help="出力するJSONファイルのパス",
    )
    parser.add_argument(
        "--geojson-output",
        default="",
        help="任意: bounds から図郭ポリゴンを生成して出力する GeoJSON ファイルのパス",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="複数図幅取得時のリクエスト間隔（秒）",
    )
    args = parser.parse_args()

    records: list[dict] = []

    for index, raw_map_id in enumerate(args.map_id):
        padded_id = str(raw_map_id).strip().zfill(5)
        metadata_url = BASE_URL.format(series=args.series, map_id=padded_id)
        print(f"取得中: {metadata_url}")

        try:
            record = build_record(metadata_url, args.series)
            records.append(record)
            print(f"  OK: {record['map_name_en'] or record['layer_name']}")
        except Exception as error:
            print(f"  ERROR: {error}")

        if index < len(args.map_id) - 1 and args.delay > 0:
            time.sleep(args.delay)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(records, file, ensure_ascii=False, indent=2)

    print(f"保存しました: {output_path}")

    if args.geojson_output:
        features = [
            feature
            for feature in (record_to_geojson_feature(rec) for rec in records)
            if feature is not None
        ]
        geojson_path = Path(args.geojson_output)
        geojson_path.parent.mkdir(parents=True, exist_ok=True)
        with geojson_path.open("w", encoding="utf-8") as file:
            json.dump(
                {"type": "FeatureCollection", "features": features},
                file,
                ensure_ascii=False,
                indent=2,
            )
        print(f"GeoJSON を保存しました: {geojson_path}")

    print(f"取得成功: {len(records)} 件 / 対象: {len(args.map_id)} 件")


if __name__ == "__main__":
    main()
