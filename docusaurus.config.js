module.exports = {
  title: "Mocks Server",
  tagline: "Node.js mock server",
  url: "https://www.mocks-server.org",
  baseUrl: "/",
  organizationName: "mocks-server",
  projectName: "mocks-server",
  scripts: ["https://buttons.github.io/buttons.js"],
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
    nextVersion: "v2.7.0",
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
          sidebarPath: require.resolve("./sidebars.json"),
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.scss"),
            require.resolve("./src/css/index.scss"),
          ],
        },
        gtag: {
          trackingID: "UA-151983197-1",
          anonymizeIP: true,
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
          to: "docs/get-started-intro",
          label: "Get started",
          position: "right",
        },
        {
          to: "docs/configuration-options",
          label: "Configuration",
          position: "right",
        },
        {
          to: "docs/api-mocks-server-api",
          label: "API",
          position: "right",
        },
        {
          href: "https://github.com/mocks-server/main",
          "aria-label": "GitHub repository",
          position: "right",
          className: "navbar-github-link",
        },
        {
          type: "docsVersionDropdown",
          position: "left",
          dropdownActiveClassDisabled: true,
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
              to: "docs/get-started-intro",
            },
            {
              label: "Guides",
              to: "docs/guides-organizing-files",
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
      copyright: "Copyright © 2021 Javier Brea",
      logo: {
        alt: "Mocks Server logo",
        src: "img/logo-white.svg",
        href: "https://www.mocks-server.org",
      },
    },
    algolia: {
      appId: "3RB482WII9",
      apiKey: "1eda94213e49ee050c59779a025bc554",
      indexName: "mocks-server",
      contextualSearch: true,
    },
  },
};
