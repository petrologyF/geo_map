#!/usr/bin/env python3
"""
ローカル開発サーバーを起動し、既定のブラウザでアプリケーションを開くランチャー。
"""

import http.server
import os
import threading
import webbrowser
from pathlib import Path

DEFAULT_PORT = 8000
MAX_PORT_TRIES = 20


def create_server(host: str = "127.0.0.1") -> tuple[http.server.ThreadingHTTPServer, int]:
    """空きポートを探して ThreadingHTTPServer を生成する。"""
    handler = http.server.SimpleHTTPRequestHandler
    for offset in range(MAX_PORT_TRIES):
        port = DEFAULT_PORT + offset
        try:
            server = http.server.ThreadingHTTPServer((host, port), handler)
            return server, port
        except OSError:
            continue
    raise RuntimeError(f"ポート {DEFAULT_PORT}〜{DEFAULT_PORT + MAX_PORT_TRIES - 1} がすべて使用中です。")


def main() -> None:
    project_root = Path(__file__).resolve().parent.parent
    os.chdir(project_root)

    server, port = create_server()
    url = f"http://localhost:{port}"

    print("==================================================")
    print(" 5万分の1地質図幅検索 WebGIS")
    print(f" URL: {url}")
    print(" 終了するにはこのウィンドウを閉じるか Ctrl+C を押してください")
    print("==================================================")

    threading.Timer(0.4, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nサーバーを停止しました。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
