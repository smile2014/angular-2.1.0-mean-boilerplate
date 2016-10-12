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
  var cleanBackend = 'clean:backend';
  var cleanFrontend = 'clean:frontend';
  var concurrentBuild = 'concurrent:build';
  var concurrentTest = 'concurrent:test';
  var copyFrontend = 'copy:frontend';
  var karmaFrontendUnit = 'karma:frontend-unit';
  var mochaIstanbulBackend = 'mocha_istanbul:backend';
  var mochaCliBackend = 'mochacli:backend';
  var sassMain = 'sass:main';
  var scssLintMain = 'scsslint:main';
  var tsBackend = 'ts:backend';
  var tsFrontend = 'ts:frontend';
  var tsLintBackend = 'tslint:backend';
  var tsLintFrontend = 'tslint:frontend';
  var watchBackend = 'watch:backend';
  var watchBackendTest = 'watch:backend-test';
  var watchFrontend = 'watch:frontend';
  var watchFrontendTest = 'watch:frontend-test';
  var watchScss = 'watch:scss';
  var watchHtml = 'watch:html';

  /*
   * user task names
   */
  var buildBackend = 'build-backend';
  var buildFrontend = 'build-frontend';
  var build = 'build';
  var sequentialBuild = 'sequential-build';
  var testBackend = 'test-backend';
  var testFrontend = 'test-frontend';
  var test = 'test';
  var coverBackend = 'cover-backend';
  var cover = 'cover';

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
          buildBackend,
          buildFrontend
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      test: {
        tasks: [
          testBackend,
          testFrontend
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
          tsLintBackend,
          tsBackend
        ]
      },
      'backend-test': {
        files: [backendInputDir + '/**/*.ts'],
        tasks: [
          tsLintBackend,
          tsBackend,
          mochaCliBackend
        ]
      },
      frontend: {
        files: [frontendInputDir + '/**/*.ts'],
        tasks: [
          tsLintFrontend,
          tsFrontend
        ]
      },
      'frontend-test': {
        files: [frontendInputDir + '/**/*.ts'],
        tasks: [
          tsLintFrontend,
          tsFrontend,
          karmaFrontendUnit
        ]
      },
      scss: {
        files: [frontendInputDir + '/**/*.scss'],
        tasks: [
          scssLintMain,
          sassMain
        ]
      },
      html: {
        files: [frontendInputDir + '/**/*.html'],
        tasks: [
          copyFrontend
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

      var scssFileName = fileName;
      var cssFileName = fileName.substring(0, fileName.length - SCSS_EXT.length) + '.css';
      result[CSS_DIR + '/' + cssFileName] = SCSS_DIR + '/' + scssFileName;
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
  grunt.registerTask(buildBackend, [
    cleanBackend,
    tsLintBackend,
    tsBackend
  ]);

  grunt.registerTask(buildFrontend, [
    cleanFrontend,
    // lint
    tsLintFrontend,
    scssLintMain,
    // compile/copy
    tsFrontend,
    sassMain,
    copyFrontend
  ]);

  grunt.registerTask(build, [
    concurrentBuild
  ]);

  grunt.registerTask(sequentialBuild, [
    buildBackend,
    buildFrontend
  ]);

  /*
   * Test Tasks
   */
  grunt.registerTask(testBackend, [
    buildBackend,
    mochaCliBackend,
    watchBackendTest
  ]);

  grunt.registerTask(testFrontend, [
    buildFrontend,
    karmaFrontendUnit,
    watchFrontendTest
  ]);

  grunt.registerTask(test, [
    concurrentTest
  ]);

  /*
   * Code Coverage Tasks
   */
  grunt.registerTask(coverBackend, [
    buildBackend,
    mochaIstanbulBackend
  ]);

  grunt.registerTask(cover, [
    coverBackend
  ]);
};
