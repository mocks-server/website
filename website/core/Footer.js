const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language = "") {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('get-started-intro', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('tutorials-static', this.props.language)}>
              Tutorial
            </a>
            <a href={this.docUrl('configuration-command-line-arguments', this.props.language)}>
              Configuration
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users', this.props.language)}>
              User Showcase
            </a>
            <a
              href={this.props.config.stackOverflowUrl}
              target="_blank"
              rel="noreferrer noopener">
              Stack Overflow
            </a>
            <a
              href={this.props.config.contributingUrl}
              target="_blank"
              rel="noreferrer noopener">
              Contributors guidelines
            </a>
            <a
              href={this.props.config.githubIssuesUrl}
              target="_blank"
              rel="noreferrer noopener">
              Issues
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.blogUrl}>Blog</a>
            <a href={this.props.config.organizationUrl} target="_blank"
              rel="noreferrer noopener">GitHub</a>
            <a href={this.props.config.npmUrl} target="_blank"
              rel="noreferrer noopener">NPM</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/mocks-server/main/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            {this.props.config.twitterUsername && (
              <div className="social">
                <a
                  href={`https://twitter.com/${this.props.config.twitterUsername}`}
                  className="twitter-follow-button">
                  Follow @{this.props.config.twitterUsername}
                </a>
              </div>
            )}
          </div>
        </section>
        <a
          href=" http://opensource.org/"
          target="_blank"
          rel="noreferrer noopener"
          className="openSourceInitiativeLogo">
          <img
            src={`${this.props.config.baseUrl}img/open-source-initiative.png`}
            alt="Open Source Initiative"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}.</section>
        <section className="copyright-statements">The OSI logo trademark is the trademark of Open Source Initiative.</section>
      </footer>
    );
  }
}

module.exports = Footer;
