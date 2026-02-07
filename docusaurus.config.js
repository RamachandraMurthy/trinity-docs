// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Trinity Documentation',
  tagline: 'Unified documentation for the Trinity AI platform',
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
            to: '/docs/salescoach/architecture',
            label: 'Architecture',
            position: 'left',
          },
          {
            to: '/docs/salescoach/security-vulnerabilities',
            label: 'Security',
            position: 'left',
          },
          {
            type: 'html',
            position: 'right',
            value: '<span class="navbar-version-badge">v1.0</span>',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'SalesCoach',
                to: '/docs/salescoach',
              },
              {
                label: 'Application Flow',
                to: '/docs/salescoach/flow/step1-connect',
              },
            ],
          },
          {
            title: 'Architecture',
            items: [
              {
                label: 'System Design',
                to: '/docs/salescoach/architecture',
              },
              {
                label: 'Improvements',
                to: '/docs/salescoach/architecture-improvements',
              },
              {
                label: 'Security Assessment',
                to: '/docs/salescoach/security-vulnerabilities',
              },
            ],
          },
          {
            title: 'Platform',
            items: [
              {
                label: 'Trinity Overview',
                to: '/docs/intro',
              },
              {
                label: 'MCP Integration',
                to: '/docs/salescoach/flow/step5-tools',
              },
            ],
          },
        ],
        copyright: `Copyright \u00A9 ${new Date().getFullYear()} DXC Technology \u2014 Trinity Platform. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['python', 'json', 'bash'],
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
