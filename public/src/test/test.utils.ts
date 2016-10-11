/* TODO Update test utils
import {
  DebugElement
} from '@angular/core';
import {
  ComponentFixture,
  TestComponentBuilder,
  tick
} from '@angular/core/testing';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {Router} from '@angular/router';

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

export function createRootComponent(
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

export function dispatchEvent(element: any, eventType: any) {
 getDOM().dispatchEvent(element, getDOM().createEvent(eventType));
}

export function getRoutedComponent(fixture: ComponentFixture<any>) {
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
}*/