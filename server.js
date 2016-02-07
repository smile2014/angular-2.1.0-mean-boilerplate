'use strict';
const config = require('./config/config');
const express = require('express');
const glob = require('glob');
const mongoose = require('mongoose');

// MongoDB
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach((model) => require(model));

// Express
const app = express();

require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});