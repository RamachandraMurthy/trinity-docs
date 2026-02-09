---
sidebar_position: 4
title: Opportunity Management
description: How the AI filters, retrieves, and aggregates opportunity and account data
---

# SFDC UDP Server - Opportunity Management

## Overview

Opportunity management is at the heart of sales operations. The SFDC UDP MCP Server gives the AI comprehensive access to opportunity and account data, enabling users to filter, retrieve, analyze, and aggregate pipeline information.

When a user asks "What opportunities do we have in the negotiation stage?" or "Show me the total TCV by delivery capability," the AI uses this server to query the data and present actionable insights.

---

## How It Works

The opportunity management workflow supports multiple paths depending on what the user needs:

```
    ┌──────────────────────────────────────────────────────────────────────────┐
    │                     OPPORTUNITY MANAGEMENT WORKFLOW                      │
    └──────────────────────────────────────────────────────────────────────────┘

    PATH A: Filter → Details → Line Items
    ──────────────────────────────────────

    ┌────────────────┐    ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
    │    FILTER      │    │  GET DETAILS   │    │  GET LINE      │    │  AGGREGATE     │
    │  Accounts or   │───►│  Account or    │───►│  ITEMS         │───►│  LINE ITEMS    │
    │  Opportunities │    │  Opportunity   │    │  (Optional)    │    │  (Optional)    │
    └────────────────┘    └────────────────┘    └────────────────┘    └────────────────┘
          │                     │                     │                     │
          ▼                     ▼                     ▼                     ▼
    Returns IDs          Returns selected      Returns products,      Returns grouped
    matching criteria    fields for each ID    services, pricing      totals and counts


    PATH B: Direct Aggregation
    ──────────────────────────

    ┌────────────────┐    ┌────────────────┐
    │  AGGREGATE     │───►│    RESULTS     │
    │  LINE ITEMS    │    │  Grouped by    │
    │  with filters  │    │  dimensions    │
    └────────────────┘    └────────────────┘
          │                     │
          ▼                     ▼
    Apply filters and     Sum, average, count
    grouping in one step  by service, product, etc.
```

---

## Typical Request Flow

Here's how a typical opportunity query flows through the system:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "Show me Cloud opportunities over $1M                      
         │  in the negotiation stage"                                 
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Recognizes this needs filtering                     
    └────┬─────┘  then detail retrieval                               
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │                                   
    │  Step 1: Filter             │  Filter opportunities by stage   
    │                             │  and value criteria               
    └────┬────────────────────────┘                                   
         │ Returns matching Opportunity IDs                           
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │                                   
    │  Step 2: Get Details        │  Retrieve full details for       
    │                             │  matching opportunities           
    └────┬────────────────────────┘                                   
         │ Returns opportunity data                                   
         ▼                                                            
    ┌──────────┐                                                      
    │    AI    │  Formats and presents                                
    └────┬─────┘  the results                                         
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  "Here are 5 Cloud opportunities                     
    └──────────┘   over $1M in negotiation..."                        
```

---

## Field Value Discovery

Users often provide approximate terms when asking questions. For example, they might say "Data&AI" when the database value is "Data & Analytics." The server includes a field value discovery capability that helps the AI map user input to exact database values.

```
    ┌──────────────────────────────────────────────────────────────────────────┐
    │                        FIELD VALUE DISCOVERY                             │
    └──────────────────────────────────────────────────────────────────────────┘

    User says: "Show me Data&AI opportunities"
                           │
                           ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  AI recognizes "Data&AI" needs to be mapped to an exact database value  │
    └────────────────────────────────────┬────────────────────────────────────┘
                                         │
                                         ▼
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │  Get distinct values for          
    │  Field Value Discovery      │  External Service field           
    └────┬────────────────────────┘                                   
         │                                                            
         │ Returns: ["Data & Analytics", "Cloud Computing",           
         │           "Digital Transformation", ...]                   
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  SFDC UDP MCP SERVER        │  Map "Data&AI" to closest match   
    │  Fuzzy Matching             │  using similarity scoring         
    └────┬────────────────────────┘                                   
         │                                                            
         │ Returns: "Data & Analytics" (92% match)                    
         ▼                                                            
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  AI now uses the exact value "Data & Analytics" in the actual query     │
    └──────────────────────────────────────────────────────────────────────────┘
```

The following fields support value discovery and fuzzy matching:

| Field | What It Represents | Example Values |
|-------|-------------------|----------------|
| External Service | Practice offering family | "Data & Analytics", "Cloud Computing" |
| Internal Service | Technology stack | "Cloud Infrastructure", "Application Development" |
| Simplified Offering | Mapped offering name | "Management Consulting", "Technology Services" |
| Product | Specific product | "Microsoft Azure", "AWS Services" |
| Contract Type | Type of contract | "New Business", "Renewal" |
| Sales Stage | Pipeline stage | "Closed Won", "Negotiation/Review" |
| Record Type | Opportunity classification | "Standard", "Road Runner" |
| Sales Channel | Deal sourcing | "Sales Led", "Account Led" |
| Delivery Capability | Major offering category | "Digital Services", "Infrastructure Services" |
| Sub-Capability | Offering subcategory | "Application Modernization", "Data Analytics" |

---

## Capabilities

The server provides seven capabilities for opportunity management:

| Capability | What It Does |
|------------|--------------|
| **Account filtering** | Finds accounts matching specified criteria (name, industry, region, status, etc.). Returns account IDs for use in subsequent queries. Supports pagination for large result sets. |
| **Opportunity filtering** | Finds opportunities matching specified criteria (stage, close date, value, contract type, etc.). Returns opportunity IDs for use in subsequent queries. Supports pagination. |
| **Flexible account details** | Retrieves detailed information for specific accounts. Allows selecting specific fields or field groups (basic, business, contacts, geographic, industry, financial, compliance, identifiers). |
| **Flexible opportunity details** | Retrieves detailed information for specific opportunities. Allows selecting specific fields or field groups (basic, product, business, contract, sales, financial, governance). |
| **Line item retrieval** | Gets the individual products, services, and offerings within opportunities. Supports filtering and field selection for targeted queries. |
| **Line item aggregation** | Groups and aggregates line item data by various dimensions (service, product, account, capability). Supports sum, average, count, min, and max aggregations. |
| **Disclosure lookup** | Retrieves DOA (Deal of Authority) review information for opportunities, including compliance status and approval details. |

---

## Field Groups

When retrieving account or opportunity details, users can request specific groups of related fields:

### Account Field Groups

| Group | What It Includes |
|-------|------------------|
| Basic | Account ID, name, status |
| Business | Industry, market segment, business classification |
| Contacts | Key contact information |
| Geographic | Region, country, address information |
| Industry | Industry vertical, sector details |
| Financial | Revenue, financial metrics |
| Compliance | Compliance-related flags and status |
| Identifiers | DUNS number, external IDs |
| Names | Account name variations, parent names |

### Opportunity Field Groups

| Group | What It Includes |
|-------|------------------|
| Basic | Opportunity ID, name, stage, close date |
| Product | Products and services included |
| Business | Business unit, market information |
| Contract | Contract type, terms, duration |
| Sales | Sales team, channel, ownership |
| Financial | TCV, ABR, pricing information |
| Governance | Approval status, compliance flags |

---

## Example Questions

Users can ask questions like these to work with opportunity data:

| Question | What the AI Does |
|----------|------------------|
| "What opportunities do we have with Microsoft?" | Filters opportunities by account name, retrieves details |
| "Show me all deals over $5M in the negotiation stage" | Filters by TCV and stage, retrieves opportunity details |
| "What's our total pipeline by delivery capability?" | Aggregates line items grouped by delivery capability |
| "List Cloud Computing opportunities closing this quarter" | Filters by service type and close date range |
| "Show me the products in opportunity OPP-12345" | Retrieves line items for a specific opportunity |
| "What's the average deal size by sales channel?" | Aggregates opportunities with average TCV by channel |
| "What accounts do we have in Financial Services?" | Filters accounts by industry vertical |
| "Show me the DOA status for our top 10 deals" | Retrieves disclosure/approval information |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [SFDC UDP Overview](./) | Introduction to the SFDC UDP MCP Server |
| [Data Model](./data-model) | Complete data model with all tables and relationships |
| [AI-Powered Search](./ai-search) | How natural language queries are converted to database searches |
| [Deal Qualification Agent](/docs/agents/special/deal-qualification) | Agent that evaluates deal health using this server's data |
