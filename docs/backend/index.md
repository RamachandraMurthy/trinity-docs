---
sidebar_position: 1
title: Orchestration Layer
description: The single brain that handles every request — the Claude Agent SDK Orchestrator, role-aware routing, session and context handling, response composition, chat skills, and personal memory
---

# Orchestration Layer

The **Orchestration Layer** is the single brain of Trinity. Every request — chat, voice, AI Canvas prompt, agent run launch — flows through it. It is the second layer in the [Reference Architecture](/docs/platform/reference-architecture), sitting between the [Experience Layer](/docs/frontend) and everything below.

The defining property of this layer: **one orchestrator serves every Experience surface and every agent pattern**. Chat in the Single-User Workspace, prompts in an AI Canvas, and agent runs all flow through the same components. That is what keeps behavior, security, and observability consistent across the platform.

---

## What This Layer Does

The Orchestration Layer is responsible for everything between "the user said something" and "the user got a response."

| Responsibility | What It Means |
|---|---|
| **Resolve the request** | Identify the user, their role, the active session and workspace context |
| **Decide what to do** | Direct response, MCP tool call, agent run, or a combination |
| **Enforce role-aware access** | Filter which tools, agents, and data are visible to this request |
| **Run the chosen path** | Invoke MCPs and agents; wait for outputs |
| **Compose the response** | Assemble streaming text, structured data, files, audio |
| **Apply guardrails** | Run policy checks before tools fire and before responses return |
| **Persist** | Save chat history, run records, personal memory updates |

It does **not** decide what users can see in the UI, run agents itself, or reach enterprise data directly — those are jobs for layers 1, 3, 4, and 5.

---

## Components

The layer is made of five components, each with a focused job. Together they form the Claude Agent SDK Orchestrator.

```
┌────────────────────────────────────────────────────────────┐
│           CLAUDE AGENT SDK ORCHESTRATOR                    │
│                                                            │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │ Role-Aware Routing │  │ Session & Context  │            │
│  └────────────────────┘  │ Handling           │            │
│                          └────────────────────┘            │
│                                                            │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │ Response           │  │ Policies &         │            │
│  │ Composition        │  │ Guardrails         │            │
│  └────────────────────┘  └────────────────────┘            │
│                                                            │
│  ┌─────────────────────────────────────────────┐           │
│  │ Chat Skills                                 │           │
│  │ Pre-defined behavior packs the              │           │
│  │ orchestrator can invoke for common tasks    │           │
│  └─────────────────────────────────────────────┘           │
│                                                            │
└────────────────────────────────────────────────────────────┘

                Personal Memory (per-user state)
            persisted across sessions in Cosmos DB
```

| Component | Job |
|---|---|
| [**Claude Agent SDK Orchestrator**](/docs/backend/claude-agent-sdk-orchestrator) | The runtime built on the Anthropic Claude Agent SDK. Receives requests, decides what to do, and returns responses. |
| **Role-Aware Routing** | Filters which tools, agents, and data are visible to this request based on the user's role |
| **Session & Context Handling** | Holds conversation history, identity, role, and active workspace context for the duration of a session |
| **Response Composition** | Assembles the final response from text, tool outputs, structured data, and any artifacts |
| **Policies & Guardrails** | Inline policy enforcement, applied before tools fire and before responses return |
| [**Chat Skills**](/docs/backend/chat-skills) | Pre-defined behavior packs the orchestrator can load to handle common task types consistently |
| [**Personal Memory**](/docs/backend/personal-memory) | Per-user store that captures preferences and patterns over time, reused across future sessions |

---

## Why "Claude Agent SDK"?

The orchestrator is built on the **Claude Agent SDK** — externally the term used in our architecture deck and reference materials. Internally, this is the **Anthropic Claude Agent SDK** (Anthropic's agent framework). The same runtime that powers other Anthropic-built agent platforms powers Trinity's orchestration.

| External name | Internal name |
|---|---|
| Claude Agent SDK | Claude Agent SDK / Anthropic SDK |

The choice matters because it shaped what's possible in the Orchestration Layer:

- **Tool use is native** — the SDK handles MCP tool calls as first-class behavior, not a bolt-on
- **Skills are first-class** — chat skills are loaded at session start as part of the SDK's setting sources
- **Streaming is built in** — token-by-token streaming flows from the model through the SDK to the user without custom plumbing
- **Personal memory plugs in** — per-user CLAUDE.md files are loaded from a user context path, giving every session a personalized starting point

---

## How Every Request Flows

The full lifecycle is documented at the platform level. Here is what each Orchestration Layer component does in that flow:

| Lifecycle Band | Owner in This Layer |
|---|---|
| **Context & Role Resolution** | Session & Context Handling |
| **Orchestration** | Claude Agent SDK Orchestrator (loads skills, system prompt, tools) |
| **Intent Routing & Tool Selection** | Claude Agent SDK + Role-Aware Routing |
| **Policies & Guardrails** | Applied before tools fire and before responses return |
| **Response Assembly & Delivery** | Response Composition |
| **Persistence** | Chat history, run records, personal memory updates |

For the full nine-band lifecycle, see [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle).

---

## What Lives Where

The orchestration code lives in **trinity-core** — a Python service using `aiohttp` for the WebSocket API, with the SDK runtime embedded inside. There is one orchestrator instance per environment (dev, staging, production); each WebSocket session gets its own session state.

| Aspect | Detail |
|---|---|
| **Runtime** | Python with the Claude Agent SDK |
| **Transport** | WebSocket for streaming chat; HTTP for control surfaces |
| **State** | In-memory per session; persisted to Cosmos DB at session end |
| **MCP integration** | All MCPs registered as tools at session start, filtered by role |

Historical note: this engine was once called **SalesCoach** — a name from when Trinity was sales-only. The platform expanded to HR and other roles, but the engine kept the original name internally for a while. In external documentation we now use **Claude Agent SDK Orchestrator** consistently.

---

## How It Connects to Other Layers

| Layer | Connection |
|---|---|
| **Experience Layer** | WebSocket from the surface to the orchestrator; streaming responses back |
| **Agent & Execution Layer** | Orchestrator invokes agents; agents may run inline (short) or in the background (long) with results returned to Run Space |
| **MCP Integration Layer** | Every enterprise data fetch goes through an MCP tool call; role gates applied here |
| **Enterprise Data Layer** | Cosmos DB receives durable state; other systems are reached only via MCPs |
| **Control Plane** | Trinity Guardian observes every request; Guardrails enforce policy inline; Wiz and Dynatrace receive telemetry |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Claude Agent SDK Orchestrator](/docs/backend/claude-agent-sdk-orchestrator) | The orchestrator itself in detail — routing, sessions, responses, policy |
| [Chat Skills](/docs/backend/chat-skills) | The pre-defined behavior packs the orchestrator can load |
| [Personal Memory](/docs/backend/personal-memory) | How user preferences accumulate and personalize future sessions |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How the system prompt is assembled per session |
| [Reference Architecture](/docs/platform/reference-architecture) | The full layer model this layer fits into |
| [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) | The detailed flow across all nine bands |
| [Agent & Execution Layer](/docs/agents) | What happens when the orchestrator hands off to an agent |
| [MCP Integration Layer](/docs/mcp-servers) | The standard data access layer the orchestrator calls |
