---
sidebar_position: 2
title: System Prompt Construction
description: How Trinity's system prompt is assembled per session — the base prompt plus role, tools, skills, and personal memory
---

# System Prompt Construction

Every conversation starts with a **system prompt**. This is the first thing the model reads when a session begins — it tells the model what it is, what it can do, what rules apply, and what context exists. The quality of every Trinity response depends on the quality of this prompt.

The prompt is **not a single static file**. It is **assembled per session** from several sources, so each user, each role, and each workspace gets a prompt tailored to their context.

---

## What Goes Into the Prompt

```
┌─────────────────────────────────────────────────────────┐
│  SYSTEM PROMPT (assembled at session start)             │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 1. Base Orchestrator Prompt                       │  │
│  │    Identity, behavior, response style             │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 2. Role-Specific Instructions                     │  │
│  │    Sales / HR / etc. — what the user expects      │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 3. Available MCP Tools                            │  │
│  │    Filtered by role — only allowed tools listed   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 4. Loaded Chat Skills                             │  │
│  │    Project skills + user skills (from CLAUDE.md)  │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 5. Personal Memory                                │  │
│  │    Per-user CLAUDE.md — preferences, patterns     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 6. Active Workspace Context                       │  │
│  │    AI Canvas state, if applicable                 │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Each piece serves a different purpose, and the assembly happens once per session — at the moment the WebSocket connection establishes.

---

## 1. Base Orchestrator Prompt

The foundation. Defines:

- Trinity's identity ("you are Trinity, a role-aware AI workspace assistant")
- Default response style — concise, professional, factual
- General rules that apply regardless of role
- How to handle uncertainty, missing data, ambiguity

This part is the same for every user. It is loaded from a managed prompt source so it can change without code deploys.

---

## 2. Role-Specific Instructions

Different roles use Trinity differently. The role section adapts the prompt:

| Role | Instructions Tuned For |
|---|---|
| Sales | Deal language, opportunity references, pipeline context, account-centric defaults |
| HR | Employee context, organizational hierarchy, sensitivity around personal data |
| Other roles | Tuned as new roles are added |

The role is read from the user's JWT and applied consistently across the session. A role change mid-session means a new prompt at the next reconnection.

---

## 3. Available MCP Tools

The model needs to know what tools it can call. The tool list is **filtered by role at registration time** — the orchestrator never registers a tool the user is not allowed to use, so the model never sees it in the prompt.

| Tool Description Includes | Why |
|---|---|
| Tool name | The handle the model calls by |
| Purpose | When to use this tool |
| Inputs | What the tool needs |
| Outputs | What the tool returns |

This means the model's "I should call X tool" decision is constrained from the start. Role-aware access is enforced **structurally**, not as a post-call check.

---

## 4. Loaded Chat Skills

Skills are pre-defined behavior packs the SDK loads via `setting_sources: ["user", "project"]`. They become part of the prompt context only when relevant.

| Source | Where |
|---|---|
| Project skills | `.claude/skills/` in the project workspace |
| User skills | `.claude/skills/` in the user's context path |

Skills shape how the model handles specific task types — email-summary, RFP analysis, etc. — without inflating the base prompt.

For the broader skills system, see [Chat Skills](/docs/backend/chat-skills).

---

## 5. Personal Memory

Per-user CLAUDE.md. Loaded at session start. Contains:

- Preferred name
- Working preferences (tone, language, summary length)
- Recurring entities (the accounts the user works on)
- Personal notes
- Frequency-gated patterns promoted from past sessions

Personal Memory is the reason a returning user feels Trinity already knows them. It plugs in via the SDK's native settings — no custom loader.

For the model and update flow, see [Personal Memory](/docs/backend/personal-memory).

---

## 6. Active Workspace Context

If the user is inside an [AI Canvas](/docs/frontend/ai-canvas), the prompt includes:

- The canvas's project metadata
- Active participants and their roles
- Shared context — what's already been discussed in this canvas
- Any files attached to the canvas

This is what lets the model continue work that started before the user joined and pick up team context at the right moment.

---

## How the Pieces Combine

The pieces are concatenated at session start, in a specific order, with separators that the model has been trained to read. There is no magic — just careful assembly.

| When | What Happens |
|---|---|
| WebSocket connects | All six pieces are loaded |
| Session is established | The assembled prompt is sent to the model as the system message |
| Subsequent turns | The same system prompt is reused for every turn in the session |
| Session reconnects | The assembly happens again with current context — role refreshes, memory may have updated |

The prompt does **not** rebuild on every turn. That would be wasteful. It rebuilds when the session starts, and stays consistent through the conversation.

---

## Why This Approach

Three reasons:

| Reason | Detail |
|---|---|
| **One source of behavior** | Changing the base prompt updates every conversation; no per-feature copies |
| **Role-aware by construction** | Tools the user cannot use are never mentioned to the model — there is nothing to bypass |
| **Personalization without retraining** | Personal Memory and skills give per-user shaping without touching the base model |

The trade-off is that prompt assembly is a meaningful piece of the orchestration layer's job. It is worth it because it keeps every conversation grounded in correct context.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [AI & Models](/docs/ai-and-mcp) | The models the orchestrator and agents use |
| [Orchestration Layer](/docs/backend) | The layer that assembles and applies the prompt |
| [Claude Agent SDK Orchestrator](/docs/backend/claude-agent-sdk-orchestrator) | The runtime that loads and uses the prompt |
| [Chat Skills](/docs/backend/chat-skills) | The skills system that contributes to the prompt |
| [Personal Memory](/docs/backend/personal-memory) | The per-user memory loaded into the prompt |
| [MCP Integration Layer](/docs/mcp-servers) | The tools the prompt's tool list comes from |
