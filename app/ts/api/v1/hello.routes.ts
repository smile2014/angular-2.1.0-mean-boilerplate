import * as express from 'express';
import {sayHello} from './hello.handlers';

const router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/', router);
};

router.get('/hello', sayHello);