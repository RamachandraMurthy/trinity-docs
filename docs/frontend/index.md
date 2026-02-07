---
sidebar_position: 1
title: Frontend Architecture
description: How the Trinity user interface is organized and how it works
---

# Frontend Architecture

The Trinity frontend is what users see and interact with in their browser. It's a modern web application built with React that provides an immersive, responsive experience for AI-powered assistance.

---

## How the Interface is Organized

When users open Trinity, they experience several interconnected areas:

### The Landing Page (HUD Interface)

The first thing users see is a distinctive "heads-up display" inspired design. A circular interface shows animated segments representing different features:

- **For Sales users**: Accounts, Pipeline, Offerings, Campaigns, Research
- **For HR users**: Performance, Employee Data, Strategic Planning

Users click on segments to explore features. The interface uses smooth animations to transition between areas, creating an engaging experience.

### The Floating Chat

A chat bubble in the corner opens the primary AI assistant. This is where most interactions happen:

- Users type questions in natural language
- The AI responds with text, tables, and charts
- Responses stream in real-time (appearing word-by-word)
- Voice input is available via microphone button
- Conversation history is preserved

The floating chat can be accessed from anywhere in the app, so users never lose access to the AI.

### The Dual-Frame Layout

When exploring features, content appears in two panels:

**Left Frame** — Shows summaries, quick answers, and navigation. This is the "at a glance" view.

**Right Frame** — Shows detailed information, full reports, or embedded content. This is the "deep dive" view.

This split-view approach helps users stay oriented and compare information easily.

### The Workspace Canvas

Beyond chat, Trinity offers a visual workspace — an infinite canvas where users can:

- Save AI responses as cards
- Add notes and annotations
- Create visual layouts of information
- Organize research and findings
- Return later to continue working

The canvas uses drag-and-drop interaction and supports zooming and panning, similar to tools like Miro or Figma.

### Group Chat Rooms

For team collaboration, users can create and join group chat rooms:

- Multiple users in a shared conversation
- AI assistance available to the whole group
- Real-time message delivery
- Role-based access (HR groups, Sales groups)

---

## How the Frontend Communicates

The frontend needs to talk to the backend to do anything useful. This communication happens in two ways:

### REST API Calls (Request/Response)

For most operations, the frontend sends a request and waits for a response:

```
Frontend: "Save this chat session"
    ↓
Backend: "Got it, saved successfully"
    ↓
Frontend: Updates the UI to show it's saved
```

This pattern is used for:
- Fetching chat history
- Loading notifications
- Saving workspaces
- Creating group chats
- Most data operations

### WebSocket Connections (Real-Time)

For instant communication, the frontend maintains an open connection:

```
Frontend ←——— constant connection ———→ Backend
         ←— messages flow both ways —→
```

This is used for:
- **Chat streaming** — AI responses appear word-by-word as they're generated
- **Group chat** — Messages appear instantly for all participants
- **Token refresh** — Security tokens are updated without page reload
- **Session updates** — Backend can push updates to the frontend

WebSocket makes the experience feel instant and alive, rather than waiting for page refreshes.

---

## How User State is Managed

The frontend needs to keep track of many things: Who's logged in? What messages are in the chat? Which notifications are unread? This is handled through a system of "contexts" — shared state containers that different parts of the app can access.

### Authentication State

Knows whether the user is logged in, their identity, and their roles. Every part of the app can check this to decide what to show.

### Chat State

Tracks the current conversation: messages sent, messages received, whether the AI is currently responding. The floating chat and workspace chat share this information.

### Notification State

Keeps count of unread notifications and their content. The notification bell in the header reads from this to show the badge count.

### Group Chat State

Manages which group rooms the user belongs to, active room selection, and real-time messages. The group chat components all stay synchronized through this shared state.

---

## How Authentication Flows

When a user opens Trinity:

1. **Check if logged in** — The app checks for an existing session
2. **Redirect to Microsoft login** — If not logged in, the user goes to the Microsoft sign-in page
3. **Return with credentials** — After signing in, Microsoft sends the user back with security tokens
4. **Extract roles** — The app reads the user's roles (Sales, HR, Admin) from the token
5. **Show appropriate UI** — The landing page shows features matching the user's roles

If the user has no valid roles, they see a message explaining they need role assignment.

### Staying Logged In

Security tokens expire after about an hour. To avoid interrupting users, the frontend automatically refreshes tokens in the background:

- A background service checks token expiry
- Before tokens expire, it requests fresh ones from Microsoft
- The new tokens are used for all subsequent requests
- Users never notice the refresh happening

---

## How the UI Responds to AI

When a user sends a message to the AI, the interface goes through several states:

### 1. Sending State
The send button changes to indicate the message is being sent. The user's message appears in the chat.

### 2. Thinking State
An animated indicator shows the AI is processing. This includes the streaming connection being established.

### 3. Streaming State
The AI's response appears word-by-word as it's generated. Users see the response forming in real-time.

### 4. Complete State
The full response is displayed. If it includes charts or tables, these render with appropriate visualizations.

### 5. Saved State
The conversation is automatically saved to the database for later retrieval.

---

## How Charts and Visualizations Work

When the AI generates data that would benefit from visualization, it includes structured chart data in its response. The frontend:

1. Detects chart data in the response
2. Determines the chart type (bar, line, pie, area, etc.)
3. Renders an interactive chart using a visualization library
4. Allows users to hover for details

This happens automatically — the AI decides when charts are appropriate based on the data and question.

---

## How Voice Input Works

Users can speak instead of type:

1. **Click microphone** — Activates voice capture
2. **Speak naturally** — Audio is captured and sent to Azure Speech Services
3. **Transcription appears** — Spoken words appear as text in the input field
4. **User confirms** — Can edit or send the transcribed text

The voice feature uses continuous recognition, so users can speak naturally without needing to click for each phrase.

---

## Key Design Patterns

### Progressive Disclosure

The interface shows summary information first, with details available on demand. Users aren't overwhelmed with everything at once.

### Responsive Scaling

The interface adapts to different screen sizes and resolutions. Elements scale proportionally to maintain usability.

### Animation with Purpose

Transitions and animations guide attention and provide feedback. They're not decorative — they help users understand what's happening.

### Offline Resilience

If the network connection is lost, the frontend handles it gracefully with retry logic and user feedback.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Platform Overview](/docs/platform/high-level-architecture) | How frontend fits in the overall system |
| [Backend](/docs/backend) | What happens when frontend makes requests |
| [Real-Time](/docs/realtime) | How WebSocket communication works |
| [Authentication](/docs/authentication) | How login and security work |
