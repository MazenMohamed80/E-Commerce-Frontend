import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product-service';
import { IProduct } from '../../core/models/product.model';
import { Product } from './product/product';
@Component({
  imports: [Product, FormsModule],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  constructor(
    private _productService: ProductService,
    private _cdr: ChangeDetectorRef,
  ) {}
  myProducts: IProduct[] = [];
  keyword = '';
  season = '';
  category = '';
  subCategory = '';
  loading = true;
  error = '';
  currentPage = 1;
  pageSize = 8;
  ngOnInit() {
    this.loadProducts();
  }
  loadProducts(resetPage = false) {
    if (resetPage) this.currentPage = 1;
    this.loading = true;
    this._productService
      .getAllProducts({
        keyword: this.keyword,
        season: this.season,
        category: this.category,
        subCategory: this.subCategory,
      })
      .subscribe({
        next: (res) => {
          this.myProducts = res.data;
          this.loading = false;
          this._cdr.detectChanges();
        },
        error: (err) => {
          this.error = err?.error?.error || err?.error?.message || 'Unable to load products';
          this.loading = false;
          this._cdr.detectChanges();
        },
      });
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.myProducts.length / this.pageSize));
  }
  get pagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.myProducts.slice(start, start + this.pageSize);
  }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  clearFilters() {
    this.keyword = this.season = this.category = this.subCategory = '';
    this.loadProducts(true);
  }
}
