import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestimonialService } from '../../core/services/testimonial-service';
import { ITestimonial } from '../../core/models/testimonial.model';

@Component({
  imports: [FormsModule],
  selector: 'app-testimonials',
  styleUrl: './testimonials.css',
  templateUrl: './testimonials.html',
})
export class Testimonials implements OnInit {
  constructor(private _testimonialService: TestimonialService, private _cdr: ChangeDetectorRef) {}

  testimonials: ITestimonial[] = [];
  message = '';
  error = '';
  text = '';
  rating = 5;
  submitting = false;

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this._testimonialService.getMy().subscribe({
      next: res => { this.testimonials = res.data; this._cdr.detectChanges(); },
      error: err => { this.error = err?.error?.error || err?.error?.message || 'Could not load your testimonials'; this._cdr.detectChanges(); },
    });
  }

  submit() {
    this.message = this.error = '';
    if (!this.text.trim()) { this.error = 'Please write your testimonial.'; return; }
    if (this.rating < 1 || this.rating > 5) { this.error = 'Rating must be between 1 and 5.'; return; }

    this.submitting = true;
    this._testimonialService.create(this.text.trim(), this.rating).subscribe({
      next: res => {
        this.message = res.message;
        this.text = '';
        this.rating = 5;
        this.submitting = false;
        this.loadTestimonials();
        this._cdr.detectChanges();
      },
      error: err => {
        this.error = err?.error?.error || err?.error?.message || 'Could not submit testimonial';
        this.submitting = false;
        this._cdr.detectChanges();
      },
    });
  }

  stars(rating: number) { return '★'.repeat(rating) + '☆'.repeat(5 - rating); }
}
