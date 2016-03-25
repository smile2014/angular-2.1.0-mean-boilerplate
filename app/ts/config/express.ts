import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as favicon from 'serve-favicon';
import * as glob from 'glob';
import * as logger from 'morgan';
import * as path from 'path';
import * as methodOverride from 'method-override';
import {config} from './express-config';

export function loadRoutes(app: express.Express): void {
  loadMiddleware(app);
  loadControllers(app);
  loadErrorHandlers(app);
};

function loadMiddleware(app: express.Express): void {
  app.use(favicon(config.root + '/public/assets/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser(config.cookieSecret));
  app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret
  }));
  app.use(compress());
  app.use(express.static(config.root + '/public', {
    extensions: ['html']
  }));
  app.use(methodOverride());
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
    res.status(404).sendFile(`${config.root}/public/404.html`);
  });

  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).sendFile(`${config.root}/public/500.html`);
  });
}
