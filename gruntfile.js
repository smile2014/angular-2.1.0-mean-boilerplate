const readRecursive = require('fs-readdir-recursive');

// return an object of individual scss files to compile
function getSassCompileFiles() {
  var result = {};

  // main sass file
  result['public/css/main.css'] = 'public/scss/main.scss';

  // sass files for angular2 components
  var SCSS_DIR = 'public/scss/angular2/';
  var CSS_DIR = 'public/css/angular2/';

  readRecursive(SCSS_DIR).forEach(scssFileName => {
    var cssFileName = scssFileName.split('.')[0] + '.css';
    result[CSS_DIR + cssFileName] = SCSS_DIR + scssFileName;
  });
  return result;
}

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      backend: ['app/js/'],
      frontend: ['public/js/'],
      sass: ['public/css']
    },

    mocha_istanbul: {
      coverage: {src: 'app/test'}
    },

    mochaTest: {
      files: {src: ['app/test/*.js']}
    },

    sass: {
      main: {
        files: getSassCompileFiles(),
        options: {
          includePaths: ['public/scss/']
        }
      }
    },

    scsslint: {
      main: [
        'public/scss/**/*.scss',
        '!puiblc/scss/vendor/*.scss'
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
      options: {configuration: './tslint.json'},
      backend: {src: ['app/ts/**/*.ts']},
      frontend: {src: [
        'public/ts/**/*.ts',
        '!public/ts/vendor/**/*.ts'
      ]}
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
      sass: {
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
    'grunt-mocha-istanbul',
    'grunt-mocha-test',
    'grunt-sass',
    'grunt-scss-lint',
    'grunt-ts',
    'grunt-tslint'
  ].forEach((task) => grunt.loadNpmTasks(task));
};