import {Component} from 'angular2/core';

@Component({
  selector: 'login-page',
  template: `
  <form ngNoForm
        method="POST"
        action="/signup">
    <input name="username" type="text" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <button type="submit">Signup</button>
  </form>
  <form ngNoForm
        method="POST"
        action="/login">
    <input name="username" type="text" placeholder="username" />
    <input name="password" type="password" placeholder="password" />
    <button type="submit">Login</button>
  </form>
  `
})
export class LoginPage {}