import * as express from 'express';

export const sayHello: express.RequestHandler = function (req, res, next) {
  res.status(200).send('Hello');
}