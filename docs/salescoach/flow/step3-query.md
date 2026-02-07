---
sidebar_position: 3
title: "Step 3: Query Processing"
description: How user queries are received and processed in SalesCoach
---

# Step 3: Query Processing

Once the user is authenticated (Step 2), they can begin interacting with the agent. The **Query Processing** phase handles receiving, validating, and preparing the user's input for the AI engine.

## Overview

The "Query" phase is triggered whenever a user sends a message. The backend must handle different input types (Text, Audio), duplicate detection, and routing to the correct AI context.

**Key Goals:**
- Receive user input (Text/Audio).
- Prevent duplicate submissions (De-bouncing/hashing).
- Broadcast user messages immediately (Group Chat).
- Prepare the session context for the AI Engine.

---

## The `query` Message

**Direction:** Client → Backend

### Payload Structure

```json
{
  "type": "query",
  "content": "Show me the sales report for Q1",
  "inputType": "text",
  "email": "user@example.com"
}
```

| Field | Description |
|-------|-------------|
| `type` | Must be `"query"` (or legacy `"send_message"` in groups). |
| `content` | The actual user message string. |
| `inputType` | `"text"` (default) or `"audio"`. |
| `email` | Required for group chats to identify sender. |

---

## Processing Logic

### 1. Duplicate Detection (Group Chat Only)

In group chats, duplicate message prevention is critical to avoid infinite loops or double-processing.

- **Mechanism:** An MD5 hash is generated from: `GroupID + Sender + Text + TimeWindow (10s)`.
- **Action:** If the exact same message is received within the time window, it is logged as a duplicate and **blocked**.

### 2. Message Persistence (Pre-Processing)

- **Group Chat:** The user's message is **immediately** saved to CosmosDB via `GroupChatManager` before any AI processing occurs.
- **Individual Chat:** Persistence happens at the end of the flow (Step 7).

### 3. Immediate Broadcast (Group Chat Only)

To ensure a responsive UI for all participants, the user's message is broadcast to all other WebSocket connections in the group **before** the AI starts processing.

- **Event:** `new_message` payload is sent to all members except the sender.

### 4. Input Handling

- **Text:** Passed directly to the AI engine.
- **Audio:** Currently, audio is expected to be transcribed by the browser (Web Speech API) and sent as text. The backend has legacy support for Azure Speech Services (`speech_config`) but it is often bypassed in favor of client-side transcription for lower latency.

### 5. AI Handoff

The processed query text, along with the `session_id` and verified `email_id`, is passed to the core AI engine:

```python
MCP_ChatBot.process_query()
```
