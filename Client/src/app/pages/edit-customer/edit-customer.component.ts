import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
})
export class EditCustomerComponent {
  customer = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(private customerService: CustomerService) {
    if (this.customerService.currentCustomer) {
      this.customer = this.customerService.currentCustomer;
    }
  }

  onSubmit() {
    this.customerService
      .editCustomer(this.customer)
      .subscribe(() => alert('Updated Sucessfully'));
  }
}
