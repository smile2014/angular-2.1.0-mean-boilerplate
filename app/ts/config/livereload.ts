import * as express from 'express';
import {config} from './express-config';
const sendevent = require('sendevent');
const watch = require('watch');

const livereload = sendevent('/livereload');

module.exports = function (app: express.Express) {
  app.use(livereload);
  watch.watchTree(`${config.root}/public/`, {
    ignoreDirectoryPattern: /(public[/\\]ts)|public[/\\]scss/
  }, () => {
    livereload.broadcast({action: 'reload'});
  });
};