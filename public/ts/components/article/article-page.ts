import {Component} from 'angular2/core';
import {
  ROUTER_DIRECTIVES,
  RouteConfig
} from 'angular2/router';
import {ArticleMainPage} from './main-page';
import {ArticleIdPage} from './id-page';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <h1>Article Section:</h1>
    <a [routerLink]="['ById', {id: 1}]">Article 1</a>
    <a [routerLink]="['ById', {id: 2}]">Article 2</a>
    <a [routerLink]="['ById', {id: 3}]">Article 3</a>

    <router-outlet></router-outlet>
  <div>
  `
})
@RouteConfig([
  {path: '/main', name: 'Main', component: ArticleMainPage, useAsDefault: true},
  {path: '/:id', name: 'ById', component: ArticleIdPage}
])
export class ArticlePage {}