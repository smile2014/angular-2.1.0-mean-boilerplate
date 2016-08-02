// Shim for running Karma with SystemJS

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;
//Error.stackTraceLimit = 0;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

// Cancel Karma's synchronous start, we will call __karma__.start()
//   after everything is loaded.
__karma__.loaded = function() {};


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

  return System.import('@angular/platform-browser/testing')
    .then(function(providers) {
      testing.setBaseTestProviders(
        providers.TEST_BROWSER_PLATFORM_PROVIDERS,
        providers.TEST_BROWSER_APPLICATION_PROVIDERS
      );
    });

// Import our test files with SystemJS
}).then(function () {
  return Promise.all(
    Object.keys(window.__karma__.files)  // All files served by Karma.
    .filter(function (filename) {
      return filename.endsWith('.test.js');
    })
    .map(function (filename) {
      return System.import(filename);
    }));

// Start Jasmine once everything is loaded
}).then(function() {
  __karma__.start();
}).catch(function(error) {
  __karma__.error(error.stack || error);
});
