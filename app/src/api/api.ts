import * as express from 'express';
import * as glob from 'glob';
import * as path from 'path';

const versions = [
  'v1'
];

module.exports = function (app: express.Express): void {
  versions.forEach(version => {
    const router = express.Router();
    const routes = glob.sync(`${__dirname}/${version}/*.routes.js`);
    routes.forEach(route => {
      console.log(`Loaded API: ${path.basename(route)}`);
      require(route)(router);
    });
    app.use(`/api/${version}`, router);
  });
};