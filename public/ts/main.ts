/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {Component, provide, Injector} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import {
  ROUTER_PROVIDERS,
  APP_BASE_HREF,
  ROUTER_PRIMARY_COMPONENT,
  ROUTER_DIRECTIVES,
  RouteConfig,
  Router
} from 'angular2/router';
import {AUTH_PROVIDERS} from './services/auth-service';
import {HomeRoute} from './routes/home-route';
import {UploadRoute} from './routes/upload-route';
import {LoginRoute} from './routes/login-route';
import {ProfileRoute} from './routes/profile-route';
import {ArticleRoute} from './routes/article/article-route';
import {ErrorRoute} from './routes/error-route';

@Component({
  selector: 'hello-world',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <nav>
    <a [routerLink]="['Home']">Home</a>
    <a [routerLink]="['Upload']">Upload</a>
    <a [routerLink]="['Login']">Login</a>
    <a [routerLink]="['Profile']">Profile</a>
    <a [routerLink]="['Article']">Articles</a>
    <a href="/api/logout">Logout</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {path: '/', name: 'Home', component: HomeRoute, useAsDefault: true},
  {path: '/upload', name: 'Upload', component: UploadRoute},
  {path: '/login', name: 'Login', component: LoginRoute},
  {path: '/profile', name: 'Profile', component: ProfileRoute},
  {path: '/article/...', name: 'Article', component: ArticleRoute},
  {path: '/*path', name: 'Error', component: ErrorRoute}
])
class HelloWorld {}

export let injector: Injector;
export let router: Router;

bootstrap(HelloWorld, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  provide(ROUTER_PRIMARY_COMPONENT, {useValue: HelloWorld})
]).then((ref) => {
  injector = ref.injector;
  router = injector.get(Router);
});