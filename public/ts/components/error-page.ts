import {Component} from 'angular2/core';

@Component({
  styles: [`
  h1 {
    color: #555;
    font-size: 2em;
    font-weight: 400;
  }

  p {
    margin: 0 auto;
    width: 280px;
  }

  p, h1 {
    text-align: center;
  }
  `],
  template: `
  <h1>404 - Page Not Found</h1>
  <p>Sorry, but the page you were trying to view does not exist.</p>
  `
})
export class ErrorPage {}