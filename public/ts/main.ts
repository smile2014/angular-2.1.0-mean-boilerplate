import 'jasmine';
import {APP_BASE_HREF} from '@angular/common';
import {NgModule, Provider} from '@angular/core';
import {FormsModule, FORM_PROVIDERS, REACTIVE_FORM_PROVIDERS} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppRoot} from './routes/root';
import {Greeting} from './components/greeting';
import {ArticleRoute} from './routes/article/article-route';
import {ArticleIdRoute} from './routes/article/id-route';
import {ArticleMainRoute} from './routes/article/main-route';
import {ErrorRoute} from './routes/error/error-route';
import {HomeRoute} from './routes/home/home-route';
import {LoginRoute} from './routes/login/login-route';
import {ProfileRoute} from './routes/profile/profile-route';
import {UploadRoute} from './routes/upload/upload-route';

import {LoggedInGuard} from './guards/can-activate/logged-in';
import {ConfirmLeaveGuard} from './guards/can-deactivate/confirm-leave';
import {AUTH_PROVIDERS} from './services/auth-service';

import {routing} from './routes/router-config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppRoot,
    Greeting,
    ArticleRoute,
    ArticleIdRoute,
    ArticleMainRoute,
    ErrorRoute,
    HomeRoute,
    LoginRoute,
    ProfileRoute,
    UploadRoute
  ],
  providers: [
    FORM_PROVIDERS,
    REACTIVE_FORM_PROVIDERS,
    LoggedInGuard,
    ConfirmLeaveGuard,
    new Provider(APP_BASE_HREF, {useValue: '/'}),
    AUTH_PROVIDERS
  ],
  bootstrap: [AppRoot]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);