---
sidebar_position: 5
title: Win/Loss Prediction Server
description: MCP server that predicts win/loss probability for sales opportunities using machine learning models
---

# Opportunity Win/Loss Prediction MCP Server

## Overview

The **Opportunity Win/Loss Prediction MCP Server** is a Model Context Protocol (MCP) server that predicts the likelihood of winning an open sales opportunity. It leverages a machine learning model that has been trained on historical Salesforce (SFDC) data and is refreshed regularly to stay current with evolving sales patterns.

This server is part of the Trinity platform's data layer. When a user asks something like "What are the chances we win opportunity OPX-0021366460?", the AI calls this MCP server. The server fetches the opportunity's details from the UDP (Unified Data Platform — a Databricks data warehouse containing SFDC data), passes those details to the ML model, and returns a win probability percentage that Trinity then displays to the user.

---

## What Data It Provides

The server draws from the following data sources to produce its predictions:

| Dataset | What It Contains |
|---------|------------------|
| **Opportunity Records (from UDP)** | SFDC opportunity data stored in the Unified Data Platform (Databricks), including identifiers, financials, sales stage, deal health scores, and account details |
| **ML Prediction Model** | A machine learning model trained on historical SFDC win/loss outcomes, organized by opportunity type (e.g., New Logo, Renewal, Up Sell) and sales stage, refreshed regularly |
| **Feature Lists** | Curated lists of the most predictive fields used by each model variant |

---

## Data Model

The prediction depends on matching an opportunity's type and stage to the correct model variant. The opportunity record is fetched from UDP, and its type and stage determine which model and feature list to use:

```
                        ┌──────────────────────────────────┐
                        │    SFDC DATA (stored in UDP)      │
                        ├──────────────────────────────────┤
                        │  • Opportunity ID                 │
                        │  • Sales Stage                    │
                        │  • Opportunity Type               │
                        │  • Account Name                   │
                        │  • TCV / ABR (financials)         │
                        │  • Deal Health Scores             │
                        │  • Close Date                     │
                        │  • Historical win/loss outcomes   │
                        └────────────────┬─────────────────┘
                                         │
            ┌────────────────────────────┴────────────────────────────┐
            │                                                         │
            ▼                                                         ▼
    ┌───────────────────────────┐                     ┌───────────────────────────┐
    │   ML PREDICTION MODEL     │                     │       FEATURE LIST        │
    ├───────────────────────────┤                     ├───────────────────────────┤
    │  • Trained on historical  │                     │  • Selected field names   │
    │    SFDC win/loss data     │                     │  • One per type + stage   │
    │  • One per type + stage   │                     │  • Filters the record     │
    │  • Refreshed regularly    │                     │    for prediction         │
    └───────────────────────────┘                     └───────────────────────────┘
```

The opportunity types include Framework, New Logo, New Work, Renewal, Renewal+New Work, and Up Sell. Each type is further divided by sales stage (e.g., Understand Customer, Validate Opportunity), and each combination has its own dedicated model and feature list.

---

## How It Works

When a user asks about an opportunity's win probability, the request flows through the system like this:

```
    ┌──────────┐
    │   USER   │
    └────┬─────┘
         │ "What are the chances we win OPX-0021366460?"
         ▼
    ┌──────────┐
    │ TRINITY  │  Understands the question, determines
    └────┬─────┘  it needs a win/loss prediction
         │
         ▼
    ┌─────────────────────────────┐
    │  WIN/LOSS PREDICTION       │  Receives the opportunity ID
    │  MCP SERVER                │
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────────┐
    │     UDP      │  Unified Data Platform (Databricks)
    │  (SFDC data) │  containing SFDC opportunity records
    └────┬─────────┘
         │
         │ Returns the opportunity details
         ▼
    ┌─────────────────────────────┐
    │  WIN/LOSS PREDICTION       │  Identifies the opportunity type
    │  MCP SERVER                │  and sales stage from the record
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────────┐
    │  ML MODEL    │  Pre-trained on historical SFDC data,
    │              │  selects model variant for type + stage
    └────┬─────────┘
         │
         │ Returns win probability
         ▼
    ┌─────────────────────────────┐
    │  WIN/LOSS PREDICTION       │  Formats the prediction result
    │  MCP SERVER                │
    └────┬────────────────────────┘
         │
         ▼
    ┌──────────┐
    │ TRINITY  │  Displays the win percentage
    └────┬─────┘  to the user
         │
         ▼
    ┌──────────┐
    │   USER   │  "This opportunity has a 75% win
    └──────────┘   probability based on current data."
```

---

## Capabilities

The server provides one focused capability:

| Capability | What It Does |
|------------|--------------|
| **Win probability prediction** | Accepts an opportunity ID, fetches its details from UDP (SFDC data in Databricks), passes them to the ML model trained on historical win/loss outcomes, and returns a win probability percentage |

The prediction covers all major opportunity types — Framework, New Logo, New Work, Renewal, Renewal+New Work, and Up Sell — and adapts to the current sales stage of the deal. The underlying ML model is refreshed regularly to reflect the latest historical patterns from SFDC.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [Win Probability Agent](/docs/agents/special/win-probability) | WorkSphere agent that uses this server for ML-based predictions |
| [Deal Qualification Agent](/docs/agents/special/deal-qualification) | Agent that assesses deal health using opportunity data |
| [SFDC UDP Server](/docs/mcp-servers/sfdc-udp) | The primary Salesforce data server |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
