import { OrdersService } from './orders.service';
import { IFinalOrder } from './../shared/models/oder';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: IFinalOrder[];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe(
      (orders: IFinalOrder[]) => {
        this.orders = orders;
        console.log('orders', orders);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
