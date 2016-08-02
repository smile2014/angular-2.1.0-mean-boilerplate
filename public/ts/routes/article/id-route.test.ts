import {ComponentResolver, Injector} from '@angular/core';
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
  PlatformLocation
} from '@angular/common';
import {BrowserPlatformLocation} from '@angular/platform-browser';
import {SpyLocation} from '@angular/common/testing';
import {MockAuthService} from '../../services/auth-service.mock';
import {HelloWorld, routes} from '../../main';

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

function createRoot(tcb: TestComponentBuilder,
                           router: Router,
                           type: any): ComponentFixture<any> {
  const f = tcb.createFakeAsync(type);
  advance(f);
  (<any>router).initialNavigation();
  advance(f);
  return f;
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
      mockAuthService.getProviders()
    ]);
  });

  describe('initialization', () => {
    it('retrieves the article', fakeAsync(
      inject([Router, MockAuthService, TestComponentBuilder],
      (router: Router, mockAuthService: MockAuthService, tcb: TestComponentBuilder) => {
        const fixture = createRoot(tcb, router, HelloWorld);

        router.navigateByUrl('/article/2');
        advance(fixture);

        expect(true).toEqual(true);
      })));
  });
});