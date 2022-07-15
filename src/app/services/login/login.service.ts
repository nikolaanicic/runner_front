import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../../../models/login/LoginDto';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { getHeaders, parseServerErrorResponse } from '../common/commonFunc';
import { TokenResponse } from '../../../models/login/TokenResponse';
import { RefreshDto } from '../../../models/login/RefreshDto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = '/api/auth';

  private userSubject = new ReplaySubject<gapi.auth2.GoogleUser | null>(1);

  constructor(private http: HttpClient) {}

  googleLogin(token: string) {
    return this.http
      .post<TokenResponse>(
        this.url + '/googleLogin',
        JSON.stringify({ idToken: token }),
        { headers: getHeaders() }
      )
      .pipe(
        catchError((err) => throwError(() => parseServerErrorResponse(err)))
      );
  }

  observable() {
    return this.userSubject.asObservable();
  }

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
