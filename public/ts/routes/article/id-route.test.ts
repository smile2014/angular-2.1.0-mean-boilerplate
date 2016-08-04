import {Location} from '@angular/common';
import {
  addProviders,
  fakeAsync,
  TestComponentBuilder,
  inject
} from '@angular/core/testing';
import {Router} from '@angular/router';

import {
  getRouterProviders
} from '../../test/providers';
import {
  advance,
  createRootComponent,
  getRoutedComponent
} from '../../test/utils';

import {ArticleRoute} from './article-route';
import {routes} from './router-config';


describe('Article Id Component', () => {
  beforeEach(() => {
    addProviders([
      ...getRouterProviders({
        rootComponent: ArticleRoute,
        routes: routes
      })
    ]);
  });

  describe('initialization', () => {
    it('retrieves the correct article', fakeAsync(
      inject([Router, TestComponentBuilder, Location],
      (router: Router, tcb: TestComponentBuilder, location: Location) => {
        const fixture = createRootComponent(tcb, router, ArticleRoute);
        router.navigate(['3']);
        advance(fixture);

        const component = getRoutedComponent(fixture).componentInstance;
        expect(component.id).toEqual('3');
        expect(location.path()).toEqual('/3');
      })
    ));

    it('displays the correct article in the template', fakeAsync(
      inject([Router, TestComponentBuilder],
      (router: Router, tcb: TestComponentBuilder) => {
        const fixture = createRootComponent(tcb, router, ArticleRoute);
        router.navigate(['3']);
        advance(fixture);

        const native = getRoutedComponent(fixture).nativeElement;
        expect(native.querySelector('h1').innerHTML).toEqual('This is article #3');
      })
    ));
  });
});