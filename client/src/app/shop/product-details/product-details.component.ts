import { BasketService } from './../../basket/basket.service';
import { IProduct } from '../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRute: ActivatedRoute,
    private brandcrumbService: BreadcrumbService,
    private basketService: BasketService
  ) {
    //Makes sure the product info/number is not show during loading
    this.brandcrumbService.set('productDetails', '');
  }

  ngOnInit(): void {
    this.getSingleProduct();
  }

  addProductToBasket() {
    this.basketService.addProduct(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getSingleProduct() {
    let id = +this.activatedRute.snapshot.paramMap.get('id');
    this.shopService.getProduct(id).subscribe(
      (res) => {
        this.product = res;
        this.brandcrumbService.set('@productDetails', this.product.name);
      },
      (error) => console.log(error)
    );
  }
}
