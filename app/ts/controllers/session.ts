import * as express from 'express';

const router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/session', router);
};

router.get('/', (req, res) => {
  res.cookie('hello', 'world');
  res.send('Session');
});