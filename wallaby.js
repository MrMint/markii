var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel-core');
var webpack = require('webpack');
var path = require('path');

module.exports = function configWallaby(wallaby) {

  var babelCompiler = wallaby.compilers.babel({
    babel: babel,
    // babel options
    // babel options
    presets: ['es2015', 'react']
  });

  var webpackPostprocessor = wallabyWebpack({
    plugins: [
      new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
    ],

    resolve: {
      modulesDirectories: ['node_modules', path.join(__dirname, 'node_modules'), path.join(__dirname, 'bower_components')],
      extensions: ['', '.js', '.jsx'],
    },
  });

  return {
    files: [
      // you may just add the file separately,
      // like done here https://github.com/wallabyjs/wallaby-react-todomvc-sample/blob/master/wallaby-babel.js
      { pattern: 'node_modules/react-tools/src/test/phantomjs-shims.js', instrument: false },
      // { pattern: 'node_modules/chai/chai.js', instrument: false},
      { pattern: 'app/**/*.js*', load: false },
    ],

    tests: [
      { pattern: 'test/**/*spec.js*', load: false },
    ],

    compilers: {
      '**/*.js*': babelCompiler,
    },
    testFramework: "mocha@2.0.1",
    postprocessor: webpackPostprocessor,
    bootstrap: function () {
      // var mocha = wallaby.testFramework;
      // mocha.ui('bdd');
      // window.expect = chai.expect;
      // var should = chai.should();

      window.__moduleBundler.loadTests();
    },
  };
};
