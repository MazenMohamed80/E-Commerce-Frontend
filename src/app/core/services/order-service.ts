import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/env';
import { IOrderRes, IOrdersRes, OrderStatus } from '../models/order.model';

@Service()
export class OrderService {
  private _http = inject(HttpClient);
  private apiURL = environment.apiURL + 'order';
  createOrder(addressTitle: string) {
    return this._http.post<IOrderRes>(this.apiURL, { addressTitle });
  }
  getMyOrders() {
    return this._http.get<IOrdersRes>(`${this.apiURL}/my-orders`);
  }
  cancelOrder(id: string) {
    return this._http.patch<IOrderRes>(`${this.apiURL}/${id}/cancel`, {});
  }
  requestRefund(id: string) {
    return this._http.patch<IOrderRes>(`${this.apiURL}/${id}/refund`, {});
  }
  getSalesReport(from: string, to: string) {
    return this._http.get<any>(`${this.apiURL}/admin/report`, { params: { from, to } });
  }
  getAllOrders() {
    return this._http.get<IOrdersRes>(`${this.apiURL}/admin`);
  }
  updateStatus(id: string, status: OrderStatus) {
    return this._http.patch<IOrderRes>(`${this.apiURL}/${id}/status`, { status });
  }
}
