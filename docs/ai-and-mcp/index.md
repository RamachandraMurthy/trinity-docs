---
sidebar_position: 1
title: AI & Models
description: How Trinity's AI models understand questions and generate responses
---

# AI & Models

Trinity's intelligence comes from powerful AI models that understand natural language, reason about questions, and generate helpful responses. This section explains how the AI works and how it connects to business data through MCP servers.

---

## Two AI Models

Trinity uses two different AI models, each optimized for different use cases:

### Azure OpenAI (GPT-4.1 Mini) — Real-Time Chat

The primary AI for conversational interactions:
- **Powers the floating chat** and group chat conversations
- **Responds in seconds** with streaming word-by-word output
- **Calls MCP tools** when it needs business data
- **Hosted on Azure** for enterprise security and compliance

When you ask a question in chat, GPT-4.1 Mini handles the response.

### Google Gemini — WorkSphere Agents

The AI that powers autonomous analysis agents:
- **Runs multi-step pipelines** that take minutes, not seconds
- **Processes full documents** rather than just snippets
- **Generates detailed reports** with structured findings
- **Built with Google ADK** (Agent Development Kit)

When you run a WorkSphere Agent, Gemini handles the analysis.

| Aspect | Azure OpenAI (GPT-4.1) | Google Gemini |
|---|---|---|
| **Use Case** | Real-time chat | Background agents |
| **Response Time** | Seconds | Minutes |
| **Output** | Conversational | Structured reports |
| **Document Handling** | Context snippets | Full documents |

---

## How the AI Works with MCP Servers

The AI is smart, but it doesn't have direct access to business data. On its own, it can only answer from its general training knowledge.

To access real business data, the AI works with **MCP (Model Context Protocol) servers** — specialized services that connect to employee directories, sales pipelines, calendars, and more.

```
User: "How many employees are in the London office?"
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI RECEIVES QUESTION                     │
│                                                             │
│  The AI reads the question and thinks:                      │
│  "This is asking about employee counts by location.         │
│   I need to use the HR Data tool to look this up."          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI REQUESTS TOOL                         │
│                                                             │
│  The AI says: "I want to call the employee search tool      │
│  with location = London"                                    │
│                                                             │
│  (The AI doesn't call the tool directly — it tells the      │
│   backend what it wants)                                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                BACKEND CALLS MCP SERVER                     │
│                                                             │
│  The backend takes the AI's request and calls the           │
│  HR Data MCP server with the search parameters              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              MCP SERVER QUERIES DATA                        │
│                                                             │
│  The HR Data server searches its database and returns:      │
│  "Found 342 employees in London office"                     │
│  (plus details like departments, roles, etc.)               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              AI INTERPRETS AND RESPONDS                     │
│                                                             │
│  The AI receives the data and writes a helpful response:    │
│  "There are 342 employees in the London office. Here's      │
│   a breakdown by department..."                             │
└─────────────────────────────────────────────────────────────┘
```

This back-and-forth can happen multiple times in a single question if the AI needs data from several sources.

For the full catalog of available MCP servers and how they work, see [MCP Servers](/docs/mcp-servers). Key servers include:

- [SFDC UDP](/docs/mcp-servers/sfdc-udp) — Accounts, opportunities, and pipeline data from Salesforce
- [HR Employee Data](/docs/mcp-servers/hr-employee-data) — Employee directory, org structure, and staffing
- [O365](/docs/mcp-servers/o365) — Microsoft 365 calendar for external meeting detection
- [Win/Loss Prediction](/docs/mcp-servers/opp-win-loss) — ML-based win probability scoring

---

## The System Prompt

When the AI receives a question, it also receives a "system prompt" — a set of instructions that tell it how to behave. This prompt includes:

### Identity
Who the AI is and how it should present itself:
> "You are WorkSphere, an intelligent assistant for DXC Technology..."

### Available Tools
A list of all tools the user can access (filtered by role):
> "You have access to: HR Data (search employees), HR Performance (get ratings)..."

### Response Guidelines
How to format responses:
> "Use tables for comparative data. Include charts when showing trends. Be concise but thorough..."

### Current Context
Today's date and any session-specific information.

This prompt is built dynamically for each conversation, ensuring the AI has the right context and permissions.

For details on how prompts are constructed, see [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction).

---

## Multi-Step Reasoning

Sometimes the AI needs multiple pieces of information to answer a question:

**User:** "Compare the performance ratings of the top 10 highest-paid employees"

The AI needs to:
1. First find the top 10 highest-paid employees (HR Strategic tool)
2. Then get performance ratings for those specific employees (HR Performance tool)
3. Finally, analyze and present the comparison

The system supports this multi-step process, allowing the AI to make several tool calls before generating its final response.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [MCP Servers](/docs/mcp-servers) | Available business data connectors and how they work |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How the AI's instructions are built |
| [Backend](/docs/backend) | How the backend coordinates AI and tools |
| [WorkSphere Agents](/docs/agents) | How autonomous AI agents work |
| [Platform Overview](/docs/platform/high-level-architecture) | How AI fits in the overall system |
