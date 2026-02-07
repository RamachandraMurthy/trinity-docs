// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Trinity Documentation',
  tagline: 'Enterprise AI platform documentation for WorkSphere',
  favicon: 'img/favicon.ico',

  customFields: {
    geminiApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  },

  // Set the production url of your site here
  url: 'https://trinity-docs.internal',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config (not used for internal hosting)
  organizationName: 'dxc',
  projectName: 'trinity-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    require.resolve('./src/plugins/docs-ai-index'),
  ],

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
          sidebarCollapsed: false,
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
      image: 'img/trinity-social-card.png',
      navbar: {
        title: 'Trinity',
        logo: {
          alt: 'Trinity Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/platform/high-level-architecture',
            label: 'Architecture',
            position: 'left',
          },
          {
            to: '/docs/frontend',
            label: 'Frontend',
            position: 'left',
          },
          {
            to: '/docs/api-reference',
            label: 'API',
            position: 'left',
          },
          {
            type: 'html',
            position: 'right',
            value: '<span class="navbar-version-badge">v2.0</span>',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Getting Started',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Platform Architecture',
                to: '/docs/platform/high-level-architecture',
              },
              {
                label: 'Developer Guide',
                to: '/docs/developer-guide',
              },
            ],
          },
          {
            title: 'Platform',
            items: [
              {
                label: 'Frontend',
                to: '/docs/frontend',
              },
              {
                label: 'Backend',
                to: '/docs/backend',
              },
              {
                label: 'AI & MCP',
                to: '/docs/ai-and-mcp',
              },
              {
                label: 'API Reference',
                to: '/docs/api-reference',
              },
            ],
          },
          {
            title: 'RFP & Agents',
            items: [
              {
                label: 'RFP Advisor',
                to: '/docs/rfp-advisor',
              },
              {
                label: 'WorkSphere Agents',
                to: '/docs/agents',
              },
              {
                label: 'RFP Advisor Agents',
                to: '/docs/agents/rfp/requirements-review',
              },
              {
                label: 'Special Agents',
                to: '/docs/agents/special/deal-qualification',
              },
            ],
          },
          {
            title: 'Infrastructure',
            items: [
              {
                label: 'Authentication',
                to: '/docs/authentication',
              },
              {
                label: 'Data Layer',
                to: '/docs/data-layer',
              },
              {
                label: 'Deployment',
                to: '/docs/deployment',
              },
              {
                label: 'SalesCoach',
                to: '/docs/salescoach',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DXC Technology — Trinity Platform (WorkSphere). Built with Docusaurus.`,
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
