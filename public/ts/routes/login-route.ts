import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {AuthService} from '../services/auth-service';

@Component({
  template: `
  <div>
    <form #f="ngForm"
          (ngSubmit)="onSubmit(f.value)">
      <input type="text" id="skuInput" placeholder="SKU"
             name="sku" ngModel>
      <button type="submit">Submit</button>
    </form>
    <h1>{{message}}</h1>
  </div>
  `
})
export class LoginRoute {
  message: string;

  constructor(
    public http: Http,
    public router: Router,
    private authService: AuthService
  ) {

  }

  onSubmit(form: any): void {
    console.log(form);
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