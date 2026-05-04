---
sidebar_position: 2
title: Reference Architecture
description: The five layers of the Trinity (WorkSphere) platform and the control plane that wraps them
---

# Reference Architecture

Trinity is organized into **five layers** plus a **control plane** that cuts across all of them. Every component in the platform belongs to exactly one layer, and the layer model is the same vocabulary used across architecture reviews, runbooks, and this documentation.

```
                        CROSS-CUTTING CONTROLS
                Trinity Guardian · Guardrails / Rules
                        Wiz · Dynatrace

┌─────────────────────────────────────────────────────────────┐
│ 1. EXPERIENCE LAYER                                         │
│    What users see and interact with                         │
├─────────────────────────────────────────────────────────────┤
│ 2. ORCHESTRATION LAYER                                      │
│    Where every request is routed, composed, and audited     │
├─────────────────────────────────────────────────────────────┤
│ 3. AGENT & EXECUTION LAYER                                  │
│    Where agents run — five patterns share one runtime model │
├─────────────────────────────────────────────────────────────┤
│ 4. MCP INTEGRATION LAYER                                    │
│    The standard access layer for every enterprise system    │
├─────────────────────────────────────────────────────────────┤
│ 5. ENTERPRISE DATA LAYER                                    │
│    The systems of record Trinity reads from and writes to   │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Experience Layer

The surface users interact with. Three first-class experiences sit here, each tuned for a different mode of work.

| Component | What It Provides |
|---|---|
| **Single-User Workspace** | Personal chat-and-voice interaction. One user, one conversation. Real-time streaming responses. The fastest path from question to answer. |
| **AI Canvas** | A shared project workspace. Multiple participants share prompts, responses, and run history. The path for collaborative analysis and multi-user research. |
| **Agent Space & Runs** | A catalog where users discover, launch, and track agents. Long-running runs surface here with status, outputs, and audit trails. |
| **Role-Based Access** | Every Experience surface is gated by the user's role and tenant. Sales users see sales features; HR users see HR features. |

**Companion surface (coming soon):** the Trinity Mobile app — currently in development — will extend the Single-User Workspace experience to phones, with voice input and a mobile-tuned chat UI.

---

## Layer 2 — Orchestration Layer

The single brain that handles every request, regardless of which experience the user is in.

| Component | What It Does |
|---|---|
| **Claude Agent SDK Orchestrator** | The runtime that takes a user request, decides what to do, and returns a response. Built on the Claude Agent SDK (the Anthropic Claude Agent SDK). |
| **Role-Aware Routing** | Filters which tools, agents, and data the request can reach based on the caller's role. The same question from a Sales user and an HR user resolves to different MCPs. |
| **Session & Context Handling** | Holds conversation history, user identity, role, and any active workspace context for the duration of a session. |
| **Response Composition** | Assembles the final response from text, tool outputs, structured data, and any artifacts the agent produced. |
| **Policies & Guardrails** | Inline policy enforcement — applied before tools are called and before responses are returned. Connects to the Control Plane. |

This layer is the same regardless of the experience: chat in the Single-User Workspace, prompts in an AI Canvas, and agent runs all flow through it.

---

## Layer 3 — Agent & Execution Layer

Trinity supports **five agent patterns**. They share a common execution model — agents are launched from the Agent Space, run in the background, and outputs land in Run Space with full telemetry and audit.

| Pattern | Built On | Best For |
|---|---|---|
| **Purpose-Built Agents** | Workflow-specific code | Focused, packaged outcomes (deal qualification, win probability, etc.) |
| **Google ADK Agents** | Google ADK + Gemini | Orchestrated multi-step flows like the daily briefing |
| **Claude Agent SDK Agents** | Anthropic Claude Agent SDK | Native, modeled agents aligned to the platform's orchestration model |
| **Amazon Quick Embedded Agents** | Iframe integration with AWS-hosted agent spaces | External agent surfaces brought into WorkSphere |
| **Autonomous Agents (Future Ready)** | Claude Agent SDK + existing MCP servers | Broader task execution and deliverable generation (Word, PowerPoint) |

The **Autonomous Agent** is what we call **Agent Primus** internally — a long-running agent that can plan, use tools, and generate deliverables.

| Cross-Cutting Capability | Purpose |
|---|---|
| **Background Execution** | Long-running work continues independently of the user's session |
| **Run Tracking** | Every run produces a record: inputs, outputs, status, timing |
| **Telemetry & Audit** | Reliable, observable runs with full audit trails for compliance |

---

## Layer 4 — MCP Integration Layer

**MCP (Model Context Protocol)** is the standard access layer. Every connection from the orchestrator to an enterprise system goes through an MCP server — there is no ad-hoc database code in the orchestration path.

| Component | What It Provides |
|---|---|
| **Internal MCP Servers** | Servers Trinity owns that expose internal enterprise data, tools, and actions (Salesforce, HR, campaign, win/loss, market intel, contracts, and more) |
| **External / Shared MCP Servers** | Third-party or shared MCPs (e.g. Office 365, partner agent spaces) wrapped in the same protocol |
| **Role-Based Console Exposure** | Each role gets a different set of MCPs exposed in the orchestration layer's tool list |

Why MCP matters as a design choice:

- **One protocol, many sources.** New systems plug in by exposing an MCP server — no orchestrator changes.
- **Reusable connectors across domains.** Sales and HR can share connectors when the data is shared (Office 365, Account Directory).
- **Clear separation between orchestration and source-specific complexity.** The orchestrator never speaks Salesforce SOQL or Databricks SQL — the MCP server handles that.
- **Governable access.** Every MCP call is observable and policy-checkable in one place.

---

## Layer 5 — Enterprise Data Layer

The systems of record. Trinity reads from these via MCPs and, where appropriate, persists state into them.

| System | Role |
|---|---|
| **Databricks UDP** | Salesforce data (campaigns, opportunities), client-reference data, win-loss data |
| **Power BI** | Performance and reporting insights |
| **Azure Cognitive Search / Index** | Document search and indexing — fuels RFP analysis and knowledge retrieval |
| **Office 365** | Outlook (email) and calendar |
| **Account Directory** | People and account lookups |
| **Cosmos DB** | Trinity's own persistence — chat history, workspaces, personal memory, agent runs |

Most of these are accessed through MCP servers; Cosmos DB is the platform's own data store rather than an enterprise system Trinity reads from.

---

## Cross-Cutting Controls (Control Plane)

Four controls operate **across all five layers**. They are not part of any single component — they wrap the whole platform.

| Control | What It Does | What It Protects |
|---|---|---|
| **Trinity Guardian** | Command center for security and operations. Tracks MCP availability, response health, and platform health. Detects prompt-injection patterns and triggers alerts. | Platform reliability and safety |
| **Guardrails / Rules** | Policy files that shape response behavior, support data and access controls, and define organizational and response boundaries. | Safe, policy-aligned responses |
| **Wiz** | Cloud security posture and vulnerability monitoring. Visibility into environmental issues and compliance. | Visibility into our service activity and infrastructure |
| **Dynatrace** | Observability. Tracks server behavior, application health, and operational health. Strengthens platform runtime observability. | Faster detection of runtime issues |

What the control layer produces:

- Dashboards and operational visibility
- Alerts and issue detection
- Metrics and service-status insights
- Compliance and security insights

---

## What This Architecture Enables

| Outcome | How the Architecture Delivers It |
|---|---|
| Unified chat, voice, and orchestration | One orchestration layer serves all three Experience surfaces |
| Role-aware access to data, tools, and agents | Role-Aware Routing in the Orchestration Layer; Role-Based Console Exposure in the MCP Layer |
| Extensible agent ecosystem | Five agent patterns share one execution model; new patterns plug in without rebuilding the surface |
| Centralized control for governance and observability | Cross-cutting controls operate across every layer, not per-component |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | The 60-second summary of what Trinity delivers |
| [User Interaction Model](/docs/platform/user-interaction-model) | The four-step flow from user request to persisted response |
| [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) | The detailed lifecycle a request passes through, layer by layer |
| [Experience Layer](/docs/frontend) | Detailed pages for Single-User Workspace, AI Canvas, Agent Space & Runs |
| [Orchestration Layer](/docs/backend) | The Claude Agent SDK Orchestrator and its components |
| [Agent & Execution Layer](/docs/agents) | The five agent patterns in detail |
| [MCP Integration Layer](/docs/mcp-servers) | All internal and external MCP servers |
| [Governance & Operations](/docs/authentication) | Trinity Guardian, Guardrails, Wiz, Dynatrace |
