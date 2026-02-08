---
sidebar_position: 2
title: Account Directory Server
description: MCP server that connects the AI to CRM account directory data stored in Azure SQL
---

# Account Directory MCP Server

## Overview

The **Account Directory MCP Server** is a Model Context Protocol (MCP) server that provides the AI with access to the CRM account directory stored in an Azure SQL database. It acts as a bridge between the AI and the database, allowing the AI to look up client accounts, employee contacts, roles, and regional assignments when users ask questions about specific clients or accounts.

This server is part of the Trinity platform's data layer. When a user asks something like "Who are the contacts for Acme Corp?" or "Show me restricted accounts in EMEA", the AI calls this MCP server, which translates the question into a database query, retrieves the relevant data from Azure SQL, and returns the findings for the AI to present in natural language.

A key feature of this server is its use of Azure OpenAI to convert natural language questions directly into SQL queries. This means users can ask questions in plain English without needing to know anything about the underlying database structure.

---

## What Data It Provides

The server connects to a single CRM table in Azure SQL that contains account directory information. The data is organized into three logical groupings:

| Dataset | What It Contains |
|---------|------------------|
| **Client Accounts** | Client names, IDs, and regional assignments (EMEA, APAC, Americas, etc.) |
| **Employee Contacts** | Employee names, emails, roles, and availability status for each client |
| **Restrictions & Metadata** | Restriction flags, role descriptions, and additional context |

---

## Data Model

The account directory uses a flat single-table structure where client, employee, and account information are stored together. Each row represents an employee contact associated with a client account:

```
    ┌─────────────────────────────────────────────────────────────────┐
    │                     ACCOUNT DIRECTORY                           │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  CLIENT INFO                    EMPLOYEE INFO                   │
    │  ─────────────                  ─────────────                   │
    │  • Client ID                    • Employee Name                 │
    │  • Client Name                  • Employee Email                │
    │  • Region                       • Role Description              │
    │                                 • Availability Status           │
    │                                                                 │
    │  ACCOUNT INFO                   RESTRICTIONS                    │
    │  ────────────                   ────────────                    │
    │  • Account ID                   • Restricted Flag               │
    │  • Account Name                 • Role Tooltip                  │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
```

Each employee contact is linked to a client and an account. Multiple employees can be associated with the same client. The region field allows filtering by geographic areas such as EMEA, APAC, Americas, North America, or Europe.

---

## How It Works

When a user asks a question that requires account directory data, the request flows through the system like this:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "Who are the contacts for Acme Corp?"                      
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Understands the question, determines                
    └────┬─────┘  it needs account directory data                     
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │ BACKEND  │  Routes the request to the appropriate               
    └────┬─────┘  MCP server                                          
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  ACCOUNT DIRECTORY         │  Receives the natural language     
    │  MCP SERVER                │  question from the AI              
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  AZURE       │  Converts the plain English question             
    │  OPENAI      │  into a SQL query                                
    └────┬─────────┘                                                  
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  AZURE SQL   │  Executes the generated SQL query                
    │  DATABASE    │  against the account directory                   
    └────┬─────────┘                                                  
         │                                                            
         │ Returns matching records                                   
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  ACCOUNT DIRECTORY         │  Formats results with              
    │  MCP SERVER                │  human-readable field names        
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Interprets the data and                             
    └────┬─────┘  formulates a response                               
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "Here are the contacts for                          
    └──────────┘   Acme Corp..."                                      
```

The key difference from other MCP servers is the Azure OpenAI step. This allows users to ask questions in natural language without knowing anything about database schemas or SQL syntax. The server handles the translation automatically.

---

## Capabilities

The server provides four main capabilities for retrieving account directory data:

| Capability | What It Does |
|------------|--------------|
| **Natural language queries** | Translates plain English questions into SQL and returns matching records from the account directory |
| **Client summary generation** | Produces a human-readable overview of a specific client including contacts, accounts, and restrictions |
| **Regional insights** | Provides aggregated metrics for clients by region, including restriction percentages and breakdowns |
| **Schema exploration** | Returns field descriptions and allowed values so the AI understands what data is available |

The natural language query capability is the most commonly used. It allows the AI to answer a wide range of questions like "Show me all contacts in EMEA", "Which accounts are restricted?", or "Find employees with the role of Account Manager" — all without requiring users to write SQL.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [SFDC UDP Server](/docs/mcp-servers/sfdc-udp) | Sales data from Salesforce (complementary data source) |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
