---
sidebar_position: 1
title: MCP Integration Layer
description: How Trinity reaches enterprise systems — MCP as the standard access layer between orchestration and data, with role-aware exposure and a single protocol for every connection
---

# MCP Integration Layer

The **MCP Integration Layer** is Trinity's standard access layer. **Every connection to enterprise data, tools, or actions goes through an MCP (Model Context Protocol) server.** There is no ad-hoc database code in the orchestration path, no direct SaaS API calls from agents, no shortcut routes around the protocol.

This layer sits between the [Orchestration Layer](/docs/backend) above and the [Enterprise Data Layer](/docs/data-layer) below. Its job is to make every external system reachable in a uniform, observable, governable way.

---

## Why MCP

Standardizing on one protocol for every external connection has four payoffs:

| Payoff | What It Means |
|---|---|
| **One protocol, many sources** | Adding a new system means writing an MCP server, not modifying the orchestrator |
| **Reusable connectors** | The same MCP that serves Sales chat can serve an agent run or a Daily Brief |
| **Clear separation** | The orchestrator never speaks Salesforce SOQL or Databricks SQL — that is the MCP server's job |
| **Governable access** | Every external call is observable and policy-checkable in one place |

Without MCP, the orchestrator would need to know how to query every enterprise system. With MCP, it speaks one protocol and lets each server handle its own data complexity.

---

## What's in This Layer

```
┌─────────────────────────────────────────────────────────────┐
│             MCP INTEGRATION LAYER                           │
│                                                             │
│   ┌─────────────────────┐  ┌─────────────────────────┐      │
│   │ INTERNAL MCP        │  │ EXTERNAL / SHARED MCP   │      │
│   │ SERVERS             │  │ SERVERS                 │      │
│   │                     │  │                         │      │
│   │ Trinity-owned       │  │ Office 365, partner-    │      │
│   │ servers exposing    │  │ hosted MCPs, third-     │      │
│   │ Sales, HR, and      │  │ party connectors        │      │
│   │ shared data         │  │                         │      │
│   └─────────────────────┘  └─────────────────────────┘      │
│                                                             │
│   ┌─────────────────────────────────────────────────┐       │
│   │ ROLE-BASED CONSOLE EXPOSURE                     │       │
│   │                                                 │       │
│   │ Each role (Sales, HR, etc.) sees a different    │       │
│   │ set of MCPs in the orchestrator's tool list     │       │
│   └─────────────────────────────────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Component | What It Does |
|---|---|
| **Internal MCP Servers** | Trinity-owned servers that expose Salesforce data, HR data, market intelligence, contracts, and more |
| **External / Shared MCP Servers** | Office 365 (calendar, email), partner-hosted MCPs, and third-party connectors wrapped in the same protocol |
| **Role-Based Console Exposure** | Each role gets a different set of MCPs visible to the orchestrator — Sales users do not see HR-only servers, and vice versa |

---

## Internal Servers — The Catalog

Trinity-owned MCP servers, grouped by primary audience.

### Sales Servers

| Server | What It Provides |
|---|---|
| [SFDC UDP](/docs/mcp-servers/sfdc-udp) | Accounts, opportunities, contracts, account plans, and pipeline data from Salesforce via Databricks |
| [Account Directory](/docs/mcp-servers/account-directory) | CRM account contacts, roles, and regional assignments |
| [Campaign](/docs/mcp-servers/campaign) | Salesforce campaign data and campaign-to-opportunity links |
| [Client Reference](/docs/mcp-servers/client-reference) | Client reference profiles, case studies, and reference materials |
| [Opportunity Win/Loss](/docs/mcp-servers/opp-win-loss) | Historical win/loss data and analysis |
| [Win Prediction Service](/docs/mcp-servers/win-prediction-service) | ML-based win probability scoring for open opportunities |
| [Market Intelligence](/docs/mcp-servers/market-intelligence) | External IT spend and vendor contract data |
| [Auxilium](/docs/mcp-servers/auxilium) | Past proposals, battlecards, and sales materials via RAG search |
| [Contracts & Legal](/docs/mcp-servers/contracts-legal) | Legal contract details, opportunity summaries, and contract filtering |

### HR Servers

| Server | What It Provides |
|---|---|
| [HR Employee Data](/docs/mcp-servers/hr-employee-data) | Employee directory, organization structure, locations, and staffing data |

### Shared Servers

| Server | What It Provides |
|---|---|
| [O365](/docs/mcp-servers/o365) | Microsoft 365 calendar events and external meeting detection |
| [Azure App URL](/docs/mcp-servers/azure-app-url) | Quick-launch links to external apps and job submission entry points |

The platform's MCP server catalog grows over time as new data domains are wrapped — without changing the orchestrator or the surfaces.

---

## Role-Based Exposure

The same orchestrator instance serves Sales and HR users — but each role sees a different set of MCPs. Role-aware exposure happens at session start:

| Step | What Happens |
|---|---|
| User connects | The orchestrator reads role from the JWT |
| Server filtering | Only MCP servers the role is allowed to use are registered as tools |
| Tool list | The model sees only its allowed tools — there is nothing to bypass |

This is structural, not a check at the door. A Sales user's session never holds an HR-only tool reference. The same is true the other way.

For the access model, see [Authentication & Security](/docs/authentication).

---

## How a Tool Call Flows

Once an MCP is exposed in the session's tool list, calling it follows the standard pattern:

```
ORCHESTRATOR              MCP SERVER              ENTERPRISE SYSTEM
     │                         │                          │
     │── tool call ───────────▶│                          │
     │                         │── query ────────────────▶│
     │                         │                          │
     │                         │◀──── results ────────────│
     │◀── structured result ───│                          │
     │                         │                          │
   (synthesis)
```

The MCP server speaks the system's native language (SQL, REST, GraphQL, etc.). The orchestrator only ever speaks MCP.

For the full request lifecycle this fits into, see [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle).

---

## Internal vs. External — Why the Distinction Matters

Both kinds of MCP server look the same to the orchestrator. The distinction matters for **operational** reasons:

| Aspect | Internal | External / Shared |
|---|---|---|
| **Owned by** | Trinity team | Microsoft / partner / third party |
| **Hosted at** | Azure infrastructure | Microsoft Graph, partner clouds |
| **Updates and breaks** | Trinity-controlled | Subject to external vendor cadence |
| **Schema control** | Trinity-defined | Vendor-defined |
| **Resource expectations** | Tunable | Subject to vendor SLAs |

Both are equally trusted from a protocol perspective — but the operational profile differs, which matters when reasoning about reliability and rollout.

---

## Cross-Cutting Controls

Every MCP call is observed by the control plane:

| Control | What It Captures |
|---|---|
| **Trinity Guardian** | MCP availability, response health, prompt-injection patterns in tool inputs |
| **Guardrails / Rules** | Pre-call and post-result policy enforcement |
| **Wiz** | Cloud security posture for the underlying MCP server hosts |
| **Dynatrace** | Per-call latency, error rates, throughput |

For the control plane in detail, see [Governance & Operations](/docs/authentication).

---

## How This Layer Connects to Others

| Layer | Connection |
|---|---|
| **Orchestration Layer** | Calls MCP servers as tools during a session |
| **Agent & Execution Layer** | Agents reach data through the same MCP servers as chat — same role gates apply |
| **Enterprise Data Layer** | MCP servers query Databricks, Cosmos DB, Microsoft Graph, and other enterprise systems |
| **Control Plane** | Observes every call; policies apply pre-call and post-result |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Reference Architecture](/docs/platform/reference-architecture) | Where this layer sits in the five-layer model |
| [Orchestration Layer](/docs/backend) | The layer that calls MCP servers as tools |
| [Agent & Execution Layer](/docs/agents) | How agents reach data through MCPs |
| [Enterprise Data Layer](/docs/data-layer) | The actual data systems MCPs reach into |
| [Authentication & Security](/docs/authentication) | Role-based access and the control plane |
| [SFDC UDP](/docs/mcp-servers/sfdc-udp) | The flagship internal MCP server |
