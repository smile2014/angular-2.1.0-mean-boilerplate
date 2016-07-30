import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router-deprecated';
import {AuthService} from '../services/auth-service';

@Component({
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES
  ],
  template: `
  <div>
    <form [formGroup]="signupForm"
          (ngSubmit)="signup(signupForm.value)">
      <input type="text"
             placeholder="username"
             [formControl]="signupForm.controls['username']">
      <input type="password"
             placeholder="password"
             [formControl]="signupForm.controls['password']">
      <button type="submit">Sign Up</button>
    </form>
    <form [formGroup]="loginForm"
          (ngSubmit)="login(loginForm.value)">
      <input type="text"
             placeholder="username"
             [formControl]="loginForm.controls['username']">
      <input type="password"
             placeholder="password"
             [formControl]="loginForm.controls['password']">
      <button type="submit">Log In</button>
    </form>
    <h1>{{message}}</h1>
  </div>
  `
})
export class LoginRoute {
  message: string;
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public http: Http,
    public router: Router,
    private authService: AuthService
  ) {
    this.signupForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup(credentials: any): void {
    this.authService.signup(credentials).subscribe(res => {
      if (res.err) {
        this.message = res.err;
      } else {
        this.router.navigate(['/Home']);
      }
    });
  }

  login(credentials: any): void {
    this.authService.login(credentials).subscribe(res => {
      if (res.err) {
        this.message = res.err;
      } else {
        this.router.navigate(['/Home']);
      }
    });
  }
}