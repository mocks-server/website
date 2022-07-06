import React, { useMemo } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import GitHubButton from "react-github-btn";
import Head from "@docusaurus/Head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleRight,
  faRocket,
  faCode,
  faGear,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import useText from "@theme/custom-hooks/useText";

const textContents = {
  featuresQuickAndSimple: `
    Install it using NPM. Add files defining responses for the API routes. Start it with a single command. Change responses using settings, even while it is running.
  `,
  featuresFlexible: `
    Define routes using <code>json</code>, <code>JavaScript</code> or <code>TypeScript</code>. Configure [Babel](https://babeljs.io/) at your convenience for reading files. Or define routes programmatically.
  `,
  featuresExtensible: `
    Use [Express](https://expressjs.com/) middlewares. Define custom handlers for the routes. Add custom Express routers. Or create a plugin and have full access to the [core API](docs/api-mocks-server-api).
  `,
  featuresControllable: `
    Control it using the [interactive CLI](docs/plugins-inquirer-cli), or use the [administration REST API](docs/plugins-admin-api), or [start it using JavaScript](docs/api-programmatic-usage) and control everything. Other integrations are available, such as [Cypress commands](docs/integrations-cypress).
  `,
  upcoming: `
    Web user interface, Mock Web Sockets, Docker container, Open API integration, TypeScript definitions...
  `,
};

const useContent = (textKey) => {
  return useText(textContents[textKey]);
};

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

function Column({ children, md, sm, lg, xs, className, hiddenXs, hiddenSm }) {
  return (
    <div
      className={`${clsx(
        className,
        xs && `col-xs-${md}`,
        md && `col-md-${md}`,
        sm && `col-sm-${sm}`,
        lg && `col-lg-${lg}`,
        hiddenXs && `hidden-xs`,
        hiddenSm && `hidden-sm`
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

function Heading({ text, centered, className }) {
  return <h2 className={clsx("heading", centered && "centered", className)}>{text}</h2>;
}

function SubHeading({ text, centered }) {
  return <p className={clsx("subheading", centered && "centered")}>{text}</p>;
}

function ActionButton({ href, type = "primary", external, children }) {
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
    <a className={clsx(`action-button`, type)} href={href} target={target} rel={rel}>
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
            link={useBaseUrl("docs/get-started-intro")}
          />
        </Column>
        <Column lg={3} md={6} className="cards-container">
          <TextCard
            title="Extensible"
            text={useContent("featuresExtensible")}
            icon={faWrench}
            link={useBaseUrl("docs/get-started-intro")}
          />
        </Column>
        <Column lg={3} md={6} className="cards-container">
          <TextCard
            title="Controllable"
            text={useContent("featuresControllable")}
            icon={faGear}
            link={useBaseUrl("docs/get-started-intro")}
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
      <SubHeading text="Stay up to date on what we are working." centered />
      <Row>
        <Column md={12} xs={12}>
          <p className="centered">{useContent("upcoming")}</p>
        </Column>
        <Column md={12} xs={12} className="center-content">
          <ActionButton type="secondary" href={siteConfig.customFields.githubProjectUrl} external>
            Checkout the Github project
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
      <SubHeading text="Do you like it? Let the community know" centered />
      <Row>
        <Column md={12} xs={12} className="center-content">
          <GitHubStarButton />
        </Column>
      </Row>
    </Section>
  );
}

const Version3 = () => {
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
      <Upcoming background="dark" />
      <Star />
    </Layout>
  );
};

export default Version3;
