---
sidebar_position: 2
title: Agent Strategy
description: The five agent patterns Trinity supports — what each is for, what they share, and why the platform exposes more than one
---

# Agent Strategy

Trinity supports **five agent patterns**. They are different runtimes, suited to different kinds of work, but they share **one execution model** — discoverable in Agent Space, run in the background, tracked in Run Space, audited consistently.

This page explains each pattern: what it is, what it's for, and how it fits the platform.

---

## The Five Patterns at a Glance

| Pattern | Built On | Best For |
|---|---|---|
| Purpose-Built | Workflow-specific code | Focused, packaged outcomes |
| Google ADK | Google ADK + Gemini | Orchestrated multi-step pipelines (Daily Brief) |
| Claude Agent SDK | Claude Agent SDK | Native, conversation-aware agents |
| Amazon Quick Embedded | Iframe integration with AWS-hosted spaces | External agent surfaces brought into WorkSphere |
| Autonomous (Agent Primus) | Claude Agent SDK + MCP servers | Open-ended task execution, deliverable generation |

---

## Purpose-Built Agents {#purpose-built}

**Purpose-Built Agents** are focused on specific business workflows and packaged for targeted outcomes. They are not built on a general framework — they are designed end-to-end for one job.

| Aspect | Detail |
|---|---|
| **Use case** | Predictive models, deterministic workflows, scoring engines |
| **Examples** | Win Probability (ML model), parts of Deal Qualification |
| **Trade-off** | High accuracy for the specific job; less flexible |

Why this pattern exists: some work is better served by a tuned model than a general-purpose agent. A win-probability prediction needs an ML model trained on historical deal data — not a conversational agent reasoning from first principles.

---

## Google ADK Agents {#google-adk}

**Google ADK Agents** are built using the Google Agent Development Kit and run on Gemini. They are typically composed as multi-step pipelines, where each step is itself an agent contributing to a larger flow.

| Aspect | Detail |
|---|---|
| **Use case** | Orchestrated pipelines with several specialized stages |
| **Examples** | Daily Brief / Podcast (news gather → curate → script → audio); most Special Agents and RFP Agents |
| **Trade-off** | Strong pipeline orchestration; runs separately from the chat experience |

Why this pattern exists: when work breaks down naturally into stages — research, then synthesize, then format — pipeline orchestration is the right tool. Google ADK provides that primitive cleanly.

---

## Claude Agent SDK Agents {#claude-agent-sdk}

**Claude Agent SDK Agents** are built natively on the same Claude Agent SDK that powers Trinity's [Orchestration Layer](/docs/backend). They are modeled and aligned to the platform's orchestration model — so they reuse the same tool, skill, and memory machinery that chat uses.

| Aspect | Detail |
|---|---|
| **Use case** | Conversation-aware agents that need full access to MCPs, skills, and personal memory |
| **Examples** | Embedded conversational agents inside WorkSphere; the Trinity-core SDK-native agent runtime |
| **Trade-off** | Tight integration with the orchestration layer; lower latency than ADK; requires fitting into the SDK's model |

Why this pattern exists: when an agent needs the same context the chat experience has — same skills, same MCP access, same memory — building it on the same SDK eliminates parallel implementations.

---

## Amazon Quick Embedded Agents {#amazon-quick}

**Amazon Quick Embedded Agents** are external AWS-hosted agent spaces, surfaced inside WorkSphere via iframe-based integration. The agent runs on Amazon's infrastructure; the user interacts with it through the Trinity Experience Layer.

| Aspect | Detail |
|---|---|
| **Use case** | Agent experiences that already exist on AWS or that benefit from AWS-native services |
| **Examples** | Embedded Amazon Q surfaces, partner-hosted analytical agents |
| **Trade-off** | Reuses external work without rebuilding; sandboxed inside an iframe; data flows are bounded by the embedding contract |

Why this pattern exists: Trinity does not need to own every agent. When AWS or a partner already runs the right agent, embedding is faster than reimplementation. The iframe contract keeps the security boundary clear.

---

## Autonomous Agents (Agent Primus) {#autonomous}

**Autonomous Agents** — known internally as **Agent Primus** — are built on the Claude Agent SDK with full access to existing MCP servers. They are designed for **broader task execution** and **deliverable generation** (Word, PowerPoint) using approved templates.

| Aspect | Detail |
|---|---|
| **Use case** | Multi-step open-ended tasks; deliverable generation; user-extensible workflows |
| **Examples** | "Build a client briefing deck for Acme Corp"; "Research and write a competitive landscape brief"; user-uploaded skills running on a long-form task |
| **Trade-off** | Most general-purpose pattern; longest-running; most policy/guardrail surface |

Why this pattern exists: chat answers questions in seconds; pipeline agents produce structured reports in minutes; **autonomous agents** plan and execute open-ended work that may take longer and produce richer deliverables. They are the platform's surface for "do this complete piece of work for me."

For the full Agent Primus story, see [Agent Primus](/docs/agents/autonomous-agent-primus).

---

## What All Five Patterns Share

The patterns differ in runtime and use case, but they share a single execution model:

| Shared | Detail |
|---|---|
| **Discovered through Agent Space** | One catalog, regardless of pattern |
| **Launched the same way** | Inputs, run, status |
| **Tracked in Run Space** | Same record format, same audit trail |
| **Reach enterprise data through MCPs** | No pattern bypasses the MCP layer |
| **Subject to role-aware routing** | Same roles, same access gates as chat |
| **Observed by the Control Plane** | Trinity Guardian, Guardrails, Wiz, Dynatrace |

This shared model is what lets users not have to think about which pattern an agent uses. The architectural diversity is invisible at the surface.

---

## When to Use Which Pattern

The platform team decides which pattern is right for a new agent. The user picks an agent by what it does, not how it's built. But for architectural awareness:

| If the agent... | Pattern fit |
|---|---|
| Is a predictive model with a tuned dataset | Purpose-Built |
| Is a multi-stage pipeline (research → analyze → format) | Google ADK |
| Needs the same conversation context, skills, and memory as chat | Claude Agent SDK |
| Already exists on AWS or works best there | Amazon Quick Embedded |
| Needs to plan, execute, and produce open-ended deliverables | Autonomous (Agent Primus) |

---

## Future Direction

The five-pattern model is **future-ready**. Three directions the architecture supports:

- **More autonomous workflows.** Agent Primus is the first autonomous pattern; the architecture is shaped to support more.
- **More embedded partner surfaces.** Amazon Quick Embedded is one example; the iframe integration model can extend to other partners.
- **More user-extensible behavior.** User-uploaded skills already personalize Agent Primus; this expands as users define more of their own working patterns.

What is **not** the direction: rebuilding everything on one framework. The five-pattern flexibility is intentional. Different work benefits from different runtimes.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Agent & Execution Layer](/docs/agents) | The layer overview and the agent catalog |
| [Agent Primus (Autonomous)](/docs/agents/autonomous-agent-primus) | Deep on the autonomous pattern |
| [Agent Space & Runs](/docs/frontend/agent-space) | The Experience surface where users encounter agents |
| [Daily Recap](/docs/daily-recap) | An example Google ADK agent flow |
| [Orchestration Layer](/docs/backend) | The Claude Agent SDK runtime that backs two of the patterns |
| [MCP Integration Layer](/docs/mcp-servers) | How agents reach enterprise data |
