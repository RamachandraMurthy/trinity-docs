---
sidebar_position: 2
title: Win Probability
description: ML-based prediction of deal success with factor analysis
---

# Win Probability Agent

The Win Probability Agent uses machine learning to predict the likelihood of winning opportunities. It provides data-driven probability scores with explanations of what's helping and hurting your chances.

---

## What It Does

Get objective, data-driven predictions for your opportunities:

- **ML-powered predictions** — Probability based on historical patterns
- **Factor breakdown** — What's helping and hurting your chances
- **Portfolio analysis** — When analyzing multiple deals, see pipeline health
- **Actionable recommendations** — What to do to improve your odds

---

## How It Works

```
Enter Opportunity ID(s)
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│  1. CALL PREDICTION SERVICE                                 │
│                                                             │
│  Send opportunity IDs to the ML prediction model            │
│  (via MCP integration with external service)                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  2. RECEIVE PREDICTIONS                                     │
│                                                             │
│  For each opportunity:                                      │
│  • Win probability (0-100%)                                 │
│  • Confidence score                                         │
│  • Positive factors with impact                             │
│  • Negative factors with impact                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  3. ANALYZE AND REPORT                                      │
│                                                             │
│  Generate insights:                                         │
│  • Category (High/Medium/Low probability)                   │
│  • Key recommendations                                      │
│  • Portfolio-level analysis (for batch)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## What You Get

### For Each Opportunity

**Win Probability** — Percentage with category:
- **HIGH** (above 60%) — Strong position, focus on execution
- **MEDIUM** (40-60%) — Competitive, actions can make a difference
- **LOW** (below 40%) — Significant obstacles, consider resources carefully

**Confidence Level** — How certain the model is about this prediction

**Positive Factors** — What's working in your favor:
> "Deal size fit: +15% impact"
> "Strong client relationship: +12% impact"

**Negative Factors** — What's working against you:
> "Competitive pressure: -8% impact"
> "Timeline concerns: -5% impact"

**Recommendations** — Specific actions to improve your odds

### For Multiple Opportunities (Portfolio Analysis)

When you analyze several deals at once:

- **Distribution** — How many in High/Medium/Low categories
- **Pipeline Value** — Total value by probability category
- **Pipeline Health Score** — Overall portfolio strength (0-100)
- **Focus Areas** — Where to concentrate effort

---

## Probability Categories

| Category | Range | What It Means |
|---|---|---|
| **High** | 60%+ | Strong position — focus on flawless execution |
| **Medium** | 40-60% | Competitive situation — your actions matter |
| **Low** | Under 40% | Uphill battle — consider if resources are justified |

---

## Understanding the Factors

The ML model identifies what's influencing each prediction:

**Common Positive Factors:**
- Deal size matches your sweet spot
- Strong existing relationship
- Solution fit to requirements
- Favorable competitive position
- Clear decision process

**Common Negative Factors:**
- Strong incumbent relationship
- Aggressive competitors
- Budget constraints
- Timeline pressure
- Complex decision committee

Each factor includes an impact percentage showing how much it affects the overall probability.

---

## Batch Processing

Analyze your entire pipeline at once:
- Submit up to 50 opportunity IDs in one request
- Get individual predictions for each
- Plus portfolio-level insights
- Identify which deals need attention

---

## When to Use It

| Situation | Use Win Probability? |
|---|---|
| Prioritizing where to focus sales effort | Yes |
| Pipeline review meetings | Yes |
| Resource allocation decisions | Yes |
| Comparing to sales team gut feel | Yes |
| Understanding why a deal is risky | Yes |
| Detailed RFP requirements analysis | No — use Requirements Review |

---

## Important Notes

**Predictions are probabilistic** — A 70% probability means about 7 out of 10 similar deals would win, not that this specific deal is 70% certain.

**Model accuracy** — The report includes model version and historical accuracy metrics so you can calibrate expectations.

**Complement, don't replace** — Use alongside sales team judgment, not as a replacement. The model sees patterns in data but may miss context the team knows.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Win/Loss Prediction MCP Server](/docs/mcp-servers/opp-win-loss) | The MCP server that provides the ML predictions |
| [SFDC UDP MCP Server](/docs/mcp-servers/sfdc-udp) | Salesforce opportunity data used for predictions |
| [Deal Qualification](/docs/agents/special/deal-qualification) | Complete qualification assessment |
| [Competitor Analysis](/docs/agents/special/competitor-analysis) | Deep dive on competition |
| [WorkSphere Agents Overview](/docs/agents) | How all agents work |
