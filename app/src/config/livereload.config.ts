import * as express from 'express';
import {config} from './server.config';
const sendevent = require('sendevent');
const watch = require('watch');

const livereload = sendevent('/livereload');

module.exports = function (app: express.Express) {
  app.use(livereload);
  watch.watchTree(`${config.root}/public/`, {
    ignoreDirectoryPattern: /(public[/\\]src)/
  }, () => {
    livereload.broadcast({action: 'reload'});
  });
};