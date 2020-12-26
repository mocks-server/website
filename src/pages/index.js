import React from "react";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import GitHubButton from "react-github-btn";
import Head from "@docusaurus/Head";

import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import useText from "@theme/custom-hooks/useText";

const textContents = {
  benefitsInterfaces: `
    Define api contracts, add [mocks-server fixtures](docs/get-started-fixtures) and start front-end development.
    Don't wait for the api to be ready. Front-end and back-end teams can work in parallel, avoiding delays.
  `,
  benefitsInterfaces: `
    Change the current behavior of the server and other settings while it is running using the [interactive CLI](docs/plugins-inquirer-cli) or the [admin REST API](docs/plugins-admin-api).
    The CLI is perfect for development, and the API can be used in other scenarios, as the [Cypress plugin does.](docs/integrations-cypress)
  `,
  benefitsBehaviors: `
    Define different responses for the same route ([fixtures](docs/get-started-fixtures)), and group them into different [behaviors](docs/get-started-behaviors).
    Ensure that your API client is ready to handle all cases. Storing the different behaviors allows to use <code>mocks-server</code> both for development and testing phases.
  `,
  benefitsMultipleFormats: `
    Define fixtures and behaviors using <code>json</code> files or JavaScript files. 
    Define responses using plain objects, or even Express middlewares. Hot reload changes the responses in real time once files are changed.
  `,
  easyToUse: `
    Install it and start it in seconds. Follow the [tutorial](docs/get-started-fixtures) to add fixtures and you'll have a simulated api in few minutes.
    <br/><br/>
    Create a [configuration file](docs/configuration-file), start it, and use the [interactive CLI](docs/plugins-inquirer-cli) or the [admin REST API](docs/plugins-admin-api) for changing settings while it is running.
  `,
  easyToUseInstallCode: `
npm i --save-dev @mocks-server/main
 `,
  easyToUsePackageCode: `
// package.json
{
  "scripts": {
    "mocks": "mocks-server"
  }
}
 `,
  flexible: `
    Define fixtures for HTTP responses in JSON files, or as JavaScript objects.
    <br/><br/>
    Using the built-in fixtures handler, responses can be defined using static properties, or using Express middlewares for more complex scenarios.
    <br/><br/>
    If this is not enough, you can even [add your own handlers](docs/advanced-custom-fixtures-handlers) to change the format in which you define the responses fixtures.
  `,
  flexibleJsonCode: `
{
  "id": "get-users-empty",
  "url": "/api/users",
  "method": "GET",
  "response": {
    "status": 200,
    "body": []
  }
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
  maintainable: `
    [Maintain your fixtures organized](docs/guides-organizing-the-definitions) and group them in different [behaviors](docs/get-started-behaviors).
    <br/><br/>
    Behaviors can be created extending from another ones, so you can modify or add new fixtures to the main behavior,
    and the rest of behaviors will inherit them.
  `,
  maintainableCode: `
[
  {
    "id": "standard",
    "fixtures": ["get-user", "update-user"]
  },
  {
    "id": "update-user-error",
    "from": "standard",
    "fixtures": ["update-user-error"]
  }
]
  `,
  friendly: `
    The main distribution of <code>mocks-server</code> includes some preinstalled plugins for making easy
    to control the server while it is running, allowing to change the current behavior, to change the delay, etc.
    <br/><br/>
    Settings can be changed using an interactive CLI or using a REST API. This allows to use <code>mocks-server</code> both for development and testing phases easily.
    <br/><br/>
    It also includes hot-reloading, so the responses of the server will change while you change your fixtures files.
  `,
  upcoming: `
    Administration web user interface, Chrome extension, Proxy fallback, Web Sockets, store your fixtures in a remote host, etc.
  `,
  customizable: `
    From [defining fixtures using express middlewares](docs/tutorials-dynamic) to
    [developing your own plugins](docs/advanced-developing-plugins) or even [adding new fixtures handlers](docs/advanced-custom-fixtures-handlers),
    the mocks-server is very adaptable to achieve any project requirements.
    <br/><br/>
    Plugins from NPM or your own plugins can be added easily using the [configuration file](docs/configuration-file)
  `,
  customizableCode: `
class Plugin {
  constructor(core) {
    core.addSetting({
      name: "traceBehaviors",
      type: "boolean",
      description: "Trace behaviors changes",
      default: true
    });

    this._core = core;
    this._onChangeMocks = this._onChangeMocks.bind(this);
    this._onChangeSettings = this._onChangeSettings.bind(this);
  }
  // ...
}
  `,
  integrations: `
    There are available packages for integrating the Mocks Server with other development tools.
    <br/><br/>
    For example, <code>@mocks-server/cypress-commands</code> allows to easily control the mock server from Cypress.
    Read the [Cypress integration chapter for further info](docs/integrations-cypress)
  `,
  integrationsCode: `
describe("user with admin role", () => {
  before(() => {
    cy.mocksServerSetBehavior("admin-user");
    cy.visit("/");
  });

  it("should see the users section link", () => {
    cy.get("#users-section-link").should("be.visible");
  });
});
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
      <ActionButton
        type="secondary"
        href={useBaseUrl("docs/guides-defining-fixtures")}
        target="_self"
      >
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
          <TextColumn title="Multiple api behaviors" text={useContent("benefitsBehaviors")} />
        }
        columnTwo={
          <TextColumn title="Multiple formats" text={useContent("benefitsMultipleFormats")} />
        }
        columnThree={
          <TextColumn title="Multiple interfaces" text={useContent("benefitsInterfaces")} />
        }
      />
    </Section>
  );
}

function Friendly({ reverse, background }) {
  return (
    <Section className="Friendly" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Developer friendly" text={useContent("friendly")} />}
        columnTwo={
          <div className="cliImageContainer">
            <img src={useBaseUrl("img/interactive-cli-animation.gif")} />
          </div>
        }
      />
    </Section>
  );
}

function EasyToUse({ reverse, background }) {
  return (
    <Section className="EasyToUse codeExample" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Easy to use" text={useContent("easyToUse")} />}
        columnTwo={
          <>
            <CodeBlock language="bash">{textContents.easyToUseInstallCode}</CodeBlock>
            <CodeBlock language="json">{textContents.easyToUsePackageCode}</CodeBlock>
          </>
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
        columnOne={<TextColumn title="Flexible" text={useContent("flexible")} />}
        columnTwo={
          <>
            <CodeBlock language="json">{textContents.flexibleJsonCode}</CodeBlock>
            <CodeBlock language="javascript">{textContents.flexibleJsCode}</CodeBlock>
          </>
        }
      />
    </Section>
  );
}

function Maintainable({ reverse, background }) {
  return (
    <Section className="Maintainable codeExample" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Maintainable" text={useContent("maintainable")} />}
        columnTwo={<CodeBlock language="json">{textContents.maintainableCode}</CodeBlock>}
      />
    </Section>
  );
}

function Integrations({ reverse, background }) {
  return (
    <Section className="Integrations codeExample" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Integrations" text={useContent("integrations")} />}
        columnTwo={<CodeBlock language="javascript">{textContents.integrationsCode}</CodeBlock>}
      />
    </Section>
  );
}

function Customizable({ reverse, background }) {
  return (
    <Section className="Customizable codeExample" background={background}>
      <TwoColumns
        reverse={reverse}
        columnOne={<TextColumn title="Customizable" text={useContent("customizable")} />}
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
          content="Node.js mock server. Responses can be defined in json, JavaScript plain objects or Express middlewares. Supports defining different responses for the same route, and group them into different behaviors. Includes multiple interfaces, as an interactive CLI and a REST API."
        />
        <meta
          name="keywords"
          content="Node.js, mock server, simulated api, interactive, command line interface, api client, http, simulated response, REST API, api behaviors, developer friendly, hot reloading, testing, plugins, pluggable, Cypress"
        />
      </Head>
      <HeaderHero />
      <Benefits />
      <Friendly reverse background="tint" />
      <EasyToUse />
      <Flexible reverse background="tint" />
      <Maintainable />
      <Integrations reverse background="tint" />
      <Customizable />
      <Upcoming background="tint" />
      <Star />
    </Layout>
  );
};

export default Index;
