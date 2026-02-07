/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Platform Architecture',
      items: [
        'platform/high-level-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Frontend',
      link: {
        type: 'doc',
        id: 'frontend/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Backend',
      link: {
        type: 'doc',
        id: 'backend/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'AI & MCP',
      link: {
        type: 'doc',
        id: 'ai-and-mcp/index',
      },
      items: [
        'ai-and-mcp/system-prompt-construction',
      ],
    },
    {
      type: 'category',
      label: 'Authentication & Security',
      link: {
        type: 'doc',
        id: 'authentication/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Data Layer',
      link: {
        type: 'doc',
        id: 'data-layer/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Real-Time & WebSocket',
      link: {
        type: 'doc',
        id: 'realtime/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Deployment & DevOps',
      link: {
        type: 'doc',
        id: 'deployment/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      link: {
        type: 'doc',
        id: 'developer-guide/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'doc',
        id: 'api-reference/index',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'SalesCoach Backend',
      link: {
        type: 'doc',
        id: 'salescoach/index',
      },
      items: [
        'salescoach/architecture',
        'salescoach/architecture-improvements',
        'salescoach/security-vulnerabilities',
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
};

module.exports = sidebars;
