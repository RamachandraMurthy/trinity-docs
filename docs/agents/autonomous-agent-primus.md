---
sidebar_position: 3
title: Agent Primus (Autonomous)
description: Trinity's autonomous agent — open-ended task execution, deliverable generation, and user-extensible workflows
---

# Agent Primus (Autonomous)

**Agent Primus** is Trinity's autonomous agent. It is the fifth agent pattern in the [Agent Strategy](/docs/agents/agent-strategy) — built on the Claude Agent SDK with full access to MCP servers, designed for **broader task execution** and **deliverable generation**.

If chat answers questions and pipeline agents produce structured reports, Agent Primus is the surface for **"do this whole piece of work for me."** Plan the steps, use the right tools, write the output as a Word document or PowerPoint deck, and hand it back when finished.

Externally the deck calls this **Autonomous Agent**. Internally and in the trinity-autonomous repo it is **Agent Primus**. Both names refer to the same agent.

---

## What It Does

| Capability | Example |
|---|---|
| **Plans open-ended tasks** | "Research Acme Corp and produce a client briefing deck" |
| **Uses MCP tools across multiple domains** | A single run may touch Salesforce, HR, Account Directory, web search |
| **Generates Word and PowerPoint deliverables** | Outputs are real `.docx` and `.pptx` files using approved DXC templates |
| **Schedules runs** | Tasks can be scheduled to run later — minutely, hourly, daily, or on a cron |
| **Runs unattended** | Scheduled tasks run without user input; no AskUserQuestion dead-waits |
| **Loads user skills** | User-uploaded SKILL.md files extend its behavior per-user |

---

## How It's Different From Other Agents

| Aspect | Special / RFP / Google ADK Agents | Agent Primus |
|---|---|---|
| **Scope** | One specific job (deal qual, RFP requirements, etc.) | Open-ended; user defines the task in natural language |
| **Output shape** | Structured report | Reports, decks, documents — whatever fits the task |
| **Runtime** | Google ADK pipeline or purpose-built | Claude Agent SDK with planning |
| **User extensibility** | Fixed behavior | User can upload skills to extend behavior |
| **Tool access** | Pre-defined per agent | All active MCPs available |
| **Run length** | Minutes | Minutes to hours, depending on the task |

The trade-off: Primus is more powerful but takes longer and has a larger policy/guardrail surface. Other agents are faster but narrower.

---

## How a Run Works

```
┌──────────────────────────────────────────────┐
│  USER DESCRIBES THE TASK                     │
│  Plain language: what to do, what to produce │
└────────────────────┬─────────────────────────┘
                     ▼
┌──────────────────────────────────────────────┐
│  ESTIMATOR (Haiku gate)                      │
│                                              │
│  A lightweight model reviews the task and    │
│  estimates scope. If it's expensive, the     │
│  user is shown the estimate to confirm       │
│  before the main run starts.                 │
└────────────────────┬─────────────────────────┘
                     ▼
┌──────────────────────────────────────────────┐
│  USER CONFIRMS                               │
│  (Or the run is unattended/scheduled —       │
│   in which case it proceeds without          │
│   waiting for input)                         │
└────────────────────┬─────────────────────────┘
                     ▼
┌──────────────────────────────────────────────┐
│  ONE SDK AGENT RUNS                          │
│                                              │
│  Plans the steps, uses the right MCP tools,  │
│  loads project skills + user skills,         │
│  generates intermediate artifacts            │
└────────────────────┬─────────────────────────┘
                     ▼
┌──────────────────────────────────────────────┐
│  DELIVERABLE                                 │
│                                              │
│  Word, PowerPoint, structured report,        │
│  or other output — surfaced in Run Space     │
└──────────────────────────────────────────────┘
```

The estimator gate is deliberate: long-running open-ended tasks can be expensive. Showing the user a scope estimate before the main run lets them approve or adjust the approach before commitment. Scheduled and unattended runs skip this step — they have already been pre-authorized.

---

## Skills

Agent Primus is **the platform's most user-extensible agent**. Two sources of behavior:

| Source | Loaded From | Purpose |
|---|---|---|
| **System Skills** | Project-level `.claude/skills/` | Skills shipped with Trinity — apply to all users |
| **User Skills** | Per-user context path | Skills the user uploaded — apply only to them |

### Adding a User Skill

| Step | What Happens |
|---|---|
| User opens "My Skills" in Agent Primus | Surface for managing personal skills |
| User uploads or pastes a SKILL.md file | Validated and prompt-guard-scanned for injection patterns |
| Skill is stored at the user's context path | Per-user, isolated |
| Next session start | The SDK auto-discovers via native `setting_sources` |
| Skill is available immediately | No deploy, no orchestrator restart |

For the broader skills system, see [Chat Skills](/docs/backend/chat-skills).

---

## Scheduling and Unattended Runs

Many tasks are useful as recurring runs — a weekly competitive update, a daily news brief, a monthly client report.

### Scheduling

| Frequency | Use Case |
|---|---|
| **Minutely / hourly** | Polling tasks (rare; reserved for monitoring use cases) |
| **Daily / weekly / monthly** | Most recurring deliverables |
| **Cron expressions** | Custom timing |

### Unattended Mode

Scheduled tasks run **unattended** — no user is waiting at the surface. This changes one behavior: the agent does not pause to ask the user for clarification. If it would normally ask a question, the run is denied immediately rather than dead-waiting until the schedule's next firing. The user is told the run failed and can adjust the task to be more self-contained.

Unattended runs are surfaced in Run Space the same as user-initiated runs. The user catches up at their own pace.

---

## Deliverable Generation

Primus produces real files, not text claiming to be files.

| Format | How It's Produced |
|---|---|
| **Word (.docx)** | Generated from approved DXC templates with content filled in via the brand system |
| **PowerPoint (.pptx)** | Generated from approved DXC templates; charts and tables rendered into slides |
| **Plain text / markdown / structured reports** | Generated as the run produces them |

The brand system enforces DXC's official visual language — fonts, colors, layouts, logo placement — so deliverables are on-brand without the user having to design.

---

## Security Model

Because Primus is open-ended and multi-tool, it has the largest policy surface of any agent. Several controls keep it safe:

| Control | What It Does |
|---|---|
| **Bash sandbox** | Dangerous-pattern blocklist on shell calls; workspace-scoped Write/Edit |
| **Path traversal protection** | File operations cannot escape the user's workspace |
| **Upload limits** | Bounded size, count, and total per-user |
| **Rate limiting** | Per-user run rate limits prevent abuse |
| **Role-based MCP access** | Same role gates as the rest of the platform |
| **WebSocket Origin checks** | Only legitimate WorkSphere origins can connect |
| **Workspace cleanup** | Per-run workspaces are reset between runs |
| **Error sanitization** | Internal errors do not leak filesystem paths or tokens |
| **Prompt Guard scanning** | Inputs and uploaded skills are scanned for injection patterns |
| **Token tracking** | Input and output token counts are recorded per run |

The control plane (Trinity Guardian, Guardrails, Wiz, Dynatrace) wraps every Primus run the same as it wraps every other layer.

For the full security story, see [Authentication & Security](/docs/authentication).

---

## What Lives Where

| Aspect | Detail |
|---|---|
| **Runtime** | Python service in the **trinity-autonomous** repo |
| **Built on** | Claude Agent SDK (same as the orchestration layer) |
| **Surface** | Dedicated Agent Primus UI in WorkSphere with home button + DXC logo header |
| **Skills surface** | "My Skills" panel — view, upload, edit, delete |
| **Catalog endpoint** | `GET /api/skills` returns system + user skills with `source` tag |

The trinity-autonomous repo is separate from trinity-core because Primus's lifecycle (long-running runs, scheduling, deliverable generation) is structurally different from chat orchestration.

---

## When to Use Agent Primus

| If You Need... | Use |
|---|---|
| A quick answer | [Single-User Workspace](/docs/frontend/single-user-workspace) |
| A specific structured report | A Special or RFP Agent |
| A pipeline run (Daily Brief) | The relevant Google ADK agent |
| A Word or PowerPoint deliverable | Agent Primus |
| Multi-step open-ended work | Agent Primus |
| A recurring scheduled task | Agent Primus |
| Behavior extended with your own skills | Agent Primus |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Agent & Execution Layer](/docs/agents) | The parent layer this agent belongs to |
| [Agent Strategy](/docs/agents/agent-strategy) | The five patterns and where Primus fits |
| [Chat Skills](/docs/backend/chat-skills) | The skills system Primus extends with user-uploadable behavior |
| [Agent Space & Runs](/docs/frontend/agent-space) | Where users launch and track Primus runs |
| [Authentication & Security](/docs/authentication) | The security model that wraps Primus |
| [MCP Integration Layer](/docs/mcp-servers) | How Primus reaches enterprise data |
