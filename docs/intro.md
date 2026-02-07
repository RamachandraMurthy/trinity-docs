---
sidebar_position: 1
title: Introduction
description: Welcome to the Trinity (WorkSphere) platform documentation
---

# Welcome to Trinity

**Trinity** (branded as **WorkSphere** at [worksphere.dxc.ai](https://worksphere.dxc.ai)) is DXC Technology's enterprise AI assistant platform. It helps Sales and HR teams work smarter by combining conversational AI with access to business data.

---

## What is Trinity?

Trinity is an intelligent workspace where employees can ask questions in plain English and get answers backed by real data. Instead of navigating multiple systems or running reports, users simply ask:

> "Show me the top performers in the London office"
> "What's on my calendar this week?"
> "How is our pipeline looking for Q4?"

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
| **AI Model** | Azure OpenAI (GPT-4.1 Mini) |
| **Business Tools** | 15+ MCP servers (HR, Sales, O365) |
| **Authentication** | Microsoft Azure AD (corporate credentials) |
| **Hosting** | Microsoft Azure (App Service, Cosmos DB) |

---

## Where to Start

**New to Trinity?**
Start with [Platform Overview](/docs/platform/high-level-architecture) to understand how everything connects.

**Interested in the AI?**
Read [AI & MCP Integration](/docs/ai-and-mcp) to learn how Trinity answers questions using business data.

**Curious about security?**
Check [Authentication & Security](/docs/authentication) to understand how access is controlled.

**Setting up development?**
Head to the [Developer Guide](/docs/developer-guide) for local setup instructions.
