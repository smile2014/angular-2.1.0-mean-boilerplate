var path = require('path');
var cwd = process.cwd();

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: ['js/**/*.test.js'],
    exclude: [
      'js/components/vendor/**/*.js'
    ],
    preprocessors: [],
    reporters: ['kjhtml'],
    port: 9876,
    browsers: ['Chrome'],
    colors: true,
    client: {
      clearContext: false
    },
    concurrency: Infinity
  });
};