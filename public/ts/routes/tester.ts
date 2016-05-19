import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'tester',
  inputs: ['data'],
  outputs: ['dataChange'],
  template: `
  <div>{{data}}</div>
  <input [ngModel]="data" (ngModelChange)="emitChange($event)" />
  `
})
export class Tester {
  dataChange: EventEmitter<string> = new EventEmitter<string>();
  data: string;

  emitChange(data: string) {
    console.log(data);
    this.data = data;
    this.dataChange.emit(data);
  }
}