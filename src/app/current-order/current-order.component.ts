import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order/OrderModel';
import { LoginService } from '../services/login/login.service';
import { NotificationService } from '../services/notification/notification.service';
import { OrderService } from '../services/order/order.service';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css'],
})
export class CurrentOrderComponent implements OnInit {
  constructor(
    private auth: LoginService,
    private orderService: OrderService,
    private timer: TimerService,
    private notify: NotificationService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  mode: string = 'Consumer';
  orderMode: string = 'Ordering';
  @Input() order: Order | undefined = undefined;
  ngOnInit(): void {
    this.init();
  }

  private delivererInit() {
    this.order = this.orderService.orderSubject.value;
  }

  private consumerInit() {
    let order = this.orderService.orderSubject.value;
    if (order === undefined) this.orderMode = 'Ordering';
    else {
      this.order = order;
      this.orderMode = 'Viewing';
    }
  }

  private init() {
    this.mode = this.auth.getRole() ?? '';
    switch (this.mode) {
      case 'Deliverer':
        this.delivererInit();
        break;
      case 'Consumer':
        this.consumerInit();
        break;
    }

    console.log(this.order);
  }

  delvierOrderClicked() {
    this.orderService.completeCurrentOrder()?.subscribe({
      next: () => {
        this.timer.clear();
        this.notify.showNotification(
          'You have successfully completed the order'
        );
        this.router.navigate(['/pendingOrders']);
      },
      error: (error) => this.notify.showNotification(error),
    });
  }

  getRemainingTime() {
    return this.timer.getTimeLeft();
  }
}
