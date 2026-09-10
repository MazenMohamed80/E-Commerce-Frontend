import { ICart } from './auth.model';
export interface IUserSummary {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone: string;
  isBlocked: boolean;
  cart?: ICart;
  prevOrders?: unknown[];
  addresses?: Array<{
    _id?: string;
    title: string;
    address: string;
    deliveryFee: number;
    isDefault?: boolean;
  }>;
}
export interface IUsersRes {
  message: string;
  data: IUserSummary[];
}
export interface IBlockRes {
  message: string;
  isBlocked: boolean;
}
export interface IAddressRes {
  message: string;
  data: { addresses: unknown[] } & Record<string, unknown>;
}
export interface IAddressUpdateRes {
  message: string;
  data: { title: string; address: string; deliveryFee?: number; isDefault?: boolean };
}
