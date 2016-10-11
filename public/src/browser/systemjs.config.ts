// SystemJS Config
declare const System: any;
(function (global) {

  const map = {
    '@angular':           'node_modules/@angular',
    'rxjs':               'node_modules/rxjs',
    'symbol-observable':  'node_modules/symbol-observable'
  };

  const packages = {
    'dist':                 { main: 'main.js', defaultExtension: 'js' },
    'rxjs':               { defaultExtension: 'js' },
    'symbol-observable':  { main: 'index.js', defaultExtension: 'js' }
  };

  // Load angular packages
  [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ].forEach(packageName => {

    let mainFile = `/bundles/${packageName}.umd.js`;
    if (System.packageWithIndex) mainFile = 'index.js';

    packages[`@angular/${packageName}`] = {
      main: mainFile
    };
  });

  System.config({
    map: map,
    packages: packages
  });

})(this);
