const React = require('react');
const ReactDOM = require('react-dom');
const Home = require('./containers/home');
const Capture = require('./containers/capture');
const Call = require('./containers/call');
const createHistory = require('history').createBrowserHistory;
const history = createHistory();
const getContainer = (url) => {
  console.log(url);
  switch (url) {
    case '/':
      return Home;
      break;
    case '/capture':
      return Capture;
      break;
    case '/call':
      return Call;
    default:
      return Home;
      break;
  }
};
const App = React.createFactory(getContainer(window.location.pathname));

const serverState = window.state;

class Container extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state.path = '/';
  }
  componentDidMount() {
    history.listen((location, action) => {
      // location is an object like window.location
      console.log(action, location.pathname, location.state);
      this.setState({
        path: location.pathname
      });
    });
  }
  render() {
    {
      getContainer(this.state.path);
    }
  }
}

export default container;

module.exports = App;
