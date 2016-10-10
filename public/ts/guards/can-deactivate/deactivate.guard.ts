import {Injectable} from '@angular/core';

@Injectable()
export class DeactivateGuard {
  canDeactivate() {
    console.log()
    return false;
  }
}