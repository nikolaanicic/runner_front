import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenResponse } from '../../models/login/TokenResponse';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: LoginService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      this.auth
        .tryRefresh({
          expiredToken: token ?? '',
          refreshToken: localStorage.getItem('refreshToken') ?? '',
        })
        .subscribe({
          next: (value: TokenResponse) => {
            this.auth.parseValidTokenResponse(value);
            this.router.navigate([`/${route.url[0]}`]);
          },
          error: (error) => {
            localStorage.clear();
            this.router.navigate(['/login']);
          },
        });
    }

    return false;
  }
}
