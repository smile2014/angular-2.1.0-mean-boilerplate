import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'hello-world',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: [`css/angular2/main.css`],
  template: `
  <nav>
    <a routerLink="/home">Home</a>
    <a routerLink="/upload">Upload</a>
    <a routerLink="/login">Login</a>
    <a routerLink="/profile">Profile</a>
    <a routerLink="/article">Articles</a>
    <a href="/api/v1/logout">Logout</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
export class HelloWorld {}