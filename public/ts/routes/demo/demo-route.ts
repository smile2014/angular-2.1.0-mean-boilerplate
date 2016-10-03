import {Component} from '@angular/core';
import {
  InputText,
  Breadcrumb
} from 'primeng/primeng';

@Component({
  directives: [InputText, Breadcrumb],
  template: `
  <div>This area is for demos</div>
  <input type="text" pInputText />
  <p-breadcrumb [model]="items"></p-breadcrumb>
  `
})
export class DemoRoute {
  items: any[];

  constructor() {
    this.items = [
      {label: 'Categories'},
      {label: 'Sports'},
      {label: 'Football'},
      {label: 'Countries'},
      {label: 'Spain'},
      {label: 'F.C. Barcelona'},
      {label: 'Squad'},
      {label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'},
    ];
  }
}