import {Component} from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES
  ],
  template: `
  <div>
    <form [formGroup]="signupForm"
          (ngSubmit)="signup(signupForm.value)"
          class="signup-form">
      <input type="text"
             name="username"
             placeholder="username"
             [formControl]="signupForm.controls['username']">
      <input type="password"
             placeholder="password"
             name="password"
             [formControl]="signupForm.controls['password']">
      <button type="submit">Sign Up</button>
    </form>
    <form [formGroup]="loginForm"
          (ngSubmit)="login(loginForm.value)"
          class="login-form">
      <input type="text"
             name="username"
             placeholder="username"
             [formControl]="loginForm.controls['username']">
      <input type="password"
             name="password"
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
        this.router.navigate(['/home']);
      }
    });
  }

  login(credentials: any): void {
    this.authService.login(credentials).subscribe(res => {
      if (res.err) {
        this.message = res.err;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}