import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { IFinalOrder } from './../shared/models/oder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  placeOrder(order: IFinalOrder) {
    return this.http.post(`${this.baseUrl}orders`, order);
  }
}
