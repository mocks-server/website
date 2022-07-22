import React, { useMemo } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import GitHubButton from "react-github-btn";
import Head from "@docusaurus/Head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleRight,
  faRocket,
  faCode,
  faGear,
  faWrench,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import useText from "@theme/custom-hooks/useText";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const textContents = {
  featuresQuickAndSimple: `
    Install it using NPM. Add files defining responses for the API routes. Start it with a single command. Change responses using settings, even while it is running.
  `,
  featuresFlexible: `
    Define routes using <code>json</code>, <code>JavaScript</code> or <code>TypeScript</code>. Configure [Babel](https://babeljs.io/) at your convenience for reading files. Or define routes programmatically.
  `,
  featuresExtensible: `
    Use [Express](https://expressjs.com/) middlewares in routes. Define custom handlers for the routes. Add custom Express routers. Or create a plugin and have full access to the [core JavaScript API](docs/api-mocks-server-api).
  `,
  featuresControllable: `
    Control it using the [interactive CLI](docs/plugins-inquirer-cli), or use the [administration REST API](docs/plugins-admin-api), or [start it using JavaScript](docs/api-programmatic-usage) and control everything. Other integrations are available, such as [Cypress commands](docs/integrations-cypress).
  `,
  upcoming: `
    Web user interface, mock WebSockets, Docker image, Open API integration, TypeScript definitions...
  `,
  routes: `A <code>route</code> defines the url and method of an API resource. Wildcards can be used in urls and methods, so one <code>route</code> can simulate one real API resource, or many.`,
  variants: `Each <code>route</code> can contain many different <code>variants</code>. Each <code>variant</code> can define a response to send, or a middleware to execute, or a url to proxy the request...`,
  collections: `A <code>collection</code> of route variants defines all current routes and variants in the mocked API. They can be created extending other collections. So, you can store many collections and change the whole API behavior by simply changing the current one.`,
  jsonCode: `
    [
      {
        "id": "get-user",
        "url": "/api/user/:id",
        "method": "GET",
        "delay": 1000,
        "variants": [
          {
            "id": "success",
            "handler": "json",
            "response": {
              "status": 200,
              "body": { "id": 1, "name": "John Doe"}
            }
          },
          {
            "id": "not-found",
            "handler": "json",
            "response": {
              "status": 404
            }
          },
          {
            "id": "proxied",
            "handler": "proxy",
            "response": {
              "host": "https://jsonplaceholder.typicode.com/users/1"
            }
          }
        ]
      }
    ]
  `,
  jsCode: `
    module.exports = [
      {
        id: "get-user",
        url: "/api/user/:id",
        method: "GET",
        delay: 1000,
        variants: [
          {
            id: "success",
            handler: "json",
            response: {
              status: 200,
              body: { "id": 1, "name": "John Doe"}
            }
          },
          {
            id: "not-found",
            handler: "json",
            response: {
              status: 404
            }
          },
          {
            id: "proxied",
            handler: "proxy",
            response: {
              host: "https://jsonplaceholder.typicode.com/users/1"
            }
          }
        ]
      }
    ];
  `,
};

function useContent(textKey) {
  return useText(textContents[textKey]);
}

function Section({ element = "section", children, className, background = "light" }) {
  const El = element;
  return (
    <El className={clsx("section", className, background)}>
      <div className="container">{children}</div>
    </El>
  );
}

function Row({ children, className }) {
  return <div className={clsx(`row`, className)}>{children}</div>;
}

function Column({ children, md, sm, lg, xs, className, hiddenXs, hiddenMd, hiddenSm }) {
  return (
    <div
      className={`${clsx(
        className,
        xs && `col-xs-${xs}`,
        md && `col-md-${md}`,
        sm && `col-sm-${sm}`,
        lg && `col-lg-${lg}`,
        hiddenXs && `hidden-xs`,
        hiddenSm && `hidden-sm`,
        hiddenMd && `hidden-md`
      )}`}
    >
      {children}
    </div>
  );
}

function Icon({ icon }) {
  return <FontAwesomeIcon icon={icon} />;
}

function Text({ text }) {
  return <div className="text" dangerouslySetInnerHTML={{ __html: text }} />;
}

function HeadingWithIcon({
  element = "h2",
  text,
  centered,
  className,
  icon,
  iconHolderClassName,
}) {
  return (
    <div className={clsx("heading-with-icon", centered)}>
      <span>
        <div className={clsx("icon-holder", iconHolderClassName)}>{icon}</div>
      </span>
      <Heading element={element} text={text} className={className} />
    </div>
  );
}

function Heading({ element = "h2", text, centered, className, icon, iconHolderClassName }) {
  const El = element;
  if (icon) {
    return (
      <HeadingWithIcon
        icon={icon}
        element={element}
        text={text}
        centered={centered}
        iconHolderClassName={iconHolderClassName}
      />
    );
  }
  return <El className={clsx("heading", centered && "centered", className)}>{text}</El>;
}

function SubHeading({ text, centered }) {
  return <p className={clsx("subheading", centered && "centered")}>{text}</p>;
}

function ActionButton({ href, type = "primary", external, children, variant = "contained" }) {
  const target = useMemo(() => {
    if (external) {
      return "_blank";
    }
    return "_self";
  });
  const rel = useMemo(() => {
    if (external) {
      return "noreferrer noopener";
    }
    return null;
  });
  return (
    <a className={clsx(`action-button`, type, variant)} href={href} target={target} rel={rel}>
      {children}
      <Icon icon={faCircleRight} />
    </a>
  );
}

function TextCard({ title, text, link, icon }) {
  return (
    <div className="text-card">
      <div className="icon-holder">
        <Icon icon={icon} />
      </div>
      <Heading text={title} />
      <Text text={text} />
      <a className="text-link" href={link}>
        Learn more →
      </a>
    </div>
  );
}

function HomeCallToAction() {
  return (
    <>
      <ActionButton type="primary" href={useBaseUrl("docs/get-started-intro")}>
        Get started
      </ActionButton>
      <ActionButton type="secondary" href={useBaseUrl("docs/get-started-routes")}>
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
        data-show-count="true"
      >
        Star
      </GitHubButton>
    </div>
  );
}

function HeaderHero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Section background="dark" className="header-hero">
      <Row>
        <Column md={4} className={"col-md-push-8"} hiddenXs hiddenSm>
          <img alt="Mocks Server Logo" src={useBaseUrl("img/logo-white.svg")} />
        </Column>
        <Column md={8} className={"col-md-pull-4"}>
          <h1 className="title">{siteConfig.title}</h1>
          <p className="tagline">
            Node.js mock server running live, interactive mocks in place of real APIs
          </p>
          <div className="buttons">
            <HomeCallToAction />
          </div>
        </Column>
      </Row>
    </Section>
  );
}

function MainFeatures() {
  return (
    <Section>
      <Row>
        <Column lg={3} md={6} className="cards-container">
          <TextCard
            title="Quick and simple"
            text={useContent("featuresQuickAndSimple")}
            icon={faRocket}
            link={useBaseUrl("docs/get-started-intro")}
          />
        </Column>
        <Column lg={3} md={6} className="cards-container">
          <TextCard
            title="Flexible"
            text={useContent("featuresFlexible")}
            icon={faCode}
            link={useBaseUrl("docs/guides-using-babel")}
          />
        </Column>
        <Column lg={3} md={6} className="cards-container">
          <TextCard
            title="Extensible"
            text={useContent("featuresExtensible")}
            icon={faWrench}
            link={useBaseUrl("docs/guides-using-middlewares")}
          />
        </Column>
        <Column lg={3} md={6} className="cards-container">
          <TextCard
            title="Easy to control"
            text={useContent("featuresControllable")}
            icon={faGear}
            link={useBaseUrl("docs/plugins-admin-api")}
          />
        </Column>
      </Row>
      <Row>
        <Column md={12} xs={12} className="center-content">
          <ActionButton
            type="secondary"
            href={useBaseUrl("docs/get-started-intro")}
            variant="text"
          >
            View all features
          </ActionButton>
        </Column>
      </Row>
    </Section>
  );
}

function ImageAndText({ title, text, imageSrc, imageAlt, countClassname, count, imageClassName }) {
  return (
    <div className="image-and-text">
      <div className={clsx("image-holder", imageClassName)}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <Heading
        element="h3"
        text={title}
        className="title"
        icon={count}
        iconHolderClassName={countClassname}
      />
      <Text text={text} />
    </div>
  );
}

function MainConcepts({ background }) {
  return (
    <Section background={background}>
      <Heading text="Main concepts" centered className="with-subheading" />
      <SubHeading
        text="Three simple concepts allowing to simulate, control and storage multiple API scenarios"
        centered
      />
      <Row>
        <Column lg={4} md={4} xs={12}>
          <ImageAndText
            count="1"
            countClassname="route"
            title="Routes"
            text={useContent("routes")}
            imageSrc={useBaseUrl("img/concepts-route.png")}
            imageAlt="Routes schema"
          />
        </Column>
        <Column lg={4} md={4} xs={12}>
          <ImageAndText
            count="2"
            countClassname="variant"
            title="Variants"
            text={useContent("variants")}
            imageSrc={useBaseUrl("img/concepts-variant.png")}
            imageAlt="Variants schema"
          />
        </Column>
        <Column lg={4} md={4} xs={12}>
          <ImageAndText
            count="3"
            countClassname="collection"
            title="Collections"
            text={useContent("collections")}
            imageSrc={useBaseUrl("img/concepts-collection.png")}
            imageAlt="Collections schema"
            imageClassName="collection"
          />
        </Column>
      </Row>
    </Section>
  );
}

function Upcoming({ background }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Section background={background}>
      <Heading text="Upcoming features" centered className="with-subheading" />
      <SubHeading text="Stay up to date on what we are working" centered />
      <Row>
        <Column md={12} xs={12}>
          <p className="centered">{useContent("upcoming")}</p>
        </Column>
        <Column md={12} xs={12} className="center-content">
          <ActionButton
            type="secondary"
            href={siteConfig.customFields.githubProjectUrl}
            external
            variant="text"
          >
            Checkout the Github project
          </ActionButton>
        </Column>
      </Row>
    </Section>
  );
}

function Integrations({ background }) {
  return (
    <Section background={background} className="integrations">
      <Heading text="Integrations" centered className="with-subheading" />
      <SubHeading text="Works well with many ecosystems, and more are coming..." centered />
      <Row>
        <Column md={2} hiddenSm hiddenXs></Column>
        <Column md={2} sm={4} xs={4} className="center-content">
          <img alt="NodeJS" src={useBaseUrl("img/nodejs-logo.png")} />
        </Column>
        <Column md={2} sm={4} xs={4} className="center-content">
          <img alt="Shell" src={useBaseUrl("img/shell-logo.png")} />
        </Column>
        <Column md={2} sm={4} xs={4} className="center-content">
          <img alt="REST API" src={useBaseUrl("img/rest-api-logo.png")} />
        </Column>
        <Column md={2} sm={12} xs={12} className="center-content">
          <img alt="Cypress" src={useBaseUrl("img/cypress-logo.png")} />
        </Column>
        <Column md={2} hiddenSm hiddenXs></Column>
      </Row>
    </Section>
  );
}

function CodeExample({ background }) {
  return (
    <Section background={background}>
      <Heading text="Show me the code" centered className="with-subheading" />
      <SubHeading
        text="A simple example of how routes and variants can defined using different languages"
        centered
      />
      <Row>
        <Column md={2} hiddenXs></Column>
        <Column md={8} xs={12}>
          <Tabs>
            <TabItem value="JSON">
              <CodeBlock language="json">{textContents.jsonCode}</CodeBlock>
            </TabItem>
            <TabItem value="JavaScript">
              <CodeBlock language="js">{textContents.jsCode}</CodeBlock>
            </TabItem>
          </Tabs>
        </Column>
        <Column md={2} hiddenXs></Column>
      </Row>
      <Row>
        <Column md={12} xs={12} className="center-content">
          <ActionButton
            type="secondary"
            href={useBaseUrl("docs/get-started-routes")}
            external
            variant="text"
          >
            View more examples
          </ActionButton>
        </Column>
      </Row>
    </Section>
  );
}

function Star({ background }) {
  return (
    <Section background={background}>
      <Heading text="Give the project a star on GitHub" centered className="with-subheading" />
      <SubHeading
        text={
          <>
            Do you like it? Let the community know
            <span className="icon">
              <Icon icon={faFaceSmile} />
            </span>
          </>
        }
        centered
      />
      <Row>
        <Column md={12} xs={12} className="center-content">
          <GitHubStarButton />
        </Column>
      </Row>
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
          content="Node.js, mock server, REST API, javascript, typescript, simulated api, interactive, command line interface, testing tools, http, simulated response, api mock, hot reloading, testing, plugins, pluggable, route variants, mock, Cypress, express, middlewares"
        />
      </Head>
      <HeaderHero />
      <MainFeatures />
      <MainConcepts background="tint" />
      <Integrations />
      <CodeExample />
      <Upcoming background="dark" />
      <Star />
    </Layout>
  );
};

export default Index;
