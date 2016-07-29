import * as express from 'express';
import * as glob from 'glob';

const versions = [
  'v1'
];

module.exports = function (app: express.Express): void {
  versions.forEach(version => {
    const router = express.Router();
    const routes = glob.sync(`${__dirname}/${version}/routes/**/*.js`);
    routes.forEach(route => {
      require(route)(router);
    });
    app.use(`/api/${version}`, router);
  });
};