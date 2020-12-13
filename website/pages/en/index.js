const React = require("react");
const PropTypes = require("prop-types");

const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const MarkdownBlock = CompLibrary.MarkdownBlock;

const CodeExampleSection = ({ id, background, title, left, right }) => {
  return (
    <Container id={id} className={background}>
      <div className="gridBlock">
        <div className="blockElement twoByGridBlock">
          <div className="blockContent">
            <h2>
              <div>
                <span>
                  <p>{title}</p>
                </span>
              </div>
            </h2>
            <div>
              <span>
                <MarkdownBlock>{left}</MarkdownBlock>
              </span>
            </div>
          </div>
        </div>
        <div className="blockElement twoByGridBlock">
          <div className="blockContent">
            <div className="code-example">
              <span>
                <MarkdownBlock>{right}</MarkdownBlock>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

CodeExampleSection.propTypes = {
  id: PropTypes.string,
  background: PropTypes.string,
  title: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
};

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <span className="title">{siteConfig.title}</span>
        <small className="tagline">{siteConfig.tagline}</small>
      </h2>
    );

    const ProjectMotto = () => (
      <h3 className="projectPromo">
        Simple and easy out-of-the-box
        <br />
        Very powerful and customizable with plugins
        <br />
        Integrates with other development tools
      </h3>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button get-started" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <ProjectMotto />
          <PromoSection>
            <Button href={docUrl("get-started-intro")}>Get started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

HomeSplash.propTypes = {
  siteConfig: PropTypes.object,
  language: PropTypes.string,
};

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, githubProjectUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const Features = () => (
      <Container id="home-features" background="light">
        <GridBlock
          contents={[
            {
              title: "Isolated front-end development",
              content: `Define api contracts, add [mocks-server fixtures](${docUrl(
                "get-started-fixtures"
              )}) and start front-end development. Don't wait for the api to be ready. Front-end and back-end teams can work in parallel, avoiding delays.`,
            },
            {
              title: "Multiple api behaviors",
              content: `Define [multiple api behaviors](${docUrl(
                "get-started-behaviors"
              )}) easily, including error cases. Ensure that your front-end application is ready for all cases. Change the behavior of the server while it is running using one of the available [plugins](${docUrl(
                "plugins-adding-plugins"
              )}).`,
            },
            {
              title: "Solid tests",
              content: `Test your front-end application configured for making requests to mocks-server. Same tests can be reused to run end to end tests with the real api in more advanced phases of integration, [learn how](${docUrl(
                "integrations-cypress"
              )}).`,
            },
          ]}
          layout="fourColumn"
        />
      </Container>
    );

    const Easy = () => {
      return (
        <CodeExampleSection
          id="home-easy-to-use"
          title="Easy to use"
          left={`
Install it and start it in seconds. Follow the [tutorial](${docUrl("guides-defining-fixtures")})
to add fixtures and you&apos;ll have a simulated api in few minutes.

Create a [configuration file](${docUrl(
            "configuration-file"
          )}), or use one of the included [plugins](${docUrl(
            "plugins-adding-plugins"
          )}), as the [inquirer CLI](${docUrl(
            "plugins-inquirer-cli"
          )}) or the [admin API REST](${docUrl(
            "plugins-admin-api"
          )}) for changing settings easily while it is running.
`}
          right={`
\`\`\` bash
npm i --save-dev @mocks-server/main
\`\`\`

Add the script to the \`package.json\` file:
\`\`\` json
{
  "scripts": {
    "mocks": "mocks-server"
  }
}
\`\`\`
`}
        />
      );
    };

    const Flexible = () => {
      return (
        <CodeExampleSection
          id="home-flexible"
          background="lightBackground"
          title="Flexible"
          left={`
Define fixtures for HTTP responses in \`JSON\` files, or as JavaScript objects.

Using the built-in fixtures handler, responses can be defined using static properties, or using \`Express\` middlewares for more complex scenarios.

If this is not enough, you can even [addd your own handlers](${docUrl(
            "advanced-custom-fixtures-handlers"
          )}) to change the format in which you define the responses fixtures.
`}
          right={`
\`\`\` json
{
  "id": "get-users-empty",
  "url": "/api/users",
  "method": "GET",
  "response": {
    "status": 200,
    "body": []
  }
}
\`\`\`

\`\`\` javascript
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
\`\`\`
`}
        />
      );
    };

    const Maintainable = () => {
      return (
        <CodeExampleSection
          id="home-maintainable"
          title="Maintainable"
          left={`
[Maintain your fixtures organized](${docUrl(
            "guides-organizing-the-definitions"
          )}) and group them in different [behaviors](${docUrl("get-started-behaviors")}).

Behaviors can be created extending from another ones, so you can modify or add new fixtures to the main behavior,
and the rest of behaviors will inherit them.
`}
          right={`
\`\`\`json
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
\`\`\`
`}
        />
      );
    };

    const Friendly = () => {
      return (
        <CodeExampleSection
          id="home-friendly"
          background="lightBackground"
          title="Friendly"
          left={`
The [main distribution of \`mocks-server\`](https://github.com/mocks-server/main) includes some plugins for making easy
to control the server while it is running, allowing to change the current behavior, to change the delay, etc. From controlling
it through an interactive CLI, to using a REST API, etc.

It also includes hot-reloading, so the responses of the server will change while you change your fixtures files.
`}
          right={`
![Interactive CLI](docs/assets/cli_animation.gif)
`}
        />
      );
    };

    const Customizable = () => {
      return (
        <CodeExampleSection
          id="home-customizable"
          title="Customizable"
          left={`
From [defining fixtures using express middlewares](${docUrl(
            "tutorials-dynamic"
          )}) to [developing your own plugins](${docUrl(
            "advanced-developing-plugins"
          )}) or even [adding new fixtures handlers](${docUrl(
            "advanced-custom-fixtures-handlers"
          )}),
the mocks-server is very adaptable to achieve any project requirements.

Plugins from NPM or your own plugins can be added easily using the [configuration file](${docUrl(
            "configuration-file"
          )}).
`}
          right={`
\`\`\`javascript
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
\`\`\`
`}
        />
      );
    };

    const Integrations = () => {
      return (
        <CodeExampleSection
          id="home-integrations"
          title="Integrations"
          background="lightBackground"
          left={`There are available packages for integrating the Mocks Server with other development tools.

For example, [@mocks-server/cypress-commands](https://www.npmjs.com/package/@mocks-server/cypress-commands) allows to easily control the mock server from Cypress. Read the [Cypress integration chapter for further info](${docUrl(
            "integrations-cypress"
          )})`}
          right={`
\`\`\`javascript
describe("user with admin role", () => {
  before(() => {
    cy.mocksServerSetBehavior("admin-user");
    cy.visit("/");
  });

  it("should see the users section link", () => {
    cy.get("#users-section-link").should("be.visible");
  });
});
\`\`\`
`}
        />
      );
    };

    const Roadmap = () => (
      <div
        className="productShowcaseSection paddingBottom paddingTop"
        style={{ textAlign: "center" }}
      >
        <h2>Upcoming features</h2>
        <p>
          Administration web user interface, Chrome extension, Proxy fallback, Web Sockets, store
          your fixtures in a remote host, etc. <br />
          Check the{" "}
          <a href={githubProjectUrl} target="_blank" rel="noreferrer noopener">
            github project
          </a>{" "}
          to stay up to date on what we are working.
        </p>
      </div>
    );

    const Showcase = () => {
      const pinnedUsers = siteConfig.users ? siteConfig.users.filter((user) => user.pinned) : [];
      if (pinnedUsers.length === 0) {
        return null;
      }

      const showcase = pinnedUsers.map((user) => (
        <a href={user.infoLink} key={user.infoLink}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      ));

      const pageUrl = (page) => baseUrl + (language ? `${language}/` : "") + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl("users")}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer home">
          <Features />
          <Easy />
          <Flexible />
          <Maintainable />
          <Friendly />
          <Customizable />
          <Integrations />
          <Roadmap />
          <Showcase />
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  config: PropTypes.object,
  language: PropTypes.string,
};

module.exports = Index;
