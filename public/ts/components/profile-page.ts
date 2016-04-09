import {Component, Injector} from 'angular2/core';
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
export class ProfilePage {
  username: string;

  constructor(private authService: AuthService) {
    authService.getUsername().subscribe(username => {
      this.username = username;
    });
  }
}