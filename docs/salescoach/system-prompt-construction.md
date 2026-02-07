# System Prompt Construction

This document details how the system prompt is constructed and managed in the SalesCoach application. The system prompt serves as the foundational instruction set for the AI models, defining behavior, context, and operational rules.

## Overview

The system prompt is a critical component that guides the AI's responses and behavior. In SalesCoach, it's dynamically constructed from external storage with runtime replacements to ensure up-to-date context and security. This approach allows for centralized prompt management without code deployments.

**Key Characteristics:**
- **External Storage**: Prompts are stored in Azure Blob Storage for easy updates and version control.
- **Dynamic Replacements**: Runtime substitutions for date-sensitive content and role-based tool access.
- **Role-Based Access Control**: MCP server availability is filtered based on user roles for security and compliance.
- **Session-Specific Customization**: Prompts can be modified per WebSocket session for contextual adaptations.
- **Security & Compliance**: Centralized control ensures consistent application of rules across all interactions.

---

## Common vs. Role-Specific Construction

The system prompt has two distinct layers:

### Common Elements (Shared Across All Users)
- Core AI instructions and behavior rules
- Application context (DXC-specific rules)
- Security and formatting policies
- General capabilities and constraints

### Role-Specific Elements (Unique per User)
- Available MCP server tools list
- Tool access permissions based on user role

This design ensures **consistent AI behavior** while providing **role-appropriate tool access**.

---

## Construction Flow Diagram

```mermaid
graph TD
    A[Azure Blob Storage] --> B[Load Base Prompt<br/>mcp_backend_system_prompt.txt]
    B --> C[Replace {{TODAY_DATE}}<br/>with current date]
    C --> D[Base Prompt Ready<br/>Common for all users]
    
    E[WebSocket Session<br/>Established] --> F[Get User Role<br/>from session_storage]
    F --> G[Filter MCP Servers<br/>by user role]
    G --> H[Generate Server List<br/>{{MCP_Servers_Description}}]
    
    D --> I[Combine Base Prompt<br/>+ Role-Filtered Tools]
    H --> I
    I --> J[Final System Prompt<br/>Ready for AI]
    
    J --> K[AI Processing<br/>with Role-Appropriate Tools]
    
    style D fill:#e1f5fe
    style I fill:#c8e6c9
    style J fill:#fff3e0
```

---

## Technical Flow

This system prompt construction integrates with the broader SalesCoach architecture as outlined in [architecture.md](architecture.md):

- **AI/LLM Layer**: The constructed prompt is fed to Azure OpenAI models (`gpt-4.1-mini` for chat, `gpt-4o-realtime` for legacy voice).
- **Tool Protocol**: The prompt includes instructions for Model Context Protocol (MCP) tool orchestration.
- **Real-time Communication**: Prompts are managed per WebSocket session in the `RTMiddleTier` and chat services.
- **Configuration Management**: Prompt sources are configured via environment variables in the `.env` file.

---

## Technical Flow

### 1. Base Prompt Loading (Common)

The base system prompt is loaded from Azure Blob Storage using the `PromptLoader` class.

```python
# prompt_loader.py - Base loading
class PromptLoader:
    def get_prompt(self, prompt_type: str) -> str:
        # Fetch from blob storage
        blob_name = "mcp_backend_system_prompt.txt"
        content = self._fetch_from_blob_storage(blob_name)
        return content
```

**Configuration Requirements:**
- `AZURE_STORAGE_ACCOUNT_NAME`: Storage account identifier
- `AZURE_STORAGE_ACCOUNT_KEY`: Access credentials
- `AZURE_STORAGE_CONTAINER_NAME`: Container holding prompt files (defaults to "prompts")

### 2. Date Replacement (Common)

The `{{TODAY_DATE}}` placeholder is replaced with the current UTC date.

```python
# streamablemcpservers.py - Date injection
self.today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
self.systemprompt = self.systemprompt.replace("{{TODAY_DATE}}", self.today)
```

### 3. Role-Based MCP Server Filtering (Role-Specific)

During session initialization, the `{{MCP_Servers_Description}}` placeholder is replaced with a filtered list based on user role.

```python
# websocket_chat_service.py - Role filtering
async def get_ordered_mcp_servers_description(self, user_role: str) -> str:
    # Filter servers where user_role matches server's allowed roles
    for server_config in self.chatbot.mcpservers.values():
        server_roles = server_config.get('roles', '').split(',')
        if user_role in server_roles:
            # Include in filtered list
```

**Role Determination:**
- Retrieved from session storage: `session_storage[ws].get("role", "HR")`
- Defaults to "HR" if not specified
- Roles are configured in MCP server definitions (comma-separated strings)

### 4. Session Assignment

The constructed prompt is stored per WebSocket session.

```python
# Session storage
session_storage[ws]["systemprompt"] = final_prompt
```

### 5. Dynamic Updates

Prompts can be modified during active sessions for additional contextual adaptations.

```python
# websocket_chat_service.py - Update mechanism
async def update_session_system_prompt(self, ws, additional_replacements=None):
    system_prompt = self.chatbot.rtmt.session_storage[ws]["systemprompt"]
    
    # Apply additional replacements
    if additional_replacements:
        for key, value in additional_replacements.items():
            system_prompt = system_prompt.replace(key, value)
    
    # Update session
    self.chatbot.rtmt.session_storage[ws]["systemprompt"] = system_prompt
```

---

## Example Final Prompt Structure

**Base Template (from Blob Storage):**
```
System Identity:
You are an orchestration agent for DXC Technology.

Application Context:
- This application is built for DXC Technology.
- Today's date is: {{TODAY_DATE}}

Available Tools:
{{MCP_Servers_Description}}

[Rest of instructions...]
```

**After Construction (Sales Role):**
```
System Identity:
You are an orchestration agent for DXC Technology.

Application Context:
- This application is built for DXC Technology.
- Today's date is: 2026-02-07

Available Tools:
1. Salesforce CRM data access for sales operations
2. Web search capabilities for market research
3. Resource Management system for project tracking

[Rest of instructions...]
```

**After Construction (HR Role):**
```
System Identity:
You are an orchestration agent for DXC Technology.

Application Context:
- This application is built for DXC Technology.
- Today's date is: 2026-02-07

Available Tools:
1. Employee Directory access
2. Resource Management system for project tracking
3. Internal HR database queries

[Rest of instructions...]
```

---

## Prompt Types

The system supports multiple prompt types for different use cases:

| Prompt Type | Blob File | Purpose | Usage |
|-------------|-----------|---------|-------|
| `mcp_backend_system_prompt` | `mcp_backend_system_prompt.txt` | Main chat orchestration | WebSocket chat services |
| `voice_assistant_system_prompt` | `voice_assistant_system_prompt.txt` | Voice interaction guidance | Legacy realtime endpoint |
| `audio_summary_system_prompt` | `audio_summary_system_prompt.txt` | Audio processing summaries | Audio analysis features |

---

## Security & Best Practices

- **Access Control**: Blob storage access is restricted via Azure Storage keys.
- **Version Control**: Prompts are versioned in blob storage; use `force_refresh=True` for immediate updates.
- **Error Handling**: Failures to load prompts raise exceptions, preventing degraded operation.
- **Audit Trail**: All prompt fetches are logged for debugging and compliance.

> [!NOTE]
> The local `backend_system_prompt.txt` file is unused and should be removed to avoid confusion. All prompts are sourced from Azure Blob Storage.

---

## Troubleshooting

**Common Issues:**
- **Blob Storage Connection Failed**: Verify `AZURE_STORAGE_*` environment variables.
- **Prompt Not Updating**: Use `force_refresh=True` or check blob storage permissions.
- **Date Not Replacing**: Ensure `{{TODAY_DATE}}` placeholder exists in the blob-stored prompt.

**Debug Commands:**
```bash
# Check blob storage connectivity
python -c "from prompt_loader import get_mcp_backend_prompt; print(get_mcp_backend_prompt())"
```

---

## Related Documentation

- [architecture.md](./architecture.md) - Overall system architecture
- [Step 2: Authentication](./flow/step2-authentication.md) - Session initialization after prompt setup
- [Step 3: Query Processing](./flow/step3-query.md) - How prompts guide query processing