import {Component} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  RouteParams,
  Router,
  CanActivate
} from '@angular/router-deprecated';
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
export class ArticleIdRoute {
  id: string;

  constructor(public routeParams: RouteParams, public router: Router) {
    this.id = routeParams.get('id');
  }
}