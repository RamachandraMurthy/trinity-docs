---
sidebar_position: 3
title: Architecture Improvements
description: Suggested refactoring and improvements for SalesCoach architecture
---

# SalesCoach Architecture Improvements

This document outlines suggested improvements for the SalesCoach application architecture to enhance maintainability, scalability, and code quality.

## 1. Executive Summary

The current codebase contains several "god classes" and monolithic files that mix concerns (database access, business logic, external API calls). The project structure is flat, making navigation and separation of duties difficult. Refactoring these core components into smaller, specialized modules will significantly improve developer velocity and system stability.

## 2. Critical Refactoring Targets

### 2.1 `streamablemcpservers.py` (The "God File")

**Current State:** 
- Size: ~3200 lines, 170KB.
- Responsibilities: Defines tools, manages chat sessions, handles CosmosDB persistence (`SessionMemoryManager`), connects to MCP servers (`MCPServerConnection`), and orchestrates the AI logic (`MCP_ChatBot`).
- **Issues:** High coupling, difficult to test, hard to read.

**Recommendation:** Deconstruct this file into:
- `core/session_manager.py`: Pure logic for session handling.
- `persistence/cosmos_db.py`: Dedicated database layer.
- `mcp/client.py`: MCP connection management.
- `mcp/tools.py`: Tool definitions.
- `ai/chatbot.py`: Core AI orchestration logic.

### 2.2 `websocket_group_chat_service.py`

**Current State:**
- Size: ~1900 lines.
- Responsibilities: WebSocket handling, message parsing, table parsing, visualization detection.
- **Issues:** Duplicates logic from individual chat service; mixes protocol handling with message processing logic.

**Recommendation:** 
- Extract parsing logic (tables, visualizations) to `utils/parsers.py`.
- Move business logic to `services/group_chat_service.py`.
- Keep the WebSocket handler thin, responsible only for connection management and routing.

## 3. Project Structure Reorganization

**Current:** Flat structure with all files in root.

**Proposed:**

```text
SalesCoach/
├── app/
│   ├── api/                # API Endpoints / Routes
│   ├── core/               # Core business logic (AI orchestration)
│   ├── mcp/                # Model Context Protocol integrations
│   ├── persistence/        # Database access layers (CosmosDB)
│   ├── services/           # Application services (Chat, Group)
│   ├── utils/              # Helpers (Logging, Parsers)
│   └── main.py             # Entry point (formerly app.py)
├── config/                 # Configuration management (Pydantic models)
├── docs/                   # Documentation
├── tests/                  # Test suite
└── ...
```

## 4. Separation of Concerns

### 4.1 Persistence Layer

Move direct CosmosDB calls out of business logic classes. Create a "Repository Pattern" or dedicated Data Access Object (DAO) layer.

**Target:** `SessionMemoryManager` currently mixes in-memory caching with CosmosDB calls. Separate these.

### 4.2 Configuration Management

**Current:** Direct `os.environ.get()` calls scattered throughout files (e.g., `app.py`, `SessionMemoryManager`).

**Recommendation:** Implement a centralized `config.py` using `pydantic-settings`. This ensures type safety and a single source of truth for all environment variables (API keys, endpoints, timeouts).

## 5. Standardization

### Naming Conventions
- Rename `streamablemcpservers.py` to something descriptive like `ai_engine.py` or `core_engine.py`.
- Ensure consistent variable naming (camelCase vs snake_case).

### Error Handling
- Standardize error responses in API endpoints.
- Avoid "swallowing" exceptions where `logger.error` is called but execution continues in an undefined state.

## 6. Frontend/Backend Decoupling

- **Current:** `app.py` attempts to serve static files if present.
- **Recommendation:** Use a dedicated frontend server (e.g., Nginx, or cloud static hosting like Azure Static Web Apps) for production. Keep the Python backend strictly as an API (REST + WebSocket).

## 7. Centralized Model Configuration Management

**Priority:** Low  

**Issue:** LLM model names (e.g., `gpt-4.1-mini`, `gpt-4.1-mini-2`) are currently hardcoded in multiple places within `streamablemcpservers.py`. While `.env` provides a configuration mechanism, each repository manages its own `.env` file independently, leading to potential version drift across projects.

### Current Problems

1. **Hardcoded Models:** Despite `AZURE_OPENAI_CHAT_MODEL` existing in `.env.template`, the code has hardcoded model strings at lines 588, 1317, 1387, 1912, 2108, and 2208.
2. **Cross-Repository Inconsistency:** Multiple repositories using `.env` files independently can result in different model versions being used across projects.
3. **Documentation Mismatch:** `step4-process.md` references `gpt-4.0`, but actual code uses `gpt-4.1-mini` variants.

### Recommended Solutions

| Approach | Description | Effort |
|----------|-------------|--------|
| **Shared Config Service** | Central API/service that repositories query for approved model configurations. | High |
| **Git Submodule** | Shared config repo included as submodule in all projects. | Medium |
| **Azure App Configuration** | Use Azure App Configuration or similar cloud-based config store. | Medium |
| **Model Registry Pattern** | Create a `models.py` that defines all approved models in one place per repo. | Low |

### Immediate Action (Low Effort)

Refactor `streamablemcpservers.py` to read model names from environment variables:

```python
# In config.py
CHAT_MODEL = os.getenv("AZURE_OPENAI_CHAT_MODEL", "gpt-4.1-mini")
CHAT_MODEL_SECONDARY = os.getenv("AZURE_OPENAI_CHAT_MODEL_SECONDARY", "gpt-4.1-mini-2")
```

## 8. Next Steps

1. **Phase 1:** Create new directory structure and move files without changing logic (fix imports).
2. **Phase 2:** Implement `config.py` and replace `os.environ` calls.
3. **Phase 3:** Split `streamablemcpservers.py` into `models`, `persistence`, and `logic`.
4. **Phase 4:** Refactor `websocket_group_chat_service.py` utilities.
5. **Phase 5:** (Lower Priority) Evaluate centralized model configuration approach for cross-repository consistency.
