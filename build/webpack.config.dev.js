var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    // new ExtractTextPlugin('css/[name].bundle.[hash].css', { allChunks: true }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
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
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  postcss: function () {
    return [
      require('postcss-import'),
      require('postcss-cssnext'),
    ];
  },
};
