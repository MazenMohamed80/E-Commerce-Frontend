import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Service, inject } from '@angular/core';
import { environment } from '../../../environments/env';
import { IProductPayload, IProductRes, IProductsRes } from '../models/product.model';

@Service()
export class ProductService {
  private _http = inject(HttpClient);
  private apiURL = environment.apiURL + 'product';

  getAdminProducts() {
    return this._http.get<IProductsRes>(`${this.apiURL}/admin/all`);
  }

  getAllProducts(filters?: {
    keyword?: string;
    season?: string;
    category?: string;
    subCategory?: string;
  }) {
    let params = new HttpParams();
    Object.entries(filters ?? {}).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    return this._http.get<IProductsRes>(this.apiURL, { params });
  }
  getProductBySlug(slug: string) {
    return this._http.get<IProductRes>(`${this.apiURL}/${slug}`);
  }
  getNewArrivals() {
    return this._http.get<IProductsRes>(`${this.apiURL}/new-arrivals`);
  }
  getTopSales() {
    return this._http.get<IProductsRes>(`${this.apiURL}/top-sales`);
  }
  getTop5OrderedProducts() {
    return this._http.get<IProductsRes>(`${this.apiURL}/reports/top-5`);
  }

  createProduct(payload: IProductPayload) {
    return this._http.post<IProductRes>(this.apiURL, this.toFormData(payload));
  }
  updateProduct(slug: string, payload: Partial<IProductPayload>) {
    return this._http.put<IProductRes>(`${this.apiURL}/${slug}`, this.toFormData(payload));
  }
  deleteProduct(slug: string) {
    return this._http.delete<IProductRes>(`${this.apiURL}/${slug}`);
  }

  private toFormData(payload: Partial<IProductPayload>) {
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        form.append(key, value instanceof File ? value : String(value));
    });
    return form;
  }
}
