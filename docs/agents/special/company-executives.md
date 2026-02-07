---
sidebar_position: 3
title: Company Executives
description: Research client leadership with web-integrated AI
---

# Company Executives Agent

The Company Executives Agent researches the leadership team of a target company. It uses web search to gather current information about executives, helping you understand who the decision makers are and how to engage them.

---

## What It Does

Before engaging with a client, understand their leadership:

- **Identify key executives** — Who leads the organization
- **Research backgrounds** — Previous roles, education, known priorities
- **Analyze patterns** — Common themes in leadership style and focus
- **Suggest engagement strategies** — How to approach each stakeholder

---

## How It Works

This agent uses **web search integration** to gather current information:

```
Enter Company Name
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│  1. COMPANY RESEARCH                                        │
│                                                             │
│  Gather general company information:                        │
│  • Industry and market position                             │
│  • Recent news and developments                             │
│  • Organizational structure                                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  2. EXECUTIVE SEARCH                                        │
│                                                             │
│  Search for leadership team using web search:               │
│  • C-suite executives                                       │
│  • Relevant VP-level leaders                                │
│  • Key decision makers for your area                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  3. EXECUTIVE ANALYSIS                                      │
│                                                             │
│  Build profiles for each executive:                         │
│  • Professional background                                  │
│  • Known priorities and initiatives                         │
│  • Communication style indicators                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  4. ENGAGEMENT STRATEGY                                     │
│                                                             │
│  Recommendations for approaching:                           │
│  • Key talking points per executive                         │
│  • Relationship building opportunities                      │
│  • Potential concerns to address                            │
└─────────────────────────────────────────────────────────────┘
```

---

## What You Get

**Company Overview** — Brief summary of the organization, industry, and recent developments

**Executive Profiles** — For 8-12 key executives:
- Name and title
- Professional background
- Previous roles and companies
- Education
- Known priorities and initiatives
- Public statements or interviews (when available)

**Leadership Analysis** — Patterns across the leadership team:
- Common backgrounds or experiences
- Shared priorities and focus areas
- Organizational culture indicators

**Engagement Recommendations** — How to approach the team:
- Key talking points that resonate
- Potential concerns to address proactively
- Relationship building opportunities
- Who might be champions vs. skeptics

---

## When to Use It

| Situation | Use Company Executives? |
|---|---|
| Preparing for initial client meeting | Yes |
| Major proposal to new client | Yes |
| Stakeholder mapping for large deal | Yes |
| Understanding client decision makers | Yes |
| Analyzing RFP requirements | No — use Requirements Review |
| Assessing deal probability | No — use Win Probability |

---

## Input

Unlike most agents that work from project documents, this agent takes a **company name** as input:

> "Acme Corporation"
> "First National Bank"
> "Global Manufacturing Inc."

The more specific the name, the better the results. Include qualifiers if the name is common (e.g., "Acme Corp Chicago" vs. just "Acme").

---

## Important Notes

**Information currency** — Results are based on publicly available information. Recent executive changes may not be reflected immediately.

**Scope** — Focuses on publicly available information. Won't find internal organizational details that aren't public.

**Verification** — Use this as a starting point, then verify through your own channels and LinkedIn research.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Stakeholder Analysis](/docs/agents/rfp/technical-and-planning) | Detailed stakeholder mapping from RFP |
| [Competitor Analysis](/docs/agents/special/competitor-analysis) | Understanding competitors |
| [WorkSphere Agents Overview](/docs/agents) | How all agents work |
