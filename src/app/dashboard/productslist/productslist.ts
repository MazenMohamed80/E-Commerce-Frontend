import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { IProduct } from '../../core/models/product.model';
import { environment } from '../../../environments/env';
import { NotificationService } from '../../core/services/notification-service';
import { ProductForm } from './product-form/product-form';
@Component({
  imports: [ProductForm],
  selector: 'app-productslist',
  styleUrl: './productslist.css',
  templateUrl: './productslist.html',
})
export class Productslist implements OnInit {
  staticURL = environment.staticURL;
  constructor(
    private _productService: ProductService,
    private _cdr: ChangeDetectorRef,
    private _notificationService: NotificationService,
  ) {}
  products: IProduct[] = [];
  currentPage = 1;
  pageSize = 10;
  editing: IProduct | null = null;
  showForm = false;
  error = '';
  ngOnInit() {
    this.load();
  }
  load() {
    this._productService.getAdminProducts().subscribe({
      next: (r) => {
        this.products = r.data;
        this.currentPage = 1;
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || 'Could not load products';
        console.log(this.error);
        this._cdr.detectChanges();
      },
    });
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.products.length / this.pageSize));
  }
  get pagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
  edit(product: IProduct) {
    this.editing = product;
    this.showForm = true;
  }
  create() {
    this.editing = null;
    this.showForm = true;
  }
  saved() {
    this.showForm = false;
    this.editing = null;
    this.load();
  }
  remove(product: IProduct) {
    if (!confirm(`Toggle active/deleted state for ${product.name}?`)) return;
    this._productService.deleteProduct(product.slug).subscribe({
      next: (res) => {
        this.products = this.products.map((p) => (p._id === product._id ? res.data : p));
        this._notificationService.success(res.message || 'Product status updated');
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || 'Could not update product';
        console.log(this.error);
        this._notificationService.error(this.error);
        this._cdr.detectChanges();
      },
    });
  }
}
