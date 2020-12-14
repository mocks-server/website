module.exports = {
  title: "Mocks Server",
  tagline: "Node.js mock server",
  url: "https://www.mocks-server.org",
  baseUrl: "/",
  organizationName: "mocks-server",
  projectName: "mocks-server",
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-block-buttons.js",
  ],
  stylesheets: ["/css/code-block-buttons.css"],
  favicon: "img/favicon.ico",
  customFields: {
    repoUrl: "https://github.com/mocks-server/main",
    users: [],
    gaGtag: true,
    organizationUrl: "https://github.com/mocks-server",
    webSiteRepoUrl: "https://github.com/mocks-server/website",
    githubProjectUrl: "https://github.com/orgs/mocks-server/projects/1",
    githubIssuesUrl: "https://github.com/mocks-server/core/issues",
    websiteIssuesUrl: "https://github.com/mocks-server/website/issues",
    npmUrl: "https://www.npmjs.com/package/@mocks-server/main",
    codeOfConductUrl:
      "https://github.com/mocks-server/main/blob/master/.github/CODE_OF_CONDUCT.md",
    contributingUrl: "https://github.com/mocks-server/main/blob/master/.github/CONTRIBUTING.md",
    contributorCovenanceUrl: "https://www.contributor-covenant.org/",
    nextVersion: "v1.9.0",
  },
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          editUrl: "https://github.com/mocks-server/website/edit/master/docs/",
          path: "./docs",
          sidebarPath: "../website/sidebars.json",
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/index.scss"),
          ],
        },
      },
    ],
  ],
  plugins: ["docusaurus-plugin-sass"],
  themeConfig: {
    prism: {
      defaultLanguage: "javascript",
      additionalLanguages: ["bash", "json"],
    },
    navbar: {
      hideOnScroll: true,
      style: "dark",
      title: "Mocks Server",
      logo: {
        src: "img/favicon.ico",
      },
      items: [
        {
          to: "docs/",
          label: "Docs",
          position: "left",
        },
        {
          label: "Version",
          to: "docs",
          position: "right",
          items: [
            {
              label: "1.8.0",
              to: "docs/",
              activeBaseRegex: "docs/(?!1.3.0|1.4.0|1.5.0|1.6.0|1.7.0|1.8.0|next)",
            },
            {
              label: "1.7.0",
              to: "docs/1.7.0/",
            },
            {
              label: "1.6.0",
              to: "docs/1.6.0/",
            },
            {
              label: "1.5.0",
              to: "docs/1.5.0/",
            },
            {
              label: "1.4.0",
              to: "docs/1.4.0/",
            },
            {
              label: "1.3.0",
              to: "docs/1.3.0/",
            },
            {
              label: "Master/Unreleased",
              to: "docs/next/",
              activeBaseRegex: "docs/next/(?!support|team|resources)",
            },
          ],
        },
      ],
    },
    image: "img/og_image.jpg",
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/",
            },
            {
              label: "Guides",
              to: "docs/guides-defining-fixtures",
            },
            {
              label: "Configuration",
              to: "docs/configuration-options",
            },
            {
              label: "Plugins",
              to: "docs/plugins-adding-plugins",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Contributors guidelines",
              to: "https://github.com/mocks-server/main/blob/master/.github/CONTRIBUTING.md",
            },
            {
              label: "Code of conduct",
              to: "https://github.com/mocks-server/main/blob/master/.github/CODE_OF_CONDUCT.md",
            },
            {
              label: "Github project",
              to: "https://github.com/orgs/mocks-server/projects/1",
            },
            {
              label: "Issues",
              to: "https://github.com/mocks-server/core/issues",
            },
          ],
        },
        {
          title: "Find us",
          items: [
            {
              label: "Github",
              to: "https://github.com/mocks-server",
            },
            {
              label: "NPM",
              to: "https://www.npmjs.com/package/@mocks-server/main",
            },
          ],
        },
      ],
      copyright: "Copyright © 2020 Javier Brea",
      logo: {
        alt: "Mocks Server logo",
        src: "img/logo-white.svg",
        href: "https://www.mocks-server.org",
      },
    },
    algolia: {
      apiKey: "04369502839c280ae1d3ff3e790b8e31",
      indexName: "mocks-server",
      contextualSearch: true,
    },
    gtag: {
      trackingID: "UA-151983197-1",
    },
  },
};
