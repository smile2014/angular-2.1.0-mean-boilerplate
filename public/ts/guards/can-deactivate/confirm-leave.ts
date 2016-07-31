import {Injectable} from '@angular/core';

@Injectable()
export class ConfirmLeaveGuard {
  canDeactivate() {
    if (confirm('Leave this page?')) return true;
    return false;
  }
}