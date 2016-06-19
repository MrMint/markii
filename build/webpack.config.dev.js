var path = require('path');
var webpack = require('webpack');
var chalk = require('chalk');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'babel-polyfill',
    'react-addons-perf',
    './app/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new ProgressBarPlugin({
      format: `${chalk.blue.bold('Building client bundle')} [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      renderThrottle: 100,
      summary: false,
      customSummary: (t) => {
        return console.log(chalk.blue.bold(`Built client in ${t}.`));
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, '../app'),
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]!postcss',
      include: path.join(__dirname, '../app'),
    }, {
      test: /\.css$/,
      loader: 'style!css',
      include: path.join(__dirname, '../node_modules'),
    }, {
      test: /\.less$/,
      loader: 'style!css!less',
      // include: path.join(__dirname, '../app'),
    }, {
      test: /\.json$/,
      loader: 'json-loader',
      // include: path.join(__dirname, '../app'),
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff',
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    },
    { test: require.resolve('react-addons-perf'), loader: 'expose?Perf' },
  ],
  },
  postcss: function () {
    return [
      require('postcss-import'),
      require('postcss-cssnext'),
    ];
  },
};
