import * as express from 'express';
import * as mongoose from 'mongoose';

const router      = express.Router();
const Article     = mongoose.model('Article');

module.exports = function (app: express.Express): void {
  app.use('/db', router);
};

router.get('/', (req, res, next) => {
  Article.find((err: any, articles: mongoose.Document[]) => {
    if (err) return next(err);
    res.send('db');
  });
});
