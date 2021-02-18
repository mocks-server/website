import React from "react";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import GitHubButton from "react-github-btn";
import Head from "@docusaurus/Head";

import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import useText from "@theme/custom-hooks/useText";

const textContents = {
  benefitsEasyToUse: `
    Change the current mock and other settings while the server is running using the [interactive CLI](docs/plugins-inquirer-cli) or the [admin REST API](docs/plugins-admin-api). [Integrations with other tools](docs/integrations-cypress) are also available.
  `,
  benefitsRouteVariants: `
    Define different responses for the same [route](docs/get-started-routes), and group them into different [mocks](docs/get-started-mocks).
    Ensure that your API client is ready to handle all cases both in development and testing phases.
  `,
  benefitsMultipleFormats: `
    Define [routes](docs/get-started-routes) and [mocks](docs/get-started-mocks) using <code>json</code> files or JavaScript files. 
    Define responses using plain objects, or even Express middlewares. Hot reload changes the responses in real time once files are changed.
  `,
  easyToUse: `
    Install and start it in seconds. Read [get started](docs/get-started-intro) to know how it works and you will be adding your own routes in minutes.
    <br/><br/>
    Modify the [configuration file](docs/configuration-file), or use the [interactive CLI](docs/plugins-inquirer-cli) or the [admin REST API](docs/plugins-admin-api) for changing settings while it is running.
    <br/><br/>
    There are also available packages for integrating the Mocks Server with other development tools. <code>@mocks-server/cypress-commands</code> allows to easily control the mock server from Cypress.
    Read the [Cypress integration chapter for further info](docs/integrations-cypress)
  `,
  flexible: `
    Define route variants for HTTP responses in JSON files, or as JavaScript objects.
    <br/><br/>
    [Express middlewares](docs/guides-using-middlewares) can be also used for more complex scenarios.
    <br/><br/>
    Group route variants into different [mocks](docs/get-started-mocks).
    <br/>
    Mocks can be created extending from another ones, so you can modify or add new routes to the main mock,
    and the rest of mocks will inherit them.
    <br/><br/>
    If this is not enough, you can even [add your own route handlers](docs/api-routes-handler) to add more formats for defining route variants.
  `,
  flexibleJsonCode: `
// mocks/routes/users.json
[
  {
    "id": "get-user",
    "url": "/api/user/:id",
    "method": "GET",
    "variants": [
      {
        "id": "success",
        "response": {
          "status": 200,
          "body": { "id": 1, "name": "John Doe"}
        }
      },
      {
        "id": "not-found",
        "response": {
          "status": 404
        }
      }
    ]
  }
]
  `,
  customizable: `
    Plugins can be easily [installed from NPM](docs/plugins-adding-plugins) or [developed](docs/plugins-developing-plugins).
    <br/>
    <br/>
    Plugins can do a lot of things in Mocks Server. Even some very important built-in internal pieces are, in fact, plugins.
    So, you could use plugins to provide more interfaces, add [more routes handlers](docs/api-routes-handler), add <code>express</code> routers to the server, etc.
    <br/>
    <br/>
    Read also the [programmatic usage chapter](docs/api-programmatic-usage) to learn how to use Mocks Server from your own program.
  `,
  customizableCode: `
class MyPlugin {
  constructor(mocksServer) {
    mocksServer.addSetting({
      name: "traceMocks",
      type: "boolean",
      description: "Trace mocks changes",
      default: true
    });

    mocksServer.onChangeMocks(this._onChangeMocks.bind(this))
  }
  // ...
}
  `,
  flexibleJsCode: `
const users = require("./db/users");

module.exports = {
  id: 'get-users',
  url: '/api/users',
  method: 'GET',
  response: (req, res) => {
    res.status(200);
    res.send(users);
  },
}
  `,
  upcoming: `
    Administration web user interface, Chrome extension, Proxy fallback, Web Sockets, etc.
  `,
};

const useContent = (textKey) => {
  return useText(textContents[textKey]);
};

function Heading({ text }) {
  return <h2 className="Heading">{text}</h2>;
}

function ActionButton({ href, type = "primary", target, children }) {
  return (
    <a className={`ActionButton ${type}`} href={href} target={target}>
      {children}
    </a>
  );
}

function TextColumn({ title, text, moreContent }) {
  return (
    <>
      <Heading text={title} />
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {moreContent}
    </>
  );
}

function HomeCallToAction() {
  return (
    <>
      <ActionButton type="primary" href={useBaseUrl("docs/get-started-intro")} target="_self">
        Get started
      </ActionButton>
      <ActionButton type="secondary" href={useBaseUrl("docs/get-started-routes")} target="_self">
        Learn basics
      </ActionButton>
    </>
  );
}

function GitHubStarButton() {
  return (
    <div className="github-button">
      <GitHubButton
        href="https://github.com/mocks-server/main"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star Mocks Server on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  );
}

function Section({ element = "section", children, className, background = "light" }) {
  const El = element;
  return <El className={`Section ${className} ${background}`}>{children}</El>;
}

function TwoColumns({ columnOne, columnTwo, reverse }) {
  return (
    <div className={`TwoColumns ${reverse ? "reverse" : ""}`}>
      <div className={`column first ${reverse ? "right" : "left"}`}>{columnOne}</div>
      <div className={`column last ${reverse ? "left" : "right"}`}>{columnTwo}</div>
    </div>
  );
}

function ThreeColumns({ columnOne, columnTwo, columnThree }) {
  return (
    <div className={`ThreeColumns`}>
      <div className={`column first left`}>{columnOne}</div>
      <div className={`column center`}>{columnTwo}</div>
      <div className={`column last right`}>{columnThree}</div>
    </div>
  );
}

function HeaderHero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Section background="dark" className="HeaderHero">
      <TwoColumns
        reverse
        columnOne={<img alt="Interactive CLI animation" src={useBaseUrl("img/logo-white.svg")} />}
        columnTwo={
          <>
            <h1 className="title">{siteConfig.title}</h1>
            <p className="tagline">{siteConfig.tagline}</p>
            <div className="buttons">
              <HomeCallToAction />
            </div>
          </>
        }
      />
    </Section>
  );
}

function Benefits() {
  return (
    <Section className="Benefits">
      <ThreeColumns
        reverse
        columnOne={
          <TextColumn title="Route variants" text={useContent("benefitsRouteVariants")} />
        }
        columnTwo={
          <TextColumn title="Multiple formats" text={useContent("benefitsMultipleFormats")} />
        }
        columnThree={<TextColumn title="Easy to use" text={useContent("benefitsEasyToUse")} />}
      />
    </Section>
  );
}

function Friendly({ reverse, background }) {
  return (
    <Section className="Friendly" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Friendly" text={useContent("easyToUse")} />}
        columnTwo={
          <div className="cliImageContainer">
            <img src={useBaseUrl("img/inquirer-cli.gif")} />
          </div>
        }
      />
    </Section>
  );
}

function Flexible({ reverse, background }) {
  return (
    <Section className="Flexible codeExample" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Flexible and maintainable" text={useContent("flexible")} />}
        columnTwo={<CodeBlock language="json">{textContents.flexibleJsonCode}</CodeBlock>}
      />
    </Section>
  );
}

function Customizable({ reverse, background }) {
  return (
    <Section className="Customizable codeExample" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Pluggable" text={useContent("customizable")} />}
        columnTwo={<CodeBlock language="javascript">{textContents.customizableCode}</CodeBlock>}
      />
    </Section>
  );
}

function Upcoming({ reverse, background }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Section className="Upcoming" background={background}>
      <div className="content">
        <Heading text="Upcoming features" />
        <TwoColumns
          reverse={reverse}
          columnOne={<p>{useContent("upcoming")}</p>}
          columnTwo={
            <p>
              Check the{" "}
              <a
                href={siteConfig.customFields.githubProjectUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub project
              </a>{" "}
              to stay up to date on what we are working.
            </p>
          }
        />
      </div>
    </Section>
  );
}

function Star() {
  return (
    <Section className="Star" background="dark">
      <div className="content">
        <Heading text="Give it a star on GitHub" />
        <GitHubStarButton />
      </div>
    </Section>
  );
}

const Index = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout wrapperClassName="homepage">
      <Head>
        <title>{siteConfig.title}</title>
        <meta
          name="description"
          content="Node.js mock server supporting route variants and multiple mocks"
        />
        <meta
          name="keywords"
          content="Node.js, mock server, simulated api, interactive, command line interface, testing tools, http, simulated response, REST API, api mock, hot reloading, testing, plugins, pluggable, route variants, mock, Cypress, express, middlewares"
        />
      </Head>
      <HeaderHero />
      <Benefits />
      <Friendly reverse background="tint" />
      <Flexible />
      <Customizable reverse background="tint" />
      <Upcoming />
      <Star />
    </Layout>
  );
};

export default Index;
