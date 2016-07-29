import * as express from 'express';
import {uploadFile} from '../handlers/upload';

const router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/upload', router);
};

router.post('/', uploadFile);