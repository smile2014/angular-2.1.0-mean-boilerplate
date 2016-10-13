import * as express from 'express';
import * as formidable from 'formidable';
import * as fs from 'fs';

export const uploadFile: express.RequestHandler = function (req, res, next) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const contents = fs.readFileSync(files['file'].path, 'utf-8');
    return res.set('Content-Type', 'text/html')
      .send(`<pre>Received:\n${contents}</pre>`);
  });
};