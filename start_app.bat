@echo off
chcp 65001 >nul
setlocal

cd /d "%~dp0"
set "PORT=8000"
set "URL=http://localhost:%PORT%"

echo ==================================================
echo  5万分の1地質図幅検索 WebGIS を起動します
echo  URL: %URL%
echo  終了するにはこのウィンドウを閉じるか Ctrl+C を押してください
echo ==================================================
echo.

where python >nul 2>&1
if %errorlevel%==0 (
    start "" "%URL%"
    python -m http.server %PORT%
    goto :end
)

where py >nul 2>&1
if %errorlevel%==0 (
    start "" "%URL%"
    py -3 -m http.server %PORT%
    goto :end
)

where npx >nul 2>&1
if %errorlevel%==0 (
    start "" "%URL%"
    npx --yes serve . -l %PORT%
    goto :end
)

echo [エラー] Python または Node.js (npx) が見つかりませんでした。
echo いずれかをインストールした上で再度お試しください。
pause

:end
endlocal
