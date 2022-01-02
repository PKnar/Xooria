import { IFinalOrder } from './../../shared/models/oder';
import { IBasket } from './../../shared/models/basket';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from './../checkout.service';
import { BasketService } from './../../basket/basket.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const createdOrder = this.getCreatedOrder(basket);
    this.checkoutService.placeOrder(createdOrder).subscribe(
      (order: IFinalOrder) => {
        this.toastr.success('Order is successfully created!');
        this.basketService.deleteLocalBasket(basket.id);
        const navExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navExtras);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getCreatedOrder(basket: IBasket) {
    return {
      basketId: basket.id,
      shippingAddress: this.checkoutForm.get('addressForm').value,
    };
  }
}
