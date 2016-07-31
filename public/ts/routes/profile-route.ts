import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../services/auth-service';
import {Greeting} from '../components/common/greeting';

@Component({
  directives: [Greeting],
  selector: 'profile-page',
  template: `
  <div>
    <h1>Profile page for {{username}}</h1>
    <greeting></greeting>
  </div>
  `
})
export class ProfileRoute implements OnInit {
  username: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUsername().subscribe(username => {
      this.username = username;
    });
  }
}