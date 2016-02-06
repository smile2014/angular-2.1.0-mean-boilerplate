'use strict';
const bodyParser      = require('body-parser');
const compress        = require('compression');
const cookieParser    = require('cookie-parser');
const express         = require('express');
const favicon         = require('serve-favicon');
const glob            = require('glob');
const logger          = require('morgan');
const path            = require('path');
const methodOverride  = require('method-override');

module.exports = function (app, config) {
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

  const controllers = glob.sync(config.root + '/app/controllers/*.js');
  console.log('\nLoading controllers...')
  controllers.forEach((controller) => {
    require(controller)(app);
    console.log(`Loaded controller: ${path.basename(controller)}`);
  });

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.redirect('404.html');
  });
};
