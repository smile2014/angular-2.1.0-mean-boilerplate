const minimist = require('minimist');
const path = require('path');
const readRecursive = require('fs-readdir-recursive');

const options = minimist(process.argv.slice(2));

// return an object of individual scss files to compile
function getScssCompileFiles() {
  var result = {
    'public/css/main.css': 'public/scss/main.scss'
  };

  // sass files for angular2 components
  var SCSS_DIR = 'public/scss/angular2/';
  var CSS_DIR = 'public/css/angular2/';

  readRecursive(SCSS_DIR).forEach(scssFileName => {
    var cssFileName = scssFileName.split('.')[0] + '.css';
    result[CSS_DIR + cssFileName] = SCSS_DIR + scssFileName;
  });
  return result;
}

function getMochaTestFiles() {
  var files = options.files || '**/*.test.js'
  var dir = options.dir || 'app/js/';
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

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      backend: ['app/js/'],
      frontend: ['public/js/'],
      scss: ['public/css']
    },

    concurrent: {
      build: {
        tasks: [
          'build-backend',
          'build-frontend',
          'build-scss'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      test: {
        tasks: [
          'test-backend',
          'test-frontend'
        ],
        options: {
          logConcurrentOutput: true
        }
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
            'app/js/controllers/**/*.js',
            'app/js/models/**/*.js'
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
          includePaths: ['public/scss/']
        }
      }
    },

    scsslint: {
      main: [
        'public/scss/**/*.scss',
        '!public/scss/vendor/*.scss'
      ],
      options: {
        config: 'public/scss/scss-lint.yml'
      }
    },

    // typescript compile
    ts: {
      backend: {
        tsconfig: {
          tsconfig: 'app/ts/tsconfig.json',
          passThrough: true
        }
      },
      frontend: {
        tsconfig: {
          tsconfig: 'public/ts/tsconfig.json',
          passThrough: true
        }
      },
      options: {
        compiler: 'node_modules/typescript/bin/tsc'
      }
    },

    tslint: {
      backend: {
        src: ['app/ts/**/*.ts'],
        options: {configuration: './app/ts/tslint.json'}
      },
      frontend: {
        src: [
          'public/ts/**/*.ts',
          '!public/ts/vendor/**/*.ts'
        ],
        options: {configuration: './public/ts/tslint.json'}
      }
    },

    watch: {
      backend: {
        files: ['app/ts/**/*.ts'],
        tasks: [
          'tslint:backend',
          'ts:backend'
        ],
      },
      'backend-test': {
        files: ['app/ts/**/*.ts'],
        tasks: [
          'tslint:backend',
          'ts:backend',
          'mochacli:backend'
        ]
      },
      frontend: {
        files: ['public/ts/**/*.ts'],
        tasks: [
          'tslint:frontend',
          'ts:frontend'
        ],
      },
      'frontend-test': {
        files: ['public/ts/**/*.ts'],
        tasks: [
          'tslint:frontend',
          'ts:frontend',
          'karma:frontend-unit'
        ]
      },
      scss: {
        files: ['public/scss/**/*.scss'],
        tasks: [
          'scsslint',
          'sass:main'
        ]
      }
    }
  });

  [
    'grunt-contrib-clean',
    'grunt-contrib-watch',
    'grunt-concurrent',
    'grunt-karma',
    'grunt-mocha-istanbul',
    'grunt-mocha-cli',
    'grunt-sass',
    'grunt-scss-lint',
    'grunt-ts',
    'grunt-tslint'
  ].forEach((task) => grunt.loadNpmTasks(task));


  /************************
   * Build Tasks
   ************************/
  grunt.registerTask('build-backend', [
    'clean:backend',
    'tslint:backend',
    'ts:backend'
  ]);
  grunt.registerTask('build-frontend', [
    'clean:frontend',
    'tslint:frontend',
    'ts:frontend'
  ]);
  grunt.registerTask('build-scss', [
    'clean:scss',
    'scsslint:main',
    'sass:main'
  ]);
  grunt.registerTask('build', ['concurrent:build']);
  grunt.registerTask('sequential-build', [
    'build-backend',
    'build-frontend',
    'build-scss'
  ]);


  /************************
   * Test Tasks
   ************************/
  grunt.registerTask('test-backend', [
    'build-backend',
    'mochacli:backend',
    'watch:backend-test'
  ]);
  grunt.registerTask('test-frontend', [
    'build-frontend',
    'karma:frontend-unit',
    'watch:frontend-test'
  ]);
  grunt.registerTask('test', ['concurrent:test']);


  /************************
   * Code Coverage Tasks
   ************************/
  grunt.registerTask('cover-backend', [
    'build-backend',
    'mocha_istanbul:backend'
  ]);
  grunt.registerTask('cover', [
    'cover-backend'
  ]);
};