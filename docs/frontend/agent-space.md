---
sidebar_position: 4
title: Agent Space & Runs
description: The catalog where users discover agents, launch them, and track long-running runs — the bridge between the Experience Layer and the Agent & Execution Layer
---

# Agent Space & Runs

**Agent Space & Runs** is where users encounter the agent ecosystem. The catalog side — Agent Space — exposes available agents grouped by purpose. The execution side — Run Space — surfaces every run's inputs, status, and outputs.

This is the third first-class Experience surface, alongside the [Single-User Workspace](/docs/frontend/single-user-workspace) and the [AI Canvas](/docs/frontend/ai-canvas). Where chat answers in seconds, agents do deeper, multi-step work that may take minutes — and they produce structured outputs (reports, decks, deliverables).

---

## What It Provides

| Side | What the User Does |
|---|---|
| **Agent Space (catalog)** | Discover available agents, browse by category, view what each agent does and what input it needs, configure tools, launch a run |
| **Run Space (execution)** | Monitor active runs, review completed runs, access produced outputs and audit trails |

---

## How Agents Are Surfaced

Trinity's [Agent & Execution Layer](/docs/agents) hosts five agent patterns. Agent Space presents them under purpose-driven groupings rather than implementation patterns:

| Group | Examples | Purpose |
|---|---|---|
| **Special Agents** | Deal Qualification, Win Probability, Company Executives, Competitor Analysis, Pricing Strategy, Client Profile, Competitive Intelligence | Sales-focused analysis — no project setup needed; just provide input |
| **RFP Agents** | Requirements Review, Response Review, Compliance & Contracts, Proposal Scoring, Technical & Planning, Requirements-Response Strategy | Proposal and RFP analysis — requires a project with uploaded RFP documents |
| **Autonomous Agents** | Agent Primus | Open-ended task execution and deliverable generation (Word, PowerPoint) |
| **External Agent Spaces** | Amazon Quick Embedded surfaces | Agent experiences hosted by partner platforms, embedded into WorkSphere |

The user does not need to know which agent pattern (Purpose-Built, Google ADK, Claude Agent SDK, Amazon Quick Embedded, Autonomous) underpins each entry. The Experience Layer abstracts that — they all launch the same way and their outputs return to the same Run Space.

For the patterns themselves, see [Agent & Execution Layer](/docs/agents).

---

## Launching a Run

The flow is consistent across all agents:

```
┌──────────────────────────┐
│   1. SELECT AGENT        │   Browse Agent Space, pick one
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   2. PROVIDE INPUT       │   The agent declares what it
│                          │   needs (opportunity ID,
│                          │   competitor name, RFP project,
│                          │   etc.)
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   3. LAUNCH              │   Run begins. Control returns
│                          │   to the user immediately.
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   4. BACKGROUND EXECUTION│   Pipeline runs through its
│                          │   stages. Status visible in
│                          │   Run Space.
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   5. OUTPUT AVAILABLE    │   Report, deliverable, or
│                          │   structured findings appear
│                          │   in Run Space.
└──────────────────────────┘
```

The user is not blocked while a run executes. They can keep working in the Single-User Workspace, in a Canvas, or even start more runs.

---

## Run Status

Every run carries a status as it progresses:

| Status | Meaning |
|---|---|
| **Pending** | Queued, waiting to start |
| **Running** | Pipeline is executing |
| **Completed** | Output is available |
| **Failed** | Something went wrong; error details available for review |

For long-running autonomous agents, status reflects more granular checkpoints (planning, tool calls, generating deliverable, etc.).

---

## What a Run Produces

Different agent patterns produce different output shapes, all surfaced through Run Space:

| Pattern | Typical Output |
|---|---|
| **Purpose-Built / Google ADK / Claude Agent SDK** | Structured report — executive summary, sections, recommendations, supporting data |
| **Autonomous (Agent Primus)** | Open-ended deliverables — including Word and PowerPoint files generated from approved templates |
| **Amazon Quick Embedded** | Output rendered within the embedded surface; may also feed back into Run Space |

---

## Why a Single Surface for All Agent Patterns

Trinity exposes five different agent patterns under the hood. The Experience Layer's job is to make that complexity invisible:

- **One discovery surface.** Users don't need to know whether to look for "Google ADK agents" vs. "Claude Agent SDK agents."
- **One launch flow.** Inputs, status, outputs all behave the same regardless of pattern.
- **One audit trail.** The Run Space record format is consistent — important for compliance and observability.
- **One place to find outputs.** Users don't have to remember where each kind of agent puts its results.

The five-pattern flexibility matters at the architecture level — it's how Trinity supports both internal Anthropic-built agents and partner-hosted Amazon agents under one umbrella. But to a user, an agent is an agent.

---

## How It Connects to the Other Surfaces

Agent Space is rarely a destination on its own — it's a starting point and a tracker:

- **Launched from the Single-User Workspace** — the user can hand off a deeper analysis to an agent
- **Launched from an AI Canvas** — the canvas's shared context becomes the agent's input; the output returns to the canvas for the team
- **Triggered by Daily Recap** — the Daily Brief is itself an orchestrated Google ADK agent flow

Outputs from Run Space can be shared back into a Canvas or sent via email, the same as any other response.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Experience Layer](/docs/frontend) | The parent layer this surface belongs to |
| [Agent & Execution Layer](/docs/agents) | The five agent patterns and how they execute |
| [WorkSphere Special Agents](/docs/agents) | Catalog of the seven sales-focused agents |
| [RFP Agents](/docs/rfp-advisor) | RFP project setup and the six RFP analysis agents |
| [Autonomous Agent (Agent Primus)](/docs/agents) | Open-ended task execution and deliverable generation |
| [Single-User Workspace](/docs/frontend/single-user-workspace) | One of the launch points for agent runs |
| [AI Canvas](/docs/frontend/ai-canvas) | The collaborative launch point |
