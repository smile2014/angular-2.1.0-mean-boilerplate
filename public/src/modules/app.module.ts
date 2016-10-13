import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

// routes
import {ErrorRoute} from '../routes/error/error.route';
import {HomeRoute} from '../routes/home/home.route';
import {FormsRoute} from '../routes/forms/forms.route';

// components
import {GreetingComponent} from '../components/greeting.comp';
import {Navbar} from '../components/navbar.comp';
import {RootComponent} from '../routes/root.comp';

// guards
import {ActivateGuard} from '../guards/can-activate/activate.guard';
import {DeactivateGuard} from '../guards/can-deactivate/deactivate.guard';

// config
import {routes} from '../config/router.config';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    // routes
    ErrorRoute,
    FormsRoute,
    HomeRoute,

    // components
    GreetingComponent,
    Navbar,
    RootComponent
  ],
  providers: [
    ActivateGuard,
    DeactivateGuard
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}