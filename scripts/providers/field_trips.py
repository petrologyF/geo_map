"""日本地質学会 巡検スポット（CSV -> GeoJSON）変換・検証アダプタ。"""

import csv
import json
from pathlib import Path

from scripts.schema import validate_field_trip_record

REQUIRED_CSV_COLUMNS = (
    "id",
    "year",
    "course_abbr",
    "course_name",
    "category",
    "stop_no",
    "stop_abbr",
    "stop_name",
    "lat",
    "lon",
    "guidebook_url",
    "authors",
    "description",
)


def parse_field_trip_row(row: dict, row_num: int) -> dict:
    """CSV の1行を正規化し、型変換した巡検レコード辞書を返す。"""
    raw_year = (row.get("year") or "").strip()
    try:
        year = int(raw_year)
    except ValueError as exc:
        raise ValueError(f"行 {row_num}: year を整数に変換できません: {raw_year!r}") from exc

    raw_lat = (row.get("lat") or "").strip()
    raw_lon = (row.get("lon") or "").strip()
    try:
        lat = float(raw_lat)
        lon = float(raw_lon)
    except ValueError as exc:
        raise ValueError(f"行 {row_num}: lat/lon を数値に変換できません: lat={raw_lat!r}, lon={raw_lon!r}") from exc

    record = {
        "id": (row.get("id") or "").strip(),
        "year": year,
        "course_abbr": (row.get("course_abbr") or "").strip(),
        "course_name": (row.get("course_name") or "").strip(),
        "category": (row.get("category") or "").strip(),
        "stop_no": (row.get("stop_no") or "").strip(),
        "stop_abbr": (row.get("stop_abbr") or "").strip(),
        "stop_name": (row.get("stop_name") or "").strip(),
        "lat": lat,
        "lon": lon,
        "guidebook_url": (row.get("guidebook_url") or "").strip(),
        "authors": (row.get("authors") or "").strip(),
        "description": (row.get("description") or "").strip(),
    }
    validate_field_trip_record(record)
    return record


def load_field_trips_csv(csv_path: Path) -> list[dict]:
    """field_trips.csv を読み込み、全件スキーマ検証・重複チェックして返す。"""
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV ファイルが見つかりません: {csv_path}")

    records: list[dict] = []
    seen_ids: set[str] = set()
    course_categories: dict[tuple[int, str], str] = {}

    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            raise ValueError(f"CSV にヘッダー行がありません: {csv_path}")

        missing_cols = [col for col in REQUIRED_CSV_COLUMNS if col not in reader.fieldnames]
        if missing_cols:
            raise ValueError(f"CSV に必須カラムが不足しています: {missing_cols}")

        for row_num, row in enumerate(reader, start=2):
            if not any((v or "").strip() for v in row.values()):
                continue
            record = parse_field_trip_row(row, row_num)
            if record["id"] in seen_ids:
                raise ValueError(f"行 {row_num}: 巡検 ID が重複しています: {record['id']}")
            course_key = (record["year"], record["course_abbr"])
            prev_cat = course_categories.get(course_key)
            if prev_cat is not None and prev_cat != record["category"]:
                raise ValueError(
                    f"行 {row_num}: 同一コース（{course_key[0]}_{course_key[1]}）内で category が一致しません: {prev_cat} != {record['category']}"
                )
            course_categories[course_key] = record["category"]
            seen_ids.add(record["id"])
            records.append(record)

    return records


def build_field_trips_geojson(csv_path: Path, geojson_path: Path) -> list[dict]:
    """CSV を検証し GeoJSON FeatureCollection として書き出す。"""
    records = load_field_trips_csv(csv_path)
    features = []
    for rec in records:
        props = {
            "id": rec["id"],
            "year": rec["year"],
            "course_abbr": rec["course_abbr"],
            "course_name": rec["course_name"],
            "category": rec["category"],
            "stop_no": rec["stop_no"],
            "stop_abbr": rec["stop_abbr"],
            "stop_name": rec["stop_name"],
            "guidebook_url": rec["guidebook_url"],
            "authors": rec["authors"],
            "description": rec["description"],
        }
        features.append(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [rec["lon"], rec["lat"]],
                },
                "properties": props,
            }
        )

    geojson_path.write_text(
        json.dumps({"type": "FeatureCollection", "features": features}, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    return records
