#!/usr/bin/env python3
"""
Step 3: プロジェクト全体の監査・回帰テストスイート（Python データパイプライン & スキーマ整合性）。
"""

import json
import sys
import unittest
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.providers.gsj_50k import normalize_gsj_50k  # noqa: E402
from scripts.providers.hro_eeg import (  # noqa: E402
    is_duplicate_record,
     is_same_spatial_sheet,
    is_similar_sheet_name,
    merge_without_duplicates,
    normalize_hro_eeg,
)
from scripts.schema import validate_common_record  # noqa: E402


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


if __name__ == "__main__":
    unittest.main()
