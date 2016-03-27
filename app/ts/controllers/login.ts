import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();
const User = require('../models/user');

module.exports = function (app: express.Express) {
  app.use('/', router);
};

router.get('/user', (req, res, next) => {
  res.send(req.user);
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  req.session.save((err) => {
    return err ? next(err) : res.redirect('/');
  });
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.register(new User({username: username}), password, (err: any, user: any) => {
    if (err) {
      return res.send('That user already exists.');
    } else {
      passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
          return err ? next(err) : res.redirect('/');
        });
      });
    }
  });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    return err ? next(err) : res.redirect('/');
  });
});