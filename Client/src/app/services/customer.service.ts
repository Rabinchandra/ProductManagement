import { Injectable } from '@angular/core';
import { ICustomer } from '../../interface/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers: ICustomer[] = [];
  private apiUrl = 'https://localhost:7016/api/customer';
  currentCustomer: ICustomer | null = null;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    this.getAllCustomers().subscribe((result) => {
      this.customers = result;
    });
  }

  updateCurrentCustomer(id: number) {
    this.currentCustomer =
      this.customers.find((c) => c.customerId == id) || null;
  }

  getAllCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl);
  }

  addCustomer(newCustomer: ICustomer) {
    return this.http.post<ICustomer>(
      this.apiUrl,
      JSON.stringify(newCustomer),
      this.httpOptions
    );
  }

  removeCustomer(id: number) {
    this.customers = this.customers.filter((c) => c.customerId != id);
    return this.http.delete(this.apiUrl + '/' + id);
  }

  editCustomer(editedCustomer: ICustomer) {
    console.log(editedCustomer);

    const patchbody = [
      {
        path: '/firstName',
        op: 'replace',
        value: editedCustomer.firstName,
      },
      {
        path: '/lastName',
        op: 'replace',
        value: editedCustomer.lastName,
      },
      {
        path: '/email',
        op: 'replace',
        value: editedCustomer.email,
      },
    ];

    return this.http.patch(
      this.apiUrl + '/' + editedCustomer.customerId,
      JSON.stringify(patchbody),
      this.httpOptions
    );
  }
}
