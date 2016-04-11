import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as connectMongo from 'connect-mongo';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as glob from 'glob';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as path from 'path';
import * as methodOverride from 'method-override';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import {config} from './express-config';
import {getNodeEnv} from '../utils/express-utils';

const MongoStore = connectMongo(session);
const LocalStrategy = passportLocal.Strategy;
const User = require('../models/user');

export function loadRoutes(app: express.Express): void {
  loadMiddleware(app);
  loadControllers(app);
  loadErrorHandlers(app);
};

function loadMiddleware(app: express.Express): void {
  // delete after changing the cookie secret
  app.use(cookieSecretWarning);
  if (getNodeEnv() === 'development') {
    app.use(logger('dev'));
    require('./livereload')(app);
  }

  app.use(favicon(config.root + '/public/assets/img/favicon.ico'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser(config.cookieSecret));

  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  configurePassport();

  app.use(compress());
  app.use(express.static(config.root + '/public', {
    extensions: ['html', 'js']
  }));
  app.use(methodOverride());
}

// delete after changing the cookie secret
function cookieSecretWarning(req: any, res: any, next: any) {
  if (config.cookieSecret === 'default') {
    console.log('WARNING: change cookie secret in app/ts/config/express-config.ts');
  } else {
    console.log('Remember to remove cookieSecretWarning() from app/ts/config/express.ts');
  }
  next();
}

function configurePassport() {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

function loadControllers(app: express.Express): void {
  console.log('\nLoading controllers...');
  const controllers = glob.sync(config.root + '/app/js/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
    console.log(`Loaded controller: ${path.basename(controller)}`);
  });
}

function loadErrorHandlers(app: express.Express): void {
  app.use((req: express.Request, res: express.Response) => {
    console.log(`GET ${req.originalUrl} 404`);
    res.status(200).sendFile(`${config.root}/public/index.html`);
  });

  app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).end();
  });
}
