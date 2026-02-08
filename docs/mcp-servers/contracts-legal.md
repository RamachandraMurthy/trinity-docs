---
sidebar_position: 2
title: Contracts Legal Server
description: MCP server that connects the AI to legal contract data stored in the Databricks UDP warehouse
---

# Contracts Legal MCP Server

## Overview

The **Contracts Legal MCP Server** is a Model Context Protocol (MCP) server that provides the AI with access to legal contract information stored in the Databricks SQL warehouse (UDP). It acts as a bridge between the AI and the contract database, allowing the AI to look up contract details, retrieve opportunity summaries, and filter contracts based on various criteria when users ask questions about specific agreements.

This server is part of the Trinity platform's data layer. When a user asks something like "What are the contract details for CO12297?" or "Show me all active contracts for opportunity OPX-0020970596", the AI calls this MCP server to retrieve the relevant data from Databricks, then presents the findings in natural language.

---

## What Data It Provides

The server connects to a contracts dataset in Databricks that contains legal agreement information. The data is organized into these logical areas:

| Data Area | What It Contains |
|-----------|------------------|
| **Contract Identifiers** | Contract ID, opportunity ID, agreement name, source file name |
| **Status & Dates** | Contract status, close date, service start and expiration dates |
| **Parties & Ownership** | Customer name, opportunity owner and email, obligation approvers |
| **Financials** | Account operating profit (AOP) percentage |
| **Industry** | Industry vertical and industry segment classifications |
| **Business Details** | Opportunity type, deal category, major offering, regional coverage |

---

## Data Model

The contract data resides in a single table within the Databricks legal agreement schema. Contracts are linked to opportunities through the opportunity identifier, where one opportunity can have multiple associated contracts:

```
                                    ┌─────────────────────────┐
                                    │      OPPORTUNITY        │
                                    │    (External Entity)    │
                                    ├─────────────────────────┤
                                    │  • Opportunity ID       │
                                    └───────────┬─────────────┘
                                                │
                                                │ 1:Many
                                                │
                                                ▼
                            ┌─────────────────────────────────────┐
                            │              CONTRACT               │
                            ├─────────────────────────────────────┤
                            │  Identifiers                        │
                            │  • Contract ID                      │
                            │  • Opportunity ID (link)            │
                            │  • Agreement Name                   │
                            │  • Source File Name                 │
                            ├─────────────────────────────────────┤
                            │  Status & Dates                     │
                            │  • Status                           │
                            │  • Closed Date                      │
                            │  • Service Start Date               │
                            │  • Expiration Date                  │
                            ├─────────────────────────────────────┤
                            │  Parties & Ownership                │
                            │  • Customer                         │
                            │  • Opportunity Owner                │
                            │  • Opportunity Owner Email          │
                            │  • Obligation Approvers             │
                            ├─────────────────────────────────────┤
                            │  Financials                         │
                            │  • AOP Percentage                   │
                            ├─────────────────────────────────────┤
                            │  Industry                           │
                            │  • Industry Vertical                │
                            │  • Industry Segment                 │
                            ├─────────────────────────────────────┤
                            │  Business Details                   │
                            │  • Opportunity Type                 │
                            │  • Deal Category                    │
                            │  • Major Offering                   │
                            │  • Regions                          │
                            └─────────────────────────────────────┘
```

When the AI needs contract data for a specific opportunity, the server queries this table and aggregates the results to provide a complete picture.

---

## How It Works

When a user asks a question that requires contract data, the request flows through the system like this:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "What contracts do we have for opportunity OPX-0020970596?"
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Understands the question, determines                
    └────┬─────┘  it needs legal contract data                        
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │ BACKEND  │  Routes the request to the appropriate               
    └────┬─────┘  MCP server                                          
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  CONTRACTS LEGAL           │  Receives the opportunity ID,      
    │  MCP SERVER                │  builds and executes the query     
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  DATABRICKS  │  UDP warehouse containing                        
    │  SQL (UDP)   │  the contracts table                             
    └────┬─────────┘                                                  
         │                                                            
         │ Returns matching contract records                          
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  CONTRACTS LEGAL           │  Formats data as structured        
    │  MCP SERVER                │  JSON response with aggregations   
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Interprets the data and                             
    └────┬─────┘  formulates a response                               
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "This opportunity has 3 contracts:                  
    └──────────┘   2 Active and 1 On Hold..."                         
```

---

## Capabilities

The server provides three main capabilities for retrieving legal contract data:

| Capability | What It Does |
|------------|--------------|
| **Contract lookup** | Retrieves full details for one or more contracts by their contract ID — useful when you know the specific contract you need |
| **Opportunity summary** | Finds all contracts linked to an opportunity and returns aggregated statistics including total count, status breakdown, date ranges, and regional coverage |
| **Advanced filtering** | Searches contracts using structured filters on fields like status, industry segment, deal category, and opportunity type, with pagination support for large result sets |

The opportunity summary is particularly useful for getting a quick overview of all agreements associated with a deal. The advanced filtering capability allows for complex searches across the contract portfolio.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [SFDC UDP Server](/docs/mcp-servers/sfdc-udp) | Salesforce opportunity data (complements contract data) |
| [SFDC UDP AI-Powered Search](/docs/mcp-servers/sfdc-udp/ai-search) | Natural language search for contracts and deals |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
