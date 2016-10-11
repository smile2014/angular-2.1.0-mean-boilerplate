/* TODO Update Test Utils
import {provide} from '@angular/core';
import {SpyObject} from '../test/spy-object.utils';
import {AuthService} from './auth.service';

export class MockAuthService extends SpyObject {
  getUsernameSpy: any;
  loginSpy: any;
  signupSpy: any;
  fakeResponse: any;

  constructor() {
    super(AuthService);

    this.fakeResponse = null;
    this.getUsernameSpy = this.spy('getUsername').andReturn(this);
    this.loginSpy = this.spy('login').andReturn(this);
    this.signupSpy = this.spy('signup').andReturn(this);
  }

  subscribe(callback: Function) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): any[] {
    return [provide(AuthService, {useValue: this})];
  }
}*/