---
sidebar_position: 6
title: File Upload
description: Attaching documents and images to a Trinity conversation — what's supported, how it's processed, and how it stays governed
---

# File Upload

**File Upload** lets a user ground a conversation in a document. Drop in a PDF, a contract, a slide deck, or an image, and the AI can read it and answer questions about it. The file is part of the conversation context until the session ends.

It is available in the [Single-User Workspace](/docs/frontend/single-user-workspace) and the [AI Canvas](/docs/frontend/ai-canvas), with consistent behavior across both surfaces.

---

## What's Supported

Trinity handles two distinct file types differently — both feel the same to the user.

### Native Visual Content

Some files are read by the AI **visually** — meaning the AI sees the rendered page, including layout, images, charts, and diagrams.

| Type | Examples | Why Visual |
|---|---|---|
| **PDF** | Reports, contracts, RFPs, scanned documents | Layout and embedded images matter |
| **Images** | Screenshots, diagrams, photos | Pixel content is the entire input |

Visual reading solves the image-based-PDF problem: scanned documents and slides where the text isn't selectable still work because the AI sees them as the user does.

### Text Extraction

Other files are converted to text before the AI sees them. The structured content (tables, headings) is preserved.

| Type | Examples |
|---|---|
| **Word** | `.docx` documents — narrative content, reports, proposals |
| **Excel** | `.xlsx` workbooks — data tables, financial models |
| **PowerPoint** | `.pptx` decks — slide text and structure |
| **Plain text and structured** | `.txt`, `.csv`, `.tsv`, `.json`, `.xml`, `.yaml`, `.md`, `.html`, `.rtf`, `.log` |

For these types, the structured content matters more than the visual rendering — the conversion preserves what the AI needs.

---

## How It Behaves

### Adding a File

Two ways to add a file:

- **Drag and drop** — drop directly into the chat input area
- **Paperclip button** — click to open a file picker

Once added, the file appears as a pill in the input area with its name, size, and current state (uploading, ready, processing).

### During the Conversation

Once the file is part of the conversation:

- The AI can answer questions referencing "this document"
- Subsequent turns retain the file context — no re-upload needed
- Multiple files can be attached at once
- The user can mix file-grounded questions with regular questions in the same thread

### After the Session

Files are **ephemeral**. They live in memory for the duration of the session and are cleared when the user disconnects. They are **not** persisted into long-term storage.

This is a deliberate design choice — file upload is for in-conversation reasoning, not document management. Persistent document workflows go through the [RFP Advisor](/docs/rfp-advisor).

---

## Limits and Controls

| Control | Limit |
|---|---|
| **Files per session** | 5 |
| **Size per file** | 10 MB |
| **Total per session** | 25 MB |
| **Time-to-live** | 1 hour after last activity |
| **Cleared on disconnect** | Yes |

These limits are enforced before the file is processed.

---

## Security

Every uploaded file passes through several checks before reaching the AI:

| Check | What It Verifies |
|---|---|
| **Magic bytes** | The file's actual content matches its declared type — a `.pdf` that is actually an executable is rejected |
| **Size and count limits** | Hard limits prevent denial-of-service through large or numerous uploads |
| **Prompt-injection scan** | Text content is scanned for known injection patterns; flagged content goes through Trinity Guardian |
| **CSRF and session ownership** | The file belongs to the authenticated user's session; no cross-session access |
| **Rate limiting** | Per-user upload limits prevent abuse |
| **Security event logging** | Every upload — successful or rejected — is logged for audit |

The security model treats user-uploaded content as **untrusted input** by default. Even though the user uploaded it, the AI's processing of the file applies the same guardrails as any other input.

For the broader security model, see [Authentication & Security](/docs/authentication).

---

## How It Fits the Architecture

Files are **part of the conversation context**, not a separate data path. The orchestrator sees the file alongside the user's message and decides how to use it. This means:

- **No special "file Q&A mode."** Questions about the file flow through the same orchestration layer as everything else.
- **Tools still apply.** If the user asks "compare this contract to our standard terms," the orchestrator can use the uploaded file alongside an MCP server that returns the standard terms.
- **Role gates still apply.** A file the user uploaded does not bypass role-aware MCP access.

For the orchestration model, see [User Interaction Model](/docs/platform/user-interaction-model).

---

## When to Use File Upload vs. RFP Advisor

| Situation | Use |
|---|---|
| One-off question about a document | File Upload |
| Quick analysis during a meeting | File Upload |
| Multi-day project with several documents | RFP Advisor (project-based) |
| Document that needs to persist for the team | RFP Advisor (project-based) |
| Triggering a specialized RFP analysis agent | RFP Advisor (sets up the project the agent needs) |

For project-based document workflows and RFP-specific agents, see [RFP Advisor](/docs/rfp-advisor).

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Experience Layer](/docs/frontend) | The parent layer where file upload lives |
| [Single-User Workspace](/docs/frontend/single-user-workspace) | The personal surface where files are commonly uploaded |
| [AI Canvas](/docs/frontend/ai-canvas) | Files attached in a canvas are visible to all participants |
| [RFP Advisor](/docs/rfp-advisor) | The project-based document workflow — different use case from file upload |
| [Authentication & Security](/docs/authentication) | The security model that governs uploads |
| [Governance & Operations](/docs/authentication) | How Trinity Guardian observes file activity |
