import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();
const User = require('../models/user');

module.exports = function (app: express.Express) {
  app.use('/api', router);
};

router.get('/user', (req, res, next) => {
  try {
    res.send({
      username: req.user.username
    });
  } catch (err) {
    res.send({
      username: null
    });
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      res.send({err: 'Invalid username or password.'});
    } else {
      res.send({err: null});
    }
  });
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.register(new User({username: username}), password, (err: any, user: any) => {
    if (err) {
      res.send({err: 'That user already exists.'});
    } else {
      passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
          err ? next(err) : res.send({err: null});
        });
      });
    }
  });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    res.redirect('/');
  });
});