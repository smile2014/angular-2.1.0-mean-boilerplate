import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams, Router, CanActivate} from 'angular2/router';
import {router} from '../../main';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <h1>This is article #{{id}}</h1>
  </div>
  `
})
@CanActivate((next, prev) => {
  const id = parseInt(next.params['id'], 10);
  if (id && id >= 1 && id <= 3) {
    return true;
  } else {
    router.navigateByUrl('/404', true);
    return false;
  }
})
export class ArticleIdPage {
  id: string;

  constructor(public routeParams: RouteParams, public router: Router) {
    this.id = routeParams.get('id');
  }
}