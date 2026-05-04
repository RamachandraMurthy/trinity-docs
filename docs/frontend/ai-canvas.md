---
sidebar_position: 3
title: AI Canvas
description: A shared project workspace where multiple users collaborate with AI — prompts, responses, and run history are visible to everyone in the canvas
---

# AI Canvas

The **AI Canvas** turns Trinity from a single-user assistant into a **collaborative AI workspace**. A canvas is a shared project where multiple users work alongside the AI, with prompts, responses, and run history visible to everyone in the workspace.

If the [Single-User Workspace](/docs/frontend/single-user-workspace) is "me asking the AI a question," the AI Canvas is "my team and the AI working on something together."

---

## What It Is

A **shared project workspace for multi-user collaboration with role-aware access**.

| Aspect | Single-User Workspace | AI Canvas |
|---|---|---|
| **Participants** | One | Multiple |
| **Conversation** | Private to the user | Shared across all canvas members |
| **Role-aware access** | Per the user's role | Per each member's role within the canvas |
| **Best for** | Quick lookups, Q&A | Team research, project work, multi-perspective analysis |

---

## What It Enables

| Capability | What It Means |
|---|---|
| **Shared project workspaces** | Users can create canvases for projects, packaged for shared work, not just single-user chat |
| **Multiple participants in the same workspace** | Several team members in one canvas, each contributing prompts |
| **Collaboration experience** | Prompts can be entered by anyone; responses are visible to all collaborators |
| **Role-aware access** | Some users remain role-aware in shared environments (e.g. Sales users see Sales-relevant data); HR users see HR-relevant data; multi-role canvases work where role views overlap |
| **Shared run visibility** | Agent activity and outputs are visible within the workspace; all members can see what's running, what's planned, what produced output |
| **Persisted and shared across the canvas** | Project state and participants, conversation history and shared activity, prompt/response/context history |

---

## Why It Matters

AI Canvas turns WorkSphere into a **collaborative AI workspace, not just a chat interface**:

- **Brings multiple users into one orchestration layer.** Same orchestrator, same MCPs, same governance — but now for a team.
- **Uses one common orchestration model.** No special multi-user code path; the AI Canvas extends the same orchestration that powers single-user chat.
- **Extends quick spaces.** Inputs, outputs, prompts, and runs all share project context.
- **Preserves role-based access** even for project-wide work. The fact that something is shared doesn't override role gates.

---

## How It Works

```
                  USERS & ROLES
        ┌─────────────────────────────────────┐
        │   Alice (Sales)   Priya (HR)        │
        │   Jordan (Mixed)  Infinite Project  │
        │                   members           │
        └─────────────────────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────────────┐
        │   AI CANVAS — Shared Project        │
        │   Workspace                         │
        │                                     │
        │   • Shared Prompts                  │
        │   • Shared Responses                │
        │   • Project Sharing                 │
        │   • Infinite Project Members        │
        │   • Shared Activity (Agent Runs &   │
        │     Outputs)                        │
        │                                     │
        │   Canvas Context (Live):            │
        │     • Project · Q3 Growth Plan      │
        │     • Workspace ID                  │
        └────────────────┬────────────────────┘
                         ▼
        ┌─────────────────────────────────────┐
        │  CLOUD AGENT SDK ORCHESTRATOR       │
        │  (Powers AI Canvas)                 │
        │                                     │
        │  • Prompt / Project Coordination    │
        │  • Multi-Role Visibility            │
        └────────────────┬────────────────────┘
                         ▼
            ┌──────────┬─────────┬──────────┐
            │  TOOLS   │  MCP    │   DATA   │
            │ (role-   │ SERVERS │ (Cosmos, │
            │  aware)  │         │  search, │
            │          │         │  cache)  │
            └──────────┴─────────┴──────────┘
                         │
                         ▼
        ┌─────────────────────────────────────┐
        │   PERSISTED IN COSMOS DB            │
        │                                     │
        │   • Project state — participants,   │
        │     workspaces                      │
        │   • Conversation history,           │
        │     activity feed                   │
        │   • Prompt, response, context       │
        │     history                         │
        └─────────────────────────────────────┘
```

Three things to notice:

1. **The same orchestrator powers AI Canvas as Single-User Workspace.** No special "multi-user mode" was bolted on — AI Canvas extends the existing orchestration model.
2. **Tools and MCP access are still role-aware.** A canvas with mixed Sales and HR participants does not bypass role gates — each participant sees what their role allows.
3. **Persistence is per-project.** Cosmos DB stores the project state, the activity history, and the conversation history together so any participant can pick up where the team left off.

---

## Cross-Cutting Controls

The same Control Plane that wraps every other layer wraps AI Canvas:

| Control | What It Does in AI Canvas |
|---|---|
| **Trinity Guardian** | Tracks canvas activity, MCP availability, prompt-injection patterns across all participants |
| **Guardrails / Rules** | Policy enforcement before tools are called, regardless of which canvas member triggered them |
| **Wiz** | Cloud security posture for the underlying infrastructure |
| **Dynatrace** | Observability for canvas request paths |

For the cross-cutting controls in detail, see [Governance & Operations](/docs/authentication).

---

## What Gets Persisted

Cosmos DB carries the durable canvas state. When any participant returns to the canvas:

| Persisted | Made Available |
|---|---|
| **Project state** | Workspace ID, settings, participants |
| **Activity history** | Every prompt and response, ordered |
| **Run history** | Agent runs launched from this canvas, with status and outputs |
| **Shared context** | Files attached, accumulated reference data |

This persistence is what makes AI Canvas more than a group chat — the AI's own conversational state and tool history are preserved alongside the human conversation.

---

## When to Use AI Canvas vs. Single-User

| Situation | Use |
|---|---|
| Quick lookup, "answer my question" | Single-User Workspace |
| Voice query | Single-User Workspace |
| Multi-day project research, multiple contributors | AI Canvas |
| Cross-functional analysis (Sales + HR working on the same opportunity) | AI Canvas |
| Sharing what the AI produced with a teammate | Send-to-Canvas from Single-User Workspace, then continue together |

The user can move between them: a finding from Single-User Workspace can be **sent to a Canvas** to start collaborative work; output produced in a Canvas can be **shared via email** out to others.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Experience Layer](/docs/frontend) | The parent layer this surface belongs to |
| [Single-User Workspace](/docs/frontend/single-user-workspace) | The personal version of this experience |
| [Agent Space & Runs](/docs/frontend/agent-space) | Where agents launched from a canvas are tracked |
| [File Upload](/docs/frontend/file-upload) | Adding documents into the shared canvas context |
| [Authentication & Security](/docs/authentication) | The role-aware access model that governs canvases |
| [User Interaction Model](/docs/platform/user-interaction-model) | The four-step flow that powers every canvas request |
