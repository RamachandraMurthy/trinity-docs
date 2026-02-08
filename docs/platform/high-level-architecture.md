---
sidebar_position: 1
title: Platform Overview
description: How Trinity (WorkSphere) works — system architecture and key components
---

# Trinity Platform Overview

> **Production Brand:** WorkSphere — [worksphere.dxc.ai](https://worksphere.dxc.ai)

Trinity is DXC Technology's enterprise AI assistant platform. It provides intelligent assistance for Sales and HR teams through a modern, immersive interface that combines conversational AI with specialized business tools. The platform also powers **RFP Advisor** for proposal analysis and includes **WorkSphere Agents** — autonomous AI agents that perform complex, multi-step analysis tasks.

---

## What Does Trinity Do?

Trinity serves as an intelligent workspace where employees can:

- **Ask questions in natural language** — "Show me the top performers in Engineering" or "What's in my calendar this week?"
- **Access business data** — Sales pipeline, HR analytics, employee information, performance metrics
- **Collaborate in real-time** — Individual and group chat with AI assistance
- **Visualize insights** — Charts, tables, and dashboards generated from AI responses
- **Work visually** — An infinite canvas workspace for organizing information
- **Analyze RFP documents** — Upload proposals, extract requirements, and identify compliance gaps
- **Run AI-powered agents** — Execute specialized agents for deal qualification, win probability, competitive analysis, and more

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
│   • Landing page with role-based features (HUD interface)   │
│   • AI chat interface with real-time streaming              │
│   • Workspace canvas for visual organization                │
│   • Group chat rooms for team collaboration                 │
│   • Voice input and real-time WebSocket communication       │
│                                                             │
│   Built with: React / Next.js (runs in the browser)         │
│   See: Frontend, Real-Time & WebSocket                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                            │
│                                                             │
│   Main Backend (Node.js/Express):                           │
│   • Request routing and business logic                      │
│   • Chat, notifications, workspaces services                │
│                                                             │
│   Orchestration Engine (SalesCoach - Python/aiohttp):       │
│   • Real-time AI conversation flow                          │
│   • MCP tool coordination                                   │
│   • WebSocket streaming                                     │
│                                                             │
│   RFP Advisor Backend (Python/FastAPI):                     │
│   • Document processing and search                          │
│   • WorkSphere Agents (Google ADK)                          │
│                                                             │
│   See: Backend, Orchestration (SalesCoach)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐
│   AI MODELS  │  │  MCP SERVERS │  │      DATA STORAGE    │
│              │  │              │  │                      │
│  Azure OpenAI│  │  HR Data     │  │  Azure Cosmos DB     │
│  GPT-4.1 Mini│  │  Sales Data  │  │  (chat, workspaces,  │
│  (Chat)      │  │  Calendar    │  │   notifications)     │
│              │  │  Email       │  │                      │
│  Google      │  │  Performance │  │  Azure Blob Storage  │
│  Gemini      │  │  RFP Tools   │  │  (documents, reports)│
│  (Agents)    │  │              │  │                      │
│              │  │  15+ servers │  │                      │
│  See: AI &   │  │  See: MCP    │  │  See: Data Layer     │
│  Models      │  │  Servers     │  │                      │
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
The backend takes the AI's instruction and calls the appropriate MCP server. The HR Data server searches its database and returns matching employees.

### 6. AI Crafts the Response
The backend sends the tool results back to the AI. Now the AI has the actual data, so it writes a helpful response: "I found 23 employees in the London office with Python skills. Here's a breakdown by department..."

### 7. Response Streams to User
The response is sent back to the browser in real-time (streaming), so users see the answer appearing as the AI generates it — just like ChatGPT.

### 8. Conversation is Saved
The question and response are saved to the database, so users can pick up conversations later or reference past queries.

---

## Key Components

### Frontend
The web application that runs in the browser, featuring a HUD-style landing page, floating chat, workspace canvas, and group chat rooms. Includes real-time communication for voice input and streaming responses.

→ [Frontend Documentation](/docs/frontend)

### Backend & Orchestration
The processing engine that routes requests, coordinates with AI and MCP servers, and manages data. Includes the SalesCoach orchestration engine for real-time AI conversation flow.

→ [Backend Documentation](/docs/backend)

### AI & Models
Two AI models power Trinity: Azure OpenAI (GPT-4.1 Mini) for real-time chat, and Google Gemini for WorkSphere Agents. The AI understands questions, calls tools, and generates responses.

→ [AI & Models Documentation](/docs/ai-and-mcp)

### MCP Servers
15+ specialized services that connect the AI to business data: HR information, sales pipelines, calendars, email, RFP documents, and more. Each server handles one data domain.

→ [MCP Servers Documentation](/docs/mcp-servers)

### WorkSphere Agents
Autonomous AI agents that perform complex, multi-step analysis. Two categories: **Special Agents** for sales analysis (no setup required), and **RFP Agents** for proposal analysis (requires project setup with uploaded documents).

→ [WorkSphere Agents Documentation](/docs/agents)

### Security & Authentication
Users log in with DXC corporate credentials through Microsoft Azure AD. Role-based access controls which features and data each user can access.

→ [Authentication Documentation](/docs/authentication)

### Data Layer
Azure Cosmos DB stores chat history, workspaces, notifications, and configuration. Azure Blob Storage holds documents and reports.

→ [Data Layer Documentation](/docs/data-layer)

### Deployment
Containerized applications running on Azure App Service, with CI/CD pipelines managing development, integration, and production environments.

→ [Deployment Documentation](/docs/deployment)

---

## Technology Summary

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19, Next.js 15 | User interface |
| Main Backend | Node.js / Express | Chat, notifications, workspaces |
| Orchestration | Python / aiohttp | Real-time AI conversation flow |
| RFP Backend | Python / FastAPI | Document processing, agents |
| AI (Chat) | Azure OpenAI (GPT-4.1) | Natural language understanding |
| AI (Agents) | Google Gemini (ADK) | Multi-step reasoning and analysis |
| Tools | MCP Protocol | Business data access |
| Database | Azure Cosmos DB | Data storage |
| File Storage | Azure Blob Storage | Documents and reports |
| Search | Azure AI Search | Vector and semantic search |
| Auth | Azure AD / MSAL | Identity management |
| Hosting | Azure App Service | Cloud infrastructure |
| Real-Time | WebSocket | Instant messaging |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Frontend](/docs/frontend) | How the user interface is organized |
| [Backend](/docs/backend) | How requests are processed and orchestrated |
| [AI & Models](/docs/ai-and-mcp) | How the AI models work |
| [MCP Servers](/docs/mcp-servers) | Available business data connectors |
| [WorkSphere Agents](/docs/agents) | How autonomous AI agents work |
| [Authentication](/docs/authentication) | How login and security work |
| [Data Layer](/docs/data-layer) | How information is stored |
| [Deployment](/docs/deployment) | How the system is hosted |
