---
sidebar_position: 1
title: HR Employee Data Server
description: MCP server built by the HR team to identify resource availability and support staffing decisions through Worksphere
---

# HR Employee Data MCP Server

## Overview

The **HR Employee Data MCP Server** is a Model Context Protocol (MCP) server built by the HR team to help identify resource availability across the organization. It provides the AI with access to non-confidential employee information — allowing users to search for people by skill area, location, job level, or organizational unit, and quickly determine who is available for a given request or engagement.

This server is connected to **Worksphere** through the Trinity platform, so users can ask staffing and resource questions directly from the Worksphere interface. When combined with account data from other MCP servers, it also enables the AI to identify which resources are currently working on a specific client account — making it a key tool for staffing decisions, resource planning, and account team visibility.

For example, a user in Worksphere might ask "Who are the available engineers in India?" or "Which resources are assigned to the Acme Corp account?", and the AI will use this server (potentially alongside account data) to assemble the answer.

---

## What Data It Provides

The server connects to a single employee dataset containing non-confidential HR records:

| Dataset | What It Contains |
|---------|------------------|
| **Employee Records** | Core employee details — names, email addresses, job titles, job levels, hire dates, and employment status |
| **Location Data** | Work location information including country and city for each employee |
| **Organizational Hierarchy** | Five levels of organizational unit assignments (levels 2 through 6), each with a unit description and unit chief |
| **Management Chain** | Manager email addresses linking employees to their direct managers |

---

## Data Model

The dataset is a flat employee record with embedded organizational hierarchy. Each employee has personal details, location information, and placement within up to five levels of the org structure:

```
    ┌──────────────────────────────────────────────────────────────┐
    │                      EMPLOYEE RECORD                        │
    ├──────────────────────────────────────────────────────────────┤
    │                                                              │
    │  Identity             Location            Employment         │
    │  ────────             ────────            ──────────         │
    │  • Employee ID        • Country           • Employee Type    │
    │  • Name               • City              • Status           │
    │  • Short Name                             • Hire Date        │
    │  • Email                                  • Job Title        │
    │                                           • Job Level        │
    │                                           • Manager Email    │
    │                                                              │
    ├──────────────────────────────────────────────────────────────┤
    │                                                              │
    │  Organizational Hierarchy (5 levels)                         │
    │  ──────────────────────────────────                          │
    │                                                              │
    │  Level 2:  Unit Description  ←→  Unit Chief                  │
    │     │                                                        │
    │     ▼                                                        │
    │  Level 3:  Unit Description  ←→  Unit Chief                  │
    │     │                                                        │
    │     ▼                                                        │
    │  Level 4:  Unit Description  ←→  Unit Chief                  │
    │     │                                                        │
    │     ▼                                                        │
    │  Level 5:  Unit Description  ←→  Unit Chief                  │
    │     │                                                        │
    │     ▼                                                        │
    │  Level 6:  Unit Description  ←→  Unit Chief                  │
    │                                                              │
    └──────────────────────────────────────────────────────────────┘
```

Each employee record contains all of this information in a single row. The organizational hierarchy is embedded — meaning each employee carries their full chain of org unit assignments from the broadest division (level 2) down to the most specific team (level 6).

---

## How It Works

When a user asks a resource availability question in Worksphere, the request flows through the system like this:

```
    ┌─────────────┐
    │  WORKSPHERE  │
    └──────┬──────┘
           │ "Who are the available engineers in India?"
           ▼
    ┌──────────┐
    │    AI    │  Understands the question, determines
    └────┬─────┘  it needs employee data
         │
         ▼
    ┌──────────┐
    │ BACKEND  │  Routes the request to the appropriate
    └────┬─────┘  MCP server(s)
         │
         ▼
    ┌─────────────────────────────┐
    │  HR EMPLOYEE DATA           │  Receives the search criteria,
    │  MCP SERVER                 │  filters the employee dataset
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────────┐
    │  EMPLOYEE    │  Non-confidential employee
    │  DATASET     │  records
    └────┬─────────┘
         │
         │ Returns matching records
         ▼
    ┌─────────────────────────────┐
    │  HR EMPLOYEE DATA           │  Formats data as structured
    │  MCP SERVER                 │  text response
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────┐
    │    AI    │  Interprets the data and
    └────┬─────┘  formulates a response
         │
         ▼
    ┌─────────────┐
    │  WORKSPHERE  │  "Here are the available engineers
    └─────────────┘   based in India..."
```

When the question involves a specific client account (e.g., "Who is working on the Acme Corp account?"), the AI may also call account-related MCP servers alongside this one. The AI cross-references employee data with account assignments to produce a combined answer — identifying the resources tied to that account.

---

## Capabilities

The server provides six main capabilities for accessing employee data:

| Capability | What It Does |
|------------|--------------|
| **Employee search** | Finds employees by name, email, job title, location, or organizational unit — searches across multiple fields at once or targets a specific field |
| **Employee lookup by ID** | Retrieves the full profile for a specific employee using their employee ID |
| **Location-based filtering** | Lists employees working in a particular country or city |
| **Job level filtering** | Lists employees at a specific job level |
| **Organization structure** | Shows the organizational units and their leaders at any level of the hierarchy (levels 2 through 6) |
| **Workforce statistics** | Provides summary statistics — overall headcount, breakdowns by location, job level, employment status, or organizational unit |

The employee search is the most commonly used capability. It allows Worksphere users to ask broad resource availability questions like "Find me available people in the Data Engineering team" by searching across names, titles, locations, and org units simultaneously. When combined with account data, the AI can also answer questions like "Who from our team is currently assigned to this client?"

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [Account Directory Server](/docs/mcp-servers/account-directory) | CRM account contacts that can be cross-referenced with employee data |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
