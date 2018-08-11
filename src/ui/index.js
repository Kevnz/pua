const React = require('react');
const ReactDOM = require('react-dom');
const Home = require('./containers/home');
const Capture = require('./containers/capture');
const Call = require('./containers/call');
const history = require('./history');

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
serverState.history = history;

ReactDOM.hydrate(App(serverState), document.querySelector('#app'));
history.listen((location, action) => {
  const App = React.createFactory(getContainer(location.pathname));
  ReactDOM.hydrate(App(serverState), document.querySelector('#app'));
});
