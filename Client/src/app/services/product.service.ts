import { Injectable } from '@angular/core';
import { IProduct } from '../../interface/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[] = [];

  private apiUrl = 'https://localhost:7016/api/product';

  constructor(private http: HttpClient) {
    this.getAllProducts().subscribe((result) => (this.products = result));
  }

  getAllProducts() {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  addProduct(newProduct: IProduct) {
    this.products.push(newProduct);
  }
}
