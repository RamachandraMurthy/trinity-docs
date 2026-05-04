---
sidebar_position: 1
title: Platform Overview
description: What Trinity (WorkSphere) delivers — a role-aware AI workspace for conversational, collaborative, and agent-driven work
---

# Platform Overview

> **Production Brand:** WorkSphere — [worksphere.dxc.ai](https://worksphere.dxc.ai)

**Trinity (WorkSphere)** is DXC Technology's role-aware AI workspace. It brings conversational, collaborative, and agent-driven work into a single experience, available to Sales and HR users today and extensible to other domains over time.

This page is the conceptual entry point. It answers **what Trinity is**, **what users do with it**, **how it is put together at a high level**, and **what value it delivers**. The next three pages in this section go deeper: the [Reference Architecture](/docs/platform/reference-architecture) names the layers, the [User Interaction Model](/docs/platform/user-interaction-model) shows how a single request flows, and the [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) walks through every stage in detail.

---

## What It Is

Trinity is a **role-aware AI workspace** with three defining characteristics:

- **Conversational** — users ask questions in natural language, by typing or by voice
- **Collaborative** — work isn't limited to a single chat thread; multiple people can share a workspace and see each other's prompts, responses, and run history
- **Agent-driven** — beyond chat, the platform exposes a catalog of AI agents that perform deeper, multi-step analysis and produce structured deliverables

It supports Sales and HR users today. The architecture is intentionally domain-neutral so additional roles and business areas can be added without re-platforming.

---

## Core Experiences

Trinity surfaces three primary experiences to users:

| Experience | What It Is |
|---|---|
| **Single-User Workspace** | The default chat-and-voice interaction. One user, one conversation, real-time streaming responses. Used for quick lookups and Q&A. |
| **AI Canvas** | A shared project workspace for multi-user collaboration. Multiple participants share prompts, responses, and run history. Role-aware access controls who sees what. |
| **Agent Space & Runs** | A catalog where users discover agents, launch them with input, and track long-running analyses. Outputs land back in the workspace as structured reports or deliverables. |

These three experiences sit on top of a single orchestration layer, so context, role, and history follow the user across them.

---

## Core Architecture Model

At a high level Trinity is built on **one common orchestration layer**, with a control plane that decides what each user can do and what data they can reach.

```
┌─────────────────────────────────────────────────────────────┐
│                  EXPERIENCE LAYER                           │
│   Single-User Workspace · AI Canvas · Agent Space & Runs    │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              ORCHESTRATION LAYER                            │
│   Claude Agent SDK Orchestrator · Role-Aware Routing         │
│   Session/Context Handling · Response Composition           │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│           AGENT & EXECUTION LAYER                           │
│   Five agent patterns: Purpose-Built · Google ADK ·         │
│   Claude Agent SDK · Amazon Quick Embedded · Autonomous      │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│           MCP INTEGRATION LAYER                             │
│   Internal MCP Servers · External / Shared MCP Servers      │
│   Role-Based Console Exposure                               │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│           ENTERPRISE DATA LAYER                             │
│   Databricks UDP · Power BI · Azure Cognitive Search ·      │
│   Office 365 · Account Directory · Cosmos DB                │
└─────────────────────────────────────────────────────────────┘

      Cross-cutting controls (Control Plane):
      Trinity Guardian · Guardrails / Rules · Wiz · Dynatrace
```

Three things to understand from this picture:

1. **One orchestration layer serves every experience.** Whether the user is in chat, in an AI Canvas, or running an agent, requests flow through the same orchestrator. That keeps behavior, security, and observability consistent.
2. **MCP is the standard access layer.** Every connection to enterprise data, tools, and actions goes through an MCP (Model Context Protocol) server. There is no ad-hoc backend code reaching directly into databases.
3. **The control plane wraps everything.** Trinity Guardian, Guardrails, Wiz, and Dynatrace operate across all layers — they are not bolted onto one component.

The next page, [Reference Architecture](/docs/platform/reference-architecture), names every box in this diagram and explains what each layer does in detail.

---

## What It Enables

Trinity is built so the platform can grow. Today's capabilities and tomorrow's both rest on the same foundation.

| Capability Today | What It Means |
|---|---|
| **Faster access to enterprise knowledge** | Users get answers from sales, HR, and shared systems in seconds, without learning each system's UI |
| **More governed and consistent responses** | Every response goes through the same role-aware routing and guardrails — fewer surprises, easier audit |
| **Agents with full enterprise context** | Agents reach the same MCP servers as chat, so they have the same governed access to data and tools |
| **Personalization without re-training** | Personal Memory captures user-specific preferences and reuses them across sessions |
| **Deliverable generation** | Autonomous agents produce PowerPoint and Word outputs from approved templates — not just text |

| Future Direction | What's Coming |
|---|---|
| **Broader autonomous workflows** | Agents executing multi-step plans across multiple MCPs |
| **More role coverage** | Additional business domains beyond Sales and HR |
| **Embedded external agents** | Agent spaces hosted by partner platforms (e.g. Amazon Quick) embedded back into WorkSphere |

---

## Why This Matters

Three reasons the architecture is shaped this way:

- **Unifies user experience and orchestration.** Chat, canvas, and agents share one orchestration model, so users learn one platform — not three.
- **Scales across roles and business domains.** Role-aware routing means new domains plug in without redesigning the whole system.
- **Supports both current workflows and future agentic capabilities.** Today's chat use cases and tomorrow's autonomous workflows share the same MCP and execution layers.

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

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Reference Architecture](/docs/platform/reference-architecture) | The five-layer model named in detail, including the control plane |
| [User Interaction Model](/docs/platform/user-interaction-model) | The four-step flow from user request to persisted response |
| [End-to-End Request Lifecycle](/docs/platform/end-to-end-request-lifecycle) | A detailed walkthrough of every stage a request passes through |
| [Experience Layer](/docs/frontend) | What users see — Single-User Workspace, AI Canvas, Agent Space & Runs |
| [Orchestration Layer](/docs/backend) | How the orchestrator routes, composes, and persists |
| [Agent & Execution Layer](/docs/agents) | The five agent patterns and how they run |
| [MCP Integration Layer](/docs/mcp-servers) | How Trinity reaches enterprise systems |
| [Governance & Operations](/docs/authentication) | Trinity Guardian, Guardrails, Wiz, Dynatrace |
