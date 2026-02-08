---
sidebar_position: 3
title: Campaign Server
description: MCP server that connects the AI to Salesforce campaign data stored in the Databricks data warehouse (UDP)
---

# Campaign MCP Server

## Overview

The **Campaign MCP Server** is a Model Context Protocol (MCP) server that provides the AI with access to campaign information. The campaign data originates in Salesforce (SFDC) and is loaded into the Databricks data warehouse (UDP). This server acts as a bridge between the AI and UDP, allowing the AI to look up campaign details, find ongoing or upcoming campaigns, and discover which campaigns are linked to specific opportunities.

This server is part of the Trinity platform's data layer. When a user asks something like "What ongoing campaigns do we have in EMEA?", the AI calls this MCP server to retrieve the relevant campaign data from UDP, then presents the findings in natural language.

---

## What Data It Provides

The server connects to two related datasets in UDP (sourced from Salesforce):

| Dataset | What It Contains |
|---------|------------------|
| **Campaigns** | Campaign records including names, descriptions, categories, status, start and end dates, ownership, and regional information |
| **Campaign Influence** | Links between campaigns and Salesforce opportunity IDs — used to find which campaigns are associated with specific opportunities |

---

## Data Model

The two datasets are linked through the campaign identifier. Campaigns serve as the hub, with Campaign Influence records connecting campaigns to opportunities:

```
                            ┌─────────────────────────┐
                            │        CAMPAIGNS        │
                            ├─────────────────────────┤
                            │  • Campaign ID          │
                            │  • Campaign Name        │
                            │  • Description          │
                            │  • Category             │
                            │  • Status               │
                            │  • Start Date           │
                            │  • End Date             │
                            │  • Owner Name           │
                            │  • Owner Email          │
                            │  • Region               │
                            │  • Country              │
                            └───────────┬─────────────┘
                                        │
                                        │ one-to-many
                                        │
                                        ▼
                            ┌─────────────────────────┐
                            │   CAMPAIGN INFLUENCE    │
                            ├─────────────────────────┤
                            │  • Campaign ID (link)   │
                            │  • Opportunity ID       │
                            │  • Campaign Name        │
                            └─────────────────────────┘
```

When the AI needs to find campaigns linked to a specific opportunity, the server joins these tables using the campaign identifier to return all related information.

---

## How It Works

When a user asks a question that requires campaign data, the request flows through the system like this:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "What ongoing campaigns do we have in EMEA?"               
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Understands the question, determines                
    └────┬─────┘  it needs campaign data                              
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │ BACKEND  │  Routes the request to the appropriate               
    └────┬─────┘  MCP server                                          
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  CAMPAIGN                   │  Receives the request,            
    │  MCP SERVER                 │  builds and executes the query    
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  DATABRICKS  │  UDP warehouse containing                        
    │  (UDP)       │  campaign data from SFDC                         
    └────┬─────────┘                                                  
         │                                                            
         │ Returns matching records                                   
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  CAMPAIGN                   │  Formats data as structured       
    │  MCP SERVER                 │  JSON response                    
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Interprets the data and                             
    └────┬─────┘  formulates a response                               
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "Here are the ongoing campaigns                     
    └──────────┘   in EMEA..."                                        
```

---

## Capabilities

The server provides four main capabilities for retrieving campaign data:

| Capability | What It Does |
|------------|--------------|
| **Browse campaign categories** | Lists all available campaign categories, useful for understanding what types of campaigns exist and for filtering |
| **Retrieve campaigns by type** | Finds ongoing, upcoming, or recently created campaigns with optional filters for region, category, status, owner, country, and more |
| **Look up campaigns by opportunity** | Finds all campaigns linked to one or more Salesforce opportunity IDs |
| **List available opportunity IDs** | Returns opportunity IDs that have associated campaigns, useful for discovering which opportunities have campaign activity |

The campaign type searches are the most commonly used. They allow the AI to answer questions like "What campaigns are running right now?" or "Show me upcoming campaigns in North America" by finding all matching campaign records in a single query.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [SFDC UDP Server](/docs/mcp-servers/sfdc-udp) | The primary Salesforce data server (opportunities, accounts) |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
