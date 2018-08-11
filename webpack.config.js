const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/ui/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'js'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  }
};
