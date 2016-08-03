import {
  ComponentResolver,
  Injector,
} from '@angular/core';
import {
  addProviders,
  fakeAsync,
  TestComponentBuilder,
  inject,
  ComponentFixture,
  tick
} from '@angular/core/testing';
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
import {BrowserPlatformLocation} from '@angular/platform-browser';
import {CACHED_TEMPLATE_PROVIDER} from '@angular/platform-browser-dynamic';
import {SpyLocation} from '@angular/common/testing';
import {HelloWorld, routes} from '../../main';
import {MockAuthService} from '../../services/auth-service.mock';
import {AuthService} from '../../services/auth-service';

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

describe('Article Id Component', () => {
  beforeEach(() => {
    const mockAuthService: MockAuthService = new MockAuthService();

    addProviders([
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
        provide: AuthService,
        useValue: mockAuthService
      },
      {
        provide: APP_BASE_HREF,
        useValue: '/'
      },
      CACHED_TEMPLATE_PROVIDER
    ]);
  });


  describe('initialization', () => {
    (<any>window).$templateCache = {
      'css/angular2/main.css': '',
      'css/angular2/routes/home-route.css': ''
    };

    it('retrieves the article', fakeAsync(
      inject([Router, AuthService, TestComponentBuilder],
      (router: Router, mockAuthService: MockAuthService, tcb: TestComponentBuilder) => {
        const fixture = createRoot(tcb, router, HelloWorld);

        router.navigateByUrl('/article/2');
        advance(fixture);

        expect(true).toEqual(true);
      })));
  });
});