# SalesCoach Architecture

## Overview

**SalesCoach** is an AI-powered conversational assistant for sales coaching. It provides real-time chat capabilities (individual and group), integrates with multiple AI tools via the Model Context Protocol (MCP), and persists conversations to Azure CosmosDB.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Python 3.x |
| **Web Framework** | aiohttp (async) |
| **Real-time** | WebSockets |
| **AI/LLM** | Azure OpenAI (`gpt-4.1-mini` & `gpt-4o-realtime`) |
| **Tool Protocol** | Model Context Protocol (MCP) |
| **Speech** | Azure Cognitive Services (`Alloy Neural`) |
| **Database** | Azure CosmosDB |
| **Authentication** | Azure Entra ID (AD) |
| **Deployment** | Docker / Azure AKS |

---

## Model Selection & Configuration

The application uses a multi-model strategy to balance performance, cost, and real-time capabilities. These models are managed through the `.env` file to allow for environment-specific tuning.

### 1. Model Matrix

| Capability | Primary Model | Environment Variable | Role |
|------------|---------------|----------------------|------|
| **Chat (Text)** | `gpt-4.1-mini` | `AZURE_OPENAI_CHAT_MODEL` | Core reasoning, context building, and tool orchestration. |
| **Real-time (Voice)** | `gpt-4o-realtime` | `AZURE_OPENAI_REALTIME_DEPLOYMENT` | **LEGACY/UNUSED** - Low-latency voice-to-voice interaction (dead code). |
| **Utility/Ops** | `gpt-4o-mini` | *Internal* | Session title generation and chart data analysis. |
| **Speech synthesis** | `Alloy (Neural)` | `SPEECH_SERVICE_VOICE` | **LEGACY/UNUSED** - High-quality text-to-speech for summaries (dead code). |

### 2. Configuration Management

Settings are maintained in the `.env` file (see `.env.template` for defaults). This enables:
- **Centralized Control:** Model versions can be updated globally without code changes (pending full migration of hardcoded references).
- **Environment Isolation:** Dev, Staging, and Production can use different tiers of models (e.g., `mini` for dev, `full` for production).
- **Voice Consistency:** The system voice (e.g., `alloy`) is unified across the Realtime API and the Speech Service via `AZURE_OPENAI_REALTIME_VOICE_CHOICE` and `SPEECH_SERVICE_VOICE`.

> [!NOTE]
> Some model identifiers are currently being transitioned from hardcoded strings in `streamablemcpservers.py` to full environment variable management to prevent cross-repository configuration drift.

---

## Speech & Voice Implementation

### Current Speech Architecture (Text-Based)
The application uses a **text-based speech implementation** rather than true voice-to-voice:

**Speech Input:**
- **Client-Side:** Browser Web Speech API transcribes audio to text
- **No Server Processing:** Audio is converted to text before reaching backend

**Speech Output:**
- **Client-Side:** Browser TTS converts text responses to speech
- **No Server Synthesis:** Backend returns text, frontend handles voice synthesis

**Communication Flow:**
```
User Audio → Browser Web Speech API → Text → WebSocket (/ws/chat or /ws/group-chat) → AI Processing → Text Response → Browser TTS → User Audio
```

### Legacy Realtime Voice (Unused)
The codebase contains complete realtime voice infrastructure (`rtmt.py`, `/realtime` endpoint) that enables true voice-to-voice conversations with Azure OpenAI, but this is **dead code** - never used in the current application flow.

**Legacy Flow (Unused):**
```
User Audio → /realtime WebSocket → Azure OpenAI Realtime API → Voice Response
```

> [!IMPORTANT]
> The current implementation prioritizes **reliability and simplicity** over low-latency voice processing. Speech functionality is handled entirely client-side for better performance and reduced server complexity.

---

## System Prompt Construction

The system prompt is dynamically assembled for each session to provide the AI with up-to-date context, role-specific constraints, and tool capabilities. For detailed implementation, see [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction).

**Key Aspects:**
- **External Storage**: Prompts loaded from Azure Blob Storage for centralized management.
- **Dynamic Replacements**: Runtime substitutions for dates and MCP server configurations.
- **Role-Based Access Control**: MCP servers filtered by user roles (e.g., HR, Sales, Management).
- **Session-Specific**: Unique prompts per WebSocket session with role-based tool access.
- **Security**: Ensures consistent application of rules and access controls.

---
- **Session Update:** When a WebSocket connection is established or updated (via `session.update`), a unique session-specific prompt is generated and stored in the session storage.
- **Consistency:** This ensures that if the server configuration changes or a user's role shifts mid-session, the AI's "worldview" remains consistent with its authorized capabilities.

---

## High-Level Architecture

```
                                    +----------------------+
                                    |     Frontend UI      |
                                    |   (React Web App)    |
                                    +----------+-----------+
                                               | WebSocket
                                               v
+------------------------------------------------------------------------------+
|                              BACKEND (Python/aiohttp)                        |
|                                                                              |
|  +-----------------+    +-------------------------------------------------+  |
|  |    app.py       |    |              WebSocket Services                 |  |
|  |  (Entry Point)  |--->|  websocket_chat_service.py                      |  |
|  |                 |    |  websocket_group_chat_service.py                |  |
|  +-----------------+    +--------------------+----------------------------+  |
|                                              |                               |
|                                              v                               |
|                         +-------------------------------------------------+  |
|                         |           MCP_ChatBot (AI Engine)               |  |
|                         |         streamablemcpservers.py                 |  |
|                         |                                                 |  |
|                         |  * Session memory management                    |  |
|                         |  * LLM orchestration (Azure OpenAI)             |  |
|                         |  * Tool execution coordination                  |  |
|                         +----------+----------------------+---------------+  |
|                                    |                      |                  |
|              +---------------------v------+   +-----------v---------------+  |
|              |      MCP Tool Servers      |   |    Persistence Layer      |  |
|              |                            |   |                           |  |
|              |  * RAG Tools               |   |  * SessionMemoryManager   |  |
|              |  * Web Search              |   |  * GroupChatManager       |  |
|              |  * Database Queries        |   |  * CommonQuestionsAnalyzer|  |
|              |  * Custom Integrations     |   |                           |  |
|              +----------------------------+   +-----------+---------------+  |
|                                                           |                  |
+-----------------------------------------------------------+------------------+
                                                            |
                                                            v
                                               +------------------------+
                                               |    Azure CosmosDB      |
                                               |                        |
                                               |  * sessions container  |
                                               |  * groups container    |
                                               +------------------------+
```

---

## Application Flow (7 Steps)

```
+---------+    +---------+    +---------+    +---------+    +---------+    +---------+    +---------+
| CONNECT |--->|  AUTH   |--->|  QUERY  |--->| PROCESS |--->|  TOOLS  |--->| RESPOND |--->| PERSIST |
| Step 1  |    | Step 2  |    | Step 3  |    | Step 4  |    | Step 5  |    | Step 6  |    | Step 7  |
+---------+    +---------+    +---------+    +---------+    +---------+    +---------+    +---------+
```

| Step | Description | Key Component |
|------|-------------|---------------|
| **1. Connect** | Client establishes WebSocket connection | `app.py` → WebSocket handlers |
| **2. Auth** | Session created with user context, role, tokens | `websocket_chat_service.py` |
| **3. Query** | User sends text/audio message | `handle_query()` |
| **4. Process** | AI builds context, calls LLM | `MCP_ChatBot.process_query()` |
| **5. Tools** | MCP servers execute external operations | `MCPServerConnection` |
| **6. Respond** | Stream response back to client | WebSocket JSON response |
| **7. Persist** | Save messages to CosmosDB | `SessionMemoryManager` |

---

## Core Components

### Entry Point
- **`app.py`** - aiohttp server, routes, WebSocket endpoints

### WebSocket Services
- **`websocket_chat_service.py`** - Individual chat handling
- **`websocket_group_chat_service.py`** - Group chat with multiple users
- **`rtmt.py`** - Real-time message transport utilities

### AI Engine
- **`streamablemcpservers.py`** - Core `MCP_ChatBot` class
  - LLM orchestration (Azure OpenAI)
  - Tool execution via MCP protocol
  - Session memory management (`SessionMemoryManager`)

### Persistence
- **`group_chat_manager.py`** - Group chat CRUD operations
- **`common_questions_analyzer.py`** - FAQ/knowledge analysis

### Configuration
- **`mcpservers.json`** - MCP server definitions
- **`prompt_loader.py`** - System prompts from Azure Blob Storage

---

## Data Flow

```
Frontend                          Backend                           Azure
   |                                 |                                |
   |---- WebSocket Connect --------->|                                |
   |<---- connection.ack ------------|                                |
   |                                 |                                |
   |---- session.update ------------>|                                |
   |     {session_id, email_id,      |                                |
   |      role, accessToken...}      |                                |
   |                                 |--- Load system prompt -------->| Blob Storage
   |                                 |<-- prompt text ----------------|
   |                                 |--- Check/create session ------>| CosmosDB
   |<---- session.created -----------|                                |
   |                                 |                                |
   |---- query --------------------->|                                |
   |     {content: "user message"}   |                                |
   |                                 |--- Call LLM ------------------>| Azure OpenAI
   |                                 |<-- tool_call request ----------|
   |                                 |--- Execute MCP tool ---------->| MCP Servers
   |                                 |<-- tool result ----------------|
   |                                 |--- Final LLM call ------------>| Azure OpenAI
   |<---- chat_response -------------|                                |
   |      {response, tool_feedback}  |                                |
   |                                 |--- Save messages ------------->| CosmosDB
   v                                 v                                v
```

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Step 1: Connection & Initialization](./flow/step1-connect.md) | WebSocket handshake and endpoints |
| [Step 2: Authentication Deep Dive](./flow/step2-authentication.md) | Session setup, role handling, token flow |
| [Step 3: Query Processing](./flow/step3-query.md) | Input handling, duplicates, and database |
| [Step 4: AI Processing](./flow/step4-process.md) | Context building, memory, and LLM handoff |
| [Step 5: Tool Execution](./flow/step5-tools.md) | Discovery, routing, and reliability |
| [Step 6: Response Generation](./flow/step6-respond.md) | Charts, summaries, and WebSocket delivery |
| [Step 7: Data Persistence](./flow/step7-persist.md) | CosmosDB schema and caching strategy |

---

*For detailed documentation of each step, see the individual step documents.*
