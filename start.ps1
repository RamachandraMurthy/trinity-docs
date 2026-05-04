# Starts the Trinity Docusaurus dev server from the repository root.

$ErrorActionPreference = 'Stop'

$RepoRoot = $PSScriptRoot
Set-Location -LiteralPath $RepoRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host 'npm was not found. Install Node.js 18 or later from https://nodejs.org/ and ensure it is on your PATH.' -ForegroundColor Red
    exit 1
}

if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot 'node_modules'))) {
    Write-Host 'Installing dependencies (node_modules missing)...' -ForegroundColor Cyan
    npm install
}

Write-Host 'Starting Docusaurus (npm start)...' -ForegroundColor Green
npm start
