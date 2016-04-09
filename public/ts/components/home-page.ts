import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {AuthService} from '../services/auth-service';

@Component({
  selector: 'home-page',
  template: `
  <h1>{{message}}</h1>
  `
})
export class HomePage {
  message: string;

  constructor(public http: Http, private authService: AuthService) {
    this.authService.getUsername().subscribe(username => {
      if (username) {
        this.message = `Hello ${username}`;
      } else {
        this.message = `Not Logged In.`;
      }
    });
  }
}