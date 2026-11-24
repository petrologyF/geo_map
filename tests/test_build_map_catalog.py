#!/usr/bin/env python3
"""scripts/build_map_catalog.py およびシード外部化プロバイダの単体テスト。"""

import sys
import unittest
from pathlib import Path
from unittest.mock import patch

from bs4 import BeautifulSoup

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.build_map_catalog import (  # noqa: E402
    build_description_metadata,
    extract_download_links,
    extract_japanese_metadata,
    extract_section_images,
    extract_tilejson_url,
)
from scripts.providers.gsj_coastal_seamless import build_coastal_seamless_records  # noqa: E402
from scripts.providers.gsj_volcanic import build_volcanic_records  # noqa: E402
from scripts.schema import validate_common_record  # noqa: E402

SAMPLE_METADATA_HTML = """
<html><body>
<table>
  <tr><th>Map name</th><td>YARIGATAKE</td></tr>
  <tr><th>TileJSON</th><td><a href="../tile/00507.json">tilejson</a></td></tr>
</table>
<table>
  <tr><th>Category</th><th>Format</th><th>Link</th></tr>
  <tr><td>PDF（軽量版）</td><td>PDF</td><td><a href="files/map507_D-L.pdf">download</a></td></tr>
  <tr><td>PDF</td><td>PDF</td><td><a href="files/map507_D.pdf">download</a></td></tr>
  <tr><td>Section: A-A'</td><td>JPG</td><td><a href="files/map507_section_01.jpg">section</a></td></tr>
</table>
</body></html>
"""

SAMPLE_JA_CATALOG_HTML = """
<html><body>
<table>
  <tr><th>図名</th><td>槍ヶ岳　YARIGATAKE</td></tr>
  <tr><th>シリーズ名</th><td>5万分の1地質図幅</td></tr>
  <tr><th>著者</th><td>（原山 智・竹内 誠）</td></tr>
  <tr><th>発行者</th><td>地質調査所</td></tr>
</table>
</body></html>
"""


class TestBuildMapCatalog(unittest.TestCase):
    def test_extract_tilejson_url(self) -> None:
        soup = BeautifulSoup(SAMPLE_METADATA_HTML, "html.parser")
        url = extract_tilejson_url("https://gbank.gsj.jp/ld/resource/publication/map/g050/map00507.html", soup)
        self.assertEqual(url, "https://gbank.gsj.jp/ld/resource/publication/map/tile/00507.json")

    def test_extract_download_links_and_build_description(self) -> None:
        soup = BeautifulSoup(SAMPLE_METADATA_HTML, "html.parser")
        downloads = extract_download_links("https://gbank.gsj.jp/ld/resource/publication/map/g050/map00507.html", soup)
        self.assertIn("pdf_light", downloads)
        self.assertTrue(downloads["pdf_light"].endswith("map507_D-L.pdf"))

        desc = build_description_metadata(downloads)
        self.assertTrue(desc["light_pdf_url"].endswith("map507_D-L.pdf"))
        self.assertTrue(desc["full_pdf_url"].endswith("map507_D.pdf"))
        self.assertEqual(desc["preferred_pdf"], desc["light_pdf_url"])

    def test_extract_section_images(self) -> None:
        soup = BeautifulSoup(SAMPLE_METADATA_HTML, "html.parser")
        sections = extract_section_images("https://gbank.gsj.jp/ld/resource/publication/map/g050/map00507.html", soup)
        self.assertEqual(len(sections), 1)
        self.assertEqual(sections[0]["label"], "A-A'")
        self.assertTrue(sections[0]["url"].endswith("map507_section_01.jpg"))

    def test_extract_japanese_metadata_success_and_error_logging(self) -> None:
        with patch("scripts.build_map_catalog.fetch_text", return_value=SAMPLE_JA_CATALOG_HTML):
            meta = extract_japanese_metadata("https://example.com/ja/507")
        self.assertEqual(meta["map_name_ja"], "5万分の1地質図幅「槍ヶ岳」")
        self.assertEqual(meta["authors_ja"], ["原山 智", "竹内 誠"])
        self.assertEqual(meta["publisher_ja"], "地質調査所")

        with patch("scripts.build_map_catalog.fetch_text", side_effect=RuntimeError("network error")):
            with self.assertLogs("scripts.build_map_catalog", level="WARNING"):
                fallback = extract_japanese_metadata("https://example.com/ja/507")
        self.assertEqual(fallback["map_name_ja"], "")

    def test_externalized_seed_providers_build_valid_records(self) -> None:
        volcanic = build_volcanic_records()
        coastal = build_coastal_seamless_records()
        self.assertEqual(len(volcanic), 3)
        self.assertEqual(len(coastal), 3)
        for rec in volcanic + coastal:
            validate_common_record(rec)


if __name__ == "__main__":
    unittest.main()
