import {Location} from '@angular/common';
import {
  addProviders,
  inject,
  fakeAsync,
  TestComponentBuilder,
  tick
} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {
  getFormProviders,
  getRouterProviders
} from '../../test/providers';
import {
  advance,
  createRootComponent,
  dispatchEvent,
  getRoutedComponent
} from '../../test/utils';

import {HelloWorld} from '../root';
import {routes} from '../router-config';
import {AuthService} from '../../services/auth-service';
import {MockAuthService} from '../../services/auth-service.mock';

describe('Login Form', () => {
  beforeEach(() => {
    const mockAuthService: MockAuthService = new MockAuthService();

    addProviders([
      ...getFormProviders(),
      ...getRouterProviders({
        rootComponent: HelloWorld,
        routes: routes
      }),
      {provide: AuthService, useValue: mockAuthService}
    ]);
  });

  it('tests signup form', fakeAsync(
    inject([TestComponentBuilder, Router, AuthService, Location], (
      tcb: TestComponentBuilder,
      router: Router,
      mockAuthService: MockAuthService,
      location: Location
    ) => {
      const fixture = createRootComponent(tcb, router, HelloWorld);
      router.navigate(['/login']);
      advance(fixture);

      const routed = getRoutedComponent(fixture);
      const component = routed.componentInstance;
      const native = routed.nativeElement;

      let form = fixture.debugElement.query(By.css('.signup-form'));
      let signupForm = {
        username: form.query(By.css('input[name="username"]')).nativeElement,
        password: form.query(By.css('input[name="password"]')).nativeElement
      };

      signupForm.username.value = '';
      signupForm.password.value = '';
      dispatchEvent(signupForm.username, 'input');
      dispatchEvent(signupForm.password, 'input');

      fixture.detectChanges();
      tick();

      let formGroup = component.signupForm;
      expect(formGroup.valid).toEqual(false);
      expect(formGroup.controls.username.errors.required).toEqual(true);
      expect(formGroup.controls.password.errors.required).toEqual(true);

      signupForm.username.value = 'Larry';
      dispatchEvent(signupForm.username, 'input');

      fixture.detectChanges();
      tick();

      expect(formGroup.valid).toEqual(false);
      expect(formGroup.controls.username.valid).toEqual(true);
      expect(!!formGroup.controls.username.errors).toEqual(false);
      expect(formGroup.controls.password.errors.required).toEqual(true);

      signupForm.password.value = 'password';
      dispatchEvent(signupForm.password, 'input');

      fixture.detectChanges();
      tick();

      expect(formGroup.valid).toEqual(true);
      expect(formGroup.controls.username.valid).toEqual(true);
      expect(!!formGroup.controls.username.errors).toEqual(false);
      expect(formGroup.controls.password.valid).toEqual(true);
      expect(!!formGroup.controls.password.errors).toEqual(false);

      mockAuthService.setResponse({err: 'Invalid Inputs'});
      component.signup(formGroup.value);
      advance(fixture);

      expect(native.querySelector('h1').innerHTML).toEqual('Invalid Inputs');

      mockAuthService.setResponse({err: null});
      component.signup(formGroup.value);
      mockAuthService.setResponse('Larry');
      advance(fixture);

      expect(location.path()).toEqual('/home');
    })
  ));

  it('tests login form', fakeAsync(
    inject([TestComponentBuilder, Router, AuthService, Location], (
      tcb: TestComponentBuilder,
      router: Router,
      mockAuthService: MockAuthService,
      location: Location
    ) => {
      const fixture = createRootComponent(tcb, router, HelloWorld);
      router.navigate(['/login']);
      advance(fixture);

      const routed = getRoutedComponent(fixture);
      const component = routed.componentInstance;
      const native = routed.nativeElement;

      let form = fixture.debugElement.query(By.css('.login-form'));
      let loginForm = {
        username: form.query(By.css('input[name="username"]')).nativeElement,
        password: form.query(By.css('input[name="password"]')).nativeElement
      };

      loginForm.username.value = '';
      loginForm.password.value = '';
      dispatchEvent(loginForm.username, 'input');
      dispatchEvent(loginForm.password, 'input');

      advance(fixture);

      let formGroup = component.loginForm;
      expect(formGroup.valid).toEqual(false);
      expect(formGroup.controls.username.errors.required).toEqual(true);
      expect(formGroup.controls.password.errors.required).toEqual(true);

      loginForm.username.value = 'Larry';
      dispatchEvent(loginForm.username, 'input');

      advance(fixture);

      expect(formGroup.valid).toEqual(false);
      expect(formGroup.controls.username.valid).toEqual(true);
      expect(!!formGroup.controls.username.errors).toEqual(false);
      expect(formGroup.controls.password.errors.required).toEqual(true);

      loginForm.password.value = 'password';
      dispatchEvent(loginForm.password, 'input');

      advance(fixture);

      expect(formGroup.valid).toEqual(true);
      expect(formGroup.controls.username.valid).toEqual(true);
      expect(!!formGroup.controls.username.errors).toEqual(false);
      expect(formGroup.controls.password.valid).toEqual(true);
      expect(!!formGroup.controls.password.errors).toEqual(false);

      mockAuthService.setResponse({err: 'Invalid Inputs'});
      component.login(formGroup.value);
      advance(fixture);

      expect(native.querySelector('h1').innerHTML).toEqual('Invalid Inputs');

      mockAuthService.setResponse({err: null});
      component.login(formGroup.value);
      mockAuthService.setResponse('Larry');
      advance(fixture);

      expect(location.path()).toEqual('/home');
    })
  ));
});