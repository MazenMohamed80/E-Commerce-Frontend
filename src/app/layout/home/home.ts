import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product-list/product/product';
import { ProductService } from '../../core/services/product-service';
import { IProduct } from '../../core/models/product.model';
import { TestimonialService } from '../../core/services/testimonial-service';
import { ITestimonial } from '../../core/models/testimonial.model';
@Component({
  imports: [RouterLink, Product],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  constructor(
    private _productService: ProductService,
    private _testimonialService: TestimonialService,
    private _cdr: ChangeDetectorRef,
  ) {}
  newArrivals: IProduct[] = [];
  topSales: IProduct[] = [];
  testimonials: ITestimonial[] = [];
  userName(testimonial: ITestimonial) {
    return typeof testimonial.user === 'string' ? '' : testimonial.user.name;
  }

  ngOnInit() {
    this._productService.getNewArrivals().subscribe({
      next: (res) => {
        this.newArrivals = res.data;
        this._cdr.detectChanges();
      },
    });
    this._productService.getTopSales().subscribe({
      next: (res) => {
        this.topSales = res.data;
        this._cdr.detectChanges();
      },
    });
    this._testimonialService.getApproved().subscribe({
      next: (res) => {
        this.testimonials = res.data;
        this._cdr.detectChanges();
      },
    });
  }
}
