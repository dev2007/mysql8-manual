// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MySQL 8.0 中文参考手册',
  tagline: 'MySQL 8.0 中文参考手册',
  url: 'https://mysql.bookhub.tech',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dev2007', // Usually your GitHub org/user name.
  projectName: 'mysql8-manual', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["en", "zh"],
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        toExtensions: ['html'],
      },
    ],
  ],

  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8380975615223941',
      crossorigin: 'anonymous'
    },
    {
      src: 'https://hm.baidu.com/hm.js?ece50ab3c3bf1d0d5c67f008f83b769f',
      async: true
    }
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: 'keywords', content: 'mysql,sql,innodb,mysql中文,mysql文档' }],
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'MySQL 8.0 中文参考手册',
        hideOnScroll: true,
        logo: {
          alt: 'MySQL Logo',
          src: 'img/favicon.ico',
        },
        items: [
          {
            href: 'https://www.bookhub.tech',
            label: 'BookHub 首页',
            position: 'right',
          },
          {
            href: 'https://docs.bookhub.tech',
            label: '中文文档',
            position: 'right',
          },
          {
            href: 'https://github.com/dev2007/mysql8-manual',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub 仓库',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'BookHub',
            items: [
              {
                label: '首页',
                href: 'https://www.bookhub.tech'
              },
              {
                label: '中文文档',
                href: 'https://docs.bookhub.tech',
              },
            ],
          },
          {
            title: '其他文档',
            items: [
              {
                label: 'ElasticSearch',
                href: 'https://elasticsearch.bookhub.tech',
              },
              {
                label: 'Pac4j',
                href: 'https://pac4j.bookhub.tech',
              }
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '计算机书库',
                href: 'https://pdf.bookhub.tech',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} bookHub.tech`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'java', 'yaml', `json`]
      },
    }),
};

module.exports = config;
