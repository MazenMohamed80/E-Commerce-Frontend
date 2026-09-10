import { IProduct } from './product.model';
export interface ILoginData {
  email: string;
  password: string;
}
export interface ILoginRes {
  message: string;
  token: unknown;
  accessToken: string;
}
export interface ITokenPayload {
  id: string;
  name: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
}
export interface ISignupData {
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
  phone: string;
  nationalId: string;
  DOB: string;
}
export interface IUserRes {
  message: string;
  data: IUser;
  error: string;
}
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  gender: 'male' | 'female';
  phone: string;
  nationalId?: string;
  DOB: string;
  isBlocked: boolean;
  addresses: IAddress[];
  prevOrders: string[];
  cart: ICart;
}
export interface IAddress {
  _id?: string;
  title: string;
  address: string;
  deliveryFee: number;
  isDefault: boolean;
}
export interface IGuestCartItem {
  productId: string;
  slug: string;
  quantity: number;
}
export interface IGuestCartViewItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imgURL: string;
  quantity: number;
  stock: number;
}
export interface ICartProduct {
  product: IProduct;
  priceAtOrder: number;
  isPriceChanged: boolean;
  quantity: number;
  _id?: string;
}
export interface ICart {
  numOfProducts: number;
  products: ICartProduct[];
  totalPrice: number;
  hasPriceChangedItems: boolean;
}
