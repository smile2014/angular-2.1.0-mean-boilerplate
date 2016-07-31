import {RouterConfig} from '@angular/router';
import {ArticleRoute} from './article-route';
import {ArticleMainRoute} from './main-route';
import {ArticleIdRoute} from './id-route';

export const routes: RouterConfig = [
  {
    path: 'article',
    component: ArticleRoute,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: ArticleMainRoute},
      {path: ':id', component: ArticleIdRoute}
    ]
  }
];