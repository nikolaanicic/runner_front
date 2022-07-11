import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Item } from '../../../models/item/ItemModel';
import { PostItemDto } from '../../../models/item/PostItemDto';
import { getAuthHeaders, parseServerErrorResponse } from '../common/commonFunc';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private url: string = '/api/products';

  constructor(private http: HttpClient) {}

  createItem(dto: PostItemDto) {
    return this.http
      .post(this.url + '/add', JSON.stringify(dto), {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }

  getItems() {
    return this.http
      .get<Item[]>(this.url + '/all', {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }
}
