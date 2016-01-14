var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel-core');
var webpackConfig = require('./build/webpack.config.dev');

module.exports = function configWallaby(wallaby) {

  // todo load the .babelrc instead to avoid duplication
  // need to avoid the hotloading transform stuff?
  var babelCompiler = wallaby.compilers.babel({
    babel,
    // babel options
    'presets': ['stage-0', 'es2015', 'react'],
    'plugins': [['transform-class-properties']],
  });

  var webpackPostprocessor = wallabyWebpack(webpackConfig);

  return {
    files: [
      // you may just add the file separately,
      // like done here https://github.com/wallabyjs/wallaby-react-todomvc-sample/blob/master/wallaby-babel.js
      { pattern: 'node_modules/react-tools/src/test/phantomjs-shims.js', instrument: false },
      // { pattern: 'node_modules/chai/chai.js', instrument: false},
      { pattern: 'app/**/*.js', load: false },
      { pattern: 'app/**/*.jsx', load: false },
      { pattern: '!app/**/*spec.js*', load: false },
    ],

    tests: [
      { pattern: 'app/**/*spec.js*', load: false },
    ],

    compilers: {
      '**/*.js*': babelCompiler,
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
