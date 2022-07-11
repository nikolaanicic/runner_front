import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserData } from '../../../models/user/UserData';
import {
  getAuthHeaders,
  getHeaders,
  parseServerErrorResponse,
} from '../common/commonFunc';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = '/api/users';
  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http
      .get<UserData>(this.url, { headers: getAuthHeaders() })
      .pipe(
        catchError((error) => {
          return throwError(() => parseServerErrorResponse(error));
        })
      );
  }
}
