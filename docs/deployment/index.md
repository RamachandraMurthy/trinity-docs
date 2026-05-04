---
sidebar_position: 1
title: Deployment & Operations
description: How Trinity is hosted, deployed, and operated — Azure-hosted services, container packaging, and the observability surfaces that watch them
---

# Deployment & Operations

Trinity is a **multi-service, Azure-hosted platform**. Each component (frontend, orchestration, agent runtime, MCP servers, Guardian, mobile) is deployed and operated independently but connected through a shared identity and data plane.

This page describes the deployment shape at a conceptual level — what runs where, how it's packaged, and how it's observed.

---

## What Runs Where

| Component | Hosting |
|---|---|
| **WorkSphere (frontend)** | Azure App Service — static-served from a container |
| **Trinity-core (orchestrator)** | Azure App Service — Python `aiohttp` service with the Claude Agent SDK runtime embedded |
| **Trinity-autonomous (Agent Primus)** | Azure App Service — Python service for long-running autonomous runs |
| **Trinity-guardian** | Azure App Service — separate admin app |
| **MCP servers (15 of them)** | Azure App Service — one service per MCP, mostly Python/FastMCP |
| **AI Agents runtime** | Azure App Service — FastAPI / Google ADK |
| **Daily Brief / Podcast service** | Azure App Service — FastAPI |
| **Trinity Mobile** *(coming soon)* | Will be distributed via app stores (Expo build pipeline) once shipped |

| Data and Infrastructure | Hosting |
|---|---|
| **Cosmos DB** | Azure Cosmos DB |
| **Blob storage** | Azure Blob Storage |
| **Document search** | Azure Cognitive Search |
| **Identity** | Azure Active Directory |
| **Cloud security** | Wiz |
| **Observability** | Dynatrace |

Everything is in Azure with the exception of Wiz and Dynatrace (SaaS), the AWS-hosted Amazon Quick Embedded agent surfaces, and Microsoft 365 (Microsoft-hosted, but conceptually Azure-adjacent).

---

## How Components Are Packaged

Trinity components are packaged as **Docker containers**, with each service in its own image.

| Property | Detail |
|---|---|
| Container per service | Each component (orchestrator, MCP server, Guardian, etc.) ships independently |
| Frontend in Nginx | The WorkSphere static build is served by an Nginx container |
| Python services | Run with their own runtime image, dependencies pinned per service |
| Mobile | Built with Expo and shipped through the app stores rather than containerized |

Containerization gives:

- **Predictable environments** — local, staging, and production look the same
- **Independent release cadence** — orchestration changes do not require redeploying every MCP
- **Failure isolation** — one MCP being unhealthy does not take down the orchestrator

---

## Environments

| Environment | Purpose |
|---|---|
| **Local development** | Engineers run individual services on their workstations; `ignite.ps1` brings up the full stack for end-to-end work |
| **Integration / staging** | Shared environment for cross-component testing |
| **Production** | The live system at [worksphere.dxc.ai](https://worksphere.dxc.ai) |

Each environment has its own Cosmos DB, blob storage, and identity tenant configuration. Environment promotion follows a CI/CD pipeline.

---

## Releases

Each component has its own release cadence. There is no monolithic deployment — Trinity is many independent services that share a contract through MCP and the Azure AD identity model.

| Release Pattern | Where It Applies |
|---|---|
| **Always-current frontend** | WorkSphere ships frequently; the user always gets the latest UI on next page load |
| **Coordinated backend rollouts** | Orchestrator + MCP changes are coordinated when a new tool contract is involved |
| **Independent MCP releases** | Most MCP servers can ship without coordinating with the orchestrator |
| **Mobile app store cadence** | Slower; subject to platform review |

The deck's framing is that the platform is **future-ready** — adding a new MCP server or a new agent pattern follows the same shape as the existing components.

---

## Observability

Three signals matter for operating the platform:

| Signal | Source | What It Surfaces |
|---|---|---|
| **Platform health** | Trinity Guardian | MCP availability, response health, prompt-injection patterns |
| **Cloud security posture** | Wiz | Vulnerability and compliance findings |
| **Runtime telemetry** | Dynatrace | Latency, error rates, throughput per service |

These three are the **Cross-Cutting Controls** in the [Reference Architecture](/docs/platform/reference-architecture). They are not a deployment concern only — they observe the running system across every layer.

For details, see [Authentication, Security & Governance](/docs/authentication).

---

## Resilience and Failure Modes

Trinity's architecture limits the blast radius of any single failure:

| If This Fails... | What Still Works |
|---|---|
| One MCP server down | Other MCPs and chat features that don't need the failed one keep working |
| Orchestrator unhealthy in one region | Other regions continue serving (where regional redundancy is configured) |
| Cosmos DB partitioned | Read paths degrade gracefully; writes queue or fail explicitly |
| Wiz / Dynatrace unavailable | Trinity continues serving users; observability gaps are flagged for follow-up |
| Azure AD outage | Authenticated sessions continue; new sign-ins fail |

The platform is **not** built to operate fully through an Azure outage — it is built to operate within Azure's resilience model and to fail clearly when that model fails.

---

## Local Development

Engineers can run a subset of services locally for component-level work, or the full stack for end-to-end testing.

| Tool | Purpose |
|---|---|
| `ignite.ps1` | Starts all services for full-stack development |
| `ignite.ps1 -Only sfdc, core, worksphere` | Runs a subset for focused work |
| Per-service runners | Each service has its own way to run standalone |

Local development uses real MCP servers (with role gates) but typically points at a development Cosmos DB and identity tenant.

---

## Where to Find Operational Surfaces

| Surface | Audience |
|---|---|
| **Trinity Guardian** | Operations team — security and operations dashboards |
| **Dynatrace** | On-call engineers — runtime telemetry, alerting |
| **Wiz** | Security and compliance — posture and vulnerabilities |
| **Azure portal** | Platform engineers — infrastructure, App Service config, Cosmos provisioning |
| **Azure AD admin** | Identity admins — users, roles, conditional access |

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Reference Architecture](/docs/platform/reference-architecture) | The five layers and the cross-cutting controls |
| [Authentication, Security & Governance](/docs/authentication) | The control plane and security posture |
| [Data Layer](/docs/data-layer) | The data systems behind every service |
| [MCP Integration Layer](/docs/mcp-servers) | The MCP servers that ship as part of every release |
