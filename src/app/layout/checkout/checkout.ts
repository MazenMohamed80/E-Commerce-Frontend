import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-service';
import { OrderService } from '../../core/services/order-service';
import { UserService } from '../../core/services/user-service';
import { ICart, IUser } from '../../core/models/auth.model';
import { NotificationService } from '../../core/services/notification-service';
@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout implements OnInit {
  constructor(
    private _cartService: CartService,
    private _orderService: OrderService,
    private _userService: UserService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _notificationService: NotificationService,
  ) {}
  cart!: ICart;
  profile: IUser | null = null;
  addressTitle = '';
  error = '';
  loading = true;
  placing = false;
  ngOnInit() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || 'Could not load cart';
        this._notificationService.error(this.error);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
    this._userService.profile$.subscribe((p) => {
      this.profile = p;
      if (!this.addressTitle)
        this.addressTitle = p?.addresses.find((a) => a.isDefault)?.title || '';
    });
  }
  placeOrder() {
    if (!this.addressTitle.trim()) {
      this.error =
        'Please provide the title of a shipping address. Add one from My Account if needed.';
      return;
    }
    if (this.cart.hasPriceChangedItems) {
      this.error = 'Resolve price changes in your cart before ordering.';
      return;
    }
    this.placing = true;
    this._orderService.createOrder(this.addressTitle.trim()).subscribe({
      next: (res) => {
        this.placing = false;
        this._notificationService.success(res.message || 'Order placed successfully');
        this._router.navigate(['/orders']);
      },
      error: (err) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not place order';
        this._notificationService.error(this.error);
        this.placing = false;
        this._cdr.detectChanges();
      },
    });
  }
}
