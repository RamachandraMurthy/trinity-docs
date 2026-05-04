---
sidebar_position: 1
title: Enterprise Data Layer
description: The systems of record Trinity reads from and writes to — Databricks UDP, Cosmos DB, Power BI, Azure Cognitive Search, Office 365, Account Directory
---

# Enterprise Data Layer

The **Enterprise Data Layer** is the bottom of the [Reference Architecture](/docs/platform/reference-architecture). It is where the actual systems of record live — the databases, indexes, and SaaS platforms that Trinity reads from and, in some cases, writes to.

Trinity does not access these systems directly. **Every connection goes through an [MCP server](/docs/mcp-servers)** — that's the architectural rule. The Enterprise Data Layer page describes the systems themselves: what they hold, what role they play, and how Trinity uses them.

---

## The Systems

| System | Role | What It Holds |
|---|---|---|
| **Databricks UDP** | Primary analytics data store | Salesforce data (campaigns, opportunities, accounts), client-reference data, win/loss data |
| **Power BI** | Reporting and performance insights | Dashboards, metrics, performance reports |
| **Azure Cognitive Search / Index** | Document search and indexing | RFP documents, knowledge content, vector indexes |
| **Office 365** | Productivity systems | Outlook (email), calendar |
| **Account Directory** | People and account lookups | Users, accounts, regional assignments |
| **Cosmos DB** | Trinity's own persistence | Chat history, workspaces, agent runs, personal memory, security events |

Two of these — Databricks UDP and Cosmos DB — anchor most of the platform's data. The others are equally important but smaller in scope.

---

## Databricks UDP

The **Unified Data Platform** is the analytics layer for sales and revenue data. It is where Salesforce, win/loss, and client data are aggregated and made queryable.

| Used By | What It Provides |
|---|---|
| SFDC UDP MCP | Accounts, opportunities, account plans, pipeline |
| Campaign MCP | Campaign data and campaign-to-opportunity links |
| Opportunity Win/Loss MCP | Historical outcome data |
| Client Reference MCP | Reference profiles and case studies |
| Win Prediction Service | Historical features for ML scoring |
| Daily Recap | Pipeline change detection |

Databricks is reached only through MCPs — the orchestrator never speaks Databricks SQL.

---

## Cosmos DB

Trinity's own database. It holds the platform's operational state.

| Container | What It Holds |
|---|---|
| **Sessions** | Chat history per user — every conversation, every message |
| **Workspaces** | AI Canvas state, participants, shared activity |
| **Runs** | Agent run records — inputs, status, outputs, telemetry |
| **Notifications** | User notifications and read state |
| **Personal Memory** | Per-user preferences, patterns, notes |
| **Security Events** | Unified store of policy denials, prompt-guard hits, unusual access patterns |
| **Configuration** | Platform-level settings and metadata |

Cosmos DB is not just a Trinity-specific cache — it is the system of record for everything Trinity itself produces. When a user returns to a conversation or a workspace, this is what they're reading from.

| Property | Why |
|---|---|
| Document-oriented | Flexible schemas suit chat and run records |
| Globally distributed | Low-latency reads across regions |
| Multi-container | Each domain (sessions, runs, etc.) is isolated |

---

## Power BI

Reporting and dashboarding. Power BI is connected for performance and insights surfaces that pre-render or stream complex visualizations beyond what's worth generating from chat.

| Used For | Detail |
|---|---|
| Pre-built reports | Performance dashboards delivered as reports |
| Performance insights | Metrics that benefit from Power BI's visualization layer |

Power BI is reached through MCPs where applicable, or rendered as embedded surfaces.

---

## Azure Cognitive Search / Index

Search infrastructure for documents and knowledge content. Used heavily by the RFP workflow.

| Used For | Detail |
|---|---|
| RFP document indexing | Full-text and semantic search across uploaded RFP documents |
| Knowledge content | Battle cards, past proposals (Auxilium MCP) |
| Vector search | Semantic retrieval where text matching alone is too weak |

The orchestrator and agents do not query Search directly — they go through the relevant MCP server.

---

## Office 365

Microsoft 365 productivity systems.

| Used For | Detail |
|---|---|
| Calendar | Today's meetings, external attendees (used by Daily Recap and chat) |
| Email | Outlook integration for the Email Sharing feature |

O365 is reached through the O365 MCP server, which uses Microsoft Graph internally. From the orchestrator's perspective, it is just another MCP.

---

## Account Directory

The platform's directory of people and accounts.

| Used For | Detail |
|---|---|
| User lookups | Resolving users by name or email |
| Account lookups | Resolving accounts and the people on them |
| Regional assignments | Driving region-based filtering in Daily Recap and elsewhere |

Account Directory is reached through its dedicated MCP server.

---

## How Data Flows Across the Layer

```
ORCHESTRATOR / AGENTS
        │
        │  (every call goes through MCP)
        ▼
   MCP SERVERS
        │
        │  (each MCP knows how to query its system)
        ▼
ENTERPRISE DATA LAYER
   Databricks UDP · Cosmos DB · Power BI ·
   Azure Cognitive Search · Office 365 ·
   Account Directory
```

Two important properties:

1. **Trinity's Cosmos DB is in this layer too.** Even though Trinity owns it, conceptually it is just one more system of record — written to and read from like the others.
2. **No system is reached without an MCP wrapper.** This is the rule that keeps integration uniform and observable.

---

## What Lives Where (Quick Reference)

| If You're Looking For... | Live In |
|---|---|
| Chat history | Cosmos DB |
| AI Canvas project state | Cosmos DB |
| Agent run records | Cosmos DB |
| Personal Memory | Filesystem (per-user CLAUDE.md), with audit trail in Cosmos DB |
| Security events | Cosmos DB |
| Salesforce-derived data | Databricks UDP (via SFDC UDP MCP) |
| RFP document content | Azure Cognitive Search + blob storage |
| Calendar / email | Office 365 |
| User and account directory | Account Directory |
| Performance reports | Power BI |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Reference Architecture](/docs/platform/reference-architecture) | The five layers; this is the bottom one |
| [MCP Integration Layer](/docs/mcp-servers) | The standard access layer that wraps every system here |
| [SFDC UDP](/docs/mcp-servers/sfdc-udp) | The MCP that fronts most Databricks data |
| [O365](/docs/mcp-servers/o365) | The MCP that fronts Office 365 |
| [Account Directory](/docs/mcp-servers/account-directory) | The MCP that fronts the directory |
| [Authentication, Security & Governance](/docs/authentication) | The control plane that observes data access |
