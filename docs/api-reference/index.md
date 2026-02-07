---
sidebar_position: 1
title: API Overview
description: Overview of Trinity's backend API capabilities
---

# API Overview

The Trinity backend exposes a REST API that the frontend uses to communicate with the server. This section provides an overview of what the API can do.

:::info For Developers
This page provides a high-level overview. For detailed endpoint documentation with request/response schemas, developers should refer to the backend source code or contact the development team.
:::

---

## API Structure

All API endpoints are accessed through:
- **Base URL**: `https://{backend-domain}/api`
- **Protocol**: HTTPS (required)
- **Format**: JSON request and response bodies

---

## API Categories

### Health & Status

Check if the system is running and healthy.

| Capability | Description |
|---|---|
| Health check | Verify server, database, and scheduler status |
| Database test | Confirm database connectivity |

### Chat History

Manage conversation records.

| Capability | Description |
|---|---|
| Get history | Retrieve past conversations for a user |
| Get session | Load a specific conversation |
| Update session | Modify conversation metadata |
| Delete session | Remove a conversation |

### AI Chat

Process conversations with the AI assistant.

| Capability | Description |
|---|---|
| Send message | Submit a question and receive AI response |
| Get servers | List available MCP tools |
| Get system prompt | View current AI instructions |

### Notifications

Manage user alerts and background job tracking.

| Capability | Description |
|---|---|
| Get notifications | List notifications for a user |
| Mark as seen | Update read status |
| Delete notification | Remove a notification |

### Group Chat

Enable team collaboration.

| Capability | Description |
|---|---|
| Create group | Start a new group chat room |
| List groups | Get groups a user belongs to |
| Send message | Post to a group |
| Get messages | Retrieve group history |

### Workspaces

Manage visual canvas workspaces.

| Capability | Description |
|---|---|
| Create workspace | Start a new canvas |
| Get workspace | Load workspace layout |
| Update workspace | Save changes |
| Delete workspace | Remove a workspace |

### Users

Search and lookup users.

| Capability | Description |
|---|---|
| Search users | Find users by name or department |
| Get by department | List users in a department |

### Digital Twin

Manage user profile images.

| Capability | Description |
|---|---|
| Get image | Retrieve user's digital twin image |
| Save image | Store a new digital twin image |

### Common Questions

Suggested questions for users.

| Capability | Description |
|---|---|
| Get questions | List suggestions by role/category |
| Get categories | List available categories |

---

## Authentication

Most API endpoints require authentication:

- **Authorization header**: Bearer token from Microsoft authentication
- **User context**: Email header for user identification
- **Role enforcement**: Access limited by user's assigned roles

---

## Response Format

### Successful Responses

Successful requests return JSON with the requested data:

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Responses

Failed requests return error information:

```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

---

## Rate Limiting

The API may limit requests to prevent abuse:
- Limits are generous for normal use
- Automated scripts should include delays between requests
- Exceeded limits return appropriate error responses

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Backend](/docs/backend) | How the API is implemented |
| [Authentication](/docs/authentication) | How authentication works |
| [Developer Guide](/docs/developer-guide) | Setting up for development |
