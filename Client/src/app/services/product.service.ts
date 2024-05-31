import { Injectable } from '@angular/core';
import { IProduct } from '../../interface/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[] = [];

  constructor() {}

  getAllProducts(): IProduct[] {
    return this.getAllProducts();
  }

  addProduct(newProduct: IProduct) {
    this.products.push(newProduct);
  }
}
