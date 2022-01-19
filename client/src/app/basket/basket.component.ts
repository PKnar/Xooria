import { AccountService } from './../account/account-service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private basketService: BasketService,
    private router: Router,
    private accountService: AccountService
  ) {}

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

  handleCheckoutClick() {
    let user = this.accountService.getCurrentUser();
    console.log(user);
    if (user) {
      this.router.navigateByUrl('/checkout');
    } else {
      this.router.navigate(['/account/login'], {
        state: { redirect: this.router.url },
      });
    }
  }
}
