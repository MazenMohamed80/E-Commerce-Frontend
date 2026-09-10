import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { TestimonialService } from '../../../core/services/testimonial-service';
@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  constructor(
    private _authService: AuthService,
    private _testimonialService: TestimonialService,
    private _cdr: ChangeDetectorRef,
  ) {}
  name = '';
  newTestimonials = 0;
  ngOnInit() {
    this._authService.returnUserData().subscribe((n) => {
      this.name = n || '';
      this._cdr.detectChanges();
    });
    this._testimonialService.getNewNotifications().subscribe({
      next: (res) => {
        this.newTestimonials = res.count;
        this._cdr.detectChanges();
      },
    });
  }
  logout() {
    this._authService.logout();
  }
}
