import {Routes} from '@angular/router';
import {ArticleMainRoute} from './main-route';
import {ArticleIdRoute} from './id-route';

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: ArticleMainRoute},
  {path: ':id', component: ArticleIdRoute}
];