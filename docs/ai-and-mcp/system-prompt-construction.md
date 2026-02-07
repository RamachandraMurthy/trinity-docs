---
sidebar_position: 2
title: System Prompt
description: How the AI's instructions are built for each conversation
---

# System Prompt Construction

When the AI receives a question, it also receives a set of instructions called the "system prompt." This document explains what's in that prompt and how it's built.

---

## What is a System Prompt?

The system prompt is like giving someone a briefing before they start a job:

> "You are WorkSphere, an assistant for DXC Technology. You help with HR and Sales questions. Today's date is February 7, 2026. You have access to these tools: employee search, performance data, calendar..."

This briefing tells the AI:
- Who it is and how to behave
- What date it is (important for time-sensitive questions)
- What tools are available
- How to format responses

Without this prompt, the AI would just be a general assistant with no context about Trinity or the user's role.

---

## What's in the System Prompt?

### Identity and Behavior

The prompt establishes how the AI should present itself:

> "You are WorkSphere, an intelligent assistant built by DXC Technology. You are helpful, professional, and concise."

This shapes the personality of responses.

### Current Date

The prompt includes today's date:

> "Today is February 7, 2026"

This is important because many questions involve time:
- "What meetings do I have this week?"
- "Show me last quarter's performance"
- "What are upcoming deadlines?"

### Available Tools

The prompt lists what tools the AI can use:

> "You have access to:
> - Employee Directory: Search employees by name, location, skills
> - Performance Data: Look up ratings and evaluations
> - Calendar: Access the user's Outlook calendar
> - Email: Search recent emails"

This list changes based on the user's role. An HR user sees HR tools. A Sales user sees Sales tools.

### Response Guidelines

The prompt tells the AI how to format responses:

> "When showing data comparisons, use tables. When showing trends, use charts. Be concise but thorough."

This ensures consistent, useful responses.

---

## How the Prompt is Built

The system prompt isn't a fixed file — it's assembled dynamically for each conversation:

```
┌─────────────────────────────────────────────────────────────┐
│                    START WITH BASE PROMPT                   │
│                                                             │
│   A template with placeholders:                             │
│   "Today is {{DATE}}. You have access to {{TOOLS}}..."      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ADD CURRENT DATE                         │
│                                                             │
│   Replace {{DATE}} with today's actual date                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    FILTER TOOLS BY ROLE                     │
│                                                             │
│   Look at the user's role (Sales, HR, Admin)                │
│   Include only tools they're allowed to use                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ADD TOOL DESCRIPTIONS                    │
│                                                             │
│   Replace {{TOOLS}} with the filtered tool list             │
│   Each tool gets a description of what it does              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    FINAL PROMPT READY                       │
│                                                             │
│   The complete prompt is sent to the AI along with          │
│   the user's question and conversation history              │
└─────────────────────────────────────────────────────────────┘
```

---

## Why This Matters

### Role-Based Security

Because the prompt only includes tools the user can access, the AI literally doesn't know about tools it shouldn't use. A Sales user asking about employee performance will get a response like:

> "I don't have access to employee performance data."

The AI isn't hiding information — it genuinely doesn't have the capability for that user.

### Consistent Experience

By standardizing how the AI responds (tables for comparisons, charts for trends), users get a predictable experience regardless of what they ask.

### Accurate Dates

Questions like "meetings this week" need accurate date context. The prompt ensures the AI knows what "this week" means.

### Extensibility

When new tools are added, they're automatically included in the prompt for appropriate users. No changes to the AI itself are needed.

---

## Base Prompt Storage

The base prompt template is stored externally (not in the application code):

| Platform | Where It's Stored |
|---|---|
| Trinity Webapp | File on the server (`hr_system_prompt.txt`) |
| SalesCoach Backend | Azure Blob Storage |

This allows prompt updates without deploying new code.

---

## Different Prompts for Different Features

Trinity uses different prompts for different capabilities:

| Feature | Prompt Purpose |
|---|---|
| Main Chat | General conversation with business tools |
| Voice Assistant | Optimized for spoken interaction |
| Greetings | Generating welcome messages for feature areas |

Each is tailored for its specific use case.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [AI & MCP Integration](/docs/ai-and-mcp) | How the AI uses tools |
| [Authentication](/docs/authentication) | How roles are determined |
| [Backend](/docs/backend) | Where prompt construction happens |
