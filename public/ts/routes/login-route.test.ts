import {
  ComponentResolver,
  Injector,
  DebugElement,
} from '@angular/core';
import {
  inject,
  fakeAsync,
  TestComponentBuilder,
  ComponentFixture,
  tick
} from '@angular/core/testing';
import {addProviders} from '@angular/core/testing';
import {
  disableDeprecatedForms,
  provideForms,
  FormBuilder
} from '@angular/forms';
import {
  ActivatedRoute,
  DefaultUrlSerializer,
  RouterOutletMap,
  UrlSerializer,
  Router
} from '@angular/router';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation,
  APP_BASE_HREF
} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {BrowserPlatformLocation, By} from '@angular/platform-browser';
import {HelloWorld, routes} from '../hello-world';
import {CACHED_TEMPLATE_PROVIDER} from '@angular/platform-browser-dynamic';
import {AuthService} from '../services/auth-service';
import {MockAuthService} from '../services/auth-service.mock';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';


export function dispatchEvent(element: any, eventType: any) {
 getDOM().dispatchEvent(element, getDOM().createEvent(eventType));
}

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

function createRoot(
  tcb: TestComponentBuilder,
  router: Router,
  type: any
): ComponentFixture<any> {
  const fixture = tcb.createFakeAsync(type);
  advance(fixture);
  (<any>router).initialNavigation();
  advance(fixture);
  return fixture;
}

function getRoutedComponent(fixture: ComponentFixture<any>) {
  let found: DebugElement;

  // search child elements in the component's template, the element
  // immediately after <router-outlet> will be the routed component
  function searchChildren(debugElement: DebugElement) {
    if (found) return;

    const children = debugElement.children;
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      if (child.name === 'router-outlet') {
        found = children[i + 1];
        break;
      }
      // if a child is not a component, search its children for <router-outlet>
      if (!child.componentInstance) {
        searchChildren(child);
      }
    }
  }

  searchChildren(fixture.debugElement);
  return found;
}

describe('Login Form', () => {
  beforeEach(() => {
    const mockAuthService: MockAuthService = new MockAuthService();

    addProviders([
      disableDeprecatedForms(),
      provideForms(),
      FormBuilder,
      RouterOutletMap,
      {provide: UrlSerializer, useClass: DefaultUrlSerializer},
      {provide: Location, useClass: SpyLocation},
      {provide: LocationStrategy, useClass: PathLocationStrategy},
      {provide: PlatformLocation, useClass: BrowserPlatformLocation},
      {
        provide: Router,
        useFactory: (
          resolver: ComponentResolver,
          urlSerializer: UrlSerializer,
          outletMap: RouterOutletMap,
          location: Location,
          injector: Injector
        ) => {
          return new Router(
            HelloWorld, resolver, urlSerializer, outletMap,
            location, injector, routes
          );
        },
        deps: [
          ComponentResolver,
          UrlSerializer,
          RouterOutletMap,
          Location,
          Injector
        ]
      },
      {
        provide: ActivatedRoute,
        useFactory: (r: Router) => {
          return r.routerState.root;
        },
        deps: [Router]
      },
      {
        provide: APP_BASE_HREF,
        useValue: '/'
      },
      CACHED_TEMPLATE_PROVIDER,
      {
        provide: AuthService,
        useValue: mockAuthService
      }
    ]);
  });

  it('tests signup form', fakeAsync(
    inject([TestComponentBuilder, Router, AuthService, Location], (
      tcb: TestComponentBuilder,
      router: Router,
      mockAuthService: MockAuthService,
      location: Location
    ) => {
      const fixture = createRoot(tcb, router, HelloWorld);
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
    })
  ));

  it('tests login form', fakeAsync(
    inject([TestComponentBuilder, Router, AuthService, Location], (
      tcb: TestComponentBuilder,
      router: Router,
      mockAuthService: MockAuthService,
      location: Location
    ) => {
      const fixture = createRoot(tcb, router, HelloWorld);
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

      fixture.detectChanges();
      tick();

      let formGroup = component.loginForm;
      expect(formGroup.valid).toEqual(false);
      expect(formGroup.controls.username.errors.required).toEqual(true);
      expect(formGroup.controls.password.errors.required).toEqual(true);

      loginForm.username.value = 'Larry';
      dispatchEvent(loginForm.username, 'input');

      fixture.detectChanges();
      tick();

      expect(formGroup.valid).toEqual(false);
      expect(formGroup.controls.username.valid).toEqual(true);
      expect(!!formGroup.controls.username.errors).toEqual(false);
      expect(formGroup.controls.password.errors.required).toEqual(true);

      loginForm.password.value = 'password';
      dispatchEvent(loginForm.password, 'input');

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
    })
  ));
});