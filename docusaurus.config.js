module.exports = {
  title: "Mocks Server",
  tagline: "node.js mock server",
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
    users: [
      {
        caption: "Domapic",
        image: "https://domapic.com/assets/domapic-logo.png",
        infoLink: "https://www.domapic.com",
        pinned: false,
      },
    ],
    gaGtag: true,
    organizationUrl: "https://github.com/mocks-server",
    webSiteRepoUrl: "https://github.com/mocks-server/website",
    stackOverflowUrl: "https://stackoverflow.com/questions/tagged/mocks-server",
    stackOverflowAskUrl: "https://stackoverflow.com/questions/ask?tags=mocks-server",
    githubProjectUrl: "https://github.com/orgs/mocks-server/projects/1",
    githubIssuesUrl: "https://github.com/mocks-server/core/issues",
    websiteIssuesUrl: "https://github.com/mocks-server/website/issues",
    blogUrl: "/blog",
    npmUrl: "https://www.npmjs.com/package/@mocks-server/main",
    codeOfConductUrl:
      "https://github.com/mocks-server/main/blob/master/.github/CODE_OF_CONDUCT.md",
    contributingUrl: "https://github.com/mocks-server/main/blob/master/.github/CONTRIBUTING.md",
    contributorCovenanceUrl: "https://www.contributor-covenant.org/",
    nextVersion: "v1.9.0",
  },
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          homePageId: "get-started-intro",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          editUrl: "https://github.com/mocks-server/website/edit/master/docs/",
          path: "./docs",
          sidebarPath: "../website/sidebars.json",
        },
        blog: {
          path: "blog",
        },
        theme: {
          customCss: "../src/css/custom.css",
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
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
          to: "/help",
          label: "Help",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
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
      links: [],
      copyright: "Copyright © 2020 Javier Brea",
      logo: {
        src: "img/logo-white.svg",
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
