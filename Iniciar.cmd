@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo O Node.js precisa estar instalado para iniciar o servidor local.
  pause
  exit /b 1
)
node server.cjs --open
pause
