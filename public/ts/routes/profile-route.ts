import {Component} from '@angular/core';
import {Greeting} from '../components/greeting';

@Component({
  directives: [Greeting],
  selector: 'profile-page',
  template: `
  <div>
    <h1>Profile page for {{username}}</h1>
    <greeting></greeting>
  </div>
  `
})
export class ProfileRoute {}