// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Trinity Docs',
  tagline: 'Enterprise AI platform documentation for WorkSphere',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://trinity-docs.internal',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config (not used for internal hosting)
  organizationName: 'dxc',
  projectName: 'trinity-docs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Local search plugin (offline, no external service needed)
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          showLastUpdateTime: false,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Trinity Docs',
        logo: {
          alt: 'Trinity Logo',
          src: 'img/logo.svg',
        },
        items: [],
      },
      footer: {
        links: [
          {
            title: 'Get Started',
            items: [
              { label: 'Introduction', to: '/docs/intro' },
              { label: 'Platform Overview', to: '/docs/platform/high-level-architecture' },
              { label: 'Reference Architecture', to: '/docs/platform/reference-architecture' },
              { label: 'Request Lifecycle', to: '/docs/platform/end-to-end-request-lifecycle' },
            ],
          },
          {
            title: 'The Layers',
            items: [
              { label: 'Experience Layer', to: '/docs/frontend' },
              { label: 'Orchestration Layer', to: '/docs/backend' },
              { label: 'Agent & Execution Layer', to: '/docs/agents' },
              { label: 'MCP Integration Layer', to: '/docs/mcp-servers' },
              { label: 'Enterprise Data Layer', to: '/docs/data-layer' },
            ],
          },
          {
            title: 'Operations',
            items: [
              { label: 'AI & Models', to: '/docs/ai-and-mcp' },
              { label: 'Authentication, Security & Governance', to: '/docs/authentication' },
              { label: 'Deployment & Operations', to: '/docs/deployment' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} DXC Technology — Trinity (WorkSphere) Platform Documentation.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['python', 'json', 'bash', 'javascript', 'jsx', 'typescript', 'tsx', 'yaml'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

module.exports = config;
