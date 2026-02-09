---
sidebar_position: 6
title: Client Profile
description: AI agent that researches companies and generates comprehensive client profiles
---

# Client Profile Agent

The Client Profile Agent is an AI-powered research agent that autonomously gathers intelligence about companies to help sales teams prepare for client engagements. Given a company name, the agent searches the web for current information, pulls data from enterprise sources, and synthesizes everything into a comprehensive profile report.

---

## What It Does

Get comprehensive company intelligence for sales preparation:

- **Autonomous research** — Searches the web for current company information
- **Enterprise data integration** — Pulls contract history, IT spending, and opportunity data
- **15-section profiles** — Generates detailed reports covering business, technology, operations, and engagement opportunities
- **Parallel processing** — Multiple sub-agents work simultaneously for faster results
- **Sales-focused insights** — Identifies opportunities where DXC services can add value

---

## The 15 Research Areas

The agent produces a comprehensive profile covering up to 15 research areas. You can select which sections to include based on your needs:

| Category | Research Area | What's Included |
|----------|---------------|-----------------|
| **Business Intelligence** | Company Overview | Industry, size, headquarters, revenue, executives, products/services |
| | Financial Overview & SEC Filings | Revenue trends, growth rates, profitability, investments, acquisitions |
| | Market Position and Competitors | Market share, primary competitors, unique differentiators |
| **Technology & Risk** | Technology Landscape | Current tech stack, digital infrastructure, transformation initiatives |
| | Cybersecurity & Risk Profile | Security posture, known incidents, compliance certifications |
| | Legal Matters & Compliance | Regulatory environment, legal proceedings, compliance requirements |
| **Operations** | Business Challenges and Pain Points | Key challenges, operational inefficiencies, publicly reported issues |
| | Leadership Intelligence | Executive team profiles, recent leadership changes |
| | Press Releases & Communications | Recent announcements, partnerships, major initiatives |
| | Outsourcing & Vendor Relationships | Current vendor ecosystem, outsourcing engagements |
| | Recent News and Developments | Latest news, press coverage, industry mentions |
| **Enterprise Data** | Customer Contract Portfolio | Historical contract data from subscription sources |
| | IT Spends Analysis | Technology spending patterns and trends |
| | Opportunities Overview | Active opportunities from Salesforce (DXC internal) |
| | Potential Opportunities for Engagement | Recommended DXC services based on identified gaps |

---

## How It Works

When you request a client profile, the agent orchestrates multiple research tasks in parallel:

```
    ┌──────────────────────────┐
    │   YOU ENTER COMPANY      │
    │   NAME & SELECT AREAS    │
    └────────────┬─────────────┘
                 │
                 ▼
    ┌──────────────────────────────────────────────┐
    │           CLIENT PROFILE AGENT               │
    │          (Main Orchestrator)                 │
    └────────────┬─────────────────────────────────┘
                 │
    ┌────────────┴────────────────────────────────┐
    │        PARALLEL RESEARCH PHASE              │
    │                                             │
    │  ┌──────────────┐  ┌──────────────┐        │
    │  │ Core Business│  │ Technology & │        │
    │  │ Intelligence │  │ Risk Analysis│        │
    │  └──────┬───────┘  └──────┬───────┘        │
    │         │                 │                 │
    │  ┌──────────────┐                          │
    │  │ Business     │                          │
    │  │ Operations   │                          │
    │  └──────┬───────┘                          │
    │         │                                   │
    │         └─────────┬───────────────────────  │
    │                   ▼                         │
    │           Web Search (current data)         │
    └─────────────────────────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────────────────┐
    │         ENTERPRISE DATA PHASE               │
    │                                             │
    │  ┌──────────────┐  ┌──────────────┐        │
    │  │ Contract     │  │ IT Spends    │        │
    │  │ Analysis     │  │ Analysis     │        │
    │  └──────────────┘  └──────────────┘        │
    │                                             │
    │  ┌──────────────┐                          │
    │  │ Opportunities│                          │
    │  │ Analysis     │                          │
    │  └──────────────┘                          │
    │                                             │
    │        Enterprise Data Sources              │
    └─────────────────────────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────────────────┐
    │        SYNTHESIS & VALIDATION               │
    │                                             │
    │  Report Synthesizer → Quality Assurance     │
    │  (Combines findings)   (Validates report)   │
    └────────────┬────────────────────────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │   YOU RECEIVE PROFILE    │
    │   WITH INSIGHTS          │
    └──────────────────────────┘
```

The parallel architecture means the agent can gather intelligence from multiple sources simultaneously, significantly reducing the time needed to produce a complete profile.

---

## What You Get

**15-Section Comprehensive Report** including:

- **Business Intelligence** — Company overview, financials, market position
- **Technology & Risk Assessment** — Tech stack, security posture, compliance
- **Operations Analysis** — Challenges, leadership, vendor relationships
- **Enterprise Data Integration** — Contract history, IT spending, active opportunities
- **Engagement Recommendations** — Where DXC services can address client needs

---

## Capabilities

| Capability | Description |
|------------|-------------|
| **Autonomous Research** | Searches the web for current company information without manual intervention |
| **Dynamic Section Selection** | Choose which of the 15 research areas to include in your report |
| **Parallel Intelligence Gathering** | Multiple sub-agents work simultaneously to speed up research |
| **Enterprise Data Integration** | Pulls contract history, IT spending, and opportunity data from internal systems |
| **Current Information** | Targets recent data by searching for information from the current time period |
| **Quality Validation** | Built-in quality assurance checks ensure report consistency and accuracy |
| **Sales-Focused Insights** | Identifies specific opportunities where DXC services can address client needs |

---

## When to Use It

| Situation | Use Client Profile? |
|-----------|---------------------|
| Preparing for a new client meeting | Yes |
| Researching a prospect before outreach | Yes |
| Building an account plan | Yes |
| Understanding a client's technology landscape | Yes |
| Analyzing a competitor | No — use [Competitive Intelligence](/docs/agents/special/competitive-intelligence) |
| RFP-based competitor analysis | No — use [Competitor Analysis](/docs/agents/special/competitor-analysis) |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [Competitive Intelligence Agent](/docs/agents/special/competitive-intelligence) | How to analyze competitors for battle planning |
| [Market Intelligence MCP Server](/docs/mcp-servers/market-intelligence) | External IT spend and vendor contract data |
| [SFDC UDP Server](/docs/mcp-servers/sfdc-udp) | How Salesforce opportunity data is accessed |
| [WorkSphere Agents Overview](/docs/agents) | How all agents work |
