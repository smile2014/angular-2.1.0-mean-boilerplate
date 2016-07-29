import {Injectable, provide} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  constructor(public http: Http) {}

  getUsername(): Observable<any> {
    return this.http.get('/api/v1/user').map(res => {
      try {
        return res.json().username;
      } catch (err) {
        return undefined;
      }
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.getUsername().toPromise(Promise);
  }

  authenticate(url: string, credentials: {
    username: string,
    password: string
  }): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      url,
      JSON.stringify(credentials),
      {headers: headers}
    ).map(res => res.json());
  }

  signup(credentials: {
    username: string,
    password: string
  }): Observable<any> {
    return this.authenticate('/api/v1/signup', credentials);
  }

  login(credentials: {
    username: string,
    password: string
  }): Observable<any> {
    return this.authenticate('/api/v1/login', credentials);
  }
}

export const AUTH_PROVIDERS: any[] = [
  provide(AuthService, {useClass: AuthService})
];