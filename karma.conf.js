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
      './karma-test-shim.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true,
    },

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    browsers : ['Firefox', 'Chrome'],

    singleRun: true,

    autoWatch: true,
    autoWatchBatchDelay: 5000,

    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    concurrency: 1
  };

  config.set(_config);
};
