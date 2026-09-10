import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CartService } from '../../../core/services/cart-service';
@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _cdr: ChangeDetectorRef,
  ) {}
  name = '';
  role = '';
  cartCount = 0;
  ngOnInit() {
    this._authService.returnUserData().subscribe((name) => {
      this.name = name || '';
      this._cdr.detectChanges();
    });
    this._authService.returnRoleData().subscribe((role) => {
      this.role = role || '';
      this._cdr.detectChanges();
    });
    this._cartService.cart$.subscribe((cart) => {
      if (cart) this.cartCount = cart.numOfProducts;
      this._cdr.detectChanges();
    });
    if (this._authService.checkIfLoginWithRole() === 'user')
      this._cartService.getCart().subscribe();
    else this.cartCount = this._cartService.getGuestCart().reduce((s, x) => s + x.quantity, 0);
  }
  logout() {
    this._authService.logout();
  }
}
