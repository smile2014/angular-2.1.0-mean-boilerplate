/* TODO Update Test Utils
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation,
  APP_BASE_HREF
} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {
  ComponentResolver,
  Injector,
  NgModuleFactoryLoader
} from '@angular/core';
import {
  disableDeprecatedForms,
  FormBuilder,
  provideForms
} from '@angular/forms';
import {
  BrowserPlatformLocation
} from '@angular/platform-browser';
import {CACHED_TEMPLATE_PROVIDER} from '@angular/platform-browser-dynamic';
import {
  ActivatedRoute,
  DefaultUrlSerializer,
  Router,
  Routes,
  RouterOutletMap,
  UrlSerializer
} from '@angular/router';

export function getFormProviders(): any[] {
  return [
    disableDeprecatedForms(),
    provideForms(),
    FormBuilder
  ];
}

export function getRouterProviders(config: {
  rootComponent: any,
  routes: Routes
}): any[] {
  return [
    RouterOutletMap,
    {provide: UrlSerializer, useClass: DefaultUrlSerializer},
    {provide: Location, useClass: SpyLocation},
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: PlatformLocation, useClass: BrowserPlatformLocation},
    {
      provide: Router,
      deps: [
        ComponentResolver,
        UrlSerializer,
        RouterOutletMap,
        Location,
        NgModuleFactoryLoader,
        Injector
      ],
      useFactory: (
        resolver: ComponentResolver,
        urlSerializer: UrlSerializer,
        outletMap: RouterOutletMap,
        location: Location,
        loader: NgModuleFactoryLoader,
        injector: Injector
      ) => {
        return new Router(
          config.rootComponent, resolver, urlSerializer, outletMap,
          location, injector, loader, config.routes
        );
      }
    },
    {
      provide: ActivatedRoute,
      deps: [Router],
      useFactory: (r: Router) => {
        return r.routerState.root;
      }
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    CACHED_TEMPLATE_PROVIDER
  ];
}*/