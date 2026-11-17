#!/usr/bin/env python3
"""
プロバイダごとのデータを「地図種別・主題・空間モデル」を含む共通スキーマへ正規化し、
data/providers/*.json・data/map_catalog.json・data/map_index.geojson を出力する。
"""

import json
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.providers.gsj_50k import normalize_gsj_50k  # noqa: E402
from scripts.providers.gsj_coastal_seamless import build_coastal_seamless_records  # noqa: E402
from scripts.providers.gsj_seamless_200k import build_seamless_200k_record  # noqa: E402
from scripts.providers.gsj_volcanic import build_volcanic_records  # noqa: E402
from scripts.providers.hro_eeg import merge_without_duplicates, normalize_hro_eeg  # noqa: E402
from scripts.schema import validate_common_record  # noqa: E402


def is_common_schema(record: dict) -> bool:
    """レコードがすでに共通スキーマ形式か判定する。"""
    return isinstance(record.get("source"), dict) and isinstance(record.get("map"), dict)


def ensure_gsj_50k_schema(rec: dict) -> dict:
    """既存の共通スキーマ gsj_50k レコードに map_type / theme / geometry_model / raster_image_url を補完する。"""
    if not is_common_schema(rec):
        return normalize_gsj_50k(rec)

    rec["map"].setdefault("map_type", "geological_map_sheet")
    rec["map"].setdefault("theme", "geology")
    rec["map"].setdefault("geometry_model", "map_sheet")
    rec.setdefault("display", {}).setdefault(
        "raster_image_url",
        rec.get("documents", {}).get("original_image_url", ""),
    )
    return rec


def main() -> None:
    data_dir = PROJECT_ROOT / "data"
    providers_dir = data_dir / "providers"
    providers_dir.mkdir(parents=True, exist_ok=True)

    gsj_50k_raw_path = providers_dir / "gsj_50k_raw.json"
    gsj_50k_path = providers_dir / "gsj_50k.json"
    catalog_path = data_dir / "map_catalog.json"

    if gsj_50k_raw_path.exists():
        gsj_raw = json.loads(gsj_50k_raw_path.read_text(encoding="utf-8"))
    elif gsj_50k_path.exists():
        gsj_raw = json.loads(gsj_50k_path.read_text(encoding="utf-8"))
    else:
        gsj_raw = []

    gsj_50k_records = [
        ensure_gsj_50k_schema(rec)
        for rec in gsj_raw
        if not is_common_schema(rec) or rec["source"].get("provider_id") == "gsj_50k"
    ]

    seamless_records = [build_seamless_200k_record()]
    volcanic_records = build_volcanic_records()
    coastal_records = build_coastal_seamless_records()

    hro_raw_path = providers_dir / "hro_eeg_raw.json"
    hro_records = []
    if hro_raw_path.exists():
        hro_raw = json.loads(hro_raw_path.read_text(encoding="utf-8"))
        hro_records = [
            rec if is_common_schema(rec) else normalize_hro_eeg(rec)
            for rec in hro_raw
        ]

    # 全レコードの共通スキーマ必須属性を検証
    all_records = (
        seamless_records
        + merge_without_duplicates(gsj_50k_records, hro_records)
        + volcanic_records
        + coastal_records
    )
    for rec in all_records:
        validate_common_record(rec)

    # プロバイダ別JSONを書き出し
    (providers_dir / "gsj_50k.json").write_text(
        json.dumps(gsj_50k_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "gsj_seamless_200k.json").write_text(
        json.dumps(seamless_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "gsj_volcanic.json").write_text(
        json.dumps(volcanic_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "gsj_coastal_seamless.json").write_text(
        json.dumps(coastal_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "hro_eeg.json").write_text(
        json.dumps(hro_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    catalog_path.write_text(
        json.dumps(all_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # 図郭ポリゴンを持つ図幅のみ GeoJSON FeatureCollection として書き出し
    features = []
    for rec in all_records:
        geom = rec.get("geometry")
        if not geom:
            continue
        props = {k: v for k, v in rec.items() if k != "geometry"}
        features.append(
            {
                "type": "Feature",
                "geometry": geom,
                "properties": props,
            }
        )

    geojson_path = data_dir / "map_index.geojson"
    geojson_path.write_text(
        json.dumps({"type": "FeatureCollection", "features": features}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"gsj_50k: {len(gsj_50k_records)} 件")
    print(f"gsj_seamless_200k: {len(seamless_records)} 件")
    print(f"gsj_volcanic: {len(volcanic_records)} 件")
    print(f"gsj_coastal_seamless: {len(coastal_records)} 件")
    print(f"hro_eeg: {len(hro_records)} 件")
    print(f"出力完了: {catalog_path} ({len(all_records)} 件), {geojson_path} ({len(features)} features)")


if __name__ == "__main__":
    main()
