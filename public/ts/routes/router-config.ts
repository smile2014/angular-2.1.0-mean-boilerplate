import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoggedInGuard} from '../guards/can-activate/logged-in';
import {ConfirmLeaveGuard} from '../guards/can-deactivate/confirm-leave';

import {ArticleRoute} from './article/article-route';
import {ErrorRoute} from './error/error-route';
import {routes as articleRoutes} from '../routes/article/router-config';
import {HomeRoute} from './home/home-route';
import {LoginRoute} from './login/login-route';
import {ProfileRoute} from './profile/profile-route';
import {UploadRoute} from './upload/upload-route';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
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

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);