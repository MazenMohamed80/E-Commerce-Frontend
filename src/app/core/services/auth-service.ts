import { Injectable, Service, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/env';
import { ILoginData, ILoginRes, ISignupData, ITokenPayload, IUserRes } from '../models/auth.model';
import { CartService } from './cart-service';

@Service()
export class AuthService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _cartService = inject(CartService);
  private tokenKey = 'token';
  private userData = new BehaviorSubject<string | null>(null);
  private roleData = new BehaviorSubject<string | null>(null);
  private apiURL = environment.apiURL + 'auth';

  login(data: ILoginData) {
    return this._http.post<ILoginRes>(this.apiURL + '/login', data).pipe(
      tap((res) => {
        const decoded = this.decodeToken(res.accessToken);
        if (!decoded) return;
        this.storeToken(res.accessToken);
        this.userData.next(decoded.name);
        this.roleData.next(decoded.role);
        this.mergeGuestCart();
        this._router.navigate(decoded.role === 'admin' ? ['/dashboard'] : ['/']);
      }),
    );
  }

  signup(data: ISignupData) {
    return this._http.post<IUserRes>(`${environment.apiURL}user`, data);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userData.next(null);
    this.roleData.next(null);
    this._router.navigate(['/']);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  returnToken() {
    return localStorage.getItem(this.tokenKey);
  }
  returnUserData() {
    return this.userData.asObservable();
  }
  returnRoleData() {
    return this.roleData.asObservable();
  }

  checkIfLogin() {
    const token = this.returnToken();
    const decoded = token ? this.decodeToken(token) : null;
    if (decoded) {
      this.userData.next(decoded.name);
      this.roleData.next(decoded.role);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  checkIfLoginWithRole() {
    const token = this.returnToken();
    const decoded = token ? this.decodeToken(token) : null;
    return decoded?.role ?? false;
  }

  private decodeToken(token: string) {
    try {
      const decoded = jwtDecode<ITokenPayload>(token);
      return decoded.exp * 1000 > Date.now() ? decoded : null;
    } catch {
      return null;
    }
  }

  private mergeGuestCart() {
    const guestCart = this._cartService.getGuestCart();
    if (!guestCart.length) return;
    this._cartService.mergeGuestCart(guestCart).subscribe({
      next: () => this._cartService.clearGuestCart(),
      error: (err) => console.error('Guest cart merge failed', err),
    });
  }
}
