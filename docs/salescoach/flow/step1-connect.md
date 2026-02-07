---
sidebar_position: 1
title: "Step 1: Connection"
description: How WebSocket connections are established in SalesCoach
---

# Step 1: Connection & Initialization

This document details the first step in the SalesCoach application flow: **Connection**. It covers how the client establishes a real-time communication channel with the backend.

## Overview

The "Connect" phase is the foundational step where the Frontend React application establishes a persistent WebSocket connection with the Python backend. This connection serves as the transport layer for all subsequent interactions, including authentication, chat queries, tool execution, and audio streaming.

**Key Goals:**
- Establish a bi-directional communication channel.
- Register the active connection in the backend memory.
- Prepare the connection for session initialization (Step 2).

---

## Connection Endpoints

The application exposes two distinct WebSocket endpoints handled by `aiohttp`:

| Endpoint | Service Class | Purpose |
|----------|---------------|---------|
| `/ws/chat` | `WebSocketChatService` | **Individual Chat**: 1-on-1 coaching with the AI. |
| `/ws/group-chat` | `WebSocketGroupChatService` | **Group Chat**: Multi-user collaboration with AI presence. |

---

## Technical Flow

### 1. Client Initiation

The Frontend (React) initiates a standard WebSocket handshake request to the backend.

```javascript
// Frontend Example (Conceptual)
const socket = new WebSocket("ws://localhost:8000/ws/chat");
```

### 2. Backend Entry Point (`app.py`)

`app.py` acts as the entry point. It sets up the `aiohttp` application and registers the WebSocket routes during startup.

```python
# app.py
# Create and attach WebSocket chat service
websocket_chat_service = await create_websocket_chat_service(chatbot)
websocket_chat_service.attach_to_app(app, "/ws/chat")

# Create and attach WebSocket GROUP chat service
websocket_group_chat_service = await create_websocket_group_chat_service(chatbot)
websocket_group_chat_service.attach_to_app(app, "/ws/group-chat")
```

### 3. Service Handling

When a request hits an endpoint, the corresponding service's `handle_websocket_connection` method is invoked.

#### Individual Chat Flow (`websocket_chat_service.py`)

1. **Handshake**: `ws.prepare(request)` completes the WebSocket handshake.
2. **Tracking**: A unique UUID `connection_id` is generated.
3. **Registry**: The connection is added to `self.active_connections`.
4. **Loop**: The `process_websocket_messages` loop begins, waiting for incoming JSON messages.

```python
async def handle_websocket_connection(self, request: web.Request) -> web.WebSocketResponse:
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    
    connection_id = str(uuid.uuid4())
    self.active_connections[connection_id] = ws
    
    logger.info(f"🔗 New WebSocket connection established: {connection_id}")
    
    try:
        await self.process_websocket_messages(ws, connection_id)
        # ... matches loop ...
```

#### Group Chat Flow (`websocket_group_chat_service.py`)

Similar to individual chat but prepares for multi-user routing.

1. **Handshake**: Connection established.
2. **Registry**: User is mapped to a group (initially or upon `join_group` message).

---

## Connection Lifecycle

| State | Trigger | Backend Action |
|-------|---------|----------------|
| **Connecting** | Client sends upgrade request | `ws.prepare(request)` |
| **Connected** | Handshake success | Connection added to `active_connections` dict. |
| **Active** | Connection open | Loop `async for msg in ws:` listens for messages. |
| **Disconnecting** | Client closes / Network fail | Loop breaks (`WSMsgType.CLOSE` or error). |
| **Cleanup** | Disconnect event | Connection removed from registry; resources freed. |
