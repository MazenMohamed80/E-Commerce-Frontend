import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../services/product-service';
import { IProductRes } from '../models/product.model';
export const productResolver: ResolveFn<IProductRes | null> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug');
  if (slug) return inject(ProductService).getProductBySlug(slug);
  inject(Router).navigate(['/products-list']);
  return of(null);
};
