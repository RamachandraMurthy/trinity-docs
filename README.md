# Trinity Documentation

Unified documentation for the **Trinity AI Platform (WorkSphere)**, built with [Docusaurus 3](https://docusaurus.io/).

## Overview

Trinity is a comprehensive AI-powered enterprise platform that provides intelligent assistance across sales, HR, and business operations. This documentation site serves as the central knowledge base for understanding Trinity's architecture, capabilities, and internal workings — written for technical product managers, solutions architects, and team leads.

## What's Documented

The site is organized around the platform's five-layer reference architecture, with cross-cutting controls and operations references.

| Section | Description |
|---|---|
| **Introduction** | Platform purpose and entry points |
| **Architecture** | Platform Overview · Reference Architecture · User Interaction Model · End-to-End Request Lifecycle |
| **Experience Layer** | Single-User Workspace, AI Canvas, Agent Space & Runs, real-time, file upload, email sharing |
| **Orchestration Layer** | Claude Agent SDK Orchestrator, role-aware routing, chat skills, personal memory |
| **Agent & Execution Layer** | Five agent patterns, Special Agents, RFP Agents, Agent Primus (Autonomous) |
| **MCP Integration Layer** | Internal and external MCP servers, role-based exposure |
| **Enterprise Data Layer** | Databricks UDP, Cosmos DB, Power BI, Azure Cognitive Search, O365, Account Directory |
| **AI & Models** | Multi-model strategy and system prompt construction |
| **Authentication, Security & Governance** | Azure AD, role-based access, control plane (Trinity Guardian, Guardrails, Wiz, Dynatrace) |
| **Deployment & Operations** | Azure-hosted services, container packaging, observability surfaces |

## Features

- Local search (offline, no external service needed)
- Modern, responsive UI with dark/light mode support
- DXC-branded landing page with theme-responsive sections
- MDX support for interactive documentation

## Prerequisites

- **Node.js** >= 18.0
- **npm** (included with Node.js)

## Quick Start

```bash
git clone <repo-url>
cd trinity-docs
npm install
npm start
```

The site will be available at `http://localhost:3000`.

> **Maintaining the docs?** Read **[MAINTAINING.md](./MAINTAINING.md)** before making changes — it covers prerequisites, AI-assisted refresh playbooks, naming rules, and the build safety net.

## Build for Production

Generate the static site for deployment:

```bash
npm run build
```

The output is written to the `build/` directory. This directory contains all static files ready to be served by any web server or static hosting platform.

To preview the production build locally:

```bash
npm run serve
```

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server with hot reload (fast editing; search not indexed) |
| `npm run build` | Build static site for production |
| `npm run serve` | Serve the production build locally (search works) |
| `npm run preview` | Build + serve in one command — use this to test search and verify the production look |
| `npm run clear` | Clear Docusaurus cache (useful for troubleshooting) |
| `npm run swizzle` | Copy theme components for customization |
| `npm run write-translations` | Extract translatable strings |
| `npm run write-heading-ids` | Add heading IDs to markdown files |

> Deployment to `trinity-docs.internal` is handled by the infra team's pipeline, not via `npm run deploy`. Always `npm run build` and `npm run serve` to verify locally before pushing for deploy.

## Project Structure

```
trinity-docs/
├── docs/                          # All documentation content (Markdown/MDX)
│   ├── intro.md                   # Introduction
│   ├── platform/                  # Architecture (Overview, Reference, Interaction, Lifecycle)
│   ├── frontend/                  # Experience Layer
│   ├── realtime/                  # Real-Time & WebSocket
│   ├── daily-recap/               # Daily Brief / Podcast
│   ├── backend/                   # Orchestration Layer (Claude Agent SDK)
│   ├── ai-and-mcp/                # AI & Models, system prompt construction
│   ├── mcp-servers/               # MCP Integration Layer (per-server pages)
│   ├── agents/                    # Agent & Execution Layer (5 patterns)
│   ├── rfp-advisor/               # RFP Advisor workflow
│   ├── authentication/            # Authentication, Security & Governance
│   ├── data-layer/                # Enterprise Data Layer
│   └── deployment/                # Deployment & Operations
├── src/
│   ├── css/                       # Custom DXC-branded styles
│   └── pages/                     # Landing page
├── static/img/                    # Logo
├── .claude/skills/                # AI-assisted refresh skill (read by Claude Code)
│   └── trinity-docs-refresh/
├── .cursor/rules/                 # Documentation style guide for AI tools
├── MAINTAINING.md                 # Team handoff guide — read this first
├── README.md                      # This file
├── docusaurus.config.js           # Docusaurus configuration
├── sidebars.js                    # Sidebar navigation structure
├── start.ps1 / start.sh           # Convenience launcher (Windows / macOS+Linux)
├── package.json                   # Dependencies and scripts
└── .gitignore
```

## Technology Stack

| Technology | Purpose |
|---|---|
| [Docusaurus 3](https://docusaurus.io/) | Static site generator / documentation framework |
| React 18 | UI library |
| MDX | Markdown with JSX support |
| Prism | Syntax highlighting (Python, JSON, Bash, JS, TS, YAML) |
| [docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) | Offline local search |

## Deployment

The production build generates a fully static site in the `build/` directory. It can be deployed to any static hosting environment.

### Build and verify locally

```bash
npm run build
npm run serve
```

### Deployment targets

The site is configured for internal hosting at `https://trinity-docs.internal` (see `docusaurus.config.js`). Adjust the `url` and `baseUrl` fields if deploying to a different domain.

### Static output

The `build/` directory contains:
- Pre-rendered HTML pages for all documentation
- Bundled JavaScript and CSS
- Search index for offline search
- All static assets (images, fonts)

No server-side runtime is required — the output is purely static HTML/CSS/JS.

## Maintaining and Refreshing the Docs

If you're joining the team or picking up maintenance, **read [MAINTAINING.md](./MAINTAINING.md) first.** It covers:

- **Prerequisites** — the toolchain you need (Node.js, Claude Code, git, deck access)
- **Three AI-assisted refresh modes** — quick fix, section refresh, full deck-driven refresh
- **The trinity-docs-refresh skill** at `.claude/skills/trinity-docs-refresh/SKILL.md` — encodes the 5-layer canonical structure, naming rules, and page template
- **Recurring cadence** — what to refresh per release, monthly, quarterly
- **Critical rules** — no secrets in code, no developer-level detail in pages, never disable the build's broken-link check
- **Common tasks cheat sheet** — the 8 commands you'll use most

## Contributing

1. Read [MAINTAINING.md](./MAINTAINING.md) and the skill at `.claude/skills/trinity-docs-refresh/SKILL.md`
2. Create an issue describing the problem or enhancement
3. Submit a pull request with your changes
4. Ensure no broken links — `npm run build` is the gate (`onBrokenLinks: 'throw'`)
5. Style guide: conceptual, not code-level — see `.cursor/rules/` for the full spec

## License

Copyright &copy; 2026 DXC Technology — Trinity (WorkSphere) Platform. All rights reserved.
