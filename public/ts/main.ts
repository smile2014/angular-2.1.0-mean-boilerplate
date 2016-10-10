/// <reference types="jasmine" />
import {APP_BASE_HREF} from '@angular/common';
import {NgModule, Provider} from '@angular/core';
import {FormsModule, FORM_PROVIDERS, REACTIVE_FORM_PROVIDERS} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RootComponent} from './routes/root.comp';
import {Greeting} from './components/greeting.comp';
import {ErrorRoute} from './routes/error/error.route';
import {HomeRoute} from './routes/home/home.route';

import {ActivateGuard} from './guards/can-activate/activate.guard';
import {DeactivateGuard} from './guards/can-deactivate/deactivate.guard';
import {AUTH_PROVIDERS} from './services/auth.service';

import {routing} from './config/router.config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    RootComponent,
    Greeting,
    ErrorRoute,
    HomeRoute
  ],
  providers: [
    FORM_PROVIDERS,
    REACTIVE_FORM_PROVIDERS,
    ActivateGuard,
    DeactivateGuard,
    new Provider(APP_BASE_HREF, {useValue: '/'}),
    AUTH_PROVIDERS
  ],
  bootstrap: [RootComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);