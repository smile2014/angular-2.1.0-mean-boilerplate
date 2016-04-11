import {Component, Injector, OnInit} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AuthService} from '../services/auth-service';

const authService: AuthService = Injector.resolveAndCreate([
  HTTP_PROVIDERS,
  AuthService
]).get(AuthService);

@Component({
  selector: 'profile-page',
  template: `
  <h1>Profile page for {{username}}</h1>
  `
})
@CanActivate((next, prev) => authService.isLoggedIn())
export class ProfilePage implements OnInit {
  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      this.username = username;
    });
  }
}