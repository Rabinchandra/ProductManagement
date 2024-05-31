import { Injectable } from '@angular/core';
import { IOrder } from '../../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: IOrder[] = [
    {
      orderId: 1,
      customerId: 1,
      orderDate: new Date('2023-01-01'),
      total: 100.0,
    },
  ];
  constructor() {}

  getAllOrders() {
    return this.orders;
  }
}
