---
sidebar_position: 1
title: Authentication, Security & Governance
description: How Trinity handles login and identity, role-based access, and the cross-cutting control plane that wraps every layer
---

# Authentication, Security & Governance

This section covers three related concerns:

| Concern | What It Means |
|---|---|
| **Authentication** | How a user proves who they are |
| **Authorization** | What that user is allowed to do (role-based access) |
| **Governance** | The cross-cutting control plane that observes, enforces, and reports across every layer |

Together these are how Trinity stays trustworthy — the user is who they say they are, sees only what they should see, and every meaningful action is observed.

---

## Authentication — How Users Sign In

Trinity uses **Microsoft Azure Active Directory** (Azure AD / Entra ID) for authentication. There is no Trinity-specific username or password.

| Property | Detail |
|---|---|
| Identity source | Azure AD (corporate credentials) |
| Password handling | Trinity never sees or stores passwords |
| MFA | Enforced by Azure AD policy |
| Token format | JWT, validated on every request |
| Refresh | Tokens refresh silently in the background |

This means:

- A user signs in with the same credentials they use across DXC Microsoft 365
- MFA, conditional access, and corporate sign-in policy are inherited from Azure AD
- Account suspensions in Azure AD propagate to Trinity automatically

### The Sign-In Flow

```
┌──────────────────────────┐
│  USER OPENS TRINITY      │   Browser loads the app
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  CHECK SESSION           │   App: "is this user already
│                          │   signed in?"
└────────────┬─────────────┘
             ▼
       ┌─────┴─────┐
       │ NOT SIGNED │   ──── REDIRECT TO MICROSOFT ────▶  Azure AD
       │ IN         │                                     login surface
       └─────┬─────┘                                       │
             │                                              ▼
             │                                       MFA, policy
             │                                              │
             ▼                                              │
┌──────────────────────────┐  ◀── tokens issued ────────────┘
│  SIGNED IN               │
│                          │   Trinity reads role, identity,
│                          │   tenant from the JWT
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  EXPERIENCE LAYER        │   Role-aware UI is rendered
│  RENDERS                 │
└──────────────────────────┘
```

Azure AD is the single source of truth for identity. Trinity does not duplicate it.

---

## Authorization — Role-Based Access

Identity tells Trinity **who** the user is. Authorization decides **what they can do**.

The model is **role-based**, with roles read from the JWT at session start.

| Layer of Enforcement | What It Filters |
|---|---|
| **Experience Layer** | Hides surfaces the role does not have access to (e.g. an HR user does not see Sales-only features) |
| **Orchestration Layer** | Registers only role-allowed MCPs and agents as tools — there is nothing for the model to bypass |
| **MCP Integration Layer** | Per-server role gates as a defense-in-depth layer |
| **Agent & Execution Layer** | Agents inherit the same role constraints as chat — agents do not get expanded access |

### Why Structural Enforcement Matters

Role checks at the door are easy to forget or bypass. **Structural enforcement** means the unauthorized capability never enters the runtime. A Sales user's session never holds an HR-only tool reference. A request to a tool that is not registered fails at the SDK level, not at a custom check.

This is the design pattern that lets Trinity stay safe without policy code in every component.

---

## The Control Plane (Cross-Cutting Controls)

Beyond per-request authentication and authorization, **four controls wrap every layer of the platform**. They are the deck's "Cross-Cutting Controls."

```
                  CONTROL PLANE
   ┌────────────────────────────────────────────┐
   │  Trinity Guardian · Guardrails / Rules     │
   │  Wiz · Dynatrace                           │
   └────────────────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
   Experience    Orchestration    Agents · MCPs · Data
```

### Trinity Guardian

The command center for security and operations.

| Capability | What It Watches |
|---|---|
| MCP availability monitoring | Are servers up? Are responses healthy? |
| Platform health tracking | Overall service health across components |
| Prompt-injection detection | Patterns in user input that look like injection attempts |
| Threat Monitor | A dedicated UI surface for reviewing alerts |
| Response verification | A dedicated UI surface for verifying response quality |

Trinity Guardian is a **standalone admin app** — separate from the user-facing WorkSphere. It is the surface where the operations team sees what the platform is doing.

### Guardrails / Rules (Prompt Guard)

The policy-enforcement layer.

| Capability | When Applied |
|---|---|
| Pre-tool-call checks | Before MCP tools fire |
| Pre-response checks | Before responses are returned to the user |
| Pre-persistence checks | Before data is written |
| Injection-pattern scanning | At multiple scan points across the request lifecycle |
| Spike / offender / volume alerts | Higher-level alerting from accumulated events |

Policy is defined in policy files, not code. Updating policy does not require a deploy.

### Wiz

Cloud security posture and vulnerability monitoring.

| Capability | Why |
|---|---|
| Security posture monitoring | Visibility into our service activity |
| Vulnerability detection | Identifying environmental issues before exploitation |
| Compliance signals | Compliance-relevant findings surfaced for review |

### Dynatrace

Observability and runtime telemetry.

| Capability | Why |
|---|---|
| Server behavior tracking | Latency, error rates, throughput |
| App health monitoring | Faster detection of runtime issues |
| Operational telemetry | Strengthens platform runtime observability |

---

## What the Control Plane Produces

The four controls together produce:

| Output | Audience |
|---|---|
| **Dashboards** | Operations team — at-a-glance health |
| **Alerts** | On-call engineers — issues needing response |
| **Metrics** | Engineering and product teams — trends |
| **Compliance signals** | Security and compliance teams — audit material |

---

## Where Security Events Live

A unified **security-events** store in Cosmos DB receives events from every part of the platform. Trinity Guardian reads from it; alerting pipelines read from it; audit reviews read from it.

| Source | Event Type |
|---|---|
| Orchestrator | Prompt-guard hits, policy denials |
| Agent Primus | Bash sandbox blocks, path-traversal attempts, upload rejections |
| MCP layer | Unusual access patterns |
| Authentication | Sign-in failures, token issues |

One store, many writers, one reader. This is what lets the security picture stay coherent.

---

## Practical Implications

| Property | Result |
|---|---|
| **Identity is corporate** | Onboarding and offboarding follow Azure AD lifecycle, not Trinity-specific provisioning |
| **Roles are JWT-driven** | Role updates take effect at the next session start, not require a re-login flow |
| **Access is structural** | A capability the role does not have is never registered — there is nothing to abuse |
| **Policy is declarative** | Updating guardrails does not require a code change |
| **Every action is observed** | The control plane sees every request; gaps are operational mistakes, not architectural ones |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Reference Architecture](/docs/platform/reference-architecture) | Where the control plane sits in the layer model |
| [Orchestration Layer](/docs/backend) | Where role-aware routing is enforced |
| [MCP Integration Layer](/docs/mcp-servers) | Per-server role gates |
| [Agent Primus (Autonomous)](/docs/agents/autonomous-agent-primus) | Security model for the most open-ended agent |
| [Data Layer](/docs/data-layer) | Where security events are persisted |
