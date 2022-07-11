import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export function parseServerErrorResponse(error: HttpErrorResponse) {
  if (error.status !== 504) return error.error['Message'];
  return 'Application is currently unavailable';
}

export function getHeaders(): HttpHeaders {
  return new HttpHeaders({ 'content-type': 'application/json' });
}

export function getAuthHeaders(): HttpHeaders {
  let headers = getHeaders();
  return headers.append(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  );
}

export function getAuthHeader() {
  return { Authorization: 'Bearer ' + localStorage.getItem('token') };
}

export function getToken() {
  return localStorage.getItem('token');
}

export function createImagePath(serverpath: string | undefined): string {
  return `https://localhost:44307/${serverpath}`;
}
