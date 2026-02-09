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

Trinity connects to different MCP servers depending on what data is needed. The majority of servers support Sales workflows, with a smaller set for HR and a few shared across both roles.

### Sales Servers

| Server | What It Provides |
|---|---|
| **SFDC UDP** | Accounts, opportunities, contracts, account plans, and pipeline data from Salesforce via Databricks |
| **Account Directory** | CRM account contacts, roles, and regional assignments |
| **Campaign** | Salesforce campaign data and campaign-to-opportunity links |
| **Client Reference** | Client reference profiles, case studies, and reference materials |
| **Win/Loss Prediction** | ML-based win probability scoring for open opportunities |
| **Win Prediction Service** | The ML engine behind win probability — segment-specific models trained on historical data |
| **Market Intelligence** | External IT spend and vendor contract data from IDC/HDInsights |
| **Auxilium** | Past proposals, battlecards, and sales materials via RAG search |
| **Contracts Legal** | Legal contract details, opportunity summaries, and contract filtering |

### HR Servers

| Server | What It Provides |
|---|---|
| **HR Employee Data** | Employee directory, organization structure, locations, and staffing data |

### Shared Servers

| Server | What It Provides |
|---|---|
| **O365** | Microsoft 365 calendar events and external meeting detection |
| **Azure App URL** | Quick-launch links to external apps and Market Intelligence job submission |

---

## Role-Based Tool Access

Not everyone can access every tool. The system uses roles to control what's available:

### Sales Role
Sales users can access:
- All Sales servers — SFDC UDP, Account Directory, Campaign, Client Reference, Win/Loss Prediction, Market Intelligence, Auxilium, Contracts Legal
- Shared servers — O365, Azure App URL

They **cannot** access HR employee data or performance information.

### HR Role
HR users can access:
- HR Employee Data
- Shared servers — O365, Azure App URL

They **cannot** access Sales pipeline or account information.

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

Select a server below to learn about its data sources, capabilities, and how the AI uses it.

### Sales Servers

| Server | What It Does |
|--------|--------------|
| [SFDC UDP (Salesforce Data)](/docs/mcp-servers/sfdc-udp) | Accounts, opportunities, contracts, account plans, and pipeline data from Salesforce via Databricks |
| [Account Directory](/docs/mcp-servers/account-directory) | CRM account contacts, roles, and regional assignments via Azure SQL |
| [Campaign](/docs/mcp-servers/campaign) | Salesforce campaign data and campaign-to-opportunity links |
| [Client Reference](/docs/mcp-servers/client-reference) | Client reference profiles, case studies, and reference materials |
| [Win/Loss Prediction](/docs/mcp-servers/opp-win-loss) | ML-based win probability scoring for open opportunities |
| [Win Prediction Service](/docs/mcp-servers/win-prediction-service) | The ML engine powering win probability predictions with segment-specific models |
| [Market Intelligence](/docs/mcp-servers/market-intelligence) | External IT spend and vendor contract data from IDC/HDInsights |
| [Auxilium](/docs/mcp-servers/auxilium) | Past proposals, battlecards, and sales materials via RAG search |
| [Contracts Legal](/docs/mcp-servers/contracts-legal) | Legal contract details, opportunity summaries, and contract filtering |

### HR Servers

| Server | What It Does |
|--------|--------------|
| [HR Employee Data](/docs/mcp-servers/hr-employee-data) | Employee directory, org structure, location, and staffing data |

### Shared Servers

| Server | What It Does |
|--------|--------------|
| [O365](/docs/mcp-servers/o365) | Microsoft 365 calendar events and external meeting detection |
| [Azure App URL](/docs/mcp-servers/azure-app-url) | Quick-launch links to external apps and Market Intelligence job submission |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with MCP tools |
| [Backend](/docs/backend) | How the backend coordinates MCP calls |
| [Authentication](/docs/authentication) | How security tokens enable tool access |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How available tools are communicated to the AI |
