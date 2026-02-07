---
sidebar_position: 1
title: Data Layer
description: How Trinity stores and organizes information
---

# Data Layer

Trinity needs to remember things: chat conversations, user workspaces, notifications, and configuration. This section explains where that data lives and how it's organized.

---

## Where Data is Stored

Trinity uses several storage systems, each suited for different types of data:

### Azure Cosmos DB (Primary Database)

**Cosmos DB** is a cloud database that stores most of Trinity's data. It's designed for:
- Fast reads and writes
- Global availability
- Flexible data structures

Think of it as a giant filing cabinet in the cloud where each drawer contains a different type of information.

### Azure Blob Storage (Files)

**Blob Storage** holds larger files that don't fit well in a database:
- Profile images (digital twin pictures)
- Uploaded documents
- Generated reports

It's like cloud file storage, similar to Dropbox or OneDrive, but for application use.

### Browser Storage (Temporary)

Some data is stored temporarily in the browser:
- Login session information
- Cached preferences
- Backup of recent work (in case of connection issues)

This data is temporary and tied to the browser session.

---

## How Data is Organized in Cosmos DB

Cosmos DB organizes data into **databases** and **containers** (like databases and tables in traditional systems):

```
┌─────────────────────────────────────────────────────────────┐
│                    COSMOS DB ACCOUNT                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  PRIMARY DATABASE                                   │    │
│  │                                                     │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │    │
│  │  │ Chat        │ │ Notifications│ │ Common      │    │    │
│  │  │ History     │ │             │ │ Questions   │    │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  WORKSPACE DATABASE                                 │    │
│  │                                                     │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │    │
│  │  │ Workspaces  │ │ Workspace   │ │ MCP Server  │    │    │
│  │  │             │ │ Chat History│ │ Config      │    │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  GROUP CHAT DATABASE                                │    │
│  │                                                     │    │
│  │  ┌─────────────┐                                    │    │
│  │  │ Group Chat  │                                    │    │
│  │  │ History     │                                    │    │
│  │  └─────────────┘                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

This separation keeps different types of data organized and allows for different access patterns.

---

## What Each Container Stores

### Chat History

Every conversation you have with Trinity is saved:

- **Who started it** — Your user email
- **When it happened** — Timestamps for each message
- **What was said** — Both your questions and the AI's responses
- **Session identity** — A unique ID so you can return to the conversation

This lets you pick up where you left off and reference past queries.

### Notifications

Alerts and updates you receive:

- **What happened** — The event that triggered the notification
- **Status** — Whether you've seen it, whether the job completed
- **When** — Created and updated timestamps

Notifications track background jobs (like research generation) and let you know when they're done.

### Workspaces

Your saved visual canvas layouts:

- **Canvas content** — Cards, notes, and their positions
- **Associated chats** — Which conversations are linked to this workspace
- **Ownership** — Who created it

Workspaces persist so you can return to your organized research.

### Group Chats

Team collaboration rooms:

- **Room details** — Name, role (HR/Sales), who created it
- **Members** — Who belongs to the group
- **Messages** — The conversation history within the group

All group activity is preserved so members can catch up on discussions they missed.

### Common Questions

Suggested questions shown to users:

- **Category** — What type of question (Performance, Employees, etc.)
- **Role** — Which roles see this question
- **Text** — The actual question to suggest

These help users discover what they can ask.

### MCP Server Configuration

How to connect to business tools:

- **Server details** — Names, URLs, descriptions
- **Role access** — Which roles can use each server
- **Status** — Whether the server is active

This configuration tells the AI what tools are available.

---

## How Data Flows

### Saving a Chat

When you send a message and receive a response:

```
1. You type a question
2. Backend processes it with AI
3. Response streams back to you
4. Backend saves the complete exchange to Chat History
5. Next time you visit, your history is waiting
```

### Loading Your History

When you open My Projects:

```
1. Frontend asks: "What chats does this user have?"
2. Backend queries Chat History by your email
3. Returns list of your sessions
4. You see your past conversations organized by date
```

### Saving a Workspace

When you arrange content on the canvas:

```
1. You position cards and add content
2. Changes are saved automatically (or on explicit save)
3. Canvas layout is stored in Workspaces container
4. Returning later loads your exact layout
```

---

## Data Ownership and Access

### User-Scoped Data

Most data is tied to specific users:
- Your chat history is yours alone
- Your workspaces are private
- Your notifications are personal

Other users can't see your data unless you explicitly share it (like a group chat).

### Group-Scoped Data

Group chats are shared among members:
- All members see the same messages
- Membership is tracked per group
- Groups are role-specific (HR group, Sales group)

### System Data

Some data is shared system-wide:
- Common questions (visible to all with matching roles)
- MCP server configurations (used by the platform)

---

## Data Retention

### Active Data

Chat history, workspaces, and notifications are kept as long as the account is active. You can delete specific items if needed.

### Soft Deletion

When you delete something (a chat session, a notification), it's typically "soft deleted" — marked as inactive rather than immediately erased. This allows for recovery and auditing.

### No Personal Data Storage

Trinity doesn't store sensitive personal information directly. Authentication data stays with Microsoft. Business data is accessed through MCP servers, not stored in Trinity.

---

## Offline and Backup Behavior

### When Connection is Lost

If you lose internet connection:
- Recent work may be saved in browser storage
- When connection returns, data syncs to the cloud
- You won't lose work from a brief outage

### Development Mode

When developing or testing without a database:
- Mock data is used instead of real database
- Features work with sample data
- Useful for testing without affecting production

---

## Performance Considerations

### Why Multiple Databases?

Separating data into different databases allows:
- Independent scaling (if chat grows faster than notifications)
- Isolation (a problem in one area doesn't affect others)
- Cleaner organization

### How Data is Found Quickly

Each container has a "partition key" — a way to organize data for fast lookup:
- Chat history: partitioned by session
- Notifications: partitioned by user
- Groups: partitioned by group ID

This means queries like "get my notifications" are fast because the system knows exactly where to look.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | How data layer fits in the overall system |
| [Backend](/docs/backend) | How the backend interacts with data |
| [Deployment](/docs/deployment) | How databases are provisioned |
