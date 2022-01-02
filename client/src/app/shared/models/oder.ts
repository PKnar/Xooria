import { IAddress } from './address';
export interface IFinalOrder {
  basketId: string;
  shippingAddress: IAddress;
}
export interface IOrderProductInfo {
  productItemId: number;
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
  shipingAddress: IAddress;
  orderItems: IBasketProductInfo[];
  subtotal: number;
  orderStatus: number;
  paymentIntenId: string;
}
