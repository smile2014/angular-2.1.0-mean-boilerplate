/// <reference path="../../typings-modules/frontend.d.ts" />
import {APP_BASE_HREF} from '@angular/common';
import {Component, provide, Injector} from '@angular/core';
import {
  provideForms,
  disableDeprecatedForms
} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter, ROUTER_DIRECTIVES, RouterConfig} from '@angular/router';

import {LoggedInGuard} from './guards/can-activate/logged-in';
import {ConfirmLeaveGuard} from './guards/can-deactivate/confirm-leave';
import {AUTH_PROVIDERS} from './services/auth-service';

import {ErrorRoute} from './routes/error-route';
import {HomeRoute} from './routes/home/home-route';
import {LoginRoute} from './routes/login-route';
import {ProfileRoute} from './routes/profile-route';
import {UploadRoute} from './routes/upload-route';

import {routes as articleRoutes} from './routes/article/router-config';

export const routes: RouterConfig = [
  {path: '', component: HomeRoute, pathMatch: 'full'},
  ...articleRoutes,
  {path: 'home', component: HomeRoute},
  {path: 'login', component: LoginRoute},
  {
    path: 'profile',
    component: ProfileRoute,
    canActivate: [LoggedInGuard],
    canDeactivate: [ConfirmLeaveGuard]
  },
  {path: 'upload', component: UploadRoute},
  {path: '**', component: ErrorRoute}
];

@Component({
  selector: 'hello-world',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: [`css/angular2/main.css`],
  template: `
  <nav>
    <a routerLink="/home">Home</a>
    <a routerLink="/upload">Upload</a>
    <a routerLink="/login">Login</a>
    <a routerLink="/profile">Profile</a>
    <a routerLink="/article">Articles</a>
    <a href="/api/v1/logout">Logout</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
class HelloWorld {}

export let injector: Injector;

bootstrap(HelloWorld, [
  disableDeprecatedForms(),
  provideForms(),

  provideRouter(routes),
  provide(APP_BASE_HREF, {useValue: '/'}),
  LoggedInGuard,
  ConfirmLeaveGuard,

  HTTP_PROVIDERS,
  AUTH_PROVIDERS

]).then(ref => {
  injector = ref.injector;
}).catch(err => console.error(err));