import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/env';
import { IProduct } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart-service';
@Component({
  imports: [RouterLink],
  selector: 'app-product',
  styleUrl: './product.css',
  templateUrl: './product.html',
})
export class Product {
  @Input() myProduct!: IProduct;
  staticURL = environment.staticURL;
  message = '';
  constructor(
    private _cartService: CartService,
    private _cdr: ChangeDetectorRef,
  ) {}
  addToCart() {
    this._cartService.addCart(this.myProduct.slug).subscribe({
      next: () => {
        this.message = 'Added to cart';
        this._cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.message =
          err?.error?.message || err?.error?.error || err?.message || 'Could not add product';
        this._cdr.detectChanges();
      },
    });
  }
}
