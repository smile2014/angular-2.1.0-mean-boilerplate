import * as express from 'express';

const router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/session', router);
};

router.get('/', (req, res) => {
  const session: any = req.session;
  if (session.views) {
    session.views++;
    res.send(`View number: ${session.views}`);
  } else {
    session.views = 1;
    res.send('First View!');
  }
});

router.get('/clear', (req, res, next) => {
  req.session.regenerate((err) => {
    if (err) {
      next(err);
    } else {
      res.send('Session regenerated.');
    }
  });
});