---
sidebar_position: 1
title: SalesCoach Backend
description: Python/aiohttp WebSocket backend for real-time sales coaching
---

# SalesCoach Backend

**SalesCoach** is the Python/aiohttp WebSocket backend that powers real-time sales coaching within the Trinity platform. It provides bi-directional streaming chat, integrates with external tools via the Model Context Protocol (MCP), and supports both individual and group conversations.

## Relationship to Trinity Platform

The SalesCoach backend is a specialized downstream service within the Trinity ecosystem:

```
┌─────────────────────────────────────────────────────────────┐
│              Trinity Webapp (React + Express.js)            │
│          See: Platform Architecture Documentation           │
└──────────────────────────┬──────────────────────────────────┘
                           │ WebSocket Connection
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              SalesCoach Backend (Python/aiohttp)            │
│                      THIS DOCUMENTATION                     │
│                                                             │
│    ┌──────────────────────┬─────────────────────────┐       │
│    ▼                      ▼                         ▼       │
│  Azure CosmosDB      Azure OpenAI           MCP Servers     │
│  (Chat History)      (GPT-4.1 Mini)         (Sales Tools)   │
└─────────────────────────────────────────────────────────────┘
```

The Trinity webapp (documented in the [Platform Architecture](/docs/platform/high-level-architecture)) connects to SalesCoach via WebSocket for real-time sales-specific features.

## Key Features

- **Real-time WebSocket Communication** — Bi-directional streaming for responsive interactions
- **Individual & Group Chat** — Support for 1-on-1 coaching and team collaboration
- **Azure OpenAI Integration** — Powered by GPT-4.1 Mini for intelligent responses
- **MCP Tool Execution** — Extensible tool system for external data and actions
- **Role-Based Access Control** — Different tools available based on user roles (Sales, HR, Admin)
- **Conversation Persistence** — Full chat history stored in Azure CosmosDB
- **Dynamic System Prompts** — Role-filtered prompts loaded from Azure Blob Storage

## Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Runtime | Python 3.11+ | Core language |
| HTTP/WebSocket | aiohttp | Async web server |
| AI Model | Azure OpenAI (GPT-4.1 Mini) | Chat intelligence |
| Tool Protocol | Model Context Protocol (MCP) | External tool integration |
| Database | Azure Cosmos DB | Chat persistence |
| Storage | Azure Blob Storage | System prompts |

## Documentation Sections

| Section | Description |
|---|---|
| [Architecture](./architecture) | System design, components, and technology stack |
| [7-Step Application Flow](./flow/step1-connect) | Step-by-step walkthrough of the WebSocket flow |
| [Security Assessment](./security-vulnerabilities) | Security vulnerabilities and remediation |
| [Architecture Improvements](./architecture-improvements) | Refactoring recommendations and roadmap |

## The 7-Step Application Flow

SalesCoach processes each user interaction through a defined 7-step flow:

| Step | Name | Description |
|---|---|---|
| 1 | [Connect](./flow/step1-connect) | WebSocket connection establishment |
| 2 | [Authenticate](./flow/step2-authentication) | Session initialization and role assignment |
| 3 | [Query](./flow/step3-query) | User query received and validated |
| 4 | [Process](./flow/step4-process) | AI processing with system prompt |
| 5 | [Tools](./flow/step5-tools) | MCP tool execution if needed |
| 6 | [Respond](./flow/step6-respond) | Response generation and streaming |
| 7 | [Persist](./flow/step7-persist) | Conversation stored in CosmosDB |

## Quick Start

To understand how SalesCoach works, we recommend reading the documentation in this order:

1. **[Architecture](./architecture)** — Get a high-level understanding of the system
2. **[Step 1: Connection](./flow/step1-connect)** through **[Step 7: Persistence](./flow/step7-persist)** — Detailed flow walkthrough
3. **[Security Assessment](./security-vulnerabilities)** — Important security considerations
4. **[Improvements](./architecture-improvements)** — Proposed refactoring

## Related Platform Documentation

For the broader Trinity platform (webapp frontend and backend), see:

- [High-Level Architecture](/docs/platform/high-level-architecture) — Full platform overview
- [AI & MCP Integration](/docs/ai-and-mcp) — How MCP works across Trinity
- [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) — Prompt building for both layers
- [Real-Time & WebSocket](/docs/realtime) — WebSocket architecture in the webapp
