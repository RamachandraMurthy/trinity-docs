---
sidebar_position: 2
title: Claude Agent SDK Orchestrator
description: The runtime that takes a user request, decides what to do, and returns a response — Trinity's orchestrator in detail
---

# Claude Agent SDK Orchestrator

The **Claude Agent SDK Orchestrator** is the runtime at the heart of the [Orchestration Layer](/docs/backend). Built on the Anthropic Claude Agent SDK, it is the single component that handles every request — from quick chat lookups to multi-tool research to agent run launches.

This page describes what the orchestrator does, in detail, broken down by responsibility.

---

## What the Orchestrator Does

In one sentence: it **takes a request, decides what to do, runs the chosen path, and composes the response**.

In four moves:

| Move | What Happens |
|---|---|
| **Resolve** | Identity, role, session, workspace context all become known and available for the rest of the request |
| **Decide** | Direct response, MCP tool call, agent run, or a combination — guided by the user's intent and what their role allows |
| **Run** | Tools execute, agents launch, outputs accumulate |
| **Compose** | The final response is assembled and streamed back; persistent state is saved |

---

## Role-Aware Routing

Every request carries a role (Sales, HR, etc.). Role-aware routing is the orchestrator's mechanism for **filtering what the request can reach**.

| Layer of Filtering | What Gets Filtered |
|---|---|
| **MCP servers** | Only the servers exposed to this role appear in the orchestrator's tool list |
| **Agents** | Only agents the role can invoke appear as available |
| **System prompt** | The base prompt and skill instructions are assembled with role-appropriate guidance |
| **Personal Memory** | Loaded for this user from their personal CLAUDE.md |

This is why the same question from a Sales user and an HR user resolves to different MCPs — they have different tool lists from the start.

Role-aware routing is not just a check at the door. It is **structural**: the orchestrator never holds a tool reference that the user shouldn't have. There is nothing to bypass.

For the access model in detail, see [Authentication & Security](/docs/authentication).

---

## Session & Context Handling

The orchestrator runs inside a **session** — a persistent connection to one user, identified by a unique session ID. The session carries everything the orchestrator needs to keep responses coherent across turns.

| Carried in the Session | Why |
|---|---|
| **Identity** | So every response is attributed to the right user |
| **Role** | So every tool list and agent list is correctly filtered |
| **Conversation history** | So follow-up questions don't need to re-state earlier context |
| **Active workspace** | If the request comes from an AI Canvas, the canvas's shared state |
| **Personal Memory** | Loaded from the per-user CLAUDE.md at session start |
| **System prompt** | Assembled once, then applied to every turn |

Sessions are **per WebSocket connection**. When the user disconnects, the in-memory session is cleared. The durable parts — chat history, personal memory updates, run records — are persisted to Cosmos DB.

---

## Response Composition

The orchestrator does not just return text. It composes responses from multiple sources:

| Source | Form |
|---|---|
| **Model output** | Streaming text — appears word-by-word in the user's surface |
| **Tool outputs** | Structured data from MCP servers — tables, JSON, document content |
| **Chart data** | The orchestrator detects when data warrants a visualization and structures the response so the frontend can render it |
| **Agent outputs** | Reports, deliverables, status updates from the Agent & Execution Layer |
| **Audio** | For voice flows, text-to-speech output is composed alongside the text response |

The composition logic lives inside the SDK plus a thin layer of orchestrator-specific assembly. The user experience is a single coherent response that mixes media as appropriate.

---

## Policies & Guardrails

Inline policy enforcement is part of every request, not a separate post-processing step.

| Where Applied | What's Enforced |
|---|---|
| **Before tool calls** | Is this tool allowed for this role? Does the input look like an injection attempt? |
| **Before responses return** | Does the response shape conform to organizational guidelines? Are sensitive patterns detected? |
| **At persistence** | Is the conversation saved appropriately? Is the user's personal memory update sanitized? |

Policies are surfaced from the Control Plane (Guardrails / Rules). The orchestrator does not invent policy — it enforces what the platform's policy files define. This means policy can change without redeploying the orchestrator.

For the full security model, see Prompt Guard under [Governance & Operations](/docs/authentication).

---

## How Skills and Memory Plug In

The orchestrator pulls in two kinds of per-session context at startup:

| Context | Source | Effect |
|---|---|---|
| **Chat Skills** | `.claude/skills/` directories at the project and user level | Pre-defined behaviors the orchestrator can apply for common tasks |
| **Personal Memory** | Per-user CLAUDE.md at the user context path | Personalized starting context for this user's conversations |

Both use the SDK's native `setting_sources: ["user", "project"]` configuration, with no custom loaders. This is intentional — leaning on the SDK's native model means new skills and new user memory take effect with no code changes.

For details, see [Chat Skills](/docs/backend/chat-skills) and [Personal Memory](/docs/backend/personal-memory).

---

## How the Orchestrator Calls Tools

Every enterprise data fetch is an MCP tool call. The orchestrator does not ever speak Salesforce SOQL or Databricks SQL — that is the MCP server's responsibility.

| Step | What Happens |
|---|---|
| Tool registration | At session start, every role-allowed MCP is registered as a tool the SDK can call |
| Tool selection | The model decides which tool fits the request |
| Policy check | Guardrails verify the call is allowed |
| Tool call | The SDK invokes the tool through the MCP transport |
| Result back | The tool result returns to the model for synthesis |
| Synthesis | The model uses the tool result to generate the user response |

For the MCP layer in detail, see [MCP Integration Layer](/docs/mcp-servers).

---

## How the Orchestrator Hands Off to Agents

Agents are not part of the orchestrator — they live in the [Agent & Execution Layer](/docs/agents). But the orchestrator is the **entry point** for every agent run.

| Pattern | Hand-off Behavior |
|---|---|
| **Purpose-Built / Google ADK / Claude Agent SDK** | Long-running runs are started in the background; control returns to the user immediately; status surfaces in Run Space |
| **Amazon Quick Embedded** | Embedded surface launched within WorkSphere; outputs feed back into Run Space |
| **Autonomous (Agent Primus)** | Long-running, multi-step planning agent; produces deliverables (Word, PowerPoint) |

For the agent patterns themselves, see [Agent & Execution Layer](/docs/agents).

---

## Persistence

When a session ends or a turn completes, the orchestrator persists durable state:

| Persisted | Lives In |
|---|---|
| Chat history | Cosmos DB (sessions container) |
| Run records | Cosmos DB (runs container) |
| Personal Memory updates | User context path (per-user CLAUDE.md) |
| Workspace state | Cosmos DB (workspaces container) |
| Security events | Cosmos DB (security-events container) |

Persistence is what makes the experience feel continuous. Returning users find their history, role, and memory ready to go.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Orchestration Layer](/docs/backend) | The full orchestration layer at a glance |
| [Chat Skills](/docs/backend/chat-skills) | Pre-defined behavior packs the orchestrator can apply |
| [Personal Memory](/docs/backend/personal-memory) | How user-specific context is captured and reused |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | What goes into the system prompt at session start |
| [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) | The full nine-band flow this orchestrator drives |
| [Agent & Execution Layer](/docs/agents) | Where the orchestrator hands off agent runs |
| [MCP Integration Layer](/docs/mcp-servers) | The standard data access layer this orchestrator calls |
| [Authentication & Security](/docs/authentication) | The role-aware access model this orchestrator enforces |
