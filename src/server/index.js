const config = require('xtconf')();
const Hapi = require('hapi');
const Bell = require('bell');
const Path = require('path');
const HapiReactViews = require('hapi-react-views');
const Manifest = require('./manifest');
const Webpack = require('webpack');
const WebpackPlugin = require('./plugins/webpack');

if (process.env.NODE_ENV !== 'production') {
  require('babel-core/register')();
}

const layoutPath =
  process.env.NODE_ENV !== 'production'
    ? Path.join(__dirname, '../ui')
    : Path.join(__dirname, '../../dist/views');
const viewPath =
  process.env.NODE_ENV !== 'production'
    ? Path.join(__dirname, '../ui/containers')
    : Path.join(__dirname, '../../dist/views/containers');

const server = Hapi.server({
  port: process.env.PORT || config.get('port'),
  //host: config.get('host'),
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../../', 'dist')
    },
    cors: {
      origin: ['*']
    }
  }
});

const start = async () => {
  try {
    await server.register(Bell);
    server.auth.strategy('twitter', 'bell', {
      provider: 'twitter',
      password: process.env.AUTH_PASSWORD,
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      isSecure: process.env.NODE_ENV === 'production'
    });

    await server.register(Manifest);
    // register view engines
    server.views({
      engines: {
        js: HapiReactViews
      },
      relativeTo: __dirname,
      path: viewPath,
      compileOptions: {
        layoutPath,
        layout: 'layout'
      }
    });

    //start server
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

start();
