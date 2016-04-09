import {Injectable, Injector, provide} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(public http: Http) {}

  getUsername(): Observable<any> {
    return this.http.get('/user').map(res => {
      try {
        return res.json().username;
      } catch (err) {
        return undefined;
      }
    });
  }

  isLoggedIn(): Promise<boolean> {
    const authService = Injector.resolveAndCreate([
      HTTP_PROVIDERS,
      AuthService
    ]).get(AuthService);
    return authService.getUsername().toPromise(Promise);
  }
}

export const AUTH_PROVIDERS: any[] = [
  provide(AuthService, {useClass: AuthService})
];