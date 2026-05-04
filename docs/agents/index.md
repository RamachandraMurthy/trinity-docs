---
sidebar_position: 1
title: Agent & Execution Layer
description: Trinity's agent ecosystem — five agent patterns sharing one execution model, exposed through Agent Space and tracked in Run Space
---

# Agent & Execution Layer

The **Agent & Execution Layer** is where agents live and run. It is the third layer in the [Reference Architecture](/docs/platform/reference-architecture), called by the [Orchestration Layer](/docs/backend) when a request needs deeper, multi-step work.

The defining property of this layer: **five different agent patterns share one execution model**. Whether an agent is a focused workflow, a Google ADK pipeline, a Claude Agent SDK agent, an embedded AWS agent surface, or an autonomous deliverable-producing agent, they all launch from the same Agent Space, run with consistent telemetry, and surface outputs in the same Run Space.

---

## What This Layer Does

| Responsibility | What It Means |
|---|---|
| **Hosts the catalog of agents** | Every agent the platform offers is registered and discoverable |
| **Runs agents in the background** | Long-running work happens here, asynchronously, without blocking the user |
| **Tracks every run** | Inputs, status, outputs, telemetry, audit trails — all persisted |
| **Produces structured outputs** | Reports, deliverables (Word/PowerPoint), audio briefings — whatever the pattern produces |

It is **launched from** the Orchestration Layer. It **reaches** enterprise data via the [MCP Integration Layer](/docs/mcp-servers). It **does not** make user-facing UI decisions — that is the Experience Layer's job.

---

## The Five Agent Patterns

Trinity supports five agent patterns. Each is suited to a different kind of work; together they cover everything from focused single-purpose helpers to open-ended autonomous deliverable generation.

| Pattern | Built On | Best For |
|---|---|---|
| [**Purpose-Built Agents**](/docs/agents/agent-strategy#purpose-built) | Workflow-specific code | Focused, packaged outcomes — deal qualification, win probability, etc. |
| [**Google ADK Agents**](/docs/agents/agent-strategy#google-adk) | Google ADK + Gemini | Orchestrated multi-step flows like the Daily Brief |
| [**Claude Agent SDK Agents**](/docs/agents/agent-strategy#claude-agent-sdk) | Claude Agent SDK | Native, modeled agents aligned to the platform's orchestration model |
| [**Amazon Quick Embedded Agents**](/docs/agents/agent-strategy#amazon-quick) | Iframe integration with AWS-hosted agent spaces | External agent surfaces brought into WorkSphere |
| [**Autonomous Agents (Agent Primus)**](/docs/agents/autonomous-agent-primus) | Claude Agent SDK + existing MCP servers | Broader task execution and deliverable generation (Word, PowerPoint) |

For the full pattern story — when to use each, what's shared between them, why the platform supports five — see [Agent Strategy](/docs/agents/agent-strategy).

---

## The Common Execution Model

Regardless of pattern, every agent obeys the same execution model:

```
┌──────────────────────────┐
│  AGENT SPACE             │   User discovers and launches
│  (catalog)               │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  BACKGROUND EXECUTION    │   Long-running work continues
│                          │   independently of the user's
│                          │   session
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  RUN TRACKING            │   Inputs, status, outputs all
│                          │   persisted — auditable
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  TELEMETRY & AUDIT       │   Reliable, observable runs
│                          │   with full audit trails
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  RUN SPACE               │   Outputs surface back to the
│  (results)               │   user, ready to consume or share
└──────────────────────────┘
```

Three things this enables:

- **Users do not block.** Once a run starts, control returns immediately.
- **Compliance and audit have one shape.** Every run record looks the same regardless of pattern.
- **New patterns plug in.** Adding a sixth pattern would mean wiring it into the same launch/tracking model — not building parallel infrastructure.

---

## Agent Catalog (What's Available)

Two named catalogs sit on top of the patterns:

### WorkSphere Special Agents

Sales-focused analysis agents. **No project setup needed** — provide the input, run, get the report.

| Agent | What It Does |
|---|---|
| [Deal Qualification](/docs/agents/special/deal-qualification) | Assesses deal health using opportunity data |
| [Win Probability](/docs/agents/special/win-probability) | ML-based prediction of deal success |
| [Company Executives](/docs/agents/special/company-executives) | Research on client leadership |
| [Competitor Analysis](/docs/agents/special/competitor-analysis) | Competitive intelligence and positioning |
| [Pricing Strategy](/docs/agents/special/pricing-strategy) | Cost analysis, TCO, and pricing recommendations |
| [Client Profile](/docs/agents/special/client-profile) | Multi-section company research for sales prep |
| [Competitive Intelligence](/docs/agents/special/competitive-intelligence) | Battle reports with scorecards and SWOT |

### RFP Agents

Document-focused analysis agents. **Require project setup first** — see [RFP Advisor](/docs/rfp-advisor).

| Agent | What It Does |
|---|---|
| [Requirements Review](/docs/agents/rfp/requirements-review) | Extracts and analyzes RFP requirements |
| [Response Review](/docs/agents/rfp/response-review) | "Red team" quality review of proposal responses |
| [Requirements-Response Strategy](/docs/agents/rfp/requirements-response-strategy) | Comprehensive gap analysis and win strategy |
| [Compliance & Contracts](/docs/agents/rfp/compliance-and-contracts) | Regulatory and contract risk assessment |
| [Proposal Scoring](/docs/agents/rfp/proposal-scoring) | Multi-dimension scoring matrix |
| [Technical & Planning](/docs/agents/rfp/technical-and-planning) | Architecture review, timeline, stakeholder analysis |

### Autonomous Agent

| Agent | What It Does |
|---|---|
| [Agent Primus](/docs/agents/autonomous-agent-primus) | Open-ended task execution and deliverable generation — Word, PowerPoint, multi-step research |

---

## Choosing the Right Agent

| If You Need To... | Use This |
|---|---|
| Get a quick answer | The [Single-User Workspace](/docs/frontend/single-user-workspace) — not an agent |
| Assess deal health | Deal Qualification |
| Predict deal outcome | Win Probability |
| Research a company | Client Profile |
| Understand a competitor | Competitor Analysis or Competitive Intelligence |
| Analyze RFP requirements | Requirements Review (after RFP project setup) |
| Red-team your proposal | Response Review |
| Build a win strategy from RFP | Requirements-Response Strategy |
| Generate a PowerPoint or Word deliverable | Agent Primus |
| Plan a complex multi-step task | Agent Primus |

---

## Why Five Patterns Instead of One

Trinity could have picked one agent framework and run with it. Five exist because:

- **Different work needs different runtimes.** A focused predictive model needs less than a Claude Agent SDK conversational agent; a long-running deliverable generator needs more.
- **Partner platforms.** Amazon Quick Embedded lets us bring AWS-hosted agent surfaces into WorkSphere without rebuilding them.
- **Best-of-breed for each job.** Daily Brief works well on Google ADK; deal analysis works well on Claude Agent SDK; deliverable generation needs Agent Primus's planning model.

For users this is invisible — they see one Agent Space. For the platform, the five-pattern flexibility is what makes the agent ecosystem extensible.

---

## How This Layer Connects to Others

| Layer | Connection |
|---|---|
| **Experience Layer** | Agent Space is a first-class Experience surface; Run Space surfaces outputs there |
| **Orchestration Layer** | The orchestrator is the entry point for every agent run; it loads tools, applies role-aware routing, and hands off |
| **MCP Integration Layer** | Agents reach enterprise data through MCP servers, with the same role gating as chat |
| **Enterprise Data Layer** | Run records persist to Cosmos DB; deliverables persist to blob storage |
| **Control Plane** | Trinity Guardian observes runs; guardrails apply before tool calls; Wiz and Dynatrace receive telemetry |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Agent Strategy](/docs/agents/agent-strategy) | The five patterns in depth |
| [Agent Primus (Autonomous)](/docs/agents/autonomous-agent-primus) | Open-ended task execution and deliverable generation |
| [Agent Space & Runs](/docs/frontend/agent-space) | The Experience surface where agents are launched and tracked |
| [RFP Advisor](/docs/rfp-advisor) | Project setup required for RFP Agents |
| [Reference Architecture](/docs/platform/reference-architecture) | The five layers and where this one fits |
| [MCP Integration Layer](/docs/mcp-servers) | How agents reach enterprise data |
