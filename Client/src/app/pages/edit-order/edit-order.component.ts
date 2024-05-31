import { Component } from '@angular/core';
import { INewOrderDTO, IOrderDetail } from '../../../interface/interfaces';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
})
export class EditOrderComponent {
  order: IOrderDetail = {
    orderDetailId: 0,
    orderId: 0,
    price: 0,
    productId: 0,
    quantity: 0,
  };

  constructor(private orderService: OrderService) {
    if (this.orderService.currentOrder) {
      this.order = this.orderService.currentOrder;
    }
  }

  onSubmit() {
    this.orderService
      .updateOrder({
        orderDetailId: this.order.orderDetailId,
        quantity: this.order.quantity,
        price: this.order.price,
      })
      .subscribe((res) => alert('Updated sucessfully'));
    alert('Updated Succesfully');
  }
}
