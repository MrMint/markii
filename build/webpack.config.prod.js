var path = require('path');
var webpack = require('webpack');
var chalk = require('chalk');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist/');

module.exports = {
  devtool: 'source-map',
  entry: {
    client: ['babel-polyfill', './app/index.jsx'],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://localhost:3000/dist/',
  },
  plugins: [
    new ProgressBarPlugin({
      format: `${chalk.blue.bold('Building client bundle')} [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      renderThrottle: 100,
      summary: false,
      customSummary: (t) => console.log(chalk.blue.bold(`Built client in ${t}.`)),
    }),

    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),

    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [strip.loader('debug'), 'babel'],
      include: path.join(__dirname, '../app'),
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!postcss'),
      include: path.join(__dirname, '../app'),
    }, {
      test: /\.css$/,
      loader: 'style!css',
      include: path.join(__dirname, '../node_modules'),
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true'),
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
  ],
  },
  postcss: function () {
    return [
      require('postcss-import'),
      require('postcss-cssnext'),
    ];
  },
};
