#!/usr/bin/env python3
"""
リポジトリ全体の構成・データ統計・巡検コース一覧・主要ソースコード全文/抜粋をまとめた
REVIEW_BUNDLE.md を自動生成するスクリプト。
"""

import csv
import json
import subprocess
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

TARGET_EXTENSIONS = {".html", ".css", ".js", ".py", ".csv", ".md", ".yml", ".bat", ".txt"}
EXCLUDE_DIRS = {".git", "__pycache__", ".venv", "venv", "node_modules"}


def collect_project_files(root: Path) -> list[tuple[str, int, int]]:
    """プロジェクト内の主要ファイルの相対パス・行数・バイト数を収集する。"""
    results: list[tuple[str, int, int]] = []
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        if any(part in EXCLUDE_DIRS for part in path.parts):
            continue
        if path.name == "REVIEW_BUNDLE.md":
            continue
        if path.suffix.lower() not in TARGET_EXTENSIONS and path.name not in {"LICENSE"}:
            continue
        rel = path.relative_to(root).as_posix()
        size = path.stat().st_size
        try:
            lines = len(path.read_text(encoding="utf-8", errors="replace").splitlines())
        except OSError:
            lines = 0
        results.append((rel, lines, size))
    return results


def summarize_field_trips(csv_path: Path) -> tuple[int, list[dict]]:
    """field_trips.csv から総地点数とコース別サマリーを集計する。"""
    if not csv_path.exists():
        return 0, []

    courses: dict[tuple[str, str], dict] = defaultdict(
        lambda: {"year": "", "course_abbr": "", "course_name": "", "authors": "", "guidebook_url": "", "count": 0}
    )
    total = 0
    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not any((v or "").strip() for v in row.values()):
                continue
            total += 1
            year = (row.get("year") or "").strip()
            abbr = (row.get("course_abbr") or "").strip()
            key = (year, abbr)
            entry = courses[key]
            entry["year"] = year
            entry["course_abbr"] = abbr
            entry["course_name"] = entry["course_name"] or (row.get("course_name") or "").strip()
            entry["authors"] = entry["authors"] or (row.get("authors") or "").strip()
            entry["guidebook_url"] = entry["guidebook_url"] or (row.get("guidebook_url") or "").strip()
            entry["count"] += 1

    sorted_courses = sorted(courses.values(), key=lambda c: (c["year"], c["course_abbr"]), reverse=True)
    return total, sorted_courses


def get_recent_commits(root: Path, limit: int = 8) -> list[str]:
    """直近の Git コミット履歴を取得する。"""
    if not (root / ".git").exists():
        return []
    try:
        res = subprocess.run(
            ["git", "log", f"-n{limit}", "--oneline"],
            cwd=root,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=False,
        )
        if res.returncode == 0:
            return [line.strip() for line in res.stdout.splitlines() if line.strip()]
    except OSError:
        pass
    return []


def append_code_section(lines: list[str], rel_path: str, lang: str, max_lines: int | None = None) -> None:
    """指定ファイルの内容（または先頭 max_lines 行の抜粋）をコードブロックとして追記する。"""
    target = PROJECT_ROOT / rel_path
    if not target.exists():
        return
    raw_lines = target.read_text(encoding="utf-8", errors="replace").splitlines()
    total_lines = len(raw_lines)
    if max_lines is not None and total_lines > max_lines:
        body = "\n".join(raw_lines[:max_lines])
        header = f"### `{rel_path}`（先頭 {max_lines} 行 / 全 {total_lines} 行）"
    else:
        body = "\n".join(raw_lines)
        header = f"### `{rel_path}`（全 {total_lines} 行）"

    # コンテンツ内のバッククォート連続数より多いフェンス長を使う
    fence = "````" if "```" in body else "```"
    lines.extend(["", header, "", f"{fence}{lang}", body, fence])


def build_review_bundle(output_path: Path | None = None) -> Path:
    """REVIEW_BUNDLE.md を生成して保存先 Path を返す。"""
    if output_path is None:
        output_path = PROJECT_ROOT / "REVIEW_BUNDLE.md"

    data_dir = PROJECT_ROOT / "data"
    catalog_path = data_dir / "map_catalog.json"
    map_geojson_path = data_dir / "map_index.geojson"
    ft_csv_path = data_dir / "field_trips.csv"
    ft_geojson_path = data_dir / "field_trips.geojson"

    catalog_count = 0
    if catalog_path.exists():
        catalog_count = len(json.loads(catalog_path.read_text(encoding="utf-8")))

    map_feature_count = 0
    if map_geojson_path.exists():
        map_feature_count = len(json.loads(map_geojson_path.read_text(encoding="utf-8")).get("features", []))

    ft_total, ft_courses = summarize_field_trips(ft_csv_path)
    ft_feature_count = 0
    if ft_geojson_path.exists():
        ft_feature_count = len(json.loads(ft_geojson_path.read_text(encoding="utf-8")).get("features", []))

    files = collect_project_files(PROJECT_ROOT)
    commits = get_recent_commits(PROJECT_ROOT)
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    lines: list[str] = [
        "# REVIEW_BUNDLE — 地質図検索 WebGIS レビュー用バンドル",
        "",
        f"> 自動生成日時: `{now_str}`（`scripts/build_review_bundle.py` / `scripts/build_geojson.py` / Git pre-commit により自動更新）",
        "",
        "## 1. プロジェクト概要・データ統計",
        "",
        "産業技術総合研究所（GSJ）の地質図幅・20万分の1シームレス地質図V2・火山地質図および日本地質学会の年次大会「巡検スポット」を統合閲覧できるシングルページ WebGIS アプリケーションです。",
        "",
        f"- **地質図カタログ (`data/map_catalog.json`)**: {catalog_count} 件",
        f"- **図郭 GeoJSON (`data/map_index.geojson`)**: {map_feature_count} features",
        f"- **巡検スポット CSV (`data/field_trips.csv`)**: {ft_total} 地点（{len(ft_courses)} コース）",
        f"- **巡検スポット GeoJSON (`data/field_trips.geojson`)**: {ft_feature_count} features",
        "",
        "## 2. 日本地質学会 巡検コース一覧",
        "",
    ]

    if ft_courses:
        lines.extend(
            [
                "| 年 | コース略称 | 巡検正式名称 | 地点数 | 著者 | 案内書 URL |",
                "|---|---|---|---:|---|---|",
            ]
        )
        for c in ft_courses:
            url_cell = f"[Link]({c['guidebook_url']})" if c["guidebook_url"] else "—"
            authors_cell = c["authors"] or "—"
            lines.append(
                f"| {c['year']} | {c['course_abbr']} | {c['course_name']} | {c['count']} | {authors_cell} | {url_cell} |"
            )
    else:
        lines.append("巡検コースデータはまだありません。")

    lines.extend(
        [
            "",
            "## 3. ファイル一覧",
            "",
            "| ファイル | 行数 | サイズ (bytes) |",
            "|---|---:|---:|",
        ]
    )
    for rel, line_cnt, size in files:
        lines.append(f"| `{rel}` | {line_cnt} | {size} |")

    if commits:
        lines.extend(["", "## 4. 直近の Git コミット", ""])
        for c in commits:
            lines.append(f"- `{c}`")

    # 1. フロントエンド主要ファイル（全文）
    lines.extend(["", "## 5. フロントエンド主要ファイル（全文）"])
    append_code_section(lines, "index.html", "html")
    append_code_section(lines, "css/style.css", "css")
    for js_file in sorted((PROJECT_ROOT / "js").glob("*.js")):
        append_code_section(lines, js_file.relative_to(PROJECT_ROOT).as_posix(), "javascript")

    # 2. データ取得・変換パイプライン・検証・テスト
    lines.extend(["", "## 6. データ取得・変換パイプライン・検証・テスト"])
    pipeline_files = [
        "scripts/build_map_catalog.py",
        "scripts/build_geojson.py",
        "scripts/schema.py",
        "scripts/providers/field_trips.py",
        "scripts/providers/gsj_50k.py",
        "scripts/providers/gsj_seamless_200k.py",
        "scripts/providers/gsj_volcanic.py",
        "scripts/providers/gsj_coastal_seamless.py",
        "scripts/providers/hro_eeg.py",
        "tests/test_audit_suite.py",
    ]
    for pf in pipeline_files:
        append_code_section(lines, pf, "python")

    # 3. データ仕様・実データ抜粋
    lines.extend(["", "## 7. データ仕様・実データ抜粋"])
    append_code_section(lines, "data/field_trips.csv", "csv", max_lines=30)
    append_code_section(lines, "data/map_catalog.json", "json", max_lines=40)

    lines.append("")
    output_path.write_text("\n".join(lines), encoding="utf-8")
    return output_path


if __name__ == "__main__":
    out = build_review_bundle()
    print(f"REVIEW_BUNDLE 更新完了: {out}")
