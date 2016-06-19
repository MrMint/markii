const babel = require('babel-core');
const webpack = require('webpack');
const wallabyWebpack = require('wallaby-webpack');
const path = require('path');

process.env.BABEL_ENV = 'TEST';

module.exports = function configWallaby(wallaby) {
  const webpackPostprocessor = wallabyWebpack({
    resolve: {
      root: path.resolve(__dirname),
      alias: {
        'sinon': 'sinon/pkg/sinon',
      },
      extensions: ['', '.js', '.jsx'],
    },
    externals: {
      'jsdom': 'window',
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
      'react/addons': true,
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    module: {
      noParse: [/node_modules\/sinon\//],
      loaders: [
        { test: /\.css$/, loader: 'null' },
        { test: /\.json$/, loader: 'json' }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/ReactContext/),
      new webpack.DefinePlugin({
        ENV: JSON.stringify('TEST')
      })
    ]
  });

  return {
    files: [
      // not required if using PhantomJs2 - http://wallabyjs.com/docs/integration/phantomjs2.html
      { pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false },
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false },
      { pattern: 'app/**/*.js', load: false },
      { pattern: 'app/**/*.jsx', load: false },
      { pattern: '!app/**/*spec.js*', load: false },
    ],

    tests: [
      { pattern: 'app/**/*spec.js*', load: false },
    ],
    compilers: {
      'app/**/*.js': wallaby.compilers.babel(),
      'app/**/*.jsx': wallaby.compilers.babel(),
    },
    testFramework: 'mocha',
    postprocessor: webpackPostprocessor,
    bootstrap: function bootstrap() {
      // var mocha = wallaby.testFramework;
      // mocha.ui('bdd');
      // window.expect = chai.expect;
      // var should = chai.should();

      window.__moduleBundler.loadTests();
    },
  };
};
