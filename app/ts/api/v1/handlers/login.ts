import * as express from 'express';
import * as passport from 'passport';
import {User} from '../../../models/user';

export const getUser: express.RequestHandler = function (req, res, next) {
  try {
    res.status(200).json({
      username: req.user.username
    });
  } catch (err) {
    res.status(200).json({
      username: null
    });
  }
};

export const login: express.RequestHandler = function (req, res, next) {
  req.session.save((err) => {
    if (err) {
      res.status(401).json({err: 'Invalid username or password.'});
    } else {
      res.status(200).json({err: null});
    }
  });
};

export const signup: express.RequestHandler = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.register(new User({username: username}), password, (err: any, user: any) => {
    if (err) {
      res.status(400).json({err: 'That user already exists.'});
    } else {
      passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
          err ? next(err) : res.status(200).json({err: null});
        });
      });
    }
  });
};

export const logout: express.RequestHandler = function (req, res, next) {
  req.logout();
  req.session.save((err) => {
    res.redirect('/');
  });
};