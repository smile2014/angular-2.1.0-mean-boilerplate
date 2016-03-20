/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {HelloWorld} from './components/hello-world';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(HelloWorld, [HTTP_PROVIDERS]);