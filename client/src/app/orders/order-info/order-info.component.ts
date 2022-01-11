import { IBasketProductInfo } from './../../shared/models/oder';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from './../orders.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IFinalOrder } from 'src/app/shared/models/oder';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
})
export class OrderInfoComponent implements OnInit {
  order: IBasketProductInfo;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private ordersService: OrdersService
  ) {
    this.breadcrumbService.set('@OrderInfo', '');
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.ordersService.getOrderInfo(+id).subscribe(
      (order: IBasketProductInfo) => {
        this.order = order;
        this.breadcrumbService.set('@OrderInfo', `Order# ${order.id}`);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
