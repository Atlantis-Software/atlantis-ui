var path = require('path');
var webpackConfig = require('./webpack.test.config.js');

module.exports = function (config) {
  var _config = {
    basePath: '',
    frameworks: ['mocha'],
    logLevel: config.LOG_INFO,
    files: [
      './karma-test-shim.js'
    ],

    client: {
      mocha : {
        timeout: '10000'
      }
    },

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

    browsers : ['Firefox', 'Chrome'],

    singleRun: true,

    autoWatch: true,
    autoWatchBatchDelay: 5000,

    remapIstanbulReporter: {
      reports: {
        lcovonly: 'coverage/lcov.info'
      }
    },
    reporters: ['mocha', 'karma-remap-istanbul'],

    port: 9876,
    colors: true,
    concurrency: 1
  };

  config.set(_config);
};
