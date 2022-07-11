import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcceptOrderDto } from '../../models/order/AcceptOrderDto';
import { Order } from '../../models/order/OrderModel';
import { NotificationService } from '../services/notification/notification.service';
import { OrderService } from '../services/order/order.service';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() order: Order | undefined = undefined;
  @Input() mode: string = 'history';
  @Input() acceptHandler: any;

  isExpanded: boolean = false;
  constructor(
    private orderService: OrderService,
    private timerService: TimerService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onShowItemsClick() {
    this.isExpanded = !this.isExpanded;
  }

  acceptOrder(id: number) {
    this.orderService.acceptOrder(id).subscribe({
      next: (value: AcceptOrderDto) => {
        this.timerService.startTimer()(value.timer);
        this.orderService.setCurrentOrder(this.order);
        this.router.navigate(['/currentOrder'], {
          state: { orderMode: 'Viewing' },
        });
        this.acceptHandler(id);
      },
      error: (error) => this.notify.showNotification(error),
    });
  }
}
