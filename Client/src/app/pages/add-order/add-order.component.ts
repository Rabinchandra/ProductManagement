import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent {
  order = {
    customerId: 4,
    orderDate: '2024-05-25',
    orderDetails: [
      {
        productID: 1,
        quantity: 2,
        price: 10,
      },
      {
        productID: 2,
        quantity: 1,
        price: 20,
      },
    ],
  };

  onSubmit() {
    console.log(this.order);
  }
}
