import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IOrder, OrderStatus } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-order',
  styleUrl: './order.css',
  templateUrl: './order.html',
})
export class Order {
  constructor(
    private _orderService: OrderService,
    private _cdr: ChangeDetectorRef,
  ) {}
  @Input() order!: IOrder;
  error = '';
  message = '';
  statuses: OrderStatus[] = [
    'pending',
    'in_progress',
    'confirmed',
    'shipped',
    'delivered',
    'refund_requested',
    'refunded',
    'cancelled',
  ];
  isUserObject(
    user: IOrder['user'],
  ): user is { _id: string; name: string; email: string; phone: string } {
    return typeof user === 'object';
  }
  update(order: IOrder) {
    this._orderService.updateStatus(order._id, order.status).subscribe({
      next: () => {
        this.message = 'Updated Successfully';
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || 'Could not update order';
        this._cdr.detectChanges();
      },
    });
  }
}
