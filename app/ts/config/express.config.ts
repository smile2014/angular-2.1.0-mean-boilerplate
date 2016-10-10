import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as connectMongo from 'connect-mongo';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as glob from 'glob';
import * as logger from 'morgan';
import * as path from 'path';
import * as methodOverride from 'method-override';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import {config} from './server.config';
import {getNodeEnv} from '../utils/express.utils';

const MongoStore = connectMongo(session);

export function loadRoutes(app: express.Express): void {
  loadMiddleware(app);
  loadApi(app);
  loadErrorHandlers(app);
};

function loadMiddleware(app: express.Express): void {
  app.use(compress());
  app.use(favicon(config.root + '/public/assets/img/favicon.ico'));
  app.use(methodOverride());

  // delete after changing the cookie secret
  if (getNodeEnv() === 'development') {
    app.use(logger('dev'));
  }

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

  app.use('/node_modules', express.static(config.root + '/node_modules', {
    extensions: ['js']
  }));
  app.use(secretWarning);
  app.use(express.static(config.root + '/public', {
    extensions: ['html', 'js']
  }));
}

// delete after changing the cookie secret
function secretWarning(req: any, res: any, next: any) {
  if (config.cookieSecret === 'default' || config.tokenSecret === 'default') {
    console.log('WARNING: change cookie/token secrets in app/ts/config/express-config.ts');
  } else {
    console.log('Remember to remove secretWarning() from app/ts/config/express.ts');
  }
  next();
}

function loadApi(app: express.Express): void {
  console.log('\nLoading API...');
  const routes = glob.sync(config.root + '/app/js/api/*.js');
  routes.forEach((route) => {
    require(route)(app);
    console.log(`Loaded route: ${path.basename(route)}`);
  });
}

function loadErrorHandlers(app: express.Express): void {
  // uses client-side routing, send index.html
  app.use((req: express.Request, res: express.Response) => {
    console.log(`GET ${req.originalUrl} 404`);
    res.status(200).sendFile(`${config.root}/public/index.html`);
  });

  app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).end();
  });
}
