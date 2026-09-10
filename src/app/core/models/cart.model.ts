import { ICart } from './auth.model';
export interface ICartRes {
  message: string;
  data: ICart;
}
export interface ICartUserRes {
  message: string;
  data: { cart: ICart };
}
export interface IMergeCartItem {
  productId: string;
  quantity: number;
}
