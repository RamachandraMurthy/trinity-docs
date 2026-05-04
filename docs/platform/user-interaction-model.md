---
sidebar_position: 3
title: User Interaction Model
description: How a single user request flows through Trinity — from entry to orchestrated response and persisted context
---

# User Interaction Model

This page explains **how a single request travels through Trinity** at a conceptual level. It is the bridge between the [Reference Architecture](/docs/platform/reference-architecture) (which names the layers) and the [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) (which goes deep into every stage).

The flow is the same whether the user typed a question in the Single-User Workspace, posted a prompt in an AI Canvas, or launched an agent from the Agent Space.

---

## The Four-Step Flow

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ 1. USER      │──▶│ 2. ROLE &    │──▶│ 3. ORCHEST.  │──▶│ 4. RESPONSE  │
│    ENTRY     │   │   CONTEXT    │   │   & ROUTING  │   │   & PERSIST. │
│              │   │   RESOLUTION │   │              │   │              │
│ Type, voice, │   │ Identify the │   │ Decide what  │   │ Return text, │
│ or agent     │   │ user, role,  │   │ tools or     │   │ data, files; │
│ launch from  │   │ session,     │   │ agents to    │   │ save chat    │
│ any surface  │   │ workspace    │   │ invoke; run  │   │ history and  │
│              │   │ context      │   │ them         │   │ context      │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

---

## Step 1 — User Entry

The user originates a request from one of the Experience surfaces:

- **Single-User Workspace** — typed message or voice input in the personal chat
- **AI Canvas** — prompt added to a shared workspace where multiple participants are collaborating
- **Agent Space** — agent launched with required input parameters; long-running run begins

Trinity treats all three the same from this point forward. Voice is transcribed at the edge and joins the same path as typed input.

---

## Step 2 — Role & Context Resolution

Before anything is routed, Trinity resolves **who is asking and what they're allowed to see**.

| Resolved | What It Means |
|---|---|
| **Identity** | The Azure AD user signed in to WorkSphere |
| **Role** | Sales, HR, or another business role — drives access to MCPs, agents, and data |
| **Tenant** | The user's organization context, applied to all queries |
| **Session** | The conversation thread the request belongs to (carries history) |
| **Workspace context** | If the request is in an AI Canvas, the project's shared state |

Result: the orchestrator knows exactly which tools, agents, and data this request is allowed to reach. No request proceeds without this resolution.

---

## Step 3 — Orchestration & Routing

The Claude Agent SDK Orchestrator receives the resolved request. It does three things:

1. **Decide intent.** What is the user actually asking for? A lookup? An analysis? A deliverable?
2. **Route to the right capability.** Is this a direct chat answer, an MCP tool call, an agent run, or a combination?
3. **Run.** Invoke the chosen tools and agents, gather their outputs, compose the response.

This is where role-aware routing kicks in: even if a tool exists in the platform, it isn't visible to the orchestrator for this request unless the user's role allows it. Guardrails and policies are checked before tools execute.

For long-running agents, Step 3 returns control to the user immediately and the run continues in the background, with status surfacing in the Agent Space.

---

## Step 4 — Response & Persistence

The orchestrator assembles the final response and returns it to the user. At the same time, it persists the relevant state.

| What Gets Returned | What Gets Persisted |
|---|---|
| Streaming text response | Chat history (Cosmos DB) |
| Structured data (tables, charts) | Run records (inputs, outputs, status, telemetry) |
| Files and deliverables (Word, PowerPoint) | Personal memory updates (where applicable) |
| Voice output (when requested) | AI Canvas shared activity feed |

Persistence is what makes Trinity feel continuous. The next time the user opens the workspace, their history, role, and personal memory are all available — without re-asking.

---

## What to Focus on in the Next Diagram

The [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) takes these four steps and breaks them into nine detailed bands. Things to look for:

- **Voice and chat share one orchestration path.** They differ only at the edge.
- **Access to tools and data is role-aware throughout.** It isn't just checked at the door.
- **Agents are tracked in the Run Space.** Every run produces a durable record.
- **Memory and history support continuity over time.** The user's experience accumulates.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | What Trinity delivers and why |
| [Reference Architecture](/docs/platform/reference-architecture) | The five layers and the control plane |
| [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) | The detailed nine-band lifecycle |
| [Experience Layer](/docs/frontend) | The three user-facing surfaces |
| [Orchestration Layer](/docs/backend) | The orchestrator and its components |
