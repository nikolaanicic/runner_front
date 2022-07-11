import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item/ItemModel';
import { BasketService } from '../services/basket/basket.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item | undefined = undefined;
  constructor(private basket: BasketService) {}

  isExpanded: boolean = false;
  ngOnInit(): void {}

  onAddClick() {
    this.basket.addItem(this?.item);
  }
}
