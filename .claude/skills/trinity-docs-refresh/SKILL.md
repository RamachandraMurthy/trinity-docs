---
name: trinity-docs-refresh
description: Refresh the Trinity (WorkSphere) documentation site from the current state of the platform — architecture deck, sub-repo source, and existing docs. Single source of truth = trinity-docs. Conceptual, audience-first, no code-level detail.
---

# Trinity Docs Refresh

This skill is the playbook for keeping `trinity-docs/` (Docusaurus 3 site) in sync with the rest of the Trinity platform. It encodes the structure, voice, and workflow so a refresh pass is repeatable instead of painful.

**To use this skill**, an AI assistant (Claude Code or similar) needs access to:

1. The **trinity-docs/** repository (this repo)
2. The **architecture deck** — `Trinity Architecture 1.0.pptx` (DXC OneDrive). The exact path on disk varies by user; provide it when invoking the skill.
3. **Optional but recommended**: read access to the other DXC-Trinity sub-repos (trinity-core, trinity-worksphere, trinity-mcp-*, trinity-autonomous, trinity-guardian, trinity-mobile, etc.) for ground-truth verification of what each component does.

---

## Goal

Produce a **cohesive, conceptual documentation site** that teaches anyone — non-engineer stakeholder, new team member, exec — what Trinity is and how it works. One link to hand out for "any details around the project."

The end product lives entirely in `trinity-docs/docs/`. Each sub-repo's own `README.md` stays minimal (setup + pointer to trinity-docs). **Do not** generate per-repo doc files first and then copy them over — that was the old painful workflow.

---

## Audience & Voice

- **Audience:** technical product managers, solutions architects, team leads, curious execs. Not API consumers, not contributors writing code.
- **Voice:** conceptual narrative. Tables for compare/contrast. ASCII box diagrams for flow. Cross-links via `/docs/...` paths. Every page ends with a "Related Documentation" table.
- **Banned content:** code snippets, API request/response examples, file paths inside repos, function names, environment-variable references, low-level config. If a reader needs that, link to the repo — don't paste it.
- **Tone reference:** see the existing `docs/platform/high-level-architecture.md` and `docs/agents/index.md` — match that register exactly.

---

## Source of Truth (in priority order)

1. **Architecture deck** (`Trinity Architecture 1.0.pptx`). **The canonical conceptual model** — terminology, layer names, and grouping in trinity-docs must align with the deck. The deck is image-only (slides 4–20 are embedded PNGs). Extract the .pptx as a zip and read the images in `ppt/media/image*.png` directly. The 9 topics, in order, are listed under **Deck Structure** below.
2. **Sub-repo source code** under the parent DXC-Trinity workspace — read selectively to confirm "what is currently true," not to extract code.
3. **Existing `trinity-docs/docs/` content** — preserve the bits still accurate; rewrite the stale ones.
4. **Sub-repo READMEs and `.claude/CLAUDE.md` files** when present.

If the deck and platform code disagree, the deck wins for **layering and conceptual structure** (it's the externally-facing model); platform code wins for **status, current versions, and what actually exists today**.

---

## Deck Structure (the canonical conceptual model)

The architecture deck has 9 topics, each with a **summary card** slide and a **detailed diagram** slide. Trinity-docs Architecture/Platform sections must use the same vocabulary and grouping:

| # | Topic | Key Concepts |
|---|---|---|
| 1 | Platform Overview | Role-aware AI workspace; conversational, collaborative, agent-driven; sales + HR; "what it is / core experiences / core architecture model / what it enables" |
| 2 | Reference Architecture | The 5-layer model + cross-cutting controls (see below) |
| 3 | User Interaction Model | 4-step request flow: User entry → Role & context resolution → Orchestration & routing → Response & persistence |
| 4 | End-to-End Request Lifecycle | 9-band detailed lifecycle: User Request → Context & Role Resolution → Orchestration → Intent Routing & Tools → MCP Servers & Agents → Agents & Outputs → Response Assembly & Delivery → Persistence Layer → Governance, Security & Observability |
| 5 | AI Canvas — Multi-User Collaboration | Shared project workspace, role-aware access, persisted to Cosmos DB, prompt/response/context history shared |
| 6 | Agent Strategy — Multiple Agent Patterns | 5 agent patterns (see below); common execution model: agents launched from Agent Space → long-running work → run space tracks runs/outputs/audit |
| 7 | Integration Strategy — MCP as Standard Access Layer | Internal sources, external/shared MCPs, role-aware exposure |
| 8 | Governance & Operations — Cross-Cutting Controls | Trinity Guardian, Guardrails/Rules, Wiz, Dynatrace |
| 9 | Platform Features — Intelligent Built on Top of Core | Daily Brief/Podcast, Personal Memory, Agent Space & Runs, Autonomous Agent & Deliverables |

### The 5 Layers (use these names exactly)

1. **Experience Layer** — Single-User Workspace, AI Canvas, Agent Space & Runs, Role-Based Access
2. **Orchestration Layer** — Claude Agent SDK Orchestrator, Role-Aware Routing, Session/Context Handling, Response Composition, Policies & Guardrails
3. **Agent & Execution Layer** — Purpose-Built, Google ADK, Claude Agent SDK, Amazon Quick Embedded, Autonomous Agents (Future Ready); Background Execution, Run Tracking, Telemetry & Audit
4. **MCP Integration Layer** — Internal MCP Servers, External / Shared MCP Servers, Role-Based Console Exposure
5. **Enterprise Data Layer** — Databricks UDP, Power BI, Azure Cognitive Search / Index, Office 365 (Outlook + Calendar), Account Directory, Cosmos DB

### Cross-Cutting Controls (the Control Plane)

- **Trinity Guardian** — command center; tracks MCP availability, response health, platform health; detects prompt-injection patterns and triggers alerts
- **Guardrails / Rules** — policy files / rule shape; response-boundary, org-policy, organizational-data shaping
- **Wiz** — cloud security posture and vulnerability monitoring; supports visibility into environmental issues
- **Dynatrace** — observability; tracks server behavior, app health, operational health; strengthens platform runtime observability

### The 5 Agent Patterns (use these labels exactly)

1. **Purpose-Built Agents** — focused on specific business workflows, packaged for targeted outcomes
2. **Google ADK Agents** — built using Google ADK; used for orchestrated agents (e.g. daily briefing)
3. **Claude Agent SDK Agents** — Anthropic Claude Agent SDK; native, modeled and aligned to platform orchestration model
4. **Amazon Quick Embedded Agents** — external AWS-hosted agent spaces, triggered from WorkSphere via iframe-based integration
5. **Autonomous Agents (Future Ready)** — built on Claude Agent SDK with existing MCP servers; designed for broader task execution and deliverable generation (Word/PowerPoint outputs from templates) — this is **Agent Primus** internally

### Platform Features (top-of-stack capabilities)

- **Daily Brief / Podcast** — on-demand audio briefing in ~2 min; inputs: Latest News & Happenings, Client or Account Activity, Office 365 Calendar; built with Google Gemini ADK
- **Personal Memory** — stores stable user-specific memory (preferred name, work patterns); persisted in Cosmos DB; reused to personalize future responses
- **Agent Space & Runs** — discovery, launch, tracking surface for all agent patterns
- **Autonomous Agent & Deliverables** — Agent Primus generates PowerPoint/Word deliverables from templates using Claude Agent SDK

---

## Naming in trinity-docs prose

Use these names. They are mostly the deck's external names, with one important override.

| Use this name | Notes |
|---|---|
| **Claude Agent SDK** | Override the deck's "Cloud Agent SDK." Trinity-docs prose always uses "Claude Agent SDK" — that's the actual product name and what readers will recognize. |
| **Claude Agent SDK Orchestrator** | The orchestrator runtime — file `backend/claude-agent-sdk-orchestrator.md` |
| **Single-User Workspace** | Maps to trinity-worksphere chat panel |
| **AI Canvas** | Same name everywhere |
| **Agent Space & Runs** | Maps to WorkSphere Agents catalog + Agent Runs page |
| **Autonomous Agent / Agent Primus** | External: "Autonomous Agent". Internal: "Agent Primus" (trinity-autonomous repo). Both names are fine in prose. |
| **Trinity Guardian** | Maps to trinity-guardian |
| **Internal MCP Servers** | Maps to the trinity-mcp-* repos |
| **Personal Memory** | Per-user state on the orchestration layer |
| **Daily Brief / Podcast** | Maps to trinity-podcast-newsagent + Daily Recap page |

---

## Sub-Repo → Doc-Section Map

| Sub-repo / source | Lands under | Pages |
|---|---|---|
| Architecture deck | `Architecture` (top-level) | `high-level-architecture.md`, `reference-architecture.md`, `user-interaction-model.md`, `end-to-end-request-lifecycle.md` |
| `trinity-worksphere/` (chat, real-time, file upload, email) | `Experience Layer` | `single-user-workspace.md`, `realtime/index.md`, `file-upload.md`, `email-sharing.md` |
| `trinity-worksphere/` (AI Canvas) | `Experience Layer` | `ai-canvas.md` |
| `trinity-worksphere/` (Agent Space UI) | `Experience Layer` | `agent-space.md` |
| `trinity-worksphere/` (Daily Recap UI) | `Experience Layer` | `daily-recap/index.md` |
| `trinity-mobile/` | `Experience Layer` | `trinity-mobile.md` (mark coming-soon if not yet shipped) |
| `trinity-core/` (orchestration, SDK runner) | `Orchestration Layer` | `claude-agent-sdk-orchestrator.md` (covers role-aware routing, session/context, response composition) |
| `trinity-core/.claude/skills/` (chat skills) | `Orchestration Layer` | `chat-skills.md` |
| `trinity-core/` (Personal Memory) | `Orchestration Layer` | `personal-memory.md` |
| Architecture deck + `trinity-ai-agents/` + `trinity-core/config/agent_registry.json` | `Agent & Execution Layer` | `agent-strategy.md` (5 patterns) + per-agent pages |
| `trinity-autonomous/` | `Agent & Execution Layer` | `autonomous-agent-primus.md` |
| `trinity-mcp-sfdc/` and 14 others | `MCP Integration Layer` | `index.md` (overview) + per-server pages |
| Enterprise data sources (Databricks, Power BI, Azure Search, Cosmos, O365, Account Directory) | `Enterprise Data Layer` | `index.md` covers them all |
| `trinity-guardian/` + Prompt Guard + Wiz + Dynatrace | `Authentication, Security & Governance` | `index.md` covers all four cross-cutting controls + Azure AD auth |
| `trinity-podcast-newsagent/` + Daily Recap | `Experience Layer` | `daily-recap/index.md` |
| `ignite.ps1`, Azure App Service deployments | `Deployment & Operations` | `index.md` |

---

## Page Template

Every doc page follows this shape unless there's a reason not to:

```markdown
---
sidebar_position: <n>
title: <Page Title>
description: <One-line description used in search and meta>
---

# <Page Title>

<One-paragraph what-and-why opener. No code, no jargon without inline definition.>

---

## What It Does / What It Is

<Bulleted list or short paragraphs. User-visible behavior first.>

---

## How It Works

<Conceptual walkthrough. ASCII box diagrams for flow. Numbered steps for journeys.>

---

## Key Concepts / Components

<Tables comparing things. One row per concept. Link out where deeper pages exist.>

---

## <Feature- or section-specific headings as needed>

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Link Title](/docs/path) | One-line value statement |
```

ASCII diagrams use box-drawing characters (see existing pages for the exact glyphs). Diagrams are conceptual — don't draw real network topology, draw the mental model.

---

## Workflow (How to Run This Skill)

The maintainer wants to steer organization page-by-page, not approve a giant batch. Default cadence:

1. **Confirm scope.** Before touching files, restate the proposed sidebar (or the one section about to be refreshed) and get a thumbs-up.
2. **One section at a time.** Pick one top-level section. Read the relevant sub-repo(s) and deck slides. Write/rewrite the pages for that section. Update `sidebars.js` and any `intro.md` cross-links. Stop. Show the maintainer. Get feedback.
3. **No speculative pages.** If a feature isn't actually in the platform yet, mark it "Coming Soon" with an admonition or skip it. Never imply something works that doesn't.
4. **Update `sidebars.js` and `intro.md`** as part of each section's pass, not at the end. Broken links break the build (`onBrokenLinks: 'throw'`).
5. **Verify the build** when a section is done: `npm run build` from `trinity-docs/`. If it throws, fix before moving on.

---

## Things to Watch For

- **Branding drift.** Trinity = internal name, WorkSphere = production brand. Assistant name = Trinity. Agent Primus is the autonomous agent's internal name. Use current names.
- **Model drift.** The platform has a multi-model strategy: Claude (Agent SDK) for chat orchestration and Agent Primus; Gemini (Google ADK) for pipeline agents like Daily Brief; Haiku for guardrails and lightweight tasks; tuned ML models for purpose-built agents. Confirm against `trinity-core` config before writing model pages.
- **Counts drift.** "15+ MCP servers" / "17+ agents" — check `trinity-core/config/agent_registry.json` and the actual `trinity-mcp-*` directory list before quoting numbers. Or write descriptively and avoid the count.
- **Status callouts.** Features that are in development should be flagged with `:::info Coming Soon` admonitions, not silently documented as live.
- **Legacy names.** When a component has been renamed (e.g. SalesCoach → Claude Agent SDK Orchestrator), keep a brief historical callout so readers who knew the old name aren't confused.

---

## What This Skill Does NOT Do

- Generate per-repo `DOCS.md` files. Single source of truth = trinity-docs.
- Write developer setup or API reference pages. Out of scope.
- Touch each sub-repo's README beyond a one-line "for full docs see trinity-docs."
- Auto-deploy. Build verification only — deploy is a separate step.
