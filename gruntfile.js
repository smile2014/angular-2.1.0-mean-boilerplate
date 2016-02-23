module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      files: ['*.js', 'app/**/*.js'],
      options: {
        esversion: 6,
        node: true,
        mocha: true
      }
    },
    
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
      default: {
        src: ['public/ts/**/*.ts'],
        outDir: 'public/js',
        watch: ['public/ts/**/*.ts'],
        options: {
          rootDir: 'public/ts',
          fast: 'never',
          // from tsconfig.json
          "target": "es5",
          "module": "system",
          "moduleResolution": "node",
          "sourceMap": true,
          "emitDecoratorMetadata": true,
          "experimentalDecorators": true,
          "removeComments": false,
          "noImplicitAny": false
        }
      }
    }
  });
  
  [
    'grunt-contrib-jshint',
    'grunt-mocha-test',
    'grunt-mocha-istanbul',
    'grunt-ts'
  ].forEach((task) => grunt.loadNpmTasks(task));
  
  grunt.registerTask('default', ['jshint', 'mocha_istanbul']);
  
  grunt.registerTask('cover', ['mocha_istanbul']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('tsc', ['ts']);
};
