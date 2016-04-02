import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'hello-world',
  template: `
  <h1>{{message}}</h1>
  <form ngNoForm
        method="POST"
        action="/upload"
        enctype="multipart/form-data">
    <input name="name" type="text" />
    <input name="file" type="file" />
    <button type="submit">Upload</button>
  </form>
  <form ngNoForm
        method="POST"
        action="/signup">
    <input name="username" type="text" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <button type="submit">Signup</button>
  </form>
  <form ngNoForm
        method="POST"
        action="/login">
    <input name="username" type="text" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <button type="submit">Login</button>
  </form>
  <form ngNoForm
        method="GET"
        action="/logout">
    <button type="submit">Logout</button>
  </form>
  `
})
export class HelloWorld {
  message: string;

  constructor(public http: Http) {
    this.http.get('/user').subscribe((response: Response) => {
      try {
        const res = response.json();
        this.message = 'Hello ' + res.username;
      } catch (err) {
        this.message = 'Not Logged In!';
      }
    });
  }
}