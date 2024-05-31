import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  customer = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(private customerService: CustomerService) {}

  onSubmit() {
    console.log(this.customer);
    this.customerService
      .addCustomer(this.customer)
      .pipe(
        catchError((err) => {
          alert('Error : ' + err.error.title);
          return throwError(err);
        })
      )
      .subscribe((c) => {
        alert('Added Customer!');

        this.customerService.customers.push(c);
      });
  }
}
