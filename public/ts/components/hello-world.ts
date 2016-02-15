import {Component} from 'angular2/core';

@Component({
  selector: 'hello-world',
  template: `
  <h1>{{message}}</h1>
  `
})
export class HelloWorld {
  message: string;
  
  constructor() {
    this.message = 'Hello World!';
  }
}