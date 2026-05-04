---
sidebar_position: 3
title: Chat Skills
description: Pre-defined behavior packs that the orchestrator loads at session start to handle common task types consistently
---

# Chat Skills

**Chat Skills** are pre-defined behavior packs that the [Claude Agent SDK Orchestrator](/docs/backend/claude-agent-sdk-orchestrator) can apply for common task types. A skill is not a tool, not an agent, and not a prompt — it is a focused set of instructions that shapes how the orchestrator handles a particular kind of request.

If a tool is "what the orchestrator can do" and an agent is "a multi-step workflow," a skill is **"how to do this kind of work consistently."**

---

## What a Skill Looks Like

A skill is a small markdown file. Its frontmatter declares the skill's identity; its body describes when and how to apply it.

| Part | Purpose |
|---|---|
| **Name** | Short identifier the SDK uses to reference the skill |
| **Description** | One-line summary that drives skill selection |
| **Body** | Instructions: when this skill applies, what behaviors to follow, what to produce |

Skills are loaded by the SDK at session start via the native `setting_sources: ["user", "project"]` configuration. There is no custom skill loader — Trinity leans on the SDK's built-in mechanism.

---

## Examples of Skills in Use

| Skill | What It Shapes |
|---|---|
| **email-summary** | Reformats a chat response into a clean email body — used when the user clicks the Email Sharing button |
| **trinity-docs-refresh** | The skill used to maintain this documentation site (a project-level skill in the DXC-Trinity workspace) |

The catalog grows as new task patterns emerge. Skills are added without redeploying the orchestrator — drop a skill file in the right directory and it is available the next time a session starts.

---

## Why Skills (and Not Prompts)

Skills exist because **prompt sprawl is the alternative**. Without skills, common task patterns end up duplicated:

- Inline in the system prompt → bloats every conversation
- Repeated by the user each time → fragile, easy to forget
- Implemented as code → requires deploys, less flexible

Skills are the middle ground. They are loaded into the model's context only when relevant, defined in a single source, and editable without code changes.

| Approach | Cost | Flexibility |
|---|---|---|
| Inline in system prompt | Heavy — every conversation pays for it | Low — changing means redeploying |
| Re-stated by the user | Free at rest | Fragile — depends on user remembering |
| Implemented in code | Heavy — deploy required | Low — code change cycle |
| **Skill** | Light — loaded only when relevant | High — file edits, no deploys |

---

## Skill Sources

Skills come from two locations, both loaded by the SDK at session start:

| Source | Path | Purpose |
|---|---|---|
| **Project skills** | `.claude/skills/` in the project workspace | Skills that apply to all users of the project |
| **User skills** | `.claude/skills/` in the user's context path | Skills specific to one user — uploaded via the UI in Agent Primus |

The SDK merges both sources, so a session has both project skills and the user's own skills available.

---

## When the Orchestrator Uses a Skill

The model decides. Skills compete for attention based on their description and the request at hand:

- A request that mentions email sharing surfaces the **email-summary** skill
- A request about a documentation refresh surfaces a docs skill (when present)
- Routine chat questions don't trigger any specific skill — the system prompt handles them

This is selection, not invocation. The orchestrator does not "call a skill" the way it calls a tool. The skill's instructions become part of the model's working context for the duration of the relevant turn.

---

## How Skills and Tools Differ

| Aspect | Skill | Tool (MCP) |
|---|---|---|
| What it is | Instructions / behavior pack | An action that produces data or effect |
| Where it lives | Markdown file | MCP server |
| Invocation | Loaded into model context | Called by the model |
| Output | Shapes the model's response | Returns concrete data or causes an effect |
| Example | "Reformat this for an email" | "Get me the opportunity OPX-12345" |

Skills shape **how** the orchestrator works on a problem. Tools provide **what** the orchestrator can reach. The two are complementary.

---

## Where User Skills Come From

Users can create their own skills through Agent Primus. The flow:

| Step | What Happens |
|---|---|
| 1. User opens "My Skills" in Agent Primus | Surface for managing personal skills |
| 2. User uploads a SKILL.md file | Validated, prompt-guard-scanned, stored at the user's context path |
| 3. Next session start | The SDK auto-discovers the new skill via `setting_sources` |
| 4. Skill is available immediately | No deployment, no orchestrator restart |

The same prompt-injection guardrails that scan user input also scan uploaded skills, so a malicious skill file cannot quietly hijack the orchestrator.

For the agent that hosts user skill management, see Agent Primus under the [Agent & Execution Layer](/docs/agents).

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Orchestration Layer](/docs/backend) | Where skills live in the layer model |
| [Claude Agent SDK Orchestrator](/docs/backend/claude-agent-sdk-orchestrator) | The runtime that loads and applies skills |
| [Personal Memory](/docs/backend/personal-memory) | The other source of per-user context loaded at session start |
| [System Prompt Construction](/docs/ai-and-mcp/system-prompt-construction) | How skills fit alongside the system prompt |
| [Agent & Execution Layer](/docs/agents) | Where Agent Primus lives — the surface for user-skill management |
