---
sidebar_position: 4
title: Personal Memory
description: How Trinity captures user-specific preferences and patterns across sessions to personalize future responses
---

# Personal Memory

**Personal Memory** is the per-user store that lets Trinity remember things about each user across sessions. Preferred name. Working preferences. Recurring entities. The accounts a user works on most. Personal Memory is what turns Trinity from a stateless assistant into one that knows who it's working with.

It is part of the [Orchestration Layer](/docs/backend) — loaded at session start, available to every turn, and updated quietly as the user works.

---

## What's In It

Personal Memory is a small per-user store. It captures things that are **stable across sessions**, not things that are turn-specific.

| Captured | Example |
|---|---|
| **Preferred name** | The user wants to be called by a short form rather than their full given name |
| **Working preferences** | Respond in British English; use bullet points; be concise |
| **Communication patterns** | Formal vs. casual register, preferred summary length |
| **Recurring entities** | Account names, opportunity IDs, regions the user works on regularly |
| **Personal notes** | Free-form notes that didn't fit a structured field |

What it deliberately does **not** capture:

- Conversation transcripts (those are in chat history)
- Run outputs (those are in Run Space)
- Sensitive identifiers beyond what the user volunteered
- One-off facts that happened to come up once

---

## How It Gets Populated

Personal Memory is set automatically as the user works. The user does not fill out a profile.

| Source | When |
|---|---|
| **User says it directly** | "Call me by my short name" or "Always respond in British English" → Trinity calls the memory tool to save it |
| **Frequency-gated patterns** | If a topic, account, or preference appears across multiple sessions, it gets promoted to memory automatically |
| **Role sync** | At each session start, the role from the JWT is reconciled with the memory |

The frequency gate matters: a one-off question about a competitor doesn't pollute the user's profile. Only patterns that repeat across two or more sessions get promoted. This keeps the memory focused on what's actually durable.

---

## How It's Used

Personal Memory is loaded by the SDK at session start as part of the user's CLAUDE.md (`setting_sources: ["user", "project"]`). From the orchestrator's point of view it's **just context** — there is no separate "memory mode."

| Effect | Example |
|---|---|
| Personalized greeting | "Welcome back" with the user's preferred name instead of generic |
| Tone adaptation | British English used by default |
| Default scoping | Queries about "the account" default to the user's primary account |
| Context-free follow-ups | "Show me last month's pipeline" assumes the user's region |

---

## What the User Sees

Trinity does not announce that it is using memory. The user just experiences responses that feel like the system already knows them.

For visibility, there is a **read-only Personal Memory view** in the right-side spotlight panel. It shows:

| Section | Content |
|---|---|
| **Who You Are** | Preferred name, role |
| **How You Work** | Communication preferences, defaults |
| **Personal Notes** | Free-form notes the user has accumulated |
| **What Trinity Has Learned** | Frequency-gated patterns promoted from sessions |
| **Completeness** | A simple percentage that grows as memory accumulates |

The user can:

- **Refresh** — pull the latest after recent updates
- **Remove individual notes** — per-item delete (X button)
- **Reset memory** — full wipe via the trash icon with confirmation popup

There is no input bar. **Chat is the only way to update memory.** This is deliberate — keeping a single source of update prevents drift between what the user thinks Trinity knows and what is actually stored.

---

## Why Memory Starts Blank

When a user signs in for the first time, their Personal Memory is empty. There are no seeded defaults, no role-based templates, no preferences inferred from their job title.

The reasoning:

- **Memory should grow like a child learning** — observed, not assumed
- **Frequency-gated promotion prevents noise** — a one-off does not become a "fact"
- **Inferred preferences are fragile** — Trinity isn't always right, and a wrong inference saved as fact is hard to undo
- **The user controls the pace** — preferences are saved when the user signals them, not before

The result is that two HR users sitting next to each other have very different Personal Memory stores after a month of use, because they work differently.

---

## Architectural Choices

A few technical choices that shape how Personal Memory behaves:

| Choice | Why |
|---|---|
| **Per-user CLAUDE.md file** | Loads natively via the SDK's `setting_sources` — no custom loader, no deploy on memory change |
| **Stored at user context path** | Each user has their own directory; isolation is a filesystem property |
| **In-process MCP tool for updates** | Trinity calls a memory-update tool from chat to persist changes — uses the same path as any other tool call |
| **Caps on size and count** | 10KB total, 15 notes max, 10 sources max, 8 topics max — keeps the loaded context bounded |
| **Frequency gate** | Two-session threshold for auto-promotion — noise filter |
| **Sync I/O on Windows** | Async I/O broke on Windows path resolution — direct sync I/O is used per platform reality |

---

## How It Differs From Conversation History

| Aspect | Personal Memory | Conversation History |
|---|---|---|
| **Scope** | Cross-session | Single session (or recent sessions) |
| **Content** | Stable preferences and patterns | Full message exchanges |
| **Loaded at session start** | Yes, as part of CLAUDE.md | No — pulled on demand if needed |
| **User-visible** | Yes — explicit Personal Memory view | Yes — chat history |
| **User-editable** | Yes — chat updates, notes, reset | Read-only |

Both are stored in the [Enterprise Data Layer](/docs/data-layer) (Cosmos DB), but they serve different purposes.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Orchestration Layer](/docs/backend) | The layer Personal Memory belongs to |
| [Claude Agent SDK Orchestrator](/docs/backend/claude-agent-sdk-orchestrator) | The runtime that loads memory at session start |
| [Chat Skills](/docs/backend/chat-skills) | The other source of per-session context loaded alongside memory |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How memory fits into the assembled prompt |
| [Authentication & Security](/docs/authentication) | The identity model that scopes Personal Memory per user |
