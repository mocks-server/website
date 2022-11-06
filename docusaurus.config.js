function docsUrl(page) {
  if (page.endsWith("/")) {
    return `docs/${page}`;
  }
  return `docs/${page}/`;
}

module.exports = {
  title: "Mocks Server",
  tagline: "Node.js mock server",
  url: "https://www.mocks-server.org",
  baseUrl: "/",
  organizationName: "mocks-server",
  projectName: "mocks-server",
  scripts: ["https://buttons.github.io/buttons.js"],
  clientModules: [require.resolve("@fortawesome/fontawesome-svg-core/styles.css")],
  favicon: "img/favicon.ico",
  customFields: {
    repoUrl: "https://github.com/mocks-server/main",
    users: [],
    gaGtag: true,
    organizationUrl: "https://github.com/mocks-server",
    webSiteRepoUrl: "https://github.com/mocks-server/website",
    githubProjectUrl: "https://github.com/orgs/mocks-server/projects/1",
    githubIssuesUrl: "https://github.com/mocks-server/main/issues",
    websiteIssuesUrl: "https://github.com/mocks-server/website/issues",
    npmUrl: "https://www.npmjs.com/package/@mocks-server/main",
    codeOfConductUrl:
      "https://github.com/mocks-server/main/blob/master/.github/CODE_OF_CONDUCT.md",
    contributingUrl: "https://github.com/mocks-server/main/blob/master/.github/CONTRIBUTING.md",
    contributorCovenanceUrl: "https://www.contributor-covenant.org/",
  },
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  trailingSlash: true,
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          editUrl: "https://github.com/mocks-server/website/edit/master/",
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
          trackingID: "G-QQX2Q93YDS",
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
          to: docsUrl("overview"),
          label: "Docs",
          position: "right",
        },
        {
          to: docsUrl("configuration/how-to-change-settings"),
          label: "Configuration",
          position: "right",
        },
        {
          to: docsUrl("api/javascript"),
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
              label: "Overview",
              to: docsUrl("overview"),
            },
            {
              label: "Usage",
              to: docsUrl("usage/basics"),
            },
            {
              label: "Configuration",
              to: docsUrl("configuration/how-to-change-settings"),
            },
            {
              label: "Customization",
              to: docsUrl("variant-handlers/intro"),
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
              label: "Github Issues",
              to: "https://github.com/mocks-server/main/issues",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/MocksServer",
            },
          ],
        },
        {
          title: "Acknowledgements",
          items: [
            {
              label: "Built with Docusaurus",
              to: "https://docusaurus.io/",
            },
            {
              html: `
                  <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
                    <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" width="100" height="50" />
                  </a>
                `,
            },
          ],
        },
      ],
      copyright: `
        <div class="footer-contents">
          <span>Copyright © 2019-${new Date().getFullYear()}  Javier Brea</span>
          <span class="disclaimer">Trademarks, logos and brand names are the property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names,trademarks and brands does not imply endorsement.</span>
        </div>
      `,
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
