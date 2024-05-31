import { Component } from '@angular/core';
import { IOrder, IOrderDetail } from '../../../interface/interfaces';
import { OrderService } from '../../services/order.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  constructor(private orderService: OrderService, private router: Router) {}

  get Orders(): IOrderDetail[] {
    console.log(this.orderService.orders);
    return this.orderService.orders;
  }

  removeOrder(orderId: number) {
    if (confirm('Are you sure you wanna delete?')) {
      this.orderService
        .removeOrder(orderId)
        .subscribe((c) => alert('Order Deleted'));
    }
  }

  updateOrder(orderId: number) {
    this.orderService.updateCurrentOrder(orderId);
    this.router.navigate(['/order/edit-order']);
  }
}
