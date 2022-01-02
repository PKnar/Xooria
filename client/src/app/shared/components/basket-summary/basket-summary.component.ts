import { IBasketItem } from './../../models/basket';
import { BasketService } from './../../../basket/basket.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IBasket } from '../../models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Output() decrement: EventEmitter<IBasketItem> =
    new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> =
    new EventEmitter<IBasketItem>();
  @Output() delete: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  @Input() isInBasketComp = true;

  constructor(private basketService: BasketService) {
    this.basket$ = this.basketService.basket$;
  }

  ngOnInit(): void {}

  decrementProductQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }

  incrementProductQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  removeBasketProduct(item: IBasketItem) {
    this.delete.emit(item);
  }
}
