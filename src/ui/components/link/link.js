const React = require('react');

module.exports = class Link extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          this.props.history.push(this.props.href, {});
        }}
      >
        {this.props.children}
      </a>
    );
  };
};
