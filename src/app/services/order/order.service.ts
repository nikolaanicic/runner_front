import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { AcceptOrderDto } from '../../../models/order/AcceptOrderDto';
import { DeliverOrderDto } from '../../../models/order/DeliverOrderDto';
import { NewOrderDto } from '../../../models/order/NewOrderDto';
import { Order } from '../../../models/order/OrderModel';
import {
  getAuthHeaders,
  getToken,
  parseServerErrorResponse,
} from '../common/commonFunc';
import * as signalR from '@microsoft/signalr';
import { TimerService } from '../timer/timer.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url: string = '/api/orders';
  orderSubject: BehaviorSubject<Order | undefined> = new BehaviorSubject<
    Order | undefined
  >(undefined);

  private hubConnection: signalR.HubConnection | undefined = undefined;

  initConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44307/order', {
        accessTokenFactory: () => getToken() ?? '',
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((err) => console.log(err));
  }

  constructor(
    private http: HttpClient,
    private timer: TimerService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public addTimerPushDataListener = () => {
    if (this.hubConnection === undefined) return;
    this.hubConnection.on('pushTimer', (data) => {
      if (data) {
        this.timer.startTimer()(data.timer);
        this.setCurrentOrder(data.data);
        this.router.navigate(['/currentOrder']);
      }
    });
  };

  getAll() {
    return this.baseGet('all');
  }

  getHistory() {
    return this.baseGet('completed');
  }

  getActiveOrders() {
    return this.baseGet('active');
  }

  acceptOrder(id: number) {
    return this.http
      .patch<AcceptOrderDto>(this.url + `/accept/${id}`, null, {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }

  completeCurrentOrder() {
    if (this.orderSubject.value === undefined) return;
    let dto: DeliverOrderDto = { deliveryId: this.orderSubject.value.id };
    return this.http
      .post(this.url + '/deliver', JSON.stringify(dto), {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }

  setCurrentOrder = (order: Order | undefined) => {
    if (order) {
      this.orderSubject.next(order);
    }
  };

  createOrder(dto: NewOrderDto) {
    return this.http
      .post(this.url + '/create', JSON.stringify(dto), {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }

  private baseGet(path: string) {
    return this.http
      .get<Order[]>(this.url + `/${path}`, {
        headers: getAuthHeaders(),
      })
      .pipe(
        catchError((error) => throwError(() => parseServerErrorResponse(error)))
      );
  }
}
