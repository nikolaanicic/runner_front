import { Item } from '../item/ItemModel';

export interface Order {
  id: number;
  address: string;
  consumer: string;
  deliverer: string;
  orderStatus: string;
  totalPrice: number;
  produce: Item[];
  comment: string;
}
