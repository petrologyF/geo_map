#!/usr/bin/env python3
"""
GSJ 5万分の1地質図幅のメタデータから Leaflet 用 map_catalog.json（および任意の GeoJSON）を生成する。

使用例:
    python scripts/build_map_catalog.py --map-id 507 --output data/map_catalog.json

    python scripts/build_map_catalog.py --map-id 507 508 509 --output data/map_catalog.json --geojson-output data/map_index.geojson
"""

import argparse
import json
import logging
import re
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

BASE_URL = "https://gbank.gsj.jp/ld/resource/publication/map/{series}/map{map_id}.html"
USER_AGENT = "GeologicalMapWebGIS/0.1 (research use)"
logger = logging.getLogger(__name__)

_THREAD_LOCAL = threading.local()


class RateLimiter:
    """複数ワーカー間で共有するスレッドセーフなレートリミッター。"""

    def __init__(self, delay_sec: float) -> None:
        self.delay_sec = max(0.0, float(delay_sec))
        self._lock = threading.Lock()
        self._next_allowed = 0.0

    def wait(self) -> None:
        if self.delay_sec <= 0:
            return
        with self._lock:
            now = time.monotonic()
            if now < self._next_allowed:
                sleep_for = self._next_allowed - now
                self._next_allowed = self._next_allowed + self.delay_sec
            else:
                sleep_for = 0.0
                self._next_allowed = now + self.delay_sec
        if sleep_for > 0:
            time.sleep(sleep_for)


def create_retry_session() -> requests.Session:
    """429/5xx リトライ付きの requests.Session を生成する。"""
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    retry = Retry(
        total=3,
        backoff_factor=0.5,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["HEAD", "GET"],
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session


def get_http_session() -> requests.Session:
    """スレッドごとの Session を再利用する。"""
    session = getattr(_THREAD_LOCAL, "session", None)
    if session is None:
        session = create_retry_session()
        _THREAD_LOCAL.session = session
    return session


def fetch_text(url: str, session: requests.Session | None = None) -> str:
    """指定URLからHTMLテキストを取得する。"""
    sess = session or get_http_session()
    response = sess.get(url, timeout=30)
    response.raise_for_status()
    response.encoding = response.apparent_encoding or "utf-8"
    return response.text


def fetch_json(url: str, session: requests.Session | None = None) -> dict:
    """指定URLからJSONを取得する。"""
    sess = session or get_http_session()
    response = sess.get(url, timeout=30)
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


def extract_section_images(metadata_url: str, soup: BeautifulSoup) -> list[dict[str, str]]:
    """ページ内の断面図JPG（*_section_*.jpg）とラベルのリストを抽出する。"""
    sections: list[dict[str, str]] = []
    seen_urls: set[str] = set()

    for link in soup.find_all("a", href=True):
        href = urljoin(metadata_url, link["href"])
        if not re.search(r"_section_\d+\.jpe?g$", href, re.I) or href in seen_urls:
            continue
        seen_urls.add(href)

        label = ""
        row = link.find_parent("tr")
        if row:
            first_cell = row.find(["th", "td"])
            if first_cell:
                cell_text = clean_text(first_cell)
                match = re.search(r"Section:\s*([A-Za-z0-9'\-]+)", cell_text, re.I)
                if match:
                    label = match.group(1)

        if not label:
            label = f"断面図{len(sections) + 1}"

        sections.append({"label": label, "url": href})

    return sections


def check_url_exists(url: str, session: requests.Session | None = None) -> bool:
    """HEADリクエストでURLが存在するか（HTTP 200系）確認する。"""
    try:
        sess = session or get_http_session()
        response = sess.head(
            url,
            allow_redirects=True,
            timeout=5,
        )
        return response.status_code == 200
    except Exception:
        return False


def build_description_metadata(downloads: dict[str, str]) -> dict[str, str]:
    """downloads辞書から description (light_pdf_url / full_pdf_url / preferred_pdf) を構築する。"""
    light_pdf_url = downloads.get("pdf_light", "")
    full_pdf_url = ""

    for key, url in downloads.items():
        if key == "pdf_light":
            continue
        is_pdf_entry = key.upper() == "PDF" or url.lower().endswith(".pdf")
        if not is_pdf_entry:
            continue
        if "軽量" in key or "light" in key.lower() or re.search(r"_D-L\.pdf$|_(?:l|light|low)\.pdf$", url, re.I):
            if not light_pdf_url:
                light_pdf_url = url
        elif not full_pdf_url:
            full_pdf_url = url

    # _D.pdf がある場合に _D-L.pdf（軽量版）の存在も確認する
    if full_pdf_url and not light_pdf_url and re.search(r"_D\.pdf$", full_pdf_url, re.I):
        candidate_light = re.sub(r"_D\.pdf$", "_D-L.pdf", full_pdf_url, flags=re.I)
        if check_url_exists(candidate_light):
            light_pdf_url = candidate_light
            downloads["pdf_light"] = candidate_light

    preferred_pdf = light_pdf_url or full_pdf_url
    return {
        "light_pdf_url": light_pdf_url,
        "full_pdf_url": full_pdf_url,
        "preferred_pdf": preferred_pdf,
    }


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
    except Exception as exc:
        logger.warning("日本語カタログページの取得に失敗しました: %s (%s)", catalog_url, exc)
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
        cleaned_raw = re.sub(r"^[\s　]*[（(](.+)[）)][\s　]*$", r"\1", raw_authors.strip())
        authors = [
            re.sub(r"[\s　]+", " ", a).strip(" ()（）")
            if ("(" in a) != (")" in a) or ("（" in a) != ("）" in a)
            else re.sub(r"[\s　]+", " ", a).strip()
            for a in re.split(r"[・,、]", cleaned_raw)
            if a.strip()
        ]
        result["authors_ja"] = [a for a in authors if a]

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
    description = build_description_metadata(downloads)
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
        "section_images": extract_section_images(metadata_url, soup),
        "description": description,
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


def discover_series_map_ids(series: str) -> list[str]:
    """GSJ LD のシリーズ一覧ページからすべての map_id を抽出する。"""
    index_url = f"https://gbank.gsj.jp/ld/resource/publication/map/{series}/"
    html = fetch_text(index_url)
    ids = set(re.findall(rf"/{re.escape(series)}/map(\d+)", html))
    return sorted(ids, key=lambda x: int(x))


def main() -> None:
    parser = argparse.ArgumentParser(
        description="GSJ 5万分の1地質図幅のメタデータから Leaflet 用 map_catalog.json を生成する"
    )
    parser.add_argument(
        "--map-id",
        nargs="+",
        default=[],
        help="GSJ の map_id（例: 507 または 00507）",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="指定シリーズ一覧ページから全図幅の map_id を自動取得して収集する",
    )
    parser.add_argument(
        "--series",
        default="g050",
        help="GSJ のシリーズコード（例: g050=5万分の1, g200=20万分の1, g075=7.5万分の1）",
    )
    parser.add_argument(
        "--output",
        default="data/providers/gsj_50k_raw.json",
        help="出力する生のGSJ 5万分の1 JSONファイルのパス（既定: data/providers/gsj_50k_raw.json）",
    )
    parser.add_argument(
        "--geojson-output",
        default="",
        help="任意: bounds から図郭ポリゴンを生成して出力する GeoJSON ファイルのパス",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.2,
        help="複数図幅取得時のリクエスト間隔（秒）",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=8,
        help="並列取得のワーカー数（既定: 8）",
    )
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        help="既存の --output JSON に含まれる map_id の取得をスキップする",
    )
    parser.add_argument(
        "--error-log",
        default="",
        help="任意: 取得失敗URLとエラー詳細を保存する JSON ファイルパス",
    )
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

    target_ids: list[str] = list(args.map_id)
    if args.all:
        discovered = discover_series_map_ids(args.series)
        print(f"シリーズ {args.series} から {len(discovered)} 件の map_id を検出しました。")
        seen = set(target_ids)
        for mid in discovered:
            if mid not in seen:
                target_ids.append(mid)
                seen.add(mid)

    if not target_ids:
        parser.error("--map-id または --all のいずれかを指定してください。")

    output_path = Path(args.output)
    existing_records: list[dict] = []
    existing_ids: set[str] = set()
    if args.skip_existing and output_path.exists():
        try:
            existing_records = json.loads(output_path.read_text(encoding="utf-8"))
            existing_ids = {str(r.get("map_id")).zfill(5) for r in existing_records if r.get("map_id") is not None}
            before_count = len(target_ids)
            target_ids = [mid for mid in target_ids if str(mid).strip().zfill(5) not in existing_ids]
            print(f"--skip-existing: 既存 {len(existing_ids)} 件をスキップ（残り {len(target_ids)} / {before_count} 件）")
        except Exception as exc:
            logger.warning("既存ファイルの読み込みに失敗したため全件取得します: %s (%s)", output_path, exc)

    rate_limiter = RateLimiter(args.delay)

    def fetch_one(index: int, raw_map_id: str) -> tuple[int, str, dict | None, str]:
        padded_id = str(raw_map_id).strip().zfill(5)
        metadata_url = BASE_URL.format(series=args.series, map_id=padded_id)
        rate_limiter.wait()
        try:
            record = build_record(metadata_url, args.series)
            return index, metadata_url, record, ""
        except Exception as error:
            return index, metadata_url, None, str(error)

    indexed_records: list[tuple[int, dict]] = []
    errors: list[tuple[str, str]] = []

    if args.workers > 1:
        with ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = [
                executor.submit(fetch_one, idx, mid)
                for idx, mid in enumerate(target_ids)
            ]
            done_count = 0
            for future in as_completed(futures):
                idx, url, record, err = future.result()
                done_count += 1
                if record is not None:
                    indexed_records.append((idx, record))
                    if done_count % 50 == 0 or done_count == len(target_ids):
                        print(f"進捗: {done_count}/{len(target_ids)} (成功: {len(indexed_records)}, スキップ/エラー: {len(errors)})")
                else:
                    errors.append((url, err))
    else:
        for idx, mid in enumerate(target_ids):
            _, url, record, err = fetch_one(idx, mid)
            if record is not None:
                indexed_records.append((idx, record))
                print(f"  OK ({len(indexed_records)}): {record['map_name_en'] or record['layer_name']}")
            else:
                errors.append((url, err))
                print(f"  ERROR: {url} -> {err}")

    indexed_records.sort(key=lambda item: item[0])
    new_records: list[dict] = [rec for _, rec in indexed_records]
    records: list[dict] = existing_records + new_records

    if errors:
        print(f"スキップ/エラー件数: {len(errors)} 件（先頭5件）:")
        for url, err in errors[:5]:
            print(f"  - {url}: {err}")
        if args.error_log:
            err_path = Path(args.error_log)
            err_path.parent.mkdir(parents=True, exist_ok=True)
            err_payload = [{"url": url, "error": err} for url, err in errors]
            err_path.write_text(json.dumps(err_payload, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"エラーログを保存しました: {err_path}")

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

    print(f"取得成功: {len(records)} 件 / 対象: {len(target_ids)} 件")


if __name__ == "__main__":
    main()
