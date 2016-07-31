import {Component, OnInit, OnDestroy} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  Router,
  ActivatedRoute
} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <h1>This is article #{{id}}</h1>
  </div>
  `
})
export class ArticleIdRoute implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}