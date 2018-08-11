const React = require('react');
const Link = require('../../components/link');

module.exports = class Home extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
  }
  render = () => {
    return <div>{this.props.title}</div>;
  };
};
