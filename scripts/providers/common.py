"""プロバイダアダプタ間で共有する正規化ヘルパー。"""

import re


def to_int_year(value) -> int | None:
    """発行年を安全に整数へ変換する。"""
    if isinstance(value, bool):
        return None
    if isinstance(value, int):
        return value
    if isinstance(value, str):
        match = re.search(r"\d{4}", value)
        if match:
            return int(match.group(0))
    return None
