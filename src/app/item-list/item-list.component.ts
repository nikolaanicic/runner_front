import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item/ItemModel';
import { ItemsService } from '../services/items/items.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items: Item[] | undefined = undefined;

  constructor(
    private itemsService: ItemsService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.itemsService.getItems().subscribe({
      next: (value: Item[]) => (this.items = value),
      error: (error) => this.notify.showNotification(error),
    });
  }
}
