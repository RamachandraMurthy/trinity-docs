---
sidebar_position: 2
title: Real-Time & WebSocket
description: How Trinity enables instant messaging, voice input, and live updates
---

# Real-Time & WebSocket

This page goes deeper into the real-time communication that powers Trinity's chat streaming, voice interaction, and group messaging. These capabilities are core to the frontend experience, making interactions feel instant and conversational.

Trinity feels responsive and alive because of real-time communication. When you send a message, the AI's response appears word-by-word. When someone messages your group chat, you see it instantly. This page explains how that works.

---

## Why Real-Time Matters

Without real-time communication, every interaction would feel like waiting:
- Send a question → Wait → See complete answer (after potentially 10+ seconds)
- Send a group message → Refresh page → Maybe see responses

With real-time communication:
- Send a question → See answer streaming in as it's generated
- Send a group message → Everyone sees it instantly
- Get a notification → It appears without refreshing

This creates a conversational, responsive experience.

---

## Two Types of Communication

Trinity uses two communication patterns:

### Request-Response (REST API)

Like sending a letter and waiting for a reply:

```
Browser: "Give me my chat history"
    ↓
Server: (processes request)
    ↓
Server: "Here's your history" (complete response)
```

Good for:
- Fetching data that's ready immediately
- Saving information
- One-time operations

### Persistent Connection (WebSocket)

Like keeping a phone line open:

```
Browser ←————— open connection ————→ Server

Either side can send messages at any time:
  Browser → "New chat message"
  Server → "AI response chunk 1"
  Server → "AI response chunk 2"
  Server → "AI response complete"
```

Good for:
- Streaming data (like AI responses)
- Instant notifications
- Group chat messages
- Anything that needs to be immediate

---

## How AI Response Streaming Works

When you ask the AI a question:

### Step 1: Question Sent
You type your question and hit send. The browser sends it through the WebSocket connection.

### Step 2: AI Starts Generating
The backend receives your question and sends it to Azure OpenAI. The AI starts generating a response.

### Step 3: Chunks Stream Back
As the AI generates each word or phrase, it's sent immediately:

```
"There"
"are"
"342"
"employees"
"in"
"the"
"London"
"office..."
```

Each chunk is sent through WebSocket to your browser as soon as it's generated.

### Step 4: Browser Renders Progressively
Your browser receives each chunk and adds it to the message display. You see the response appearing word-by-word, just like watching someone type.

### Step 5: Completion
When the AI finishes, a "complete" signal is sent. The browser knows the response is done and can save it to history.

This streaming approach means you start seeing the answer almost immediately, rather than waiting for the entire response to be generated.

---

## How Group Chat Works

Group chat requires real-time delivery to all participants:

### Joining a Room

When you open a group chat:
1. Your browser establishes a WebSocket connection
2. You "join" the chat room on the server
3. The server knows you're a participant

### Sending a Message

When you send a message:
1. Your message goes to the server via WebSocket
2. Server identifies all other members of the room
3. Server sends the message to each member's WebSocket
4. Everyone sees the message appear instantly

```
     You                  Server                  Teammate
      │                     │                        │
      │──── "Hello!" ──────▶│                        │
      │                     │─── "Hello!" ──────────▶│
      │                     │                        │
      │   (you see it)      │      (teammate sees it instantly)
```

### Member Presence

The server tracks who's connected:
- When someone joins, the room knows they're "here"
- When someone disconnects, the room updates
- This enables "who's online" indicators

---

## Connection Lifecycle

### Establishing Connection

When you log into Trinity:
1. Browser establishes WebSocket connection to the server
2. Connection is authenticated with your tokens
3. Server registers you as connected
4. You're ready to send and receive real-time messages

### Staying Connected

Connections are maintained through "heartbeat" messages:
- Periodically, a small message is sent to confirm the connection is alive
- If no response, the connection is considered dropped

### Handling Disconnection

If your internet drops or you close the tab:
1. Server detects the disconnection
2. You're removed from any group rooms
3. When you reconnect, state is restored

### Automatic Reconnection

If connection is lost unexpectedly:
1. Browser detects the drop
2. Attempts to reconnect automatically
3. After successful reconnection, resumes normal operation
4. If reconnection fails after several tries, shows an error

---

## Real-Time Token Refresh

Security tokens expire after about an hour. Trinity uses WebSocket to update tokens without interrupting your session:

### The Problem
If tokens expired while you were mid-conversation, your requests would suddenly fail.

### The Solution
1. A background service monitors token expiration
2. Before tokens expire, fresh tokens are obtained from Microsoft
3. The new tokens are sent to the server via WebSocket
4. Server updates its record of your tokens
5. Subsequent requests use the new tokens seamlessly

You never notice this happening — it's completely automatic.

---

## Notification Delivery

When something happens that you should know about (a research job completes, for example):

### Push Notifications
1. Backend completes a job
2. Creates a notification record
3. Sends notification alert via WebSocket
4. Your browser receives it
5. Notification badge updates immediately

### Polling Fallback
If WebSocket isn't connected, notifications are also checked periodically through regular API calls to ensure nothing is missed.

---

## Architecture Overview

```
┌───────────────────────────────────────────────────────────────────┐
│                        YOUR BROWSER                               │
│                                                                   │
│   ┌─────────────┐    ┌─────────────────────────────────────┐     │
│   │ REST Client │    │       WebSocket Client              │     │
│   │             │    │                                     │     │
│   │ (fetch data,│    │  • Chat streaming                   │     │
│   │  save data) │    │  • Group chat messages              │     │
│   └──────┬──────┘    │  • Token refresh                    │     │
│          │           │  • Notifications                    │     │
│          │           └────────────────┬────────────────────┘     │
└──────────┼────────────────────────────┼──────────────────────────┘
           │                            │
           │ HTTPS                      │ WSS (Secure WebSocket)
           │                            │
┌──────────┼────────────────────────────┼──────────────────────────┐
│          │                            │                          │
│  ┌───────▼───────┐           ┌────────▼────────┐                 │
│  │  REST API     │           │  WebSocket      │                 │
│  │  Endpoints    │           │  Server         │                 │
│  └───────────────┘           └─────────────────┘                 │
│                                                                   │
│                         BACKEND SERVER                            │
└───────────────────────────────────────────────────────────────────┘
```

---

## Benefits of This Approach

### Responsiveness
Users don't wait for page refreshes or polling delays. Information appears instantly.

### Efficiency
WebSocket connections are kept open, avoiding the overhead of establishing new connections for each message.

### User Experience
The "streaming" effect of AI responses feels conversational, like chatting with someone who's thinking and responding in real-time.

### Collaboration
Group chat works because all participants receive messages simultaneously, enabling real conversation.

---

## When Things Go Wrong

### Connection Lost
If WebSocket disconnects, the browser shows an indicator and attempts to reconnect. Operations requiring real-time continue to work through REST fallback.

### Server Unavailable
If the server goes down, all connected clients disconnect. Upon server recovery, clients automatically reconnect.

### High Latency
If the network is slow, streaming messages may appear choppy. The system adapts but the experience is degraded.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Frontend](/docs/frontend) | The broader frontend architecture (parent section) |
| [Backend](/docs/backend) | How the server manages connections |
| [Orchestration (SalesCoach)](/docs/salescoach) | The real-time AI conversation engine |
| [Platform Overview](/docs/platform/high-level-architecture) | How real-time fits in the overall system |
