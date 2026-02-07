---
sidebar_position: 1
title: Deployment & Infrastructure
description: How Trinity is built, deployed, and hosted
---

# Deployment & Infrastructure

Trinity runs as a cloud application on Microsoft Azure. This section explains how the application is packaged, deployed, and managed in production.

---

## How Trinity is Packaged

Trinity uses **Docker containers** — a way of packaging applications so they run consistently anywhere.

### What is a Container?

Think of a container like a shipping container for software:
- Everything the application needs is packed inside
- It runs the same way on any computer that supports containers
- No "it works on my machine" problems

### Two Containers

Trinity is split into two containers:

**Frontend Container**
- Contains the web interface (HTML, CSS, JavaScript)
- Uses Nginx (a lightweight web server) to serve files
- What users' browsers connect to directly

**Backend Container**
- Contains the processing engine (Node.js server)
- Handles all business logic and AI coordination
- Connects to databases and external services

```
┌────────────────────────────────────────────────────────────┐
│                     TRINITY DEPLOYMENT                     │
│                                                            │
│  ┌─────────────────────┐    ┌─────────────────────────┐    │
│  │ Frontend Container  │    │ Backend Container       │    │
│  │                     │    │                         │    │
│  │  ┌───────────────┐  │    │  ┌───────────────────┐  │    │
│  │  │    Nginx      │  │    │  │    Node.js        │  │    │
│  │  │  Web Server   │  │    │  │    Express        │  │    │
│  │  └───────────────┘  │    │  └───────────────────┘  │    │
│  │  ┌───────────────┐  │    │                         │    │
│  │  │ Static Files  │  │    │  Connects to:           │    │
│  │  │ (React app)   │  │    │  • Azure OpenAI         │    │
│  │  └───────────────┘  │    │  • Cosmos DB            │    │
│  │                     │    │  • MCP Servers          │    │
│  └─────────────────────┘    └─────────────────────────┘    │
│                                                            │
│           Hosted on Azure App Service                      │
└────────────────────────────────────────────────────────────┘
```

---

## Where Trinity Runs

### Azure App Service

Both containers run on **Azure App Service** — Microsoft's platform for hosting web applications. App Service provides:

- **Automatic scaling** — If traffic increases, more capacity is added
- **High availability** — If one server fails, others keep running
- **Managed infrastructure** — Microsoft handles the underlying servers
- **Security** — Built-in protection and monitoring

### Supporting Services

Trinity also uses:

| Service | Purpose |
|---|---|
| **Azure Cosmos DB** | Database for chat history, notifications, workspaces |
| **Azure Blob Storage** | File storage for images and documents |
| **Azure OpenAI** | AI model hosting |
| **Azure Active Directory** | User authentication |
| **Azure Cognitive Services** | Speech-to-text for voice input |

All these services are managed by Azure, reducing operational overhead.

---

## How Deployments Happen

### The CI/CD Pipeline

When developers make changes to Trinity:

```
1. DEVELOPER COMMITS CODE
   ↓
   Code changes are pushed to the source code repository
   
2. PIPELINE TRIGGERS
   ↓
   Azure Pipelines detects the change and starts automated process
   
3. BUILD PHASE
   ↓
   • Code is compiled and bundled
   • Docker containers are built
   • Tests run to verify nothing is broken
   
4. DEPLOY PHASE
   ↓
   • New containers are pushed to Azure
   • App Service pulls the new containers
   • Old containers are gracefully stopped
   
5. VERIFICATION
   ↓
   • Health checks confirm the new version is working
   • If problems, automatic rollback to previous version
```

This automated process means changes can be deployed quickly and safely, without manual intervention.

### Environments

Changes flow through multiple environments before reaching users:

| Environment | Purpose | Who Uses It |
|---|---|---|
| **Development** | Active feature development | Developers |
| **Integration** | Testing before production | QA team |
| **Production** | Live system | All users |

Each environment is isolated, so testing doesn't affect real users.

---

## The Domains

Trinity is accessible through several domain names:

| Domain | Environment |
|---|---|
| `worksphere.dxc.ai` | Production (branded URL) |
| `trinity-prod.dxcit.app` | Production (internal) |
| `trinity-itg1.dxcit.app` | Integration testing |
| `trinity-dev1.dxcit.app` | Development |
| `trinity-dev2.dxcit.app` | Development (alternate) |

The branded production URL (`worksphere.dxc.ai`) is what end users should bookmark.

---

## Security in Deployment

### Container Security

- **Non-root users** — Containers don't run with administrator privileges
- **Minimal images** — Only necessary software is included
- **No secrets in images** — Credentials are provided at runtime, not baked in

### Network Security

- **HTTPS only** — All traffic is encrypted
- **Firewall rules** — Only expected traffic is allowed
- **Private networking** — Backend services aren't directly exposed to the internet

### Secret Management

Sensitive information (API keys, database credentials) is:
- Stored in Azure Key Vault or App Service configuration
- Injected at runtime
- Never committed to source code
- Rotated periodically

---

## Monitoring and Health

### Health Checks

Both containers expose health check endpoints:
- `/health` on the frontend
- `/api/health` on the backend

Azure App Service pings these regularly. If a container stops responding, it's automatically restarted.

### Logging

All application events are logged to Azure's monitoring services:
- Request/response patterns
- Errors and exceptions
- Performance metrics

Operations teams can review logs to diagnose issues.

### Alerts

Automated alerts notify the team when:
- Error rates spike
- Response times degrade
- Services become unavailable

---

## Scaling

### Automatic Scaling

Trinity can scale automatically based on demand:
- **More traffic** → More container instances spin up
- **Less traffic** → Instances scale down
- **Spike protection** → Sudden increases are handled gracefully

### Manual Scaling

For anticipated events (like a major announcement or training), capacity can be pre-increased.

---

## Updates and Maintenance

### Zero-Downtime Deployments

When new versions are deployed:
1. New containers start alongside old ones
2. Once new containers are healthy, traffic shifts to them
3. Old containers are stopped

Users experience no interruption.

### Rollback Capability

If a new version has problems:
- Automatic rollback if health checks fail
- Manual rollback option for subtle issues
- Previous versions are retained for quick recovery

### Maintenance Windows

Most updates require no downtime. For rare infrastructure changes that do, maintenance windows are scheduled during low-usage periods.

---

## Disaster Recovery

### Data Backup

- Cosmos DB data is automatically replicated
- Point-in-time restore available for databases
- Blob storage has redundant copies

### Geographic Redundancy

Azure services are hosted in data centers with:
- Multiple availability zones
- Geographic replication options
- Automatic failover capabilities

### Recovery Objectives

| Metric | Target |
|---|---|
| Recovery Time (RTO) | < 1 hour |
| Recovery Point (RPO) | < 15 minutes of data loss |

---

## Cost Considerations

### What Costs Money

- **Compute** — Running containers (scales with usage)
- **Database** — Cosmos DB storage and throughput
- **AI** — Azure OpenAI API calls (per token)
- **Storage** — Blob storage for files
- **Network** — Data transfer (minimal for most use cases)

### Optimization

- Dev environments use smaller resource allocations
- Auto-scaling prevents over-provisioning
- Monitoring helps identify waste

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | Overall system architecture |
| [Backend](/docs/backend) | What runs in the backend container |
| [Authentication](/docs/authentication) | Security configuration |
| [Developer Guide](/docs/developer-guide) | Setting up local development |
