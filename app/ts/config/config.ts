import * as path from 'path';

const appName       = 'myApp';
const defaultPort   = 3000;
const rootPath      = path.normalize(__dirname + '/../../..');

let variables: any = {
  development: {
    root: rootPath,
    app: {
      name: appName
    },
    port: defaultPort,
    db: `mongodb://localhost/${appName}-development`
  },

  test: {
    root: rootPath,
    app: {
      name: appName
    },
    port: defaultPort,
    db: `mongodb://localhost/${appName}-test`
  },

  production: {
    root: rootPath,
    app: {
      name: appName
    },
    port: defaultPort,
    db: `mongodb://localhost/${appName}-production`
  }
};

const env = process.env.NODE_ENV || 'development';
export const config = variables[env];