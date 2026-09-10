export interface IProduct {
  _id: string;
  name: string;
  desc: string;
  price: number;
  imgURL: string;
  isActive: boolean;
  isDeleted: boolean;
  season: 'summer' | 'winter';
  slug: string;
  stock: number;
  category: 'men' | 'women';
  subCategory: 'pants' | 'shirts' | 'socks' | 'hats' | 'tops' | 'bottoms';
  salesCount: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface IProductsRes {
  message: string;
  data: IProduct[];
}
export interface IProductRes {
  message: string;
  data: IProduct;
}
export interface IProductPayload {
  name: string;
  desc: string;
  price: number;
  stock: number;
  season: string;
  slug: string;
  category: string;
  subCategory: string;
  img?: File;
}
