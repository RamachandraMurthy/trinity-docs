---
sidebar_position: 1
title: Experience Layer
description: The user-facing surfaces of Trinity — Single-User Workspace, AI Canvas, Agent Space & Runs, plus the Trinity Mobile companion
---

# Experience Layer

The Experience Layer is **what users see and interact with**. It is the topmost layer of the [Reference Architecture](/docs/platform/reference-architecture). Everything below it — orchestration, agents, MCP, data — is invisible to the user.

Three first-class experiences sit here, each tuned for a different mode of work, plus several supporting features and a mobile companion.

---

## The Three Experiences

| Surface | Mode | Best For |
|---|---|---|
| [**Single-User Workspace**](/docs/frontend/single-user-workspace) | One user, one conversation | Quick lookups, Q&A, voice interaction |
| [**AI Canvas**](/docs/frontend/ai-canvas) | Multi-user shared workspace | Collaborative analysis, project research, team work with AI |
| [**Agent Space & Runs**](/docs/frontend/agent-space) | Catalog and tracking | Discovering agents, launching deeper analyses, monitoring long-running runs |

All three surfaces flow into the same Claude Agent SDK Orchestrator. Context, role, and history follow the user across them.

---

## Companion: Trinity Mobile *(Coming Soon)*

The [**Trinity Mobile**](/docs/frontend/trinity-mobile) app will extend the Single-User Workspace to phones. It is **in development, not yet shipped** — voice input, chat, and dark/light theming tuned for on-the-go use rather than a full mirror of the web. The page describes the planned design.

---

## Supporting Features

Several features cut across the surfaces, available wherever they make sense:

| Feature | Where It Appears |
|---|---|
| [**Real-Time Streaming**](/docs/realtime) | All surfaces — responses appear word-by-word, group activity is live |
| [**File Upload**](/docs/frontend/file-upload) | Single-User Workspace and AI Canvas — drop in PDFs, Word, Excel, PowerPoint, images |
| [**Email Sharing**](/docs/frontend/email-sharing) | Single-User Workspace — turn a chat response into a formatted email via Outlook |
| [**Daily Recap**](/docs/daily-recap) | A personalized 2–3 minute audio briefing accessible from the workspace |

---

## How User State is Carried

Every Experience surface needs to know **who the user is**, **what role they have**, and **what context they're in** (which workspace, which conversation, which agent run). That state is established at sign-in and travels with the user across every surface.

| State | Where It's Set | What It Drives |
|---|---|---|
| **Identity** | Azure AD sign-in | Authentication everywhere |
| **Role** | User profile (Sales, HR, etc.) | Which features, agents, and MCPs are visible |
| **Session** | Active conversation thread | Chat history continuity |
| **Workspace context** | If inside an AI Canvas, the canvas state | Shared activity, participants |
| **Personal Memory** | Persisted across sessions | Personalization without re-asking |

Authentication is handled by Microsoft Azure AD with corporate credentials. Role-based access is checked at the orchestration layer too — the Experience Layer presents the surface, but the Orchestration Layer is the authoritative gate.

For the full sign-in and access model, see [Authentication & Security](/docs/authentication).

---

## How the Surface Communicates with the Backend

Two communication patterns:

### REST (Request / Response)

For one-shot operations — fetching chat history, saving a workspace, loading notifications. The browser sends a request, the backend returns a complete response.

### WebSocket (Persistent Connection)

For everything that needs to feel instant:

- **Streaming AI responses** — text appears word-by-word as the orchestrator generates it
- **AI Canvas live activity** — other participants' prompts and responses appear in real time
- **Agent Run updates** — status changes push without polling
- **Notifications** — surfaced when something the user cares about happens
- **Token refresh** — Azure AD tokens are refreshed without interrupting the session

For the full real-time model, see [Real-Time & WebSocket](/docs/realtime).

---

## Visual Patterns

The Experience Layer leans on a few consistent design patterns:

| Pattern | What It Does |
|---|---|
| **Progressive disclosure** | Summary first, details on demand — the user is never overwhelmed |
| **Streaming feedback** | Responses appear progressively, so users start reading immediately |
| **Role-aware views** | Sales users see sales features; HR users see HR features. The Experience Layer hides what isn't allowed rather than greying it out |
| **Animation with purpose** | Transitions help users track what's happening — they aren't decorative |
| **Offline resilience** | Network drops are handled gracefully with reconnection and visible status |

---

## Where the Experience Layer Stops

It's worth being explicit about what the Experience Layer **does not** do:

- It does not decide which tools to call — that's the Orchestration Layer
- It does not run agents — that's the Agent & Execution Layer
- It does not reach enterprise data directly — every data fetch goes via the orchestrator and MCP servers
- It does not enforce role-based access on its own — it presents allowed surfaces, but enforcement happens server-side

This separation is what lets the same orchestration brain serve the web, mobile, AI Canvas, and Agent Space without rebuilding access controls in each.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Single-User Workspace](/docs/frontend/single-user-workspace) | The personal chat-and-voice surface |
| [AI Canvas](/docs/frontend/ai-canvas) | The multi-user collaboration workspace |
| [Agent Space & Runs](/docs/frontend/agent-space) | The agent catalog and run tracker |
| [Trinity Mobile](/docs/frontend/trinity-mobile) | The mobile companion app |
| [Real-Time & WebSocket](/docs/realtime) | How streaming, group activity, and live updates work |
| [File Upload](/docs/frontend/file-upload) | Adding documents and images to a conversation |
| [Email Sharing](/docs/frontend/email-sharing) | Sending a chat response as an Outlook email |
| [Daily Recap](/docs/daily-recap) | The personalized audio briefing surface |
| [Orchestration Layer](/docs/backend) | What happens after the Experience Layer hands off the request |
| [Authentication & Security](/docs/authentication) | Sign-in, role-based access, the control plane |
