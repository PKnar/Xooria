import { ShopService } from './../shop.service';
import { ShopParams } from './../../shared/models/shopParams';
import { environment } from 'src/environments/environment';
import { BasketService } from '../../basket/basket.service';
import { IProduct } from '../../shared/models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  //Import allows you to pass props from parent component to child
  @Input() product: IProduct;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

  addProductToBasket() {
    this.basketService.addProduct(this.product);
  }
}
