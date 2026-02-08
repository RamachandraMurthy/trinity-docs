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
      image: 'img/trinity-social-card.png',
      navbar: {
        title: 'Trinity',
        logo: {
          alt: 'Trinity Logo',
          src: 'img/logo.svg',
        },
        items: [],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Quick Links',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Architecture',
                to: '/docs/platform/high-level-architecture',
              },
              {
                label: 'API Reference',
                to: '/docs/api-reference',
              },
              {
                label: 'Developer Guide',
                to: '/docs/developer-guide',
              },
            ],
          },
          {
            title: 'Team',
            items: [
              {
                label: 'Ramachandra Murthy',
                href: 'mailto:ramachandra.murthy@dxc.com',
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
