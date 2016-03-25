import * as path from 'path';

// Modify according to your app
const appName       = 'myApp';
const defaultPort   = 3000;
const cookieSecret  = 'random cookie secret';

if (cookieSecret === 'random cookie secret') {
  console.log(`WARNING: change cookie secret in ${__filename}`);
}

export interface Config {
  root: string;
  appName: string;
  cookieSecret: string;
  port: number;
  db: string;
}

const rootPath = path.normalize(__dirname + '/../../..');

let variables: {[env: string]: Config} = {
  development: {
    root: rootPath,
    appName: appName,
    cookieSecret: cookieSecret,
    port: defaultPort,
    db: `mongodb://localhost/${appName}-development`
  },

  test: {
    root: rootPath,
    appName: appName,
    cookieSecret: cookieSecret,
    port: defaultPort,
    db: `mongodb://localhost/${appName}-test`
  },

  production: {
    root: rootPath,
    appName: appName,
    cookieSecret: cookieSecret,
    port: defaultPort,
    db: `mongodb://localhost/${appName}-production`
  }
};

const env = process.env.NODE_ENV || 'development';
export const config: Config = variables[env];