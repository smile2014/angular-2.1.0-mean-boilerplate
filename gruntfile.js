var path = require('path');
var readRecursive = require('fs-readdir-recursive');
var options = require('minimist')(process.argv.slice(2));

module.exports = function (grunt) {
  /*
   * Constants
   */
  var backendInputDir = 'app/src';
  var backendOutputDir = 'app/dist';
  var frontendInputDir = 'public/src';
  var frontendOutputDir = 'public/dist';

  /*
   * grunt task names
   */
  var cleanBackend = {name: 'clean:backend'};
  var cleanFrontend = {name: 'clean:frontend'};
  var concurrentBuild = {name: 'concurrent:build'};
  var concurrentTest = {name: 'concurrent:test'};
  var copyFrontend = {name: 'copy:frontend'};
  var karmaFrontendUnit = {name: 'karma:frontend-unit'};
  var mochaIstanbulBackend = {name: 'mocha_istanbul:backend'};
  var mochaCliBackend = {name: 'mochacli:backend'};
  var sassMain = {name: 'sass:main'};
  var scssLintMain = {name: 'scsslint:main'};
  var tsBackend = {name: 'ts:backend'};
  var tsFrontend = {name: 'ts:frontend'};
  var tsLintBackend = {name: 'tslint:backend'};
  var tsLintFrontend = {name: 'tslint:frontend'};
  var watchBackend = {name: 'watch:backend'};
  var watchBackendTest = {name: 'watch:backend-test'};
  var watchFrontend = {name: 'watch:frontend'};
  var watchFrontendTest = {name: 'watch:frontend-test'};
  var watchScss = {name: 'watch:scss'};
  var watchHtml = {name: 'watch:html'};

  /*
   * user task names
   */
  var buildBackend = {name: 'build-backend'};
  var buildFrontend = {name: 'build-frontend'};
  var build = {name: 'build'};
  var sequentialBuild = {name: 'sequential-build'};
  var testBackend = {name: 'test-backend'};
  var testFrontend = {name: 'test-frontend'};
  var test = {name: 'test'};
  var coverBackend = {name: 'cover-backend'};
  var cover = {name: 'cover'};

  /*
   * initConfig
   */
  grunt.initConfig({
    clean: {
      backend: [backendOutputDir],
      frontend: [frontendOutputDir]
    },

    concurrent: {
      build: {
        tasks: [
          buildBackend.name,
          buildFrontend.name
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      test: {
        tasks: [
          testBackend.name,
          testFrontend.name
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    copy: {
      frontend: {
        files: [{
          expand: true,
          cwd: frontendInputDir,
          src: ['**/*.html'],
          dest: frontendOutputDir,
          filter: 'isFile'
        }]
      }
    },

    karma: {
      'frontend-unit': getKarmaOptions()
    },

    mocha_istanbul: {
      backend: {
        src: getMochaTestFiles(),
        options: {
          includes: [
            backendOutputDir + '/api/**/*.js',
            backendOutputDir + '/models/**/*.js'
          ],
          mochaOptions: ['--env=test']
        }
      }
    },

    mochacli: {
      backend: {
        src: getMochaTestFiles(),
        options: {
          flags: ['--env=test']
        }
      }
    },

    sass: {
      main: {
        files: getScssCompileFiles(),
        options: {
          includePaths: [frontendInputDir + '/styles/']
        }
      }
    },

    scsslint: {
      main: [
        frontendInputDir + '/styles/**/*.scss',
        '!' + frontendInputDir + '/styles/vendor/*.scss'
      ],
      options: {
        config: frontendInputDir + '/styles/scss-lint.yml'
      }
    },

    ts: {
      backend: {
        tsconfig: {
          tsconfig: backendInputDir + '/tsconfig.json',
          passThrough: true
        }
      },
      frontend: {
        tsconfig: {
          tsconfig: frontendInputDir + '/tsconfig.json',
          passThrough: true
        }
      },
      options: {
        compiler: 'node_modules/typescript/bin/tsc'
      }
    },

    tslint: {
      backend: {
        src: [
          backendInputDir + '/**/*.ts',
        ],
        options: {configuration: backendInputDir + '/tslint.json'}
      },
      frontend: {
        src: [
          frontendInputDir + '/**/*.ts',
          '!' + frontendInputDir + '/vendor/*.ts'
        ],
        options: {configuration: frontendInputDir + '/tslint.json'}
      }
    },

    watch: {
      backend: {
        files: [backendInputDir + '/**/*.ts'],
        tasks: [
          tsLintBackend.name,
          tsBackend.name
        ]
      },
      'backend-test': {
        files: [backendInputDir + '/**/*.ts'],
        tasks: [
          tsLintBackend.name,
          tsBackend.name,
          mochaCliBackend.name
        ]
      },
      frontend: {
        files: [frontendInputDir + '/**/*.ts'],
        tasks: [
          tsLintFrontend.name,
          tsFrontend.name
        ]
      },
      'frontend-test': {
        files: [frontendInputDir + '/**/*.ts'],
        tasks: [
          tsLintFrontend.name,
          tsFrontend.name,
          karmaFrontendUnit.name
        ]
      },
      scss: {
        files: [frontendInputDir + '/**/*.scss'],
        tasks: [
          scssLintMain.name,
          sassMain.name
        ]
      },
      html: {
        files: [frontendInputDir + '/**/*.html'],
        tasks: [
          copyFrontend.name
        ]
      }
    }
  });

  /*
   * Helper Functions
   */
  // return an object of individual scss files to compile
  function getScssCompileFiles() {
    var result = {};

    var SCSS_DIR = frontendInputDir;
    var CSS_DIR = frontendOutputDir;
    var SCSS_EXT = '.scss';

    readRecursive(SCSS_DIR).forEach(function (fileName) {
      if (!fileName.endsWith(SCSS_EXT)) return;

      var cssFileName = fileName.substring(0, fileName.length - SCSS_EXT.length) + '.css';
      result[CSS_DIR + '/' + cssFileName] = SCSS_DIR + '/' + fileName;
    });
    return result;
  }

  function getMochaTestFiles() {
    var dir = options.dir || backendOutputDir;
    var files = options.files || '/**/*.test.js';
    return files.split(';').map(function (file) {
      if (!file.endsWith('.test.js')) file += '.test.js';
      return path.normalize(dir + '/' + file);
    });
  }

  function getKarmaOptions() {
    var karmaOptions = {
      configFile: 'karma.conf.js',
      singleRun: (options.singleRun === 'false') ? false : true
    };
    return karmaOptions;
  }

  [
    'grunt-contrib-clean',
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-concurrent',
    'grunt-karma',
    'grunt-mocha-istanbul',
    'grunt-mocha-cli',
    'grunt-sass',
    'grunt-scss-lint',
    'grunt-ts',
    'grunt-tslint'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  /*
   * Build Tasks
   */
  grunt.registerTask(buildBackend.name, [
    cleanBackend.name,
    tsLintBackend.name,
    tsBackend.name
  ]);

  grunt.registerTask(buildFrontend.name, [
    cleanFrontend.name,
    // lint
    tsLintFrontend.name,
    scssLintMain.name,
    // compile/copy
    tsFrontend.name,
    sassMain.name,
    copyFrontend.name
  ]);

  grunt.registerTask(build.name, [
    concurrentBuild.name
  ]);

  grunt.registerTask(sequentialBuild.name, [
    buildBackend.name,
    buildFrontend.name
  ]);

  /*
   * Test Tasks
   */
  grunt.registerTask(testBackend.name, [
    buildBackend.name,
    mochaCliBackend.name,
    watchBackendTest.name
  ]);

  grunt.registerTask(testFrontend.name, [
    buildFrontend.name,
    karmaFrontendUnit.name,
    watchFrontendTest.name
  ]);

  grunt.registerTask(test.name, [
    concurrentTest.name
  ]);

  /*
   * Code Coverage Tasks
   */
  grunt.registerTask(coverBackend.name, [
    buildBackend.name,
    mochaIstanbulBackend.name
  ]);

  grunt.registerTask(cover.name, [
    coverBackend.name
  ]);
};
