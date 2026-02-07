---
sidebar_position: 1
title: Authentication & Security
description: How Trinity handles login, user identity, and access control
---

# Authentication & Security

Trinity handles sensitive business data, so security is built into every layer. This section explains how users prove their identity, how the system controls access, and how data is protected.

---

## How Login Works

Trinity uses **Microsoft Azure Active Directory** (Azure AD, also called Entra ID) for authentication. This means:

- Users log in with their corporate Microsoft credentials
- Trinity never sees or stores passwords
- The same credentials work across DXC's Microsoft 365 environment
- Multi-factor authentication (MFA) is enforced by Azure AD policy

### The Login Flow

```
┌─────────────────────────────────────────────────────────────┐
│   1. USER OPENS TRINITY                                     │
│                                                             │
│   Browser loads the Trinity application                     │
│   App checks: "Is this user already logged in?"             │
└──────────────────────────┬──────────────────────────────────┘
                           │ Not logged in
                           ▼
┌─────────────────────────────────────────────────────────────┐
│   2. REDIRECT TO MICROSOFT                                  │
│                                                             │
│   Browser redirects to Microsoft's login page               │
│   (login.microsoftonline.com)                               │
└──────────────────────────┬──────────────────────────────────┘
                           │ User enters credentials
                           ▼
┌─────────────────────────────────────────────────────────────┐
│   3. MICROSOFT VERIFIES                                     │
│                                                             │
│   Microsoft checks username/password                        │
│   May require MFA (text, app, etc.)                         │
│   Confirms the user is who they claim to be                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ Verification successful
                           ▼
┌─────────────────────────────────────────────────────────────┐
│   4. RETURN WITH TOKENS                                     │
│                                                             │
│   Microsoft sends the user back to Trinity                  │
│   Along with security tokens that prove identity            │
│   Tokens include: who the user is, what roles they have     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│   5. TRINITY READS TOKENS                                   │
│                                                             │
│   Trinity extracts:                                         │
│   • User's name and email                                   │
│   • Assigned roles (Sales, HR, Admin)                       │
│   • Token expiration time                                   │
│                                                             │
│   Then shows the appropriate interface                      │
└─────────────────────────────────────────────────────────────┘
```

This approach is called **OAuth 2.0 with OIDC** — an industry standard for secure authentication.

### Shared Across the Platform

The same authentication pattern is used across all Trinity applications:
- **Main WorkSphere app** — React frontend with Express backend
- **RFP Advisor** — Next.js frontend with FastAPI backend
- **SalesCoach** — WebSocket-based real-time coaching

All use MSAL (Microsoft Authentication Library) to handle the OAuth flow, ensuring a consistent login experience regardless of which part of the platform you're accessing.

---

## Understanding Roles

Every user in Trinity has one or more **roles** that determine what they can access. These roles are assigned in Azure AD by administrators.

### Available Roles

| Role | Who Gets It | What They Can Access |
|---|---|---|
| **Sales** | Sales team members | Sales pipeline, accounts, campaigns, research |
| **HR** | HR team members | Employee data, performance, workforce analytics |
| **Admin** | Platform administrators | Everything — all features and tools |

### How Roles Affect the Experience

**What You See**

The landing page adapts to your roles. A Sales user sees Sales-focused features (Accounts, Pipeline, Campaigns). An HR user sees HR features (Performance, Employee Data). This isn't just cosmetic — features you can't access don't appear at all.

**What Tools Are Available**

When you ask the AI a question, it only has access to tools matching your role. A Sales user asking "Show me employee performance" will get a response like "I don't have access to employee performance data" — because the HR tools aren't available to the AI in that session.

**What Data You Can Query**

Even if someone tried to access data outside their role through other means, the backend validates every request against the user's tokens.

### No Role?

If someone logs in but has no roles assigned, they see a message explaining that they need role assignment. They can't access any features until an administrator assigns appropriate roles in Azure AD.

---

## Security Tokens Explained

When you log in, Microsoft gives you several **tokens** — digital credentials that prove who you are:

### ID Token
Contains information about your identity:
- Your name and email
- Your assigned roles
- When the token expires

Trinity reads this to know who you are and what you can do.

### Access Token
A credential that proves you're allowed to access specific services. Different access tokens are used for:
- Calling the Trinity backend
- Accessing Microsoft Graph (email, calendar)
- Accessing Power BI reports

### How Tokens Stay Fresh

Tokens expire after about an hour for security reasons. Trinity handles this automatically:

1. **Background monitoring** — A service watches when tokens will expire
2. **Silent refresh** — Before expiration, new tokens are requested from Microsoft
3. **No interruption** — Users never notice the refresh happening

If you step away for several hours, you may need to log in again — this is intentional security behavior.

---

## What Happens on Logout

When you log out:

1. **Tokens are cleared** — Your security credentials are removed from the browser
2. **Session ends** — Microsoft is notified the session is complete
3. **Return to login** — You're sent back to the login page

Any sensitive data in browser memory is cleared to prevent access by the next user.

---

## How the Backend Validates Requests

The frontend isn't trusted automatically. Every request to the backend is validated:

### Token Verification
Each request includes tokens that the backend checks:
- Is this token valid and not expired?
- Was it issued by the expected Microsoft tenant?
- Does it grant permission for this action?

### Role Enforcement
The backend checks roles before processing requests:
- Is this user allowed to access HR data?
- Can this user create group chats?
- Should this user see this notification?

### User Context
Requests include user information that the backend uses:
- User email for data filtering
- User roles for permission checking
- Tokens for calling external services

---

## Protecting Data in Transit

All communication in Trinity is encrypted:

### HTTPS Everywhere
Every connection between the browser and servers uses HTTPS:
- Data is encrypted before leaving your browser
- It's decrypted only by the intended server
- No one in between can read the content

### WebSocket Security
Real-time connections use WSS (WebSocket Secure):
- Same encryption as HTTPS
- Protects streaming chat and group messages

---

## Security Headers

The servers add security headers to protect against common web attacks:

| Protection | What It Prevents |
|---|---|
| Content Security Policy | Blocks malicious scripts from running |
| X-Frame-Options | Prevents the app from being embedded in malicious sites |
| X-Content-Type-Options | Stops browsers from misinterpreting file types |
| Strict Transport Security | Forces HTTPS connections |

These are industry-standard protections applied automatically.

---

## Container Security

Trinity runs in Docker containers with security best practices:

- **Non-root users** — Containers don't run as administrator
- **Minimal images** — Only necessary components are included
- **No secrets in code** — Credentials are injected at runtime, not stored in the application

---

## What Users Should Know

### Your Responsibilities

- **Don't share your credentials** — Your login gives access to sensitive data
- **Lock your computer** — Trinity sessions persist while logged in
- **Report suspicious activity** — If something seems wrong, tell your administrator

### What Trinity Doesn't Do

- **Doesn't store passwords** — Microsoft handles all password management
- **Doesn't send data outside DXC** — All services run on DXC's Azure environment
- **Doesn't access more than needed** — Role restrictions limit data access

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | How security fits in the overall system |
| [AI & MCP](/docs/ai-and-mcp) | How role-based tool access works |
| [Deployment](/docs/deployment) | How containers are secured |
| [RFP Advisor](/docs/rfp-advisor) | How authentication works in the RFP Advisor |
