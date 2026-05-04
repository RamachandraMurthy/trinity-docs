#!/usr/bin/env bash
# Starts the Trinity Docusaurus dev server from the repository root.
# macOS / Linux equivalent of start.ps1.

set -euo pipefail

cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm was not found. Install Node.js 18 or later from https://nodejs.org/ and ensure it is on your PATH." >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies (node_modules missing)..."
  npm install
fi

echo "Starting Docusaurus (npm start)..."
exec npm start
