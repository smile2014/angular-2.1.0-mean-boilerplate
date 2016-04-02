import * as express from 'express';
import {config} from './express-config';
const sendevent = require('sendevent');
const watch = require('watch');

const livereload = sendevent('/livereload');

module.exports = function (app: express.Express) {
  app.use(livereload);
  // directories to watch for changes
  [
    `${config.root}/public/`,
    `${config.root}/public/js`
  ].forEach((dir: string) => {
    watch.watchTree(dir, () => livereload.broadcast({action: 'reload'}));
  });
};