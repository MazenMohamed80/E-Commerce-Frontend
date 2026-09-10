import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product-service';
import { IProduct, IProductPayload } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification-service';
@Component({
  imports: [FormsModule],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm implements OnChanges {
  @Input() product: IProduct | null = null;
  @Output() saved = new EventEmitter<void>();
  constructor(
    private _productService: ProductService,
    private _cdr: ChangeDetectorRef,
    private _notificationService: NotificationService,
  ) {}
  form: IProductPayload = {
    name: '',
    desc: '',
    price: 0,
    stock: 0,
    season: 'summer',
    slug: '',
    category: 'men',
    subCategory: 'shirts',
  };
  file: File | null = null;
  error = '';
  saving = false;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.form = this.product
        ? {
            name: this.product.name,
            desc: this.product.desc,
            price: this.product.price,
            stock: this.product.stock,
            season: this.product.season,
            slug: this.product.slug,
            category: this.product.category,
            subCategory: this.product.subCategory,
          }
        : {
            name: '',
            desc: '',
            price: 0,
            stock: 0,
            season: 'summer',
            slug: '',
            category: 'men',
            subCategory: 'shirts',
          };
      this.file = null;
    }
  }
  choose(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] || null;
  }
  submit() {
    this.error = '';
    this.saving = true;
    const payload = { ...this.form, img: this.file || undefined };
    const request = this.product
      ? this._productService.updateProduct(this.product.slug, payload)
      : this._productService.createProduct(payload);
    request.subscribe({
      next: () => {
        this.saving = false;
        this._notificationService.success(
          this.product ? 'Product updated successfully' : 'Product created successfully',
        );
        this.saved.emit();
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || e?.error?.message || 'Could not save product';
        this.saving = false;
        this._cdr.detectChanges();
      },
    });
  }
}
