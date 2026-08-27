@echo off
setlocal

where node >nul 2>nul || (
  echo Node.js 20 or newer is required.
  exit /b 1
)

call npm install --no-audit --no-fund || exit /b 1
call npm run verify || exit /b 1
call npx playwright install chromium || exit /b 1
call npm run test:e2e || exit /b 1

echo.
echo TAHTI checks passed.
