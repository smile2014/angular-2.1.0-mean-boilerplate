import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <h1>Article Section:</h1>
    <a (click)="openArticle(1)">Article 1</a>
    <a routerLink="2">Article 2</a>
    <a [routerLink]="[3]">Article 3</a>

    <router-outlet></router-outlet>
  <div>
  `
})
export class ArticleRoute {
  constructor(public router: Router) {}

  openArticle(id: number) {
    this.router.navigate(['article', id, {
      param1: 'param1',
      param2: 'param2'
    }]);
  }
}