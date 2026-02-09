/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    
    // 1. Architecture (top-level overview)
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'platform/high-level-architecture',
      ],
    },
    
    // 2. Frontend (what users see)
    {
      type: 'category',
      label: 'Frontend',
      link: {
        type: 'doc',
        id: 'frontend/index',
      },
      items: [
        'realtime/index', // Real-Time moved under Frontend
        'daily-recap/index', // Daily Recap is a frontend feature
      ],
    },
    
    // 3. Backend (processing engine + orchestration)
    {
      type: 'category',
      label: 'Backend',
      link: {
        type: 'doc',
        id: 'backend/index',
      },
      items: [
        {
          type: 'category',
          label: 'Orchestration (SalesCoach)',
          link: {
            type: 'doc',
            id: 'salescoach/index',
          },
          items: [
            'salescoach/architecture',
            {
              type: 'category',
              label: '7-Step Application Flow',
              items: [
                'salescoach/flow/step1-connect',
                'salescoach/flow/step2-authentication',
                'salescoach/flow/step3-query',
                'salescoach/flow/step4-process',
                'salescoach/flow/step5-tools',
                'salescoach/flow/step6-respond',
                'salescoach/flow/step7-persist',
              ],
            },
          ],
        },
      ],
    },
    
    // 4. AI & Models (renamed from AI & MCP)
    {
      type: 'category',
      label: 'AI & Models',
      link: {
        type: 'doc',
        id: 'ai-and-mcp/index',
      },
      items: [
        'ai-and-mcp/system-prompt-construction',
      ],
    },
    
    // 5. MCP Servers (data connectors for AI)
    {
      type: 'category',
      label: 'MCP Servers',
      link: {
        type: 'doc',
        id: 'mcp-servers/index',
      },
      items: [
        // Sales Servers
        {
          type: 'category',
          label: 'Sales Servers',
          items: [
            {
              type: 'category',
              label: 'SFDC UDP (Salesforce Data)',
              link: {
                type: 'doc',
                id: 'mcp-servers/sfdc-udp/index',
              },
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
        // HR Servers
        {
          type: 'category',
          label: 'HR Servers',
          items: [
            'mcp-servers/hr-employee-data',
          ],
        },
        // Shared Servers
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
    
    // 6. WorkSphere Agents (agents umbrella)
    {
      type: 'category',
      label: 'WorkSphere Agents',
      link: {
        type: 'doc',
        id: 'agents/index',
      },
      items: [
        // Special Agents first (no project setup needed)
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
        // RFP Agents (bundled with RFP Advisor workflow)
        {
          type: 'category',
          label: 'RFP Agents',
          items: [
            // RFP Advisor setup workflow first
            'rfp-advisor/index',
            'rfp-advisor/projects',
            'rfp-advisor/file-upload',
            'rfp-advisor/indexing',
            'rfp-advisor/chat',
            // Then the RFP analysis agents
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
    
    // 7. Authentication & Security (standalone)
    {
      type: 'category',
      label: 'Authentication & Security',
      link: {
        type: 'doc',
        id: 'authentication/index',
      },
      items: [],
    },
    
    // 8. Data Layer (standalone)
    {
      type: 'category',
      label: 'Data Layer',
      link: {
        type: 'doc',
        id: 'data-layer/index',
      },
      items: [],
    },
    
    // 9. Deployment & DevOps (standalone)
    {
      type: 'category',
      label: 'Deployment & DevOps',
      link: {
        type: 'doc',
        id: 'deployment/index',
      },
      items: [],
    },
    
    // 10. Developer Guide (reference material at bottom)
    {
      type: 'category',
      label: 'Developer Guide',
      link: {
        type: 'doc',
        id: 'developer-guide/index',
      },
      items: [],
    },
    
    // 11. API Reference (reference material at bottom)
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'doc',
        id: 'api-reference/index',
      },
      items: [],
    },
  ],
};

module.exports = sidebars;
