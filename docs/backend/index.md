---
sidebar_position: 1
title: Backend Architecture
description: How the Trinity backend processes requests and coordinates services
---

# Backend Architecture

The Trinity backend is the processing engine that sits between the user interface and all the data sources. When users ask questions, save workspaces, or send group messages, the backend makes it happen.

---

## What the Backend Does

The backend handles everything that requires server-side processing:

- **Processes AI conversations** — Sends user questions to Azure OpenAI, manages tool calls, and returns responses
- **Coordinates business tools** — Calls the right MCP servers when the AI needs data
- **Stores and retrieves data** — Saves chat history, workspaces, and notifications to the database
- **Manages real-time connections** — Maintains WebSocket connections for streaming and instant messaging
- **Handles authentication** — Validates user tokens and enforces role-based access
- **Runs background jobs** — Monitors long-running tasks and updates notifications when they complete

---

## How Requests Flow Through the Backend

When the frontend sends a request, it goes through several layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    INCOMING REQUEST                         │
│              (from user's browser)                          │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYER                           │
│                                                             │
│   • Checks security headers                                 │
│   • Validates request format                                │
│   • Logs the request for monitoring                         │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ROUTING LAYER                            │
│                                                             │
│   Looks at the request URL and decides where to send it:    │
│   • /chat → Chat processing                                 │
│   • /notifications → Notification handling                  │
│   • /workspace → Workspace management                       │
│   • /group-chat → Group chat operations                     │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC                           │
│                                                             │
│   The actual work happens here:                             │
│   • Process the request                                     │
│   • Call external services if needed                        │
│   • Talk to the database                                    │
│   • Build the response                                      │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    RESPONSE                                 │
│              (sent back to browser)                         │
└─────────────────────────────────────────────────────────────┘
```

This layered approach keeps concerns separated — security is handled before business logic, and routing directs traffic to the right place.

---

## The Main Services

### Chat Service

The chat service is the heart of Trinity. When a user sends a message:

1. **Receives the message** along with conversation history
2. **Builds context** for the AI (system instructions, available tools, user role)
3. **Sends to Azure OpenAI** and waits for the AI's decision
4. **Handles tool calls** if the AI needs data from MCP servers
5. **Returns the response** to the frontend for display
6. **Saves the conversation** to the database

This is the most complex service because it orchestrates multiple external systems (AI, tools, database) into a coherent conversation.

### Notification Service

The notification service manages user alerts:

- **Tracking background jobs** — When users start long-running tasks (like research generation), the notification service monitors them
- **Status updates** — As jobs complete or fail, notifications are updated
- **Delivery** — Users see notifications in their notification panel
- **Read tracking** — Marks notifications as seen when users view them

A background scheduler runs every 5 minutes to check the status of pending jobs and update notifications accordingly.

### Workspace Service

The workspace service manages the visual canvas:

- **Saving layouts** — When users arrange content on the canvas, the layout is preserved
- **Loading workspaces** — Workspaces are retrieved when users return
- **Session management** — Links chat sessions to workspaces so conversations are associated with visual work

### Group Chat Service

The group chat service enables team collaboration:

- **Room creation** — Users can create rooms and invite others
- **Membership** — Tracks who belongs to which rooms
- **Message handling** — Stores and retrieves messages for each room
- **Real-time delivery** — Works with WebSocket to push messages instantly

### Greeting Service

The greeting service creates personalized welcome content:

- **Role-aware** — Generates different greetings for Sales vs. HR users
- **Feature-specific** — Each feature area gets its own greeting content
- **AI-generated** — Uses Azure OpenAI to create natural, relevant greetings
- **Cached** — Greetings are generated in the background and cached for instant delivery

---

## How the Backend Connects to External Services

The backend doesn't work alone. It coordinates with several external services:

### Azure OpenAI

The AI model that understands questions and generates responses. The backend:
- Builds detailed prompts with context and instructions
- Sends conversation history so the AI understands prior context
- Receives responses that may include tool call requests
- Handles streaming responses for real-time display

### MCP Servers

Specialized services that provide access to business data. When the AI decides it needs information:
1. The backend identifies which MCP server has the needed capability
2. Makes a request to that server with the required parameters
3. Receives the data response
4. Passes the data back to the AI for interpretation

### Azure Cosmos DB

The database where all persistent data lives. The backend reads and writes:
- Chat sessions and messages
- Notifications and their status
- Workspace layouts and content
- Group chat rooms and messages
- Configuration and settings

### Azure Blob Storage

File storage for larger content:
- User profile images (digital twins)
- Uploaded documents
- Generated reports

### Microsoft Graph

For Microsoft 365 integration, the backend can call Microsoft Graph to:
- Search for users in the directory
- Access calendar and email (through MCP)

---

## How the Backend Handles Different Request Types

### Synchronous Requests (Wait for Answer)

Most requests follow a simple pattern: the frontend asks, the backend processes, and returns a response. This includes:

- Loading chat history
- Fetching notifications
- Getting workspace data
- Searching users

These complete quickly (usually under a second).

### Streaming Requests (Continuous Data)

AI chat uses streaming: the response comes back piece by piece as the AI generates it. The backend:

1. Opens a streaming connection to Azure OpenAI
2. Receives chunks of the response as they're generated
3. Forwards each chunk to the frontend via WebSocket
4. Continues until the response is complete

This creates the "typing" effect users see in chat.

### Background Jobs (Long-Running Tasks)

Some operations take too long for users to wait:

- Research generation that requires multiple data sources
- Complex report generation
- Bulk data operations

For these, the backend:
1. Starts the job and returns immediately
2. Creates a notification to track progress
3. Runs the job in the background
4. Updates the notification when complete
5. User can check back later for results

---

## How Errors are Handled

When things go wrong, the backend handles errors gracefully:

### Validation Errors
If a request is missing required information or has invalid data, the backend returns a clear error message explaining what's wrong.

### Service Unavailable
If an external service (AI, database, MCP server) is unavailable, the backend returns an appropriate error rather than crashing.

### Rate Limiting
If too many requests come in too quickly, the backend can throttle to protect system stability.

### Logging
All errors are logged for monitoring. This helps the operations team identify and fix issues quickly.

---

## How the Backend Starts Up

When the backend server starts:

1. **Load configuration** — Read environment variables and settings
2. **Connect to database** — Establish connection to Cosmos DB
3. **Initialize AI service** — Set up Azure OpenAI connection and load system prompts
4. **Discover MCP servers** — Load available tools and their capabilities
5. **Start HTTP server** — Begin accepting requests
6. **Start background scheduler** — Begin monitoring background jobs

If any critical step fails (like database connection), the server won't start — this prevents running in a broken state.

---

## Development vs. Production Mode

The backend behaves differently depending on the environment:

### Development Mode
- More detailed logging for debugging
- Mock data available when external services aren't configured
- Relaxed security for local testing

### Production Mode
- Optimized for performance
- Full security enforcement
- Minimal logging (only important events)
- Real connections to all services

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | How backend fits in the overall system |
| [AI & MCP](/docs/ai-and-mcp) | How the AI and business tools work |
| [Data Layer](/docs/data-layer) | How data is stored and organized |
| [Real-Time](/docs/realtime) | How WebSocket communication works |
| [API Reference](/docs/api-reference) | Available endpoints for developers |
