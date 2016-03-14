/// <reference path="../../typings/tsd.d.ts" />
import {config} from './config/config';
import {loadRoutes} from './config/express';
import {getNodeEnv} from './utils/express-utils';
import * as express from 'express';
import * as glob from 'glob';
import * as mongoose from 'mongoose';
import * as path from 'path';

const app = express();

module.exports = function(): void {
  logEnvironment();
  connectToMongo();
  loadModels();
  loadRoutes(app, config);
  startServer();
}

function logEnvironment(): void {
  console.log(`\nenvironment: ${getNodeEnv()}`);
  console.dir(config, {
    colors: true
  });
}

function connectToMongo(): void {
  console.log(`\nconnecting to ${config.db}...`);
  mongoose.connect(config.db);
  const db = mongoose.connection;
  db.on('error', () => {
    throw new Error('unable to connect to database at ' + config.db);
  });
  db.once('open', () => console.log(`Database: ${config.db} connected.`));
}

function loadModels(): void {
  console.log('\nLoading models...');
  const models = glob.sync(config.root + '/app/js/models/*.js');
  models.forEach((model) => {
    require(model);
    console.log(`Loaded model: ${path.basename(model)}`);
  });
}

function startServer(): void {
  app.listen(config.port, () => {
    console.log('\nExpress server listening on port ' + config.port);
  });
}