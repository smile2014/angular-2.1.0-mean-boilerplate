import {
  ComponentResolver,
  Injector,
  DebugElement
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
import {ArticleRoute} from './article-route';
import {routes} from './router-config';

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

describe('Article Route Component', () => {
  beforeEach(() => {
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
            ArticleRoute, resolver, urlSerializer, outletMap,
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
      CACHED_TEMPLATE_PROVIDER
    ]);
  });

  describe('methods', () => {
    it('opens the correct article', fakeAsync(
      inject([Router, TestComponentBuilder, Location],
      (router: Router, tcb: TestComponentBuilder, location: Location) => {
        const fixture = createRoot(tcb, router, ArticleRoute);
        expect(location.path()).toEqual('/main');

        let root = fixture.componentInstance;
        root.openArticle(1);
        advance(fixture);

        let component = getRoutedComponent(fixture).componentInstance;
        expect(location.path()).toEqual('/1;param1=param1;param2=param2');
        expect(component.id).toEqual('1');

        root.openArticle(2);
        advance(fixture);

        component = getRoutedComponent(fixture).componentInstance;
        expect(location.path()).toEqual('/2;param1=param1;param2=param2');
        expect(component.id).toEqual('2');
      })));
  });
});