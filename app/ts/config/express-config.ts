import * as path from 'path';

// Modify according to your app
const appName       = 'myApp';
const defaultPort   = 3000;
const cookieSecret  = 'secret';

if (cookieSecret === 'random cookie secret') {
  const file = path.basename(__filename).replace('.js', '.ts');
  console.log(`WARNING: change cookie secret in ${file}`);
  process.exit(0);
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