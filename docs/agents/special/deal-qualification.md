---
sidebar_position: 1
title: Deal Qualification
description: AI agent that assesses deal health using opportunity data
---

# Deal Qualification Agent

The Deal Qualification Agent connects to business data systems to assess whether a deal should be pursued. It analyzes opportunity data and provides a structured recommendation: pursue, don't pursue, or pursue with conditions.

---

## What It Does

When you need to decide whether to invest resources in an opportunity, this agent:

- **Fetches opportunity data** — Pulls information from Databricks (deal health scores, stage, amount, probability)
- **Evaluates deal health** — Analyzes key indicators and trends
- **Assesses risks** — Identifies potential obstacles and mitigation strategies
- **Makes a recommendation** — Provides a clear pursue/don't pursue decision with rationale

---

## How It Works

Unlike most agents that analyze documents, the Deal Qualification Agent connects to external data sources:

```
Enter Opportunity ID
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│  1. FETCH DATA                                              │
│                                                             │
│  Pull opportunity information from Databricks:              │
│  • Deal stage (active, won, lost)                           │
│  • Amount and close date                                    │
│  • Historical health scores                                 │
│  • DOA review status                                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  2. CLASSIFY STAGE                                          │
│                                                             │
│  Is this an active opportunity?                             │
│  • ACTIVE → Continue to full assessment                     │
│  • WON/LOST → Skip assessment, provide summary              │
└──────────────────────────┬──────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
    [ACTIVE DEALS]               [WON/LOST DEALS]
            │                             │
            ▼                             ▼
┌───────────────────────┐    ┌────────────────────────────────┐
│  3. FULL ASSESSMENT   │    │  ABBREVIATED REPORT            │
│                       │    │                                │
│  • Deal health score  │    │  Stage confirmation and        │
│  • Win probability    │    │  historical summary only       │
│  • Risk analysis      │    │                                │
│  • Recommendations    │    │                                │
└───────────────────────┘    └────────────────────────────────┘
```

---

## What You Get

### For Active Opportunities

The report includes:

**Executive Summary** — Quick overview of the opportunity and key metrics

**Opportunity Overview** — ID, name, account, stage, amount, close date, current probability

**Deal Health Analysis** — Score out of 100 with breakdown:
- Competitive position
- Solution fit
- Client relationship
- Decision process clarity

**Win Probability Assessment** — Current probability with positive and negative factors

**Risk Assessment** — Table of risks with impact, probability, and mitigation strategies

**Qualification Decision** — One of:
- **PURSUE** — Green light to invest resources
- **DO NOT PURSUE** — Exit the opportunity
- **PURSUE WITH CONDITIONS** — Proceed only if specific conditions are met

### For Won/Lost Opportunities

A brief summary confirming the final stage and noting that no further qualification action is needed.

---

## When to Use It

| Situation | Use Deal Qualification? |
|---|---|
| Deciding whether to bid on a new opportunity | Yes |
| Quarterly pipeline review | Yes |
| Opportunity has stalled — should we continue? | Yes |
| Deal already closed (won or lost) | Will provide summary only |
| Need document analysis (RFP review) | No — use RFP-focused agents |

---

## Data Sources

The agent connects to Databricks SQL Warehouse to access:

| Data | What It Contains |
|---|---|
| **Opportunity data** | Name, account, stage, amount, close date, probability |
| **DOA reviews** | Approval status, risk level, reviewer comments |
| **Deal health checks** | Health score, competitive position, solution fit, relationship strength |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Win Probability](/docs/agents/special/win-probability) | ML-based probability predictions |
| [WorkSphere Agents Overview](/docs/agents) | How all agents work |
