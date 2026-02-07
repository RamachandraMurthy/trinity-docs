---
sidebar_position: 1
title: SalesCoach Overview
description: AI-powered sales coaching assistant overview and documentation
---

# SalesCoach

**SalesCoach** is an AI-powered conversational assistant for sales coaching. It provides real-time chat capabilities (individual and group), integrates with multiple AI tools via the Model Context Protocol (MCP), and persists conversations to Azure CosmosDB.

## Key Features

- **Real-time WebSocket Communication** - Bi-directional chat for responsive interactions
- **Individual & Group Chat** - Support for 1-on-1 coaching and team collaboration
- **Azure OpenAI Integration** - Powered by GPT-4 for intelligent responses
- **MCP Tool Execution** - Extensible tool system for external data and actions
- **Role-Based Access Control** - Different tools available based on user roles
- **Conversation Persistence** - Full chat history stored in Azure CosmosDB

## Documentation

| Section | Description |
|---------|-------------|
| [Architecture](./architecture) | System design, components, and technology stack |
| [Architecture Improvements](./architecture-improvements) | Refactoring recommendations and roadmap |
| [Security Assessment](./security-vulnerabilities) | Security vulnerabilities and remediation |
| [Application Flow](./flow/step1-connect) | Step-by-step walkthrough of the 7-step flow |

## Quick Start

To understand how SalesCoach works, we recommend reading the documentation in this order:

1. **[Architecture](./architecture)** - Get a high-level understanding of the system
2. **[Step 1: Connection](./flow/step1-connect)** through **[Step 7: Persistence](./flow/step7-persist)** - Detailed flow walkthrough
3. **[Security Assessment](./security-vulnerabilities)** - Important security considerations
