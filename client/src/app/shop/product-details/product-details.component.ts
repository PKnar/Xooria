import { ShopParams } from './../../shared/models/shopParams';
import { environment } from 'src/environments/environment';
import { ShopService } from './../shop.service';
import { BasketService } from './../../basket/basket.service';
import { IProduct } from '../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  baseUrl = environment.apiUrl;
  products: IProduct[];
  shopParams = new ShopParams();

  constructor(
    private activatedRute: ActivatedRoute,
    private brandcrumbService: BreadcrumbService,
    private basketService: BasketService,
    private shopService: ShopService,
    private router: Router
  ) {
    //Makes sure the product info/number is not show during loading
    this.brandcrumbService.set('productDetails', '');
  }

  ngOnInit(): void {
    this.getSingleProduct();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data.filter(
          (item) => item.productType === 'Hoodies'
        );
      },
      (error) => {
        console.log(error);
      }
    );
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

  handleSuggestionClick(item) {
    let url = `/shop/${item.id}`;
    // this.router.navigateByUrl(`/shop/${item.id}`, {
    //   state: { redirect: `/shop/${item.id}` },
    // });
    window.history.state.redirect = url;

    window.open(url, '_blank');
  }
}
