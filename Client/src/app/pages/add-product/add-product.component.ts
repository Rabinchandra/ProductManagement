import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  product = {
    productId: 0,
    productName: '',
    productDescription: '',
    price: 0,
    stock: 0,
  };

  constructor(private productService: ProductService) {}

  onSubmit() {
    this.productService.addProduct(this.product);
  }
}
