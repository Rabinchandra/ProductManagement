import { Component } from '@angular/core';
import { IOrder } from '../../../interface/interfaces';
import { OrderService } from '../../services/order.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  constructor(private orderService: OrderService) {}

  get Orders(): IOrder[] {
    return this.orderService.getAllOrders();
  }
}
