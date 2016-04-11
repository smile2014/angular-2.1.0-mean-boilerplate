/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HelloWorld} from './components/hello-world';
import {HTTP_PROVIDERS} from 'angular2/http';
import {
  ROUTER_PROVIDERS,
  APP_BASE_HREF,
  ROUTER_PRIMARY_COMPONENT,
} from 'angular2/router';
import {AUTH_PROVIDERS} from './services/auth-service';

bootstrap(HelloWorld, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  provide(ROUTER_PRIMARY_COMPONENT, {useValue: HelloWorld})
]);