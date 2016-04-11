import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

@Component({
  selector: 'id-page',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <h1 *ngIf="validArticle(id)">This is article #{{id}}</h1>
    <h1 *ngIf="!validArticle(id)">Not a valid article number</h1>
  </div>
  `
})
export class ArticleIdPage {
  id: string;

  constructor(public routeParams: RouteParams) {
    this.id = routeParams.get('id');
  }

  validArticle(id: string) {
    try {
      const _id = parseInt(id, 10);
      return _id >= 1 && _id <= 3;
    } catch (err) {
      return false;
    }
  }
}