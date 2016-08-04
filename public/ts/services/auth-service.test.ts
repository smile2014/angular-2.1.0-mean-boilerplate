import {
  addProviders,
  fakeAsync,
  inject,
  tick
} from '@angular/core/testing';
import {provide} from '@angular/core';
import {
  Http,
  BaseRequestOptions,
  ConnectionBackend,
  Response,
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {AuthService} from './auth-service';

describe('AuthService', () => {
  let result: any;

  beforeEach(() => {
    addProviders([
      AuthService,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (
          backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions
        ) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
      })
    ]);
  });

  it('gets current username', fakeAsync(inject([AuthService, MockBackend],
    (authService: AuthService, mockBackend: MockBackend) => {
      const sampleUsername = 'Larry';

      mockBackend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toEqual('/api/v1/user');
        expect(conn.request.method).toEqual(RequestMethod.Get);
        conn.mockRespond(new Response(new ResponseOptions({
          body: {username: sampleUsername}
        })));
      });

      authService.getUsername().subscribe(username => {
        result = username;
      });

      tick();
      expect(result).toEqual(sampleUsername);
    }
  )));

  it('can sign up new users', fakeAsync(inject([AuthService, MockBackend],
    (authService: AuthService, mockBackend: MockBackend) => {
      let signedUp = false;
      let errorMsg = 'That user already exists.';

      mockBackend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toEqual('/api/v1/signup');
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.headers.get('Content-Type')).toEqual('application/json');

        let responseOptions: any = {body: {err: null}};
        if (signedUp) responseOptions = {
          body: {err: errorMsg}
        };
        conn.mockRespond(new Response(new ResponseOptions(responseOptions)));
      });

      authService.signup({
        username: 'user',
        password: 'pass'
      }).subscribe(res => {
        result = res;
        signedUp = true;
      });

      tick();
      expect(result.err).toEqual(null);

      authService.signup({
        username: 'user',
        password: 'pass'
      }).subscribe(res => {
        result = res;
      });

      tick();
      expect(result.err).toEqual(errorMsg);
    }
  )));

  it('logs in', fakeAsync(inject([AuthService, MockBackend],
    (authService: AuthService, mockBackend: MockBackend) => {
      let correctUsername = 'user';
      let correctPassword = 'pass';
      let errorMsg = 'Invalid username or password';

      mockBackend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toEqual('/api/v1/login');
        expect(conn.request.method).toEqual(RequestMethod.Post);
        expect(conn.request.headers.get('Content-Type')).toEqual('application/json');

        let responseOptions: any = {body: {err: null}};
        const body = JSON.parse(conn.request.getBody());
        if (body.username !== correctUsername || body.password !== correctPassword) {
          responseOptions = {body: {err: errorMsg}};
        }
        conn.mockRespond(new Response(new ResponseOptions(responseOptions)));
      });

      authService.login({
        username: correctUsername,
        password: correctPassword
      }).subscribe(res => {
        result = res;
      });

      tick();
      expect(result.err).toEqual(null);

      authService.login({
        username: 'wrongUser',
        password: correctPassword
      }).subscribe(res => {
        result = res;
      });

      tick();
      expect(result.err).toEqual(errorMsg);

      authService.login({
        username: correctUsername,
        password: 'wrongPass'
      }).subscribe(res => {
        result = res;
      });

      tick();
      expect(result.err).toEqual(errorMsg);
    }
  )));
});