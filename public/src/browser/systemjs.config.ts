// SystemJS Config
declare const System: any;
(function (global) {
  const paths = {
    'npm:': 'node_modules/'
  };

  const map = {
    '@angular': 'npm:@angular',
    'rxjs': 'npm:rxjs'
  };

  const packages = {
    'dist': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' }
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

    let mainFile = `bundles/${packageName}.umd.js`;
    if (System.packageWithIndex) mainFile = 'index.js';

    packages[`@angular/${packageName}`] = {
      main: mainFile
    };
  });

  System.config({
    paths: paths,
    map: map,
    packages: packages
  });

})(this);
