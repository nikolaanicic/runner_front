import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../../../models/login/LoginDto';
import { BehaviorSubject, catchError, of, throwError } from 'rxjs';
import { getHeaders, parseServerErrorResponse } from '../common/commonFunc';
import { TokenResponse } from '../../../models/login/TokenResponse';
import { RefreshDto } from '../../../models/login/RefreshDto';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Subject } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = '/api/auth';
  private extAuthChangeSub: BehaviorSubject<SocialUser> =
    new BehaviorSubject<SocialUser>(new SocialUser());
  private extAuthChanged = this.extAuthChangeSub.asObservable();

  constructor(private http: HttpClient, private socialAuth: SocialAuthService) {
    this.socialAuth.authState.subscribe((user) => {
      this.extAuthChangeSub.next(user);
    });
  }

  facebookLogin = () => {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  };

  googleSignOut = () => {
    this.socialAuth.signOut();
  };

  login(dto: LoginDto) {
    return this.http
      .post<TokenResponse>(this.url + '/login', JSON.stringify(dto), {
        headers: getHeaders(),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => parseServerErrorResponse(error));
        })
      );
  }

  parseValidTokenResponse(dto: TokenResponse): boolean {
    if (dto === null || dto === undefined) return false;

    localStorage.setItem('token', dto.token);
    localStorage.setItem('refreshToken', dto.refreshToken);
    localStorage.setItem('role', dto.role);
    return true;
  }

  tryRefresh(dto: RefreshDto) {
    return this.http
      .post<TokenResponse>(this.url + '/refresh', JSON.stringify(dto), {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }
  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');

    return token !== null && role !== null;
  }

  getRole() {
    return localStorage.getItem('role');
  }
}
