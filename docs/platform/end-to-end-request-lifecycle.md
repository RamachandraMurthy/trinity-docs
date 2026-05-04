---
sidebar_position: 4
title: End-to-End Request Lifecycle
description: A detailed walkthrough of every stage a request passes through, from user entry to persistence and observability
---

# End-to-End Request Lifecycle

This is the detailed view of what the [User Interaction Model](/docs/platform/user-interaction-model) summarizes in four steps. Every request — chat, voice, or agent run — passes through these nine bands. Each band is owned by a specific layer in the [Reference Architecture](/docs/platform/reference-architecture).

The flow is one direction (top to bottom), and every band emits telemetry to the control plane.

---

## The Nine Bands

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER REQUEST                                             │
│    Chat · Voice · Agent launch from any Experience surface  │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. CONTEXT & ROLE RESOLUTION                                │
│    Identity · Role · Session · Workspace context            │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. ORCHESTRATION                                            │
│    Claude Agent SDK Orchestrator receives the resolved       │
│    request and prepares to act                              │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. INTENT ROUTING & TOOL SELECTION                          │
│    What is the user asking for? Which MCPs, agents, or      │
│    direct responses fulfil it?                              │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. MCP SERVERS & AGENTS                                     │
│    Tools and agents invoked through the role-aware MCP      │
│    integration layer                                        │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. AGENTS & OUTPUTS                                         │
│    Outputs assembled — text, data, files, deliverables      │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. RESPONSE ASSEMBLY & DELIVERY                             │
│    Streaming response composed and returned to the user     │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. PERSISTENCE LAYER                                        │
│    Chat history · Run records · Personal Memory · Workspace │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 9. GOVERNANCE, SECURITY & OBSERVABILITY                     │
│    Cross-cutting controls observe, enforce, and report      │
└─────────────────────────────────────────────────────────────┘
```

---

## Band 1 — User Request

The request enters from an Experience surface. Voice is transcribed at the edge; agent launches carry their input parameters. From band 2 onward, all three input modes follow the same path.

| Source | Form |
|---|---|
| Single-User Workspace | Typed message or voice input |
| AI Canvas | Prompt added to a shared project |
| Agent Space | Agent launch with structured input |

---

## Band 2 — Context & Role Resolution

The request is enriched with the user's identity, role, tenant, and any active workspace context. This is the gating layer for everything downstream — no tool, agent, or data source is accessible without explicit role-aware authorization.

| Resolved | Source |
|---|---|
| Identity | Azure AD session |
| Role | User profile (Sales, HR, etc.) |
| Tenant | Organization context |
| Session | Active conversation thread |
| Workspace | If inside an AI Canvas, the canvas state |

---

## Band 3 — Orchestration

The Claude Agent SDK Orchestrator (the brain at the heart of trinity-core) receives the resolved request. It loads the correct system prompt, the available tools for this role, and any relevant context from session and personal memory.

This is also where chat skills are loaded — pre-defined behavior packs that shape how Trinity handles common task types (formatting, summarization, etc.).

---

## Band 4 — Intent Routing & Tool Selection

The orchestrator decides **what to do**. Three primary paths:

| Path | When |
|---|---|
| **Direct response** | The orchestrator can answer from context alone — no tool needed |
| **MCP tool call(s)** | The request requires data or actions from enterprise systems |
| **Agent run** | The request is a deeper, multi-step analysis — handed off to the Agent & Execution Layer |

A single request can mix paths: tools first, then a synthesized response. Guardrails check policy before any tool fires.

---

## Band 5 — MCP Servers & Agents

If the orchestrator decided to use tools or agents, this is where they execute.

| Resource | Reach |
|---|---|
| **Internal MCP Servers** | Salesforce data, HR data, campaign, win/loss, market intel, contracts, and more |
| **External / Shared MCP Servers** | Office 365, Account Directory, partner-hosted MCPs |
| **Agents** | Any of the five agent patterns — Purpose-Built, Google ADK, Claude Agent SDK, Amazon Quick Embedded, Autonomous |

Every MCP call is filtered by role-based console exposure. A Sales user's request cannot reach an HR-only MCP, even if the orchestrator's logic would otherwise have selected it.

---

## Band 6 — Agents & Outputs

Tool and agent outputs are gathered. Long-running agents are tracked in the **Run Space** with status, inputs, outputs, and telemetry. Short-running tool calls return inline to the orchestrator.

| Output Type | Examples |
|---|---|
| **Text** | Conversational responses, summaries |
| **Structured data** | Tables, charts, JSON for downstream use |
| **Files** | Word documents, PowerPoint decks (autonomous agents) |
| **Audio** | Daily Brief / Podcast briefings |

---

## Band 7 — Response Assembly & Delivery

The orchestrator composes the final response from the gathered outputs and streams it back to the user. Streaming means the user sees the response appear progressively, not in one batch.

| For the user | What they see |
|---|---|
| Single-User Workspace | Streaming text in their chat panel |
| AI Canvas | The new prompt and response appear in the shared workspace; other participants see the activity in real time |
| Agent Space | Status updates, then the completed report or deliverable when ready |

---

## Band 8 — Persistence Layer

Cosmos DB receives the durable state.

| Persisted | Purpose |
|---|---|
| **Chat history** | Conversation continuity across sessions |
| **Run records** | Audit trail and rerun capability for every agent run |
| **Personal Memory** | User-specific preferences, names, and patterns reused across future requests |
| **Workspace state** | AI Canvas shared activity, participants, project metadata |

---

## Band 9 — Governance, Security & Observability

The control plane observes every band. It is not a step at the end — it is active throughout, but it is named here because every request must produce the right signals for it.

| Control | Signals It Captures |
|---|---|
| **Trinity Guardian** | MCP availability, response health, prompt-injection patterns, policy violations |
| **Guardrails / Rules** | Policy enforcement decisions, response shaping outcomes |
| **Wiz** | Cloud security posture, environmental and infrastructure visibility |
| **Dynatrace** | Server behavior, app health, runtime telemetry |

These controls drive dashboards, alerts, metrics, and compliance reporting.

---

## Key Takeaways

- **Voice and chat share one orchestration path.** They differ only at band 1.
- **Connector access is role-aware end-to-end.** Role isn't checked once — it shapes the entire flow.
- **Runs and outputs are tracked.** Every agent run produces a durable record.
- **Memory and history support continuity.** Conversations, runs, and personal context accumulate over time.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | What Trinity delivers, in one page |
| [Reference Architecture](/docs/platform/reference-architecture) | The five layers and the control plane named in detail |
| [User Interaction Model](/docs/platform/user-interaction-model) | The four-step summary version of this lifecycle |
| [Orchestration Layer](/docs/backend) | The Claude Agent SDK Orchestrator and its components |
| [MCP Integration Layer](/docs/mcp-servers) | All internal and external MCP servers |
| [Governance & Operations](/docs/authentication) | The control plane in depth |
