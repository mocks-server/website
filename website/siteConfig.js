/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: 'https://domapic.com/assets/domapic-logo.png',
    infoLink: 'https://www.domapic.com',
    pinned: false,
  },
];

const organizationUrl = 'https://github.com/mocks-server';
const baseUrl = '/';
const repoUrl = `${organizationUrl}/main`;
const webSiteRepoUrl = `${organizationUrl}/website`;

const siteConfig = {
  title: 'Mocks Server', // Title for your website.
  tagline: 'A Node.js server for emulating REST APIs',
  url: 'https://mocks-server.netlify.com', // Your website URL
  repoUrl,
  baseUrl, // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'mocks-server',
  organizationName: 'mocks-server',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'get-started-intro', label: 'Docs'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/logo-white.svg',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#417080',
    secondaryColor: '#2a474d',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Javier Brea`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
  editUrl: `${webSiteRepoUrl}/edit/master/docs/`,

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: false,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  organizationUrl,
  webSiteRepoUrl,
  stackOverflowUrl: 'https://stackoverflow.com/questions/tagged/mocks-server',
  stackOverflowAskUrl: 'https://stackoverflow.com/questions/ask?tags=mocks-server',
  githubProjectUrl: 'https://github.com/orgs/mocks-server/projects/1',
  githubIssuesUrl: `${repoUrl}/issues`,
  blogUrl: `${baseUrl}blog`,
  npmUrl: 'https://www.npmjs.com/package/@mocks-server/main',
  codeOfConductUrl: `${repoUrl}/blob/master/.github/CODE_OF_CONDUCT.md`,
  contributingUrl: `${repoUrl}/blob/master/.github/CONTRIBUTING.md`,
  contributorCovenanceUrl: 'https://www.contributor-covenant.org/'
};

module.exports = siteConfig;
