module.exports = function (config) {
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
      // Karma Jasmine Html Reporter
      'node_modules/karma-jasmine-html-reporter/src/css/jasmine.css',
      'node_modules/karma-jasmine-html-reporter/src/lib/html.jasmine.reporter.js',
      'node_modules/karma-jasmine-html-reporter/src/lib/adapter.js',

      // Angular 2 Requirements
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js',

      // Angular 2 Testing Requirements
      'node_modules/zone.js/dist/fake-async-test.js',

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

      // template and css files
      {
        pattern: 'public/css/**/*.css',
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

    reporters: ['progress'],

    port: 9876
  });
};