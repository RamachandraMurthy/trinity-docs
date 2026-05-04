/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',

    // 1. Architecture (top-level overview, mirrors the deck's first 4 topics)
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'platform/high-level-architecture',
        'platform/reference-architecture',
        'platform/user-interaction-model',
        'platform/end-to-end-request-lifecycle',
      ],
    },

    // 2. Experience Layer (what users see)
    {
      type: 'category',
      label: 'Experience Layer',
      link: { type: 'doc', id: 'frontend/index' },
      items: [
        'frontend/single-user-workspace',
        'frontend/ai-canvas',
        'frontend/agent-space',
        'realtime/index',
        'daily-recap/index',
        'frontend/file-upload',
        'frontend/email-sharing',
        'frontend/trinity-mobile',
      ],
    },

    // 3. Orchestration Layer (the brain)
    {
      type: 'category',
      label: 'Orchestration Layer',
      link: { type: 'doc', id: 'backend/index' },
      items: [
        'backend/claude-agent-sdk-orchestrator',
        'backend/chat-skills',
        'backend/personal-memory',
      ],
    },

    // 4. Agent & Execution Layer (5 patterns + agent catalog)
    {
      type: 'category',
      label: 'Agent & Execution Layer',
      link: { type: 'doc', id: 'agents/index' },
      items: [
        'agents/agent-strategy',
        'agents/autonomous-agent-primus',
        {
          type: 'category',
          label: 'Special Agents',
          items: [
            'agents/special/deal-qualification',
            'agents/special/win-probability',
            'agents/special/company-executives',
            'agents/special/competitor-analysis',
            'agents/special/pricing-strategy',
            'agents/special/client-profile',
            'agents/special/competitive-intelligence',
          ],
        },
        {
          type: 'category',
          label: 'RFP Agents',
          items: [
            'rfp-advisor/index',
            'rfp-advisor/projects',
            'rfp-advisor/file-upload',
            'rfp-advisor/indexing',
            'rfp-advisor/chat',
            'agents/rfp/requirements-review',
            'agents/rfp/response-review',
            'agents/rfp/requirements-response-strategy',
            'agents/rfp/compliance-and-contracts',
            'agents/rfp/proposal-scoring',
            'agents/rfp/technical-and-planning',
          ],
        },
      ],
    },

    // 5. MCP Integration Layer (data connectors)
    {
      type: 'category',
      label: 'MCP Integration Layer',
      link: { type: 'doc', id: 'mcp-servers/index' },
      items: [
        {
          type: 'category',
          label: 'Sales Servers',
          items: [
            {
              type: 'category',
              label: 'SFDC UDP (Salesforce Data)',
              link: { type: 'doc', id: 'mcp-servers/sfdc-udp/index' },
              items: [
                'mcp-servers/sfdc-udp/data-model',
                'mcp-servers/sfdc-udp/opportunity-management',
                'mcp-servers/sfdc-udp/ai-search',
              ],
            },
            'mcp-servers/account-directory',
            'mcp-servers/campaign',
            'mcp-servers/client-reference',
            'mcp-servers/opp-win-loss',
            'mcp-servers/win-prediction-service',
            'mcp-servers/market-intelligence',
            'mcp-servers/auxilium',
            'mcp-servers/contracts-legal',
          ],
        },
        {
          type: 'category',
          label: 'HR Servers',
          items: [
            'mcp-servers/hr-employee-data',
          ],
        },
        {
          type: 'category',
          label: 'Shared Servers',
          items: [
            'mcp-servers/o365',
            'mcp-servers/azure-app-url',
          ],
        },
      ],
    },

    // 6. Enterprise Data Layer
    {
      type: 'category',
      label: 'Enterprise Data Layer',
      link: { type: 'doc', id: 'data-layer/index' },
      items: [],
    },

    // 7. AI & Models (companion to Orchestration — what models, how the prompt is built)
    {
      type: 'category',
      label: 'AI & Models',
      link: { type: 'doc', id: 'ai-and-mcp/index' },
      items: [
        'ai-and-mcp/system-prompt-construction',
      ],
    },

    // 8. Authentication, Security & Governance (control plane)
    {
      type: 'category',
      label: 'Authentication, Security & Governance',
      link: { type: 'doc', id: 'authentication/index' },
      items: [],
    },

    // 9. Deployment & Operations
    {
      type: 'category',
      label: 'Deployment & Operations',
      link: { type: 'doc', id: 'deployment/index' },
      items: [],
    },
  ],
};

module.exports = sidebars;
