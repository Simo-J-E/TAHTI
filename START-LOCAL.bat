@echo off
setlocal

where node >nul 2>nul || (
  echo Node.js 24 or newer is required.
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm install --no-audit --no-fund || exit /b 1
)

call npm run dev
