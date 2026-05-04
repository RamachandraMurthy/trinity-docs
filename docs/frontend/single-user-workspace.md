---
sidebar_position: 2
title: Single-User Workspace
description: The personal chat-and-voice surface — the fastest path from question to answer in Trinity
---

# Single-User Workspace

The **Single-User Workspace** is Trinity's default experience. One user, one conversation, real-time streaming responses. It is where most interactions begin: a question typed or spoken, an answer assembled from enterprise data, a follow-up that builds on the previous turn.

This page describes what the surface offers and how it behaves. For the broader layer it sits in, see [Experience Layer](/docs/frontend).

---

## What It Provides

| Capability | What the User Does |
|---|---|
| **Chat input** | Type a question in natural language; press send |
| **Voice input** | Speak instead of typing — audio is transcribed and sent through the same path |
| **Streaming responses** | The AI's response appears word-by-word as it's generated |
| **Conversation memory** | The current thread carries context — follow-up questions don't need to repeat earlier facts |
| **Tables and charts** | Structured data and visualizations render inline when the response includes them |
| **File attachment** | Drop in PDFs, Word, Excel, PowerPoint, or images to ground the conversation in a document |
| **Email sharing** | Send the current response as a formatted Outlook email |
| **Persistent history** | Conversations are saved and accessible the next time the user signs in |

---

## How a Turn Works

A single turn — one user input, one response — flows through the orchestration layer like this:

```
┌──────────────────────────┐
│   USER INPUT             │   Type or voice
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   FRONTEND               │   Adds session, role, workspace
│                          │   context. Sends via WebSocket.
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   ORCHESTRATOR           │   Decides what to do (direct
│                          │   answer, MCP tool, agent run)
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   STREAMING RESPONSE     │   Tokens stream back through
│                          │   WebSocket — the user sees
│                          │   the answer forming live
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   PERSISTED              │   Saved to chat history;
│                          │   personal memory updated if
│                          │   the turn revealed a pref.
└──────────────────────────┘
```

Voice input differs only at the first step — speech is transcribed at the edge, then joins the same path. The orchestrator does not know whether the user typed or spoke.

For the full nine-band lifecycle, see [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle).

---

## Personalization

The Single-User Workspace personalizes responses through **Personal Memory** — a small per-user store that captures preferences and patterns over time. Examples:

- Preferred name (a short form instead of the full given name)
- Working preferences ("respond in British English")
- Recurring entities (accounts the user works on regularly)

Personal Memory is set automatically as the user works. The user does not need to fill out a profile. For the full model, see Personal Memory under the [Orchestration Layer](/docs/backend).

---

## Role Awareness

What the user can ask depends on their role. The Single-User Workspace itself does not enforce this — it just presents what the orchestrator returns. But practically:

- A Sales user can ask about opportunities, accounts, campaigns, win/loss data
- An HR user can ask about employees, performance data, strategic planning
- Both can use shared capabilities (Office 365, Account Directory, document analysis)

If a Sales user asks an HR question, the orchestrator's role-aware routing prevents the call — the response will reflect that the data isn't available for this role.

For the access model, see [Authentication & Security](/docs/authentication).

---

## Voice Interaction

Voice input is part of the Single-User Workspace, not a separate surface:

| Step | What Happens |
|---|---|
| User taps the microphone | The browser begins capturing audio |
| User speaks | Audio is captured and transcribed |
| Transcription appears in the input | The user can edit or send as-is |
| User sends | The text follows the same orchestration path as a typed message |

Voice and chat are different inputs to the same conversation — the user can mix them freely within a single thread.

---

## File-Grounded Conversations

When a user attaches a file, the document becomes part of the conversation context. Subsequent questions can reference "this document" without re-uploading.

| Supported | Examples |
|---|---|
| **Native content** | PDF, images — read by the AI visually |
| **Text extraction** | Word (.docx), Excel (.xlsx), PowerPoint (.pptx), CSV, JSON, XML, YAML, Markdown, HTML, RTF, TSV, plain text |

Files are ephemeral — they live for the duration of the session and are not persisted into long-term storage. For the full feature, see [File Upload](/docs/frontend/file-upload).

---

## Sharing a Response

After a response, the user can:

- **Send to AI Canvas** — push the response into a shared workspace where teammates can see and build on it
- **Send via Email** — open Outlook with a formatted version of the response pre-populated

Sharing is initiated from the response itself — no copy-paste required. For email, see [Email Sharing](/docs/frontend/email-sharing).

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Experience Layer](/docs/frontend) | The parent layer this surface belongs to |
| [AI Canvas](/docs/frontend/ai-canvas) | The shared multi-user version of this experience |
| [Real-Time & WebSocket](/docs/realtime) | How streaming actually works under the hood |
| [File Upload](/docs/frontend/file-upload) | The full file-grounding feature |
| [Email Sharing](/docs/frontend/email-sharing) | Sending a response as an Outlook email |
| [User Interaction Model](/docs/platform/user-interaction-model) | The four-step flow every request follows |
