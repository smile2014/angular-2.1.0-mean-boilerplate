module.exports = function (grunt) {
  grunt.initConfig({
    clean: [
      'app/js/',
      'public/js/'
    ],

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
        tasks: ['buildBackend'],
      },
      frontend: {
        files: ['public/ts/**/*.ts'],
        tasks: ['buildFrontend'],
      }
    }
  });

  [
    'grunt-mocha-test',
    'grunt-mocha-istanbul',
    'grunt-ts',
    'grunt-contrib-watch',
    'grunt-tslint',
    'grunt-contrib-clean'
  ].forEach((task) => grunt.loadNpmTasks(task));
};