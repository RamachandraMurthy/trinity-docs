---
sidebar_position: 5
title: Chat & Conversations
description: How to interact with documents using AI chat in RFP Advisor
---

# Chat & Conversations

RFP Advisor provides multiple ways to interact with documents through AI-powered chat. Each mode is optimized for different use cases.

---

## Three Chat Modes

| Mode | Best For | Document Context |
|---|---|---|
| **Gemini Chat** | Quick exploration, general questions | Optional file attachments |
| **Azure Chat** | Enterprise integration, RAG-powered answers | Searches indexed documents |
| **Document Chat** | Deep analysis of project documents | Full project document context |

---

## Gemini Chat

A fast, general-purpose chat interface powered by Google Gemini.

**When to use:**
- Quick questions that don't need document context
- General brainstorming or writing assistance
- When you want the fastest response

**How it works:**
You ask a question, and Gemini responds based on its training knowledge. You can optionally attach files for the AI to consider, but it doesn't automatically have access to your project documents.

---

## Azure Chat

Enterprise chat powered by Azure OpenAI with optional retrieval-augmented generation (RAG).

**When to use:**
- Questions where you want answers grounded in your documents
- Compliance or audit scenarios requiring Azure-based AI
- When you need to cite specific sources

**How it works with RAG:**
1. You ask a question and specify a project
2. The system searches your project's indexed documents
3. The most relevant sections are provided to the AI as context
4. The AI answers based on that context, citing sources

Without RAG enabled, it works like a standard chat without document context.

---

## Document Chat

Project-scoped chat that has direct access to all documents in a project.

**When to use:**
- Deep analysis of RFP documents
- Questions that require understanding the full context
- Synthesizing information from multiple documents

**How it works:**
1. You select a project
2. All project documents are loaded into the AI's context
3. Your questions are answered based on the actual document content
4. The AI can reference and compare across all documents

This mode gives the AI the most complete picture of your project, making it ideal for comprehensive analysis.

---

## How Responses Stream

All chat modes support **streaming responses** — the AI's answer appears word-by-word as it's generated, rather than waiting for the complete response.

```
You: "What are the key technical requirements in this RFP?"

AI: [Analyzing documents...]
    The RFP outlines several key technical requirements:

    1. Cloud infrastructure must support...
       [response continues streaming]
```

This provides faster feedback and lets you see the direction of the response early.

---

## Conversation History

Each chat mode maintains conversation history:

- **Within a session** — The AI remembers earlier messages in the conversation
- **Across sessions** — Past conversations are saved and can be resumed
- **Automatic titles** — The AI generates a descriptive title after your first message

You can view past conversations from the chat sidebar and continue where you left off.

---

## Bookmarks

When you get a particularly useful response, you can bookmark it for quick reference later:

- Bookmarks are saved with an AI-generated title
- View all bookmarks from the bookmarks page
- Bookmarks are associated with the project for context

---

## Choosing the Right Mode

| Scenario | Recommended Mode |
|---|---|
| "What are the compliance requirements in this RFP?" | Document Chat |
| "Help me write an executive summary" | Gemini Chat |
| "Find all mentions of data security" | Azure Chat (with RAG) |
| "Compare requirements across these documents" | Document Chat |
| "What's the standard format for a technical proposal?" | Gemini Chat |
| "Which section discusses SLA requirements?" | Azure Chat (with RAG) |

---

## Tips for Better Results

**Be specific** — "What are the infrastructure requirements in Section 3?" works better than "Tell me about the requirements"

**Provide context** — If you're looking at a specific section, mention it

**Ask follow-ups** — The AI remembers your conversation, so build on previous answers

**Try different modes** — If one mode doesn't give you what you need, try another

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Projects](/docs/rfp-advisor/projects) | How documents are organized |
| [Indexing](/docs/rfp-advisor/indexing) | How search works for RAG |
| [WorkSphere Agents](/docs/agents) | For deeper automated analysis |
| [AI & MCP](/docs/ai-and-mcp) | How AI is integrated platform-wide |
