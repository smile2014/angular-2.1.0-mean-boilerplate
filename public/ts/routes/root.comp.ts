import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'app-root',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: [`css/angular2/main.css`],
  template: `
  <nav>
    <a routerLink="/home">Home</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
export class RootComponent {}