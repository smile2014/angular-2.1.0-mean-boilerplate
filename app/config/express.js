'use strict';
const bodyParser      = require('body-parser');
const compress        = require('compression');
const config          = require('./config');
const cookieParser    = require('cookie-parser');
const express         = require('express');
const favicon         = require('serve-favicon');
const glob            = require('glob');
const logger          = require('morgan');
const path            = require('path');
const methodOverride  = require('method-override');

module.exports = function (app, config) {
  loadMiddleware(app, config);
  loadControllers(app, config);
  loadErrorHandlers(app);
};

function loadMiddleware(app, config) {
  app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
}

function loadControllers(app, config) {
  console.log('\nLoading controllers...')
  const controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
    console.log(`Loaded controller: ${path.basename(controller)}`);
  });
}

function loadErrorHandlers(app) {
  app.use((req, res) => {
    res.status(404).sendFile(config.path404);
  });
  
  app.use((err, req, res, next) => {
    res.status(500).sendFile(config.path500);
  });
}