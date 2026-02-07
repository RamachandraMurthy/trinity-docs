---
sidebar_position: 7
title: "Step 7: Persistence"
description: How conversations are stored in SalesCoach
---

# Step 7: Persistence & Conversation Memory

The final step in the application flow is ensuring that the interactions are saved securely. This allows users to review past chats, resume sessions across devices, and enables the AI to recall context in future turns.

## Overview

Persistence is handled asynchronously to ensure the user experience remains snappy. The backend uses a dual-layer strategy: **In-Memory Cache** for speed and **Azure CosmosDB** for durability.

**Key Goals:**
- Store user queries and AI responses.
- Maintain conversation history by Session ID.
- Securely segregate data by User (Email).
- Support both transient (Memory) and permanent (DB) storage.

---

## Storage Strategies

### 1. Individual Chat (`SessionMemoryManager`)

For 1-on-1 chats, data is managed by the `SessionMemoryManager` class in `streamablemcpservers.py`.

- **Database:** Azure CosmosDB (NoSQL).
- **Container:** `Conversations`.
- **Partition Key:** `/EmailID` (Crucial for multi-tenant scalability).

**Workflow:**

1. **Filtering:** `_should_store_message()` checks if the message is worth saving (e.g., ignores "System Init" or "Typing..." events).
2. **Caching:** The message is immediately added to `self.memory_cache` for instant retrieval during the active session.
3. **Upsert:** The full session document (including the new message) is upserted to CosmosDB.
   - *Note:* The system updates the entire session document rather than appending individual message rows, ensuring atomicity.

### 2. Group Chat (`GroupChatManager`)

For group chats, `GroupChatManager` (in `group_chat_manager.py`) handles persistence.

- **Container:** `GroupChatHistory`.
- **Partition Key:** `/groupId`.

**Differences:**
- Group chats persist messages strictly *before* broadcasting to ensure consistency across all connected clients.
- Includes `sender` metadata to distinguish between different users in the group.

---

## Data Schema (Simplified)

A typical conversation document in CosmosDB looks like this:

```json
{
  "id": "chat_2023_10_27_session_uuid...",
  "sessionId": "session_uuid...",
  "EmailID": "user@example.com",
  "sessionTitle": "Q3 Sales Analysis",
  "timestamp": "2023-10-27T10:00:00Z",
  "messages": [
    {
      "sender": "user",
      "text": "Show me sales for Q3",
      "time": "2023-10-27T10:00:05Z"
    },
    {
      "sender": "bot",
      "text": "Here is the sales data...",
      "time": "2023-10-27T10:00:10Z"
    }
  ]
}
```

## Conclusion

This completes the 7-step architecture flow:

1. **Connect** (WebSocket Handshake)
2. **Auth** (Session & Role Setup)
3. **Query** (User Input)
4. **Process** (AI & Context Building)
5. **Tools** (MCP Execution)
6. **Respond** (Formatting & Delivery)
7. **Persist** (CosmosDB Storage)
