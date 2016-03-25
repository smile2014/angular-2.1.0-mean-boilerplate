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
    <button type="submit">Submit</button>
  </form>
  `
})
export class HelloWorld {
  message: string;

  constructor(public http: Http) {
    this.message = 'Hello World!';
  }
}