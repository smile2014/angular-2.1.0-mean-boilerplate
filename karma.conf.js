var path = require('path');
var cwd = process.cwd();

module.exports = function(config) {
  config.set({

    basePath: '',

    browsers: ['Chrome'],

    client: {
      clearContext: false
    },

    colors: true,

    concurrency: Infinity,

    frameworks: ['jasmine'],

    /* Provide all dependencies included in index.html */
    files: [
      // Angular 2 Requirements
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js',

      // 3rd party JS libraries
      'https://code.jquery.com/jquery-2.2.0.min.js',
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js',

      // Source files
      {
        pattern: 'node_modules/@angular/**/*.js',
        included: false,
        served: true
      },
      {
        pattern: 'node_modules/rxjs/**/*.js',
        included: false,
        served: true
      },
      {
        pattern: 'node_modules/symbol-observable/**/*.js',
        included: false,
        served: true
      },

      // App Files
      {
        pattern: 'public/js/**/*.js',
        included: false,
        served: true
      },

      // Test Harness
      'karma-test-shim.js',
    ],

    exclude: [
      'public/js/components/vendor/**/*.js'
    ],

    reporters: ['kjhtml'],

    port: 9876,

    proxies: {
    }
  });
};