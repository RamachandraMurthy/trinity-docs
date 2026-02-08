---
sidebar_position: 6
title: Market Intelligence Server
description: MCP server that provides external market intelligence data from IDC and HDInsights for the Client Profile Report Agent
---

# Market Intelligence Spend Data MCP Server

## Overview

The **Market Intelligence Spend Data MCP Server** is a Model Context Protocol (MCP) server that provides external market intelligence data for the **Client Profile Report Agent**. This data is sourced from IDC and HDInsights subscriptions and includes insights into how companies are spending on IT, what vendor contracts they have, and other market-facing information.

This server is part of the Trinity platform's data layer, specifically supporting the Client Profile Report. When the agent generates a client profile report, it calls this MCP server to retrieve external market intelligence that enriches the report with third-party data about the client's IT spending patterns and vendor relationships.

For example, when building a profile report for Delta Air Lines, the agent can pull in IDC/HDInsights data showing what IT services the company spends on and which vendors hold contracts with them — information that comes from outside DXC's internal systems.

A key feature of this server is its intelligent company name resolution. The system can handle typos, abbreviations, and alternate company names. For example, if a user types "GE" or "Prudential", the server resolves these to their full official names and searches for all matching variations.

---

## What Data It Provides

The server connects to two datasets containing external market intelligence, stored in Azure Cosmos DB:

| Dataset | What It Contains |
|---------|------------------|
| **Company Spend Intelligence** | External market data from IDC/HDInsights showing how a company spends on IT — categories, amounts, and trends |
| **Vendor Contracts** | Third-party data on what vendor contracts a company holds, including contract end dates, duration, and status |

This is external market data, not DXC's internal contract or account data. It provides an outside-in view of a client's IT spending and vendor landscape.

---

## Data Model

The two datasets are stored in separate containers. Each can be queried by company name, with intelligent name resolution to handle variations:

```
                     ┌─────────────────────────────────────────┐
                     │       COMPANY SPEND INTELLIGENCE        │
                     │         (IDC / HDInsights)              │
                     ├─────────────────────────────────────────┤
                     │  • Company Name                         │
                     │  • IT Spending Categories               │
                     │  • Spending Amounts and Trends          │
                     │  • Market Intelligence Details          │
                     └─────────────────────────────────────────┘


                     ┌─────────────────────────────────────────┐
                     │           VENDOR CONTRACTS              │
                     │         (IDC / HDInsights)              │
                     ├─────────────────────────────────────────┤
                     │  • Customer Name                        │
                     │  • Vendor Name                          │
                     │  • Contract End Date                    │
                     │  • Contract Length (months)             │
                     │  • Days Until Expiration (calculated)   │
                     │  • Contract Status (Active/Expiring)    │
                     └─────────────────────────────────────────┘


                     ┌─────────────────────────────────────────┐
                     │       NAME RESOLUTION LAYER             │
                     ├─────────────────────────────────────────┤
                     │  Maps user input to company variations: │
                     │  • "TCS" → "Tata Consultancy Services"  │
                     │  • "GE" → "General Electric Company"    │
                     │  • Handles typos and abbreviations      │
                     └─────────────────────────────────────────┘
```

When searching for data, the server first resolves the user's input into multiple name variations, then queries the containers with all variations to maximize results.

---

## How It Works

When the Client Profile Report Agent needs external market intelligence for a client, the request flows through the system like this:

```
    ┌───────────────────────┐                                         
    │  CLIENT PROFILE       │                                         
    │  REPORT AGENT         │  Building a client profile report       
    └───────────┬───────────┘                                         
                │ "Get market intelligence for Delta Air Lines"       
                ▼                                                     
    ┌───────────────────────┐                                         
    │  SPEND DATA           │  Receives the company name              
    │  MCP SERVER           │                                         
    └───────────┬───────────┘                                         
                │                                                     
                ▼                                                     
    ┌───────────────────────┐                                         
    │  NAME RESOLUTION      │  Generates company name                 
    │                       │  variations using AI                    
    └───────────┬───────────┘                                         
                │ "Delta" → ["Delta", "Delta Air Lines, Inc.", ...]   
                ▼                                                     
    ┌───────────────────────┐                                         
    │  AZURE COSMOS DB      │  External market data from              
    │                       │  IDC / HDInsights                       
    └───────────┬───────────┘                                         
                │                                                     
                │ Returns spend data and vendor contracts             
                ▼                                                     
    ┌───────────────────────┐                                         
    │  SPEND DATA           │  Enriches contract data:                
    │  MCP SERVER           │  • Calculates days until end            
    └───────────┬───────────┘  • Adds expiration status               
                │              • Formats contract length              
                ▼                                                     
    ┌───────────────────────┐                                         
    │  CLIENT PROFILE       │  Incorporates external market           
    │  REPORT AGENT         │  intelligence into the report           
    └───────────────────────┘                                         
```

---

## Capabilities

The server provides three main capabilities for retrieving external market intelligence:

| Capability | What It Does |
|------------|--------------|
| **Company spend lookup** | Retrieves IDC/HDInsights data showing how a company spends on IT, including spending categories and trends |
| **Vendor contract search** | Finds third-party vendor contracts for a company, enriched with expiration dates, time remaining, and active/expiring status |
| **Company name resolution** | Resolves typos, abbreviations, and alternate company names into known variations to improve search accuracy |

The vendor contract search automatically calculates how many days remain until each contract expires and flags contracts expiring within the next year — useful for identifying opportunities where a client's existing vendor relationship may be up for renewal.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [Azure App URL Server](/docs/mcp-servers/azure-app-url) | Submits Market Intelligence analysis jobs |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
