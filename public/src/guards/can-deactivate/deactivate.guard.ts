import {Injectable} from '@angular/core';

@Injectable()
export class DeactivateGuard {
  canDeactivate() {
    console.log('Deactivate Guard: public/ts/guards/can-deactivate/deactivate');
    return false;
  }
}