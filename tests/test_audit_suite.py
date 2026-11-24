#!/usr/bin/env python3
"""
Step 3: プロジェクト全体の監査・回帰テストスイート（Python データパイプライン & スキーマ整合性）。
"""

import csv
import json
import sys
import tempfile
import unittest
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.build_geojson import validate_unique_map_ids  # noqa: E402
from scripts.providers.field_trips import build_field_trips_geojson, load_field_trips_csv  # noqa: E402
from scripts.providers.gsj_50k import normalize_gsj_50k  # noqa: E402
from scripts.providers.hro_eeg import (  # noqa: E402
    is_duplicate_record,
    is_same_spatial_sheet,
    is_similar_sheet_name,
    merge_without_duplicates,
    normalize_hro_eeg,
)
from scripts.schema import validate_common_record, validate_field_trip_record  # noqa: E402


class TestSchemaAndProviders(unittest.TestCase):
    def setUp(self) -> None:
        self.catalog_path = PROJECT_ROOT / "data" / "map_catalog.json"
        self.geojson_path = PROJECT_ROOT / "data" / "map_index.geojson"
        self.catalog = json.loads(self.catalog_path.read_text(encoding="utf-8"))
        self.geojson = json.loads(self.geojson_path.read_text(encoding="utf-8"))

    def test_existing_data_passes_strict_validation(self) -> None:
        """既存の map_catalog.json と map_index.geojson の全件が厳格スキーマ検証を通過すること。"""
        self.assertGreaterEqual(len(self.catalog), 770)
        self.assertGreaterEqual(len(self.geojson["features"]), 769)
        for rec in self.catalog:
            validate_common_record(rec)
        for feat in self.geojson["features"]:
            validate_common_record(feat["properties"])

    def test_schema_rejects_missing_source_or_map_id(self) -> None:
        """source.provider_id や map.map_id が欠損しているレコードを拒否すること。"""
        base = json.loads(json.dumps(self.catalog[0]))
        base["source"]["provider_id"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(base)

        base2 = json.loads(json.dumps(self.catalog[0]))
        base2["map"]["map_id"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(base2)

    def test_schema_rejects_empty_url_when_tile_type_requires_it(self) -> None:
        """tile_type が xyz/wms/raster のとき対応するURLが空なら拒否すること。"""
        xyz_rec = json.loads(json.dumps(self.catalog[1]))
        xyz_rec["display"]["tile_type"] = "xyz"
        xyz_rec["display"]["tile_url"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(xyz_rec)

        wms_rec = json.loads(json.dumps(self.catalog[0]))
        wms_rec["display"]["tile_type"] = "wms"
        wms_rec["display"]["wms_url"] = ""
        with self.assertRaises(ValueError):
            validate_common_record(wms_rec)

    def test_hro_similar_name_does_not_false_positive_distinct_places(self) -> None:
        """「大町」と「大町温泉」、「福岡」と「福岡西部」のような別図幅を誤って同一視しないこと。"""
        self.assertTrue(is_similar_sheet_name("5万分の1地質図幅「恵庭」", "恵庭岳"))
        self.assertFalse(is_similar_sheet_name("大町", "大町温泉"))
        self.assertFalse(is_similar_sheet_name("福岡", "福岡西部"))

    def test_hro_spatial_sheet_handles_malformed_bounds(self) -> None:
        """bounds に None や不正値が含まれていてもクラッシュせず False を返すこと。"""
        self.assertFalse(is_same_spatial_sheet([None, 36.0, 138.0, 36.5], [137.5, 36.0, 138.0, 36.5]))
        self.assertFalse(is_same_spatial_sheet(["a", "b", "c", "d"], [137.5, 36.0, 138.0, 36.5]))

    def test_hro_deduplicates_internal_hro_duplicates(self) -> None:
        """HROレコード同士の重複も排除されること。"""
        h1 = normalize_hro_eeg({"local_id": "101", "map_name_ja": "恵庭", "published_year": 1980, "bounds": [141.2, 42.8, 141.5, 43.0]})
        h2 = normalize_hro_eeg({"local_id": "101_dup", "map_name_ja": "恵庭岳", "published_year": "1981", "bounds": [141.2, 42.8, 141.5, 43.0]})
        merged = merge_without_duplicates([], [h1, h2])
        self.assertEqual(len(merged), 1)

    def test_gsj_50k_normalizes_string_year(self) -> None:
        """normalize_gsj_50k が文字列の published_year を int に正規化すること。"""
        raw = {
            "map_id": 999,
            "layer_name": "G50_test",
            "map_name_ja": "テスト",
            "published_year": "1995年",
            "bounds": [137.0, 36.0, 137.25, 36.16],
        }
        norm = normalize_gsj_50k(raw)
        self.assertEqual(norm["map"]["published_year"], 1995)
        validate_common_record(norm)

    def test_schema_rejects_invalid_http_urls_and_duplicate_map_ids(self) -> None:
        """非空URLが http/https 以外の場合や、重複 map_id を拒否すること。"""
        rec = json.loads(json.dumps(self.catalog[1]))
        rec["documents"]["light_pdf_url"] = "javascript:alert(1)"
        with self.assertRaises(ValueError):
            validate_common_record(rec)

        rec_a = json.loads(json.dumps(self.catalog[0]))
        rec_b = json.loads(json.dumps(self.catalog[0]))
        with self.assertRaises(ValueError):
            validate_unique_map_ids([rec_a, rec_b])

    def test_hro_does_not_mark_different_scale_as_duplicate(self) -> None:
        """縮尺が大きく異なるレコードは空間的に近くても重複とみなさないこと。"""
        gsj = normalize_gsj_50k({
            "map_id": 100,
            "layer_name": "G50_test",
            "map_name_ja": "恵庭",
            "published_year": 1980,
            "bounds": [141.2, 42.8, 141.5, 43.0],
        })
        hro_200k = normalize_hro_eeg({
            "local_id": "200k_1",
            "map_name_ja": "札幌",
            "published_year": 1980,
            "scale_denominator": 200000,
            "bounds": [141.2, 42.8, 141.5, 43.0],
        })
        self.assertFalse(is_duplicate_record(gsj, hro_200k))


class TestFieldTrips(unittest.TestCase):
    def setUp(self) -> None:
        self.csv_path = PROJECT_ROOT / "data" / "field_trips.csv"
        self.geojson_path = PROJECT_ROOT / "data" / "field_trips.geojson"

    def test_field_trips_csv_and_geojson_are_valid_and_in_sync(self) -> None:
        """data/field_trips.csv と data/field_trips.geojson がスキーマ検証を通過し件数・IDが一致すること。"""
        self.assertTrue(self.csv_path.exists())
        self.assertTrue(self.geojson_path.exists())

        records = load_field_trips_csv(self.csv_path)
        self.assertGreaterEqual(len(records), 4)

        geojson = json.loads(self.geojson_path.read_text(encoding="utf-8"))
        self.assertEqual(geojson.get("type"), "FeatureCollection")
        features = geojson.get("features", [])
        self.assertEqual(len(features), len(records))

        for rec, feat in zip(records, features):
            self.assertEqual(feat.get("type"), "Feature")
            geom = feat.get("geometry", {})
            self.assertEqual(geom.get("type"), "Point")
            self.assertEqual(geom.get("coordinates"), [rec["lon"], rec["lat"]])
            props = feat.get("properties", {})
            self.assertEqual(props.get("id"), rec["id"])
            validate_field_trip_record({**props, "lat": geom["coordinates"][1], "lon": geom["coordinates"][0]})

    def test_field_trip_validation_rejects_invalid_records(self) -> None:
        """不正な ID・緯度経度・URL を拒否すること。"""
        valid = {
            "id": "2025_松本盆地_01_城山公園",
            "year": 2025,
            "course_abbr": "松本盆地",
            "course_name": "松本盆地東縁断層帯と第四系",
            "category": "hazard_geo",
            "stop_no": "01",
            "stop_abbr": "城山公園",
            "stop_name": "Stop 1: 城山公園露頭",
            "lat": 36.2456,
            "lon": 137.9682,
            "guidebook_url": "https://example.com/guide.pdf",
            "description": "テスト",
        }
        validate_field_trip_record(valid)

        bad_cat = {**valid, "category": "unknown_category"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_cat)

        bad_id = {**valid, "id": "invalid-id"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_id)

        bad_lat = {**valid, "lat": 95.0}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_lat)

        bad_lon = {**valid, "lon": 185.0}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_lon)

        bad_url = {**valid, "guidebook_url": "javascript:alert(1)"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(bad_url)

        empty_url = {**valid, "guidebook_url": ""}
        validate_field_trip_record(empty_url)

        mismatch_year = {**valid, "year": 2024}
        with self.assertRaises(ValueError):
            validate_field_trip_record(mismatch_year)

        mismatch_course = {**valid, "course_abbr": "別コース"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(mismatch_course)

        mismatch_stop = {**valid, "stop_no": "02"}
        with self.assertRaises(ValueError):
            validate_field_trip_record(mismatch_stop)

    def test_field_trip_csv_rejects_duplicate_ids(self) -> None:
        """重複 ID を含む CSV を拒否すること。"""
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp_csv = Path(tmpdir) / "dup.csv"
            tmp_geojson = Path(tmpdir) / "dup.geojson"
            with tmp_csv.open("w", encoding="utf-8", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(["id", "year", "course_abbr", "course_name", "category", "authors", "stop_no", "stop_abbr", "stop_name", "lat", "lon", "guidebook_url", "description"])
                writer.writerow(["2025_A_01_X", "2025", "A", "Course A", "volcano", "Author A", "01", "X", "Stop X", "36.0", "138.0", "", ""])
                writer.writerow(["2025_A_01_X", "2025", "A", "Course A", "volcano", "Author A", "01", "X", "Stop X", "36.1", "138.1", "", ""])
            with self.assertRaisesRegex(ValueError, "重複"):
                build_field_trips_geojson(tmp_csv, tmp_geojson)

    def test_field_trip_csv_rejects_inconsistent_course_category(self) -> None:
        """同一コース内で異なる category が混在する CSV を拒否すること。"""
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp_csv = Path(tmpdir) / "mixed.csv"
            tmp_geojson = Path(tmpdir) / "mixed.geojson"
            with tmp_csv.open("w", encoding="utf-8", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(["id", "year", "course_abbr", "course_name", "category", "authors", "stop_no", "stop_abbr", "stop_name", "lat", "lon", "guidebook_url", "description"])
                writer.writerow(["2025_A_01_X", "2025", "A", "Course A", "volcano", "Author A", "01", "X", "Stop X", "36.0", "138.0", "", ""])
                writer.writerow(["2025_A_02_Y", "2025", "A", "Course A", "basement", "Author A", "02", "Y", "Stop Y", "36.1", "138.1", "", ""])
            with self.assertRaisesRegex(ValueError, "category"):
                build_field_trips_geojson(tmp_csv, tmp_geojson)

    def test_review_bundle_exists_and_contains_sections(self) -> None:
        """REVIEW_BUNDLE.md が存在し、主要セクションを含むこと。"""
        bundle_path = PROJECT_ROOT / "REVIEW_BUNDLE.md"
        self.assertTrue(bundle_path.exists())
        content = bundle_path.read_text(encoding="utf-8")
        self.assertIn("REVIEW_BUNDLE", content)
        self.assertIn("巡検コース一覧", content)


if __name__ == "__main__":
    unittest.main()
