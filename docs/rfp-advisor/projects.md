---
sidebar_position: 2
title: Projects
description: How projects organize RFP documents and work
---

# Projects

Projects are the primary way to organize work in RFP Advisor. Each project represents an RFP engagement and contains all related documents, conversations, and analysis reports.

---

## What Projects Do

Think of a project as a folder that keeps everything related to one proposal together:

- **Documents** — The RFP, your proposal drafts, supporting materials
- **Chat history** — Conversations about this project's documents
- **Agent reports** — Analysis results from WorkSphere Agents
- **Bookmarks** — Important insights you've saved

---

## Project Information

When creating a project, users provide details that help with organization and filtering:

| Field | Purpose |
|---|---|
| **Name** | Identifies the project (e.g., "Acme Corp Cloud Migration RFP") |
| **Description** | Brief notes about the engagement |
| **Region** | Geographic region (North America, EMEA, APJ, etc.) |
| **Offering** | Service category (Cloud Services, Application Development, etc.) |
| **Sales Stage** | Where the opportunity is in the pipeline |
| **Opportunity Type** | New business, renewal, expansion, etc. |

These metadata fields come from predefined lists that match your organization's sales process.

---

## Working with Projects

### Creating a Project

Users create projects from the Projects page. Each project name must be unique per user — you can't have two projects with the same name.

### Viewing Project Documents

Within a project, users see all uploaded files with their status:
- How many files are in the project
- Which files are fully processed and ready for analysis
- Any files still being processed

### Deleting a Project

When a project is deleted, everything associated with it is also removed:
- All uploaded documents (from storage and search index)
- All chat conversations related to the project
- All agent run history and reports
- All bookmarks

Users can preview what will be deleted before confirming.

---

## Document Caching

When WorkSphere Agents run, documents are uploaded to the AI service for analysis. To avoid re-uploading the same files repeatedly, the system caches these references at the project level.

- First agent run: Documents are uploaded and cached
- Subsequent runs: Cached references are reused (much faster)
- Cache can be manually cleared if documents have been updated

---

## Best Practices

**Naming** — Use descriptive names that identify the customer and RFP (e.g., "Acme Corp Cloud Migration 2025")

**Organization** — Create one project per RFP engagement; use metadata fields for filtering across projects

**File Management** — Upload all related documents to the same project; classify files appropriately (RFP Document, Proposal Response, Supporting Material)

**Cleanup** — Delete projects when they're no longer needed to free up storage

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [RFP Advisor Overview](/docs/rfp-advisor) | Overall capabilities |
| [File Upload](/docs/rfp-advisor/file-upload) | How to add documents to projects |
| [WorkSphere Agents](/docs/agents) | How agents use project documents |
