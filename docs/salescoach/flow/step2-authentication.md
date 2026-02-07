---
sidebar_position: 2
title: "Step 2: Authentication"
description: Session setup and user authentication in SalesCoach
---

# Step 2: Authentication & Session Setup

After establishing a WebSocket connection (Step 1), the client must immediately authenticate the user and initialize the session context. This is known as the **Authentication Phase**.

## Overview

Authentication in SalesCoach is not just about identity verification; it is primarily about **Context Initialization**. The backend needs to know *who* is talking and *what role* they play to correctly configure the AI's capabilities (MCP tools).

**Key Goals:**
- Associate the WebSocket connection with a specific User (Email).
- Define the User's Role (e.g., "Sales", "Manager", "HR") to filter available tools.
- Securely pass tokens (Entra ID, PowerBI) for downstream use.
- Initialize Session Memory for conversation persistence.

---

## The `session.update` Message

The primary mechanism for authentication is the `session.update` WebSocket message.

**Direction:** Client → Backend

### Payload Structure

```json
{
  "type": "session.update",
  "session_id": "uuid-string-here",
  "email_id": "user@example.com",
  "role": "Sales",
  "accessToken": "ey...",
  "powerbiToken": "ey..."
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | Must be `"session.update"`. |
| `session_id` | Yes | Unique ID for the conversation session. |
| `email_id` | Yes | The user's unique identifier. |
| `role` | Yes | Critical for RBAC. Determines which tools the AI can use. |
| `accessToken` | Yes | Microsoft Entra ID (Azure AD) token for authentication context. |
| `powerbiToken` | No | Optional token for PowerBI tools. |

---

## Backend Processing Logic

### 1. Individual Chat (`websocket_chat_service.py`)

When the backend receives this message:

1. **Session Binding:** The `session_id` and `email_id` are stored in the memory dictionary `rtmt.session_storage` linked to the active WebSocket.
2. **Role Configuration:** The `role` is extracted. If missing, it defaults to "HR".
3. **Tool Filtering (RBAC):**
   - The system iterates through all registered MCP tools.
   - It checks the `roles` list defined for each tool.
   - Only tools matching the user's current `role` are added to the `available_tools` list for this session.
   - *Example:* A "Sales" role won't see "HR Policy Update" tools.
4. **System Prompt Update:** The AI's system prompt is dynamically updated to include the user's context (Date, Role, Server List).
5. **Token Storage:** `accessToken` and `powerbiToken` are stored securely in memory to be passed to MCP servers during tool execution.

### 2. Group Chat (`websocket_group_chat_service.py`)

Group chat authentication works slightly differently due to multi-user nature.

- **Initial Join (`join_group`):** Users authenticate when joining a group.
- **Validation:** The backend validates that the user is a member of the group (checking `group_chat_manager.py`).
- **Role Locking:** In a group, the **Group's Role** takes precedence over the user's individual role to ensure consistent tool access for all members in that context.
  - *Example:* If a "Manager" joins a "Sales Team" group, they participate in the "Sales" role context.

---

## Security & Persistence

- **No Persistent Auth Data:** Tokens are stored *only* in the volatile memory of the running application (`rtmt.session_storage`). They are never written to disk or the CosmosDB database.
- **Session Persistence:** While tokens are transient, the conversation structure (Session ID, Participants) is persisted to CosmosDB via `SessionMemoryManager` (Step 7) to allow resuming conversations (though the client must re-send valid tokens upon reconnection).
