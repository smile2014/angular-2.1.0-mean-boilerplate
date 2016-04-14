import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {AuthService} from '../services/auth-service';
import {Greeting} from '../components/greeting';

@Component({
  directives: [Greeting],
  template: `
  <div>
    <greeting></greeting>
    <h1>{{message}}</h1>
  </div>
  `
})
export class HomeRoute implements OnInit {
  message: string;

  constructor(public http: Http, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      this.message = username ? `Hello ${username}` : 'Not logged in.';
    });
  }
}