---
sidebar_position: 6
title: Win Prediction Service
description: ML-powered prediction engine that calculates win probabilities for Salesforce opportunities
---

# Win Prediction Service

The Win Prediction Service is the machine learning engine that powers win probability predictions across the Trinity ecosystem. It uses segment-specific ML models trained on historical Salesforce data to estimate the likelihood of winning open opportunities.

---

## What It Does

The service provides data-driven win probability predictions:

- **ML-based predictions** — Calculates probability (0-100%) of winning each opportunity
- **Segment-specific models** — Uses dedicated models for each Sales Stage and Opportunity Type combination
- **500+ feature analysis** — Considers financial metrics, account history, deal health, and seller information
- **Automated daily updates** — Runs scheduled batch predictions to keep Salesforce current
- **Delta filtering** — Only updates when predictions change by 10%+ to reduce noise

---

## Where It Fits in Trinity

The Win Prediction Service is the core ML engine that feeds win probability data to multiple Trinity components:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         TRINITY ECOSYSTEM                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────┐                                                   │
│   │  WorkSphere     │◄────── Users ask about win probability            │
│   │  (Chat)         │                                                   │
│   └────────┬────────┘                                                   │
│            │                                                            │
│            ▼                                                            │
│   ┌─────────────────┐                                                   │
│   │  Win/Loss MCP   │◄────── MCP Server exposes predictions to AI       │
│   │  Server         │                                                   │
│   └────────┬────────┘                                                   │
│            │                                                            │
│            ▼                                                            │
│   ┌─────────────────┐                                                   │
│   │  Win Prediction │◄────── Core ML prediction engine (this service)   │
│   │  Service        │                                                   │
│   └────────┬────────┘                                                   │
│            │                                                            │
│            ▼                                                            │
│   ┌─────────────────┐                                                   │
│   │  Salesforce     │◄────── Predictions stored on opportunity records  │
│   └─────────────────┘                                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

| Integration Point | How It Uses Win Prediction Service |
|-------------------|-----------------------------------|
| **Salesforce** | Predictions are written directly to the AI Win Probability field on opportunity records |
| **Win/Loss MCP Server** | Exposes prediction capabilities to the AI via Model Context Protocol |
| **WorkSphere Chat** | Enables sales teams to query win probabilities conversationally |
| **Win Probability Agent** | Uses predictions for detailed factor analysis and recommendations |

---

## How It Works

The service runs as a daily batch process:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SCHEDULED TRIGGER                                                       │
│  Daily batch job initiates prediction cycle                              │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  DATA WAREHOUSE (DATABRICKS)                                             │
│  Retrieves all open opportunities with 500+ feature attributes           │
│  • Financial metrics (TCV, margins)                                      │
│  • Account and seller information                                        │
│  • Deal health checklist scores                                          │
│  • Historical patterns                                                   │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  SEGMENTATION                                                            │
│  Groups opportunities by Sales Stage and Opportunity Type                │
│  Each segment uses a dedicated ML model for higher accuracy              │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  ML PREDICTION ENGINE                                                    │
│  For each segment:                                                       │
│  1. Loads trained model from cloud storage                               │
│  2. Prepares and validates features                                      │
│  3. Runs prediction algorithm                                            │
│  4. Calculates win probability percentage                                │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  DELTA FILTERING                                                         │
│  Compares new predictions to existing values                             │
│  Only includes records with 10%+ change to reduce noise                  │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  SALESFORCE UPDATE                                                       │
│  Pushes updated win probabilities back to Salesforce                     │
│  Sales teams see refreshed AI predictions on their opportunities         │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## The Segmentation Strategy

The service achieves higher accuracy by training separate models for each combination of Sales Stage and Opportunity Type:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SALESFORCE OPPORTUNITY                          │
├─────────────────────────────────────────────────────────────────────────┤
│  Opportunity ID          │  Unique identifier for the deal              │
│  Sales Stage             │  Pipeline stage (Understand → Close)         │
│  Opportunity Type        │  New Work, Renewal, etc.                     │
│  Total Contract Value    │  Financial value of the opportunity          │
│  Deal Health Scores      │  Checklist and qualification metrics         │
│  AI Win Probability      │  ML-predicted win likelihood                 │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     │ Segmented by
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           ML MODEL SEGMENTS                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    │
│   │  Stage 01       │    │  Stage 02       │    │  Stage 03       │    │
│   │  Understand     │    │  Qualify        │    │  Propose        │    │
│   │  Customer       │    │  Opportunity    │    │  Solution       │    │
│   └─────────────────┘    └─────────────────┘    └─────────────────┘    │
│                                                                         │
│   ┌─────────────────┐    ┌─────────────────┐                           │
│   │  Stage 04       │    │  Stage 05       │                           │
│   │  Negotiate &    │    │  Award &        │                           │
│   │  Submit         │    │  Close          │                           │
│   └─────────────────┘    └─────────────────┘                           │
│                                                                         │
│   Each stage has separate models per Opportunity Type:                  │
│   • New Work  • Renewal  • Other Types                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

This approach means a "New Work" deal in the "Qualify" stage uses a model trained specifically on similar deals, rather than a generic model that mixes all deal types together.

---

## What Data It Provides

| Data | Description |
|------|-------------|
| **Win Probability** | Predicted likelihood (0-100%) of winning an open opportunity |
| **Opportunity Details** | Core opportunity information including stage, type, and value |
| **Prediction Confidence** | Model confidence based on historical data match |
| **Segment Classification** | Sales Stage and Opportunity Type used for prediction |

---

## Capabilities

| Capability | Description |
|------------|-------------|
| **Segment-Specific Predictions** | Uses dedicated ML models for each Sales Stage and Opportunity Type combination |
| **Automated Daily Updates** | Runs scheduled batch predictions to keep Salesforce current |
| **Intelligent Feature Analysis** | Considers 500+ opportunity attributes including financials, account history, and deal health |
| **Historical Pattern Matching** | Learns from past won and lost deals to identify success indicators |
| **Delta-Based Updates** | Only updates predictions when significant changes occur (10%+ difference) |
| **Automated Model Selection** | Routes each opportunity to the correct model based on stage and type |
| **Exclusion Handling** | Filters out opportunity types not suitable for prediction |

---

## Excluded Opportunity Types

Some opportunity types are excluded from prediction because they don't fit the model's training data:

- Framework
- Renewal+New Work
- Up Sell

These deal types have different dynamics that the current models aren't trained to predict accurately.

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [Win/Loss Prediction MCP Server](/docs/mcp-servers/opp-win-loss) | The MCP server interface that exposes predictions to the AI |
| [Win Probability Agent](/docs/agents/special/win-probability) | The agent that provides factor analysis and recommendations |
| [SFDC UDP Server](/docs/mcp-servers/sfdc-udp) | How Salesforce opportunity data is accessed |
| [Deal Qualification Agent](/docs/agents/special/deal-qualification) | Comprehensive deal health assessment |
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect AI to business data |
