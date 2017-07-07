var webpackConfig = require('./webpack.test.config.js');

module.exports = function (config) {
  var _config = {
    basePath: '',
    frameworks: ['mocha'],
    logLevel: config.LOG_INFO,
    files: [
      './karma-test-shim.js'
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true,
    },

    reporters: ['mocha'],
    port: 9876,
    colors: true
  };

  config.set(_config);
};