export interface IOrder {
  orderId: number;
  customerId: number | null;
  orderDate: Date | null;
  total: number | null;
  customer?: ICustomer | null;
  orderDetails?: IOrderDetail[];
}

export interface IOrderDetail {
  orderDetailId: number;
  orderId: number | null;
  productId: number | null;
  quantity: number;
  price: number;
  order?: IOrder | null;
  product?: IProduct | null;
}

export interface IProduct {
  productId: number;
  productName: string;
  productDescription?: string | null;
  price: number;
  stock?: number | null;
  orderDetails?: IOrderDetail[];
}

export interface ICustomer {
  customerId?: number;
  firstName: string;
  lastName: string;
  email: string;
  orders?: IOrder[];
}
