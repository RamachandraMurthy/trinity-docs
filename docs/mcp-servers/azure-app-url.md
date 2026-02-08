---
sidebar_position: 2
title: Azure App URL Server
description: MCP server that provides quick-launch links to external applications like SFDC and DXC Pitch, and submits AI-powered market intelligence jobs
---

# Azure App URL MCP Server

## Overview

The **Azure App URL MCP Server** is a Model Context Protocol (MCP) server that gives Trinity users quick access to external applications — like SFDC, Loopio (DXC Pitch), and others — without needing to remember individual URLs. It acts as a central directory: when a user asks for an external application, the AI retrieves the link from a registry and opens it in a new browser tab.

Beyond simple URL lookups, this server also serves as a gateway to DXC's **Market Intelligence** platform. Users can ask Trinity to kick off AI-powered research jobs — such as client profile analysis, competitive intelligence reports, strategy plans, and market research — directly from the conversation. Each job returns a tracking ID and an application link so the user can follow the progress in the corresponding web application.

This is a simple, useful feature in Trinity: one place to find and launch external tools, and one place to start market intelligence work — all without leaving the conversation.

---

## What Data It Provides

The server connects to two data sources:

| Data Source | What It Contains |
|-------------|------------------|
| **Application Registry** | A catalog of application names and their URLs, stored in an Azure SQL database — the central lookup point for launching external apps |
| **Market Intelligence API** | An external AI-powered platform that produces client profiles, competitive intelligence reports, client strategy plans, and market research analyses |

---

## Data Model

The server draws from an application registry in Azure SQL and communicates with an external Market Intelligence API. The registry is a single table; the API is a separate service:

```
    ┌─────────────────────────────────────────────────────────────┐
    │                     AZURE SQL DATABASE                      │
    │                                                             │
    │   ┌─────────────────────────────────────────────────────┐   │
    │   │               APPLICATION REGISTRY                  │   │
    │   ├─────────────────────────────────────────────────────┤   │
    │   │  • Application Name   (unique identifier)           │   │
    │   │  • URL                (launch link)                  │   │
    │   └─────────────────────────────────────────────────────┘   │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘

                              │
              Used by the MCP server to resolve
              application names to launchable URLs
                              │
                              ▼

    ┌─────────────────────────────────────────────────────────────┐
    │              AZURE APP URL MCP SERVER                       │
    │                                                             │
    │   Looks up URLs from the registry and submits               │
    │   analysis jobs to the Market Intelligence API,             │
    │   then combines results (job ID + app URL)                  │
    └─────────────────────────────────────────────────────────────┘

                              │
              Submits analysis jobs and retrieves
              results from the external platform
                              │
                              ▼

    ┌─────────────────────────────────────────────────────────────┐
    │              MARKET INTELLIGENCE API                        │
    ├─────────────────────────────────────────────────────────────┤
    │  • Client Profile Analysis                                  │
    │  • Competitive Intelligence Reports                         │
    │  • Client Strategy Plans                                    │
    │  • Market Research Studies                                   │
    │  • Job Status Tracking                                      │
    └─────────────────────────────────────────────────────────────┘
```

When the AI needs to launch an app or start a market intelligence job, the MCP server queries the registry for the appropriate URL and, for intelligence jobs, coordinates with the Market Intelligence API to submit the request and return a combined response.

---

## How It Works

There are two main flows through this server: launching an application and submitting a market intelligence job.

**Flow 1 — Application URL Lookup**

When a user asks to open an external application, the request flows like this:

```
    ┌──────────┐
    │   USER   │
    └────┬─────┘
         │ "Open SFDC for me"
         ▼
    ┌──────────┐
    │    AI    │  Understands the request, determines
    └────┬─────┘  it needs an application link
         │
         ▼
    ┌──────────┐
    │ BACKEND  │  Routes the request to the appropriate
    └────┬─────┘  MCP server
         │
         ▼
    ┌─────────────────────────────┐
    │  AZURE APP URL             │  Receives the application name,
    │  MCP SERVER                │  queries the registry
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────────┐
    │  AZURE SQL   │  Application registry containing
    │  DATABASE    │  names and URLs
    └────┬─────────┘
         │
         │ Returns the matching URL
         ▼
    ┌─────────────────────────────┐
    │  AZURE APP URL             │  Packages the URL as a
    │  MCP SERVER                │  structured response
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────┐
    │    AI    │  Presents the link to the user
    └────┬─────┘
         │
         ▼
    ┌──────────┐
    │   USER   │  Clicks the link — a new browser
    └──────────┘  tab opens to the application
```

**Flow 2 — Market Intelligence Job**

When a user asks for client research, competitive analysis, strategy planning, or market research, the flow adds an external API call:

```
    ┌──────────┐
    │   USER   │
    └────┬─────┘
         │ "Research Microsoft for me"
         ▼
    ┌──────────┐
    │    AI    │  Determines the user needs a
    └────┬─────┘  market intelligence analysis
         │
         ▼
    ┌──────────┐
    │ BACKEND  │  Routes the request to the
    └────┬─────┘  MCP server
         │
         ▼
    ┌─────────────────────────────┐
    │  AZURE APP URL             │  1. Creates a session with the
    │  MCP SERVER                │     Market Intelligence API
    └────┬────────────────────────┘  2. Submits the analysis job
         │                           3. Looks up the app URL from
         │                              the registry
         │
         ├────────────────────────────────────┐
         │                                    │
         ▼                                    ▼
    ┌──────────────────┐         ┌──────────────────┐
    │  MARKET          │         │  AZURE SQL       │
    │  INTELLIGENCE    │         │  DATABASE        │
    │  API             │         │  (Registry)      │
    └────┬─────────────┘         └────┬─────────────┘
         │                            │
         │ Returns job ID             │ Returns app URL
         │                            │
         ▼                            ▼
    ┌─────────────────────────────┐
    │  AZURE APP URL             │  Combines the job ID and app
    │  MCP SERVER                │  URL into a single response
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────┐
    │    AI    │  Presents the job ID and a link
    └────┬─────┘  to track progress
         │
         ▼
    ┌──────────┐
    │   USER   │  Clicks the link — opens the web
    └──────────┘  app to view results when ready
```

---

## Capabilities

The server provides seven main capabilities:

| Capability | What It Does |
|------------|--------------|
| **Application URL lookup** | Retrieves the direct URL for a named application so the user can open it in a new browser tab |
| **List available applications** | Shows all registered application names the user can launch |
| **Client profile analysis** | Submits an AI-powered job to research a company's background, financials, market position, and leadership |
| **Competitive intelligence report** | Submits an AI-powered job comparing DXC Technology against a named competitor, including strengths, weaknesses, and battle card messaging |
| **Client strategy planning** | Submits an AI-powered job to develop a strategic account plan for a specific client, covering growth opportunities and engagement strategies |
| **Market research analysis** | Submits an AI-powered job for comprehensive market research across a client's industry and geography |
| **Job status tracking** | Checks the progress of any previously submitted analysis job and retrieves the full results when complete |

The application URL lookup and list are the simplest and most commonly used. They allow the AI to answer questions like "Open DXC Pitch" or "What apps can I launch?" by querying the registry. The market intelligence capabilities handle longer-running research tasks, returning a job ID and a link for the user to follow up.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [Market Intelligence Server](/docs/mcp-servers/market-intelligence) | External spend data and vendor contracts from IDC/HDInsights |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
