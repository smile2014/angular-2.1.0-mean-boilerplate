module.exports = function (grunt) {
  grunt.initConfig({
    mocha_istanbul: {
      coverage: {
        src: 'app/test'
      }
    },

    mochaTest: {
      files: {
        src: ['app/test/*.js']
      }
    },

    ts: {
      backend: {
        tsconfig: 'app/ts/tsconfig.json'
      },
      frontend: {
        tsconfig: 'public/ts/tsconfig.json'
      }
    },

    tslint: {
      options: {
        configuration: './tslint.json'
      },
      files: {
        src: [
          'app/ts/**/*.ts',
          'public/ts/**/*.ts'
        ]
      }
    },

    watch: {
      tsBackend: {
        files: [
          'app/ts/**/*.ts'
        ],
        tasks: [
          'ts:backend'
        ]
      },
      tsFrontend: {
        files: [
          'public/ts/**/*.ts'
        ],
        tasks: [
          'ts:frontend'
        ]
      }
    }

  });

  [
    'grunt-mocha-test',
    'grunt-mocha-istanbul',
    'grunt-ts',
    'grunt-contrib-watch',
    'grunt-tslint'
  ].forEach((task) => grunt.loadNpmTasks(task));

  grunt.registerTask('cover', ['mocha_istanbul']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('tscFrontend', ['ts:frontend', 'watch:tsFrontend']);
  grunt.registerTask('tscBackend', ['ts:fackend', 'watch:tsBackend']);
  grunt.registerTask('lint', ['tslint']);
  grunt.registerTask('tsc', ['tslint', 'ts:frontend', 'ts:backend']);
};
