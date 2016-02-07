'use strict';
const express     = require('express');
const mongoose    = require('mongoose');

const router      = express.Router();
const Article     = mongoose.model('Article');

module.exports = function (app) {
  app.use('/home', router);
};

router.get('/', (req, res, next) => {
  Article.find((err, articles) => {
    if (err) return next(err);
    res.send('Home');
  });
});
