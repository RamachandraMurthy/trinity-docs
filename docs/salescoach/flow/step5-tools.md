---
sidebar_position: 5
title: "Step 5: Tool Execution"
description: MCP tool discovery and execution in SalesCoach
---

# Step 5: Tool Execution & MCP Integration

When the AI (Step 4) determines it needs external data to answer a query, it invokes the **Model Context Protocol (MCP)** integration. This step handles the discovery, routing, and execution of tools across distributed servers.

## Overview

SalesCoach uses a distributed architecture where "skills" are hosted as separate microservices called **MCP Servers**. The main application acts as an **MCP Client**, aggregating these tools and presenting them to the AI.

**Key Goals:**
- Discover available tools from configured servers.
- Route tool calls to the correct server.
- Handle authentication (Entra ID) and context propagation.
- Execute tools securely with timeouts and retries.

---

## Tool Registry & Discovery (`FetchMCPServers.py`)

The application maintains a registry of all available MCP servers. This registry is the "Source of Truth" used in Step 4 to build the AI's context.

**Discovery Sources (Priority Order):**
1. **Azure CosmosDB:** The primary source for dynamic, environment-specific server lists.
2. **JSON File (`mcpservers.json`):** The local fallback for development or offline use.
3. **Environment Variables:** Runtime overrides via `MCP_SERVER_SOURCE`.

### Server Configuration

Each server entry defines its endpoint and access control:

```json
{
  "Name": "SFDC",
  "Url": "https://webapp-sfdcudpmcpserver-dev-eus.azurewebsites.net/mcp",
  "roles": "Admin,Sales",
  "AuthEnabled": false
}
```

- **Roles:** Used in Step 2 to filter which users can see tools from this server.
- **AuthEnabled:** If `true`, the backend acquires an Entra ID token for the server.

---

## Execution Logic (`streamablemcpservers.py`)

When the LLM requests a tool execution (e.g., `get_account_details(name="Microsoft")`), the `MCPServerConnection` class handles the request.

### 1. Connection Management

- **Lazy Loading:** Connections to MCP servers are often established on-demand or kept alive with keep-alives.
- **Isolation:** Each server has its own connection manager to prevent one failing server from bringing down the whole system.

### 2. Context Propagation

To ensure the tool knows *who* is asking, the backend injects headers into the HTTP request:

- `Authorization`: Bearer token (if `AuthEnabled`).
- `X-User-Email`: The authenticated user's email.
- `X-User-Region`: User's region (if available).

### 3. Reliability Features

The `call_tool_with_timeout_and_retry` method ensures robustness:

- **Timeout:** 300 seconds (5 minutes) limit for tool execution.
- **Retries:** Automatic retry (max 2 attempts) for network glitches or server-side 500 errors.
- **Token Refresh:** Auto-refreshes expired 401 tokens and retries.

---

## Available MCP Servers

For detailed documentation on each MCP server — including data sources, capabilities, and example queries — see the [MCP Servers](/docs/mcp-servers) section. The most commonly used servers include:

- [SFDC UDP](/docs/mcp-servers/sfdc-udp) — Salesforce accounts, opportunities, and pipeline data
- [HR Employee Data](/docs/mcp-servers/hr-employee-data) — Employee directory and organizational structure
- [O365](/docs/mcp-servers/o365) — Microsoft 365 calendar for external meeting detection
- [Win/Loss Prediction](/docs/mcp-servers/opp-win-loss) — ML-based win probability scoring
