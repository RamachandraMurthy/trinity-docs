---
sidebar_position: 6
title: "Step 6: Response Generation"
description: How responses are formatted and delivered in SalesCoach
---

# Step 6: Response Generation & Formatting

Once the AI has processed constraints, history, and tool data (Step 4 & 5), it generates a final response. This step covers how that response is formatted, visualized, and delivered to the user.

## Overview

The response phase is responsible for translating the LLM's raw output into a rich, interactive experience for the user. This includes detecting if data should be visualized as a chart, summarizing content for audio playback, and packaging everything into a WebSocket message.

**Key Goals:**
- Format text for readability (Markdown).
- Detect and structure data for visualizations (Charts).
- Generate concise summaries for Text-to-Speech (TTS).
- Deliver the payload via WebSocket.

---

## Response Types

The backend supports two primary response formats:

### 1. Standard Text Response

For general queries, the system returns a standard text response.

- **Format:** Markdown (bolding, lists, code blocks).
- **Source:** Direct output from GPT-4o.

### 2. Intelligent Chart Generation

If the AI detects that the user is asking for data comparison (e.g., "Compare sales by region"), it attempts to structure the output as a JSON Chart configuration.

**Logic (`MCP_ChatBot._format_response_as_json_for_chart`):**

1. **Analysis:** A secondary LLM call (`gpt-4o-mini`) analyzes the content.
2. **Structuring:** It extracts labels and numerical values.
3. **Type Selection:** Determines the best chart type (`bar`, `pie`, `line`, `doughnut`, `radar`).
4. **Formatting:** Returns a JSON object:

```json
{
  "chartType": "bar",
  "title": "Sales by Region",
  "data": [
    { "label": "North", "value": 500 },
    { "label": "South", "value": 300 }
  ]
}
```

---

## Audio Summary (TTS Prep)

To support voice-enabled clients (like the React frontend's "Speak" feature), the backend generates a concise summary of the full response.

- **Process:** The full response text is passed to `MCP_ChatBot.generate_summary`.
- **Goal:** Create a 1-2 sentence spoken version of the answer.
- **Usage:** This text is sent to the frontend, which uses the Web Speech API (or Azure Speech, if configured) to vocalize it.

---

## Delivery (`WebSocketChatService`)

The final payload is sent to the client as a `response` message type.

**Direction:** Backend → Client

### Payload Structure

```json
{
  "type": "response",
  "content": "Here is the sales data you requested...",
  "session_id": "uuid...",
  "chart_data": {...},
  "tool_feedback": [...]
}
```

| Field | Description |
|-------|-------------|
| `type` | Always `"response"`. |
| `content` | The main markdown answer. |
| `chart_data` | JSON object for rendering charts (if applicable). |
| `tool_feedback` | List of tools executed (for UI "Thinking..." logs). |
