import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order-service';
import { NotificationService } from '../../core/services/notification-service';
import { IReport, IReportRes } from '../../core/models/order.model';

@Component({
  imports: [FormsModule, DatePipe],
  selector: 'app-reports',
  styleUrl: './reports.css',
  templateUrl: './reports.html',
})
export class Reports implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _cdr: ChangeDetectorRef,
  ) {}
  from = '';
  to = '';
  report!: IReport;
  loading = false;
  error = '';

  ngOnInit() {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    this.from = this.formatDate(first);
    this.to = this.formatDate(today);
    this.load();
  }

  private formatDate(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  load() {
    this.error = '';
    if (!this.from || !this.to) {
      this.error = 'Please select both dates.';
      return;
    }
    if (this.from > this.to) {
      this.error = 'The from date must be before or equal to the to date.';
      return;
    }
    this.loading = true;
    this._orderService.getSalesReport(this.from, this.to).subscribe({
      next: (res) => {
        this.report = res.data;
        console.log(this.report);
        console.log(res.data);
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not load report';
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
}
