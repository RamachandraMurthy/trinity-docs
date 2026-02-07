---
sidebar_position: 1
title: Developer Setup Guide
description: Local development environment setup, environment variables, and running locally
---

# Trinity — Developer Setup Guide

> **Document Version:** 1.0  
> **Last Updated:** February 7, 2026  
> **Parent Document:** [High-Level Architecture](/docs/platform/high-level-architecture)

---

## Prerequisites

### Required Software

| Software | Version | Purpose |
|---|---|---|
| **Node.js** | 20 LTS | Runtime for frontend and backend |
| **npm** | 10+ | Package management |
| **Git** | Latest | Version control |

### Optional Software

| Software | Version | Purpose |
|---|---|---|
| **Docker** | Latest | Container builds and testing |
| **VS Code / Cursor** | Latest | Recommended IDE |
| **Python** | 3.11+ | RFP Advisor backend |
| **LibreOffice** | Latest | Document conversion (RFP Advisor) |

### Azure Resources (for full functionality)

| Resource | Purpose | Required? |
|---|---|---|
| Azure AD App Registration | Authentication | Yes |
| Azure Cosmos DB | Database | No (mock mode available) |
| Azure OpenAI | AI chat | For AI features |
| Azure Blob Storage | File storage | For digital twin, RFP documents |
| Azure Cognitive Services | Speech-to-text | For voice input |
| Azure AI Search | Document indexing | For RFP Advisor search |
| Google Gemini API | Agent execution | For WorkSphere Agents |

---

## Repository Setup

### Clone the Repository

```bash
git clone <repository-url>
cd webapp-trinity-dev-eus
```

### Project Structure

```
webapp-trinity-dev-eus/
├── package.json          # Frontend dependencies
├── src/                  # Frontend source code
├── public/               # Static assets
├── server/               # Backend source code
│   ├── package.json      # Backend dependencies
│   └── server.js         # Backend entry point
├── Dockerfile            # Frontend container
├── server/Dockerfile     # Backend container
└── docs/                 # Documentation
```

---

## Frontend Setup

### Install Dependencies

```bash
# From project root
npm install
```

### Configure Environment

Copy the environment template:

```bash
cp .env.template .env
```

Edit `.env` with your values (see [Environment Variables](#environment-variables) for details).

### Start Development Server

```bash
npm run dev
# or
npm start
```

The frontend starts at `http://localhost:5173` with hot module replacement.

### Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite` | Start dev server with HMR |
| `npm start` | `npm run dev` | Alias for dev |
| `npm run build` | `vite build` | Production build → `dist/` |
| `npm run preview` | `vite preview` | Preview production build |
| `npm run lint` | `eslint .` | Run ESLint |

---

## Backend Setup

### Install Dependencies

```bash
cd server
npm install
```

### Configure Environment

Copy the environment template:

```bash
cp .env.example .env
```

Edit `server/.env` with your values (see [Environment Variables](#environment-variables) for details).

### Start Development Server

```bash
# From server/ directory
npm run dev     # With auto-restart (nodemon)
# or
npm start       # Without auto-restart
```

The backend starts at `http://localhost:3001`.

### Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `nodemon server.js` | Dev server with auto-restart |
| `npm start` | `node server.js` | Production server |

---

## Environment Variables

### Frontend Environment Variables (`.env`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_MSAL_CLIENT_ID` | Yes | Azure AD Application ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `VITE_MSAL_TENANT_ID` | Yes | Azure AD Tenant ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `VITE_WEB_APP_URL` | Yes | App URL (trailing slash!) | `http://localhost:5173/` |
| `VITE_MSAL_DEFAULT_SCOPE` | Yes | API permission scope | `api://client-id/scope-name` |
| `VITE_MSAL_POWERBI_SCOPE` | No | PowerBI API scope | `https://analysis.windows.net/powerbi/api/.default` |
| `VITE_WEBSOCKET_URL` | No | WebSocket URL | `ws://localhost:3001/realtime` |
| `VITE_WEBSOCKET_RECONNECT_ATTEMPTS` | No | Reconnect retries | `5` |
| `VITE_WEBSOCKET_RECONNECT_DELAY` | No | Reconnect delay (ms) | `1000` |
| `VITE_AZURE_OPENAI_ENDPOINT` | No | Azure OpenAI URL | `https://your-resource.openai.azure.com` |
| `VITE_AZURE_OPENAI_API_KEY` | No | Azure OpenAI key | `your-api-key` |
| `VITE_AZURE_OPENAI_DEPLOYMENT_NAME` | No | OpenAI deployment | `gpt-4.1-mini` |
| `VITE_AZURE_OPENAI_API_VERSION` | No | OpenAI API version | `2024-02-15-preview` |

### Backend Environment Variables (`server/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `HTTP_PORT` | No | `3001` | Server port |
| `FRONTEND_URL` | No | `http://localhost:5173` | CORS origin |
| `COSMOS_DB_ENDPOINT` | No* | — | Cosmos DB endpoint |
| `COSMOS_DB_KEY` | No* | — | Cosmos DB access key |
| `COSMOS_DB_DATABASE` | No* | — | Database name |
| `COSMOS_DB_CONTAINER` | No* | `chathistory` | Chat container |
| `COSMOS_NOTIFICATION_CONTAINER` | No | `notifications` | Notification container |
| `COSMOS_DB_CONTAINER_CommonQuestions` | No | `commonquestions` | FAQ container |
| `COSMOS_DB_GROUP_DATABASE_NAME` | No | — | Group chat database |
| `COSMOS_DB_GROUP_CONTAINER_NAME` | No | `GroupChatHistory` | Group chat container |
| `WORKSPACE_COSMOS_DB_DATABASE` | No | `Workspace` | Workspace database |
| `WORKSPACE_COSMOS_DB_CONTAINER` | No | `workspaces` | Workspace container |
| `WORKSPACE_CHAT_HISTORY_CONTAINER` | No | — | Workspace chat container |
| `COSMOS_DB_CONTAINER_NAME_MCPServers` | No | `HRMCPServersworkspace` | MCP servers container |
| `AZURE_OPENAI_ENDPOINT` | No | — | Azure OpenAI URL |
| `AZURE_OPENAI_API_KEY` | No | — | Azure OpenAI key |
| `AZURE_OPENAI_DEPLOYMENT` | No | — | Deployment name |
| `AZURE_OPENAI_API_VERSION` | No | `2024-02-15-preview` | API version |
| `MCP_SERVER_SOURCE` | No | `file` | `file` or `cosmos` |
| `MCP_SERVERS_JSON_FILE` | No | `HR_Mcpservers.json` | MCP config file path |
| `SYSTEM_PROMPT_PATH` | No | `../hr_system_prompt.txt` | System prompt file |
| `JOB_TRACK_API_URL` | No | — | Job tracking API URL |
| `JOB_SCHEDULER_INTERVAL_MS` | No | `300000` | Scheduler interval (5 min) |
| `AZURE_STORAGE_CONNECTION_STRING` | No | — | Blob storage connection |
| `DIGITAL_TWIN_BLOB_CONTAINER` | No | — | Digital twin blob container |
| `SFDC_MCP_URL` | No | — | SFDC MCP server URL |

:::note
If Cosmos DB variables are not set, the backend runs in **mock mode** with sample data.
:::

---

## Running Locally

### Quick Start (Both Services)

**Terminal 1 — Backend:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 — Frontend:**
```bash
# From project root
npm install
npm run dev
```

### Access the Application

| URL | Service |
|---|---|
| `http://localhost:5173` | Frontend (Vite dev server) |
| `http://localhost:3001` | Backend API |
| `http://localhost:3001/api/health` | Backend health check |
| `http://localhost:3001/api` | API documentation |

### API Proxy

The Vite dev server proxies `/api` requests to the backend:

```
http://localhost:5173/api/* → http://localhost:3001/api/*
```

This is configured in `vite.config.js`:
```javascript
proxy: {
  '/api': 'http://localhost:3001'
}
```

### Mock Mode

If Cosmos DB is not configured, the backend automatically falls back to mock mode:
- Returns sample data for all queries
- Chat history, notifications, and common questions work with mock data
- Logged at startup: `Database Mode: MOCK`
- AI/MCP features may not work without OpenAI credentials

---

## Docker Setup

### Build Frontend Container

```bash
docker build -t trinity-frontend .
docker run -p 8080:8080 trinity-frontend
```

### Build Backend Container

```bash
cd server
docker build -t trinity-backend .
docker run -p 3001:3001 --env-file .env trinity-backend
```

### Access Containerized App

| URL | Service |
|---|---|
| `http://localhost:8080` | Frontend (Nginx) |
| `http://localhost:3001` | Backend (Express) |

---

## Development Workflow

### Branch Strategy

| Branch | Purpose | Deploys To |
|---|---|---|
| `dev` | Active development | Dev environments |
| `master` | Stable releases | Integration/Production |
| `v*.*.*` tags | Release versions | Production |

### Making Changes

```bash
# 1. Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/my-feature

# 2. Make changes
# ... edit files ...

# 3. Test locally
npm run dev      # Frontend
cd server && npm run dev  # Backend

# 4. Lint
npm run lint

# 5. Commit and push
git add .
git commit -m "feat: description of changes"
git push origin feature/my-feature

# 6. Create pull request to dev
```

### Key Directories to Know

| When working on... | Look at... |
|---|---|
| UI components | `src/components/` |
| State management | `src/contexts/` |
| API calls | `src/api/` and `src/services/` |
| Backend routes | `server/src/routes/` |
| Business logic | `server/src/services/` |
| Database operations | `server/src/services/databaseService.js` |
| AI/MCP | `server/src/services/workspaceChatService.js` |
| Auth config | `src/config/msalConfig.js` |
| Feature flags | `src/constants/features.js` |
| MCP servers | `HR_Mcpservers.json` |

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|---|---|
| **Login popup blocked** | Enable popups for `localhost:5173` |
| **CORS errors** | Check `FRONTEND_URL` in `server/.env` matches your dev URL |
| **"No valid roles"** | Add roles to your Azure AD App Registration and assign to user |
| **Mock mode active** | Set `COSMOS_DB_ENDPOINT` and `COSMOS_DB_KEY` in `server/.env` |
| **MCP tools not loading** | Check `MCP_SERVER_SOURCE` and `MCP_SERVERS_JSON_FILE` |
| **WebSocket connection failed** | Check `VITE_WEBSOCKET_URL` and backend WebSocket server |
| **Blank page after login** | Check `VITE_WEB_APP_URL` matches your dev URL (include trailing `/`) |
| **API 404 errors** | Ensure backend is running and Vite proxy is configured |
| **PowerBI errors** | Check `VITE_MSAL_POWERBI_SCOPE` is set correctly |

### Debug Logging

The application uses console logging with emoji prefixes:

| Prefix | Meaning |
|---|---|
| ✅ | Success |
| ❌ | Error |
| ⚠️ | Warning |
| 🔍 | Debug information |
| 🎬 | Animation/UI event |
| 🔧 | Configuration |
| 🚀 | Startup/initialization |
| 📊 | Data operation |

### Useful Debug URLs

| URL | Purpose |
|---|---|
| `http://localhost:3001/api` | API endpoint documentation |
| `http://localhost:3001/api/health` | Server health status |
| `http://localhost:5173/?testEmptyRole=true` | Simulate no roles |

---

## RFP Advisor Setup

The RFP Advisor runs as a separate service with its own frontend (Next.js) and backend (FastAPI).

### Backend Setup (Python/FastAPI)

```bash
# Clone the RFP Advisor repository
cd trinity-rfp-advisor

# Create Python virtual environment
python -m venv venv

# Activate environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Azure and Gemini credentials

# Start backend
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup (Next.js)

```bash
# From the frontend directory
cd frontend
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# Start frontend
npm run dev
```

### RFP Advisor Environment Variables

**Backend (`app/.env`):**

| Variable | Required | Description |
|---|---|---|
| `COSMOS_DB_ENDPOINT` | Yes | Azure Cosmos DB endpoint |
| `COSMOS_DB_KEY` | Yes | Cosmos DB access key |
| `COSMOS_DB_DATABASE_NAME` | Yes | Database name for RFP data |
| `AZURE_STORAGE_CONNECTION_STRING` | Yes | Blob storage for documents |
| `AZURE_SEARCH_ENDPOINT` | Yes | AI Search service endpoint |
| `AZURE_SEARCH_KEY` | Yes | AI Search admin key |
| `AZURE_OPENAI_ENDPOINT` | Yes | Azure OpenAI endpoint |
| `AZURE_OPENAI_API_KEY` | Yes | Azure OpenAI key |
| `GOOGLE_API_KEY` | Yes | Gemini API key for agents |
| `MSAL_CLIENT_ID` | Yes | Azure AD app client ID |
| `MSAL_TENANT_ID` | Yes | Azure AD tenant ID |

**Frontend (`frontend/.env.local`):**

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL |
| `NEXT_PUBLIC_MSAL_CLIENT_ID` | Yes | Azure AD app client ID |
| `NEXT_PUBLIC_MSAL_TENANT_ID` | Yes | Azure AD tenant ID |

### Access RFP Advisor

| URL | Service |
|---|---|
| `http://localhost:3000` | Frontend (Next.js) |
| `http://localhost:8000` | Backend API (FastAPI) |
| `http://localhost:8000/docs` | API documentation (Swagger) |
| `http://localhost:8000/api/healthz` | Health check |

---

## Related Documents

- [High-Level Architecture](/docs/platform/high-level-architecture)
- [Authentication & Security](/docs/authentication)
- [Deployment & DevOps](/docs/deployment)
- [RFP Advisor](/docs/rfp-advisor)
- [WorkSphere Agents](/docs/agents)
