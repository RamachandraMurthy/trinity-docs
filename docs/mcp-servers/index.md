---
sidebar_position: 1
title: MCP Servers
description: Business data connectors that give the AI access to real information
---

# MCP Servers

**MCP (Model Context Protocol) servers** are the specialized services that connect Trinity's AI to real business data. While the AI models understand language and reason about questions, MCP servers give the AI "hands" to reach into databases, systems, and services that contain actual business information.

---

## What MCP Servers Do

Think of MCP servers as specialized assistants that each know how to do one thing really well:

- **Connect to real business data sources** — Employee directories, sales pipelines, calendars, documents
- **Perform specific operations** — Search employees, get calendar events, look up account details
- **Return structured data** — Data the AI can interpret and present to users
- **Enforce access controls** — Only return data the user is authorized to see

The AI doesn't access data directly. Instead, it tells the backend what it needs, and the backend calls the appropriate MCP server.

---

## Available MCP Servers

Trinity connects to different MCP servers depending on what data is needed:

### HR Servers

| Server | What It Provides |
|---|---|
| **HR Data** | Employee directory, organization structure, locations, basic employee information |
| **HR Performance** | Performance ratings across years, evaluation comments, performance trends |
| **HR Strategic** | Workforce analytics, cost analysis, skills data, headcount planning |

### Sales Servers

| Server | What It Provides |
|---|---|
| **Sales Accounts** | Account information, contacts, account management data |
| **Sales Pipeline** | Opportunities, deals, forecasts from Salesforce |
| **Campaigns** | Marketing campaign information and tracking |
| **Research** | Market research and web information gathering |

### Shared Servers

| Server | What It Provides |
|---|---|
| **O365** | Outlook emails, calendar events, contacts from Microsoft 365 |

### RFP Servers

| Server | What It Provides |
|---|---|
| **RFP Tools** | Document search across RFP projects, project summaries, requirement extraction |
| **Win Prediction** | ML-based win probability scoring for opportunities |

---

## Role-Based Tool Access

Not everyone can access every tool. The system uses roles to control what's available:

### Sales Role
Sales users can access:
- Sales Accounts, Pipeline, Campaigns, Research
- O365 (email, calendar, contacts)

They **cannot** access HR employee data or performance information.

### HR Role
HR users can access:
- HR Data, HR Performance, HR Strategic
- O365 (email, calendar, contacts)

They **cannot** access Sales pipeline or account information.

### Admin Role
Administrators can access all tools across both domains.

This role-based filtering happens at the AI level — when a Sales user asks a question, the AI isn't even told about HR tools, so it can't accidentally try to use them.

---

## The Token Handoff

Some tools need special permissions to access data. For example, the O365 tool needs permission to access a user's Outlook.

This is handled through "token injection":

1. **User logs in** — Receives security tokens from Microsoft
2. **Frontend sends tokens** — Along with each chat request
3. **Backend injects tokens** — When calling tools that need them
4. **Tool uses tokens** — To access user-specific data (like their calendar)

This ensures the AI can only access what the logged-in user is permitted to see.

---

## What Happens When Tools Fail

Sometimes MCP servers are unavailable or return errors. The system handles this gracefully:

1. **Retry logic** — Transient failures are automatically retried
2. **Fallback responses** — If a tool fails, the AI explains what happened
3. **Partial answers** — If some tools work but others don't, the AI provides what it can
4. **Error logging** — All failures are logged for monitoring

Users never see raw error messages — the AI explains issues in natural language.

---

## Why MCP?

By separating tools into independent servers, each can be developed, updated, and scaled independently. It also means the AI can be taught to use new tools without changing the core platform.

The Model Context Protocol provides a standardized way for AI models to:
- Discover what tools are available
- Understand what each tool does and what parameters it needs
- Call tools and receive structured responses
- Handle errors and retries consistently

---

## Individual Server Documentation

Detailed documentation for each MCP server is coming soon. This will include:
- Available operations and parameters
- Example queries and responses
- Data sources and refresh rates
- Access requirements and permissions

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with MCP tools |
| [Backend](/docs/backend) | How the backend coordinates MCP calls |
| [Authentication](/docs/authentication) | How security tokens enable tool access |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How available tools are communicated to the AI |
