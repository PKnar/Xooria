import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInfoComponent } from './order-info/order-info.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  {
    path: ':id',
    component: OrderInfoComponent,
    data: { breadcrumb: { alias: 'Orderinfo' } },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
