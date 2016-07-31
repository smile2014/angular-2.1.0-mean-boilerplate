import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <h1>Article Section:</h1>
    <a [routerLink]="[1]">Article 1</a>
    <a [routerLink]="[2]">Article 2</a>
    <a [routerLink]="[3]">Article 3</a>

    <router-outlet></router-outlet>
  <div>
  `
})
export class ArticleRoute {}