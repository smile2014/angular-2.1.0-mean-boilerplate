import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'hello-world',
  template: `
  <h1>{{message}}</h1>
  `
})
export class HelloWorld {
  message: string;
  
  constructor(public http: Http) {
    this.message = 'Hello World!';
  }
}