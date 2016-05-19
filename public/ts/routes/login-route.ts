import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {
  FormBuilder,
  ControlGroup,
  Validators,
  FORM_DIRECTIVES
} from 'angular2/common';
import {Router} from 'angular2/router';
import {AuthService} from '../services/auth-service';

@Component({
  directives: [FORM_DIRECTIVES],
  template: `
  <div>
    <form [ngFormModel]="signupForm"
          (ngSubmit)="signup(signupForm.value)">
      <input [ngFormControl]="signupForm.controls['username']"
             type="text"
             placeholder="username" />
      <input [ngFormControl]="signupForm.controls['password']"
             type="password"
             placeholder="password" />
      <button type="submit">Signup</button>
    </form>
    <form [ngFormModel]="loginForm"
          (ngSubmit)="login(loginForm.value)">
      <input [ngFormControl]="loginForm.controls['username']"
             type="text"
             placeholder="username" />
      <input [ngFormControl]="loginForm.controls['password']"
             type="password"
             placeholder="password" />
      <button type="submit">Login</button>
    </form>
    <h1>{{message}}</h1>
  </div>
  `
})
export class LoginRoute {
  signupForm: ControlGroup;
  loginForm: ControlGroup;
  message: string;

  constructor(
    public fb: FormBuilder,
    public http: Http,
    public router: Router,
    private authService: AuthService
  ) {
    this.signupForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
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