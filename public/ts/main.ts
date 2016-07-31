/// <reference path="../../typings-modules/frontend.d.ts" />
import {APP_BASE_HREF} from '@angular/common';
import {Component, provide, Injector} from '@angular/core';
import {
  provideForms,
  disableDeprecatedForms
} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter, ROUTER_DIRECTIVES} from '@angular/router';

import {routes} from './config/routes';
import {LoggedInGuard} from './guards/logged-in';
import {AUTH_PROVIDERS} from './services/auth-service';

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

  HTTP_PROVIDERS,
  AUTH_PROVIDERS

]).then(ref => {
  injector = ref.injector;
}).catch(err => console.error(err));