'use strict';
const config        = require('./config/config');
const express       = require('express');
const glob          = require('glob');
const mongoose      = require('mongoose');
const path          = require('path');

const app           = express();

logEnvironment();
connectToMongo();
loadModels();
loadRoutes();
startServer();

function logEnvironment() {
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

function connectToMongo() {
  console.log(`connecting to ${config.db}...`);
  mongoose.connect(config.db);
  const db = mongoose.connection;
  db.on('error', () => {
    throw new Error('unable to connect to database at ' + config.db);
  });
  db.once('open', () => console.log(`Database: ${config.db} connected.`));
}

function loadModels() {
  const models = glob.sync(config.root + '/app/models/*.js');
  console.log('\nLoading models...');
  models.forEach((model) => {
    require(model);
    console.log(`Loaded model: ${path.basename(model)}`);
  });
}

function loadRoutes() {
  require('./config/express')(app, config);
}

function startServer() {
  app.listen(config.port, () => {
    console.log('\nExpress server listening on port ' + config.port);
  });
}