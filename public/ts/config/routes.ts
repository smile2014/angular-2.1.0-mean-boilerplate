import {RouterConfig} from '@angular/router';

import {ArticleRoute} from '../routes/article/article-route';
import {ArticleIdRoute} from '../routes/article/id-route';
import {ArticleMainRoute} from '../routes/article/main-route';
import {ErrorRoute} from '../routes/error-route';
import {HomeRoute} from '../routes/home/home-route';
import {LoginRoute} from '../routes/login-route';
import {ProfileRoute} from '../routes/profile-route';
import {UploadRoute} from '../routes/upload-route';

import {LoggedInGuard} from '../guards/logged-in';

export const routes: RouterConfig = [
  {path: '', component: HomeRoute},
  {path: 'article', component: ArticleRoute, children: [
    {path: '', redirectTo: 'main'},
    {path: 'main', component: ArticleMainRoute},
    {path: ':id', component: ArticleIdRoute}
  ]},
  {path: 'home', component: HomeRoute},
  {path: 'login', component: LoginRoute},
  {path: 'profile', component: ProfileRoute, canActivate: [LoggedInGuard]},
  {path: 'upload', component: UploadRoute},
  {path: '**', component: ErrorRoute}
];