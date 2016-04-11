import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {AuthService} from '../services/auth-service';

@Component({
  selector: 'home-page',
  template: `
  <div>
    <h1>{{message}}</h1>
  </div>
  `
})
export class HomePage implements OnInit {
  message: string;

  constructor(
    public http: Http,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      if (username) {
        this.message = `Hello ${username}`;
      } else {
        this.message = `Not Logged In.`;
      }
    });
  }
}