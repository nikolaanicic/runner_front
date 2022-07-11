import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageManagerService {
  constructor() {}

  setItem(item: string, key: string) {
    localStorage.setItem(key, item);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }
}
