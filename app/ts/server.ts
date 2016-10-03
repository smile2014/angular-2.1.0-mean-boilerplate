import 'core-js';
import * as express from 'express';
import * as glob from 'glob';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as path from 'path';
import {config} from './config/express-config';
import {getNodeEnv, isMocha} from './utils/express-utils';
import {loadRoutes} from './config/express';
import {options} from './config/options';

const app = express();
(<any>mongoose).Promise = Promise;

module.exports = function(): http.Server {
  logEnvironment();
  connectToMongo();

  mongoose.connection.once('open', () => {
    console.log(`Database: ${config.db} connected.`);
    loadModels();
    loadRoutes(app);
  });

  return startServer();
};

function logEnvironment(): void {
  console.log('Config:');
  console.dir(config, { colors: true });
  console.log('Options');
  console.dir(options, { colors: true });
}

function connectToMongo(): void {
  // when using mocha, don't allow connecting to anything other than test db
  if (isMocha() && getNodeEnv() !== 'test') {
    throw new Error('Warning running mocha on non-testing database.');
  }

  console.log(`\nconnecting to ${config.db}...`);
  mongoose.connect(config.db);
  const db = mongoose.connection;
  db.on('error', () => {
    throw new Error('unable to connect to database at ' + config.db);
  });
}

function loadModels(): void {
  console.log('\nLoading models...');
  const models = glob.sync(`${__dirname}/models/*.js`);
  models.forEach((model) => {
    require(model);
    console.log(`Loaded model: ${path.basename(model)}`);
  });
}

function startServer(): http.Server {
  // set up livereload
  if (getNodeEnv() === 'development') {
    require('./config/livereload')(app);
  }

  return app.listen(config.port, () => {
    console.log('\nExpress server listening on port ' + config.port);
  });
}