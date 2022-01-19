import { ShopService } from './../shop/shop.service';
import { ShopParams } from './../shared/models/shopParams';
import { IProduct } from './../shared/models/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  baseUrl = environment.apiUrl;
  products: IProduct[];
  shopParams = new ShopParams();

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data.filter(
          (item) => item.productType === 'Sneakers'
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
