import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SignUpDto } from '../../../models/signup/SignUpDto';
import { parseServerErrorResponse } from '../common/commonFunc';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private url: string = '/api/users/register';
  constructor(private http: HttpClient, private router: Router) {}

  register(dto: SignUpDto) {
    const form = this.createFormData(dto);
    return this.http
      .post<SignUpDto>(this.url, form)
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }

  createFormData(dto: SignUpDto) {
    const form = new FormData();

    form.append('username', dto.username);
    form.append('password', dto.password);
    form.append('name', dto.name);
    form.append('lastName', dto.lastName);
    form.append('email', dto.email);
    form.append('dateOfBirth', dto.dateOfBirth);
    form.append('image', dto.image);
    form.append('address', dto.address);
    form.append('roleName', dto.roleName);

    return form;
  }
}
