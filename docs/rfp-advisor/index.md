---
sidebar_position: 1
title: RFP Advisor
description: How RFP document analysis works in the Trinity platform
---

# RFP Advisor

The **RFP Advisor** is Trinity's document analysis capability for proposal teams. It helps solutioners and enterprise teams analyze RFP documents, extract requirements, identify compliance gaps, and generate strategic recommendations using AI.

---

## What RFP Advisor Does

When working on a proposal, teams often deal with lengthy RFP documents that need careful analysis. RFP Advisor automates much of this work:

- **Organize documents by project** — Group all RFP-related files together
- **Upload and process documents** — Support for PDF, Word, and PowerPoint files
- **Search across documents** — Find relevant sections using keywords or natural language
- **Chat with documents** — Ask questions and get answers grounded in the actual content
- **Run AI agents** — Execute specialized analysis pipelines for deep insights

---

## How It Fits in Trinity

RFP Advisor is integrated into the Trinity platform, sharing authentication, data storage, and AI infrastructure:

```
┌─────────────────────────────────────────────────────────────┐
│                    Trinity Platform                          │
│                                                             │
│   ┌───────────────┐  ┌────────────────┐  ┌──────────────┐   │
│   │  WorkSphere   │  │  RFP Advisor   │  │ SalesCoach   │   │
│   │  Main App     │  │                │  │              │   │
│   │  (React)      │  │  (Next.js)     │  │  (WebSocket) │   │
│   └───────┬───────┘  └───────┬────────┘  └──────┬───────┘   │
│           │                  │                   │          │
│   ┌───────┴──────────────────┴───────────────────┴───────┐  │
│   │         Shared Azure Services                        │  │
│   │  (Cosmos DB, Blob Storage, AI Search, OpenAI, Auth)  │  │
│   └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

The same Azure AD login works across all Trinity applications. Data is stored in the shared Cosmos DB and Azure Blob Storage infrastructure.

---

## The User Journey

A typical workflow in RFP Advisor follows these steps:

### 1. Create a Project

Users start by creating a project for their RFP engagement. Projects include metadata like region, offering, and sales stage to help with organization and filtering.

### 2. Upload Documents

RFP documents, proposal drafts, and supporting materials are uploaded to the project. The system processes each file — extracting text, generating summaries, and indexing for search.

### 3. Search and Explore

Once documents are indexed, users can search across all content. Keyword search finds exact matches, while semantic search understands the meaning behind queries.

### 4. Chat with Documents

Users ask questions in natural language and get answers based on the uploaded documents. The AI cites relevant sections and can synthesize information from multiple files.

### 5. Run Analysis Agents

For deeper analysis, users select specialized agents like Requirements Review or Response Review. These run in the background and generate detailed reports.

---

## Key Capabilities

### Document Processing

- **Supported formats** — PDF, DOCX, PPTX (up to 10 MB per file)
- **Text extraction** — Content is extracted for search and analysis
- **AI summaries** — Each document gets an automatic summary
- **Status tracking** — Users see upload progress and processing status

### Intelligent Search

- **Keyword search** — Traditional text matching with highlighted results
- **Semantic search** — Natural language queries that understand meaning
- **Project filtering** — Search within specific projects or across all content

### Multiple Chat Modes

| Mode | Purpose |
|---|---|
| **Gemini Chat** | Fast exploration and general questions |
| **Azure Chat** | Enterprise chat with optional RAG (retrieval-augmented generation) |
| **Document Chat** | Questions answered directly from project documents |

### WorkSphere Agents

Over 15 specialized AI agents provide in-depth analysis. Agents run in the background and produce formatted reports covering requirements, compliance, competitive positioning, and more.

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Projects](/docs/rfp-advisor/projects) | How projects organize RFP work |
| [File Upload](/docs/rfp-advisor/file-upload) | How documents are processed |
| [Indexing](/docs/rfp-advisor/indexing) | How search works |
| [Chat](/docs/rfp-advisor/chat) | How to interact with documents |
| [WorkSphere Agents](/docs/agents) | Available analysis agents |
| [Platform Overview](/docs/platform/high-level-architecture) | How RFP Advisor fits in Trinity |
