import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-service';
import { ProductService } from '../../core/services/product-service';
import { ICart } from '../../core/models/auth.model';
import { IProduct } from '../../core/models/product.model';
@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  constructor(
    private _cartService: CartService,
    private _productService: ProductService,
    private _cdr: ChangeDetectorRef,
  ) {}
  cart!: ICart;
  guestItems: { product: IProduct; quantity: number }[] = [];
  loading = true;
  error = '';
  get isGuest() {
    return !this._cartService.hasAuth();
  }
  ngOnInit() {
    if (this.isGuest) this.loadGuestCart();
    else this.loadCart();
  }
  loadCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.error = err?.error?.error || err?.error?.message || 'Unable to load cart';
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
  loadGuestCart() {
    const items = this._cartService.getGuestCart();
    if (!items.length) {
      this.loading = false;
      return;
    }
    let done = 0;
    items.forEach((item) =>
      this._productService.getProductBySlug(item.slug).subscribe({
        next: (res) => {
          this.guestItems.push({ product: res.data, quantity: item.quantity });
          done++;
          if (done === items.length) {
            this.loading = false;
            this._cdr.detectChanges();
          }
        },
        error: () => {
          done++;
          if (done === items.length) {
            this.loading = false;
            this._cdr.detectChanges();
          }
        },
      }),
    );
  }
  removeGuest(product: IProduct) {
    this._cartService.removeGuestItem(product._id);
    this.loadGuestCart();
  }
  changeGuestQuantity(product: IProduct, quantity: number) {
    if (quantity < 1) return;
    if (quantity > product.stock) {
      this.error = `Only ${product.stock} item(s) available in stock.`;
      return;
    }
    this._cartService.updateGuestQuantity(product._id, quantity);
    this.loadGuestCart();
  }
  increase(slug: string) {
    this._cartService.addCart(slug, 1).subscribe({
      next: (res) => {
        this.cart = res.data;
        this._cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not increase quantity';
        this._cdr.detectChanges();
      },
    });
  }
  decrease(slug: string) {
    this._cartService.deleteCart(slug, 1).subscribe({
      next: (res) => {
        this.cart = res.data;
        this._cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not decrease quantity';
        this._cdr.detectChanges();
      },
    });
  }
  remove(slug: string) {
    this._cartService.deleteCart(slug, 1).subscribe({
      next: (res) => {
        this.cart = res.data;
        this._cdr.detectChanges();
      },
    });
  }
  accept(slug: string) {
    this._cartService.acceptPriceChange(slug).subscribe({
      next: (res) => {
        this.cart = res.data;
        this._cdr.detectChanges();
      },
    });
  }
}
