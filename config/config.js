'use strict';
const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'budgeteer'
    },
    port: 3000,
    db: 'mongodb://localhost/budgeteer-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'budgeteer'
    },
    port: 3000,
    db: 'mongodb://localhost/budgeteer-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'budgeteer'
    },
    port: 3000,
    db: 'mongodb://localhost/budgeteer-production'
  }
};

module.exports = config[env];