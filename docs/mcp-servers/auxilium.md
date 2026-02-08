---
sidebar_position: 1
title: Auxilium Server
description: MCP server that connects Trinity to the existing Auxilium vector index for past proposals
---

# Auxilium MCP Server

## Overview

The **Auxilium MCP Server** is a Model Context Protocol (MCP) server that connects Trinity to the existing Auxilium vector index. Auxilium is DXC's AI assistant for past proposals — it uses a vector index built from past proposals and other reference materials to answer questions via RAG (Retrieval-Augmented Generation).

Rather than building a separate data pipeline, this MCP server simply provides Trinity with access to the same Auxilium index. When a user asks a question in Trinity that requires proposal or reference content, the server queries the Auxilium index and returns the results.

---

## What Data It Provides

The server connects to the Auxilium vector index, which contains past proposals and related reference materials:

| Content Type | What It Contains |
|--------------|------------------|
| **Past Proposals** | Historical proposal content that can be reused or referenced |
| **Case Studies** | Customer success stories and reference accounts |
| **Battlecards** | Competitive positioning information |
| **Presentations** | Slide decks and presentation materials |
| **Sales Materials** | Brochures, sales guides, and marketing collateral |

For GIS-specific queries, the server can filter results to content related to:
- Cloud Infrastructure and IT Outsourcing
- Security services
- Modern Workplace solutions
- Horizontal Business Process Services

---

## Data Model

The Auxilium index stores documents with content fields and metadata for filtering:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUXILIUM VECTOR INDEX                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    DOCUMENT RECORD                        │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  • Document ID                                            │  │
│  │  • Title                                                  │  │
│  │  • Content (vectorized for semantic search)               │  │
│  │  • URL / Source Path                                      │  │
│  │  • Service Line (for filtering)                           │  │
│  │  • Asset Type (for filtering)                             │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The index supports semantic search — queries are matched by meaning rather than just keywords.

---

## How It Works

When a user asks a question in Trinity that needs proposal or reference content, the request flows through the system:

```
    ┌──────────┐                                                      
    │   USER   │                                                      
    └────┬─────┘                                                      
         │ "What past proposals do we have for cloud migration?"      
         ▼                                                            
    ┌──────────┐                                                      
    │ TRINITY  │  Determines it needs proposal/reference content      
    │    AI    │                                                      
    └────┬─────┘                                                      
         │                                                            
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  AUXILIUM                   │  Queries the existing             
    │  MCP SERVER                 │  Auxilium vector index            
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────────┐                                                  
    │  AUXILIUM    │  The same vector index used                      
    │  VECTOR      │  by the Auxilium chatbot                         
    │  INDEX       │                                                  
    └────┬─────────┘                                                  
         │                                                            
         │ Returns matching documents                                 
         ▼                                                            
    ┌─────────────────────────────┐                                   
    │  AUXILIUM                   │  Returns results to Trinity       
    │  MCP SERVER                 │                                   
    └────┬────────────────────────┘                                   
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │ TRINITY  │  Uses the results to formulate                       
    │    AI    │  a response                                          
    └────┬─────┘                                                      
         │                                                            
         ▼                                                            
    ┌──────────┐                                                      
    │   USER   │  Receives the answer                                 
    └──────────┘                                                      
```

This is the same RAG pattern used by the Auxilium chatbot — Trinity just accesses the index through this MCP server instead of directly.

---

## Capabilities

The server provides the following capabilities for querying the Auxilium index:

| Capability | What It Does |
|------------|--------------|
| **Document search** | Searches the Auxilium index for relevant proposals and reference materials |
| **Document retrieval** | Retrieves a specific document by its ID |
| **Search suggestions** | Provides type-ahead suggestions based on partial input |
| **Autocomplete** | Completes partial search terms |
| **GIS content search** | Searches with filters applied for infrastructure and security content |
| **General question answering** | Handles open-ended questions by searching for matching content |
| **Offering information lookup** | Searches for content about DXC services and offerings |

---

## Related Documentation

| Section | What You'll Learn |
|---------|-------------------|
| [MCP Servers Overview](/docs/mcp-servers) | How MCP servers connect the AI to business data |
| [RFP Advisor](/docs/rfp-advisor) | Another way to work with proposals and RFP content |
| [Client Reference Server](/docs/mcp-servers/client-reference) | Client reference profiles and case studies |
| [AI & Models](/docs/ai-and-mcp) | How the AI brain works with data tools |
| [Backend Architecture](/docs/backend) | How the backend coordinates data requests |
