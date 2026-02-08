---
sidebar_position: 3
title: Account Planning
description: How the AI retrieves account plans, business development plans, and related opportunities
---

# SFDC UDP Server - Account Planning

## Overview

Account planning is a strategic process where sales teams define how they will grow and manage key customer relationships. The SFDC UDP MCP Server gives the AI access to account planning data, enabling users to ask questions about account strategies, growth initiatives, and the opportunities tied to those plans.

When a user asks "What's the account plan for Microsoft?" or "Show me the business development plans for our top accounts," the AI uses this server to retrieve the relevant planning data and present it in a meaningful way.

---

## The Account Planning Workflow

Account planning data is organized in a hierarchy. To get from an account to its related opportunities, the AI follows a three-step chained workflow:

```
    ┌──────────────────────────────────────────────────────────────────────────┐
    │                         ACCOUNT PLANNING WORKFLOW                        │
    └──────────────────────────────────────────────────────────────────────────┘

    STEP 1: Find Account Plans
    ──────────────────────────
    
         ┌──────────────┐         ┌──────────────────────────────┐
         │   ACCOUNT    │ ──────► │        ACCOUNT PLAN          │
         │  "Microsoft" │         │  • Plan ID: AP-001           │
         └──────────────┘         │  • Plan Name: "Microsoft     │
                                  │    Strategic Growth 2025"    │
                                  │  • Status: Active            │
                                  │  • Owner: John Smith         │
                                  └──────────────────────────────┘
                                                 │
                                                 │ Uses Plan IDs
                                                 ▼
    STEP 2: Get Business Development Plans
    ───────────────────────────────────────
    
         ┌──────────────────────────────┐         ┌──────────────────────────────┐
         │        ACCOUNT PLAN          │ ──────► │   BUSINESS DEVELOPMENT PLAN  │
         │        Plan ID: AP-001       │         │  • BDP ID: BDP-101           │
         └──────────────────────────────┘         │  • Potential TCV: $5M        │
                                                  │  • Revenue Forecast: $2M/yr  │
                                                  └──────────────────────────────┘
                                                                 │
                                                                 │ Uses BDP IDs
                                                                 ▼
    STEP 3: Find Linked Opportunities
    ──────────────────────────────────
    
         ┌──────────────────────────────┐         ┌──────────────────────────────┐
         │   BUSINESS DEVELOPMENT PLAN  │ ──────► │        OPPORTUNITY           │
         │        BDP ID: BDP-101       │         │  • Opty ID: OPP-5001         │
         └──────────────────────────────┘         │  • Name: "Azure Migration"   │
                                                  │  • Stage: Negotiation        │
                                                  │  • TCV: $1.2M                │
                                                  └──────────────────────────────┘
```

Additionally, the AI can retrieve customer business priorities at any point once it has account plan IDs:

```
    ┌──────────────────────────────┐         ┌──────────────────────────────┐
    │        ACCOUNT PLAN          │ ──────► │  CUSTOMER BUSINESS PRIORITY  │
    │        Plan ID: AP-001       │         │  • Priority: "Cloud First"   │
    └──────────────────────────────┘         │  • Level: High               │
                                             │  • Timing: Q1 2025           │
                                             └──────────────────────────────┘
```

---

## How It Works

When a user asks an account planning question, the AI orchestrates the multi-step workflow automatically:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "What opportunities are tied to our                        
         │  Microsoft account plan?"                                  
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Recognizes this needs the full                      
    └────┬─────┘  3-step account planning workflow                    
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │                                   
    │  Step 1: Account Plans      │  Find account plans for          
    │                             │  "Microsoft"                      
    └────┬────────────────────────┘                                   
         │ Returns Plan IDs                                           
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │                                   
    │  Step 2: Business Dev Plans │  Get BDPs for those              
    │                             │  plan IDs                         
    └────┬────────────────────────┘                                   
         │ Returns BDP IDs                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │                                   
    │  Step 3: Opportunities      │  Get opportunities linked        
    │                             │  to those BDP IDs                 
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Combines all the data and                           
    └────┬─────┘  formulates a complete response                      
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "The Microsoft Strategic Growth 2025               
    └──────────┘   plan has 3 linked opportunities                    
                   worth a total of $4.5M..."                         
```

---

## Capabilities

The server provides four capabilities for account planning workflows:

| Capability | What It Does |
|------------|--------------|
| **Account plan lookup** | Finds account plans for one or more accounts by name. Supports partial name matching (e.g., "Microsoft" finds "Microsoft Corporation"). Returns plan IDs, names, status, ownership, and industry verticals. |
| **Business development plan retrieval** | Retrieves business development plans for given account plan IDs. Returns BDP IDs, financial projections (potential TCV, revenue forecasts), and growth initiatives. |
| **BDP-to-opportunity linking** | Finds opportunities linked to specific business development plans. Returns opportunity IDs, names, stages, close dates, and account associations. |
| **Customer business priorities** | Retrieves strategic priorities for account plans. Returns priority names, importance levels, timing, and expected outcomes. Supports pagination for accounts with many priorities. |

---

## Example Questions

Users can ask questions like these to trigger the account planning workflow:

| Question | What the AI Does |
|----------|------------------|
| "What's the account plan for Microsoft?" | Retrieves account plans matching "Microsoft" |
| "Show me the BDPs for our Acme Corp account plan" | Gets account plans for Acme, then retrieves their business development plans |
| "What opportunities are tied to our top account plans?" | Runs the full 3-step workflow to connect accounts → plans → BDPs → opportunities |
| "What are the customer priorities for the IBM account?" | Gets account plans for IBM, then retrieves their business priorities |
| "What's the total potential TCV in our Microsoft growth initiatives?" | Retrieves BDPs for Microsoft and sums up the potential TCV values |
| "Show me active account plans with high-value opportunities" | Filters for active plans, follows the chain to opportunities, and filters by value |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [SFDC UDP Overview](./) | Introduction to the SFDC UDP MCP Server |
| [Data Model](./data-model) | Complete data model with all tables and relationships |
| [Opportunity Management](./opportunity-management) | How to filter, retrieve, and aggregate opportunity data |
| [AI-Powered Search](./ai-search) | How natural language queries are converted to database searches |
