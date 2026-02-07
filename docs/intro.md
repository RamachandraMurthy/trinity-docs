---
sidebar_position: 1
title: Introduction
description: Welcome to the Trinity (WorkSphere) platform documentation
---

# Welcome to Trinity

**Trinity** (branded as **WorkSphere** at [worksphere.dxc.ai](https://worksphere.dxc.ai)) is DXC Technology's enterprise AI assistant platform. It helps Sales and HR teams work smarter by combining conversational AI with access to business data. The platform includes **RFP Advisor** for proposal analysis and **WorkSphere Agents** for autonomous, multi-step AI analysis.

---

## What is Trinity?

Trinity is an intelligent workspace where employees can ask questions in plain English and get answers backed by real data. Instead of navigating multiple systems or running reports, users simply ask:

> "Show me the top performers in the London office"
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

---

## How This Documentation is Organized

This documentation explains how Trinity works at a conceptual level — how the pieces connect and what happens behind the scenes. It's written for people who want to understand the platform without diving into code.

### Understanding the Platform

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | The big picture — how all the parts work together |
| [Frontend](/docs/frontend) | How the user interface is organized |
| [Backend](/docs/backend) | How requests are processed on the server |
| [AI & MCP](/docs/ai-and-mcp) | How the AI connects to business data |
| [Authentication](/docs/authentication) | How login and security work |
| [Data Layer](/docs/data-layer) | Where information is stored |
| [Real-Time](/docs/realtime) | How instant messaging and streaming work |
| [Deployment](/docs/deployment) | How Trinity is hosted and updated |

### For Developers

| Section | What You'll Learn |
|---|---|
| [Developer Guide](/docs/developer-guide) | Setting up a local development environment |
| [API Overview](/docs/api-reference) | What the backend API can do |

### RFP Advisor

| Section | What You'll Learn |
|---|---|
| [RFP Advisor Overview](/docs/rfp-advisor) | How RFP document analysis works |
| [Projects](/docs/rfp-advisor/projects) | How work is organized into projects |
| [Document Processing](/docs/rfp-advisor/file-upload) | How documents are uploaded and converted |
| [Search & Indexing](/docs/rfp-advisor/indexing) | How documents become searchable |

### WorkSphere Agents

| Section | What You'll Learn |
|---|---|
| [Agents Overview](/docs/agents) | How autonomous AI agents work |
| [RFP Advisor Agents](/docs/agents/rfp/requirements-review) | Specialized proposal and RFP analysis agents |
| [Special Agents](/docs/agents/special/deal-qualification) | Sales-focused agents for deals, competitors, and strategy |

### SalesCoach Backend

| Section | What You'll Learn |
|---|---|
| [SalesCoach Overview](/docs/salescoach) | The Python backend for real-time sales coaching |
| [Architecture](/docs/salescoach/architecture) | How the SalesCoach backend is built |
| [7-Step Flow](/docs/salescoach/flow/step1-connect) | How a request flows through the system |

---

## Quick Facts

| Aspect | Details |
|---|---|
| **Production URL** | [worksphere.dxc.ai](https://worksphere.dxc.ai) |
| **User Roles** | Sales, HR, Admin |
| **AI Models** | Azure OpenAI (GPT-4.1), Google Gemini (Agents) |
| **Business Tools** | 15+ MCP servers (HR, Sales, O365, RFP) |
| **WorkSphere Agents** | 15+ specialized analysis agents |
| **Authentication** | Microsoft Azure AD (corporate credentials) |
| **Hosting** | Microsoft Azure (App Service, Cosmos DB) |

---

## Where to Start

**New to Trinity?**
Start with [Platform Overview](/docs/platform/high-level-architecture) to understand how everything connects.

**Interested in the AI?**
Read [AI & MCP Integration](/docs/ai-and-mcp) to learn how Trinity answers questions using business data.

**Working with RFPs?**
Explore the [RFP Advisor](/docs/rfp-advisor) to understand document analysis and proposal workflows.

**Want to understand agents?**
Check [WorkSphere Agents](/docs/agents) to learn how autonomous AI analysis works.

**Curious about security?**
Check [Authentication & Security](/docs/authentication) to understand how access is controlled.

**Setting up development?**
Head to the [Developer Guide](/docs/developer-guide) for local setup instructions.
