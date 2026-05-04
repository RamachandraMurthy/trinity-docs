---
sidebar_position: 7
title: Email Sharing
description: Sending a Trinity chat response as a formatted Outlook email — turning AI output into a shareable artifact
---

# Email Sharing

**Email Sharing** turns a chat response into an email. With one click, the user opens Outlook (web or desktop) with a formatted version of the response pre-populated, ready to address and send. It is the lightest path from "the AI told me something useful" to "I shared it with my team."

---

## What It Does

Inside any chat response, an email icon offers to **send this as an email**. When clicked:

1. A specialized **email-summary skill** in the orchestrator reformats the response for an email body — clean structure, professional tone, no chat-specific markup.
2. A `mailto:` link is opened, launching Outlook with the formatted content already in the body.
3. The user adds the recipient(s), reviews, and sends.

The user does not see a separate "compose" surface in Trinity — the formatting happens silently and Outlook is the editor.

---

## How It's Different from Copy-Paste

The user could always copy the chat response and paste it into Outlook themselves. Email Sharing is more useful because:

| Manual Copy-Paste | Email Sharing |
|---|---|
| Includes chat-specific styling | Reformatted for email |
| Markdown often renders oddly | Clean structure |
| Loses tables and lists | Tables and lists preserved in a way Outlook handles |
| User decides what to include | The AI's email-summary skill picks the salient parts |
| No subject line | Suggested subject is generated |

The result is an email that reads like the user wrote it deliberately — not a chat snippet pasted into an email.

---

## How It Works

```
┌──────────────────────────┐
│   USER CLICKS EMAIL      │   On a chat response
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   EMAIL-SUMMARY SKILL    │   The orchestrator runs a
│                          │   skill that reformats the
│                          │   response for an email body
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   SILENT PIPELINE        │   The reformatted version is
│                          │   captured behind the scenes —
│                          │   not shown in the chat
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   MAILTO LINK            │   A mailto: URL is constructed
│                          │   with subject and body
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│   OUTLOOK OPENS          │   The user's default Outlook
│                          │   surface (web or desktop)
│                          │   opens with the email ready
└──────────────────────────┘
```

The user sees the original chat response uninterrupted. The email-formatted version appears only in Outlook.

---

## What's in the Skill

The email-summary skill is a **chat skill** in the orchestration layer. Skills are pre-defined behavior packs that the orchestrator can invoke for common tasks. The email-summary skill specifies:

- **Tone** — professional, concise, suitable for a business email
- **Structure** — opening line, key points, optional sign-off
- **Subject** — generated from the response content
- **What to drop** — chat-specific framing, second-person addressing of "you" the user

For the broader skills system, see Chat Skills under the [Orchestration Layer](/docs/backend).

---

## Where It's Available

| Surface | Email Sharing |
|---|---|
| Single-User Workspace | Yes — on any AI response |
| AI Canvas | Yes — on any response, although for shared work the more common path is to keep the discussion in the canvas itself |
| Agent Run output | Outputs that are reports or summaries can be emailed; deliverables (Word, PowerPoint) are downloaded directly rather than emailed |
| Mobile | Limited — share sheets vary by platform |

---

## Limitations

| Limitation | Reason |
|---|---|
| Long content can hit URL-length limits | `mailto:` URLs have practical length caps; very long responses may be truncated |
| Outlook deeplink doesn't always work for OWA on long content | Some Outlook Web App deeplinks fail with very long bodies |
| The user must have Outlook configured as their mail handler | The browser uses the OS-level default mail handler |

These are constraints of the `mailto:` standard, not of Trinity itself. The fallback when Email Sharing fails is to copy the formatted response from the chat and paste it manually.

---

## Why mailto and Not a Server-Side Send

Trinity does **not** send emails on the user's behalf. The `mailto:` approach was deliberate:

- **The user always sees and approves the email before it's sent.** No silent or automated emails.
- **No service-account email impersonation.** The email comes from the user's own Outlook session.
- **Trinity has no email-sending credentials.** Reduces the security and compliance surface.
- **Recipients trust emails from their colleague's Outlook**, not a system mailer.

This means the cost is occasional `mailto:` length limits, but the trade-off favors safety and trust.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Experience Layer](/docs/frontend) | The parent layer this feature lives in |
| [Single-User Workspace](/docs/frontend/single-user-workspace) | The most common surface for email sharing |
| [Orchestration Layer](/docs/backend) | The chat skills system that powers the email-summary reformatter |
| [Authentication & Security](/docs/authentication) | The Azure AD identity that drives Outlook integration |
