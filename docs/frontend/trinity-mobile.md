---
sidebar_position: 8
title: Trinity Mobile (Coming Soon)
description: The mobile companion app — voice-first chat with WorkSphere on iOS and Android. In development.
---

# Trinity Mobile

:::info Coming Soon
**Trinity Mobile is in development and not yet available to users.** This page describes the planned companion app — design, scope, and architectural choices. When the app ships through TestFlight and the app stores, this notice will be removed and an availability section added. Until then, the only Trinity surface is the web at [worksphere.dxc.ai](https://worksphere.dxc.ai).
:::

**Trinity Mobile** is the companion app to WorkSphere on iOS and Android. It is **not a full mirror of the web**. It is a focused surface for the most common on-the-go interaction: ask a quick question, often by voice, get an answer.

The app extends the [Single-User Workspace](/docs/frontend/single-user-workspace) experience to phones. The AI Canvas, Agent Space, and longer-running workflows live on the web; mobile keeps the experience tight.

---

## What It Provides

| Capability | What the User Does |
|---|---|
| **Chat** | Type or speak; responses stream the same way as on the web |
| **Voice input** | Voice-first design — the orbital particle voice overlay is the focal interaction |
| **Conversation history** | Past chats are accessible across web and mobile, since both surfaces share the same backend |
| **Authentication** | Microsoft Azure AD sign-in with corporate credentials |
| **Dark / light theming** | Full theme support, with system-detection and manual override |

---

## What It Doesn't Do (Yet)

Mobile is **deliberately scoped**. Some surfaces only make sense on a larger display.

| Capability | On Mobile |
|---|---|
| AI Canvas | Not on mobile — multi-user collaboration is a web experience |
| Agent Space & Runs | Web only |
| File upload | Limited — drag-and-drop doesn't apply to mobile; native share-sheet integration is partial |
| Email sharing | Subject to platform share-sheet behavior |
| Daily Recap audio playback | Yes |

The list will evolve. Mobile follows the web in capability, on a delay.

---

## Design Philosophy

Mobile interactions are **shorter and more frequent**. The design optimizes for that:

- **Voice-first** — the mic button is prominent, the orbital voice overlay is the most polished part of the UI
- **Animation with purpose** — the onboarding's animated space gradient, floating orbs, and shimmer CTA set the tone but don't get in the way of work
- **Welcome and re-entry** — the chat welcome surface adapts to time-of-day and surfaces the user's avatar, signaling continuity from the last session
- **Theme-respecting** — full light/dark support including system detection, so the app fits whatever the user's phone is doing

---

## How It Connects to the Backend

Mobile is a **client of the same orchestration layer** as the web — it does not have its own backend. From the [Claude Agent SDK Orchestrator](/docs/backend)'s perspective, a request from mobile and a request from the web are indistinguishable except for the user-agent.

| Aspect | Behavior |
|---|---|
| **Authentication** | Azure AD via MSAL on device; tokens refreshed automatically |
| **Real-time streaming** | Same WebSocket model as the web — responses stream word-by-word |
| **Role awareness** | Same roles, same MCPs, same governance |
| **Personal Memory** | Shared across web and mobile — preferences set on one surface apply to the other |
| **Persistence** | Same Cosmos DB; conversation history visible across surfaces |

This is the architectural reason mobile can stay slim — there's no parallel backend to maintain.

---

## Voice Overlay

The voice overlay is the most distinctive part of the mobile UI:

- **Orbital particle orb** with five rings and a glowing core
- **Ambient particles** that respond to audio activity
- **State transitions** — listening, thinking, responding — each with a distinct visual mode

The overlay communicates what the AI is doing without forcing the user to look at text. It is intentionally over-engineered for visual feedback because voice interactions need a clear "I'm listening" / "I'm thinking" signal.

---

## Authentication Flow

Sign-in matches the web pattern but uses the mobile MSAL SDK:

| Step | What Happens |
|---|---|
| Launch | App detects no session; shows onboarding then sign-in |
| Sign-in | MSAL opens system browser to Microsoft login |
| Token | Returned to the app, stored securely on-device |
| Resume | On future launches, the stored token is refreshed silently |

The user sees their corporate identity reflected — name, email, role-based features — exactly as on the web.

---

## What Lives in the Mobile Repo

The mobile app is a separate codebase from the web frontend, even though it talks to the same backend.

| Aspect | Reality |
|---|---|
| Framework | Expo / React Native |
| Repository | Separate repo dedicated to mobile |
| Backend | Shared with web — the same orchestration layer |
| Release cadence | Independent — mobile ships its own updates |

This separation lets mobile move at its own pace without slowing web releases.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Experience Layer](/docs/frontend) | The parent layer this companion app belongs to |
| [Single-User Workspace](/docs/frontend/single-user-workspace) | The web equivalent that mobile mirrors |
| [Real-Time & WebSocket](/docs/realtime) | The streaming model mobile shares with the web |
| [Authentication & Security](/docs/authentication) | The Azure AD identity model that powers mobile sign-in |
| [Orchestration Layer](/docs/backend) | The shared brain serving both web and mobile |
