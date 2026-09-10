import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/env';
import {
  ITestimonialNotificationRes,
  ITestimonialRes,
  ITestimonialsRes,
  TestimonialStatus,
} from '../models/testimonial.model';

@Service()
export class TestimonialService {
  private _http = inject(HttpClient);
  private apiURL = environment.apiURL + 'testimonial';

  getApproved() {
    return this._http.get<ITestimonialsRes>(this.apiURL);
  }
  getMy() {
    return this._http.get<ITestimonialsRes>(`${this.apiURL}/my`);
  }
  create(message: string, rating: number) {
    return this._http.post<ITestimonialRes>(this.apiURL, { message, rating });
  }

  getAllForAdmin() {
    return this._http.get<ITestimonialsRes>(`${this.apiURL}/admin`);
  }
  getNewNotifications() {
    return this._http.get<ITestimonialNotificationRes>(`${this.apiURL}/admin/notifications`);
  }
  markNotificationsRead() {
    return this._http.patch<{ message: string; modifiedCount: number }>(
      `${this.apiURL}/admin/notifications/read`,
      {},
    );
  }
  updateStatus(id: string, status: TestimonialStatus) {
    return this._http.patch<ITestimonialRes>(`${this.apiURL}/admin/${id}/status`, { status });
  }
}
