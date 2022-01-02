import { IBasketTotal } from './../shared/models/basket';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basket = new BehaviorSubject<IBasket>(null);
  private basketTotal = new BehaviorSubject<IBasketTotal>(null);
  basket$ = this.basket.asObservable();
  basketTotal$ = this.basketTotal.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get(`${this.baseUrl}basket?id=${id}`).pipe(
      map((basket: IBasket) => {
        this.basket.next(basket);
        this.calcTotal();
      })
    );
  }

  setBasket(newBasket: IBasket) {
    return this.http.post(`${this.baseUrl}basket`, newBasket).subscribe(
      (res: IBasket) => {
        this.basket.next(res);
        this.calcTotal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basket.value;
  }

  addProduct(product: IProduct, quantity = 1) {
    const addedProduct: IBasketItem = this.mapProductToBasket(
      product,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.updateOrAddProduct(
      basket.items,
      addedProduct,
      quantity
    );

    this.setBasket(basket);
  }

  private updateOrAddProduct(
    items: IBasketItem[],
    addedProduct: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    //check if product exist before adding
    console.log(items);
    const index = items.findIndex((i) => i.id === addedProduct.id);

    if (index === -1) {
      addedProduct.quantity = quantity;
      items.push(addedProduct);
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToBasket(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      pictureUrl: product.pictureUrl,
      quantity,
      brand: product.productBrand,
      type: product.productType,
    };
  }

  private calcTotal() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + shipping;
    this.basketTotal.next({ shipping, total, subtotal });
  }

  incrementProductQuantity(product: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === product.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }
  decrementProductQuantity(product: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === product.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(product);
    }
  }
  removeItemFromBasket(product: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some((x) => x.id === product.id)) {
      basket.items = basket.items.filter((item) => item.id !== product.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(currentBasket: IBasket) {
    return this.http
      .delete(`${this.baseUrl}basket?id=${currentBasket.id}`)
      .subscribe(
        (res) => {
          this.basket.next(null);
          this.basketTotal.next(null);
          localStorage.removeItem('basket_id');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteLocalBasket(id: string) {
    this.basket.next(null);
    this.basketTotal.next(null);
    localStorage.removeItem('basket_id');
  }
}
