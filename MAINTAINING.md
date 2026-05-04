# Maintaining Trinity Docs

This guide is for the team maintaining and refreshing the Trinity (WorkSphere) documentation site. The site was built (and refreshed) using **AI-assisted authoring** with a Claude Code skill that lives in this repo. This guide tells you how to set yourself up to do the same.

---

## What You're Maintaining

A Docusaurus 3 static site at `trinity-docs.internal`, organized around the platform's **5-layer reference architecture** (matches the official Trinity Architecture deck). The content is **conceptual, not code-level** — written for technical product managers, solutions architects, and team leads who need to understand the platform without reading code.

Style rules and a deck-aligned page-mapping table live in `.claude/skills/trinity-docs-refresh/SKILL.md`. Don't write docs without reading the skill first.

---

## Prerequisites — One-Time Setup

Each maintainer needs:

### 1. Local toolchain

| Tool | Why | Install |
|---|---|---|
| **Node.js 18+** and **npm** | Build the site | https://nodejs.org/ |
| **Git** | Version control | https://git-scm.com/ |

### 2. Claude Code (or equivalent AI assistant with file access)

The refresh workflow is designed for **Claude Code** — Anthropic's terminal-based AI coding assistant. Other AI assistants with file-read/write access (Cursor, Claude Desktop with MCP filesystem, etc.) will work, but the prompts in this guide assume Claude Code.

| Tool | Install |
|---|---|
| Claude Code | https://docs.claude.com/claude-code (CLI installer; requires an Anthropic API key or claude.ai subscription) |

### 3. Repos

Clone trinity-docs and — recommended for full-context refresh — the other Trinity sub-repos in the same parent directory:

```
your-workspace/
└── DXC-Trinity/                 ← parent directory
    ├── trinity-docs/            ← this repo (required)
    ├── trinity-core/            ← orchestrator (recommended for ground-truth refresh)
    ├── trinity-worksphere/      ← frontend (recommended)
    ├── trinity-autonomous/      ← Agent Primus (recommended)
    ├── trinity-mcp-sfdc/ ...    ← MCP servers (recommended)
    └── ... other sub-repos
```

**Minimum:** `trinity-docs` alone is enough for content edits and small refreshes. The AI can read the existing docs and the architecture deck.

**Recommended:** clone the other DXC-Trinity sub-repos so the AI can verify what's actually true in code (model versions, MCP server names, agent counts) before writing about them.

### 4. Access to the architecture deck

The architecture deck `Trinity Architecture 1.0.pptx` is the **canonical conceptual model** for trinity-docs. It lives in the DXC OneDrive at:

```
DXC.technology/2026/Trinity/Trinity Architecture 1.0.pptx
```

Sync it to your local OneDrive so Claude Code can read it when refreshing the Architecture sections. Note the path on your machine — you'll provide it when invoking the refresh skill.

### 5. First build sanity check

```bash
cd trinity-docs
npm install
npm run build           # must succeed; onBrokenLinks: 'throw' is intentional
npm start               # dev server with hot reload at http://localhost:3000
```

If the build fails on a fresh clone, stop and ask the previous maintainer — something is wrong before you start changing things.

---

## How the Site Is Structured (read this once)

```
trinity-docs/
├── docs/                        # All content (Markdown)
│   ├── intro.md                 # Documentation entry page (/docs/)
│   ├── platform/                # Architecture (4 deck-aligned pages)
│   ├── frontend/                # Experience Layer + features
│   ├── realtime/                # Real-Time & WebSocket
│   ├── daily-recap/             # Daily Brief / Podcast
│   ├── backend/                 # Orchestration Layer (Claude Agent SDK)
│   ├── ai-and-mcp/              # AI & Models, system prompt construction
│   ├── mcp-servers/             # MCP Integration Layer (per-server pages)
│   ├── agents/                  # Agent & Execution Layer (5 patterns)
│   ├── rfp-advisor/             # RFP Advisor workflow
│   ├── authentication/          # Auth, Security & Governance (control plane)
│   ├── data-layer/              # Enterprise Data Layer
│   └── deployment/              # Deployment & Operations
├── src/
│   ├── css/custom.css           # DXC branding, theme-responsive
│   └── pages/index.js           # Landing page (the site root, not /docs/)
├── static/img/                  # Logo + favicons only
├── .claude/skills/
│   └── trinity-docs-refresh/    # ← THE SKILL — read this before any refresh
│       └── SKILL.md
├── .cursor/rules/               # Style guide (also referenced by the skill)
├── sidebars.js                  # Sidebar order — matters
├── docusaurus.config.js         # Site config
└── package.json
```

The skill at `.claude/skills/trinity-docs-refresh/SKILL.md` encodes:
- The 5-layer canonical structure
- The deck → page-mapping table
- Naming conventions (e.g. always "Claude Agent SDK," never "Cloud Agent SDK")
- The page template
- Things to watch for (model drift, count drift, branding drift, status callouts)

---

## How to Use Claude Code to Refresh the Docs

There are three refresh modes, depending on scope.

### Mode A — Quick fix (a single page or a few lines)

Use this when something specific changed: a new MCP server, a model version, a typo, a clarification.

**Steps:**

1. Open Claude Code in the `trinity-docs` directory:
   ```bash
   cd path/to/DXC-Trinity/trinity-docs
   claude
   ```
2. Tell Claude Code what changed and where it should land. Example prompts:
   ```
   We added a new MCP server called trinity-mcp-procurement. Add a page under
   docs/mcp-servers/ following the same pattern as account-directory.md, update
   the sidebar, and add it to the catalog table in docs/mcp-servers/index.md.
   The skill in .claude/skills/trinity-docs-refresh/SKILL.md has the style rules.
   ```
   ```
   The model lineup changed — Claude Sonnet 4.7 is now the orchestrator default
   (was 4.6). Update docs/ai-and-mcp/index.md and any other page that mentions
   the model version. Check the build is clean.
   ```
3. Review the diff, ask for tweaks, and confirm.
4. Run `npm run build` to verify.
5. Commit.

### Mode B — Section refresh (one layer or topic)

Use this when a single section is stale or restructured: e.g. the Agent & Execution Layer needs an update because a new agent pattern was added.

**Steps:**

1. Open Claude Code from the **parent** `DXC-Trinity` directory (so it can read sub-repo source code if needed):
   ```bash
   cd path/to/DXC-Trinity
   claude
   ```
2. Invoke the skill explicitly:
   ```
   Use the trinity-docs-refresh skill at trinity-docs/.claude/skills/trinity-docs-refresh/SKILL.md.

   Refresh the Agent & Execution Layer section. The deck is at
   <YOUR-PATH>/OneDrive/.../Trinity Architecture 1.0.pptx. The current state of
   the agent registry is in trinity-core/config/agent_registry.json and the
   autonomous agent is in trinity-autonomous/.

   Walk through the section page by page. Show me each change before applying.
   Build after each page.
   ```
3. Steer the AI section by section. The skill is designed for this — it stops between pages and asks for confirmation.
4. Each page change should be followed by `npm run build`.
5. Commit when the section is clean.

### Mode C — Full refresh (architecture deck has been updated)

Use this when the deck itself has been updated with a new architecture phase, layer rename, or significant restructure.

**Steps:**

1. Open Claude Code from `DXC-Trinity`:
   ```bash
   cd path/to/DXC-Trinity
   claude
   ```
2. Invoke the skill for a full pass:
   ```
   Use the trinity-docs-refresh skill at trinity-docs/.claude/skills/trinity-docs-refresh/SKILL.md.

   The architecture deck has been updated. Path:
   <YOUR-PATH>/OneDrive/.../Trinity Architecture 1.0.pptx

   Walk the deck's 9 topics, identify what's changed vs. trinity-docs, and
   refresh the affected sections. Start with Architecture (top-level), then go
   layer by layer in the deck's order.

   Show me the sidebar reshuffle proposal first. Don't touch any files until I
   approve the structure.
   ```
3. Approve the sidebar shape before letting it write content.
4. Approve each section before moving to the next.
5. Build after each section.
6. **Update the skill itself** if any naming or layer model changed in the deck — the next person should inherit your improvements. Edit `.claude/skills/trinity-docs-refresh/SKILL.md` directly.

---

## Manual Tasks (no AI needed)

### Build verification

```bash
npm run build           # must pass — onBrokenLinks: 'throw'
npm run serve           # preview the production build at localhost:3000
```

If the build fails, the most common cause is a broken cross-link from a deleted page. The error message names the file.

### Why search doesn't work in `npm start`

The local search plugin (`@easyops-cn/docusaurus-search-local`) builds its index **only at `npm run build` time**, not in dev mode. In `npm start` you'll see a "search index is only available after running build" placeholder — that is expected, not a bug.

`npm start` and `npm run build` are deliberately separate tools — `start` is fast (hot reload, no plugin overhead) for editing, `build` is slow (30–60s) for production output. We don't combine them because doing so would kill the editing loop.

To test search locally:

```bash
npm run preview          # builds + serves in one command
```

(Or run `npm run build && npm run serve` separately if you want to inspect the build output between steps.)

Search works under `npm run preview` / `npm run serve` and on the deployed site. For day-to-day editing in `npm start`, use the sidebar or `Ctrl+F` in the browser.

### Dependency security

```bash
npm audit               # list advisories
npm audit fix           # safe fixes (no breaking changes)
```

If high-severity advisories accumulate, plan a Docusaurus version bump. The major version is in `package.json`. Check https://docusaurus.io/blog for migration notes before bumping.

### Find stale terminology

After a major rename or model change, sweep:

```bash
grep -rln "<old-term>" docs/ src/ docusaurus.config.js
```

Common stale terms to check periodically:
- "Azure OpenAI" (replaced with the current orchestrator's framing)
- "GPT-4.1", "gpt-4o" (specific model version drift)
- "SalesCoach" (the historical orchestrator name — keep one historical callout, replace elsewhere)
- "Express.js", "Node.js/Express" (the orchestrator was never Node — these are stale claims)

### Find dead links

The build does this automatically (`onBrokenLinks: 'throw'`). Don't disable it.

### Find oversized files

```bash
find docs src -name '*.md' -o -name '*.js' | xargs wc -l | sort -rn | head
```

Anything over 300 lines under `src/` is worth a look. Doc pages over 300 lines are usually fine — long pages are OK if the content is dense.

---

## Recurring Refresh Cadence

| When the platform changes... | Do this in trinity-docs |
|---|---|
| New MCP server added | Add a page under `docs/mcp-servers/`, update `sidebars.js`, refresh the catalog table in `docs/mcp-servers/index.md` |
| New agent (Special / RFP / Pattern) | Add or update under `docs/agents/`, refresh the catalog table in `docs/agents/index.md` |
| Model lineup changes | Update `docs/ai-and-mcp/index.md` model table |
| New experience surface | Add a page under `docs/frontend/`, update `docs/frontend/index.md` |
| Architecture deck updated | **Mode C full refresh** — the deck is canonical |
| Naming change | Repo-wide search via `grep -rln`, update everywhere |
| Deprecated feature | Mark with `:::warning` admonition; don't silently delete (URLs may be in the wild) |

**Monthly:** run a clean build (`rm -rf .docusaurus build && npm run build`) and confirm zero warnings, zero broken links.

**Quarterly:** cross-check the docs against the architecture deck. The deck wins on structure and terminology.

---

## Critical Rules — Do Not Violate

### Secrets

- **NO API keys, tokens, credentials, connection strings in source code.**
- **NO `.env` file with real values committed.** `.env` is in `.gitignore` — keep it that way.
- **AVOID `REACT_APP_*` env vars** unless you understand they get embedded in the public client JS bundle at build time. If you genuinely need an external API call, route it through a backend proxy, don't embed.

### Branding

- Use the deck's vocabulary: 5 layers, 5 agent patterns, control plane (Trinity Guardian, Guardrails, Wiz, Dynatrace).
- Always **"Claude Agent SDK"**, never "Cloud Agent SDK." (The deck uses Cloud externally; trinity-docs uses Claude — that's intentional and documented in the skill.)
- **Trinity** is the internal name; **WorkSphere** is the production brand at worksphere.dxc.ai. Both names are fine in prose; pick whichever fits context.
- Don't put individual contributor names in user-facing copy (footer, copyright, About).

### Voice

- Conceptual, not code-level. If a page reads like an API reference, stop and rewrite.
- Every page ends with a "Related Documentation" table. Non-negotiable.
- ASCII box diagrams for flows. No real network diagrams; mental models only.

### Build

- **Never commit a build that doesn't pass `npm run build`.**
- Don't disable `onBrokenLinks: 'throw'` to "fix" a broken-link error. Fix the link.
- Don't suppress deprecation warnings — fix the underlying config.

---

## Hosting & Deployment

The site is a **static build**. `npm run build` produces a `build/` directory of HTML/CSS/JS that any static host can serve.

| Concern | Where it lives |
|---|---|
| Production URL | `trinity-docs.internal` |
| Hosting | Azure App Service (confirm with infra team) |
| CI / deploy pipeline | Confirm with infra team |
| Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) | **Hosting tier**, not in the build. Verify with infra team. |
| TLS | Hosting tier |

**Before deploying:** always run `npm run build` locally and `npm run serve` to verify the production output. If the local build is silent and the site looks right at `localhost:3000`, the deployed site will too.

---

## Common Tasks Cheat Sheet

| Task | Command |
|---|---|
| Start dev server | `npm start` |
| Build for production | `npm run build` |
| Preview production build | `npm run serve` |
| Clear Docusaurus cache | `npm run clear` (or delete `.docusaurus/`) |
| Audit dependencies | `npm audit` |
| Safe dep fixes | `npm audit fix` |
| Search for stale terms | `grep -rln "<term>" docs/ src/ docusaurus.config.js` |
| Find dead links | `npm run build` (catches them) |

---

## When to Ask for Help

| Situation | What to do |
|---|---|
| Build fails and you can't see why | Check for broken links first (most common cause); read the error carefully |
| Deck terminology has changed and you're not sure how to map | Don't guess. Open the deck side-by-side and walk it slide by slide with Claude Code in Mode C |
| Reader reports content is wrong | Verify against the source repo (e.g. trinity-core for orchestration, trinity-mcp-* for MCP servers); confirm with the team that owns it before editing |
| `npm audit` shows critical advisories needing `--force` | Don't run `--force` blindly. Open a ticket; major dependency upgrades need testing |
| Skill needs to evolve (new layer, new pattern, new naming rule) | Edit `.claude/skills/trinity-docs-refresh/SKILL.md` and commit. The next person inherits your improvements |

---

## Trust the Build

The maintenance philosophy is simple: **trust the build to catch mistakes.** It catches broken links, missing pages, deprecation warnings, and dependency advisories. Your job is to keep the content honest and the structure clear. The tooling handles the rest.

When in doubt: build clean, eyeball locally, ship.
