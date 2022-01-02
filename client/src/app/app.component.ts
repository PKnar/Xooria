import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AccountService } from './account/account-service';
import { BasketService } from './basket/basket.service';
import { IProduct } from './shared/models/product';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products: IProduct[];

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private basketService: BasketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBasket();
    this.getCurrentUser();

    //    this.http.get("https://localhost:5001/api/products")
    //    .subscribe((response:IPagination)=>{
    //      this.products= response.data
    //    },error=>{
    //      console.log(error)
    //    })
  }

  getBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('Basket is initialized');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(
        () => {
          console.log('current user is active');
          this.router.navigateByUrl('/shop');
        },
        (error) => console.log(error)
      );
    }
  }
}
