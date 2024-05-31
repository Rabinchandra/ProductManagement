import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { INewOrderDTO } from '../../../interface/interfaces';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent {
  order: INewOrderDTO = {
    customerId: 4,
    orderDate: '2024-05-20',
    orderDetails: [
      {
        productId: 1,
        price: 20,
        quantity: 2,
      },
      {
        productId: 2,
        price: 20,
        quantity: 2,
      },
    ],
  };

  constructor(private orderService: OrderService) {}

  onSubmit() {
    this.orderService
      .addOrder(this.order)
      .subscribe((result) => alert('Added!'));
  }
}
