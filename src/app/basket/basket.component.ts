import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { BasketService } from '../services/basket/basket.service';
import { NotificationService } from '../services/notification/notification.service';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  checkoutForm = this.fb.group(this.createFormGroup());
  hasSubmitted: boolean = false;

  constructor(
    private basket: BasketService,
    private fb: UntypedFormBuilder,
    private orderService: OrderService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {}

  getItems() {
    return this.basket.getItems();
  }

  getSize() {
    return this.basket.getSize();
  }

  increaseClick(id: number | undefined) {
    this.basket.increaseItem(id);
  }

  decreaseClick(id: number | undefined) {
    this.basket.removeItem(id);
  }

  getTotalPrice() {
    return this.basket.getTotalPrice();
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.orderService
        .createOrder({
          address: this.checkoutForm.controls.address.value,
          comment: this.checkoutForm.controls.comment.value,
          productIds: this.basket.getSerializedIdList(),
        })
        .subscribe({
          next: () => {
            this.notify.showNotification('Successfully submited your order');
            this.checkoutForm.reset();
            this.basket.clear();
            this.hasSubmitted = true;
          },
          error: (error) => this.notify.showNotification(error),
        });
    }
  }

  createFormGroup() {
    return {
      address: ['', [Validators.required]],
      comment: ['', [Validators.maxLength(400)]],
    };
  }
}
