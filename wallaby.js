var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./build/webpack.config.dev');

process.env.BABEL_ENV = 'test';

module.exports = function configWallaby(wallaby) {
  var webpackPostprocessor = wallabyWebpack(webpackConfig);

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
      '**/*.js*': wallaby.compilers.babel(),
    },
    testFramework: 'mocha@2.0.1',
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
