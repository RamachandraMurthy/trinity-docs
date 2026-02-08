---
sidebar_position: 1
title: RFP Advisor Setup
description: How to set up projects and documents for RFP Agent analysis
---

# RFP Advisor Setup

Before running RFP analysis agents, you need to set up a project and upload your documents. This section covers that workflow — from creating a project to having documents indexed and ready for agent analysis.

The **RFP Advisor** is Trinity's document analysis capability for proposal teams. It helps solutioners and enterprise teams analyze RFP documents, extract requirements, identify compliance gaps, and generate strategic recommendations using AI.

---

## Why Setup Is Required

RFP Agents need documents to analyze. Unlike Special Agents (which work from opportunity data or external research), RFP Agents examine the actual RFP document, your proposal response, and supporting materials. The setup workflow ensures:

- Documents are organized by project
- Text is extracted and indexed for search
- Files are prepared for AI analysis
- Everything is ready when you run an agent

---

## The User Journey

A typical workflow follows these steps:

### 1. Create a Project

Users start by creating a project for their RFP engagement. Projects include metadata like region, offering, and sales stage to help with organization and filtering.

→ [Projects Documentation](/docs/rfp-advisor/projects)

### 2. Upload Documents

RFP documents, proposal drafts, and supporting materials are uploaded to the project. The system processes each file — extracting text, generating summaries, and indexing for search.

→ [File Upload Documentation](/docs/rfp-advisor/file-upload)

### 3. Index and Search

Once documents are indexed, users can search across all content. Keyword search finds exact matches, while semantic search understands the meaning behind queries.

→ [Indexing Documentation](/docs/rfp-advisor/indexing)

### 4. Chat with Documents

Users ask questions in natural language and get answers based on the uploaded documents. The AI cites relevant sections and can synthesize information from multiple files.

→ [Chat Documentation](/docs/rfp-advisor/chat)

### 5. Run Analysis Agents

For deeper analysis, users select specialized agents. These run in the background and generate detailed reports:

| Agent | What It Analyzes |
|---|---|
| [Requirements Review](/docs/agents/rfp/requirements-review) | Extracts and analyzes RFP requirements |
| [Response Review](/docs/agents/rfp/response-review) | "Red team" quality review of proposal responses |
| [Requirements-Response Strategy](/docs/agents/rfp/requirements-response-strategy) | Comprehensive gap analysis and win strategy |
| [Compliance & Contracts](/docs/agents/rfp/compliance-and-contracts) | Regulatory and contract risk assessment |
| [Proposal Scoring](/docs/agents/rfp/proposal-scoring) | Multi-dimension scoring matrix |
| [Technical & Planning](/docs/agents/rfp/technical-and-planning) | Architecture review, timeline, stakeholder analysis |

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

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [Projects](/docs/rfp-advisor/projects) | How projects organize RFP work |
| [File Upload](/docs/rfp-advisor/file-upload) | How documents are processed |
| [Indexing](/docs/rfp-advisor/indexing) | How search works |
| [Chat](/docs/rfp-advisor/chat) | How to interact with documents |
| [WorkSphere Agents](/docs/agents) | Overview of all available agents |
| [Platform Overview](/docs/platform/high-level-architecture) | How RFP Advisor fits in Trinity |
