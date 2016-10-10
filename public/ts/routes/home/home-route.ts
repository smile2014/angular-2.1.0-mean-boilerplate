import {Component} from '@angular/core';

import {Greeting} from '../../components/greeting';

@Component({
  directives: [Greeting],
  styleUrls: [`css/angular2/routes/home-route.css`],
  template: `
  <div>
    <greeting></greeting>
  </div>
  `
})
export class HomeRoute {}