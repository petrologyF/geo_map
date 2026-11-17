#!/usr/bin/env python3
"""
プロバイダごとのデータを共通スキーマへ正規化し、
data/providers/*.json・data/map_catalog.json・data/map_index.geojson を出力する。
"""

import json
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.providers.gsj_50k import normalize_gsj_50k  # noqa: E402
from scripts.providers.gsj_seamless_200k import build_seamless_200k_record  # noqa: E402
from scripts.providers.hro_eeg import merge_without_duplicates, normalize_hro_eeg  # noqa: E402


def is_common_schema(record: dict) -> bool:
    """レコードがすでに共通スキーマ形式か判定する。"""
    return isinstance(record.get("source"), dict) and isinstance(record.get("map"), dict)


def main() -> None:
    data_dir = PROJECT_ROOT / "data"
    providers_dir = data_dir / "providers"
    providers_dir.mkdir(parents=True, exist_ok=True)

    catalog_path = data_dir / "map_catalog.json"
    gsj_raw = json.loads(catalog_path.read_text(encoding="utf-8")) if catalog_path.exists() else []

    gsj_50k_records = []
    for rec in gsj_raw:
        if is_common_schema(rec):
            if rec["source"].get("provider_id") == "gsj_50k":
                gsj_50k_records.append(rec)
        else:
            gsj_50k_records.append(normalize_gsj_50k(rec))

    seamless_records = [build_seamless_200k_record()]

    hro_raw_path = providers_dir / "hro_eeg_raw.json"
    hro_records = []
    if hro_raw_path.exists():
        hro_raw = json.loads(hro_raw_path.read_text(encoding="utf-8"))
        hro_records = [
            rec if is_common_schema(rec) else normalize_hro_eeg(rec)
            for rec in hro_raw
        ]

    # プロバイダ別JSONを書き出し
    (providers_dir / "gsj_50k.json").write_text(
        json.dumps(gsj_50k_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "gsj_seamless_200k.json").write_text(
        json.dumps(seamless_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (providers_dir / "hro_eeg.json").write_text(
        json.dumps(hro_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # GSJ優先で重複排除しながら統合カタログを構築
    merged_sheets = merge_without_duplicates(gsj_50k_records, hro_records)
    all_catalog_records = seamless_records + merged_sheets

    catalog_path.write_text(
        json.dumps(all_catalog_records, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # 図郭ポリゴンを持つ図幅のみ GeoJSON FeatureCollection として書き出し
    features = []
    for rec in merged_sheets:
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
    print(f"hro_eeg: {len(hro_records)} 件")
    print(f"出力完了: {catalog_path} ({len(all_catalog_records)} 件), {geojson_path} ({len(features)} features)")


if __name__ == "__main__":
    main()
