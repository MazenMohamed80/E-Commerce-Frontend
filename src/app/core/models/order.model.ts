import { IProduct } from './product.model';
export type OrderStatus =
  | 'pending'
  | 'in_progress'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'refund_requested'
  | 'refunded'
  | 'cancelled';
export interface IOrderItem {
  product: IProduct;
  priceAtOrder: number;
  quantity: number;
  _id?: string;
}
export interface IOrder {
  _id: string;
  user: string | { _id: string; name: string; email: string; phone: string };
  products: IOrderItem[];
  shippingAddress: string;
  deliveryFee: number;
  totalPrice: number;
  status: OrderStatus;
  orderedAt: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IOrdersRes {
  message: string;
  data: IOrder[];
}
export interface IOrderRes {
  message: string;
  data: IOrder;
}

export interface ITopPro {
  product: IProduct;
  quantity: number;
}
export interface IReport {
  from: string;
  to: string;
  revenue: number;
  ordersCount: number;
  topProducts: ITopPro[];
}
export interface IReportRes {
  message: string;
  data: IReport;
}
