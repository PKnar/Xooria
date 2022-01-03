import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(`${this.baseUrl}orders`);
  }

  getOrderInfo(id: number) {
    return this.http.get(`${this.baseUrl}orders/${id}`);
  }
}
