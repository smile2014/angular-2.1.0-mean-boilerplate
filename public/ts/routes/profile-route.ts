import {Component, OnInit, ReflectiveInjector as Injector} from '@angular/core';
import {CanActivate} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {AuthService} from '../services/auth-service';

const auth: AuthService = Injector.resolveAndCreate([
  HTTP_PROVIDERS,
  AuthService
]).get(AuthService);

@Component({
  selector: 'profile-page',
  template: `
  <div>
    <h1>Profile page for {{username}}</h1>
  </div>
  `
})
@CanActivate((next, prev) => auth.isLoggedIn())
export class ProfileRoute implements OnInit {
  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      this.username = username;
    });
  }
}