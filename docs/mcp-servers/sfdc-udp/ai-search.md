---
sidebar_position: 5
title: AI-Powered Search
description: How natural language queries are converted to database searches for contracts and deals
---

# SFDC UDP Server - AI-Powered Search

## Overview

The SFDC UDP MCP Server includes an AI-powered search capability that converts natural language questions into database queries. This allows users to ask questions in plain English without needing to know the underlying data structure.

When a user asks "Show me active contracts expiring next quarter" or "Find deals with Microsoft that are in renewal," the AI uses this capability to automatically generate the appropriate database query and return the results.

This feature is currently focused on contract and deal searches, providing a natural way to explore sales data without requiring structured query input.

---

## How It Works

The AI-powered search follows a multi-step process to convert natural language into database results:

```
    ┌──────────────────────────────────────────────────────────────────────────┐
    │                      AI-POWERED SEARCH WORKFLOW                          │
    └──────────────────────────────────────────────────────────────────────────┘

    STEP 1: Receive Natural Language Query
    ───────────────────────────────────────
    
         ┌─────────────────────────────────────────────────────────────────────┐
         │  User: "Show me active contracts with Microsoft expiring in 2025"  │
         └─────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
    STEP 2: Identify Required Tables
    ─────────────────────────────────
    
         ┌─────────────────────────────────────────────────────────────────────┐
         │  AI analyzes the question and identifies which database tables     │
         │  are needed to answer it                                           │
         │                                                                     │
         │  Identified: CONTRACT, ACCOUNT                                      │
         └─────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
    STEP 3: Retrieve Table Schemas
    ───────────────────────────────
    
         ┌─────────────────────────────────────────────────────────────────────┐
         │  Server retrieves the structure of the identified tables:          │
         │  - Column names and types                                          │
         │  - Relationships between tables                                    │
         │  - Valid values for key fields                                     │
         └─────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
    STEP 4: Generate SQL Query
    ──────────────────────────
    
         ┌─────────────────────────────────────────────────────────────────────┐
         │  AI generates a SQL query based on:                                │
         │  - The user's question                                             │
         │  - The table schemas                                               │
         │  - Known relationships                                              │
         │                                                                     │
         │  Generated SQL:                                                     │
         │  SELECT c.contract_number, c.status, c.end_date, a.name            │
         │  FROM contract c                                                    │
         │  JOIN account a ON c.account_id = a.id                             │
         │  WHERE a.name LIKE '%Microsoft%'                                    │
         │    AND c.status = 'Active'                                          │
         │    AND c.end_date BETWEEN '2025-01-01' AND '2025-12-31'            │
         └─────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
    STEP 5: Validate and Execute
    ────────────────────────────
    
         ┌─────────────────────────────────────────────────────────────────────┐
         │  Server validates the generated SQL for:                           │
         │  - Proper SELECT/FROM structure                                    │
         │  - Valid table names                                               │
         │  - Correct relationships                                            │
         │                                                                     │
         │  Then executes against the Databricks warehouse                    │
         └─────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
    STEP 6: Return Results
    ──────────────────────
    
         ┌─────────────────────────────────────────────────────────────────────┐
         │  Results returned to the AI:                                       │
         │  - Matching records                                                │
         │  - The generated SQL (for transparency)                            │
         │  - Processing metadata                                              │
         └─────────────────────────────────────────────────────────────────────┘
```

---

## Request Flow

Here's how an AI-powered search flows through the system:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "Find all active contracts with                            
         │  Fortune 500 companies"                                    
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Recognizes this as a natural                        
    └────┬─────┘  language search request                             
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │  Receives the natural language    
    │  Natural Language Search    │  query                            
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  TABLE IDENTIFICATION       │  AI identifies relevant tables    
    │  (AI-Powered)               │  from the question                
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SQL GENERATION             │  AI generates appropriate SQL     
    │  (AI-Powered)               │  using table schemas              
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  VALIDATION                 │  Server validates the             
    │                             │  generated query                  
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  DATABRICKS  │  Executes the validated SQL                      
    │  SQL         │                                                  
    └────┬─────────┘                                                  
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Interprets and presents                             
    └────┬─────┘  the results                                         
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "Here are 12 active contracts                       
    └──────────┘   with Fortune 500 companies..."                     
```

---

## Capabilities

The AI-powered search provides one primary capability:

| Capability | What It Does |
|------------|--------------|
| **Natural language contract search** | Converts plain English questions into database queries for searching contracts and deals. Automatically identifies relevant tables, generates SQL, validates the query, and returns matching results along with the generated SQL for transparency. |

---

## What It Handles Well

The AI-powered search works best for these types of questions:

| Query Type | Examples |
|------------|----------|
| Contract searches | "Show me active contracts", "Find expiring contracts" |
| Account-based queries | "Contracts with Microsoft", "Deals with healthcare companies" |
| Date-based filters | "Contracts expiring in 2025", "Deals closed last quarter" |
| Status filters | "Active contracts", "Pending renewals" |
| Value-based queries | "High-value contracts", "Deals over $1M" |
| Combined criteria | "Active Microsoft contracts over $500K expiring next year" |

---

## Current Scope and Limitations

The AI-powered search is designed for specific use cases and has some limitations:

| Aspect | Current State |
|--------|--------------|
| **Focus area** | Primarily optimized for contract and deal searches |
| **Table coverage** | Works with core tables (contracts, accounts, opportunities) |
| **Query complexity** | Best for straightforward searches with clear criteria |
| **Aggregations** | Limited support for complex aggregations (use dedicated aggregation capabilities instead) |
| **Multi-step queries** | Single-query execution; for complex workflows, use the structured capabilities |

For complex analytical queries or multi-step workflows, consider using the dedicated [Opportunity Management](./opportunity-management) capabilities which provide more precise control.

---

## Example Questions

Users can ask questions like these to trigger the AI-powered search:

| Question | What Happens |
|----------|--------------|
| "Show me active contracts" | Searches for contracts with active status |
| "Find contracts with Microsoft expiring in 2025" | Searches for Microsoft contracts with end dates in 2025 |
| "What deals do we have in the renewal stage?" | Searches for opportunities in renewal stages |
| "Show me contracts over $1M with Fortune 500 accounts" | Searches for high-value contracts with large accounts |
| "Find all contracts signed last year" | Searches for contracts with start dates in the previous year |
| "What are our expiring contracts this quarter?" | Searches for contracts with end dates in the current quarter |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [SFDC UDP Overview](./) | Introduction to the SFDC UDP MCP Server |
| [Data Model](./data-model) | Complete data model with all tables and relationships |
| [Opportunity Management](./opportunity-management) | Structured capabilities for filtering, retrieving, and aggregating data |
| [Account Planning](./account-planning) | How to retrieve account plans and business development information |
| [Contracts Legal Server](/docs/mcp-servers/contracts-legal) | Server for legal contract data with advanced filtering |
