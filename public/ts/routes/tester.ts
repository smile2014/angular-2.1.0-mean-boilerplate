import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'tester',
  template: `
  <div>{{data}}</div>
  <input [ngModel]="data" (ngModelChange)="emitChange($event)" />
  `
})
export class Tester {
  @Input() data: string;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();

  emitChange(data: string) {
    this.data = data;
    this.dataChange.emit(data);
  }
}