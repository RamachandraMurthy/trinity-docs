---
sidebar_position: 4
title: Client Reference Server
description: MCP server that connects the AI to client reference data stored in Databricks
---

# Client Reference MCP Server

## Overview

The **Client Reference MCP Server** is a Model Context Protocol (MCP) server that provides the AI with access to client reference information stored in a Databricks SQL warehouse. It acts as a bridge between the AI and the database, allowing the AI to look up account profiles, reference summaries, case studies, and other reference materials when users ask questions about specific clients.

This server is part of the Trinity platform's data layer. When a user asks something like "What reference materials do we have for Acme Corp?", the AI calls this MCP server to retrieve the relevant data from Databricks, then presents the findings in natural language.

---

## What Data It Provides

The server connects to three related datasets in Databricks:

| Dataset | What It Contains |
|---------|------------------|
| **Accounts** | Client account names and identifiers — the central lookup point |
| **Basic Information** | Reference profiles, summaries, and background details for each account |
| **Content** | Reference materials like case study documents, URLs, and other collateral |

---

## Data Model

The three datasets are linked through account identifiers. Accounts serve as the hub, with Basic Information and Content connected to each account:

```
                            ┌─────────────────────────┐
                            │        ACCOUNTS         │
                            ├─────────────────────────┤
                            │  • Account ID           │
                            │  • Account Name         │
                            │  • Top Account Name     │
                            └───────────┬─────────────┘
                                        │
                   ┌────────────────────┴────────────────────┐
                   │                                         │
                   ▼                                         ▼
    ┌──────────────────────────┐              ┌──────────────────────────┐
    │    BASIC INFORMATION     │              │         CONTENT          │
    ├──────────────────────────┤              ├──────────────────────────┤
    │  • Reference Summary     │              │  • Document Name         │
    │  • Profile Details       │              │  • Content URL           │
    │  • Background Info       │              │  • Content Type          │
    │  • Account ID (link)     │              │  • Account ID (link)     │
    └──────────────────────────┘              └──────────────────────────┘
```

When the AI needs reference data for a specific client, the server joins these tables using the account identifier to return all related information.

---

## How It Works

When a user asks a question that requires client reference data, the request flows through the system like this:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "What references do we have for Acme Corp?"                
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Understands the question, determines                
    └────┬─────┘  it needs client reference data                      
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │ BACKEND  │  Routes the request to the appropriate               
    └────┬─────┘  MCP server                                          
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  CLIENT REFERENCE          │  Receives the account name,        
    │  MCP SERVER                │  builds and executes the query     
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  DATABRICKS  │  SQL warehouse containing                        
    │  SQL         │  the reference tables                            
    └────┬─────────┘                                                  
         │                                                            
         │ Returns matching records                                   
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  CLIENT REFERENCE          │  Formats data as structured        
    │  MCP SERVER                │  JSON response                     
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Interprets the data and                             
    └────┬─────┘  formulates a response                               
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "Here are the case studies and                      
    └──────────┘   references for Acme Corp..."                       
```

---

## Capabilities

The server provides four main capabilities for retrieving client reference data:

| Capability | What It Does |
|------------|--------------|
| **Direct reference lookup** | Retrieves reference profiles and summaries from the basic information dataset |
| **Direct content lookup** | Retrieves reference documents and materials from the content dataset |
| **Account-based reference search** | Finds all basic information tied to a specific account name |
| **Account-based content search** | Finds all content and materials tied to a specific account name |

The account-based searches are the most commonly used. They allow the AI to answer questions like "What do we have on [Client Name]?" by finding all related reference data in a single query.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [Auxilium Server](/docs/mcp-servers/auxilium) | Past proposals and reference materials via RAG search |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
