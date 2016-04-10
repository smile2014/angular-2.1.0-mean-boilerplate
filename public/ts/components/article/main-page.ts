import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

@Component({
  selector: 'main-page',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <h1>Select an article.</h1>
  `
})
export class ArticleMainPage {
  constructor(public router: Router) {}
}