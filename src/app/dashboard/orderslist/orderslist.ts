import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IOrder } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order-service';
import { Order } from './order/order';
@Component({
  imports: [FormsModule, Order],
  selector: 'app-orderslist',
  styleUrl: './orderslist.css',
  templateUrl: './orderslist.html',
})
export class Orderslist implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _cdr: ChangeDetectorRef,
  ) {}
  orders: IOrder[] = [];
  error = '';
  message = '';
  loading = true;
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this._orderService.getAllOrders().subscribe({
      next: (r) => {
        this.orders = r.data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || 'Could not load orders';
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
}
