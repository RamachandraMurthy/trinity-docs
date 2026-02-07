---
sidebar_position: 4
title: Security Assessment
description: Security vulnerabilities assessment and remediation plan for SalesCoach
---

# Security Vulnerabilities Assessment

:::caution Critical Security Risks Identified
This application currently relies on client-side trust for authentication and authorization. Malicious users can easily impersonate other users, elevate privileges, and access unauthorized data.
:::

## 1. Critical Vulnerabilities

### 1.1 Broken Authentication & Identity Spoofing

**Severity:** Critical  
**Location:** `websocket_chat_service.py`, `app.py`

**Issue:**
The backend implicitly trusts user identity claims sent from the client without verification.

In `handle_session_update` (`websocket_chat_service.py`):

```python
email_id = data.get("email_id")
role = data.get("role")
# ...
self.chatbot.rtmt.session_storage[ws]["email_id"] = email_id
self.chatbot.rtmt.session_storage[ws]["role"] = role
```

**Exploit:** An attacker can connect to the WebSocket and send a `session.update` message with *any* email (e.g., `ceo@company.com`) and *any* role. The backend will accept this identity and allow actions (like joining groups) as that user.

**Recommendation:**
- **Validate Access Tokens:** The `accessToken` received must be cryptographically verified against the Identity Provider (Azure AD/Entra ID) using the public signing keys.
- **Extract Identity from Token:** The `email` and `role` (`oid` / `groups`) **MUST** be extracted from the validated token claims, *never* from the message body.

### 1.2 Insecure Direct Object References (IDOR)

**Severity:** Critical  
**Location:** `app.py` (REST API endpoints)

**Issue:**
API endpoints trust the `email` query parameter to permit access to sensitive data.

Code Example (`api_get_group_history`):

```python
requester_email = request.query.get('email') or request.headers.get('X-User-Email')
# ...
has_access = await manager.user_has_access(group_id, requester_email)
```

**Exploit:** An attacker can make a request to `/api/group/{group_id}/history?email=legitimate_member@company.com`. The `user_has_access` check will pass (because the legitimate member *does* have access), and the API will return the chat history to the attacker.

**Recommendation:**
- **Remove Email Parameter:** Do not accept email identity via query params.
- **Use JWT Middleware:** Implement a middleware that validates the `Authorization: Bearer <token>` header, extracts the user's identity, and passes that verified identity to the endpoint.

## 2. High Priority Risks

### 2.1 Lack of Role Enforcement

**Severity:** High  
**Location:** `websocket_group_chat_service.py`

**Issue:**
While there is logic to filter tools based on roles, the roles themselves are spoofable (see 1.1). Furthermore, explicit role boundaries (e.g., preventing a "Sales" user from modifying "HR" groups) rely on this spoofable identity.

### 2.2 Sensitive Data Logging

**Severity:** Medium  
**Location:** Global

**Issue:**
The application logs user content and potential PII.

Example from `websocket_chat_service.py`:

```python
logger.info(f"📝 Processing text query: {query_text[:100]}...")
```

**Risk:** If a user types a password or sensitive customer data, it is written to the application logs. In a production environment, this leaks sensitive data to log aggregators.

**Recommendation:**
- Sanitize logs. Never log input content. Log only metadata (e.g., "Received message len=150").

## 3. Configuration & Deployment

### 3.1 Secret Management

- **Observation:** `app.py` uses `load_dotenv()` for dev. Ensure `os.environ` is populated securely in production (e.g., Azure Key Vault).
- **Hardcoded Paths:** Commented-out code references local paths (e.g., `C:\\Users\\...`). While commented out, this indicates a lack of clean separation for configuration.

### 3.2 CORS Configuration

- `aiohttp_cors` is imported but specific restrictive policies may not be applied to all routes. If `cors.add(route, allowed_origins="*")` is used, it allows any site to interact with the backend (though WebSocket connections have their own cross-origin challenges).

## 4. Remediation Plan

1. **Immediate:** Disable the `api_get_group_history` and similar REST endpoints until auth is fixed.
2. **Short Term:** Implement Azure AD Token Validation. Replace `email_id = data.get("email")` with `email_id = decoded_token.get("email")`.
3. **Long Term:** Conduct a full penetration test, especially on the MCP tool execution layer (to ensure LLMs cannot be tricked into executing harmful tool commands).
