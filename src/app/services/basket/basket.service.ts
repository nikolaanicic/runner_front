import { Injectable } from '@angular/core';
import { Item } from '../../../models/item/ItemModel';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  items: Map<number, [Item | undefined, number]> = new Map();
  constructor() {}

  addItem(item: Item | undefined) {
    if (item === undefined) return;
    if (!this.items.has(item.id)) {
      this.items.set(item.id, [item, 0]);
    }
    const val = this.items.get(item.id);
    if (val === undefined) return;
    this.items.set(item.id, [item, val[1] + 1]);
  }

  increaseItem(id: number | undefined) {
    if (id === undefined) return;
    if (!this.items.has(id)) return;
    const val = this.items.get(id);
    if (val === undefined) return;
    this.items.set(id, [val[0], val[1] + 1]);
  }
  removeItem(id: number | undefined) {
    if (id === undefined) return;
    if (this.items.has(id)) {
      let val = this.items.get(id);
      if (val === undefined) return;
      this.items.set(id, [val[0], val[1] - 1]);
      if (this.items.get(id)?.[1] === 0) {
        this.items.delete(id);
      }
    }
  }

  clearItems(id: number) {
    if (this.items.has(id)) {
      this.items.delete(id);
    }
  }

  getCount(id: number) {
    return this.items.get(id);
  }

  getItems() {
    return Array.from(this.items.values());
  }
  getSize() {
    return this.items.size;
  }

  getTotalPrice() {
    var total = 0;

    for (let kvp of this.items) {
      let item = kvp[1][0];
      let times = kvp[1][1];
      if (item === undefined) continue;

      total += item.price * times;
    }

    return total;
  }

  clear() {
    this.items.clear();
  }

  getSerializedIdList() {
    var list = new Array();
    for (let kvp of this.items) {
      Array(kvp[1][1])
        .fill(kvp[0])
        .forEach((x) => list.push(x));
    }
    return list;
  }
}
