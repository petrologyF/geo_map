@echo off
setlocal
cd /d "%~dp0"

echo Starting GeoMap WebGIS...
echo.

python -c "import http.server" >nul 2>&1
if %errorlevel%==0 (
    python scripts\serve.py
    if errorlevel 1 pause
    goto :end
)

if exist "%USERPROFILE%\miniconda3\python.exe" (
    "%USERPROFILE%\miniconda3\python.exe" scripts\serve.py
    if errorlevel 1 pause
    goto :end
)

if exist "%USERPROFILE%\anaconda3\python.exe" (
    "%USERPROFILE%\anaconda3\python.exe" scripts\serve.py
    if errorlevel 1 pause
    goto :end
)

where py >nul 2>&1
if %errorlevel%==0 (
    py -3 -c "import http.server" >nul 2>&1
    if %errorlevel%==0 (
        py -3 scripts\serve.py
        if errorlevel 1 pause
        goto :end
    )
)

where npx >nul 2>&1
if %errorlevel%==0 (
    start "" "http://localhost:8000"
    npx --yes serve . -l 8000
    if errorlevel 1 pause
    goto :end
)

echo [ERROR] Python or Node.js (npx) was not found.
echo Please install Python 3 or Node.js and try again.
pause

:end
endlocal
