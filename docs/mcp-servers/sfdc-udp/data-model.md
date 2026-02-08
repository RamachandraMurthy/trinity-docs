---
sidebar_position: 2
title: Data Model
description: Complete data model for the SFDC UDP MCP Server showing all tables, fields, and relationships
---

# SFDC UDP Server - Data Model

## Overview

The SFDC UDP MCP Server accesses Salesforce sales data stored in DXC's Databricks UDP (Unified Data Platform) warehouse. The data is organized around customer accounts, with related entities for opportunities, contracts, account plans, and business development initiatives.

This page provides a complete reference of the data model, including all tables, their key fields, and how they relate to each other.

---

## Data Model Diagram

The following diagram shows all nine core tables and their relationships. Accounts serve as the central hub, with opportunities, contracts, and account plans branching out:

```
                                    ┌─────────────────────────────────┐
                                    │          ACCOUNT                │
                                    ├─────────────────────────────────┤
                                    │  • Account ID                   │
                                    │  • Account Name                 │
                                    │  • Industry Vertical            │
                                    │  • Market Region                │
                                    │  • Account Status               │
                                    └───────────────┬─────────────────┘
                                                    │
                   ┌────────────────────────────────┼────────────────────────────────┐
                   │                                │                                │
                   ▼                                ▼                                ▼
    ┌──────────────────────────┐     ┌──────────────────────────┐     ┌──────────────────────────┐
    │       OPPORTUNITY        │     │     CONTRACT SUMMARY     │     │      ACCOUNT PLAN        │
    ├──────────────────────────┤     ├──────────────────────────┤     ├──────────────────────────┤
    │  • Opportunity ID        │     │  • Contract ID           │     │  • Plan ID               │
    │  • Opportunity Name      │     │  • Contract Number       │     │  • Plan Name             │
    │  • Stage                 │     │  • Status                │     │  • Plan Status           │
    │  • Total Contract Value  │     │  • Start Date            │     │  • Plan Owner            │
    │  • Close Date            │     │  • End Date              │     │  • Industry Vertical     │
    │  • Account ID (link)     │     │  • Account ID (link)     │     │  • Account ID (link)     │
    └───────────┬──────────────┘     └──────────────────────────┘     └───────────┬──────────────┘
                │                                                                  │
       ┌────────┴────────┐                                            ┌────────────┴────────────┐
       │                 │                                            │                         │
       ▼                 ▼                                            ▼                         ▼
┌─────────────────┐ ┌─────────────────┐                 ┌─────────────────────────┐ ┌─────────────────────────┐
│   OPPORTUNITY   │ │   DOA REVIEW    │                 │  BUSINESS DEV PLAN      │ │ CUSTOMER BUSINESS       │
│   LINE ITEM     │ │                 │                 │  (Growth Plan)          │ │ PRIORITY                │
├─────────────────┤ ├─────────────────┤                 ├─────────────────────────┤ ├─────────────────────────┤
│ • Line Item ID  │ │ • Review ID     │                 │ • BDP ID                │ │ • Priority Name         │
│ • Product       │ │ • Status        │                 │ • Potential TCV         │ │ • Priority Level        │
│ • External Svc  │ │ • Deal Category │                 │ • Revenue Forecast      │ │ • Timing                │
│ • Internal Svc  │ │ • Approval Info │                 │ • Account Plan ID (link)│ │ • Account Plan ID (link)│
│ • TCV           │ │ • Opty ID (link)│                 └───────────┬─────────────┘ └─────────────────────────┘
│ • Opty ID (link)│ └─────────────────┘                             │
└─────────────────┘                                                 │
                                                                    ▼
                                                    ┌───────────────────────────────┐
                                                    │  BDP-OPPORTUNITY JUNCTION     │
                                                    ├───────────────────────────────┤
                                                    │  • BDP ID (link)              │
                                                    │  • Opportunity ID (link)      │
                                                    └───────────────────────────────┘
```

---

## Table Details

### Account

The central entity representing customer accounts. All other entities connect back to accounts.

| Field | What It Contains |
|-------|------------------|
| Account ID | Unique identifier for the account |
| Account Name | Customer company name |
| Top Account Name | Parent account name for subsidiaries |
| Industry Vertical | Industry classification (e.g., Financial Services, Healthcare) |
| Market Region | Geographic market (Level 1 region) |
| Sub-Region | More specific geographic area (Level 2) |
| Account Status | Current status of the account relationship |
| Global Ultimate Name | Ultimate parent company name |
| DUNS Number | Dun & Bradstreet identifier |

---

### Opportunity

Sales deals and pipeline entries representing potential or closed revenue.

| Field | What It Contains |
|-------|------------------|
| Opportunity ID | Unique identifier for the opportunity |
| Opportunity Name | Descriptive name of the deal |
| Stage | Current sales stage (e.g., Negotiation, Closed Won) |
| Total Contract Value (TCV) | Total value of the deal in USD |
| Annual Billing Revenue (ABR) | Expected annual revenue |
| Close Date | Expected or actual close date |
| Contract Type | Type of contract (e.g., New Business, Renewal) |
| Sales Channel | How the deal was sourced (e.g., Sales Led, Account Led) |
| Record Type | Opportunity classification type |
| Account ID | Link to the parent account |

---

### Opportunity Line Item

Individual products, services, and offerings within each opportunity.

| Field | What It Contains |
|-------|------------------|
| Line Item ID | Unique identifier for the line item |
| Product | Specific product name |
| External Service | Practice offering family (e.g., Data & Analytics, Cloud Computing) |
| Internal Service | Technology stack (e.g., Cloud Infrastructure) |
| Simplified Offering | Mapped offering name |
| Delivery Capability | Major offering category |
| Sub-Capability | More specific offering subcategory |
| Total Price (TCV) | Line item value in USD |
| Opportunity ID | Link to the parent opportunity |

---

### Contract Summary

Sales contracts associated with accounts and opportunities.

| Field | What It Contains |
|-------|------------------|
| Contract ID | Unique identifier for the contract |
| Contract Number | Business contract reference number |
| Status | Current contract status |
| Start Date | Contract effective date |
| End Date | Contract expiration date |
| Account ID | Link to the customer account |
| Opportunity ID | Link to the originating opportunity |

---

### DOA Review

Deal of Authority reviews for compliance and approval tracking.

| Field | What It Contains |
|-------|------------------|
| Review ID | Unique identifier for the review |
| Status | Review status (e.g., Approved, Pending) |
| Deal Category | Classification of the deal type |
| Approval Information | Details about the approval process |
| Opportunity ID | Link to the opportunity being reviewed |

---

### Account Plan

Strategic account plans that define the relationship strategy for key accounts.

| Field | What It Contains |
|-------|------------------|
| Plan ID | Unique identifier for the account plan |
| Plan Name | Descriptive name of the plan |
| Plan Status | Current status of the plan |
| Plan Owner | Person responsible for the plan |
| Industry Vertical | Industry focus of the plan |
| Account ID | Link to the primary account |

---

### Business Development Plan (Growth Plan)

Growth initiatives and revenue projections tied to account plans.

| Field | What It Contains |
|-------|------------------|
| BDP ID | Unique identifier for the business development plan |
| Potential TCV | Total potential contract value |
| Revenue Forecast | Projected revenue amounts |
| Growth Projections | Financial growth expectations |
| Account Plan ID | Link to the parent account plan |

---

### BDP-Opportunity Junction

Links business development plans to their associated opportunities.

| Field | What It Contains |
|-------|------------------|
| BDP ID | Link to the business development plan |
| Opportunity ID | Link to the associated opportunity |

---

### Customer Business Priority

Strategic priorities and outcomes defined for each account plan.

| Field | What It Contains |
|-------|------------------|
| Priority Name | Name of the business priority |
| Priority Level | Importance ranking |
| Timing | When the priority should be addressed |
| Expected Outcome | Desired business outcome |
| Account Plan ID | Link to the parent account plan |

---

## Relationships

The following table summarizes how the tables connect to each other:

| Parent Table | Child Table | Relationship | Cardinality |
|--------------|-------------|--------------|-------------|
| Account | Opportunity | Account contains opportunities | One to Many |
| Account | Contract Summary | Account contains contracts | One to Many |
| Account | Account Plan | Account has account plans | One to Many |
| Opportunity | Opportunity Line Item | Opportunity contains line items | One to Many |
| Opportunity | DOA Review | Opportunity has DOA reviews | One to Many |
| Opportunity | Contract Summary | Opportunity links to contracts | One to Many |
| Account Plan | Business Development Plan | Account plan contains BDPs | One to Many |
| Account Plan | Customer Business Priority | Account plan defines priorities | One to Many |
| Business Development Plan | BDP-Opportunity Junction | BDP links to opportunities | One to Many |
| Opportunity | BDP-Opportunity Junction | Opportunity links to BDPs | One to Many |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [SFDC UDP Overview](./) | Introduction to the SFDC UDP MCP Server |
| [Account Planning](./account-planning) | How to retrieve account plans and business development information |
| [Opportunity Management](./opportunity-management) | How to filter, retrieve, and aggregate opportunity data |
| [AI-Powered Search](./ai-search) | How natural language queries are converted to database searches |
