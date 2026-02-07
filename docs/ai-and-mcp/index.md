---
sidebar_position: 1
title: AI & MCP Integration
description: How Trinity connects AI to business data through the Model Context Protocol
---

# AI & MCP Integration

Trinity's intelligence comes from combining a powerful AI model (Azure OpenAI) with specialized business tools (MCP servers). Beyond real-time chat, the platform also includes **WorkSphere Agents** — autonomous AI agents powered by Google Gemini that perform complex, multi-step analysis tasks. This section explains how these components work together.

---

## The Two-Part System

Think of Trinity's AI capability as two parts working together:

### The Brain: Azure OpenAI

**Azure OpenAI** (specifically GPT-4.1 Mini) is the language model that:
- Understands what users are asking
- Figures out what information is needed to answer
- Writes natural, helpful responses
- Knows how to request specific tools when data is required

The AI is smart, but it doesn't have direct access to business data. On its own, it can only answer from its general training knowledge.

### The Hands: MCP Servers

**MCP (Model Context Protocol) servers** are specialized services that:
- Connect to real business data sources
- Perform specific operations (search employees, get calendar, etc.)
- Return structured data that the AI can interpret

MCP servers give the AI "hands" to reach into databases, systems, and services that contain the actual business information.

---

## How They Work Together

When a user asks a question that requires business data, here's what happens:

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

---

## The Available MCP Servers

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

## How Charts and Data Visualizations Work

When the AI determines that data would be better shown visually, it includes chart specifications in its response:

1. **AI decides a chart would help** — Based on the data and question type
2. **AI specifies the chart** — "Show this as a bar chart with departments on X axis and employee count on Y axis"
3. **Frontend renders the chart** — The chart appears as an interactive visualization

The AI can generate:
- Bar charts (comparisons)
- Line charts (trends over time)
- Pie charts (proportions)
- Tables (detailed data)
- Area charts (cumulative trends)

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

## Dynamic Greetings

Trinity creates personalized welcome messages for each feature area. These greetings are:

- **AI-generated** — Created using Azure OpenAI based on what each feature does
- **Role-specific** — Different greetings for Sales vs. HR users
- **Pre-generated** — Created in the background so they're ready instantly
- **Feature-aware** — Each feature (Accounts, Pipeline, Performance, etc.) gets its own greeting

This makes the experience feel personalized rather than static.

---

## What Happens When Tools Fail

Sometimes MCP servers are unavailable or return errors. The system handles this gracefully:

1. **Retry logic** — Transient failures are automatically retried
2. **Fallback responses** — If a tool fails, the AI explains what happened
3. **Partial answers** — If some tools work but others don't, the AI provides what it can
4. **Error logging** — All failures are logged for monitoring

Users never see raw error messages — the AI explains issues in natural language.

---

## WorkSphere Agents

Beyond real-time chat, Trinity includes **WorkSphere Agents** — specialized AI agents that perform complex, multi-step analysis tasks. While chat answers questions immediately, agents run longer processes that analyze documents, generate reports, and provide strategic recommendations.

### How Agents Differ from Chat

| Aspect | Chat (Azure OpenAI) | Agents (Google Gemini) |
|---|---|---|
| **Response Time** | Immediate (seconds) | Background (minutes) |
| **Complexity** | Single question → answer | Multi-step pipelines |
| **Output** | Conversational response | Detailed report |
| **Document Handling** | Context snippets | Full document analysis |
| **Use Case** | Quick lookups, Q&A | Deep analysis, strategy |

### How Agents Work

1. **User selects an agent** — Chooses from available agents (e.g., "Requirements Review")
2. **User provides input** — Uploads documents or selects existing project files
3. **Agent pipeline executes** — Multiple specialized sub-agents process the input sequentially
4. **Report is generated** — Results are compiled into a formatted document
5. **User is notified** — When the report is ready for viewing

### Agent Categories

**General Agents** work across the platform:
- **Deal Qualification** — Assesses deal health using Databricks opportunity data
- **Win Probability** — ML-based prediction of deal success
- **Competitor Analysis** — Competitive intelligence and positioning
- **Pricing Strategy** — Cost and pricing analysis
- **Company Executives** — Leadership research with web integration

**RFP-Focused Agents** specialize in proposal workflows:
- **Requirements Review** — Extracts and analyzes RFP requirements
- **Response Review** — "Red team" review of proposal responses
- **Requirements-Response Strategy** — Gap analysis and win strategy
- **Compliance & Contracts** — Regulatory and contract risk assessment
- **Proposal Scoring** — Multi-dimension scoring matrix
- **Technical Architecture** — Solution design validation

### The Google ADK Framework

WorkSphere Agents are built using **Google ADK (Agent Development Kit)** with Gemini models. This framework supports:

- **Sequential pipelines** — Multiple agents execute in order, each building on the previous
- **Large document handling** — Documents uploaded to Gemini's File API for processing
- **Structured output** — Agents produce consistent, formatted results
- **Tool integration** — Agents can call MCP tools and external services

For detailed documentation on each agent, see [WorkSphere Agents](/docs/agents).

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | How AI fits in the overall system |
| [Backend](/docs/backend) | How the backend coordinates AI and tools |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How the AI's instructions are built |
| [Authentication](/docs/authentication) | How security tokens enable tool access |
| [WorkSphere Agents](/docs/agents) | Detailed documentation on all available agents |
| [RFP Advisor](/docs/rfp-advisor) | How document analysis workflows work |
