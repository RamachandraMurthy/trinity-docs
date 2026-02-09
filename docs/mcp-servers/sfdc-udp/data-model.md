---
sidebar_position: 2
title: Data Model
description: What data the SFDC UDP MCP Server accesses and how the AI uses it
---

# SFDC UDP Server - Available Data

## Overview

The SFDC UDP MCP Server connects to DXC's Databricks UDP (Unified Data Platform) warehouse, which stores Salesforce sales data. Trinity does not own or manage this data — it simply reads from the warehouse to answer user questions about accounts, opportunities, contracts, and account plans.

This page describes the categories of data available through the server and what kind of questions each enables.

---

## Data Categories

The server can pull information across nine areas of sales data. Here's what each area covers and what users can ask about:

### Accounts

The foundation of all sales data. Every customer relationship starts with an account.

| What's Available | Example Questions |
|---|---|
| Account names and identifiers | "Tell me about the Acme Corp account" |
| Industry and vertical classification | "Which accounts are in Financial Services?" |
| Geographic region and sub-region | "Show me all accounts in EMEA" |
| Parent/subsidiary relationships | "Who is the parent company of this account?" |
| Account status | "Is this account still active?" |

---

### Opportunities

Sales deals and pipeline entries — both open and closed.

| What's Available | Example Questions |
|---|---|
| Deal names, stages, and status | "What stage is the Acme modernization deal?" |
| Total contract value (TCV) and annual billing revenue | "What's the total pipeline value for Q3?" |
| Close dates (expected and actual) | "Which deals are closing this quarter?" |
| Contract type (new business, renewal, etc.) | "How many renewal opportunities do we have?" |
| Sales channel and sourcing | "Show me all partner-sourced deals" |

---

### Opportunity Line Items

The individual products, services, and offerings within each deal.

| What's Available | Example Questions |
|---|---|
| Products and service offerings | "What offerings are included in this deal?" |
| External and internal service categories | "How much Cloud revenue is in the pipeline?" |
| Line item values | "What's the breakdown of this opportunity by offering?" |
| Delivery capabilities | "Which deals include Analytics services?" |

---

### Contracts

Active and historical contracts tied to accounts.

| What's Available | Example Questions |
|---|---|
| Contract numbers and status | "What contracts do we have with Acme?" |
| Start and end dates | "Which contracts are expiring in the next 90 days?" |
| Associated accounts and opportunities | "What contract came from this opportunity?" |

---

### DOA Reviews

Deal of Authority reviews for compliance and approval tracking.

| What's Available | Example Questions |
|---|---|
| Review status (approved, pending, etc.) | "Has this deal been DOA approved?" |
| Deal categories | "What type of DOA review was required?" |
| Approval details | "What's the approval status of this opportunity?" |

---

### Account Plans

Strategic plans that define the relationship approach for key accounts.

| What's Available | Example Questions |
|---|---|
| Plan names, status, and ownership | "Who owns the account plan for Acme?" |
| Industry focus | "Show me account plans in Healthcare" |
| Plan status | "Which account plans are currently active?" |

---

### Business Development Plans (Growth Plans)

Growth initiatives and revenue projections associated with account plans.

| What's Available | Example Questions |
|---|---|
| Potential total contract value | "What's the growth potential for this account?" |
| Revenue forecasts and projections | "What revenue is forecast from this growth plan?" |
| Linked opportunities | "Which opportunities are tied to this growth plan?" |

---

### Customer Business Priorities

Strategic priorities and outcomes captured within account plans.

| What's Available | Example Questions |
|---|---|
| Priority names and importance levels | "What are the top priorities for this account?" |
| Timing and expected outcomes | "What business outcomes is this customer focused on?" |

---

### BDP-Opportunity Links

Connections between business development plans and the opportunities they generate.

| What's Available | Example Questions |
|---|---|
| Which growth plans led to which deals | "What opportunities came from this business development plan?" |

---

## How the AI Uses This Data

When a user asks a question, the AI determines which data categories are relevant and calls the appropriate tools on the SFDC UDP server. For example:

- **"Tell me about the Acme account"** — The AI pulls account details, active opportunities, current contracts, and the account plan to build a comprehensive picture.
- **"What's our pipeline for Q3?"** — The AI queries opportunities filtered by close date and aggregates the values.
- **"Which deals include Cloud services?"** — The AI looks at opportunity line items filtered by offering category.

The server handles the complexity of querying the Databricks warehouse — the AI simply describes what it needs, and the server returns structured results.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [SFDC UDP Overview](./) | Introduction to the SFDC UDP MCP Server |
| [Opportunity Management](./opportunity-management) | How to filter, retrieve, and aggregate opportunity data |
| [AI-Powered Search](./ai-search) | How natural language queries are converted to database searches |
