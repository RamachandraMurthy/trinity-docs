---
sidebar_position: 1
title: WorkSphere Agents
description: How autonomous AI agents work in the Trinity platform
---

# WorkSphere Agents

**WorkSphere Agents** are specialized AI systems that perform complex, multi-step analysis tasks. Unlike real-time chat (which answers questions immediately), agents run in the background and produce detailed reports — perfect for deep analysis that requires examining documents thoroughly.

---

## What Agents Do

When you need more than a quick answer, agents provide comprehensive analysis:

- **Analyze entire documents** — Read through RFPs, proposals, and supporting materials
- **Execute multi-step workflows** — Multiple analysis phases build on each other
- **Generate detailed reports** — Structured findings, recommendations, and action items
- **Run in the background** — Continue working while agents analyze

---

## How Agents Differ from Chat

| Aspect | Chat | Agents |
|---|---|---|
| **Response time** | Seconds | Minutes |
| **Complexity** | Single question → answer | Multi-phase analysis pipeline |
| **Output** | Conversational response | Structured report |
| **Document handling** | Context snippets | Full document analysis |
| **Best for** | Quick lookups, Q&A | Deep analysis, strategic recommendations |

---

## How Agents Work

Each agent follows a consistent execution pattern:

```
┌─────────────────────────────────────────────────────────────┐
│  1. SELECT AGENT                                            │
│                                                             │
│  User chooses an agent and selects a project to analyze     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  2. LOAD DOCUMENTS                                          │
│                                                             │
│  Project documents are retrieved and prepared for analysis  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  3. EXECUTE PIPELINE                                        │
│                                                             │
│  Multiple sub-agents run in sequence, each performing       │
│  a specific analysis task and passing results forward       │
│                                                             │
│    Agent 1 → Agent 2 → Agent 3 → ... → Final Agent          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  4. FORMAT REPORT                                           │
│                                                             │
│  Results are compiled into a professional, consistent       │
│  format with executive summary and actionable insights      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  5. NOTIFY USER                                             │
│                                                             │
│  Status changes to "completed" and report is available      │
└─────────────────────────────────────────────────────────────┘
```

---

## Agent Categories

### RFP Advisor Agents

Specialized for proposal and RFP workflows — these are the original agents built for the RFP Advisor platform:

| Agent | What It Does |
|---|---|
| [Requirements Review](/docs/agents/rfp/requirements-review) | Extracts and analyzes RFP requirements |
| [Response Review](/docs/agents/rfp/response-review) | "Red team" quality review of proposal responses |
| [Requirements-Response Strategy](/docs/agents/rfp/requirements-response-strategy) | Comprehensive gap analysis and win strategy |
| [Compliance & Contracts](/docs/agents/rfp/compliance-and-contracts) | Regulatory and contract risk assessment |
| [Proposal Scoring](/docs/agents/rfp/proposal-scoring) | Multi-dimension scoring matrix |
| [Technical & Planning](/docs/agents/rfp/technical-and-planning) | Architecture review, timeline, stakeholder analysis |

### Special Agents

Agents that help Sales teams with deal analysis, competitive intelligence, and strategic planning. More agents will be added to this category over time:

| Agent | What It Does |
|---|---|
| [Deal Qualification](/docs/agents/special/deal-qualification) | Assesses deal health using opportunity data from Databricks |
| [Win Probability](/docs/agents/special/win-probability) | ML-based prediction of deal success with factor analysis |
| [Company Executives](/docs/agents/special/company-executives) | Research on client leadership with web integration |
| [Competitor Analysis](/docs/agents/special/competitor-analysis) | Competitive intelligence and positioning strategy |
| [Pricing Strategy](/docs/agents/special/pricing-strategy) | Cost analysis, TCO modeling, and pricing recommendations |

---

## The Sequential Pipeline Pattern

Most agents are built as **sequential pipelines** — a series of specialized sub-agents that execute in order, each building on the previous output.

For example, a 4-agent Requirements Review pipeline:

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Document     │───>│ Requirements │───>│ Strategic    │───>│ Executive    │
│ Loader       │    │ Extraction   │    │ Analysis     │    │ Report       │
│              │    │              │    │              │    │ Compiler     │
│ Reads docs,  │    │ Identifies   │    │ Evaluates    │    │ Creates      │
│ extracts key │    │ requirements │    │ complexity,  │    │ final report │
│ information  │    │ and terms    │    │ recommends   │    │ with summary │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

This pattern allows each sub-agent to focus on one task while the pipeline produces comprehensive analysis.

---

## Agent Run Status

When you run an agent, it goes through these states:

| Status | What It Means |
|---|---|
| **Pending** | Agent queued, waiting to start |
| **Running** | Analysis in progress |
| **Completed** | Done — report available |
| **Failed** | Something went wrong (error details available) |

The Agent Runs page shows all your past and current runs with their status, allowing you to monitor progress and access completed reports.

---

## Report Format

All agent reports follow a consistent structure:

- **Executive Summary** — Key findings at a glance
- **Detailed Analysis** — Section-by-section findings
- **Recommendations** — Actionable next steps
- **Supporting Data** — Tables, scores, and evidence
- **Metadata Footer** — Agent used, documents analyzed, execution time

Reports are formatted professionally with clear headings, bullet points, and tables for easy scanning.

---

## Choosing the Right Agent

| If You Need To... | Use This Agent |
|---|---|
| Understand what the RFP is asking for | Requirements Review |
| Check your proposal for weaknesses | Response Review |
| Build a complete win strategy | Requirements-Response Strategy |
| Assess contract risks | Compliance & Contracts |
| Know your competition | Competitor Analysis |
| Understand client leadership | Company Executives |
| Get a win probability | Win Probability |
| Evaluate pricing options | Pricing Strategy |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [RFP Advisor Agents](/docs/agents/rfp/requirements-review) | Detailed docs on each RFP-focused agent |
| [Special Agents](/docs/agents/special/deal-qualification) | Detailed docs on each special agent for Sales teams |
| [RFP Advisor](/docs/rfp-advisor) | How to set up projects and documents |
| [AI & MCP](/docs/ai-and-mcp) | How agents fit in the AI architecture |
