---
sidebar_position: 1
title: Introduction
description: Welcome to the Trinity (WorkSphere) platform documentation
---

# Welcome to Trinity

**Trinity** (branded as **WorkSphere** at [worksphere.dxc.ai](https://worksphere.dxc.ai)) is DXC Technology's AI-native enterprise platform — a central place for Sales and HR teams to access everything they need to be more productive. It combines conversational AI with real-time business data, MCP servers, autonomous AI agents, and more — all through a single, intelligent interface.

---

## What is Trinity?

Trinity is an intelligent workspace where employees can ask questions in plain English and get answers backed by real data. Instead of navigating multiple systems or running reports, users simply ask:

> "Give me the opportunity details for OPX-12345"
> "What's on my calendar this week?"
> "How is our pipeline looking for Q4?"
> "Analyze this RFP for compliance gaps"
> "What's the win probability for this deal?"

Trinity connects to HR systems, sales data, Microsoft 365, and more — all through a single, conversational interface.

### Key Capabilities

**Conversational AI**
Ask questions naturally. Trinity understands context, remembers your conversation, and provides relevant answers.

**Business Data Access**
Trinity connects to specialized tools that access employee data, sales pipelines, calendars, email, and more. You don't need to know where the data lives.

**Role-Based Experience**
Sales users see sales features. HR users see HR features. The interface adapts to your role automatically.

**Visual Workspace**
Beyond chat, Trinity offers an infinite canvas where you can save insights, organize research, and build visual layouts.

**Team Collaboration**
Group chat rooms let teams work together with AI assistance available to everyone.

**RFP Advisor**
Upload RFP documents, extract requirements, search across proposals, and analyze documents through multiple AI chat interfaces.

**WorkSphere Agents**
Run specialized AI agents that perform in-depth analysis — from deal qualification and win probability to competitive intelligence and compliance review. Agents work in the background and generate detailed reports.

**Daily Recap**
Get personalized audio briefings that combine the latest industry news, marketing campaigns, calendar events, and sales opportunity updates into a 2-3 minute voice message tailored to your role and region.

---

## How This Documentation is Organized

This documentation explains how Trinity works at a conceptual level — how the pieces connect and what happens behind the scenes. It's written for people who want to understand the platform without diving into code.

### Platform & Architecture

| Section | What You'll Learn |
|---|---|
| [Architecture](/docs/platform/high-level-architecture) | The big picture — how all the parts work together |
| [Frontend](/docs/frontend) | How the user interface is organized |
| [Real-Time & WebSocket](/docs/realtime) | How instant messaging and streaming work (under Frontend) |
| [Daily Recap](/docs/daily-recap) | Personalized voice briefings combining news, calendar, and pipeline updates |
| [Backend](/docs/backend) | How requests are processed on the server |
| [Orchestration (SalesCoach)](/docs/salescoach) | The real-time AI orchestration engine (under Backend) |

### AI & Integration

| Section | What You'll Learn |
|---|---|
| [AI & Models](/docs/ai-and-mcp) | How Trinity's AI brain works — models, prompts, and reasoning |
| [MCP Servers](/docs/mcp-servers) | The 15+ business tools the AI connects to |

### WorkSphere Agents

| Section | What You'll Learn |
|---|---|
| [Agents Overview](/docs/agents) | How autonomous AI agents work and which to choose |
| [Special Agents](/docs/agents/special/deal-qualification) | Sales-focused agents for deals, competitors, and strategy |
| [RFP Agents](/docs/rfp-advisor) | RFP project setup and document analysis agents |

### Infrastructure & Security

| Section | What You'll Learn |
|---|---|
| [Authentication & Security](/docs/authentication) | How login and security work |
| [Data Layer](/docs/data-layer) | Where information is stored |
| [Deployment & DevOps](/docs/deployment) | How Trinity is hosted and updated |

### For Developers

| Section | What You'll Learn |
|---|---|
| [Developer Guide](/docs/developer-guide) | Setting up a local development environment |
| [API Reference](/docs/api-reference) | What the backend API can do |

---

## Quick Facts

| Aspect | Details |
|---|---|
| **Production URL** | [worksphere.dxc.ai](https://worksphere.dxc.ai) |
| **User Roles** | Sales, HR |
| **AI Models** | Azure OpenAI (GPT-4.1), Google Gemini (2.5 Flash) |
| **Business Tools** | 15+ MCP servers (HR, Sales, O365, RFP) |
| **WorkSphere Agents** | 17+ specialized analysis agents |
| **Authentication** | Microsoft Azure AD (corporate credentials) |
| **Hosting** | Microsoft Azure (App Service, Cosmos DB) |

---

## Where to Start

**New to Trinity?**
Start with [Architecture](/docs/platform/high-level-architecture) to understand how everything connects.

**Interested in the AI?**
Read [AI & Models](/docs/ai-and-mcp) to learn how Trinity answers questions using business data.

**Want to understand the tools?**
Explore [MCP Servers](/docs/mcp-servers) to see the 15+ business tools the AI connects to.

**Working with RFPs?**
Check the [RFP Agents](/docs/rfp-advisor) section for document analysis and proposal workflows.

**Want to understand agents?**
Check [WorkSphere Agents](/docs/agents) to learn how autonomous AI analysis works.

**Curious about security?**
Check [Authentication & Security](/docs/authentication) to understand how access is controlled.

**Setting up development?**
Head to the [Developer Guide](/docs/developer-guide) for local setup instructions.
