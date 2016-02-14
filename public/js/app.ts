import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'hello-world',
  template: `
  <h1>{{message}}</h1>
  `
})
class HelloWorld {
  message: string;
  
  constructor() {
    this.message = 'Hello World!';
  }
}

bootstrap(HelloWorld);