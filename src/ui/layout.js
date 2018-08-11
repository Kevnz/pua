const React = require('react');
const { Header, NavigationBar } = require('mini.css-react');
const { If, Then, Else } = require('react-if');

class LayoutView extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link
            href="https://gitcdn.link/repo/Chalarangelo/mini.css/master/dist/mini-dark.min.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <Header sticky>
            <a href="#" logo>
              Whakangae - {this.props.title}
            </a>
            <a href="/" className="button">
              Home
            </a>
            <If condition={this.props.isAuthenticated}>
              <Then>
                <span>
                  <a href="/account" className="button">
                    Account
                  </a>
                </span>
              </Then>
              <Else>
                {() => (
                  // will only be evaluated if the condition fails.
                  <a href="/login" className="button">
                    Login
                  </a>
                )}
              </Else>
            </If>
          </Header>
          <div
            id="app"
            dangerouslySetInnerHTML={{ __html: this.props.children }}
          />
          <script
            id="app-state"
            dangerouslySetInnerHTML={{ __html: this.props.state }}
          />
          <script src="/js/bundle.js" />
        </body>
      </html>
    );
  }
}

module.exports = LayoutView;
