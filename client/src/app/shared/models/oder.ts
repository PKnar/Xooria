import { IAddress } from './address';
export interface IFinalOrder {
  basketId: string;
  shippingAddress: IAddress;
}
export interface IOrderProductInfo {
  productId: number;
  productName: string;
  pictureUrl: string;
}

export interface IBasketProductInfo {
  id: number;
  orderedProduct: IOrderProductInfo;
  price: number;
  quantity: number;
}

export interface IOrderedItems {
  id: number;
  customerEmail: string;
  orderDate: Date;
  shippingAddress: IAddress;
  orderItems: IBasketProductInfo[];
  subtotal: number;
}
