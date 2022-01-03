import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderInfoComponent } from './order-info/order-info.component';

@NgModule({
  declarations: [OrdersComponent, OrderInfoComponent],
  imports: [CommonModule, OrderRoutingModule],
})
export class OrdersModule {}
