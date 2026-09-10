import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../core/services/testimonial-service';
import { ITestimonial, TestimonialStatus } from '../../core/models/testimonial.model';

@Component({
  imports: [],
  selector: 'app-dashboard-testimonials',
  styleUrl: './testimonials.css',
  templateUrl: './testimonials.html',
})
export class DashboardTestimonials implements OnInit {
  constructor(
    private _testimonialService: TestimonialService,
    private _cdr: ChangeDetectorRef,
  ) {}

  testimonials: ITestimonial[] = [];
  error = '';
  message = '';
  loading = true;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this._testimonialService.getAllForAdmin().subscribe({
      next: (res) => {
        this.testimonials = res.data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not load testimonials';
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  updateStatus(testimonial: ITestimonial, status: TestimonialStatus) {
    this.error = this.message = '';
    this._testimonialService.updateStatus(testimonial._id, status).subscribe({
      next: (res) => {
        testimonial.status = res.data.status;
        testimonial.isApproved = res.data.isApproved;
        testimonial.isNew = false;
        this.message = res.message;
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not update testimonial';
        this._cdr.detectChanges();
      },
    });
  }

  markNotificationsRead() {
    this._testimonialService.markNotificationsRead().subscribe({
      next: () => {
        this.testimonials.forEach((item) => (item.isNew = false));
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error =
          err?.error?.error || err?.error?.message || 'Could not mark notifications as read';
        this._cdr.detectChanges();
      },
    });
  }

  stars(rating: number) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  userName(testimonial: ITestimonial) {
    return typeof testimonial.user === 'string' ? testimonial.user : testimonial.user.name;
  }
  userEmail(testimonial: ITestimonial) {
    return typeof testimonial.user === 'string' ? '' : testimonial.user.email || '';
  }
}
