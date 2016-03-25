import * as express from 'express';
import * as formidable from 'formidable';
import * as fs from 'fs';

const router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/upload', router);
};

router.post('/', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const contents = fs.readFileSync(files['file'].path, 'utf-8');
    return res.send(contents);
  });
});