import {Component} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <h1>This is article #{{id}}</h1>
  </div>
  `
})
export class ArticleIdRoute {
  id: string;

  constructor(public route: ActivatedRoute, public router: Router) {
    route.params.subscribe(params => this.id = params['id']);
  }
}