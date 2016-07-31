import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from '../../services/auth-service';
import {Greeting} from '../../components/greeting';
import {Tester} from './tester';

@Component({
  directives: [Greeting, Tester],
  styleUrls: [`css/angular2/routes/home-route.css`],
  template: `
  <div>
    <greeting></greeting>
    <h1>{{message}}</h1>
    <div>{{testerMessage}}</div>
    <tester [(data)]="testerMessage"></tester>
  </div>
  `
})
export class HomeRoute implements OnInit {
  message: string;
  testerMessage: string;

  constructor(public http: Http, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe((username: any) => {
      this.message = username ? `Hello ${username}` : 'Not logged in.';
    });
    this.testerMessage = 'hello world';
  }
}