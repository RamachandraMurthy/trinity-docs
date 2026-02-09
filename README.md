# Trinity Documentation

Unified documentation for the **Trinity AI Platform (WorkSphere)**, built with [Docusaurus 3](https://docusaurus.io/).

## Overview

Trinity is a comprehensive AI-powered enterprise platform that provides intelligent assistance across sales, HR, and business operations. This documentation site serves as the central knowledge base for understanding Trinity's architecture, capabilities, and internal workings — written for technical product managers, solutions architects, and team leads.

## What's Documented

The site covers the full Trinity platform across 11 documentation sections:

| Section | Description |
|---|---|
| **Introduction** | Platform overview and key capabilities |
| **Architecture** | High-level system design and component relationships |
| **Frontend** | Web application UI, real-time features, and daily recap |
| **Backend** | Processing engine, orchestration, and the 7-step SalesCoach flow |
| **AI & Models** | AI integration, model configuration, and system prompt construction |
| **MCP Servers** | 13+ data connectors (Salesforce, HR, O365, market intelligence, etc.) |
| **WorkSphere Agents** | Special agents (deal qualification, win probability, pricing) and RFP agents |
| **Authentication & Security** | Azure AD integration and security model |
| **Data Layer** | Cosmos DB, blob storage, and data architecture |
| **Deployment & DevOps** | Docker containers, Azure App Service, CI/CD pipeline |
| **Developer Guide** | Local development setup and contribution guidelines |
| **API Reference** | Backend API documentation |

## Features

- Local search functionality (offline, no external service needed)
- Modern, responsive UI with dark/light mode support
- AI-powered documentation assistant (optional, requires Google API key)
- Mobile-friendly design
- MDX support for interactive documentation

## Prerequisites

- **Node.js** >= 18.0
- **npm** (included with Node.js)

## Quick Start

1. **Clone the repository:**

```bash
git clone https://github.com/RamachandraMurthy/trinity-docs.git
cd trinity-docs
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm start
```

The site will be available at `http://localhost:3000`.

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

## Environment Variables

Create a `.env` file in the root directory for optional features:

| Variable | Required | Description |
|---|---|---|
| `REACT_APP_GOOGLE_API_KEY` | No | Google API key for the AI documentation assistant |

The site functions fully without any environment variables — the AI helper is an optional enhancement.

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server with hot reload |
| `npm run build` | Build static site for production |
| `npm run serve` | Serve the production build locally |
| `npm run deploy` | Deploy using Docusaurus deployment |
| `npm run clear` | Clear Docusaurus cache (useful for troubleshooting) |
| `npm run swizzle` | Copy theme components for customization |
| `npm run write-translations` | Extract translatable strings |
| `npm run write-heading-ids` | Add heading IDs to markdown files |

## Project Structure

```
trinity-docs/
├── docs/                          # All documentation content (Markdown/MDX)
│   ├── intro.md                   # Introduction page
│   ├── platform/                  # High-level architecture
│   ├── frontend/                  # Frontend documentation
│   ├── backend/                   # Backend documentation
│   ├── salescoach/                # SalesCoach orchestration + 7-step flow
│   ├── ai-and-mcp/               # AI integration & prompt construction
│   ├── mcp-servers/               # 13+ MCP server docs (SFDC, HR, O365, etc.)
│   ├── agents/                    # Special agents & RFP agents
│   ├── rfp-advisor/               # RFP Advisor workflow (projects, upload, chat)
│   ├── authentication/            # Auth & security
│   ├── data-layer/                # Database & storage
│   ├── deployment/                # Infrastructure & DevOps
│   ├── developer-guide/           # Developer setup
│   └── api-reference/             # API documentation
├── src/
│   ├── components/                # React components (AI helper)
│   ├── css/                       # Custom styles
│   ├── pages/                     # Landing page
│   ├── plugins/                   # Docusaurus plugins (AI index)
│   └── theme/                     # Theme customizations
├── static/                        # Static assets (logo, images)
├── docusaurus.config.js           # Docusaurus configuration
├── sidebars.js                    # Sidebar navigation structure
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

## Contributing

1. Create an issue describing the problem or enhancement
2. Submit a pull request with your changes
3. Follow the documentation style guide (conceptual, not code-level — see `.cursor/rules/` for details)
4. Ensure no broken links (`npm run build` will catch them — the config uses `onBrokenLinks: 'throw'`)

## License

Copyright &copy; 2025 DXC Technology — Trinity Platform (WorkSphere). All rights reserved.

## Contact

For questions or issues related to the Trinity platform or this documentation:

- **Ramachandra Murthy** — [ramachandra.murthy@dxc.com](mailto:ramachandra.murthy@dxc.com)
