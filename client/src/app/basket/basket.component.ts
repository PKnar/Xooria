import { BasketService } from './basket.service';
import { IBasket, IBasketItem } from './../shared/models/basket';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketProduct(product: IBasketItem) {
    console.log('remove');
    this.basketService.removeItemFromBasket(product);
  }

  incrementProductQuantity(product: IBasketItem) {
    console.log('increment');
    this.basketService.incrementProductQuantity(product);
  }

  decrementProductQuantity(product: IBasketItem) {
    console.log('decrement');
    this.basketService.decrementProductQuantity(product);
  }
}
