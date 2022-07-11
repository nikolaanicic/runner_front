import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { UserData } from '../../../models/user/UserData';
import {
  getAuthHeader,
  getAuthHeaders,
  parseServerErrorResponse,
} from '../common/commonFunc';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  private url: string = '/api/users/update';
  private imageUpdateUrl: string = '/api/users/image';

  constructor(private http: HttpClient) {}

  private generateFieldPatch(field: string, value: string, op: string) {
    return { op: op, path: '/' + field, value: value };
  }

  private generateJsonPatch(
    fieldNames: string[],
    fieldValues: string[],
    ops: string[]
  ) {
    var arr: Object[] = new Array();

    for (let i = 0; i < ops.length; i++) {
      arr.push(this.generateFieldPatch(fieldNames[i], fieldValues[i], ops[i]));
    }

    return arr;
  }

  private filterChanges(form: FormGroup, user: UserData | null) {
    let fieldnames: string[] = new Array();
    let values = new Array();
    let ops: string[] = new Array();

    if (form.controls.name.value !== user?.name) {
      fieldnames.push('name');
      values.push(form.controls.name.value);
      ops.push('replace');
      user!.name = form.controls.name.value;
    }

    if (form.controls.lastName.value !== user?.lastName) {
      fieldnames.push('lastName');
      values.push(form.controls.lastName.value);
      ops.push('replace');
      user!.lastName = form.controls.lastName.value;
    }

    if (form.controls.email.value !== user?.email) {
      fieldnames.push('email');
      values.push(form.controls.email.value);
      ops.push('replace');
      user!.email = form.controls.email.value;
    }

    let d = new Date(form.controls.dateOfBirth.value);
    if (d.toISOString() !== user?.dateOfBirth.toISOString()) {
      fieldnames.push('dateOfBirth');
      values.push(d);
      ops.push('replace');
      user!.dateOfBirth = d;
    }

    if (form.controls.address.value !== user?.address) {
      fieldnames.push('address');
      values.push(form.controls.address.value);
      ops.push('replace');
      user!.address = form.controls.address.value;
    }

    return { names: fieldnames, values: values, ops: ops };
  }

  updateUser(form: FormGroup, user: UserData | null) {
    let vals = this.filterChanges(form, user);
    let patch = this.generateJsonPatch(vals.names, vals.values, vals.ops);

    if (patch.length != 0)
      return this.http
        .patch<Object>(this.url, JSON.stringify(patch), {
          headers: getAuthHeaders(),
        })
        .pipe(
          catchError((error) => {
            return throwError(() => parseServerErrorResponse(error));
          })
        );
    return null;
  }

  updateImage(image: File | null) {
    if (image === null) return null;

    let form = new FormData();
    form.append('image', image);

    return this.http
      .post<Object>(this.imageUpdateUrl, form, {
        headers: getAuthHeader(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }
}
