import * as express from 'express';
import * as passport from 'passport';
import {getUser, login, signup, logout} from '../handlers/login';

const router = express.Router();

module.exports = function (app: express.Express) {
  app.use('/', router);
};

router.get('/user', getUser);
router.post('/login', passport.authenticate('local'), login);
router.post('/signup', signup);
router.get('/logout', logout);