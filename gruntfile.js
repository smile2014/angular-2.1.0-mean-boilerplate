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
    }
  });
  
  [
    'grunt-contrib-jshint',
    'grunt-mocha-test',
    'grunt-mocha-istanbul'
  ].forEach((task) => grunt.loadNpmTasks(task));
  
  grunt.registerTask('default', ['jshint', 'mocha_istanbul']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('cover', ['mocha_istanbul']);
};
