import { Injectable, Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, map, tap } from 'rxjs';
import { environment } from '../../../environments/env';
import { ICart, IGuestCartItem } from '../models/auth.model';
import { ICartRes } from '../models/cart.model';
import { ProductService } from './product-service';

@Service()
export class CartService {
  private _http = inject(HttpClient);
  private apiURL = environment.apiURL + 'cart';
  private _productService = inject(ProductService);
  private guestCartKey = 'guestCart';
  private cartSubject = new BehaviorSubject<ICartRes['data'] | null>(null);
  cart$ = this.cartSubject.asObservable();

  getCart() {
    return this._http
      .get<ICartRes>(this.apiURL)
      .pipe(tap((res) => this.cartSubject.next(res.data)));
  }
  addCart(slug: string, quantity = 1): Observable<ICartRes> {
    if (!this.hasAuth()) {
      return this._guestAdd(slug, quantity);
    }
    const params = new HttpParams().set('quantity', quantity);
    return this._http
      .post<ICartRes>(`${this.apiURL}/${slug}`, {}, { params })
      .pipe(tap((res) => this.cartSubject.next(res.data)));
  }
  deleteCart(slug: string, quantity?: number): Observable<ICartRes> {
    if (!this.hasAuth()) {
      return this._guestDelete(slug, quantity);
    }
    let params = new HttpParams();
    if (quantity !== undefined) params = params.set('quantity', quantity);
    return this._http
      .delete<ICartRes>(`${this.apiURL}/${slug}`, { params })
      .pipe(tap((res) => this.cartSubject.next(res.data)));
  }
  acceptPriceChange(slug: string) {
    return this._http
      .patch<ICartRes>(`${this.apiURL}/accept-price/${slug}`, {})
      .pipe(tap((res) => this.cartSubject.next(res.data)));
  }
  mergeGuestCart(items: IGuestCartItem[]) {
    return this._http
      .post<ICartRes>(`${this.apiURL}/merge`, { guestCartItems: items })
      .pipe(tap((res) => this.cartSubject.next(res.data)));
  }
  getGuestCart(): IGuestCartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.guestCartKey) || '[]');
    } catch {
      return [];
    }
  }
  clearGuestCart() {
    localStorage.removeItem(this.guestCartKey);
  }

  private _guestDelete(slug: string, quantity?: number): Observable<ICartRes> {
    const items = this.getGuestCart();
    const index = items.findIndex((item) => item.slug === slug);

    if (index >= 0) {
      if (quantity !== undefined && items[index].quantity > quantity) {
        items[index].quantity -= quantity;
      } else {
        items.splice(index, 1);
      }
    }

    localStorage.setItem(this.guestCartKey, JSON.stringify(items));

    const data = this._guestCartData(items);
    this.cartSubject.next(data);
    return of({ message: 'Product removed from guest cart', data });
  }

  private _guestAdd(slug: string, quantity: number): Observable<ICartRes> {
    return this._productService.getProductBySlug(slug).pipe(
      tap((res) => {
        const items = this.getGuestCart();
        const existing = items.find((x) => x.productId === res.data._id);
        const nextQuantity = (existing?.quantity ?? 0) + quantity;

        if (nextQuantity > res.data.stock) {
          throw new Error(`Only ${res.data.stock} item(s) available in stock.`);
        }

        if (existing) {
          existing.quantity = nextQuantity;
        } else {
          items.push({ productId: res.data._id, slug: res.data.slug, quantity });
        }

        localStorage.setItem(this.guestCartKey, JSON.stringify(items));
        this.cartSubject.next(this._guestCartData(items));
      }),
      map(() => ({
        message: 'Product added to guest cart',
        data: this._guestCartData(this.getGuestCart()),
      })),
    );
  }

  private _guestCartData(items: IGuestCartItem[]): ICart {
    return {
      numOfProducts: items.reduce((sum, item) => sum + item.quantity, 0),
      products: [],
      totalPrice: 0,
      hasPriceChangedItems: false,
    };
  }

  updateGuestQuantity(productId: string, quantity: number) {
    const items = this.getGuestCart();
    const item = items.find((x) => x.productId === productId);
    if (!item) return;
    item.quantity = Math.max(1, quantity);
    localStorage.setItem(this.guestCartKey, JSON.stringify(items));
    this.cartSubject.next(this._guestCartData(items));
  }

  removeGuestItem(productId: string, quantity?: number) {
    const items = this.getGuestCart();
    const index = items.findIndex((x) => x.productId === productId);
    if (index >= 0) {
      if (quantity && items[index].quantity > quantity) items[index].quantity -= quantity;
      else items.splice(index, 1);
    }
    localStorage.setItem(this.guestCartKey, JSON.stringify(items));
    this.cartSubject.next(this._guestCartData(items));
  }

  hasAuth(): boolean {
    return !!localStorage.getItem('token');
  }
}
