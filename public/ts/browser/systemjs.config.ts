// SystemJS Config
declare const System: any;
(function(global: any) {

  const map = {
    '@angular':           'node_modules/@angular',
    'rxjs':               'node_modules/rxjs'
  };

  const packages: any = {
    'js':                 { main: 'main.js', defaultExtension: 'js' },
    'rxjs':               { defaultExtension: 'js' }
  };

  [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
  ].forEach(packageName => {

    let mainFile: string = `/bundles/${packageName}.umd.js`;
    if (System.packageWithIndex) mainFile = 'index.js';

    packages[`@angular/${packageName}`] = {
      main:               mainFile
    };
  });

  const config = {
    map: map,
    packages: packages
  };

  System.config(config);
})(this);
