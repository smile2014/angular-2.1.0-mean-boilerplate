'use strict';
const config = require('./config/config');
const express = require('express');
const glob = require('glob');
const mongoose = require('mongoose');

const app = express();

connectToMongo();
loadModels();
loadRoutes();
startServer();

function connectToMongo() {
  mongoose.connect(config.db);
  const db = mongoose.connection;
  db.on('error', () => {
    throw new Error('unable to connect to database at ' + config.db);
  });
}

function loadModels() {
  const models = glob.sync(config.root + '/app/models/*.js');
  models.forEach((model) => require(model));
}

function loadRoutes() {
  require('./config/express')(app, config);
}

function startServer() {
  app.listen(config.port, () => {
    console.log('Express server listening on port ' + config.port);
  });
}