import {Routes} from '@angular/router';

import {ErrorRoute} from '../routes/error/error.route';
import {HomeRoute} from '../routes/home/home.route';
import {ActivateGuard} from '../guards/can-activate/activate.guard';
import {DeactivateGuard} from '../guards/can-deactivate/deactivate.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeRoute,
    canActivate: [ActivateGuard],
    canDeactivate: [DeactivateGuard]
  },
  {path: '**', component: ErrorRoute}
];