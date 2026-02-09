---
sidebar_position: 1
title: Daily Recap
description: Personalized voice briefings combining news, campaigns, calendar events, and opportunity updates
---

# Daily Recap

The **Daily Recap** is a personalized voice briefing service that generates on-demand audio podcasts for each user. It combines the latest industry news, marketing campaigns, calendar events, and sales opportunity updates into a 2-3 minute audio message delivered in a conversational, professional tone.

---

## What It Does

When you request your daily recap, the service:

- **Gathers personalized content** — Pulls news, campaigns, calendar, and pipeline updates relevant to you
- **Curates with AI** — Selects the most important and engaging stories from all gathered content
- **Creates a script** — Transforms the curated content into a natural, conversational podcast script
- **Generates audio** — Converts the script to natural-sounding speech
- **Archives for later** — Stores your past 3 podcasts so you can catch up on missed briefings

Each podcast is unique to you — personalized based on your department, region, role, and sales pipeline.

---

## What Data It Combines

The Daily Recap pulls from multiple sources to create a comprehensive briefing:

| Data Type | What It Contains |
|-----------|------------------|
| **Industry News** | Latest AI and technology news from major tech blogs, research sites, and business publications |
| **Campaign Updates** | Active marketing campaigns filtered by your role (sales or marketing) and region |
| **Calendar Events** | Today's meetings with external attendees from your Microsoft 365 calendar |
| **Opportunity Updates** | Recent changes to your sales opportunities including stage movements and amount changes |
| **Department News** | Role-specific news tailored to your department when available |

---

## How It Works

When you request your daily recap, the request flows through several stages:

```
    ┌──────────────────────────┐
    │   YOU REQUEST RECAP      │
    └────────────┬─────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │   AUTHENTICATION         │  Validates your identity,
    │   & CONTEXT EXTRACTION   │  extracts department, role, region
    └────────────┬─────────────┘
                 │
         ┌───────┴───────┐
         │               │
         ▼               ▼
    ┌────────────┐  ┌────────────────────┐
    │   NEWS     │  │   BUSINESS DATA    │
    │   GATHERER │  │   GATHERER         │
    │            │  │                    │
    │ • AI/Tech  │  │ • Campaigns        │
    │   news     │  │ • Opportunities    │
    │ • Dept     │  │ • Calendar events  │
    │   news     │  │                    │
    └─────┬──────┘  └─────────┬──────────┘
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
    ┌──────────────────────────────────────┐
    │          CONTENT CURATOR             │
    │                                      │
    │  AI selects the most relevant and    │
    │  engaging stories, ensuring a        │
    │  balanced mix of news and updates    │
    └────────────────┬─────────────────────┘
                     │
                     ▼
    ┌──────────────────────────────────────┐
    │          SCRIPT WRITER               │
    │                                      │
    │  AI transforms content into a        │
    │  natural, conversational script      │
    │  with smooth transitions             │
    └────────────────┬─────────────────────┘
                     │
                     ▼
    ┌──────────────────────────────────────┐
    │          SPEECH SYNTHESIS            │
    │                                      │
    │  Converts script to natural-sounding │
    │  audio using text-to-speech          │
    └────────────────┬─────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌────────────┐         ┌────────────┐
    │  YOU GET   │         │  ARCHIVE   │
    │  AUDIO     │         │  STORAGE   │
    └────────────┘         └────────────┘
                           Stores for
                           future access
```

---

## How Personalization Works

The service tailors content based on your context:

```
                     YOUR CONTEXT
    ┌─────────────────────────────────────────┐
    │  • Email      • Department              │
    │  • Role       • Region                  │
    └─────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐     ┌─────────┐     ┌─────────┐
    │DEPARTMENT│    │  ROLE   │     │ REGION  │
    │         │     │         │     │         │
    │ Fetches │     │ Filters │     │ Filters │
    │ news    │     │campaigns│     │campaigns│
    │ for your│     │ by type │     │ by      │
    │ function│     │ (sales  │     │geography│
    │         │     │ vs mktg)│     │         │
    └─────────┘     └─────────┘     └─────────┘
```

**Region filtering** applies to campaigns from Americas, Europe, APJ-MEA, and UKI regions.

---

## Podcast Content Structure

Each generated podcast follows a consistent structure:

| Section | Duration | Content |
|---------|----------|---------|
| **Opening** | ~10 seconds | Warm greeting with today's date |
| **News Updates** | ~60 seconds | 2-3 curated news stories with context |
| **Campaign Highlights** | ~45 seconds | Key marketing campaigns relevant to you |
| **Opportunity Summary** | ~30 seconds | Sales pipeline changes (if applicable) |
| **Calendar Preview** | ~15 seconds | Upcoming external meetings (if any) |
| **Closing** | ~10 seconds | Brief sign-off |

Total duration targets 2-3 minutes at natural speaking pace.

---

## Capabilities

| Capability | What It Does |
|------------|--------------|
| **On-demand generation** | Creates a fresh podcast each time you request it, with the latest data |
| **Role-based campaign filtering** | Shows only sales campaigns to sales users and marketing campaigns to marketing users |
| **Region-based filtering** | Filters campaigns to match your geographic region |
| **Department personalization** | Generates news relevant to your specific function |
| **Calendar integration** | Includes today's external meetings to help you prepare |
| **Opportunity tracking** | Summarizes recent pipeline changes, highlighting stage movements |
| **Podcast archival** | Stores dated copies, allowing retrieval of up to the past 3 days |
| **Historical access** | Retrieve previous podcasts if you missed a day |

---

## Data Sources

The Daily Recap connects to several backend systems:

| Source | Data Store | What It Provides |
|--------|------------|------------------|
| News | News Cache | Industry and department-specific news |
| Campaigns | Databricks | Active marketing campaigns by region and role |
| Calendar | Microsoft Graph | Today's meetings with external attendees |
| Opportunities | Databricks | Sales pipeline changes and stage movements |
| Archive | Azure Blob Storage | Past podcast audio files |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers](/docs/mcp-servers) | How data connectors provide business information |
| [O365 MCP Server](/docs/mcp-servers/o365) | How calendar data is accessed |
| [Campaign MCP Server](/docs/mcp-servers/campaign) | How campaign data is retrieved |
| [SFDC UDP Server](/docs/mcp-servers/sfdc-udp) | How opportunity data is accessed |
| [AI & Models](/docs/ai-and-mcp) | How AI curation and script generation work |
| [Backend](/docs/backend) | How the backend coordinates data requests |
