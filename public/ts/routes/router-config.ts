import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ErrorRoute} from './error/error-route';
import {HomeRoute} from './home/home-route';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeRoute},
  {path: '**', component: ErrorRoute}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);