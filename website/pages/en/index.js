const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('get-started-intro.html')}>Get started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl, githubProjectUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn" background="light">
        {[
          {
            content: "Define api contracts, add mocks-server fixtures and start front-end development. Don't wait for the api to be ready.",
            image: `${baseUrl}img/undraw_code_typing.svg`,
            imageAlign: 'top',
            title: 'Isolated front-end development',
          },
          {
            content: 'Test your front-end application configured for making requests to mocks-server. Same tests can be reused to run end to end tests against the real api in more advanced phases of integration.',
            image: `${baseUrl}img/undraw_exams.svg`,
            imageAlign: 'top',
            title: 'Solid acceptance tests',
          },
          {
            content: 'Define multiple api behaviors easily, including error cases. Ensure that your front-end application is ready for all cases.',
            image: `${baseUrl}img/undraw_programming.svg`,
            imageAlign: 'top',
            title: 'Multiple api behaviors',
          },
        ]}
      </Block>
    );

    const Easy = () => (
      <Block >
        {[
          {
            content:
              "Follow the tutorial and you'll have a mocks server running in seconds. Use the built-in interactive CLI or the admin API REST for changing settings as delay time, current behavior, etc.",
            image: `${baseUrl}img/undraw_done.svg`,
            imageAlign: 'right',
            title: 'Easy to use',
          },
        ]}
      </Block>
    );

    const Extensible = () => (
      <Block background="dark">
        {[
          {
            content:
              'Easy to maintain. Define the default behavior of your api. Extend it redefining the response of some specific uris and save it as a new behavior. All extended behaviors can be extended as well.',
            image: `${baseUrl}img/undraw_file_bundle.svg`,
            imageAlign: 'left',
            title: 'Extensible api behaviors',
          },
        ]}
      </Block>
    );

    const DynamicFixtures = () => (
      <Block id="try">
        {[
          {
            content:
              'Add dynamic fixtures using express middlewares. Provide programmatic behaviors to your mocks when needed. Almost a real api with few lines of code.',
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'right',
            title: 'Dynamic fixtures',
          },
        ]}
      </Block>
    );

    const Roadmap = () => (
      <div
        className="productShowcaseSection paddingBottom paddingTop lightBackground"
        style={{textAlign: 'center'}} >
        <h2>Upcoming features</h2>
        <p>Electron administration user interface, multiple sessions handling, configuration through yaml file, etc. Check the <a href={githubProjectUrl} target="_blank" rel="noreferrer noopener">github project</a> to stay up to date on what we are working.</p>
      </div>
    );

    const Showcase = () => {
      const pinnedUsers = siteConfig.users ? siteConfig.users
        .filter(user => user.pinned) : [];
      if (pinnedUsers.length === 0) {
        return null;
      }

      const showcase = pinnedUsers
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <Easy />
          <Extensible />
          <DynamicFixtures />
          <Roadmap />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
