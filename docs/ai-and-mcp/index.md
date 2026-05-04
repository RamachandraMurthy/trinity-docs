---
sidebar_position: 1
title: AI & Models
description: The AI models that power Trinity — which agents use which models, why, and how the system prompt is assembled
---

# AI & Models

Trinity's intelligence comes from several AI models, chosen for different jobs. The platform is **deliberately multi-model** — chat orchestration, autonomous task execution, pipeline agents, and lightweight utility tasks each use the model that fits best.

This section explains which models are in use today, what they do, and how the system prompt that governs every conversation is assembled.

---

## Models in Use

| Model | Where It's Used | Why |
|---|---|---|
| **Claude (Anthropic)** | The Claude Agent SDK Orchestrator (chat); Claude Agent SDK Agents; Agent Primus (Autonomous) | Native tool use, skills, streaming, and personal-memory loading; the SDK shapes how the orchestrator and most agent patterns behave |
| **Claude Haiku** | Lightweight gates — Prompt Guard scans, memory updates, Agent Primus estimator | Fast, cheap, and accurate for short reasoning tasks |
| **Google Gemini (via Google ADK)** | Daily Brief / Podcast pipeline; some Special and RFP Agents | Strong fit for orchestrated multi-stage pipelines; good ecosystem support in Google ADK |
| **Purpose-built ML models** | Win Probability and similar predictive agents | Accuracy on a tuned dataset beats general models for narrow predictions |

The mix evolves over time. The platform is structured so that adding or replacing a model in one pattern does not affect the others.

---

## Which Pattern Uses Which Model

| Agent Pattern | Model |
|---|---|
| Purpose-Built | Tuned ML models (e.g. Win Probability) |
| Google ADK | Google Gemini |
| Claude Agent SDK | Claude (via Claude Agent SDK) |
| Amazon Quick Embedded | Whatever the embedded surface uses (vendor-controlled) |
| Autonomous (Agent Primus) | Claude (planning); Claude Haiku (estimator gate) |

For the patterns themselves, see [Agent Strategy](/docs/agents/agent-strategy).

---

## How Models Are Reached

Trinity does not call models from arbitrary places. Two primary paths:

| Path | Used By |
|---|---|
| **Claude Agent SDK** | The orchestrator, Claude-based agents, and Agent Primus all reach Claude through the SDK |
| **Google ADK** | Gemini-based agents reach Gemini through the ADK |

The orchestration layer never makes raw API calls to a model — it always goes through one of these SDKs. This keeps tool use, streaming, and policy enforcement consistent.

---

## The System Prompt

Every conversation starts with a **system prompt** that tells the model what it is, what it can do, and what rules apply. The system prompt is **not a single static file** — it is assembled per session from several sources:

- The base orchestrator prompt
- Role-specific instructions (Sales, HR, etc.)
- The list of MCP tools available to this user
- Loaded chat skills
- The user's Personal Memory (per-user CLAUDE.md)
- Any active workspace context

For the full assembly model, see [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction).

---

## Why a Multi-Model Strategy

Trinity could have standardized on one provider. It didn't, for three reasons:

| Reason | Detail |
|---|---|
| **Different work needs different models** | Conversational orchestration, pipeline agents, and predictive scoring each have different requirements. A model great for one is mediocre for another. |
| **Vendor risk** | Multi-model means no single vendor can hold the platform hostage on pricing or availability. |
| **Best-of-breed for each job** | Claude is strong on reasoning, tool use, and skill-following. Gemini is strong on Google ADK pipeline orchestration. Tuned ML models beat general models on narrow predictions. |

The trade-off is operational complexity — multiple SDKs, multiple credentials, multiple cost centers. The platform pays that cost intentionally.

---

## What Users See

None of this. The Experience Layer abstracts the model choice. A user asks a question; an answer comes back. The user does not need to know whether Claude, Gemini, or a tuned model produced it.

The model **does** affect:
- Response style and tone
- How the model handles tool calls
- How well it follows the loaded skills

But the user does not pick the model — the architecture does, based on what surface or agent is involved.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How the system prompt is assembled per session |
| [Orchestration Layer](/docs/backend) | The Claude Agent SDK Orchestrator that powers chat |
| [Agent Strategy](/docs/agents/agent-strategy) | The five agent patterns and which models they use |
| [Agent Primus (Autonomous)](/docs/agents/autonomous-agent-primus) | Claude-based open-ended task execution |
| [Daily Recap](/docs/daily-recap) | The Gemini-powered audio briefing flow |
