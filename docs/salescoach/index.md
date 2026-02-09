---
sidebar_position: 1
title: Orchestration Engine (SalesCoach)
description: The real-time AI conversation engine that powers Trinity's chat
---

# Orchestration Engine (SalesCoach)

The **SalesCoach** orchestration engine is the Python/aiohttp component within the Backend that handles real-time AI conversations. It manages the complete flow from when a user sends a message to when they receive a streaming response — coordinating the AI model, MCP tool calls, and conversation persistence.

:::tip Fun Fact
Why is it called *SalesCoach*? Because Trinity was born as a sales AI — built to coach deal teams through strategy, pipeline, and account planning. The platform has since grown far beyond sales into HR, RFP advisory, and more, but the orchestration engine kept its original name. Think of it like how everyone still says "roll down the window" even though cars haven't had hand cranks in decades. 🤷
:::

---

## What the Orchestration Engine Does

While the main backend handles request routing and data services, the orchestration engine focuses specifically on AI conversation flow:

- **Real-time WebSocket communication** — Bi-directional streaming for responsive interactions
- **Individual & group chat** — Support for 1-on-1 conversations and team collaboration
- **AI conversation management** — Builds context, sends to Azure OpenAI, handles responses
- **MCP tool execution** — Coordinates calls to business data servers when the AI needs information
- **Role-based access control** — Filters available tools based on user roles (Sales, HR, Admin)
- **Conversation persistence** — Saves all chat history to Azure Cosmos DB
- **Dynamic system prompts** — Builds role-filtered prompts for each conversation

---

## How It Fits in the Backend

```
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                            │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │          Main Backend (Node.js/Express)             │   │
│   │  Request routing, notifications, workspaces, data   │   │
│   └─────────────────────────┬───────────────────────────┘   │
│                             │                               │
│                             ▼                               │
│   ┌─────────────────────────────────────────────────────┐   │
│   │      Orchestration Engine (SalesCoach)              │   │
│   │      Python/aiohttp - THIS SECTION                  │   │
│   │                                                     │   │
│   │  • WebSocket streaming                              │   │
│   │  • AI conversation flow                             │   │
│   │  • MCP tool coordination                            │   │
│   │  • System prompt building                           │   │
│   └─────────────────────────┬───────────────────────────┘   │
│                             │                               │
│           ┌─────────────────┼─────────────────┐             │
│           ▼                 ▼                 ▼             │
│     Azure OpenAI      MCP Servers       Cosmos DB          │
│     (GPT-4.1 Mini)    (Business Data)   (Persistence)      │
└─────────────────────────────────────────────────────────────┘
```

The main backend connects to the orchestration engine via WebSocket for real-time features. The orchestration engine then coordinates with Azure OpenAI for AI responses and MCP servers for business data.

---

## Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Runtime | Python 3.11+ | Core language |
| HTTP/WebSocket | aiohttp | Async web server |
| AI Model | Azure OpenAI (GPT-4.1 Mini) | Chat intelligence |
| Tool Protocol | Model Context Protocol (MCP) | External tool integration |
| Database | Azure Cosmos DB | Chat persistence |
| Storage | Azure Blob Storage | System prompts |

---

## The 7-Step Application Flow

The orchestration engine processes each user interaction through a defined 7-step flow:

| Step | Name | Description |
|---|---|---|
| 1 | [Connect](./flow/step1-connect) | WebSocket connection establishment |
| 2 | [Authenticate](./flow/step2-authentication) | Session initialization and role assignment |
| 3 | [Query](./flow/step3-query) | User query received and validated |
| 4 | [Process](./flow/step4-process) | AI processing with system prompt |
| 5 | [Tools](./flow/step5-tools) | MCP tool execution if needed |
| 6 | [Respond](./flow/step6-respond) | Response generation and streaming |
| 7 | [Persist](./flow/step7-persist) | Conversation stored in CosmosDB |

This flow ensures consistent, reliable handling of every user interaction.

---

## Documentation Sections

| Section | Description |
|---|---|
| [Architecture](./architecture) | System design, components, and technology stack |
| [7-Step Application Flow](./flow/step1-connect) | Step-by-step walkthrough of the WebSocket flow |

---

## Quick Start

To understand how the orchestration engine works, we recommend reading the documentation in this order:

1. **[Architecture](./architecture)** — Get a high-level understanding of the system
2. **[Step 1: Connection](./flow/step1-connect)** through **[Step 7: Persistence](./flow/step7-persist)** — Detailed flow walkthrough

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Backend](/docs/backend) | The broader backend architecture |
| [AI & Models](/docs/ai-and-mcp) | How the AI models work |
| [MCP Servers](/docs/mcp-servers) | Available business data connectors |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How prompts are built |
| [Platform Overview](/docs/platform/high-level-architecture) | Full platform architecture |
