import {Component} from '@angular/core';
import {
  RouterConfig,
  ROUTER_DIRECTIVES
} from '@angular/router';
import {LoggedInGuard} from './guards/can-activate/logged-in';
import {ConfirmLeaveGuard} from './guards/can-deactivate/confirm-leave';

import {ErrorRoute} from './routes/error-route';
import {ArticleRoute} from './routes/article/article-route';
import {HomeRoute} from './routes/home/home-route';
import {LoginRoute} from './routes/login-route';
import {ProfileRoute} from './routes/profile-route';
import {UploadRoute} from './routes/upload-route';

import {routes as articleRoutes} from './routes/article/router-config';

export const routes: RouterConfig = [
  {path: '', component: HomeRoute, pathMatch: 'full'},
  {
    path: 'article',
    component: ArticleRoute,
    children: articleRoutes
  },
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
export class HelloWorld {}