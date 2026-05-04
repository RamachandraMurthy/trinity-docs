---
sidebar_position: 1
title: Introduction
description: Welcome to the Trinity (WorkSphere) platform documentation
---

# Welcome to Trinity

**Trinity** (branded as **WorkSphere** at [worksphere.dxc.ai](https://worksphere.dxc.ai)) is DXC Technology's role-aware AI workspace. It brings **conversational, collaborative, and agent-driven** work into a single experience for Sales and HR users today, with an architecture designed to extend to other domains over time.

This documentation is the canonical reference for the platform — written for technical product managers, solutions architects, team leads, and anyone who needs to understand how Trinity is put together at a conceptual level.

---

## What is Trinity?

Trinity is an intelligent workspace where employees ask questions in natural language and get answers backed by real enterprise data. Instead of navigating multiple systems or running reports, users simply ask:

> "Give me the opportunity details for OPX-12345"
> "What's on my calendar this week?"
> "How is our pipeline looking for Q4?"
> "Analyze this RFP for compliance gaps"
> "Generate a client briefing deck for Acme Corp"

Trinity reaches HR systems, sales data, Microsoft 365, search indexes, and more — all through a single, conversational interface, governed by the user's role.

---

## Three Core Experiences

Trinity exposes three first-class experiences, all running on the same orchestration layer:

| Experience | What It's For |
|---|---|
| **Single-User Workspace** | Personal chat-and-voice interaction — the fastest path from question to answer |
| **AI Canvas** | A shared project workspace where multiple participants collaborate, with prompts, responses, and run history visible to everyone |
| **Agent Space & Runs** | A catalog where users discover, launch, and track AI agents that perform deeper, multi-step analysis and produce structured deliverables |

A companion **Trinity Mobile** app — *in development, coming soon* — will extend the Single-User Workspace to phones, with voice input and a mobile-tuned chat UI.

---

## Built on the Five-Layer Architecture

Every component in Trinity belongs to exactly one of five layers, with a control plane wrapping all of them:

| Layer | What Lives There |
|---|---|
| **Experience** | Single-User Workspace, AI Canvas, Agent Space & Runs |
| **Orchestration** | The Claude Agent SDK Orchestrator — role-aware routing, session and context handling, response composition |
| **Agent & Execution** | Five agent patterns sharing one execution model: Purpose-Built · Google ADK · Claude Agent SDK · Amazon Quick Embedded · Autonomous (Agent Primus) |
| **MCP Integration** | The standard access layer — every connection to enterprise systems goes through an MCP server |
| **Enterprise Data** | Databricks UDP, Power BI, Azure Cognitive Search, Office 365, Account Directory, Cosmos DB |

| Cross-Cutting Controls | Role |
|---|---|
| **Trinity Guardian** | Command center for security and operations |
| **Guardrails / Rules** | Policy enforcement and response shaping |
| **Wiz** | Cloud security posture and vulnerability monitoring |
| **Dynatrace** | Observability and runtime telemetry |

The full picture is in [Reference Architecture](/docs/platform/reference-architecture).

---

## How This Documentation is Organized

This documentation explains how Trinity works at a **conceptual level** — how the pieces connect and what happens behind the scenes. It is written for people who want to understand the platform without diving into code.

### Architecture (start here)

| Page | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | The 60-second summary of what Trinity delivers |
| [Reference Architecture](/docs/platform/reference-architecture) | The five layers and the control plane in detail |
| [User Interaction Model](/docs/platform/user-interaction-model) | The four-step flow from user request to persisted response |
| [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) | The detailed nine-band lifecycle a request passes through |

### Layer-by-Layer Detail

| Section | What You'll Learn |
|---|---|
| [Experience Layer](/docs/frontend) | Single-User Workspace, AI Canvas, Agent Space & Runs, real-time streaming (Trinity Mobile coming soon) |
| [Orchestration Layer](/docs/backend) | The Claude Agent SDK Orchestrator, role-aware routing, session and context handling, chat skills, Personal Memory |
| [Agent & Execution Layer](/docs/agents) | The five agent patterns — including the WorkSphere Special Agents and RFP Agents |
| [MCP Integration Layer](/docs/mcp-servers) | All internal and external MCP servers and the role-based exposure model |

### Governance, Security & Operations

| Section | What You'll Learn |
|---|---|
| [Authentication & Security](/docs/authentication) | Azure AD sign-in, role-based access, the control plane |
| [Data Layer](/docs/data-layer) | Where information is stored — Cosmos DB, blob storage, search indexes |
| [Deployment & DevOps](/docs/deployment) | How Trinity is hosted and updated |

---

## Quick Facts

| Aspect | Details |
|---|---|
| **Production URL** | [worksphere.dxc.ai](https://worksphere.dxc.ai) |
| **User Roles** | Sales, HR (extensible) |
| **Surfaces** | Web (browser); Trinity Mobile companion app coming soon |
| **Authentication** | Microsoft Azure AD (corporate credentials) |
| **Hosting** | Microsoft Azure |
| **Orchestration foundation** | Claude Agent SDK (Anthropic Claude Agent SDK) |
| **Data access standard** | MCP (Model Context Protocol) |
| **Observability** | Trinity Guardian · Wiz · Dynatrace |

---

## Where to Start

**New to Trinity?**
Start with [Platform Overview](/docs/platform/high-level-architecture) — one page, the whole picture.

**Want the architecture in detail?**
Read [Reference Architecture](/docs/platform/reference-architecture) for the five layers and control plane.

**Curious how a request flows?**
[User Interaction Model](/docs/platform/user-interaction-model) is the four-step summary; [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) goes deep.

**Want to understand the agents?**
[Agent & Execution Layer](/docs/agents) covers the five agent patterns and which to use when.

**Working with RFPs?**
RFP Agents and the RFP Advisor workflow live under [Agent & Execution Layer](/docs/agents).

**Curious about security and governance?**
[Authentication & Security](/docs/authentication) covers Azure AD, role-based access, and the cross-cutting control plane.
