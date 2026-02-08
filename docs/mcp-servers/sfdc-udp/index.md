---
sidebar_position: 1
title: SFDC UDP Server
description: MCP server that connects the AI to Salesforce sales data stored in the Databricks UDP warehouse
---

# SFDC UDP MCP Server

## Overview

The **SFDC UDP MCP Server** is a Model Context Protocol (MCP) server that provides the AI with access to Salesforce sales data stored in DXC's Databricks data warehouse, known as UDP (Unified Data Platform). It serves as the primary bridge between the AI and enterprise sales information, enabling users to ask questions about accounts, opportunities, contracts, account plans, and pipeline data.

This server is a core component of the Trinity platform's data layer. When a user asks questions like "What opportunities do we have with Microsoft?" or "Show me the account plan for Acme Corp," the AI calls this MCP server to retrieve the relevant sales data from UDP, then presents the findings in natural language.

The server supports multiple workflows including account planning, opportunity management, pipeline analysis, and even AI-powered natural language search for complex queries.

---

## What Data It Provides

The server connects to nine related datasets in the Databricks UDP warehouse:

| Dataset | What It Contains |
|---------|------------------|
| **Accounts** | Customer account profiles including name, industry, region, and key identifiers |
| **Opportunities** | Sales deals and pipeline entries with stage, value, close dates, and ownership |
| **Opportunity Line Items** | Individual products, services, and offerings within each opportunity |
| **Contracts** | Sales contracts with status, dates, and terms |
| **DOA Reviews** | Deal of Authority reviews for compliance and approval tracking |
| **Account Plans** | Strategic account plans with ownership, status, and industry focus |
| **Business Development Plans** | Growth initiatives with revenue projections and potential value |
| **BDP-Opportunity Links** | Connections between business development plans and related opportunities |
| **Customer Business Priorities** | Strategic priorities and outcomes defined for each account plan |

---

## How It Works

When a user asks a question that requires sales data, the request flows through the system like this:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "What opportunities do we have with Microsoft?"            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Understands the question, determines                
    └────┬─────┘  it needs sales/opportunity data                     
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │ BACKEND  │  Routes the request to the appropriate               
    └────┬─────┘  MCP server                                          
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │  Receives the request,            
    │                             │  builds and executes the query    
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  DATABRICKS  │  UDP warehouse containing                        
    │  SQL         │  the Salesforce data tables                      
    └────┬─────────┘                                                  
         │                                                            
         │ Returns matching records                                   
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │  Formats data as structured       
    │                             │  JSON response                    
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Interprets the data and                             
    └────┬─────┘  formulates a response                               
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "Here are the open opportunities                    
    └──────────┘   with Microsoft worth $2.5M..."                     
```

---

## Capabilities

The server provides five main capability groups for working with sales data:

| Capability Group | What It Does | Learn More |
|------------------|--------------|------------|
| **Field Value Discovery** | Maps approximate user input to exact database values (e.g., "Data&AI" to "Data & Analytics") using fuzzy matching | [Opportunity Management](./opportunity-management) |
| **Account Planning** | Retrieves account plans, business development plans, linked opportunities, and customer business priorities | [Account Planning](./account-planning) |
| **Opportunity Management** | Filters, retrieves, and analyzes opportunities, accounts, and their line items with flexible field selection | [Opportunity Management](./opportunity-management) |
| **Data Aggregation** | Groups and aggregates opportunity line items by various dimensions (service, product, account, etc.) | [Opportunity Management](./opportunity-management) |
| **AI-Powered Search** | Converts natural language questions into database queries for contract and deal searches | [AI-Powered Search](./ai-search) |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [Data Model](./data-model) | Complete data model with all tables, fields, and relationships |
| [Account Planning](./account-planning) | How the AI retrieves account plans and business development information |
| [Opportunity Management](./opportunity-management) | How the AI filters, retrieves, and aggregates opportunity data |
| [AI-Powered Search](./ai-search) | How natural language queries are converted to database searches |
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [Deal Qualification Agent](/docs/agents/special/deal-qualification) | Agent that uses this server to assess deal health |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
