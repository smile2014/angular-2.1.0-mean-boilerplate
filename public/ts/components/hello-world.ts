import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {HomePage} from './home-page';
import {UploadPage} from './upload-page';
import {LoginPage} from './login-page';
import {ProfilePage} from './profile-page';
import {ArticlePage} from './article/article-page';
import {ErrorPage} from './error-page';

@RouteConfig([
  {path: '/', name: 'Root', redirectTo: ['Home']},
  {path: '/home', name: 'Home', component: HomePage},
  {path: '/upload', name: 'Upload', component: UploadPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/profile', name: 'Profile', component: ProfilePage},
  {path: '/article/...', name: 'Article', component: ArticlePage},
  {path: '/*path', name: 'NotFound', component: ErrorPage}
])
@Component({
  selector: 'hello-world',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <nav>
    <a [routerLink]="['Home']">Home</a>
    <a [routerLink]="['Upload']">Upload</a>
    <a [routerLink]="['Login']">Login</a>
    <a [routerLink]="['Profile']">Profile</a>
    <a [routerLink]="['Article']">Articles</a>
    <a href="/logout">Logout</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
export class HelloWorld {}