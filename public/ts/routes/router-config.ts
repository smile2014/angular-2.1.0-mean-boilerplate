import {RouterConfig} from '@angular/router';

import {LoggedInGuard} from '../guards/can-activate/logged-in';
import {ConfirmLeaveGuard} from '../guards/can-deactivate/confirm-leave';

import {ErrorRoute} from './error/error-route';
import {ArticleRoute} from './article/article-route';
import {routes as articleRoutes} from '../routes/article/router-config';
import {HomeRoute} from './home/home-route';
import {LoginRoute} from './login/login-route';
import {ProfileRoute} from './profile/profile-route';
import {UploadRoute} from './upload/upload-route';

export const routes: RouterConfig = [
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