---
sidebar_position: 4
title: Search & Indexing
description: How documents become searchable in RFP Advisor
---

# Search & Indexing

After documents are uploaded and processed, they become searchable. RFP Advisor uses Azure AI Search to provide both traditional keyword search and intelligent semantic search.

---

## Two Ways to Search

### Keyword Search

Traditional text matching — finds documents containing the exact words you search for.

**Best for:**
- Specific terms or phrases
- Finding exact wording from the RFP
- Known requirement numbers or sections

**How it works:**
The search engine looks for exact matches and ranks results by how often and prominently your terms appear.

### Semantic Search

AI-powered search that understands the meaning behind your query.

**Best for:**
- Natural language questions
- Finding related concepts even if exact words differ
- Exploratory research

**How it works:**
Your query is converted to a mathematical representation (embedding) and compared to document embeddings. Documents with similar meaning rank higher, even if they use different words.

---

## What Gets Indexed

When a document is processed, several elements are added to the search index:

| Element | Purpose |
|---|---|
| **Title** | Document filename — used for display and relevance |
| **Content** | Full extracted text — the main searchable content |
| **Summary** | AI-generated summary — provides quick context |
| **Vector embeddings** | Mathematical representations for semantic search |
| **Metadata** | Project ID, upload date, file type — used for filtering |

---

## How Semantic Search Works

Semantic search uses **vector embeddings** — a way of representing text as numbers that capture meaning.

```
"What are the security requirements?"
                    │
                    ▼
         Convert to vector embedding
         [0.23, -0.15, 0.87, ...]
                    │
                    ▼
        Compare to all document embeddings
                    │
                    ▼
        Rank by similarity score
                    │
                    ▼
        Return most relevant results
```

This means a search for "security requirements" can find documents that talk about "data protection policies" or "access control specifications" — even if they don't use the exact word "security."

---

## Search Results

### Keyword Search Results

- **Score** — How well the document matches your query
- **Highlights** — Snippets showing where your terms appear

### Semantic Search Results

- **Reranker score** — AI-refined relevance rating
- **Captions** — AI-generated answer snippets from the content
- **Similar concepts** — May match documents using different terminology

---

## Filtering by Project

You can search within a specific project or across all projects:

- **Within project** — Faster, more focused results for one engagement
- **Across projects** — Useful for finding patterns or reusing content from past proposals

---

## Search Best Practices

**For keyword search:**
- Use specific terms from the RFP
- Quote phrases for exact matches
- Include requirement numbers if known

**For semantic search:**
- Ask questions naturally
- Describe what you're looking for conceptually
- Try rephrasing if results aren't what you expected

**General tips:**
- Filter by project when possible for faster, more relevant results
- Use keyword search when you know the exact terminology
- Use semantic search when exploring or unsure of exact wording

---

## Related Documentation

| Section | What You'll Learn |
|---|---|
| [File Upload](/docs/rfp-advisor/file-upload) | How documents are processed |
| [Chat](/docs/rfp-advisor/chat) | How to ask questions about documents |
| [Data Layer](/docs/data-layer) | Azure AI Search architecture |
