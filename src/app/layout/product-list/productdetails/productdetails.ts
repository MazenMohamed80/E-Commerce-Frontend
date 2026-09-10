import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product-service';
import { CartService } from '../../../core/services/cart-service';
import { IProduct } from '../../../core/models/product.model';
import { environment } from '../../../../environments/env';
import { Product } from '../product/product';
@Component({
  imports: [Product, RouterLink, FormsModule],
  selector: 'app-productdetails',
  styleUrl: './productdetails.css',
  templateUrl: './productdetails.html',
})
export class Productdetails implements OnInit {
  constructor(
    private _activeRoute: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService,
    private _cdr: ChangeDetectorRef,
  ) {}
  slug = '';
  myProduct!: IProduct;
  relatedProducts: IProduct[] = [];
  staticURL = environment.staticURL;
  quantity = 1;
  message = '';
  ngOnInit() {
    // The same Productdetails component instance is reused when navigating
    // from one related product to another. Listen to route data so the
    // resolved product is applied every time the slug changes.
    this._activeRoute.data.subscribe((data) => {
      const resolved = data['myProductRes'];
      if (!resolved?.data) return;

      this.slug = this._activeRoute.snapshot.paramMap.get('slug') || '';
      this.myProduct = resolved.data;
      this.quantity = 1;
      this.message = '';
      this.loadRelatedProducts();
    });
  }

  private loadRelatedProducts() {
    this._productService
      .getAllProducts({
        category: this.myProduct.category,
        subCategory: this.myProduct.subCategory,
      })
      .subscribe({
        next: (res) => {
          this.relatedProducts = res.data.filter((p) => p.slug !== this.slug).slice(0, 4);
          this._cdr.detectChanges();
        },
      });
  }
  addToCart() {
    this._cartService.addCart(this.slug, this.quantity).subscribe({
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
