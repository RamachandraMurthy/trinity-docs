---
sidebar_position: 4
title: "Step 4: AI Processing"
description: How the AI engine processes queries and builds context
---

# Step 4: AI Processing & Context Building

After the user's query is received and validated (Step 3), the core AI engine (`MCP_ChatBot`) takes over to reason about the request. This step involves constructing the full context, managing conversation history, and invoking the Large Language Model (LLM).

## Overview

The "Process" phase is where the "Stateless" HTTP request is turned into a "Stateful" conversation. The system reconstructs the user's reality by combining:

1. **System Instructions** (Who the AI is).
2. **User Context** (Who the User is).
3. **Conversation History** (What has been said).
4. **Available Tools** (What the AI can do).

## The `process_query` Workflow

The `MCP_ChatBot.process_query` method in `streamablemcpservers.py` orchestrates this flow:

### 1. Session Context Retrieval

The system retrieves the session metadata stored during Authentication (Step 2):

- **Session ID**: The unique conversation identifier.
- **Email ID**: The user's identity.
- **Role**: The user's role (e.g., "Sales"), which influences the System Prompt.

### 2. Memory Persistence (User Message)

Before asking the LLM, the new user message is saved to the **Conversation History** via `SessionMemoryManager`.

- **Storage:** Saves to both in-memory cache and Azure CosmosDB.
- **Metadata:** Stores timestamp, sender ("user"), and role.

### 3. Context Construction

The payload sent to the LLM (OpenAI GPT-4) is constructed dynamically:

**System Message:**
- **Base Instructions:** Fetched from **Azure Blob Storage** (`mcp_backend_system_prompt.txt`).
- **Dynamic Injection:**
  - Current Date/Time.
  - User's Name & Role.
  - **MCP Servers/Tools:** A role-filtered list of authoritative services (see [Step 5: Tool Registry](./step5-tools) for how this list is discovered).

**History Messages:**
- Retrieves the last N messages from `SessionMemoryManager`.
- Formats them as standard OpenAI `user`/`assistant` messages.
- *De-duplication:* Ensures the current query isn't added twice if the history fetch included it.

**Current User Message:**
- The latest query is appended to the end.

### 4. LLM Invocation (Function Calling)

The constructed message list is sent to the Azure OpenAI Service.

- **Model:** `gpt-4.1-mini` (or configured model via `AZURE_OPENAI_CHAT_MODEL`).
- **Tools:** The available MCP tools are passed as `functions` or `tools` in the API call, enabling the LLM to decide if it needs to execute actions.
