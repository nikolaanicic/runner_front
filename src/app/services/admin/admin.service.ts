import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserData } from '../../../models/user/UserData';
import { getAuthHeaders, parseServerErrorResponse } from '../common/commonFunc';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url: string = '/api/admins';
  constructor(private http: HttpClient) {}

  getPendingRequests() {
    return this.http
      .get<UserData[]>(this.url + '/pending', {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }

  approve(username: string) {
    return this.http
      .patch(this.url + `/approve/${username}`, null, {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }

  reject(username: string) {
    return this.http
      .patch(this.url + `/disapprove/${username}`, null, {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }
}
