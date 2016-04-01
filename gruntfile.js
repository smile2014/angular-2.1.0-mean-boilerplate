module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      backend: ['app/js/'],
      frontend: ['public/js/']
    },

    mocha_istanbul: {
      coverage: {src: 'app/test'}
    },

    mochaTest: {
      files: {src: ['app/test/*.js']}
    },

    // typescript compile
    ts: {
      backend: {tsconfig: 'app/ts/tsconfig.json'},
      frontend: {tsconfig: 'public/ts/tsconfig.json'}
    },

    tslint: {
      options: {configuration: './tslint.json'},
      backend: {src: ['app/ts/**/*.ts']},
      frontend: {src: ['public/ts/**/*.ts']}
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
      }
    }
  });

  [
    'grunt-contrib-clean',
    'grunt-contrib-watch',
    'grunt-mocha-istanbul',
    'grunt-mocha-test',
    'grunt-ts',
    'grunt-tslint'
  ].forEach((task) => grunt.loadNpmTasks(task));
};