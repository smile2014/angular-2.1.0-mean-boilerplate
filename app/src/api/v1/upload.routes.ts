import * as express from 'express';
import {uploadFile} from './upload.handlers';

const router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/upload', router);
};

router.post('/', uploadFile);