import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../core/services/order-service';
import { IOrder } from '../../core/models/order.model';
import { NotificationService } from '../../core/services/notification-service';
@Component({
  imports: [DatePipe],
  selector: 'app-orders',
  styleUrl: './orders.css',
  templateUrl: './orders.html',
})
export class Orders implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _cdr: ChangeDetectorRef,
    private _notificationService: NotificationService,
  ) {}
  orders: IOrder[] = [];
  error = '';
  loading = true;
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this._orderService.getMyOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not load orders';
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
  orderReference(order: IOrder): string {
    let hash = 0;
    for (const char of order._id) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    return `ORD-${Math.abs(hash).toString(36).toUpperCase().padStart(6, '0').slice(-6)}`;
  }
  canCancel(order: IOrder) {
    return ['pending', 'in_progress'].includes(order.status);
  }
  cancel(order: IOrder) {
    if (!this.canCancel(order)) return;
    if (!confirm(`Cancel ${this.orderReference(order)}?`)) return;
    this._orderService.cancelOrder(order._id).subscribe({
      next: (res) => {
        this._notificationService.success(res.message || 'Order cancelled');
        this.loadOrders();
      },
      error: (err) => {
        this._notificationService.error(
          err?.error?.error || err?.error?.message || 'Could not cancel order',
        );
      },
    });
  }
  requestRefund(order: IOrder) {
    if (order.status !== 'delivered') return;
    this._orderService.requestRefund(order._id).subscribe({
      next: () => this.loadOrders(),
      error: (err) => {
        this.error = err?.error?.error || 'Could not request refund';
        this._cdr.detectChanges();
      },
    });
  }
}
