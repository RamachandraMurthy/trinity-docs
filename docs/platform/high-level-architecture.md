---
sidebar_position: 1
title: Platform Overview
description: How Trinity (WorkSphere) works — system architecture and key components
---

# Trinity Platform Overview

> **Production Brand:** WorkSphere — [worksphere.dxc.ai](https://worksphere.dxc.ai)

Trinity is DXC Technology's enterprise AI assistant platform. It provides intelligent assistance for Sales and HR teams through a modern, immersive interface that combines conversational AI with specialized business tools.

---

## What Does Trinity Do?

Trinity serves as an intelligent workspace where employees can:

- **Ask questions in natural language** — "Show me the top performers in Engineering" or "What's in my calendar this week?"
- **Access business data** — Sales pipeline, HR analytics, employee information, performance metrics
- **Collaborate in real-time** — Individual and group chat with AI assistance
- **Visualize insights** — Charts, tables, and dashboards generated from AI responses
- **Work visually** — An infinite canvas workspace for organizing information

The platform connects to multiple data sources through specialized AI tools, so users get accurate, up-to-date answers without needing to know where the data lives.

---

## How the System is Organized

Trinity has three main layers that work together:

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                │
│              (Browser — desktop or mobile)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                           │
│                                                             │
│   What users see and interact with:                         │
│   • Landing page with role-based features                   │
│   • AI chat interface                                       │
│   • Workspace canvas                                        │
│   • Group chat rooms                                        │
│                                                             │
│   Built with: React (runs in the browser)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                            │
│                                                             │
│   The "brain" that processes requests:                      │
│   • Receives user questions                                 │
│   • Talks to the AI model                                   │
│   • Calls the right business tools                          │
│   • Saves chat history                                      │
│   • Manages notifications                                   │
│                                                             │
│   Built with: Node.js / Express (runs on Azure)             │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐
│   AI MODEL   │  │   BUSINESS   │  │      DATA STORAGE    │
│              │  │    TOOLS     │  │                      │
│  Azure OpenAI│  │  (MCP Servers)│ │  Azure Cosmos DB     │
│  GPT-4.1 Mini│  │              │  │  (chat history,      │
│              │  │  HR Data     │  │   notifications,     │
│  Understands │  │  Sales Data  │  │   workspaces)        │
│  questions & │  │  Calendar    │  │                      │
│  generates   │  │  Email       │  │                      │
│  responses   │  │  Performance │  │                      │
└──────────────┘  └──────────────┘  └──────────────────────┘
```

---

## The Journey of a User Question

When someone asks Trinity a question, here's what happens behind the scenes:

### 1. User Types a Question
> "Show me employees in the London office with Python skills"

The user types their question in the chat interface. This could be in the main floating chat, a workspace, or a group chat.

### 2. Frontend Sends to Backend
The browser sends the question to the backend server, along with information about who's asking (their identity and role).

### 3. Backend Asks the AI
The backend sends the question to Azure OpenAI (the AI model). But it doesn't just send the question — it also tells the AI:
- What tools are available (employee search, calendar access, etc.)
- What role the user has (which determines what data they can access)
- The conversation history (so the AI understands context)

### 4. AI Decides What To Do
The AI reads the question and figures out:
- Does it need to look up data? → Call a tool
- Can it answer directly? → Generate a response

For our example, the AI recognizes it needs to search employee data, so it says: "I need to call the employee search tool with location=London and skills=Python"

### 5. Backend Calls the Right Tool
The backend takes the AI's instruction and calls the appropriate **MCP server** (more on these below). The HR Data server searches its database and returns matching employees.

### 6. AI Crafts the Response
The backend sends the tool results back to the AI. Now the AI has the actual data, so it writes a helpful response: "I found 23 employees in the London office with Python skills. Here's a breakdown by department..."

### 7. Response Streams to User
The response is sent back to the browser in real-time (streaming), so users see the answer appearing as the AI generates it — just like ChatGPT.

### 8. Conversation is Saved
The question and response are saved to the database, so users can pick up conversations later or reference past queries.

---

## Key Components Explained

### The Frontend (What Users See)

The frontend is a web application that runs in the browser. Key features include:

**HUD Interface** — The main landing page uses a "heads-up display" design with animated segments representing different features (Accounts, Pipeline, Performance, etc.). Users click to explore different areas.

**Floating Chat** — A chat window that can be opened from anywhere in the app. This is the primary way users interact with the AI.

**Dual-Frame Layout** — When exploring features, content appears in two panels: a left frame for summaries and a right frame for details. This keeps users oriented.

**Workspace Canvas** — An infinite canvas (like Miro or FigJam) where users can save AI responses, create notes, and organize information visually.

**Group Chat** — Real-time chat rooms where multiple users can collaborate, with AI assistance available to the whole group.

### The Backend (The Processing Engine)

The backend is a server that processes all requests. It handles:

**Request Routing** — When a request comes in, the backend figures out what kind of request it is (chat message, notification check, workspace save) and sends it to the right place.

**AI Orchestration** — The backend manages conversations with Azure OpenAI. It builds the context, sends requests, handles tool calls, and assembles final responses.

**Tool Coordination** — When the AI needs data, the backend calls the appropriate MCP servers and handles the responses.

**Data Persistence** — All chat history, notifications, workspaces, and user preferences are saved to Azure Cosmos DB.

**Real-Time Communication** — WebSocket connections keep the browser and server in sync for instant messaging and streaming responses.

### MCP Servers (The Business Tools)

**MCP (Model Context Protocol)** is how the AI connects to business data. Think of MCP servers as specialized assistants that each know how to do one thing really well:

| Server | What It Does |
|---|---|
| **HR Data** | Searches employee directory, org structure, locations |
| **HR Performance** | Retrieves performance ratings, trends, evaluations |
| **HR Strategic** | Analyzes workforce costs, skills, headcount |
| **Sales Accounts** | Looks up account information and contacts |
| **Sales Pipeline** | Shows deals, opportunities, and forecasts |
| **O365** | Accesses Outlook email, calendar, and contacts |

When a user asks a question, the AI figures out which tool(s) to use, and the backend coordinates the calls.

**Why MCP?** By separating tools into independent servers, each can be developed, updated, and scaled independently. It also means the AI can be taught to use new tools without changing the core platform.

### Azure OpenAI (The Intelligence)

Trinity uses **GPT-4.1 Mini** hosted on Azure OpenAI. This is the same family of models that powers ChatGPT, but running in DXC's Azure environment for security and compliance.

The AI model is responsible for:
- Understanding what users are asking
- Deciding which tools to call
- Interpreting data returned by tools
- Writing helpful, natural-language responses
- Generating charts and structured data when appropriate

### Azure Cosmos DB (The Memory)

Cosmos DB is a cloud database that stores everything Trinity needs to remember:

- **Chat History** — Every conversation, so users can continue where they left off
- **Notifications** — Alerts about completed background jobs or important updates
- **Workspaces** — Saved canvas layouts and content
- **Group Chats** — Room membership and message history
- **Configuration** — MCP server definitions and settings

---

## How Security Works

### Authentication
Users log in with their DXC corporate credentials through Microsoft Azure AD. Trinity never handles passwords directly — Microsoft's identity platform does all the authentication.

### Role-Based Access
Each user has one or more roles (Sales, HR, Admin) defined in Azure AD. These roles determine:
- Which features appear on the landing page
- Which MCP tools the AI can use on their behalf
- What data they can access through queries

For example, an HR user can ask about employee performance, but a Sales user cannot — the tools simply aren't available to them.

### Token Management
When users log in, they receive security tokens that prove their identity. These tokens are automatically refreshed in the background so users don't have to log in repeatedly.

---

## How Deployment Works

Trinity runs on Microsoft Azure as two containerized applications:

**Frontend Container** — Serves the web application (HTML, CSS, JavaScript). Uses Nginx as a lightweight web server.

**Backend Container** — Runs the Node.js server that processes all API requests and coordinates with external services.

Both containers run on Azure App Service, which handles scaling, load balancing, and availability.

### Environments

| Environment | Purpose | Who Uses It |
|---|---|---|
| Development | Building and testing new features | Developers |
| Integration | Testing before production | QA team |
| Production | Live system | All users |

Changes flow through these environments via automated CI/CD pipelines, ensuring code is tested before reaching production.

---

## Technology Summary

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 | User interface |
| Backend | Node.js / Express | Request processing |
| AI | Azure OpenAI (GPT-4.1) | Natural language understanding |
| Tools | MCP Protocol | Business data access |
| Database | Azure Cosmos DB | Data storage |
| Auth | Azure AD / MSAL | Identity management |
| Hosting | Azure App Service | Cloud infrastructure |
| Real-Time | WebSocket | Instant messaging |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Frontend](/docs/frontend) | How the user interface is organized |
| [Backend](/docs/backend) | How requests are processed |
| [AI & MCP](/docs/ai-and-mcp) | How the AI connects to business tools |
| [Authentication](/docs/authentication) | How login and security work |
| [Data Layer](/docs/data-layer) | How information is stored |
| [Real-Time](/docs/realtime) | How instant messaging works |
| [Deployment](/docs/deployment) | How the system is hosted |
