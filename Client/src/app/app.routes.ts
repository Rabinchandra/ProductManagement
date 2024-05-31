import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { OrderComponent } from './pages/order/order.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';

export const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'product/add-product',
    component: AddProductComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order/add-order',
    component: AddOrderComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'customer/add-customer',
    component: AddCustomerComponent,
  },
  {
    path: 'customer/edit-customer',
    component: EditCustomerComponent,
  },
  {
    path: 'order/edit-order',
    component: EditOrderComponent,
  },
];
