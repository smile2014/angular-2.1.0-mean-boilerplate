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
  var files = options.files || '**/*.js'
  var dir = options.dir || 'app/js/test';
  return files.split(';').map(function (file) {
    if (!file.endsWith('.js')) file += '.js';
    return path.normalize(dir + '/' + file);
  });
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
      start: {
        tasks: [
          'watch:backend',
          'watch:frontend',
          'watch:scss',
          'exec:start-nodemon'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    exec: {
      'start-nodemon': 'nodemon server.js --watch app/js/',
      'start-node': 'node server.js'
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
      backend: {tsconfig: 'app/ts/tsconfig.json'},
      frontend: {tsconfig: 'public/ts/tsconfig.json'}
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
      frontend: {
        files: ['public/ts/**/*.ts'],
        tasks: [
          'tslint:frontend',
          'ts:frontend'
        ],
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
    'grunt-concurrent',
    'grunt-contrib-clean',
    'grunt-contrib-watch',
    'grunt-exec',
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
    'mochacli:backend'
  ]);
  grunt.registerTask('test', [
    'test-backend'
  ]);


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


  /************************
   * Start Tasks
   ************************/
  grunt.registerTask('start', [
    'concurrent:start'
  ]);
  grunt.registerTask('dev', [
    'build',
    'start'
  ]);
  grunt.registerTask('prod', [
    'build',
    'exec:start-node'
  ]);
};