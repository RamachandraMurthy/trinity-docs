/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'SalesCoach',
      link: {
        type: 'doc',
        id: 'salescoach/index',
      },
      items: [
        'salescoach/architecture',
        'salescoach/architecture-improvements',
        'salescoach/security-vulnerabilities',
        'salescoach/system-prompt-construction',
        {
          type: 'category',
          label: 'Application Flow',
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
