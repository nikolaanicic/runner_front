import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order/OrderModel';
import { StorageManagerService } from '../services/local/storage-manager.service';
import { OrderService } from '../services/order/order.service';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] | undefined = undefined;
  mode: string = 'history';

  constructor(
    private router: Router,
    private ordersService: OrderService,
    private timerService: TimerService
  ) {}

  acceptOrderHandler() {
    return (id: number) => {
      this.orders = this.orders?.filter((x) => x.id !== id);
    };
  }

  ngOnInit(): void {
    this.init();
  }

  handleHistoryModeInit() {
    this.ordersService.getHistory().subscribe({
      next: (values: Order[]) => {
        if (this.orders === undefined) this.orders = values;
      },
    });
  }

  handleAllModeInit() {
    this.ordersService.getAll().subscribe({
      next: (values: Order[]) => {
        this.orders = values;
      },
    });
  }

  handlePendingModeInit() {
    this.ordersService.getActiveOrders().subscribe({
      next: (values: Order[]) => {
        this.orders = values;
      },
    });
  }

  init() {
    this.mode = this.router.url;
    switch (this.mode) {
      case '/history':
        this.handleHistoryModeInit();
        break;
      case '/pendingOrders':
        this.handlePendingModeInit();
        break;
      case '/allOrders':
        this.handleAllModeInit();
        break;
    }
  }
}
