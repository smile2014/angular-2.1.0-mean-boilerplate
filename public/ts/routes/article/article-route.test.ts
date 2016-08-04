import {
  addProviders,
  fakeAsync,
  TestComponentBuilder,
  inject
} from '@angular/core/testing';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

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

describe('Article Route Component', () => {
  beforeEach(() => {
    addProviders([
      ...getRouterProviders({
        rootComponent: ArticleRoute,
        routes: routes
      })
    ]);
  });

  describe('methods', () => {
    it('opens the correct article', fakeAsync(
      inject([Router, TestComponentBuilder, Location],
      (router: Router, tcb: TestComponentBuilder, location: Location) => {
        const fixture = createRootComponent(tcb, router, ArticleRoute);
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