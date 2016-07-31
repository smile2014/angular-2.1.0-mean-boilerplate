import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUsername().map(username => {
      if (username) return true;
      this.router.navigate(['/login']);
      return false;
    });
  }
}