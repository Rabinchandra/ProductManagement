import { Component } from '@angular/core';
import { IProduct } from '../../../interface/interfaces';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  // products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  get Products(): IProduct[] {
    return this.productService.products;
  }
}
