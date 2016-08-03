// Shim for running Karma with SystemJS

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;
//Error.stackTraceLimit = 0;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

// Cancel Karma's synchronous start, we will call __karma__.start()
//   after everything is loaded.
__karma__.loaded = function() {};

// load html and css template into cache
window.$templateCache = {};

// Configure SystemJS
var map = {
  // Angular 2 and RxJS files
  '@angular': 'base/node_modules/@angular',
  'rxjs': 'base/node_modules/rxjs',
  'symbol-observable': 'base/node_modules/symbol-observable',

  // app files
  'js': 'base/public/js'
};

var packages = {
  'rxjs': {defaultExtension: 'js'},
  'symbol-observable': {main: 'index.js', defaultExtension: 'js'},
  'js': {defaultExtension: 'js'}
};

[
  'common',
  'compiler',
  'core',
  'forms',
  'http',
  'platform-browser',
  'platform-browser-dynamic',
  'router',
  'router-deprecated',
].forEach(packageName => {
  packages[`@angular/${packageName}`] = {
    main: 'index.js',
    defaultExtension: 'js'
  };
});

System.config({
  map: map,
  packages: packages
});


// Import the testing module, then import the providers module
System.import('@angular/core/testing').then(function (testing) {
  System.import('@angular/platform-browser-dynamic/testing')
    .then(function (providers) {
      testing.setBaseTestProviders(
        providers.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
        providers.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
      );
    });

}).then(function () {
  return Promise.all(
    Object.keys(window.__karma__.files)  // All files served by Karma.
    .filter(function (filename) {
      return filename.endsWith('.test.js');
    })
    .map(function (filename) {
      return System.import(filename);
    }));

// load .html and .css templates and cache them
}).then(function () {
  return Promise.all(
    Object.keys(window.__karma__.files)
    .filter(function (filename) {
      var isCss = filename.startsWith('/base/public/css') && filename.endsWith('.css');
      return isCss;
    })
    .map(function (filename) {
      return new Promise((resolve, reject) => {
        $.ajax({
          type: 'GET',
          url: filename,
          dataType: 'text',
          success: function (contents) {
            filename = filename.replace('/base/public/', '');
            window.$templateCache[filename] = contents;
            resolve();
          }
        });
      });
    })
  );

// Start Jasmine once everything is loaded
}).then(function() {
  __karma__.start();
}).catch(function (error) {
  __karma__.error(error.stack || error);
});
