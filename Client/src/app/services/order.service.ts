import { Injectable } from '@angular/core';
import { INewOrderDTO, IOrder, IOrderDetail } from '../../interface/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: IOrderDetail[] = [];
  currentOrder: IOrderDetail | null = null;

  private apiUrl = 'https://localhost:7016/api/Order';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    this.getAllOrderDetails().subscribe((result) => (this.orders = result));
  }

  getAllOrderDetails(): Observable<IOrderDetail[]> {
    return this.http.get<IOrderDetail[]>(this.apiUrl);
  }

  addOrder(newOrder: INewOrderDTO) {
    return this.http.post(
      this.apiUrl,
      JSON.stringify(newOrder),
      this.httpOptions
    );
  }

  removeOrder(orderId: number) {
    this.orders = this.orders.filter((o) => o.orderId != orderId);
    return this.http.delete(this.apiUrl + '/' + orderId);
  }

  updateCurrentOrder(orderDetailId: number) {
    this.currentOrder =
      this.orders.find((o) => o.orderDetailId == orderDetailId) || null;
  }

  updateOrder(updated: {
    orderDetailId: number;
    quantity: number;
    price: number;
  }) {
    const patchbody = [
      {
        path: '/quantity',
        op: 'replace',
        value: updated.quantity,
      },
    ];

    return this.http.patch(
      this.apiUrl + '/' + updated.orderDetailId,
      JSON.stringify(patchbody)
    );
  }
}
