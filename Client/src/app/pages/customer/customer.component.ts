import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICustomer } from '../../../interface/interfaces';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  get Customer(): ICustomer[] {
    return this.customerService.customers;
  }

  removeCustomer(id: number) {
    if (id <= 0) return;

    if (confirm('Do you want to delete?')) {
      this.customerService
        .removeCustomer(id)
        .subscribe((c) => alert('Deleted sucessfully'));
    }
  }

  onClickEdit(id: number) {
    this.customerService.updateCurrentCustomer(id);
    this.router.navigate(['/customer/edit-customer']);
  }
}
