/// <reference path="../../typings-modules/frontend.d.ts" />
import {APP_BASE_HREF} from '@angular/common';
import {provide, Injector} from '@angular/core';
import {
  provideForms,
  disableDeprecatedForms
} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter} from '@angular/router';

import {LoggedInGuard} from './guards/can-activate/logged-in';
import {ConfirmLeaveGuard} from './guards/can-deactivate/confirm-leave';
import {AUTH_PROVIDERS} from './services/auth-service';
import {routes, HelloWorld} from './hello-world';

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