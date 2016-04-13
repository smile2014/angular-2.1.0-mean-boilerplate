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
import {HomePage} from './components/home-page';
import {UploadPage} from './components/upload-page';
import {LoginPage} from './components/login-page';
import {ProfilePage} from './components/profile-page';
import {ArticlePage} from './components/article/article-page';
import {ErrorPage} from './components/error-page';

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
  {path: '/', name: 'Home', component: HomePage, useAsDefault: true},
  {path: '/upload', name: 'Upload', component: UploadPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/profile', name: 'Profile', component: ProfilePage},
  {path: '/article/...', name: 'Article', component: ArticlePage},
  {path: '/*path', name: 'Error', component: ErrorPage}
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