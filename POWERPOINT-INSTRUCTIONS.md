# PowerPoint Creation Instructions for Trinity (WorkSphere)

> **For the slide-building agent:** This document describes the Trinity/WorkSphere platform documentation and provides a structured blueprint for creating a PowerPoint presentation. Read this first, then use the referenced source files to build each slide.

---

## About the Source Documentation

This is a **Docusaurus documentation site** located in the `docs/` folder. All content is in Markdown files. The documentation is written for a conceptual audience (technical product managers, solutions architects, team leads) — not as a developer reference.

### How the Docs Are Organized

The file `sidebars.js` in the repo root defines the full document hierarchy. The structure flows from high-level overview down to specific components:

```
Introduction (docs/intro.md)
├── Architecture (docs/platform/high-level-architecture.md)
├── Frontend (docs/frontend/index.md)
│   ├── Real-Time & WebSocket (docs/realtime/index.md)
│   └── Daily Recap (docs/daily-recap/index.md)
├── Backend (docs/backend/index.md)
│   └── Orchestration Engine / SalesCoach (docs/salescoach/index.md)
│       ├── Architecture (docs/salescoach/architecture.md)
│       └── 7-Step Flow (docs/salescoach/flow/step1-connect.md through step7-persist.md)
├── AI & Models (docs/ai-and-mcp/index.md)
│   └── System Prompt Construction (docs/ai-and-mcp/system-prompt-construction.md)
├── MCP Servers (docs/mcp-servers/index.md)
│   ├── Sales Servers (9 servers, each with its own doc)
│   ├── HR Servers (1 server)
│   └── Shared Servers (2 servers)
├── WorkSphere Agents (docs/agents/index.md)
│   ├── Special Agents (7 agents — deal qualification, win probability, etc.)
│   └── RFP Agents (6 agents — requirements review, compliance, etc.)
│       └── RFP Advisor Setup (docs/rfp-advisor/index.md + projects, file-upload, indexing, chat)
├── Authentication & Security (docs/authentication/index.md)
├── Data Layer (docs/data-layer/index.md)
└── Deployment & Infrastructure (docs/deployment/index.md)
```

---

## Presentation Goals

- **Total slide count target:** 25–35 slides (not 100, not 10)
- **Flow:** Start from a high-level "what is this platform?" view, then progressively go deeper into each major area
- **Audience:** Technical stakeholders, leadership, and solutions architects who want to understand the platform's capabilities, architecture, and value — without reading code
- **Tone:** Professional, clean, modern. Use diagrams and visuals wherever possible. Avoid code snippets.
- **Branding:** The platform is called **Trinity** internally and branded as **WorkSphere** externally at [worksphere.dxc.ai](https://worksphere.dxc.ai). Use "Trinity (WorkSphere)" or "WorkSphere" for external-facing slides.

---

## Slide-by-Slide Blueprint

### Section 1: Introduction & Overview (3–4 slides)

**Slide 1 — Title Slide**
- Title: "Trinity (WorkSphere) — AI-Native Enterprise Platform"
- Subtitle: "DXC Technology"
- Source: `docs/intro.md` (opening paragraphs)

**Slide 2 — What is Trinity?**
- One-liner: AI-native workspace for Sales and HR teams
- 5–6 example user questions showing what users can ask (pull from `docs/intro.md` quoted examples)
- Key message: "Ask questions in plain English, get answers backed by real data"
- Source: `docs/intro.md` (What is Trinity section)

**Slide 3 — Key Capabilities (Overview)**
- 8 capabilities as a visual grid or icon layout:
  1. Conversational AI
  2. Business Data Access
  3. Role-Based Experience (Sales / HR)
  4. Visual Workspace (infinite canvas)
  5. Team Collaboration (group chat)
  6. RFP Advisor (document analysis)
  7. WorkSphere Agents (17+ autonomous agents)
  8. Daily Recap (personalized voice briefings)
- Source: `docs/intro.md` (Key Capabilities section)

**Slide 4 — Quick Facts Table**
- Pull the "Quick Facts" table directly from `docs/intro.md`:
  - Production URL, User Roles, AI Models, Business Tools count, Agent count, Authentication, Hosting

---

### Section 2: Architecture (3–4 slides)

**Slide 5 — High-Level Architecture Diagram**
- Reproduce the 3-layer ASCII diagram from `docs/platform/high-level-architecture.md` as a clean visual:
  - Users → Frontend Layer → Backend Layer → AI Models / MCP Servers / Data Storage
- This is the most important diagram in the deck — make it polished
- Source: `docs/platform/high-level-architecture.md` (How the System is Organized)

**Slide 6 — The Journey of a User Question**
- 8-step flow showing what happens when a user asks a question (e.g., "Give me details for opportunity OPX-12345")
- Steps: User types → Frontend sends → Backend asks AI → AI decides → Backend calls tool → AI crafts response → Response streams → Conversation saved
- Source: `docs/platform/high-level-architecture.md` (The Journey of a User Question)

**Slide 7 — Technology Stack Summary**
- Pull the Technology Summary table from `docs/platform/high-level-architecture.md`:
  - Frontend: React 19, Next.js 15
  - Backend: Node.js/Express + Python/aiohttp
  - AI: Azure OpenAI (GPT-4.1) + Google Gemini (2.5 Flash)
  - Database: Azure Cosmos DB
  - Hosting: Azure App Service
  - etc.

---

### Section 3: Frontend (2–3 slides)

**Slide 8 — Frontend Experience**
- Key UI areas: HUD Landing Page, Floating Chat, Dual-Frame Layout, Workspace Canvas, Group Chat Rooms
- Mention role-based adaptation (Sales vs HR see different features)
- Source: `docs/frontend/index.md` (How the Interface is Organized)

**Slide 9 — How the UI Responds to AI**
- The 5 states: Sending → Thinking → Streaming → Complete → Saved
- Mention: charts/visualizations auto-generated, voice input supported
- Source: `docs/frontend/index.md` (How the UI Responds to AI, Charts, Voice Input sections)

**Slide 10 — Daily Recap**
- Personalized 2–3 minute voice briefing combining: Industry News, Campaign Updates, Calendar Events, Opportunity Updates
- Show the flow diagram: Request → Auth → News + Business Data gathering → AI Curation → Script Writing → Speech Synthesis → Audio delivered
- Source: `docs/daily-recap/index.md`

---

### Section 4: Backend & Orchestration (2–3 slides)

**Slide 11 — Backend Architecture**
- Request flow layers: Incoming Request → Security → Routing → Business Logic → Response
- Key services: Chat Service, Notification Service, Workspace Service, Group Chat Service, Greeting Service
- Source: `docs/backend/index.md`

**Slide 12 — Orchestration Engine (SalesCoach)**
- The 7-step application flow: Connect → Authenticate → Query → Process → Tools → Respond → Persist
- Show how it fits: Main Backend (Node.js) → SalesCoach (Python/aiohttp) → Azure OpenAI + MCP Servers + Cosmos DB
- Note: "SalesCoach" is the internal name; it powers ALL roles, not just Sales
- Source: `docs/salescoach/index.md`

**Slide 13 — Request Types**
- Three patterns: Synchronous (instant), Streaming (real-time chat), Background Jobs (agents, research)
- Source: `docs/backend/index.md` (How the Backend Handles Different Request Types)

---

### Section 5: AI & Models (2–3 slides)

**Slide 14 — Two AI Models**
- Comparison table:
  - Azure OpenAI (GPT-4.1 Mini): Real-time chat, seconds, conversational output
  - Google Gemini (2.5 Flash): WorkSphere Agents, minutes, structured reports
- Source: `docs/ai-and-mcp/index.md` (Two AI Models)

**Slide 15 — How AI Works with MCP Servers**
- The flow: User Question → AI Receives → AI Requests Tool → Backend Calls MCP → MCP Returns Data → AI Interprets → Response
- Key insight: "The AI doesn't access data directly — it tells the backend what it needs"
- Source: `docs/ai-and-mcp/index.md` (How the AI Works with MCP Servers)

**Slide 16 — The System Prompt & Multi-Step Reasoning**
- System prompt components: Identity, Available Tools, Response Guidelines, Current Context
- Multi-step example: "Compare performance ratings of top 10 highest-paid employees" requires 3 sequential tool calls
- Source: `docs/ai-and-mcp/index.md` (The System Prompt, Multi-Step Reasoning)

---

### Section 6: MCP Servers (2–3 slides)

**Slide 17 — MCP Servers Overview**
- What MCP servers are: specialized services that give AI "hands" to access business data
- 15+ servers organized by: Sales Servers (9), HR Servers (1), Shared Servers (2)
- Source: `docs/mcp-servers/index.md`

**Slide 18 — MCP Server Catalog**
- Table showing all servers and what they provide:
  - Sales: SFDC UDP, Account Directory, Campaign, Client Reference, Win/Loss Prediction, Win Prediction Service, Market Intelligence, Auxilium, Contracts Legal
  - HR: HR Employee Data
  - Shared: O365, Azure App URL
- Source: `docs/mcp-servers/index.md` (Available MCP Servers tables)

**Slide 19 — Role-Based Tool Access & Token Handoff**
- Sales role sees Sales + Shared tools; HR role sees HR + Shared tools
- Token injection flow: User logs in → Tokens sent with requests → Backend injects into MCP calls → Data accessed per user permissions
- Key insight: "The AI isn't even told about tools outside your role"
- Source: `docs/mcp-servers/index.md` (Role-Based Tool Access, Token Handoff)

---

### Section 7: WorkSphere Agents (3–4 slides)

**Slide 20 — What Are WorkSphere Agents?**
- Chat vs. Agents comparison table: response time, complexity, output type, document handling, best for
- Key message: "When you need more than a quick answer"
- Source: `docs/agents/index.md` (What Agents Do, How Agents Differ from Chat)

**Slide 21 — Agent Catalog**
- Two categories as a visual:
  - **Special Agents** (7): Deal Qualification, Win Probability, Company Executives, Competitor Analysis, Pricing Strategy, Client Profile, Competitive Intelligence — no setup required
  - **RFP Agents** (6): Requirements Review, Response Review, Requirements-Response Strategy, Compliance & Contracts, Proposal Scoring, Technical & Planning — require project + document upload
- Source: `docs/agents/index.md` (Agent Categories tables)

**Slide 22 — How Agents Execute**
- Pipeline pattern: Select Agent → Load Documents → Execute Pipeline (Agent 1 → Agent 2 → ... → Final) → Format Report → Notify User
- Mention: sequential pipeline of sub-agents, each building on previous output
- Source: `docs/agents/index.md` (How Agents Work, Sequential Pipeline Pattern)

**Slide 23 — RFP Advisor Workflow**
- The 5-step user journey: Create Project → Upload Documents → Index & Search → Chat with Documents → Run Analysis Agents
- Mention supported formats (PDF, DOCX, PPTX), 3 chat modes (Gemini, Azure, Document)
- Source: `docs/rfp-advisor/index.md`

---

### Section 8: Security & Infrastructure (3–4 slides)

**Slide 24 — Authentication & Security**
- Login flow: User opens Trinity → Redirect to Microsoft → Microsoft verifies (MFA) → Return with tokens → Trinity reads tokens & shows role-based UI
- Method: OAuth 2.0 / OIDC via Azure AD with MSAL
- Roles: Sales, HR, Admin — each sees different features and tools
- Source: `docs/authentication/index.md`

**Slide 25 — Data Layer**
- Storage systems diagram:
  - Azure Cosmos DB: Chat history, notifications, workspaces, group chats, RFP projects, agent runs
  - Azure Blob Storage: Documents, reports, profile images
  - Azure AI Search: RFP document semantic search
- 4 separate Cosmos DB databases: Primary, Workspace, Group Chat, RFP Advisor
- Source: `docs/data-layer/index.md`

**Slide 26 — Deployment & Infrastructure**
- Two Docker containers: Frontend (Nginx + React) and Backend (Node.js + Express)
- Hosted on Azure App Service with auto-scaling
- CI/CD pipeline: Code commit → Pipeline triggers → Build → Deploy → Health check verification
- 3 environments: Development → Integration → Production
- Source: `docs/deployment/index.md`

**Slide 27 — Security Posture Summary**
- HTTPS everywhere, WSS for WebSocket
- Container security: non-root, minimal images, no secrets in code
- Secret management via Azure Key Vault
- Security headers: CSP, X-Frame-Options, HSTS
- Zero-downtime deployments with automatic rollback
- Disaster recovery: RTO < 1 hour, RPO < 15 minutes
- Source: `docs/authentication/index.md` + `docs/deployment/index.md`

---

### Section 9: Closing (1–2 slides)

**Slide 28 — Platform at a Glance (Summary)**
- A visual recap combining:
  - 2 AI models (GPT-4.1 + Gemini 2.5 Flash)
  - 15+ MCP business data connectors
  - 17+ autonomous AI agents
  - 2 user roles (Sales, HR)
  - Real-time streaming chat + visual workspace + group collaboration
  - Daily voice briefings
  - RFP document analysis
  - Enterprise security (Azure AD, RBAC, encryption)
  - Azure cloud infrastructure

**Slide 29 — Where to Learn More**
- Documentation site reference
- Key links: Production URL (worksphere.dxc.ai)
- Contact information (leave as placeholder for presenter to fill)

---

## Design Guidelines

- **Color scheme:** Use DXC Technology brand colors if available, otherwise use a clean dark/light professional theme
- **Diagrams:** Convert the ASCII diagrams in the source docs into clean visual diagrams. The source docs have excellent diagrams in ASCII — these should become the slide visuals
- **Tables:** Keep tables clean and readable. Don't overcrowd cells
- **Fonts:** Use a single sans-serif font family. Keep body text at 18pt minimum
- **Animations:** Minimal. Use simple fade or appear transitions if any
- **Consistency:** Every slide should have the same header/footer layout with slide numbers

## What NOT to Include

- No code snippets, function names, or API endpoint details
- No database schema or field names
- No configuration variables or environment settings
- No developer setup instructions (skip `docs/developer-guide/` and `docs/api-reference/`)
- No internal-only operational details

## Source File Priority

When building slides, read source files in this order of importance:

| Priority | File | What It Provides |
|----------|------|------------------|
| 1 | `docs/intro.md` | Platform overview, capabilities, quick facts |
| 2 | `docs/platform/high-level-architecture.md` | Architecture diagram, user journey, tech stack |
| 3 | `docs/ai-and-mcp/index.md` | AI models, how AI works with tools |
| 4 | `docs/agents/index.md` | Agent catalog, execution model, pipeline pattern |
| 5 | `docs/mcp-servers/index.md` | All 15+ data connectors catalog |
| 6 | `docs/frontend/index.md` | UI organization, user experience |
| 7 | `docs/backend/index.md` | Backend services, request flow |
| 8 | `docs/salescoach/index.md` | Orchestration engine, 7-step flow |
| 9 | `docs/rfp-advisor/index.md` | RFP workflow, document analysis |
| 10 | `docs/daily-recap/index.md` | Voice briefing feature |
| 11 | `docs/authentication/index.md` | Security, login, roles |
| 12 | `docs/data-layer/index.md` | Storage architecture |
| 13 | `docs/deployment/index.md` | Infrastructure, CI/CD, environments |

Files you can **skip entirely:**
- `docs/developer-guide/index.md`
- `docs/api-reference/index.md`
- Individual MCP server detail pages (use only `docs/mcp-servers/index.md` for the summary)
- Individual agent detail pages (use only `docs/agents/index.md` for the summary)
- `docs/salescoach/flow/step*.md` files (the overview in `salescoach/index.md` is sufficient)
- `docs/ai-and-mcp/system-prompt-construction.md` (too detailed for slides)
