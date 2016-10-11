import {Injectable} from '@angular/core';

@Injectable()
export class ActivateGuard {
  canActivate() {
    console.log('Activate Guard: public/ts/guards/can-activate/activate');
    return true;
  }
}