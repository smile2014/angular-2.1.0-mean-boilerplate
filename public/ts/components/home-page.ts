import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'home-page',
  template: `
  <h1>{{message}}</h1>
  `
})
export class HomePage {
  message: string;

  constructor(public http: Http) {
    this.http.get('/user').subscribe((response: Response) => {
      try {
        const res = response.json();
        this.message = `Hello ${res.username}!`;
      } catch (err) {
        this.message = 'Not Logged In.';
      }
    });
  }

}